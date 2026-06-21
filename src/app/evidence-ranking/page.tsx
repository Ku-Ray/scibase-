import Link from 'next/link'
import {
  ChevronRight,
  BarChart3,
  Info,
  Microscope,
  FlaskConical,
  ArrowRight,
} from 'lucide-react'
import type { Metadata } from 'next'
import type { EvidenceRank, Ingredient } from '@/lib/types'
import { ingredients, concerns } from '@/lib/data'
import { EvidenceRankingTable, type RankRow } from '@/components/EvidenceRankingTable'

const BASE_URL = 'https://scibase.app'
const PAGE_URL = `${BASE_URL}/evidence-ranking`

/* ─────────────────────────────────────────────
 *  ビルド時集計（データソースは data.ts・追加入力なし）
 *  PEI = evidenceScore.overall（論文の量と質の客観指標）。
 *  「効果の強さ」ではなく「査読論文での裏付けの量と質」の順。
 * ───────────────────────────────────────────── */
const concernName = new Map(concerns.map(c => [c.slug, c.nameJa]))
const RANK_ORDER: Record<EvidenceRank, number> = { S: 0, A: 1, B: 2, C: 3 }

const scored = ingredients.filter(i => i.evidenceScore)

const sortedScored = [...scored].sort((a, b) => {
  const pa = a.evidenceScore!
  const pb = b.evidenceScore!
  if (pb.overall !== pa.overall) return pb.overall - pa.overall
  const hb = pb.paperStats.rct + pb.paperStats.metaAnalysis
  const ha = pa.paperStats.rct + pa.paperStats.metaAnalysis
  if (hb !== ha) return hb - ha
  if (pb.paperStats.total !== pa.paperStats.total) return pb.paperStats.total - pa.paperStats.total
  if (RANK_ORDER[a.evidenceRank] !== RANK_ORDER[b.evidenceRank]) {
    return RANK_ORDER[a.evidenceRank] - RANK_ORDER[b.evidenceRank]
  }
  return a.nameJa.localeCompare(b.nameJa, 'ja')
})

const rows: RankRow[] = sortedScored.map((ing, i) => ({
  pos: i + 1,
  slug: ing.slug,
  nameJa: ing.nameJa,
  nameEn: ing.nameEn,
  rank: ing.evidenceRank,
  pei: ing.evidenceScore!.overall,
  rct: ing.evidenceScore!.paperStats.rct,
  meta: ing.evidenceScore!.paperStats.metaAnalysis,
  total: ing.evidenceScore!.paperStats.total,
  concernsJa: ing.concerns
    .map(s => concernName.get(s))
    .filter((v): v is string => Boolean(v))
    .slice(0, 3),
  usage: ing.usageType,
}))

const totalCount = ingredients.length
const humanCount = scored.filter(
  i => i.evidenceScore!.paperStats.rct > 0 || i.evidenceScore!.paperStats.metaAnalysis > 0,
).length
const sRankList = sortedScored.filter(i => i.evidenceRank === 'S')
const emergingList = sortedScored.filter(
  i => i.evidenceScore!.paperStats.rct === 0 && i.evidenceScore!.paperStats.metaAnalysis === 0,
)

const latestUpdated = ingredients.map(i => i.updatedAt).sort().at(-1) ?? '2026-01-01'

export const metadata: Metadata = {
  title: `成分エビデンスランキング｜査読論文の裏付けが一目でわかる（全${totalCount}成分）`,
  description:
    `サプリ・スキンケア成分${totalCount}種を、効果の強さではなく「査読論文での裏付けの量と質（論文エビデンス指数PEI）」で横断ランキング。` +
    'RCT・メタ解析の有無が一目でわかる早見表つき。化粧品メーカー現役研究者が論文ベースで独立評価した2026年版。',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `成分エビデンスランキング（全${totalCount}成分）｜SciBase`,
    description: '効果順ではなく「査読論文での裏付け」順。RCT・メタ解析の有無が一目でわかる独自データ。',
    url: PAGE_URL,
    type: 'website',
  },
}

/* ── 早見表チップ ── */
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

function IngredientChip({ ing }: { ing: Ingredient }) {
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
      <span className="opacity-50 tabular-nums">{ing.evidenceScore!.overall.toFixed(1)}</span>
    </Link>
  )
}

export default function EvidenceRankingPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: '成分エビデンスランキング', item: PAGE_URL },
    ],
  }

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '成分エビデンスランキング（論文エビデンス指数 PEI 順）',
    description: '査読論文での裏付けの量と質（PEI）が高い順の成分リスト。効果の強さの順位ではありません。',
    numberOfItems: Math.min(100, rows.length),
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    itemListElement: rows.slice(0, 100).map(r => ({
      '@type': 'ListItem',
      position: r.pos,
      name: r.nameJa,
      url: `${BASE_URL}/ingredients/${r.slug}`,
    })),
  }

  const datasetJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: '成分エビデンスランキング（論文エビデンス指数 PEI）',
    description:
      `SciBase が収録する${totalCount}成分について、査読論文の本数・研究デザイン（RCT/メタ解析比率）・最新性・ヒト試験比率から算出した論文エビデンス指数（PEI・0〜10）の横断ランキング。効果の強さではなく研究の裏付けの量と質を表す。`,
    url: PAGE_URL,
    keywords: ['サプリメント', '成分', 'エビデンス', '論文', 'RCT', 'メタ解析', '論文エビデンス指数', 'PEI'],
    creator: { '@type': 'Organization', name: 'SciBase', url: BASE_URL },
    isAccessibleForFree: true,
    inLanguage: 'ja',
    variableMeasured: '論文エビデンス指数（PEI・0〜10）',
    measurementTechnique: '査読論文の本数・RCT/メタ解析比率・最新性（直近15年）・ヒト試験比率の4軸合算',
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
          <span className="text-foreground">成分エビデンスランキング</span>
        </nav>

        {/* Hero */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-5 h-5 text-accent" />
            <span className="text-[12px] font-semibold text-accent tracking-wider">SciBase 独自データ</span>
          </div>
          <h1 className="text-[28px] sm:text-[36px] font-semibold text-foreground leading-[1.2] tracking-tight mb-4">
            成分エビデンス<br className="sm:hidden" />ランキング
          </h1>
          <p className="text-[15px] text-foreground/80 leading-relaxed">
            収録する{totalCount}成分を、<span className="font-medium text-foreground">査読論文での裏付け（論文の量と質）</span>で横断的に格付け。
            論文エビデンス指数（PEI）が高い順に並べ、RCT・メタ解析の有無まで一目で見渡せます。
          </p>
          <Link
            href="/about/evidence-scoring"
            className="inline-flex items-center gap-1.5 text-[13px] text-accent hover:underline mt-3"
          >
            <Info className="w-3.5 h-3.5" />
            PEI（論文エビデンス指数）の算出方法を見る
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </header>

        {/* 薬機法ガード：読み方 */}
        <section className="bg-secondary border border-border rounded-2xl p-5 mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-foreground" />
            <h2 className="text-[14px] font-semibold text-foreground">このランキングの読み方</h2>
          </div>
          <ul className="space-y-2.5 text-[13px] text-muted-foreground leading-relaxed">
            <li className="flex gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">›</span>
              <span>
                これは<span className="font-medium text-foreground">「効果の強さ」の順位ではありません</span>。
                査読論文での裏付け（論文の量と質）がどれだけあるかを示す指標の順です。
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">›</span>
              <span>
                上位＝必ず効く、ではありません。下位＝効かない・危険、でもありません。
                下位の多くは<span className="font-medium text-foreground">「ヒトでの研究がまだ少ない／観察研究・動物実験の段階」</span>という意味です。
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent flex-shrink-0 mt-0.5">›</span>
              <span>
                体質・年齢・目的によって合う成分は変わります。最終的な判断は医師・薬剤師にご相談ください。
              </span>
            </li>
          </ul>
        </section>

        {/* 3スタット：513収録 → 451ヒト試験あり → S15 */}
        <section className="mb-10">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="bg-card border border-border rounded-2xl p-4 text-center">
              <p className="text-[26px] sm:text-[32px] font-semibold text-foreground tabular-nums leading-none">{totalCount}</p>
              <p className="text-[11px] text-muted-foreground mt-2 leading-tight">収録成分</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 text-center">
              <p className="text-[26px] sm:text-[32px] font-semibold text-foreground tabular-nums leading-none">{humanCount}</p>
              <p className="text-[11px] text-muted-foreground mt-2 leading-tight">ヒトのRCT・<br />メタ解析あり</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
              <p className="text-[26px] sm:text-[32px] font-semibold text-amber-700 tabular-nums leading-none">{sRankList.length}</p>
              <p className="text-[11px] text-amber-700/80 mt-2 leading-tight">複数で一貫<br />（最上位S）</p>
            </div>
          </div>
          <p className="text-[12px] text-muted-foreground leading-relaxed mt-3">
            数が右にいくほど、求める裏付けの基準が厳しくなります。
            <span className="text-foreground font-medium">「論文があるか」より「どんな論文か」で差がつく</span>のがポイント。
            ヒトでの試験を持つ成分は多くても、複数のRCT・メタ解析で結果が一貫する最上位（Sランク）はごく一部です。
          </p>
        </section>

        {/* 早見表（核）：二分 */}
        <section className="mb-12">
          <h2 className="text-[18px] font-semibold text-foreground mb-1">早見表：裏付けの「種類」で見る</h2>
          <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">
            同じ「研究あり」でも、ヒトでの比較試験まであるか、まだ動物・試験管の段階かで意味は大きく違います。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 左：最上位S */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-1">
                <FlaskConical className="w-4 h-4 text-amber-500" />
                <h3 className="text-[14px] font-semibold text-foreground">最も裏付けが厚い成分</h3>
              </div>
              <p className="text-[12px] text-muted-foreground leading-relaxed mb-4">
                複数のRCTやメタ解析で結果が一貫している{sRankList.length}成分（ランクS）。研究の蓄積が最も厚い領域です。
              </p>
              <div className="flex flex-wrap gap-1.5">
                {sRankList.map(ing => <IngredientChip key={ing.slug} ing={ing} />)}
              </div>
            </div>

            {/* 右：まだRCT・メタ解析なし */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-1">
                <Microscope className="w-4 h-4 text-stone-500" />
                <h3 className="text-[14px] font-semibold text-foreground">ヒトでの比較試験はこれからの成分</h3>
              </div>
              <p className="text-[12px] text-muted-foreground leading-relaxed mb-4">
                話題でも、ヒトでのRCT・メタ解析はまだない{emergingList.length}成分（観察研究・動物実験・試験管の段階）。
                注目株ほど、ここに入っていることがあります。
              </p>
              <div className="flex flex-wrap gap-1.5">
                {emergingList.slice(0, 14).map(ing => <IngredientChip key={ing.slug} ing={ing} />)}
              </div>
              {emergingList.length > 14 && (
                <p className="text-[11px] text-muted-foreground/60 mt-3">
                  ほか{emergingList.length - 14}成分。下の表で「ヒトのRCT・メタ解析ありのみ」のチェックを外すと一覧できます。
                </p>
              )}
            </div>
          </div>
        </section>

        {/* 全成分テーブル（主役） */}
        <section className="mb-12">
          <h2 className="text-[18px] font-semibold text-foreground mb-1">全成分ランキング（PEI順）</h2>
          <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">
            論文エビデンス指数（PEI）が高い順。成分名から各ページの論文・用量・副作用へ進めます。
            PEIが算出済みの{rows.length}成分が対象です。
          </p>
          <EvidenceRankingTable rows={rows} />
        </section>

        {/* 方法論への導線（透明性＝引用される条件） */}
        <section className="bg-secondary border border-border rounded-2xl p-5 mb-10">
          <div className="flex items-start gap-3">
            <Info className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="text-[14px] font-semibold text-foreground mb-1">PEIはどう決まる？</h2>
              <p className="text-[13px] text-muted-foreground leading-relaxed mb-3">
                論文エビデンス指数（PEI）は、①論文数 ②RCT・メタ解析比率 ③最新性 ④ヒト試験比率 の4軸を合算した0〜10の客観指標です。
                計算式をすべて開示しています。実用判断（安全性・推奨度を含む S/A/B/C ランク）とは役割が異なります。
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
          <Link href="/cost-performance" className="text-accent hover:underline">コスパランキング →</Link>
          <Link href="/ranking" className="text-accent hover:underline">悩み別ランキング →</Link>
          <Link href="/ingredients" className="text-accent hover:underline">成分一覧 →</Link>
          <Link href="/compare" className="text-accent hover:underline">成分を比較する →</Link>
          <Link href="/about/evidence-scoring" className="text-accent hover:underline">エビデンス評価の方法 →</Link>
        </nav>
      </div>
    </>
  )
}
