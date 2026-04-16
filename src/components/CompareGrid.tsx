'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { EvidenceBadge } from '@/components/EvidenceBadge'
import { CATEGORY_LABELS } from '@/lib/compare-data'
import type { EvidenceRank } from '@/lib/types'

interface PairEntry {
  pairKey: string
  nameJaA: string
  nameJaB: string
  rankA: EvidenceRank
  rankB: EvidenceRank
  category: string
  isTop3: boolean
}

const rankScore: Record<EvidenceRank, number> = { S: 4, A: 3, B: 2, C: 1 }
const rankLabel: Record<EvidenceRank, string> = {
  S: 'メタ解析', A: 'RCT', B: 'コホート', C: '小規模',
}

function PairRow({ pairKey, nameJaA, nameJaB, rankA, rankB, highlighted = false }: PairEntry & { highlighted?: boolean }) {
  const winner = rankScore[rankA] > rankScore[rankB]
    ? nameJaA
    : rankScore[rankB] > rankScore[rankA] ? nameJaB : null

  return (
    <Link
      href={`/compare/${pairKey}`}
      className={`flex items-center gap-3 rounded-2xl px-5 py-4
        hover:shadow-sm transition-all group
        ${highlighted
          ? 'bg-amber-50/60 border border-amber-200 hover:border-amber-400'
          : 'bg-card border border-border hover:border-accent/50'
        }`}
    >
      {/* 成分A */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <EvidenceBadge rank={rankA} variant="chip" />
        <span className="font-semibold text-[14px] text-foreground truncate">{nameJaA}</span>
      </div>

      {/* vs */}
      <div className={`flex-shrink-0 text-[10px] font-black rounded-full px-2.5 py-1 leading-none
        ${highlighted
          ? 'text-amber-700 bg-white border border-amber-200'
          : 'text-muted-foreground/50 bg-secondary border border-border'
        }`}>
        VS
      </div>

      {/* 成分B */}
      <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
        <span className="font-semibold text-[14px] text-foreground truncate text-right">{nameJaB}</span>
        <EvidenceBadge rank={rankB} variant="chip" />
      </div>

      {/* 勝者バッジ + 矢印 */}
      <div className="flex items-center gap-2 flex-shrink-0 ml-1">
        {winner && (
          <span className="hidden sm:block text-[10px] font-semibold whitespace-nowrap
            bg-white border border-amber-200 text-amber-700 rounded-full px-2 py-0.5">
            {winner}が優位
          </span>
        )}
        <ArrowRight className={`w-4 h-4 flex-shrink-0 transition-colors
          ${highlighted ? 'text-amber-600' : 'text-muted-foreground group-hover:text-accent'}`} />
      </div>
    </Link>
  )
}

export function CompareGrid({ pairs }: { pairs: PairEntry[] }) {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const usedCategories = ['all', ...Array.from(new Set(pairs.map(p => p.category)))]

  const top3 = pairs.filter(p => p.isTop3)
  const rest  = pairs.filter(p => !p.isTop3)
  const filtered = activeFilter === 'all'
    ? rest
    : pairs.filter(p => p.category === activeFilter)

  return (
    <>
      {/* TOP3ハイライト — 社会的証明 + アンカリング */}
      {activeFilter === 'all' && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50
              border border-amber-200 rounded-full px-3 py-1">
              よく比較されているペア
            </span>
          </div>
          <div className="space-y-2">
            {top3.map(p => <PairRow key={p.pairKey} {...p} highlighted />)}
          </div>
        </section>
      )}

      {/* フィルターピル — 選択肢の絞り込みで認知負荷を下げる */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 -mx-1 px-1">
        {usedCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`flex-shrink-0 text-[12px] font-medium rounded-full px-3.5 py-1.5
              transition-colors whitespace-nowrap
              ${activeFilter === cat
                ? 'bg-foreground text-background'
                : 'bg-secondary border border-border text-muted-foreground hover:border-foreground/30'
              }`}
          >
            {CATEGORY_LABELS[cat] ?? cat}
          </button>
        ))}
      </div>

      {/* ペア一覧 */}
      {filtered.length > 0 ? (
        <div className="space-y-2">
          {filtered.map(p => <PairRow key={p.pairKey} {...p} />)}
        </div>
      ) : (
        <p className="text-[13px] text-muted-foreground py-8 text-center">
          このカテゴリの比較はまだ準備中です
        </p>
      )}

      {/* カテゴリフィルター時：エビデンスランク凡例 */}
      {activeFilter !== 'all' && (
        <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
          {(['S', 'A', 'B', 'C'] as EvidenceRank[]).map(r => (
            <span key={r} className="flex items-center gap-1.5">
              <EvidenceBadge rank={r} variant="chip" />
              {rankLabel[r]}
            </span>
          ))}
        </div>
      )}
    </>
  )
}
