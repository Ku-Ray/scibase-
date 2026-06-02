'use client'

import { Star } from 'lucide-react'
import { useFavorite, type FavoriteType } from '@/hooks/useFavorite'

interface FavoriteButtonProps {
  type: FavoriteType
  slug: string
  /** 'compact' は icon のみ・'pill' はラベル付きボタン */
  variant?: 'compact' | 'pill'
  className?: string
}

/**
 * お気に入り ⭐ 切替ボタン。
 * compact: 角丸正方形・icon のみ（hero 横配置）
 * pill: AddToAnalyzerButton と並べる用のラベル付き
 */
export function FavoriteButton({ type, slug, variant = 'pill', className = '' }: FavoriteButtonProps) {
  const { isFavorite, toggle } = useFavorite(type, slug)

  if (variant === 'compact') {
    return (
      <button
        onClick={toggle}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? 'お気に入りから削除' : 'お気に入りに追加'}
        title={isFavorite ? 'お気に入りから削除' : 'お気に入りに追加'}
        className={`inline-flex items-center justify-center w-10 h-10 rounded-lg
          bg-white/70 border border-border
          hover:bg-white hover:border-foreground/30 transition-colors
          ${className}`}
      >
        <Star
          className={`w-4 h-4 transition-colors
            ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
        />
      </button>
    )
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? 'お気に入りから削除' : 'お気に入りに追加'}
      className={`inline-flex items-center gap-1.5 text-[13px] font-medium
        px-4 py-2 min-h-[40px] rounded-full border transition-all
        ${isFavorite
          ? 'bg-yellow-50 border-yellow-300 text-yellow-800 hover:bg-yellow-100'
          : 'bg-card border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'}
        ${className}`}
    >
      <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
      {isFavorite ? 'お気に入り済' : 'お気に入り'}
    </button>
  )
}
