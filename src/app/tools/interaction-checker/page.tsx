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

const webAppJsonLd = {
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

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'サプリと薬の飲み合わせはどうやってチェックされますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SciBase に収載された 500 成分超の data.ts の interactions フィールド（添付文書・NCCIH・Cochrane など）と、147 件の主要医薬品クラスの正規表現マッチングで該当する組合せを抽出しています。出典は各結果カードに明記されます。',
      },
    },
    {
      '@type': 'Question',
      name: '「要回避」と表示されたら飲んでいるサプリをやめるべきですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '本ツールは情報提供を目的としており、自己判断での中止は推奨できません。「要回避」は重大なリスクが報告されているケースで、結果を主治医・薬剤師に共有して併用継続の可否を判断してもらうのが最も安全です。',
      },
    },
    {
      '@type': 'Question',
      name: 'ワルファリンを飲んでいます。ビタミンK2サプリは併用できますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ビタミンKはワルファリンの抗凝固作用を打ち消す方向に働くことが添付文書で広く知られています。SciBase でも該当成分は「要回避」レベルで表示されます。納豆・青汁などビタミンKを多く含む食品と同じ扱いになるため、主治医に必ず相談してください。',
      },
    },
    {
      '@type': 'Question',
      name: '降圧薬を飲んでいますが、マグネシウムやCoQ10は大丈夫ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '降圧薬とマグネシウム・CoQ10は理論上の血圧降下作用を持つため「経過観察」レベルで表示されることがあります。著しい血圧低下のリスクを避けるため、開始時は血圧モニタリングを強化し、主治医に伝えるのが安全です。',
      },
    },
    {
      '@type': 'Question',
      name: 'このツールに登録されていない医薬品はどうすればよいですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '主要 147 クラス（降圧薬・糖尿病治療薬・抗凝固薬等）でカバーされていない物質は、該当する一般名・分類で検索してみてください。それでも見つからない場合は、添付文書「相互作用」セクションの確認と薬剤師への直接相談を推奨します。',
      },
    },
  ],
}

export default function InteractionCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <InteractionCheckerClient />
    </>
  )
}
