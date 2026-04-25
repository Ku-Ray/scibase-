export type EvidenceRank = 'S' | 'A' | 'B' | 'C'

export interface Paper {
  title: string
  journal: string
  year: number
  studyType: 'meta-analysis' | 'rct' | 'cohort' | 'observational' | 'animal'
  sampleSize?: number
  durationWeeks?: number
  keyFinding: string
  /** PubMed ID — リンクは https://pubmed.ncbi.nlm.nih.gov/{pmid}/ */
  pmid?: string
  /** DOI — リンクは https://doi.org/{doi} */
  doi?: string
  /** その他直接リンク（出版社サイト等）。pmid/doi優先 */
  url?: string
}

export interface Product {
  name: string
  brand: string
  platform: 'iherb' | 'amazon' | 'cosme'
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
  /** 検索用の別名・略称・関連表記（例：「ビタミンC」→「VC」「アスコルビン酸」） */
  aliases?: string[]
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
  /** SEO用タイトル上書き。未設定時は自動生成。`| SciBase`は layout template で自動付与 */
  seoTitle?: string
  /** SEO用ディスクリプション上書き。未設定時は自動生成 */
  seoDescription?: string
  /** 用量別の効果（用量×効果が論文で別々に確認されている成分用・任意） */
  dosageLevels?: {
    dose: string
    category: string
    effect: string
    whoFor: string
    evidenceNote?: string
  }[]
  /** 成分固有のFAQ（自動生成FAQの後ろに追加・任意） */
  customFaqs?: { q: string; a: string }[]
  /** 医薬品・他サプリとの相互作用（併用注意・回避） */
  interactions?: {
    /** 対象物質（一般名のみ・商品名禁止）例: "経口避妊薬（ピル）" "ワルファリン" "SSRI系抗うつ薬" */
    substance: string
    /** 併用レベル：avoid=併用回避 / caution=要注意 / monitor=要経過観察 */
    level: 'avoid' | 'caution' | 'monitor'
    /** 作用機序（1-2文・非断定表現）例: "血栓リスク増加の可能性が報告されている" */
    mechanism: string
    /** 推奨される行動（必ず「医師・薬剤師に相談」を含める） */
    action: string
    /** エビデンス：established=添付文書/臨床報告多数 / theoretical=薬理推定 / case-report=事例報告 */
    evidence: 'established' | 'theoretical' | 'case-report'
    /** 出典（添付文書名・FDA・ジャーナル名等） */
    source?: string
  }[]
  updatedAt: string
}

export interface Concern {
  slug: string
  nameJa: string
  emoji: string
  category: 'skin' | 'body' | 'cognitive' | 'sleep' | 'gut' | 'immunity' | 'muscle' | 'cardiovascular'
  description: string
  /** 検索用の同義語・別名・関連語（例：「肌の老化」→「エイジング」「ハリ低下」「くすみ」）。検索ヒット率向上のため。 */
  aliases?: string[]
  ingredientSlugs: string[]
  /** なぜこの悩みが起きるか（3ステップ）・推奨成分の論理的前振りとして表示 */
  mechanism?: {
    cause: string      // 原因：体で何が起きているか
    process: string    // 機序：それがどう老化を加速させるか
    direction: string  // 対策の方向性：Top 3成分への橋渡し
  }
  /** こういう人は特に注意（5-7項目）・自己関連リスクの提示で行動動機を強化 */
  riskProfile?: string[]
  /** SEO用タイトル上書き。未設定時は自動生成。`| SciBase`は layout template で自動付与 */
  seoTitle?: string
  /** SEO用ディスクリプション上書き。未設定時は自動生成 */
  seoDescription?: string
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
  productPlatform?: 'iherb' | 'amazon'
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
  /** 記事本文・JSON-LDが最後に更新された日。省略時は publishedAt にフォールバック */
  updatedAt?: string
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
  relatedArticleSlugs?: string[]
}
