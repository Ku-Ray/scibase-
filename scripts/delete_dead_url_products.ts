/**
 * tmp/product_images.json で HTTP 404/410 を返した商品を data.ts から削除
 * URL が死んでいる = 商品が存在しない、というユーザー方針に基づく
 */
import * as fs from 'node:fs'
import * as path from 'node:path'

const DATA_PATH = path.resolve('/Users/raykudo/agescience/src/lib/data.ts')
const IMAGES_JSON = path.resolve('/Users/raykudo/agescience/tmp/product_images.json')

interface FetchResult {
  ingredientSlug: string
  productName: string
  brand: string
  url: string
  platform: string
  imageUrl: string | null
  status: 'ok' | 'no_og_image' | 'http_error' | 'timeout' | 'blocked'
  error?: string
}

const fetchResults: Record<string, FetchResult> = JSON.parse(fs.readFileSync(IMAGES_JSON, 'utf8'))
const deadUrls = Object.values(fetchResults)
  .filter(r => r.status === 'http_error' && (r.error?.includes('410') || r.error?.includes('404')))
  .map(r => r.url)

console.log(`HTTP 404/410 で死んでいる URL: ${deadUrls.length} 件`)

let src = fs.readFileSync(DATA_PATH, 'utf-8')
let deleted = 0
const failed: string[] = []

for (const url of deadUrls) {
  // URL を含む product object を探す
  const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/'/g, "\\'")
  const urlPattern = new RegExp(`url:\\s*['"]${escapedUrl}['"]`)
  const match = src.match(urlPattern)
  if (!match) {
    failed.push(url)
    continue
  }
  const urlIdx = match.index!

  // 後方に走査して最も近い '{' (商品オブジェクト開始)
  let openIdx = -1
  for (let i = urlIdx - 1; i >= 0; i--) {
    if (src[i] === '{') {
      let j = i - 1
      while (j >= 0 && /\s/.test(src[j])) j--
      if (src[j] === '[' || src[j] === ',') {
        openIdx = i
        break
      }
    }
  }
  if (openIdx === -1) {
    failed.push(url)
    continue
  }

  // 行頭まで戻す
  let lineStart = openIdx
  while (lineStart > 0 && src[lineStart - 1] !== '\n') lineStart--

  // {} 対応で終端を探す
  let depth = 0
  let endIdx = -1
  let inString = false
  let stringChar = ''
  let escaped = false
  for (let i = openIdx; i < src.length; i++) {
    const ch = src[i]
    if (escaped) { escaped = false; continue }
    if (ch === '\\') { escaped = true; continue }
    if (inString) { if (ch === stringChar) inString = false; continue }
    if (ch === '"' || ch === "'" || ch === '`') { inString = true; stringChar = ch; continue }
    if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) { endIdx = i + 1; break }
    }
  }
  if (endIdx === -1) { failed.push(url); continue }

  // 末尾のカンマ・改行も含めて消す
  let after = endIdx
  while (after < src.length && (src[after] === ',' || src[after] === '\n' || src[after] === ' ')) {
    after++
    if (src[after - 1] === '\n') break
  }

  src = src.slice(0, lineStart) + src.slice(after)
  deleted++
  console.log(`✓ ${url.slice(0, 80)}`)
}

fs.writeFileSync(DATA_PATH, src, 'utf-8')
console.log(`\n削除: ${deleted} / ${deadUrls.length}`)
if (failed.length > 0) {
  console.log(`失敗: ${failed.length}`)
  for (const u of failed) console.log(`  - ${u}`)
}
