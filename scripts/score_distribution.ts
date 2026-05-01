/**
 * 全商品の recommendationScore 分布を計測
 *
 * 出力:
 * - 全体ヒストグラム
 * - 成分ごとの最低/中央/最高スコア
 * - ★3.5未満の商品リスト
 * - ★3.0未満の商品リスト
 *
 * 実行:
 *   node --experimental-strip-types --no-warnings scripts/score_distribution.ts
 */
import { ingredients } from '../src/lib/data.ts'
import { scoreProduct } from '../src/lib/productScore.ts'

interface Row {
  ingredientSlug: string
  productName: string
  brand: string | undefined
  url: string
  recommendationScore: number
  evidenceScore: number | null
  costScore: number | null
  monthlyCostJpy: number | undefined
  dailyDoseMg: number | null
  hasNullAxis: boolean
}

const rows: Row[] = []

for (const ing of ingredients) {
  for (const p of ing.products) {
    const s = scoreProduct(p, ing)
    const hasNullAxis = s.evidenceScore == null || s.costScore == null
    rows.push({
      ingredientSlug: ing.slug,
      productName: p.name,
      brand: p.brand,
      url: p.url,
      recommendationScore: s.recommendationScore,
      evidenceScore: s.evidenceScore,
      costScore: s.costScore,
      monthlyCostJpy: p.monthlyCostJpy,
      dailyDoseMg: s.dailyDoseMg,
      hasNullAxis,
    })
  }
}

// === 全体ヒストグラム ===
const buckets = [
  { label: '★4.5+', min: 4.5, max: 5.01 },
  { label: '★4.0-4.4', min: 4.0, max: 4.5 },
  { label: '★3.5-3.9', min: 3.5, max: 4.0 },
  { label: '★3.0-3.4', min: 3.0, max: 3.5 },
  { label: '★2.5-2.9', min: 2.5, max: 3.0 },
  { label: '★2.0-2.4', min: 2.0, max: 2.5 },
  { label: '★1.0-1.9', min: 1.0, max: 2.0 },
]

console.log(`\n=== 全商品 ${rows.length}件の recommendationScore 分布 ===`)
for (const b of buckets) {
  const count = rows.filter(r => r.recommendationScore >= b.min && r.recommendationScore < b.max).length
  const pct = ((count / rows.length) * 100).toFixed(1)
  const bar = '█'.repeat(Math.round(count / 3))
  console.log(`${b.label.padEnd(10)} ${count.toString().padStart(3)}件 (${pct.padStart(4)}%) ${bar}`)
}

// === 成分ごとの統計 ===
const byIngredient = new Map<string, Row[]>()
for (const r of rows) {
  if (!byIngredient.has(r.ingredientSlug)) byIngredient.set(r.ingredientSlug, [])
  byIngredient.get(r.ingredientSlug)!.push(r)
}

const ingStats = Array.from(byIngredient.entries()).map(([slug, list]) => {
  const sorted = list.map(r => r.recommendationScore).sort((a, b) => a - b)
  const min = sorted[0]
  const max = sorted[sorted.length - 1]
  const median = sorted[Math.floor(sorted.length / 2)]
  return { slug, count: list.length, min, median, max }
})

console.log(`\n=== 成分ごとの分布（92成分・最低スコア順） ===`)
ingStats.sort((a, b) => a.min - b.min)
console.log(`成分slug                          商品数  最低   中央   最高`)
for (const s of ingStats.slice(0, 20)) {
  console.log(`${s.slug.padEnd(35)} ${s.count.toString().padStart(3)}    ${s.min.toFixed(1)}    ${s.median.toFixed(1)}    ${s.max.toFixed(1)}`)
}
console.log(`... (上から最低スコア順 上位20件のみ表示・全 ${ingStats.length}成分)`)

// === ★3.5未満の商品リスト ===
const below35 = rows.filter(r => r.recommendationScore < 3.5).sort((a, b) => a.recommendationScore - b.recommendationScore)
console.log(`\n=== ★3.5未満の商品 ${below35.length}件 ===`)
console.log(`★    成分slug                       商品名（先頭40字）`)
for (const r of below35) {
  const name = r.productName.length > 40 ? r.productName.slice(0, 40) + '...' : r.productName
  console.log(`${r.recommendationScore.toFixed(1)}  ${r.ingredientSlug.padEnd(33)} ${name}`)
}

// === ★3.0未満の商品リスト（特に問題）===
const below30 = rows.filter(r => r.recommendationScore < 3.0)
console.log(`\n=== ★3.0未満の商品 ${below30.length}件（最も問題） ===`)
for (const r of below30) {
  console.log(`★${r.recommendationScore.toFixed(1)}  ${r.ingredientSlug.padEnd(30)} ${r.productName.slice(0, 50)}`)
}

// === 単独成分（products 1個のみ）の商品 ===
const singleProducts = ingStats.filter(s => s.count === 1)
console.log(`\n=== 商品が1個のみの成分: ${singleProducts.length}成分 ===`)
console.log(`（除外すると掲載商品が0になるリスク）`)

// === データ欠損のある商品 ===
const withNullAxis = rows.filter(r => r.hasNullAxis).length
console.log(`\n=== データ欠損（evidence or cost が null） ===`)
console.log(`${withNullAxis}件 / ${rows.length}件 (${((withNullAxis/rows.length)*100).toFixed(1)}%)`)

// === サマリ ===
console.log(`\n=== サマリ ===`)
console.log(`全商品: ${rows.length}件 / 全成分: ${ingStats.length}件`)
console.log(`★4.5+: ${rows.filter(r => r.recommendationScore >= 4.5).length}件`)
console.log(`★4.0+: ${rows.filter(r => r.recommendationScore >= 4.0).length}件`)
console.log(`★3.5+: ${rows.filter(r => r.recommendationScore >= 3.5).length}件`)
console.log(`★3.0+: ${rows.filter(r => r.recommendationScore >= 3.0).length}件`)
console.log(`★3.5未満: ${below35.length}件 (${((below35.length/rows.length)*100).toFixed(1)}%)`)
console.log(`★3.0未満: ${below30.length}件 (${((below30.length/rows.length)*100).toFixed(1)}%)`)
console.log(`単独商品成分: ${singleProducts.length}成分（除外時の掲載0リスク）`)
