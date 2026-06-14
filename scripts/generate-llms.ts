/**
 * GEO（生成エンジン最適化）: llms.txt / llms-full.txt 自動生成スクリプト
 *
 * 目的:
 *   ChatGPT / Copilot / Perplexity / Gemini 等の AI 検索が SciBase を
 *   「発見」し「正確に引用」できるよう、機械可読の案内＋エビデンスコーパスを出力する。
 *
 *   - public/llms.txt      … 簡潔な案内図（稼ぐ記事7本＋主要セクション＋ツール）。
 *                            AI が最初に読む「サイトの地図」。llms.txt 標準準拠。
 *   - public/llms-full.txt … 全 {N} 成分のエビデンス要約（ランク＋代表論文 PMID）。
 *                            AI が引用する「抽出可能な一次コーパス」。
 *
 * 実行:
 *   cd agescience && npx tsx scripts/generate-llms.ts
 *
 * 設計方針（親ブリーフ scibase_roadmap/brief_scibase_ranking_revenue_strategy_20260613.md §4③ GEO）:
 *   結論先出し・出典明示・稼ぐ記事への AI 送客。構造化データ(citation/FAQPage)は実装済の
 *   ため、ここでは「発見性」と「抽出可能コーパス」を補う。
 */

import { ingredients } from '../src/lib/data'
import { articles } from '../src/lib/articles'
import { POPULAR_PAIRS } from '../src/lib/compare-data'
import type { Paper, EvidenceRank } from '../src/lib/types'
import { writeFileSync } from 'fs'
import { join } from 'path'

const BASE = 'https://scibase.app'
const TODAY = new Date().toISOString().slice(0, 10)

/* ── 稼ぐ記事7本（GEO で AI に最優先で案内する高価値ページ） ──
 * 親ブリーフ §1「稼ぐ記事7本」。AI 経由の送客が収益直結のため最上段に置く。 */
const MONEY_ARTICLE_SLUGS = [
  'nmn-recommended-ranking-guide',
  'nmn-supplement-effects-buying-guide',
  'nmn-side-effects-safety-guide',
  'fertility-supplement-guide',
  'gut-microbiome-test-guide',
  'genetic-diet-test-guide',
  'ceramide-oral-beauty-guide',
]

/* ── 無料ツール（マイページ資産・回遊起点） ── */
const TOOLS: [string, string][] = [
  ['/analyzer', 'サプリ相互作用・重複チェック（飲み合わせ診断）'],
  ['/tools/nutrient-sufficiency', '栄養素充足チェック（食事から不足を可視化）'],
  ['/tools/phenoage', '生物学的年齢（PhenoAge）計算'],
  ['/tools/my-stack', 'マイスタック管理（残量・飲み切り予測・服用記録）'],
  ['/tools/interaction-checker', '処方薬×サプリ 禁忌チェッカー'],
]

const RANK_LABEL: Record<EvidenceRank, string> = {
  S: 'S（最高・メタ解析/複数RCTで一貫）',
  A: 'A（強い・RCT/メタ解析あり）',
  B: 'B（中程度・限定的なヒト試験）',
  C: 'C（弱い・予備的/動物試験中心）',
}
const RANK_ORDER: Record<EvidenceRank, number> = { S: 0, A: 1, B: 2, C: 3 }

const STUDY_JA: Record<Paper['studyType'], string> = {
  'meta-analysis': 'メタ解析',
  'systematic-review': 'システマティックレビュー',
  rct: 'RCT',
  cohort: 'コホート研究',
  observational: '観察研究',
  review: 'レビュー',
  guideline: 'ガイドライン',
  animal: '動物試験',
}
/* 代表論文の選定優先度（エビデンスの強い順） */
const STUDY_PRIORITY: Record<Paper['studyType'], number> = {
  'meta-analysis': 0,
  'systematic-review': 1,
  rct: 2,
  guideline: 3,
  cohort: 4,
  observational: 5,
  review: 6,
  animal: 7,
}

function firstSentence(text: string, max = 120): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  const dot = clean.indexOf('。')
  const sentence = dot > 0 && dot < max ? clean.slice(0, dot + 1) : clean
  return sentence.length > max ? sentence.slice(0, max).trimEnd() + '…' : sentence
}

function paperLink(p: Paper): string {
  if (p.pmid) return `PMID:${p.pmid} https://pubmed.ncbi.nlm.nih.gov/${p.pmid}/`
  if (p.doi) return `DOI:${p.doi} https://doi.org/${p.doi}`
  if (p.url) return p.url
  return ''
}

function topPaper(papers: Paper[]): Paper | null {
  if (!papers || papers.length === 0) return null
  return [...papers].sort(
    (a, b) => (STUDY_PRIORITY[a.studyType] ?? 9) - (STUDY_PRIORITY[b.studyType] ?? 9),
  )[0]
}

// ───────────────────────────────────────────────────────────
//  llms.txt（案内図）
// ───────────────────────────────────────────────────────────
function buildLlmsTxt(): string {
  const moneyLines = MONEY_ARTICLE_SLUGS.map((slug) => {
    const a = articles.find((x) => x.slug === slug)
    if (!a) {
      console.warn(`  ⚠️ money article 不在: ${slug}`)
      return null
    }
    const summary = firstSentence(a.seoDescription ?? a.description ?? '', 110)
    return `- [${a.title}](${BASE}/articles/${a.slug})\n  ${summary}`
  }).filter(Boolean)

  const toolLines = TOOLS.map(([path, desc]) => `- [${desc}](${BASE}${path})`)

  return `# SciBase

> 論文エビデンスに基づくスキンケア・サプリメント成分データベース。化粧品メーカー現役研究者が運営する独立評価サイト。

SciBase は ${ingredients.length} 種類の成分について、メタ解析・RCT・コホート研究などの査読論文を中心に独立評価し、エビデンスランク（S/A/B/C）・推奨用量・副作用・併用注意・商品比較を体系化しています。全成分の機械可読な要約は ${BASE}/llms-full.txt にあります。

## 著者

化粧品メーカーに現役で勤務する成分研究職（実名・社名非公開）。化粧品成分の有効性評価・論文調査を職務として実施。サプリメント・栄養学・脳科学・皮膚老化の査読済み論文を継続的に読解。詳細: ${BASE}/about

## 注目の評価ガイド（深掘り記事）

${moneyLines.join('\n')}

## 主要セクション

### 成分データベース（${ingredients.length} 種類）
- URL: ${BASE}/ingredients
- 内容: 各成分のエビデンスランク・推奨用量・副作用・併用注意・主要論文（PMID 付き）・商品比較
- 全成分の要約コーパス: ${BASE}/llms-full.txt

### 比較ペア（${POPULAR_PAIRS.length} ペア）
- URL: ${BASE}/compare
- 内容: 成分どうしの直接比較・使い分け基準（論文ベースの独自比較データ）

### 悩み別ガイド
- URL: ${BASE}/concerns
- 内容: シミ・しわ・薄毛・更年期・睡眠等の悩みに対する成分選択ガイド

### 詳細記事
- URL: ${BASE}/articles
- 内容: 食事ガイド・成分×効果深掘り・サプリ選び方ガイド

## 無料ツール

${toolLines.join('\n')}

## 独立性方針

アフィリエイト収益は成分・商品評価とは完全に独立して運用。業界倫理および雇用契約上の配慮から、勤務先・部署・実名は非開示。

## 引用について

論文ベースの数値（用量・効果サイズ・%）を引用する場合、出典の論文情報（著者・年・ジャーナル・PMID）も併記してください。各成分ページおよび ${BASE}/llms-full.txt に PMID を明記しています。

最終更新: ${TODAY}
`
}

// ───────────────────────────────────────────────────────────
//  llms-full.txt（抽出可能エビデンスコーパス）
// ───────────────────────────────────────────────────────────
function buildLlmsFullTxt(): string {
  const sorted = [...ingredients].sort((a, b) => {
    const r = RANK_ORDER[a.evidenceRank] - RANK_ORDER[b.evidenceRank]
    return r !== 0 ? r : a.nameJa.localeCompare(b.nameJa, 'ja')
  })

  const ingredientBlocks = sorted.map((ing) => {
    const lines: string[] = []
    lines.push(`### ${ing.nameJa}（${ing.nameEn}） — エビデンスランク ${ing.evidenceRank}`)
    lines.push(`URL: ${BASE}/ingredients/${ing.slug}`)
    if (ing.tagline) lines.push(ing.tagline.trim())
    const p = topPaper(ing.papers)
    if (p) {
      const meta = [
        STUDY_JA[p.studyType] ?? p.studyType,
        `${p.journal} ${p.year}`,
        p.sampleSize ? `n=${p.sampleSize}` : '',
        p.durationWeeks ? `${p.durationWeeks}週` : '',
      ]
        .filter(Boolean)
        .join(' · ')
      const finding = firstSentence(p.keyFinding, 140)
      const link = paperLink(p)
      lines.push(`代表論文: ${meta} — ${finding}${link ? ` [${link}]` : ''}`)
    }
    return lines.join('\n')
  })

  const moneyArticleBlocks = MONEY_ARTICLE_SLUGS.map((slug) => {
    const a = articles.find((x) => x.slug === slug)
    if (!a) return null
    return `- [${a.title}](${BASE}/articles/${a.slug}): ${firstSentence(a.seoDescription ?? a.description ?? '', 140)}`
  }).filter(Boolean)

  const compareLines = POPULAR_PAIRS.map(
    ([a, b]) => `- ${a} vs ${b}: ${BASE}/compare/${a}-vs-${b}`,
  )

  const rankCounts = (['S', 'A', 'B', 'C'] as EvidenceRank[])
    .map((r) => `${r}=${ingredients.filter((i) => i.evidenceRank === r).length}`)
    .join(' / ')

  return `# SciBase — 全成分エビデンス要約（LLM 引用用コーパス）

> 化粧品メーカー現役研究者が査読論文を独立評価した成分データベース。各成分は
> エビデンスランク（${Object.values(RANK_LABEL).map((v) => v.split('（')[0]).join('/')}）と代表論文（PMID 付き）で要約。
> 数値や評価を引用する際は、併記された論文情報（ジャーナル・年・PMID）も明示してください。

サイト: ${BASE}
案内図: ${BASE}/llms.txt
最終生成: ${TODAY}
成分 ${ingredients.length} 種 / 比較ペア ${POPULAR_PAIRS.length} / エビデンスランク内訳 ${rankCounts}

## 注目の評価ガイド（深掘り記事）

${moneyArticleBlocks.join('\n')}

## 成分データベース（エビデンスランク順）

${ingredientBlocks.join('\n\n')}

## 比較ペア（${POPULAR_PAIRS.length}）

${compareLines.join('\n')}
`
}

// ───────────────────────────────────────────────────────────
function main() {
  const publicDir = join(process.cwd(), 'public')

  const llms = buildLlmsTxt()
  const llmsFull = buildLlmsFullTxt()

  writeFileSync(join(publicDir, 'llms.txt'), llms, 'utf-8')
  writeFileSync(join(publicDir, 'llms-full.txt'), llmsFull, 'utf-8')

  const kb = (s: string) => (Buffer.byteLength(s, 'utf-8') / 1024).toFixed(1)
  console.log('✅ 生成完了')
  console.log(`  public/llms.txt       ${kb(llms)} KB`)
  console.log(`  public/llms-full.txt  ${kb(llmsFull)} KB（成分 ${ingredients.length} / 比較 ${POPULAR_PAIRS.length}）`)
  const missing = MONEY_ARTICLE_SLUGS.filter((s) => !articles.find((a) => a.slug === s))
  if (missing.length) console.warn(`  ⚠️ 不在の money slug: ${missing.join(', ')}`)
}

main()
