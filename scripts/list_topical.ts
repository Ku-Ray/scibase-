import { ingredients } from '../src/lib/data'
const topical = ingredients.filter(i => i.usageType === 'topical' || i.usageType === 'both')
console.log(`# Topical/both ingredients: ${topical.length}\n`)
const byRank: Record<string, typeof topical> = {}
topical.forEach(i => {
  byRank[i.evidenceRank] = byRank[i.evidenceRank] || []
  byRank[i.evidenceRank]!.push(i)
})
for (const r of ['S','A','B','C','D'] as const) {
  if (!byRank[r]) continue
  console.log(`## ${r}-rank: ${byRank[r]!.length}`)
  byRank[r]!.forEach(ing => {
    const products = ing.products ?? []
    const issues: string[] = []
    products.forEach(p => {
      if (!p.imageUrl) issues.push('NO_IMAGE')
      if (!p.monthlyCostJpy) issues.push('NO_MONTHLY')
      if (!p.unitsPerDay) issues.push('NO_UNITS')
      if (p.priceJpy && p.monthlyCostJpy && p.monthlyCostJpy >= p.priceJpy * 0.95) issues.push('SUSPECT')
      if (!p.benefitHeading) issues.push('NO_NARRATIVE')
    })
    const flags = [...new Set(issues)].join(',')
    console.log(`  ${ing.slug} (${products.length} products)${flags ? ' → ' + flags : ''}`)
  })
}
