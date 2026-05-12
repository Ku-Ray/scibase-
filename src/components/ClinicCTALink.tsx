'use client'

import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { trackClinicCtaClick } from '@/lib/analytics'

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel' | 'onClick'> {
  href: string
  ctaId: string
  clinicName: string
  concernSlug: string
  typeName?: string
  children: ReactNode
}

/**
 * 悩みガイド clinicCTAByType のリンクラッパー。
 * クリックで click_clinic_cta を発火する（CV診断ファネル 補助指標）。
 */
export function ClinicCTALink({
  href,
  ctaId,
  clinicName,
  concernSlug,
  typeName,
  children,
  ...rest
}: Props) {
  const handleClick = () => {
    trackClinicCtaClick({ ctaId, clinicName, concernSlug, typeName })
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener"
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  )
}
