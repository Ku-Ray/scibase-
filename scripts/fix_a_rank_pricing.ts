/**
 * Aランクサプリ全商品の monthlyCostJpy 再計算 + unitsPerDay 投入。
 * Sランク fix_supp_pricing.ts と同じロジック（priceJpy ÷ months）。
 *
 * 未対応: alpha-lipoic-acid（Amazon B0013OX7XY）は bottle count 推定値を使用。
 */
import * as fs from 'node:fs'
import * as path from 'node:path'

const dataPath = path.resolve(__dirname, '../src/lib/data.ts')
let src = fs.readFileSync(dataPath, 'utf-8')

interface Fix {
  url: string
  unitsPerDay: number
  bottleCount: number
  /** 任意：研究使用量・備考 */
  note: string
  /** 任意：dosageMg を上書き設定（NULL の商品向け） */
  dosageMg?: number
}

const fixes: Fix[] = [
  // collagen-peptide
  { url: 'https://www.amazon.co.jp/dp/B01M04S6JO?tag=scibase-22', unitsPerDay: 1, bottleCount: 34, note: '10g×1=10g（340g/10g=34食分）' },
  // coq10
  { url: 'https://www.iherb.com/pr/jarrow-formulas-ubiquinol-qh-absorb-max-absorption-200-mg-60-softgels/36528', unitsPerDay: 1, bottleCount: 60, note: '200mg×1' },
  // probiotics
  { url: 'https://www.iherb.com/pr/garden-of-life-dr-formulated-probiotics-once-daily-30-vegetarian-capsules/64433', unitsPerDay: 1, bottleCount: 30, note: '30B CFU×1' },
  // zinc
  { url: 'https://www.iherb.com/pr/thorne-zinc-picolinate-30-mg-180-capsules/18460', unitsPerDay: 1, bottleCount: 180, note: '30mg×1' },
  // l-theanine
  { url: 'https://www.iherb.com/pr/now-foods-double-strength-l-theanine-200-mg-120-veg-capsules/54096', unitsPerDay: 1, bottleCount: 120, note: '200mg×1' },
  // glycine #1 caps
  { url: 'https://www.iherb.com/pr/now-foods-glycine-1-000-mg-100-veg-capsules/18106', unitsPerDay: 3, bottleCount: 100, note: '1000mg×3=3000mg（睡眠RCT用量）' },
  // glycine #2 powder
  { url: 'https://www.amazon.co.jp/dp/B0013OVZJW?tag=scibase-22', unitsPerDay: 1, bottleCount: 151, note: '3g×1=3g（454g/3g=151食分）', dosageMg: 3000 },
  // astaxanthin #1
  { url: 'https://jp.iherb.com/pr/california-gold-nutrition-astaxanthin-astalif-pure-icelandic-12-mg-120-veggie-softgels/71684', unitsPerDay: 1, bottleCount: 120, note: '12mg×1' },
  // astaxanthin #2 (60日分)
  { url: 'https://www.amazon.co.jp/dp/B0C3ZXTC38?tag=scibase-22', unitsPerDay: 1, bottleCount: 60, note: '10mg×1（60日分）' },
  // curcumin
  { url: 'https://www.iherb.com/pr/doctor-s-best-curcumin-c3-complex-with-bioperine-1000-mg-120-tablets/15844', unitsPerDay: 1, bottleCount: 120, note: '1000mg×1' },
  // berberine
  { url: 'https://www.iherb.com/pr/thorne-berberine-60-capsules/67318', unitsPerDay: 2, bottleCount: 60, note: '500mg×2=1000mg（分割摂取）' },
  // egcg
  { url: 'https://www.iherb.com/pr/life-extension-mega-green-tea-extract-725-mg-decaffeinated-100-vegetarian-capsules/14099', unitsPerDay: 1, bottleCount: 100, note: '725mg EGCG×1' },
  // phosphatidylserine
  { url: 'https://jp.iherb.com/pr/now-foods-phosphatidyl-serine-120-veg-capsules/745', unitsPerDay: 1, bottleCount: 120, note: '100mg×1' },
  // ginkgo-biloba
  { url: 'https://www.iherb.com/pr/life-extension-ginkgo-biloba-certified-extract-120-mg-365-vegetarian-capsules/62310', unitsPerDay: 1, bottleCount: 365, note: '120mg×1' },
  // vitamin-k2
  { url: 'https://www.iherb.com/pr/now-foods-mk-7-vitamin-k-2-extra-strength-300-mcg-60-veg-capsules/100203', unitsPerDay: 1, bottleCount: 60, note: '300mcg×1' },
  // selenium
  { url: 'https://www.iherb.com/pr/jarrow-formulas-selenium-200-mcg-90-capsules/1155', unitsPerDay: 1, bottleCount: 90, note: '200mcg×1' },
  // lutein
  { url: 'https://www.iherb.com/pr/life-extension-lutein-plus-20-mg-60-softgels/87041', unitsPerDay: 1, bottleCount: 60, note: '20mg×1' },
  // calcium
  { url: 'https://www.iherb.com/pr/solgar-calcium-citrate-with-vitamin-d3-240-tablets/4467', unitsPerDay: 2, bottleCount: 240, note: '250mg×2=500mg（標準用量下限）', dosageMg: 250 },
  // vitamin-b12
  { url: 'https://www.iherb.com/pr/jarrow-formulas-methyl-b-12-1000-mcg-100-lozenges/4212', unitsPerDay: 1, bottleCount: 100, note: '1000mcg×1', dosageMg: 1 },
  // vitamin-b6
  { url: 'https://www.iherb.com/pr/thorne-pyridoxal-5-phosphate-180-capsules/18472', unitsPerDay: 1, bottleCount: 180, note: '50mg P-5-P×1', dosageMg: 50 },
  // l-citrulline
  { url: 'https://www.iherb.com/pr/now-foods-l-citrulline-pure-powder-4-oz-113-g/12227', unitsPerDay: 1, bottleCount: 37, note: '3g×1（113g/3g=37食分）', dosageMg: 3000 },
  // inulin
  { url: 'https://www.iherb.com/pr/now-foods-inulin-pure-powder-227-g/659', unitsPerDay: 1, bottleCount: 45, note: '5g×1（227g/5g=45食分）', dosageMg: 5000 },
  // bacopa-monnieri
  { url: 'https://www.iherb.com/pr/now-foods-bacopa-extract-450-mg-90-veg-capsules/64543', unitsPerDay: 1, bottleCount: 90, note: '450mg×1', dosageMg: 450 },
  // panax-ginseng
  { url: 'https://www.iherb.com/pr/solgar-panax-ginseng-root-extract-250-mg-60-veggie-caps/4559', unitsPerDay: 1, bottleCount: 60, note: '250mg×1', dosageMg: 250 },
  // niacin
  { url: 'https://www.iherb.com/pr/now-foods-niacin-flush-free-500-mg-180-veg-capsules/656', unitsPerDay: 1, bottleCount: 180, note: '500mg×1', dosageMg: 500 },
  // magnesium-glycinate (already 833 — re-confirm)
  { url: 'https://jp.iherb.com/pr/now-foods-magnesium-glycinate-180-tablets-100-mg-per-tablet/88819', unitsPerDay: 2, bottleCount: 180, note: '100mg×2=200mg' },
  // hmb
  { url: 'https://www.iherb.com/pr/now-foods-hmb-500-mg-120-veg-capsules/759', unitsPerDay: 3, bottleCount: 120, note: '500mg×3=1500mg（分割摂取）' },
  // myo-inositol
  { url: 'https://www.iherb.com/pr/jarrow-formulas-inositol-powder-600-g/1443', unitsPerDay: 1, bottleCount: 150, note: '4g×1（600g/4g=150食分）', dosageMg: 4000 },
  // zeaxanthin
  { url: 'https://www.iherb.com/pr/jarrow-formulas-lutein-20-mg-90-softgels/1447', unitsPerDay: 1, bottleCount: 90, note: '20mg lut + 1mg zeax×1', dosageMg: 1 },
  // beta-glucan
  { url: 'https://www.iherb.com/pr/now-foods-beta-glucan-with-igg-250-mg-60-veg-capsules/44226', unitsPerDay: 1, bottleCount: 60, note: '250mg×1' },
  // nac
  { url: 'https://www.iherb.com/pr/now-foods-nac-n-acetyl-cysteine-600-mg-250-veg-capsules/780', unitsPerDay: 1, bottleCount: 250, note: '600mg×1' },
  // l-tryptophan
  { url: 'https://jp.iherb.com/pr/now-foods-l-tryptophan-500-mg-120-veg-capsules/13859', unitsPerDay: 1, bottleCount: 120, note: '500mg×1' },
  // boswellia
  { url: 'https://www.iherb.com/pr/now-foods-boswellia-extract-500-mg-90-softgels/57586', unitsPerDay: 1, bottleCount: 90, note: '500mg×1' },
  // l-carnitine
  { url: 'https://www.iherb.com/pr/now-foods-l-carnitine-500-mg-60-veg-capsules/770', unitsPerDay: 1, bottleCount: 60, note: '500mg×1' },
  // collagen-type-ii
  { url: 'https://www.iherb.com/pr/now-foods-uc-ii-joint-health-undenatured-type-ii-collagen-40-mg-120-veg-capsules/46571', unitsPerDay: 1, bottleCount: 120, note: '40mg UC-II×1' },
  // alpha-lipoic-acid (Amazon B0013OX7XY、bottle count = 60 推定)
  { url: 'https://www.amazon.co.jp/dp/B0013OX7XY?tag=scibase-22', unitsPerDay: 1, bottleCount: 60, note: '300mg×1（60caps推定）', dosageMg: 300 },
  // ceramide-oral
  { url: 'https://www.iherb.com/pr/swanson-phytoceramides-advanced-formula-30-mg-30-veggie-caps/118634', unitsPerDay: 1, bottleCount: 30, note: '30mg×1' },
  // bioperine
  { url: 'https://www.iherb.com/pr/naturesplus-bioperine-10-90-capsules-10-mg-per-capsule/79230', unitsPerDay: 1, bottleCount: 90, note: '10mg×1' },
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
  const days = fix.bottleCount / fix.unitsPerDay
  const months = days / 30
  const monthly = Math.round(priceJpy / months / 10) * 10

  // monthlyCostJpy
  if (/monthlyCostJpy:\s*\d+/.test(text)) {
    text = text.replace(/monthlyCostJpy:\s*\d+/, `monthlyCostJpy: ${monthly}`)
  } else {
    text = text.replace(/(\s+)form:/, `$1monthlyCostJpy: ${monthly},$1form:`)
  }

  // unitsPerDay
  if (/unitsPerDay:\s*\d+/.test(text)) {
    text = text.replace(/unitsPerDay:\s*\d+/, `unitsPerDay: ${fix.unitsPerDay}`)
  } else if (/monthlyCostJpy:\s*\d+,/.test(text)) {
    text = text.replace(/(monthlyCostJpy:\s*\d+,)/, `$1\n        unitsPerDay: ${fix.unitsPerDay},`)
  }

  // dosageMg (if specified to add/overwrite)
  if (fix.dosageMg != null) {
    if (/dosageMg:\s*\d+/.test(text)) {
      text = text.replace(/dosageMg:\s*\d+/, `dosageMg: ${fix.dosageMg}`)
    } else {
      text = text.replace(/(unitsPerDay:\s*\d+,)/, `$1\n        dosageMg: ${fix.dosageMg},`)
    }
  }

  src = src.slice(0, block.start) + text + src.slice(block.end)
  edits++
  log.push(`OK ¥${priceJpy} ÷ ${months.toFixed(2)}mo = ¥${monthly}/月 (${fix.unitsPerDay}/日 × ${fix.bottleCount}容量) [${fix.note}]`)
}

fs.writeFileSync(dataPath, src, 'utf-8')
console.log(log.join('\n'))
if (misses.length) {
  console.log('\n===MISSES===')
  console.log(misses.join('\n'))
}
console.log(`\n${edits}/${fixes.length} products updated.`)
