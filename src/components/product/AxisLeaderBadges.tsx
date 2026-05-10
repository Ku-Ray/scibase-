import type { AxisLeader } from '@/lib/productScore'

interface Props {
  /** ingredient.products[] で算出された全軸リーダー */
  leaders: AxisLeader[]
  /** 当該商品のURL（リーダー判定用） */
  productUrl: string
  /** 1位（rank=1）か。trueなら 1位スクエアバッジを先頭に表示 */
  showOverallRank?: boolean
  /** 表示する最大数（cluttering 回避） */
  maxBadges?: number
  /** mybest風スタイル（pillBadge=true で王冠付き淡黄色チップ）。既定true */
  pillStyle?: boolean
}

/**
 * 「[軸名] No.1」のmulti-context勝者バッジを横並び表示。
 * mybest 風に黄色1色統一・絵文字王冠つきで視認性を上げる。
 * 文言は必ず「[軸] No.1」のみ。「最高/最強」等は使わない（景表法）。
 * hover で「当サイト掲載商品中」を出す（title属性）。
 */
export function AxisLeaderBadges({
  leaders,
  productUrl,
  showOverallRank = false,
  maxBadges = 4,
  pillStyle = true,
}: Props) {
  const myLeaderships = leaders.filter(l => l.leaderUrls.has(productUrl))
  const hasAny = showOverallRank || myLeaderships.length > 0
  if (!hasAny) return null

  const visible = myLeaderships.slice(0, maxBadges - (showOverallRank ? 1 : 0))

  if (!pillStyle) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-1.5 items-center">
      {showOverallRank && (
        <span
          className="inline-flex items-center justify-center text-[12px] font-semibold tracking-wider bg-amber-400 text-amber-950 rounded px-2 py-1 leading-none"
          title="当サイト掲載商品中・総合スコア1位"
        >
          1位
        </span>
      )}
      {visible.map(l => (
        <span
          key={l.axis}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-900 whitespace-nowrap"
          title={`当サイト掲載商品中・${l.axisLabel}スコア最上位`}
        >
          <span aria-hidden className="text-amber-500 text-[12px] leading-none">♛</span>
          <span>{l.axisLabel} No.1</span>
        </span>
      ))}
    </div>
  )
}
