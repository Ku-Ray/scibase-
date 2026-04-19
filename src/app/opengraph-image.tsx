import { ImageResponse } from 'next/og'

export const alt = 'SciBase — 論文で選ぶ、成分データベース'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

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

export default async function Image() {
  const allText = 'SciBase論文で選ぶ、成分データベース査読済みメタ解析RCTコホート悩みに効くscibase.app'
  const fontData = await fetchFont(allText)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#F8FAFC',
          borderTop: '14px solid #0F172A',
          padding: '56px 64px',
          fontFamily: fontData ? 'Noto Sans JP' : 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '22px', fontWeight: 700, color: '#374151', letterSpacing: '0.1em' }}>
            SciBase
          </span>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '20px', color: '#6B7280', marginBottom: '16px', fontWeight: 700 }}>
            論文で選ぶ、成分データベース
          </div>
          <div style={{
            fontSize: '72px', fontWeight: 900, color: '#0F172A',
            lineHeight: 1.15, marginBottom: '28px', letterSpacing: '-0.02em',
          }}>
            悩みから、効く成分が分かる。
          </div>
          <div style={{ fontSize: '24px', color: '#4B5563', lineHeight: 1.6, maxWidth: '900px' }}>
            メタ解析・RCT・コホート研究のエビデンスを透明に評価する、査読済み成分データベース。
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {['メタ解析', 'RCT', 'コホート', '査読済み'].map((t) => (
            <span
              key={t}
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#334155',
                backgroundColor: '#fff',
                border: '1px solid #CBD5E1',
                borderRadius: '999px',
                padding: '6px 14px',
              }}
            >
              {t}
            </span>
          ))}
          <span style={{ flex: 1 }} />
          <span style={{ fontSize: '17px', color: '#9CA3AF', fontWeight: 700 }}>scibase.app</span>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fontData ? { fonts: [{ name: 'Noto Sans JP', data: fontData, weight: 700 }] } : {}),
    },
  )
}
