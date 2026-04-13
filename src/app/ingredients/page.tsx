import { ingredients } from '@/lib/data'
import { IngredientCard } from '@/components/IngredientCard'
import type { Metadata } from 'next'
import type { EvidenceRank } from '@/lib/types'

export const metadata: Metadata = {
  title: '成分一覧 | エビデンスランク付き',
  description: '老化ケアに関連するサプリメント成分をエビデンスランク順に一覧表示。',
}

const rankMeta: Record<EvidenceRank, { label: string; desc: string }> = {
  S: { label: 'S', desc: '複数の比較試験で確認' },
  A: { label: 'A', desc: '厳密な比較試験で確認' },
  B: { label: 'B', desc: '大規模追跡研究で関連' },
  C: { label: 'C', desc: 'ヒトデータ不足' },
}

export default function IngredientsPage() {
  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      <div className="mb-10">
        <h1 style={{ color: 'var(--text-primary)' }}
          className="font-bold text-[28px] mb-2">成分一覧</h1>
        <p style={{ color: 'var(--text-secondary)' }} className="text-[14px]">
          エビデンスランクの高い順に表示。全{ingredients.length}成分。
        </p>
      </div>

      <div className="space-y-12">
        {(['S', 'A', 'B', 'C'] as EvidenceRank[]).map((rank) => {
          const group = ingredients.filter((i) => i.evidenceRank === rank)
          if (!group.length) return null
          const meta = rankMeta[rank]
          return (
            <section key={rank}>
              <div className="flex items-center gap-3 mb-6">
                <span className={`ev-${rank.toLowerCase()} border text-[22px] font-black w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  {meta.label}
                </span>
                <div>
                  <p style={{ color: 'var(--text-primary)' }} className="font-semibold text-[15px]">
                    {meta.desc}
                  </p>
                  <p style={{ color: 'var(--text-tertiary)' }} className="text-[12px]">
                    {group.length}成分
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.map((ing) => (
                  <IngredientCard key={ing.slug} ingredient={ing} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
