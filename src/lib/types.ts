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
  platform: 'iherb' | 'amazon' | 'rakuten' | 'cosme'
  url: string
  priceJpy: number
  dosageMg?: number
  note?: string
  /** おすすめ順位（1=最推奨） */
  rank?: 1 | 2 | 3
  /** なぜこれを選ぶか（1行） */
  reasonJa?: string
  /** 1ヶ月あたりコスト（円） */
  monthlyCostJpy?: number
  /** ハイライトタグ（「コスパ最強」「初心者向け」等） */
  highlight?: string
  /** 剤形（カプセル / 錠剤 / 粉末 / 液体 / クリーム / セラム 等） */
  form?: string
  /** 第三者検査機関による品質確認あり */
  thirdPartyTested?: boolean
  /** 重金属（水銀・鉛・カドミウム・砒素）の検査結果公開あり */
  heavyMetalTested?: boolean
  /** 取得している品質認証 */
  certifications?: ('NSF' | 'USP' | 'InformedSport' | 'GMP' | 'NonGMO' | 'Organic')[]
  /** 品質に関する補足メモ */
  qualityNote?: string
}

export type AnalysisAxis =
  | 'antiAging'   // 抗老化
  | 'skin'        // 肌老化
  | 'cognitive'   // 脳・認知
  | 'stress'      // ストレス対策
  | 'sleep'       // 睡眠・回復
  | 'immunity'    // 免疫・炎症
  | 'metabolism'  // 代謝・エネルギー

export interface AxisScores {
  antiAging?:  number  // 0–10
  skin?:       number
  cognitive?:  number
  stress?:     number
  sleep?:      number
  immunity?:   number
  metabolism?: number
}

export interface Ingredient {
  slug: string
  nameJa: string
  nameEn: string
  evidenceRank: EvidenceRank
  /** 'topical'=外用, 'oral'=経口, 'both'=両方 。省略時は'oral' */
  usageType?: 'topical' | 'oral' | 'both'
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
  axisScores?: AxisScores
  emerging?: boolean   // 注目成分フラグ（論文少ないが研究注目度高）
  /** この成分が特に向いている人（チェックリスト形式） */
  whoFor?: string[]
  /** ヒーローエリアに大きく表示するキー統計 */
  heroStat?: { value: string; label: string }
  updatedAt: string
}

export interface Concern {
  slug: string
  nameJa: string
  emoji: string
  category: 'skin' | 'body' | 'cognitive' | 'sleep' | 'gut' | 'immunity' | 'muscle' | 'cardiovascular'
  description: string
  ingredientSlugs: string[]
}

// ─── Article（コラム記事） ────────────────────────────────────────

export type ArticleCategory = 'anti-aging' | 'skin' | 'sleep' | 'supplement'

export interface ArticleIngredientCTA {
  slug: string
  nameJa: string
  reason: string
  evidenceRank: EvidenceRank
  /** 商品CTAボタン直前に表示する緊急性テキスト（損失回避の最終押し） */
  urgencyNote?: string
  productName?: string
  productUrl?: string
  productPlatform?: 'iherb' | 'amazon' | 'rakuten'
  productPriceJpy?: number
  productHighlight?: string
}

export interface ArticleFAQ {
  question: string
  answer: string
}

export interface Article {
  slug: string
  title: string
  description: string
  category: ArticleCategory
  categoryLabel: string
  publishedAt: string
  readingMinutes: number
  /** ヒーロー数値（アンカリング） */
  heroStat: { value: string; label: string }
  /** 損失回避フック（冒頭1文） */
  lossAversionHook: string
  problemHeading: string
  problemBody: string
  scienceHeading: string
  scienceBody: string
  scienceStat?: { value: string; label: string }
  solutionHeading: string
  solutionBody: string
  ingredients: ArticleIngredientCTA[]
  faqs: ArticleFAQ[]
  relatedIngredientSlugs: string[]
}
