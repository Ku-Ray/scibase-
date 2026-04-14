import type { MetadataRoute } from 'next'
import { ingredients, concerns } from '@/lib/data'

const BASE_URL = 'https://agescience.jp'

const COMPARE_PAIRS = [
  ['retinol', 'bakuchiol'],
  ['retinol', 'retinal'],
  ['niacinamide', 'vitamin-c-topical'],
  ['hyaluronic-acid', 'ceramide'],
  ['collagen-peptide', 'vitamin-c-oral'],
  ['magnesium', 'ashwagandha'],
  ['vitamin-d', 'omega3'],
  ['resveratrol', 'astaxanthin'],
  ['glycolic-acid', 'salicylic-acid'],
  ['niacinamide', 'azelaic-acid'],
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                    lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/ingredients`,   lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/concerns`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/ranking`,       lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
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

  const comparePages: MetadataRoute.Sitemap = COMPARE_PAIRS.map(([a, b]) => ({
    url:             `${BASE_URL}/compare/${a}-vs-${b}`,
    lastModified:    now,
    changeFrequency: 'monthly',
    priority:        0.7,
  }))

  return [...staticPages, ...ingredientPages, ...concernPages, ...rankingPages, ...comparePages]
}
