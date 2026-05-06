/**
 * 商品管理シートへのExport
 * - data.ts から全商品を抽出
 * - Tier1 必須ゲート・Tier2 スコアを自動判定
 * - Google Sheets にヘッダー＋データ行を書き込み
 *
 * 運用:
 *   ユーザーが U列(印) に印を付ける → Importスクリプトで修正対象抽出
 *   再Exportすると全行上書きされる（印はクリア）
 *
 * 実行:
 *   node --experimental-strip-types --no-warnings scripts/export_products_to_sheet.ts
 */
import { google } from 'googleapis'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { ingredients } from '../src/lib/data.ts'
import { scoreProduct } from '../src/lib/productScore.ts'
import type { Ingredient, Product, EvidenceRank } from '../src/lib/types.ts'

// ─── env ─────────────────────────────────────────────────────
function loadEnv() {
  const raw = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf-8')
  for (const line of raw.split('\n')) {
    const m = line.match(/^([A-Z_]+)=(.*)$/)
    if (m) process.env[m[1]] = m[2]
  }
}

// ─── 判定ロジック ─────────────────────────────────────────────
const EVIDENCE_RANK_OK: EvidenceRank[] = ['S', 'A', 'B']

/** Legal: 断定・最上級表現の検出（見つかればNG） */
const NG_PATTERNS: RegExp[] = [
  /改善(する|し|します|できる)/,
  /治る|治療|治癒/,
  /若返(る|り)/,
  /消える|消します/,
  /最強|最高|No\.?1|1番|一番/,
  /100%|必ず|確実/,
]

function hasNgExpression(text: string | undefined): boolean {
  if (!text) return false
  return NG_PATTERNS.some(re => re.test(text))
}

/** G1: 成分のエビデンスランクがB以上か */
function gateG1(ing: Ingredient): boolean {
  return EVIDENCE_RANK_OK.includes(ing.evidenceRank)
}

/** G3: 商品説明に断定表現がないか */
function gateG3(p: Product): boolean {
  return !hasNgExpression(p.reasonJa) && !hasNgExpression(p.highlight) && !hasNgExpression(p.qualityNote)
}

/** G5: アフィリ可能プラットフォームか */
function gateG5(p: Product): boolean {
  return ['iherb', 'amazon', 'cosme'].includes(p.platform)
}

/** S1 品質検査スコア 0-3: thirdParty + heavyMetal + 認証1つ以上 */
function scoreS1(p: Product): number {
  let s = 0
  if (p.thirdPartyTested) s++
  if (p.heavyMetalTested) s++
  if (p.certifications && p.certifications.length > 0) s++
  return s
}

/** S3 選定理由の強さ 0-3 */
function scoreS3(p: Product): number {
  const r = p.reasonJa
  if (!r || r.length < 10) return 0
  // 汎用ワードのみ（「高品質」「安心」「信頼」等）は弱
  const generic = /^(高品質|信頼|安心|安全|おすすめ|定番|人気|コスパ)+[。・、\s]*$/
  if (generic.test(r.trim())) return 1
  // 具体要素（数字・ブランド名・形状・吸収形態等）があれば強
  const hasConcrete =
    /\d+(mg|mcg|iu|μg|％|%|円)/i.test(r) ||
    /(カプセル|錠剤|粉末|液体|セラム|クリーム)/.test(r) ||
    /(第三者|重金属|NSF|USP|GMP|NonGMO|Organic|認証)/i.test(r)
  if (hasConcrete && r.length >= 20) return 3
  return 2
}

/** S4 コスパスコア 0-3: 同成分内で monthlyCostJpy 中央値との比較 */
function scoreS4(p: Product, medianMonthly: number | null): number {
  if (p.monthlyCostJpy == null) return 0
  if (medianMonthly == null) return 1
  const ratio = p.monthlyCostJpy / medianMonthly
  if (ratio <= 0.7) return 3
  if (ratio <= 1.0) return 2
  if (ratio <= 1.5) return 1
  return 0
}

function median(nums: number[]): number | null {
  const a = nums.filter(n => typeof n === 'number').sort((x, y) => x - y)
  if (a.length === 0) return null
  const m = Math.floor(a.length / 2)
  return a.length % 2 === 1 ? a[m] : (a[m - 1] + a[m]) / 2
}

/** S5 差別化スコア 0-3: 同プラットフォーム重複時に「容量/ブランド/形態/価格帯」の軸で差別化されているか */
function scoreS5(p: Product, allInGroup: Product[]): number {
  const samePlatform = allInGroup.filter(o => o !== p && o.platform === p.platform)
  if (samePlatform.length === 0) return 3 // 重複なし＝差別化問題なし

  const text = `${p.reasonJa ?? ''} ${p.highlight ?? ''} ${p.note ?? ''}`
  const axes: string[] = []

  // 容量軸: dosageMgが他商品と異なる、かつreasonJa等に容量言及
  const dosageDiffer = samePlatform.some(o => o.dosageMg !== p.dosageMg)
  const dosageMentioned = /\d+\s*(mg|mcg|iu|μg|g|％|%)/i.test(text) || /(小|中|大|多め|少なめ)容量/.test(text)
  if (dosageDiffer && dosageMentioned) axes.push('容量')

  // ブランド軸: brandが他商品と異なる、かつreasonJa等にブランド言及（ブランド名直接 or 「別ブランド」等）
  const brandDiffer = samePlatform.some(o => o.brand !== p.brand)
  if (brandDiffer && (text.includes(p.brand) || /(別ブランド|代替ブランド)/.test(text))) axes.push('ブランド')

  // 形態軸: formが他商品と異なる、かつreasonJa等に形態言及
  const formDiffer = samePlatform.some(o => o.form !== p.form)
  const formMentioned = /(カプセル|錠剤|粉末|液体|セラム|クリーム|ジェル|ガム|スプレー|ソフトジェル)/.test(text)
  if (formDiffer && formMentioned) axes.push('形態')

  // 価格帯軸: priceJpyが30%以上異なる、かつ価格・コスパ言及あり
  const priceDiffer = samePlatform.some(o => {
    if (!o.priceJpy || !p.priceJpy) return false
    return Math.abs(o.priceJpy - p.priceJpy) / Math.max(o.priceJpy, p.priceJpy) > 0.3
  })
  const priceMentioned = /(円|コスパ|安い|高め|お試し|ヘビー|手頃|プレミアム)/.test(text)
  if (priceDiffer && priceMentioned) axes.push('価格帯')

  if (axes.length === 0) return 0
  if (axes.length === 1) return 1
  if (axes.length === 2) return 2
  return 3
}

// ─── 検索リンク生成 ─────────────────────────────────────────────
/** iHerb 売れ筋順検索URL（recommendedForm.en > nameEn の優先順位） */
function iherbSearchUrl(ing: Ingredient): string {
  const kw = ing.recommendedForm?.en || ing.nameEn
  return `https://www.iherb.com/search?kw=${encodeURIComponent(kw)}&sort=4`
}

/** Amazon 日本検索URL（日本語＋英語併記でヒット率向上） */
function amazonSearchUrl(ing: Ingredient): string {
  const kw = `${ing.nameJa} ${ing.recommendedForm?.ja || ing.nameEn} サプリ`
  return `https://www.amazon.co.jp/s?k=${encodeURIComponent(kw)}`
}

/** HYPERLINK formula 生成 */
function hyperlinkFormula(url: string, label: string): string {
  // ダブルクオートはエスケープ
  const safeLabel = label.replace(/"/g, '""')
  return `=HYPERLINK("${url}", "${safeLabel}")`
}

// ─── 行データ生成 ─────────────────────────────────────────────
const HEADER = [
  '成分slug',
  '成分名',
  '🔍 iHerb検索',
  '🔍 Amazon検索',
  'エビデンス',
  'rank',
  '商品名',
  'ブランド',
  'プラットフォーム',
  'URL',
  '価格(JPY)',
  '月次コスト',
  '用量(mg)',
  'highlight',
  'reasonJa',
  '第三者検査',
  '重金属検査',
  '認証',
  'Tier1合否',
  'Tier2スコア',
  '推奨度★',
  '帯',
  'レビュー数',
  '評価(★)',
  '印',
  '修正メモ',
  '最終更新',
  '差し替えURL希望',
  // ─── Amazon追加用列（iHerb 行に入力・別Productとしてdata.tsに新規追加） ───
  '➕ Amazon ASIN',
  '➕ Amazon商品名',
  '➕ Amazon価格(JPY)',
  '➕ Amazon imageUrl',
  '➕ Amazon追加メモ',
  '➕ Amazon追加日',
]

/** 推奨度から帯ラベルを返す（Phase D 掲載基準準拠） */
function scoreBucket(score: number): string {
  if (score >= 4.5) return '★4.5+ BEST PICK帯'
  if (score >= 4.0) return '★4.0-4.4 掲載基準'
  if (score >= 3.5) return '★3.5-3.9 差し替え検討'
  return '★3.5未満 削除推奨'
}

// ─── D2ルール違反検出 ─────────────────────────────────────────
type Violation = {
  slug: string
  nameJa: string
  evidenceRank: EvidenceRank
  productCount: number
  hasRank1: boolean
  type: '⚠️ 商品ゼロ' | '⚠️ rank1欠落' | '⚠️ 4商品超過' | '⚠️ 主要成分1商品のみ'
  detail: string
}

/** 主要成分の slug 一覧（Tier2の S/A評価＋使用頻度高い系を簡易判定） */
function isMajorIngredient(ing: Ingredient): boolean {
  return ing.evidenceRank === 'S' || ing.evidenceRank === 'A'
}

function detectViolations(): Violation[] {
  const violations: Violation[] = []
  for (const ing of ingredients) {
    const count = ing.products.length
    const hasRank1 = ing.products.some(p => p.rank === 1)

    if (count === 0) {
      violations.push({
        slug: ing.slug,
        nameJa: ing.nameJa,
        evidenceRank: ing.evidenceRank,
        productCount: 0,
        hasRank1: false,
        type: '⚠️ 商品ゼロ',
        detail: '商品が1つも登録されていない',
      })
      continue
    }
    if (!hasRank1) {
      violations.push({
        slug: ing.slug,
        nameJa: ing.nameJa,
        evidenceRank: ing.evidenceRank,
        productCount: count,
        hasRank1: false,
        type: '⚠️ rank1欠落',
        detail: `${count}商品あるが rank=1 が未設定`,
      })
    }
    if (count > 3) {
      violations.push({
        slug: ing.slug,
        nameJa: ing.nameJa,
        evidenceRank: ing.evidenceRank,
        productCount: count,
        hasRank1,
        type: '⚠️ 4商品超過',
        detail: `${count}商品（D2: 最大3商品ルール違反）`,
      })
    }
    if (isMajorIngredient(ing) && count === 1) {
      violations.push({
        slug: ing.slug,
        nameJa: ing.nameJa,
        evidenceRank: ing.evidenceRank,
        productCount: 1,
        hasRank1,
        type: '⚠️ 主要成分1商品のみ',
        detail: `エビデンス${ing.evidenceRank}ランクだがフェイルセーフなし（rank2/3追加推奨）`,
      })
    }
  }
  return violations
}

function buildRows(): (string | number)[][] {
  const rows: (string | number)[][] = []
  const today = new Date().toISOString().slice(0, 10)

  for (const ing of ingredients) {
    const monthlyCosts = ing.products
      .map(p => p.monthlyCostJpy)
      .filter((n): n is number => typeof n === 'number')
    const med = median(monthlyCosts)

    // 検索リンクは成分単位で同一なので先に計算
    const iherbLabel = ing.recommendedForm?.en || ing.nameEn
    const amazonLabel = ing.recommendedForm?.ja || ing.nameJa
    const iherbLink = hyperlinkFormula(iherbSearchUrl(ing), iherbLabel)
    const amazonLink = hyperlinkFormula(amazonSearchUrl(ing), amazonLabel)

    for (const p of ing.products) {
      const g1 = gateG1(ing)
      const g3 = gateG3(p)
      const g5 = gateG5(p)
      const gates: string[] = []
      if (!g1) gates.push('G1')
      if (!g3) gates.push('G3')
      if (!g5) gates.push('G5')
      const tier1 = gates.length === 0 ? '✅ 合格' : `❌ NG(${gates.join(',')})`

      const s1 = scoreS1(p)
      const s3 = scoreS3(p)
      const s4 = scoreS4(p, med)
      const s5 = scoreS5(p, ing.products) // D4: 4軸差別化
      const tier2 = s1 + s3 + s4 + s5 // 最大12点（S1+S3+S4+S5）

      const recScore = scoreProduct(p, ing).recommendationScore
      const bucket = scoreBucket(recScore)

      rows.push([
        ing.slug,
        ing.nameJa,
        iherbLink,
        amazonLink,
        ing.evidenceRank,
        p.rank ?? '',
        p.name,
        p.brand,
        p.platform,
        p.url,
        p.priceJpy ?? '',
        p.monthlyCostJpy ?? '',
        p.dosageMg ?? '',
        p.highlight ?? '',
        p.reasonJa ?? '',
        p.thirdPartyTested ? '✓' : '',
        p.heavyMetalTested ? '✓' : '',
        (p.certifications ?? []).join('/'),
        tier1,
        tier2,
        recScore, // SciBase推奨度（Phase B+D 濃度整合軸対応）
        bucket,   // 帯（Phase D 掲載基準準拠）
        '', // レビュー数（手動）
        '', // 評価（手動）
        '', // 印（ユーザー記入）
        '', // 修正メモ（ユーザー記入）
        today,
        '', // 差し替えURL希望（ユーザー記入）
        // ─── Amazon追加用列（iHerb 行に入力推奨） ───
        '', // ➕ Amazon ASIN（B0XXXXXXX or full URL）
        '', // ➕ Amazon商品名
        '', // ➕ Amazon価格(JPY)
        '', // ➕ Amazon imageUrl
        '', // ➕ Amazon追加メモ
        '', // ➕ Amazon追加日（importスクリプトが自動記入）
      ])
    }
  }
  return rows
}

// ─── Sheets 書き込み ─────────────────────────────────────────
async function main() {
  loadEnv()
  const keyPath = process.env.SHEETS_SERVICE_ACCOUNT_PATH!
  const sheetId = process.env.PRODUCTS_SHEET_ID!

  const auth = new google.auth.GoogleAuth({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  const sheets = google.sheets({ version: 'v4', auth })

  const rows = buildRows()
  console.log(`→ 抽出: ${rows.length} 商品行`)

  const MAIN_TAB = 'product'
  const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId })
  const mainTab = meta.data.sheets!.find(s => s.properties!.title === MAIN_TAB)
  if (!mainTab) {
    throw new Error(`メインタブ '${MAIN_TAB}' が見つかりません`)
  }
  const sheetIdNum = mainTab.properties!.sheetId!

  // 既存シートをクリア（ヘッダー行含む全範囲・Amazon追加列でAJまで拡張）
  console.log(`→ シート '${MAIN_TAB}' クリア中...`)
  await sheets.spreadsheets.values.clear({
    spreadsheetId: sheetId,
    range: `${MAIN_TAB}!A:AJ`,
  })

  // ヘッダー + データを一括書き込み
  console.log('→ 書き込み中...')
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: `${MAIN_TAB}!A1`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [HEADER, ...rows] },
  })

  // フォーマット: ヘッダー太字・最上行固定・列幅調整
  console.log('→ フォーマット適用中...')

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: sheetId,
    requestBody: {
      requests: [
        {
          repeatCell: {
            range: { sheetId: sheetIdNum, startRowIndex: 0, endRowIndex: 1 },
            cell: {
              userEnteredFormat: {
                textFormat: { bold: true },
                backgroundColor: { red: 0.2, green: 0.2, blue: 0.2 },
                horizontalAlignment: 'CENTER',
              },
            },
            fields: 'userEnteredFormat(textFormat,backgroundColor,horizontalAlignment)',
          },
        },
        {
          updateSheetProperties: {
            properties: { sheetId: sheetIdNum, gridProperties: { frozenRowCount: 1 } },
            fields: 'gridProperties.frozenRowCount',
          },
        },
        {
          autoResizeDimensions: {
            dimensions: { sheetId: sheetIdNum, dimension: 'COLUMNS', startIndex: 0, endIndex: HEADER.length },
          },
        },
      ],
    },
  })

  // 印列（Y列=index 24・推奨度/帯列追加で22→24に移動）にプルダウン設定
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: sheetId,
    requestBody: {
      requests: [
        {
          setDataValidation: {
            range: {
              sheetId: sheetIdNum,
              startRowIndex: 1,
              endRowIndex: rows.length + 1,
              startColumnIndex: 24,
              endColumnIndex: 25,
            },
            rule: {
              condition: {
                type: 'ONE_OF_LIST',
                values: [
                  { userEnteredValue: '✏️ reason修正' },
                  { userEnteredValue: '🔄 差し替え' },
                  { userEnteredValue: '🗑️ 削除' },
                  { userEnteredValue: '⏸️ 保留' },
                  { userEnteredValue: '✅ OK' },
                ],
              },
              showCustomUi: true,
              strict: false,
            },
          },
        },
      ],
    },
  })

  // 推奨度・帯列（U列=20, V列=21）に条件付き書式
  // ★3.5未満=赤, ★3.5-3.9=黄, ★4.5+=緑 の3パターン
  console.log('→ 推奨度カラーバンド適用中...')

  // 既存の conditional format rules を削除（重複防止）
  const fullMeta = await sheets.spreadsheets.get({
    spreadsheetId: sheetId,
    ranges: [`${MAIN_TAB}!A1`],
    fields: 'sheets(properties.sheetId,conditionalFormats)',
  })
  const existingRules =
    fullMeta.data.sheets?.find(s => s.properties?.sheetId === sheetIdNum)
      ?.conditionalFormats ?? []
  if (existingRules.length > 0) {
    // index 0 から順に削除すると残りのindexが繰り上がるので、後ろから削除
    const deleteRequests = existingRules.map((_, i) => ({
      deleteConditionalFormatRule: {
        sheetId: sheetIdNum,
        index: existingRules.length - 1 - i,
      },
    }))
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: { requests: deleteRequests },
    })
    console.log(`  → 既存 ${existingRules.length} 件の条件付き書式を削除`)
  }

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: sheetId,
    requestBody: {
      requests: [
        // ★3.5未満（削除推奨）= 赤バンド
        {
          addConditionalFormatRule: {
            rule: {
              ranges: [{
                sheetId: sheetIdNum,
                startRowIndex: 1,
                endRowIndex: rows.length + 1,
                startColumnIndex: 20,
                endColumnIndex: 22,
              }],
              booleanRule: {
                condition: {
                  type: 'NUMBER_LESS',
                  values: [{ userEnteredValue: '3.5' }],
                },
                format: {
                  backgroundColor: { red: 0.98, green: 0.85, blue: 0.85 },
                  textFormat: { foregroundColor: { red: 0.6, green: 0.1, blue: 0.1 }, bold: true },
                },
              },
            },
            index: 0,
          },
        },
        // ★3.5-3.9（差し替え検討）= 黄バンド
        {
          addConditionalFormatRule: {
            rule: {
              ranges: [{
                sheetId: sheetIdNum,
                startRowIndex: 1,
                endRowIndex: rows.length + 1,
                startColumnIndex: 20,
                endColumnIndex: 22,
              }],
              booleanRule: {
                condition: {
                  type: 'NUMBER_BETWEEN',
                  values: [
                    { userEnteredValue: '3.5' },
                    { userEnteredValue: '3.9' },
                  ],
                },
                format: {
                  backgroundColor: { red: 1.0, green: 0.95, blue: 0.78 },
                  textFormat: { foregroundColor: { red: 0.5, green: 0.35, blue: 0.05 } },
                },
              },
            },
            index: 1,
          },
        },
        // ★4.5+（BEST PICK帯）= 緑バンド
        {
          addConditionalFormatRule: {
            rule: {
              ranges: [{
                sheetId: sheetIdNum,
                startRowIndex: 1,
                endRowIndex: rows.length + 1,
                startColumnIndex: 20,
                endColumnIndex: 22,
              }],
              booleanRule: {
                condition: {
                  type: 'NUMBER_GREATER_THAN_EQ',
                  values: [{ userEnteredValue: '4.5' }],
                },
                format: {
                  backgroundColor: { red: 0.85, green: 0.95, blue: 0.85 },
                  textFormat: { foregroundColor: { red: 0.1, green: 0.5, blue: 0.2 }, bold: true },
                },
              },
            },
            index: 2,
          },
        },
      ],
    },
  })

  // ─── D2ルール違反タブの書き込み ─────────────────────────────
  console.log('→ ルール違反タブ更新中...')
  const violations = detectViolations()
  await writeViolationsTab(sheets, sheetId, violations)

  // ─── 候補プールタブの初期化（既存なら触らない） ─────────────
  console.log('→ 候補プールタブ確認中...')
  await ensureCandidatePoolTab(sheets, sheetId)

  console.log(`✅ 完了: ${rows.length} 商品行 / ${violations.length} ルール違反`)
  console.log(`   https://docs.google.com/spreadsheets/d/${sheetId}/edit`)
}

/** 候補プールタブを作成（既存なら何もしない） */
async function ensureCandidatePoolTab(
  sheets: ReturnType<typeof google.sheets>,
  sheetId: string,
) {
  const TAB_NAME = '候補プール'
  const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId })
  const existing = meta.data.sheets!.find(s => s.properties!.title === TAB_NAME)

  if (existing) {
    console.log(`  → 既存タブあり・スキップ（ユーザー記入保持）`)
    return
  }

  // 新規作成
  const res = await sheets.spreadsheets.batchUpdate({
    spreadsheetId: sheetId,
    requestBody: {
      requests: [{ addSheet: { properties: { title: TAB_NAME } } }],
    },
  })
  const newTabId = res.data.replies![0].addSheet!.properties!.sheetId!

  // ヘッダー定義
  const POOL_HEADER = [
    '成分slug',
    '成分名',
    '推奨フォーム(en)',
    '候補商品名',
    'ブランド',
    'プラットフォーム',
    'URL',
    '価格(JPY)',
    '月次コスト',
    '第三者検査',
    '重金属検査',
    '認証',
    '用量(mg)',
    'form',
    'プール登録日',
    '最終確認日',
    '鮮度ステータス',
    'メモ',
  ]

  // 鮮度ステータスは数式で自動判定: 最終確認日(P列=index 15)から3ヶ月以上経過で⚠️
  // 各行で =IF(P{row}="","",IF(TODAY()-P{row}>90,"⚠️ 3ヶ月超","✅ 鮮度OK")) を入れる想定だが
  // データが入ってから自動展開する方式で運用する（初期はヘッダーのみ）

  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: `${TAB_NAME}!A1`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [POOL_HEADER] },
  })

  // ヘッダーフォーマット
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: sheetId,
    requestBody: {
      requests: [
        {
          repeatCell: {
            range: { sheetId: newTabId, startRowIndex: 0, endRowIndex: 1 },
            cell: {
              userEnteredFormat: {
                textFormat: { bold: true },
                backgroundColor: { red: 0.15, green: 0.3, blue: 0.4 },
                horizontalAlignment: 'CENTER',
              },
            },
            fields: 'userEnteredFormat(textFormat,backgroundColor,horizontalAlignment)',
          },
        },
        {
          updateSheetProperties: {
            properties: { sheetId: newTabId, gridProperties: { frozenRowCount: 1 } },
            fields: 'gridProperties.frozenRowCount',
          },
        },
        {
          autoResizeDimensions: {
            dimensions: { sheetId: newTabId, dimension: 'COLUMNS', startIndex: 0, endIndex: POOL_HEADER.length },
          },
        },
      ],
    },
  })

  console.log(`  → 新規作成: 候補プールタブ`)
}

/** ルール違反タブを作成 or 更新 */
async function writeViolationsTab(
  sheets: ReturnType<typeof google.sheets>,
  sheetId: string,
  violations: Violation[],
) {
  const TAB_NAME = '⚠️ ルール違反'
  const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId })
  let tab = meta.data.sheets!.find(s => s.properties!.title === TAB_NAME)

  if (!tab) {
    const res = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title: TAB_NAME } } }],
      },
    })
    tab = { properties: res.data.replies![0].addSheet!.properties }
  }
  const tabSheetId = tab.properties!.sheetId!

  // データ準備
  const VIOL_HEADER = ['成分slug', '成分名', 'エビデンス', '商品数', 'rank1有無', '違反タイプ', '詳細']
  const violRows = violations.map(v => [
    v.slug,
    v.nameJa,
    v.evidenceRank,
    v.productCount,
    v.hasRank1 ? '✓' : '',
    v.type,
    v.detail,
  ])

  await sheets.spreadsheets.values.clear({
    spreadsheetId: sheetId,
    range: `${TAB_NAME}!A:Z`,
  })
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: `${TAB_NAME}!A1`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [VIOL_HEADER, ...violRows] },
  })

  // ヘッダー太字 + 列幅自動
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: sheetId,
    requestBody: {
      requests: [
        {
          repeatCell: {
            range: { sheetId: tabSheetId, startRowIndex: 0, endRowIndex: 1 },
            cell: {
              userEnteredFormat: {
                textFormat: { bold: true },
                backgroundColor: { red: 0.4, green: 0.15, blue: 0.15 },
                horizontalAlignment: 'CENTER',
              },
            },
            fields: 'userEnteredFormat(textFormat,backgroundColor,horizontalAlignment)',
          },
        },
        {
          updateSheetProperties: {
            properties: { sheetId: tabSheetId, gridProperties: { frozenRowCount: 1 } },
            fields: 'gridProperties.frozenRowCount',
          },
        },
        {
          autoResizeDimensions: {
            dimensions: { sheetId: tabSheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: VIOL_HEADER.length },
          },
        },
      ],
    },
  })
}

main().catch(e => {
  console.error('❌ エラー:', e.message)
  console.error(e.stack)
  process.exit(1)
})
