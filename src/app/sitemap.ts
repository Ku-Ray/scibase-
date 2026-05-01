import type { MetadataRoute } from 'next'
import { ingredients, concerns } from '@/lib/data'
import { articles } from '@/lib/articles'
import { concernGuides } from '@/lib/concern-guide-data'
import { SUPPLEMENT_GUIDE_SUFFIX } from '@/lib/concern-guide-utils'
import { POPULAR_PAIRS } from '@/lib/compare-data'

const BASE_URL = 'https://scibase.app'

export default function sitemap(): MetadataRoute.Sitemap {
  /* データ更新日から最終更新日を導出（ビルド時刻ではなくコンテンツ変更日をGoogleに伝える） */
  const latestIngredient = ingredients
    .map(i => i.updatedAt)
    .sort()
    .at(-1) ?? '2026-01-01'
  const latestArticle = articles
    .map(a => a.updatedAt ?? a.publishedAt)
    .sort()
    .at(-1) ?? '2026-01-01'
  const latestOverall = [latestIngredient, latestArticle].sort().at(-1)!

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                    lastModified: latestOverall,    changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/ingredients`,   lastModified: latestIngredient, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/concerns`,      lastModified: latestIngredient, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/ranking`,       lastModified: latestIngredient, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/compare`,       lastModified: latestIngredient, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE_URL}/articles`,      lastModified: latestArticle,    changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE_URL}/analyzer`,      lastModified: '2026-04-20',     changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/about`,         lastModified: '2026-04-20',     changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/privacy`,       lastModified: '2026-04-25',     changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const ingredientPages: MetadataRoute.Sitemap = ingredients.map((ing) => ({
    url:             `${BASE_URL}/ingredients/${ing.slug}`,
    lastModified:    ing.updatedAt,
    changeFrequency: 'monthly',
    priority:        0.8,
  }))

  const concernPages: MetadataRoute.Sitemap = concerns.map((c) => ({
    url:             `${BASE_URL}/concerns/${c.slug}`,
    lastModified:    latestIngredient,
    changeFrequency: 'monthly',
    priority:        0.7,
  }))

  const rankingPages: MetadataRoute.Sitemap = concerns.map((c) => ({
    url:             `${BASE_URL}/ranking/${c.slug}`,
    lastModified:    latestIngredient,
    changeFrequency: 'monthly',
    priority:        0.75,
  }))

  const comparePages: MetadataRoute.Sitemap = POPULAR_PAIRS.map(([slugA, slugB]) => ({
    url:             `${BASE_URL}/compare/${slugA}-vs-${slugB}`,
    lastModified:    latestIngredient,
    changeFrequency: 'monthly',
    priority:        0.7,
  }))

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url:             `${BASE_URL}/articles/${a.slug}`,
    lastModified:    a.updatedAt ?? a.publishedAt,
    changeFrequency: 'monthly',
    priority:        0.8,
  }))

  /* 悩み解決ガイド記事（articles 配下に統合） */
  const concernGuidePages: MetadataRoute.Sitemap = concernGuides.map((g) => ({
    url:             `${BASE_URL}/articles/${g.concernSlug}${SUPPLEMENT_GUIDE_SUFFIX}`,
    lastModified:    g.updatedAt,
    changeFrequency: 'monthly',
    priority:        0.85,
  }))

  return [
    ...staticPages,
    ...ingredientPages,
    ...concernPages,
    ...rankingPages,
    ...comparePages,
    ...articlePages,
    ...concernGuidePages,
  ]
}
