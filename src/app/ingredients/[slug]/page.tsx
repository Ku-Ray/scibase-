import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, ExternalLink, ArrowLeft, ArrowRight, Trophy, BarChart2, GitCompare, BookOpen, Clock, Compass } from 'lucide-react'
import { getIngredient, getIngredientsByConcern, ingredients, concerns } from '@/lib/data'
import { getArticlesByIngredient } from '@/lib/articles'
import { getAlternatives } from '@/lib/utils'
import { EvidenceBadge, EvidenceBar } from '@/components/EvidenceBadge'
import { IngredientCard } from '@/components/IngredientCard'
import { TableOfContents } from '@/components/TableOfContents'
import { AddToAnalyzerButton } from '@/components/AddToAnalyzerButton'
import { OutboundProductLink } from '@/components/OutboundProductLink'
import { ProductOfferCard } from '@/components/product/ProductOfferCard'
import { IngredientTestKitCTACard } from '@/components/product/IngredientTestKitCTACard'
import { ComparisonTable } from '@/components/product/ComparisonTable'
import { scoreProduct, computeAxisLeaders } from '@/lib/productScore'
import type { TocSection } from '@/components/TableOfContents'
import type { Metadata } from 'next'
import type { EvidenceRank } from '@/lib/types'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return ingredients.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const ing = getIngredient(slug)
  if (!ing) return {}

  const usageAxis =
    ing.usageType === 'topical' ? '推奨濃度' :
    ing.usageType === 'both'    ? '使い方'   :
                                  '有効量'
  const descAxis =
    ing.usageType === 'topical' ? '推奨濃度・使い方・副作用' :
    ing.usageType === 'both'    ? '有効量・濃度・副作用'     :
                                  '有効量・タイミング・副作用'

  return {
    title: ing.seoTitle ?? `${ing.nameJa} 効果・副作用・${usageAxis}【エビデンス${ing.evidenceRank}】`,
    description: ing.seoDescription ?? `${ing.nameJa}の論文エビデンス${ing.evidenceRank}ランク。${ing.papers.length}本の研究から${descAxis}を解説。${ing.tagline}`,
    alternates: { canonical: `${BASE_URL}/ingredients/${slug}` },
  }
}

const studyLabel: Record<string, string> = {
  'meta-analysis': 'メタ解析・SR',
  rct:             'RCT',
  cohort:          'コホート研究',
  observational:   '観察研究',
  animal:          '動物実験',
}

const usageLabel: Record<string, string> = {
  topical: '外用',
  oral:    '経口',
  both:    '外用・経口',
}

/* Hero: light bg + accent border-top per rank */
const heroBg: Record<EvidenceRank, string> = {
  S: 'bg-amber-50',
  A: 'bg-blue-50',
  B: 'bg-emerald-50',
  C: 'bg-stone-100',
}
const heroBorder: Record<EvidenceRank, string> = {
  S: 'border-t-amber-500',
  A: 'border-t-blue-500',
  B: 'border-t-emerald-500',
  C: 'border-t-stone-400',
}
const heroText: Record<EvidenceRank, string> = {
  S: 'text-amber-700',
  A: 'text-blue-700',
  B: 'text-emerald-700',
  C: 'text-stone-600',
}
const heroBarBg: Record<EvidenceRank, string> = {
  S: 'bg-amber-500',
  A: 'bg-blue-500',
  B: 'bg-emerald-500',
  C: 'bg-stone-400',
}

/* Rank description for hero */
const rankDesc: Record<EvidenceRank, string> = {
  S: 'メタ解析・SR で確認',
  A: 'RCT（比較試験）で確認',
  B: 'コホート研究で関連',
  C: 'ヒトデータ不十分',
}

/* SciBase 論文エビデンス指数 PEI（v2.2）の色分け（EV-β：rank との役割分担を物理的に表現）
   7.0+ green / 5.0-6.9 blue / 3.0-4.9 gray / 0.0-2.9 muted gray */
function paperEvidenceColor(overall: number): {
  bg: string; border: string; text: string; bar: string;
} {
  if (overall >= 7.0) return { bg: 'bg-green-50',  border: 'border-green-300',  text: 'text-green-800',  bar: 'bg-green-500'  }
  if (overall >= 5.0) return { bg: 'bg-blue-50',   border: 'border-blue-300',   text: 'text-blue-800',   bar: 'bg-blue-500'   }
  if (overall >= 3.0) return { bg: 'bg-stone-100', border: 'border-stone-300',  text: 'text-stone-700',  bar: 'bg-stone-500'  }
  return                     { bg: 'bg-stone-50',  border: 'border-stone-200',  text: 'text-stone-500',  bar: 'bg-stone-400'  }
}

const BASE_URL = 'https://scibase.app'

/* Pillar #1（30代抗老化サプリ完全ガイド）で言及される主要成分。
   該当成分ページからのみ Pillar #1 への逆向き内部リンクを表示し、
   PageRank を集約しつつ関連性を保つ。 */
const PILLAR1_INGREDIENTS = new Set([
  '5-htp', 'alpha-lipoic-acid', 'ashwagandha', 'astaxanthin', 'bakuchiol',
  'berberine', 'calcium', 'chromium', 'collagen-peptide', 'coq10',
  'folic-acid', 'gaba', 'ginkgo-biloba', 'glycine', 'iron',
  'l-theanine', 'l-tryptophan', 'magnesium', 'magnesium-glycinate', 'melatonin',
  'niacin', 'nmn', 'omega3', 'probiotics', 'resveratrol',
  'retinol', 'rhodiola', 'soy-isoflavones', 'tmg', 'tranexamic-acid',
  'vitamin-c-oral', 'vitamin-d', 'vitamin-e', 'vitamin-k2', 'zinc',
])

export default async function IngredientPage({ params }: Props) {
  const { slug } = await params
  const ing = getIngredient(slug)
  if (!ing) notFound()

  const relatedConcerns = concerns.filter((c) => ing.concerns.includes(c.slug))

  const relatedArticles = getArticlesByIngredient(slug)

  const usageAxis =
    ing.usageType === 'topical' ? '推奨濃度' :
    ing.usageType === 'both'    ? '使い方'   :
                                  '有効量'

  const siblingIngredients = [
    ...new Map(
      ing.concerns
        .flatMap(cs => getIngredientsByConcern(cs))
        .filter(i => i.slug !== slug)
        .map(i => [i.slug, i])
    ).values()
  ].slice(0, 6)

  /* ── Phase 5-B: 同一商品 iHerb/Amazon 集約 ──────────────────
     name 末尾の「（Amazon版）」「（iHerb版）」「（楽天版）」を削除して正規化し、
     同じ brand + 正規化 name の商品を1グループに集約する。
     主オファー = iHerb 優先 > Amazon > その他、同 platform なら rank ASC。
     副オファーは ProductOfferCard.secondaryOffers として併記され、カード内に
     「Amazonで詳細を見る ¥xxx」型の具体ASPボタンとして描画される。
     これで重複カード（Beauty of Joseon × iHerb版・Amazon版が別カードになる問題）を解消。 */
  const normalizeProductName = (name: string): string =>
    name.replace(/\s*[（(](Amazon|iHerb|楽天|Rakuten|amazon|iherb|rakuten)版?[）)]\s*$/i, '').toLowerCase().trim()
  const PLATFORM_PRIORITY: Record<string, number> = { iherb: 0, amazon: 1, rakuten: 2, cosme: 3 }
  const productGroupMap = new Map<string, typeof ing.products>()
  for (const p of ing.products) {
    const key = `${p.brand}::${normalizeProductName(p.name)}`
    if (!productGroupMap.has(key)) productGroupMap.set(key, [])
    productGroupMap.get(key)!.push(p)
  }
  const aggregatedGroups = Array.from(productGroupMap.values()).map(group => {
    const sorted = [...group].sort((a, b) => {
      const pa = PLATFORM_PRIORITY[a.platform] ?? 99
      const pb = PLATFORM_PRIORITY[b.platform] ?? 99
      if (pa !== pb) return pa - pb
      return (a.rank ?? 99) - (b.rank ?? 99)
    })
    return { primary: sorted[0], secondaries: sorted.slice(1) }
  })

  /* Products: SciBase 推奨度 DESC で並べ替え（同点は手動 rank ASC で決定）。
     これで「1位の商品 = 最も推奨度が高い商品」が常に成立し ★ 表示と矛盾しない。
     集約後の主オファーで並べ替える。 */
  const sortedGroups = aggregatedGroups
    .map(g => ({ ...g, s: scoreProduct(g.primary, ing) }))
    .sort((a, b) => {
      const diff = b.s.recommendationScore - a.s.recommendationScore
      if (Math.abs(diff) > 0.001) return diff
      return (a.primary.rank ?? 99) - (b.primary.rank ?? 99)
    })
  const sortedProducts = sortedGroups.map(g => g.primary)
  const heroGroup = sortedGroups.find(g => g.primary.platform !== 'cosme') ?? null
  const secondaryGroups = sortedGroups.filter(g => g !== heroGroup && g.primary.platform !== 'cosme')
  const cosmeGroup = sortedGroups.find(g => g.primary.platform === 'cosme') ?? null
  const heroProduct = heroGroup?.primary ?? null
  const heroSecondaries = heroGroup?.secondaries ?? []
  const cosmeProduct = cosmeGroup?.primary ?? null
  const heroScore = heroProduct ? scoreProduct(heroProduct, ing) : null
  /** 軸別1位（multi-context 勝者バッジ用） */
  const axisLeaders = computeAxisLeaders(ing)
  /** 自動生成：BEST PICK の客観的根拠（景表法クリア・実際に4以上の強みのみ列挙） */
  const bestPickReasonAuto = heroProduct && heroScore
    ? [
        heroScore.evidenceScore != null && heroScore.evidenceScore >= 4 ? '論文有効量を充足' : null,
        (heroProduct.heavyMetalTested && heroProduct.thirdPartyTested) ? '重金属＋第三者検査済'
          : heroProduct.heavyMetalTested ? '重金属検査済'
          : heroProduct.thirdPartyTested ? '第三者検査済' : null,
        heroProduct.certifications?.includes('NSF') ? 'NSF認証' :
          heroProduct.certifications?.includes('USP') ? 'USP認証' :
            heroProduct.certifications?.includes('GMP') ? 'GMP認証' : null,
        heroScore.purityScore >= 4 ? 'Non-GMO/Organic 等の高純度' : null,
      ].filter(Boolean).join('・')
    : ''
  const searchSuffix = ing.usageType === 'topical' ? ' スキンケア' : ' サプリ'
  const searchUrls = {
    iherb: `https://www.iherb.com/search?kw=${encodeURIComponent(ing.nameEn)}`,
    amazon: `https://www.amazon.co.jp/s?k=${encodeURIComponent(ing.nameJa + searchSuffix)}&tag=scibase-22`,
  }
  /**
   * 主モール以外の検索CTA（multi-CTA 構成）。
   * 編集方針（2026-05-07）:
   * - 経口サプリ（usageType !== 'topical'）→ iHerbのみ。Amazon/楽天検索CTAは表示しない
   * - 外用製品（usageType === 'topical' or 'both'）→ iHerb + Amazon の両方表示。楽天は削除
   */
  const isTopical = ing.usageType === 'topical' || ing.usageType === 'both'
  const heroSubLinks: { platform: 'iherb' | 'amazon' | 'cosme'; searchUrl: string; label?: string }[] | undefined =
    heroProduct && isTopical
      ? ([
          heroProduct.platform !== 'amazon'
            ? { platform: 'amazon' as const, searchUrl: searchUrls.amazon, label: `Amazonで「${ing.nameJa}」を検索` }
            : null,
          heroProduct.platform !== 'iherb'
            ? { platform: 'iherb' as const, searchUrl: searchUrls.iherb, label: `iHerbで「${ing.nameEn}」を検索` }
            : null,
        ].filter(Boolean) as { platform: 'iherb' | 'amazon' | 'cosme'; searchUrl: string; label?: string }[])
      : undefined

  /* 主要論文を citation として最大8件流し込み（メタ解析→RCT→コホート→観察→動物の優先順） */
  const studyPriorityMap: Record<string, number> = {
    'meta-analysis': 0, rct: 1, cohort: 2, observational: 3, animal: 4,
  }
  const citationPapers = [...ing.papers]
    .sort((a, b) => (studyPriorityMap[a.studyType] ?? 9) - (studyPriorityMap[b.studyType] ?? 9))
    .slice(0, 8)

  const articleJsonLd = {
    '@context':        'https://schema.org',
    '@type':           'Article',
    headline:          `${ing.nameJa}の効果・副作用・論文エビデンス`,
    description:       ing.tagline,
    image:             `${BASE_URL}/ingredients/${slug}/opengraph-image`,
    url:               `${BASE_URL}/ingredients/${slug}`,
    datePublished:     ing.updatedAt,
    dateModified:      ing.updatedAt,
    author: {
      '@type': 'Person',
      '@id': `${BASE_URL}/about#author`,
      name: 'SciBase 編集者',
      url: `${BASE_URL}/about#author`,
      jobTitle: '化粧品メーカー現役研究者',
      sameAs: ['https://x.com/r_evidence_'],
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'SciBase',
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo/symbol-dark-512.png` },
    },
    mainEntityOfPage:  { '@type': 'WebPage', '@id': `${BASE_URL}/ingredients/${slug}` },
    ...(citationPapers.length > 0 && {
      citation: citationPapers.map((p) => ({
        '@type': 'ScholarlyArticle',
        name: p.title,
        datePublished: String(p.year),
        isPartOf: { '@type': 'Periodical', name: p.journal },
      })),
    }),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム',   item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: '成分一覧', item: `${BASE_URL}/ingredients` },
      { '@type': 'ListItem', position: 3, name: ing.nameJa, item: `${BASE_URL}/ingredients/${slug}` },
    ],
  }

  /* Auto-generate FAQ — 行動経済学フレーミング適用 */
  const rankDescFull: Record<EvidenceRank, string> = {
    S: 'メタ解析（複数RCTの統合解析）という最上位のエビデンス',
    A: 'RCT（ランダム化比較試験）という厳密な比較実験',
    B: 'コホート研究・大規模観察研究',
    C: '動物実験・小規模研究（ヒトでの大規模検証は不十分）',
  }
  const topPaper = ing.papers[0]
  const concernNames = relatedConcerns.map(c => c.nameJa).join('・')

  const faqItems = [
    /* Q1: エビデンス検証（アンカリング＋社会的証明）— 常時表示 */
    {
      q: `${ing.nameJa}に科学的な効果はありますか？`,
      a: `エビデンスランク${ing.evidenceRank}です。${rankDescFull[ing.evidenceRank]}で根拠が確認されています。${topPaper ? `代表的な研究では「${topPaper.keyFinding}」が示されています（${topPaper.journal}・${topPaper.year}年${topPaper.sampleSize ? `・${topPaper.sampleSize.toLocaleString()}人対象` : ''}）。` : ''}口コミや広告ではなく、査読済み論文のみを根拠としています。`,
    },
    /* Q2: 損失回避（使わないとどうなるか）— 常時表示 */
    relatedConcerns.length > 0 ? {
      q: `${ing.nameJa}を使わないとどうなりますか？`,
      a: `${concernNames}への対策を後回しにするほど、加齢とともに改善が難しくなる傾向があります。多くの研究で「早期からの継続的なアプローチ」が推奨されており、問題が顕在化してからでは対策の効果が限定的になることも少なくありません。今すぐ始めることと、数年後に始めることでは、長期的な結果に大きな差が生まれます。`,
    } : null,
    /* Q3: パーソナライゼーション（どんな人向きか）*/
    ing.whoFor?.length ? {
      q: `${ing.nameJa}はどんな人に向いていますか？`,
      a: `特に次のような方に向いています：${ing.whoFor.join('、')}。逆に、すでに食事からこれらの栄養素を十分に摂取できている方や、該当する悩みがない方は優先度が下がります。まず自分が当てはまるかどうかを確認することが、失敗しない成分選びの出発点です。`,
    } : null,
    /* Q4: 有効量（コミットメント誘導）*/
    ing.dosageMin ? {
      q: `${ing.nameJa}の${ing.usageType === 'topical' ? '推奨濃度' : '有効量'}はどのくらいですか？`,
      a: `論文で効果が確認されているのは${ing.dosageMin}${ing.dosageMax && ing.dosageMax !== ing.dosageMin ? `〜${ing.dosageMax}` : ''} ${ing.dosageUnit}です。${ing.timing ? `タイミングは「${ing.timing}」が推奨されています。` : ''}この量を下回ると研究で示された効果が得られない可能性があります。市販品の中には有効量に満たないものもあるため、配合量の確認が重要です。`,
    } : null,
    /* Q5: 継続期間（コミットメント原理＋損失回避）*/
    ing.duration ? {
      q: `${ing.nameJa}はどのくらいの期間で効果が出ますか？`,
      a: `${ing.duration}。多くの方が数週間で諦めてしまいますが、研究で効果が確認されているのはいずれも継続使用が前提です。途中でやめてしまうと、蓄積されたはずの効果が失われる可能性があります。少なくとも研究期間と同程度の継続を目標に設定することを推奨します。`,
    } : null,
    /* Q6: 副作用（信頼構築）*/
    ing.sideEffects?.length ? {
      q: `${ing.nameJa}の副作用はありますか？安全に使えますか？`,
      a: `報告されている副作用：${ing.sideEffects.join('、')}。${ing.contraindications?.length ? `特に${ing.contraindications.join('、')}の方は使用前に医師に相談してください。` : ''}適切な用量・タイミングを守ることで、多くの方が問題なく使用できます。不安がある場合は医師・薬剤師への相談を推奨します。`,
    } : null,
    /* Q7: 飲み合わせ（医薬品との相互作用）*/
    ing.interactions?.length ? {
      q: `${ing.nameJa}と薬を一緒に飲んでも大丈夫ですか？`,
      a: `${ing.interactions.map(x => {
        const lvl = x.level === 'avoid' ? '併用回避が推奨されます' : x.level === 'caution' ? '併用には注意が必要です' : '経過観察が推奨されます'
        return `${x.substance}との併用：${lvl}。${x.mechanism}`
      }).join(' ')} 服薬中の方は自己判断で併用せず、必ず医師・薬剤師に相談してください。`,
    } : ing.interactions !== undefined ? {
      q: `${ing.nameJa}と薬を一緒に飲んでも大丈夫ですか？`,
      a: `${ing.nameJa}について、現時点で添付文書・FDA警告・査読論文レベルで併用に重要な注意が必要とされる医薬品の報告は確認されていません。ただし処方薬を服用中の方や持病のある方は、新たな成分を始める前に医師・薬剤師にご相談ください。`,
    } : {
      q: `${ing.nameJa}と薬を一緒に飲んでも大丈夫ですか？`,
      a: `現時点で添付文書レベルの重要な相互作用は本ページに掲載していませんが、処方薬を服用中の方は念のため医師・薬剤師にご相談ください。サプリメントの成分には個人差があり、新しい相互作用が後から報告されることもあります。`,
    },
    /* 成分固有のFAQ（用量別・薬剤併用など個別ナレッジ） */
    ...(ing.customFaqs ?? []),
  ].filter(Boolean) as { q: string; a: string }[]

  const faqJsonLd = faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({
      '@type':         'Question',
      name:            q,
      acceptedAnswer:  { '@type': 'Answer', text: a },
    })),
  } : null

  /* Products ItemList JSON-LD — プラットフォーム別Top推奨商品（アフィリエイト商品）
     Amazon検索URL（/s?k=）は具体商品ではないため JSON-LD からは除外 */
  const rankedProducts = ing.products
    .filter(p => p.rank && !/\/s\?k=/.test(p.url))
    .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))
  const productsJsonLd = rankedProducts.length > 0 ? {
    '@context': 'https://schema.org',
    '@type':    'ItemList',
    name:       `${ing.nameJa}のおすすめ商品（論文エビデンス基準）`,
    description: `論文で有効とされた用量・濃度を含む${ing.nameJa}商品を独立した立場で評価・選定。`,
    numberOfItems: rankedProducts.length,
    itemListElement: rankedProducts.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name:  p.name,
        image: `${BASE_URL}/ingredients/${slug}/opengraph-image`,
        brand: { '@type': 'Brand', name: p.brand },
        ...(p.reasonJa && { description: p.reasonJa }),
        ...(p.certifications?.length && {
          hasCertification: p.certifications.map(c => ({ '@type': 'Certification', name: c })),
        }),
        offers: {
          '@type':        'Offer',
          price:          p.priceJpy,
          priceCurrency:  'JPY',
          url:            p.url,
          availability:   'https://schema.org/InStock',
        },
      },
    })),
  } : null

  /* HowTo JSON-LD — 始め方3ステップ（DOM表示と同一文言） */
  const howToJsonLd = (ing.dosageMin || ing.timing || ing.duration) ? {
    '@context': 'https://schema.org',
    '@type':    'HowTo',
    name:       `${ing.nameJa}の始め方`,
    description: `${ing.nameJa}を論文で示された用量・タイミング・期間で使い始める3ステップ。`,
    totalTime:  'P1D',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name:    '有効量を確認する',
        text: ing.dosageMin
          ? ing.dosageUnit.includes('濃度')
            ? `配合濃度${ing.dosageMin}%以上の製品を選ぶ。論文で使用された濃度の基準となる。`
            : `1日${ing.dosageMin}${ing.dosageMax && ing.dosageMax !== ing.dosageMin ? `〜${ing.dosageMax}` : ''}${ing.dosageUnit}を目安にする。この量が論文で効果を確認した用量。`
          : '製品ラベルの配合量を確認する。',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name:    'タイミングと使い方',
        text: ing.timing ?? (ing.usageType === 'topical'
          ? '洗顔後の清潔な肌に使用。保湿剤の前に塗布するのが一般的。'
          : '食事と一緒に摂取するのが吸収を助けることが多い。'),
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name:    '効果が出るまでの期間',
        text: ing.duration ?? '継続的な使用が重要。数週間〜数ヶ月単位での評価が必要。短期間での判断は避ける。',
      },
    ],
  } : null

  /* Health-specific schema — DietarySupplement / MedicalSubstance / Drug
     AIO/LLM の引用ソース化用。schemaType override → 自動判定（topical=MedicalSubstance / otherwise=DietarySupplement）。
     医薬品成分（メラトニン等）は data.ts で schemaType: 'Drug' を明示。 */
  const inferredSchemaType: 'DietarySupplement' | 'MedicalSubstance' | 'Drug' =
    ing.schemaType ?? (ing.usageType === 'topical' ? 'MedicalSubstance' : 'DietarySupplement')
  const warningParts = [...(ing.sideEffects ?? []), ...(ing.contraindications ?? [])]
  const heroBrand = ing.products[0]?.brand
  const supplementSchema = {
    '@context': 'https://schema.org',
    '@type': inferredSchemaType,
    name: ing.nameJa,
    alternateName: [ing.nameEn, ...(ing.aliases ?? [])].filter(Boolean),
    description: ing.tagline,
    url: `${BASE_URL}/ingredients/${slug}`,
    activeIngredient: ing.nameJa,
    nonProprietaryName: ing.nameEn,
    legalStatus: ing.legalStatus ?? (inferredSchemaType === 'Drug' ? 'Drug' : 'DietarySupplement'),
    ...(ing.mechanismOfAction && { mechanismOfAction: ing.mechanismOfAction }),
    ...(ing.tagline && { indication: ing.tagline }),
    ...(warningParts.length > 0 && { warning: warningParts.join('; ') }),
    ...(ing.dosageMin && {
      recommendedIntake: {
        '@type': 'RecommendedDoseSchedule',
        doseValue: ing.dosageMin,
        doseUnit: ing.dosageUnit,
        ...(ing.timing && { frequency: ing.timing }),
      },
    }),
    ...(ing.dosageMax && {
      maximumIntake: {
        '@type': 'MaximumDoseSchedule',
        doseValue: ing.dosageMax,
        doseUnit: ing.dosageUnit,
      },
    }),
    ...(heroBrand && {
      manufacturer: { '@type': 'Organization', name: heroBrand },
    }),
  }

  /* Build ToC sections */
  const tocSections: TocSection[] = [
    { id: 'description', label: 'この成分について' },
    ...(ing.whoFor?.length ? [{ id: 'who-for', label: 'こんな人に' }] : []),
    { id: 'papers', label: '主要研究' },
    ...(ing.publicDbReferences?.length ? [{ id: 'public-db-references', label: '公的DB参照' }] : []),
    { id: 'evidence', label: 'エビデンスの読み方' },
    ...((ing.dosageMin || ing.timing || ing.duration) ? [{ id: 'dosage', label: '摂取・使用ガイド' }] : []),
    ...(ing.dosageLevels?.length ? [{ id: 'dosage-levels', label: '用量別の効果' }] : []),
    { id: 'faq', label: 'よくある疑問' },
    ...((ing.sideEffects?.length || ing.contraindications?.length) ? [{ id: 'safety', label: '副作用・注意' }] : []),
    ...(ing.interactions !== undefined ? [{ id: 'interactions', label: '飲み合わせ' }] : []),
    ...((ing.dosageMin || ing.timing || ing.duration) ? [{ id: 'start', label: '始め方' }] : []),
    ...(ing.products.length > 0 ? [{ id: 'products', label: 'おすすめ商品' }] : []),
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(supplementSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      {howToJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      )}
      {productsJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }} />
      )}

      {/* ── Hero (light tinted block) ─────────────────── */}
      <div className={`${heroBg[ing.evidenceRank]} border-t-8 ${heroBorder[ing.evidenceRank]}`}>
        <div className="max-w-2xl mx-auto px-5 pt-8 pb-10">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-8">
            <Link href="/" className="hover:underline">ホーム</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/ingredients" className="hover:underline">成分一覧</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{ing.nameJa}</span>
          </nav>

          {/* Rank badge + usage + concerns + PEI（論文エビデンス指数）バッジ（Compact） */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className={`inline-flex items-center gap-1.5 ${heroText[ing.evidenceRank]}
              bg-white/70 border border-current/20 rounded-lg px-3 py-1.5 text-[13px] font-semibold`}>
              <EvidenceBadge rank={ing.evidenceRank} variant="dot" />
              {rankDesc[ing.evidenceRank]}
            </span>
            {ing.evidenceScore && (() => {
              const c = paperEvidenceColor(ing.evidenceScore.overall)
              return (
                <Link
                  href="/about/evidence-scoring"
                  aria-label={`PEI（論文エビデンス指数）${ing.evidenceScore.overall.toFixed(1)} / 10（評価ランクとは別軸）`}
                  className={`paper-evidence-badge inline-flex items-center gap-1
                    ${c.bg} ${c.border} ${c.text} border rounded-lg
                    px-2.5 py-1 text-[11px] font-medium hover:opacity-80 transition-opacity`}
                >
                  <span className="font-bold tracking-wider">PEI</span>
                  <span className="tabular-nums font-semibold">
                    {ing.evidenceScore.overall.toFixed(1)}
                  </span>
                  <span className="opacity-60">/10</span>
                  {ing.evidenceScore.confidence < 0.5 && (
                    <sup className="text-[9px] opacity-70 ml-0.5">※暫定</sup>
                  )}
                </Link>
              )
            })()}
            {ing.usageType && (
              <span className="bg-white/60 border border-border rounded-full
                px-3 py-1 text-[12px] font-medium text-muted-foreground">
                {usageLabel[ing.usageType]}
              </span>
            )}
            {relatedConcerns.slice(0, 2).map(c => (
              <Link key={c.slug} href={`/concerns/${c.slug}`}
                className={`cat-${c.category} inline-flex items-center border rounded-full
                  px-4 py-2 min-h-[44px] text-[12px] hover:opacity-80 transition-opacity`}>
                {c.emoji} {c.nameJa}
              </Link>
            ))}
          </div>

          {/* Name */}
          <h1 className="mb-1.5">
            <span className="block text-[34px] sm:text-[44px] font-bold leading-[1.15]
              tracking-tight text-foreground">
              {ing.nameJa}
            </span>
            <span className={`block text-[14px] sm:text-[15px] font-medium mt-2.5
              ${heroText[ing.evidenceRank]} opacity-80`}>
              {ing.papers.length}本の論文で評価
            </span>
          </h1>
          <p className="text-[13px] text-muted-foreground mt-2 mb-5 tracking-wide">
            {ing.nameEn}
          </p>

          {/* Tagline */}
          <p className="text-[15px] text-foreground/80 leading-[1.85] max-w-lg mb-7">
            {ing.tagline}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-4 text-[13px] text-muted-foreground">
            <span>
              <strong className="text-foreground font-semibold tabular-nums">{ing.papers.length}</strong> 件の論文
            </span>
            <span className="w-px h-3 bg-border" />
            <span>最終更新: {ing.updatedAt}</span>
            {ing.dosageMin && (
              <>
                <span className="w-px h-3 bg-border" />
                <span>
                  有効量:&nbsp;
                  <strong className="text-foreground font-semibold tabular-nums">
                    {ing.dosageMin}
                    {ing.dosageMax && ing.dosageMax !== ing.dosageMin ? `–${ing.dosageMax}` : ''}
                    {ing.dosageUnit.includes('濃度') ? '%' : ing.dosageUnit.split('/')[0]}
                  </strong>
                </span>
              </>
            )}
          </div>

          {/* Hero stat（キー数値があれば大きく表示・なければ論文集計をフォールバック） */}
          {(() => {
            const totalSubjects = ing.papers.reduce((acc, p) => acc + (p.sampleSize ?? 0), 0)
            const fallback = !ing.heroStat && ing.papers.length > 0 ? {
              value: ing.papers.length.toString(),
              label: totalSubjects > 0
                ? `件の研究で根拠を確認（対象延べ${totalSubjects.toLocaleString()}人）`
                : '件の研究で根拠を確認',
            } : null
            const stat = ing.heroStat ?? fallback
            if (!stat) return null
            return (
              <div className={`inline-block mt-6 rounded-2xl px-6 py-4 border-2
                shadow-sm
                ${{ S: 'bg-amber-100/60 border-amber-300 shadow-amber-100',
                     A: 'bg-blue-100/60 border-blue-300 shadow-blue-100',
                     B: 'bg-emerald-100/60 border-emerald-300 shadow-emerald-100',
                     C: 'bg-stone-100/60 border-stone-300 shadow-stone-100' }[ing.evidenceRank]}`}>
                <p className={`text-[48px] font-bold tabular-nums leading-none ${heroText[ing.evidenceRank]}`}>
                  {stat.value}
                </p>
                <p className={`text-[12px] font-medium mt-1.5 ${heroText[ing.evidenceRank]} opacity-70`}>
                  {stat.label}
                </p>
              </div>
            )
          })()}

          {/* Quick CTA — 診断に追加 */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <AddToAnalyzerButton slug={ing.slug} />
            <Link
              href="/analyzer"
              className="text-[12px] text-muted-foreground hover:text-foreground transition-colors"
            >
              診断結果を見る →
            </Link>
          </div>
        </div>

        {/* Evidence bar at bottom of hero */}
        <div className="h-1 bg-black/5">
          <div className={`h-full ${heroBarBg[ing.evidenceRank]} opacity-50
            ${{ S: 'w-full', A: 'w-3/4', B: 'w-1/2', C: 'w-1/4' }[ing.evidenceRank]}`} />
        </div>
      </div>

      {/* ── SciBase 論文エビデンス指数 PEI（v2.2）Full カード — hero 下・rank と別軸 ───── */}
      {ing.evidenceScore && (() => {
        const es = ing.evidenceScore
        const c = paperEvidenceColor(es.overall)
        const bars: { label: string; value: number; max: number }[] = [
          { label: '論文数',     value: es.breakdown.paperCount, max: 3.0 },
          { label: 'RCT/メタ解析', value: es.breakdown.rctMeta,    max: 3.0 },
          { label: '最新性',     value: es.breakdown.recency,    max: 2.0 },
          { label: 'ヒト試験',   value: es.breakdown.humanTrial, max: 2.0 },
        ]
        return (
          <div className="bg-secondary/20 border-b border-border">
            <div className="max-w-2xl mx-auto px-5 py-6">
              <div className={`bg-card ${c.border} border-2 rounded-2xl overflow-hidden`}>
                <div className="px-5 py-3 border-b border-border bg-secondary/30 flex items-baseline justify-between gap-3">
                  <p className="text-[12px] font-semibold tracking-wide text-foreground">
                    SciBase 論文エビデンス指数 <span className="font-bold tracking-wider">PEI</span>（v2.2）
                  </p>
                  <p className="text-[11px] text-muted-foreground tabular-nums">
                    信頼度 {Math.round(es.confidence * 100)}%
                  </p>
                </div>
                <div className="px-5 py-5 space-y-4">

                  <div className="flex items-baseline gap-2">
                    <span className={`text-[40px] font-bold tabular-nums leading-none ${c.text}`}>
                      {es.overall.toFixed(1)}
                    </span>
                    <span className="text-[14px] font-medium text-muted-foreground">／ 10</span>
                    {es.confidence < 0.5 && (
                      <span className="text-[11px] text-muted-foreground ml-1">※論文 1 本のみで暫定値</span>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    {bars.map(b => (
                      <div key={b.label}>
                        <div className="flex items-baseline justify-between text-[11px] text-muted-foreground mb-1">
                          <span>{b.label}</span>
                          <span className="tabular-nums">
                            {b.value.toFixed(1)} <span className="opacity-60">/ {b.max.toFixed(1)}</span>
                          </span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div
                            className={`h-full ${c.bar} rounded-full`}
                            style={{ width: `${Math.min(100, (b.value / b.max) * 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-[12px] text-muted-foreground leading-snug pt-1">
                    論文 {es.paperStats.total} 本（RCT {es.paperStats.rct} ／ メタ解析 {es.paperStats.metaAnalysis} ／ 直近 15 年 {es.paperStats.recent15y}）
                  </p>

                  <p className="text-[12px] text-foreground leading-relaxed pt-3 border-t border-border">
                    <span className="font-semibold">評価 {ing.evidenceRank} は実用判断、PEI は論文の量と質の客観指標。</span>
                    <span className="text-muted-foreground">両者は別軸として読みます。</span>
                  </p>

                  <Link
                    href="/about/evidence-scoring"
                    className="inline-flex items-center gap-1 text-[12px] text-blue-700 hover:underline"
                  >
                    → PEI（論文エビデンス指数）の計算方法を見る
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      })()}

      {/* ── Body ──────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-5 py-10">
        <div className="flex gap-12 items-start">
        {/* Main content */}
        <div className="flex-1 min-w-0">

        {/* PR表記 */}
        <p className="text-[12px] text-muted-foreground bg-secondary rounded-lg px-3 py-2 mb-6">
          本ページにはアフィリエイトリンクが含まれます。
          掲載内容は論文エビデンスに基づき独立して評価しています。
        </p>

        {/* Mobile inline TOC（desktop は右サイドバー sticky）*/}
        <TableOfContents sections={tocSections} variant="mobile" />

        {/* ── Phase 5-B：クイック判断カード v2（uiux/be/product/legal 4部門議論反映） ──
            ・「結論」→「ポイント」（legal: 断定感緩和）
            ・whoFor 1行追加（product: 自分ごと化）
            ・「効果実感まで」→「使用期間」（legal: 効果語の薬機法緩和）
            ・数値ファクト4列に拡張・論文本数追加（be: 社会的証明）
            ・ASP直リンクなし・ジャンプアンカーのみ（誠実ポジション維持） */}
        <section className="mb-10 bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border bg-secondary/30">
            <p className="text-[11px] font-semibold tracking-wider text-muted-foreground">
              ポイント
            </p>
          </div>
          <div className="px-5 py-5 space-y-4">
            {/* 1行サマリー：tagline */}
            <div>
              <p className="text-[10px] font-semibold tracking-wider text-muted-foreground mb-1.5">
                ひとことで
              </p>
              <p className="text-[15px] font-semibold text-foreground leading-relaxed">
                {ing.tagline}
              </p>
            </div>

            {/* 自分ごと化フック：whoFor 1行（条件付き） */}
            {ing.whoFor && ing.whoFor.length > 0 && (
              <div className="pt-3 border-t border-border">
                <p className="text-[10px] font-semibold tracking-wider text-muted-foreground mb-1.5">
                  こんな人に
                </p>
                <p className="text-[13px] text-foreground leading-snug">
                  {ing.whoFor.slice(0, 2).join(' / ')}
                </p>
              </div>
            )}

            {/* 数値ファクト：4列グリッド（用量・期間・月コスト・論文本数） */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-border">
              {ing.dosageMin && (
                <div>
                  <p className="text-[10px] font-semibold tracking-wider text-muted-foreground mb-1">
                    {ing.dosageUnit.includes('濃度') ? '推奨濃度' : '推奨用量'}
                  </p>
                  <p className={`text-[18px] font-bold tabular-nums ${heroText[ing.evidenceRank]} leading-tight`}>
                    {ing.dosageMin}
                    {ing.dosageMax && ing.dosageMax !== ing.dosageMin ? `–${ing.dosageMax}` : ''}
                    <span className="text-[12px] font-medium text-muted-foreground ml-1">
                      {ing.dosageUnit.includes('濃度') ? '%' : ing.dosageUnit}
                    </span>
                  </p>
                </div>
              )}
              {ing.duration && (
                <div>
                  <p className="text-[10px] font-semibold tracking-wider text-muted-foreground mb-1">
                    使用期間
                  </p>
                  <p className="text-[13px] text-foreground leading-snug">
                    {ing.duration.split('。')[0]}
                  </p>
                </div>
              )}
              {heroProduct?.monthlyCostJpy != null && (
                <div>
                  <p className="text-[10px] font-semibold tracking-wider text-muted-foreground mb-1">
                    月コスト目安
                  </p>
                  <p className={`text-[18px] font-bold tabular-nums ${heroText[ing.evidenceRank]} leading-tight`}>
                    ¥{heroProduct.monthlyCostJpy.toLocaleString()}
                    <span className="text-[12px] font-medium text-muted-foreground ml-1">
                      / 月
                    </span>
                  </p>
                </div>
              )}
              {ing.papers.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold tracking-wider text-muted-foreground mb-1">
                    参照論文
                  </p>
                  <p className={`text-[18px] font-bold tabular-nums ${heroText[ing.evidenceRank]} leading-tight`}>
                    {ing.papers.length}
                    <span className="text-[12px] font-medium text-muted-foreground ml-1">
                      本
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* ジャンプアンカー：商品比較 / 論文（grid-cols-2 で等分配・横並び） */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border">
              {ing.products.length > 0 ? (
                <a
                  href="#products"
                  className="inline-flex items-center justify-center gap-1.5 text-[13px] font-semibold
                    bg-foreground text-background rounded-full px-3 py-2.5 min-h-[44px]
                    hover:opacity-90 transition-opacity"
                >
                  商品を比較する
                  <span aria-hidden>↓</span>
                </a>
              ) : <span />}
              <a
                href="#papers"
                className="inline-flex items-center justify-center gap-1.5 text-[13px] font-semibold
                  border border-border text-foreground rounded-full px-3 py-2.5 min-h-[44px]
                  hover:border-accent hover:text-accent transition-colors"
              >
                論文を読む
                <span aria-hidden>↓</span>
              </a>
            </div>
          </div>
        </section>

        {/* Description（Phase 5-B: tagline はクイック判断カードで既出のため重複削除） */}
        <section id="description" className="mb-10 scroll-mt-20">
          <h2 className="font-semibold text-[18px] text-foreground mb-4">この成分について</h2>
          <div className="text-[14px] text-muted-foreground leading-[1.85] space-y-3">
            {ing.description.split(/\n{2,}/).map((para, i) => (
              <p key={i}>{para.trim()}</p>
            ))}
          </div>
        </section>

        {/* こんな人に特に関係する */}
        {ing.whoFor && ing.whoFor.length > 0 && (
          <section id="who-for" className="mb-10 scroll-mt-20">
            <h2 className="font-semibold text-[18px] text-foreground mb-4">
              こんな人に特に関係する
            </h2>
            <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
              {ing.whoFor.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center
                    justify-center text-[10px] font-semibold mt-0.5
                    ${{ S: 'bg-amber-100 text-amber-700',
                         A: 'bg-blue-100 text-blue-700',
                         B: 'bg-emerald-100 text-emerald-700',
                         C: 'bg-stone-100 text-stone-600' }[ing.evidenceRank]}`}>
                    ✓
                  </span>
                  <p className="text-[14px] text-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Papers */}
        <section id="papers" className="mb-10 scroll-mt-20">
          <h2 className="font-semibold text-[18px] text-foreground mb-4">主要研究</h2>
          <div className="space-y-3">
            {ing.papers.map((p, i) => {
              const paperUrl = p.pmid
                ? `https://pubmed.ncbi.nlm.nih.gov/${p.pmid}/`
                : p.doi
                  ? `https://doi.org/${p.doi}`
                  : p.url ?? null
              const paperLinkLabel = p.pmid ? 'PubMedで確認' : p.doi ? 'DOIで確認' : '原文を確認'
              return (
                <div key={i} className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-[11px] font-medium bg-secondary text-muted-foreground
                      border border-border rounded-md px-2 py-0.5">
                      {studyLabel[p.studyType] ?? p.studyType}
                    </span>
                    {[p.journal, `${p.year}年`,
                      p.sampleSize ? `n=${p.sampleSize.toLocaleString()}` : null,
                      p.durationWeeks ? `${p.durationWeeks}週間` : null,
                    ].filter(Boolean).map((v, j) => (
                      <span key={j} className="text-[11px] text-muted-foreground">{v}</span>
                    ))}
                  </div>
                  <p className="text-[14px] text-foreground font-medium leading-relaxed mb-2">
                    {p.keyFinding}
                  </p>
                  <details className="group">
                    <summary className="text-[11px] text-muted-foreground/50 cursor-pointer
                      hover:text-muted-foreground transition-colors list-none flex items-center gap-1">
                      <span className="group-open:hidden">▶ 論文タイトル（英語）</span>
                      <span className="hidden group-open:block">▼ 論文タイトル（英語）</span>
                    </summary>
                    <p className="text-[11px] text-muted-foreground/50 mt-1.5 leading-snug italic pl-3">
                      {p.title}
                    </p>
                  </details>
                  {paperUrl && (
                    <a href={paperUrl} target="_blank" rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium
                        text-accent border border-accent/30 rounded-full
                        px-3 py-1.5 min-h-[36px] hover:bg-accent/5 transition-colors">
                      {paperLinkLabel}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Public DB References (hfnet etc) */}
        {ing.publicDbReferences && ing.publicDbReferences.length > 0 && (
          <section id="public-db-references" className="mb-10 scroll-mt-20">
            <h2 className="font-semibold text-[18px] text-foreground mb-2">
              公的データベース参照
            </h2>
            <p className="text-[13px] text-muted-foreground mb-4 leading-relaxed">
              個別論文に加えて、国立研究開発法人など公的機関が複数の論文を横断してまとめた
              安全性・有効性・相互作用情報も参照できる。
            </p>
            <div className="space-y-3">
              {ing.publicDbReferences.map((ref, i) => {
                const sourceLabel = ref.source === 'hfnet' ? 'hfnet'
                  : ref.source === 'ejim' ? '厚労省 eJIM'
                  : ref.source === 'nih-ods' ? 'NIH ODS'
                  : ref.source === 'nccih' ? 'NIH NCCIH'
                  : ref.source === 'cinii' ? 'CiNii'
                  : ref.source === 'jstage' ? 'J-STAGE'
                  : ref.source === 'mhlw' ? '厚生労働省'
                  : ref.source === 'caa' ? '消費者庁'
                  : ref.source
                return (
                  <a
                    key={i}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow external"
                    aria-label={`${ref.fullName} を新しいタブで開く（外部サイト）`}
                    className="block bg-card border border-border rounded-2xl p-5
                      hover:border-accent/40 transition-colors group"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[11px] font-medium bg-secondary text-muted-foreground
                        border border-border rounded-md px-2 py-0.5">
                        公的DB
                      </span>
                      <span className="text-[11px] font-medium text-accent">{sourceLabel}</span>
                      <span className="text-[11px] text-muted-foreground">
                        参照: {ref.accessedAt}
                      </span>
                    </div>
                    <p className="text-[14px] text-foreground font-medium leading-relaxed mb-1">
                      {ref.fullName}
                    </p>
                    <p className="text-[13px] text-muted-foreground leading-relaxed mb-3">
                      {ref.note}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-medium
                      text-accent group-hover:underline">
                      公的DBで確認
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </a>
                )
              })}
            </div>
          </section>
        )}

        {/* Evidence rank detail */}
        <section id="evidence" className="mb-10 scroll-mt-20">
          <h2 className="font-semibold text-[18px] text-foreground mb-4">
            このエビデンスをどう読むか
          </h2>
          <EvidenceBadge rank={ing.evidenceRank} variant="detail" />
        </section>

        {/* Dosage */}
        <section id="dosage" className="mb-10 scroll-mt-20">
          <h2 className="font-semibold text-[18px] text-foreground mb-4">
            {ing.usageType === 'topical' ? '使用ガイド（論文ベース）' : '摂取ガイド（論文ベース）'}
          </h2>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {[
              ing.dosageMin ? {
                label: ing.dosageUnit.includes('濃度') ? '推奨濃度' : '有効量',
                val: `${ing.dosageMin}${ing.dosageMax && ing.dosageMax !== ing.dosageMin ? `–${ing.dosageMax}` : ''} ${ing.dosageUnit}`,
              } : null,
              ing.timing   ? { label: 'タイミング', val: ing.timing }   : null,
              ing.duration ? { label: '継続期間',   val: ing.duration } : null,
            ].filter(Boolean).map((row, i, arr) => (
              <div key={i}
                className={`flex gap-5 px-5 py-4 ${i < arr.length - 1 ? 'border-b border-border' : ''}`}>
                <span className="text-[13px] font-medium text-muted-foreground w-20 flex-shrink-0 pt-0.5">
                  {row!.label}
                </span>
                <span className="text-[14px] text-foreground leading-relaxed">{row!.val}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Dosage levels — 用量別効果（用量×効果が論文で別々に確認されている成分用） */}
        {ing.dosageLevels && ing.dosageLevels.length > 0 && (
          <section id="dosage-levels" className="mb-10 scroll-mt-20">
            <h2 className="font-semibold text-[18px] text-foreground mb-2">
              {ing.nameJa}の用量別の効果
            </h2>
            <p className="text-[13px] text-muted-foreground mb-4 leading-relaxed">
              論文で報告されている用量ごとの効果と、推奨される対象層を整理しました。
              数値はあくまで研究での投与量であり、個人差・服薬状況により最適量は異なります。
            </p>
            <div className="space-y-3">
              {ing.dosageLevels.map((lv, i) => (
                <div key={i}
                  className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                    <h3 className={`text-[18px] font-bold tabular-nums leading-tight
                      ${heroText[ing.evidenceRank]}`}>
                      {lv.dose}
                    </h3>
                    <span className="text-[12px] font-medium text-muted-foreground
                      bg-secondary border border-border rounded-full px-2.5 py-0.5">
                      {lv.category}
                    </span>
                  </div>
                  <p className="text-[14px] text-foreground leading-[1.85] mb-3">
                    {lv.effect}
                  </p>
                  <div className="border-t border-border pt-3 space-y-1.5">
                    <p className="text-[12px] text-muted-foreground">
                      <span className="font-semibold text-foreground/80">向いている人：</span>
                      {lv.whoFor}
                    </p>
                    {lv.evidenceNote && (
                      <p className="text-[11px] text-muted-foreground/70 italic">
                        参照：{lv.evidenceNote}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ — アコーディオン（最初の1問をデフォルト展開・損失回避フレーミング） */}
        <section id="faq" className="mb-10 scroll-mt-20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[18px] text-foreground">よくある疑問</h2>
            <span className="text-[11px] text-muted-foreground bg-secondary border border-border
              rounded-full px-2.5 py-1">{faqItems.length}件</span>
          </div>
          <div className="border border-border rounded-2xl overflow-hidden divide-y divide-border">
            {faqItems.map(({ q, a }, i) => (
              <details key={i} {...(i === 0 ? { open: true } : {})}
                className="group bg-card">
                <summary className="flex items-start justify-between gap-3 px-5 py-4
                  cursor-pointer hover:bg-secondary/50 transition-colors list-none">
                  <span className={`text-[13px] font-semibold leading-snug
                    ${i === 0 ? 'text-foreground' : 'text-foreground/80'}`}>
                    Q. {q}
                  </span>
                  <span className="text-muted-foreground flex-shrink-0 mt-0.5
                    group-open:rotate-180 transition-transform duration-200 text-[12px]">
                    ▾
                  </span>
                </summary>
                <div className="px-5 pb-5 pt-1 text-[13px] text-muted-foreground leading-[1.85] space-y-3">
                  {a.split(/\n{2,}/).map((para, j) => (
                    <p key={j}>{para.trim()}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Side effects */}
        {(ing.sideEffects?.length || ing.contraindications?.length) && (
          <section id="safety" className="mb-10 scroll-mt-20">
            <h2 className="font-semibold text-[18px] text-foreground mb-4">副作用・注意事項</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-4">
              {ing.sideEffects?.length ? (
                <div>
                  <p className="text-[12px] font-semibold text-amber-800 mb-2">副作用の可能性</p>
                  <ul className="space-y-1.5">
                    {ing.sideEffects.map((s, i) => (
                      <li key={i} className="text-[13px] text-amber-900 flex gap-2">
                        <span className="text-amber-500 flex-shrink-0">·</span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {ing.contraindications?.length ? (
                <div>
                  <p className="text-[12px] font-semibold text-amber-800 mb-2">注意が必要な方</p>
                  <ul className="space-y-1.5">
                    {ing.contraindications.map((c, i) => (
                      <li key={i} className="text-[13px] text-amber-900 flex gap-2">
                        <span className="text-red-400 flex-shrink-0">·</span>{c}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </section>
        )}

        {/* 飲み合わせ・医薬品との相互作用 */}
        {ing.interactions !== undefined && ing.interactions.length === 0 ? (
          <section id="interactions" className="mb-10 scroll-mt-20">
            <h2 className="font-semibold text-[18px] text-foreground mb-2">飲み合わせ・医薬品との相互作用</h2>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
              <p className="text-[14px] text-emerald-900 font-semibold mb-2">
                現時点で重要な相互作用は報告されていません
              </p>
              <p className="text-[13px] text-emerald-900 leading-relaxed">
                {ing.nameJa}について、添付文書・FDA警告・査読論文レベルで併用回避・要注意とされる医薬品の報告は確認されていません。
              </p>
            </div>
            <div className="mt-4 bg-secondary border border-border rounded-xl p-4">
              <p className="text-[13px] text-foreground leading-relaxed">
                ただし処方薬を服用中の方・持病のある方は、新たな成分を始める前に医師・薬剤師にご相談ください。サプリメント成分には個人差があり、新しい相互作用が後から報告されることもあります。
              </p>
            </div>
          </section>
        ) : null}
        {ing.interactions?.length ? (
          <section id="interactions" className="mb-10 scroll-mt-20">
            <h2 className="font-semibold text-[18px] text-foreground mb-2">飲み合わせ・医薬品との相互作用</h2>
            <p className="text-[13px] text-muted-foreground mb-4">
              添付文書・FDA警告・査読論文をもとに、併用に注意が必要な医薬品をまとめています。
            </p>
            <div className="space-y-3">
              {ing.interactions.map((x, i) => {
                const levelStyle = {
                  avoid:   { bg: 'bg-red-50',    border: 'border-red-300',   text: 'text-red-900',   badge: 'bg-red-100 text-red-800',     label: '併用回避' },
                  caution: { bg: 'bg-amber-50',  border: 'border-amber-300', text: 'text-amber-900', badge: 'bg-amber-100 text-amber-800', label: '要注意' },
                  monitor: { bg: 'bg-blue-50',   border: 'border-blue-200',  text: 'text-blue-900',  badge: 'bg-blue-100 text-blue-800',   label: '要経過観察' },
                }[x.level]
                const evidenceBadge = {
                  established:   { symbol: '●', label: '実証' },
                  theoretical:   { symbol: '○', label: '理論' },
                  'case-report': { symbol: '△', label: '報告' },
                }[x.evidence]
                return (
                  <div key={i} className={`${levelStyle.bg} border ${levelStyle.border} rounded-2xl p-5`}>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`${levelStyle.badge} text-[11px] font-semibold rounded px-2 py-0.5`}>
                        {levelStyle.label}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        エビデンス：{evidenceBadge.symbol}{evidenceBadge.label}
                      </span>
                    </div>
                    <p className={`font-semibold text-[14px] ${levelStyle.text} mb-2`}>
                      {x.substance}
                    </p>
                    <p className={`text-[13px] ${levelStyle.text} leading-relaxed mb-2`}>
                      <strong>作用機序：</strong>{x.mechanism}
                    </p>
                    <p className={`text-[13px] ${levelStyle.text} leading-relaxed`}>
                      <strong>推奨行動：</strong>{x.action}
                    </p>
                    {x.source && (
                      <p className="text-[11px] text-muted-foreground mt-2">
                        出典：{x.source}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="mt-4 bg-secondary border border-border rounded-xl p-4">
              <p className="text-[13px] text-foreground leading-relaxed">
                <strong>該当する薬を服用中の方は、自己判断で併用せず、必ず医師・薬剤師に相談してください。</strong>
                本項は一般的な情報提供であり、個別の診療・処方判断の代替ではありません。
              </p>
            </div>
            {/* 代替候補：同じ悩みに対応する別の成分（飲み合わせ NGユーザーの代替手段） */}
            {(() => {
              const alts = getAlternatives(ing, ingredients)
              if (alts.length === 0) return null
              return (
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-2xl p-5">
                  <h3 className="font-semibold text-[15px] text-blue-900 mb-2">
                    この問題を回避できる代替候補
                  </h3>
                  <p className="text-[13px] text-blue-900 leading-relaxed mb-2">
                    上記の薬を服用中・体質的に併用できない方には、<strong>同じ悩みに対応しつつ同系統の薬剤干渉を持たない</strong>成分を選んでいます。
                  </p>
                  <p className="text-[12px] text-blue-900/80 leading-relaxed mb-4">
                    ※ 候補は元成分と同じ系統の薬剤干渉を持たないものに限定していますが、各成分にも個別の注意事項があります。リンク先の飲み合わせ欄を必ず確認し、最終判断は医師・薬剤師にご相談ください。
                  </p>
                  <div className="space-y-2">
                    {alts.map(alt => (
                      <Link
                        key={alt.slug}
                        href={`/ingredients/${alt.slug}`}
                        className="flex items-center justify-between gap-3 bg-white border border-blue-200 rounded-xl p-3 hover:border-blue-400 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <EvidenceBadge rank={alt.evidenceRank} variant="dot" />
                          <div className="min-w-0">
                            <p className="font-semibold text-[14px] text-foreground truncate">
                              {alt.nameJa}
                            </p>
                            <p className="text-[12px] text-muted-foreground truncate">
                              {alt.tagline}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })()}
          </section>
        ) : null}

        {/* この成分の始め方 */}
        {(ing.dosageMin || ing.timing || ing.duration) && (
          <section id="start" className="mb-10 scroll-mt-20">
            <h2 className="font-semibold text-[18px] text-foreground mb-4">
              この成分の始め方
            </h2>
            <div className="space-y-3">
              {[
                {
                  step: 1,
                  title: '有効量を確認する',
                  body: ing.dosageMin
                    ? ing.dosageUnit.includes('濃度')
                      ? `配合濃度${ing.dosageMin}%以上の製品を選ぶ。論文で使用された濃度の基準となる。`
                      : `1日${ing.dosageMin}${ing.dosageMax && ing.dosageMax !== ing.dosageMin ? `〜${ing.dosageMax}` : ''}${ing.dosageUnit}を目安にする。この量が論文で効果を確認した用量。`
                    : '製品ラベルの配合量を確認する。',
                },
                {
                  step: 2,
                  title: 'タイミングと使い方',
                  body: ing.timing ?? (ing.usageType === 'topical' ? '洗顔後の清潔な肌に使用。保湿剤の前に塗布するのが一般的。' : '食事と一緒に摂取するのが吸収を助けることが多い。'),
                },
                {
                  step: 3,
                  title: '効果が出るまでの期間',
                  body: ing.duration ?? '継続的な使用が重要。数週間〜数ヶ月単位での評価が必要。短期間での判断は避ける。',
                },
              ].map(({ step, title, body }) => (
                <div key={step} className="flex gap-4 bg-card border border-border rounded-2xl p-5">
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center
                    text-[13px] font-bold mt-0.5
                    ${{ S: 'bg-amber-100 text-amber-700', A: 'bg-blue-100 text-blue-700',
                         B: 'bg-emerald-100 text-emerald-700', C: 'bg-stone-100 text-stone-600' }[ing.evidenceRank]}`}>
                    {step}
                  </div>
                  <div>
                    <p className="font-semibold text-[14px] text-foreground mb-1">{title}</p>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Products v2 — オファー設計（行動経済学・損失回避・アンカー先行） */}
        {ing.products.length > 0 && (
          <section id="products" className="mb-10 scroll-mt-20">
            {/* ヘッダー */}
            <div className="flex items-center justify-between mb-2 gap-3">
              <h2 className="font-semibold text-[18px] text-foreground">おすすめ商品</h2>
              <span className="text-[11px] text-muted-foreground bg-secondary border border-border
                rounded px-2 py-0.5 flex-shrink-0">PR・アフィリエイトを含む</span>
            </div>
            <p className="text-[13px] text-muted-foreground mb-5">
              論文で有効とされた用量・第三者検査・同成分内のコストを客観評価して選定しています。
            </p>

            {/* 選び方ポイント（dosageMinがある場合） */}
            {ing.dosageMin && (
              <div className="bg-secondary border border-border rounded-xl p-4 mb-5">
                <p className="text-[12px] font-semibold text-foreground mb-2">選び方のポイント</p>
                <ul className="space-y-1.5">
                  <li className="text-[13px] text-muted-foreground flex gap-2">
                    <span className="text-accent flex-shrink-0 font-semibold">✓</span>
                    <span>
                      <strong className="text-foreground">有効量を確認：</strong>
                      {ing.dosageUnit.includes('濃度')
                        ? `${ing.dosageMin}%以上の濃度`
                        : `1日${ing.dosageMin}${ing.dosageMax && ing.dosageMax !== ing.dosageMin ? `〜${ing.dosageMax}` : ''}${ing.dosageUnit.split('/')[0]}以上`}
                      が論文で使用された量
                    </span>
                  </li>
                  <li className="text-[13px] text-muted-foreground flex gap-2">
                    <span className="text-accent flex-shrink-0 font-semibold">✓</span>
                    <span><strong className="text-foreground">継続コストを計算：</strong>
                      効果が出るまで{ing.duration ? ing.duration.split('。')[0] : '数週間〜数ヶ月'}かかるため、月あたりのコストで比較する
                    </span>
                  </li>
                  <li className="text-[13px] text-muted-foreground flex gap-2">
                    <span className="text-accent flex-shrink-0 font-semibold">✓</span>
                    <span><strong className="text-foreground">第三者検査の有無：</strong>
                      重金属・含有量を独立機関が確認しているかは品質の重要シグナル
                    </span>
                  </li>
                </ul>
              </div>
            )}

            {/* 結論ボックス：商品hero と同じ SciBase 推奨度を使用（矛盾回避） */}
            {heroProduct && heroScore && (
              <div className="mb-5 bg-foreground/[0.03] border-l-4 border-foreground/60 rounded-r-lg px-4 py-3">
                <p className="text-[10px] font-semibold tracking-wider text-muted-foreground mb-1">結論</p>
                <p className="text-[13px] text-foreground leading-relaxed">
                  <strong className="font-semibold">迷ったら ① {heroProduct.brand} を選ぶ。</strong>
                  <span className="ml-1 text-muted-foreground">
                    SciBase 推奨度
                    <span className="font-semibold tabular-nums text-foreground"> ★{heroScore.recommendationScore.toFixed(2)} / 5.0</span>
                    （当サイト掲載商品中・最上位）。
                    {heroScore.dailyDoseMg != null && cosmeProduct == null && heroProduct.monthlyCostJpy != null && (
                      <span> 1日<span className="font-semibold tabular-nums text-foreground">¥{Math.round(heroProduct.monthlyCostJpy / 30).toLocaleString()}</span>で続けられる。</span>
                    )}
                  </span>
                </p>
              </div>
            )}

            {/* Pattern A 検査キットCTA：商品オファーカードの手前で「測ってから選ぶ」を訴求 */}
            {ing.testKitCTA && (
              <IngredientTestKitCTACard cta={ing.testKitCTA} ingredientSlug={ing.slug} />
            )}

            {/* ヒーロー：BEST PICK 縦長 v4・同一商品の Amazon 等は secondaryOffers でカード内併記 */}
            {heroProduct && (
              <div className="mb-5">
                <ProductOfferCard
                  product={heroProduct}
                  ingredient={ing}
                  variant="hero"
                  axisLeaders={axisLeaders}
                  showOverallRank
                  subPlatformLinks={heroSubLinks}
                  bestPickReason={bestPickReasonAuto || undefined}
                  secondaryOffers={heroSecondaries}
                />
              </div>
            )}

            {/* セカンダリ商品：別商品（grouped primary）のみ。同一商品の別プラットフォーム版は
                各カード内の secondaryOffers で併記される */}
            {secondaryGroups.length > 0 && (
              <div className="flex flex-col gap-5 mb-5">
                {secondaryGroups.map((g, i) => (
                  <ProductOfferCard
                    key={`${g.primary.platform}-${i}`}
                    product={g.primary}
                    ingredient={ing}
                    variant="hero"
                    axisLeaders={axisLeaders}
                    showOverallRank={false}
                    secondaryOffers={g.secondaries}
                  />
                ))}
              </div>
            )}

            {/* ソート可能比較表 v4（2商品以上のとき） */}
            {sortedProducts.filter(p => p.platform !== 'cosme').length >= 2 && (
              <div className="mb-5">
                <ComparisonTable
                  products={sortedProducts.filter(p => p.platform !== 'cosme')}
                  ingredient={ing}
                />
              </div>
            )}

            {/* 何も見つからない時の検索リンク（フォールバック）
                編集方針: 経口サプリはiHerbのみ・外用は両方 */}
            {!heroProduct && !cosmeProduct && (
              <div className={isTopical ? 'grid grid-cols-1 sm:grid-cols-2 gap-3' : 'flex flex-col gap-3'}>
                {(isTopical ? ['iherb', 'amazon'] : ['iherb']).map((key) => (
                  <OutboundProductLink
                    key={key}
                    href={searchUrls[key as 'iherb' | 'amazon']}
                    platform={key as 'iherb' | 'amazon'}
                    ingredientSlug={ing.slug}
                    className={`flex items-center justify-center gap-2 text-[13px] font-semibold rounded-xl px-4 h-12 border-2 ${
                      key === 'iherb' ? 'border-emerald-200 text-emerald-700' : 'border-amber-200 text-amber-700'
                    }`}
                  >
                    {key === 'iherb' ? 'iHerb' : 'Amazon'}で探す
                    <ExternalLink className="w-3.5 h-3.5" />
                  </OutboundProductLink>
                ))}
              </div>
            )}

            {/* cosme platform（@cosme等）がある場合・hero レイアウトで統一 */}
            {cosmeProduct && (
              <div className="mt-5">
                <ProductOfferCard
                  product={cosmeProduct}
                  ingredient={ing}
                  variant="hero"
                  showOverallRank={false}
                />
              </div>
            )}

            {/* スコア算出ロジック開示（法務要件） */}
            <p className="text-[11px] text-muted-foreground/80 mt-4 leading-relaxed">
              ※ スコアは論文有効量との整合・第三者検査の有無・同成分内のコスト分布に基づく客観算出値です。
              掲載商品はSciBaseが評価・選定し、購入時にアフィリエイト報酬を得る場合があります（価格はユーザー負担に影響しません）。
            </p>
          </section>
        )}

        {/* Bottom Line — この成分を一言で */}
        <section className="mb-8 bg-foreground/[0.03] border-l-4 border-foreground/50 rounded-r-xl px-5 py-5">
          <p className="text-[12px] font-semibold tracking-wide
            text-muted-foreground mb-3">
            この成分を一言で
          </p>
          <p className="text-[14px] text-foreground leading-[1.85]">
            <strong className="font-semibold">{ing.nameJa}</strong>は
            {rankDescFull[ing.evidenceRank]}で{concernNames ? `${concernNames}への効果` : '効果'}が確認されている成分です。
            {ing.whoFor && ing.whoFor.length > 0 && (
              <>特に <span className="font-medium">{ing.whoFor.slice(0, 2).join('・')}</span> に向いています。</>
            )}
            {ing.dosageMin && (
              <>
                始めるなら
                <span className="font-medium">
                  {' '}{ing.dosageMin}{ing.dosageMax && ing.dosageMax !== ing.dosageMin ? `〜${ing.dosageMax}` : ''}{ing.dosageUnit}
                </span>
                {ing.timing ? `を${ing.timing}` : ''}から。
              </>
            )}
            {ing.duration && <>効果の実感には<span className="font-medium">{ing.duration}</span>が目安です。</>}
            {ing.sideEffects && ing.sideEffects.length > 0 && (
              <>なお、<span className="font-medium">{ing.sideEffects[0]}</span>の報告があるため、体調に合わせて量を調整してください。</>
            )}
          </p>
        </section>

        {/* Meta */}
        <p className="text-[12px] text-muted-foreground mb-8">
          最終更新：{ing.updatedAt} ／ 参照論文：{ing.papers.length}件
        </p>

        {/* Disclaimer */}
        <div className="bg-secondary border border-border rounded-xl p-4
          text-[13px] text-muted-foreground leading-relaxed mb-10">
          本ページの情報は医療的アドバイスを提供するものではありません。
          サプリメントの使用前には医師・薬剤師にご相談ください。
          <strong className="text-foreground">特に処方薬を服用中の方は、サプリメントとの併用について必ず医師・薬剤師にご相談ください。自己判断での併用はお控えください。</strong>
          掲載内容は論文情報の提供を目的としており、効果・効能を保証するものではありません。
        </div>

        {/* 関連コラム */}
        {relatedArticles.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <h2 className="font-semibold text-[18px] text-foreground">
                この成分についてのコラム
              </h2>
            </div>
            <div className="space-y-3">
              {relatedArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group flex items-start gap-4 border border-border rounded-xl p-4
                    hover:border-accent/50 hover:bg-secondary/50 transition-all duration-150"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[14px] text-foreground leading-snug mb-1
                      group-hover:text-accent transition-colors">
                      {article.title}
                    </p>
                    <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readingMinutes}分
                      </span>
                      <span>·</span>
                      <span>{article.categoryLabel}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5
                    group-hover:text-accent transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related ingredients */}
        {siblingIngredients.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-semibold text-[18px] text-foreground">
                よく一緒に調べられている成分
              </h2>
              {relatedConcerns[0] && (
                <Link href={`/ranking/${relatedConcerns[0].slug}`}
                  className="text-[12px] text-accent flex items-center gap-1 hover:underline">
                  <Trophy className="w-3.5 h-3.5" />
                  ランキングを見る
                </Link>
              )}
            </div>
            <p className="text-[12px] text-muted-foreground mb-4">
              {relatedConcerns.length > 0
                ? `${ing.nameJa}と共通の悩み（${relatedConcerns.slice(0, 3).map(c => c.nameJa).join('・')}）で推奨される成分`
                : `${ing.nameJa}と関連が深い成分`}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {siblingIngredients.map(i => (
                <IngredientCard key={i.slug} ingredient={i} showConcerns={false} />
              ))}
            </div>
            {/* Compare links — 行動経済学：選択肢の比較を促すことで離脱前に関与度を高める */}
            <div className="mt-4 flex flex-wrap gap-2">
              {siblingIngredients.slice(0, 3).map(i => (
                <Link
                  key={i.slug}
                  href={`/compare/${ing.slug}-vs-${i.slug}`}
                  className="inline-flex items-center gap-1.5 text-[12px]
                    bg-secondary border border-border text-muted-foreground
                    rounded-full px-4 py-2 min-h-[44px] hover:border-accent hover:text-accent
                    transition-colors"
                >
                  <GitCompare className="w-3 h-3 flex-shrink-0" />
                  {ing.nameJa} vs {i.nameJa}
                </Link>
              ))}
              <Link
                href="/compare"
                className="inline-flex items-center gap-1.5 text-[12px]
                  text-muted-foreground/60 rounded-full px-4 py-2 min-h-[44px]
                  hover:text-accent transition-colors"
              >
                比較一覧を見る →
              </Link>
            </div>
          </section>
        )}

        {/* ── 次のアクション CTA ── */}
        <div className="border-t border-border pt-10 mt-4 mb-4">
          <p className="text-[13px] font-semibold tracking-wide
            text-muted-foreground mb-5">
            次にやること
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {relatedConcerns[0] && (
              <Link
                href={`/ranking/${relatedConcerns[0].slug}`}
                className="flex items-center gap-3 bg-accent text-accent-foreground
                  rounded-2xl px-5 py-4 hover:opacity-90 transition-opacity"
              >
                <BarChart2 className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[14px] leading-snug">
                    {relatedConcerns[0].nameJa}のランキングを見る
                  </p>
                  <p className="text-[12px] opacity-70 mt-0.5">
                    {relatedConcerns[0].nameJa}に効く成分を比較
                  </p>
                </div>
              </Link>
            )}
            {relatedConcerns[0] && (
              <Link
                href={`/concerns/${relatedConcerns[0].slug}`}
                className="flex items-center gap-3 border border-border bg-card
                  rounded-2xl px-5 py-4 hover:border-accent/50 hover:shadow-sm transition-all"
              >
                <Trophy className="w-5 h-5 text-accent flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[14px] text-foreground leading-snug">
                    {relatedConcerns[0].nameJa}の成分一覧
                  </p>
                  <p className="text-[12px] text-muted-foreground mt-0.5">
                    すべての関連成分を確認
                  </p>
                </div>
              </Link>
            )}
          </div>
          {PILLAR1_INGREDIENTS.has(slug) && (
            <Link
              href="/articles/anti-aging-supplement-guide-30s"
              className="group flex items-start gap-3 border border-border bg-card
                rounded-2xl px-5 py-4 mb-6 hover:border-accent/50 hover:shadow-sm transition-all"
            >
              <Compass className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[14px] text-foreground leading-snug
                  group-hover:text-accent transition-colors">
                  30代から始める論文で選ぶ抗老化サプリ完全ガイドを読む
                </p>
                <p className="text-[12px] text-muted-foreground mt-0.5 leading-snug">
                  肌・脳・代謝・免疫・睡眠・ストレスの6領域を論文で組み立てる
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1
                group-hover:text-accent transition-colors" />
            </Link>
          )}
          <Link href="/ingredients"
            className="inline-flex items-center gap-2 text-[13px] text-muted-foreground
              hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            成分一覧に戻る
          </Link>
        </div>

        {/* 著者情報（E-E-A-T対応・小型） */}
        <aside className="mt-14 pt-8 border-t border-border">
          <div className="flex items-start gap-4 bg-card border border-border rounded-2xl p-5">
            <div className="w-12 h-12 rounded-full bg-muted flex-shrink-0 flex items-center justify-center
              text-[18px] font-semibold text-muted-foreground">
              編
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[14px] text-foreground mb-0.5">
                SciBase 編集者
              </p>
              <p className="text-[12px] text-muted-foreground mb-2">
                化粧品メーカー勤務・成分研究担当
              </p>
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                現役で化粧品メーカーに勤務し、職務上の成分評価・論文調査を独立した立場で発信しています。
                本ページはメタ解析・RCT・コホート研究のみを参照。
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-1 text-[12px] text-foreground
                  font-medium mt-2 hover:underline"
              >
                編集方針・評価基準
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </aside>

        </div>{/* /main content */}
        <TableOfContents sections={tocSections} />
        </div>{/* /flex */}
      </div>
    </>
  )
}
