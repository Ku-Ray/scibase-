import type { Metadata } from 'next'
import { InteractionCheckerClient } from '@/components/InteractionCheckerClient'

const BASE_URL = 'https://scibase.app'

const TITLE = 'サプリ・薬の飲み合わせチェッカー｜論文ベースで相互作用を可視化｜SciBase'
const DESCRIPTION =
  '飲んでいるサプリと服用中の医薬品を入力するだけで、論文・添付文書ベースの相互作用を「要回避・要注意・経過観察」の3段階で可視化。完全無料・登録不要・医師相談前のスクリーニングに。'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/tools/interaction-checker` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${BASE_URL}/tools/interaction-checker`,
    siteName: 'SciBase',
    locale: 'ja_JP',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SciBase サプリ・薬の飲み合わせチェッカー',
  url: `${BASE_URL}/tools/interaction-checker`,
  description: DESCRIPTION,
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any (Web)',
  browserRequirements: 'Requires JavaScript',
  isAccessibleForFree: true,
  featureList: [
    '500 成分超の data.ts 収載成分から相互作用を抽出',
    '147 canonical 群でカバーされた薬剤クラス検索',
    '要回避・要注意・経過観察の 3 段階表示',
    '論文・添付文書出典を明示',
    '完全無料・登録不要',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  inLanguage: 'ja',
}

export default function InteractionCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InteractionCheckerClient />
    </>
  )
}
