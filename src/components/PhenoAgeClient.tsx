'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  Activity,
  AlertCircle,
  Award,
  Check,
  ChevronRight,
  Droplet,
  Footprints,
  HeartPulse,
  Info,
  Microscope,
  Moon,
  RotateCcw,
  Sparkles,
  Stethoscope,
  Target,
  TrendingDown,
  Utensils,
  Wind,
  Zap,
} from 'lucide-react'
import {
  computeBiologicalAge,
  type ActivityState,
  type BiologicalAgeResult,
  type DietState,
  type GripState,
  type LifestyleInput,
  type PersonalityTypeId,
  type PhenoAgeInput,
  type PrecisionTier,
  type Sex,
  type SleepState,
  type SmokingState,
  type WaistState,
} from '@/lib/phenoage'

type Phase = 'idle' | 'calculating' | 'revealed'

/* ─── localStorage 保存（マイページ集約） ─────────────────────────── */

const PHENOAGE_RESULTS_KEY = 'scibase_phenoage_results'
const MAX_HISTORY = 3

export interface SavedPhenoAgeResult {
  savedAt: string // ISO
  age: number
  sex: Sex
  bioAge: number
  lower: number
  upper: number
  delta: number
  lifestyleAdjustedAge: number | null
  tier: PrecisionTier
  personality: { id: PersonalityTypeId; emoji: string; name: string }
  /** CRP/RDW の任意入力数（0–2） */
  optionalCount: number
  lifestyleCount: number
}

/* ─── useCountUp hook (ease-out cubic・小数 1 桁対応) ─────────────── */

function useCountUp(target: number, duration = 1200, delay = 0, enabled = true): number {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)
  useEffect(() => {
    if (!enabled) {
      setValue(target)
      return
    }
    const startTimer = setTimeout(() => {
      const start = performance.now()
      const range = target
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        setValue(range * eased)
        if (t < 1) rafRef.current = requestAnimationFrame(step)
      }
      rafRef.current = requestAnimationFrame(step)
    }, delay)
    return () => {
      clearTimeout(startTimer)
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration, delay, enabled])
  return value
}

/* ─── PersonalityType ごとの配色 ─────────────────────────────────── */

const PERSONALITY_COLOR: Record<PersonalityTypeId, string> = {
  kidney_caution: 'from-slate-600 to-slate-700',
  accelerated: 'from-orange-500 to-rose-500',
  rejuvenated: 'from-emerald-500 to-teal-500',
  inflammation: 'from-rose-500 to-orange-500',
  metabolic: 'from-amber-500 to-orange-500',
  nutrition: 'from-lime-500 to-emerald-500',
  immune: 'from-sky-500 to-indigo-500',
  liver_bone: 'from-violet-500 to-purple-500',
  anemia: 'from-rose-500 to-pink-500',
  standard: 'from-slate-500 to-slate-600',
}

/* ─── PersonalityType → 成分マッピング（中立 ASP 動線） ─────────────
 * 全 slug は data.ts 実在確認済（2026-06-10）。効果の断定・数値化はしない。
 * kidney_caution はこの map に存在しない（hideAsp 分岐 + map 不在の二重ガード）。 */

export interface PersonalityActionDef {
  contextJa: string
  ingredients: { slug: string; labelJa: string; hintJa: string }[]
}

export const PERSONALITY_ACTION: Partial<Record<PersonalityTypeId, PersonalityActionDef>> = {
  inflammation: {
    contextJa: 'CRP・白血球・リンパ球率など炎症関連の指標に特徴が出たタイプの方が、摂取を検討するケースが多い成分です。',
    ingredients: [
      { slug: 'omega3', labelJa: 'オメガ3（EPA・DHA）', hintJa: 'EPA・DHA と炎症マーカーの関係は RCT・メタ解析の蓄積が厚い領域' },
      { slug: 'curcumin', labelJa: 'クルクミン', hintJa: 'CRP などの炎症指標を評価した RCT が複数あるポリフェノール' },
      { slug: 'quercetin', labelJa: 'ケルセチン', hintJa: '炎症・抗酸化の研究文脈で読まれるフラボノイド' },
    ],
  },
  metabolic: {
    contextJa: '血糖・ALP など代謝関連の指標に特徴が出たタイプの方が、摂取を検討するケースが多い成分です。',
    ingredients: [
      { slug: 'berberine', labelJa: 'ベルベリン', hintJa: '血糖関連指標を評価した RCT・メタ解析が蓄積する植物アルカロイド' },
      { slug: 'alpha-lipoic-acid', labelJa: 'アルファリポ酸（ALA）', hintJa: '糖代謝・抗酸化の研究文脈で読まれる補酵素様物質' },
      { slug: 'cinnamon-extract', labelJa: 'シナモン抽出物', hintJa: '血糖関連指標を評価した研究が複数あるスパイス由来素材' },
    ],
  },
  nutrition: {
    contextJa: 'アルブミン・MCV・RDW にタンパク質や B 群を振り返る特徴が出たタイプの方が、摂取を検討するケースが多い成分です。',
    ingredients: [
      { slug: 'whey-protein-isolate', labelJa: 'ホエイプロテイン（WPI）', hintJa: 'タンパク質補給の定番で、摂取試験の蓄積が厚い' },
      { slug: 'collagen-peptide', labelJa: 'コラーゲンペプチド', hintJa: '経口摂取の RCT が蓄積するペプチド素材' },
      { slug: 'vitamin-b12', labelJa: 'ビタミンB12', hintJa: 'MCV が高めの文脈で振り返られることが多い B 群' },
    ],
  },
  immune: {
    contextJa: '白血球・リンパ球率が低めに出たタイプの方が、摂取を検討するケースが多い成分です。',
    ingredients: [
      { slug: 'vitamin-d', labelJa: 'ビタミンD', hintJa: '免疫関連の研究が広く蓄積する脂溶性ビタミン' },
      { slug: 'zinc', labelJa: '亜鉛', hintJa: '免疫機能との関連研究が多い必須ミネラル' },
      { slug: 'reishi', labelJa: '霊芝（レイシ）', hintJa: '伝統利用が長く、近年は臨床研究も進むキノコ素材' },
    ],
  },
  liver_bone: {
    contextJa: 'ALP・アルブミンなど肝・骨のターンオーバーに関わる指標に特徴が出たタイプの方が、摂取を検討するケースが多い成分です。',
    ingredients: [
      { slug: 'vitamin-k2', labelJa: 'ビタミンK2', hintJa: '骨代謝マーカーを評価した研究が蓄積' },
      { slug: 'vitamin-d', labelJa: 'ビタミンD', hintJa: '骨・カルシウム代謝の研究の基本となるビタミン' },
      { slug: 'nac', labelJa: 'NAC（N-アセチルシステイン）', hintJa: 'グルタチオン前駆体として肝関連の研究文脈で読まれる' },
    ],
  },
  anemia: {
    contextJa: 'RDW が高めで赤血球サイズのばらつき傾向が出たタイプの方が、摂取を検討するケースが多い成分です。',
    ingredients: [
      { slug: 'iron', labelJa: '鉄', hintJa: '造血に関わる必須ミネラル。過剰摂取リスクもあるため検査値との照合が前提' },
      { slug: 'vitamin-b12', labelJa: 'ビタミンB12', hintJa: '赤血球サイズ（MCV・RDW）の文脈で振り返られる B 群' },
      { slug: 'folic-acid', labelJa: '葉酸', hintJa: '赤血球の形成に関わる水溶性ビタミン' },
    ],
  },
  accelerated: {
    contextJa: '採血ベースの生物年齢が実年齢より高めに出たタイプの方が、摂取を検討するケースが多い成分です。',
    ingredients: [
      { slug: 'nmn', labelJa: 'NMN', hintJa: 'NAD+ 前駆体としてヒト試験が進行中の素材' },
      { slug: 'curcumin', labelJa: 'クルクミン', hintJa: '炎症指標を評価した RCT が複数あるポリフェノール' },
      { slug: 'omega3', labelJa: 'オメガ3（EPA・DHA）', hintJa: '炎症・脂質関連の RCT・メタ解析の蓄積が厚い' },
    ],
  },
  rejuvenated: {
    contextJa: '指標は良好です。現在の状態の維持を意識する方が、摂取を検討するケースが多い成分です。',
    ingredients: [
      { slug: 'vitamin-d', labelJa: 'ビタミンD', hintJa: '基本の健康維持の文脈で広く研究される脂溶性ビタミン' },
      { slug: 'omega3', labelJa: 'オメガ3（EPA・DHA）', hintJa: '心血管・脂質関連の研究が蓄積' },
    ],
  },
  standard: {
    contextJa: '大きな偏りはないタイプです。加齢研究の文脈で読まれることが多い成分です。',
    ingredients: [
      { slug: 'nmn', labelJa: 'NMN', hintJa: 'NAD+ 前駆体としてヒト試験が進行中の素材' },
      { slug: 'resveratrol', labelJa: 'レスベラトロール', hintJa: 'サーチュイン研究の文脈で知られるポリフェノール' },
    ],
  },
}

/* ─── 健診マーカー定義（T1 必須 7 + 任意 2） ───────────────────────── */

interface MarkerDef {
  key: keyof PhenoAgeInput
  labelJa: string
  unit: string
  placeholder: string
  rangeJa: string
  optional?: boolean
  step: number
}

const CORE_MARKERS: MarkerDef[] = [
  { key: 'albumin_gdL', labelJa: 'アルブミン', unit: 'g/dL', placeholder: '4.5', rangeJa: '基準 4.1–5.1', step: 0.1 },
  { key: 'creatinine_mgdL', labelJa: 'クレアチニン', unit: 'mg/dL', placeholder: '0.8', rangeJa: '基準 男0.65–1.07 / 女0.46–0.79', step: 0.01 },
  { key: 'glucose_mgdL', labelJa: '空腹時血糖', unit: 'mg/dL', placeholder: '90', rangeJa: '基準 70–100', step: 1 },
  { key: 'lymphocyte_pct', labelJa: 'リンパ球率', unit: '%', placeholder: '32', rangeJa: '基準 20–40', step: 0.1 },
  { key: 'mcv_fL', labelJa: 'MCV（赤血球容積）', unit: 'fL', placeholder: '90', rangeJa: '基準 85–100', step: 0.1 },
  { key: 'alp_UL', labelJa: 'ALP', unit: 'U/L', placeholder: '70', rangeJa: '基準 38–113（IFCC）', step: 1 },
  { key: 'wbc_10_3uL', labelJa: '白血球数（WBC）', unit: '×10³/µL', placeholder: '5.5', rangeJa: '基準 3.3–8.6', step: 0.1 },
]

const OPTIONAL_MARKERS: MarkerDef[] = [
  { key: 'crp_mgdL', labelJa: 'CRP', unit: 'mg/dL', placeholder: '0.05', rangeJa: '基準 0.30 未満・任意', optional: true, step: 0.01 },
  { key: 'rdw_pct', labelJa: 'RDW（赤血球分布幅）', unit: '%', placeholder: '13.0', rangeJa: '基準 11.0–14.5・任意', optional: true, step: 0.1 },
]

/* ─── 生活習慣設問（T3・6 問） ─────────────────────────────────── */

interface LifestyleQuestion {
  key: keyof LifestyleInput
  labelJa: string
  icon: typeof Wind
  options: { value: string; labelJa: string }[]
}

const LIFESTYLE_QUESTIONS: LifestyleQuestion[] = [
  {
    key: 'smoking',
    labelJa: '喫煙',
    icon: Wind,
    options: [
      { value: 'never', labelJa: '吸わない' },
      { value: 'former', labelJa: '過去に喫煙' },
      { value: 'current', labelJa: '現在喫煙' },
    ],
  },
  {
    key: 'activity',
    labelJa: '運動習慣',
    icon: Activity,
    options: [
      { value: 'inactive', labelJa: '運動しない' },
      { value: 'moderate', labelJa: '週に数回' },
      { value: 'active', labelJa: '週150分以上' },
    ],
  },
  {
    key: 'sleep',
    labelJa: '睡眠',
    icon: Moon,
    options: [
      { value: 'poor', labelJa: '不規則・寝不足' },
      { value: 'good', labelJa: '規則的で回復的' },
    ],
  },
  {
    key: 'grip',
    labelJa: '握力・歩行速度',
    icon: Footprints,
    options: [
      { value: 'weak', labelJa: '弱い' },
      { value: 'normal', labelJa: '標準' },
      { value: 'strong', labelJa: '強い' },
    ],
  },
  {
    key: 'waist',
    labelJa: '腹囲・座位時間',
    icon: HeartPulse,
    options: [
      { value: 'normal', labelJa: '標準' },
      { value: 'high', labelJa: '高め・座りがち' },
    ],
  },
  {
    key: 'diet',
    labelJa: '食事',
    icon: Utensils,
    options: [
      { value: 'standard', labelJa: '標準的' },
      { value: 'anti_inflammatory', labelJa: '野菜・魚中心' },
    ],
  },
]

/* ─── PrecisionMeter (sticky top・実 confidence に連動) ──────────── */

function PrecisionMeter({ percent }: { percent: number }) {
  const animated = useCountUp(percent, 700, 0, true)
  const display = Math.round(animated)
  const tier =
    display >= 90 ? '✨ 高精度' : display >= 70 ? '良いペース 👍' : display >= 40 ? '入力を進めましょう' : 'まずは基本情報から'
  const gradient =
    display >= 90 ? 'from-emerald-400 to-emerald-600' : display >= 70 ? 'from-amber-400 to-emerald-500' : 'from-slate-300 to-amber-400'
  return (
    <div className="sticky top-0 z-30 -mx-4 mb-6 border-b border-slate-200 bg-white/90 px-4 py-2 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-shrink-0 text-xs font-medium text-slate-700">入力精度</div>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full bg-gradient-to-r ${gradient} transition-[width] duration-500 ease-out`}
              style={{ width: `${Math.min(display, 100)}%` }}
            />
          </div>
          <div className="flex-shrink-0 text-xs font-bold text-slate-900">{display}%</div>
          <div className="hidden flex-shrink-0 text-xs font-medium text-slate-500 sm:block">{tier}</div>
        </div>
      </div>
    </div>
  )
}

/* ─── CalculationTheatre (1.8s 演出) ────────────────────────────── */

function CalculationTheatre({ onComplete }: { onComplete: () => void }) {
  const lines = ['炎症マーカーを解析中…', '代謝マーカーを解析中…', 'Levine 2018 係数で生物年齢を推定…', '生活習慣レイヤーを合成…']
  const [step, setStep] = useState(0)
  const animated = useCountUp(100, 1800, 0, true)
  const pct = Math.round(animated)
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s < lines.length ? s + 1 : s))
    }, 1800 / lines.length)
    const timer = setTimeout(() => onComplete(), 1850)
    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [onComplete, lines.length])
  return (
    <section className="mt-10 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-indigo-50/60 p-6 shadow-md sm:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <Zap className="h-5 w-5 animate-pulse text-indigo-600" />
          </div>
          <div>
            <div className="text-sm font-bold text-indigo-900 sm:text-base">解析中...</div>
            <div className="text-xs text-indigo-700">あなたの採血データから生物学的年齢を推定しています</div>
          </div>
        </div>
        <div className="text-2xl font-bold text-indigo-700 sm:text-3xl">{pct}%</div>
      </div>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-indigo-100">
        <div className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 transition-[width] duration-100 ease-out" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-5 space-y-2">
        {lines.map((l, i) => (
          <div key={l} className={`flex items-center gap-2 text-sm transition-opacity duration-300 ${step > i ? 'opacity-100' : 'opacity-30'}`}>
            <Check className={`h-4 w-4 flex-shrink-0 ${step > i ? 'text-indigo-600' : 'text-slate-300'}`} />
            <span className={step > i ? 'font-medium text-indigo-900' : 'text-slate-500'}>{l}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Main client ───────────────────────────────────────────────── */

export function PhenoAgeClient() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [phase, setPhase] = useState<Phase>('idle')

  const [age, setAge] = useState<number>(40)
  const [sex, setSex] = useState<Sex>('female')
  /* マーカーは文字列で保持（空欄を許容） */
  const [markers, setMarkers] = useState<Record<string, string>>({})
  const [lifestyle, setLifestyle] = useState<Partial<Record<keyof LifestyleInput, string>>>({})

  const [result, setResult] = useState<BiologicalAgeResult | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  /* 必須 7 項目がすべて数値で埋まっているか */
  const coreFilled = useMemo(
    () => CORE_MARKERS.every((m) => {
      const v = markers[m.key]
      return v != null && v !== '' && !Number.isNaN(Number(v))
    }),
    [markers]
  )

  const crpFilled = markers.crp_mgdL != null && markers.crp_mgdL !== '' && !Number.isNaN(Number(markers.crp_mgdL))
  const rdwFilled = markers.rdw_pct != null && markers.rdw_pct !== '' && !Number.isNaN(Number(markers.rdw_pct))
  const lifestyleCount = Object.values(lifestyle).filter((v) => v != null && v !== '').length

  /* 精度 = 基本 20 + コア 40 + CRP 10 + RDW 10 + 生活 20（実 confidence に連動） */
  const precision = useMemo(() => {
    let p = 20
    if (coreFilled) p += 40
    if (crpFilled) p += 10
    if (rdwFilled) p += 10
    if (lifestyleCount > 0) p += 20
    return Math.min(p, 100)
  }, [coreFilled, crpFilled, rdwFilled, lifestyleCount])

  const setMarker = (key: string, value: string) => setMarkers((prev) => ({ ...prev, [key]: value }))
  const setLifestyleAnswer = (key: keyof LifestyleInput, value: string) =>
    setLifestyle((prev) => ({ ...prev, [key]: prev[key] === value ? undefined : value }))

  const handleCalculate = () => {
    if (!coreFilled) {
      setStep(2)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const input: PhenoAgeInput = {
      age,
      sex,
      albumin_gdL: Number(markers.albumin_gdL),
      creatinine_mgdL: Number(markers.creatinine_mgdL),
      glucose_mgdL: Number(markers.glucose_mgdL),
      lymphocyte_pct: Number(markers.lymphocyte_pct),
      mcv_fL: Number(markers.mcv_fL),
      alp_UL: Number(markers.alp_UL),
      wbc_10_3uL: Number(markers.wbc_10_3uL),
      crp_mgdL: crpFilled ? Number(markers.crp_mgdL) : undefined,
      rdw_pct: rdwFilled ? Number(markers.rdw_pct) : undefined,
    }
    const lifestyleInput: LifestyleInput | undefined =
      lifestyleCount > 0
        ? {
            smoking: lifestyle.smoking as SmokingState | undefined,
            activity: lifestyle.activity as ActivityState | undefined,
            sleep: lifestyle.sleep as SleepState | undefined,
            grip: lifestyle.grip as GripState | undefined,
            waist: lifestyle.waist as WaistState | undefined,
            diet: lifestyle.diet as DietState | undefined,
          }
        : undefined

    const r = computeBiologicalAge(input, lifestyleInput)
    setResult(r)
    setPhase('calculating')
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  const handleReset = () => {
    setStep(1)
    setMarkers({})
    setLifestyle({})
    setResult(null)
    setPhase('idle')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* phase が revealed になったタイミングで localStorage に保存（最新 3 件履歴） */
  useEffect(() => {
    if (phase !== 'revealed' || !result) return
    try {
      const entry: SavedPhenoAgeResult = {
        savedAt: new Date().toISOString(),
        age: result.age,
        sex,
        bioAge: result.bloodAge.value,
        lower: result.bloodAge.lower,
        upper: result.bloodAge.upper,
        delta: result.clocks.phenoAge.delta,
        lifestyleAdjustedAge: result.lifestyleAdjustedAge,
        tier: result.bloodAge.tier,
        personality: { id: result.personality.id, emoji: result.personality.emoji, name: result.personality.name },
        optionalCount: (crpFilled ? 1 : 0) + (rdwFilled ? 1 : 0),
        lifestyleCount,
      }
      const raw = localStorage.getItem(PHENOAGE_RESULTS_KEY)
      const history: SavedPhenoAgeResult[] = raw ? JSON.parse(raw) : []
      localStorage.setItem(PHENOAGE_RESULTS_KEY, JSON.stringify([entry, ...history].slice(0, MAX_HISTORY)))
    } catch {
      /* localStorage 不可・隠匿モード等 */
    }
  }, [phase, result, sex, crpFilled, rdwFilled, lifestyleCount])

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
      {phase !== 'revealed' && <PrecisionMeter percent={precision} />}

      {/* Header */}
      <header className="mb-8 text-center">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
          <Droplet className="h-3.5 w-3.5" />
          健康診断の数値で測る
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">生物学的年齢チェッカー</h1>
        <p className="mt-3 text-sm text-slate-600 sm:text-base">
          Levine 2018（<i>Aging</i>）の PhenoAge 式をベースに、健診の採血 9 項目から「身体の年齢」の<strong>研究指標</strong>を概算します。
        </p>
      </header>

      {/* Stepper */}
      {phase === 'idle' && (
        <div className="mb-6 flex items-center justify-center gap-1.5 text-xs font-medium sm:text-sm">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex items-center">
              <button
                type="button"
                onClick={() => setStep(n as 1 | 2 | 3)}
                className={`flex h-7 w-7 items-center justify-center rounded-full transition ${
                  step === n ? 'bg-indigo-600 text-white shadow-sm' : step > n ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-500'
                }`}
              >
                {step > n ? <Check className="h-4 w-4" /> : n}
              </button>
              {n < 3 && <div className={`h-0.5 w-8 sm:w-12 ${step > n ? 'bg-indigo-300' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>
      )}

      {/* Step 1: 基本情報 */}
      {phase === 'idle' && step === 1 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
            <Sparkles className="h-5 w-5 text-indigo-600" />
            Step 1: 基本情報
          </h2>
          <div className="space-y-5">
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-700">実年齢</label>
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">
                <div className="flex items-center justify-center gap-5 sm:gap-6">
                  <button
                    type="button"
                    onClick={() => setAge(Math.max(18, age - 1))}
                    aria-label="1歳減らす"
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-2xl font-bold text-slate-500 shadow-sm transition hover:border-indigo-400 hover:text-indigo-600 active:scale-90"
                  >
                    −
                  </button>
                  <div className="flex items-baseline gap-1 tabular-nums">
                    <span className="text-5xl font-bold tracking-tight text-indigo-600 sm:text-6xl">{age}</span>
                    <span className="text-xl font-medium text-slate-500">歳</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAge(Math.min(100, age + 1))}
                    aria-label="1歳増やす"
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-2xl font-bold text-slate-500 shadow-sm transition hover:border-indigo-400 hover:text-indigo-600 active:scale-90"
                  >
                    ＋
                  </button>
                </div>
                <input
                  type="range"
                  min={18}
                  max={100}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  aria-label="年齢スライダー"
                  className="mt-5 w-full cursor-pointer accent-indigo-600"
                />
                <div className="relative mt-1.5 h-1 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="absolute h-full rounded-full bg-indigo-300" style={{ left: '26.8%', width: '48.8%' }} />
                </div>
                <div className="mt-1.5 flex justify-between text-[11px] text-slate-400">
                  <span>18</span>
                  <span className="font-medium text-indigo-500">40–80 が最も妥当</span>
                  <span>100</span>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-500">PhenoAge は 40–80 歳で最も妥当とされる研究指標です（若年層は低めに出る傾向）。</p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">性別</label>
              <div className="flex gap-2">
                {(['female', 'male'] as Sex[]).map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setSex(s)}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                      sex === s ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {s === 'female' ? '女性' : '男性'}
                  </button>
                ))}
              </div>
              <p className="mt-1.5 text-xs text-slate-500">クレアチニンの正常範囲判定に使います。</p>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
            >
              次へ <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* Step 2: 健診の採血値 */}
      {phase === 'idle' && step === 2 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-2 flex items-center gap-2 text-lg font-bold text-slate-900">
            <Droplet className="h-5 w-5 text-indigo-600" />
            Step 2: 健診の採血値
          </h2>
          <p className="mb-4 text-xs text-slate-600 sm:text-sm">
            お手元の健康診断結果から入力してください。下 7 項目が必須です。
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {CORE_MARKERS.map((m) => (
              <MarkerInput key={m.key} def={m} value={markers[m.key] ?? ''} onChange={(v) => setMarker(m.key, v)} />
            ))}
          </div>

          {/* 任意 2 項目（入力すると区間が狭まる） */}
          <div className="mt-5 rounded-xl border border-indigo-200 bg-indigo-50/40 p-4">
            <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-indigo-800">
              <TrendingDown className="h-3.5 w-3.5" />
              任意：入力すると推定の信頼区間が狭まります
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {OPTIONAL_MARKERS.map((m) => (
                <MarkerInput key={m.key} def={m} value={markers[m.key] ?? ''} onChange={(v) => setMarker(m.key, v)} />
              ))}
            </div>
            <p className="mt-2 text-xs text-indigo-700">未入力でも人口平均値で補完して計算できます（その分だけ区間が広がります）。</p>
          </div>

          {!coreFilled && (
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/70 p-3 text-xs leading-relaxed text-amber-800 sm:text-sm">
              <Info className="mr-1 inline h-3.5 w-3.5" />
              必須 7 項目をすべて入力すると計算できます。
            </div>
          )}

          <div className="mt-6 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              戻る
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
            >
              次へ <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* Step 3: 生活習慣 */}
      {phase === 'idle' && step === 3 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-2 flex items-center gap-2 text-lg font-bold text-slate-900">
            <Activity className="h-5 w-5 text-indigo-600" />
            Step 3: 生活習慣（任意）
          </h2>
          <p className="mb-4 text-xs text-slate-600 sm:text-sm">
            採血ベースの年齢に「生活習慣レイヤー」を重ねます。公開ハザード比から歳数換算した参考値です（採血の数値は変えません）。
          </p>

          <div className="space-y-4">
            {LIFESTYLE_QUESTIONS.map((q) => {
              const Icon = q.icon
              return (
                <div key={q.key}>
                  <div className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <Icon className="h-4 w-4 text-indigo-500" />
                    {q.labelJa}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {q.options.map((opt) => {
                      const selected = lifestyle[q.key] === opt.value
                      return (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() => setLifestyleAnswer(q.key, opt.value)}
                          className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
                            selected ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {opt.labelJa}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              戻る
            </button>
            <button
              type="button"
              onClick={handleCalculate}
              disabled={!coreFilled}
              aria-disabled={!coreFilled}
              className={`group relative inline-flex items-center gap-1.5 overflow-hidden rounded-lg px-6 py-3 text-sm font-bold shadow-md transition ${
                coreFilled
                  ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 hover:shadow-lg'
                  : 'cursor-not-allowed bg-slate-200 text-slate-400 shadow-none'
              }`}
            >
              {coreFilled && (
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              )}
              <Sparkles className="h-4 w-4" /> 生物学的年齢を計算する
            </button>
          </div>
        </section>
      )}

      {/* CalculationTheatre 1.8s */}
      {phase === 'calculating' && (
        <div ref={resultRef}>
          <CalculationTheatre onComplete={() => setPhase('revealed')} />
        </div>
      )}

      {/* Revealed */}
      {phase === 'revealed' && result && (
        <section ref={resultRef} className="space-y-5">
          <ResultHero result={result} />

          {result.personality.hideAsp ? (
            <KidneyCautionNotice />
          ) : (
            <>
              <IntervalCard result={result} />
              {result.lifestyle && result.lifestyleAdjustedAge != null && <LifestyleCard result={result} />}
              <ActionPlanSection result={result} />
            </>
          )}

          <CompletionCelebration result={result} />

          {/* マイページ保存通知 */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
            <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 text-slate-700">
                <Check className="h-3.5 w-3.5 text-indigo-600" />
                結果はブラウザに自動保存されました（最新 {MAX_HISTORY} 件まで）
              </div>
              <Link href="/my" className="inline-flex items-center gap-0.5 font-medium text-indigo-700 hover:underline">
                マイページで見る <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Profile recap + Reset */}
          <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-700 sm:text-sm">
            <span className="font-medium">あなたの条件：</span>
            {result.age} 歳・{sex === 'female' ? '女性' : '男性'}・採血 {coreFilled ? '7' : '0'}
            {crpFilled || rdwFilled ? `+${(crpFilled ? 1 : 0) + (rdwFilled ? 1 : 0)}` : ''} 項目
            {lifestyleCount > 0 && `・生活習慣 ${lifestyleCount} 問`}
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" /> 最初からやり直す
            </button>
          </div>

          {/* Disclaimer（YMYL 軽・本格 legal は S3） */}
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-xs leading-relaxed text-slate-700 sm:text-sm">
            <div className="mb-1.5 flex items-center gap-1.5 font-bold text-slate-900">
              <Info className="h-4 w-4" /> ご注意（重要）
            </div>
            <p>
              本ツールが示す「生物学的年齢」は Levine 2018 の PhenoAge をベースにした<strong>研究指標</strong>であり、医学的な診断や寿命の予測ではありません。原式は主に 40–80 歳の集団で検証されており、若年層や採血値が良好な方では実年齢よりかなり低めに出ることがあります（病気がないことを保証するものではありません）。
            </p>
            <p className="mt-2">
              数値は採血当日の状態を反映する概算で、体調・脱水・感染などで変動します。健康状態の評価は必ず医師にご相談ください。
            </p>
          </div>
        </section>
      )}

      {/* Sources */}
      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-600">
        <div className="mb-1.5 font-bold text-slate-900">データ出典</div>
        <ul className="space-y-1">
          <li>Levine ME, et al. An epigenetic biomarker of aging for lifespan and healthspan. <i>Aging (Albany NY)</i>. 2018;10(4):573–591.（PhenoAge 係数）</li>
          <li>生活習慣レイヤーの全死因ハザード比は査読コホート由来（喫煙・身体活動・睡眠・握力・座位・食事）。Δage ≈ ln(HR)/ln(2) × 8（死亡率倍加時間）で歳数換算した参考値です。</li>
        </ul>
      </div>
    </main>
  )
}

/* ─── MarkerInput ───────────────────────────────────────────────── */

function MarkerInput({ def, value, onChange }: { def: MarkerDef; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-1 flex items-baseline justify-between gap-1 text-sm font-medium text-slate-700">
        <span>
          {def.labelJa}
          {def.optional && <span className="ml-1 text-xs font-normal text-indigo-600">任意</span>}
        </span>
        <span className="text-xs font-normal text-slate-400">{def.unit}</span>
      </label>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step={def.step}
        value={value}
        placeholder={def.placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-300 focus:border-indigo-500 focus:outline-none"
      />
      <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">{def.rangeJa}</p>
    </div>
  )
}

/* ─── ResultHero（結果の山①・生物年齢の大きな数字） ─────────────── */

function ResultHero({ result }: { result: BiologicalAgeResult }) {
  const bioAge = result.bloodAge.value
  const ageAnim = useCountUp(bioAge, 1500, 200, true)
  const delta = result.clocks.phenoAge.delta
  const p = result.personality
  const color = PERSONALITY_COLOR[p.id]

  const deltaLabel =
    delta <= -0.5
      ? `実年齢より ${Math.abs(delta).toFixed(1)} 歳 若い目安`
      : delta >= 0.5
        ? `実年齢より ${delta.toFixed(1)} 歳 高い目安`
        : '実年齢とほぼ同じ目安'

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${color} p-5 text-white shadow-lg sm:p-7`}>
      <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-8 -left-4 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
      <div className="relative">
        <div className="flex items-center gap-1.5 text-xs font-medium opacity-90">
          <Award className="h-3.5 w-3.5" /> あなたの生物学的年齢（研究指標）
        </div>

        <div className="mt-3 flex items-end gap-2">
          <div className="text-5xl font-bold leading-none tracking-tight sm:text-6xl">{ageAnim.toFixed(1)}</div>
          <div className="pb-1 text-2xl font-bold opacity-90">歳</div>
        </div>
        <div className="mt-2 text-sm opacity-90">
          実年齢 {result.age} 歳 ・ <strong>{deltaLabel}</strong>
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-xl bg-white/15 p-4 backdrop-blur-sm">
          <div className="text-3xl sm:text-4xl">{p.emoji}</div>
          <div className="min-w-0">
            <div className="text-xs font-medium opacity-90">あなたのタイプ</div>
            <div className="text-lg font-bold tracking-tight sm:text-xl">{p.name}</div>
            <div className="mt-0.5 text-xs leading-relaxed opacity-90">{p.desc}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── IntervalCard（信頼区間・縮小演出） ─────────────────────────── */

function IntervalCard({ result }: { result: BiologicalAgeResult }) {
  const { value, lower, upper, halfWidth, tier } = result.bloodAge
  /* 区間バーを「広め初期 → 実区間」に縮める演出。
   * imputed が無い満点状態(±2.5)を基準に、現在の半幅を相対表示 */
  const fullWidthRatio = Math.min(halfWidth / 4.5, 1) // ±4.5 が最大（CRP+RDW 両 fallback）
  const [shrunk, setShrunk] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShrunk(true), 350)
    return () => clearTimeout(t)
  }, [])
  const tierLabel = tier === 'max' ? '精度 最高 ✨' : tier === 'high' ? '精度 高' : '精度 標準'

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
          <TrendingDown className="h-4 w-4 text-indigo-600" />
          推定の信頼区間
        </div>
        <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">{tierLabel}</span>
      </div>

      <div className="text-center text-sm text-slate-600">
        およそ <strong className="text-slate-900">{lower.toFixed(1)}</strong> 〜 <strong className="text-slate-900">{upper.toFixed(1)}</strong> 歳（±{halfWidth.toFixed(1)}）
      </div>

      {/* 区間バー（中央寄せ・縮小トランジション） */}
      <div className="relative mx-auto mt-4 h-3 w-full max-w-md overflow-hidden rounded-full bg-slate-100">
        <div
          className="absolute top-0 h-full rounded-full bg-gradient-to-r from-indigo-300 via-indigo-500 to-indigo-300 transition-all duration-700 ease-out"
          style={{
            left: shrunk ? `${50 - fullWidthRatio * 45}%` : '2%',
            right: shrunk ? `${50 - fullWidthRatio * 45}%` : '2%',
          }}
        />
        <div className="absolute left-1/2 top-1/2 h-4 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-900" />
      </div>
      <div className="mt-1.5 text-center text-xs text-slate-500">中央の点が点推定値（{value.toFixed(1)} 歳）</div>

      {(result.imputed.crp || result.imputed.rdw) && (
        <p className="mt-3 rounded-lg bg-amber-50/70 p-2.5 text-xs text-amber-800">
          <Info className="mr-1 inline h-3.5 w-3.5" />
          {result.imputed.crp && 'CRP'}
          {result.imputed.crp && result.imputed.rdw && '・'}
          {result.imputed.rdw && 'RDW'}
          を人口平均で補完したため区間が広めです。健診結果から入力すると区間が狭まります。
        </p>
      )}
    </div>
  )
}

/* ─── LifestyleCard（生活習慣レイヤー・BeforeAfter） ──────────────── */

function LifestyleCard({ result }: { result: BiologicalAgeResult }) {
  const ls = result.lifestyle!
  const adjusted = result.lifestyleAdjustedAge!
  const bloodValue = result.bloodAge.value
  const beforeAnim = useCountUp(bloodValue, 1100, 300, true)
  const afterAnim = useCountUp(adjusted, 1100, 700, true)
  const diff = Math.round((adjusted - bloodValue) * 10) / 10
  const improved = diff < 0

  return (
    <div className="rounded-2xl border border-indigo-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-1.5 text-xs font-medium text-indigo-700">
        <Activity className="h-3.5 w-3.5" /> 生活習慣レイヤー（採血とは別の参考値）
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <div className="text-xs text-slate-600">採血ベース</div>
          <div className="mt-0.5 text-2xl font-bold text-slate-900 sm:text-3xl">
            {beforeAnim.toFixed(1)}
            <span className="text-sm font-normal opacity-70"> 歳</span>
          </div>
        </div>
        <div className={`rounded-lg p-3 text-center ring-1 ${improved ? 'bg-emerald-50 ring-emerald-200' : 'bg-amber-50 ring-amber-200'}`}>
          <div className={`text-xs ${improved ? 'text-emerald-700' : 'text-amber-700'}`}>生活習慣を加味</div>
          <div className={`mt-0.5 text-2xl font-bold sm:text-3xl ${improved ? 'text-emerald-700' : 'text-amber-700'}`}>
            {afterAnim.toFixed(1)}
            <span className="text-sm font-normal opacity-70"> 歳</span>
          </div>
        </div>
      </div>

      {diff !== 0 && (
        <div className={`mt-3 text-center text-xs sm:text-sm ${improved ? 'text-emerald-700' : 'text-amber-700'}`}>
          生活習慣で <strong className="text-base">{diff > 0 ? '+' : ''}{diff.toFixed(1)} 歳</strong> 分の差（公開ハザード比からの参考換算）
        </div>
      )}

      {/* 因子別内訳 */}
      <div className="mt-4 space-y-2">
        {ls.breakdown.map((b) => (
          <div key={b.factor} className="flex items-center justify-between gap-2 rounded-lg bg-slate-50/70 px-3 py-2 text-xs sm:text-sm">
            <div className="min-w-0">
              <span className="font-medium text-slate-900">{b.label}</span>
              <span className="ml-1 text-slate-500">{b.state}</span>
            </div>
            <span
              className={`flex-shrink-0 font-bold ${
                b.deltaAge < 0 ? 'text-emerald-600' : b.deltaAge > 0 ? 'text-amber-600' : 'text-slate-400'
              }`}
            >
              {b.deltaAge > 0 ? '+' : ''}
              {b.deltaAge.toFixed(1)} 歳
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-slate-500">
        ※ 医学的な保証ではなく統計的な推定です。生活習慣の変更（禁煙・運動・睡眠改善など）でこの参考値がどう動くかの目安としてご活用ください。
      </p>
    </div>
  )
}

/* ─── KidneyCautionNotice（クレアチニン異常時・ASP 非表示トリガ） ── */

function KidneyCautionNotice() {
  return (
    <div className="rounded-2xl border-2 border-slate-300 bg-slate-50 p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-200">
          <Stethoscope className="h-5 w-5 text-slate-700" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">医療機関での確認をおすすめします</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            入力されたクレアチニン値が性別の正常範囲を超えています。腎機能の評価には医療機関での検査が必要です。生物学的年齢の推定値はあくまで研究指標であり、この場合はまず医師にご相談ください。
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── ActionPlanSection（PersonalityType → 成分ページの中立 ASP 動線）
 * 押し売り・煽りの表現は使わない（中立トーン）。成分の年齢効果は数値化しない。
 * 腎機能注意型は hideAsp 分岐の外側で除外済 + map 不在 + hideAsp 再チェックの三重ガード。 */

function ActionPlanSection({ result }: { result: BiologicalAgeResult }) {
  const p = result.personality
  const action = PERSONALITY_ACTION[p.id]
  if (!action || p.hideAsp) return null

  return (
    <div className="rounded-2xl border-2 border-indigo-300 bg-gradient-to-br from-white via-indigo-50/30 to-white p-5 shadow-md sm:p-6">
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
          <Target className="h-5 w-5 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">
            {p.emoji} {p.name}から振り返る成分
          </h3>
          <div className="text-xs text-slate-600">論文の蓄積状況を SciBase の中立評価で確認</div>
        </div>
      </div>
      <p className="mb-4 text-xs leading-relaxed text-slate-600 sm:text-sm">{action.contextJa}</p>

      <div className="space-y-3">
        {action.ingredients.map((ing) => (
          <Link
            key={ing.slug}
            href={`/ingredients/${ing.slug}`}
            className="group block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-slate-900 sm:text-base">{ing.labelJa}</div>
                <div className="mt-1 flex items-start gap-1.5 text-xs leading-relaxed text-slate-600">
                  <Microscope className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
                  <span>{ing.hintJa}</span>
                </div>
                <div className="mt-1.5 text-xs font-medium text-indigo-700">論文と製品比較を見る</div>
              </div>
              <ChevronRight className="h-5 w-5 flex-shrink-0 text-indigo-500 transition group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-slate-50 p-3 text-[10px] leading-relaxed text-slate-500 sm:text-xs">
        ※ ここに挙げた成分は「{p.name}の方が摂取を検討するケースが多い」という研究文脈の紹介であり、摂取で生物学的年齢の数値が変わることを保証するものではありません。購入は血液検査や体感と照らし合わせてご自身でご判断ください。医薬品を服用中の方・持病のある方・妊娠中の方は医師にご相談ください。
      </div>
    </div>
  )
}

/* ─── CompletionCelebration + X Share（Peak-End） ───────────────── */

function CompletionCelebration({ result }: { result: BiologicalAgeResult }) {
  const bioAge = result.bloodAge.value
  const shareText = encodeURIComponent(
    `生物学的年齢チェックの結果\n\n${result.personality.emoji} ${result.personality.name}\n身体の年齢は ${bioAge.toFixed(1)} 歳でした（研究指標）\n\n#SciBase 生物学的年齢チェッカー`
  )
  const shareUrl = encodeURIComponent('https://scibase.app/tools/phenoage')
  const xUrl = `https://x.com/intent/tweet?text=${shareText}&url=${shareUrl}`
  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-indigo-50/40 p-5 text-center shadow-sm sm:p-6">
      <div className="pointer-events-none absolute left-4 top-3 animate-pulse text-xl">✨</div>
      <div className="pointer-events-none absolute right-6 top-5 animate-pulse text-lg" style={{ animationDelay: '0.3s' }}>✨</div>
      <div className="pointer-events-none absolute bottom-4 left-10 animate-pulse text-lg" style={{ animationDelay: '0.6s' }}>✨</div>
      <div className="pointer-events-none absolute bottom-3 right-4 animate-pulse text-xl" style={{ animationDelay: '0.9s' }}>✨</div>
      <div className="text-4xl">🎉</div>
      <h3 className="mt-2 text-base font-bold text-slate-900 sm:text-lg">分析完了！</h3>
      <p className="mt-1 text-xs text-slate-600 sm:text-sm">結果を共有して、同じタイプの仲間と比べてみる</p>
      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-slate-800"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        結果を X でシェア
      </a>
    </div>
  )
}
