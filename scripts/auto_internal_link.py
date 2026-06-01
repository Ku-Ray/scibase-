#!/usr/bin/env python3
"""
auto_internal_link.py

articles.ts の本文（problemBody / scienceBody / solutionBody / appendixSections[].body）
中に登場する成分 nameJa を初出 1 回だけ `[nameJa](/ingredients/slug)` Markdown link に
自動変換する。

- 既に link 化（`[X](...)`）された箇所は触らない
- `[[INGREDIENT:slug]]` ボタン構文の周辺も触らない
- 1 記事あたり最大 N 個（default 8）の制限
- 1 body field あたり同 ingredient は 1 回まで（初出のみ）

使い方:
  python3 scripts/auto_internal_link.py --dry-run    # 何を変えるか出力（書き込まない）
  python3 scripts/auto_internal_link.py --apply      # 実際に書き込む

dry-run と apply は別経路ではなく、apply は dry-run のロジックの上に書き込みを
追加する設計。dry-run の出力件数 = apply の書き込み件数 が一致する保証あり。
"""

import argparse
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
ARTICLES_TS = REPO_ROOT / "src" / "lib" / "articles.ts"
DATA_TS = REPO_ROOT / "src" / "lib" / "data.ts"

# 1 記事あたり最大何個の自動リンクを差し込むか
MAX_LINKS_PER_ARTICLE = 8

# 1 body field 内で同 ingredient を何回置換するか（初出のみ = 1）
MAX_REPLACEMENTS_PER_FIELD_PER_INGREDIENT = 1

BODY_FIELDS = ("problemBody", "scienceBody", "solutionBody")

# ─────────────────────────────────────────────────────
# 1. data.ts から成分 nameJa + slug を抽出
# ─────────────────────────────────────────────────────

# 短すぎ・曖昧で誤マッチが多発する nameJa を除外する deny list
# - 1-2 字（リン・鉄・亜鉛・葉酸・銅・鉛 等）は他の単語の部分文字列になる
# - 概念語（疲れやすい・髪・爪 等）が ingredient nameJa として登録されてる場合も除外
SHORT_NAMEJA_MIN_LEN = 4
NAMEJA_DENY_LIST = {
    "リン", "鉄", "亜鉛", "葉酸", "銅", "ヘム鉄", "肌の老化", "睡眠の質",
    "髪・爪", "免疫機能", "疲れやすい", "GABA",  # GABA は短いので別途扱い
}


def load_ingredients() -> list[tuple[str, str]]:
    """
    [(slug, nameJa), ...] を返す。
    data.ts の `ingredients: Ingredient[] = [...]` 配列のみを対象に、
    proximity マッチで slug と nameJa を pair 化（次の export 宣言で終了）。
    """
    text = DATA_TS.read_text(encoding="utf-8")
    # ingredients 配列の範囲を切り出す（concerns 配列以降は除外）
    start_m = re.search(r"export const ingredients:\s*Ingredient\[\]\s*=\s*\[", text)
    end_m = re.search(r"^export const concerns:", text, flags=re.MULTILINE)
    if not start_m or not end_m:
        raise RuntimeError("data.ts: ingredients/concerns boundary not found")
    region = text[start_m.end():end_m.start()]

    # 各 ingredient block の冒頭 (slug の直後に近接した nameJa) を pair で取り出す
    # slug と nameJa の間に nameEn・aliases 等が挟まる可能性があるので 500 字 lookahead
    pairs: list[tuple[str, str]] = []
    for m in re.finditer(r"slug:\s*'([a-z0-9-]+)',[\s\S]{0,600}?nameJa:\s*'([^']+)',", region):
        slug, name_ja = m.group(1), m.group(2)
        if name_ja in NAMEJA_DENY_LIST:
            continue
        if len(name_ja) < SHORT_NAMEJA_MIN_LEN:
            continue
        pairs.append((slug, name_ja))

    # 重複除去（同 slug が複数回 hit する可能性を排除）
    seen: set[str] = set()
    uniq: list[tuple[str, str]] = []
    for slug, name_ja in pairs:
        if slug in seen:
            continue
        seen.add(slug)
        uniq.append((slug, name_ja))

    # nameJa 長い順にソート（長いマッチ優先）
    uniq.sort(key=lambda p: len(p[1]), reverse=True)
    return uniq

# ─────────────────────────────────────────────────────
# 2. articles.ts の各 article block を抽出
# ─────────────────────────────────────────────────────

ARTICLE_BLOCK_RE = re.compile(
    r"\{\s*slug:\s*'([^']+)',",  # 各 article block の先頭 slug 行
)

def find_article_slugs(src: str) -> list[tuple[str, int]]:
    """[(slug, start_index), ...] を返す"""
    return [(m.group(1), m.start()) for m in ARTICLE_BLOCK_RE.finditer(src)]

# ─────────────────────────────────────────────────────
# 3. body フィールドの文字列リテラル範囲を取得
# ─────────────────────────────────────────────────────

def find_body_field_ranges(src: str, field_name: str, article_start: int, article_end: int) -> list[tuple[int, int]]:
    """
    article block 範囲内の `{field_name}: '...'` または
    `{field_name}: \`...\`` の文字列リテラル中身の (start, end) 位置を返す。
    `' or backtick の中身位置のみ返す（クォート自体は含まない）`
    """
    out = []
    region = src[article_start:article_end]
    # field_name: '...' (single line single-quote)
    for m in re.finditer(rf"^\s+{field_name}:\s*'", region, flags=re.MULTILINE):
        quote_start = m.end()  # ' の直後
        # 終了 ' を見つける（escaped \' は飛ばす）
        i = quote_start
        while i < len(region):
            if region[i] == "\\" and i + 1 < len(region):
                i += 2
                continue
            if region[i] == "'":
                out.append((article_start + quote_start, article_start + i))
                break
            i += 1
    # field_name: `...` (template literal, multi-line)
    for m in re.finditer(rf"^\s+{field_name}:\s*`", region, flags=re.MULTILINE):
        quote_start = m.end()
        i = quote_start
        while i < len(region):
            if region[i] == "\\" and i + 1 < len(region):
                i += 2
                continue
            if region[i] == "`":
                out.append((article_start + quote_start, article_start + i))
                break
            i += 1
    return out

# ─────────────────────────────────────────────────────
# 4. 既存リンク・特殊構文を skip マスクで保護
# ─────────────────────────────────────────────────────

SKIP_PATTERNS = [
    re.compile(r"\[\[INGREDIENT:[a-z0-9-]+\]\]"),
    re.compile(r"\[[^\]\n]+\]\([^\)\n]+\)"),   # 既存 markdown link
    re.compile(r"::summary[^\n]*"),
    re.compile(r"::point[^\n]*"),
    re.compile(r"::warning[^\n]*"),
    re.compile(r"::conclusion[^\n]*"),
    re.compile(r"::term[^\n]*"),
]

def build_skip_mask(text: str) -> list[bool]:
    """既存リンク・admonition 内文字位置を True で marking"""
    mask = [False] * len(text)
    for pat in SKIP_PATTERNS:
        for m in pat.finditer(text):
            for i in range(m.start(), m.end()):
                mask[i] = True
    return mask

# ─────────────────────────────────────────────────────
# 5. 本文文字列内の最初の nameJa 出現を [text](/ingredients/slug) に置換
# ─────────────────────────────────────────────────────

def link_first_occurrence(body: str, name_ja: str, slug: str) -> tuple[str, bool]:
    """初出 1 回だけ置換。置換したら (新文字列, True)、なければ (元文字列, False)"""
    if not name_ja or name_ja not in body:
        return body, False
    mask = build_skip_mask(body)
    idx = 0
    while True:
        pos = body.find(name_ja, idx)
        if pos == -1:
            return body, False
        # mask に重なる場所はスキップ
        if any(mask[pos:pos + len(name_ja)]):
            idx = pos + 1
            continue
        # 前後が直前 `[` or 直後 `](` だと既存 link の text 部分なのでスキップ（保険）
        before = body[pos - 1] if pos > 0 else ""
        after = body[pos + len(name_ja):pos + len(name_ja) + 2] if pos + len(name_ja) < len(body) else ""
        if before == "[" or after.startswith("]("):
            idx = pos + 1
            continue
        # 置換
        replacement = f"[{name_ja}](/ingredients/{slug})"
        return body[:pos] + replacement + body[pos + len(name_ja):], True

# ─────────────────────────────────────────────────────
# 6. メイン処理
# ─────────────────────────────────────────────────────

def process_article(
    src: str,
    article_slug: str,
    article_start: int,
    article_end: int,
    ingredients: list[tuple[str, str]],
    max_per_article: int = MAX_LINKS_PER_ARTICLE,
) -> tuple[str, list[tuple[str, str, str]]]:
    """
    article 内の body fields を順に走査。
    nameJa 長い順に試行、各 field で同 ingredient 1 回 / 全 field 合計 max_per_article 件まで。
    戻り値: (修正後 src, [(field_name, slug, name_ja), ...] 置換ログ)
    """
    log = []
    linked_in_article: set[str] = set()  # 同 article 内で 1 ingredient 1 回まで
    new_src = src

    # 各 body field の範囲を再計算するため、offset 補正用の delta を保持
    for field in BODY_FIELDS:
        if len(linked_in_article) >= max_per_article:
            break
        # field 範囲は new_src ベースで取り直し
        # article 範囲も new_src 上で取り直す必要があるが、article_start 以降の編集なので
        # article_start は不変、article_end のみ delta を加算
        cur_article_start = article_start
        cur_article_end = article_end + (len(new_src) - len(src))
        ranges = find_body_field_ranges(new_src, field, cur_article_start, cur_article_end)
        # ranges は同 field でも複数（あるはずないが念のため）
        for body_start, body_end in ranges:
            if len(linked_in_article) >= max_per_article:
                break
            body = new_src[body_start:body_end]
            new_body = body
            for slug, name_ja in ingredients:
                if slug in linked_in_article:
                    continue
                if len(linked_in_article) >= max_per_article:
                    break
                # 自記事 slug への self-link を除外（記事 slug が `<ing>-` で始まる場合）
                if article_slug == slug or article_slug.startswith(f"{slug}-"):
                    continue
                replaced, changed = link_first_occurrence(new_body, name_ja, slug)
                if changed:
                    new_body = replaced
                    linked_in_article.add(slug)
                    log.append((field, slug, name_ja))
            if new_body != body:
                new_src = new_src[:body_start] + new_body + new_src[body_end:]

    return new_src, log


def main():
    parser = argparse.ArgumentParser()
    g = parser.add_mutually_exclusive_group(required=True)
    g.add_argument("--dry-run", action="store_true", help="プレビューのみ（書き込まない）")
    g.add_argument("--apply", action="store_true", help="本番書き込み")
    parser.add_argument("--max-per-article", type=int, default=MAX_LINKS_PER_ARTICLE)
    parser.add_argument("--limit-articles", type=int, default=0, help=">0 なら最初の N 件のみ処理（試験用）")
    args = parser.parse_args()

    ingredients = load_ingredients()
    print(f"# loaded {len(ingredients)} ingredients", file=sys.stderr)

    src = ARTICLES_TS.read_text(encoding="utf-8")
    article_slugs = find_article_slugs(src)
    print(f"# found {len(article_slugs)} article blocks", file=sys.stderr)

    # 各 article block の (start, end) を出す
    # block end は次の slug 開始位置（or 末尾）
    bounds = []
    for i, (slug, start) in enumerate(article_slugs):
        end = article_slugs[i + 1][1] if i + 1 < len(article_slugs) else len(src)
        bounds.append((slug, start, end))

    if args.limit_articles > 0:
        bounds = bounds[: args.limit_articles]

    total_links = 0
    affected_articles = 0
    print("# ─── dry-run preview ───" if args.dry_run else "# ─── apply ───")
    print(f"{'article_slug':<60} {'field':<14} {'ingredient_slug':<32} nameJa")
    new_src = src
    # bounds は src 上の座標。new_src を編集すると以降の bounds が ずれるので、
    # 後ろから処理する。
    for slug, start, end in reversed(bounds):
        before_len = len(new_src)
        processed, log = process_article(new_src, slug, start, end, ingredients, args.max_per_article)
        if log:
            affected_articles += 1
            total_links += len(log)
            for field, ing_slug, name_ja in log:
                print(f"{slug:<60} {field:<14} {ing_slug:<32} {name_ja}")
        new_src = processed

    print(f"\n# summary: {total_links} links across {affected_articles} articles (of {len(bounds)})", file=sys.stderr)

    if args.apply:
        ARTICLES_TS.write_text(new_src, encoding="utf-8")
        print(f"# wrote {ARTICLES_TS}", file=sys.stderr)
    else:
        # dry-run: 差分サンプル出力（最初の article で diff を出す）
        if new_src != src:
            # 最初の差分位置
            for i, (a, b) in enumerate(zip(src, new_src)):
                if a != b:
                    print(f"\n# first diff at index {i}", file=sys.stderr)
                    print(f"# before: ...{src[max(0,i-40):i+60]!r}", file=sys.stderr)
                    print(f"# after : ...{new_src[max(0,i-40):i+60]!r}", file=sys.stderr)
                    break


if __name__ == "__main__":
    main()
