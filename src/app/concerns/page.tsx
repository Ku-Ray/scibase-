import Link from 'next/link'
import { concerns } from '@/lib/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '悩みから探す | サプリ推薦',
  description: '悩み別に、エビデンスが確認されている成分を論文ベースで紹介。',
}

const categoryLabel: Record<string, string> = {
  skin:      '肌',
  sleep:     '睡眠',
  body:      '体・全身',
  cognitive: '認知・脳',
  gut:       '腸内',
  immunity:  '免疫',
}

export default function ConcernsPage() {
  const categories = [...new Set(concerns.map((c) => c.category))]

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      <div className="mb-10">
        <h1 style={{ color: 'var(--text-primary)' }}
          className="font-bold text-[28px] mb-2">悩みから探す</h1>
        <p style={{ color: 'var(--text-secondary)' }} className="text-[14px]">
          悩みを選ぶと、関連するエビデンスが確認されている成分一覧が表示されます。
        </p>
      </div>

      <div className="space-y-10">
        {categories.map((cat) => {
          const catConcerns = concerns.filter((c) => c.category === cat)
          return (
            <section key={cat}>
              <p style={{ color: 'var(--text-tertiary)', letterSpacing: '0.06em' }}
                className="text-[11px] font-medium uppercase mb-4">
                {categoryLabel[cat]}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {catConcerns.map((c) => (
                  <Link key={c.slug} href={`/concerns/${c.slug}`}
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                    className="group rounded-xl p-5 hover:border-[var(--accent)]
                      hover:shadow-sm transition-all duration-150">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h2 style={{ color: 'var(--text-primary)' }}
                        className="font-semibold text-[15px] group-hover:text-[var(--accent)] transition-colors">
                        {c.nameJa}
                      </h2>
                      <span style={{ color: 'var(--text-tertiary)', background: 'var(--bg-muted)', border: '1px solid var(--border)' }}
                        className="text-[11px] px-2 py-0.5 rounded flex-shrink-0">
                        {c.ingredientSlugs.length}成分
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)' }}
                      className="text-[13px] leading-relaxed line-clamp-2">
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
