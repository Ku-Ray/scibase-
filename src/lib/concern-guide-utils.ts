import { getConcernGuide, concernGuides } from '@/lib/concern-guide-data'

/**
 * 悩み解決ガイド記事のURLサフィックス。
 * /articles/[concernSlug]-supplement-guide で配信。
 */
export const SUPPLEMENT_GUIDE_SUFFIX = '-supplement-guide'

/**
 * articles/[slug] の slug が悩み解決ガイドかを判定。
 * 該当すれば対応する concernSlug を返す。
 */
export function matchSupplementGuideSlug(slug: string): { concernSlug: string } | null {
  if (!slug.endsWith(SUPPLEMENT_GUIDE_SUFFIX)) return null
  const concernSlug = slug.slice(0, -SUPPLEMENT_GUIDE_SUFFIX.length)
  if (!getConcernGuide(concernSlug)) return null
  return { concernSlug }
}

/** 全 concernGuide の articles 配下 slug 一覧 */
export function getAllSupplementGuideArticleSlugs(): string[] {
  return concernGuides.map((g) => `${g.concernSlug}${SUPPLEMENT_GUIDE_SUFFIX}`)
}
