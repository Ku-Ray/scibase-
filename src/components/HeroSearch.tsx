'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight } from 'lucide-react'
import Fuse from 'fuse.js'
import { ingredients, concerns } from '@/lib/data'
import type { Ingredient, Concern } from '@/lib/types'

type Result =
  | { type: 'ingredient'; item: Ingredient }
  | { type: 'concern';    item: Concern }

const fuse = new Fuse<Result>(
  [
    ...ingredients.map((i): Result => ({ type: 'ingredient', item: i })),
    ...concerns.map(   (c): Result => ({ type: 'concern',    item: c })),
  ],
  {
    keys: [
      { name: 'item.nameJa',  weight: 2 },
      { name: 'item.nameEn',  weight: 1.5 },
      { name: 'item.tagline', weight: 1 },
    ],
    threshold: 0.4,
    minMatchCharLength: 1,
  }
)

const SUGGESTIONS = [
  { label: 'レチノール',       isNew: false },
  { label: 'トラネキサム酸',   isNew: false },
  { label: 'タウリン',         isNew: true  },
  { label: 'フィセチン',       isNew: true  },
  { label: 'シミ',             isNew: false },
  { label: '疲れやすい',       isNew: false },
]

export function HeroSearch() {
  const [query,   setQuery]   = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [active,  setActive]  = useState(0)
  const [focused, setFocused] = useState(false)
  const inputRef  = useRef<HTMLInputElement>(null)
  const router    = useRouter()
  const open = focused

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    setResults(fuse.search(query).slice(0, 6).map(r => r.item))
    setActive(0)
  }, [query])

  const go = useCallback((r: Result) => {
    const href = r.type === 'ingredient'
      ? `/ingredients/${r.item.slug}`
      : `/concerns/${r.item.slug}`
    router.push(href)
    setFocused(false)
    setQuery('')
  }, [router])

  useEffect(() => {
    if (!focused) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setFocused(false); inputRef.current?.blur() }
      if (e.key === 'ArrowDown') { setActive(a => Math.min(a + 1, results.length - 1)); e.preventDefault() }
      if (e.key === 'ArrowUp')   { setActive(a => Math.max(a - 1, 0)); e.preventDefault() }
      if (e.key === 'Enter' && results[active]) go(results[active])
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [focused, results, active, go])

  return (
    <div className="relative">
      {/* Input */}
      <div className={`flex items-center gap-3 bg-card border rounded-2xl px-4 py-3.5
        transition-all duration-200 shadow-sm
        ${focused ? 'border-accent shadow-accent/10 shadow-lg' : 'border-border hover:border-accent/40'}`}>
        <Search className={`w-4.5 h-4.5 flex-shrink-0 transition-colors
          ${focused ? 'text-accent' : 'text-muted-foreground'}`} />
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="成分名・悩みを検索（例：レチノール、シミ）"
          className="flex-1 text-[15px] bg-transparent outline-none text-foreground
            placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border
          rounded-2xl shadow-xl overflow-hidden z-50">

          {/* Results */}
          {results.length > 0 ? (
            <ul className="py-2">
              {results.map((r, i) => (
                <li key={`${r.type}-${r.item.slug}`}>
                  <button
                    onMouseDown={() => go(r)}
                    onMouseEnter={() => setActive(i)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left
                      ${i === active ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
                  >
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md flex-shrink-0
                      ${r.type === 'ingredient' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'}`}>
                      {r.type === 'ingredient' ? '成分' : '悩み'}
                    </span>
                    <span className="text-[14px] font-medium text-foreground flex-1 text-left truncate">
                      {r.item.nameJa}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          ) : query ? (
            <p className="px-4 py-5 text-[13px] text-muted-foreground text-center">
              「{query}」に一致する成分・悩みはありません
            </p>
          ) : (
            <div className="p-4">
              <p className="text-[11px] text-muted-foreground/60 uppercase tracking-wider
                font-medium mb-3">
                よく検索される成分
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s.label}
                    onMouseDown={() => setQuery(s.label)}
                    className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground
                      bg-secondary border border-border rounded-full px-3 py-1.5
                      hover:border-accent/50 hover:text-accent transition-colors"
                  >
                    {s.label}
                    {s.isNew && (
                      <span className="text-[9px] font-bold bg-violet-100 text-violet-700
                        rounded px-1 py-0.5 leading-none">NEW</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
