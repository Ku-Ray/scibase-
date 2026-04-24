import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/opengraph-image',
          '/*/opengraph-image',
        ],
      },
    ],
    sitemap: 'https://scibase.app/sitemap.xml',
  }
}
