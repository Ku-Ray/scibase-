import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BottomNav } from '@/components/BottomNav'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto',
})

const BASE_URL = 'https://agescience.jp'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Agescience — サプリの「本当に効く」を、論文で確かめる',
    template: '%s | Agescience',
  },
  description:
    '悩みを選ぶだけで、論文に基づいたサプリメント推薦が分かる。メタ解析・RCT・コホート研究のエビデンスレベルを透明に示す、科学的サプリ推薦データベース。',
  openGraph: {
    type:        'website',
    locale:      'ja_JP',
    url:         BASE_URL,
    siteName:    'Agescience',
    title:       'Agescience — サプリの「本当に効く」を、論文で確かめる',
    description: '悩みを選ぶだけで、論文に基づいたサプリメント推薦が分かる。エビデンスレベルを透明に示す科学的サプリ推薦データベース。',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card:        'summary_large_image',
    site:        '@agescience_jp',
    title:       'Agescience — サプリの「本当に効く」を、論文で確かめる',
    description: '悩みを選ぶだけで、論文に基づいたサプリメント推薦が分かる。エビデンスレベルを透明に示す科学的サプリ推薦データベース。',
    images:      ['/og-default.png'],
  },
  alternates: { canonical: BASE_URL },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type':    'WebSite',
  name:       'Agescience',
  url:        BASE_URL,
  description: '査読済み論文に基づいてサプリメントのエビデンスを評価・解説するデータベース',
  potentialAction: {
    '@type':       'SearchAction',
    target:        `${BASE_URL}/ingredients?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-[var(--font-noto),_'Hiragino_Sans',_system-ui,_sans-serif] flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-1 pb-16 sm:pb-0">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  )
}
