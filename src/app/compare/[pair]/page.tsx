import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, ArrowRight } from 'lucide-react'
import { getIngredient, concerns as allConcerns } from '@/lib/data'
import { EvidenceBadge } from '@/components/EvidenceBadge'
import { AddToAnalyzerButton } from '@/components/AddToAnalyzerButton'
import type { Metadata } from 'next'
import type { EvidenceRank, AnalysisAxis } from '@/lib/types'

interface Props { params: Promise<{ pair: string }> }

const BASE_URL = 'https://scibase.app'

/* 人気比較ペア（SEO優先順） */
export const POPULAR_PAIRS = [
  ['retinol',          'bakuchiol'],
  ['retinol',          'retinal'],
  ['nmn',              'nicotinamide-riboside'],
  ['glycine',          'magnesium'],
  ['vitamin-c-topical','niacinamide'],
  ['ashwagandha',      'rhodiola'],
  ['collagen-peptide', 'vitamin-c-oral'],
  ['omega3',           'astaxanthin'],
  ['probiotics',       'inulin'],
  ['coq10',            'pqq'],
  ['melatonin',        'glycine'],
  ['ashwagandha',      'l-theanine'],
  ['resveratrol',      'quercetin'],
  ['hyaluronic-acid',  'ceramide'],
  ['vitamin-d',        'magnesium'],
  ['zinc',             'vitamin-c-oral'],
  ['lions-mane',       'bacopa-monnieri'],
  ['nmn',              'coq10'],
]

export async function generateStaticParams() {
  return POPULAR_PAIRS.map(([a, b]) => ({ pair: `${a}-vs-${b}` }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair } = await params
  const idx = pair.indexOf('-vs-')
  if (idx === -1) return {}
  const slugA = pair.slice(0, idx)
  const slugB = pair.slice(idx + 4)
  const ingA = getIngredient(slugA)
  const ingB = getIngredient(slugB)
  if (!ingA || !ingB) return {}
  return {
    title: `${ingA.nameJa} vs ${ingB.nameJa}【論文エビデンス比較】どっちが効く？`,
    description: `${ingA.nameJa}（エビデンス${ingA.evidenceRank}）と${ingB.nameJa}（エビデンス${ingB.evidenceRank}）を論文根拠・有効量・向いている人で徹底比較。口コミでも広告でもなく、査読済み論文で判断する。`,
    alternates: { canonical: `${BASE_URL}/compare/${pair}` },
  }
}

/* エビデンスランクの数値化（比較用） */
const rankScore: Record<EvidenceRank, number> = { S: 4, A: 3, B: 2, C: 1 }
const rankLabel: Record<EvidenceRank, string> = {
  S: 'メタ解析・SR', A: 'RCT', B: 'コホート', C: '動物・小規模',
}
const rankColor: Record<EvidenceRank, string> = {
  S: 'text-amber-700 bg-amber-50 border-amber-200',
  A: 'text-blue-700 bg-blue-50 border-blue-200',
  B: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  C: 'text-stone-600 bg-stone-50 border-stone-200',
}

/* 7軸の定義 */
const AXES: { key: AnalysisAxis; label: string; emoji: string }[] = [
  { key: 'antiAging',  label: '抗老化',        emoji: '🔬' },
  { key: 'skin',       label: '肌老化',         emoji: '🌿' },
  { key: 'cognitive',  label: '脳・認知',       emoji: '🧠' },
  { key: 'stress',     label: 'ストレス',       emoji: '🧘' },
  { key: 'sleep',      label: '睡眠・回復',     emoji: '🌙' },
  { key: 'immunity',   label: '免疫・炎症',     emoji: '🛡️' },
  { key: 'metabolism', label: '代謝・エネルギー', emoji: '⚡' },
]

export default async function ComparePage({ params }: Props) {
  const { pair } = await params

  /* URL解析: "retinol-vs-bakuchiol" → ['retinol', 'bakuchiol'] */
  const idx = pair.indexOf('-vs-')
  if (idx === -1) notFound()
  const slugA = pair.slice(0, idx)
  const slugB = pair.slice(idx + 4)

  const ingA = getIngredient(slugA)
  const ingB = getIngredient(slugB)
  if (!ingA || !ingB) notFound()

  /* 共通の悩みカテゴリ */
  const sharedConcerns = allConcerns.filter(
    c => ingA.concerns.includes(c.slug) && ingB.concerns.includes(c.slug)
  )
  const onlyA = allConcerns.filter(
    c => ingA.concerns.includes(c.slug) && !ingB.concerns.includes(c.slug)
  )
  const onlyB = allConcerns.filter(
    c => ingB.concerns.includes(c.slug) && !ingA.concerns.includes(c.slug)
  )

  /* エビデンス勝者 */
  const scoreA = rankScore[ingA.evidenceRank]
  const scoreB = rankScore[ingB.evidenceRank]
  const evidenceWinner = scoreA > scoreB ? ingA : scoreB > scoreA ? ingB : null

  /* 軸スコアで勝る成分 */
  const axisWins = { a: 0, b: 0 }
  AXES.forEach(({ key }) => {
    const sA = ingA.axisScores?.[key] ?? 0
    const sB = ingB.axisScores?.[key] ?? 0
    if (sA > sB) axisWins.a++
    else if (sB > sA) axisWins.b++
  })

  /* JSON-LD */
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム',   item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: '成分比較', item: `${BASE_URL}/compare` },
      { '@type': 'ListItem', position: 3, name: `${ingA.nameJa} vs ${ingB.nameJa}`, item: `${BASE_URL}/compare/${pair}` },
    ],
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `${ingA.nameJa}と${ingB.nameJa}はどちらが効果がありますか？`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: evidenceWinner
            ? `論文エビデンスの強さでは${evidenceWinner.nameJa}（${rankLabel[evidenceWinner.evidenceRank]}）が上回ります。ただし用途が異なるため、目的・悩みに応じた選択が重要です。`
            : `${ingA.nameJa}と${ingB.nameJa}は同等のエビデンスランクです。用途・悩みに応じて選択してください。`,
        },
      },
      {
        '@type': 'Question',
        name: `${ingA.nameJa}と${ingB.nameJa}は一緒に使えますか？`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: sharedConcerns.length > 0
            ? `両成分は${sharedConcerns.map(c => c.nameJa).join('・')}という共通の悩みをカバーします。相互作用の研究は限られていますが、別々の機序で働くため、医師に相談の上で併用が検討されることがあります。`
            : `${ingA.nameJa}と${ingB.nameJa}はカバーする悩みが異なり、目的が異なる成分です。それぞれの目的に応じて使い分けることを推奨します。`,
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="max-w-3xl mx-auto px-5 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-8">
          <Link href="/" className="hover:underline">ホーム</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/compare" className="hover:underline">成分比較</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{ingA.nameJa} vs {ingB.nameJa}</span>
        </nav>

        {/* Hero — 損失回避フレーミング */}
        <div className="mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em]
            text-muted-foreground mb-3">論文エビデンス比較</p>
          <h1 className="text-[28px] sm:text-[36px] font-bold text-foreground
            tracking-tight leading-[1.2] mb-4">
            {ingA.nameJa} vs {ingB.nameJa}
          </h1>
          <p className="text-[14px] text-muted-foreground leading-relaxed">
            「どっちがいいか」は口コミではなく、査読済み論文で判断する。
            間違った成分を選び続けることのコストは、製品代だけではありません。
          </p>
        </div>

        {/* クイック評決（アンカリング）— 最重要セクション */}
        <div className="bg-secondary border border-border rounded-2xl p-5 mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-wider
            text-muted-foreground mb-4">論文エビデンスによる評決</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[
              { ing: ingA, wins: axisWins.a, label: 'A' },
              { ing: ingB, wins: axisWins.b, label: 'B' },
            ].map(({ ing, wins }) => (
              <div key={ing.slug}
                className={`rounded-xl border p-4 text-center ${rankColor[ing.evidenceRank]}`}>
                <div className="text-[11px] font-semibold mb-1">{rankLabel[ing.evidenceRank]}</div>
                <div className="text-[26px] font-black mb-0.5">{ing.evidenceRank}</div>
                <div className="font-bold text-[15px] mb-2">{ing.nameJa}</div>
                <div className="text-[11px] opacity-70">{wins}軸で優位</div>
              </div>
            ))}
          </div>
          {evidenceWinner ? (
            <p className="text-[13px] text-foreground leading-relaxed">
              <span className="font-semibold">エビデンスの強さ：{evidenceWinner.nameJa}が上回ります。</span>
              ただし成分の「強さ」は目的によって変わります。下の比較で確認してください。
            </p>
          ) : (
            <p className="text-[13px] text-foreground leading-relaxed">
              両成分は<span className="font-semibold">同等のエビデンスランク</span>です。
              目的・悩みに応じて選択することが重要です。
            </p>
          )}
        </div>

        {/* 成分カード比較（社会的証明） */}
        <section className="mb-10">
          <h2 className="font-semibold text-[18px] text-foreground mb-4">成分の基本情報</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[ingA, ingB].map(ing => (
              <div key={ing.slug}
                className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <EvidenceBadge rank={ing.evidenceRank} variant="chip" />
                  <span className="text-[11px] text-muted-foreground">
                    論文 {ing.papers.length}件
                  </span>
                </div>
                <h3 className="font-bold text-[18px] text-foreground mb-1">{ing.nameJa}</h3>
                <p className="text-[12px] text-muted-foreground mb-3">{ing.nameEn}</p>
                <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">
                  {ing.tagline}
                </p>
                {ing.papers[0] && (
                  <div className="bg-secondary rounded-lg px-3 py-2 text-[11px]
                    text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">代表的な研究：</span>
                    {ing.papers[0].keyFinding}
                    {ing.papers[0].sampleSize ? `（${ing.papers[0].sampleSize.toLocaleString()}人対象）` : ''}
                  </div>
                )}
                <div className="mt-4 flex items-center gap-2">
                  <Link href={`/ingredients/${ing.slug}`}
                    className="flex-1 text-center text-[12px] font-medium border border-border
                      text-muted-foreground rounded-xl px-3 py-2 hover:border-accent
                      hover:text-accent transition-colors">
                    詳細を見る
                  </Link>
                  <AddToAnalyzerButton slug={ing.slug} variant="compact" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7軸スコア比較（視覚的アンカリング） */}
        <section className="mb-10">
          <h2 className="font-semibold text-[18px] text-foreground mb-4">7軸スコア比較</h2>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_auto] gap-0 divide-y divide-border">
              <div className="px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">軸</div>
              <div className="px-4 py-2.5 text-[11px] font-semibold text-center text-foreground w-28">{ingA.nameJa}</div>
              <div className="px-4 py-2.5 text-[11px] font-semibold text-center text-foreground w-28">{ingB.nameJa}</div>
              {AXES.map(({ key, label, emoji }) => {
                const sA = ingA.axisScores?.[key] ?? 0
                const sB = ingB.axisScores?.[key] ?? 0
                const winnerA = sA > sB
                const winnerB = sB > sA
                return (
                  <>
                    <div key={`label-${key}`} className="px-4 py-3 flex items-center gap-2">
                      <span className="text-[14px]">{emoji}</span>
                      <span className="text-[12px] text-foreground">{label}</span>
                    </div>
                    <div key={`a-${key}`} className="px-4 py-3 flex flex-col items-center justify-center w-28">
                      <div className="w-full bg-secondary rounded-full h-1.5 mb-1.5">
                        <div
                          className={`h-full rounded-full ${winnerA ? 'bg-accent' : 'bg-border'}`}
                          style={{ width: `${sA * 10}%` }}
                        />
                      </div>
                      <span className={`text-[12px] font-bold tabular-nums
                        ${winnerA ? 'text-accent' : 'text-muted-foreground'}`}>
                        {sA.toFixed(1)} {winnerA && '▲'}
                      </span>
                    </div>
                    <div key={`b-${key}`} className="px-4 py-3 flex flex-col items-center justify-center w-28">
                      <div className="w-full bg-secondary rounded-full h-1.5 mb-1.5">
                        <div
                          className={`h-full rounded-full ${winnerB ? 'bg-accent' : 'bg-border'}`}
                          style={{ width: `${sB * 10}%` }}
                        />
                      </div>
                      <span className={`text-[12px] font-bold tabular-nums
                        ${winnerB ? 'text-accent' : 'text-muted-foreground'}`}>
                        {sB.toFixed(1)} {winnerB && '▲'}
                      </span>
                    </div>
                  </>
                )
              })}
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">▲ はその軸でスコアが高い方を示す</p>
        </section>

        {/* 悩みカバー比較（パーソナライゼーション） */}
        <section className="mb-10">
          <h2 className="font-semibold text-[18px] text-foreground mb-4">
            あなたの悩みにはどちらが向いているか
          </h2>
          <div className="space-y-4">
            {sharedConcerns.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-5">
                <p className="text-[12px] font-semibold text-foreground mb-3">
                  両方がカバーする悩み（どちらでも対応）
                </p>
                <div className="flex flex-wrap gap-2">
                  {sharedConcerns.map(c => (
                    <Link key={c.slug} href={`/concerns/${c.slug}`}
                      className="inline-flex items-center gap-1.5 text-[12px] border border-border
                        rounded-full px-3 py-1.5 hover:border-accent hover:text-accent transition-colors">
                      {c.emoji} {c.nameJa}
                    </Link>
                  ))}
                </div>
                {sharedConcerns.length > 0 && evidenceWinner && (
                  <p className="text-[12px] text-muted-foreground mt-3 pt-3 border-t border-border">
                    共通の悩みに対しては、エビデンスの強い
                    <span className="font-semibold text-foreground"> {evidenceWinner.nameJa}</span>
                    を優先する選択肢があります。
                  </p>
                )}
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {onlyA.length > 0 && (
                <div className="bg-card border border-border rounded-2xl p-4">
                  <p className="text-[11px] font-semibold text-foreground mb-2">
                    {ingA.nameJa} だけがカバー
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {onlyA.slice(0, 4).map(c => (
                      <span key={c.slug} className="text-[11px] bg-secondary
                        border border-border rounded-full px-2 py-0.5">
                        {c.emoji} {c.nameJa}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {onlyB.length > 0 && (
                <div className="bg-card border border-border rounded-2xl p-4">
                  <p className="text-[11px] font-semibold text-foreground mb-2">
                    {ingB.nameJa} だけがカバー
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {onlyB.slice(0, 4).map(c => (
                      <span key={c.slug} className="text-[11px] bg-secondary
                        border border-border rounded-full px-2 py-0.5">
                        {c.emoji} {c.nameJa}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 有効量・摂取ガイド比較 */}
        {(ingA.dosageMin || ingB.dosageMin) && (
          <section className="mb-10">
            <h2 className="font-semibold text-[18px] text-foreground mb-4">有効量・使用ガイド比較</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[ingA, ingB].map(ing => (
                <div key={ing.slug} className="bg-card border border-border rounded-2xl p-4">
                  <p className="font-semibold text-[13px] text-foreground mb-3">{ing.nameJa}</p>
                  <dl className="space-y-2 text-[12px]">
                    {ing.dosageMin && (
                      <div className="flex gap-2">
                        <dt className="text-muted-foreground w-16 flex-shrink-0">有効量</dt>
                        <dd className="text-foreground font-medium">
                          {ing.dosageMin}{ing.dosageMax && ing.dosageMax !== ing.dosageMin ? `〜${ing.dosageMax}` : ''} {ing.dosageUnit}
                        </dd>
                      </div>
                    )}
                    {ing.timing && (
                      <div className="flex gap-2">
                        <dt className="text-muted-foreground w-16 flex-shrink-0">タイミング</dt>
                        <dd className="text-foreground leading-relaxed">{ing.timing}</dd>
                      </div>
                    )}
                    {ing.duration && (
                      <div className="flex gap-2">
                        <dt className="text-muted-foreground w-16 flex-shrink-0">継続期間</dt>
                        <dd className="text-foreground leading-relaxed">{ing.duration}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 一緒に使える？（デコイ効果 — 両方追加への誘導） */}
        <section className="mb-10 bg-accent/5 border border-accent/20 rounded-2xl p-5">
          <h2 className="font-semibold text-[15px] text-foreground mb-2">
            {ingA.nameJa}と{ingB.nameJa}は一緒に使える？
          </h2>
          <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">
            {sharedConcerns.length > 0
              ? `両成分は${sharedConcerns.map(c => c.nameJa).join('・')}という共通の悩みをカバーしますが、カバーする軸が異なります。「どちらか一方」ではなく「それぞれの役割分担」で組み合わせるアプローチが、より網羅的なカバーを実現します。`
              : `${ingA.nameJa}と${ingB.nameJa}はカバーする悩みが異なるため、目的が違えば両方使うことに意味があります。サプリ診断で現在のカバー状況を確認し、不足している軸を埋める成分を選ぶことを推奨します。`
            }
          </p>
          <Link href="/analyzer"
            className="inline-flex items-center gap-2 text-[13px] font-semibold
              bg-foreground text-background rounded-xl px-4 py-2.5
              hover:opacity-85 transition-opacity">
            今のサプリと組み合わせて診断する
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>

        {/* Dual CTA（コミットメント原理＋FOMO） */}
        <section className="mb-10 border border-border rounded-2xl p-5">
          <p className="text-[12px] font-semibold text-muted-foreground mb-3">
            比較が終わったら → サプリ診断に追加して7軸カバー状況を確認
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[ingA, ingB].map(ing => (
              <div key={ing.slug} className="flex flex-col gap-2">
                <p className="text-[12px] font-medium text-foreground text-center">{ing.nameJa}</p>
                <AddToAnalyzerButton slug={ing.slug} />
              </div>
            ))}
          </div>
        </section>

        {/* FAQ（AI Overview対策） */}
        <section className="mb-10">
          <h2 className="font-semibold text-[18px] text-foreground mb-4">よくある質問</h2>
          <div className="border border-border rounded-2xl overflow-hidden divide-y divide-border">
            {[
              {
                q: `${ingA.nameJa}と${ingB.nameJa}はどちらが効果がありますか？`,
                a: evidenceWinner
                  ? `論文エビデンスの強さでは${evidenceWinner.nameJa}（${rankLabel[evidenceWinner.evidenceRank]}）が上回ります。ただし目的が異なれば選ぶべき成分も変わります。悩みに応じた選択が重要です。`
                  : `両成分は同等のエビデンスランクです。目的・悩みに応じて選択してください。`,
              },
              {
                q: `${ingA.nameJa}と${ingB.nameJa}の違いは何ですか？`,
                a: `主な違いは①カバーする悩みカテゴリ（${ingA.nameJa}：${ingA.concerns.slice(0,2).join('・')}、${ingB.nameJa}：${ingB.concerns.slice(0,2).join('・')}）、②エビデンスの種類（${ingA.nameJa}：${rankLabel[ingA.evidenceRank]}、${ingB.nameJa}：${rankLabel[ingB.evidenceRank]}）の2点です。`,
              },
              {
                q: `${ingA.nameJa}と${ingB.nameJa}は一緒に飲んでも大丈夫ですか？`,
                a: sharedConcerns.length > 0
                  ? `両成分は異なるメカニズムで機能するため、一般に組み合わせ使用が検討されます。ただし相互作用の研究は限られているため、医師・薬剤師への相談を推奨します。`
                  : `目的が異なる成分のため、それぞれの役割で使い分けることが一般的です。`,
              },
            ].map(({ q, a }, i) => (
              <details key={i} {...(i === 0 ? { open: true } : {})} className="group bg-card">
                <summary className="flex items-start justify-between gap-3 px-5 py-4
                  cursor-pointer hover:bg-secondary/50 transition-colors list-none">
                  <span className="text-[13px] font-semibold text-foreground leading-snug">Q. {q}</span>
                  <span className="text-muted-foreground flex-shrink-0 mt-0.5
                    group-open:rotate-180 transition-transform duration-200 text-[12px]">▾</span>
                </summary>
                <div className="px-5 pb-5 pt-1">
                  <p className="text-[13px] text-muted-foreground leading-[1.85]">{a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* 個別ページへのリンク */}
        <div className="flex flex-col sm:flex-row gap-3">
          {[ingA, ingB].map(ing => (
            <Link key={ing.slug} href={`/ingredients/${ing.slug}`}
              className="flex-1 flex items-center justify-between gap-2
                bg-card border border-border rounded-xl px-4 py-3
                hover:border-accent/50 transition-colors group">
              <div>
                <p className="text-[13px] font-semibold text-foreground">{ing.nameJa}の詳細</p>
                <p className="text-[11px] text-muted-foreground">論文 {ing.papers.length}件・{rankLabel[ing.evidenceRank]}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
