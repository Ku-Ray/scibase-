import type { Ingredient, Product } from './types'

export type EffectiveDoseStatus = 'sufficient' | 'partial' | 'insufficient' | 'unknown'

export type ScoreAxis =
  | 'evidence'
  | 'thirdParty'
  | 'cost'
  | 'certification'
  | 'shipping'
  | 'purity'

export const AXIS_LABEL: Record<ScoreAxis, string> = {
  evidence: '論文整合',
  thirdParty: '第三者検査',
  cost: 'コスパ',
  certification: '認証',
  shipping: '配送',
  purity: '純度',
}

export interface ProductScore {
  /** 1日あたり摂取量（mg）。dosageMg × unitsPerDay。算出不能なら null */
  dailyDoseMg: number | null
  /** 論文有効量充足率（0〜1.2 でクリップ）。null は算出不能 */
  effectiveDoseRatio: number | null
  /** 充足ステータス（UI の ✅/⚠️ 二値判定用） */
  effectiveDoseStatus: EffectiveDoseStatus
  /** 論文整合（1〜5）。算出不能なら null */
  evidenceScore: number | null
  /** 第三者検査（1〜5） */
  thirdPartyScore: number
  /** コスパ（1〜5）。同成分内 monthlyCostJpy の分布から逆算。算出不能なら null */
  costScore: number | null
  /** 認証（1〜5）。補助軸 */
  certificationScore: number
  /** 配送（1〜5）。プラットフォーム別ヒューリスティック */
  shippingScore: number
  /** 純度（1〜5）。GMO/Organic/cleaner forms 等 */
  purityScore: number
  /** 単純平均総合スコア（1.0〜5.0・参考用・UI主軸には使わない） */
  totalScore: number
  /**
   * SciBase 推奨度（1.0〜5.0）。論文整合40% + 第三者検査25% + 認証15% +
   * 純度10% + コスパ5% + 配送5% の重み付き合成。UI主軸はこちら。
   * SciBase の編集方針（論文ベース・科学的選定）を反映した独自評価。
   */
  recommendationScore: number
  /** ¥/mg 有効成分単価。算出不能なら null */
  unitCostPerMg: number | null
}

function calcEvidenceScore(
  dailyDoseMg: number | null,
  dosageMin: number | undefined,
): { ratio: number | null; score: number | null; status: EffectiveDoseStatus } {
  if (dailyDoseMg == null || dosageMin == null || dosageMin <= 0) {
    return { ratio: null, score: null, status: 'unknown' }
  }
  const ratio = dailyDoseMg / dosageMin
  const score = ratio >= 1 ? 5 : Math.max(1, Math.round(ratio * 5))
  const status: EffectiveDoseStatus =
    ratio >= 1 ? 'sufficient' : ratio >= 0.5 ? 'partial' : 'insufficient'
  return { ratio: Math.min(ratio, 1.2), score, status }
}

function calcThirdPartyScore(p: Product): number {
  if (p.heavyMetalTested && p.thirdPartyTested) return 5
  if (p.heavyMetalTested || p.thirdPartyTested) return 4
  return 2
}

function calcCertificationScore(p: Product): number {
  const certs = p.certifications ?? []
  if (certs.includes('NSF') || certs.includes('USP') || certs.includes('InformedSport')) return 5
  if (certs.includes('GMP')) return 4
  return 3
}

function calcCostScore(target: Product, peers: Product[]): number | null {
  if (target.monthlyCostJpy == null) return null
  const costs = peers
    .map(p => p.monthlyCostJpy)
    .filter((c): c is number => typeof c === 'number')
  if (costs.length <= 1) return 3
  const min = Math.min(...costs)
  const max = Math.max(...costs)
  if (max === min) return 3
  const norm = (target.monthlyCostJpy - min) / (max - min)
  return Math.max(1, Math.round(5 - norm * 4))
}

/**
 * 配送スコア（プラットフォーム別ヒューリスティック）。
 * shippingNote が指定されていれば文字列から推定し、無ければ platform で代替。
 */
function calcShippingScore(p: Product): number {
  const note = p.shippingNote ?? ''
  if (note) {
    if (/翌日|当日|即日/.test(note)) return 5
    if (/2-3日|2〜3日|国内/.test(note)) return 4
    if (/7-14日|7〜14日|海外/.test(note)) return 3
    if (/2週間|2-3週/.test(note)) return 2
  }
  if (p.platform === 'amazon') return 5
  if (p.platform === 'cosme') return 4
  if (p.platform === 'iherb') return 3
  return 3
}

/**
 * 純度スコア（GMO/Organic/cleaner forms）。認証スコアと一部相関するが独立軸として扱う。
 */
function calcPurityScore(p: Product): number {
  const certs = p.certifications ?? []
  const hasOrganic = certs.includes('Organic')
  const hasNonGmo = certs.includes('NonGMO')
  if (hasOrganic && hasNonGmo) return 5
  if (hasOrganic || hasNonGmo) return 4
  if (certs.includes('NSF') || certs.includes('USP')) return 4
  if (certs.includes('GMP')) return 3
  return 2
}

function calcTotalScore(s: Omit<ProductScore, 'totalScore' | 'recommendationScore' | 'unitCostPerMg'>): number {
  // null 軸は除外して算出（欠損を中立3で埋めない・/about#scoring 公開ロジック）
  const axes = [
    s.evidenceScore,
    s.thirdPartyScore,
    s.costScore,
    s.certificationScore,
    s.shippingScore,
    s.purityScore,
  ].filter((v): v is number => v != null)
  if (axes.length === 0) return 1.0
  const sum = axes.reduce((a, b) => a + b, 0)
  return Math.round((sum / axes.length) * 10) / 10
}

/**
 * SciBase 推奨度：論文整合と第三者検査を強く重み付けした合成スコア。
 * 論文ベース×科学的選定という SciBase の編集方針を数値化したもの。
 * 1位商品は通常 ★4.5 以上になる設計（mybest が 1位 ★5.00 にしているのと同じ役割）。
 *
 * null 軸は重みから除外し、残り軸の重みで再正規化する（欠損を中立3で埋めない）。
 * これにより「データが揃わない商品が中位スコアで実態より高く見える」バイアスを排除。
 * 算出基準は /about#scoring で全公開（景表法・優良誤認の予防）。
 */
function calcRecommendationScore(s: Omit<ProductScore, 'totalScore' | 'recommendationScore' | 'unitCostPerMg'>): number {
  const axes: { value: number | null; weight: number }[] = [
    { value: s.evidenceScore, weight: 0.40 },
    { value: s.thirdPartyScore, weight: 0.25 },
    { value: s.certificationScore, weight: 0.15 },
    { value: s.purityScore, weight: 0.10 },
    { value: s.costScore, weight: 0.05 },
    { value: s.shippingScore, weight: 0.05 },
  ]
  // null 軸を除外して残り重みで再正規化
  const valid = axes.filter((a): a is { value: number; weight: number } => a.value != null)
  if (valid.length === 0) return 1.0
  const totalWeight = valid.reduce((sum, a) => sum + a.weight, 0)
  const weighted = valid.reduce((sum, a) => sum + (a.value / 5) * a.weight, 0) / totalWeight
  // 0-1 を 1.0-5.0 にスケール（最低でも 1.0）
  const score = Math.max(1, weighted * 5)
  return Math.round(score * 10) / 10
}

function calcUnitCost(p: Product, dailyDoseMg: number | null): number | null {
  if (p.monthlyCostJpy == null || dailyDoseMg == null || dailyDoseMg <= 0) return null
  // 月¥X / (1日あたりmg × 30日) = ¥/mg有効成分
  return Math.round((p.monthlyCostJpy / (dailyDoseMg * 30)) * 100) / 100
}

export function scoreProduct(product: Product, ingredient: Ingredient): ProductScore {
  const dailyDoseMg =
    product.dosageMg != null && product.unitsPerDay != null
      ? product.dosageMg * product.unitsPerDay
      : product.dosageMg ?? null
  const evidence = calcEvidenceScore(dailyDoseMg, ingredient.dosageMin)
  const partial: Omit<ProductScore, 'totalScore' | 'recommendationScore' | 'unitCostPerMg'> = {
    dailyDoseMg,
    effectiveDoseRatio: evidence.ratio,
    effectiveDoseStatus: evidence.status,
    evidenceScore: evidence.score,
    thirdPartyScore: calcThirdPartyScore(product),
    costScore: calcCostScore(product, ingredient.products),
    certificationScore: calcCertificationScore(product),
    shippingScore: calcShippingScore(product),
    purityScore: calcPurityScore(product),
  }
  return {
    ...partial,
    totalScore: calcTotalScore(partial),
    recommendationScore: calcRecommendationScore(partial),
    unitCostPerMg: calcUnitCost(product, dailyDoseMg),
  }
}

/**
 * 軸別スコアを「強い順」に並べ替えて返す（mybest 風レイアウト用）。
 * コスパ★1/5 等の弱点が冒頭に出ると購買意欲を削ぐので強み優先で表示する。
 */
export function axisDisplayOrder(score: ProductScore): { axis: ScoreAxis; label: string; value: number | null }[] {
  const axes: { axis: ScoreAxis; value: number | null }[] = [
    { axis: 'evidence', value: score.evidenceScore },
    { axis: 'thirdParty', value: score.thirdPartyScore },
    { axis: 'cost', value: score.costScore },
    { axis: 'certification', value: score.certificationScore },
    { axis: 'shipping', value: score.shippingScore },
    { axis: 'purity', value: score.purityScore },
  ]
  // 値あり高スコア → 値あり低スコア → null（データ不足）の順
  return axes
    .map(a => ({ ...a, label: AXIS_LABEL[a.axis] }))
    .sort((a, b) => {
      if (a.value == null && b.value == null) return 0
      if (a.value == null) return 1
      if (b.value == null) return -1
      return b.value - a.value
    })
}

/**
 * 商品の最大スコア軸を返す（「強み」を主軸に出すため）。
 * 同点は順位（evidence > thirdParty > certification > purity > shipping > cost）で決定。
 * Mybest が「SPF高さ No.1」のように勝ち軸を主軸表示するのに相当。
 */
export function topAxis(score: ProductScore): { axis: ScoreAxis; label: string; value: number } | null {
  const candidates: { axis: ScoreAxis; value: number | null }[] = [
    { axis: 'evidence', value: score.evidenceScore },
    { axis: 'thirdParty', value: score.thirdPartyScore },
    { axis: 'certification', value: score.certificationScore },
    { axis: 'purity', value: score.purityScore },
    { axis: 'shipping', value: score.shippingScore },
    { axis: 'cost', value: score.costScore },
  ]
  const valid = candidates.filter((c): c is { axis: ScoreAxis; value: number } => c.value != null)
  if (valid.length === 0) return null
  const max = Math.max(...valid.map(c => c.value))
  if (max < 4) return null // 4未満を「強み」と呼べない
  const top = valid.find(c => c.value === max)!
  return { axis: top.axis, label: AXIS_LABEL[top.axis], value: top.value }
}

export interface AxisLeader {
  axis: ScoreAxis
  axisLabel: string
  /** リーダー商品の URL 集合（同点許容） */
  leaderUrls: Set<string>
  /** リーダーのスコア値（表示用） */
  score: number
}

/**
 * 成分の products[] を走査して各軸の最高スコア商品を特定する。
 * 「[軸]No.1（当サイト掲載商品中）」バッジ自動算出に使用。
 * 単一商品しか無い軸はリーダーとして返さない（No.1演出が成立しないため）。
 */
export function computeAxisLeaders(ingredient: Ingredient): AxisLeader[] {
  const products = ingredient.products
  if (products.length < 2) return [] // 1商品のみではNo.1演出不要

  const scores = products.map(p => ({ p, s: scoreProduct(p, ingredient) }))
  const axes: { axis: ScoreAxis; getter: (s: ProductScore) => number | null }[] = [
    { axis: 'evidence', getter: s => s.evidenceScore },
    { axis: 'thirdParty', getter: s => s.thirdPartyScore },
    { axis: 'cost', getter: s => s.costScore },
    { axis: 'certification', getter: s => s.certificationScore },
    { axis: 'shipping', getter: s => s.shippingScore },
    { axis: 'purity', getter: s => s.purityScore },
  ]

  const leaders: AxisLeader[] = []
  for (const { axis, getter } of axes) {
    const valid = scores.filter(({ s }) => getter(s) != null) as { p: Product; s: ProductScore }[]
    if (valid.length === 0) continue
    const max = Math.max(...valid.map(({ s }) => getter(s) as number))
    if (max < 4) continue // 4未満はNo.1として誇張になるので除外（景表法・誠実性）
    const leadersAtMax = valid.filter(({ s }) => (getter(s) as number) === max)
    // 全商品が同点ならNo.1演出が成立しない
    if (leadersAtMax.length === valid.length && valid.length === products.length) continue
    leaders.push({
      axis,
      axisLabel: AXIS_LABEL[axis],
      leaderUrls: new Set(leadersAtMax.map(({ p }) => p.url)),
      score: max,
    })
  }
  return leaders
}
