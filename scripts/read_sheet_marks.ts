/**
 * 商品管理シートから印（Y列）が付いている行を抽出
 */
import { google } from 'googleapis'
import * as fs from 'node:fs'
import * as path from 'node:path'

function loadEnv() {
  const raw = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf-8')
  for (const line of raw.split('\n')) {
    const m = line.match(/^([A-Z_]+)=(.*)$/)
    if (m) process.env[m[1]] = m[2]
  }
}
loadEnv()

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.SHEETS_SERVICE_ACCOUNT_PATH!,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
})
const sheets = google.sheets({ version: 'v4', auth })

const res = await sheets.spreadsheets.values.get({
  spreadsheetId: process.env.PRODUCTS_SHEET_ID!,
  range: 'product!A2:AC200',
})
const rows = res.data.values ?? []

console.log('=== 印あり行 ===')
let count = 0
for (const r of rows) {
  // A=0 slug, B=1 name, F=5 rank, G=6 商品名, J=9 URL, U=20 推奨度, V=21 帯, Y=24 印, Z=25 修正メモ, AB=27 最終更新, AC=28 差し替えURL希望
  const mark = r[24] ?? ''
  if (!mark) continue
  count++
  const slug = r[0] ?? ''
  const name = (r[6] ?? '').slice(0, 40)
  const url = r[9] ?? ''
  const score = r[20] ?? ''
  const band = r[21] ?? ''
  const memo = r[25] ?? ''
  const wishUrl = r[28] ?? ''
  console.log(`\n${mark}  ★${score} ${band}`)
  console.log(`  slug: ${slug}`)
  console.log(`  name: ${name}`)
  console.log(`  url:  ${url}`)
  if (memo) console.log(`  memo: ${memo}`)
  if (wishUrl) console.log(`  希望: ${wishUrl}`)
}
console.log(`\n合計: ${count} 行`)
