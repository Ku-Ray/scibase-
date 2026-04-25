'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, ArrowRight } from 'lucide-react'
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
      { name: 'item.nameJa',      weight: 2 },
      { name: 'item.nameEn',      weight: 1.5 },
      { name: 'item.aliases',     weight: 1.8 },
      { name: 'item.tagline',     weight: 1 },
      { name: 'item.description', weight: 0.5 },
    ],
    threshold: 0.4,
    minMatchCharLength: 1,
    ignoreLocation: true,
  }
)

interface Props {
  open: boolean
  onClose: () => void
}

export function SearchModal({ open, onClose }: Props) {
  const [query, setQuery]     = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [active, setActive]   = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router   = useRouter()

  useEffect(() => {
    if (open) {
      setQuery('')
      setResults([])
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const r = fuse.search(query).slice(0, 8).map(r => r.item)
    setResults(r)
    setActive(0)
  }, [query])

  const go = useCallback((r: Result) => {
    const href = r.type === 'ingredient'
      ? `/ingredients/${r.item.slug}`
      : `/concerns/${r.item.slug}`
    router.push(href)
    onClose()
  }, [router, onClose])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowDown') { setActive(a => Math.min(a + 1, results.length - 1)); e.preventDefault() }
      if (e.key === 'ArrowUp')   { setActive(a => Math.max(a - 1, 0));                  e.preventDefault() }
      if (e.key === 'Enter' && results[active]) go(results[active])
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, results, active, go, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
          <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="成分名・悩みで検索（例：レチノール、シミ）"
            className="flex-1 text-[15px] bg-transparent outline-none text-foreground
              placeholder:text-muted-foreground/60"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul className="max-h-[400px] overflow-y-auto py-2">
            {results.map((r, i) => (
              <li key={`${r.type}-${r.item.slug}`}>
                <button
                  onClick={() => go(r)}
                  onMouseEnter={() => setActive(i)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
                    ${i === active ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
                >
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md flex-shrink-0
                    ${r.type === 'ingredient'
                      ? 'bg-accent/10 text-accent'
                      : 'bg-primary/10 text-primary'}`}>
                    {r.type === 'ingredient' ? '成分' : '悩み'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-foreground truncate">
                      {r.item.nameJa}
                    </p>
                    {'tagline' in r.item && (
                      <p className="text-[12px] text-muted-foreground truncate mt-0.5">
                        {r.item.tagline}
                      </p>
                    )}
                    {'description' in r.item && !('tagline' in r.item) && (
                      <p className="text-[12px] text-muted-foreground truncate mt-0.5">
                        {r.item.description}
                      </p>
                    )}
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {query && results.length === 0 && (
          <div className="px-4 py-5">
            <p className="text-[13px] text-muted-foreground mb-3">
              「{query}」に一致する成分・悩みは見つかりませんでした
            </p>
            <p className="text-[11px] text-muted-foreground/70 uppercase tracking-wider font-medium mb-2">
              悩みカテゴリから探す
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {concerns.slice(0, 8).map(c => (
                <button
                  key={c.slug}
                  onClick={() => { router.push(`/concerns/${c.slug}`); onClose() }}
                  className="text-[12px] text-muted-foreground bg-secondary border border-border
                    rounded-full px-2.5 py-1 hover:border-primary/50 hover:text-primary transition-colors"
                >
                  {c.emoji} {c.nameJa}
                </button>
              ))}
            </div>
            <button
              onClick={() => { router.push('/concerns'); onClose() }}
              className="text-[12px] text-primary hover:underline"
            >
              すべての悩みカテゴリを見る →
            </button>
          </div>
        )}

        {!query && (
          <div className="px-4 py-4">
            <p className="text-[11px] text-muted-foreground/60 mb-3 uppercase tracking-wider font-medium">
              よく検索される成分
            </p>
            <div className="flex flex-wrap gap-2">
              {['レチノール', 'ナイアシンアミド', 'セラミド', 'ビタミンC', 'アゼライン酸', 'NMN'].map(q => (
                <button
                  key={q}
                  onClick={() => setQuery(q)}
                  className="text-[13px] text-muted-foreground bg-secondary border border-border
                    rounded-full px-3 py-1.5 hover:border-accent/50 hover:text-accent transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-border px-4 py-2.5 flex items-center gap-3 text-[11px] text-muted-foreground/50">
          <span>↑↓ 移動</span>
          <span>↵ 選択</span>
          <span>Esc 閉じる</span>
        </div>
      </div>
    </div>
  )
}
