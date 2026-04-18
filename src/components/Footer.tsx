import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="max-w-5xl mx-auto px-5 py-12 space-y-6">

        <p className="text-[13px] text-muted-foreground leading-relaxed bg-secondary rounded-xl p-4">
          <span className="font-semibold text-foreground">PR・アフィリエイト表記 —{' '}</span>
          本サイトにはiHerb・Amazonのアフィリエイトリンクが含まれます。
          リンク経由での購入により当サイトへ手数料が発生する場合がありますが、
          掲載内容は論文エビデンスに基づき独立して評価しています。
        </p>

        <p className="text-[13px] text-muted-foreground leading-relaxed">
          本サイトの情報は医療的アドバイスを提供するものではありません。
          サプリメントの使用前には医師・薬剤師にご相談ください。
          掲載内容は研究情報の提供を目的としており、
          特定成分・商品の効果・効能を保証するものではありません。
        </p>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row
          items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-[15px] text-foreground">SciBase</p>
            <p className="text-[13px] text-muted-foreground mt-0.5">
              論文で選ぶ、成分データベース。
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted-foreground">
            <Link href="/concerns"    className="hover:text-foreground transition-colors">悩みから探す</Link>
            <Link href="/ingredients" className="hover:text-foreground transition-colors">成分一覧</Link>
            <Link href="/ranking"     className="hover:text-foreground transition-colors">ランキング</Link>
            <Link href="/compare"     className="hover:text-foreground transition-colors">成分比較</Link>
            <Link href="/articles"    className="hover:text-foreground transition-colors">コラム</Link>
            <Link href="/analyzer"    className="hover:text-foreground transition-colors">サプリ診断</Link>
            <Link href="/about"       className="hover:text-foreground transition-colors">サイトについて</Link>
          </nav>
        </div>

        <p className="text-[12px] text-muted-foreground/60">© 2026 SciBase</p>
      </div>
    </footer>
  )
}
