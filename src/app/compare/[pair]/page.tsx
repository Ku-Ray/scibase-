import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, ArrowLeftRight } from 'lucide-react'
import { getIngredient, ingredients } from '@/lib/data'
import { EvidenceBadge, EvidenceBar } from '@/components/EvidenceBadge'
import type { Metadata } from 'next'
import type { EvidenceRank } from '@/lib/types'

interface Props { params: Promise<{ pair: string }> }

/* Pre-render popular comparisons */
const POPULAR_PAIRS = [
  // スキンケア成分の比較
  ['retinol', 'bakuchiol'],
  ['retinol', 'retinal'],
  ['niacinamide', 'vitamin-c-topical'],
  ['hyaluronic-acid', 'ceramide'],
  ['glycolic-acid', 'salicylic-acid'],
  ['niacinamide', 'azelaic-acid'],
  ['arbutin', 'niacinamide'],
  ['arbutin', 'kojic-acid'],
  ['vitamin-c-topical', 'azelaic-acid'],
  ['retinol', 'glycolic-acid'],
  // サプリメントの比較
  ['magnesium', 'ashwagandha'],
  ['vitamin-d', 'omega3'],
  ['collagen-peptide', 'vitamin-c-oral'],
  ['nmn', 'coq10'],
  ['l-theanine', 'ashwagandha'],
  ['melatonin', 'magnesium'],
  ['melatonin', 'glycine'],
  ['l-theanine', 'gaba'],
  ['creatine', 'coq10'],
  ['vitamin-c-oral', 'zinc'],
  ['omega3', 'vitamin-d'],
  ['resveratrol', 'coq10'],
  ['magnesium', 'l-theanine'],
  ['ashwagandha', 'gaba'],
  ['creatine', 'nmn'],
]

export async function generateStaticParams() {
  return POPULAR_PAIRS.map(([a, b]) => ({ pair: `${a}-vs-${b}` }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair } = await params
  const slugs = parsePair(pair)
  if (!slugs) return {}
  const [a, b] = slugs.map(getIngredient)
  if (!a || !b) return {}
  return {
    title: `${a.nameJa} vs ${b.nameJa} | 論文エビデンス比較`,
    description: `${a.nameJa}と${b.nameJa}のエビデンスを比較。論文の種類・研究数・有効量を並べて確認できます。`,
  }
}

function parsePair(pair: string): [string, string] | null {
  const idx = pair.indexOf('-vs-')
  if (idx === -1) return null
  return [pair.slice(0, idx), pair.slice(idx + 4)]
}

const rankOrder: Record<EvidenceRank, number> = { S: 4, A: 3, B: 2, C: 1 }
const rankMeta: Record<EvidenceRank, { label: string; desc: string }> = {
  S: { label: 'S', desc: 'メタ解析・SR' },
  A: { label: 'A', desc: 'RCT' },
  B: { label: 'B', desc: 'コホート' },
  C: { label: 'C', desc: '動物・小規模' },
}

const usageLabel: Record<string, string> = {
  topical: '外用', oral: '経口', both: '外用・経口',
}

const BASE_URL = 'https://scibase.jp'

export default async function ComparePage({ params }: Props) {
  const { pair } = await params
  const slugs = parsePair(pair)
  if (!slugs) notFound()

  const [ingA, ingB] = slugs.map(getIngredient)
  if (!ingA || !ingB) notFound()

  const winner = rankOrder[ingA.evidenceRank] > rankOrder[ingB.evidenceRank]
    ? ingA
    : rankOrder[ingA.evidenceRank] < rankOrder[ingB.evidenceRank]
      ? ingB
      : null  // tie

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: '比較', item: `${BASE_URL}/compare` },
      {
        '@type': 'ListItem', position: 3,
        name: `${ingA.nameJa} vs ${ingB.nameJa}`,
        item: `${BASE_URL}/compare/${pair}`,
      },
    ],
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `${ingA.nameJa}と${ingB.nameJa}はどちらがエビデンスが強いですか？`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: winner
            ? `${winner.nameJa}の方がエビデンスランクが高く（${winner.evidenceRank}ランク）、より信頼度の高い研究で効果が確認されています。`
            : `${ingA.nameJa}と${ingB.nameJa}は同じエビデンスランク（${ingA.evidenceRank}）です。`,
        },
      },
    ],
  }

  // Shared concern slugs
  const sharedConcerns = ingA.concerns.filter(c => ingB.concerns.includes(c))

  // Suggest other comparisons involving these ingredients
  const relatedPairs = POPULAR_PAIRS
    .filter(([a, b]) =>
      (`${a}-vs-${b}` !== pair) &&
      (a === ingA.slug || b === ingA.slug || a === ingB.slug || b === ingB.slug)
    )
    .slice(0, 4)
    .map(([a, b]) => {
      const ia = getIngredient(a)
      const ib = getIngredient(b)
      return ia && ib ? { pair: `${a}-vs-${b}`, a: ia, b: ib } : null
    })
    .filter(Boolean) as { pair: string; a: typeof ingA; b: typeof ingB }[]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="max-w-4xl mx-auto px-5 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-8">
          <Link href="/" className="hover:underline">ホーム</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/ingredients" className="hover:underline">成分一覧</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{ingA.nameJa} vs {ingB.nameJa}</span>
        </nav>

        {/* Page title */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold
            text-muted-foreground uppercase tracking-wider mb-4">
            <ArrowLeftRight className="w-4 h-4" />
            論文エビデンス比較
          </div>
          <h1 className="text-[26px] sm:text-[34px] font-bold text-foreground
            leading-[1.2] tracking-tight">
            {ingA.nameJa} vs {ingB.nameJa}
          </h1>
          {sharedConcerns.length > 0 && (
            <p className="text-[14px] text-muted-foreground mt-2">
              どちらも「{sharedConcerns.slice(0, 2).join('・')}」への効果が研究されている成分
            </p>
          )}
        </div>

        {/* Verdict banner */}
        {winner ? (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 text-center">
            <p className="text-[12px] text-amber-700 font-semibold uppercase tracking-wider mb-1">
              エビデンスが強い
            </p>
            <p className="text-[22px] font-bold text-amber-800">{winner.nameJa}</p>
            <p className="text-[13px] text-amber-700 mt-1">
              ランク {winner.evidenceRank}（{rankMeta[winner.evidenceRank].desc}）で効果が確認
            </p>
          </div>
        ) : (
          <div className="bg-secondary border border-border rounded-2xl p-5 mb-8 text-center">
            <p className="text-[13px] text-muted-foreground">
              どちらも同じエビデンスランク（{ingA.evidenceRank}）です
            </p>
          </div>
        )}

        {/* Side-by-side comparison */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 mb-10">
          {[ingA, ingB].map((ing) => (
            <div key={ing.slug}
              className={`bg-card border-2 rounded-2xl p-5
                ${winner?.slug === ing.slug
                  ? 'border-amber-400 shadow-lg shadow-amber-100'
                  : 'border-border'}`}>

              {winner?.slug === ing.slug && (
                <div className="text-[11px] font-bold text-amber-600 uppercase
                  tracking-wider mb-3">
                  エビデンス強
                </div>
              )}

              <div className="mb-3">
                <Link href={`/ingredients/${ing.slug}`}
                  className="font-bold text-[17px] sm:text-[20px] text-foreground
                    hover:text-accent transition-colors leading-snug block">
                  {ing.nameJa}
                </Link>
                <p className="text-[11px] text-muted-foreground/50">{ing.nameEn}</p>
              </div>

              <div className="mb-4">
                <EvidenceBadge rank={ing.evidenceRank} variant="chip" />
              </div>

              <EvidenceBar rank={ing.evidenceRank} />

              <dl className="mt-5 space-y-3 text-[13px]">
                <div>
                  <dt className="text-[10px] text-muted-foreground/50 uppercase tracking-wide font-medium mb-0.5">
                    研究タイプ
                  </dt>
                  <dd className="font-medium">{rankMeta[ing.evidenceRank].desc}</dd>
                </div>
                <div>
                  <dt className="text-[10px] text-muted-foreground/50 uppercase tracking-wide font-medium mb-0.5">
                    論文数
                  </dt>
                  <dd className="font-medium">{ing.papers.length}件</dd>
                </div>
                {ing.usageType && (
                  <div>
                    <dt className="text-[10px] text-muted-foreground/50 uppercase tracking-wide font-medium mb-0.5">
                      使用区分
                    </dt>
                    <dd className="font-medium">{usageLabel[ing.usageType]}</dd>
                  </div>
                )}
                {ing.dosageMin && (
                  <div>
                    <dt className="text-[10px] text-muted-foreground/50 uppercase tracking-wide font-medium mb-0.5">
                      有効量
                    </dt>
                    <dd className="font-medium tabular-nums">
                      {ing.dosageMin}
                      {ing.dosageMax && ing.dosageMax !== ing.dosageMin ? `–${ing.dosageMax}` : ''}
                      {ing.dosageUnit.includes('濃度') ? '%' : ing.dosageUnit.split('/')[0].replace('mg', 'mg')}
                    </dd>
                  </div>
                )}
              </dl>

              <p className="text-[12px] text-muted-foreground leading-relaxed mt-4
                pt-4 border-t border-border line-clamp-3">
                {ing.tagline}
              </p>

              <Link href={`/ingredients/${ing.slug}`}
                className="mt-4 block text-center text-[12px] font-medium
                  text-accent hover:underline">
                詳細を見る →
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-10">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="text-left px-5 py-3 font-medium text-muted-foreground text-[12px] w-1/3">
                  比較項目
                </th>
                <th className="text-center px-3 py-3 font-semibold text-foreground">
                  {ingA.nameJa}
                </th>
                <th className="text-center px-3 py-3 font-semibold text-foreground">
                  {ingB.nameJa}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-5 py-3 text-muted-foreground">エビデンスランク</td>
                <td className="px-3 py-3 text-center">
                  <span className="inline-flex">
                    <EvidenceBadge rank={ingA.evidenceRank} variant="dot" />
                  </span>
                </td>
                <td className="px-3 py-3 text-center">
                  <span className="inline-flex">
                    <EvidenceBadge rank={ingB.evidenceRank} variant="dot" />
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 text-muted-foreground">研究タイプ</td>
                <td className="px-3 py-3 text-center font-medium">{rankMeta[ingA.evidenceRank].desc}</td>
                <td className="px-3 py-3 text-center font-medium">{rankMeta[ingB.evidenceRank].desc}</td>
              </tr>
              <tr>
                <td className="px-5 py-3 text-muted-foreground">論文数</td>
                <td className="px-3 py-3 text-center font-medium tabular-nums">{ingA.papers.length}件</td>
                <td className="px-3 py-3 text-center font-medium tabular-nums">{ingB.papers.length}件</td>
              </tr>
              <tr>
                <td className="px-5 py-3 text-muted-foreground">使用区分</td>
                <td className="px-3 py-3 text-center">
                  {ingA.usageType ? usageLabel[ingA.usageType] : '—'}
                </td>
                <td className="px-3 py-3 text-center">
                  {ingB.usageType ? usageLabel[ingB.usageType] : '—'}
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 text-muted-foreground">有効量</td>
                <td className="px-3 py-3 text-center tabular-nums text-[12px]">
                  {ingA.dosageMin
                    ? `${ingA.dosageMin}${ingA.dosageMax && ingA.dosageMax !== ingA.dosageMin ? `–${ingA.dosageMax}` : ''}${ingA.dosageUnit.includes('濃度') ? '%' : ingA.dosageUnit.split('/')[0]}`
                    : '—'}
                </td>
                <td className="px-3 py-3 text-center tabular-nums text-[12px]">
                  {ingB.dosageMin
                    ? `${ingB.dosageMin}${ingB.dosageMax && ingB.dosageMax !== ingB.dosageMin ? `–${ingB.dosageMax}` : ''}${ingB.dosageUnit.includes('濃度') ? '%' : ingB.dosageUnit.split('/')[0]}`
                    : '—'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Related comparisons */}
        {relatedPairs.length > 0 && (
          <div className="mb-10">
            <p className="font-medium text-[14px] text-foreground mb-4">関連する比較</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {relatedPairs.map(({ pair: p, a, b }) => (
                <Link
                  key={p}
                  href={`/compare/${p}`}
                  className="group flex items-center gap-3 bg-card border border-border
                    rounded-xl px-4 py-3 hover:border-accent/50 hover:shadow-sm
                    transition-all duration-150"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-[13px] font-medium text-foreground
                    group-hover:text-accent transition-colors truncate">
                    {a.nameJa} vs {b.nameJa}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA: ingredient detail pages */}
        <div className="flex gap-3">
          {[ingA, ingB].map(ing => (
            <Link
              key={ing.slug}
              href={`/ingredients/${ing.slug}`}
              className="flex-1 text-center bg-card border border-border rounded-xl
                py-3 text-[13px] font-medium text-muted-foreground
                hover:border-accent hover:text-accent transition-colors"
            >
              {ing.nameJa}の詳細
            </Link>
          ))}
        </div>

      </div>
    </>
  )
}
