import { NextResponse } from 'next/server'

/**
 * Newsletter 購読 API（Buttondown 中継）
 * - 同意（consent）必須＝特定電子メール法のオプトイン
 * - 二重オプトイン（確認メール）は Buttondown 側の設定で送信される
 * - 配信基盤を将来差し替えられるよう、ここだけが外部 API を知る
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const BUTTONDOWN_ENDPOINT = 'https://api.buttondown.com/v1/subscribers'

type SubscribeBody = {
  email?: string
  source?: string
  consent?: boolean
}

export async function POST(req: Request) {
  let body: SubscribeBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: '不正なリクエストです。' }, { status: 400 })
  }

  const email = String(body.email ?? '').trim().toLowerCase()
  const source = String(body.source ?? 'unknown').slice(0, 64)

  if (body.consent !== true) {
    return NextResponse.json({ error: 'プライバシーポリシーへの同意が必要です。' }, { status: 400 })
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'メールアドレスの形式が正しくありません。' }, { status: 400 })
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: '購読の受付は現在準備中です。時間をおいてお試しください。' },
      { status: 503 },
    )
  }

  const payload = {
    email_address: email,
    tags: [source],
    metadata: { source, consented_at: new Date().toISOString() },
  }

  let res = await fetch(BUTTONDOWN_ENDPOINT, {
    method: 'POST',
    headers: { Authorization: `Token ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok && res.status === 400) {
    const detail = await res.text().catch(() => '')
    // 登録済みは成功扱い（再表示抑制フラグを立てさせる）
    if (/already|exists|subscribed/i.test(detail)) {
      return NextResponse.json({ ok: true, already: true })
    }
    // tag 起因の 400 の可能性に備えて tags なしで 1 回だけ再試行
    res = await fetch(BUTTONDOWN_ENDPOINT, {
      method: 'POST',
      headers: { Authorization: `Token ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_address: email, metadata: payload.metadata }),
    })
    if (!res.ok) {
      console.error('buttondown subscribe failed', res.status, detail.slice(0, 300))
      return NextResponse.json(
        { error: '送信に失敗しました。時間をおいて再度お試しください。' },
        { status: 502 },
      )
    }
  } else if (!res.ok) {
    const detail = await res.text().catch(() => '')
    console.error('buttondown subscribe failed', res.status, detail.slice(0, 300))
    return NextResponse.json(
      { error: '送信に失敗しました。時間をおいて再度お試しください。' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
