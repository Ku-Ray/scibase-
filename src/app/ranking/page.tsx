import Link from 'next/link'
import { Trophy, ArrowRight } from 'lucide-react'
import { concerns, getIngredientsByConcern } from '@/lib/data'
import { EvidenceBadge } from '@/components/EvidenceBadge'
import type { Metadata } from 'next'

const BASE_URL = 'https://scibase.app'

export const metadata: Metadata = {
  title: '成分ランキング｜悩み別・論文エビデンス順',
  description: 'シミ・乾燥・ニキビ・老化など悩み別に、論文エビデンスが強い成分をランキング形式で紹介。メタ解析・RCTの結果に基づいた科学的評価。',
  alternates: { canonical: `${BASE_URL}/ranking` },
}

const categoryLabel: Record<string, string> = {
  skin:      'スキンケア',
  body:      '体・全身',
  cognitive: '認知・メンタル',
  sleep:     '睡眠',
  gut:       '腸・消化',
  immunity:  '免疫',
}

const CATEGORY_ORDER = ['skin', 'body', 'cognitive', 'sleep', 'gut', 'immunity']

export default function RankingIndexPage() {
  const orderedCategories = CATEGORY_ORDER.filter(cat =>
    concerns.some(c => c.category === cat)
  )

  const grouped = orderedCategories.reduce<Record<string, typeof concerns>>((acc, cat) => {
    acc[cat] = concerns.filter(c => c.category === cat)
    return acc
  }, {})

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム',     item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'ランキング', item: `${BASE_URL}/ranking` },
    ],
  }

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'SciBase 悩み別ランキング一覧',
    numberOfItems: concerns.length,
    itemListElement: concerns.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${c.nameJa}ランキング`,
      url: `${BASE_URL}/ranking/${c.slug}`,
    })),
  }

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
    <div className="max-w-4xl mx-auto px-5 py-10">

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span className="text-[12px] font-semibold text-amber-600 uppercase tracking-wider">
            Evidence Ranking
          </span>
        </div>
        <h1 className="text-[28px] sm:text-[36px] font-bold text-foreground
          leading-[1.2] tracking-tight mb-3">
          成分ランキング
        </h1>
        <p className="text-[15px] text-muted-foreground leading-relaxed max-w-xl">
          口コミや人気ではなく、論文エビデンスの強さで成分を順位付け。
          悩みを選ぶと、その悩みに効果が確認されている成分ランキングが確認できます。
        </p>
      </div>

      {/* Category groups */}
      <div className="space-y-12">
        {orderedCategories.map((cat) => {
          const catConcerns = grouped[cat]
          return (
            <section key={cat}>
              <h2 className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider
                mb-5 pb-3 border-b border-border">
                {categoryLabel[cat] ?? cat}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {catConcerns.map(concern => {
                  const top3 = getIngredientsByConcern(concern.slug).slice(0, 3)
                  return (
                    <Link
                      key={concern.slug}
                      href={`/ranking/${concern.slug}`}
                      className={`group border rounded-2xl p-5
                        hover:-translate-y-0.5 hover:shadow-md
                        transition-all duration-200 cat-${concern.category}`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[18px] leading-none">{concern.emoji}</span>
                          <h3 className="font-semibold text-[15px]
                            group-hover:opacity-80 transition-opacity">
                            {concern.nameJa}
                          </h3>
                        </div>
                        <ArrowRight className="w-4 h-4 opacity-40 flex-shrink-0
                          group-hover:opacity-80 transition-opacity mt-0.5" />
                      </div>

                      {/* Top 3 preview */}
                      <div className="space-y-1.5">
                        {top3.map((ing, i) => (
                          <div key={ing.slug} className="flex items-center gap-2">
                            <span className="text-[11px] opacity-50 w-4 flex-shrink-0 text-right">
                              {i + 1}.
                            </span>
                            <span className="text-[12px] font-medium flex-1 truncate">
                              {ing.nameJa}
                            </span>
                            <EvidenceBadge rank={ing.evidenceRank} variant="dot" />
                          </div>
                        ))}
                      </div>

                      <p className="text-[11px] opacity-50 mt-3">
                        全{getIngredientsByConcern(concern.slug).length}成分
                      </p>
                    </Link>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
    </>
  )
}
