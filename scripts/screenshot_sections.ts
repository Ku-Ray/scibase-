/**
 * 成分ページを section 単位でスクショ。消費者通読レビュー用。
 */
import { chromium } from 'playwright'
import path from 'node:path'

const slug = process.argv[2] ?? 'ashwagandha'
const url = `http://localhost:3000/ingredients/${slug}`
const outDir = path.join(process.cwd(), 'tmp', 'review_sections')
import fs from 'node:fs'
fs.mkdirSync(outDir, { recursive: true })

async function main() {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width: 375, height: 1200 }, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForLoadState('networkidle').catch(() => {})

  // 全 img の load を待つ
  await page.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll('img'))
    await Promise.all(imgs.map(img => {
      if (img.complete && img.naturalHeight > 0) return Promise.resolve()
      return new Promise(r => {
        img.addEventListener('load', () => r(null), { once: true })
        img.addEventListener('error', () => r(null), { once: true })
        setTimeout(() => r(null), 4000)
      })
    }))
  })
  await page.waitForTimeout(800)

  // 主要 section
  const sections = [
    { name: '00_top', selector: 'main' }, // 上部全体（hero+メタ）
    { name: '01_evidence', selector: '#evidence' },
    { name: '02_dosage', selector: '#dosage' },
    { name: '03_papers', selector: '#papers' },
    { name: '04_products', selector: '#products' },
    { name: '05_articles', selector: '#articles' },
    { name: '06_alternatives', selector: '#alternatives' },
    { name: '07_faq', selector: '#faq' },
  ]

  for (const s of sections) {
    try {
      const el = page.locator(s.selector).first()
      const exists = await el.count()
      if (!exists) {
        console.log(`SKIP ${s.name} (no element)`)
        continue
      }
      // section にスクロール
      await el.scrollIntoViewIfNeeded({ timeout: 5000 })
      await page.waitForTimeout(400)
      const out = path.join(outDir, `${slug}_${s.name}.png`)
      if (s.name === '00_top') {
        // 上部1200pxだけ
        await page.evaluate(() => window.scrollTo(0, 0))
        await page.waitForTimeout(300)
        await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 375, height: 1200 } })
      } else {
        await el.screenshot({ path: out })
      }
      console.log(`✓ ${out}`)
    } catch (e) {
      console.log(`ERR ${s.name}: ${e instanceof Error ? e.message : e}`)
    }
  }
  await browser.close()
}
main()
