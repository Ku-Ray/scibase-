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
  ['astaxanthin',          'omega3'],
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

  // ── スキンケア（追加） ───────────────────────────
  ['retinol',              'niacinamide'],
  ['salicylic-acid',       'glycolic-acid'],
  ['glycolic-acid',        'lactic-acid'],
  ['arbutin',              'kojic-acid'],
  ['tranexamic-acid',      'arbutin'],
  ['niacinamide',          'azelaic-acid'],
  ['ferulic-acid',         'vitamin-c-topical'],
  ['ceramide',             'panthenol'],
  ['pdrn',                 'retinol'],
  ['centella-asiatica',    'niacinamide'],
  ['palmitoyl-tripeptide', 'retinol'],
  ['pantothenic-acid',     'niacinamide'],
  ['ceramide-oral',        'collagen-peptide'],
  // ── 抗老化・長寿（追加） ────────────────────────
  ['resveratrol',          'pterostilbene'],
  ['fisetin',              'quercetin'],
  ['spermidine',           'resveratrol'],
  ['alpha-lipoic-acid',    'coq10'],
  ['glutathione',          'nac'],
  ['urolithin-a',          'coq10'],
  // ── 脳・認知（追加） ────────────────────────────
  ['lions-mane',           'alpha-gpc'],
  ['ginkgo-biloba',        'bacopa-monnieri'],
  ['phosphatidylserine',   'alpha-gpc'],
  // ── 睡眠（追加） ─────────────────────────────────
  ['5-htp',                'l-tryptophan'],
  ['melatonin',            'l-theanine'],
  ['l-theanine',           'gaba'],
  // ── ストレス（追加） ────────────────────────────
  ['ashwagandha',          'magnesium-glycinate'],
  // ── 筋力・体組成（追加） ────────────────────────
  ['creatine',             'l-glutamine'],
  ['l-arginine',           'l-citrulline'],
  // ── 腸活（追加） ────────────────────────────────
  ['probiotics',           'beta-glucan'],
  // ── 代謝（追加） ────────────────────────────────
  ['berberine',            'chromium'],
  // ── 関節（追加） ────────────────────────────────
  ['glucosamine',          'chondroitin'],
  // ── ホルモン（追加） ────────────────────────────
  ['saw-palmetto',         'biotin'],
  // ── 髪・肌・爪（追加） ──────────────────────────
  ['biotin',               'zinc'],
  // ── 筋力・回復（追加） ──────────────────────────
  ['creatine',             'magnesium'],
  // ── 抗老化・メチル化（追加） ────────────────────
  ['tmg',                  'nmn'],
]

/** 最も検索ボリュームが高い比較ペア（一覧ページでハイライト表示） */
export const TOP3_PAIR_KEYS = [
  'retinol-vs-bakuchiol',
  'nmn-vs-nicotinamide-riboside',
  'creatine-vs-hmb',
]

/** 禁忌・刺激性差・用途分担が明確で「迷ったらこれ」一択推奨が消費者利益と乖離する比較ペア。
 *  これらでは TL;DR 後の即購入CTAブロックを抑制し、目的別の判断を促す。
 *  - 妊娠中NG/OKが分かれるペア（retinol系）
 *  - 肌タイプ・刺激性で適性が大きく分かれるペア（AHA系・retinol系）
 *  - 用途・作用ターゲットが補完関係のペア（オメガ3系・脂溶性スタック系）
 *  - 抗凝固薬等の併用注意が片方に強いペア
 */
export const DISABLE_QUICK_CTA_PAIRS: Set<string> = new Set([
  'retinol-vs-bakuchiol',
  'retinol-vs-retinal',
  'retinol-vs-niacinamide',
  'salicylic-acid-vs-glycolic-acid',
  'glycolic-acid-vs-lactic-acid',
  'omega3-vs-vitamin-k2',
  'astaxanthin-vs-omega3',
  'collagen-peptide-vs-vitamin-c-oral',
  'hyaluronic-acid-vs-collagen-peptide',
  'vitamin-d-vs-vitamin-k2',
  'vitamin-c-topical-vs-niacinamide',
  'hyaluronic-acid-vs-ceramide',
  'arbutin-vs-azelaic-acid',
])

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
  'astaxanthin-vs-omega3':               'supplement',
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
  // skin（追加）
  'retinol-vs-niacinamide':              'skin',
  'salicylic-acid-vs-glycolic-acid':     'skin',
  'glycolic-acid-vs-lactic-acid':        'skin',
  'arbutin-vs-kojic-acid':               'skin',
  'tranexamic-acid-vs-arbutin':          'skin',
  'niacinamide-vs-azelaic-acid':         'skin',
  'ferulic-acid-vs-vitamin-c-topical':   'skin',
  'ceramide-vs-panthenol':               'skin',
  'pdrn-vs-retinol':                     'skin',
  'centella-asiatica-vs-niacinamide':    'skin',
  'palmitoyl-tripeptide-vs-retinol':     'skin',
  'pantothenic-acid-vs-niacinamide':     'skin',
  'ceramide-oral-vs-collagen-peptide':   'skin',
  // antiaging（追加）
  'resveratrol-vs-pterostilbene':        'antiaging',
  'fisetin-vs-quercetin':                'antiaging',
  'spermidine-vs-resveratrol':           'antiaging',
  'alpha-lipoic-acid-vs-coq10':          'antiaging',
  'glutathione-vs-nac':                  'antiaging',
  'urolithin-a-vs-coq10':                'antiaging',
  // cognitive（追加）
  'lions-mane-vs-alpha-gpc':             'cognitive',
  'ginkgo-biloba-vs-bacopa-monnieri':    'cognitive',
  'phosphatidylserine-vs-alpha-gpc':     'cognitive',
  // stress（追加・睡眠含む）
  '5-htp-vs-l-tryptophan':               'stress',
  'melatonin-vs-l-theanine':             'stress',
  'l-theanine-vs-gaba':                  'stress',
  'ashwagandha-vs-magnesium-glycinate':  'stress',
  // muscle（追加）
  'creatine-vs-l-glutamine':             'muscle',
  'l-arginine-vs-l-citrulline':          'muscle',
  // gut（追加）
  'probiotics-vs-beta-glucan':           'gut',
  // energy（追加）
  'berberine-vs-chromium':               'energy',
  // joint（新設）
  'glucosamine-vs-chondroitin':          'joint',
  // hormone（新設）
  'saw-palmetto-vs-biotin':              'hormone',
  // 髪・肌・爪（supplement系）
  'biotin-vs-zinc':                      'supplement',
  // 筋力・回復（muscle系）
  'creatine-vs-magnesium':               'muscle',
  // 抗老化・メチル化（antiaging系）
  'tmg-vs-nmn':                          'antiaging',
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
  'retinol-vs-retinal': {
    title: 'レチノールvsレチナール｜変換工程と刺激の違い',
    description: 'レチノール（ビタミンA）とレチナール（レチンアルデヒド）を論文で比較。皮膚内変換の工程数、効果発現速度、刺激・赤みのリスク、初心者向け濃度、夜のみ使用ルール、併用NG成分まで。「どちらから始めるべきか」の判定を化粧品メーカー視点で解説。',
  },
  'pantothenic-acid-vs-niacinamide': {
    title: 'ナイアシンアミドvsパントテン酸｜B群ビタミンの違いと併用',
    description: 'ナイアシンアミド（B3）とパントテン酸（B5）を論文で比較。バリア機能・皮脂・赤みへの作用、有効濃度、併用OKの根拠、ニキビ・敏感肌での使い分けを化粧品メーカー視点で解説。',
  },
  'astaxanthin-vs-omega3': {
    title: 'アスタキサンチンvsDHA・EPA｜抗酸化と必須脂肪酸の違い',
    description: 'アスタキサンチンとDHA・EPA（オメガ3）を論文で比較。脂溶性カロテノイドによる抗酸化作用と、細胞膜構成成分としての必須脂肪酸作用の違い、有効量、肌・脳・心血管への効果分担、併用OKの根拠を化粧品メーカー視点で解説。',
  },
  'ceramide-oral-vs-collagen-peptide': {
    title: '経口セラミドvsコラーゲンペプチド｜飲む美容成分の違い',
    description: '経口セラミドとコラーゲンペプチドを論文で比較。セラミドはバリア機能・水分保持の補強、コラーゲンペプチドは真皮の弾力サポート。作用層の違い、有効量、効果が出るまでの目安、併用可否、月コストまで化粧品メーカー視点で解説。',
  },
  'biotin-vs-zinc': {
    title: 'ビオチンvs亜鉛｜髪・肌・爪サプリの使い分けを論文比較',
    description: 'ビオチン（B7）と亜鉛を論文で比較。両方とも髪・肌・爪に関わるが作用機序が異なる。ビオチンはケラチン合成補酵素、亜鉛は数百の酵素活性に関わる必須ミネラル。有効量、欠乏時の症状、過剰摂取リスク、どちらを優先すべきかを化粧品メーカー視点で解説。',
  },
  'creatine-vs-l-citrulline': {
    title: 'クレアチンvs Lシトルリン｜筋トレ・パンプの使い分けを論文比較',
    description: 'クレアチンとLシトルリンを論文で比較。クレアチンはATP再合成で筋力・パワー向上、シトルリンは血流・パンプ感・乳酸クリアランス改善。両者は補完関係で併用OK。有効量、効果が出る時間、副作用、男女別の優先度を化粧品メーカー視点で解説。',
  },
  'nmn-vs-coq10': {
    title: 'NMN vs CoQ10｜抗老化サプリの使い分けを論文比較',
    description: 'NMN（ニコチンアミドモノヌクレオチド）とCoQ10（コエンザイムQ10）を論文で比較。NMNはNAD+前駆体で細胞代謝・サーチュイン活性化、CoQ10はミトコンドリア電子伝達系の電子運搬体。作用層の違い、有効量、効果が出るまで、年齢別の優先度を化粧品メーカー視点で解説。',
  },
  'creatine-vs-magnesium': {
    title: 'クレアチンvs マグネシウム｜筋力UPと回復・睡眠の使い分け論文比較',
    description: 'クレアチンとマグネシウムを論文で比較。クレアチンはATP再合成で筋力・パワー向上、マグネシウムは筋弛緩・睡眠・骨形成・神経伝達に必須。両者は補完関係で併用OK（ATP-Mg複合体が酵素活性に必要）。タイミング、有効量、運動と回復の最適スタックを化粧品メーカー視点で解説。',
  },
  'glucosamine-vs-chondroitin': {
    title: 'グルコサミンvs コンドロイチン｜関節サプリの使い分け論文比較',
    description: 'グルコサミンとコンドロイチンを論文で比較。グルコサミンは軟骨基質グリコサミノグリカン前駆体、コンドロイチンは軟骨水分保持・弾力に関与。GAIT試験等のメタ解析、併用vs単独の効果差、運動負荷別の優先度、変形性膝関節症への現実的な期待値を化粧品メーカー視点で解説。',
  },
  'tmg-vs-nmn': {
    title: 'TMGvs NMN｜メチル基ドナーvsNAD+前駆体の使い分け',
    description: 'TMG（トリメチルグリシン・ベタイン）とNMN（ニコチンアミドモノヌクレオチド）を論文で比較。TMGはホモシステイン低下のメチル基ドナー、NMNはNAD+前駆体でサーチュイン活性化。両者は「メチル化サイクル」で接続する補完関係（NMN代謝でメチル基消費・TMGが補う）。有効量、効果が出るまで、抗老化スタックでの使い分けを化粧品メーカー視点で解説。',
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
  joint:          '関節',
  hormone:        'ホルモン・髪',
}
