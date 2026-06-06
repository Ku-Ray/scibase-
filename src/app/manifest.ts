import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SciBase｜論文で選ぶ成分データベース',
    short_name: 'SciBase',
    description:
      '査読論文に基づいて美容・健康成分のエビデンスを評価・解説するデータベース。',
    start_url: '/?source=pwa',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    lang: 'ja',
    background_color: '#ffffff',
    theme_color: '#0f172a',
    categories: ['health', 'medical', 'reference', 'education'],
    icons: [
      {
        src: '/logo/symbol-dark-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo/symbol-dark-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo/symbol-dark-1024.png',
        sizes: '1024x1024',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo/symbol-dark-1024.png',
        sizes: '1024x1024',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: '飲み合わせチェッカー',
        short_name: 'Interaction',
        description: 'サプリ・医薬品のクロスチェック',
        url: '/tools/interaction-checker',
        icons: [{ src: '/logo/symbol-dark-192.png', sizes: '192x192', type: 'image/png' }],
      },
      {
        name: 'Analyzer 診断',
        short_name: 'Analyzer',
        description: 'あなたに合う成分を提案',
        url: '/analyzer',
        icons: [{ src: '/logo/symbol-dark-192.png', sizes: '192x192', type: 'image/png' }],
      },
      {
        name: 'お気に入り',
        short_name: 'Saved',
        description: '保存した成分・記事を確認',
        url: '/my/favorites',
        icons: [{ src: '/logo/symbol-dark-192.png', sizes: '192x192', type: 'image/png' }],
      },
    ],
  }
}
