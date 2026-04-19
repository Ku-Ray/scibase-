'use client'

import { useEffect, useRef, useState } from 'react'

export interface TocSection {
  id: string
  label: string
}

interface Props {
  sections: TocSection[]
}

export function TableOfContents({ sections }: Props) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? '')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current?.disconnect()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // 画面上に入ったセクションのうち最も上のものをアクティブにする
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
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
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
