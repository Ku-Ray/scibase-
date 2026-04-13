import Link from 'next/link'
import type { Ingredient } from '@/lib/types'
import { EvidenceBadge } from './EvidenceBadge'

interface Props {
  ingredient: Ingredient
  rank?: number
}

export function IngredientCard({ ingredient, rank }: Props) {
  return (
    <Link href={`/ingredients/${ingredient.slug}`}>
      <article
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
        }}
        className="group rounded-2xl p-5 sm:p-6 hover:shadow-md
          transition-all duration-200 hover:border-[var(--accent)] cursor-pointer h-full flex flex-col">

        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            {rank !== undefined && (
              <span style={{ background: 'var(--bg-muted)', color: 'var(--text-tertiary)' }}
                className="w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                {rank}
              </span>
            )}
            <h3 style={{ color: 'var(--text-primary)' }}
              className="font-semibold text-[15px] leading-snug group-hover:text-[var(--accent)] transition-colors">
              {ingredient.nameJa}
            </h3>
          </div>
          <EvidenceBadge rank={ingredient.evidenceRank} />
        </div>

        {/* Tagline */}
        <p style={{ color: 'var(--text-secondary)' }}
          className="text-[13px] leading-relaxed flex-1 line-clamp-2">
          {ingredient.tagline}
        </p>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid var(--border-light)', color: 'var(--text-tertiary)' }}
          className="mt-4 pt-3 flex items-center justify-between text-[12px]">
          <span>{ingredient.papers.length}件の研究</span>
          {ingredient.dosageMin && (
            <span>
              {ingredient.dosageMin}
              {ingredient.dosageMax && ingredient.dosageMax !== ingredient.dosageMin
                ? `–${ingredient.dosageMax}` : ''}{' '}{ingredient.dosageUnit}
            </span>
          )}
        </div>
      </article>
    </Link>
  )
}
