import { Suspense } from 'react'
import { ingredients } from '@/lib/data'
import { IngredientsFilter } from '@/components/IngredientsFilter'
import type { Metadata } from 'next'

const BASE_URL = 'https://scibase.app'

export const metadata: Metadata = {
  title: '成分一覧｜レチノール・ナイアシンアミド・ビタミンCほか論文エビデンス評価',
  description: 'レチノール・ナイアシンアミド・アスタキサンチン・クルクミンなど54成分を論文エビデンス順に掲載。外用/経口・ランクでフィルタリング可能。メタ解析・RCTの結果をもとに評価。',
  alternates: { canonical: `${BASE_URL}/ingredients` },
}

export default function IngredientsPage() {
  const rankOrder: Record<string, number> = { S: 0, A: 1, B: 2, C: 3 }
  const topIngredients = [...ingredients]
    .sort((a, b) => (rankOrder[a.evidenceRank] ?? 99) - (rankOrder[b.evidenceRank] ?? 99))
    .slice(0, 30)

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'SciBase 成分一覧（論文エビデンス順）',
    numberOfItems: ingredients.length,
    itemListElement: topIngredients.map((ing, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: ing.nameJa,
      url: `${BASE_URL}/ingredients/${ing.slug}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <div className="max-w-5xl mx-auto px-5 py-10">
        <div className="mb-10">
          <h1 className="font-bold text-[28px] sm:text-[34px] text-foreground mb-2 tracking-tight">
            成分一覧
          </h1>
          <p className="text-[14px] text-muted-foreground">
            全{ingredients.length}成分 · エビデンスランク順 · 論文に基づく評価
          </p>
        </div>
        <Suspense fallback={<div className="text-muted-foreground text-[14px]">読み込み中...</div>}>
          <IngredientsFilter ingredients={ingredients} />
        </Suspense>
      </div>
    </>
  )
}
