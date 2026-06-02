import Link from 'next/link'
import { ArrowRight, Microscope, Pill } from 'lucide-react'

interface Props {
  /** 配置場所のバリエーション */
  variant?: 'banner' | 'compact' | 'inline'
  /** 引数 query: 該当成分 slug を1つ渡せば deep link で開く */
  ingredientSlug?: string
  /** 既存 CTA との重複回避用クラス名 */
  className?: string
}

/**
 * /tools/interaction-checker への内部リンク CTA。
 * - banner: ingredient/article 内に組み込む幅広バナー
 * - compact: hero など狭いエリア用
 * - inline: テキスト inline link
 */
export function InteractionCheckerCta({
  variant = 'banner',
  ingredientSlug,
  className = '',
}: Props) {
  const href = ingredientSlug
    ? `/tools/interaction-checker?ing=${encodeURIComponent(ingredientSlug)}`
    : '/tools/interaction-checker'

  if (variant === 'inline') {
    return (
      <Link
        href={href}
        className={`inline-flex items-center gap-1 text-accent underline-offset-2 hover:underline ${className}`}
      >
        <Microscope className="size-3.5" />
        飲み合わせをチェック
        <ArrowRight className="size-3" />
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link
        href={href}
        className={`inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-[12px] font-medium text-violet-800 hover:bg-violet-100 ${className}`}
      >
        <Pill className="size-3.5" />
        サプリ × 薬の飲み合わせを 30 秒チェック
        <ArrowRight className="size-3" />
      </Link>
    )
  }

  // banner
  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/60 p-4 hover:border-blue-400 hover:bg-blue-50 ${className}`}
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
        <Microscope className="size-5 text-blue-600" />
      </div>
      <div className="flex-1">
        <p className="text-[14px] font-semibold text-blue-900">
          サプリ × 薬の飲み合わせをまとめてチェック
        </p>
        <p className="mt-0.5 text-[12px] text-blue-900/70">
          {ingredientSlug
            ? '今見ている成分を含めて、他のサプリ・服用中の薬との相互作用を 30 秒で可視化（無料・登録不要）'
            : '飲んでいるサプリと服用中の医薬品を入力するだけで、論文ベースの相互作用を 3 段階表示（無料・登録不要）'}
        </p>
      </div>
      <ArrowRight className="size-5 shrink-0 text-blue-600 transition-transform group-hover:translate-x-1" />
    </Link>
  )
}
