#!/usr/bin/env python3
"""
normalize_study_types.py

src/lib/data.ts に書かれた Paper.studyType を v2.2 mapping ルールの 5 値
('rct' / 'meta-analysis' / 'cohort' / 'observational' / 'animal') に正規化する
監査スクリプト。

設計仕様（n3_evidence_score_v2_design.md section 4）に基づき、論文タイトル文字列
などが混入した異常値を検出 → dry-run で diff 提示 → ユーザー承認 → 個別 Edit。

過去事故防止のため、本スクリプトは perl -i -pe / sed -i での書き込みを
一切行わない。dry-run と監査レポートのみ提供する。

実行:
    python3 scripts/normalize_study_types.py --dry-run   # 異常値を一覧表示
    python3 scripts/normalize_study_types.py             # 異常値があればエラー終了
"""

import argparse
import re
import sys
from pathlib import Path

VALID_STUDY_TYPES = {
    'rct',
    'meta-analysis',
    'cohort',
    'observational',
    'animal',
}

NORMALIZATION_HINTS = {
    # よくある別表記 → 正規化先（参考用・自動変換はしない）
    'randomized-controlled-trial': 'rct',
    'randomized controlled trial': 'rct',
    'RCT': 'rct',
    'systematic-review': 'meta-analysis',
    'systematic review': 'meta-analysis',
    'meta analysis': 'meta-analysis',
    'case-control': 'observational',
    'cross-sectional': 'observational',
    'in-vitro': 'animal',
    'mouse': 'animal',
    'cell': 'animal',
}

DATA_TS_PATH = Path(__file__).resolve().parent.parent / 'src' / 'lib' / 'data.ts'

STUDY_TYPE_PATTERN = re.compile(r"studyType:\s*'([^']*)'")


def scan(data_ts: Path):
    text = data_ts.read_text(encoding='utf-8')
    findings = []
    for lineno, line in enumerate(text.splitlines(), start=1):
        m = STUDY_TYPE_PATTERN.search(line)
        if not m:
            continue
        value = m.group(1)
        if value not in VALID_STUDY_TYPES:
            findings.append((lineno, value, line.strip()))
    return findings


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--dry-run', action='store_true',
                        help='Show anomalies and exit 0 (default mode)')
    parser.add_argument('--strict', action='store_true',
                        help='Exit 1 if any anomaly found (CI mode)')
    args = parser.parse_args()

    if not DATA_TS_PATH.exists():
        print(f'[ERROR] data.ts not found at {DATA_TS_PATH}', file=sys.stderr)
        sys.exit(2)

    findings = scan(DATA_TS_PATH)

    print(f'[scan] target: {DATA_TS_PATH}')
    print(f'[scan] valid studyType values: {sorted(VALID_STUDY_TYPES)}')

    if not findings:
        print('[ok] 0 anomalies — all studyType values are normalized.')
        sys.exit(0)

    print(f'[warn] {len(findings)} anomalies detected:')
    print('')
    print('  line:value  → suggested normalization')
    print('  ' + '-' * 70)
    for lineno, value, raw in findings:
        hint = NORMALIZATION_HINTS.get(value, '<unknown — needs manual review>')
        print(f'  L{lineno}: {value!r}  → {hint}')
        print(f'      raw: {raw}')

    print('')
    print('[next] Use the Edit tool to fix each occurrence individually.')
    print('       Do NOT use perl -i -pe / sed -i (past incident).')

    if args.strict:
        sys.exit(1)
    sys.exit(0)


if __name__ == '__main__':
    main()
