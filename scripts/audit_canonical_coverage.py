#!/usr/bin/env python3
"""
audit_canonical_coverage.py

558 unique substance strings (from data.ts interactions[]) を canonical 群に
マッピングできるか測定するスクリプト。

使い方:
  python3 scripts/audit_canonical_coverage.py
  python3 scripts/audit_canonical_coverage.py --unmatched   # 未マッチのみ表示
  python3 scripts/audit_canonical_coverage.py --by-canonical # canonical 別集計

カバレッジ ≥ 90% で Phase 1 完了。
"""

from __future__ import annotations

import argparse
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

DATA_TS = Path(__file__).resolve().parent.parent / "src" / "lib" / "data.ts"

# ---------------------------------------------------------------------------
# Canonical 定義
# 規則:
#   1. order = 評価順。先頭から順に match.search を試し最初にヒットしたものを採用
#   2. 特異性が高い順（ワルファリン > 抗凝固薬 > 心血管系）
#   3. pattern は raw Japanese regex（re.search を想定）
# ---------------------------------------------------------------------------

CANONICAL: list[dict] = [
    # ========================================
    # 抗凝固・抗血小板（特異性: 高 → 低）
    # ========================================
    {"key": "ワルファリン", "category": "anticoagulant", "pattern": r"ワルファリン"},
    {"key": "DOAC", "category": "anticoagulant", "pattern": r"DOAC|直接経口抗凝固薬|リバーロキサバン|アピキサバン|エドキサバン|ダビガトラン"},
    {"key": "抗血小板薬", "category": "antiplatelet", "pattern": r"抗血小板|アスピリン|クロピドグレル|プラスグレル|チカグレロル"},
    {"key": "抗凝固薬", "category": "anticoagulant", "pattern": r"抗凝固薬|アセノクマロール|ヘパリン|線溶薬"},

    # ========================================
    # 糖尿病
    # ========================================
    {"key": "インスリン", "category": "antidiabetic", "pattern": r"インスリン"},
    {"key": "メトホルミン", "category": "antidiabetic", "pattern": r"メトホルミン"},
    {"key": "SU剤", "category": "antidiabetic", "pattern": r"SU.?剤|スルホニル|グリベンクラミド|グリメピリド|グリクラジド"},
    {"key": "SGLT2阻害薬", "category": "antidiabetic", "pattern": r"SGLT2"},
    {"key": "DPP-4阻害薬", "category": "antidiabetic", "pattern": r"DPP.?4"},
    {"key": "GLP-1作動薬", "category": "antidiabetic", "pattern": r"GLP.?1"},
    {"key": "α-グルコシダーゼ阻害薬", "category": "antidiabetic", "pattern": r"α-?グルコシダーゼ|アカルボース|ボグリボース|ミグリトール"},
    {"key": "糖尿病治療薬", "category": "antidiabetic", "pattern": r"糖尿病|血糖降下|経口血糖|グリニド|血糖低下"},

    # ========================================
    # 降圧
    # ========================================
    {"key": "ACE阻害薬", "category": "antihypertensive", "pattern": r"ACE.?阻害|リシノプリル|エナラプリル|カプトプリル|ラミプリル"},
    {"key": "ARB", "category": "antihypertensive", "pattern": r"\bARB|アンジオテンシン.*受容体|ロサルタン|バルサルタン|オルメサルタン|テルミサルタン|アジルサルタン"},
    {"key": "Ca拮抗薬", "category": "antihypertensive", "pattern": r"カルシウム拮抗|Ca.?拮抗|アムロジピン|ニフェジピン|ジルチアゼム|ベラパミル"},
    {"key": "β遮断薬", "category": "antihypertensive", "pattern": r"β遮断|ベータブロッカー|プロプラノロール|メトプロロール|ビソプロロール|ナドロール|カルベジロール"},
    {"key": "α遮断薬", "category": "antihypertensive", "pattern": r"α遮断|タムスロシン|プラゾシン"},
    {"key": "チアジド系利尿薬", "category": "antihypertensive", "pattern": r"チアジド|サイアザイド|ヒドロクロロチアジド"},
    {"key": "ループ利尿薬", "category": "antihypertensive", "pattern": r"ループ利尿|フロセミド|ブメタニド"},
    {"key": "カリウム保持性利尿薬", "category": "antihypertensive", "pattern": r"カリウム保持|スピロノラクトン|トリアムテレン|エプレレノン"},
    {"key": "降圧薬", "category": "antihypertensive", "pattern": r"降圧|高血圧|血圧.*薬|利尿薬"},

    # ========================================
    # 甲状腺
    # ========================================
    {"key": "甲状腺ホルモン薬", "category": "thyroid", "pattern": r"甲状腺ホルモン|甲状腺薬|レボチロキシン|チラーヂン"},
    {"key": "抗甲状腺薬", "category": "thyroid", "pattern": r"抗甲状腺|チアマゾール|プロピルチオウラシル|メルカゾール"},

    # ========================================
    # 免疫抑制・移植・自己免疫
    # ========================================
    {"key": "タクロリムス", "category": "immunosuppressant", "pattern": r"タクロリムス|プログラフ"},
    {"key": "シクロスポリン", "category": "immunosuppressant", "pattern": r"シクロスポリン|サンディミュン|ネオーラル"},
    {"key": "mTOR阻害薬", "category": "immunosuppressant", "pattern": r"mTOR|ラパマイシン|シロリムス|エベロリムス"},
    {"key": "メトトレキサート", "category": "immunosuppressant", "pattern": r"メトトレキサート|メソトレキセート|MTX"},
    {"key": "副腎皮質ステロイド", "category": "immunosuppressant", "pattern": r"ステロイド|プレドニゾロン|プレドニゾン|デキサメタゾン|コルチコステロイド"},
    {"key": "免疫抑制剤", "category": "immunosuppressant", "pattern": r"免疫抑制|生物学的製剤"},

    # ========================================
    # 抗生物質・抗菌薬
    # ========================================
    {"key": "テトラサイクリン系", "category": "antibiotic", "pattern": r"テトラサイクリン|ドキシサイクリン|ミノサイクリン"},
    {"key": "フルオロキノロン系", "category": "antibiotic", "pattern": r"フルオロキノロン|キノロン|シプロフロキサシン|レボフロキサシン|モキシフロキサシン"},
    {"key": "マクロライド系", "category": "antibiotic", "pattern": r"マクロライド|エリスロマイシン|クラリスロマイシン|アジスロマイシン"},
    {"key": "ペニシリン系", "category": "antibiotic", "pattern": r"ペニシリン|アモキシシリン|アンピシリン"},
    {"key": "スルファ系", "category": "antibiotic", "pattern": r"スルファ|ST合剤|サルファ"},
    {"key": "アゾール系抗真菌薬", "category": "antibiotic", "pattern": r"アゾール|フルコナゾール|イトラコナゾール|ボリコナゾール|抗真菌"},
    {"key": "抗HIV薬", "category": "antibiotic", "pattern": r"抗HIV|HIV薬|プロテアーゼ阻害|NNRTI"},
    {"key": "抗ウイルス薬", "category": "antibiotic", "pattern": r"抗ウイルス|IFN-α|インターフェロン"},
    {"key": "抗生物質", "category": "antibiotic", "pattern": r"抗生物質|抗生剤|抗菌薬"},

    # ========================================
    # 抗うつ薬・精神神経系
    # ========================================
    {"key": "SSRI", "category": "antidepressant", "pattern": r"SSRI|セルトラリン|パロキセチン|エスシタロプラム|フルオキセチン|フルボキサミン|シタロプラム"},
    {"key": "SNRI", "category": "antidepressant", "pattern": r"SNRI|デュロキセチン|ベンラファキシン|ミルナシプラン"},
    {"key": "三環系抗うつ薬", "category": "antidepressant", "pattern": r"三環系|アミトリプチリン|イミプラミン|クロミプラミン|ノルトリプチリン"},
    {"key": "MAO阻害薬", "category": "antidepressant", "pattern": r"MAO.?阻害|MAOI|モノアミン酸化酵素|フェネルジン|セレギリン|モクロベミド|トラニルシプロミン"},
    {"key": "抗うつ薬", "category": "antidepressant", "pattern": r"抗うつ"},
    {"key": "リチウム", "category": "antipsychotic", "pattern": r"リチウム|双極性"},
    {"key": "クロザピン", "category": "antipsychotic", "pattern": r"クロザピン"},
    {"key": "抗精神病薬", "category": "antipsychotic", "pattern": r"抗精神病|ハロペリドール|リスペリドン|オランザピン|クエチアピン|フェノチアジン"},

    # ========================================
    # 鎮静・睡眠
    # ========================================
    {"key": "ベンゾジアゼピン", "category": "sedative", "pattern": r"ベンゾジアゼピン|ジアゼパム|アルプラゾラム|ロラゼパム|エチゾラム|クロナゼパム"},
    {"key": "Z薬", "category": "sedative", "pattern": r"ゾルピデム|エスゾピクロン|ゾピクロン"},
    {"key": "睡眠薬", "category": "sedative", "pattern": r"睡眠薬|睡眠導入|不眠"},
    {"key": "鎮静薬", "category": "sedative", "pattern": r"鎮静|抗不安|中枢神経抑制"},

    # ========================================
    # 抗てんかん
    # ========================================
    {"key": "フェニトイン", "category": "antiepileptic", "pattern": r"フェニトイン"},
    {"key": "カルバマゼピン", "category": "antiepileptic", "pattern": r"カルバマゼピン"},
    {"key": "バルプロ酸", "category": "antiepileptic", "pattern": r"バルプロ酸"},
    {"key": "抗てんかん薬", "category": "antiepileptic", "pattern": r"抗てんかん|抗痙攣|プリミドン|ラモトリギン|レベチラセタム"},

    # ========================================
    # 脂質異常・循環器
    # ========================================
    {"key": "スタチン", "category": "statin", "pattern": r"スタチン|HMG-CoA|アトルバスタチン|ロスバスタチン|シンバスタチン|プラバスタチン|ピタバスタチン|ロバスタチン"},
    {"key": "エゼチミブ", "category": "statin", "pattern": r"エゼチミブ"},
    {"key": "胆汁酸吸着樹脂", "category": "statin", "pattern": r"コレスチラミン|コレセベラム|胆汁酸"},
    {"key": "ジゴキシン", "category": "cardiac", "pattern": r"ジゴキシン|デジタリス"},
    {"key": "硝酸薬", "category": "cardiac", "pattern": r"硝酸薬|ニトログリセリン|硝酸イソソルビド"},
    {"key": "アミオダロン", "category": "cardiac", "pattern": r"アミオダロン|抗不整脈"},

    # ========================================
    # NSAIDs / 鎮痛
    # ========================================
    {"key": "NSAIDs", "category": "nsaid", "pattern": r"NSAID|イブプロフェン|ナプロキセン|ロキソプロフェン|ジクロフェナク|COX阻害|セレコキシブ"},
    {"key": "アセトアミノフェン", "category": "nsaid", "pattern": r"アセトアミノフェン|パラセタモール|カロナール|タイレノール"},
    {"key": "オピオイド", "category": "opioid", "pattern": r"オピオイド|モルヒネ|オキシコドン|コデイン|トラマドール|フェンタニル|ペチジン|メペリジン"},

    # ========================================
    # 胃酸・消化器
    # ========================================
    {"key": "PPI", "category": "gastric", "pattern": r"PPI|プロトンポンプ|オメプラゾール|ランソプラゾール|エソメプラゾール|ラベプラゾール"},
    {"key": "H2ブロッカー", "category": "gastric", "pattern": r"H2.?ブロッカー|ファモチジン|シメチジン|ラニチジン"},

    # ========================================
    # ホルモン
    # ========================================
    {"key": "経口避妊薬", "category": "hormone", "pattern": r"経口避妊薬|ピル"},
    {"key": "ホルモン補充療法", "category": "hormone", "pattern": r"ホルモン補充|HRT|エストロゲン補充"},
    {"key": "エストロゲン製剤", "category": "hormone", "pattern": r"エストロゲン|エチニルエストラジオール"},
    {"key": "テストステロン製剤", "category": "hormone", "pattern": r"テストステロン"},
    {"key": "タモキシフェン", "category": "hormone", "pattern": r"タモキシフェン|芳香化酵素|アロマターゼ"},
    {"key": "性ホルモン製剤", "category": "hormone", "pattern": r"性ホルモン|ホルモン療法|ホルモン剤"},

    # ========================================
    # 抗がん
    # ========================================
    {"key": "化学療法薬", "category": "chemotherapy", "pattern": r"化学療法|抗がん|抗癌|シスプラチン|5-?フルオロウラシル|シクロホスファミド|抗悪性腫瘍|放射線療法"},
    {"key": "チロシンキナーゼ阻害薬", "category": "chemotherapy", "pattern": r"チロシンキナーゼ|イマチニブ"},
    {"key": "分子標的薬", "category": "chemotherapy", "pattern": r"分子標的|PARP阻害|免疫チェックポイント|免疫療法"},

    # ========================================
    # 骨・パーキンソン・認知症
    # ========================================
    {"key": "ビスホスホネート", "category": "bisphosphonate", "pattern": r"ビスホスホネート|ビスフォスフォネート|アレンドロン酸|リセドロン酸|ミノドロン酸|イバンドロン酸"},
    {"key": "レボドパ", "category": "parkinsonian", "pattern": r"レボドパ|カルビドパ|マドパー|ネオドパストン|パーキンソン"},
    {"key": "コリンエステラーゼ阻害薬", "category": "cognitive", "pattern": r"ドネペジル|リバスチグミン|ガランタミン|コリンエステラーゼ|認知症処方薬|アセチルコリンエステラーゼ"},
    {"key": "メマンチン", "category": "cognitive", "pattern": r"メマンチン"},

    # ========================================
    # ED
    # ========================================
    {"key": "PDE5阻害薬", "category": "erectile", "pattern": r"PDE5|ED治療薬|シルデナフィル|タダラフィル|バルデナフィル|バイアグラ|シアリス"},

    # ========================================
    # 抗コリン・抗ヒスタミン
    # ========================================
    {"key": "抗コリン薬", "category": "anticholinergic", "pattern": r"抗コリン|オキシブチニン|スコポラミン"},
    {"key": "抗ヒスタミン薬", "category": "anticholinergic", "pattern": r"抗ヒスタミン|ジフェンヒドラミン|フェキソフェナジン"},

    # ========================================
    # CYP / 肝代謝
    # ========================================
    {"key": "CYP3A4基質薬", "category": "cyp_substrate", "pattern": r"CYP3A4"},
    {"key": "CYP2C9基質薬", "category": "cyp_substrate", "pattern": r"CYP2C9"},
    {"key": "CYP2C19基質薬", "category": "cyp_substrate", "pattern": r"CYP2C19"},
    {"key": "CYP2D6基質薬", "category": "cyp_substrate", "pattern": r"CYP2D6"},
    {"key": "CYP1A2基質薬", "category": "cyp_substrate", "pattern": r"CYP1A2"},
    {"key": "CYP2E1基質薬", "category": "cyp_substrate", "pattern": r"CYP2E1"},
    {"key": "CYP2C8基質薬", "category": "cyp_substrate", "pattern": r"CYP2C8"},
    {"key": "CYP代謝薬", "category": "cyp_substrate", "pattern": r"CYP|肝代謝薬|UGT|P-?糖タンパク|OATP|OCTN"},

    # ========================================
    # 中枢刺激・MAO周辺
    # ========================================
    {"key": "中枢刺激薬", "category": "stimulant", "pattern": r"中枢刺激|刺激薬|メチルフェニデート|ADHD治療"},
    {"key": "QT延長薬", "category": "cardiac", "pattern": r"QT延長"},

    # ========================================
    # 検査・ワクチン
    # ========================================
    {"key": "生ワクチン", "category": "vaccine", "pattern": r"生ワクチン|MMR|水痘|BCG"},
    {"key": "ワクチン", "category": "vaccine", "pattern": r"ワクチン"},
    {"key": "免疫測定検査", "category": "lab_test", "pattern": r"免疫測定|TSH|FT4|hCG|トロポニン|甲状腺機能検査"},
    {"key": "検査値全般", "category": "lab_test", "pattern": r"検査値|血液検査|尿検査"},
    {"key": "ヨウ素造影剤", "category": "lab_test", "pattern": r"ヨウ素造影|造影剤|CT|血管造影"},
    {"key": "PSA検査", "category": "lab_test", "pattern": r"PSA"},

    # ========================================
    # 外用・スキンケア
    # ========================================
    {"key": "レチノイド外用", "category": "topical", "pattern": r"レチノイド|レチノール|レチノイン酸|トレチノイン|タザロテン|外用レチノイド"},
    {"key": "経口レチノイド", "category": "topical", "pattern": r"イソトレチノイン|アシトレチン|経口レチノイド"},
    {"key": "AHA/BHA外用", "category": "topical", "pattern": r"AHA|BHA|グリコール酸|サリチル酸|乳酸.*外用|角質剥離"},
    {"key": "過酸化ベンゾイル", "category": "topical", "pattern": r"過酸化ベンゾイル"},
    {"key": "光感受性薬剤", "category": "topical", "pattern": r"光感受性|光線療法|光感作"},
    {"key": "頭皮外用薬", "category": "topical", "pattern": r"頭皮外用|育毛剤|頭皮治療"},
    {"key": "抗アンドロゲン薬", "category": "topical", "pattern": r"抗アンドロゲン|フィナステリド|デュタステリド|スピロノラクトン.*アンドロゲン"},
    {"key": "5α還元酵素阻害薬", "category": "topical", "pattern": r"フィナステリド|デュタステリド|5α還元"},

    # ========================================
    # ミネラル・サプリ相互
    # ========================================
    {"key": "鉄製剤", "category": "mineral_supp", "pattern": r"鉄(剤|分|サプリ|製剤|含|強化)|硫酸鉄|ビスグリシン酸鉄"},
    {"key": "カルシウム製剤", "category": "mineral_supp", "pattern": r"カルシウム(製剤|サプリ|強化|含)"},
    {"key": "亜鉛サプリ", "category": "mineral_supp", "pattern": r"亜鉛サプリ|亜鉛強化"},
    {"key": "銅サプリ", "category": "mineral_supp", "pattern": r"銅サプリ|銅(製剤|含|高用量)|銅キレート"},
    {"key": "葉酸・ビタミンB群", "category": "mineral_supp", "pattern": r"葉酸|ビタミンB|B12|B6|B2|ナイアシン|ナイアシンアミド|NMN|NR|リボフラビン"},
    {"key": "ビタミンD高用量", "category": "mineral_supp", "pattern": r"ビタミンD.*高用量|ビタミンD3.*高用量"},
    {"key": "ビタミンC外用", "category": "mineral_supp", "pattern": r"ビタミンC.*外用|アスコルビン酸.*外用"},

    # ========================================
    # 生活習慣
    # ========================================
    {"key": "アルコール", "category": "lifestyle", "pattern": r"アルコール|飲酒"},
    {"key": "カフェイン", "category": "lifestyle", "pattern": r"カフェイン|コーヒー|茶.*感受性"},
    {"key": "グレープフルーツ", "category": "lifestyle", "pattern": r"グレープフルーツ"},
    {"key": "喫煙", "category": "lifestyle", "pattern": r"喫煙|タバコ"},
    {"key": "マウスウォッシュ", "category": "lifestyle", "pattern": r"マウスウォッシュ|クロルヘキシジン|リステリン"},

    # ========================================
    # 状態（条件）
    # ========================================
    {"key": "妊娠中・授乳中", "category": "condition", "pattern": r"妊娠中|授乳中|妊娠.*女性|妊活"},
    {"key": "肝機能障害", "category": "condition", "pattern": r"肝機能障害|肝疾患|肝障害"},
    {"key": "腎機能障害", "category": "condition", "pattern": r"腎機能|腎排泄|腎毒性"},
    {"key": "手術前後", "category": "condition", "pattern": r"手術|抜歯"},
    {"key": "がん既往・治療中", "category": "condition", "pattern": r"がん(既往|治療中)|癌(既往|治療中)|ホルモン依存性|エストロゲン受容体陽性"},
    {"key": "IBD", "category": "condition", "pattern": r"IBD|炎症性腸|潰瘍性大腸|クローン|メサラジン"},
    {"key": "血栓症既往", "category": "condition", "pattern": r"血栓症|血栓素因"},
    {"key": "老化細胞関連", "category": "condition", "pattern": r"老化細胞|SASP"},

    # ========================================
    # その他処方薬
    # ========================================
    {"key": "ビタミンE高用量", "category": "mineral_supp", "pattern": r"α-?トコフェロール|ビタミンE.*大量|ビタミンE.*高用量"},
    {"key": "β-カロチンサプリ", "category": "mineral_supp", "pattern": r"β-?カロチン|β-?カロテン"},
    {"key": "ビオチン高用量", "category": "mineral_supp", "pattern": r"ビオチン.*高用量"},
    {"key": "タウリンサプリ", "category": "supplement_other", "pattern": r"タウリン"},
    {"key": "心血管系薬剤", "category": "cardiac", "pattern": r"心不全|心血管系|心血管.*薬"},
    {"key": "甲状腺機能関連", "category": "thyroid", "pattern": r"甲状腺機能(低下|関連|亢進)|甲状腺疾患"},
    {"key": "セロトニン作動薬", "category": "antidepressant", "pattern": r"セロトニン作動"},
    {"key": "けいれん・痙攣薬", "category": "antiepileptic", "pattern": r"けいれん|痙攣"},
    {"key": "ミノキシジル", "category": "topical", "pattern": r"minoxidil|ミノキシジル"},
    {"key": "フィナステリド", "category": "topical", "pattern": r"finasteride"},
    {"key": "肝毒性薬剤", "category": "condition", "pattern": r"肝毒性"},
    {"key": "ペニシラミン", "category": "other_drug", "pattern": r"ペニシラミン"},
    {"key": "トリエンチン", "category": "other_drug", "pattern": r"トリエンチン"},
    {"key": "尿酸降下薬", "category": "other_drug", "pattern": r"尿酸降下|アロプリノール|フェブキソスタット"},
    {"key": "UDCA", "category": "other_drug", "pattern": r"UDCA|ウルソデオキシコール"},
    {"key": "リン吸着薬", "category": "other_drug", "pattern": r"リン吸着|炭酸ランタン|セベラマー"},
    {"key": "コルチコトロピン", "category": "other_drug", "pattern": r"メラノタン|PT-141|メラノコルチン"},
    {"key": "ハーブ・他サプリ", "category": "supplement_other", "pattern": r"セントジョーンズ|5-HTP|カバ|コンフリー|ジャーマンダー|肝毒性ハーブ|ベルベリン|α-リポ酸|クロム|シナモン|消化酵素|乳酸菌|プロバイオティクス全般"},
    {"key": "経口薬全般", "category": "other_drug", "pattern": r"経口薬全般|肝代謝薬全般"},
    {"key": "重症患者・カテーテル", "category": "condition", "pattern": r"中心静脈カテーテル|重症患者"},
    {"key": "アレルギー薬剤", "category": "other_drug", "pattern": r"クラゲ.*アレルギー|甲殻類アレルギー"},
    {"key": "ピーリング・レーザー", "category": "topical", "pattern": r"ピーリング|レーザー脱毛"},
    # ========================================
    # 追加 canonical（OTC + 一般処方薬を網羅）
    # ========================================
    {"key": "去痰薬", "category": "other_drug", "pattern": r"去痰|カルボシステイン|ムコダイン|アンブロキソール|ムコソルバン|ブロムヘキシン|ビソルボン|L-?カルボシステイン"},
    {"key": "鎮咳薬", "category": "other_drug", "pattern": r"鎮咳|デキストロメトルファン|メジコン|チペピジン|アスベリン|ジヒドロコデイン"},
    {"key": "吸入ステロイド", "category": "other_drug", "pattern": r"吸入ステロイド|フルチカゾン|ブデソニド|ベクロメタゾン|シクレソニド|モメタゾン|アドエア|レルベア|シムビコート|フルティフォーム|キュバール|アズマネックス|パルミコート"},
    {"key": "気管支拡張薬", "category": "other_drug", "pattern": r"\bLABA\b|\bLAMA\b|気管支拡張|サルメテロール|ホルモテロール|チオトロピウム|サルブタモール|アクリジニウム|スピリーバ|オンブレス|シーブリ|テオフィリン|プロカテロール"},
    {"key": "ロイコトリエン拮抗薬", "category": "other_drug", "pattern": r"ロイコトリエン|モンテルカスト|プランルカスト|シングレア|キプレス|オノン"},
    {"key": "喘息生物学的製剤", "category": "other_drug", "pattern": r"オマリズマブ|デュピルマブ|メポリズマブ|レスリズマブ|ベンラリズマブ|テゼペルマブ|デュピクセント|ヌーカラ|ファセンラ|ゾレア|テゼスパイア"},
    {"key": "第二世代抗ヒスタミン薬", "category": "anticholinergic", "pattern": r"第二世代抗ヒスタミン|フェキソフェナジン|セチリジン|レボセチリジン|ロラタジン|デスロラタジン|ビラスチン|エピナスチン|エバスチン|オロパタジン|ベポタスチン|ルパタジン|アレグラ|ジルテック|ザイザル|クラリチン|ビラノア|デザレックス|アレロック|タリオン|ザジテン"},
    {"key": "整腸薬", "category": "other_drug", "pattern": r"整腸|ビオフェルミン|ミヤBM|ラックビー|乳酸菌製剤|酪酸菌製剤|耐性乳酸菌|ビオスリー"},
    {"key": "下痢止め", "category": "other_drug", "pattern": r"下痢止め|止瀉|ロペラミド|タンナルビン|ロペミン"},
    {"key": "便秘薬", "category": "other_drug", "pattern": r"便秘.*薬|緩下|酸化マグネシウム|マグミット|ピコスルファート|リンゼス|グーフィス|リナクロチド|エロビキシバット|モビコール|ラキソベロン"},
    {"key": "胃粘膜保護薬", "category": "gastric", "pattern": r"胃粘膜保護|レバミピド|テプレノン|ムコスタ|セルベックス|プロマック"},
    {"key": "制酸剤", "category": "gastric", "pattern": r"制酸剤|アルロイドG|炭酸水素ナトリウム|水酸化アルミニウム|マーロックス"},
    {"key": "消化管運動改善薬", "category": "other_drug", "pattern": r"消化管運動|モサプリド|イトプリド|メトクロプラミド|ガスモチン|ガナトン|プリンペラン"},
    {"key": "漢方薬", "category": "other_drug", "pattern": r"漢方|葛根湯|抑肝散|加味逍遥散|桂枝茯苓丸|当帰芍薬散|大建中湯|防風通聖散|麦門冬湯|補中益気湯|六君子湯|小柴胡湯|半夏厚朴湯|柴苓湯|芍薬甘草湯|加味帰脾湯"},
    {"key": "トリプタン製剤", "category": "other_drug", "pattern": r"トリプタン|スマトリプタン|ゾルミトリプタン|エレトリプタン|リザトリプタン|ナラトリプタン|イミグラン|ゾーミッグ|レルパックス|マクサルト|アマージ"},
    {"key": "プレガバリン・ガバペンチン", "category": "antiepileptic", "pattern": r"プレガバリン|ガバペンチン|ミロガバリン|リリカ|タリージェ|ガバペン"},
    {"key": "セフェム系抗生物質", "category": "antibiotic", "pattern": r"セフェム|セファロスポリン|セファレキシン|セフジニル|セフポドキシム|セフカペン|セフトリアキソン|セフタジジム|セフメタゾール|フロモックス|メイアクト|セフゾン|ケフラール|バナン|サワシリン|ロセフィン"},
    {"key": "抗ヘルペス薬", "category": "antibiotic", "pattern": r"抗ヘルペス|アシクロビル|バラシクロビル|ファムシクロビル|アメナメビル|ゾビラックス|バルトレックス|アメナリーフ|ファムビル"},
    {"key": "抗インフルエンザ薬", "category": "antibiotic", "pattern": r"抗インフル|オセルタミビル|ザナミビル|バロキサビル|ペラミビル|タミフル|リレンザ|ゾフルーザ|ラピアクタ|イナビル"},
    {"key": "抗真菌外用薬", "category": "topical", "pattern": r"抗真菌外用|テルビナフィン|ラミシール|ルリコナゾール|ルコナック|ルリコン|ケトコナゾール外用|クロトリマゾール"},
    {"key": "オレキシン受容体拮抗薬", "category": "sedative", "pattern": r"オレキシン受容体|スボレキサント|レンボレキサント|ベルソムラ|デエビゴ"},
    {"key": "メラトニン受容体作動薬", "category": "sedative", "pattern": r"メラトニン受容体|ラメルテオン|ロゼレム"},
    {"key": "過活動膀胱治療薬", "category": "anticholinergic", "pattern": r"過活動膀胱|ソリフェナシン|ミラベグロン|イミダフェナシン|プロピベリン|フェソテロジン|ベシケア|ベタニス|ウリトス|ステーブラ|トビエース|バップフォー|デトルシトール"},
    {"key": "JAK阻害薬", "category": "immunosuppressant", "pattern": r"JAK阻害|バリシチニブ|トファシチニブ|ウパダシチニブ|フィルゴチニブ|ペフィシチニブ|オルミエント|ゼルヤンツ|リンヴォック|スマイラフ"},
    {"key": "TNF阻害薬", "category": "immunosuppressant", "pattern": r"TNF阻害|インフリキシマブ|アダリムマブ|エタネルセプト|ゴリムマブ|セルトリズマブ|レミケード|ヒュミラ|エンブレル|シンポニー|シムジア"},
    {"key": "IL-6阻害薬", "category": "immunosuppressant", "pattern": r"IL-?6阻害|トシリズマブ|サリルマブ|アクテムラ|ケブザラ"},
    {"key": "PDE-4阻害薬", "category": "immunosuppressant", "pattern": r"PDE.?4|アプレミラスト|オテズラ"},
    {"key": "GnRH作動薬", "category": "hormone", "pattern": r"GnRH|リュープロレリン|ゴセレリン|リュープリン|ゾラデックス|スプレキュア"},
    {"key": "糖質コルチコイド経口", "category": "immunosuppressant", "pattern": r"糖質コルチコイド経口|経口ステロイド|プレドニン|メドロール|デカドロン経口"},
    {"key": "NaSSA・トラゾドン", "category": "antidepressant", "pattern": r"NaSSA|ミルタザピン|トラゾドン|リフレックス|レメロン|レスリン|デジレル"},
    {"key": "プロスタグランジン点眼", "category": "other_drug", "pattern": r"ラタノプロスト|トラボプロスト|タフルプロスト|ビマトプロスト|キサラタン|トラバタンズ|タプロス|ルミガン"},
    {"key": "緑内障点眼薬", "category": "other_drug", "pattern": r"緑内障|チモロール|カルテオロール|ピロカルピン|ブリモニジン|ドルゾラミド|チモプトール|エイベリス"},
    {"key": "禁煙補助薬", "category": "other_drug", "pattern": r"禁煙|バレニクリン|ニコチン製剤|チャンピックス|ニコチネル|ニコレット"},
    {"key": "総合感冒薬", "category": "other_drug", "pattern": r"総合感冒|風邪薬|PL顆粒|パブロン|ルル|コルゲン|ベンザ|エスタック"},
]


def load_substances() -> Counter:
    content = DATA_TS.read_text()
    substances = re.findall(r"substance:\s*'([^']+)'", content)
    return Counter(substances)


def match_canonical(substance: str) -> tuple[str | None, str | None]:
    for entry in CANONICAL:
        if re.search(entry["pattern"], substance):
            return entry["key"], entry["category"]
    return None, None


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--unmatched", action="store_true", help="未マッチのみ表示")
    parser.add_argument("--by-canonical", action="store_true", help="canonical 別集計")
    parser.add_argument("--collisions", action="store_true", help="複数 pattern hit する候補を表示")
    args = parser.parse_args()

    substances = load_substances()
    total_interactions = sum(substances.values())
    unique_count = len(substances)

    matched: dict[str, int] = defaultdict(int)
    matched_interactions: dict[str, int] = defaultdict(int)
    unmatched: list[tuple[str, int]] = []

    for sub, count in substances.items():
        key, _cat = match_canonical(sub)
        if key:
            matched[key] += 1
            matched_interactions[key] += count
        else:
            unmatched.append((sub, count))

    unique_matched = sum(matched.values())
    interactions_matched = sum(matched_interactions.values())
    coverage_unique = unique_matched / unique_count * 100
    coverage_interactions = interactions_matched / total_interactions * 100

    print(f"=== Canonical Coverage Audit ===")
    print(f"Total interactions    : {total_interactions}")
    print(f"Unique substances     : {unique_count}")
    print(f"Canonical entries     : {len(CANONICAL)}")
    print()
    print(f"Matched (unique)      : {unique_matched:>4} / {unique_count} ({coverage_unique:.1f}%)")
    print(f"Matched (interactions): {interactions_matched:>4} / {total_interactions} ({coverage_interactions:.1f}%)")
    print()

    if args.unmatched:
        print("=== Unmatched substances (sorted by frequency) ===")
        for sub, count in sorted(unmatched, key=lambda x: -x[1]):
            print(f"  {count:3} | {sub}")
        return 0

    if args.by_canonical:
        print("=== By canonical (unique count) ===")
        for entry in CANONICAL:
            uniq = matched[entry["key"]]
            inter = matched_interactions[entry["key"]]
            print(f"  {uniq:3} uniq / {inter:3} inter | {entry['key']:<24} ({entry['category']})")
        return 0

    if args.collisions:
        print("=== Collision detection (substances matching multiple patterns) ===")
        collisions = []
        for sub in substances:
            hits = [e["key"] for e in CANONICAL if re.search(e["pattern"], sub)]
            if len(hits) > 1:
                collisions.append((sub, hits))
        for sub, hits in collisions[:30]:
            print(f"  {sub}")
            for h in hits:
                print(f"    → {h}")
        print(f"\nTotal collisions: {len(collisions)} (note: first-match wins)")
        return 0

    # 完了判定
    if coverage_unique >= 90:
        print(f"✅ Coverage {coverage_unique:.1f}% ≥ 90% — Phase 1 GO")
    else:
        print(f"⚠️  Coverage {coverage_unique:.1f}% < 90% — 追加 canonical 必要")
        print(f"   Top 10 unmatched:")
        for sub, count in sorted(unmatched, key=lambda x: -x[1])[:10]:
            print(f"     {count:3} | {sub}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
