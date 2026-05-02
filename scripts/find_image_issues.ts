/**
 * 画像が無い・プレースホルダ・準備中の商品を洗い出し
 */
import { ingredients } from '../src/lib/data.ts'

interface Issue {
  slug: string
  productName: string
  brand: string | undefined
  url: string
  imageUrl: string | undefined
  reason: string
}

const issues: Issue[] = []

for (const ing of ingredients) {
  for (const p of ing.products) {
    const img = p.imageUrl
    if (!img) {
      issues.push({
        slug: ing.slug,
        productName: p.name,
        brand: p.brand,
        url: p.url,
        imageUrl: img,
        reason: 'imageUrl 未設定',
      })
    } else if (/placeholder|noimage|no-image|準備中|coming-soon/i.test(img)) {
      issues.push({
        slug: ing.slug,
        productName: p.name,
        brand: p.brand,
        url: p.url,
        imageUrl: img,
        reason: 'プレースホルダ画像',
      })
    } else if (img.length < 30) {
      issues.push({
        slug: ing.slug,
        productName: p.name,
        brand: p.brand,
        url: p.url,
        imageUrl: img,
        reason: '画像URL異常（短すぎる）',
      })
    }
  }
}

console.log(`=== 画像問題 ${issues.length} 件 ===\n`)
for (const i of issues) {
  console.log(`[${i.reason}] ${i.slug} | ${i.brand} | ${i.productName.slice(0, 50)}`)
  console.log(`    ${i.url}`)
  console.log(`    img: ${i.imageUrl ?? '(なし)'}`)
  console.log()
}
