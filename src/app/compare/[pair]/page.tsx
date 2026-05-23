import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react'
import { getIngredient, concerns as allConcerns } from '@/lib/data'
import { EvidenceBadge } from '@/components/EvidenceBadge'
import { AddToAnalyzerButton } from '@/components/AddToAnalyzerButton'
import { OutboundProductLink } from '@/components/OutboundProductLink'
import { PageViewTracker } from '@/components/PageViewTracker'
import { POPULAR_PAIRS, PAIR_CATEGORIES, PAIR_SEO, PAIR_CUSTOM_FAQS, DISABLE_QUICK_CTA_PAIRS } from '@/lib/compare-data'
import type { Metadata } from 'next'
import type { EvidenceRank, AnalysisAxis } from '@/lib/types'

interface Props { params: Promise<{ pair: string }> }

const BASE_URL = 'https://scibase.app'

/**
 * POPULAR_PAIRS にないペアは404を返す。
 * 過去にPOPULAR_PAIRSに含まれていた弱い比較（tmg-vs-hmb等）が
 * Search Consoleで Thin Content 判定されてインデックス未登録になる問題への対策。
 */
export const dynamicParams = false

export async function generateStaticParams() {
  return POPULAR_PAIRS.map(([a, b]) => ({ pair: `${a}-vs-${b}` }))
}

/** メタディスクリプションをGoogleスニペット長 (約160-170字) に切り詰める。
 *  改行・段落マーカーを除去し、句点で切ることで自然な末尾にする（Critical-SEO改善）。
 *  検索結果スニペットでの末尾切り捨て防止。ページ本文の長文 description はそのまま維持。
 */
function trimMetaDescription(text: string, maxLen = 160): string {
  // 改行を句点+空白に変換、複数の連続空白を1つに圧縮
  const cleaned = text.replace(/\\n\\n/g, ' ').replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim()
  if (cleaned.length <= maxLen) return cleaned
  // 句点で切れる最大位置を探す（maxLen 以内・「。」の直後）
  const sliced = cleaned.slice(0, maxLen + 30)
  const lastPeriod = sliced.lastIndexOf('。')
  if (lastPeriod >= maxLen * 0.7) {
    return sliced.slice(0, lastPeriod + 1)
  }
  // 句点見つからない場合は読点で切る
  const lastComma = sliced.lastIndexOf('、')
  if (lastComma >= maxLen * 0.7) {
    return sliced.slice(0, lastComma) + '。'
  }
  return sliced.slice(0, maxLen) + '…'
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair } = await params
  const idx = pair.indexOf('-vs-')
  if (idx === -1) return {}
  const slugA = pair.slice(0, idx)
  const slugB = pair.slice(idx + 4)
  const ingA = getIngredient(slugA)
  const ingB = getIngredient(slugB)
  if (!ingA || !ingB) return {}
  const pairSeo = PAIR_SEO[pair]
  const rawDesc = pairSeo?.description ?? `${ingA.nameJa}（エビデンス${ingA.evidenceRank}）と${ingB.nameJa}（エビデンス${ingB.evidenceRank}）を論文根拠・有効量・向いている人で徹底比較。口コミでも広告でもなく、査読済み論文で判断する。`
  return {
    title: pairSeo?.title ?? `${ingA.nameJa} vs ${ingB.nameJa}【論文エビデンス比較】どっちが効く？`,
    description: trimMetaDescription(rawDesc),
    alternates: { canonical: `${BASE_URL}/compare/${pair}` },
  }
}

/* エビデンスランクの数値化（比較用） */
const rankScore: Record<EvidenceRank, number> = { S: 4, A: 3, B: 2, C: 1 }
const rankLabel: Record<EvidenceRank, string> = {
  S: 'メタ解析・SR', A: 'RCT', B: 'コホート', C: '動物・小規模',
}
const rankColor: Record<EvidenceRank, string> = {
  S: 'text-amber-700 bg-amber-50 border-amber-200',
  A: 'text-blue-700 bg-blue-50 border-blue-200',
  B: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  C: 'text-stone-600 bg-stone-50 border-stone-200',
}

/* YMYL pair（処方薬境界・薬機法上「どっちが効く？」表現が不適切なペア）
   Critical-1 の H1 SEO最適化で別パターン適用 */
const YMYL_PAIRS = new Set<string>([
  'tranexamic-acid-vs-vitamin-c-topical',  // 美白YMYL
  'curcumin-vs-boswellia',                  // 関節リウマチYMYL
  'ramelteon-vs-melatonin',                 // 不眠処方薬境界
  'saw-palmetto-vs-biotin',                 // AGA薄毛境界
  'tranexamic-acid-vs-arbutin',             // 美白YMYL
  'tranexamic-acid-vs-niacinamide',         // 美白YMYL
  // C2-γ scaffold-pair 補完 22 件のうち YMYL 重
  'nettle-root-extract-vs-saw-palmetto',    // BPH 泌尿器科境界
  'beta-sitosterol-vs-saw-palmetto',        // BPH 泌尿器科境界
  'phyllanthus-niruri-vs-milk-thistle',     // 慢性肝炎・肝サポート YMYL
  'artichoke-cynarin-vs-milk-thistle',      // 肝疾患・胆石症 YMYL
  'methyl-folate-vs-sam-e',                 // うつ病補助療法 精神科境界
  'mucuna-pruriens-vs-maca-black-red-yellow', // パーキンソン病薬・MAOI 相互作用
  'lactoferrin-vs-iron',                    // 貧血治療 内科境界
  'omega3-vs-coq10-ubiquinol-200mg',        // 心血管予防 YMYL
  // C2-β 2026-05-23: 13 YMYL重 + 9 関連（c2-γ既登録 5 件除く 17 件）
  'nattokinase-vs-red-yeast-rice-low-dose',
  'policosanol-sugarcane-vs-red-yeast-rice-low-dose',
  'bergamot-bpf-1000mg-vs-red-yeast-rice-low-dose',
  'bergamot-bpf-1000mg-vs-policosanol-sugarcane',
  'arjuna-bark-vs-hawthorn-extract',
  'sam-e-vs-saffron',
  'sam-e-vs-5-htp',
  'benfotiamine-vs-alpha-lipoic-acid',
  'benfotiamine-vs-r-alpha-lipoic-acid',
  'saw-palmetto-permixon-vs-finasteride-oral',
  'black-cohosh-vs-red-clover-isoflavones',
  'black-cohosh-vs-equol',
  'red-clover-isoflavones-vs-soy-isoflavones',
  'maca-black-red-yellow-vs-red-clover-isoflavones',
  'kava-vs-l-theanine',
  'turkey-tail-vs-reishi',
  'reishi-vs-chaga',
  // C2-α パイロット 2 件（2026-05-23）
  'vinpocetine-vs-ginkgo-biloba',           // 処方薬境界・FDA 妊娠中警告・出血リスク重複
  // C2-α-B 残 8 件のうち YMYL 重 1 件（2026-05-23）
  'glucomannan-vs-psyllium',                // 便秘薬・血糖補助・食道閉塞リスク・薬剤吸収阻害
  // C2-α-R Batch 1: 糖尿系 YMYL 4 件（2026-05-23）
  'gymnema-vs-berberine',                       // 糖尿病薬境界・血糖補助
  'salacia-reticulata-vs-gymnema',              // 糖尿病薬境界・血糖補助
  'mulberry-leaf-dnj-vs-banaba',                // 糖尿病薬境界・血糖補助
  'fenugreek-vs-maca-black-red-yellow',         // 男性ホルモン・前立腺・甲状腺境界
  // C2-ζ beauty-female YMYL 重 1 件（2026-05-23）
  'placenta-vs-collagen-peptide',           // 妊娠中・授乳中・乳がん既往等ホルモン依存性疾患の禁忌差
])

/** H1 SEO最適化（Critical-1）。YMYL pair は薬機法配慮の別パターン */
function getH1Title(pair: string, nameJaA: string, nameJaB: string): string {
  if (YMYL_PAIRS.has(pair)) {
    return `${nameJaA} vs ${nameJaB}｜論文で比較・選び方を解説`
  }
  return `${nameJaA} vs ${nameJaB}｜論文で比較・どっちが効く？併用OK？`
}

/** StudyType を統一表示用に整形（Critical-4） */
function formatStudyType(t: string | undefined): string | null {
  if (!t) return null
  const k = t.toLowerCase().replace(/[\s_-]/g, '')
  if (k.includes('meta') || k.includes('systematicreview') || k === 'sr') return 'メタ解析'
  if (k === 'rct') return 'RCT'
  if (k.includes('cohort')) return 'コホート'
  if (k.includes('observation') || k.includes('crosssect')) return '観察'
  if (k.includes('animal') || k.includes('mouse') || k.includes('rat')) return '動物'
  if (k.includes('invitro') || k.includes('cell')) return 'in vitro'
  if (k.includes('case')) return '症例'
  return t.toUpperCase()
}

/* 7軸の定義 */
const AXES: { key: AnalysisAxis; label: string; emoji: string }[] = [
  { key: 'antiAging',  label: '抗老化',          emoji: '🔬' },
  { key: 'skin',       label: '肌老化',           emoji: '🌿' },
  { key: 'cognitive',  label: '脳・認知',         emoji: '🧠' },
  { key: 'stress',     label: 'ストレス',         emoji: '🧘' },
  { key: 'sleep',      label: '睡眠・回復',       emoji: '🌙' },
  { key: 'immunity',   label: '免疫・炎症',       emoji: '🛡️' },
  { key: 'metabolism', label: '代謝・エネルギー', emoji: '⚡' },
]

export default async function ComparePage({ params }: Props) {
  const { pair } = await params

  /* URL解析: "retinol-vs-bakuchiol" → ['retinol', 'bakuchiol'] */
  const idx = pair.indexOf('-vs-')
  if (idx === -1) notFound()
  const slugA = pair.slice(0, idx)
  const slugB = pair.slice(idx + 4)

  const ingA = getIngredient(slugA)
  const ingB = getIngredient(slugB)
  if (!ingA || !ingB) notFound()

  /* 共通の悩みカテゴリ */
  const sharedConcerns = allConcerns.filter(
    c => ingA.concerns.includes(c.slug) && ingB.concerns.includes(c.slug)
  )
  const onlyA = allConcerns.filter(
    c => ingA.concerns.includes(c.slug) && !ingB.concerns.includes(c.slug)
  )
  const onlyB = allConcerns.filter(
    c => ingB.concerns.includes(c.slug) && !ingA.concerns.includes(c.slug)
  )

  /* エビデンス勝者 */
  const scoreA = rankScore[ingA.evidenceRank]
  const scoreB = rankScore[ingB.evidenceRank]
  const evidenceWinner = scoreA > scoreB ? ingA : scoreB > scoreA ? ingB : null

  /* 軸スコアで勝る成分 */
  const axisWins = { a: 0, b: 0 }
  AXES.forEach(({ key }) => {
    const sA = ingA.axisScores?.[key] ?? 0
    const sB = ingB.axisScores?.[key] ?? 0
    if (sA > sB) axisWins.a++
    else if (sB > sA) axisWins.b++
  })

  /* 月あたりコスト（products[0]がある場合） */
  const costA = ingA.products[0]?.monthlyCostJpy ?? ingA.products[0]?.priceJpy
  const costB = ingB.products[0]?.monthlyCostJpy ?? ingB.products[0]?.priceJpy

  /* 総合おすすめ：エビデンス差が「明確」かつ軸優位も伴う場合のみ発火。
     「やや上回る」だけで一択推奨するのは比較記事の中立性と消費者利益に反するため、
     差が小さい場合は pick=null（「目的・悩みに応じて選択」）にフォールバックする。 */
  const overall = ((): { pick: typeof ingA | null; reason: string } => {
    // ① エビデンス差が大きい (3+) かつ 軸優位も 5/7 以上 → 明確に上回る
    if (Math.abs(scoreA - scoreB) >= 3 && evidenceWinner) {
      const winnerAxisWins = evidenceWinner.slug === ingA.slug ? axisWins.a : axisWins.b
      if (winnerAxisWins >= 5) {
        return { pick: evidenceWinner, reason: 'エビデンスの強さで明確に上回る' }
      }
    }
    // ② エビデンス同等＋月コスト 15%以上の差 → コストで選ぶ
    if (scoreA === scoreB && costA && costB) {
      if (costA < costB * 0.85) return { pick: ingA, reason: 'エビデンス同等で月コストが安い' }
      if (costB < costA * 0.85) return { pick: ingB, reason: 'エビデンス同等で月コストが安い' }
    }
    // それ以外は「目的・悩みに応じて選択」（一択推奨を回避）
    return { pick: null, reason: '目的・悩みに応じて選択' }
  })()

  /* 総合おすすめ成分のTop商品（購入CTA用） */
  const overallTopProduct = overall.pick
    ? overall.pick.products.find(p => p.rank === 1) ?? overall.pick.products[0]
    : null
  const platformLabel: Record<'iherb' | 'amazon' | 'cosme', string> = {
    iherb: 'iHerbで価格を確認', amazon: 'Amazonで価格を確認', cosme: '@cosmeで価格を確認',
  }
  /* 禁忌・刺激性差・用途分担が明確なペアでは「迷ったらこれ」CTAを抑制 */
  const showQuickCTA = !DISABLE_QUICK_CTA_PAIRS.has(pair)

  /* 関連する比較ペア 6件（Critical-3）
     上位3件：同成分（slugA/slugB）を含む pair を優先
     下位3件：同カテゴリ pair で補完
     既存挙動の互換も保つため、不足時はカテゴリのみマッチも採用 */
  const currentCategory = PAIR_CATEGORIES[pair]
  const allCandidates = POPULAR_PAIRS
    .map(([a, b]) => ({ a, b, key: `${a}-vs-${b}` }))
    .filter(p => p.key !== pair)
  const sameIngredientPairs = allCandidates.filter(
    p => p.a === slugA || p.b === slugA || p.a === slugB || p.b === slugB
  )
  const sameCategoryPairs = allCandidates.filter(
    p => PAIR_CATEGORIES[p.key] === currentCategory &&
         !sameIngredientPairs.some(s => s.key === p.key)
  )
  const seen = new Set<string>()
  const merged = [...sameIngredientPairs.slice(0, 3), ...sameCategoryPairs.slice(0, 3)]
    .filter(p => { if (seen.has(p.key)) return false; seen.add(p.key); return true })
  // 6件に満たない場合は残りカテゴリ外でも同成分マッチで補完
  if (merged.length < 6) {
    for (const p of sameIngredientPairs.slice(3)) {
      if (merged.length >= 6) break
      if (!seen.has(p.key)) { merged.push(p); seen.add(p.key) }
    }
  }
  const relatedPairs = merged
    .slice(0, 6)
    .map(({ a, b, key }) => ({ key, ingA: getIngredient(a), ingB: getIngredient(b) }))
    .filter(p => p.ingA && p.ingB)

  /* JSON-LD */
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム',   item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: '成分比較', item: `${BASE_URL}/compare` },
      { '@type': 'ListItem', position: 3, name: `${ingA.nameJa} vs ${ingB.nameJa}`, item: `${BASE_URL}/compare/${pair}` },
    ],
  }

  const customFaqs = PAIR_CUSTOM_FAQS[pair] ?? []
  const faqItems = [
    ...customFaqs,
    {
      q: `${ingA.nameJa}と${ingB.nameJa}はどちらが効果がありますか？`,
      a: evidenceWinner
        ? `論文エビデンスの強さでは${evidenceWinner.nameJa}（${rankLabel[evidenceWinner.evidenceRank]}）が上回ります。ただし用途が異なるため、目的・悩みに応じた選択が重要です。`
        : `${ingA.nameJa}と${ingB.nameJa}は同等のエビデンスランクです。用途・悩みに応じて選択してください。`,
    },
    {
      q: `${ingA.nameJa}と${ingB.nameJa}の違いは何ですか？`,
      a: (() => {
        const labelOf = (ing: typeof ingA, only: typeof onlyA) => {
          // 固有 concern があればそれを表示、なければ全 concern から日本語名で2つ表示
          const list = only.length > 0
            ? only.slice(0, 2)
            : allConcerns.filter(c => ing.concerns.includes(c.slug)).slice(0, 2)
          return list.map(c => c.nameJa).join('・') || '同一カテゴリ'
        }
        return `主な違いは①カバーする悩みカテゴリ（${ingA.nameJa}：${labelOf(ingA, onlyA)}、${ingB.nameJa}：${labelOf(ingB, onlyB)}）、②エビデンスの種類（${ingA.nameJa}：${rankLabel[ingA.evidenceRank]}、${ingB.nameJa}：${rankLabel[ingB.evidenceRank]}）の2点です。`
      })(),
    },
    {
      q: `${ingA.nameJa}と${ingB.nameJa}は一緒に飲んでも大丈夫ですか？`,
      a: sharedConcerns.length > 0
        ? `両成分は異なるメカニズムで機能するため、一般に組み合わせ使用が検討されます。ただし相互作用の研究は限られているため、医師・薬剤師への相談を推奨します。`
        : `目的が異なる成分のため、それぞれの役割で使い分けることが一般的です。`,
    },
    {
      q: `${ingA.nameJa}と${ingB.nameJa}の副作用のリスクはどちらが低いですか？`,
      a: [
        ingA.sideEffects?.length ? `${ingA.nameJa}の主な副作用：${ingA.sideEffects.slice(0,2).join('、')}。` : `${ingA.nameJa}は安全性が高く、重大な副作用の報告は少ないとされています。`,
        ingB.sideEffects?.length ? `${ingB.nameJa}の主な副作用：${ingB.sideEffects.slice(0,2).join('、')}。` : `${ingB.nameJa}は安全性が高く、重大な副作用の報告は少ないとされています。`,
        'いずれも適切な用量・タイミングを守ることで多くの方が問題なく使用できます。持病がある方は使用前に医師に相談してください。',
      ].join(' '),
    },
    ...(costA || costB ? [{
      q: `${ingA.nameJa}と${ingB.nameJa}はどちらがコスパが良いですか？`,
      a: (() => {
        const parts: string[] = []
        if (costA) parts.push(`${ingA.nameJa}は月あたり約¥${costA.toLocaleString()}`)
        if (costB) parts.push(`${ingB.nameJa}は月あたり約¥${costB.toLocaleString()}`)
        if (costA && costB) {
          const cheaper = costA < costB ? ingA.nameJa : costB < costA ? ingB.nameJa : null
          if (cheaper) parts.push(`コスト面では${cheaper}が有利です`)
        }
        parts.push('ただしコスパは「継続できるか」と「目的に合っているか」で判断することが重要です')
        return parts.join('。') + '。'
      })(),
    }] : []),
  ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <PageViewTracker
        eventName="view_compare_pair"
        params={{ pair_slug: pair, ingredient_a: slugA, ingredient_b: slugB }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="max-w-3xl mx-auto px-5 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-8">
          <Link href="/" className="hover:underline">ホーム</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/compare" className="hover:underline">成分比較</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{ingA.nameJa} vs {ingB.nameJa}</span>
        </nav>

        {/* Hero — 損失回避フレーミング */}
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em]
            text-muted-foreground mb-3">論文エビデンス比較</p>
          <h1 className="text-[28px] sm:text-[36px] font-semibold text-foreground
            tracking-tight leading-[1.2] mb-4">
            {getH1Title(pair, ingA.nameJa, ingB.nameJa)}
          </h1>
          <p className="text-[14px] text-muted-foreground leading-relaxed mb-3">
            「どっちがいいか」は口コミではなく、査読済み論文で判断する。
            月¥2,000-15,000のサプリ代より、間違った成分を3-6ヶ月続ける時間損失のほうが取り返しにくい。
          </p>
          {/* アフィリエイトリンク明示（Critical-6）— 景表法/ステマ規制対応 */}
          <p className="text-[10px] text-muted-foreground">
            本ページはアフィリエイトリンクを含みます（一部商品の購入で当サイトに収益が発生します）。
            <Link href="/about" className="underline hover:text-accent ml-1">
              詳しくはこちら
            </Link>
          </p>
        </div>

        {/* ── TL;DR：30秒で分かる結論（認知負荷軽減 + スクロール前の離脱防止） ── */}
        <div className="bg-foreground text-background rounded-2xl p-5 mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-widest opacity-50 mb-3">
            30秒でわかる結論
          </p>
          <div className="space-y-2.5">
            {/* 総合おすすめ */}
            <div className="flex items-start gap-2.5 pb-3 border-b border-white/15">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-400" />
              <p className="text-[13px] leading-snug">
                <span className="font-semibold text-amber-300">総合おすすめ: </span>
                {overall.pick ? overall.pick.nameJa : '目的・悩みに応じて選択'}
                <span className="opacity-60 text-[11px] ml-1.5">（{overall.reason}）</span>
              </p>
            </div>
            {/* エビデンス結論 */}
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" />
              <p className="text-[13px] leading-snug">
                <span className="font-semibold">エビデンス: </span>
                {evidenceWinner
                  ? <>{evidenceWinner.nameJa}が上（{rankLabel[evidenceWinner.evidenceRank]} vs {rankLabel[evidenceWinner.slug === ingA.slug ? ingB.evidenceRank : ingA.evidenceRank]}）</>
                  : <>両成分は同等（{rankLabel[ingA.evidenceRank]}）</>
                }
              </p>
            </div>
            {/* 向いている人 */}
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" />
              <p className="text-[13px] leading-snug">
                <span className="font-semibold">{ingA.nameJa}向き: </span>
                {ingA.whoFor?.[0] ?? ingA.tagline.slice(0, 40) + '…'}
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" />
              <p className="text-[13px] leading-snug">
                <span className="font-semibold">{ingB.nameJa}向き: </span>
                {ingB.whoFor?.[0] ?? ingB.tagline.slice(0, 40) + '…'}
              </p>
            </div>
            {/* コスト（あれば） */}
            {(costA || costB) && (
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" />
                <p className="text-[13px] leading-snug">
                  <span className="font-semibold">月コスト目安: </span>
                  {[costA && `${ingA.nameJa} ¥${costA.toLocaleString()}`, costB && `${ingB.nameJa} ¥${costB.toLocaleString()}`].filter(Boolean).join(' / ')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* TL;DR 直後の CTA 枠。
            ①明確に上回るペア（厳格化条件クリア）→「総合おすすめ」CTA（PR表記付き・購入導線）
            ②それ以外（抑制ペア / pick=null）→ 両成分のデュアル送客カード（成分詳細ページへの中立送客）
            目的：比較記事の主目的＝成分詳細ページへの送客を、どのペアでも担保する。 */}
        {showQuickCTA && overall.pick && overallTopProduct && overallTopProduct.url && overallTopProduct.url !== '#' ? (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-700">
                総合おすすめ
              </p>
              <span className="ml-auto text-[10px] font-semibold border border-amber-400 text-amber-700 rounded px-1.5 py-0.5">
                PR
              </span>
            </div>
            <p className="font-semibold text-[20px] text-foreground mb-1">{overall.pick.nameJa}</p>
            <p className="text-[13px] text-amber-800 mb-4">{overall.reason}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/ingredients/${overall.pick.slug}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5
                  text-[13px] font-semibold bg-amber-500 text-white rounded-xl px-4 py-2.5 min-h-[44px]
                  hover:bg-amber-600 transition-colors"
              >
                エビデンスを詳しく見る
              </Link>
              <OutboundProductLink
                href={overallTopProduct.url}
                platform={overallTopProduct.platform}
                ingredientSlug={overall.pick.slug}
                productRank={overallTopProduct.rank}
                aspProgram={overallTopProduct.aspProgram}
                aspId={overallTopProduct.aspId}
                commissionRateBand={overallTopProduct.commissionRateBand}
                className="flex-1 inline-flex items-center justify-center gap-1.5
                  text-[13px] font-medium border border-amber-300 text-amber-800
                  rounded-xl px-4 py-2.5 min-h-[44px] hover:bg-amber-100 transition-colors"
              >
                {platformLabel[overallTopProduct.platform]}
                <ExternalLink className="w-3.5 h-3.5" />
              </OutboundProductLink>
            </div>
          </div>
        ) : (
          // デュアル送客カード：両成分のエビデンス詳細ページへの中立送客（押し付けず・両者均等に）
          <div className="bg-secondary border border-border rounded-2xl p-5 mb-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-1">
              あなたの目的で選ぶ
            </p>
            <p className="text-[13px] text-muted-foreground mb-4 leading-relaxed">
              {overall.reason === '目的・悩みに応じて選択'
                ? '両成分とも論文の裏付けがあり、悩み・体質・予算で使い分けます。下のカードであなたに近いほうをタップしてください。'
                : '両成分のエビデンスを確認し、悩みに合うほうを選んでください。'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[ingA, ingB].map(ing => (
                <Link key={ing.slug} href={`/ingredients/${ing.slug}`}
                  className="flex flex-col gap-1.5
                    bg-card border border-border rounded-xl px-4 py-3 min-h-[60px]
                    hover:border-accent hover:bg-accent/5 transition-colors group">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <EvidenceBadge rank={ing.evidenceRank} variant="dot" />
                      <p className="text-[13px] font-semibold text-foreground truncate">{ing.nameJa}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
                  </div>
                  {/* 「こんな人向き」を具体表示（ユーザーの自己判断を支援） */}
                  {ing.whoFor?.[0] && (
                    <p className="text-[11px] text-muted-foreground line-clamp-2 leading-snug">
                      {ing.whoFor[0]}
                    </p>
                  )}
                  <p className="text-[10px] text-muted-foreground/70">
                    論文 {ing.papers.length}件・エビデンス{rankLabel[ing.evidenceRank]}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 目次（TOC）— Featured Snippet 候補・jump anchor で離脱率改善（Critical-2） */}
        <nav aria-label="目次" className="mb-8 bg-secondary/40 rounded-2xl p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            このページの内容
          </p>
          <ol className="grid grid-cols-2 gap-x-4 gap-y-2 text-[13px]">
            <li><a href="#verdict"  className="hover:text-accent transition-colors">論文評決</a></li>
            <li><a href="#basics"   className="hover:text-accent transition-colors">成分の基本</a></li>
            <li><a href="#axes"     className="hover:text-accent transition-colors">7軸スコア</a></li>
            <li><a href="#concerns" className="hover:text-accent transition-colors">悩み別カバー</a></li>
            {(ingA.dosageMin || ingB.dosageMin || costA || costB) && (
              <li><a href="#dosage" className="hover:text-accent transition-colors">用量・コスト</a></li>
            )}
            <li><a href="#combine"  className="hover:text-accent transition-colors">併用OK？</a></li>
            <li><a href="#faq"      className="hover:text-accent transition-colors">よくある質問</a></li>
            <li><a href="#related"  className="hover:text-accent transition-colors">関連比較</a></li>
          </ol>
        </nav>

        {/* クイック評決（アンカリング） */}
        <div id="verdict" className="bg-secondary border border-border rounded-2xl p-5 mb-8 scroll-mt-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider
            text-muted-foreground mb-4">論文エビデンスによる評決</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[
              { ing: ingA, wins: axisWins.a },
              { ing: ingB, wins: axisWins.b },
            ].map(({ ing, wins }) => (
              <div key={ing.slug}
                className={`rounded-xl border p-4 text-center ${rankColor[ing.evidenceRank]}`}>
                <div className="text-[11px] font-semibold mb-1">{rankLabel[ing.evidenceRank]}</div>
                <div className="text-[26px] font-bold mb-0.5">{ing.evidenceRank}</div>
                <div className="font-semibold text-[15px] mb-2">{ing.nameJa}</div>
                <div className="text-[11px] opacity-70">{wins}軸で優位</div>
              </div>
            ))}
          </div>
          {evidenceWinner ? (
            <p className="text-[13px] text-foreground leading-relaxed">
              <span className="font-semibold">エビデンスの強さ：{evidenceWinner.nameJa}が上回ります。</span>
              ただし成分の「強さ」は目的によって変わります。下の比較で確認してください。
            </p>
          ) : (
            <p className="text-[13px] text-foreground leading-relaxed">
              両成分は<span className="font-semibold">同等のエビデンスランク</span>です。
              目的・悩みに応じて選択することが重要です。
            </p>
          )}
        </div>

        {/* 成分カード比較（社会的証明） */}
        <section id="basics" className="mb-10 scroll-mt-4">
          <h2 className="font-semibold text-[18px] text-foreground mb-4">成分の基本情報</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[ingA, ingB].map(ing => (
              <div key={ing.slug}
                className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <EvidenceBadge rank={ing.evidenceRank} variant="chip" />
                  <span className="text-[11px] text-muted-foreground">
                    論文 {ing.papers.length}件
                  </span>
                </div>
                <h3 className="font-semibold text-[18px] text-foreground mb-1">{ing.nameJa}</h3>
                <p className="text-[12px] text-muted-foreground mb-3">{ing.nameEn}</p>
                <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">
                  {ing.tagline}
                </p>
                {/* 代表研究 1→3件表示（Critical-4）— 社会的証明強化・E-E-A-T シグナル */}
                {ing.papers.length > 0 && (
                  <div className="mb-4">
                    <p className="text-[11px] font-semibold text-foreground mb-2">代表的な研究</p>
                    {ing.papers.slice(0, 3).map((paper, i) => {
                      const studyTypeLabel = formatStudyType(paper.studyType)
                      return (
                        <div key={i} className="bg-secondary rounded-lg px-3 py-2 text-[11px] mb-2 last:mb-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-semibold text-foreground">{paper.journal}</span>
                            <span className="text-muted-foreground tabular-nums">{paper.year}</span>
                            {paper.sampleSize && (
                              <span className="text-muted-foreground tabular-nums">n={paper.sampleSize.toLocaleString()}</span>
                            )}
                            {studyTypeLabel && (
                              <span className="text-[10px] bg-foreground/10 rounded px-1.5 py-0.5">
                                {studyTypeLabel}
                              </span>
                            )}
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{paper.keyFinding}</p>
                        </div>
                      )
                    })}
                  </div>
                )}
                {/* 商品リンク products[0..1]（Critical-5）— CV機会2-3倍化・PR表記標準化（Critical-6） */}
                {ing.products.length > 0 && (
                  <div className="mb-4 flex flex-col gap-2">
                    {ing.products.slice(0, 2).map((product, i) => (
                      <OutboundProductLink
                        key={i}
                        href={product.url}
                        platform={product.platform}
                        ingredientSlug={ing.slug}
                        productRank={product.rank}
                        aspProgram={product.aspProgram}
                        aspId={product.aspId}
                        commissionRateBand={product.commissionRateBand}
                        className="inline-flex items-center gap-1.5 text-[11px]
                          border border-border rounded-lg px-2.5 py-1.5 min-h-[36px]
                          hover:border-accent/50 hover:bg-secondary/50 transition-colors"
                      >
                        <span className="text-[9px] font-semibold border border-amber-400 text-amber-700 rounded px-1 py-0.5">PR</span>
                        <span className="font-medium text-foreground">{platformLabel[product.platform]}</span>
                        {(product.monthlyCostJpy || product.priceJpy) && (
                          <span className="text-muted-foreground tabular-nums ml-auto">
                            ¥{(product.monthlyCostJpy ?? product.priceJpy)!.toLocaleString()}
                          </span>
                        )}
                        <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      </OutboundProductLink>
                    ))}
                  </div>
                )}
                <div className="mt-4 flex items-center gap-2">
                  <Link href={`/ingredients/${ing.slug}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-[12px] font-semibold
                      bg-foreground text-background rounded-xl px-3 py-2 min-h-[44px]
                      hover:opacity-85 transition-opacity">
                    エビデンス詳細を見る
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <AddToAnalyzerButton slug={ing.slug} variant="compact" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7軸スコア比較（視覚的アンカリング） */}
        <section id="axes" className="mb-10 scroll-mt-4">
          <h2 className="font-semibold text-[18px] text-foreground mb-1">7軸スコア比較</h2>
          <p className="text-[12px] text-muted-foreground mb-4">
            太い数字の軸がその成分の強み。自分が重視する軸で選ぶ。
          </p>
          {(() => {
            type AxisRow = { key: typeof AXES[number]['key']; label: string; emoji: string; sA: number; sB: number; diff: number; max: number }
            const rows: AxisRow[] = AXES.map(({ key, label, emoji }) => {
              const sA = ingA.axisScores?.[key] ?? 0
              const sB = ingB.axisScores?.[key] ?? 0
              return { key, label, emoji, sA, sB, diff: Math.abs(sA - sB), max: Math.max(sA, sB) }
            }).sort((a, b) => b.diff - a.diff || b.max - a.max)
            const primary = rows.slice(0, 4)
            const secondary = rows.slice(4)
            const renderRow = ({ key, label, emoji, sA, sB }: AxisRow, isLast: boolean) => {
              const winA = sA > sB
              const winB = sB > sA
              return (
                <div key={key} className={`grid grid-cols-[1fr_100px_100px] ${isLast ? '' : 'border-b border-border'}`}>
                  <div className="px-4 py-3 flex items-center gap-2">
                    <span className="text-[14px]">{emoji}</span>
                    <span className="text-[12px] text-foreground">{label}</span>
                  </div>
                  <div className="px-3 py-3 flex flex-col items-center justify-center border-l border-border">
                    <div className="w-full bg-secondary rounded-full h-1.5 mb-1.5">
                      <div className={`h-full rounded-full transition-all ${winA ? 'bg-accent' : 'bg-border'}`}
                        style={{ width: `${sA * 10}%` }} />
                    </div>
                    <span className={`text-[13px] tabular-nums font-semibold ${winA ? 'text-accent' : 'text-muted-foreground/50'}`}>
                      {sA.toFixed(1)}
                    </span>
                  </div>
                  <div className="px-3 py-3 flex flex-col items-center justify-center border-l border-border">
                    <div className="w-full bg-secondary rounded-full h-1.5 mb-1.5">
                      <div className={`h-full rounded-full transition-all ${winB ? 'bg-accent' : 'bg-border'}`}
                        style={{ width: `${sB * 10}%` }} />
                    </div>
                    <span className={`text-[13px] tabular-nums font-semibold ${winB ? 'text-accent' : 'text-muted-foreground/50'}`}>
                      {sB.toFixed(1)}
                    </span>
                  </div>
                </div>
              )
            }
            return (
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                {/* ヘッダー行 */}
                <div className="grid grid-cols-[1fr_100px_100px] border-b border-border">
                  <div className="px-4 py-3 text-[11px] font-semibold text-muted-foreground tracking-wider">差が大きい軸（上位{primary.length}軸）</div>
                  <div className="px-3 py-3 text-[12px] font-semibold text-center text-foreground border-l border-border">{ingA.nameJa}</div>
                  <div className="px-3 py-3 text-[12px] font-semibold text-center text-foreground border-l border-border">{ingB.nameJa}</div>
                </div>
                {primary.map((row, i) => renderRow(row, secondary.length === 0 && i === primary.length - 1))}
                {secondary.length > 0 && (
                  <details className="group bg-secondary/30">
                    <summary className="flex items-center justify-between px-4 py-3 cursor-pointer
                      text-[12px] font-medium text-muted-foreground hover:bg-secondary/60
                      transition-colors list-none border-t border-border">
                      <span>残り{secondary.length}軸（差が小さい軸）を見る</span>
                      <span className="group-open:rotate-180 transition-transform duration-200 text-[12px]">▾</span>
                    </summary>
                    <div className="bg-card border-t border-border">
                      {secondary.map((row, i) => renderRow(row, i === secondary.length - 1))}
                    </div>
                  </details>
                )}
              </div>
            )
          })()}
          <p className="text-[11px] text-muted-foreground mt-2">
            差が大きい軸ほど上に表示。スコアが高い方（太字）がその軸でエビデンスの強い成分
          </p>
        </section>

        {/* 悩みカバー比較（パーソナライゼーション） */}
        <section id="concerns" className="mb-10 scroll-mt-4">
          <h2 className="font-semibold text-[18px] text-foreground mb-2">
            あなたの悩みにはどちらが向いているか
          </h2>
          <p className="text-[12px] text-muted-foreground mb-4">
            自分の悩みカテゴリをクリックすると詳しく確認できます
          </p>
          <div className="space-y-4">
            {sharedConcerns.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-5">
                <p className="text-[12px] font-semibold text-foreground mb-3">
                  両方がカバーする悩み（どちらでも対応）
                </p>
                <div className="flex flex-wrap gap-2">
                  {sharedConcerns.map(c => (
                    <Link key={c.slug} href={`/concerns/${c.slug}`}
                      className="inline-flex items-center gap-1.5 text-[12px] border border-border
                        rounded-full px-4 py-2 min-h-[44px] hover:border-accent hover:text-accent transition-colors">
                      {c.emoji} {c.nameJa}
                    </Link>
                  ))}
                </div>
                {evidenceWinner && (
                  <p className="text-[12px] text-muted-foreground mt-3 pt-3 border-t border-border">
                    共通の悩みに対しては、エビデンスの強い
                    <span className="font-semibold text-foreground"> {evidenceWinner.nameJa}</span>
                    を優先する選択肢があります。
                  </p>
                )}
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {onlyA.length > 0 && (
                <div className="bg-card border border-border rounded-2xl p-4">
                  <p className="text-[11px] font-semibold text-foreground mb-2">
                    {ingA.nameJa} だけがカバー
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {onlyA.slice(0, 4).map(c => (
                      <Link key={c.slug} href={`/concerns/${c.slug}`}
                        className="text-[11px] bg-secondary border border-border rounded-full px-2 py-0.5
                          hover:border-accent/50 transition-colors">
                        {c.emoji} {c.nameJa}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {onlyB.length > 0 && (
                <div className="bg-card border border-border rounded-2xl p-4">
                  <p className="text-[11px] font-semibold text-foreground mb-2">
                    {ingB.nameJa} だけがカバー
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {onlyB.slice(0, 4).map(c => (
                      <Link key={c.slug} href={`/concerns/${c.slug}`}
                        className="text-[11px] bg-secondary border border-border rounded-full px-2 py-0.5
                          hover:border-accent/50 transition-colors">
                        {c.emoji} {c.nameJa}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 有効量・コスト比較（コミットメント誘導） */}
        {(ingA.dosageMin || ingB.dosageMin || costA || costB) && (
          <section id="dosage" className="mb-10 scroll-mt-4">
            <h2 className="font-semibold text-[18px] text-foreground mb-4">有効量・コスト比較</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[{ ing: ingA, cost: costA }, { ing: ingB, cost: costB }].map(({ ing, cost }) => (
                <div key={ing.slug} className="bg-card border border-border rounded-2xl p-4">
                  <p className="font-semibold text-[13px] text-foreground mb-3">{ing.nameJa}</p>
                  <dl className="space-y-2 text-[12px]">
                    {ing.dosageMin && (
                      <div className="flex gap-2">
                        <dt className="text-muted-foreground w-16 flex-shrink-0">有効量</dt>
                        <dd className="text-foreground font-medium">
                          {ing.dosageMin}{ing.dosageMax && ing.dosageMax !== ing.dosageMin ? `〜${ing.dosageMax}` : ''} {ing.dosageUnit}
                        </dd>
                      </div>
                    )}
                    {ing.timing && (
                      <div className="flex gap-2">
                        <dt className="text-muted-foreground w-16 flex-shrink-0">タイミング</dt>
                        <dd className="text-foreground leading-relaxed">{ing.timing}</dd>
                      </div>
                    )}
                    {ing.duration && (
                      <div className="flex gap-2">
                        <dt className="text-muted-foreground w-16 flex-shrink-0">継続期間</dt>
                        <dd className="text-foreground leading-relaxed">{ing.duration}</dd>
                      </div>
                    )}
                    {cost && (
                      <div className="flex gap-2 pt-2 border-t border-border">
                        <dt className="text-muted-foreground w-16 flex-shrink-0">月コスト</dt>
                        <dd className="text-foreground font-semibold text-[14px] tabular-nums">
                          ¥{cost.toLocaleString()}〜
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 一緒に使える？（デコイ効果） */}
        <section id="combine" className="mb-10 bg-accent/5 border border-accent/20 rounded-2xl p-5 scroll-mt-4">
          <h2 className="font-semibold text-[15px] text-foreground mb-2">
            {ingA.nameJa}と{ingB.nameJa}は一緒に使える？
          </h2>
          <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">
            {sharedConcerns.length > 0
              ? `両成分は${sharedConcerns.map(c => c.nameJa).join('・')}という共通の悩みをカバーしますが、カバーする軸が異なります。「どちらか一方」ではなく「それぞれの役割分担」で組み合わせるアプローチが、より網羅的なカバーを実現します。`
              : `${ingA.nameJa}と${ingB.nameJa}はカバーする悩みが異なるため、目的が違えば両方使うことに意味があります。サプリ診断で現在のカバー状況を確認し、不足している軸を埋める成分を選ぶことを推奨します。`
            }
          </p>
          <Link href="/analyzer"
            className="inline-flex items-center gap-2 text-[13px] font-semibold
              bg-foreground text-background rounded-xl px-4 py-2.5 min-h-[44px]
              hover:opacity-85 transition-opacity">
            今のサプリと組み合わせて診断する
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>

        {/* Dual CTA（強化版）— コミットメント原理＋FOMO */}
        <section className="mb-10 bg-card border-2 border-accent/30 rounded-2xl p-5">
          <p className="text-[13px] font-semibold text-foreground mb-1">
            比較が終わったら → 7軸カバー状況を確認する
          </p>
          <p className="text-[12px] text-muted-foreground mb-4">
            今のサプリが何軸をカバーしているか分かる。不足している軸が明確になる。
          </p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            {[ingA, ingB].map(ing => (
              <div key={ing.slug} className="flex flex-col gap-2">
                <p className="text-[12px] font-medium text-foreground text-center">{ing.nameJa}</p>
                <AddToAnalyzerButton slug={ing.slug} />
              </div>
            ))}
          </div>
          <Link
            href="/analyzer"
            className="flex items-center justify-center gap-2 w-full
              text-[13px] font-semibold text-accent border border-accent/30
              rounded-xl px-4 py-3 min-h-[44px] hover:bg-accent/5 transition-colors"
          >
            診断結果を見る（7軸レーダーチャート）
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>

        {/* FAQ（AI Overview対策 + 行動経済学5問） */}
        <section id="faq" className="mb-10 scroll-mt-4">
          <h2 className="font-semibold text-[18px] text-foreground mb-4">よくある質問</h2>
          <div className="border border-border rounded-2xl overflow-hidden divide-y divide-border">
            {faqItems.map(({ q, a }, i) => (
              <details key={i} {...(i === 0 ? { open: true } : {})} className="group bg-card">
                <summary className="flex items-start justify-between gap-3 px-5 py-4
                  cursor-pointer hover:bg-secondary/50 transition-colors list-none">
                  <span className="text-[13px] font-semibold text-foreground leading-snug">Q. {q}</span>
                  <span className="text-muted-foreground flex-shrink-0 mt-0.5
                    group-open:rotate-180 transition-transform duration-200 text-[12px]">▾</span>
                </summary>
                <div className="px-5 pb-5 pt-1 space-y-3">
                  {a.split(/\n{2,}/).map((para, j) => (
                    <p key={j} className="text-[13px] text-muted-foreground leading-[1.85]">
                      {para.trim()}
                    </p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* 関連する比較（離脱防止 + 内部リンク強化） */}
        {relatedPairs.length > 0 && (
          <section id="related" className="mb-10 scroll-mt-4">
            <h2 className="font-semibold text-[15px] text-foreground mb-3">
              関連する比較
            </h2>
            <div className="space-y-2">
              {relatedPairs.map(({ key, ingA: rA, ingB: rB }) => {
                if (!rA || !rB) return null
                return (
                  <Link key={key} href={`/compare/${key}`}
                    className="flex items-center justify-between gap-3 bg-card border border-border
                      rounded-xl px-4 py-3 hover:border-accent/40 transition-colors group">
                    <span className="text-[13px] font-medium text-foreground">
                      {rA.nameJa} vs {rB.nameJa}
                    </span>
                    <div className="flex items-center gap-2">
                      <EvidenceBadge rank={rA.evidenceRank} variant="dot" />
                      <span className="text-[10px] text-muted-foreground/50">vs</span>
                      <EvidenceBadge rank={rB.evidenceRank} variant="dot" />
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                  </Link>
                )
              })}
            </div>
            <Link href="/compare"
              className="inline-block mt-3 text-[12px] text-accent hover:underline">
              比較一覧をすべて見る →
            </Link>
          </section>
        )}

        {/* 個別ページへのリンク */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {[ingA, ingB].map(ing => (
            <Link key={ing.slug} href={`/ingredients/${ing.slug}`}
              className="flex-1 flex items-center justify-between gap-2
                bg-card border border-border rounded-xl px-4 py-3
                hover:border-accent/50 transition-colors group">
              <div>
                <p className="text-[13px] font-semibold text-foreground">{ing.nameJa}の詳細</p>
                <p className="text-[11px] text-muted-foreground">論文 {ing.papers.length}件・{rankLabel[ing.evidenceRank]}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </Link>
          ))}
        </div>

        {/* 免責事項 + Aboutリンク（信頼構築） */}
        <div className="bg-secondary border border-border rounded-xl p-4
          text-[12px] text-muted-foreground leading-relaxed">
          本ページの情報は医療的アドバイスを提供するものではありません。
          掲載内容は査読済み論文に基づく研究情報の提供を目的としており、
          特定成分・商品の効果・効能を保証するものではありません。
          持病・服薬中の方は使用前に医師・薬剤師にご相談ください。
          <Link href="/about" className="text-accent hover:underline ml-1">
            エビデンス評価基準について →
          </Link>
        </div>
      </div>
    </>
  )
}
