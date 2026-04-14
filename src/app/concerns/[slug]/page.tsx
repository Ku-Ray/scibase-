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

const BASE_URL = 'https://agescience.jp'

export default async function ConcernPage({ params }: Props) {
  const { slug } = await params
  const concern = getConcern(slug)
  if (!concern) notFound()

  const all = getIngredientsByConcern(slug)
  const ranks: EvidenceRank[] = ['S', 'A', 'B', 'C']

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム',     item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: '悩みから探す', item: `${BASE_URL}/concerns` },
      { '@type': 'ListItem', position: 3, name: concern.nameJa, item: `${BASE_URL}/concerns/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    <div className="max-w-4xl mx-auto px-5 py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-8">
        <Link href="/" className="hover:underline">ホーム</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/concerns" className="hover:underline">悩みから探す</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">{concern.nameJa}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[36px] leading-none">{concern.emoji}</span>
          <h1 className="text-[30px] sm:text-[38px] font-bold text-foreground
            leading-[1.2] tracking-tight">
            {concern.nameJa}
          </h1>
        </div>
        <p className="text-[15px] text-muted-foreground leading-relaxed max-w-xl">
          {concern.description}
        </p>
      </div>

      {/* Stats */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-8
        flex flex-wrap gap-8">
        <div>
          <p className="text-[26px] font-bold text-foreground">{all.length}</p>
          <p className="text-[12px] text-muted-foreground">関連成分</p>
        </div>
        {ranks.map((r) => {
          const n = all.filter((i) => i.evidenceRank === r).length
          if (!n) return null
          return (
            <div key={r}>
              <p className={`ev-${r.toLowerCase()} text-[26px] font-bold w-fit
                px-2 rounded-lg border`}>{n}</p>
              <p className="text-[12px] text-muted-foreground mt-0.5">{r}ランク</p>
            </div>
          )
        })}
      </div>

      {/* Disclaimer */}
      <p className="text-[13px] text-muted-foreground bg-secondary rounded-xl p-4 mb-10">
        エビデンスランクは研究の種類と質を示すものです。個人への効果を保証するものではありません。
        摂取前には医師・薬剤師にご相談ください。
      </p>

      {/* 成分一覧 */}
      <div className="space-y-12">
        {ranks.map((rank) => {
          const items = all.filter((i) => i.evidenceRank === rank)
          if (!items.length) return null
          return (
            <section key={rank}>
              <div className="mb-5">
                <EvidenceBadge rank={rank} variant="chip" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((ing) => (
                  <IngredientCard
                    key={ing.slug}
                    ingredient={ing}
                    rank={all.indexOf(ing) + 1}
                  />
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* 関連悩み */}
      <div className="mt-14 pt-10 border-t border-border">
        <p className="font-medium text-[14px] text-foreground mb-4">他の悩みを見る</p>
        <div className="flex flex-wrap gap-2">
          {concerns.filter((c) => c.slug !== slug).slice(0, 9).map((c) => (
            <Link
              key={c.slug}
              href={`/concerns/${c.slug}`}
              className={`inline-flex items-center gap-1.5 text-[13px] border
                rounded-full px-3 py-1.5 hover:scale-105 transition-all duration-150
                cat-${c.category}`}
            >
              <span>{c.emoji}</span>
              {c.nameJa}
            </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}
