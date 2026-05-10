import { ExternalLink } from 'lucide-react'
import type { Ingredient, Product } from '@/lib/types'
import { OutboundProductLink } from '@/components/OutboundProductLink'
import { RichInline } from '@/components/RichText'
import { scoreProduct, AXIS_LABEL, axisDisplayOrder, type AxisLeader, type ProductScore, type ScoreAxis } from '@/lib/productScore'
import { ScoreBar } from './ScoreBar'
import { EffectiveDoseBadge } from './EffectiveDoseBadge'
import { AxisLeaderBadges } from './AxisLeaderBadges'
import { ProsConsBox } from './ProsConsBox'
import { SpecTable } from './SpecTable'
import { SafetyDisclosureCollapse } from './SafetyDisclosureCollapse'

const platformLabel: Record<Product['platform'], string> = {
  iherb: 'iHerb',
  amazon: 'Amazon',
  cosme: '公式',
}

/**
 * v5: CTA カラーは emerald 濃淡で統一（mybest 風・mall identity を文字で識別）。
 * CTA が増えても色ノイズを出さず「次にクリックする場所」を一目で示す。
 */
const PRIMARY_CTA = 'bg-emerald-600 text-white hover:bg-emerald-700'
const SECONDARY_CTA = 'bg-card border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50'

interface SubPlatformLink {
  platform: 'iherb' | 'amazon' | 'cosme'
  searchUrl: string
  label?: string
  /** 表示価格（既知の場合のみ・mybest 風並列価格） */
  priceLabel?: string
}

interface Props {
  product: Product
  ingredient: Ingredient
  variant: 'hero' | 'secondary' | 'article-compact'
  axisLeaders?: AxisLeader[]
  showOverallRank?: boolean
  subPlatformLinks?: SubPlatformLink[]
  bestPickReason?: string
}

function formatYen(n: number | undefined | null): string {
  return n == null ? '—' : `¥${n.toLocaleString()}`
}

function dailyCost(monthly: number | undefined): number | null {
  if (monthly == null) return null
  return Math.round(monthly / 30)
}

/** ★スコアの色：4.0以上=赤・3.0-4.0=amber・3未満=foreground（mybest 風アンカリング） */
function scoreColor(total: number): string {
  if (total >= 4.0) return 'text-rose-600'
  if (total >= 3.0) return 'text-amber-600'
  return 'text-foreground'
}

export function ProductOfferCard({
  product,
  ingredient,
  variant,
  axisLeaders = [],
  showOverallRank,
  subPlatformLinks,
  bestPickReason,
}: Props) {
  const score = scoreProduct(product, ingredient)
  const cost1d = dailyCost(product.monthlyCostJpy)
  const isOverallRank1 = showOverallRank ?? variant === 'hero'

  // ───────────── article-compact ─────────────
  if (variant === 'article-compact') {
    return (
      <div className="border-t border-border bg-card px-5 py-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="inline-flex items-center justify-center text-[11px] font-semibold tracking-wider bg-amber-400 text-amber-950 rounded px-1.5 py-0.5 leading-none">
            1位
          </span>
          <AxisLeaderBadges leaders={axisLeaders} productUrl={product.url} maxBadges={2} />
        </div>
        {product.benefitHeading && (
          <p className="text-[13px] text-foreground font-semibold leading-snug mb-2">
            {product.benefitHeading}
          </p>
        )}
        <div className="flex items-start gap-3">
          {product.imageUrl ? (
            <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-card border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.imageUrl}
                alt={product.name}
                width={80}
                height={80}
                loading="lazy"
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground/30 text-[24px] font-semibold">
              {product.brand.slice(0, 1)}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-muted-foreground/80">{product.brand}</p>
            <p className="text-[13px] font-semibold text-foreground line-clamp-2 leading-snug">
              {product.name}
            </p>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <EffectiveDoseBadge
                status={score.effectiveDoseStatus}
                ratio={score.effectiveDoseRatio}
                compact
              />
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-end justify-between gap-3">
          <div>
            {cost1d != null ? (
              <>
                <p className="text-[22px] font-semibold text-rose-600 tabular-nums leading-none">
                  ¥{cost1d.toLocaleString()}<span className="text-[12px] font-normal text-muted-foreground ml-1">/日</span>
                </p>
                <p className="text-[11px] text-muted-foreground tabular-nums mt-0.5">
                  月{formatYen(product.monthlyCostJpy)}・初期{formatYen(product.priceJpy)}〜
                </p>
              </>
            ) : (
              <p className="text-[18px] font-semibold text-foreground tabular-nums">
                {formatYen(product.priceJpy)}<span className="text-[11px] font-normal text-muted-foreground ml-1">〜</span>
              </p>
            )}
          </div>
          <OutboundProductLink
            href={product.url}
            platform={product.platform}
            ingredientSlug={ingredient.slug}
            productRank={product.rank}
            aspProgram={product.aspProgram}
            aspId={product.aspId}
            commissionRateBand={product.commissionRateBand}
            className={`inline-flex items-center justify-center gap-1.5 text-[13px] font-semibold rounded-xl px-4 h-12 min-w-[10rem] transition-colors flex-shrink-0 ${PRIMARY_CTA}`}
          >
            {platformLabel[product.platform]}で詳細を見る
            <ExternalLink className="w-3.5 h-3.5" />
          </OutboundProductLink>
        </div>
        {bestPickReason && (
          <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed">
            <RichInline text={bestPickReason} />
          </p>
        )}
      </div>
    )
  }

  // ───────────── hero (v7・mybest レイアウト) ─────────────
  if (variant === 'hero') {
    return <HeroMybestCard
      product={product}
      ingredient={ingredient}
      score={score}
      cost1d={cost1d}
      isOverallRank1={isOverallRank1}
      axisLeaders={axisLeaders}
      subPlatformLinks={subPlatformLinks}
      bestPickReason={bestPickReason}
    />
  }

  // ───────────── secondary ─────────────
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
      <div className="px-4 py-2 border-b border-border flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold text-muted-foreground">
          {platformLabel[product.platform]}
        </span>
        <AxisLeaderBadges leaders={axisLeaders} productUrl={product.url} maxBadges={2} />
      </div>
      <div className="p-4 flex flex-col gap-3 flex-1">
        {product.imageUrl ? (
          <div className="mx-auto w-32 h-32 rounded-lg overflow-hidden bg-card border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="mx-auto w-32 h-32 rounded-lg bg-secondary border border-border flex flex-col items-center justify-center text-muted-foreground/30 gap-1">
            <span className="text-[28px] font-semibold">{product.brand.slice(0, 1)}</span>
            <span className="text-[9px]">画像準備中</span>
          </div>
        )}
        <div>
          <p className="text-[10px] text-muted-foreground/70">{product.brand}</p>
          <p className="font-semibold text-[14px] text-foreground leading-snug mt-0.5 line-clamp-3">
            {product.name}
          </p>
        </div>

        <p className={`font-semibold tabular-nums ${scoreColor(score.recommendationScore)}`}>
          <span className="text-[18px]">★{score.recommendationScore.toFixed(2)}</span>
          <span className="text-[10px] text-muted-foreground ml-1">/ 5.0</span>
        </p>

        <div className="flex flex-wrap gap-1">
          <EffectiveDoseBadge
            status={score.effectiveDoseStatus}
            ratio={score.effectiveDoseRatio}
            compact
          />
          {(product.heavyMetalTested || product.thirdPartyTested) && (
            <span className="text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-md px-1.5 py-0.5 whitespace-nowrap">
              ✓ 第三者検査
            </span>
          )}
        </div>

        <div className="space-y-1">
          <ScoreBar label="論文整合" score={score.evidenceScore} compact />
          <ScoreBar label="第三者" score={score.thirdPartyScore} compact />
          <ScoreBar label="コスパ" score={score.costScore} compact />
        </div>

        <div className="mt-auto pt-2">
          {cost1d != null ? (
            <>
              <p className="text-[20px] font-semibold text-rose-600 tabular-nums leading-none">
                ¥{cost1d.toLocaleString()}<span className="text-[11px] font-normal text-muted-foreground ml-1">/日</span>
              </p>
              <p className="text-[11px] text-muted-foreground tabular-nums mt-0.5">
                月{formatYen(product.monthlyCostJpy)}
              </p>
            </>
          ) : (
            <p className="text-[18px] font-semibold text-foreground tabular-nums">
              {formatYen(product.priceJpy)}<span className="text-[11px] font-normal text-muted-foreground ml-1">〜</span>
            </p>
          )}
        </div>

        <OutboundProductLink
          href={product.url}
          platform={product.platform}
          ingredientSlug={ingredient.slug}
          productRank={product.rank}
          aspProgram={product.aspProgram}
          aspId={product.aspId}
          commissionRateBand={product.commissionRateBand}
          className={`flex items-center justify-center gap-2 text-[13px] font-semibold rounded-xl px-4 h-12 transition-colors w-full ${PRIMARY_CTA}`}
        >
          {platformLabel[product.platform]}で詳細を見る
          <ExternalLink className="w-3.5 h-3.5" />
        </OutboundProductLink>
      </div>
    </div>
  )
}


/* ============================================================================
 * HeroMybestCard — v7 ヒーローカード（mybest レイアウト準拠）
 * ============================================================================
 * - 黄色 1位 スクエアバッジ + 軸別 No.1 王冠バッジ row（横スクロール）
 * - ブランド（小・グレー）+ 商品名（大・bold）
 * - ピンク/桃色「おすすめスコア」box：★大表示 + 軸別スコアテキスト grid
 * - 画像左 + 価格右 の2カラム（モバイル縦積み）
 * - 緑CTAボタン群：iHerb 主モール（実価格）+ 検索 mall（参考）
 * - 補強：Pros/Cons・whoFor・bestPickReason
 * ========================================================================== */

const SCORE_AXIS_DISPLAY: ScoreAxis[] = [
  'evidence', 'thirdParty', 'cost', 'certification', 'shipping', 'purity',
]

interface HeroMybestProps {
  product: Product
  ingredient: Ingredient
  score: ProductScore
  cost1d: number | null
  isOverallRank1: boolean
  axisLeaders: AxisLeader[]
  subPlatformLinks: SubPlatformLink[] | undefined
  bestPickReason: string | undefined
}

function axisDisplayValue(axis: ScoreAxis, score: ProductScore): { value: number | null } {
  switch (axis) {
    case 'evidence': return { value: score.evidenceScore }
    case 'thirdParty': return { value: score.thirdPartyScore }
    case 'cost': return { value: score.costScore }
    case 'certification': return { value: score.certificationScore }
    case 'shipping': return { value: score.shippingScore }
    case 'purity': return { value: score.purityScore }
  }
}

/**
 * 各モールの「安心ポイント」マイクロコピー（CTA 直下に表示）。
 * 田中（初心者）・山田（敏感肌）の最終決断時の不信を解消する。
 * 客観事実のみ・「最高/最強」NG。
 */
const PLATFORM_TRUST_NOTE: Record<Product['platform'], string> = {
  iherb: '海外大手・全商品に分析証明書（COA）公開・40年以上の実績',
  amazon: '国内発送・原則翌日着・返品 30 日保証',
  cosme: '公式直販・正規品保証',
}
const PLATFORM_SEARCH_TRUST_NOTE: Record<Product['platform'], string> = {
  iherb: '海外大手・全商品 COA 公開',
  amazon: '国内発送・即日〜翌日着',
  cosme: '楽天市場：ポイント還元・実店舗保証あり',
}

/** 軸スコア値の色（mybest 風）。4以上=赤・3-4=amber・3未満=灰 */
function axisScoreColor(v: number | null): string {
  if (v == null) return 'text-muted-foreground'
  if (v >= 4) return 'text-rose-600'
  if (v >= 3) return 'text-amber-600'
  return 'text-muted-foreground'
}

/**
 * CTA stack（モール別購入ボタン群）。hero card の上部・下部の2箇所で同じものを描画する。
 * mybest はスマホで card 末尾に CTA を配置することで「読み終え→即購入」の摩擦を減らしている。
 */
function CtaStack({
  product,
  ingredient,
  subPlatformLinks,
}: {
  product: Product
  ingredient: Ingredient
  subPlatformLinks: SubPlatformLink[] | undefined
}) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <div className="relative">
          {product.firstOrderDiscount && (
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10 text-[10px] font-semibold bg-orange-100 text-orange-800 border border-orange-300 rounded px-2 py-0.5 whitespace-nowrap shadow-sm">
              {product.firstOrderDiscount}
            </span>
          )}
          <OutboundProductLink
            href={product.url}
            platform={product.platform}
            ingredientSlug={ingredient.slug}
            productRank={product.rank}
            aspProgram={product.aspProgram}
            aspId={product.aspId}
            commissionRateBand={product.commissionRateBand}
            className={`flex items-center justify-center gap-2 text-[13px] font-semibold rounded-lg px-3 h-12 transition-colors w-full ${PRIMARY_CTA}`}
          >
            <span className="flex flex-col items-center leading-tight">
              <span>{platformLabel[product.platform]}で詳細を見る</span>
              {product.monthlyCostJpy != null && (
                <span className="text-[11px] font-semibold opacity-90 tabular-nums">{formatYen(product.monthlyCostJpy)}</span>
              )}
            </span>
            <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
          </OutboundProductLink>
        </div>
        <p className="text-[10px] text-muted-foreground/90 leading-snug mt-1.5 text-center">
          {PLATFORM_TRUST_NOTE[product.platform]}
        </p>
      </div>
      {subPlatformLinks?.map(sub => (
        <div key={sub.platform + sub.searchUrl}>
          <OutboundProductLink
            href={sub.searchUrl}
            platform={sub.platform}
            ingredientSlug={ingredient.slug}
            className={`flex items-center justify-center gap-2 text-[12px] font-semibold rounded-lg px-3 h-11 transition-colors w-full ${PRIMARY_CTA}`}
          >
            <span className="flex flex-col items-center leading-tight">
              <span>{sub.label ?? `${platformLabel[sub.platform]}で探す`}</span>
              <span className="text-[10px] font-medium opacity-85">価格は検索結果で確認</span>
            </span>
            <ExternalLink className="w-3 h-3 flex-shrink-0" />
          </OutboundProductLink>
          <p className="text-[10px] text-muted-foreground/80 leading-snug mt-1 text-center">
            {PLATFORM_SEARCH_TRUST_NOTE[sub.platform]}
          </p>
        </div>
      ))}
    </div>
  )
}

function HeroMybestCard({
  product,
  ingredient,
  score,
  cost1d,
  isOverallRank1,
  axisLeaders,
  subPlatformLinks,
  bestPickReason,
}: HeroMybestProps) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="p-4 sm:p-5 flex flex-col gap-4">
        {/* ヘッダー：1位 + 王冠バッジ row（横スクロール許容） */}
        <div className="flex items-center gap-2 overflow-x-auto -mx-1 px-1 pb-1">
          {isOverallRank1 && (
            <span
              className="flex-shrink-0 inline-flex items-center justify-center text-[14px] font-semibold tracking-wider bg-amber-400 text-amber-950 rounded px-3 py-1.5 leading-none"
              title="当サイト掲載商品中・SciBase 推奨度1位"
            >
              1位
            </span>
          )}
          {axisLeaders
            .filter(l => l.leaderUrls.has(product.url))
            .slice(0, 4)
            .map(l => (
              <span
                key={l.axis}
                className="flex-shrink-0 inline-flex items-center gap-1 text-[12px] font-semibold text-amber-900 whitespace-nowrap"
                title={`当サイト掲載商品中・${l.axisLabel}スコア最上位`}
              >
                <span aria-hidden className="text-amber-500 text-[14px] leading-none">♛</span>
                <span>{l.axisLabel} No.1</span>
              </span>
            ))}
        </div>

        {/* ブランド + 商品名 + 総合評価1文（改善F） */}
        <div>
          <p className="text-[12px] text-muted-foreground">{product.brand}</p>
          <h3 className="font-semibold text-[20px] sm:text-[22px] text-foreground leading-tight mt-1">
            {product.name}
          </h3>
          {(() => {
            const parts: string[] = []
            if (score.effectiveDoseStatus === 'sufficient') parts.push('論文有効量を充足')
            if (product.heavyMetalTested && product.thirdPartyTested) parts.push('重金属＋成分量検査済')
            else if (product.heavyMetalTested || product.thirdPartyTested) parts.push('第三者検査済')
            if (ingredient.heroStat) parts.push(`${ingredient.heroStat.value}：${ingredient.heroStat.label}`)
            if (parts.length === 0) return null
            return (
              <p className="text-[12px] text-foreground/80 leading-relaxed mt-2">
                {parts.join('・')}
              </p>
            )
          })()}
        </div>

        {/* おすすめスコア box（mybest 風 pink/peach） */}
        <div className="bg-rose-50/50 border border-rose-100 rounded-xl px-4 py-3.5">
          <div className="flex items-baseline gap-2 mb-2">
            <p className="text-[12px] text-muted-foreground">おすすめスコア</p>
            <p className={`font-semibold tabular-nums ${score.recommendationScore >= 4 ? 'text-rose-600' : score.recommendationScore >= 3 ? 'text-amber-600' : 'text-foreground'}`}>
              <span className="text-[36px] leading-none">★{score.recommendationScore.toFixed(2)}</span>
            </p>
          </div>
          {/* 軸別スコア grid（強い順ソート・mybest 形式テキスト + ★） */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-2 border-t border-rose-100">
            {axisDisplayOrder(score).map(({ axis, label, value }) => (
              <div key={axis} className="flex items-center justify-between gap-2 text-[12px]">
                <span className="text-muted-foreground truncate">{label}</span>
                <span className={`font-semibold tabular-nums whitespace-nowrap ${axisScoreColor(value)}`}>
                  {value == null ? '★ -' : `★${value.toFixed(2)}`}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground/80 mt-2 pt-2 border-t border-rose-100 leading-relaxed">
            ※ SciBase 独自評価（論文整合40%・第三者検査25%・認証15%・純度10%・コスパ5%・配送5%）
          </p>
        </div>

        {/* 画像 + 価格パネル の 2カラム */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_240px] gap-4 items-start">
          {/* 商品画像 + 第1位メダル */}
          <div className="relative mx-auto sm:mx-0 w-full max-w-[360px] aspect-square rounded-xl overflow-hidden bg-secondary/40">
            {product.imageUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
                {isOverallRank1 && (
                  <div className="absolute bottom-3 left-3 bg-amber-400 text-amber-950 text-[10px] font-semibold rounded-full w-16 h-16 flex flex-col items-center justify-center border-[3px] border-amber-500 shadow-lg">
                    <span className="text-[8px] tracking-wide leading-none mt-1.5">第</span>
                    <span className="text-[22px] font-extrabold leading-none">1</span>
                    <span className="text-[8px] tracking-wide leading-none mb-1.5">位</span>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/30 gap-2">
                <div className="text-[48px] font-semibold">{product.brand.slice(0, 1)}</div>
                <p className="text-[10px]">画像準備中</p>
              </div>
            )}
          </div>

          {/* 価格 + CTA 縦並び（mybest 右カラム） */}
          <div className="flex flex-col gap-2.5">
            <div>
              <p className="text-[11px] text-muted-foreground mb-1">料金（参考）</p>
              {cost1d != null ? (
                <>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <p className="text-[28px] font-semibold text-rose-600 tabular-nums leading-none">
                      ¥{cost1d.toLocaleString()}
                    </p>
                    <p className="text-[12px] text-muted-foreground">/ 日</p>
                    {score.costScore === 5 && (
                      <span className="text-[10px] font-semibold text-foreground bg-secondary border border-border rounded px-1.5 py-0.5 leading-none">
                        低価格
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground tabular-nums mt-1">
                    月{formatYen(product.monthlyCostJpy)}・購入時{formatYen(product.priceJpy)}〜
                  </p>
                  {score.unitCostPerMg != null && (
                    <p className="text-[10px] text-muted-foreground/80 tabular-nums mt-0.5">
                      ¥{score.unitCostPerMg.toFixed(2)} / mg有効成分
                    </p>
                  )}
                </>
              ) : (
                <p className="text-[22px] font-semibold text-foreground tabular-nums">
                  {formatYen(product.priceJpy)}〜
                </p>
              )}
            </div>

            {/* CTA 縦並び（mybest 形式・モール名 + 価格） */}
            <div className="pt-1">
              <CtaStack product={product} ingredient={ingredient} subPlatformLinks={subPlatformLinks} />
            </div>
          </div>
        </div>

        {/* 充足 + 認証バッジ row */}
        <div className="flex flex-wrap gap-1.5">
          <EffectiveDoseBadge
            status={score.effectiveDoseStatus}
            ratio={score.effectiveDoseRatio}
          />
          {product.heavyMetalTested && (
            <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md px-2 py-1 whitespace-nowrap">
              ✓ 重金属検査済
            </span>
          )}
          {product.thirdPartyTested && !product.heavyMetalTested && (
            <span className="text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-md px-2 py-1 whitespace-nowrap">
              ✓ 第三者検査済
            </span>
          )}
          {product.certifications?.includes('NSF') && (
            <span className="text-[11px] font-semibold bg-blue-700 text-white rounded-md px-2 py-1 whitespace-nowrap">NSF認証</span>
          )}
          {product.certifications?.includes('USP') && (
            <span className="text-[11px] font-semibold bg-indigo-700 text-white rounded-md px-2 py-1 whitespace-nowrap">USP認証</span>
          )}
          {product.certifications?.includes('NonGMO') && (
            <span className="text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-200 rounded-md px-2 py-1 whitespace-nowrap">Non-GMO</span>
          )}
          {product.certifications?.includes('Organic') && (
            <span className="text-[11px] font-semibold bg-green-50 text-green-700 border border-green-200 rounded-md px-2 py-1 whitespace-nowrap">Organic</span>
          )}
          {product.shippingNote && (
            <span className="text-[11px] font-medium bg-secondary text-foreground border border-border rounded-md px-2 py-1 whitespace-nowrap">
              配送：{product.shippingNote}
            </span>
          )}
        </div>

        {/* こんな人におすすめ（whoFor） */}
        {ingredient.whoFor && ingredient.whoFor.length > 0 && (
          <div className="border border-border bg-secondary/30 rounded-xl p-4">
            <p className="text-[11px] font-semibold tracking-wide text-muted-foreground mb-2">
              こんな人におすすめ
            </p>
            <ul className="space-y-1.5">
              {ingredient.whoFor.slice(0, 4).map((w, i) => (
                <li key={i} className="text-[13px] text-foreground leading-relaxed flex gap-2">
                  <span aria-hidden className="text-emerald-600 flex-shrink-0 font-semibold">✓</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ベネフィット見出し */}
        {product.benefitHeading && (
          <p className="text-[15px] sm:text-[17px] font-semibold text-foreground leading-snug">
            {product.benefitHeading}
          </p>
        )}

        {/* 詳細説明 */}
        {product.descriptionLong && (
          <p className="text-[13px] text-foreground leading-relaxed">
            {product.descriptionLong}
          </p>
        )}

        {/* reasonJa 後方互換 */}
        {!product.descriptionLong && product.reasonJa && (
          <p className="text-[13px] text-muted-foreground leading-relaxed border-l-2 border-foreground/30 pl-3">
            {product.reasonJa}
          </p>
        )}

        {/* Pros / Cons */}
        <ProsConsBox pros={product.pros} cons={product.cons} stackMobile />

        {/* スペック表（mybest サプリ形式） */}
        <SpecTable product={product} ingredient={ingredient} />

        {/* 副作用・併用注意コラプス（改善A） */}
        <SafetyDisclosureCollapse ingredient={ingredient} />

        {/* 下部 CTA（mybest 風・読み終え→即購入の摩擦削減） */}
        <div className="pt-2 border-t border-border">
          <p className="text-[11px] text-muted-foreground text-center mb-3">
            ここまで読んだ方へ・購入はこちら
          </p>
          <CtaStack product={product} ingredient={ingredient} subPlatformLinks={subPlatformLinks} />
        </div>

        {bestPickReason && (
          <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
            <RichInline text={bestPickReason} />
          </p>
        )}
      </div>
    </div>
  )
}
