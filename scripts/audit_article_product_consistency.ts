import { ingredients } from '../src/lib/data.ts'
import { articles } from '../src/lib/articles.ts'

const ingMap = new Map<string, string | null>()
for (const ing of ingredients) {
  ingMap.set(ing.slug, ing.products?.[0]?.url ?? null)
}

type Row = { article: string; ing: string; same: boolean; articleUrl: string; dataUrl: string }
const rows: Row[] = []
for (const a of articles) {
  for (const i of a.ingredients ?? []) {
    if (!i.productUrl) continue
    const dataUrl = ingMap.get(i.slug) ?? null
    const same = dataUrl === i.productUrl
    rows.push({ article: a.slug, ing: i.slug, same, articleUrl: i.productUrl, dataUrl: dataUrl ?? '(no product)' })
  }
}

const mismatches = rows.filter(r => !r.same)
console.log(`合計: ${rows.length} 件 / 不一致: ${mismatches.length} 件`)
console.log('---')
for (const r of mismatches) {
  console.log(`[${r.article}] ${r.ing}`)
  console.log(`  article: ${r.articleUrl}`)
  console.log(`  data.ts: ${r.dataUrl}`)
}
