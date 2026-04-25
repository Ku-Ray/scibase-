import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Ingredient } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const RANK_SCORE: Record<string, number> = { S: 4, A: 3, B: 2, C: 1 }

/**
 * 飲み合わせ問題がある成分の代替候補を算出する。
 * 同じconcernsに紐づく成分の中から、自身を除外し、エビデンスランクの高い順に最大3つ返す。
 *
 * @param ing 元成分（飲み合わせ問題あり）
 * @param all 全成分リスト
 * @returns 代替候補成分（最大3件・evidenceRank降順）
 */
export function getAlternatives(ing: Ingredient, all: Ingredient[]): Ingredient[] {
  if (!ing.concerns || ing.concerns.length === 0) return []
  const targetConcerns = new Set(ing.concerns)
  const candidates = all.filter(o =>
    o.slug !== ing.slug &&
    o.concerns?.some(c => targetConcerns.has(c)) &&
    (o.usageType ?? 'oral') === (ing.usageType ?? 'oral')
  )
  // 共有 concern 数 × ランクスコアでスコアリング
  const scored = candidates.map(o => {
    const overlap = (o.concerns ?? []).filter(c => targetConcerns.has(c)).length
    const rank = RANK_SCORE[o.evidenceRank] ?? 0
    return { ing: o, score: overlap * 10 + rank }
  })
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, 3).map(s => s.ing)
}
