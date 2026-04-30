import { ingredients } from '../src/lib/data'
const bRank = ingredients.filter(i => i.evidenceRank === 'B')
const supps = bRank.filter(i => i.usageType === 'oral' || i.usageType == null || i.usageType === 'both')
const top = bRank.filter(i => i.usageType === 'topical')
console.log(`# B-rank: ${bRank.length} (supps ${supps.length} / topical ${top.length})\n`)

console.log('## Supplements')
supps.forEach(ing => {
  const products = ing.products ?? []
  console.log(`${ing.slug} | ${products.length}p | ${ing.dosageMin}-${ing.dosageMax}${ing.dosageUnit} | usageType=${ing.usageType ?? 'oral'}`)
  products.forEach((p, i) => {
    console.log(`  [${i+1}] ${p.brand} | ${p.name}`)
    console.log(`      url: ${p.url}`)
    console.log(`      price=¥${p.priceJpy} monthly=¥${p.monthlyCostJpy ?? 'NULL'} dose=${p.dosageMg ?? 'NULL'} units=${p.unitsPerDay ?? 'NULL'} cert=${(p.certifications||[]).join(',')} narrative=${p.benefitHeading ? 'YES' : 'NO'}`)
  })
})

console.log('\n## Topicals')
top.forEach(ing => {
  const products = ing.products ?? []
  console.log(`${ing.slug} | ${products.length}p | tagline=${ing.tagline}`)
  products.forEach((p, i) => {
    console.log(`  [${i+1}] ${p.brand} | ${p.name}`)
    console.log(`      url: ${p.url}`)
    console.log(`      price=¥${p.priceJpy} monthly=¥${p.monthlyCostJpy ?? 'NULL'} narrative=${p.benefitHeading ? 'YES' : 'NO'}`)
  })
})
