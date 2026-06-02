'use client'

import { useCallback, useEffect, useState } from 'react'
import { trackEvent } from '@/lib/analytics'

export type FavoriteType = 'ingredient' | 'article' | 'compare'

const STORAGE_KEYS: Record<FavoriteType, string> = {
  ingredient: 'scibase_favorites_ingredients',
  article: 'scibase_favorites_articles',
  compare: 'scibase_favorites_compares',
}

const FAVORITES_UPDATED_EVENT = 'scibase:favorites-updated'

function readList(type: FavoriteType): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEYS[type])
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === 'string') : []
  } catch {
    return []
  }
}

function writeList(type: FavoriteType, list: string[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEYS[type], JSON.stringify(list))
    window.dispatchEvent(new CustomEvent(FAVORITES_UPDATED_EVENT, { detail: { type } }))
  } catch { /* ignore */ }
}

/**
 * Single item favorite toggle hook.
 * compare type の slug は ['a','b'] のソート済み join（"a__b"）を使う。
 */
export function useFavorite(type: FavoriteType, slug: string): {
  isFavorite: boolean
  toggle: () => void
  add: () => void
  remove: () => void
} {
  const [isFavorite, setIsFavorite] = useState(false)

  // 初期 + 他コンポーネント・他タブからの変更を反映
  useEffect(() => {
    setIsFavorite(readList(type).includes(slug))
    const sync = () => setIsFavorite(readList(type).includes(slug))
    window.addEventListener(FAVORITES_UPDATED_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(FAVORITES_UPDATED_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [type, slug])

  const add = useCallback(() => {
    const list = readList(type)
    if (list.includes(slug)) return
    writeList(type, [...list, slug])
    setIsFavorite(true)
    trackEvent('favorite_added', { type, slug })
  }, [type, slug])

  const remove = useCallback(() => {
    const list = readList(type)
    if (!list.includes(slug)) return
    writeList(type, list.filter((s) => s !== slug))
    setIsFavorite(false)
    trackEvent('favorite_removed', { type, slug })
  }, [type, slug])

  const toggle = useCallback(() => {
    const list = readList(type)
    if (list.includes(slug)) {
      writeList(type, list.filter((s) => s !== slug))
      setIsFavorite(false)
      trackEvent('favorite_removed', { type, slug })
    } else {
      writeList(type, [...list, slug])
      setIsFavorite(true)
      trackEvent('favorite_added', { type, slug })
    }
  }, [type, slug])

  return { isFavorite, toggle, add, remove }
}

/**
 * Full favorites list for a given type. Used by /my/favorites page.
 */
export function useFavoritesList(type: FavoriteType): {
  list: string[]
  remove: (slug: string) => void
  clear: () => void
} {
  const [list, setList] = useState<string[]>([])

  useEffect(() => {
    setList(readList(type))
    const sync = () => setList(readList(type))
    window.addEventListener(FAVORITES_UPDATED_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(FAVORITES_UPDATED_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [type])

  const remove = useCallback((slug: string) => {
    const current = readList(type)
    if (!current.includes(slug)) return
    writeList(type, current.filter((s) => s !== slug))
    trackEvent('favorite_removed', { type, slug })
  }, [type])

  const clear = useCallback(() => {
    writeList(type, [])
    trackEvent('favorite_cleared', { type })
  }, [type])

  return { list, remove, clear }
}

/** compare pair slug を正規化（順序問わず一意化） */
export function comparePairKey(slugA: string, slugB: string): string {
  return [slugA, slugB].sort().join('__')
}
