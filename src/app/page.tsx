import Link from 'next/link'
import { ArrowRight, Trophy, FlaskConical } from 'lucide-react'
import { concerns, ingredients, getIngredientsByConcern } from '@/lib/data'
import { IngredientCard } from '@/components/IngredientCard'
import { EvidenceBadge } from '@/components/EvidenceBadge'
import { HeroSearch } from '@/components/HeroSearch'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SciBase — スキンケア・サプリ成分を論文エビデンスで評価するデータベース',
  description: '「その成分、本当に効きますか」。レチノール・ナイアシンアミド・マグネシウムなど29成分を、メタ解析・RCT・コホート研究をもとに科学的に評価。口コミでも広告でもなく、査読済み論文で選ぶ。',
  alternates: { canonical: 'https://scibase.jp' },
}

const TOP_CONCERNS = ['spots', 'wrinkles', 'dry-skin', 'acne', 'pores', 'skin-aging', 'sleep', 'stress']

export default function Home() {
  const topIngredients = [...ingredients]
    .sort((a, b) =>
      ({ S: 0, A: 1, B: 2, C: 3 }[a.evidenceRank] - { S: 0, A: 1, B: 2, C: 3 }[b.evidenceRank])
    )
    .slice(0, 6)

  const featuredConcerns = concerns.filter(c => TOP_CONCERNS.includes(c.slug))

  /* ランキングプレビュー用：悩み上位3件 × 各1位成分 */
  const rankingPreviews = ['spots', 'wrinkles', 'acne', 'dry-skin', 'pores', 'sleep'].map(slug => {
    const c = concerns.find(c => c.slug === slug)
    const top = getIngredientsByConcern(slug)[0]
    return c && top ? { concern: c, top } : null
  }).filter(Boolean) as { concern: typeof concerns[0]; top: typeof ingredients[0] }[]

  return (
    <>
      {/* ── Hero ───────────────────────────────────── */}
      <section className="hero-pattern px-5 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="max-w-2xl mx-auto text-center">

          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase
            text-muted-foreground mb-6">
            Evidence-Based · Beauty &amp; Supplement Database
          </p>

          <h1 className="text-[38px] sm:text-[52px] font-bold text-foreground
            leading-[1.15] tracking-tight mb-5">
            その成分、本当に<br className="hidden sm:block" />
            効きますか。
          </h1>

          <p className="text-[15px] sm:text-[16px] text-muted-foreground leading-[1.85]
            max-w-lg mx-auto mb-8">
            口コミでも広告でもなく、査読済み論文で成分を評価。
            スキンケアもサプリも、根拠で選べるようになる。
          </p>

          {/* インライン検索 */}
          <div className="max-w-md mx-auto mb-5">
            <HeroSearch />
          </div>

          {/* サプリ診断CTA */}
          <div className="mb-8">
            <Link
              href="/analyzer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground
                text-[13px] font-medium rounded-xl px-5 py-2.5
                hover:opacity-90 transition-opacity"
            >
              🔬 今のサプリを7軸で診断する
            </Link>
          </div>

          {/* 統計 */}
          <div className="flex items-center justify-center gap-6 mb-10
            text-[12px] text-muted-foreground">
            <span><strong className="text-foreground font-semibold">{ingredients.length}</strong> 成分</span>
            <span className="w-px h-3 bg-border" />
            <span><strong className="text-foreground font-semibold">{concerns.length}</strong> 悩みカテゴリ</span>
            <span className="w-px h-3 bg-border" />
            <span><strong className="text-foreground font-semibold">100+</strong> 論文</span>
          </div>

          {/* 悩みタグ */}
          <div>
            <p className="text-[11px] text-muted-foreground/60 mb-3 tracking-wider uppercase font-medium">
              悩みから探す
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {featuredConcerns.map((c) => (
                <Link
                  key={c.slug}
                  href={`/concerns/${c.slug}`}
                  className={`group inline-flex items-center gap-1.5 border
                    text-[13px] font-medium rounded-full px-4 py-2
                    hover:scale-105 hover:shadow-sm transition-all duration-150 cat-${c.category}`}
                >
                  <span>{c.emoji}</span>
                  {c.nameJa}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── このサイトの使い方 ─────────────────────── */}
      <section className="border-t border-border px-5 py-14">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase
            text-muted-foreground text-center mb-10">
            How to use SciBase
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                num: '01',
                href: '/concerns',
                title: '悩みから探す',
                desc: 'シミ・乾燥・睡眠など気になる悩みを選ぶと、その悩みに効果がエビデンスで確認されている成分が分かる。',
                cta: '悩みから探す →',
              },
              {
                num: '02',
                href: '/ranking',
                title: 'ランキングで比べる',
                desc: '同じ悩みに対して複数の成分を論文エビデンスの強さ順にランキング。何を選べばいいか一目で分かる。',
                cta: 'ランキングを見る →',
              },
              {
                num: '03',
                href: '/analyzer',
                title: '今のサプリを診断する',
                desc: '現在摂っているサプリを選ぶと、7軸（抗老化・肌・認知・ストレス・睡眠・免疫・代謝）でスコア診断。',
                cta: '診断してみる →',
              },
            ].map(({ num, href, title, desc, cta }) => (
              <Link key={num} href={href}
                className="group bg-card border border-border rounded-2xl p-5
                  hover:border-accent/50 hover:shadow-md transition-all duration-200
                  hover:-translate-y-0.5">
                <p className="text-[11px] font-black text-muted-foreground/40 mb-3 tabular-nums">
                  {num}
                </p>
                <h3 className="font-semibold text-[15px] text-foreground mb-2
                  group-hover:text-accent transition-colors">
                  {title}
                </h3>
                <p className="text-[12px] text-muted-foreground leading-relaxed mb-4">{desc}</p>
                <p className="text-[12px] text-accent font-medium">{cta}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ランキングプレビュー ────────────────────── */}
      <section className="border-t border-border bg-card px-5 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline justify-between mb-8">
            <div className="flex items-center gap-2.5">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h2 className="font-semibold text-[20px] text-foreground">悩み別ランキング</h2>
            </div>
            <Link href="/ranking"
              className="text-[13px] text-accent flex items-center gap-1 hover:underline">
              すべて <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-[13px] text-muted-foreground mb-8 -mt-4">
            論文エビデンスの強さで成分をランキング
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {rankingPreviews.map(({ concern, top }) => (
              <Link
                key={concern.slug}
                href={`/ranking/${concern.slug}`}
                className="group bg-background border border-border rounded-2xl p-5
                  hover:border-accent/50 hover:shadow-md transition-all duration-200
                  hover:-translate-y-0.5"
              >
                <p className="text-[12px] text-muted-foreground mb-1">
                  {concern.nameJa}ランキング
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-white
                    text-[11px] font-black flex items-center justify-center flex-shrink-0">
                    1
                  </span>
                  <span className="font-semibold text-[15px] text-foreground
                    group-hover:text-accent transition-colors truncate">
                    {top.nameJa}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <EvidenceBadge rank={top.evidenceRank} variant="dot" />
                  <span className="text-[12px] text-muted-foreground line-clamp-1">
                    {top.tagline}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 悩みカテゴリ ─────────────────────────── */}
      <section className="px-5 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-semibold text-[20px] text-foreground">悩みから探す</h2>
            <Link href="/concerns"
              className="text-[13px] text-accent flex items-center gap-1 hover:underline">
              すべて <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {concerns.map((c) => (
              <Link
                key={c.slug}
                href={`/concerns/${c.slug}`}
                className={`group border rounded-xl px-4 py-3.5
                  hover:-translate-y-0.5 hover:shadow-md transition-all duration-150
                  cat-${c.category}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[18px] leading-none">{c.emoji}</span>
                  <p className="font-semibold text-[13px] truncate">
                    {c.nameJa}
                  </p>
                </div>
                <p className="text-[11px] opacity-70 ml-7">
                  {c.ingredientSlugs.length}成分
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── エビデンスが強い成分 ─────────────────── */}
      <section className="border-t border-border bg-card px-5 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <FlaskConical className="w-5 h-5 text-accent" />
              <h2 className="font-semibold text-[20px] text-foreground">
                エビデンスSランク成分
              </h2>
            </div>
            <Link href="/ingredients"
              className="text-[13px] text-accent flex items-center gap-1 hover:underline">
              すべて <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-[13px] text-muted-foreground mb-8">
            メタ解析・複数RCTで効果が確認されている成分
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {topIngredients.map((ing, i) => (
              <IngredientCard key={ing.slug} ingredient={ing} rank={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── エビデンスの見方 ─────────────────────── */}
      <section className="px-5 py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase
            text-muted-foreground text-center mb-12">
            How we evaluate
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { rank: 'S', label: 'メタ解析・SR',   desc: '複数のRCTを統合分析。最も信頼度が高い研究形式。' },
              { rank: 'A', label: 'RCT',            desc: 'ランダム化比較試験。プラセボとの厳密な比較実験。' },
              { rank: 'B', label: 'コホート研究',    desc: '長期追跡による大規模観察研究。関連性を確認。' },
              { rank: 'C', label: '動物・小規模研究', desc: 'ヒトでの大規模検証が不十分。今後に期待。' },
            ].map(({ rank, label, desc }) => (
              <div key={rank}
                className={`ev-${rank.toLowerCase()} border rounded-xl p-4 flex items-start gap-3`}>
                <span className="font-black text-[22px] leading-none w-8 flex-shrink-0">
                  {rank}
                </span>
                <div>
                  <p className="font-semibold text-[13px] mb-1">{label}</p>
                  <p className="text-[12px] opacity-80 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why ─────────────────────────────────── */}
      <section className="border-t border-border bg-card px-5 py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase
            text-muted-foreground text-center mb-12">
            Why SciBase
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {[
              {
                icon: '📄',
                title: '論文だけを根拠にする',
                desc:  'メーカーの自社試験は使わない。査読済み論文のみを根拠にし、研究の質を全成分で透明に示す。',
              },
              {
                icon: '✕',
                title: '「効かない」も正直に',
                desc:  'NMN・ビオチンなど話題の成分も「エビデンスC」と正直に表示。バズっているかどうかで評価しない。',
              },
              {
                icon: '⬆',
                title: 'スキンケアもサプリも',
                desc:  'レチノール・ナイアシンアミドなどの外用成分から、マグネシウム・ビタミンDまで同じ基準で評価。',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title}>
                <span className="text-[24px] mb-4 block">{icon}</span>
                <h3 className="font-semibold text-[16px] text-foreground mb-2">{title}</h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
