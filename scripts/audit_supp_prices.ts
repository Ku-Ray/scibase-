import { ingredients } from '../src/lib/data'
import type { Ingredient, Product } from '../src/lib/types'

// Identify S-rank supplement (oral, not topical) ingredients
const sRank = ingredients.filter(i => i.evidenceRank === 'S' && (i.usageType === 'oral' || i.usageType == null))

console.log(`# S-rank supplement ingredients: ${sRank.length}`)
console.log(sRank.map(i => `${i.slug} (${i.products?.length ?? 0} products)`).join('\n'))
console.log('\n# Per-product field completeness audit\n')

const issues: string[] = []
sRank.forEach(ing => {
  ing.products?.forEach((p, idx) => {
    const flags: string[] = []
    if (!p.imageUrl) flags.push('NO_IMAGE')
    if (p.priceJpy == null) flags.push('NO_PRICE')
    if (p.monthlyCostJpy == null) flags.push('NO_MONTHLY')
    if (p.unitsPerDay == null) flags.push('NO_UNITS_PER_DAY')
    // suspect mismatch: monthlyCostJpy >= priceJpy (suggests not divided by months)
    if (p.priceJpy && p.monthlyCostJpy && p.monthlyCostJpy >= p.priceJpy * 0.95) {
      flags.push(`SUSPECT_MONTHLY=${p.monthlyCostJpy}_PRICE=${p.priceJpy}`)
    }
    if (flags.length) {
      issues.push(`[${ing.slug}] #${idx+1} ${p.brand} ${p.name} → ${flags.join(', ')}`)
    }
  })
})
console.log(issues.join('\n'))
console.log(`\nTotal flagged products: ${issues.length}`)
