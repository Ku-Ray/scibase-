import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Ingredient } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 日本語テキストを検索用に正規化する。
 * - ひらがな → カタカナ統一（「しみ」と「シミ」を同一視）
 * - 全角英数 → 半角
 * - 大文字 → 小文字
 * - 余分な空白除去
 *
 * 検索クエリと検索対象の両方を同じ関数で処理することで、
 * 「しみ」「シミ」「シミ・色素沈着」のいずれでもヒットする。
 */
export function normalizeJa(s: string): string {
  if (!s) return ''
  return s
    // ひらがな → カタカナ
    .replace(/[ぁ-ゖ]/g, c => String.fromCharCode(c.charCodeAt(0) + 0x60))
    // 全角英数 → 半角
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0))
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * 検索可能なテキストを生成する（オリジナル＋カタカナ正規化版）。
 * Fuse.js の検索対象フィールドに使用。
 */
export function buildSearchText(...parts: (string | string[] | undefined | null)[]): string {
  const flat: string[] = []
  for (const p of parts) {
    if (!p) continue
    if (Array.isArray(p)) flat.push(...p)
    else flat.push(p)
  }
  const original = flat.join(' ')
  const normalized = normalizeJa(original)
  return original + ' ' + normalized
}

// ─── Alternatives ────────────────────────────────────────

const RANK_SCORE: Record<string, number> = { S: 4, A: 3, B: 2, C: 1 }

/**
 * 飲み合わせ干渉カテゴリ・各キーワードで成分の interactions テキストをカテゴリ判定する。
 * 同カテゴリに該当する成分同士は、同じ薬剤クラスと衝突する可能性が高いため代替不可。
 *
 * 例：ビタミンE（出血リスク） vs トラネキサム酸（止血作用）
 *  → どちらも「blood_clotting」カテゴリ → 抗凝固薬服用者には両方NG → 代替不可と判定
 */
const INTERACTION_CATEGORIES: Record<string, string[]> = {
  blood_clotting: ['ワルファリン', '抗凝固', '抗血小板', 'アスピリン', '出血', '凝固', 'トラネキサム', '止血', '抗線溶', '血栓', 'クロピドグレル', 'DOAC', 'ヘパリン', 'EPA', 'DHA', 'オメガ3', 'イチョウ', 'ニンニク'],
  hormone:        ['ピル', '経口避妊薬', 'ホルモン', 'エストロゲン', 'プロゲステロン', 'タモキシフェン', '更年期', 'HRT', '乳がん', '前立腺'],
  thyroid:        ['甲状腺', 'レボチロキシン', 'チラージン', 'TSH'],
  mental_health:  ['SSRI', '抗うつ', 'パロキセチン', 'セロトニン', '鎮静', 'ベンゾジアゼピン', '睡眠薬', '抗不安', 'MAO', '三環系'],
  immune:         ['免疫抑制', 'シクロスポリン', 'タクロリムス', '自己免疫', '免疫賦活'],
  diabetes:       ['糖尿病', 'メトホルミン', 'インスリン', '血糖降下', 'SGLT'],
  liver:          ['CYP3A4', 'グレープフルーツ', 'CYP2D6', 'CYP'],
  cardiovascular: ['降圧', '血圧降下', 'スタチン', 'ジゴキシン', '不整脈'],
}

/** 成分の interactions テキストから危険カテゴリ集合を抽出 */
function getInteractionCategories(ing: Ingredient): Set<string> {
  const categories = new Set<string>()
  if (!ing.interactions || ing.interactions.length === 0) return categories
  for (const interaction of ing.interactions) {
    const text = ((interaction.substance ?? '') + ' ' + (interaction.mechanism ?? ''))
    for (const [category, keywords] of Object.entries(INTERACTION_CATEGORIES)) {
      if (keywords.some(kw => text.includes(kw))) {
        categories.add(category)
      }
    }
  }
  return categories
}

/**
 * 飲み合わせ問題がある成分の代替候補を算出する。
 * - 同じ concerns に紐づく成分から自身を除外
 * - **元成分と同じ干渉カテゴリを持つ候補は除外（安全フィルタ）**
 *   例：ビタミンE（blood_clotting）→ トラネキサム酸（blood_clotting）は除外される
 * - 共有 concern 数 × evidence rank でスコアリング・上位3件
 *
 * @param ing 元成分（飲み合わせ問題あり）
 * @param all 全成分リスト
 * @returns 代替候補成分（最大3件・safer）
 */
export function getAlternatives(ing: Ingredient, all: Ingredient[]): Ingredient[] {
  if (!ing.concerns || ing.concerns.length === 0) return []
  if (!ing.interactions || ing.interactions.length === 0) return [] // そもそも警告がない成分は代替不要
  const targetConcerns = new Set(ing.concerns)
  const dangerCategories = getInteractionCategories(ing)

  const candidates = all.filter(o => {
    if (o.slug === ing.slug) return false
    if (!o.concerns?.some(c => targetConcerns.has(c))) return false
    if ((o.usageType ?? 'oral') !== (ing.usageType ?? 'oral')) return false

    // 安全フィルタ: 同じ干渉カテゴリを持つ成分は代替候補から除外
    if (dangerCategories.size > 0) {
      const altCategories = getInteractionCategories(o)
      for (const cat of altCategories) {
        if (dangerCategories.has(cat)) return false
      }
    }
    return true
  })

  const scored = candidates.map(o => {
    const overlap = (o.concerns ?? []).filter(c => targetConcerns.has(c)).length
    const rank = RANK_SCORE[o.evidenceRank] ?? 0
    // interactions が少ないほど加点（より「安全」な候補を上位に）
    const safetyBonus = (o.interactions?.length ?? 0) === 0 ? 5 : 0
    return { ing: o, score: overlap * 10 + rank + safetyBonus }
  })
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, 3).map(s => s.ing)
}
