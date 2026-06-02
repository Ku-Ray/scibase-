'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  AlertCircle,
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronUp,
  ClipboardCopy,
  Eye,
  FileText,
  Info,
  Microscope,
  Pill,
  Plus,
  Search,
  Share2,
  Sparkles,
  Stethoscope,
  X,
} from 'lucide-react'
import {
  CANONICAL_INTERACTIONS,
  CATEGORY_LABEL,
  groupCanonicalByCategory,
  type CanonicalCategory,
  type CanonicalEntry,
} from '@/lib/interaction-canonical'
import {
  checkInteractions,
  EVIDENCE_LABEL,
  getIngredientOptions,
  getPopularMedicationOptions,
  LEVEL_LABEL,
  type IngredientOption,
  type InteractionLevel,
  type InteractionResult,
  type MedicationOption,
} from '@/lib/interaction'
import { MEDICATION_EXAMPLES, QUICK_START_SAMPLES } from '@/lib/interaction-popular'

const ANALYZER_STORAGE_KEY = 'scibase_analyzer_slugs'

/**
 * 検索クエリ・対象文字列の正規化：
 * - ひらがな → カタカナ（"あれぐら" → "アレグラ"）
 * - 全角英数 → 半角（"ＰＰＩ" → "ppi"）
 * - 全角スペース → 半角
 * - 大文字 → 小文字
 *
 * これにより「あれぐら」「ロキソニン」「ｐｐｉ」のいずれでも一致する。
 */
function normalizeForSearch(s: string): string {
  return s
    .replace(/[ぁ-ゖ]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0x60))
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (c) =>
      String.fromCharCode(c.charCodeAt(0) - 0xfee0),
    )
    .replace(/　/g, ' ')
    .toLowerCase()
    .trim()
}

const LEVEL_STYLE: Record<
  InteractionLevel,
  { bg: string; border: string; text: string; icon: typeof AlertCircle }
> = {
  avoid: { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-700', icon: AlertCircle },
  caution: { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-700', icon: AlertTriangle },
  monitor: { bg: 'bg-sky-50', border: 'border-sky-300', text: 'text-sky-700', icon: Eye },
}

export function InteractionCheckerClient() {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([])
  const [selectedMedKeys, setSelectedMedKeys] = useState<string[]>([])
  const [activePicker, setActivePicker] = useState<'supp' | 'med' | null>(null)
  const [analyzerBanner, setAnalyzerBanner] = useState<{ count: number } | null>(null)
  const [copied, setCopied] = useState(false)

  const allSuppOptions = useMemo<IngredientOption[]>(() => getIngredientOptions(), [])
  const allMedOptions = useMemo<MedicationOption[]>(
    () =>
      CANONICAL_INTERACTIONS.map((entry) => ({
        entry,
        pinnedRank: undefined,
      })),
    [],
  )
  const popularMedOptions = useMemo<MedicationOption[]>(() => getPopularMedicationOptions(), [])
  const groupedAllMeds = useMemo(() => groupCanonicalByCategory(), [])

  // ── URL state 復元（?ing=slug1,slug2 / ?med=key1,key2）
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const ing = params.get('ing')
    const med = params.get('med')
    const ingSlugs = ing
      ? ing
          .split(',')
          .map(decodeURIComponent)
          .filter((s) => allSuppOptions.some((o) => o.slug === s))
      : []
    const medKeys = med
      ? med
          .split(',')
          .map(decodeURIComponent)
          .filter((k) => allMedOptions.some((o) => o.entry.key === k))
      : []
    if (ingSlugs.length || medKeys.length) {
      setSelectedSlugs(ingSlugs)
      setSelectedMedKeys(medKeys)
      return
    }

    // URL に無ければ Analyzer の localStorage から取り込み
    try {
      const raw = window.localStorage.getItem(ANALYZER_STORAGE_KEY)
      if (!raw) return
      const slugs = JSON.parse(raw) as string[]
      const valid = Array.isArray(slugs)
        ? slugs.filter((s) => allSuppOptions.some((o) => o.slug === s))
        : []
      if (valid.length > 0) {
        setSelectedSlugs(valid)
        setAnalyzerBanner({ count: valid.length })
      }
    } catch {
      // ignore
    }
  }, [allSuppOptions, allMedOptions])

  // ── URL state 同期（shallow・履歴非追加）
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (selectedSlugs.length) params.set('ing', selectedSlugs.join(','))
    else params.delete('ing')
    if (selectedMedKeys.length) params.set('med', selectedMedKeys.join(','))
    else params.delete('med')
    const qs = params.toString()
    const url = `${window.location.pathname}${qs ? `?${qs}` : ''}`
    window.history.replaceState(null, '', url)
  }, [selectedSlugs, selectedMedKeys])

  const results = useMemo(
    () => checkInteractions(selectedSlugs, selectedMedKeys),
    [selectedSlugs, selectedMedKeys],
  )

  const grouped = useMemo(() => {
    const g: Record<InteractionLevel, InteractionResult[]> = { avoid: [], caution: [], monitor: [] }
    for (const r of results) g[r.level].push(r)
    return g
  }, [results])

  const hasInput = selectedSlugs.length > 0
  const noFindings = hasInput && results.length === 0

  // ── 結果コピー（医師相談用テキスト）
  const handleCopyResults = useCallback(async () => {
    const lines: string[] = []
    lines.push(`SciBase 飲み合わせチェック結果（${new Date().toLocaleDateString('ja-JP')}）`)
    lines.push('')
    if (selectedSlugs.length) {
      const names = selectedSlugs
        .map((s) => allSuppOptions.find((o) => o.slug === s)?.nameJa ?? s)
        .join('・')
      lines.push(`【入力サプリ】${names}`)
    }
    if (selectedMedKeys.length) {
      lines.push(`【入力医薬品】${selectedMedKeys.join('・')}`)
    }
    lines.push('')
    if (results.length === 0) {
      lines.push('該当する相互作用：なし（SciBase data.ts 収載範囲）')
    } else {
      for (const r of results) {
        lines.push(`[${LEVEL_LABEL[r.level]}] ${r.ingredientNameJa} × ${r.substance}`)
        lines.push(`  機序：${r.mechanism}`)
        lines.push(`  推奨行動：${r.action}`)
        lines.push(`  エビデンス：${EVIDENCE_LABEL[r.evidence]}${r.source ? ` / 出典：${r.source}` : ''}`)
        lines.push('')
      }
    }
    lines.push('※ 本結果は情報提供のみを目的としています。最終判断は必ず医師・薬剤師にご相談ください。')
    lines.push(`元 URL：${window.location.href}`)
    try {
      await navigator.clipboard.writeText(lines.join('\n'))
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // 古い browser fallback：エラー時は無視
    }
  }, [allSuppOptions, results, selectedMedKeys, selectedSlugs])

  // ── シェア
  const handleShare = useCallback(async () => {
    const url = window.location.href
    const text = 'サプリと薬の飲み合わせをチェックしました'
    if (navigator.share) {
      try {
        await navigator.share({ title: 'SciBase 飲み合わせチェッカー', text, url })
        return
      } catch {
        // user cancel - fall through to clipboard fallback
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // ignore
    }
  }, [])

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      {/* ── ヒーロー ─────────────────── */}
      <header className="mb-6 sm:mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          <Microscope className="size-4" />
          論文・添付文書ベース
        </div>
        <h1 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
          サプリ・薬の飲み合わせチェッカー
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          飲んでいるサプリと服用中の医薬品を入力すると、論文・添付文書ベースで相互作用の可能性を
          「要回避・要注意・経過観察」の 3 段階で可視化します。完全無料・登録不要・所要 30 秒。
        </p>

        {/* 差別化バッジ（R8） */}
        <ul className="mt-4 flex flex-wrap gap-2 text-xs">
          <li className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-emerald-800">
            <FileText className="size-3" />
            論文・添付文書出典明記
          </li>
          <li className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-blue-800">
            <Stethoscope className="size-3" />
            日本の医薬品名で検索可能
          </li>
          <li className="inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-violet-800">
            <Sparkles className="size-3" />
            完全無料・登録不要
          </li>
        </ul>
      </header>

      {/* ── Analyzer 連携 banner（R4） ─────── */}
      {analyzerBanner && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50/70 px-3 py-2 text-sm text-emerald-900">
          <Check className="size-4 shrink-0" />
          <span>
            Analyzer のスタックから <strong>{analyzerBanner.count} 件</strong> のサプリを読み込みました
          </span>
          <button
            type="button"
            onClick={() => setAnalyzerBanner(null)}
            aria-label="閉じる"
            className="ml-auto text-emerald-700 hover:text-emerald-900"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* ── 入力エリア ─────────────────── */}
      <section className="mb-6 grid gap-4 sm:grid-cols-2">
        {/* サプリ */}
        <div className="rounded-xl border bg-card p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Pill className="size-4 text-emerald-600" />
            飲んでいるサプリ・成分
            <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
              {selectedSlugs.length}
            </span>
          </div>

          {selectedSlugs.length > 0 && (
            <ul className="mb-3 flex flex-wrap gap-2">
              {selectedSlugs.map((slug) => {
                const opt = allSuppOptions.find((o) => o.slug === slug)
                if (!opt) return null
                return (
                  <li key={slug}>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedSlugs((arr) => arr.filter((s) => s !== slug))
                      }
                      className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 hover:bg-emerald-200"
                    >
                      {opt.nameJa}
                      <X className="size-3" />
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          <button
            type="button"
            onClick={() => setActivePicker('supp')}
            className="inline-flex w-full items-center justify-center gap-1 rounded-md border border-dashed px-3 py-2.5 text-sm text-muted-foreground hover:border-foreground hover:bg-accent hover:text-foreground"
          >
            <Plus className="size-4" />
            サプリを追加
          </button>
        </div>

        {/* 医薬品 */}
        <div className="rounded-xl border bg-card p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <AlertCircle className="size-4 text-rose-600" />
            服用中の医薬品（任意）
            <span className="ml-auto rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-800">
              {selectedMedKeys.length}
            </span>
          </div>

          {selectedMedKeys.length > 0 && (
            <ul className="mb-3 flex flex-wrap gap-2">
              {selectedMedKeys.map((key) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedMedKeys((arr) => arr.filter((k) => k !== key))
                    }
                    className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-800 hover:bg-rose-200"
                  >
                    {key}
                    <X className="size-3" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            onClick={() => setActivePicker('med')}
            className="inline-flex w-full items-center justify-center gap-1 rounded-md border border-dashed px-3 py-2.5 text-sm text-muted-foreground hover:border-foreground hover:bg-accent hover:text-foreground"
          >
            <Plus className="size-4" />
            医薬品を追加
          </button>
        </div>
      </section>

      {/* ── 結果 ─────────────────── */}
      <section aria-label="チェック結果" className="space-y-6">
        {!hasInput && (
          <EmptyStateQuickStart
            onApply={(ing, med) => {
              setSelectedSlugs(ing)
              setSelectedMedKeys(med)
            }}
          />
        )}

        {noFindings && (
          <div className="rounded-xl border bg-emerald-50/50 p-5">
            <div className="mb-1 flex items-center gap-2 font-semibold text-emerald-800">
              <Check className="size-5" />
              該当する相互作用は見つかりませんでした
            </div>
            <p className="text-sm leading-relaxed text-emerald-900/80">
              ただし本ツールが捕捉できるのは SciBase data.ts に収載済みの成分・物質の組み合わせのみです。
              未収載の物質や個別体質による相互作用の可能性は残ります。実際の併用前は医師・薬剤師にご相談ください。
            </p>
          </div>
        )}

        {(['avoid', 'caution', 'monitor'] as InteractionLevel[]).map((lvl) => {
          const items = grouped[lvl]
          if (items.length === 0) return null
          const style = LEVEL_STYLE[lvl]
          const Icon = style.icon
          return (
            <div
              key={lvl}
              className={`rounded-xl border ${style.border} ${style.bg} p-4 sm:p-5`}
            >
              <div className={`mb-3 flex items-center gap-2 font-semibold ${style.text}`}>
                <Icon className="size-5" />
                <span>{LEVEL_LABEL[lvl]}</span>
                <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs">
                  {items.length} 件
                </span>
              </div>
              <ul className="space-y-3">
                {items.map((r, i) => (
                  <li
                    key={`${r.ingredientSlug}-${r.substance}-${i}`}
                    className="rounded-lg bg-white/95 p-3 sm:p-4"
                  >
                    <div className="mb-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
                      <Link
                        href={`/ingredients/${r.ingredientSlug}`}
                        className="font-semibold underline-offset-2 hover:underline"
                      >
                        {r.ingredientNameJa}
                      </Link>
                      <span className="text-muted-foreground">×</span>
                      <span className="font-medium">{r.substance}</span>
                    </div>
                    <p className="mb-2 text-sm leading-relaxed text-foreground/90">{r.mechanism}</p>
                    <p className="mb-2 text-sm leading-relaxed font-medium">
                      推奨行動：{r.action}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span>エビデンス：{EVIDENCE_LABEL[r.evidence]}</span>
                      {r.source && <span>出典：{r.source}</span>}
                      <Link
                        href={`/ingredients/${r.ingredientSlug}`}
                        className="ml-auto inline-flex items-center gap-0.5 underline-offset-2 hover:underline"
                      >
                        {r.ingredientNameJa} の詳細
                        <ChevronDown className="size-3 -rotate-90" />
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}

        {/* ── 結果アクション ─── */}
        {results.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleCopyResults}
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background hover:bg-foreground/90"
            >
              {copied ? <Check className="size-4" /> : <ClipboardCopy className="size-4" />}
              {copied ? 'コピーしました' : '結果をコピーして医師相談に持参'}
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              <Share2 className="size-4" />
              この組み合わせをシェア
            </button>
          </div>
        )}
      </section>

      {/* ── 免責 ─────────────────── */}
      <aside className="mt-10 rounded-xl border-2 border-amber-200 bg-amber-50/60 p-4 sm:p-5">
        <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-900">
          <AlertTriangle className="size-4" />
          ご注意・免責
        </h2>
        <ul className="space-y-1 text-xs leading-relaxed text-amber-900/90 sm:text-sm">
          <li>・本ツールは情報提供を目的としており、医療判断の代替にはなりません。</li>
          <li>・「該当なし」と表示された場合でも、未収載物質や個別体質による相互作用の可能性は残ります。</li>
          <li>・サプリの開始・中止、医薬品との併用の判断は、必ず主治医・薬剤師にご相談ください。</li>
          <li>・緊急の症状がある場合は速やかに医療機関を受診してください。</li>
        </ul>
      </aside>

      {/* ── FAQ（SEO・feature snippet 狙い）─── */}
      <FaqSection />

      {/* ── Picker Modal（mobile）/ Picker Overlay（desktop） ─── */}
      {activePicker === 'supp' && (
        <SupplementPicker
          allOptions={allSuppOptions}
          selectedSlugs={selectedSlugs}
          onSelect={(slug) => {
            setSelectedSlugs((arr) => (arr.includes(slug) ? arr : [...arr, slug]))
          }}
          onClose={() => setActivePicker(null)}
        />
      )}
      {activePicker === 'med' && (
        <MedicationPicker
          popularOptions={popularMedOptions}
          allOptions={allMedOptions}
          groupedAll={groupedAllMeds}
          selectedKeys={selectedMedKeys}
          onSelect={(key) => {
            setSelectedMedKeys((arr) => (arr.includes(key) ? arr : [...arr, key]))
          }}
          onClose={() => setActivePicker(null)}
        />
      )}
    </div>
  )
}

// ============================================================================
// EmptyStateQuickStart（R9）
// ============================================================================

interface QuickStartProps {
  onApply: (slugs: string[], medKeys: string[]) => void
}

function EmptyStateQuickStart({ onApply }: QuickStartProps) {
  return (
    <div className="rounded-xl border border-dashed bg-muted/30 p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Info className="size-4" />
        上の欄からサプリを選ぶか、人気の組合せを試す：
      </div>
      <ul className="grid gap-2 sm:grid-cols-3">
        {QUICK_START_SAMPLES.map((q) => (
          <li key={q.label}>
            <button
              type="button"
              onClick={() => onApply([...q.ingredientSlugs], [...q.medicationKeys])}
              className="flex h-full w-full flex-col gap-1 rounded-lg border bg-background p-3 text-left hover:border-foreground hover:bg-accent"
            >
              <span className="text-sm font-semibold">{q.label}</span>
              <span className="text-xs text-muted-foreground">{q.why}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ============================================================================
// SupplementPicker（R1・R2・R5）
// ============================================================================

interface SupplementPickerProps {
  allOptions: IngredientOption[]
  selectedSlugs: string[]
  onSelect: (slug: string) => void
  onClose: () => void
}

function SupplementPicker({ allOptions, selectedSlugs, onSelect, onClose }: SupplementPickerProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const filtered = useMemo(() => {
    const q = normalizeForSearch(query)
    const candidates = allOptions.filter((o) => !selectedSlugs.includes(o.slug))
    if (!q) {
      // default: popular のみ
      return candidates.filter((o) => o.popularRank !== undefined).slice(0, 40)
    }
    return candidates
      .filter((o) => {
        const name = normalizeForSearch(o.nameJa)
        const slug = normalizeForSearch(o.slug)
        return name.includes(q) || slug.includes(q)
      })
      .slice(0, 60)
  }, [allOptions, selectedSlugs, query])

  return (
    <PickerOverlay onClose={onClose} title="サプリを追加" inputRef={inputRef}>
      <div className="border-b bg-background px-3 py-2">
        <div className="flex items-center gap-2">
          <Search className="size-4 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ビタミンC・亜鉛・アシュワガンダ…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="クリア"
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {!query && (
        <div className="bg-muted/40 px-3 py-1 text-xs font-semibold text-muted-foreground">
          よく飲まれているサプリ（人気順）
        </div>
      )}

      <ul className="divide-y" role="listbox" aria-label="サプリ候補">
        {filtered.length === 0 ? (
          <li className="px-3 py-4 text-center text-sm text-muted-foreground">該当なし</li>
        ) : (
          filtered.map((o) => (
            <li key={o.slug}>
              <button
                type="button"
                onClick={() => {
                  onSelect(o.slug)
                  setQuery('')
                }}
                className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm hover:bg-accent"
              >
                <span>
                  {o.nameJa}
                  {o.popularRank !== undefined && o.popularRank < 10 && (
                    <span className="ml-1.5 inline-flex items-center text-[10px] text-amber-600">
                      <Sparkles className="size-3" />
                    </span>
                  )}
                </span>
                <Plus className="size-4 text-muted-foreground" />
              </button>
            </li>
          ))
        )}
      </ul>
    </PickerOverlay>
  )
}

// ============================================================================
// MedicationPicker（R3・R5）
// ============================================================================

interface MedicationPickerProps {
  popularOptions: MedicationOption[]
  allOptions: MedicationOption[]
  groupedAll: Record<CanonicalCategory, CanonicalEntry[]>
  selectedKeys: string[]
  onSelect: (key: string) => void
  onClose: () => void
}

function MedicationPicker({
  popularOptions,
  allOptions,
  groupedAll,
  selectedKeys,
  onSelect,
  onClose,
}: MedicationPickerProps) {
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const filtered = useMemo(() => {
    const q = normalizeForSearch(query)
    if (!q) return null
    return allOptions
      .filter((o) => !selectedKeys.includes(o.entry.key))
      .filter((o) => {
        const key = normalizeForSearch(o.entry.key)
        const example = normalizeForSearch(MEDICATION_EXAMPLES[o.entry.key] ?? '')
        return key.includes(q) || example.includes(q)
      })
      .slice(0, 60)
  }, [allOptions, selectedKeys, query])

  return (
    <PickerOverlay onClose={onClose} title="医薬品を追加" inputRef={inputRef}>
      <div className="border-b bg-background px-3 py-2">
        <div className="flex items-center gap-2">
          <Search className="size-4 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ワルファリン・降圧薬・SSRI…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="クリア"
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* 検索結果 */}
      {filtered !== null ? (
        <ul className="divide-y" role="listbox" aria-label="医薬品候補">
          {filtered.length === 0 ? (
            <li className="px-3 py-4 text-center text-sm text-muted-foreground">該当なし</li>
          ) : (
            filtered.map(({ entry }) => (
              <li key={entry.key}>
                <MedicationButton
                  entry={entry}
                  onClick={() => {
                    onSelect(entry.key)
                    setQuery('')
                  }}
                />
              </li>
            ))
          )}
        </ul>
      ) : (
        <>
          {/* 主要医薬品 25 件 pin */}
          <div className="bg-muted/40 px-3 py-1 text-xs font-semibold text-muted-foreground">
            よく処方される主要医薬品
          </div>
          <ul className="divide-y" role="listbox" aria-label="主要医薬品">
            {popularOptions
              .filter(({ entry }) => !selectedKeys.includes(entry.key))
              .map(({ entry }) => (
                <li key={entry.key}>
                  <MedicationButton entry={entry} onClick={() => onSelect(entry.key)} />
                </li>
              ))}
          </ul>

          {/* すべての医薬品クラス展開 */}
          <button
            type="button"
            onClick={() => setShowAll((s) => !s)}
            className="flex w-full items-center justify-center gap-1 border-t bg-muted/30 px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-accent"
          >
            {showAll ? (
              <>
                すべて閉じる <ChevronUp className="size-3" />
              </>
            ) : (
              <>
                すべての医薬品クラスを表示（{allOptions.length} 件） <ChevronDown className="size-3" />
              </>
            )}
          </button>

          {showAll && (
            <div>
              {(Object.entries(groupedAll) as [CanonicalCategory, CanonicalEntry[]][])
                .filter(([, entries]) => entries.length > 0)
                .map(([cat, entries]) => (
                  <div key={cat}>
                    <div className="bg-muted/40 px-3 py-1 text-xs font-semibold text-muted-foreground">
                      {CATEGORY_LABEL[cat]}
                    </div>
                    <ul className="divide-y">
                      {entries
                        .filter((e) => !selectedKeys.includes(e.key))
                        .map((e) => (
                          <li key={e.key}>
                            <MedicationButton entry={e} onClick={() => onSelect(e.key)} />
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
            </div>
          )}
        </>
      )}
    </PickerOverlay>
  )
}

function MedicationButton({ entry, onClick }: { entry: CanonicalEntry; onClick: () => void }) {
  const example = MEDICATION_EXAMPLES[entry.key]
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-start justify-between gap-2 px-3 py-2.5 text-left hover:bg-accent"
    >
      <div className="flex-1">
        <div className="text-sm font-medium">{entry.key}</div>
        {example && <div className="text-xs text-muted-foreground">{example}</div>}
      </div>
      <Plus className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
    </button>
  )
}

// ============================================================================
// PickerOverlay（R5 mobile full-screen / desktop drop overlay）
// ============================================================================

interface PickerOverlayProps {
  title: string
  onClose: () => void
  inputRef: React.RefObject<HTMLInputElement | null>
  children: React.ReactNode
}

function PickerOverlay({ title, onClose, children }: PickerOverlayProps) {
  // body scroll lock
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = original
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/40 backdrop-blur-[2px] sm:py-12"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full flex-col bg-background shadow-xl sm:h-auto sm:max-h-[80vh] sm:w-full sm:max-w-md sm:rounded-xl"
      >
        <header className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-sm font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="閉じる"
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}

// ============================================================================
// FaqSection（R10 SEO・feature snippet）
// ============================================================================

const FAQS: { q: string; a: string }[] = [
  {
    q: 'サプリと薬の飲み合わせはどうやってチェックされますか？',
    a: 'SciBase に収載された 500 成分超の data.ts の `interactions[]` フィールド（添付文書・NCCIH・Cochrane など）と、147 件の主要医薬品クラス（canonical）の正規表現マッチングで該当する組合せを抽出しています。出典は各結果カードに明記されます。',
  },
  {
    q: '「要回避」と表示されたら飲んでいるサプリをやめるべきですか？',
    a: '本ツールは情報提供を目的としており、自己判断での中止は推奨できません。「要回避」は重大なリスクが報告されているケースで、結果を主治医・薬剤師に共有して併用継続の可否を判断してもらうのが最も安全です。',
  },
  {
    q: 'ワルファリンを飲んでいます。ビタミン K2 サプリは併用できますか？',
    a: 'ビタミン K はワルファリンの抗凝固作用を打ち消す方向に働くことが添付文書で広く知られています。SciBase でも該当成分は「要回避」レベルで表示されます。納豆・青汁などビタミン K を多く含む食品と同じ扱いになるため、主治医に必ず相談してください。',
  },
  {
    q: '降圧薬を飲んでいますが、マグネシウムや CoQ10 は大丈夫ですか？',
    a: '降圧薬とマグネシウム・CoQ10 は理論上の血圧降下作用を持つため「経過観察」レベルで表示されることがあります。著しい血圧低下のリスクを避けるため、開始時は血圧モニタリングを強化し、主治医に伝えるのが安全です。',
  },
  {
    q: 'このツールに登録されていない医薬品はどうすればよいですか？',
    a: '主要 147 クラス（降圧薬・糖尿病治療薬・抗凝固薬等）でカバーされていない物質は、該当する一般名・分類で検索してみてください。それでも見つからない場合は、添付文書「相互作用」セクションの確認と薬剤師への直接相談を推奨します。',
  },
]

function FaqSection() {
  return (
    <section className="mt-10" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="mb-4 text-lg font-semibold">
        よくある質問
      </h2>
      <ul className="space-y-2">
        {FAQS.map((f) => (
          <li key={f.q}>
            <details className="group rounded-lg border bg-card">
              <summary className="flex cursor-pointer items-center justify-between gap-2 px-4 py-3 text-sm font-medium">
                <span>{f.q}</span>
                <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="border-t px-4 py-3 text-sm leading-relaxed text-foreground/85">{f.a}</p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  )
}
