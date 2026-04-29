import type { Ingredient } from '@/lib/types'

interface Props {
  ingredient: Ingredient
}

const LEVEL_COLOR: Record<string, string> = {
  avoid: 'bg-rose-50 text-rose-800 border-rose-200',
  caution: 'bg-amber-50 text-amber-800 border-amber-200',
  monitor: 'bg-blue-50 text-blue-800 border-blue-200',
}

const LEVEL_LABEL: Record<string, string> = {
  avoid: '併用回避',
  caution: '要注意',
  monitor: '要経過観察',
}

/**
 * 商品ブロック末尾の「副作用・併用注意」コラプス表示。
 * 山田さん（敏感肌・薬併用懸念）が FAQ まで戻らずに購入決断できるよう、
 * ingredient の sideEffects/contraindications/interactions を1か所で開示する。
 *
 * 法務：断定なし・「効かない」表現なし・薬機法準拠の表現を維持。
 */
export function SafetyDisclosureCollapse({ ingredient }: Props) {
  const hasSide = (ingredient.sideEffects?.length ?? 0) > 0
  const hasContra = (ingredient.contraindications?.length ?? 0) > 0
  const hasInter = (ingredient.interactions?.length ?? 0) > 0
  if (!hasSide && !hasContra && !hasInter) return null

  return (
    <details className="group border border-border rounded-xl bg-card overflow-hidden">
      <summary className="flex items-center justify-between gap-2 px-4 py-3 cursor-pointer list-none hover:bg-secondary/50 transition-colors">
        <div className="flex items-center gap-2">
          <span aria-hidden className="text-amber-600 text-[15px] leading-none">⚠</span>
          <span className="text-[13px] font-bold text-foreground">
            副作用・薬との併用注意（必ず確認）
          </span>
        </div>
        <span aria-hidden className="text-muted-foreground text-[14px] group-open:rotate-180 transition-transform">▾</span>
      </summary>

      <div className="px-4 pb-4 pt-1 border-t border-border space-y-3">
        {hasSide && (
          <div>
            <p className="text-[11px] font-bold text-muted-foreground tracking-wide mb-1.5">想定される副作用</p>
            <ul className="space-y-1">
              {ingredient.sideEffects!.map((s, i) => (
                <li key={i} className="text-[12px] text-foreground leading-relaxed flex gap-2">
                  <span aria-hidden className="text-muted-foreground/60 flex-shrink-0">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {hasContra && (
          <div>
            <p className="text-[11px] font-bold text-muted-foreground tracking-wide mb-1.5">使用を避けるべき人</p>
            <ul className="space-y-1">
              {ingredient.contraindications!.map((c, i) => (
                <li key={i} className="text-[12px] text-foreground leading-relaxed flex gap-2">
                  <span aria-hidden className="text-rose-500 flex-shrink-0 font-bold">×</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {hasInter && (
          <div>
            <p className="text-[11px] font-bold text-muted-foreground tracking-wide mb-1.5">医薬品・他サプリとの相互作用</p>
            <ul className="space-y-2">
              {ingredient.interactions!.map((it, i) => (
                <li key={i} className="border border-border rounded-lg p-3 bg-secondary/20">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-[10px] font-bold border rounded px-1.5 py-0.5 whitespace-nowrap ${LEVEL_COLOR[it.level] ?? ''}`}>
                      {LEVEL_LABEL[it.level] ?? it.level}
                    </span>
                    <span className="text-[12px] font-semibold text-foreground">{it.substance}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed mb-1">{it.mechanism}</p>
                  <p className="text-[11px] text-foreground/90 leading-relaxed">{it.action}</p>
                  {it.source && (
                    <p className="text-[10px] text-muted-foreground/70 mt-1">出典：{it.source}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-[10px] text-muted-foreground/80 leading-relaxed pt-2 border-t border-border">
          ※ 上記は一般的な注意点です。持病・服薬中の方、妊娠・授乳中の方は必ず医師・薬剤師に相談してください。
        </p>
      </div>
    </details>
  )
}
