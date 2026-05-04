'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { X, Plus, ChevronRight, ArrowDown, RotateCcw } from 'lucide-react'
import { ingredients, concerns, getIngredient } from '@/lib/data'
import { RadarChart } from './RadarChart'
import { EvidenceBadge } from './EvidenceBadge'
import { OutboundProductLink } from './OutboundProductLink'
import { trackEvent } from '@/lib/analytics'
import type { Ingredient, Concern, AnalysisAxis } from '@/lib/types'
import type { RadarData } from './RadarChart'

type Mode = 'ingredient' | 'concern'

/* ── 7軸の定義 ── */
const AXES: { key: AnalysisAxis; label: string; emoji: string; desc: string }[] = [
  { key: 'antiAging',  label: '抗老化',        emoji: '🔬', desc: 'NAD+・オートファジー・酸化ストレス' },
  { key: 'skin',       label: '肌老化',         emoji: '🌿', desc: 'コラーゲン合成・バリア・メラニン' },
  { key: 'cognitive',  label: '脳・認知',       emoji: '🧠', desc: '記憶力・集中力・神経保護' },
  { key: 'stress',     label: 'ストレス対策',   emoji: '🧘', desc: 'コルチゾール・HPA軸・気分' },
  { key: 'sleep',      label: '睡眠・回復',     emoji: '🌙', desc: '睡眠の質・サーカディアン・疲労' },
  { key: 'immunity',   label: '免疫・炎症',     emoji: '🛡️', desc: '慢性炎症・免疫調整・抗酸化' },
  { key: 'metabolism', label: '代謝・エネルギー', emoji: '⚡', desc: 'ミトコンドリア・体組成・血糖' },
]

/* エビデンスランク補正 */
const RANK_WEIGHT: Record<string, number> = { S: 1.0, A: 0.85, B: 0.65, C: 0.40 }

/* スコア計算：成分リスト → 軸スコア(0–10) */
function calcScores(selected: Ingredient[]): Record<AnalysisAxis, number> {
  const raw = {} as Record<AnalysisAxis, number>
  AXES.forEach(({ key }) => { raw[key] = 0 })

  selected.forEach(ing => {
    if (!ing.axisScores) return
    const w = RANK_WEIGHT[ing.evidenceRank] ?? 0.4
    AXES.forEach(({ key }) => {
      const v = ing.axisScores![key] ?? 0
      raw[key] += Math.min(6, v) * w
    })
  })

  const out = {} as Record<AnalysisAxis, number>
  AXES.forEach(({ key }) => {
    const r = raw[key]
    out[key] = Math.round(10 * (1 - Math.exp(-r / 12)) * 10) / 10
  })
  return out
}

/* 悩み複数選択 → 推奨成分Top3
 * 複数悩みで重複する成分を優先（横断的に効く）・論文ランク補正
 */
function recommendForConcerns(selectedConcerns: Concern[]): { ing: Ingredient; hits: number }[] {
  if (selectedConcerns.length === 0) return []
  const score = new Map<string, number>()
  const hits = new Map<string, number>()
  selectedConcerns.forEach(c => {
    c.ingredientSlugs.forEach((slug, idx) => {
      const ing = getIngredient(slug)
      if (!ing) return
      const rankW = RANK_WEIGHT[ing.evidenceRank] ?? 0.4
      const posBonus = Math.max(0.3, 1 - idx * 0.1)
      score.set(slug, (score.get(slug) ?? 0) + rankW * posBonus)
      hits.set(slug, (hits.get(slug) ?? 0) + 1)
    })
  })
  return Array.from(score.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([slug]) => {
      const ing = getIngredient(slug)!
      return { ing, hits: hits.get(slug) ?? 1 }
    })
}

const categoryLabel: Record<string, string> = {
  skin:           'スキンケア',
  body:           '体・全身',
  cognitive:      '認知・メンタル',
  sleep:          '睡眠',
  gut:            '腸・消化',
  immunity:       '免疫',
  muscle:         '筋肉・運動',
  cardiovascular: '血管・循環',
}

const CATEGORY_ORDER = [
  'skin', 'body', 'cognitive', 'sleep', 'gut', 'immunity', 'muscle', 'cardiovascular',
]

const STORAGE_MODE      = 'scibase_analyzer_mode'
const STORAGE_SLUGS     = 'scibase_analyzer_slugs'
const STORAGE_CONCERNS  = 'scibase_analyzer_concerns'

export function AnalyzerClient() {
  const [mode, setMode] = useState<Mode>('concern')
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([])
  const [selectedConcernSlugs, setSelectedConcernSlugs] = useState<string[]>([])
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [resultsInView, setResultsInView] = useState(false)
  const resultsRef = useRef<HTMLDivElement | null>(null)
  const startTrackedRef = useRef(false)
  const completeTrackedRef = useRef(false)

  const hasResults = mode === 'ingredient'
    ? selectedSlugs.length > 0
    : selectedConcernSlugs.length > 0

  /* GA4: start_analyzer — 初回選択時に1回だけ発火 */
  useEffect(() => {
    if (!hasResults || startTrackedRef.current) return
    startTrackedRef.current = true
    trackEvent('start_analyzer', { mode })
  }, [hasResults, mode])

  /* GA4: complete_analyzer — 結果セクションが画面内に入った最初の1回だけ発火 */
  useEffect(() => {
    if (!resultsInView || completeTrackedRef.current) return
    completeTrackedRef.current = true
    const itemCount = mode === 'ingredient' ? selectedSlugs.length : selectedConcernSlugs.length
    trackEvent('complete_analyzer', { mode, item_count: itemCount })
  }, [resultsInView, mode, selectedSlugs.length, selectedConcernSlugs.length])

  /* 結果セクションが画面内にあるか監視 → スティッキーCTAの出し分け */
  useEffect(() => {
    if (!hasResults) {
      setResultsInView(false)
      return
    }
    const el = resultsRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setResultsInView(entry.isIntersecting),
      { rootMargin: '-80px 0px -40% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [hasResults, mode])

  const scrollToResults = () => {
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const resetAll = () => {
    if (mode === 'ingredient') setSelectedSlugs([])
    else setSelectedConcernSlugs([])
  }

  /* localStorage 読み込み */
  useEffect(() => {
    try {
      const m = localStorage.getItem(STORAGE_MODE)
      if (m === 'ingredient' || m === 'concern') setMode(m)
      const s = localStorage.getItem(STORAGE_SLUGS)
      if (s) setSelectedSlugs(JSON.parse(s))
      const c = localStorage.getItem(STORAGE_CONCERNS)
      if (c) setSelectedConcernSlugs(JSON.parse(c))
    } catch { /* ignore */ }
  }, [])

  /* localStorage 保存 */
  useEffect(() => {
    try { localStorage.setItem(STORAGE_MODE, mode) } catch {}
  }, [mode])
  useEffect(() => {
    try { localStorage.setItem(STORAGE_SLUGS, JSON.stringify(selectedSlugs)) } catch {}
  }, [selectedSlugs])
  useEffect(() => {
    try { localStorage.setItem(STORAGE_CONCERNS, JSON.stringify(selectedConcernSlugs)) } catch {}
  }, [selectedConcernSlugs])

  return (
    <div className="max-w-2xl mx-auto px-5 pb-10 pt-2">
      {/* ── モードタブ ── */}
      <p className="text-[14px] text-muted-foreground leading-relaxed mb-4">
        {mode === 'ingredient'
          ? '今飲んでいるサプリメント・スキンケア成分を選ぶと、7軸でカバー状況を可視化し、不足している成分をレコメンドします。'
          : '悩みを1〜3個選ぶと、論文エビデンスが一致する3成分を組み立てます。複数選ぶほど、横断的に効く成分が優先されます。'}
      </p>
      <div className="mb-10 inline-flex gap-1 p-1 bg-secondary rounded-xl">
        <button
          onClick={() => setMode('ingredient')}
          className={`inline-flex items-center justify-center text-[13px] font-semibold
            px-4 py-2 min-h-[40px] rounded-lg transition-all
            ${mode === 'ingredient'
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'}`}
        >
          成分から
        </button>
        <button
          onClick={() => setMode('concern')}
          className={`inline-flex items-center justify-center text-[13px] font-semibold
            px-4 py-2 min-h-[40px] rounded-lg transition-all
            ${mode === 'concern'
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'}`}
        >
          悩みから
        </button>
      </div>

      {mode === 'ingredient' ? (
        <IngredientMode
          selectedSlugs={selectedSlugs}
          setSelectedSlugs={setSelectedSlugs}
          query={query} setQuery={setQuery}
          open={open} setOpen={setOpen}
          resultsRef={resultsRef}
        />
      ) : (
        <ConcernMode
          selectedConcernSlugs={selectedConcernSlugs}
          setSelectedConcernSlugs={setSelectedConcernSlugs}
          resultsRef={resultsRef}
        />
      )}

      {/* 注意書き */}
      <p className="text-[12px] text-muted-foreground leading-relaxed border-t border-border pt-6 mt-10">
        スコアは論文エビデンスに基づく参考値です。個人の状態・用量・相互作用は考慮していません。
        医療的アドバイスではありません。
      </p>

      {/* スティッキーCTA — 選択済み＆結果が画面外の時だけ表示 */}
      {hasResults && !resultsInView && (
        <div className="fixed inset-x-0 bottom-4 z-40 px-4 pointer-events-none">
          <div className="max-w-2xl mx-auto flex gap-2 pointer-events-auto">
            <button
              onClick={scrollToResults}
              className="flex-1 inline-flex items-center justify-center gap-2
                bg-foreground text-background text-[14px] font-semibold
                rounded-full px-5 py-3 min-h-[48px] shadow-lg
                hover:opacity-90 transition-opacity"
            >
              診断結果を見る
              <ArrowDown className="w-4 h-4" />
            </button>
            <button
              onClick={resetAll}
              aria-label="やり直す"
              className="inline-flex items-center justify-center gap-1.5
                bg-card text-muted-foreground border border-border text-[13px] font-medium
                rounded-full px-4 py-3 min-h-[48px] shadow-md
                hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">やり直す</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ───────────────────────────── 成分モード ───────────────────────────── */

function IngredientMode({
  selectedSlugs, setSelectedSlugs,
  query, setQuery,
  open, setOpen,
  resultsRef,
}: {
  selectedSlugs: string[]
  setSelectedSlugs: React.Dispatch<React.SetStateAction<string[]>>
  query: string
  setQuery: (v: string) => void
  open: boolean
  setOpen: (v: boolean) => void
  resultsRef: React.MutableRefObject<HTMLDivElement | null>
}) {
  const selected = useMemo(
    () => selectedSlugs.map(s => ingredients.find(i => i.slug === s)).filter(Boolean) as Ingredient[],
    [selectedSlugs]
  )

  const candidates = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return ingredients
      .filter(i =>
        !selectedSlugs.includes(i.slug) &&
        (i.nameJa.includes(query) || i.nameEn.toLowerCase().includes(q))
      )
      .slice(0, 8)
  }, [query, selectedSlugs])

  const scores = useMemo(() => calcScores(selected), [selected])

  const radarData: RadarData[] = AXES.map(a => ({
    axis: a.key, label: a.label, emoji: a.emoji,
    score: scores[a.key], max: 10,
  }))

  const weakAxes = AXES.filter(a => scores[a.key] < 4.5)
  const recommendations = useMemo(() => {
    if (weakAxes.length === 0) return []
    return AXES
      .filter(a => scores[a.key] < 4)
      .flatMap(a =>
        ingredients
          .filter(i =>
            !selectedSlugs.includes(i.slug) &&
            (i.axisScores?.[a.key] ?? 0) >= 6
          )
          .sort((x, y) => (y.axisScores?.[a.key] ?? 0) - (x.axisScores?.[a.key] ?? 0))
          .slice(0, 2)
          .map(i => ({ ing: i, axis: a }))
      )
      .filter((item, idx, arr) => arr.findIndex(x => x.ing.slug === item.ing.slug) === idx)
      .slice(0, 5)
  }, [scores, selectedSlugs, weakAxes.length])

  const axisTopRec = useMemo(() => {
    const map = new Map<AnalysisAxis, typeof ingredients[0]>()
    AXES.forEach(a => {
      if (scores[a.key] >= 4.5) return
      const top = ingredients
        .filter(i => !selectedSlugs.includes(i.slug) && (i.axisScores?.[a.key] ?? 0) >= 6)
        .sort((x, y) => (y.axisScores?.[a.key] ?? 0) - (x.axisScores?.[a.key] ?? 0))[0]
      if (top) map.set(a.key, top)
    })
    return map
  }, [scores, selectedSlugs])

  const add = (slug: string) => {
    setSelectedSlugs(prev => [...prev, slug])
    setQuery('')
    setOpen(false)
  }
  const remove = (slug: string) => setSelectedSlugs(prev => prev.filter(s => s !== slug))
  const reset = () => setSelectedSlugs([])

  const usageLabel: Record<string, string> = { topical: '外用', oral: '経口', both: '外用・経口' }

  return (
    <>
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-[15px] text-foreground">使用中の成分</h2>
          {selected.length > 0 && (
            <button onClick={reset}
              className="inline-flex items-center gap-1.5 text-[12px] font-medium
                text-muted-foreground border border-border rounded-full
                px-3 py-1.5 min-h-[36px]
                hover:text-destructive hover:border-destructive/30 transition-colors">
              <RotateCcw className="w-3 h-3" />
              やり直す
            </button>
          )}
        </div>

        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {selected.map(ing => (
              <span key={ing.slug}
                className="inline-flex items-center gap-1.5 bg-card border border-border
                  rounded-full pl-3 pr-2 py-1.5 text-[13px] font-medium">
                <EvidenceBadge rank={ing.evidenceRank} variant="dot" />
                <span className="text-foreground">{ing.nameJa}</span>
                <button onClick={() => remove(ing.slug)}
                  className="text-muted-foreground hover:text-foreground transition-colors ml-0.5">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="relative">
          <div className="flex items-center gap-2 bg-card border border-border rounded-xl
            px-4 py-3 focus-within:border-accent transition-colors">
            <Plus className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              placeholder="成分名を検索（例：レチノール、マグネシウム）"
              value={query}
              onChange={e => { setQuery(e.target.value); setOpen(true) }}
              onFocus={() => setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 150)}
              className="flex-1 bg-transparent text-[14px] text-foreground
                placeholder:text-muted-foreground/50 outline-none"
            />
          </div>

          {open && candidates.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border
              rounded-xl shadow-lg overflow-hidden z-10">
              {candidates.map(ing => (
                <button key={ing.slug} onMouseDown={() => add(ing.slug)}
                  className="w-full flex items-center gap-3 px-4 py-3
                    hover:bg-secondary transition-colors text-left
                    border-b border-border last:border-0">
                  <EvidenceBadge rank={ing.evidenceRank} variant="dot" />
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-foreground truncate">{ing.nameJa}</p>
                    <p className="text-[11px] text-muted-foreground/60">{ing.nameEn}</p>
                  </div>
                  {ing.usageType && (
                    <span className="text-[10px] text-muted-foreground bg-secondary
                      rounded px-1.5 py-0.5 flex-shrink-0">
                      {usageLabel[ing.usageType]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {open && query.trim() && candidates.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border
              rounded-xl shadow-lg px-4 py-3 text-[13px] text-muted-foreground z-10">
              「{query}」は見つかりませんでした
            </div>
          )}
        </div>

        {selected.length === 0 && (
          <div className="mt-4">
            <p className="text-[11px] text-muted-foreground mb-2">よく使われる成分から追加：</p>
            <div className="flex flex-wrap gap-1.5">
              {['vitamin-d','magnesium','omega3'].map(slug => {
                const ing = ingredients.find(i => i.slug === slug)
                if (!ing) return null
                return (
                  <button key={slug} onClick={() => add(slug)}
                    className="inline-flex items-center text-[12px] bg-secondary border border-border
                      rounded-full px-4 py-2 min-h-[44px] hover:border-accent hover:text-accent transition-colors">
                    + {ing.nameJa}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </section>

      {selected.length === 0 && (
        <section className="mb-8 bg-secondary/40 border border-border rounded-2xl px-5 py-5">
          <p className="text-[12px] font-semibold text-muted-foreground mb-3">
            診断でわかること
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {AXES.slice(0, 4).map(a => (
              <div key={a.key} className="bg-card rounded-xl px-3 py-2.5 text-center">
                <p className="text-[18px] mb-0.5">{a.emoji}</p>
                <p className="text-[11px] font-medium text-foreground">{a.label}</p>
                <p className="text-[10px] text-muted-foreground/70 mt-0.5 leading-tight">{a.desc.split('・')[0]}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {AXES.slice(4).map(a => (
              <div key={a.key} className="bg-card rounded-xl px-3 py-2.5 text-center">
                <p className="text-[18px] mb-0.5">{a.emoji}</p>
                <p className="text-[11px] font-medium text-foreground">{a.label}</p>
                <p className="text-[10px] text-muted-foreground/70 mt-0.5 leading-tight">{a.desc.split('・')[0]}</p>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-muted-foreground mt-3">
            上の検索から成分を追加すると、あなたの7軸カバー率をレーダーチャートで可視化します。
          </p>
        </section>
      )}

      {selected.length > 0 ? (
        <>
          <section ref={resultsRef} className="mb-10 scroll-mt-6">
            <h2 className="font-semibold text-[15px] text-foreground mb-6">カバー状況</h2>
            <RadarChart data={radarData} size={340} />
          </section>

          <section className="mb-10">
            <h2 className="font-semibold text-[15px] text-foreground mb-4">軸別スコア</h2>
            <div className="space-y-2.5">
              {AXES.map(a => {
                const score = scores[a.key]
                const level = score >= 7.5 ? 'sufficient' : score >= 4.5 ? 'moderate' : 'weak'
                const rec = level === 'weak' ? axisTopRec.get(a.key) : undefined
                return (
                  <div key={a.key}
                    className={`bg-card border rounded-xl px-4 py-3 transition-colors
                      ${level === 'weak' ? 'border-rose-200' : 'border-border'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[16px]">{a.emoji}</span>
                        <span className="text-[13px] font-medium text-foreground">{a.label}</span>
                        <span className="hidden sm:inline text-[11px] text-muted-foreground/60">{a.desc}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full
                          ${level === 'sufficient'
                            ? 'bg-emerald-50 text-emerald-700'
                            : level === 'moderate'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-rose-50 text-rose-700'}`}>
                          {level === 'sufficient' ? '充実' : level === 'moderate' ? '普通' : '不足'}
                        </span>
                        <span className="text-[13px] font-bold text-foreground tabular-nums w-8 text-right">
                          {score.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500
                          ${level === 'sufficient' ? 'bg-emerald-500'
                            : level === 'moderate'  ? 'bg-amber-400'
                            : 'bg-rose-400'}`}
                        style={{ width: `${score * 10}%` }}
                      />
                    </div>
                    {rec && (
                      <div className="flex items-center gap-2 mt-2.5 pt-2.5 border-t border-rose-100">
                        <span className="text-[11px] text-rose-600">補強に：</span>
                        <Link
                          href={`/ingredients/${rec.slug}`}
                          className="text-[12px] font-semibold text-accent hover:underline truncate"
                        >
                          {rec.nameJa}
                        </Link>
                        <button
                          onClick={() => add(rec.slug)}
                          className="ml-auto flex-shrink-0 text-[11px] font-semibold
                            bg-accent text-primary-foreground rounded-lg px-2.5 py-1
                            hover:opacity-90 transition-opacity"
                        >
                          + 追加
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          {recommendations.length > 0 && (
            <section className="mb-10">
              <h2 className="font-semibold text-[15px] text-foreground mb-2">
                不足を補う成分
              </h2>
              <p className="text-[13px] text-muted-foreground mb-5">
                スコアが低い軸をカバーできる成分です
              </p>
              <div className="space-y-3">
                {recommendations.map(({ ing, axis }) => {
                  const topProduct = ing.products.find(p => p.rank === 1) ?? ing.products[0]
                  const platformLabel: Record<string, string> = {
                    iherb: 'iHerb', amazon: 'Amazon', cosme: '@cosme',
                  }
                  return (
                    <div key={ing.slug}
                      className="bg-card border border-border rounded-2xl p-4
                        hover:border-accent/50 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center gap-4">
                        <EvidenceBadge rank={ing.evidenceRank} variant="dot" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="font-semibold text-[14px] text-foreground truncate">
                              {ing.nameJa}
                            </p>
                            <span className="text-[10px] bg-secondary border border-border
                              rounded px-1.5 py-0.5 text-muted-foreground flex-shrink-0">
                              {axis.emoji} {axis.label}を強化
                            </span>
                          </div>
                          <p className="text-[12px] text-muted-foreground line-clamp-1">
                            {ing.tagline}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
                        <Link href={`/ingredients/${ing.slug}`}
                          className="text-[12px] text-muted-foreground hover:text-foreground
                            transition-colors flex items-center gap-1">
                          <ChevronRight className="w-3.5 h-3.5" />
                          エビデンスを確認する
                        </Link>
                        {topProduct && (
                          <OutboundProductLink
                            href={topProduct.url}
                            platform={topProduct.platform}
                            ingredientSlug={ing.slug}
                            productRank={topProduct.rank}
                            aspProgram={topProduct.aspProgram}
                            aspId={topProduct.aspId}
                            commissionRateBand={topProduct.commissionRateBand}
                            className="ml-auto text-[12px] font-semibold text-accent
                              bg-accent/8 border border-accent/20 rounded-lg px-3 py-1.5
                              hover:bg-accent/15 transition-colors flex items-center gap-1.5"
                          >
                            {platformLabel[topProduct.platform]}で購入 →
                          </OutboundProductLink>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {weakAxes.length === 0 && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-10 text-center">
              <p className="text-[22px] mb-2">🎉</p>
              <p className="font-semibold text-emerald-800 mb-1">すべての軸がカバーされています</p>
              <p className="text-[13px] text-emerald-700">
                現在のサプリメント構成は7軸をバランスよくカバーしています
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="border border-border rounded-2xl overflow-hidden">
          <div className="bg-rose-50 border-b border-rose-100 px-5 py-3 flex items-center gap-2">
            <span className="text-[12px] font-semibold text-rose-700">
              現在のあなたのカバー状況
            </span>
            <span className="text-[11px] text-rose-500 bg-rose-100 border border-rose-200 rounded-full px-2 py-0.5">
              7軸すべて未カバー
            </span>
          </div>
          <div className="px-5 py-5">
            <div className="space-y-2 mb-5">
              {AXES.map(a => (
                <div key={a.key} className="flex items-center gap-3">
                  <span className="text-[14px] w-5 text-center">{a.emoji}</span>
                  <span className="text-[12px] text-muted-foreground/60 w-16 flex-shrink-0">{a.label}</span>
                  <div className="flex-1 h-1.5 bg-rose-50 border border-rose-100 rounded-full overflow-hidden">
                    <div className="h-full w-0 bg-rose-300 rounded-full" />
                  </div>
                  <span className="text-[11px] font-semibold text-rose-400 tabular-nums w-6 text-right">0.0</span>
                </div>
              ))}
            </div>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              今飲んでいるサプリを追加すると、どの軸が<span className="font-semibold text-foreground">カバーできていないか</span>が見えます。
            </p>
          </div>
        </div>
      )}
    </>
  )
}

/* ───────────────────────────── 悩みモード ───────────────────────────── */

const POPULAR_PRIMARY_SLUGS = ['wrinkles', 'spots', 'sleep', 'stress', 'longevity', 'cognitive']

function ConcernMode({
  selectedConcernSlugs,
  setSelectedConcernSlugs,
  resultsRef,
}: {
  selectedConcernSlugs: string[]
  setSelectedConcernSlugs: React.Dispatch<React.SetStateAction<string[]>>
  resultsRef: React.MutableRefObject<HTMLDivElement | null>
}) {
  const [showAllPrimary, setShowAllPrimary] = useState(false)
  const [showPrimaryPicker, setShowPrimaryPicker] = useState(false)

  const primarySlug = selectedConcernSlugs[0] ?? null
  const secondarySlugs = selectedConcernSlugs.slice(1)

  const primary = useMemo(
    () => primarySlug ? concerns.find(c => c.slug === primarySlug) ?? null : null,
    [primarySlug]
  )
  const secondaryConcerns = useMemo(
    () => secondarySlugs
      .map(s => concerns.find(c => c.slug === s))
      .filter((c): c is Concern => !!c),
    [secondarySlugs]
  )
  const allSelected = useMemo(
    () => primary ? [primary, ...secondaryConcerns] : [],
    [primary, secondaryConcerns]
  )

  const top3 = useMemo(() => recommendForConcerns(allSelected), [allSelected])
  const top3Ingredients = useMemo(() => top3.map(t => t.ing), [top3])
  const scores = useMemo(() => calcScores(top3Ingredients), [top3Ingredients])
  const radarData: RadarData[] = AXES.map(a => ({
    axis: a.key, label: a.label, emoji: a.emoji,
    score: scores[a.key], max: 10,
  }))

  const popularPrimary = POPULAR_PRIMARY_SLUGS
    .map(slug => concerns.find(c => c.slug === slug))
    .filter((c): c is Concern => !!c)

  const orderedCategories = CATEGORY_ORDER.filter(cat =>
    concerns.some(c => c.category === cat)
  )

  const setPrimary = (slug: string) => {
    setSelectedConcernSlugs(prev => {
      const rest = prev.slice(1).filter(s => s !== slug)
      return [slug, ...rest]
    })
    setShowPrimaryPicker(false)
    setShowAllPrimary(false)
  }
  const resetAll = () => {
    setSelectedConcernSlugs([])
    setShowPrimaryPicker(false)
    setShowAllPrimary(false)
  }
  const toggleSecondary = (slug: string) => {
    if (!primarySlug || slug === primarySlug) return
    setSelectedConcernSlugs(prev => {
      const [p, ...rest] = prev
      return rest.includes(slug)
        ? [p, ...rest.filter(s => s !== slug)]
        : [p, ...rest, slug]
    })
  }

  const stackHeadline = primary
    ? `${allSelected.map(c => `「${c.nameJa}」`).join('＋')}に効く3成分スタック`
    : ''

  const showPicker = !primary || showPrimaryPicker

  return (
    <>
      {/* ── 概要ガイド ─────────────────────────────── */}
      <div className="mb-8 bg-secondary/40 border border-border rounded-2xl px-5 py-4">
        <p className="text-[13px] text-foreground/80 leading-relaxed">
          悩みを <strong className="font-semibold">1〜3個</strong> 選ぶと、論文エビデンスが一致する
          <strong className="font-semibold">3成分</strong> を組み立てます。
          複数選ぶほど、<strong className="font-semibold">横断的に効く成分</strong>が優先されます。
        </p>
      </div>

      {/* ── STEP 1：主悩み ─────────────────────────────── */}
      <section className="mb-10">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-[10px] font-bold tracking-wider bg-accent/10 text-accent
              px-2 py-0.5 rounded-md">STEP 1</span>
            <h2 className="font-semibold text-[15px] text-foreground">
              最も気になる悩みを1つ選ぶ
            </h2>
          </div>
          {primary && (
            <button onClick={resetAll}
              className="inline-flex items-center gap-1.5 text-[12px] font-medium
                text-muted-foreground border border-border rounded-full
                px-3 py-1.5 min-h-[36px]
                hover:text-destructive hover:border-destructive/30 transition-colors">
              <RotateCcw className="w-3 h-3" />
              やり直す
            </button>
          )}
        </div>

        {primary && !showPrimaryPicker && (
          /* 選択済み状態：選んだ悩みを大きく表示 */
          <div className={`cat-${primary.category} border rounded-2xl p-5 shadow-sm`}>
            <div className="flex items-start gap-3">
              <span className="text-[32px] leading-none">{primary.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[17px] mb-1">{primary.nameJa}</p>
                <p className="text-[12.5px] opacity-75 line-clamp-2">{primary.description}</p>
              </div>
              <button
                onClick={() => setShowPrimaryPicker(true)}
                className="text-[11px] font-medium bg-white/70 border border-current/30 rounded-full
                  px-2.5 py-1 hover:bg-white transition-colors flex-shrink-0"
              >
                変更
              </button>
            </div>
          </div>
        )}

        {showPicker && (
          /* 未選択 or 差し替え中：人気6を大型カード + 他から選ぶエクスパンダー */
          <>
            {primary && showPrimaryPicker && (
              <div className="flex items-center justify-between mb-3">
                <p className="text-[12px] text-muted-foreground">
                  別の悩みを選ぶ（副悩みは保持されます）
                </p>
                <button
                  onClick={() => setShowPrimaryPicker(false)}
                  className="text-[12px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  キャンセル
                </button>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {popularPrimary.map(c => (
                <button
                  key={c.slug}
                  onClick={() => setPrimary(c.slug)}
                  className={`cat-${c.category} border rounded-xl p-4 text-left
                    hover:-translate-y-0.5 hover:shadow-md transition-all duration-150`}
                >
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className="text-[22px] leading-none">{c.emoji}</span>
                    <p className="font-semibold text-[14px]">{c.nameJa}</p>
                  </div>
                  <p className="text-[11.5px] opacity-70 line-clamp-1 ml-[34px]">
                    {c.description}
                  </p>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowAllPrimary(v => !v)}
              className="mt-4 text-[12px] text-muted-foreground hover:text-foreground
                transition-colors flex items-center gap-1"
            >
              <ChevronRight className={`w-3.5 h-3.5 transition-transform
                ${showAllPrimary ? 'rotate-90' : ''}`} />
              {showAllPrimary ? '閉じる' : 'すべての悩みから選ぶ（22件）'}
            </button>

            {showAllPrimary && (
              <div className="mt-4 space-y-5 pt-4 border-t border-border">
                {orderedCategories.map(cat => {
                  const catConcerns = concerns.filter(c => c.category === cat)
                  return (
                    <div key={cat}>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.1em]
                        text-muted-foreground mb-2">
                        {categoryLabel[cat]}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {catConcerns.map(c => (
                          <button
                            key={c.slug}
                            onClick={() => setPrimary(c.slug)}
                            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium
                              bg-card border border-border rounded-full px-4 py-2 min-h-[44px]
                              text-muted-foreground hover:text-foreground hover:border-accent/50
                              transition-all"
                          >
                            <span className="text-[14px] leading-none">{c.emoji}</span>
                            {c.nameJa}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}
      </section>

      {/* ── STEP 2：副悩み（primaryが決まったら出現） ─────── */}
      {primary && (
        <section className="mb-10">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-[10px] font-bold tracking-wider bg-secondary text-muted-foreground
              px-2 py-0.5 rounded-md">STEP 2</span>
            <h2 className="font-semibold text-[15px] text-foreground">
              追加で気になる悩み <span className="font-normal text-muted-foreground text-[13px]">（任意・最大2つ）</span>
            </h2>
          </div>
          <p className="text-[12px] text-muted-foreground mb-4 leading-relaxed">
            複数選ぶと、両方に論文エビデンスがある横断成分が優先されます。1つのままでもOK。
          </p>

          <div className="space-y-4">
            {orderedCategories.map(cat => {
              const catConcerns = concerns.filter(c => c.category === cat && c.slug !== primarySlug)
              if (catConcerns.length === 0) return null
              return (
                <div key={cat}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em]
                    text-muted-foreground mb-2">
                    {categoryLabel[cat]}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {catConcerns.map(c => {
                      const active = secondarySlugs.includes(c.slug)
                      const disabled = !active && secondarySlugs.length >= 2
                      return (
                        <button
                          key={c.slug}
                          onClick={() => toggleSecondary(c.slug)}
                          disabled={disabled}
                          className={`inline-flex items-center gap-1.5 text-[12.5px] font-medium
                            px-4 py-2 min-h-[44px] rounded-full border transition-all
                            ${active
                              ? `cat-${c.category} shadow-sm`
                              : disabled
                                ? 'bg-card border-border text-muted-foreground/40 cursor-not-allowed'
                                : 'bg-card border-border text-muted-foreground hover:text-foreground hover:border-accent/50'}`}
                        >
                          <span className="text-[14px] leading-none">{c.emoji}</span>
                          {c.nameJa}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ── STEP 3：結果 ─────────────────────────────── */}
      {primary && top3.length > 0 && (
        <>
          <section ref={resultsRef} className="mb-10 scroll-mt-6">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-[10px] font-bold tracking-wider bg-accent text-primary-foreground
                px-2 py-0.5 rounded-md">STEP 3</span>
              <h2 className="font-semibold text-[15px] text-foreground">組み立て結果</h2>
            </div>

            <p className="text-[17px] sm:text-[19px] font-bold text-foreground leading-snug mb-1">
              {stackHeadline}
            </p>
            <p className="text-[12px] text-muted-foreground mb-6">
              論文エビデンス順 ・ #1から始めて段階的に足すのがおすすめ
            </p>

            {/* #1 大型カード */}
            {top3[0] && (() => {
              const { ing, hits } = top3[0]
              const topProduct = ing.products.find(p => p.rank === 1) ?? ing.products[0]
              const platformLabel: Record<string, string> = {
                iherb: 'iHerb', amazon: 'Amazon', cosme: '@cosme',
              }
              return (
                <div className="bg-card border border-accent/40 rounded-2xl p-5 shadow-sm mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold tracking-wider
                      bg-accent text-primary-foreground px-2 py-0.5 rounded-md">
                      #1 BEST
                    </span>
                    <EvidenceBadge rank={ing.evidenceRank} variant="dot" />
                    {hits > 1 && (
                      <span className="text-[10px] bg-emerald-50 border border-emerald-200
                        rounded px-1.5 py-0.5 text-emerald-700">
                        {hits}悩みに対応
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-[18px] text-foreground mb-1">{ing.nameJa}</p>
                  <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                    {ing.tagline}
                  </p>
                  <div className="flex items-center gap-3 pt-3 border-t border-border">
                    <Link href={`/ingredients/${ing.slug}`}
                      className="text-[12px] text-muted-foreground hover:text-foreground
                        transition-colors flex items-center gap-1">
                      <ChevronRight className="w-3.5 h-3.5" />
                      エビデンスを見る
                    </Link>
                    {topProduct && (
                      <OutboundProductLink
                        href={topProduct.url}
                        platform={topProduct.platform}
                        ingredientSlug={ing.slug}
                        productRank={topProduct.rank}
                        aspProgram={topProduct.aspProgram}
                        aspId={topProduct.aspId}
                        commissionRateBand={topProduct.commissionRateBand}
                        className="ml-auto text-[12.5px] font-semibold text-primary-foreground
                          bg-accent rounded-lg px-3.5 py-2
                          hover:opacity-90 transition-opacity flex items-center gap-1.5"
                      >
                        {platformLabel[topProduct.platform]}で購入 →
                      </OutboundProductLink>
                    )}
                  </div>
                </div>
              )
            })()}

            {/* #2 #3 コンパクトカード */}
            <div className="space-y-2">
              {top3.slice(1).map(({ ing, hits }, idx) => {
                const rankLabel = idx === 0 ? '代替案' : '補強'
                const topProduct = ing.products.find(p => p.rank === 1) ?? ing.products[0]
                const platformLabel: Record<string, string> = {
                  iherb: 'iHerb', amazon: 'Amazon', cosme: '@cosme',
                }
                return (
                  <div key={ing.slug}
                    className="bg-card border border-border rounded-xl p-3.5
                      hover:border-accent/30 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold tracking-wider bg-secondary
                        text-muted-foreground px-2 py-0.5 rounded-md">
                        #{idx + 2} {rankLabel}
                      </span>
                      <EvidenceBadge rank={ing.evidenceRank} variant="dot" />
                      <p className="font-semibold text-[14px] text-foreground truncate flex-1">
                        {ing.nameJa}
                      </p>
                      {hits > 1 && (
                        <span className="text-[10px] bg-emerald-50 border border-emerald-200
                          rounded px-1.5 py-0.5 text-emerald-700 flex-shrink-0">
                          {hits}悩みに対応
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-muted-foreground line-clamp-1 mb-3">
                      {ing.tagline}
                    </p>
                    <div className="flex items-center gap-3">
                      <Link href={`/ingredients/${ing.slug}`}
                        className="text-[11.5px] text-muted-foreground hover:text-foreground
                          transition-colors flex items-center gap-1">
                        <ChevronRight className="w-3 h-3" />
                        エビデンスを見る
                      </Link>
                      {topProduct && (
                        <OutboundProductLink
                          href={topProduct.url}
                          platform={topProduct.platform}
                          ingredientSlug={ing.slug}
                          productRank={topProduct.rank}
                          aspProgram={topProduct.aspProgram}
                          aspId={topProduct.aspId}
                          commissionRateBand={topProduct.commissionRateBand}
                          className="ml-auto text-[11.5px] font-semibold text-accent
                            bg-accent/8 border border-accent/20 rounded-lg px-2.5 py-1
                            hover:bg-accent/15 transition-colors"
                        >
                          {platformLabel[topProduct.platform]}で購入 →
                        </OutboundProductLink>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* レーダー：段階的カバー表現 */}
          <section className="mb-10">
            <h2 className="font-semibold text-[15px] text-foreground mb-2">
              このスタックで何がカバーできるか
            </h2>
            <p className="text-[12px] text-muted-foreground mb-6 leading-relaxed">
              #1から段階的に足していけば、7軸でこの範囲までカバーされます。まず#1だけでOK。
            </p>
            <RadarChart data={radarData} size={340} />
          </section>
        </>
      )}

      {primary && top3.length === 0 && (
        <section className="mb-8 bg-rose-50 border border-rose-200 rounded-2xl px-5 py-5">
          <p className="text-[13px] text-rose-700">
            該当する成分が見つかりませんでした。別の悩みを選んでください。
          </p>
        </section>
      )}
    </>
  )
}
