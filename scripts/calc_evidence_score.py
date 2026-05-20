#!/usr/bin/env python3
"""
calc_evidence_score.py

SciBase 独自エビデンススコア v2.2 を src/lib/data.ts の全 ingredient.papers[] から
計算し、各 ingredient ブロックの papers[] 直後に evidenceScore: {...} を挿入する
スタティックビルド前処理スクリプト。

設計：
  /Users/raykudo/secretary_bot/knowledge/scibase_roadmap/next_week_20260515/
    n3_evidence_score_v2_design.md
  /Users/raykudo/secretary_bot/knowledge/scibase_roadmap/
    brief_evidence_score_v2_implementation.md

計算式 v2.2（部門合議で確定した recency カットオフ 15 年版・2026-05-20 fix）:

    confidence  = min(1.0, n / 3.0)
    paperCount  = min(3.0, log10(n + 1) * 1.5)
    rctMeta     = min(3.0, (rct + meta * 1.5) / n * 3.0 * confidence)
    recency     = (recent15y / n) * 2.0 * confidence
    humanTrial  = (human / n) * 2.0 * confidence
    overall     = paperCount + rctMeta + recency + humanTrial  # 0-10

    human       = rct + meta + cohort + observational
    recent15y   = papers with year >= current_year - 15

studyType マッピング:
    rct / meta-analysis / cohort / observational / animal  （正規化済）

挿入位置：
    各 ingredient ブロックの "    papers: [...]," の直後行から、次のフィールド
    までの間。既に evidenceScore が存在する場合は --force でのみ上書き。

実行：
    python3 scripts/calc_evidence_score.py --dry-run   # diff サマリ表示
    python3 scripts/calc_evidence_score.py --apply     # 本番書き込み（要承認）
    python3 scripts/calc_evidence_score.py --apply --force  # 既存上書き許可

不変条件：
  - perl -i -pe / sed -i は使わない（過去事故・CLAUDE.md）
  - 本書き込みは atomic（tempfile → os.rename）
  - dry-run と --apply は別フラグ・どちらか必須
  - 計算式 v2.2 は改変禁止（recency 15 年カットオフは部門合議で確定の唯一の差分）
"""
import argparse
import math
import re
import sys
import tempfile
import os
from collections import Counter
from datetime import date
from pathlib import Path

DATA_TS_PATH = Path(__file__).resolve().parent.parent / 'src' / 'lib' / 'data.ts'

CURRENT_YEAR = 2026
RECENCY_CUTOFF_YEARS = 15  # 部門合議 2026-05-20 確定（10 → 15）
FORMULA_VERSION = 'v2.2'

INGREDIENTS_ARRAY_HEADER = 'export const ingredients: Ingredient[] = ['
NEXT_EXPORT_PATTERN = re.compile(r'^export\s+const\s+')


_INLINE_PAPER_RE = re.compile(r"^      \{\s*.*\},?\s*$")
_INLINE_YEAR_RE = re.compile(r"\byear:\s*(\d+)")
_INLINE_STUDY_RE = re.compile(r"\bstudyType:\s*'([^']+)'")


def parse_papers_in_block(block_lines, block_offset):
    """Given lines of an ingredient block (without the wrapping '{' / '}'),
    extract papers as list of dicts with studyType + year.

    Supports two formats:
      Multi-line (majority・3,110 件):
          {
            title: '...',
            year: 2021,
            studyType: 'rct',
            ...
          },
      Inline (rare・luteolin / fisetin / alpha-lipoic-acid・9 件):
          { title: '...', year: 2021, studyType: 'observational', keyFinding: '...' },

    We only care about studyType and year.
    """
    papers = []
    in_papers_array = False
    in_multiline_paper = False
    current_paper = {}
    for i, line in enumerate(block_lines):
        if not in_papers_array:
            if line == '    papers: [':
                in_papers_array = True
            continue
        # Inside papers array
        if line == '    ],':
            return papers
        if line == '      {':
            in_multiline_paper = True
            current_paper = {}
            continue
        if line == '      },' or line == '      }':
            if in_multiline_paper:
                papers.append(current_paper)
                current_paper = {}
                in_multiline_paper = False
            continue
        if in_multiline_paper:
            m = _INLINE_STUDY_RE.search(line)
            if m:
                current_paper['studyType'] = m.group(1)
                continue
            m = _INLINE_YEAR_RE.search(line)
            if m:
                current_paper['year'] = int(m.group(1))
                continue
        else:
            # Possible inline-format paper entry
            if _INLINE_PAPER_RE.match(line):
                p = {}
                m = _INLINE_STUDY_RE.search(line)
                if m:
                    p['studyType'] = m.group(1)
                m = _INLINE_YEAR_RE.search(line)
                if m:
                    p['year'] = int(m.group(1))
                if p:
                    papers.append(p)
    return papers


def compute_score(papers):
    """v2.2 計算式（recency cutoff = 15 years）"""
    n = len(papers)
    if n == 0:
        return None

    rct = sum(1 for p in papers if p.get('studyType') == 'rct')
    meta = sum(1 for p in papers if p.get('studyType') == 'meta-analysis')
    cohort = sum(1 for p in papers if p.get('studyType') == 'cohort')
    observational = sum(1 for p in papers if p.get('studyType') == 'observational')
    animal = sum(1 for p in papers if p.get('studyType') == 'animal')
    human = rct + meta + cohort + observational

    recent = sum(
        1 for p in papers
        if p.get('year') is not None and p['year'] >= CURRENT_YEAR - RECENCY_CUTOFF_YEARS
    )

    confidence = min(1.0, n / 3.0)
    paper_count = min(3.0, math.log10(n + 1) * 1.5)
    rct_meta = min(3.0, (rct + meta * 1.5) / n * 3.0 * confidence)
    recency = (recent / n) * 2.0 * confidence
    human_score = (human / n) * 2.0 * confidence
    overall = paper_count + rct_meta + recency + human_score

    return {
        'overall': round(overall, 1),
        'breakdown': {
            'paperCount': round(paper_count, 1),
            'rctMeta': round(rct_meta, 1),
            'recency': round(recency, 1),
            'humanTrial': round(human_score, 1),
        },
        'confidence': round(confidence, 2),
        'paperStats': {
            'total': n,
            'rct': rct,
            'metaAnalysis': meta,
            'cohort': cohort,
            'observational': observational,
            'animal': animal,
            'recent15y': recent,
        },
    }


def format_score_block(score, calculated_at):
    """data.ts に挿入する evidenceScore: {...} ブロックを生成（indent=4）"""
    bd = score['breakdown']
    ps = score['paperStats']
    lines = [
        '    evidenceScore: {',
        f'      overall: {score["overall"]},',
        '      breakdown: {',
        f'        paperCount: {bd["paperCount"]},',
        f'        rctMeta: {bd["rctMeta"]},',
        f'        recency: {bd["recency"]},',
        f'        humanTrial: {bd["humanTrial"]},',
        '      },',
        f'      confidence: {score["confidence"]},',
        '      paperStats: {',
        f'        total: {ps["total"]},',
        f'        rct: {ps["rct"]},',
        f'        metaAnalysis: {ps["metaAnalysis"]},',
        f'        cohort: {ps["cohort"]},',
        f'        observational: {ps["observational"]},',
        f'        animal: {ps["animal"]},',
        f'        recent15y: {ps["recent15y"]},',
        '      },',
        f"      lastCalculatedAt: '{calculated_at}',",
        f"      formula: '{FORMULA_VERSION}',",
        '    },',
    ]
    return lines


def find_ingredients_array_bounds(lines):
    """Return (start_idx, end_idx_exclusive) for the ingredients[] array body.

    start_idx points to the first line INSIDE the array (after the header line).
    end_idx_exclusive points to the line with '];' that closes the array.
    """
    start = None
    end = None
    for i, line in enumerate(lines):
        if line == INGREDIENTS_ARRAY_HEADER:
            start = i + 1
            continue
        if start is not None and NEXT_EXPORT_PATTERN.match(line):
            end = i
            break
    if start is None:
        raise RuntimeError('ingredients[] header not found in data.ts')
    if end is None:
        end = len(lines)
    # back up over blank lines & '];' to find true closing
    while end > start and lines[end - 1].strip() == '':
        end -= 1
    if end > start and lines[end - 1].rstrip() == ']':
        # ']' closing line - the array body ends here exclusive
        end -= 1
    return start, end


def process(lines, calculated_at, force=False):
    """Return (new_lines, stats) tuple.

    stats = {
        'total_ingredients': int,
        'scored': int,
        'skipped_no_papers': int,
        'skipped_existing': int,
        'overwritten': int,
        'samples': [(slug, score), ...]  # first 10
    }
    """
    start, end = find_ingredients_array_bounds(lines)

    out = lines[:start]  # everything up to and including '[ ' header
    stats = {
        'total_ingredients': 0,
        'scored': 0,
        'skipped_no_papers': 0,
        'skipped_existing': 0,
        'overwritten': 0,
        'samples': [],
        'all_overalls': [],
    }

    i = start
    while i < end:
        line = lines[i]
        if line == '  {':
            # Find matching '  },' or '  }'
            block_start = i
            j = i + 1
            depth = 1
            while j < end:
                cur = lines[j]
                # Top-level open/close detection at indent=2
                if cur == '  {':
                    depth += 1
                elif cur == '  },' or cur == '  }':
                    depth -= 1
                    if depth == 0:
                        break
                j += 1
            block_end = j  # line index of '  },' / '  }'
            block_lines = lines[block_start + 1:block_end]

            # Extract slug
            slug = None
            for bl in block_lines:
                m = re.match(r"^    slug:\s*'([^']+)'", bl)
                if m:
                    slug = m.group(1)
                    break

            # Detect existing evidenceScore
            existing_start = None
            existing_end = None
            for k, bl in enumerate(block_lines):
                if bl == '    evidenceScore: {':
                    existing_start = k
                    # find matching '    },' at indent 4
                    for m_idx in range(k + 1, len(block_lines)):
                        if block_lines[m_idx] == '    },':
                            existing_end = m_idx
                            break
                    break

            # Find papers array bounds within block
            papers_open_idx = None
            papers_close_idx = None
            for k, bl in enumerate(block_lines):
                if bl == '    papers: [':
                    papers_open_idx = k
                elif papers_open_idx is not None and bl == '    ],':
                    papers_close_idx = k
                    break

            if papers_open_idx is None or papers_close_idx is None:
                # No papers array — emit block as-is
                stats['total_ingredients'] += 1
                stats['skipped_no_papers'] += 1
                out.append(lines[block_start])
                out.extend(block_lines)
                out.append(lines[block_end])
                i = block_end + 1
                continue

            papers = parse_papers_in_block(block_lines, block_start)
            score = compute_score(papers)
            stats['total_ingredients'] += 1

            if score is None:
                stats['skipped_no_papers'] += 1
                out.append(lines[block_start])
                out.extend(block_lines)
                out.append(lines[block_end])
                i = block_end + 1
                continue

            stats['all_overalls'].append((slug, score['overall']))
            if len(stats['samples']) < 10:
                stats['samples'].append((slug, score))

            # Build new score block
            new_score_lines = format_score_block(score, calculated_at)

            # Reassemble block
            new_block_lines = list(block_lines)
            if existing_start is not None and existing_end is not None:
                if not force:
                    stats['skipped_existing'] += 1
                    # leave block unchanged
                    out.append(lines[block_start])
                    out.extend(block_lines)
                    out.append(lines[block_end])
                    i = block_end + 1
                    continue
                # Replace existing
                new_block_lines = (
                    block_lines[:existing_start]
                    + new_score_lines
                    + block_lines[existing_end + 1:]
                )
                stats['overwritten'] += 1
            else:
                # Insert right after papers closing line (index papers_close_idx)
                insert_at = papers_close_idx + 1
                new_block_lines = (
                    block_lines[:insert_at]
                    + new_score_lines
                    + block_lines[insert_at:]
                )
                stats['scored'] += 1

            out.append(lines[block_start])
            out.extend(new_block_lines)
            out.append(lines[block_end])
            i = block_end + 1
        else:
            out.append(line)
            i += 1

    # Append the rest (closing '];' + later exports)
    out.extend(lines[end:])
    return out, stats


def print_dry_run_report(stats):
    print(f'[scan] total ingredient blocks: {stats["total_ingredients"]}')
    print(f'[scan] would-score: {stats["scored"]}')
    print(f'[scan] would-overwrite (with --force): {stats["overwritten"]}')
    print(f'[scan] skipped (no papers): {stats["skipped_no_papers"]}')
    print(f'[scan] skipped (existing evidenceScore): {stats["skipped_existing"]}')
    print('')
    if stats['samples']:
        print('[sample] first 10 inserts:')
        for slug, score in stats['samples']:
            bd = score['breakdown']
            ps = score['paperStats']
            print(
                f'  {slug:30s} overall={score["overall"]:.1f}/10  '
                f'(pc={bd["paperCount"]:.1f}/rm={bd["rctMeta"]:.1f}/'
                f'rc={bd["recency"]:.1f}/ht={bd["humanTrial"]:.1f}) '
                f'conf={score["confidence"]:.2f} '
                f'n={ps["total"]} (rct={ps["rct"]}/meta={ps["metaAnalysis"]}/'
                f'cohort={ps["cohort"]}/obs={ps["observational"]}/'
                f'animal={ps["animal"]}/recent15y={ps["recent15y"]})'
            )
        print('')
    if stats['all_overalls']:
        vals = [v for _, v in stats['all_overalls']]
        vals_sorted = sorted(vals)
        n = len(vals)
        mean = sum(vals) / n
        print(f'[stats] overall distribution (n={n}):')
        print(f'  min={min(vals):.2f}  max={max(vals):.2f}  mean={mean:.2f}  median={vals_sorted[n//2]:.2f}')
        # Bucket
        buckets = Counter()
        for v in vals:
            if v >= 7.0:
                buckets['7.0+'] += 1
            elif v >= 5.0:
                buckets['5.0-6.9'] += 1
            elif v >= 3.0:
                buckets['3.0-4.9'] += 1
            else:
                buckets['0.0-2.9'] += 1
        for b in ['7.0+', '5.0-6.9', '3.0-4.9', '0.0-2.9']:
            cnt = buckets.get(b, 0)
            pct = cnt / n * 100 if n else 0
            print(f'  {b:9s}: {cnt:3d} ({pct:5.1f}%)')
        print('')
        # Top 10 / bottom 5
        ranked = sorted(stats['all_overalls'], key=lambda x: -x[1])
        print('[top10]')
        for slug, v in ranked[:10]:
            print(f'  {v:.2f}  {slug}')
        print('[bottom5]')
        for slug, v in ranked[-5:]:
            print(f'  {v:.2f}  {slug}')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--dry-run', action='store_true', help='compute and report only')
    parser.add_argument('--apply', action='store_true', help='write data.ts (atomic rename)')
    parser.add_argument('--force', action='store_true', help='overwrite existing evidenceScore')
    parser.add_argument('--calculated-at', default=date.today().isoformat(),
                        help='ISO date string used for lastCalculatedAt (default: today)')
    args = parser.parse_args()

    if not args.dry_run and not args.apply:
        parser.error('one of --dry-run / --apply is required')
    if args.dry_run and args.apply:
        parser.error('--dry-run and --apply are mutually exclusive')

    if not DATA_TS_PATH.exists():
        print(f'[ERROR] data.ts not found at {DATA_TS_PATH}', file=sys.stderr)
        sys.exit(2)

    text = DATA_TS_PATH.read_text(encoding='utf-8')
    lines = text.split('\n')

    print(f'[config] CURRENT_YEAR={CURRENT_YEAR}  RECENCY_CUTOFF_YEARS={RECENCY_CUTOFF_YEARS}  '
          f'FORMULA={FORMULA_VERSION}  calculated_at={args.calculated_at}  force={args.force}')
    print('')

    new_lines, stats = process(lines, args.calculated_at, force=args.force)
    print_dry_run_report(stats)

    if args.dry_run:
        print('')
        print('[dry-run] no file written. Re-run with --apply after user approval.')
        sys.exit(0)

    # Apply: atomic write
    new_text = '\n'.join(new_lines)
    if not new_text.endswith('\n') and text.endswith('\n'):
        new_text += '\n'

    # Write to tempfile in same dir, then rename
    target_dir = DATA_TS_PATH.parent
    fd, tmp_path = tempfile.mkstemp(prefix='.data.ts.', dir=str(target_dir))
    try:
        with os.fdopen(fd, 'w', encoding='utf-8') as f:
            f.write(new_text)
        os.replace(tmp_path, DATA_TS_PATH)
    except Exception:
        os.unlink(tmp_path)
        raise

    print('')
    print(f'[apply] wrote {DATA_TS_PATH} ({len(new_text)} bytes)')
    print(f'[apply] {stats["scored"]} evidenceScore inserted'
          + (f', {stats["overwritten"]} overwritten' if stats['overwritten'] else ''))


if __name__ == '__main__':
    main()
