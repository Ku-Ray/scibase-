import Link from 'next/link'
import { ChevronRight, BookOpen, FlaskConical, GitCompare, Target } from 'lucide-react'

export type NextReadItemType = 'ingredient' | 'article' | 'compare' | 'concern'

export interface NextReadItem {
  type: NextReadItemType
  href: string
  title: string
  description?: string
  badge?: string
}

interface Props {
  items: NextReadItem[]
  title?: string
  hint?: string
}

const TYPE_META: Record<NextReadItemType, { label: string; icon: React.ComponentType<{ className?: string }>; tone: string }> = {
  ingredient: { label: '成分', icon: FlaskConical, tone: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  article:    { label: 'コラム', icon: BookOpen,    tone: 'bg-sky-50 text-sky-700 border-sky-200' },
  compare:    { label: '比較',   icon: GitCompare,  tone: 'bg-amber-50 text-amber-700 border-amber-200' },
  concern:    { label: '悩み',   icon: Target,      tone: 'bg-rose-50 text-rose-700 border-rose-200' },
}

export function NextReadCTA({ items, title = '次に読む', hint }: Props) {
  if (!items.length) return null
  const list = items.slice(0, 4)

  return (
    <section className="my-12 p-5 sm:p-6 bg-secondary border border-border rounded-2xl">
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <h3 className="text-[15px] sm:text-[16px] font-semibold text-foreground">
          📖 {title}
        </h3>
        <span className="text-[11px] text-muted-foreground">{list.length} 件</span>
      </div>
      {hint && (
        <p className="text-[12px] text-muted-foreground mb-4 leading-relaxed">{hint}</p>
      )}
      <div className={`grid grid-cols-1 ${list.length >= 2 ? 'sm:grid-cols-2' : ''} gap-3 mt-3`}>
        {list.map((item) => {
          const meta = TYPE_META[item.type]
          const Icon = meta.icon
          return (
            <Link
              key={`${item.type}-${item.href}`}
              href={item.href}
              className="group flex items-start gap-3 bg-card border border-border rounded-xl
                px-4 py-3 hover:border-accent/50 hover:bg-card/80 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-medium
                    px-1.5 py-0.5 rounded border ${meta.tone}`}>
                    <Icon className="w-3 h-3" />
                    {meta.label}
                  </span>
                  {item.badge && (
                    <span className="text-[10px] text-muted-foreground">{item.badge}</span>
                  )}
                </div>
                <p className="font-semibold text-[13px] sm:text-[14px] text-foreground leading-snug
                  group-hover:text-accent transition-colors">
                  {item.title}
                </p>
                {item.description && (
                  <p className="text-[11px] sm:text-[12px] text-muted-foreground mt-1 leading-relaxed
                    line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5
                group-hover:text-accent transition-colors" />
            </Link>
          )
        })}
      </div>
    </section>
  )
}
