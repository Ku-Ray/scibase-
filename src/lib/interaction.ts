/**
 * interaction.ts
 *
 * /tools/interaction-checker page で使用する核ロジック。
 *
 * - data.ts の `ingredients[].interactions[]` を canonical key で fuzzy match
 * - 成分 × 医薬品（canonical）、成分 × 成分の両方を check
 * - severity 順（avoid → caution → monitor）にソートして返す
 */

import { ingredients, getIngredient } from './data'
import { matchesCanonicalKey } from './interaction-canonical'

export type InteractionLevel = 'avoid' | 'caution' | 'monitor'
export type InteractionEvidence = 'established' | 'theoretical' | 'case-report'

export interface InteractionResult {
  /** 該当成分の slug */
  ingredientSlug: string
  /** 該当成分の日本語名 */
  ingredientNameJa: string
  /** data.ts の元 substance 文字列 */
  substance: string
  /** マッチしたキー群（canonical key または「成分:nameJa」） */
  matchedKeys: string[]
  level: InteractionLevel
  mechanism: string
  action: string
  evidence: InteractionEvidence
  source?: string
}

/**
 * 選択された成分と医薬品の組み合わせから該当 interaction を抽出。
 *
 * @param ingredientSlugs - ユーザーが選んだ成分 slug（複数可）
 * @param medicationKeys - canonical key の配列（"ワルファリン"・"スタチン" 等）
 * @returns severity 順にソートされた結果
 */
export function checkInteractions(
  ingredientSlugs: string[],
  medicationKeys: string[],
): InteractionResult[] {
  const results: InteractionResult[] = []
  const uniqueSlugs = Array.from(new Set(ingredientSlugs))

  for (const slug of uniqueSlugs) {
    const ing = getIngredient(slug)
    if (!ing?.interactions || ing.interactions.length === 0) continue

    for (const interaction of ing.interactions) {
      const matchedKeys: string[] = []

      // 1. 医薬品 canonical key とのマッチ
      for (const medKey of medicationKeys) {
        if (matchesCanonicalKey(interaction.substance, medKey)) {
          matchedKeys.push(medKey)
        }
      }

      // 2. 他の選択成分とのマッチ（nameJa が substance 文字列に含まれるか）
      for (const otherSlug of uniqueSlugs) {
        if (otherSlug === slug) continue
        const other = getIngredient(otherSlug)
        if (!other) continue
        // 2 文字以下の nameJa は誤マッチ多発のため除外（例: "鉄" は他成分文字列に頻出）
        if (other.nameJa.length >= 3 && interaction.substance.includes(other.nameJa)) {
          matchedKeys.push(`成分:${other.nameJa}`)
        }
      }

      if (matchedKeys.length === 0) continue

      results.push({
        ingredientSlug: slug,
        ingredientNameJa: ing.nameJa,
        substance: interaction.substance,
        matchedKeys: Array.from(new Set(matchedKeys)),
        level: interaction.level,
        mechanism: interaction.mechanism,
        action: interaction.action,
        evidence: interaction.evidence,
        source: interaction.source,
      })
    }
  }

  const order: Record<InteractionLevel, number> = { avoid: 0, caution: 1, monitor: 2 }
  return results.sort((a, b) => {
    if (a.level !== b.level) return order[a.level] - order[b.level]
    return a.ingredientNameJa.localeCompare(b.ingredientNameJa, 'ja')
  })
}

/** 検索 UI の dropdown 用：data.ts 全成分の slug + 日本語名 */
export function getIngredientOptions(): Array<{ slug: string; nameJa: string }> {
  return ingredients
    .map((i) => ({ slug: i.slug, nameJa: i.nameJa }))
    .sort((a, b) => a.nameJa.localeCompare(b.nameJa, 'ja'))
}

/** Level → 表示用ラベル */
export const LEVEL_LABEL: Record<InteractionLevel, string> = {
  avoid: '要回避',
  caution: '要注意',
  monitor: '経過観察',
}

/** Evidence → 表示用ラベル */
export const EVIDENCE_LABEL: Record<InteractionEvidence, string> = {
  established: '臨床報告あり',
  theoretical: '理論的可能性',
  'case-report': '症例報告',
}
