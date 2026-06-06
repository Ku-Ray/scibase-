/**
 * 厚生労働省 日本人の食事摂取基準（2020年版）に基づく主要栄養素データ
 * 出典: https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/eiyou/syokuji_kijyun.html
 *
 * 本データは概算値計算用の参照値。診断・治療には使用しない。
 */

export type Sex = 'male' | 'female'
export type AgeGroup = '10s' | '20s' | '30s' | '40s' | '50s' | '60s' | '70s+'
export type LifeStage = 'normal' | 'pregnancy' | 'lactation'

export const AGE_GROUP_LABEL: Record<AgeGroup, string> = {
  '10s': '15-17歳',
  '20s': '18-29歳',
  '30s': '30-49歳',
  '40s': '30-49歳',
  '50s': '50-64歳',
  '60s': '65-74歳',
  '70s+': '75歳以上',
}

export const SEX_LABEL: Record<Sex, string> = {
  male: '男性',
  female: '女性',
}

export const LIFE_STAGE_LABEL: Record<LifeStage, string> = {
  normal: '通常',
  pregnancy: '妊娠中',
  lactation: '授乳中',
}

export type NutrientCategory = 'vitamin' | 'mineral' | 'macro'

export interface NutrientMeta {
  key: string
  labelJa: string
  unit: string
  category: NutrientCategory
  ingredientSlug?: string  // data.ts の対応 slug（不足時の link 先）
  noteJa?: string
}

/**
 * 栄養素メタ情報（labelJa / unit / data.ts link 先）
 */
export const NUTRIENT_META: Record<string, NutrientMeta> = {
  vitamin_d: { key: 'vitamin_d', labelJa: 'ビタミンD', unit: 'μg', category: 'vitamin', ingredientSlug: 'vitamin-d' },
  vitamin_a: { key: 'vitamin_a', labelJa: 'ビタミンA', unit: 'μgRAE', category: 'vitamin', ingredientSlug: 'vitamin-a' },
  vitamin_e: { key: 'vitamin_e', labelJa: 'ビタミンE', unit: 'mg', category: 'vitamin', ingredientSlug: 'vitamin-e' },
  vitamin_c: { key: 'vitamin_c', labelJa: 'ビタミンC', unit: 'mg', category: 'vitamin' },
  vitamin_b6: { key: 'vitamin_b6', labelJa: 'ビタミンB6', unit: 'mg', category: 'vitamin', ingredientSlug: 'vitamin-b6' },
  vitamin_b12: { key: 'vitamin_b12', labelJa: 'ビタミンB12', unit: 'μg', category: 'vitamin', ingredientSlug: 'vitamin-b12' },
  folate: { key: 'folate', labelJa: '葉酸', unit: 'μg', category: 'vitamin', noteJa: '妊娠を計画している女性は付加量が大きい' },
  niacin: { key: 'niacin', labelJa: 'ナイアシン', unit: 'mgNE', category: 'vitamin', ingredientSlug: 'niacin' },
  iron: { key: 'iron', labelJa: '鉄', unit: 'mg', category: 'mineral', ingredientSlug: 'iron', noteJa: '女性は月経有無で必要量が変動' },
  calcium: { key: 'calcium', labelJa: 'カルシウム', unit: 'mg', category: 'mineral', ingredientSlug: 'calcium' },
  magnesium: { key: 'magnesium', labelJa: 'マグネシウム', unit: 'mg', category: 'mineral', ingredientSlug: 'magnesium', noteJa: 'サプリ等の通常以外摂取は成人350mg/日が上限' },
  zinc: { key: 'zinc', labelJa: '亜鉛', unit: 'mg', category: 'mineral', ingredientSlug: 'zinc' },
  selenium: { key: 'selenium', labelJa: 'セレン', unit: 'μg', category: 'mineral', ingredientSlug: 'selenium' },
  iodine: { key: 'iodine', labelJa: 'ヨウ素', unit: 'μg', category: 'mineral', ingredientSlug: 'iodine' },
  potassium: { key: 'potassium', labelJa: 'カリウム', unit: 'mg', category: 'mineral', ingredientSlug: 'potassium' },
}

export interface RDARecord {
  nutrient: string
  ageGroup: AgeGroup
  sex: Sex
  lifeStage: LifeStage  // 妊娠中・授乳中は付加量含む実値
  ear?: number   // 推定平均必要量
  rda?: number   // 推奨量
  ai?: number    // 目安量（rda が無い時の代替）
  ul?: number    // 耐容上限量
}

/**
 * RDA データ（厚労省 食事摂取基準 2020）
 * 30s と 40s は公式区分「30-49歳」のため同値。
 * 妊娠中・授乳中は付加量を加えた実値で記録。
 */
const R: RDARecord[] = [
  // ─── ビタミンD（AI・UL） ───
  { nutrient: 'vitamin_d', ageGroup: '10s', sex: 'male', lifeStage: 'normal', ai: 9.0, ul: 90 },
  { nutrient: 'vitamin_d', ageGroup: '10s', sex: 'female', lifeStage: 'normal', ai: 8.5, ul: 90 },
  { nutrient: 'vitamin_d', ageGroup: '20s', sex: 'male', lifeStage: 'normal', ai: 8.5, ul: 100 },
  { nutrient: 'vitamin_d', ageGroup: '20s', sex: 'female', lifeStage: 'normal', ai: 8.5, ul: 100 },
  { nutrient: 'vitamin_d', ageGroup: '30s', sex: 'male', lifeStage: 'normal', ai: 8.5, ul: 100 },
  { nutrient: 'vitamin_d', ageGroup: '30s', sex: 'female', lifeStage: 'normal', ai: 8.5, ul: 100 },
  { nutrient: 'vitamin_d', ageGroup: '40s', sex: 'male', lifeStage: 'normal', ai: 8.5, ul: 100 },
  { nutrient: 'vitamin_d', ageGroup: '40s', sex: 'female', lifeStage: 'normal', ai: 8.5, ul: 100 },
  { nutrient: 'vitamin_d', ageGroup: '50s', sex: 'male', lifeStage: 'normal', ai: 8.5, ul: 100 },
  { nutrient: 'vitamin_d', ageGroup: '50s', sex: 'female', lifeStage: 'normal', ai: 8.5, ul: 100 },
  { nutrient: 'vitamin_d', ageGroup: '60s', sex: 'male', lifeStage: 'normal', ai: 8.5, ul: 100 },
  { nutrient: 'vitamin_d', ageGroup: '60s', sex: 'female', lifeStage: 'normal', ai: 8.5, ul: 100 },
  { nutrient: 'vitamin_d', ageGroup: '70s+', sex: 'male', lifeStage: 'normal', ai: 8.5, ul: 100 },
  { nutrient: 'vitamin_d', ageGroup: '70s+', sex: 'female', lifeStage: 'normal', ai: 8.5, ul: 100 },
  { nutrient: 'vitamin_d', ageGroup: '20s', sex: 'female', lifeStage: 'pregnancy', ai: 8.5, ul: 100 },
  { nutrient: 'vitamin_d', ageGroup: '30s', sex: 'female', lifeStage: 'pregnancy', ai: 8.5, ul: 100 },
  { nutrient: 'vitamin_d', ageGroup: '40s', sex: 'female', lifeStage: 'pregnancy', ai: 8.5, ul: 100 },
  { nutrient: 'vitamin_d', ageGroup: '20s', sex: 'female', lifeStage: 'lactation', ai: 8.5, ul: 100 },
  { nutrient: 'vitamin_d', ageGroup: '30s', sex: 'female', lifeStage: 'lactation', ai: 8.5, ul: 100 },
  { nutrient: 'vitamin_d', ageGroup: '40s', sex: 'female', lifeStage: 'lactation', ai: 8.5, ul: 100 },

  // ─── ビタミンA（RDA・UL μgRAE） ───
  { nutrient: 'vitamin_a', ageGroup: '10s', sex: 'male', lifeStage: 'normal', ear: 650, rda: 900, ul: 2500 },
  { nutrient: 'vitamin_a', ageGroup: '10s', sex: 'female', lifeStage: 'normal', ear: 500, rda: 650, ul: 2800 },
  { nutrient: 'vitamin_a', ageGroup: '20s', sex: 'male', lifeStage: 'normal', ear: 600, rda: 850, ul: 2700 },
  { nutrient: 'vitamin_a', ageGroup: '20s', sex: 'female', lifeStage: 'normal', ear: 450, rda: 650, ul: 2700 },
  { nutrient: 'vitamin_a', ageGroup: '30s', sex: 'male', lifeStage: 'normal', ear: 650, rda: 900, ul: 2700 },
  { nutrient: 'vitamin_a', ageGroup: '30s', sex: 'female', lifeStage: 'normal', ear: 500, rda: 700, ul: 2700 },
  { nutrient: 'vitamin_a', ageGroup: '40s', sex: 'male', lifeStage: 'normal', ear: 650, rda: 900, ul: 2700 },
  { nutrient: 'vitamin_a', ageGroup: '40s', sex: 'female', lifeStage: 'normal', ear: 500, rda: 700, ul: 2700 },
  { nutrient: 'vitamin_a', ageGroup: '50s', sex: 'male', lifeStage: 'normal', ear: 650, rda: 900, ul: 2700 },
  { nutrient: 'vitamin_a', ageGroup: '50s', sex: 'female', lifeStage: 'normal', ear: 500, rda: 700, ul: 2700 },
  { nutrient: 'vitamin_a', ageGroup: '60s', sex: 'male', lifeStage: 'normal', ear: 600, rda: 850, ul: 2700 },
  { nutrient: 'vitamin_a', ageGroup: '60s', sex: 'female', lifeStage: 'normal', ear: 500, rda: 700, ul: 2700 },
  { nutrient: 'vitamin_a', ageGroup: '70s+', sex: 'male', lifeStage: 'normal', ear: 550, rda: 800, ul: 2700 },
  { nutrient: 'vitamin_a', ageGroup: '70s+', sex: 'female', lifeStage: 'normal', ear: 450, rda: 650, ul: 2700 },
  { nutrient: 'vitamin_a', ageGroup: '20s', sex: 'female', lifeStage: 'pregnancy', ear: 530, rda: 730, ul: 2700 },
  { nutrient: 'vitamin_a', ageGroup: '30s', sex: 'female', lifeStage: 'pregnancy', ear: 580, rda: 780, ul: 2700 },
  { nutrient: 'vitamin_a', ageGroup: '40s', sex: 'female', lifeStage: 'pregnancy', ear: 580, rda: 780, ul: 2700 },
  { nutrient: 'vitamin_a', ageGroup: '20s', sex: 'female', lifeStage: 'lactation', ear: 900, rda: 1100, ul: 2700 },
  { nutrient: 'vitamin_a', ageGroup: '30s', sex: 'female', lifeStage: 'lactation', ear: 950, rda: 1150, ul: 2700 },
  { nutrient: 'vitamin_a', ageGroup: '40s', sex: 'female', lifeStage: 'lactation', ear: 950, rda: 1150, ul: 2700 },

  // ─── ビタミンE（AI・UL mg） ───
  { nutrient: 'vitamin_e', ageGroup: '10s', sex: 'male', lifeStage: 'normal', ai: 7.0, ul: 750 },
  { nutrient: 'vitamin_e', ageGroup: '10s', sex: 'female', lifeStage: 'normal', ai: 5.5, ul: 650 },
  { nutrient: 'vitamin_e', ageGroup: '20s', sex: 'male', lifeStage: 'normal', ai: 6.0, ul: 850 },
  { nutrient: 'vitamin_e', ageGroup: '20s', sex: 'female', lifeStage: 'normal', ai: 5.0, ul: 650 },
  { nutrient: 'vitamin_e', ageGroup: '30s', sex: 'male', lifeStage: 'normal', ai: 6.0, ul: 900 },
  { nutrient: 'vitamin_e', ageGroup: '30s', sex: 'female', lifeStage: 'normal', ai: 5.5, ul: 700 },
  { nutrient: 'vitamin_e', ageGroup: '40s', sex: 'male', lifeStage: 'normal', ai: 6.0, ul: 900 },
  { nutrient: 'vitamin_e', ageGroup: '40s', sex: 'female', lifeStage: 'normal', ai: 5.5, ul: 700 },
  { nutrient: 'vitamin_e', ageGroup: '50s', sex: 'male', lifeStage: 'normal', ai: 7.0, ul: 850 },
  { nutrient: 'vitamin_e', ageGroup: '50s', sex: 'female', lifeStage: 'normal', ai: 6.0, ul: 700 },
  { nutrient: 'vitamin_e', ageGroup: '60s', sex: 'male', lifeStage: 'normal', ai: 7.0, ul: 850 },
  { nutrient: 'vitamin_e', ageGroup: '60s', sex: 'female', lifeStage: 'normal', ai: 6.5, ul: 650 },
  { nutrient: 'vitamin_e', ageGroup: '70s+', sex: 'male', lifeStage: 'normal', ai: 6.5, ul: 750 },
  { nutrient: 'vitamin_e', ageGroup: '70s+', sex: 'female', lifeStage: 'normal', ai: 6.5, ul: 650 },
  { nutrient: 'vitamin_e', ageGroup: '20s', sex: 'female', lifeStage: 'pregnancy', ai: 6.5, ul: 650 },
  { nutrient: 'vitamin_e', ageGroup: '30s', sex: 'female', lifeStage: 'pregnancy', ai: 6.5, ul: 700 },
  { nutrient: 'vitamin_e', ageGroup: '40s', sex: 'female', lifeStage: 'pregnancy', ai: 6.5, ul: 700 },
  { nutrient: 'vitamin_e', ageGroup: '20s', sex: 'female', lifeStage: 'lactation', ai: 7.0, ul: 650 },
  { nutrient: 'vitamin_e', ageGroup: '30s', sex: 'female', lifeStage: 'lactation', ai: 7.0, ul: 700 },
  { nutrient: 'vitamin_e', ageGroup: '40s', sex: 'female', lifeStage: 'lactation', ai: 7.0, ul: 700 },

  // ─── ビタミンC（RDA mg・UL なし） ───
  { nutrient: 'vitamin_c', ageGroup: '10s', sex: 'male', lifeStage: 'normal', ear: 85, rda: 100 },
  { nutrient: 'vitamin_c', ageGroup: '10s', sex: 'female', lifeStage: 'normal', ear: 85, rda: 100 },
  { nutrient: 'vitamin_c', ageGroup: '20s', sex: 'male', lifeStage: 'normal', ear: 85, rda: 100 },
  { nutrient: 'vitamin_c', ageGroup: '20s', sex: 'female', lifeStage: 'normal', ear: 85, rda: 100 },
  { nutrient: 'vitamin_c', ageGroup: '30s', sex: 'male', lifeStage: 'normal', ear: 85, rda: 100 },
  { nutrient: 'vitamin_c', ageGroup: '30s', sex: 'female', lifeStage: 'normal', ear: 85, rda: 100 },
  { nutrient: 'vitamin_c', ageGroup: '40s', sex: 'male', lifeStage: 'normal', ear: 85, rda: 100 },
  { nutrient: 'vitamin_c', ageGroup: '40s', sex: 'female', lifeStage: 'normal', ear: 85, rda: 100 },
  { nutrient: 'vitamin_c', ageGroup: '50s', sex: 'male', lifeStage: 'normal', ear: 85, rda: 100 },
  { nutrient: 'vitamin_c', ageGroup: '50s', sex: 'female', lifeStage: 'normal', ear: 85, rda: 100 },
  { nutrient: 'vitamin_c', ageGroup: '60s', sex: 'male', lifeStage: 'normal', ear: 80, rda: 100 },
  { nutrient: 'vitamin_c', ageGroup: '60s', sex: 'female', lifeStage: 'normal', ear: 80, rda: 100 },
  { nutrient: 'vitamin_c', ageGroup: '70s+', sex: 'male', lifeStage: 'normal', ear: 80, rda: 100 },
  { nutrient: 'vitamin_c', ageGroup: '70s+', sex: 'female', lifeStage: 'normal', ear: 80, rda: 100 },
  { nutrient: 'vitamin_c', ageGroup: '20s', sex: 'female', lifeStage: 'pregnancy', ear: 95, rda: 110 },
  { nutrient: 'vitamin_c', ageGroup: '30s', sex: 'female', lifeStage: 'pregnancy', ear: 95, rda: 110 },
  { nutrient: 'vitamin_c', ageGroup: '40s', sex: 'female', lifeStage: 'pregnancy', ear: 95, rda: 110 },
  { nutrient: 'vitamin_c', ageGroup: '20s', sex: 'female', lifeStage: 'lactation', ear: 125, rda: 145 },
  { nutrient: 'vitamin_c', ageGroup: '30s', sex: 'female', lifeStage: 'lactation', ear: 125, rda: 145 },
  { nutrient: 'vitamin_c', ageGroup: '40s', sex: 'female', lifeStage: 'lactation', ear: 125, rda: 145 },

  // ─── ビタミンB6（RDA mg） ───
  { nutrient: 'vitamin_b6', ageGroup: '10s', sex: 'male', lifeStage: 'normal', ear: 1.2, rda: 1.5, ul: 50 },
  { nutrient: 'vitamin_b6', ageGroup: '10s', sex: 'female', lifeStage: 'normal', ear: 1.0, rda: 1.3, ul: 45 },
  { nutrient: 'vitamin_b6', ageGroup: '20s', sex: 'male', lifeStage: 'normal', ear: 1.1, rda: 1.4, ul: 55 },
  { nutrient: 'vitamin_b6', ageGroup: '20s', sex: 'female', lifeStage: 'normal', ear: 1.0, rda: 1.1, ul: 45 },
  { nutrient: 'vitamin_b6', ageGroup: '30s', sex: 'male', lifeStage: 'normal', ear: 1.1, rda: 1.4, ul: 60 },
  { nutrient: 'vitamin_b6', ageGroup: '30s', sex: 'female', lifeStage: 'normal', ear: 1.0, rda: 1.1, ul: 45 },
  { nutrient: 'vitamin_b6', ageGroup: '40s', sex: 'male', lifeStage: 'normal', ear: 1.1, rda: 1.4, ul: 60 },
  { nutrient: 'vitamin_b6', ageGroup: '40s', sex: 'female', lifeStage: 'normal', ear: 1.0, rda: 1.1, ul: 45 },
  { nutrient: 'vitamin_b6', ageGroup: '50s', sex: 'male', lifeStage: 'normal', ear: 1.1, rda: 1.4, ul: 55 },
  { nutrient: 'vitamin_b6', ageGroup: '50s', sex: 'female', lifeStage: 'normal', ear: 1.0, rda: 1.1, ul: 45 },
  { nutrient: 'vitamin_b6', ageGroup: '60s', sex: 'male', lifeStage: 'normal', ear: 1.1, rda: 1.4, ul: 50 },
  { nutrient: 'vitamin_b6', ageGroup: '60s', sex: 'female', lifeStage: 'normal', ear: 1.0, rda: 1.1, ul: 40 },
  { nutrient: 'vitamin_b6', ageGroup: '70s+', sex: 'male', lifeStage: 'normal', ear: 1.1, rda: 1.4, ul: 50 },
  { nutrient: 'vitamin_b6', ageGroup: '70s+', sex: 'female', lifeStage: 'normal', ear: 1.0, rda: 1.1, ul: 40 },
  { nutrient: 'vitamin_b6', ageGroup: '20s', sex: 'female', lifeStage: 'pregnancy', ear: 1.2, rda: 1.3, ul: 45 },
  { nutrient: 'vitamin_b6', ageGroup: '30s', sex: 'female', lifeStage: 'pregnancy', ear: 1.2, rda: 1.3, ul: 45 },
  { nutrient: 'vitamin_b6', ageGroup: '40s', sex: 'female', lifeStage: 'pregnancy', ear: 1.2, rda: 1.3, ul: 45 },
  { nutrient: 'vitamin_b6', ageGroup: '20s', sex: 'female', lifeStage: 'lactation', ear: 1.3, rda: 1.4, ul: 45 },
  { nutrient: 'vitamin_b6', ageGroup: '30s', sex: 'female', lifeStage: 'lactation', ear: 1.3, rda: 1.4, ul: 45 },
  { nutrient: 'vitamin_b6', ageGroup: '40s', sex: 'female', lifeStage: 'lactation', ear: 1.3, rda: 1.4, ul: 45 },

  // ─── ビタミンB12（RDA μg・UL なし） ───
  { nutrient: 'vitamin_b12', ageGroup: '10s', sex: 'male', lifeStage: 'normal', ear: 2.0, rda: 2.4 },
  { nutrient: 'vitamin_b12', ageGroup: '10s', sex: 'female', lifeStage: 'normal', ear: 2.0, rda: 2.4 },
  { nutrient: 'vitamin_b12', ageGroup: '20s', sex: 'male', lifeStage: 'normal', ear: 2.0, rda: 2.4 },
  { nutrient: 'vitamin_b12', ageGroup: '20s', sex: 'female', lifeStage: 'normal', ear: 2.0, rda: 2.4 },
  { nutrient: 'vitamin_b12', ageGroup: '30s', sex: 'male', lifeStage: 'normal', ear: 2.0, rda: 2.4 },
  { nutrient: 'vitamin_b12', ageGroup: '30s', sex: 'female', lifeStage: 'normal', ear: 2.0, rda: 2.4 },
  { nutrient: 'vitamin_b12', ageGroup: '40s', sex: 'male', lifeStage: 'normal', ear: 2.0, rda: 2.4 },
  { nutrient: 'vitamin_b12', ageGroup: '40s', sex: 'female', lifeStage: 'normal', ear: 2.0, rda: 2.4 },
  { nutrient: 'vitamin_b12', ageGroup: '50s', sex: 'male', lifeStage: 'normal', ear: 2.0, rda: 2.4 },
  { nutrient: 'vitamin_b12', ageGroup: '50s', sex: 'female', lifeStage: 'normal', ear: 2.0, rda: 2.4 },
  { nutrient: 'vitamin_b12', ageGroup: '60s', sex: 'male', lifeStage: 'normal', ear: 2.0, rda: 2.4 },
  { nutrient: 'vitamin_b12', ageGroup: '60s', sex: 'female', lifeStage: 'normal', ear: 2.0, rda: 2.4 },
  { nutrient: 'vitamin_b12', ageGroup: '70s+', sex: 'male', lifeStage: 'normal', ear: 2.0, rda: 2.4 },
  { nutrient: 'vitamin_b12', ageGroup: '70s+', sex: 'female', lifeStage: 'normal', ear: 2.0, rda: 2.4 },
  { nutrient: 'vitamin_b12', ageGroup: '20s', sex: 'female', lifeStage: 'pregnancy', ear: 2.3, rda: 2.8 },
  { nutrient: 'vitamin_b12', ageGroup: '30s', sex: 'female', lifeStage: 'pregnancy', ear: 2.3, rda: 2.8 },
  { nutrient: 'vitamin_b12', ageGroup: '40s', sex: 'female', lifeStage: 'pregnancy', ear: 2.3, rda: 2.8 },
  { nutrient: 'vitamin_b12', ageGroup: '20s', sex: 'female', lifeStage: 'lactation', ear: 2.7, rda: 3.2 },
  { nutrient: 'vitamin_b12', ageGroup: '30s', sex: 'female', lifeStage: 'lactation', ear: 2.7, rda: 3.2 },
  { nutrient: 'vitamin_b12', ageGroup: '40s', sex: 'female', lifeStage: 'lactation', ear: 2.7, rda: 3.2 },

  // ─── 葉酸（RDA μg・UL 食事性以外） ───
  { nutrient: 'folate', ageGroup: '10s', sex: 'male', lifeStage: 'normal', ear: 200, rda: 240, ul: 900 },
  { nutrient: 'folate', ageGroup: '10s', sex: 'female', lifeStage: 'normal', ear: 200, rda: 240, ul: 900 },
  { nutrient: 'folate', ageGroup: '20s', sex: 'male', lifeStage: 'normal', ear: 200, rda: 240, ul: 900 },
  { nutrient: 'folate', ageGroup: '20s', sex: 'female', lifeStage: 'normal', ear: 200, rda: 240, ul: 900 },
  { nutrient: 'folate', ageGroup: '30s', sex: 'male', lifeStage: 'normal', ear: 200, rda: 240, ul: 1000 },
  { nutrient: 'folate', ageGroup: '30s', sex: 'female', lifeStage: 'normal', ear: 200, rda: 240, ul: 1000 },
  { nutrient: 'folate', ageGroup: '40s', sex: 'male', lifeStage: 'normal', ear: 200, rda: 240, ul: 1000 },
  { nutrient: 'folate', ageGroup: '40s', sex: 'female', lifeStage: 'normal', ear: 200, rda: 240, ul: 1000 },
  { nutrient: 'folate', ageGroup: '50s', sex: 'male', lifeStage: 'normal', ear: 200, rda: 240, ul: 1000 },
  { nutrient: 'folate', ageGroup: '50s', sex: 'female', lifeStage: 'normal', ear: 200, rda: 240, ul: 1000 },
  { nutrient: 'folate', ageGroup: '60s', sex: 'male', lifeStage: 'normal', ear: 200, rda: 240, ul: 900 },
  { nutrient: 'folate', ageGroup: '60s', sex: 'female', lifeStage: 'normal', ear: 200, rda: 240, ul: 900 },
  { nutrient: 'folate', ageGroup: '70s+', sex: 'male', lifeStage: 'normal', ear: 200, rda: 240, ul: 900 },
  { nutrient: 'folate', ageGroup: '70s+', sex: 'female', lifeStage: 'normal', ear: 200, rda: 240, ul: 900 },
  { nutrient: 'folate', ageGroup: '20s', sex: 'female', lifeStage: 'pregnancy', ear: 400, rda: 480, ul: 900 },
  { nutrient: 'folate', ageGroup: '30s', sex: 'female', lifeStage: 'pregnancy', ear: 400, rda: 480, ul: 1000 },
  { nutrient: 'folate', ageGroup: '40s', sex: 'female', lifeStage: 'pregnancy', ear: 400, rda: 480, ul: 1000 },
  { nutrient: 'folate', ageGroup: '20s', sex: 'female', lifeStage: 'lactation', ear: 280, rda: 340, ul: 900 },
  { nutrient: 'folate', ageGroup: '30s', sex: 'female', lifeStage: 'lactation', ear: 280, rda: 340, ul: 1000 },
  { nutrient: 'folate', ageGroup: '40s', sex: 'female', lifeStage: 'lactation', ear: 280, rda: 340, ul: 1000 },

  // ─── ナイアシン（RDA mgNE） ───
  { nutrient: 'niacin', ageGroup: '10s', sex: 'male', lifeStage: 'normal', ear: 14, rda: 17, ul: 300 },
  { nutrient: 'niacin', ageGroup: '10s', sex: 'female', lifeStage: 'normal', ear: 11, rda: 13, ul: 250 },
  { nutrient: 'niacin', ageGroup: '20s', sex: 'male', lifeStage: 'normal', ear: 13, rda: 15, ul: 300 },
  { nutrient: 'niacin', ageGroup: '20s', sex: 'female', lifeStage: 'normal', ear: 9, rda: 11, ul: 250 },
  { nutrient: 'niacin', ageGroup: '30s', sex: 'male', lifeStage: 'normal', ear: 13, rda: 15, ul: 350 },
  { nutrient: 'niacin', ageGroup: '30s', sex: 'female', lifeStage: 'normal', ear: 10, rda: 12, ul: 250 },
  { nutrient: 'niacin', ageGroup: '40s', sex: 'male', lifeStage: 'normal', ear: 13, rda: 15, ul: 350 },
  { nutrient: 'niacin', ageGroup: '40s', sex: 'female', lifeStage: 'normal', ear: 10, rda: 12, ul: 250 },
  { nutrient: 'niacin', ageGroup: '50s', sex: 'male', lifeStage: 'normal', ear: 12, rda: 14, ul: 350 },
  { nutrient: 'niacin', ageGroup: '50s', sex: 'female', lifeStage: 'normal', ear: 9, rda: 11, ul: 250 },
  { nutrient: 'niacin', ageGroup: '60s', sex: 'male', lifeStage: 'normal', ear: 12, rda: 14, ul: 300 },
  { nutrient: 'niacin', ageGroup: '60s', sex: 'female', lifeStage: 'normal', ear: 9, rda: 11, ul: 250 },
  { nutrient: 'niacin', ageGroup: '70s+', sex: 'male', lifeStage: 'normal', ear: 11, rda: 13, ul: 300 },
  { nutrient: 'niacin', ageGroup: '70s+', sex: 'female', lifeStage: 'normal', ear: 9, rda: 10, ul: 250 },
  { nutrient: 'niacin', ageGroup: '20s', sex: 'female', lifeStage: 'pregnancy', ear: 9, rda: 11, ul: 250 },
  { nutrient: 'niacin', ageGroup: '30s', sex: 'female', lifeStage: 'pregnancy', ear: 10, rda: 12, ul: 250 },
  { nutrient: 'niacin', ageGroup: '40s', sex: 'female', lifeStage: 'pregnancy', ear: 10, rda: 12, ul: 250 },
  { nutrient: 'niacin', ageGroup: '20s', sex: 'female', lifeStage: 'lactation', ear: 12, rda: 14, ul: 250 },
  { nutrient: 'niacin', ageGroup: '30s', sex: 'female', lifeStage: 'lactation', ear: 13, rda: 15, ul: 250 },
  { nutrient: 'niacin', ageGroup: '40s', sex: 'female', lifeStage: 'lactation', ear: 13, rda: 15, ul: 250 },

  // ─── 鉄（RDA mg） ───
  { nutrient: 'iron', ageGroup: '10s', sex: 'male', lifeStage: 'normal', ear: 8.0, rda: 10.0, ul: 50 },
  { nutrient: 'iron', ageGroup: '10s', sex: 'female', lifeStage: 'normal', ear: 8.5, rda: 10.5, ul: 40 },
  { nutrient: 'iron', ageGroup: '20s', sex: 'male', lifeStage: 'normal', ear: 6.5, rda: 7.5, ul: 50 },
  { nutrient: 'iron', ageGroup: '20s', sex: 'female', lifeStage: 'normal', ear: 8.5, rda: 10.5, ul: 40 },
  { nutrient: 'iron', ageGroup: '30s', sex: 'male', lifeStage: 'normal', ear: 6.5, rda: 7.5, ul: 50 },
  { nutrient: 'iron', ageGroup: '30s', sex: 'female', lifeStage: 'normal', ear: 9.0, rda: 10.5, ul: 40 },
  { nutrient: 'iron', ageGroup: '40s', sex: 'male', lifeStage: 'normal', ear: 6.5, rda: 7.5, ul: 50 },
  { nutrient: 'iron', ageGroup: '40s', sex: 'female', lifeStage: 'normal', ear: 9.0, rda: 10.5, ul: 40 },
  { nutrient: 'iron', ageGroup: '50s', sex: 'male', lifeStage: 'normal', ear: 6.5, rda: 7.5, ul: 50 },
  { nutrient: 'iron', ageGroup: '50s', sex: 'female', lifeStage: 'normal', ear: 5.5, rda: 6.5, ul: 40 },
  { nutrient: 'iron', ageGroup: '60s', sex: 'male', lifeStage: 'normal', ear: 6.0, rda: 7.5, ul: 50 },
  { nutrient: 'iron', ageGroup: '60s', sex: 'female', lifeStage: 'normal', ear: 5.0, rda: 6.0, ul: 40 },
  { nutrient: 'iron', ageGroup: '70s+', sex: 'male', lifeStage: 'normal', ear: 6.0, rda: 7.0, ul: 50 },
  { nutrient: 'iron', ageGroup: '70s+', sex: 'female', lifeStage: 'normal', ear: 5.0, rda: 6.0, ul: 40 },
  { nutrient: 'iron', ageGroup: '20s', sex: 'female', lifeStage: 'pregnancy', ear: 9.0, rda: 11.0, ul: 40 },
  { nutrient: 'iron', ageGroup: '30s', sex: 'female', lifeStage: 'pregnancy', ear: 9.0, rda: 11.0, ul: 40 },
  { nutrient: 'iron', ageGroup: '40s', sex: 'female', lifeStage: 'pregnancy', ear: 9.0, rda: 11.0, ul: 40 },
  { nutrient: 'iron', ageGroup: '20s', sex: 'female', lifeStage: 'lactation', ear: 8.0, rda: 9.0, ul: 40 },
  { nutrient: 'iron', ageGroup: '30s', sex: 'female', lifeStage: 'lactation', ear: 8.0, rda: 9.0, ul: 40 },
  { nutrient: 'iron', ageGroup: '40s', sex: 'female', lifeStage: 'lactation', ear: 8.0, rda: 9.0, ul: 40 },

  // ─── カルシウム（RDA mg） ───
  { nutrient: 'calcium', ageGroup: '10s', sex: 'male', lifeStage: 'normal', ear: 650, rda: 800, ul: 2500 },
  { nutrient: 'calcium', ageGroup: '10s', sex: 'female', lifeStage: 'normal', ear: 550, rda: 650, ul: 2500 },
  { nutrient: 'calcium', ageGroup: '20s', sex: 'male', lifeStage: 'normal', ear: 650, rda: 800, ul: 2500 },
  { nutrient: 'calcium', ageGroup: '20s', sex: 'female', lifeStage: 'normal', ear: 550, rda: 650, ul: 2500 },
  { nutrient: 'calcium', ageGroup: '30s', sex: 'male', lifeStage: 'normal', ear: 600, rda: 750, ul: 2500 },
  { nutrient: 'calcium', ageGroup: '30s', sex: 'female', lifeStage: 'normal', ear: 550, rda: 650, ul: 2500 },
  { nutrient: 'calcium', ageGroup: '40s', sex: 'male', lifeStage: 'normal', ear: 600, rda: 750, ul: 2500 },
  { nutrient: 'calcium', ageGroup: '40s', sex: 'female', lifeStage: 'normal', ear: 550, rda: 650, ul: 2500 },
  { nutrient: 'calcium', ageGroup: '50s', sex: 'male', lifeStage: 'normal', ear: 600, rda: 750, ul: 2500 },
  { nutrient: 'calcium', ageGroup: '50s', sex: 'female', lifeStage: 'normal', ear: 550, rda: 650, ul: 2500 },
  { nutrient: 'calcium', ageGroup: '60s', sex: 'male', lifeStage: 'normal', ear: 600, rda: 750, ul: 2500 },
  { nutrient: 'calcium', ageGroup: '60s', sex: 'female', lifeStage: 'normal', ear: 550, rda: 650, ul: 2500 },
  { nutrient: 'calcium', ageGroup: '70s+', sex: 'male', lifeStage: 'normal', ear: 600, rda: 700, ul: 2500 },
  { nutrient: 'calcium', ageGroup: '70s+', sex: 'female', lifeStage: 'normal', ear: 500, rda: 600, ul: 2500 },
  { nutrient: 'calcium', ageGroup: '20s', sex: 'female', lifeStage: 'pregnancy', ear: 550, rda: 650, ul: 2500 },
  { nutrient: 'calcium', ageGroup: '30s', sex: 'female', lifeStage: 'pregnancy', ear: 550, rda: 650, ul: 2500 },
  { nutrient: 'calcium', ageGroup: '40s', sex: 'female', lifeStage: 'pregnancy', ear: 550, rda: 650, ul: 2500 },
  { nutrient: 'calcium', ageGroup: '20s', sex: 'female', lifeStage: 'lactation', ear: 550, rda: 650, ul: 2500 },
  { nutrient: 'calcium', ageGroup: '30s', sex: 'female', lifeStage: 'lactation', ear: 550, rda: 650, ul: 2500 },
  { nutrient: 'calcium', ageGroup: '40s', sex: 'female', lifeStage: 'lactation', ear: 550, rda: 650, ul: 2500 },

  // ─── マグネシウム（RDA mg・UL は食事性以外 350mg） ───
  { nutrient: 'magnesium', ageGroup: '10s', sex: 'male', lifeStage: 'normal', ear: 300, rda: 360, ul: 350 },
  { nutrient: 'magnesium', ageGroup: '10s', sex: 'female', lifeStage: 'normal', ear: 260, rda: 310, ul: 350 },
  { nutrient: 'magnesium', ageGroup: '20s', sex: 'male', lifeStage: 'normal', ear: 280, rda: 340, ul: 350 },
  { nutrient: 'magnesium', ageGroup: '20s', sex: 'female', lifeStage: 'normal', ear: 230, rda: 270, ul: 350 },
  { nutrient: 'magnesium', ageGroup: '30s', sex: 'male', lifeStage: 'normal', ear: 310, rda: 370, ul: 350 },
  { nutrient: 'magnesium', ageGroup: '30s', sex: 'female', lifeStage: 'normal', ear: 240, rda: 290, ul: 350 },
  { nutrient: 'magnesium', ageGroup: '40s', sex: 'male', lifeStage: 'normal', ear: 310, rda: 370, ul: 350 },
  { nutrient: 'magnesium', ageGroup: '40s', sex: 'female', lifeStage: 'normal', ear: 240, rda: 290, ul: 350 },
  { nutrient: 'magnesium', ageGroup: '50s', sex: 'male', lifeStage: 'normal', ear: 310, rda: 370, ul: 350 },
  { nutrient: 'magnesium', ageGroup: '50s', sex: 'female', lifeStage: 'normal', ear: 240, rda: 290, ul: 350 },
  { nutrient: 'magnesium', ageGroup: '60s', sex: 'male', lifeStage: 'normal', ear: 290, rda: 350, ul: 350 },
  { nutrient: 'magnesium', ageGroup: '60s', sex: 'female', lifeStage: 'normal', ear: 230, rda: 280, ul: 350 },
  { nutrient: 'magnesium', ageGroup: '70s+', sex: 'male', lifeStage: 'normal', ear: 270, rda: 320, ul: 350 },
  { nutrient: 'magnesium', ageGroup: '70s+', sex: 'female', lifeStage: 'normal', ear: 220, rda: 260, ul: 350 },
  { nutrient: 'magnesium', ageGroup: '20s', sex: 'female', lifeStage: 'pregnancy', ear: 260, rda: 310, ul: 350 },
  { nutrient: 'magnesium', ageGroup: '30s', sex: 'female', lifeStage: 'pregnancy', ear: 270, rda: 330, ul: 350 },
  { nutrient: 'magnesium', ageGroup: '40s', sex: 'female', lifeStage: 'pregnancy', ear: 270, rda: 330, ul: 350 },
  { nutrient: 'magnesium', ageGroup: '20s', sex: 'female', lifeStage: 'lactation', ear: 230, rda: 270, ul: 350 },
  { nutrient: 'magnesium', ageGroup: '30s', sex: 'female', lifeStage: 'lactation', ear: 240, rda: 290, ul: 350 },
  { nutrient: 'magnesium', ageGroup: '40s', sex: 'female', lifeStage: 'lactation', ear: 240, rda: 290, ul: 350 },

  // ─── 亜鉛（RDA mg） ───
  { nutrient: 'zinc', ageGroup: '10s', sex: 'male', lifeStage: 'normal', ear: 10, rda: 12, ul: 40 },
  { nutrient: 'zinc', ageGroup: '10s', sex: 'female', lifeStage: 'normal', ear: 7, rda: 8, ul: 35 },
  { nutrient: 'zinc', ageGroup: '20s', sex: 'male', lifeStage: 'normal', ear: 9, rda: 11, ul: 40 },
  { nutrient: 'zinc', ageGroup: '20s', sex: 'female', lifeStage: 'normal', ear: 7, rda: 8, ul: 35 },
  { nutrient: 'zinc', ageGroup: '30s', sex: 'male', lifeStage: 'normal', ear: 9, rda: 11, ul: 45 },
  { nutrient: 'zinc', ageGroup: '30s', sex: 'female', lifeStage: 'normal', ear: 7, rda: 8, ul: 35 },
  { nutrient: 'zinc', ageGroup: '40s', sex: 'male', lifeStage: 'normal', ear: 9, rda: 11, ul: 45 },
  { nutrient: 'zinc', ageGroup: '40s', sex: 'female', lifeStage: 'normal', ear: 7, rda: 8, ul: 35 },
  { nutrient: 'zinc', ageGroup: '50s', sex: 'male', lifeStage: 'normal', ear: 9, rda: 11, ul: 45 },
  { nutrient: 'zinc', ageGroup: '50s', sex: 'female', lifeStage: 'normal', ear: 7, rda: 8, ul: 35 },
  { nutrient: 'zinc', ageGroup: '60s', sex: 'male', lifeStage: 'normal', ear: 9, rda: 11, ul: 40 },
  { nutrient: 'zinc', ageGroup: '60s', sex: 'female', lifeStage: 'normal', ear: 7, rda: 8, ul: 35 },
  { nutrient: 'zinc', ageGroup: '70s+', sex: 'male', lifeStage: 'normal', ear: 9, rda: 10, ul: 40 },
  { nutrient: 'zinc', ageGroup: '70s+', sex: 'female', lifeStage: 'normal', ear: 6, rda: 8, ul: 30 },
  { nutrient: 'zinc', ageGroup: '20s', sex: 'female', lifeStage: 'pregnancy', ear: 8, rda: 10, ul: 35 },
  { nutrient: 'zinc', ageGroup: '30s', sex: 'female', lifeStage: 'pregnancy', ear: 8, rda: 10, ul: 35 },
  { nutrient: 'zinc', ageGroup: '40s', sex: 'female', lifeStage: 'pregnancy', ear: 8, rda: 10, ul: 35 },
  { nutrient: 'zinc', ageGroup: '20s', sex: 'female', lifeStage: 'lactation', ear: 10, rda: 12, ul: 35 },
  { nutrient: 'zinc', ageGroup: '30s', sex: 'female', lifeStage: 'lactation', ear: 10, rda: 12, ul: 35 },
  { nutrient: 'zinc', ageGroup: '40s', sex: 'female', lifeStage: 'lactation', ear: 10, rda: 12, ul: 35 },

  // ─── セレン（RDA μg） ───
  { nutrient: 'selenium', ageGroup: '10s', sex: 'male', lifeStage: 'normal', ear: 25, rda: 35, ul: 400 },
  { nutrient: 'selenium', ageGroup: '10s', sex: 'female', lifeStage: 'normal', ear: 20, rda: 25, ul: 350 },
  { nutrient: 'selenium', ageGroup: '20s', sex: 'male', lifeStage: 'normal', ear: 25, rda: 30, ul: 450 },
  { nutrient: 'selenium', ageGroup: '20s', sex: 'female', lifeStage: 'normal', ear: 20, rda: 25, ul: 350 },
  { nutrient: 'selenium', ageGroup: '30s', sex: 'male', lifeStage: 'normal', ear: 25, rda: 30, ul: 450 },
  { nutrient: 'selenium', ageGroup: '30s', sex: 'female', lifeStage: 'normal', ear: 20, rda: 25, ul: 350 },
  { nutrient: 'selenium', ageGroup: '40s', sex: 'male', lifeStage: 'normal', ear: 25, rda: 30, ul: 450 },
  { nutrient: 'selenium', ageGroup: '40s', sex: 'female', lifeStage: 'normal', ear: 20, rda: 25, ul: 350 },
  { nutrient: 'selenium', ageGroup: '50s', sex: 'male', lifeStage: 'normal', ear: 25, rda: 30, ul: 450 },
  { nutrient: 'selenium', ageGroup: '50s', sex: 'female', lifeStage: 'normal', ear: 20, rda: 25, ul: 350 },
  { nutrient: 'selenium', ageGroup: '60s', sex: 'male', lifeStage: 'normal', ear: 25, rda: 30, ul: 450 },
  { nutrient: 'selenium', ageGroup: '60s', sex: 'female', lifeStage: 'normal', ear: 20, rda: 25, ul: 350 },
  { nutrient: 'selenium', ageGroup: '70s+', sex: 'male', lifeStage: 'normal', ear: 25, rda: 30, ul: 400 },
  { nutrient: 'selenium', ageGroup: '70s+', sex: 'female', lifeStage: 'normal', ear: 20, rda: 25, ul: 350 },
  { nutrient: 'selenium', ageGroup: '20s', sex: 'female', lifeStage: 'pregnancy', ear: 25, rda: 30, ul: 350 },
  { nutrient: 'selenium', ageGroup: '30s', sex: 'female', lifeStage: 'pregnancy', ear: 25, rda: 30, ul: 350 },
  { nutrient: 'selenium', ageGroup: '40s', sex: 'female', lifeStage: 'pregnancy', ear: 25, rda: 30, ul: 350 },
  { nutrient: 'selenium', ageGroup: '20s', sex: 'female', lifeStage: 'lactation', ear: 40, rda: 45, ul: 350 },
  { nutrient: 'selenium', ageGroup: '30s', sex: 'female', lifeStage: 'lactation', ear: 40, rda: 45, ul: 350 },
  { nutrient: 'selenium', ageGroup: '40s', sex: 'female', lifeStage: 'lactation', ear: 40, rda: 45, ul: 350 },

  // ─── ヨウ素（RDA μg） ───
  { nutrient: 'iodine', ageGroup: '10s', sex: 'male', lifeStage: 'normal', ear: 100, rda: 140, ul: 3000 },
  { nutrient: 'iodine', ageGroup: '10s', sex: 'female', lifeStage: 'normal', ear: 100, rda: 140, ul: 3000 },
  { nutrient: 'iodine', ageGroup: '20s', sex: 'male', lifeStage: 'normal', ear: 95, rda: 130, ul: 3000 },
  { nutrient: 'iodine', ageGroup: '20s', sex: 'female', lifeStage: 'normal', ear: 95, rda: 130, ul: 3000 },
  { nutrient: 'iodine', ageGroup: '30s', sex: 'male', lifeStage: 'normal', ear: 95, rda: 130, ul: 3000 },
  { nutrient: 'iodine', ageGroup: '30s', sex: 'female', lifeStage: 'normal', ear: 95, rda: 130, ul: 3000 },
  { nutrient: 'iodine', ageGroup: '40s', sex: 'male', lifeStage: 'normal', ear: 95, rda: 130, ul: 3000 },
  { nutrient: 'iodine', ageGroup: '40s', sex: 'female', lifeStage: 'normal', ear: 95, rda: 130, ul: 3000 },
  { nutrient: 'iodine', ageGroup: '50s', sex: 'male', lifeStage: 'normal', ear: 95, rda: 130, ul: 3000 },
  { nutrient: 'iodine', ageGroup: '50s', sex: 'female', lifeStage: 'normal', ear: 95, rda: 130, ul: 3000 },
  { nutrient: 'iodine', ageGroup: '60s', sex: 'male', lifeStage: 'normal', ear: 95, rda: 130, ul: 3000 },
  { nutrient: 'iodine', ageGroup: '60s', sex: 'female', lifeStage: 'normal', ear: 95, rda: 130, ul: 3000 },
  { nutrient: 'iodine', ageGroup: '70s+', sex: 'male', lifeStage: 'normal', ear: 95, rda: 130, ul: 3000 },
  { nutrient: 'iodine', ageGroup: '70s+', sex: 'female', lifeStage: 'normal', ear: 95, rda: 130, ul: 3000 },
  { nutrient: 'iodine', ageGroup: '20s', sex: 'female', lifeStage: 'pregnancy', ear: 170, rda: 240, ul: 2000 },
  { nutrient: 'iodine', ageGroup: '30s', sex: 'female', lifeStage: 'pregnancy', ear: 170, rda: 240, ul: 2000 },
  { nutrient: 'iodine', ageGroup: '40s', sex: 'female', lifeStage: 'pregnancy', ear: 170, rda: 240, ul: 2000 },
  { nutrient: 'iodine', ageGroup: '20s', sex: 'female', lifeStage: 'lactation', ear: 195, rda: 270, ul: 2000 },
  { nutrient: 'iodine', ageGroup: '30s', sex: 'female', lifeStage: 'lactation', ear: 195, rda: 270, ul: 2000 },
  { nutrient: 'iodine', ageGroup: '40s', sex: 'female', lifeStage: 'lactation', ear: 195, rda: 270, ul: 2000 },

  // ─── カリウム（AI mg・UL なし・目標量別途） ───
  { nutrient: 'potassium', ageGroup: '10s', sex: 'male', lifeStage: 'normal', ai: 2700 },
  { nutrient: 'potassium', ageGroup: '10s', sex: 'female', lifeStage: 'normal', ai: 2000 },
  { nutrient: 'potassium', ageGroup: '20s', sex: 'male', lifeStage: 'normal', ai: 2500 },
  { nutrient: 'potassium', ageGroup: '20s', sex: 'female', lifeStage: 'normal', ai: 2000 },
  { nutrient: 'potassium', ageGroup: '30s', sex: 'male', lifeStage: 'normal', ai: 2500 },
  { nutrient: 'potassium', ageGroup: '30s', sex: 'female', lifeStage: 'normal', ai: 2000 },
  { nutrient: 'potassium', ageGroup: '40s', sex: 'male', lifeStage: 'normal', ai: 2500 },
  { nutrient: 'potassium', ageGroup: '40s', sex: 'female', lifeStage: 'normal', ai: 2000 },
  { nutrient: 'potassium', ageGroup: '50s', sex: 'male', lifeStage: 'normal', ai: 2500 },
  { nutrient: 'potassium', ageGroup: '50s', sex: 'female', lifeStage: 'normal', ai: 2000 },
  { nutrient: 'potassium', ageGroup: '60s', sex: 'male', lifeStage: 'normal', ai: 2500 },
  { nutrient: 'potassium', ageGroup: '60s', sex: 'female', lifeStage: 'normal', ai: 2000 },
  { nutrient: 'potassium', ageGroup: '70s+', sex: 'male', lifeStage: 'normal', ai: 2500 },
  { nutrient: 'potassium', ageGroup: '70s+', sex: 'female', lifeStage: 'normal', ai: 2000 },
  { nutrient: 'potassium', ageGroup: '20s', sex: 'female', lifeStage: 'pregnancy', ai: 2000 },
  { nutrient: 'potassium', ageGroup: '30s', sex: 'female', lifeStage: 'pregnancy', ai: 2000 },
  { nutrient: 'potassium', ageGroup: '40s', sex: 'female', lifeStage: 'pregnancy', ai: 2000 },
  { nutrient: 'potassium', ageGroup: '20s', sex: 'female', lifeStage: 'lactation', ai: 2200 },
  { nutrient: 'potassium', ageGroup: '30s', sex: 'female', lifeStage: 'lactation', ai: 2200 },
  { nutrient: 'potassium', ageGroup: '40s', sex: 'female', lifeStage: 'lactation', ai: 2200 },
]

export const RDA_2020: ReadonlyArray<RDARecord> = R

export const RDA_SOURCE_URL = 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/eiyou/syokuji_kijyun.html'
export const RDA_SOURCE_NAME = '厚生労働省「日本人の食事摂取基準（2020年版）」'

/**
 * 指定の年代×性別×ライフステージ で該当する RDA を返す。
 * pregnancy/lactation は 50s 以上 / 男性で未定義のため normal に fallback。
 */
export function getRDA(nutrient: string, age: AgeGroup, sex: Sex, lifeStage: LifeStage = 'normal'): RDARecord | undefined {
  const exact = R.find(r => r.nutrient === nutrient && r.ageGroup === age && r.sex === sex && r.lifeStage === lifeStage)
  if (exact) return exact
  if (lifeStage !== 'normal') {
    return R.find(r => r.nutrient === nutrient && r.ageGroup === age && r.sex === sex && r.lifeStage === 'normal')
  }
  return undefined
}

/**
 * 推奨量の代替値（RDA があれば RDA・なければ AI）を返す。
 */
export function getReference(rec: RDARecord): { value: number; type: 'rda' | 'ai' } | undefined {
  if (rec.rda != null) return { value: rec.rda, type: 'rda' }
  if (rec.ai != null) return { value: rec.ai, type: 'ai' }
  return undefined
}

/**
 * ライフステージが pregnancy/lactation を選べる年代（妊娠可能年代）かを判定。
 */
export function canSelectLifeStage(age: AgeGroup, sex: Sex): boolean {
  if (sex !== 'female') return false
  return age === '20s' || age === '30s' || age === '40s'
}

export const ALL_NUTRIENT_KEYS = Object.keys(NUTRIENT_META)
