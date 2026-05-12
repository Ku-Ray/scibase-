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

/* ============================================================================
 * ASP CV診断（2026-05-12 ship）— 5イベント型付きヘルパー
 * spec: knowledge/scibase_roadmap/spec_asp_cv_diagnosis_20260509.md §2-2
 * brief: knowledge/scibase_roadmap/brief_asp_cv_diagnosis_remediation_20260511.md §2
 * ========================================================================== */

export type ProductOfferCardPosition = 'top' | 'middle' | 'bottom' | 'inline' | 'compact'
export type AppendixSectionType = 'ingredient' | 'product' | 'general'
export type TestKitPlacement = 'pattern_a' | 'pattern_b'

/** ステージ3: 商品オファーカード視認（IntersectionObserver threshold=0.5） */
export function trackProductOfferCardView(p: {
  cardId: string
  ingredientSlug: string
  position?: ProductOfferCardPosition
}): void {
  trackEvent('view_product_offer_card', {
    card_id: p.cardId,
    ingredient_slug: p.ingredientSlug,
    position: p.position,
  })
}

/** ステージ4: 商品オファーカードCTAクリック（outbound と併発火） */
export function trackProductOfferCardClick(p: {
  cardId: string
  productName: string
  aspId?: string
  priceJpy?: number
  ingredientSlug?: string
}): void {
  trackEvent('click_product_offer_card', {
    card_id: p.cardId,
    product_name: p.productName,
    asp_id: p.aspId,
    price_jpy: p.priceJpy,
    ingredient_slug: p.ingredientSlug,
  })
}

/** Appendixセクション視認（IntersectionObserver threshold=0.3） */
export function trackAppendixSectionView(p: {
  sectionType: AppendixSectionType
  slug: string
}): void {
  trackEvent('view_appendix_section', {
    section_type: p.sectionType,
    slug: p.slug,
  })
}

/** 高単価アフィ クリニックCTAクリック（悩みガイド clinicCTAByType） */
export function trackClinicCtaClick(p: {
  ctaId: string
  clinicName: string
  concernSlug: string
  typeName?: string
}): void {
  trackEvent('click_clinic_cta', {
    cta_id: p.ctaId,
    clinic_name: p.clinicName,
    concern_slug: p.concernSlug,
    type_name: p.typeName,
  })
}

/** 検査キットCTAクリック（Pattern A=成分ページ / Pattern B=悩みガイド） */
export function trackTestKitCtaClick(p: {
  placement: TestKitPlacement
  testType: string
  productName?: string
  ingredientSlug?: string
  concernSlug?: string
  typeName?: string
}): void {
  trackEvent('click_testkit_cta', {
    placement: p.placement,
    test_type: p.testType,
    product_name: p.productName,
    ingredient_slug: p.ingredientSlug,
    concern_slug: p.concernSlug,
    type_name: p.typeName,
  })
}
