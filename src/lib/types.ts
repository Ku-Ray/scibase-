export type EvidenceRank = 'S' | 'A' | 'B' | 'C'

export interface Paper {
  title: string
  journal: string
  year: number
  studyType: 'meta-analysis' | 'rct' | 'cohort' | 'observational' | 'animal'
  sampleSize?: number
  durationWeeks?: number
  keyFinding: string
}

export interface Product {
  name: string
  brand: string
  platform: 'iherb' | 'amazon' | 'rakuten'
  url: string
  priceJpy: number
  dosageMg?: number
  note?: string
}

export interface Ingredient {
  slug: string
  nameJa: string
  nameEn: string
  evidenceRank: EvidenceRank
  tagline: string
  description: string
  concerns: string[]   // concern slugs
  papers: Paper[]
  dosageMin?: number
  dosageMax?: number
  dosageUnit: string
  timing?: string
  duration?: string
  sideEffects?: string[]
  contraindications?: string[]
  products: Product[]
  updatedAt: string
}

export interface Concern {
  slug: string
  nameJa: string
  category: 'skin' | 'body' | 'cognitive' | 'sleep' | 'gut' | 'immunity'
  description: string
  ingredientSlugs: string[]
}
