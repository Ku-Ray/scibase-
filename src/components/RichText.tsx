import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Fragment, type ReactNode } from 'react'
import { getIngredient } from '@/lib/data'

/**
 * 記事本文用の軽量Markdownレンダラ。
 * 対応構文（ネスト不可・1行内で完結）：
 *   **bold**             → <strong>
 *   [text](/path)        → 内部リンク（next/link）
 *   [text](https://..)   → 外部リンク（target=_blank）
 *   ==highlight==        → <mark> 重要数値・キーフレーズの強調
 *   [[INGREDIENT:slug]]  → 成分詳細ページへのCTAボタン（独立段落で配置）
 *
 * Pillar記事を含む長文記事の可読性とCTAクリック可能性を担保する。
 */

type Token =
  | { type: 'text'; value: string }
  | { type: 'bold'; value: string }
  | { type: 'mark'; value: string }
  | { type: 'link'; text: string; href: string }
  | { type: 'ingredient-cta'; slug: string }

const PATTERN = /(\[\[INGREDIENT:[a-z0-9-]+\]\]|\*\*[^*\n]+\*\*|==[^=\n]+==|\[[^\]\n]+\]\([^\)\n]+\))/g

function tokenize(input: string): Token[] {
  const tokens: Token[] = []
  let lastIndex = 0
  for (const m of input.matchAll(PATTERN)) {
    const idx = m.index ?? 0
    if (idx > lastIndex) tokens.push({ type: 'text', value: input.slice(lastIndex, idx) })
    const raw = m[0]
    if (raw.startsWith('[[INGREDIENT:')) {
      const slug = raw.slice('[[INGREDIENT:'.length, -2)
      tokens.push({ type: 'ingredient-cta', slug })
    } else if (raw.startsWith('**')) {
      tokens.push({ type: 'bold', value: raw.slice(2, -2) })
    } else if (raw.startsWith('==')) {
      tokens.push({ type: 'mark', value: raw.slice(2, -2) })
    } else {
      const linkMatch = raw.match(/^\[([^\]]+)\]\(([^\)]+)\)$/)
      if (linkMatch) tokens.push({ type: 'link', text: linkMatch[1], href: linkMatch[2] })
      else tokens.push({ type: 'text', value: raw })
    }
    lastIndex = idx + raw.length
  }
  if (lastIndex < input.length) tokens.push({ type: 'text', value: input.slice(lastIndex) })
  return tokens
}

function renderToken(t: Token, key: number): ReactNode {
  if (t.type === 'text') return <Fragment key={key}>{t.value}</Fragment>
  if (t.type === 'ingredient-cta') {
    const ing = getIngredient(t.slug)
    if (!ing) return <Fragment key={key} />
    return (
      <Link
        key={key}
        href={`/ingredients/${ing.slug}`}
        className="not-prose inline-flex items-center gap-1.5
          text-[13px] sm:text-[14px] font-semibold
          bg-secondary hover:bg-secondary/70
          text-foreground
          border border-border hover:border-accent/50
          rounded-lg px-4 py-2.5
          transition-colors no-underline"
      >
        {ing.nameJa}のエビデンスを見る
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    )
  }
  if (t.type === 'bold') {
    // bold内のリンク・ハイライトを再帰的にパース（ネスト対応）
    return (
      <strong key={key} className="font-bold text-foreground">
        {tokenize(t.value).map(renderToken)}
      </strong>
    )
  }
  if (t.type === 'mark')
    return (
      <mark
        key={key}
        className="bg-accent/15 text-foreground font-semibold px-1 py-0.5 rounded"
      >
        {tokenize(t.value).map(renderToken)}
      </mark>
    )
  // link
  const isExternal = /^https?:\/\//.test(t.href)
  if (isExternal) {
    return (
      <a
        key={key}
        href={t.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline font-medium"
      >
        {t.text}
      </a>
    )
  }
  return (
    <Link
      key={key}
      href={t.href}
      className="text-accent hover:underline font-medium"
    >
      {t.text}
    </Link>
  )
}

/** 段落単位で「**bold-only**」かどうかを判定 */
function isBoldOnlyParagraph(text: string): string | null {
  const m = text.trim().match(/^\*\*([^*\n]+)\*\*$/)
  return m ? m[1] : null
}

/** 段落配列にして返す（\n\n で分割）
 *
 * 段落が「**...**」のみで構成されている場合は <h4> として描画し、
 * SEO的な見出し階層と視覚的サブ見出しを同時に確立する。
 */
export function RichParagraphs({
  body,
  className = 'text-[15px] text-foreground leading-[1.9] mb-5 last:mb-0',
}: {
  body: string
  className?: string
}) {
  const paras = body.split('\n\n')
  return (
    <>
      {paras.map((para, i) => {
        const boldText = isBoldOnlyParagraph(para)
        if (boldText) {
          return (
            <h4
              key={i}
              className="text-[15px] sm:text-[16px] font-bold text-foreground
                mt-7 mb-3 first:mt-0 leading-snug"
            >
              {tokenize(boldText).map(renderToken)}
            </h4>
          )
        }
        return (
          <p key={i} className={className}>
            {tokenize(para).map(renderToken)}
          </p>
        )
      })}
    </>
  )
}

/** インライン1行（FAQ answer等の単発描画用） */
export function RichInline({ text }: { text: string }) {
  return <>{tokenize(text).map(renderToken)}</>
}
