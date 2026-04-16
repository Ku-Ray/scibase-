import Link from 'next/link'
import type { Ingredient } from '@/lib/types'
import { EvidenceBadge, EvidenceBar } from './EvidenceBadge'
import { concerns as allConcerns } from '@/lib/data'

interface Props {
  ingredient:   Ingredient
  rank?:        number
  showConcerns?: boolean
}

const rankBorderColor: Record<string, string> = {
  S: 'border-l-amber-500',
  A: 'border-l-blue-500',
  B: 'border-l-emerald-500',
  C: 'border-l-stone-400',
}

const rankTopBar: Record<string, string> = {
  S: 'bg-amber-500',
  A: 'bg-blue-500',
  B: 'bg-emerald-500',
  C: 'bg-stone-400',
}

const rankHoverShadow: Record<string, string> = {
  S: 'hover:shadow-amber-200/60',
  A: 'hover:shadow-blue-200/60',
  B: 'hover:shadow-emerald-200/60',
  C: 'hover:shadow-stone-200/60',
}

const usageStyle: Record<string, string> = {
  topical: 'bg-rose-50   text-rose-700   border-rose-200',
  oral:    'bg-sky-50    text-sky-700    border-sky-200',
  both:    'bg-violet-50 text-violet-700 border-violet-200',
}
const usageLabel: Record<string, string> = {
  topical: '外用', oral: '経口', both: '外用・経口',
}

export function IngredientCard({ ingredient: ing, rank, showConcerns = true }: Props) {
  const relatedConcerns = showConcerns
    ? allConcerns.filter(c => ing.concerns.includes(c.slug)).slice(0, 2)
    : []

  return (
    <Link href={`/ingredients/${ing.slug}`} className="block h-full">
      <article className={`group h-full bg-card border border-l-4 rounded-2xl overflow-hidden
        hover:-translate-y-1 hover:shadow-xl
        transition-all duration-200 flex flex-col
        ${rankBorderColor[ing.evidenceRank]} ${rankHoverShadow[ing.evidenceRank]}`}>

        {/* Rank top accent bar */}
        <div className={`h-0.5 w-full ${rankTopBar[ing.evidenceRank]} opacity-60`} />

        <div className="flex flex-col gap-3 p-5 flex-1">

        {/* Top row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            {rank !== undefined && (
              <span className={`flex-shrink-0 w-6 h-6 rounded-full text-[11px] font-black
                flex items-center justify-center
                ${rank === 1 ? 'bg-amber-400 text-white'
                : rank === 2 ? 'bg-stone-300 text-stone-700'
                : rank === 3 ? 'bg-amber-700/70 text-white'
                : 'bg-secondary text-muted-foreground'}`}>
                {rank}
              </span>
            )}
            <div className="min-w-0">
              <h3 className="font-semibold text-[15px] text-foreground leading-snug
                group-hover:text-accent transition-colors truncate">
                {ing.nameJa}
              </h3>
              <p className="text-[11px] text-muted-foreground/50 truncate">{ing.nameEn}</p>
            </div>
          </div>
          <EvidenceBadge rank={ing.evidenceRank} variant="dot" />
        </div>

        {/* Tagline */}
        <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {ing.tagline}
        </p>

        {/* Evidence bar */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wide font-medium">
              Evidence
            </span>
            <span className="text-[10px] text-muted-foreground/50">
              {ing.papers.length}件の論文
            </span>
          </div>
          <EvidenceBar rank={ing.evidenceRank} />
        </div>

        {/* Footer tags */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-border">
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            {ing.usageType && (
              <span className={`text-[10px] font-semibold border rounded-md px-1.5 py-0.5
                flex-shrink-0 ${usageStyle[ing.usageType]}`}>
                {usageLabel[ing.usageType]}
              </span>
            )}
            {ing.emerging && (
              <span className="text-[10px] font-semibold bg-violet-50 text-violet-700
                border border-violet-200 rounded-md px-1.5 py-0.5 flex-shrink-0">
                🔭 注目
              </span>
            )}
            {relatedConcerns.map(c => (
              <span key={c.slug}
                className="text-[10px] text-muted-foreground/60 truncate max-w-[72px]">
                {c.emoji} {c.nameJa}
              </span>
            ))}
          </div>
          {ing.dosageMin && (
            <span className="text-[10px] text-muted-foreground/50 flex-shrink-0 tabular-nums">
              {ing.dosageMin}
              {ing.dosageMax && ing.dosageMax !== ing.dosageMin ? `–${ing.dosageMax}` : ''}
              {ing.dosageUnit.includes('濃度') ? '%' : ing.dosageUnit.split('/')[0].replace('mg', 'mg')}
            </span>
          )}
        </div>
        </div>
      </article>
    </Link>
  )
}
