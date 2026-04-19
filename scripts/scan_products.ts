import { ingredients } from '../src/lib/data.ts'
import { writeFileSync, appendFileSync, existsSync, unlinkSync } from 'node:fs'
import { resolve } from 'node:path'

type Target = {
  ingredientSlug: string
  ingredientNameJa: string
  productIndex: number
  name: string
  brand: string
  platform: 'iherb' | 'amazon' | 'cosme'
  url: string
  urlKind: 'iherb-product' | 'amazon-product' | 'amazon-search' | 'other'
}

type ScanResult = Target & {
  status: number | null
  fetchedTitle: string | null
  fetchedAt: string
  stockState: 'in-stock' | 'out-of-stock' | 'unknown' | 'not-found'
  nameMatch: 'match' | 'partial' | 'mismatch' | 'unverifiable'
  matchScore: number
  notes: string[]
  error?: string
}

const targets: Target[] = []
for (const ing of ingredients) {
  ing.products.forEach((p, i) => {
    let urlKind: Target['urlKind'] = 'other'
    if (p.url.includes('iherb.com/pr/')) urlKind = 'iherb-product'
    else if (p.url.includes('amazon.co.jp/s?')) urlKind = 'amazon-search'
    else if (p.url.includes('amazon.co.jp/')) urlKind = 'amazon-product'
    targets.push({
      ingredientSlug: ing.slug,
      ingredientNameJa: ing.nameJa,
      productIndex: i,
      name: p.name,
      brand: p.brand,
      platform: p.platform,
      url: p.url,
      urlKind,
    })
  })
}

const OUT_NDJSON = resolve(import.meta.dirname, 'scan_results.ndjson')
const OUT_TARGETS = resolve(import.meta.dirname, 'scan_targets.json')
writeFileSync(OUT_TARGETS, JSON.stringify(targets, null, 2))
if (existsSync(OUT_NDJSON)) unlinkSync(OUT_NDJSON)

console.log(`[extract] targets=${targets.length}`)
console.log(`[extract] targets.json: ${OUT_TARGETS}`)

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[\s\-–—_()[\]{}.,、。・／\/]+/g, '')
    .replace(/[０-９]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0xfee0))
    .replace(/[ａ-ｚＡ-Ｚ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
}

function scoreMatch(name: string, brand: string, title: string): number {
  const nt = normalize(title)
  if (!nt) return 0
  const tokens = normalize(`${brand} ${name}`).match(/.{1,3}/g) ?? []
  let hits = 0
  for (const t of tokens) if (t.length >= 2 && nt.includes(t)) hits++
  return tokens.length ? hits / tokens.length : 0
}

function extractTitle(html: string): string | null {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  if (!m) return null
  return m[1].replace(/\s+/g, ' ').trim()
}

function detectStock(html: string, urlKind: Target['urlKind']): ScanResult['stockState'] {
  const h = html.toLowerCase()
  if (urlKind === 'iherb-product') {
    if (/out of stock|在庫切れ|currently unavailable|"availability":\s*"out/i.test(html)) return 'out-of-stock'
    if (/add to cart|カートに追加|"availability":\s*"in/i.test(html)) return 'in-stock'
  }
  if (urlKind === 'amazon-product') {
    if (/currently unavailable|現在在庫切れ|在庫切れです|undeliverable/i.test(html)) return 'out-of-stock'
    if (/add to cart|カートに入れる|in stock|在庫あり|buy now|今すぐ買う/i.test(html)) return 'in-stock'
  }
  if (urlKind === 'amazon-search') {
    // search pages don't have a meaningful stock state
    return 'unknown'
  }
  return 'unknown'
}

async function scan(t: Target): Promise<ScanResult> {
  const res: ScanResult = {
    ...t,
    status: null,
    fetchedTitle: null,
    fetchedAt: new Date().toISOString(),
    stockState: 'unknown',
    nameMatch: 'unverifiable',
    matchScore: 0,
    notes: [],
  }
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 20000)
  try {
    const r = await fetch(t.url, {
      headers: {
        'user-agent': UA,
        'accept-language': 'ja,en;q=0.8',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      },
      redirect: 'follow',
      signal: controller.signal,
    })
    res.status = r.status
    if (r.status === 404) {
      res.stockState = 'not-found'
      res.nameMatch = 'mismatch'
      res.notes.push('404 Not Found')
      return res
    }
    if (!r.ok) {
      res.notes.push(`HTTP ${r.status}`)
      return res
    }
    const html = await r.text()
    const title = extractTitle(html)
    res.fetchedTitle = title
    res.stockState = detectStock(html, t.urlKind)
    if (/robot check|captcha|enter the characters you see/i.test(html.slice(0, 2000))) {
      res.notes.push('bot-challenge')
      res.nameMatch = 'unverifiable'
      return res
    }
    if (t.urlKind === 'amazon-search') {
      res.nameMatch = 'unverifiable'
      res.notes.push('search-url (skip name match)')
      return res
    }
    if (!title) {
      res.nameMatch = 'unverifiable'
      return res
    }
    const score = scoreMatch(t.name, t.brand, title)
    res.matchScore = Math.round(score * 100) / 100
    if (score >= 0.55) res.nameMatch = 'match'
    else if (score >= 0.3) res.nameMatch = 'partial'
    else res.nameMatch = 'mismatch'
  } catch (e: any) {
    res.error = e?.message ?? String(e)
    res.notes.push('fetch-error')
  } finally {
    clearTimeout(timer)
  }
  return res
}

async function runPool<T, R>(items: T[], fn: (t: T) => Promise<R>, concurrency: number): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let next = 0
  async function worker() {
    while (true) {
      const i = next++
      if (i >= items.length) return
      try {
        results[i] = await fn(items[i])
      } catch (e) {
        results[i] = { error: String(e) } as any
      }
    }
  }
  const workers = Array.from({ length: concurrency }, () => worker())
  await Promise.all(workers)
  return results
}

;(async () => {
  console.log(`[scan] starting ${targets.length} urls, concurrency=4`)
  let done = 0
  const withProgress = async (t: Target): Promise<ScanResult> => {
    const r = await scan(t)
    done++
    appendFileSync(OUT_NDJSON, JSON.stringify(r) + '\n')
    if (done % 10 === 0 || done === targets.length) {
      console.log(`[scan] ${done}/${targets.length}`)
    }
    return r
  }
  const all = await runPool(targets, withProgress, 4)
  const OUT = resolve(import.meta.dirname, 'scan_results.json')
  writeFileSync(OUT, JSON.stringify(all, null, 2))
  console.log(`[done] results: ${OUT}`)
  const summary = {
    total: all.length,
    match: all.filter((r) => r.nameMatch === 'match').length,
    partial: all.filter((r) => r.nameMatch === 'partial').length,
    mismatch: all.filter((r) => r.nameMatch === 'mismatch').length,
    unverifiable: all.filter((r) => r.nameMatch === 'unverifiable').length,
    outOfStock: all.filter((r) => r.stockState === 'out-of-stock').length,
    notFound: all.filter((r) => r.stockState === 'not-found').length,
    errors: all.filter((r) => r.error).length,
  }
  console.log('[summary]', summary)
})()
