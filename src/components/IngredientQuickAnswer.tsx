import Link from 'next/link'
import type { Ingredient } from '@/lib/types'

interface Props {
  ingredient: Ingredient
  /** POPULAR_PAIRS に当該成分を含む比較ページがある場合の URL（例: /compare/fisetin-vs-quercetin）。無ければ比較リンク非表示 */
  compareHref?: string
  /** 比較相手の成分名（例: 'ケルセチン'）。compareHref とセットで使う */
  compareLabel?: string
  /** 当サイト評価1位（heroProduct）の SciBase 推奨度。無い成分（cosme のみ等）では数値を添えず商品アンカーだけ出す */
  heroRating?: number
  /** 同・1日あたりコスト（円）。monthlyCostJpy が無い商品では省略 */
  heroCost1dJpy?: number
  className?: string
}

type QaRow = { label: string; value: string; tone: 'neutral' | 'caution' }

/**
 * 成分ページ FV（ファーストビュー）の「クイックアンサー」。
 * 検索主意図（[成分] 副作用 / 効果 / 量 / 飲み合わせ）に FV の 1 ブロックで即答する。
 *
 * 背景：成分ページは検索着地の主要面だが、FV が効能/PEI 一色で「副作用」目的の来訪者が
 * 5-10 秒で直帰していた（fisetin/procyanidin-c1/lions-mane で実測）。ここで効果・有効量・
 * 副作用・注意を先出しし、回遊（→ 論文 / → 比較 / → 商品）へ繋いで商品カード到達率を上げる。
 * 商品行はページ内アンカー（#products）のみ — FV に商品カード実体は置かない（直帰リスク・
 * 情報枠の中立性維持）。ページ内リンクのため PR 表記は着地先 #products 冒頭の既存表記で足りる。
 *
 * すべて既存フィールド（tagline / dosage / sideEffects / contraindications / interactions /
 * sectionSummaries）から自動生成し、全成分に一律適用する（手書きしない）。情報が無い行は
 * 描画しない（graceful）。薬機法：新しい主張は足さず既存の非断定文言をそのまま使い、
 * 副作用/注意がある成分には医師・薬剤師相談の一文を必ず添える。
 */
export function IngredientQuickAnswer({
  ingredient: ing,
  compareHref,
  compareLabel,
  heroRating,
  heroCost1dJpy,
  className = '',
}: Props) {
  const isConcentration = ing.dosageUnit.includes('濃度')
  const doseRange =
    ing.dosageMin != null
      ? `${ing.dosageMin}${ing.dosageMax && ing.dosageMax !== ing.dosageMin ? `–${ing.dosageMax}` : ''}`
      : null
  const doseValue = doseRange != null
    ? (isConcentration ? `${doseRange}%` : `${doseRange} ${ing.dosageUnit}`) +
      (ing.timing ? ` ・ ${ing.timing.split('。')[0]}` : '')
    : null

  // 副作用：sideEffects 優先・無ければ sectionSummaries.safety の1文目にフォールバック（FVは壁テキスト回避）
  const sideEffectText = ing.sideEffects?.length
    ? ing.sideEffects.slice(0, 3).join('、')
    : ing.sectionSummaries?.safety
      ? ing.sectionSummaries.safety.split('。')[0] + '。'
      : null

  // 注意/禁忌：contraindications を優先（上位2件）・無ければ interactions(level:'avoid')の物質にフォールバック。
  // 併記せず OR で1行にまとめてコンパクトに保つ（詳細は #safety / #interactions セクションで補完）。
  const avoidSubstances = (ing.interactions ?? [])
    .filter((x) => x.level === 'avoid')
    .map((x) => x.substance)
  const cautionText = ing.contraindications?.length
    ? ing.contraindications.slice(0, 2).join(' / ')
    : avoidSubstances.length
      ? `${avoidSubstances.slice(0, 3).join('・')}との併用に注意`
      : null

  const rows: QaRow[] = [
    { label: '効果', value: ing.tagline, tone: 'neutral' },
    ...(doseValue ? [{ label: '有効量', value: doseValue, tone: 'neutral' } as QaRow] : []),
    ...(sideEffectText ? [{ label: '副作用', value: sideEffectText, tone: 'caution' } as QaRow] : []),
    ...(cautionText ? [{ label: '注意', value: cautionText, tone: 'caution' } as QaRow] : []),
  ]

  const hasSafety = Boolean(sideEffectText || cautionText)

  // 商品アンカーの補足数字（興味ドクトリン: 具体×正直・最大2個）。「評価1位」は QuickBuy と同一表現。
  // heroRating が無い（= heroProduct 不在）成分では数字なしのプレーンなアンカーに落とす（graceful）
  const productSuffix =
    heroRating != null
      ? heroCost1dJpy != null
        ? `（評価1位 ★${heroRating.toFixed(1)}・1日¥${heroCost1dJpy.toLocaleString()}）`
        : `（評価1位 ★${heroRating.toFixed(1)}）`
      : ''

  return (
    <section
      aria-label={`${ing.nameJa}の要点（効果・有効量・副作用・注意）`}
      className={`bg-card border border-border rounded-2xl overflow-hidden shadow-sm ${className}`}
    >
      <div className="px-4 py-2.5 border-b border-border bg-secondary/40">
        <p className="text-[11px] font-semibold tracking-wider text-muted-foreground">
          この成分の要点
        </p>
      </div>

      <dl className="divide-y divide-border">
        {rows.map((r) => (
          <div key={r.label} className="flex gap-3 px-4 py-3">
            <dt className="shrink-0 w-14 pt-px">
              <span
                className={`inline-block whitespace-nowrap rounded px-1.5 py-0.5 text-[11px] font-semibold ${
                  r.tone === 'caution'
                    ? 'border border-amber-200 bg-amber-50 text-amber-800'
                    : 'border border-border bg-secondary text-muted-foreground'
                }`}
              >
                {r.label}
              </span>
            </dt>
            <dd className="min-w-0 flex-1 text-[13px] leading-relaxed text-foreground">
              {r.value}
            </dd>
          </div>
        ))}
      </dl>

      {hasSafety && (
        <p className="border-t border-border bg-amber-50/40 px-4 py-2.5 text-[11px] leading-snug text-muted-foreground">
          服用中の薬・持病がある方、妊娠・授乳中の方は、医師・薬剤師にご相談ください。
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border px-4 py-2">
        <a
          href="#papers"
          className="inline-flex min-h-[44px] items-center text-[12px] font-medium text-blue-700 hover:underline"
        >
          → 論文を見る
        </a>
        {compareHref && compareLabel && (
          <Link
            href={compareHref}
            className="inline-flex min-h-[44px] items-center text-[12px] font-medium text-blue-700 hover:underline"
          >
            → {compareLabel}と比較
          </Link>
        )}
        {/* #products と同一の表示条件（page.tsx の ing.products.length > 0）— 着地先が無いアンカーを出さない */}
        {ing.products.length > 0 && (
          <a
            href="#products"
            className="inline-flex min-h-[44px] items-center text-[12px] font-medium text-blue-700 hover:underline"
          >
            → おすすめ商品を見る{productSuffix}
          </a>
        )}
      </div>
    </section>
  )
}
