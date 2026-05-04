import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Trophy, BookOpen } from 'lucide-react'
import { getConcern, getIngredientsByConcern, concerns } from '@/lib/data'
import { getArticlesByConcern } from '@/lib/articles'
import { IngredientCard } from '@/components/IngredientCard'
import { EvidenceBadge } from '@/components/EvidenceBadge'
import { OutboundProductLink } from '@/components/OutboundProductLink'
import type { Metadata } from 'next'
import type { EvidenceRank } from '@/lib/types'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return concerns.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = getConcern(slug)
  if (!c) return {}
  return {
    title: c.seoTitle ?? `${c.nameJa}の原因と対策｜科学的エビデンスで解説`,
    description: c.seoDescription ?? `${c.nameJa}の原因・メカニズム・対策を論文ベースで解説。関連する成分・サプリもエビデンス順に網羅。${c.description.slice(0, 50)}`,
    alternates: { canonical: `${BASE_URL}/concerns/${slug}` },
  }
}

const BASE_URL = 'https://scibase.app'

/* 損失回避フレーミング：放置した場合のリスクを一文で */
const lossFraming: Record<string, string> = {
  'skin-aging':   '老化は放置するほど回復コストが上がる。コラーゲン産生は25歳から年1%低下し続ける。',
  'wrinkles':     'シワは一度定着すると外用だけでは改善が困難になる。早期の成分選択が効率を左右する。',
  'spots':        '紫外線ダメージは蓄積型。放置した色素沈着はターンオーバー低下で薄くなりにくくなる。',
  'barrier':      'バリア機能の低下は悪循環。外からの刺激が増え、さらにバリアが壊れるループに入る。',
  'dry-skin':     '乾燥は皮膚老化を加速する。水分量が低下した肌はシワ・くすみが出やすくなる。',
  'acne':         '炎症後色素沈着は放置で定着する。ニキビの跡を最小化するには炎症期からのケアが必要。',
  'pores':        '毛穴の開きは角栓の蓄積→炎症→拡張のサイクルで進行する。早期の詰まり除去が鍵。',
  'uv-damage':    '光老化は累積ダメージ。「見えていないダメージ」が数年後にシミ・シワとして現れる。',
  'sleep':        '睡眠不足は1日でコルチゾールを上昇させ老化を加速する。慢性化するほど回復が難しくなる。',
  'stress':       '慢性ストレスはテロメアを短縮させ細胞老化を早める。コルチゾール過剰は皮膚・脳・免疫に影響する。',
  'fatigue':      '慢性疲労を放置するとミトコンドリア機能が低下し、老化を全身で加速させる。',
  'cognitive':    '認知機能の低下は30代から静かに始まる。早期の神経保護が後の差を大きくする。',
  'inflammation': '慢性炎症（Inflammaging）は老化の根本原因の1つ。放置すると全臓器の老化が加速する。',
  'gut':          '腸内フローラの乱れは全身炎症・免疫低下・脳機能低下につながる。放置コストは大きい。',
  'immunity':     '免疫機能の低下は感染リスクだけでなく、がん・慢性疾患への抵抗力も落とす。',
  'hair':         '抜け毛・薄毛は毛包が萎縮すると再生が難しくなる。早期の栄養補給が毛周期を守る。',
  'bone':         '骨密度は35歳をピークに低下する。失われた骨を取り戻すより、維持する方がはるかに効率的。',
  'metabolism':   '血糖スパイクが繰り返されるとAGEs（糖化産物）が蓄積し、皮膚・血管・脳を老化させる。',
  'longevity':    '老化細胞の蓄積は臓器機能を静かに蝕む。Senolytic研究は「除去」より「蓄積させないこと」を示す。',
  'eye-health':    '眼の光老化は紫外線暴露とともに蓄積する。黄斑変性の初期は自覚症状がなく発見が遅れがち。',
  'muscle':        'サルコペニア（加齢性筋肉減少）は30代から静かに始まる。筋量の低下は代謝・姿勢・転倒リスクに直結する。',
  'cardiovascular': '心血管機能の低下は自覚なく進行する。動脈硬化・血圧上昇は早期介入ほど可逆性が高い。',
  // 拡張8件（2026-04-27 追加）
  'mood':          '気分の落ち込みを「気の持ちよう」で片付けると慢性化する。セロトニン経路は栄養と腸環境で守れる範囲が大きい。',
  'focus':         '集中力低下を放置するとBDNF（脳由来神経栄養因子）が下がり続ける。神経可塑性は維持の方が再構築より圧倒的に安い。',
  'menopause':     '更年期前後10年の卵巣機能低下期は骨密度・コラーゲン・血管の急減期。早期対処が老化加速を抑える。',
  'liver':         '肝臓は「沈黙の臓器」。γ-GTP・AST・ALTが境界域でも線維化は静かに進行する。GSH低下を放置すると解毒力が下がり続ける。',
  'blood-sugar':   '食後血糖スパイクのたびに血管とコラーゲンが糖化される。30代から既に蓄積し、自覚症状が出た時には可逆性が小さい。',
  'glycation':     '糖化は紫外線を避けても進行する内側からの老化。一度形成されたAGEsは分解されにくく、予防が中心になる。',
  'recovery':      '回復不足の蓄積はオーバートレーニング症候群の入口。30代以降の回復遅延を「年齢のせい」と諦めると差が広がる。',
  'brain-fog':     '思考の鈍りは神経炎症とミトコンドリア機能の低下のサイン。腸-脳軸の不調が背景にあると単発対策では戻らない。',
}

const categoryHero: Record<string, { bg: string; border: string; text: string }> = {
  skin:           { bg: 'bg-rose-50',    border: 'border-t-rose-400',    text: 'text-rose-700'    },
  body:           { bg: 'bg-orange-50',  border: 'border-t-orange-400',  text: 'text-orange-700'  },
  cognitive:      { bg: 'bg-blue-50',    border: 'border-t-blue-500',    text: 'text-blue-700'    },
  sleep:          { bg: 'bg-violet-50',  border: 'border-t-violet-500',  text: 'text-violet-700'  },
  gut:            { bg: 'bg-teal-50',    border: 'border-t-teal-500',    text: 'text-teal-700'    },
  immunity:       { bg: 'bg-emerald-50', border: 'border-t-emerald-500', text: 'text-emerald-700' },
  muscle:         { bg: 'bg-amber-50',   border: 'border-t-amber-500',   text: 'text-amber-700'   },
  cardiovascular: { bg: 'bg-red-50',     border: 'border-t-red-500',     text: 'text-red-700'     },
}

const categoryLabel: Record<string, string> = {
  skin:           'スキンケア',
  body:           '体・全身',
  cognitive:      '認知・メンタル',
  sleep:          '睡眠',
  gut:            '腸・消化',
  immunity:       '免疫',
  muscle:         '筋肉・運動',
  cardiovascular: '血管・循環',
}

export default async function ConcernPage({ params }: Props) {
  const { slug } = await params
  const concern = getConcern(slug)
  if (!concern) notFound()

  const all = getIngredientsByConcern(slug)
  const ranks: EvidenceRank[] = ['S', 'A', 'B', 'C']
  const hero = categoryHero[concern.category] ?? categoryHero.skin

  /* 推奨Top 3と残り（アコーディオン用） */
  const top3 = all.slice(0, 3)
  const top3Slugs = new Set(top3.map((i) => i.slug))
  const rest = all.filter((i) => !top3Slugs.has(i.slug))

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム',     item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: '悩みから探す', item: `${BASE_URL}/concerns` },
      { '@type': 'ListItem', position: 3, name: concern.nameJa, item: `${BASE_URL}/concerns/${slug}` },
    ],
  }

  const itemListJsonLd = top3.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${concern.nameJa}に効く成分Top 3`,
    numberOfItems: top3.length,
    itemListElement: top3.map((ing, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: ing.nameJa,
      url: `${BASE_URL}/ingredients/${ing.slug}`,
    })),
  } : null

  const rankLabel: Record<EvidenceRank, string> = {
    S: 'Sランク・メタ解析',
    A: 'Aランク・RCT',
    B: 'Bランク・コホート研究',
    C: 'Cランク・小規模研究',
  }

  const faqMainEntity: Array<{ '@type': 'Question'; name: string; acceptedAnswer: { '@type': 'Answer'; text: string } }> = []

  if (lossFraming[slug]) {
    faqMainEntity.push({
      '@type': 'Question',
      name: `${concern.nameJa}を放置するとどうなりますか？`,
      acceptedAnswer: { '@type': 'Answer', text: lossFraming[slug] },
    })
  }
  if (concern.mechanism) {
    faqMainEntity.push({
      '@type': 'Question',
      name: `${concern.nameJa}の原因は何ですか？`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${concern.mechanism.cause} ${concern.mechanism.process}`,
      },
    })
  }
  if (concern.riskProfile && concern.riskProfile.length > 0) {
    faqMainEntity.push({
      '@type': 'Question',
      name: `${concern.nameJa}で注意が必要な人は？`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: concern.riskProfile.join(' / '),
      },
    })
  }
  if (top3.length > 0) {
    faqMainEntity.push({
      '@type': 'Question',
      name: `${concern.nameJa}に効く成分は何ですか？`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: top3.map((ing) => `${ing.nameJa}（${rankLabel[ing.evidenceRank]}）`).join('、') + ' の3つが論文エビデンス順に優先される。',
      },
    })
  }

  const faqJsonLd = faqMainEntity.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqMainEntity,
  } : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {itemListJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      )}
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      {/* ── Category Hero ─────────────────────────────── */}
      <div className={`${hero.bg} border-t-4 ${hero.border}`}>
        <div className="max-w-4xl mx-auto px-5 pt-8 pb-10">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-8">
            <Link href="/" className="hover:underline">ホーム</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/concerns" className="hover:underline">悩みから探す</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{concern.nameJa}</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-[48px] leading-none">{concern.emoji}</span>
            <div>
              <p className={`text-[11px] font-semibold tracking-[0.1em] mb-1 ${hero.text}`}>
                {categoryLabel[concern.category] ?? concern.category}
              </p>
              <h1>
                <span className="block text-[30px] sm:text-[40px] font-black text-foreground
                  leading-[1.15] tracking-tight">
                  {concern.nameJa}
                </span>
                <span className={`block text-[14px] sm:text-[16px] font-semibold mt-2 ${hero.text} opacity-80`}>
                  に効く成分・サプリ一覧【論文エビデンス順】
                </span>
              </h1>
            </div>
          </div>

          <p className="text-[15px] text-foreground/75 leading-[1.85] max-w-xl">
            {concern.description}
          </p>

          {/* 損失回避フレーミング */}
          {lossFraming[slug] && (
            <p className="mt-4 text-[13px] text-foreground/60 leading-relaxed max-w-xl
              border-l-2 border-current/20 pl-3 italic">
              {lossFraming[slug]}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 mt-6 text-[13px] text-muted-foreground">
            <span>
              <strong className="text-foreground font-semibold tabular-nums">{all.length}</strong> 関連成分
            </span>
            <span className="w-px h-3 bg-border" />
            <span>
              <strong className="text-foreground font-semibold">{all.filter(i => i.evidenceRank === 'S').length}</strong> Sランク ·{' '}
              <strong className="text-foreground font-semibold">{all.filter(i => i.evidenceRank === 'A').length}</strong> Aランク
            </span>
          </div>

          {/* ランキングへの即決CTA（検索意図分離） */}
          <Link
            href={`/ranking/${slug}`}
            className="inline-flex items-center gap-2 mt-5 text-[13px] font-medium
              bg-white/80 border border-border rounded-full px-4 py-2 min-h-[40px]
              hover:border-accent hover:text-accent transition-colors"
          >
            <Trophy className="w-3.5 h-3.5" />
            {concern.nameJa}サプリをランキングで即決したい
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    <div className="max-w-4xl mx-auto px-5 py-10">

      {/* ── 特に注意が必要な人（riskProfile） ── */}
      {concern.riskProfile && concern.riskProfile.length > 0 && (
        <section className="mb-10">
          <div className="mb-4">
            <p className="text-[12px] font-semibold tracking-[0.05em]
              text-muted-foreground mb-1">
              注意プロファイル
            </p>
            <h2 className="text-[18px] font-bold text-foreground leading-snug">
              {concern.nameJa}で注意が必要な人の特徴
            </h2>
          </div>

          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5">
            <ul className="space-y-2">
              {concern.riskProfile.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="flex-shrink-0 text-amber-700 font-bold text-[15px] leading-[1.5]">
                    ・
                  </span>
                  <span className="text-[13px] text-foreground/85 leading-[1.8]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-[12px] text-amber-900 mt-4 pt-4 border-t border-amber-200 font-semibold leading-relaxed">
              3つ以上該当すれば、すでに進行しているサインと考えて良い。
            </p>
          </div>
        </section>
      )}

      {/* ── メカニズム3ステップ ── */}
      {concern.mechanism && (
        <section className="mb-10">
          <div className="mb-4">
            <p className="text-[12px] font-semibold tracking-[0.05em]
              text-muted-foreground mb-1">
              メカニズム
            </p>
            <h2 className="text-[18px] font-bold text-foreground leading-snug">
              {concern.nameJa}のメカニズム
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { num: '1', label: '原因',           body: concern.mechanism.cause },
              { num: '2', label: '老化への影響',   body: concern.mechanism.process },
              { num: '3', label: '対策の方向性',   body: concern.mechanism.direction },
            ].map((step) => (
              <div key={step.num}
                className="bg-card border border-border rounded-xl p-4 relative">
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full
                    bg-foreground text-background text-[11px] font-bold tabular-nums">
                    {step.num}
                  </span>
                  <span className="text-[11px] font-semibold text-muted-foreground
                    uppercase tracking-[0.08em]">
                    {step.label}
                  </span>
                </div>
                <p className="text-[13px] text-foreground/80 leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-3 bg-foreground/[0.03]
            border-l-2 border-foreground/40 rounded-r-lg px-4 py-3">
            <span className="text-[11px] font-semibold tracking-[0.05em]
              text-muted-foreground flex-shrink-0">結論</span>
            <p className="text-[13px] text-foreground/85 leading-relaxed font-medium">
              だから、以下の3成分が論文エビデンス順に優先される。
            </p>
          </div>
        </section>
      )}

      {/* ── 推奨Top 3 ── */}
      {top3.length > 0 && (() => {
        const top = top3[0]
        const others = top3.slice(1)
        const usageLabel: Record<string, string> = { topical: '外用', oral: '経口', both: '外用・経口' }
        const platformLabel: Record<string, string> = {
          iherb: 'iHerbで見る', amazon: 'Amazonで見る', cosme: '@cosmeで見る',
        }
        const topRankBg: Record<string, string> = {
          S: 'bg-amber-50 border-amber-300',
          A: 'bg-blue-50 border-blue-300',
          B: 'bg-emerald-50 border-emerald-300',
          C: 'bg-stone-100 border-stone-300',
        }
        const topRankBarBg: Record<string, string> = {
          S: 'bg-amber-500', A: 'bg-blue-500', B: 'bg-emerald-500', C: 'bg-stone-400',
        }
        const topRankHoverText: Record<string, string> = {
          S: 'group-hover:text-amber-700',
          A: 'group-hover:text-blue-700',
          B: 'group-hover:text-emerald-700',
          C: 'group-hover:text-stone-600',
        }
        const topProduct = top.products.find((p) => p.rank === 1) ?? top.products[0]
        return (
          <section className="mb-10">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-[12px] font-semibold tracking-[0.05em]
                  text-muted-foreground">
                  推奨Top 3
                </p>
                <span className="text-[10px] text-muted-foreground/70">·</span>
                <p className="text-[11px] text-muted-foreground">
                  まず1つ選んで始める
                </p>
              </div>
              <h2 className="text-[18px] font-bold text-foreground leading-snug">
                {concern.nameJa}の推奨成分Top 3
              </h2>
            </div>

            {/* #1 BEST — 大型カード */}
            <div className={`group border-2 rounded-2xl overflow-hidden mb-3
                transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5
                ${topRankBg[top.evidenceRank]}`}>

              {/* Rank accent bar */}
              <div className={`h-1 w-full ${topRankBarBg[top.evidenceRank]}`} />

              <Link href={`/ingredients/${top.slug}`} className="block p-5
                hover:bg-white/30 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold bg-foreground text-background
                        rounded px-2 py-0.5 tracking-[0.08em]">BEST</span>
                      <EvidenceBadge rank={top.evidenceRank} variant="chip" />
                      {top.usageType && (
                        <span className="text-[11px] text-muted-foreground bg-white/70
                          border border-border rounded px-2 py-0.5">
                          {usageLabel[top.usageType]}
                        </span>
                      )}
                      {top.emerging && (
                        <span className="text-[11px] bg-violet-50 text-violet-700 border
                          border-violet-200 rounded px-2 py-0.5">
                          注目成分
                        </span>
                      )}
                    </div>
                    <h3 className={`text-[24px] font-black text-foreground mb-2
                      ${topRankHoverText[top.evidenceRank]} transition-colors leading-snug`}>
                      {top.nameJa}
                    </h3>
                    <p className="text-[14px] text-foreground/70 leading-relaxed">
                      {top.tagline}
                    </p>
                  </div>
                </div>
                {top.heroStat && (
                  <p className="mt-3 text-[12px] text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">{top.heroStat.value}</strong>
                    {' '}<span className="opacity-70">{top.heroStat.label}</span>
                  </p>
                )}
                {top.dosageMin && (
                  <div className="mt-4 pt-4 border-t border-black/10 flex flex-wrap gap-4
                    text-[12px] text-muted-foreground">
                    <span>
                      有効量:&nbsp;
                      <strong className="text-foreground">
                        {top.dosageMin}{top.dosageMax && top.dosageMax !== top.dosageMin
                          ? `〜${top.dosageMax}` : ''}&nbsp;{top.dosageUnit}
                      </strong>
                    </span>
                    <span>論文: <strong className="text-foreground">{top.papers.length}件</strong></span>
                  </div>
                )}
              </Link>

              {/* Dual CTA bar */}
              <div className="border-t border-black/10 bg-white/60 px-4 py-3
                flex flex-col sm:flex-row gap-2">
                <Link href={`/ingredients/${top.slug}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5
                    text-[13px] font-semibold text-foreground bg-white border border-border
                    rounded-lg px-4 py-2.5 min-h-[44px] hover:border-foreground/40 hover:shadow-sm
                    transition-all">
                  論文エビデンスを確認
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                {topProduct && (
                  <OutboundProductLink
                    href={topProduct.url}
                    platform={topProduct.platform}
                    ingredientSlug={top.slug}
                    productRank={topProduct.rank}
                    aspProgram={topProduct.aspProgram}
                    aspId={topProduct.aspId}
                    commissionRateBand={topProduct.commissionRateBand}
                    className="flex-1 inline-flex items-center justify-center gap-1.5
                      text-[13px] font-semibold text-background bg-foreground rounded-lg
                      px-4 py-2.5 min-h-[44px] hover:opacity-90 transition-opacity"
                  >
                    {platformLabel[topProduct.platform]}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </OutboundProductLink>
                )}
              </div>
            </div>

            {/* #2・#3 代替・補強（コンパクトカード） */}
            {others.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {others.map((ing, idx) => {
                  const ingTopProduct = ing.products.find((p) => p.rank === 1) ?? ing.products[0]
                  return (
                    <div key={ing.slug}
                      className="group bg-card border border-border rounded-xl overflow-hidden
                        hover:border-foreground/30 hover:shadow-sm transition-all duration-150">
                      <Link href={`/ingredients/${ing.slug}`}
                        className="flex items-center gap-3 px-4 py-3">
                        <span className="text-[11px] font-bold text-muted-foreground
                          tabular-nums w-4">
                          {idx + 2}
                        </span>
                        <EvidenceBadge rank={ing.evidenceRank} variant="dot" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-semibold text-foreground truncate
                            group-hover:text-foreground transition-colors">
                            {ing.nameJa}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate">
                            {ing.tagline}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      </Link>
                      <div className="border-t border-border/60 bg-secondary/40 px-2
                        flex items-center justify-between gap-2 text-[12px]">
                        <Link href={`/ingredients/${ing.slug}`}
                          className="text-muted-foreground hover:text-foreground font-medium
                            inline-flex items-center gap-1 px-2 min-h-[44px]">
                          エビデンス
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                        {ingTopProduct && (
                          <OutboundProductLink
                            href={ingTopProduct.url}
                            platform={ingTopProduct.platform}
                            ingredientSlug={ing.slug}
                            productRank={ingTopProduct.rank}
                            aspProgram={ingTopProduct.aspProgram}
                            aspId={ingTopProduct.aspId}
                            commissionRateBand={ingTopProduct.commissionRateBand}
                            className="font-semibold text-foreground hover:underline
                              inline-flex items-center gap-1 px-2 min-h-[44px]"
                          >
                            {platformLabel[ingTopProduct.platform]}
                            <ChevronRight className="w-3 h-3" />
                          </OutboundProductLink>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </section>
        )
      })()}

      {/* Disclaimer */}
      <p className="text-[13px] text-muted-foreground bg-secondary rounded-xl p-4 mb-10">
        エビデンスランクは研究の種類と質を示すものです。個人への効果を保証するものではありません。
        摂取前には医師・薬剤師にご相談ください。
      </p>

      {/* その他の成分（アコーディオン） */}
      {rest.length > 0 && (
        <details className="group">
          <summary className="list-none cursor-pointer flex items-center justify-between
            bg-secondary hover:bg-secondary/80 rounded-xl px-5 py-4 transition-colors">
            <div>
              <p className="text-[13px] font-semibold text-foreground">
                その他の関連成分を見る（{rest.length}件）
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                エビデンスランク別にすべて表示
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground
              group-open:rotate-90 transition-transform" />
          </summary>
          <div className="mt-6 space-y-12">
            {ranks.map((rank) => {
              const items = rest.filter((i) => i.evidenceRank === rank)
              if (!items.length) return null
              return (
                <section key={rank}>
                  <div className="mb-5">
                    <EvidenceBadge rank={rank} variant="chip" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {items.map((ing) => (
                      <IngredientCard
                        key={ing.slug}
                        ingredient={ing}
                        rank={all.indexOf(ing) + 1}
                      />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </details>
      )}

      {/* FAQ（JSON-LDと同じ内容をUI表示） */}
      {faqMainEntity.length > 0 && (
        <section className="mt-14 pt-10 border-t border-border">
          <h2 className="font-bold text-[18px] text-foreground mb-5">
            よくある質問
          </h2>
          <div className="space-y-2">
            {faqMainEntity.map((qa, i) => (
              <details
                key={i}
                className="group border border-border rounded-xl px-5 py-4 bg-background
                  hover:bg-muted/20 transition-colors"
                open={i === 0}
              >
                <summary className="cursor-pointer list-none flex items-start justify-between gap-3
                  font-semibold text-[14px] text-foreground min-h-[44px] items-center">
                  <span className="flex-1">{qa.name}</span>
                  <span className="text-muted-foreground text-[12px] flex-shrink-0
                    group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-[13px] text-foreground/75 leading-[1.85]">
                  {qa.acceptedAnswer.text}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* 関連記事（コラム） */}
      {(() => {
        const relatedArticles = getArticlesByConcern(slug)
        if (relatedArticles.length === 0) return null
        return (
          <section className="mt-14 pt-10 border-t border-border">
            <h2 className="font-bold text-[18px] text-foreground mb-5 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-accent" />
              この悩みに関連する論文ガイド
            </h2>
            <div className="space-y-2">
              {relatedArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group block rounded-xl border border-border bg-background px-5 py-4
                    hover:border-accent/40 hover:bg-muted/30 transition-colors"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em]
                    text-muted-foreground mb-1.5">
                    {article.categoryLabel}
                  </p>
                  <h3 className="font-bold text-[14px] text-foreground group-hover:text-accent
                    leading-snug mb-1.5 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-2">
                    {article.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )
      })()}

      {/* 関連悩み */}
      <div className="mt-14 pt-10 border-t border-border">
        <p className="font-medium text-[14px] text-foreground mb-4">他の悩みを見る</p>
        <div className="flex flex-wrap gap-2">
          {concerns.filter((c) => c.slug !== slug).slice(0, 9).map((c) => (
            <Link
              key={c.slug}
              href={`/concerns/${c.slug}`}
              className={`inline-flex items-center gap-1.5 text-[13px] border
                rounded-full px-4 py-2 min-h-[44px] hover:scale-105 transition-all duration-150
                cat-${c.category}`}
            >
              <span>{c.emoji}</span>
              {c.nameJa}
            </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}
