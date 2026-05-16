#!/usr/bin/env python3
"""
eJIM + NIH ODS/NCCIH 公的DB引用を 16 成分の既存 publicDbReferences[] に追加するスクリプト。
- mapping CSV: phase3_ejim/ejim_mapping.csv
- nih_sources TSV: phase3_ejim/ejim_nih_sources.tsv
- 各成分の publicDbReferences: [...] の閉じ ] 直前に 2 entry（ejim + nih-ods/nccih）を挿入
"""
import csv
import re
import sys
from pathlib import Path

CSV_MAP = Path(
    "/Users/raykudo/secretary_bot/knowledge/scibase_roadmap/next_week_20260515/x5_hfnet_data/phase3_ejim/ejim_mapping.csv"
)
TSV_NIH = Path(
    "/Users/raykudo/secretary_bot/knowledge/scibase_roadmap/next_week_20260515/x5_hfnet_data/phase3_ejim/ejim_nih_sources.tsv"
)
DATA_TS_PATH = Path("/tmp/agescience-ejim-ref/src/lib/data.ts")
EJIM_BASE = "https://www.ejim.mhlw.go.jp"
ACCESSED_AT = "2026-05-16"

EJIM_FULLNAME = "厚生労働省eJIM「統合医療」情報発信サイト"
NIH_ODS_FULLNAME = "NIH ODS (Office of Dietary Supplements) Fact Sheet"
NCCIH_FULLNAME = "NIH NCCIH (National Center for Complementary and Integrative Health)"


def load_mapping():
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
                refs[slug]["nih_url"] = row["nih_url"]
                refs[slug]["nih_type"] = row["nih_type"]
    return refs


def find_existing_publicdb_block(text, slug):
    """Find the publicDbReferences: [ ... ] block for a given slug.
    Returns (close_bracket_line_start_pos, indent) or None."""
    slug_pattern = re.compile(r"^(\s*)slug:\s*'" + re.escape(slug) + r"'\s*,", re.MULTILINE)
    m = slug_pattern.search(text)
    if not m:
        return None
    slug_pos = m.start()
    # Find publicDbReferences: [
    pdb_pattern = re.compile(r"^(\s*)publicDbReferences:\s*\[", re.MULTILINE)
    pm = pdb_pattern.search(text, slug_pos)
    if not pm:
        return None
    indent = pm.group(1)
    # Walk forward, finding the matching close ]
    i = pm.end() - 1  # at [
    depth = 0
    j = i
    while j < len(text):
        c = text[j]
        if c == "[":
            depth += 1
        elif c == "]":
            depth -= 1
            if depth == 0:
                # j is at ]. We want to insert before the line that contains ].
                # Find start of that line.
                line_start = text.rfind("\n", 0, j) + 1
                return (line_start, indent)
        j += 1
    return None


def main():
    refs = load_mapping()
    text = DATA_TS_PATH.read_text(encoding="utf-8")

    insertions = []  # list of (line_start_pos, indent, slug, ref)
    missing = []
    for slug, ref in refs.items():
        block = find_existing_publicdb_block(text, slug)
        if block is None:
            missing.append(slug)
            continue
        line_start, indent = block
        insertions.append((line_start, indent, slug, ref))

    if missing:
        print(f"ERROR: publicDbReferences[] not found for: {missing}", file=sys.stderr)
        sys.exit(1)

    # Insert from bottom to top
    insertions.sort(key=lambda x: -x[0])

    for line_start, indent, slug, ref in insertions:
        # indent is "    " for "    publicDbReferences: ["
        # inner item indent is indent + "  "
        item_indent = indent + "  "
        nih_url = ref.get("nih_url", "").strip()
        nih_type = ref.get("nih_type", "").strip()
        # build ejim entry
        ejim_entry = (
            f"{item_indent}{{\n"
            f"{item_indent}  source: 'ejim',\n"
            f"{item_indent}  fullName: '{EJIM_FULLNAME}',\n"
            f"{item_indent}  url: '{ref['ejim_url']}',\n"
            f"{item_indent}  accessedAt: '{ACCESSED_AT}',\n"
            f"{item_indent}  note: '{ref['note']}',\n"
            f"{item_indent}}},\n"
        )
        # build nih entry
        nih_entry = ""
        if nih_url:
            if nih_type.startswith("ods"):
                nih_source = "nih-ods"
                nih_full = NIH_ODS_FULLNAME
                ods_label = "Consumer" if nih_type == "ods-consumer" else (
                    "HealthProfessional" if nih_type == "ods-hp" else "QuickFacts"
                )
                nih_note = f"NIH ODS Fact Sheet ({ods_label}) 英語原典・eJIM 翻訳元"
            else:
                nih_source = "nccih"
                nih_full = NCCIH_FULLNAME
                nih_note = "NIH NCCIH 英語原典・eJIM 翻訳元"
            nih_entry = (
                f"{item_indent}{{\n"
                f"{item_indent}  source: '{nih_source}',\n"
                f"{item_indent}  fullName: '{nih_full}',\n"
                f"{item_indent}  url: '{nih_url}',\n"
                f"{item_indent}  accessedAt: '{ACCESSED_AT}',\n"
                f"{item_indent}  note: '{nih_note}',\n"
                f"{item_indent}}},\n"
            )
        block_text = ejim_entry + nih_entry
        text = text[:line_start] + block_text + text[line_start:]

    DATA_TS_PATH.write_text(text, encoding="utf-8")
    print(f"OK: appended ejim+nih entries to {len(insertions)} ingredients")


if __name__ == "__main__":
    main()
