import type { Article } from './types'

export const articles: Article[] = [
  // ── 1. コラーゲン記事 ────────────────────────────────────────────
  {
    slug: 'collagen-question',
    title: '「コラーゲンを飲んでも意味ない」は本当か。RCTが示す答え',
    description:
      '「胃で分解されるから意味ない」は正しいのか。コラーゲンペプチドの吸収メカニズムとRCTの結果を論文で解説。効果的な選び方・飲み方も紹介。',
    category: 'skin',
    categoryLabel: '肌老化',
    publishedAt: '2026-04-17',
    readingMinutes: 5,
    heroStat: { value: '+28%', label: '皮膚弾力の改善（12週間RCT、Proksch 2014, n=69）' },
    lossAversionHook:
      '月3,000円のコラーゲンサプリを飲み続けている人の多くが、最も効果を落とす摂り方をしている。',

    problemHeading: '「飲んでも分解される」は本当か',
    problemBody: `コラーゲンを飲むと「胃腸でアミノ酸に分解されるだけで、皮膚には届かない」という話を見かける。直感的には正しそうに聞こえる。しかし、これは「加水分解型コラーゲン（コラーゲンペプチド）」には当てはまらない。

通常のコラーゲンを飲んだ場合は確かに消化酵素で分解されてしまう。問題はここではない。2010年代以降に研究が進んだのは、コラーゲンを事前に酵素処理して小さく切った「ペプチド型」だ。`,

    scienceHeading: '血中に届く、ということが研究で確認された',
    scienceBody: `Proksch et al. (2014, Skin Pharmacology and Physiology) のRCTでは、コラーゲンペプチド2.5g〜5g/日を12週間摂取した群で、プラセボ群に比べ皮膚弾力が統計的に有意に改善した（+28%、p<0.05、n=69）。

なぜ届くのか。加水分解コラーゲンはヒドロキシプロリンを含むジペプチド（Pro-Hyp等）として腸管から吸収される。これが皮膚の線維芽細胞に到達し、コラーゲン産生を刺激することが確認されている。「分解されるから届かない」は、加水分解型には当てはまらない。

ただし条件がある。効果が確認されているのは「加水分解型（ペプチド型）」だけ。製品の成分表示を確認する必要がある。`,
    scienceStat: { value: '2.5g〜5g', label: '効果が確認された1日の摂取量（Proksch 2014）' },

    solutionHeading: '選ぶポイントは2つだけ',
    solutionBody: `コラーゲンペプチドを選ぶときのチェックポイントは2つ。

①「加水分解型」または「ペプチド」と表示があるか。高分子コラーゲンは腸管からの吸収効率が低い。

②ビタミンCと同時摂取か。コラーゲン合成には酵素（プロリルヒドロキシラーゼ）の補因子としてビタミンCが必須。コラーゲンペプチドを摂取するときにビタミンCが欠乏していると、産生効率が大幅に低下する。この2つを守っていない場合、高価なサプリを飲んでいても効果が半減する可能性がある。`,

    ingredients: [
      {
        slug: 'collagen-peptide',
        nameJa: 'コラーゲンペプチド',
        reason: '皮膚弾力・ハリへの効果がRCT複数件で確認されている。加水分解型を選ぶこと。',
        evidenceRank: 'A',
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
          '特定の時間帯が決定的に有利というエビデンスはありません。毎日続けやすい時間帯（朝食時など）に摂取するのが現実的です。ただし、空腹時の方がペプチドの吸収が速いという報告もあります。',
      },
    ],

    relatedIngredientSlugs: ['collagen-peptide', 'vitamin-c-oral', 'bakuchiol', 'niacinamide'],
  },

  // ── 2. 睡眠×老化記事 ─────────────────────────────────────────────
  {
    slug: 'sleep-aging',
    title: '睡眠不足が老化を加速する。研究が示すメカニズムと3つの対策成分',
    description:
      '睡眠不足は「疲れる」だけでなく、テロメア短縮・慢性炎症・コルチゾール高止まりを引き起こし老化を加速する。研究が示すメカニズムと、睡眠の質を改善する3成分を解説。',
    category: 'sleep',
    categoryLabel: '睡眠・老化',
    publishedAt: '2026-04-17',
    readingMinutes: 6,
    heroStat: { value: '約3倍', label: '慢性睡眠不足でのテロメア短縮速度増加（大規模コホート研究）' },
    lossAversionHook:
      '「忙しいから仕方ない」と睡眠を削っているとき、老化の時計が通常の3倍速で進んでいる可能性がある。',

    problemHeading: '睡眠を削ると「疲れる以上」のことが起きる',
    problemBody: `睡眠不足は翌日の眠気や疲労感で終わらない。慢性的な睡眠不足は、老化に直結する生物学的な変化を引き起こす。

主な変化は3つある。①コルチゾール（ストレスホルモン）が低下しきれず翌日に持ち越される。②IL-6・TNF-αなどの炎症マーカーが上昇し、慢性炎症（Inflammaging）が促進される。③成長ホルモンの分泌が減少し、細胞修復・組織再生が不完全になる。

これらが積み重なると、テロメア（細胞の老化指標）の短縮速度が上がることが大規模コホート研究で示されている。`,

    scienceHeading: '睡眠中に起きていること、止めてはいけない理由',
    scienceBody: `睡眠の最初の深睡眠（徐波睡眠）フェーズで成長ホルモンの80%以上が分泌される。このフェーズを削ると、コラーゲン産生・筋タンパク質合成・免疫細胞の増殖が低下する。

Irwin et al. (2016, Sleep Medicine Reviews) のシステマティックレビューでは、睡眠障害がある人はない人に比べ、炎症マーカーの上昇リスクが有意に高いことが複数の研究で示されている。

Walker (2018) の研究では、6時間以下の睡眠が続くと「1晩の完全断眠に近い認知機能の低下」が起きることが確認された。問題は「6時間でも平気」と主観的に感じてしまうことにある。`,
    scienceStat: { value: '6時間以下', label: '慢性的な睡眠時間でIL-6が有意上昇（Irwin 2016）' },

    solutionHeading: '研究で確認された3成分：スタートはグリシンから',
    solutionBody: `睡眠の質改善でエビデンスが確認されている成分から、副作用が少なく研究が豊富なものを3つ挙げる。最初に試すなら「グリシン」が合理的な選択。就寝30分前に3gで入眠時間の短縮と深部体温の低下が確認されている。

マグネシウム（グリシン酸マグネシウム）は睡眠ホルモン（メラトニン）産生とGABA受容体への関与が研究で示されており、ストレスが多い人に特に推奨される。アシュワガンダはコルチゾールを低下させることで間接的に睡眠の質を改善する。3成分は同時に始める必要はなく、1つずつ効果を確認しながら加えるのが現実的なアプローチ。`,

    ingredients: [
      {
        slug: 'glycine',
        nameJa: 'グリシン',
        reason: '就寝前3gで入眠時間の短縮・深部体温低下・翌朝の疲労感軽減がRCTで確認されている。副作用が少ない。',
        evidenceRank: 'A',
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
        productName: 'KSM-66 Ashwagandha 600mg',
        productUrl: 'https://www.iherb.com/pr/now-foods-ksm-66-ashwagandha-600-mg-90-veg-capsules/145913',
        productPlatform: 'iherb',
        productPriceJpy: 3200,
        productHighlight: 'RCTで最多使用エキス',
      },
    ],

    faqs: [
      {
        question: '何時間眠れば「老化を防ぐ」水準ですか？',
        answer:
          'NIHとWHOは成人に7〜9時間を推奨しています。Walker (2018) の研究では6時間以下の慢性睡眠不足が炎症マーカーの上昇と有意に関連。7時間以上確保することが、老化指標の観点からは最低ラインとされています。',
      },
      {
        question: 'グリシンとマグネシウム、どちらを先に試すべきですか？',
        answer:
          'コスパと副作用の少なさから、グリシン（3g/就寝30分前）を先に試すことを推奨します。1〜2週間で入眠の変化を感じるかどうか確認してから、マグネシウムを追加するのが合理的なアプローチです。',
      },
      {
        question: 'メラトニンを飲めば解決しますか？',
        answer:
          'メラトニンは「入眠のタイミングをずらす」効果があり、時差ぼけや概日リズムの乱れには有効です。しかし睡眠の深さ（徐波睡眠）を改善する効果は限定的で、慢性的な睡眠の質改善には向いていません。グリシン・マグネシウムの方が深睡眠への関与が研究で支持されています。',
      },
      {
        question: 'アルコールは睡眠の質に影響しますか？',
        answer:
          '入眠は速くなりますが、REM睡眠が抑制され「深さ」が失われます。Thakkar et al. (2015) のレビューでは、少量のアルコールでも睡眠の後半（4時間以降）の質が有意に低下することが示されています。',
      },
    ],

    relatedIngredientSlugs: ['glycine', 'magnesium-glycinate', 'ashwagandha', 'magnesium', 'melatonin', 'l-theanine'],
  },

  // ── 3. NAD+/40代記事 ─────────────────────────────────────────────
  {
    slug: 'nad-40s',
    title: '40代から体が急に変わる理由は「NAD+の枯渇」だった',
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

近年の細胞老化研究で明らかになってきたのが、NAD+（ニコチンアミドアデニンジヌクレオチド）という補酵素の低下だ。この分子は全身の細胞に存在し、エネルギー代謝・DNA修復・抗老化遺伝子（サーチュイン）の活性化に不可欠な役割を持つ。`,

    scienceHeading: 'NAD+が枯渇すると何が起きるか',
    scienceBody: `NAD+は加齢とともに低下し、40〜60代では20代比で50%以下になるとされる（Massudi et al., 2012; Zhu et al., 2015 ほか複数研究）。

低下による影響は3つの経路で現れる。①ミトコンドリアのエネルギー産生（ATP合成）の効率低下→疲れやすさ・回復の遅さ。②DNA修復酵素（PARP）の活性低下→細胞ダメージの蓄積速度が上がる。③サーチュイン（SIRT1〜7）が機能不全→炎症抑制・脂質代謝・テロメア維持が低下する。

これらの変化は互いに連鎖し、老化のスピードを加速させる。NAD+前駆体（NMN・NR）は経口投与で血中NAD+を上昇させることが複数のヒト試験で確認されている。`,
    scienceStat: { value: 'SIRT1〜7', label: 'NAD+依存性の長寿遺伝子。NAD+が枯渇すると機能不全になる' },

    solutionHeading: 'NAD+を補充する方法：前駆体サプリメント',
    solutionBody: `NAD+そのものを飲んでも消化管で分解されてしまうため、前駆体（材料）を補充する方法が研究されている。主な選択肢はNMN（ニコチンアミドモノヌクレオチド）とNR（ニコチンアミドリボシド）の2種類。

NRはRCTの数がやや多い（Trammel et al., 2016; Remie et al., 2020 など）。NMNは動物実験での効果は多く確認されており、ヒト試験も進んでいる。どちらもNAD+前駆体として機能するが、吸収経路が異なるため「一方が確実に上」とは言えない段階。

まず試すならどちらでも良いが、費用対効果ではNRが研究実績で若干リードしている。詳細な比較はNMN vs NRの比較ページで確認できる。`,

    ingredients: [
      {
        slug: 'nmn',
        nameJa: 'NMN',
        reason: 'NAD+の直接前駆体。ヒト試験で血中NAD+上昇が確認されている。動物実験での抗老化効果が豊富。',
        evidenceRank: 'B',
        productName: 'NMN（β-ニコチンアミドモノヌクレオチド）250mg',
        productUrl: 'https://www.iherb.com/pr/tru-niagen-nicotinamide-riboside-300-mg-30-capsules/77781',
        productPlatform: 'iherb',
        productPriceJpy: 6800,
        productHighlight: '動物実験最多使用フォーム',
      },
      {
        slug: 'nicotinamide-riboside',
        nameJa: 'NR（ニコチンアミドリボシド）',
        reason: 'NAD+前駆体。ヒトRCTでNAD+上昇が再現性高く確認されている。NMNより研究数が多い。',
        evidenceRank: 'A',
        productName: 'Tru Niagen NR 300mg',
        productUrl: 'https://www.iherb.com/pr/tru-niagen-nicotinamide-riboside-300-mg-30-capsules/77781',
        productPlatform: 'iherb',
        productPriceJpy: 5400,
        productHighlight: 'ヒトRCT最多実績',
      },
    ],

    faqs: [
      {
        question: 'NMNとNRはどちらを選べばいいですか？',
        answer:
          '現時点ではNRのヒトRCTがやや多く、再現性も高い（Trammel 2016, Remie 2020など）。NMNはDavid Sinclair教授らが研究に使用し注目を集めているが、ヒト試験はまだ蓄積中。費用対効果ではNR、研究の注目度ではNMN、という状況です。詳しくはNMN vs NR比較ページを参照してください。',
      },
      {
        question: '効果を感じるまでどのくらいかかりますか？',
        answer:
          'Remie et al. (2020, Nature Communications) のNR RCT（1000mg/日、6週間）では骨格筋NAD+は有意上昇しましたが、主観的な疲労スコアには有意差が出ませんでした。感覚的な変化には個人差が大きく、3〜6ヶ月の継続が推奨されています。「効果を感じないから無意味」ではなく、細胞レベルの変化は測定値に先に現れます。',
      },
      {
        question: '食事からNAD+を増やすことはできますか？',
        answer:
          'ナイアシン（ビタミンB3）やトリプトファンを含む食品（鶏肉・まぐろ・アボカドなど）はNAD+前駆体を含みますが、食事だけで加齢による低下を補うには量が不足します。サプリメントとの組み合わせが現実的なアプローチです。',
      },
      {
        question: 'レスベラトロールと組み合わせても良いですか？',
        answer:
          'レスベラトロールはサーチュイン活性化剤として研究されており、NAD+前駆体との組み合わせは理論上の相乗効果が期待されています。David Sinclair教授の研究プロトコルでも両者を組み合わせています。ただし、組み合わせでのヒトRCTは限られているため、単独での効果確認後に追加するのが合理的です。',
      },
    ],

    relatedIngredientSlugs: ['nmn', 'nicotinamide-riboside', 'resveratrol', 'coq10', 'quercetin', 'spermidine'],
  },
]

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}
