'use client'

import { useEffect, useRef } from 'react'
import { FlaskConical, ExternalLink } from 'lucide-react'
import type { IngredientTestKitCTA, TestKitProduct } from '@/lib/types'
import { trackEvent } from '@/lib/analytics'

const DEFAULT_DISCLAIMER =
  '※検査結果は医療診断ではありません。心配な数値・症状は医師に相談してください。\n※PR：当サイトはアフィリエイトプログラムに参加しています。'

const TEST_TYPE_LABEL: Record<TestKitProduct['testType'], string> = {
  dna: 'DNA検査',
  gut: '腸内フローラ検査',
  nutrient: '栄養素検査',
  hormone: 'ホルモン検査',
  allergy: 'アレルギー検査',
}

interface Props {
  cta: IngredientTestKitCTA
  ingredientSlug: string
}

/**
 * Pattern A 成分ページ用 検査キットCTA。
 * ProductOfferCard 手前に配置し「測ってから選ぶ」を購買意図直前で訴求。
 * 視覚は青系（#EFF6FF）で商品オファーカード（rose系）と差別化。
 */
export function IngredientTestKitCTACard({ cta, ingredientSlug }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const fired = useRef(false)

  // view_testkit_section: 10秒以上セクションが画面内に留まったら発火
  useEffect(() => {
    if (typeof window === 'undefined') return
    const el = sectionRef.current
    if (!el) return

    let dwellTimer: ReturnType<typeof setTimeout> | null = null
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !fired.current) {
            dwellTimer = setTimeout(() => {
              if (!fired.current) {
                fired.current = true
                trackEvent('view_testkit_section', {
                  ingredient_slug: ingredientSlug,
                  placement: 'pattern_a',
                })
              }
            }, 10000)
          } else if (!entry.isIntersecting && dwellTimer) {
            clearTimeout(dwellTimer)
            dwellTimer = null
          }
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      if (dwellTimer) clearTimeout(dwellTimer)
    }
  }, [ingredientSlug])

  const handleProductClick = (product: TestKitProduct) => {
    trackEvent('click_testkit_cta', {
      ingredient_slug: ingredientSlug,
      test_type: product.testType,
      product_name: product.name,
      placement: 'pattern_a',
    })
    trackEvent('outbound_testkit_link', {
      asp_url: product.url,
      test_type: product.testType,
      product_name: product.name,
      placement: 'pattern_a',
    })
  }

  const disclaimerLines = (cta.medicalDisclaimer ?? DEFAULT_DISCLAIMER).split('\n')

  return (
    <section
      ref={sectionRef}
      className="mb-6 rounded-2xl border border-blue-200 bg-blue-50/60 px-5 py-5"
      aria-label="検査キットのご案内"
    >
      <div className="flex items-start gap-2.5 mb-2">
        <span className="flex-shrink-0 mt-0.5 inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-700">
          <FlaskConical className="w-4 h-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold tracking-wider text-blue-700/80 uppercase">
            測ってから選ぶ
          </p>
          <h3 className="font-semibold text-[16px] text-foreground leading-snug mt-0.5">
            {cta.headline}
          </h3>
        </div>
      </div>

      <p className="text-[13px] text-foreground/80 leading-relaxed mb-4">
        {cta.body}
      </p>

      <div className="flex flex-col gap-3">
        {cta.products.map((product) => {
          const isPending = product.url === '#asp-pending'
          return (
            <div
              key={product.brand + product.name}
              className="rounded-xl border border-blue-100 bg-card px-4 py-3.5"
            >
              <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                    <span className="text-[10px] font-semibold text-blue-700 bg-blue-100/80 rounded px-1.5 py-0.5 whitespace-nowrap">
                      {TEST_TYPE_LABEL[product.testType]}
                    </span>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {product.sampleType}・結果{product.resultDays}日
                    </span>
                    {product.badge && (
                      <span className="text-[10px] font-semibold bg-orange-100 text-orange-800 border border-orange-200 rounded px-1.5 py-0.5 whitespace-nowrap">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground">{product.brand}</p>
                  <p className="text-[14px] font-semibold text-foreground leading-snug">
                    {product.name}
                  </p>
                </div>
                <p className="text-[16px] font-semibold text-foreground tabular-nums whitespace-nowrap">
                  ¥{product.priceJpy.toLocaleString()}
                </p>
              </div>

              <p className="text-[12px] text-muted-foreground leading-relaxed mb-3">
                {product.whyJa}
              </p>

              {isPending ? (
                <button
                  type="button"
                  disabled
                  className="flex items-center justify-center gap-1.5 text-[13px] font-semibold rounded-xl px-4 h-11 w-full bg-muted text-muted-foreground cursor-not-allowed"
                >
                  ASP申請中
                </button>
              ) : (
                <a
                  href={product.url}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  onClick={() => handleProductClick(product)}
                  className="flex items-center justify-center gap-1.5 text-[13px] font-semibold rounded-xl px-4 h-11 w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  検査キットの詳細を見る
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {product.privacyPolicyUrl && (
                <p className="text-[10px] text-muted-foreground/80 mt-2 text-center">
                  <a
                    href={product.privacyPolicyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-foreground"
                  >
                    個人情報・遺伝情報の取扱方針
                  </a>
                </p>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-blue-100">
        {disclaimerLines.map((line, i) => (
          <p key={i} className="text-[10px] text-muted-foreground/90 leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    </section>
  )
}
