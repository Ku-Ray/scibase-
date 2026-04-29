interface Props {
  label: string
  score: number | null
  /** 小さいバリアント（記事compact用） */
  compact?: boolean
}

/**
 * 0–5 の客観スコアを横棒で描画。
 * score が null の場合は「—」表示で誠実に欠損を示す（過大表示で景表法違反を避ける）。
 */
export function ScoreBar({ label, score, compact = false }: Props) {
  const cells = 5
  const filled = score == null ? 0 : Math.max(0, Math.min(cells, Math.round(score)))
  const cellGap = compact ? 'gap-0.5' : 'gap-1'
  const cellHeight = compact ? 'h-1' : 'h-1.5'
  const labelSize = compact ? 'text-[10px]' : 'text-[11px]'
  const valueSize = compact ? 'text-[10px]' : 'text-[11px]'

  return (
    <div className={`flex items-center gap-2 ${compact ? '' : 'gap-3'}`}>
      <span className={`${labelSize} text-muted-foreground flex-shrink-0 ${compact ? 'w-14' : 'w-16'}`}>
        {label}
      </span>
      <div className={`flex-1 flex ${cellGap}`} aria-hidden="true">
        {Array.from({ length: cells }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 rounded-sm ${cellHeight} ${
              i < filled ? 'bg-foreground' : 'bg-foreground/10'
            }`}
          />
        ))}
      </div>
      <span className={`${valueSize} font-semibold tabular-nums text-foreground flex-shrink-0 w-7 text-right`}>
        {score == null ? '—' : `${filled}/5`}
      </span>
    </div>
  )
}
