'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Calendar, ChevronRight, Package, RotateCcw } from 'lucide-react'
import {
  calcIntakeStreak,
  getDayProgress,
  getStackInventory,
  getStackItemName,
  INTAKE_STORAGE_KEY,
  sanitizeIntakeLog,
  STACK_RESULTS_KEY,
  STACK_STORAGE_KEY,
  todayKey,
  type IntakeLog,
  type MyStackData,
  type SavedStackResult,
} from '@/lib/my-stack'

function formatDate(iso: string): string {
  const d = new Date(iso)
  const m = (d.getMonth() + 1).toString().padStart(2, '0')
  const day = d.getDate().toString().padStart(2, '0')
  return `${d.getFullYear()}/${m}/${day}`
}

/** /my 集約用：現在の棚 + 最新の分析スナップショット */
export function MyStackSummary() {
  const [stack, setStack] = useState<MyStackData | null>(null)
  const [lastResult, setLastResult] = useState<SavedStackResult | null>(null)
  const [intakeLog, setIntakeLog] = useState<IntakeLog>({})
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    try {
      const rawStack = localStorage.getItem(STACK_STORAGE_KEY)
      if (rawStack) {
        const data = JSON.parse(rawStack) as MyStackData
        if (Array.isArray(data.items) && data.items.length > 0) setStack(data)
      }
      const rawResults = localStorage.getItem(STACK_RESULTS_KEY)
      if (rawResults) {
        const history = JSON.parse(rawResults) as SavedStackResult[]
        if (Array.isArray(history) && history.length > 0) setLastResult(history[0])
      }
      const rawIntake = localStorage.getItem(INTAKE_STORAGE_KEY)
      if (rawIntake) setIntakeLog(sanitizeIntakeLog(JSON.parse(rawIntake)))
    } catch {
      /* noop */
    }
  }, [])

  const soonest = useMemo(() => {
    if (!stack) return null
    const inv = getStackInventory(stack.items)
    return inv.length > 0 ? inv[0] : null
  }, [stack])

  if (!hasMounted) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/40 p-6 text-center text-sm text-slate-500">
        棚を読み込んでいます…
      </div>
    )
  }

  if (!stack) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-emerald-50/40 p-6 text-center">
        <div className="mb-3 flex justify-center"><Package className="h-8 w-8 text-emerald-600" /></div>
        <p className="text-sm text-slate-700">まだ棚がありません。飲んでいるサプリを登録すると、飲み合わせ・重複・月額コストを一括チェックできます</p>
        <Link href="/tools/my-stack"
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700">
          棚を作る <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-emerald-300 bg-white p-4 shadow-sm ring-1 ring-emerald-200/50 sm:p-5">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {lastResult ? (
            <>
              <div className="text-2xl">{lastResult.personality.emoji}</div>
              <div>
                <div className="text-sm font-bold text-slate-900 sm:text-base">{lastResult.personality.name}</div>
                <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                  <Calendar className="h-3 w-3" /> 最終分析 {formatDate(lastResult.savedAt)}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-2xl">🧺</div>
              <div>
                <div className="text-sm font-bold text-slate-900 sm:text-base">あなたのサプリ棚</div>
                <div className="mt-0.5 text-xs text-slate-500">まだ分析していません</div>
              </div>
            </>
          )}
        </div>
        {lastResult && (
          <div className="text-right">
            <div className="text-xs text-slate-500">棚スコア</div>
            <div className="text-xl font-bold text-emerald-700 sm:text-2xl">{lastResult.score}<span className="text-xs font-normal opacity-70">/100</span></div>
          </div>
        )}
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {stack.items.slice(0, 8).map((it) => (
          <span key={it.slug} className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 ring-1 ring-emerald-200">
            {getStackItemName(it.slug)}
          </span>
        ))}
        {stack.items.length > 8 && (
          <span className="rounded-full bg-slate-50 px-2.5 py-1 text-xs text-slate-500 ring-1 ring-slate-200">
            + 他 {stack.items.length - 8} 品
          </span>
        )}
      </div>

      {(() => {
        const progress = getDayProgress(stack.items, intakeLog, todayKey())
        const { streak } = calcIntakeStreak(intakeLog)
        if (progress.total === 0) return null
        const allDone = progress.done === progress.total
        return (
          <div className={`mb-3 rounded-lg px-3 py-2 text-xs ${
            allDone ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200' : 'bg-slate-50 text-slate-600 ring-1 ring-slate-200'
          }`}>
            📅 今日の服用 {progress.done}/{progress.total}{allDone && ' ✅'}
            {streak > 0 && <span className="ml-1.5">・🔥 {streak} 日連続</span>}
          </div>
        )
      })()}

      {soonest && (
        <div className={`mb-3 rounded-lg px-3 py-2 text-xs ${
          soonest.level !== 'ok' ? 'bg-amber-50 text-amber-900 ring-1 ring-amber-200' : 'bg-slate-50 text-slate-600 ring-1 ring-slate-200'
        }`}>
          ⏳ 次の飲み切り：{soonest.nameJa}{' '}
          {soonest.level === 'out'
            ? '（飲み切り済みの可能性）'
            : `あと約 ${soonest.daysLeft} 日（${soonest.depletionDate.split('-').slice(1).map(Number).join('/')} ごろ）`}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
        <div>
          {stack.items.length} 品
          {lastResult?.totalMonthlyCost != null && `・月あたり目安 ¥${lastResult.totalMonthlyCost.toLocaleString()}〜`}
          {lastResult != null && `・確認ポイント ${lastResult.checkpointCount} 件`}
        </div>
        <Link href="/tools/my-stack"
          className="inline-flex items-center gap-1 rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-50">
          <RotateCcw className="h-3.5 w-3.5" /> 棚を開いて分析する
        </Link>
      </div>
    </div>
  )
}
