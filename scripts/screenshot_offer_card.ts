/**
 * 商品オファーカード v4 のレンダリング検証スクリーンショット。
 * UIUX レビュー用：375px / 768px / 1280px の3幅で撮影し、
 * 結論ボックス・ヒーロー・比較表の3エリアを目視できるようにする。
 *
 * 使い方:
 *   npx tsx scripts/screenshot_offer_card.ts ashwagandha
 *   npx tsx scripts/screenshot_offer_card.ts ashwagandha --url=http://localhost:3000
 */
import { chromium } from 'playwright'
import path from 'node:path'
import fs from 'node:fs'

const slug = process.argv[2] ?? 'ashwagandha'
const baseUrl = process.argv.find(a => a.startsWith('--url='))?.slice(6) ?? 'http://localhost:3000'
const url = `${baseUrl}/ingredients/${slug}`
const outDir = path.join(process.cwd(), 'tmp', 'offer_card_screenshots')
fs.mkdirSync(outDir, { recursive: true })

const widths = [
  { name: 'mobile_375', w: 375, h: 2400 },
  { name: 'tablet_768', w: 768, h: 1800 },
  { name: 'desktop_1280', w: 1280, h: 1800 },
]

async function main() {
  const browser = await chromium.launch()
  for (const { name, w, h } of widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 })
    const page = await ctx.newPage()
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForSelector('#products', { timeout: 10000 })
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {})
    await page.waitForFunction(() => document.fonts.ready.then(() => true), undefined, { timeout: 5000 }).catch(() => {})
    // Products セクションへスクロール（lazy load 画像のロードトリガー）
    await page.evaluate(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'instant', block: 'start' })
    })
    // 全画像のロード完了を待つ（lazy 解除）
    await page.evaluate(async () => {
      const imgs = Array.from(document.querySelectorAll('img'))
      await Promise.all(
        imgs.map(img => {
          if (img.complete && img.naturalHeight > 0) return Promise.resolve()
          return new Promise(res => {
            img.addEventListener('load', () => res(null), { once: true })
            img.addEventListener('error', () => res(null), { once: true })
            setTimeout(() => res(null), 5000)
          })
        }),
      )
    })
    await page.waitForTimeout(800)
    const sectionPath = path.join(outDir, `${slug}_${name}_products.png`)
    const productsEl = await page.locator('#products').first()
    await productsEl.screenshot({ path: sectionPath })
    console.log(`✓ ${sectionPath}`)
    // フルページも欲しい
    const fullPath = path.join(outDir, `${slug}_${name}_full.png`)
    await page.screenshot({ path: fullPath, fullPage: true })
    console.log(`✓ ${fullPath}`)
    await ctx.close()
  }
  await browser.close()
}

main().catch(e => { console.error(e); process.exit(1) })
