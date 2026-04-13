import type { EvidenceRank } from '@/lib/types'

const config: Record<EvidenceRank, { label: string; humanLabel: string; cls: string }> = {
  S: { label: 'S',  humanLabel: '複数の比較試験で確認',   cls: 'ev-s' },
  A: { label: 'A',  humanLabel: '厳密な比較試験で確認',   cls: 'ev-a' },
  B: { label: 'B',  humanLabel: '大規模追跡研究で関連',   cls: 'ev-b' },
  C: { label: 'C',  humanLabel: 'ヒトデータ不足',         cls: 'ev-c' },
}

interface Props {
  rank: EvidenceRank
  variant?: 'badge' | 'full'   // badge=コンパクト / full=説明付き
}

export function EvidenceBadge({ rank, variant = 'badge' }: Props) {
  const { label, humanLabel, cls } = config[rank]

  if (variant === 'full') {
    return (
      <span className={`${cls} inline-flex items-center gap-2 border rounded-lg px-3 py-1.5 text-[13px]`}>
        <span className="font-black text-base w-4 text-center">{label}</span>
        <span className="font-medium">{humanLabel}</span>
      </span>
    )
  }

  return (
    <span className={`${cls} inline-flex items-center gap-1 border rounded-md px-1.5 py-0.5 text-[11px] font-bold`}>
      {label}
    </span>
  )
}
