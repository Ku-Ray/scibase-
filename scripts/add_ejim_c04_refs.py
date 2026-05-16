#!/usr/bin/env python3
"""
eJIM c04 ハーブ + NIH NCCIH 原典を 17 成分に新規 publicDbReferences[] として追加。
- mapping CSV: phase3_ejim/ejim_c04_mapping.csv
- nccih_sources TSV: phase3_ejim/ejim_c04_nih_sources.tsv
- 各成分の papers: [...] 直後に新規 publicDbReferences: [...] を挿入
"""
import csv
import re
import sys
from pathlib import Path

CSV_MAP = Path(
    "/Users/raykudo/secretary_bot/knowledge/scibase_roadmap/next_week_20260515/x5_hfnet_data/phase3_ejim/ejim_c04_mapping.csv"
)
TSV_NIH = Path(
    "/Users/raykudo/secretary_bot/knowledge/scibase_roadmap/next_week_20260515/x5_hfnet_data/phase3_ejim/ejim_c04_nih_sources.tsv"
)
DATA_TS_PATH = Path("/tmp/agescience-ejim-c04/src/lib/data.ts")
EJIM_BASE = "https://www.ejim.mhlw.go.jp"
ACCESSED_AT = "2026-05-16"
EJIM_FULLNAME = "厚生労働省eJIM「統合医療」情報発信サイト"
NCCIH_FULLNAME = "NIH NCCIH (National Center for Complementary and Integrative Health)"


def load_data():
    refs = {}
    with CSV_MAP.open(encoding="utf-8") as f:
        for row in csv.DictReader(f):
            refs[row["slug"]] = {
                "ejim_url": EJIM_BASE + row["ejim_path"],
                "ejim_title": row["ejim_title"],
                "note": row["note"],
            }
    with TSV_NIH.open(encoding="utf-8") as f:
        for row in csv.DictReader(f, delimiter="\t"):
            slug = row["slug"]
            if slug in refs:
                refs[slug]["nccih_url"] = row["nccih_url"]
    return refs


def find_papers_close(text, slug):
    """Return (eol_after_papers_close, indent) for the slug's papers[] block."""
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
    refs = load_data()
    text = DATA_TS_PATH.read_text(encoding="utf-8")

    insertions = []
    missing = []
    for slug, ref in refs.items():
        block = find_papers_close(text, slug)
        if block is None:
            missing.append(slug)
            continue
        eol, indent = block
        insertions.append((eol, indent, slug, ref))

    if missing:
        print(f"ERROR: slug not found or papers[] missing: {missing}", file=sys.stderr)
        sys.exit(1)

    insertions.sort(key=lambda x: -x[0])
    for eol, indent, slug, ref in insertions:
        nccih_url = ref.get("nccih_url", "").strip()
        block = (
            f"\n{indent}publicDbReferences: [\n"
            f"{indent}  {{\n"
            f"{indent}    source: 'ejim',\n"
            f"{indent}    fullName: '{EJIM_FULLNAME}',\n"
            f"{indent}    url: '{ref['ejim_url']}',\n"
            f"{indent}    accessedAt: '{ACCESSED_AT}',\n"
            f"{indent}    note: '{ref['note']}',\n"
            f"{indent}  }},\n"
        )
        if nccih_url:
            block += (
                f"{indent}  {{\n"
                f"{indent}    source: 'nccih',\n"
                f"{indent}    fullName: '{NCCIH_FULLNAME}',\n"
                f"{indent}    url: '{nccih_url}',\n"
                f"{indent}    accessedAt: '{ACCESSED_AT}',\n"
                f"{indent}    note: 'NIH NCCIH 英語原典・eJIM 翻訳元',\n"
                f"{indent}  }},\n"
            )
        block += f"{indent}],"
        text = text[:eol] + block + text[eol:]

    DATA_TS_PATH.write_text(text, encoding="utf-8")
    print(f"OK: added publicDbReferences to {len(insertions)} ingredients")


if __name__ == "__main__":
    main()
