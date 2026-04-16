'use client'

import { useState, useEffect } from 'react'
import { Microscope, Check } from 'lucide-react'
import Link from 'next/link'

const STORAGE_KEY = 'scibase_analyzer_slugs'

interface Props {
  slug: string
  variant?: 'default' | 'compact'
}

export function AddToAnalyzerButton({ slug, variant = 'default' }: Props) {
  const [added, setAdded] = useState(false)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as string[]
      setAdded(saved.includes(slug))
    } catch {}
  }, [slug])

  const toggle = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as string[]
      const isAdded = saved.includes(slug)
      const next = isAdded ? saved.filter(s => s !== slug) : [...saved, slug]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      setAdded(!isAdded)
      if (!isAdded) {
        setAnimating(true)
        setTimeout(() => setAnimating(false), 600)
      }
    } catch {}
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={toggle}
        title={added ? '診断から外す' : '診断に追加する'}
        className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border
          transition-all duration-200
          ${added
            ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
            : 'border-border text-muted-foreground hover:border-accent hover:text-accent'
          }`}
      >
        {added ? <Check className="w-4 h-4" /> : <Microscope className="w-4 h-4" />}
      </button>
    )
  }

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-2 text-[13px] font-medium rounded-xl
        px-4 py-2.5 border transition-all duration-200
        ${added
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
          : 'bg-card text-muted-foreground border-border hover:border-accent hover:text-accent'
        } ${animating ? 'scale-105' : ''}`}
    >
      {added
        ? <><Check className="w-4 h-4" />診断に追加済み</>
        : <><Microscope className="w-4 h-4" />診断に追加する</>
      }
    </button>
  )
}

/* 診断ページへのリンク付きバナー（追加後に表示） */
export function AnalyzerBanner({ count }: { count: number }) {
  if (count === 0) return null
  return (
    <Link href="/analyzer"
      className="flex items-center justify-between gap-3
        bg-accent/8 border border-accent/20 rounded-xl px-4 py-3
        hover:bg-accent/12 transition-colors group">
      <div className="flex items-center gap-2">
        <Microscope className="w-4 h-4 text-accent" />
        <span className="text-[13px] font-medium text-foreground">
          {count}成分を診断中
        </span>
      </div>
      <span className="text-[12px] text-accent group-hover:underline">
        診断結果を見る →
      </span>
    </Link>
  )
}
