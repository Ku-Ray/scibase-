'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, ChevronRight } from 'lucide-react'
import type { EvidenceRank } from '@/lib/types'

export interface CostRow {
  slug: string
  nameJa: string
  nameEn: string
  rank: EvidenceRank
  pei: number
  /** 論文の有効量を満たす商品のうち最安の月額コスト（円） */
  cost: number
  rct: number
  meta: number
  /** その月額コストを与える商品名・ブランド */
  productName: string
  brand: string
}

const RANK_DOT: Record<EvidenceRank, string> = {
  S: 'bg-amber-500 text-white',
  A: 'bg-blue-500 text-white',
  B: 'bg-emerald-500 text-white',
  C: 'bg-stone-400 text-white',
}

const TABS: ('all' | EvidenceRank)[] = ['all', 'S', 'A', 'B', 'C']
const TAB_LABEL: Record<'all' | EvidenceRank, string> = { all: 'すべて', S: 'S', A: 'A', B: 'B', C: 'C' }

type SortKey = 'cost' | 'pei'

export function CostPerformanceTable({ rows }: { rows: CostRow[] }) {
  const [q, setQ] = useState('')
  const [rank, setRank] = useState<'all' | EvidenceRank>('all')
  const [sort, setSort] = useState<SortKey>('cost')

  const counts = useMemo(() => {
    const c: Record<'all' | EvidenceRank, number> = { all: rows.length, S: 0, A: 0, B: 0, C: 0 }
    rows.forEach(r => { c[r.rank] += 1 })
    return c
  }, [rows])

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    const out = rows.filter(r => {
      if (rank !== 'all' && r.rank !== rank) return false
      if (needle && !`${r.nameJa} ${r.nameEn}`.toLowerCase().includes(needle)) return false
      return true
    })
    out.sort((a, b) => (sort === 'cost' ? a.cost - b.cost : b.pei - a.pei))
    return out
  }, [rows, q, rank, sort])

  return (
    <div>
      {/* 検索 */}
      <div className="flex items-center gap-2.5 bg-secondary border border-border rounded-xl px-3.5 py-2.5 mb-3">
        <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <input
          type="text"
          inputMode="search"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="成分名で絞り込む（例：ビタミンD、マグネシウム）"
          className="flex-1 bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground/60
            outline-none min-w-0"
          aria-label="成分名で絞り込む"
        />
        {q && (
          <button
            onClick={() => setQ('')}
            className="text-[12px] text-muted-foreground hover:text-foreground flex-shrink-0"
            aria-label="検索をクリア"
          >
            クリア
          </button>
        )}
      </div>

      {/* ランクタブ */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        {TABS.map(t => {
          const active = rank === t
          return (
            <button
              key={t}
              onClick={() => setRank(t)}
              className={`inline-flex items-center gap-1.5 text-[12px] font-medium rounded-full px-3 py-1.5
                border transition-colors min-h-[36px]
                ${active
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-card text-muted-foreground border-border hover:border-accent hover:text-accent'}`}
            >
              {t !== 'all' && (
                <span className={`w-4 h-4 rounded text-[10px] font-bold flex items-center justify-center
                  ${active ? 'bg-background/20 text-background' : RANK_DOT[t]}`}>
                  {t}
                </span>
              )}
              {TAB_LABEL[t]}
              <span className={active ? 'opacity-70' : 'opacity-50'}>{counts[t]}</span>
            </button>
          )
        })}
      </div>

      {/* 並べ替え + 件数 */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="inline-flex items-center gap-1 bg-card border border-border rounded-full p-0.5">
          <button
            onClick={() => setSort('cost')}
            className={`text-[12px] rounded-full px-3 py-1.5 min-h-[34px] transition-colors
              ${sort === 'cost' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}
            aria-pressed={sort === 'cost'}
          >
            安い順
          </button>
          <button
            onClick={() => setSort('pei')}
            className={`text-[12px] rounded-full px-3 py-1.5 min-h-[34px] transition-colors
              ${sort === 'pei' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}
            aria-pressed={sort === 'pei'}
          >
            エビデンス順
          </button>
        </div>
        <span className="text-[12px] text-muted-foreground whitespace-nowrap flex-shrink-0">
          {filtered.length}成分
        </span>
      </div>

      {/* テーブル（モバイルは横スクロール） */}
      <p className="sm:hidden text-[11px] text-muted-foreground/60 mb-1.5">← 横にスクロールできます →</p>
      <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[560px] border-collapse text-[13px]">
          <thead>
            <tr className="text-left text-[11px] text-muted-foreground border-b border-border">
              <th className="font-medium py-2 pr-2 w-8">#</th>
              <th className="font-medium py-2 pr-3">成分</th>
              <th className="font-medium py-2 px-2 text-right whitespace-nowrap">月額（有効量）</th>
              <th className="font-medium py-2 px-2 whitespace-nowrap">エビデンス</th>
              <th className="font-medium py-2 px-2 text-right">PEI</th>
              <th className="font-medium py-2 pl-2 text-right whitespace-nowrap">RCT/メタ</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={r.slug} className="border-b border-border/60 hover:bg-secondary/60 transition-colors group">
                <td className="py-2.5 pr-2 text-[12px] text-muted-foreground/70 tabular-nums align-top">{i + 1}</td>
                <td className="py-2.5 pr-3 align-top">
                  <Link href={`/ingredients/${r.slug}`} className="block">
                    <span className="font-medium text-foreground group-hover:text-accent transition-colors leading-snug
                      inline-flex items-center gap-0.5">
                      {r.nameJa}
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity flex-shrink-0" />
                    </span>
                    <span className="block text-[10px] text-muted-foreground/50 leading-tight truncate max-w-[180px]">
                      {r.brand}
                    </span>
                  </Link>
                </td>
                <td className="py-2.5 px-2 text-right align-top whitespace-nowrap">
                  <span className="font-semibold text-foreground tabular-nums">¥{r.cost.toLocaleString()}</span>
                  <span className="block text-[10px] text-muted-foreground/50">/月</span>
                </td>
                <td className="py-2.5 px-2 align-top">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-[12px] font-bold
                    ${RANK_DOT[r.rank]}`}>
                    {r.rank}
                  </span>
                </td>
                <td className="py-2.5 px-2 text-right align-top tabular-nums font-medium text-foreground">
                  {r.pei.toFixed(1)}
                </td>
                <td className="py-2.5 pl-2 text-right align-top tabular-nums text-muted-foreground whitespace-nowrap">
                  <span className={r.rct > 0 ? 'text-foreground' : 'opacity-40'}>{r.rct}</span>
                  <span className="opacity-30"> / </span>
                  <span className={r.meta > 0 ? 'text-foreground' : 'opacity-40'}>{r.meta}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-[13px] text-muted-foreground py-10">
          該当する成分がありません。条件を変えてお試しください。
        </p>
      )}
    </div>
  )
}
