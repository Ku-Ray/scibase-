import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="max-w-5xl mx-auto px-5 py-12 space-y-6">

        {/* note導線 */}
        <div className="bg-secondary border border-border rounded-2xl p-5 flex flex-col sm:flex-row
          items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-[14px] text-foreground mb-1">
              論文を要約したnoteマガジン
            </p>
            <p className="text-[13px] text-muted-foreground">
              老化・スキンケア・サプリの最新論文を毎週要約 · 月額980円
            </p>
          </div>
          <a
            href="https://note.com/r_evidence_/membership"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-1.5 text-[13px] font-semibold
              bg-foreground text-background rounded-xl px-5 py-2.5
              hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            詳細を見る →
          </a>
        </div>

        <p className="text-[13px] text-muted-foreground leading-relaxed bg-secondary rounded-xl p-4">
          <span className="font-semibold text-foreground">PR・アフィリエイト表記 —{' '}</span>
          本サイトにはiHerb・Amazon・楽天等のアフィリエイトリンクが含まれます。
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
          <nav className="flex gap-5 text-[13px] text-muted-foreground">
            <Link href="/concerns"    className="hover:text-foreground transition-colors">悩みから探す</Link>
            <Link href="/ingredients" className="hover:text-foreground transition-colors">成分一覧</Link>
          </nav>
        </div>

        <p className="text-[12px] text-muted-foreground/60">© 2026 SciBase</p>
      </div>
    </footer>
  )
}
