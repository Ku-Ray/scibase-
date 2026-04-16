import { ImageResponse } from 'next/og'
import { getIngredient, ingredients } from '@/lib/data'
import type { EvidenceRank } from '@/lib/types'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  return ingredients.map((i) => ({ slug: i.slug }))
}

const rankPalette: Record<EvidenceRank, { bg: string; accent: string; labelBg: string; labelText: string; sub: string }> = {
  S: { bg: '#FFFBEB', accent: '#F59E0B', labelBg: '#F59E0B', labelText: '#fff',    sub: '#92400E' },
  A: { bg: '#EFF6FF', accent: '#3B82F6', labelBg: '#3B82F6', labelText: '#fff',    sub: '#1E3A8A' },
  B: { bg: '#ECFDF5', accent: '#10B981', labelBg: '#10B981', labelText: '#fff',    sub: '#065F46' },
  C: { bg: '#F5F5F4', accent: '#78716C', labelBg: '#78716C', labelText: '#fff',    sub: '#292524' },
}

const rankLabel: Record<EvidenceRank, string> = {
  S: 'エビデンス S ランク',
  A: 'エビデンス A ランク',
  B: 'エビデンス B ランク',
  C: 'エビデンス C ランク',
}

async function fetchFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700;900&text=${encodeURIComponent(text)}`
    const css = await fetch(cssUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SciBase/1.0)' },
    }).then((r) => r.text())
    const match = css.match(/src: url\(([^)]+)\) format\('woff2'\)/)
    if (!match) return null
    return fetch(match[1]).then((r) => r.arrayBuffer())
  } catch {
    return null
  }
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ing = getIngredient(slug)
  if (!ing) return new Response('Not Found', { status: 404 })

  const p = rankPalette[ing.evidenceRank]
  const allText = `SciBase${ing.nameJa}${ing.tagline}${rankLabel[ing.evidenceRank]}論文${ing.papers.length}件`
  const fontData = await fetchFont(allText)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: p.bg,
          borderTop: `14px solid ${p.accent}`,
          padding: '56px 64px',
          fontFamily: fontData ? 'Noto Sans JP' : 'sans-serif',
        }}
      >
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px' }}>
          <span style={{ fontSize: '22px', fontWeight: 700, color: '#374151', letterSpacing: '0.1em' }}>
            SciBase
          </span>
          <div style={{
            display: 'flex', alignItems: 'center',
            backgroundColor: p.labelBg, color: p.labelText,
            padding: '8px 20px', borderRadius: '100px',
            fontSize: '18px', fontWeight: 800,
          }}>
            {rankLabel[ing.evidenceRank]}
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '18px', color: p.sub, marginBottom: '12px', fontWeight: 700, opacity: 0.8 }}>
            {ing.nameEn}
          </div>
          <div style={{
            fontSize: '80px', fontWeight: 900, color: '#111827',
            lineHeight: 1.1, marginBottom: '28px',
          }}>
            {ing.nameJa}
          </div>
          <div style={{
            fontSize: '26px', color: '#4B5563', lineHeight: 1.6,
            maxWidth: '900px', fontWeight: 400,
          }}>
            {ing.tagline}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '17px', color: '#9CA3AF' }}>
          <span>論文 {ing.papers.length}件の根拠</span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#D1D5DB' }} />
          <span>scibase.app</span>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fontData ? { fonts: [{ name: 'Noto Sans JP', data: fontData, weight: 700 }] } : {}),
    }
  )
}
