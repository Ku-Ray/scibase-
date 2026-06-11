import type { Metadata } from 'next'
import { MyStackClient } from '@/components/MyStackClient'

const BASE_URL = 'https://scibase.app'

const TITLE = 'My Stack｜サプリ棚の飲み合わせ・重複・月額コストを一括チェック｜SciBase'
const DESCRIPTION =
  '飲んでいるサプリを「棚」に登録すると、相互作用（論文・添付文書ベース）・成分の重複・耐容上限・月額コスト・飲むタイミングを一括チェック。棚はブラウザに保存され、いつでも更新できる。完全無料・登録不要。'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/tools/my-stack` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${BASE_URL}/tools/my-stack`,
    siteName: 'SciBase',
    locale: 'ja_JP',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

const webAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SciBase My Stack（サプリ棚チェッカー）',
  url: `${BASE_URL}/tools/my-stack`,
  description: DESCRIPTION,
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any (Web)',
  browserRequirements: 'Requires JavaScript',
  isAccessibleForFree: true,
  featureList: [
    '飲んでいるサプリを棚として登録（用量・タイミング付き・ブラウザ内保存）',
    '棚の成分どうし・服用中の薬との相互作用を論文・添付文書ベースで照合',
    '同じ栄養素の重複と耐容上限量（厚労省 食事摂取基準 2020）の超過チェック',
    '棚全体の月額コスト目安を自動集計',
    '吸収が競合する組み合わせの時間分離を提案',
    '各成分の論文評価・製品比較ページへ内部リンク',
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
      name: '相互作用チェックの根拠は何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SciBase に収載している各成分の相互作用データ（論文・医薬品添付文書・公的データベースに基づき、出典を各成分ページに明記）を使い、棚の中の成分どうし、および選択した服用中の薬と照合しています。収載範囲外の物質や個人の体質による反応は捕捉できないため、併用の最終判断は医師・薬剤師にご相談ください。',
      },
    },
    {
      '@type': 'Question',
      name: '登録した棚のデータはどこに保存されますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '棚の内容はお使いのブラウザ（localStorage）にのみ保存され、サーバーには送信されません。登録不要で利用でき、同じブラウザで再訪すると前回の棚が復元されます。ブラウザのデータ消去で棚も削除されます。',
      },
    },
    {
      '@type': 'Question',
      name: '耐容上限量（UL）の警告はどういう基準ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '厚生労働省「日本人の食事摂取基準（2020年版）」の耐容上限量（UL）を参照し、棚に入力されたサプリの 1 日量の合計が成人の最も厳しい基準の 80% を超えると表示します。UL は年代・性別で異なるため、実際の上限はこれより高い場合があります。気になる場合は医師・管理栄養士にご相談ください。',
      },
    },
    {
      '@type': 'Question',
      name: '月額コストはどう計算していますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SciBase に収載している各成分の評価上位製品の 1 ヶ月あたりコスト（参考値）を合計しています。実際の購入製品・為替・セールにより変動するため、目安としてご活用ください。',
      },
    },
    {
      '@type': 'Question',
      name: '相互作用や上限の警告が出たらどうすればよいですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '表示はレベル分けされた情報提供であり、診断ではありません。要回避・要注意の表示が出た場合や、薬を服用中の場合は、自己判断で中止・継続を決めず、医師・薬剤師に棚の内容を見せて相談することをおすすめします。',
      },
    },
  ],
}

export default function MyStackPage() {
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
      <MyStackClient />
    </>
  )
}
