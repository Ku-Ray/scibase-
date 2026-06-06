/**
 * 食品 preset・摂取量推定ロジック・サプリ統合計算
 *
 * 食品 contribution は文部科学省「日本食品標準成分表 2020年版（八訂）」より
 * 代表的食品 1 食分の概算を「毎日食べる」前提で 1 日量に換算した参考値。
 * 出典: https://fooddb.mext.go.jp/
 *
 * 注意: 本データは概算値計算用。実際の摂取量は食材・量・調理法で大きく変動する。
 */

import {
  ALL_NUTRIENT_KEYS,
  NUTRIENT_META,
  getRDA,
  getReference,
  type AgeGroup,
  type LifeStage,
  type Sex,
} from './nutrient-rda'

export const FOOD_SOURCE_URL = 'https://fooddb.mext.go.jp/'
export const FOOD_SOURCE_NAME = '文部科学省「日本食品標準成分表2020年版（八訂）」'

export interface FoodPreset {
  id: string
  labelJa: string
  descJa: string
  /** 1 日あたりの栄養素貢献量（NUTRIENT_META の key と単位を一致させる） */
  contribution?: Partial<Record<string, number>>
  /** 吸収/消費の修正係数（base intake に乗算・1.0 が中立） */
  modifier?: Partial<Record<string, number>>
  /** チェックを入れると同時に他 preset を排他にする ID リスト（vegan ⇄ vegetarian 等） */
  exclusiveWith?: string[]
  category: 'diet_pattern' | 'food_habit' | 'modifier'
}

/**
 * 食品 preset（13 種）
 * contribution は「毎日食べる」前提で代表食品 1 食分を換算した概算。
 */
export const FOOD_PRESETS: FoodPreset[] = [
  {
    id: 'meat_fish_daily',
    labelJa: '肉・魚を毎日食べる',
    descJa: '鶏むね・鮭・サバ等を 1 日 1 食以上',
    category: 'food_habit',
    contribution: {
      iron: 3.0,
      vitamin_b12: 3.0,
      vitamin_b6: 0.5,
      zinc: 5.0,
      vitamin_d: 5.0,
      niacin: 8,
      selenium: 25,
      potassium: 800,
      magnesium: 25,
    },
  },
  {
    id: 'egg_daily',
    labelJa: '鶏卵を毎日 1 個以上',
    descJa: '全卵で換算',
    category: 'food_habit',
    contribution: {
      vitamin_b12: 0.5,
      vitamin_a: 90,
      vitamin_d: 1.5,
      selenium: 16,
      folate: 22,
      potassium: 70,
    },
  },
  {
    id: 'dairy_daily',
    labelJa: '乳製品を毎日（牛乳/ヨーグルト/チーズ）',
    descJa: '牛乳 200ml 相当',
    category: 'food_habit',
    contribution: {
      calcium: 220,
      vitamin_b12: 0.6,
      vitamin_a: 75,
      vitamin_b6: 0.05,
      potassium: 320,
      magnesium: 22,
    },
  },
  {
    id: 'soy_legume_daily',
    labelJa: '大豆・豆類を毎日（豆腐・納豆・豆乳・大豆）',
    descJa: 'ベジタリアン/ヴィーガンの主要鉄・タンパク源',
    category: 'food_habit',
    contribution: {
      iron: 3.5,
      magnesium: 80,
      calcium: 130,
      vitamin_b6: 0.2,
      folate: 55,
      zinc: 1.8,
      potassium: 650,
      vitamin_e: 0.6,
    },
  },
  {
    id: 'green_veg_daily',
    labelJa: '緑黄色野菜を毎日',
    descJa: 'ほうれん草・小松菜・にんじん等 100g 以上',
    category: 'food_habit',
    contribution: {
      vitamin_a: 350,
      folate: 180,
      vitamin_c: 35,
      potassium: 700,
      iron: 1.0,
      magnesium: 55,
      calcium: 90,
      vitamin_e: 1.5,
      vitamin_b6: 0.15,
    },
  },
  {
    id: 'fruit_daily',
    labelJa: '果物を毎日',
    descJa: 'みかん・キウイ・りんご等 200g 程度',
    category: 'food_habit',
    contribution: {
      vitamin_c: 70,
      folate: 30,
      potassium: 480,
      magnesium: 18,
      vitamin_b6: 0.15,
    },
  },
  {
    id: 'nuts_seeds_daily',
    labelJa: 'ナッツ・種実類を毎日',
    descJa: 'アーモンド・くるみ等 25g 程度',
    category: 'food_habit',
    contribution: {
      vitamin_e: 6.5,
      magnesium: 75,
      zinc: 1.0,
      selenium: 4,
      potassium: 200,
      iron: 0.9,
      vitamin_b6: 0.08,
    },
  },
  {
    id: 'whole_grain_main',
    labelJa: '玄米・全粒穀物が主食',
    descJa: '白米中心ではなく玄米・雑穀米・全粒粉が中心',
    category: 'food_habit',
    contribution: {
      magnesium: 110,
      vitamin_b6: 0.3,
      niacin: 4,
      zinc: 2.0,
      potassium: 280,
      iron: 1.2,
      folate: 25,
    },
  },
  {
    id: 'seaweed_weekly',
    labelJa: '海藻類を週 3 回以上',
    descJa: 'わかめ・ひじき・のり等',
    category: 'food_habit',
    contribution: {
      iodine: 220,
      magnesium: 30,
      calcium: 60,
      iron: 0.6,
      potassium: 120,
    },
  },
  {
    id: 'vegetarian',
    labelJa: 'ベジタリアン（卵・乳製品は摂る）',
    descJa: '魚も含めて肉類を食べない',
    category: 'diet_pattern',
    exclusiveWith: ['vegan', 'meat_fish_daily'],
    contribution: {
      iron: 0.5,
      vitamin_b12: 0.3,
    },
    modifier: {
      iron: 0.85,
    },
  },
  {
    id: 'vegan',
    labelJa: 'ヴィーガン（動物性食品なし）',
    descJa: '肉・魚・卵・乳製品すべて摂らない',
    category: 'diet_pattern',
    exclusiveWith: ['vegetarian', 'meat_fish_daily', 'egg_daily', 'dairy_daily'],
    contribution: {
      vitamin_b12: 0.05,
    },
    modifier: {
      iron: 0.7,
    },
  },
  {
    id: 'coffee_3plus',
    labelJa: 'コーヒー 3 杯以上 / 日',
    descJa: 'カフェイン摂取量が多く鉄の吸収阻害が起きやすい',
    category: 'modifier',
    modifier: {
      iron: 0.7,
      calcium: 0.92,
    },
  },
  {
    id: 'alcohol_daily',
    labelJa: 'アルコールを毎日飲む',
    descJa: 'ビール 500ml 相当以上を週 5 日以上',
    category: 'modifier',
    modifier: {
      folate: 0.85,
      vitamin_b6: 0.85,
      magnesium: 0.9,
      vitamin_b12: 0.9,
    },
  },
  {
    id: 'heavy_sweat_exercise',
    labelJa: '汗をかく運動を週 3 回以上',
    descJa: '発汗によりミネラル消費が増加',
    category: 'modifier',
    modifier: {
      potassium: 1.1,
      magnesium: 1.05,
    },
  },
]

/**
 * サプリ slug → 内部 nutrient key のマッピング。
 * data.ts の slug 命名と nutrient-rda.ts の key 命名のズレを吸収。
 */
export const SUPPLEMENT_SLUG_TO_NUTRIENT: Record<string, string> = {
  'vitamin-d': 'vitamin_d',
  'vitamin-a': 'vitamin_a',
  'vitamin-e': 'vitamin_e',
  'vitamin-c': 'vitamin_c',
  'vitamin-b6': 'vitamin_b6',
  'vitamin-b12': 'vitamin_b12',
  'folate': 'folate',
  'folic-acid': 'folate',
  'niacin': 'niacin',
  'iron': 'iron',
  'calcium': 'calcium',
  'magnesium': 'magnesium',
  'zinc': 'zinc',
  'selenium': 'selenium',
  'iodine': 'iodine',
  'potassium': 'potassium',
}

/**
 * サプリ slug ごとの推奨入力単位（UI で表示・ユーザーの単位入力ミスを抑制）
 * data.ts の products.dosage と整合性を取る。
 */
export const SUPPLEMENT_INPUT_UNIT: Record<string, string> = {
  'vitamin-d': 'μg',
  'vitamin-a': 'μgRAE',
  'vitamin-e': 'mg',
  'vitamin-c': 'mg',
  'vitamin-b6': 'mg',
  'vitamin-b12': 'μg',
  'folate': 'μg',
  'folic-acid': 'μg',
  'niacin': 'mgNE',
  'iron': 'mg',
  'calcium': 'mg',
  'magnesium': 'mg',
  'zinc': 'mg',
  'selenium': 'μg',
  'iodine': 'μg',
  'potassium': 'mg',
}

/**
 * よく飲まれているサプリのプリセット（ワンタップ追加用）
 * dose は市販サプリで一般的な 1 日量。ユーザーは UI で個別に変更可能。
 */
export interface SupplementPreset {
  slug: string
  labelJa: string
  emoji: string
  typicalDose: number
  unit: string
  descJa: string
}

export const SUPPLEMENT_PRESETS: SupplementPreset[] = [
  { slug: 'vitamin-d', labelJa: 'ビタミンD', emoji: '☀️', typicalDose: 25, unit: 'μg', descJa: '1000 IU 相当' },
  { slug: 'iron', labelJa: '鉄', emoji: '🩸', typicalDose: 15, unit: 'mg', descJa: '貧血対策の標準量' },
  { slug: 'magnesium', labelJa: 'マグネシウム', emoji: '🌙', typicalDose: 300, unit: 'mg', descJa: '安眠・筋肉サポート' },
  { slug: 'zinc', labelJa: '亜鉛', emoji: '🛡️', typicalDose: 15, unit: 'mg', descJa: '免疫・肌・髪' },
  { slug: 'vitamin-b12', labelJa: 'ビタミンB12', emoji: '⚡', typicalDose: 100, unit: 'μg', descJa: 'ベジ/ヴィーガン定番' },
  { slug: 'folic-acid', labelJa: '葉酸', emoji: '🌱', typicalDose: 400, unit: 'μg', descJa: '妊活・妊娠中の標準量' },
  { slug: 'calcium', labelJa: 'カルシウム', emoji: '🦴', typicalDose: 500, unit: 'mg', descJa: '骨・歯のサポート' },
  { slug: 'vitamin-c', labelJa: 'ビタミンC', emoji: '🍊', typicalDose: 500, unit: 'mg', descJa: '抗酸化・肌対策' },
  { slug: 'selenium', labelJa: 'セレン', emoji: '✨', typicalDose: 100, unit: 'μg', descJa: '抗酸化ミネラル' },
  { slug: 'vitamin-e', labelJa: 'ビタミンE', emoji: '🌰', typicalDose: 100, unit: 'mg', descJa: '抗酸化・血流' },
  { slug: 'vitamin-a', labelJa: 'ビタミンA', emoji: '👁️', typicalDose: 700, unit: 'μgRAE', descJa: '視覚・皮膚' },
  { slug: 'vitamin-b6', labelJa: 'ビタミンB6', emoji: '🧠', typicalDose: 10, unit: 'mg', descJa: '神経・代謝' },
]

export type SufficiencyStatus = 'sufficient' | 'mild_deficit' | 'severe_deficit' | 'excess_warning' | 'no_data'

export interface SupplementInput {
  slug: string
  dose: number  // SUPPLEMENT_INPUT_UNIT の単位で入力
}

export interface SufficiencyInput {
  age: AgeGroup
  sex: Sex
  lifeStage: LifeStage
  foodPresetIds: string[]
  supplements: SupplementInput[]
}

export interface SufficiencyResult {
  nutrient: string
  foodIntake: number
  supplementIntake: number
  totalIntake: number
  reference: number          // RDA or AI
  referenceType: 'rda' | 'ai'
  ear?: number
  ul?: number
  percent: number             // 充足率（%）
  status: SufficiencyStatus
  source: 'food_only' | 'supplement_only' | 'food_and_supplement' | 'none'
}

/**
 * 栄養素ごとの「食事 contribution × modifier ＋ サプリ」を集計して充足率を返す。
 * 各栄養素について全 NUTRIENT_META key を網羅して返す。
 */
export function calculateSufficiency(input: SufficiencyInput): SufficiencyResult[] {
  const { age, sex, lifeStage, foodPresetIds, supplements } = input

  const selectedPresets = FOOD_PRESETS.filter(p => foodPresetIds.includes(p.id))

  const results: SufficiencyResult[] = []

  for (const nutrient of ALL_NUTRIENT_KEYS) {
    // 1. base intake（contribution sum）
    let foodIntake = 0
    for (const p of selectedPresets) {
      const contrib = p.contribution?.[nutrient]
      if (contrib != null) foodIntake += contrib
    }

    // 2. modifier（係数積算）
    let modifier = 1.0
    for (const p of selectedPresets) {
      const m = p.modifier?.[nutrient]
      if (m != null) modifier *= m
    }
    foodIntake = foodIntake * modifier

    // 3. supplement intake
    let supplementIntake = 0
    for (const s of supplements) {
      const mapped = SUPPLEMENT_SLUG_TO_NUTRIENT[s.slug]
      if (mapped === nutrient && s.dose > 0) supplementIntake += s.dose
    }

    const totalIntake = foodIntake + supplementIntake

    // 4. RDA 参照
    const rda = getRDA(nutrient, age, sex, lifeStage)
    if (!rda) {
      results.push({
        nutrient,
        foodIntake,
        supplementIntake,
        totalIntake,
        reference: 0,
        referenceType: 'rda',
        percent: 0,
        status: 'no_data',
        source: 'none',
      })
      continue
    }

    const ref = getReference(rda)
    if (!ref) {
      results.push({
        nutrient,
        foodIntake,
        supplementIntake,
        totalIntake,
        reference: 0,
        referenceType: 'rda',
        percent: 0,
        status: 'no_data',
        source: 'none',
      })
      continue
    }

    // 5. 充足率
    const percent = ref.value > 0 ? (totalIntake / ref.value) * 100 : 0

    // 6. status 判定（過剰 → 充足 → 不足の順）
    // UL 判定: 通常は totalIntake で判定するが、ulExcludesFood の栄養素は supplementIntake のみで判定
    const meta = NUTRIENT_META[nutrient]
    const ulCheckIntake = meta?.ulExcludesFood ? supplementIntake : totalIntake
    let status: SufficiencyStatus
    if (rda.ul != null && ulCheckIntake >= rda.ul * 0.8) {
      status = 'excess_warning'
    } else if (percent >= 80) {
      status = 'sufficient'
    } else if (percent >= 50) {
      status = 'mild_deficit'
    } else {
      status = 'severe_deficit'
    }

    // 7. source
    let source: SufficiencyResult['source']
    if (foodIntake > 0 && supplementIntake > 0) source = 'food_and_supplement'
    else if (foodIntake > 0) source = 'food_only'
    else if (supplementIntake > 0) source = 'supplement_only'
    else source = 'none'

    results.push({
      nutrient,
      foodIntake: round(foodIntake),
      supplementIntake: round(supplementIntake),
      totalIntake: round(totalIntake),
      reference: ref.value,
      referenceType: ref.type,
      ear: rda.ear,
      ul: rda.ul,
      percent: Math.round(percent),
      status,
      source,
    })
  }

  return results
}

function round(v: number): number {
  if (v === 0) return 0
  if (v < 10) return Math.round(v * 10) / 10
  return Math.round(v)
}

/**
 * 結果をステータス別にグルーピングしてソート（不足度の重い順）
 */
export function groupResultsByStatus(results: SufficiencyResult[]): Record<SufficiencyStatus, SufficiencyResult[]> {
  const groups: Record<SufficiencyStatus, SufficiencyResult[]> = {
    excess_warning: [],
    severe_deficit: [],
    mild_deficit: [],
    sufficient: [],
    no_data: [],
  }
  for (const r of results) groups[r.status].push(r)

  groups.excess_warning.sort((a, b) => b.percent - a.percent)
  groups.severe_deficit.sort((a, b) => a.percent - b.percent)
  groups.mild_deficit.sort((a, b) => a.percent - b.percent)
  groups.sufficient.sort((a, b) => a.percent - b.percent)

  return groups
}

/**
 * 排他 preset の整合：vegan を選んだら vegetarian や肉魚 daily は外す等
 */
export function applyExclusivity(currentIds: string[], toggledId: string, willBeSelected: boolean): string[] {
  if (!willBeSelected) return currentIds.filter(id => id !== toggledId)
  const next = new Set([...currentIds, toggledId])
  const preset = FOOD_PRESETS.find(p => p.id === toggledId)
  if (preset?.exclusiveWith) {
    for (const e of preset.exclusiveWith) next.delete(e)
  }
  // 逆方向：既存 preset が toggle 対象を exclusiveWith に含む場合も外す
  for (const id of Array.from(next)) {
    const p = FOOD_PRESETS.find(pp => pp.id === id)
    if (p?.exclusiveWith?.includes(toggledId) && id !== toggledId) next.delete(id)
  }
  return Array.from(next)
}
