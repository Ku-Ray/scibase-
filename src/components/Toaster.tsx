'use client'

import { useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'

interface ToastEvent {
  id: number
  message: string
  variant: 'success' | 'info' | 'warning'
}

interface ToastDetail {
  message: string
  variant?: 'success' | 'info' | 'warning'
}

const TOAST_EVENT = 'scibase:toast'

/**
 * Toast を発火するための window event 経由 helper。
 * Server-safe（typeof window guard 内蔵）。
 */
export function showToast(message: string, variant: ToastDetail['variant'] = 'success'): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent<ToastDetail>(TOAST_EVENT, { detail: { message, variant } }))
}

/**
 * 画面に lifecycle 管理される toast コンテナ。app/layout に 1 個配置。
 */
export function Toaster() {
  const [toasts, setToasts] = useState<ToastEvent[]>([])

  useEffect(() => {
    let nextId = 1
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ToastDetail>).detail
      if (!detail) return
      const t: ToastEvent = {
        id: nextId++,
        message: detail.message,
        variant: detail.variant ?? 'success',
      }
      setToasts((prev) => [...prev, t])
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== t.id))
      }, 2500)
    }
    window.addEventListener(TOAST_EVENT, handler)
    return () => window.removeEventListener(TOAST_EVENT, handler)
  }, [])

  if (toasts.length === 0) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 sm:bottom-6 inset-x-0 z-[60] pointer-events-none flex flex-col items-center gap-2 px-4"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-full
            shadow-lg border text-[13px] font-medium animate-slide-up
            ${t.variant === 'success' ? 'bg-foreground text-background border-foreground' : ''}
            ${t.variant === 'info' ? 'bg-card text-foreground border-border' : ''}
            ${t.variant === 'warning' ? 'bg-amber-500 text-white border-amber-500' : ''}`}
        >
          {t.variant === 'success' && <Check className="w-3.5 h-3.5" />}
          {t.variant === 'warning' && <X className="w-3.5 h-3.5" />}
          {t.message}
        </div>
      ))}
    </div>
  )
}
