import { ExternalLink } from 'lucide-react'
import type { Ingredient, Product } from '@/lib/types'
import { OutboundProductLink } from '@/components/OutboundProductLink'
import { CardViewTracker } from '@/components/product/CardViewTracker'

/**
 * 成分ページ中段の slim 製品CTA（軸A3・視認性）。
 *
 * 実測：商品オファーカードは長い成分ページの最下部（〜1400行）にあり、視認率17%・
 * セッション625中104しか到達していない。選び方ガイド記事を持たない成分でも、中段で
 * 「当サイト評価1位」の製品への購入導線を1つ確保し、最下部カードを待たず収益化する。
 * 中立トーン：煽り無し・評価は当サイト独自基準・PR表記必須・click は OutboundProductLink で計測。
 * 視認は CardViewTracker（position='middle'・card_id はクリック側 productOfferCardId と同一文字列）で
 * 計測し、FV→中段→最下部（position='top'）のスクロール中間点を GA4 で突合可能にする（T4-2）。
 * ※最下部カード到達率の基準線は position='top' のみで継続比較する — 'middle' を総数に混ぜない。
 */
export function IngredientQuickBuy({ ing, product }: { ing: Ingredient; product: Product }) {
  const cost1d = product.monthlyCostJpy != null ? Math.round(product.monthlyCostJpy / 30) : null

  return (
    <section className="mb-10">
      <CardViewTracker
        cardId={`${ing.slug}__quickbuy`}
        ingredientSlug={ing.slug}
        position="middle"
      >
        <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4">
          {product.imageUrl ? (
            <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-card border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.imageUrl}
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-contain"
              />
            </div>
          ) : null}
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-emerald-700">当サイト評価1位</p>
            <p className="text-[13px] font-semibold text-foreground line-clamp-1 leading-snug">
              {product.name}
            </p>
            <p className="text-[12px] text-muted-foreground tabular-nums mt-0.5">
              {cost1d != null
                ? `¥${cost1d.toLocaleString()}/日・月¥${product.monthlyCostJpy?.toLocaleString()}`
                : `¥${product.priceJpy.toLocaleString()}〜`}
            </p>
          </div>
          <OutboundProductLink
            href={product.url}
            platform={product.platform}
            ingredientSlug={ing.slug}
            productRank={product.rank}
            aspProgram={product.aspProgram}
            aspId={product.aspId}
            commissionRateBand={product.commissionRateBand}
            productOfferCardId={`${ing.slug}__quickbuy`}
            productName={product.name}
            priceJpy={product.priceJpy}
            className="inline-flex items-center justify-center gap-1.5 text-[13px] font-semibold rounded-xl px-4 h-11 bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex-shrink-0"
          >
            詳細を見る
            <ExternalLink className="w-3.5 h-3.5" />
          </OutboundProductLink>
        </div>
      </CardViewTracker>
      <p className="text-[10px] text-muted-foreground/80 mt-1.5">
        ※アフィリエイトリンクを含みます。評価は当サイト独自基準（論文整合・第三者検査等）によるものです。
      </p>
    </section>
  )
}
