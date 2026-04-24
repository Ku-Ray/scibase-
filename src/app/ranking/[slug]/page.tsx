import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Trophy, ArrowLeft, FlaskConical, ExternalLink } from 'lucide-react'
import { getConcern, getIngredientsByConcern, concerns } from '@/lib/data'
import { EvidenceBadge } from '@/components/EvidenceBadge'
import { IngredientCard } from '@/components/IngredientCard'
import { OutboundProductLink } from '@/components/OutboundProductLink'
import type { Metadata } from 'next'

interface Props { params: Promise<{ slug: string }> }

const BASE_URL = 'https://scibase.app'

export async function generateStaticParams() {
  return concerns.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = getConcern(slug)
  if (!c) return {}
  return {
    title: `${c.nameJa}サプリおすすめランキング｜論文エビデンスTop10`,
    description: `${c.nameJa}に効くサプリ・成分をエビデンス順にランキング。迷ったらNo.1を選べばOK。メタ解析・RCTで評価した2026年最新版。`,
    alternates: { canonical: `${BASE_URL}/ranking/${slug}` },
  }
}

const rankStyle = (rank: number) => {
  if (rank === 1) return { bg: 'bg-amber-50 border-amber-200',  badge: 'bg-amber-400 text-white',     icon: '🥇' }
  if (rank === 2) return { bg: 'bg-stone-50 border-stone-200',  badge: 'bg-stone-400 text-white',      icon: '🥈' }
  if (rank === 3) return { bg: 'bg-orange-50 border-orange-200',badge: 'bg-orange-700/60 text-white',  icon: '🥉' }
  return           { bg: 'bg-card border-border',               badge: 'bg-secondary text-muted-foreground', icon: '' }
}

export default async function RankingPage({ params }: Props) {
  const { slug } = await params
  const concern = getConcern(slug)
  if (!concern) notFound()

  const ranked = getIngredientsByConcern(slug)
  const topIngredient = ranked[0]
  const topProduct = topIngredient?.products
    .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))[0]

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム',   item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'ランキング', item: `${BASE_URL}/ranking` },
      { '@type': 'ListItem', position: 3, name: `${concern.nameJa}ランキング`, item: `${BASE_URL}/ranking/${slug}` },
    ],
  }

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${concern.nameJa}に効く成分ランキング`,
    numberOfItems: ranked.length,
    itemListElement: ranked.map((ing, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: ing.nameJa,
      url: `${BASE_URL}/ingredients/${ing.slug}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      <div className="max-w-3xl mx-auto px-5 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-4">
          <Link href="/" className="hover:underline">ホーム</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/ranking" className="hover:underline">ランキング</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{concern.nameJa}</span>
        </nav>

        {/* 解説ページへの誘導（検索意図分離） */}
        <Link
          href={`/concerns/${slug}`}
          className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground
            hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-3 h-3" />
          まず{concern.nameJa}の原因・メカニズムを知りたい
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span className="text-[12px] font-semibold text-amber-600 tracking-wider">
              論文エビデンスランキング
            </span>
          </div>
          <h1 className="text-[28px] sm:text-[36px] font-bold text-foreground
            leading-[1.2] tracking-tight mb-3">
            {concern.nameJa}に効く成分<br className="sm:hidden" />ランキング
          </h1>
          <p className="text-[14px] text-muted-foreground leading-relaxed">
            {concern.description}
          </p>
        </div>

        {/* 評価基準の説明 */}
        <div className="bg-secondary border border-border rounded-xl p-4 mb-8
          flex items-start gap-3">
          <FlaskConical className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-[12px] font-semibold text-foreground mb-1">順位の決め方</p>
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              口コミや人気ではなく、<span className="font-medium text-foreground">論文エビデンスの強さ</span>で順位を決定。
              メタ解析・SR（S）＞ RCT（A）＞ コホート研究（B）＞ 動物実験・小規模研究（C）の順に評価。
            </p>
          </div>
        </div>

        {/* No.1成分 推奨商品CTA */}
        {topIngredient && topProduct && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-600">
                このカテゴリのNo.1成分
              </p>
              <span className="text-[10px] font-semibold bg-amber-500 text-white
                rounded-full px-2.5 py-0.5">
                初めてならまずこれ
              </span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <EvidenceBadge rank={topIngredient.evidenceRank} variant="chip" />
                  <span className="text-[12px] text-amber-700 font-medium">
                    エビデンス{topIngredient.evidenceRank}ランク
                  </span>
                </div>
                <h3 className="font-bold text-[20px] text-foreground mb-1">
                  {topIngredient.nameJa}
                </h3>
                <p className="text-[13px] text-muted-foreground mb-3">
                  {topIngredient.tagline}
                </p>
                {topProduct.reasonJa && (
                  <p className="text-[12px] text-amber-800 font-medium">
                    → {topProduct.reasonJa}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-amber-200">
              <Link
                href={`/ingredients/${topIngredient.slug}`}
                className="flex-1 inline-flex items-center justify-center text-[13px] font-medium
                  border border-amber-300 text-amber-800 rounded-xl px-4 py-2.5 min-h-[44px]
                  hover:bg-amber-100 transition-colors"
              >
                エビデンスを確認する
              </Link>
              {topProduct.url && topProduct.url !== '#' && (
                <OutboundProductLink
                  href={topProduct.url}
                  platform={topProduct.platform}
                  ingredientSlug={topIngredient.slug}
                  productRank={topProduct.rank}
                  className="flex-1 text-center inline-flex items-center justify-center gap-1.5
                    text-[13px] font-semibold bg-amber-500 text-white rounded-xl px-4 py-2.5 min-h-[44px]
                    hover:bg-amber-600 transition-colors"
                >
                  購入する
                  <ExternalLink className="w-3.5 h-3.5" />
                </OutboundProductLink>
              )}
            </div>
            {/* 2位・3位への誘発（後悔回避） */}
            {ranked.length >= 2 && (
              <div className="mt-3 pt-3 border-t border-amber-200/60">
                <Link
                  href="#rank-2"
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium
                    text-amber-700 hover:text-amber-900 transition-colors"
                >
                  ↓ 2位・3位の成分も確認してから決める
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Ranking list */}
        <div className="space-y-3 mb-10">
          {ranked.map((ing, i) => {
            const rank = i + 1
            const { bg, badge, icon } = rankStyle(rank)
            return (
              <Link key={ing.slug} href={`/ingredients/${ing.slug}`} id={`rank-${rank}`}
                className="block scroll-mt-20">
                <article className={`border rounded-2xl p-5 hover:shadow-md transition-all duration-200
                  hover:-translate-y-0.5 group ${bg}`}>
                  <div className="flex items-start gap-4">

                    {/* Rank badge */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-1 pt-0.5">
                      <span className={`w-8 h-8 rounded-full text-[13px] font-black
                        flex items-center justify-center ${badge}`}>
                        {rank <= 3 ? icon : rank}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <h2 className="font-semibold text-[16px] text-foreground
                            group-hover:text-accent transition-colors leading-snug">
                            {ing.nameJa}
                          </h2>
                          <p className="text-[11px] text-muted-foreground/60">{ing.nameEn}</p>
                        </div>
                        <EvidenceBadge rank={ing.evidenceRank} variant="chip" />
                      </div>

                      <p className="text-[13px] text-muted-foreground leading-relaxed mb-3">
                        {ing.tagline}
                      </p>

                      {/* Evidence bar */}
                      <div className="mb-3">
                        <div className="h-1.5 bg-white/60 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full
                            ${ing.evidenceRank === 'S' ? 'w-full bg-amber-400'
                            : ing.evidenceRank === 'A' ? 'w-3/4 bg-blue-400'
                            : ing.evidenceRank === 'B' ? 'w-1/2 bg-emerald-400'
                            : 'w-1/4 bg-stone-300'}`}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
                        <span>論文 {ing.papers.length}件</span>
                        {ing.usageType && (
                          <span className="bg-white/60 border border-border/50
                            rounded px-2 py-0.5 text-[11px]">
                            {ing.usageType === 'topical' ? '外用' : ing.usageType === 'oral' ? '経口' : '外用・経口'}
                          </span>
                        )}
                        {ing.dosageMin && (
                          <span>
                            {ing.dosageMin}
                            {ing.dosageMax && ing.dosageMax !== ing.dosageMin ? `–${ing.dosageMax}` : ''}
                            {' '}{ing.dosageUnit.split('/')[0].replace('% 濃度', '%')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>

        {/* 関連ランキング */}
        <div className="border-t border-border pt-8">
          <p className="font-medium text-[14px] text-foreground mb-4">他の悩みのランキング</p>
          <div className="flex flex-wrap gap-2">
            {concerns.filter(c => c.slug !== slug).slice(0, 10).map(c => (
              <Link
                key={c.slug}
                href={`/ranking/${c.slug}`}
                className="inline-flex items-center text-[13px] text-muted-foreground
                  bg-card border border-border rounded-full px-4 py-2 min-h-[44px]
                  hover:border-accent hover:text-accent transition-colors"
              >
                {c.nameJa}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Link href="/ranking"
            className="inline-flex items-center gap-2 text-[13px] text-muted-foreground
              hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            ランキング一覧に戻る
          </Link>
        </div>
      </div>
    </>
  )
}
