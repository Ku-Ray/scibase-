'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { SearchModal } from './SearchModal'

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
                <circle cx="6.5" cy="6.5" r="2.5" fill="white"/>
                <circle cx="6.5" cy="6.5" r="5.5" stroke="white" strokeWidth="1.5" strokeOpacity="0.45"/>
              </svg>
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-foreground">
              SciBase
            </span>
          </Link>

          {/* Search bar (desktop) */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex flex-1 max-w-sm items-center gap-2.5 bg-secondary
              border border-border rounded-lg px-3 py-2 text-left
              hover:border-accent/50 transition-colors group"
          >
            <Search className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
            <span className="text-[13px] text-muted-foreground/60 flex-1">
              成分・悩みを検索...
            </span>
            <kbd className="text-[10px] text-muted-foreground/40 bg-background
              border border-border rounded px-1.5 py-0.5 hidden lg:block">
              ⌘K
            </kbd>
          </button>

          {/* Nav */}
          <nav className="hidden sm:flex items-center gap-1 ml-auto">
            {[
              { href: '/concerns',    label: '悩みから探す' },
              { href: '/ranking',     label: 'ランキング'   },
              { href: '/ingredients', label: '成分一覧'     },
              { href: '/analyzer',    label: '🔬 サプリ診断' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[13px] text-muted-foreground px-3 py-1.5 rounded-md
                  hover:bg-secondary hover:text-foreground transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Search icon (mobile) */}
          <button
            onClick={() => setSearchOpen(true)}
            className="sm:hidden ml-auto p-2 rounded-md hover:bg-secondary transition-colors"
          >
            <Search className="w-4.5 h-4.5 text-muted-foreground" />
          </button>
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
