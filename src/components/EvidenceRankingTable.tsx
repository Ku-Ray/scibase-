'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, ChevronRight } from 'lucide-react'
import type { EvidenceRank } from '@/lib/types'

export interface RankRow {
  /** PEI 降順での全体順位（フィルタしても変わらない絶対位置） */
  pos: number
  slug: string
  nameJa: string
  nameEn: string
  rank: EvidenceRank
  /** 論文エビデンス指数（0〜10） */
  pei: number
  rct: number
  meta: number
  total: number
  /** 主な用途（concern 日本語名・最大3件） */
  concernsJa: string[]
  usage?: 'topical' | 'oral' | 'both'
}

/* EvidenceBadge と同一の正準カラー（独自配色を作らない） */
const RANK_DOT: Record<EvidenceRank, string> = {
  S: 'bg-amber-500 text-white',
  A: 'bg-blue-500 text-white',
  B: 'bg-emerald-500 text-white',
  C: 'bg-stone-400 text-white',
}
const RANK_BAR: Record<EvidenceRank, string> = {
  S: 'bg-amber-500',
  A: 'bg-blue-500',
  B: 'bg-emerald-500',
  C: 'bg-stone-400',
}

const USAGE_LABEL: Record<NonNullable<RankRow['usage']>, string> = {
  topical: '外用',
  oral: '経口',
  both: '外用・経口',
}

const TABS: ('all' | EvidenceRank)[] = ['all', 'S', 'A', 'B', 'C']
const TAB_LABEL: Record<'all' | EvidenceRank, string> = {
  all: 'すべて',
  S: 'S',
  A: 'A',
  B: 'B',
  C: 'C',
}

export function EvidenceRankingTable({ rows }: { rows: RankRow[] }) {
  const [q, setQ] = useState('')
  const [rank, setRank] = useState<'all' | EvidenceRank>('all')
  const [humanOnly, setHumanOnly] = useState(false)

  const counts = useMemo(() => {
    const c: Record<'all' | EvidenceRank, number> = { all: rows.length, S: 0, A: 0, B: 0, C: 0 }
    rows.forEach(r => { c[r.rank] += 1 })
    return c
  }, [rows])

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return rows.filter(r => {
      if (rank !== 'all' && r.rank !== rank) return false
      if (humanOnly && r.rct === 0 && r.meta === 0) return false
      if (needle && !`${r.nameJa} ${r.nameEn}`.toLowerCase().includes(needle)) return false
      return true
    })
  }, [rows, q, rank, humanOnly])

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
          placeholder="成分名で絞り込む（例：ビタミンC、NMN）"
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

      {/* ヒト試験トグル + 件数 */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <button
          onClick={() => setHumanOnly(v => !v)}
          className={`inline-flex items-center gap-2 text-[12px] rounded-full px-3 py-1.5 border transition-colors min-h-[36px]
            ${humanOnly
              ? 'bg-accent/10 text-accent border-accent/40'
              : 'bg-card text-muted-foreground border-border hover:border-accent/50'}`}
          aria-pressed={humanOnly}
        >
          <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0
            ${humanOnly ? 'bg-accent border-accent text-white' : 'border-muted-foreground/40'}`}>
            {humanOnly && (
              <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2.5 6.5l2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          ヒトのRCT・メタ解析ありのみ
        </button>
        <span className="text-[12px] text-muted-foreground whitespace-nowrap flex-shrink-0">
          {filtered.length}成分
        </span>
      </div>

      {/* テーブル（モバイルは横スクロール） */}
      <p className="sm:hidden text-[11px] text-muted-foreground/60 mb-1.5">← 横にスクロールできます →</p>
      <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[600px] border-collapse text-[13px]">
          <thead>
            <tr className="text-left text-[11px] text-muted-foreground border-b border-border">
              <th className="font-medium py-2 pr-2 w-10">#</th>
              <th className="font-medium py-2 pr-3">成分</th>
              <th className="font-medium py-2 px-2 whitespace-nowrap">エビデンス</th>
              <th className="font-medium py-2 px-2 w-[120px]">PEI</th>
              <th className="font-medium py-2 px-2 text-right whitespace-nowrap">RCT</th>
              <th className="font-medium py-2 px-2 text-right whitespace-nowrap">メタ解析</th>
              <th className="font-medium py-2 pl-3">主な用途</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.slug} className="border-b border-border/60 hover:bg-secondary/60 transition-colors group">
                <td className="py-2.5 pr-2 text-[12px] text-muted-foreground/70 tabular-nums align-top">
                  {r.pos}
                </td>
                <td className="py-2.5 pr-3 align-top">
                  <Link href={`/ingredients/${r.slug}`} className="block">
                    <span className="font-medium text-foreground group-hover:text-accent transition-colors leading-snug
                      inline-flex items-center gap-0.5">
                      {r.nameJa}
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity flex-shrink-0" />
                    </span>
                    <span className="block text-[10px] text-muted-foreground/50 leading-tight">{r.nameEn}</span>
                  </Link>
                </td>
                <td className="py-2.5 px-2 align-top">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-[12px] font-bold
                    ${RANK_DOT[r.rank]}`}>
                    {r.rank}
                  </span>
                </td>
                <td className="py-2.5 px-2 align-top">
                  <div className="flex items-center gap-2">
                    <span className="tabular-nums font-semibold text-foreground w-7 flex-shrink-0">{r.pei.toFixed(1)}</span>
                    <span className="h-1.5 w-full max-w-[64px] bg-secondary rounded-full overflow-hidden">
                      <span
                        className={`block h-full rounded-full ${RANK_BAR[r.rank]} opacity-80`}
                        style={{ width: `${Math.min(100, (r.pei / 10) * 100)}%` }}
                      />
                    </span>
                  </div>
                </td>
                <td className="py-2.5 px-2 text-right tabular-nums align-top">
                  <span className={r.rct > 0 ? 'text-foreground font-medium' : 'text-muted-foreground/40'}>{r.rct}</span>
                </td>
                <td className="py-2.5 px-2 text-right tabular-nums align-top">
                  <span className={r.meta > 0 ? 'text-foreground font-medium' : 'text-muted-foreground/40'}>{r.meta}</span>
                </td>
                <td className="py-2.5 pl-3 align-top">
                  <div className="flex flex-wrap gap-1">
                    {r.concernsJa.length === 0 && <span className="text-muted-foreground/40 text-[11px]">—</span>}
                    {r.concernsJa.map(c => (
                      <span key={c} className="text-[10px] text-muted-foreground bg-secondary border border-border/60
                        rounded px-1.5 py-0.5 whitespace-nowrap">
                        {c}
                      </span>
                    ))}
                    {r.usage && (
                      <span className="text-[10px] text-muted-foreground/70 bg-card border border-border/60
                        rounded px-1.5 py-0.5 whitespace-nowrap">
                        {USAGE_LABEL[r.usage]}
                      </span>
                    )}
                  </div>
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
