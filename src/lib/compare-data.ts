export const POPULAR_PAIRS: [string, string][] = [
  // ── スキンケア ──────────────────────────────────
  ['retinol',              'bakuchiol'],
  ['retinol',              'retinal'],
  ['vitamin-c-topical',    'niacinamide'],
  ['hyaluronic-acid',      'ceramide'],
  ['arbutin',              'azelaic-acid'],
  ['myo-inositol',         'zinc'],
  // ── 抗老化・長寿 ────────────────────────────────
  ['nmn',                  'nicotinamide-riboside'],
  ['resveratrol',          'quercetin'],
  ['nmn',                  'coq10'],
  ['collagen-peptide',     'vitamin-c-oral'],
  ['hyaluronic-acid',      'collagen-peptide'],
  ['nmn',                  'urolithin-a'],
  ['spermidine',           'fisetin'],
  // ── ストレス・睡眠 ───────────────────────────────
  ['ashwagandha',          'rhodiola'],
  ['ashwagandha',          'l-theanine'],
  ['ashwagandha',          'panax-ginseng'],
  ['melatonin',            'glycine'],
  ['melatonin',            'magnesium-glycinate'],
  ['magnesium-glycinate',  'magnesium'],
  ['glycine',              'magnesium'],
  // ── 筋力・体組成 ────────────────────────────────
  ['creatine',             'hmb'],
  ['creatine',             'l-citrulline'],
  // ── 血管・循環 ──────────────────────────────────
  ['nattokinase',          'vitamin-k2'],
  ['omega3',               'vitamin-k2'],
  // ── サプリメント基礎 ─────────────────────────────
  ['omega3',               'astaxanthin'],
  ['vitamin-d',            'magnesium'],
  ['vitamin-d',            'vitamin-k2'],
  ['zinc',                 'vitamin-c-oral'],
  // ── 腸活 ────────────────────────────────────────
  ['probiotics',           'inulin'],
  ['probiotics',           'akkermansia'],
  // ── 脳・認知 ────────────────────────────────────
  ['lions-mane',           'bacopa-monnieri'],
  // ── 代謝・エネルギー ─────────────────────────────
  ['coq10',                'pqq'],
]

/** 最も検索ボリュームが高い比較ペア（一覧ページでハイライト表示） */
export const TOP3_PAIR_KEYS = [
  'retinol-vs-bakuchiol',
  'nmn-vs-nicotinamide-riboside',
  'creatine-vs-hmb',
]

export const PAIR_CATEGORIES: Record<string, string> = {
  // skin
  'retinol-vs-bakuchiol':                'skin',
  'retinol-vs-retinal':                  'skin',
  'vitamin-c-topical-vs-niacinamide':    'skin',
  'hyaluronic-acid-vs-ceramide':         'skin',
  'arbutin-vs-azelaic-acid':             'skin',
  'myo-inositol-vs-zinc':                'skin',
  // antiaging
  'nmn-vs-nicotinamide-riboside':        'antiaging',
  'resveratrol-vs-quercetin':            'antiaging',
  'nmn-vs-coq10':                        'antiaging',
  'collagen-peptide-vs-vitamin-c-oral':  'antiaging',
  'hyaluronic-acid-vs-collagen-peptide': 'antiaging',
  'nmn-vs-urolithin-a':                  'antiaging',
  'spermidine-vs-fisetin':               'antiaging',
  // stress
  'ashwagandha-vs-rhodiola':             'stress',
  'ashwagandha-vs-l-theanine':           'stress',
  'ashwagandha-vs-panax-ginseng':        'stress',
  'melatonin-vs-glycine':                'stress',
  'melatonin-vs-magnesium-glycinate':    'stress',
  'magnesium-glycinate-vs-magnesium':    'stress',
  'glycine-vs-magnesium':                'stress',
  // muscle
  'creatine-vs-hmb':                     'muscle',
  'creatine-vs-l-citrulline':            'muscle',
  // cardiovascular
  'nattokinase-vs-vitamin-k2':           'cardiovascular',
  'omega3-vs-vitamin-k2':                'cardiovascular',
  // supplement
  'omega3-vs-astaxanthin':               'supplement',
  'vitamin-d-vs-magnesium':              'supplement',
  'vitamin-d-vs-vitamin-k2':             'supplement',
  'zinc-vs-vitamin-c-oral':              'supplement',
  // gut
  'probiotics-vs-inulin':                'gut',
  'probiotics-vs-akkermansia':           'gut',
  // cognitive
  'lions-mane-vs-bacopa-monnieri':       'cognitive',
  // energy
  'coq10-vs-pqq':                        'energy',
}

/** ペア別SEOメタデータオーバーライド（高順位ページのCTR改善用） */
export const PAIR_SEO: Record<string, { title: string; description: string }> = {
  'arbutin-vs-azelaic-acid': {
    title: 'アルブチンvsアゼライン酸｜論文エビデンス比較',
    description: '美白・色素沈着対策のアルブチンとアゼライン酸を論文で比較。有効濃度、効果の出方、副作用（刺激・赤み）、肌質別の向き不向き、併用可否、月あたりコストまで。どちらを先に試すかの判定と理由を化粧品メーカー視点で解説。',
  },
  'hyaluronic-acid-vs-collagen-peptide': {
    title: 'ヒアルロン酸vsコラーゲンペプチド｜経口比較',
    description: '飲むヒアルロン酸とコラーゲンペプチドを論文で比較。経口摂取時の吸収率、肌弾力・保湿への影響、1日あたり有効量、エビデンスランクの差、月コスト、どちらを先に試すかの判定まで化粧品メーカー視点で解説。',
  },
}

export const CATEGORY_LABELS: Record<string, string> = {
  all:            'すべて',
  skin:           'スキンケア',
  antiaging:      '抗老化・長寿',
  stress:         'ストレス・睡眠',
  muscle:         '筋力・体組成',
  cardiovascular: '血管・循環',
  supplement:     'サプリメント基礎',
  gut:            '腸活',
  cognitive:      '脳・認知',
  energy:         '代謝・エネルギー',
}
