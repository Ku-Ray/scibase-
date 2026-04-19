import { AnalyzerClient } from '@/components/AnalyzerClient'
import type { Metadata } from 'next'

const BASE_URL = 'https://scibase.app'

export const metadata: Metadata = {
  title: 'サプリ診断 | 今のサプリを7軸で評価',
  description: '今飲んでいるサプリメントを入力すると、抗老化・肌・脳・ストレス・睡眠・免疫・代謝の7軸でカバー状況を可視化。不足している成分もレコメンド。',
  alternates: { canonical: `${BASE_URL}/analyzer` },
}

const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SciBase サプリ診断',
  url: `${BASE_URL}/analyzer`,
  description: '今飲んでいるサプリメントを入力すると、抗老化・肌・脳・ストレス・睡眠・免疫・代謝の7軸でカバー状況を可視化し、論文エビデンスに基づく不足成分をレコメンドする無料診断ツール。',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any (Web)',
  browserRequirements: 'Requires JavaScript',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  publisher: { '@type': 'Organization', name: 'SciBase', url: BASE_URL },
  inLanguage: 'ja-JP',
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'サプリ診断', item: `${BASE_URL}/analyzer` },
  ],
}

export default function AnalyzerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <AnalyzerClient />
    </>
  )
}
