import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ページが見つかりません',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-5 text-center">
      <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-4">
        404 Not Found
      </p>
      <h1 className="text-[32px] sm:text-[40px] font-black text-foreground leading-[1.2] mb-4">
        ページが見つかりません
      </h1>
      <p className="text-[15px] text-muted-foreground leading-relaxed max-w-sm mb-10">
        URLが変更されたか、削除された可能性があります。
        成分や悩みは検索から探せます。
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground
            text-[14px] font-medium rounded-xl px-6 py-3 hover:opacity-90 transition-opacity"
        >
          トップに戻る
        </Link>
        <Link
          href="/ingredients"
          className="inline-flex items-center justify-center gap-2 border border-border
            text-[14px] font-medium rounded-xl px-6 py-3 hover:bg-secondary transition-colors"
        >
          成分一覧を見る
        </Link>
      </div>
    </div>
  )
}
