'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import {
  AlertCircle,
  AlertTriangle,
  Award,
  BellRing,
  CalendarPlus,
  Check,
  ChevronRight,
  Eye,
  Info,
  JapaneseYen,
  Minus,
  Package,
  Pill,
  Plus,
  RotateCcw,
  Search,
  Sparkles,
  Star,
  Stethoscope,
  Target,
  TrendingUp,
  X,
  Zap,
} from 'lucide-react'
import {
  analyzeStack,
  buildRestockIcs,
  getDoseUnit,
  getInventoryStatus,
  getStackIngredientOptions,
  getStackInventory,
  getStackItemName,
  SAMPLE_STACKS,
  STACK_PRESETS,
  STACK_RESULTS_KEY,
  STACK_RESULTS_MAX,
  STACK_STORAGE_KEY,
  TIMING_EMOJI,
  TIMING_LABEL,
  TIMING_ORDER,
  type MyStackData,
  type SavedStackResult,
  type StackAnalysis,
  type StackItem,
  type StackPersonality,
  type StackTiming,
} from '@/lib/my-stack'
import {
  EVIDENCE_LABEL,
  getPopularMedicationOptions,
  LEVEL_LABEL,
  type InteractionLevel,
  type InteractionResult,
} from '@/lib/interaction'
import { CANONICAL_INTERACTIONS, CATEGORY_LABEL } from '@/lib/interaction-canonical'

type Phase = 'shelf' | 'calculating' | 'revealed'

const LEVEL_STYLE: Record<
  InteractionLevel,
  { wrap: string; text: string; chip: string; icon: typeof AlertCircle }
> = {
  avoid: { wrap: 'border-red-300 bg-red-50', text: 'text-red-700', chip: 'bg-red-100 text-red-800', icon: AlertCircle },
  caution: { wrap: 'border-amber-300 bg-amber-50', text: 'text-amber-700', chip: 'bg-amber-100 text-amber-800', icon: AlertTriangle },
  monitor: { wrap: 'border-sky-300 bg-sky-50', text: 'text-sky-700', chip: 'bg-sky-100 text-sky-800', icon: Eye },
}

/** ひらがな→カタカナ・全角英数→半角・小文字化（検索用） */
function normalizeForSearch(s: string): string {
  return s
    .replace(/[ぁ-ゖ]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0x60))
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/　/g, ' ')
    .toLowerCase()
    .trim()
}

/* ─── useCountUp hook (ease-out cubic) ──────────────────────────── */

function useCountUp(target: number, duration = 1200, delay = 0, enabled = true): number {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)
  useEffect(() => {
    if (!enabled) { setValue(target); return }
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

/* ─── ShelfMeter（棚の充実度・sticky top） ──────────────────────── */

function ShelfMeter({ percent }: { percent: number }) {
  const animated = useCountUp(percent, 700, 0, true)
  const display = Math.round(animated)
  const tier = display >= 90 ? '✨ 分析の精度が上がる棚' : display >= 60 ? '良いペース 👍' : display >= 30 ? '用量・タイミングも入れると◎' : 'まずは 1 品から'
  const gradient = display >= 90 ? 'from-emerald-400 to-emerald-600' : display >= 60 ? 'from-amber-400 to-emerald-500' : 'from-slate-300 to-amber-400'
  return (
    <div className="sticky top-0 z-30 -mx-4 mb-6 border-b border-slate-200 bg-white/90 px-4 py-2 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-shrink-0 text-xs font-medium text-slate-700">棚の充実度</div>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div className={`h-full bg-gradient-to-r ${gradient} transition-[width] duration-500 ease-out`} style={{ width: `${Math.min(display, 100)}%` }} />
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
  const lines = [
    '棚の中の相互作用を照合中…',
    '服用中の薬との組み合わせを確認中…',
    '栄養素の重複・耐容上限を確認中…',
    '月額コストとタイミングを集計中…',
  ]
  const [step, setStep] = useState(0)
  const animated = useCountUp(100, 1800, 0, true)
  const pct = Math.round(animated)
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s < lines.length ? s + 1 : s))
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
            <div className="text-sm font-bold text-emerald-900 sm:text-base">棚を分析中...</div>
            <div className="text-xs text-emerald-700">あなたのサプリ棚を一括チェックしています</div>
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
            <span className={step > i ? 'font-medium text-emerald-900' : 'text-slate-500'}>{l}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Main client ───────────────────────────────────────────────── */

export function MyStackClient() {
  const [items, setItems] = useState<StackItem[]>([])
  const [meds, setMeds] = useState<string[]>([])
  const [phase, setPhase] = useState<Phase>('shelf')
  const [analysis, setAnalysis] = useState<StackAnalysis | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const [restored, setRestored] = useState(false)
  const [showAllPresets, setShowAllPresets] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const allOptions = useMemo(() => getStackIngredientOptions(), [])
  const popularMeds = useMemo(() => getPopularMedicationOptions(), [])

  /* ── localStorage 復元 */
  useEffect(() => {
    setHydrated(true)
    try {
      const raw = localStorage.getItem(STACK_STORAGE_KEY)
      if (!raw) return
      const data = JSON.parse(raw) as MyStackData
      const validItems = Array.isArray(data.items)
        ? data.items.filter(
            (it) =>
              typeof it?.slug === 'string' &&
              allOptions.some((o) => o.slug === it.slug),
          ).map((it) => ({
            slug: it.slug,
            dose: typeof it.dose === 'number' && it.dose > 0 ? it.dose : undefined,
            timing: Array.isArray(it.timing) ? it.timing.filter((t) => TIMING_ORDER.includes(t)) : [],
            unitsPerDay: typeof it.unitsPerDay === 'number' && it.unitsPerDay > 0 ? it.unitsPerDay : undefined,
            unitsTotal: typeof it.unitsTotal === 'number' && it.unitsTotal > 0 ? it.unitsTotal : undefined,
            startedAt: typeof it.startedAt === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(it.startedAt) ? it.startedAt : undefined,
          }))
        : []
      const validMeds = Array.isArray(data.meds)
        ? data.meds.filter((k) => CANONICAL_INTERACTIONS.some((e) => e.key === k))
        : []
      if (validItems.length > 0 || validMeds.length > 0) {
        setItems(validItems)
        setMeds(validMeds)
        setRestored(validItems.length > 0)
      }
    } catch {
      /* localStorage 不可・破損時は空棚から */
    }
  }, [allOptions])

  /* ── 棚の自動保存（復元完了後のみ） */
  useEffect(() => {
    if (!hydrated) return
    try {
      const data: MyStackData = { items, meds, updatedAt: new Date().toISOString() }
      localStorage.setItem(STACK_STORAGE_KEY, JSON.stringify(data))
    } catch {
      /* noop */
    }
  }, [hydrated, items, meds])

  /* ── 分析履歴の保存（revealed 時） */
  useEffect(() => {
    if (phase !== 'revealed' || !analysis) return
    try {
      const entry: SavedStackResult = {
        savedAt: new Date().toISOString(),
        itemCount: analysis.itemCount,
        medCount: analysis.medCount,
        score: analysis.score,
        checkpointCount: analysis.checkpointCount,
        totalMonthlyCost: analysis.costKnownCount > 0 ? analysis.totalMonthlyCost : null,
        personality: {
          emoji: analysis.personality.emoji,
          name: analysis.personality.name,
          rarity: analysis.personality.rarity,
        },
      }
      const raw = localStorage.getItem(STACK_RESULTS_KEY)
      const history: SavedStackResult[] = raw ? JSON.parse(raw) : []
      localStorage.setItem(STACK_RESULTS_KEY, JSON.stringify([entry, ...history].slice(0, STACK_RESULTS_MAX)))
    } catch {
      /* noop */
    }
  }, [phase, analysis])

  /* ── 棚の充実度（ShelfMeter） */
  const shelfPercent = useMemo(() => {
    if (items.length === 0) return 0
    const countPct = 25 + Math.min(items.length, 6) / 6 * 35
    const dosePct = items.some((i) => (i.dose ?? 0) > 0) ? 15 : 0
    const timingPct = items.some((i) => i.timing.length > 0) ? 10 : 0
    const invPct = items.some((i) => getInventoryStatus(i) != null) ? 15 : 0
    return Math.round(countPct + dosePct + timingPct + invPct)
  }, [items])

  /* ── 買い替えリマインダー .ics ダウンロード */
  const handleIcsDownload = () => {
    const ics = buildRestockIcs(getStackInventory(items))
    if (!ics) return
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'scibase-my-stack-restock.ics'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  /* ── 棚操作 */
  const addItem = (slug: string, dose?: number) => {
    setItems((prev) => (prev.some((i) => i.slug === slug) ? prev : [...prev, { slug, dose, timing: [] }]))
  }
  const removeItem = (slug: string) => setItems((prev) => prev.filter((i) => i.slug !== slug))
  const updateItem = (slug: string, patch: Partial<StackItem>) =>
    setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, ...patch } : i)))
  const toggleTiming = (slug: string, t: StackTiming) =>
    setItems((prev) =>
      prev.map((i) =>
        i.slug === slug
          ? { ...i, timing: i.timing.includes(t) ? i.timing.filter((x) => x !== t) : [...i.timing, t] }
          : i,
      ),
    )
  const toggleMed = (key: string) =>
    setMeds((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))

  const loadSample = (id: string) => {
    const sample = SAMPLE_STACKS.find((s) => s.id === id)
    if (!sample) return
    setItems(sample.items.map((it) => ({ ...it, timing: [...it.timing] })))
  }

  const handleAnalyze = () => {
    if (items.length === 0) return
    setAnalysis(analyzeStack(items, meds))
    setPhase('calculating')
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  const handleEdit = () => {
    setPhase('shelf')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReset = () => {
    if (!confirm('棚をすべて空にします。よろしいですか？')) return
    setItems([])
    setMeds([])
    setAnalysis(null)
    setPhase('shelf')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const stackSlugs = useMemo(() => new Set(items.map((i) => i.slug)), [items])

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
      {phase === 'shelf' && <ShelfMeter percent={shelfPercent} />}

      {/* Header */}
      <header className="mb-8 text-center">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
          <Package className="h-3.5 w-3.5" />
          登録した棚はブラウザに保存・いつでも更新
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          My Stack｜サプリ棚チェッカー
        </h1>
        <p className="mt-3 text-sm text-slate-600 sm:text-base">
          飲んでいるサプリを棚に登録すると、<strong>飲み合わせ・重複・耐容上限・月額コスト・タイミング</strong>を一括チェック。棚は端末内にだけ保存されます。
        </p>
      </header>

      {/* ── 棚編集フェーズ ── */}
      {phase === 'shelf' && (
        <div className="space-y-6">
          {restored && (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50/70 px-3 py-2 text-sm text-emerald-900">
              <Check className="h-4 w-4 flex-shrink-0" />
              前回の棚を復元しました（{items.length} 品）
              <button type="button" onClick={() => setRestored(false)} aria-label="閉じる" className="ml-auto text-emerald-700 hover:text-emerald-900">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* 棚（現在のアイテム） */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-1 flex items-center gap-2 text-lg font-bold text-slate-900">
              <Pill className="h-5 w-5 text-emerald-600" />
              あなたの棚
              <span className="ml-auto rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">{items.length} 品</span>
            </h2>
            <p className="mb-4 text-xs text-slate-600 sm:text-sm">
              用量とタイミングは任意入力。入れるほど重複・上限・タイミングのチェック精度が上がります。
            </p>

            {!hydrated ? (
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/40 p-6 text-center text-sm text-slate-500">
                棚を読み込んでいます…
              </div>
            ) : items.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-emerald-50/30 p-5 text-center">
                <div className="text-2xl">🧺</div>
                <p className="mt-2 text-sm text-slate-700">棚はまだ空です。下から追加するか、サンプルから始められます。</p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {SAMPLE_STACKS.map((s) => (
                    <button key={s.id} type="button" onClick={() => loadSample(s.id)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-white px-3 py-1.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-50">
                      {s.emoji} {s.labelJa}（{s.items.length} 品）
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {items.map((it) => (
                  <ShelfItemRow key={it.slug} item={it}
                    onRemove={() => removeItem(it.slug)}
                    onUpdate={(patch) => updateItem(it.slug, patch)}
                    onToggleTiming={(t) => toggleTiming(it.slug, t)} />
                ))}
              </div>
            )}
          </section>

          {/* 飲み切りが近いサプリのアラート（買い替え瞬間の導線） */}
          <InventoryAlert items={items} onIcs={handleIcsDownload} />

          {/* 追加セクション */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <Plus className="h-5 w-5 text-emerald-600" />
              棚に追加する
            </h2>

            {/* 定番プリセット */}
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">定番サプリ（タップで追加・一般的な市販量入り）</h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {(showAllPresets ? STACK_PRESETS : STACK_PRESETS.slice(0, 9)).map((p) => {
                const added = stackSlugs.has(p.slug)
                return (
                  <button key={p.slug} type="button" disabled={added} onClick={() => addItem(p.slug, p.typicalDose)}
                    className={`flex items-start gap-2 rounded-lg border p-2.5 text-left transition ${
                      added ? 'border-emerald-300 bg-emerald-50/70 opacity-70' : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/40'
                    }`}>
                    <div className="text-lg">{p.emoji}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-1">
                        <div className="truncate text-xs font-semibold text-slate-900 sm:text-sm">{p.labelJa}</div>
                        {added && <Check className="h-3.5 w-3.5 flex-shrink-0 text-emerald-600" />}
                      </div>
                      <div className="mt-0.5 text-[10px] text-slate-600 sm:text-xs">{p.typicalDose} {p.unit}</div>
                    </div>
                  </button>
                )
              })}
            </div>
            {!showAllPresets && STACK_PRESETS.length > 9 && (
              <button type="button" onClick={() => setShowAllPresets(true)}
                className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-700">
                <Plus className="h-3.5 w-3.5" />
                他の定番 {STACK_PRESETS.length - 9} 種を見る
              </button>
            )}

            {/* 全成分検索 */}
            <h3 className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-slate-500">全 {allOptions.length} 成分から検索（NMN・アシュワガンダ・コラーゲン 等）</h3>
            <IngredientSearchAdd options={allOptions} stackSlugs={stackSlugs} onAdd={(slug) => addItem(slug)} />
          </section>

          {/* 服用中の薬（任意） */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-1 flex items-center gap-2 text-lg font-bold text-slate-900">
              <Stethoscope className="h-5 w-5 text-rose-600" />
              服用中の薬（任意）
              <span className="ml-auto rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-800">{meds.length} 件</span>
            </h2>
            <p className="mb-4 text-xs text-slate-600 sm:text-sm">
              選んでおくと、棚の成分との相互作用（論文・添付文書ベース）を毎回の分析でまとめて確認できます。
            </p>
            {meds.length > 0 && (
              <ul className="mb-3 flex flex-wrap gap-2">
                {meds.map((key) => (
                  <li key={key}>
                    <button type="button" onClick={() => toggleMed(key)}
                      className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-800 hover:bg-rose-200">
                      {key}
                      <X className="h-3 w-3" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <MedSearchAdd selected={meds} onToggle={toggleMed} popularKeys={popularMeds.map((m) => m.entry.key)} />
          </section>

          {/* 分析 CTA */}
          <div className="flex flex-col items-center gap-2">
            <button type="button" onClick={handleAnalyze} disabled={items.length === 0} aria-disabled={items.length === 0}
              className={`group relative inline-flex items-center gap-1.5 overflow-hidden rounded-lg px-7 py-3.5 text-sm font-bold shadow-md transition ${
                items.length > 0
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 hover:shadow-lg'
                  : 'cursor-not-allowed bg-slate-200 text-slate-400 shadow-none'
              }`}>
              {items.length > 0 && (
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              )}
              <Sparkles className="h-4 w-4" /> 棚を分析する（{items.length} 品）
            </button>
            <div className="text-xs text-slate-500">完全無料・登録不要・データは端末内にだけ保存</div>
          </div>
        </div>
      )}

      {/* ── CalculationTheatre ── */}
      {phase === 'calculating' && (
        <div ref={resultRef}>
          <CalculationTheatre onComplete={() => setPhase('revealed')} />
        </div>
      )}

      {/* ── 結果フェーズ ── */}
      {phase === 'revealed' && analysis && (
        <section ref={resultRef} className="space-y-5">
          <StackPersonalityHero analysis={analysis} />

          {/* 医療判断ではない notice */}
          <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-4">
            <div className="flex items-start gap-2">
              <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-600" />
              <div className="text-xs leading-relaxed text-sky-900 sm:text-sm">
                <strong>本ツールは棚の組み合わせを整理するための情報提供です。</strong>
                相互作用・上限の表示は診断ではありません。薬を服用中の方・体調に不安がある方は、併用の最終判断を必ず医師・薬剤師にご相談ください。
              </div>
            </div>
          </div>

          <InteractionSection analysis={analysis} />
          <DuplicateUlSection analysis={analysis} />
          <TimingSection items={items} analysis={analysis} />
          <CostSection analysis={analysis} />
          <InventorySection items={items} onIcs={handleIcsDownload} />
          <SuggestionSection analysis={analysis} />

          {analysis.optimizedScore > analysis.score && (
            <BeforeAfterCard before={analysis.score} after={analysis.optimizedScore} />
          )}

          <CompletionCelebration analysis={analysis} />

          {/* マイページ保存通知 */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
            <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 text-slate-700">
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                棚と分析結果はブラウザに自動保存されました
              </div>
              <Link href="/my" className="inline-flex items-center gap-0.5 font-medium text-emerald-700 hover:underline">
                マイページで見る <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          <NewsletterSignup source="my-stack" />

          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" onClick={handleEdit}
              className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700">
              <Pill className="h-4 w-4" /> 棚を編集する
            </button>
            <button type="button" onClick={handleReset}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              <RotateCcw className="h-4 w-4" /> 棚を空にする
            </button>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-xs leading-relaxed text-slate-700 sm:text-sm">
            <div className="mb-1.5 flex items-center gap-1.5 font-bold text-slate-900">
              <Info className="h-4 w-4" /> ご注意（重要）
            </div>
            <p>
              本ツールが照合できるのは SciBase 収載の成分・物質の組み合わせのみで、未収載の物質や個人の体質による反応は捕捉できません。表示は情報提供を目的としたもので、診断・治療の代替にはなりません。サプリと医薬品の併用、体調の変化、妊娠中・授乳中・持病のある方の利用については、必ず医師・薬剤師にご相談ください。
            </p>
          </div>

          {/* データ出典 */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-600">
            <div className="mb-1.5 font-bold text-slate-900">データ出典</div>
            <ul className="space-y-1">
              <li>相互作用：SciBase 収載の論文・添付文書ベースの相互作用データ（出典は各成分ページに明記）</li>
              <li>耐容上限量（UL）：厚生労働省「日本人の食事摂取基準（2020年版）」（成人の最も厳しい基準で判定）</li>
              <li>月額コスト：SciBase 収載製品（評価上位）の参考値。実際の購入製品により変動します</li>
            </ul>
          </div>
        </section>
      )}
    </main>
  )
}

/* ─── 棚アイテム行 ──────────────────────────────────────────────── */

function todayDateStr(): string {
  const d = new Date()
  const m = `${d.getMonth() + 1}`.padStart(2, '0')
  const day = `${d.getDate()}`.padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

/** '2026-06-16' → '6/16' */
function fmtMd(dateStr: string): string {
  const [, m, d] = dateStr.split('-')
  return `${Number(m)}/${Number(d)}`
}

function parsePositiveInt(value: string): number | undefined {
  if (value === '') return undefined
  const n = Math.floor(Number(value))
  return n > 0 ? n : undefined
}

function ShelfItemRow({ item, onRemove, onUpdate, onToggleTiming }: {
  item: StackItem
  onRemove: () => void
  onUpdate: (patch: Partial<StackItem>) => void
  onToggleTiming: (t: StackTiming) => void
}) {
  const unit = getDoseUnit(item.slug)
  const inv = getInventoryStatus(item)
  const hasInvFields = item.unitsPerDay != null || item.unitsTotal != null || item.startedAt != null
  const [invOpen, setInvOpen] = useState(false)
  return (
    <div className="rounded-xl border border-slate-200 bg-emerald-50/20 p-3">
      <div className="flex items-center gap-2">
        <Link href={`/ingredients/${item.slug}`} className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-900 hover:text-emerald-700 hover:underline">
          {getStackItemName(item.slug)}
        </Link>
        <input type="number" min={0} step={unit === 'μg' || unit === 'μgRAE' ? 0.5 : 1} placeholder="用量"
          value={item.dose ?? ''}
          onChange={(e) => onUpdate({ dose: e.target.value === '' ? undefined : Math.max(0, Number(e.target.value)) || undefined })}
          className="w-20 rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none" />
        <span className="w-12 flex-shrink-0 text-xs text-slate-600">{unit}/日</span>
        <button type="button" onClick={onRemove} aria-label="棚から外す"
          className="rounded-md p-1 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600">
          <Minus className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {TIMING_ORDER.map((t) => {
          const on = item.timing.includes(t)
          return (
            <button key={t} type="button" onClick={() => onToggleTiming(t)}
              className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
                on ? 'border-emerald-500 bg-emerald-100 text-emerald-800' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
              }`}>
              {TIMING_EMOJI[t]} {TIMING_LABEL[t]}
            </button>
          )
        })}
        <button type="button" onClick={() => setInvOpen((v) => !v)}
          className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
            inv
              ? inv.level === 'ok'
                ? 'border-emerald-300 bg-white text-emerald-700'
                : 'border-amber-400 bg-amber-50 text-amber-800'
              : 'border-dashed border-slate-300 bg-white text-slate-500 hover:border-emerald-300 hover:text-emerald-700'
          }`}>
          {inv
            ? inv.level === 'out'
              ? '📦 飲み切り済みかも'
              : `📦 残り約 ${inv.daysLeft} 日`
            : '📦 残量を管理'}
        </button>
      </div>
      {invOpen && (
        <div className="mt-2 rounded-lg border border-slate-200 bg-white p-2.5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-700">
            <label className="flex items-center gap-1">
              ボトル
              <input type="number" min={1} placeholder="60" value={item.unitsTotal ?? ''}
                onChange={(e) => onUpdate({ unitsTotal: parsePositiveInt(e.target.value) })}
                className="w-16 rounded-md border border-slate-300 px-2 py-1 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none" />
              粒
            </label>
            <label className="flex items-center gap-1">
              1日
              <input type="number" min={1} placeholder="2" value={item.unitsPerDay ?? ''}
                onChange={(e) => onUpdate({ unitsPerDay: parsePositiveInt(e.target.value) })}
                className="w-14 rounded-md border border-slate-300 px-2 py-1 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none" />
              粒
            </label>
            <label className="flex items-center gap-1">
              開始日
              <input type="date" value={item.startedAt ?? ''}
                onChange={(e) => onUpdate({ startedAt: e.target.value || undefined })}
                className="rounded-md border border-slate-300 px-2 py-1 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none" />
            </label>
            <button type="button" onClick={() => onUpdate({ startedAt: todayDateStr() })}
              className="rounded-md border border-emerald-300 bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700 hover:bg-emerald-100">
              今日から
            </button>
          </div>
          {inv ? (
            <div className="mt-2 text-[11px] text-slate-600">
              残り約 {inv.remainingUnits} 粒 → <strong className="text-slate-900">{fmtMd(inv.depletionDate)} ごろ飲み切り</strong>（毎日 {inv.unitsPerDay} 粒の概算・飲み忘れは反映されません）
            </div>
          ) : (
            <div className="mt-2 text-[11px] text-slate-500">3 つ入力すると飲み切り日を予測します</div>
          )}
          {hasInvFields && (
            <button type="button"
              onClick={() => onUpdate({ unitsPerDay: undefined, unitsTotal: undefined, startedAt: undefined })}
              className="mt-2 text-[11px] text-slate-400 underline-offset-2 hover:text-rose-600 hover:underline">
              残量管理を解除
            </button>
          )}
        </div>
      )}
    </div>
  )
}

/* ─── 飲み切りアラート（棚画面・買い替え瞬間の導線） ────────────── */

function InventoryAlert({ items, onIcs }: { items: StackItem[]; onIcs: () => void }) {
  const urgent = getStackInventory(items).filter((s) => s.level !== 'ok')
  if (urgent.length === 0) return null
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 sm:p-5">
      <div className="flex items-center gap-2 text-sm font-bold text-amber-900">
        <BellRing className="h-4 w-4" /> そろそろ飲み切りのサプリがあります
      </div>
      <ul className="mt-2 space-y-1.5">
        {urgent.map((s) => (
          <li key={s.slug} className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs sm:text-sm">
            <span className="font-medium text-amber-900">
              {s.nameJa}：{s.level === 'out' ? '飲み切り済みの可能性' : `あと約 ${s.daysLeft} 日（${fmtMd(s.depletionDate)} ごろ）`}
            </span>
            <Link href={`/ingredients/${s.slug}`} className="inline-flex items-center gap-0.5 font-medium text-emerald-700 hover:underline">
              買い替え前に評価と価格を確認 <ChevronRight className="h-3 w-3" />
            </Link>
          </li>
        ))}
      </ul>
      <button type="button" onClick={onIcs}
        className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-medium text-amber-900 transition hover:bg-amber-100">
        <CalendarPlus className="h-3.5 w-3.5" /> 買い替えリマインダーをカレンダーに追加（.ics）
      </button>
    </div>
  )
}

/* ─── 在庫と買い替えタイミング（結果画面） ──────────────────────── */

function InventorySection({ items, onIcs }: { items: StackItem[]; onIcs: () => void }) {
  const inv = getStackInventory(items)
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100">
          <BellRing className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">在庫と買い替えタイミング</h3>
          <div className="text-xs text-slate-600">粒数ベースの飲み切り予測（概算・飲み忘れは反映されません）</div>
        </div>
      </div>

      {inv.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-4 text-xs leading-relaxed text-slate-600 sm:text-sm">
          棚の各アイテムの「📦 残量を管理」でボトルの粒数・1 日の粒数・開始日を入れると、飲み切り日を予測して買い替えのタイミングをここでお知らせします。リマインダーのカレンダー追加（.ics）にも対応。
        </div>
      ) : (
        <>
          <div className="space-y-1.5">
            {inv.map((s) => (
              <div key={s.slug} className={`rounded-lg px-3 py-2 text-sm ${
                s.level === 'out' ? 'bg-rose-50 ring-1 ring-rose-200' : s.level === 'soon' ? 'bg-amber-50 ring-1 ring-amber-200' : 'bg-slate-50/70'
              }`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                  <span className="font-medium text-slate-900">{s.nameJa}</span>
                  <span className={`text-xs font-semibold ${s.level === 'out' ? 'text-rose-700' : s.level === 'soon' ? 'text-amber-700' : 'text-slate-600'}`}>
                    {s.level === 'out' ? '飲み切り済みの可能性' : `あと約 ${s.daysLeft} 日（${fmtMd(s.depletionDate)} ごろ・残り約 ${s.remainingUnits} 粒）`}
                  </span>
                </div>
                {s.level !== 'ok' && (
                  <Link href={`/ingredients/${s.slug}`}
                    className="mt-1 inline-flex items-center gap-0.5 text-xs font-medium text-emerald-700 hover:underline">
                    買い替え前に評価と価格を確認 <ChevronRight className="h-3 w-3" />
                  </Link>
                )}
              </div>
            ))}
          </div>
          <button type="button" onClick={onIcs}
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50/40 hover:text-emerald-700">
            <CalendarPlus className="h-3.5 w-3.5" /> 買い替えリマインダーをカレンダーに追加（.ics）
          </button>
        </>
      )}
    </div>
  )
}

/* ─── 成分検索（追加用） ────────────────────────────────────────── */

function IngredientSearchAdd({ options, stackSlugs, onAdd }: {
  options: { slug: string; nameJa: string; nameEn: string; aliases?: string[] }[]
  stackSlugs: Set<string>
  onAdd: (slug: string) => void
}) {
  const [q, setQ] = useState('')
  const results = useMemo(() => {
    const nq = normalizeForSearch(q)
    if (!nq) return []
    return options
      .filter((o) =>
        normalizeForSearch(o.nameJa).includes(nq) ||
        normalizeForSearch(o.nameEn).includes(nq) ||
        (o.aliases ?? []).some((a) => normalizeForSearch(a).includes(nq)),
      )
      .slice(0, 8)
  }, [q, options])

  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2">
        <Search className="h-4 w-4 flex-shrink-0 text-slate-400" />
        <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="成分名で検索（例：NMN・あしゅわがんだ）"
          className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none" />
        {q && (
          <button type="button" onClick={() => setQ('')} aria-label="クリア" className="text-slate-400 hover:text-slate-600">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {results.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
          {results.map((o) => {
            const added = stackSlugs.has(o.slug)
            return (
              <li key={o.slug}>
                <button type="button" disabled={added}
                  onClick={() => { onAdd(o.slug); setQ('') }}
                  className={`flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm transition ${
                    added ? 'cursor-not-allowed bg-emerald-50/60 text-slate-400' : 'text-slate-900 hover:bg-emerald-50'
                  }`}>
                  <span className="min-w-0 flex-1 truncate">{o.nameJa} <span className="text-xs text-slate-400">{o.nameEn}</span></span>
                  {added ? <Check className="h-4 w-4 flex-shrink-0 text-emerald-600" /> : <Plus className="h-4 w-4 flex-shrink-0 text-emerald-600" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
      {q && results.length === 0 && (
        <div className="mt-1 rounded-lg border border-dashed border-slate-200 bg-slate-50/60 px-3 py-2 text-xs text-slate-500">
          見つかりませんでした。別の表記（カタカナ・英語名）でもお試しください。
        </div>
      )}
    </div>
  )
}

/* ─── 薬の選択（人気 + 検索） ───────────────────────────────────── */

function MedSearchAdd({ selected, onToggle, popularKeys }: {
  selected: string[]
  onToggle: (key: string) => void
  popularKeys: string[]
}) {
  const [q, setQ] = useState('')
  const [showAll, setShowAll] = useState(false)
  const results = useMemo(() => {
    const nq = normalizeForSearch(q)
    if (!nq) return []
    return CANONICAL_INTERACTIONS
      .filter((e) => normalizeForSearch(e.key).includes(nq) || normalizeForSearch(CATEGORY_LABEL[e.category]).includes(nq) || e.pattern.test(q))
      .slice(0, 8)
  }, [q])

  const shownPopular = showAll ? popularKeys : popularKeys.slice(0, 10)

  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {shownPopular.map((key) => {
          const on = selected.includes(key)
          return (
            <button key={key} type="button" onClick={() => onToggle(key)}
              className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
                on ? 'border-rose-400 bg-rose-100 text-rose-800' : 'border-slate-200 bg-white text-slate-600 hover:border-rose-200 hover:bg-rose-50/40'
              }`}>
              {key}
            </button>
          )
        })}
        {!showAll && popularKeys.length > 10 && (
          <button type="button" onClick={() => setShowAll(true)}
            className="rounded-full border border-dashed border-slate-300 px-2.5 py-1 text-[11px] font-medium text-slate-500 hover:border-rose-200 hover:text-rose-700">
            + 他 {popularKeys.length - 10} 件
          </button>
        )}
      </div>
      <div className="relative mt-3">
        <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2">
          <Search className="h-4 w-4 flex-shrink-0 text-slate-400" />
          <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="薬の名前・分類で検索（例：ロキソニン・降圧）"
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none" />
          {q && (
            <button type="button" onClick={() => setQ('')} aria-label="クリア" className="text-slate-400 hover:text-slate-600">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {results.length > 0 && (
          <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
            {results.map((e) => {
              const on = selected.includes(e.key)
              return (
                <li key={e.key}>
                  <button type="button" onClick={() => { onToggle(e.key); setQ('') }}
                    className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm text-slate-900 transition hover:bg-rose-50">
                    <span className="min-w-0 flex-1 truncate">{e.key} <span className="text-xs text-slate-400">{CATEGORY_LABEL[e.category]}</span></span>
                    {on ? <Check className="h-4 w-4 flex-shrink-0 text-rose-600" /> : <Plus className="h-4 w-4 flex-shrink-0 text-rose-600" />}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

/* ─── PersonalityHero（結果の山①） ─────────────────────────────── */

function StackPersonalityHero({ analysis }: { analysis: StackAnalysis }) {
  const { personality, score, itemCount, checkpointCount } = analysis
  const scoreAnim = useCountUp(score, 1300, 200, true)
  const rarityAnim = useCountUp(personality.rarity, 1100, 600, true)
  const stars = personality.rarity < 5 ? 5 : personality.rarity < 12 ? 4 : personality.rarity < 22 ? 3 : personality.rarity < 35 ? 2 : 1
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${personality.colorClass} p-5 text-white shadow-lg sm:p-7`}>
      <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-8 -left-4 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
      <div className="relative">
        <div className="flex items-center gap-1.5 text-xs font-medium opacity-90">
          <Award className="h-3.5 w-3.5" /> あなたの棚タイプ
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
              <div className="text-xs font-medium opacity-90">棚スコア</div>
              <div className="mt-0.5 text-3xl font-bold sm:text-4xl">{Math.round(scoreAnim)}<span className="text-lg opacity-80">/100</span></div>
            </div>
            <div className="text-right text-xs opacity-90">
              <div>{itemCount} 品の棚</div>
              <div className="mt-0.5">確認ポイント <strong className="text-base">{checkpointCount}</strong> 件</div>
            </div>
          </div>
          <div className="mt-2 text-[10px] leading-relaxed opacity-80 sm:text-xs">
            確認ポイントが少ないほど高くなる「棚の整理度」の目安です。健康状態の評価ではありません。
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── 相互作用マップ ────────────────────────────────────────────── */

function InteractionSection({ analysis }: { analysis: StackAnalysis }) {
  const { interactions, medCount } = analysis
  const grouped = useMemo(() => {
    const g: Record<InteractionLevel, InteractionResult[]> = { avoid: [], caution: [], monitor: [] }
    for (const r of interactions) g[r.level].push(r)
    return g
  }, [interactions])

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-1 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100">
          <Stethoscope className="h-5 w-5 text-rose-600" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">相互作用マップ</h3>
          <div className="text-xs text-slate-600">棚の中の成分どうし{medCount > 0 ? ` と服用中の薬 ${medCount} 件` : ''}を照合</div>
        </div>
      </div>

      {interactions.length === 0 ? (
        <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
          <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-emerald-800">
            <Check className="h-4 w-4" />
            収載範囲では該当する相互作用は見つかりませんでした
          </div>
          <p className="text-xs leading-relaxed text-emerald-900/80 sm:text-sm">
            ただし照合できるのは SciBase 収載の組み合わせのみです。未収載の物質・個人の体質による反応の可能性は残るため、併用前は医師・薬剤師にご相談ください。
          </p>
        </div>
      ) : (
        <div className="mt-3 space-y-3">
          {(['avoid', 'caution', 'monitor'] as InteractionLevel[]).map((lvl) => {
            const list = grouped[lvl]
            if (list.length === 0) return null
            const style = LEVEL_STYLE[lvl]
            const Icon = style.icon
            return (
              <div key={lvl} className={`rounded-xl border ${style.wrap} p-4`}>
                <div className={`mb-3 flex items-center gap-2 text-sm font-semibold ${style.text}`}>
                  <Icon className="h-4 w-4" />
                  {LEVEL_LABEL[lvl]}
                  <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs">{list.length} 件</span>
                </div>
                <ul className="space-y-3">
                  {list.map((r, i) => (
                    <li key={`${r.ingredientSlug}-${i}`} className="rounded-lg bg-white/80 p-3 ring-1 ring-slate-200/60">
                      <div className="flex flex-wrap items-center gap-1.5 text-sm font-semibold text-slate-900">
                        <Link href={`/ingredients/${r.ingredientSlug}`} className="hover:text-emerald-700 hover:underline">{r.ingredientNameJa}</Link>
                        <span className="text-slate-400">×</span>
                        <span>{r.substance}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {r.matchedKeys.map((k) => (
                          <span key={k} className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${style.chip}`}>{k}</span>
                        ))}
                      </div>
                      <div className="mt-2 text-xs leading-relaxed text-slate-700 sm:text-sm">{r.mechanism}</div>
                      <div className="mt-1.5 text-xs leading-relaxed text-slate-700 sm:text-sm"><strong className="text-slate-900">推奨行動：</strong>{r.action}</div>
                      <div className="mt-1.5 text-[10px] text-slate-500 sm:text-xs">
                        エビデンス：{EVIDENCE_LABEL[r.evidence]}{r.source ? `／出典：${r.source}` : ''}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
          <div className="rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
            表示はレベル分けされた警告であり、診断ではありません。<strong className="text-slate-800">併用の最終判断は必ず医師・薬剤師にご相談ください。</strong>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── 重複・上限 ────────────────────────────────────────────────── */

function DuplicateUlSection({ analysis }: { analysis: StackAnalysis }) {
  const { duplicates, ulFindings } = analysis
  if (duplicates.length === 0 && ulFindings.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
            <Check className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">重複・耐容上限</h3>
            <div className="text-xs text-slate-600">同じ栄養素の重複や、上限に近い摂取は見つかりませんでした（用量入力済みの範囲）</div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">重複・耐容上限</h3>
          <div className="text-xs text-slate-600">同じ栄養素の重なりと、厚労省 UL（耐容上限量）との比較</div>
        </div>
      </div>

      <div className="space-y-3">
        {duplicates.map((d) => (
          <div key={d.nutrientKey} className="rounded-xl border border-amber-200 bg-amber-50/50 p-3">
            <div className="text-sm font-semibold text-amber-900">
              {d.labelJa} が {d.names.length} 品で重複（{d.names.join('・')}）
            </div>
            <div className="mt-1 text-xs leading-relaxed text-amber-800">
              {d.totalDose != null
                ? `入力済みの合計：${formatNum(d.totalDose)} ${d.unit}/日${d.allDosed ? '' : '（用量未入力の品は含まれていません）'}`
                : '用量を入力すると合計量と上限の比較ができます'}
              。1 つにまとめると管理もコストも下げやすくなります。
            </div>
          </div>
        ))}

        {ulFindings.map((f) => {
          const over = f.level === 'over'
          const barPct = Math.min(f.ratio * 100, 150) / 150 * 100
          return (
            <div key={f.nutrientKey} className={`rounded-xl border p-3 ${over ? 'border-rose-200 bg-rose-50/60' : 'border-amber-200 bg-amber-50/50'}`}>
              <div className={`flex items-baseline justify-between gap-2 text-sm font-semibold ${over ? 'text-rose-900' : 'text-amber-900'}`}>
                <span>{f.labelJa}（{f.names.join('・')}）</span>
                <span>{Math.round(f.ratio * 100)}%</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/80">
                <div className={`h-full ${over ? 'bg-rose-500' : 'bg-amber-400'}`} style={{ width: `${barPct}%` }} />
              </div>
              <div className={`mt-2 text-xs leading-relaxed ${over ? 'text-rose-800' : 'text-amber-800'}`}>
                サプリからの合計 {formatNum(f.totalDose)} {f.unit}/日 ／ 耐容上限量（UL）{formatNum(f.ul)} {f.unit}（成人の最も厳しい基準）。
                {over
                  ? '上限を超える摂取です。用量を見直すか、医師・管理栄養士にご相談ください。'
                  : '上限の 80% を超えています。続ける場合は用量の見直しを検討してみてください。'}
                {f.ulExcludesFood
                  ? ' この UL はサプリ等の通常の食品以外からの摂取に適用される基準です。'
                  : ' 食事からの摂取分はこの判定に含まれていません。'}
              </div>
            </div>
          )
        })}

        <div className="rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
          UL は年代・性別で異なります。ここでは成人の最も厳しい基準で確認しているため、実際の上限はこれより高い場合があります。実際の栄養状態の評価は血液検査が必要です。
        </div>
      </div>
    </div>
  )
}

/* ─── タイミング最適化表 ────────────────────────────────────────── */

function TimingSection({ items, analysis }: { items: StackItem[]; analysis: StackAnalysis }) {
  const unassigned = items.filter((i) => i.timing.length === 0)
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100">
          <Target className="h-5 w-5 text-sky-600" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">飲むタイミング表</h3>
          <div className="text-xs text-slate-600">1 日の配置と、時間を分けたい組み合わせ</div>
        </div>
      </div>

      <div className="space-y-1.5">
        {TIMING_ORDER.map((t) => {
          const assigned = items.filter((i) => i.timing.includes(t))
          return (
            <div key={t} className="flex items-start gap-2 rounded-lg bg-slate-50/70 p-2.5">
              <div className="w-20 flex-shrink-0 text-xs font-semibold text-slate-700">{TIMING_EMOJI[t]} {TIMING_LABEL[t]}</div>
              <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
                {assigned.length === 0 ? (
                  <span className="text-xs text-slate-400">—</span>
                ) : (
                  assigned.map((i) => (
                    <span key={i.slug} className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-slate-800 ring-1 ring-slate-200">
                      {getStackItemName(i.slug)}
                    </span>
                  ))
                )}
              </div>
            </div>
          )
        })}
        {unassigned.length > 0 && (
          <div className="flex items-start gap-2 rounded-lg bg-slate-50/70 p-2.5">
            <div className="w-20 flex-shrink-0 text-xs font-semibold text-slate-500">❓ 未設定</div>
            <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
              {unassigned.map((i) => (
                <span key={i.slug} className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
                  {getStackItemName(i.slug)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {analysis.separations.length > 0 && (
        <div className="mt-4 space-y-2">
          {analysis.separations.map((s, i) => (
            <div key={i} className={`rounded-xl border p-3 ${s.hasOverlap ? 'border-amber-200 bg-amber-50/60' : 'border-slate-200 bg-slate-50/60'}`}>
              <div className={`text-sm font-semibold ${s.hasOverlap ? 'text-amber-900' : 'text-slate-800'}`}>
                {s.aNames.join('・')} × {s.bNames.join('・')}
                {s.hasOverlap && `：${s.overlapTimings.map((t) => TIMING_LABEL[t]).join('・')}で同時になっています`}
              </div>
              <div className={`mt-1 text-xs leading-relaxed ${s.hasOverlap ? 'text-amber-800' : 'text-slate-600'}`}>
                {s.noteJa} {s.actionJa}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── 月額コスト ────────────────────────────────────────────────── */

function CostSection({ analysis }: { analysis: StackAnalysis }) {
  const { costRows, totalMonthlyCost, costKnownCount, costUnknownCount } = analysis
  const totalAnim = useCountUp(totalMonthlyCost, 1300, 300, true)
  if (costKnownCount === 0) return null
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
          <JapaneseYen className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">棚の月額コスト目安</h3>
          <div className="text-xs text-slate-600">SciBase 収載の評価上位製品で計算した参考値</div>
        </div>
      </div>

      <div className="rounded-xl bg-emerald-50/60 p-4 text-center">
        <div className="text-xs font-medium text-emerald-800">月あたり合計（{costKnownCount} 品）</div>
        <div className="mt-0.5 text-3xl font-bold text-emerald-700 sm:text-4xl">
          ¥{Math.round(totalAnim).toLocaleString()}
        </div>
        {costUnknownCount > 0 && (
          <div className="mt-1 text-[11px] text-emerald-800/80">価格データ未収載 {costUnknownCount} 品は含まれていません</div>
        )}
      </div>

      <div className="mt-3 space-y-1.5">
        {costRows.map((r) => (
          <div key={r.slug} className="flex items-baseline justify-between gap-2 rounded-lg bg-slate-50/70 px-3 py-2 text-sm">
            <div className="min-w-0 flex-1">
              <span className="font-medium text-slate-900">{r.nameJa}</span>
              {r.brand && <span className="ml-1.5 truncate text-[11px] text-slate-500">{r.brand}</span>}
            </div>
            <div className="flex-shrink-0 font-semibold text-slate-900">
              {r.monthlyCostJpy != null ? `¥${r.monthlyCostJpy.toLocaleString()}/月` : <span className="text-xs font-normal text-slate-400">未収載</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 text-[10px] leading-relaxed text-slate-500 sm:text-xs">
        ※ 実際の購入製品・為替・セールにより変動します。
      </div>
    </div>
  )
}

/* ─── 買い替え・追加の検討（ASP 出口・中立） ────────────────────── */

function SuggestionSection({ analysis }: { analysis: StackAnalysis }) {
  const rows = analysis.costRows.filter((r) => r.productName).slice(0, 8)
  if (rows.length === 0) return null
  return (
    <div className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-white via-emerald-50/30 to-white p-5 shadow-md sm:p-6">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
          <Package className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">棚の中身を SciBase 評価と見比べる</h3>
          <div className="text-xs text-slate-600">各成分の論文評価・製品比較・価格を中立な視点で確認できます。買い替えは体感と照らしてご自身でご判断ください</div>
        </div>
      </div>
      <div className="space-y-2">
        {rows.map((r) => (
          <Link key={r.slug} href={`/ingredients/${r.slug}`}
            className="group flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-white p-3 transition hover:border-emerald-400 hover:bg-emerald-50/40">
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold text-slate-900">{r.nameJa}</div>
              <div className="mt-0.5 truncate text-xs text-slate-600">
                SciBase 評価上位：{r.brand} {r.productName}
                {r.monthlyCostJpy != null && `・月あたり目安 ¥${r.monthlyCostJpy.toLocaleString()}`}
              </div>
            </div>
            <ChevronRight className="h-5 w-5 flex-shrink-0 text-emerald-600 transition group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </div>
  )
}

/* ─── BeforeAfter（整理後の目安） ───────────────────────────────── */

function BeforeAfterCard({ before, after }: { before: number; after: number }) {
  const beforeAnim = useCountUp(before, 1100, 300, true)
  const afterAnim = useCountUp(after, 1100, 700, true)
  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
        <TrendingUp className="h-3.5 w-3.5" /> 重複の整理・時間分離を反映すると
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-slate-50 p-3 text-center">
          <div className="text-xs text-slate-600">今の棚</div>
          <div className="mt-0.5 text-2xl font-bold text-slate-900 sm:text-3xl">{Math.round(beforeAnim)}<span className="text-sm font-normal opacity-70">/100</span></div>
        </div>
        <div className="rounded-lg bg-emerald-50 p-3 text-center ring-1 ring-emerald-200">
          <div className="text-xs text-emerald-700">整理後の目安</div>
          <div className="mt-0.5 text-2xl font-bold text-emerald-700 sm:text-3xl">{Math.round(afterAnim)}<span className="text-sm font-normal opacity-70">/100</span></div>
        </div>
      </div>
      <div className="mt-3 text-center text-xs text-slate-600 sm:text-sm">
        重複の統合とタイミング分離は自分で整理できる項目です（相互作用は医師・薬剤師への相談が前提のため含めていません）
      </div>
    </div>
  )
}

/* ─── CompletionCelebration + X Share (Peak-End) ────────────────── */

function CompletionCelebration({ analysis }: { analysis: StackAnalysis }) {
  const { personality, score, itemCount, totalMonthlyCost, costKnownCount } = analysis
  const costPart = costKnownCount > 0 ? `・月あたり目安 ¥${totalMonthlyCost.toLocaleString()}` : ''
  const shareText = encodeURIComponent(
    `私のサプリ棚は ${personality.emoji} ${personality.name}\n棚スコア ${score}/100（${itemCount} 品${costPart}）\n\n#SciBase My Stack`
  )
  const shareUrl = encodeURIComponent('https://scibase.app/tools/my-stack')
  const xUrl = `https://x.com/intent/tweet?text=${shareText}&url=${shareUrl}`
  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 p-5 text-center shadow-sm sm:p-6">
      <div className="pointer-events-none absolute left-4 top-3 animate-pulse text-xl">✨</div>
      <div className="pointer-events-none absolute right-6 top-5 animate-pulse text-lg" style={{ animationDelay: '0.3s' }}>✨</div>
      <div className="pointer-events-none absolute bottom-4 left-10 animate-pulse text-lg" style={{ animationDelay: '0.6s' }}>✨</div>
      <div className="pointer-events-none absolute bottom-3 right-4 animate-pulse text-xl" style={{ animationDelay: '0.9s' }}>✨</div>
      <div className="text-4xl">🎉</div>
      <h3 className="mt-2 text-base font-bold text-slate-900 sm:text-lg">棚の分析完了！</h3>
      <p className="mt-1 text-xs text-slate-600 sm:text-sm">
        棚は変わり続けるもの。サプリを変えたらまた分析してみてください
      </p>
      <a href={xUrl} target="_blank" rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-slate-800">
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        私の棚タイプを X でシェア
      </a>
    </div>
  )
}

function formatNum(n: number): string {
  if (n === 0) return '0'
  if (n < 10) return `${Math.round(n * 10) / 10}`
  return `${Math.round(n).toLocaleString()}`
}
