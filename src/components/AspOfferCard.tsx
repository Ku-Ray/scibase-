import { ExternalLink, Check } from 'lucide-react'
import type { AspOffer } from '@/lib/types'

/**
 * ASP サービス（検査キット等・data.ts 成分でない外部 ASP 商品）用のカード。
 * 本文の [[ASPCARD:id]] トークンから article.aspOffers[] を引いて描画する。
 * 成分の ProductOfferCard と視覚的に揃え（border rounded-2xl bg-card・accent 強調・emerald CTA）、
 * 検査キット/サービスでも「サプリと同様のカード」で訴求できるようにする。
 */
export function AspOfferCard({ offer }: { offer: AspOffer }) {
  return (
    <div
      className={`my-6 not-prose rounded-2xl overflow-hidden bg-card ${
        offer.highlight ? 'border-2 border-accent/60 shadow-sm' : 'border border-border'
      }`}
    >
      <div className="px-5 pt-4 pb-5 sm:px-6">
        <div className="flex items-center justify-between gap-2 mb-2">
          {offer.badge ? (
            <span
              className={`inline-flex items-center gap-1 text-[12px] font-bold rounded-full px-2.5 py-1 ${
                offer.highlight ? 'bg-accent/15 text-accent' : 'bg-secondary text-foreground/70'
              }`}
            >
              {offer.highlight ? '🥇 ' : ''}
              {offer.badge}
            </span>
          ) : (
            <span />
          )}
          <span className="text-[11px] font-medium text-foreground/40 flex-shrink-0">PR</span>
        </div>

        <h4 className="text-[18px] sm:text-[19px] font-bold text-foreground leading-snug">{offer.name}</h4>

        {offer.tagline && (
          <p className="text-[13px] text-foreground/70 mt-1.5 leading-relaxed">{offer.tagline}</p>
        )}

        {offer.points.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {offer.points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-[14px] text-foreground/90 leading-relaxed">
                <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" strokeWidth={2.5} aria-hidden="true" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        )}

        {offer.priceNote && (
          <p className="text-[12px] text-foreground/55 mt-3 tabular-nums">{offer.priceNote}</p>
        )}

        <a
          href={offer.url}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 text-[15px] font-bold text-white
            bg-emerald-600 hover:bg-emerald-700 rounded-xl px-6 py-4 shadow-sm transition-colors no-underline"
        >
          <span className="flex flex-col items-center text-center leading-snug">
            <span>{offer.ctaLabel}</span>
            {offer.ctaSub && (
              <span className="text-[12px] font-semibold opacity-90 tabular-nums">{offer.ctaSub}</span>
            )}
          </span>
          <ExternalLink className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
