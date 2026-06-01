import type { Article, Concern, Ingredient } from './types'
import { articles, getArticle, getArticlesByIngredient, getArticlesByConcern } from './articles'
import { getIngredient, ingredients, getConcern, concerns } from './data'
import { POPULAR_PAIRS } from './compare-data'
import { concernGuides, getConcernGuide } from './concern-guide-data'
import { SUPPLEMENT_GUIDE_SUFFIX } from './concern-guide-utils'
import type { NextReadItem } from '@/components/NextReadCTA'

const CONCERN_GUIDE_SLUGS = new Set(concernGuides.map((g) => g.concernSlug))

const rankBadge = (ing: Ingredient): string =>
  `論文 ${ing.papers.length} 本・${ing.evidenceRank} ランク`

/** 成分の primary concern（最初の concern）が ConcernGuide 描画対象かチェック */
function findGuideConcern(ing: Ingredient): string | undefined {
  return ing.concerns.find((c) => CONCERN_GUIDE_SLUGS.has(c))
}

/** 成分 a, b を含む POPULAR_PAIRS を URL 形式で返す（最大 limit 件） */
function findPairsContaining(slug: string, exclude: Set<string> = new Set(), limit = 3): Array<{ a: Ingredient; b: Ingredient; key: string }> {
  const out: Array<{ a: Ingredient; b: Ingredient; key: string }> = []
  for (const [x, y] of POPULAR_PAIRS) {
    if (x !== slug && y !== slug) continue
    const key = `${x}-vs-${y}`
    if (exclude.has(key)) continue
    const a = getIngredient(x)
    const b = getIngredient(y)
    if (!a || !b) continue
    out.push({ a, b, key })
    if (out.length >= limit) break
  }
  return out
}

/** ─────────────────────────────────────────────
 *  成分ページ向け cross-type 推奨
 *  - 既存に sibling ingredient / compare links / ranking CTA があるため、
 *    NextReadCTA はそれらと重ならない「コラム + 比較 + 悩みガイド」を強調
 *  ───────────────────────────────────────────── */
export function buildIngredientNextRead(ing: Ingredient): NextReadItem[] {
  const out: NextReadItem[] = []
  const seenArticles = new Set<string>()

  // 1) コラム：この成分を扱う relatedIngredientSlugs 由来
  const ingArticles = getArticlesByIngredient(ing.slug).filter((a) => !a.hideFromList)
  for (const a of ingArticles.slice(0, 2)) {
    if (seenArticles.has(a.slug)) continue
    seenArticles.add(a.slug)
    out.push({
      type: 'article',
      href: `/articles/${a.slug}`,
      title: a.title,
      description: a.lossAversionHook ?? a.description.slice(0, 80),
      badge: `${a.readingMinutes} 分・${a.categoryLabel}`,
    })
    if (out.length >= 1) break
  }

  // 2) 比較ペア：この成分を含む POPULAR_PAIRS
  const pairs = findPairsContaining(ing.slug)
  if (pairs.length > 0) {
    const p = pairs[0]
    out.push({
      type: 'compare',
      href: `/compare/${p.key}`,
      title: `${p.a.nameJa} vs ${p.b.nameJa}`,
      description: `論文ベースでどちらを選ぶか整理。`,
      badge: `${p.a.evidenceRank} vs ${p.b.evidenceRank}`,
    })
  }

  // 3) 悩みガイド：この成分の primary concern が ConcernGuide 対象なら
  const guideSlug = findGuideConcern(ing)
  if (guideSlug) {
    const concern = getConcern(guideSlug)
    if (concern) {
      out.push({
        type: 'concern',
        href: `/articles/${guideSlug}${SUPPLEMENT_GUIDE_SUFFIX}`,
        title: `${concern.nameJa}の総合サプリガイド`,
        description: concern.description,
        badge: '悩みハブ',
      })
    }
  }

  // 4) もう 1 件コラム（埋め草）
  if (out.length < 4) {
    for (const a of ingArticles) {
      if (seenArticles.has(a.slug)) continue
      seenArticles.add(a.slug)
      out.push({
        type: 'article',
        href: `/articles/${a.slug}`,
        title: a.title,
        description: a.lossAversionHook ?? a.description.slice(0, 80),
        badge: `${a.readingMinutes} 分・${a.categoryLabel}`,
      })
      if (out.length >= 4) break
    }
  }

  return out.slice(0, 4)
}

/** ─────────────────────────────────────────────
 *  コラム記事向け cross-type 推奨
 *  - 既存の relatedIngredients / relatedArticles と重複しないように
 *    比較ペア + 悩みガイド + 別カテゴリのコラムを優先
 *  ───────────────────────────────────────────── */
export function buildArticleNextRead(article: Article): NextReadItem[] {
  const out: NextReadItem[] = []
  const existingArticleSlugs = new Set([article.slug, ...(article.relatedArticleSlugs ?? [])])

  // 1) 比較ペア：記事の最初の relatedIngredient を含むもの
  const firstIng = article.relatedIngredientSlugs[0]
  if (firstIng) {
    const pairs = findPairsContaining(firstIng)
    if (pairs.length > 0) {
      const p = pairs[0]
      out.push({
        type: 'compare',
        href: `/compare/${p.key}`,
        title: `${p.a.nameJa} vs ${p.b.nameJa}`,
        description: '論文ベースでどちらを選ぶか整理。',
        badge: `${p.a.evidenceRank} vs ${p.b.evidenceRank}`,
      })
    }
  }

  // 2) 悩みガイド：記事の concerns から ConcernGuide 描画対象を優先
  const concernSlug = (article.concerns ?? []).find((c) => CONCERN_GUIDE_SLUGS.has(c))
  if (concernSlug) {
    const concern = getConcern(concernSlug)
    if (concern) {
      out.push({
        type: 'concern',
        href: `/articles/${concernSlug}${SUPPLEMENT_GUIDE_SUFFIX}`,
        title: `${concern.nameJa}の総合サプリガイド`,
        description: concern.description,
        badge: '悩みハブ',
      })
    }
  }

  // 3) 別カテゴリの近いコラム（同 concerns or 同カテゴリ）
  const sameConcernArticles = articles
    .filter((a) => !a.hideFromList)
    .filter((a) => !existingArticleSlugs.has(a.slug))
    .filter((a) => (a.concerns ?? []).some((c) => (article.concerns ?? []).includes(c)) || a.category === article.category)
    .slice(0, 4)
  for (const a of sameConcernArticles) {
    out.push({
      type: 'article',
      href: `/articles/${a.slug}`,
      title: a.title,
      description: a.lossAversionHook ?? a.description.slice(0, 80),
      badge: `${a.readingMinutes} 分・${a.categoryLabel}`,
    })
    if (out.length >= 4) break
  }

  return out.slice(0, 4)
}

/** ─────────────────────────────────────────────
 *  比較ページ向け cross-type 推奨
 *  - 既存 relatedPairs と分けて、コラム + 悩みガイド + 各成分ページを推す
 *  ───────────────────────────────────────────── */
export function buildCompareNextRead(ingA: Ingredient, ingB: Ingredient): NextReadItem[] {
  const out: NextReadItem[] = []

  // 1) 共通 concern の悩みガイド
  const commonConcerns = ingA.concerns.filter((c) => ingB.concerns.includes(c))
  const guideConcern = commonConcerns.find((c) => CONCERN_GUIDE_SLUGS.has(c))
  if (guideConcern) {
    const concern = getConcern(guideConcern)
    if (concern) {
      out.push({
        type: 'concern',
        href: `/articles/${guideConcern}${SUPPLEMENT_GUIDE_SUFFIX}`,
        title: `${concern.nameJa}の総合サプリガイド`,
        description: concern.description,
        badge: '悩みハブ',
      })
    }
  }

  // 2) いずれかの成分を扱うコラム
  const artsA = getArticlesByIngredient(ingA.slug)
  const artsB = getArticlesByIngredient(ingB.slug)
  const articleCandidates: Article[] = []
  const seen = new Set<string>()
  for (const a of [...artsA, ...artsB]) {
    if (a.hideFromList || seen.has(a.slug)) continue
    seen.add(a.slug)
    articleCandidates.push(a)
  }
  for (const a of articleCandidates.slice(0, 1)) {
    out.push({
      type: 'article',
      href: `/articles/${a.slug}`,
      title: a.title,
      description: a.lossAversionHook ?? a.description.slice(0, 80),
      badge: `${a.readingMinutes} 分・${a.categoryLabel}`,
    })
  }

  // 3) 各成分ページ
  for (const ing of [ingA, ingB]) {
    out.push({
      type: 'ingredient',
      href: `/ingredients/${ing.slug}`,
      title: `${ing.nameJa}の詳細`,
      description: ing.tagline,
      badge: rankBadge(ing),
    })
    if (out.length >= 4) break
  }

  return out.slice(0, 4)
}

/** ─────────────────────────────────────────────
 *  悩み（concern）ページ向け hub 接続データ
 *  Phase 4 で使用：成分 + 比較 + コラム + 関連悩み を返す
 *  ───────────────────────────────────────────── */
export function getComparesByConcern(concernSlug: string, limit = 6): Array<{ a: Ingredient; b: Ingredient; key: string }> {
  const out: Array<{ a: Ingredient; b: Ingredient; key: string }> = []
  for (const [x, y] of POPULAR_PAIRS) {
    const a = getIngredient(x)
    const b = getIngredient(y)
    if (!a || !b) continue
    if (a.concerns.includes(concernSlug) || b.concerns.includes(concernSlug)) {
      out.push({ a, b, key: `${x}-vs-${y}` })
      if (out.length >= limit) break
    }
  }
  return out
}

/** 同じ category（skin/sleep/cognitive 等）の関連 concern を返す（自身を除外） */
export function getRelatedConcerns(concernSlug: string, limit = 4): Concern[] {
  const self = getConcern(concernSlug)
  if (!self) return []
  return concerns
    .filter((c) => c.slug !== concernSlug && c.category === self.category)
    .slice(0, limit)
}

/** ─────────────────────────────────────────────
 *  ConcernGuideArticle（悩みガイド記事）向け cross-type 推奨
 *  既存の関連 articles / other guides セクションが薄い「比較ペア」と「成分詳細」を補強
 *  ───────────────────────────────────────────── */
export function buildConcernGuideNextRead(concernSlug: string): NextReadItem[] {
  const out: NextReadItem[] = []

  // 1) 比較ペア 2 件（この悩みに紐づく POPULAR_PAIRS）
  const pairs = getComparesByConcern(concernSlug, 2)
  for (const p of pairs) {
    out.push({
      type: 'compare',
      href: `/compare/${p.key}`,
      title: `${p.a.nameJa} vs ${p.b.nameJa}`,
      description: '論文ベースでどちらを選ぶか整理。',
      badge: `${p.a.evidenceRank} vs ${p.b.evidenceRank}`,
    })
    if (out.length >= 2) break
  }

  // 2) ranking ページ（同悩みの成分ランキング）
  const concern = getConcern(concernSlug)
  if (concern) {
    out.push({
      type: 'concern',
      href: `/ranking/${concernSlug}`,
      title: `${concern.nameJa}の成分ランキング`,
      description: 'エビデンスランクと論文数で並べた上位成分。',
      badge: 'ランキング',
    })
  }

  // 3) 関連悩み 1 件（同 category）
  const related = getRelatedConcerns(concernSlug, 1)
  if (related[0]) {
    const guideExists = CONCERN_GUIDE_SLUGS.has(related[0].slug)
    out.push({
      type: 'concern',
      href: guideExists
        ? `/articles/${related[0].slug}${SUPPLEMENT_GUIDE_SUFFIX}`
        : `/concerns/${related[0].slug}`,
      title: `関連の悩み：${related[0].nameJa}`,
      description: related[0].description,
      badge: '関連カテゴリ',
    })
  }

  return out.slice(0, 4)
}
