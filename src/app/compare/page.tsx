import Link from 'next/link'
import { ChevronRight, ArrowRight } from 'lucide-react'
import { getIngredient } from '@/lib/data'
import { EvidenceBadge } from '@/components/EvidenceBadge'
import type { Metadata } from 'next'

const BASE_URL = 'https://scibase.app'

export const metadata: Metadata = {
  title: '成分比較一覧【論文エビデンス】どっちが効く？｜SciBase',
  description: '「レチノール vs バクチオール」「NMN vs NR」など、よく比較される成分を論文エビデンスで徹底比較。口コミでも広告でもなく、査読済み論文で判断する成分比較データベース。',
  alternates: { canonical: `${BASE_URL}/compare` },
}

const POPULAR_PAIRS: [string, string][] = [
  ['retinol',          'bakuchiol'],
  ['retinol',          'retinal'],
  ['nmn',              'nicotinamide-riboside'],
  ['glycine',          'magnesium'],
  ['vitamin-c-topical','niacinamide'],
  ['ashwagandha',      'rhodiola'],
  ['collagen-peptide', 'vitamin-c-oral'],
  ['omega3',           'astaxanthin'],
  ['probiotics',       'inulin'],
  ['coq10',            'pqq'],
  ['melatonin',        'glycine'],
  ['ashwagandha',      'l-theanine'],
  ['resveratrol',      'quercetin'],
  ['hyaluronic-acid',  'ceramide'],
  ['vitamin-d',        'magnesium'],
  ['zinc',             'vitamin-c-oral'],
  ['lions-mane',       'bacopa-monnieri'],
  ['nmn',              'coq10'],
]

const CATEGORY_LABELS: Record<string, string> = {
  skin:       'スキンケア',
  antiaging:  '抗老化・長寿',
  stress:     'ストレス・睡眠',
  supplement: 'サプリメント',
  gut:        '腸活',
  cognitive:  '脳・認知',
  energy:     '代謝・エネルギー',
}

/* 比較ペアのカテゴリ分類 */
const PAIR_CATEGORIES: Record<string, string> = {
  'retinol-vs-bakuchiol':         'skin',
  'retinol-vs-retinal':           'skin',
  'vitamin-c-topical-vs-niacinamide': 'skin',
  'hyaluronic-acid-vs-ceramide':  'skin',
  'nmn-vs-nicotinamide-riboside': 'antiaging',
  'resveratrol-vs-quercetin':     'antiaging',
  'nmn-vs-coq10':                 'antiaging',
  'collagen-peptide-vs-vitamin-c-oral': 'antiaging',
  'ashwagandha-vs-rhodiola':      'stress',
  'ashwagandha-vs-l-theanine':    'stress',
  'melatonin-vs-glycine':         'stress',
  'glycine-vs-magnesium':         'stress',
  'omega3-vs-astaxanthin':        'supplement',
  'vitamin-d-vs-magnesium':       'supplement',
  'zinc-vs-vitamin-c-oral':       'supplement',
  'probiotics-vs-inulin':         'gut',
  'lions-mane-vs-bacopa-monnieri': 'cognitive',
  'coq10-vs-pqq':                 'energy',
}

export default function ComparePage() {
  /* ペアを解決（成分データと結合） */
  const pairs = POPULAR_PAIRS.map(([slugA, slugB]) => {
    const ingA = getIngredient(slugA)
    const ingB = getIngredient(slugB)
    const pairKey = `${slugA}-vs-${slugB}`
    return { slugA, slugB, ingA, ingB, pairKey, category: PAIR_CATEGORIES[pairKey] ?? 'supplement' }
  }).filter(p => p.ingA && p.ingB)

  /* カテゴリ別にグループ化 */
  const categories = ['skin', 'antiaging', 'stress', 'supplement', 'gut', 'cognitive', 'energy']
  const grouped = categories
    .map(cat => ({ cat, pairs: pairs.filter(p => p.category === cat) }))
    .filter(g => g.pairs.length > 0)

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-8">
        <Link href="/" className="hover:underline">ホーム</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">成分比較</span>
      </nav>

      {/* Hero — 損失回避フレーミング */}
      <div className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em]
          text-muted-foreground mb-3">論文エビデンス比較データベース</p>
        <h1 className="text-[28px] sm:text-[36px] font-bold text-foreground
          tracking-tight leading-[1.2] mb-4">
          「どっちが効くか」を<br className="hidden sm:block" />口コミではなく論文で判断する
        </h1>
        <p className="text-[14px] text-muted-foreground leading-relaxed max-w-xl">
          よく比較される成分を、査読済み論文・エビデンスランク・7軸スコアで徹底比較。
          間違った成分を選び続けるコストは、製品代だけではありません。
        </p>
      </div>

      {/* 比較一覧 — カテゴリ別 */}
      <div className="space-y-10">
        {grouped.map(({ cat, pairs: catPairs }) => (
          <section key={cat}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider
                text-muted-foreground bg-secondary border border-border
                rounded-full px-3 py-1">
                {CATEGORY_LABELS[cat]}
              </span>
            </div>
            <div className="space-y-3">
              {catPairs.map(({ ingA, ingB, pairKey }) => {
                if (!ingA || !ingB) return null
                const rankOrder: Record<string, number> = { S: 4, A: 3, B: 2, C: 1 }
                const winner = rankOrder[ingA.evidenceRank] > rankOrder[ingB.evidenceRank]
                  ? ingA
                  : rankOrder[ingB.evidenceRank] > rankOrder[ingA.evidenceRank]
                  ? ingB
                  : null

                return (
                  <Link
                    key={pairKey}
                    href={`/compare/${pairKey}`}
                    className="flex items-center gap-4 bg-card border border-border
                      rounded-2xl px-5 py-4 hover:border-accent/50 hover:shadow-sm
                      transition-all group"
                  >
                    {/* 成分A */}
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <EvidenceBadge rank={ingA.evidenceRank} variant="chip" />
                      <span className="font-semibold text-[14px] text-foreground truncate">
                        {ingA.nameJa}
                      </span>
                    </div>

                    {/* vs */}
                    <div className="flex-shrink-0 text-[11px] font-bold text-muted-foreground/60
                      bg-secondary border border-border rounded-full px-2.5 py-1">
                      vs
                    </div>

                    {/* 成分B */}
                    <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                      <span className="font-semibold text-[14px] text-foreground truncate text-right">
                        {ingB.nameJa}
                      </span>
                      <EvidenceBadge rank={ingB.evidenceRank} variant="chip" />
                    </div>

                    {/* 勝者バッジ + 矢印 */}
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      {winner && (
                        <span className="hidden sm:block text-[10px] font-semibold
                          bg-amber-50 text-amber-700 border border-amber-200
                          rounded-full px-2 py-0.5 whitespace-nowrap">
                          {winner.nameJa}が優位
                        </span>
                      )}
                      <ArrowRight className="w-4 h-4 text-muted-foreground
                        group-hover:text-accent transition-colors flex-shrink-0" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      {/* CTA — サプリ診断へ誘導 */}
      <div className="mt-12 bg-secondary border border-border rounded-2xl p-6">
        <p className="font-semibold text-[15px] text-foreground mb-2">
          「どれを選ぶか」より「今、何が足りていないか」
        </p>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">
          比較の前に、現在のサプリが7軸（抗老化・肌・脳・ストレス・睡眠・免疫・代謝）をどれだけカバーしているかを確認する。
          カバーされていない軸を埋める成分を選ぶのが、最も効率的なアプローチです。
        </p>
        <Link
          href="/analyzer"
          className="inline-flex items-center gap-2 text-[13px] font-semibold
            bg-foreground text-background rounded-xl px-4 py-2.5
            hover:opacity-85 transition-opacity"
        >
          今のサプリを7軸で診断する
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 関連リンク */}
      <div className="mt-10 pt-8 border-t border-border flex flex-wrap gap-4 text-[13px]">
        <Link href="/ingredients" className="text-accent hover:underline">成分一覧 →</Link>
        <Link href="/ranking" className="text-accent hover:underline">ランキング →</Link>
        <Link href="/concerns"  className="text-accent hover:underline">悩みから探す →</Link>
      </div>
    </div>
  )
}
