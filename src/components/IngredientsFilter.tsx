'use client'

import { useMemo, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { IngredientCard } from './IngredientCard'
import { concerns as allConcerns } from '@/lib/data'
import type { Ingredient, EvidenceRank } from '@/lib/types'

interface Props { ingredients: Ingredient[] }

type UsageTab = 'all' | 'topical' | 'oral'
const RANKS: EvidenceRank[] = ['S', 'A', 'B', 'C']

const rankMeta: Record<EvidenceRank, { label: string; desc: string; style: string }> = {
  S: { label: 'S', desc: 'メタ解析・SR',    style: 'bg-amber-500  text-white border-amber-500'  },
  A: { label: 'A', desc: 'RCT',            style: 'bg-blue-500   text-white border-blue-500'   },
  B: { label: 'B', desc: 'コホート',        style: 'bg-emerald-500 text-white border-emerald-500'},
  C: { label: 'C', desc: '動物・小規模',    style: 'bg-stone-400  text-white border-stone-400'  },
}

export function IngredientsFilter({ ingredients }: Props) {
  const router     = useRouter()
  const pathname   = usePathname()
  const params     = useSearchParams()

  const usage         = (params.get('usage') ?? 'all') as UsageTab
  const rankFilter    = (params.get('rank') ?? 'all') as EvidenceRank | 'all'
  const concernFilter = params.get('concern') ?? 'all'

  const update = useCallback((key: string, val: string) => {
    const next = new URLSearchParams(params.toString())
    if (val === 'all') next.delete(key)
    else               next.set(key, val)
    router.push(`${pathname}?${next.toString()}`, { scroll: false })
  }, [params, pathname, router])

  const filtered = useMemo(() => ingredients.filter(ing => {
    const u = ing.usageType ?? 'oral'
    const usageOk =
      usage === 'all'     ? true :
      usage === 'topical' ? u === 'topical' || u === 'both' :
                            u === 'oral'    || u === 'both'
    const rankOk    = rankFilter === 'all' || ing.evidenceRank === rankFilter
    const concernOk = concernFilter === 'all' || ing.concerns.includes(concernFilter)
    return usageOk && rankOk && concernOk
  }), [ingredients, usage, rankFilter, concernFilter])

  const grouped = RANKS.reduce<Record<EvidenceRank, Ingredient[]>>((acc, r) => {
    acc[r] = filtered.filter(i => i.evidenceRank === r)
    return acc
  }, { S: [], A: [], B: [], C: [] })

  const activeConcern = allConcerns.find(c => c.slug === concernFilter)

  return (
    <div>
      {/* ── Filter bar ───────────────────────────── */}
      <div className="space-y-3 mb-8">

        {/* Row 1: 使用区分 + ランク */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* 使用区分タブ */}
          <div className="flex gap-1 bg-secondary rounded-xl p-1 self-start">
            {([['all','すべて'], ['topical','外用'], ['oral','経口']] as [UsageTab,string][]).map(([v,label]) => (
              <button key={v} onClick={() => update('usage', v)}
                className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-150
                  ${usage === v ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                {label}
              </button>
            ))}
          </div>

          {/* ランクフィルター */}
          <div className="flex gap-1.5 flex-wrap items-center">
            <button onClick={() => update('rank', 'all')}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-all
                ${rankFilter === 'all' ? 'bg-foreground text-background border-foreground' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'}`}>
              全ランク
            </button>
            {RANKS.map(r => (
              <button key={r} onClick={() => update('rank', r === rankFilter ? 'all' : r)}
                className={`border px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all
                  ${rankMeta[r].style}
                  ${rankFilter === r ? 'opacity-100 ring-2 ring-offset-1 ring-current' : 'opacity-50 hover:opacity-90'}`}>
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: 悩みカテゴリフィルター（選択パラドックス解消） */}
        <div>
          <p className="text-[11px] text-muted-foreground/60 uppercase tracking-wider font-medium mb-2">
            悩みから絞る
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <button
              onClick={() => update('concern', 'all')}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[12px] font-medium
                border transition-all duration-150
                ${concernFilter === 'all'
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'}`}
            >
              すべて
            </button>
            {allConcerns.map(c => (
              <button
                key={c.slug}
                onClick={() => update('concern', c.slug === concernFilter ? 'all' : c.slug)}
                className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5
                  rounded-full text-[12px] font-medium border transition-all duration-150
                  ${concernFilter === c.slug
                    ? 'bg-foreground text-background border-foreground'
                    : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'}`}
              >
                <span className="text-[13px]">{c.emoji}</span>
                {c.nameJa}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 件数 + アクティブフィルター表示 */}
      <p className="text-[13px] text-muted-foreground mb-8 flex flex-wrap items-center gap-2">
        <span>
          <span className="font-semibold text-foreground text-[15px]">{filtered.length}</span>
          <span className="ml-1">件</span>
        </span>
        {activeConcern && (
          <span className="inline-flex items-center gap-1.5 bg-secondary border border-border
            rounded-full px-2.5 py-1 text-[12px] font-medium text-foreground">
            {activeConcern.emoji} {activeConcern.nameJa}
            <button onClick={() => update('concern', 'all')}
              className="text-muted-foreground hover:text-foreground ml-0.5 leading-none">×</button>
          </span>
        )}
        {usage !== 'all' && (
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border
            border-rose-200 rounded-full px-2.5 py-1 text-[12px] font-medium">
            {usage === 'topical' ? '外用' : '経口'}のみ
            <button onClick={() => update('usage', 'all')}
              className="hover:text-rose-900 ml-0.5 leading-none">×</button>
          </span>
        )}
        {rankFilter !== 'all' && (
          <span className="inline-flex items-center gap-1 bg-secondary border border-border
            rounded-full px-2.5 py-1 text-[12px] font-medium"
            style={{color: rankFilter === 'S' ? '#d97706' : rankFilter === 'A' ? '#3b82f6' : rankFilter === 'B' ? '#10b981' : '#78716c'}}>
            エビデンス{rankFilter}
            <button onClick={() => update('rank', 'all')}
              className="hover:opacity-70 ml-0.5 leading-none">×</button>
          </span>
        )}
      </p>

      {/* グループ別グリッド */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground text-[14px]">
          <p className="text-[32px] mb-3">🔍</p>
          <p className="font-medium text-foreground mb-1">条件に一致する成分が見つかりませんでした</p>
          <button onClick={() => { update('concern', 'all'); update('usage', 'all'); update('rank', 'all') }}
            className="text-[13px] text-accent hover:underline mt-2">
            フィルターをリセットする
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {RANKS.map(rank => {
            const group = grouped[rank]
            if (!group.length) return null
            const m = rankMeta[rank]
            return (
              <section key={rank}>
                <div className={`${m.style} border inline-flex items-center gap-2
                  rounded-xl px-3 py-1.5 mb-5`}>
                  <span className="font-black text-[18px] leading-none">{m.label}</span>
                  <span className="text-[12px] font-medium">{m.desc}</span>
                  <span className="text-[11px] opacity-80">· {group.length}件</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {group.map(ing => (
                    <IngredientCard key={ing.slug} ingredient={ing} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
