'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { AlertTriangle, ChevronRight, RotateCcw, Star } from 'lucide-react'
import { ingredients, concerns, getIngredient, getConcern } from '@/lib/data'
import { EvidenceBadge } from './EvidenceBadge'
import { OutboundProductLink } from './OutboundProductLink'
import { trackEvent } from '@/lib/analytics'
import {
  CANONICAL_INTERACTIONS,
  CATEGORY_LABEL,
  groupCanonicalByCategory,
  type CanonicalCategory,
} from '@/lib/interaction-canonical'
import { checkInteractions, LEVEL_LABEL, type InteractionResult } from '@/lib/interaction'
import { useFavorite } from '@/hooks/useFavorite'
import type { Concern, Ingredient } from '@/lib/types'

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

function recommend(
  concernSlugs: string[],
  lifestyle: Lifestyle,
  currentSlugs: string[],
  basicInfo: BasicInfo,
): Recommendation[] {
  if (concernSlugs.length === 0 && noLifestyleBoost(lifestyle)) return []

  const scoreMap = new Map<string, number>()
  const hitMap = new Map<string, number>()
  const matchedConcernMap = new Map<string, string[]>()
  const lifestyleBoostMap = new Map<string, string[]>()

  // 1. 悩みベースのスコアリング
  for (const cslug of concernSlugs) {
    const c = getConcern(cslug)
    if (!c) continue
    c.ingredientSlugs.forEach((slug, idx) => {
      const ing = getIngredient(slug)
      if (!ing) return
      const rankW = RANK_WEIGHT[ing.evidenceRank] ?? 0.4
      const posBonus = Math.max(0.3, 1 - idx * 0.08)
      const delta = rankW * posBonus
      scoreMap.set(slug, (scoreMap.get(slug) ?? 0) + delta)
      hitMap.set(slug, (hitMap.get(slug) ?? 0) + 1)
      const prev = matchedConcernMap.get(slug) ?? []
      matchedConcernMap.set(slug, [...prev, c.nameJa])
    })
  }

  // 2. ライフスタイル由来のブースト（特定成分のスコア + 0.4）
  const lifestyleBoosts: Array<{ slug: string; reason: string; condition: boolean }> = [
    { slug: 'milk-thistle',  reason: 'アルコール多飲', condition: lifestyle.alcohol === 'heavy' },
    { slug: 'nac',           reason: 'アルコール多飲', condition: lifestyle.alcohol === 'heavy' },
    { slug: 'vitamin-b12',   reason: '菜食傾向',       condition: lifestyle.diet === 'vegetarian' },
    { slug: 'iron',          reason: '菜食傾向',       condition: lifestyle.diet === 'vegetarian' },
    { slug: 'omega3',        reason: '菜食傾向',       condition: lifestyle.diet === 'vegetarian' },
    { slug: 'vitamin-d',     reason: '外食多め',       condition: lifestyle.diet === 'eat-out' },
    { slug: 'magnesium',     reason: '睡眠時間短い',   condition: lifestyle.sleep === 'short' },
    { slug: 'glycine',       reason: '睡眠時間短い',   condition: lifestyle.sleep === 'short' },
    { slug: 'vitamin-c',     reason: '喫煙習慣',       condition: lifestyle.smoking === 'daily' },
    { slug: 'glutathione',   reason: '喫煙習慣',       condition: lifestyle.smoking === 'daily' },
    { slug: 'creatine',      reason: '運動習慣あり',   condition: lifestyle.exercise === 'heavy' },
    { slug: 'whey-protein',  reason: '運動習慣あり',   condition: lifestyle.exercise === 'heavy' },
  ]
  for (const b of lifestyleBoosts) {
    if (!b.condition) continue
    const ing = getIngredient(b.slug)
    if (!ing) continue
    scoreMap.set(b.slug, (scoreMap.get(b.slug) ?? 0) + 0.4)
    const prev = lifestyleBoostMap.get(b.slug) ?? []
    lifestyleBoostMap.set(b.slug, [...prev, b.reason])
  }

  // 3. 既に飲んでいるサプリを除外（重複推奨を避ける）
  const currentSet = new Set(currentSlugs)

  // 4. 妊娠中・授乳中・妊活中は注意成分を除外（保守側に倒す）
  const pregnancyExclude = new Set<string>()
  if (basicInfo.pregnancy === 'pregnant' || basicInfo.pregnancy === 'nursing' || basicInfo.pregnancy === 'trying') {
    // ハーブ系（妊娠中の安全データ不足）
    ;['ashwagandha', 'rhodiola', 'st-johns-wort', 'ginkgo', 'panax-ginseng',
      'tongkat-ali', 'maca', 'kava', 'valerian', 'tribulus', 'fenugreek',
      'red-clover', 'black-cohosh', 'evening-primrose', 'dong-quai',
      'saw-palmetto', 'dhea', 'pregnenolone', 'melatonin', 'berberine',
      'high-dose-vitamin-a',
    ].forEach((s) => pregnancyExclude.add(s))
  }

  // 5. ranking
  return Array.from(scoreMap.entries())
    .filter(([slug]) => !currentSet.has(slug) && !pregnancyExclude.has(slug))
    .filter(([slug]) => !!getIngredient(slug))
    .map(([slug, score]) => {
      const ing = getIngredient(slug)!
      return {
        ing,
        score,
        hits: hitMap.get(slug) ?? 0,
        matchedConcerns: matchedConcernMap.get(slug) ?? [],
        lifestyleBoost: lifestyleBoostMap.get(slug) ?? [],
      }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
}

function noLifestyleBoost(l: Lifestyle): boolean {
  return l.exercise !== 'heavy' && l.alcohol !== 'heavy' &&
         l.diet !== 'vegetarian' && l.diet !== 'eat-out' &&
         l.sleep !== 'short' && l.smoking !== 'daily'
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

  const recommendations = useMemo(
    () => recommend(concernSlugs, lifestyle, currentSlugs, basic),
    [concernSlugs, lifestyle, currentSlugs, basic],
  )

  /* 推奨成分 + 既存サプリと医薬品の interaction check */
  const allCheckSlugs = useMemo(
    () => Array.from(new Set([...recommendations.map((r) => r.ing.slug), ...currentSlugs])),
    [recommendations, currentSlugs],
  )
  const interactionResults = useMemo<InteractionResult[]>(
    () => checkInteractions(allCheckSlugs, medKeys),
    [allCheckSlugs, medKeys],
  )

  const hasResults = recommendations.length > 0

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
    })
  }, [hasResults, concernSlugs.length, medKeys.length, recommendations.length, interactionResults.length])

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

  return (
    <div className="space-y-10">
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

      {/* ── Section 5: 既存サプリ（参考表示） ── */}
      <SectionWrap step={5} title="飲んでいるサプリ（自動取得）" hint="既存「サプリ診断」の保存内容から取得・重複推奨を回避">
        <CurrentSupplementList slugs={currentSlugs} onRemove={(slug) =>
          setCurrentSlugs((prev) => prev.filter((s) => s !== slug))
        } onClear={() => setCurrentSlugs([])} />
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

      {/* ── 結果 ── */}
      <div ref={resultsRef} className="scroll-mt-6">
        {hasResults ? (
          <>
            <ResultsSection
              recommendations={recommendations}
              interactionResults={interactionResults}
              medKeys={medKeys}
              currentSlugs={currentSlugs}
            />
          </>
        ) : (
          <EmptyState />
        )}
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
    </div>
  )
}

function CurrentSupplementList({ slugs, onRemove, onClear }: {
  slugs: string[]; onRemove: (slug: string) => void; onClear: () => void
}) {
  if (slugs.length === 0) {
    return (
      <div className="bg-secondary/30 border border-dashed border-border rounded-xl px-4 py-5 text-center">
        <p className="text-[12.5px] text-muted-foreground">
          まだサプリを登録していません。各成分ページの「マイサプリに追加」から登録できます。
        </p>
      </div>
    )
  }
  return (
    <div>
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
                ×
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
  )
}

function EmptyState() {
  return (
    <div className="bg-secondary/30 border border-dashed border-border rounded-2xl px-5 py-8 text-center">
      <p className="text-[14px] text-muted-foreground leading-relaxed">
        悩みを<strong className="text-foreground">1つ以上</strong>選ぶと、ここに推奨3〜5件と相互作用警告が表示されます。
      </p>
    </div>
  )
}

/* ───────────────────────── 結果セクション ───────────────────────── */

function ResultsSection({ recommendations, interactionResults, medKeys, currentSlugs }: {
  recommendations: Recommendation[]
  interactionResults: InteractionResult[]
  medKeys: string[]
  currentSlugs: string[]
}) {
  const platformLabel: Record<string, string> = { iherb: 'iHerb', amazon: 'Amazon', cosme: '@cosme' }

  // 推奨成分に関連する interaction のみ抽出（既存サプリ由来は別表示）
  const recSlugSet = new Set(recommendations.map((r) => r.ing.slug))
  const recInteractions = interactionResults.filter((i) => recSlugSet.has(i.ingredientSlug))
  const currentInteractions = interactionResults.filter((i) => !recSlugSet.has(i.ingredientSlug))

  return (
    <>
      <section className="mb-8">
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-[10px] font-semibold tracking-wider bg-accent text-primary-foreground
            px-2 py-0.5 rounded-md">RESULT</span>
          <h2 className="font-semibold text-[16px] text-foreground">
            あなたへの推奨 {recommendations.length} 選
          </h2>
        </div>

        {recInteractions.length > 0 && (
          <InteractionAlert
            title="推奨成分と医薬品の相互作用"
            results={recInteractions}
          />
        )}

        <div className="space-y-3">
          {recommendations.map((r, idx) => (
            <RecommendationCard
              key={r.ing.slug}
              rec={r}
              rank={idx + 1}
              platformLabel={platformLabel}
              interactions={interactionResults.filter((i) => i.ingredientSlug === r.ing.slug)}
            />
          ))}
        </div>
      </section>

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

function RecommendationCard({ rec, rank, platformLabel, interactions }: {
  rec: Recommendation
  rank: number
  platformLabel: Record<string, string>
  interactions: InteractionResult[]
}) {
  const { ing } = rec
  const topProduct = ing.products.find((p) => p.rank === 1) ?? ing.products[0]
  const { isFavorite, toggle } = useFavorite('ingredient', ing.slug)

  const hasAvoid = interactions.some((i) => i.level === 'avoid')
  const hasCaution = interactions.some((i) => i.level === 'caution')

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
            {rec.hits}悩みに対応
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
      <p className={`font-semibold text-foreground mb-1 ${rank === 1 ? 'text-[17px]' : 'text-[15px]'}`}>
        {ing.nameJa}
      </p>
      <p className="text-[12.5px] text-muted-foreground leading-relaxed line-clamp-2 mb-3">
        {ing.tagline}
      </p>

      {(rec.matchedConcerns.length > 0 || rec.lifestyleBoost.length > 0) && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {rec.matchedConcerns.slice(0, 3).map((c, i) => (
            <span key={i} className="text-[10.5px] bg-secondary text-muted-foreground rounded px-1.5 py-0.5">
              {c}
            </span>
          ))}
          {rec.lifestyleBoost.length > 0 && Array.from(new Set(rec.lifestyleBoost)).map((b, i) => (
            <span key={`lb-${i}`} className="text-[10.5px] bg-amber-50 border border-amber-100 text-amber-700 rounded px-1.5 py-0.5">
              {b}
            </span>
          ))}
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
