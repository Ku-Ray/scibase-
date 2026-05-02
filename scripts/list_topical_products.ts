/**
 * 外用商品一覧を出力（Phase B 実装用補助スクリプト）
 */
import { ingredients } from '../src/lib/data.ts'

for (const ing of ingredients) {
  if (ing.usageType !== 'topical' && ing.usageType !== 'both') continue
  console.log(`\n=== ${ing.slug} (${ing.usageType}) min=${ing.concentrationMinPct ?? '-'}% max=${ing.concentrationMaxPct ?? '-'}% ===`)
  for (const p of ing.products) {
    const conc = p.concentrationPct ?? '?'
    console.log(`  [${conc}%] ${p.brand} | ${p.name.slice(0, 60)}`)
  }
}
