/**
 * my-stack.ts
 *
 * /tools/my-stack（サプリ棚管理）の核ロジック。
 *
 * - 棚（StackItem[]）は localStorage 'scibase_my_stack' に保存（サーバー送信なし）
 * - 相互作用は既存 checkInteractions()（成分×成分 + 成分×薬 canonical）を再利用
 * - 重複・上限は SUPPLEMENT_SLUG_TO_NUTRIENT + 厚労省 食事摂取基準 2020 の UL を再利用
 * - 月額コストは data.ts products[]（rank 1 製品の monthlyCostJpy）を集計
 * - data.ts は読み取りのみ（並走 ingredient セッションと無干渉）
 */

import { getIngredient, ingredients } from './data'
import { checkInteractions, type InteractionResult } from './interaction'
import {
  SUPPLEMENT_INPUT_UNIT,
  SUPPLEMENT_PRESETS,
  SUPPLEMENT_SLUG_TO_NUTRIENT,
} from './food-nutrient'
import { NUTRIENT_META, RDA_2020, type AgeGroup } from './nutrient-rda'
import type { Product } from './types'

export const STACK_STORAGE_KEY = 'scibase_my_stack'
export const STACK_RESULTS_KEY = 'scibase_my_stack_results'
export const STACK_RESULTS_MAX = 3

/* ─── データモデル ──────────────────────────────────────────────── */

export type StackTiming = 'morning' | 'noon' | 'night' | 'empty_stomach' | 'bedtime'

export const TIMING_ORDER: StackTiming[] = ['morning', 'noon', 'night', 'empty_stomach', 'bedtime']

export const TIMING_LABEL: Record<StackTiming, string> = {
  morning: '朝',
  noon: '昼',
  night: '夜',
  empty_stomach: '空腹時',
  bedtime: '就寝前',
}

export const TIMING_EMOJI: Record<StackTiming, string> = {
  morning: '☀️',
  noon: '🌤️',
  night: '🌙',
  empty_stomach: '⏳',
  bedtime: '🛏️',
}

export interface StackItem {
  /** data.ts の ingredient slug（実在必須） */
  slug: string
  /** 任意・1 日量（getDoseUnit(slug) の単位） */
  dose?: number
  /** 飲むタイミング（複数可・未設定可） */
  timing: StackTiming[]
}

export interface MyStackData {
  items: StackItem[]
  /** 服用中の薬（interaction-canonical の key） */
  meds: string[]
  updatedAt: string
}

/** /my 集約用の分析スナップショット（履歴 3 件） */
export interface SavedStackResult {
  savedAt: string
  itemCount: number
  medCount: number
  score: number
  checkpointCount: number
  totalMonthlyCost: number | null
  personality: { emoji: string; name: string; rarity: number }
}

/* ─── slug → 栄養素キー（重複・上限判定用） ─────────────────────── */

/**
 * SUPPLEMENT_SLUG_TO_NUTRIENT の拡張。
 * data.ts の実 slug（vitamin-c-oral 等）と栄養素 key のズレを吸収する。
 */
export const STACK_SLUG_TO_NUTRIENT: Record<string, string> = {
  ...SUPPLEMENT_SLUG_TO_NUTRIENT,
  'vitamin-c-oral': 'vitamin_c',
  'magnesium-glycinate': 'magnesium',
  niacinamide: 'niacin',
}

/* ─── 棚プリセット（ワンタップ追加） ────────────────────────────── */

export interface StackPreset {
  slug: string
  labelJa: string
  emoji: string
  typicalDose: number
  unit: string
  descJa: string
}

/**
 * SUPPLEMENT_PRESETS を data.ts 実在 slug に補正した棚用プリセット。
 * - vitamin-c → vitamin-c-oral（data.ts の実 slug）
 * - multivitamin は data.ts に成分ページが無いため除外
 */
export const STACK_PRESETS: StackPreset[] = SUPPLEMENT_PRESETS
  .filter((p) => p.slug !== 'multivitamin')
  .map((p) => (p.slug === 'vitamin-c' ? { ...p, slug: 'vitamin-c-oral' } : p))
  .filter((p) => !!getIngredient(p.slug))

/** サンプル棚（初回の空棚から 1 タップで体験できる） */
export const SAMPLE_STACKS: { id: string; labelJa: string; emoji: string; items: StackItem[] }[] = [
  {
    id: 'basic',
    labelJa: '基本のミニマル棚',
    emoji: '🌿',
    items: [
      { slug: 'vitamin-d', dose: 25, timing: ['morning'] },
      { slug: 'magnesium', dose: 300, timing: ['bedtime'] },
      { slug: 'zinc', dose: 15, timing: ['night'] },
    ],
  },
  {
    id: 'beauty',
    labelJa: '美容サポート棚',
    emoji: '✨',
    items: [
      { slug: 'collagen-peptide', dose: 5000, timing: ['bedtime'] },
      { slug: 'vitamin-c-oral', dose: 500, timing: ['morning'] },
      { slug: 'hyaluronic-acid-oral', dose: 120, timing: ['night'] },
    ],
  },
  {
    id: 'aging',
    labelJa: 'エイジングケア棚',
    emoji: '🧬',
    items: [
      { slug: 'nmn', dose: 250, timing: ['morning'] },
      { slug: 'coq10', dose: 100, timing: ['morning'] },
      { slug: 'astaxanthin', dose: 12, timing: ['night'] },
      { slug: 'resveratrol', dose: 250, timing: ['morning'] },
    ],
  },
]

/* ─── 成分検索（棚に追加） ──────────────────────────────────────── */

export interface StackIngredientOption {
  slug: string
  nameJa: string
  nameEn: string
  aliases?: string[]
}

/**
 * 棚に追加できる成分一覧（経口のみ・topical 専用は除外）。
 */
export function getStackIngredientOptions(): StackIngredientOption[] {
  return ingredients
    .filter((i) => i.usageType !== 'topical')
    .map((i) => ({ slug: i.slug, nameJa: i.nameJa, nameEn: i.nameEn, aliases: i.aliases }))
}

/** 棚アイテムの用量入力単位 */
export function getDoseUnit(slug: string): string {
  const nutrientKey = STACK_SLUG_TO_NUTRIENT[slug]
  if (nutrientKey) {
    const mapped = SUPPLEMENT_INPUT_UNIT[slug] ?? NUTRIENT_META[nutrientKey]?.unit
    if (mapped) return mapped
  }
  return getIngredient(slug)?.dosageUnit ?? 'mg'
}

export function getStackItemName(slug: string): string {
  return getIngredient(slug)?.nameJa ?? slug
}

/* ─── 吸収競合（時間分離の提案） ────────────────────────────────── */

interface SeparationPairDef {
  a: string // nutrient key
  b: string // nutrient key
  noteJa: string
  actionJa: string
}

/**
 * 同時摂取で吸収競合の報告がある確立されたミネラルペア。
 * 出典は各成分ページの interactions / 公的 DB（NIH ODS 等）。
 */
const SEPARATION_PAIRS: SeparationPairDef[] = [
  {
    a: 'iron',
    b: 'calcium',
    noteJa: 'カルシウムは鉄の吸収を下げる可能性が報告されている組み合わせ。',
    actionJa: '2 時間以上ずらす（例：鉄は朝・カルシウムは夜）と競合を避けやすい。',
  },
  {
    a: 'iron',
    b: 'zinc',
    noteJa: '高用量の鉄と亜鉛は同時摂取で互いの吸収が競合する報告がある。',
    actionJa: '別の時間帯に分ける（例：鉄は朝・亜鉛は夜）と競合を避けやすい。',
  },
]

export interface SeparationFinding {
  aSlugs: string[]
  aNames: string[]
  bSlugs: string[]
  bNames: string[]
  /** 両者が同じタイミングに置かれている場合のみ true */
  hasOverlap: boolean
  overlapTimings: StackTiming[]
  noteJa: string
  actionJa: string
}

/* ─── 重複・上限 ────────────────────────────────────────────────── */

export interface DuplicateGroup {
  nutrientKey: string
  labelJa: string
  slugs: string[]
  names: string[]
  /** 用量入力済みアイテムの合計（全員未入力なら undefined） */
  totalDose?: number
  unit: string
  /** 全アイテムに用量が入力済みか（false なら合計は部分値） */
  allDosed: boolean
}

export interface UlFinding {
  nutrientKey: string
  labelJa: string
  slugs: string[]
  names: string[]
  totalDose: number
  unit: string
  ul: number
  ratio: number
  level: 'over' | 'near'
  /** UL がサプリ等の通常以外摂取のみ対象（鉄・マグネシウム） */
  ulExcludesFood: boolean
}

const ADULT_AGE_GROUPS: AgeGroup[] = ['20s', '30s', '40s', '50s', '60s', '70s+']

/**
 * 成人（18 歳以上・通常）の最小 UL を返す。
 * 年代・性別を聞かない棚ツールのため、最も厳しい成人基準で中立判定する。
 */
export function getConservativeUL(nutrientKey: string): number | null {
  let min: number | null = null
  for (const r of RDA_2020) {
    if (r.nutrient !== nutrientKey || r.lifeStage !== 'normal') continue
    if (!ADULT_AGE_GROUPS.includes(r.ageGroup)) continue
    if (r.ul == null) continue
    if (min == null || r.ul < min) min = r.ul
  }
  return min
}

/* ─── コスト ────────────────────────────────────────────────────── */

export interface CostRow {
  slug: string
  nameJa: string
  monthlyCostJpy?: number
  productName?: string
  brand?: string
}

/** rank 1（推奨順位 1 位）の製品。無ければ先頭 */
export function getTopProduct(slug: string): Product | null {
  const ing = getIngredient(slug)
  if (!ing || ing.products.length === 0) return null
  return ing.products.find((p) => p.rank === 1) ?? ing.products[0]
}

/* ─── 棚タイプ（PersonalityType） ───────────────────────────────── */

const ANTIOXIDANT_SLUGS = new Set([
  'vitamin-c-oral',
  'vitamin-e',
  'vitamin-e-tocotrienol-high',
  'tocotrienols',
  'astaxanthin',
  'coq10',
  'glutathione',
  'nac',
  'resveratrol',
  'selenium',
  'pqq',
  'quercetin',
  'fisetin',
  'egcg',
  'alpha-lipoic-acid',
  'ergothioneine',
  'carnosine',
  'lutein',
  'spirulina',
])

export interface StackPersonality {
  id: 'check' | 'maximal' | 'antioxidant' | 'costwise' | 'minimal' | 'balanced'
  emoji: string
  name: string
  desc: string
  /** 同タイプ %（推定・演出用） */
  rarity: number
  colorClass: string
}

/* ─── 分析結果 ──────────────────────────────────────────────────── */

export interface StackAnalysis {
  itemCount: number
  medCount: number
  interactions: InteractionResult[]
  interactionCounts: { avoid: number; caution: number; monitor: number }
  duplicates: DuplicateGroup[]
  ulFindings: UlFinding[]
  separations: SeparationFinding[]
  costRows: CostRow[]
  totalMonthlyCost: number
  costKnownCount: number
  costUnknownCount: number
  /** 確認ポイント合計（相互作用 + 上限 + 重複 + 同時間帯の競合） */
  checkpointCount: number
  /** 棚スコア（100 − 確認ポイントの重み合計・健康状態の評価ではない） */
  score: number
  /** 重複解消・時間分離を反映した場合のスコア（ユーザーが直せる分のみ） */
  optimizedScore: number
  antioxidantCount: number
  personality: StackPersonality
}

function clampScore(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)))
}

function determineStackPersonality(input: {
  itemCount: number
  hasCheckpoints: boolean
  antioxidantCount: number
  costKnownCount: number
  avgMonthlyCost: number | null
}): StackPersonality {
  const { itemCount, hasCheckpoints, antioxidantCount, costKnownCount, avgMonthlyCost } = input
  if (hasCheckpoints) {
    return {
      id: 'check',
      emoji: '🔍',
      name: '要確認ポイントあり型',
      desc: '医師・薬剤師に相談したい確認ポイントがある棚。整理の余地が見つかったのは前進',
      rarity: 21,
      colorClass: 'from-rose-500 to-orange-500',
    }
  }
  if (itemCount >= 8) {
    return {
      id: 'maximal',
      emoji: '🧺',
      name: '盛り盛り探究型',
      desc: '幅広くカバーする探究型の棚。重複とコストを定期的に棚卸しすると◎',
      rarity: 9,
      colorClass: 'from-violet-500 to-purple-500',
    }
  }
  if (antioxidantCount >= 3) {
    return {
      id: 'antioxidant',
      emoji: '🛡️',
      name: '抗酸化重視型',
      desc: '抗酸化系を軸に組んだ棚。論文の多い領域で SciBase と相性が良い',
      rarity: 13,
      colorClass: 'from-amber-500 to-orange-500',
    }
  }
  if (costKnownCount >= 2 && avgMonthlyCost != null && avgMonthlyCost <= 1200) {
    return {
      id: 'costwise',
      emoji: '💰',
      name: 'コスパ重視型',
      desc: '1 品あたり月額を抑えた効率重視の棚。継続しやすさは大きな強み',
      rarity: 17,
      colorClass: 'from-emerald-500 to-lime-500',
    }
  }
  if (itemCount <= 3) {
    return {
      id: 'minimal',
      emoji: '🌿',
      name: 'ミニマル型',
      desc: '少数精鋭の棚。「余計なものを足さない」方針は管理も継続もしやすい',
      rarity: 26,
      colorClass: 'from-emerald-500 to-teal-500',
    }
  }
  return {
    id: 'balanced',
    emoji: '⚖️',
    name: 'バランス型',
    desc: '主要カテゴリをほどよくカバーした棚。タイミング最適化で仕上がる',
    rarity: 24,
    colorClass: 'from-sky-500 to-blue-500',
  }
}

/* ─── メイン分析 ────────────────────────────────────────────────── */

export function analyzeStack(items: StackItem[], meds: string[]): StackAnalysis {
  const slugs = items.map((i) => i.slug)

  /* 1. 相互作用（成分×成分 + 成分×薬）— 既存ロジック再利用 */
  const interactions = checkInteractions(slugs, meds)
  const interactionCounts = { avoid: 0, caution: 0, monitor: 0 }
  for (const r of interactions) interactionCounts[r.level]++

  /* 2. 栄養素キーでグループ化 → 重複・上限 */
  const groups = new Map<string, StackItem[]>()
  for (const it of items) {
    const nk = STACK_SLUG_TO_NUTRIENT[it.slug]
    if (!nk) continue
    const arr = groups.get(nk)
    if (arr) arr.push(it)
    else groups.set(nk, [it])
  }

  const duplicates: DuplicateGroup[] = []
  const ulFindings: UlFinding[] = []
  for (const [nk, members] of groups) {
    const meta = NUTRIENT_META[nk]
    const labelJa = meta?.labelJa ?? nk
    const unit = meta?.unit ?? 'mg'
    const dosed = members.filter((m) => (m.dose ?? 0) > 0)
    const totalDose = dosed.reduce((s, m) => s + (m.dose ?? 0), 0)

    if (members.length >= 2) {
      duplicates.push({
        nutrientKey: nk,
        labelJa,
        slugs: members.map((m) => m.slug),
        names: members.map((m) => getStackItemName(m.slug)),
        totalDose: dosed.length > 0 ? totalDose : undefined,
        unit,
        allDosed: dosed.length === members.length,
      })
    }

    const ul = getConservativeUL(nk)
    if (ul != null && totalDose > 0) {
      const ratio = totalDose / ul
      if (ratio >= 0.8) {
        ulFindings.push({
          nutrientKey: nk,
          labelJa,
          slugs: dosed.map((m) => m.slug),
          names: dosed.map((m) => getStackItemName(m.slug)),
          totalDose,
          unit,
          ul,
          ratio,
          level: ratio >= 1 ? 'over' : 'near',
          ulExcludesFood: !!meta?.ulExcludesFood,
        })
      }
    }
  }

  /* 3. 吸収競合の時間分離提案 */
  const separations: SeparationFinding[] = []
  for (const pair of SEPARATION_PAIRS) {
    const aMembers = items.filter((i) => STACK_SLUG_TO_NUTRIENT[i.slug] === pair.a)
    const bMembers = items.filter((i) => STACK_SLUG_TO_NUTRIENT[i.slug] === pair.b)
    if (aMembers.length === 0 || bMembers.length === 0) continue
    const aTimings = new Set(aMembers.flatMap((m) => m.timing))
    const bTimings = new Set(bMembers.flatMap((m) => m.timing))
    const overlap = TIMING_ORDER.filter((t) => aTimings.has(t) && bTimings.has(t))
    separations.push({
      aSlugs: aMembers.map((m) => m.slug),
      aNames: aMembers.map((m) => getStackItemName(m.slug)),
      bSlugs: bMembers.map((m) => m.slug),
      bNames: bMembers.map((m) => getStackItemName(m.slug)),
      hasOverlap: overlap.length > 0,
      overlapTimings: overlap,
      noteJa: pair.noteJa,
      actionJa: pair.actionJa,
    })
  }

  /* 4. 月額コスト */
  const costRows: CostRow[] = items.map((it) => {
    const top = getTopProduct(it.slug)
    return {
      slug: it.slug,
      nameJa: getStackItemName(it.slug),
      monthlyCostJpy: top?.monthlyCostJpy,
      productName: top?.name,
      brand: top?.brand,
    }
  })
  const known = costRows.filter((r) => r.monthlyCostJpy != null)
  const totalMonthlyCost = known.reduce((s, r) => s + (r.monthlyCostJpy ?? 0), 0)

  /* 5. スコア（確認ポイントが少ないほど高い・健康状態の評価ではない） */
  const ulOver = ulFindings.filter((f) => f.level === 'over').length
  const ulNear = ulFindings.filter((f) => f.level === 'near').length
  const sepOverlap = separations.filter((s) => s.hasOverlap).length
  const fixableDeduction = duplicates.length * 6 + sepOverlap * 5
  const deduction =
    interactionCounts.avoid * 22 +
    interactionCounts.caution * 10 +
    interactionCounts.monitor * 4 +
    ulOver * 15 +
    ulNear * 7 +
    fixableDeduction
  const score = clampScore(100 - deduction)
  const optimizedScore = clampScore(100 - (deduction - fixableDeduction))
  const checkpointCount =
    interactions.length + ulOver + ulNear + duplicates.length + sepOverlap

  /* 6. 棚タイプ */
  const antioxidantCount = slugs.filter((s) => ANTIOXIDANT_SLUGS.has(s)).length
  const hasCheckpoints =
    interactionCounts.avoid > 0 || interactionCounts.caution > 0 || ulOver > 0
  const personality = determineStackPersonality({
    itemCount: items.length,
    hasCheckpoints,
    antioxidantCount,
    costKnownCount: known.length,
    avgMonthlyCost: known.length > 0 ? totalMonthlyCost / known.length : null,
  })

  return {
    itemCount: items.length,
    medCount: meds.length,
    interactions,
    interactionCounts,
    duplicates,
    ulFindings,
    separations,
    costRows,
    totalMonthlyCost,
    costKnownCount: known.length,
    costUnknownCount: costRows.length - known.length,
    checkpointCount,
    score,
    optimizedScore,
    antioxidantCount,
    personality,
  }
}
