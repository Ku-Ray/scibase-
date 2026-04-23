'use client'

import { useRouter } from 'next/navigation'
import { Microscope, ArrowRight } from 'lucide-react'

const STORAGE_KEY = 'scibase_analyzer_slugs'

interface Props {
  slugs: string[]
}

export function AddArticleToAnalyzerButton({ slugs }: Props) {
  const router = useRouter()

  const handleClick = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as string[]
      const merged = Array.from(new Set([...saved, ...slugs]))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
    } catch {}
    router.push('/analyzer')
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 text-[14px] font-semibold
        bg-foreground text-background rounded-xl px-5 py-3 min-h-[44px]
        hover:opacity-85 transition-opacity"
    >
      <Microscope className="w-4 h-4" />
      この記事の{slugs.length}成分を診断に追加
      <ArrowRight className="w-3.5 h-3.5" />
    </button>
  )
}
