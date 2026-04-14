import Link from 'next/link'
import { concerns } from '@/lib/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '悩みから探す | Agescience — エビデンスで成分を選ぶ',
  description: '悩み別に、論文エビデンスが確認されている成分を科学的に紹介。シミ・乾燥・ニキビ・老化・睡眠など全カテゴリ対応。',
}

const categoryLabel: Record<string, string> = {
  skin:      'スキンケア',
  sleep:     '睡眠',
  body:      '体・全身',
  cognitive: '認知・メンタル',
  gut:       '腸・消化',
  immunity:  '免疫',
}

const CATEGORY_ORDER = ['skin', 'body', 'cognitive', 'sleep', 'gut', 'immunity']

export default function ConcernsPage() {
  const orderedCategories = CATEGORY_ORDER.filter(cat =>
    concerns.some(c => c.category === cat)
  )

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      <div className="mb-10">
        <h1 className="font-bold text-[28px] sm:text-[34px] text-foreground mb-2 tracking-tight">
          悩みから探す
        </h1>
        <p className="text-[14px] text-muted-foreground">
          悩みを選ぶと、論文で効果が確認されている成分一覧が表示されます。
        </p>
      </div>

      <div className="space-y-12">
        {orderedCategories.map((cat) => {
          const catConcerns = concerns.filter((c) => c.category === cat)
          return (
            <section key={cat}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em]
                text-muted-foreground mb-5">
                {categoryLabel[cat]}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {catConcerns.map((c) => (
                  <Link key={c.slug} href={`/concerns/${c.slug}`}
                    className={`group border rounded-xl p-5
                      hover:-translate-y-0.5 hover:shadow-md transition-all duration-150
                      cat-${c.category}`}>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[20px] leading-none flex-shrink-0">
                          {c.emoji}
                        </span>
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
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
