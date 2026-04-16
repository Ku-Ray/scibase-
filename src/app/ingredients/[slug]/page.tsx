import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, ExternalLink, ArrowLeft, Trophy, BarChart2 } from 'lucide-react'
import { getIngredient, getIngredientsByConcern, ingredients, concerns } from '@/lib/data'
import { EvidenceBadge, EvidenceBar } from '@/components/EvidenceBadge'
import { IngredientCard } from '@/components/IngredientCard'
import { TableOfContents } from '@/components/TableOfContents'
import { AddToAnalyzerButton } from '@/components/AddToAnalyzerButton'
import type { TocSection } from '@/components/TableOfContents'
import type { Metadata } from 'next'
import type { EvidenceRank } from '@/lib/types'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return ingredients.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const ing = getIngredient(slug)
  if (!ing) return {}
  return {
    title: `${ing.nameJa} 効果・副作用・濃度【論文エビデンス${ing.evidenceRank}ランク】`,
    description: `エビデンスランク${ing.evidenceRank}。${ing.papers.length}件の論文をもとに${ing.nameJa}の効果・副作用・有効量を解説。${ing.tagline}`,
    alternates: { canonical: `${BASE_URL}/ingredients/${slug}` },
  }
}

const studyLabel: Record<string, string> = {
  'meta-analysis': 'メタ解析・SR',
  rct:             'RCT',
  cohort:          'コホート研究',
  observational:   '観察研究',
  animal:          '動物実験',
}

const platformLabel: Record<string, string> = {
  iherb:   'iHerb',
  amazon:  'Amazon',
  rakuten: '楽天',
  cosme:   '@cosme',
}

const usageLabel: Record<string, string> = {
  topical: '外用',
  oral:    '経口',
  both:    '外用・経口',
}

/* Hero: light bg + accent border-top per rank */
const heroBg: Record<EvidenceRank, string> = {
  S: 'bg-amber-50',
  A: 'bg-blue-50',
  B: 'bg-emerald-50',
  C: 'bg-stone-100',
}
const heroBorder: Record<EvidenceRank, string> = {
  S: 'border-t-amber-500',
  A: 'border-t-blue-500',
  B: 'border-t-emerald-500',
  C: 'border-t-stone-400',
}
const heroText: Record<EvidenceRank, string> = {
  S: 'text-amber-700',
  A: 'text-blue-700',
  B: 'text-emerald-700',
  C: 'text-stone-600',
}
const heroBarBg: Record<EvidenceRank, string> = {
  S: 'bg-amber-500',
  A: 'bg-blue-500',
  B: 'bg-emerald-500',
  C: 'bg-stone-400',
}

/* Rank description for hero */
const rankDesc: Record<EvidenceRank, string> = {
  S: 'メタ解析・SR で確認',
  A: 'RCT（比較試験）で確認',
  B: 'コホート研究で関連',
  C: 'ヒトデータ不十分',
}

const BASE_URL = 'https://scibase.app'

export default async function IngredientPage({ params }: Props) {
  const { slug } = await params
  const ing = getIngredient(slug)
  if (!ing) notFound()

  const relatedConcerns = concerns.filter((c) => ing.concerns.includes(c.slug))

  const siblingIngredients = [
    ...new Map(
      ing.concerns
        .flatMap(cs => getIngredientsByConcern(cs))
        .filter(i => i.slug !== slug)
        .map(i => [i.slug, i])
    ).values()
  ].slice(0, 6)

  const articleJsonLd = {
    '@context':        'https://schema.org',
    '@type':           'Article',
    headline:          `${ing.nameJa}の効果・副作用・論文エビデンス`,
    description:       ing.tagline,
    url:               `${BASE_URL}/ingredients/${slug}`,
    datePublished:     ing.updatedAt,
    dateModified:      ing.updatedAt,
    author:            { '@type': 'Organization', name: 'SciBase' },
    publisher:         { '@type': 'Organization', name: 'SciBase', url: BASE_URL },
    mainEntityOfPage:  { '@type': 'WebPage', '@id': `${BASE_URL}/ingredients/${slug}` },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム',   item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: '成分一覧', item: `${BASE_URL}/ingredients` },
      { '@type': 'ListItem', position: 3, name: ing.nameJa, item: `${BASE_URL}/ingredients/${slug}` },
    ],
  }

  /* Auto-generate FAQ from structured data */
  const faqItems = [
    ing.dosageMin ? {
      q: `${ing.nameJa}の有効量（推奨濃度）はどのくらいですか？`,
      a: `論文で有効性が確認されている量は${ing.dosageMin}${ing.dosageMax && ing.dosageMax !== ing.dosageMin ? `〜${ing.dosageMax}` : ''} ${ing.dosageUnit}です。${ing.timing ?? ''}`,
    } : null,
    ing.duration ? {
      q: `${ing.nameJa}はどのくらいの期間で効果が出ますか？`,
      a: ing.duration,
    } : null,
    ing.sideEffects?.length ? {
      q: `${ing.nameJa}の副作用はありますか？`,
      a: `報告されている副作用として、${ing.sideEffects.join('、')}などがあります。${ing.contraindications?.length ? `特に${ing.contraindications.join('、')}の方はご注意ください。` : ''}`,
    } : null,
  ].filter(Boolean) as { q: string; a: string }[]

  const faqJsonLd = faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({
      '@type':         'Question',
      name:            q,
      acceptedAnswer:  { '@type': 'Answer', text: a },
    })),
  } : null

  /* Build ToC sections */
  const tocSections: TocSection[] = [
    { id: 'description', label: 'この成分について' },
    ...(ing.whoFor?.length ? [{ id: 'who-for', label: 'こんな人に' }] : []),
    { id: 'papers', label: '主要研究' },
    { id: 'evidence', label: 'エビデンスの読み方' },
    ...((ing.dosageMin || ing.timing || ing.duration) ? [{ id: 'dosage', label: '摂取・使用ガイド' }] : []),
    ...(faqItems.length > 0 ? [{ id: 'faq', label: 'よくある疑問' }] : []),
    ...((ing.sideEffects?.length || ing.contraindications?.length) ? [{ id: 'safety', label: '副作用・注意' }] : []),
    ...((ing.dosageMin || ing.timing || ing.duration) ? [{ id: 'start', label: '始め方' }] : []),
    ...(ing.products.length > 0 ? [{ id: 'products', label: 'おすすめ商品' }] : []),
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      {/* ── Hero (light tinted block) ─────────────────── */}
      <div className={`${heroBg[ing.evidenceRank]} border-t-8 ${heroBorder[ing.evidenceRank]}`}>
        <div className="max-w-2xl mx-auto px-5 pt-8 pb-10">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-8">
            <Link href="/" className="hover:underline">ホーム</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/ingredients" className="hover:underline">成分一覧</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{ing.nameJa}</span>
          </nav>

          {/* Rank badge + usage + concerns */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className={`inline-flex items-center gap-1.5 ${heroText[ing.evidenceRank]}
              bg-white/70 border border-current/20 rounded-lg px-3 py-1.5 text-[13px] font-semibold`}>
              <EvidenceBadge rank={ing.evidenceRank} variant="dot" />
              {rankDesc[ing.evidenceRank]}
            </span>
            {ing.usageType && (
              <span className="bg-white/60 border border-border rounded-full
                px-3 py-1 text-[12px] font-medium text-muted-foreground">
                {usageLabel[ing.usageType]}
              </span>
            )}
            {relatedConcerns.slice(0, 2).map(c => (
              <Link key={c.slug} href={`/concerns/${c.slug}`}
                className={`cat-${c.category} border rounded-full px-3 py-1
                  text-[12px] hover:opacity-80 transition-opacity`}>
                {c.emoji} {c.nameJa}
              </Link>
            ))}
          </div>

          {/* Name */}
          <h1 className="text-[34px] sm:text-[44px] font-black leading-[1.15]
            tracking-tight text-foreground mb-1.5">
            {ing.nameJa}
          </h1>
          <p className="text-[13px] text-muted-foreground mb-5 tracking-wide">
            {ing.nameEn}
          </p>

          {/* Tagline */}
          <p className="text-[15px] text-foreground/80 leading-[1.85] max-w-lg mb-7">
            {ing.tagline}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-4 text-[13px] text-muted-foreground">
            <span>
              <strong className="text-foreground font-semibold tabular-nums">{ing.papers.length}</strong> 件の論文
            </span>
            <span className="w-px h-3 bg-border" />
            <span>最終更新: {ing.updatedAt}</span>
            {ing.dosageMin && (
              <>
                <span className="w-px h-3 bg-border" />
                <span>
                  有効量:&nbsp;
                  <strong className="text-foreground font-semibold tabular-nums">
                    {ing.dosageMin}
                    {ing.dosageMax && ing.dosageMax !== ing.dosageMin ? `–${ing.dosageMax}` : ''}
                    {ing.dosageUnit.includes('濃度') ? '%' : ing.dosageUnit.split('/')[0]}
                  </strong>
                </span>
              </>
            )}
          </div>

          {/* Hero stat（キー数値があれば大きく表示） */}
          {ing.heroStat && (
            <div className={`inline-block mt-6 rounded-2xl px-6 py-4 border-2
              shadow-sm
              ${{ S: 'bg-amber-100/60 border-amber-300 shadow-amber-100',
                   A: 'bg-blue-100/60 border-blue-300 shadow-blue-100',
                   B: 'bg-emerald-100/60 border-emerald-300 shadow-emerald-100',
                   C: 'bg-stone-100/60 border-stone-300 shadow-stone-100' }[ing.evidenceRank]}`}>
              <p className={`text-[48px] font-black tabular-nums leading-none ${heroText[ing.evidenceRank]}`}>
                {ing.heroStat.value}
              </p>
              <p className={`text-[12px] font-medium mt-1.5 ${heroText[ing.evidenceRank]} opacity-70`}>
                {ing.heroStat.label}
              </p>
            </div>
          )}

          {/* Quick CTA — 診断に追加 */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <AddToAnalyzerButton slug={ing.slug} />
            <Link
              href="/analyzer"
              className="text-[12px] text-muted-foreground hover:text-foreground transition-colors"
            >
              診断結果を見る →
            </Link>
          </div>
        </div>

        {/* Evidence bar at bottom of hero */}
        <div className="h-1 bg-black/5">
          <div className={`h-full ${heroBarBg[ing.evidenceRank]} opacity-50
            ${{ S: 'w-full', A: 'w-3/4', B: 'w-1/2', C: 'w-1/4' }[ing.evidenceRank]}`} />
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-5 py-10">
        <div className="flex gap-12 items-start">
        {/* Main content */}
        <div className="flex-1 min-w-0">

        {/* PR表記 */}
        <p className="text-[12px] text-muted-foreground bg-secondary rounded-lg px-3 py-2 mb-10">
          本ページにはアフィリエイトリンクが含まれます。
          掲載内容は論文エビデンスに基づき独立して評価しています。
        </p>

        {/* Description */}
        <section id="description" className="mb-10 scroll-mt-20">
          <h2 className="font-semibold text-[18px] text-foreground mb-4">この成分について</h2>
          <p className="text-[15px] text-muted-foreground leading-[1.85]">{ing.description}</p>
        </section>

        {/* こんな人に特に関係する */}
        {ing.whoFor && ing.whoFor.length > 0 && (
          <section id="who-for" className="mb-10 scroll-mt-20">
            <h2 className="font-semibold text-[18px] text-foreground mb-4">
              こんな人に特に関係する
            </h2>
            <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
              {ing.whoFor.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center
                    justify-center text-[10px] font-bold mt-0.5
                    ${{ S: 'bg-amber-100 text-amber-700',
                         A: 'bg-blue-100 text-blue-700',
                         B: 'bg-emerald-100 text-emerald-700',
                         C: 'bg-stone-100 text-stone-600' }[ing.evidenceRank]}`}>
                    ✓
                  </span>
                  <p className="text-[14px] text-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Papers */}
        <section id="papers" className="mb-10 scroll-mt-20">
          <h2 className="font-semibold text-[18px] text-foreground mb-4">主要研究</h2>
          <div className="space-y-3">
            {ing.papers.map((p, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-[11px] font-medium bg-secondary text-muted-foreground
                    border border-border rounded-md px-2 py-0.5">
                    {studyLabel[p.studyType] ?? p.studyType}
                  </span>
                  {[p.journal, `${p.year}年`,
                    p.sampleSize ? `n=${p.sampleSize.toLocaleString()}` : null,
                    p.durationWeeks ? `${p.durationWeeks}週間` : null,
                  ].filter(Boolean).map((v, j) => (
                    <span key={j} className="text-[11px] text-muted-foreground">{v}</span>
                  ))}
                </div>
                <p className="text-[14px] text-foreground font-medium leading-relaxed mb-2">
                  {p.keyFinding}
                </p>
                <details className="group">
                  <summary className="text-[11px] text-muted-foreground/50 cursor-pointer
                    hover:text-muted-foreground transition-colors list-none flex items-center gap-1">
                    <span className="group-open:hidden">▶ 論文タイトル（英語）</span>
                    <span className="hidden group-open:block">▼ 論文タイトル（英語）</span>
                  </summary>
                  <p className="text-[11px] text-muted-foreground/50 mt-1.5 leading-snug italic pl-3">
                    {p.title}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </section>

        {/* Evidence rank detail */}
        <section id="evidence" className="mb-10 scroll-mt-20">
          <h2 className="font-semibold text-[18px] text-foreground mb-4">
            このエビデンスをどう読むか
          </h2>
          <EvidenceBadge rank={ing.evidenceRank} variant="detail" />
        </section>

        {/* Dosage */}
        <section id="dosage" className="mb-10 scroll-mt-20">
          <h2 className="font-semibold text-[18px] text-foreground mb-4">
            {ing.usageType === 'topical' ? '使用ガイド（論文ベース）' : '摂取ガイド（論文ベース）'}
          </h2>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {[
              ing.dosageMin ? {
                label: ing.dosageUnit.includes('濃度') ? '推奨濃度' : '有効量',
                val: `${ing.dosageMin}${ing.dosageMax && ing.dosageMax !== ing.dosageMin ? `–${ing.dosageMax}` : ''} ${ing.dosageUnit}`,
              } : null,
              ing.timing   ? { label: 'タイミング', val: ing.timing }   : null,
              ing.duration ? { label: '継続期間',   val: ing.duration } : null,
            ].filter(Boolean).map((row, i, arr) => (
              <div key={i}
                className={`flex gap-5 px-5 py-4 ${i < arr.length - 1 ? 'border-b border-border' : ''}`}>
                <span className="text-[13px] font-medium text-muted-foreground w-20 flex-shrink-0 pt-0.5">
                  {row!.label}
                </span>
                <span className="text-[14px] text-foreground leading-relaxed">{row!.val}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        {faqItems.length > 0 && (
          <section id="faq" className="mb-10 scroll-mt-20">
            <h2 className="font-semibold text-[18px] text-foreground mb-4">よくある疑問</h2>
            <div className="space-y-3">
              {faqItems.map(({ q, a }, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-5">
                  <p className="font-semibold text-[14px] text-foreground mb-2">Q. {q}</p>
                  <p className="text-[14px] text-muted-foreground leading-relaxed">A. {a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Side effects */}
        {(ing.sideEffects?.length || ing.contraindications?.length) && (
          <section id="safety" className="mb-10 scroll-mt-20">
            <h2 className="font-semibold text-[18px] text-foreground mb-4">副作用・注意事項</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-4">
              {ing.sideEffects?.length ? (
                <div>
                  <p className="text-[12px] font-semibold text-amber-800 mb-2">副作用の可能性</p>
                  <ul className="space-y-1.5">
                    {ing.sideEffects.map((s, i) => (
                      <li key={i} className="text-[13px] text-amber-900 flex gap-2">
                        <span className="text-amber-500 flex-shrink-0">·</span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {ing.contraindications?.length ? (
                <div>
                  <p className="text-[12px] font-semibold text-amber-800 mb-2">注意が必要な方</p>
                  <ul className="space-y-1.5">
                    {ing.contraindications.map((c, i) => (
                      <li key={i} className="text-[13px] text-amber-900 flex gap-2">
                        <span className="text-red-400 flex-shrink-0">·</span>{c}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </section>
        )}

        {/* この成分の始め方 */}
        {(ing.dosageMin || ing.timing || ing.duration) && (
          <section id="start" className="mb-10 scroll-mt-20">
            <h2 className="font-semibold text-[18px] text-foreground mb-4">
              この成分の始め方
            </h2>
            <div className="space-y-3">
              {[
                {
                  step: 1,
                  title: '有効量を確認する',
                  body: ing.dosageMin
                    ? ing.dosageUnit.includes('濃度')
                      ? `配合濃度${ing.dosageMin}%以上の製品を選ぶ。論文で使用された濃度の基準となる。`
                      : `1日${ing.dosageMin}${ing.dosageMax && ing.dosageMax !== ing.dosageMin ? `〜${ing.dosageMax}` : ''}${ing.dosageUnit}を目安にする。この量が論文で効果を確認した用量。`
                    : '製品ラベルの配合量を確認する。',
                },
                {
                  step: 2,
                  title: 'タイミングと使い方',
                  body: ing.timing ?? (ing.usageType === 'topical' ? '洗顔後の清潔な肌に使用。保湿剤の前に塗布するのが一般的。' : '食事と一緒に摂取するのが吸収を助けることが多い。'),
                },
                {
                  step: 3,
                  title: '効果が出るまでの期間',
                  body: ing.duration ?? '継続的な使用が重要。数週間〜数ヶ月単位での評価が必要。短期間での判断は避ける。',
                },
              ].map(({ step, title, body }) => (
                <div key={step} className="flex gap-4 bg-card border border-border rounded-2xl p-5">
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center
                    text-[13px] font-black mt-0.5
                    ${{ S: 'bg-amber-100 text-amber-700', A: 'bg-blue-100 text-blue-700',
                         B: 'bg-emerald-100 text-emerald-700', C: 'bg-stone-100 text-stone-600' }[ing.evidenceRank]}`}>
                    {step}
                  </div>
                  <div>
                    <p className="font-semibold text-[14px] text-foreground mb-1">{title}</p>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Products */}
        {ing.products.length > 0 && (
          <section id="products" className="mb-10 scroll-mt-20">
            {/* ヘッダー */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-[18px] text-foreground">おすすめ商品</h2>
              <span className="text-[11px] text-muted-foreground bg-secondary border border-border
                rounded px-2 py-0.5">PR・アフィリエイトを含む</span>
            </div>
            <p className="text-[13px] text-muted-foreground mb-5">
              論文で有効とされた用量を含む商品を独自に評価・選定しています
            </p>

            {/* 選び方ポイント（dosageMinがある場合） */}
            {ing.dosageMin && (
              <div className="bg-secondary border border-border rounded-xl p-4 mb-5">
                <p className="text-[12px] font-semibold text-foreground mb-2">選び方のポイント</p>
                <ul className="space-y-1.5">
                  <li className="text-[13px] text-muted-foreground flex gap-2">
                    <span className="text-accent flex-shrink-0 font-bold">✓</span>
                    <span>
                      <strong className="text-foreground">有効量を確認：</strong>
                      {ing.dosageUnit.includes('濃度')
                        ? `${ing.dosageMin}%以上の濃度`
                        : `1日${ing.dosageMin}${ing.dosageMax && ing.dosageMax !== ing.dosageMin ? `〜${ing.dosageMax}` : ''}${ing.dosageUnit.split('/')[0]}以上`}
                      が論文で使用された量
                    </span>
                  </li>
                  <li className="text-[13px] text-muted-foreground flex gap-2">
                    <span className="text-accent flex-shrink-0 font-bold">✓</span>
                    <span><strong className="text-foreground">継続コストを計算：</strong>
                      効果が出るまで{ing.duration ? ing.duration.split('。')[0] : '数週間〜数ヶ月'}かかるため、月あたりのコストで比較する
                    </span>
                  </li>
                  <li className="text-[13px] text-muted-foreground flex gap-2">
                    <span className="text-accent flex-shrink-0 font-bold">✓</span>
                    <span><strong className="text-foreground">不要な添加物を避ける：</strong>
                      シンプルな成分表示のものを優先
                    </span>
                  </li>
                </ul>
              </div>
            )}

            {/* 商品リスト */}
            <div className="space-y-3">
              {[...ing.products]
                .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))
                .map((prod, i) => {
                  const isTop = prod.rank === 1 || (i === 0 && !prod.rank)
                  return (
                    <div key={i}
                      className={`bg-card rounded-2xl p-5 transition-all duration-200
                        ${isTop
                          ? 'border-2 border-accent/40 shadow-sm shadow-accent/10'
                          : 'border border-border'}`}>

                      {/* ランクバッジ + ハイライト */}
                      <div className="flex items-center gap-2 mb-3">
                        {isTop && (
                          <span className="bg-accent text-accent-foreground text-[11px]
                            font-bold rounded-full px-2.5 py-0.5">
                            SciBase推奨
                          </span>
                        )}
                        {prod.highlight && (
                          <span className="bg-amber-50 text-amber-700 border border-amber-200
                            text-[11px] font-semibold rounded-full px-2.5 py-0.5">
                            {prod.highlight}
                          </span>
                        )}
                        <span className="text-[11px] text-muted-foreground bg-secondary
                          border border-border rounded px-2 py-0.5 ml-auto">
                          {platformLabel[prod.platform]}
                        </span>
                      </div>

                      <div className="flex flex-col gap-4">
                        <div>
                          <p className="text-[11px] text-muted-foreground mb-0.5">{prod.brand}</p>
                          <p className="font-semibold text-[15px] text-foreground mb-2 leading-snug">
                            {prod.name}
                          </p>

                          {/* なぜこれか */}
                          {prod.reasonJa && (
                            <p className="text-[13px] text-accent font-medium mb-2">
                              → {prod.reasonJa}
                            </p>
                          )}

                          {prod.note && (
                            <p className="text-[12px] text-muted-foreground leading-relaxed">
                              {prod.note}
                            </p>
                          )}

                          {/* 品質バッジ */}
                          {(prod.thirdPartyTested || prod.heavyMetalTested || (prod.certifications && prod.certifications.length > 0) || prod.form) && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {prod.heavyMetalTested && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold
                                  bg-emerald-50 text-emerald-700 border border-emerald-200 rounded px-2 py-0.5">
                                  ✓ 重金属検査済
                                </span>
                              )}
                              {prod.thirdPartyTested && !prod.heavyMetalTested && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold
                                  bg-blue-50 text-blue-700 border border-blue-200 rounded px-2 py-0.5">
                                  ✓ 第三者検査済
                                </span>
                              )}
                              {prod.certifications?.includes('NSF') && (
                                <span className="text-[10px] font-bold bg-blue-700 text-white
                                  rounded px-2 py-0.5">NSF</span>
                              )}
                              {prod.certifications?.includes('USP') && (
                                <span className="text-[10px] font-bold bg-indigo-700 text-white
                                  rounded px-2 py-0.5">USP</span>
                              )}
                              {prod.certifications?.includes('GMP') && (
                                <span className="text-[10px] font-semibold bg-secondary text-muted-foreground
                                  border border-border rounded px-2 py-0.5">GMP</span>
                              )}
                              {prod.certifications?.includes('NonGMO') && (
                                <span className="text-[10px] font-semibold bg-teal-50 text-teal-700
                                  border border-teal-200 rounded px-2 py-0.5">Non-GMO</span>
                              )}
                              {prod.certifications?.includes('Organic') && (
                                <span className="text-[10px] font-semibold bg-green-50 text-green-700
                                  border border-green-200 rounded px-2 py-0.5">有機</span>
                              )}
                              {prod.form && (
                                <span className="text-[10px] text-muted-foreground/60 border border-border
                                  rounded px-2 py-0.5">{prod.form}</span>
                              )}
                            </div>
                          )}

                          {/* 品質メモ */}
                          {prod.qualityNote && (
                            <p className="text-[11px] text-muted-foreground/70 leading-relaxed mt-2
                              bg-secondary/60 rounded-lg px-3 py-2">
                              {prod.qualityNote}
                            </p>
                          )}
                        </div>

                        {/* コスト情報 */}
                        <div className="flex flex-wrap gap-3">
                          <div>
                            <p className="text-[10px] text-muted-foreground/50 mb-0.5">価格</p>
                            <p className="font-bold text-[16px] text-foreground tabular-nums">
                              ¥{prod.priceJpy.toLocaleString()}
                              <span className="text-[11px] font-normal text-muted-foreground">〜</span>
                            </p>
                          </div>
                          {prod.monthlyCostJpy && (
                            <div>
                              <p className="text-[10px] text-muted-foreground/50 mb-0.5">月あたり</p>
                              <p className="font-semibold text-[14px] text-muted-foreground tabular-nums">
                                ¥{prod.monthlyCostJpy.toLocaleString()}
                              </p>
                            </div>
                          )}
                          {prod.dosageMg && (
                            <div>
                              <p className="text-[10px] text-muted-foreground/50 mb-0.5">1回量</p>
                              <p className="font-semibold text-[14px] text-muted-foreground tabular-nums">
                                {prod.dosageMg >= 1000
                                  ? `${prod.dosageMg / 1000}g`
                                  : `${prod.dosageMg}mg`}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* CTA: full-width */}
                        <a
                          href={prod.url}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className={`flex items-center justify-center gap-2 text-[14px] font-semibold
                            rounded-xl px-4 py-3 transition-opacity hover:opacity-90 w-full
                            ${isTop
                              ? 'bg-accent text-accent-foreground'
                              : 'bg-primary text-primary-foreground'}`}
                        >
                          購入する
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  )
              })}
            </div>
          </section>
        )}

        {/* Meta */}
        <p className="text-[12px] text-muted-foreground mb-8">
          最終更新：{ing.updatedAt} ／ 参照論文：{ing.papers.length}件
        </p>

        {/* Disclaimer */}
        <div className="bg-secondary border border-border rounded-xl p-4
          text-[13px] text-muted-foreground leading-relaxed mb-10">
          本ページの情報は医療的アドバイスを提供するものではありません。
          サプリメントの使用前には医師・薬剤師にご相談ください。
          掲載内容は論文情報の提供を目的としており、効果・効能を保証するものではありません。
        </div>

        {/* Related ingredients */}
        {siblingIngredients.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-semibold text-[18px] text-foreground">
                よく一緒に調べられている成分
              </h2>
              {relatedConcerns[0] && (
                <Link href={`/ranking/${relatedConcerns[0].slug}`}
                  className="text-[12px] text-accent flex items-center gap-1 hover:underline">
                  <Trophy className="w-3.5 h-3.5" />
                  ランキングを見る
                </Link>
              )}
            </div>
            <p className="text-[12px] text-muted-foreground mb-4">
              {ing.nameJa}と同じ悩みカテゴリで見られている成分
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {siblingIngredients.map(i => (
                <IngredientCard key={i.slug} ingredient={i} showConcerns={false} />
              ))}
            </div>
          </section>
        )}

        {/* ── 次のアクション CTA ── */}
        <div className="border-t border-border pt-10 mt-4 mb-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em]
            text-muted-foreground mb-5">
            次にやること
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {relatedConcerns[0] && (
              <Link
                href={`/ranking/${relatedConcerns[0].slug}`}
                className="flex items-center gap-3 bg-accent text-accent-foreground
                  rounded-2xl px-5 py-4 hover:opacity-90 transition-opacity"
              >
                <BarChart2 className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[14px] leading-snug">
                    {relatedConcerns[0].nameJa}のランキングを見る
                  </p>
                  <p className="text-[12px] opacity-70 mt-0.5">
                    {relatedConcerns[0].nameJa}に効く成分を比較
                  </p>
                </div>
              </Link>
            )}
            {relatedConcerns[0] && (
              <Link
                href={`/concerns/${relatedConcerns[0].slug}`}
                className="flex items-center gap-3 border border-border bg-card
                  rounded-2xl px-5 py-4 hover:border-accent/50 hover:shadow-sm transition-all"
              >
                <Trophy className="w-5 h-5 text-accent flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[14px] text-foreground leading-snug">
                    {relatedConcerns[0].nameJa}の成分一覧
                  </p>
                  <p className="text-[12px] text-muted-foreground mt-0.5">
                    すべての関連成分を確認
                  </p>
                </div>
              </Link>
            )}
          </div>
          <Link href="/ingredients"
            className="inline-flex items-center gap-2 text-[13px] text-muted-foreground
              hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            成分一覧に戻る
          </Link>
        </div>

        </div>{/* /main content */}
        <TableOfContents sections={tocSections} />
        </div>{/* /flex */}
      </div>
    </>
  )
}
