'use client'

import { useMemo, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { IngredientCard } from './IngredientCard'
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

  const usage      = (params.get('usage') ?? 'all') as UsageTab
  const rankFilter = (params.get('rank') ?? 'all') as EvidenceRank | 'all'

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
    return usageOk && (rankFilter === 'all' || ing.evidenceRank === rankFilter)
  }), [ingredients, usage, rankFilter])

  const grouped = RANKS.reduce<Record<EvidenceRank, Ingredient[]>>((acc, r) => {
    acc[r] = filtered.filter(i => i.evidenceRank === r)
    return acc
  }, { S: [], A: [], B: [], C: [] })

  return (
    <div>
      {/* ── Filter bar ───────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">

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

      {/* 件数 */}
      <p className="text-[13px] text-muted-foreground mb-8">
        <span className="font-semibold text-foreground">{filtered.length}</span>件
        {usage !== 'all' && <span className="ml-2 text-rose-600 font-medium">
          {usage === 'topical' ? '外用' : '経口'}のみ
        </span>}
        {rankFilter !== 'all' && <span className="ml-2 font-medium" style={{color: rankFilter === 'S' ? '#d97706' : rankFilter === 'A' ? '#3b82f6' : rankFilter === 'B' ? '#10b981' : '#78716c'}}>
          エビデンス{rankFilter}
        </span>}
      </p>

      {/* グループ別グリッド */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground text-[14px]">
          条件に一致する成分が見つかりませんでした
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
