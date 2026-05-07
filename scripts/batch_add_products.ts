/**
 * 複数成分に商品を一括追加するスクリプト
 * 既存の `products: [` の直後に商品エントリを挿入する
 */
import * as fs from 'node:fs'

const DATA_PATH = '/Users/raykudo/agescience/src/lib/data.ts'

interface ProductSpec {
  slug: string
  product: string // 完全な product object のテキスト（"{...}"）
}

const SPECS: ProductSpec[] = [
  // taurine
  {
    slug: 'taurine',
    product: `      {
        name: 'NOW Foods Taurine Double Strength 1,000 mg 250 Veg Capsules',
        brand: 'NOW Foods',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/now-foods-double-strength-taurine-1-000-mg-250-veg-capsules/39933',
        priceJpy: 2400,
        dosageMg: 1000,
        unitsPerDay: 1,
        rank: 1,
        reasonJa: 'タウリン1000mg×1粒/日 = 1000mg・dosageMin超え。Double Strength処方・250粒で約8ヶ月分の超大容量',
        highlight: 'Double Strength・250粒',
        monthlyCostJpy: 300,
        form: 'ベジカプセル',
        thirdPartyTested: true,
        certifications: ['GMP', 'NonGMO'],
      },`,
  },
  // quercetin
  {
    slug: 'quercetin',
    product: `      {
        name: 'Thorne Quercetin Phytosome 250 mg 60 Capsules',
        brand: 'Thorne',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/thorne-quercetin-phytosome-60-capsules-250-mg-per-capsule/58566',
        priceJpy: 6300,
        dosageMg: 250,
        unitsPerDay: 2,
        rank: 1,
        reasonJa: 'Quercefit（Indena社特許フィトソーム）250mg×2粒 = 500mg・dosageMin相当。フィトソーム処方で通常Quercetinより吸収率20倍向上',
        highlight: 'Quercefit特許・吸収20倍',
        monthlyCostJpy: 3150,
        form: 'カプセル',
        thirdPartyTested: true,
        heavyMetalTested: true,
        certifications: ['NSF', 'GMP'],
      },`,
  },
  // glucosamine
  {
    slug: 'glucosamine',
    product: `      {
        name: "Doctor's Best Vegan Glucosamine 1,500 mg 180 Veggie Caps",
        brand: "Doctor's Best",
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/doctor-s-best-vegan-glucosamine-1-500-mg-180-veggie-caps-750-mg-per-cap/69821',
        priceJpy: 3800,
        dosageMg: 750,
        unitsPerDay: 2,
        rank: 1,
        reasonJa: 'GreenGrown植物性グルコサミン750mg×2粒 = 1500mg・dosageMin相当。シェルフィッシュアレルギー対応のヴィーガン処方',
        highlight: 'ヴィーガン・1500mg',
        monthlyCostJpy: 1270,
        form: 'ベジカプセル',
        thirdPartyTested: true,
        certifications: ['GMP', 'NonGMO'],
      },`,
  },
  // chondroitin
  {
    slug: 'chondroitin',
    product: `      {
        name: 'NOW Foods Glucosamine & Chondroitin with MSM 180 Capsules',
        brand: 'NOW Foods',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/now-foods-glucosamine-chondroitin-with-msm-180-capsules/581',
        priceJpy: 3500,
        dosageMg: 400,
        unitsPerDay: 3,
        rank: 1,
        reasonJa: 'コンドロイチン400mg×3粒 = 1200mg・dosageMax相当。グルコサミン+MSM併配の関節サポート3層処方',
        highlight: 'グルコサミン+MSM複合',
        monthlyCostJpy: 1750,
        form: 'カプセル',
        thirdPartyTested: true,
        certifications: ['GMP'],
      },`,
  },
  // lions-mane
  {
    slug: 'lions-mane',
    product: `      {
        name: "Host Defense Mushrooms Lion's Mane 60 Capsules",
        brand: 'Host Defense',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/host-defense-mushrooms-lion-s-mane-60-capsules/21455',
        priceJpy: 3800,
        dosageMg: 500,
        unitsPerDay: 2,
        rank: 1,
        reasonJa: 'Hericium erinaceus菌糸体500mg×2粒 = 1000mg。Paul Stamets博士創設のFungi Perfecti社製・USDA Organic認定',
        highlight: 'USDA Organic・Stamets処方',
        monthlyCostJpy: 1900,
        form: 'カプセル',
        thirdPartyTested: true,
        certifications: ['Organic', 'NonGMO', 'GMP'],
      },`,
  },
  // spermidine - has products: [], (with comma)
  {
    slug: 'spermidine',
    product: `      {
        name: 'Nutricost Spermidine Wheat Germ 120 Capsules',
        brand: 'Nutricost',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/nutricost-spermidine-wheat-germ-120-capsules/126039',
        priceJpy: 2800,
        dosageMg: 5,
        unitsPerDay: 1,
        rank: 1,
        reasonJa: '小麦胚芽エキス1500mg（スペルミジン換算約5mg）×1粒 = dosageMax相当。120粒で約4ヶ月分・オートファジー研究使用量',
        highlight: '小麦胚芽5mg・オートファジー',
        monthlyCostJpy: 700,
        form: 'カプセル',
        thirdPartyTested: true,
        certifications: ['GMP'],
      },`,
  },
  // soy-isoflavones
  {
    slug: 'soy-isoflavones',
    product: `      {
        name: 'NOW Foods Soy Isoflavones 150 mg 120 Veg Capsules',
        brand: 'NOW Foods',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/now-foods-soy-isoflavones-150-mg-120-veg-capsules/792',
        priceJpy: 2200,
        dosageMg: 60,
        unitsPerDay: 1,
        rank: 1,
        reasonJa: '大豆イソフラボン150mg（ゲニステイン40%濃縮）= アグリコン換算で約60mg・dosageMin相当。120粒で約4ヶ月分',
        highlight: 'ゲニステイン40%濃縮',
        monthlyCostJpy: 550,
        form: 'ベジカプセル',
        thirdPartyTested: true,
        certifications: ['GMP', 'NonGMO'],
      },`,
  },
  // saw-palmetto
  {
    slug: 'saw-palmetto',
    product: `      {
        name: "NOW Foods Saw Palmetto Extract Men's Health 320 mg 90 Veggie Softgels",
        brand: 'NOW Foods',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/now-foods-saw-palmetto-extract-320-mg-90-veggie-softgels/6106',
        priceJpy: 2800,
        dosageMg: 320,
        unitsPerDay: 1,
        rank: 1,
        reasonJa: 'ノコギリヤシ320mg・dosageMin相当。RCTで前立腺肥大症の症状改善に使用される標準濃度。パンプキンシード油配合で吸収率向上',
        highlight: '320mg・RCT標準濃度',
        monthlyCostJpy: 950,
        form: 'ベジソフトジェル',
        thirdPartyTested: true,
        certifications: ['GMP', 'NonGMO'],
      },`,
  },
  // l-arginine
  {
    slug: 'l-arginine',
    product: `      {
        name: 'NOW Foods L-Arginine 1,000 mg 120 Tablets',
        brand: 'NOW Foods',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/now-foods-l-arginine-1-000-mg-120-tablets/411',
        priceJpy: 2400,
        dosageMg: 1000,
        unitsPerDay: 3,
        rank: 1,
        reasonJa: 'L-アルギニン1000mg×3粒 = 3000mg・dosageMin相当。NO産生前駆体として血管拡張・運動パフォーマンスRCT濃度',
        highlight: '1000mg×3粒・NO産生',
        monthlyCostJpy: 1800,
        form: '錠剤',
        thirdPartyTested: true,
        certifications: ['GMP', 'NonGMO'],
      },`,
  },
  // carnosine
  {
    slug: 'carnosine',
    product: `      {
        name: 'NOW Foods L-Carnosine 500 mg 100 Veg Capsules',
        brand: 'NOW Foods',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/now-foods-l-carnosine-500-mg-100-veg-capsules/457',
        priceJpy: 6200,
        dosageMg: 500,
        unitsPerDay: 2,
        rank: 1,
        reasonJa: 'L-カルノシン500mg×2粒 = 1000mg・dosageMin相当。糖化最終産物（AGEs）抑制RCT濃度。100粒で約1.5ヶ月分',
        highlight: 'AGEs抑制・抗糖化',
        monthlyCostJpy: 4100,
        form: 'ベジカプセル',
        thirdPartyTested: true,
        certifications: ['GMP', 'NonGMO'],
      },`,
  },
  // alpha-gpc
  {
    slug: 'alpha-gpc',
    product: `      {
        name: 'NOW Foods Alpha GPC 300 mg 60 Veg Capsules',
        brand: 'NOW Foods',
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/now-foods-alpha-gpc-300-mg-60-veg-capsules/12803',
        priceJpy: 2400,
        dosageMg: 300,
        unitsPerDay: 1,
        rank: 1,
        reasonJa: 'α-GPC 300mg・dosageMin相当。アセチルコリン前駆体で脳血液関門通過・認知機能サポートRCT濃度',
        highlight: 'アセチルコリン前駆体',
        monthlyCostJpy: 1200,
        form: 'ベジカプセル',
        thirdPartyTested: true,
        certifications: ['GMP', 'NonGMO'],
      },`,
  },
  // nattokinase
  {
    slug: 'nattokinase',
    product: `      {
        name: "Doctor's Best Nattokinase 2,000 FUs 270 Veggie Caps",
        brand: "Doctor's Best",
        platform: 'iherb',
        url: 'https://jp.iherb.com/pr/doctor-s-best-nattokinase-2-000-fus-270-veggie-caps/36581',
        priceJpy: 6800,
        dosageMg: 2000,
        unitsPerDay: 1,
        rank: 1,
        reasonJa: 'ナットウキナーゼ2000 FU・dosageMin相当。ビタミンK2除去処方で抗凝固薬服用者でも比較的使いやすい。270粒で約9ヶ月分',
        highlight: '2000 FU・ビタミンK除去',
        monthlyCostJpy: 760,
        form: 'ベジカプセル',
        thirdPartyTested: true,
        certifications: ['GMP', 'NonGMO'],
      },`,
  },
]

let src = fs.readFileSync(DATA_PATH, 'utf-8')
let added = 0
const failed: string[] = []

for (const spec of SPECS) {
  // 各 slug の products: [ または products: [], を見つけて 商品を挿入
  // パターン1: products: [\n    ],  → products: [\n<product>\n    ],
  // パターン2: products: [],         → products: [\n<product>\n    ],
  const slugIdx = src.indexOf(`slug: '${spec.slug}'`)
  if (slugIdx === -1) {
    failed.push(`${spec.slug} (slug not found)`)
    continue
  }
  // products: [ を slug 以降で検索
  const productsRe = /products:\s*\[(\s*)\]/
  const after = src.slice(slugIdx)
  const match = after.match(productsRe)
  if (!match) {
    failed.push(`${spec.slug} (products array not found or not empty)`)
    continue
  }
  const matchIdx = slugIdx + match.index!
  const matchEnd = matchIdx + match[0].length
  // products: [ → products: [\n<product>\n    ]
  const replacement = `products: [\n${spec.product}\n    ]`
  src = src.slice(0, matchIdx) + replacement + src.slice(matchEnd)
  added++
  console.log(`✓ ${spec.slug}`)
}

fs.writeFileSync(DATA_PATH, src, 'utf-8')
console.log(`\n追加: ${added}/${SPECS.length}`)
if (failed.length > 0) console.log(`失敗:`, failed)
