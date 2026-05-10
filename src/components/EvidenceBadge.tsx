import type { EvidenceRank } from '@/lib/types'

interface Config {
  label:       string
  human:       string
  solid:       string
  light:       string
  bar:         string
  /* 詳細情報 */
  studyType:   string   // 研究種別
  reliability: string   // 信頼性の説明
  expectation: string   // どの程度効果を期待できるか
  limitation:  string   // 限界・注意点
  action:      string   // ユーザーへの推奨アクション
}

const config: Record<EvidenceRank, Config> = {
  S: {
    label:       'S',
    human:       '複数の比較試験で確認',
    solid:       'bg-amber-500  text-white border-amber-500',
    light:       'bg-amber-50   text-amber-800 border-amber-300',
    bar:         'bg-amber-500',
    studyType:   'メタ解析・システマティックレビュー',
    reliability: '複数のRCTを統合分析したメタ解析またはSR。単一研究より信頼性が高く、効果の方向性が揃っている。',
    expectation: '効果が出る可能性が最も高い。適切な用量・期間で使えば、多くの人で研究と近い結果が期待できる。',
    limitation:  '研究対象者と自分の属性（年齢・体質・食生活）が異なる場合、効果の大きさは変わりうる。',
    action:      '積極的に取り入れる価値がある。用量・継続期間を論文ベースで設定しよう。',
  },
  A: {
    label:       'A',
    human:       '厳密な比較試験で確認',
    solid:       'bg-blue-500   text-white border-blue-500',
    light:       'bg-blue-50    text-blue-800  border-blue-300',
    bar:         'bg-blue-500',
    studyType:   'RCT（ランダム化比較試験）',
    reliability: 'プラセボ群との厳密な比較実験。バイアスが抑えられており、因果関係を論じられる研究形式。',
    expectation: '効果の可能性が高い。ただし研究数がSランクより少ないため、個人差が出やすい場合もある。',
    limitation:  '研究数・サンプルサイズが限られるものも含む。メタ解析で検証されていないものはSに昇格しない。',
    action:      '取り入れる価値が十分ある。効果が出なければ3ヶ月を目安に見直すと良い。',
  },
  B: {
    label:       'B',
    human:       '大規模追跡研究で関連',
    solid:       'bg-emerald-500 text-white border-emerald-500',
    light:       'bg-emerald-50  text-emerald-800 border-emerald-300',
    bar:         'bg-emerald-500',
    studyType:   'コホート研究・観察研究',
    reliability: '大規模な集団を長期追跡した研究。「相関」は示せるが、RCTと違い因果関係の証明は難しい。',
    expectation: '一定の関連性は示されているが、RCTより不確実性が高い。補助的な位置づけが適切。',
    limitation:  '生活習慣・食事などの交絡因子を完全に排除できない。単独で判断しないほうが良い。',
    action:      '他の成分で不足している軸を補う目的や、副作用が少ない成分なら試す価値がある。',
  },
  C: {
    label:       'C',
    human:       'ヒトデータ不足',
    solid:       'bg-stone-400  text-white border-stone-400',
    light:       'bg-stone-100  text-stone-600  border-stone-300',
    bar:         'bg-stone-400',
    studyType:   '動物実験・小規模試験・in vitro',
    reliability: 'ヒトへの効果は限定的または未確認。動物では有望でも、ヒトで再現しないケースが多い。',
    expectation: '現時点では「効果を期待して飲む」根拠が薄い。話題性と科学的根拠は別物。',
    limitation:  'ヒトRCTのデータが存在しないか、あっても小規模で再現性が低い。将来的にランクが変わる可能性はある。',
    action:      '現時点で優先する必要はない。SやAランク成分を先に揃えてから検討するのが合理的。',
  },
}

interface Props {
  rank:     EvidenceRank
  variant?: 'dot' | 'chip' | 'block' | 'summary' | 'detail'
}

export function EvidenceBadge({ rank, variant = 'chip' }: Props) {
  const c = config[rank]

  if (variant === 'dot') {
    return (
      <span className={`${c.solid} inline-flex items-center justify-center
        rounded-md w-7 h-7 text-[12px] font-bold border flex-shrink-0`}>
        {c.label}
      </span>
    )
  }

  if (variant === 'chip') {
    return (
      <span className={`${c.light} inline-flex items-center gap-2
        border rounded-lg px-3 py-1.5 text-[13px]`}>
        <span className={`${c.solid} font-bold text-[13px] w-5 h-5 rounded-md
          flex items-center justify-center flex-shrink-0`}>
          {c.label}
        </span>
        <span className="font-medium">{c.human}</span>
      </span>
    )
  }

  if (variant === 'summary') {
    return (
      <div className={`${c.light} border rounded-2xl p-5`}>
        <div className="flex items-center gap-2 mb-2">
          <span className={`${c.solid} font-bold text-[20px] w-9 h-9 rounded-xl
            flex items-center justify-center`}>
            {c.label}
          </span>
          <span className="font-semibold text-[13px]">{c.human}</span>
        </div>
      </div>
    )
  }

  /* detail: 成分ページ用の詳細説明ボックス */
  if (variant === 'detail') {
    return (
      <div className={`${c.light} border rounded-2xl p-5`}>
        {/* ランク + 研究種別 */}
        <div className="flex items-center gap-3 mb-4">
          <span className={`${c.solid} font-bold text-[22px] w-11 h-11 rounded-xl
            flex items-center justify-center flex-shrink-0`}>
            {c.label}
          </span>
          <div>
            <p className="font-semibold text-[15px]">{c.human}</p>
            <p className="text-[12px] opacity-70 font-medium">{c.studyType}</p>
          </div>
        </div>

        <div className="space-y-3 text-[13px]">
          <div>
            <p className="font-semibold mb-0.5 opacity-80">なぜ信頼できるか</p>
            <p className="leading-relaxed opacity-70">{c.reliability}</p>
          </div>
          <div>
            <p className="font-semibold mb-0.5 opacity-80">どの程度効果を期待できるか</p>
            <p className="leading-relaxed opacity-70">{c.expectation}</p>
          </div>
          <div>
            <p className="font-semibold mb-0.5 opacity-80">限界・注意点</p>
            <p className="leading-relaxed opacity-70">{c.limitation}</p>
          </div>
          <div className={`${c.solid} rounded-xl px-4 py-3 mt-1`}>
            <p className="font-semibold text-[12px] opacity-80 mb-0.5">このランクの成分をどう扱うか</p>
            <p className="font-medium leading-relaxed">{c.action}</p>
          </div>
        </div>
      </div>
    )
  }

  /* block */
  return (
    <div className={`${c.light} border rounded-xl p-4`}>
      <div className={`${c.solid} font-bold text-[22px] w-10 h-10 rounded-xl
        flex items-center justify-center mb-2`}>
        {c.label}
      </div>
      <p className="font-semibold text-[13px]">{c.human}</p>
    </div>
  )
}

export function EvidenceBar({ rank }: { rank: EvidenceRank }) {
  const widths: Record<EvidenceRank, string> = { S: 'w-full', A: 'w-3/4', B: 'w-1/2', C: 'w-1/4' }
  return (
    <div className="h-2 bg-secondary rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${widths[rank]} ${config[rank].bar} opacity-80`} />
    </div>
  )
}
