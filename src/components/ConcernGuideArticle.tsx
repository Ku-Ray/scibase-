import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, BookOpen, FileText, ArrowRight, AlertTriangle, CheckCircle2, Stethoscope, FlaskConical } from 'lucide-react'
import { getConcern, getIngredient, concerns } from '@/lib/data'
import { getArticle } from '@/lib/articles'
import { getConcernGuide, concernGuides } from '@/lib/concern-guide-data'
import { EvidenceBadge } from '@/components/EvidenceBadge'
import { OutboundProductLink } from '@/components/OutboundProductLink'
import { ClinicCTALink } from '@/components/ClinicCTALink'
import { RichParagraphs } from '@/components/RichText'
import { PageViewTracker } from '@/components/PageViewTracker'
import { ConcernGuideTestKitCTACard } from '@/components/ConcernGuideTestKitCTACard'
import { SUPPLEMENT_GUIDE_SUFFIX } from '@/lib/concern-guide-utils'

const BASE_URL = 'https://scibase.app'

const categoryHero: Record<
  string,
  { bg: string; border: string; text: string; tag: string }
> = {
  skin: { bg: 'bg-rose-50', border: 'border-t-rose-400', text: 'text-rose-700', tag: 'bg-rose-100 text-rose-800' },
  body: { bg: 'bg-orange-50', border: 'border-t-orange-400', text: 'text-orange-700', tag: 'bg-orange-100 text-orange-800' },
  cognitive: { bg: 'bg-blue-50', border: 'border-t-blue-500', text: 'text-blue-700', tag: 'bg-blue-100 text-blue-800' },
  sleep: { bg: 'bg-violet-50', border: 'border-t-violet-500', text: 'text-violet-700', tag: 'bg-violet-100 text-violet-800' },
  gut: { bg: 'bg-teal-50', border: 'border-t-teal-500', text: 'text-teal-700', tag: 'bg-teal-100 text-teal-800' },
  immunity: { bg: 'bg-emerald-50', border: 'border-t-emerald-500', text: 'text-emerald-700', tag: 'bg-emerald-100 text-emerald-800' },
  muscle: { bg: 'bg-amber-50', border: 'border-t-amber-500', text: 'text-amber-700', tag: 'bg-amber-100 text-amber-800' },
  cardiovascular: { bg: 'bg-red-50', border: 'border-t-red-500', text: 'text-red-700', tag: 'bg-red-100 text-red-800' },
}

const platformLabel: Record<string, string> = {
  iherb: 'iHerbで見る',
  amazon: 'Amazonで見る',
  cosme: '@cosmeで見る',
}

const studyTypeLabel: Record<string, string> = {
  'meta-analysis': 'メタ解析',
  rct: 'RCT',
  cohort: 'コホート研究',
  observational: '観察研究',
  review: 'レビュー',
}

interface Props {
  /** concern slug（例: 'wrinkles'）。article URL は `${concernSlug}${SUPPLEMENT_GUIDE_SUFFIX}` */
  concernSlug: string
}

export function ConcernGuideArticle({ concernSlug }: Props) {
  const guide = getConcernGuide(concernSlug)
  const concern = getConcern(concernSlug)
  if (!guide || !concern) notFound()

  const articleUrl = `${BASE_URL}/articles/${concernSlug}${SUPPLEMENT_GUIDE_SUFFIX}`

  const hero = categoryHero[concern.category] ?? categoryHero.skin

  const relatedArticles = guide.relatedArticleSlugs
    .map((s) => getArticle(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))

  const otherGuides = concernGuides
    .filter((g) => g.concernSlug !== concernSlug)
    .map((g) => ({ guide: g, concern: getConcern(g.concernSlug) }))
    .filter((x): x is { guide: typeof concernGuides[number]; concern: NonNullable<ReturnType<typeof getConcern>> } => Boolean(x.concern))

  const otherConcerns = concerns.filter((c) => c.slug !== concernSlug).slice(0, 9)

  /* JSON-LD ── Breadcrumb（コラム配下） */
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'コラム', item: `${BASE_URL}/articles` },
      { '@type': 'ListItem', position: 3, name: guide.title, item: articleUrl },
    ],
  }

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${concern.nameJa}のタイプ別BEST PICK成分`,
    description: `${concern.nameJa}のタイプ別に、論文エビデンスをもとに選定した推奨成分。`,
    numberOfItems: guide.solutionByType.length,
    itemListElement: guide.solutionByType
      .map((s, i) => {
        const ing = getIngredient(s.bestPickSlug)
        if (!ing) return null
        return {
          '@type': 'ListItem',
          position: i + 1,
          name: `${s.typeName} → ${ing.nameJa}`,
          url: `${BASE_URL}/ingredients/${ing.slug}`,
        }
      })
      .filter(Boolean),
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  /* HowTo JSON-LD — タイプ別 BEST PICK 成分を HowToStep として出力（AI Overview 対応） */
  const howToJsonLd = guide.solutionByType.length > 0 ? {
    '@context': 'https://schema.org',
    '@type':    'HowTo',
    name:       `${concern.nameJa}の選び方（タイプ別）`,
    description: guide.summary,
    step: guide.solutionByType
      .map((s, idx) => {
        const ing = getIngredient(s.bestPickSlug)
        if (!ing) return null
        return {
          '@type': 'HowToStep',
          position: idx + 1,
          name:    `${s.typeName}には${ing.nameJa}`,
          text:    s.body.replace(/\s+/g, ' ').slice(0, 250),
          url:     `${BASE_URL}/ingredients/${ing.slug}`,
        }
      })
      .filter(Boolean),
  } : null

  /* 主要論文 citation（タイプ別 mechanismByType.paperRefs を統合） */
  const citationFromGuide = (() => {
    const refs = (guide.mechanismByType ?? [])
      .flatMap((m) => m.paperRefs ?? [])
    const unique = Array.from(
      new Map(refs.map((p) => [p.title, p] as const)).values()
    ).slice(0, 8)
    return unique
  })()

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.summary,
    image:    `${BASE_URL}/articles/${concernSlug}${SUPPLEMENT_GUIDE_SUFFIX}/opengraph-image`,
    url:      articleUrl,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    author: {
      '@type': 'Person',
      '@id': `${BASE_URL}/about#author`,
      name: 'SciBase 編集者',
      url: `${BASE_URL}/about#author`,
      jobTitle: '化粧品メーカー現役研究者',
      sameAs: ['https://x.com/r_evidence_'],
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'SciBase',
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo/symbol-dark-512.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    ...(citationFromGuide.length > 0 && {
      citation: citationFromGuide.map((p) => ({
        '@type': 'ScholarlyArticle',
        name: p.title,
        datePublished: String(p.year),
        isPartOf: { '@type': 'Periodical', name: p.journal },
      })),
    }),
  }

  return (
    <>
      <PageViewTracker
        eventName="view_concern_guide"
        params={{ concern_slug: concernSlug, concern_category: concern.category }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {howToJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      )}

      {/* ── [1] Hero ───────────────────────────── */}
      <div className={`${hero.bg} border-t-4 ${hero.border}`}>
        <div className="max-w-3xl mx-auto px-5 pt-8 pb-10">
          <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-6 flex-wrap">
            <Link href="/" className="hover:underline">ホーム</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/articles" className="hover:underline">コラム</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{concern.nameJa}</span>
          </nav>

          <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.08em] rounded-full px-2.5 py-1 mb-4 ${hero.tag}`}>
            <FileText className="w-3 h-3" />
            化粧品メーカー現役の論文ガイド
          </span>

          <h1 className="text-[26px] sm:text-[34px] font-bold text-foreground leading-[1.25] tracking-tight min-w-0 [overflow-wrap:anywhere]">
            {guide.title}
          </h1>

          <p className="mt-3 text-[14px] sm:text-[15px] text-foreground/75 leading-[1.85] max-w-xl">
            {guide.summary}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-5 text-[12px] text-muted-foreground">
            <span>公開：<time dateTime={guide.publishedAt}>{guide.publishedAt}</time></span>
            <span className="w-px h-3 bg-border" />
            <span>更新：<time dateTime={guide.updatedAt}>{guide.updatedAt}</time></span>
          </div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-5 py-10">
        {/* ── [2] 著者の前置き ── */}
        <section className="mb-12">
          <RichParagraphs
            body={guide.introNote}
            className="text-[14px] sm:text-[15px] text-foreground/85 leading-[1.95] mb-4 last:mb-0"
          />
        </section>

        {/* ── [3] 結論先出し ── */}
        <section className="mb-14">
          <div className="bg-foreground/[0.04] border-l-4 border-foreground/60 rounded-r-xl p-5">
            <p className="text-[11px] font-semibold tracking-[0.1em] text-muted-foreground mb-2 uppercase">
              この記事の結論
            </p>
            <ul className="text-[14px] sm:text-[15px] text-foreground leading-[1.95] font-medium space-y-1.5 list-disc pl-5 marker:text-foreground/40">
              {guide.bottomLine
                .split('。')
                .map((s) => s.trim())
                .filter((s) => s.length > 0)
                .map((s, i) => (
                  <li key={i}>{s}。</li>
                ))}
            </ul>
          </div>

          {guide.priceAnchor && (
            <div className="mt-3 bg-emerald-50/70 border-l-4 border-emerald-500 rounded-r-xl px-5 py-3">
              <p className="text-[11px] font-semibold tracking-[0.1em] text-emerald-700 mb-1.5 uppercase">
                価格の目安
              </p>
              <ul className="text-[13px] sm:text-[14px] text-foreground/85 leading-[1.85] space-y-1 list-disc pl-5 marker:text-emerald-600/70">
                {guide.priceAnchor
                  .split(/[・／。]/)
                  .map((s) => s.trim())
                  .filter((s) => s.length > 0)
                  .map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
              </ul>
            </div>
          )}
        </section>

        {/* ── [4] 3タイプメカニズム ── */}
        <section className="mb-14">
          <h2 className="text-[22px] sm:text-[26px] font-bold text-foreground leading-snug mb-2">
            {concern.nameJa}の3タイプを論文で整理する
          </h2>
          <p className="text-[14px] text-foreground/70 leading-[1.85] mb-6">
            まず自分の{concern.nameJa}がどのタイプかを見極めることから始める。タイプによって機序が違うため、効く成分も変わる。
          </p>

          <div className="space-y-8">
            {guide.mechanismByType.map((m, idx) => (
              <div key={m.typeName} className="border border-border rounded-2xl p-5 sm:p-6 bg-card">
                <p className="text-[11px] font-semibold tracking-[0.1em] text-muted-foreground mb-1 uppercase">
                  TYPE {idx + 1}
                </p>
                <h3 className="text-[18px] sm:text-[20px] font-bold text-foreground leading-snug mb-1">
                  {m.typeName}
                </h3>
                <p className="text-[13px] text-foreground/70 leading-relaxed mb-4">
                  {m.subtitle}
                </p>

                <div className="bg-secondary/50 rounded-xl p-4 mb-4">
                  <p className="text-[11px] font-semibold tracking-[0.05em] text-muted-foreground mb-2 uppercase">
                    こういう特徴があれば{m.typeName}タイプ
                  </p>
                  <ul className="space-y-1.5">
                    {m.signs.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-[13px] text-foreground/85 leading-relaxed">
                        <span className="flex-shrink-0 text-foreground/50 mt-0.5">・</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <RichParagraphs
                  body={m.body}
                  className="text-[14px] text-foreground/85 leading-[1.95] mb-3 last:mb-0"
                />

                {m.paperRefs.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-[11px] font-semibold tracking-[0.05em] text-muted-foreground mb-2 uppercase">
                      引用
                    </p>
                    <ul className="space-y-2">
                      {m.paperRefs.map((p, i) => (
                        <li key={i} className="text-[12px] text-foreground/70 leading-relaxed">
                          <span className="font-semibold text-foreground/85">{p.journal} {p.year}</span>
                          <span className="mx-1.5 text-muted-foreground">·</span>
                          <span className="text-muted-foreground">{studyTypeLabel[p.studyType]}</span>
                          {p.sampleSize && (
                            <>
                              <span className="mx-1.5 text-muted-foreground">·</span>
                              <span className="text-muted-foreground">n={p.sampleSize}</span>
                            </>
                          )}
                          <p className="mt-1 text-foreground/80">{p.keyFinding}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── [5] タイプ別の解決策 ── */}
        <section className="mb-14">
          <h2 className="text-[22px] sm:text-[26px] font-bold text-foreground leading-snug mb-2">
            タイプ別・論文で効果が確認された成分
          </h2>
          <p className="text-[14px] text-foreground/70 leading-[1.85] mb-8">
            タイプを見極めたら、それぞれの機序に合った成分を選ぶ。研究で効果が確認された組み合わせを順番に解説する。
          </p>

          <div className="space-y-12">
            {guide.solutionByType.map((s, idx) => {
              const bestPick = getIngredient(s.bestPickSlug)
              if (!bestPick) return null
              const secondaries = (s.secondarySlugs ?? [])
                .map((slug) => getIngredient(slug))
                .filter((ing): ing is NonNullable<typeof ing> => Boolean(ing))
              const milestone = guide.milestonesByType?.find((m) => m.typeName === s.typeName)
              const testKit = guide.testKitCTAByType?.find((t) => t.typeName === s.typeName)
              const clinic = guide.clinicCTAByType?.find((c) => c.typeName === s.typeName)
              return (
                <div key={s.typeName} id={`solution-type-${idx}`} className="scroll-mt-20">
                  <p className="text-[11px] font-semibold tracking-[0.1em] text-muted-foreground mb-1 uppercase">
                    TYPE {idx + 1} の解決策
                  </p>
                  <h3 className="text-[20px] sm:text-[22px] font-bold text-foreground leading-snug mb-3">
                    {s.typeName}に効く成分
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    <span className="text-[10px] font-semibold bg-foreground text-background rounded px-2 py-0.5 tracking-[0.08em]">
                      BEST
                    </span>
                    <Link
                      href={`/ingredients/${bestPick.slug}`}
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-foreground bg-secondary hover:bg-secondary/70 border border-border rounded-full px-3 py-1.5 min-h-[36px] transition-colors"
                    >
                      <EvidenceBadge rank={bestPick.evidenceRank} variant="dot" />
                      {bestPick.nameJa}
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                    {secondaries.map((ing) => (
                      <Link
                        key={ing.slug}
                        href={`/ingredients/${ing.slug}`}
                        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-foreground/85 bg-secondary/50 hover:bg-secondary/70 border border-border rounded-full px-3 py-1.5 min-h-[36px] transition-colors"
                      >
                        <span className="text-[10px] text-muted-foreground">＋</span>
                        <EvidenceBadge rank={ing.evidenceRank} variant="dot" />
                        {ing.nameJa}
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>

                  <div className="mb-6">
                    <RichParagraphs
                      body={s.body}
                      className="text-[14px] sm:text-[15px] text-foreground/85 leading-[1.95] mb-4 last:mb-0"
                    />
                  </div>

                  {s.productBlocks.length > 0 && (
                    <div className="space-y-3" id={`bestpick-type-${idx}`}>
                      {s.productBlocks.map((pb, pbIdx) => {
                        const ing = getIngredient(pb.ingredientSlug)
                        if (!ing) return null
                        const product =
                          ing.products[pb.productIndex ?? 0] ??
                          ing.products.find((p) => p.rank === 1) ??
                          ing.products[0]
                        if (!product) return null
                        return (
                          <div key={pbIdx} className="border-2 border-border rounded-2xl overflow-hidden bg-background">
                            <div className="p-5">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-semibold bg-amber-500 text-white rounded px-2 py-0.5 tracking-[0.08em]">PR</span>
                                {pb.badge && (
                                  <span className="text-[11px] font-semibold text-muted-foreground bg-secondary border border-border rounded px-2 py-0.5">
                                    {pb.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[12px] text-muted-foreground mb-1">
                                {ing.nameJa} ／ {product.brand}
                              </p>
                              <p className="text-[15px] sm:text-[16px] font-semibold text-foreground leading-snug mb-3">
                                {product.name}
                              </p>
                              <p className="text-[13px] text-foreground/80 leading-[1.9] mb-4">
                                {pb.whyJa}
                              </p>
                              <div className="flex flex-wrap items-center gap-3 text-[12px] text-muted-foreground mb-4">
                                <span>
                                  価格：<strong className="text-foreground tabular-nums">¥{product.priceJpy.toLocaleString()}</strong>
                                </span>
                                {product.monthlyCostJpy && (
                                  <>
                                    <span className="w-px h-3 bg-border" />
                                    <span>
                                      月コスト：<strong className="text-foreground tabular-nums">¥{product.monthlyCostJpy.toLocaleString()}</strong>
                                    </span>
                                  </>
                                )}
                              </div>
                              <div className="flex flex-col sm:flex-row gap-2">
                                <Link
                                  href={`/ingredients/${ing.slug}`}
                                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-[13px] font-semibold text-foreground bg-white border border-border rounded-lg px-4 py-2.5 min-h-[44px] hover:border-foreground/40 hover:shadow-sm transition-all"
                                >
                                  論文エビデンスを読む
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </Link>
                                <OutboundProductLink
                                  href={product.url}
                                  platform={product.platform}
                                  ingredientSlug={ing.slug}
                                  productRank={product.rank}
                                  aspProgram={product.aspProgram}
                                  aspId={product.aspId}
                                  commissionRateBand={product.commissionRateBand}
                                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-[13px] font-semibold text-background bg-foreground rounded-lg px-4 py-2.5 min-h-[44px] hover:opacity-90 transition-opacity"
                                >
                                  {platformLabel[product.platform]}
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </OutboundProductLink>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {milestone && milestone.milestones.length > 0 && (
                    <div className="mt-6 border border-border rounded-2xl p-5 bg-secondary/30">
                      <p className="text-[11px] font-semibold tracking-[0.1em] text-muted-foreground mb-4 uppercase">
                        {s.typeName}・継続のマイルストーン
                      </p>
                      <ol className="relative border-l-2 border-foreground/15 ml-2 space-y-4">
                        {milestone.milestones.map((mile, mi) => (
                          <li key={mi} className="pl-5 relative">
                            <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-foreground/70 border-2 border-background" />
                            <p className="text-[13px] font-semibold text-foreground tabular-nums">{mile.period}</p>
                            <p className="text-[13px] text-foreground/80 leading-relaxed mt-0.5">{mile.sign}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {testKit && testKit.products.length > 0 && (
                    <ConcernGuideTestKitCTACard cta={testKit} concernSlug={concernSlug} />
                  )}

                  {clinic && clinic.products.length > 0 && (
                    <div className="mt-6 border-2 border-rose-300 bg-rose-50/40 rounded-2xl p-5">
                      <div className="flex items-start gap-2 mb-3">
                        <Stethoscope className="w-4 h-4 text-rose-700 flex-shrink-0 mt-1" />
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold tracking-[0.08em] text-rose-700 mb-1 uppercase">
                            医療ルート（補助）
                          </p>
                          <h4 className="text-[15px] sm:text-[16px] font-semibold text-foreground leading-snug">
                            {clinic.headline}
                          </h4>
                        </div>
                      </div>
                      <p className="text-[13px] text-foreground/85 leading-[1.9] mb-4">
                        {clinic.body}
                      </p>
                      <div className="space-y-3">
                        {clinic.products.map((p, pi) => (
                          <div key={pi} className="bg-background border border-border rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <span className="text-[10px] font-semibold bg-amber-500 text-white rounded px-2 py-0.5 tracking-[0.08em]">PR</span>
                              {p.badge && (
                                <span className="text-[11px] font-semibold text-rose-700 bg-rose-100 border border-rose-200 rounded px-2 py-0.5">
                                  {p.badge}
                                </span>
                              )}
                            </div>
                            {p.brand && (
                              <p className="text-[12px] text-muted-foreground mb-1">{p.brand}</p>
                            )}
                            <p className="text-[15px] font-semibold text-foreground leading-snug mb-2">
                              {p.name}
                            </p>
                            <p className="text-[13px] text-foreground/80 leading-[1.9] mb-3">
                              {p.whyJa}
                            </p>
                            {p.priceJpy != null && (
                              <p className="text-[12px] text-muted-foreground mb-3">
                                目安：<strong className="text-foreground tabular-nums">¥{p.priceJpy.toLocaleString()}</strong>
                              </p>
                            )}
                            <ClinicCTALink
                              href={p.url}
                              ctaId={`${concernSlug}__${s.typeName}__${pi}`}
                              clinicName={p.name}
                              concernSlug={concernSlug}
                              typeName={s.typeName}
                              className="inline-flex items-center justify-center gap-1.5 text-[13px] font-semibold text-background bg-rose-700 rounded-lg px-4 py-2.5 min-h-[44px] hover:opacity-90 transition-opacity w-full sm:w-auto"
                            >
                              公式サイトを見る
                              <ChevronRight className="w-3.5 h-3.5" />
                            </ClinicCTALink>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* ── [6] 失敗パターン ── */}
        <section className="mb-14">
          <h2 className="text-[22px] sm:text-[26px] font-bold text-foreground leading-snug mb-2">
            化粧品メーカーで見てきた失敗パターン
          </h2>
          <p className="text-[14px] text-foreground/70 leading-[1.85] mb-6">
            成分選びが正しくても、運用で外すと効果は出ない。実際に相談を受けてきた中で多い失敗を5つ挙げる。
          </p>
          <ul className="space-y-3">
            {guide.failurePatterns.map((f, i) => (
              <li key={i} className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 sm:p-5">
                <div className="flex items-start gap-3 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <h3 className="text-[14px] sm:text-[15px] font-semibold text-foreground leading-snug">{f.title}</h3>
                </div>
                <p className="text-[13px] text-foreground/85 leading-[1.9] pl-7">{f.body}</p>
              </li>
            ))}
          </ul>

          {guide.successProfile && guide.successProfile.length > 0 && (
            <div className="mt-6 bg-emerald-50/60 border-2 border-emerald-200 rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <h3 className="text-[14px] sm:text-[15px] font-semibold text-emerald-900 leading-snug">
                  逆に、うまくいく人の共通パターン
                </h3>
              </div>
              <ul className="space-y-2 pl-1">
                {guide.successProfile.map((sp, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] text-foreground/85 leading-[1.9]">
                    <span className="flex-shrink-0 text-emerald-600 font-semibold mt-0.5">✓</span>
                    <span>{sp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* ── [7] セルフチェック ── */}
        <section className="mb-14">
          <h2 className="text-[22px] sm:text-[26px] font-bold text-foreground leading-snug mb-2">
            あなたが最初に試すべき成分
          </h2>
          <p className="text-[14px] text-foreground/75 leading-[1.85] mb-6">{guide.selfCheck.intro}</p>
          <ul className="space-y-3">
            {guide.selfCheck.questions.map((q, i) => {
              const solutionIdx = guide.solutionByType.findIndex((s) => s.typeName === q.typeAnswer)
              return (
                <li key={i} className="border border-border rounded-2xl p-4 sm:p-5 bg-background">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-foreground text-background text-[12px] font-semibold tabular-nums">
                      {i + 1}
                    </span>
                    <p className="text-[14px] sm:text-[15px] font-semibold text-foreground leading-snug">{q.q}</p>
                  </div>
                  <div className="pl-10">
                    <p className="text-[12px] text-muted-foreground mb-2">
                      → これは「<span className="text-foreground font-semibold">{q.typeAnswer}</span>」タイプ。研究で支持があるBEST PICKは：
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      {q.recommendIngredientSlugs.map((s, idx) => {
                        const ing = getIngredient(s)
                        if (!ing) return null
                        const isBest = idx === 0
                        return (
                          <div key={s} className="flex items-center gap-2">
                            {idx > 0 && (
                              <span className="text-[13px] font-semibold text-muted-foreground">＋</span>
                            )}
                            <Link
                              href={`/ingredients/${s}`}
                              className={`inline-flex items-center gap-1.5 text-[12px] font-semibold rounded-full px-3 py-1.5 min-h-[36px] transition-colors ${
                                isBest
                                  ? 'text-background bg-foreground hover:bg-foreground/85'
                                  : 'text-foreground bg-secondary hover:bg-secondary/70 border border-border'
                              }`}
                            >
                              {isBest && (
                                <span className="text-[9px] font-semibold tracking-[0.08em] bg-amber-400 text-amber-950 rounded px-1 py-0.5 leading-none">
                                  BEST
                                </span>
                              )}
                              <EvidenceBadge rank={ing.evidenceRank} variant="dot" />
                              {ing.nameJa}
                              <ChevronRight className="w-3 h-3" />
                            </Link>
                          </div>
                        )
                      })}
                    </div>
                    {solutionIdx >= 0 && (
                      <a
                        href={`#solution-type-${solutionIdx}`}
                        className="inline-flex items-center gap-1 text-[12px] font-semibold text-accent hover:underline mt-3"
                      >
                        この記事の{q.typeAnswer}・解決策セクションへ
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        <p className="text-[12px] text-muted-foreground bg-secondary rounded-xl p-4 mb-12 leading-relaxed">
          論文で示された効果はあくまで研究条件下のもので、個人の効果を保証するものではありません。経口摂取は持病・服用中の薬がある場合は医師・薬剤師に相談を。商品リンクはアフィリエイト（PR）を含みます。
        </p>

        {/* ── [8] FAQ ── */}
        <section className="mb-14">
          <h2 className="text-[22px] sm:text-[26px] font-bold text-foreground leading-snug mb-6">
            よくある質問
          </h2>
          <div className="space-y-2">
            {guide.faqs.map((f, i) => (
              <details key={i} className="group border border-border rounded-xl px-5 py-4 bg-background hover:bg-muted/20 transition-colors" open={i === 0}>
                <summary className="cursor-pointer list-none flex items-start justify-between gap-3 font-semibold text-[14px] text-foreground min-h-[44px] items-center">
                  <span className="flex-1">{f.q}</span>
                  <span className="text-muted-foreground text-[12px] flex-shrink-0 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-[13px] text-foreground/75 leading-[1.95]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── [9] 締め・行動ステップ ── */}
        <section className="mb-14">
          <RichParagraphs
            body={guide.closingSummary}
            className="text-[14px] sm:text-[15px] text-foreground/85 leading-[1.95] mb-4 last:mb-0"
          />
        </section>

        {/* ── [10] 関連リンク ── */}
        <section className="mt-14 pt-10 border-t border-border">
          <div className="mb-10">
            <p className="text-[11px] font-semibold tracking-[0.1em] text-muted-foreground mb-3 uppercase">
              この悩みのトップへ
            </p>
            <Link
              href={`/concerns/${concernSlug}`}
              className="group flex items-center justify-between gap-3 bg-card border border-border rounded-xl px-5 py-4 hover:border-accent/40 hover:bg-muted/30 transition-colors"
            >
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-foreground group-hover:text-accent transition-colors">
                  {concern.emoji} {concern.nameJa}に効く成分一覧を見る
                </p>
                <p className="text-[12px] text-muted-foreground mt-0.5 line-clamp-1">
                  全関連成分をエビデンスランク順で表示
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </Link>
          </div>

          {relatedArticles.length > 0 && (
            <div className="mb-10">
              <h2 className="font-semibold text-[16px] text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-accent" />
                関連する論文ガイド記事
              </h2>
              <div className="space-y-2">
                {relatedArticles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/articles/${a.slug}`}
                    className="group block rounded-xl border border-border bg-background px-5 py-4 hover:border-accent/40 hover:bg-muted/30 transition-colors"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-1.5">
                      {a.categoryLabel}
                    </p>
                    <h3 className="font-semibold text-[14px] text-foreground group-hover:text-accent leading-snug mb-1.5 transition-colors">
                      {a.title}
                    </h3>
                    <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-2">
                      {a.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {otherGuides.length > 0 && (
            <div className="mb-10">
              <h2 className="font-semibold text-[16px] text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-rose-600" />
                他の悩み別ガイド
              </h2>
              <div className="space-y-2">
                {otherGuides.map(({ guide: g, concern: c }) => (
                  <Link
                    key={g.concernSlug}
                    href={`/articles/${g.concernSlug}${SUPPLEMENT_GUIDE_SUFFIX}`}
                    className="group flex items-start gap-3 rounded-xl border-2 border-rose-200 bg-rose-50/30 px-5 py-4 hover:bg-rose-50/60 transition-colors"
                  >
                    <span className="text-[20px] leading-none flex-shrink-0 mt-0.5">{c.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-rose-700 mb-1">
                        論文ガイド · {c.nameJa}
                      </p>
                      <h3 className="font-semibold text-[14px] text-foreground group-hover:text-foreground/85 leading-snug">
                        {g.title}
                      </h3>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="font-medium text-[14px] text-foreground mb-3">他の悩みを見る</p>
            <div className="flex flex-wrap gap-2">
              {otherConcerns.map((c) => (
                <Link
                  key={c.slug}
                  href={`/concerns/${c.slug}`}
                  className={`inline-flex items-center gap-1.5 text-[13px] border rounded-full px-4 py-2 min-h-[44px] hover:border-foreground/40 hover:bg-muted/30 transition-all cat-${c.category}`}
                >
                  <span>{c.emoji}</span>
                  {c.nameJa}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Author Box（E-E-A-T author signature） ── */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="bg-secondary rounded-2xl p-6 border border-border flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-border flex items-center justify-center flex-shrink-0">
                <FlaskConical className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-foreground mb-1">執筆：SciBase 編集者</p>
                <p className="text-[12px] text-muted-foreground mb-2">化粧品メーカー現役研究者</p>
                <p className="text-[12px] text-muted-foreground leading-relaxed mb-2">
                  査読済み論文のみを参照し、メタ解析・RCT を中心に成分エビデンスを評価しています。
                  業界倫理上、勤務先社名は開示していません。
                </p>
                <Link href="/about#author" className="text-[12px] text-accent hover:underline">
                  編集方針・著者プロフィール →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
