'use client'

import { useEffect, useRef, useState } from 'react'

export interface TocSection {
  id: string
  label: string
}

interface Props {
  sections: TocSection[]
  variant?: 'mobile' | 'desktop'
}

export function TableOfContents({ sections, variant = 'desktop' }: Props) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? '')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current?.disconnect()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: 0 }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [sections])

  const handleJump = (id: string, closeDetails?: () => void) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    closeDetails?.()
  }

  if (variant === 'mobile') {
    return (
      <details className="lg:hidden mb-6 border border-border rounded-xl bg-card group">
        <summary className="px-4 py-3 cursor-pointer font-medium text-[13px] text-foreground
          flex items-center justify-between list-none [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2">
            <span aria-hidden="true">📑</span>
            <span>目次（{sections.length}項目）</span>
          </span>
          <span className="text-muted-foreground text-[11px] group-open:rotate-180 transition-transform">▾</span>
        </summary>
        <nav className="px-4 pb-3 pt-1 space-y-0.5 border-t border-border">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={handleJump(id)}
              className={`block text-[13px] py-2 pl-3 rounded-md transition-colors leading-snug
                border-l-2
                ${active === id
                  ? 'border-accent text-accent font-medium bg-accent/5'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
            >
              {label}
            </a>
          ))}
        </nav>
      </details>
    )
  }

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20 w-52">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">
          目次
        </p>
        <nav className="space-y-0.5">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={handleJump(id)}
              className={`block text-[12px] py-1.5 pl-3 rounded-md transition-all duration-150 leading-snug
                border-l-2
                ${active === id
                  ? 'border-accent text-accent font-medium bg-accent/5'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}
