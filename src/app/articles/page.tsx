import Link from 'next/link'
import { ChevronRight, Clock, ArrowRight } from 'lucide-react'
import { articles } from '@/lib/articles'
import type { Metadata } from 'next'

const BASE_URL = 'https://scibase.app'

export const metadata: Metadata = {
  title: 'コラム｜老化・成分・習慣を論文で解説',
  description:
    'コラーゲン・NAD+・睡眠と老化など、スキンケア・サプリ・老化対策のテーマを論文エビデンスで解説するコラム。成分データベースへの入口として活用できます。',
  alternates: { canonical: `${BASE_URL}/articles` },
}

const categoryColor: Record<string, string> = {
  'anti-aging': 'bg-amber-50 text-amber-700 border-amber-200',
  skin:         'bg-rose-50 text-rose-700 border-rose-200',
  sleep:        'bg-indigo-50 text-indigo-700 border-indigo-200',
  supplement:   'bg-emerald-50 text-emerald-700 border-emerald-200',
}

export default function ArticlesPage() {
  const totalPaperRefs = articles.reduce((acc, a) => acc + a.ingredients.length, 0)

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-8">
        <Link href="/" className="hover:underline">ホーム</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">コラム</span>
      </nav>

      {/* Hero — 損失回避 + アンカリング */}
      <div className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">
          論文エビデンスで解説
        </p>
        <h1 className="text-[28px] sm:text-[34px] font-bold text-foreground tracking-tight leading-[1.2] mb-4">
          「なんとなく良さそう」から<br className="sm:hidden" />
          抜け出す
        </h1>
        <p className="text-[14px] text-muted-foreground leading-relaxed max-w-xl mb-6">
          口コミでも広告でもなく、査読済み論文を根拠に成分・老化・習慣を解説する。
          情報が多いほど選択が難しくなる時代に、判断の軸を持つためのコラム。
        </p>

        {/* 数値バッジ（アンカリング） */}
        <div className="flex flex-wrap gap-5 text-[13px]">
          {[
            { value: String(articles.length),   label: '本のコラム' },
            { value: String(totalPaperRefs),     label: '成分を解説' },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-baseline gap-1.5">
              <span className="text-[22px] font-black text-foreground tabular-nums">{value}</span>
              <span className="text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: 'all', label: 'すべて' },
          { key: 'skin', label: '肌老化' },
          { key: 'anti-aging', label: 'アンチエイジング' },
          { key: 'supplement', label: 'サプリ入門' },
          { key: 'sleep', label: '睡眠' },
        ].map(({ key, label }) => (
          <a key={key} href={key === 'all' ? '/articles' : `/articles?cat=${key}`}
            className={`text-[12px] font-medium px-3 py-1.5 rounded-full border transition-all
              ${categoryColor[key] ?? 'bg-secondary text-muted-foreground border-border'}
              hover:opacity-80`}>
            {label}
          </a>
        ))}
      </div>

      {/* Article List */}
      <div className="space-y-4">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group block border border-border rounded-2xl p-6
              hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 bg-card"
          >
            {/* Category + Reading time */}
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border
                ${categoryColor[article.category] ?? 'bg-secondary text-muted-foreground border-border'}`}>
                {article.categoryLabel}
              </span>
              <span className="flex items-center gap-1 text-[12px] text-muted-foreground">
                <Clock className="w-3 h-3" />
                {article.readingMinutes}分
              </span>
            </div>

            {/* Title */}
            <h2 className="font-bold text-[16px] sm:text-[17px] text-foreground leading-snug mb-2
              group-hover:opacity-80 transition-opacity">
              {article.title}
            </h2>

            {/* Loss aversion hook */}
            <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2 mb-4">
              {article.lossAversionHook}
            </p>

            {/* Hero stat + Arrow */}
            <div className="flex items-end justify-between gap-4">
              <div className="bg-secondary border border-border rounded-xl px-4 py-2.5 min-w-0">
                <span className="block text-[18px] font-black text-foreground tabular-nums leading-none mb-0.5">
                  {article.heroStat.value}
                </span>
                <span className="block text-[11px] text-muted-foreground leading-tight">
                  {article.heroStat.label}
                </span>
              </div>
              <span className="flex items-center gap-1.5 text-[13px] font-semibold text-accent
                group-hover:gap-2.5 transition-all flex-shrink-0">
                読む <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA → Analyzer */}
      <div className="mt-12 bg-secondary border border-border rounded-2xl p-6">
        <p className="font-semibold text-[15px] text-foreground mb-2">
          記事を読んだら、今のサプリを診断する
        </p>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">
          7軸（抗老化・肌・脳・ストレス・睡眠・免疫・代謝）でカバーできていない軸を見つける。
          足りている成分を重複購入しているだけ、という状態を防ぐ。
        </p>
        <Link
          href="/analyzer"
          className="inline-flex items-center gap-2 text-[14px] font-semibold
            bg-foreground text-background rounded-xl px-5 py-3
            hover:opacity-85 transition-opacity"
        >
          今のサプリを診断する
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 関連リンク */}
      <div className="mt-10 pt-8 border-t border-border flex flex-wrap gap-4 text-[13px]">
        <Link href="/ingredients" className="text-accent hover:underline">成分一覧 →</Link>
        <Link href="/ranking"     className="text-accent hover:underline">ランキング →</Link>
        <Link href="/concerns"    className="text-accent hover:underline">悩みから探す →</Link>
      </div>
    </div>
  )
}
