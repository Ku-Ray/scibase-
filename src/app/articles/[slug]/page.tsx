import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ChevronRight, Clock, ExternalLink, ArrowRight, BookOpen, FlaskConical
} from 'lucide-react'
import { getArticle, articles } from '@/lib/articles'
import { getIngredient } from '@/lib/data'
import { EvidenceBadge } from '@/components/EvidenceBadge'
import { IngredientCard } from '@/components/IngredientCard'
import type { Metadata } from 'next'

interface Props { params: Promise<{ slug: string }> }

const BASE_URL = 'https://scibase.app'

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `${BASE_URL}/articles/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${BASE_URL}/articles/${slug}`,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
    },
  }
}

const platformLabel: Record<string, string> = {
  iherb:  'iHerb',
  amazon: 'Amazon',
}

const categoryColor: Record<string, string> = {
  'anti-aging': 'bg-amber-50 text-amber-700 border-amber-200',
  skin:         'bg-rose-50 text-rose-700 border-rose-200',
  sleep:        'bg-indigo-50 text-indigo-700 border-indigo-200',
  supplement:   'bg-emerald-50 text-emerald-700 border-emerald-200',
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
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
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/scibase_logo.png` },
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
        <h1 className="text-[24px] sm:text-[30px] font-bold text-foreground
          tracking-tight leading-[1.3] mb-6">
          {article.title}
        </h1>

        {/* 損失回避フック */}
        <div className="bg-secondary border-l-4 border-accent rounded-r-xl px-5 py-4 mb-8">
          <p className="text-[14px] text-foreground leading-relaxed font-medium">
            {article.lossAversionHook}
          </p>
        </div>

        {/* ヒーロー数値（アンカリング） */}
        <div className="border border-border rounded-2xl p-6 mb-10 flex flex-col sm:flex-row
          items-start sm:items-center gap-4">
          <div className="flex-shrink-0">
            <span className="block text-[40px] sm:text-[48px] font-black text-foreground
              tabular-nums leading-none">
              {article.heroStat.value}
            </span>
          </div>
          <div>
            <p className="text-[13px] text-muted-foreground leading-snug">
              {article.heroStat.label}
            </p>
          </div>
        </div>

        {/* ── Problem ── */}
        <section className="mb-10">
          <h2 className="text-[19px] sm:text-[21px] font-bold text-foreground mb-4 leading-snug">
            {article.problemHeading}
          </h2>
          {article.problemBody.split('\n\n').map((para, i) => (
            <p key={i} className="text-[14px] text-foreground leading-[1.85] mb-4 last:mb-0">
              {para}
            </p>
          ))}
        </section>

        <hr className="border-border my-8" />

        {/* ── Science ── */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              論文が示すこと
            </span>
          </div>
          <h2 className="text-[19px] sm:text-[21px] font-bold text-foreground mb-4 leading-snug">
            {article.scienceHeading}
          </h2>
          {article.scienceBody.split('\n\n').map((para, i) => (
            <p key={i} className="text-[14px] text-foreground leading-[1.85] mb-4 last:mb-0">
              {para}
            </p>
          ))}

          {/* Science stat callout */}
          {article.scienceStat && (
            <div className="mt-6 bg-secondary border border-border rounded-xl px-5 py-4
              flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="font-black text-[20px] text-foreground tabular-nums flex-shrink-0">
                {article.scienceStat.value}
              </span>
              <span className="text-[13px] text-muted-foreground leading-snug">
                {article.scienceStat.label}
              </span>
            </div>
          )}
        </section>

        <hr className="border-border my-8" />

        {/* ── Solution ── */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <FlaskConical className="w-4 h-4 text-muted-foreground" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              具体的な対策
            </span>
          </div>
          <h2 className="text-[19px] sm:text-[21px] font-bold text-foreground mb-4 leading-snug">
            {article.solutionHeading}
          </h2>
          {article.solutionBody.split('\n\n').map((para, i) => (
            <p key={i} className="text-[14px] text-foreground leading-[1.85] mb-4 last:mb-0">
              {para}
            </p>
          ))}
        </section>

        {/* ── Ingredient CTAs ── */}
        <section className="mb-12">
          <h2 className="text-[17px] font-bold text-foreground mb-5">
            この記事で取り上げた成分
          </h2>

          <div className="space-y-4">
            {article.ingredients.map((ing) => (
              <div key={ing.slug}
                className="border border-border rounded-2xl overflow-hidden bg-card">

                {/* Ingredient header */}
                <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <EvidenceBadge rank={ing.evidenceRank} />
                      <h3 className="font-bold text-[15px] text-foreground">
                        {ing.nameJa}
                      </h3>
                    </div>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">
                      {ing.reason}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-border px-5 py-3 flex flex-wrap gap-2">
                  <Link
                    href={`/ingredients/${ing.slug}`}
                    className="inline-flex items-center gap-1.5 text-[12px] font-semibold
                      text-accent hover:underline"
                  >
                    エビデンス詳細を見る <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Product CTA */}
                {ing.productUrl && (
                  <div className="border-t border-border bg-secondary px-5 py-4">
                    {/* 緊急性トリガー（損失回避の最終押し） */}
                    {ing.urgencyNote && (
                      <p className="text-[12px] text-muted-foreground leading-relaxed mb-3
                        border-l-2 border-accent/40 pl-3">
                        {ing.urgencyNote}
                      </p>
                    )}
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="min-w-0">
                        <p className="text-[12px] font-semibold text-foreground truncate">
                          {ing.productName}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {ing.productHighlight && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-accent/10 text-accent
                              rounded border border-accent/20 font-medium">
                              {ing.productHighlight}
                            </span>
                          )}
                          {ing.productPriceJpy && (
                            <span className="text-[12px] text-muted-foreground">
                              約¥{ing.productPriceJpy.toLocaleString()}/月
                            </span>
                          )}
                        </div>
                      </div>
                      <a
                        href={ing.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[12px] font-semibold
                          bg-foreground text-background rounded-lg px-4 py-2
                          hover:opacity-80 transition-opacity flex-shrink-0"
                      >
                        {platformLabel[ing.productPlatform ?? 'iherb']}で見る
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mb-12">
          <h2 className="text-[17px] font-bold text-foreground mb-5">よくある質問</h2>
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
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── Analyzer CTA ── */}
        <div className="mb-12 bg-secondary border border-border rounded-2xl p-6">
          <p className="font-semibold text-[15px] text-foreground mb-2">
            この成分、今のサプリでカバーできていますか？
          </p>
          <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">
            7軸診断で、現在のサプリが抗老化・肌・脳・ストレス・睡眠・免疫・代謝をどこまでカバーしているかを確認できます。
            足りていない軸を埋める成分が分かります。
          </p>
          <Link
            href="/analyzer"
            className="inline-flex items-center gap-2 text-[14px] font-semibold
              bg-foreground text-background rounded-xl px-5 py-3
              hover:opacity-85 transition-opacity"
          >
            今のサプリを7軸で診断する
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ── Related Ingredients ── */}
        {relatedIngredients.length > 0 && (
          <section className="mb-10">
            <h2 className="text-[17px] font-bold text-foreground mb-5">関連成分</h2>
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
              <h2 className="text-[17px] font-bold text-foreground">関連コラム</h2>
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
