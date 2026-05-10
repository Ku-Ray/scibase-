import Link from 'next/link'
import { ArrowRight, Trophy, FlaskConical, Search, BarChart2, Microscope, BookOpen, Clock } from 'lucide-react'
import { concerns, ingredients, getIngredientsByConcern } from '@/lib/data'
import { articles } from '@/lib/articles'
import { IngredientCard } from '@/components/IngredientCard'
import { EvidenceBadge } from '@/components/EvidenceBadge'
import { HeroSearch } from '@/components/HeroSearch'
import type { Metadata } from 'next'

const totalPapers = ingredients.reduce((acc, i) => acc + i.papers.length, 0)

export const metadata: Metadata = {
  title: { absolute: '論文で選ぶ成分データベース｜SciBase' },
  description: `スキンケア・サプリ成分を査読済み論文で評価。メタ解析・RCT・コホート研究から${ingredients.length}成分・${totalPapers}件の論文で「本当に効く成分」を可視化。広告や口コミではなくエビデンスで選ぶ。`,
  alternates: { canonical: 'https://scibase.app' },
}

const TOP_CONCERNS = ['spots', 'wrinkles', 'dry-skin', 'acne', 'pores', 'skin-aging', 'sleep', 'stress', 'longevity', 'inflammation']
const HERO_FEATURED_CONCERNS = ['skin-aging', 'longevity', 'sleep']
const HERO_FEATURED_INGREDIENTS = ['ashwagandha', 'magnesium-glycinate', 'lions-mane']

export default function Home() {
  const topIngredients = [...ingredients]
    .sort((a, b) =>
      ({ S: 0, A: 1, B: 2, C: 3 }[a.evidenceRank] - { S: 0, A: 1, B: 2, C: 3 }[b.evidenceRank])
    )
    .slice(0, 6)

  const featuredConcerns = concerns.filter(c => TOP_CONCERNS.includes(c.slug))

  const heroFeaturedConcerns = HERO_FEATURED_CONCERNS
    .map(slug => concerns.find(c => c.slug === slug))
    .filter((c): c is typeof concerns[number] => Boolean(c))

  const heroFeaturedIngredients = HERO_FEATURED_INGREDIENTS
    .map(slug => ingredients.find(i => i.slug === slug))
    .filter((i): i is typeof ingredients[number] => Boolean(i))

  /* ランキングプレビュー用：悩み上位3件 × 各1位成分 */
  const rankingPreviews = ['spots', 'wrinkles', 'acne', 'dry-skin', 'pores', 'sleep'].map(slug => {
    const c = concerns.find(c => c.slug === slug)
    const top = getIngredientsByConcern(slug)[0]
    return c && top ? { concern: c, top } : null
  }).filter(Boolean) as { concern: typeof concerns[0]; top: typeof ingredients[0] }[]

  return (
    <>
      {/* ── Hero ──（mybest型 centered + 装飾散らし）─────── */}
      <section className="hero-pattern relative px-5 py-20 sm:py-28 overflow-hidden">

        {/* ─── 装飾散らし（desktop のみ・テキスト周辺の余白を埋める） ─── */}
        {/* 左上：単体 hex */}
        <svg aria-hidden="true"
          className="hidden md:block absolute left-[5%] top-[14%] w-16 h-16 opacity-35 select-none pointer-events-none"
          viewBox="0 0 64 64" fill="none">
          <polygon points="32,4 56,18 56,46 32,60 8,46 8,18"
            stroke="#3D2B5C" strokeWidth="1.5" fill="none"/>
          <circle cx="32" cy="32" r="3" fill="#C4A882"/>
        </svg>

        {/* 右上：紙片 + カプセル */}
        <div aria-hidden="true"
          className="hidden md:block absolute right-[6%] top-[10%] w-32 opacity-55 select-none pointer-events-none">
          <svg viewBox="0 0 100 124" fill="none" className="w-full">
            <g transform="rotate(8 50 62)">
              <rect x="6" y="6" width="88" height="112" rx="2" fill="#FFFFFF" stroke="#D4C4A6" strokeWidth="1"/>
              <line x1="14" y1="24" x2="78" y2="24" stroke="#3D2B5C" strokeWidth="1" opacity="0.45"/>
              <line x1="14" y1="36" x2="70" y2="36" stroke="#3D2B5C" strokeWidth="1" opacity="0.45"/>
              <line x1="14" y1="48" x2="76" y2="48" stroke="#3D2B5C" strokeWidth="1" opacity="0.3"/>
              <line x1="14" y1="60" x2="60" y2="60" stroke="#3D2B5C" strokeWidth="1" opacity="0.3"/>
              <line x1="14" y1="72" x2="72" y2="72" stroke="#3D2B5C" strokeWidth="1" opacity="0.3"/>
              <line x1="14" y1="84" x2="50" y2="84" stroke="#3D2B5C" strokeWidth="1" opacity="0.3"/>
              <rect x="14" y="96" width="52" height="6" rx="1" fill="#3D2B5C" opacity="0.08"/>
            </g>
          </svg>
        </div>

        {/* 左下：hex 連結ネットワーク */}
        <svg aria-hidden="true"
          className="hidden md:block absolute left-[4%] bottom-[10%] w-56 h-32 opacity-40 select-none pointer-events-none"
          viewBox="0 0 224 128" fill="none">
          <g stroke="#3D2B5C" strokeWidth="1.5" fill="none">
            <polygon points="40,8 68,24 68,56 40,72 12,56 12,24"/>
            <polygon points="96,24 124,40 124,72 96,88 68,72 68,40" opacity="0.7"/>
            <polygon points="152,8 180,24 180,56 152,72 124,56 124,24" opacity="0.55" strokeDasharray="3 2"/>
            <polygon points="68,72 96,88 96,120 68,136 40,120 40,88" opacity="0.45"/>
          </g>
          <circle cx="68" cy="24" r="3" fill="#C4A882"/>
          <circle cx="68" cy="56" r="3" fill="#C4A882"/>
          <circle cx="124" cy="40" r="3" fill="#C4A882" opacity="0.7"/>
        </svg>

        {/* 右下：カプセル + 水滴 */}
        <div aria-hidden="true"
          className="hidden md:block absolute right-[5%] bottom-[14%] opacity-55 select-none pointer-events-none">
          <svg viewBox="0 0 120 80" fill="none" className="w-32 h-20">
            <g transform="rotate(-18 60 32)">
              <rect x="6" y="22" width="92" height="22" rx="11" fill="#C4A882"/>
              <path d="M 36 22 L 17 22 A 11 11 0 0 0 17 44 L 36 44 Z" fill="#3D2B5C"/>
              <line x1="50" y1="26" x2="84" y2="26" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
            </g>
            <g transform="translate(78 60)">
              <path d="M 0 0 C -5 -8, -8 -13, 0 -19 C 8 -13, 5 -8, 0 0 Z" fill="#3D2B5C" opacity="0.55"/>
            </g>
          </svg>
        </div>

        {/* ドット constellation（中央上の余白） */}
        <svg aria-hidden="true"
          className="hidden md:block absolute right-[34%] top-[8%] w-12 h-12 opacity-30 select-none pointer-events-none"
          viewBox="0 0 48 48" fill="#3D2B5C">
          <circle cx="6" cy="6" r="1.6"/>
          <circle cx="20" cy="14" r="1.2"/>
          <circle cx="36" cy="6" r="1.4"/>
          <circle cx="12" cy="28" r="1"/>
          <circle cx="30" cy="32" r="1.4"/>
          <circle cx="42" cy="22" r="1"/>
        </svg>

        {/* ─── 中央コンテンツ（mybest型）─── */}
        <div className="relative max-w-3xl mx-auto text-center">

          <p className="text-[12px] font-medium tracking-[0.08em]
            text-muted-foreground mb-5">
            論文で選ぶスキンケア・サプリ成分データベース
          </p>

          <h1 className="text-[40px] sm:text-[60px] font-bold text-foreground
            leading-[1.12] tracking-tight break-keep mb-5">
            本当に効く成分を、<br className="hidden sm:block" />
            論文で。
          </h1>

          <p className="text-[15px] sm:text-[17px] text-muted-foreground leading-[1.85]
            max-w-xl mx-auto mb-8">
            査読済み論文だけで評価した、スキンケア・サプリ成分のデータベース。
            <span className="font-medium text-foreground whitespace-nowrap">{ingredients.length}成分・{totalPapers}論文</span>。
          </p>

          {/* 大型検索（mybest式・主役） */}
          <div className="max-w-xl mx-auto mb-6
            shadow-[0_20px_48px_-24px_rgba(61,43,92,0.30)] rounded-2xl">
            <HeroSearch />
          </div>

          {/* 2択CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-3">
            <Link
              href="/concerns"
              className="inline-flex items-center gap-2 bg-foreground text-background
                text-[13px] font-semibold rounded-xl px-5 py-3 min-h-[44px]
                hover:opacity-85 transition-opacity w-full sm:w-auto justify-center"
            >
              🔍 悩みから成分を探す
            </Link>
            <Link
              href="/analyzer"
              className="inline-flex items-center gap-2 bg-card border border-border text-foreground
                text-[13px] font-medium rounded-xl px-5 py-3 min-h-[44px]
                hover:border-accent hover:text-accent transition-colors w-full sm:w-auto justify-center"
            >
              🔬 今のサプリを診断する
            </Link>
          </div>
          <p className="text-[12px] text-muted-foreground mb-7">
            初めての方は <span className="font-medium text-foreground">「悩みから探す」</span> から
          </p>

          {/* 統計（中央 inline） */}
          <div className="flex items-center justify-center gap-6
            text-[12px] text-muted-foreground">
            <span><strong className="text-foreground font-semibold">{ingredients.length}</strong> 成分</span>
            <span className="w-px h-3 bg-border" />
            <span><strong className="text-foreground font-semibold">{concerns.length}</strong> 悩みカテゴリ</span>
            <span className="w-px h-3 bg-border" />
            <span><strong className="text-foreground font-semibold">{totalPapers}</strong> 論文</span>
          </div>
        </div>

        {/* mobile 専用：main SVG をテキスト下に表示（card なし） */}
        <div className="sm:hidden flex justify-center mt-10 relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero/lab-still-life.svg"
            alt=""
            width={600}
            height={600}
            loading="eager"
            decoding="async"
            className="w-[90%] max-w-[360px] h-auto select-none pointer-events-none"
          />
        </div>

          {/* 悩みタグ：grid 下にフル幅で配置 */}
          <div className="mt-12 sm:mt-16 text-center">
            <p className="text-[11px] text-muted-foreground mb-3 tracking-wider font-medium">
              悩みから探す
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {featuredConcerns.map((c) => (
                <Link
                  key={c.slug}
                  href={`/concerns/${c.slug}`}
                  className={`group inline-flex items-center gap-1.5 border
                    text-[13px] font-medium rounded-full px-4 py-2.5 min-h-[44px]
                    hover:scale-105 hover:shadow-sm transition-all duration-150 cat-${c.category}`}
                >
                  <span>{c.emoji}</span>
                  {c.nameJa}
                </Link>
              ))}
            </div>
          </div>
      </section>

      {/* ── よく見られている悩み（データ駆動ショートカット） ─── */}
      <section className="border-t border-border px-5 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="font-semibold text-[20px] text-foreground">よく見られている悩み</h2>
            <Link href="/concerns"
              className="text-[13px] text-accent flex items-center gap-1 hover:underline">
              すべて <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-[13px] text-muted-foreground mb-8">
            このサイトで最も読まれている3テーマから、論文ベースの成分を見つける
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {heroFeaturedConcerns.map(c => {
              const ings = getIngredientsByConcern(c.slug)
              const sCount = ings.filter(i => i.evidenceRank === 'S').length
              return (
                <Link
                  key={c.slug}
                  href={`/concerns/${c.slug}`}
                  className={`group border rounded-2xl p-5 cat-${c.category}
                    hover:-translate-y-0.5 hover:shadow-md transition-all duration-200`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[22px] leading-none">{c.emoji}</span>
                    <p className="font-semibold text-[16px]">
                      {c.nameJa}
                    </p>
                  </div>
                  <p className="text-[12px] opacity-80 line-clamp-2 leading-relaxed mb-3">
                    {c.description}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] opacity-80">
                    <span>{ings.length}成分</span>
                    {sCount > 0 && (
                      <span className="font-semibold bg-amber-100 text-amber-700 rounded px-1.5 py-0.5 leading-none">
                        S×{sCount}
                      </span>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 今読まれている成分 ─────────────────────── */}
      <section className="border-t border-border bg-card px-5 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="font-semibold text-[20px] text-foreground">今読まれている成分</h2>
            <Link href="/ingredients"
              className="text-[13px] text-accent flex items-center gap-1 hover:underline">
              すべて <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-[13px] text-muted-foreground mb-8">
            直近で検索・閲覧が多い成分から
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {heroFeaturedIngredients.map(ing => (
              <Link
                key={ing.slug}
                href={`/ingredients/${ing.slug}`}
                className="group bg-background border border-border rounded-2xl p-5
                  hover:border-accent/50 hover:shadow-md transition-all duration-200
                  hover:-translate-y-0.5"
              >
                <div className="mb-3">
                  <EvidenceBadge rank={ing.evidenceRank} variant="chip" />
                </div>
                <p className="font-semibold text-[16px] text-foreground mb-2
                  group-hover:text-accent transition-colors">
                  {ing.nameJa}
                </p>
                <p className="text-[12px] text-muted-foreground line-clamp-3 leading-relaxed">
                  {ing.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 診断ツール CTAバナー ─────────────────── */}
      <section className="border-t border-border px-5 py-12">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/analyzer"
            className="group block border-2 border-accent/40 bg-accent/5 rounded-2xl
              p-6 sm:p-10 hover:bg-accent/10 hover:border-accent/60
              transition-all duration-200"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
              <div className="flex-1">
                <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-accent mb-2">
                  Analyzer
                </p>
                <h2 className="font-bold text-[20px] sm:text-[24px] text-foreground leading-tight mb-2">
                  あなたの悩みに合う成分を、3つに絞る
                </h2>
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  {ingredients.length}成分 / {concerns.length}悩み / 論文ベース・会員登録不要
                </p>
              </div>
              <span className="inline-flex items-center gap-2 bg-foreground text-background
                text-[14px] font-semibold rounded-xl px-5 py-3 min-h-[44px] flex-shrink-0
                group-hover:opacity-85 transition-opacity">
                診断を始める <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── このサイトの使い方 ─────────────────────── */}
      <section className="border-t border-border px-5 py-14">
        <div className="max-w-3xl mx-auto">
          <p className="text-[13px] font-semibold tracking-[0.05em]
            text-muted-foreground text-center mb-10">
            SciBaseの使い方
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                num: '01',
                href: '/concerns',
                icon: Search,
                title: '悩みから探す',
                desc: 'シミ・乾燥・睡眠など気になる悩みを選ぶと、その悩みに効果がエビデンスで確認されている成分が分かる。',
                cta: '悩みから探す →',
                accent: 'group-hover:border-rose-300 group-hover:shadow-rose-100/60',
                numColor: 'text-rose-500',
                iconColor: 'text-rose-400',
              },
              {
                num: '02',
                href: '/ranking',
                icon: BarChart2,
                title: 'ランキングで比べる',
                desc: '同じ悩みに対して複数の成分を論文エビデンスの強さ順にランキング。何を選べばいいか一目で分かる。',
                cta: 'ランキングを見る →',
                accent: 'group-hover:border-amber-300 group-hover:shadow-amber-100/60',
                numColor: 'text-amber-600',
                iconColor: 'text-amber-500',
              },
              {
                num: '03',
                href: '/analyzer',
                icon: Microscope,
                title: '今のサプリを診断する',
                desc: '現在摂っているサプリを選ぶと、7軸（抗老化・肌・認知・ストレス・睡眠・免疫・代謝）でスコア診断。',
                cta: '診断してみる →',
                accent: 'group-hover:border-accent/50 group-hover:shadow-emerald-100/60',
                numColor: 'text-emerald-600',
                iconColor: 'text-accent',
              },
            ].map(({ num, href, icon: Icon, title, desc, cta, accent, numColor, iconColor }) => (
              <Link key={num} href={href}
                className={`group bg-card border border-border rounded-2xl p-5
                  hover:shadow-lg transition-all duration-200
                  hover:-translate-y-1 ${accent}`}>
                <div className="flex items-start justify-between mb-4">
                  <p className={`text-[36px] font-black tabular-nums leading-none ${numColor}`}>
                    {num}
                  </p>
                  <Icon className={`w-5 h-5 mt-1.5 ${iconColor} opacity-70`} />
                </div>
                <h2 className="font-semibold text-[15px] text-foreground mb-2
                  group-hover:text-accent transition-colors">
                  {title}
                </h2>
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

      {/* ── 注目・新着成分 ──────────────────────────── */}
      <section className="border-t border-border px-5 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline justify-between mb-8">
            <div className="flex items-center gap-2.5">
              <Microscope className="w-5 h-5 text-muted-foreground" />
              <h2 className="font-semibold text-[20px] text-foreground">注目成分</h2>
            </div>
            <Link href="/ingredients"
              className="text-[13px] text-accent flex items-center gap-1 hover:underline">
              すべて <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-[13px] text-muted-foreground mb-6 -mt-4">
            新着・エビデンスランクSの主要成分
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {topIngredients.map((ing) => (
              <Link
                key={ing.slug}
                href={`/ingredients/${ing.slug}`}
                className="group bg-card border border-border rounded-2xl p-4
                  hover:border-accent/50 hover:shadow-md transition-all duration-200
                  hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-2">
                  <EvidenceBadge rank={ing.evidenceRank} variant="chip" />
                  {ing.emerging && (
                    <span className="text-[10px] font-semibold text-amber-600 bg-amber-50
                      border border-amber-200 rounded-full px-2 py-0.5">
                      注目
                    </span>
                  )}
                </div>
                <p className="font-semibold text-[15px] text-foreground mb-1
                  group-hover:text-accent transition-colors">
                  {ing.nameJa}
                </p>
                <p className="text-[12px] text-muted-foreground line-clamp-2 leading-relaxed">
                  {ing.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 新着コラム ───────────────────────────── */}
      <section className="border-t border-border px-5 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline justify-between mb-8">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-muted-foreground" />
              <h2 className="font-semibold text-[20px] text-foreground">コラム</h2>
            </div>
            <Link href="/articles"
              className="text-[13px] text-accent flex items-center gap-1 hover:underline">
              すべて <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-[13px] text-muted-foreground mb-6 -mt-4">
            「なぜ効くのか」「何を選ぶのか」を論文で解説
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {articles.slice(0, 3).map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group border border-border rounded-2xl p-5 bg-card
                  hover:-translate-y-0.5 hover:shadow-md transition-all duration-150"
              >
                <div className="flex items-center gap-1.5 mb-3 text-[11px] text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{article.readingMinutes}分</span>
                  <span>·</span>
                  <span>{article.categoryLabel}</span>
                </div>
                <p className="font-semibold text-[14px] text-foreground leading-snug mb-3
                  group-hover:text-accent transition-colors line-clamp-2">
                  {article.title}
                </p>
                <div className="bg-secondary rounded-lg px-3 py-2">
                  <span className="block text-[18px] font-black text-foreground tabular-nums leading-none mb-0.5">
                    {article.heroStat.value}
                  </span>
                  <span className="block text-[10px] text-muted-foreground leading-tight line-clamp-1">
                    {article.heroStat.label}
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
            {concerns.map((c) => {
              const concernIngredients = getIngredientsByConcern(c.slug)
              const sCount = concernIngredients.filter(i => i.evidenceRank === 'S').length
              return (
              <Link
                key={c.slug}
                href={`/concerns/${c.slug}`}
                className={`group border rounded-xl px-4 py-3.5
                  hover:-translate-y-0.5 hover:shadow-md transition-all duration-150
                  cat-${c.category}`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[18px] leading-none">{c.emoji}</span>
                  <p className="font-semibold text-[13px] truncate">
                    {c.nameJa}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-7">
                  <p className="text-[11px] opacity-70">
                    {concernIngredients.length}成分
                  </p>
                  {sCount > 0 && (
                    <span className="text-[10px] font-semibold bg-amber-100 text-amber-700 rounded px-1.5 py-0.5 leading-none">
                      S×{sCount}
                    </span>
                  )}
                </div>
              </Link>
              )
            })}
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
          <p className="text-[13px] font-semibold tracking-[0.05em]
            text-muted-foreground text-center mb-12">
            エビデンスの4段階評価
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
          <p className="text-[13px] font-semibold tracking-[0.05em]
            text-muted-foreground text-center mb-12">
            SciBaseが選ばれる理由
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
