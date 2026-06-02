import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Star } from 'lucide-react'
import { FavoritesClient } from '@/components/FavoritesClient'

const BASE_URL = 'https://scibase.app'

export const metadata: Metadata = {
  title: 'お気に入り｜気になる成分・コラム・比較を保存',
  description:
    '気になった成分・コラム・成分比較を ⭐ で保存しておけるマイページ。完全無料・登録不要・ブラウザに保存されるので後で見返せる。',
  alternates: { canonical: `${BASE_URL}/my/favorites` },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'お気に入り｜気になる成分・コラム・比較を保存',
    description:
      '気になった成分・コラム・成分比較を ⭐ で保存しておけるマイページ。完全無料・登録不要。',
    url: `${BASE_URL}/my/favorites`,
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
    { '@type': 'ListItem', position: 2, name: 'お気に入り', item: `${BASE_URL}/my/favorites` },
  ],
}

export default function FavoritesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="max-w-2xl mx-auto px-5 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-8">
          <Link href="/" className="hover:underline">ホーム</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">お気に入り</span>
        </nav>

        <header className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">
            My Page
          </p>
          <h1 className="text-[28px] sm:text-[34px] font-semibold text-foreground tracking-tight mb-3 leading-tight inline-flex items-center gap-3">
            <Star className="w-7 h-7 text-yellow-400 fill-yellow-400" />
            お気に入り
          </h1>
          <p className="text-[14px] text-muted-foreground leading-relaxed">
            気になった成分・コラム・成分比較を ⭐ で保存できます。
            <strong className="text-foreground">完全無料・登録不要</strong>・お使いのブラウザに保存され、いつでも見返せます。
          </p>
        </header>

        <FavoritesClient />

        <section className="mt-12 pt-8 border-t border-border">
          <h2 className="font-semibold text-[15px] text-foreground mb-3">お気に入りについて</h2>
          <div className="space-y-3 text-[12.5px] text-muted-foreground leading-relaxed">
            <p>
              ⭐ で保存した成分・コラム・比較ペアは、お使いのブラウザの localStorage に保存されます。
              アカウント登録は不要で、サーバーには送信されません。
            </p>
            <p>
              ブラウザのキャッシュ・閲覧データを消去すると、お気に入りも消えます。
              別のブラウザ・別の端末では引き継がれません。
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
