/**
 * S1 単体テスト（npx tsx scripts/test_phenoage.ts）
 * テストランナー未設定のため tsx 一発スクリプトで検証。
 */
import {
  computeBiologicalAge,
  calculatePhenoAge,
  toSI,
  calculateLifestyle,
  type PhenoAgeInput,
} from '../src/lib/phenoage'

let pass = 0
let fail = 0
function assert(cond: boolean, msg: string) {
  if (cond) {
    pass++
    console.log(`  ✓ ${msg}`)
  } else {
    fail++
    console.error(`  ✗ FAIL: ${msg}`)
  }
}
function approx(a: number, b: number, tol: number) {
  return Math.abs(a - b) <= tol
}

/* ── ケース1: 健康な若年（良好マーカー）→ 生物年齢 < 実年齢 ── */
console.log('\n[Case 1] 健康な 30 歳・良好マーカー')
const healthy: PhenoAgeInput = {
  age: 30,
  sex: 'female',
  albumin_gdL: 4.7,
  creatinine_mgdL: 0.7,
  glucose_mgdL: 88,
  crp_mgdL: 0.05,
  lymphocyte_pct: 35,
  mcv_fL: 88,
  rdw_pct: 12.5,
  alp_UL: 60,
  wbc_10_3uL: 5.0,
}
const r1 = computeBiologicalAge(healthy)
console.log(`  PhenoAge=${r1.clocks.phenoAge.value} delta=${r1.clocks.phenoAge.delta} bloodAge=${r1.bloodAge.value}±${r1.bloodAge.halfWidth} type=${r1.personality.id}`)
assert(r1.clocks.phenoAge.value < 30, '健康若年は生物年齢 < 実年齢')
assert(r1.bloodAge.clocks.length === 1 && r1.bloodAge.clocks[0] === 'PhenoAge', '合成は PhenoAge 単独（KDM 後差し）')
assert(r1.bloodAge.tier === 'standard', '生活補正なし → tier=standard')
assert(r1.clocks.kdm.available === false, 'KDM は available:false')
assert(!r1.creatinineAbnormal, 'クレアチニン正常')
assert(r1.personality.hideAsp === false, '正常時 ASP 非表示でない')

/* ── ケース2: 不健康な高齢（悪いマーカー）→ 生物年齢 > 実年齢 ── */
console.log('\n[Case 2] 不健康な 60 歳・不良マーカー')
const unhealthy: PhenoAgeInput = {
  age: 60,
  sex: 'male',
  albumin_gdL: 3.6,
  creatinine_mgdL: 1.0,
  glucose_mgdL: 140,
  crp_mgdL: 1.2,
  lymphocyte_pct: 18,
  mcv_fL: 98,
  rdw_pct: 15.5,
  alp_UL: 130,
  wbc_10_3uL: 8.5,
}
const r2 = computeBiologicalAge(unhealthy)
console.log(`  PhenoAge=${r2.clocks.phenoAge.value} delta=${r2.clocks.phenoAge.delta} type=${r2.personality.id}`)
assert(r2.clocks.phenoAge.value > 60, '不健康高齢は生物年齢 > 実年齢')
assert(r2.clocks.phenoAge.value > r1.clocks.phenoAge.value, 'マーカー悪化で単調に上昇')

/* ── ケース3: CRP=0 でクラッシュしない（ln クランプ） ── */
console.log('\n[Case 3] CRP=0 クランプ')
const crpZero: PhenoAgeInput = { ...healthy, crp_mgdL: 0 }
const r3 = computeBiologicalAge(crpZero)
console.log(`  PhenoAge=${r3.clocks.phenoAge.value}`)
assert(Number.isFinite(r3.clocks.phenoAge.value), 'CRP=0 でも有限値（-Inf 回避）')

/* ── ケース4: CRP/RDW 未入力 → 人口平均 fallback・confidence 低下・区間拡大 ── */
console.log('\n[Case 4] CRP/RDW fallback')
const partial: PhenoAgeInput = {
  age: 40,
  sex: 'female',
  albumin_gdL: 4.4,
  creatinine_mgdL: 0.7,
  glucose_mgdL: 95,
  lymphocyte_pct: 30,
  mcv_fL: 90,
  alp_UL: 70,
  wbc_10_3uL: 5.5,
  // crp_mgdL / rdw_pct なし
}
const r4 = computeBiologicalAge(partial)
console.log(`  imputed=${JSON.stringify(r4.imputed)} confidence=${r4.clocks.phenoAge.confidence} half=${r4.clocks.phenoAge.halfWidth}`)
assert(r4.imputed.crp && r4.imputed.rdw, 'CRP/RDW を fallback と認識')
assert(r4.clocks.phenoAge.confidence < 0.7, 'fallback で confidence 低下')
assert(r4.clocks.phenoAge.halfWidth > 2.5, 'fallback で区間が広がる')

/* ── ケース5: クレアチニン異常 → 腎機能注意型・ASP 非表示・結果は出る ── */
console.log('\n[Case 5] クレアチニン異常（腎機能注意型）')
const kidneyM: PhenoAgeInput = { ...unhealthy, creatinine_mgdL: 1.3, sex: 'male' } // male 上限 1.07 超
const r5 = computeBiologicalAge(kidneyM)
console.log(`  type=${r5.personality.id} hideAsp=${r5.personality.hideAsp} bloodAge=${r5.bloodAge.value}`)
assert(r5.personality.id === 'kidney_caution', 'クレアチニン異常 → 腎機能注意型')
assert(r5.personality.hideAsp === true, '腎機能注意型は ASP 非表示')
assert(Number.isFinite(r5.bloodAge.value), '腎機能注意でも生物年齢は表示（結果は出す）')
// female 閾値 0.79 の確認
const kidneyF: PhenoAgeInput = { ...healthy, creatinine_mgdL: 0.85, sex: 'female' }
assert(computeBiologicalAge(kidneyF).personality.id === 'kidney_caution', 'female 0.85>0.79 で腎機能注意型')

/* ── ケース6: personality 判定の再現性（同入力 → 同 type） ── */
console.log('\n[Case 6] personality 再現性 & 個別パターン')
assert(
  computeBiologicalAge(unhealthy).personality.id === computeBiologicalAge(unhealthy).personality.id,
  '同入力で同 type（再現性）'
)
// 炎症優位型: CRP高+WBC高+リンパ低（病態パターンは delta 判定より優先 surface）
const inflam: PhenoAgeInput = {
  age: 50, sex: 'female', albumin_gdL: 4.4, creatinine_mgdL: 0.7, glucose_mgdL: 90,
  crp_mgdL: 0.8, lymphocyte_pct: 20, mcv_fL: 90, rdw_pct: 12.8, alp_UL: 70, wbc_10_3uL: 8.0,
}
const inflamR = computeBiologicalAge(inflam)
console.log(`  inflam type=${inflamR.personality.id} delta=${inflamR.clocks.phenoAge.delta}`)
assert(inflamR.personality.id === 'inflammation', '炎症マーカーは生物年齢が若くても炎症優位型を surface')

/* ── ケース7: 生活補正（T3）— 良い生活で −、悪い生活で + ── */
console.log('\n[Case 7] 生活補正 T3')
const good = calculateLifestyle({ smoking: 'never', activity: 'active', sleep: 'good', diet: 'anti_inflammatory' })
const bad = calculateLifestyle({ smoking: 'current', activity: 'inactive', waist: 'high' })
console.log(`  good total=${good?.totalDelta} bad total=${bad?.totalDelta}`)
assert(good != null && good.totalDelta < 0, '良い生活習慣は Δage マイナス（若年方向）')
assert(bad != null && bad.totalDelta > 0, '悪い生活習慣は Δage プラス（老化方向）')
assert(calculateLifestyle({}) === null, '生活入力なしは null')
// HR→Δage 換算式の検算: 現喫煙 HR 1.43 → ln(1.43)/ln(2)*8 ≈ 4.13
const smokeOnly = calculateLifestyle({ smoking: 'current' })!
assert(approx(smokeOnly.breakdown[0].deltaAge, 4.1, 0.2), '現喫煙 Δage ≈ +4.1（ln(1.43)/ln2*8）')
// 合計 clamp（±8）
const allBad = calculateLifestyle({ smoking: 'current', activity: 'inactive', sleep: 'poor', grip: 'weak', waist: 'high', diet: 'standard' })!
assert(allBad.totalDelta <= 8, '生活補正合計は +8 で clamp')

/* ── ケース8: 生活補正ありで lifestyleAdjustedAge と tier 連動 ── */
console.log('\n[Case 8] 生活補正レイヤー分離 & tier')
const withLife = computeBiologicalAge(healthy, { smoking: 'current', activity: 'inactive' })
console.log(`  bloodAge=${withLife.bloodAge.value} adjusted=${withLife.lifestyleAdjustedAge} tier=${withLife.bloodAge.tier}`)
assert(withLife.lifestyleAdjustedAge != null, '生活補正で lifestyleAdjustedAge が出る')
assert(withLife.bloodAge.value === r1.bloodAge.value, '採血 clock は生活補正で改変されない（分離）')
assert(withLife.bloodAge.tier === 'high', '生活補正あり（1 clock）→ tier=high')

/* ── ケース9: 単位変換の検算 ── */
console.log('\n[Case 9] 単位変換')
const { si } = toSI(healthy)
assert(approx(si.albumin_gL, 47, 0.001), 'albumin 4.7 g/dL → 47 g/L')
assert(approx(si.creatinine_umolL, 0.7 * 88.4, 0.001), 'creatinine ×88.4')
assert(approx(si.glucose_mmolL, 88 / 18, 0.001), 'glucose ÷18')
assert(si.crp_mgdL === 0.05, 'CRP は mg/dL のまま（変換しない・>floor）')
assert(si.wbc_10_9L === 5.0, 'WBC ×10³/µL ≡ ×10⁹/L（1:1）')

/* ── 既知ベクトルの安定値（リグレッション検出用・スナップショット） ── */
console.log('\n[Snapshot] 既知ベクトル PhenoAge（リグレッション検出）')
const snap = calculatePhenoAge(toSI(healthy).si, { crp: false, rdw: false }).value
console.log(`  healthy(30,female) PhenoAge = ${snap}（係数変更時にこの値がブレたら検知）`)

console.log(`\n========== RESULT: ${pass} passed, ${fail} failed ==========`)
process.exit(fail > 0 ? 1 : 0)
