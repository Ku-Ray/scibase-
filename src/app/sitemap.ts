import type { MetadataRoute } from 'next'
import { ingredients, concerns } from '@/lib/data'
import { articles } from '@/lib/articles'
import { POPULAR_PAIRS } from '@/lib/compare-data'

const BASE_URL = 'https://scibase.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                    lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/ingredients`,   lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/concerns`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/ranking`,       lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/compare`,       lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE_URL}/articles`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE_URL}/analyzer`,      lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/about`,         lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const ingredientPages: MetadataRoute.Sitemap = ingredients.map((ing) => ({
    url:             `${BASE_URL}/ingredients/${ing.slug}`,
    lastModified:    ing.updatedAt,
    changeFrequency: 'monthly',
    priority:        0.8,
  }))

  const concernPages: MetadataRoute.Sitemap = concerns.map((c) => ({
    url:             `${BASE_URL}/concerns/${c.slug}`,
    lastModified:    now,
    changeFrequency: 'monthly',
    priority:        0.7,
  }))

  const rankingPages: MetadataRoute.Sitemap = concerns.map((c) => ({
    url:             `${BASE_URL}/ranking/${c.slug}`,
    lastModified:    now,
    changeFrequency: 'monthly',
    priority:        0.75,
  }))

  const comparePages: MetadataRoute.Sitemap = POPULAR_PAIRS.map(([slugA, slugB]) => ({
    url:             `${BASE_URL}/compare/${slugA}-vs-${slugB}`,
    lastModified:    now,
    changeFrequency: 'monthly',
    priority:        0.7,
  }))

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url:             `${BASE_URL}/articles/${a.slug}`,
    lastModified:    a.publishedAt,
    changeFrequency: 'monthly',
    priority:        0.8,
  }))

  return [
    ...staticPages,
    ...ingredientPages,
    ...concernPages,
    ...rankingPages,
    ...comparePages,
    ...articlePages,
  ]
}
