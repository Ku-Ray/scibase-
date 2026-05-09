import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="max-w-5xl mx-auto px-5 py-12 space-y-6">

        <p className="text-[13px] text-muted-foreground leading-relaxed bg-secondary rounded-xl p-4">
          <span className="font-semibold text-foreground">PR・アフィリエイト表記 —{' '}</span>
          本サイトにはiHerb・Amazonのアフィリエイトリンクが含まれます。
          ユーザーがリンクから商品を購入すると、運営に販売手数料が支払われる仕組みです。
          ただし、成分・商品の掲載順位および評価は論文エビデンスのみに基づいて決定しており、
          手数料の有無・金額が評価に影響することはありません。
        </p>

        <p className="text-[13px] text-muted-foreground leading-relaxed">
          本サイトの情報は医療的アドバイスを提供するものではありません。
          サプリメントの使用前には医師・薬剤師にご相談ください。
          掲載内容は研究情報の提供を目的としており、
          特定成分・商品の効果・効能を保証するものではありません。
        </p>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row
          items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <svg width="32" height="32" viewBox="0 0 200 200" aria-hidden className="text-foreground flex-shrink-0">
              <polygon
                points="180,100 140,31 60,31 20,100 60,169 140,169"
                fill="none" stroke="currentColor" strokeWidth="14" strokeLinejoin="round"
              />
              <text
                x="100" y="100"
                fontSize="135" fontWeight="600"
                textAnchor="middle" dominantBaseline="central"
                fill="currentColor"
                style={{ fontFamily: 'var(--font-fraunces), serif' }}
              >S</text>
            </svg>
            <div>
              <p
                className="font-semibold text-[18px] text-foreground"
                style={{ fontFamily: 'var(--font-fraunces), serif' }}
              >SciBase</p>
              <p className="text-[12px] text-muted-foreground mt-0.5">
                論文で選ぶ、成分データベース。
              </p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted-foreground">
            <Link href="/concerns"    className="hover:text-foreground transition-colors">悩みから探す</Link>
            <Link href="/ingredients" className="hover:text-foreground transition-colors">成分一覧</Link>
            <Link href="/ranking"     className="hover:text-foreground transition-colors">ランキング</Link>
            <Link href="/compare"     className="hover:text-foreground transition-colors">成分比較</Link>
            <Link href="/articles"    className="hover:text-foreground transition-colors">コラム</Link>
            <Link href="/analyzer"    className="hover:text-foreground transition-colors">サプリ診断</Link>
            <Link href="/about"       className="hover:text-foreground transition-colors">サイトについて</Link>
            <Link href="/privacy"     className="hover:text-foreground transition-colors">プライバシーポリシー</Link>
            <a
              href="https://x.com/r_evidence_"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              @r_evidence_
            </a>
          </nav>
        </div>

        <p className="text-[12px] text-muted-foreground/60">© 2026 SciBase</p>
      </div>
    </footer>
  )
}
