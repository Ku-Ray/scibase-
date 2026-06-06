'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  AlertCircle,
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Info,
  Minus,
  Plus,
  RotateCcw,
  Salad,
  Sparkles,
  Utensils,
  Pill,
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
  SUPPLEMENT_SLUG_TO_NUTRIENT,
  applyExclusivity,
  calculateSufficiency,
  groupResultsByStatus,
  type SufficiencyResult,
  type SufficiencyStatus,
  type SupplementInput,
} from '@/lib/food-nutrient'

const AGE_OPTIONS: AgeGroup[] = ['10s', '20s', '30s', '40s', '50s', '60s', '70s+']

const STATUS_LABEL: Record<SufficiencyStatus, string> = {
  excess_warning: '過剰摂取注意',
  severe_deficit: '大幅に不足傾向',
  mild_deficit: 'やや不足傾向',
  sufficient: '充足の目安',
  no_data: 'データなし',
}

const STATUS_STYLE: Record<SufficiencyStatus, { wrap: string; icon: string; bar: string; iconBg: string; text: string }> = {
  excess_warning: {
    wrap: 'border-rose-200 bg-rose-50/60',
    icon: 'text-rose-600',
    bar: 'bg-rose-500',
    iconBg: 'bg-rose-100',
    text: 'text-rose-800',
  },
  severe_deficit: {
    wrap: 'border-orange-200 bg-orange-50/60',
    icon: 'text-orange-600',
    bar: 'bg-orange-500',
    iconBg: 'bg-orange-100',
    text: 'text-orange-800',
  },
  mild_deficit: {
    wrap: 'border-amber-200 bg-amber-50/60',
    icon: 'text-amber-600',
    bar: 'bg-amber-400',
    iconBg: 'bg-amber-100',
    text: 'text-amber-800',
  },
  sufficient: {
    wrap: 'border-emerald-200 bg-emerald-50/60',
    icon: 'text-emerald-600',
    bar: 'bg-emerald-500',
    iconBg: 'bg-emerald-100',
    text: 'text-emerald-800',
  },
  no_data: {
    wrap: 'border-slate-200 bg-slate-50/60',
    icon: 'text-slate-500',
    bar: 'bg-slate-400',
    iconBg: 'bg-slate-100',
    text: 'text-slate-700',
  },
}

const SUPPLEMENT_OPTIONS = Object.keys(SUPPLEMENT_SLUG_TO_NUTRIENT).map(slug => {
  const nutrientKey = SUPPLEMENT_SLUG_TO_NUTRIENT[slug]
  const meta = NUTRIENT_META[nutrientKey]
  return {
    slug,
    labelJa: meta?.labelJa ?? slug,
    unit: SUPPLEMENT_INPUT_UNIT[slug] ?? 'mg',
  }
})

const CATEGORY_LABEL = {
  diet_pattern: '食事スタイル',
  food_habit: '食習慣（複数選択可）',
  modifier: 'ライフスタイル（吸収・消費に影響）',
} as const

export function NutrientSufficiencyClient() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [age, setAge] = useState<AgeGroup>('30s')
  const [sex, setSex] = useState<Sex>('female')
  const [lifeStage, setLifeStage] = useState<LifeStage>('normal')
  const [foodPresetIds, setFoodPresetIds] = useState<string[]>([])
  const [supplements, setSupplements] = useState<SupplementInput[]>([])
  const [results, setResults] = useState<SufficiencyResult[] | null>(null)
  const [expanded, setExpanded] = useState<Record<SufficiencyStatus, boolean>>({
    excess_warning: true,
    severe_deficit: true,
    mild_deficit: true,
    sufficient: false,
    no_data: false,
  })
  const resultRef = useRef<HTMLDivElement>(null)

  const lifeStageAvailable = canSelectLifeStage(age, sex)

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

  const addSupplement = () => {
    const used = new Set(supplements.map(s => s.slug))
    const next = SUPPLEMENT_OPTIONS.find(o => !used.has(o.slug))
    if (!next) return
    setSupplements(prev => [...prev, { slug: next.slug, dose: 0 }])
  }

  const updateSupplement = (idx: number, patch: Partial<SupplementInput>) => {
    setSupplements(prev => prev.map((s, i) => (i === idx ? { ...s, ...patch } : s)))
  }

  const removeSupplement = (idx: number) => {
    setSupplements(prev => prev.filter((_, i) => i !== idx))
  }

  const handleCalculate = () => {
    const res = calculateSufficiency({
      age,
      sex,
      lifeStage,
      foodPresetIds,
      supplements: supplements.filter(s => s.dose > 0),
    })
    setResults(res)
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  const handleReset = () => {
    setStep(1)
    setFoodPresetIds([])
    setSupplements([])
    setResults(null)
    setLifeStage('normal')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const grouped = useMemo(() => (results ? groupResultsByStatus(results) : null), [results])

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
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

      {/* Stepper */}
      <div className="mb-6 flex items-center justify-center gap-1.5 text-xs font-medium sm:text-sm">
        {[1, 2, 3].map(n => (
          <div key={n} className="flex items-center">
            <button
              type="button"
              onClick={() => setStep(n as 1 | 2 | 3)}
              className={`flex h-7 w-7 items-center justify-center rounded-full transition ${
                step === n
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : step > n
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-slate-200 text-slate-500'
              }`}
            >
              {step > n ? <Check className="h-4 w-4" /> : n}
            </button>
            {n < 3 && <div className={`h-0.5 w-8 sm:w-12 ${step > n ? 'bg-emerald-300' : 'bg-slate-200'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
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
                  <button
                    type="button"
                    key={a}
                    onClick={() => handleAgeChange(a)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
                      age === a
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {AGE_GROUP_LABEL[a]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">性別</label>
              <div className="flex gap-2">
                {(['female', 'male'] as Sex[]).map(s => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => handleSexChange(s)}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                      sex === s
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
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
                    <button
                      type="button"
                      key={ls}
                      onClick={() => setLifeStage(ls)}
                      className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                        lifeStage === ls
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {LIFE_STAGE_LABEL[ls]}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
            >
              次へ
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* Step 2 */}
      {step === 2 && (
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
                        <button
                          type="button"
                          key={p.id}
                          onClick={() => togglePreset(p.id)}
                          className={`flex items-start gap-2 rounded-lg border p-3 text-left transition ${
                            selected
                              ? 'border-emerald-500 bg-emerald-50/70'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div
                            className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border ${
                              selected ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 bg-white'
                            }`}
                          >
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
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
            >
              次へ
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
            <Pill className="h-5 w-5 text-emerald-600" />
            Step 3: サプリの摂取（任意）
          </h2>
          <p className="mb-4 text-xs text-slate-600 sm:text-sm">
            飲んでいるサプリがあれば追加してください。何も追加せずに「計算する」を押してもOKです。
          </p>

          <div className="space-y-2">
            {supplements.map((s, i) => {
              const opt = SUPPLEMENT_OPTIONS.find(o => o.slug === s.slug)
              return (
                <div key={i} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/50 p-2.5">
                  <select
                    value={s.slug}
                    onChange={e => updateSupplement(i, { slug: e.target.value })}
                    className="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                  >
                    {SUPPLEMENT_OPTIONS.map(o => (
                      <option key={o.slug} value={o.slug}>
                        {o.labelJa}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={0}
                      step={opt && opt.unit === 'mg' ? 1 : 0.1}
                      value={s.dose === 0 ? '' : s.dose}
                      placeholder="用量"
                      onChange={e => updateSupplement(i, { dose: Number(e.target.value) || 0 })}
                      className="w-20 rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                    />
                    <span className="w-12 text-xs text-slate-600">{opt?.unit ?? 'mg'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSupplement(i)}
                    className="rounded-md p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                    aria-label="削除"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              )
            })}

            {supplements.length < SUPPLEMENT_OPTIONS.length && (
              <button
                type="button"
                onClick={addSupplement}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-700"
              >
                <Plus className="h-4 w-4" />
                サプリを追加
              </button>
            )}
          </div>

          <div className="mt-3 rounded-lg bg-amber-50/70 p-3 text-xs text-amber-800">
            <Info className="mr-1 inline h-3.5 w-3.5" />
            ビタミンD 1000 IU ≒ 25 μg ／ ビタミンA 5000 IU ≒ 1500 μgRAE ／ ビタミンE 1 IU ≒ 0.67 mg（α-トコフェロール換算）。市販サプリのラベルが IU 表記の場合はこの目安で換算してください。
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
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
            >
              <Sparkles className="h-4 w-4" />
              計算する
            </button>
          </div>
        </section>
      )}

      {/* Results */}
      {results && grouped && (
        <section ref={resultRef} className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">結果：充足率の目安</h2>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              やり直す
            </button>
          </div>

          {/* Profile summary */}
          <div className="mb-5 rounded-lg bg-slate-50 p-3 text-xs text-slate-700 sm:text-sm">
            <span className="font-medium">条件：</span>
            {AGE_GROUP_LABEL[age]}・{SEX_LABEL[sex]}
            {lifeStage !== 'normal' && `・${LIFE_STAGE_LABEL[lifeStage]}`}・食事 preset {foodPresetIds.length} 件・サプリ {supplements.filter(s => s.dose > 0).length} 件
          </div>

          {(['excess_warning', 'severe_deficit', 'mild_deficit', 'sufficient'] as const).map(status => {
            const items = grouped[status]
            if (items.length === 0) return null
            const style = STATUS_STYLE[status]
            const isOpen = expanded[status]
            return (
              <div key={status} className={`mb-3 overflow-hidden rounded-xl border ${style.wrap}`}>
                <button
                  type="button"
                  onClick={() => setExpanded(p => ({ ...p, [status]: !p[status] }))}
                  className="flex w-full items-center justify-between gap-2 p-4 text-left"
                >
                  <div className="flex items-center gap-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${style.iconBg}`}>
                      {status === 'excess_warning' ? (
                        <AlertTriangle className={`h-4 w-4 ${style.icon}`} />
                      ) : status === 'severe_deficit' ? (
                        <AlertCircle className={`h-4 w-4 ${style.icon}`} />
                      ) : status === 'mild_deficit' ? (
                        <AlertCircle className={`h-4 w-4 ${style.icon}`} />
                      ) : (
                        <Check className={`h-4 w-4 ${style.icon}`} />
                      )}
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${style.text}`}>{STATUS_LABEL[status]}</div>
                      <div className="text-xs text-slate-600">{items.length} 栄養素</div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-500 transition ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="space-y-3 border-t border-slate-200/60 bg-white/40 p-4">
                    {items.map(r => (
                      <NutrientRow key={r.nutrient} result={r} status={status} />
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          {/* Disclaimer */}
          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-xs leading-relaxed text-slate-700 sm:text-sm">
            <div className="mb-1.5 flex items-center gap-1.5 font-bold text-slate-900">
              <Info className="h-4 w-4" />
              ご注意（重要）
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
              {RDA_SOURCE_NAME}
              <ExternalLink className="h-3 w-3" />
            </a>
            （RDA・AI・UL の参照値）
          </li>
          <li>
            <a href={FOOD_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-emerald-700 underline-offset-2 hover:underline">
              {FOOD_SOURCE_NAME}
              <ExternalLink className="h-3 w-3" />
            </a>
            （食事 preset の栄養素貢献量）
          </li>
        </ul>
      </div>
    </main>
  )
}

function NutrientRow({ result, status }: { result: SufficiencyResult; status: SufficiencyStatus }) {
  const meta = NUTRIENT_META[result.nutrient]
  if (!meta) return null
  const style = STATUS_STYLE[status]
  const percent = result.percent
  const cappedBar = Math.min(percent, 150)
  const barWidth = (cappedBar / 150) * 100

  return (
    <div className="rounded-lg bg-white/80 p-3 ring-1 ring-slate-200/60">
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <div className="text-sm font-semibold text-slate-900">{meta.labelJa}</div>
        <div className={`text-sm font-bold ${style.text}`}>{percent}%</div>
      </div>
      <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full ${style.bar}`} style={{ width: `${barWidth}%` }} />
      </div>
      <div className="mb-2 text-xs text-slate-600">
        摂取目安 <strong className="text-slate-900">{formatAmount(result.totalIntake, meta.unit)}</strong>
        <span className="mx-1 text-slate-400">/</span>
        {result.referenceType === 'rda' ? '推奨量' : '目安量'} {formatAmount(result.reference, meta.unit)}
        {result.ul != null && (
          <>
            <span className="mx-1 text-slate-400">・</span>
            上限 {formatAmount(result.ul, meta.unit)}
          </>
        )}
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
        <Link
          href={`/ingredients/${meta.ingredientSlug}`}
          className="mt-2 inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200 transition hover:bg-emerald-50"
        >
          {meta.labelJa}の論文と製品を見る
          <ChevronRight className="h-3 w-3" />
        </Link>
      )}
      {meta.noteJa && <div className="mt-2 text-xs text-slate-500">{meta.noteJa}</div>}
    </div>
  )
}

function formatAmount(value: number, unit: string): string {
  if (value === 0) return `0 ${unit}`
  if (value < 1) return `${value.toFixed(1)} ${unit}`
  if (value < 10) return `${value.toFixed(1)} ${unit}`
  return `${Math.round(value)} ${unit}`
}
