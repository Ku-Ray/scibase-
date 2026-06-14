import type { MetadataRoute } from 'next'

const DISALLOW = [
  '/api/',
  '/_next/',
  '/opengraph-image',
  '/*/opengraph-image',
]

/* GEO（生成エンジン最適化）: 主要 AI クローラを明示的に許可。
 * `*` で既に許可済だが、明示することで「AI 引用を歓迎する」意図を示し、
 * 将来のプラットフォーム既定変更（AI 既定ブロック化）にも耐える。
 * 案内図 llms.txt / 全成分コーパス llms-full.txt を読ませる前提。 */
const AI_BOTS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',        // OpenAI（ChatGPT / Copilot 経由）
  'ClaudeBot', 'anthropic-ai', 'Claude-User',        // Anthropic
  'PerplexityBot', 'Perplexity-User',                // Perplexity
  'Google-Extended',                                  // Google Gemini / Vertex
  'Applebot-Extended',                                // Apple Intelligence
  'CCBot',                                            // Common Crawl（多数の LLM 学習元）
  'cohere-ai', 'Bytespider', 'meta-externalagent',   // Cohere / ByteDance / Meta
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOW,
      },
      {
        userAgent: AI_BOTS,
        allow: '/',
        disallow: DISALLOW,
      },
    ],
    sitemap: 'https://scibase.app/sitemap.xml',
  }
}
