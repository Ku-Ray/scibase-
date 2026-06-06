/**
 * 不足栄養素 → 推奨サプリ用量 / 期間ベネフィット / SciBase 論文 hint のマッピング
 *
 * ベネフィットは「概算目安」表現で統一。診断・治療目的ではない。
 * 引用論文の詳細は SciBase 各成分ページ（/ingredients/<slug>）に集約。
 */

export interface NutrientActionData {
  /** 推奨サプリ用量範囲（食事不足分を埋める目安。サプリ単独の典型量） */
  supplementDoseRangeJa: string
  /** 続けた場合の目安期間（論文ベース。個人差あり） */
  benefitTimelineJa: string
  /** SciBase の論文ストック hint（カードでアピール） */
  paperHintJa: string
  /** 「不足するとどうなるか」の中立的な説明（YMYL 配慮で「目安」表現） */
  riskOfDeficitJa: string
}

export const NUTRIENT_ACTION: Record<string, NutrientActionData> = {
  iron: {
    supplementDoseRangeJa: '15-25 mg/日（吸収阻害を考慮して食間か空腹時）',
    benefitTimelineJa: 'フェリチン値の回復は 8-12 週間が目安（個人差あり）',
    paperHintJa: '吸収率の高いキレート鉄（ビスグリシン酸鉄等）の RCT を SciBase に多数収載',
    riskOfDeficitJa: '慢性的な不足は疲労感・集中力低下・冷え・抜け毛と関連が報告されている',
  },
  vitamin_d: {
    supplementDoseRangeJa: '1,000-2,000 IU/日（25-50 μg）',
    benefitTimelineJa: '血中 25(OH)D 濃度の上昇は 8-12 週間で安定する目安',
    paperHintJa: 'D3 vs D2 の効率差・冬季補充の RCT を SciBase に収載',
    riskOfDeficitJa: '骨密度の低下・免疫機能・気分との関連が報告される',
  },
  calcium: {
    supplementDoseRangeJa: '300-500 mg/日（食事との差分を埋める量）',
    benefitTimelineJa: '骨代謝マーカーの改善は 3-6 ヶ月が目安',
    paperHintJa: 'ビタミンD・マグネシウムとの併用効果の論文を収載',
    riskOfDeficitJa: '長期不足で骨密度低下・閉経後はリスクが上昇する報告あり',
  },
  magnesium: {
    supplementDoseRangeJa: '200-400 mg/日（クエン酸/グリシン酸塩が吸収良好）',
    benefitTimelineJa: '睡眠質・筋けいれんの体感変化は 4-8 週間が目安',
    paperHintJa: '形態別（クエン酸/グリシン酸/酸化）の吸収率比較を収載',
    riskOfDeficitJa: '不足は不眠・こむら返り・偏頭痛・血圧との関連が報告される',
  },
  zinc: {
    supplementDoseRangeJa: '10-25 mg/日（食後の方が消化器症状を抑えやすい）',
    benefitTimelineJa: '味覚・免疫マーカーの改善は 4-8 週間が目安',
    paperHintJa: '吸収率の高い形態（ピコリン酸亜鉛等）の比較論文を収載',
    riskOfDeficitJa: '味覚低下・免疫機能低下・肌のターンオーバー乱れと関連報告あり',
  },
  vitamin_b12: {
    supplementDoseRangeJa: '100-1,000 μg/日（吸収率の関係で大用量でも安全域広い）',
    benefitTimelineJa: '神経症状の改善は 4-12 週間・血液マーカーは 4-8 週間が目安',
    paperHintJa: 'メチルコバラミン vs シアノコバラミンの吸収比較を収載',
    riskOfDeficitJa: 'ベジ・ヴィーガン・高齢者は欠乏リスク。神経障害・貧血と関連',
  },
  vitamin_b6: {
    supplementDoseRangeJa: '5-25 mg/日（UL 45-60 mg/日に注意）',
    benefitTimelineJa: 'PMS・末梢神経の体感変化は 6-12 週間が目安',
    paperHintJa: 'P5P（活性型）と通常型の効率比較論文を収載',
    riskOfDeficitJa: 'PMS の悪化・末梢神経症状との関連が報告される',
  },
  folate: {
    supplementDoseRangeJa: '400 μg/日（妊活・妊娠中の標準量）',
    benefitTimelineJa: '血中ホモシステイン低下は 4-8 週間が目安',
    paperHintJa: 'モノグルタミン酸 vs ポリグルタミン酸（食品由来）の吸収比較を収載',
    riskOfDeficitJa: '妊娠初期の神経管欠損リスクが上昇・葉酸単独不足は稀',
  },
  niacin: {
    supplementDoseRangeJa: '10-20 mg/日（高用量は紅潮・肝機能に注意）',
    benefitTimelineJa: '血中脂質改善（高用量時）は 8-12 週間が目安',
    paperHintJa: 'ナイアシン vs ナイアシンアミドの作用差を比較論文に収載',
    riskOfDeficitJa: '欠乏は皮膚炎・口内炎・消化器症状と関連報告あり',
  },
  vitamin_a: {
    supplementDoseRangeJa: '600-900 μgRAE/日（β-カロテン由来推奨・UL 注意）',
    benefitTimelineJa: '視覚・皮膚マーカーの改善は 8-12 週間が目安',
    paperHintJa: 'レチノール vs β-カロテン の安全性比較論文を収載',
    riskOfDeficitJa: '夜盲・皮膚乾燥・免疫機能低下と関連報告あり',
  },
  vitamin_e: {
    supplementDoseRangeJa: '100-300 mg/日（α-トコフェロール換算）',
    benefitTimelineJa: '酸化ストレスマーカー改善は 8-12 週間が目安',
    paperHintJa: '天然型 vs 合成型の吸収率差を比較論文に収載',
    riskOfDeficitJa: '長期欠乏は神経症状・酸化ストレス増加と関連報告あり',
  },
  vitamin_c: {
    supplementDoseRangeJa: '500-1,000 mg/日（リポソーム型は吸収良好）',
    benefitTimelineJa: '抗酸化マーカー・肌の状態改善は 8-12 週間が目安',
    paperHintJa: 'リポソーム vs 通常型・吸収率の RCT を収載',
    riskOfDeficitJa: '免疫機能・コラーゲン合成・鉄吸収との関連が報告される',
  },
  selenium: {
    supplementDoseRangeJa: '50-100 μg/日（UL 350-400 μg に注意）',
    benefitTimelineJa: '甲状腺機能・抗酸化マーカー改善は 8-12 週間が目安',
    paperHintJa: 'セレノメチオニン vs 亜セレン酸ナトリウムの効率差を収載',
    riskOfDeficitJa: '甲状腺機能・免疫機能との関連が報告される',
  },
  iodine: {
    supplementDoseRangeJa: '海藻摂取で十分・サプリは医師相談推奨',
    benefitTimelineJa: '甲状腺機能の安定化は 8-12 週間が目安',
    paperHintJa: '日本人の海藻摂取と尿中ヨウ素排泄の調査を収載',
    riskOfDeficitJa: '甲状腺機能低下・代謝低下と関連。日本では過剰の方が多い',
  },
  potassium: {
    supplementDoseRangeJa: '食事から摂取が基本（バナナ・芋・野菜・果物）',
    benefitTimelineJa: '血圧・むくみの体感変化は 4-8 週間が目安',
    paperHintJa: 'カリウム摂取量と血圧の RCT メタ解析を収載',
    riskOfDeficitJa: '高血圧・むくみ・筋けいれんとの関連が報告される',
  },
}

/**
 * 不足栄養素を優先度順に並べる（severe → mild、その中で不足ポイント大きい順）
 */
export function selectTopDeficits<T extends { nutrient: string; status: string; percent: number }>(
  results: T[],
  limit = 3
): T[] {
  return [...results]
    .filter(r => r.status === 'severe_deficit' || r.status === 'mild_deficit')
    .sort((a, b) => {
      const aWeight = a.status === 'severe_deficit' ? 0 : 1
      const bWeight = b.status === 'severe_deficit' ? 0 : 1
      if (aWeight !== bWeight) return aWeight - bWeight
      return a.percent - b.percent  // より不足している順
    })
    .slice(0, limit)
}
