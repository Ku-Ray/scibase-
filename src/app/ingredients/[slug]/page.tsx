import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, ExternalLink, ArrowLeft } from 'lucide-react'
import { getIngredient, ingredients, concerns } from '@/lib/data'
import { EvidenceBadge } from '@/components/EvidenceBadge'
import type { Metadata } from 'next'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return ingredients.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const ing = getIngredient(slug)
  if (!ing) return {}
  return {
    title: `${ing.nameJa}の効果・論文解説`,
    description: ing.tagline,
  }
}

const studyLabel: Record<string, string> = {
  'meta-analysis': 'メタ解析・SR',
  rct:             'RCT',
  cohort:          'コホート研究',
  observational:   '観察研究',
  animal:          '動物実験',
}

const platformLabel: Record<string, string> = {
  iherb:  'iHerb',
  amazon: 'Amazon',
  rakuten:'楽天',
}

export default async function IngredientPage({ params }: Props) {
  const { slug } = await params
  const ing = getIngredient(slug)
  if (!ing) notFound()

  const relatedConcerns = concerns.filter((c) => ing.concerns.includes(c.slug))

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-[12px] mb-8"
        style={{ color: 'var(--text-tertiary)' }}>
        <Link href="/" className="hover:underline">ホーム</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/ingredients" className="hover:underline">成分一覧</Link>
        <ChevronRight className="w-3 h-3" />
        <span style={{ color: 'var(--text-secondary)' }}>{ing.nameJa}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <EvidenceBadge rank={ing.evidenceRank} variant="full" />
          {relatedConcerns.map((c) => (
            <Link key={c.slug} href={`/concerns/${c.slug}`}
              style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
              className="text-[12px] px-2.5 py-1 rounded-full hover:border-[var(--accent)] transition-colors">
              {c.nameJa}
            </Link>
          ))}
        </div>

        <h1 style={{ color: 'var(--text-primary)', lineHeight: 1.2 }}
          className="text-[28px] sm:text-[34px] font-bold mb-1">
          {ing.nameJa}
        </h1>
        <p style={{ color: 'var(--text-tertiary)' }} className="text-[13px]">{ing.nameEn}</p>
      </div>

      {/* Evidence summary */}
      <div className={`ev-${ing.evidenceRank.toLowerCase()} border rounded-2xl p-5 mb-10`}>
        <p className="font-semibold text-[15px] leading-relaxed">{ing.tagline}</p>
      </div>

      {/* Description */}
      <section className="mb-10">
        <h2 style={{ color: 'var(--text-primary)' }}
          className="font-semibold text-[18px] mb-4">この成分について</h2>
        <p style={{ color: 'var(--text-secondary)' }}
          className="text-[15px] leading-[1.85]">
          {ing.description}
        </p>
      </section>

      {/* Papers */}
      <section className="mb-10">
        <h2 style={{ color: 'var(--text-primary)' }}
          className="font-semibold text-[18px] mb-4">主要研究</h2>
        <div className="space-y-3">
          {ing.papers.map((p, i) => (
            <div key={i}
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              className="rounded-2xl p-5">

              {/* Meta row */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span style={{ background: 'var(--bg-muted)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
                  className="text-[11px] px-2.5 py-0.5 rounded-md font-medium">
                  {studyLabel[p.studyType] ?? p.studyType}
                </span>
                {[p.journal, `${p.year}年`, p.sampleSize ? `n=${p.sampleSize.toLocaleString()}` : null, p.durationWeeks ? `${p.durationWeeks}週間` : null]
                  .filter(Boolean)
                  .map((v, j) => (
                    <span key={j} style={{ color: 'var(--text-tertiary)' }} className="text-[11px]">{v}</span>
                  ))}
              </div>

              {/* Title */}
              <p style={{ color: 'var(--text-tertiary)' }} className="text-[12px] mb-2 leading-snug italic">
                {p.title}
              </p>

              {/* Finding */}
              <p style={{ color: 'var(--text-primary)' }}
                className="text-[14px] leading-relaxed font-medium">
                {p.keyFinding}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Dosage guide */}
      <section className="mb-10">
        <h2 style={{ color: 'var(--text-primary)' }}
          className="font-semibold text-[18px] mb-4">摂取ガイド（論文ベース）</h2>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          className="rounded-2xl overflow-hidden">
          {[
            ing.dosageMin ? {
              label: '有効量',
              value: `${ing.dosageMin}${ing.dosageMax && ing.dosageMax !== ing.dosageMin ? `–${ing.dosageMax}` : ''} ${ing.dosageUnit}`,
            } : null,
            ing.timing    ? { label: 'タイミング', value: ing.timing }    : null,
            ing.duration  ? { label: '継続期間',   value: ing.duration }  : null,
          ].filter(Boolean).map((row, i, arr) => (
            <div key={i}
              style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--border-light)' : 'none' }}
              className="flex gap-4 px-5 py-4">
              <span style={{ color: 'var(--text-tertiary)' }}
                className="text-[13px] font-medium w-20 flex-shrink-0 pt-0.5">
                {row!.label}
              </span>
              <span style={{ color: 'var(--text-primary)' }} className="text-[14px]">
                {row!.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Side effects */}
      {(ing.sideEffects?.length || ing.contraindications?.length) ? (
        <section className="mb-10">
          <h2 style={{ color: 'var(--text-primary)' }}
            className="font-semibold text-[18px] mb-4">副作用・注意事項</h2>
          <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D' }}
            className="rounded-2xl p-5 space-y-4">
            {ing.sideEffects?.length ? (
              <div>
                <p className="text-[12px] font-semibold text-amber-800 mb-2">副作用の可能性</p>
                <ul className="space-y-1">
                  {ing.sideEffects.map((s, i) => (
                    <li key={i} className="text-[13px] text-amber-900 flex gap-2">
                      <span>·</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {ing.contraindications?.length ? (
              <div>
                <p className="text-[12px] font-semibold text-amber-800 mb-2">注意が必要な方</p>
                <ul className="space-y-1">
                  {ing.contraindications.map((c, i) => (
                    <li key={i} className="text-[13px] text-amber-900 flex gap-2">
                      <span>·</span>{c}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Products */}
      {ing.products.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 style={{ color: 'var(--text-primary)' }}
              className="font-semibold text-[18px]">おすすめ商品</h2>
            <span style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)', color: 'var(--text-tertiary)' }}
              className="text-[11px] px-2 py-0.5 rounded">
              PR・アフィリエイトを含む
            </span>
          </div>
          <div className="space-y-3">
            {ing.products.map((prod, i) => (
              <div key={i}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                className="rounded-2xl p-5 flex items-center gap-4 justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                      className="text-[11px] px-2 py-0.5 rounded">
                      {platformLabel[prod.platform]}
                    </span>
                    <span style={{ color: 'var(--text-tertiary)' }} className="text-[11px]">
                      {prod.brand}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-primary)' }}
                    className="font-medium text-[14px] mb-1">{prod.name}</p>
                  {prod.note && (
                    <p style={{ color: 'var(--text-secondary)' }} className="text-[12px]">
                      {prod.note}
                    </p>
                  )}
                </div>
                <div className="flex-shrink-0 text-right">
                  <p style={{ color: 'var(--text-primary)' }}
                    className="font-semibold text-[14px] mb-2">
                    ¥{prod.priceJpy.toLocaleString()}<span style={{ color: 'var(--text-tertiary)' }} className="text-[11px] font-normal">〜</span>
                  </p>
                  <a href={prod.url} target="_blank" rel="noopener noreferrer nofollow"
                    style={{ background: 'var(--brand)', color: 'white' }}
                    className="inline-flex items-center gap-1.5 text-[12px] font-medium
                      rounded-lg px-3.5 py-2 hover:opacity-90 transition-opacity">
                    購入する
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Meta */}
      <p style={{ color: 'var(--text-tertiary)' }} className="text-[12px] mb-8">
        最終更新：{ing.updatedAt} ／ 参照論文：{ing.papers.length}件
      </p>

      {/* Disclaimer */}
      <div style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
        className="rounded-xl p-4 text-[13px] leading-relaxed mb-8">
        本ページの情報は医療的アドバイスを提供するものではありません。
        サプリメントの使用前には医師・薬剤師にご相談ください。
        掲載内容は論文情報の提供を目的としており、効果・効能を保証するものではありません。
      </div>

      <Link href="/ingredients"
        style={{ color: 'var(--text-secondary)' }}
        className="inline-flex items-center gap-2 text-[13px] hover:text-[var(--text-primary)] transition-colors">
        <ArrowLeft className="w-4 h-4" />
        成分一覧に戻る
      </Link>
    </div>
  )
}
