import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getConcern, getIngredientsByConcern, concerns } from '@/lib/data'
import { IngredientCard } from '@/components/IngredientCard'
import { EvidenceBadge } from '@/components/EvidenceBadge'
import type { Metadata } from 'next'
import type { EvidenceRank } from '@/lib/types'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return concerns.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = getConcern(slug)
  if (!c) return {}
  return {
    title: `${c.nameJa}に関連するサプリ一覧`,
    description: c.description,
  }
}

export default async function ConcernPage({ params }: Props) {
  const { slug } = await params
  const concern = getConcern(slug)
  if (!concern) notFound()

  const allIngredients = getIngredientsByConcern(slug)
  const ranks: EvidenceRank[] = ['S', 'A', 'B', 'C']

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-[12px] mb-8"
        style={{ color: 'var(--text-tertiary)' }}>
        <Link href="/" className="hover:underline">ホーム</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/concerns" className="hover:underline">悩みから探す</Link>
        <ChevronRight className="w-3 h-3" />
        <span style={{ color: 'var(--text-secondary)' }}>{concern.nameJa}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 style={{ color: 'var(--text-primary)', lineHeight: 1.2 }}
          className="text-[28px] sm:text-[34px] font-bold mb-3">
          {concern.nameJa}
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}
          className="text-[15px] leading-relaxed max-w-xl">
          {concern.description}
        </p>
      </div>

      {/* Stats */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        className="rounded-2xl p-5 mb-10 flex flex-wrap gap-6">
        <div>
          <p style={{ color: 'var(--text-primary)' }} className="text-[24px] font-bold">
            {allIngredients.length}
          </p>
          <p style={{ color: 'var(--text-tertiary)' }} className="text-[12px]">関連成分</p>
        </div>
        {(['S','A','B','C'] as EvidenceRank[]).map((r) => {
          const count = allIngredients.filter((i) => i.evidenceRank === r).length
          if (!count) return null
          return (
            <div key={r}>
              <p className={`ev-${r.toLowerCase()} text-[24px] font-bold w-fit px-1 rounded`}>
                {count}
              </p>
              <p style={{ color: 'var(--text-tertiary)' }} className="text-[12px]">{r}ランク</p>
            </div>
          )
        })}
      </div>

      {/* 注意書き */}
      <div style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
        className="rounded-xl p-4 text-[13px] leading-relaxed mb-10">
        エビデンスランクは研究の種類と質を示すものです。個人への効果を保証するものではありません。
        摂取前には医師・薬剤師にご相談ください。
      </div>

      {/* 成分一覧（ランク別） */}
      <div className="space-y-12">
        {ranks.map((rank) => {
          const items = allIngredients.filter((i) => i.evidenceRank === rank)
          if (!items.length) return null
          return (
            <section key={rank}>
              <div className="flex items-center gap-3 mb-5">
                <EvidenceBadge rank={rank} variant="full" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {items.map((ing) => (
                  <IngredientCard
                    key={ing.slug}
                    ingredient={ing}
                    rank={allIngredients.indexOf(ing) + 1}
                  />
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* 関連悩み */}
      <div style={{ borderTop: '1px solid var(--border)' }} className="mt-14 pt-10">
        <p style={{ color: 'var(--text-secondary)' }}
          className="font-medium text-[14px] mb-4">他の悩みを見る</p>
        <div className="flex flex-wrap gap-2">
          {concerns.filter((c) => c.slug !== slug).slice(0, 9).map((c) => (
            <Link key={c.slug} href={`/concerns/${c.slug}`}
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
              className="text-[13px] px-3 py-1.5 rounded-full hover:border-[var(--accent)]
                hover:text-[var(--accent)] transition-colors">
              {c.nameJa}
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
