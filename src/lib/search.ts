/**
 * サイト内検索（成分・悩み）の共通設定。
 * SearchModal と HeroSearch から再利用される。
 *
 * - ひらがな⇔カタカナ・全角⇔半角を吸収（「しみ」で「シミ」がヒットする）
 * - aliases フィールドを検索対象に含める（「VC」で「ビタミンC」がヒット）
 * - threshold 0.4 / minMatchCharLength 1 / ignoreLocation でゆるくヒット
 */
import Fuse from 'fuse.js'
import { ingredients, concerns } from './data'
import type { Ingredient, Concern } from './types'
import { normalizeJa, buildSearchText } from './utils'

export type SearchResult =
  | { type: 'ingredient'; item: Ingredient }
  | { type: 'concern';    item: Concern }

type Indexed = SearchResult & { _text: string }

const indexed: Indexed[] = [
  ...ingredients.map<Indexed>(i => ({
    type: 'ingredient',
    item: i,
    _text: buildSearchText(i.nameJa, i.nameEn, i.aliases, i.tagline, i.description),
  })),
  ...concerns.map<Indexed>(c => ({
    type: 'concern',
    item: c,
    _text: buildSearchText(c.nameJa, c.aliases, c.description),
  })),
]

const fuse = new Fuse<Indexed>(indexed, {
  keys: ['_text'],
  threshold: 0.4,
  minMatchCharLength: 1,
  ignoreLocation: true,
})

export function searchSite(query: string, limit = 8): SearchResult[] {
  const q = normalizeJa(query.trim())
  if (!q) return []
  return fuse.search(q).slice(0, limit).map(r => ({ type: r.item.type, item: r.item.item }) as SearchResult)
}
