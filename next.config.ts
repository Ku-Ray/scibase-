import type { NextConfig } from "next";

const securityHeaders = [
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  { key: 'X-Frame-Options',           value: 'DENY' },
  { key: 'X-XSS-Protection',          value: '1; mode=block' },
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      // 静的アセットの長期キャッシュ
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // OG画像・サイトマップは短めのキャッシュ
      {
        source: '/opengraph-image(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=3600' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // 悩み解決ガイドをコラム配下に統合（2026-05-01）
      {
        source: '/concerns/:slug/guide',
        destination: '/articles/:slug-supplement-guide',
        permanent: true,
      },
      // tmg slug → trimethylglycine-tmg 統合（2026-06-10・重複定義整理）
      {
        source: '/ingredients/tmg',
        destination: '/ingredients/trimethylglycine-tmg',
        permanent: true,
      },
      // 成分DB 重複統合 A群（2026-06-14・名称完全一致ペアの統合）
      {
        source: '/ingredients/citicoline-cdp-choline',
        destination: '/ingredients/citicoline',
        permanent: true,
      },
      {
        source: '/ingredients/inositol-myo',
        destination: '/ingredients/myo-inositol',
        permanent: true,
      },
      {
        source: '/ingredients/n-acetylcysteine',
        destination: '/ingredients/nac',
        permanent: true,
      },
      {
        source: '/ingredients/ho-shou-wu',
        destination: '/ingredients/he-shou-wu',
        permanent: true,
      },
    ]
  },
}

export default nextConfig;
