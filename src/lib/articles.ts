import type { Article } from './types'

export const articles: Article[] = [
  // ── 1. コラーゲン記事 ────────────────────────────────────────────
  {
    slug: 'collagen-question',
    title: '「コラーゲンを飲んでも意味ない」は本当か。論文が示す答え',
    description:
      '「胃で分解されるから意味ない」は正しいのか。コラーゲンペプチドの吸収メカニズムとRCTの結果を論文で解説。効果的な選び方・飲み方も紹介。',
    category: 'skin',
    categoryLabel: '肌老化',
    publishedAt: '2026-04-17',
    readingMinutes: 5,
    heroStat: { value: '+28%', label: '皮膚弾力の改善（12週間RCT、Proksch 2014, n=69）' },
    lossAversionHook:
      '月3,000円のコラーゲンサプリを飲み続けている人の多くが、最も効果を落とす摂り方をしている。選び方が間違っていれば、コスト全額が無駄になる。',

    problemHeading: '「飲んでも分解される」は本当か',
    problemBody: `コラーゲンを飲むと「胃腸でアミノ酸に分解されるだけで、皮膚には届かない」という話を見かける。直感的には正しそうに聞こえる。しかし、これは「加水分解型コラーゲン（コラーゲンペプチド）」には当てはまらない。

通常のコラーゲンを飲んだ場合は確かに消化酵素で分解されてしまう。問題はここではない。2010年代以降に研究が進んだのは、コラーゲンを事前に酵素処理して小さく切った「ペプチド型」だ。`,

    scienceHeading: '血中に届く、ということが研究で確認された',
    scienceBody: `Proksch et al. (2014, Skin Pharmacology and Physiology) の比較試験では、コラーゲンペプチド2.5g〜5g/日を12週間摂取した群で、プラセボ群に比べ皮膚弾力が有意に改善した（+28%、p<0.05、n=69）。

なぜ届くのか。加水分解コラーゲンは「ヒドロキシプロリン」というアミノ酸を含む小さな分子（ジペプチド）として腸管から吸収される。これが皮膚の細胞に届き、コラーゲン産生を促すことが確認されている。「分解されるから届かない」は、加水分解型には当てはまらない。

ただし条件がある。効果が確認されているのは「加水分解型（ペプチド型）」だけ。製品の成分表示を確認する必要がある。`,
    scienceStat: { value: '2.5g〜5g', label: '効果が確認された1日の摂取量（Proksch 2014）' },

    solutionHeading: '選ぶポイントは2つだけ',
    solutionBody: `コラーゲンペプチドを選ぶときのチェックポイントは2つ。まずこの2点を満たしていない商品は、どれだけ高価でも効果が期待しにくい。

①「加水分解型」または「ペプチド」の表示があること。高分子コラーゲンは腸管からの吸収効率が低い。安い商品ほどここを誤魔化している場合がある。

②ビタミンCと同時に摂ること。コラーゲン合成には「ビタミンC」が不可欠で、不足していると産生効率が大幅に落ちる。コラーゲンペプチドを単独で飲んでいる人は、この2つ目の条件を見落としている可能性が高い。`,

    ingredients: [
      {
        slug: 'collagen-peptide',
        nameJa: 'コラーゲンペプチド',
        reason: '皮膚弾力・ハリへの効果がRCT複数件で確認されている。加水分解型を選ぶこと。',
        evidenceRank: 'A',
        urgencyNote: 'コラーゲン産生は25歳以降、毎年約1%低下する。今始めるのと1年後に始めるのでは、産生量の差が積み上がる。',
        productName: 'Hydrolyzed Collagen Peptides（加水分解コラーゲン）',
        productUrl: 'https://www.iherb.com/pr/now-foods-hydrolyzed-collagen-types-1-3-1-lb/19660',
        productPlatform: 'iherb',
        productPriceJpy: 3500,
        productHighlight: '加水分解型・研究使用形態',
      },
      {
        slug: 'vitamin-c-oral',
        nameJa: 'ビタミンC（経口）',
        reason: 'コラーゲン合成の必須補因子。コラーゲンペプチドとセットで摂ることで産生効率が上がる。',
        evidenceRank: 'S',
        urgencyNote: 'コラーゲンペプチドを飲んでいてもビタミンCが不足していれば、産生効率が低下する。セットでなければ片方の意味が薄れる。',
        productName: 'Vitamin C-1000 with Bioflavonoids',
        productUrl: 'https://www.iherb.com/pr/now-foods-vitamin-c-1-000-with-bioflavonoids-250-veg-capsules/422',
        productPlatform: 'iherb',
        productPriceJpy: 2800,
        productHighlight: 'バイオフラボノイド配合',
      },
    ],

    faqs: [
      {
        question: 'コラーゲンを飲むと胃で分解されてしまわないですか？',
        answer:
          '通常のコラーゲンは消化酵素で分解されますが、「加水分解型（コラーゲンペプチド）」はヒドロキシプロリンを含む小分子ペプチドとして腸管から吸収されることが確認されています。Ito et al. (2018) のヒト試験では、摂取後4時間で血中にヒドロキシプロリン含有ペプチドが検出されています。',
      },
      {
        question: '何gから効果が出ますか？',
        answer:
          'Proksch et al. (2014) のRCTでは2.5g〜5g/日で12週間後に皮膚弾力の有意な改善が確認されています。多くの研究が5〜10g/日のプロトコルを使用しており、最低でも2.5g以上は確保するのが推奨されています。',
      },
      {
        question: 'ビタミンCと一緒に飲む理由は何ですか？',
        answer:
          'コラーゲン合成の最終ステップにはビタミンCが必須です。プロリンとリジンをヒドロキシル化する酵素（プロリルヒドロキシラーゼ・リシルヒドロキシラーゼ）の補因子として機能します。ビタミンCが不足した状態でコラーゲンペプチドを摂取しても、産生効率が低下します。',
      },
      {
        question: '飲む時間帯はいつがいいですか？',
        answer:
          '特定の時間帯が決定的に有利というエビデンスはありません。毎日続けやすい時間帯（朝食時など）に摂取するのが現実的です。空腹時の方がペプチドの吸収が速いという報告もありますが、継続が最優先です。',
      },
    ],

    relatedIngredientSlugs: ['collagen-peptide', 'vitamin-c-oral', 'bakuchiol', 'niacinamide'],
  },

  // ── 2. 睡眠×老化記事 ─────────────────────────────────────────────
  {
    slug: 'sleep-aging',
    title: '睡眠不足で老化が加速する。グリシン・マグネシウム・アシュワガンダ、論文で選ぶ3成分',
    description:
      '睡眠不足は「疲れる」だけでなく、テロメア短縮・慢性炎症・コルチゾール高止まりを引き起こし老化を加速する。研究が示すメカニズムと、睡眠の質を改善する3成分を解説。',
    category: 'sleep',
    categoryLabel: '睡眠・老化',
    publishedAt: '2026-04-17',
    readingMinutes: 6,
    heroStat: { value: '約3倍', label: '慢性睡眠不足でのテロメア短縮速度増加（大規模コホート研究）' },
    lossAversionHook:
      '「忙しいから仕方ない」と睡眠を削っているとき、老化の時計が通常の3倍速で進んでいる可能性がある。疲れだけでなく、細胞レベルで損耗が起きている。',

    problemHeading: '睡眠を削ると「疲れる以上」のことが起きる',
    problemBody: `睡眠不足は翌日の眠気や疲労感で終わらない。慢性的な睡眠不足は、老化に直結する体の変化を引き起こす。

主な変化は3つある。①ストレスホルモン（コルチゾール）が低下しきれず翌日に持ち越される。②体の炎症を示す物質（IL-6など）が血中で上昇し、静かな炎症が続く状態になる。③成長ホルモンの分泌が減り、細胞の修復・再生が不完全になる。

これらが積み重なると、細胞の老化指標であるテロメアの短縮速度が上がることが大規模な調査研究で示されている。`,

    scienceHeading: '睡眠中に起きていること、止めてはいけない理由',
    scienceBody: `深い睡眠（最初の2〜3時間）の間に、成長ホルモンの80%以上が分泌される。この時間を削ると、コラーゲン産生・筋肉の合成・免疫細胞の増殖が低下する。

Irwin et al. (2016, Sleep Medicine Reviews) のまとめ研究では、睡眠に問題がある人は問題がない人に比べ、体の炎症マーカーが有意に高いことが複数の研究で示されている。

Walkerらの研究では、6時間以下の睡眠が続くと「一晩徹夜に近い認知機能の低下」が起きることが確認された。問題は「6時間でも平気」と自分では感じてしまうことにある。気づかないまま、ダメージだけが積み上がる。`,
    scienceStat: { value: '6時間以下', label: '炎症マーカーが有意上昇する慢性睡眠時間（Irwin 2016）' },

    solutionHeading: '最初の1本はグリシンと決めていい',
    solutionBody: `睡眠の質改善で研究が蓄積されている成分は複数あるが、最初に試す1本はグリシンで良い。就寝30分前に3g。副作用が少なく、入眠時間の短縮と深部体温の低下がRCTで確認されている。2週間試して変化を感じたら継続し、2週間で変化がなければマグネシウムを加える。

マグネシウムは睡眠ホルモン（メラトニン）産生と、脳の興奮を抑えるGABAという仕組みに関与する。グリシン酸型（マグネシウムグリシネート）は吸収が良く、お腹への影響も少ない。

アシュワガンダは、ストレスホルモンを下げることで睡眠の質を間接的に改善する。ストレスが多く眠れていない人には、グリシン＋アシュワガンダの組み合わせが最も合理的なスタートになる。`,

    ingredients: [
      {
        slug: 'glycine',
        nameJa: 'グリシン',
        reason: '就寝前3gで入眠時間の短縮・深部体温低下・翌朝の疲労感軽減がRCTで確認されている。副作用が少ない。',
        evidenceRank: 'A',
        urgencyNote: '睡眠の質が低い夜が続くほど、炎症マーカーの上昇は累積する。今夜から始められる最小の対策。',
        productName: 'Glycine Powder 1lb',
        productUrl: 'https://www.iherb.com/pr/now-foods-glycine-pure-powder-1-lb/730',
        productPlatform: 'iherb',
        productPriceJpy: 2200,
        productHighlight: '研究使用量を最安で確保',
      },
      {
        slug: 'magnesium-glycinate',
        nameJa: 'マグネシウムグリシネート',
        reason: 'マグネシウムはGABA受容体とメラトニン産生に関与。グリシン酸型は吸収率が高く消化器への影響が少ない。',
        evidenceRank: 'A',
        urgencyNote: '日本人の多くがマグネシウム不足。睡眠への影響だけでなく、ストレス対応力にも関与する。',
        productName: 'Magnesium Glycinate 180mg',
        productUrl: 'https://www.iherb.com/pr/now-foods-magnesium-glycinate-180-mg-180-tablets/118022',
        productPlatform: 'iherb',
        productPriceJpy: 3400,
        productHighlight: '吸収率が高い形態',
      },
      {
        slug: 'ashwagandha',
        nameJa: 'アシュワガンダ',
        reason: 'コルチゾールを低下させることで睡眠の質を間接的に改善。ストレスが多い人に特に有効。',
        evidenceRank: 'S',
        urgencyNote: 'ストレスが高い状態が続くほど、コルチゾールの慢性高止まりが睡眠・肌・代謝を同時に劣化させる。',
        productName: 'KSM-66 Ashwagandha 600mg',
        productUrl: 'https://www.iherb.com/pr/now-foods-ksm-66-ashwagandha-600-mg-90-veg-capsules/145913',
        productPlatform: 'iherb',
        productPriceJpy: 3200,
        productHighlight: 'RCTで最多使用エキス',
      },
    ],

    faqs: [
      {
        question: 'グリシンとマグネシウム、どちらを先に試すべきですか？',
        answer:
          'グリシンを先に試してください。コスパが良く副作用が少なく、効果が出るまでの期間が短い（1〜2週間）。3g/就寝30分前で試して変化を確認してからマグネシウムを加えると、何が効いたか分かります。',
      },
      {
        question: '何時間眠れば「老化を防ぐ」水準ですか？',
        answer:
          'NIHとWHOは成人に7〜9時間を推奨しています。Walker (2018) の研究では6時間以下の慢性睡眠不足が炎症マーカーの上昇と有意に関連。7時間以上確保することが、老化指標の観点からは最低ラインとされています。',
      },
      {
        question: 'メラトニンを飲めば解決しますか？',
        answer:
          'メラトニンは「入眠のタイミングをずらす」効果があり、時差ぼけや概日リズムの乱れには有効です。しかし睡眠の深さを改善する効果は限定的で、慢性的な睡眠の質改善には向いていません。グリシン・マグネシウムの方が深い睡眠への関与が研究で支持されています。',
      },
      {
        question: 'アルコールは睡眠の質に影響しますか？',
        answer:
          '入眠は速くなりますが、レム睡眠（夢を見る睡眠）が抑制され「深さ」が失われます。Thakkar et al. (2015) のレビューでは、少量のアルコールでも睡眠の後半（4時間以降）の質が有意に低下することが示されています。',
      },
    ],

    relatedIngredientSlugs: ['glycine', 'magnesium-glycinate', 'ashwagandha', 'magnesium', 'melatonin', 'l-theanine'],
  },

  // ── 3. NAD+/40代記事 ─────────────────────────────────────────────
  {
    slug: 'nad-40s',
    title: '40代から急に疲れやすくなった理由は「NAD+の低下」だった',
    description:
      '40代で感じる疲れやすさ・回復の遅さ・肌のくすみ。これらに共通する原因がNAD+（ニコチンアミドアデニンジヌクレオチド）の低下だという研究が増えている。メカニズムと補充方法を解説。',
    category: 'anti-aging',
    categoryLabel: '抗老化',
    publishedAt: '2026-04-17',
    readingMinutes: 6,
    heroStat: { value: '50%以下', label: '40〜60代でのNAD+残存量（20代比・複数研究の推定値）' },
    lossAversionHook:
      '40代で感じる疲れやすさ・回復の遅さ・肌のくすみ。これらが同じ原因から起きているとしたら、対策が根本から変わる。',

    problemHeading: '「20代と何かが違う」のはなぜか',
    problemBody: `40代になると、同じ運動でも翌日の回復が遅い、徹夜後の立ち直りが遅くなった、肌のくすみが取れにくくなった、という変化を感じる人が増える。これを「年だから仕方ない」で片付けるのは正確ではない。

近年の細胞研究で明らかになってきたのが、NAD+（ニコチンアミドアデニンジヌクレオチド）という補酵素の低下だ。体中の細胞に存在し、エネルギーを作る・DNAを修復する・老化の速度を調整するという3つの役割を持つ。`,

    scienceHeading: 'NAD+が減ると何が起きるか',
    scienceBody: `NAD+は加齢とともに低下し、40〜60代では20代比で50%以下になるとされる（Massudi et al., 2012; Zhu et al., 2015 ほか複数研究）。

減少が引き起こす変化は3つある。①ミトコンドリア（細胞のエンジン）がエネルギーをうまく作れなくなる→疲れやすさ・回復の遅さ。②DNAの修復が滞る→細胞のダメージが蓄積するスピードが上がる。③サーチュインという長寿遺伝子が機能不全になる→炎症が抑えられず、脂質代謝・テロメア維持が低下する。

これらの変化は互いに連鎖し、老化のスピードを加速させる。NAD+の前駆体（素材となる成分）を補充することで、血中NAD+が上昇することが複数のヒト試験で確認されている。`,
    scienceStat: { value: 'SIRT1〜7', label: 'NAD+依存性の長寿遺伝子。NAD+が枯渇すると機能しなくなる' },

    solutionHeading: 'まず試すならNR（ニコチンアミドリボシド）1択',
    solutionBody: `NAD+そのものを飲んでも消化管で分解されてしまうため、前駆体（材料）を補充する方法が研究されている。主な選択肢はNMN（ニコチンアミドモノヌクレオチド）とNR（ニコチンアミドリボシド）の2種類。

最初に試すならNRを選ぶ。ヒトを対象にした比較試験の数がNMNよりも多く、血中NAD+の上昇が複数の試験で再現性高く確認されている（Trammel et al., 2016; Remie et al., 2020 など）。NMNは動物実験での知見は豊富だが、ヒト試験はまだ蓄積中の段階。

「NMNとNRどっちが上か」という議論は現時点では決着がついていない。両者を詳しく比較したい場合は比較ページを参照してほしい。`,

    ingredients: [
      {
        slug: 'nicotinamide-riboside',
        nameJa: 'NR（ニコチンアミドリボシド）',
        reason: 'NAD+前駆体。ヒトRCTで血中NAD+の上昇が再現性高く確認されている。現時点でNMNより研究数が多い。',
        evidenceRank: 'A',
        urgencyNote: 'NAD+は今この瞬間も低下し続けている。40代に入ってから始めるのが遅いことはないが、早いほど累積ダメージを遅らせられる。',
        productName: 'Tru Niagen NR 300mg',
        productUrl: 'https://www.iherb.com/pr/tru-niagen-nicotinamide-riboside-300-mg-30-capsules/77781',
        productPlatform: 'iherb',
        productPriceJpy: 5400,
        productHighlight: 'ヒトRCT最多実績',
      },
      {
        slug: 'nmn',
        nameJa: 'NMN（ニコチンアミドモノヌクレオチド）',
        reason: 'NAD+の直接前駆体。動物実験での抗老化効果が豊富。ヒト試験では血中NAD+上昇が確認されている。',
        evidenceRank: 'B',
        urgencyNote: 'NRで効果を確認した後、NMNへの切り替えや追加を検討するのが合理的な順序。',
      },
    ],

    faqs: [
      {
        question: 'NMNとNRはどちらを選べばいいですか？',
        answer:
          '最初に試すならNRを推奨します。ヒトを対象にした試験の数がNMNよりも多く、再現性が確認されています（Trammel 2016, Remie 2020など）。NMNはDavid Sinclair教授らが研究に使用し注目を集めていますが、ヒト試験はまだ蓄積中です。詳細はNMN vs NR比較ページで確認できます。',
      },
      {
        question: '効果を感じるまでどのくらいかかりますか？',
        answer:
          'Remie et al. (2020, Nature Communications) のNR試験（1000mg/日、6週間）では骨格筋のNAD+は有意に上昇しましたが、主観的な疲労スコアには有意差が出ませんでした。感覚的な変化には個人差が大きく、3〜6ヶ月の継続が推奨されています。細胞レベルの変化は測定値に先に現れます。',
      },
      {
        question: '食事からNAD+を増やすことはできますか？',
        answer:
          'ナイアシン（ビタミンB3）やトリプトファンを含む食品（鶏肉・まぐろ・アボカドなど）はNAD+の材料を含みますが、食事だけで加齢による低下を補うには量が不足します。食事でベースを作り、不足分をサプリで補う組み合わせが現実的です。',
      },
      {
        question: 'レスベラトロールと組み合わせても良いですか？',
        answer:
          'レスベラトロールはサーチュイン活性化剤として研究されており、NAD+前駆体との組み合わせは理論上の相乗効果が期待されています。ただし組み合わせでのヒト試験は限られているため、単独で効果を確認してから追加するのが合理的です。',
      },
    ],

    relatedIngredientSlugs: ['nmn', 'nicotinamide-riboside', 'resveratrol', 'coq10', 'quercetin', 'spermidine'],
  },
]

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

/** 指定した成分slugを relatedIngredientSlugs に含む記事を返す */
export function getArticlesByIngredient(ingredientSlug: string): Article[] {
  return articles.filter((a) => a.relatedIngredientSlugs.includes(ingredientSlug))
}
