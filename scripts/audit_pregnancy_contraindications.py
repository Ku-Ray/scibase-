#!/usr/bin/env python3
"""
data.ts の妊娠/授乳 contraindications 網羅性 audit。

AnalyzerDeepMode の妊娠中除外ロジックは data.ts の `contraindications` フィールドに
「妊娠」「授乳」が含まれているかで判定する。data.ts の記載漏れがあると妊婦に
推奨されてはいけない成分が推奨されてしまう YMYL リスクになる。

このスクリプトは:
1. 主要ハーブ・既知の妊娠中要注意成分が data.ts に妊娠/授乳記載があるか監査
2. 記載漏れ slug を一覧出力（AnalyzerDeepMode.tsx の PREGNANCY_HERB_FALLBACK に追加すべき）

実行: python3 scripts/audit_pregnancy_contraindications.py
"""

import re
import sys
from pathlib import Path

DATA_TS = Path(__file__).resolve().parents[1] / 'src' / 'lib' / 'data.ts'

# 主要 keyword で「これに当てはまる成分は妊娠中の安全データ不足の可能性が高い」とフラグするためのリスト
HERB_KEYWORDS = [
    # 既知の妊娠中禁忌 / 慎重投与
    'ashwagandha', 'rhodiola', 'ginkgo', 'panax-ginseng', 'maca', 'evening-primrose',
    'kava', 'valerian', 'fenugreek', 'tribulus', 'red-clover', 'black-cohosh',
    'saw-palmetto', 'dhea', 'pregnenolone', 'melatonin', 'berberine',
    # アダプトゲン・植物性ハーブ系
    'tongkat-ali', 'eleuthero', 'damiana', 'mucuna', 'andrographis',
    'shilajit', 'reishi', 'cordyceps', 'lion-mane', 'chaga',
    'turmeric-high', 'curcumin-high', 'ginger-high',
    # ホルモン作用が示唆される
    'chasteberry', 'vitex', 'wild-yam', 'damiana', 'maca-w',
    # その他高用量
    'high-dose-vitamin-a', 'high-dose-niacin',
]


def load_ingredients():
    """data.ts から各 ingredient ブロックを取り出して {slug: {contraindications, sideEffects, tagline}} を返す。"""
    content = DATA_TS.read_text()
    out = {}
    # 各 ingredient block (slug: 'X' ... },)
    for m in re.finditer(r"slug: '([^']+)'(.*?)(?=\n  \},)", content, re.DOTALL):
        slug = m.group(1)
        block = m.group(2)
        contra = []
        se = []
        contra_m = re.search(r'contraindications:\s*\[([^\]]+)\]', block, re.DOTALL)
        if contra_m:
            contra = re.findall(r"'([^']+)'", contra_m.group(1))
        se_m = re.search(r'sideEffects:\s*\[([^\]]+)\]', block, re.DOTALL)
        if se_m:
            se = re.findall(r"'([^']+)'", se_m.group(1))
        out[slug] = {
            'contraindications': contra,
            'sideEffects': se,
        }
    return out


def main():
    data = load_ingredients()
    print(f'Loaded {len(data)} ingredients from data.ts')
    print()

    # 1. 全体統計
    has_preg = sum(1 for d in data.values() if any('妊娠' in c or '妊婦' in c for c in d['contraindications']))
    has_nurs = sum(1 for d in data.values() if any('授乳' in c for c in d['contraindications']))
    print(f'妊娠/妊婦 を contraindications に持つ: {has_preg}/{len(data)} ({has_preg / len(data):.1%})')
    print(f'授乳 を contraindications に持つ:    {has_nurs}/{len(data)} ({has_nurs / len(data):.1%})')
    print()

    # 2. fallback list を先に読み込む（カバー判定で使う）
    fallback_in_code = []
    deep_mode_file = Path(__file__).resolve().parents[1] / 'src' / 'components' / 'AnalyzerDeepMode.tsx'
    if deep_mode_file.exists():
        deep_src = deep_mode_file.read_text()
        m = re.search(r'PREGNANCY_HERB_FALLBACK\s*=\s*new Set<string>\(\[([^\]]+)\]\)', deep_src, re.DOTALL)
        if m:
            fallback_in_code = re.findall(r"'([^']+)'", m.group(1))
    fallback_set = set(fallback_in_code)

    # 3. HERB_KEYWORDS にマッチする slug で妊娠記載がないもの・fallback でカバーされてないもの
    print('=== 妊娠記載漏れの可能性がある成分 ===')
    print('(主要ハーブ keyword にマッチするが contraindications に妊娠/妊婦/授乳の記載なし)')
    print()
    flagged_uncovered = []  # fallback でも data.ts でもカバーされていない
    flagged_fallback_only = []  # fallback でカバー済（data.ts 不備として記録）
    for slug, d in sorted(data.items()):
        for kw in HERB_KEYWORDS:
            if kw not in slug:
                continue
            text = '｜'.join(d['contraindications'])
            has_p = '妊娠' in text or '妊婦' in text
            has_n = '授乳' in text
            if not (has_p or has_n):
                if slug in fallback_set:
                    flagged_fallback_only.append(slug)
                else:
                    flagged_uncovered.append(slug)
            break

    if flagged_uncovered:
        print('🚨 fallback 未登録（最優先で対応）:')
        for slug in flagged_uncovered:
            contra = data[slug]['contraindications']
            print(f'  ❌ {slug}')
            print(f'      contraindications = {contra}')
        print()

    if flagged_fallback_only:
        print('🔧 fallback でカバー済（data.ts 不備として記録）:')
        for slug in flagged_fallback_only:
            print(f'  🔧 {slug}')
        print()

    if not flagged_uncovered and not flagged_fallback_only:
        print('  ✅ 主要ハーブの妊娠/授乳記載は全て揃っています')
        print()

    if flagged_uncovered or flagged_fallback_only:
        print('→ 対応案:')
        print('  A. data.ts の各 ingredient.contraindications に「妊娠中」「授乳中」を追記（理想）')
        print('  B. src/components/AnalyzerDeepMode.tsx の PREGNANCY_HERB_FALLBACK に追加（短期）')

    print()
    print('=== AnalyzerDeepMode.tsx の PREGNANCY_HERB_FALLBACK 監査 ===')
    if not fallback_in_code:
        print('  ⚠️ PREGNANCY_HERB_FALLBACK 定数が見つかりません')
    else:
        print(f'  fallback 登録 {len(fallback_in_code)} 件')
        for slug in fallback_in_code:
            exists = slug in data
            text = '｜'.join(data.get(slug, {}).get('contraindications', []))
            has_p = '妊娠' in text or '妊婦' in text
            status = '⚠️ data.ts 不在' if not exists else ('🔄 data.ts に妊娠記載追加で不要' if has_p else '✅ fallback として必要')
            print(f'    {slug}: {status}')

    # 終了コード: fallback 未登録のみエラー化
    if flagged_uncovered:
        print()
        print(f'❌ fallback 未登録 {len(flagged_uncovered)} 件')
        sys.exit(1)
    if flagged_fallback_only:
        print()
        print(f'✅ fallback でカバー済（{len(flagged_fallback_only)} 件は data.ts 改善余地）')
    else:
        print()
        print('✅ 監査完了 — 完全網羅')


if __name__ == '__main__':
    main()
