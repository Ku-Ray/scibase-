/**
 * Aランク上位10成分1位商品に v8 hero variant 用の benefitHeading / pros / cons を投入。
 * 対象：zinc / l-theanine / glycine / coq10 / curcumin / probiotics /
 *       collagen-peptide / nac / berberine / vitamin-k2
 */
import * as fs from 'node:fs'
import * as path from 'node:path'

const dataPath = path.resolve(__dirname, '../src/lib/data.ts')
let src = fs.readFileSync(dataPath, 'utf-8')

interface Inject {
  url: string
  benefitHeading: string
  pros: string[]
  cons: string[]
}

const injects: Inject[] = [
  // zinc — Thorne Zinc Picolinate 30mg
  {
    url: 'https://www.iherb.com/pr/thorne-zinc-picolinate-30-mg-180-capsules/18460',
    benefitHeading: '吸収率の高いピコリン酸亜鉛・1カプセル30mgで研究使用量レンジをカバー',
    pros: [
      'ピコリン酸亜鉛は吸収率が高く臨床試験で使用実績が多い',
      '1カプセル30mgで研究使用量（25〜40mg/日）の中央値',
      'Thorne は NSF認証・原料純度公開で信頼性最高ランク',
      '180粒で約6ヶ月分（¥600/月）と長期コスパ最良',
    ],
    cons: [
      '空腹時摂取で胃のむかつきが出ることがある',
      '銅欠乏を引き起こすため長期は銅とのバランス確認',
      '抗生物質（テトラサイクリン系）と2時間以上ずらして服用',
      '海外発送で到着まで7〜14日',
    ],
  },
  // l-theanine — NOW Double Strength 200mg
  {
    url: 'https://www.iherb.com/pr/now-foods-double-strength-l-theanine-200-mg-120-veg-capsules/54096',
    benefitHeading: '1カプセル200mgで Suntheanine®（特許取得L-テアニン）・カフェイン併用RCT用量',
    pros: [
      'Suntheanine® は最も研究使用実績の多い特許取得L-テアニン',
      '1カプセル200mgで RCT 用量（100〜400mg/日）の中央値をカバー',
      'NOW Foods 自社GMP認証・第三者検査公開',
      '120粒で約4ヶ月分（¥600/月）',
    ],
    cons: [
      '降圧薬と併用で血圧低下が増強される可能性',
      '高用量で頭痛・めまいが報告される（通常用量では稀）',
      '海外発送で到着まで7〜14日',
    ],
  },
  // glycine — NOW Glycine 1000mg caps
  {
    url: 'https://www.iherb.com/pr/now-foods-glycine-1-000-mg-100-veg-capsules/18106',
    benefitHeading: '睡眠RCT用量3g/日を3カプセルで・Yamadera 2007 で深睡眠の質改善が確認された用量',
    pros: [
      'Yamadera 2007 RCT で就寝前3gで徐波睡眠改善が確認された用量レンジ',
      '1カプセル1000mgで3粒=3gの研究使用量を満たす',
      'NOW Foods 自社GMP・第三者検査済み',
      '100粒で約1ヶ月分（¥1,440/月）',
    ],
    cons: [
      '抗精神病薬（クロザピン）との併用で薬効が低下する可能性',
      '稀に消化器症状（吐き気・軟便）',
      '効果実感まで1〜2週の継続が必要',
      '海外発送で到着まで7〜14日',
    ],
  },
  // coq10 — Jarrow Ubiquinol QH-Absorb 200mg
  {
    url: 'https://www.iherb.com/pr/jarrow-formulas-ubiquinol-qh-absorb-max-absorption-200-mg-60-softgels/36528',
    benefitHeading: '吸収型ユビキノール（還元型CoQ10）200mg・心血管RCT使用域を1ソフトジェルで',
    pros: [
      'ユビキノール（還元型）は酸化型より吸収率が3〜4倍高いと報告',
      '1ソフトジェル200mgで研究使用量（100〜300mg/日）の中央値',
      'Kaneka社（日本）製の特許取得原料・第三者検査済み',
      'Jarrow Formulas は1977年創業の老舗で品質管理に定評',
    ],
    cons: [
      '価格は¥3,200/月とプレミアム帯',
      'ワルファリンの抗凝固作用を弱める可能性',
      '降圧薬との併用で血圧低下が増強されることがある',
      '海外発送で到着まで7〜14日',
    ],
  },
  // curcumin — Doctor's Best Curcumin C3 Complex w/ BioPerine 1000mg
  {
    url: 'https://www.iherb.com/pr/doctor-s-best-curcumin-c3-complex-with-bioperine-1000-mg-120-tablets/15844',
    benefitHeading: 'C3コンプレックス + BioPerine®配合・吸収率を黒胡椒抽出物で2000%まで高めた研究使用処方',
    pros: [
      'C3コンプレックスは抗炎症RCTで使用実績の多い標準化エキス',
      'BioPerine®（黒胡椒抽出物）配合で吸収率が約20倍に向上',
      '1錠1000mgで研究使用量（500〜2,000mg/日）レンジ内',
      "Doctor's Best 第三者検査・GMP認証",
    ],
    cons: [
      '抗凝固薬（ワルファリン）の作用を増強する可能性',
      '胆石・胆嚢疾患のある方は使用前に医師相談',
      '空腹時摂取で胃の不快感が出ることがある',
      '海外発送で到着まで7〜14日',
    ],
  },
  // probiotics — Garden of Life Dr. Formulated Once Daily 30B
  {
    url: 'https://www.iherb.com/pr/garden-of-life-dr-formulated-probiotics-once-daily-30-vegetarian-capsules/64433',
    benefitHeading: '14菌株30B CFU・Dr. Perlmutter監修処方・1日1カプセルでRCT 主要菌株を網羅',
    pros: [
      '14種菌株・1カプセル300億CFUで臨床試験使用域',
      'Dr. David Perlmutter 監修・腸脳相関の研究をベースに処方',
      'NSF・Non-GMO・有機認証取得（最高クラスの認証）',
      '常温安定処方で要冷蔵不要・郵送配達対応',
    ],
    cons: [
      '免疫抑制剤服用中・重度免疫不全の方は医師相談必須',
      '飲み始めにガス・お腹の張りが出ることがある（数日で消失）',
      '抗生物質と同時摂取は避け2時間以上ずらす',
      '価格は¥3,800/月とプレミアム帯',
    ],
  },
  // collagen-peptide — Sports Research Marine Collagen 340g
  {
    url: 'https://www.amazon.co.jp/dp/B01M04S6JO?tag=scibase-22',
    benefitHeading: '海洋コラーゲンペプチド10g/食・低分子化処方で皮膚弾力RCT用量を1スクープで',
    pros: [
      '海洋（魚由来）コラーゲンは牛・豚由来より低分子で吸収率が高い',
      '1スクープ10gで皮膚弾力RCT 使用量（2.5〜10g/日）の上限',
      'NSF認証・Non-GMO・340g大容量で約1ヶ月分',
      '無味無臭・コーヒーや味噌汁にも溶ける利便性',
    ],
    cons: [
      '魚アレルギーの方は使用不可',
      '効果実感まで4〜8週の継続が必要',
      'グリシン高濃度のためクロザピン服用中は医師相談',
      '価格は¥4,400/月とプレミアム帯',
    ],
  },
  // nac — NOW NAC 600mg
  {
    url: 'https://www.iherb.com/pr/now-foods-nac-n-acetyl-cysteine-600-mg-250-veg-capsules/780',
    benefitHeading: '600mg N-アセチルシステイン・グルタチオン前駆体・1カプセルで研究使用量下限を満たす',
    pros: [
      'NAC は体内グルタチオン（最強の抗酸化物質）の前駆体',
      '1カプセル600mgで研究使用量（600〜1,800mg/日）の下限をカバー',
      '250粒で約8ヶ月分（¥420/月）と長期コスパ最良',
      'NOW Foods 自社GMP・第三者検査済み',
    ],
    cons: [
      'ニトログリセリン・降圧薬と併用で低血圧リスク',
      '気管支喘息のある方は気道刺激の報告あり要相談',
      '硫黄臭が強く飲み込みにくい場合がある',
      '海外発送で到着まで7〜14日',
    ],
  },
  // berberine — Thorne Berberine 500mg
  {
    url: 'https://www.iherb.com/pr/thorne-berberine-60-capsules/67318',
    benefitHeading: 'メトホルミン類似のAMPK活性化作用・血糖管理RCT で使われた1000mg/日を2カプセルで',
    pros: [
      'メタ解析でメトホルミンと同等の血糖降下作用が報告された原料',
      '1カプセル500mgで RCT 用量（900〜1500mg/日）を分割摂取で達成',
      'Thorne は NSF認証・原料純度公開で最高品質クラス',
      '空腹時血糖・HbA1c・脂質管理に複合的に作用',
    ],
    cons: [
      '糖尿病薬と併用で低血糖リスク・併用前に医師相談必須',
      'シクロスポリン等の代謝を阻害する相互作用報告あり',
      '高用量で消化器症状（下痢・便秘）が出やすい',
      '価格は¥5,500/月と継続コスト高め',
    ],
  },
  // vitamin-k2 — NOW MK-7 K2 300mcg
  {
    url: 'https://www.iherb.com/pr/now-foods-mk-7-vitamin-k-2-extra-strength-300-mcg-60-veg-capsules/100203',
    benefitHeading: '生体内活性が高いMK-7型・300mcgで骨密度RCT用量上限・ビタミンD3との併用前提',
    pros: [
      'MK-7型はMK-4型より半減期が長く（72時間）少量でも効果持続',
      '1カプセル300mcgで研究使用量（90〜360mcg/日）の上限',
      'ビタミンD3 と併用するとカルシウム動員でさらに骨密度に作用',
      'NOW Foods GMP認証・第三者検査済み',
    ],
    cons: [
      '抗凝固薬（ワルファリン）服用中は禁忌',
      '高用量長期での副作用情報は限定的',
      '効果実感まで6〜12ヶ月の継続が必要',
      '海外発送で到着まで7〜14日',
    ],
  },
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

function formatStringList(items: string[], indent: string): string {
  const inner = items.map(s => `${indent}  '${s.replace(/'/g, "\\'")}',`).join('\n')
  return `[\n${inner}\n${indent}]`
}

function setOrInsertField(blockText: string, field: string, value: string): string {
  const re = new RegExp(`${field}:\\s*(?:\\[[^\\]]*\\]|'[^']*')`, 's')
  if (re.test(blockText)) {
    return blockText.replace(re, `${field}: ${value}`)
  }
  if (/qualityNote:/.test(blockText)) {
    return blockText.replace(/(\s+)(qualityNote:)/, `$1${field}: ${value},$1$2`)
  }
  return blockText.replace(/,\n( *)\}$/, `,\n$1  ${field}: ${value},\n$1}`)
}

let edits = 0
const log: string[] = []
const misses: string[] = []

for (const inj of injects) {
  const block = findProductBlock(src, inj.url)
  if (!block) {
    misses.push(`MISS: ${inj.url}`)
    continue
  }
  let text = block.text
  text = setOrInsertField(text, 'benefitHeading', `'${inj.benefitHeading.replace(/'/g, "\\'")}'`)
  text = setOrInsertField(text, 'pros', formatStringList(inj.pros, '        '))
  text = setOrInsertField(text, 'cons', formatStringList(inj.cons, '        '))
  src = src.slice(0, block.start) + text + src.slice(block.end)
  edits++
  log.push(`OK ${inj.url.slice(0, 70)}...`)
}

fs.writeFileSync(dataPath, src, 'utf-8')
console.log(log.join('\n'))
if (misses.length) {
  console.log('\n===MISSES===')
  console.log(misses.join('\n'))
}
console.log(`\n${edits}/${injects.length} products updated.`)
