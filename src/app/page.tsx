import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { concerns, ingredients } from '@/lib/data'
import { IngredientCard } from '@/components/IngredientCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agescience — サプリの「本当に効く」を、論文で確かめる',
}

export default function Home() {
  const topIngredients = [...ingredients]
    .sort((a, b) => ({ S: 0, A: 1, B: 2, C: 3 }[a.evidenceRank] - { S: 0, A: 1, B: 2, C: 3 }[b.evidenceRank]))
    .slice(0, 6)

  return (
    <div>

      {/* ───────── Hero ───────── */}
      <section style={{ background: 'var(--bg-base)' }} className="px-5 pt-16 pb-14 sm:pt-20 sm:pb-18">
        <div className="max-w-2xl mx-auto text-center">

          {/* Label */}
          <p style={{ color: 'var(--text-tertiary)', letterSpacing: '0.08em' }}
            className="text-[11px] font-medium uppercase mb-6">
            論文ベース・サプリ推薦データベース
          </p>

          {/* H1 */}
          <h1 style={{ color: 'var(--text-primary)', lineHeight: 1.2 }}
            className="text-[36px] sm:text-[48px] font-bold tracking-tight mb-5">
            サプリの「本当に効く」を、<br />
            論文で確かめる。
          </h1>

          {/* Sub */}
          <p style={{ color: 'var(--text-secondary)' }}
            className="text-[15px] sm:text-[16px] leading-relaxed max-w-lg mx-auto mb-10">
            メーカーの宣伝ではなく、査読済み論文のエビデンスで成分を評価。
            気になる悩みを選ぶだけで、科学的根拠のある推薦が分かります。
          </p>

          {/* 悩みタグ */}
          <div>
            <p style={{ color: 'var(--text-tertiary)' }} className="text-[13px] mb-3">
              気になる悩みを選ぶ
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {concerns.map((c) => (
                <Link key={c.slug} href={`/concerns/${c.slug}`}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                  }}
                  className="group inline-flex items-center gap-1.5 rounded-full px-4 py-2
                    text-[13px] font-medium hover:border-[var(--accent)]
                    hover:text-[var(--accent)] hover:bg-[var(--accent-light)]
                    transition-all duration-150">
                  {c.nameJa}
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── How it works ───────── */}
      <section style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-card)' }}
        className="px-5 py-14">
        <div className="max-w-3xl mx-auto">
          <p style={{ color: 'var(--text-tertiary)', letterSpacing: '0.08em' }}
            className="text-[11px] font-medium uppercase text-center mb-10">
            How it works
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: '悩みを選ぶ',
                desc: '肌の老化・睡眠・疲れなど、気になる悩みのタグをタップするだけ。',
              },
              {
                step: '02',
                title: '論文で比較する',
                desc: 'その悩みに関連するエビデンスが確認されている成分を、研究の質順に表示。',
              },
              {
                step: '03',
                title: '信頼できる商品を選ぶ',
                desc: '論文が示す有効量・摂取タイミングに基づいたおすすめ商品を紹介。',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col">
                <span style={{ color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}
                  className="text-[13px] font-bold mb-3 font-mono">
                  {step}
                </span>
                <h3 style={{ color: 'var(--text-primary)' }}
                  className="font-semibold text-[16px] mb-2">
                  {title}
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}
                  className="text-[14px] leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 悩みカテゴリ ───────── */}
      <section className="px-5 py-14">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-baseline justify-between mb-8">
            <h2 style={{ color: 'var(--text-primary)' }}
              className="font-semibold text-[20px]">
              悩みから探す
            </h2>
            <Link href="/concerns"
              style={{ color: 'var(--accent)' }}
              className="text-[13px] flex items-center gap-1 hover:underline">
              すべて見る <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {concerns.map((c) => (
              <Link key={c.slug} href={`/concerns/${c.slug}`}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                className="group rounded-xl px-4 py-4 hover:border-[var(--accent)]
                  hover:shadow-sm transition-all duration-150">
                <p style={{ color: 'var(--text-primary)' }}
                  className="font-medium text-[14px] group-hover:text-[var(--accent)] transition-colors mb-1">
                  {c.nameJa}
                </p>
                <p style={{ color: 'var(--text-tertiary)' }} className="text-[12px]">
                  {c.ingredientSlugs.length}成分
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 人気成分 ───────── */}
      <section style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-card)' }}
        className="px-5 py-14">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-baseline justify-between mb-3">
            <h2 style={{ color: 'var(--text-primary)' }}
              className="font-semibold text-[20px]">
              エビデンスが確認されている成分
            </h2>
            <Link href="/ingredients"
              style={{ color: 'var(--accent)' }}
              className="text-[13px] flex items-center gap-1 hover:underline">
              すべて見る <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p style={{ color: 'var(--text-tertiary)' }} className="text-[13px] mb-8">
            メタ解析・RCTで効果が確認されている成分を優先表示
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {topIngredients.map((ing, i) => (
              <IngredientCard key={ing.slug} ingredient={ing} rank={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Trust section ───────── */}
      <section className="px-5 py-14">
        <div className="max-w-3xl mx-auto">
          <p style={{ color: 'var(--text-tertiary)', letterSpacing: '0.08em' }}
            className="text-[11px] font-medium uppercase text-center mb-10">
            Why Agescience
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: '📄',
                title: '根拠は論文だけ',
                desc: 'メーカーの自社試験は使わない。査読済み論文のみを根拠にし、研究の質（S/A/B/C）を全成分で透明に示します。',
              },
              {
                icon: '✗',
                title: '「効かない」も正直に',
                desc: 'NMNなど話題の成分も「動物実験では有望だがヒトRCTなし」と正直に表示。バズっているかどうかで評価しません。',
              },
              {
                icon: '→',
                title: '悩みから3ステップ',
                desc: '「何を飲めばいいか分からない」を解消するため、悩みタグ → 成分比較 → 商品推薦の流れをシンプルに設計。',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title}>
                <span className="text-2xl mb-4 block">{icon}</span>
                <h3 style={{ color: 'var(--text-primary)' }}
                  className="font-semibold text-[16px] mb-2">
                  {title}
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}
                  className="text-[14px] leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
