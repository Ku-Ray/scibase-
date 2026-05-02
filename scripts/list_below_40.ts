/**
 * ★4.0未満の商品を成分別にリスト化（Phase D 用）
 */
import { ingredients } from '../src/lib/data.ts'
import { scoreProduct } from '../src/lib/productScore.ts'

interface Row {
  ingredientSlug: string
  productCount: number
  productName: string
  brand: string | undefined
  url: string
  score: number
  evidence: number | null
  monthlyCost: number | undefined
}

const rows: Row[] = []

for (const ing of ingredients) {
  for (const p of ing.products) {
    const s = scoreProduct(p, ing)
    if (s.recommendationScore < 4.0) {
      rows.push({
        ingredientSlug: ing.slug,
        productCount: ing.products.length,
        productName: p.name,
        brand: p.brand,
        url: p.url,
        score: s.recommendationScore,
        evidence: s.evidenceScore,
        monthlyCost: p.monthlyCostJpy,
      })
    }
  }
}

rows.sort((a, b) => a.score - b.score)

console.log(`\n=== ★4.0未満の商品 ${rows.length}件 ===\n`)
console.log(`★    成分slug                      他商品  ev  ¥/月    商品名`)
for (const r of rows) {
  const cost = r.monthlyCost ? `¥${r.monthlyCost}` : '—'
  console.log(
    `${r.score.toFixed(1)}  ${r.ingredientSlug.padEnd(30)} ${(r.productCount - 1).toString().padStart(2)}件   ${(r.evidence ?? '—').toString().padStart(2)}  ${cost.padStart(7)}  ${r.productName.slice(0, 50)}`,
  )
}

// 単独商品の成分（除外すると掲載0になる）
console.log(`\n=== うち単独商品成分（除外で掲載0）===`)
const singleOnly = rows.filter(r => r.productCount === 1)
console.log(`${singleOnly.length}件 / ${rows.length}件`)
for (const r of singleOnly) {
  console.log(`★${r.score.toFixed(1)} ${r.ingredientSlug}`)
}
