import type { EffectiveDoseStatus } from '@/lib/productScore'

interface Props {
  status: EffectiveDoseStatus
  /** 充足率（0〜1.2）。partial の時の「論文有効量の○%」表示に使用 */
  ratio: number | null
  compact?: boolean
}

/**
 * 論文有効量との充足を二値（実質3値+不明）で示すバッジ。
 * 損失回避を発動：「不足」を視覚的に明示することで BEST PICK への回避行動を促す。
 * 文言は客観事実のみ（「最強」「No.1」等の景表法NGワード不使用）。
 */
export function EffectiveDoseBadge({ status, ratio, compact = false }: Props) {
  const size = compact ? 'text-[10px] px-1.5 py-0.5' : 'text-[11px] px-2 py-1'

  if (status === 'sufficient') {
    return (
      <span className={`${size} font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md whitespace-nowrap`}>
        ✓ 論文有効量を充足
      </span>
    )
  }
  if (status === 'partial') {
    const pct = ratio != null ? Math.round(ratio * 100) : null
    return (
      <span className={`${size} font-semibold bg-amber-50 text-amber-800 border border-amber-200 rounded-md whitespace-nowrap`}>
        {pct != null ? `△ 論文有効量の${pct}%` : '△ 論文有効量に未達'}
      </span>
    )
  }
  if (status === 'insufficient') {
    const pct = ratio != null ? Math.round(ratio * 100) : null
    return (
      <span className={`${size} font-semibold bg-rose-50 text-rose-700 border border-rose-200 rounded-md whitespace-nowrap`}>
        {pct != null ? `× 論文有効量の${pct}%（不足）` : '× 論文有効量に大幅未達'}
      </span>
    )
  }
  return (
    <span className={`${size} font-medium bg-secondary text-muted-foreground border border-border rounded-md whitespace-nowrap`}>
      用量データなし
    </span>
  )
}
