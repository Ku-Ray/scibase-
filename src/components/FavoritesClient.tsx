'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Star, ChevronRight, Trash2 } from 'lucide-react'
import { useFavoritesList, type FavoriteType } from '@/hooks/useFavorite'
import { getIngredient } from '@/lib/data'
import { EvidenceBadge } from './EvidenceBadge'
import { articles } from '@/lib/articles'

type Tab = FavoriteType

const TAB_LABEL: Record<Tab, string> = {
  ingredient: '成分',
  article: 'コラム',
  compare: '比較',
}

export function FavoritesClient() {
  const [tab, setTab] = useState<Tab>('ingredient')
  const [hasMounted, setHasMounted] = useState(false)

  const ingredientList = useFavoritesList('ingredient')
  const articleList = useFavoritesList('article')
  const compareList = useFavoritesList('compare')

  useEffect(() => setHasMounted(true), [])

  const counts: Record<Tab, number> = {
    ingredient: ingredientList.list.length,
    article: articleList.list.length,
    compare: compareList.list.length,
  }
  const totalCount = counts.ingredient + counts.article + counts.compare

  // SSR / 初回 hydration 前は中立的な空状態を出して flicker を回避
  if (!hasMounted) {
    return (
      <div className="bg-secondary/30 border border-dashed border-border rounded-2xl px-5 py-8 text-center">
        <p className="text-[14px] text-muted-foreground">お気に入りを読み込んでいます…</p>
      </div>
    )
  }

  return (
    <div>
      {/* ── タブ ── */}
      <div className="inline-flex gap-1 p-1 bg-secondary rounded-xl mb-6">
        {(['ingredient', 'article', 'compare'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`inline-flex items-center gap-1.5 text-[13px] font-semibold
              px-4 py-2 min-h-[40px] rounded-lg transition-all
              ${tab === t
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'}`}
          >
            {TAB_LABEL[t]}
            <span className={`text-[11px] font-medium tabular-nums px-1.5 rounded
              ${tab === t ? 'bg-accent/15 text-accent' : 'bg-card text-muted-foreground'}`}>
              {counts[t]}
            </span>
          </button>
        ))}
      </div>

      {totalCount === 0 && (
        <div className="bg-secondary/30 border border-dashed border-border rounded-2xl px-5 py-10 text-center">
          <Star className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-[14px] text-muted-foreground leading-relaxed">
            まだお気に入りがありません。
          </p>
          <p className="text-[12.5px] text-muted-foreground/80 mt-1">
            気になる成分・コラム・比較の <Star className="w-3.5 h-3.5 inline -mt-0.5 fill-yellow-400/0" /> ボタンを押すと保存されます。
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Link href="/ingredients"
              className="inline-flex items-center gap-1 text-[12px] font-semibold text-accent
                bg-accent/8 border border-accent/20 rounded-lg px-3 py-1.5
                hover:bg-accent/15 transition-colors">
              成分一覧 <ChevronRight className="w-3 h-3" />
            </Link>
            <Link href="/articles"
              className="inline-flex items-center gap-1 text-[12px] font-semibold text-accent
                bg-accent/8 border border-accent/20 rounded-lg px-3 py-1.5
                hover:bg-accent/15 transition-colors">
              コラム <ChevronRight className="w-3 h-3" />
            </Link>
            <Link href="/compare"
              className="inline-flex items-center gap-1 text-[12px] font-semibold text-accent
                bg-accent/8 border border-accent/20 rounded-lg px-3 py-1.5
                hover:bg-accent/15 transition-colors">
              成分比較 <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {tab === 'ingredient' && totalCount > 0 && (
        <IngredientList list={ingredientList.list} remove={ingredientList.remove} clear={ingredientList.clear} />
      )}
      {tab === 'article' && totalCount > 0 && (
        <ArticleList list={articleList.list} remove={articleList.remove} clear={articleList.clear} />
      )}
      {tab === 'compare' && totalCount > 0 && (
        <CompareList list={compareList.list} remove={compareList.remove} clear={compareList.clear} />
      )}
    </div>
  )
}

/* ── 成分 ── */
function IngredientList({ list, remove, clear }: {
  list: string[]
  remove: (slug: string) => void
  clear: () => void
}) {
  if (list.length === 0) {
    return <EmptyTab label="お気に入りに登録した成分はまだありません" linkHref="/ingredients" linkLabel="成分一覧へ" />
  }
  return (
    <ListLayout count={list.length} onClear={clear} label="成分">
      {list.map((slug) => {
        const ing = getIngredient(slug)
        if (!ing) {
          return (
            <Row key={slug} onRemove={() => remove(slug)}>
              <p className="text-[13px] text-muted-foreground">不明な成分 ({slug})</p>
            </Row>
          )
        }
        return (
          <Row key={slug} onRemove={() => remove(slug)}>
            <Link href={`/ingredients/${ing.slug}`}
              className="flex items-center gap-3 flex-1 min-w-0 group">
              <EvidenceBadge rank={ing.evidenceRank} variant="dot" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[14px] text-foreground group-hover:underline truncate">
                  {ing.nameJa}
                </p>
                <p className="text-[11.5px] text-muted-foreground line-clamp-1">{ing.tagline}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </Link>
          </Row>
        )
      })}
    </ListLayout>
  )
}

/* ── コラム ── */
function ArticleList({ list, remove, clear }: {
  list: string[]
  remove: (slug: string) => void
  clear: () => void
}) {
  const articleMap = useMemo(() => {
    const map = new Map<string, (typeof articles)[number]>()
    articles.forEach((a) => map.set(a.slug, a))
    return map
  }, [])

  if (list.length === 0) {
    return <EmptyTab label="お気に入りに登録したコラムはまだありません" linkHref="/articles" linkLabel="コラム一覧へ" />
  }
  return (
    <ListLayout count={list.length} onClear={clear} label="コラム">
      {list.map((slug) => {
        const a = articleMap.get(slug)
        if (!a) {
          return (
            <Row key={slug} onRemove={() => remove(slug)}>
              <Link href={`/articles/${slug}`}
                className="flex items-center gap-3 flex-1 min-w-0 group">
                <p className="text-[13px] text-foreground group-hover:underline truncate">{slug}</p>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </Link>
            </Row>
          )
        }
        return (
          <Row key={slug} onRemove={() => remove(slug)}>
            <Link href={`/articles/${a.slug}`}
              className="flex items-center gap-3 flex-1 min-w-0 group">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[14px] text-foreground group-hover:underline line-clamp-1">
                  {a.title}
                </p>
                <p className="text-[11.5px] text-muted-foreground">
                  {a.categoryLabel} ・ {a.readingMinutes}分
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </Link>
          </Row>
        )
      })}
    </ListLayout>
  )
}

/* ── 比較 ── */
function CompareList({ list, remove, clear }: {
  list: string[]
  remove: (slug: string) => void
  clear: () => void
}) {
  if (list.length === 0) {
    return <EmptyTab label="お気に入りに登録した比較はまだありません" linkHref="/compare" linkLabel="成分比較へ" />
  }
  return (
    <ListLayout count={list.length} onClear={clear} label="比較">
      {list.map((pairSlug) => {
        // pairSlug format: "vitamin-c-vs-niacinamide"
        const idx = pairSlug.indexOf('-vs-')
        if (idx < 0) {
          return (
            <Row key={pairSlug} onRemove={() => remove(pairSlug)}>
              <p className="text-[13px] text-muted-foreground">不明な比較 ({pairSlug})</p>
            </Row>
          )
        }
        const slugA = pairSlug.slice(0, idx)
        const slugB = pairSlug.slice(idx + 4)
        const ingA = getIngredient(slugA)
        const ingB = getIngredient(slugB)
        const labelA = ingA?.nameJa ?? slugA
        const labelB = ingB?.nameJa ?? slugB
        return (
          <Row key={pairSlug} onRemove={() => remove(pairSlug)}>
            <Link href={`/compare/${pairSlug}`}
              className="flex items-center gap-3 flex-1 min-w-0 group">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[14px] text-foreground group-hover:underline truncate">
                  {labelA} vs {labelB}
                </p>
                <p className="text-[11.5px] text-muted-foreground">論文エビデンス比較</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </Link>
          </Row>
        )
      })}
    </ListLayout>
  )
}

/* ── 共通 ── */
function ListLayout({ count, onClear, label, children }: {
  count: number
  onClear: () => void
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[12px] text-muted-foreground">{count}件の{label}を保存中</p>
        <button onClick={onClear}
          className="inline-flex items-center gap-1 text-[11.5px] text-muted-foreground
            hover:text-destructive transition-colors">
          <Trash2 className="w-3 h-3" />
          すべて外す
        </button>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function Row({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) {
  return (
    <div className="flex items-center gap-3 bg-card border border-border rounded-xl
      px-4 py-3 hover:border-foreground/20 transition-colors">
      {children}
      <button onClick={onRemove} aria-label="お気に入りから削除"
        className="flex-shrink-0 w-8 h-8 rounded-lg inline-flex items-center justify-center
          text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors">
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

function EmptyTab({ label, linkHref, linkLabel }: {
  label: string; linkHref: string; linkLabel: string
}) {
  return (
    <div className="bg-secondary/30 border border-dashed border-border rounded-2xl px-5 py-8 text-center">
      <p className="text-[13px] text-muted-foreground mb-3">{label}</p>
      <Link href={linkHref}
        className="inline-flex items-center gap-1 text-[12px] font-semibold text-accent
          bg-accent/8 border border-accent/20 rounded-lg px-3 py-1.5
          hover:bg-accent/15 transition-colors">
        {linkLabel} <ChevronRight className="w-3 h-3" />
      </Link>
    </div>
  )
}
