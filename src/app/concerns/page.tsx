import Link from 'next/link'
import { concerns } from '@/lib/data'
import type { Concern } from '@/lib/types'
import type { Metadata } from 'next'

const BASE_URL = 'https://scibase.app'

export const metadata: Metadata = {
  title: '悩みから探す — エビデンスで成分を選ぶ',
  description: '悩み別に、論文エビデンスが確認されている成分を科学的に紹介。シミ・乾燥・ニキビ・老化・睡眠など全カテゴリ対応。',
  alternates: { canonical: `${BASE_URL}/concerns` },
}

const categoryLabel: Record<string, string> = {
  skin:           'スキンケア',
  body:           '体・全身',
  cognitive:      '認知・メンタル',
  sleep:          '睡眠',
  gut:            '腸・消化',
  immunity:       '免疫',
  muscle:         '筋肉・運動',
  cardiovascular: '血管・循環',
}

// 複数項目があるカテゴリ（独立セクション化）
const MAIN_CATEGORIES = ['skin', 'body']
// 1項目のみのカテゴリ（「その他」に集約）
const OTHER_CATEGORIES = ['cognitive', 'sleep', 'gut', 'immunity', 'muscle', 'cardiovascular']

const POPULAR_SLUGS = ['wrinkles', 'spots', 'uv-damage', 'sleep', 'longevity', 'cognitive']

function ConcernCard({ c }: { c: Concern }) {
  return (
    <Link
      href={`/concerns/${c.slug}`}
      className={`group border rounded-xl p-5
        hover:-translate-y-0.5 hover:shadow-md transition-all duration-150
        cat-${c.category}`}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[20px] leading-none flex-shrink-0">{c.emoji}</span>
          <h2 className="font-semibold text-[15px] truncate
            group-hover:opacity-80 transition-opacity">
            {c.nameJa}
          </h2>
        </div>
        <span className="text-[11px] px-2 py-0.5 rounded-md flex-shrink-0
          bg-white/50 border border-current/20 opacity-70">
          {c.ingredientSlugs.length}成分
        </span>
      </div>
      <p className="text-[13px] leading-relaxed line-clamp-2 opacity-70 ml-8">
        {c.description}
      </p>
    </Link>
  )
}

export default function ConcernsPage() {
  const mainCategories = MAIN_CATEGORIES.filter(cat =>
    concerns.some(c => c.category === cat)
  )
  const otherConcerns = concerns.filter(c => OTHER_CATEGORIES.includes(c.category))
  const hasOther = otherConcerns.length > 0

  const popular = POPULAR_SLUGS
    .map(slug => concerns.find(c => c.slug === slug))
    .filter((c): c is Concern => Boolean(c))

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム',     item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: '悩みから探す', item: `${BASE_URL}/concerns` },
    ],
  }

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'SciBase 悩みカテゴリ一覧',
    numberOfItems: concerns.length,
    itemListElement: concerns.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.nameJa,
      url: `${BASE_URL}/concerns/${c.slug}`,
    })),
  }

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
    <div className="max-w-4xl mx-auto px-5 py-10">
      <div className="mb-7">
        <h1 className="font-bold text-[28px] sm:text-[34px] text-foreground mb-2 tracking-tight">
          悩みから探す
        </h1>
        <p className="text-[14px] text-muted-foreground">
          悩みを選ぶと、論文で効果が確認されている成分一覧が表示されます。
        </p>
      </div>

      <nav aria-label="カテゴリで絞り込み" className="mb-12 flex flex-wrap gap-2">
        {mainCategories.map((cat) => (
          <a
            key={cat}
            href={`#cat-${cat}`}
            className={`cat-${cat} inline-flex items-center text-[12.5px] font-medium
              px-4 py-2 min-h-[44px] rounded-full border
              hover:-translate-y-0.5 hover:shadow-sm transition-all duration-150`}
          >
            {categoryLabel[cat]}
          </a>
        ))}
        {hasOther && (
          <a
            href="#cat-other"
            className="inline-flex items-center text-[12.5px] font-medium
              px-4 py-2 min-h-[44px] rounded-full border border-border
              bg-muted/30 text-muted-foreground
              hover:-translate-y-0.5 hover:shadow-sm transition-all duration-150"
          >
            その他
          </a>
        )}
      </nav>

      {popular.length > 0 && (
        <section className="mb-14">
          <div className="flex items-baseline justify-between mb-5">
            <p className="text-[12px] font-semibold tracking-[0.05em]
              text-muted-foreground">
              編集部おすすめ
            </p>
            <span className="text-[11px] text-muted-foreground">
              まず見ておきたい悩み
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {popular.map((c) => (
              <ConcernCard key={c.slug} c={c} />
            ))}
          </div>
        </section>
      )}

      <div className="space-y-12">
        <p className="text-[12px] font-semibold tracking-[0.05em]
          text-muted-foreground -mb-6">
          すべての悩み
        </p>
        {mainCategories.map((cat) => {
          const catConcerns = concerns.filter((c) => c.category === cat)
          return (
            <section key={cat} id={`cat-${cat}`} className="scroll-mt-20">
              <p className="text-[12px] font-semibold tracking-[0.05em]
                text-muted-foreground mb-5">
                {categoryLabel[cat]}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {catConcerns.map((c) => (
                  <ConcernCard key={c.slug} c={c} />
                ))}
              </div>
            </section>
          )
        })}

        {hasOther && (
          <section id="cat-other" className="scroll-mt-20">
            <p className="text-[12px] font-semibold tracking-[0.05em]
              text-muted-foreground mb-5">
              その他
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {otherConcerns.map((c) => (
                <ConcernCard key={c.slug} c={c} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
    </>
  )
}
