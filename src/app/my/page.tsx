import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, HeartPulse, Package, Salad, Star } from 'lucide-react'
import { NutrientHistoryClient } from '@/components/NutrientHistoryClient'
import { PhenoAgeHistoryClient } from '@/components/PhenoAgeHistoryClient'
import { FavoritesClient } from '@/components/FavoritesClient'
import { MyStackSummary } from '@/components/MyStackSummary'

const BASE_URL = 'https://scibase.app'

export const metadata: Metadata = {
  title: 'マイページ｜診断結果とお気に入りを集約｜SciBase',
  description:
    '栄養素診断結果・生物学的年齢の計測結果・サプリ棚（My Stack）・お気に入り成分・コラム・成分比較を 1 画面に集約。完全無料・登録不要・ブラウザに自動保存されるので後で見返せる。',
  alternates: { canonical: `${BASE_URL}/my` },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'マイページ｜診断結果とお気に入りを集約｜SciBase',
    description: '栄養素診断結果・生物学的年齢の計測結果・お気に入り成分・コラム・成分比較を 1 画面に集約。完全無料・登録不要。',
    url: `${BASE_URL}/my`,
    siteName: 'SciBase',
    locale: 'ja_JP',
    type: 'website',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'マイページ', item: `${BASE_URL}/my` },
  ],
}

export default function MyDashboardPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="max-w-3xl mx-auto px-5 py-8 sm:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-6">
          <Link href="/" className="hover:underline">ホーム</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">マイページ</span>
        </nav>

        <header className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">
            My Dashboard
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            マイページ
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            診断結果・お気に入りを集約。ブラウザに自動保存されるので、いつでも見返せます。
          </p>
        </header>

        {/* Section 1: 栄養素診断結果 */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground sm:text-xl">
            <Salad className="h-5 w-5 text-emerald-600" />
            栄養素診断の結果
          </h2>
          <NutrientHistoryClient />
        </section>

        {/* Section 2: 生物学的年齢 */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground sm:text-xl">
            <HeartPulse className="h-5 w-5 text-indigo-600" />
            生物学的年齢の結果
          </h2>
          <PhenoAgeHistoryClient />
        </section>

        {/* Section 3: My Stack（サプリ棚） */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground sm:text-xl">
            <Package className="h-5 w-5 text-emerald-600" />
            My Stack（サプリ棚）
          </h2>
          <MyStackSummary />
        </section>

        {/* Section 4: お気に入り */}
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground sm:text-xl">
            <Star className="h-5 w-5 text-amber-500" />
            お気に入り
          </h2>
          <FavoritesClient />
        </section>

        {/* Quick links to tools */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
          <div className="mb-3 text-sm font-bold text-foreground">他の無料ツール</div>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link href="/tools/nutrient-sufficiency"
              className="flex items-center justify-between rounded-lg bg-white px-3 py-2.5 text-sm font-medium text-foreground ring-1 ring-slate-200 transition hover:bg-emerald-50/40 hover:ring-emerald-200">
              <span>🥗 栄養素チェッカー</span><ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>
            <Link href="/tools/phenoage"
              className="flex items-center justify-between rounded-lg bg-white px-3 py-2.5 text-sm font-medium text-foreground ring-1 ring-slate-200 transition hover:bg-emerald-50/40 hover:ring-emerald-200">
              <span>🧬 生物学的年齢チェッカー</span><ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>
            <Link href="/tools/interaction-checker"
              className="flex items-center justify-between rounded-lg bg-white px-3 py-2.5 text-sm font-medium text-foreground ring-1 ring-slate-200 transition hover:bg-emerald-50/40 hover:ring-emerald-200">
              <span>💊 飲み合わせチェッカー</span><ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>
            <Link href="/tools/my-stack"
              className="flex items-center justify-between rounded-lg bg-white px-3 py-2.5 text-sm font-medium text-foreground ring-1 ring-slate-200 transition hover:bg-emerald-50/40 hover:ring-emerald-200">
              <span>🧺 My Stack（サプリ棚）</span><ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>
            <Link href="/analyzer"
              className="flex items-center justify-between rounded-lg bg-white px-3 py-2.5 text-sm font-medium text-foreground ring-1 ring-slate-200 transition hover:bg-emerald-50/40 hover:ring-emerald-200">
              <span>🔬 サプリ Analyzer</span><ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>
            <Link href="/concerns"
              className="flex items-center justify-between rounded-lg bg-white px-3 py-2.5 text-sm font-medium text-foreground ring-1 ring-slate-200 transition hover:bg-emerald-50/40 hover:ring-emerald-200">
              <span>🎯 悩みから探す</span><ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
