'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { trackAppendixSectionView, type AppendixSectionType } from '@/lib/analytics'

interface Props {
  sectionType: AppendixSectionType
  slug: string
  id?: string
  className?: string
  children: ReactNode
}

/**
 * 記事 appendix セクション視認トラッカー。
 * IntersectionObserver で threshold=0.3・1回だけ view_appendix_section を発火する。
 * [[PRODUCT:]]/[[INGREDIENT:]] が埋め込まれたセクションへの到達率（ステージ3 補助指標）を取得する。
 */
export function AppendixSectionTracker({
  sectionType,
  slug,
  id,
  className,
  children,
}: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const fired = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !fired.current) {
            fired.current = true
            trackAppendixSectionView({ sectionType, slug })
            observer.disconnect()
          }
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [sectionType, slug])

  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  )
}
