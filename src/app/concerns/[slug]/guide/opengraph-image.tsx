import { ImageResponse } from 'next/og'
import { getConcern } from '@/lib/data'
import { getConcernGuide, getAllConcernGuideSlugs } from '@/lib/concern-guide-data'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  return getAllConcernGuideSlugs().map((slug) => ({ slug }))
}

const categoryPalette: Record<
  string,
  { bg: string; accent: string; text: string }
> = {
  skin: { bg: '#FFF1F2', accent: '#FB7185', text: '#9F1239' },
  body: { bg: '#FFF7ED', accent: '#FB923C', text: '#9A3412' },
  cognitive: { bg: '#EFF6FF', accent: '#60A5FA', text: '#1E3A8A' },
  sleep: { bg: '#F5F3FF', accent: '#A78BFA', text: '#4C1D95' },
  gut: { bg: '#F0FDF4', accent: '#34D399', text: '#065F46' },
  immunity: { bg: '#ECFDF5', accent: '#10B981', text: '#064E3B' },
  muscle: { bg: '#FFFBEB', accent: '#F59E0B', text: '#92400E' },
  cardiovascular: { bg: '#FEF2F2', accent: '#F87171', text: '#991B1B' },
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

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = getConcernGuide(slug)
  const concern = getConcern(slug)
  if (!guide || !concern) {
    return new Response('Not Found', { status: 404 })
  }

  const p = categoryPalette[concern.category] ?? categoryPalette.skin
  const allText = `SciBase${guide.title}${concern.nameJa}論文で効果確認商品ガイドBESTPICKエビデンス`
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '36px',
          }}
        >
          <span
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#374151',
              letterSpacing: '0.1em',
            }}
          >
            SciBase
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              border: `2px solid ${p.accent}`,
              color: p.text,
              padding: '8px 20px',
              borderRadius: '100px',
              fontSize: '17px',
              fontWeight: 700,
            }}
          >
            論文で効果確認・商品ガイド
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: '44px',
              fontWeight: 700,
              color: p.text,
              lineHeight: 1.2,
              marginBottom: '20px',
              letterSpacing: '0.02em',
            }}
          >
            論文で効果確認
          </div>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 900,
              color: '#111827',
              lineHeight: 1.15,
              marginBottom: '24px',
              letterSpacing: '-0.01em',
            }}
          >
            {`${concern.nameJa}に効く成分の選び方`}
          </div>
          <div style={{ fontSize: '22px', color: '#4B5563', lineHeight: 1.7 }}>
            BEST PICK Top 3＋関連成分。経口・外用を横断
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '17px',
            color: '#9CA3AF',
          }}
        >
          <span>scibase.app</span>
          <span
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: '#D1D5DB',
            }}
          />
          <span>論文ベースの成分DB</span>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fontData
        ? { fonts: [{ name: 'Noto Sans JP', data: fontData, weight: 700 }] }
        : {}),
    },
  )
}
