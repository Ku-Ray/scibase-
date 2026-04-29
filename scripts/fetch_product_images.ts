/**
 * 全 products[] の URL から og:image を Playwright で取得し、
 * tmp/product_images.json にダンプする。
 *
 * Phase 1: 取得のみ（data.ts は変更しない）
 * Phase 2: apply_product_images.ts で data.ts へ反映
 *
 * 使い方:
 *   npx tsx scripts/fetch_product_images.ts                  # 全件
 *   npx tsx scripts/fetch_product_images.ts --limit=5        # 先頭5件
 *   npx tsx scripts/fetch_product_images.ts --slug=ashwagandha # 指定成分のみ
 *   npx tsx scripts/fetch_product_images.ts --skip-existing   # 既存imageUrl はスキップ
 */
import { chromium, type Browser, type BrowserContext } from 'playwright'
import path from 'node:path'
import fs from 'node:fs'
import { ingredients } from '../src/lib/data'

const limitArg = process.argv.find(a => a.startsWith('--limit='))
const slugArg = process.argv.find(a => a.startsWith('--slug='))
const skipExisting = process.argv.includes('--skip-existing')
const LIMIT = limitArg ? parseInt(limitArg.slice(8), 10) : Infinity
const TARGET_SLUG = slugArg ? slugArg.slice(7) : null

const outPath = path.join(process.cwd(), 'tmp', 'product_images.json')
fs.mkdirSync(path.dirname(outPath), { recursive: true })

interface Result {
  ingredientSlug: string
  productName: string
  brand: string
  url: string
  platform: string
  imageUrl: string | null
  status: 'ok' | 'no_og_image' | 'http_error' | 'timeout' | 'blocked'
  error?: string
}

/**
 * meta タグを直接取得（page.evaluate を避けて tsx __name エラー回避）。
 */
async function getMetaContent(page: import('playwright').Page, selector: string): Promise<string | null> {
  return await page.getAttribute(selector, 'content', { timeout: 2000 }).catch(() => null)
}

async function fetchOgImageOnce(ctx: BrowserContext, url: string): Promise<{ image: string | null; status: Result['status']; error?: string }> {
  const page = await ctx.newPage()
  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
    if (!resp || resp.status() >= 400) {
      const status = resp?.status()
      if (status === 403 || status === 429) return { image: null, status: 'blocked', error: `HTTP ${status}` }
      return { image: null, status: 'http_error', error: `HTTP ${status}` }
    }
    // og:image / og:image:secure_url / twitter:image を順に確認
    const image =
      (await getMetaContent(page, 'meta[property="og:image:secure_url"]')) ||
      (await getMetaContent(page, 'meta[property="og:image"]')) ||
      (await getMetaContent(page, 'meta[name="twitter:image"]')) ||
      (await getMetaContent(page, 'meta[name="twitter:image:src"]')) ||
      (await page.locator('img#landingImage, #imgBlkFront, [data-testid="product-image"] img, main img').first().getAttribute('src', { timeout: 2000 }).catch(() => null))
    if (!image) return { image: null, status: 'no_og_image' }
    return { image, status: 'ok' }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    if (msg.includes('Timeout')) return { image: null, status: 'timeout', error: msg }
    return { image: null, status: 'http_error', error: msg }
  } finally {
    await page.close().catch(() => {})
  }
}

/** ブロック時に context 再作成 + 最大2回リトライ（Cloudflare のセッション fingerprint 回避） */
async function fetchOgImage(
  browser: Browser,
  baseCtx: BrowserContext,
  url: string,
  platform: string,
): Promise<{ image: string | null; status: Result['status']; error?: string; ctx: BrowserContext }> {
  let ctx = baseCtx
  let last = await fetchOgImageOnce(ctx, url)
  if (last.status === 'blocked' && platform === 'iherb') {
    // 新しい context で fingerprint をリセット（Cloudflare の頻度制限/threat score を回避）
    await ctx.close().catch(() => {})
    await new Promise(r => setTimeout(r, 4000))
    ctx = await makeStealthContext(browser)
    last = await fetchOgImageOnce(ctx, url)
    if (last.status === 'blocked') {
      await new Promise(r => setTimeout(r, 8000))
      last = await fetchOgImageOnce(ctx, url)
    }
  }
  return { ...last, ctx }
}

async function makeStealthContext(browser: Browser): Promise<BrowserContext> {
  const ctx = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    locale: 'ja-JP',
    viewport: { width: 1280, height: 800 },
    extraHTTPHeaders: {
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Sec-Ch-Ua': '"Chromium";v="124", "Google Chrome";v="124"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"macOS"',
    },
  })
  await ctx.addInitScript(`Object.defineProperty(navigator, 'webdriver', { get: () => undefined })`)
  return ctx
}

async function main() {
  // 既存の取得結果があれば読み込み（skip-existing 用）
  const existing: Record<string, Result> = fs.existsSync(outPath)
    ? JSON.parse(fs.readFileSync(outPath, 'utf8'))
    : {}

  const tasks: { ingredientSlug: string; productName: string; brand: string; url: string; platform: string; existingImageUrl?: string }[] = []
  for (const ing of ingredients) {
    if (TARGET_SLUG && ing.slug !== TARGET_SLUG) continue
    for (const p of ing.products) {
      if (skipExisting && p.imageUrl) continue
      if (existing[p.url]?.status === 'ok' && skipExisting) continue
      tasks.push({
        ingredientSlug: ing.slug,
        productName: p.name,
        brand: p.brand,
        url: p.url,
        platform: p.platform,
        existingImageUrl: p.imageUrl,
      })
    }
  }
  const limited = tasks.slice(0, LIMIT)
  console.log(`[fetch] target: ${limited.length} products (total ${tasks.length}, limit ${LIMIT === Infinity ? 'none' : LIMIT})`)

  /* Cloudflare bypass: webdriver flag 削除 + リアル UA + headers + per-request context */
  const browser: Browser = await chromium.launch({
    headless: true,
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox'],
  })
  let ctx = await makeStealthContext(browser)

  const results: Result[] = []
  let i = 0
  for (const t of limited) {
    i++
    // iHerb は毎回 context を新規化（Cloudflare の「first-request 通過」を継続）
    if (t.platform === 'iherb') {
      await ctx.close().catch(() => {})
      ctx = await makeStealthContext(browser)
    }
    const r = await fetchOgImage(browser, ctx, t.url, t.platform)
    ctx = r.ctx // context が再作成された場合はここで切替え
    const result: Result = {
      ingredientSlug: t.ingredientSlug,
      productName: t.productName,
      brand: t.brand,
      url: t.url,
      platform: t.platform,
      imageUrl: r.image,
      status: r.status,
      ...(r.error && { error: r.error }),
    }
    results.push(result)
    existing[t.url] = result
    const tag =
      r.status === 'ok' ? '✓' :
      r.status === 'blocked' ? '⛔' :
      r.status === 'no_og_image' ? '⚠' :
      r.status === 'timeout' ? '⏱' : '✗'
    console.log(`[${i}/${limited.length}] ${tag} ${t.platform.padEnd(6)} ${t.brand.slice(0, 14).padEnd(14)} ${t.productName.slice(0, 40).padEnd(40)} ${r.image ? r.image.slice(0, 80) : r.error ?? r.status}`)
    // サーバ負荷配慮：iHerb はレート制限が厳しいので長め
    const delay = t.platform === 'iherb' ? 5000 : 1200
    await new Promise(r => setTimeout(r, delay))
    // 中間保存（全件失敗時のロスを最小化）
    if (i % 10 === 0) fs.writeFileSync(outPath, JSON.stringify(existing, null, 2))
  }

  fs.writeFileSync(outPath, JSON.stringify(existing, null, 2))
  await browser.close()

  // サマリー
  const summary = results.reduce<Record<Result['status'], number>>(
    (a, r) => ({ ...a, [r.status]: (a[r.status] ?? 0) + 1 }),
    { ok: 0, no_og_image: 0, http_error: 0, timeout: 0, blocked: 0 },
  )
  console.log('\n=== SUMMARY ===')
  Object.entries(summary).forEach(([k, v]) => console.log(`  ${k.padEnd(15)} ${v}`))
  console.log(`\nresults saved: ${outPath}`)
}

main().catch(e => { console.error(e); process.exit(1) })
