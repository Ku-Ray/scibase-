import type { Metadata } from 'next'
import { NutrientSufficiencyClient } from '@/components/NutrientSufficiencyClient'

const BASE_URL = 'https://scibase.app'

const TITLE = '栄養素充足率チェッカー｜食事+サプリでRDA達成率を可視化｜SciBase'
const DESCRIPTION =
  '厚生労働省「日本人の食事摂取基準（2020年版）」をベースに、あなたの食事傾向とサプリ摂取量から15栄養素の1日充足率を概算。不足成分は該当成分ページへ。完全無料・登録不要。'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/tools/nutrient-sufficiency` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${BASE_URL}/tools/nutrient-sufficiency`,
    siteName: 'SciBase',
    locale: 'ja_JP',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

const webAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SciBase 栄養素充足率チェッカー',
  url: `${BASE_URL}/tools/nutrient-sufficiency`,
  description: DESCRIPTION,
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any (Web)',
  browserRequirements: 'Requires JavaScript',
  isAccessibleForFree: true,
  featureList: [
    '厚生労働省 食事摂取基準 2020 年版に基づく 15 栄養素の RDA・AI・UL 参照',
    '13 種の食事傾向 preset（肉魚・野菜・乳製品・コーヒー・アルコール 等）から食事摂取量を概算',
    'サプリ摂取量を統合して充足率を算出',
    '過剰摂取（耐容上限量超過）の警告表示',
    '不足成分は SciBase の該当成分ページへ内部リンク',
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
      name: '本ツールの計算根拠は何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RDA（推奨量）・AI（目安量）・UL（耐容上限量）は厚生労働省「日本人の食事摂取基準（2020年版）」をそのまま採用しています。食事 preset の栄養素貢献量は文部科学省「日本食品標準成分表 2020 年版（八訂）」を参照し、代表的食品 1 食分を概算しています。診断目的ではなく、目安としてご活用ください。',
      },
    },
    {
      '@type': 'Question',
      name: '「不足傾向」と表示されたら、すぐにサプリを飲むべきですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '本ツールは概算値であり、実際の摂取量は食材・調理法・個人差で変動します。まずは食事の調整（不足栄養素を多く含む食品の追加）を検討し、それでも不足が続く場合は医師・管理栄養士にご相談ください。サプリは「食事の補助」として位置付けるのが基本です。',
      },
    },
    {
      '@type': 'Question',
      name: '「過剰摂取注意」が出ました。何をすればよいですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '耐容上限量（UL）の 80% に近づくと警告を表示しています。脂溶性ビタミン（A・D・E）やミネラル（鉄・亜鉛・セレン等）は過剰摂取で健康リスクが生じる可能性があるため、サプリの用量を見直すか、医師・管理栄養士にご相談ください。',
      },
    },
    {
      '@type': 'Question',
      name: '妊娠中・授乳中の必要量は反映されますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '20〜40代女性に限り、ライフステージとして「妊娠中」「授乳中」を選択できます。厚生労働省 食事摂取基準 2020 年版の妊婦・授乳婦の付加量を反映した RDA を表示します。葉酸・鉄・ビタミン A・ヨウ素等は付加量が大きいため、必ず主治医とご相談のうえご活用ください。',
      },
    },
    {
      '@type': 'Question',
      name: 'なぜ食事摂取基準 2020 年版なのですか？2025 年版は使えませんか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '2026 年 6 月時点で、本ツールでは正式公開・全項目確定済みの「2020 年版」を採用しています。2025 年版が公開され、各栄養素の RDA・UL が確定次第、随時アップデート予定です。',
      },
    },
  ],
}

export default function NutrientSufficiencyPage() {
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
      <NutrientSufficiencyClient />
    </>
  )
}
