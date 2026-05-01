/**
 * GA4 イベント計測の共通 helper。
 * window.gtag が無い環境（SSR・拡張ブロック・dev mode）では silent fail。
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  try {
    if (typeof window === 'undefined') return
    if (typeof window.gtag !== 'function') return
    window.gtag('event', eventName, params ?? {})
  } catch {
    /* silent fail */
  }
}
