#!/usr/bin/env python3
"""
Phase 6: 全 331 成分に PubMed 検索URL を publicDbReferences[] に追加。
- 各成分の nameEn を取得して "[nameEn] supplementation" クエリで検索URL生成
- 既存 publicDbReferences[] あれば末尾に append・なければ新規セクション作成
- usage_type が 'topical' の成分は "[nameEn] skin" クエリにする
"""
import re
import sys
import urllib.parse
from pathlib import Path

DATA_TS_PATH = Path("/tmp/agescience-phase6-pubmed/src/lib/data.ts")
ACCESSED_AT = "2026-05-16"
PUBMED_FULLNAME = "PubMed (NLM・米国国立医学図書館) 学術論文検索"


def build_query(name_en, usage_type):
    base = name_en.strip()
    if usage_type and 'topical' in usage_type.lower():
        return f"{base} skin clinical trial"
    return f"{base} supplementation"


def find_ingredient_block(text, slug):
    """Return (slug_start, ingredient_end_approx). Used to scope our search within an ingredient."""
    slug_pat = re.compile(r"^(\s*)slug:\s*'" + re.escape(slug) + r"'\s*,", re.MULTILINE)
    m = slug_pat.search(text)
    if not m:
        return None
    slug_pos = m.start()
    # Find next `^  },` after this position (closing brace of ingredient object)
    end_pat = re.compile(r"^  \},\s*$", re.MULTILINE)
    em = end_pat.search(text, slug_pos)
    end_pos = em.end() if em else len(text)
    return slug_pos, end_pos


def get_ingredient_info(text, slug):
    """Get nameEn and usageType for a slug."""
    block = find_ingredient_block(text, slug)
    if not block:
        return None
    slug_pos, end_pos = block
    ingredient_text = text[slug_pos:end_pos]
    name_en_m = re.search(r"nameEn:\s*'([^']+)'", ingredient_text)
    usage_m = re.search(r"usageType:\s*'([^']+)'", ingredient_text)
    if not name_en_m:
        return None
    return name_en_m.group(1), (usage_m.group(1) if usage_m else 'oral')


def find_publicdb_close(text, slug):
    """Find closing ] of existing publicDbReferences[] for slug. Return (close_line_start, indent) or None."""
    block = find_ingredient_block(text, slug)
    if not block:
        return None
    slug_pos, end_pos = block
    pdb_pat = re.compile(r"^(\s*)publicDbReferences:\s*\[", re.MULTILINE)
    pm = pdb_pat.search(text, slug_pos, end_pos)
    if not pm:
        return None
    indent = pm.group(1)
    i = pm.end() - 1  # at [
    depth = 0
    j = i
    while j < end_pos:
        c = text[j]
        if c == "[":
            depth += 1
        elif c == "]":
            depth -= 1
            if depth == 0:
                line_start = text.rfind("\n", 0, j) + 1
                return (line_start, indent)
        j += 1
    return None


def find_papers_close_for_new(text, slug):
    """For ingredients without existing publicDbReferences, find papers[] closing eol."""
    block = find_ingredient_block(text, slug)
    if not block:
        return None
    slug_pos, end_pos = block
    papers_pat = re.compile(r"^(\s*)papers:\s*\[", re.MULTILINE)
    pm = papers_pat.search(text, slug_pos, end_pos)
    if not pm:
        return None
    indent = pm.group(1)
    i = pm.end() - 1
    depth = 0
    j = i
    while j < end_pos:
        c = text[j]
        if c == "[":
            depth += 1
        elif c == "]":
            depth -= 1
            if depth == 0:
                eol = text.find("\n", j)
                return (eol, indent)
        j += 1
    return None


def main():
    text = DATA_TS_PATH.read_text(encoding="utf-8")
    all_slugs = re.findall(r"^    slug: '([a-z0-9-]+)',", text, flags=re.MULTILINE)
    print(f"Found {len(all_slugs)} ingredients")

    insertions = []  # list of (pos, is_append, indent, slug, query, url)
    skipped = []
    for slug in all_slugs:
        info = get_ingredient_info(text, slug)
        if not info:
            skipped.append(slug)
            continue
        name_en, usage = info
        query = build_query(name_en, usage)
        url = f"https://pubmed.ncbi.nlm.nih.gov/?term={urllib.parse.quote_plus(query)}"

        # check existing publicDbReferences
        close_block = find_publicdb_close(text, slug)
        if close_block:
            pos, indent = close_block
            insertions.append((pos, True, indent, slug, query, url))
        else:
            new_block = find_papers_close_for_new(text, slug)
            if not new_block:
                skipped.append(slug)
                continue
            pos, indent = new_block
            insertions.append((pos, False, indent, slug, query, url))

    if skipped:
        print(f"WARN: skipped {len(skipped)} slugs: {skipped[:10]}{'...' if len(skipped)>10 else ''}", file=sys.stderr)

    # Sort by pos descending
    insertions.sort(key=lambda x: -x[0])
    for pos, is_append, indent, slug, query, url in insertions:
        note_text = f"PubMed 検索結果: {query}（メタ解析・RCT・観察研究 等）"
        if is_append:
            # indent is the "    " for "    publicDbReferences: ["
            item_indent = indent + "  "
            entry = (
                f"{item_indent}{{\n"
                f"{item_indent}  source: 'pubmed',\n"
                f"{item_indent}  fullName: '{PUBMED_FULLNAME}',\n"
                f"{item_indent}  url: '{url}',\n"
                f"{item_indent}  accessedAt: '{ACCESSED_AT}',\n"
                f"{item_indent}  note: '{note_text}',\n"
                f"{item_indent}}},\n"
            )
            text = text[:pos] + entry + text[pos:]
        else:
            # insert new section after papers[] close eol
            block_text = (
                f"\n{indent}publicDbReferences: [\n"
                f"{indent}  {{\n"
                f"{indent}    source: 'pubmed',\n"
                f"{indent}    fullName: '{PUBMED_FULLNAME}',\n"
                f"{indent}    url: '{url}',\n"
                f"{indent}    accessedAt: '{ACCESSED_AT}',\n"
                f"{indent}    note: '{note_text}',\n"
                f"{indent}  }},\n"
                f"{indent}],"
            )
            text = text[:pos] + block_text + text[pos:]

    DATA_TS_PATH.write_text(text, encoding="utf-8")
    print(f"OK: PubMed added to {len(insertions)} ingredients ({len(skipped)} skipped)")


if __name__ == "__main__":
    main()
