import Link from 'next/link'
import { ChevronRight, FlaskConical, BookOpen, Shield, Calculator } from 'lucide-react'
import type { Metadata } from 'next'

const BASE_URL = 'https://scibase.app'

export const metadata: Metadata = {
  title: 'SciBaseについて｜編集方針・エビデンス評価基準・運営者',
  description: 'SciBaseの運営方針・著者プロフィール・論文エビデンスの評価基準を掲載。化粧品メーカー勤務の現役研究者が、メタ解析・RCT・コホート研究をもとに成分情報を独立して評価・掲載しています。',
  alternates: { canonical: `${BASE_URL}/about` },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'SciBase 編集者',
  jobTitle: '化粧品メーカー研究職',
  description: '化粧品・サプリメント成分の論文エビデンスを独立した立場で評価・発信。メタ解析・RCT・コホート研究を中心に査読済み論文のみを参照。',
  url: `${BASE_URL}/about`,
  knowsAbout: [
    '成分科学', '皮膚科学', 'スキンケア成分', 'サプリメント', '栄養学',
    'メタ解析', 'ランダム化比較試験（RCT）', 'エビデンスに基づく医療（EBM）',
  ],
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SciBase',
  url: BASE_URL,
  description: '論文エビデンスに基づくスキンケア・サプリメント成分データベース',
  foundingDate: '2026',
}

const SCORE_AXES = [
  {
    axis: '論文整合',
    weight: 40,
    desc: '経口サプリは商品の1日あたり有効成分量（mg）が、論文RCTで使われた最低有効量を超えているかで判定。外用化粧品は商品の表示濃度（%）が論文で使われた最小濃度（例：ナイアシンアミド4%・ビタミンC外用10%・サリチル酸0.5%等）を超えているかで判定。どちらも充足率（実用量÷最小有効量）に応じて★1〜5を連続的に算出（1.0以上で★5・最低★1）。算出に必要なデータが揃わない場合は欠損として「—」を表示します。',
  },
  {
    axis: '第三者検査',
    weight: 25,
    desc: '重金属検査と第三者試験機関の検査の両方を通過していれば★5、どちらかのみで★4、いずれもなしは★2。メーカー自社試験のみは加点しません。',
  },
  {
    axis: '認証',
    weight: 15,
    desc: 'NSF・USP・Informed Sport いずれかの第三者認証で★5、GMP認証で★4、それ以外で★3。',
  },
  {
    axis: '純度',
    weight: 10,
    desc: 'Organic と NonGMO の両方で★5、どちらか一方で★4、NSF/USPで★4、GMPで★3、それ以外で★2。',
  },
  {
    axis: 'コスパ',
    weight: 5,
    desc: '同じ成分の掲載商品内で、月額コストの分布から逆算（最安付近=★5、最高値付近=★1）。比較対象が1商品のみ・全商品が同価格の場合は★3固定。月額が不明なら欠損として「—」を表示します。',
  },
  {
    axis: '配送',
    weight: 5,
    desc: '翌日・即日配送の表記で★5、国内2-3日で★4、海外7-14日で★3、2-3週で★2。表記がなければプラットフォーム別に補正（Amazon=★5・公式=★4・iHerb=★3）。',
  },
]

const EVIDENCE_RANKS = [
  {
    rank: 'S',
    label: 'メタ解析・システマティックレビュー',
    color: 'bg-amber-500',
    desc: '複数のRCTを統合解析した最上位のエビデンス形式。最も強い根拠として扱います。例：Cochrane Review',
  },
  {
    rank: 'A',
    label: 'RCT（ランダム化比較試験）',
    color: 'bg-blue-500',
    desc: '無作為割り付けによる二重盲検比較試験。偏りが少なく、因果関係の確認に適した研究形式。',
  },
  {
    rank: 'B',
    label: 'コホート研究・大規模観察研究',
    color: 'bg-emerald-500',
    desc: '長期追跡による関連性の確認。因果推論には限界があるが、大規模なデータで傾向を示す研究。',
  },
  {
    rank: 'C',
    label: '小規模研究・動物実験・in vitro',
    color: 'bg-stone-400',
    desc: 'ヒトでの大規模検証が不十分な段階。参考情報として掲載しますが、効果の断定はしません。',
  },
]

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />

      <div className="max-w-2xl mx-auto px-5 py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-10">
          <Link href="/" className="hover:underline">ホーム</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">SciBaseについて</span>
        </nav>

        {/* Hero */}
        <div className="mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">
            About SciBase
          </p>
          <h1 className="text-[30px] sm:text-[38px] font-bold text-foreground
            tracking-tight leading-[1.2] mb-5">
            「その成分、本当に<br />効きますか」
          </h1>
          <p className="text-[15px] text-muted-foreground leading-[1.9]">
            SciBaseは、スキンケア・サプリメント成分の情報を
            <span className="font-semibold text-foreground">口コミでも広告でもなく、査読済み論文</span>
            だけをもとに評価・掲載する成分データベースです。
          </p>
        </div>

        {/* なぜ作ったか */}
        <section className="mb-12">
          <h2 className="text-[20px] font-bold text-foreground mb-4">なぜ作ったのか</h2>
          <div className="space-y-4 text-[14px] text-muted-foreground leading-[1.9]">
            <p>
              化粧品メーカーに勤め、仕事で成分の論文を読む立場になってわかったことがあります。
              市場で「効果がある」とされている成分の多くは、
              自社試験・症例報告・動物実験のデータだけで語られています。
            </p>
            <p>
              一方、メタ解析やRCTといった質の高い研究が存在するにもかかわらず、
              その情報が一般の人に届いていない成分も多い。
              SciBaseは、この「エビデンスの格差」を埋めるために作りました。
            </p>
            <p>
              「高価格＝効果がある」でも「人気がある＝根拠がある」でもない。
              あくまで<span className="font-semibold text-foreground">査読済み論文のエビデンス</span>だけを基準に、
              成分を評価・掲載しています。
            </p>
          </div>
        </section>

        {/* 著者プロフィール */}
        <section className="mb-12 bg-secondary rounded-2xl p-6 border border-border">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-border
              flex items-center justify-center flex-shrink-0">
              <FlaskConical className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-[15px] text-foreground mb-0.5">SciBase 編集者</p>
              <p className="text-[12px] text-muted-foreground mb-3">化粧品メーカー勤務・成分研究担当</p>
              <div className="space-y-2 text-[13px] text-muted-foreground leading-relaxed">
                <p>
                  化粧品メーカーに現役で勤務。職務上、成分の有効性評価・論文調査を日常的に行っています。
                </p>
                <p>
                  老化科学・栄養学・脳科学に個人的に深い関心を持ち、
                  皮膚老化・成分エビデンス・サプリメントの研究文献を継続的に読んでいます。
                </p>
                <p className="text-[12px]">
                  専門領域：スキンケア成分科学 / サプリメント評価 / 老化科学 / 論文エビデンス評価
                </p>
                <a
                  href="https://x.com/r_evidence_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] text-accent hover:underline mt-1"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  @r_evidence_
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 編集方針 */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <BookOpen className="w-5 h-5 text-accent" />
            <h2 className="text-[20px] font-bold text-foreground">編集方針・論文選定基準</h2>
          </div>

          <div className="space-y-4 text-[14px] text-muted-foreground leading-[1.9] mb-8">
            <p>
              掲載する論文は<span className="font-semibold text-foreground">査読済みの学術論文のみ</span>を対象とし、
              メーカー自社試験・症例報告のみのデータ・査読なしのプレプリントは採用しません。
            </p>
            <p>
              各成分には、参照した主要論文の研究種別・サンプル数・主な知見を明記しています。
              読者が論文の質を自分で判断できるよう、エビデンスランク（S〜C）を明示しています。
            </p>
          </div>

          {/* エビデンスランク表 */}
          <div className="border border-border rounded-2xl overflow-hidden">
            <div className="bg-secondary px-5 py-3 border-b border-border">
              <p className="text-[12px] font-semibold text-foreground">エビデンスランク評価基準</p>
            </div>
            <div className="divide-y divide-border">
              {EVIDENCE_RANKS.map(({ rank, label, color, desc }) => (
                <div key={rank} className="flex items-start gap-4 px-5 py-4">
                  <span className={`${color} text-white text-[13px] font-black
                    w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    {rank}
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-foreground mb-0.5">{label}</p>
                    <p className="text-[12px] text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 掲載しないもの */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <Shield className="w-5 h-5 text-accent" />
            <h2 className="text-[20px] font-bold text-foreground">掲載しないもの</h2>
          </div>
          <ul className="space-y-3 text-[14px] text-muted-foreground">
            {[
              'メーカー自社試験のみのデータ（第三者検証なし）',
              '症例報告・口コミ・個人の体験談',
              '査読なし論文・プレプリント（未査読）',
              '動物実験・in vitro（試験管内）研究のみの成分は Cランクとして明示',
              '根拠なく「効果がある」「改善する」と断言するコンテンツ',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-rose-400 mt-1 flex-shrink-0">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 商品スコア・SciBase推奨度の算出基準 */}
        <section id="scoring" className="mb-12 scroll-mt-20">
          <div className="flex items-center gap-2 mb-5">
            <Calculator className="w-5 h-5 text-accent" />
            <h2 className="text-[20px] font-bold text-foreground">
              商品スコア・SciBase推奨度の算出基準
            </h2>
          </div>

          <div className="space-y-4 text-[14px] text-muted-foreground leading-[1.9] mb-8">
            <p>
              SciBase の各成分ページでは、掲載商品ごとに
              <span className="font-semibold text-foreground">「SciBase推奨度（★1.0〜5.0）」</span>と
              <span className="font-semibold text-foreground">「6軸スコア（★1〜5）」</span>を表示しています。
              算出の根拠を全公開し、読者が自分で判断できる材料を残すことを編集方針としています。
            </p>
            <p>
              スコアは<span className="font-semibold text-foreground">アフィリエイト手数料・広告主の意向とは独立</span>に算出され、
              手数料の有無や金額がスコアに影響することはありません。
            </p>
          </div>

          {/* 6軸スコア表 */}
          <div className="border border-border rounded-2xl overflow-hidden mb-8">
            <div className="bg-secondary px-5 py-3 border-b border-border">
              <p className="text-[12px] font-semibold text-foreground">
                6軸スコアの定義と判定基準
              </p>
            </div>
            <div className="divide-y divide-border">
              {SCORE_AXES.map(({ axis, weight, desc }) => (
                <div key={axis} className="px-5 py-4">
                  <div className="flex items-center gap-3 mb-1.5">
                    <p className="text-[13px] font-semibold text-foreground">{axis}</p>
                    <span className="text-[11px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded">
                      重み {weight}%
                    </span>
                  </div>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SciBase推奨度の重み付け */}
          <div className="mb-8">
            <h3 className="text-[15px] font-bold text-foreground mb-3">
              SciBase推奨度（★1.0〜5.0）の重み付け
            </h3>
            <div className="space-y-3 text-[14px] text-muted-foreground leading-[1.9]">
              <p>
                上記6軸を以下の重みで合成して、
                <span className="font-semibold text-foreground">SciBase推奨度</span>を算出します。
                成分の使用形態（経口サプリ／外用化粧品）によって重み付けを切り替えます。
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-[12px] font-semibold text-foreground mb-1.5">
                    経口サプリ（成分の usageType: oral）
                  </p>
                  <p className="bg-secondary border border-border rounded-xl px-4 py-3 text-[13px] tabular-nums">
                    論文整合 × 0.40 ＋ 第三者検査 × 0.25 ＋ 認証 × 0.15 ＋ 純度 × 0.10 ＋ コスパ × 0.05 ＋ 配送 × 0.05
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-foreground mb-1.5">
                    外用化粧品（成分の usageType: topical / both）
                  </p>
                  <p className="bg-secondary border border-border rounded-xl px-4 py-3 text-[13px] tabular-nums">
                    論文整合 × 0.60 ＋ コスパ × 0.20 ＋ 配送 × 0.10 ＋ 第三者検査 × 0.05 ＋ 認証 × 0.03 ＋ 純度 × 0.02
                  </p>
                </div>
              </div>
              <p>
                経口は論文整合と第三者検査に重みの65%を寄せ、
                外用は論文整合に60%を寄せています。
                外用商品では heavy metal 検査・GMP/Organic 等の表示が業界慣習として一般的でないため、
                これらを高い重みにすると実態を反映しないスコアになります。
                <span className="font-semibold text-foreground">論文ベース・科学的選定</span>という編集方針はどちらも共通で、
                価格や配送スピードが評価の主軸になることは設計上ありません。
              </p>
              <p>
                データが揃わない軸（例: 月額が公式情報で不明・有効成分量が非開示）は、
                <span className="font-semibold text-foreground">合成時に重みから除外して残り軸で再正規化</span>します。
                欠損軸を「中立★3」として埋めて合成すると、実態より高い推奨度が出るバイアスがあるため、
                算出から外す設計です。
              </p>
            </div>
          </div>

          {/* No.1バッジの発動条件 */}
          <div className="mb-8">
            <h3 className="text-[15px] font-bold text-foreground mb-3">
              「軸別 No.1（当サイト掲載商品中）」バッジの発動条件
            </h3>
            <ul className="space-y-2.5 text-[14px] text-muted-foreground">
              {[
                '同じ成分の掲載商品が2品以上あるときのみ表示',
                'その軸のスコアが★4以上のときのみ表示（★3以下を「No.1」と呼ぶことは誇張になるため除外）',
                '比較対象の全商品が同点の場合は表示しない（差別化が成立していないため）',
                '「当サイト掲載商品中」と必ず併記し、市場全体での1位ではないことを明示',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-accent mt-1 flex-shrink-0">●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* BEST PICK の選定ロジック */}
          <div className="mb-8">
            <h3 className="text-[15px] font-bold text-foreground mb-3">
              BEST PICK の選定ロジック
            </h3>
            <div className="space-y-3 text-[14px] text-muted-foreground leading-[1.9]">
              <p>
                各成分ページの先頭に表示される「BEST PICK（1位）」は、
                <span className="font-semibold text-foreground">SciBase推奨度の高い順</span>で機械的に決定します。
              </p>
              <p>
                BEST PICK の選定理由として表示する文言は、
                <span className="font-semibold text-foreground">実際に★4以上のスコアを持つ軸のみ</span>を列挙する設計です。
                「コスパ★3」のような中位スコアを根拠として表示することはありません。
              </p>
            </div>
          </div>

          {/* データ不足時の挙動 */}
          <div className="mb-8">
            <h3 className="text-[15px] font-bold text-foreground mb-3">
              データが揃わないとき
            </h3>
            <div className="space-y-3 text-[14px] text-muted-foreground leading-[1.9]">
              <p>
                算出に必要な情報（1日あたり有効成分量・月額コスト等）が公式情報で確認できない場合、
                該当軸のスコアは<span className="font-semibold text-foreground">「—」</span>として表示し、
                数値として算出しません。
              </p>
              <p>
                <span className="font-semibold text-foreground">合成時（SciBase推奨度）は欠損軸を重みから除外し、残り軸の重みで再正規化</span>します。
                欠損を「★3（中立）」として埋めて合成すると実態より高い推奨度が出るバイアスがあるため、
                算出から外す設計です。SciBase は欠損は欠損として明示する方針を取っています。
              </p>
            </div>
          </div>

          {/* 掲載基準 */}
          <div className="mb-8">
            <h3 className="text-[15px] font-bold text-foreground mb-3">
              掲載基準
            </h3>
            <div className="space-y-3 text-[14px] text-muted-foreground leading-[1.9]">
              <p>
                SciBase は<span className="font-semibold text-foreground">推奨度★4.0以上</span>の商品を基本掲載しています。
                これより低スコアの商品は、広告主への配慮ではなく
                <span className="font-semibold text-foreground">編集方針として原則掲載していません</span>。
                論文整合・第三者検査などSciBaseの評価軸で十分な根拠が得られない商品を除外する設計です。
              </p>
              <p>
                成分内1位として表示する <span className="font-semibold text-foreground">BEST PICK は★4.5以上</span>を必須としています。
                該当商品が見つからない成分は BEST PICK を表示せず、掲載商品全件を比較表として並べます。
              </p>
              <p>
                掲載基準を満たす商品が成分内に存在しない場合は
                <span className="font-semibold text-foreground">「掲載休止」</span>として該当成分を悩みページの推奨成分から外します。
                「とりあえず何か掲載する」より「基準を満たす選択肢がない」ことを正直に伝えるほうが、
                読者の判断材料として有用と考えるためです。
              </p>
            </div>
          </div>

          {/* 中立性の保証 */}
          <div className="bg-secondary border border-border rounded-2xl p-5">
            <h3 className="text-[14px] font-bold text-foreground mb-3">
              中立性の保証
            </h3>
            <ul className="space-y-2 text-[13px] text-muted-foreground leading-relaxed">
              {[
                'スコア算出ロジックにアフィリエイト手数料は一切含まれていません',
                '販売プラットフォーム（iHerb・Amazon・公式）による加点はありません（配送軸の補正を除く）',
                '掲載商品の選定・除外は商業的関係ではなく、論文エビデンスと有効量の充足で判断します',
                'スコアの根拠となる元データ（成分の有効量・商品の用量・月額・認証等）は成分ページで個別確認できます',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* アフィリエイト・収益 */}
        <section className="mb-12 bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <h2 className="text-[15px] font-bold text-foreground mb-3">
            アフィリエイト・商業的関係について
          </h2>
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            本サイトにはiHerb・Amazonのアフィリエイトリンクが含まれます。
            ユーザーがリンクから商品を購入すると、運営に販売手数料が支払われる仕組みです。
            ただし、<span className="font-semibold text-foreground">商品の掲載・エビデンスランクの評価は広告主・商業的利益とは独立して行っており</span>、
            手数料の有無・金額が評価に影響することはありません。
            掲載順は論文エビデンス（メタ解析・RCT）の強さ、有効量、継続期間、副作用情報のみで決定しています。
          </p>
        </section>

        {/* 免責事項 */}
        <section className="mb-12">
          <h2 className="text-[15px] font-bold text-foreground mb-3">免責事項</h2>
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            本サイトの情報は<span className="font-semibold text-foreground">医療的アドバイスを提供するものではありません</span>。
            掲載内容は研究情報の提供を目的としており、特定成分・商品の効果・効能を保証するものではありません。
            サプリメントの使用・スキンケアの変更を行う際は、医師・薬剤師・専門家にご相談ください。
            個人の体質・健康状態・服用薬との相互作用については、本サイトでは責任を負いかねます。
          </p>
        </section>

        {/* 関連リンク */}
        <div className="mt-10 pt-8 border-t border-border flex flex-wrap gap-4 text-[13px]">
          <Link href="/ingredients" className="text-accent hover:underline">成分一覧 →</Link>
          <Link href="/concerns"    className="text-accent hover:underline">悩みから探す →</Link>
          <Link href="/analyzer"    className="text-accent hover:underline">サプリ診断 →</Link>
          <Link href="/privacy"     className="text-accent hover:underline">プライバシーポリシー →</Link>
        </div>
      </div>
    </>
  )
}
