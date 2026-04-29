/**
 * data.ts の imageUrl を高解像度版に書き換える。
 *
 * 変換規則：
 * - iHerb cloudinary: `/s/` → `/l/` (small→large) + `q_auto:eco` → `q_auto:good`
 * - Amazon: `_AC_SX[NNN]_` `_AC_SY[NNN]_` → `_SL1500_`（1500px・最大画質）
 *           `_AC_.jpg` → `_SL1500_.jpg`
 *
 * 使い方:
 *   npx tsx scripts/upgrade_image_resolution.ts            # apply
 *   npx tsx scripts/upgrade_image_resolution.ts --dry-run  # 変換前後をプレビュー
 */
import path from 'node:path'
import fs from 'node:fs'

const dryRun = process.argv.includes('--dry-run')
const dataPath = path.join(process.cwd(), 'src/lib/data.ts')

const original = fs.readFileSync(dataPath, 'utf8')

interface Replacement {
  before: string
  after: string
  source: 'iherb_cloudinary' | 'amazon'
}

const replacements: Replacement[] = []

// 1) iHerb cloudinary: /s/ → /l/, q_auto:eco → q_auto:good
const iherbRe = /(https:\/\/cloudinary\.images-iherb\.com\/image\/upload\/)([^']+?)('|")/g
const modifiedAfterIherb = original.replace(iherbRe, (full, prefix, body, quote) => {
  let next = body
  next = next.replace(/q_auto:eco/g, 'q_auto:good')
  // /XXX/<slug>/s/N.jpg → /XXX/<slug>/l/N.jpg
  next = next.replace(/\/s\/(\d+\.\w+)/g, '/l/$1')
  if (next !== body) {
    replacements.push({ before: prefix + body, after: prefix + next, source: 'iherb_cloudinary' })
  }
  return prefix + next + quote
})

// 2) Amazon: _AC_SX[NNN]_ / _AC_SY[NNN]_ / _AC_ → _SL1500_
const amazonRe = /(https:\/\/m\.media-amazon\.com\/images\/I\/[^']+?)('|")/g
const modified = modifiedAfterIherb.replace(amazonRe, (full, body, quote) => {
  let next = body
  next = next.replace(/_AC_SX\d+_/g, '_SL1500_')
  next = next.replace(/_AC_SY\d+_/g, '_SL1500_')
  next = next.replace(/_AC_\./g, '_SL1500_.')
  if (next !== body) {
    replacements.push({ before: body, after: next, source: 'amazon' })
  }
  return next + quote
})

console.log(`[upgrade] iherb replacements: ${replacements.filter(r => r.source === 'iherb_cloudinary').length}`)
console.log(`[upgrade] amazon replacements: ${replacements.filter(r => r.source === 'amazon').length}`)
console.log(`[upgrade] total: ${replacements.length}`)

if (replacements.length > 0) {
  console.log('\n[sample diffs]')
  for (const r of replacements.slice(0, 4)) {
    console.log(`  ${r.source}`)
    console.log(`    -- ${r.before.slice(0, 100)}`)
    console.log(`    ++ ${r.after.slice(0, 100)}`)
  }
}

if (dryRun) {
  console.log('\n[upgrade] dry-run: data.ts not modified')
  process.exit(0)
}

if (modified !== original) {
  fs.writeFileSync(dataPath, modified)
  console.log('\n[upgrade] data.ts updated')
} else {
  console.log('\n[upgrade] no changes')
}
