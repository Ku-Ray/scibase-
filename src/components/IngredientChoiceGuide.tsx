import type { Article, Ingredient } from '@/lib/types'

/**
 * 成分ページ中段の「選び方」導線（軸A1）。
 *
 * 流入のある成分ページ（Bing/AI/Google）から、その成分の「選び方ガイド」記事
 * （= 高単価ASPが載る稼ぐ記事）へ、スクロール最下部の商品カードを待たずに動線を張る。
 * 表示条件：その成分を relatedIngredientSlugs に持つ記事のうち ingredientCtaPick が
 * 設定されたものが1つ以上あること（＝キュレーション済みの記事に限定＝制御されたロールアウト）。
 * 中立トーン厳守：論文ベースの比較ページへ案内する体で、商品を煽らない。
 */
export function IngredientChoiceGuide({
  ing,
  relatedArticles,
}: {
  ing: Ingredient
  relatedArticles: Article[]
}) {
  const guide = relatedArticles.find((a) => a.ingredientCtaPick)
  if (!guide) return null

  return (
    <section className="mb-10 scroll-mt-20">
      <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5">
        <h2 className="font-semibold text-[18px] text-foreground mb-1">
          {ing.nameJa}、結局どれを選ぶ？
        </h2>
        <p className="text-[13px] text-muted-foreground mb-4 leading-relaxed">
          論文で銘柄・用量を比較した選び方を、別ページにまとめています。
        </p>
        <a
          href={`/articles/${guide.slug}`}
          className="flex items-center justify-between gap-3 bg-emerald-600 text-white rounded-xl px-5 py-3.5 hover:bg-emerald-700 transition-colors"
        >
          <span className="text-[14px] font-semibold leading-snug">{guide.title}</span>
          <span aria-hidden className="text-[16px] flex-shrink-0">
            ▶
          </span>
        </a>
        <p className="text-[12px] text-muted-foreground mt-2.5">
          代表：{guide.ingredientCtaPick}
        </p>
      </div>
    </section>
  )
}
