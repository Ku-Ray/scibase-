/**
 * phenoage.ts — 生物学的年齢（PhenoAge）計算コア
 *
 * S1 計算コア（dopamine UI は PhenoAgeClient.tsx 側・ここはロジックのみ）。
 *
 * ## clock 構成（2026-06-10 ユーザー確定）
 * - 主 clock = Levine 2018 PhenoAge（係数は公開固定・NHANES III 学習）
 * - 第 2 clock = KDM（Klemera-Doubal）… 数学エンジンは実装済みだが、
 *   **移植可能な公開係数が存在しない**（k/q/s は学習集団から都度導出される値）
 *   ことが factcheck で判明したため、係数テーブルは未確定プレースホルダとし、
 *   合成では confidence=0（実質 PhenoAge 単独）。正式係数（NHANES III 学習結果）が
 *   入手でき次第 KDM_REFERENCE を差し込めば 2 clock 合成が自動で有効化される。
 *
 * ## factcheck メモ（係数の出典）
 * - PhenoAge 係数は dayoonkwon/BioAge パッケージ R 実装（phenoage_calc.R, orig==TRUE 経路）
 *   の高精度値をそのまま採用。原典 Levine ME et al. Aging (Albany NY). 2018;10(4):573-591.
 * - 🚨 CRP の単位 = **mg/dL（formula-native）**。BioAge は albumin/creatinine/glucose を
 *   SI 変換する一方で CRP だけ生の log(crp) を取る（= Levine が学習した NHANES III の
 *   native 単位 mg/dL のまま）。日本の健診 CRP も標準 mg/dL なので変換不要。
 *   （brief の「mg/L へ変換してから ln」はバグなので採用しない。）
 * - 生活補正の Δage = ln(HR)/ln(2) × MRDT(=8) は longevity 計算機で標準の換算。
 *   各 HR は査読コホート由来（出典は LIFESTYLE_FACTORS の source フィールド）。
 *
 * ## 表示禁則（YMYL・薬機法）
 * - mortality score（mortScore）は内部計算のみ・UI に出さない（予想寿命/死亡リスク NG）
 * - サプリの「−N 歳」は出さない。Δage 数値化が許されるのは生活習慣変更（T3）のみ。
 * - クレアチニン異常時は personality='kidney_caution' を立て、UI 側で ASP 非表示にする。
 */

/* ──────────────────────────────────────────────────────────────────
 * 型定義
 * ────────────────────────────────────────────────────────────────── */

export type Sex = 'male' | 'female'

/** 日本健診の生データ単位での入力 */
export interface PhenoAgeInput {
  age: number
  sex: Sex
  /** アルブミン g/dL（健診標準 4.1–5.1） */
  albumin_gdL: number
  /** クレアチニン mg/dL */
  creatinine_mgdL: number
  /** 空腹時血糖 mg/dL */
  glucose_mgdL: number
  /** CRP mg/dL（日本健診 native・SI 変換しない）。任意（未入力時は人口平均 fallback） */
  crp_mgdL?: number
  /** リンパ球率 % */
  lymphocyte_pct: number
  /** MCV fL */
  mcv_fL: number
  /** RDW %。任意（未入力時は人口平均 fallback） */
  rdw_pct?: number
  /** ALP U/L */
  alp_UL: number
  /** WBC ×10³/µL */
  wbc_10_3uL: number
}

/** SI 単位へ変換した内部表現（PhenoAge 計算で使う） */
export interface PhenoAgeSI {
  age: number
  albumin_gL: number
  creatinine_umolL: number
  glucose_mmolL: number
  crp_mgdL: number // CRP は native mg/dL のまま（変換しない）
  lymphocyte_pct: number
  mcv_fL: number
  rdw_pct: number
  alp_UL: number
  wbc_10_9L: number
}

/** 1 つの clock の結果（点推定 + 信頼区間 + confidence） */
export interface ClockResult {
  /** 利用可能か（KDM は係数未確定のため当面 false） */
  available: boolean
  /** 生物年齢の点推定（歳・小数 1 桁） */
  value: number
  /** 信頼区間 下限 */
  lower: number
  /** 信頼区間 上限 */
  upper: number
  /** 区間の半幅（± 歳） */
  halfWidth: number
  /** 合成の重みに使う confidence（0–1） */
  confidence: number
  /** 実年齢との差（+ が老化方向） */
  delta: number
}

export type PrecisionTier = 'standard' | 'high' | 'max'

/** 合成生物年齢（複数 clock の confidence 重み付き） */
export interface SynthesizedAge {
  value: number
  lower: number
  upper: number
  halfWidth: number
  /** 寄与した clock 名 */
  clocks: string[]
  /** 精度ティア（項目が増えると high→max・区間が狭まる演出に使う） */
  tier: PrecisionTier
}

/* ── 生活補正（T3） ───────────────────────────────────────────── */

export type SmokingState = 'never' | 'former' | 'current'
export type ActivityState = 'inactive' | 'moderate' | 'active'
export type SleepState = 'poor' | 'good'
export type GripState = 'weak' | 'normal' | 'strong'
export type WaistState = 'normal' | 'high'
export type DietState = 'standard' | 'anti_inflammatory'

export interface LifestyleInput {
  smoking?: SmokingState
  activity?: ActivityState
  sleep?: SleepState
  grip?: GripState
  waist?: WaistState
  diet?: DietState
}

export interface LifestyleFactorResult {
  factor: string
  label: string
  state: string
  /** この因子による年齢オフセット（+ 老化 / − 若年方向） */
  deltaAge: number
  hr: number
  source: string
}

export interface LifestyleResult {
  /** 採血 clock とは分離した「生活補正レイヤー」の合計 Δage */
  totalDelta: number
  breakdown: LifestyleFactorResult[]
}

/* ── PersonalityType（10 種） ─────────────────────────────────── */

export type PersonalityTypeId =
  | 'kidney_caution' // 腎機能注意型（最優先・ASP 非表示トリガ）
  | 'accelerated' // 加速老化型
  | 'rejuvenated' // 若返り型
  | 'inflammation' // 炎症優位型
  | 'metabolic' // 代謝悪化型
  | 'nutrition' // 栄養不足型
  | 'immune' // 免疫低下型
  | 'liver_bone' // 肝・骨負荷型
  | 'anemia' // 貧血傾向型
  | 'standard' // 加齢標準型（default）

export interface PersonalityType {
  id: PersonalityTypeId
  name: string
  emoji: string
  desc: string
  /** ASP 推奨カードを隠すべきか（腎機能注意型のみ true） */
  hideAsp: boolean
}

/* ── オーケストレータの最終出力 ──────────────────────────────── */

export interface BiologicalAgeResult {
  age: number
  /** 採血ベースの合成生物年齢（PhenoAge〔+ 将来 KDM〕） */
  bloodAge: SynthesizedAge
  /** 個別 clock 結果（UI 併記・デバッグ用） */
  clocks: {
    phenoAge: ClockResult
    kdm: ClockResult
  }
  /** 生活補正レイヤー（採血値は改変しない・分離表示） */
  lifestyle: LifestyleResult | null
  /** 生活習慣を加味した参考年齢（bloodAge.value + lifestyle.totalDelta） */
  lifestyleAdjustedAge: number | null
  /** personality 判定 */
  personality: PersonalityType
  /** クレアチニンが性別正常範囲を超えているか（ASP 非表示判定） */
  creatinineAbnormal: boolean
  /** どの入力に人口平均 fallback を使ったか */
  imputed: { crp: boolean; rdw: boolean }
}

/* ──────────────────────────────────────────────────────────────────
 * 定数
 * ────────────────────────────────────────────────────────────────── */

/** 単位変換係数 */
const ALBUMIN_GDL_TO_GL = 10
const CREATININE_MGDL_TO_UMOLL = 88.4
const GLUCOSE_MGDL_TO_MMOLL = 18.0

/** CRP の ln エラー回避クランプ（mg/dL・検出下限相当） */
const CRP_FLOOR_MGDL = 0.01

/** 人口平均 fallback（CRP/RDW 未入力時）— NHANES 成人中央値近傍 */
const CRP_POPULATION_MEAN_MGDL = 0.15 // ≈ 1.5 mg/L
const RDW_POPULATION_MEAN_PCT = 13.0

/**
 * Levine 2018 PhenoAge 係数（dayoonkwon/BioAge phenoage_calc.R orig==TRUE）
 * xb の各項の係数。CRP は ln(crp_mgdL)。
 */
const PHENOAGE_COEF = {
  intercept: -19.90667,
  albumin_gL: -0.03359355,
  creatinine_umolL: 0.009506491,
  glucose_mmolL: 0.1953192,
  ln_crp: 0.09536762,
  lymphocyte_pct: -0.01199984,
  mcv_fL: 0.02676401,
  rdw_pct: 0.3306156,
  alp_UL: 0.001868778,
  wbc_10_9L: 0.05542406,
  age: 0.08035356,
} as const

/** Gompertz 変換定数（BioAge 実装と一致） */
const MORT_A = -1.51714 // = exp(0.0076927 * 120) - 1
const MORT_GAMMA = 0.007692696
const PHENO_B0 = 141.50225
const PHENO_B1 = -0.0055305
const PHENO_B2 = 0.090165

/** クレアチニン性別正常上限 mg/dL（健診標準）— 超過で腎機能注意 */
const CREATININE_UPPER = { male: 1.07, female: 0.79 } as const

/** 生活補正：MRDT（死亡率倍加時間・年） */
const MRDT_YEARS = 8

/**
 * 生活因子の全死因 HR（査読コホート）。Δage = ln(HR)/ln(2) × MRDT で歳数換算。
 * 過大表現を避けるため保守的な HR を採用し、各因子に上限クランプをかける。
 */
const LIFESTYLE_FACTORS: Record<
  keyof LifestyleInput,
  {
    label: string
    states: Record<string, { hr: number; label: string }>
    source: string
  }
> = {
  smoking: {
    label: '喫煙',
    states: {
      never: { hr: 1.0, label: '吸わない' },
      former: { hr: 1.1, label: '過去に喫煙' },
      current: { hr: 1.43, label: '現在喫煙' }, // 非喫煙 HR 0.70 の逆数
    },
    source: 'UK Biobank / 全死因コホート（非喫煙 HR 0.70）',
  },
  activity: {
    label: '身体活動',
    states: {
      inactive: { hr: 1.0, label: '運動習慣なし' },
      moderate: { hr: 0.85, label: '週に数回' },
      active: { hr: 0.70, label: '週 150 分以上' }, // 保守的採用（高活動 HR 0.54 より控えめ）
    },
    source: 'PMC9979572 / UK Biobank（活動量と全死因）',
  },
  sleep: {
    label: '睡眠',
    states: {
      poor: { hr: 1.0, label: '不規則・寝不足' },
      good: { hr: 0.82, label: '規則的で回復的' },
    },
    source: '回復的睡眠 HR 0.82（多変量調整コホート）',
  },
  grip: {
    label: '握力・歩行速度',
    states: {
      weak: { hr: 1.17, label: '弱い' }, // 1 SD 低下 HR 1.17
      normal: { hr: 1.0, label: '標準' },
      strong: { hr: 0.88, label: '強い' },
    },
    source: 'NHANES PMC10541216 / Tromsø PMC5136688（握力 1SD 低下 HR 1.17）',
  },
  waist: {
    label: '腹囲・座位時間',
    states: {
      normal: { hr: 1.0, label: '標準' },
      high: { hr: 1.33, label: '高め・座位過多' }, // 座位過多 HR 1.33
    },
    source: 'PMC9979572（座位過多 HR 1.33）',
  },
  diet: {
    label: '食事',
    states: {
      standard: { hr: 1.0, label: '標準的' },
      anti_inflammatory: { hr: 0.85, label: '抗炎症・地中海式寄り' }, // 控えめ採用
    },
    source: 'PMC11439248（食事の質と生物年齢・NHANES 1999-2018）',
  },
}

/** 1 因子あたりの Δage 上限（過大表現回避） */
const LIFESTYLE_DELTA_CAP = 5
/** 生活補正合計の上限 */
const LIFESTYLE_TOTAL_CAP = 8

/* ──────────────────────────────────────────────────────────────────
 * 単位変換
 * ────────────────────────────────────────────────────────────────── */

export function toSI(input: PhenoAgeInput): {
  si: PhenoAgeSI
  imputed: { crp: boolean; rdw: boolean }
} {
  const crpRaw = input.crp_mgdL
  const rdwRaw = input.rdw_pct
  const crpImputed = crpRaw == null || Number.isNaN(crpRaw)
  const rdwImputed = rdwRaw == null || Number.isNaN(rdwRaw)

  const crp = crpImputed ? CRP_POPULATION_MEAN_MGDL : (crpRaw as number)
  const rdw = rdwImputed ? RDW_POPULATION_MEAN_PCT : (rdwRaw as number)

  return {
    si: {
      age: input.age,
      albumin_gL: input.albumin_gdL * ALBUMIN_GDL_TO_GL,
      creatinine_umolL: input.creatinine_mgdL * CREATININE_MGDL_TO_UMOLL,
      glucose_mmolL: input.glucose_mgdL / GLUCOSE_MGDL_TO_MMOLL,
      crp_mgdL: Math.max(crp, CRP_FLOOR_MGDL), // ln エラー回避クランプ
      lymphocyte_pct: input.lymphocyte_pct,
      mcv_fL: input.mcv_fL,
      rdw_pct: rdw,
      alp_UL: input.alp_UL,
      wbc_10_9L: input.wbc_10_3uL, // ×10³/µL ≡ ×10⁹/L（1:1）
    },
    imputed: { crp: crpImputed, rdw: rdwImputed },
  }
}

/* ──────────────────────────────────────────────────────────────────
 * PhenoAge（Levine 2018）
 * ────────────────────────────────────────────────────────────────── */

/** 内部用：mortality score を含む生計算結果 */
function phenoAgeRaw(si: PhenoAgeSI): { phenoAge: number; mortScore: number } {
  const c = PHENOAGE_COEF
  const xb =
    c.intercept +
    c.albumin_gL * si.albumin_gL +
    c.creatinine_umolL * si.creatinine_umolL +
    c.glucose_mmolL * si.glucose_mmolL +
    c.ln_crp * Math.log(si.crp_mgdL) +
    c.lymphocyte_pct * si.lymphocyte_pct +
    c.mcv_fL * si.mcv_fL +
    c.rdw_pct * si.rdw_pct +
    c.alp_UL * si.alp_UL +
    c.wbc_10_9L * si.wbc_10_9L +
    c.age * si.age

  // mortality score（内部のみ・UI に出さない）
  const mortScore = 1 - Math.exp((MORT_A * Math.exp(xb)) / MORT_GAMMA)

  // Gompertz 変換 → 生物年齢（歳）
  const phenoAge = Math.log(PHENO_B1 * Math.log(1 - mortScore)) / PHENO_B2 + PHENO_B0

  return { phenoAge, mortScore }
}

/**
 * PhenoAge を ClockResult として返す。
 * confidence は単一 clock 基準 0.7、CRP/RDW を fallback した分だけ下げる。
 * 区間半幅は confidence 低下に連動して広がる（項目が埋まると狭まる演出に対応）。
 */
export function calculatePhenoAge(
  si: PhenoAgeSI,
  imputed: { crp: boolean; rdw: boolean }
): ClockResult {
  const { phenoAge } = phenoAgeRaw(si)
  const value = round1(phenoAge)

  let confidence = 0.7
  if (imputed.crp) confidence -= 0.1
  if (imputed.rdw) confidence -= 0.1
  confidence = clamp(confidence, 0.4, 1)

  // 半幅: 基準 ±2.5、fallback 1 件ごとに +1.0
  const imputedCount = (imputed.crp ? 1 : 0) + (imputed.rdw ? 1 : 0)
  const halfWidth = round1(2.5 + imputedCount * 1.0)

  return {
    available: true,
    value,
    lower: round1(value - halfWidth),
    upper: round1(value + halfWidth),
    halfWidth,
    confidence,
    delta: round1(value - si.age),
  }
}

/* ──────────────────────────────────────────────────────────────────
 * KDM（第 2 clock）— 数学エンジンは実装済み／係数は後差し
 * ────────────────────────────────────────────────────────────────── */

/** KDM 1 biomarker の参照回帰パラメータ（対年齢回帰） */
export interface KdmBiomarkerParam {
  /** slope（k）対年齢 */
  k: number
  /** intercept（q） */
  q: number
  /** 残差 SD（s） */
  s: number
  /** 入力からこの biomarker 値を取り出す関数 */
  pick: (si: PhenoAgeSI) => number
}

export interface KdmReference {
  /** 性別ごとの biomarker パラメータ */
  params: Record<Sex, Record<string, KdmBiomarkerParam>>
  /** 生物年齢残差 SD（s_BA） */
  sBA: Record<Sex, number>
}

/**
 * 🚨 KDM 係数は「移植可能な公開定数」が存在しない（学習集団から都度導出）。
 * NHANES III 学習結果が入手でき次第ここに差し込む。null の間は KDM は available:false。
 * 差し込み時の出典: dayoonkwon/BioAge kdm_calc（kdm$fit$<sex> の k/q/s, s_ba2）。
 */
export const KDM_REFERENCE: KdmReference | null = null

/**
 * KDM 生物年齢（Klemera-Doubal）。
 * BA_E = [ Σ (x−q)(k/s²) + CA/s_BA² ] / [ Σ (k/s²) + 1/s_BA² ]
 * KDM_REFERENCE が null の間は available:false（合成で confidence=0）。
 */
export function calculateKDM(si: PhenoAgeSI, sex: Sex): ClockResult {
  const ref = KDM_REFERENCE
  if (!ref) {
    return {
      available: false,
      value: NaN,
      lower: NaN,
      upper: NaN,
      halfWidth: NaN,
      confidence: 0,
      delta: NaN,
    }
  }

  const params = ref.params[sex]
  const sBA2 = ref.sBA[sex] ** 2

  let num = 0
  let den = 0
  for (const key of Object.keys(params)) {
    const p = params[key]
    const x = p.pick(si)
    const w = p.k / (p.s * p.s)
    num += (x - p.q) * w
    den += p.k * w
  }
  num += si.age / sBA2
  den += 1 / sBA2

  const value = round1(num / den)
  // s_BA を区間半幅の近似に使う（研究指標としての不確実性）
  const halfWidth = round1(ref.sBA[sex])
  return {
    available: true,
    value,
    lower: round1(value - halfWidth),
    upper: round1(value + halfWidth),
    halfWidth,
    confidence: 0.7,
    delta: round1(value - si.age),
  }
}

/* ──────────────────────────────────────────────────────────────────
 * 2 clock 合成（confidence 重み付き・区間は逆分散合成）
 * ────────────────────────────────────────────────────────────────── */

/**
 * 利用可能な clock を confidence 重みで合成。
 * KDM が available になると自動で 2 clock 合成になり、区間が狭まる（逆分散合成）。
 * 生活補正(T3)の有無で precisionTier を high→max に上げる。
 */
export function synthesize(
  clocks: { name: string; result: ClockResult }[],
  hasLifestyle: boolean
): SynthesizedAge {
  const usable = clocks.filter((c) => c.result.available && c.result.confidence > 0)

  if (usable.length === 0) {
    return { value: NaN, lower: NaN, upper: NaN, halfWidth: NaN, clocks: [], tier: 'standard' }
  }

  // 点推定: confidence 重み付き平均
  const wSum = usable.reduce((s, c) => s + c.result.confidence, 0)
  const value = round1(usable.reduce((s, c) => s + c.result.value * c.result.confidence, 0) / wSum)

  // 区間: 逆分散合成（半幅を SD 近似として扱う） halfWidth_combined = 1/sqrt(Σ 1/h²)
  const invVar = usable.reduce((s, c) => s + 1 / (c.result.halfWidth * c.result.halfWidth), 0)
  const halfWidth = round1(1 / Math.sqrt(invVar))

  // 精度ティア: 2 clock 揃えば high、さらに生活補正があれば max
  let tier: PrecisionTier = 'standard'
  if (usable.length >= 2) tier = hasLifestyle ? 'max' : 'high'
  else if (hasLifestyle) tier = 'high'

  return {
    value,
    lower: round1(value - halfWidth),
    upper: round1(value + halfWidth),
    halfWidth,
    clocks: usable.map((c) => c.name),
    tier,
  }
}

/* ──────────────────────────────────────────────────────────────────
 * 生活補正（T3）
 * ────────────────────────────────────────────────────────────────── */

function hrToDeltaAge(hr: number): number {
  // Δage = ln(HR)/ln(2) × MRDT
  const d = (Math.log(hr) / Math.log(2)) * MRDT_YEARS
  return clamp(d, -LIFESTYLE_DELTA_CAP, LIFESTYLE_DELTA_CAP)
}

export function calculateLifestyle(input: LifestyleInput): LifestyleResult | null {
  const keys = Object.keys(input) as (keyof LifestyleInput)[]
  const provided = keys.filter((k) => input[k] != null)
  if (provided.length === 0) return null

  const breakdown: LifestyleFactorResult[] = []
  for (const key of provided) {
    const def = LIFESTYLE_FACTORS[key]
    const state = input[key] as string
    const stateDef = def.states[state]
    if (!stateDef) continue
    breakdown.push({
      factor: key,
      label: def.label,
      state: stateDef.label,
      deltaAge: round1(hrToDeltaAge(stateDef.hr)),
      hr: stateDef.hr,
      source: def.source,
    })
  }

  const rawTotal = breakdown.reduce((s, b) => s + b.deltaAge, 0)
  const totalDelta = round1(clamp(rawTotal, -LIFESTYLE_TOTAL_CAP, LIFESTYLE_TOTAL_CAP))
  return { totalDelta, breakdown }
}

/* ──────────────────────────────────────────────────────────────────
 * PersonalityType 判定（10 種・腎機能注意型を最優先）
 * ────────────────────────────────────────────────────────────────── */

const PERSONALITY_DEFS: Record<PersonalityTypeId, Omit<PersonalityType, 'id'>> = {
  kidney_caution: {
    name: '腎機能注意型',
    emoji: '🩺',
    desc: 'クレアチニン値が性別の正常範囲を超えています。腎機能の評価は医療機関での検査が必要です。',
    hideAsp: true,
  },
  accelerated: {
    name: '加速老化型',
    emoji: '🔥',
    desc: '採血ベースの生物年齢が実年齢より高めです。生活習慣の見直し余地が大きいタイプ。',
    hideAsp: false,
  },
  rejuvenated: {
    name: '若返り型',
    emoji: '✨',
    desc: '採血ベースの生物年齢が実年齢より低め。ベンチマークとして優秀なタイプ。',
    hideAsp: false,
  },
  inflammation: {
    name: '炎症優位型',
    emoji: '🌡️',
    desc: 'CRP・白血球が高め、リンパ球率が低めで、慢性炎症の傾向が出やすいタイプ。',
    hideAsp: false,
  },
  metabolic: {
    name: '代謝悪化型',
    emoji: '🍞',
    desc: '血糖・ALP が高めで、代謝面の指標に余地が出やすいタイプ。',
    hideAsp: false,
  },
  nutrition: {
    name: '栄養不足型',
    emoji: '🥗',
    desc: 'アルブミンが低めで MCV・RDW が高め。タンパク質・B 群の充足を振り返る余地があるタイプ。',
    hideAsp: false,
  },
  immune: {
    name: '免疫低下型',
    emoji: '🛡️',
    desc: '白血球・リンパ球率がともに低め。免疫・疲労面を気にかける余地があるタイプ。',
    hideAsp: false,
  },
  liver_bone: {
    name: '肝・骨負荷型',
    emoji: '🦴',
    desc: 'ALP が高くアルブミンが低め。肝・骨のターンオーバーに関わる指標に特徴が出るタイプ。',
    hideAsp: false,
  },
  anemia: {
    name: '貧血傾向型',
    emoji: '🩸',
    desc: 'RDW が高めで赤血球サイズのばらつき傾向。鉄・B12・葉酸を振り返る余地があるタイプ。',
    hideAsp: false,
  },
  standard: {
    name: '加齢標準型',
    emoji: '📊',
    desc: '各指標がおおむね年齢相応の範囲。大きな偏りは見られないタイプ。',
    hideAsp: false,
  },
}

export function isCreatinineAbnormal(creatinine_mgdL: number, sex: Sex): boolean {
  return creatinine_mgdL > CREATININE_UPPER[sex]
}

/**
 * biomarker パターン + 生物年齢差から 10 種を判定。
 * 優先順位: 腎機能注意 > 病態系（炎症/代謝/栄養/免疫/肝骨/貧血） > 加速/若返り > 標準
 *
 * 病態パターンを delta 判定より先に置く理由: headline の「±N 歳」は常に大きく表示され
 * 感情的ペイオフはそちらが担うため、personality type は ASP につながる具体的アクション軸
 * （炎症なら omega3/curcumin 等）を優先して surface する方が事業目的と整合する。
 */
export function determinePersonality(
  input: PhenoAgeInput,
  phenoDelta: number
): PersonalityType {
  const make = (id: PersonalityTypeId): PersonalityType => ({ id, ...PERSONALITY_DEFS[id] })

  // 1. 腎機能注意型（最優先・ASP 非表示）
  if (isCreatinineAbnormal(input.creatinine_mgdL, input.sex)) return make('kidney_caution')

  // 各 biomarker の「高め/低め」フラグ（kotoba 数値閾値リファレンス）
  const crp = input.crp_mgdL ?? CRP_POPULATION_MEAN_MGDL
  const rdw = input.rdw_pct ?? RDW_POPULATION_MEAN_PCT
  const crpHigh = crp > 0.3
  const wbcHigh = input.wbc_10_3uL > 7.0
  const wbcLow = input.wbc_10_3uL < 3.5
  const lymphLow = input.lymphocyte_pct < 25
  const glucoseHigh = input.glucose_mgdL > 100
  const alpHigh = input.alp_UL > 100
  const albuminLow = input.albumin_gdL < 4.0
  const mcvHigh = input.mcv_fL > 95
  const rdwHigh = rdw > 13.0

  // 2. 病態パターン（顕著なもの・ASP アクション軸を優先 surface）
  if (crpHigh && wbcHigh && lymphLow) return make('inflammation')
  if (glucoseHigh && alpHigh) return make('metabolic')
  if (albuminLow && mcvHigh && rdwHigh) return make('nutrition')
  if (wbcLow && lymphLow) return make('immune')
  if (alpHigh && albuminLow) return make('liver_bone')
  if (rdwHigh) return make('anemia')

  // 3. 病態パターンが立たない場合は総合 delta で加速/若返り
  if (phenoDelta > 5) return make('accelerated')
  if (phenoDelta < -3) return make('rejuvenated')

  // 4. 標準
  return make('standard')
}

/* ──────────────────────────────────────────────────────────────────
 * オーケストレータ
 * ────────────────────────────────────────────────────────────────── */

export function computeBiologicalAge(
  input: PhenoAgeInput,
  lifestyle?: LifestyleInput
): BiologicalAgeResult {
  const { si, imputed } = toSI(input)

  const phenoAge = calculatePhenoAge(si, imputed)
  const kdm = calculateKDM(si, input.sex)

  const lifestyleResult = lifestyle ? calculateLifestyle(lifestyle) : null
  const hasLifestyle = lifestyleResult != null

  const bloodAge = synthesize(
    [
      { name: 'PhenoAge', result: phenoAge },
      { name: 'KDM', result: kdm },
    ],
    hasLifestyle
  )

  const personality = determinePersonality(input, phenoAge.delta)
  const creatinineAbnormal = isCreatinineAbnormal(input.creatinine_mgdL, input.sex)

  const lifestyleAdjustedAge =
    lifestyleResult != null ? round1(bloodAge.value + lifestyleResult.totalDelta) : null

  return {
    age: input.age,
    bloodAge,
    clocks: { phenoAge, kdm },
    lifestyle: lifestyleResult,
    lifestyleAdjustedAge,
    personality,
    creatinineAbnormal,
    imputed,
  }
}

/* ──────────────────────────────────────────────────────────────────
 * util
 * ────────────────────────────────────────────────────────────────── */

function round1(n: number): number {
  return Math.round(n * 10) / 10
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n))
}
