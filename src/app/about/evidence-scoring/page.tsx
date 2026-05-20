import Link from 'next/link'
import {
  ChevronRight,
  AlertCircle,
  BookOpen,
  Calculator,
  Scale,
  BarChart3,
  Info,
  Repeat,
  HelpCircle,
} from 'lucide-react'
import type { Metadata } from 'next'

const BASE_URL = 'https://scibase.app'
const PAGE_URL = `${BASE_URL}/about/evidence-scoring`

export const metadata: Metadata = {
  title: 'SciBase 論文蓄積スコアとは｜論文ベースの独自指標 v2.2｜SciBase',
  description:
    '成分の論文の量と質を 10 点満点で評価する SciBase 独自の論文蓄積スコア。計算式を完全開示し、主要 10 成分の論文蓄積スコアと既存 S / A / B ランクとの役割分担を提示します。',
  alternates: { canonical: PAGE_URL },
}

const FORMULA_AXES = [
  {
    axis: '論文数',
    weight: '0〜3.0',
    desc: '掲載論文の本数 n を log10(n + 1) × 1.5 で換算します。1 本で 0.45、3 本で 0.90、10 本で 1.57、30 本で約 2.27、100 本で上限の 3.0 に到達します。論文が多いほど加点されますが、上限を 3.0 に抑えて 1 軸だけで満点が取れない設計にしています。',
  },
  {
    axis: 'RCT・メタ解析比率',
    weight: '0〜3.0',
    desc: '掲載論文に占める RCT（ランダム化比較試験）とメタ解析の比率。メタ解析は重み 1.5 で評価します。観察研究やコホート研究中心の成分は、この軸の点が伸びません。',
  },
  {
    axis: '最新性',
    weight: '0〜2.0',
    desc: '掲載論文のうち、直近 15 年以内に発表された論文の比率。古典的に確立した seminal な研究（栄養学・古典的 RCT 等）が不当に減点されないよう、カットオフは 15 年に設定しています。',
  },
  {
    axis: 'ヒト試験比率',
    weight: '0〜2.0',
    desc: '掲載論文のうち、ヒトを対象とした研究（RCT・メタ解析・コホート・観察研究）の比率。動物実験のみで構成された成分は、この軸で 0 点になります。',
  },
]

const ROLE_DIVISION = [
  {
    label: '既存ランク（S / A / B / C）',
    desc: '実用判断の指標。エビデンスの強さに加え、安全性・推奨度・SciBase 編集部の総合判断を反映します。S = メタ解析・システマティックレビュー、A = RCT、B = 大規模観察研究、C = 小規模研究・動物実験。',
    color: 'bg-blue-50 border-blue-200',
    accent: 'text-blue-700',
  },
  {
    label: '論文蓄積スコア（0〜10）',
    desc: '論文の量と質の客観指標。何本の論文があり、その何割が RCT・メタ解析で、どれだけ直近の研究で、どれだけヒトを対象としているか。実用判断は含めず、純粋に研究蓄積の状況だけを表します。',
    color: 'bg-emerald-50 border-emerald-200',
    accent: 'text-emerald-700',
  },
]

const TOP10_INGREDIENTS = [
  {
    slug: 'ashwagandha',
    name: 'アシュワガンダ',
    rank: 'S',
    score: 7.9,
    n: 3,
    note: 'RCT 2 本 + メタ解析 1 本で、ストレス・睡眠の指標が定量的に検証されている領域。',
  },
  {
    slug: 'vitamin-d',
    name: 'ビタミン D',
    rank: 'S',
    score: 6.4,
    n: 2,
    note: 'メタ解析・大規模 RCT が複数。日本人の欠乏率の高さからも実用性は高い領域。',
  },
  {
    slug: 'omega3',
    name: 'オメガ 3',
    rank: 'S',
    score: 5.7,
    n: 2,
    note: '心血管・抗炎症で複数の大規模 RCT。研究の総量は十分だが用量設計が論点。',
  },
  {
    slug: 'magnesium',
    name: 'マグネシウム',
    rank: 'S',
    score: 5.2,
    n: 2,
    note: '睡眠・血圧領域でメタ解析あり。日本人の摂取不足が指摘される基礎ミネラル。',
  },
  {
    slug: 'coq10',
    name: 'コエンザイム Q10',
    rank: 'A',
    score: 4.1,
    n: 2,
    note: '心不全・スタチン併用での研究蓄積。掲載論文の総量はまだ伸びしろ。',
  },
  {
    slug: 'collagen-peptide',
    name: 'コラーゲンペプチド',
    rank: 'A',
    score: 4.1,
    n: 2,
    note: '皮膚弾力・関節領域で RCT 複数。長期エビデンスは引き続き追跡中。',
  },
  {
    slug: 'nmn',
    name: 'NMN',
    rank: 'B',
    score: 3.3,
    n: 1,
    note: 'ヒト RCT が出始めた段階。長期安全性と日本人での再現性は今後の論点。',
  },
  {
    slug: 'curcumin',
    name: 'クルクミン',
    rank: 'A',
    score: 3.3,
    n: 1,
    note: '抗炎症・関節領域で RCT あり。バイオアベイラビリティ（吸収率）の設計が論点。',
  },
  {
    slug: 'iron',
    name: '鉄',
    rank: 'S',
    score: 2.1,
    n: 1,
    note: 'ランクは S だが論文蓄積スコアは低い。鉄欠乏の補正という臨床判断が先行している領域。',
  },
  {
    slug: 'resveratrol',
    name: 'レスベラトロール',
    rank: 'C',
    score: 1.8,
    n: 1,
    note: '動物試験中心でヒト試験は限定的。研究は活発だが実用化判断は慎重に。',
  },
]

const LIMITATIONS = [
  '論文蓄積スコアは「論文がどれだけ揃っているか」を測る指標で、その成分を飲むべきかどうかの判断ではありません。',
  '論文蓄積スコアが高い成分でも、持病・服用薬・年齢・体質によっては推奨されない場合があります。医師・薬剤師への相談が前提です。',
  '論文蓄積スコアが低い成分でも、鉄のように臨床的に補正が必要なケースで実用上は重要というケースがあります。論文蓄積スコアだけで除外する読み方は適切ではありません。',
  '論文蓄積スコアは SciBase の papers[] に登録された論文を母集団とする相対指標です。世界中の全論文を網羅した上での評価ではありません。',
  '動物試験のみで構成された成分は、ヒト試験比率の軸で 0 点になり論文蓄積スコアが低く出ます。これは「研究がない」ではなく「ヒトでの検証段階に至っていない」を意味します。',
]

const FAQ_ITEMS = [
  {
    q: 'なぜ 100 点満点ではなく 10 点満点なのですか？',
    a: '読者が直感的に把握できる桁数を優先しました。10 点満点は学校教育の評価尺度に近く、7.9 と 4.1 のような差が「これは結構違う」と直感で理解できます。100 点満点だと 79 点と 41 点でも同じ差なのに、過剰な精度を装ってしまい誤解を招きます。論文蓄積スコアは小数点 1 位までで丸め、精度を装わない設計にしています。',
  },
  {
    q: '動物試験はなぜ除外されているのですか？',
    a: '動物試験はヒトへの外挿が必ずしも成立しないためです。マウスで効果が確認された成分のうち、ヒト試験まで進んだのは一部にすぎないという研究もあります。論文蓄積スコアはヒト試験比率の軸を 2.0 点満点で設けており、動物試験のみの成分はこの軸で 0 点になります。動物試験のデータ自体は成分ページに掲載しますが、論文蓄積スコアの計算からは除外する設計です。',
  },
  {
    q: '古い論文を引用したら論文蓄積スコアは下がるのですか？',
    a: '最新性の軸では「直近 15 年以内」の論文を対象としています。栄養学・古典的 RCT のように 1990 年代〜 2000 年代に決定打となる研究が出ている成分が不当に減点されないよう、カットオフは 15 年に広げています。それ以前の論文は最新性の軸では加点されませんが、論文数の軸では引き続きカウントされます。',
  },
  {
    q: '既存のランク S / A / B / C と論文蓄積スコアはどちらを信じればよいですか？',
    a: 'どちらか一方を信じるという読み方はおすすめしません。ランクは実用判断（推奨度・安全性・SciBase 編集判断）、論文蓄積スコアは研究蓄積の客観指標で、役割が違うためです。両方が高ければ研究も実用も整っている領域、ランクが高く論文蓄積スコアが低ければ実用性は確立だが論文蓄積は薄い領域、ランクが低く論文蓄積スコアが高ければ研究は熱いが実用化判断は慎重な領域、と読み分けます。',
  },
  {
    q: '他社サイトの評価点と比較できますか？',
    a: '直接の比較は推奨しません。他社サイト（CosDNA・SkinCharisma 等）の評価点は計算式が公開されていない場合が多く、何を測っているか不明なまま数値だけ並べても誤解を招きます。SciBase の論文蓄積スコアは計算式 v2.2 を本ページで完全開示しており、何を測っているかが明確です。あくまで SciBase 内の成分間の相対比較として使ってください。',
  },
  {
    q: '論文蓄積スコアが高い成分を選べばよいのですか？',
    a: 'いいえ、論文蓄積スコアは「飲むべき指標」ではありません。研究が多い領域でも、あなたの体質・持病・服用薬と合うとは限りません。論文蓄積スコアはあくまで「どれだけ研究が積まれているか」の客観指標であり、購入や摂取の判断はランク・成分の安全性情報・医師の助言と組み合わせて行ってください。',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: a,
    },
  })),
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'SciBase について', item: `${BASE_URL}/about` },
    { '@type': 'ListItem', position: 3, name: '論文蓄積スコアとは', item: PAGE_URL },
  ],
}

const rankColor: Record<string, string> = {
  S: 'bg-amber-500',
  A: 'bg-blue-500',
  B: 'bg-emerald-500',
  C: 'bg-stone-400',
}

function scoreBg(score: number): string {
  if (score >= 7.0) return 'bg-emerald-100 text-emerald-800'
  if (score >= 5.0) return 'bg-blue-100 text-blue-800'
  if (score >= 3.0) return 'bg-gray-100 text-gray-700'
  return 'bg-gray-50 text-gray-500'
}

export default function EvidenceScoringPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="max-w-2xl mx-auto px-5 py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-10">
          <Link href="/" className="hover:underline">ホーム</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/about" className="hover:underline">SciBase について</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">論文蓄積スコアとは</span>
        </nav>

        {/* Hero */}
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">
            Paper Evidence Score (v2.2)
          </p>
          <h1 className="text-[30px] sm:text-[38px] font-semibold text-foreground
            tracking-tight leading-[1.2] mb-5">
            SciBase 論文蓄積スコアとは
          </h1>
          <p className="text-[15px] text-muted-foreground leading-[1.9]">
            成分ごとに、掲載論文の<span className="font-semibold text-foreground">量と質</span>を
            10 点満点で表す SciBase 独自の客観指標です。計算式を本ページで完全に開示しています。
          </p>
        </div>

        {/* 最重要注意書き（H1 直下・18px font-bold） */}
        <div className="mb-12 bg-amber-50 border-2 border-amber-300 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[18px] font-bold text-foreground leading-[1.5] mb-2">
                この指標は推奨度ではありません。<br />
                論文の量と質を測る独立した指標です。
              </p>
              <p className="text-[13px] text-muted-foreground leading-[1.8]">
                論文蓄積スコアが高い成分が「飲むべき成分」という意味ではありません。
                飲むべきかどうかの判断は、既存の評価ランク（S / A / B / C）・成分の安全性情報・
                医師・薬剤師への相談を前提に行ってください。
              </p>
            </div>
          </div>
        </div>

        {/* H2: なぜ独自の論文蓄積スコアを作ったのか */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <BookOpen className="w-5 h-5 text-accent" />
            <h2 className="text-[20px] font-semibold text-foreground">
              なぜ独自の論文蓄積スコアを作ったのか
            </h2>
          </div>
          <div className="space-y-4 text-[14px] text-muted-foreground leading-[1.9]">
            <p>
              既存の成分評価サイト（CosDNA・SkinCharisma 等）は数値評価を提供していますが、
              <span className="font-semibold text-foreground">計算式が公開されていない</span>ことが多く、
              何を測っているかが読者に伝わりません。
            </p>
            <p>
              SciBase の論文蓄積スコアは、計算式を本ページで完全に開示しています。
              論文何本のうち何本が RCT で、何本が直近 15 年で、何本がヒトを対象としているか。
              この 4 軸を計算式に通すと、何点になるかが読者の手元で再現できる設計です。
            </p>
            <p>
              数値が独り歩きしないよう、論文蓄積スコアは
              <span className="font-semibold text-foreground">既存の評価ランク（S / A / B / C）と並列</span>で表示します。
              役割が違う 2 つの指標を並べることで、「研究蓄積」と「実用判断」を読者が分けて読めるようにしています。
            </p>
          </div>
        </section>

        {/* H2: 計算式 v2.2（recency 15年） */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <Calculator className="w-5 h-5 text-accent" />
            <h2 className="text-[20px] font-semibold text-foreground">
              計算式（v2.2 / 最新性カットオフ 15 年）
            </h2>
          </div>

          <div className="space-y-4 text-[14px] text-muted-foreground leading-[1.9] mb-6">
            <p>
              論文蓄積スコアは、以下の 4 軸の合計で 0〜10 点を算出します。
              各軸には上限があり、1 軸だけで論文蓄積スコアを稼げない設計です。
            </p>
          </div>

          {/* 数式ブロック */}
          <div className="bg-secondary border border-border rounded-2xl px-5 py-4 mb-8 font-mono text-[12px] sm:text-[13px] text-foreground leading-[1.9] tabular-nums overflow-x-auto">
            <div>overall (0〜10) = paperCount + rctMeta + recency + humanTrial</div>
            <div className="text-muted-foreground mt-2">────────────────</div>
            <div className="mt-2">confidence  = min(1.0, n / 3.0)</div>
            <div>paperCount  = min(3.0, log10(n + 1) × 1.5)</div>
            <div>rctMeta     = min(3.0, (rct + meta × 1.5) / n × 3.0 × confidence)</div>
            <div>recency     = (recent15y / n) × 2.0 × confidence</div>
            <div>humanTrial  = (human / n) × 2.0 × confidence</div>
          </div>

          {/* 4軸の説明 */}
          <div className="border border-border rounded-2xl overflow-hidden mb-6">
            <div className="bg-secondary px-5 py-3 border-b border-border">
              <p className="text-[12px] font-semibold text-foreground">4 軸の役割と上限</p>
            </div>
            <div className="divide-y divide-border">
              {FORMULA_AXES.map(({ axis, weight, desc }) => (
                <div key={axis} className="px-5 py-4">
                  <div className="flex items-center gap-3 mb-1.5">
                    <p className="text-[13px] font-semibold text-foreground">{axis}</p>
                    <span className="text-[11px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded tabular-nums">
                      {weight} 点
                    </span>
                  </div>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* confidence の補足 */}
          <div className="bg-secondary border border-border rounded-2xl p-5 mb-6">
            <h3 className="text-[14px] font-semibold text-foreground mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-accent" />
              confidence（信頼度）について
            </h3>
            <div className="space-y-2 text-[13px] text-muted-foreground leading-[1.9]">
              <p>
                掲載論文 1 本だけだと比率系の指標（RCT 比率・ヒト試験比率など）が
                <span className="font-semibold text-foreground">過大評価</span>されてしまいます。
                例えば「RCT 1 本のみ」の成分でも RCT 比率は 100% になるため、本来より高い点が出てしまいます。
              </p>
              <p>
                これを防ぐため、論文数 n に応じた confidence factor を比率系の軸にかけています。
                n = 1 で 0.33、n = 2 で 0.67、n ≥ 3 で 1.0 に到達。
                3 本以上の論文がそろって初めて、比率系の指標が満点まで届く設計です。
              </p>
              <p>
                論文 1 本のみで計算した成分は、バッジ横に
                <span className="font-semibold text-foreground">「※暫定値」</span>注記が表示されます。
              </p>
            </div>
          </div>

          {/* recency 15年の補足 */}
          <div className="bg-secondary border border-border rounded-2xl p-5">
            <h3 className="text-[14px] font-semibold text-foreground mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-accent" />
              最新性カットオフを 15 年にした理由
            </h3>
            <p className="text-[13px] text-muted-foreground leading-[1.9]">
              栄養学・古典的 RCT の領域では、1990 年代後半〜 2000 年代前半に決定打となる研究が
              出ている成分があります（例: 葉酸の神経管閉鎖障害予防、メラトニンの基礎用量研究 等）。
              これらを「古い」として減点すると、実態と乖離した低い論文蓄積スコアになってしまいます。
              直近 15 年カットオフは、こうした古典的 seminal な研究を不当に減点しない設計です。
            </p>
          </div>
        </section>

        {/* H2: ランク S/A/B/C との関係（役割分担と不一致こそ情報価値） */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <Scale className="w-5 h-5 text-accent" />
            <h2 className="text-[20px] font-semibold text-foreground">
              既存ランク（S / A / B / C）との役割分担
            </h2>
          </div>

          <div className="space-y-4 text-[14px] text-muted-foreground leading-[1.9] mb-6">
            <p>
              SciBase では成分ごとに、既存の評価ランクと論文蓄積スコアの
              <span className="font-semibold text-foreground">2 つを並列で表示</span>します。
              どちらか一方が「正解」というわけではなく、役割が違うためです。
            </p>
          </div>

          {/* 役割分担カード 2枚 */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {ROLE_DIVISION.map(({ label, desc, color, accent }) => (
              <div key={label} className={`${color} border rounded-2xl p-5`}>
                <p className={`text-[13px] font-semibold ${accent} mb-2`}>{label}</p>
                <p className="text-[12px] text-muted-foreground leading-[1.8]">{desc}</p>
              </div>
            ))}
          </div>

          {/* 不一致こそ情報価値 */}
          <div className="border border-border rounded-2xl overflow-hidden">
            <div className="bg-secondary px-5 py-3 border-b border-border">
              <p className="text-[12px] font-semibold text-foreground">
                両者が「一致しない」ときこそ、情報価値があります
              </p>
            </div>
            <div className="divide-y divide-border text-[13px] text-muted-foreground">
              <div className="px-5 py-4">
                <p className="font-semibold text-foreground mb-1">ランク S × 論文蓄積スコア低（例: 鉄）</p>
                <p className="leading-[1.8]">
                  実用性は確立しているものの、掲載論文の蓄積はまだ薄い領域。
                  日本人女性の鉄欠乏率の高さなど、臨床判断が先行しているケースです。
                </p>
              </div>
              <div className="px-5 py-4">
                <p className="font-semibold text-foreground mb-1">ランク C × 論文蓄積スコア高（例: NAD 直接補給）</p>
                <p className="leading-[1.8]">
                  研究は活発で論文蓄積が進んでいるものの、長期安全性や実用化判断はまだ早い領域。
                  「研究の熱さ」と「実用判断の慎重さ」が両立しているケースです。
                </p>
              </div>
              <div className="px-5 py-4">
                <p className="font-semibold text-foreground mb-1">ランク S × 論文蓄積スコア高（例: アシュワガンダ）</p>
                <p className="leading-[1.8]">
                  研究も実用判断もそろっている領域。読者にとって判断材料が最も多い成分です。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* H2: 主要 10 成分の論文蓄積スコア比較表 */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="w-5 h-5 text-accent" />
            <h2 className="text-[20px] font-semibold text-foreground">
              主要 10 成分の論文蓄積スコア
            </h2>
          </div>

          <div className="space-y-3 text-[14px] text-muted-foreground leading-[1.9] mb-6">
            <p>
              SciBase が掲載する成分の中から、主要 10 成分の現時点での論文蓄積スコアを並べます。
              <span className="font-semibold text-foreground">ランクと論文蓄積スコアが一致しない成分</span>に注目すると、
              研究蓄積と実用判断の違いが直感的に理解できます。
            </p>
            <p className="text-[12px]">
              <span className="font-semibold text-foreground">※ 表記注意：</span>
              下表の論文蓄積スコアは v2.2 計算式での試算値です。実装後の確定値は各成分ページに反映されます。
            </p>
          </div>

          {/* 比較表 */}
          <div className="border border-border rounded-2xl overflow-hidden">
            <div className="bg-secondary px-4 py-3 border-b border-border grid grid-cols-[1.4fr_0.6fr_0.8fr_0.5fr] gap-2 text-[11px] font-semibold text-foreground">
              <span>成分</span>
              <span className="text-center">ランク</span>
              <span className="text-center">論文蓄積スコア</span>
              <span className="text-center">論文 n</span>
            </div>
            <div className="divide-y divide-border">
              {TOP10_INGREDIENTS.map(({ slug, name, rank, score, n, note }) => (
                <div key={slug} className="px-4 py-4">
                  <div className="grid grid-cols-[1.4fr_0.6fr_0.8fr_0.5fr] gap-2 items-center mb-2">
                    <Link
                      href={`/ingredients/${slug}`}
                      className="text-[13px] font-semibold text-foreground hover:underline"
                    >
                      {name}
                    </Link>
                    <span className="flex justify-center">
                      <span className={`${rankColor[rank]} text-white text-[12px] font-bold
                        w-6 h-6 rounded-md flex items-center justify-center tabular-nums`}>
                        {rank}
                      </span>
                    </span>
                    <span className="flex justify-center">
                      <span className={`${scoreBg(score)} text-[12px] font-semibold
                        px-2 py-1 rounded-md tabular-nums`}>
                        {score.toFixed(1)} / 10
                      </span>
                    </span>
                    <span className="text-center text-[12px] text-muted-foreground tabular-nums">
                      {n} 本{n === 1 && <sup className="ml-0.5">※</sup>}
                    </span>
                  </div>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{note}</p>
                </div>
              ))}
            </div>
            <div className="bg-secondary border-t border-border px-4 py-3">
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                ※ 論文 n = 1 の成分は confidence factor で 0.33 倍に圧縮されており、暫定値扱いです。
                論文 3 本以上で confidence が 1.0 に到達し、本来の比率系の点数が反映されます。
              </p>
            </div>
          </div>
        </section>

        {/* H2: 論文蓄積スコアの限界・読み方 */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <AlertCircle className="w-5 h-5 text-accent" />
            <h2 className="text-[20px] font-semibold text-foreground">
              論文蓄積スコアの限界と読み方
            </h2>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
            <p className="text-[14px] font-semibold text-foreground mb-2 leading-[1.6]">
              「論文蓄積スコアが高い = 飲むべき」ではありません。
            </p>
            <p className="text-[13px] text-muted-foreground leading-[1.8]">
              論文蓄積スコアはあくまで研究蓄積の客観指標です。摂取判断は既存ランク・安全性情報・
              医師の助言と組み合わせて行ってください。
            </p>
          </div>

          <ul className="space-y-3 text-[14px] text-muted-foreground">
            {LIMITATIONS.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 leading-[1.9]">
                <span className="text-accent mt-1 flex-shrink-0">●</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* H2: 更新ポリシー */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <Repeat className="w-5 h-5 text-accent" />
            <h2 className="text-[20px] font-semibold text-foreground">更新ポリシー</h2>
          </div>
          <div className="space-y-4 text-[14px] text-muted-foreground leading-[1.9]">
            <p>
              論文蓄積スコアは、以下のタイミングで再計算します。
              再計算は SciBase 側で自動的に実施し、読者が手動で更新する必要はありません。
            </p>
            <ul className="space-y-2.5 pl-1">
              {[
                '各成分の papers[] に新規論文が追加された都度（即時再計算）',
                '年 1 回（毎年 5 月）の定期見直しタイミング',
                '計算式バージョンが v2.2 から進化する場合（次バージョンは別ページで履歴公開）',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-accent mt-1 flex-shrink-0">●</span>
                  <span className="leading-[1.9]">{item}</span>
                </li>
              ))}
            </ul>
            <p>
              各成分ページの論文蓄積スコアバッジには、最終計算日（lastCalculatedAt）と計算式バージョン（formula: v2.2）が
              データとして保持されています。読者にとって「いつの時点の論文蓄積スコアか」が明確になる設計です。
            </p>
          </div>
        </section>

        {/* H2: FAQ */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <HelpCircle className="w-5 h-5 text-accent" />
            <h2 className="text-[20px] font-semibold text-foreground">FAQ</h2>
          </div>
          <div className="space-y-5">
            {FAQ_ITEMS.map(({ q, a }, i) => (
              <details
                key={i}
                className="border border-border rounded-2xl overflow-hidden group"
                {...(i === 0 ? { open: true } : {})}
              >
                <summary className="cursor-pointer px-5 py-4 bg-secondary text-[13px] font-semibold text-foreground
                  flex items-start gap-3 list-none">
                  <span className="text-accent flex-shrink-0 mt-0.5">Q.</span>
                  <span className="flex-1 leading-[1.7]">{q}</span>
                </summary>
                <div className="px-5 py-4 border-t border-border text-[13px] text-muted-foreground leading-[1.9]">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* 関連リンク */}
        <div className="mt-10 pt-8 border-t border-border flex flex-wrap gap-4 text-[13px]">
          <Link href="/about" className="text-accent hover:underline">SciBase について →</Link>
          <Link href="/ingredients" className="text-accent hover:underline">成分一覧 →</Link>
          <Link href="/concerns" className="text-accent hover:underline">悩みから探す →</Link>
          <Link href="/analyzer" className="text-accent hover:underline">サプリ診断 →</Link>
        </div>
      </div>
    </>
  )
}
