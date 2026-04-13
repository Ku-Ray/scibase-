import Link from 'next/link'

export function Header() {
  return (
    <header style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}
      className="sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2.5 group">
          <div style={{ background: 'var(--brand)' }}
            className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="3" fill="white" opacity="0.9"/>
              <circle cx="7" cy="7" r="6" stroke="white" strokeWidth="1.5" opacity="0.5"/>
            </svg>
          </div>
          <span style={{ color: 'var(--text-primary)' }}
            className="font-semibold text-[15px] tracking-tight">
            Agescience
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {[
            { href: '/concerns',    label: '悩みから探す' },
            { href: '/ingredients', label: '成分一覧' },
          ].map(({ href, label }) => (
            <Link key={href} href={href}
              style={{ color: 'var(--text-secondary)' }}
              className="hidden sm:block text-sm px-3 py-1.5 rounded-md hover:bg-[var(--bg-muted)] transition-colors">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
