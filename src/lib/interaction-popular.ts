/**
 * interaction-popular.ts
 *
 * /tools/interaction-checker の picker default 表示用「人気順」配列。
 *
 * - ingredient: 日本のサプリ消費上位（消費者庁・健康食品マーケット調査等を参考に
 *   data.ts 収載 slug にマッピングしたもの）。曖昧成分は代表 1 slug のみ
 * - medication: 日本で処方頻度の高い主要 25 薬剤クラス。canonical key と一致
 */

/** Popular ingredient slugs（picker default の表示順） */
export const POPULAR_INGREDIENT_SLUGS: readonly string[] = [
  // ── 基礎ビタミン・ミネラル ──
  'vitamin-c-oral',
  'vitamin-d',
  'magnesium-glycinate',
  'zinc',
  'iron',
  'vitamin-b12',
  'folic-acid',
  'vitamin-e',
  'vitamin-b6',
  'vitamin-k2',

  // ── オメガ・脂質 ──
  'omega3',

  // ── タンパク・アミノ酸 ──
  'whey-protein-isolate',
  'creatine',
  'l-theanine',
  'taurine',
  'glycine',
  'gaba',

  // ── 抗酸化・若返り ──
  'coq10',
  'nmn',
  'resveratrol',
  'astaxanthin',
  'glutathione',
  'nac',
  'pqq',
  'nicotinamide-riboside',

  // ── 美容・関節 ──
  'collagen-peptide',
  'hyaluronic-acid-oral',
  'glucosamine',
  'niacinamide',
  'lutein',

  // ── ハーブ・アダプトゲン ──
  'ashwagandha',
  'turmeric-high-curcumin-bcm-95',
  'rhodiola',
  'ginkgo-biloba',
  'lions-mane',
  'reishi',

  // ── 腸内・代謝 ──
  'probiotics',
  'psyllium',
  'egcg',

  // ── 女性・更年期 ──
  'equol',
  'soy-isoflavones',

  // ── その他人気 ──
  'spirulina',
  'chlorella-vulgaris',
  'fisetin',
  'quercetin',
]

/** 主要医薬品 canonical key（picker pinned 上位 25 件） */
export const POPULAR_MEDICATION_KEYS: readonly string[] = [
  // 循環器系（処方頻度 No.1）
  '降圧薬',
  'Ca拮抗薬',
  'ARB',
  'ACE阻害薬',
  'β遮断薬',
  'スタチン',

  // 抗凝固・抗血小板
  'ワルファリン',
  'DOAC',
  '抗血小板薬',

  // 糖尿病
  '糖尿病治療薬',
  'インスリン',
  'メトホルミン',

  // 胃酸
  'PPI',
  'H2ブロッカー',

  // 甲状腺
  '甲状腺ホルモン薬',

  // 精神神経
  'SSRI',
  'ベンゾジアゼピン',
  '睡眠薬',

  // 鎮痛
  'NSAIDs',
  'アセトアミノフェン',

  // ホルモン
  '経口避妊薬',
  'ホルモン補充療法',

  // 骨・認知
  'ビスホスホネート',
  'コリンエステラーゼ阻害薬',

  // 生活習慣
  'アルコール',
]

/** 医薬品 canonical key → 一般生活者向け例示テキスト（picker entry 副題） */
export const MEDICATION_EXAMPLES: Record<string, string> = {
  降圧薬: '例：高血圧の薬全般',
  Ca拮抗薬: '例：アムロジピン・ニフェジピン',
  ARB: '例：ロサルタン・バルサルタン',
  ACE阻害薬: '例：エナラプリル・リシノプリル',
  β遮断薬: '例：プロプラノロール・ビソプロロール',
  スタチン: '例：アトルバスタチン・ロスバスタチン（コレステロール）',
  ワルファリン: '例：抗凝固薬（ワーファリン®）',
  DOAC: '例：リバーロキサバン・アピキサバン',
  抗血小板薬: '例：バイアスピリン・プラビックス®',
  糖尿病治療薬: '例：血糖を下げる薬全般',
  インスリン: '例：インスリン製剤',
  メトホルミン: '例：メトグルコ®・グリコラン®',
  PPI: '例：ネキシウム®・タケキャブ®（胃酸を抑える）',
  H2ブロッカー: '例：ガスター®・タガメット®',
  甲状腺ホルモン薬: '例：チラーヂンS®（甲状腺機能低下症）',
  SSRI: '例：パキシル®・ジェイゾロフト®（うつ・不安）',
  ベンゾジアゼピン: '例：デパス®・ハルシオン®（不安・睡眠）',
  睡眠薬: '例：マイスリー®・ルネスタ®',
  NSAIDs: '例：ロキソニン®・イブプロフェン（鎮痛）',
  アセトアミノフェン: '例：カロナール®・タイレノール®',
  経口避妊薬: '例：低用量ピル全般',
  ホルモン補充療法: '例：HRT（更年期）',
  ビスホスホネート: '例：ボナロン®・フォサマック®（骨粗鬆症）',
  コリンエステラーゼ阻害薬: '例：アリセプト®・レミニール®（認知症）',
  アルコール: '飲酒',
}

/** 人気の組み合わせサンプル（empty state の quick start） */
export interface QuickStart {
  label: string
  ingredientSlugs: string[]
  medicationKeys: string[]
  why: string
}

export const QUICK_START_SAMPLES: readonly QuickStart[] = [
  {
    label: 'NMN + レスベラトロール',
    ingredientSlugs: ['nmn', 'resveratrol'],
    medicationKeys: [],
    why: 'NAD+ ブースター × サーチュイン活性化の人気スタック',
  },
  {
    label: 'ビタミンD + マグネシウム',
    ingredientSlugs: ['vitamin-d', 'magnesium-glycinate'],
    medicationKeys: [],
    why: 'ビタミンD 活性化に Mg が必要な定番ペア',
  },
  {
    label: '鉄 + ビタミンC + 甲状腺ホルモン薬',
    ingredientSlugs: ['iron', 'vitamin-c-oral'],
    medicationKeys: ['甲状腺ホルモン薬'],
    why: '鉄吸収促進 × チラーヂン同時服用の典型',
  },
]
