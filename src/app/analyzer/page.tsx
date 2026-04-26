import { AnalyzerClient } from '@/components/AnalyzerClient'
import type { Metadata } from 'next'

const BASE_URL = 'https://scibase.app'

export const metadata: Metadata = {
  title: 'サプリ診断｜論文で選ぶ自分に必要な成分が3問でわかる',
  description:
    '飲んでいるサプリ or 悩みを選ぶだけで、抗老化・肌・脳・ストレス・睡眠・免疫・代謝の7軸を論文エビデンスで評価。Sランク〜Cランクで自分に必要な成分が見える。完全無料・登録不要・所要3分。',
  alternates: { canonical: `${BASE_URL}/analyzer` },
  openGraph: {
    title: 'サプリ診断｜論文で選ぶ自分に必要な成分が3問でわかる',
    description:
      '飲んでいるサプリ or 悩みを選ぶだけで7軸を論文エビデンスで評価。Sランク〜Cランクで自分に必要な成分が見える。完全無料・登録不要。',
    url: `${BASE_URL}/analyzer`,
    siteName: 'SciBase',
    locale: 'ja_JP',
    type: 'website',
  },
}

const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SciBase サプリ診断',
  url: `${BASE_URL}/analyzer`,
  description:
    '飲んでいるサプリ or 悩みを選ぶだけで、抗老化・肌・脳・ストレス・睡眠・免疫・代謝の7軸を論文エビデンスで評価。Sランク〜Cランクで自分に必要な成分が見える、完全無料・登録不要のサプリメント診断ツール。',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Any (Web)',
  browserRequirements: 'Requires JavaScript',
  isAccessibleForFree: true,
  featureList: [
    '7軸スコアリング（抗老化・肌・脳・ストレス・睡眠・免疫・代謝）',
    '論文エビデンスランク（S/A/B/C）に基づく評価',
    '使用中サプリの過不足を可視化',
    '悩みから推奨成分Top3を提示',
    '無料・登録不要',
  ],
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

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'SciBase サプリ診断とは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '使用中のサプリ or 悩みを選ぶだけで、抗老化・肌老化・脳・ストレス・睡眠・免疫・代謝の7軸を論文エビデンスで自動評価し、不足している成分とエビデンスランクS〜Cの推奨成分Top3を提示する無料の診断ツールです。',
      },
    },
    {
      '@type': 'Question',
      name: '診断には何分かかりますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '所要3分です。「成分から」モードは飲んでいるサプリを選ぶだけ、「悩みから」モードは1〜3個の悩みを選ぶだけで結果が出ます。会員登録・メールアドレス入力は不要です。',
      },
    },
    {
      '@type': 'Question',
      name: '評価の根拠はどこから来ていますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'メタ解析・RCT（ランダム化比較試験）・コホート研究を中心に、各成分にエビデンスランクS（複数のメタ解析で再現性確認）/A（複数のRCT）/B（規模が小さい・収束途上）/C（ヒト試験が乏しい）を独自に付与しています。査読されていない自社試験・症例報告は使用していません。',
      },
    },
    {
      '@type': 'Question',
      name: '医師の診断の代わりになりますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'いいえ。本ツールは一般情報の提供を目的としており、個別の医療相談・診断・治療方針の代替ではありません。処方薬を服用中・妊娠中・授乳中の方は、必ず医師・薬剤師に相談してください。',
      },
    },
    {
      '@type': 'Question',
      name: '料金はかかりますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '完全無料です。会員登録・メールアドレス入力・課金は一切ありません。',
      },
    },
  ],
}

export default function AnalyzerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <header className="max-w-2xl mx-auto px-5 pt-10 pb-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">
          Supplement Analyzer
        </p>
        <h1 className="text-[28px] sm:text-[34px] font-bold text-foreground tracking-tight mb-3 leading-tight">
          サプリ診断｜論文で選ぶ自分に必要な成分
        </h1>
        <p className="text-[14px] text-muted-foreground leading-relaxed mb-4">
          飲んでいるサプリ or 悩みを選ぶだけで、<strong className="text-foreground">7軸（抗老化・肌・脳・ストレス・睡眠・免疫・代謝）</strong>を論文エビデンスで評価。エビデンスランクS〜Cで自分に必要な成分が見える。
        </p>
        <ul className="flex flex-wrap gap-2 text-[12px]">
          <li className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-foreground font-medium">
            完全無料・登録不要
          </li>
          <li className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-foreground font-medium">
            所要3分
          </li>
          <li className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-foreground font-medium">
            メタ解析・RCT準拠
          </li>
        </ul>
      </header>

      <AnalyzerClient />

      <section className="max-w-2xl mx-auto px-5 pb-16 pt-4">
        <h2 className="text-[18px] sm:text-[20px] font-bold text-foreground mb-4">
          サプリ診断について
        </h2>
        <div className="space-y-5 text-[14px] leading-relaxed text-foreground">
          <div>
            <h3 className="font-semibold mb-1">7軸スコアリングの仕組み</h3>
            <p className="text-muted-foreground">
              抗老化・肌老化・脳・ストレス・睡眠・免疫・代謝の7軸それぞれで、選択した成分の論文エビデンスランク（S=メタ解析複数で再現確認、A=複数RCT、B=規模小・収束途上、C=ヒト試験乏しい）に基づき0〜10のスコアを算出。複数成分を組み合わせた時の重複・不足が一目でわかる。
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">「悩みから」モードの推奨ロジック</h3>
            <p className="text-muted-foreground">
              1〜3個の悩みを選ぶと、論文エビデンスが一致する成分Top3を提示。複数の悩みで重複する成分（横断的に効く成分）を優先する設計。エビデンスランクと優先順位ボーナスを掛け合わせてスコアリング。
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">この診断でわかること</h3>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>いま飲んでいるサプリの過不足（カバー状況）</li>
              <li>悩みに合致する成分のエビデンスランク</li>
              <li>追加すべき成分の優先順位（Top3）</li>
              <li>各成分の研究使用量・摂取目安</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-1">医療相談の代替ではありません</h3>
            <p className="text-muted-foreground">
              本ツールは一般情報の提供を目的としており、個別の医療相談・診断・治療方針の代替ではありません。処方薬を服用中・妊娠中・授乳中の方は、必ず医師・薬剤師に相談してください。
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
