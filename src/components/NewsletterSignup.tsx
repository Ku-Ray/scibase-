'use client'

/**
 * Newsletter 購読フォーム（ソフトゲート）
 * - 価値提供の「後」に任意でメアドを貰う設計（ログイン必須化はしない）
 * - 同意チェックなしでは submit 不可（特定電子メール法：オプトイン）
 * - 購読済みは localStorage scibase_newsletter_done で再表示を抑制
 * - 配信基盤は /api/subscribe 経由で Buttondown に中継（将来差し替え可能な疎結合）
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Mail, Check, Loader2 } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

const DONE_KEY = 'scibase_newsletter_done'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function NewsletterSignup({ source }: { source: string }) {
  // SSR では常に描画し、購読済みの場合のみ mount 後に非表示化する
  const [visible, setVisible] = useState(true)
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    try {
      if (localStorage.getItem(DONE_KEY)) {
        setVisible(false)
        return
      }
    } catch {
      /* private mode 等で localStorage 不可なら表示のまま */
    }
    trackEvent('newsletter_view', { source })
  }, [source])

  if (!visible) return null

  const canSubmit = consent && EMAIL_RE.test(email.trim()) && status !== 'loading'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source, consent: true }),
      })
      const data: { error?: string } = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus('error')
        setErrorMsg(data.error ?? '送信に失敗しました。時間をおいて再度お試しください。')
        return
      }
      setStatus('success')
      try {
        localStorage.setItem(DONE_KEY, new Date().toISOString())
      } catch {
        /* noop */
      }
      trackEvent('newsletter_subscribe', { source })
    } catch {
      setStatus('error')
      setErrorMsg('通信エラーが発生しました。時間をおいて再度お試しください。')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
            <Check className="h-5 w-5 text-emerald-700" />
          </div>
          <div className="min-w-0">
            <p className="text-[15px] font-semibold text-foreground">確認メールを送信しました</p>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
              メール内のリンクをクリックすると購読が始まります。
              届かない場合は迷惑メールフォルダをご確認ください。
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
          <Mail className="h-4.5 w-4.5 text-foreground" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold text-foreground">
            新着コラムと論文の豆知識を、月1回メールで
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
            X には書かない深掘りと、ツール・データベースの更新情報をお届けします。
            いつでも1クリックで解除できます。
          </p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="メールアドレス"
                className="h-10 flex-1 rounded-lg border border-border bg-background px-3 text-[14px]
                  text-foreground placeholder:text-muted-foreground/60
                  focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
              <button
                type="submit"
                disabled={!canSubmit}
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-foreground px-5
                  text-[14px] font-medium text-background transition
                  hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                購読する
              </button>
            </div>

            <label className="flex items-start gap-2 text-[12px] leading-relaxed text-muted-foreground">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 accent-current"
              />
              <span>
                <Link href="/privacy" className="text-accent hover:underline">
                  プライバシーポリシー
                </Link>
                に同意してメールを受け取る
              </span>
            </label>

            {status === 'error' && (
              <p className="text-[12px] text-red-600" role="alert">
                {errorMsg}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
