import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getConcern, getIngredientsByConcern, concerns } from '@/lib/data'
import { IngredientCard } from '@/components/IngredientCard'
import { EvidenceBadge } from '@/components/EvidenceBadge'
import type { Metadata } from 'next'
import type { EvidenceRank } from '@/lib/types'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return concerns.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = getConcern(slug)
  if (!c) return {}
  return {
    title: `${c.nameJa}に効く成分・サプリ一覧【論文エビデンス順】`,
    description: `${c.nameJa}に関連する成分を論文エビデンスの強さ順に掲載。${c.description}`,
    alternates: { canonical: `${BASE_URL}/concerns/${slug}` },
  }
}

const BASE_URL = 'https://scibase.app'

/* 損失回避フレーミング：放置した場合のリスクを一文で */
const lossFraming: Record<string, string> = {
  'skin-aging':   '老化は放置するほど回復コストが上がる。コラーゲン産生は25歳から年1%低下し続ける。',
  'wrinkles':     'シワは一度定着すると外用だけでは改善が困難になる。早期の成分選択が効率を左右する。',
  'spots':        '紫外線ダメージは蓄積型。放置した色素沈着はターンオーバー低下で薄くなりにくくなる。',
  'barrier':      'バリア機能の低下は悪循環。外からの刺激が増え、さらにバリアが壊れるループに入る。',
  'dry-skin':     '乾燥は皮膚老化を加速する。水分量が低下した肌はシワ・くすみが出やすくなる。',
  'acne':         '炎症後色素沈着は放置で定着する。ニキビの跡を最小化するには炎症期からのケアが必要。',
  'pores':        '毛穴の開きは角栓の蓄積→炎症→拡張のサイクルで進行する。早期の詰まり除去が鍵。',
  'uv-damage':    '光老化は累積ダメージ。「見えていないダメージ」が数年後にシミ・シワとして現れる。',
  'sleep':        '睡眠不足は1日でコルチゾールを上昇させ老化を加速する。慢性化するほど回復が難しくなる。',
  'stress':       '慢性ストレスはテロメアを短縮させ細胞老化を早める。コルチゾール過剰は皮膚・脳・免疫に影響する。',
  'fatigue':      '慢性疲労を放置するとミトコンドリア機能が低下し、老化を全身で加速させる。',
  'cognitive':    '認知機能の低下は30代から静かに始まる。早期の神経保護が後の差を大きくする。',
  'inflammation': '慢性炎症（Inflammaging）は老化の根本原因の1つ。放置すると全臓器の老化が加速する。',
  'gut':          '腸内フローラの乱れは全身炎症・免疫低下・脳機能低下につながる。放置コストは大きい。',
  'immunity':     '免疫機能の低下は感染リスクだけでなく、がん・慢性疾患への抵抗力も落とす。',
  'hair':         '抜け毛・薄毛は毛包が萎縮すると再生が難しくなる。早期の栄養補給が毛周期を守る。',
  'bone':         '骨密度は35歳をピークに低下する。失われた骨を取り戻すより、維持する方がはるかに効率的。',
  'metabolism':   '血糖スパイクが繰り返されるとAGEs（糖化産物）が蓄積し、皮膚・血管・脳を老化させる。',
  'longevity':    '老化細胞の蓄積は臓器機能を静かに蝕む。Senolytic研究は「除去」より「蓄積させないこと」を示す。',
  'eye-health':    '眼の光老化は紫外線暴露とともに蓄積する。黄斑変性の初期は自覚症状がなく発見が遅れがち。',
  'muscle':        'サルコペニア（加齢性筋肉減少）は30代から静かに始まる。筋量の低下は代謝・姿勢・転倒リスクに直結する。',
  'cardiovascular': '心血管機能の低下は自覚なく進行する。動脈硬化・血圧上昇は早期介入ほど可逆性が高い。',
}

const categoryHero: Record<string, { bg: string; border: string; text: string }> = {
  skin:      { bg: 'bg-rose-50',    border: 'border-t-rose-400',    text: 'text-rose-700'    },
  body:      { bg: 'bg-orange-50',  border: 'border-t-orange-400',  text: 'text-orange-700'  },
  cognitive: { bg: 'bg-blue-50',    border: 'border-t-blue-500',    text: 'text-blue-700'    },
  sleep:     { bg: 'bg-violet-50',  border: 'border-t-violet-500',  text: 'text-violet-700'  },
  gut:       { bg: 'bg-teal-50',    border: 'border-t-teal-500',    text: 'text-teal-700'    },
  immunity:  { bg: 'bg-emerald-50', border: 'border-t-emerald-500', text: 'text-emerald-700' },
}

export default async function ConcernPage({ params }: Props) {
  const { slug } = await params
  const concern = getConcern(slug)
  if (!concern) notFound()

  const all = getIngredientsByConcern(slug)
  const ranks: EvidenceRank[] = ['S', 'A', 'B', 'C']
  const hero = categoryHero[concern.category] ?? categoryHero.skin

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム',     item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: '悩みから探す', item: `${BASE_URL}/concerns` },
      { '@type': 'ListItem', position: 3, name: concern.nameJa, item: `${BASE_URL}/concerns/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* ── Category Hero ─────────────────────────────── */}
      <div className={`${hero.bg} border-t-4 ${hero.border}`}>
        <div className="max-w-4xl mx-auto px-5 pt-8 pb-10">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-8">
            <Link href="/" className="hover:underline">ホーム</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/concerns" className="hover:underline">悩みから探す</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{concern.nameJa}</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-[48px] leading-none">{concern.emoji}</span>
            <div>
              <p className={`text-[11px] font-semibold uppercase tracking-[0.15em] mb-1 ${hero.text}`}>
                {concern.category}
              </p>
              <h1 className="text-[30px] sm:text-[40px] font-black text-foreground
                leading-[1.15] tracking-tight">
                {concern.nameJa}
              </h1>
            </div>
          </div>

          <p className="text-[15px] text-foreground/75 leading-[1.85] max-w-xl">
            {concern.description}
          </p>

          {/* 損失回避フレーミング */}
          {lossFraming[slug] && (
            <p className="mt-4 text-[13px] text-foreground/60 leading-relaxed max-w-xl
              border-l-2 border-current/20 pl-3 italic">
              {lossFraming[slug]}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 mt-6 text-[13px] text-muted-foreground">
            <span>
              <strong className="text-foreground font-semibold tabular-nums">{all.length}</strong> 関連成分
            </span>
            <span className="w-px h-3 bg-border" />
            <span>
              <strong className="text-foreground font-semibold">{all.filter(i => i.evidenceRank === 'S').length}</strong> Sランク ·{' '}
              <strong className="text-foreground font-semibold">{all.filter(i => i.evidenceRank === 'A').length}</strong> Aランク
            </span>
          </div>
        </div>
      </div>

    <div className="max-w-4xl mx-auto px-5 py-10">

      {/* ── まずこれ1つ ── */}
      {all.length > 0 && (() => {
        const top = all[0]
        const usageLabel: Record<string, string> = { topical: '外用', oral: '経口', both: '外用・経口' }
        const topRankBg: Record<string, string> = {
          S: 'bg-amber-50 border-amber-300',
          A: 'bg-blue-50 border-blue-300',
          B: 'bg-emerald-50 border-emerald-300',
          C: 'bg-stone-100 border-stone-300',
        }
        const topRankText: Record<string, string> = {
          S: 'text-amber-700', A: 'text-blue-700', B: 'text-emerald-700', C: 'text-stone-600',
        }
        const topRankBarBg: Record<string, string> = {
          S: 'bg-amber-500', A: 'bg-blue-500', B: 'bg-emerald-500', C: 'bg-stone-400',
        }
        return (
          <section className="mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em]
              text-muted-foreground mb-3">
              まずこれ1つ
            </p>
            <Link href={`/ingredients/${top.slug}`}
              className={`group block border-2 rounded-2xl overflow-hidden
                hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5
                ${topRankBg[top.evidenceRank]}`}>

              {/* Rank accent bar */}
              <div className={`h-1 w-full ${topRankBarBg[top.evidenceRank]}`} />

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <EvidenceBadge rank={top.evidenceRank} variant="chip" />
                      {top.usageType && (
                        <span className="text-[11px] text-muted-foreground bg-white/70
                          border border-border rounded px-2 py-0.5">
                          {usageLabel[top.usageType]}
                        </span>
                      )}
                      {top.emerging && (
                        <span className="text-[11px] bg-violet-50 text-violet-700 border
                          border-violet-200 rounded px-2 py-0.5">
                          注目成分
                        </span>
                      )}
                    </div>
                    <h3 className={`text-[24px] font-black text-foreground mb-2
                      group-hover:${topRankText[top.evidenceRank]} transition-colors leading-snug`}>
                      {top.nameJa}
                    </h3>
                    <p className="text-[14px] text-foreground/70 leading-relaxed">
                      {top.tagline}
                    </p>
                  </div>
                  <ChevronRight className={`w-5 h-5 flex-shrink-0 mt-1 transition-colors
                    text-muted-foreground group-hover:${topRankText[top.evidenceRank]}`} />
                </div>
                {top.heroStat && (
                  <p className="mt-3 text-[12px] text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">{top.heroStat.value}</strong>
                    {' '}<span className="opacity-70">{top.heroStat.label}</span>
                  </p>
                )}
                {top.dosageMin && (
                  <div className="mt-4 pt-4 border-t border-black/10 flex flex-wrap gap-4
                    text-[12px] text-muted-foreground">
                    <span>
                      有効量:&nbsp;
                      <strong className="text-foreground">
                        {top.dosageMin}{top.dosageMax && top.dosageMax !== top.dosageMin
                          ? `〜${top.dosageMax}` : ''}&nbsp;{top.dosageUnit}
                      </strong>
                    </span>
                    <span>論文: <strong className="text-foreground">{top.papers.length}件</strong></span>
                  </div>
                )}
              </div>
            </Link>
          </section>
        )
      })()}

      {/* Disclaimer */}
      <p className="text-[13px] text-muted-foreground bg-secondary rounded-xl p-4 mb-10">
        エビデンスランクは研究の種類と質を示すものです。個人への効果を保証するものではありません。
        摂取前には医師・薬剤師にご相談ください。
      </p>

      {/* 成分一覧 */}
      <div className="space-y-12">
        {ranks.map((rank) => {
          const items = all.filter((i) => i.evidenceRank === rank)
          if (!items.length) return null
          return (
            <section key={rank}>
              <div className="mb-5">
                <EvidenceBadge rank={rank} variant="chip" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((ing) => (
                  <IngredientCard
                    key={ing.slug}
                    ingredient={ing}
                    rank={all.indexOf(ing) + 1}
                  />
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* 関連悩み */}
      <div className="mt-14 pt-10 border-t border-border">
        <p className="font-medium text-[14px] text-foreground mb-4">他の悩みを見る</p>
        <div className="flex flex-wrap gap-2">
          {concerns.filter((c) => c.slug !== slug).slice(0, 9).map((c) => (
            <Link
              key={c.slug}
              href={`/concerns/${c.slug}`}
              className={`inline-flex items-center gap-1.5 text-[13px] border
                rounded-full px-3 py-1.5 hover:scale-105 transition-all duration-150
                cat-${c.category}`}
            >
              <span>{c.emoji}</span>
              {c.nameJa}
            </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}
