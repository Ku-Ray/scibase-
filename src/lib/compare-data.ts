export const POPULAR_PAIRS: [string, string][] = [
  ['retinol',              'bakuchiol'],
  ['retinol',              'retinal'],
  ['nmn',                  'nicotinamide-riboside'],
  ['glycine',              'magnesium'],
  ['vitamin-c-topical',    'niacinamide'],
  ['ashwagandha',          'rhodiola'],
  ['collagen-peptide',     'vitamin-c-oral'],
  ['omega3',               'astaxanthin'],
  ['probiotics',           'inulin'],
  ['coq10',                'pqq'],
  ['melatonin',            'glycine'],
  ['ashwagandha',          'l-theanine'],
  ['resveratrol',          'quercetin'],
  ['hyaluronic-acid',      'ceramide'],
  ['vitamin-d',            'magnesium'],
  ['zinc',                 'vitamin-c-oral'],
  ['lions-mane',           'bacopa-monnieri'],
  ['nmn',                  'coq10'],
]

/** 最も検索ボリュームが高い比較ペア（一覧ページでハイライト表示） */
export const TOP3_PAIR_KEYS = [
  'retinol-vs-bakuchiol',
  'nmn-vs-nicotinamide-riboside',
  'ashwagandha-vs-rhodiola',
]

export const PAIR_CATEGORIES: Record<string, string> = {
  'retinol-vs-bakuchiol':              'skin',
  'retinol-vs-retinal':                'skin',
  'vitamin-c-topical-vs-niacinamide':  'skin',
  'hyaluronic-acid-vs-ceramide':       'skin',
  'nmn-vs-nicotinamide-riboside':      'antiaging',
  'resveratrol-vs-quercetin':          'antiaging',
  'nmn-vs-coq10':                      'antiaging',
  'collagen-peptide-vs-vitamin-c-oral': 'antiaging',
  'ashwagandha-vs-rhodiola':           'stress',
  'ashwagandha-vs-l-theanine':         'stress',
  'melatonin-vs-glycine':              'stress',
  'glycine-vs-magnesium':              'stress',
  'omega3-vs-astaxanthin':             'supplement',
  'vitamin-d-vs-magnesium':            'supplement',
  'zinc-vs-vitamin-c-oral':            'supplement',
  'probiotics-vs-inulin':              'gut',
  'lions-mane-vs-bacopa-monnieri':     'cognitive',
  'coq10-vs-pqq':                      'energy',
}

export const CATEGORY_LABELS: Record<string, string> = {
  all:        'すべて',
  skin:       'スキンケア',
  antiaging:  '抗老化・長寿',
  stress:     'ストレス・睡眠',
  supplement: 'サプリメント',
  gut:        '腸活',
  cognitive:  '脳・認知',
  energy:     '代謝・エネルギー',
}
