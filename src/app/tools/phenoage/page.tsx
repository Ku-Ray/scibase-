import type { Metadata } from 'next'
import { PhenoAgeClient } from '@/components/PhenoAgeClient'

const BASE_URL = 'https://scibase.app'

const TITLE = '生物学的年齢チェッカー｜健診の採血値で身体の年齢を概算｜SciBase'
const DESCRIPTION =
  'Levine 2018（Aging）の PhenoAge 式をベースに、健康診断の採血 9 項目から「身体の年齢」の研究指標を概算。生活習慣レイヤーで参考値の変化も確認できます。完全無料・登録不要。医学的診断ではありません。'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/tools/phenoage` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${BASE_URL}/tools/phenoage`,
    siteName: 'SciBase',
    locale: 'ja_JP',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

const webAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SciBase 生物学的年齢チェッカー',
  url: `${BASE_URL}/tools/phenoage`,
  description: DESCRIPTION,
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any (Web)',
  browserRequirements: 'Requires JavaScript',
  isAccessibleForFree: true,
  featureList: [
    'Levine 2018 PhenoAge 式に基づく生物学的年齢の概算',
    '健診の採血 9 項目（アルブミン・クレアチニン・血糖・CRP・リンパ球率・MCV・RDW・ALP・WBC）から算出',
    '推定の信頼区間を表示（任意項目の入力で区間が狭まる）',
    '生活習慣レイヤー（喫煙・運動・睡眠・握力・腹囲・食事）で参考値の変化を確認',
    'タイプ判定と結果の X シェア',
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
      name: '「生物学的年齢」とは何ですか？診断ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '本ツールが示す生物学的年齢は、Levine ME らが 2018 年に Aging 誌で発表した PhenoAge 式をベースにした研究指標です。採血データから推定する「身体の状態の目安」であり、医学的な診断や寿命の予測ではありません。原式は主に 40〜80 歳の集団で検証されているため、若年層では実年齢より低めに出る傾向があります。',
      },
    },
    {
      '@type': 'Question',
      name: 'どの検査値が必要ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '必須は 7 項目（アルブミン・クレアチニン・空腹時血糖・リンパ球率・MCV・ALP・白血球数）です。CRP と RDW は任意で、入力すると推定の信頼区間が狭まります。未入力でも人口平均値で補完して計算できます。いずれも一般的な健康診断・人間ドックで測定される項目です。',
      },
    },
    {
      '@type': 'Question',
      name: 'CRP の単位は mg/dL と mg/L のどちらですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '本ツールは日本の健診で標準の mg/dL で入力を受け付けます（基準値 0.30 mg/dL 未満）。PhenoAge の原式も CRP を mg/dL（formula-native）で扱うため、単位変換は不要です。',
      },
    },
    {
      '@type': 'Question',
      name: '生活習慣レイヤーの「歳数」はどう計算していますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '喫煙・身体活動・睡眠・握力・腹囲・食事の各項目について、査読コホート由来の全死因ハザード比（HR）を「Δage ≈ ln(HR)/ln(2) × 8（死亡率倍加時間）」で歳数に換算した参考値です。採血ベースの年齢とは分離した別レイヤーとして表示し、採血の数値は変更しません。医学的な保証ではなく統計的な推定です。',
      },
    },
    {
      '@type': 'Question',
      name: 'クレアチニンが高いと結果が出ないのはなぜですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'クレアチニン値が性別の正常範囲を超えている場合、腎機能の評価には医療機関での検査が必要なため、医師相談をおすすめする案内を優先表示します。生物学的年齢はあくまで研究指標であり、この場合はまず医師にご相談ください。',
      },
    },
  ],
}

export default function PhenoAgePage() {
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
      <PhenoAgeClient />
    </>
  )
}
