import type { Ingredient } from './types'

export type SectionSummaryKey =
  | 'whoFor'
  | 'papers'
  | 'publicDbReferences'
  | 'evidence'
  | 'dosage'
  | 'dosageLevels'
  | 'faq'
  | 'safety'
  | 'interactions'

const RANK_LABEL: Record<string, string> = {
  S: 'メタ解析・大規模 RCT 多数（最上位）',
  A: '複数の RCT またはメタ解析で再現性あり',
  B: '小規模 RCT または観察研究中心',
  C: '探索段階・限定的なエビデンス',
}

const DB_LABEL: Record<string, string> = {
  hfnet: 'hfnet',
  ejim: '厚労省 eJIM',
  'nih-ods': 'NIH ODS',
  nccih: 'NIH NCCIH',
  cinii: 'CiNii',
  jstage: 'J-STAGE',
  mhlw: '厚生労働省',
  caa: '消費者庁',
}

const LEVEL_LABEL: Record<string, string> = {
  avoid: '回避',
  caution: '要注意',
  monitor: '要経過観察',
}

/**
 * H2 セクション冒頭の TL;DR を返す（Sprint 3・AIO 引用源最適化）。
 * - 手書き値（ing.sectionSummaries[key]）があればそれを返す
 * - なければ ing の他フィールドから自動生成 fallback
 * - 当該セクションを描画できない（データ不足）場合は null を返す
 */
export function getSectionTLDR(
  ing: Ingredient,
  key: SectionSummaryKey,
): string | null {
  const explicit = ing.sectionSummaries?.[key]
  if (explicit) return explicit

  switch (key) {
    case 'whoFor': {
      const w = ing.whoFor
      if (!w || w.length === 0) return null
      return w[0]
    }
    case 'papers': {
      const p = ing.papers?.[0]
      if (!p) return null
      const meta = [p.journal, `${p.year}年`].filter(Boolean).join(' ')
      return `${p.keyFinding}（${meta}）`
    }
    case 'publicDbReferences': {
      const refs = ing.publicDbReferences
      if (!refs || refs.length === 0) return null
      const dbs = refs
        .slice(0, 3)
        .map((r) => DB_LABEL[r.source] ?? r.source)
        .join('・')
      return `${ing.nameJa}は公的 DB ${refs.length}件（${dbs}）が安全性・有効性を横断レビュー済`
    }
    case 'evidence':
      return `${ing.nameJa}のエビデンスランクは ${ing.evidenceRank}：${RANK_LABEL[ing.evidenceRank] ?? ''}`
    case 'dosage': {
      if (!ing.dosageMin) return null
      const range =
        ing.dosageMax && ing.dosageMax !== ing.dosageMin
          ? `${ing.dosageMin}–${ing.dosageMax}`
          : `${ing.dosageMin}`
      const tail = [ing.timing, ing.duration].filter(Boolean).join('・')
      return `論文ベースの目安：${range} ${ing.dosageUnit}${tail ? '・' + tail : ''}`
    }
    case 'dosageLevels': {
      const lvls = ing.dosageLevels
      if (!lvls || lvls.length === 0) return null
      if (lvls.length === 1) {
        return `${lvls[0].category}：${lvls[0].dose}（${lvls[0].whoFor}）`
      }
      return `${lvls.length}段階の用量で効果が異なる（最小：${lvls[0].dose}・最大：${lvls[lvls.length - 1].dose}）`
    }
    case 'faq': {
      const q = ing.customFaqs?.[0]
      if (!q) return null
      return `Q. ${q.q}`
    }
    case 'safety': {
      const se = ing.sideEffects?.[0]
      const ci = ing.contraindications?.[0]
      if (!se && !ci) return null
      return [se && `副作用：${se}`, ci && `注意：${ci}`]
        .filter(Boolean)
        .join('｜')
    }
    case 'interactions': {
      const ix = ing.interactions
      if (ix === undefined) return null
      if (ix.length === 0) {
        return `${ing.nameJa}について、添付文書・FDA 警告・査読論文レベルで併用回避・要注意とされる医薬品は現時点で報告されていない`
      }
      const top = ix[0]
      return `${top.substance}との併用は${LEVEL_LABEL[top.level] ?? ''}：${top.mechanism}`
    }
  }
}
