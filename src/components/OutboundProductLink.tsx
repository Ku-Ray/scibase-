'use client'

import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { trackProductOfferCardClick } from '@/lib/analytics'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'> {
  href: string
  platform: 'iherb' | 'amazon' | 'cosme'
  ingredientSlug?: string
  productRank?: 1 | 2 | 3
  /** ASP事業者識別子（a8/moshimo/afb/amazon-direct等）。直URLの場合は未設定 */
  aspProgram?: string
  /** ASP案件識別子。GA4 asp_id ディメンション値 */
  aspId?: string
  /** 料率帯（'<5%' / '5-10%' / '10-15%' / '15-20%' / '>20%'）。実料率は規約上の第三者開示NGリスク回避のため帯化 */
  commissionRateBand?: string
  /** 商品オファーカード経由クリック時に click_product_offer_card を併発火する（CV診断ファネル ステージ4） */
  productOfferCardId?: string
  productName?: string
  priceJpy?: number
  children: ReactNode
}

export function OutboundProductLink({
  href,
  platform,
  ingredientSlug,
  productRank,
  aspProgram,
  aspId,
  commissionRateBand,
  productOfferCardId,
  productName,
  priceJpy,
  onClick,
  children,
  ...rest
}: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'click_outbound_product', {
          link_url: href,
          platform,
          ingredient_slug: ingredientSlug,
          product_rank: productRank,
          asp_program: aspProgram,
          asp_id: aspId,
          commission_rate_band: commissionRateBand,
        })
      }
      if (productOfferCardId && productName) {
        trackProductOfferCardClick({
          cardId: productOfferCardId,
          productName,
          aspId,
          priceJpy,
          ingredientSlug,
        })
      }
    } catch {}
    onClick?.(e)
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  )
}
