import { chromium } from 'playwright'
import path from 'node:path'

const slug = process.argv[2] ?? 'anti-aging-supplement-guide-30s'
const url = `http://localhost:3000/articles/${slug}`
const outDir = path.join(process.cwd(), 'tmp', 'offer_card_screenshots')

async function main() {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width: 375, height: 1200 }, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForSelector('#ingredients', { timeout: 10000 })
  await page.evaluate(() => document.getElementById('ingredients')?.scrollIntoView({ block: 'start' }))
  await page.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll('img'))
    await Promise.all(imgs.map(img => {
      if (img.complete && img.naturalHeight > 0) return Promise.resolve()
      return new Promise(r => {
        img.addEventListener('load', () => r(null), { once: true })
        img.addEventListener('error', () => r(null), { once: true })
        setTimeout(() => r(null), 5000)
      })
    }))
  })
  await page.waitForTimeout(800)
  const out = path.join(outDir, `article_${slug}_375.png`)
  await page.locator('#ingredients').first().screenshot({ path: out })
  console.log(out)
  await browser.close()
}
main()
