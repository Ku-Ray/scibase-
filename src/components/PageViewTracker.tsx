'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

interface Props {
  eventName: string
  params?: Record<string, string | number | boolean | undefined>
}

/**
 * クライアントマウント時に1回だけ GA4 カスタムイベントを発火する。
 * Server Component で配置可能（このファイル自体が 'use client'）。
 */
export function PageViewTracker({ eventName, params }: Props) {
  useEffect(() => {
    trackEvent(eventName, params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}
