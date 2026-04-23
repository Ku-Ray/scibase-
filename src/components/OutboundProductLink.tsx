'use client'

import type { AnchorHTMLAttributes, ReactNode } from 'react'

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
  children: ReactNode
}

export function OutboundProductLink({
  href,
  platform,
  ingredientSlug,
  productRank,
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
