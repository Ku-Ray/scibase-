import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, ExternalLink, ArrowLeft, Trophy } from 'lucide-react'
import { getIngredient, getIngredientsByConcern, ingredients, concerns } from '@/lib/data'
import { EvidenceBadge, EvidenceBar } from '@/components/EvidenceBadge'
import { IngredientCard } from '@/components/IngredientCard'
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

const BASE_URL = 'https://scibase.jp'

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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      {/* ── Hero (light tinted block) ─────────────────── */}
      <div className={`${heroBg[ing.evidenceRank]} border-t-4 ${heroBorder[ing.evidenceRank]}`}>
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
            <div className="inline-block mt-6 rounded-2xl px-5 py-3 bg-white/70 border border-black/8">
              <p className={`text-[38px] font-black tabular-nums leading-none ${heroText[ing.evidenceRank]}`}>
                {ing.heroStat.value}
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">{ing.heroStat.label}</p>
            </div>
          )}
        </div>

        {/* Evidence bar at bottom of hero */}
        <div className="h-1 bg-black/5">
          <div className={`h-full ${heroBarBg[ing.evidenceRank]} opacity-50
            ${{ S: 'w-full', A: 'w-3/4', B: 'w-1/2', C: 'w-1/4' }[ing.evidenceRank]}`} />
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-5 py-10">

        {/* PR表記 */}
        <p className="text-[12px] text-muted-foreground bg-secondary rounded-lg px-3 py-2 mb-10">
          本ページにはアフィリエイトリンクが含まれます。
          掲載内容は論文エビデンスに基づき独立して評価しています。
        </p>

        {/* Description */}
        <section className="mb-10">
          <h2 className="font-semibold text-[18px] text-foreground mb-4">この成分について</h2>
          <p className="text-[15px] text-muted-foreground leading-[1.85]">{ing.description}</p>
        </section>

        {/* こんな人に特に関係する */}
        {ing.whoFor && ing.whoFor.length > 0 && (
          <section className="mb-10">
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
        <section className="mb-10">
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
                <p className="text-[12px] text-muted-foreground/60 mb-2 leading-snug italic">
                  {p.title}
                </p>
                <p className="text-[14px] text-foreground font-medium leading-relaxed">
                  {p.keyFinding}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Evidence rank detail */}
        <section className="mb-10">
          <h2 className="font-semibold text-[18px] text-foreground mb-4">
            このエビデンスをどう読むか
          </h2>
          <EvidenceBadge rank={ing.evidenceRank} variant="detail" />
        </section>

        {/* Dosage */}
        <section className="mb-10">
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
          <section className="mb-10">
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
          <section className="mb-10">
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
          <section className="mb-10">
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
          <section className="mb-10">
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

                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
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

                          {/* コスト情報 */}
                          <div className="flex flex-wrap gap-3 mt-3">
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
                        </div>

                        {/* CTA */}
                        <div className="flex-shrink-0 pt-1">
                          <a
                            href={prod.url}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className={`inline-flex items-center gap-1.5 text-[13px] font-semibold
                              rounded-xl px-4 py-2.5 transition-opacity hover:opacity-90
                              ${isTop
                                ? 'bg-accent text-accent-foreground'
                                : 'bg-primary text-primary-foreground'}`}
                          >
                            購入する
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-[18px] text-foreground">同じ悩みに効く成分</h2>
              {relatedConcerns[0] && (
                <Link href={`/ranking/${relatedConcerns[0].slug}`}
                  className="text-[12px] text-accent flex items-center gap-1 hover:underline">
                  <Trophy className="w-3.5 h-3.5" />
                  ランキングを見る
                </Link>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {siblingIngredients.map(i => (
                <IngredientCard key={i.slug} ingredient={i} showConcerns={false} />
              ))}
            </div>
          </section>
        )}

        {/* Compare links */}
        {siblingIngredients.length > 0 && (
          <section className="mb-10">
            <h2 className="font-semibold text-[16px] text-foreground mb-3">
              同じ悩みに使われる成分
            </h2>
            <div className="flex flex-wrap gap-2">
              {siblingIngredients.slice(0, 5).map(sibling => (
                <Link
                  key={sibling.slug}
                  href={`/ingredients/${sibling.slug}`}
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium
                    bg-card border border-border rounded-full px-3 py-1.5
                    hover:border-accent hover:text-accent transition-colors"
                >
                  {sibling.nameJa}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* note誘導 */}
        <div className="bg-secondary border border-border rounded-2xl p-5 mb-8">
          <p className="font-semibold text-[14px] text-foreground mb-1">
            もっと深く知りたい方へ
          </p>
          <p className="text-[13px] text-muted-foreground mb-3">
            {ing.nameJa}を含む老化・スキンケア・サプリの最新論文を毎週要約しています。
            noteメンバーシップで読めます（月額980円）。
          </p>
          <a
            href="https://note.com/r_evidence_/membership"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold
              text-accent hover:underline transition-colors"
          >
            noteメンバーシップを見る →
          </a>
        </div>

        <Link href="/ingredients"
          className="inline-flex items-center gap-2 text-[13px] text-muted-foreground
            hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          成分一覧に戻る
        </Link>
      </div>
    </>
  )
}
