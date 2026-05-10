import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ChevronRight, Clock, ArrowRight, BookOpen, FlaskConical, Crown
} from 'lucide-react'
import { getArticle, articles } from '@/lib/articles'
import { getIngredient } from '@/lib/data'
import { getConcernGuide } from '@/lib/concern-guide-data'
import {
  matchSupplementGuideSlug,
  getAllSupplementGuideArticleSlugs,
} from '@/lib/concern-guide-utils'
import { EvidenceBadge } from '@/components/EvidenceBadge'
import { IngredientCard } from '@/components/IngredientCard'
import { AddToAnalyzerButton } from '@/components/AddToAnalyzerButton'
import { AddArticleToAnalyzerButton } from '@/components/AddArticleToAnalyzerButton'
import { ProductOfferCard } from '@/components/product/ProductOfferCard'
import { ConcernGuideArticle } from '@/components/ConcernGuideArticle'
import { computeAxisLeaders } from '@/lib/productScore'
import { RichParagraphs, RichInline } from '@/components/RichText'
import type { Metadata } from 'next'

interface Props { params: Promise<{ slug: string }> }

const BASE_URL = 'https://scibase.app'

export async function generateStaticParams() {
  return [
    ...articles.map((a) => ({ slug: a.slug })),
    ...getAllSupplementGuideArticleSlugs().map((slug) => ({ slug })),
  ]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  /* 悩み解決ガイドの metadata 分岐 */
  const guideMatch = matchSupplementGuideSlug(slug)
  if (guideMatch) {
    const guide = getConcernGuide(guideMatch.concernSlug)
    if (!guide) return {}
    const url = `${BASE_URL}/articles/${slug}`
    const metaTitle = guide.seoTitle ?? guide.title
    const metaDescription =
      guide.metaDescription ?? guide.summary + '。' + guide.bottomLine.slice(0, 80)
    const ogDescription = guide.metaDescription ?? guide.summary
    return {
      title: metaTitle,
      description: metaDescription,
      alternates: { canonical: url },
      openGraph: {
        title: metaTitle,
        description: ogDescription,
        url,
        type: 'article',
        publishedTime: guide.publishedAt,
        modifiedTime: guide.updatedAt,
      },
    }
  }

  const article = getArticle(slug)
  if (!article) return {}
  const metaTitle = article.seoTitle ?? article.title
  const metaDescription = article.seoDescription ?? article.description
  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: `${BASE_URL}/articles/${slug}` },
    openGraph: {
      title: metaTitle,
      description: article.description,
      url: `${BASE_URL}/articles/${slug}`,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
    },
  }
}

const categoryColor: Record<string, string> = {
  'anti-aging': 'bg-amber-50 text-amber-700 border-amber-200',
  skin:         'bg-rose-50 text-rose-700 border-rose-200',
  sleep:        'bg-indigo-50 text-indigo-700 border-indigo-200',
  supplement:   'bg-emerald-50 text-emerald-700 border-emerald-200',
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params

  /* 悩み解決ガイドは別コンポーネントで描画 */
  const guideMatch = matchSupplementGuideSlug(slug)
  if (guideMatch) {
    return <ConcernGuideArticle concernSlug={guideMatch.concernSlug} />
  }

  const article = getArticle(slug)
  if (!article) notFound()

  const relatedIngredients = article.relatedIngredientSlugs
    .map((s) => getIngredient(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getIngredient>>[]

  const relatedArticles = (article.relatedArticleSlugs ?? [])
    .map((s) => getArticle(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getArticle>>[]

  /* citation: CTA成分の代表論文を集約（重複除去・優先度順） */
  const studyPriority: Record<string, number> = {
    'meta-analysis': 0, rct: 1, cohort: 2, observational: 3, animal: 4,
  }
  const citationPapers = Array.from(
    new Map(
      article.ingredients
        .map((c) => getIngredient(c.slug))
        .filter(Boolean)
        .flatMap((ing) => ing!.papers)
        .sort((a, b) => (studyPriority[a.studyType] ?? 9) - (studyPriority[b.studyType] ?? 9))
        .map((p) => [p.title, p] as const)
    ).values()
  ).slice(0, 8)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: `${BASE_URL}/articles/${slug}/opengraph-image`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: {
      '@type': 'Person',
      name: 'SciBase 編集者',
      url: `${BASE_URL}/about`,
      jobTitle: '化粧品メーカー研究職',
      sameAs: ['https://x.com/r_evidence_'],
    },
    publisher: {
      '@type': 'Organization',
      name: 'SciBase',
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo/symbol-dark-512.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/articles/${slug}` },
    timeRequired: `PT${article.readingMinutes}M`,
    url: `${BASE_URL}/articles/${slug}`,
    ...(citationPapers.length > 0 && {
      citation: citationPapers.map((p) => ({
        '@type': 'ScholarlyArticle',
        name: p.title,
        datePublished: String(p.year),
        isPartOf: { '@type': 'Periodical', name: p.journal },
      })),
    }),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'コラム', item: `${BASE_URL}/articles` },
      { '@type': 'ListItem', position: 3, name: article.title, item: `${BASE_URL}/articles/${slug}` },
    ],
  }

  const faqJsonLd = article.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null

  /* ItemList JSON-LD（Pillar記事の「まず始めるべき○成分」リッチリザルト用） */
  const itemListJsonLd = article.itemList ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: article.itemList.name,
    itemListElement: article.itemList.items
      .map((it) => {
        const ing = getIngredient(it.ingredientSlug)
        if (!ing) return null
        return {
          '@type': 'ListItem',
          position: it.rank,
          url: `${BASE_URL}/ingredients/${ing.slug}`,
          name: ing.nameJa,
        }
      })
      .filter(Boolean),
  } : null

  /* 目次（TOC）の動的生成：問題・科学・サブセクション・付録・解決策・FAQ */
  const tocItems: { id: string; label: string }[] = [
    { id: 'problem', label: article.problemHeading },
    { id: 'science', label: article.scienceHeading },
    ...(article.subsections ?? []).map((s, i) => ({
      id: `subsection-${i}`,
      label: `　${s.heading}`,
    })),
    ...(article.appendixSections ?? [])
      .map((s, i) => ({ s, i }))
      .filter(({ s }) => s.position !== 'after-solution')
      .map(({ s, i }) => ({ id: `appendix-${i}`, label: s.heading })),
    { id: 'solution', label: article.solutionHeading },
    ...(article.appendixSections ?? [])
      .map((s, i) => ({ s, i }))
      .filter(({ s }) => s.position === 'after-solution')
      .map(({ s, i }) => ({ id: `appendix-${i}`, label: s.heading })),
    { id: 'ingredients', label: 'この記事で取り上げた成分' },
    { id: 'faq', label: 'よくある質問' },
  ]
  /* 目次は段組がある記事（subsections or appendixSections）にのみ表示 */
  const showToc = (article.subsections?.length ?? 0) + (article.appendixSections?.length ?? 0) > 0

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}

      <div className="max-w-2xl mx-auto px-5 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-8 flex-wrap">
          <Link href="/" className="hover:underline">ホーム</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/articles" className="hover:underline">コラム</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground line-clamp-1 max-w-[200px]">{article.title}</span>
        </nav>

        {/* Category + Meta */}
        <div className="flex items-center gap-2.5 mb-4">
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border
            ${categoryColor[article.category] ?? 'bg-secondary text-muted-foreground border-border'}`}>
            {article.categoryLabel}
          </span>
          <span className="flex items-center gap-1 text-[12px] text-muted-foreground">
            <Clock className="w-3 h-3" />
            {article.readingMinutes}分
          </span>
          <time dateTime={article.publishedAt} className="text-[12px] text-muted-foreground">
            {article.publishedAt}
          </time>
        </div>

        {/* Title */}
        <h1 className="text-[24px] sm:text-[30px] font-semibold text-foreground
          tracking-tight leading-[1.3] mb-6">
          {article.title}
        </h1>

        {/* 損失回避フック */}
        <div className="bg-secondary border-l-4 border-accent rounded-r-xl px-5 py-4 mb-8">
          <p className="text-[14px] text-foreground leading-relaxed font-medium">
            <RichInline text={article.lossAversionHook} />
          </p>
        </div>

        {/* ヒーロー数値（アンカリング） */}
        <div className="border border-border rounded-2xl p-5 sm:p-6 mb-10 flex flex-col sm:flex-row
          items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex-shrink-0 max-w-full">
            <span className="block text-[32px] sm:text-[44px] font-bold text-foreground
              tabular-nums leading-[1.05] break-keep [overflow-wrap:anywhere]">
              {article.heroStat.value}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-[13px] text-muted-foreground leading-snug">
              {article.heroStat.label}
            </p>
          </div>
        </div>

        {/* ── 目次（TOC・Pillar記事用） ── */}
        {showToc && (
          <nav aria-label="目次" className="border border-border rounded-2xl p-5 mb-10 bg-secondary/40">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground mb-3">
              目次
            </p>
            <ol className="space-y-1.5 text-[13px]">
              {tocItems.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="text-foreground hover:text-accent hover:underline">
                    {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* ── Problem ── */}
        <section id="problem" className="mb-10 scroll-mt-20">
          <h2 className="text-[19px] sm:text-[21px] font-semibold text-foreground mb-4 leading-snug">
            {article.problemHeading}
          </h2>
          <RichParagraphs body={article.problemBody} />
        </section>

        <hr className="border-border my-8" />

        {/* ── Science ── */}
        <section id="science" className="mb-10 scroll-mt-20">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              論文が示すこと
            </span>
          </div>
          <h2 className="text-[19px] sm:text-[21px] font-semibold text-foreground mb-4 leading-snug">
            {article.scienceHeading}
          </h2>
          <RichParagraphs body={article.scienceBody} />

          {/* Science stat callout */}
          {article.scienceStat && (
            <div className="mt-6 bg-secondary border border-border rounded-xl px-5 py-4
              flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="font-bold text-[20px] text-foreground tabular-nums flex-shrink-0">
                {article.scienceStat.value}
              </span>
              <span className="text-[13px] text-muted-foreground leading-snug">
                {article.scienceStat.label}
              </span>
            </div>
          )}

          {/* ── Subsections（Pillar記事用 H3群） ── */}
          {article.subsections && article.subsections.length > 0 && (
            <div className="mt-10 space-y-9">
              {article.subsections.map((sub, i) => (
                <div key={i} id={`subsection-${i}`} className="scroll-mt-20">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="flex-shrink-0 inline-flex items-center justify-center
                      w-7 h-7 rounded-full bg-accent text-background text-[12px] font-bold tabular-nums">
                      {i + 1}
                    </span>
                    <h3 className="text-[17px] sm:text-[18px] font-semibold text-foreground leading-snug">
                      {sub.heading}
                    </h3>
                  </div>
                  <div className="pl-10">
                    <RichParagraphs body={sub.body} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <hr className="border-border my-8" />

        {(() => {
          const allAppendix = article.appendixSections ?? []
          const beforeSolution = allAppendix
            .map((ap, i) => ({ ap, i }))
            .filter(({ ap }) => ap.position !== 'after-solution')
          const afterSolution = allAppendix
            .map((ap, i) => ({ ap, i }))
            .filter(({ ap }) => ap.position === 'after-solution')

          /* appendix body 内の [[PRODUCT:slug]] を ProductOfferCard で置換しながらレンダリング。
             商品カードを「論文ベースで選ぶならこれ」の説明の流れの中に埋め込むことで、
             ingredients フッターは「成分まとめ + エビデンス詳細リンク」だけのシンプル化を実現。 */
          const renderAppendixBody = (body: string) => {
            const parts = body.split(/(\[\[PRODUCT:[a-z0-9-]+\]\])/g)
            return parts.map((part, idx) => {
              const m = part.match(/^\[\[PRODUCT:([a-z0-9-]+)\]\]$/)
              if (m) {
                const slug = m[1]
                const ing = article.ingredients.find(a => a.slug === slug)
                const ingData = getIngredient(slug)
                if (!ingData || !ing) return null
                const sortedProducts = [...ingData.products]
                  .filter(p => p.platform !== 'cosme')
                  .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))
                let bestProduct = sortedProducts[0]
                if (ing.productUrl && ing.productUrl !== bestProduct?.url) {
                  const overrideMatch = ingData.products.find(p => p.url === ing.productUrl)
                  if (overrideMatch) bestProduct = overrideMatch
                }
                if (!bestProduct) return null
                const axisLeaders = computeAxisLeaders(ingData)
                return (
                  <div key={idx} className="my-6 border border-border rounded-2xl overflow-hidden bg-card">
                    {ing.urgencyNote && (
                      <div className="bg-secondary px-5 pt-4 pb-2">
                        <p className="text-[12px] text-muted-foreground leading-relaxed border-l-2 border-accent/40 pl-3">
                          <RichInline text={ing.urgencyNote} />
                        </p>
                      </div>
                    )}
                    <ProductOfferCard
                      product={bestProduct}
                      ingredient={ingData}
                      variant="article-compact"
                      axisLeaders={axisLeaders}
                      bestPickReason={ing.bestPickReason ?? '6軸スコアで当サイト掲載商品中・総合最上位'}
                    />
                  </div>
                )
              }
              return part ? <RichParagraphs key={idx} body={part} /> : null
            })
          }

          const renderAppendixGroup = (group: typeof beforeSolution) =>
            group.map(({ ap, i }) => (
              <section key={i} id={`appendix-${i}`} className="mb-10 scroll-mt-20">
                <h2 className="text-[19px] sm:text-[21px] font-semibold text-foreground mb-4 leading-snug">
                  {ap.heading}
                </h2>

                {/* Top 3 カード（最初のappendixかつitemListが存在する場合・before-solution限定） */}
                {i === 0 && article.itemList && ap.position !== 'after-solution' && (
                  <div className="mb-6 grid gap-3">
                    {article.itemList.items
                      .slice()
                      .sort((a, b) => a.rank - b.rank)
                      .map((it) => {
                        const ing = getIngredient(it.ingredientSlug)
                        if (!ing) return null
                        const isTop = it.rank === 1
                        return (
                          <Link
                            key={it.ingredientSlug}
                            href={`/ingredients/${ing.slug}`}
                            className={`group flex items-start gap-4 rounded-2xl p-4 sm:p-5 transition-all
                              ${isTop
                                ? 'bg-accent/[0.07] border-2 border-accent/60 shadow-sm'
                                : 'bg-card border border-border hover:border-accent/40'}`}
                          >
                            <div className="flex-shrink-0 flex flex-col items-center gap-1">
                              {isTop ? (
                                <Crown className="w-5 h-5 text-accent" strokeWidth={2.5} />
                              ) : (
                                <div className="h-5" />
                              )}
                              <span className={`inline-flex items-center justify-center
                                w-9 h-9 rounded-full text-[14px] font-bold tabular-nums
                                ${isTop
                                  ? 'bg-accent text-background'
                                  : 'bg-secondary text-foreground border border-border'}`}>
                                {it.rank}
                              </span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                {isTop && (
                                  <span className="text-[10px] font-bold uppercase tracking-wider
                                    bg-accent text-background px-2 py-0.5 rounded">
                                    最推奨
                                  </span>
                                )}
                                <EvidenceBadge rank={ing.evidenceRank} variant="dot" />
                                <h3 className="text-[15px] sm:text-[16px] font-semibold text-foreground">
                                  {ing.nameJa}
                                </h3>
                              </div>
                              <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2">
                                {ing.tagline}
                              </p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0
                              mt-2 group-hover:text-accent transition-colors" />
                          </Link>
                        )
                      })}
                  </div>
                )}

                {renderAppendixBody(ap.body)}
              </section>
            ))

          return (
            <>
              {/* ── Appendix Sections（before-solution・science直後） ── */}
              {beforeSolution.length > 0 && (
                <>
                  {renderAppendixGroup(beforeSolution)}
                  <hr className="border-border my-8" />
                </>
              )}

              {/* ── Solution ── */}
              <section id="solution" className="mb-10 scroll-mt-20">
                <div className="flex items-center gap-2 mb-4">
                  <FlaskConical className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    具体的な対策
                  </span>
                </div>
                <h2 className="text-[19px] sm:text-[21px] font-semibold text-foreground mb-4 leading-snug">
                  {article.solutionHeading}
                </h2>
                <RichParagraphs body={article.solutionBody} />
              </section>

              {/* ── Appendix Sections（after-solution・solution直後・B路線意思決定誘導） ── */}
              {afterSolution.length > 0 && (
                <>
                  <hr className="border-border my-8" />
                  {renderAppendixGroup(afterSolution)}
                </>
              )}
            </>
          )
        })()}

        {/* ── Ingredient CTAs ── */}
        <section id="ingredients" className="mb-12 scroll-mt-20">
          <h2 className="text-[17px] font-semibold text-foreground mb-5">
            この記事で取り上げた成分
          </h2>

          {(() => {
            /* appendix body 内に [[PRODUCT:slug]] が配置されている成分は、商品カードが
               appendix 内の説明の流れに埋め込まれるため、フッターでは商品カードを抑制
               （ユーザー指摘 2026-05-06：「ingredients フッターはエビデンス詳細リンクだけでOK・
               商品リンクは『論文ベースで選ぶならこれ』の流れに入れる」）。 */
            const appendixBodyText = (article.appendixSections ?? []).map(s => s.body).join('\n')
            const productInAppendixSlugs = new Set(
              article.ingredients
                .map(i => i.slug)
                .filter(slug => appendixBodyText.includes(`[[PRODUCT:${slug}]]`))
            )

            return (
              <div className="space-y-4">
                {article.ingredients.map((ing) => {
                  const productInAppendix = productInAppendixSlugs.has(ing.slug)
                  return (
                    <div key={ing.slug}
                      className="border border-border rounded-2xl overflow-hidden bg-card">

                      {/* Ingredient header */}
                      <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <EvidenceBadge rank={ing.evidenceRank} variant="dot" />
                            <h3 className="font-semibold text-[15px] text-foreground">
                              {ing.nameJa}
                            </h3>
                          </div>
                          <p className="text-[13px] text-muted-foreground leading-relaxed">
                            {ing.reason}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="border-t border-border px-5 py-3 flex flex-wrap items-center gap-3">
                        <Link
                          href={`/ingredients/${ing.slug}`}
                          className="inline-flex items-center gap-1.5 text-[12px] font-semibold
                            text-accent hover:underline"
                        >
                          {ing.nameJa}のエビデンス詳細 <ArrowRight className="w-3 h-3" />
                        </Link>
                        <AddToAnalyzerButton slug={ing.slug} variant="compact" />
                      </div>

                      {/* Product CTA — appendix 内に [[PRODUCT:]] がある成分は抑制（商品カードはappendix内の流れに統合済み） */}
                      {!productInAppendix && (() => {
                        const ingData = getIngredient(ing.slug)
                        if (!ingData) return null
                        const sortedProducts = [...ingData.products]
                          .filter(p => p.platform !== 'cosme')
                          .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))
                        let bestProduct = sortedProducts[0]
                        if (ing.productUrl && ing.productUrl !== bestProduct?.url) {
                          const overrideMatch = ingData.products.find(p => p.url === ing.productUrl)
                          if (overrideMatch) bestProduct = overrideMatch
                        }
                        if (!bestProduct) return null
                        const axisLeaders = computeAxisLeaders(ingData)
                        return (
                          <>
                            {ing.urgencyNote && (
                              <div className="border-t border-border bg-secondary px-5 pt-4 pb-2">
                                <p className="text-[12px] text-muted-foreground leading-relaxed border-l-2 border-accent/40 pl-3">
                                  <RichInline text={ing.urgencyNote} />
                                </p>
                              </div>
                            )}
                            <ProductOfferCard
                              product={bestProduct}
                              ingredient={ingData}
                              variant="article-compact"
                              axisLeaders={axisLeaders}
                              bestPickReason={ing.bestPickReason ?? '6軸スコアで当サイト掲載商品中・総合最上位'}
                            />
                          </>
                        )
                      })()}
                    </div>
                  )
                })}
              </div>
            )
          })()}
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="mb-12 scroll-mt-20">
          <h2 className="text-[17px] font-semibold text-foreground mb-5">よくある質問</h2>
          <div className="space-y-3">
            {article.faqs.map((faq, i) => (
              <details
                key={i}
                {...(i === 0 ? { open: true } : {})}
                className="group border border-border rounded-xl overflow-hidden"
              >
                <summary className="cursor-pointer flex items-start justify-between gap-3
                  px-5 py-4 hover:bg-secondary transition-colors select-none">
                  <span className="font-semibold text-[14px] text-foreground leading-snug">
                    {faq.question}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5
                    group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-5 pb-4 pt-2 border-t border-border bg-secondary/50">
                  <p className="text-[13px] text-foreground leading-[1.8]">
                    <RichInline text={faq.answer} />
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── Analyzer CTA（記事の成分を一括診断） ── */}
        {article.ingredients.length > 0 && (
          <div className="mb-12 bg-secondary border border-border rounded-2xl p-6">
            <p className="font-semibold text-[15px] text-foreground mb-2">
              この記事の成分、あなたに足りているか診断しますか？
            </p>
            <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">
              この記事で取り上げた{article.ingredients.length}成分を診断に一括追加します。
              抗老化・肌・脳・ストレス・睡眠・免疫・代謝の7軸で、どの軸をこの記事の成分が埋めるかが分かります。
            </p>
            <AddArticleToAnalyzerButton
              slugs={article.ingredients.map((i) => i.slug)}
            />
          </div>
        )}

        {/* ── Related Ingredients ── */}
        {relatedIngredients.length > 0 && (
          <section className="mb-10">
            <h2 className="text-[17px] font-semibold text-foreground mb-5">関連成分</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedIngredients.map((ing) => (
                <IngredientCard key={ing.slug} ingredient={ing} />
              ))}
            </div>
          </section>
        )}

        {/* ── Related Articles ── */}
        {relatedArticles.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-5">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-[17px] font-semibold text-foreground">関連コラム</h2>
            </div>
            <div className="space-y-3">
              {relatedArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/articles/${a.slug}`}
                  className="group flex items-start gap-4 border border-border rounded-xl p-4
                    hover:border-accent/50 hover:bg-secondary/50 transition-all duration-150"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border
                        ${categoryColor[a.category] ?? 'bg-secondary text-muted-foreground border-border'}`}>
                        {a.categoryLabel}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {a.readingMinutes}分
                      </span>
                    </div>
                    <p className="font-semibold text-[14px] text-foreground leading-snug
                      group-hover:text-accent transition-colors">
                      {a.title}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5
                    group-hover:text-accent transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Navigation ── */}
        <div className="pt-8 border-t border-border flex flex-wrap items-center
          justify-between gap-4 text-[13px]">
          <Link href="/articles" className="text-accent hover:underline flex items-center gap-1">
            ← コラム一覧
          </Link>
          <div className="flex flex-wrap gap-4">
            <Link href="/ingredients" className="text-muted-foreground hover:underline">成分一覧</Link>
            <Link href="/concerns"    className="text-muted-foreground hover:underline">悩みから探す</Link>
            <Link href="/ranking"     className="text-muted-foreground hover:underline">ランキング</Link>
          </div>
        </div>
      </div>
    </>
  )
}
