import Link from 'next/link'
import { ChevronRight, ArrowRight } from 'lucide-react'
import { getIngredient, ingredients } from '@/lib/data'
import { CompareGrid } from '@/components/CompareGrid'
import {
  POPULAR_PAIRS,
  TOP3_PAIR_KEYS,
  PAIR_CATEGORIES,
} from '@/lib/compare-data'
import type { Metadata } from 'next'
import type { EvidenceRank } from '@/lib/types'

const BASE_URL = 'https://scibase.app'

export const metadata: Metadata = {
  title: '成分比較一覧【論文エビデンス】どっちが効く？',
  description:
    '「レチノール vs バクチオール」「クレアチン vs HMB」「NMN vs NR」など、よく比較される30ペアを論文エビデンスで徹底比較。査読済み論文・エビデンスランク・7軸スコアで判断する成分比較データベース。',
  alternates: { canonical: `${BASE_URL}/compare` },
}

/* 参照論文の総数（全成分の論文件数合計） */
const totalPapers = ingredients.reduce((acc, i) => acc + i.papers.length, 0)

export default function ComparePage() {
  const pairs = POPULAR_PAIRS
    .map(([slugA, slugB]) => {
      const ingA = getIngredient(slugA)
      const ingB = getIngredient(slugB)
      const pairKey = `${slugA}-vs-${slugB}`
      if (!ingA || !ingB) return null
      return {
        pairKey,
        nameJaA: ingA.nameJa,
        nameJaB: ingB.nameJa,
        rankA:   ingA.evidenceRank as EvidenceRank,
        rankB:   ingB.evidenceRank as EvidenceRank,
        category: PAIR_CATEGORIES[pairKey] ?? 'supplement',
        isTop3:  TOP3_PAIR_KEYS.includes(pairKey),
      }
    })
    .filter(Boolean) as NonNullable<ReturnType<typeof POPULAR_PAIRS.map>>[number][]

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-8">
        <Link href="/" className="hover:underline">ホーム</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">成分比較</span>
      </nav>

      {/* Hero — 損失回避 + 数値アンカリング */}
      <div className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em]
          text-muted-foreground mb-3">論文エビデンス比較データベース</p>
        <h1 className="text-[28px] sm:text-[36px] font-bold text-foreground
          tracking-tight leading-[1.2] mb-4">
          「どっちが効くか」を<br className="sm:hidden" />
          論文で判断する
        </h1>
        <p className="text-[14px] text-muted-foreground leading-relaxed max-w-xl mb-6">
          口コミでも広告でもなく、査読済み論文で成分を比較する。
          間違った成分を選び続けるコストは、製品代だけではありません。
        </p>

        {/* 数値バッジ（アンカリング） */}
        <div className="flex flex-wrap gap-4 text-[13px]">
          {[
            { value: `${POPULAR_PAIRS.length}`, label: 'の比較ペア' },
            { value: `${ingredients.length}`,   label: '成分を収録' },
            { value: `${totalPapers}`,           label: '件の論文参照' },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-baseline gap-1.5">
              <span className="text-[20px] font-black text-foreground tabular-nums">{value}</span>
              <span className="text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CompareGrid（フィルター + TOP3 + 一覧） */}
      {/* @ts-expect-error: pairs型はnullをfilterで除外済み */}
      <CompareGrid pairs={pairs} />

      {/* CTA — 選択疲れへの出口：診断で今足りていないものを見つける */}
      <div className="mt-12 bg-secondary border border-border rounded-2xl p-6">
        <p className="font-semibold text-[15px] text-foreground mb-2">
          「どれを選ぶか」より「今、何が足りていないか」
        </p>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">
          比較の前に、現在のサプリが7軸（抗老化・肌・脳・ストレス・睡眠・免疫・代謝）を
          どれだけカバーしているかを確認する。
          カバーされていない軸を埋める成分を選ぶのが、最も効率的なアプローチです。
        </p>
        <Link
          href="/analyzer"
          className="inline-flex items-center gap-2 text-[14px] font-semibold
            bg-foreground text-background rounded-xl px-5 py-3
            hover:opacity-85 transition-opacity"
        >
          今のサプリを7軸で診断する
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 関連リンク */}
      <div className="mt-10 pt-8 border-t border-border flex flex-wrap gap-4 text-[13px]">
        <Link href="/ingredients" className="text-accent hover:underline">成分一覧 →</Link>
        <Link href="/ranking"     className="text-accent hover:underline">ランキング →</Link>
        <Link href="/concerns"    className="text-accent hover:underline">悩みから探す →</Link>
        <Link href="/about"       className="text-accent hover:underline">エビデンス評価基準 →</Link>
      </div>
    </div>
  )
}
