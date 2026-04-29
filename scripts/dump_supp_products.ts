import { ingredients } from '../src/lib/data'
const sRank = ingredients.filter(i => i.evidenceRank === 'S' && (i.usageType === 'oral' || i.usageType == null))
sRank.forEach(ing => {
  console.log(`\n## ${ing.slug} (推奨 ${ing.dosageMin}-${ing.dosageMax} ${ing.dosageUnit})`)
  ing.products?.forEach((p, i) => {
    console.log(`  [${i+1}] ${p.brand} | ${p.name}`)
    console.log(`      url: ${p.url}`)
    console.log(`      price=¥${p.priceJpy} monthly=¥${p.monthlyCostJpy ?? 'null'} dosageMg=${p.dosageMg} form=${p.form}`)
    console.log(`      thirdParty=${p.thirdPartyTested ?? false} heavyMetal=${p.heavyMetalTested ?? false} cert=${(p.certifications||[]).join(',')}`)
  })
})
