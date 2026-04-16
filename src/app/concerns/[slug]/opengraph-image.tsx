import { ImageResponse } from 'next/og'
import { getConcern, getIngredientsByConcern, concerns } from '@/lib/data'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  return concerns.map((c) => ({ slug: c.slug }))
}

const categoryPalette: Record<string, { bg: string; accent: string; text: string }> = {
  skin:      { bg: '#FFF1F2', accent: '#FB7185', text: '#9F1239' },
  body:      { bg: '#FFF7ED', accent: '#FB923C', text: '#9A3412' },
  cognitive: { bg: '#EFF6FF', accent: '#60A5FA', text: '#1E3A8A' },
  sleep:     { bg: '#F5F3FF', accent: '#A78BFA', text: '#4C1D95' },
  gut:       { bg: '#F0FDF4', accent: '#34D399', text: '#065F46' },
  immunity:  { bg: '#ECFDF5', accent: '#10B981', text: '#064E3B' },
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
  const concern = getConcern(slug)
  if (!concern) return new Response('Not Found', { status: 404 })

  const ingredients = getIngredientsByConcern(slug)
  const p = categoryPalette[concern.category] ?? categoryPalette.skin
  const sRankCount = ingredients.filter((i) => i.evidenceRank === 'S').length
  const topNames = ingredients.slice(0, 3).map((i) => i.nameJa).join('・')

  const allText = `SciBase${concern.nameJa}${concern.description}${topNames}論文成分`
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
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px' }}>
          <span style={{ fontSize: '22px', fontWeight: 700, color: '#374151', letterSpacing: '0.1em' }}>
            SciBase
          </span>
          <div style={{
            display: 'flex', alignItems: 'center',
            border: `2px solid ${p.accent}`, color: p.text,
            padding: '8px 20px', borderRadius: '100px',
            fontSize: '17px', fontWeight: 700,
          }}>
            論文エビデンス順
          </div>
        </div>

        {/* Emoji + name */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '56px', marginBottom: '16px', lineHeight: 1 }}>
            {concern.emoji}
          </div>
          <div style={{
            fontSize: '72px', fontWeight: 900, color: '#111827',
            lineHeight: 1.1, marginBottom: '24px',
          }}>
            {concern.nameJa}
          </div>
          <div style={{ fontSize: '24px', color: '#6B7280', lineHeight: 1.6, maxWidth: '900px' }}>
            {concern.description}
          </div>
        </div>

        {/* Footer stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '17px', color: '#9CA3AF' }}>
          <span>{ingredients.length}成分を掲載</span>
          {sRankCount > 0 && (
            <>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#D1D5DB' }} />
              <span>Sランク {sRankCount}成分</span>
            </>
          )}
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
