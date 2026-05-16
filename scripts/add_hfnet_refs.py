#!/usr/bin/env python3
"""
hfnet 公的DB引用を data.ts の32成分に追加するスクリプト。
- CSV: /Users/raykudo/secretary_bot/knowledge/scibase_roadmap/next_week_20260515/x5_hfnet_data/hfnet_urls.csv
- 各成分の papers: [...] 直後に publicDbReferences: [...] を挿入。
- 日本語URLは encodeURI 通し済みで書き込む。
"""
import csv
import re
import sys
import urllib.parse
from pathlib import Path

CSV_PATH = Path(
    "/Users/raykudo/secretary_bot/knowledge/scibase_roadmap/next_week_20260515/x5_hfnet_data/hfnet_urls.csv"
)
DATA_TS_PATH = Path("/tmp/agescience-hfnet-ref/src/lib/data.ts")
ACCESSED_AT = "2026-05-16"
FULL_NAME = "国立健康・栄養研究所「健康食品」の安全性・有効性情報"


def encode_url(url: str) -> str:
    """日本語成分のみ encodeURIComponent し、ASCII セグメントは触らない。"""
    parts = url.split("/")
    encoded = []
    for p in parts:
        if any(ord(c) > 127 for c in p):
            encoded.append(urllib.parse.quote(p, safe=""))
        else:
            encoded.append(p)
    return "/".join(encoded)


def load_refs():
    refs = {}
    with CSV_PATH.open(encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            slug = row["slug"].strip()
            url = encode_url(row["hfnet_url"].strip())
            note = row["note"].strip()
            refs[slug] = {"url": url, "note": note}
    return refs


def find_ingredient_block(text: str, slug: str):
    """Return (slug_line_start_idx, papers_end_idx, indent_str) or None."""
    slug_pattern = re.compile(r"^(\s*)slug:\s*'" + re.escape(slug) + r"'\s*,", re.MULTILINE)
    m = slug_pattern.search(text)
    if not m:
        return None
    slug_pos = m.start()
    # Find ingredient end - next "    {" or end of file. Just need to find papers: [ after this.
    papers_pattern = re.compile(r"^(\s*)papers:\s*\[", re.MULTILINE)
    pm = papers_pattern.search(text, slug_pos)
    if not pm:
        return None
    papers_indent = pm.group(1)
    # find matching ], starting from pm.end()
    # walk bracket count
    i = pm.end() - 1  # at the [
    assert text[i] == "["
    depth = 0
    j = i
    while j < len(text):
        c = text[j]
        if c == "[":
            depth += 1
        elif c == "]":
            depth -= 1
            if depth == 0:
                # find newline + papers_indent + ],
                # Actually j is at ]. The pattern in source is "],". Check next char.
                # Insertion goes after the line "    ],"
                # Find end of line
                eol = text.find("\n", j)
                return (slug_pos, eol, papers_indent)
        j += 1
    return None


def main():
    refs = load_refs()
    text = DATA_TS_PATH.read_text(encoding="utf-8")

    # Process in reverse order of position so insertions don't shift later positions.
    insertions = []  # list of (eol_pos, indent, slug, ref)
    missing = []
    for slug, ref in refs.items():
        block = find_ingredient_block(text, slug)
        if block is None:
            missing.append(slug)
            continue
        _, eol, indent = block
        insertions.append((eol, indent, slug, ref))

    if missing:
        print(f"ERROR: slug not found: {missing}", file=sys.stderr)
        sys.exit(1)

    # Sort by eol descending so we insert from bottom to top
    insertions.sort(key=lambda x: -x[0])

    for eol, indent, slug, ref in insertions:
        block = (
            f"\n{indent}publicDbReferences: [\n"
            f"{indent}  {{\n"
            f"{indent}    source: 'hfnet',\n"
            f"{indent}    fullName: '{FULL_NAME}',\n"
            f"{indent}    url: '{ref['url']}',\n"
            f"{indent}    accessedAt: '{ACCESSED_AT}',\n"
            f"{indent}    note: '{ref['note']}',\n"
            f"{indent}  }},\n"
            f"{indent}],"
        )
        text = text[: eol] + block + text[eol:]

    DATA_TS_PATH.write_text(text, encoding="utf-8")
    print(f"OK: inserted publicDbReferences into {len(insertions)} ingredients")


if __name__ == "__main__":
    main()
