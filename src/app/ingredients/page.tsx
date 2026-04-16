import { Suspense } from 'react'
import { ingredients } from '@/lib/data'
import { IngredientsFilter } from '@/components/IngredientsFilter'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '成分一覧｜レチノール・ナイアシンアミド・ビタミンCほか論文エビデンス評価',
  description: 'レチノール・ナイアシンアミド・アスタキサンチン・クルクミンなど54成分を論文エビデンス順に掲載。外用/経口・ランクでフィルタリング可能。メタ解析・RCTの結果をもとに評価。',
  alternates: { canonical: 'https://scibase.app/ingredients' },
}

export default function IngredientsPage() {
  return (
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
  )
}
