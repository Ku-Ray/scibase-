/**
 * B rank 残り（B2+B3+残）+ C rank biotin にiHerb商品を一括追加
 */
import * as fs from 'node:fs'

const DATA_PATH = '/Users/raykudo/agescience/src/lib/data.ts'

interface ProductSpec {
  slug: string
  product: string
}

const SPECS: ProductSpec[] = [
  // urolithin-a (oral, dosageMin 500mg)
  {
    slug: 'urolithin-a',
    product: `      {
        name: 'Neurogan Health Urolithin A 700 mg 60 Capsules',
        brand: 'Neurogan Health',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/neurogan-health-urolithin-a-700-mg-60-capsules-1-4-oz-42-g/150799',
        priceJpy: 8200,
        dosageMg: 700,
        unitsPerDay: 1,
        rank: 1,
        reasonJa: 'Urolithin A 700mg・dosageMaxを超える高用量。マイトファジー研究使用量で60粒で約2ヶ月分',
        highlight: 'Urolithin A 700mg',
        monthlyCostJpy: 4100,
        form: 'カプセル',
        thirdPartyTested: true,
        certifications: ['GMP', 'NonGMO'],
      },`,
  },
  // pqq (oral, dosageMin 10mg)
  {
    slug: 'pqq',
    product: `      {
        name: 'Life Extension PQQ 20 mg 30 Vegetarian Capsules',
        brand: 'Life Extension',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/life-extension-pqq-20-mg-30-vegetarian-capsules/44142',
        priceJpy: 4200,
        dosageMg: 20,
        unitsPerDay: 1,
        rank: 1,
        reasonJa: 'PQQ 20mg・dosageMax相当の高用量。ミトコンドリア生合成促進RCT濃度。Life Extension長寿研究系のエビデンス重視',
        highlight: 'PQQ 20mg・ミトコンドリア',
        monthlyCostJpy: 4200,
        form: 'ベジカプセル',
        thirdPartyTested: true,
        certifications: ['GMP', 'NonGMO'],
      },`,
  },
  // tmg (oral, dosageMin 1000mg)
  {
    slug: 'tmg',
    product: `      {
        name: 'NOW Foods TMG 1,000 mg 100 Tablets',
        brand: 'NOW Foods',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/now-foods-tmg-1-000-mg-100-tablets/3344',
        priceJpy: 1800,
        dosageMg: 1000,
        unitsPerDay: 1,
        rank: 1,
        reasonJa: 'TMG（ベタイン）1000mg・dosageMin相当。ホモシステイン値を低下させるメチル化サポート・100粒で約3ヶ月分',
        highlight: 'TMG 1000mg・メチル化',
        monthlyCostJpy: 600,
        form: '錠剤',
        thirdPartyTested: true,
        certifications: ['GMP', 'NonGMO'],
      },`,
  },
  // evening-primrose-oil (oral, dosageMin 1000mg)
  {
    slug: 'evening-primrose-oil',
    product: `      {
        name: 'NOW Foods Super Primrose Evening Primrose Oil 1,300 mg 120 Softgels',
        brand: 'NOW Foods',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/now-foods-super-primrose-evening-primrose-oil-1300-mg-120-softgels/851',
        priceJpy: 2400,
        dosageMg: 1300,
        unitsPerDay: 1,
        rank: 1,
        reasonJa: '月見草オイル1300mg・GLA（ガンマリノレン酸）9%含有・dosageMin超え。120粒で約4ヶ月分のコスパ',
        highlight: 'GLA 9%含有・1300mg',
        monthlyCostJpy: 600,
        form: 'ソフトジェル',
        thirdPartyTested: true,
        certifications: ['GMP'],
      },`,
  },
  // sulforaphane (oral, dosageMin 30mg)
  {
    slug: 'sulforaphane',
    product: `      {
        name: 'Jarrow Formulas Vegan BroccoMax 17.5 mg SGS 60 Veggie Capsules',
        brand: 'Jarrow Formulas',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/jarrow-formulas-vegan-broccomax-60-veggie-capsules-17-50-mg-per-capsule/4297',
        priceJpy: 3200,
        dosageMg: 35,
        unitsPerDay: 2,
        rank: 1,
        reasonJa: 'BroccoMax SGS 17.5mg×2粒 = 35mg（ミロシナーゼ酵素活性化）・dosageMin相当。Phase 2解毒酵素誘導RCT処方',
        highlight: 'BroccoMax・ミロシナーゼ活性',
        monthlyCostJpy: 2100,
        form: 'ベジカプセル',
        thirdPartyTested: true,
        certifications: ['GMP', 'NonGMO'],
      },`,
  },
  // hyaluronic-acid-oral (oral, dosageMin 80mg)
  {
    slug: 'hyaluronic-acid-oral',
    product: `      {
        name: 'NOW Foods Hyaluronic Acid Double Strength 100 mg 120 Veg Capsules',
        brand: 'NOW Foods',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/now-foods-hyaluronic-acid-double-strength-100-mg-120-veg-capsules/39935',
        priceJpy: 3800,
        dosageMg: 100,
        unitsPerDay: 1,
        rank: 1,
        reasonJa: 'ヒアルロン酸100mg + L-プロリン + α-リポ酸 + ぶどう種子エキスの複合処方・dosageMin超え。120粒で約4ヶ月分',
        highlight: 'HA + プロリン + ALA複合',
        monthlyCostJpy: 950,
        form: 'ベジカプセル',
        thirdPartyTested: true,
        certifications: ['GMP', 'NonGMO'],
      },`,
  },
  // cordyceps (oral, dosageMin 1000mg)
  {
    slug: 'cordyceps',
    product: `      {
        name: 'Host Defense Mushrooms Cordyceps 60 Capsules',
        brand: 'Host Defense',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/host-defense-mushrooms-cordyceps-60-capsules-0-5-g-per-capsule/71182',
        priceJpy: 5000,
        dosageMg: 1000,
        unitsPerDay: 2,
        rank: 1,
        reasonJa: '冬虫夏草菌糸体500mg×2粒 = 1000mg・dosageMin相当。Paul Stamets博士創設のFungi Perfecti社製・USDA Organic',
        highlight: 'USDA Organic・Stamets処方',
        monthlyCostJpy: 5000,
        form: 'カプセル',
        thirdPartyTested: true,
        certifications: ['Organic', 'NonGMO', 'GMP'],
      },`,
  },
  // silica (oral, dosageMin 10mg)
  {
    slug: 'silica',
    product: `      {
        name: 'NOW Foods Solutions Bamboo Silica Beauty 380 mg 90 Veg Capsules',
        brand: 'NOW Foods',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/now-foods-solutions-bamboo-silica-beauty-90-veg-capsules/95364',
        priceJpy: 2800,
        dosageMg: 30,
        unitsPerDay: 2,
        rank: 1,
        reasonJa: '竹由来シリカ380mg×2粒（ケイ素元素換算で約30mg）・dosageMax相当。植物性シリカで肌・髪・爪サポート',
        highlight: '竹由来・植物性シリカ',
        monthlyCostJpy: 1850,
        form: 'ベジカプセル',
        thirdPartyTested: true,
        certifications: ['GMP', 'NonGMO'],
      },`,
  },
  // chromium (oral, dosageMin 200mcg)
  {
    slug: 'chromium',
    product: `      {
        name: 'NOW Foods Chromium Picolinate 200 mcg 250 Veg Capsules',
        brand: 'NOW Foods',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/now-foods-chromium-picolinate-200-mcg-250-veg-capsules/508',
        priceJpy: 1800,
        dosageMg: 200,
        unitsPerDay: 1,
        rank: 1,
        reasonJa: 'クロムピコリン酸塩200μg・dosageMin相当。血糖コントロールRCT濃度・250粒で約8ヶ月分の超大容量',
        highlight: 'ピコリン酸塩・8ヶ月分',
        monthlyCostJpy: 225,
        form: 'ベジカプセル',
        thirdPartyTested: true,
        certifications: ['GMP', 'NonGMO'],
      },`,
  },
  // black-seed-oil (oral, dosageMin 500mg) - using Snap Supplements
  {
    slug: 'black-seed-oil',
    product: `      {
        name: 'NOW Foods Black Cumin Seed Oil 1,000 mg 60 Softgels',
        brand: 'NOW Foods',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/now-foods-black-cumin-seed-oil-1-000-mg-60-softgels/98582',
        priceJpy: 2200,
        dosageMg: 1000,
        unitsPerDay: 1,
        rank: 1,
        reasonJa: 'ブラックシードオイル（ニゲラサティバ）1000mg・dosageMin超え。チモキノン含有の伝統ハーブ・60粒で約2ヶ月分',
        highlight: 'チモキノン含有・1000mg',
        monthlyCostJpy: 1100,
        form: 'ソフトジェル',
        thirdPartyTested: true,
        certifications: ['GMP'],
      },`,
  },
  // biotin (C rank, oral, dosageMin 30μg)
  {
    slug: 'biotin',
    product: `      {
        name: 'NOW Foods Biotin 5,000 mcg 120 Veg Capsules',
        brand: 'NOW Foods',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/now-foods-biotin-5-000-mcg-120-veg-capsules/3319',
        priceJpy: 1500,
        dosageMg: 5000,
        unitsPerDay: 1,
        rank: 1,
        reasonJa: 'ビオチン5000μg・髪・肌・爪サポートRCT使用量。dosageMaxを大きく超える高用量・120粒で約4ヶ月分',
        highlight: 'ビオチン5000μg・高用量',
        monthlyCostJpy: 380,
        form: 'ベジカプセル',
        thirdPartyTested: true,
        certifications: ['GMP', 'NonGMO'],
      },`,
  },
  // maca (oral, dosageMin 1500mg)
  {
    slug: 'maca',
    product: `      {
        name: 'NOW Foods Maca 500 mg 250 Veg Capsules',
        brand: 'NOW Foods',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/now-foods-maca-500-mg-250-veg-capsules/9743',
        priceJpy: 2400,
        dosageMg: 500,
        unitsPerDay: 3,
        rank: 1,
        reasonJa: 'ペルー産マカ500mg×3粒 = 1500mg・dosageMin相当。アンデス高地原産の伝統エネルギートニック・250粒で約3ヶ月分',
        highlight: 'ペルー産・伝統処方',
        monthlyCostJpy: 800,
        form: 'ベジカプセル',
        thirdPartyTested: true,
        certifications: ['GMP', 'NonGMO'],
      },`,
  },
  // apigenin (oral, dosageMin 50mg)
  {
    slug: 'apigenin',
    product: `      {
        name: 'EVLution Nutrition Apigenin 50 mg 30 Veggie Capsules',
        brand: 'EVLution Nutrition',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/evlution-nutrition-apigenin-50-mg-30-veggie-capsules/116496',
        priceJpy: 2200,
        dosageMg: 50,
        unitsPerDay: 1,
        rank: 1,
        reasonJa: 'アピゲニン50mg・dosageMin相当。カモミール由来フラボノイドで睡眠・抗ストレスRCT濃度。30粒で約1ヶ月分',
        highlight: 'アピゲニン50mg・睡眠',
        monthlyCostJpy: 2200,
        form: 'ベジカプセル',
        thirdPartyTested: true,
        certifications: ['GMP'],
      },`,
  },
  // pterostilbene (oral, dosageMin 50mg)
  {
    slug: 'pterostilbene',
    product: `      {
        name: 'Jarrow Formulas Trans-Pterostilbene 50 mg 60 Veggie Capsules',
        brand: 'Jarrow Formulas',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/jarrow-formulas-trans-pterostilbene-50-mg-60-veggie-capsules/38096',
        priceJpy: 4500,
        dosageMg: 50,
        unitsPerDay: 1,
        rank: 1,
        reasonJa: 'プテロスチルベン50mg・dosageMin相当。レスベラトロールのメチル化型で吸収率4倍向上・60粒で約2ヶ月分',
        highlight: 'メチル化レスベラトロール',
        monthlyCostJpy: 2250,
        form: 'ベジカプセル',
        thirdPartyTested: true,
        certifications: ['GMP', 'NonGMO'],
      },`,
  },
  // milk-thistle (oral, dosageMin 280mg)
  {
    slug: 'milk-thistle',
    product: `      {
        name: 'NOW Foods Milk Thistle Extract Double Strength 300 mg 200 Veg Capsules',
        brand: 'NOW Foods',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/now-foods-milk-thistle-extract-300-mg-200-veg-capsules/13870',
        priceJpy: 3500,
        dosageMg: 300,
        unitsPerDay: 1,
        rank: 1,
        reasonJa: 'シリマリン300mg（80%標準化）+ アーティチョーク + ダンディライオン複合・dosageMin超え。200粒で約7ヶ月分',
        highlight: 'シリマリン80%標準化',
        monthlyCostJpy: 500,
        form: 'ベジカプセル',
        thirdPartyTested: true,
        certifications: ['GMP', 'NonGMO'],
      },`,
  },
  // phosphatidylcholine (oral, dosageMin 400mg)
  {
    slug: 'phosphatidylcholine',
    product: `      {
        name: 'Natural Factors Phosphatidyl Choline (PC) 420 mg 90 Softgels',
        brand: 'Natural Factors',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/natural-factors-phosphatidyl-choline-pc-420-mg-90-softgels/2649',
        priceJpy: 4200,
        dosageMg: 420,
        unitsPerDay: 1,
        rank: 1,
        reasonJa: 'ホスファチジルコリン420mg・dosageMin相当。脳・肝臓・細胞膜サポートの主要リン脂質・90粒で約3ヶ月分',
        highlight: 'PC 420mg・脳/肝サポート',
        monthlyCostJpy: 1400,
        form: 'ソフトジェル',
        thirdPartyTested: true,
        certifications: ['GMP', 'NonGMO'],
      },`,
  },
  // mangosteen (oral, dosageMin 400mg)
  {
    slug: 'mangosteen',
    product: `      {
        name: 'Advance Physician Formulas Mangosteen 500 mg 60 Capsules',
        brand: 'Advance Physician Formulas',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/advance-physician-formulas-mangosteen-500-mg-60-capsules/54599',
        priceJpy: 3500,
        dosageMg: 500,
        unitsPerDay: 1,
        rank: 1,
        reasonJa: 'マンゴスチン果皮エキス500mg・dosageMax相当。α-マンゴスチン含有のキサントン抗酸化処方・60粒で約2ヶ月分',
        highlight: 'α-マンゴスチン・キサントン',
        monthlyCostJpy: 1750,
        form: 'カプセル',
        thirdPartyTested: true,
        certifications: ['GMP'],
      },`,
  },
  // akkermansia (oral, special - probiotic)
  {
    slug: 'akkermansia',
    product: `      {
        name: 'Pendulum Akkermansia 30 Capsules',
        brand: 'Pendulum',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/pendulum-akkermansia-30-capsules/124047',
        priceJpy: 9800,
        dosageMg: 100,
        unitsPerDay: 1,
        rank: 1,
        reasonJa: 'Akkermansia muciniphila 1億CFU・市場唯一の生菌Akkermansia処方。腸粘膜層・GLP-1サポートRCT実証',
        highlight: '市場唯一の生菌Akkermansia',
        monthlyCostJpy: 9800,
        form: 'カプセル',
        thirdPartyTested: true,
        certifications: ['GMP'],
      },`,
  },
  // placenta (oral, dosageMin 2000mg)
  {
    slug: 'placenta',
    product: `      {
        name: 'Ecological Formulas Placenta 60 Capsules',
        brand: 'Ecological Formulas',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/ecological-formulas-placenta-60-capsules/62998',
        priceJpy: 4800,
        dosageMg: 250,
        unitsPerDay: 8,
        rank: 1,
        reasonJa: '牛由来プラセンタ250mg×8粒 = 2000mg・dosageMin相当。Ecological FormulasはGMP医療系ブランド',
        highlight: '牛由来・GMP医療グレード',
        monthlyCostJpy: 4800,
        form: 'カプセル',
        thirdPartyTested: true,
        certifications: ['GMP'],
      },`,
  },
  // copper-peptide (TOPICAL!) - GHK-Cu serum
  {
    slug: 'copper-peptide',
    product: `      {
        name: 'Neurogan Health GHK-CU Copper Peptide Face Serum 30 ml',
        brand: 'Neurogan Health',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/neurogan-health-ghk-cu-copper-peptide-face-serum-1-oz-30-ml/159352',
        priceJpy: 4800,
        concentrationPct: 0.05,
        rank: 1,
        reasonJa: 'GHK-Cu銅ペプチド配合フェイスセラム。アロエベラ・ナイアシンアミド・パパイヤ油等の複合処方。30mlで約1ヶ月分',
        highlight: 'GHK-Cu + 複合処方',
        monthlyCostJpy: 4800,
        form: 'セラム',
        thirdPartyTested: true,
        certifications: ['GMP'],
      },`,
  },
  // luteolin (oral)
  {
    slug: 'luteolin',
    product: `      {
        name: 'Swanson Luteolin Complex 100 mg 30 Veggie Caps',
        brand: 'Swanson',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/swanson-luteolin-complex-30-veggie-caps/116333',
        priceJpy: 1800,
        dosageMg: 100,
        unitsPerDay: 1,
        rank: 1,
        reasonJa: 'ルテオリン100mg + ルチン複合・抗炎症/神経保護RCT濃度。Swansonは1969年創業の米国老舗',
        highlight: 'ルテオリン+ルチン複合',
        monthlyCostJpy: 1800,
        form: 'ベジカプセル',
        thirdPartyTested: true,
        certifications: ['GMP'],
      },`,
  },
]

let src = fs.readFileSync(DATA_PATH, 'utf-8')
let added = 0
const failed: string[] = []

for (const spec of SPECS) {
  const slugIdx = src.indexOf(`slug: '${spec.slug}'`)
  if (slugIdx === -1) {
    failed.push(`${spec.slug} (slug not found)`)
    continue
  }
  const productsRe = /products:\s*\[(\s*)\]/
  const after = src.slice(slugIdx)
  const match = after.match(productsRe)
  if (!match) {
    failed.push(`${spec.slug} (products array not found or not empty)`)
    continue
  }
  const matchIdx = slugIdx + match.index!
  const matchEnd = matchIdx + match[0].length
  const replacement = `products: [\n${spec.product}\n    ]`
  src = src.slice(0, matchIdx) + replacement + src.slice(matchEnd)
  added++
  console.log(`✓ ${spec.slug}`)
}

fs.writeFileSync(DATA_PATH, src, 'utf-8')
console.log(`\n追加: ${added}/${SPECS.length}`)
if (failed.length > 0) console.log(`失敗:`, failed)
