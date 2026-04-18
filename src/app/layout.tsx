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

const BASE_URL = 'https://scibase.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'SciBase — 論文で選ぶ、成分データベース',
    template: '%s | SciBase',
  },
  description:
    '悩みを選ぶだけで、論文に基づいた成分推薦が分かる。メタ解析・RCT・コホート研究のエビデンスレベルを透明に示す、科学的成分データベース。',
  openGraph: {
    type:        'website',
    locale:      'ja_JP',
    url:         BASE_URL,
    siteName:    'SciBase',
    title:       'SciBase — 論文で選ぶ、成分データベース',
    description: '悩みを選ぶだけで、論文に基づいた成分推薦が分かる。エビデンスレベルを透明に示す科学的成分データベース。',
  },
  twitter: {
    card:        'summary',
    site:        '@scibase_jp',
    title:       'SciBase — 論文で選ぶ、成分データベース',
    description: '悩みを選ぶだけで、論文に基づいた成分推薦が分かる。エビデンスレベルを透明に示す科学的成分データベース。',
  },
  alternates: { canonical: BASE_URL },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type':    'WebSite',
  '@id':      `${BASE_URL}/#website`,
  name:       'SciBase',
  url:        BASE_URL,
  description: '査読済み論文に基づいて美容・健康成分のエビデンスを評価・解説するデータベース',
  publisher:  { '@id': `${BASE_URL}/#organization` },
  inLanguage: 'ja-JP',
  potentialAction: {
    '@type':       'SearchAction',
    target:        `${BASE_URL}/ingredients?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type':    'Organization',
  '@id':      `${BASE_URL}/#organization`,
  name:       'SciBase',
  url:        BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url:     `${BASE_URL}/scibase_logo.png`,
    width:   500,
    height:  500,
  },
  description: '論文エビデンスに基づくスキンケア・サプリメント成分データベース',
  foundingDate: '2026',
  sameAs: ['https://x.com/r_evidence_'],
  founder: {
    '@type':   'Person',
    name:      'SciBase 編集者',
    url:       `${BASE_URL}/about`,
    jobTitle:  '化粧品メーカー研究職',
    sameAs:    ['https://x.com/r_evidence_'],
  },
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <head>
        <meta name="google-site-verification" content="vKNWnktI9eLuZQD_5X2mxxo9ujtpQjFuteHgfq55Cpc" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {GA_ID && (
          <>
            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
              }}
            />
          </>
        )}
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
