'use client'

import { useMemo, useState } from 'react'
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import type { Ingredient, Product } from '@/lib/types'
import { OutboundProductLink } from '@/components/OutboundProductLink'
import { scoreProduct } from '@/lib/productScore'

const platformShort: Record<Product['platform'], string> = {
  iherb: 'iHerb',
  amazon: 'Amazon',
  cosme: '公式',
}

interface Props {
  products: Product[]
  ingredient: Ingredient
}

type SortKey = 'rank' | 'total' | 'cost' | 'evidence' | 'thirdParty'

const SORT_LABEL: Record<SortKey, string> = {
  rank: 'おすすめ順',
  total: '推奨度',
  cost: '安い順',
  evidence: '論文整合',
  thirdParty: '第三者検査',
}

/**
 * ソート可能な商品比較表（クライアント Component）。
 * モバイル375pxは横スクロールを許容（行幅圧縮で読めなくなるため）。
 */
export function ComparisonTable({ products, ingredient }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('rank')

  const rows = useMemo(() => {
    return products.map((p, idx) => ({
      product: p,
      score: scoreProduct(p, ingredient),
      originalRank: p.rank ?? 99 + idx,
    }))
  }, [products, ingredient])

  const sortedRows = useMemo(() => {
    const arr = [...rows]
    switch (sortKey) {
      case 'rank':
        // 推奨度 DESC で「おすすめ順」を統一・同点は手動 rank
        arr.sort((a, b) => {
          const diff = b.score.recommendationScore - a.score.recommendationScore
          if (Math.abs(diff) > 0.001) return diff
          return a.originalRank - b.originalRank
        })
        break
      case 'total':
        arr.sort((a, b) => b.score.recommendationScore - a.score.recommendationScore)
        break
      case 'cost':
        arr.sort((a, b) => {
          const ac = a.product.monthlyCostJpy ?? Number.POSITIVE_INFINITY
          const bc = b.product.monthlyCostJpy ?? Number.POSITIVE_INFINITY
          return ac - bc
        })
        break
      case 'evidence':
        arr.sort((a, b) => (b.score.evidenceScore ?? 0) - (a.score.evidenceScore ?? 0))
        break
      case 'thirdParty':
        arr.sort((a, b) => b.score.thirdPartyScore - a.score.thirdPartyScore)
        break
    }
    return arr
  }, [rows, sortKey])

  if (products.length < 2) return null

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      {/* ヘッダー：タイトル + ソートchips */}
      <div className="bg-secondary px-4 py-3 border-b border-border flex items-center justify-between gap-3 flex-wrap">
        <p className="text-[13px] font-bold text-foreground">ひと目で比較</p>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] text-muted-foreground">並び替え：</span>
          {(Object.keys(SORT_LABEL) as SortKey[]).map(k => (
            <button
              key={k}
              type="button"
              onClick={() => setSortKey(k)}
              className={`text-[11px] font-semibold rounded-full px-2.5 py-1 transition-colors ${
                sortKey === k
                  ? 'bg-foreground text-background'
                  : 'bg-card text-muted-foreground border border-border hover:bg-secondary'
              }`}
            >
              {SORT_LABEL[k]}
              {sortKey === k && (
                <span aria-hidden className="ml-1 inline-flex">
                  {k === 'cost' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 表（モバイルは横スクロール） */}
      <div className="overflow-x-auto">
        <table className="w-full text-[12px] min-w-[640px]">
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              <th className="text-left font-semibold text-muted-foreground px-3 py-2 whitespace-nowrap w-10">#</th>
              <th className="text-left font-semibold text-muted-foreground px-3 py-2 whitespace-nowrap">商品</th>
              <th className="text-left font-semibold text-muted-foreground px-3 py-2 whitespace-nowrap">推奨度</th>
              <th className="text-left font-semibold text-muted-foreground px-3 py-2 whitespace-nowrap">論文整合</th>
              <th className="text-left font-semibold text-muted-foreground px-3 py-2 whitespace-nowrap">第三者</th>
              <th className="text-left font-semibold text-muted-foreground px-3 py-2 whitespace-nowrap">月コスト</th>
              <th className="text-left font-semibold text-muted-foreground px-3 py-2 whitespace-nowrap">配送</th>
              <th className="text-right font-semibold text-muted-foreground px-3 py-2 whitespace-nowrap">購入</th>
            </tr>
          </thead>
          <tbody>
            {sortedRows.map(({ product: p, score: s }, i) => (
              <tr key={p.url} className="border-b border-border last:border-b-0 hover:bg-secondary/20">
                <td className="px-3 py-2 align-middle">
                  {i === 0 && sortKey !== 'rank' ? (
                    <span className="inline-block text-[10px] font-bold tracking-wider bg-foreground text-background rounded px-1.5 py-0.5">
                      ①
                    </span>
                  ) : p.rank === 1 ? (
                    <span className="inline-block text-[10px] font-bold tracking-wider bg-amber-400 text-amber-950 rounded px-1.5 py-0.5">
                      1位
                    </span>
                  ) : (
                    <span className="text-muted-foreground tabular-nums">{i + 1}</span>
                  )}
                </td>
                <td className="px-3 py-2 align-middle min-w-[180px]">
                  <p className="text-[10px] text-muted-foreground/80">{p.brand}</p>
                  <p className="text-[12px] font-semibold text-foreground line-clamp-2 leading-snug">
                    {p.name}
                  </p>
                </td>
                <td className="px-3 py-2 align-middle">
                  <span className="font-bold text-foreground tabular-nums">★{s.recommendationScore.toFixed(2)}</span>
                </td>
                <td className="px-3 py-2 align-middle text-foreground tabular-nums">
                  {s.evidenceScore == null ? '—' : `${s.evidenceScore}/5`}
                </td>
                <td className="px-3 py-2 align-middle text-foreground">
                  {p.heavyMetalTested ? '重金属＋' : p.thirdPartyTested ? 'あり' : 'なし'}
                </td>
                <td className="px-3 py-2 align-middle tabular-nums text-foreground">
                  {p.monthlyCostJpy != null ? `¥${p.monthlyCostJpy.toLocaleString()}` : '—'}
                </td>
                <td className="px-3 py-2 align-middle text-foreground">
                  {p.shippingNote ?? (p.platform === 'amazon' ? '国内・即日〜' : p.platform === 'cosme' ? '公式・国内' : '海外・7-14日')}
                </td>
                <td className="px-3 py-2 align-middle text-right">
                  <OutboundProductLink
                    href={p.url}
                    platform={p.platform}
                    ingredientSlug={ingredient.slug}
                    productRank={p.rank}
                    aspProgram={p.aspProgram}
                    aspId={p.aspId}
                    commissionRateBand={p.commissionRateBand}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold border border-border rounded-md px-2 py-1 hover:bg-secondary transition-colors whitespace-nowrap"
                  >
                    {platformShort[p.platform]}
                    <ExternalLink className="w-3 h-3" />
                  </OutboundProductLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
