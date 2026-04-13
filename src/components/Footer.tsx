import Link from 'next/link'

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-card)' }}
      className="mt-24">
      <div className="max-w-4xl mx-auto px-5 py-12 space-y-8">

        {/* PR表記 */}
        <div style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
          className="rounded-xl p-4 text-[13px] leading-relaxed">
          <span style={{ color: 'var(--text-primary)' }} className="font-medium">PR・アフィリエイト表記 — </span>
          本サイトにはiHerb・Amazon・楽天等のアフィリエイトリンクが含まれます。
          リンク経由での購入により当サイトへ手数料が発生する場合がありますが、
          掲載内容は論文エビデンスに基づき独立して評価しています。
        </div>

        {/* 免責 */}
        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
          本サイトの情報は医療的アドバイスを提供するものではありません。
          サプリメントの使用前には医師・薬剤師にご相談ください。
          掲載内容は研究情報の提供を目的としており、特定成分・商品の効果・効能を保証するものではありません。
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5
          pt-6" style={{ borderTop: '1px solid var(--border-light)' }}>
          <div>
            <p className="font-semibold text-[15px]" style={{ color: 'var(--text-primary)' }}>Agescience</p>
            <p className="text-[13px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
              サプリの「本当に効く」を、論文で確かめる
            </p>
          </div>
          <nav className="flex gap-5 text-[13px]" style={{ color: 'var(--text-tertiary)' }}>
            <Link href="/concerns" className="hover:underline">悩みから探す</Link>
            <Link href="/ingredients" className="hover:underline">成分一覧</Link>
          </nav>
        </div>

        <p className="text-[12px]" style={{ color: 'var(--text-tertiary)' }}>
          © 2026 Agescience
        </p>
      </div>
    </footer>
  )
}
