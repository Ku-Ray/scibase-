/**
 * Sランクサプリ 15商品の monthlyCostJpy 再計算 + unitsPerDay 投入。
 *
 * 算出根拠：
 *   - bottleCount: 容器内の錠数/粒数/g数（粉末は g）
 *   - unitsPerDay: 研究使用量を満たすために必要な1日量
 *   - daysPerBottle = bottleCount / unitsPerDay
 *   - monthsPerBottle = daysPerBottle / 30
 *   - monthlyCostJpy = round(priceJpy / monthsPerBottle, 10)
 */
import * as fs from 'node:fs'
import * as path from 'node:path'

const dataPath = path.resolve(__dirname, '../src/lib/data.ts')
let src = fs.readFileSync(dataPath, 'utf-8')

interface Fix {
  /** 商品を一意に識別する url */
  url: string
  unitsPerDay: number
  bottleCount: number
  /** 念のため：研究使用量・備考用 */
  note: string
}

const fixes: Fix[] = [
  // ashwagandha
  { url: 'https://www.iherb.com/pr/now-foods-ksm-66-ashwagandha-600-mg-90-veg-capsules/145913', unitsPerDay: 1, bottleCount: 90, note: '600mg×1' },
  { url: 'https://www.iherb.com/pr/jarrow-formulas-ashwagandha-300-mg-120-veggie-capsules/3302', unitsPerDay: 2, bottleCount: 120, note: '300mg×2=600mg' },
  // magnesium
  { url: 'https://www.iherb.com/pr/doctor-s-best-high-absorption-magnesium-lysinate-glycinate-chelated-albion-traacs-120-tablets-100-mg-per-tablet/15', unitsPerDay: 2, bottleCount: 120, note: '100mg×2=200mg' },
  { url: 'https://www.amazon.co.jp/dp/B000BD0RT0?tag=scibase-22', unitsPerDay: 2, bottleCount: 240, note: '100mg×2=200mg' },
  // vitamin-d
  { url: 'https://www.iherb.com/pr/now-foods-vitamin-d-3-high-potency-2-000-iu-240-softgels/16272', unitsPerDay: 1, bottleCount: 240, note: '2000IU×1' },
  { url: 'https://www.amazon.co.jp/dp/B079P427ZN?tag=scibase-22', unitsPerDay: 1, bottleCount: 240, note: '2000IU×1' },
  // omega3
  { url: 'https://www.iherb.com/pr/nordic-naturals-ultimate-omega-2x-lemon-120-soft-gels-1-075-mg-per-soft-gel/73701', unitsPerDay: 1, bottleCount: 120, note: '1075mg×1=1075mg EPA+DHA' },
  { url: 'https://www.iherb.com/pr/now-foods-ultra-omega-3-500-epa-250-dha-180-fish-softgels/96436', unitsPerDay: 2, bottleCount: 180, note: '750mg×2=1500mg' },
  { url: 'https://www.amazon.co.jp/dp/B002ZFUVJ8?tag=scibase-22', unitsPerDay: 2, bottleCount: 120, note: '600mg×2=1200mg' },
  // vitamin-c-oral
  { url: 'https://www.iherb.com/pr/now-foods-c-1000-with-bioflavonoids-250-veg-capsules/475', unitsPerDay: 1, bottleCount: 250, note: '1000mg×1' },
  // creatine
  { url: 'https://www.iherb.com/pr/now-foods-sports-creatine-monohydrate-2-2-lbs-1-kg/535', unitsPerDay: 1, bottleCount: 200, note: '5g×1=5g（200食分）' },
  { url: 'https://www.amazon.co.jp/dp/B086GGFNQ2?tag=scibase-22', unitsPerDay: 1, bottleCount: 200, note: '5g×1=5g（200食分）' },
  // melatonin
  { url: 'https://www.iherb.com/pr/now-foods-melatonin-1-mg-100-tablets/77389', unitsPerDay: 1, bottleCount: 100, note: '1mg×1' },
  // iron
  { url: 'https://jp.iherb.com/pr/now-foods-iron-36-mg-90-veg-capsules/54089', unitsPerDay: 1, bottleCount: 90, note: '36mg×1' },
  // folic-acid
  { url: 'https://jp.iherb.com/pr/california-gold-nutrition-methyl-folate-and-vitamin-c-120-veggie-capsules/96310', unitsPerDay: 1, bottleCount: 120, note: '400μg×1' },
]

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function findProductBlock(src: string, url: string): { start: number; end: number; text: string } | null {
  const urlEsc = escapeRegex(url)
  const urlRe = new RegExp(`url:\\s*'${urlEsc}'`)
  const m = urlRe.exec(src)
  if (!m) return null
  // walk back to find nearest "{" before
  let i = m.index
  while (i > 0 && src[i] !== '{') i--
  // walk forward to matching "}" at same depth
  let depth = 0
  let j = i
  while (j < src.length) {
    if (src[j] === '{') depth++
    else if (src[j] === '}') {
      depth--
      if (depth === 0) {
        return { start: i, end: j + 1, text: src.slice(i, j + 1) }
      }
    }
    j++
  }
  return null
}

let edits = 0
const log: string[] = []

for (const fix of fixes) {
  const block = findProductBlock(src, fix.url)
  if (!block) {
    log.push(`MISS: ${fix.url}`)
    continue
  }
  let text = block.text

  // priceJpy 抽出
  const priceMatch = text.match(/priceJpy:\s*(\d+)/)
  if (!priceMatch) {
    log.push(`NO_PRICE in block for ${fix.url}`)
    continue
  }
  const priceJpy = parseInt(priceMatch[1])
  const days = fix.bottleCount / fix.unitsPerDay
  const months = days / 30
  const monthly = Math.round(priceJpy / months / 10) * 10

  // monthlyCostJpy 上書き or 挿入
  if (/monthlyCostJpy:\s*\d+/.test(text)) {
    text = text.replace(/monthlyCostJpy:\s*\d+/, `monthlyCostJpy: ${monthly}`)
  } else {
    // form: の前に挿入
    text = text.replace(/(\s+)form:/, `$1monthlyCostJpy: ${monthly},$1form:`)
  }

  // unitsPerDay 上書き or 挿入
  if (/unitsPerDay:\s*\d+/.test(text)) {
    text = text.replace(/unitsPerDay:\s*\d+/, `unitsPerDay: ${fix.unitsPerDay}`)
  } else {
    // monthlyCostJpy: の直後に挿入
    text = text.replace(/(monthlyCostJpy:\s*\d+,)/, `$1\n        unitsPerDay: ${fix.unitsPerDay},`)
  }

  src = src.slice(0, block.start) + text + src.slice(block.end)
  edits++
  log.push(`OK ¥${priceJpy} ÷ ${months.toFixed(2)}mo = ¥${monthly}/月 (${fix.unitsPerDay}/日 × ${fix.bottleCount}容量) [${fix.note}]`)
}

fs.writeFileSync(dataPath, src, 'utf-8')
console.log(log.join('\n'))
console.log(`\n${edits}/${fixes.length} products updated.`)
