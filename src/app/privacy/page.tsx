import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const BASE_URL = 'https://scibase.app'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'SciBase（scibase.app）のプライバシーポリシー。個人情報の取り扱い、Cookie・アクセス解析、アフィリエイトリンクの開示、免責事項を記載しています。',
  alternates: { canonical: `${BASE_URL}/privacy` },
  robots: { index: true, follow: true },
}

const UPDATED_AT = '2026-04-25'

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-5 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-[12px] text-muted-foreground mb-6" aria-label="パンくず">
        <Link href="/" className="hover:text-foreground transition-colors">SciBase</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">プライバシーポリシー</span>
      </nav>

      <h1 className="text-[28px] font-bold text-foreground mb-2">プライバシーポリシー</h1>
      <p className="text-[13px] text-muted-foreground mb-10">最終更新日：{UPDATED_AT}</p>

      <div className="space-y-10 text-[14px] leading-[1.85] text-foreground">

        <section>
          <p className="text-muted-foreground">
            SciBase（以下「当サイト」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。
            本ポリシーでは、当サイトにおける個人情報の取り扱い、Cookieの利用、第三者サービスの利用、アフィリエイトプログラムへの参加について明記します。
          </p>
        </section>

        {/* 第1条 */}
        <section>
          <h2 className="text-[18px] font-bold text-foreground mb-3">第1条（運営者情報）</h2>
          <ul className="space-y-1.5 text-muted-foreground">
            <li>サイト名：SciBase</li>
            <li>URL：https://scibase.app</li>
            <li>運営：個人事業主（法人化前）</li>
            <li>連絡先：X（旧Twitter）<a href="https://x.com/r_evidence_" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">@r_evidence_</a> のDM</li>
          </ul>
        </section>

        {/* 第2条 */}
        <section>
          <h2 className="text-[18px] font-bold text-foreground mb-3">第2条（取得する情報）</h2>
          <p className="text-muted-foreground mb-3">当サイトでは、以下の情報を取得する場合があります。</p>
          <ul className="space-y-2 text-muted-foreground list-disc pl-5">
            <li><strong className="text-foreground">アクセス情報</strong>：IPアドレス、ブラウザ種別、リファラー、閲覧ページ、滞在時間、デバイス情報（Google Analytics 4を通じて自動取得）</li>
            <li><strong className="text-foreground">Cookie</strong>：閲覧体験向上・アクセス解析・アフィリエイトプログラムの計測に使用</li>
            <li><strong className="text-foreground">メールアドレス</strong>：メルマガ・ニュースレターに登録された場合のみ</li>
            <li><strong className="text-foreground">お問い合わせ内容</strong>：X DM等を通じてユーザーから送信された情報</li>
          </ul>
          <p className="text-muted-foreground mt-3">氏名・住所・電話番号などの個人を特定する情報は、原則として取得しません。</p>
        </section>

        {/* 第3条 */}
        <section>
          <h2 className="text-[18px] font-bold text-foreground mb-3">第3条（情報の利用目的）</h2>
          <p className="text-muted-foreground mb-3">取得した情報は、以下の目的でのみ利用します。</p>
          <ul className="space-y-2 text-muted-foreground list-disc pl-5">
            <li>当サイトの運営・改善・コンテンツ品質向上</li>
            <li>アクセス傾向の分析および表示の最適化</li>
            <li>メルマガ・ニュースレターの配信（同意した方のみ）</li>
            <li>お問い合わせへの返信</li>
            <li>不正アクセス・なりすまし等の防止</li>
          </ul>
        </section>

        {/* 第4条 */}
        <section>
          <h2 className="text-[18px] font-bold text-foreground mb-3">第4条（アクセス解析ツールの利用）</h2>
          <p className="text-muted-foreground mb-3">
            当サイトでは、Google LLCが提供する <strong className="text-foreground">Google Analytics 4（GA4）</strong> を使用し、Cookieを通じて匿名のトラフィック情報を収集しています。収集される情報には個人を特定する内容は含まれません。
          </p>
          <p className="text-muted-foreground mb-3">
            Google Analyticsの利用規約・プライバシーポリシーは以下をご確認ください。
          </p>
          <ul className="space-y-1 text-[13px]">
            <li><a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Google Analytics 利用規約</a></li>
            <li><a href="https://policies.google.com/privacy?hl=ja" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Google プライバシーポリシー</a></li>
            <li><a href="https://tools.google.com/dlpage/gaoptout?hl=ja" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Google Analytics オプトアウト アドオン</a>（収集を無効化したい方はインストールください）</li>
          </ul>
        </section>

        {/* 第5条 */}
        <section>
          <h2 className="text-[18px] font-bold text-foreground mb-3">第5条（Cookieの取り扱い）</h2>
          <p className="text-muted-foreground mb-3">
            当サイトはCookieを以下の目的で使用します。
          </p>
          <ul className="space-y-2 text-muted-foreground list-disc pl-5">
            <li>アクセス解析（Google Analytics 4）</li>
            <li>アフィリエイトプログラムの成果測定（Amazonアソシエイト・iHerb・各種ASP）</li>
            <li>外部サービスとの連携</li>
          </ul>
          <p className="text-muted-foreground mt-3">
            Cookieの受け入れはブラウザの設定でいつでも拒否・削除できます。ただし無効にした場合、一部機能が正常に動作しない可能性があります。
          </p>
        </section>

        {/* 第6条 アフィリエイト・PR表示 */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <h2 className="text-[18px] font-bold text-foreground mb-3">第6条（アフィリエイトプログラム・広告表示）</h2>
          <p className="text-muted-foreground mb-3">
            当サイトは以下のアフィリエイトプログラムに参加しており、サイト内に広告（PR）リンクを含みます。
          </p>
          <ul className="space-y-2 text-muted-foreground list-disc pl-5">
            <li>Amazon.co.jp アソシエイト・プログラム</li>
            <li>iHerb アフィリエイトプログラム</li>
            <li>A8.net・もしもアフィリエイト・afb 等のASP（広告主との提携を含む）</li>
          </ul>
          <p className="text-muted-foreground mt-3 mb-3">
            ユーザーがリンクから商品を購入すると、運営者に販売手数料が支払われる仕組みです。
            アフィリエイトリンクには <code className="text-[12px] bg-secondary px-1 py-0.5 rounded">rel=&quot;sponsored&quot;</code> 属性を付与しています。
          </p>
          <p className="text-muted-foreground mb-3">
            <strong className="text-foreground">商品の掲載・エビデンスランクの評価は広告主・商業的利益とは完全に独立して行っており</strong>、手数料の有無・金額が評価に影響することはありません。掲載順は論文エビデンス（メタ解析・RCT）の強さ、有効量、継続期間、副作用情報のみで決定しています。
          </p>
          <p className="text-muted-foreground text-[13px]">
            本表示は <strong className="text-foreground">2023年10月施行のステルスマーケティング規制（景品表示法）</strong> に基づき、広告であることを明示するためのものです。
          </p>
        </section>

        {/* 第7条 */}
        <section>
          <h2 className="text-[18px] font-bold text-foreground mb-3">第7条（個人情報の第三者提供）</h2>
          <p className="text-muted-foreground">
            当サイトは、以下の場合を除き、取得した個人情報を第三者に提供することはありません。
          </p>
          <ul className="space-y-2 text-muted-foreground list-disc pl-5 mt-3">
            <li>ユーザーご本人の同意がある場合</li>
            <li>法令に基づく開示請求があった場合</li>
            <li>人の生命・身体・財産の保護のために必要な場合</li>
            <li>業務委託先（サーバー運営・メルマガ配信等）に対し、目的達成に必要な範囲で提供する場合</li>
          </ul>
        </section>

        {/* 第8条 */}
        <section>
          <h2 className="text-[18px] font-bold text-foreground mb-3">第8条（個人情報の開示・訂正・削除）</h2>
          <p className="text-muted-foreground">
            ユーザーは、自身の個人情報について、開示・訂正・削除を求めることができます。希望される場合は <a href="https://x.com/r_evidence_" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">@r_evidence_</a> のDMまでご連絡ください。本人確認のうえ、合理的な期間内に対応いたします。
          </p>
        </section>

        {/* 第9条 免責事項 */}
        <section>
          <h2 className="text-[18px] font-bold text-foreground mb-3">第9条（免責事項）</h2>
          <ul className="space-y-2 text-muted-foreground list-disc pl-5">
            <li>当サイトの情報は<strong className="text-foreground">医療的アドバイスを提供するものではありません</strong>。サプリメントの使用・スキンケアの変更を行う際は、医師・薬剤師・専門家にご相談ください。</li>
            <li>掲載内容は研究情報の提供を目的としており、特定成分・商品の効果・効能を保証するものではありません。個人の体質・健康状態・服用薬との相互作用については、当サイトでは責任を負いかねます。</li>
            <li>当サイト掲載のリンク先で発生したいかなる損害についても、当サイトは一切の責任を負いません。</li>
            <li>論文情報・成分情報は執筆時点の最新研究に基づいていますが、その後の研究で結論が更新される可能性があります。</li>
          </ul>
        </section>

        {/* 第10条 */}
        <section>
          <h2 className="text-[18px] font-bold text-foreground mb-3">第10条（著作権）</h2>
          <p className="text-muted-foreground">
            当サイトに掲載されている文章・図表・デザインの著作権は、運営者または引用元に帰属します。
            引用される場合は、出典として「SciBase（https://scibase.app）」を明記してください。論文の引用については、各論文の著作権は元の発行元に帰属します。
          </p>
        </section>

        {/* 第11条 */}
        <section>
          <h2 className="text-[18px] font-bold text-foreground mb-3">第11条（準拠法・管轄）</h2>
          <p className="text-muted-foreground">
            本ポリシーの解釈および当サイト利用に関連して生じる一切の紛争は、日本法を準拠法とし、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
          </p>
        </section>

        {/* 第12条 */}
        <section>
          <h2 className="text-[18px] font-bold text-foreground mb-3">第12条（ポリシーの改定）</h2>
          <p className="text-muted-foreground">
            本ポリシーの内容は、法令変更・運営方針の変更等により予告なく改定する場合があります。重要な変更がある場合は、当サイト上で通知します。改定後のポリシーは本ページに掲載した時点で効力を発します。
          </p>
        </section>

        {/* 関連リンク */}
        <div className="pt-8 border-t border-border flex flex-wrap gap-4 text-[13px]">
          <Link href="/about" className="text-accent hover:underline">サイトについて →</Link>
          <Link href="/" className="text-accent hover:underline">トップへ戻る →</Link>
        </div>
      </div>
    </main>
  )
}
