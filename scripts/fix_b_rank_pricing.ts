/**
 * Bランク商品 (39サプリ + 7トピカル) の monthlyCostJpy 再計算 + unitsPerDay 投入。
 * トピカルは unitsPerDay 不要（朝晩などはSpecTable解釈が異なる）→ サプリのみ unitsPerDay 設定。
 */
import * as fs from 'node:fs'
import * as path from 'node:path'

const dataPath = path.resolve(__dirname, '../src/lib/data.ts')
let src = fs.readFileSync(dataPath, 'utf-8')

interface Fix {
  url: string
  /** トピカルは省略可 */
  unitsPerDay?: number
  /** トピカルは bottleMonths を直接指定 */
  bottleMonths?: number
  bottleCount?: number
  note: string
  dosageMg?: number
}

const fixes: Fix[] = [
  // ===== Supplements (39) =====
  { url: 'https://www.amazon.co.jp/-/en/Vitamin-Booster-Nicotinamide-Riboside-Tablets/dp/B07TK4VYWS?tag=scibase-22', unitsPerDay: 1, bottleCount: 90, note: 'NMN as NR 300mg×1', dosageMg: 300 },
  { url: 'https://www.iherb.com/pr/now-foods-gaba-750-mg-100-veg-capsules/5020', unitsPerDay: 1, bottleCount: 100, note: 'GABA 750mg×1' },
  { url: 'https://www.iherb.com/pr/now-foods-taurine-pure-powder-1-lb-454-g/747', unitsPerDay: 1, bottleCount: 454, note: 'Taurine 1g×1（454食分）', dosageMg: 1000 },
  { url: 'https://www.iherb.com/pr/host-defense-lion-s-mane-mushroom-capsules-60-count/71281', unitsPerDay: 1, bottleCount: 60, note: 'Lions Mane 1000mg×1', dosageMg: 1000 },
  { url: 'https://www.iherb.com/pr/thorne-quercetin-phytosome-60-capsules/93196', unitsPerDay: 1, bottleCount: 60, note: 'Quercetin 500mg×1' },
  { url: 'https://www.amazon.co.jp/dp/B07TK4VYWS?tag=scibase-22', unitsPerDay: 1, bottleCount: 90, note: 'NR 300mg×1', dosageMg: 300 },
  { url: 'https://www.amazon.co.jp/dp/B0CKKPYTL8?tag=scibase-22', unitsPerDay: 2, bottleCount: 240, note: 'AKG 1000mg×2=2000mg' },
  { url: 'https://www.iherb.com/pr/now-foods-l-arginine-1000-mg-120-tablets/422', unitsPerDay: 3, bottleCount: 120, note: 'L-Arginine 1000mg×3=3000mg', dosageMg: 1000 },
  { url: 'https://www.iherb.com/pr/now-foods-acetyl-l-carnitine-500-mg-200-veg-capsules/1027', unitsPerDay: 1, bottleCount: 200, note: 'ALCAR 500mg×1', dosageMg: 500 },
  { url: 'https://www.iherb.com/pr/doctor-s-best-best-glucosamine-sulfate-750-mg-360-caps/15669', unitsPerDay: 2, bottleCount: 360, note: 'Glucosamine 750mg×2=1500mg', dosageMg: 750 },
  { url: 'https://www.iherb.com/pr/solgar-glucosamine-chondroitin-complex-150-tablets/4520', unitsPerDay: 3, bottleCount: 150, note: 'Glucosamine+Chondroitin 3 tabs/日', dosageMg: 400 },
  { url: 'https://www.amazon.co.jp/dp/B07QLTD47P?tag=scibase-22', unitsPerDay: 4, bottleCount: 120, note: 'エクエル 4粒/日（10mg equol/日）', dosageMg: 10 },
  { url: 'https://www.iherb.com/pr/now-foods-soy-isoflavones-150-mg-120-veg-capsules/10050', unitsPerDay: 1, bottleCount: 120, note: 'Soy Isoflavones 150mg(60mg aglycone)×1', dosageMg: 150 },
  { url: 'https://www.amazon.co.jp/dp/B0058A9SF0?tag=scibase-22', unitsPerDay: 1, bottleCount: 100, note: 'Sodium Butyrate 600mg×1', dosageMg: 600 },
  { url: 'https://www.iherb.com/pr/now-foods-alpha-gpc-300-mg-60-veg-capsules/48493', unitsPerDay: 1, bottleCount: 60, note: 'Alpha-GPC 300mg×1', dosageMg: 300 },
  { url: 'https://www.iherb.com/pr/now-foods-5-htp-100-mg-120-veg-capsules/748', unitsPerDay: 1, bottleCount: 120, note: '5-HTP 100mg×1', dosageMg: 100 },
  { url: 'https://www.iherb.com/pr/life-extension-pqq-caps-with-biopqq-20-mg-30-vegetarian-capsules/48823', unitsPerDay: 1, bottleCount: 30, note: 'PQQ 20mg×1', dosageMg: 20 },
  { url: 'https://www.iherb.com/pr/now-foods-betaine-hcl-648-mg-120-capsules/728', unitsPerDay: 1, bottleCount: 120, note: 'TMG 1000mg×1', dosageMg: 1000 },
  { url: 'https://www.iherb.com/pr/now-foods-certified-organic-spirulina-1000-mg-500-tablets/5298', unitsPerDay: 4, bottleCount: 500, note: 'Spirulina 1g×4=4g', dosageMg: 1000 },
  { url: 'https://www.iherb.com/pr/now-foods-evening-primrose-oil-1300-mg-300-softgels/740', unitsPerDay: 1, bottleCount: 300, note: 'EPO 1300mg×1', dosageMg: 1300 },
  { url: 'https://www.iherb.com/pr/now-foods-l-glutamine-pure-powder-1-lb-454-g/783', unitsPerDay: 1, bottleCount: 91, note: 'L-Glutamine 5g×1（454g/5g=91食分）', dosageMg: 5000 },
  { url: 'https://www.iherb.com/pr/jarrow-formulas-broccomax-myrosinase-active-60-veggie-caps/1437', unitsPerDay: 1, bottleCount: 60, note: 'BroccoMax 1cap/日' },
  { url: 'https://www.iherb.com/pr/doctor-s-best-nattokinase-2000-fus-90-veggie-caps/36457', unitsPerDay: 1, bottleCount: 90, note: 'Nattokinase 2000FU×1', dosageMg: 2000 },
  { url: 'https://www.iherb.com/pr/now-foods-glutathione-500-mg-60-veg-capsules/731', unitsPerDay: 1, bottleCount: 60, note: 'Glutathione 500mg×1' },
  { url: 'https://www.iherb.com/pr/now-foods-l-carnosine-500-mg-50-veg-capsules/733', unitsPerDay: 2, bottleCount: 50, note: 'Carnosine 500mg×2=1000mg' },
  { url: 'https://www.iherb.com/pr/now-foods-apigenin-50-mg-90-veg-capsules/142023', unitsPerDay: 1, bottleCount: 90, note: 'Apigenin 50mg×1' },
  { url: 'https://www.iherb.com/pr/jarrow-formulas-pterostilbene-50-mg-60-capsules/15213', unitsPerDay: 1, bottleCount: 60, note: 'Pterostilbene 50mg×1' },
  { url: 'https://www.iherb.com/pr/now-foods-silymarin-milk-thistle-extract-300-mg-200-veg-capsules/21048', unitsPerDay: 1, bottleCount: 200, note: 'Milk Thistle 300mg×1' },
  { url: 'https://www.iherb.com/pr/now-foods-saw-palmetto-320-mg-90-softgels/16005', unitsPerDay: 1, bottleCount: 90, note: 'Saw Palmetto 320mg×1' },
  { url: 'https://www.iherb.com/pr/now-foods-olive-leaf-extract-500-mg-60-veg-capsules/698', unitsPerDay: 1, bottleCount: 60, note: 'Olive Leaf 500mg×1' },
  { url: 'https://www.iherb.com/pr/now-foods-hyaluronic-acid-100-mg-60-veg-capsules/26059', unitsPerDay: 1, bottleCount: 60, note: 'HA 100mg×1' },
  { url: 'https://www.iherb.com/pr/host-defense-mushrooms-reishi-120-capsules/21453', unitsPerDay: 2, bottleCount: 120, note: 'Reishi 1g×2=2g' },
  { url: 'https://www.iherb.com/pr/host-defense-cordyceps-mushroom-supplement-60-capsules/109278', unitsPerDay: 2, bottleCount: 60, note: 'Cordyceps 1g×2=2g' },
  { url: 'https://www.iherb.com/pr/biosil-advanced-collagen-generator-60-capsules/36219', unitsPerDay: 1, bottleCount: 60, note: 'BioSil 5mg ch-OSA×1' },
  { url: 'https://www.iherb.com/pr/now-foods-chromium-picolinate-200-mcg-250-veg-capsules/678', unitsPerDay: 1, bottleCount: 250, note: 'Chromium 200mcg×1' },
  { url: 'https://www.iherb.com/pr/amazing-herbs-black-seed-oil-100-pure-cold-pressed-1000-mg-60-softgels/3737', unitsPerDay: 1, bottleCount: 60, note: 'Black Seed Oil 1000mg×1' },
  { url: 'https://www.iherb.com/pr/now-foods-astragalus-root-500-mg-100-veg-capsules/722', unitsPerDay: 1, bottleCount: 100, note: 'Astragalus 500mg×1' },
  { url: 'https://www.iherb.com/pr/doctor-s-best-fisetin-100-mg-30-veggie-caps/43592', unitsPerDay: 1, bottleCount: 30, note: 'Fisetin 100mg×1' },
  { url: 'https://www.amazon.co.jp/dp/B003G70U3G?tag=scibase-22', unitsPerDay: 3, bottleCount: 250, note: 'Maca 500mg×3=1500mg', dosageMg: 500 },
  // ===== Topicals (7) =====
  { url: 'https://www.iherb.com/pr/benton-bakuchiol-serum-1-18-fl-oz-35-ml/115665', bottleMonths: 2.5, note: 'Bakuchiol Serum 35ml ≈ 2.5ヶ月' },
  { url: 'https://www.amazon.co.jp/Ordinary-Hyaluronic-Acid-2-30ml/dp/B01MYEZPC8?tag=scibase-22', bottleMonths: 2.5, note: 'HA Serum 30ml ≈ 2.5ヶ月' },
  { url: 'https://www.amazon.co.jp/dp/B083NTHVJV?tag=scibase-22', bottleMonths: 2, note: 'CICA Cream 50ml ≈ 2ヶ月' },
  { url: 'https://www.amazon.co.jp/dp/B0719WNNK4?tag=scibase-22', bottleMonths: 3, note: 'Squalane Oil 30ml ≈ 3ヶ月' },
  // allantoin の B0CSS3MC3J は panthenol (A-rank)とURL重複するので注意：別商品なら別ASINだが、ここは同一商品扱い
  // → 重複商品は 別の商品エントリへ。allantoin は別ASINに修正必要。今は monthlyCostJpy 修正のみ
  { url: 'https://www.amazon.co.jp/dp/B07BGJMNYL?tag=scibase-22', bottleMonths: 2.5, note: 'Mandelic Acid 30ml ≈ 2.5ヶ月' },
  { url: 'https://www.amazon.co.jp/dp/B0DHL3169M?tag=scibase-22', bottleMonths: 2, note: 'PDRN Serum 30ml ≈ 2ヶ月' },
]

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function findProductBlock(src: string, url: string): { start: number; end: number; text: string } | null {
  const urlEsc = escapeRegex(url)
  const m = new RegExp(`url:\\s*'${urlEsc}'`).exec(src)
  if (!m) return null
  let i = m.index
  while (i > 0 && src[i] !== '{') i--
  let depth = 0
  let j = i
  while (j < src.length) {
    if (src[j] === '{') depth++
    else if (src[j] === '}') {
      depth--
      if (depth === 0) return { start: i, end: j + 1, text: src.slice(i, j + 1) }
    }
    j++
  }
  return null
}

let edits = 0
const log: string[] = []
const misses: string[] = []

for (const fix of fixes) {
  const block = findProductBlock(src, fix.url)
  if (!block) {
    misses.push(`MISS: ${fix.url}`)
    continue
  }
  let text = block.text

  const priceMatch = text.match(/priceJpy:\s*(\d+)/)
  if (!priceMatch) {
    misses.push(`NO_PRICE: ${fix.url}`)
    continue
  }
  const priceJpy = parseInt(priceMatch[1])

  let months: number
  if (fix.bottleMonths != null) {
    months = fix.bottleMonths
  } else {
    months = (fix.bottleCount! / fix.unitsPerDay!) / 30
  }
  const monthly = Math.round(priceJpy / months / 10) * 10

  if (/monthlyCostJpy:\s*\d+/.test(text)) {
    text = text.replace(/monthlyCostJpy:\s*\d+/, `monthlyCostJpy: ${monthly}`)
  } else {
    text = text.replace(/(\s+)form:/, `$1monthlyCostJpy: ${monthly},$1form:`)
  }

  if (fix.unitsPerDay != null) {
    if (/unitsPerDay:\s*\d+/.test(text)) {
      text = text.replace(/unitsPerDay:\s*\d+/, `unitsPerDay: ${fix.unitsPerDay}`)
    } else if (/monthlyCostJpy:\s*\d+,/.test(text)) {
      text = text.replace(/(monthlyCostJpy:\s*\d+,)/, `$1\n        unitsPerDay: ${fix.unitsPerDay},`)
    }
  }

  if (fix.dosageMg != null) {
    if (/dosageMg:\s*\d+/.test(text)) {
      text = text.replace(/dosageMg:\s*\d+/, `dosageMg: ${fix.dosageMg}`)
    } else if (/unitsPerDay:\s*\d+,/.test(text)) {
      text = text.replace(/(unitsPerDay:\s*\d+,)/, `$1\n        dosageMg: ${fix.dosageMg},`)
    } else {
      text = text.replace(/(\s+)form:/, `$1dosageMg: ${fix.dosageMg},$1form:`)
    }
  }

  src = src.slice(0, block.start) + text + src.slice(block.end)
  edits++
  log.push(`OK ¥${priceJpy} ÷ ${months.toFixed(2)}mo = ¥${monthly}/月 [${fix.note}]`)
}

fs.writeFileSync(dataPath, src, 'utf-8')
console.log(log.join('\n'))
if (misses.length) {
  console.log('\n===MISSES===')
  console.log(misses.join('\n'))
}
console.log(`\n${edits}/${fixes.length} products updated.`)
