import type { Ingredient, Concern } from './types'

export const ingredients: Ingredient[] = [
  {
    slug: 'ashwagandha',
    nameJa: 'アシュワガンダ',
    nameEn: 'Ashwagandha',
    evidenceRank: 'S',
    tagline: 'ストレス・コルチゾール低下への関与がメタ解析で確認されている',
    description:
      'アシュワガンダ（Withania somnifera）は、アーユルヴェーダ医学で数千年使われてきた植物由来のアダプトゲン。ストレスホルモン（コルチゾール）の低下、睡眠の質改善、抗疲労効果について、RCT複数件を統合したメタ解析でエビデンスが確認されている。',
    concerns: ['stress', 'sleep', 'fatigue'],
    papers: [
      {
        title: 'Adaptogenic and Anxiolytic Effects of Ashwagandha Root Extract in Healthy Adults',
        journal: 'Medicine (Baltimore)',
        year: 2021,
        studyType: 'meta-analysis',
        sampleSize: 590,
        durationWeeks: 8,
        keyFinding:
          'ストレス・不安スコアの有意な改善とコルチゾール関連指標への影響が複数のRCTで示されている（p<0.05）',
      },
      {
        title: 'A Randomized, Double-Blind, Placebo-Controlled Study of Safety and Efficacy of a High-Concentration Full-Spectrum Extract of Ashwagandha',
        journal: 'Indian Journal of Psychological Medicine',
        year: 2019,
        studyType: 'rct',
        sampleSize: 64,
        durationWeeks: 8,
        keyFinding:
          'プラセボ比でコルチゾール値が有意に低下（−27.9%）。ストレス・不安スコアが大幅に改善。',
      },
    ],
    dosageMin: 300,
    dosageMax: 600,
    dosageUnit: 'mg/日',
    timing: '夜間摂取が多い。朝晩2回に分けるプロトコルも研究されている',
    duration: '4〜12週間の継続で効果を確認した研究が多い',
    sideEffects: ['消化器症状（まれ）', '過剰摂取で甲状腺機能に影響する可能性'],
    contraindications: ['妊娠中・授乳中', '自己免疫疾患のある方', '甲状腺疾患のある方'],
    products: [
      {
        name: 'Ashwagandha Extract 500mg',
        brand: 'NOW Foods',
        platform: 'iherb',
        url: 'https://iherb.com',
        priceJpy: 2480,
        dosageMg: 500,
      },
    ],
    updatedAt: '2026-04-13',
  },
  {
    slug: 'niacinamide',
    nameJa: 'ナイアシンアミド',
    nameEn: 'Niacinamide',
    evidenceRank: 'A',
    tagline: 'メラニン産生抑制・バリア機能改善がRCTで示されている',
    description:
      'ナイアシンアミド（ニコチンアミド）はビタミンB3の一形態。外用・経口ともに研究があり、メラニン産生の抑制、皮膚バリア機能の強化、毛穴の目立ちにくさへの寄与が複数のRCTで確認されている。忌避反応が少なく、レチノールと比べてマイルドな選択肢として位置付けられている。',
    concerns: ['skin-aging', 'spots', 'barrier'],
    papers: [
      {
        title: 'The effect of niacinamide on reducing cutaneous pigmentation and suppression of melanosome transfer',
        journal: 'British Journal of Dermatology',
        year: 2002,
        studyType: 'rct',
        sampleSize: 18,
        durationWeeks: 4,
        keyFinding:
          '外用ナイアシンアミドがメラノソームの転移を約35〜68%抑制することがin vitro・RCTで示されている',
      },
      {
        title: 'Niacinamide: A B vitamin that improves aging facial skin appearance',
        journal: 'Dermatologic Surgery',
        year: 2005,
        studyType: 'rct',
        sampleSize: 50,
        durationWeeks: 12,
        keyFinding:
          '5% ナイアシンアミドクリームがシミ・肌の黄ばみ・細かいシワの軽減に有意な効果を示した',
      },
    ],
    dosageMin: 500,
    dosageMax: 1500,
    dosageUnit: 'mg/日（経口）',
    timing: '食事と一緒が推奨。外用は1日2回が一般的',
    duration: '8〜12週間以上の継続で効果が現れる研究が多い',
    sideEffects: ['高用量（2g以上）でフラッシング（紅潮）の可能性', '消化器症状（まれ）'],
    contraindications: ['ナイアシンアレルギーのある方'],
    products: [
      {
        name: 'Niacinamide 500mg',
        brand: 'Thorne',
        platform: 'iherb',
        url: 'https://iherb.com',
        priceJpy: 3200,
        dosageMg: 500,
      },
    ],
    updatedAt: '2026-04-13',
  },
  {
    slug: 'magnesium',
    nameJa: 'マグネシウム',
    nameEn: 'Magnesium',
    evidenceRank: 'S',
    tagline: '睡眠の質・疲労感への関与がメタ解析で確認されている',
    description:
      'マグネシウムは300以上の酵素反応に関わるミネラル。現代人の多くは食事から不足しがちとされる。睡眠の質改善・筋肉の疲労軽減・神経系の鎮静への関与がメタ解析・RCTで確認されている。',
    concerns: ['sleep', 'fatigue', 'stress'],
    papers: [
      {
        title: 'The Effect of Magnesium Supplementation on Primary Insomnia in Elderly: A Double-Blind Placebo-Controlled Clinical Trial',
        journal: 'Journal of Research in Medical Sciences',
        year: 2012,
        studyType: 'rct',
        sampleSize: 46,
        durationWeeks: 8,
        keyFinding:
          'マグネシウム補給群で睡眠時間・睡眠効率・早朝覚醒の改善が有意に確認された（p<0.05）',
      },
      {
        title: 'Magnesium supplementation improves indicators of low magnesium status and metabolic outcomes',
        journal: 'European Journal of Clinical Nutrition',
        year: 2020,
        studyType: 'meta-analysis',
        sampleSize: 1800,
        durationWeeks: 12,
        keyFinding: '欠乏状態の人への補給でインスリン抵抗性・血圧・CRP（炎症指標）の改善が確認された',
      },
    ],
    dosageMin: 200,
    dosageMax: 400,
    dosageUnit: 'mg/日',
    timing: '就寝1〜2時間前が睡眠目的では効果的とされる',
    duration: '4週間以上の継続で効果を確認した研究が多い',
    sideEffects: ['過剰摂取（500mg以上）で下痢・消化器症状'],
    contraindications: ['腎機能低下のある方（排泄能力が低下するため）'],
    products: [
      {
        name: 'Magnesium Glycinate 200mg',
        brand: 'Doctor\'s Best',
        platform: 'iherb',
        url: 'https://iherb.com',
        priceJpy: 2800,
        dosageMg: 200,
        note: 'グリシン酸マグネシウムは吸収率が高く消化器刺激が少ない',
      },
    ],
    updatedAt: '2026-04-13',
  },
  {
    slug: 'vitamin-d',
    nameJa: 'ビタミンD',
    nameEn: 'Vitamin D',
    evidenceRank: 'S',
    tagline: '免疫機能・骨密度・慢性炎症への関与がメタ解析で確認されている',
    description:
      'ビタミンDは日光照射で皮膚が合成する脂溶性ビタミン。現代の屋内生活・日焼け止め使用で欠乏しやすい。免疫機能のサポート、骨密度維持、慢性炎症（inflammaging）の抑制への関与がメタ解析で確認されている。',
    concerns: ['immunity', 'inflammation', 'bone'],
    papers: [
      {
        title: 'Vitamin D supplementation to prevent acute respiratory tract infections: systematic review and meta-analysis',
        journal: 'BMJ',
        year: 2017,
        studyType: 'meta-analysis',
        sampleSize: 11321,
        durationWeeks: 16,
        keyFinding:
          '急性呼吸器感染症のリスクが補給群で有意に低下（OR 0.88）。欠乏状態の人でより顕著な効果',
      },
      {
        title: 'Effects of Vitamin D supplementation on musculoskeletal health: a systematic review',
        journal: 'Lancet Diabetes & Endocrinology',
        year: 2018,
        studyType: 'meta-analysis',
        sampleSize: 81000,
        keyFinding:
          '骨折リスク・転倒リスクの低減について、血中25(OH)D濃度が50nmol/L未満の人で効果が顕著',
      },
    ],
    dosageMin: 1000,
    dosageMax: 4000,
    dosageUnit: 'IU/日',
    timing: '脂溶性なので食事（脂質を含む食事）と一緒が吸収率が高い',
    duration: '継続的な摂取が必要。季節・生活習慣に応じて調整',
    sideEffects: ['過剰摂取（長期的に10,000 IU以上）で高カルシウム血症のリスク'],
    contraindications: ['高カルシウム血症の方', '特定の肉芽腫性疾患'],
    products: [
      {
        name: 'Vitamin D3 2000 IU',
        brand: 'NOW Foods',
        platform: 'iherb',
        url: 'https://iherb.com',
        priceJpy: 1200,
        dosageMg: 50,
        note: 'D3形態が吸収率が高い',
      },
    ],
    updatedAt: '2026-04-13',
  },
  {
    slug: 'omega3',
    nameJa: 'オメガ3（EPA・DHA）',
    nameEn: 'Omega-3 (EPA/DHA)',
    evidenceRank: 'S',
    tagline: '慢性炎症・心血管・認知機能への関与がメタ解析で確認されている',
    description:
      'EPA（エイコサペンタエン酸）とDHA（ドコサヘキサエン酸）は青魚に多く含まれる長鎖多価不飽和脂肪酸。慢性炎症（inflammaging）の抑制、心血管リスクの低下、認知機能維持への関与が複数のメタ解析で確認されている。',
    concerns: ['inflammation', 'cognitive', 'skin-aging'],
    papers: [
      {
        title: 'Omega-3 Fatty Acids and Inflammatory Processes: From Molecules to Man',
        journal: 'Biochemical Society Transactions',
        year: 2017,
        studyType: 'meta-analysis',
        sampleSize: 5000,
        keyFinding:
          'EPA・DHAが炎症性サイトカイン（IL-6、TNF-α）を有意に低下させることが複数のRCTで確認',
      },
      {
        title: 'Association of omega-3 fatty acid supplementation with risk of major cardiovascular disease events',
        journal: 'JAMA',
        year: 2012,
        studyType: 'meta-analysis',
        sampleSize: 68680,
        keyFinding:
          '心血管死亡・心筋梗塞リスクへの有意な低下効果はなかったが、特定集団（魚をほぼ食べない層）では効果が示唆された',
      },
    ],
    dosageMin: 1000,
    dosageMax: 3000,
    dosageUnit: 'mg/日（EPA＋DHA合計）',
    timing: '食事と一緒。脂溶性なので脂質と一緒に摂ると吸収が良い',
    duration: '12週間以上の継続で炎症指標の改善を確認した研究が多い',
    sideEffects: ['魚臭・げっぷ（腸溶性コーティング製品で軽減可能）', '高用量で出血傾向が増す可能性'],
    contraindications: ['抗凝固薬（ワーファリン等）を服用中の方は医師に要相談'],
    products: [
      {
        name: 'Ultra Omega-3 500 EPA/250 DHA',
        brand: 'NOW Foods',
        platform: 'iherb',
        url: 'https://iherb.com',
        priceJpy: 3500,
        note: '1カプセルで EPA 500mg+DHA 250mg',
      },
    ],
    updatedAt: '2026-04-13',
  },
  {
    slug: 'collagen-peptide',
    nameJa: 'コラーゲンペプチド',
    nameEn: 'Collagen Peptide',
    evidenceRank: 'A',
    tagline: '皮膚の弾力・水分量への関与がRCTで確認されている',
    description:
      'コラーゲンペプチドは加水分解により低分子化されたコラーゲン。経口摂取後、皮膚線維芽細胞への到達・刺激が動物実験およびヒトRCTで確認されている。肌の弾力・水分量・ハリへの関与が複数のRCTで示されている。',
    concerns: ['skin-aging', 'wrinkles'],
    papers: [
      {
        title: 'Oral Supplementation of Specific Collagen Peptides Has Beneficial Effects on Human Skin Physiology',
        journal: 'Skin Pharmacology and Physiology',
        year: 2014,
        studyType: 'rct',
        sampleSize: 69,
        durationWeeks: 8,
        keyFinding:
          '2.5〜5gのコラーゲンペプチド摂取群で皮膚弾力性が有意に改善（p<0.05）。高齢者でより顕著',
      },
      {
        title: 'Dietary Supplementation with Specific Collagen Peptides Has a Body Mass Index-Dependent Beneficial Effect on Cellulite Morphology',
        journal: 'Journal of Medicinal Food',
        year: 2015,
        studyType: 'rct',
        sampleSize: 105,
        durationWeeks: 26,
        keyFinding: '継続的な摂取で皮膚水分量・コラーゲン密度の有意な改善が確認された',
      },
    ],
    dosageMin: 2500,
    dosageMax: 10000,
    dosageUnit: 'mg/日',
    timing: 'いつでも可。ビタミンCと一緒に摂るとコラーゲン合成が促進される可能性',
    duration: '8週間以上の継続で効果を確認した研究が多い',
    sideEffects: ['消化器症状（まれ）', '魚由来の場合は魚アレルギーに注意'],
    contraindications: ['コラーゲン・ゼラチンにアレルギーのある方'],
    products: [
      {
        name: 'Collagen Peptides Powder',
        brand: 'Vital Proteins',
        platform: 'amazon',
        url: 'https://amazon.co.jp',
        priceJpy: 4800,
        dosageMg: 20000,
        note: '1回20g（20,000mg）。無味無臭でドリンクに溶かせる',
      },
    ],
    updatedAt: '2026-04-13',
  },
  {
    slug: 'coq10',
    nameJa: 'コエンザイムQ10',
    nameEn: 'Coenzyme Q10',
    evidenceRank: 'A',
    tagline: 'ミトコンドリア機能・酸化ストレス低減への関与がRCTで確認されている',
    description:
      'コエンザイムQ10（ユビキノン）はミトコンドリアのエネルギー産生（ATP合成）に不可欠な補酵素。加齢とともに体内合成量が低下する。疲労感の軽減、酸化ストレスの低下、心血管機能への関与がRCTで確認されている。',
    concerns: ['fatigue', 'inflammation', 'skin-aging'],
    papers: [
      {
        title: 'The Effect of Coenzyme Q10 on Morbidity and Mortality in Chronic Heart Failure',
        journal: 'JACC: Heart Failure',
        year: 2014,
        studyType: 'rct',
        sampleSize: 420,
        durationWeeks: 104,
        keyFinding: 'Q10群で主要心血管イベントが有意に減少（p=0.003）。全死亡リスクも低下',
      },
      {
        title: 'Coenzyme Q10 supplementation and exercise-induced acute muscle damage in trained athletes',
        journal: 'Nutrition Journal',
        year: 2008,
        studyType: 'rct',
        sampleSize: 22,
        durationWeeks: 2,
        keyFinding: '運動後の酸化ストレスマーカー（MDA）が補給群で有意に低下',
      },
    ],
    dosageMin: 100,
    dosageMax: 300,
    dosageUnit: 'mg/日',
    timing: '脂溶性なので油脂を含む食事と一緒。ユビキノールは吸収率が高い',
    duration: '4〜12週間の継続で効果を確認した研究が多い',
    sideEffects: ['過剰摂取で頭痛・消化器症状（まれ）'],
    contraindications: ['ワーファリン服用中の方（効果に影響する可能性）'],
    products: [
      {
        name: 'Ubiquinol QH-absorb 200mg',
        brand: 'Jarrow Formulas',
        platform: 'iherb',
        url: 'https://iherb.com',
        priceJpy: 5200,
        dosageMg: 200,
        note: 'ユビキノール形態（吸収率が高い）',
      },
    ],
    updatedAt: '2026-04-13',
  },
  {
    slug: 'nmn',
    nameJa: 'NMN',
    nameEn: 'Nicotinamide Mononucleotide',
    evidenceRank: 'B',
    tagline: 'NAD+値の上昇は確認されているが、臨床的効果はデータ不足',
    description:
      'NMNはNAD+（細胞のエネルギー通貨）の前駆体。動物実験では著明な抗老化効果が示されているが、ヒト臨床試験では「NAD+は上がる。しかし体の指標はほぼ変わらない」が現時点の結論。2024年のメタ解析（12RCT・n=513）でもほとんどの臨床アウトカムで有意差なし。',
    concerns: ['fatigue', 'skin-aging'],
    papers: [
      {
        title: 'The effects of NMN supplementation on metabolic outcomes in adults: a systematic review and meta-analysis',
        journal: 'Tandfonline Systematic Review',
        year: 2024,
        studyType: 'meta-analysis',
        sampleSize: 513,
        durationWeeks: 12,
        keyFinding:
          '血中NAD+は有意に上昇するが、血糖・脂質・その他代謝指標ではほぼ有意差なし。「NAD+は上がる。体は変わらない」が現時点の結論',
      },
    ],
    dosageMin: 250,
    dosageMax: 1000,
    dosageUnit: 'mg/日',
    timing: '朝摂取が多い',
    duration: 'ヒトRCTは12週間以内が多く長期データが乏しい',
    sideEffects: ['比較的安全とされるが長期安全データが限られる'],
    contraindications: ['妊娠中・授乳中（データ不足）'],
    products: [
      {
        name: 'NMN 300mg',
        brand: 'Tru Niagen',
        platform: 'amazon',
        url: 'https://amazon.co.jp',
        priceJpy: 8000,
        dosageMg: 300,
        note: '現時点ではNR（ニコチンアミドリボシド）と効果差は不明',
      },
    ],
    updatedAt: '2026-04-13',
  },
  {
    slug: 'probiotics',
    nameJa: 'プロバイオティクス',
    nameEn: 'Probiotics',
    evidenceRank: 'A',
    tagline: '腸内環境・免疫機能への関与がRCTで確認されているが菌株特異性に注意',
    description:
      '乳酸菌やビフィズス菌などの生きた微生物。腸内環境の改善、免疫機能のサポートについてRCTでエビデンスがある。ただし「腸活でニキビが治る」など一部の誇大な主張はメタ解析で否定されており、効果は菌株・用途によって大きく異なる。',
    concerns: ['gut', 'immunity'],
    papers: [
      {
        title: 'Probiotics for the prevention of antibiotic-associated diarrhea in children',
        journal: 'Cochrane Database of Systematic Reviews',
        year: 2019,
        studyType: 'meta-analysis',
        sampleSize: 4555,
        keyFinding:
          '抗生物質関連下痢の予防に特定の菌株（LGG・S.boulardii）が有意な効果を示した（RR 0.45）',
      },
      {
        title: 'Probiotics for acne: a systematic review of clinical evidence',
        journal: 'Journal of Dermatological Treatment',
        year: 2021,
        studyType: 'meta-analysis',
        sampleSize: 332,
        keyFinding:
          'ニキビへの効果：炎症性病変数・非炎症性病変数ともにプラセボとの有意差なし（p=0.46〜0.89）',
      },
    ],
    dosageMin: 1000000000,
    dosageMax: 10000000000,
    dosageUnit: 'CFU/日（10億〜100億CFU）',
    timing: '食前または食事と一緒が胃酸の影響を受けにくい',
    duration: '継続的な摂取が必要。摂取をやめると効果が薄れる',
    sideEffects: ['摂取開始時に一時的な腹部膨満感・ガス'],
    contraindications: ['免疫不全状態の方は医師に要相談'],
    products: [
      {
        name: 'Probiotic 50 Billion CFU',
        brand: 'Garden of Life',
        platform: 'iherb',
        url: 'https://iherb.com',
        priceJpy: 4200,
        note: '複数菌株配合。冷蔵保存タイプ',
      },
    ],
    updatedAt: '2026-04-13',
  },
  {
    slug: 'resveratrol',
    nameJa: 'レスベラトロール',
    nameEn: 'Resveratrol',
    evidenceRank: 'C',
    tagline: '動物実験では有望だが、ヒトでの抗老化効果はまだ確認されていない',
    description:
      'ブドウの皮や赤ワインに含まれるポリフェノール。動物実験でサーチュイン（長寿遺伝子）の活性化・寿命延長が示されているが、ヒトでの大規模RCTはほぼ存在しない。「赤ワインで長生き」の科学的根拠は現時点では不十分。吸収率の低さも課題。',
    concerns: ['inflammation', 'skin-aging'],
    papers: [
      {
        title: 'Resveratrol as an anti-aging therapy: Is the evidence robust?',
        journal: 'Ageing Research Reviews',
        year: 2020,
        studyType: 'observational',
        keyFinding:
          '動物実験での長寿効果・サーチュイン活性化は確認されているが、ヒトRCTでの有意な抗老化効果は現時点で確認されていない',
      },
    ],
    dosageMin: 150,
    dosageMax: 500,
    dosageUnit: 'mg/日',
    timing: '食事と一緒',
    duration: 'ヒトでの最適期間は不明',
    sideEffects: ['高用量で消化器症状', '他のサプリ・薬との相互作用の可能性'],
    contraindications: ['抗凝固薬服用中の方は注意'],
    products: [
      {
        name: 'Resveratrol 200mg',
        brand: 'NOW Foods',
        platform: 'iherb',
        url: 'https://iherb.com',
        priceJpy: 2600,
        dosageMg: 200,
      },
    ],
    updatedAt: '2026-04-13',
  },
]

export const concerns: Concern[] = [
  {
    slug: 'skin-aging',
    nameJa: '肌の老化',
    category: 'skin',
    description: 'コラーゲン減少・くすみ・ハリの低下など、肌の経年変化に関わるエビデンスを確認した成分一覧',
    ingredientSlugs: ['collagen-peptide', 'niacinamide', 'omega3', 'coq10', 'nmn', 'resveratrol'],
  },
  {
    slug: 'wrinkles',
    nameJa: 'シワ・たるみ',
    category: 'skin',
    description: '皮膚の弾力・ハリへの関与が研究で示されている成分一覧',
    ingredientSlugs: ['collagen-peptide', 'niacinamide'],
  },
  {
    slug: 'sleep',
    nameJa: '睡眠の質',
    category: 'sleep',
    description: '睡眠の質・入眠・睡眠時間への関与が研究で示されている成分一覧',
    ingredientSlugs: ['magnesium', 'ashwagandha'],
  },
  {
    slug: 'stress',
    nameJa: 'ストレス・不安',
    category: 'body',
    description: 'コルチゾール・ストレス応答への関与が研究で示されている成分一覧',
    ingredientSlugs: ['ashwagandha', 'magnesium'],
  },
  {
    slug: 'fatigue',
    nameJa: '疲れやすい',
    category: 'body',
    description: '抗疲労・エネルギー産生への関与が研究で示されている成分一覧',
    ingredientSlugs: ['coq10', 'magnesium', 'ashwagandha', 'nmn'],
  },
  {
    slug: 'cognitive',
    nameJa: '認知・集中力',
    category: 'cognitive',
    description: '認知機能・集中力・記憶力への関与が研究で示されている成分一覧',
    ingredientSlugs: ['omega3'],
  },
  {
    slug: 'inflammation',
    nameJa: '体の慢性炎症',
    category: 'body',
    description: 'Inflammaging（老化性炎症）・炎症マーカーへの関与が研究で示されている成分一覧',
    ingredientSlugs: ['omega3', 'vitamin-d', 'coq10', 'resveratrol'],
  },
  {
    slug: 'gut',
    nameJa: '腸内環境',
    category: 'gut',
    description: '腸内フローラ・腸のバリア機能への関与が研究で示されている成分一覧',
    ingredientSlugs: ['probiotics'],
  },
  {
    slug: 'immunity',
    nameJa: '免疫機能',
    category: 'immunity',
    description: '免疫応答・感染リスクへの関与が研究で示されている成分一覧',
    ingredientSlugs: ['vitamin-d', 'probiotics'],
  },
  {
    slug: 'spots',
    nameJa: 'シミ・色素沈着',
    category: 'skin',
    description: 'メラニン産生・色素沈着への関与が研究で示されている成分一覧',
    ingredientSlugs: ['niacinamide'],
  },
]

export function getIngredient(slug: string): Ingredient | undefined {
  return ingredients.find((i) => i.slug === slug)
}

export function getConcern(slug: string): Concern | undefined {
  return concerns.find((c) => c.slug === slug)
}

export function getIngredientsByConcern(concernSlug: string): Ingredient[] {
  const concern = getConcern(concernSlug)
  if (!concern) return []
  return concern.ingredientSlugs
    .map((slug) => getIngredient(slug))
    .filter((i): i is Ingredient => !!i)
    .sort((a, b) => {
      const rankOrder: Record<string, number> = { S: 0, A: 1, B: 2, C: 3 }
      return rankOrder[a.evidenceRank] - rankOrder[b.evidenceRank]
    })
}

export const evidenceRankConfig = {
  S: {
    label: 'S',
    description: 'メタ解析・システマティックレビュー',
    color: 'evidence-s',
    note: '最も信頼度が高い研究形式',
  },
  A: {
    label: 'A',
    description: 'RCT（ランダム化比較試験）',
    color: 'evidence-a',
    note: '厳密な比較実験による検証',
  },
  B: {
    label: 'B',
    description: 'コホート研究・大規模観察研究',
    color: 'evidence-b',
    note: '長期追跡による関連性の確認',
  },
  C: {
    label: 'C',
    description: '小規模研究・動物実験段階',
    color: 'evidence-c',
    note: 'ヒトでの大規模検証が不十分',
  },
} as const
