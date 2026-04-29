import { ingredients } from '../src/lib/data'
const REMAINING_SUPP = ['astaxanthin','egcg','phosphatidylserine','ginkgo-biloba','selenium','lutein','calcium','vitamin-b12','vitamin-b6','l-citrulline','inulin','bacopa-monnieri','panax-ginseng','niacin','magnesium-glycinate','hmb','myo-inositol','zeaxanthin','beta-glucan','l-tryptophan','boswellia','l-carnitine','collagen-type-ii','alpha-lipoic-acid','ceramide-oral','bioperine']
const TOPICAL = ingredients.filter(i => (i.usageType==='topical'||i.usageType==='both') && i.evidenceRank==='A').map(i => i.slug)

console.log('# Remaining A-rank supplements ('+REMAINING_SUPP.length+')')
REMAINING_SUPP.forEach(slug => {
  const ing = ingredients.find(i => i.slug===slug)
  if (!ing) return console.log(`MISS: ${slug}`)
  const p = ing.products?.find(x => x.rank===1) ?? ing.products?.[0]
  if (!p) return console.log(`${slug}: NO_PRODUCT`)
  console.log(`${slug} | ${ing.dosageMin}-${ing.dosageMax}${ing.dosageUnit} | ${p.brand} | ${p.name} | dose=${p.dosageMg} | cert=${(p.certifications||[]).join(',')} | tp=${p.thirdPartyTested} | url=${p.url}`)
})
console.log('\n# Topical A-rank ('+TOPICAL.length+')')
TOPICAL.forEach(slug => {
  const ing = ingredients.find(i => i.slug===slug)
  if (!ing) return
  const p = ing.products?.find(x => x.rank===1) ?? ing.products?.[0]
  if (!p) return console.log(`${slug}: NO_PRODUCT`)
  console.log(`${slug} | ${ing.dosageMin}-${ing.dosageMax}${ing.dosageUnit} | ${p.brand} | ${p.name} | dose=${p.dosageMg} | cert=${(p.certifications||[]).join(',')} | tp=${p.thirdPartyTested} | tagline=${ing.tagline} | url=${p.url}`)
})
