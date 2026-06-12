'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ChevronDown, CircleUser, Search } from 'lucide-react'
import { SearchModal } from './SearchModal'

const CONTENT_LINKS = [
  { href: '/concerns',    label: '悩みから探す' },
  { href: '/ranking',     label: 'ランキング'   },
  { href: '/ingredients', label: '成分一覧'     },
  { href: '/articles',    label: 'コラム'       },
  { href: '/compare',     label: '比較'         },
]

const TOOL_GROUPS = [
  {
    title: '📏 測る',
    links: [
      { href: '/tools/phenoage',             label: '🧬 生物学的年齢',     desc: '健診の採血値で「体の年齢」を測る' },
      { href: '/tools/nutrient-sufficiency', label: '🥗 栄養素チェッカー', desc: '食事に足りない栄養素を見つける' },
    ],
  },
  {
    title: '🔍 選ぶ',
    links: [
      { href: '/analyzer',                   label: '🔬 サプリ診断',       desc: '悩みに合う成分を論文から選ぶ' },
    ],
  },
  {
    title: '🗂 管理する',
    links: [
      { href: '/tools/my-stack',             label: '🧺 My Stack',         desc: '棚の重複・飲み合わせ・コストを整理' },
      { href: '/tools/interaction-checker',  label: '💊 飲み合わせ',       desc: 'サプリ×薬の危険な組み合わせを防ぐ' },
    ],
  },
]

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
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center gap-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <svg width="28" height="28" viewBox="0 0 200 200" aria-hidden className="text-foreground">
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
            <span
              className="font-semibold text-[18px] tracking-tight text-foreground"
              style={{ fontFamily: 'var(--font-fraunces), serif' }}
            >
              SciBase
            </span>
          </Link>

          {/* Search bar (desktop) */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex flex-1 max-w-xs min-w-[140px] items-center gap-2.5 bg-secondary
              border border-border rounded-lg px-3 py-2 text-left
              hover:border-accent/50 transition-colors group"
          >
            <Search className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
            <span className="text-[13px] text-muted-foreground/60 flex-1 truncate">
              成分・悩みを検索...
            </span>
            <kbd className="text-[10px] text-muted-foreground/40 bg-background
              border border-border rounded px-1.5 py-0.5 hidden lg:block flex-shrink-0">
              ⌘K
            </kbd>
          </button>

          {/* Nav (desktop) */}
          <nav className="hidden sm:flex items-center gap-0.5 ml-auto">
            {CONTENT_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[13px] text-muted-foreground px-2.5 py-1.5 rounded-md whitespace-nowrap
                  hover:bg-secondary hover:text-foreground transition-colors"
              >
                {label}
              </Link>
            ))}

            {/* Tools dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-0.5 text-[13px] text-muted-foreground px-2.5 py-1.5 rounded-md whitespace-nowrap
                  hover:bg-secondary hover:text-foreground transition-colors
                  group-focus-within:bg-secondary group-focus-within:text-foreground"
              >
                🧪 ツール
                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
              </button>
              <div className="invisible absolute right-0 top-full z-50 pt-2 opacity-0 transition-all duration-150
                group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="w-60 rounded-xl border border-border bg-card p-1.5 shadow-lg">
                  {TOOL_GROUPS.map(({ title, links }) => (
                    <div key={title}>
                      <div className="px-3 pt-2 pb-0.5 text-[10px] font-semibold tracking-wide text-muted-foreground">
                        {title}
                      </div>
                      {links.map(({ href, label, desc }) => (
                        <Link
                          key={href}
                          href={href}
                          className="block rounded-lg px-3 py-2 transition-colors hover:bg-secondary"
                        >
                          <div className="text-[13px] font-medium text-foreground">{label}</div>
                          <div className="text-[11px] text-muted-foreground">{desc}</div>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* My page */}
            <Link
              href="/my"
              aria-label="マイページ"
              title="マイページ"
              className="text-muted-foreground p-1.5 rounded-md ml-0.5
                hover:bg-secondary hover:text-foreground transition-colors"
            >
              <CircleUser className="w-4 h-4" />
            </Link>
          </nav>

          {/* Right-aligned icons (mobile) */}
          <div className="sm:hidden ml-auto flex items-center gap-0.5">
            <Link
              href="/my"
              aria-label="マイページ"
              className="p-2 rounded-md hover:bg-secondary transition-colors"
            >
              <CircleUser className="w-4.5 h-4.5 text-muted-foreground" />
            </Link>
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="成分・悩みを検索"
              className="p-2 rounded-md hover:bg-secondary transition-colors"
            >
              <Search className="w-4.5 h-4.5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
