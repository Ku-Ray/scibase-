'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { X, Plus, ChevronRight } from 'lucide-react'
import { ingredients } from '@/lib/data'
import { RadarChart } from './RadarChart'
import { EvidenceBadge } from './EvidenceBadge'
import type { Ingredient, AnalysisAxis } from '@/lib/types'
import type { RadarData } from './RadarChart'

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
      // 1成分あたりの寄与を最大6に制限（単一成分で軸を支配させない）
      raw[key] += Math.min(6, v) * w
    })
  })

  /*
   * 指数収束モデル: score = 10 × (1 - e^(-raw/12))
   * raw=6（S成分1本）→ 3.9  体感「弱い」
   * raw=12（2本）    → 6.3  体感「普通」
   * raw=20（3〜4本） → 8.1  体感「充実」
   * raw=30（5本以上）→ 9.2  ほぼ満点（容易には届かない）
   */
  const out = {} as Record<AnalysisAxis, number>
  AXES.forEach(({ key }) => {
    const r = raw[key]
    out[key] = Math.round(10 * (1 - Math.exp(-r / 12)) * 10) / 10
  })
  return out
}

const STORAGE_KEY = 'agescience_analyzer_slugs'

export function AnalyzerClient() {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([])
  const [query, setQuery]   = useState('')
  const [open, setOpen]     = useState(false)

  /* localStorage の読み込み */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setSelectedSlugs(JSON.parse(saved))
    } catch { /* ignore */ }
  }, [])

  /* localStorage への保存 */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedSlugs))
    } catch { /* ignore */ }
  }, [selectedSlugs])

  const selected = useMemo(
    () => selectedSlugs.map(s => ingredients.find(i => i.slug === s)).filter(Boolean) as Ingredient[],
    [selectedSlugs]
  )

  /* 検索候補 */
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
    axis:  a.key,
    label: a.label,
    emoji: a.emoji,
    score: scores[a.key],
    max:   10,
  }))

  /* 不足軸 → レコメンド成分 */
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
      /* 重複除去（同じ成分が複数軸でヒットした場合）*/
      .filter((item, idx, arr) => arr.findIndex(x => x.ing.slug === item.ing.slug) === idx)
      .slice(0, 5)
  }, [scores, selectedSlugs, weakAxes.length])

  const add = (slug: string) => {
    setSelectedSlugs(prev => [...prev, slug])
    setQuery('')
    setOpen(false)
  }
  const remove = (slug: string) => setSelectedSlugs(prev => prev.filter(s => s !== slug))
  const reset  = () => setSelectedSlugs([])

  const usageLabel: Record<string, string> = { topical: '外用', oral: '経口', both: '外用・経口' }

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">

      {/* ── ヘッダー ── */}
      <div className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em]
          text-muted-foreground mb-3">
          Supplement Analyzer
        </p>
        <h1 className="text-[28px] sm:text-[34px] font-bold text-foreground
          tracking-tight mb-3">
          サプリ診断
        </h1>
        <p className="text-[14px] text-muted-foreground leading-relaxed">
          今飲んでいるサプリメント・スキンケア成分を選ぶと、
          7軸でカバー状況を可視化し、不足している成分をレコメンドします。
        </p>
      </div>

      {/* ── 成分選択 ── */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-[15px] text-foreground">使用中の成分</h2>
          {selected.length > 0 && (
            <button onClick={reset}
              className="text-[12px] text-muted-foreground hover:text-destructive transition-colors">
              リセット
            </button>
          )}
        </div>

        {/* 選択済みタグ */}
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

        {/* 検索ボックス */}
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

          {/* ドロップダウン候補 */}
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

          {/* クエリあるが候補ゼロ */}
          {open && query.trim() && candidates.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border
              rounded-xl shadow-lg px-4 py-3 text-[13px] text-muted-foreground z-10">
              「{query}」は見つかりませんでした
            </div>
          )}
        </div>

        {/* 人気成分クイック追加 */}
        {selected.length === 0 && (
          <div className="mt-4">
            <p className="text-[11px] text-muted-foreground mb-2">よく使われる成分から追加：</p>
            <div className="flex flex-wrap gap-1.5">
              {['magnesium','vitamin-d','omega3','ashwagandha','retinol','vitamin-c-oral','zinc'].map(slug => {
                const ing = ingredients.find(i => i.slug === slug)
                if (!ing) return null
                return (
                  <button key={slug} onClick={() => add(slug)}
                    className="text-[12px] bg-secondary border border-border rounded-full
                      px-3 py-1 hover:border-accent hover:text-accent transition-colors">
                    + {ing.nameJa}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </section>

      {/* ── レーダーチャート ── */}
      {selected.length > 0 ? (
        <>
          <section className="mb-10">
            <h2 className="font-semibold text-[15px] text-foreground mb-6">カバー状況</h2>
            <RadarChart data={radarData} size={340} />
          </section>

          {/* ── 軸別スコア一覧 ── */}
          <section className="mb-10">
            <h2 className="font-semibold text-[15px] text-foreground mb-4">軸別スコア</h2>
            <div className="space-y-2.5">
              {AXES.map(a => {
                const score = scores[a.key]
                const level = score >= 7.5 ? 'sufficient' : score >= 4.5 ? 'moderate' : 'weak'
                return (
                  <div key={a.key} className="bg-card border border-border rounded-xl px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[16px]">{a.emoji}</span>
                        <span className="text-[13px] font-medium text-foreground">{a.label}</span>
                        <span className="text-[11px] text-muted-foreground/60">{a.desc}</span>
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
                  </div>
                )
              })}
            </div>
          </section>

          {/* ── レコメンド ── */}
          {recommendations.length > 0 && (
            <section className="mb-10">
              <h2 className="font-semibold text-[15px] text-foreground mb-2">
                不足を補う成分
              </h2>
              <p className="text-[13px] text-muted-foreground mb-5">
                スコアが低い軸をカバーできる成分です
              </p>
              <div className="space-y-3">
                {recommendations.map(({ ing, axis }) => (
                  <Link key={ing.slug} href={`/ingredients/${ing.slug}`}
                    className="group flex items-center gap-4 bg-card border border-border
                      rounded-2xl p-4 hover:border-accent/50 hover:shadow-md
                      transition-all duration-200">
                    <EvidenceBadge rank={ing.evidenceRank} variant="dot" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-semibold text-[14px] text-foreground
                          group-hover:text-accent transition-colors truncate">
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
                    <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0
                      group-hover:text-accent transition-colors" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* 全軸充実の場合 */}
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
        /* 未選択状態 */
        <div className="bg-secondary border border-border rounded-2xl p-8 text-center">
          <p className="text-[32px] mb-3">🔬</p>
          <p className="font-medium text-[15px] text-foreground mb-2">
            成分を追加するとチャートが表示されます
          </p>
          <p className="text-[13px] text-muted-foreground">
            今飲んでいるサプリメントやスキンケア成分を選んでください
          </p>
        </div>
      )}

      {/* 注意書き */}
      <p className="text-[12px] text-muted-foreground leading-relaxed border-t border-border pt-6">
        スコアは論文エビデンスに基づく参考値です。個人の状態・用量・相互作用は考慮していません。
        医療的アドバイスではありません。
      </p>
    </div>
  )
}
