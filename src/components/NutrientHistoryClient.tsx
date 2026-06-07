'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calendar, ChevronRight, RotateCcw, Salad, Trash2 } from 'lucide-react'
import type { SavedNutrientResult } from './NutrientSufficiencyClient'
import { AGE_GROUP_LABEL, LIFE_STAGE_LABEL, NUTRIENT_META, SEX_LABEL } from '@/lib/nutrient-rda'

const NUTRIENT_RESULTS_KEY = 'scibase_nutrient_results'

function formatDate(iso: string): string {
  const d = new Date(iso)
  const m = (d.getMonth() + 1).toString().padStart(2, '0')
  const day = d.getDate().toString().padStart(2, '0')
  const hh = d.getHours().toString().padStart(2, '0')
  const mm = d.getMinutes().toString().padStart(2, '0')
  return `${d.getFullYear()}/${m}/${day} ${hh}:${mm}`
}

export function NutrientHistoryClient() {
  const [history, setHistory] = useState<SavedNutrientResult[]>([])
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    try {
      const raw = localStorage.getItem(NUTRIENT_RESULTS_KEY)
      if (raw) setHistory(JSON.parse(raw))
    } catch {
      /* noop */
    }
  }, [])

  const handleClearAll = () => {
    if (!confirm('栄養素診断履歴をすべて削除します。よろしいですか？')) return
    try {
      localStorage.removeItem(NUTRIENT_RESULTS_KEY)
      setHistory([])
    } catch {
      /* noop */
    }
  }

  if (!hasMounted) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/40 p-6 text-center text-sm text-slate-500">
        履歴を読み込んでいます…
      </div>
    )
  }

  if (history.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-emerald-50/40 p-6 text-center">
        <div className="mb-3 flex justify-center"><Salad className="h-8 w-8 text-emerald-600" /></div>
        <p className="text-sm text-slate-700">まだ診断結果がありません</p>
        <Link href="/tools/nutrient-sufficiency"
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700">
          栄養素を診断する <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs text-slate-600">最新 {history.length} 件の結果（このブラウザ内に保存）</p>
        <button type="button" onClick={handleClearAll}
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600">
          <Trash2 className="h-3 w-3" /> すべて削除
        </button>
      </div>

      <div className="space-y-3">
        {history.map((h, i) => (
          <HistoryCard key={h.savedAt} entry={h} isLatest={i === 0} />
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <Link href="/tools/nutrient-sufficiency"
          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-white px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50">
          <RotateCcw className="h-4 w-4" /> もう一度診断する
        </Link>
      </div>
    </div>
  )
}

function HistoryCard({ entry, isLatest }: { entry: SavedNutrientResult; isLatest: boolean }) {
  const deficits = entry.results.filter(r => r.status === 'severe_deficit' || r.status === 'mild_deficit')
  const topDeficits = deficits.sort((a, b) => a.percent - b.percent).slice(0, 3)
  const lifeStageText = entry.lifeStage !== 'normal' ? `・${LIFE_STAGE_LABEL[entry.lifeStage]}` : ''
  return (
    <div className={`rounded-2xl border bg-white p-4 shadow-sm sm:p-5 ${isLatest ? 'border-emerald-300 ring-1 ring-emerald-200/50' : 'border-slate-200'}`}>
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="text-2xl">{entry.personality.emoji}</div>
          <div>
            <div className="flex items-center gap-1.5">
              <div className="text-sm font-bold text-slate-900 sm:text-base">{entry.personality.name}</div>
              {isLatest && <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">最新</span>}
            </div>
            <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
              <Calendar className="h-3 w-3" /> {formatDate(entry.savedAt)}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">充足スコア</div>
          <div className="text-xl font-bold text-emerald-700 sm:text-2xl">{entry.score}<span className="text-xs font-normal opacity-70">/100</span></div>
        </div>
      </div>

      {/* Profile */}
      <div className="mb-3 text-xs text-slate-600">
        {AGE_GROUP_LABEL[entry.age]}・{SEX_LABEL[entry.sex]}{lifeStageText}・食事 {entry.foodPresetIds.length} 件・サプリ {entry.supplements.length} 件
      </div>

      {/* Top deficits */}
      {topDeficits.length > 0 && (
        <div>
          <div className="mb-1.5 text-xs font-semibold text-slate-700">気にかける余地のある栄養素</div>
          <div className="flex flex-wrap gap-1.5">
            {topDeficits.map(r => {
              const meta = NUTRIENT_META[r.nutrient]
              if (!meta) return null
              const isSevere = r.status === 'severe_deficit'
              return meta.ingredientSlug ? (
                <Link key={r.nutrient} href={`/ingredients/${meta.ingredientSlug}`}
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition ${
                    isSevere ? 'bg-orange-50 text-orange-700 ring-1 ring-orange-200 hover:bg-orange-100' : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200 hover:bg-amber-100'
                  }`}>
                  {meta.labelJa} {r.percent}% <ChevronRight className="h-3 w-3" />
                </Link>
              ) : (
                <span key={r.nutrient}
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs ${
                    isSevere ? 'bg-orange-50 text-orange-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                  {meta.labelJa} {r.percent}%
                </span>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
