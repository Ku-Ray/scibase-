'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Trophy, FlaskConical, Search, Microscope } from 'lucide-react'

const NAV = [
  { href: '/',            icon: Home,         label: 'ホーム'  },
  { href: '/concerns',    icon: Search,        label: '悩みから' },
  { href: '/ranking',     icon: Trophy,        label: 'ランキング' },
  { href: '/ingredients', icon: FlaskConical,  label: '成分一覧' },
  { href: '/analyzer',    icon: Microscope,    label: '診断' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40
      bg-card/95 backdrop-blur-sm border-t border-border
      safe-area-pb">
      <div className="flex items-center justify-around h-16 px-2">
        {NAV.map(({ href, icon: Icon, label }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl
                transition-colors min-w-0
                ${active
                  ? 'text-accent'
                  : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className={`text-[10px] font-medium truncate
                ${active ? 'font-semibold' : ''}`}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
