'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { trackProductOfferCardView, type ProductOfferCardPosition } from '@/lib/analytics'

interface Props {
  cardId: string
  ingredientSlug: string
  position?: ProductOfferCardPosition
  children: ReactNode
}

/**
 * 商品オファーカード視認トラッカー。
 * IntersectionObserver で threshold=0.5・1回だけ view_product_offer_card を発火する。
 * spec_asp_cv_diagnosis_20260509.md §2-2 ステージ3 のファネル指標を取得する。
 */
export function CardViewTracker({ cardId, ingredientSlug, position, children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const fired = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio >= 0.5 &&
            !fired.current
          ) {
            fired.current = true
            trackProductOfferCardView({ cardId, ingredientSlug, position })
            observer.disconnect()
          }
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [cardId, ingredientSlug, position])

  return <div ref={ref}>{children}</div>
}
