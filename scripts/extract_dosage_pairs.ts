/**
 * Sprint 3 Wave 3.2-α: papers[] からの dose ペア抽出スクリプト
 *
 * 各成分の papers[] の keyFinding テキストから dose 表現（数値+単位）を
 * 正規表現で抽出。既存 dosageLevels[] の充足状態と合わせて
 * /tmp/sprint3_dosage_baseline.csv に出力。
 *
 * 実行：cd agescience && npx tsx scripts/extract_dosage_pairs.ts
 *
 * 出力 CSV カラム：
 *   slug,nameJa,evidenceRank,papersCount,dosageLevelsCount,dosageUnit,
 *   paperDoseHits,gap_level3,gap_level5,paperDoseSamples
 */

import { ingredients } from '../src/lib/data'
import { writeFileSync } from 'fs'

/* dose パターン正規表現
 *   数値（小数・範囲含む） + 単位（mg/g/μg/mcg/IU/mL/% etc.）
 *   1g, 300mg, 0.5g, 500-1000mg, 1g×3回, 300-600mg/日 等 */
const DOSE_RE =
  /(\d+(?:\.\d+)?(?:[-–~〜]\d+(?:\.\d+)?)?)\s?(mg|g|μg|mcg|ng|IU|iu|mL|ml|%|億|億CFU|cfu|kcal|μmol)/gi

function extractDosesFromKeyFinding(text: string): string[] {
  const hits = new Set<string>()
  for (const m of text.matchAll(DOSE_RE)) {
    hits.add(`${m[1]}${m[2].toLowerCase().replace('ml', 'mL').replace('iu', 'IU')}`)
  }
  return Array.from(hits)
}

const rows: string[] = []
rows.push(
  [
    'slug',
    'nameJa',
    'evidenceRank',
    'papersCount',
    'dosageLevelsCount',
    'dosageUnit',
    'paperDoseHits',
    'gap_below_3',
    'gap_below_5',
    'paperDoseSamples',
  ].join(','),
)

let totalIngredients = 0
let withDosageLevels = 0
let below3 = 0
let below5 = 0
let withPaperDoses = 0

for (const ing of ingredients) {
  totalIngredients++
  const dosageLevelsCount = ing.dosageLevels?.length ?? 0
  if (dosageLevelsCount > 0) withDosageLevels++
  if (dosageLevelsCount < 3) below3++
  if (dosageLevelsCount < 5) below5++

  const allDoseHits = new Set<string>()
  for (const p of ing.papers ?? []) {
    for (const d of extractDosesFromKeyFinding(p.keyFinding)) {
      allDoseHits.add(d)
    }
  }
  if (allDoseHits.size > 0) withPaperDoses++

  const samples = Array.from(allDoseHits).slice(0, 8).join(' | ')

  rows.push(
    [
      ing.slug,
      `"${ing.nameJa.replace(/"/g, '""')}"`,
      ing.evidenceRank,
      (ing.papers?.length ?? 0).toString(),
      dosageLevelsCount.toString(),
      `"${ing.dosageUnit.replace(/"/g, '""')}"`,
      allDoseHits.size.toString(),
      dosageLevelsCount < 3 ? '1' : '0',
      dosageLevelsCount < 5 ? '1' : '0',
      `"${samples.replace(/"/g, '""')}"`,
    ].join(','),
  )
}

const outPath = '/tmp/sprint3_dosage_baseline.csv'
writeFileSync(outPath, rows.join('\n') + '\n', 'utf-8')

console.log(`=== Sprint 3 Wave 3.2-α: dosageLevels Baseline ===`)
console.log(`総成分数             : ${totalIngredients}`)
console.log(`dosageLevels 実装済   : ${withDosageLevels}  (${((withDosageLevels / totalIngredients) * 100).toFixed(1)}%)`)
console.log(`段階 < 3（拡充必要）  : ${below3}  (${((below3 / totalIngredients) * 100).toFixed(1)}%)`)
console.log(`段階 < 5（理想未達）  : ${below5}  (${((below5 / totalIngredients) * 100).toFixed(1)}%)`)
console.log(`papers[] に dose 検出 : ${withPaperDoses}  (${((withPaperDoses / totalIngredients) * 100).toFixed(1)}%)`)
console.log(``)
console.log(`CSV 出力             : ${outPath}`)
console.log(`次：VOL≥100 87 成分リスト pull → CSV を filter して Wave 3.2-β 候補確定`)
