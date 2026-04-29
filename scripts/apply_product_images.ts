/**
 * tmp/product_images.json の取得結果を data.ts の products[].imageUrl へ反映する。
 *
 * 仕様：
 * - URL一致で imageUrl を追加・既存値は上書き禁止（破壊変更回避）
 * - 失敗（status != ok）はスキップ・コメントなどは付けない
 * - dry-run でサマリーのみ表示
 *
 * 使い方:
 *   npx tsx scripts/apply_product_images.ts            # apply
 *   npx tsx scripts/apply_product_images.ts --dry-run  # 反映前にサマリー
 */
import path from 'node:path'
import fs from 'node:fs'

const dryRun = process.argv.includes('--dry-run')
const dataPath = path.join(process.cwd(), 'src/lib/data.ts')
const imagesPath = path.join(process.cwd(), 'tmp/product_images.json')

interface FetchResult {
  ingredientSlug: string
  productName: string
  brand: string
  url: string
  platform: string
  imageUrl: string | null
  status: 'ok' | 'no_og_image' | 'http_error' | 'timeout' | 'blocked'
}

const fetchResults: Record<string, FetchResult> = JSON.parse(fs.readFileSync(imagesPath, 'utf8'))
const okResults = Object.values(fetchResults).filter(r => r.status === 'ok' && r.imageUrl)
console.log(`[apply] ok results: ${okResults.length} / ${Object.keys(fetchResults).length}`)

const data = fs.readFileSync(dataPath, 'utf8')
let modified = data
let appliedCount = 0
let skippedAlreadyHasImage = 0
let urlNotFound = 0

for (const r of okResults) {
  if (!r.imageUrl) continue
  // url を含む product object を探して、その object 内に imageUrl を追加。
  // url はユニーク前提（他成分の products と被らない）。
  // パターン：`url: '...特定URL...',\n` が含まれる product block を見つけ、
  // その後に imageUrl が無ければ url 行の直後に追加する。
  const escapedUrl = r.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/'/g, "\\'")
  const urlPattern = new RegExp(`(\\s*url:\\s*'${escapedUrl}',\\n)`, 'g')
  const match = urlPattern.exec(modified)
  if (!match) {
    urlNotFound++
    continue
  }
  // この url を含む product object 内に既に imageUrl があるかチェック
  // 簡易：url 行の前後 ±400 文字（1 product object 程度）を見て imageUrl: が含まれるか確認
  const ctxStart = Math.max(0, match.index - 400)
  const ctxEnd = Math.min(modified.length, match.index + match[0].length + 400)
  const ctx = modified.slice(ctxStart, ctxEnd)
  // この product object の境界を `{` ... `},\n` で限定して見るのが安全だが
  // ここは既存に imageUrl: の文字列があれば skip という簡易ロジックで対応
  if (/\bimageUrl:\s*'/.test(ctx.slice(Math.max(0, match.index - ctxStart - 200), match.index - ctxStart + match[0].length + 200))) {
    skippedAlreadyHasImage++
    continue
  }
  // url 行の直後に imageUrl 行を挿入（同じインデント）
  const indent = match[0].match(/^\s*/)?.[0] ?? '        '
  const insert = `${indent}imageUrl: '${r.imageUrl}',\n`
  modified = modified.slice(0, match.index + match[0].length) + insert + modified.slice(match.index + match[0].length)
  // 同じURLが複数回含まれる場合は1回目だけ反映（後続のexec はずらしたインデックスに影響）
  urlPattern.lastIndex = match.index + match[0].length + insert.length
  appliedCount++
}

console.log(`[apply] applied:                ${appliedCount}`)
console.log(`[apply] skipped (already has):  ${skippedAlreadyHasImage}`)
console.log(`[apply] url not found in data:  ${urlNotFound}`)

if (dryRun) {
  console.log('[apply] dry-run mode: data.ts not modified')
  process.exit(0)
}

if (appliedCount > 0) {
  fs.writeFileSync(dataPath, modified)
  console.log(`[apply] data.ts updated`)
} else {
  console.log('[apply] no changes')
}
