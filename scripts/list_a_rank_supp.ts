import { ingredients } from '../src/lib/data'
const aRank = ingredients.filter(i => i.evidenceRank === 'A' && (i.usageType === 'oral' || i.usageType == null))
console.log(`# A-rank supplement ingredients: ${aRank.length}\n`)
aRank.forEach(ing => {
  const products = ing.products ?? []
  console.log(`## ${ing.slug} (${products.length} products) — 推奨 ${ing.dosageMin}-${ing.dosageMax} ${ing.dosageUnit}`)
  products.forEach((p, i) => {
    console.log(`  [${i+1}] ${p.brand} | ${p.name}`)
    console.log(`      url: ${p.url}`)
    console.log(`      price=¥${p.priceJpy} monthly=¥${p.monthlyCostJpy ?? 'NULL'} dosageMg=${p.dosageMg ?? 'NULL'} unitsPerDay=${p.unitsPerDay ?? 'NULL'} form=${p.form}`)
    console.log(`      thirdParty=${p.thirdPartyTested ?? false} heavyMetal=${p.heavyMetalTested ?? false} cert=${(p.certifications||[]).join(',')}`)
    console.log(`      benefitHeading=${p.benefitHeading ? 'YES' : 'NO'} pros=${(p.pros?.length ?? 0)} cons=${(p.cons?.length ?? 0)} imageUrl=${p.imageUrl ? 'YES' : 'NO'}`)
  })
})
