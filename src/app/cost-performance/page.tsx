import Link from 'next/link'
import {
  ChevronRight,
  Coins,
  Info,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import type { Metadata } from 'next'
import type { EvidenceRank, Ingredient } from '@/lib/types'
import { ingredients } from '@/lib/data'
import { CostPerformanceTable, type CostRow } from '@/components/CostPerformanceTable'

const BASE_URL = 'https://scibase.app'
const PAGE_URL = `${BASE_URL}/cost-performance`

/* ─────────────────────────────────────────────
 *  ビルド時集計（データソースは data.ts・追加入力なし）
 *  「月額（有効量）」＝論文で使われた最小有効量（ing.dosageMin）を、
 *  商品の含有量×推奨摂取数（dosageMg × unitsPerDay）が満たす商品だけを対象に、
 *  その中で最も安い monthlyCostJpy。「安かろう・少なかろう」を除外した正直なコスパ。
 *  経口サプリのみ（外用は1回使用量が一定でなく月額比較になじまないため除外）。
 * ───────────────────────────────────────────── */
function cheapestEffective(ing: Ingredient): { cost: number; name: string; brand: string } | null {
  const min = ing.dosageMin
  if (typeof min !== 'number') return null
  let best: { cost: number; name: string; brand: string } | null = null
  for (const p of ing.products ?? []) {
    if (typeof p.monthlyCostJpy !== 'number' || p.monthlyCostJpy <= 0) continue
    if (typeof p.dosageMg !== 'number' || typeof p.unitsPerDay !== 'number') continue
    if (p.dosageMg * p.unitsPerDay < min) continue
    if (!best || p.monthlyCostJpy < best.cost) {
      best = { cost: p.monthlyCostJpy, name: p.name, brand: p.brand }
    }
  }
  return best
}

interface PoolItem { ing: Ingredient; cost: number; name: string; brand: string }

const pool: PoolItem[] = ingredients
  .filter(i => i.usageType !== 'topical' && i.evidenceScore)
  .map(i => {
    const ce = cheapestEffective(i)
    return ce ? { ing: i, cost: ce.cost, name: ce.name, brand: ce.brand } : null
  })
  .filter((x): x is PoolItem => x !== null)
  .sort((a, b) => a.cost - b.cost)

const rows: CostRow[] = pool.map(({ ing, cost, name, brand }) => ({
  slug: ing.slug,
  nameJa: ing.nameJa,
  nameEn: ing.nameEn,
  rank: ing.evidenceRank,
  pei: ing.evidenceScore!.overall,
  cost,
  rct: ing.evidenceScore!.paperStats.rct,
  meta: ing.evidenceScore!.paperStats.metaAnalysis,
  productName: name,
  brand,
}))

const poolCount = pool.length
const costsAsc = pool.map(p => p.cost)
const minCost = costsAsc[0] ?? 0
const medianCost = costsAsc[Math.floor((costsAsc.length - 1) * 0.5)] ?? 0
const p33Cost = costsAsc[Math.floor((costsAsc.length - 1) * 0.33)] ?? 0

/* コスパ両取り：安い（下位約1/3）× エビデンス強い（S/A） */
const smartBuys = pool
  .filter(p => p.cost <= p33Cost && (p.ing.evidenceRank === 'S' || p.ing.evidenceRank === 'A'))
  .sort((a, b) => a.cost - b.cost)

const latestUpdated = ingredients.map(i => i.updatedAt).sort().at(-1) ?? '2026-01-01'

export const metadata: Metadata = {
  title: `成分コスパランキング｜有効量で飲んで月いくら？エビデンス×価格で比較`,
  description:
    `論文の有効量を満たして飲んだときの月額コストが安い順に、経口サプリ${poolCount}種をエビデンス（論文エビデンス指数PEI）とあわせてランキング。` +
    '「安さ」と「研究の裏付け」を両取りできる成分が一目でわかる独自データ。価格は目安。化粧品メーカー現役研究者が論文ベースで運営。',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `成分コスパランキング（経口サプリ${poolCount}種）｜SciBase`,
    description: '有効量を満たす最安の月額コスト × エビデンス。安さと裏付けの両取り成分がわかる独自データ。',
    url: PAGE_URL,
    type: 'website',
  },
}

const RANK_CHIP: Record<EvidenceRank, string> = {
  S: 'bg-amber-50 text-amber-800 border-amber-300',
  A: 'bg-blue-50 text-blue-800 border-blue-300',
  B: 'bg-emerald-50 text-emerald-800 border-emerald-300',
  C: 'bg-stone-100 text-stone-600 border-stone-300',
}
const RANK_LETTER: Record<EvidenceRank, string> = {
  S: 'bg-amber-500 text-white',
  A: 'bg-blue-500 text-white',
  B: 'bg-emerald-500 text-white',
  C: 'bg-stone-400 text-white',
}

function SmartBuyChip({ ing, cost }: { ing: Ingredient; cost: number }) {
  return (
    <Link
      href={`/ingredients/${ing.slug}`}
      className={`inline-flex items-center gap-1.5 text-[12px] rounded-full border pl-1 pr-3 py-1
        hover:shadow-sm transition-shadow ${RANK_CHIP[ing.evidenceRank]}`}
    >
      <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center
        flex-shrink-0 ${RANK_LETTER[ing.evidenceRank]}`}>
        {ing.evidenceRank}
      </span>
      <span className="font-medium">{ing.nameJa}</span>
      <span className="opacity-60 tabular-nums">¥{cost.toLocaleString()}</span>
    </Link>
  )
}

export default function CostPerformancePage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: '成分コスパランキング', item: PAGE_URL },
    ],
  }

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '成分コスパランキング（有効量あたり月額コストが安い順）',
    description: '論文の有効量を満たす最安の月額コストが安い順の経口サプリ成分リスト。価格は目安。',
    numberOfItems: Math.min(100, rows.length),
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: rows.slice(0, 100).map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: r.nameJa,
      url: `${BASE_URL}/ingredients/${r.slug}`,
    })),
  }

  const datasetJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: '成分コスパランキング（有効量あたり月額コスト × エビデンス）',
    description:
      `経口サプリ成分について、論文で使われた最小有効量を満たす商品の最安月額コストと論文エビデンス指数（PEI）を併記した独立データ。安さと研究の裏付けの両面で比較できる。価格は目安で変動する。`,
    url: PAGE_URL,
    keywords: ['サプリメント', 'コスパ', '月額コスト', '有効量', 'エビデンス', 'PEI', 'コストパフォーマンス'],
    creator: { '@type': 'Organization', name: 'SciBase', url: BASE_URL },
    isAccessibleForFree: true,
    inLanguage: 'ja',
    variableMeasured: '有効量を満たす最安の月額コスト（円）／ 論文エビデンス指数（PEI・0〜10）',
    measurementTechnique: '商品の含有量×推奨摂取数が論文最小有効量を満たす商品の monthlyCostJpy 最小値',
    dateModified: latestUpdated,
    license: 'https://creativecommons.org/licenses/by/4.0/',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }} />

      <div className="max-w-3xl mx-auto px-5 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-6">
          <Link href="/" className="hover:underline">ホーム</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">成分コスパランキング</span>
        </nav>

        {/* Hero */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Coins className="w-5 h-5 text-accent" />
            <span className="text-[12px] font-semibold text-accent tracking-wider">SciBase 独自データ</span>
          </div>
          <h1 className="text-[28px] sm:text-[36px] font-semibold text-foreground leading-[1.2] tracking-tight mb-4">
            成分コスパ<br className="sm:hidden" />ランキング
          </h1>
          <p className="text-[15px] text-foreground/80 leading-relaxed">
            経口サプリ{poolCount}成分を、<span className="font-medium text-foreground">論文の有効量を満たして飲んだときの月額コスト</span>が安い順に。
            研究の裏付け（PEI）とあわせて、<span className="font-medium text-foreground">「安さ」と「エビデンス」の両取り</span>ができる成分が見えます。
          </p>
          <Link
            href="/evidence-ranking"
            className="inline-flex items-center gap-1.5 text-[13px] text-accent hover:underline mt-3"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            裏付けの強さで並べた「エビデンスランキング」を見る
          </Link>
        </header>

        {/* 薬機法・価格鮮度ガード */}
        <section className="bg-secondary border border-border rounded-2xl p-5 mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-foreground" />
            <h2 className="text-[14px] font-semibold text-foreground">このランキングの読み方</h2>
          </div>
          <ul className="space-y-2.5 text-[13px] text-muted-foreground leading-relaxed">
            <li className="flex gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">›</span>
              <span>
                コスパは<span className="font-medium text-foreground">「価格」と「研究の裏付け」の話</span>です。効果を保証するものではありません。
                安い＝劣る、高い＝優れる、でもありません。
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">›</span>
              <span>
                <span className="font-medium text-foreground">「月額（有効量）」</span>＝論文で使われた最小有効量を、
                商品の含有量×推奨摂取数が満たす商品だけを対象にした、その中で最も安い月額コスト。
                「安いが量が足りない」商品は除外しています。
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">›</span>
              <span>
                価格は目安です（{latestUpdated}時点のデータ）。為替・在庫・セールで変動します。購入前に各商品ページで最新価格をご確認ください。
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">›</span>
              <span>対象は経口サプリです（外用は1回使用量が一定でなく、月額比較になじまないため除外）。</span>
            </li>
          </ul>
        </section>

        {/* 3スタット：最安 / 中央値 / 両取り数 */}
        <section className="mb-10">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="bg-card border border-border rounded-2xl p-4 text-center">
              <p className="text-[22px] sm:text-[28px] font-semibold text-foreground tabular-nums leading-none">¥{minCost.toLocaleString()}</p>
              <p className="text-[11px] text-muted-foreground mt-2 leading-tight">最安（有効量・月）</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 text-center">
              <p className="text-[22px] sm:text-[28px] font-semibold text-foreground tabular-nums leading-none">¥{medianCost.toLocaleString()}</p>
              <p className="text-[11px] text-muted-foreground mt-2 leading-tight">中央値（月）</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
              <p className="text-[22px] sm:text-[28px] font-semibold text-amber-700 tabular-nums leading-none">{smartBuys.length}</p>
              <p className="text-[11px] text-amber-700/80 mt-2 leading-tight">安い×エビデンス強</p>
            </div>
          </div>
          <p className="text-[12px] text-muted-foreground leading-relaxed mt-3">
            有効量で飲んでも月額の中央値は¥{medianCost.toLocaleString()}。
            <span className="text-foreground font-medium">高い＝よく効く、ではありません。</span>
            むしろ、安くて研究の裏付けも厚い成分（次のリスト）が、最初に検討する価値の高い候補です。
          </p>
        </section>

        {/* コスパ両取り（核） */}
        {smartBuys.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h2 className="text-[18px] font-semibold text-foreground">コスパ両取り：安い × エビデンス強い</h2>
            </div>
            <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">
              月額が安い側（下位約3分の1）でありながら、エビデンスが S または A ランクの{smartBuys.length}成分。
              「研究の裏付けがあって、しかも続けやすい価格」の組み合わせです。
            </p>
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex flex-wrap gap-1.5">
                {smartBuys.slice(0, 16).map(p => <SmartBuyChip key={p.ing.slug} ing={p.ing} cost={p.cost} />)}
              </div>
              {smartBuys.length > 16 && (
                <p className="text-[11px] text-muted-foreground/60 mt-3">
                  ほか{smartBuys.length - 16}成分。下の表で「安い順」に並べ、ランクSやAで絞り込めます。
                </p>
              )}
            </div>
          </section>
        )}

        {/* 全成分テーブル（主役） */}
        <section className="mb-12">
          <h2 className="text-[18px] font-semibold text-foreground mb-1">コスパ一覧（経口サプリ{poolCount}成分）</h2>
          <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">
            「安い順」と「エビデンス順」で並べ替えできます。成分名から各ページの論文・用量・商品へ進めます。
            論文の有効量を満たす商品が見つかった成分のみ掲載しています。
          </p>
          <CostPerformanceTable rows={rows} />
        </section>

        {/* 方法論への導線 */}
        <section className="bg-secondary border border-border rounded-2xl p-5 mb-10">
          <div className="flex items-start gap-3">
            <Info className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="text-[14px] font-semibold text-foreground mb-1">PEI（エビデンス指数）とは</h2>
              <p className="text-[13px] text-muted-foreground leading-relaxed mb-3">
                PEI は、論文数・RCT/メタ解析比率・最新性・ヒト試験比率の4軸を合算した0〜10の客観指標です。
                コスパと組み合わせて見ると、「安いだけ」「話題なだけ」を避けて選べます。計算式は完全開示しています。
              </p>
              <Link
                href="/about/evidence-scoring"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-accent hover:underline"
              >
                PEIの算出根拠と計算式を見る
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 関連導線 */}
        <nav className="border-t border-border pt-8 flex flex-wrap gap-4 text-[13px]">
          <Link href="/evidence-ranking" className="text-accent hover:underline">エビデンスランキング →</Link>
          <Link href="/ranking" className="text-accent hover:underline">悩み別ランキング →</Link>
          <Link href="/ingredients" className="text-accent hover:underline">成分一覧 →</Link>
          <Link href="/about/evidence-scoring" className="text-accent hover:underline">エビデンス評価の方法 →</Link>
        </nav>
      </div>
    </>
  )
}
