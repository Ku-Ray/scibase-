#!/usr/bin/env python3
"""
Phase 5: NCCIH / NIH ODS のみ（eJIM 未掲載・hfnet 未掲載）成分に新規 publicDbReferences[] 追加。
- mapping CSV: phase3_ejim/phase5_nih_only.csv
- 各成分の papers: [...] 直後に新規 publicDbReferences: [...] を挿入（1 entry のみ）
"""
import csv
import re
import sys
from pathlib import Path

CSV_MAP = Path(
    "/Users/raykudo/secretary_bot/knowledge/scibase_roadmap/next_week_20260515/x5_hfnet_data/phase3_ejim/phase5_nih_only.csv"
)
DATA_TS_PATH = Path("/tmp/agescience-phase5-nih/src/lib/data.ts")
ACCESSED_AT = "2026-05-16"
SOURCE_FULLNAME = {
    "nccih": "NIH NCCIH (National Center for Complementary and Integrative Health)",
    "nih-ods": "NIH ODS (Office of Dietary Supplements) Fact Sheet",
}


def load_data():
    rows = []
    with CSV_MAP.open(encoding="utf-8") as f:
        for row in csv.DictReader(f):
            rows.append(row)
    return rows


def find_papers_close(text, slug):
    slug_pat = re.compile(r"^(\s*)slug:\s*'" + re.escape(slug) + r"'\s*,", re.MULTILINE)
    m = slug_pat.search(text)
    if not m:
        return None
    slug_pos = m.start()
    papers_pat = re.compile(r"^(\s*)papers:\s*\[", re.MULTILINE)
    pm = papers_pat.search(text, slug_pos)
    if not pm:
        return None
    indent = pm.group(1)
    i = pm.end() - 1
    depth = 0
    j = i
    while j < len(text):
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
    rows = load_data()
    text = DATA_TS_PATH.read_text(encoding="utf-8")

    insertions = []
    missing = []
    for row in rows:
        slug = row["slug"]
        block = find_papers_close(text, slug)
        if block is None:
            missing.append(slug)
            continue
        eol, indent = block
        insertions.append((eol, indent, row))

    if missing:
        print(f"ERROR: slug not found or papers[] missing: {missing}", file=sys.stderr)
        sys.exit(1)

    insertions.sort(key=lambda x: -x[0])
    for eol, indent, row in insertions:
        source = row["source"]
        fullname = SOURCE_FULLNAME[source]
        block = (
            f"\n{indent}publicDbReferences: [\n"
            f"{indent}  {{\n"
            f"{indent}    source: '{source}',\n"
            f"{indent}    fullName: '{fullname}',\n"
            f"{indent}    url: '{row['url']}',\n"
            f"{indent}    accessedAt: '{ACCESSED_AT}',\n"
            f"{indent}    note: '{row['note']}',\n"
            f"{indent}  }},\n"
            f"{indent}],"
        )
        text = text[:eol] + block + text[eol:]

    DATA_TS_PATH.write_text(text, encoding="utf-8")
    print(f"OK: added publicDbReferences to {len(insertions)} ingredients")


if __name__ == "__main__":
    main()
