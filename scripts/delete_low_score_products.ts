/**
 * ★4.0未満の商品を data.ts から物理削除する
 * - 単独商品の成分は products: [] になる（ingredient定義は残す）
 * - 複数商品の場合は該当商品のみ削除
 *
 * 対象は商品名で完全一致検索する（ナレッジベースで事前確認済み）
 */
import * as fs from 'node:fs'

const DATA_PATH = '/Users/raykudo/agescience/src/lib/data.ts'

// 削除対象（商品名・成分slug の組）
const TARGETS: { slug: string; name: string }[] = [
  { slug: 'chromium', name: 'Chromium Picolinate 200mcg 250 caps' },
  { slug: 'vitamin-d', name: 'Vitamin D-3 2,000 IU 240ソフトゲル' },
  { slug: 'vitamin-d', name: 'Vitamin D3 2000 IU (240 softgels)' },
  { slug: 'vitamin-b12', name: 'Methylcobalamin 1000mcg（メチルコバラミン）' },
  { slug: 'creatine', name: 'クレアチンモノハイドレート 1kg 純度99.9%' },
  { slug: 'vitamin-e', name: 'Vitamin E 180mg (400IU) Mixed Tocopherols' },
  { slug: 'silica', name: 'BioSil Bone & Joint Support 60 capsules' },
  { slug: 'omega3', name: 'スーパーオメガ3 EPA/DHA + ゴマリグナン&オリーブ果実 120ジェルカプセル' },
  { slug: 'kojic-acid', name: 'Cos De BAHA Nナイアシンアミド 10% 亜鉛 1% 30ml（コウジ酸代替・美白複合ケア）' },
  { slug: 'folic-acid', name: 'Methyl Folate + Vitamin C（活性型）' },
  { slug: 'zeaxanthin', name: 'Lutein 20mg & Zeaxanthin 1mg 90 softgels' },
  { slug: 'astaxanthin', name: 'Nature In アスタキサンチン+DHA・EPA 60日分' },
  { slug: 'black-seed-oil', name: 'Black Seed Oil 1000mg 60 softgels' },
  { slug: 'equol', name: 'エクエル（エクオール含有大豆胚芽発酵エキス）' },
  { slug: 'glycine', name: 'Glycine 1,000mg 100% Pure Powder 454g' },
  { slug: 'sulforaphane', name: 'BroccoMax（Myrosinase Active）60 caps' },
  { slug: 'apigenin', name: 'Apigenin 50mg 90 Veg Capsules' },
  { slug: 'pterostilbene', name: 'Pterostilbene 50mg 60 capsules' },
  { slug: 'saw-palmetto', name: 'Saw Palmetto 320mg 90 Softgels' },
  { slug: 'boswellia', name: 'Boswellia Extract 500mg (65% Boswellic Acids)' },
  { slug: 'collagen-type-ii', name: 'UC-II Joint Health 40mg 120 caps' },
  { slug: 'fisetin', name: 'Fisetin 100mg (30 caps)' },
  { slug: 'ceramide-oral', name: 'PhytoCeramides Advanced Formula 30mg (30 caps)' },
  { slug: 'bioperine', name: 'BioPerine 10mg (90 caps)' },
  { slug: 'alpha-lipoic-acid', name: 'Alpha Lipoic Acid 300mg' },
  { slug: 'maca', name: 'Organic Maca 500mg' },
]

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

let src = fs.readFileSync(DATA_PATH, 'utf-8')
let deleted = 0

for (const t of TARGETS) {
  // name: 'X' を探してから、その前の `{` まで巻き戻す
  const namePattern = new RegExp(
    `name:\\s*['"]${escapeRegex(t.name)}['"]`,
  )
  const match = src.match(namePattern)
  if (!match) {
    console.log(`❌ 見つかりません: ${t.slug} | ${t.name.slice(0, 40)}`)
    continue
  }

  // name: の位置から後方に走査して最も近い '{' を探す（products: の `{` を超えないよう注意）
  let nameIdx = match.index!
  let openIdx = -1
  for (let i = nameIdx - 1; i >= 0; i--) {
    if (src[i] === '{') {
      // この { が商品オブジェクトの開始かチェック（直前に `[` か `,` が来るはず）
      let j = i - 1
      while (j >= 0 && /\s/.test(src[j])) j--
      if (src[j] === '[' || src[j] === ',') {
        openIdx = i
        break
      }
      // それ以外はネストの可能性 - スキップして続行
    }
  }
  if (openIdx === -1) {
    console.log(`❌ 開始 { 見つからず: ${t.slug}`)
    continue
  }
  // 行頭インデントから消すため { の行頭まで戻す
  let lineStart = openIdx
  while (lineStart > 0 && src[lineStart - 1] !== '\n') lineStart--

  const startIdx = lineStart
  // {} の対応を取って商品オブジェクトの終端を探す（openIdx から）
  let depth = 0
  let endIdx = -1
  let inString = false
  let stringChar = ''
  let escaped = false
  for (let i = openIdx; i < src.length; i++) {
    const ch = src[i]
    if (escaped) {
      escaped = false
      continue
    }
    if (ch === '\\') {
      escaped = true
      continue
    }
    if (inString) {
      if (ch === stringChar) inString = false
      continue
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      inString = true
      stringChar = ch
      continue
    }
    if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) {
        endIdx = i + 1
        break
      }
    }
  }
  if (endIdx === -1) {
    console.log(`❌ 終端見つからず: ${t.slug}`)
    continue
  }
  // 末尾のカンマ・改行も含めて消す
  let after = endIdx
  while (after < src.length && (src[after] === ',' || src[after] === '\n' || src[after] === ' ')) {
    after++
    if (src[after - 1] === '\n') break
  }
  // 行全体を消すため startIdx は行頭のインデント前まで巻き戻す
  let beforeStart = startIdx
  // startIdx は indent の最初の空白から始まっているので OK
  src = src.slice(0, beforeStart) + src.slice(after)
  deleted++
  console.log(`✓ ${t.slug} | ${t.name.slice(0, 50)}`)
}

fs.writeFileSync(DATA_PATH, src, 'utf-8')
console.log(`\n削除: ${deleted}/${TARGETS.length}`)
