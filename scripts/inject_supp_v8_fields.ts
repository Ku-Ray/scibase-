/**
 * Sランク 9成分の1位商品に v8 hero variant 用の benefitHeading / pros / cons を投入。
 * 既に存在するフィールドは上書きする。
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
  {
    url: 'https://www.iherb.com/pr/now-foods-ksm-66-ashwagandha-600-mg-90-veg-capsules/145913',
    benefitHeading: 'KSM-66エキス600mg・コルチゾール−27.9%のRCTで使われた用量を1カプセルでカバー',
    pros: [
      'KSM-66はメタ解析で最も使用実績が多い特許取得エキス',
      '1カプセル600mgで研究使用量レンジ（300〜600mg/日）の上限',
      'NOW Foods 自社GMP認証工場・第三者検査公開',
      '1日1粒・90粒で約3ヶ月分とコスパも良い',
    ],
    cons: [
      '甲状腺薬・SSRI・免疫抑制剤と併用前に医師相談',
      '妊娠・授乳中・自己免疫疾患のある方は不可',
      '効果実感まで4〜12週の継続が必要',
      '海外発送で到着まで7〜14日かかる',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/doctor-s-best-high-absorption-magnesium-lysinate-glycinate-chelated-albion-traacs-120-tablets-100-mg-per-tablet/15',
    benefitHeading: '吸収率の高いグリシン酸キレート型・PMS/睡眠RCTで使われる200mg/日を2錠でカバー',
    pros: [
      'Albion TRAACS認証グリシン酸キレート型で吸収率が高い',
      '酸化マグネシウム型と比べ腹下し・下痢が起きにくい',
      '2錠で200mgの研究使用量レンジを満たす',
      "Doctor's Best 第三者検査・GMP認証",
    ],
    cons: [
      '腎機能障害のある方は事前に医師相談',
      '抗生物質・甲状腺薬とは2時間以上ずらして服用',
      '海外発送で到着まで7〜14日かかる',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/now-foods-vitamin-d-3-high-potency-2-000-iu-240-softgels/16272',
    benefitHeading: '1日1粒2000IUで日本人の不足量を補える設計・1本で約8ヶ月分の最安級',
    pros: [
      '2000IUは欧米RDA上限内で長期使用しやすい用量',
      '240粒で約8ヶ月分（¥180/月相当）とコスパ最良',
      'ココナッツ油ベースのソフトジェルで脂溶性吸収◎',
      'NOW Foods GMP認証・第三者検査済み',
    ],
    cons: [
      '長期10000IU超の過剰摂取で高Ca血症リスク',
      'サイアザイド系利尿薬・心臓薬と併用前に確認',
      '海外発送で到着まで7〜14日',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/nordic-naturals-ultimate-omega-2x-lemon-120-soft-gels-1-075-mg-per-soft-gel/73701',
    benefitHeading: '1粒で1075mgのEPA+DHA・IFOS最高評価で重金属・酸化検査クリア',
    pros: [
      '1ソフトジェルで1075mg（EPA+DHA合計）と高濃度',
      'IFOS 5★認証・重金属/PCB/酸化検査公開',
      'レモン風味で魚臭・後味の不快感がほぼない',
      'Nordic Naturals 第三者検査結果の透明性が高い',
    ],
    cons: [
      '価格は¥1,700/月とプレミアム帯',
      '抗凝固薬（ワーファリン等）服用中は要医師相談',
      '魚アレルギーの方は服用不可',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/now-foods-c-1000-with-bioflavonoids-250-veg-capsules/475',
    benefitHeading: '1錠1000mgのアスコルビン酸+バイオフラボノイド配合・250粒で約8ヶ月分',
    pros: [
      '1カプセル1000mgで研究使用量（500〜1000mg/日）をカバー',
      'バイオフラボノイド配合で吸収・利用効率が上がる設計',
      '250粒で約8ヶ月分（¥260/月）と長期コスパ最良',
      'NOW Foods 自社GMP・第三者検査済み・ビーガン仕様',
    ],
    cons: [
      '2000mg以上/日の長期摂取で下痢・結石リスク',
      '鉄剤併用で鉄吸収が増えるので主治医確認',
      '海外発送で到着まで7〜14日',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/now-foods-sports-creatine-monohydrate-2-2-lbs-1-kg/535',
    benefitHeading: '純粋クレアチンモノハイドレート1kg・1食5gでRCT使用量・約200食分',
    pros: [
      'クレアチンモノハイドレートはメタ解析で最も使用実績がある形態',
      '1kg粉末で約200食分・¥420/月とサプリ最安レベル',
      'CreaPure品質・NOW Foods GMP認証・第三者検査済み',
      '混ざりやすいマイクロナイズド粉末',
    ],
    cons: [
      '腎機能障害のある方は事前に医師相談',
      'ローディング期は水分摂取量を増やす必要あり',
      '粉末タイプでシェイカー等が必要',
      '海外発送で到着まで7〜14日',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/now-foods-melatonin-1-mg-100-tablets/77389',
    benefitHeading: '時差ぼけ・短期不眠のRCT適正域0.5〜1mg・100錠で約3ヶ月分',
    pros: [
      '1mgはメラトニン受容体飽和に十分でRCT使用域',
      'スコア線入り錠剤で半分割すれば0.5mgに調整可',
      'NOW Foods GMP認証・第三者検査済み',
      '100錠で約3ヶ月分（¥360/月）',
    ],
    cons: [
      '日本では医薬品扱い・個人輸入のみ可',
      '翌朝の眠気・倦怠感が出る場合がある',
      '妊娠・授乳中・自己免疫疾患の方は服用不可',
      '抗凝固薬・降圧薬・免疫抑制剤との相互作用報告あり',
    ],
  },
  {
    url: 'https://jp.iherb.com/pr/now-foods-iron-36-mg-90-veg-capsules/54089',
    benefitHeading: '胃にやさしいキレート型（Ferrochel）・36mgでフェリチン回復RCT用量レンジ',
    pros: [
      'Ferrochel（Albion特許キレート型）で胃腸への負担が少ない',
      '36mgはフェリチン回復のRCT使用域内',
      'NOW Foods GMP認証・第三者検査済み',
      '90粒で約3ヶ月分（¥500/月）',
    ],
    cons: [
      '健康な男性・閉経後女性には推奨されない（過剰リスク）',
      '甲状腺薬・抗生物質とは2時間以上ずらして服用',
      '便秘・黒色便が出ることがある',
      '海外発送で到着まで7〜14日',
    ],
  },
  {
    url: 'https://jp.iherb.com/pr/california-gold-nutrition-methyl-folate-and-vitamin-c-120-veggie-capsules/96310',
    benefitHeading: '活性型メチル葉酸（5-MTHF）・MTHFR遺伝子多型でも吸収できる形',
    pros: [
      '合成葉酸より生体利用率が高い活性型（5-MTHF）',
      'MTHFR遺伝子多型を持つ人にも吸収されやすい',
      'ビタミンC配合で吸収補助・酸化保護',
      'California Gold Nutrition GMP認証・第三者検査済み',
    ],
    cons: [
      'メトトレキサート・抗てんかん薬と相互作用あり',
      'ビタミンB12欠乏を覆い隠す可能性',
      '高用量摂取は医師指導下で',
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
  // Insert before "qualityNote:" if present
  if (/qualityNote:/.test(blockText)) {
    return blockText.replace(/(\s+)(qualityNote:)/, `$1${field}: ${value},$1$2`)
  }
  // Insert as last property before closing "}". Match trailing comma of last prop.
  return blockText.replace(/,\n( *)\}$/, `,\n$1  ${field}: ${value},\n$1}`)
}

let edits = 0
const log: string[] = []

for (const inj of injects) {
  const block = findProductBlock(src, inj.url)
  if (!block) {
    log.push(`MISS: ${inj.url}`)
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
console.log(`\n${edits}/${injects.length} products updated.`)
