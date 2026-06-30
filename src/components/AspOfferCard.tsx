import { ExternalLink, Check, Crown } from 'lucide-react'
import type { AspOffer } from '@/lib/types'
import { OutboundProductLink } from './OutboundProductLink'

/* 現状の aspOffers は全て A8.net 案件。将来別ASP（moshimo/afb等）を足す場合はここを分岐。
 * rel=sponsored を保つため、必ず OutboundProductLink の sponsored 対象 program を渡すこと。 */
const ASP_PROGRAM = 'a8'

/**
 * ASP サービス（検査キット等・data.ts 成分でない外部 ASP 商品）用のカード。
 * 本文の [[ASPCARD:id]] トークンから article.aspOffers[] を引いて描画する。
 * 成分の ProductOfferCard と視覚的に揃え（border rounded-2xl bg-card・emerald CTA）、
 * highlight=true（Our pick）は accent リボン+太枠+大きめ、false（Runner-up）はコンパクトで
 * 「メリハリ（決定的な第一候補と、検討用の次点）」を視覚化する。
 * バナー画像（offer.imageUrl）は ASP の表示回数計測を保つため next/image でなく <img> で描画。
 */
export function AspOfferCard({ offer }: { offer: AspOffer }) {
  const hi = offer.highlight

  return (
    <div
      className={`my-6 not-prose rounded-2xl overflow-hidden bg-card ${
        hi ? 'border-2 border-accent/60 shadow-md' : 'border border-border shadow-sm'
      }`}
    >
      {/* Our pick：上部 accent リボン（メリハリの核） */}
      {hi && (
        <div className="flex items-center justify-between bg-accent/10 px-5 py-2 sm:px-6 border-b border-accent/20">
          <span className="flex items-center gap-1.5">
            <Crown className="w-4 h-4 text-accent" strokeWidth={2.5} aria-hidden="true" />
            <span className="text-[12.5px] font-bold text-accent tracking-wide">{offer.badge ?? 'Our pick'}</span>
          </span>
          <span className="text-[11px] font-semibold text-accent/60">PR</span>
        </div>
      )}

      <div className={`px-5 sm:px-6 ${hi ? 'pt-4 pb-5' : 'pt-3.5 pb-4'}`}>
        {/* Runner-up：バッジ + PR 行（highlight は上のリボンに集約） */}
        {!hi && (
          <div className="flex items-center justify-between gap-2 mb-2.5">
            {offer.badge ? (
              <span className="inline-flex items-center gap-1 text-[12px] font-semibold rounded-full px-2.5 py-1 bg-secondary text-foreground/70">
                {offer.badge}
              </span>
            ) : (
              <span />
            )}
            <span className="text-[11px] font-medium text-foreground/40 flex-shrink-0">PR</span>
          </div>
        )}

        {/* バナー画像（クリック可能・トラッキング維持のため <img>） */}
        {offer.imageUrl && (
          <OutboundProductLink
            href={offer.url}
            platform="asp"
            aspProgram={ASP_PROGRAM}
            aspId={offer.id}
            className="block mb-3.5 no-underline"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={offer.imageUrl}
              alt={offer.imageAlt ?? offer.name}
              width={300}
              height={250}
              loading="lazy"
              className={`w-full h-auto mx-auto rounded-xl border border-border ${hi ? 'max-w-[320px]' : 'max-w-[260px]'}`}
            />
          </OutboundProductLink>
        )}

        <h4 className={`font-bold text-foreground leading-snug ${hi ? 'text-[19px] sm:text-[20px]' : 'text-[16px] sm:text-[17px]'}`}>
          {offer.name}
        </h4>

        {offer.tagline && (
          <p className="text-[13px] text-foreground/70 mt-1.5 leading-relaxed">{offer.tagline}</p>
        )}

        {offer.points.length > 0 && (
          <ul className={`mt-3 ${hi ? 'space-y-1.5' : 'space-y-1'}`}>
            {offer.points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-[14px] text-foreground/90 leading-relaxed">
                <Check
                  className={`w-4 h-4 mt-0.5 flex-shrink-0 ${hi ? 'text-accent' : 'text-foreground/40'}`}
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        )}

        {offer.priceNote && (
          <p className="text-[12px] text-foreground/55 mt-3 tabular-nums">{offer.priceNote}</p>
        )}

        <OutboundProductLink
          href={offer.url}
          platform="asp"
          aspProgram={ASP_PROGRAM}
          aspId={offer.id}
          className={`mt-4 flex w-full items-center justify-center gap-2 font-bold text-white bg-emerald-600
            hover:bg-emerald-700 rounded-xl shadow-sm transition-colors no-underline ${
              hi ? 'text-[15px] px-6 py-4' : 'text-[14px] px-5 py-3.5'
            }`}
        >
          <span className="flex flex-col items-center text-center leading-snug">
            <span>{offer.ctaLabel}</span>
            {offer.ctaSub && (
              <span className="text-[12px] font-semibold opacity-90 tabular-nums">{offer.ctaSub}</span>
            )}
          </span>
          <ExternalLink className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
        </OutboundProductLink>
      </div>
    </div>
  )
}
