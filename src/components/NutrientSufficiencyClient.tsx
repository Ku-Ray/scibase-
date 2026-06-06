'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  AlertCircle,
  AlertTriangle,
  Award,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  FileText,
  Info,
  Microscope,
  Minus,
  Package,
  Pill,
  Plus,
  RotateCcw,
  Salad,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Utensils,
  Zap,
} from 'lucide-react'
import {
  NUTRIENT_META,
  AGE_GROUP_LABEL,
  SEX_LABEL,
  LIFE_STAGE_LABEL,
  RDA_SOURCE_NAME,
  RDA_SOURCE_URL,
  canSelectLifeStage,
  type AgeGroup,
  type LifeStage,
  type Sex,
} from '@/lib/nutrient-rda'
import {
  FOOD_PRESETS,
  FOOD_SOURCE_NAME,
  FOOD_SOURCE_URL,
  SUPPLEMENT_INPUT_UNIT,
  SUPPLEMENT_PRESETS,
  SUPPLEMENT_SLUG_TO_NUTRIENT,
  applyExclusivity,
  calculateSufficiency,
  groupResultsByStatus,
  type SufficiencyResult,
  type SufficiencyStatus,
  type SupplementInput,
  type SupplementPreset,
} from '@/lib/food-nutrient'
import { NUTRIENT_ACTION, selectTopDeficits } from '@/lib/nutrient-action-plan'

const AGE_OPTIONS: AgeGroup[] = ['10s', '20s', '30s', '40s', '50s', '60s', '70s+']
type Phase = 'idle' | 'calculating' | 'revealed'

const STATUS_LABEL: Record<SufficiencyStatus, string> = {
  excess_warning: '上限に近い（要注意）',
  severe_deficit: '気にかける余地が大きい',
  mild_deficit: '推奨量に余地あり',
  sufficient: '目安を満たしている可能性',
  no_data: 'データなし',
}

const STATUS_STYLE: Record<SufficiencyStatus, { wrap: string; icon: string; bar: string; iconBg: string; text: string; headerBg: string }> = {
  excess_warning: { wrap: 'border-rose-200 bg-rose-50/60', icon: 'text-rose-600', bar: 'bg-rose-500', iconBg: 'bg-rose-100', text: 'text-rose-800', headerBg: 'bg-rose-50' },
  severe_deficit: { wrap: 'border-orange-200 bg-orange-50/60', icon: 'text-orange-600', bar: 'bg-orange-500', iconBg: 'bg-orange-100', text: 'text-orange-800', headerBg: 'bg-orange-50' },
  mild_deficit: { wrap: 'border-amber-200 bg-amber-50/60', icon: 'text-amber-600', bar: 'bg-amber-400', iconBg: 'bg-amber-100', text: 'text-amber-800', headerBg: 'bg-amber-50' },
  sufficient: { wrap: 'border-emerald-200 bg-emerald-50/60', icon: 'text-emerald-600', bar: 'bg-emerald-500', iconBg: 'bg-emerald-100', text: 'text-emerald-800', headerBg: 'bg-emerald-50' },
  no_data: { wrap: 'border-slate-200 bg-slate-50/60', icon: 'text-slate-500', bar: 'bg-slate-400', iconBg: 'bg-slate-100', text: 'text-slate-700', headerBg: 'bg-slate-50' },
}

const CATEGORY_LABEL = {
  diet_pattern: '食事スタイル',
  food_habit: '食習慣（複数選択可）',
  modifier: 'ライフスタイル（吸収・消費に影響）',
} as const

/* ─── useCountUp hook (ease-out cubic) ──────────────────────────── */

function useCountUp(target: number, duration = 1200, delay = 0, enabled = true): number {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)
  useEffect(() => {
    if (!enabled) { setValue(target); return }
    const startTimer = setTimeout(() => {
      const start = performance.now()
      const initial = 0
      const range = target - initial
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3) /* ease-out cubic */
        setValue(initial + range * eased)
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

/* ─── Personality Type 判定 ─────────────────────────────────────── */

interface PersonalityType {
  emoji: string
  name: string
  desc: string
  rarity: number  // 同タイプ % (5-95)
  colorClass: string
}

function determinePersonality(
  results: SufficiencyResult[],
  foodPresetIds: string[]
): PersonalityType {
  const has = (id: string) => foodPresetIds.includes(id)
  const get = (n: string) => results.find(r => r.nutrient === n)
  const excessCount = results.filter(r => r.status === 'excess_warning').length
  const sufficientCount = results.filter(r => r.status === 'sufficient').length
  const severeCount = results.filter(r => r.status === 'severe_deficit').length

  if (excessCount >= 2) return { emoji: '⚠️', name: '上限近い栄養素あり型', desc: '熱意があるからこそ用量見直しが安心', rarity: 8, colorClass: 'from-rose-500 to-orange-500' }
  if (excessCount === 1) return { emoji: '🚨', name: '1 つだけ要チェック型', desc: '1 栄養素だけ用量を見直してみる', rarity: 11, colorClass: 'from-orange-500 to-amber-500' }
  if (has('vegan')) return { emoji: '🌱', name: 'ヴィーガン実践型', desc: 'B12・鉄・カルシウムを意識したい', rarity: 4, colorClass: 'from-emerald-500 to-teal-500' }
  if (has('vegetarian')) return { emoji: '🥬', name: 'ベジタリアン実践型', desc: '鉄と B12 を振り返ってみると◎', rarity: 9, colorClass: 'from-emerald-500 to-lime-500' }
  if ((get('iron')?.status === 'severe_deficit') || (get('iron')?.percent ?? 100) < 50) {
    return { emoji: '🩸', name: '鉄を意識したい型', desc: '月経・吸収阻害がある人は気にかける余地あり', rarity: 24, colorClass: 'from-rose-500 to-pink-500' }
  }
  if ((get('vitamin_d')?.percent ?? 100) < 60) {
    return { emoji: '☀️', name: 'ビタミン D 余地あり型', desc: 'デスクワーク × 紫外線回避の人に多い傾向', rarity: 38, colorClass: 'from-sky-500 to-blue-500' }
  }
  if (sufficientCount >= 10) return { emoji: '👑', name: 'バランス上位型', desc: '15 栄養素を高水準でカバーは希少', rarity: 3, colorClass: 'from-amber-500 to-yellow-500' }
  if (sufficientCount >= 8) return { emoji: '🌟', name: 'バランス良好型', desc: '主要栄養素を高水準でカバー', rarity: 12, colorClass: 'from-emerald-500 to-green-500' }
  if (has('green_veg_daily') && (get('vitamin_a')?.status === 'sufficient' || (get('vitamin_a')?.percent ?? 0) >= 75)) {
    return { emoji: '🌿', name: '緑黄色野菜マスター', desc: 'ビタミン A・葉酸の獲得効率が高い', rarity: 18, colorClass: 'from-green-500 to-emerald-500' }
  }
  if (has('meat_fish_daily') && (get('iron')?.status === 'sufficient' || (get('vitamin_b12')?.percent ?? 0) >= 100)) {
    return { emoji: '🐟', name: '肉魚バランス型', desc: '動物性タンパクで鉄・B12 を効率取得', rarity: 22, colorClass: 'from-blue-500 to-cyan-500' }
  }
  if (severeCount >= 8) return { emoji: '📋', name: '振り返りどころが多い型', desc: 'まずは食事の柱を 2-3 個追加してみる', rarity: 27, colorClass: 'from-orange-500 to-amber-500' }
  return { emoji: '📊', name: '平均的な日本人型', desc: '気になる栄養素を 1-2 個振り返ると◎', rarity: 32, colorClass: 'from-slate-500 to-slate-600' }
}

/* ─── PrecisionMeter (sticky top) ───────────────────────────────── */

function PrecisionMeter({ percent }: { percent: number }) {
  const animated = useCountUp(percent, 700, 0, true)
  const display = Math.round(animated)
  const tier = display >= 90 ? '✨ 高精度' : display >= 70 ? '良いペース 👍' : display >= 40 ? '入力を進めましょう' : 'まずは基本情報から'
  const gradient = display >= 90 ? 'from-emerald-400 to-emerald-600' : display >= 70 ? 'from-amber-400 to-emerald-500' : 'from-slate-300 to-amber-400'
  return (
    <div className="sticky top-0 z-30 -mx-4 mb-6 border-b border-slate-200 bg-white/90 px-4 py-2 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-shrink-0 text-xs font-medium text-slate-700">入力精度</div>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div className={`h-full bg-gradient-to-r ${gradient} transition-[width] duration-500 ease-out`} style={{ width: `${Math.min(display, 100)}%` }} />
          </div>
          <div className="flex-shrink-0 text-xs font-bold text-slate-900">{display}%</div>
          <div className="flex-shrink-0 text-xs font-medium text-slate-500 hidden sm:block">{tier}</div>
        </div>
      </div>
    </div>
  )
}

/* ─── CalculationTheatre (1.8s 演出) ────────────────────────────── */

function CalculationTheatre({ onComplete }: { onComplete: () => void }) {
  const lines = [
    '厚労省 食事摂取基準 2020 を参照',
    '食事 13 preset から摂取量を集計',
    'サプリ統合 + 吸収係数を適用',
    '15 栄養素の充足率を判定',
  ]
  const [step, setStep] = useState(0)
  const animated = useCountUp(100, 1800, 0, true)
  const pct = Math.round(animated)
  useEffect(() => {
    const interval = setInterval(() => {
      setStep(s => (s < lines.length ? s + 1 : s))
    }, 1800 / lines.length)
    const timer = setTimeout(() => onComplete(), 1850)
    return () => { clearInterval(interval); clearTimeout(timer) }
  }, [onComplete, lines.length])
  return (
    <section className="mt-10 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/60 p-6 shadow-md sm:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
            <Zap className="h-5 w-5 animate-pulse text-emerald-600" />
          </div>
          <div>
            <div className="text-sm font-bold text-emerald-900 sm:text-base">分析中...</div>
            <div className="text-xs text-emerald-700">あなたの 1 日栄養素プロファイルを計算しています</div>
          </div>
        </div>
        <div className="text-2xl font-bold text-emerald-700 sm:text-3xl">{pct}%</div>
      </div>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-emerald-100">
        <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-[width] duration-100 ease-out" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-5 space-y-2">
        {lines.map((l, i) => (
          <div key={l} className={`flex items-center gap-2 text-sm transition-opacity duration-300 ${step > i ? 'opacity-100' : 'opacity-30'}`}>
            <Check className={`h-4 w-4 flex-shrink-0 ${step > i ? 'text-emerald-600' : 'text-slate-300'}`} />
            <span className={step > i ? 'text-emerald-900 font-medium' : 'text-slate-500'}>{l}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Main client ───────────────────────────────────────────────── */

export function NutrientSufficiencyClient() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [age, setAge] = useState<AgeGroup>('30s')
  const [sex, setSex] = useState<Sex>('female')
  const [lifeStage, setLifeStage] = useState<LifeStage>('normal')
  const [foodPresetIds, setFoodPresetIds] = useState<string[]>([])
  const [supplements, setSupplements] = useState<SupplementInput[]>([])
  const [phase, setPhase] = useState<Phase>('idle')
  const [showAllSupplements, setShowAllSupplements] = useState(false)
  const [results, setResults] = useState<SufficiencyResult[] | null>(null)
  const [dietOnlyResults, setDietOnlyResults] = useState<SufficiencyResult[] | null>(null)
  const [expanded, setExpanded] = useState<Record<SufficiencyStatus, boolean>>({
    excess_warning: true,
    severe_deficit: true,
    mild_deficit: true,
    sufficient: false,
    no_data: false,
  })
  const resultRef = useRef<HTMLDivElement>(null)

  const lifeStageAvailable = canSelectLifeStage(age, sex)

  /* PrecisionMeter % = 25 (基本) + 50 (食事≥3個満点) + 25 (サプリ任意・1+で満点) */
  const precision = useMemo(() => {
    const base = 25
    const foodPct = Math.min(foodPresetIds.length / 4, 1) * 50
    const supPct = supplements.filter(s => s.dose > 0).length > 0 ? 25 : 0
    return Math.round(base + foodPct + supPct)
  }, [foodPresetIds.length, supplements])

  const handleSexChange = (next: Sex) => {
    setSex(next)
    if (next === 'male') setLifeStage('normal')
  }
  const handleAgeChange = (next: AgeGroup) => {
    setAge(next)
    if (!canSelectLifeStage(next, sex)) setLifeStage('normal')
  }

  const togglePreset = useCallback((presetId: string) => {
    setFoodPresetIds(prev => {
      const willSelect = !prev.includes(presetId)
      return applyExclusivity(prev, presetId, willSelect)
    })
  }, [])

  const addSupplementPreset = (slug: string, dose: number) => {
    setSupplements(prev => {
      if (prev.some(s => s.slug === slug)) return prev /* 重複防止 */
      return [...prev, { slug, dose }]
    })
  }

  const updateSupplement = (idx: number, patch: Partial<SupplementInput>) => {
    setSupplements(prev => prev.map((s, i) => (i === idx ? { ...s, ...patch } : s)))
  }

  const removeSupplement = (idx: number) => {
    setSupplements(prev => prev.filter((_, i) => i !== idx))
  }

  const handleCalculate = () => {
    setPhase('calculating')
    /* 2 通り計算: diet のみ / diet+supplement で BeforeAfter 用 */
    const supps = supplements.filter(s => s.dose > 0)
    const full = calculateSufficiency({ age, sex, lifeStage, foodPresetIds, supplements: supps })
    const dietOnly = calculateSufficiency({ age, sex, lifeStage, foodPresetIds, supplements: [] })
    setResults(full)
    setDietOnlyResults(dietOnly)
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  const handleReset = () => {
    setStep(1)
    setFoodPresetIds([])
    setSupplements([])
    setResults(null)
    setDietOnlyResults(null)
    setPhase('idle')
    setLifeStage('normal')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const grouped = useMemo(() => (results ? groupResultsByStatus(results) : null), [results])
  const personality = useMemo(() => (results ? determinePersonality(results, foodPresetIds) : null), [results, foodPresetIds])

  const stats = useMemo(() => {
    if (!results) return null
    const total = results.length
    const sufficient = results.filter(r => r.status === 'sufficient').length
    const excess = results.filter(r => r.status === 'excess_warning').length
    const severe = results.filter(r => r.status === 'severe_deficit').length
    const mild = results.filter(r => r.status === 'mild_deficit').length
    const score = Math.round((sufficient / total) * 100)
    return { total, sufficient, excess, severe, mild, score }
  }, [results])

  const beforeAfter = useMemo(() => {
    if (!results || !dietOnlyResults) return null
    const dietScore = Math.round(dietOnlyResults.filter(r => r.status === 'sufficient').length / dietOnlyResults.length * 100)
    const fullScore = Math.round(results.filter(r => r.status === 'sufficient').length / results.length * 100)
    return { dietScore, fullScore, diff: fullScore - dietScore }
  }, [results, dietOnlyResults])

  const usedSupplementSlugs = new Set(supplements.map(s => s.slug))

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
      {phase !== 'revealed' && <PrecisionMeter percent={precision} />}

      {/* Header */}
      <header className="mb-8 text-center">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
          <Salad className="h-3.5 w-3.5" />
          食事 + サプリの統合チェック
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          栄養素充足率チェッカー
        </h1>
        <p className="mt-3 text-sm text-slate-600 sm:text-base">
          厚生労働省 食事摂取基準 2020 年版をベースに、15 栄養素の 1 日充足率の<strong>目安</strong>を概算します。
        </p>
      </header>

      {/* Stepper - inputs phase only */}
      {phase === 'idle' && (
        <div className="mb-6 flex items-center justify-center gap-1.5 text-xs font-medium sm:text-sm">
          {[1, 2, 3].map(n => (
            <div key={n} className="flex items-center">
              <button type="button" onClick={() => setStep(n as 1 | 2 | 3)}
                className={`flex h-7 w-7 items-center justify-center rounded-full transition ${
                  step === n ? 'bg-emerald-600 text-white shadow-sm' : step > n ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'
                }`}>
                {step > n ? <Check className="h-4 w-4" /> : n}
              </button>
              {n < 3 && <div className={`h-0.5 w-8 sm:w-12 ${step > n ? 'bg-emerald-300' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>
      )}

      {/* Step 1 */}
      {phase === 'idle' && step === 1 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
            <Sparkles className="h-5 w-5 text-emerald-600" />
            Step 1: 基本情報
          </h2>
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">年代</label>
              <div className="flex flex-wrap gap-1.5">
                {AGE_OPTIONS.map(a => (
                  <button type="button" key={a} onClick={() => handleAgeChange(a)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
                      age === a ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}>
                    {AGE_GROUP_LABEL[a]}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">性別</label>
              <div className="flex gap-2">
                {(['female', 'male'] as Sex[]).map(s => (
                  <button type="button" key={s} onClick={() => handleSexChange(s)}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                      sex === s ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}>
                    {SEX_LABEL[s]}
                  </button>
                ))}
              </div>
            </div>
            {lifeStageAvailable && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  ライフステージ <span className="text-xs text-slate-500">（女性 20-40 代のみ）</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['normal', 'pregnancy', 'lactation'] as LifeStage[]).map(ls => (
                    <button type="button" key={ls} onClick={() => setLifeStage(ls)}
                      className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                        lifeStage === ls ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}>
                      {LIFE_STAGE_LABEL[ls]}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700">
              次へ <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* Step 2 */}
      {phase === 'idle' && step === 2 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
            <Utensils className="h-5 w-5 text-emerald-600" />
            Step 2: 食事傾向
          </h2>
          <p className="mb-4 text-xs text-slate-600 sm:text-sm">
            あてはまるものすべてにチェックを入れてください。1 日の食事からの栄養素摂取量を概算します。
          </p>
          <div className="space-y-4">
            {(['food_habit', 'diet_pattern', 'modifier'] as const).map(cat => {
              const items = FOOD_PRESETS.filter(p => p.category === cat)
              if (items.length === 0) return null
              return (
                <div key={cat}>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {CATEGORY_LABEL[cat]}
                  </h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {items.map(p => {
                      const selected = foodPresetIds.includes(p.id)
                      return (
                        <button type="button" key={p.id} onClick={() => togglePreset(p.id)}
                          className={`flex items-start gap-2 rounded-lg border p-3 text-left transition ${
                            selected ? 'border-emerald-500 bg-emerald-50/70' : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}>
                          <div className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border ${
                            selected ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 bg-white'
                          }`}>
                            {selected && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-slate-900">{p.labelJa}</div>
                            <div className="mt-0.5 text-xs text-slate-500">{p.descJa}</div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-6 flex items-center justify-between gap-2">
            <button type="button" onClick={() => setStep(1)}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              戻る
            </button>
            <button type="button" onClick={() => setStep(3)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700">
              次へ <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* Step 3 - サプリ追加 UX 改善 */}
      {phase === 'idle' && step === 3 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
            <Pill className="h-5 w-5 text-emerald-600" />
            Step 3: サプリ（任意）
          </h2>
          <p className="mb-4 text-xs text-slate-600 sm:text-sm">
            飲んでいるサプリをワンタップで追加。何も追加せずに「計算する」を押してもOKです。
          </p>

          {/* ワンタップ追加グリッド：基本 9 + 展開 7 */}
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">よく飲まれているサプリ（タップで追加）</h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {SUPPLEMENT_PRESETS.slice(0, 9).map(p => (
                <SupplementChip key={p.slug} preset={p} added={usedSupplementSlugs.has(p.slug)} onAdd={addSupplementPreset} />
              ))}
            </div>
            {!showAllSupplements && (
              <button type="button" onClick={() => setShowAllSupplements(true)}
                className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-700">
                <Plus className="h-3.5 w-3.5" />
                他のサプリ {SUPPLEMENT_PRESETS.length - 9} 種を見る（ナイアシン・ヨウ素・カリウム 等）
              </button>
            )}
            {showAllSupplements && (
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {SUPPLEMENT_PRESETS.slice(9).map(p => (
                  <SupplementChip key={p.slug} preset={p} added={usedSupplementSlugs.has(p.slug)} onAdd={addSupplementPreset} />
                ))}
              </div>
            )}
          </div>

          {/* 追加済みリスト（用量編集 + 削除） */}
          {supplements.length > 0 && (
            <div className="mt-5">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">追加したサプリ（用量を変えられます）</h3>
              <div className="space-y-1.5">
                {supplements.map((s, i) => {
                  const preset = SUPPLEMENT_PRESETS.find(p => p.slug === s.slug)
                  const unit = SUPPLEMENT_INPUT_UNIT[s.slug] ?? 'mg'
                  return (
                    <div key={i} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-emerald-50/30 p-2">
                      <div className="flex-shrink-0 text-base">{preset?.emoji ?? '💊'}</div>
                      <div className="min-w-0 flex-1 truncate text-sm font-medium text-slate-900">{preset?.labelJa ?? s.slug}</div>
                      <input type="number" min={0} step={unit === 'mg' ? 1 : 0.1}
                        value={s.dose === 0 ? '' : s.dose}
                        onChange={e => updateSupplement(i, { dose: Number(e.target.value) || 0 })}
                        className="w-20 rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none" />
                      <span className="w-12 text-xs text-slate-600">{unit}</span>
                      <button type="button" onClick={() => removeSupplement(i)}
                        className="rounded-md p-1 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600" aria-label="削除">
                        <Minus className="h-4 w-4" />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div className="mt-4 rounded-lg bg-amber-50/70 p-3 text-xs text-amber-800">
            <Info className="mr-1 inline h-3.5 w-3.5" />
            ビタミンD 1000 IU ≒ 25 μg ／ ビタミンA 5000 IU ≒ 1500 μgRAE ／ ビタミンE 1 IU ≒ 0.67 mg。市販サプリが IU 表記の場合この目安で換算してください。
          </div>

          <div className="mt-6 flex items-center justify-between gap-2">
            <button type="button" onClick={() => setStep(2)}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              戻る
            </button>
            <button type="button" onClick={handleCalculate}
              className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:from-emerald-600 hover:to-emerald-700 hover:shadow-lg">
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Sparkles className="h-4 w-4" /> 充足率を計算する
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

      {/* Revealed results */}
      {phase === 'revealed' && results && grouped && personality && stats && beforeAfter && (
        <section ref={resultRef} className="space-y-5">
          {/* ① PersonalityType Hero */}
          <PersonalityHero personality={personality} score={stats.score} sufficient={stats.sufficient} total={stats.total} />

          {/* ② Notice: 血液検査が真実 */}
          <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-4">
            <div className="flex items-start gap-2">
              <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600" />
              <div className="text-xs leading-relaxed text-sky-900 sm:text-sm">
                <strong>本ツールは食事傾向の概算です。</strong>
                厚労省 RDA 未達でも EAR（必要量）を満たしていれば、多くの場合に問題は想定されません。
                実際の栄養状態は血液検査が必要です。気になる項目は医師にご相談ください。
              </div>
            </div>
          </div>

          {/* ③ ActionPlanSection (SciBase 論文・製品比較への中立な誘導) */}
          {(stats.severe + stats.mild) > 0 && (
            <ActionPlanSection results={results} score={stats.score} />
          )}

          {/* ④ BeforeAfterCard - サプリ追加した時のみ表示（中立な比較） */}
          {supplements.filter(s => s.dose > 0).length > 0 && beforeAfter.diff > 0 && (
            <BeforeAfterCard before={beforeAfter.dietScore} after={beforeAfter.fullScore} diff={beforeAfter.diff} />
          )}

          {/* ④ Status groups */}
          <div>
            {(['excess_warning', 'severe_deficit', 'mild_deficit', 'sufficient'] as const).map(status => {
              const items = grouped[status]
              if (items.length === 0) return null
              const style = STATUS_STYLE[status]
              const isOpen = expanded[status]
              return (
                <div key={status} className={`mb-3 overflow-hidden rounded-xl border ${style.wrap}`}>
                  <button type="button" onClick={() => setExpanded(p => ({ ...p, [status]: !p[status] }))}
                    className={`flex w-full items-center justify-between gap-2 p-4 text-left ${style.headerBg}`}>
                    <div className="flex items-center gap-2">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${style.iconBg}`}>
                        {status === 'excess_warning' ? <AlertTriangle className={`h-4 w-4 ${style.icon}`} />
                          : status === 'severe_deficit' ? <AlertCircle className={`h-4 w-4 ${style.icon}`} />
                          : status === 'mild_deficit' ? <AlertCircle className={`h-4 w-4 ${style.icon}`} />
                          : <Check className={`h-4 w-4 ${style.icon}`} />}
                      </div>
                      <div>
                        <div className={`text-sm font-bold ${style.text}`}>{STATUS_LABEL[status]}</div>
                        <div className="text-xs text-slate-600">{items.length} 栄養素</div>
                      </div>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-slate-500 transition ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="space-y-3 border-t border-slate-200/60 bg-white/40 p-4">
                      {items.map((r, i) => <NutrientRow key={r.nutrient} result={r} status={status} delay={i * 70} />)}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* ⑤ CompletionCelebration + X share (Peak-End) */}
          <CompletionCelebration personality={personality} score={stats.score} />

          {/* Profile recap + Reset */}
          <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-700 sm:text-sm">
            <span className="font-medium">あなたの条件：</span>
            {AGE_GROUP_LABEL[age]}・{SEX_LABEL[sex]}
            {lifeStage !== 'normal' && `・${LIFE_STAGE_LABEL[lifeStage]}`}・食事 preset {foodPresetIds.length} 件・サプリ {supplements.filter(s => s.dose > 0).length} 件
          </div>
          <div className="flex justify-center">
            <button type="button" onClick={handleReset}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              <RotateCcw className="h-4 w-4" /> 最初からやり直す
            </button>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-xs leading-relaxed text-slate-700 sm:text-sm">
            <div className="mb-1.5 flex items-center gap-1.5 font-bold text-slate-900">
              <Info className="h-4 w-4" /> ご注意（重要）
            </div>
            <p>
              本ツールは概算値です。実際の摂取量は食材・量・調理法・個人差で大きく変動するため、診断・治療目的では使用しないでください。栄養状態の評価や具体的なサプリ・食事のご相談は、必ず医師・管理栄養士などの専門家にご相談ください。
            </p>
            <p className="mt-2">
              妊娠中・授乳中の方は、葉酸・鉄・ビタミン A・ヨウ素等の摂取量が母子の健康に直結します。必ず主治医にご確認のうえご活用ください。
            </p>
          </div>
        </section>
      )}

      {/* Sources */}
      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-600">
        <div className="mb-1.5 font-bold text-slate-900">データ出典</div>
        <ul className="space-y-1">
          <li>
            <a href={RDA_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-emerald-700 underline-offset-2 hover:underline">
              {RDA_SOURCE_NAME}<ExternalLink className="h-3 w-3" />
            </a>
            （RDA・AI・UL の参照値）
          </li>
          <li>
            <a href={FOOD_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-emerald-700 underline-offset-2 hover:underline">
              {FOOD_SOURCE_NAME}<ExternalLink className="h-3 w-3" />
            </a>
            （食事 preset の栄養素貢献量）
          </li>
        </ul>
      </div>
    </main>
  )
}

/* ─── PersonalityHero (結果の山①) ──────────────────────────────── */

function PersonalityHero({ personality, score, sufficient, total }: { personality: PersonalityType; score: number; sufficient: number; total: number }) {
  const scoreAnim = useCountUp(score, 1300, 200, true)
  const rarityAnim = useCountUp(personality.rarity, 1100, 600, true)
  const stars = personality.rarity < 5 ? 5 : personality.rarity < 12 ? 4 : personality.rarity < 22 ? 3 : personality.rarity < 35 ? 2 : 1
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${personality.colorClass} p-5 text-white shadow-lg sm:p-7`}>
      <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-8 -left-4 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
      <div className="relative">
        <div className="flex items-center gap-1.5 text-xs font-medium opacity-90">
          <Award className="h-3.5 w-3.5" /> あなたの栄養タイプ
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <div className="text-3xl sm:text-4xl">{personality.emoji}</div>
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{personality.name}</h2>
        </div>
        <div className="mt-1.5 text-xs opacity-90 sm:text-sm">{personality.desc}</div>

        <div className="mt-4 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < stars ? 'fill-white text-white' : 'text-white/30'}`} />
          ))}
          <span className="ml-1.5 text-xs opacity-90">同タイプ <strong>{Math.round(rarityAnim)}%</strong>（推定）</span>
        </div>

        <div className="mt-5 rounded-xl bg-white/15 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-medium opacity-90">あなたの充足スコア</div>
              <div className="mt-0.5 text-3xl font-bold sm:text-4xl">{Math.round(scoreAnim)}<span className="text-lg opacity-80">/100</span></div>
            </div>
            <div className="text-right text-xs opacity-90">
              充足 <strong className="text-base">{sufficient}</strong> / {total} 栄養素
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── BeforeAfterCard (Loss Aversion・改善余地) ────────────────── */

function BeforeAfterCard({ before, after, diff }: { before: number; after: number; diff: number }) {
  const beforeAnim = useCountUp(before, 1100, 300, true)
  const afterAnim = useCountUp(after, 1100, 700, true)
  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
        <TrendingUp className="h-3.5 w-3.5" /> 食事のみ → サプリ追加で
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <div className="text-xs text-slate-600">食事のみ</div>
          <div className="mt-0.5 text-2xl font-bold text-slate-900 sm:text-3xl">{Math.round(beforeAnim)}<span className="text-sm font-normal opacity-70">%</span></div>
        </div>
        <div className="rounded-lg bg-emerald-50 p-3 text-center ring-1 ring-emerald-200">
          <div className="text-xs text-emerald-700">サプリ含む</div>
          <div className="mt-0.5 text-2xl font-bold text-emerald-700 sm:text-3xl">{Math.round(afterAnim)}<span className="text-sm font-normal opacity-70">%</span></div>
        </div>
      </div>
      {diff > 0 && (
        <div className="mt-3 text-center text-xs text-emerald-700 sm:text-sm">
          サプリ分で <strong className="text-base">+{diff} ポイント</strong> 上がる目安です（食事との重複は計算済み）
        </div>
      )}
      {diff === 0 && before < 70 && (
        <div className="mt-3 text-center text-xs text-amber-700 sm:text-sm">
          下のグループから気になる成分の論文を SciBase で確認できます
        </div>
      )}
    </div>
  )
}

/* ─── NutrientRow with stagger reveal ───────────────────────────── */

function NutrientRow({ result, status, delay = 0 }: { result: SufficiencyResult; status: SufficiencyStatus; delay?: number }) {
  const meta = NUTRIENT_META[result.nutrient]
  if (!meta) return null
  const style = STATUS_STYLE[status]
  const displayPercent = Math.min(result.percent, 999)
  const animatedPct = useCountUp(displayPercent, 1100, delay, true)
  const cappedBar = Math.min(displayPercent, 150)
  const barWidth = (cappedBar / 150) * 100
  return (
    <div className="rounded-lg bg-white/80 p-3 ring-1 ring-slate-200/60">
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <div className="text-sm font-semibold text-slate-900">{meta.labelJa}</div>
        <div className={`text-sm font-bold ${style.text}`}>{Math.round(animatedPct)}%</div>
      </div>
      <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full ${style.bar} transition-[width] duration-1000 ease-out`} style={{ width: `${barWidth}%` }} />
      </div>
      <div className="mb-2 text-xs text-slate-600">
        摂取目安 <strong className="text-slate-900">{formatAmount(result.totalIntake, meta.unit)}</strong>
        <span className="mx-1 text-slate-400">/</span>
        {result.referenceType === 'rda' ? '推奨量' : '目安量'} {formatAmount(result.reference, meta.unit)}
        {result.ul != null && (<><span className="mx-1 text-slate-400">・</span>上限 {formatAmount(result.ul, meta.unit)}</>)}
      </div>
      {result.source !== 'none' && (
        <div className="mb-2 text-xs text-slate-500">
          内訳：食事 {formatAmount(result.foodIntake, meta.unit)}
          {result.supplementIntake > 0 && ` ＋ サプリ ${formatAmount(result.supplementIntake, meta.unit)}`}
        </div>
      )}
      {status === 'excess_warning' && (
        <div className="mt-2 rounded-md bg-rose-100/60 p-2 text-xs text-rose-800">
          耐容上限量（UL：{formatAmount(result.ul ?? 0, meta.unit)}）の 80% を超えています。サプリの用量を見直すか、医師・管理栄養士にご相談ください。
        </div>
      )}
      {(status === 'mild_deficit' || status === 'severe_deficit') && meta.ingredientSlug && (
        <Link href={`/ingredients/${meta.ingredientSlug}`}
          className="group mt-3 flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-emerald-50/60 p-3 transition hover:border-emerald-400 hover:from-emerald-100 hover:to-emerald-50">
          <div className="min-w-0 flex-1">
            <div className="text-xs font-medium text-emerald-700">📚 SciBase で論文を比べる</div>
            <div className="mt-0.5 truncate text-sm font-bold text-emerald-900">
              {meta.labelJa}の論文と製品比較を見る
            </div>
            <div className="mt-0.5 text-xs text-emerald-700/80">
              中立な評価ランキング・論文出典・各 EC 価格まで
            </div>
          </div>
          <ChevronRight className="h-5 w-5 flex-shrink-0 text-emerald-600 transition group-hover:translate-x-0.5" />
        </Link>
      )}
      {meta.noteJa && <div className="mt-2 text-xs text-slate-500">{meta.noteJa}</div>}
    </div>
  )
}

/* ─── ActionPlanSection (A+B+C+E) ──────────────────────────────── */

function ActionPlanSection({ results, score }: { results: SufficiencyResult[]; score: number }) {
  const topDeficits = useMemo(() => selectTopDeficits(results, 3), [results])
  if (topDeficits.length === 0) return null

  /* Bundle 効果 simulation: TOP 3 の不足が充足したと仮定したスコア */
  const simulatedScore = useMemo(() => {
    const totalCount = results.length
    const currentSufficient = results.filter(r => r.status === 'sufficient').length
    const newSufficient = currentSufficient + topDeficits.length
    return Math.round((newSufficient / totalCount) * 100)
  }, [results, topDeficits])

  return (
    <div className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-white via-emerald-50/30 to-white p-5 shadow-md sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
          <Target className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">気になる栄養素を SciBase で振り返る</h3>
          <div className="text-xs text-slate-600">推奨量に余地のある {topDeficits.length} 栄養素を中立な論文ベースで確認</div>
        </div>
      </div>

      <div className="space-y-3">
        {topDeficits.map((r, i) => (
          <ActionPlanCard key={r.nutrient} result={r} rank={i + 1} />
        ))}
      </div>

      {/* まとめて確認 CTA */}
      <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
        <div className="flex items-start gap-2">
          <Package className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-700" />
          <div className="flex-1">
            <div className="text-sm font-bold text-emerald-900">気になる成分を SciBase でまとめて比べる</div>
            <div className="mt-1 text-xs text-emerald-800 sm:text-sm">
              論文の質・各製品の比較・価格まで中立な視点で確認できます。サプリ購入は体感や血液検査と照らし合わせて、ご自身でご判断ください
            </div>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {topDeficits.map(r => {
            const meta = NUTRIENT_META[r.nutrient]
            if (!meta?.ingredientSlug) return null
            return (
              <Link key={r.nutrient} href={`/ingredients/${meta.ingredientSlug}`}
                className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-300 transition hover:bg-emerald-100">
                {meta.labelJa} <ChevronRight className="h-3 w-3" />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function ActionPlanCard({ result, rank }: { result: SufficiencyResult; rank: number }) {
  const meta = NUTRIENT_META[result.nutrient]
  const action = NUTRIENT_ACTION[result.nutrient]
  if (!meta) return null

  const deficitToRda = Math.max(result.reference - result.totalIntake, 0)
  const deficitFormatted = formatAmount(deficitToRda, meta.unit)
  const earFormatted = result.ear != null ? formatAmount(result.ear, meta.unit) : null
  const isSevere = result.status === 'severe_deficit'

  return (
    <div className={`rounded-xl border bg-white p-4 shadow-sm ${isSevere ? 'border-orange-200' : 'border-amber-200'}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${isSevere ? 'bg-orange-100 text-orange-700' : 'bg-amber-100 text-amber-700'}`}>
            #{rank}
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 sm:text-base">{meta.labelJa}</div>
            <div className={`text-xs font-medium ${isSevere ? 'text-orange-700' : 'text-amber-700'}`}>
              {result.percent}% ・推奨量(RDA)まで <strong>{deficitFormatted}</strong>
              {earFormatted && <span className="ml-1 opacity-80">・必要量(EAR) {earFormatted}</span>}
            </div>
          </div>
        </div>
      </div>

      {action && (
        <div className="mt-3 space-y-1.5 rounded-lg bg-slate-50 p-3 text-xs sm:text-sm">
          <div className="flex items-start gap-1.5">
            <Pill className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-slate-500" />
            <div className="text-slate-700">
              <strong className="text-slate-900">サプリで補うなら：</strong>
              {action.supplementDoseRangeJa}
            </div>
          </div>
          <div className="flex items-start gap-1.5">
            <Calendar className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-slate-500" />
            <div className="text-slate-700">
              <strong className="text-slate-900">続けた場合の目安：</strong>
              {action.benefitTimelineJa}
            </div>
          </div>
          <div className="flex items-start gap-1.5">
            <Microscope className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-slate-500" />
            <div className="text-slate-700">{action.paperHintJa}</div>
          </div>
        </div>
      )}

      {meta.ingredientSlug && (
        <Link href={`/ingredients/${meta.ingredientSlug}`}
          className="group mt-3 flex items-center justify-between gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-2.5 text-white shadow-sm transition hover:from-emerald-700 hover:to-emerald-800 hover:shadow-md">
          <div className="text-left">
            <div className="text-xs font-medium opacity-90">SciBase 中立評価</div>
            <div className="text-sm font-bold">{meta.labelJa}の論文と製品比較を見る</div>
          </div>
          <ChevronRight className="h-5 w-5 flex-shrink-0 transition group-hover:translate-x-0.5" />
        </Link>
      )}

      <div className="mt-2 text-[10px] leading-relaxed text-slate-500 sm:text-xs">
        ※ 数値は目安です。RDA 未達でも EAR を満たせば多くの場合に問題は想定されません。実際の判定は血液検査が必要・継続摂取は医師にご相談ください。
      </div>
    </div>
  )
}

/* ─── CompletionCelebration + X Share (Peak-End) ────────────────── */

function CompletionCelebration({ personality, score }: { personality: PersonalityType; score: number }) {
  const shareText = encodeURIComponent(
    `栄養素充足率チェックの結果\n\n${personality.emoji} ${personality.name}\n充足スコア ${score}/100\n\n#SciBase 栄養素チェッカー`
  )
  const shareUrl = encodeURIComponent('https://scibase.app/tools/nutrient-sufficiency')
  const xUrl = `https://x.com/intent/tweet?text=${shareText}&url=${shareUrl}`
  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 p-5 text-center shadow-sm sm:p-6">
      <div className="pointer-events-none absolute left-4 top-3 text-xl animate-pulse">✨</div>
      <div className="pointer-events-none absolute right-6 top-5 text-lg animate-pulse" style={{ animationDelay: '0.3s' }}>✨</div>
      <div className="pointer-events-none absolute left-10 bottom-4 text-lg animate-pulse" style={{ animationDelay: '0.6s' }}>✨</div>
      <div className="pointer-events-none absolute right-4 bottom-3 text-xl animate-pulse" style={{ animationDelay: '0.9s' }}>✨</div>
      <div className="text-4xl">🎉</div>
      <h3 className="mt-2 text-base font-bold text-slate-900 sm:text-lg">分析完了！</h3>
      <p className="mt-1 text-xs text-slate-600 sm:text-sm">
        結果を共有して、同タイプの仲間と栄養戦略を比べてみる
      </p>
      <a href={xUrl} target="_blank" rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-slate-800">
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        結果を X でシェア
      </a>
    </div>
  )
}

/* ─── SupplementChip (Step 3 グリッド要素) ──────────────────────── */

function SupplementChip({ preset, added, onAdd }: { preset: SupplementPreset; added: boolean; onAdd: (slug: string, dose: number) => void }) {
  return (
    <button type="button" onClick={() => !added && onAdd(preset.slug, preset.typicalDose)} disabled={added}
      className={`flex items-start gap-2 rounded-lg border p-2.5 text-left transition ${
        added ? 'border-emerald-300 bg-emerald-50/70 opacity-70' : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/40'
      }`}>
      <div className="text-lg">{preset.emoji}</div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-1">
          <div className="truncate text-xs font-semibold text-slate-900 sm:text-sm">{preset.labelJa}</div>
          {added && <Check className="h-3.5 w-3.5 flex-shrink-0 text-emerald-600" />}
        </div>
        <div className="mt-0.5 text-[10px] text-slate-600 sm:text-xs">
          {preset.typicalDose} {preset.unit}
        </div>
        <div className="mt-0.5 truncate text-[10px] text-slate-500">{preset.descJa}</div>
      </div>
    </button>
  )
}

function formatAmount(value: number, unit: string): string {
  if (value === 0) return `0 ${unit}`
  if (value < 1) return `${value.toFixed(1)} ${unit}`
  if (value < 10) return `${value.toFixed(1)} ${unit}`
  return `${Math.round(value)} ${unit}`
}
