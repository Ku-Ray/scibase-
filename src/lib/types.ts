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

/**
 * 公的データベース・権威機関の参照リンク。
 * E-E-A-T 信頼性スコア・AI Overviews 引用ソース対策。
 * hfnet（国立健康・栄養研究所）/ ejim（厚労省 統合医療情報）を主軸に、
 * NIH ODS / NCCIH 英語原典も併記。CiNii・J-STAGE 等は次フェーズで拡張。
 */
export interface PublicDbReference {
  /** データソース識別子 */
  source: 'hfnet' | 'ejim' | 'nih-ods' | 'nccih' | 'cinii' | 'jstage' | 'mhlw' | 'caa'
  /** 表示用フルネーム（例: "国立健康・栄養研究所「健康食品」の安全性・有効性情報"） */
  fullName: string
  /** 外部URL（リンクは rel="noopener noreferrer nofollow external" 必須） */
  url: string
  /** 最終アクセス日（YYYY-MM-DD） */
  accessedAt: string
  /** 短い参照タイトル（20-50字）。例: "安全性・耐容上限・相互作用情報あり" */
  note: string
}

export interface Product {
  name: string
  brand: string
  platform: 'iherb' | 'amazon' | 'cosme'
  url: string
  priceJpy: number
  /** 1粒/1錠/1ソフトジェルあたりの含有量（mg）。`unitsPerDay` と乗じて1日量を算出 */
  dosageMg?: number
  /** 推奨摂取数（1日あたりの粒/錠数）。`dosageMg * unitsPerDay >= ing.dosageMin` で論文有効量充足を判定 */
  unitsPerDay?: number
  /** 商品の表示%濃度（外用商品向け）。例: ナイアシンアミド10%なら 10。`>= ing.concentrationMinPct` で論文整合を判定 */
  concentrationPct?: number
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
  /** 商品画像URL（Amazon/iHerbの公開imageURLをリンク参照のみ・自前ホスト/改変NG） */
  imageUrl?: string
  /** 配送目安（「翌日配送」「7-14日」等） */
  shippingNote?: string
  /** 初回購入特典（「初回20% off」等） */
  firstOrderDiscount?: string
  /** ベネフィット見出し（20-30字）。「[条件]の人に向く・[特徴]も好評」等。断定NG */
  benefitHeading?: string
  /** 詳細説明（150-250字・3-5文）。誰向け・なぜこれか・モニター/論文の声・注意点 */
  descriptionLong?: string
  /** 良い点（3項目程度・客観事実のみ・断定NG） */
  pros?: string[]
  /** 気になる点（3項目程度・客観事実のみ・「効かない」等の断定NG） */
  cons?: string[]

  // ─── ASP連携（2026-05-W2 追加・GA4 click_outbound_product 拡張用） ─────────────
  /** ASP事業者識別子。'a8' / 'moshimo' / 'afb' / 'amazon-direct' / 'iherb-direct' / 'cosme-direct' / 'rakuten' */
  aspProgram?: 'a8' | 'moshimo' | 'afb' | 'amazon-direct' | 'iherb-direct' | 'cosme-direct' | 'rakuten'
  /** ASP案件識別子（GA4ディメンション・例: 'a8-doctorscare-ashwagandha'）。undefined=直URL */
  aspId?: string
  /** ASPキャンペーン名（人間可読・任意・例: 'doctors-care-ashwagandha-promo-2026q2'） */
  aspCampaignId?: string
  /** 料率帯（GA4の文字列ディメンション・段階分類）。実料率は規約上の第三者開示NGリスクがあるため帯化して送信 */
  commissionRateBand?: '<5%' | '5-10%' | '10-15%' | '15-20%' | '>20%'
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

/**
 * 検査キット商品（Pattern A=成分ページ / Pattern B=悩みガイド 共通型）。
 * Phase B 高単価ASP収益基盤。ASP URL確定前は '#asp-pending' プレースホルダで運用。
 */
export interface TestKitProduct {
  name: string
  brand: string
  /** ASPアフィURL（未確定時は '#asp-pending'） */
  url: string
  /** 1キット単価 */
  priceJpy: number
  /** 検査タイプ */
  testType: 'dna' | 'gut' | 'nutrient' | 'hormone' | 'allergy'
  /** 検体タイプ */
  sampleType: '唾液' | '血液' | '便' | '尿' | '毛髪'
  /** 結果出るまで日数 */
  resultDays: number
  /** なぜこの検査か・80-120字 */
  whyJa: string
  /** 「初回送料無料」等の特典 */
  badge?: string
  /** Legal: 個人情報管理方針URL（DNA検査は必須） */
  privacyPolicyUrl?: string
  /** Legal: PR・rel=sponsored 必須フラグ（常にtrue） */
  isSponsored: true
}

/** 成分ページ用 検査キットCTA（Pattern A・ProductOfferCard 手前配置） */
export interface IngredientTestKitCTA {
  /** 例:「サプリを買う前に、まず測る」 */
  headline: string
  /** 80-150字・なぜこの成分で検査が有用か */
  body: string
  products: TestKitProduct[]
  /** Legal: 検査キット固有の必須併記文（全表示） */
  medicalDisclaimer?: string
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
  /**
   * 公的DB・権威機関の参照リンク（hfnet 等）。
   * YMYL厳格KW（[成分] 副作用 / 安全性 / 相互作用）対策・E-E-A-T差別化。
   * 未設定時はUI非表示。掲載なし成分は省略可。
   */
  publicDbReferences?: PublicDbReference[]
  dosageMin?: number
  dosageMax?: number
  dosageUnit: string
  /** 外用成分の論文使用最小濃度（%）。topical/both で使用。商品の concentrationPct >= これで論文整合 */
  concentrationMinPct?: number
  /** 外用成分の標準使用最大濃度（%）。論文での標準範囲の上限・参考値 */
  concentrationMaxPct?: number
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
  /** 推奨フォーム（成分の形態指定。「鉄」→「Iron Bisglycinate」等、曖昧成分の検索精度向上用） */
  recommendedForm?: {
    /** 英語フォーム名（iHerb検索クエリ用）例: "Iron Bisglycinate" */
    en: string
    /** 日本語フォーム名 例: "ビスグリシン酸鉄" */
    ja: string
    /** なぜこのフォームか（薬機法準拠・断定なし） */
    reason: string
    /** 許容代替フォーム */
    alternativeForms?: string[]
    /** 避けるべきフォーム（吸収率低・副作用多等） */
    avoidForms?: string[]
  }
  /** Pattern A 検査キットCTA（任意・該当成分のみ設定・ProductOfferCard 手前に描画） */
  testKitCTA?: IngredientTestKitCTA
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
  /** 商品カード末尾の推薦理由を記事文脈に沿って上書き（未設定時は汎用「6軸スコアで...」） */
  bestPickReason?: string
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

/** Pillar記事用のH3サブセクション（scienceBody直下にH3群として描画） */
export interface ArticleSubsection {
  heading: string
  body: string
}

/** Pillar記事用の追加H2セクション（位置はpositionで制御・デフォルトはsolutionの前） */
export interface ArticleAppendixSection {
  heading: string
  body: string
  /** 表示位置：'before-solution'（既定・science後）or 'after-solution'（solution後・B路線CV機の意思決定誘導） */
  position?: 'before-solution' | 'after-solution'
}

/** ItemList JSON-LD 用（「まず始めるべき3成分」等のリッチリザルト狙い） */
export interface ArticleItemList {
  /** リスト名（例: 「30代から始めるべき3成分」） */
  name: string
  /** 各アイテム（成分slug参照） */
  items: { ingredientSlug: string; rank: number }[]
}

export interface Article {
  slug: string
  title: string
  description: string
  /** SEO 用タイトル（meta title 専用・H1 とは独立して CTR最適化）。省略時は title にフォールバック */
  seoTitle?: string
  /** SEO 用 meta description（H1 直下の description より長く・KW込みで設計）。省略時は description にフォールバック */
  seoDescription?: string
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
  /** scienceBody直下に描画するH3群（Pillar記事用・任意） */
  subsections?: ArticleSubsection[]
  /** solutionHeadingの前に挿入する追加H2群（Pillar記事用・任意） */
  appendixSections?: ArticleAppendixSection[]
  solutionHeading: string
  solutionBody: string
  /** ItemList JSON-LD（リッチリザルト用・任意） */
  itemList?: ArticleItemList
  ingredients: ArticleIngredientCTA[]
  faqs: ArticleFAQ[]
  relatedIngredientSlugs: string[]
  relatedArticleSlugs?: string[]
  /** 関連する悩みカテゴリ（concern slug）。悩みページの「関連記事」表示で使用 */
  concerns?: string[]
  /** 著者署名（E-E-A-T／Article JSON-LD author 用・省略時はデフォルト編集者を採用） */
  author?: {
    name: string
    role: string
    url: string
  }
  /** Article JSON-LD dateModified。省略時は updatedAt → publishedAt の順でフォールバック */
  dateModified?: string
}
