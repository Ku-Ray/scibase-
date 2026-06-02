'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  AlertCircle,
  AlertTriangle,
  ChevronDown,
  Eye,
  Microscope,
  Pill,
  Plus,
  Search,
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
  getIngredientOptions,
  EVIDENCE_LABEL,
  LEVEL_LABEL,
  type InteractionLevel,
  type InteractionResult,
} from '@/lib/interaction'

const SUPP_STORAGE_KEY = 'scibase_analyzer_slugs'

const LEVEL_STYLE: Record<
  InteractionLevel,
  { bg: string; border: string; text: string; icon: typeof AlertCircle; label: string }
> = {
  avoid: {
    bg: 'bg-red-50',
    border: 'border-red-300',
    text: 'text-red-700',
    icon: AlertCircle,
    label: '要回避',
  },
  caution: {
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    text: 'text-amber-700',
    icon: AlertTriangle,
    label: '要注意',
  },
  monitor: {
    bg: 'bg-sky-50',
    border: 'border-sky-300',
    text: 'text-sky-700',
    icon: Eye,
    label: '経過観察',
  },
}

interface IngredientOption {
  slug: string
  nameJa: string
}

export function InteractionCheckerClient() {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([])
  const [selectedMedKeys, setSelectedMedKeys] = useState<string[]>([])
  const [showSuppPicker, setShowSuppPicker] = useState(false)
  const [showMedPicker, setShowMedPicker] = useState(false)
  const [suppQuery, setSuppQuery] = useState('')
  const [medQuery, setMedQuery] = useState('')

  const allSuppOptions = useMemo<IngredientOption[]>(() => getIngredientOptions(), [])
  const allMedOptions = useMemo<CanonicalEntry[]>(() => CANONICAL_INTERACTIONS, [])
  const groupedMeds = useMemo(() => groupCanonicalByCategory(), [])

  // localStorage の analyzer 連携：起動時に保存済 slug を読み込む
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SUPP_STORAGE_KEY)
      if (!raw) return
      const slugs = JSON.parse(raw) as string[]
      if (Array.isArray(slugs)) {
        setSelectedSlugs(slugs.filter((s) => allSuppOptions.some((o) => o.slug === s)))
      }
    } catch {
      // ignore
    }
  }, [allSuppOptions])

  const filteredSupps = useMemo(() => {
    const q = suppQuery.trim().toLowerCase()
    return allSuppOptions
      .filter((o) => !selectedSlugs.includes(o.slug))
      .filter((o) => !q || o.nameJa.toLowerCase().includes(q) || o.slug.includes(q))
      .slice(0, 30)
  }, [allSuppOptions, selectedSlugs, suppQuery])

  const filteredMeds = useMemo(() => {
    const q = medQuery.trim().toLowerCase()
    if (!q) return null // null = グループ表示
    return allMedOptions
      .filter((o) => !selectedMedKeys.includes(o.key))
      .filter((o) => o.key.toLowerCase().includes(q))
      .slice(0, 30)
  }, [allMedOptions, selectedMedKeys, medQuery])

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

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      {/* ヒーロー */}
      <header className="mb-8 sm:mb-10">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          <Microscope className="size-4" />
          論文ベースの相互作用チェック
        </div>
        <h1 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
          サプリ・薬の飲み合わせチェッカー
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          飲んでいるサプリと服用中の医薬品を入力すると、論文・添付文書ベースで相互作用の可能性を抽出します。
          すべての結果は情報提供であり、実際の併用判断は医師・薬剤師にご相談ください。
        </p>
      </header>

      {/* 入力エリア */}
      <section className="mb-8 grid gap-6 sm:grid-cols-2">
        {/* サプリ */}
        <div className="rounded-xl border bg-card p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Pill className="size-4 text-emerald-600" />
            飲んでいるサプリ・成分
            <span className="ml-auto text-xs font-normal text-muted-foreground">
              {selectedSlugs.length} 件
            </span>
          </div>

          {/* 選択中タグ */}
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

          {/* 追加 trigger */}
          {!showSuppPicker ? (
            <button
              type="button"
              onClick={() => setShowSuppPicker(true)}
              className="inline-flex items-center gap-1 rounded-md border border-dashed px-3 py-2 text-sm text-muted-foreground hover:border-foreground hover:text-foreground"
            >
              <Plus className="size-4" />
              サプリを追加
            </button>
          ) : (
            <PickerInline
              query={suppQuery}
              onQueryChange={setSuppQuery}
              placeholder="ビタミンC・亜鉛・アシュワガンダ..."
              onClose={() => {
                setShowSuppPicker(false)
                setSuppQuery('')
              }}
            >
              {filteredSupps.length === 0 ? (
                <li className="px-3 py-2 text-sm text-muted-foreground">該当なし</li>
              ) : (
                filteredSupps.map((o) => (
                  <li key={o.slug}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSlugs((arr) => [...arr, o.slug])
                        setSuppQuery('')
                      }}
                      className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-accent"
                    >
                      <span>{o.nameJa}</span>
                      <Plus className="size-4 text-muted-foreground" />
                    </button>
                  </li>
                ))
              )}
            </PickerInline>
          )}
        </div>

        {/* 医薬品 */}
        <div className="rounded-xl border bg-card p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <AlertCircle className="size-4 text-rose-600" />
            服用中の医薬品（任意）
            <span className="ml-auto text-xs font-normal text-muted-foreground">
              {selectedMedKeys.length} 件
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

          {!showMedPicker ? (
            <button
              type="button"
              onClick={() => setShowMedPicker(true)}
              className="inline-flex items-center gap-1 rounded-md border border-dashed px-3 py-2 text-sm text-muted-foreground hover:border-foreground hover:text-foreground"
            >
              <Plus className="size-4" />
              医薬品を追加
            </button>
          ) : (
            <PickerInline
              query={medQuery}
              onQueryChange={setMedQuery}
              placeholder="ワルファリン・降圧薬・SSRI..."
              onClose={() => {
                setShowMedPicker(false)
                setMedQuery('')
              }}
            >
              {filteredMeds === null ? (
                // グループ表示
                (Object.entries(groupedMeds) as [CanonicalCategory, CanonicalEntry[]][])
                  .filter(([, entries]) => entries.length > 0)
                  .map(([cat, entries]) => (
                    <li key={cat}>
                      <div className="bg-muted/50 px-3 py-1 text-xs font-semibold text-muted-foreground">
                        {CATEGORY_LABEL[cat]}
                      </div>
                      <ul>
                        {entries.map((e) =>
                          selectedMedKeys.includes(e.key) ? null : (
                            <li key={e.key}>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedMedKeys((arr) => [...arr, e.key])
                                }}
                                className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-accent"
                              >
                                <span>{e.key}</span>
                                <Plus className="size-4 text-muted-foreground" />
                              </button>
                            </li>
                          ),
                        )}
                      </ul>
                    </li>
                  ))
              ) : filteredMeds.length === 0 ? (
                <li className="px-3 py-2 text-sm text-muted-foreground">該当なし</li>
              ) : (
                filteredMeds.map((e) => (
                  <li key={e.key}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMedKeys((arr) => [...arr, e.key])
                        setMedQuery('')
                      }}
                      className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-accent"
                    >
                      <span>
                        {e.key}
                        <span className="ml-2 text-xs text-muted-foreground">
                          {CATEGORY_LABEL[e.category]}
                        </span>
                      </span>
                      <Plus className="size-4 text-muted-foreground" />
                    </button>
                  </li>
                ))
              )}
            </PickerInline>
          )}
        </div>
      </section>

      {/* 結果 */}
      <section aria-label="チェック結果" className="space-y-6">
        {!hasInput && (
          <div className="rounded-xl border border-dashed bg-muted/30 p-6 text-center text-sm text-muted-foreground">
            上の欄からサプリを追加すると、相互作用の有無がここに表示されます。
          </div>
        )}

        {noFindings && (
          <div className="rounded-xl border bg-emerald-50/50 p-6">
            <div className="mb-1 flex items-center gap-2 font-semibold text-emerald-800">
              <span aria-hidden>✓</span>
              選択した組み合わせで該当する相互作用は見つかりませんでした
            </div>
            <p className="text-sm leading-relaxed text-emerald-900/80">
              ただし本ツールが捕捉できるのは data.ts に収載済みの成分・物質の組み合わせのみです。
              実際の併用前には必ず医師・薬剤師にご相談ください。
            </p>
          </div>
        )}

        {(['avoid', 'caution', 'monitor'] as InteractionLevel[]).map((lvl) => {
          const items = grouped[lvl]
          if (items.length === 0) return null
          const style = LEVEL_STYLE[lvl]
          const Icon = style.icon
          return (
            <div key={lvl} className={`rounded-xl border ${style.border} ${style.bg} p-4 sm:p-5`}>
              <div className={`mb-3 flex items-center gap-2 font-semibold ${style.text}`}>
                <Icon className="size-5" />
                <span>{LEVEL_LABEL[lvl]}</span>
                <span className="rounded-full bg-white/70 px-2 py-0.5 text-xs">
                  {items.length} 件
                </span>
              </div>
              <ul className="space-y-3">
                {items.map((r, i) => (
                  <li
                    key={`${r.ingredientSlug}-${r.substance}-${i}`}
                    className="rounded-lg bg-white/90 p-3 sm:p-4"
                  >
                    <div className="mb-1 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
                      <Link
                        href={`/ingredients/${r.ingredientSlug}`}
                        className="font-semibold underline-offset-2 hover:underline"
                      >
                        {r.ingredientNameJa}
                      </Link>
                      <span className="text-muted-foreground">×</span>
                      <span className="font-medium">{r.substance}</span>
                    </div>
                    <p className="mb-2 text-sm leading-relaxed text-foreground/90">
                      {r.mechanism}
                    </p>
                    <p className="mb-2 text-sm leading-relaxed font-medium">
                      推奨行動：{r.action}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span>エビデンス：{EVIDENCE_LABEL[r.evidence]}</span>
                      {r.source && <span>出典：{r.source}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </section>

      {/* 免責 */}
      <aside className="mt-10 rounded-xl border-2 border-amber-200 bg-amber-50/60 p-4 sm:p-5">
        <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-900">
          <AlertTriangle className="size-4" />
          ご注意・免責
        </h2>
        <ul className="space-y-1 text-xs leading-relaxed text-amber-900/90 sm:text-sm">
          <li>・本ツールは情報提供を目的としており、医療判断の代替にはなりません。</li>
          <li>
            ・「該当なし」と表示された場合でも、未収載の物質や個別の体質による相互作用の可能性はあります。
          </li>
          <li>
            ・サプリの開始・中止、医薬品との併用の判断は、必ず主治医・薬剤師にご相談ください。
          </li>
          <li>・緊急の症状がある場合は速やかに医療機関を受診してください。</li>
        </ul>
      </aside>
    </div>
  )
}

// ---------------------------------------------------------------------------
// PickerInline: シンプルな inline 検索 + 候補リスト
// ---------------------------------------------------------------------------

interface PickerProps {
  query: string
  onQueryChange: (q: string) => void
  placeholder: string
  onClose: () => void
  children: React.ReactNode
}

function PickerInline({ query, onQueryChange, placeholder, onClose, children }: PickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="rounded-md border bg-background shadow-sm">
      <div className="flex items-center gap-2 border-b px-2 py-1.5">
        <Search className="size-4 text-muted-foreground" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="閉じる"
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      </div>
      <ul className="max-h-72 overflow-y-auto py-1">{children}</ul>
    </div>
  )
}
