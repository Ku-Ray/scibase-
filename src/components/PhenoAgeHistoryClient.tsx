'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calendar, ChevronRight, HeartPulse, RotateCcw, Trash2 } from 'lucide-react'
import { PERSONALITY_ACTION, type SavedPhenoAgeResult } from './PhenoAgeClient'

const PHENOAGE_RESULTS_KEY = 'scibase_phenoage_results'

function formatDate(iso: string): string {
  const d = new Date(iso)
  const m = (d.getMonth() + 1).toString().padStart(2, '0')
  const day = d.getDate().toString().padStart(2, '0')
  const hh = d.getHours().toString().padStart(2, '0')
  const mm = d.getMinutes().toString().padStart(2, '0')
  return `${d.getFullYear()}/${m}/${day} ${hh}:${mm}`
}

export function PhenoAgeHistoryClient() {
  const [history, setHistory] = useState<SavedPhenoAgeResult[]>([])
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    try {
      const raw = localStorage.getItem(PHENOAGE_RESULTS_KEY)
      if (raw) setHistory(JSON.parse(raw))
    } catch {
      /* noop */
    }
  }, [])

  const handleClearAll = () => {
    if (!confirm('生物学的年齢の計測履歴をすべて削除します。よろしいですか？')) return
    try {
      localStorage.removeItem(PHENOAGE_RESULTS_KEY)
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
      <div className="rounded-2xl border border-dashed border-slate-300 bg-indigo-50/40 p-6 text-center">
        <div className="mb-3 flex justify-center"><HeartPulse className="h-8 w-8 text-indigo-600" /></div>
        <p className="text-sm text-slate-700">まだ計測結果がありません</p>
        <p className="mt-1 text-xs text-slate-500">健診の採血値から「身体の年齢」の研究指標を概算できます</p>
        <Link href="/tools/phenoage"
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700">
          生物学的年齢を計測する <ChevronRight className="h-4 w-4" />
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
        <Link href="/tools/phenoage"
          className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-300 bg-white px-4 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-50">
          <RotateCcw className="h-4 w-4" /> もう一度計測する
        </Link>
      </div>
    </div>
  )
}

function HistoryCard({ entry, isLatest }: { entry: SavedPhenoAgeResult; isLatest: boolean }) {
  const action = PERSONALITY_ACTION[entry.personality.id]
  const deltaLabel =
    entry.delta <= -0.5
      ? `実年齢より ${Math.abs(entry.delta).toFixed(1)} 歳 若い目安`
      : entry.delta >= 0.5
        ? `実年齢より ${entry.delta.toFixed(1)} 歳 高い目安`
        : '実年齢とほぼ同じ目安'

  return (
    <div className={`rounded-2xl border bg-white p-4 shadow-sm sm:p-5 ${isLatest ? 'border-indigo-300 ring-1 ring-indigo-200/50' : 'border-slate-200'}`}>
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="text-2xl">{entry.personality.emoji}</div>
          <div>
            <div className="flex items-center gap-1.5">
              <div className="text-sm font-bold text-slate-900 sm:text-base">{entry.personality.name}</div>
              {isLatest && <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-medium text-indigo-700">最新</span>}
            </div>
            <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
              <Calendar className="h-3 w-3" /> {formatDate(entry.savedAt)}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">生物学的年齢（研究指標）</div>
          <div className="text-xl font-bold text-indigo-700 sm:text-2xl">{entry.bioAge.toFixed(1)}<span className="text-xs font-normal opacity-70"> 歳</span></div>
        </div>
      </div>

      {/* Profile */}
      <div className="mb-3 text-xs text-slate-600">
        実年齢 {entry.age} 歳・{entry.sex === 'female' ? '女性' : '男性'}・{deltaLabel}
        {entry.lifestyleAdjustedAge != null && `・生活習慣を加味 ${entry.lifestyleAdjustedAge.toFixed(1)} 歳`}
      </div>

      {/* タイプから振り返る成分（腎機能注意型は map 不在のため自動非表示） */}
      {action && action.ingredients.length > 0 && (
        <div>
          <div className="mb-1.5 text-xs font-semibold text-slate-700">このタイプの方が摂取を検討するケースが多い成分</div>
          <div className="flex flex-wrap gap-1.5">
            {action.ingredients.map((ing) => (
              <Link key={ing.slug} href={`/ingredients/${ing.slug}`}
                className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-xs text-indigo-700 ring-1 ring-indigo-200 transition hover:bg-indigo-100">
                {ing.labelJa} <ChevronRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 腎機能注意型は医師相談の案内のみ */}
      {entry.personality.id === 'kidney_caution' && (
        <div className="rounded-lg bg-slate-50 p-2.5 text-xs leading-relaxed text-slate-600">
          クレアチニン値が性別の正常範囲を超えていました。腎機能の評価は医療機関での検査が必要です。まず医師にご相談ください。
        </div>
      )}
    </div>
  )
}
