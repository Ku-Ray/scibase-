# 商品URL全体スキャン結果

**実行日**: 2026-04-20
**対象**: `src/lib/data.ts` 全132商品URL
**ツール**: `scripts/scan_products.ts`

**対応状況**: 🔴最優先（404・重複slug・PDRN）完了 ／ 🟠高優先（iHerb容量違い6件）完了 ／ 🟠在庫切れとPhase B（裏側評価）は別セッション

## サマリー

| 分類 | 件数 | 対応優先度 |
|---|---|---|
| 404 Not Found（URL失効） | 15 | 🔴 最優先 |
| 重複slug（ingredient定義） | 3 | 🔴 最優先 |
| iHerb URLスラグと商品名の不一致（容量・剤形違いの疑い） | 6 | 🟠 高 |
| 在庫切れ（Amazon） | 8 | 🟠 高 |
| Amazon「mismatch」判定（実際は正しい・誤判定） | 2 | 🟢 確認のみ |
| トップページURL混入 | 1 | 🔴 最優先 |
| Amazon検索URL（特定商品に固定されていない） | 5 | 🟡 中 |
| iHerbロング商品URL（403でページ確認不可） | 81 | 🟡 中（要別手段） |
| iHerb短縮URL `iherb.co/...`（ページ確認不可） | 8 | 🟡 中（要別手段） |

**機械検証の限界**: iHerbはbot検出で全URLが403を返すため、ページ内容による在庫・商品名確認ができなかった（90件）。URLスラグと商品名の照合だけは可能で、6件の明確なミスマッチを検出。

---

## 🔴 最優先修正

### 1. 404 Not Found（Amazon URL失効・15件）

商品ページが消えている or ASIN変更。全てリンク差し替えが必要。

| # | 成分 | ブランド / 商品名 | 失効URL |
|---|---|---|---|
| 1 | `azelaic-acid#0` | The Ordinary / Azelaic Acid Suspension 10% 30ml | `B07T3GBTKC` |
| 2 | `arbutin#0` | The Ordinary / Alpha Arbutin 2% + HA 60ml | `B09Q31N6TV` |
| 3 | `tranexamic-acid#0` | ロート製薬 / メラノCC 集中対策美容液 | `B00JXMXNWO` |
| 4 | `spermidine#0` | Double Wood Supplements / Spermidine 10mg 120カプセル | `B09NP4MPQB` |
| 5 | `equol#0` | Otsuka Pharmaceutical / エクエル（エクオール含有大豆胚芽発酵エキス） | `B007DU83SY` |
| 6 | `butyrate#0` | BodyBio / Sodium Butyrate 600mg | `B08SFJD8H5` |
| 7 | `ferulic-acid#0` | SkinCeuticals / C E Ferulic | `B000UMOEFK` |
| 8 | `adenosine#0` | 資生堂 / アデノバイタル コンセントレート | `B07BFVHQ3Y` |
| 9 | `allantoin#0` | La Roche-Posay / シカプラスト バームB5 | `B07HNQVBXP` |
| 10 | `urolithin-a#0` | Timeline / Mitopure（ウロリチンA 500mg） | `B08LC7N5P8` |
| 11 | `mandelic-acid#0` | The Ordinary / Mandelic Acid 10% + HA | `B07GXPQBGF` |
| 12 | `fisetin#0` | Double Wood Supplements / Fisetin 100mg | `B086BMFV5H` |
| 13 | `alpha-lipoic-acid#0` | Jarrow Formulas / Alpha Lipoic Acid 300mg | `B001G7QFCY` |
| 14 | `maca#0` | NOW Foods / Organic Maca 500mg | `B0013OXKHC` |
| 15 | `palmitoyl-tripeptide#0` | Paula's Choice / RESIST Intensive Wrinkle-Repair Retinol Serum | `B00CBCF9NA` |

### 2. 重複slug（ingredient定義の整合性破壊・3件）

同じslugが2回定義されている。ルーティングで片方しか表示されない／上書きされる可能性。

| slug | 出現行 | 備考 |
|---|---|---|
| `alpha-lipoic-acid` | line 2447 / line 6458 | 2つの定義 |
| `rhodiola` | line 2622 (B/ロディオラ) / line 7001 (A/ロジオラ・ロゼア) | 評価ランク・日本語名ともに別 |
| `fisetin` | line 2796 / line 6409 | 2つの定義 |

→ どちらを残すか決定し、もう片方は削除または別slugにリネーム。

### 3. トップページが商品URLに混入（1件）

- **`pdrn#0`**: `https://www.iherb.com`（商品ページではなくトップURL）
  - Brand: 各種韓国コスメブランド / PDRN配合セラム（外用）
  - 対応：具体商品URLに差し替え、または「代替成分」表記に変更

---

## 🟠 高優先

### 4. iHerb URLスラグ ↔ 商品名の不一致（6件・容量/剤形違いの疑い）

URLスラグ内のキーワードと `data.ts` の商品名が合わない。**別SKU・別製品を指している可能性**。

| # | 成分 | data.ts の商品名 | URLスラグ | 疑い |
|---|---|---|---|---|
| 1 | `rhodiola#0` | Solaray / Rhodiola Rosea 500mg (3% Rosavins) | `solaray-rhodiola-root-extract-500-mg-60-vegcaps` | ロザビン3%表記が不明・別SKUの可能性 |
| 2 | `vitamin-k2#0` | NOW Foods / MK-7 Vitamin K2 **200mcg** | `now-foods-vitamin-k-2-**100-mcg**-100-capsules` | **容量が半分（100mcg）** |
| 3 | `folic-acid#0` | Thorne / Folate **800mcg**（メチルフォレート） | `thorne-5-mthf-**1-mg**-60-capsules` | **容量違い（1mg=1000mcg）** |
| 4 | `vitamin-b6#0` | Solgar / Vitamin B6 **as P-5-P** 50mg | `solgar-vitamin-b6-50-mg-100-tablets` | 通常B6 vs P-5-P活性型の違い |
| 5 | `reishi#0` | Host Defense / Reishi Mushroom Extract **2:1 Dual Extract** | `host-defense-reishi-**mycelium**-mushroom-supplement-60-capsules` | Mycelium（菌糸体）vs Dual Extract |
| 6 | `boswellia#0` | NOW Foods / Boswellia 500mg **(65% Boswellic Acids)** | `now-foods-boswellia-500-mg-60-softgels` | 65%標準化の記載がスラグに無し |

### 5. 在庫切れ（Amazon・8件）

現在在庫切れ。裏側評価に「在庫切れ履歴」として記録開始する対象（Phase Bで導入）。

| # | 成分 | 商品 |
|---|---|---|
| 1 | `omega3#2` | Nordic Naturals / ProOmega EPA 650mg/DHA 450mg 60粒 |
| 2 | `collagen-peptide#0` | Vital Proteins / Collagen Peptides Powder 284g |
| 3 | `retinol#0` | The Ordinary / Retinol 0.2% in Squalane 30ml |
| 4 | `salicylic-acid#0` | The Ordinary / Salicylic Acid 2% Masque 50ml |
| 5 | `l-theanine#1` | NOW Foods / Double Strength L-Theanine 200mg 180カプセル |
| 6 | `kojic-acid#0` | The Ordinary / Niacinamide 10% + Zinc 1% 30ml |
| 7 | `centella-asiatica#0` | Dr.Jart+ / Cicapair Cream 50ml |
| 8 | `panthenol#0` | CeraVe / CeraVe モイスチャライジングクリーム |

---

## 🟢 確認のみ（誤判定）

### 6. 日本語タイトルで「mismatch」と誤判定されたもの（2件）

英語ブランド/商品名 vs 日本語ページタイトルで照合スコアが下がっただけ。**実際は正しい商品**。

| # | 成分 | 状態 |
|---|---|---|
| `magnesium#1` | Doctor's Best Magnesium Glycinate 200mg 240錠 → 日本語タイトル「ドクターズベスト 高吸収型マグネシウム」＝同一商品 |
| `retinal#0` | The Ordinary Granactive Retinoid 2% → 日本語タイトル「The Ordinary グラナクティブレチノイド 2%」＝同一商品 |

---

## 🟡 要別手段

### 7. Amazon検索URL（5件）

特定商品ではなく検索結果ページ。常に「最初のヒット」に遷移するとは限らず、**他商品が先頭に来ると実質リンク違い**になるリスクあり。

| # | 成分 | 商品名 |
|---|---|---|
| `ashwagandha#1` | KSM-66 アシュワガンダ 600mg（検索） |
| `glycolic-acid#0` | The Ordinary / Glycolic Acid 7% Toning Solution（検索） |

（他3件）

→ 単一ASINへの固定を推奨。

### 8. iHerb 403ブロック（90件・ロング81 + 短縮9）

iHerbがCloudflare系bot検出で全アクセスを403拒否。サーバー側fetchでは確認不能。

**代替手段の候補：**
- (A) WebFetch経由で10〜20件ずつサンプルチェック
- (B) 定期的に手動ブラウザで開いて在庫ステータスを収集する運用を確立
- (C) ヘッドレスブラウザ（Playwright）を導入し、JS実行経由でfetch
- (D) iHerb公式アフィリエイトAPI／RSS（あれば）

---

## 次アクション（推奨）

1. **即時**（このセッションor次）：
   - 🔴 404の15件 → 各成分の代替商品URLを探して差し替え
   - 🔴 重複slug 3件 → 統合/リネーム
   - 🔴 PDRN の `https://www.iherb.com` → 具体URL or 削除
   - 🟠 iHerb 6件の容量・剤形ミスマッチ → 正しい商品URLに修正

2. **Phase B（別セッション）**：
   - 在庫切れ履歴の自動収集システム構築（`stockout_history.json` + 週次ジョブ）
   - `Product` 型に `stockoutCount` / `lastSeenInStock` を追加し rank決定に反映
   - iHerb用にWebFetch or Playwright経由チェック戦略

---

## 生データ

- `scripts/scan_targets.json` — 全132商品の抽出リスト
- `scripts/scan_results.json` — 全URLのfetch結果
- `scripts/scan_results.ndjson` — 1行1結果の逐次ログ
- `scripts/scan.log` — 実行ログ
