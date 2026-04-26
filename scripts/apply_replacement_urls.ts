/**
 * 商品管理シートの「差し替えURL希望」列(Z)を data.ts に反映
 * - W列(印)=🔄 差し替え かつ Z列(差し替えURL希望)に URL が入っている行を抽出
 * - data.ts 内の (slug, rank) で該当する Product を特定
 * - Product.url を新URLに置換
 * - 新URLから platform を自動判定（iherb.com / amazon.co.jp / amazon.com）
 *
 * dry-run（既定）: 差分を表示するだけで data.ts は書き換えない
 * apply: --apply フラグで実書き込み
 *
 * 実行:
 *   node --experimental-strip-types --no-warnings scripts/apply_replacement_urls.ts          # dry-run
 *   node --experimental-strip-types --no-warnings scripts/apply_replacement_urls.ts --apply  # 反映
 */
import { google } from 'googleapis'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { ingredients } from '../src/lib/data.ts'

function loadEnv() {
  const raw = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf-8')
  for (const line of raw.split('\n')) {
    const m = line.match(/^([A-Z_]+)=(.*)$/)
    if (m) process.env[m[1]] = m[2]
  }
}

type Replacement = {
  rowIndex: number // シート上の行番号（2始まり）
  slug: string
  ingredientName: string
  rank: number | null
  productName: string
  oldUrl: string
  newUrl: string
  oldPlatform: string
  newPlatform: string
  note: string
}

/** URL からプラットフォームを推定 */
function detectPlatform(url: string): string {
  const u = url.toLowerCase()
  if (u.includes('iherb.com') || u.includes('jp.iherb.com')) return 'iherb'
  if (u.includes('amazon.co.jp') || u.includes('amazon.com') || u.includes('amzn.')) return 'amazon'
  if (u.includes('rakuten.co.jp') || u.includes('rakuten.')) return 'rakuten'
  if (u.includes('cosme.net')) return 'cosme'
  if (u.includes('stylevana.')) return 'stylevana'
  return 'unknown'
}

/** URL を TypeScript 文字列リテラルに（シングルクオート優先） */
function toTsLiteral(url: string): string {
  if (!url.includes("'")) return `'${url}'`
  if (!url.includes('"')) return `"${url}"`
  return `'${url.replace(/'/g, "\\'")}'`
}

async function fetchSheetRows(): Promise<Replacement[]> {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.SHEETS_SERVICE_ACCOUNT_PATH!,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })
  const sheets = google.sheets({ version: 'v4', auth })

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.PRODUCTS_SHEET_ID!,
    range: 'product!A2:AA',
  })
  const rows = res.data.values ?? []

  const out: Replacement[] = []
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i]
    const mark = (r[22] ?? '').toString().trim()
    const newUrl = (r[25] ?? '').toString().trim()
    if (mark !== '🔄 差し替え') continue
    if (!newUrl) continue
    if (!/^https?:\/\//.test(newUrl)) {
      console.warn(`⚠️  行${i + 2}: URLが http(s) で始まっていません → スキップ: ${newUrl}`)
      continue
    }

    const slug = (r[0] ?? '').toString()
    const rankRaw = (r[5] ?? '').toString()
    const rank = rankRaw ? Number(rankRaw) : null

    const ing = ingredients.find(x => x.slug === slug)
    if (!ing) {
      console.warn(`⚠️  行${i + 2}: data.ts に slug=${slug} が見つかりません`)
      continue
    }

    // (slug, rank) で特定。rank 同値が複数ある or rank なしは「商品名一致」でフォールバック
    const candidates = rank != null
      ? ing.products.filter(p => p.rank === rank)
      : ing.products
    let target = candidates.length === 1
      ? candidates[0]
      : candidates.find(p => p.name === (r[6] ?? ''))
    if (!target) {
      console.warn(`⚠️  行${i + 2}: ${slug} で rank=${rank} 商品名=${r[6]} に一致なし`)
      continue
    }

    out.push({
      rowIndex: i + 2,
      slug,
      ingredientName: ing.nameJa,
      rank,
      productName: target.name,
      oldUrl: target.url,
      newUrl,
      oldPlatform: target.platform,
      newPlatform: detectPlatform(newUrl),
      note: (r[23] ?? '').toString(),
    })
  }
  return out
}

function applyToDataTs(replacements: Replacement[], apply: boolean): void {
  const dataPath = path.resolve(process.cwd(), 'src/lib/data.ts')
  let src = fs.readFileSync(dataPath, 'utf-8')
  const original = src

  const summary: { ok: number; skipped: number; warnings: string[] } = {
    ok: 0,
    skipped: 0,
    warnings: [],
  }

  for (const rep of replacements) {
    if (rep.oldUrl === rep.newUrl) {
      summary.warnings.push(`[${rep.slug}] 既に同URL → スキップ`)
      summary.skipped++
      continue
    }

    // 旧URL を含む行を検出（url: 'OLD' or url: "OLD"）
    const escOld = rep.oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const re = new RegExp(`(\\burl:\\s*)['"]${escOld}['"]`, 'g')
    const matches = src.match(re)
    if (!matches || matches.length === 0) {
      summary.warnings.push(`[${rep.slug}] 旧URLが data.ts に見つからない → スキップ: ${rep.oldUrl}`)
      summary.skipped++
      continue
    }
    if (matches.length > 1) {
      summary.warnings.push(`[${rep.slug}] 旧URLが${matches.length}箇所ある → 自動置換せずスキップ: ${rep.oldUrl}`)
      summary.skipped++
      continue
    }

    src = src.replace(re, `$1${toTsLiteral(rep.newUrl)}`)
    summary.ok++

    // platform の差分は警告のみ（自動更新しない）
    if (rep.oldPlatform !== rep.newPlatform && rep.newPlatform !== 'unknown') {
      summary.warnings.push(
        `[${rep.slug}] platform: ${rep.oldPlatform} → ${rep.newPlatform} に手動更新が必要（URLのみ書き換え済）`
      )
    }
  }

  console.log(`\n${'='.repeat(60)}`)
  console.log(`差し替え候補: ${replacements.length} 件`)
  console.log(`  反映: ${summary.ok} / スキップ: ${summary.skipped}`)
  console.log('='.repeat(60))

  for (const rep of replacements) {
    console.log(`\n[${rep.slug}] rank=${rep.rank ?? '-'} ${rep.productName}`)
    console.log(`  旧: ${rep.oldUrl}`)
    console.log(`  新: ${rep.newUrl}  (platform: ${rep.oldPlatform}${rep.oldPlatform !== rep.newPlatform ? ` → ${rep.newPlatform}` : ''})`)
    if (rep.note) console.log(`  メモ: ${rep.note}`)
  }

  if (summary.warnings.length > 0) {
    console.log(`\n⚠️  警告 (${summary.warnings.length}):`)
    for (const w of summary.warnings) console.log(`  - ${w}`)
  }

  if (apply && src !== original) {
    fs.writeFileSync(dataPath, src)
    console.log(`\n✅ data.ts を書き換えました（${summary.ok} URL）`)
    console.log(`   git diff src/lib/data.ts で確認してコミットしてください。`)
    console.log(`   反映後はシートを再Exportして印・差し替えURL列をクリアしてください。`)
  } else if (apply) {
    console.log(`\n（書き換え対象なし）`)
  } else {
    console.log(`\nℹ️  dry-run モード。実反映するには --apply を付けて再実行:`)
    console.log(`   node --experimental-strip-types --no-warnings scripts/apply_replacement_urls.ts --apply`)
  }
}

async function main() {
  loadEnv()
  const apply = process.argv.includes('--apply')
  const replacements = await fetchSheetRows()

  if (replacements.length === 0) {
    console.log('差し替え対象なし（W列=🔄 差し替え かつ Z列にURL記入の行が0件）')
    return
  }

  applyToDataTs(replacements, apply)
}

main().catch(e => {
  console.error('❌ エラー:', e.message)
  console.error(e.stack)
  process.exit(1)
})
