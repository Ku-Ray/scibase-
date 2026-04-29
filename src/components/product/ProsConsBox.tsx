interface Props {
  pros?: string[]
  cons?: string[]
  /** モバイルで縦積みにするか（変則レイアウト時のみtrue。既定false=2列維持） */
  stackMobile?: boolean
}

/**
 * mybestスタイルの「☺良い / ☹気になる」2列ボックス。
 * 全フィールド未指定なら何も描画しない。片側のみでも成立。
 */
export function ProsConsBox({ pros, cons, stackMobile = false }: Props) {
  const hasPros = pros && pros.length > 0
  const hasCons = cons && cons.length > 0
  if (!hasPros && !hasCons) return null

  const layout = stackMobile
    ? 'grid grid-cols-1 sm:grid-cols-2 gap-2'
    : 'grid grid-cols-2 gap-2'

  return (
    <div className={layout}>
      {hasPros && (
        <div className="rounded-lg border border-rose-200 bg-rose-50/40 overflow-hidden">
          <div className="flex items-center gap-1.5 bg-rose-100/60 px-3 py-1.5 border-b border-rose-200">
            <span aria-hidden className="text-[14px]">☺</span>
            <span className="text-[12px] font-bold text-rose-800">良い</span>
          </div>
          <ul className="p-3 space-y-1.5">
            {pros!.map((p, i) => (
              <li key={i} className="text-[12px] text-foreground leading-relaxed flex gap-1.5">
                <span aria-hidden className="text-rose-500 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {hasCons && (
        <div className="rounded-lg border border-slate-200 bg-slate-50/60 overflow-hidden">
          <div className="flex items-center gap-1.5 bg-slate-100/80 px-3 py-1.5 border-b border-slate-200">
            <span aria-hidden className="text-[14px]">☹</span>
            <span className="text-[12px] font-bold text-slate-700">気になる</span>
          </div>
          <ul className="p-3 space-y-1.5">
            {cons!.map((c, i) => (
              <li key={i} className="text-[12px] text-foreground leading-relaxed flex gap-1.5">
                <span aria-hidden className="text-slate-400 flex-shrink-0">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
