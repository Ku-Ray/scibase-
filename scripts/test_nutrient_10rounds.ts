/**
 * Sprint 2-B 精度検証用: 10 種類の profile で calculateSufficiency() を実行
 * 厚労省 RDA との整合性を spot check する。
 */
import { calculateSufficiency, FOOD_PRESETS } from '../src/lib/food-nutrient'
import { NUTRIENT_META, AGE_GROUP_LABEL, SEX_LABEL, LIFE_STAGE_LABEL, getRDA } from '../src/lib/nutrient-rda'
import type { AgeGroup, Sex, LifeStage } from '../src/lib/nutrient-rda'
import type { SupplementInput } from '../src/lib/food-nutrient'

interface TestCase {
  label: string
  age: AgeGroup
  sex: Sex
  lifeStage: LifeStage
  foodPresetIds: string[]
  supplements: SupplementInput[]
  expectations: string[]
}

const TESTS: TestCase[] = [
  {
    label: 'A. 30代女性・標準的な食事（肉魚+野菜+乳製品）・サプリなし',
    age: '30s', sex: 'female', lifeStage: 'normal',
    foodPresetIds: ['meat_fish_daily', 'green_veg_daily', 'dairy_daily'],
    supplements: [],
    expectations: [
      '鉄が RDA 10.5mg に対して概ね不足（食事のみで月経女性ぎり厳しい想定）',
      'カルシウム 650mg は乳製品+野菜で概ね充足想定',
      'ビタミンD 8.5μg は肉魚で 5μg のみ → 不足',
    ],
  },
  {
    label: 'B. 30代女性・ヴィーガン・B12 だけサプリ',
    age: '30s', sex: 'female', lifeStage: 'normal',
    foodPresetIds: ['vegan', 'green_veg_daily', 'fruit_daily', 'nuts_seeds_daily', 'whole_grain_main'],
    supplements: [{ slug: 'vitamin-b12', dose: 100 }],
    expectations: [
      'B12 100μg → 過剰摂取注意 ではない（UL なし）・充足',
      'iron は modifier 0.7 適用で食事のみだと厳しい',
      'B12 食事のみなら 0.05μg で大幅不足だが、サプリで回復',
    ],
  },
  {
    label: 'C. 20代男性・肉魚+野菜+ナッツ・サプリなし',
    age: '20s', sex: 'male', lifeStage: 'normal',
    foodPresetIds: ['meat_fish_daily', 'green_veg_daily', 'nuts_seeds_daily', 'whole_grain_main'],
    supplements: [],
    expectations: [
      '鉄 7.5mg は食事のみで概ね充足',
      '亜鉛 11mg は肉魚+ナッツ+全粒で達成可能',
      'ビタミンE 6mg はナッツ 6.5mg で充足',
    ],
  },
  {
    label: 'D. 30代女性・妊娠中・標準食 + 葉酸サプリ 400μg',
    age: '30s', sex: 'female', lifeStage: 'pregnancy',
    foodPresetIds: ['meat_fish_daily', 'green_veg_daily', 'dairy_daily', 'fruit_daily'],
    supplements: [{ slug: 'folic-acid', dose: 400 }],
    expectations: [
      '葉酸 480μg RDA に対して食事 230μg+サプリ 400μg = 充足',
      '鉄 11mg RDA は食事のみだと不足傾向',
      'カルシウム 650mg は乳製品+野菜で充足',
    ],
  },
  {
    label: 'E. 50代男性・肉魚+コーヒー3杯+アルコール毎日',
    age: '50s', sex: 'male', lifeStage: 'normal',
    foodPresetIds: ['meat_fish_daily', 'coffee_3plus', 'alcohol_daily'],
    supplements: [],
    expectations: [
      '鉄 modifier 0.7 で食事 3.0mg → 2.1mg、RDA 7.5mg だと不足',
      '葉酸はアルコール 0.85 で消費増 → 食事 0 で大幅不足',
      'ビタミンB12 は肉魚で 3.0μg・アルコール 0.9 で 2.7μg・RDA 2.4 で充足',
    ],
  },
  {
    label: 'F. サプリ大量・過剰摂取テスト（鉄 50mg）',
    age: '30s', sex: 'female', lifeStage: 'normal',
    foodPresetIds: ['meat_fish_daily', 'green_veg_daily'],
    supplements: [{ slug: 'iron', dose: 50 }],
    expectations: [
      '鉄 食事 4mg + サプリ 50mg = 54mg → UL 40 の 80% (32mg) 超過 → excess_warning',
      '他の栄養素は通常',
    ],
  },
  {
    label: 'G. 何も入力なし（boundary case）',
    age: '30s', sex: 'female', lifeStage: 'normal',
    foodPresetIds: [],
    supplements: [],
    expectations: [
      '全栄養素 0% で severe_deficit',
      'UL アラート 0 件',
      'バグなく完走すること',
    ],
  },
  {
    label: 'H. 40代女性・授乳中・乳製品+野菜+果物・カルシウムサプリ 600mg',
    age: '40s', sex: 'female', lifeStage: 'lactation',
    foodPresetIds: ['dairy_daily', 'green_veg_daily', 'fruit_daily', 'meat_fish_daily'],
    supplements: [{ slug: 'calcium', dose: 600 }],
    expectations: [
      'カルシウム RDA 650 + サプリ 600 = 充足',
      '鉄 RDA 9.0 は食事+サプリなしで厳しい',
      '葉酸 RDA 340 は食事のみだと不足',
    ],
  },
  {
    label: 'I. 10代女性・乳製品+野菜+運動（成長期）',
    age: '10s', sex: 'female', lifeStage: 'normal',
    foodPresetIds: ['dairy_daily', 'green_veg_daily', 'meat_fish_daily', 'heavy_sweat_exercise'],
    supplements: [],
    expectations: [
      '鉄 RDA 10.5（10代女性最大）に対して食事のみで厳しい',
      'カリウム modifier 1.1 倍・運動で消費増',
      'カルシウム 650 は乳製品+野菜で充足想定',
    ],
  },
  {
    label: 'J. ベジタリアン+海藻+ナッツ+全粒+B12 サプリ',
    age: '30s', sex: 'female', lifeStage: 'normal',
    foodPresetIds: ['vegetarian', 'green_veg_daily', 'fruit_daily', 'nuts_seeds_daily', 'whole_grain_main', 'seaweed_weekly', 'dairy_daily', 'egg_daily'],
    supplements: [{ slug: 'vitamin-b12', dose: 25 }],
    expectations: [
      '鉄 modifier 0.85（vegetarian）・サプリなしで微不足',
      'B12 食事 0.5+0.6+0.3=1.4 + サプリ 25 = 充足',
      'マグネシウム ナッツ+全粒で充足',
      'ヨウ素 海藻 220μg で 130μg RDA 大幅充足（過剰注意境界）',
    ],
  },
  {
    label: 'K. 40代男性・標準食 + マルチビタミン 1 錠（multivitamin 機能テスト）',
    age: '40s', sex: 'male', lifeStage: 'normal',
    foodPresetIds: ['meat_fish_daily', 'green_veg_daily'],
    supplements: [{ slug: 'multivitamin', dose: 1 }],
    expectations: [
      'マルチ 1 錠で vitamin_a/d/e/c/b6/b12/folate/niacin/iron/zinc/selenium/iodine/calcium/magnesium/potassium 全てに dose 加算',
      'たとえば iron 食事 3.0+1.0+マルチ 4.0 = 8.0 mg・RDA 7.5 で充足',
      'iodine 食事 0+マルチ 100 = 100 μg・RDA 130 でやや不足',
    ],
  },
  {
    label: 'L. 50代女性・乳製品なし・カルシウム不足解消用にマルチ 2 錠',
    age: '50s', sex: 'female', lifeStage: 'normal',
    foodPresetIds: ['meat_fish_daily', 'green_veg_daily', 'fruit_daily'],
    supplements: [{ slug: 'multivitamin', dose: 2 }],
    expectations: [
      'マルチ 2 錠で各成分の dose は 2 倍に',
      'カルシウム 食事 90+マルチ 440 = 530 mg・RDA 650 でやや不足',
      'B12 食事 3.0+マルチ 5.0 = 8.0μg・RDA 2.4 で充足',
    ],
  },
]

function statusLabel(s: string): string {
  return { excess_warning: '🚨過剰', severe_deficit: '🔴大幅不足', mild_deficit: '🟡やや不足', sufficient: '🟢充足', no_data: '⚪データ無' }[s] ?? s
}

let totalIssues = 0

for (let i = 0; i < TESTS.length; i++) {
  const t = TESTS[i]
  console.log(`\n${'='.repeat(70)}`)
  console.log(`Round ${i + 1}: ${t.label}`)
  console.log(`Profile: ${AGE_GROUP_LABEL[t.age]} ${SEX_LABEL[t.sex]} ${LIFE_STAGE_LABEL[t.lifeStage]}`)
  console.log(`Food: [${t.foodPresetIds.join(', ')}] (${t.foodPresetIds.length} preset)`)
  console.log(`Supplements: ${t.supplements.map(s => `${s.slug} ${s.dose}`).join(', ') || 'なし'}`)
  console.log(`Expectations:`)
  t.expectations.forEach(e => console.log(`  - ${e}`))
  console.log(`${'-'.repeat(70)}`)

  try {
    const results = calculateSufficiency({
      age: t.age, sex: t.sex, lifeStage: t.lifeStage,
      foodPresetIds: t.foodPresetIds,
      supplements: t.supplements,
    })

    // RDA 整合 spot check
    for (const r of results) {
      const rda = getRDA(r.nutrient, t.age, t.sex, t.lifeStage)
      const meta = NUTRIENT_META[r.nutrient]
      if (!meta) { console.log(`  ❌ ${r.nutrient}: meta なし`); totalIssues++; continue }
      if (!rda && t.lifeStage === 'normal') { console.log(`  ❌ ${r.nutrient}: RDA データなし`); totalIssues++; continue }

      const label = meta.labelJa.padEnd(10, '　')
      const intake = `${r.totalIntake} ${meta.unit}`.padEnd(14)
      const ref = `${r.reference} ${meta.unit}`.padEnd(12)
      const ul = r.ul != null ? `UL ${r.ul}` : '     '
      console.log(`  ${statusLabel(r.status)} ${label} ${String(r.percent).padStart(4)}% (${intake} / ${ref}) ${ul.padEnd(8)} [${r.source}]`)
    }

    // Excess check
    const excess = results.filter(r => r.status === 'excess_warning')
    if (excess.length > 0) console.log(`\n  ⚠️ 過剰摂取: ${excess.map(e => `${NUTRIENT_META[e.nutrient].labelJa} ${e.percent}%`).join(', ')}`)
  } catch (e) {
    console.log(`  ❌ EXCEPTION: ${e}`)
    totalIssues++
  }
}

console.log(`\n${'='.repeat(70)}`)
console.log(`完了: ${TESTS.length} ラウンド・問題数: ${totalIssues}`)
