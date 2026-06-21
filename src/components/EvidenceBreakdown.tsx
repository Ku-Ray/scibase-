import type { Ingredient } from '@/lib/types'

interface Props {
  ingredient: Ingredient
  className?: string
}

/**
 * 成分の論文エビデンス内訳（PEI・RCT数・メタ解析数・論文数）を 1 行で表示する。
 * /evidence-ranking で使う指標と同一のものを、逆引き面（悩み別ランキング・悩みページ）にも供給し、
 * 「研究の裏付けの厚さ」をサイト横断で一貫表示する（独自データ資産の発見性強化）。
 *
 * evidenceScore が未算出の成分は論文数のみにフォールバック（情報を失わない drop-in）。
 */
export function EvidenceBreakdown({ ingredient: ing, className = '' }: Props) {
  const s = ing.evidenceScore
  if (!s) {
    return (
      <div className={`text-[11px] text-muted-foreground ${className}`}>
        論文 {ing.papers.length}件
      </div>
    )
  }

  const { rct, metaAnalysis, total } = s.paperStats
  return (
    <div className={`flex items-center flex-wrap gap-x-2 gap-y-1 text-[11px] text-muted-foreground ${className}`}>
      <span className="inline-flex items-baseline gap-1 bg-secondary border border-border/60 rounded px-1.5 py-0.5">
        <span className="uppercase tracking-wide text-[9px] opacity-70">PEI</span>
        <span className="font-semibold text-foreground tabular-nums text-[12px]">{s.overall.toFixed(1)}</span>
      </span>
      <span className={`tabular-nums ${rct > 0 ? 'text-foreground/80' : 'opacity-50'}`}>RCT {rct}</span>
      <span className="opacity-30">·</span>
      <span className={`tabular-nums ${metaAnalysis > 0 ? 'text-foreground/80' : 'opacity-50'}`}>
        メタ解析 {metaAnalysis}
      </span>
      <span className="opacity-30">·</span>
      <span className="tabular-nums opacity-70">論文 {total}</span>
    </div>
  )
}
