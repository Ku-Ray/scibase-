/**
 * 「この記事の結論」＋「価格の目安」ボックス。
 *
 * articles.ts 系・ConcernGuide 系の両方で共通利用できる結論先出しボックス。
 * 配置は記事冒頭（heroStat 直後・problemBody より前）が標準。
 *
 * - keyConclusions: 「。」区切りの文字列。4-5項目目安・1項目 20-50字
 * - priceGuide: 「・／。」区切りの文字列（任意）。価格レンジを 4-5項目で
 *
 * 設計準拠: writing/knowledge/mybest_style.md「この記事のポイント」セクション、
 * mobile_writing.md「リスト1項目 20-30字」、readability_principles.md「結論先出し PREP」
 */
type Props = {
  keyConclusions: string
  priceGuide?: string
}

export function ArticleConclusionBoxes({ keyConclusions, priceGuide }: Props) {
  const conclusionItems = keyConclusions
    .split('。')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)

  if (conclusionItems.length === 0) return null

  const priceItems = priceGuide
    ? priceGuide
        .split(/[・／。]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    : []

  return (
    <section className="mb-12">
      <div className="bg-foreground/[0.04] border-l-4 border-foreground/60 rounded-r-xl p-5">
        <p className="text-[11px] font-semibold tracking-[0.1em] text-muted-foreground mb-2 uppercase">
          この記事の結論
        </p>
        <ul className="text-[14px] sm:text-[15px] text-foreground leading-[1.95] font-medium space-y-1.5 list-disc pl-5 marker:text-foreground/40">
          {conclusionItems.map((s, i) => (
            <li key={i}>{s}。</li>
          ))}
        </ul>
      </div>

      {priceItems.length > 0 && (
        <div className="mt-3 bg-emerald-50/70 border-l-4 border-emerald-500 rounded-r-xl px-5 py-3">
          <p className="text-[11px] font-semibold tracking-[0.1em] text-emerald-700 mb-1.5 uppercase">
            価格の目安
          </p>
          <ul className="text-[13px] sm:text-[14px] text-foreground/85 leading-[1.85] space-y-1 list-disc pl-5 marker:text-emerald-600/70">
            {priceItems.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
