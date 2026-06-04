'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { AlertTriangle, ChevronRight, Plus, RotateCcw, Search, Star, X, Lightbulb } from 'lucide-react'
import { concerns, ingredients, getIngredient, getConcern } from '@/lib/data'
import { EvidenceBadge } from './EvidenceBadge'
import { OutboundProductLink } from './OutboundProductLink'
import { RadarChart, type RadarData } from './RadarChart'
import { trackEvent } from '@/lib/analytics'
import {
  CANONICAL_INTERACTIONS,
  CATEGORY_LABEL,
  groupCanonicalByCategory,
  type CanonicalCategory,
} from '@/lib/interaction-canonical'
import { checkInteractions, LEVEL_LABEL, type InteractionResult } from '@/lib/interaction'
import { InteractionCheckerCta } from '@/components/InteractionCheckerCta'
import { useFavorite } from '@/hooks/useFavorite'
import type { AnalysisAxis, Ingredient } from '@/lib/types'

/* 7 軸（AnalyzerClient と同じ定義） */
const AXES: { key: AnalysisAxis; label: string; emoji: string }[] = [
  { key: 'antiAging',  label: '抗老化',          emoji: '🔬' },
  { key: 'skin',       label: '肌老化',          emoji: '🌿' },
  { key: 'cognitive',  label: '脳・認知',        emoji: '🧠' },
  { key: 'stress',     label: 'ストレス対策',    emoji: '🧘' },
  { key: 'sleep',      label: '睡眠・回復',      emoji: '🌙' },
  { key: 'immunity',   label: '免疫・炎症',      emoji: '🛡️' },
  { key: 'metabolism', label: '代謝・エネルギー', emoji: '⚡' },
]

/* ── Personality Type 算出 ── */
interface PersonalityType {
  name: string          // 例: 「美白×抗老化 集中型」
  modifier: string      // 例: 「30代女性・睡眠改善必要」
  emoji: string         // 主軸 emoji
  topAxisLabel: string
  topScore: number
  considerationsCount: number  // 入力 N 件の表現
}

function getPersonalityType(
  axisScores: Record<AnalysisAxis, number>,
  basicInfo: BasicInfo,
  lifestyle: Lifestyle,
  concernCount: number,
  medCount: number,
  currentCount: number,
): PersonalityType {
  const ranked = AXES.map((a) => ({ ...a, score: axisScores[a.key] }))
    .sort((a, b) => b.score - a.score)
  const top = ranked[0]
  const second = ranked[1]

  let name: string
  if (top.score < 1) {
    name = '探索中'
  } else if (second.score < 1 || top.score / Math.max(second.score, 0.1) > 1.8) {
    name = `${top.label}特化型`
  } else if (top.score >= 5 && second.score >= 4) {
    name = `${top.label}×${second.label}型`
  } else {
    name = `${top.label}改善型`
  }

  const modifierParts: string[] = []
  if (basicInfo.age) {
    const ageLabel: Record<AgeBand, string> = {
      '20-29': '20代', '30-39': '30代', '40-49': '40代',
      '50-59': '50代', '60+': '60代以上', '': '',
    }
    if (ageLabel[basicInfo.age]) modifierParts.push(ageLabel[basicInfo.age])
  }
  if (basicInfo.gender === 'female') modifierParts.push('女性')
  else if (basicInfo.gender === 'male') modifierParts.push('男性')

  if (basicInfo.pregnancy === 'pregnant') modifierParts.push('妊娠中')
  else if (basicInfo.pregnancy === 'nursing') modifierParts.push('授乳中')
  else if (basicInfo.pregnancy === 'trying') modifierParts.push('妊活中')

  if (lifestyle.exercise === 'heavy') modifierParts.push('運動習慣あり')
  if (lifestyle.alcohol === 'heavy') modifierParts.push('飲酒多め')
  if (lifestyle.sleep === 'short') modifierParts.push('睡眠改善必要')
  if (lifestyle.smoking === 'daily') modifierParts.push('喫煙習慣')
  if (lifestyle.diet === 'vegetarian') modifierParts.push('菜食')

  // considerations
  const considerationsCount =
    concernCount +
    (basicInfo.age ? 1 : 0) +
    (basicInfo.gender ? 1 : 0) +
    (basicInfo.pregnancy && basicInfo.pregnancy !== 'none' ? 1 : 0) +
    Object.values(lifestyle).filter(Boolean).length +
    medCount +
    currentCount

  return {
    name,
    modifier: modifierParts.join('・'),
    emoji: top.emoji,
    topAxisLabel: top.label,
    topScore: top.score,
    considerationsCount,
  }
}

/* ── Bonus Insight（軸別の意外な事実） ── */
const BONUS_INSIGHTS: Record<AnalysisAxis, { title: string; body: string }> = {
  skin: {
    title: '美白・肌老化の経口アプローチ',
    body: '内側からの介入は「コラーゲンペプチド 5-10g/日（皮膚弾力）」「ピクノジェノール 30-100mg/日（色素沈着）」「アスタキサンチン 4-12mg/日（光老化）」が複数 RCT で支持。外用と組み合わせると相乗効果が出やすい（外用の推奨は「成分から」モードへ）。',
  },
  antiAging: {
    title: '抗老化で「効果実感が早い」順',
    body: 'NMN/NR は数週間で疲労感の変化を報告する研究が多い一方、肌の見た目変化は 3-6 ヶ月かかる。「ヒト介入研究で実感までの期間」を踏まえて段階導入を組むと挫折しにくい。',
  },
  cognitive: {
    title: '脳機能で意外にエビデンスがあるもの',
    body: 'クレアチンは「筋肉サプリ」のイメージが強いが、認知機能向上で RCT エビデンスがある（特に睡眠不足時の作業記憶）。コーヒー+L-テアニンよりコスパ良いケースも。',
  },
  stress: {
    title: 'ストレス対策の二段階介入',
    body: '「アシュワガンダ（HPA軸・コルチゾール）」+「マグネシウム（GABA系・即効）」の組合せが、両系統に同時介入する形で複数 RCT で支持されている。単剤より相乗が出やすい。',
  },
  sleep: {
    title: '睡眠改善でメラトニンより先に試すもの',
    body: 'メラトニンは入眠潜時短縮で有名だが、副作用（朝のだるさ）報告も多い。マグネシウムグリシン酸 + L-テアニンの組合せは副作用なく睡眠の質を改善する RCT があり、初手として安全。',
  },
  immunity: {
    title: '免疫対策で最強コンビ',
    body: '「ビタミンD（25-OH 30-40 ng/mL）+ 亜鉛（15-25mg/日）」は風邪の罹患率を約半減させる Meta解析がある。冬季や換期に試す価値あり。',
  },
  metabolism: {
    title: '代謝改善で「血糖管理」最強コンビ',
    body: 'ベルベリン（メトホルミン類似機序）+ α-リポ酸（インスリン感受性）の組合せが、HbA1c や空腹時血糖で複数 RCT で支持されている。食事改善と並行するのが定石。',
  },
}

function getBonusInsight(axisScores: Record<AnalysisAxis, number>): { title: string; body: string } | null {
  const ranked = AXES.map((a) => ({ key: a.key, score: axisScores[a.key] }))
    .sort((a, b) => b.score - a.score)
  if (ranked[0].score < 1) return null
  return BONUS_INSIGHTS[ranked[0].key]
}

/* ── Rarity 算出（プロファイル特異度 = 入力数が増えるほど稀少） ── */
function getRarityPercent(considerationsCount: number): number {
  // 100 / 1.35^N で逓減。3 inputs ≒ 40%, 8 ≒ 11%, 12 ≒ 3.5%, 15+ ≒ 1%
  const raw = 100 / Math.pow(1.35, Math.max(1, considerationsCount))
  return Math.max(0.5, Math.min(45, Math.round(raw * 10) / 10))
}

/* ── Tribe %（このタイプの人の何%がこの成分を優先するか） ── */
function getTribePercent(slug: string, selectedConcernSlugs: string[]): number | null {
  if (selectedConcernSlugs.length === 0) return null
  let totalPositions = 0
  let hits = 0
  for (const cslug of selectedConcernSlugs) {
    const c = getConcern(cslug)
    if (!c) continue
    const idx = c.ingredientSlugs.indexOf(slug)
    if (idx < 0) continue
    hits++
    totalPositions += idx
  }
  if (hits === 0) return null
  const avgIdx = totalPositions / hits
  // idx 0 (top) → 95% / idx 5 → 70% / idx 10 → 45%
  const score = 95 - avgIdx * 5
  return Math.max(30, Math.min(95, Math.round(score)))
}

/* ── Input Recap（Type Card に視覚化する入力の checklist） ── */
function getInputRecap(
  basicInfo: BasicInfo,
  lifestyle: Lifestyle,
  concernSlugs: string[],
  medCount: number,
  currentCount: number,
): string[] {
  const out: string[] = []
  if (basicInfo.age) {
    const ageLabel: Record<AgeBand, string> = {
      '20-29': '20代', '30-39': '30代', '40-49': '40代',
      '50-59': '50代', '60+': '60代以上', '': '',
    }
    if (ageLabel[basicInfo.age]) out.push(ageLabel[basicInfo.age])
  }
  if (basicInfo.gender === 'female') out.push('女性')
  else if (basicInfo.gender === 'male') out.push('男性')
  if (basicInfo.pregnancy === 'pregnant') out.push('妊娠中')
  else if (basicInfo.pregnancy === 'nursing') out.push('授乳中')
  else if (basicInfo.pregnancy === 'trying') out.push('妊活中')

  for (const cslug of concernSlugs.slice(0, 5)) {
    const c = getConcern(cslug)
    if (c) out.push(c.nameJa)
  }
  if (concernSlugs.length > 5) out.push(`+${concernSlugs.length - 5}件`)

  if (lifestyle.exercise === 'heavy') out.push('運動習慣あり')
  if (lifestyle.alcohol === 'heavy') out.push('飲酒多め')
  if (lifestyle.sleep === 'short') out.push('睡眠短')
  if (lifestyle.smoking === 'daily') out.push('喫煙習慣')
  if (lifestyle.diet === 'vegetarian') out.push('菜食')
  if (lifestyle.diet === 'eat-out') out.push('外食多め')

  if (medCount > 0) out.push(`服用薬 ${medCount}件`)
  if (currentCount > 0) out.push(`既存サプリ ${currentCount}件`)
  return out
}

/* ── useCountUp: 0 → target にカウントアップ（ease-out cubic・1.2s） ── */
function useCountUp(target: number, duration: number = 1200, delay: number = 0): number {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let raf = 0
    let started = false
    const startTimer = setTimeout(() => {
      started = true
      let start: number | null = null
      const step = (ts: number) => {
        if (start === null) start = ts
        const elapsed = ts - start
        const progress = Math.min(1, elapsed / duration)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(target * eased))
        if (progress < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, delay)
    return () => {
      clearTimeout(startTimer)
      if (started) cancelAnimationFrame(raf)
    }
  }, [target, duration, delay])
  return value
}

/* ── PrecisionMeter：入力中の sticky 精度バー（Goal Gradient + Variable Reward） ── */
function PrecisionMeter({ precision, hideAfterDiagnosis }: {
  precision: number
  hideAfterDiagnosis: boolean
}) {
  if (hideAfterDiagnosis) return null
  // Tier 別 microcopy
  let copy = '入力を始めましょう'
  let copyColor = 'text-muted-foreground'
  if (precision >= 90) { copy = '✨ 高精度モード — ベストな推奨が出ます'; copyColor = 'text-amber-700 font-semibold' }
  else if (precision >= 70) { copy = '🔥 もうすぐ完成 — あと少しで満点'; copyColor = 'text-emerald-700 font-medium' }
  else if (precision >= 40) { copy = '👍 良いペース — 推奨の的中率が上がっています'; copyColor = 'text-foreground' }
  else if (precision >= 15) { copy = '順調 — もう少し入れると候補が広がります'; copyColor = 'text-foreground/70' }

  return (
    <div className="sticky top-14 z-30 -mx-5 px-5 pt-2 pb-2.5 mb-0
      bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center gap-2.5">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">精度</span>
        <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out
              ${precision >= 90 ? 'bg-gradient-to-r from-amber-400 to-emerald-500' : 'bg-accent'}`}
            style={{ width: `${precision}%` }}
          />
        </div>
        <span className={`text-[13px] font-bold tabular-nums tracking-tight ${precision >= 90 ? 'text-amber-700' : 'text-foreground'}`}>
          {precision}<span className="text-[10px] opacity-60 font-normal">%</span>
        </span>
      </div>
      <p className={`text-[10.5px] mt-1 leading-snug ${copyColor}`}>{copy}</p>
    </div>
  )
}

/* ── Share helper：X 投稿テンプレ生成 ── */
function buildShareXUrl(typeName: string): string {
  const lines = [
    `私のサプリ診断タイプは『${typeName}』✨`,
    '',
    '論文ベースで推奨を出す @r_evidence_ の SciBase で診断してきた',
    '',
    'https://scibase.app/analyzer',
  ]
  const text = lines.join('\n')
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
}

/* ── CompletionCelebration：Peak-End 対応の最終 dopamine ハイ ── */
function CompletionCelebration({ topRecommendation, considerationsCount, recommendationCount, typeName }: {
  topRecommendation: Recommendation
  considerationsCount: number
  recommendationCount: number
  typeName: string
}) {
  const { ing } = topRecommendation
  const { isFavorite, toggle } = useFavorite('ingredient', ing.slug)
  const shareUrl = buildShareXUrl(typeName)

  return (
    <section className="my-8">
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-emerald-50/40 to-card
        border-2 border-emerald-300/70 rounded-3xl p-6 sm:p-8 text-center shadow-md">
        {/* 装飾 sparkle */}
        <span aria-hidden className="absolute top-3 right-4 text-[22px] animate-sparkle" style={{ animationDelay: '0.2s' }}>✨</span>
        <span aria-hidden className="absolute bottom-4 left-5 text-[18px] animate-sparkle" style={{ animationDelay: '0.6s' }}>✨</span>
        <span aria-hidden className="absolute top-6 left-7 text-[14px] animate-sparkle" style={{ animationDelay: '1s' }}>⭐</span>
        <span aria-hidden className="absolute bottom-6 right-8 text-[16px] animate-sparkle" style={{ animationDelay: '1.4s' }}>💫</span>

        <p className="text-[52px] sm:text-[60px] leading-none mb-2">🎉</p>
        <h2 className="text-[20px] sm:text-[24px] font-bold text-foreground mb-1.5 tracking-tight">
          診断完了
        </h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed max-w-md mx-auto mb-5">
          <strong className="text-foreground">{considerationsCount} 項目</strong>の入力 × 論文エビデンスから、
          あなた専用の <strong className="text-foreground">{recommendationCount} 件</strong>を導きました。
          まず <strong className="text-emerald-700">#1 {ing.nameJa}</strong> から始めるのがおすすめ。
        </p>

        {/* メイン CTA: お気に入り保存 */}
        <div className="space-y-2.5 max-w-sm mx-auto">
          <button
            onClick={toggle}
            aria-pressed={isFavorite}
            className={`group w-full inline-flex items-center justify-center gap-2 rounded-2xl py-3.5
              text-[14px] font-bold transition-all duration-200
              ${isFavorite
                ? 'bg-yellow-100 border-2 border-yellow-300 text-yellow-900'
                : 'bg-foreground text-background border-2 border-foreground hover:scale-[1.02] shadow-md hover:shadow-lg'}`}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-yellow-400 text-yellow-500' : 'group-hover:scale-110 transition-transform'}`} />
            {isFavorite ? `お気に入り済 — #1 ${ing.nameJa}` : `⭐ #1 ${ing.nameJa} をお気に入り保存`}
          </button>

          {/* シェア (X) */}
          <a href={shareUrl} target="_blank" rel="noopener noreferrer"
            className="group w-full inline-flex items-center justify-center gap-2 rounded-2xl py-2.5
              border border-border bg-card text-foreground
              text-[13px] font-semibold transition-colors
              hover:bg-secondary hover:border-foreground/30">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X で「{typeName}」をシェア
          </a>
        </div>

        <p className="text-[10.5px] text-muted-foreground mt-4 opacity-80">
          結果はブラウザに保存中。次回も同じ条件で見直せます。
        </p>
      </div>
    </section>
  )
}

/* ── DiagnoseCTA：明示的な「診断する」ボタン（ドーパミン起動装置） ── */
function DiagnoseCTA({ ready, considerationsCount, onClick }: {
  ready: boolean
  considerationsCount: number
  onClick: () => void
}) {
  if (!ready) {
    return (
      <section className="my-6">
        <div className="bg-secondary/40 border border-dashed border-border rounded-2xl px-5 py-6 text-center">
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            <strong className="text-foreground">悩みを 1 つ以上選ぶ</strong>か、
            生活習慣で 1 つ以上を回答すると診断ボタンが有効になります。
          </p>
        </div>
      </section>
    )
  }
  return (
    <section className="my-6 animate-fade-up">
      <button
        onClick={onClick}
        className="group relative w-full overflow-hidden
          bg-gradient-to-br from-accent via-accent to-accent/90
          text-primary-foreground rounded-2xl py-5 sm:py-6
          shadow-lg hover:shadow-xl transition-all duration-300
          hover:scale-[1.01] active:scale-[0.99]"
      >
        {/* 光沢シマー */}
        <span aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent
            -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

        <div className="relative flex items-center justify-center gap-3">
          <span className="text-[24px] sm:text-[28px]">🔬</span>
          <div className="text-left">
            <p className="text-[18px] sm:text-[22px] font-bold leading-tight">
              診断スタート
            </p>
            <p className="text-[11.5px] sm:text-[12px] opacity-80 leading-snug mt-0.5">
              {considerationsCount} 項目を 548 成分と照合 → 推奨 5 件を選定
            </p>
          </div>
          <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>

        {/* 軽いパルス装飾 */}
        <span aria-hidden
          className="absolute -top-1 -right-1 w-3 h-3 bg-amber-300 rounded-full
            animate-calc-pulse" />
      </button>
      <p className="text-[11px] text-muted-foreground text-center mt-2 leading-relaxed">
        ボタンを押すと「分析中…」演出のあと、あなた専用の推奨が出ます
      </p>
    </section>
  )
}

/* ── RediagnoseCTA：入力変更後の「再診断」誘導 ── */
function RediagnoseCTA({ onClick }: { onClick: () => void }) {
  return (
    <section className="my-4 animate-fade-up">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 flex items-center gap-3">
        <span className="text-[20px]">🔄</span>
        <div className="flex-1 min-w-0">
          <p className="text-[12.5px] font-semibold text-amber-900 leading-snug">
            入力が変わりました
          </p>
          <p className="text-[11.5px] text-amber-700 leading-snug">
            最新の入力で診断を再実行できます
          </p>
        </div>
        <button onClick={onClick}
          className="inline-flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white
            text-[12px] font-semibold rounded-full px-4 py-2 transition-colors flex-shrink-0">
          再診断 →
        </button>
      </div>
    </section>
  )
}

/* ── CalculationTheatre：分析中の期待構築演出 ── */
function CalculationTheatre({ considerationsCount }: { considerationsCount: number }) {
  const [step, setStep] = useState(0)
  const lines = [
    `あなたの ${Math.max(considerationsCount, 1)} 項目を読み込み中…`,
    '548 成分 × 30 悩み軸を照合中…',
    '相互作用と安全フィルタを適用中…',
    'ベストマッチ 5 件を選定中…',
  ]
  useEffect(() => {
    const interval = 1800 / lines.length
    const timers = lines.map((_, i) =>
      setTimeout(() => setStep(i + 1), interval * (i + 1)),
    )
    return () => timers.forEach(clearTimeout)
  }, [lines.length])

  return (
    <section className="bg-gradient-to-br from-accent/5 via-card to-card border-2 border-accent/30
      rounded-2xl p-7 sm:p-9 text-center my-4 animate-fade-up">
      <div className="inline-flex items-center justify-center gap-1 mb-5">
        <span className="text-[10px] font-semibold tracking-wider bg-accent text-primary-foreground
          px-2 py-0.5 rounded-md">ANALYZING</span>
      </div>
      <p className="text-[28px] sm:text-[34px] font-bold text-foreground tabular-nums mb-2">
        <span className="text-accent">{Math.min(100, Math.round((step / lines.length) * 100))}</span>
        <span className="text-muted-foreground/40 text-[20px] sm:text-[24px]">%</span>
      </p>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden max-w-xs mx-auto mb-6">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(step / lines.length) * 100}%` }}
        />
      </div>
      <ul className="space-y-2 max-w-md mx-auto text-left">
        {lines.map((line, i) => (
          <li key={i}
            className={`text-[13px] sm:text-[14px] flex items-center gap-2 transition-all duration-300
              ${i < step ? 'text-foreground opacity-90' :
                i === step ? 'text-foreground animate-calc-pulse' : 'text-muted-foreground/40'}`}>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0">
              {i < step ? (
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : i === step ? (
                <span className="w-2 h-2 bg-accent rounded-full animate-calc-pulse" />
              ) : (
                <span className="w-2 h-2 bg-muted-foreground/30 rounded-full" />
              )}
            </span>
            {line}
          </li>
        ))}
      </ul>
    </section>
  )
}

/* 推奨成分から 7 軸スコア（0-10）を算出 — AnalyzerClient の calcScores と同等ロジック */
function calcAxisScores(selected: Ingredient[]): Record<AnalysisAxis, number> {
  const raw = {} as Record<AnalysisAxis, number>
  AXES.forEach(({ key }) => { raw[key] = 0 })
  selected.forEach((ing) => {
    if (!ing.axisScores) return
    const w = RANK_WEIGHT[ing.evidenceRank] ?? 0.4
    AXES.forEach(({ key }) => {
      const v = ing.axisScores![key] ?? 0
      raw[key] += Math.min(6, v) * w
    })
  })
  const out = {} as Record<AnalysisAxis, number>
  AXES.forEach(({ key }) => {
    out[key] = Math.round(10 * (1 - Math.exp(-raw[key] / 12)) * 10) / 10
  })
  return out
}

/* ── 型定義 ── */
type AgeBand = '20-29' | '30-39' | '40-49' | '50-59' | '60+' | ''
type Gender = 'male' | 'female' | 'other' | ''
type Pregnancy = 'none' | 'trying' | 'pregnant' | 'nursing' | ''
type Exercise = 'none' | 'light' | 'moderate' | 'heavy' | ''
type Diet = 'balanced' | 'eat-out' | 'vegetarian' | 'low-carb' | ''
type Sleep = 'short' | 'normal' | 'long' | ''
type Smoking = 'none' | 'occasional' | 'daily' | ''
type Alcohol = 'none' | 'light' | 'moderate' | 'heavy' | ''

interface BasicInfo {
  age: AgeBand
  gender: Gender
  pregnancy: Pregnancy
}

interface Lifestyle {
  exercise: Exercise
  diet: Diet
  sleep: Sleep
  smoking: Smoking
  alcohol: Alcohol
}

/* localStorage キー（既存 ingredient/concern モードとは分離） */
const STORAGE_BASIC       = 'scibase_deep_basic'
const STORAGE_CONCERNS    = 'scibase_deep_concerns'
const STORAGE_LIFESTYLE   = 'scibase_deep_lifestyle'
const STORAGE_MEDS        = 'scibase_deep_medications'
const STORAGE_CURRENT     = 'scibase_analyzer_slugs'  // 既存と互換（飲んでいるサプリ）

const RANK_WEIGHT: Record<string, number> = { S: 1.0, A: 0.85, B: 0.65, C: 0.40 }

/* ── 推奨ロジック ── */
interface Recommendation {
  ing: Ingredient
  score: number
  hits: number          // 何個の悩みに該当したか
  matchedConcerns: string[]
  lifestyleBoost: string[]  // ライフスタイル由来の理由
}

interface RecommendResult {
  recommendations: Recommendation[]
  /** 妊娠/授乳/妊活中で contraindication により除外された成分（score top 8 まで・透明性のため表示） */
  excludedByPregnancy: Array<{ ing: Ingredient; score: number; reason: string }>
  /** 服用医薬品との avoid 級相互作用で除外された成分 */
  excludedByInteraction: Array<{ ing: Ingredient; score: number; matchedKeys: string[]; mechanism: string }>
}

/**
 * data.ts の contraindications フィールドに「妊娠」が記載されていないが、
 * 主要な伝統医学ガイドライン（NIH ODS / 各国 herbal monograph）で
 * 妊娠中の安全データ不足が示唆される実在 slug の fallback list。
 * data.ts contraindications が網羅完成したら削除可能。
 */
const PREGNANCY_HERB_FALLBACK = new Set<string>([
  'ginkgo-biloba',
  'ginkgo-biloba-extract-high',
  'evening-primrose-oil',
  'maca',
  'panax-ginseng',
  'rhodiola',
  'cordyceps',
  'reishi',
])

/**
 * 妊娠中・授乳中・妊活中の場合に成分の contraindications フィールドを参照して除外判定。
 * data.ts 各成分の `contraindications: string[]` を programmatic にチェック（slug 名ハードコードを廃止）。
 * data.ts が網羅していないハーブは PREGNANCY_HERB_FALLBACK で補完。
 */
function shouldExcludeForPregnancy(ing: Ingredient, mode: Pregnancy): { excluded: boolean; reason: string } {
  if (mode === '' || mode === 'none') return { excluded: false, reason: '' }
  const text = (ing.contraindications ?? []).join('｜')
  if (mode === 'nursing') {
    if (text.includes('授乳')) return { excluded: true, reason: '授乳中は安全データ不足' }
    if (PREGNANCY_HERB_FALLBACK.has(ing.slug)) return { excluded: true, reason: '授乳中の安全データ不足（ハーブ系）' }
  }
  // pregnant / trying は妊娠記載で除外（妊活中も妊娠予定なので保守側に倒す）
  if (mode === 'pregnant' || mode === 'trying') {
    if (text.includes('妊娠') || text.includes('妊婦')) {
      return { excluded: true, reason: mode === 'pregnant' ? '妊娠中は安全データ不足' : '妊活中は妊娠を想定して除外' }
    }
    if (PREGNANCY_HERB_FALLBACK.has(ing.slug)) {
      return { excluded: true, reason: mode === 'pregnant' ? '妊娠中の安全データ不足（ハーブ系）' : '妊活中は妊娠を想定して除外（ハーブ系）' }
    }
  }
  return { excluded: false, reason: '' }
}

function recommend(
  concernSlugs: string[],
  lifestyle: Lifestyle,
  currentSlugs: string[],
  basicInfo: BasicInfo,
  medKeys: string[],
): RecommendResult {
  if (concernSlugs.length === 0 && !hasPersonalBoost(basicInfo, lifestyle)) {
    return { recommendations: [], excludedByPregnancy: [], excludedByInteraction: [] }
  }

  const scoreMap = new Map<string, number>()
  const hitMap = new Map<string, number>()
  const matchedConcernMap = new Map<string, string[]>()
  const lifestyleBoostMap = new Map<string, string[]>()

  // 1. 悩みベースのスコアリング（経口のみ・外用 (topical) は除外）
  for (const cslug of concernSlugs) {
    const c = getConcern(cslug)
    if (!c) continue
    c.ingredientSlugs.forEach((slug, idx) => {
      const ing = getIngredient(slug)
      if (!ing) return
      // 「飲んでいるサプリ」前提の診断なので外用は推奨対象外
      if (ing.usageType === 'topical') return
      const rankW = RANK_WEIGHT[ing.evidenceRank] ?? 0.4
      const posBonus = Math.max(0.3, 1 - idx * 0.08)
      const delta = rankW * posBonus
      scoreMap.set(slug, (scoreMap.get(slug) ?? 0) + delta)
      hitMap.set(slug, (hitMap.get(slug) ?? 0) + 1)
      const prev = matchedConcernMap.get(slug) ?? []
      matchedConcernMap.set(slug, [...prev, c.nameJa])
    })
  }

  // 2. パーソナル boost：年齢・性別・ライフスタイル（外用は applyBoost 内で除外）
  const applyBoost = (slug: string, reason: string, boost: number) => {
    const ing = getIngredient(slug)
    if (!ing) return
    if (ing.usageType === 'topical') return
    scoreMap.set(slug, (scoreMap.get(slug) ?? 0) + boost)
    const prev = lifestyleBoostMap.get(slug) ?? []
    if (!prev.includes(reason)) lifestyleBoostMap.set(slug, [...prev, reason])
  }

  // 2a. 年齢 boost
  const ageBoosts: Record<AgeBand, Array<{ slug: string; boost: number }>> = {
    '20-29': [
      { slug: 'magnesium', boost: 0.2 },
      { slug: 'vitamin-d', boost: 0.2 },
    ],
    '30-39': [
      { slug: 'collagen-peptide', boost: 0.5 },
      { slug: 'coq10', boost: 0.3 },
      { slug: 'hyaluronic-acid-oral', boost: 0.2 },
    ],
    '40-49': [
      { slug: 'nmn', boost: 0.4 },
      { slug: 'resveratrol', boost: 0.3 },
      { slug: 'coq10', boost: 0.3 },
      { slug: 'vitamin-d', boost: 0.3 },
      { slug: 'collagen-peptide', boost: 0.4 },
    ],
    '50-59': [
      { slug: 'calcium', boost: 0.4 },
      { slug: 'vitamin-d', boost: 0.5 },
      { slug: 'omega3', boost: 0.3 },
      { slug: 'creatine', boost: 0.3 },
      { slug: 'nmn', boost: 0.3 },
    ],
    '60+': [
      { slug: 'creatine', boost: 0.5 },
      { slug: 'omega3', boost: 0.5 },
      { slug: 'curcumin', boost: 0.3 },
      { slug: 'astaxanthin', boost: 0.3 },
      { slug: 'vitamin-d', boost: 0.4 },
      { slug: 'calcium', boost: 0.3 },
    ],
    '': [],
  }
  if (basicInfo.age && ageBoosts[basicInfo.age]) {
    const ageLabel: Record<AgeBand, string> = {
      '20-29': '20代', '30-39': '30代', '40-49': '40代',
      '50-59': '50代', '60+': '60代以上', '': '',
    }
    for (const b of ageBoosts[basicInfo.age]) {
      applyBoost(b.slug, ageLabel[basicInfo.age], b.boost)
    }
  }

  // 2b. 性別 boost
  if (basicInfo.gender === 'female') {
    applyBoost('iron', '女性', 0.3)
    applyBoost('folic-acid', '女性', 0.2)
    applyBoost('calcium', '女性', 0.3)
    applyBoost('vitamin-d', '女性', 0.2)
  } else if (basicInfo.gender === 'male') {
    applyBoost('zinc', '男性', 0.3)
    applyBoost('selenium', '男性', 0.2)
  }

  // 2c. ライフスタイル boost（heavy / moderate で段階適用）
  if (lifestyle.alcohol === 'heavy') {
    applyBoost('milk-thistle', 'アルコール多飲', 0.4)
    applyBoost('nac', 'アルコール多飲', 0.4)
    applyBoost('vitamin-b-complex', 'アルコール多飲', 0.3)
  } else if (lifestyle.alcohol === 'moderate') {
    applyBoost('milk-thistle', '飲酒習慣', 0.2)
    applyBoost('nac', '飲酒習慣', 0.2)
  }
  if (lifestyle.diet === 'vegetarian') {
    applyBoost('vitamin-b12', '菜食傾向', 0.4)
    applyBoost('iron', '菜食傾向', 0.3)
    applyBoost('omega3', '菜食傾向', 0.4)
    applyBoost('vitamin-d', '菜食傾向', 0.2)
  } else if (lifestyle.diet === 'eat-out') {
    applyBoost('vitamin-d', '外食多め', 0.3)
    applyBoost('vitamin-b-complex', '外食多め', 0.3)
    applyBoost('magnesium', '外食多め', 0.2)
  } else if (lifestyle.diet === 'low-carb') {
    applyBoost('magnesium', '糖質制限', 0.2)
    applyBoost('potassium', '糖質制限', 0.2)
  }
  if (lifestyle.sleep === 'short') {
    applyBoost('magnesium', '睡眠時間短い', 0.4)
    applyBoost('glycine', '睡眠時間短い', 0.3)
    applyBoost('l-theanine', '睡眠時間短い', 0.3)
  } else if (lifestyle.sleep === 'long') {
    applyBoost('vitamin-d', '日照不足の可能性', 0.2)
  }
  if (lifestyle.smoking === 'daily') {
    applyBoost('vitamin-c-oral', '喫煙習慣', 0.4)
    applyBoost('glutathione', '喫煙習慣', 0.4)
    applyBoost('nac', '喫煙習慣', 0.3)
  } else if (lifestyle.smoking === 'occasional') {
    applyBoost('vitamin-c-oral', '喫煙あり', 0.2)
  }
  if (lifestyle.exercise === 'heavy') {
    applyBoost('creatine', '運動しっかり', 0.4)
    applyBoost('whey-protein-isolate', '運動しっかり', 0.4)
    applyBoost('beta-alanine', '運動しっかり', 0.3)
  } else if (lifestyle.exercise === 'moderate') {
    applyBoost('creatine', '運動習慣', 0.2)
    applyBoost('magnesium', '運動習慣', 0.2)
  }

  // 3. 既に飲んでいるサプリを除外（重複推奨を避ける）
  const currentSet = new Set(currentSlugs)

  // 4. 全候補を score 降順で並べる（slice はまだしない）
  const allCandidates = Array.from(scoreMap.entries())
    .filter(([slug]) => !currentSet.has(slug))
    .map(([slug, score]) => {
      const ing = getIngredient(slug)
      if (!ing) return null
      return {
        ing,
        score,
        hits: hitMap.get(slug) ?? 0,
        matchedConcerns: matchedConcernMap.get(slug) ?? [],
        lifestyleBoost: lifestyleBoostMap.get(slug) ?? [],
      }
    })
    .filter((c): c is Recommendation => c !== null)
    .sort((a, b) => b.score - a.score)

  // 5. 妊娠/授乳/妊活除外（contraindications 参照）
  const excludedByPregnancy: RecommendResult['excludedByPregnancy'] = []
  const afterPregnancy = allCandidates.filter((c) => {
    const check = shouldExcludeForPregnancy(c.ing, basicInfo.pregnancy)
    if (check.excluded) {
      if (excludedByPregnancy.length < 8) {
        excludedByPregnancy.push({ ing: c.ing, score: c.score, reason: check.reason })
      }
      return false
    }
    return true
  })

  // 6. 服用医薬品との avoid 級相互作用で除外
  //    各候補について checkInteractions([slug], medKeys) を呼んで avoid を検出。
  const excludedByInteraction: RecommendResult['excludedByInteraction'] = []
  const afterInteraction = medKeys.length === 0 ? afterPregnancy : afterPregnancy.filter((c) => {
    const results = checkInteractions([c.ing.slug], medKeys)
    const avoid = results.find((r) => r.level === 'avoid')
    if (avoid) {
      excludedByInteraction.push({
        ing: c.ing,
        score: c.score,
        matchedKeys: avoid.matchedKeys,
        mechanism: avoid.mechanism,
      })
      return false
    }
    return true
  })

  // 7. top 5 で返す
  return {
    recommendations: afterInteraction.slice(0, 5),
    excludedByPregnancy,
    excludedByInteraction,
  }
}

function noLifestyleBoost(l: Lifestyle): boolean {
  return l.exercise !== 'heavy' && l.exercise !== 'moderate' &&
         l.alcohol !== 'heavy' && l.alcohol !== 'moderate' &&
         l.diet !== 'vegetarian' && l.diet !== 'eat-out' && l.diet !== 'low-carb' &&
         l.sleep !== 'short' && l.sleep !== 'long' &&
         l.smoking !== 'daily' && l.smoking !== 'occasional'
}

function hasPersonalBoost(basicInfo: BasicInfo, lifestyle: Lifestyle): boolean {
  return !!basicInfo.age || !!basicInfo.gender || !noLifestyleBoost(lifestyle)
}

/* ── concern カテゴリ表示 ── */
const concernCategoryLabel: Record<string, string> = {
  skin: 'スキンケア', body: '体・全身', cognitive: '認知・メンタル',
  sleep: '睡眠', gut: '腸・消化', immunity: '免疫',
  muscle: '筋肉・運動', cardiovascular: '血管・循環',
}
const CONCERN_CAT_ORDER = ['skin', 'cognitive', 'sleep', 'body', 'gut', 'immunity', 'muscle', 'cardiovascular']

/* ───────────────────────── Component ───────────────────────── */

export function AnalyzerDeepMode() {
  const [basic, setBasic] = useState<BasicInfo>({ age: '', gender: '', pregnancy: '' })
  const [concernSlugs, setConcernSlugs] = useState<string[]>([])
  const [lifestyle, setLifestyle] = useState<Lifestyle>({
    exercise: '', diet: '', sleep: '', smoking: '', alcohol: '',
  })
  const [medKeys, setMedKeys] = useState<string[]>([])
  const [currentSlugs, setCurrentSlugs] = useState<string[]>([])
  const [hasMounted, setHasMounted] = useState(false)
  const resultsRef = useRef<HTMLDivElement | null>(null)
  const completeTrackedRef = useRef(false)

  /* localStorage 読み込み */
  useEffect(() => {
    try {
      const b = localStorage.getItem(STORAGE_BASIC)
      if (b) setBasic(JSON.parse(b))
      const c = localStorage.getItem(STORAGE_CONCERNS)
      if (c) setConcernSlugs(JSON.parse(c))
      const l = localStorage.getItem(STORAGE_LIFESTYLE)
      if (l) setLifestyle(JSON.parse(l))
      const m = localStorage.getItem(STORAGE_MEDS)
      if (m) setMedKeys(JSON.parse(m))
      const s = localStorage.getItem(STORAGE_CURRENT)
      if (s) setCurrentSlugs(JSON.parse(s))
    } catch { /* ignore */ }
    setHasMounted(true)
  }, [])

  /* localStorage 保存 */
  useEffect(() => { if (hasMounted) try { localStorage.setItem(STORAGE_BASIC, JSON.stringify(basic)) } catch {} }, [basic, hasMounted])
  useEffect(() => { if (hasMounted) try { localStorage.setItem(STORAGE_CONCERNS, JSON.stringify(concernSlugs)) } catch {} }, [concernSlugs, hasMounted])
  useEffect(() => { if (hasMounted) try { localStorage.setItem(STORAGE_LIFESTYLE, JSON.stringify(lifestyle)) } catch {} }, [lifestyle, hasMounted])
  useEffect(() => { if (hasMounted) try { localStorage.setItem(STORAGE_MEDS, JSON.stringify(medKeys)) } catch {} }, [medKeys, hasMounted])
  useEffect(() => { if (hasMounted) try { localStorage.setItem(STORAGE_CURRENT, JSON.stringify(currentSlugs)) } catch {} }, [currentSlugs, hasMounted])

  const recommendResult = useMemo(
    () => recommend(concernSlugs, lifestyle, currentSlugs, basic, medKeys),
    [concernSlugs, lifestyle, currentSlugs, basic, medKeys],
  )
  const recommendations = recommendResult.recommendations

  /* 推奨成分 + 既存サプリと医薬品の interaction check（caution/monitor 級を結果セクションで表示） */
  const allCheckSlugs = useMemo(
    () => Array.from(new Set([...recommendations.map((r) => r.ing.slug), ...currentSlugs])),
    [recommendations, currentSlugs],
  )
  const interactionResults = useMemo<InteractionResult[]>(
    () => checkInteractions(allCheckSlugs, medKeys),
    [allCheckSlugs, medKeys],
  )

  const hasResults = recommendations.length > 0
  const hasAnyInput = concernSlugs.length > 0 || hasPersonalBoost(basic, lifestyle) ||
    medKeys.length > 0 || currentSlugs.length > 0

  /* ── ステートマシン: idle → calculating → revealed ── */
  /* ユーザーが「診断する」ボタンを明示的に押した時だけ theatre + reveal */
  const [calculating, setCalculating] = useState(false)
  const [diagnosed, setDiagnosed] = useState(false)
  // 入力ハッシュ（診断後に入力が変わったかを検知して「再診断」CTA を出す）
  const inputHash = useMemo(
    () => JSON.stringify({ basic, concernSlugs, lifestyle, medKeys, currentSlugs }),
    [basic, concernSlugs, lifestyle, medKeys, currentSlugs],
  )
  const [diagnosedHash, setDiagnosedHash] = useState<string | null>(null)
  const inputChangedAfterDiagnosis = diagnosed && diagnosedHash !== null && diagnosedHash !== inputHash

  const triggerDiagnosis = () => {
    if (!hasAnyInput) return
    setCalculating(true)
    setDiagnosedHash(inputHash)
    // 結果セクションへスクロール
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
    setTimeout(() => {
      setCalculating(false)
      setDiagnosed(true)
    }, 1800)
    trackEvent('start_analyzer', { mode: 'deep' })
  }

  /* GA4: complete_deep_analyzer */
  useEffect(() => {
    if (!hasResults || completeTrackedRef.current) return
    completeTrackedRef.current = true
    trackEvent('complete_analyzer', {
      mode: 'deep',
      concern_count: concernSlugs.length,
      medication_count: medKeys.length,
      recommendation_count: recommendations.length,
      interaction_count: interactionResults.length,
      excluded_pregnancy: recommendResult.excludedByPregnancy.length,
      excluded_interaction: recommendResult.excludedByInteraction.length,
    })
  }, [hasResults, concernSlugs.length, medKeys.length, recommendations.length, interactionResults.length, recommendResult.excludedByPregnancy.length, recommendResult.excludedByInteraction.length])

  const resetAll = () => {
    setBasic({ age: '', gender: '', pregnancy: '' })
    setConcernSlugs([])
    setLifestyle({ exercise: '', diet: '', sleep: '', smoking: '', alcohol: '' })
    setMedKeys([])
  }

  const toggleConcern = (slug: string) => {
    setConcernSlugs((prev) => prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug])
  }
  const toggleMed = (key: string) => {
    setMedKeys((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key])
  }

  const pregnancyWarning = basic.pregnancy === 'pregnant' || basic.pregnancy === 'nursing' || basic.pregnancy === 'trying'

  /* 精度 % 計算（5 セクションの入力充実度を 100 点換算）*/
  const precision = useMemo(() => {
    let s = 0
    if (basic.age) s += 5
    if (basic.gender) s += 5
    if (basic.pregnancy) s += 5  // 'none' でも選択済とみなす
    s += Math.min(30, concernSlugs.length * 10)
    s += Object.values(lifestyle).filter(Boolean).length * 5
    s += Math.min(10, medKeys.length * 5)
    s += Math.min(20, currentSlugs.length * 4)
    return Math.min(100, Math.round(s))
  }, [basic, concernSlugs, lifestyle, medKeys, currentSlugs])

  return (
    <div className="space-y-10">
      {/* ── Sticky 精度メーター（Goal Gradient + Variable Reward）── */}
      <PrecisionMeter precision={precision} hideAfterDiagnosis={diagnosed} />

      {/* ── 注意書き ── */}
      <div className="bg-secondary/40 border border-border rounded-2xl px-5 py-4">
        <p className="text-[13px] text-foreground/80 leading-relaxed">
          基本情報・悩み・生活習慣・服用中の医薬品を入れると、論文エビデンス + 相互作用チェックを組み合わせた
          <strong className="font-semibold">個別最適な推奨3〜5件</strong>を返します。
          すべて任意・3分ほどで完了。
        </p>
      </div>

      {/* ── Section 1: 基本情報 ── */}
      <SectionWrap step={1} title="基本情報" hint="3つ・年齢階級と妊娠状況のみ（個人を特定しません）">
        <FieldGrid>
          <ChoiceRow label="年齢階級">
            {([
              ['20-29', '20代'], ['30-39', '30代'], ['40-49', '40代'],
              ['50-59', '50代'], ['60+', '60代以上'],
            ] as [AgeBand, string][]).map(([k, l]) => (
              <ChoiceChip key={k} active={basic.age === k} onClick={() => setBasic({ ...basic, age: k })}>{l}</ChoiceChip>
            ))}
          </ChoiceRow>
          <ChoiceRow label="性別">
            {([
              ['female', '女性'], ['male', '男性'], ['other', 'その他'],
            ] as [Gender, string][]).map(([k, l]) => (
              <ChoiceChip key={k} active={basic.gender === k} onClick={() => setBasic({ ...basic, gender: k })}>{l}</ChoiceChip>
            ))}
          </ChoiceRow>
          <ChoiceRow label="妊娠・授乳">
            {([
              ['none', '該当なし'], ['trying', '妊活中'],
              ['pregnant', '妊娠中'], ['nursing', '授乳中'],
            ] as [Pregnancy, string][]).map(([k, l]) => (
              <ChoiceChip key={k} active={basic.pregnancy === k} onClick={() => setBasic({ ...basic, pregnancy: k })}>{l}</ChoiceChip>
            ))}
          </ChoiceRow>
        </FieldGrid>
        {pregnancyWarning && (
          <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-[12px] text-amber-800 leading-relaxed">
              妊娠中・授乳中・妊活中は安全データが不足するハーブ系成分を推奨から自動除外します。
              いずれの摂取も<strong>必ず医師・助産師にご相談ください</strong>。
            </p>
          </div>
        )}
      </SectionWrap>

      {/* ── Section 2: 主な悩み ── */}
      <SectionWrap step={2} title="主な悩み（複数選択）" hint={`${concernSlugs.length}件選択中 ・ カテゴリ別に複数選べます`}>
        <ConcernPicker selected={concernSlugs} onToggle={toggleConcern} />
      </SectionWrap>

      {/* ── Section 3: 生活習慣 ── */}
      <SectionWrap step={3} title="生活習慣" hint="5項目・推奨成分の補正に使います">
        <FieldGrid>
          <ChoiceRow label="運動">
            {([
              ['none', 'なし'], ['light', '軽い'], ['moderate', '普通'], ['heavy', 'しっかり'],
            ] as [Exercise, string][]).map(([k, l]) => (
              <ChoiceChip key={k} active={lifestyle.exercise === k} onClick={() => setLifestyle({ ...lifestyle, exercise: k })}>{l}</ChoiceChip>
            ))}
          </ChoiceRow>
          <ChoiceRow label="食事">
            {([
              ['balanced', 'バランス重視'], ['eat-out', '外食多い'],
              ['vegetarian', '菜食傾向'], ['low-carb', '糖質制限'],
            ] as [Diet, string][]).map(([k, l]) => (
              <ChoiceChip key={k} active={lifestyle.diet === k} onClick={() => setLifestyle({ ...lifestyle, diet: k })}>{l}</ChoiceChip>
            ))}
          </ChoiceRow>
          <ChoiceRow label="睡眠">
            {([
              ['short', '6時間未満'], ['normal', '6〜8時間'], ['long', '8時間以上'],
            ] as [Sleep, string][]).map(([k, l]) => (
              <ChoiceChip key={k} active={lifestyle.sleep === k} onClick={() => setLifestyle({ ...lifestyle, sleep: k })}>{l}</ChoiceChip>
            ))}
          </ChoiceRow>
          <ChoiceRow label="喫煙">
            {([
              ['none', 'なし'], ['occasional', 'たまに'], ['daily', '毎日'],
            ] as [Smoking, string][]).map(([k, l]) => (
              <ChoiceChip key={k} active={lifestyle.smoking === k} onClick={() => setLifestyle({ ...lifestyle, smoking: k })}>{l}</ChoiceChip>
            ))}
          </ChoiceRow>
          <ChoiceRow label="飲酒">
            {([
              ['none', 'なし'], ['light', '機会飲酒'], ['moderate', '週数回'], ['heavy', 'ほぼ毎日'],
            ] as [Alcohol, string][]).map(([k, l]) => (
              <ChoiceChip key={k} active={lifestyle.alcohol === k} onClick={() => setLifestyle({ ...lifestyle, alcohol: k })}>{l}</ChoiceChip>
            ))}
          </ChoiceRow>
        </FieldGrid>
      </SectionWrap>

      {/* ── Section 4: 服用中の医薬品 ── */}
      <SectionWrap
        step={4}
        title="服用中の医薬品（任意）"
        hint={`${medKeys.length}件選択中 ・ 相互作用チェックに使います`}
      >
        <MedicationPicker selected={medKeys} onToggle={toggleMed} />
      </SectionWrap>

      {/* ── Section 5: 飲んでいるサプリ ── */}
      <SectionWrap
        step={5}
        title="飲んでいるサプリ（経口のみ）"
        hint={`${currentSlugs.length}件登録中 ・ 経口サプリのみが対象（外用スキンケアは別モードへ）`}
      >
        <CurrentSupplementPicker
          slugs={currentSlugs}
          onAdd={(slug) => setCurrentSlugs((prev) => prev.includes(slug) ? prev : [...prev, slug])}
          onRemove={(slug) => setCurrentSlugs((prev) => prev.filter((s) => s !== slug))}
          onClear={() => setCurrentSlugs([])}
        />
      </SectionWrap>

      {/* ── Reset ── */}
      <div className="flex justify-end">
        <button onClick={resetAll}
          className="inline-flex items-center gap-1.5 text-[12px] font-medium
            text-muted-foreground border border-border rounded-full
            px-3 py-1.5 min-h-[36px]
            hover:text-destructive hover:border-destructive/30 transition-colors">
          <RotateCcw className="w-3 h-3" />
          すべてリセット
        </button>
      </div>

      {/* ── 診断 CTA（未診断・入力あり時のみ・大きく目立つ）── */}
      {!calculating && !diagnosed && (
        <DiagnoseCTA
          ready={hasAnyInput}
          considerationsCount={
            concernSlugs.length +
            (basic.age ? 1 : 0) + (basic.gender ? 1 : 0) +
            (basic.pregnancy && basic.pregnancy !== 'none' ? 1 : 0) +
            Object.values(lifestyle).filter(Boolean).length +
            medKeys.length + currentSlugs.length
          }
          onClick={triggerDiagnosis}
        />
      )}

      {/* ── 入力変更時の「再診断」バナー（診断済 + 入力変更後）── */}
      {diagnosed && !calculating && inputChangedAfterDiagnosis && (
        <RediagnoseCTA onClick={triggerDiagnosis} />
      )}

      {/* ── 結果 ── */}
      <div ref={resultsRef} className="scroll-mt-6">
        {calculating ? (
          <CalculationTheatre
            considerationsCount={
              concernSlugs.length +
              (basic.age ? 1 : 0) + (basic.gender ? 1 : 0) +
              (basic.pregnancy && basic.pregnancy !== 'none' ? 1 : 0) +
              Object.values(lifestyle).filter(Boolean).length +
              medKeys.length + currentSlugs.length
            }
          />
        ) : diagnosed && hasResults ? (
          <ResultsSection
            recommendations={recommendations}
            interactionResults={interactionResults}
            excludedByPregnancy={recommendResult.excludedByPregnancy}
            excludedByInteraction={recommendResult.excludedByInteraction}
            currentSlugs={currentSlugs}
            currentSlugCount={currentSlugs.length}
            concernSlugs={concernSlugs}
            concernSlugCount={concernSlugs.length}
            basicInfo={basic}
            lifestyle={lifestyle}
            medKeysCount={medKeys.length}
          />
        ) : diagnosed && !hasResults ? (
          <EmptyState
            hasAnyInput={hasAnyInput}
            pregnancyActive={pregnancyWarning}
            excludedByPregnancyCount={recommendResult.excludedByPregnancy.length}
            excludedByInteractionCount={recommendResult.excludedByInteraction.length}
          />
        ) : null}
      </div>

      {/* ── 免責 ── */}
      <div className="border-t border-border pt-6">
        <p className="text-[12px] text-muted-foreground leading-relaxed">
          本ツールは情報提供のみを目的としています。当ツールの結果は<strong className="font-semibold">医療判断の代替ではありません</strong>。
          実際の併用判断・摂取判断は必ず医師・薬剤師にご相談ください。
          推奨は論文エビデンスに基づく一般的な参考値で、個人の状態・既往・併用薬を個別に評価したものではありません。
        </p>
      </div>
    </div>
  )
}

/* ───────────────────────── サブコンポーネント ───────────────────────── */

function SectionWrap({ step, title, hint, children }: {
  step: number; title: string; hint?: string; children: React.ReactNode
}) {
  return (
    <section>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-[10px] font-semibold tracking-wider bg-accent/10 text-accent
          px-2 py-0.5 rounded-md">STEP {step}</span>
        <h2 className="font-semibold text-[15px] text-foreground">{title}</h2>
      </div>
      {hint && <p className="text-[12px] text-muted-foreground mb-4">{hint}</p>}
      {children}
    </section>
  )
}

function FieldGrid({ children }: { children: React.ReactNode }) {
  return <div className="space-y-3">{children}</div>
}

function ChoiceRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className="text-[12px] text-muted-foreground w-16 flex-shrink-0">{label}</span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  )
}

function ChoiceChip({ active, onClick, children }: {
  active: boolean; onClick: () => void; children: React.ReactNode
}) {
  return (
    <button onClick={onClick}
      className={`inline-flex items-center text-[12.5px] font-medium px-3.5 py-1.5 min-h-[36px]
        rounded-full border transition-all
        ${active
          ? 'bg-foreground text-background border-foreground shadow-sm'
          : 'bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground'}`}>
      {children}
    </button>
  )
}

function ConcernPicker({ selected, onToggle }: {
  selected: string[]; onToggle: (slug: string) => void
}) {
  const orderedCategories = CONCERN_CAT_ORDER.filter((cat) => concerns.some((c) => c.category === cat))
  return (
    <div className="space-y-4">
      {orderedCategories.map((cat) => {
        const catConcerns = concerns.filter((c) => c.category === cat)
        return (
          <div key={cat}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground mb-2">
              {concernCategoryLabel[cat]}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {catConcerns.map((c) => {
                const active = selected.includes(c.slug)
                return (
                  <button key={c.slug} onClick={() => onToggle(c.slug)}
                    className={`inline-flex items-center gap-1.5 text-[12.5px] font-medium
                      px-3.5 py-1.5 min-h-[40px] rounded-full border transition-all
                      ${active
                        ? `cat-${c.category} shadow-sm`
                        : 'bg-card border-border text-muted-foreground hover:text-foreground hover:border-accent/50'}`}>
                    <span className="text-[14px] leading-none">{c.emoji}</span>
                    {c.nameJa}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function MedicationPicker({ selected, onToggle }: {
  selected: string[]; onToggle: (key: string) => void
}) {
  const [open, setOpen] = useState<CanonicalCategory | null>(null)
  const [query, setQuery] = useState('')
  const grouped = useMemo(() => groupCanonicalByCategory(), [])

  // 表示順：よく使われそうな category を上に
  const orderedCats: CanonicalCategory[] = [
    'anticoagulant', 'antiplatelet', 'antihypertensive', 'antidiabetic',
    'statin', 'thyroid', 'antidepressant', 'sedative', 'gastric',
    'hormone', 'nsaid', 'antibiotic', 'antiepileptic', 'immunosuppressant',
    'antipsychotic', 'cyp_substrate', 'parkinsonian', 'cognitive',
    'erectile', 'anticholinergic', 'opioid', 'chemotherapy',
    'bisphosphonate', 'stimulant', 'cardiac', 'other_drug',
    'condition', 'lifestyle', 'topical', 'vaccine', 'lab_test',
    'mineral_supp', 'supplement_other',
  ]

  // 検索結果 (空文字なら null)
  const q = query.trim().toLowerCase()
  const searchResults = useMemo(() => {
    if (!q) return null
    return CANONICAL_INTERACTIONS.filter((e) =>
      e.key.toLowerCase().includes(q) || CATEGORY_LABEL[e.category].includes(q),
    ).slice(0, 30)
  }, [q])

  return (
    <div>
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3 pb-3 border-b border-border">
          {selected.map((key) => {
            const entry = CANONICAL_INTERACTIONS.find((e) => e.key === key)
            if (!entry) return null
            return (
              <span key={key}
                className="inline-flex items-center gap-1.5 bg-card border border-border
                  rounded-full pl-3 pr-2 py-1.5 text-[12.5px] font-medium">
                <span className="text-foreground">{entry.key}</span>
                <button onClick={() => onToggle(key)} aria-label="削除"
                  className="text-muted-foreground hover:text-destructive transition-colors">
                  ×
                </button>
              </span>
            )
          })}
        </div>
      )}

      {/* 検索 box */}
      <div className="relative mb-3">
        <div className="flex items-center gap-2 bg-card border border-border rounded-xl
          px-4 py-2.5 focus-within:border-accent transition-colors">
          <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder="薬剤名・カテゴリで検索（例: ワルファリン、降圧、SSRI）"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-[13px] text-foreground
              placeholder:text-muted-foreground/50 outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} aria-label="検索クリア"
              className="text-muted-foreground hover:text-foreground transition-colors text-[16px] leading-none">
              ×
            </button>
          )}
        </div>
      </div>

      {searchResults !== null ? (
        /* 検索モード：フラット chip リスト */
        searchResults.length === 0 ? (
          <div className="bg-secondary/30 border border-border rounded-xl px-4 py-4 text-center">
            <p className="text-[12.5px] text-muted-foreground">「{query}」に一致する医薬品がありません</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {searchResults.map((e) => {
              const active = selected.includes(e.key)
              return (
                <button key={e.key} onClick={() => onToggle(e.key)}
                  className={`inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5
                    min-h-[36px] rounded-full border transition-all
                    ${active
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground'}`}>
                  {e.key}
                  <span className="text-[10px] opacity-60">／{CATEGORY_LABEL[e.category]}</span>
                </button>
              )
            })}
          </div>
        )
      ) : (
        /* カテゴリ accordion モード */
        <div className="space-y-2">
          {orderedCats.map((cat) => {
            const items = grouped[cat]
            if (!items || items.length === 0) return null
            const isOpen = open === cat
            const selectedCount = items.filter((e) => selected.includes(e.key)).length
            return (
              <div key={cat} className="border border-border rounded-xl overflow-hidden">
                <button onClick={() => setOpen(isOpen ? null : cat)}
                  className="w-full flex items-center justify-between px-4 py-2.5
                    hover:bg-secondary/40 transition-colors text-left">
                  <span className="text-[13px] font-medium text-foreground">
                    {CATEGORY_LABEL[cat]}
                    <span className="text-[11px] text-muted-foreground/80 ml-2">{items.length}件</span>
                  </span>
                  <div className="flex items-center gap-2">
                    {selectedCount > 0 && (
                      <span className="text-[11px] font-semibold bg-accent/10 text-accent rounded-full px-2 py-0.5">
                        {selectedCount}
                      </span>
                    )}
                    <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 pb-3 pt-1 flex flex-wrap gap-1.5 border-t border-border bg-secondary/20">
                    {items.map((e) => {
                      const active = selected.includes(e.key)
                      return (
                        <button key={e.key} onClick={() => onToggle(e.key)}
                          className={`inline-flex items-center text-[12px] font-medium px-3 py-1.5
                            min-h-[36px] rounded-full border transition-all
                            ${active
                              ? 'bg-foreground text-background border-foreground'
                              : 'bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground'}`}>
                          {e.key}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function CurrentSupplementPicker({ slugs, onAdd, onRemove, onClear }: {
  slugs: string[]
  onAdd: (slug: string) => void
  onRemove: (slug: string) => void
  onClear: () => void
}) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const candidates = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return ingredients
      .filter((i) =>
        !slugs.includes(i.slug) &&
        i.usageType !== 'topical' &&  // 「飲んでいるサプリ」なので外用は候補から除外
        (i.nameJa.includes(query) || i.nameEn.toLowerCase().includes(q) ||
         (i.aliases ?? []).some((a) => a.toLowerCase().includes(q) || a.includes(query))),
      )
      .slice(0, 8)
  }, [query, slugs])

  const handleAdd = (slug: string) => {
    onAdd(slug)
    setQuery('')
    setOpen(false)
  }

  return (
    <div>
      {/* 既存サプリの chip 列（あれば表示） */}
      {slugs.length > 0 && (
        <div className="mb-3 pb-3 border-b border-border">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {slugs.map((slug) => {
              const ing = getIngredient(slug)
              if (!ing) return null
              return (
                <span key={slug}
                  className="inline-flex items-center gap-1.5 bg-card border border-border
                    rounded-full pl-3 pr-2 py-1.5 text-[12.5px] font-medium">
                  <EvidenceBadge rank={ing.evidenceRank} variant="dot" />
                  <span className="text-foreground">{ing.nameJa}</span>
                  <button onClick={() => onRemove(slug)} aria-label="削除"
                    className="text-muted-foreground hover:text-destructive transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )
            })}
          </div>
          <button onClick={onClear}
            className="text-[11px] text-muted-foreground hover:text-destructive transition-colors">
            すべて外す
          </button>
        </div>
      )}

      {/* 検索 + 追加 UI */}
      <div className="relative">
        <div className="flex items-center gap-2 bg-card border border-border rounded-xl
          px-4 py-3 focus-within:border-accent transition-colors">
          <Plus className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder="経口サプリを検索して追加（例：ビタミンD、マグネシウム）"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            className="flex-1 bg-transparent text-[14px] text-foreground
              placeholder:text-muted-foreground/50 outline-none"
          />
        </div>

        {open && candidates.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border
            rounded-xl shadow-lg overflow-hidden z-10">
            {candidates.map((ing) => (
              <button key={ing.slug} onMouseDown={() => handleAdd(ing.slug)}
                className="w-full flex items-center gap-3 px-4 py-3
                  hover:bg-secondary transition-colors text-left
                  border-b border-border last:border-0">
                <EvidenceBadge rank={ing.evidenceRank} variant="dot" />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-foreground truncate">{ing.nameJa}</p>
                  <p className="text-[11px] text-muted-foreground/60 truncate">{ing.nameEn}</p>
                </div>
                <Plus className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              </button>
            ))}
          </div>
        )}

        {open && query.trim() && candidates.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border
            rounded-xl shadow-lg px-4 py-3 text-[13px] text-muted-foreground z-10">
            「{query}」は見つかりませんでした
          </div>
        )}
      </div>

      {/* 初回の見本：よく登録されている成分 */}
      {slugs.length === 0 && (
        <div className="mt-3">
          <p className="text-[11px] text-muted-foreground mb-2">よく登録される成分から追加：</p>
          <div className="flex flex-wrap gap-1.5">
            {['vitamin-d', 'magnesium', 'omega3', 'creatine', 'collagen-peptide'].map((slug) => {
              const ing = getIngredient(slug)
              if (!ing) return null
              return (
                <button key={slug} onClick={() => onAdd(slug)}
                  className="inline-flex items-center gap-1 text-[12px] bg-secondary border border-border
                    rounded-full px-3 py-1.5 min-h-[36px] hover:border-accent hover:text-accent transition-colors">
                  <Plus className="w-3 h-3" />
                  {ing.nameJa}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function EmptyState({ hasAnyInput, pregnancyActive, excludedByPregnancyCount, excludedByInteractionCount }: {
  hasAnyInput: boolean
  pregnancyActive: boolean
  excludedByPregnancyCount: number
  excludedByInteractionCount: number
}) {
  // ケース A: 何も入れていない
  if (!hasAnyInput) {
    return (
      <div className="bg-secondary/30 border border-dashed border-border rounded-2xl px-5 py-8 text-center">
        <p className="text-[14px] text-muted-foreground leading-relaxed">
          ここに推奨3〜5件と相互作用警告が表示されます。<br />
          <strong className="text-foreground">悩みを1つ以上選ぶ</strong>か、
          生活習慣で<strong className="text-foreground">運動「しっかり」/ 飲酒「ほぼ毎日」/ 喫煙「毎日」/ 睡眠「6時間未満」/ 食事「菜食/外食」</strong>
          のいずれかを選ぶと候補が出ます。
        </p>
      </div>
    )
  }
  // ケース B: 入れたが全件除外された（妊娠中 + 抗凝固薬等の組み合わせで全 wipe される）
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-6">
      <div className="flex items-start gap-2 mb-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-[14px] font-semibold text-amber-900 leading-relaxed">
            該当する推奨成分が見つかりませんでした
          </p>
          <p className="text-[12.5px] text-amber-800 leading-relaxed mt-1">
            選択された悩み・ライフスタイルに対する候補成分が、安全フィルタですべて除外されました。
          </p>
        </div>
      </div>
      <ul className="text-[12.5px] text-amber-800 space-y-1 pl-7 list-disc">
        {pregnancyActive && excludedByPregnancyCount > 0 && (
          <li>妊娠中・授乳中・妊活中の安全データ不足で <strong>{excludedByPregnancyCount}件</strong> を除外</li>
        )}
        {excludedByInteractionCount > 0 && (
          <li>服用中の医薬品との重大な相互作用で <strong>{excludedByInteractionCount}件</strong> を除外</li>
        )}
        <li>悩みを増やす・生活習慣選択を見直すと候補が増える可能性があります</li>
      </ul>
      <p className="text-[12px] text-amber-700 mt-3 pl-7">
        いずれの摂取も<strong>必ず医師・薬剤師にご相談ください</strong>。
      </p>
    </div>
  )
}

/* ───────────────────────── 結果セクション ───────────────────────── */

function ResultsSection({ recommendations, interactionResults, excludedByPregnancy, excludedByInteraction, currentSlugs, currentSlugCount, concernSlugs, concernSlugCount, basicInfo, lifestyle, medKeysCount }: {
  recommendations: Recommendation[]
  interactionResults: InteractionResult[]
  excludedByPregnancy: RecommendResult['excludedByPregnancy']
  excludedByInteraction: RecommendResult['excludedByInteraction']
  currentSlugs: string[]
  currentSlugCount: number
  concernSlugs: string[]
  concernSlugCount: number
  basicInfo: BasicInfo
  lifestyle: Lifestyle
  medKeysCount: number
}) {
  const platformLabel: Record<string, string> = { iherb: 'iHerb', amazon: 'Amazon', cosme: '@cosme' }
  const totalExcluded = excludedByPregnancy.length + excludedByInteraction.length
  const showPolypharmacyNudge = currentSlugCount >= 4 && recommendations.length > 1

  // 7軸 axis scores (推奨スタック適用後)
  const afterAxisScores = useMemo(
    () => calcAxisScores([...currentSlugs.map((s) => getIngredient(s)).filter((i): i is Ingredient => !!i), ...recommendations.map((r) => r.ing)]),
    [recommendations, currentSlugs],
  )
  // 7軸 axis scores (現状・推奨適用前 = 既存サプリのみ)
  const beforeAxisScores = useMemo(
    () => calcAxisScores(currentSlugs.map((s) => getIngredient(s)).filter((i): i is Ingredient => !!i)),
    [currentSlugs],
  )
  // 合計点数 (0-100) — 7 軸 × 10 を 100 換算
  const beforeScore = useMemo(
    () => Math.round(Object.values(beforeAxisScores).reduce((a, b) => a + b, 0) * (100 / 70)),
    [beforeAxisScores],
  )
  const afterScore = useMemo(
    () => Math.round(Object.values(afterAxisScores).reduce((a, b) => a + b, 0) * (100 / 70)),
    [afterAxisScores],
  )

  // Personality Type
  const personalityType = useMemo(
    () => getPersonalityType(afterAxisScores, basicInfo, lifestyle, concernSlugCount, medKeysCount, currentSlugCount),
    [afterAxisScores, basicInfo, lifestyle, concernSlugCount, medKeysCount, currentSlugCount],
  )
  const bonusInsight = useMemo(() => getBonusInsight(afterAxisScores), [afterAxisScores])
  const inputRecap = useMemo(
    () => getInputRecap(basicInfo, lifestyle, concernSlugs, medKeysCount, currentSlugCount),
    [basicInfo, lifestyle, concernSlugs, medKeysCount, currentSlugCount],
  )
  const rarityPercent = useMemo(
    () => getRarityPercent(personalityType.considerationsCount),
    [personalityType.considerationsCount],
  )
  // Top score for match % computation
  const topScore = recommendations[0]?.score ?? 1

  // 推奨成分に関連する interaction のみ抽出（既存サプリ由来は別表示）
  const recSlugSet = new Set(recommendations.map((r) => r.ing.slug))
  const recInteractions = interactionResults.filter((i) => recSlugSet.has(i.ingredientSlug))
  const currentInteractions = interactionResults.filter((i) => !recSlugSet.has(i.ingredientSlug))

  return (
    <>
      {/* ── Personality Type Card（最上段・delay 0）── */}
      <div className="animate-fade-up delay-0">
        <PersonalityTypeCard
          type={personalityType}
          recommendationCount={recommendations.length}
          excludedCount={totalExcluded}
          currentSlugCount={currentSlugCount}
          inputRecap={inputRecap}
          rarityPercent={rarityPercent}
        />
      </div>

      {/* ── Before/After スコアバー（delay 200） ── */}
      <div className="animate-fade-up delay-200">
        <BeforeAfterScoreCard
          beforeScore={beforeScore}
          afterScore={afterScore}
        />
      </div>

      {/* ── Input Effect Map：入力がどう反映されたかの透明性表示（delay 300） ── */}
      <div className="animate-fade-up delay-300">
        <InputEffectMap
          recommendations={recommendations}
          concernSlugs={concernSlugs}
        />
      </div>

      {recInteractions.length > 0 && (
        <div className="animate-fade-up delay-300">
          <InteractionAlert
            title="推奨成分と医薬品の相互作用"
            results={recInteractions}
          />
        </div>
      )}

      {showPolypharmacyNudge && (
        <div className="animate-fade-up delay-300 bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4 mb-4">
          <p className="text-[13px] font-semibold text-blue-900 mb-1">
            既に {currentSlugCount} 件のサプリを摂取中
          </p>
          <p className="text-[12px] text-blue-800 leading-relaxed">
            一度に多くを追加するより、まず<strong>#1 だけを 4〜8 週試して効果を確認</strong>し、
            そこから段階的に増やすほうが「何が効いたか」を切り分けやすく、相互作用リスクも下げられます。
          </p>
        </div>
      )}

      <section className="mb-8 animate-fade-up delay-450">
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-[10px] font-semibold tracking-wider bg-accent text-primary-foreground
            px-2 py-0.5 rounded-md">RESULT</span>
          <h2 className="font-semibold text-[16px] text-foreground">
            あなたへの推奨 {recommendations.length} 選
          </h2>
        </div>

        <div className="space-y-3">
          {recommendations.map((r, idx) => (
            <div key={r.ing.slug} className={`animate-fade-up ${idx === 0 ? 'delay-600' : idx === 1 ? 'delay-800' : idx === 2 ? 'delay-1000' : 'delay-1200'}`}>
              <RecommendationCard
                rec={r}
                rank={idx + 1}
                platformLabel={platformLabel}
                interactions={interactionResults.filter((i) => i.ingredientSlug === r.ing.slug)}
                matchPercent={Math.round((r.score / topScore) * 100)}
                tribePercent={getTribePercent(r.ing.slug, concernSlugs)}
                animationDelayMs={600 + idx * 200 + 300}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Action Plan：段階導入の concrete steps ── */}
      {recommendations.length >= 2 && (
        <div className="animate-fade-up delay-1200">
          <ActionPlanSection recommendations={recommendations} />
        </div>
      )}

      {/* ── Interaction Checker 連携（推奨 + 既存サプリ + 服用薬を一括 check）── */}
      {(recommendations.length > 0 || currentSlugCount > 0) && (
        <div className="mb-8 animate-fade-up delay-1300">
          <InteractionCheckerCta
            variant="banner"
            ingredientSlugs={Array.from(
              new Set([
                ...recommendations.map((r) => r.ing.slug),
                ...currentSlugs,
              ]),
            )}
            customLabel="推奨 + 既存サプリ × 服用薬 を Interaction Checker で詳細確認"
          />
        </div>
      )}

      {currentInteractions.length > 0 && (
        <section className="mb-8">
          <h2 className="font-semibold text-[15px] text-foreground mb-3">
            既存サプリと医薬品の相互作用
          </h2>
          <InteractionAlert
            title="既に飲んでいるサプリに該当する警告"
            results={currentInteractions}
            tone="amber"
          />
        </section>
      )}

      {/* 7軸カバー radar */}
      {recommendations.length > 0 && (
        <section className="mb-8">
          <h2 className="font-semibold text-[15px] text-foreground mb-1">
            このスタックの 7軸カバー
          </h2>
          <p className="text-[12px] text-muted-foreground mb-5 leading-relaxed">
            推奨 {recommendations.length} 件を全部追加した場合のカバー範囲。#1 から段階的に始めれば OK。
          </p>
          <RadarChart
            data={AXES.map((a) => ({
              axis: a.key, label: a.label, emoji: a.emoji,
              score: afterAxisScores[a.key], max: 10,
            }))}
            size={340}
          />
        </section>
      )}

      {/* ── Bonus Insight ── */}
      {bonusInsight && <BonusInsightCard insight={bonusInsight} />}

      {/* ── 🎉 完了 celebration（Peak-End）── */}
      {recommendations[0] && (
        <CompletionCelebration
          topRecommendation={recommendations[0]}
          considerationsCount={personalityType.considerationsCount}
          recommendationCount={recommendations.length}
          typeName={personalityType.name}
        />
      )}

      {totalExcluded > 0 && (
        <ExcludedSection
          excludedByPregnancy={excludedByPregnancy}
          excludedByInteraction={excludedByInteraction}
        />
      )}

      {concernSlugCount < 2 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-6 flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-[12.5px] text-amber-800 leading-relaxed">
            {concernSlugCount === 0
              ? '悩みを 1〜3 個追加すると、論文エビデンスに基づく推奨がさらに広がります。'
              : '悩みを 2〜3 個に増やすと、複数悩みに横断的に効く成分が優先表示されます。'}
          </p>
        </div>
      )}

      {/* CTA：Interaction Checker で詳しく確認 */}
      <section className="mb-8">
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold text-[14px] text-foreground mb-1">もっと詳しく相互作用を調べる</h3>
          <p className="text-[12.5px] text-muted-foreground leading-relaxed mb-3">
            検討中のサプリ + 服用中の医薬品をすべて入れて、severity 別にチェックできます。
          </p>
          <Link href="/tools/interaction-checker"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent
              hover:underline">
            飲み合わせチェッカーを開く <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </>
  )
}

function RecommendationCard({ rec, rank, platformLabel, interactions, matchPercent, tribePercent, animationDelayMs }: {
  rec: Recommendation
  rank: number
  platformLabel: Record<string, string>
  interactions: InteractionResult[]
  matchPercent: number
  tribePercent: number | null
  animationDelayMs: number
}) {
  const { ing } = rec
  const topProduct = ing.products.find((p) => p.rank === 1) ?? ing.products[0]
  const { isFavorite, toggle } = useFavorite('ingredient', ing.slug)
  // カウントアップ：表示開始から少し遅れて回す
  const animatedMatch = useCountUp(Math.min(100, Math.max(0, matchPercent)), 1100, animationDelayMs + 200)
  const animatedTribe = useCountUp(tribePercent ?? 0, 1100, animationDelayMs + 400)

  const hasAvoid = interactions.some((i) => i.level === 'avoid')
  const hasCaution = interactions.some((i) => i.level === 'caution')

  // 用量表示
  const dosageStr = ing.dosageMin && ing.dosageMax
    ? `${ing.dosageMin}〜${ing.dosageMax} ${ing.dosageUnit}`
    : ing.dosageMin
      ? `${ing.dosageMin} ${ing.dosageUnit}`
      : null

  return (
    <div className={`bg-card border rounded-2xl p-4
      ${rank === 1 ? 'border-accent/40 shadow-sm' : 'border-border'}
      ${hasAvoid ? 'border-rose-300' : ''}`}>
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className={`text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-md
          ${rank === 1
            ? 'bg-accent text-primary-foreground'
            : 'bg-secondary text-muted-foreground'}`}>
          #{rank}{rank === 1 ? ' BEST' : ''}
        </span>
        <EvidenceBadge rank={ing.evidenceRank} variant="dot" />
        {rec.hits > 1 && (
          <span className="text-[10px] bg-emerald-50 border border-emerald-200
            rounded px-1.5 py-0.5 text-emerald-700">
            {rec.hits}悩み横断
          </span>
        )}
        {hasAvoid && (
          <span className="text-[10px] bg-rose-50 border border-rose-200
            rounded px-1.5 py-0.5 text-rose-700 inline-flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> 要回避警告
          </span>
        )}
        {!hasAvoid && hasCaution && (
          <span className="text-[10px] bg-amber-50 border border-amber-200
            rounded px-1.5 py-0.5 text-amber-700 inline-flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> 要注意
          </span>
        )}
        <button onClick={toggle}
          aria-label={isFavorite ? 'お気に入りから削除' : 'お気に入りに追加'}
          className="ml-auto text-muted-foreground hover:text-foreground transition-colors">
          <Star className={`w-4 h-4 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
        </button>
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <p className={`font-semibold text-foreground ${rank === 1 ? 'text-[18px]' : 'text-[15px]'}`}>
          {ing.nameJa}
        </p>
        <span className="text-[11px] font-semibold text-accent tabular-nums ml-auto flex-shrink-0">
          マッチ度 {animatedMatch}%
        </span>
      </div>

      {/* マッチ度 bar — bar-grow keyframe で 0 → 100% に伸びる */}
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-2">
        <div className="h-full bg-accent rounded-full animate-bar-grow"
          style={{
            width: `${Math.min(100, Math.max(0, matchPercent))}%`,
            animationDelay: `${animationDelayMs + 200}ms`,
          }} />
      </div>

      {tribePercent !== null && (
        <p className="text-[11px] text-muted-foreground mb-3 inline-flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          同タイプの <strong className="text-foreground tabular-nums mx-0.5">{animatedTribe}%</strong> がこの成分を優先選択
        </p>
      )}

      <p className="text-[12.5px] text-muted-foreground leading-relaxed line-clamp-2 mb-3">
        {ing.tagline}
      </p>

      {/* WHY this for you — 大きく見せる */}
      {(rec.matchedConcerns.length > 0 || rec.lifestyleBoost.length > 0) && (
        <div className="bg-secondary/50 rounded-lg px-3 py-2.5 mb-3">
          <p className="text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
            あなたに合う理由
          </p>
          <div className="space-y-1">
            {rec.matchedConcerns.length > 0 && (
              <p className="text-[12px] text-foreground leading-relaxed">
                🎯 <strong className="font-semibold">悩み</strong>:&nbsp;
                {rec.matchedConcerns.slice(0, 3).join('・')}
                {rec.matchedConcerns.length > 3 && ` ほか${rec.matchedConcerns.length - 3}件`}
                {rec.hits > 1 && ` の${rec.hits}つに該当`}
              </p>
            )}
            {rec.lifestyleBoost.length > 0 && (
              <p className="text-[12px] text-foreground leading-relaxed">
                ⚡ <strong className="font-semibold">ライフスタイル</strong>:&nbsp;
                {Array.from(new Set(rec.lifestyleBoost)).join('・')} と相性 ◎
              </p>
            )}
          </div>
        </div>
      )}

      {/* 実用情報 — 用量・効果実感・タイミング */}
      {(dosageStr || ing.duration || ing.timing) && (
        <div className="grid grid-cols-3 gap-2 mb-3 text-center">
          {dosageStr && (
            <div className="bg-secondary/30 rounded-lg px-2 py-2">
              <p className="text-[9.5px] uppercase tracking-wider text-muted-foreground mb-0.5">用量</p>
              <p className="text-[11px] font-semibold text-foreground leading-tight">{dosageStr}</p>
            </div>
          )}
          {ing.duration && (
            <div className="bg-secondary/30 rounded-lg px-2 py-2">
              <p className="text-[9.5px] uppercase tracking-wider text-muted-foreground mb-0.5">効果実感</p>
              <p className="text-[11px] font-semibold text-foreground leading-tight line-clamp-2">{ing.duration.replace(/^[^0-9０-９]*/, '').slice(0, 20)}</p>
            </div>
          )}
          {ing.timing && (
            <div className="bg-secondary/30 rounded-lg px-2 py-2">
              <p className="text-[9.5px] uppercase tracking-wider text-muted-foreground mb-0.5">タイミング</p>
              <p className="text-[11px] font-semibold text-foreground leading-tight line-clamp-2">{ing.timing.slice(0, 18)}</p>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-3 pt-3 border-t border-border">
        <Link href={`/ingredients/${ing.slug}`}
          className="text-[12px] text-muted-foreground hover:text-foreground transition-colors
            inline-flex items-center gap-1">
          <ChevronRight className="w-3.5 h-3.5" />
          エビデンスを見る
        </Link>
        {topProduct && (
          <OutboundProductLink
            href={topProduct.url}
            platform={topProduct.platform}
            ingredientSlug={ing.slug}
            productRank={topProduct.rank}
            aspProgram={topProduct.aspProgram}
            aspId={topProduct.aspId}
            commissionRateBand={topProduct.commissionRateBand}
            className="ml-auto text-[12px] font-semibold text-accent
              bg-accent/8 border border-accent/20 rounded-lg px-3 py-1.5
              hover:bg-accent/15 transition-colors"
          >
            {platformLabel[topProduct.platform]}で購入 →
          </OutboundProductLink>
        )}
      </div>
    </div>
  )
}

/* ── Personality Type Card（結果トップ・人格化 + IKEA効果 + Scarcity）── */
function PersonalityTypeCard({ type, recommendationCount, excludedCount, currentSlugCount, inputRecap, rarityPercent }: {
  type: PersonalityType
  recommendationCount: number
  excludedCount: number
  currentSlugCount: number
  inputRecap: string[]
  rarityPercent: number
}) {
  // 希少度の星表示
  const rarityStars = rarityPercent < 5 ? 5 : rarityPercent < 12 ? 4 : rarityPercent < 22 ? 3 : rarityPercent < 35 ? 2 : 1
  const rarityLabel = rarityStars >= 5 ? '極めて希少' : rarityStars >= 4 ? '希少' : rarityStars >= 3 ? '深掘り型' : rarityStars >= 2 ? '一般的' : 'ライト'

  // count up
  const animatedRarity = useCountUp(Math.round(rarityPercent * 10), 1100, 400)

  return (
    <section className="mb-6">
      <div className="bg-gradient-to-br from-accent/8 via-card to-card border-2 border-accent/30 rounded-2xl p-5 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-semibold tracking-wider bg-accent text-primary-foreground
            px-2 py-0.5 rounded-md">YOUR TYPE</span>
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700
              bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
              {Array.from({ length: rarityStars }, (_, i) => (
                <span key={i} className="text-amber-500">★</span>
              ))}
              <span className="ml-0.5">{rarityLabel}</span>
            </span>
            <a href={buildShareXUrl(type.name)} target="_blank" rel="noopener noreferrer"
              aria-label="X でシェア"
              title="X でシェア"
              className="inline-flex items-center justify-center w-7 h-7 rounded-full
                bg-card border border-border text-muted-foreground
                hover:text-foreground hover:border-foreground/30 transition-colors">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3 mb-3">
          <span className="text-[42px] leading-none flex-shrink-0">{type.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="text-[20px] sm:text-[24px] font-bold text-foreground leading-tight mb-1">
              {type.name}
            </p>
            {type.modifier && (
              <p className="text-[13px] text-muted-foreground leading-snug">
                {type.modifier}
              </p>
            )}
          </div>
        </div>

        {/* Rarity (Scarcity 訴求) */}
        <div className="bg-card/70 border border-amber-100 rounded-xl px-4 py-2.5 mb-3 flex items-center gap-2">
          <span className="text-[16px]">✨</span>
          <p className="text-[12px] text-foreground leading-snug flex-1">
            このタイプの組み合わせは <strong className="text-amber-700 tabular-nums">100人中 約{(animatedRarity / 10).toFixed(1)}人</strong>
            <span className="text-muted-foreground">（プロファイル特異度）</span>
          </p>
        </div>

        {/* 入力 Recap chips (IKEA / Endowment 効果) */}
        {inputRecap.length > 0 && (
          <div className="mb-3">
            <p className="text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              あなたが入力した {inputRecap.length} 項目
            </p>
            <div className="flex flex-wrap gap-1">
              {inputRecap.map((item, i) => (
                <span key={i} className="inline-flex items-center gap-0.5 text-[11px] font-medium
                  bg-card text-foreground border border-border rounded-full px-2 py-0.5">
                  <svg className="w-2.5 h-2.5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 統計（推奨件数・既存・除外） */}
        <div className="bg-card/60 rounded-xl px-4 py-2.5 mb-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-1.5 text-[12px]">
            <div>
              <span className="text-muted-foreground">考慮要素</span>
              <span className="ml-2 font-bold text-foreground tabular-nums">{type.considerationsCount}</span>
            </div>
            <div>
              <span className="text-muted-foreground">推奨</span>
              <span className="ml-2 font-bold text-foreground tabular-nums">{recommendationCount}件</span>
            </div>
            {currentSlugCount > 0 && (
              <div>
                <span className="text-muted-foreground">既存サプリ</span>
                <span className="ml-2 font-bold text-foreground tabular-nums">{currentSlugCount}件</span>
              </div>
            )}
            {excludedCount > 0 && (
              <div>
                <span className="text-muted-foreground">安全除外</span>
                <span className="ml-2 font-bold text-amber-700 tabular-nums">{excludedCount}件</span>
              </div>
            )}
          </div>
        </div>

        <p className="text-[12px] text-muted-foreground leading-relaxed">
          以下の {recommendationCount} 選は <strong className="font-semibold text-foreground">{type.topAxisLabel}</strong> を主軸に、
          あなたの入力すべてに最適化された結果です。
        </p>
      </div>
    </section>
  )
}

/* ── InputEffectMap：入力 → 推奨への反映を可視化（透明性）── */
function InputEffectMap({ recommendations, concernSlugs }: {
  recommendations: Recommendation[]
  concernSlugs: string[]
}) {
  // reason → 推奨に含まれた成分名のセットを集計
  const reasonToNames = new Map<string, Set<string>>()
  for (const rec of recommendations) {
    for (const reason of rec.matchedConcerns) {
      if (!reasonToNames.has(reason)) reasonToNames.set(reason, new Set())
      reasonToNames.get(reason)!.add(rec.ing.nameJa)
    }
    for (const reason of rec.lifestyleBoost) {
      if (!reasonToNames.has(reason)) reasonToNames.set(reason, new Set())
      reasonToNames.get(reason)!.add(rec.ing.nameJa)
    }
  }

  // 表示順：悩み（concern.nameJa の順）→ 年齢ラベル → 性別 → ライフスタイル
  const concernOrderedReasons: string[] = []
  for (const cslug of concernSlugs) {
    const c = getConcern(cslug)
    if (c && reasonToNames.has(c.nameJa)) concernOrderedReasons.push(c.nameJa)
  }
  const personalReasonOrder = [
    '20代', '30代', '40代', '50代', '60代以上',
    '女性', '男性',
    'アルコール多飲', '飲酒習慣',
    '菜食傾向', '外食多め', '糖質制限',
    '睡眠時間短い', '日照不足の可能性',
    '喫煙習慣', '喫煙あり',
    '運動しっかり', '運動習慣',
  ]
  const personalReasons = personalReasonOrder.filter((r) => reasonToNames.has(r))

  const allEffects: Array<{ kind: 'concern' | 'personal'; reason: string; names: string[] }> = [
    ...concernOrderedReasons.map((r) => ({ kind: 'concern' as const, reason: r, names: Array.from(reasonToNames.get(r) ?? []) })),
    ...personalReasons.map((r) => ({ kind: 'personal' as const, reason: r, names: Array.from(reasonToNames.get(r) ?? []) })),
  ]

  if (allEffects.length === 0) return null

  return (
    <section className="mb-6">
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[10px] font-semibold tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded-md">
            HOW
          </span>
          <h2 className="font-semibold text-[14px] text-foreground">
            あなたの入力が結果にどう反映されたか
          </h2>
        </div>
        <p className="text-[11.5px] text-muted-foreground mb-3 leading-relaxed">
          各入力 → 上位 5 件にどの成分が加点で残ったかのマッピング。「未反映」がない＝全入力が活きています。
        </p>
        <ul className="space-y-1.5">
          {allEffects.map((e, i) => (
            <li key={i} className="flex items-start gap-2 text-[12px] leading-snug">
              <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
              <span className={`font-semibold flex-shrink-0 ${e.kind === 'concern' ? 'text-foreground' : 'text-accent'}`}>
                {e.reason}
              </span>
              <span className="text-muted-foreground mx-1">→</span>
              <span className="text-foreground/85 break-keep">{e.names.join('・')}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ── BeforeAfterScoreCard（Loss Aversion + Anchoring + Goal Gradient）── */
function BeforeAfterScoreCard({ beforeScore, afterScore }: {
  beforeScore: number
  afterScore: number
}) {
  const gain = Math.max(0, afterScore - beforeScore)
  const lostPotential = Math.max(0, 100 - afterScore)
  // count up
  const animatedBefore = useCountUp(beforeScore, 900, 200)
  const animatedAfter = useCountUp(afterScore, 1300, 500)
  const animatedGain = useCountUp(gain, 1200, 700)

  return (
    <section className="mb-6">
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-[10px] font-semibold tracking-wider bg-foreground text-background
            px-2 py-0.5 rounded-md">SCORE</span>
          <h2 className="font-semibold text-[14px] text-foreground">あなたの 7軸 カバー完成度</h2>
        </div>

        {/* Before / After 数値 */}
        <div className="grid grid-cols-3 items-center gap-3 mb-4">
          <div className="text-center">
            <p className="text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">現状</p>
            <p className="text-[28px] sm:text-[32px] font-bold text-muted-foreground/80 tabular-nums leading-none">
              {animatedBefore}
              <span className="text-[14px] text-muted-foreground/60 font-normal ml-0.5">/100</span>
            </p>
          </div>
          <div className="text-center text-muted-foreground">
            <span className="text-[20px]">→</span>
          </div>
          <div className="text-center">
            <p className="text-[10.5px] font-semibold uppercase tracking-wider text-accent mb-1">推奨後</p>
            <p className="text-[28px] sm:text-[34px] font-bold text-accent tabular-nums leading-none">
              {animatedAfter}
              <span className="text-[14px] text-muted-foreground/60 font-normal ml-0.5">/100</span>
            </p>
          </div>
        </div>

        {/* Bar comparison */}
        <div className="space-y-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] text-muted-foreground/80 w-12">現状</span>
              <div className="flex-1 h-2.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-muted-foreground/40 rounded-full animate-bar-grow"
                  style={{ width: `${beforeScore}%`, animationDelay: '300ms' }} />
              </div>
              <span className="text-[11px] font-semibold tabular-nums w-8 text-right">{animatedBefore}</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] text-accent w-12 font-semibold">推奨後</span>
              <div className="flex-1 h-2.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full animate-bar-grow"
                  style={{ width: `${afterScore}%`, animationDelay: '600ms' }} />
              </div>
              <span className="text-[11px] font-semibold tabular-nums w-8 text-right text-accent">{animatedAfter}</span>
            </div>
          </div>
        </div>

        {/* Loss Aversion + Gain framing */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 mb-0.5">
              改善余地
            </p>
            <p className="text-[18px] font-bold text-emerald-700 tabular-nums leading-none">
              +{animatedGain}<span className="text-[11px] font-normal">pt</span>
            </p>
          </div>
          <div className="bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-700 mb-0.5">
              取りこぼし中
            </p>
            <p className="text-[18px] font-bold text-rose-700 tabular-nums leading-none">
              {lostPotential}<span className="text-[11px] font-normal">pt</span>
            </p>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground mt-3 leading-relaxed">
          スコアは 7 軸（抗老化・肌・脳・ストレス・睡眠・免疫・代謝）のカバー合計を 100 換算した参考値です。
        </p>
      </div>
    </section>
  )
}

/* ── Action Plan：段階導入の週次計画 ── */
function ActionPlanSection({ recommendations }: { recommendations: Recommendation[] }) {
  if (recommendations.length === 0) return null
  const steps = [
    {
      label: 'Week 1-4',
      items: recommendations.slice(0, 1),
      hint: 'まずこれだけを単独で 4 週間。効果体感の有無を確認',
    },
    {
      label: 'Week 5-8',
      items: recommendations.slice(0, 2),
      hint: '#1 の手応えを見て、合っていれば #2 を追加',
    },
    {
      label: 'Week 9+',
      items: recommendations.slice(0, Math.min(5, recommendations.length)),
      hint: '#1+#2 で土台が安定したら #3-5 を順次追加',
    },
  ].filter((s) => s.items.length > 0)

  return (
    <section className="mb-8">
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-[10px] font-semibold tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded-md">
          PLAN
        </span>
        <h2 className="font-semibold text-[15px] text-foreground">段階的に始める導入計画</h2>
      </div>
      <p className="text-[12px] text-muted-foreground mb-4 leading-relaxed">
        「何が効いたか」を切り分けやすく、合わない成分の特定も簡単になる順番で組んでいます。
      </p>
      <div className="space-y-2">
        {steps.map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-xl px-4 py-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider
                bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                {s.label}
              </span>
              <span className="text-[12px] text-foreground font-medium truncate">
                {s.items.map((r, idx) => `#${idx + 1} ${r.ing.nameJa}`).join(' + ')}
              </span>
            </div>
            <p className="text-[11.5px] text-muted-foreground leading-relaxed pl-1">
              {s.hint}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Bonus Insight：意外な発見・教育的価値 ── */
function BonusInsightCard({ insight }: { insight: { title: string; body: string } }) {
  return (
    <section className="mb-8">
      <div className="bg-gradient-to-br from-amber-50 to-card border border-amber-200 rounded-2xl p-5">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[10px] font-semibold tracking-wider bg-amber-500 text-white
            px-2 py-0.5 rounded-md">INSIGHT</span>
          <h2 className="font-semibold text-[14px] text-amber-900">{insight.title}</h2>
        </div>
        <p className="text-[12.5px] text-amber-900/85 leading-relaxed">
          {insight.body}
        </p>
      </div>
    </section>
  )
}

function ExcludedSection({ excludedByPregnancy, excludedByInteraction }: {
  excludedByPregnancy: RecommendResult['excludedByPregnancy']
  excludedByInteraction: RecommendResult['excludedByInteraction']
}) {
  const [open, setOpen] = useState(false)
  const total = excludedByPregnancy.length + excludedByInteraction.length
  return (
    <section className="mb-8">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3
          bg-slate-50 border border-slate-200 rounded-2xl
          hover:bg-slate-100 transition-colors text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-500" />
          <p className="text-[13.5px] font-semibold text-slate-700">
            安全フィルタで除外された候補 <span className="tabular-nums">{total}件</span>
          </p>
        </div>
        <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && (
        <div className="mt-3 space-y-3">
          {excludedByPregnancy.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
              <p className="text-[12.5px] font-semibold text-amber-900 mb-2">
                妊娠/授乳/妊活で除外（{excludedByPregnancy.length}件）
              </p>
              <ul className="space-y-1.5 text-[12px] text-amber-800">
                {excludedByPregnancy.map((e, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <Link href={`/ingredients/${e.ing.slug}`}
                      className="font-medium hover:underline">
                      {e.ing.nameJa}
                    </Link>
                    <span className="opacity-75 text-[11.5px]">— {e.reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {excludedByInteraction.length > 0 && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl px-5 py-4">
              <p className="text-[12.5px] font-semibold text-rose-900 mb-2">
                服用医薬品との重大な相互作用で除外（{excludedByInteraction.length}件）
              </p>
              <ul className="space-y-1.5 text-[12px] text-rose-800">
                {excludedByInteraction.map((e, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-600 mt-0.5">•</span>
                    <div>
                      <Link href={`/ingredients/${e.ing.slug}`}
                        className="font-medium hover:underline">
                        {e.ing.nameJa}
                      </Link>
                      <span className="opacity-75 text-[11.5px]"> × {e.matchedKeys.join('・')}</span>
                      <p className="text-[11.5px] opacity-80 mt-0.5">{e.mechanism}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-rose-700 opacity-80 mt-3">
                ※ いずれの摂取も必ず医師・薬剤師にご相談ください
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

function InteractionAlert({ title, results, tone = 'rose' }: {
  title: string
  results: InteractionResult[]
  tone?: 'rose' | 'amber'
}) {
  const colorMap = tone === 'rose'
    ? { box: 'bg-rose-50 border-rose-200', icon: 'text-rose-600', text: 'text-rose-800' }
    : { box: 'bg-amber-50 border-amber-200', icon: 'text-amber-600', text: 'text-amber-800' }
  return (
    <div className={`${colorMap.box} border rounded-2xl px-5 py-4 mb-4`}>
      <div className="flex items-start gap-2 mb-2">
        <AlertTriangle className={`w-4 h-4 ${colorMap.icon} flex-shrink-0 mt-0.5`} />
        <p className={`text-[13px] font-semibold ${colorMap.text}`}>{title}（{results.length}件）</p>
      </div>
      <ul className="space-y-2 pl-6">
        {results.slice(0, 5).map((r, idx) => (
          <li key={idx} className={`text-[12.5px] ${colorMap.text} leading-relaxed`}>
            <span className="font-semibold">{r.ingredientNameJa} × {r.matchedKeys.join('・')}</span>
            <span className="ml-1 text-[10.5px] uppercase tracking-wider px-1.5 py-0.5 rounded
              bg-white/60 border border-current/30">
              {LEVEL_LABEL[r.level]}
            </span>
            <span className="block mt-0.5 opacity-80">{r.mechanism}</span>
          </li>
        ))}
        {results.length > 5 && (
          <li className={`text-[11.5px] ${colorMap.text} opacity-75`}>
            ほか {results.length - 5} 件…
            <Link href="/tools/interaction-checker" className="underline ml-1">
              飲み合わせチェッカーで詳細を確認 →
            </Link>
          </li>
        )}
      </ul>
      <p className={`text-[11px] ${colorMap.text} opacity-80 mt-3 pl-6`}>
        ※ 実際の併用判断は必ず医師・薬剤師にご相談ください
      </p>
    </div>
  )
}
