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
  // ── 美白・色素沈着（追加） ──────────────────────
  ['kojic-acid',           'vitamin-c-topical'],
  // ── GSC機会回収バッチ 2026-05-07 ───────────────
  ['niacinamide',          'collagen-peptide'],
  ['acetyl-l-carnitine',   'creatine'],
  ['l-theanine',           'magnesium'],
  ['equol',                'collagen-peptide'],
  ['bakuchiol',            'niacinamide'],
  ['arbutin',              'niacinamide'],
  // ── A3 復活バッチ 2026-05-09 ───────────────
  // /compare/l-carnitine-vs-creatine は本番で 404 を返していたが
  // GSC で imp 38 / pos 5-10（カルニチン クレアチン 違い 系の generic KW）と
  // A1 (acetyl-l-carnitine-vs-creatine) より良い順位で機会損失中だった
  ['l-carnitine',          'creatine'],
  // ── A7 復活バッチ 2026-05-09 ───────────────
  // /compare/l-citrulline-vs-creatine は本番404・既存 creatine-vs-l-citrulline と並列共存
  // GSC で imp 21 / pos 4.2（シトルリン クレアチン 違い・最強順位）の死にページ
  ['l-citrulline',         'creatine'],
  // ── A9 復活バッチ 2026-05-09 ───────────────
  // /compare/glutathione-vs-niacinamide は本番404・既存 article guide とKWクラスタ重複
  // GSC で imp 11 / pos 7-9.3（グルタチオン ナイアシンアミド 違い系4KW）
  ['glutathione',          'niacinamide'],
  // ── Session F Day 1 バッチ 2026-05-11 ───────────────
  // 比較ページ拡充：target_kws_300 + Sprint 5 §4.5 指定（PDRN系・トラネキサム酸×ナイアシンアミド他）
  // F1：トラネキサム酸 × ナイアシンアミド（美白プラスミン経路 × メラノソーム転移阻害・ANUA TXA4+Nia10併用処方が市販実在）
  ['tranexamic-acid',      'niacinamide'],
  // F2：PDRN × ヒアルロン酸（韓国コスメ再生×保湿・ANUA PDRN Hyaluron Serum 同時配合実在）
  ['pdrn',                 'hyaluronic-acid'],
  // F3：マカ × アシュワガンダ（アダプトゲン同士・性機能/エネルギー文脈の独占フロンティア）
  ['maca',                 'ashwagandha'],
  // ── Sprint 1 Session A Day 2 バッチ 2026-05-12 ───────────────
  // 壊滅cluster大開拓 Day 2：iron/vit-C/folic-acid/vit-D の比較-target KW回収用
  // A2-1：経口ビタミンC × 外用ビタミンC（経口C vs 外用C・シミ美肌の役割分担覚醒）
  ['vitamin-c-oral',       'vitamin-c-topical'],
  // A2-2：葉酸 × 鉄（妊活鉄葉酸 タイミング・併用・妊婦サプリ独占）
  ['folic-acid',           'iron'],
  // A2-3：葉酸 × ビタミンB12（認知機能・ホモシステイン・メチル化サイクル・MTHFR遺伝子多型）
  ['folic-acid',           'vitamin-b12'],
  // A2-4：ビタミンD × カルシウム（骨粗鬆症・骨密度・転倒予防の補完関係 NEJM 2006 n=36,282）
  ['vitamin-d',            'calcium'],
  // ── Sprint 1 Session B Day 5 バッチ 2026-05-13 ───────────────
  // B5：ナイアシンアミド × パルミトイルトリペプチド（ヒトRCT実績 vs メーカー試験中心ペプチド・ペプチド比較 broad KW）
  ['niacinamide',          'palmitoyl-tripeptide'],
  // ── Sprint 2 バッチ 2026-05-12 ───────────────
  // S2-1：ルテイン × ゼアキサンチン（AREDS2 10:2比・黄斑色素・スマホ眼疲労・新規compare候補）
  ['lutein',               'zeaxanthin'],
  // ── Sprint 3 Session F Day 9 バッチ 2026-05-13 ───────────────
  // F9-5：ラメルテオン × メラトニン（処方薬 × サプリの規制区分差・薬機法最厳格・本サイト推奨スタンスなし）
  ['ramelteon',            'melatonin'],
  // ── Sprint 3 Session F Day 13 バッチ 2026-05-14（バグ修復・POPULAR_PAIRS追加漏れ補完） ───────────────
  // F13-1：トラネキサム酸 × ビタミンC外用（プラスミン阻害×多経路抗酸化・肝斑MASIスコア改善・処方薬境界）
  ['tranexamic-acid',      'vitamin-c-topical'],
  // F13-2：クルクミン × ボスウェリア（TNF-α/NF-κB多経路×5-LOX単経路・OA WOMAC・吸収型製剤）
  ['curcumin',             'boswellia'],
  // ── Sprint 3 Session F Day 14 バッチ 2026-05-15（新規pair拡張フェーズ・3件・supplement/skin横断デー） ───────────────
  // F14-1：ビタミンD × オメガ3（脂溶性必須2強・VITAL NEJM 2019 n=25,871・REDUCE-IT n=8,179）
  ['vitamin-d',            'omega3'],
  // F14-2：PDRN × コラーゲンペプチド（サーモンDNA注射A2A受容体×経口Pro-Hyp真皮シグナル）
  ['pdrn',                 'collagen-peptide'],
  // F14-3：ルテイン × アスタキサンチン（AREDS2 JAMA 2013 n=4,203 黄斑×Tominaga 2017 肌弾力）
  ['lutein',               'astaxanthin'],
  // ── Sprint 3 Session F Day 11-15 バッチ 2026-05-15（mid-funnel KW回収・AIO耐性高・+25 pair一括拡張） ───────────────
  // ── skin系（+8 pair）────────────────────────────
  // X3-1：バクチオール × トラネキサム酸（妊娠中レチノール代替×プラスミン阻害美白・両者妊娠中比較的安全）
  ['bakuchiol',            'tranexamic-acid'],
  // X3-2：ヒアルロン酸 × 経口セラミド（外用保湿×経口バリア・JDS 2017 RCT n=63）
  ['hyaluronic-acid',      'ceramide-oral'],
  // X3-3：グルタチオン × 経口ビタミンC（経口美白2大成分・Arjinpathana 2012 n=60 vs Cochrane 2013）
  ['glutathione',          'vitamin-c-oral'],
  // X3-4：亜鉛 × アゼライン酸（ニキビ対決・内服vs外用・Dreno 2001 RCT n=332 / Pochi 1986 RCT n=251）
  ['zinc',                 'azelaic-acid'],
  // X3-5：レチノール × ビタミンE（脂溶性ビタミン対決・抗酸化補完・Kafi 2007 vs Tanaydin 2016）
  ['retinol',              'vitamin-e'],
  // X3-6：フェルラ酸 × ナイアシンアミド（抗酸化シールド×多経路・併用補完）
  ['ferulic-acid',         'niacinamide'],
  // X3-7：センテラアジアチカ × パンテノール（CICA二大成分・Ratz-Łyko 2016 vs Ebner 2002）
  ['centella-asiatica',    'panthenol'],
  // X3-8：アゼライン酸 × ビタミンC外用（美白多機能vs抗酸化美白・JDT 2020 hydroquinone同等）
  ['azelaic-acid',         'vitamin-c-topical'],
  // ── gut/microbiome系（+5 pair）────────────────────
  // X3-9：S. boulardii × LGG（酵母vs乳酸菌・抗生剤関連下痢・McFarland 2010 vs Hojsak 2010）
  ['s-boulardii',          'l-rhamnosus-gg'],
  // X3-10：イヌリン × サイリウム（水溶性食物繊維対決・プレバイオvsベルク形成・SCFAs vs LDL低下）
  ['inulin',               'psyllium'],
  // X3-11：酪酸 × レジスタントスターチ（短鎖脂肪酸・既製品vs前駆体・Donohoe 2011 vs Topping 2003）
  ['butyrate',             'resistant-starch'],
  // X3-12：L-グルタミン × カルノシン（腸粘膜vsペプチド抗糖化・Rao 2012 vs Hipkiss 2009）
  ['l-glutamine',          'carnosine'],
  // X3-13：アッカーマンシア × イヌリン（次世代プロバイオ×プレバイオ・Depommier 2019 vs Dewulf 2013）
  ['akkermansia',          'inulin'],
  // ── sports/men's系（+5 pair）─────────────────────
  // X3-14：β-アラニン × L-シトルリン（持久力vsパンプ・Hoffman 2008 vs Bailey 2010）
  ['beta-alanine',         'l-citrulline'],
  // X3-15：トンカットアリ × アシュワガンダ（男性活力アダプトゲン・Talbott 2013 vs Lopresti 2019）
  ['tongkat-ali',          'ashwagandha'],
  // X3-16：トリブルス × トンカットアリ（男性活力2大ハーブ・Pokrywka 2014 vs Tambi 2012）
  ['tribulus-terrestris',  'tongkat-ali'],
  // X3-17：クレアチン × β-アラニン（筋力ATP×持久力カルノシン・Kreider 2017 vs Hoffman 2008 併用補完）
  ['creatine',             'beta-alanine'],
  // X3-18：ファドジア × トンカットアリ（新興男性活力・Lawal 2017 動物試験 vs Tambi 2012 ヒトRCT）
  ['fadogia-agrestis',     'tongkat-ali'],
  // ── sleep/cognitive系（+4 pair）───────────────────
  // X3-19：アルファGPC × シチコリン（コリン源2大成分・Bellar 2015 vs Silveri 2008）
  ['alpha-gpc',            'citicoline'],
  // X3-20：マグネシウム L-スレオネート × グリシン酸塩（脳到達Mgvs神経弛緩Mg・Slutsky 2010 vs Abbasi 2012）
  ['magnesium-l-threonate','magnesium-glycinate'],
  // X3-21：5-HTP × サフラン（セロトニン前駆体vs気分・Birdsall 1998 vs Lopresti 2014）
  ['5-htp',                'saffron'],
  // X3-22：イチョウ葉 × アルファGPC（脳血流vsコリン・Le Bars 1997 vs Bellar 2015）
  ['ginkgo-biloba',        'alpha-gpc'],
  // ── maternal/fertility系（+3 pair・YMYL高）──────
  // X3-23：葉酸 × 活性型葉酸メチル葉酸（MTHFR遺伝子多型対応・モノグルタミン酸vs5-MTHF）
  ['folic-acid',           'methyl-folate'],
  // X3-24：鉄 × ビタミンC（吸収率2-3倍・Hallberg 1989 / Cook 2001 経典スタック）
  ['iron',                 'vitamin-c-oral'],
  // X3-25：メチル葉酸 × ビタミンB12（メチル化サイクル補完・Smith 2010 Oxford VITACOG）
  ['methyl-folate',        'vitamin-b12'],
  // ── Sprint 3 Session F Day 16-20 バッチ 2026-05-16（mid-funnel KW 第2波・新ルール準拠執筆） ───────────────
  // skin系（+6 pair）
  ['tranexamic-acid',      'glutathione'],
  ['niacinamide',          'ceramide'],
  ['centella-asiatica',    'bisabolol'],
  ['panthenol',            'bisabolol'],
  ['retinol',              'tranexamic-acid'],
  ['ceramide',             'bisabolol'],
  // antiaging系（+4 pair）
  ['spermidine',           'urolithin-a'],
  ['pterostilbene',        'fisetin'],
  ['nmn',                  'spermidine'],
  ['sulforaphane',         'quercetin'],
  // sleep/cognitive系（+4 pair）
  ['melatonin',            'magnesium-l-threonate'],
  ['bacopa-monnieri',      'rhodiola'],
  ['lions-mane',           'citicoline'],
  ['phosphatidylserine',   'citicoline'],
  // hormone系（+4 pair）
  ['dhea',                 'pregnenolone'],
  ['holy-basil',           'ashwagandha'],
  ['mucuna-pruriens',      'tongkat-ali'],
  ['saffron',              'ashwagandha'],
  // supplement系（+4 pair）
  ['iron',                 'vitamin-b12'],
  ['nicotinamide-riboside','resveratrol'],
  ['hesperidin',           'quercetin'],
  ['omega3',               'coq10'],
  // gut系（+3 pair）
  ['probiotics',           'l-rhamnosus-gg'],
  ['akkermansia',          's-boulardii'],
  ['butyrate',             'akkermansia'],
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
  // Sprint 1 Session A Day 2（補完関係ペア・目的別判断を促す）
  'vitamin-c-oral-vs-vitamin-c-topical',
  'folic-acid-vs-iron',
  'folic-acid-vs-vitamin-b12',
  'vitamin-d-vs-calcium',
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
  // 美白・色素沈着（skin系）
  'kojic-acid-vs-vitamin-c-topical':     'skin',
  // GSC機会回収バッチ 2026-05-07
  'niacinamide-vs-collagen-peptide':     'skin',
  'acetyl-l-carnitine-vs-creatine':      'muscle',
  'l-theanine-vs-magnesium':             'stress',
  'equol-vs-collagen-peptide':           'hormone',
  'bakuchiol-vs-niacinamide':            'skin',
  'arbutin-vs-niacinamide':              'skin',
  // A3 復活バッチ 2026-05-09
  'l-carnitine-vs-creatine':             'muscle',
  // A7 復活バッチ 2026-05-09
  'l-citrulline-vs-creatine':            'muscle',
  // A9 復活バッチ 2026-05-09
  'glutathione-vs-niacinamide':          'skin',
  // Session F Day 1 バッチ 2026-05-11
  'tranexamic-acid-vs-niacinamide':      'skin',
  'pdrn-vs-hyaluronic-acid':             'skin',
  'maca-vs-ashwagandha':                 'hormone',
  // Sprint 1 Session A Day 2 バッチ 2026-05-12（壊滅cluster大開拓 Day 2）
  'vitamin-c-oral-vs-vitamin-c-topical': 'skin',
  'folic-acid-vs-iron':                  'supplement',
  'folic-acid-vs-vitamin-b12':           'supplement',
  'vitamin-d-vs-calcium':                'supplement',
  // Sprint 1 Session B Day 5 バッチ 2026-05-13
  'niacinamide-vs-palmitoyl-tripeptide': 'skin',
  // Sprint 2 バッチ 2026-05-12
  'lutein-vs-zeaxanthin':                'supplement',
  // Sprint 3 Session F Day 9 バッチ 2026-05-13（ramelteon-vs-melatonin 新規追加・規制区分差の整理スタンス）
  'ramelteon-vs-melatonin':              'stress',
  // Sprint 3 Session F Day 13 バッチ 2026-05-14（新規2件・skin美白YMYL/joint抗炎症・並行Day 12補完v2で3件先取り回避→ユニーク貢献2件のみ）
  'tranexamic-acid-vs-vitamin-c-topical': 'skin',
  'curcumin-vs-boswellia':                'joint',
  // Sprint 3 Session F Day 14 バッチ 2026-05-15（新規pair拡張フェーズ完全突入・3件新規・supplement/skin横断デー・chlorella/pumpkin-seed成分なしの2件はドロップ）
  'vitamin-d-vs-omega3':                  'supplement',
  'pdrn-vs-collagen-peptide':             'skin',
  'lutein-vs-astaxanthin':                'supplement',
  // ── Sprint 3 Session F Day 11-15 バッチ 2026-05-15（mid-funnel KW回収・AIO耐性高・+25 pair一括拡張） ───────────────
  // skin系（+8 pair）
  'bakuchiol-vs-tranexamic-acid':          'skin',
  'hyaluronic-acid-vs-ceramide-oral':      'skin',
  'glutathione-vs-vitamin-c-oral':         'skin',
  'zinc-vs-azelaic-acid':                  'skin',
  'retinol-vs-vitamin-e':                  'skin',
  'ferulic-acid-vs-niacinamide':           'skin',
  'centella-asiatica-vs-panthenol':        'skin',
  'azelaic-acid-vs-vitamin-c-topical':     'skin',
  // gut/microbiome系（+5 pair）
  's-boulardii-vs-l-rhamnosus-gg':         'gut',
  'inulin-vs-psyllium':                    'gut',
  'butyrate-vs-resistant-starch':          'gut',
  'l-glutamine-vs-carnosine':              'gut',
  'akkermansia-vs-inulin':                 'gut',
  // sports/men's系（+5 pair）
  'beta-alanine-vs-l-citrulline':          'muscle',
  'tongkat-ali-vs-ashwagandha':            'hormone',
  'tribulus-terrestris-vs-tongkat-ali':    'hormone',
  'creatine-vs-beta-alanine':              'muscle',
  'fadogia-agrestis-vs-tongkat-ali':       'hormone',
  // sleep/cognitive系（+4 pair）
  'alpha-gpc-vs-citicoline':               'cognitive',
  'magnesium-l-threonate-vs-magnesium-glycinate': 'stress',
  '5-htp-vs-saffron':                      'stress',
  'ginkgo-biloba-vs-alpha-gpc':            'cognitive',
  // maternal/fertility系（+3 pair・YMYL高）
  'folic-acid-vs-methyl-folate':           'supplement',
  'iron-vs-vitamin-c-oral':                'supplement',
  'methyl-folate-vs-vitamin-b12':          'supplement',
  // ── Sprint 3 Session F Day 16-20 バッチ 2026-05-16（mid-funnel KW 第2波・新ルール準拠執筆） ───────────────
  // skin系（+6 pair）
  'tranexamic-acid-vs-glutathione':        'skin',
  'niacinamide-vs-ceramide':               'skin',
  'centella-asiatica-vs-bisabolol':        'skin',
  'panthenol-vs-bisabolol':                'skin',
  'retinol-vs-tranexamic-acid':            'skin',
  'ceramide-vs-bisabolol':                 'skin',
  // antiaging系（+4 pair）
  'spermidine-vs-urolithin-a':             'antiaging',
  'pterostilbene-vs-fisetin':              'antiaging',
  'nmn-vs-spermidine':                     'antiaging',
  'sulforaphane-vs-quercetin':             'antiaging',
  // sleep/cognitive系（+4 pair）
  'melatonin-vs-magnesium-l-threonate':    'stress',
  'bacopa-monnieri-vs-rhodiola':           'cognitive',
  'lions-mane-vs-citicoline':              'cognitive',
  'phosphatidylserine-vs-citicoline':      'cognitive',
  // hormone系（+4 pair）
  'dhea-vs-pregnenolone':                  'hormone',
  'holy-basil-vs-ashwagandha':             'stress',
  'mucuna-pruriens-vs-tongkat-ali':        'hormone',
  'saffron-vs-ashwagandha':                'stress',
  // supplement系（+4 pair）
  'iron-vs-vitamin-b12':                   'supplement',
  'nicotinamide-riboside-vs-resveratrol':  'antiaging',
  'hesperidin-vs-quercetin':               'supplement',
  'omega3-vs-coq10':                       'supplement',
  // gut系（+3 pair）
  'probiotics-vs-l-rhamnosus-gg':          'gut',
  'akkermansia-vs-s-boulardii':            'gut',
  'butyrate-vs-akkermansia':               'gut',
}

/** ペア別SEOメタデータオーバーライド（高順位ページのCTR改善用） */
export const PAIR_SEO: Record<string, { title: string; description: string }> = {
  'glutathione-vs-niacinamide': {
    title: 'グルタチオン vs ナイアシンアミド｜経口×外用の違い・どっちが論文で美白に効く？',
    description: 'グルタチオン（経口500mg/日・¥3,000-8,000/月）とナイアシンアミド（外用5%・¥2,000-5,000/月）の違いを論文で比較。グルタチオンは経口・点滴で「飲む美白」、ナイアシンアミドは外用化粧品で表皮にアプローチと作用形態が完全に異なる。エビデンス強度はナイアシンアミド外用＞グルタチオン経口で（Bissett 2005 RCT vs Arjinpathana 2012 RCT・Sonthalia 2018 reviewで吸収率問題指摘）、論文ベースの優先順位はナイアシンアミド外用が先。グルタチオン点滴と経口の効果差、効果が出るまで、肌タイプ別のコスパ判断を化粧品メーカー視点で解説。',
  },
  'arbutin-vs-azelaic-acid': {
    title: 'α-アルブチン × アゼライン酸｜併用OK？濃度・順番・刺激リスクを論文で比較',
    description: 'α-アルブチン（2%・刺激ほぼなし）とアゼライン酸（10〜20%・軽度の刺激あり）の併用・違いを論文で比較。両者ともチロシナーゼ阻害でメラニン産生を抑える経路を共有しつつ、アゼライン酸は抗炎症＋抗菌でニキビにも作用する補完関係。朝はα-アルブチン・夜はアゼライン酸の朝晩使い分けが刺激リスク分離に有効。効果が出るまで（α-アルブチン8-12週・アゼライン酸4-12週）、肌タイプ別の優先順位、月コストを化粧品メーカー視点で解説。',
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
    title: 'ナイアシンアミド vs パントテン酸（B5）｜違い・併用・ニキビ/敏感肌での使い分けを論文で比較',
    description: 'ナイアシンアミド（ビタミンB3・外用5%）とパントテン酸（ビタミンB5・パンテノール 1-5%）の違いを論文で比較。\n\nナイアシンアミドは表皮でメラニン輸送阻害・バリア機能強化・抗炎症の3方面に作用（Hakozaki 2002 RCT 5%×8週で色素沈着改善・Bissett 2005 で小じわ改善）、パントテン酸（D-パンテノール）はCoA前駆体として角質層の水分保持・上皮再生・修復シグナルに作用（Ebner 2002 D-パンテノール5%で皮膚バリア機能改善・Yang 2018 で創傷治癒促進報告）。\n\n作用ターゲットが表皮ケラチノサイトの代謝経路（B3）vs バリア・修復経路（B5）で異なる補完関係で、両者は併用が論文上。経口B5はニキビ高用量療法（10g/日 Lit-Hung Leung 1995 オープン試験）の議論がありますが、現代の論文では「経口B5は脂質代謝関連の弱いエビデンス・外用パンテノールの方が安定」と整理。有効濃度・効果が出るまで（ナイアシンアミド 4-8週・パンテノール 2-4週）、ニキビ・敏感肌・乾燥肌での使い分け、妊娠中の安全性、CICA製品（パンテノール+センテラ配合）との位置づけを化粧品メーカー視点で解説。',
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
    title: '亜鉛 vs ビオチン｜どっちを選ぶ？薄毛・爪・肌の悩み別判断と併用を論文で比較',
    description: '亜鉛（8〜11mg/日）とビオチン（30〜100μg/日）の違いと選び方を論文で比較。亜鉛は300以上の酵素に関わる必須ミネラルで創傷治癒・免疫・男性ホルモン代謝に関与、ビオチンはケラチン合成の補酵素で爪・髪の構造に直結。「亜鉛 ビオチン どっち」という二択思考になりがちですが、論文ベースでは「薄毛・抜け毛・男性ホルモン関連なら亜鉛」「爪割れ・脆い爪なら亜鉛またはビオチン（欠乏なら両方）」「肌荒れ・ニキビなら亜鉛」「ベジタリアン/卵白生食常用ならビオチン」という悩み別判断が現実的です。両者は吸収競合がほぼなく併用OK、亜鉛長期高用量（40mg/日超）での銅欠乏リスク、ビオチンの甲状腺検査値偽異常リスク、効果が出るまで（亜鉛 2-8週・ビオチン 4-26週）、食事だけで足りるか、おすすめメーカー・コスパを化粧品メーカー視点で解説。',
  },
  'creatine-vs-l-citrulline': {
    title: 'クレアチンvs Lシトルリン｜筋トレ・パンプの使い分けを論文比較',
    description: 'クレアチンとLシトルリンを論文で比較。クレアチンはATP再合成で筋力・パワー向上、シトルリンは血流・パンプ感・乳酸クリアランス改善。両者は補完関係で併用OK。有効量、効果が出る時間、副作用、男女別の優先度を化粧品メーカー視点で解説。',
  },
  'nmn-vs-coq10': {
    title: 'NMN vs コエンザイムQ10｜違い・どちらから始める？論文で比較',
    description: 'NMN（250〜500mg/日・¥6,000-12,000/月）とコエンザイムQ10（100〜200mg/日・¥1,000-3,000/月）の違いを論文で比較。NMNはNAD+前駆体でサーチュイン活性化・細胞代謝（Yoshino 2021 RCTで血中NAD+上昇確認）、CoQ10はミトコンドリア電子伝達系の電子運搬体でエネルギー産生・抗酸化に必須。30代前半はCoQ10から、30代後半以降はNMN追加検討が論文上の優先順位。年齢別の判断、効果が出るまで、併用可否、価格10倍差のコスパ判断、副作用を化粧品メーカー視点で解説。',
  },
  'creatine-vs-magnesium': {
    title: 'クレアチン × マグネシウム｜併用・タイミング・形態選びを論文で比較',
    description: 'クレアチン（3〜5g/日）とマグネシウム（300〜400mg/日）の併用・違いを論文で比較。クレアチンはATP再合成で筋力・パワー向上、マグネシウムは ATP-Mg 複合体形成に必須でクレアチンの作用基盤を支える補完関係。形態別マグネシウム（グリシネート＝睡眠/クエン酸＝吸収/酸化＝便通）の使い分け、朝晩のタイミング、運動と回復の最適スタック、マグネシウム不足時の影響を化粧品メーカー視点で解説。',
  },
  'glucosamine-vs-chondroitin': {
    title: 'グルコサミンvs コンドロイチン｜関節サプリの使い分け論文比較',
    description: 'グルコサミンとコンドロイチンを論文で比較。グルコサミンは軟骨基質グリコサミノグリカン前駆体、コンドロイチンは軟骨水分保持・弾力に関与。GAIT試験等のメタ解析、併用vs単独の効果差、運動負荷別の優先度、変形性膝関節症への現実的な期待値を化粧品メーカー視点で解説。',
  },
  'tmg-vs-nmn': {
    title: 'TMGvs NMN｜メチル基ドナーvsNAD+前駆体の使い分け',
    description: 'TMG（トリメチルグリシン・ベタイン）とNMN（ニコチンアミドモノヌクレオチド）を論文で比較。TMGはホモシステイン低下のメチル基ドナー、NMNはNAD+前駆体でサーチュイン活性化。両者は「メチル化サイクル」で接続する補完関係（NMN代謝でメチル基消費・TMGが補う）。有効量、効果が出るまで、抗老化スタックでの使い分けを化粧品メーカー視点で解説。',
  },
  'kojic-acid-vs-vitamin-c-topical': {
    title: 'コウジ酸vs ビタミンC（外用）｜美白の使い分けを論文比較',
    description: 'コウジ酸とビタミンC（外用・アスコルビン酸誘導体）を論文で比較。コウジ酸はチロシナーゼ阻害で色素沈着への作用、ビタミンCは抗酸化＋コラーゲン生成促進＋メラニン抑制の3経路。低濃度から始める順序、刺激リスク、併用可否、肝斑への現実的な期待値を化粧品メーカー視点で解説。',
  },
  'niacinamide-vs-collagen-peptide': {
    title: 'ナイアシンアミド vs ペプチド（コラーゲンペプチド）｜違い・併用・外用×経口の使い分けを論文で比較',
    description: 'ナイアシンアミド（外用5%・Bissett 2005 RCT）とコラーゲンペプチド（経口2.5〜10g/日・Proksch 2014 RCT）の違いを論文で比較。「ペプチド」と一括りされがちですが、コラーゲンペプチド（経口・真皮の弾力）と外用のシグナルペプチド（パルミトイルペンタペプチド・テトラペプチド・銅ペプチド等）は別物で、ナイアシンアミドとの比較軸も異なります。ナイアシンアミドは表皮で色素沈着・バリア・毛穴・小じわの4方面（Bissett 2005 5%×8週で色素沈着改善が報告された）、コラーゲンペプチドは経口で真皮の弾力（Proksch 2014 2.5g×8週で皮膚弾力 28%改善が報告された）、外用シグナルペプチドはコラーゲン産生シグナルを直接届ける経路で補完関係。作用層が表皮vs真皮、経口vs外用で完全分離のため「比較」より「併用」が論文上の結論。有効濃度・効果が出るまで（ナイアシンアミド外用4-12週・コラーゲンペプチド経口8-24週・外用ペプチド12-24週）、月コスト、30代から始める優先順位、外用ペプチド系（マトリキシル/銅ペプチド/Argireline）との使い分けを化粧品メーカー視点で解説。',
  },
  'acetyl-l-carnitine-vs-creatine': {
    title: 'アセチル-L-カルニチン vs クレアチン｜違い・併用・有効量を論文で比較',
    description: 'アセチル-L-カルニチン（ALC・1〜3g/日）とクレアチン（モノハイドレート3〜5g/日）の違いを論文で比較。ALCは血液脳関門を通過して認知・神経・気分に作用、クレアチンはATP再合成で筋力・パワーを向上。脳vs筋で作用ターゲットが完全補完で併用OK。効果が出るまでの期間、女性への有効性、副作用、コスパ差を化粧品メーカー視点で解説。',
  },
  'l-carnitine-vs-creatine': {
    title: 'カルニチン vs クレアチン｜違い・どっちが効果・ダイエット/筋トレでの使い分けを論文で比較',
    description: 'L-カルニチン（500〜2,000mg/日）とクレアチン（モノハイドレート3〜5g/日）の違いを論文で比較。L-カルニチンは脂肪酸をミトコンドリアに運ぶ運搬役で脂質代謝・心臓・運動持久力に関与（Pooyandjoo 2016 メタ解析 n=911で体重 -1.33kg報告）、クレアチンはATP再合成で筋力・パワー・除脂肪体重を向上（Kreider 2017 メタ解析・JISSN 2017ガイドライン・100以上のRCT統合）。「ダイエット目的ならL-カルニチン、筋トレ・パワー目的ならクレアチン」が単純な分け方ですが、エビデンスの厚みではクレアチンが頭ひとつ抜けています。「カルニチン」と一括りにする場合、L-カルニチン（運動・脂質代謝・心臓）とアセチル-L-カルニチン（ALC・脳・認知・神経・気分）は別物として扱う必要があり、女性のダイエット目的・男性の筋トレ目的・中高年の認知機能目的で適切な使い分けが異なります。TMAO上昇リスク、併用可否、効果が出るまで（カルニチン 8-24週・クレアチン 3-4週）、月コストを化粧品メーカー視点で解説。',
  },
  'l-citrulline-vs-creatine': {
    title: 'L-シトルリン vs クレアチン｜違い・併用・効果が出る時間を論文で比較',
    description: 'L-シトルリン（運動前6〜8g）とクレアチン（モノハイドレート3〜5g/日）の違いを論文で比較。シトルリンは血流増加・パンプ感・乳酸クリアランスへ当日〜数日で作用（Bailey 2010 RCTで6g摂取後NO増加）、クレアチンはATP再合成で筋力・パワー・除脂肪体重に3〜4週で作用（Kreider 2017 メタ解析）。即時報酬（シトルリン）vs 累積報酬（クレアチン）の典型ペアで併用OK。フリー型/マレート型シトルリンの選び方、運動前のタイミング、併用スタックを化粧品メーカー視点で解説。',
  },
  'l-theanine-vs-magnesium': {
    title: 'L-テアニンvs マグネシウム｜リラックス・睡眠の使い分け論文比較',
    description: 'L-テアニンとマグネシウムを論文で比較。テアニンはα波増加でコルチゾール低下、マグネシウムは神経伝達物質調整・筋弛緩・GABA系。両者は補完関係で併用OK（マグネシウムグリシネートとの組み合わせがRCTで確認）。有効量、効果が出るまで、夜の運用順を化粧品メーカー視点で解説。',
  },
  'equol-vs-collagen-peptide': {
    title: 'エクオールvs コラーゲンペプチド｜更年期・美肌の使い分け',
    description: 'エクオールとコラーゲンペプチドを論文で比較。エクオールは大豆イソフラボン代謝産物でホットフラッシュ・骨・肌弾力に作用、コラーゲンペプチドは真皮の弾力サポート。30-50代女性で重なる悩みへの補完関係（ホルモン×構造）。有効量、効果が出るまで、肝斑・骨密度への期待値を化粧品メーカー視点で解説。',
  },
  'bakuchiol-vs-niacinamide': {
    title: 'バクチオールvs ナイアシンアミド｜外用美容成分の使い分け論文比較',
    description: 'バクチオール（植物性レチノール代替）とナイアシンアミドを論文で比較。バクチオールはレチノール様のシワ改善RCT、ナイアシンアミドはバリア・色素沈着・毛穴の4方面。両者は補完関係で併用OK・刺激リスクが低い。妊娠中の使用可否、有効濃度、夜のスタックを化粧品メーカー視点で解説。',
  },
  'glutathione-vs-nac': {
    title: 'グルタチオンvs NAC｜抗酸化と前駆体の使い分け論文比較',
    description: 'グルタチオン（GSH）とNAC（N-アセチルシステイン）を論文で比較。グルタチオンは細胞内最大の抗酸化物質、NACはシステイン供給による前駆体経路でグルタチオン産生を促進。経口GSHの吸収率vs NACのコスパ、肝臓・呼吸器・解毒への作用、有効量を化粧品メーカー視点で解説。',
  },
  'arbutin-vs-niacinamide': {
    title: 'α-アルブチンvs ナイアシンアミド｜美白の使い分け論文比較',
    description: 'α-アルブチンとナイアシンアミドを論文で比較。アルブチンはチロシナーゼ阻害（メラニン産生抑制）、ナイアシンアミドはメラノソーム転移阻害（メラニン受け渡し抑制）の異なる経路。両者併用で多経路の美白アプローチが論文で確認。有効濃度、効果が出るまで、刺激リスクを化粧品メーカー視点で解説。',
  },
  // ── Session F Day 1 バッチ 2026-05-11 ────────────────────────
  'melatonin-vs-l-theanine': {
    title: 'L-テアニン vs メラトニン｜リラックス×入眠の使い分け・併用を論文で比較',
    description: 'L-テアニン（100〜200mg）とメラトニン（0.5〜3mg）の違いを論文で比較。テアニンはα波増加・コルチゾール低下でリラックス・寝つき準備に作用（Hidese 2019 RCT n=30 4週で睡眠の質改善が報告された）、メラトニンは生体時計のリセットで入眠潜時短縮・時差ぼけに作用（Cochrane 2002 メタ解析 n=1,200 / PLOS ONE 2013 メタ解析 n=1,683で平均7分の入眠潜時短縮）。作用経路が完全に異なるため補完関係で併用可能、リラックス導入にテアニン・入眠アンカーにメラトニンの順序が現実的。日本ではテアニンはサプリ通販可・メラトニンは医薬品扱いで個人輸入前提という規制差、フルボキサミン併用で血中17倍の最強警告（メラトニン側）、依存性の低さ（ベンゾジアゼピン系との対比）、効果が出るまでを化粧品メーカー視点で解説。',
  },
  'tranexamic-acid-vs-niacinamide': {
    title: 'トラネキサム酸 × ナイアシンアミド｜美白二大成分の併用・経路の違いを論文で比較',
    description: 'トラネキサム酸（外用2〜5%・経口250〜500mg/日）とナイアシンアミド（外用5%）の違いを論文で比較。トラネキサム酸はプラスミン経路（炎症シグナル）を抑えてメラニン産生を起点側でブロック（JAAD 2020 メタ解析 n=561で経口250mg/日のmMASI有意改善が報告された）、ナイアシンアミドはメラノソーム転移を抑えて完成したメラニンの表皮細胞への受け渡しを止める（Bissett 2005 RCT 5%×8週で色素沈着改善）。経路が完全に異なるため併用が論文上で合理的で、市販でもANUA TXA4%+ナイアシンアミド10%セラム等の同時配合処方が普及している。経口トラネキサム酸はピル・抗凝固薬・血栓既往で医師相談必須・妊娠中授乳中NG、外用同士は妊娠中も比較的安全と整理。月コスト・刺激リスク・肝斑/炎症後色素沈着への期待値を化粧品メーカー視点で解説。',
  },
  'pdrn-vs-hyaluronic-acid': {
    title: 'PDRN vs ヒアルロン酸｜再生医療由来×保湿の違い・併用を論文で比較',
    description: 'PDRN（外用0.5〜2%・サケ精巣由来DNA断片）とヒアルロン酸（外用・経口）の違いを論文で比較。PDRNはA2Aアデノシン受容体経由で線維芽細胞を活性化しコラーゲン産生・組織再生を促進（JCD 2021 RCT n=40で8週シワスコア有意改善が報告された）、ヒアルロン酸は表皮〜真皮の水分保持で角層含水量・小じわ・乾燥に作用する。「再生」と「保湿」で役割が完全に分担されるため補完関係で併用可能、市販でもANUA PDRN Hyaluron Serum等の同時配合処方が韓国コスメ中心に普及している。PDRN外用は注射型より生体利用率が低く効果実感まで12〜24週、サケ・魚介アレルギーは禁忌、注射型は医療機関のみという制約も化粧品メーカー視点で解説。',
  },
  'maca-vs-ashwagandha': {
    title: 'マカ vs アシュワガンダ｜アダプトゲンの違い・性機能/エネルギーの使い分けを論文で比較',
    description: 'マカ（1,500〜3,500mg/日・ペルー産アブラナ科）とアシュワガンダ（KSM-66 300〜600mg/日・インド原産ナス科）の違いを論文で比較。マカは性機能改善のメタ解析（BMC 2010 4RCTシステマティックレビュー）と更年期症状RCT（Menopause 2008 n=14 6週で不安/抑うつ改善が報告された）でホルモンを直接変化させずアダプトゲン機序（HPA軸調整）で作用、アシュワガンダはコルチゾール低下RCT複数とテストステロン関連の報告がありストレス耐性・男性活力でエビデンス階層が一段上。エネルギー・性機能の表面的に似た領域で並ぶが、機序は別系統で併用可能。男女別の優先度、SSRI・降圧薬・甲状腺薬・自己免疫薬の併用注意、ホルモン依存性疾患の禁忌、効果が出るまでと月コストを化粧品メーカー視点で解説。',
  },
  'retinol-vs-niacinamide': {
    title: 'レチノール vs ナイアシンアミド｜併用OK？シワ・色素沈着の使い分けを論文で比較',
    description: 'レチノール（外用0.025〜1%・ビタミンA誘導体）とナイアシンアミド（外用5%・ビタミンB3）の違いを論文で比較。レチノールは表皮細胞のターンオーバー促進・コラーゲン産生でシワ・たるみへ強いRCTエビデンス（Kafi 2007 RCT 0.4%×24週で深いシワ改善が報告された）、ナイアシンアミドはバリア機能・色素沈着・毛穴の4方面に低刺激で作用（Bissett 2005 RCT 5%×8週で色素沈着改善が報告された）。両者は経路が独立で併用可能、むしろレチノール刺激（赤み・乾燥）をナイアシンアミドのバリア補強が抑制する補完関係。レチノールは妊娠中NG・夜のみ使用・日焼け止め必須の制約があり、ナイアシンアミドは妊娠中も比較的安全・朝晩OK・刺激ほぼなしで対照的。初心者の順序（ナイアシンアミドが先・レチノールは低濃度から）、効果が出るまで、月コストを化粧品メーカー視点で解説。',
  },
  // ── Session F Day 2 バッチ 2026-05-11（既存pair の PAIR_SEO 埋め） ────────────
  'ashwagandha-vs-rhodiola': {
    title: 'アシュワガンダ vs ロディオラ｜アダプトゲン二大成分の使い分けを論文で比較',
    description: 'アシュワガンダ（KSM-66/Sensoril 300〜600mg/日）とロディオラ（SHR-5 200〜600mg/日）の違いを論文で比較。アシュワガンダはコルチゾール低下・睡眠の質改善・テストステロン関連RCTが豊富で「夜・リラックス・回復」軸（評価期間8〜16週）、ロディオラは精神疲労・バーンアウト・認知パフォーマンス改善RCTで「朝・覚醒・集中」軸（Phytomedicine 2010 RCT n=101でSHR-5 170mg/日×4週で計算誤り率改善・Journal of Sports Medicine 2017 RCT n=118で200mg/日×12週で燃え尽きスコア改善が報告された）。経路は別系統で「朝ロディオラ・夜アシュワガンダ」の二段スタックが無難な使い分け。双極性障害・抗うつ薬・甲状腺薬・自己免疫薬の併用注意、男女別の優先度、効果が出るまでと月コストを化粧品メーカー視点で解説。',
  },
  'pdrn-vs-retinol': {
    title: 'PDRN vs レチノール｜再生医療由来×ターンオーバーの違いを論文で比較',
    description: 'PDRN（外用0.5〜2%・サケ精巣由来DNA断片）とレチノール（外用0.025〜1%・ビタミンA誘導体）の違いを論文で比較。PDRNはA2Aアデノシン受容体経由で線維芽細胞を活性化しコラーゲン産生・組織再生を促進（JCD 2021 RCT n=40で外用ジェル8週使用でシワスコア有意改善が報告された・新興成分emerging）、レチノールは表皮細胞のターンオーバー促進と真皮のコラーゲン産生でシワ・たるみへ強いRCTエビデンス（Kafi 2007 RCT 0.4%×24週で深いシワ改善が報告された・エビデンス階層A）。両者は刺激プロファイルと妊娠中の可否で大きく異なる：レチノールは妊娠中NG・夜のみ・刺激リスクあり、PDRNは魚介アレルギーNG以外は刺激少なく朝晩OK。エビデンスの厚みを取るならレチノール、敏感肌・妊娠中・刺激回避ならPDRNという使い分けを化粧品メーカー視点で解説。',
  },
  'tranexamic-acid-vs-arbutin': {
    title: 'トラネキサム酸 vs α-アルブチン｜美白成分の経路差・併用を論文で比較',
    description: 'トラネキサム酸（外用2〜5%・経口250〜500mg/日）とα-アルブチン（外用2%）の違いを論文で比較。トラネキサム酸はプラスミン経路（炎症シグナル）を抑えてメラニン産生を起点側でブロック（JAAD 2020 メタ解析 n=561で経口250mg/日のmMASI有意改善が報告された）、α-アルブチンはチロシナーゼ酵素を直接阻害してメラニン合成のステップを抑制（Hamed 2020 RCTで2%×12週で色素沈着の有意改善が報告された）。経路が独立で併用可能で、市販でも美白美容液の複合配合が普及している。両者ともハイドロキノンと違い長期使用可・刺激少ない安全プロファイルで、ハイドロキノンの代替路線として論文ベースで合理的な選択肢。経口トラネキサム酸はピル・抗凝固薬・血栓既往で医師相談必須・妊娠中授乳中NG、α-アルブチンは妊娠中も比較的安全と整理。月コスト・刺激リスク・肝斑/炎症後色素沈着への期待値を化粧品メーカー視点で解説。',
  },
  'salicylic-acid-vs-glycolic-acid': {
    title: 'サリチル酸 vs グリコール酸｜BHA × AHA の使い分けを論文で比較',
    description: 'サリチル酸（BHA・0.5〜2%）とグリコール酸（AHA・5〜10%）の違いを論文で比較。サリチル酸は脂溶性のため皮脂・毛穴内部に浸透して角栓溶解・ニキビ抑制に作用（Cutis 2004 RCT n=60で2%×8週で過酸化ベンゾイルと同等の面疱減少が報告された）、グリコール酸は水溶性で角質層の細胞接着を弱めてターンオーバーを促進し色素沈着・光老化に作用（Dermatologic Surgery 2001 RCT n=40で8%×22週でケラトーシス・くすみ・細かいシワの有意な改善が報告された）。脂溶性vs水溶性で浸透層が完全に異なり、ニキビ・毛穴・脂性肌ならBHA、くすみ・光老化・肌全体のテクスチャーならAHAの目的別使い分けが王道。同時併用は刺激リスクが高く朝晩や曜日で分離が推奨、サリチル酸はアスピリンアレルギー・妊娠中授乳中NG、両者とも光感受性を上げるため日焼け止め必須。月コスト・濃度別の選び方を化粧品メーカー視点で解説。',
  },
  'niacinamide-vs-azelaic-acid': {
    title: 'ナイアシンアミド vs アゼライン酸｜抗炎症×美白の使い分け・併用を論文で比較',
    description: 'ナイアシンアミド（外用5%）とアゼライン酸（外用10〜20%）の違いを論文で比較。ナイアシンアミドはメラノソーム転移阻害でメラニンの受け渡しを抑え、バリア機能・色素沈着・毛穴・小じわの4方面に低刺激で作用（Bissett 2005 RCT 5%×8週で色素沈着改善が報告された）、アゼライン酸はチロシナーゼ阻害＋抗炎症＋抗菌（P.acnes）の3作用で色素沈着・ニキビ・酒さの3軸に対応（Archives of Dermatology 2006 RCT n=251で15%×12週で酒さ炎症性病変が有意に減少・JDT 2020 RCT n=40で20%×24週がハイドロキノン4%と同等の肝斑改善が報告された）。両者とも経路が独立で併用可能、ナイアシンアミドの低刺激性とアゼライン酸の多機能性を組み合わせると「色素沈着＋ニキビ＋酒さの赤み」を一度にカバーできる補完関係。両者とも妊娠中も比較的安全な点でハイドロキノンの代替路線として実用的。朝晩の使い分け、効果が出るまで、月コストを化粧品メーカー視点で解説。',
  },
  // ── Session F Day 3 バッチ 2026-05-12（既存pair の PAIR_SEO 埋め） ────────────
  'vitamin-c-topical-vs-niacinamide': {
    title: 'ビタミンC（外用）vs ナイアシンアミド｜美容液二大成分の併用・順番を論文で比較',
    description: 'ビタミンC外用（L-アスコルビン酸10〜20%・誘導体5〜15%）とナイアシンアミド外用（5%）の違いを論文で比較。ビタミンCは抗酸化＋コラーゲン合成促進＋メラニン産生抑制の多経路で作用し（Pinnell 2001 でL-アスコルビン酸15%が紫外線誘発酸化ストレスを有意に抑制、Humbert 2003 RCT n=20で5%×6ヶ月でしわ改善が報告された）、ナイアシンアミドはメラノソーム転移阻害でメラニン受け渡しを抑え、バリア・色素沈着・毛穴・小じわの4方面に低刺激で作用（Bissett 2005 RCT 5%×8週で色素沈着改善）。「VCとNia同時併用は活性低下する」は1960年代のin vitro議論で、現代の安定化処方・誘導体ではほぼ問題なく、市販でも同時配合処方が普及しています。朝VC＋日焼け止め（抗酸化シールド）・夜ナイアシンアミドの朝晩スタックが現実的で、敏感肌は両者とも妊娠中比較的安全な点でハイドロキノンの代替路線として有効。月コスト・濃度別の選び方を化粧品メーカー視点で解説。',
  },
  'hyaluronic-acid-vs-ceramide': {
    title: 'ヒアルロン酸 vs セラミド｜保湿二大成分の役割分担・併用を論文で比較',
    description: 'ヒアルロン酸（外用ナトリウム塩0.1〜2%・経口120〜240mg/日）とセラミド（外用0.5〜2%・経口グルコシルセラミド40〜80mg/日）の違いを論文で比較。ヒアルロン酸は水分吸引性が極めて高く（自重の最大1,000倍の水分保持）角層〜表皮の含水量を即時に増やしてふっくら感に作用、セラミドは細胞間脂質として皮膚バリアを構築し水分蒸散（TEWL）を抑制して中長期の乾燥・敏感肌に作用（JDS 2017 RCT n=63で経口グルコシルセラミドが角層水分量・TEWLを改善が報告された）。「ヒアルロン酸で吸い込み、セラミドで閉じ込める」役割分担が論文上で合理的な補完関係。低分子HA（浸透型）と高分子HA（表面保護型）の使い分け、両者とも妊娠中安全、経口HAと経口セラミドの吸収経路、敏感肌・アトピー素因でのセラミド優先順位を化粧品メーカー視点で解説。',
  },
  'arbutin-vs-kojic-acid': {
    title: 'α-アルブチン vs コウジ酸｜美白チロシナーゼ阻害成分の安全性と効力を論文で比較',
    description: 'α-アルブチン（外用2%）とコウジ酸（外用1〜2%）の違いを論文で比較。両者ともチロシナーゼ酵素阻害でメラニン合成を抑える経路を共有しますが、効力と安全性プロファイルが異なります。α-アルブチンはα結合グルコシド構造でハイドロキノンを徐放しないため刺激ほぼなし・長期使用可（Hamed 2020 RCTで2%×12週で色素沈着の有意改善が報告された）、コウジ酸は麹菌由来の有機酸でチロシナーゼ阻害作用が強い反面、接触皮膚炎・刺激のリスクが報告されている成分（J Dermatol Sci 2007のメタ解析で肝斑改善が報告された）。コウジ酸は2003年に厚労省で発がん性懸念から見直しがあり、2006年に安全性が再確認され現在も医薬部外品有効成分として承認継続されています。「刺激なく長期継続したい」ならアルブチン、「短期で強い効力を狙う」ならコウジ酸という使い分け、月コストと併用可否を化粧品メーカー視点で解説。',
  },
  'ashwagandha-vs-l-theanine': {
    title: 'アシュワガンダ vs L-テアニン｜累積ストレス耐性×即時リラックスの使い分けを論文で比較',
    description: 'アシュワガンダ（KSM-66/Sensoril 300〜600mg/日）とL-テアニン（100〜200mg）の違いを論文で比較。アシュワガンダはHPA軸（視床下部-下垂体-副腎系）の調整経由でコルチゾールを低下させ、睡眠の質・慢性ストレス耐性に8〜12週の継続摂取で累積的に作用（Salve 2019 RCT n=60でKSM-66 600mg/日×8週で血清コルチゾール有意低下が報告された）、L-テアニンはGABA・α波増加で30〜60分後の即時リラックスに作用（Hidese 2019 RCT n=30で200mg/日×4週で睡眠の質改善が報告された）。「即時リラックス（テアニン）vs 累積ストレス耐性（アシュワガンダ）」の時間軸の対比が無難な使い分けで、両者は経路が独立し併用可能（GABA系＋HPA軸の二段スタック）。仕事中・面接前の急性ストレスならテアニン、慢性ストレス・コルチゾール過剰・睡眠の質低下ならアシュワガンダ。アシュワガンダはSSRI・甲状腺薬・自己免疫薬・降圧薬の併用注意、妊娠中授乳中NG、ホルモン依存性疾患禁忌を化粧品メーカー視点で解説。',
  },
  'ferulic-acid-vs-vitamin-c-topical': {
    title: 'フェルラ酸 vs ビタミンC（外用）｜抗酸化スタックのシナジーを論文で比較',
    description: 'フェルラ酸（外用0.5〜1%）とビタミンC外用（L-アスコルビン酸10〜20%・誘導体5〜15%）の違いを論文で比較。両者の関係は「対立」ではなく「シナジー」で、フェルラ酸は植物性ポリフェノール（米ぬか・小麦ふすま由来）として単独でも抗酸化作用を持つ一方、ビタミンCとビタミンEの安定化と効果倍増という役割で論文蓄積が中心です（Lin 2005 が VC15%＋VE1%＋フェルラ酸0.5%の三者配合で紫外線誘発光損傷を単独より顕著に抑制、SkinCeuticals C E Ferulic処方の根拠論文）。フェルラ酸単独のヒトRCTは限定的でVCスタック前提のエビデンスが中心のため、論文ベースでは「VCを使うならフェルラ酸併用が合理的」が結論。朝VC＋VE＋フェルラ酸スタック→日焼け止め、の抗酸化シールドが光老化・肝斑予防に現実的。月コスト・併用順序・SkinCeuticals以外の市販選択肢を化粧品メーカー視点で解説。',
  },
  // ── Sprint 1 Session A Day 2 バッチ 2026-05-12（壊滅cluster大開拓 Day 2） ────────────
  'vitamin-c-oral-vs-vitamin-c-topical': {
    title: 'ビタミンC 経口 vs 外用｜シミ・美肌の役割分担を論文で比較',
    description: '経口ビタミンC（500〜1,000mg/日・L-アスコルビン酸＋バイオフラボノイド）と外用ビタミンC（純粋アスコルビン酸10〜20%・誘導体VCEthyl等）の違いを論文で比較。経口は免疫機能維持・全身のコラーゲン合成・抗酸化サポートが主役（Cochrane 2013 メタ解析 n=11,306）、外用は皮膚のチロシナーゼ阻害でメラニン産生を直接抑制し色素沈着・シミに作用（Telang 2013 review）。経路が完全に分かれているため「経口でシミは消えない」が論文上の結論で、シミ・美肌目的なら外用が主役・経口は土台サポートの補完関係。化粧品メーカー視点では経口Cで「シミが消える」期待は過大評価で、外用ナイアシンアミド5%・トラネキサム酸外用との組み合わせが現実解。経口の朝晩分割、外用の朝塗布＋日焼け止め必須、リポソーム経口の費用対効果、市販OTC（アスコルビン酸末）とiHerbの違いを化粧品メーカー視点で解説。',
  },
  'folic-acid-vs-iron': {
    title: '葉酸 vs 鉄｜妊活・妊婦の併用タイミング・順序を論文で比較',
    description: '葉酸（400〜800μg/日・5-MTHF活性型 or モノグルタミン酸型）と鉄（18〜36mg/日・グリシン酸キレート Ferrochel）の違いを論文で比較。葉酸はDNA合成・神経管閉鎖障害予防（MRC 1991 RCT）と認知機能/ホモシステイン（Ageing Research Reviews 2016 メタ解析 n=2,398）、鉄は赤血球ヘモグロビン合成・酸素輸送・疲労改善（CMAJ 2012 RCT n=198 80mg/日12週で疲労有意改善）と役割が完全に異なる補完関係。妊活・妊娠中・月経過多の女性は両方の需要が高く併用推奨で、薬理的相互作用も乏しいため同時併用OK。タイミングは①葉酸は食事と一緒で吸収安定、②鉄は空腹時で吸収率が高い（ビタミンC併用で2〜3倍向上）が原則。実用上は「朝食と一緒に葉酸＋ビタミンC＋鉄」を一括で飲む層が多く、消化器症状が出る場合のみ鉄を別時間にずらすのが現実的。妊婦用総合サプリ（ピジョン・ベルタ・エレビット等）とのダブり防止、月コストを化粧品メーカー視点で解説。',
  },
  'folic-acid-vs-vitamin-b12': {
    title: '葉酸 vs ビタミンB12｜認知機能・ホモシステイン・メチル化を論文で比較',
    description: '葉酸（400〜800μg/日・5-MTHF活性型）とビタミンB12（500〜1,000μg/日・メチルコバラミン）の違いを論文で比較。両者はメチル化サイクル（ホモシステイン → メチオニン）の補酵素として連動し、片方だけでは代謝が回らない補完関係。葉酸は5-MTHFがメチル基をホモシステインに供与・B12はその反応に補酵素として必須で、Ageing Research Reviews 2016 メタ解析 n=2,398では葉酸補充で認知機能スコアとホモシステイン値が有意改善（特に高齢者）。一方、葉酸を1mg/日超で長期摂取するとB12欠乏の血液所見（巨赤芽球性貧血）を隠す可能性が指摘され、神経症状（しびれ・歩行障害）が進行してから発見されるリスクがある。MTHFR遺伝子多型（日本人10〜15%）では活性型5-MTHF＋メチルB12のセットが現実解で、ベジタリアン・ヴィーガン・PPI長期服用・胃切除既往はB12不足リスク高。月コスト、効果が出るまで、認知機能サプリでの位置づけを化粧品メーカー視点で解説。',
  },
  'vitamin-d-vs-calcium': {
    title: 'ビタミンD vs カルシウム｜骨密度・骨粗鬆症の併用を論文で比較',
    description: 'ビタミンD（1,000〜4,000IU/日・D3コレカルシフェロール）とカルシウム（500〜1,000mg/日）の違いを論文で比較。ビタミンDは腸管でのカルシウム吸収を促進する役割、カルシウムは骨・歯の主要構成成分で神経伝達・筋収縮にも必須で、両者は補完関係で骨粗鬆症予防の論文では併用が標準（NEJM 2006 Women\'s Health Initiative RCT n=36,282でカルシウム1,000mg+D 400IU併用が骨密度維持・骨折リスク低下を確認）。BMJ 2017 メタ解析 n=11,321ではビタミンD単独でも急性呼吸器感染リスク低下（OR 0.88）。日本人の食事ではカルシウム摂取量が推奨を下回る傾向、ビタミンDは室内勤務・日焼け止め使用で不足しやすく、両者を食事から十分摂りにくい現実がある。骨密度・骨粗鬆症リスクが気になる中高年は「D3+K2」または「D3+カルシウム+K2」のセットが現実解で、心血管リスク（カルシウム単独高用量の議論）を意識するならK2併用が論文上。妊娠中・授乳中の用量目安、過剰摂取の上限ライン（D 4,000IU/カルシウム 2,500mg）、市販とiHerbの違いを化粧品メーカー視点で解説。',
  },
  // ── Session F Day 4 バッチ 2026-05-12（antiaging/stress/energy 既存pair 強化デー） ────
  'nmn-vs-nicotinamide-riboside': {
    title: 'NMN vs NR（ニコチンアミドリボシド）｜NAD+前駆体2大成分の違い・どちらから始める？論文で比較',
    description: 'NMN（ニコチンアミドモノヌクレオチド 250〜500mg/日・¥6,000-12,000/月）とNR（ニコチンアミドリボシド 300〜600mg/日・ChromaDex社特許Niagen®配合のTru Niagenで月¥3,500前後）の違いを論文で比較。両者ともNAD+前駆体だが、NRは経口で胃酸に対し安定で血中NAD+上昇が複数のヒトRCTで確認（Martens 2018 Nat Commun n=24 NR 500mg×2/日6週で収縮期血圧低下・Conze 2019 Sci Rep RCT n=140 8週で血中NAD+用量依存的上昇）、NMNは Yoshino 2021 Science RCT n=25 250mg/日10週で閉経後肥満女性の骨格筋インスリン感受性改善が報告された一方、Damgaard 2023 systematic review では「血中NAD+上昇はNMN/NR両者とも有意・臨床アウトカム（疲労・認知・代謝）の有意差は限定的・長期寿命延長は未確立」と誠実評価。NRはTru Niagen（ChromaDex）が世界標準で経口カプセル安定、NMNは粉末・舌下・カプセル・点鼻と剤形多様（David Sinclair陣営はNMN推し・ChromaDex陣営はNR優位を主張で業界二分）。コスパは現状NRが圧倒（NRは¥3,500前後/月で4年以上の論文蓄積、NMNは¥6-12k/月でヒトRCTは2020年以降に集中）。化粧品メーカー視点では「NAD+補充で皮膚老化を直接改善するヒトRCTは未確立・スキンケアは外用レチノール/ナイアシンアミド優先」を明示。30代後半以降のNAD+低下対策、効果指標（血中NAD+ vs 臨床アウトカム）、両者併用の意味、副作用・併用注意を化粧品メーカー視点で解説。',
  },
  'melatonin-vs-magnesium-glycinate': {
    title: 'メラトニン vs マグネシウム グリシン酸塩｜睡眠サプリの使い分けを論文で比較',
    description: 'メラトニン（0.5〜3mg・日本では医薬品扱いで個人輸入が前提）とマグネシウム グリシン酸塩（200〜400mg/日・国内サプリとして購入可）の違いを論文で比較。メラトニンは脳の松果体由来の睡眠ホルモン補充で生体時計リセット・入眠潜時短縮に作用（Cochrane 2002 メタ解析 n=1,200で時差ぼけ症状の有意改善・PLOS ONE 2013 メタ解析 n=1,683で入眠潜時平均7.06分短縮・総睡眠時間平均8.25分延長が報告された）、マグネシウム グリシン酸塩はGABA系とNMDA受容体の調整・神経筋接合部のリラックス・コルチゾール低下に作用（Abbasi 2012 J Res Med Sci RCT n=46 高齢者500mg/日×8週でPSQI改善が報告された）。「軽い不眠・夜の興奮・寝つきの悪さ・脚のむずむず」ならMgGlyが第一選択、「概日リズム障害（時差ぼけ・交代勤務）・明け方早朝覚醒」はメラトニン優先という時間軸・タイプ別の使い分けが王道。両者は経路独立で併用可能（MgGly就寝1時間前→メラトニン就寝30分前の二段スタック）。日本ではメラトニンは医薬品（睡眠導入剤類縁）扱いでサプリ流通なし・個人輸入は自己責任のグレーゾーンで本サイトは推奨する立場ではなく事実として規制差を提示。化粧品メーカー視点では「慢性睡眠不足→コルチゾール上昇→皮膚バリア低下・糖化加速」のループ視点でMgGlyによる睡眠の質改善はスキンケアの土台として妥当。フルボキサミン併用でメラトニン血中17倍の最強警告、用量階段（メラトニン0.3-0.5mgから開始）、副作用比較、妊娠中授乳中の扱いを化粧品メーカー視点で解説。',
  },
  'coq10-vs-pqq': {
    title: 'CoQ10 vs PQQ｜ミトコンドリア2大成分の役割分担と併用を論文で比較',
    description: 'コエンザイムQ10（100〜300mg/日・¥1,000-3,000/月）とPQQ（ピロロキノリンキノン 10〜20mg/日・¥3,000-6,000/月）の違いを論文で比較。両者ともミトコンドリア成分だが役割が完全に異なる補完関係。CoQ10は電子伝達系の電子運搬体として既存ミトコンドリアのATP産生と抗酸化に直接関与（Mortensen 2014 JACC Heart Fail Q-SYMBIO RCT n=420 300mg/日×2年で慢性心不全の主要心血管イベント有意減・Caso 2007 Am J Cardiol RCT n=32 100mg/日30日でスタチン誘発筋痛軽減が報告された）。PQQはミトコンドリア新規生合成を促す独立軸（PGC-1α活性化経路）で、Hosoe 2007 Daiichi Pharma 単盲検試験 n=17 20mg/日×12週で疲労・睡眠スコア改善が報告されたものの小規模・大規模ヒトRCTは限定的、Stites 2006 Mol Aspects Med は動物実験ベース機序評価が中心で「ヒトでの臨床アウトカム蓄積はCoQ10と比較すると初期段階」が現状の論文評価。CoQ10は「既存ミトコンドリアの稼働を支える」、PQQは「新規ミトコンドリアを増やす」役割の併用シナジーが理論上合理的。CoQ10にはユビキノール（還元型・40代以降の吸収率優位 Hosoi 2008）とユビキノン（酸化型・コスパ良 Bhagavan 2006）の2形態あり、40代以降や心不全・スタチン服用者はユビキノール優先が論文上。化粧品メーカー視点ではミトコンドリア機能低下→皮脂腺・線維芽細胞のエネルギー不足という枠で位置づけCoQ10経口の皮膚弾力改善RCT（Žmitek 2017 J Cosmet Dermatol RCT n=33 150mg/日×12週でしわ深さ改善報告）を補助情報として提示。30代前半からの優先順位、効果指標、副作用（CoQ10は稀に消化器症状・抗凝固薬と相互作用注意）、PQQの新興エビデンス温度差を化粧品メーカー視点で解説。',
  },
  'resveratrol-vs-quercetin': {
    title: 'レスベラトロール vs ケルセチン｜SIRT1×senolytics 役割分担とFisetinとの関係を論文で比較',
    description: 'レスベラトロール（trans型100〜500mg/日・¥1,500-4,000/月）とケルセチン（500〜1,000mg/日・¥1,500-3,500/月）の違いを論文で比較。両者ともポリフェノールに分類されるが、抗老化・長寿の文脈での主軸が完全に異なります。レスベラトロールはブドウ・赤ワイン由来スチルベン系でSIRT1（サーチュイン1）活性化によるカロリー制限模倣が中心軸（Howitz 2003 Nature で酵母・線虫・ハエの寿命延長を報告した古典論文・SRT501で2型糖尿病ヒトRCTあるが Tomé-Carneiro 2013 Pharmacol Res メタ解析「ヒト寿命延長エビデンスは未確立」と慎重評価）、ケルセチンはタマネギ・りんご由来フラボノール系でsenolytics（老化細胞除去）の主軸として研究蓄積（Zhu 2015 Aging Cell でダサチニブ+ケルセチン D+Q カクテルが老化細胞アポトーシス誘導をin vitro/in vivoで確立・Justice 2019 EBioMedicine 特発性肺線維症患者ヒト初Phase I試験 D+Q 100mg/週身体機能改善）。加えてケルセチンは抗ヒスタミン作用で花粉症・アレルギー対策のエビデンスもあり（Mlcek 2016 Molecules review）二刀流の独自性が高い成分。\n\nFisetin 2.0との関係：Fisetin（イチゴ・りんご由来）はケルセチンとフラボノール骨格類似で「より強いsenolytics」の位置づけ（Yousefzadeh 2018 EBioMedicine マウスlifespan延長報告・現在ヒトPhase II senolytics試験Wake Forest大学等で進行中）。3点関係は「レスベラトロール=古典SIRT1経路・全身代謝寄り／ケルセチン=senolytics+抗ヒスタミンの二刀流／Fisetin=ケルセチン強化版・senolytics特化」と整理できます。両者は経路独立で併用OK・ケルセチン+レスベラトロール+CoQ10の抗老化スタックも実用的。trans型 vs cis型レスベラトロールの規格、ケルセチンの低吸収率問題（バイオペリン・ホスホリポソーム製剤の意義）、ワルファリン併用注意（両者ともCYP抑制・抗血小板作用報告）、月コスト、Fisetinへの乗り換えタイミングを化粧品メーカー視点で解説。',
  },
  // ── Sprint 1 Session B Day 4 バッチ 2026-05-12（magnesium 形態比較 PAIR_SEO・rebase時に復元） ────
  'magnesium-glycinate-vs-magnesium': {
    title: 'マグネシウム グリシン酸塩 vs クエン酸塩・酸化マグネシウム｜形態別の違い・吸収率・選び方を論文で比較',
    description: 'マグネシウム グリシン酸キレート（200〜400mg/日・吸収率優位・夜推奨）と、広く流通するマグネシウム形態（クエン酸塩・酸化マグネシウム・塩化マグネシウム等）の違いを論文で比較。グリシン酸キレート型はWalker 2003 Magnes Res 等で吸収率と消化器症状（下痢）の少なさが報告されており、睡眠補助・神経鎮静用途で現実的（Abbasi 2012 J Res Med Sci RCT n=46 500mg/日×8週でPSQI改善）。クエン酸塩は浸透圧性緩下作用と吸収率のバランス型で日常的なマグネシウム不足補給の主役。酸化マグネシウムは日本では便秘薬として保険適用される医薬品形態で、Mori 2019 J Neurogastroenterol Motil RCT n=34等で慢性便秘への有効性が示されているが、吸収率は他形態に比べて低めとされ睡眠・神経用途では推奨されにくい。「マグネシウム グリシン酸 クエン酸 違い」「酸化マグネシウム グリシン酸 違い」「酸化マグネシウム クエン酸 違い」を一覧で整理し、形態×目的の選び分け（睡眠＝グリシン酸／不足補給＝クエン酸／便秘＝酸化）、副作用比較、薬物相互作用（テトラサイクリン系・ビスホスホネート・甲状腺薬は2-4時間ずらす）、腎機能低下時の注意、月コストを化粧品メーカー視点で解説。',
  },
  // ── Sprint 1 Session B Day 5 バッチ 2026-05-13 ────────────
  'niacinamide-vs-palmitoyl-tripeptide': {
    title: 'ナイアシンアミド vs パルミトイルトリペプチド｜論文RCT実績 vs シグナルペプチドの違い・併用を比較',
    description: 'ナイアシンアミド（外用5%・ビタミンB3）とパルミトイルトリペプチド（外用シグナルペプチド・Matrixyl系を含む合成ペプチド）の違いを論文で比較。ナイアシンアミドは複数のヒトRCTで4効能（色素沈着・皮脂・小じわ・バリア）が確認された論文ベース成分（Bissett 2005 J Cosmet Dermatol 5%×8週RCT・Hakozaki 2002 Br J Dermatol メラノソーム転移阻害確認）、パルミトイルトリペプチドはコラーゲン産生シグナルを線維芽細胞に送り真皮の弾力に作用する合成ペプチドで、メーカー主導のin vitro試験・小規模臨床試験が中心、ヒトRCTのエビデンス階層では一段下の位置づけです。「ナイアシンアミド 比較」「ナイアシンアミド ペプチド おすすめ」「パルミトイルペプチド ナイアシンアミド 違い」のロングテールKWを論文ベースで整理し、エビデンスの厚みの差（ヒトRCT vs メーカー試験）、作用層の違い（表皮vs真皮）、併用の合理性（経路独立・刺激リスクほぼゼロ）、有効濃度、効果が出るまで（ナイアシンアミド4-12週・パルミトイルトリペプチド12-24週）、月コスト（ナイアシンアミド¥1,500-5,000・パルミトイルトリペプチド¥3,000-8,000）、敏感肌での順序、化粧品メーカー視点で「論文裏付けの厚みを優先するならナイアシンアミドが先、コラーゲン産生シグナル系を追加したい中上級者でパルミトイルトリペプチドを組み合わせ」の使い分けを解説。',
  },
  // ── Session F Day 5 バッチ 2026-05-12（muscle/sleep/longevity/cognition 既存pair 強化デー・magnesium-glycinate-vs-magnesium は Sprint 1 Session B Day 4 ca532ce で先行追加済のため重複回避） ────
  'creatine-vs-hmb': {
    title: 'クレアチン vs HMB｜筋トレ・筋肥大サプリの違い・どっちを選ぶ？論文で誠実比較',
    description: 'クレアチン（モノハイドレート3〜5g/日・¥1,500-2,500/月）とHMB（β-ヒドロキシ-β-メチル酪酸 3g/日・¥3,000-5,000/月）の違いを論文で比較。一見似た「筋肉系サプリ」ですが、エビデンスの厚みと適用集団が大きく異なります。クレアチンはATP再合成を支える成分で、健常若年トレーニーから高齢者まで筋力・パワー・除脂肪体重（LBM）・無酸素持久力に幅広く有意差を出す最も論文蓄積の多いサプリ（Kreider 2017 JISSN ポジションスタンドで筋トレ系サプリ最強評価・数百本のRCTでメタ解析多数）。HMBはロイシン代謝産物として筋分解抑制・筋合成促進が想定されますが、Phillips 2017 Nutrients レビューで「健常若年トレーニーへの効果はトレーニング刺激と相殺されほぼゼロ」と結論、一方 Wilson 2014 J Strength Cond Res のメタ解析・Wu 2015 Arch Gerontol Geriatr メタ解析（高齢者対象 3g/日×12週で筋量・筋力改善）では高齢者・絶対的初心者・カタボリック状況（術後・寝たきり・骨折直後）で有意改善が確認されています。つまりHMBはクレアチンの劣化版ではなく、適用集団が異なる成分で、健常若年トレーニーがHMBに月¥3,000-5,000支払うのは論文ベースで非効率、クレアチンの方が同コストで効率良い。クレアチンは血清クレアチニン上昇による腎機能誤判定への注意（実害ではなく検査値ノイズ）、HMBはCa-HMBとFA-HMB（遊離酸）の形態差、両者併用の根拠の薄さ、年代別の優先順位（健常若年→クレアチン一択／60代以上の筋量維持→HMB追加検討）、月コスト、副作用プロファイルを化粧品メーカー視点で解説。',
  },
  'melatonin-vs-glycine': {
    title: 'メラトニン vs グリシン｜睡眠サプリの違い・国内入手可否・併用を論文で比較',
    description: 'メラトニン（0.5〜3mg・日本では医薬品扱いで個人輸入が前提）とグリシン（3g/就寝前・国内サプリ・食品扱いで購入容易）の違いを論文で比較。両者とも睡眠系サプリですが、作用経路と国内入手可否が決定的に異なります。メラトニンは脳の松果体由来の睡眠ホルモン補充で生体時計のリセット・入眠潜時短縮・概日リズム障害に作用（Cochrane 2002 メタ解析 n=1,200で時差ぼけ症状の有意改善・PLOS ONE 2013 メタ解析 n=1,683で入眠潜時平均7.06分短縮）、グリシンはアミノ酸として末梢血管拡張による深部体温低下経由の入眠改善・睡眠の質改善に作用（Yamadera 2007 Sleep Biol Rhythms RCT n=15で就寝前3g摂取が深部体温低下＋朝の眠気改善＋日中認知改善を確認・Bannai 2012 Front Neurol Neurosci で機序整理・Inagawa 2006 オープンラベルで4週間継続摂取が日中疲労改善）。\n\n日本国内入手可否の差が大きく、メラトニンは日本では医薬品扱い（睡眠導入剤類縁）でサプリ流通なし・個人輸入が自己責任のグレーゾーンで本サイトは推奨する立場ではなく事実として規制差を提示する一方、グリシンは食品扱いで味の素「グリナ」・iHerb・Amazonで誰でも購入可能（月¥1,000-4,000）。「軽い不眠・寝つきの悪さ・自然な眠気の補助」ならグリシンが第一選択、「時差ぼけ・交代勤務・概日リズム障害」はメラトニン優先という時間軸・症状別の使い分けが現実的で、両者は経路独立で併用可能。グリシンはほぼ副作用報告なし（自然アミノ酸でタンパク質構成成分）だがクロザピン併用は注意（高用量で精神症状増悪報告）、メラトニンはフルボキサミン併用で血中17倍の最強警告と用量階段（0.3-0.5mgから開始）を必須整理。化粧品メーカー視点では「慢性睡眠不足→コルチゾール上昇→皮膚バリア低下・糖化加速」のループへの介入として、まず国内入手可なグリシンから着手するのが現実解。コスパ、効果が出るまで、依存性の低さ（両者ともベンゾジアゼピン系と異なる）、妊娠中授乳中の扱いを化粧品メーカー視点で解説。',
  },
  'nmn-vs-urolithin-a': {
    title: 'NMN vs ウロリチンA｜NAD+前駆体×mitophagy 独立軸の使い分けを論文で比較',
    description: 'NMN（ニコチンアミドモノヌクレオチド 250〜500mg/日・¥6,000-12,000/月）とウロリチンA（500〜1,000mg/日・Mitopure®等で¥10,000-15,000/月）の違いを論文で比較。両者とも抗老化・長寿サプリだが、作用経路が完全に独立しているため併用合理性が高い補完関係。NMNはNAD+前駆体経路でサーチュイン活性化・全身代謝・インスリン感受性に作用（Yoshino 2021 Science RCT n=25 250mg/日10週で閉経後肥満女性の骨格筋インスリン感受性改善が報告された・Damgaard 2023 systematic review「血中NAD+上昇は有意・臨床アウトカム差は限定的・長期寿命延長は未確立」と誠実評価）、ウロリチンAはmitophagy 経路で不良ミトコンドリアの選択的除去とミトコンドリア生合成を独立に促進する独自軸（Andreux 2019 Nature Metabolism RCT n=66 健常高齢者500mg・1,000mg/日×4週でミトコンドリア機能マーカー有意改善・Liu 2022 JAMA Network Open Phase 2 RCT n=88 1,000mg/日×4ヶ月で筋持久力改善が報告された）。\n\n最大の注意点は腸内代謝個人差で、ザクロ・ベリー類のエラジタンニン → ウロリチンA変換能を持つ腸内細菌の保有率は欧米人で30-40%のみ（Selma 2017 Eur J Nutr で「ウロリチン産生者・非産生者」の分類提示）。ザクロを食べてもウロリチンAが産生されない人が大多数で、Mitopure®（Amazentis社特許品・Timeline社販売）の直接サプリ摂取が論文上で合理的という独自背景がある。両者併用は理論的シナジー（NAD+による生体エネルギー底上げ＋mitophagy による不良ミトコンドリア除去）で抗老化スタックとして整合的。NMNは David Sinclair 陣営の主力、ウロリチンAは Amazentis 社（スイスEPFL発スタートアップ）の独自エビデンスで業界文脈が異なる点も整理。月¥6-15kの高単価帯のため「老化マーカー改善は確認・体感は穏やか・長期寿命延長エビデンスは未確立」の期待値調整を最優先。Mitopure®以外のジェネリック品の品質バラつき、副作用（両者長期データ限定）、化粧品メーカー視点で皮膚老化への直接効果RCTが両者とも未確立で外用レチノール/ナイアシンアミド優先という現実解を化粧品メーカー視点で解説。',
  },
  'lions-mane-vs-bacopa-monnieri': {
    title: 'ライオンズメイン vs バコパ｜認知サプリの神経成長因子×アセチルコリン経路を論文で比較',
    description: 'ライオンズメイン（ヤマブシタケ・3g/日・¥2,500-4,500/月）とバコパモンニエリ（300〜600mg/日・¥1,500-2,500/月）の違いを論文で比較。両者とも認知機能サプリだが、作用経路と最適な対象年齢層が異なる補完関係。ライオンズメインは神経成長因子（NGF）誘導経由で神経新生・神経保護に作用し、高齢者の軽度認知障害（MCI）対象RCTでエビデンスが集中（Mori 2009 Phytother Res RCT n=30 50-80歳MCI患者にヤマブシタケ3g/日×16週で認知機能スコア有意改善・Mori 2011 Biomed Res でNGF誘導機序整理・摂取中止後12週で効果消失も報告）。バコパはアセチルコリン受容体経路経由で記憶・学習・若年〜中年成人の認知パフォーマンスに作用（Stough 2008 Phytother Res RCT 健常成人に bacopa 300mg/日×12週で言語学習・記憶テスト改善・Kongkeaw 2014 J Ethnopharmacol メタ解析 9 RCT で認知機能改善・Pase 2012 J Altern Complement Med systematic review で記憶テスト改善が報告された）。\n\n使い分けの結論：若年〜中年の集中力・記憶・学習能力ならバコパ優先、高齢者のMCI予防・認知低下対策ならライオンズメイン優先という年代軸の使い分けが無難。両者は経路独立で併用可能。\n\n両者とも効果が出るまで12-16週の継続が必要で、カフェイン・L-テアニンのような即時感覚はなく「気づいたら以前より集中できている」型の累積効果。副作用はバコパで消化器症状（嘔気・下痢・腹部膨満）報告ありで食後摂取推奨、ライオンズメインはキノコアレルギー注意・抗凝固薬と併用は理論的注意。化粧品メーカー視点では「認知ストレス低下→コルチゾール低下→皮膚バリア・糖化への二次効果」の枠で位置づけ可能。月コスト、効果指標、L-アルファGPC・ホスファチジルセリンとの組み合わせ、市販品の規格（Bacognize®/CDRI 08標準化バコパ）を化粧品メーカー視点で解説。',
  },
  'lutein-vs-zeaxanthin': {
    title: 'ルテイン vs ゼアキサンチン｜違い・併用比率10:2・AREDS2試験を論文で比較',
    description: 'ルテイン（10mg/日）とゼアキサンチン（2mg/日）の違いを論文で比較。両者とも黄斑色素を構成するカロテノイドで、AREDS2試験（JAMA 2013・n=4,203・5年）でルテイン10mg＋ゼアキサンチン2mgが加齢黄斑変性（AMD）の進行リスクを有意に低下させることが確認されています（p<0.05）。\n\nルテインは黄斑の外側に多く分布してブルーライト吸収・抗酸化に作用。\n\nゼアキサンチンは黄斑中心窩（フォベア）に集積して視力の鋭敏な中心視野を保護する役割分担があり、作用ターゲットが完全に分かれた補完関係。AREDS2で確立された10:2比が論文整合の併用標準で、市販品もこの比率で配合されたものが多い。Stringham 2017 RCT（n=120・6ヶ月）で MPOD（黄斑色素光学密度）・コントラスト感度・グレア耐性の有意改善も報告。スマホ・PC作業による眼疲労、加齢黄斑変性予防、ブルーライト対策での違い、メソゼアキサンチンとの関係、有効量、効果が出るまで、抗凝固薬・脂質吸収阻害薬との併用注意、月コストを化粧品メーカー視点で解説。',
  },
  'ashwagandha-vs-panax-ginseng': {
    title: 'アシュワガンダ vs Panax人参（高麗人参・朝鮮人参）｜違い・KSM-66 vs 高麗人参・機序差を論文で比較',
    description: 'アシュワガンダ（KSM-66 300〜600mg/日・¥1,500-3,500/月）とPanax人参（高麗人参・朝鮮人参 200〜400mg/日・¥2,000-5,000/月）の違いを論文で比較。\n\nアダプトゲン3兄弟（アシュワガンダ・ロディオラ・人参）の最後の対比で、両者とも「ストレス耐性を底上げする」アダプトゲンに分類されますが、作用機序と最適な評価軸が異なる補完関係です。アシュワガンダはwithanolide Aを主活性成分とし、HPA軸（視床下部-下垂体-副腎）のコルチゾール調整に作用（Salve 2019 KSM-66 600mg/日×8週でストレススコア・血中コルチゾール有意低下・Chandrasekhar 2012 RCT n=64でも同様）。Panax人参はginsenoside Rb1/Rg1（人参サポニン）を主活性成分とし、エネルギー代謝・認知パフォーマンス・末梢血流改善に作用（Reay 2010 Br J Nutr RCT 200mg/日で認知パフォーマンス改善・Bach 2016 Phytother Res RCTで疲労感低減）。\n\n使い分けの結論：①慢性ストレス・不眠・累積疲労ベース→アシュワガンダ優先、②急性疲労・集中力低下・男性活力（性機能/勃起機能）→Panax人参優先、③閉経後女性更年期のホットフラッシュ→Panax人参で改善RCTあり（Kim 2012）の3軸使い分けが王道。\n\n「西洋人参（Panax quinquefolius）vs 朝鮮人参（Panax ginseng）vs アシュワガンダ」の混同は頻発し、植物学的にPanax属（人参）とWithania属（アシュワガンダ）は完全に別科の植物で、サポニン構造もwithanolideとは別経路です。妊娠中・自己免疫疾患・SSRI併用・甲状腺薬併用・降圧薬併用・血糖降下薬併用での禁忌・注意事項、有効量、効果が出るまで、市販品の規格（KSM-66/Sensoril/CHO-A・正官庄・農協朝鮮人参等）を化粧品メーカー視点で解説。',
  },
  'fisetin-vs-quercetin': {
    title: 'フィセチン vs ケルセチン｜違い・senolytics・Fisetin 2.0評価を論文で比較',
    description: 'フィセチン（100〜500mg/日 hit-and-run・¥2,500-5,500/月）とケルセチン（500〜1,000mg/日継続・¥1,500-3,500/月）の違いを論文で比較。両者ともフラボノール骨格を持つポリフェノールで構造類似性が高く、共にsenolytics（老化細胞除去）作用が報告されていますが、senolytics作用強度と二刀流の有無が異なる補完関係です。\n\nフィセチンはYousefzadeh 2018 EBioMedicineでマウス約20%lifespan延長・複数臓器の老化細胞マーカー減少が報告され、Wake Forest大学でPhase II臨床試験が進行中。\n\nケルセチンはZhu 2015 Aging Cellで「D+Qカクテル」（ダサチニブ+ケルセチン）として senolyticsスクリーニングで最初に確立された成分で、Justice 2019 EBioMedicineでは特発性肺線維症患者にD+Q（dasatinib 100mg+quercetin 1,000mg）3日間×3週で身体機能改善Phase I RCT。\n\n「Fisetinはケルセチン上位互換」評価は早計で、①ケルセチンは抗ヒスタミン・抗炎症・血圧軽度低下のsenolytics以外の二刀流エビデンスが独立して確立、②フィセチンはsenolytics特化だが大規模ヒトRCTがまだ進行中で「マウス→ヒト」の移植期、③hit-and-run投与設計（2-3日連続→2-4週休薬）と継続投与設計（ケルセチン花粉症対策で日々500mg継続）の運用設計が逆方向、という3点で「適用集団が違う成分」設計が現実的です。Sinclair陣営のlongevityスタック（NMN+レスベラトロール+フィセチン or ケルセチン）での位置づけ、ワルファリン併用注意（両者抗血小板+CYP3A4阻害でINR上昇懸念）、化粧品メーカー視点での皮膚老化への直接効果RCT限定性、有効量、効果が出るまで、副作用、市販品（Doctor\'s Best Fisetin・Thorne Quercetin Phytosome等）を化粧品メーカー視点で解説。',
  },
  'spermidine-vs-resveratrol': {
    title: 'スペルミジン vs レスベラトロール｜違い・autophagy×SIRT1独立軸を論文で比較',
    description: 'スペルミジン（小麦胚芽抽出 1〜3mg/日・¥3,500-7,000/月）とレスベラトロール（trans型 100〜500mg/日・¥1,500-4,000/月）の違いを論文で比較。\n\n両者ともlongevity文脈の有力候補ですが、作用経路が完全に独立しているため競合関係ではなく補完関係です。\n\nスペルミジンは細胞内ポリアミンでautophagy（オートファジー・細胞内自食作用）誘導経由で作用（Eisenberg 2009 Nat Cell Biolで酵母/線虫/マウス寿命延長・Madeo 2018 Nat Med 観察研究 n=829で食事性スペルミジン摂取量と心血管死亡率・全死亡率の逆相関が報告）。\n\nレスベラトロールはSIRT1活性化・カロリー制限模倣経由で作用（Howitz 2003 Nature 古典論文・酵母/線虫/ハエ寿命延長・Tomé-Carneiro 2013 Pharmacol Res ヒトメタ解析）。\n\nスペルミジンの食事 vs サプリの整理：①食事由来＝小麦胚芽（約30mg/100g）・大豆発酵食品（納豆・味噌）・チーズ熟成品・干しシイタケが豊富で、Madeo 2018の観察研究は食事性スペルミジン摂取量を評価軸としており、精製サプリ単独のヒトRCTエビデンスはまだ初期段階、②精製サプリ＝spermidineLIFE®（Longevity Labs社・小麦胚芽抽出標準化）等で1-3mg/日が論文上、③高価帯（¥3,500-7,000/月）で食事改善との費用対効果比較を冷静に行うべき領域です。\n\n寿命延長エビデンスは両者ともマウス〜小規模ヒト初期段階で、「ヒトでX年寿命が延びる」断定的訴求はNG・「観察研究で関連が報告された」「マウスでlifespan延長が確認された」型が無難。Sinclair陣営のlongevityスタックでの位置づけ、ワルファリン併用注意（レスベラトロール抗血小板）、化粧品メーカー視点（外用レスベラトロールRCT vs スペルミジンは経口主軸）、有効量、効果が出るまで、副作用、月コスト、食事改善との費用対効果を化粧品メーカー視点で解説。',
  },
  'l-theanine-vs-gaba': {
    title: 'L-テアニン vs GABA｜違い・BBB通過論争・PharmaGABAを論文で比較',
    description: 'L-テアニン（200〜400mg・¥1,000-2,500/月）とGABA（経口 100〜200mg・¥1,500-3,500/月）の違いを論文で比較。両者ともGABA系神経伝達物質の調整を介してリラックス効果が訴求されますが、血液脳関門（BBB）通過の論点でエビデンス強度が大きく異なる関係です。\n\nL-テアニンは緑茶由来アミノ酸で、Hidese 2019 RCT n=30で200mg/日×4週で睡眠の質・心理ストレス症状有意改善・Lyon 2011 RCTで注意力改善・Owen 2008 Nutr Neurosciでテアニン+カフェイン併用注意改善が報告されています。テアニンはBBBを通過することが確立しており（Yokogoshi 1998 Neurochem Res）、脳内で直接GABA関連経路に作用します。\n\nGABA経口はBBB通過に関する論争があり、①Boonstra 2015 Front Psychol systematic reviewで「経口GABAはBBBを通過しないが、末梢経由でHPA軸を修飾する間接効果の可能性」が指摘、②Abdou 2006 BioFactorsでPharmaGABA® 100mg経口でリラックス反応（α波増加・コルチゾール低下）が報告されているがプラセボ群との差が穏やか、③大規模RCTがまだ少なく「経口GABAが脳に直接効く」断定的訴求は論文ベースで成立しない領域です。\n\n第一選択はテアニン200mgが王道で、GABAは「PharmaGABA®特定形態のヒトRCTは限定的だが、末梢経由の穏やかな効果は否定できない補助レイヤー」として位置づけるのがFactcheck整合的。\n\n「飲んで30分でリラックス」の即時感覚はテアニンの方が再現性高く報告されており、GABAは個人差が大きい印象が論文と一致します。降圧薬・SSRI・抗不安薬（ベンゾジアゼピン系）併用注意、有効量、効果が出るまで、副作用、月コスト、市販品（Suntheanine®・PharmaGABA®）を化粧品メーカー視点で解説。',
  },
  'creatine-vs-l-glutamine': {
    title: 'クレアチン vs L-グルタミン｜違い・筋トレ vs 腸活・役割分担を論文で比較',
    description: 'クレアチン（3〜5g/日・¥1,000-2,500/月）とL-グルタミン（5〜10g/日・¥1,500-3,500/月）の違いを論文で比較。両者ともアミノ酸関連サプリで筋トレ層に人気ですが、作用ターゲットが筋肉と腸管で完全に分かれた補完関係です。\n\nクレアチンはATP再合成（高強度短時間運動のエネルギー供給）経由で筋力・パワー・除脂肪体重に作用（Kreider 2017 JISSNポジションスタンドで「最も研究され効果の証拠が確立されたエルゴジェニックサプリ」評価・Lanhers 2017 Sports Medメタ解析n=1,800超で上半身筋力 +7%・下半身筋力 +8%）。\n\nL-グルタミンは条件付き必須アミノ酸で腸管バリア機能の維持・免疫機能補助に作用（Klimberg 1996 J Surg Resで術後/重症患者の腸管バリア機能補助・Rao 2012 J Epithel Biol Pharmacol systematic reviewで腸粘膜tight junction強化・Castell 1996 Eur J Appl Physiolでマラソン後免疫低下抑制）。\n\n筋トレ目的での比較ではクレアチン圧勝で、グルタミンは健常若年トレーニーへの筋肥大/筋力効果はCandow 2001等で否定的（健常者では血中グルタミン濃度が枯渇しにくく、追加摂取の必要性が薄い）。\n\nグルタミンの真価は①術後/長期入院/重症患者の腸管バリア補助、②慢性下痢・リーキーガット症候群（仮説段階）への腸活補助、③高強度持久運動後の免疫機能補助の3軸で。\n\n「筋トレ補助」目的なら期待外れ・「腸活/免疫機能補助」目的なら論文ベース合理的という適用集団の使い分けが現実的。クレアチン×血清クレアチニン上昇による腎機能誤判定への注意（実害ではなく検査値ノイズ）、グルタミン×術後がん患者での慎重論、両者の併用設計、有効量、効果が出るまで、副作用、月コスト、市販品を化粧品メーカー視点で解説。',
  },
  // ── Sprint 1 Session A Day 4 バッチ 2026-05-13（Cluster 7 ビタミンD head KW フル攻略） ────
  'vitamin-d-vs-vitamin-k2': {
    title: 'ビタミンD vs K2（MK-7）｜骨密度・動脈石灰化・併用比率を論文で比較',
    description: 'ビタミンD（1,000〜4,000IU/日・D3コレカルシフェロール）とビタミンK2（MK-7 90〜200μg/日）の違いを論文で比較。ビタミンDは腸管でのカルシウム吸収を促進する「カルシウムを体内に取り込む」役割、ビタミンK2（MK-7）はオステオカルシン（骨）とMGP（マトリックスGlaタンパク・血管）を活性化して取り込んだカルシウムを「骨に配分し血管壁への沈着を抑える」役割で、両者は補完関係。Hodges 2020 Current Developments in Nutrition のレビューで「ビタミンD単独高用量補充では血管石灰化リスクが理論的に上昇しうるが、K2併用でカルシウム配分の最適化が示唆される」と整理されています。\n\nKnapen 2013 Thromb Haemost RCT n=244（閉経後女性に MK-7 180μg/日×3年）では大腿骨頸部の骨密度維持と動脈硬化指標（cfPWV）改善が報告されており、骨粗鬆症予防・心血管リスク両軸で妥当な併用です。ビタミンD3 1,000〜4,000IU/日 ＋ MK-7 90〜200μg/日のセット製品（Thorne D3+K2・Sports Research D3+K2 等）が市販されており、骨粗鬆症リスクが気になる中高年・室内勤務で日光不足の方は併用が現実解です。\n\nワルファリン服用中の方はK2併用で抗凝固効果が減弱するため絶対医師相談、K1（緑黄色野菜由来）とK2（納豆・チーズ由来）の違い、MK-4（短時間作用・動物由来）とMK-7（長時間作用・納豆由来）の使い分け、過剰摂取上限（D 4,000IU・K2 副作用報告ほぼなし）、妊娠中授乳中の用量目安を化粧品メーカー視点で解説。',
  },
  // ── Session F Day 7 バッチ 2026-05-13（cardiovascular/cognitive/gut/sleep 既存pair の PAIR_SEO 埋め・vitamin-d-vs-vitamin-k2 は Sprint 1 Session A Day 4 8259f85 で先取り追加済のためスキップ） ────────────
  'l-arginine-vs-l-citrulline': {
    title: 'L-アルギニン vs L-シトルリン｜違い・吸収率・経口でどっちがNO産生を上げる？',
    description: 'L-アルギニン（経口3〜6g/日・¥1,500-3,500/月）とL-シトルリン（経口3〜8g/日・¥2,000-4,000/月）の違いを論文で比較。両者はNO（一酸化窒素）前駆体として血管拡張・血流改善・運動パフォーマンス・男性活力の文脈で訴求されますが、経口吸収率の実用的整理ではシトルリン優位が独占切り口です。\n\nSchwedhelm 2008 Br J Clin Pharmacol RCT n=20でシトルリン経口3g×2/日はアルギニン経口3g×2/日より24h血漿アルギニン濃度AUCを約2倍に高く維持できることが報告され、これはL-アルギニン経口が肝臓・小腸の尿素回路代謝で初回通過効果として大半が消失する（Bode-Böger 2007 Br J Pharmacol レビュー）のに対し、シトルリンは肝臓を素通りして腎臓でアルギニンに変換される代謝経路の差に基づきます。\n\n運動パフォーマンスではBailey 2010 J Appl Physiol RCT n=9 シトルリン6g/日で重度運動TTE改善が報告される一方、アルギニン経口の運動効果メタ解析は一致した結果を示していません（Bescós 2012 Sports Med review）。\n\n男性活力（ED補助文脈）ではCormio 2011 Urology RCT n=24 シトルリン1.5g/日×1ヶ月で軽度ED改善が報告される一方、アルギニン高用量（5g/日以上）は個人差が大きく論文と一致。\n\n「経口アルギニンは初回通過効果で消失する割合が大きい・シトルリン経由で取る方が効率的」裏切り型整理は論文ベース合理的で、経口摂取ではシトルリン優位が現代のスポーツ栄養学の標準理解です。ただしシルデナフィル/タダラフィル等PDE5阻害薬併用は重篤低血圧リスクで絶対回避（NO/cGMP二重増強）、ヘルペス活性化リスク（アルギニン高用量・HSV症状増悪症例報告あり・リジンと拮抗）、降圧薬併用注意、慢性腎臓病CKDで両者高用量医師相談。形態（シトルリンマレート・α-ケトグルタレート塩・遊離型）、運動 vs ED補助 vs 心血管軸の使い分け、有効量、効果が出るまで、副作用、月コスト、市販品（Now Foods/Doctor\'s Best/Thorne）を化粧品メーカー視点で解説。',
  },
  'ginkgo-biloba-vs-bacopa-monnieri': {
    title: 'イチョウ葉 vs バコパモニエリ｜末梢血流 vs 神経伝達物質・年代別の使い分けを論文で比較',
    description: 'イチョウ葉エキス（EGb 761® 120〜240mg/日・¥1,500-3,500/月）とバコパモニエリ（CDRI 08 300mg/日・¥1,500-3,000/月）の違いを論文で比較。両者とも認知サポートで訴求されますが、末梢血流改善 vs 中枢神経伝達物質経路で完全に独立した作用機序で、年代軸の使い分けが無難です。\n\nイチョウ葉（EGb 761® Schwabe社特定規格品・フラボン配糖体24%・テルペンラクトン6%）＝末梢血管拡張・血小板凝集抑制（ginkgolide B のPAF拮抗作用）でLe Bars 1997 JAMA RCT n=309 AD/血管性認知症患者でMMSE維持が報告された古典論文ですが、Snitz 2009 GEM trial JAMA n=3,069 健常高齢者にEGb 761® 240mg/日×中央値6年で認知症発症率の有意差なし・DeKosky 2008 JAMA でも認知症進行抑制エビデンス否定的で。\n\n「認知症予防エビデンスは大規模RCTで否定的の誠実評価」が現代の現実的整理。\n\nバコパモニエリ（CDRI 08標準化品・bacosides A/B含有）＝アセチルコリン受容体・SSRI様作用・抗酸化でStough 2008 Phytother Res RCT bacopa 300mg/日×12週で健常成人の言語学習・記憶テスト改善・Kongkeaw 2014 J Ethnopharmacol メタ解析9 RCTで認知機能改善が報告。\n\n年代軸の使い分け＝①20-50代の集中力・学習能力・記憶補助→バコパ優先（健常成人RCT実績）、②60代以上のMCI（軽度認知障害）への補助→Mori 2009 ヤマブシタケや他成分と並行で慎重に位置づけ（イチョウ葉単独は予防エビデンス未確立）、③認知症診断後の補助は医療領域・サプリ守備範囲外。\n\n両者とも効果が出るまで12-16週の累積効果型で、カフェイン/L-テアニンのような即時感覚はない。\n\n抗凝固薬（ワルファリン・アスピリン・DOAC）併用注意＝イチョウ葉ginkgolide BのPAF阻害で出血リスク（Vale 1998 Lancet 自然発生硬膜下血腫症例）・手術前2週休薬推奨。バコパは消化器症状（嘔気・下痢・腹部膨満）報告で食後摂取推奨。\n\n「認知症が治る」絶対NG→「MCI患者RCTで認知機能スコア改善が報告された」型統一。市販品・月コスト・形態を化粧品メーカー視点で解説。',
  },
  'probiotics-vs-inulin': {
    title: 'プロバイオティクス vs イヌリン｜プロバイオ vs プレバイオ・株特異性・シンバイオティクスを論文で比較',
    description: 'プロバイオティクス（生菌サプリ 100億〜1000億CFU/日・¥1,500-3,500/月）とイヌリン（プレバイオ食物繊維 5〜10g/日・¥1,000-2,500/月）の違いを論文で比較。両者はプロバイオ（生菌・株特異性）vs プレバイオ（食物繊維・全菌叢支援）で役割が完全に分かれた補完関係で、両者併用＝シンバイオティクスが王道な標準解です。\n\nプロバイオティクスは株特異性が決定的で、株IDが明示されている製品のみエビデンスを追える＝①Lactobacillus plantarum 299v（LP299v）でIBS-D症状改善（Niedzielin 2001 Eur J Gastroenterol Hepatol RCT）、②Lactobacillus rhamnosus GG（LGG）で抗生物質関連下痢予防（Hempel 2012 JAMA メタ）、③Bifidobacterium lactis BB-12 で便秘改善（Eskesen 2015 Br J Nutr RCT）、④Lactobacillus reuteri DSM 17938 で乳児疝痛軽減（Sung 2018 Pediatrics メタ）など株ID別にエビデンスが蓄積されている領域で。\n\n「乳酸菌1000億個」のような株名なし訴求は論文ベースで評価不能。\n\nイヌリンはチコリ・ゴボウ・タマネギ等に豊富な水溶性食物繊維で、大腸でBifidobacterium属に選択的に発酵されて短鎖脂肪酸（酪酸・酢酸・プロピオン酸）を産生→腸管バリア強化・全菌叢多様性向上（Slavin 2013 Nutrients review・Kolida 2007 Br J Nutr メタ）。\n\nシンバイオティクス設計＝プロバイオ（生菌補充）+プレバイオ（菌の餌補給）で個別単独より相乗効果が示唆されています（Petschow 2013 Curr Opin Gastroenterol）。\n\nAkkermansia muciniphila＝Depommier 2019 Nat Med RCT n=32で肥満インスリン感受性改善が報告された次世代プロバイオですが日本未承認食品扱いで個人輸入領域。\n\nSIBO（小腸内細菌異常増殖）疑い時のFODMAP配慮＝イヌリンは高FODMAPでHalmos 2014 Gastroenterologyで腹部膨満・ガス症状増悪リスク→SIBO疑い時は低FODMAPプロバイオ単独へ切替が現実的。\n\n免疫抑制状態（化学療法中・移植後・HIV進行期）のプロバイオは菌血症リスク稀（Salminen 2004 Clin Infect Dis 症例報告）医師相談下。「便秘解消」「腸内環境を整える」断定NG→「便通・腸内細菌叢多様性に寄与する報告」型統一。ヨーグルト vs サプリのコスト効率、有効量、効果が出るまで、市販品（Culturelle/Renew Life Ultimate Flora/Now Foods Inulin Powder）を化粧品メーカー視点で解説。',
  },
  '5-htp-vs-l-tryptophan': {
    title: '5-HTP vs L-トリプトファン｜違い・1989年EMS事件の歴史・SSRI併用禁忌セロトニン症候群を論文で比較',
    description: '5-HTP（5-ヒドロキシトリプトファン 50〜200mg/日・¥1,500-3,000/月）とL-トリプトファン（500〜2,000mg/日・¥1,500-3,500/月）の違いを論文で比較。両者はセロトニン前駆体で5-HTPはトリプトファンの中間代謝物（経路：トリプトファン→5-HTP→セロトニン→メラトニン）、BBB通過率は5-HTPの方が高いとされ、機序上は5-HTPがより直接的にセロトニン産生に作用します。\n\nただし本ペアはYMYL最厳格領域で。\n\n1989年Eosinophilia-Myalgia Syndrome（EMS・好酸球増多筋痛症候群）事件の歴史的背景を必須記述＝Showa Denko社製L-トリプトファン汚染ロット（製造プロセス変更で副産物EBT等が混入）で米国37名死亡・1,500名以上が筋痛・好酸球増多・神経障害の後遺症（Slutsker 1990 JAMA・Belongia 1990 NEJM）→FDA 1989年L-トリプトファン輸入規制（2001年部分緩和・現在も注意継続）。\n\n「現行のL-トリプトファンサプリは1990年代以降の製造プロセス改善で大規模事故は発生していない」が、歴史的経緯を踏まえた慎重論は今も妥当。\n\n5-HTPはGriffonia simplicifolia種子由来で経路が異なるためEMS関連の汚染リスクは限定的ですが、Michelson 1994 Mayo Clin Proc で5-HTPでも好酸球増多症例の報告あり（Peak X様代謝物検出）。\n\nSSRI/SNRI/MAOI併用は絶対禁忌＝セロトニン症候群最重篤副作用（Boyer 2005 NEJM レビュー・3徴＝自律神経/神経筋/精神状態異常・高熱・痙攣・横紋筋融解・意識障害・死亡例）。\n\n5-HTP単独使用＝Birdsall 1998 Altern Med Rev レビューで気分症状・不安・線維筋痛症で穏やかな改善報告（小規模RCT中心・大規模RCT未整備）、L-トリプトファン＝Hartmann 1986 Biol Psychiatry で1-2g就寝前の入眠潜時短縮報告。\n\n「うつ症状改善」絶対NG→「気分症状の補助的サポート」「メタ解析で穏やかな改善が報告」型。\n\nうつ・不安・パニック発作・睡眠障害は精神科第一選択（SSRI/SNRI/CBT エビデンス確立・サプリは補助のみ）が無難。\n\nSSRI（フルオキセチン/パロキセチン/セルトラリン/エスシタロプラム等）・SNRI（デュロキセチン/ベンラファキシン）・MAOI（セレギリン/モクロベミド）・トラマドール・トリプタン系・リネゾリド併用絶対禁忌、妊娠中・授乳中・小児・双極性障害・パーキンソン病薬カルビドパ併用注意は禁忌寄り。本サイトの立場として5-HTP/L-トリプトファンは第一選択推奨はしないスタンスを明示し、軽症不眠の妥当代替軸（マグネシウム グリシン酸塩400mg/日・L-テアニン200mg/日・グリシン3g/日）を優先提示。歴史的経緯・副作用・併用禁忌・市販品・代替軸（SAMe・マグネシウム・L-テアニン・ラベンダー）を化粧品メーカー視点で解説。',
  },
  // ── Session F Day 8 バッチ 2026-05-13（antiaging/cardiovascular/energy/cognitive クラスタ拡張デー） ────
  'spermidine-vs-fisetin': {
    title: 'スペルミジン vs フィセチン｜オートファジー×senolytics 独立軸・寿命延長エビデンスを論文で誠実比較',
    description: 'スペルミジン（1〜3mg/日サプリ・¥3,500-7,000/月）とフィセチン（100〜500mg/日 hit-and-run・¥3,000-6,000/月）の違いを論文で比較。両者は抗老化サプリで混同されやすいですが、作用経路と投与設計が完全に異なる独立軸の補完関係です。\n\nスペルミジンはポリアミンの一種でオートファジー（細胞内自食作用）誘導によって老化細胞の蛋白質凝集物・損傷ミトコンドリアをクリアランスする機序が動物試験で確立（Eisenberg 2009 Nat Cell Biol 酵母・線虫・マウスで寿命延長・Eisenberg 2016 Nat Med マウス心臓加齢抑制）、観察研究では食事性スペルミジン摂取量と心血管死亡率・全死亡率の逆相関が報告されています（Madeo 2018 Nat Med n=829 観察研究）。\n\nスペルミジン豊富食品＝小麦胚芽（30mg/100g）・大豆発酵食品（納豆・味噌）・チーズ熟成品・干しシイタケで日本食はもともと摂取量多い食文化、Madeo 2018は食事性摂取量評価軸であり精製サプリ単独のヒトRCTエビデンスは初期段階に留まる点を誠実に明示する必要があります。spermidineLIFE®（Longevity Labs社・小麦胚芽抽出物標準化品）等が代表市販品です。\n\nフィセチンはイチゴ・リンゴ・柿等に微量含まれるフラボノール骨格の成分でsenolytics（老化細胞除去剤）の独立軸として注目される新興成分（Yousefzadeh 2018 EBioMedicine マウスでlifespan延長・Wake Forest大学Phase II進行中）、Zhu 2017 EBioMedicine でダサチニブとの比較でフィセチン単独でも senolytic 活性が示唆されています。\n\n投与設計が決定的に異なる＝フィセチンはhit-and-run サイクル投与（2-3日連続100-500mg→2-4週休薬）が David Sinclair 等の研究者提唱パターンに対し、スペルミジンは毎日継続摂取が観察研究で示唆される摂取様式で投与設計が真逆です。\n\n「寿命延長エビデンスは両者ともヒトで未確立」誠実評価＝スペルミジンの心血管死亡率逆相関は観察研究で因果関係未確立、フィセチンのlifespan延長はマウスエビデンスでヒトRCTは進行中という現状を伝えるのが論文上で責任ある立場です。\n\nコスト現実解＝スペルミジン精製サプリ¥3,500-7,000/月に対し食事改善（小麦胚芽15g/日で4.5mg・大豆発酵食品増量）がROI最高で、フィセチンは hit-and-run なら月¥3,000-6,000で済む計算ですが、同価格帯でケルセチン（抗ヒスタミン二刀流・花粉症エビデンス確立 Mlcek 2016 Molecules）の方が日常体感型のROIが見える領域です。\n\n併用注意＝両者ともCYP3A4阻害でカルシウム拮抗薬・スタチン・タクロリムス血中濃度上昇懸念、フィセチンは抗凝固薬INR上昇懸念、エストロゲン受容体陽性乳がん既往は両者とも医師相談、妊娠中授乳中はエビデンス不足で回避領域。\n\n「老化が逆転する」「寿命が延びる」断定NG→「動物試験ベース」「観察研究で関連が示唆された」型統一、Now Foods/Doctor\'s Best/spermidineLIFE® の第三者検査済みブランド推奨、化粧品メーカー視点で皮膚老化への直接効果ヒトRCTは両者とも未確立で外用レチノール/ナイアシンアミド優先という現実解を解説。',
  },
  'nattokinase-vs-vitamin-k2': {
    title: 'ナットウキナーゼ vs ビタミンK2｜納豆菌由来同素材だが作用機序完全別・抗凝固薬併用の混同整理を論文で比較',
    description: 'ナットウキナーゼ（2,000FU/日・¥1,800-3,500/月）とビタミンK2（メナキノン7・MK-7 100〜200μg/日・¥1,500-3,000/月）の違いを論文で比較。\n\n両者は納豆菌Bacillus subtilis natto培養由来で同じ素材から派生する成分ですが、作用機序が完全に別で混同されやすい領域です。\n\nナットウキナーゼは線溶系プロテアーゼでプラスミン様作用＝既存血栓を溶かす方向（Sumi 1987 Experientia 古典論文・Kurosawa 2015 Sci Rep RCT で線溶活性マーカー改善・Hodis 2021 Atherosclerosis 観察研究で動脈硬化進行抑制示唆）、NSK-SD®（Japan Bio Science Laboratory社特許品）が世界標準規格品です。\n\nビタミンK2（MK-7）は脂溶性ビタミンでGla化（γ-カルボキシル化）反応の補酵素として作用し。\n\nマトリックスGlaタンパク質（MGP）を活性化→血管平滑筋層の石灰化抑制＋オステオカルシン活性化で骨石灰化促進の二方向＝「血管から石灰を骨へ運ぶ」方向（Geleijnse 2004 Rotterdam Study 観察研究 n=4,807でMK摂取量と動脈石灰化・心血管死亡率逆相関・Knapen 2013 Thromb Haemost RCT n=244 閉経後女性MK-7 180μg/日×3年で頸動脈硬度cfPWV有意改善・Schurgers 2007 Blood で MK-4 vs MK-7 半減期差確立）、MenaQ7®（NattoPharma社特許品）が世界標準規格品です。\n\n裏切り型独占切り口＝「両者とも『血液サラサラ系』訴求で混同されるが、ナットウキナーゼ=既に出来た血栓を溶かす方／ビタミンK2=血管石灰化を防ぎ骨へ運ぶ方で作用機序が完全に別」＋ワルファリン併用の方向性が真逆＝ナットウキナーゼは出血リスク増（線溶活性増強）でワルファリン併用は禁忌寄り、対してビタミンK2はワルファリンの抗凝固作用を拮抗（VK依存性凝固因子を活性化）するため処方ワルファリン服用中は禁忌で。\n\n両薬剤併用中は両者とも絶対禁忌寄りとなります。\n\n形態差＝ビタミンK2はMK-4（短半減期1〜2時間・骨密度RCT用量45mg/日大量・処方医薬品グラケー®カプセル）vs MK-7（長半減期72時間・サプリ標準・100-200μg/日少量で血中濃度持続）が決定的に異なります（Schurgers 2007 Blood）。\n\n抗血小板薬（アスピリン・クロピドグレル等）・DOAC（リバーロキサバン・アピキサバン等）併用も同様に医師相談、手術前2週休薬推奨。妊娠中はナットウキナーゼ控えめ（エビデンス不足）・ビタミンK2は妊娠中も比較的安全領域。\n\n納豆アレルギー（PA血症・セミ咬傷由来の遅延型アナフィラキシー報告 Inomata 2007 J Allergy Clin Immunol）が稀にあり、両者とも完全回避が必要です。\n\n「血栓を溶かす」「動脈硬化を治す」「血液サラサラ」断定NG→「線溶活性マーカー改善が報告」「血管石灰化抑制が示唆された」型統一、心血管1次予防は運動・地中海食・血圧管理が王道優先でサプリは補助、Doctor\'s Best NSK-SD®/Now Foods MK-7 MenaQ7®/Life Extension Super K の市販品を化粧品メーカー視点で解説。',
  },
  'alpha-lipoic-acid-vs-coq10': {
    title: 'αリポ酸 vs CoQ10｜ミトコンドリア2大成分の水脂溶性両親媒×電子伝達系を論文で比較',
    description: 'αリポ酸（ALA・600〜1,200mg/日・¥1,500-3,500/月）とCoQ10（コエンザイムQ10・ユビキノール100-200mg・ユビキノン100-300mg/日・¥2,000-6,000/月）の違いを論文で比較。\n\n両者ともミトコンドリア機能サプリの代表成分ですが、作用ターゲットと適用集団が異なる補完関係です。\n\nαリポ酸は水脂溶性両親媒性で細胞質とミトコンドリア両方に分布する強力な抗酸化物質＋ピルビン酸脱水素酵素複合体の補因子として糖代謝にも作用。\n\nZiegler 2006 Diabetes Care SYDNEY 2 trial RCT n=181 経口ALA 600mg/日×5週で糖尿病性末梢神経障害（DSPN）症状有意改善・Ziegler 2011 Diabetes Care ALADIN III RCT n=460 ALA 1,800mg/日×4年で神経障害進行抑制傾向・グルタチオン再生補助でビタミンC・E抗酸化サイクルを支える機序です。\n\n形態差＝R体（生体活性型R-ALA・天然型）vs S体ラセミ体（合成型）で、R-ALAの方が生物学的活性高くサプリ選択時の重要指標です（Mignini 2007 Eur Rev Med Pharmacol Sci ）。\n\nCoQ10はミトコンドリア内膜の電子伝達系複合体I-III間の電子運搬補酵素で既存ミトコンドリア稼働支援が主軸。\n\nMortensen 2014 JACC Heart Fail Q-SYMBIO RCT n=420 CoQ10 100mg×3/日×2年で心血管イベント・全死亡率有意減・Caso 2007 Am J Cardiol RCT n=32 CoQ10 100mg/日×30日でスタチン誘発筋痛軽減・Hosoi 2008 Nutrients でユビキノール（還元型・40代以降推奨）vs ユビキノン（酸化型・若年層コスパ）の使い分け確立。\n\nŽmitek 2017 J Cosmet Dermatol RCT n=33 経口CoQ10 150mg/日×12週でしわ深さ改善で皮膚老化への直接効果も確認されています。\n\n裏切り型独占切り口＝「両者とも『ミトコンドリア活性化』訴求で重複しがちだが、ALA=糖代謝・グルタチオン再生・水脂溶性両親媒で広域カバー／CoQ10=電子伝達系補酵素・心血管・スタチン併用で論文蓄積の主戦場が違う」＝適用集団使い分けが決定的＝①糖尿病・前糖尿病・代謝症候群でインスリン抵抗性改善＋抗酸化補助→ALA優先／②心不全・心血管疾患既往・スタチン服用中の筋痛軽減→CoQ10優先／③40代以降の全身的エネルギー低下・抗老化補助→CoQ10ユビキノール優先／④皮膚老化・しわ改善の経口アプローチ→CoQ10ユビキノール（Žmitek 2017 RCT根拠）。\n\n併用注意の方向が真逆＝ALA高用量（600-1,200mg/日）は糖尿病薬（メトホルミン・SGLT2阻害薬・GLP-1作動薬・インスリン）併用で低血糖警告必須（Diabetes Care 推奨血糖モニタリング強化）、対してCoQ10はワルファリン併用でINR低下＝出血ではなく血栓側のリスク（VK構造類似でVK依存性凝固因子に影響・Engelsen 2002 Thromb Haemost）の真逆方向の警告が両薬剤併用注意の核心です。\n\nチオクト酸（処方医薬品扱い・国内Yansulin等）vs αリポ酸サプリ（食品扱い）の関係も整理必要（同一成分の規制区分差）。\n\n降圧薬とCoQ10併用は血圧低下増強で注意、両者とも妊娠中授乳中はエビデンス限定で医師相談、化学療法中（特にドキソルビシン）はCoQ10の効果文脈で腫瘍内科判断必須。\n\n「糖尿病が治る」「心臓病が治る」断定NG→「血糖コントロール・心機能マーカー改善が報告」型統一、Now Foods/Doctor\'s Best/Jarrow Formulas Kaneka Ubiquinol/Thorne の第三者検査済みブランド推奨、化粧品メーカー視点でCoQ10の皮膚老化への経口エビデンス（Žmitek 2017）を解説。',
  },
  'urolithin-a-vs-coq10': {
    title: 'ウロリチンA vs CoQ10｜mitophagy×電子伝達系 経路独立軸・腸内代謝個人差を論文で比較',
    description: 'ウロリチンA（Mitopure®・500〜1,000mg/日・¥10,000-15,000/月）とCoQ10（ユビキノール100-200mg/ユビキノン100-300mg/日・¥2,000-6,000/月）の違いを論文で比較。\n\n両者ともミトコンドリア機能サプリで混同されやすいですが、作用経路が完全に独立しているため併用合理性が高い補完関係です。\n\nウロリチンAはザクロ・ベリー類・クルミに含まれるエラジタンニンの腸内細菌代謝産物で。\n\nmitophagy（不良ミトコンドリアの選択的オートファジー）誘導＋ミトコンドリア生合成（PGC-1α活性化）の独自軸＝Ryu 2016 Nat Med 線虫マウスでミトコンドリア機能・運動能力改善が報告・Andreux 2019 Nat Metab RCT n=66 健常高齢者500-1,000mg/日×4週でミトコンドリア遺伝子発現有意改善・Liu 2022 JAMA Network Open Phase 2 RCT n=88 ウロリチンA 1,000mg/日×4ヶ月で筋持久力改善が報告された新興エビデンス成分です。\n\n最大の独占切り口＝Selma 2017 Eur J Nutr で「ウロリチン産生者・非産生者」分類＝ザクロ・ベリー類のエラジタンニン→ウロリチンA変換能を持つ腸内細菌（Gordonibacter属・Ellagibacter属等）の保有率は欧米人で30-40%のみで。\n\nザクロを食べてもウロリチンAが産生されない人が大多数という独自背景があり、Mitopure®（Amazentis社特許品・スイスEPFL発スタートアップ・Timeline社販売・Costco取扱）の直接サプリ摂取が論文上で合理的という産業構造が成立しています。\n\nCoQ10は既存ミトコンドリア稼働支援（電子伝達系複合体I-III間の電子運搬補酵素）でMortensen 2014 JACC Heart Fail Q-SYMBIO RCT n=420 心血管イベント有意減・Caso 2007 Am J Cardiol スタチン誘発筋痛軽減という40年蓄積のエビデンス成分です。\n\n裏切り型独占切り口＝「両者とも『ミトコンドリア活性化』訴求で混同されるが、ウロリチンA=mitophagy（古いミトコンドリアの分解・除去）／CoQ10=既存ミトコンドリアの稼働支援 で経路独立・併用シナジー合理」＝両者併用は理論的に補完関係（古いミトコンドリア除去＋新しいミトコンドリア生合成・既存稼働支援）として整合的です。\n\nコスト現実解＝Mitopure® ¥10,000-15,000/月で日本国内最高価格帯ミトコンドリア系サプリに対しCoQ10ユビキノール¥3,000-5,000/月＋運動が現実的＝Liu 2022 で筋持久力改善は確認されたものの、寿命延長・体感的若返りはまだ未確立で「老化マーカー改善は確認・体感は穏やか・長期寿命延長エビデンスは未確立」期待値調整が最優先です。\n\n業界文脈＝CoQ10はKaneka社（日本）・ChromaDex社・Pfizer傘下 vs ウロリチンAはAmazentis社（スイスEPFL発・Nestle Health Science提携・Timeline社米国販売）で業界構造が完全別です。\n\nMitopure®ジェネリック品（Doctor\'s Best ウロリチンA等）の品質バラつき＝特許品Mitopure®以外は標準化と純度に課題、第三者検査済みの製造ロット選択が論文上で重要です。\n\n併用注意＝CoQ10×ワルファリンINR低下（前項記載）・降圧薬血圧低下増強、ウロリチンAは長期データ限定でエストロゲン受容体interaction理論的懸念は要医師相談、両者とも妊娠中授乳中エビデンス未確立で回避領域、Mitopure®は日本国内ヘルスクレーム未認可で海外個人輸入領域です。\n\n「老化が逆転」「ミトコンドリア若返り」断定NG→「ミトコンドリア機能マーカー改善が報告」「筋持久力改善が報告」型統一、化粧品メーカー視点で両者とも皮膚老化への直接効果RCTは未確立（CoQ10 Žmitek 2017 のみ）で外用レチノール/ナイアシンアミド優先という現実解、Timeline Mitopure® vs Now Foods/Jarrow Formulas Kaneka Ubiquinol の市販品を化粧品メーカー視点で解説。',
  },
  'phosphatidylserine-vs-alpha-gpc': {
    title: 'ホスファチジルセリン vs α-GPC｜膜流動性×コリン供給 経路独立軸を論文で比較',
    description: 'ホスファチジルセリン（PS・100〜300mg/日・¥2,500-5,000/月）とα-GPC（L-α-グリセロホスホコリン・300〜600mg/日・¥2,500-4,500/月）の違いを論文で比較。\n\n両者とも認知機能サプリで混同されやすいですが、作用経路と最適な対象が完全に異なる補完関係です。\n\nホスファチジルセリンは神経細胞膜のリン脂質構成成分で膜流動性・神経伝達物質受容体機能の維持＋コルチゾール抑制の二経路。\n\nCrook 1991 Neurology RCT n=149 ウシ脳由来PS 300mg/日×12週で加齢関連記憶障害（AAMI）改善（古典論文・現在は狂牛病リスクで大豆由来主流）・Kingsley 2006 Med Sci Sports Exerc PS 750mg/日×10日で運動誘発コルチゾール抑制・Vakhapova 2010 Dement Geriatr Cogn Disord 大豆由来PS+DHA併用RCTで高齢者認知機能改善・Sharp-PS®（Enzymotec社・大豆由来標準化品）が市販主流です。\n\nα-GPCはコリン前駆体で血液脳関門通過率が高くアセチルコリン合成基質として脳内コリン濃度を上げる機序。\n\nParker 2011 J Int Soc Sports Nutr RCT n=13 α-GPC 600mg/日×7日でベンチプレス峰力増加・De Jesus Moreno 2003 Clin Ther RCT n=261 α-GPC 1,200mg/日×6ヶ月でAD早期認知機能改善・Marcus 2017 Sports Sci α-GPC 300mg ハンドグリップ筋力増加が報告された新興エビデンス成分です。\n\n独占切り口＝年代軸×用途軸の使い分け＝①20-50代運動パフォーマンス（パワー出力・筋力増加）→α-GPC 600mg/日（Parker 2011・Marcus 2017 根拠）／②慢性ストレス×認知疲労（プレゼンテーション前・受験・集中力低下）→PS 100-300mg（Kingsley 2006 コルチゾール抑制根拠）／③60代以上のMCI予防・認知機能維持→両者の補助検討（神経内科第一選択前提・Crook 1991 PS／De Jesus Moreno 2003 α-GPC 根拠）／④認知症診断後 → 神経内科処方薬第一選択（コリンエステラーゼ阻害薬ドネペジル・メマンチン・抗体医薬レカネマブ）でサプリは守備範囲外です。\n\n裏切り型誠実評価＝α-GPC 大規模観察研究で脳卒中リスク上昇懸念報告＝ANRT 2021 Am J Prev Med n=12,532観察研究で長期高用量α-GPC摂取者でTIA・脳卒中リスク 1.46倍が報告された（観察研究で因果未確立だが慎重論あり）→「ヒトRCT短期ではエビデンスあるが長期高用量は慎重論あり」期待値調整が論文上で責任ある立場です。\n\n両者は経路独立で併用可能ですが、α-GPCはコリン供給で末梢副作用（消化器症状・口臭・体臭が魚臭くなるTMAO産生関連）が稀に発生、PSはほぼ副作用報告なしの安全プロファイルです。\n\n併用注意＝α-GPCはアルツハイマー処方薬コリンエステラーゼ阻害薬（ドネペジル・ガランタミン・リバスチグミン）併用で理論的相加効果（コリン作動性過剰）医師相談、PSはSSRI・抗うつ薬で相互作用報告なしも医師相談、両者とも妊娠中授乳中エビデンス限定で医師相談、抗凝固薬と理論的相互作用報告なしですが手術前1週休薬推奨です。\n\n「認知症が治る」「頭が良くなる」絶対NG→「加齢関連記憶障害の補助的サポート」「運動パフォーマンス指標で改善が報告」型統一、Sharp-PS®大豆由来PS（Doctor\'s Best/Now Foods/Jarrow Formulas）vs AlphaSize®α-GPC（Sports Research/Designs for Health）の市販品、化粧品メーカー視点で「慢性ストレス→コルチゾール過剰→皮膚バリア低下・糖化加速」ループへのPS介入軸を解説。',
  },
  // ── Session F Day 8 バッチ 2026-05-13（supplement/skin/hormone/sleep/cardiovascular 既存pair の PAIR_SEO 埋め） ────────────
  'vitamin-d-vs-magnesium': {
    title: 'ビタミンD vs マグネシウム｜違い・VD吸収にMg必要論争・両者欠乏の論文を比較',
    description: 'ビタミンD3（1,000〜5,000IU/日・¥500-1,500/月）とマグネシウム（200〜400mg/日・¥1,000-2,500/月）の違いを論文で比較。両者は骨×神経の二重軸で役割が完全に分かれた補完関係で、「マグネシウムはVD代謝の補因子＝Mg欠乏ではVDサプリも効きにくい」という独占切り口が現実的に存在します。\n\nUwitonze 2018 J Am Osteopath Assoc レビュー＝VD代謝酵素群（25-ヒドロキシラーゼ・1α-ヒドロキシラーゼ・VDBP・VDレセプター）の多くがMg依存性で。\n\n血中Mg不足では25(OH)D血中濃度が上がりにくい・1,25(OH)2D活性型への変換が低下する機序確立。Deng 2013 BMC Med RCT n=180でMg補給によりVD代謝マーカー改善が報告。\n\n両者の欠乏率は日本人で高い＝厚労省 国民健康・栄養調査でMg推奨量（成人男性340-370mg・女性270-290mg）に対し平均摂取量が80-90%、VDも血中25(OH)D 30 ng/mL以上の十分域は成人の20-30%程度（Yoshimura 2013 J Bone Miner Metab ROAD studyコホート）。\n\n「VDサプリを飲んでも血中濃度が上がらない」訴えの背景にMg欠乏が隠れていることがあり。\n\nMg+VD併用が無難な現実解。Mgは形態選定（グリシン酸塩=吸収・睡眠/クエン酸塩=便通バランス/酸化マグネシウム=便秘薬で吸収率劣後）、VDは1,000-5,000IU/日でMg300mg併用が標準スタック。\n\n骨密度・転倒予防＝VD+Ca+Mgの三本柱がBischoff-Ferrari 2009 BMJ メタ解析の標準設計。\n\n腎機能低下・透析患者は高Ca血症・高Mg血症リスクで医師相談下。テトラサイクリン系・キノロン系抗菌薬・ビスホスホネート・甲状腺薬（レボチロキシン）はMgで吸収阻害→2-4時間ずらす、月コスト¥1,500-4,000の組合せ範囲、市販品（Now Foods/Doctor\'s Best Magnesium Glycinate + VD3 5,000IU）を化粧品メーカー視点で解説。',
  },
  'retinol-vs-bakuchiol': {
    title: 'レチノール vs バクチオール｜「植物性レチノール」代替・妊娠中NG vs OK・刺激差を論文で比較',
    description: 'レチノール（外用 0.1〜0.5%・¥3,000-10,000/月）とバクチオール（Bakuchiol 外用 0.5〜2%・¥3,500-9,000/月）の違いを論文で比較。バクチオールはBabchi（Psoralea corylifolia）由来の植物性化合物で、近年「植物性レチノール代替」「妊娠中OKのレチノール代替」として急速に注目された成分です。\n\nDhaliwal 2019 Br J Dermatol RCT n=44＝バクチオール0.5% vs レチノール0.5%×12週でしわ・色素沈着・写真評価で両者ほぼ同等の効果を報告した独占論文。Chaudhuri 2014 Int J Cosmet Sci メタ・in vitro試験でレチノール受容体には結合せず、別経路でレチノール様遺伝子発現変化（RARβ・コラーゲン I/III・MMP抑制）を誘導する機序整理。\n\nバクチオールの優位点＝①妊娠中・授乳中の使用が比較的安全（レチノールは催奇形性リスクで妊娠中NG・FDA Category Cレチノイド類縁）、②刺激・赤み・乾燥がレチノールより少ない、③朝晩使用可（レチノールは原則夜のみ・光分解）、④日焼け止め必須要件が緩い。\n\nレチノールの優位点＝①ヒトRCT数の累積が圧倒的（Kafi 2007 Arch Dermatol 0.4%×24週・Kligman 1986古典論文〜数百本のRCT）、②高濃度（プレスクリプション・トレチノイン0.025-0.1%）で深いシワ・光老化への効果が確立、③コスト面でジェネリック品（The Ordinary・La Roche-Posay）が選びやすい。\n\n初心者・敏感肌・妊娠中はバクチオール第一選択。\n\n中上級者・深いシワ・光老化対策は引き続きレチノール主軸でバクチオール補助が王道な使い分け。',
  },
  'saw-palmetto-vs-biotin': {
    title: 'ノコギリヤシ vs ビオチン｜男性AGA脱毛 vs 髪・爪・5αリダクターゼ vs ケラチンを論文で比較',
    description: 'ノコギリヤシ（Saw Palmetto・320mg/日・¥1,500-3,500/月）とビオチン（Biotin・30〜100μg/日・¥500-1,500/月）の違いを論文で比較。両者は男性型脱毛（AGA）vs 髪・爪のケラチン合成補酵素で作用ターゲットが完全に分かれた補完関係ですが、エビデンス階層と適用集団が大きく異なります。\n\nノコギリヤシは5α-リダクターゼ阻害でDHT産生を抑制する機序（Iehlé 1995 J Steroid Biochem Mol Biol）で。\n\nPrager 2002 J Altern Complement Med RCT n=26で男性AGAへの効果（小規模・限定的）。\n\nWessagowit 2016 Australas J Dermatol RCT n=50でロロチン 100mg+ノコギリヤシ 50mg×24週でAGAスコア改善が報告された一方、フィナステリド（プロペシア・処方薬1mg/日）と比較すると効果は弱い（Tsujimura 2009 BJU Int 比較研究で改善率約38% vs 68%）。\n\nビオチンはケラチン合成の補酵素（脂肪酸合成・ビオチニル化反応の補因子）で。\n\nPatel 2017 Skin Appendage Disord レビューで「ビオチン欠乏症（生卵白多量摂取・ビオチン代謝障害稀少疾患）でのみ髪・爪・皮膚症状を改善・欠乏のない健常者への効果RCTは存在しない」と結論。\n\n「ビオチンで髪が生える」訴求は論文ベースで成立しない裏切り型独占切り口で、健常者のAGA・抜け毛対策にビオチン単独は期待外れ。\n\n適用集団の使い分け＝①男性AGA・薄毛対策→フィナステリド（処方薬）+ ミノキシジル（処方薬・外用 + 内服）が第一選択でノコギリヤシは「処方薬を受診したくない/副作用回避層の補助レイヤー」位置づけ、②女性びまん性脱毛（FPHL）→ノコギリヤシのRCTは限定的でビオチン単独も期待外れ・鉄/亜鉛/VD/甲状腺/PCOS評価が現実的、③爪割れ・脆い爪→ビオチン欠乏なら効果（Hochman 1993 RCT n=22）。\n\nビオチン副作用＝甲状腺ホルモン・トロポニン検査値の偽異常（FDA 2017年警告・10mg/日以上で問題化・検査48-72時間前中止）必須記述。\n\nノコギリヤシ×抗凝固薬・ホルモン依存性疾患（前立腺肥大除く）・妊娠中NG、月コスト・市販品（Now Foods Saw Palmetto・Nature\'s Way Biotin）を化粧品メーカー視点で解説。',
  },
  'glycine-vs-magnesium': {
    title: 'グリシン vs マグネシウム｜睡眠サプリ最頻出組合せ・深部体温 vs 神経鎮静を論文で比較',
    description: 'グリシン（3g/日・¥800-1,500/月）とマグネシウム（200〜400mg/日 グリシン酸塩・¥1,000-2,500/月）の違いを論文で比較。両者は睡眠サプリの最頻出組合せで深部体温低下 vs GABA系神経鎮静の経路独立軸で役割が分かれた補完関係。\n\n両者併用＝睡眠サプリの王道スタックとして実用的な設計です。\n\nグリシンは阻害性神経伝達物質で。\n\nYamadera 2007 Sleep Biol Rhythms RCT n=15でグリシン3g/就寝前で深部体温低下＋朝の眠気改善＋日中認知パフォーマンス改善を報告、Inagawa 2006 オープンラベル4週間継続で日中疲労改善、Bannai 2012 Front Neurol Neurosci で機序整理（NMDA受容体co-agonist作用 + 末梢血流増加→放熱促進→深部体温低下→入眠）。\n\n味の素グリナ®ブランド（医薬部外品扱い）が日本市場でリード、Amazon・iHerbで購入可（Now Foods Glycine 1,000mg×3カプセル）。\n\nマグネシウム（特にグリシン酸塩キレート）はGABA受容体活性化・NMDA受容体拮抗作用でリラックス・神経鎮静（Abbasi 2012 J Res Med Sci RCT n=46 MgGly 500mg×8週でPSQI改善）、Walker 2003 Magnes Res で吸収率と消化器症状（下痢）の少なさが報告される高品質形態。\n\n併用の合理性＝経路独立・両者ともBBB通過確立・グリシンが「冷却・物理的入眠」、Mgが「神経鎮静・リラックス」で就寝1時間前にMg 200-400mg→就寝直前にグリシン3gの二段スタックが無難。\n\n「軽症の入眠困難・寝つきの悪さ」第一選択＝グリシン3g+Mg 200-400mg、改善が穏やかならL-テアニン200mg追加（Hidese 2019 RCT）、それでも改善なし＝睡眠外来・CBT-I（不眠の認知行動療法・エビデンス確立）受診が王道。\n\nメラトニンは日本で医薬品扱い個人輸入の自己責任領域、本サイトは推奨しない立場。\n\nクロザピン（精神科薬）×グリシン併用禁忌（NMDA co-agonist作用で精神症状増悪報告）。\n\nMg×抗菌薬/甲状腺薬/ビスホスホネートは2-4時間ずらす、腎機能低下時は高Mg血症リスクで医師相談、月コスト¥1,800-4,000の組合せ範囲、市販品を化粧品メーカー視点で解説。',
  },
  'omega3-vs-vitamin-k2': {
    title: 'オメガ3 vs ビタミンK2｜血液サラサラ vs 血管石灰化抑制・心血管2軸独立を論文で比較',
    description: 'オメガ3脂肪酸（EPA+DHA 1,000〜2,000mg/日・¥2,000-5,000/月）とビタミンK2（MK-7 100〜200μg/日・¥1,000-2,500/月）の違いを論文で比較。両者は心血管リスク低減の2軸独立路線で抗血栓・抗炎症 vs 血管石灰化抑制で役割が完全に分かれた補完関係です。\n\nオメガ3はEPA → エイコサノイド経路でTXA2減少・血小板凝集抑制・抗炎症（Calder 2017 Biochem Soc Trans レビュー）で。\n\nREDUCE-IT 2019 NEJM RCT n=8,179でEPAエチル製剤2g/日×4.9年中央値でMACE 25%減少（icosapent ethyl・処方薬Vascepa）、ただしYokoyama 2007 JELIS RCT 日本人 n=18,645でEPA 1.8g/日でMACE 19%減少と一定確認。\n\nMocking 2016 Transl Psychiatry メタではEPA優位のうつ補助も報告。\n\nビタミンK2はMGP（マトリックスGlaタンパク質）活性化で血管平滑筋のCa沈着を抑制（Schurgers 2008 Blood Hauschka機序）。\n\nKnapen 2013 Thromb Haemost RCT n=244でMK-7 180μg/日×3年で動脈硬度進行抑制。\n\nGeleijnse 2004 Rotterdam Study n=4,807でK2摂取量と冠動脈死亡率の逆相関が観察研究で報告される一方、大規模RCTで血管イベント減少を直接示した決定的エビデンスはまだ未確立の誠実評価。\n\n両者併用の合理性＝経路独立で「血液をサラサラに保つ × 血管壁にCaを溜めない」の二軸ケアが現実的、Sinclair陣営の心血管予防スタックでも採用される設計。\n\nワルファリン服用者はVK2絶対回避（VK拮抗薬の作用減弱でINR低下→血栓リスク）+ オメガ3高用量も抗血小板作用で出血リスク要注意（医師相談下）、DOAC（リバーロキサバン等）はVK経路非依存で理論上問題ない（処方医相談）。\n\n「魚を食べているからオメガ3は不要」は週2-3回の魚摂取で現実的だが、現代日本人の魚摂取量は減少傾向で、心血管リスク高い層・うつ症状補助層はサプリ追加検討。',
  },
  // ── Session F Day 9 バッチ 2026-05-13（stress/antiaging/cognitive/supplement クラスタ拡張デー） ────
  'ashwagandha-vs-magnesium-glycinate': {
    title: 'アシュワガンダ vs マグネシウム グリシン酸｜HPA軸×NMDA軸 独立軸を論文で比較',
    description: 'アシュワガンダ（KSM-66 600mg/日・¥1,500-3,500/月）とマグネシウム グリシン酸キレート型（200〜400mg/日・¥1,400-2,000/月）の違いを論文で比較。\n\n両者ともストレス・睡眠補助の代表サプリですが、作用経路と適用集団が完全に異なる独立軸の補完関係です。\n\nアシュワガンダはインド伝統医学アーユルヴェーダのアダプトゲンでHPA軸（視床下部-下垂体-副腎軸）コルチゾール調整が主軸。\n\nChandrasekhar 2012 Indian J Psychol Med RCT n=64 KSM-66 600mg/日×8週で血清コルチゾール27.9%減＋PSS（知覚ストレススケール）有意改善・Lopresti 2019 Medicine RCT n=60 8週で唾液コルチゾール起床時値・DHEA-S・テストステロン良好な影響・Salve 2019 Cureus 用量反応関係確立。\n\nwithanolide含有量規格が決定的＝KSM-66（Ixoreal Biomed社・withanolide 5%以上・抽出溶媒水のみ）/Sensoril（Natreon社・withanolide 10%以上・葉と根のブレンド）規格が論文用量再現の前提、無印アシュワガンダはwithanolide含有量バラつきで効果不確実です。\n\nマグネシウム グリシン酸は神経・筋・心血管系の基幹ミネラルでNMDA受容体機能調整（神経興奮性抑制）＋筋肉カルシウム拮抗（筋けいれん抑制）が主軸。\n\nAbbasi 2012 J Res Med Sci RCT n=46 MgGly 500mg/日×8週でPSQI（睡眠の質）改善・Boyle 2017 Nutrients SR 18 RCT統合でストレス・不安・うつサブスケール一貫した改善方向・Eur J Clin Nutr 2020 メタ n=1,800欠乏者でCRP・血圧・インスリン抵抗性有意改善が報告されています。\n\n日本人推奨量より約100mg/日不足（厚労省 国民健康・栄養調査でMg摂取量平均80-90%）が国民健康課題で、現代日本人の慢性的Mg不足は精神症状・睡眠・筋けいれんの広範な不調と関連します。\n\n形態差＝グリシン酸キレート型（消化器症状少なく吸収率高い・Walker 2003 Magnes Res）／クエン酸塩（同等吸収）／酸化マグネシウム（吸収率低く便秘薬向き）／硫酸塩（瀉下作用強い）で、妥当選択はグリシン酸キレート型優先です。\n\n独占切り口＝適用集団の使い分け＝①慢性ストレス・コルチゾール過剰・不安・PMS精神症状→アシュワガンダ優先（Chandrasekhar 2012・Lopresti 2019根拠）／②軽症不眠・筋けいれん・偏頭痛予防・PMS身体症状・血糖管理補助→Mg グリシン酸優先（Abbasi 2012・Boyle 2017根拠）／③朝の倦怠感・午後の集中力低下・カフェイン依存→アシュワガンダ＋カフェイン制限／④両者併用合理＝慢性ストレス×睡眠の質低下併発時はアシュワガンダ朝食後・Mg就寝前の時間差摂取を整理した内容です。\n\n裏切り型誠実評価＝「ストレスフリー」「不眠が治る」訴求は薬機法/景表法NG、両者ともサプリは生活軸（睡眠・運動・カフェイン制限・マインドフルネス・社会的接続）の補助です。\n\n併用注意の方向＝アシュワガンダ×甲状腺薬（レボチロキシン）avoid（甲状腺機能亢進方向）／×SSRI/SNRI/MAOI caution（セロトニン作動性増強）／×免疫抑制剤avoid（自己免疫疾患悪化リスク）／×鎮静薬caution（鎮静増強）／×血糖降下薬caution（低血糖傾向）+ 妊娠・授乳・自己免疫疾患禁忌。\n\nMg×テトラサイクリン系/フルオロキノロン系抗菌薬/ビスホスホネート/レボチロキシン 2-3時間ずらす。\n\n腎機能低下例は高Mg血症リスクで医師相談、両者とも甲状腺薬・抗うつ薬の使い分けで医療領域近接です。\n\nうつ・パニック発作・PMDD・双極性障害は心療内科第一選択でサプリは補助のみ。\n\n3〜8週評価サイクル＋ストレス記録（瞬間・きっかけ・睡眠の質・月経周期）で原因軸特定が無難な順番です。Jarrow Formulas KSM-66/Pure Encapsulations Sensoril vs Doctor\'s Best/Now Foods MgGly の市販品、化粧品メーカー視点で「慢性ストレス→コルチゾール過剰→皮膚バリア低下・糖化加速・ニキビ悪化」ループへのアシュワガンダ介入軸、「Mg欠乏→筋緊張・血流低下→くすみ・浮腫」ループへのMg介入軸を解説。',
  },
  'resveratrol-vs-pterostilbene': {
    title: 'レスベラトロール vs プテロスチルベン｜経口バイオアベイラビリティ4倍×SIRT1独立軸を論文で比較',
    description: 'レスベラトロール（150〜500mg/日・¥1,500-4,000/月）とプテロスチルベン（pTeroPure® 50〜250mg/日・¥3,500-7,000/月）の違いを論文で比較。\n\n両者ともポリフェノール抗老化サプリで混同されやすいですが、経口バイオアベイラビリティと用量設計に決定的な差がある類縁化合物です。\n\nレスベラトロールは赤ワイン・ブドウ皮・ピーナッツ・イタドリ（Polygonum cuspidatum）に含まれるスチルベン系フラボノイドで。\n\nSIRT1活性化・カロリー制限模倣作用が中心機序＝Howitz 2003 Nature 古典論文 SIRT1活性化・Lagouge 2006 Cell マウスでミトコンドリア生合成・運動能力改善・Timmers 2011 Cell Metab RCT n=11 短期介入で代謝マーカー改善・Brasnyo 2011 Br J Nutr 2型糖尿病RCT n=19 ヘモグロビンA1c・インスリン抵抗性改善が報告されています。\n\n最大の弱点＝経口バイオアベイラビリティが極めて低い＝Walle 2004 Drug Metab Dispos でレスベラトロール経口25mgでも血漿濃度ng/mLレベルにとどまる・大部分が肝臓グルクロン酸抱合・硫酸抱合で初回通過効果として代謝されるという課題があり、ヒトRCTでの効果議論の中心はこの吸収率問題です。\n\nプテロスチルベンはレスベラトロールのジメチル化体（3,5位ヒドロキシ基がメトキシ基に置換）でブルーベリー・ブドウ皮に微量含有。\n\nKapetanovic 2011 Cancer Chemother Pharmacol 動物試験で経口バイオアベイラビリティ約4倍（メトキシ基置換でグルクロン酸抱合受けにくい・分子親油性向上）が報告された改良型誘導体です。\n\nRiche 2014 Funct Foods Health Dis RCT n=80 pterostilbene 250mg/日×6-8週でLDLコレステロール影響観察（コレステロール上昇の議論あり・他試験では影響なし・ChromaDex社実施）。\n\nJoseph 2008 J Agric Food Chem 動物試験で SIRT1活性化はレスベラトロールと同等以上が報告されました。\n\npTeroPure®（ChromaDex社特許品・99.5%純度）がHPLC標準化品で世界標準規格です。\n\n裏切り型独占切り口＝「プテロスチルベン=レスベラトロール上位互換」評価は安直＝①ヒトRCT本数の絶対差＝レスベラトロールはBrasnyo 2011等で代謝マーカー改善RCT複数本（数十本レベル蓄積）に対しプテロスチルベンはRiche 2014を中心とした少数本（数本程度）の蓄積段階、②動物試験での経口バイオアベイラビリティ4倍は線形ヒト換算できない＝代謝経路の種差・腸内細菌叢の影響・脂肪溶解度差で動物→ヒト換算は議論領域、③Riche 2014でLDL影響が観察された点はリスク要因で長期高用量の心血管リスク評価は未確定、④ChromaDex特許品pTeroPure®は¥3,500-7,000/月で高単価で同価格帯のCoQ10ユビキノール/オメガ3 EPA/ビタミンK2 MK-7の方がエビデンス確立度高いROIです。\n\n現実解＝レスベラトロール100-250mg/日（食事性＋サプリ）＋プテロスチルベン50mg/日の併用（両者ともCYP代謝重複）か食事性赤ワイン・ブルーベリー摂取が無難階層。\n\nsenolytics系（フィセチン）・autophagy系（スペルミジン）と経路独立で併用合理ですが寿命延長エビデンスは両者ともヒトで未確立点を誠実に明示する必要があります。\n\n併用注意＝両者ともCYP3A4阻害でカルシウム拮抗薬（アムロジピン等）・スタチン（シンバスタチン・アトルバスタチン）・タクロリムス血中濃度上昇懸念。\n\n抗凝固薬（ワルファリン・DOAC）INR上昇懸念で出血リスク医師相談。\n\nエストロゲン様作用（フィトエストロゲン弱）でホルモン依存性乳がん既往は医師相談、グレープフルーツジュース併用でCYP3A4阻害さらに増強。\n\n「老化が逆転」「寿命が延びる」断定NG→「動物試験ベース」「代謝マーカー改善が報告」型統一、Now Foods/Doctor\'s Best レスベラトロール（イタドリ抽出物標準化品）vs pTeroPure® プテロスチルベン（ChromaDex特許品・Pure Encapsulations/Designs for Health）の市販品、化粧品メーカー視点で皮膚老化への直接効果ヒトRCTは両者とも未確立で外用レチノール/ナイアシンアミド優先という現実解を解説。',
  },
  'lions-mane-vs-alpha-gpc': {
    title: 'ライオンズマネ vs α-GPC｜NGF誘導×コリン前駆体 経路独立軸を論文で誠実比較',
    description: 'ライオンズマネ（ヤマブシタケ・1,000〜3,000mg/日・¥1,500-3,500/月）とα-GPC（L-α-グリセロホスホコリン・300〜600mg/日・¥2,500-4,500/月）の違いを論文で比較。\n\n両者とも認知機能サプリで混同されやすいですが、作用経路と最適な対象が完全に異なる独立軸の補完関係です。\n\nライオンズマネ（ヤマブシタケ・Hericium erinaceus）は食用キノコ由来でヘリセノン（子実体由来）・エリナシン（菌糸体由来）がNGF（神経成長因子）合成促進＝Mori 2008 Biomed Res 神経細胞培養でNGF mRNA発現増加・Mori 2009 Phytother Res RCT n=30 MCI（軽度認知障害）患者でヤマブシタケ3g/日×16週で認知機能テスト有意改善（HDS-R改訂版長谷川式簡易知能評価スケール）・Saitsu 2019 Biomed Res 健常高齢者RCTで認知機能維持・Nagano 2010 Biomed Res 更年期女性で集中力・抑うつ症状改善が報告されました。\n\n子実体（fruiting body）vs 菌糸体（mycelium）成分プロファイル差が形態差で、Host Defense（Stamets社・米国）は両者ブレンド、Real Mushrooms は子実体特化（β-グルカン含有量規格）など標準化規格の選択が重要です。\n\nα-GPCはコリン前駆体で血液脳関門通過率が高くアセチルコリン合成基質として脳内コリン濃度を上げる機序。\n\nParker 2011 J Int Soc Sports Nutr RCT n=13 α-GPC 600mg/日×7日でベンチプレス峰力増加・De Jesus Moreno 2003 Clin Ther RCT n=261 軽症-中等度AD α-GPC 1,200mg/日×6ヶ月で早期認知機能改善（MMSE・ADAS-Cog）・Marcus 2017 Sports Sci α-GPC 300mg ハンドグリップ筋力増加が報告された運動パフォーマンス+認知補助の二刀流成分です。\n\n独占切り口＝年代軸×用途軸の使い分け＝①20-50代運動パフォーマンス（パワー出力・筋力増加）→α-GPC 600mg/日（Parker 2011・Marcus 2017根拠）／②40代以降の認知疲労・集中力低下・更年期前後抑うつ→ライオンズマネ1-3g/日（Mori 2009・Nagano 2010 根拠）／③60代以上のMCI予防・認知機能維持→ライオンズマネ優先（Mori 2009のMCI患者RCT根拠）／④認知症診断後→神経内科処方薬第一選択（コリンエステラーゼ阻害薬ドネペジル・メマンチン・抗体医薬レカネマブ）でサプリは守備範囲外。\n\n裏切り型誠実評価＝Day 8 phosphatidylserine-vs-alpha-gpc記事連動でα-GPC大規模観察研究で脳卒中リスク上昇懸念報告＝ANRT 2021 Am J Prev Med n=12,532観察研究で長期高用量α-GPC摂取者でTIA・脳卒中リスク 1.46倍が報告された（観察研究で因果未確立だが慎重論あり）→「短期ヒトRCTではエビデンスあるが長期高用量は慎重論あり」期待値調整が論文上で責任ある立場です。ライオンズマネは食用キノコ由来で長期安全性プロファイルは比較的良好（食経験あり）ですが、ヒトRCT本数はα-GPCより少なく（Mori 2009/Saitsu 2019/Nagano 2010 等数本レベル）大規模長期試験は未整備です。\n\n両者は経路独立で併用可能＝NGF誘導×コリン供給の補完関係として理論的整合性ありです。\n\n副作用差＝α-GPCはコリン供給で末梢副作用（消化器症状・口臭・体臭が魚臭くなるTMAO産生関連 Tang 2013 NEJM 心血管リスク文脈）が稀、ライオンズマネはほぼ副作用報告なし（食経験ベースの安全性プロファイル）です。\n\n併用注意＝α-GPCはアルツハイマー処方薬コリンエステラーゼ阻害薬（ドネペジル・ガランタミン・リバスチグミン）併用で理論的相加効果（コリン作動性過剰）医師相談、ライオンズマネは抗凝固薬・抗血小板薬で理論的相互作用報告ありも臨床的問題は稀（手術前1週休薬推奨）。\n\n両者とも妊娠中授乳中エビデンス限定で医師相談、ライオンズマネはキノコアレルギー既往は禁忌寄り。\n\n「認知症が治る」「頭が良くなる」絶対NG→「MCI患者で認知機能改善が報告」「運動パフォーマンス指標で改善が報告」型統一。\n\n3-6ヶ月評価サイクル+認知機能の主観的変化記録（仕事のミス回数・名前度忘れ頻度・読書理解力）が王道フィードバック設計、Host Defense Lion\'s Mane/Real Mushrooms Lion\'s Mane vs AlphaSize® α-GPC（Sports Research/Designs for Health）の第三者検査済みブランド推奨、化粧品メーカー視点で慢性ストレス×認知疲労ループの皮膚への波及（コルチゾール過剰でバリア機能低下）に対するライオンズマネ補助介入軸を解説。',
  },
  'zinc-vs-vitamin-c-oral': {
    title: '亜鉛 vs ビタミンC（経口）｜風邪期間短縮vs予防効果限定 を論文で誠実比較',
    description: '亜鉛（トローチ75〜150mg/日・サプリ15〜30mg/日・¥1,000-2,500/月）とビタミンC経口（500〜2,000mg/日・¥800-2,000/月）の違いを論文で比較。\n\n両者とも免疫サプリの代表成分ですが、作用機序と適用タイミングが完全に異なる独立軸の補完関係です。\n\n亜鉛は約300以上の酵素補因子で免疫細胞（T細胞・NK細胞）機能・タンパク質合成・創傷治癒・味覚・前立腺機能・男性ホルモン合成等の広範な役割を持つ必須ミネラルです。\n\n裏切り型独占切り口=風邪症状軽減のエビデンス階層＝Hemilä 2013 Cochrane Database SR 13 RCT n=1,360 亜鉛トローチ75-150mg/日 24時間以内開始で風邪期間14-28%短縮（イオン化亜鉛が鼻粘膜ICAM-1受容体ブロックでライノウイルス結合阻害機序）・Singh 2013 Cochrane 同様の結果・亜鉛グルコン酸/酢酸塩トローチ形態が必須（クエン酸塩・乳酸塩は唾液pHで効果減弱）・経口カプセル形態は粘膜接触なく効果限定で形態選択が決定的に重要です。\n\nビタミンC経口は強力な水溶性抗酸化物質でコラーゲン合成（プロリン・リシン4-/5-ヒドロキシラーゼ補因子）・カテコールアミン合成・鉄吸収促進等の役割。\n\nHemilä 2017 Cochrane Database SR 29 RCT 大規模解析でビタミンC 200mg/日以上継続摂取は一般人口での風邪罹患率低下なし（観察研究と異なる結果）・ただし発症期間は8%軽度短縮・症状重症度はわずかに軽減・極端な身体的ストレス下（マラソンランナー・スキー部隊・寒冷地兵士）では風邪罹患率半減（PMID 1335550等）。\n\nHemilä 2013メタ高用量3-4g/日治療目的でも臨床的に意義ある効果はわずかという限定的エビデンス成分です。\n\n独占切り口＝適用集団とタイミング使い分け＝①風邪初期（症状出現24時間以内）→亜鉛グルコン酸/酢酸塩トローチ75-150mg/日（Hemilä 2013根拠・期間14-28%短縮）／②慢性ストレス・喫煙者・極端な身体的ストレス下のビタミンC高需要層→ビタミンC 500-1,000mg/日継続（Hemilä 2017身体的ストレス下サブグループ根拠）／③鉄欠乏性貧血の鉄吸収促進補助→ビタミンC 100-500mg鉄サプリ同時摂取／④創傷治癒・術後回復→亜鉛15-30mg+ビタミンC500-1,000mg補助（Cunningham 2017）／⑤男性ホルモン合成低下・前立腺機能維持→亜鉛15-30mg（Prasad 1996観察研究レベル）。\n\n裏切り型誠実評価=「ビタミンCで風邪予防」は大規模RCTで効果限定の実用的事実＝Pauling博士の高用量ビタミンC仮説（1970年代）は後続大規模RCTで効果限定が確認された科学史的経緯を理解した上で、健常人の予防効果は限定的・身体的ストレス下のみ恩恵という現実解を伝えるのが論文上で責任ある立場です。\n\n併用注意の核心＝亜鉛長期高用量50mg/日以上で銅欠乏症リスク（銅と亜鉛の腸管吸収競合・Sandstead 1995 Am J Clin Nutr）＝長期サプリ補給時は亜鉛:銅比 10:1-15:1維持（亜鉛15-30mg/日なら銅1-2mg/日併用）の進め方、銅欠乏は貧血・神経症状・心血管リスクで深刻です。\n\n亜鉛×テトラサイクリン系抗菌薬avoid（吸収50-90%低下・2-4時間ずらす）／×フルオロキノロン系avoid／×ペニシラミンavoid／×銅サプリ吸収競合。\n\nビタミンC高用量×シュウ酸結石リスク（カルシウム・腎機能低下例医師相談）／×ワルファリンINR低下懸念（高用量1g/日以上・観察研究レベル）／×鉄サプリ吸収増強で過剰鉄リスク（ヘモクロマトーシス既往avoid）／×化学療法（抗酸化作用で薬効干渉懸念腫瘍内科判断）。\n\n「免疫力アップ」「風邪予防」断定NG→「免疫細胞機能維持」「風邪期間短縮報告」型統一。\n\nNow Foods/Thorne 亜鉛グルコン酸（風邪初期トローチ）+ Doctor\'s Best 亜鉛+銅併用品vsNow Foods/NOW ビタミンC（緩衝型/エステル化型）の市販品、化粧品メーカー視点でビタミンC外用15-20%（L-アスコルビン酸/3-O-エチルアスコルビン酸/アスコルビルリン酸ナトリウム）の方が皮膚色素沈着改善・コラーゲン合成促進ヒトRCTでは経口より直接的（Pinnell 2003 RCT 15%VC外用色素沈着改善）という現実解を解説。',
  },
  'collagen-peptide-vs-vitamin-c-oral': {
    title: 'コラーゲンペプチド vs ビタミンC（経口）｜補因子必須×経口エビデンス階層を論文で比較',
    description: 'コラーゲンペプチド（2.5〜10g/日・¥1,500-4,000/月）とビタミンC経口（500〜2,000mg/日・¥800-2,000/月）の違いを論文で比較。\n\n両者とも皮膚老化対策の代表経口サプリですが、「コラーゲン合成にビタミンCが補因子として必須」軸でそもそも独立軸ではなく補完関係という独占切り口が成立する組合せです。\n\nコラーゲンペプチドはゼラチンを酵素分解（ペプチダーゼ処理）した低分子化ペプチド混合物で。\n\nプロリン-ヒドロキシプロリン（Pro-Hyp）・グリシン-プロリン-ヒドロキシプロリン（Gly-Pro-Hyp）等の特定ジペプチド・トリペプチドが経口吸収後に皮膚線維芽細胞に到達してコラーゲン合成シグナルを送る機序が提唱されています（Iwai 2005 J Agric Food Chem 経口摂取後の血漿Pro-Hyp検出・Shigemura 2009 J Agric Food Chem 線維芽細胞培養でPro-Hypがコラーゲン合成促進）。\n\nProksch 2014 Skin Pharmacol Physiol RCT n=114 コラーゲンペプチド2.5g or 5g/日×8週で皮膚弾力・水分量改善（Verisol®/Peptan®等の標準化品）・Asserin 2015 J Cosmet Dermatol RCT n=106 10g/日×8週でしわ深さ改善・Inoue 2016 J Sci Food Agric メタ解析で経口コラーゲンペプチドの皮膚効果一貫した方向・Choi 2019 J Med Food RCT 高齢者皮膚弾力改善が報告されています。\n\n製品形態差＝特定ペプチド標準化品（Verisol® Gelita社・Peptan® Rousselot社）が論文用量再現の前提で、無標準化コラーゲン粉末は分子量・ペプチド組成バラつきで効果不確実です。\n\nビタミンC経口は強力な水溶性抗酸化物質で。\n\n最も重要な独占機序＝コラーゲン三重らせん構造の安定化補因子＝プロリン4-ヒドロキシラーゼ・リシン5-ヒドロキシラーゼの補酵素として作用し、プロリン残基の4位ヒドロキシ化（→ヒドロキシプロリン形成）・リシン残基の5位ヒドロキシ化（→ヒドロキシリシン形成）を触媒します。\n\nヒドロキシプロリン・ヒドロキシリシンがコラーゲン三重らせん構造の水素結合形成と架橋結合形成に必須で。\n\nビタミンC欠乏では機能的コラーゲンが合成できず壊血病（出血傾向・歯肉出血・創傷治癒不良・皮膚もろさ）に至る生化学的根幹です。\n\nCosgrove 2007 Am J Clin Nutr 観察研究 n=4,025女性で食事性VC摂取量と皮膚老化マーカー（しわ・乾燥）の逆相関・Pullar 2017 Nutrients 皮膚VC含量と皮膚健康レビューで皮膚VC濃度は表皮真皮で血漿の100倍以上・経口VC摂取で皮膚VC濃度上昇確立。\n\n裏切り型独占切り口＝「両者は補完関係でセット摂取が現実的」＝コラーゲンペプチド単独摂取は摂取後の体内コラーゲン合成過程でビタミンCが補因子として必須のため、ビタミンC不足状態でコラーゲンペプチドだけ大量摂取しても合成効率が頭打ちになる論理的整合性があります。\n\n最適タイミング設計＝朝食時にコラーゲンペプチド5g+ビタミンC500-1,000mg同時摂取が無難（Postlethwaite 1978 PNAS でVC濃度上昇時のコラーゲン合成促進・吸収のPro-HypピークとVC血漿濃度ピークの時間整合）、就寝前は皮膚ターンオーバー時間帯の論拠は弱く朝食時優位です。\n\n現実解の階層＝①ベース＝食事性タンパク質（肉魚卵大豆）十分摂取＋食事性VC（パプリカ・キウイ・柑橘・ブロッコリー）摂取で日常的に皮膚コラーゲン合成基盤を作る、②サプリ追加適応＝中高年・閉経後女性・ダイエット中・喫煙者・極端な紫外線暴露・術後創傷治癒補助でコラーゲンペプチド2.5-10g+ビタミンC500-1,000mg併用、③経口だけで効果限定＝Proksch 2014 RCTは8週で皮膚弾力・水分量改善を示すが。\n\n深いしわ・光老化への直接効果は外用レチノール（Kafi 2007 RCT）/ナイアシンアミド5%（Bissett 2005 RCT）の方が累積エビデンス厚いため経口は補助・外用が主軸という化粧品メーカー視点の現実解です。\n\n併用注意＝コラーゲンペプチドはほぼ副作用なし（食経験ベース）、魚由来コラーゲンは魚アレルギー禁忌。\n\nビタミンC高用量×シュウ酸結石リスク（カルシウム・腎機能低下例医師相談）／×ワルファリンINR低下懸念（1g/日以上）／×鉄吸収増強（ヘモクロマトーシス既往avoid）／×化学療法（抗酸化作用干渉懸念腫瘍内科判断）、両者とも妊娠中授乳中は比較的安全領域です。\n\n「肌が若返る」「しわが消える」断定NG→「皮膚弾力・水分量・しわ深さの改善が報告」型統一、Verisol®/Peptan®標準化コラーゲンペプチド（明治 アミノコラーゲン・森永 おいしいコラーゲン・Vital Proteins）vs Now Foods/Thorne/NOW ビタミンC（緩衝型/エステル化型）の市販品。\n\n化粧品メーカー視点で「経口はベース・外用が主軸（VC15-20%/レチノール/ナイアシンアミド）」のの順番を明示します。',
  },
  // ── Sprint 3 Session F Day 9 補完 バッチ 2026-05-13（並行セッションf9091db ship後の補完5 KW・skin/cognitive/metabolic/sleep+legal/gut クラスタ） ────
  'palmitoyl-tripeptide-vs-retinol': {
    title: 'パルミトイルトリペプチド vs レチノール｜シグナルペプチド vs RAR ターンオーバー・妊娠中代替を論文で比較',
    description: 'パルミトイルトリペプチド（外用シグナルペプチド・Matrixyl® 3000等の合成ペプチド配合品・¥3,000-8,000/月）とレチノール（外用 0.1〜0.5%・ビタミンA誘導体・¥3,000-10,000/月）の違いを論文で比較。\n\n両者は経路独立で「コラーゲン産生シグナル × 表皮ターンオーバー」の補完関係ですが、エビデンス階層と適用集団が大きく異なります。\n\nパルミトイルトリペプチドはSederma社の合成ペプチド技術（Matrixyl® 3000 = パルミトイル-GHK + パルミトイル-GQPR）で。\n\n線維芽細胞のコラーゲン産生シグナル誘導（Robinson 2005 Int J Cosmet Sci メーカー協賛小規模試験 2%×12週でしわ改善・Bhakti 2020 J Cosmet Dermatol レビューでin vitroコラーゲン産生促進機序が整理）、ヒト独立RCTの累積本数は限定的でメーカー試験中心のエビデンス階層です。\n\nレチノールはRAR/RXR受容体結合経由でターンオーバー促進＋真皮コラーゲン産生＋MMP抑制の多経路。\n\nKafi 2007 Arch Dermatol RCT n=36 NIHグラント独立試験 0.4%×24週で深いシワ・色素沈着・写真評価で有意改善・Kligman 1986古典〜数百本のRCT累積で論文蓄積が圧倒的。\n\n「植物性レチノール」「レチノール上位互換」訴求は科学的に不正確（パルミトイルトリペプチドはRAR非結合・シグナル経路独立）で、エビデンスの厚みでレチノール優位、刺激プロファイル・妊娠中可否でパルミトイルトリペプチド優位の使い分け。\n\n妊娠中レチノールNGの代替軸＝ナイアシンアミド5% + VC15% + パルミトイルトリペプチドの3軸が王道でACOG 2024 guidance準拠、ペプチドは「メーカー試験ベース・刺激ほぼゼロ・朝晩使用可」のポジション。\n\n敏感肌・初心者順序＝ナイアシンアミド5% → パルミトイルトリペプチド → 低濃度レチノール0.1%の段階性が現実解。両者併用は経路独立・刺激リスクほぼゼロで現実的、市販同時配合品（The Ordinary "Buffet" マルチペプチド+HA・La Roche-Posay Retinol B3 Serum・SkinCeuticals A.G.E. Interrupter）も普及。効果が出るまで（パルミトイルトリペプチド12-24週・レチノール12-24週）、月コスト¥6,000-15,000の組合せ範囲を化粧品メーカー視点で解説。',
  },
  'centella-asiatica-vs-niacinamide': {
    title: 'ツボクサ（CICA）vs ナイアシンアミド｜敏感肌鎮静 × 4方面多機能・併用順序を論文で比較',
    description: 'ツボクサエキス（Centella Asiatica・CICA・asiaticoside / madecassoside / asiatic acid / madecassic acid 4成分標準化TECA・外用0.1〜1%・¥1,500-5,000/月）とナイアシンアミド（外用5%・ビタミンB3・¥1,500-5,000/月）の違いを論文で比較。\n\n両者は「鎮静・抗炎症の第一選択 × 色素沈着・バリア・皮脂・小じわ4方面の多機能」で経路独立の補完関係。\n\nツボクサエキスはインド・東南アジア由来の伝統薬草で。\n\nTECA（Titrated Extract of Centella Asiatica）標準化 = asiaticoside 40% + asiatic acid 30% + madecassic acid 30%。\n\nBonté 1994 Wound Repair Regen 創傷治癒in vitro試験 + Ratz-Łyko 2016 J Cosmet Laser Ther ヒトRCT TECA抽出物しわ・水分改善・Pyo 2002 Phytother Res madecassoside抗炎症性確認・Bylka 2013 Postepy Dermatol Alergol レビューで「酒さ・脂漏性皮膚炎・敏感肌・赤み」の鎮静作用が論文蓄積、敏感肌・赤み・酒さの第一選択です。\n\n規格表記なしのツボクサ配合品は asiaticoside/asiatic acid/madecassic acid 含有量がバラつき効果保証が難しい点を慎重評価。\n\nナイアシンアミドはBissett 2005 J Cosmet Dermatol RCT 5%×8週で色素沈着・小じわ・皮脂・バリア機能の4方面改善が確認された論文ベース成分。\n\nHakozaki 2002 Br J Dermatolでメラノソーム転移阻害機序確立。\n\n両者の役割分担＝①敏感肌・赤み・酒さ・脂漏性皮膚炎の鎮静第一選択→ツボクサ、②色素沈着・バリア・皮脂・小じわの多機能補助→ナイアシンアミド、③両者ともヒトRCT存在で妊娠中比較的安全でハイドロキノンの代替路線として妥当。\n\n敏感肌順序＝ツボクサ鎮静で炎症落ち着いてからナイアシンアミド多機能の段階性が現実解。両者経路独立で併用OK、市販でもANUA Heartleaf 77 Toner + Niacinamide 10%セラム等の同時配合処方が韓国コスメ中心に普及。月コスト¥3,000-10,000の組合せ範囲、効果が出るまで（ツボクサ2-4週鎮静・ナイアシンアミド4-12週改善）、酒さ・アトピー・脂漏性皮膚炎は皮膚科処方治療第一選択（メトロニダゾール・イベルメクチン・ステロイド外用・タクロリムス・JAK阻害薬等）でCICA/Niaは補助レイヤー位置づけを化粧品メーカー視点で解説。',
  },
  'berberine-vs-chromium': {
    title: 'ベルベリン vs クロム｜血糖管理2成分・「天然のメトホルミン」誇張対抗を論文で誠実比較',
    description: 'ベルベリン（Berberine・500mg×3/日・¥3,000-6,000/月）とクロム（Chromium Picolinate・200-1,000μg/日・¥500-2,000/月）の違いを論文で比較。\n\n両者は血糖管理サプリで作用経路が独立した補完関係ですが、「ベルベリン=天然のメトホルミン」訴求の誇張対抗が独占切り口として実用的に存在します。\n\nベルベリンはウコンギ・キハダ等のアルカロイド成分で。\n\nAMPK活性化経由でインスリン感受性改善・腸内細菌叢調整・LDL低下の多経路。\n\nYin 2008 Metabolism RCT n=84 ベルベリン500mg×3/日×3ヶ月でHbA1c 9.5→7.5%改善（メトホルミン1,500mg/日と同等を主張する論文だが小規模・中国単独試験）・Dong 2012 Evid Based Complement Alternat Med メタ解析 14 RCT n=1,068 でHbA1c・空腹時血糖・インスリン改善傾向（heterogeneity 高い）が報告されています。\n\n「天然のメトホルミン」訴求は誇張で誠実評価すべき領域＝メトホルミンはUKPDS 1998 Lancet n=4,209 10年追跡で心血管死亡率・全死亡率減少・ADA推奨2型糖尿病第一選択処方薬として大規模長期RCTで確立、ベルベリンは小規模・中国単独試験中心でヒト長期心血管アウトカム未確立。\n\nクロムはインスリン受容体補因子（クロモジュリン経由でインスリンシグナル増強）。\n\nAnderson 1997 Diabetes RCT n=180 クロムピコリネート1,000μg/日×4ヶ月でインスリン感受性改善・Cefalu 2006 J Trace Elem Med Biol メタ解析で2型糖尿病の血糖管理補助、ただしBalk 2007 Diabetes Care メタ解析では「効果は控えめ・heterogeneity 大」と慎重評価。\n\n🚨糖尿病処方薬併用低血糖警告必須＝メトホルミン・SU薬・インスリン・GLP-1作動薬（リラグルチド・セマグルチド）・SGLT2阻害薬・DPP-4阻害薬すべての併用で血糖モニタリング強化・処方医と用量調整必須。\n\n🚨ベルベリン×CYP3A4阻害でアトルバスタチン/シンバスタチン/シクロスポリン/タクロリムス血中濃度上昇懸念・P-glycoprotein阻害でジゴキシン中毒リスク・腎機能低下時クロム蓄積（透析患者高クロム血症）。\n\nの順番＝血糖管理は処方薬第一選択（メトホルミン・GLP-1作動薬・SGLT2阻害薬）・生活軸（運動・地中海食・減量5-10%）が論文蓄積最厚（Diabetes Prevention Program 2002 NEJM 生活介入58%糖尿病発症リスク減 vs メトホルミン31%）・サプリは補助レイヤー期待値調整必須。月コスト¥3,500-8,000、市販品（Thorne Berberine-500・Now Foods Chromium Picolinate）、効果が出るまで（ベルベリン4-12週・クロム8-12週）、HbA1c 6.5%以上・空腹時血糖126mg/dL以上は内科受診マストを化粧品メーカー視点で解説。',
  },
  'ramelteon-vs-melatonin': {
    title: 'ラメルテオン vs メラトニン｜処方薬 × サプリの規制区分差・不眠タイプ別の整理を論文で比較',
    description: 'ラメルテオン（Ramelteon・ロゼレム®武田薬品・8mg/日・処方医薬品）とメラトニン（Melatonin・0.3-3mg・日本では医薬品扱いで国内サプリ流通なし・海外サプリは個人輸入領域）の違いを論文で規制区分差の整理スタンスで比較。\n\n本サイトのスタンス＝①ラメルテオンは不眠症の入眠困難に承認された処方医薬品で使用判断は処方医（心療内科・睡眠外来・内科）に委ねる領域、②メラトニンは日本で医薬品扱い国内サプリ流通なし・海外個人輸入は自己責任のグレーゾーンで本サイトは推奨する立場ではない事実として規制区分差を提示、③軽症不眠の本サイト推奨はMg-glycinate+グリシン+L-テアニンの国内サプリ流通スタック、④慢性不眠は睡眠外来受診・CBT-I（不眠の認知行動療法）の入り方。\n\nラメルテオンはメラトニンMT1/MT2受容体作動薬で内因性メラトニンより選択的・半減期1-2.6時間。\n\nRoth 2006 Sleep 多施設RCT n=405 ラメルテオン8mg/日×5週で入眠潜時改善・Mayer 2009 Sleep 慢性不眠RCT・Erman 2006 Sleep Med 高齢者慢性不眠RCTで臨床有効性確立、依存性・離脱症状リスクがベンゾジアゼピン系・非ベンゾジアゼピン系（ゾルピデム・ゾピクロン）より低いプロファイル。\n\n🚨フルボキサミン（デプロメール®/ルボックス®）×ラメルテオン併用禁忌（CYP1A2阻害でラメルテオン血中濃度50-190倍上昇）・重度肝障害禁忌・強CYP1A2阻害薬併用注意（シプロフロキサシン・エノキサシン・メキシレチン・チクロピジン）。\n\nメラトニンは内因性ホルモン補充でAuld 2017 Sleep Med Rev メタ解析入眠潜時短縮平均7分・Buscemi 2005 BMJ メタ解析時差ぼけ症状改善・Sack 2010 Sleep Med Clin で概日リズム障害（時差ぼけ・交代勤務・DSWPD遅延型睡眠相症候群）の主用途と整理。\n\n両者の使い分け＝①慢性入眠困難型不眠（毎晩3週間以上入眠潜時30分以上）→心療内科・睡眠外来受診→ラメルテオン処方検討、②概日リズム障害（時差ぼけ・交代勤務・DSWPD）→国内サプリ流通なし・睡眠外来受診、③軽症入眠困難（数日〜数週間・ストレス性）→Mg-glycinate 200-400mg + グリシン 3g + L-テアニン200mg の本サイト推奨スタック、④改善なし→睡眠外来・CBT-I（エビデンス確立 Trauer 2015 Ann Intern Med メタ）受診が無難な順番。\n\n規制区分差＝ラメルテオン処方医薬品（薬価適用・処方医判断）・メラトニン日本医薬品扱い（個人輸入グレーゾーン・本サイト推奨せず）・米国/欧州メラトニンOTCサプリ（DSHEA健康食品扱い）と国により大きく異なる。\n\n「ロゼレム 通販」「メラトニン 個人輸入」KWは本サイト誘導しない（医薬品販売誘導NG・薬機法準拠）、月コスト目安は規制差で参考値提示せず処方医・睡眠外来受診を化粧品メーカー視点で解説。',
  },
  'probiotics-vs-akkermansia': {
    title: 'プロバイオティクス vs アッカーマンシア｜従来菌 × 次世代腸内細菌の実用的整理を比較',
    description: 'プロバイオティクス（Lactobacillus / Bifidobacterium 等の従来菌・1,000〜500億CFU/日・¥1,500-4,000/月）とアッカーマンシア（Akkermansia muciniphila MucT・パスチャライズ品10億CFU/日・¥6,000-12,000/月）の違いを論文で比較。\n\n両者は腸内細菌サプリで作用機序と研究段階が大きく異なる補完関係ですが、「アッカーマンシア=次世代プロバイオの上位互換」訴求の慎重評価が独占切り口として現実的に存在します。\n\nプロバイオティクスはISAPP公式定義（Hill 2014 Nat Rev Gastroenterol Hepatol）「適量投与で宿主に健康利益をもたらす生きた微生物」、株特異性＝L. plantarum 299v（過敏性腸症候群IBS改善 Niedzielin 2001）・LGG（Lactobacillus rhamnosus GG・抗菌薬関連下痢予防 Hempel 2012 JAMA メタ・小児急性胃腸炎 Vandenplas 2017）・BB-12（Bifidobacterium animalis subsp lactis BB-12・便秘症状改善 Eskesen 2015）・L. reuteri DSM 17938（乳児コリック軽減 Sung 2018 Pediatrics メタ）の株単位エビデンスが論文蓄積最厚で。\n\n「乳酸菌1,000億個」訴求は株名なしで論文ベース評価不能な点が業界課題。\n\nアッカーマンシアは腸粘液層に常在するムチン分解菌で。\n\nEverard 2013 PNAS 動物試験で肥満マウスへのA. muciniphila経口投与で脂肪量・インスリン抵抗性改善・Plovier 2017 Nat Med パスチャライズ（低温殺菌）アッカーマンシアで生菌より効果向上の独自データ・Depommier 2019 Nat Med ヒトRCT n=32 過体重・肥満者×3ヶ月でインスリン感受性改善・LDL低下・血漿リポ多糖低下（限定的・小規模）・Liu 2017 Nat Med 観察研究で2型糖尿病・肥満患者の腸内A. muciniphila量低下が報告されています。\n\n裏切り型独占切り口=研究段階の決定的差＝①従来プロバイオは数十年のヒトRCT蓄積（IBS・抗菌薬関連下痢・乳児コリック・便秘等のCochrane SR複数）vs アッカーマンシアはDepommier 2019 1本のヒト小規模RCTレベルでエビデンス階層に決定的な差、②「アッカーマンシアが次世代上位互換」訴求は時期尚早＝従来プロバイオの株別エビデンスとは比較対象が異なる別カテゴリ、③価格差≒6倍（アッカーマンシア¥6-12k/月 vs Now Foods Probiotic-10 ¥1.5-3k/月）でROIは現状従来プロバイオが圧倒。\n\n国内流通の現実＝Akkermansia muciniphila単独製品は日本国内で機能性表示食品/特保未承認でPendulum Therapeutics社（米国）等の海外個人輸入領域、国内流通プロバイオ（ヤクルト1000 Shirota株/明治R-1 1073R-1株/森永LKM512）はLactobacillus / Bifidobacterium 系の従来菌で、株単位エビデンスを確認した選択が現実的。\n\n現実解の階層＝①ベース＝食事性発酵食品（ヨーグルト・ぬか漬け・キムチ・味噌・納豆）+ 食物繊維22-25g/日（プレバイオ）で腸内環境基盤を作る、②特定症状対応サプリ追加＝IBS-D→LGG・抗菌薬服用中→Saccharomyces boulardii・便秘→BB-12等の株別選択、③アッカーマンシアは新興エビデンス成分で経済的余裕層の試験的選択肢、第一選択ではない位置づけです。\n\n併用注意＝両者とも免疫抑制状態（HIV/AIDS・癌化学療法中・臓器移植後免疫抑制剤使用中）で菌血症リスク稀（医師相談下）。\n\nSIBO（小腸内細菌異常増殖）疑い時のプロバイオ追加は症状悪化リスクで消化器内科相談。\n\nアッカーマンシアは大腸炎症性疾患（潰瘍性大腸炎・クローン病活動期）の動物試験で粘液層分解の懸念報告で消化器内科判断必須。\n\n「腸が若返る」「便秘が治る」断定NG→「便通改善が報告」「インスリン感受性改善が報告」型統一、化粧品メーカー視点で腸内環境×皮膚軸（gut-skin axis）＝Bowe 2011 Gut Pathog レビューで腸内ディスバイオシス→全身炎症→ニキビ/酒さ/アトピー悪化ループの補助介入軸として位置づけ、ただし皮膚症状は皮膚科診断+処方治療第一選択でサプリは補助レイヤーを化粧品メーカー視点で解説。',
  },
  // ── Session F Day 10 v2 バッチ 2026-05-14（AHA + バリア機能 skin 2本デー・ea05e3b で 3 pair 先取り後の残ユニーク2件） ────
  'glycolic-acid-vs-lactic-acid': {
    title: 'グリコール酸 vs 乳酸｜AHA 2大成分の分子量×浸透深度を論文で比較',
    description: 'グリコール酸（AHA・分子量76 Da・最小分子量・5-20%・¥1,800-5,000/30mL）と乳酸（AHA・分子量90 Da・5-15%・¥1,500-4,000/30mL）の違いを論文で比較。\n\n両者ともα-ヒドロキシ酸（AHA）の代表成分ですが、分子量・浸透深度・併存機能が異なる補完関係です。\n\nグリコール酸はサトウキビ由来でAHA中最小分子量（76 Da）で角質層浸透深度が最深。\n\nSmith 1996 Cutis RCT 8%グリコール酸×12週で皮膚スコア（しわ・色素沈着・テクスチャー）改善・Kakudo 2008 Plast Reconstr Surg 35-70%ピーリング皮膚科臨床応用・Bernstein 2001 Dermatol Surg RCT 高濃度グリコール酸ピーリング光老化対策・Smith 1996 Cutis 4-8%家庭用低濃度長期使用RCTが報告されています。\n\n乳酸はヨーグルト・サワーミルク発酵由来で分子量90 Daでグリコール酸より大きい（浸透深度はやや浅い）＋保湿効果併存（NMF天然保湿因子の構成成分）が独占機能。\n\nBerardesca 1989 Br J Dermatol RCT 5%乳酸×3ヶ月で皮膚水分量+バリア機能改善・Smith 1996 J Am Acad Dermatol RCT 12%乳酸×2週でしわ・皮膚厚改善・Stiller 1996 Arch Dermatol 5-12%乳酸長期使用の安全性プロファイル確立・Rendl 2001 J Invest Dermatol 抗菌作用（皮膚常在菌叢調整）が報告されています。\n\n独占切り口＝分子量×浸透深度×併存機能で使い分け＝①グリコール酸=深層浸透・角質剥離効果最強・しわ/光老化/ニキビ後色素沈着の中上級者向け（Bernstein 2001/Smith 1996根拠）／②乳酸=穏やかな浸透+保湿効果併存・敏感肌・初心者・乾燥肌・酒さ補助に適性（Berardesca 1989 保湿+バリア改善根拠）／③併用合理＝両者経路類似（角質剥離+ターンオーバー促進）で朝低濃度乳酸（5%）+夜中濃度グリコール酸（10%）の使い分けを組み立てた流れです。\n\n敏感肌の段階的導入＝①ベース＝低刺激クレンジング+保湿（セラミド/ヒアルロン酸）でバリア回復→②乳酸5%（夜のみ・週2-3回）でAHA慣らし→③乳酸10% or グリコール酸5%へ段階的に上げる→④グリコール酸10%以上は週2-3回維持・濃度より頻度コントロールの4段階の入り方です。\n\n裏切り型独占切り口=AHA共通の絶対ルール＝①夜のみ使用（朝AHA使用後の日中紫外線で色素沈着リスク・Kornhauser 2010 Clin Cosmet Investig Dermatol）／②日中SPF30+ PA+++必須（AHA使用で皮膚バリア一時的に弱化・紫外線感受性増加）／③妊娠中は低濃度（5%以下）の家庭用は比較的安全だが医療用ケミカルピーリング（30%以上）は禁忌・④レチノール併用は刺激重畳で夜時間分離不可（朝AHA/夜レチノール）を踏まえた進め方です。\n\n化粧品メーカー視点の現実解＝両者とも家庭用5-10%濃度の毎日使用は刺激リスク高で。\n\n無難な入り方＝週2-3回 → 慣れたら週3-4回 → 連日使用は高濃度品（10%以上）では推奨しない。\n\nPHA（ポリヒドロキシ酸・グルコノラクトン・乳糖酸）が分子量大きく刺激低い代替軸（Edison 2004 J Am Acad Dermatol PHAレビュー）もの選択肢です。\n\n併用注意＝両者ともレチノール・ペプチド・ビタミンC外用との同時使用は刺激重畳で時間分離（朝レチノール/VC＋夜AHA、または朝AHA＋夜レチノール）が無難。\n\n経口イソトレチノイン・トレチノイン処方薬服用中は外用AHA回避、両者妊娠中授乳中は低濃度家庭用は比較的安全だが医療用ピーリング（30%以上）は禁忌。\n\n敏感肌・酒さ・脂漏性皮膚炎・アトピー素因はパッチテスト推奨です。\n\n「シミが消える」「肌が生まれ変わる」断定NG→「皮膚スコア（しわ・色素沈着・テクスチャー）の改善が報告」型統一が薬機法整合的。',
  },
  'ceramide-vs-panthenol': {
    title: 'セラミド vs パンテノール（プロビタミンB5）｜バリア機能補助2成分の独立軸を論文で比較',
    description: 'セラミド（外用0.1-1%・経口セラミド0.6-1.2mg/日・¥1,500-5,000/30mL or月）とパンテノール（プロビタミンB5・外用1-5%・¥1,200-3,500/30mL）の違いを論文で比較。\n\n両者とも皮膚バリア機能補助の代表成分ですが、作用機序と最適な対象が完全に異なる補完関係です。\n\nセラミドは皮膚角質層細胞間脂質の主成分で。\n\n角層を構成するスフィンゴ脂質（セラミド1/2/3/4/5/6/9/AS/NS/NP/AP/EOS等の多型）が皮膚バリア機能・経表皮水分喪失（TEWL）抑制に必須な構造成分です。\n\n外用セラミド＝Loden 1997 Acta Derm Venereol RCT セラミド配合保湿剤×3週で皮膚水分量・バリア機能改善・Spada 2018 Int J Cosmet Sci レビュー（角質層脂質補完）・Yokota 2014 J Dermatol Sci 米由来セラミド外用RCT皮膚バリア改善・アトピー性皮膚炎・乾皮症・敏感肌の保湿剤として皮膚科学会推奨（日本皮膚科学会アトピーガイドライン2021でヘパリン類似物質と並ぶ第一選択保湿剤）。\n\n経口セラミド＝Tanaka 2014 J Dermatol Sci 米由来セラミド経口0.6-1.2mg/日×4週でTEWL改善・皮膚水分量改善・Bissett 2015 J Cosmet Dermatol RCT 経口米由来セラミドで皮膚バリア機能改善・小麦由来セラミドはセラミド分子の経口吸収→皮膚到達経路が確立されており（Tachibana 2008）。\n\nコラーゲンペプチドと並ぶ経口美容サプリの代表成分です。\n\nパンテノール（プロビタミンB5・D-パンテノール）は皮膚内でパントテン酸（ビタミンB5）に変換されてコエンザイムA合成・脂質代謝に関与＋角質層への高い水分結合能（吸湿性）＋創傷治癒促進の3経路。\n\n独占切り口＝役割分担で完全に独立＝①セラミド=角質層脂質補完・構造修復（角層細胞間脂質の物理的補充→TEWL抑制経路）／②パンテノール=創傷治癒+鎮静+保湿の多機能（コエンザイムA合成→脂質代謝+抗炎症経路）／③両者は経路独立で併用合理＝朝パンテノール（鎮静+保湿）+夜セラミド（バリア構造補完）の使い分けまたは同一製剤併存（La Roche-Posay Cicaplast Baume B5はパンテノール+マデカソシド+セラミド複合配合）を整理した内容です。\n\n外用vs経口の使い分け独占切り口＝外用=即時保湿+バリア物理補完（角層へ直接到達）／経口=体内ベース皮膚水分量改善（Tanaka 2014 4週RCT根拠）の二刀流で。\n\n敏感肌・アトピー・乾皮症の根本対策には外用が主軸・経口は補助が無難な順番です。\n\n敏感肌・アトピー・乾皮症の段階的導入＝①低刺激クレンジング（界面活性剤・香料・アルコール最小限）→②ヘパリン類似物質 or ヒト型セラミド配合保湿剤で物理的バリア補完→③パンテノール（CICA/Bepanthen系）で鎮静・創傷治癒補助→④ナイアシンアミド5%でセラミド合成内在性促進（Tanno 2000 セラミド合成促進機序）の4段階が無難な順番です。\n\n併用注意＝両者ともほぼ全成分と相性良く併用問題なし。\n\n外用ステロイド・タクロリムスとの併用合理（バリア補完+抗炎症の補完関係）・両者妊娠中授乳中ほぼ安全領域・極稀にパンテノール接触皮膚炎報告（パッチテスト陽性例）あり敏感肌は事前パッチテスト推奨です。\n\n「アトピーが治る」「皮膚バリアが完璧に修復」断定NG→「皮膚水分量・TEWL・バリア機能の改善が報告」型統一が薬機法整合的。\n\nCurel/Pyung Kang Yul/Dr.Jart+ Ceramidin Cream/CeraVe Moisturizing Cream（セラミド系）vs La Roche-Posay Cicaplast Baume B5/Bepanthen Tattoo Care/Eucerin Aquaphor Healing Ointment（パンテノール系）の市販品、化粧品メーカー視点で「アトピー素因・敏感肌・乾皮症の根本対策＝バリア補完（セラミド+パンテノール）+鎮静（CICA）+ステロイド・タクロリムス処方薬（皮膚科専門治療）」の階層を解説。',
  },
  // ── Session F Day 11 バッチ 2026-05-14 ────────────────────────
  'myo-inositol-vs-zinc': {
    title: 'ミオイノシトール vs 亜鉛｜PCOS・ホルモン・インスリン抵抗性の使い分けを論文で比較',
    description: 'ミオイノシトール（2g×2/日・¥2,000-4,000/月）と亜鉛（10-30mg/日・¥500-1,500/月）の違いを論文で比較。\n\nミオイノシトールはビタミンB群類縁体で細胞内セカンドメッセンジャーとして卵巣のインスリンシグナル伝達に関与（Unfer 2017 Eur Rev Med Pharmacol Sci メタ解析でMyo-inositol 2g×2/日でPCOSインスリン感受性・卵巣機能改善が報告）、亜鉛は300以上の酵素補因子としてテストステロン代謝・5α-リダクターゼ・抗酸化に関与（Tepaamorndech 2017 Eur J Nutrでテストステロン代謝関連報告）。\n\n作用ターゲットがインスリンシグナル経路（イノシトール）vs ホルモン代謝・酵素経路（亜鉛）で完全独立で、PCOSではミオイノシトール、ニキビ・男性ホルモン関連は亜鉛、両者は併用OK。\n\nMyo-inositol vs D-chiro-inositol 40:1 比はNIH/Roseff 2002 標準推奨で「D-chiro 単独高用量はPCOSで逆効果」エビデンスあり。\n\nPCOS診断は婦人科・不妊治療は生殖医療領域でサプリは補助という前提が妥当な範囲で、「PCOSが治る」「不妊が治る」断定は薬機法/景表法NG→「インスリン感受性・卵巣機能の改善が報告」型統一が整合的。糖尿病薬/インスリン併用低血糖リスク、亜鉛長期高用量での銅欠乏（10:1比維持）、効果が出るまで（イノシトール 8-12週・亜鉛 8-12週）を化粧品メーカー視点で解説。',
  },
  'probiotics-vs-beta-glucan': {
    title: 'プロバイオティクス vs β-グルカン｜腸活×免疫調整の独立軸を論文で比較',
    description: 'プロバイオティクス（株別100億-1,000億CFU・¥1,500-3,000/月）とβ-グルカン（250-500mg/日・¥1,000-2,500/月）の違いを論文で比較。\n\nプロバイオティクスは ISAPP公式定義 Hill 2014 Nat Rev Gastroenterol Hepatol「適量投与で宿主に健康利益をもたらす生きた微生物」で腸内菌叢補充による作用。\n\nβ-グルカンは多糖類でデクチン-1受容体（マクロファージ・好中球・樹状細胞）に結合して免疫調整シグナルを引き起こす（Akramienė 2007 Medicina 機序レビュー・Vetvicka 2014 J Glycomics Lipidomics レビュー）。\n\n作用経路が腸内環境補充 vs 自然免疫調整で完全独立で併用合理。\n\nβ-グルカンは起源で3系統に分かれる＝①酵母β-グルカン（Yestimun®・Wellmune®）= β-1,3/1,6結合でTalbott 2010 J Am Coll Nutr Wellmune RCT風邪期間短縮。\n\n②キノコβ-グルカン（マイタケD-fraction・霊芝・AHCC）= β-1,3/1,6結合で免疫調整・補助療法研究（補完代替医療領域）。\n\n③大麦・オーツ麦β-グルカン= β-1,3/1,4結合でコレステロール低下訴求（FDA cardiovascular health claim・EFSAヘルスクレーム認可）。\n\n起源別で作用が異なる点が独占的整理軸で、「β-グルカン」一括りで論じるのは論文ベース誤り。\n\n🚨免疫抑制状態（HIV/AIDS・癌化学療法中・臓器移植後・自己免疫疾患活動期）はプロバイオ菌血症リスク・β-グルカン免疫過剰反応リスクで医師相談前提。\n\n酵母由来β-グルカンは酵母アレルギー禁忌。\n\n潰瘍性大腸炎・クローン病活動期はβ-グルカンの免疫刺激が悪化要因の可能性で消化器内科判断必須。株別エビデンス・効果が出るまで（プロバイオ 4-8週・β-グルカン 4-12週）、月コスト、ROI判断を化粧品メーカー視点で解説。',
  },
  // Sprint 3 Session F Day 13 バッチ 2026-05-14（新規2件・skin美白YMYL/joint抗炎症・並行Day 12補完v2で3件先取り回避→ユニーク貢献2件のみ）
  'tranexamic-acid-vs-vitamin-c-topical': {
    title: 'トラネキサム酸 vs ビタミンC外用｜美白×肝斑の使い分けを論文で比較',
    description: 'トラネキサム酸（外用2-5%・経口250-500mg×2回/日処方）とビタミンC外用（L-アスコルビン酸15-20%・誘導体APPS/3-O-Ethyl Ascorbic Acid/MAP/SAP）の違いを論文で比較。\n\nトラネキサム酸はプラスミン-プラスミノーゲン系を阻害してメラノサイト活性化シグナルを遮断する単経路（Bala 2018 J Cosmet Dermatol メタ解析で外用2-5%×8-12週で肝斑改善。\n\nTan 2017 J Drugs Dermatol RCT 経口250mg×2回×3ヶ月で肝斑MASI スコア改善が報告）、ビタミンC外用はチロシナーゼ阻害+ROSスカベンジ+コラーゲン合成補因子+メラニン還元+抗炎症の5経路多機能成分（Pinnell 2003 Dermatol Surg RCT L-アスコルビン酸15%×12週で光老化・色素沈着改善・Humbert 2003 Exp Dermatol VC 5%×6ヶ月でしわ改善）。\n\n経路が単一プラスミン阻害vs 多経路抗酸化で完全独立、肝斑特化はトラネキサム酸主軸・老化・くすみ・コラーゲン産生総合ケアはVC主軸、併用合理。\n\n🚨経口トラネキサム酸は処方薬扱い（トランサミン®等・第一三共）で血栓既往・血栓塞栓症リスク（妊娠中・経口避妊薬服用中・喫煙者・肥満・血栓性素因）禁忌・婦人科でD-dimer/凝固検査+月経過多/不正出血の鑑別、肝斑は皮膚科の領域（外用ハイドロキノン4%・トラネキサム酸経口処方・QスイッチYAGレーザー・ピコレーザー）でサプリ・化粧品は補助という前提が妥当な範囲、「シミが消える」「肝斑が完治」断定は薬機法/景表法NG→「色素沈着スコア・MASIスコアの改善が報告」型統一が整合的。VC外用の安定性差（pH 2.5-3.5酸性・開封後3-6ヶ月以内）、誘導体形態の使い分け、効果が出るまで（外用TA 8-12週・VC 12-24週・経口TA 4-8週）を化粧品メーカー視点で解説。',
  },
  'curcumin-vs-boswellia': {
    title: 'クルクミン vs ボスウェリア｜関節・抗炎症の使い分けを論文で比較',
    description: 'クルクミン（500-2,000mg/日・吸収型 Theracurmin®/BCM-95®/Meriva®）とボスウェリア（ボスウェリア・セラータ抽出物 300-500mg×2-3/日・AKBA 30%標準化）の違いを論文で比較。\n\nクルクミンはウコン Curcuma longa 由来ポリフェノールでTNF-α/NF-κB/IL-6/COX-2 抑制の多経路抗炎症（Mathur 2024 Phytomedicine メタ解析 RCT統合で変形性膝関節症の WOMAC スコア改善・Daily 2016 J Med Food メタ8 RCTでOA症状改善が報告）、ボスウェリアは乳香 Boswellia serrata 樹脂由来 boswellic acid（AKBA = アセチル-11-keto-β-boswellic acid 主要活性成分）で5-リポキシゲナーゼ（5-LOX）阻害による白血球性ロイコトリエン産生抑制の単経路抗炎症（Sengupta 2008 Arthritis Res Ther RCT 5-Loxin® 250mg×8週で OA 痛みスコア・WOMAC改善・Vishal 2011 Int J Med Sci RCT Aflapin® 100mg×30日で類似効果）。\n\n経路が多経路NF-κB抑制 vs 単経路5-LOX阻害で完全独立で併用シナジー報告（Antony 2011 Indian J Pharm Sci/Kizhakkedath 2013 Mol Med Rep Curcugen+Boswelliaの併用RCTで単独より痛みスコア改善）。\n\n🚨クルクミン経口バイオアベイラビリティ問題＝素のクルクミン経口吸収率1%以下（Anand 2007 Mol Pharm レビュー）で吸収型製剤（Theracurmin®/BCM-95®/Meriva® lecithin複合 = 27倍/Longvida®/Cavacurmin®）が論文用量再現の前提。\n\n「ウコン配合」訴求のみで吸収型規格なし品は効果不確実。\n\n🚨クルクミン×ワルファリン×抗血小板薬で出血リスク・手術前2週間中止。\n\n胆石・胆道閉塞は胆汁分泌促進で禁忌。\n\n鉄剤吸収阻害でキレート形成・時間分離2-4時間。\n\nボスウェリアは脂溶性で食事と摂取・5-LOX阻害で抗血栓・喘息・IBDで医師判断。\n\n変形性膝関節症・関節リウマチは整形外科第一選択（NSAIDs・ヒアルロン酸関節内注射・運動療法・体重管理・人工関節置換術）でサプリは補助、「変形性関節症が治る」「関節リウマチが完治」断定は薬機法/景表法NG→「WOMAC・痛みスコアの改善が報告（効果サイズ限定的）」型統一が整合的。効果が出るまで（クルクミン 4-8週・ボスウェリア 4-12週）を化粧品メーカー視点で解説。',
  },
  // Sprint 3 Session F Day 14 バッチ 2026-05-14（新規5件・supplement/skin/hormone横断デー・新規pair拡張フェーズ突入）
  'vitamin-d-vs-omega3': {
    title: 'ビタミンD vs オメガ3｜脂溶性必須2強の使い分けを論文で比較',
    description: 'ビタミンD3（1,000-4,000IU/日）とオメガ3（EPA+DHA 1,000-2,000mg/日・FDA合計3g/日上限）の違いを論文で比較。\n\nビタミンD3はコレカルシフェロール（皮膚紫外線UVB変換・サプリ経口・25(OH)D 30-50 ng/mL目標）でCa恒常性・骨代謝・免疫調整・遺伝子発現調節の必須脂溶性ビタミン。\n\nManson 2019 NEJM VITAL試験 RCT n=25,871でD3 2,000IU/日×5.3年中央値で心血管/がん複合エンドポイントの有意差なし（一次予防領域では限定的）一方Pittas 2019 NEJM D2d Study RCT n=2,423で糖尿病発症リスクHR 0.88非有意・25(OH)D 30 ng/mL以下のサブグループでは効果傾向。\n\nHeaney 2003骨密度PBM形成期・Tang 2007 Lancet メタ Ca+D併用骨折リスク12%減。\n\nオメガ3 EPA+DHAは必須脂肪酸（α-リノレン酸ALA経路ヒト変換非効率）で抗炎症エイコサノイド（プロスタグランジンPGE3・ロイコトリエンLTB5・レゾルビン）産生。\n\nREDUCE-IT 2019 NEJM RCT n=8,179 イコサペント酸エチル4g/日（EPA高純度処方）×4.9年で心血管イベント25%減（既存ステロール治療下のハイリスク患者対象）。\n\nBhatt 2019 NEJM心血管2次予防エビデンス最厚。\n\nMIDAS 2010 Alzheimers Dement DHA 900mg/日×24週で言語記憶改善。\n\nHammiche 2011 Fertil Steril精子質関連・JELIS 2007 Lancet Yokoyama。\n\n経路がCa/骨/免疫×抗炎症脂質メディエーターで完全独立で併用合理。\n\n🚨両者ともワルファリン併用注意（VC外用は無関係・経口高用量で出血傾向monitor）。\n\nビタミンD3上限耐容量4,000IU/日（高Ca血症・腎結石リスク・サルコイドーシス/原発性副甲状腺機能亢進症で禁忌）。\n\nオメガ3 3g/日超で出血傾向・心房細動誘発の可能性（VITAL 2019）。\n\n形態別優先順位 TG型/rTG型 > EE型処方薬。\n\nIFOS 5-star認証・酸化・酸敗管理重要。\n\n魚アレルギーは藻由来DHA（Algal DHA）代替。「サプリで心血管予防」「がん予防」「骨折ゼロ」断定は薬機法/景表法NG→「25(OH)D・心血管イベント・骨密度・トリグリセリド・CRPの改善が報告」型統一が整合的。効果が出るまで（25(OH)D 8-12週・トリグリセリド 4-12週）、月コスト（D3¥150-1,500・オメガ3¥1,000-3,000）を化粧品メーカー視点で解説。',
  },
  'pdrn-vs-collagen-peptide': {
    title: 'PDRN vs コラーゲンペプチド｜サーモンDNA注射×経口真皮補助の使い分けを論文で比較',
    description: 'PDRN（Polydeoxyribonucleotide・サーモンDNA断片・美容皮膚科で外用ジェル0.5-2% or 注射処方・Placentex® Mastelli社/Rejuran®韓国製剤）とコラーゲンペプチド（経口5-10g/日・Verisol®/Peptan®/SCP-NS®）の違いを論文で比較。\n\nPDRNはサケ精巣/精子由来DNA断片（50-1,500塩基対）でA2Aアデノシン受容体経由で線維芽細胞活性化・コラーゲン産生・組織再生（Galeano 2008 Cardiovasc Diabetol動物創傷治癒・Belletti 2007 動物軟骨修復・Squadrito 2017 Front Pharmacol機序レビュー）、美容皮膚科ではLee 2015 Skin Res Technol RCT n=22で Rejuran® 1ml×3回×月1の真皮内注射で皮膚弾力・しわ・水分量改善・Park 2018 J Cosmet Dermatol RCT n=20で類似効果。\n\n外用 Choi 2019 J Cosmet Dermatol RCT n=40 PDRN 0.5%ジェル×8週で皮膚弾力改善（エビデンス階層 emerging・新興成分）。\n\nコラーゲンペプチドは経口5-10g/日でPro-Hyp/Hyp-Glyジペプチド吸収→線維芽細胞シグナル経路でⅠ型コラーゲン・ヒアルロン酸産生促進（Iwai 2005 J Agric Food Chemジペプチド吸収検出・Shigemura 2009 J Agric Food Chem 線維芽細胞シグナル機序確立）。\n\nProksch 2014 Skin Pharmacol Physiol RCT n=114 Verisol® 2.5-5g/日×8週で皮膚弾力・水分量改善・Asserin 2015 J Cosmet Dermatol RCT n=106 Peptan® 10g/日×8週でしわ深さ改善。\n\n経路が美容皮膚科処方境界×経口真皮基質補助で独立、目的別使い分け＝急速進行光老化・深いしわ・即効性求める→PDRN（美容皮膚科処方）／継続的真皮基質補助・全身的・低コスト→コラーゲンペプチド（経口・通常品）。\n\n🚨PDRN注射は美容皮膚科処方薬境界で「経口で同等効果」「美容外科でしか効果出ない」両極端誤り。\n\n経口コラーゲンペプチドの真皮シグナル機序はIwai 2005以降確立で「経口コラーゲン効かない」評価は古い。\n\n🚨サーモン・魚介アレルギーPDRN/魚由来コラーゲン禁忌。\n\n🚨鮫由来コラーゲンは絶滅危惧種懸念で持続可能性配慮。\n\n🚨ボバイン由来はBSE懸念で原産国確認。\n\n🚨甲殻類アレルギーキトサン由来コラーゲン回避。「シワが消える」「真皮再生（断定）」「肌が若返る」断定は薬機法/景表法NG→「皮膚弾力・水分量・しわ深さの改善が報告」型統一が整合的。効果が出るまで（PDRN 4-12週・コラーゲン 8-12週）、月コスト（PDRN美容皮膚科¥30,000-60,000/回 vs コラーゲン¥1,500-5,000/月）、現実的併用設計を化粧品メーカー視点で解説。',
  },
  'lutein-vs-astaxanthin': {
    title: 'ルテイン vs アスタキサンチン｜カロテノイド2強の使い分けを論文で比較',
    description: 'ルテイン（10-20mg/日・FloraGLO®/XanMax®規格・マリーゴールド花弁由来）とアスタキサンチン（4-12mg/日・AstaReal®/AstaZine®規格・ヘマトコッカス藻由来）の違いを論文で比較。\n\nルテインはキサントフィル系カロテノイド（酸素原子含有）でゼアキサンチンと合わせて黄斑色素（MPOD）形成・短波長青色光フィルタ+網膜抗酸化。\n\nAREDS2 JAMA 2013 RCT n=4,203でルテイン10mg+ゼアキサンチン2mg/日×5年で進行型加齢黄斑変性（AMD）への移行リスク減少（β-カロテン非含有処方が王道）。\n\nMa 2012 Br J Ophthalmol メタAMDリスク低下。\n\nStringham 2017 Foods認知機能・記憶補助関連。\n\nHammond 2014 Invest Ophthalmol Vis Sci VDT眩しさ・コントラスト感度改善。\n\nアスタキサンチンはケトカロテノイド（酸素原子含有・β-カロテンとルテインの構造的中間）でビタミンE約500倍の一重項酸素消去能力・脂質過酸化抑制・スーパーオキシド消去の3経路抗酸化（Kishimoto 2016 Mar Drugs/Naguib 2000 J Agric Food Chem機序確立）。\n\nTominaga 2017 Acta Biochim Pol RCT n=65 6mg/日×12週で肌弾力・しわ・水分量改善。\n\nChoi 2011 Mol Nutr Food Res RCT 12mg/日×4週で皮脂分泌・皮膚バリア改善。\n\nEkpe 2018 J Photochem Photobiol Bメタ。\n\nEarnest 2011 Int J Sports Med運動パフォーマンス補助・Liu 2018 Crit Rev Food Sci Nutrメタ眼精疲労改善関連。\n\n経路が黄斑色素形成（眼科特化）×脂質膜抗酸化（肌/眼/運動横断）で独立、目的別使い分け＝AMD予防・コンピュータ作業・読書時眩しさ→ルテイン主軸（AREDS2強エビデンス）／肌弾力・しわ・運動・眼精疲労総合→アスタキサンチン主軸。\n\n🚨AREDS2のβ-カロテン非含有経緯＝CARET試験 NEJM 1996 RCT n=18,314（β-カロテン+ビタミンA 喫煙者）+ATBC試験 NEJM 1994 RCT n=29,133（β-カロテン フィンランド喫煙者）で喫煙者・元喫煙者の肺癌リスク増加が確認されたため。\n\nAREDS2でβ-カロテン除外・ルテイン+ゼアキサンチン置換が論文上判断。\n\nルテインは喫煙者でも安全プロファイル確認。\n\n🚨アスタキサンチン×ワルファリンcaution（PMC6495044 INR上昇症例報告）でモニタリング。\n\n🚨アスタキサンチン12mg以上で拡張期血圧低下メタ報告で降圧薬併用注意。\n\n🚨ヘマトコッカス藻原料純度・酸化管理重要（AstaReal®/AstaZine®等規格化品推奨）。\n\n🚨進行型AMD・糖尿病網膜症・緑内障は眼科第一選択でサプリは補助。「目が良くなる」「シワが消える」断定は薬機法/景表法NG→「黄斑色素密度MPOD・肌弾力・しわ・眼精疲労の改善が報告」型統一。効果が出るまで（ルテインMPOD 6-12ヶ月・アスタキサンチン4-12週）、月コスト（ルテイン¥1,500-3,500・アスタキサンチン¥2,000-4,500）を化粧品メーカー視点で解説。',
  },
  // ── Sprint 3 Session F Day 11-15 バッチ 2026-05-15（mid-funnel KW回収・AIO耐性高・+25 pair一括拡張） ───────────────
  // skin系（+8 pair）
  'bakuchiol-vs-tranexamic-acid': {
    title: 'バクチオール vs トラネキサム酸｜妊娠中レチノール代替×プラスミン阻害美白を論文で比較',
    description: 'バクチオール（外用0.5-1%・植物性レチノール代替・Psoralea corylifolia由来メロテルペン）とトラネキサム酸（外用2-5%・経口250-500mg/日・プラスミン阻害薬）を論文で比較。バクチオールはレチノール様の遺伝子発現を起こしながら催奇形性プロファイルが異なるためレチノール非適応層の代替として注目（Dhaliwal 2019 Br J Dermatol RCT n=44で0.5%×12週がレチノール0.5%と同等のしわ・色素沈着改善・刺激性は有意に低い）、トラネキサム酸はプラスミン経路（炎症シグナル経由のメラニン産生）を起点側でブロック（JAAD 2020 メタ解析 n=561で経口250mg/日のmMASI有意改善）。\n\n経路が完全に独立で併用可能、肝斑・PIH・敏感肌・妊娠中の美白ニーズに補完関係。経口トラネキサム酸は血栓既往・OC・HRT・喫煙者で禁忌寄り、外用は両者とも妊娠中も比較的安全と整理されており、レチノール NG 妊娠期の美白×しわ対策として妥当な選択肢。効果が出るまで（バクチオール8-12週・TXA外用8-12週・経口TXA 4-8週）、月コスト、肌タイプ別の優先順位を化粧品メーカー視点で解説。',
  },
  'hyaluronic-acid-vs-ceramide-oral': {
    title: 'ヒアルロン酸 vs 経口セラミド｜外用保湿×経口バリアの違いを論文で比較',
    description: 'ヒアルロン酸（外用0.1-2%・経口120-240mg/日）と経口セラミド（グルコシルセラミド40-80mg/日・米由来/こんにゃく由来規格）の違いを論文で比較。ヒアルロン酸は外用で角層〜表皮の水分保持に即時作用、経口は腸内代謝後にN-アセチルグルコサミン由来の合成促進経路で関与（Oe 2016 RCT n=60でHA 120mg/日×12週で皮膚水分量・小じわ有意改善）、経口セラミドは細胞間脂質構成成分として皮膚バリアを内側から補強しTEWL（経表皮水分蒸散量）を抑制（JDS 2017 RCT n=63で経口グルコシルセラミドが角層水分量・TEWL改善・Ueda 2018 J Dermatolで乾燥肌スコア改善が報告された）。「外で吸って中で閉じる」役割分担で補完関係、敏感肌・アトピー素因では経口セラミドの中長期バリア強化が現実的。両者は妊娠中も比較的安全、月コスト、効果が出るまで（HA 8-12週・経口セラミド 4-12週）を化粧品メーカー視点で解説。',
  },
  'glutathione-vs-vitamin-c-oral': {
    title: 'グルタチオン vs 経口ビタミンC｜飲む美白2大成分の違い・期待値を論文で比較',
    description: 'グルタチオン（GSH・経口250-500mg/日・点滴600-1,200mg・¥3,000-8,000/月）と経口ビタミンC（500-1,000mg/日）の違いを論文で比較。グルタチオンは細胞内最大の抗酸化物質で、メラニン産生段階（チロシナーゼ活性調整＋ユーメラニン→フェオメラニンへのスイッチ）に作用（Arjinpathana 2012 RCT n=60 500mg/日×4ヶ月で肌色明度のメラニン指数改善が報告された）、ビタミンCは抗酸化＋コラーゲン合成促進が中心軸で、経口での美白エビデンスは外用より弱い（Telang 2013 reviewで「経口Cはシステミック土台・シミ消去エビデンスは限定的」と整理）。\n\n経口GSHは消化管でジペプチドに分解されやすく経口の吸収率問題が論文で指摘（Sonthalia 2018 review）、点滴/舌下/リポソーム製剤の差を理解する必要あり。「飲む美白で確実にシミが消える」は両者とも論文ベースで断定NG・外用ナイアシンアミド/TXA/アゼライン酸/ハイドロキノンが主役。月コスト、点滴の費用感、リポソームGSHの位置づけ、肝斑/PIH別の優先順位を化粧品メーカー視点で解説。',
  },
  'zinc-vs-azelaic-acid': {
    title: '亜鉛 vs アゼライン酸｜ニキビ対決・内服×外用の使い分けを論文で比較',
    description: '亜鉛（経口20-40mg/日・グルコン酸亜鉛/ピコリン酸亜鉛/酸化亜鉛）とアゼライン酸（外用15-20%・処方・10%以下OTC）の違いを論文で比較。亜鉛は抗炎症・抗アンドロゲン（5α還元酵素阻害補助）・抗菌の3経路で内側からニキビに作用（Dreno 2001 Acta Derm Venereol RCT n=332で亜鉛グルコン酸30mg/日×3ヶ月で炎症性ニキビスコア改善・テトラサイクリン同等の改善報告）、アゼライン酸はチロシナーゼ阻害＋抗炎症＋抗菌（P.acnes/Cutibacterium）の3作用で外用から作用（Pochi 1986 Br J Dermatol RCT n=251で20%×3ヶ月でニキビ皮疹減少・酒さ第一選択薬）。\n\n経路が独立で併用OK、軽症〜中等症ニキビは亜鉛単独 or 併用、ホルモン関連ニキビ・PIH併発・酒さ併発はアゼライン酸の優位性が高い。亜鉛長期高用量（40mg/日超）で銅欠乏リスク（Yadrick 1989）・銅サプリ併用（亜鉛:銅=10-15:1）、効果が出るまで（亜鉛4-12週・アゼライン酸4-16週）、市販OTC亜鉛のおすすめ、皮膚科処方アゼライン酸（フィンレア®）との関係を化粧品メーカー視点で解説。',
  },
  'retinol-vs-vitamin-e': {
    title: 'レチノール vs ビタミンE｜脂溶性ビタミンの違い・併用を論文で比較',
    description: 'レチノール（外用0.025-1%・ビタミンA誘導体）とビタミンE（外用α-トコフェロール0.5-5%・経口100-400IU/日）の違いを論文で比較。両者ともビタミン系の脂溶性成分だが作用ターゲットが完全に異なります。レチノールは表皮細胞のターンオーバー促進・コラーゲン産生でしわ・色素沈着・光老化に強いRCTエビデンス（Kafi 2007 RCT 0.4%×24週で深いしわ改善）、ビタミンEは脂質ラジカル消去型抗酸化として細胞膜の酸化ストレス抑制・他抗酸化成分の安定化が中心（Burke 2011 reviewで紫外線誘発酸化抑制・SkinCeuticals C E Ferulic配合根拠）。両者は経路独立で併用OK、ビタミンEがレチノール酸化分解を抑制する補完関係で実用的なスタック。レチノール妊娠中NG・夜のみ使用、ビタミンEは妊娠中OK・抗凝固薬ワルファリンとの併用注意（経口高用量）、効果が出るまで、月コストを化粧品メーカー視点で解説。',
  },
  'ferulic-acid-vs-niacinamide': {
    title: 'フェルラ酸 vs ナイアシンアミド｜抗酸化×多経路バリア成分の使い分けを論文で比較',
    description: 'フェルラ酸（外用0.5-1%・米ぬか・小麦ふすま由来植物性ポリフェノール）とナイアシンアミド（外用5%・ビタミンB3）の違いを論文で比較。フェルラ酸は抗酸化作用＋ビタミンC/Eの安定化役で、SkinCeuticals C E Ferulic（VC15%＋VE1%＋フェルラ酸0.5%）処方の根拠論文（Lin 2005で紫外線誘発光損傷を単独より顕著に抑制）、単独ヒトRCTは限定的でVCスタック前提のエビデンス。\n\nナイアシンアミドはメラノソーム転移阻害＋バリア機能強化＋抗炎症＋皮脂調整の4方面に作用（Bissett 2005 RCT 5%×8週で色素沈着改善）。両者は経路独立で併用OK、朝のVC＋ビタミンE＋フェルラ酸＋ナイアシンアミドの抗酸化＋バリア複合シールドが無難。両者とも妊娠中比較的安全・低刺激、効果が出るまで（フェルラ酸単独評価困難・ナイアシンアミド4-8週）、月コスト、敏感肌での選び順を化粧品メーカー視点で解説。',
  },
  'centella-asiatica-vs-panthenol': {
    title: 'センテラアジアチカ vs パンテノール｜CICA二大成分・バリア修復の使い分けを論文で比較',
    description: 'センテラアジアチカ（ツボクサエキス・外用0.1-2%・マデカッソシド/アジアチコシド/アジアチン酸/マデカシン酸の4成分群）とパンテノール（ビタミンB5前駆体・外用1-5%）の違いを論文で比較。両者ともK-Beauty CICA（韓国スキンケアの赤み・敏感肌ケア領域）の代表成分。センテラアジアチカは線維芽細胞活性化・コラーゲンI/III合成促進・抗炎症（Bylka 2013 reviewで創傷治癒・抗炎症エビデンス・Ratz-Łyko 2016 J Cosmet Dermatolで肌バリア改善報告）、パンテノールは皮膚内でパントテン酸（CoA前駆体）に変換され角質層の水分保持・上皮再生・修復シグナルに作用（Ebner 2002 Am J Clin Dermatolで D-パンテノール5%が皮膚バリア機能改善・Yang 2018で創傷治癒促進報告）。「センテラは細胞増殖シグナル、パンテノールは水分保持＋修復シグナル」で機序が異なる補完関係で併用OK、市販でもCICA配合製品にパンテノール併用が多い。レチノール・AHA・BHA刺激後の鎮静、敏感肌・ニキビ後の修復、両者とも妊娠中比較的安全、効果が出るまで（センテラ2-8週・パンテノール2-4週）、月コストを化粧品メーカー視点で解説。',
  },
  'azelaic-acid-vs-vitamin-c-topical': {
    title: 'アゼライン酸 vs ビタミンC（外用）｜美白×抗炎症の使い分けを論文で比較',
    description: 'アゼライン酸（外用10-20%・処方）とビタミンC外用（L-アスコルビン酸10-20%・誘導体5-15%）の違いを論文で比較。アゼライン酸はチロシナーゼ阻害＋抗炎症＋抗菌の3作用で色素沈着・ニキビ・酒さの3軸に対応（JDT 2020 RCT n=40で20%×24週がハイドロキノン4%と同等の肝斑改善・Pochi 1986 RCT n=251で酒さ・ニキビへの作用）、ビタミンC外用は抗酸化＋コラーゲン合成促進＋メラニン産生抑制の3経路（Pinnell 2001でL-アスコルビン酸15%が紫外線誘発酸化ストレス抑制・Humbert 2003 RCT n=20で5%×6ヶ月でしわ改善）。両者は経路独立で併用OK、市販でもANUA等のアゼライン酸＋VC配合が普及。アゼライン酸はハイドロキノン代替としてエビデンス・安全プロファイルが優秀（妊娠中比較的安全・長期使用可）、VCは安定化処方が必要・刺激リスクあり。朝VC＋夜アゼライン酸のスタック、肝斑/PIH/ニキビ/酒さ別の優先順位、月コストを化粧品メーカー視点で解説。',
  },
  // gut/microbiome系（+5 pair）
  's-boulardii-vs-l-rhamnosus-gg': {
    title: 'Saccharomyces boulardii vs L. rhamnosus GG｜酵母×乳酸菌の使い分けを論文で比較',
    description: 'Saccharomyces boulardii（CNCM I-745株・500mg/日・酵母系プロバイオティクス）とLactobacillus rhamnosus GG（ATCC 53103株・10-20億CFU/日・乳酸菌系）の違いを論文で比較。両者は抗生剤関連下痢（AAD）・小児急性下痢・C. difficile関連下痢の予防RCTで強いエビデンスを持つ二大プロバイオティクス。\n\nS. boulardiiは「酵母」のため抗生剤の影響を受けない独自利点があり、抗生剤投与中の補完が王道（McFarland 2010 メタ解析でAAD相対リスク減少・Szajewska 2015メタ解析でC. diff再発リスク減少）。LGGは乳酸菌系で小児急性下痢に対する最強エビデンス（Hojsak 2010 Cochrane review・WHO/ESPGHANガイドライン推奨）、CDIへの効果はメタ解析で示されているが、Allen 2013 PLACIDE試験等で議論あり。両者は併用OK・経路独立、抗生剤併用は S. boulardii優先、小児急性下痢はLGG優先という使い分けが現実的。免疫不全・中心静脈カテーテル留置・敗血症ハイリスクではS. boulardii菌血症の症例報告あり・医師相談、月コスト、効果が出るまで（即時〜2週間）を化粧品メーカー視点で解説。',
  },
  'inulin-vs-psyllium': {
    title: 'イヌリン vs サイリウム（オオバコ）｜水溶性食物繊維2強の使い分けを論文で比較',
    description: 'イヌリン（5-10g/日・チコリ/アガベ由来フラクタン）とサイリウム（5-10g/日・オオバコ種皮Plantago ovata由来）の違いを論文で比較。両者とも水溶性食物繊維だが機能が完全に異なります。イヌリンはβ(2→1)結合のフルクタン構造でビフィズス菌・F. prausnitzii・Akkermansia等の選択的増殖を促す古典的プレバイオティクス（Slavin 2013 Nutrients reviewでビフィズス菌増殖確認）、SCFAs（短鎖脂肪酸）産生促進で腸内環境改善が中心軸。\n\nサイリウムは強いゲル形成能で水分保持・便嵩増大・脂質吸着・LDL低下に作用（Anderson 2000 Am J Clin Nutrメタ解析でLDL有意低下・FDA心臓病リスク低減ヘルスクレーム認可）、便秘・IBS-C・コレステロール対策に現実的。「腸内細菌・SCFAs目的→イヌリン／便通・LDL対策→サイリウム」の目的別使い分け。イヌリンはSIBO/IBS既往でガス・腹部膨満が悪化するリスク・少量から、サイリウムは大量水分摂取必須・薬の吸収阻害（投薬2時間ずらす）、両者とも妊娠中比較的安全、月コスト、効果が出るまで（イヌリン2-4週・サイリウム1-2週）を化粧品メーカー視点で解説。',
  },
  'butyrate-vs-resistant-starch': {
    title: '酪酸（ブチレート）vs レジスタントスターチ｜既製品×前駆体の使い分けを論文で比較',
    description: '酪酸ナトリウム/酪酸トリブチリン（経口500-1,500mg/日・腸溶コーティング推奨）とレジスタントスターチ（RS・5-30g/日・調理ジャガイモ冷蔵/青バナナ/高アミロースコーン由来）の違いを論文で比較。酪酸は短鎖脂肪酸の代表で大腸上皮細胞の主要エネルギー源・抗炎症（HDAC阻害経由）・腸バリア強化に直接作用するが経口での生存率が課題（Canani 2011 World J Gastroenterol reviewで腸内代謝産物・上皮ホメオスタシスの中心）、レジスタントスターチは大腸で腸内細菌（特にF. prausnitzii 等）が発酵させて内因性酪酸産生を促す前駆体として作用（Topping 2003 Physiol Rev reviewで大腸SCFAs産生・腸内環境改善・Bird 2010 Mol Nutr Food Resで便量増・腸内環境改善）。「即時供給→酪酸（腸溶製剤）／持続供給×腸内細菌育成→RS」の補完関係。酪酸の経口生存率問題、RSの便通効果（イヌリンより強い・サイリウムより弱い）、IBS患者でガス症状悪化リスク、月コスト、効果が出るまで（酪酸2-4週・RS 4-8週）を化粧品メーカー視点で解説。',
  },
  'l-glutamine-vs-carnosine': {
    title: 'L-グルタミン vs カルノシン｜腸粘膜修復×抗糖化ペプチドの使い分けを論文で比較',
    description: 'L-グルタミン（5-15g/日・遊離アミノ酸）とカルノシン（β-アラニル-L-ヒスチジンジペプチド・500-1,000mg/日）の違いを論文で比較。L-グルタミンは腸管上皮細胞の主要エネルギー源・タイトジャンクション構造維持・リーキーガット仮説対策で論文蓄積（Rao 2012 reviewで腸バリア修復・Zhou 2019 Gutメタ解析でIBSの腸透過性改善が報告された）、ストレス・術後・激しい運動後の腸粘膜回復に妥当。\n\nカルノシンはβ-アラニルジペプチドで抗糖化（AGEs生成阻害）・抗酸化・神経筋pH緩衝の3経路（Hipkiss 2009 Adv Food Nutr Res reviewで老化関連糖化阻害・Aldini 2011 J Cell Mol Medレビュー）、腸というより全身性の抗老化用途が中心軸。「腸粘膜修復・運動回復→L-グルタミン／抗糖化・抗老化・神経筋pH緩衝→カルノシン」で機序がほぼ独立、併用OKだが目的別の優先順位が異なる。L-グルタミンの肝/腎機能低下時の用量注意、カルノシンの吸収率問題（β-アラニンへの分解）、月コスト、効果が出るまで（L-グルタミン2-4週・カルノシン4-12週）を化粧品メーカー視点で解説。',
  },
  'akkermansia-vs-inulin': {
    title: 'アッカーマンシア vs イヌリン｜次世代プロバイオ×プレバイオの使い分けを論文で比較',
    description: 'Akkermansia muciniphila（パスツール化死菌Pasteurized Akkermansia・1×10^10/日・MucinHealth等の規格化品）とイヌリン（5-10g/日・チコリ由来フラクタン）の違いを論文で比較。両者ともAkkermansia muciniphila（粘液層に常在し腸バリア・代謝健康に関与する次世代プロバイオ標的菌）を中心軸に据えるが、戦略が真逆。\n\nAkkermansia直接補充は肥満・耐糖能・腸バリアでヒトRCTが進展（Depommier 2019 Nat Med RCT n=32で肥満インスリン抵抗性のメタボ指標改善・パスツール化死菌の方が生菌より安全プロファイル良好）、イヌリンはAkkermansia含む腸内常在ビフィズス菌・F. prausnitzii等を内因的に増殖させる古典プレバイオティクス（Dewulf 2013 Gut RCTでイヌリン由来フラクタン16g/日×3ヶ月でAkkermansia muciniphila増加が報告された）。「Akkermansia直接補充→即効性高だが高コスト・規格化品入手限定／イヌリン経由→低コスト・腸内多様性向上だがガス症状リスク」の使い分け。日本市場でのAkkermansia規格化品入手難、SIBO/IBS既往でのイヌリン悪化リスク、月コスト、効果が出るまで（Akkermansia 4-12週・イヌリン2-4週）を化粧品メーカー視点で解説。',
  },
  // sports/men's系（+5 pair）
  'beta-alanine-vs-l-citrulline': {
    title: 'β-アラニン vs L-シトルリン｜持久力×パンプ・運動補助の使い分けを論文で比較',
    description: 'β-アラニン（3.2-6.4g/日・カルノシン前駆体）とL-シトルリン（運動前6-8g・マレート型8-10g）の違いを論文で比較。両者とも運動パフォーマンス補助だがメカニズムが完全に異なります。β-アラニンは筋肉内カルノシン濃度を増やしH+緩衝能を上げて高強度・短時間運動（1-4分の中強度〜高強度）の持久力に作用（Hoffman 2008 Amino Acids RCT n=30で4-6週で持久力改善・Saunders 2017メタ解析）、効果発現は累積型で4-8週の継続摂取が必要、副作用としてピリピリ感（paresthesia）。\n\nL-シトルリンは血管内NO産生→血流増加・パンプ感・乳酸クリアランス改善で即効性が特徴（Bailey 2010 J Appl Physiol RCTで6g摂取後NO増加・運動効率改善が報告された）、トレーニング当日〜数日の即時報酬。「持久力（β-アラニン）vs パンプ（シトルリン）」「累積（β-アラニン）vs 即時（シトルリン）」の二軸で補完関係、併用OKで筋トレ前スタックとして実用的。月コスト、フリー型/マレート型シトルリンの違い、運動前のタイミング、効果が出るまで（β-アラニン4-8週・シトルリン当日）を化粧品メーカー視点で解説。',
  },
  'tongkat-ali-vs-ashwagandha': {
    title: 'トンカットアリ vs アシュワガンダ｜男性活力アダプトゲンの使い分けを論文で比較',
    description: 'トンカットアリ（Eurycoma longifolia・200-400mg/日・標準化抽出物Physta®/LJ100®）とアシュワガンダ（KSM-66/Sensoril 300-600mg/日）の違いを論文で比較。両者ともアダプトゲン系ハーブで男性活力・ストレス耐性領域で重なるが、メカニズムが異なります。トンカットアリはコルチゾール低下＋テストステロン（特にfree-T）関連で報告蓄積（Tambi 2012 Andrologia RCT n=76で200mg/日×4週でテストステロン正常化・SHBG低下・Talbott 2013 J Int Soc Sports Nutr RCT n=63で200mg/日×4週でストレス指標・コルチゾール改善が報告された）、アシュワガンダはHPA軸調整経由のコルチゾール低下・睡眠の質改善・テストステロン関連で論文蓄積（Lopresti 2019 Am J Mens Health RCT n=57で600mg/日×8週でテストステロン・DHEAS関連改善が報告された）。\n\n「即効性のテストステロン関連→トンカットアリ／慢性ストレス×睡眠×累積→アシュワガンダ」の使い分け、両者経路独立で併用可能（朝トンカットアリ＋夜アシュワガンダの二段スタック）。前立腺癌/エストロゲン依存性疾患既往・甲状腺機能亢進症（アシュワガンダ）・自己免疫疾患・SSRI/抗精神病薬併用注意、妊娠中授乳中NG、月コスト、効果が出るまで（4-8週）を化粧品メーカー視点で解説。',
  },
  'tribulus-terrestris-vs-tongkat-ali': {
    title: 'トリブルス vs トンカットアリ｜男性活力ハーブの違い・実エビデンスを論文で比較',
    description: 'トリブルス・テレストリス（Tribulus terrestris・500-1,500mg/日・ハマビシ）とトンカットアリ（Eurycoma longifolia・200-400mg/日）の違いを論文で比較。両者とも「テストステロンブースター」として市場に流通するが、論文蓄積の質に明確な差があります。トリブルスは古典アーユルヴェーダ・伝統的男性活力ハーブで、過去の動物試験は豊富だがヒトRCTでのテストステロン上昇エビデンスは限定的（Pokrywka 2014 Biol Sport reviewで「ヒトRCTでテストステロン有意上昇は確認されていない」と整理・Roaiah 2016 J Sex Med RCT n=180でED症状改善は報告されたがホルモン変化は限定的）。\n\nトンカットアリはfree-T増加・SHBG低下のヒトRCT蓄積が比較的厚い（Tambi 2012 Andrologia RCT n=76・Talbott 2013 J Int Soc Sports Nutr RCT n=63）。「ヒトRCTのテストステロン関連エビデンス→トンカットアリが優位／伝統的使用・性機能・ED→トリブルス」の整理。両者ともホルモン依存性疾患既往・前立腺癌・PSA上昇は禁忌寄り、薬物相互作用、規格化品（Physta®/LJ100®）と市販品の質的差、月コスト、効果が出るまでを化粧品メーカー視点で解説。',
  },
  'creatine-vs-beta-alanine': {
    title: 'クレアチン vs β-アラニン｜筋力ATP×持久力カルノシンの使い分け・併用を論文で比較',
    description: 'クレアチン（モノハイドレート3-5g/日）とβ-アラニン（3.2-6.4g/日）の違いを論文で比較。両者とも運動パフォーマンス補助のRCT蓄積が豊富な双璧成分だが、作用ターゲットの時間軸が異なります。クレアチンはATP-クレアチンリン酸系（短時間爆発的運動・1-10秒）のATP再合成促進で筋力・パワー・除脂肪体重に作用（Kreider 2017 J Int Soc Sports Nutrメタ解析・JISSN 2017ガイドライン・100以上のRCT統合）、効果発現3-4週。\n\nβ-アラニンは筋肉内カルノシン濃度を増やしH+緩衝能を上げて中強度持久（1-4分）に作用（Hoffman 2008 Amino Acids RCTで4-6週で持久力改善・Saunders 2017メタ解析）、効果発現4-8週。「短時間爆発（クレアチン）×中強度持久（β-アラニン）」で時間軸が補完関係、併用OK・トレーニング目的に応じて優先順位が決まる。クレアチンの安全プロファイル（数十年RCT蓄積で最も確立）、β-アラニンのpareshtesia（ピリピリ感）、月コスト、効果が出るまで、ローディング期vs通常摂取を化粧品メーカー視点で解説。',
  },
  'fadogia-agrestis-vs-tongkat-ali': {
    title: 'ファドジア vs トンカットアリ｜新興男性活力ハーブの違い・エビデンス階層を論文で比較',
    description: 'ファドジア（Fadogia agrestis・600mg/日）とトンカットアリ（Eurycoma longifolia・200-400mg/日・Physta®/LJ100®規格）の違いを論文で比較。両者は近年Andrew Huberman氏のポッドキャスト等で言及されて市場が拡大した「新興男性活力ハーブ」だが、論文蓄積の厚みに明確な差があります。ファドジアは西アフリカ原産の伝統ハーブで動物試験（Yakubu 2008 Asian J Androlでラットのテストステロン関連・性行動関連報告）が中心、ヒトRCTのテストステロン上昇・性機能改善エビデンスは現時点で限定的（emerging段階）。\n\n一方、トンカットアリはマレーシア政府支援研究を含むヒトRCTが複数蓄積（Tambi 2012 Andrologia RCT n=76・Talbott 2013 J Int Soc Sports Nutr RCT n=63）。「ヒトRCTエビデンス→トンカットアリ優位／動物試験のみ・伝統的使用→ファドジア」のエビデンス階層差。市場の煽り（「テストステロンが○%上がる」断定）は両者とも論文ベースNG・現実は「ホルモン関連指標の改善が報告された」型統一が誠実。前立腺癌/エストロゲン依存性疾患禁忌、薬物相互作用、月コスト、効果が出るまでを化粧品メーカー視点で解説。',
  },
  // sleep/cognitive系（+4 pair）
  'alpha-gpc-vs-citicoline': {
    title: 'アルファGPC vs シチコリン｜コリン源の違い・認知機能の使い分けを論文で比較',
    description: 'アルファGPC（L-α-グリセロホスホコリン・300-1,200mg/日）とシチコリン（CDPコリン・500-2,000mg/日）の違いを論文で比較。両者ともコリン源として脳内アセチルコリン合成を支えるが、代謝経路と作用ターゲットが異なります。アルファGPCはコリンとグリセロリン酸に分解→コリン部分がアセチルコリン合成に直接利用・残るグリセロリン酸が膜リン脂質合成に寄与（De Jesus Moreno Moreno 2003 Clin Therでアルツハイマー型認知症改善・Bellar 2015 J Am Coll Nutrで運動パフォーマンス改善）、認知機能・運動・パワー出力の領域で論文蓄積。\n\nシチコリン（CDPコリン）はコリンとシチジンに分解→コリンがアセチルコリン合成・シチジンがウリジンに変換され膜リン脂質合成に寄与（Silveri 2008 Magn Reson Imaging RCTで前頭葉のリン脂質代謝指標改善・Fioravanti 2005 Cochrane reviewで認知機能改善）、認知機能改善・脳血管障害後のリハビリ領域で論文蓄積。「運動・短期記憶・パワー→アルファGPC／持続的認知機能・脳血管障害後→シチコリン」の使い分け、両者併用OK、コリン高用量で腸内TMAO産生（心血管リスク仮説の議論）、月コスト、効果が出るまで（4-12週）を化粧品メーカー視点で解説。',
  },
  'magnesium-l-threonate-vs-magnesium-glycinate': {
    title: 'マグネシウムL-スレオネート vs グリシン酸塩｜脳到達Mg×神経弛緩Mgの使い分けを論文で比較',
    description: 'マグネシウムL-スレオネート（Magtein®・1,500-2,000mg/日として元素マグネシウム約144mg含有）とマグネシウム グリシン酸塩（200-400mg/日）の違いを論文で比較。両者とも吸収率と消化器忍容性が優秀なマグネシウム形態だが、作用ターゲットが異なります。マグネシウムL-スレオネートはMITで開発された脳血液関門通過特異形態で、脳内マグネシウム濃度上昇によるシナプス可塑性・認知機能改善が動物試験で報告（Slutsky 2010 Neuronでマウスの記憶・シナプス密度改善）、ヒトでも Liu 2016 J Alzheimers Dis RCT n=44で12週で認知機能スコア改善が報告された（新興・現時点で大規模RCT限定）。\n\nグリシン酸塩はGABA系・NMDA受容体調整経由の神経筋弛緩・睡眠の質改善で論文蓄積（Abbasi 2012 J Res Med Sci RCT n=46 高齢者500mg/日×8週でPSQI改善・Boyle 2017 reviewでストレス・不安への有効性）。「認知機能・記憶→スレオネート／睡眠・神経筋弛緩・コルチゾール対策→グリシン酸」の使い分け、両者経路独立で併用OK（朝スレオネート＋夜グリシン酸の二段スタック）。スレオネートの高コスト、エビデンス階層差、腎機能低下時注意、月コスト、効果が出るまで（4-12週）を化粧品メーカー視点で解説。',
  },
  '5-htp-vs-saffron': {
    title: '5-HTP vs サフラン｜セロトニン前駆体×植物性気分サポートの使い分けを論文で比較',
    description: '5-HTP（5-ヒドロキシトリプトファン・グリフォニア由来50-200mg/日）とサフラン（クロッカス・サティバスCrocus sativus標準化抽出物28-30mg/日）の違いを論文で比較。両者とも気分・軽度抑うつ症状のサポートで論文があるが、メカニズムが異なります。5-HTPはトリプトファン→5-HTP→セロトニン代謝経路の中間体補給で脳内セロトニン濃度上昇に作用（Birdsall 1998 Altern Med Rev reviewで軽度〜中等度抑うつ症状の改善・複数の小規模RCT）、即効性高いが SSRI併用でセロトニン症候群リスク・MAOI禁忌の併用注意がシビア。\n\nサフランは活性成分クロシン・サフラナール・ピクロクロシンによる多経路作用（セロトニン再取り込み阻害＋抗酸化＋抗炎症）で気分改善（Lopresti 2014 Hum Psychopharmacolメタ解析でSSRI同等の抑うつ改善が報告された・Hausenblas 2013 J Integr Medメタ解析）、SSRI/SNRI併用注意は5-HTPほどシビアではないが医師相談前提。\n\n「軽度抑うつ・気分・睡眠（5-HTP）／軽度〜中等度抑うつ・更年期気分・PMS（サフラン）」の使い分け。「気分が劇的に改善する」「鬱が治る」断定は薬機法/景表法NG・医療領域、SSRI/MAOI/三環系/抗精神病薬併用警告、双極性障害禁忌寄り、妊娠中授乳中サフランNG、月コスト、効果が出るまで（5-HTP 2-4週・サフラン4-8週）を化粧品メーカー視点で解説。',
  },
  'ginkgo-biloba-vs-alpha-gpc': {
    title: 'イチョウ葉 vs アルファGPC｜脳血流×コリン源の使い分けを論文で比較',
    description: 'イチョウ葉エキス（EGb 761®規格化・120-240mg/日）とアルファGPC（300-1,200mg/日）の違いを論文で比較。両者とも認知機能領域だが、メカニズムが完全に異なる補完関係。イチョウ葉はギンコフラボン配糖体・テルペンラクトンによる脳血流改善＋抗酸化＋血小板活性化因子拮抗（Le Bars 1997 JAMA RCTで認知症患者の認知機能改善 等）、軽度認知障害（MCI）・血管性認知症の補助エビデンスで論文蓄積。\n\nアルファGPCはコリン源としてアセチルコリン合成基質を供給し記憶・運動パフォーマンスに作用（De Jesus Moreno Moreno 2003 Clin Therでアルツハイマー型認知症改善・Bellar 2015 J Am Coll Nutrで運動パフォーマンス改善）。「血流・血管性認知症→イチョウ葉／アセチルコリン補給・運動・短期記憶→アルファGPC」の使い分け、両者経路独立で併用可能で「血流＋神経伝達物質基質」の補完スタック。「認知症が治る」「物忘れが改善する」断定は薬機法/景表法NG・医療領域、抗凝固薬ワルファリン/抗血小板薬アスピリンとイチョウ葉の併用注意（出血リスク報告）、手術1-2週間前イチョウ葉中止、月コスト、効果が出るまで（イチョウ葉8-24週・アルファGPC4-12週）を化粧品メーカー視点で解説。',
  },
  // maternal/fertility系（+3 pair・YMYL高）
  'folic-acid-vs-methyl-folate': {
    title: '葉酸（モノグルタミン酸型）vs 活性型メチル葉酸｜MTHFR遺伝子多型対応を論文で比較',
    description: '葉酸（モノグルタミン酸型・合成プテロイルモノグルタミン酸・400-800μg/日）と活性型メチル葉酸（5-MTHF 等®/Metafolin®規格・400-800μg/日）の違いを論文で比較。両者ともDNA合成・神経管閉鎖障害（NTD）予防・メチル化サイクル補酵素として機能するが、代謝経路と推奨される対象層が異なります。モノグルタミン酸型葉酸は厚労省2000年通知の唯一の公的言及対象でMRC 1991 Lancet RCT n=1,817のNTD再発リスク72%減・Czeizel 1992 NEJM RCT n=4,753の初発リスク低減のエビデンス基盤、ただし体内でMTHFR酵素により5-MTHFに変換が必要。\n\nMTHFR C677T遺伝子多型（日本人10-15%・ホモ接合体5-7%）保持者はMTHFR酵素活性が低下し合成葉酸→5-MTHF変換効率が下がるため、5-MTHF直接補給が論文上で合理的（Pietrzik 2010 Clin Pharmacokinetで5-MTHFの方が血中濃度上昇が早い・Servy 2014で不育症の5-MTHF優位報告）。「妊活/妊娠中の標準→モノグルタミン酸型（公的言及・コスパ）／MTHFR遺伝子検査陽性・不育症既往・ホモシステイン高値→5-MTHF」の使い分け。「妊娠成立する」「不妊が治る」断定は薬機法/景表法NG、不育症外来は医療領域、抗てんかん薬/メトトレキサート併用注意、葉酸1mg/日超でB12欠乏マスキング、月コスト（モノグルタミン酸型¥300/月・5-MTHF¥1,000-2,000/月）、効果が出るまでを化粧品メーカー視点で解説。',
  },
  'iron-vs-vitamin-c-oral': {
    title: '鉄 vs ビタミンC（経口）｜吸収率2-3倍・併用スタックの論文ベース解説',
    description: '鉄（経口18-60mg/日・グリシン酸キレートFerrochel®/ヘム鉄/フマル酸鉄/硫酸鉄等）とビタミンC（500-1,000mg/日）の関係を論文で比較。両者は「比較」より「併用スタック」が無難な典型ペア。非ヘム鉄（植物性食品・サプリ硫酸鉄/フマル酸鉄/グリシン酸鉄等）は腸管で3価Fe3+から2価Fe2+への還元が吸収律速段階で、ビタミンCはこの還元を促進し吸収率を2-3倍に高める論文蓄積（Hallberg 1989 Am J Clin Nutrで非ヘム鉄吸収率がVC 100mg併用で2-3倍・Cook 2001 Am J Clin Nutrレビューで経典スタック確立）。\n\n「鉄欠乏性貧血の女性慢性疲労→鉄+VC同時摂取が論文上」「ヘム鉄（動物性）はVC併用効果が小さい」「鉄サプリ+お茶/コーヒー（タンニン）/カルシウム/PPI/胃切除既往で吸収率低下」の現実的な吸収戦略。鉄遺伝性ヘモクロマトーシス（HFE遺伝子変異 C282Y/H63D・人口0.5%）絶対禁忌・サプリ前のCBC+フェリチン+TIBC+TSAT血液検査必須、男性/閉経後女性はサプリ前検査がより重要、フェリチン>100の非欠乏型は補給回避、VC高用量2,000mg/日以上で腎結石、月コスト、効果が出るまで（鉄欠乏改善8-26週）を化粧品メーカー視点で解説。',
  },
  'methyl-folate-vs-vitamin-b12': {
    title: 'メチル葉酸 vs ビタミンB12｜メチル化サイクルの補完関係を論文で比較',
    description: '活性型メチル葉酸（5-MTHF・400-800μg/日）とビタミンB12（メチルコバラミン500-1,000μg/日・経口高用量推奨）の違いを論文で比較。両者は「比較」より「補完関係」が王道なペア。メチル化サイクル（ホモシステイン→メチオニン変換）で5-MTHFがメチル基をホモシステインに供与・B12がメチオニン合成酵素の補酵素として必須、片方だけでは代謝が回らない構造（Bottiglieri 2005 J Nutrでメチル化サイクル機序確立・Smith 2010 PLOS One VITACOG RCT n=271で葉酸0.8mg+B6 20mg+B12 0.5mg/日×24週で軽度認知障害の脳萎縮率50%以上減少が報告された）。\n\nAgeing Research Reviews 2016メタ解析 n=2,398でも葉酸補充で認知機能スコア・ホモシステイン値有意改善（特に高齢者）。一方、葉酸1mg/日超の長期摂取はB12欠乏の血液所見（巨赤芽球性貧血）を隠す可能性あり・神経症状進行リスクで、ベジタリアン/ヴィーガン/PPI長期/胃切除既往はB12不足リスク高。「MTHFR多型陽性→5-MTHF優先／菜食主義者・PPI/胃切除→B12優先／メチル化サイクル最適化→併用」の使い分け、抗てんかん薬/メトトレキサート併用注意、月コスト、効果が出るまで（4-12週）、認知機能/不育症/妊活での位置づけを化粧品メーカー視点で解説。',
  },
  // ── Sprint 3 Session F Day 16-20 バッチ 2026-05-16（mid-funnel KW 第2波・新ルール準拠執筆） ───────────────
  'tranexamic-acid-vs-glutathione': {
    title: 'トラネキサム酸 vs グルタチオン｜美白プラスミン阻害×経口抗酸化の使い分けを論文で比較',
    description: 'トラネキサム酸（外用2-5%・経口250-500mg/日）とグルタチオン（経口250-500mg/日・点滴600-1,200mg）を論文で比較。\n\nトラネキサム酸はプラスミン経路を起点側でブロックする単経路抗メラニン産生成分（JAAD 2020 メタ解析 n=561で経口250mg/日のmMASI有意改善）。グルタチオンは細胞内最大の抗酸化物質でメラニン産生段階に作用するが経口吸収率に議論あり（Arjinpathana 2012 RCT 500mg/日×4ヶ月でメラニン指数改善・Sonthalia 2018 reviewで吸収率問題指摘）。\n\n肝斑特化＝TXA優位／全身性くすみ＝GSH補助の使い分け、月コスト、効果が出るまで、点滴／リポソーム経口の位置づけを解説。',
  },
  'niacinamide-vs-ceramide': {
    title: 'ナイアシンアミド vs セラミド（外用）｜多機能B3×バリア脂質の使い分けを論文で比較',
    description: 'ナイアシンアミド外用（5%）とセラミド外用（0.5-2%・主にセラミドNP/AP/EOP）を論文で比較。\n\nナイアシンアミドはメラノソーム転移阻害＋バリア機能強化＋抗炎症＋皮脂調整の4方面に作用（Bissett 2005 RCT 5%×8週で色素沈着改善・Draelos 2005で毛穴・小じわ改善）。セラミドは細胞間脂質構成成分で皮膚バリア構築・TEWL抑制が中心（Spada 2018 J Cosmet Dermatolで角層水分量・TEWL改善）。\n\n色素沈着・毛穴・小じわ→ナイアシンアミド／敏感肌・アトピー素因・乾燥型バリア低下→セラミドの使い分け、両者経路独立で併用が王道、月コストを解説。',
  },
  'centella-asiatica-vs-bisabolol': {
    title: 'センテラアジアチカ vs ビサボロール｜CICA成分×カモミール由来抗炎症を論文で比較',
    description: 'センテラアジアチカ（0.1-2%・マデカッソシド/アジアチコシド規格）とビサボロール（0.2-0.5%・カモミール由来α-ビサボロール）を論文で比較。\n\nセンテラは線維芽細胞活性化・コラーゲンI/III合成促進・抗炎症（Bylka 2013 Adv Wound Care review・Ratz-Łyko 2016で肌バリア改善）。ビサボロールはマトリカリア・カモミール由来モノテルペンで抗炎症・抗刺激・浸透促進（Kamatou 2010 J Ethnopharmacol reviewで紅斑抑制報告）。\n\n敏感肌・酒さ素因・赤み軽減→ビサボロール／創傷治癒・コラーゲン合成補助→センテラの使い分け、両者併用OK、レチノール・AHA刺激後の鎮静で王道の組み合わせ。',
  },
  'panthenol-vs-bisabolol': {
    title: 'パンテノール vs ビサボロール｜B5前駆体×カモミール抗炎症の使い分けを論文で比較',
    description: 'パンテノール（D-パンテノール・ビタミンB5前駆体・1-5%）とビサボロール（0.2-0.5%・α-ビサボロール）を論文で比較。\n\nパンテノールは皮膚内でパントテン酸（CoA前駆体）に変換され角質層の水分保持・上皮再生・修復シグナルに作用（Ebner 2002 Am J Clin Dermatolで D-パンテノール5%が皮膚バリア機能改善・Yang 2018で創傷治癒促進）。ビサボロールは抗炎症・抗刺激・浸透促進（Kamatou 2010で紅斑抑制）。\n\n水分保持・修復→パンテノール／赤み軽減・浸透促進→ビサボロールの補完関係で併用が王道、刺激後ケア・敏感肌・乳児/新生児にも使用可（パンテノール）を解説。',
  },
  'retinol-vs-tranexamic-acid': {
    title: 'レチノール vs トラネキサム酸｜しわ×美白の使い分け・併用順序を論文で比較',
    description: 'レチノール（外用0.025-1%・ビタミンA誘導体）とトラネキサム酸（外用2-5%・経口250-500mg/日）を論文で比較。\n\nレチノールはターンオーバー促進・コラーゲン産生でしわ・光老化・色素沈着に強いエビデンス（Kafi 2007 RCT 0.4%×24週で深いしわ改善）。トラネキサム酸はプラスミン経路阻害で肝斑・PIHに作用（JAAD 2020 メタ n=561でmMASI改善）。\n\nしわ・光老化総合→レチノール／肝斑・PIH特化→TXA、夜レチノール+TXA併用が王道。妊娠中レチノールNGでTXA外用+バクチオール+ナイアシンアミドが代替軸、効果が出るまでと月コストを解説。',
  },
  'ceramide-vs-bisabolol': {
    title: 'セラミド vs ビサボロール｜バリア脂質×抗炎症の使い分けを論文で比較',
    description: 'セラミド外用（0.5-2%・セラミドNP/AP/EOP）とビサボロール（0.2-0.5%・α-ビサボロール）を論文で比較。\n\nセラミドは細胞間脂質構成成分で皮膚バリア構築・TEWL抑制・乾燥型敏感肌の中長期対策に作用（Spada 2018で角層水分量・TEWL改善）。ビサボロールは抗炎症・抗刺激・浸透促進のカモミール由来モノテルペン（Kamatou 2010で紅斑抑制）。\n\n乾燥型バリア低下・アトピー素因・冬季悪化→セラミド主軸／急性赤み・刺激後鎮静→ビサボロール補助の使い分け、両者併用OKで「保湿バリア+抗炎症」の王道スタック、効果が出るまでを解説。',
  },
  'spermidine-vs-urolithin-a': {
    title: 'スペルミジン vs ウロリチンA｜オートファジー×マイトファジーの使い分けを論文で比較',
    description: 'スペルミジン（1-15mg/日・小麦胚芽/納豆/熟成チーズ由来）とウロリチンA（500-1,000mg/日・Mitopure®規格・エラグ酸代謝産物）を論文で比較。\n\nスペルミジンはオートファジー誘導でlongevity関連（Eisenberg 2016 Nat Medでマウス寿命延長・Kiechl 2018 Am J Clin Nutrで食事性スペルミジン摂取と総死亡率低下の関連）。ウロリチンAはマイトファジー誘導でミトコンドリア品質管理（Andreux 2019 Nat Metabヒトプラセボ対照試験でミトコンドリア遺伝子発現改善・Liu 2022 JAMA Network OpenでRCT高齢者筋機能改善）。\n\nオートファジー全般→スペルミジン／ミトコンドリア特化・筋機能→ウロリチンAの使い分けを解説。',
  },
  'pterostilbene-vs-fisetin': {
    title: 'プテロスチルベン vs フィセチン｜SIRT1×senolyticsの使い分けを論文で比較',
    description: 'プテロスチルベン（50-250mg/日・ブルーベリー由来メトキシスチルベン）とフィセチン（100-500mg/日・イチゴ/りんご由来フラボノール）を論文で比較。\n\nプテロスチルベンはレスベラトロールの3,5-ジメトキシ体で経口吸収率・血中半減期がレスベラトロールより優位（Riche 2014 J Toxicol RCTで脂質代謝改善・血圧低下報告）。フィセチンはケルセチンと骨格類似でsenolytics（老化細胞除去）特化（Yousefzadeh 2018 EBioMedicineマウス lifespan延長・Wake Forest大学等でヒトPhase II 試験進行中）。\n\nSIRT1経路・全身代謝→プテロスチルベン／senolytics特化→フィセチンの使い分けを解説。',
  },
  'nmn-vs-spermidine': {
    title: 'NMN vs スペルミジン｜NAD+前駆体×オートファジー誘導の使い分けを論文で比較',
    description: 'NMN（250-500mg/日・NAD+前駆体）とスペルミジン（1-15mg/日・オートファジー誘導）を論文で比較。\n\nNMNはNAD+補充でサーチュイン活性化・細胞代謝（Yoshino 2021 Science RCT n=25 250mg/日10週で骨格筋インスリン感受性改善）。スペルミジンはオートファジー誘導でlongevity関連（Eisenberg 2016 Nat Medマウス寿命延長・Kiechl 2018 食事摂取と総死亡率低下関連）。\n\nNAD+補充・エネルギー代謝→NMN／オートファジー全般・細胞品質管理→スペルミジンの併用が王道スタック（NAD+補充+細胞品質管理の二段）、月コスト、効果指標を解説。',
  },
  'sulforaphane-vs-quercetin': {
    title: 'スルフォラファン vs ケルセチン｜Nrf2活性化×senolyticsの使い分けを論文で比較',
    description: 'スルフォラファン（5-30mg/日・ブロッコリースプラウト由来）とケルセチン（500-1,000mg/日・タマネギ/りんご由来フラボノール）を論文で比較。\n\nスルフォラファンはNrf2-ARE経路活性化で内因性抗酸化・解毒酵素誘導（Fahey 1997 PNAS機序確立・Zhang 2006 Cancer Res化学予防エビデンス）。ケルセチンはsenolytics特化（Zhu 2015 Aging Cellダサチニブ+ケルセチンD+Q細胞アポトーシス誘導）+抗ヒスタミン（Mlcek 2016）の二刀流。\n\n内因性抗酸化・解毒経路→スルフォラファン／senolytics+抗アレルギー→ケルセチンの使い分け、両者併用OK。',
  },
  'melatonin-vs-magnesium-l-threonate': {
    title: 'メラトニン vs マグネシウムL-スレオネート｜睡眠ホルモン×脳到達Mgの使い分けを論文で比較',
    description: 'メラトニン（0.3-3mg）とマグネシウムL-スレオネート（1,500-2,000mg/日・元素Mg約144mg含有・Magtein®）を論文で比較。\n\nメラトニンは生体時計リセット・入眠潜時短縮（Cochrane 2002 メタ n=1,200で時差ぼけ改善・PLOS ONE 2013 メタ n=1,683で入眠潜時平均7分短縮）、日本では医薬品扱いで個人輸入前提。マグネシウムL-スレオネートは脳血液関門通過特異形態で脳内Mg濃度上昇・認知機能改善（Liu 2016 J Alzheimers Dis RCT n=44で12週で認知機能スコア改善）。\n\n概日リズム障害→メラトニン／認知機能+睡眠補助→スレオネートの使い分けを解説。',
  },
  'bacopa-monnieri-vs-rhodiola': {
    title: 'バコパモニエラ vs ロディオラ｜記憶累積×精神疲労即時の使い分けを論文で比較',
    description: 'バコパモニエラ（300-600mg/日・KSM-66相当・バコサイドA+B 20-50%標準化）とロディオラ（200-600mg/日・SHR-5規格・ロザビン+サリドロサイド3:1標準化）を論文で比較。\n\nバコパは記憶・学習の累積効果型（Stough 2001 Psychopharmacology RCT n=46で12週で言語学習・遅延再生改善・Calabrese 2008メタ）。ロディオラは精神疲労・バーンアウト・認知パフォーマンス改善で即時効果型（Phytomedicine 2010 RCT n=101 SHR-5 170mg/日×4週で計算誤り率改善・J Sports Med 2017 RCT n=118 200mg/日×12週で燃え尽きスコア改善）。\n\n慢性的記憶学習→バコパ／急性精神疲労→ロディオラの使い分け。',
  },
  'lions-mane-vs-citicoline': {
    title: 'ライオンズメイン vs シチコリン｜NGF誘導×膜リン脂質合成の使い分けを論文で比較',
    description: 'ライオンズメイン（ヤマブシタケ500-3,000mg/日・ヘリセノン/エリナシン規格）とシチコリン（500-2,000mg/日・Cognizin®規格）を論文で比較。\n\nライオンズメインはNGF（神経成長因子）誘導で神経再生・髄鞘形成・MCI改善（Mori 2009 Phytother Res RCT n=30で12週で認知機能スコア改善・Saitsu 2019で気分改善）。シチコリンはコリン+シチジン分解→アセチルコリン合成+膜リン脂質合成（Silveri 2008 RCTで前頭葉リン脂質代謝指標改善・Fioravanti 2005 Cochrane）。\n\nMCI・気分・神経再生→ライオンズメイン／持続的認知機能・脳血管障害後→シチコリンの使い分け、併用OKで補完スタック。',
  },
  'phosphatidylserine-vs-citicoline': {
    title: 'ホスファチジルセリン vs シチコリン｜神経膜PS×膜リン脂質合成の使い分けを論文で比較',
    description: 'ホスファチジルセリン（100-300mg/日・大豆由来Sharp-PS®/Lipogen規格）とシチコリン（500-2,000mg/日・Cognizin®）を論文で比較。\n\nホスファチジルセリンは神経細胞膜リン脂質の主成分で記憶・ストレス・コルチゾール調整（Vakhapova 2010 Dement Geriatr Cogn Disord RCT n=72で15週で記憶改善・Hellhammer 2004で運動後コルチゾール抑制）。シチコリンはアセチルコリン合成+膜リン脂質合成（Silveri 2008・Fioravanti 2005 Cochrane）。\n\nストレス・コルチゾール・夜間使用→PS／持続的認知機能・脳血管障害後→シチコリンの使い分け、併用OKで膜リン脂質合成の二段スタック。',
  },
  'dhea-vs-pregnenolone': {
    title: 'DHEA vs プレグネノロン｜ホルモン前駆体の違い・YMYL注意点を論文で比較',
    description: 'DHEA（25-50mg/日・副腎由来C19ステロイドホルモン前駆体）とプレグネノロン（10-30mg/日・コレステロール由来全ステロイドホルモン前駆体）を論文で比較。\n\nDHEAはアンドロステンジオン経由でテストステロン・エストロゲン両方向に変換（Baulieu 2000 PNAS DHEAge試験n=280で骨密度・肌・性機能改善・Arlt 1999 NEJM副腎不全RCT）。プレグネノロンは「マザーステロイド」でDHEA+コルチゾール+プロゲステロン全方向への前駆体（Vallée 2018 Front Endocrinol reviewで認知・気分関連）。\n\n両者ともホルモン依存性疾患・前立腺癌・乳癌・PCOS既往は禁忌寄りで内分泌内科判断下、自己判断使用は推奨されない領域です。',
  },
  'holy-basil-vs-ashwagandha': {
    title: 'ホーリーバジル vs アシュワガンダ｜アダプトゲン2強の使い分けを論文で比較',
    description: 'ホーリーバジル（トゥルシー・Ocimum tenuiflorum・300-600mg/日）とアシュワガンダ（KSM-66/Sensoril 300-600mg/日）を論文で比較。\n\nホーリーバジルはアーユルヴェーダの「不老ハーブ」でストレス・血糖・抗酸化に作用（Saxena 2012 Evid Based Complement Alternat Med RCT 1,200mg/日×6週でストレススコア改善・Cohen 2014 J Ayurveda Integr Medレビュー）。アシュワガンダはHPA軸調整経由でコルチゾール低下・睡眠の質改善・テストステロン関連（Salve 2019 Cureus RCT 600mg/日×8週でコルチゾール有意低下・Lopresti 2019）。\n\n抗炎症・血糖・抗酸化→ホーリーバジル／コルチゾール・睡眠・テストステロン→アシュワガンダの使い分け、両者経路独立で併用OK。',
  },
  'mucuna-pruriens-vs-tongkat-ali': {
    title: 'ムクナ vs トンカットアリ｜L-DOPA×SHBG低下の使い分けを論文で比較',
    description: 'ムクナプルリエンス（Mucuna pruriens・100-400mg/日・L-DOPA 15-30%標準化）とトンカットアリ（Eurycoma longifolia・200-400mg/日・Physta®/LJ100®規格）を論文で比較。\n\nムクナは天然L-DOPA含有でドパミン前駆体・パーキンソン病補助・性機能・気分・男性ホルモン関連（HCS Lab 2004 Phytother Res男性不妊RCTでテストステロン+精子質改善・Katzenschlager 2004 J Neurol Neurosurg PsychiatryでPD症状改善）。トンカットアリはSHBG低下→free-T増加（Tambi 2012 RCT n=76でテストステロン正常化・Talbott 2013でコルチゾール改善）。\n\n気分・ドパミン・性機能→ムクナ／free-T・コルチゾール・男性活力→トンカットアリの使い分け、SSRI/MAOI/抗精神病薬併用注意。',
  },
  'saffron-vs-ashwagandha': {
    title: 'サフラン vs アシュワガンダ｜気分セロトニン×ストレスコルチゾールの使い分けを論文で比較',
    description: 'サフラン（28-30mg/日・affron®規格・サフラナール3.5%標準化）とアシュワガンダ（KSM-66 300-600mg/日）を論文で比較。\n\nサフランはクロシン/サフラナール/ピクロクロシンの多経路（セロトニン再取り込み阻害+抗酸化+抗炎症）で気分改善（Lopresti 2014 Hum Psychopharmacolメタ解析でSSRI同等の抑うつ改善・Akhondzadeh 2005 BMC Psychiatry RCT 30mg/日×6週）。アシュワガンダはHPA軸調整経由でコルチゾール低下（Salve 2019）。\n\n抑うつ症状・PMS・更年期気分→サフラン／慢性ストレス・コルチゾール・睡眠の質→アシュワガンダの使い分け、SSRI併用注意・心療内科の領域でサプリは補助。',
  },
  'iron-vs-vitamin-b12': {
    title: '鉄 vs ビタミンB12｜貧血の鑑別と補給の使い分けを論文で比較',
    description: '鉄（経口18-60mg/日・グリシン酸キレートFerrochel®/ヘム鉄）とビタミンB12（メチルコバラミン500-1,000μg/日）を論文で比較。\n\n両者は「貧血」で混同されがちですが原因が異なります。鉄欠乏性貧血（IDA）は小球性低色素性（MCV<80・Hb低下）で月経過多/消化管出血/吸収不良由来（Camaschella 2015 NEJM review）。B12欠乏は巨赤芽球性貧血（MCV>100・神経症状併発）で胃切除/PPI長期/メトホルミン長期/ヴィーガン由来（Stabler 2013 NEJM review）。\n\nCBC+MCV+フェリチン+血清B12+MMAで鑑別必須、サプリ前検査が王道、効果が出るまでを解説。',
  },
  'nicotinamide-riboside-vs-resveratrol': {
    title: 'ニコチンアミドリボシド vs レスベラトロール｜NAD+補充×SIRT1活性化の使い分けを論文で比較',
    description: 'ニコチンアミドリボシド（NR・300-600mg/日・Tru Niagen®・ChromaDex社特許）とレスベラトロール（trans型100-500mg/日）を論文で比較。\n\nNRはNAD+前駆体で経口吸収・血中NAD+上昇のヒトRCTが多い（Conze 2019 Sci Rep RCT n=140で8週で血中NAD+用量依存的上昇・Martens 2018 Nat Commun RCTで収縮期血圧低下）。レスベラトロールはSIRT1活性化のカロリー制限模倣（Howitz 2003 Nature酵母/線虫/ハエ寿命延長・Tomé-Carneiro 2013メタでヒト寿命延長未確立）。\n\nNAD+補充→NR（コスパ良・¥3,500/月）／SIRT1経路・抗酸化→レスベラトロールの使い分け。',
  },
  'hesperidin-vs-quercetin': {
    title: 'ヘスペリジン vs ケルセチン｜柑橘フラボノイド×senolyticsの使い分けを論文で比較',
    description: 'ヘスペリジン（500-1,000mg/日・柑橘類由来フラバノン）とケルセチン（500-1,000mg/日・タマネギ/りんご由来フラボノール）を論文で比較。\n\nヘスペリジンは血管内皮機能・微小循環・冷え対策（Morand 2011 Am J Clin Nutr RCT n=24でメタボ患者の血管内皮機能改善・Salden 2016 Am J Clin Nutr血圧改善）。ケルセチンはsenolytics（Zhu 2015 D+Qカクテル）+抗ヒスタミン（Mlcek 2016）+抗酸化の多面性。\n\n血管・微小循環・冷え・むくみ→ヘスペリジン／senolytics+抗アレルギー+抗酸化→ケルセチンの使い分け、糖転移ヘスペリジンαGヘスペリジンで吸収率向上を解説。',
  },
  'omega3-vs-coq10': {
    title: 'オメガ3 vs CoQ10｜膜流動性×ATP産生の使い分けを論文で比較',
    description: 'オメガ3（EPA+DHA 1-2g/日・rTG形態）とCoQ10（100-300mg/日・ユビキノール推奨）を論文で比較。\n\nオメガ3は細胞膜流動性・抗炎症・心血管予防（REDUCE-IT 2019 NEJM RCT n=8,179 EPA高純度4g/日で心血管25%減・Mozaffarian 2011 Circ heart failure メタ）。CoQ10はミトコンドリア電子伝達系の電子運搬体でATP産生・抗酸化（Mortensen 2014 Q-SYMBIO RCT n=420で慢性心不全イベント減・Caso 2007でスタチン誘発筋痛軽減）。\n\n心血管・脳・抗炎症→オメガ3／心不全・スタチン服用・40代以降のATP低下→CoQ10の使い分け、併用OKで王道の心臓ケアスタック。',
  },
  'probiotics-vs-l-rhamnosus-gg': {
    title: 'マルチ株プロバイオティクス vs LGG単独株｜株名の重要性を論文で比較',
    description: 'マルチ株プロバイオティクス製品（複数株配合10-100億CFU）とL. rhamnosus GG単独株（ATCC 53103・Culturelle®・10-20億CFU/日）を論文で比較。\n\nプロバイオティクスは「株単位」で論文蓄積を評価する原則（McFarland 2015 Front Med）。LGG単独株は小児急性下痢・抗生剤関連下痢の最強エビデンス（Hojsak 2010 Cochrane review・WHO/ESPGHANガイドライン推奨）。マルチ株は腸内多様性育成の理論的優位だがエビデンスは株固有のものをまとめて評価できない問題。\n\n特定疾患（小児下痢/IBS/AAD）→株指定品（LGG/S. boulardii等）／日常的腸内多様性→マルチ株の使い分けを解説。',
  },
  'akkermansia-vs-s-boulardii': {
    title: 'アッカーマンシア vs S. boulardii｜次世代プロバイオ×酵母系の使い分けを論文で比較',
    description: 'Akkermansia muciniphila（パスツール化死菌1×10^10/日・MucinHealth等）とSaccharomyces boulardii（CNCM I-745株・500mg/日・Florastor®）を論文で比較。\n\nAkkermansiaはメタボ・耐糖能・腸バリアでヒトRCTが進展（Depommier 2019 Nat Med RCT n=32で肥満インスリン抵抗性改善）、次世代プロバイオ標的菌。S. boulardiiは酵母系で抗生剤の影響を受けない独自利点、AAD/CDI予防（McFarland 2010メタ・Szajewska 2015 CDI再発リスク減）。\n\nメタボ・腸バリア・代謝→Akkermansia／抗生剤併用・CDI予防→S. boulardiiの使い分け、両者経路独立で併用OK、日本市場でのAkkermansia入手限定を解説。',
  },
  'butyrate-vs-akkermansia': {
    title: '酪酸 vs アッカーマンシア｜SCFAs供給×粘液層常在菌の使い分けを論文で比較',
    description: '酪酸（経口500-1,500mg/日・腸溶コーティング製剤）とAkkermansia muciniphila（パスツール化死菌1×10^10/日）を論文で比較。\n\n酪酸は短鎖脂肪酸の代表で大腸上皮細胞主要エネルギー源・抗炎症（HDAC阻害経由）・腸バリア強化（Canani 2011 World J Gastroenterol review）。Akkermansiaは粘液層常在菌でメタボ・耐糖能・腸バリア（Depommier 2019 Nat Med RCT）、相互関係としてAkkermansia自身も酪酸産生に寄与する菌叢循環あり。\n\n即時SCFAs供給→酪酸（腸溶製剤）／菌叢の核を直接補充→Akkermansiaの使い分け、両者+食物繊維25g/日+発酵食品が王道スタック。',
  },
}

/**
 * ペア固有の追加FAQ。
 * page.tsx の自動生成FAQ（成分名から組み立てる4問）の前に挿入される。
 * 「カルニチン クレアチン 違い」「効果が出るまで」など、ペア固有の高需要KWを
 * Q&A 形式で取りに行くロングテール捕獲機構。
 */
export const PAIR_CUSTOM_FAQS: Record<string, { q: string; a: string }[]> = {
  'glutathione-vs-niacinamide': [
    {
      q: 'グルタチオンとナイアシンアミドの違いは？',
      a: '前提から異なります。グルタチオン（GSH）は 経口サプリ・点滴 で体内に取り入れる成分（500mg/日が論文上の目安）、ナイアシンアミドは 外用化粧水・美容液 に配合される成分（標準濃度5%）です。グルタチオンは細胞内最大の抗酸化物質でメラニン産生抑制への作用が報告されており、ナイアシンアミドは表皮で メラノソーム（メラニンを運ぶ袋）の表皮細胞への移送を抑制します。同じ「美白」ですが、作用部位（経口体内 vs 外用表皮）と作用機序が異なるため、競合関係ではなく補完関係です。',
    },
    {
      q: '美白効果はどっちが論文で強い？',
      a: 'エビデンス強度ではナイアシンアミド外用が上回ります。ナイアシンアミド5%外用は 複数のRCT・メタ解析 で色素沈着改善が確認され、化粧品メーカー定番成分として実証研究が豊富です（Bissett 2005 RCTで8週で色素沈着改善）。経口グルタチオンは Arjinpathana 2012 で500mg/日4週で皮膚明るさ改善が報告されたものの、効果は穏やかで、Sonthalia 2018 reviewでは「経口吸収率の低さ」が指摘されています。「論文の厚み × 効果の強さ」で見ると、まずナイアシンアミド外用5%が現実的な選択です。',
    },
    {
      q: '「飲む美白」グルタチオン経口は本当に効く？吸収率は？',
      a: '効果はあるが穏やかです。経口グルタチオンは消化管でアミノ酸（グルタミン酸・システイン・グリシン）に分解される割合が高く、血中グルタチオン上昇は限定的とする報告が複数あります（Sonthalia 2018 review）。一方で Arjinpathana 2012 のRCTでは500mg/日4週で皮膚明るさが有意改善と報告されており、「全く効かない」わけではありません。SNS・広告の「飲むだけで真っ白」は誇大表現で、論文ベースでは「外用との併用で穏やかな補助」として位置付けるのが現実的です。',
    },
    {
      q: 'グルタチオン点滴と経口で効果は違う？',
      a: '別物として扱う必要があります。\n\nグルタチオン点滴は医療機関で行う注射（血中濃度を一気に上げる）で、自己購入はできません。一方経口グルタチオンは消化管を経るため血中濃度上昇は穏やかで、効果も限定的です。点滴の効果を経口に外挿するのは論文ベースで誤りで、「点滴で白くなった人がいる」=「経口でも同じ効果」ではありません。経口で妥当な範囲で効果を狙うなら、ナイアシンアミド5%外用との併用がコスパ良い選択です。',
    },
    {
      q: '結局、コスパで選ぶならどっちから？',
      a: '論文ベースのコスパ優位は ナイアシンアミド外用5% が圧倒的です。月コスト¥2,000-5,000で、エビデンスS（複数のメタ解析）、化粧品メーカーの定番として実証研究も豊富。グルタチオン経口は月¥3,000-8,000とコストがやや高く、効果は穏やか。\n\n初心者：ナイアシンアミド5%単独 → 4-8週評価後にグルタチオン経口を追加検討 が論文整合な順序です。両方併用しても作用機序が異なるため安全で、「飲む × 塗る」のスタックで穏やかな補助効果を狙うことは可能です。',
    },
  ],
  'arbutin-vs-azelaic-acid': [
    {
      q: 'α-アルブチンとアゼライン酸は併用できる？順番は？',
      a: '併用OK・経路が一部重なるが補完関係です。α-アルブチンは チロシナーゼ阻害で「メラニン産生を抑える」、アゼライン酸は チロシナーゼ阻害＋抗炎症＋抗菌で「メラニン抑制＋赤み・ニキビにも作用」と幅が広い成分です。同じターゲットを別経路で攻めるため重ね塗りも論文上問題ありませんが、刺激リスクを分離するため 朝にα-アルブチン2%・夜にアゼライン酸10% の朝晩使い分けが推奨スタックです。同時塗布する場合はα-アルブチン → 数分待ってアゼライン酸の順序を守ってください。',
    },
    {
      q: '朝と夜、どっちにどれを使う？',
      a: '推奨パターン：朝＝化粧水→α-アルブチン2%→保湿→日焼け止め、夜＝化粧水→アゼライン酸10%→保湿。理由は、①α-アルブチンは刺激ほぼなしで朝でも安全（日焼け止め下に重ねやすい）、②アゼライン酸は軽度の刺激・赤みリスクがあるため夜のターンオーバー時に使うのが無難、③朝晩で分けると刺激の蓄積を回避できる、の3点です。敏感肌の方は最初の2-4週はα-アルブチン単独から始め、肌が慣れてからアゼライン酸を夜に追加してください。',
    },
    {
      q: '濃度の選び方（α-アルブチン 2%・アゼライン酸 10-20%）は？',
      a: 'α-アルブチンは 2% が標準濃度で、これ以上の濃度は化粧品では一般的でなく、論文RCTも2%が中心です（Hamed 2020）。アゼライン酸は 10-15%が市販品の標準・20%は処方箋ベースで、軽度〜中度の色素沈着・ニキビ対策には10-15%で十分なエビデンスがあります（Searle 2020 メタ解析）。20%は皮膚科処方が必要なケースが多く、自己購入よりも医師相談が安全です。「濃度を上げれば早く効く」ではなく、継続できる刺激レベルで続けるのが論文上の正解です。',
    },
    {
      q: 'α-アルブチンとアゼライン酸、効果が出るまでどれくらい？',
      a: 'メラニン代謝サイクル（28〜56日）を考えると、肌の見た目変化には最低4-12週が必要です。\n\nα-アルブチン2%は8-12週で色素沈着の有意差（Hamed 2020 RCTで12週評価）。\n\nアゼライン酸10-15%は4-12週で色素沈着・ニキビ改善（Searle 2020 メタ解析）です。「1週間使って効かないからやめる」は論文上の最大の失敗パターン。両者とも継続性が最も重要で。\n\n最低3ヶ月続けてから効果を判定するのが現実的です。途中で肌荒れがあれば一時休止して再開も OK です。',
    },
    {
      q: '肌タイプ別の最適スタックは？',
      a: '①敏感肌・初心者：α-アルブチン2% 単独で4-8週評価。問題なければ夜にアゼライン酸10%を追加。②普通肌・色素沈着重視：朝α-アルブチン2% + 夜アゼライン酸10-15% がデフォルトスタック。③ニキビ＋色素沈着：アゼライン酸15% を主役にして、α-アルブチンは朝の補助に。④強い肝斑：皮膚科でアゼライン酸20%処方 + 保険適用のトラネキサム酸内服を併せた治療がエビデンス上強い選択です。月コストは①¥2,000-4,000・②¥5,000-10,000・③¥3,000-6,000・④医師相談範囲です。',
    },
  ],
  'l-citrulline-vs-creatine': [
    {
      q: 'L-シトルリンとクレアチンの違いは？',
      a: '作用メカニズムも、効果が出るまでの時間も全く異なります。L-シトルリン（運動前6〜8g）は体内でアルギニン → 一酸化窒素（NO）に変換され、血流増加・パンプ感・乳酸クリアランスを 当日〜数日で 起こします（Bailey 2010 で6g摂取後30-60分でNO増加確認）。クレアチン（3〜5g/日）はATP再合成を助けて筋力・パワー・除脂肪体重を 3〜4週間継続摂取で 向上させます（Kreider 2017 メタ解析）。「即効・トレーニング当日効果」ならシトルリン、「累積・中長期の筋力アップ」ならクレアチンが論文上の使い分けです。',
    },
    {
      q: 'L-シトルリンとクレアチン、効果が出るまでの差は？',
      a: 'シトルリンは即効、クレアチンは累積です。シトルリンは経口摂取後 30〜60分で血漿アルギニン濃度が上昇し、運動中のパンプ感・血流増加・疲労遅延として実感できます（単回投与でも効果報告あり）。クレアチンは筋肉内クレアチン濃度が飽和するまで時間がかかり、通常摂取（3〜5g/日）で 3〜4週間、ローディング（20g/日 × 5〜7日）で1週間以内に効果が出始めます。「双曲割引（即時報酬を過大評価しがち）」で長期的にはクレアチンの投資効率が高い点を意識すると選びやすくなります。',
    },
    {
      q: 'L-シトルリンとクレアチンは併用できる？',
      a: '併用OK・むしろ多くの上級者で標準スタックです。シトルリンは血流（NO経路）、クレアチンはエネルギー（ATP経路）と作用ステップが完全に独立しており、相互の効果を阻害しません。実際の運動パフォーマンスRCTでも両者併用群で副作用増加や効果減弱の報告はほぼありません。月コストも合わせて¥3,000-6,000程度で、運動目的なら併用が論文上で合理的です。',
    },
    {
      q: 'L-シトルリンのフリー型とマレート型、どっちを選ぶ？',
      a: '目的別の即決：①パンプ感・血流目的なら L-シトルリン フリー型（純粋なシトルリンで吸収率が高い）、②疲労回復・乳酸クリアランス目的なら シトルリン マレート（リンゴ酸塩・TCAサイクル中間体としてエネルギー代謝もサポート）。多くのRCTでは両形態とも有効性が示されており、コスパで選ぶならマレートがやや安価な傾向です。「フリー型6g」または「マレート8g」が目安用量です。',
    },
    {
      q: '結局、運動初心者・上級者どっちから始めるべき？',
      a: '初心者は クレアチン3〜5g/日 単独から始めるのが論文上の推奨です。クレアチンはエビデンス階層S（複数のメタ解析）・コスパ良・副作用ほぼなしで、長期的な筋力・体組成・認知機能への効果が確立しています。3〜4週間の継続で効果実感後、上級者として更にパフォーマンスを上げたい場合に シトルリン6〜8g（運動前30-60分）を追加 する順序が効率的です。即パンプ感を求める短期目的（試合・撮影前）であればシトルリン単独もアリです。',
    },
    {
      q: 'L-シトルリンとクレアチンモノハイドレート vs シトルリンマレートの違いは？運動目的別の使い分けは？',
      a: '形態と運動目的の組み合わせで整理します。\n\nクレアチンモノハイドレートは研究実績100以上のRCTがある第一選択で、3〜5g/日継続。HCl・エチルエステル等の新形態に対する優位性は確立していません（J Strength Cond Res 2020 メタ解析 n=22,000）。\n\nシトルリンの形態は2種類で、①フリー型L-シトルリン（純シトルリン6〜8g/日・パンプ感・NO産生中心の研究使用例が多い）、②シトルリンマレート（リンゴ酸塩・8g/日・乳酸クリアランス・疲労遅延文脈で使われやすい・TCAサイクル中間体としてエネルギー代謝補助）。運動目的別の使い分けは3点。A 筋肥大・1RM向上：クレアチンモノハイドレート3〜5g/日が主役・必要に応じてフリー型シトルリン6gをトレ前追加。B 持久系（5〜30分強度）・パンプ感：フリー型シトルリン6〜8g運動前30〜60分・クレアチンは補助的に併用OK。C 高強度反復・回復重視：シトルリンマレート8g＋クレアチン3〜5gが論文上で合理的。両者は併用OK（経路独立・NO×ATP）、月コストはクレアチン¥420〜700／シトルリン¥1,500〜3,000で合計¥2,000〜4,000の範囲。「迷ったらクレアチン単独で4週評価→シトルリン追加」の順序が認知負荷低減の観点で現実的です。',
    },
    {
      q: 'クレアチンとシトルリン、副作用と注意点の違いは？どんな人は避けるべき？',
      a: '副作用プロファイルが異なります。\n\nクレアチンは健常成人で重篤副作用報告は限定的（ISSN 2017ポジションスタンド）で、主な注意点は3点。①初期2〜4週の水分貯留による体重1〜2kg増加（脂肪ではなく筋細胞内水分）、②高用量ローディング期の消化器症状（下痢・腹部膨満感）、③腎機能低下例（CKDステージ3以上）は医師相談前提・血清クレアチニン値が10〜30%上昇するため血液検査時に申告必須。\n\nL-シトルリンは健常成人で副作用報告は少なく、主な注意点は4点。①勃起不全治療薬（PDE5阻害薬・シルデナフィル/タダラフィル等）との併用は降圧効果増強の理論的リスク・絶対回避。②高血圧治療薬（降圧薬・特にACE阻害薬・ARB）併用は低血圧リスクの理論懸念で医師相談、③Citrullinemia（シトルリン血症）など尿素回路代謝異常症は禁忌、④妊娠・授乳中はデータ不足のため自己判断回避。両成分共通で、心血管疾患既往・腎疾患既往・複数処方薬服用中の方は事前に医師・薬剤師に相談してください。',
    },
  ],
  'nmn-vs-coq10': [
    {
      q: 'NMNとコエンザイムQ10の違いは？',
      a: '作用層が完全に異なります。NMN（ニコチンアミドモノヌクレオチド）は NAD+ の前駆体で、サーチュイン酵素の活性化・細胞代謝・DNA修復に関与します（Yoshino 2021 RCTで250mg/日10週で血中NAD+上昇確認）。CoQ10（コエンザイムQ10）はミトコンドリア電子伝達系の電子運搬体で、ATP産生・抗酸化に必須です。NMN は「NAD+ を増やす」、CoQ10 は「ミトコンドリアでエネルギーを作る」と覚えると整理しやすく、両者は別レイヤーで作用するため補完関係です。',
    },
    {
      q: 'NMNとCoQ10、どちらから始めるべき？',
      a: '論文ベースの優先順位は年齢で変わります。\n\n30代前半まではCoQ10から始める方が合理的です：エビデンスが豊富（メタ解析多数）、月コスト¥1,000-3,000、心臓・運動・抗酸化への効果が確立。\n\n30代後半-40代以降は NAD+ が顕著に低下するため（Massudi 2012 で30代以降に組織NAD+の有意低下を報告）、CoQ10にNMNを追加する戦略が王道です。NMN単独より、まず基盤としてCoQ10、必要に応じてNMN追加が現実的です。',
    },
    {
      q: 'NMNとコエンザイムQ10は併用できる？効果は加算される？',
      a: '併用OK・作用機序が異なるため理論上補完関係です。NMN は NAD+ を増やしてサーチュイン活性化、CoQ10 はミトコンドリア電子伝達でATP産生を支えるため、別々のステップで老化対策に貢献します。実際のRCTで併用群と単独群を比較した研究は限定的ですが、副作用報告は両者を併用しても増えないため、安全性は高いと考えられます。月コスト¥7,000-15,000の負担を許容できるなら併用が現実的です。',
    },
    {
      q: '価格が10倍違う（NMN ¥6-12k vs CoQ10 ¥1-3k）コスパで選ぶなら？',
      a: '純粋なコスパなら CoQ10 が圧倒的です。エビデンスは豊富（複数のメタ解析でうっ血性心不全・スタチン誘発筋痛・偏頭痛への効果）、月コスト¥1,000-3,000、ヒトRCT多数。NMN はヒトRCTが2020年以降に蓄積中（10件強）で、血中NAD+上昇は確認されているものの、寿命延長や疾患予防の長期アウトカムは継続研究中です。「論文の厚み × コスト」で見ると、まず CoQ10、余裕があれば NMN追加 が論文整合な順序です。',
    },
    {
      q: 'NMNを飲むなら何歳から？効果が出るまでは？',
      a: '推奨開始年齢は30代後半-40代以降が論文上の目安です。NAD+ は20代で最高値、30代から低下開始、50代で20代の半分前後まで下がる縦断研究が報告されています（Massudi 2012）。効果の指標として血中NAD+上昇は8-12週で確認可能（Yoshino 2021 RCTでは10週で評価）。ただし「老けて見えなくなる」「疲労感が減る」等の体感的効果は個人差が大きく、臨床アウトカムの統一見解はまだ確立していません。8-12週で体感ゼロなら撤退判断も合理的です。',
    },
    {
      q: 'CoQ10のユビキノール（還元型）とユビキノン（酸化型）、NMNと組み合わせるならどちらが無難？',
      a: '40代以降の併用ならユビキノール（還元型）を選ぶのが論文上で合理的です。\n\n理由：①年齢と変換能力＝López-Lluch 2019 Nutrition等で40代以降は体内のユビキノン→ユビキノール変換能力が低下するため、直接ユビキノールを補給する方が効率的。NMNは30代後半-40代以降のNAD+低下対策（Massudi 2012）に対する補充で、両者とも40代以降の老化対策フォーカスでは併用相性が良い。②吸収率＝Evans 2009 J Funct Foodsでユビキノールはユビキノンより約3〜4倍吸収率が高い報告。空腹時より食後（油を含む食事）でさらに吸収率が上がる脂溶性サプリのため、朝食または夕食時の摂取が現実的。③Kaneka QH原料の信頼性＝Jarrow Formulas Ubiquinol QH-Absorb 200mg・Doctor\'s Best Ubiquinol with Kaneka QH等の主要ブランドが採用する日本鐘淵化学（カネカ）の原料は、ユビキノール市場で世界最大シェアで品質トレーサビリティが高い。\n\n論文ベースの組み合わせ即決：①30代前半まで＝CoQ10ユビキノン100mg/日（NOW Foods/Doctor\'s Best 月¥1,000-1,500）+ NMN追加は任意。②30代後半-40代＝ユビキノール100mg/日（Healthy Origins/Kaneka QH 月¥2,500）+ NMN 250-500mg/日（Tru Niagen NR or Doctor\'s Best NMN）。③50代以降＝ユビキノール200mg/日（Jarrow QH-Absorb 月¥3,200）+ NMN 500-1,000mg/日。④スタチン併用中＝ユビキノール100-200mg/日が王道（Rundek 2004 Arch Neurol RCTで30日で血中CoQ10濃度約40%低下）。NMNと併用の月コストは¥4,000-¥15,000で年齢層・予算で調整。\n\n注意＝ワルファリン服用中はCoQ10がビタミンK類似構造のためINR変動報告あり医師相談、降圧薬服用中は軽度血圧低下相乗のため血圧モニタリング、抗がん剤治療中はNMN・CoQ10とも医師相談前提です。',
    },
    {
      q: 'NMNとCoQ10、副作用と長期安全性はどっちが信頼できますか？',
      a: '長期安全性のエビデンス蓄積はCoQ10が圧倒的に厚いのが論文上の現状です。\n\n①CoQ10の長期安全性：1980年代から臨床使用され、Mortensen 2014 Q-SYMBIO試験（JACC Heart Failure n=420・100mg×3回/日×2年）で長期安全性確認、Singh 2003 Mol Cell Biochem等で3,000mg/日までの短期摂取でも重篤な副作用報告なし。NIH ODSのFact Sheetでも「ヒトでの一般的な摂取量での重篤な副作用報告は稀」と整理。\n\n主な副作用は消化器症状（嘔気・上腹部不快感・5%未満）・頭痛（まれ）・不眠（高用量・寝る前摂取時）で軽症が中心。\n\n併用注意＝ワルファリン（INR変動・PubMed症例報告）・降圧薬（血圧低下相乗）が主要。\n\n②NMNの長期安全性：ヒトRCTは2020年以降に蓄積が始まったばかりで、Yoshino 2021 Science RCT（n=25・250mg/日×10週）・Liao 2021 Nutr Metab（n=14・300mg/日×6週）・Huang 2022 Front Aging（n=80・300mg/日×60日）等で短期安全性は確認されていますが、6ヶ月以上の長期RCTは限定的で、抗がん剤治療中・がん既往例での「NAD+上昇ががん細胞増殖を促進する理論的懸念」（Brachmann 1995 Mol Cell Biol・Yaku 2018 Aging Dis）は明確に解消されていません。FDAは2022年にNMNを「ニュー・ダイエタリー・イングリディエント未承認」として食品サプリ表示から除外する動きを示し、規制環境が不安定。\n\n主な副作用報告は軽度の悪心・頭痛・倦怠感（プラセボ群と有意差なしの報告が多い）。\n\n禁忌寄り＝がん治療中・がん既往（医師相談必須）、妊娠中・授乳中（データ不足）。\n\n③論文ベースの選び方：①「論文の厚み × 長期安全性 × コスト」のバランス＝CoQ10が圧倒的優位。②「血中NAD+を上げる」明確な機序を持つサプリを試したい＝NMN・ただし臨床アウトカム改善は研究中。③最も妥当な開始順序＝20代＝サプリより運動・食事・睡眠、30代＝CoQ10 100mg/日（コスパ重視）、40代以降＝CoQ10ユビキノール100mg/日＋必要に応じてNMN追加、50代以降＝両者併用検討（がん既往なし前提）。「NMN > CoQ10」「CoQ10は古い」のマーケティング表現は論文ベースで根拠薄く。\n\nエビデンスの厚みではCoQ10が現時点の最適解です。',
    },
  ],
  'creatine-vs-magnesium': [
    {
      q: 'クレアチンとマグネシウム、両方飲むメリットは？',
      a: '生化学的に補完関係です。クレアチンは ATP 再合成で筋力・パワーを向上させますが、ATPは細胞内で必ずマグネシウム（Mg²⁺）と複合体（Mg-ATP）を形成して初めて酵素に使われます。つまりマグネシウムが不足するとクレアチンの効果が完結しない可能性が理論的にあります。実証RCTは限定的ですが、運動・筋トレを行う人は両方とも欠乏しやすい栄養素として併用が論文上で合理的です。',
    },
    {
      q: 'クレアチンとマグネシウム、飲むタイミングと順番は？',
      a: '推奨パターン：朝・トレーニング前後どちらかに クレアチン 3〜5g（食事や糖質と一緒で吸収率向上）、夕食後または就寝1時間前に マグネシウム 300〜400mg（リラックスと睡眠の質向上）。両者を同時刻に飲んでも吸収競合はほぼありませんが、マグネシウムは睡眠改善のRCTがあるため夜配置が機能的です。順番は厳密でなく、続けやすさ優先で OK です。',
    },
    {
      q: 'マグネシウムの形態（グリシネート/クエン酸/酸化）どれをクレアチンと組み合わせる？',
      a: '目的別の即決：①睡眠・回復重視ならグリシネート（吸収率高・胃にやさしい・夜推奨）、②吸収率と便通バランスならクエン酸、③便秘解消メインなら酸化（ただし吸収率は低）。クレアチンと組み合わせる場合、運動回復を狙うならグリシネート、コスパ重視ならクエン酸が無難です。酸化マグネシウムは便通目的以外には推奨されません。',
    },
    {
      q: 'クレアチン使用中にマグネシウム不足だと効果が落ちる？',
      a: '理論上は影響しうる、というのが現状の論文評価です。ATP-Mg 複合体が酵素活性に必要なため、重度のマグネシウム欠乏では筋力・代謝の効率低下が想定されます。ただし「クレアチン使用者に対するマグネシウム補充で筋力が更に伸びた」を直接示すRCTは限定的です。日本人は軽度〜中度のマグネシウム不足（推奨量充足率 約70%）が報告されているため、クレアチン併用時のマグネシウム摂取は予防的に推奨されます。',
    },
    {
      q: '結局、最低限のクレアチン×マグネシウム スタックは？',
      a: '最低限スタック：朝食時に クレアチン モノハイドレート 3〜5g（コーヒー・水・プロテインに溶解可）、就寝1時間前に マグネシウム グリシネート 300〜400mg。これだけで筋力・パワー（クレアチン）と睡眠・筋弛緩・回復（マグネシウム）の3軸をカバーできます。月コスト目安はクレアチン¥1,500-3,000、マグネシウム¥1,500-3,000、合計¥3,000-6,000。両方とも継続性が最重要なので、習慣化しやすい時間帯を優先してください。',
    },
  ],
  'niacinamide-vs-collagen-peptide': [
    {
      q: 'ナイアシンアミドとコラーゲンペプチドの違いは？',
      a: '前提から異なります。ナイアシンアミドは外用（化粧水・美容液・5%が標準濃度）で表皮バリア・色素沈着・毛穴・小じわの4方面に作用、コラーゲンペプチドは経口（サプリ・粉末2.5〜10g/日）で腸管から吸収されて真皮の弾力・水分保持に作用します。同じ「肌に効く」ですが、ナイアシンアミドは表皮、コラーゲンペプチドは真皮と作用層が完全に分かれており、競合関係ではなく補完関係です。',
    },
    {
      q: 'ナイアシンアミドとコラーゲンペプチド、どっちを優先すべき？両方使うべき？',
      a: '両方使うのが論文上の正解です。表皮の問題（くすみ・毛穴・色素沈着）が気になるならナイアシンアミド外用5%を優先、真皮の問題（弾力低下・小じわ・乾燥）が気になるならコラーゲンペプチド経口5g/日を優先。30代以降は両方の問題が同時進行するため、片方だけでは取りこぼしが出ます。「外用＋経口」の組み合わせで、表皮〜真皮を両層カバーするのが最も論文整合な選択です。',
    },
    {
      q: 'ナイアシンアミド外用とコラーゲンペプチド経口、効果が出るまでは？',
      a: 'ナイアシンアミド外用5%は4〜12週でバリア機能・色素沈着改善が報告されています（Bissett 2005の8週RCT）。コラーゲンペプチド経口は8〜24週で皮膚弾力の有意改善が報告されています（Proksch 2014で5g×12週で弾力28%改善）。外用は短期、経口は中期で違いが出るため、両方を同時に始めると変化を実感しやすくなります。',
    },
    {
      q: '朝晩のスキンケアとサプリ、どう組み合わせる？',
      a: '一例として、朝＝ナイアシンアミド配合化粧水（5%）→ 朝食時にコラーゲンペプチド5g（コーヒー・水に溶解可）、夜＝ナイアシンアミド美容液で再度外用、というルーティンが組みやすいパターンです。ナイアシンアミドは朝晩いずれもOK・コラーゲンペプチドは食事と一緒が吸収面で推奨されます。月コストは外用¥2,000-5,000＋経口¥3,000-8,000の合計¥5,000-13,000程度です。',
    },
    {
      q: '30代から始めるならどっちから？',
      a: '30代前半なら「外用ナイアシンアミドを先・経口コラーゲンペプチドを少し遅らせて追加」が論文上の優先順位です。20代後半から表皮の色素沈着・くすみが顕在化しやすい一方、真皮の弾力低下は30代後半から自覚されることが多いため、症状の出やすい順に対応するのが効率的です。30代後半以降は両方を同時開始することを推奨します。',
    },
    {
      q: '「ペプチド」と「ナイアシンアミド」では結局どちらが効果ありますか？外用ペプチド（マトリキシル・銅ペプチド・Argireline）の話も含めて教えてください',
      a: '「ペプチド」と一括りにすると論文ベースの判断を誤ります。\n\n経口コラーゲンペプチド（2.5〜10g/日）はProksch 2014 RCTで皮膚弾力28%改善（n=69・8週）と論文の厚みがあり、真皮の弾力アプローチでは現時点で最強です。\n\n外用シグナルペプチドはパルミトイルペンタペプチド-4（マトリキシル）・パルミトイルトリペプチド・銅ペプチド（GHK-Cu）・アセチルヘキサペプチド-8（Argireline）等の多様な分子群があり、コラーゲン産生シグナル経路（マトリキシル/銅ペプチド）と神経筋接合阻害経路（Argireline）に分かれます。エビデンス量で言えばナイアシンアミド > 経口コラーゲンペプチド > マトリキシル > 銅ペプチド > Argirelineの順で、ナイアシンアミドが論文の厚みで頭ひとつ抜けています。「迷ったらナイアシンアミド外用5%＋経口コラーゲンペプチド5g/日」が30代から始める実用的な第一選択で、外用シグナルペプチドはエビデンス階層B（emerging）として追加検討する位置付けです。',
    },
    {
      q: 'ペプチド配合美容液とナイアシンアミド美容液、どちらを買うべき？併用は？',
      a: '初心者にはナイアシンアミド美容液（5%）を推奨します。理由は4つ：①エビデンスの厚み（Bissett 2005他複数RCTで色素沈着・小じわ・バリア改善）、②刺激ほぼなしで朝晩OK、③妊娠中も比較的安全（産婦人科医確認推奨）、④月コスト¥2,000-5,000で参入障壁が低い。外用ペプチド美容液（マトリキシル/銅ペプチド配合）はエビデンスは存在するもののナイアシンアミドより層が薄く、製品によって配合濃度・ペプチド種類が大きく異なるため「効果のばらつきが大きい」のが実態です。併用は論文ベースでOKで、朝＝ナイアシンアミド美容液、夜＝ペプチド美容液→保湿クリームの順序で、刺激の少ない補完スタックが組めます。レチノールとの違いは「レチノール＝強い刺激＋強いエビデンス」「ペプチド＝低刺激＋エビデンス中等度」で、レチノールが使えない敏感肌・妊娠中の代替選択肢としてペプチド外用が現実的です。',
    },
    {
      q: '経口コラーゲンペプチドと外用ナイアシンアミド、結局どっちが「飲むだけ・塗るだけで効く」エビデンスが強い？',
      a: '「単独で効く」のエビデンスはどちらも報告されていますが、層の厚みではナイアシンアミド外用が一段上です。\n\nナイアシンアミド外用5%は Bissett 2005 RCT（n=50・8週）で色素沈着・小じわ・バリア機能の有意改善、複数の追試RCTでも再現性が確認されており、エビデンス階層S（独立した複数RCTで効果確立）。\n\n経口コラーゲンペプチドは Proksch 2014 RCT（n=69・8週）で皮膚弾力28%改善、Asserin 2015 RCTで真皮密度改善等が報告されており、エビデンス階層A（複数RCTあり）。両者とも独立成分として効果がRCTで報告されていますが、ナイアシンアミドの方が研究数・再現性で層が厚く「論文ベースで失敗しにくい」第一選択です。ただし作用層が表皮vs真皮で完全分離のため、片方だけでは取りこぼしが出ます。「どちらか片方しか始められないならナイアシンアミド外用、両方始められるなら併用」が現実的な判断です。',
    },
  ],
  'l-carnitine-vs-creatine': [
    {
      q: 'L-カルニチンとクレアチンの違いは？',
      a: '作用ターゲットが完全に異なります。L-カルニチン（500〜2,000mg/日）は脂肪酸をミトコンドリアに運ぶ運搬役として脂質代謝・心臓・運動持久力に関与し、エネルギー源として脂肪を使いやすくします。クレアチン（モノハイドレート3〜5g/日）はATP再合成を助けて筋力・パワー・除脂肪体重を向上させます。「脂肪を燃やしたい・心臓ケア」ならL-カルニチン、「筋トレ・パワー・筋量」ならクレアチンが論文上の使い分けです。',
    },
    {
      q: 'L-カルニチンとアセチル-L-カルニチン（ALC）の違いは？',
      a: '別物として扱う必要があります。L-カルニチンは主に脂質代謝・運動・心臓への作用、アセチル-L-カルニチン（ALC）はアセチル基が付加されているため血液脳関門を通過しやすく、認知・神経・気分への作用が報告されています。「運動・減量・心臓目的」ならL-カルニチン、「脳・認知目的」ならALCが大まかな使い分けです。ALCとクレアチンの比較は別記事（/compare/acetyl-l-carnitine-vs-creatine）を参照してください。',
    },
    {
      q: 'L-カルニチンとクレアチンは併用できる？',
      a: '作用メカニズムが異なるため、併用OKと考えられています。L-カルニチンは脂質代謝、クレアチンはATP再合成で経路が独立しており、相互に競合しません。実際にスポーツサプリメントの多くで両者は併存しています。ただし腎機能に不安がある方、心血管疾患の既往がある方は事前に医師相談を推奨します。',
    },
    {
      q: 'L-カルニチン2g/日で TMAO（心血管リスク指標）が上昇するって本当？',
      a: 'Koeth 2013（Nature Medicine）で L-カルニチン摂取によって腸内細菌が産生する TMAO（トリメチルアミン-N-オキシド）が動脈硬化リスクと関連すると報告されました。ただし後続研究では、健康人での 2g/日以下・短期摂取の臨床的影響は限定的とされ、心血管疾患既往者ほどリスクが高い可能性が示唆されています。心配な場合は 1〜2g/日以下に留め、心血管疾患の既往があれば医師相談を推奨します。',
    },
    {
      q: '結局、L-カルニチンとクレアチンどっちから始めればいい？',
      a: 'エビデンスの厚みで言えば、まずクレアチン（3-5g/日）から始めるのが論文上の推奨です。クレアチンはメタ解析が多数あり筋力・除脂肪体重・認知機能への効果がエビデンスS。L-カルニチンは観察研究中心でエビデンスB（非欠乏者への効果は限定的との報告も）。「筋トレ・体組成改善」が主目的ならクレアチン単独で十分、心臓・脂質代謝・運動持久力に課題があれば L-カルニチンを追加する順序が現実的です。',
    },
    {
      q: 'ダイエット・脂肪燃焼目的ならカルニチンとクレアチン、どっち？',
      a: '「ダイエット」を「体脂肪を減らす」と定義するなら、エビデンスの方向性が異なります。\n\nL-カルニチンは Pooyandjoo 2016 メタ解析（9 RCT・n=911）で2,000mg/日 8〜24週で体重 -1.33kg・BMI -0.47kg/m²の有意減少が報告されており、脂肪酸燃焼の理論経路と整合的です。ただし「劇的に痩せる」サイズの効果ではなく、運動・食事改善と組み合わせて初めて意味が出るレベルです。\n\nクレアチンは除脂肪体重（筋肉量）を増やす方向の作用で、初期は体内水分量増加で1〜2kg体重が増えることがあります。「体重を減らす」目的にはマイナスに見えますが、基礎代謝向上の長期的な脂肪燃焼基盤としては有効です。「短期で体重を落とす」ならL-カルニチン＋有酸素運動、「中長期で代謝の高い体を作る」ならクレアチン＋筋トレ、というのが論文上の使い分けです。両者は併用OKで、ダイエット中の筋肉量維持にクレアチンを置く運用が現実的です。',
    },
    {
      q: '女性が飲むならカルニチンとクレアチン、どちらがおすすめ？太る・男性化のリスクは？',
      a: '女性でも両者とも安全に使用できます。\n\nL-カルニチンは女性のダイエット文脈で日本国内のサプリ・ドリンクで広く配合されており、500-2,000mg/日の範囲で副作用報告は限定的です。\n\nクレアチンは「男性化する」「ゴツくなる」という誤解が広まっていますが、これは論文ベースで否定されています。クレアチンはホルモン作用を持たず（テストステロン上昇の報告はない）、女性が3-5g/日を摂取しても筋肥大は男性ほど起こりません（女性は男性比でテストステロン濃度が低いため）。Kreider 2017 メタ解析でも女性の筋力・除脂肪体重への有意改善が報告されています。初期1-2週は体内水分量増加で1〜2kg体重が増えますが、これは「太った」ではなく筋細胞内水分の増加で、運動パフォーマンスの基盤になります。女性で「ダイエット＋ボディメイク」を狙うなら、クレアチン3g/日（女性は男性比でやや少なめでOK）＋有酸素運動＋筋トレ＋必要に応じてL-カルニチン1g/日の組み合わせが無難です。',
    },
    {
      q: 'カルニチンとクレアチンの効果が出るまで・実感までの目安は？',
      a: '体感のスピードが大きく異なります。\n\nクレアチンは1〜2週で「筋肉のハリ」「パワーが出やすい」を実感する人が多く、これは筋細胞内のリン酸クレアチン蓄積（ローディング）による即時効果です。3〜4週で筋力・除脂肪体重への有意な変化が複数のRCTで報告されています（Kreider 2017）。「飲み始めて気づく」のが早い成分です。\n\nL-カルニチンは脂肪酸代謝の改善という間接効果のため、体感は緩やかで、8〜24週の継続でようやく体重・BMI・体脂肪率に有意な変化が確認されます（Pooyandjoo 2016 メタ解析）。「飲んですぐ脂肪が燃える」感覚はほぼ得られず、運動・食事改善と組み合わせた長期戦が前提です。「短期で実感したい」ならクレアチン、「腰を据えて代謝改善を狙う」ならL-カルニチンの時間軸の違いを理解した上で選ぶのが王道です。',
    },
    {
      q: 'カルニチンとクレアチンのおすすめメーカー・選び方は？',
      a: '両成分とも形態と純度で選ぶのが基本です。\n\nクレアチンはモノハイドレート型一択が論文上の推奨（HCl・エチルエステル等の新形態はモノハイドレートに対する優位性が確認されていない）。CreaPure®（独AlzChem社・最も研究使用実績多）を使用したNOW Foods・Optimum Nutrition等が第一選択で、月コスト¥600-1,500（3-5g/日）。国産プレミアム品は2-5倍価格になりますが、論文ベースの優位性は確認されていません。\n\nL-カルニチンはL-カルニチン酒石酸塩（L-Carnitine Tartrate）かピュアL-カルニチン（500-2,000mg/日）を選びます。アセチル-L-カルニチン（ALC）は脳・認知目的の別成分なので、運動・脂質代謝目的なら混同しないこと。NOW Foods・Doctor\'s Best・Jarrow Formulas等がコスパ・第三者検査の両面で安定しており、月コスト¥1,500-3,000。両者とも第三者検査公開（NSF・Informed Sport等）の製品が安心で、アスリート・スポーツ選手は禁止物質混入回避の観点から第三者検査必須です。',
    },
    {
      q: 'ATP再合成と脂肪酸β酸化の機序差は？無酸素運動・有酸素運動どちらに効きやすい？',
      a: '作用機序がエネルギー代謝の異なる経路で、向く運動強度域が分かれます。\n\nクレアチン（ATP再合成経路）は筋肉内でリン酸クレアチン（PCr）→ATP変換を担い、短時間・高強度・無酸素運動（10秒以内の全力疾走・1RM挑戦・反復ジャンプ・短時間レジスタンストレーニング等）でのパワー出力に直結します。Kreider 2017 J Int Soc Sports Nutr ポジションスタンドで、無酸素運動パフォーマンスへの有意改善が確立されており、エビデンス階層S。\n\nL-カルニチン（脂肪酸β酸化経路）は脂肪酸をミトコンドリア内膜に運搬する役割で、中・低強度の長時間有酸素運動（マラソン・サイクリング・水泳の持久系）でのエネルギー基質としての脂質利用に関与します。ただし健常人での運動パフォーマンス向上のRCTは限定的で、欠乏者・透析患者・心不全患者など特定集団での効果報告が中心です。運動強度別の整理は3点。A 短時間・高強度（無酸素・10秒〜2分）：クレアチンが論文上で有利。B 中時間・混合（HIIT・5〜30分強度）：両者併用に意味あり、ただしクレアチン主軸。C 長時間・低強度（持久系・60分以上）：L-カルニチンの理論的合理性はあるが、健常人での顕著な実証は限定的。「無酸素＝クレアチン／有酸素＝L-カルニチン」の二項対立は教科書的整理として有用ですが、実際の運動はほとんどが混合エネルギー系で動くため、目的別に組み合わせるのが論文上で現実的です。',
    },
    {
      q: 'クレアチンとL-カルニチンは併用していいですか？吸収面の競合や注意点は？',
      a: '結論として併用OKで、作用経路が完全に独立しているため吸収競合・効果阻害の報告はありません。整理は3点。A 経路の独立性：クレアチンは細胞質でリン酸クレアチン⇄ATP変換、L-カルニチンはミトコンドリア外膜⇄内膜の脂肪酸運搬という別ステップで、栄養素として競合しません。B 同時摂取の実用面：水溶性のクレアチン3〜5g＋水溶性のL-カルニチン500〜2,000mgは同じ食事・同じシェイカーで摂取しても問題ありません。糖質と一緒に摂るとインスリン経由で両者の細胞内取り込みが促進されるという報告もあります（Stephens 2006 Am J Physiol L-カルニチン×糖質併用）。C 注意点：L-カルニチン2g/日以上の長期摂取は腸内細菌経由のTMAO（トリメチルアミン-N-オキシド）上昇が報告されており、心血管疾患既往者では理論的リスクが指摘されています（Koeth 2013 Nat Med）。健常人での短期使用での臨床的影響は限定的とされますが、心血管疾患既往・心血管リスク高い方は1〜2g/日以下に留めるか医師相談が安全側です。月コストは併用でクレアチン¥420〜700＋L-カルニチン¥1,500〜3,000の合計¥2,000〜4,000で、運動目的の標準スタックとしては妥当な範囲です。',
    },
  ],
  'biotin-vs-zinc': [
    {
      q: 'ビオチンと亜鉛、悩み別にどっちを選べばいい？',
      a: '薄毛・脱毛が気になるならビオチン（30〜100μg/日）、爪が割れやすい・味覚が鈍い・傷の治りが遅いなら亜鉛（8〜11mg/日）が目安です。両方の症状があるなら併用OK（吸収競合は限定的）。ビオチンはケラチン合成の補酵素として髪の主要タンパクに直接関わり、亜鉛は300以上の酵素活性に必須で爪のマトリックス形成・創傷治癒・免疫機能に幅広く関与します。',
    },
    {
      q: 'ビオチンと亜鉛は一緒に飲んでも大丈夫？吸収は妨げ合わない？',
      a: '一緒に飲んでも問題なく、吸収を妨げ合うエビデンスは限定的です。亜鉛は鉄・カルシウムなど他のミネラルと吸収競合がありますが、ビオチンはB群ビタミンで吸収経路が異なります。実際のマルチビタミンミネラル製品の多くで両者は併存しています。ただし亜鉛は空腹時に飲むと吐き気が出ることがあるので、食後30分以内が推奨されます。',
    },
    {
      q: '亜鉛を長期で飲み続けても大丈夫？銅欠乏のリスクは？',
      a: '亜鉛40mg/日（耐容上限）を超える長期摂取で銅欠乏のリスクが報告されています。亜鉛は腸管で銅と吸収競合するため、サプリで30mg以上を6ヶ月以上続けると血清銅・セルロプラスミンが低下することが複数のRCTで確認されています。サプリは推奨量（8〜11mg/日）の範囲で使用し、長期高用量を避けるか、銅入り製品を選ぶのが安全です。',
    },
    {
      q: 'ビオチンと亜鉛、効果が出るまでどれくらいかかる？',
      a: 'ビオチンは爪の硬さ・割れにくさで4〜12週、髪の質感で12〜26週と報告されています（ビオチン欠乏例のRCT）。亜鉛は味覚・嗅覚改善で2〜4週、創傷治癒で2〜8週と比較的早く出ます。ただし非欠乏者（食事で足りている人）への効果は限定的で、「飲めばすぐ効く」と期待しすぎないことが大切です。',
    },
    {
      q: '食事だけでビオチンや亜鉛は足りる？サプリは必要？',
      a: 'ビオチンは腸内細菌でも合成されるため、健康な成人で欠乏は稀です（卵白を生で大量摂取するなど特殊な条件下を除く）。亜鉛は日本人で軽度〜中度の不足が指摘されており、令和元年国民健康・栄養調査では成人男性の平均摂取量9.2mg・推奨量11mgに対して充足率約84%と報告されています。穀類中心の食生活、ベジタリアン、過度なダイエット、高齢者は特に不足傾向です。心配ならまず血清亜鉛検査（保険適用・基準値80-130μg/dL）で確認するのが確実です。',
    },
    {
      q: '薄毛・抜け毛で悩んでいます。亜鉛とビオチン、どっちが効果的？',
      a: '薄毛・抜け毛の機序によって判断が分かれます。\n\n男性型脱毛症（AGA）・男性ホルモン関連の薄毛には亜鉛が論文上で先行します。亜鉛は5α-リダクターゼ（テストステロンをDHTに変換する酵素）の活性を抑制する報告があり、Stamatiadis 1988等で亜鉛の局所応用研究があります。\n\nビオチンは「髪が伸びやすくなる」「爪が硬くなる」のRCTがビオチン欠乏症例で確認されていますが、欠乏のない通常成人での効果は限定的との報告が中心です（Patel 2017 SKINMed レビュー）。\n\n論文ベースの優先順位は：①AGA・男性型薄毛＝皮膚科でフィナステリド/デュタステリド/ミノキシジル（サプリで対応できる領域ではない）、②鉄欠乏性脱毛（女性に多い）＝鉄＋フェリチン検査、③亜鉛欠乏型脱毛＝亜鉛8-11mg/日、④ビオチンは欠乏症例または「他で改善しない場合の追加」として位置付け。「サプリだけで薄毛が治る」は論文ベースで期待しすぎで、まず皮膚科受診と鉄・亜鉛の血液検査が現実的なステップです。',
    },
    {
      q: '亜鉛 vs ビオチン、爪が割れやすい・脆い時はどっち？',
      a: '両者ともエビデンスがあり、欠乏の有無で判断します。\n\nビオチンはColombo 1990のオープン試験（n=44）で2.5mg/日 6ヶ月で爪の厚さ25%増加、Hochman 1993の追試でも爪の硬さ・割れにくさの改善が報告されており、爪トラブルへの論文蓄積はビオチンが先行します。\n\n亜鉛は爪のマトリックス形成・タンパク合成に必須で、欠乏（Beau線・白斑・脆い爪）の改善には亜鉛補充が論文上で有効です。\n\n判断基準は：①爪に横線（Beau線）・白斑・剥離がある→亜鉛欠乏の可能性、血清亜鉛検査＋亜鉛8-11mg/日、②縦線が目立つ・薄くて割れやすい・爪が伸びにくい→ビオチン2.5mg/日（爪トラブル用量）を3-6ヶ月、③両方の症状ありor原因不明→併用OK（吸収競合限定的）。爪は伸びるのに3-6ヶ月かかるため、最低でも6ヶ月の継続が論文上の目安です。改善しない場合は内科・皮膚科で鉄・タンパク・甲状腺機能の検査を推奨します。',
    },
    {
      q: '亜鉛とビオチン、おすすめメーカーや選び方を教えてください',
      a: '形態・配合量・第三者検査の3軸で選ぶのが論文上の基本です。\n\n亜鉛は形態でグリシン酸亜鉛（OptiZinc・吸収率高）＞ピコリン酸亜鉛＞クエン酸亜鉛＞酸化亜鉛（吸収率低・コスパ重視）の順。NOW Foods Zinc Glycinate（30mg/日相当・月¥500-800）、Doctor\'s Best Zinc（Albion規格・月¥600-1,000）等がコスパ・第三者検査の両面で安定。市販ならネイチャーメイドのジンク（亜鉛8mg・月¥800-1,200）が入手しやすい第一選択。\n\nビオチンは配合量で①100μg/日（食事補完・マルチビタミン配合）、②300-1,000μg/日（一般サプリ）、③2,500-10,000μg/日（爪・髪のRCT用量・短期）の3層に分けられます。NOW Foods Biotin 5,000μg（月¥600-1,000）、ネイチャーメイドのビオチン（500μg・月¥800-1,200）等が選択肢。\n\n重要な注意：ビオチン高用量（2,500μg超）は血液検査（甲状腺機能・トロポニン・hCG等）でビオチン-アビジン法を使う項目で偽異常値を引き起こすため、検査前48時間〜2週間の中止が推奨されます（FDA 2017警告）。両者とも亜鉛＋ビオチン配合のヘアケア専用サプリ（DHC・ファンケル等）もありますが、配合量が中途半端な製品もあるため成分表で各量を確認するのが安全です。',
    },
    {
      q: 'ピコリン酸亜鉛とグルコン酸亜鉛、グリシン酸亜鉛は具体的に何が違いますか？吸収率と用途の使い分けは？',
      a: '亜鉛サプリの形態は吸収率・コスト・論文使用実績で5層に整理でき、用途別の使い分けが論文上で明確です。\n\n①グリシン酸亜鉛（Zinc Glycinate / Zinc Bisglycinate / OptiZinc）30mg/日＝吸収率が最も高い形態の一つで、Boran 2008等で酸化亜鉛より約2倍高い報告。消化器症状（嘔気）が起きにくく、空腹時摂取でも比較的耐性が良いため、第一選択として現実的。代表ブランドはNOW Foods Zinc Glycinate・Doctor\'s Best Zinc Glycinate（Albion規格）・Solgar OptiZinc等で月¥500-800。\n\n②ピコリン酸亜鉛（Zinc Picolinate）30mg/日＝Barrie 1987 Agents Actions の比較試験でグルコン酸・クエン酸型より優位の報告。\n\nニキビRCTで使用実績が厚い形態（Cervantes 2018 J Dermatolog Treatメタ解析）で、Thorne Zinc Picolinate（月¥600・NSF認証・180錠で約6ヶ月分）はSciBase rank 1の妥当選択。皮膚・髪・テストステロン維持目的で論文蓄積が深い。\n\n③クエン酸亜鉛（Zinc Citrate）25〜30mg/日＝Wegmüller 2014 J Nutrでグルコン酸型と同等・酸化型より優位の吸収率報告。NOW Foods Zinc Citrate等が月¥500-700でコスパ重視向け。\n\n④グルコン酸亜鉛（Zinc Gluconate）30〜50mg/日＝風邪・上気道感染対策のトローチ・ロゼンジで研究実績豊富（Hemilä 2017 BMJ Openメタ解析で症状期間33%短縮報告）。Cold-EEZE Zinc Gluconate Lozenges等が代表で、長期摂取より急性期短期使用に特化。\n\n⑤酸化亜鉛（Zinc Oxide）8-15mg/日＝吸収率は他形態の30〜60%程度と最も低めですが、コストは最良。市販ネイチャーメイド・DHC等の安価な日本ブランド亜鉛サプリはこの形態を採用していることが多く、用途を「日常の不足補給」に限定して使う合理性。\n\n用途別の実用的選び分け：①ニキビ・皮膚代謝＝ピコリン酸亜鉛30mg/日×12週（Thorne 月¥600）、②初心者・第一選択・吸収率重視＝グリシン酸亜鉛30mg/日（NOW Foods/Doctor\'s Best 月¥500-800）、③風邪・上気道感染急性対応＝グルコン酸亜鉛ロゼンジ（Cold-EEZE 急性期48-72時間以内開始）、④日常の不足補給コスパ最優先＝クエン酸亜鉛 or 市販ネイチャーメイド ジンク 8mg（月¥500-1,200）、⑤テストステロン維持・薄毛＝血清亜鉛検査→欠乏確認後にピコリン酸/グリシン酸30mg/日×8〜12週。\n\n「最強の形態」は存在せず、目的×吸収率×継続コストで選ぶのが現実解です。',
    },
  ],
  // ── Session F Day 1 バッチ 2026-05-11 ────────────────────────
  'melatonin-vs-l-theanine': [
    {
      q: 'L-テアニンとメラトニンの違いは？',
      a: '作用経路が完全に異なります。\n\nL-テアニン（100〜200mg）は緑茶由来のアミノ酸で、脳内でα波を増加させてコルチゾールを低下させ「興奮を鎮める・リラックスする」方向に働きます（Hidese 2019 RCT n=30で4週間摂取後の睡眠の質改善が報告された）。\n\nメラトニン（0.5〜3mg）は脳の松果体から分泌される睡眠ホルモンの直接補充で、生体時計のリセット・入眠潜時の短縮に作用します（Cochrane 2002 メタ解析 n=1,200で時差ぼけ症状の有意な改善・PLOS ONE 2013 メタ解析 n=1,683で入眠潜時の平均7.06分短縮が報告された）。「気持ちを落ち着ける（テアニン）」vs「眠りそのものを起こす（メラトニン）」の役割分担と覚えると整理しやすくなります。',
    },
    {
      q: 'L-テアニンとメラトニン、どちらから始めるべき？',
      a: '推奨順序：まずL-テアニン100〜200mgから試すのが現実的です。理由は、①日本国内で普通にサプリとして購入できる（メラトニンは医薬品扱いで個人輸入前提）、②副作用報告がほぼなく安全性が高い、③仕事終わりや就寝前のルーティンに組み込みやすい、の3点です。テアニン4〜8週間で「寝つきの不安・思考の止まらなさ」が改善しない場合に、メラトニン0.5〜1mgの追加を検討する流れが現実的です。「不眠が慢性化している」「明け方覚醒する」「概日リズム障害（時差ぼけ・交代勤務）」がある場合は、テアニンだけでは不十分でメラトニン側のアプローチが論文上で有効です。',
    },
    {
      q: 'L-テアニンとメラトニンは併用できる？タイミングは？',
      a: '併用OKです。作用経路が独立（テアニン＝GABA系・α波・コルチゾール低下／メラトニン＝松果体ホルモン補充・概日リズム）で、相互の効果を阻害しません。推奨タイミング：①就寝1〜2時間前にテアニン100〜200mg（リラックス導入）、②就寝30〜60分前にメラトニン0.5〜1mg（入眠アンカー）の二段スタックが無難です。両方とも依存性・耐性形成のRCTでの強い報告はなく、ベンゾジアゼピン系・Z系睡眠薬と比べて翌朝の眠気残りも少ない傾向です。ただしメラトニン側はSSRI（特にフルボキサミン）併用で血中濃度が最大17倍に上昇する報告があるため、抗うつ薬服用中は医師相談が必須です。',
    },
    {
      q: '日本でメラトニンが買いにくいのはなぜ？テアニンと何が違う？',
      a: '規制カテゴリが異なります。\n\nL-テアニンは食品成分として扱われ、Amazon・楽天・国内サプリメーカー（DHC・大塚製薬等）で普通にサプリとして購入できます。\n\nメラトニンは日本では医薬品（睡眠導入剤類縁）扱いで、国内ではサプリとして製造・販売されていません。日本人がメラトニンを使うルートは原則iHerb等の海外通販による個人輸入で、これは違法ではないものの「自己責任」のグレーゾーンです。米国ではメラトニンはサプリ（DSHEA法下のDietary Supplement）として大量流通しており、規制差が大きい成分です。本サイトは個人輸入を推奨する立場ではなく、中立的に「日本ではこういう扱い」「米国ではこういう扱い」を事実として提示しています。',
    },
    {
      q: 'L-テアニンとメラトニン、効果が出るまでとコスパは？',
      a: 'テアニンは初回〜2週間で「寝つきが落ち着く」を実感する人が多く、4〜8週で睡眠の質スコア（PSQI等）の改善がRCTで確認されます。月コスト¥1,000〜2,500（200mg/日換算）で継続しやすい価格帯です。メラトニンは0.5〜1mgで初回〜数日以内に入眠潜時短縮を実感しやすく、時差ぼけは渡航前後数日で評価可能。月コスト¥800〜2,000（iHerbの代表的1mg製品）で、効果実感の速さに対してはコスパ良好です。「即効＋特定の睡眠課題（入眠潜時・時差ぼけ）」ならメラトニン、「全般的なリラックス・継続的な睡眠の質改善」ならテアニンが論文上の使い分けで、両方の課題があれば併用が合理的です。',
    },
  ],
  'tranexamic-acid-vs-niacinamide': [
    {
      q: 'トラネキサム酸とナイアシンアミドの違いは？',
      a: '美白経路が完全に異なります。\n\nトラネキサム酸（外用2〜5%・経口250〜500mg/日）はプラスミン（炎症シグナル経路の酵素）を阻害してメラニン産生の起点側をブロックします（JAAD 2020 メタ解析 n=561で経口250mg/日のmMASI有意改善が報告された）。\n\nナイアシンアミド（外用5%）は表皮でメラノソーム（メラニンを運ぶ袋）の表皮細胞への移送を抑え、完成したメラニンの受け渡しを止めます（Bissett 2005 RCT 5%×8週で色素沈着改善が報告された）。「メラニンを作らせない（トラネキサム酸）」vs「作られたメラニンを表皮に届かせない（ナイアシンアミド）」と覚えると整理しやすく、競合関係ではなく完全な補完関係です。',
    },
    {
      q: 'トラネキサム酸とナイアシンアミドは併用できる？',
      a: '併用が論文上で合理的です。経路が完全に独立しており、両者を同時に使うと「メラニン産生の上流（トラネキサム酸）」と「下流（ナイアシンアミド）」を両方押さえる多段アプローチになります。実際に市販でもANUA TXA 4% + ナイアシンアミド 10%セラム等の同時配合処方が韓国ダーマブランドを中心に普及しており、刺激を増やさず色素沈着の二重ケアを狙う処方として実証されています。朝晩いずれもOKで、トラネキサム酸→ナイアシンアミドの順または同一セラムで重ねれば吸収競合もほぼ気になりません。月コストは外用同士なら¥3,000〜6,000程度で収まります。',
    },
    {
      q: '経口トラネキサム酸と外用、どちらを選ぶ？',
      a: '症状の重さで分けます。\n\n軽度〜中度の色素沈着・炎症後色素沈着であれば外用2〜5%（市販美白美容液・医薬部外品で配合あり）で4〜12週間試すのが第一選択です。\n\n両頬の対称的な肝斑・外用で改善しない頑固な色素沈着については経口250〜500mg/日が皮膚科で処方されることがあり、メタ解析でmMASI改善が報告されています。経口は血栓リスクがあるためピル（経口避妊薬）・抗凝固薬（ワルファリン等）併用中、血栓症の既往、妊娠中・授乳中は禁忌または医師相談必須です。「市販外用→4〜12週評価→不十分なら皮膚科で経口検討」が王道なステップです。',
    },
    {
      q: 'ピル（経口避妊薬）服用中は経口トラネキサム酸は飲めない？',
      a: '医師相談必須です。経口避妊薬は血栓症リスクをわずかに上げる薬剤として知られており、止血作用のあるトラネキサム酸を経口で併用すると静脈血栓塞栓症（VTE）のリスクが相加的に上がる懸念が指摘されています。市販のトラネキサム酸経口製品（医薬品）の添付文書でも「血栓のある患者・血栓症のおそれのある患者」への投与は慎重投与・原則禁忌の対象です。ピル併用中に肝斑治療を希望する場合は、①外用トラネキサム酸（プラスミン経路への作用は局所的）、②ナイアシンアミド外用5%、③ハイドロキノン外用（皮膚科処方）等の外用選択肢を優先し、経口は皮膚科医と婦人科医に確認した上で判断するのが安全です。',
    },
    {
      q: '効果が出るまでとコスパで結局どっち？',
      a: '初心者はナイアシンアミド外用5%単独から始めるのが現実的な順序です。エビデンスが豊富（Bissett 2005他複数RCT）、月コスト¥2,000〜5,000、刺激ほぼなしで朝晩OK、妊娠中も比較的安全という4拍子で参入障壁が低い成分です。8〜12週評価して色素沈着が頑固に残る場合にトラネキサム酸外用2〜5%を追加（朝ナイアシンアミド・夜トラネキサム酸の朝晩分離など）、それでも改善しない肝斑には皮膚科で経口トラネキサム酸250〜500mg/日を相談する3段階が論文上の王道です。「いきなり経口」ではなく「外用2成分の併用→経口検討」が安全とコスパの両面で合理的です。',
    },
  ],
  'pdrn-vs-hyaluronic-acid': [
    {
      q: 'PDRNとヒアルロン酸の違いは？',
      a: '作用層と目的が完全に異なります。\n\nPDRN（外用0.5〜2%）はサケ精巣由来のDNA断片で、A2Aアデノシン受容体を介して線維芽細胞を活性化しコラーゲン産生・血管新生・組織再生を促進します（JCD 2021 RCT n=40で外用ジェル8週使用でシワスコア有意改善が報告された）。\n\nヒアルロン酸は真皮〜表皮で水分保持に働く糖鎖で、外用では角層〜表皮の水分量を維持してハリ・小じわ・乾燥感に作用し、経口でも腸管吸収後の真皮含水量増加が一部RCTで報告されています。「再生」（PDRN）vs「保湿」（ヒアルロン酸）の役割分担と覚えると整理しやすく、両者は補完関係です。',
    },
    {
      q: 'PDRNとヒアルロン酸は併用できる？順番は？',
      a: '併用OK・むしろ韓国コスメでは同時配合が定石になっています。市販でもANUA PDRN Hyaluron Serum等の同時配合処方が普及しており、PDRNの再生作用とヒアルロン酸の即時保湿を1本で狙う設計が標準化しています。順番に分ける場合は、洗顔→化粧水→PDRN美容液→ヒアルロン酸配合化粧水/乳液→クリームの順が無難で、PDRNを線維芽細胞に届けてからヒアルロン酸で水分を閉じ込めるロジックです。朝晩いずれも使用可能で、レチノール・ビタミンC等の活性成分とも同時併用の禁忌は報告されていません。',
    },
    {
      q: 'PDRN外用は注射と同じ効果が期待できる？',
      a: '注射型と外用は別物として扱う必要があります。PDRN注射は医療機関で皮膚科・形成外科が行う治療（韓国・欧州中心に承認）で、真皮層に直接成分を届けるため線維芽細胞活性化のエビデンスが豊富です。一方外用PDRNは皮膚バリアを通過させる必要があり、生体利用率は注射より大幅に低くなります。JCD 2021のRCT（n=40）で外用ジェル8週でシワスコア改善は報告されたものの、注射型の即時効果と同等を期待するのは現実的ではありません。「注射の効果を外用に外挿する」ことは論文ベースで誤りで、外用は12〜24週の継続を前提に穏やかな改善を狙う位置付けが妥当です。',
    },
    {
      q: 'サケアレルギーがある場合、PDRNは使えない？',
      a: '使用不可です。PDRNはサケ精巣由来のDNA断片を原料とするため、サケ・サーモン・魚介類にIgE型アレルギーがある方は外用でも避ける必要があります（製品の禁忌事項にも記載）。「DNA断片に精製されているからアレルゲンタンパクは残らない」という説明が一部でなされますが、精製度は製品により異なり、安全性が確立されていない以上、魚介アレルギー保有者には推奨されません。代替策として、コラーゲン産生促進を狙うならレチノール（Kafi 2007 RCTでシワ改善）、ナイアシンアミド（バリア・小じわ）、ペプチド系（Matrixyl/銅ペプチド等）が論文上の選択肢になります。',
    },
    {
      q: '効果が出るまでとコスパで選ぶならどっち？',
      a: '即時の保湿実感ならヒアルロン酸（外用直後〜数日で角層含水量が上がる体感がある）、中長期のシワ・ハリにはPDRN（12〜24週継続で評価）が王道な分け方です。月コストはヒアルロン酸配合化粧品は幅広く¥1,000〜5,000、PDRN配合セラムは¥3,000〜8,000程度で、PDRNは新興成分のため割高傾向です。\n\nまずヒアルロン酸を基礎の保湿軸に据え、シワ・たるみへの追加対策としてPDRNセラムを夜のスペシャルケアに置く順序が現実的です。レチノール・ビタミンCと比較するとPDRNはエビデンス階層がB（新興・emerging）で、エビデンスの厚みで選ぶならレチノールを優先するのも現実的な判断です。',
    },
  ],
  'maca-vs-ashwagandha': [
    {
      q: 'マカとアシュワガンダの違いは？',
      a: '両者ともアダプトゲン（HPA軸＝視床下部-下垂体-副腎系の調整成分）に分類されますが、エビデンス内容と起源が異なります。\n\nマカ（1,500〜3,500mg/日・ペルー産アブラナ科）は性機能改善のメタ解析（BMC 2010で4 RCTのシステマティックレビュー）と更年期症状RCT（Menopause 2008 n=14 6週で不安・抑うつスコア改善が報告された）が中心で、特筆すべきは「エストロゲン・LHは変化しなかった」とされる点で、ホルモン直接的な変動なくHPA軸調整経由で作用すると考えられています。\n\nアシュワガンダ（KSM-66 300〜600mg/日・インド原産ナス科）はコルチゾール低下RCT複数とテストステロン関連の報告があり、ストレス耐性・男性活力で論文の厚み（エビデンス階層A）が一段上です。',
    },
    {
      q: 'マカとアシュワガンダは併用できる？',
      a: '理論上は併用OKで、実際にメンズ向け活力サプリやアダプトゲン複合製品で両者は併存しています。作用機序の重なりはHPA軸調整という大枠で似ていますが、コルチゾール経路（アシュワガンダ）と性機能/更年期経路（マカ）でメインターゲットがずれており、相互の効果を阻害する報告はほぼありません。ただし両者ともホルモン依存性疾患（乳がん・前立腺がん・甲状腺機能異常等）、SSRI・抗うつ薬、降圧薬、自己免疫疾患治療薬と併用注意があり、複数の併用注意が重なる場合は単独使用を優先するか医師相談を推奨します。月コストは両方併用で¥3,000〜6,000程度です。',
    },
    {
      q: '男性のテストステロン・性機能目的ならどっち？',
      a: 'アシュワガンダがエビデンス階層で上回ります。KSM-66（300〜600mg/日 8〜16週）のRCT複数で血清テストステロン上昇・性機能スコア改善が報告されており、男性活力目的では論文ベースの第一選択です（ただし「テストステロンを劇的に上げる」ではなく軽度〜中度の改善の範囲）。マカも性機能改善のメタ解析（BMC 2010）はありますが、ホルモン値そのものは変化させず「主観的性欲・性機能スコアの改善」が中心で、機序は性ホルモンの直接変化ではない点に注意が必要です。「論文の厚み + テストステロン関連」ならアシュワガンダ、「ホルモン値を動かさず性欲・気分を整える」ならマカという使い分けです。',
    },
    {
      q: '女性の更年期・気分目的ならどっち？',
      a: 'マカが論文上で先行します。Menopause 2008（n=14・6週）でマカ3.5g/日が更年期後女性の不安・抑うつスコアを改善（p<0.05）と報告され、エストロゲン・LH不変というホルモンに直接介入しない安全性が女性更年期での使いやすさに繋がっています。アシュワガンダも女性のストレス・睡眠RCTはありますが、男性活力文脈ほどの強い「女性更年期RCT」蓄積はなく、ホットフラッシュ・月経関連症状でのエビデンスはエクオール・大豆イソフラボン側が厚い領域です。「更年期＋気分の落ち込み」ならマカ、「更年期＋慢性ストレス・睡眠の質低下」ならアシュワガンダの使い分けが現実的です。ホルモン依存性疾患の既往がある場合は両者とも医師相談を推奨します。',
    },
    {
      q: '結局、どちらから始めればいい？',
      a: 'エビデンスの厚みで言えばアシュワガンダ（KSM-66 300mg/日）から始めるのが論文上の推奨です。コルチゾール低下RCTが複数あり、ストレス耐性・睡眠の質・男性活力という汎用課題に幅広く対応する成分で、月コスト¥1,500〜3,500とコスパも良好です。8〜12週評価後に「更年期症状・性機能で物足りない」と感じる場合にマカ1,500〜3,500mg/日を追加する流れが効率的です。女性の更年期症状が主訴・かつアシュワガンダの上気・甲状腺刺激が気になる場合はマカ単独から始めるのも合理的です。両者とも継続性が最重要で、最低8週間は同条件で続けてから判定するのが無難です。',
    },
  ],
  'retinol-vs-niacinamide': [
    {
      q: 'レチノールとナイアシンアミドの違いは？',
      a: '作用ターゲットと刺激レベルが完全に異なります。\n\nレチノール（外用0.025〜1%）はビタミンA誘導体で、表皮細胞のターンオーバー促進・真皮のコラーゲン産生でシワ・たるみ・くすみに作用します（Kafi 2007 RCT 0.4%×24週で深いシワの有意改善が報告された）。\n\nナイアシンアミド（外用5%）はビタミンB3で、表皮のバリア機能強化・色素沈着・毛穴・小じわの4方面に低刺激で作用します（Bissett 2005 RCT 5%×8週で色素沈着・小じわ改善が報告された）。「真皮までのアグレッシブな抗老化（レチノール）」vs「表皮の総合ケア（ナイアシンアミド）」と覚えると整理しやすく、刺激リスクと妊娠中の可否で大きく差があります。',
    },
    {
      q: 'レチノールとナイアシンアミドは併用できる？順番は？',
      a: '併用が論文上で強く推奨されます。経路が独立で相互に効果を阻害せず、むしろレチノールの代表的副作用（赤み・乾燥・皮むけ）をナイアシンアミドのバリア機能強化が抑制する補完関係です。推奨パターン：①朝＝ナイアシンアミド5%セラム＋日焼け止め（レチノールは光分解するため夜推奨）、②夜＝洗顔→化粧水→ナイアシンアミドで肌を整える→レチノール（バリア準備後にレチノールが刺激を減らせる）→保湿クリーム、の朝晩二段スタックが王道です。同時塗布する場合はナイアシンアミドが先、数分待ってレチノールの順序を守ってください。',
    },
    {
      q: '妊娠中・授乳中はどちらが使える？',
      a: 'レチノールは妊娠中NG・授乳中も慎重対応です。経口レチノイド（イソトレチノイン・経口レチノール大量摂取）で胎児への催奇形性リスクが確立されており、外用レチノールでも血中移行は限定的とはいえ国内外の皮膚科ガイドラインで妊娠中の使用は推奨されていません。\n\nナイアシンアミドは妊娠中・授乳中も比較的安全とされ、米国皮膚科学会のレビュー等で「妊娠中の使用に問題なし」と整理されています（ただし最終判断は産婦人科医に確認）。「妊娠中の美白・くすみケア」が主訴なら、レチノールを中断してナイアシンアミド5%＋ビタミンC外用＋日焼け止めの組み合わせに切り替えるのが現実的です。',
    },
    {
      q: 'レチノール初心者はどう始める？ナイアシンアミドとの並走順は？',
      a: 'まずナイアシンアミド5%で肌のバリア基盤を作ってからレチノールを低濃度で導入する順序が無難です。具体的には、①ナイアシンアミド5%朝晩を4〜8週継続して肌の落ち着きを確認、②レチノール0.025〜0.1%を夜・週2回から開始（A1反応＝赤み/皮むけが起きやすい初期2〜4週は頻度を上げない）、③刺激がなければ週3〜5回に増やし、3〜6ヶ月かけて0.3〜0.5%に濃度を上げる、の3段階が王道です。レチノールはピーリング系（AHA/BHA・グリコール酸）・ビタミンC高濃度との同時塗布で刺激が増えるため、別の日や朝晩で分離するのが安全です。',
    },
    {
      q: '効果が出るまでと月コストの差は？',
      a: 'ナイアシンアミドは4〜8週で色素沈着・毛穴・小じわ・バリア改善が体感しやすく、月コスト¥2,000〜5,000で参入障壁が低い成分です。レチノールは12〜24週でシワ・たるみへの有意改善がRCTで報告されており、月コストは0.1〜0.5%濃度で¥3,000〜8,000程度、効果実感までの時間が長い分、深いシワ・たるみへのアプローチで論文の厚みが上回ります。「短期＋汎用＋低刺激」ならナイアシンアミド、「中長期＋シワ・たるみ重視＋夜のみ」ならレチノールという役割分担で、30代以降は両方の併用が論文上で合理的です。「即効を期待して高濃度から始める」のは赤み・皮むけで継続できなくなる典型の失敗パターンのため、低濃度・低頻度から積み上げるのが王道です。',
    },
  ],
  // ── Session F Day 2 バッチ 2026-05-11（既存pair の FAQs 埋め） ────────────
  'ashwagandha-vs-rhodiola': [
    {
      q: 'アシュワガンダとロディオラの違いは？',
      a: '同じアダプトゲンですが「方向」が逆向きです。\n\nアシュワガンダ（KSM-66/Sensoril 300〜600mg/日・インド原産ナス科）はコルチゾール低下・睡眠の質改善・テストステロン関連RCTが豊富で「落ち着かせる・回復させる」方向に作用（夜のリラックス・回復軸）。\n\nロディオラ（SHR-5 200〜600mg/日・シベリア/北欧原産）は精神疲労・バーンアウト・認知パフォーマンス改善RCTが中心で「覚醒させる・パフォーマンスを上げる」方向に作用（朝の集中・覚醒軸）です。Phytomedicine 2010 RCT（n=101）でロディオラSHR-5 170mg/日×4週が夜間勤務医師の計算誤り率を改善、Journal of Sports Medicine 2017 RCT（n=118）でロディオラ200mg/日×12週がバーンアウトスコアを改善した報告があります。「夜のアシュワガンダ・朝のロディオラ」と覚えると整理しやすくなります。',
    },
    {
      q: 'アシュワガンダとロディオラは併用できる？',
      a: '併用OK・むしろ二段スタックが王道です。作用方向が逆向き（鎮静vs覚醒）のため、朝にロディオラで集中・抗疲労、夜にアシュワガンダで睡眠の質・コルチゾール低下を狙う組み合わせが理にかなっています。実際にアダプトゲン複合製品でも両者は併存しており、相互の効果を阻害する報告はほぼありません。ただし双極性障害（特にロディオラの覚醒作用）、抗うつ薬（SSRI/SNRI）、甲状腺薬、自己免疫疾患治療薬の併用注意は両者に共通するため、複数の併用注意が重なる場合は単独使用を優先するか医師相談を推奨します。月コスト目安は両方併用で¥3,000〜5,000程度です。',
    },
    {
      q: '朝の集中・疲労感ならどっち？',
      a: 'ロディオラが論文上で先行します。SHR-5標準化エキスのRCT複数で「精神疲労・夜勤の認知低下・バーンアウト」への改善が報告されており、特に朝・午前中の摂取で覚醒感が出やすい特性があります。Phytomedicine 2010ではSHR-5 170mg/日×4週で夜間勤務医師の計算課題で誤り率改善、Journal of Sports Medicine 2017では200mg/日×12週でバーンアウト症候群の燃え尽き・うつ・疲労が改善と報告されました。アシュワガンダも疲労改善RCTはありますが、ロディオラほど「朝の覚醒・抗疲労」に特化しておらず、慢性疲労・ストレス疲弊が主訴ならロディオラ朝・アシュワガンダ夜の併用が現実的です。',
    },
    {
      q: '睡眠・コルチゾール・男性活力ならどっち？',
      a: 'アシュワガンダがエビデンス階層で上回ります。KSM-66 300〜600mg/日のRCT複数でコルチゾール低下・睡眠の質スコア改善・男性のテストステロン関連指標の改善が報告されており、Sensoril 250〜600mg/日でも同様の傾向が確認されています。ロディオラも夜間勤務での認知改善RCTはありますが、睡眠そのものへの作用（PSQI等）は限定的で、むしろ高用量で不眠・興奮が出るリスクが報告されているため夜の使用には向きません。「夜寝つきが悪い・コルチゾール過剰・男性活力低下」が主訴ならアシュワガンダが論文上の第一選択です。',
    },
    {
      q: '初心者はどちらから始めるべき？',
      a: '主訴で分けるのが無難です。\n\n①ストレス・不眠・回復が主訴 → アシュワガンダ KSM-66 300mg/日（夜の食後）。\n\n②精神疲労・集中力低下・バーンアウト傾向が主訴 → ロディオラ SHR-5 200mg/日（朝の空腹時または食前30分）。\n\n③両方の課題がある → 朝ロディオラ + 夜アシュワガンダの二段スタック、の使い分けです。両者とも8〜12週の継続評価が論文上で、短期で「効かない」と判断するのは早すぎます。月コスト¥1,500〜3,500（単独）・¥3,000〜5,000（併用）で、いずれも継続性が最重要です。',
    },
  ],
  'pdrn-vs-retinol': [
    {
      q: 'PDRNとレチノールの違いは？',
      a: '作用機序とエビデンスの厚みが大きく異なります。\n\nPDRN（外用0.5〜2%）はサケ精巣由来のDNA断片で、A2Aアデノシン受容体経由で線維芽細胞を活性化しコラーゲン産生・組織再生を促進します（JCD 2021 RCT n=40で外用ジェル8週でシワスコア有意改善が報告された・新興成分emerging）。\n\nレチノール（外用0.025〜1%）はビタミンA誘導体で、表皮細胞のターンオーバー促進と真皮のコラーゲン産生でシワ・たるみへ強いRCTエビデンスを持ちます（Kafi 2007 RCT 0.4%×24週で深いシワ改善が報告された・エビデンス階層A）。「再生医療由来の新興成分（PDRN）」vs「化粧品メーカーの抗老化金字塔（レチノール）」という対比で、論文の厚みはレチノールが圧倒的です。',
    },
    {
      q: 'PDRNとレチノールは併用できる？順番は？',
      a: '理論上は併用OKですが、レチノールの刺激リスクを踏まえて使い分けが推奨されます。両者ともコラーゲン産生促進というゴールは共通ですが、経路が異なる（PDRN=線維芽細胞活性化／レチノール=表皮ターンオーバー＋線維芽細胞）ため理論上の競合は限定的です。同時併用する場合は、洗顔→化粧水→PDRNセラム→レチノール→保湿クリームの順、または朝PDRN・夜レチノールの朝晩分離が刺激軽減に有効です。PDRNには低刺激のバリア補強的な側面もあるため、レチノールの赤み・乾燥が出やすい初期にPDRNを併用する組み合わせは韓国ダーマでよく見られる処方です。',
    },
    {
      q: '妊娠中・授乳中はどちらが使える？',
      a: 'レチノールは妊娠中NG・授乳中も慎重対応です。経口レチノイドの催奇形性リスクが確立されており、外用でも国内外の皮膚科ガイドラインで妊娠中の使用は推奨されていません。一方PDRNは妊娠中・授乳中の使用について明確な禁忌は確立されていない（サケ・魚介アレルギーは禁忌）ものの、妊娠中のスキンケア成分は基本的に「リスク回避＝控えめ」が安全側の判断です。妊娠中にコラーゲン産生を狙うなら、レチノール・PDRNいずれも積極使用せず、ナイアシンアミド5%＋ペプチド系＋ビタミンC外用の組み合わせが王道に安全な代替路線です。最終判断は産婦人科医に確認してください。',
    },
    {
      q: 'PDRN外用は注射と同じ効果が期待できる？',
      a: '注射型と外用は別物として扱う必要があります。PDRN注射は医療機関で皮膚科・形成外科が行う治療で、真皮層に直接成分を届けるため線維芽細胞活性化のエビデンスが豊富です。一方外用PDRNは皮膚バリアを通過させる必要があり、生体利用率は注射より大幅に低くなります。JCD 2021のRCT（n=40）で外用ジェル8週でシワスコア改善は報告されたものの、注射型の即時効果と同等を期待するのは現実的ではありません。「外用は12〜24週の継続を前提に穏やかな改善を狙う」位置付けが妥当で、深いシワ・たるみへの強い効果を求めるならレチノールのほうが論文の厚みで上回ります。',
    },
    {
      q: '結局、どちらから始めるべき？',
      a: 'エビデンスの厚みで選ぶならまずレチノール低濃度（0.025〜0.1%）から開始が論文上の王道です。複数のメタ解析・RCTで光老化・シワ・たるみへの有意な改善が確立されており、月コスト¥3,000〜8,000で参入もしやすい成分です。レチノールが刺激で続けられない・妊娠中・サケアレルギーがない敏感肌志向、という場合にPDRN 0.5〜1%セラムを代替路線として選ぶのが現実的です。30代以降で「シワ・たるみへのアグレッシブな対策」が主訴ならレチノール、「再生・修復・低刺激の韓国コスメ路線」が好みならPDRN、両方の経路でアプローチしたいなら朝PDRN・夜レチノールの併用が現実的です。',
    },
  ],
  'tranexamic-acid-vs-arbutin': [
    {
      q: 'トラネキサム酸とα-アルブチンの違いは？',
      a: '美白の経路が完全に異なります。\n\nトラネキサム酸（外用2〜5%・経口250〜500mg/日）はプラスミン（炎症シグナル経路の酵素）を阻害してメラニン産生の起点側をブロックします（JAAD 2020 メタ解析 n=561で経口250mg/日のmMASI有意改善が報告された）。\n\nα-アルブチン（外用2%）はチロシナーゼ（メラニン合成酵素）を直接阻害してメラニン生成のステップを抑えます（Hamed 2020 RCTで2%×12週で色素沈着の有意改善が報告された）。「メラニン産生のシグナルを止める（トラネキサム酸）」vs「メラニン合成酵素を直接押さえる（アルブチン）」と覚えると整理しやすく、両者は経路が独立で補完関係です。',
    },
    {
      q: 'トラネキサム酸とα-アルブチンは併用できる？',
      a: '併用OK・むしろ多経路アプローチで論文ベースに合理的です。経路が完全に独立しているため、両者を同時に使うと「炎症経路（トラネキサム酸）」と「酵素阻害経路（アルブチン）」を両方押さえる多段アプローチになります。市販でもトラネキサム酸＋アルブチン複合配合の美白美容液は普及しており、朝・夜の使い分け（朝アルブチン2%・夜トラネキサム酸3〜5%）、または同一セラムでの併用いずれも刺激リスクは低く妥当です。経口トラネキサム酸を併用する場合は、ピル・抗凝固薬・血栓既往との併用注意を医師に確認してください。',
    },
    {
      q: 'ハイドロキノンとの違い・代替路線になる？',
      a: '両者ともハイドロキノンの代替路線として論文ベースで合理的な選択肢です。ハイドロキノンはチロシナーゼ阻害＋メラノサイト毒性で強い美白効果がある一方、白斑（外因性白斑）・刺激・長期使用での皮膚萎縮のリスクがあり、米国FDAも市販OTC配合を制限する方向に動いています。トラネキサム酸（プラスミン経路）とα-アルブチン（チロシナーゼ阻害だがハイドロキノンより穏やか）は両者とも長期使用可・低刺激で、JDT 2020 RCTでアゼライン酸20%がハイドロキノン4%と同等の肝斑改善を示した報告と並んで、ハイドロキノンを使わずに美白を狙う処方の中心成分になっています。「強さ」より「長期に続けられる安全性」を優先するなら実用的な選択肢です。',
    },
    {
      q: '経口トラネキサム酸とα-アルブチン外用、どちらが先？',
      a: '初心者はまず外用同士の併用（α-アルブチン2%＋トラネキサム酸外用2〜5%）から始めるのが無難な順序です。外用は刺激リスクが低く、ピル・抗凝固薬・血栓既往との併用懸念もありません。4〜12週評価して頑固な肝斑・両頬対称の色素沈着が外用だけでは改善しない場合に、皮膚科で経口トラネキサム酸250〜500mg/日を相談する3段階が安全とコスパの両面で合理的です。経口は血栓リスクがあるため自己判断での開始は推奨されず、必ず皮膚科医・婦人科医に確認した上で判断してください。',
    },
    {
      q: '効果が出るまでとコスパで結局どっち？',
      a: 'α-アルブチン2%単独から開始するのがエビデンスの厚み・刺激リスク・コスパの3拍子で現実的です。月コスト¥2,000〜4,000、妊娠中も比較的安全、刺激ほぼなしで参入障壁が低い成分です。Hamed 2020 RCTでは2%×12週で色素沈着改善が報告されており、効果実感は8〜12週が目安です。8〜12週評価して頑固な肝斑が残る場合にトラネキサム酸外用2〜5%を追加（朝アルブチン・夜トラネキサム酸など）、それでも改善しない肝斑には経口トラネキサム酸を皮膚科で相談する3段階が王道です。「いきなり経口」や「ハイドロキノンに切り替え」ではなく、「外用2成分の併用→経口検討」が安全とコスパの両面で合理的です。',
    },
  ],
  'salicylic-acid-vs-glycolic-acid': [
    {
      q: 'サリチル酸（BHA）とグリコール酸（AHA）の違いは？',
      a: '溶解性と浸透層が完全に異なります。\n\nサリチル酸（BHA・β-ヒドロキシ酸・0.5〜2%）は脂溶性のため皮脂・毛穴内部に浸透し、角栓溶解・ニキビ・毛穴の黒ずみに作用します（Cutis 2004 RCT n=60で2%×8週で過酸化ベンゾイルと同等の面疱減少が報告された）。\n\nグリコール酸（AHA・α-ヒドロキシ酸・5〜10%）は水溶性で角質層表面の細胞接着を弱め、ターンオーバー促進・色素沈着・光老化に作用します（Dermatologic Surgery 2001 RCT n=40で8%×22週でケラトーシス・くすみ・細かいシワの有意改善が報告された）。「毛穴の中に届くBHA」vs「角質表面に届くAHA」と覚えると整理しやすくなります。',
    },
    {
      q: 'BHAとAHAは併用できる？同じ夜に使ってOK？',
      a: '同じ夜の同時併用は刺激リスクが高く推奨されません。両者とも角質への作用が強いため、同時に使うと赤み・乾燥・皮むけが出やすくなります。推奨パターンは①朝晩で分ける（朝AHA・夜BHA、または夜のみ）、②曜日で分ける（月水金AHA・火木土BHA・日曜休み）、③朝晩スキンケアでバリア補強（ナイアシンアミド5%・セラミド・パンテノール）を組み合わせる、の3軸です。同時併用したい場合は週1回の低頻度から始め、肌の反応を見て頻度を上げる慎重な導入が王道です。',
    },
    {
      q: 'ニキビ・毛穴が気になるならどっち？',
      a: 'サリチル酸（BHA）2%が論文上の第一選択です。脂溶性のため毛穴内部の皮脂・角栓に直接届き、Cutis 2004 RCT（n=60）で2%×8週で過酸化ベンゾイルと同等のニキビ改善が報告されており、抗炎症作用もあるため赤ニキビにも対応します。Paula\'s Choice 2% BHA Liquid等の定番製品は20年以上のロングセラーで臨床実績豊富です。一方グリコール酸（AHA）も毛穴改善RCTはありますが、脂性肌・ニキビ繰り返し型ならBHAが王道で、AHAは「ニキビ＋色素沈着の重なり」を狙う場合に追加検討するのが現実的な順序です。',
    },
    {
      q: 'くすみ・光老化・色素沈着が気になるならどっち？',
      a: 'グリコール酸（AHA）5〜10%が論文上の第一選択です。水溶性で角質層全体に均一に作用し、ターンオーバーを促進してメラニン排出を加速します。Dermatologic Surgery 2001 RCT（n=40）では8%×22週でケラトーシス・くすみ・細かいシワの有意な改善が報告され、JCD 2019 RCT（n=60）では35%グリコール酸ピール（4週おきに3回）でMASIスコア（肝斑）の有意低下が確認されています。サリチル酸も30%高濃度ピールで肝斑改善RCTはありますが、市販濃度（0.5〜2%）では色素沈着・光老化への作用は限定的で、AHAが先行する領域です。',
    },
    {
      q: 'アスピリンアレルギーや妊娠中の使用は？',
      a: 'サリチル酸はアスピリンアレルギー・妊娠中・授乳中NGです。サリチル酸はアスピリン（アセチルサリチル酸）と同系統の化合物で、アスピリンアレルギーの方は外用でも禁忌、妊娠中は外用でも血中移行のリスクから国内外の皮膚科ガイドラインで使用を控える方針が一般的です。\n\nグリコール酸は妊娠中の使用について明確な禁忌は確立されていないものの、刺激リスクと光感受性増加を踏まえ低濃度（5%以下）・低頻度（週1〜2回）の慎重使用が安全側の判断です。妊娠中に角質ケアを行うなら、両者を避けてラクトビオン酸・乳酸（マイルドなAHA）・酵素洗顔等の代替路線が無難に安全です。最終判断は産婦人科医に確認してください。',
    },
  ],
  'niacinamide-vs-azelaic-acid': [
    {
      q: 'ナイアシンアミドとアゼライン酸の違いは？',
      a: '作用機序の幅と濃度域が異なります。\n\nナイアシンアミド（外用5%）はメラノソーム（メラニンを運ぶ袋）の表皮細胞への移送を抑え、バリア機能・色素沈着・毛穴・小じわの4方面に低刺激で作用します（Bissett 2005 RCT 5%×8週で色素沈着・小じわ改善が報告された）。\n\nアゼライン酸（外用10〜20%・穀物由来ジカルボン酸）はチロシナーゼ阻害（美白）＋抗炎症＋抗菌（P.acnes）の3作用を持ち、色素沈着・ニキビ・酒さの3軸に対応します（Archives of Dermatology 2006 RCT n=251で15%×12週で酒さ炎症性病変が有意に減少・JDT 2020 RCT n=40で20%×24週がハイドロキノン4%と同等の肝斑改善が報告された）。「表皮の汎用ケア（ナイアシンアミド）」vs「ニキビ＋色素沈着＋酒さの多機能（アゼライン酸）」の対比です。',
    },
    {
      q: 'ナイアシンアミドとアゼライン酸は併用できる？',
      a: '併用OK・むしろ補完関係で論文ベースに合理的です。経路が独立しており（ナイアシンアミド=メラノソーム転移＋バリア／アゼライン酸=チロシナーゼ＋抗炎症＋抗菌）、両者を同時に使うと「色素沈着＋ニキビ＋酒さの赤み＋バリア低下」を多面的にカバーできます。推奨パターン：朝＝ナイアシンアミド5%セラム＋日焼け止め、夜＝アゼライン酸15〜20%セラム→保湿クリーム、の朝晩分離が刺激緩和に有効です。同時併用する場合はナイアシンアミドが先、数分待ってアゼライン酸の順序で、初期2〜4週は週2〜3回からアゼライン酸を慣らしてください。',
    },
    {
      q: 'ニキビ・酒さの赤みが気になるならどっち？',
      a: 'アゼライン酸15〜20%が論文上で先行します。抗炎症＋抗菌（P.acnes）作用を併せ持つため、ナイアシンアミドより「ニキビ＋赤み」に対する直接効果が強く、Archives of Dermatology 2006 RCT（n=251）では15%×12週で酒さの炎症性病変が有意に減少（FDA承認の根拠試験）と報告されています。ナイアシンアミドも抗炎症作用はありますが、ニキビ・酒さへの直接的なエビデンスはアゼライン酸が上回ります。「ニキビ＋色素沈着の重なり」「酒さの赤みが気になる」が主訴ならアゼライン酸が王道な第一選択です。',
    },
    {
      q: '色素沈着・くすみ・バリア改善ならどっち？',
      a: 'ナイアシンアミド5%が初心者向け・アゼライン酸15〜20%が頑固な肝斑向けの使い分けが現実的です。ナイアシンアミドは低刺激で参入障壁が低く、Bissett 2005 RCTでバリア機能・色素沈着・毛穴・小じわの4方面に効果が報告されているため、まず4〜8週試して肌の落ち着きを確認するのが王道です。8〜12週評価して頑固な肝斑が残る場合にアゼライン酸15〜20%を夜に追加（JDT 2020 RCTで20%×24週がハイドロキノン4%と同等の肝斑改善）するステップが無難です。両者とも妊娠中も比較的安全な点でハイドロキノンの代替路線として有効です。',
    },
    {
      q: '効果が出るまでとコスパで結局どっち？',
      a: 'ナイアシンアミド5%単独から開始するのが王道な順序です。月コスト¥2,000〜5,000で参入障壁が低く、4〜8週で色素沈着・毛穴・小じわ・バリア改善が体感しやすい4拍子の汎用成分です。アゼライン酸は15〜20%濃度で月コスト¥2,800〜5,000程度、効果実感まで12〜24週とやや時間がかかりますが、ニキビ・酒さ・肝斑への直接効果が強い点が魅力です。「初心者・汎用ケア」ならナイアシンアミド、「ニキビ＋色素沈着＋酒さの多機能ケア」ならアゼライン酸、「両方の課題」なら朝ナイアシンアミド・夜アゼライン酸の併用が論文上の王道です。妊娠中もどちらも比較的安全な点でハイドロキノンより使いやすい代替路線です。',
    },
  ],
  'acetyl-l-carnitine-vs-creatine': [
    {
      q: 'アセチル-L-カルニチン（ALC）とL-カルニチンの違いは？',
      a: 'ALCはL-カルニチンにアセチル基が付加された誘導体で、血液脳関門を通過しやすい点が大きな違いです。L-カルニチンは脂質代謝（脂肪酸をミトコンドリアに運ぶ）が主な役割なのに対し、ALCは脳に届いて神経保護・認知機能への作用がRCTで示されています。「脳に届けたいならALC、運動・体組成目的ならL-カルニチン」が大まかな使い分けです。',
    },
    {
      q: 'アセチル-L-カルニチンとクレアチンの違いは？',
      a: '作用ターゲットが完全に異なります。ALC（1〜3g/日）は血液脳関門を通過して脳に届き、神経保護・認知機能・気分に作用します。クレアチン（モノハイドレート3〜5g/日）は筋肉細胞内でATP再合成を助け、筋力・パワー・除脂肪体重に作用します。脳 vs 筋という補完関係のため、目的が違えば両方を併用することも理論上問題ありません。',
    },
    {
      q: 'ALCとクレアチンは併用できる？',
      a: '作用メカニズムが異なるため、併用OKと考えられています。ALCは神経系・脳、クレアチンは骨格筋がメインターゲットで、相互に競合しません。実際のRCTで両者の同時投与による副作用増加は報告されていません。ただし腎機能に不安がある方は事前に医師相談を推奨します。',
    },
    {
      q: '効果が出るまでどれくらいかかる？',
      a: 'クレアチンは早く、ALCは遅めです。クレアチンはローディング（5〜7日間20g/日）を行えば1週間以内、通常摂取（3〜5g/日）でも3〜4週間で筋肉内クレアチン濃度が飽和し、筋力・パワーへの効果が出始めます。ALCは認知・気分への作用が報告されたRCTで多くが8〜12週間の介入期間で評価されています。',
    },
    {
      q: '女性が飲んでも効果はある？',
      a: 'クレアチンは女性へのエビデンスも豊富で、筋力・除脂肪体重・認知機能への効果がRCTで確認されています。「クレアチン＝男性向け」は誤解で、月経周期や閉経後の女性でも有効性が報告されています。ALCも女性向けRCTで気分・疲労感への作用が示されており、性別による有効性の大きな差は確認されていません。',
    },
  ],
  // ── Session F Day 3 バッチ 2026-05-12 ────────────────────────
  'vitamin-c-topical-vs-niacinamide': [
    {
      q: 'ビタミンC外用とナイアシンアミドの違いは？',
      a: '作用経路と濃度域が異なります。\n\nビタミンC外用（L-アスコルビン酸10〜20%・誘導体5〜15%）は抗酸化＋コラーゲン合成促進＋メラニン産生抑制の3経路で作用し、紫外線誘発の活性酸素・光老化に対する論文の厚みが特徴です（Pinnell 2001でL-アスコルビン酸15%が紫外線誘発酸化ストレスを有意に抑制・Humbert 2003 RCT n=20で5%×6ヶ月でしわ改善が報告された）。\n\nナイアシンアミド（外用5%）はメラノソーム転移阻害でメラニンの受け渡しを抑え、バリア機能・色素沈着・毛穴・小じわの4方面に低刺激で作用します（Bissett 2005 RCT 5%×8週で色素沈着・小じわ改善が報告された）。「攻めの抗酸化（VC）」vs「守りの汎用ケア（Nia）」の対比で覚えると整理しやすくなります。',
    },
    {
      q: 'ビタミンCとナイアシンアミドは同時併用すると効果が落ちる？',
      a: '現代の安定化処方ではほぼ問題ありません。「VC×Nia同時併用で活性低下する」議論は1960年代のin vitro実験（高温・高pH条件でナイアシンアミドがアスコルビン酸からニコチン酸に変換されて紅潮を起こす）に由来する古い指摘で、室温・通常の化粧品pHではこの反応はほぼ進行しません。市販でもVC＋Nia同時配合のセラム・化粧水が普及しており、近年のレビューでも「化粧品処方での実用上の効果阻害は確認されていない」と整理されています。気になる場合は朝VC・夜Niaの朝晩分離で問題は完全に回避できます。',
    },
    {
      q: '朝と夜、どちらにどれを使う？',
      a: '推奨パターン：朝＝ビタミンC外用＋日焼け止め（抗酸化シールド・紫外線でできた活性酸素を中和）。\n\n夜＝ナイアシンアミド5%＋保湿クリーム（バリア修復・ターンオーバー時の色素沈着・毛穴ケア）の朝晩スタックが現実的です。理由は、①VCは抗酸化が主作用のため紫外線曝露前の朝に置くと光保護に直結、②Niaはバリア・色素沈着ケアが主作用のため肌の修復タイミングである夜が機能的、③刺激リスクを朝晩で分離できる、の3点です。同時併用したい場合はVC→数分待ってNia→保湿の順序が無難です。',
    },
    {
      q: '妊娠中・授乳中はどちらが使える？',
      a: '両方とも妊娠中・授乳中も比較的安全とされ、皮膚科レビュー等で「妊娠中の使用に問題なし」と整理されています（ただし最終判断は産婦人科医に確認）。レチノール・ハイドロキノン・サリチル酸が妊娠中NG・慎重対応となる中、VCとNiaはいずれも催奇形性報告がなく、妊娠中の美白・くすみケアの第一選択肢です。L-アスコルビン酸高濃度（15〜20%）はpHが低く刺激が出やすいため、妊娠中は誘導体（アスコルビルグルコシド・APPS等の5〜10%）への切り替えやNia単独運用がより安全側の判断です。',
    },
    {
      q: '結局、初心者はどちらから始めるべき？',
      a: 'ナイアシンアミド5%単独から開始するのが無難な順序です。月コスト¥2,000〜5,000で参入障壁が低く、4〜8週で色素沈着・毛穴・小じわ・バリア改善が体感しやすい4拍子の汎用成分です。Bissett 2005のRCTで効果が確立しており、刺激ほぼなし・朝晩OK・妊娠中も比較的安全という3拍子で「失敗しない初手」として最適です。4〜8週評価して肌が落ち着いた段階でビタミンC外用（誘導体5〜10%→徐々にL-アスコルビン酸15%まで）を朝に追加するのが論文上の王道。「最初から両方併用」より「Niaで基盤を作ってからVCを足す」順序が刺激リスクと継続性の両面で合理的です。',
    },
  ],
  'hyaluronic-acid-vs-ceramide': [
    {
      q: 'ヒアルロン酸とセラミドの違いは？',
      a: '保湿の仕組みが完全に異なります。\n\nヒアルロン酸（外用ナトリウム塩0.1〜2%）は自重の最大1,000倍の水分を保持できる糖鎖で、角層〜表皮の含水量を即時に増やしてふっくら感・小じわ・乾燥感に作用します。\n\nセラミド（外用0.5〜2%）は細胞間脂質として皮膚バリアを構築し、水分蒸散（TEWL）を抑制して中長期の乾燥・敏感肌・アトピー素因に作用します（JDS 2017 RCT n=63で経口グルコシルセラミド40mg/日×12週で角層水分量・TEWL改善が報告された）。「水を吸い込むHA（吸水）」vs「水を逃がさないセラミド（バリア）」と覚えると整理しやすく、両者は補完関係です。',
    },
    {
      q: 'ヒアルロン酸とセラミドは併用できる？順番は？',
      a: '併用OK・むしろ論文ベースで強く推奨されます。「HAで吸い込み、セラミドで閉じ込める」の二段スタックが乾燥・小じわケアの王道で、市販でもHA＋セラミド同時配合の保湿クリームが普及しています。推奨順序：洗顔→化粧水（HA配合）→美容液→セラミドクリームで蓋をする、の流れが王道です。理由は、①HAは水溶性で水分と一緒に角層に届きやすい、②セラミドは油溶性でバリア膜を形成して水分逃げを抑える、③この順序で吸水→保湿閉じ込めが完結する、の3点です。',
    },
    {
      q: '低分子ヒアルロン酸と高分子ヒアルロン酸、どっちを選ぶ？',
      a: '目的別の使い分け：①低分子HA（5万〜30万ダルトン）は浸透型で角層〜表皮深部に届き、ふっくら感・小じわケアに作用。\n\n②高分子HA（100万〜200万ダルトン）は表面保護型で角層上に膜を作り、即時の保湿感・水分蒸散抑制に作用。\n\n③加水分解HA（数千〜数万ダルトン）はさらに浸透型で深部保湿を狙います。多くの市販製品は2〜3種類を複合配合しており、「複数分子量HA配合」と表記された製品を選ぶと表層〜深部までカバーできます。低分子のみは表面保護が弱く、高分子のみは深部保湿が弱いため、複合配合が論文上で合理的です。',
    },
    {
      q: '敏感肌・アトピー素因なら、どっちを優先すべき？',
      a: 'セラミド優先が現実的です。アトピー性皮膚炎・敏感肌・乾燥性皮膚炎の患者ではセラミド（特にセラミド3・セラミド6Ⅱ・セラミドAP等）の細胞間脂質が減少していることがJID等で確認されており、セラミド補給で皮膚バリアが回復して刺激物・アレルゲン侵入を抑える経路が論文上で支持されています。HAも保湿として有効ですが、バリア機能そのものの修復作用はセラミドが優位です。具体的にはセラミド配合クリーム（CeraVe・キュレル・ノブⅢ等）を朝晩使用し、HA配合化粧水・美容液をその前のステップに置く順序が王道です。',
    },
    {
      q: '経口ヒアルロン酸と経口セラミドは効く？外用との違いは？',
      a: '両者とも経口エビデンスは外用より限定的ですが、論文蓄積は進んでいます。\n\n経口HA（120〜240mg/日）は腸管で分解されて低分子断片として吸収されるルートが報告されており、JNH 2017 RCT n=60で食物由来HA120mg/日×12週で皮膚水分量改善が示されています。\n\n経口セラミド（米由来グルコシルセラミド40〜80mg/日）はJDS 2017 RCT n=63で角層水分量・TEWL改善が報告されており、外用と経口の併用で相乗効果を狙う設計が機能性表示食品でも普及しています。ただし外用直接アプローチほどの即時効果は期待できず、「外用が主・経口は補助」の位置づけが無難です。',
    },
  ],
  'arbutin-vs-kojic-acid': [
    {
      q: 'α-アルブチンとコウジ酸の違いは？',
      a: '同じチロシナーゼ阻害の美白経路ですが、効力と安全性プロファイルが異なります。\n\nα-アルブチン（外用2%）はハイドロキノンのα結合グルコシド誘導体で、ハイドロキノンを徐放しない安定構造のため刺激ほぼなし・長期使用可（Hamed 2020 RCTで2%×12週で色素沈着の有意改善が報告された）。\n\nコウジ酸（外用1〜2%）は麹菌由来の有機酸でチロシナーゼ阻害作用が強い反面、接触皮膚炎・刺激のリスクが報告されています（J Dermatol Sci 2007 メタ解析で肝斑改善が報告された）。「刺激なく長期継続したいアルブチン」vs「短期で強い効力のコウジ酸」の対比で覚えると整理しやすくなります。',
    },
    {
      q: 'コウジ酸は安全性に問題があると聞いたが、使って大丈夫？',
      a: '結論：現在は医薬部外品有効成分として承認継続中・通常使用範囲では安全と整理されています。経緯：2003年に厚労省でコウジ酸の発がん性懸念（ラット長期投与試験での肝腫瘍報告）から国内での化粧品配合が一時自粛されました。その後の追加試験・安全性評価で、ヒト皮膚への外用使用ではラット試験で見られた肝への作用は問題にならないと判断され、2006年に安全性が再確認されて医薬部外品有効成分としての承認が継続しています。\n\n通常の市販濃度（1〜2%）・適切な使用範囲では発がんリスクは確認されていないのが現在の公式評価です。気になる場合は安全プロファイルが確立されたα-アルブチン2%への切り替えも妥当な選択です。',
    },
    {
      q: 'α-アルブチンとコウジ酸は併用できる？',
      a: '理論上は併用可能ですが、両者ともチロシナーゼ阻害経路で同じ酵素を狙うため、相加効果は確認されていません。むしろ刺激リスクの蓄積が懸念されるため。\n\n経路が独立する成分との組み合わせ（α-アルブチン＋ナイアシンアミド／α-アルブチン＋トラネキサム酸／コウジ酸＋ナイアシンアミド等）の方が論文上で合理的です。同時併用する場合は朝アルブチン2%・夜コウジ酸1〜2%の朝晩分離で刺激リスクを分散させ、肌の反応を見て継続判断するのが安全です。',
    },
    {
      q: '効果が出るまでどれくらいかかる？',
      a: 'メラニン代謝サイクル（28〜56日）を考えると最低4〜12週が必要です。\n\nα-アルブチン2%は8〜12週で色素沈着の有意差（Hamed 2020 RCT 12週評価）。\n\nコウジ酸1〜2%は4〜12週で色素沈着・肝斑改善（メタ解析で多くのRCTが12週評価）が論文の目安です。「1週間使って効かないからやめる」は最大の失敗パターンで、両者とも継続性が最も重要です。最低3ヶ月続けてから効果を判定し、途中で肌荒れがあれば一時休止して再開もOKです。コウジ酸は接触皮膚炎が出やすい体質の方は週2〜3回の低頻度から導入してください。',
    },
    {
      q: '結局、どっちを選べばいい？',
      a: '初心者・長期継続志向ならα-アルブチン2%が王道な第一選択です。月コスト¥2,000〜4,000、刺激ほぼなし、妊娠中も比較的安全、Hamed 2020 RCTでエビデンス確立という4拍子で参入障壁が最も低い成分です。8〜12週評価して頑固な肝斑が残る場合にコウジ酸1〜2%を追加検討、またはアゼライン酸15〜20%・トラネキサム酸外用2〜5%・ハイドロキノン外用（皮膚科処方）といった経路の異なる成分への乗り換えが論文上の王道です。「いきなりコウジ酸高用量」より「アルブチンで基盤→必要なら他経路追加」の順序が安全とコスパの両面で合理的です。',
    },
  ],
  'ashwagandha-vs-l-theanine': [
    {
      q: 'アシュワガンダとL-テアニンの違いは？',
      a: '作用経路と時間軸が完全に異なります。\n\nアシュワガンダ（KSM-66/Sensoril 300〜600mg/日・インド原産ナス科）はHPA軸（視床下部-下垂体-副腎系）の調整経由でコルチゾールを低下させ、慢性ストレス耐性・睡眠の質・男性活力に8〜12週の累積効果で作用します（Salve 2019 RCT n=60でKSM-66 600mg/日×8週で血清コルチゾール有意低下が報告された）。\n\nL-テアニン（100〜200mg）は緑茶由来のアミノ酸で、GABA・α波増加で30〜60分後の即時リラックスに作用します（Hidese 2019 RCT n=30で200mg/日×4週で睡眠の質改善が報告された）。「累積ストレス耐性（アシュワガンダ）」vs「即時リラックス（テアニン）」の時間軸の対比で覚えると整理しやすくなります。',
    },
    {
      q: 'アシュワガンダとL-テアニンは併用できる？',
      a: '併用OK・むしろ二段スタックが現実的です。経路が独立（アシュワガンダ＝HPA軸調整／テアニン＝GABA・α波）で相互の効果を阻害せず、慢性ストレス対策（アシュワガンダ）と急性ストレス対策（テアニン）を同時に押さえる多軸アプローチが可能です。推奨パターン：朝食後にアシュワガンダ300mg（継続摂取で累積効果）＋ストレスフルなイベント前にテアニン200mg（即時リラックス）、または夜の食後にアシュワガンダ＋就寝1時間前にテアニンの組み合わせ。両者とも依存性・耐性形成のRCTでの強い報告はなく、ベンゾジアゼピン系睡眠薬と比べて翌朝の眠気残りも少ない傾向です。',
    },
    {
      q: '仕事中の緊張・面接前にはどっち？慢性ストレスにはどっち？',
      a: '急性ストレス（仕事中の緊張・面接前・プレゼン前・試験前）はL-テアニン200mgが論文上の第一選択です。経口摂取後30〜60分でα波増加・コルチゾール低下が始まり、当日のパフォーマンスに直結します。眠気を起こさず冷静さを保つため、運転前・仕事中でも使いやすい安全プロファイルです。\n\n慢性ストレス（睡眠の質低下・コルチゾール過剰・男性活力低下・燃え尽き感）はアシュワガンダKSM-66 300〜600mg/日が論文上の第一選択です。8〜12週の継続でコルチゾール低下・睡眠の質スコア改善が報告されており、累積効果でストレス耐性そのものを引き上げる位置付けです。両方ある場合は併用が無難です。',
    },
    {
      q: 'アシュワガンダの併用注意は？どんな人は飲めない？',
      a: '禁忌・併用注意が多い成分です。①妊娠中・授乳中NG（流産誘発の動物試験報告）、②自己免疫疾患（橋本病・関節リウマチ・多発性硬化症等）でTh1免疫を活性化する可能性、③SSRI・SNRI等の抗うつ薬で相加作用、④甲状腺薬（レボチロキシン）で甲状腺ホルモン上昇の報告、⑤降圧薬・血糖降下薬で過降下リスク、⑥肝疾患既往（稀に肝障害報告）、⑦ホルモン依存性疾患（前立腺がん・乳がん等）、が主な禁忌・併用注意項目です。テアニンは緑茶由来で禁忌・併用注意がほぼなく安全性が高い対照的なプロファイル。複数の併用注意が重なる方はテアニン単独から始めるのが論文上で安全です。',
    },
    {
      q: '初心者はどちらから始めるべき？月コストは？',
      a: '初心者はL-テアニン100〜200mg/日から始めるのが王道な順序です。理由は、①即時効果が体感しやすく続けやすい、②禁忌・併用注意がほぼなく安全プロファイル最強、③緑茶由来で食品成分として国内サプリ普及済み、④月コスト¥1,000〜2,500と低コスト、の4拍子です。4〜8週試して「慢性ストレス・睡眠の質低下・コルチゾール過剰の体感」が残る場合にアシュワガンダ KSM-66 300mg/日を夜の食後に追加（月¥1,500〜3,500）するのが論文上の王道。両方併用でも月¥2,500〜6,000で収まり、急性＋慢性の二軸ストレス対策が完成します。アシュワガンダは8〜12週評価が必須で、短期で「効かない」と判断するのは早すぎます。',
    },
  ],
  'ferulic-acid-vs-vitamin-c-topical': [
    {
      q: 'フェルラ酸とビタミンC外用の違いは？',
      a: '両者の関係は「対立」ではなく「シナジー」です。\n\nフェルラ酸（外用0.5〜1%）は米ぬか・小麦ふすま由来の植物性ポリフェノールで、単独でも紫外線吸収・抗酸化作用を持ちますが、論文蓄積の中心はビタミンCとビタミンEの安定化と効果倍増という補助役としての役割です。\n\nビタミンC外用（L-アスコルビン酸10〜20%・誘導体5〜15%）は抗酸化＋コラーゲン合成促進＋メラニン産生抑制の多経路で光老化対策の主役成分です。「主役のVC」と「VCを強化する脇役のフェルラ酸」と覚えると整理しやすく、フェルラ酸単独より「VC＋VE＋フェルラ酸」の三者スタックが論文上で合理的です。',
    },
    {
      q: 'SkinCeuticals C E Ferulicの根拠論文は？',
      a: 'Lin 2005（J Invest Dermatol）が代表的な根拠論文です。L-アスコルビン酸15%＋α-トコフェロール（VE）1%＋フェルラ酸0.5%の三者配合を豚皮膚に塗布、紫外線（UVB）照射後の紅斑・サンバーン細胞・チミンダイマー（DNA損傷指標）を測定し、VCとVE単独より三者配合で光損傷指標が顕著に低下することを報告しました。これがSkinCeuticals C E Ferulic（2005年発売）の処方根拠で、現在も世界中の皮膚科で「ゴールドスタンダードの抗酸化セラム」として位置付けられています。後続のヒト試験（Wu 2008等）でも色素沈着・光老化・肌のトーン改善が報告されています。',
    },
    {
      q: 'フェルラ酸単独で効果はある？',
      a: '単独効果のヒトRCTは限定的です。フェルラ酸は単独でも紫外線吸収（UVB領域）と抗酸化作用が in vitro で確認されていますが、外用ヒト試験のほとんどはVC・VEとの三者スタック評価で、単独使用の有効性については論文の厚みが薄いのが現状です。市販でも「フェルラ酸単独セラム」より「VC＋VE＋フェルラ酸」配合の抗酸化セラムが主流で、論文ベースでも単独使用は推奨されていません。「VCを使うならフェルラ酸を併用する」が現実的な結論です。',
    },
    {
      q: 'SkinCeuticals以外の選択肢は？コスパで比較すると？',
      a: 'SkinCeuticals C E Ferulic（30ml ¥21,000〜25,000）は高価帯のため、近年は同等処方の低価格代替品が普及しています。代表的な選択肢：①Maelove Glow Maker（米国・30ml ¥3,000〜4,000・VC15%＋VE1%＋フェルラ酸0.5%のSkinCeuticals処方クローン）、②Timeless Vitamin C+E Ferulic Acid Serum（米国・30ml ¥2,500〜3,500・iHerb等で取扱）、③国内ではロート製薬メラノCC・キールズパワフル-ストレングス-ライン-リデューシング・コンセントレート等のVC＋誘導体製品が低コスト。「処方そのものは公開技術」のため、安価な代替で十分に実用的な抗酸化シールドが構築できます。',
    },
    {
      q: 'フェルラ酸スタックの使い方とタイミングは？',
      a: '朝の最初のアクティブ成分として塗布→日焼け止めの順序が無難です。洗顔→化粧水（保湿）→VC＋VE＋フェルラ酸セラム3〜4滴を顔全体に押し込む→保湿クリーム→日焼け止め（SPF30以上・PA+++以上）の流れで、紫外線曝露前に抗酸化シールドを構築します。低pH（2.5〜3.5）のL-アスコルビン酸処方は刺激が出やすいため、敏感肌は朝晩→朝のみ→週3〜5回と頻度を下げて慣らしてください。レチノール・AHA/BHAとの同時使用は刺激蓄積で続けにくいため、朝VCスタック・夜レチノール（またはAHA/BHA）の朝晩分離が安全です。月コスト¥3,000〜8,000（SkinCeuticals以外）で抗酸化シールドが完成します。',
    },
  ],
  // ── Sprint 1 Session A Day 2 バッチ 2026-05-12 ────────────────
  'vitamin-c-oral-vs-vitamin-c-topical': [
    {
      q: '経口ビタミンCと外用ビタミンCの違いは？シミに効くのはどっち？',
      a: '作用部位と到達濃度が完全に異なります。経口ビタミンC（500〜1,000mg/日）の主な役割は免疫機能の維持・全身のコラーゲン合成・抗酸化サポートで、皮膚に到達する濃度は限定的です（血中飽和を超えた分は尿中排泄）。外用ビタミンC（純粋アスコルビン酸10〜20%・誘導体VCEthyl等）は皮膚に直接塗布してチロシナーゼを阻害しメラニン産生を抑える経路で、シミ・色素沈着への作用は外用が主役です。化粧品メーカー視点でも「経口だけでシミが消える」は過大評価で、論文ベースの結論は「外用主役・経口は土台サポート」の補完関係です。',
    },
    {
      q: '美肌・シミ目的ならまず外用？経口は不要？',
      a: '不要ではなく、役割分担です。シミ・美肌を主目的にするなら外用ビタミンC・ナイアシンアミド5%・トラネキサム酸外用・レチノールの組み合わせが論文上の現実解で、経口Cはこれを置き換えません。一方、経口は免疫機能・全身のコラーゲン合成・抗酸化を内側から支える土台ケアで、外用ケアとは独立した立て付けです。実用上は「朝に経口C 500mg＋外用ビタミンC＋日焼け止め」「夜に外用レチノール（時間を分ける）」のように両方を補完的に使うのが王道なパターンです。',
    },
    {
      q: 'シミ対策で経口ビタミンCサプリのおすすめは？',
      a: '',
    },
    {
      q: '経口と外用は併用OK？順番は？',
      a: '併用OKで、むしろ補完関係です。経路が完全に独立しているため相互干渉はありません。タイミングは①経口は朝晩2回に分割（水溶性で数時間で尿中排泄）、②外用は朝のスキンケアで化粧水→ビタミンC美容液→保湿→日焼け止めの順、というのが現実的です。外用ビタミンC（朝）と外用レチノール（夜）の同日併用はよく使われる組み合わせですが、両方を同時刻に塗ると刺激が強く出る可能性が指摘されているため、朝C/夜レチノールと時間を分けるのが定石です。',
    },
    {
      q: '脂性肌・ニキビ体質でも経口ビタミンCは意味ある？',
      a: '経口Cは皮脂酸化の間接サポートという文脈で意味はありますが、脂性肌・ニキビ体質の主因（皮脂分泌・毛穴詰まり・赤み）に直接働く成分は別系統です。論文ベースでは外用ナイアシンアミド5%（皮脂・毛穴・赤み）、サリチル酸（毛穴内部の角栓溶解）、外用レチノール（ターンオーバー促進）、亜鉛（経口で抗炎症）が主役で、経口Cは全身の抗酸化・コラーゲン合成サポートとして補助的に位置づけるのが現実的です。脂性肌で経口Cを優先するより、まず外用ナイアシンアミドと亜鉛経口（25〜30mg/日）から始めるのが現実的です。',
    },
  ],
  'folic-acid-vs-iron': [
    {
      q: '葉酸と鉄、妊活ではどちらが先？両方必要？',
      a: '両方必要で、薬理的相互作用は乏しく同時併用に問題ありません。葉酸（400〜800μg/日）はDNA合成・神経管閉鎖障害予防が主役で、妊娠前1ヶ月から妊娠初期3ヶ月の摂取が母子健康手帳・WHOで共通推奨です。鉄（18〜36mg/日）は赤血球ヘモグロビン合成・酸素輸送と疲労改善が主役で、月経のある女性・妊娠中期/後期は需要が増えます。妊活では女性は葉酸＋鉄＋ビタミンD＋亜鉛が論文上で検討されるベース構成で、男性は亜鉛＋CoQ10＋ビタミンE＋葉酸が精子の質への研究で取り上げられる組み合わせです。',
    },
    {
      q: '葉酸と鉄を同時に飲んでも吸収は問題ない？',
      a: '同時併用に問題はありませんが、吸収効率には違いがあります。葉酸は食事と一緒で吸収が安定、鉄は空腹時で吸収率が高い（ビタミンC併用で非ヘム鉄が2〜3倍向上）が原則で、同じ食事で両方を飲むと葉酸◯・鉄△の中間になります。実用上は「朝食と一緒に葉酸＋ビタミンC＋鉄」を一括で飲む層が多く、消化器症状が出る場合のみ鉄を別時間にずらす形が現実的です。コーヒー・紅茶・牛乳と鉄の同時摂取は鉄の吸収を阻害するため、前後1〜2時間は離してください。',
    },
    {
      q: '妊婦用総合サプリ（ピジョン・ベルタ・エレビット）と単独サプリどっちがいい？',
      a: '①管理のしやすさを取るなら妊婦用総合サプリ、②形態や用量を細かく調整したいなら単独サプリ、という選び分けです。市販（ドラッグストア）のピジョン葉酸タブ・ベルタ葉酸・エレビット等は葉酸・鉄・ビタミンD・カルシウム・B群などが妊婦用基準で配合されており、まとめて摂れる利点があります。一方、MTHFR遺伝子多型を意識して活性型5-MTHFを選びたい・鉄をグリシン酸キレート（Ferrochel）に絞りたい場合はiHerb等の単独サプリ（Doctor\'s Best Fully Active Folate 400μg＋NOW Iron 36mg等）の組み合わせが現実的です。両方を併用する場合は葉酸合計1,000μg/日・鉄合計60mg/日を超えないよう注意してください。',
    },
    {
      q: '不妊治療中の葉酸と鉄はどう摂れば良い？',
      a: '女性の不妊治療中は葉酸400〜800μg/日の継続が一般的で、活性型5-MTHFを選ぶか、MTHFR多型の遺伝子検査を受けて判断する流れが増えています。鉄はフェリチン値で判断し、12〜30ng/mLの潜在的鉄欠乏層では27〜36mg/日を3〜6ヶ月継続が目安。男性の妊活では葉酸単独より「亜鉛・CoQ10・ビタミンE・葉酸」のセットで精子の質（運動率・DNA損傷）に対する研究があり、葉酸はDNA合成の補酵素として精子形成にも関与すると整理されています。ただしサプリは生殖医療・産婦人科・泌尿器科の診断と並行して位置づけ、自己判断で完結させないのが現実的です。',
    },
    {
      q: '葉酸と鉄、効果が出るまでの期間は？',
      a: '効果指標と期間が異なります。葉酸はホモシステイン値の低下が4〜8週で確認可能・神経管閉鎖障害予防は受精後21〜28日までの妊娠初期の摂取が決定的・認知機能改善はメタ解析で3〜6ヶ月評価。鉄はヘモグロビン値の改善が2〜4週、フェリチン（貯蔵鉄）の回復が3〜6ヶ月、疲労感・集中力の改善はフェリチン20〜30ng/mLを超えるあたりから自覚（CMAJ 2012 RCTでは12週で疲労有意改善）。「1〜2週間で効果がない」と判断するのは早すぎで、最低3ヶ月は継続してから効果を判定するのが論文上の現実解です。',
    },
    {
      q: '妊活鉄葉酸の併用タイミングは？妊娠前から妊娠初期・中期・後期でどう変える？',
      a: '妊娠ステージ別に整理できます。【A：妊娠前3-6ヶ月前から妊活期】葉酸400μg/日（モノグルタミン酸型 or 5-MTHF活性型）＋鉄はフェリチン値で判断。フェリチン12-30ng/mL未満の潜在的鉄欠乏層は鉄キレート（Ferrochel）18-36mg/日を3-6ヶ月で予備備蓄。神経管閉鎖障害予防の臨界期は妊娠4週までで、本人が妊娠に気付く前の時期に予防が必要なため3-6ヶ月前からの開始が論文上で現実的。【B：妊娠初期（〜13週・つわり期）】葉酸400-800μg/日継続。鉄は需要が大きく増えるが、つわりで硫酸鉄系の消化器症状が出やすい時期。ビスグリシン酸鉄キレート（Ferrochel）への切り替え・分割服用・食後服用で継続性を確保。MegaFood Blood Builder等のフードベース鉄が支持される層も多い。【C：妊娠中期（14-27週）】鉄需要が最大化（循環血液量増加＋胎児へ供給）。食事摂取基準で妊婦中期・後期+8-9mg/日追加推奨。妊婦用総合サプリ（ピジョン・ベルタ・エレビット）の鉄＋葉酸ベース＋単独鉄サプリで合計27-36mg/日が現実的。【D：妊娠後期-産後】鉄補給継続・授乳期も鉄需要が高い。葉酸は妊娠初期ほど決定的ではないが妊婦用総合サプリでの継続が一般的。【E：男性妊活】葉酸400μg/日＋亜鉛＋CoQ10＋ビタミンEのセットを6ヶ月以上継続（精子形成サイクルは約74日）。鉄は通常男性に予防的補充は推奨されず、疲労症状あればフェリチン検査から判断。【F：タイミング】葉酸は食事と一緒、鉄は空腹時＋ビタミンCで吸収最大。実用上は「朝食と一緒に葉酸＋ビタミンC＋鉄」一括が継続性で優位です。',
    },
    {
      q: '葉酸と鉄、副作用と注意点の違いは？妊娠中の上限は？',
      a: '葉酸と鉄は副作用プロファイルが異なります。【葉酸の副作用・注意点】①1mg（1,000μg）/日超の長期摂取でビタミンB12欠乏を血液検査上隠す可能性が指摘される（NIH ODS UL 1,000μg/日）、②抗てんかん薬（フェニトイン）服用中は薬物血中濃度低下のリスクで医師相談、③メトトレキサート治療中は用途で併用可否が変わる（関節リウマチ＝副作用軽減で併用OK・抗がん＝効果減弱の可能性で医師判断）、④妊娠中の上限は1,000μg/日が安全側で、妊婦用総合サプリと単独サプリ併用時に超過しないよう注意。【鉄の副作用・注意点】①消化器症状（便秘・下痢・腹痛・吐き気）が硫酸鉄系で出やすく、ビスグリシン酸鉄キレート（Ferrochel）で大幅軽減、②黒色便は鉄の酸化による色調変化で病的ではない、③鉄過剰症（ヘモクロマトーシス）・サラセミアの方は禁忌、④妊娠中の鉄サプリは食事摂取基準で妊婦中期・後期+8-9mg/日推奨で総合サプリ含めて60mg/日以下が現実的、⑤男性・閉経後女性は鉄予防的補充は原則推奨されず、フェリチン低値が確認された場合のみ。【共通注意】両者とも妊娠中の使用は産科医・助産師の指導下が原則で、自己判断で複数サプリ併用は避ける。妊婦用総合サプリ（ピジョン・ベルタ・エレビット）と単独サプリの組み合わせ時は配合量重複に注意してください。',
    },
  ],
  'folic-acid-vs-vitamin-b12': [
    {
      q: '葉酸とビタミンB12は併用すべき？',
      a: '併用が推奨されます。両者はメチル化サイクル（ホモシステイン → メチオニン）で連動する補完関係で、片方だけでは代謝が回りません。葉酸の5-MTHFがメチル基をホモシステインに供与し、B12はその反応に補酵素として必須です。葉酸を1mg/日超で長期摂取するとB12欠乏の血液所見（巨赤芽球性貧血）を隠す可能性が指摘されており、神経症状（しびれ・歩行障害）が進行してから発見されるリスクがあるため、認知機能・ホモシステイン低下を目的とする中年層は活性型5-MTHF＋メチルB12のセットが無難です。',
    },
    {
      q: 'MTHFR遺伝子多型がある人はどう選ぶ？',
      a: '日本人の約10〜15%にはMTHFR遺伝子多型（C677T）があり、通常の葉酸（プテロイルモノグルタミン酸）を活性型5-MTHFに変換する酵素活性が低い体質とされます。この層は活性型5-MTHF（Quatrefolic／Metafolin等）＋活性型B12（メチルコバラミン or アデノシルコバラミン）のセットを選ぶ意義が大きくなります。Doctor\'s Best Fully Active Folate 400μg＋Jarrow Methyl B-12 1,000μg／Thorne Methyl-Guard等が代表的な選択。MTHFR検査は自費の遺伝子検査で受けられますが、検査をしなくても活性型を選ぶ「念のため戦略」も現実的です。',
    },
    {
      q: '認知機能・ホモシステイン目的でどっちを優先？',
      a: '優先ではなく両方が推奨されます。Ageing Research Reviews 2016 メタ解析 n=2,398では葉酸補充で認知機能スコアとホモシステイン値が有意改善（特に高齢者で顕著）と報告されていますが、メチル化サイクルにはB12も必須で、B12不足のままでは葉酸単独の効果が薄れます。臨床的にはホモシステイン代謝にB6も関わるため、活性型5-MTHF＋メチルB12＋P-5-P（活性型B6）の3点セットで使う層も多いです。ホモシステイン値が高めと指摘された方は、サプリ前に医療機関でB12・葉酸の血中濃度を確認するのが安全側です。',
    },
    {
      q: 'B12不足になりやすい人は？',
      a: '①厳格なベジタリアン・ヴィーガン（B12は動物性食品由来が中心）、②PPI（プロトンポンプ阻害薬・タケキャブ/ネキシウム等）長期服用者（胃酸減少で食事B12の遊離が低下）、③メトホルミン長期服用者（B12吸収低下が報告されている）、④胃切除既往・萎縮性胃炎の方（内因子分泌低下）、⑤65歳以上（吸収効率の加齢低下）が代表例です。これらの層はメチルB12 500〜1,000μg/日のサプリ補充が論文上で推奨され、舌下錠（吸収経路が胃を経由しない）も選択肢になります。',
    },
    {
      q: '葉酸とB12の高用量で副作用はある？',
      a: '葉酸は1mg（1,000μg）/日超の長期摂取でB12欠乏を血液検査上隠す可能性が指摘されており、神経症状が進行してから発見されるリスクがあります。B12は水溶性で過剰分は尿中排泄されるため、5,000μg/日程度でも明確な毒性は報告されていませんが、高用量の継続的な意義は限定的です。実用的な目安は葉酸400〜800μg/日＋B12 500〜1,000μg/日で、高用量を検討する場合は血液検査と医師相談を前提に進めてください。',
    },
    {
      q: 'メチル葉酸（5-MTHF）とシアノコバラミン・メチルコバラミン・アデノシルコバラミンの違いは？活性型B12の選び分けは？',
      a: 'メチル葉酸と活性型B12の組み合わせは、メチル化サイクルの全体最適で考えるのが王道です。【A：葉酸の形態】①プテロイルモノグルタミン酸（合成型・市販主流・MTHFR野生型では問題なし）vs ②5-MTHF活性型（Quatrefolic®・Metafolin®・MTHFR多型保有層で変換不要）。Pietrzik 2010 Clin Pharmacokinet で5-MTHF活性型はMTHFR TT型でモノグルタミン酸型より生物学的利用率が安定。【B：B12の形態】①シアノコバラミン（Cyanocobalamin・最も安価で安定・体内でメチルB12/アデノシルB12に変換必要・喫煙者で変換効率低下の議論あり）、②メチルコバラミン（Methylcobalamin・活性型・神経系-メチル化サイクル直接利用・Jarrow Formulas Methyl B-12 1,000μg等で標準）、③アデノシルコバラミン（Adenosylcobalamin・活性型・ミトコンドリア機能-エネルギー代謝・Source Naturals Coenzymated B-12等で選択可能）、④ヒドロキソコバラミン（Hydroxocobalamin・医療用注射で主流・経口は限定的）。【C：選び分け】①MTHFR多型保有層・認知機能/ホモシステイン目的＝5-MTHF活性型400-800μg＋メチルコバラミン1,000μg、②疲労・エネルギー代謝重視＝5-MTHF＋アデノシルコバラミン（Thorne Methyl-Guard Plus・Designs for Health等のセット品も選択肢）、③コスパ重視・MTHFR多型なし＝モノグルタミン酸型400μg＋シアノコバラミン1,000μg。【D：併用】Thorne Methyl-Guard Plus（5-MTHF + メチルコバラミン + アデノシルコバラミン + P-5-P + リボフラビン-5\'-リン酸の活性型B群コンボ）が中年層のメチル化サポート目的で支持される設計です。',
    },
    {
      q: 'MTHFR遺伝子多型がある人＋ベジタリアン/ヴィーガンはどうサプリ設計する？併用注意は？',
      a: 'MTHFR遺伝子多型保有層×ベジタリアン/ヴィーガンは葉酸×B12両方のリスクが重なる層で、論文ベースで丁寧な設計が必要です。【A：リスクの重なり】①MTHFR C677T TT型（日本人約10-15%）は葉酸代謝の酵素活性が低下、②ベジタリアン/ヴィーガンはB12が動物性食品由来中心のため食事性欠乏リスクが高い、③両方が重なるとメチル化サイクル（ホモシステイン → メチオニン）が二重に詰まり、心血管・神経・認知のリスクが集約される構造。【B：基本セット】5-MTHF活性型葉酸400-800μg/日＋メチルコバラミン1,000μg/日（舌下錠推奨）が論文上の第一選択。Doctor\'s Best Fully Active Folate 400μg（月¥500）＋Jarrow Formulas Methyl B-12 1,000μg 舌下錠（月¥500）の組み合わせで合計月¥1,000前後の継続コスト。【C：追加検討】①P-5-P（活性型ビタミンB6・ホモシステイン代謝の補酵素）25-50mg/日、②ホモシステイン血液検査（基準値<15μmol/L目安）で経過確認、③ベタイン（TMG・トリメチルグリシン）500-1,000mg/日で代替メチル化経路サポート。【D：併用注意】①SSRI/SNRI/MAOI服用中は5-MTHFのセロトニン代謝への影響でセロトニン症候群理論リスクで医師相談、②抗てんかん薬（フェニトイン）服用中は葉酸補充で薬物血中濃度低下のリスク、③メトトレキサート治療中は用途で併用可否判定、④妊娠中はMTHFR遺伝子検査＋活性型サプリの選択を産科医・遺伝カウンセラーと相談。【E：検査タイミング】MTHFR遺伝子検査（自費5,000-30,000円）＋ホモシステイン血液検査（自費2,000-5,000円）の組み合わせで「念のため活性型」か「検査ベースの確実な選択」かを判断できます。',
    },
    {
      q: 'メトホルミン・PPI（胃酸抑制薬）長期服用中の葉酸とB12補充は？薬を飲んでいる場合の論文ベース対策を教えてください',
      a: 'メトホルミン・PPI長期服用者はB12欠乏リスクが論文上で明確に上昇するため、葉酸＋B12の補充設計が薬剤併用パターン別に変わります。\n\n①メトホルミン服用中（糖尿病治療）：de Jager 2010 BMJ RCT n=390（メトホルミン850mg×3回/日×4年）で血清B12が−19%有意低下、欠乏率約30%（対照群12%）。Aroda 2016 J Clin Endocrinol Metabメタ解析（n=2,155）でも長期メトホルミン服用でB12欠乏オッズ比2.09倍。機序は回腸でのカルシウム依存的B12能動吸収阻害。\n\n対策：メチルコバラミン1,000μg/日舌下錠（Jarrow Formulas月¥500・Solgar Methylcobalamin月¥900）＋ホモシステイン代謝サポートで5-MTHF活性型葉酸400μg/日（Doctor\'s Best Fully Active Folate月¥500）の組み合わせ、合計月¥1,000前後。\n\n②PPI/H2ブロッカー長期服用中（GERD・胃食道逆流症治療）：Lam 2013 JAMA症例対照研究（n=25,956）でPPI 2年以上服用でB12欠乏オッズ比1.65倍。機序は胃酸抑制による食物中B12遊離阻害で。\n\nサプリのフリー型B12は影響が小さい点が選び方の重要ポイント。対策はメトホルミン同様にメチルコバラミン1,000μg/日舌下錠＋5-MTHF葉酸400μg/日。\n\n③メトトレキサート治療中（関節リウマチ・自己免疫疾患）：葉酸補充は標準治療で、メトトレキサート服用日を避けた他の曜日に葉酸5mg/日処方が論文上。B12欠乏リスクも同時にあるためメチルB12も併用検討（リウマチ専門医相談前提）。\n\n④抗てんかん薬（フェニトイン・カルバマゼピン・バルプロ酸）服用中：葉酸代謝阻害で巨赤芽球性貧血リスク。葉酸補充で抗てんかん薬の血中濃度が低下する相互作用があるため、用量調整は神経内科医相談前提（自己判断NG）。\n\n⑤継続検査と判定：メトホルミン/PPI長期服用者は年1〜2回の血清B12（基準値233〜914pg/mL）＋ホモシステイン（基準値<15μmol/L）測定が現実的。200pg/mL未満ならメチルマロン酸併用評価。\n\n重症B12欠乏のサイン＝末梢神経障害（手足のしびれ）・認知機能低下・うつ症状・舌の炎症・歩行障害は神経症状が不可逆化する前に内科・神経内科受診の入り方。\n\nメトホルミン・PPI・抗てんかん薬・メトトレキサートは自己判断中止NG（基礎疾患管理が優先）で、サプリ補充で対応するのが現実解です。',
    },
  ],
  'vitamin-d-vs-calcium': [
    {
      q: 'ビタミンDとカルシウムは併用すべき？',
      a: '骨密度・骨折予防の観点で併用が標準です。NEJM 2006 Women\'s Health Initiative RCT n=36,282では、カルシウム1,000mg＋D 400IU併用群で骨密度維持・骨折リスク低下が確認されました。ビタミンDは腸管でのカルシウム吸収を促進する役割、カルシウムは骨・歯の主要構成成分で神経伝達・筋収縮にも必須、と補完関係にあります。日本人は慢性的なカルシウム不足傾向、ビタミンDも室内勤務・日焼け止め使用で不足しやすく、両者を食事から十分摂りにくい現実があるためサプリ補完の意義が大きい組み合わせです。',
    },
    {
      q: '骨粗鬆症予防にD単独？それとも併用？',
      a: '中高年で骨粗鬆症予防を本気で考えるなら、D3＋カルシウム＋K2（MK-7）の3点セットが論文上の現実解です。ビタミンDだけではカルシウムが不足、カルシウムだけでは骨へ配分されず血管に沈着するリスク（カルシウム単独高用量の心血管リスク議論）、K2はカルシウムを骨へ配分し血管壁への沈着を抑える役割を担うとされています。市販でD3+K2セット、またはThorne D3+K2、Sports Research D3+K2 が代表的選択。骨粗鬆症治療中はビスホスホネート等の処方薬と並行することが多く、サプリは主治医と相談のうえ位置づけてください。',
    },
    {
      q: 'カルシウムを単独高用量で飲むのは危険？',
      a: '一部の議論があり、慎重に進める領域です。Bolland 2010 BMJ メタ解析ではカルシウム単独補充（500mg超）で心血管イベントリスク増加が示唆され、その後の議論で「Dとセットで摂る」「K2を併用する」方向に推奨が変わってきた経緯があります。日本のカルシウム摂取量は推奨を下回るため食事からの不足分を補う意義はありますが、500mg/日を超える単独高用量は心血管リスクを意識して避けるか、D3・K2併用が安全側の選択です。',
    },
    {
      q: '妊娠中・授乳中はどう摂る？',
      a: '妊娠中のビタミンDは1,000〜2,000IU/日が一般的な推奨で、欠乏が確認されている場合は4,000IU/日までを医師の管理下で使うケースもあります。カルシウムは食事摂取基準で妊娠中は650mg/日（非妊娠時と同じ）、授乳中は650mg/日が目安ですが、平均摂取量が下回るため食事＋サプリで補完するのが現実的です。妊婦用総合サプリにD・カルシウム両方が配合されているか、配合量が十分かを確認し、不足分を単独サプリで補う形が現実的で、産科医の指示下で進めるのが原則です。',
    },
    {
      q: '骨粗鬆症の薬を飲んでいるけどサプリ追加していい？',
      a: '自己判断はNG・必ず主治医に相談してください。骨粗鬆症治療中はビスホスホネート（アレンドロン酸等）・テリパラチド・デノスマブ等が処方され、ビタミンD・カルシウムは骨折リスク低減のサポートとして併用されるのが標準です。一方、副甲状腺機能亢進症の方・既に活性型ビタミンD製剤（アルファカルシドール・カルシトリオール）を処方されている方が市販D3＋カルシウムを追加すると高カルシウム血症のリスクが上がります。チアジド系利尿薬との併用でもカルシウム値の確認が必要です。',
    },
  ],
  // ── Session F Day 4 バッチ 2026-05-12（antiaging/stress/energy 既存pair 強化デー） ────
  'nmn-vs-nicotinamide-riboside': [
    {
      q: 'NMNとNR（ニコチンアミドリボシド）の違いは？',
      a: '両者ともNAD+前駆体ですが、構造・経口安定性・特許状況が異なります。\n\nNR（ニコチンアミドリボシド）はChromaDex社の特許成分Niagen®として実用化された分子で、経口で胃酸に対し安定で消化管・血中NAD+上昇が複数RCTで確認されています（Martens 2018 Nat Commun n=24で500mg×2/日6週で血中NAD+用量依存的上昇）。\n\nNMN（ニコチンアミドモノヌクレオチド）はNRよりさらに1ステップNAD+に近い前駆体ですが、経口時に胃酸でほぼ分解されNRに変換されるという議論があり、剤形は粉末・舌下・カプセルと多様です。Yoshino 2021 Science RCT n=25 250mg/日10週で閉経後肥満女性の骨格筋インスリン感受性改善が報告されました。「経口安定性とヒトRCT蓄積はNRが先行、Sinclair陣営のNMN推しと業界が二分」が現状の論文評価です。',
    },
    {
      q: 'NMNとNR、どちらから始めるべき？コスパで選ぶなら？',
      a: '論文ベースのコスパ優位はNR（Tru Niagen 300mg/日 月¥3,500前後）が圧倒的です。Conze 2019 Sci Rep RCT n=140 8週で血中NAD+用量依存的上昇が確認され、長期安全性試験データもChromaDex社が蓄積中。NMNは¥6,000-12,000/月とコストが2-4倍高く、ヒトRCTは2020年以降の集中蓄積で歴史が浅めです。\n\n「論文の厚み × 月コスト」で見るとまずNRから8-12週試し、効果指標（血中NAD+検査・主観疲労）で判断、不満があれば舌下NMNを追加検討する順序が無難です。「ChromaDex特許の独占構造を避けたい」「最新の研究を追いたい」ならNMNから始める選択も合理的で、両者とも血中NAD+上昇は確認されています。',
    },
    {
      q: 'NMNとNRは併用できる？効果は加算される？',
      a: '理論上は併用可能で安全性も高いですが、加算効果は限定的という現状評価です。両者とも最終的にNAD+に変換される経路を共有するため、片方を上限まで摂取した後にもう片方を追加しても血中NAD+の追加上昇は頭打ちになる可能性が高いです。Damgaard 2023 systematic reviewでも「NMN/NR両者ともNAD+前駆体として有効・両者の臨床アウトカム差は限定的」と評価されています。\n\n現実的には片方を選んで8-12週評価が論文上で合理的で、両方併用しても副作用は増えませんがコストは¥10,000/月超になりやすく、その予算は他のサプリ（CoQ10・オメガ3・マグネシウム）に分散する方が王道です。',
    },
    {
      q: 'NMN・NRは何歳から始めるべき？効果指標は？',
      a: '推奨開始年齢は30代後半-40代以降が論文上の目安です。Massudi 2012 PLoS One で組織NAD+は20代で最高値、30代から低下開始、50代で20代の半分前後まで下がる縦断研究が報告されています。効果指標は①血中NAD+測定（NR 8-12週で用量依存的上昇）、②主観的疲労・睡眠の質（個人差大）、③臨床アウトカム（インスリン感受性・血圧・歩行速度等のヒトRCTで報告された指標は限定的）。「老けて見えなくなる」「寿命が延びる」等の体感的・長期的効果は現状のヒトRCTでは確立しておらず、Damgaard 2023 systematic reviewが「臨床アウトカム有意差は限定的」と慎重評価。\n\n8-12週で血中NAD+も主観効果も変化ゼロなら撤退判断も合理的です。',
    },
    {
      q: 'NMN・NRの副作用と併用注意は？スタチンや抗凝固薬と一緒に飲める？',
      a: 'ヒトRCTで報告された副作用は軽微で（消化器症状・頭痛・潮紅が稀）、致死的有害事象の報告はほぼありません。Conze 2019 Sci Rep ではNR 1,000mg/日まで8週で良好な忍容性が確認されています。\n\n併用注意：①ニコチン酸誘導体（ナイアシン高用量）と同時併用で皮膚潮紅が増える可能性、②糖尿病治療薬との併用ではYoshino 2021でインスリン感受性改善が報告されており血糖モニタリング推奨、③スタチン・抗凝固薬との直接的な薬物相互作用の強い報告は現状ありませんが、長期の心血管イベントへの影響は研究中。\n\n妊娠中・授乳中の安全性は未確立で、避けるべき領域です。がん治療中・自己免疫疾患の方は、NAD+はDNA修復にも関わるため担当医に確認が安全です。',
    },
  ],
  'melatonin-vs-magnesium-glycinate': [
    {
      q: 'メラトニンとマグネシウム グリシン酸塩の違いは？',
      a: '作用経路が完全に異なります。\n\nメラトニン（0.5〜3mg）は脳の松果体から分泌される睡眠ホルモンを直接補充する形で、生体時計のリセット・入眠潜時の短縮に作用します（Cochrane 2002 メタ解析 n=1,200で時差ぼけ症状の有意改善・PLOS ONE 2013 メタ解析 n=1,683で入眠潜時平均7.06分短縮）。\n\nマグネシウム グリシン酸塩（200〜400mg/日）はGABA系・NMDA受容体の調整・神経筋接合部のリラックス・コルチゾール低下に作用します（Abbasi 2012 RCT n=46 高齢者500mg/日8週でPSQI改善）。「眠りそのものを起こす（メラトニン）」vs「全身のリラックスで眠りに入りやすくする（MgGly）」と覚えると整理しやすく、競合関係ではなく補完関係です。なお日本ではメラトニンは医薬品扱いでサプリ流通なし・個人輸入は自己責任です。',
    },
    {
      q: 'メラトニンとマグネシウム グリシン酸塩、どちらから始めるべき？',
      a: '推奨順序：まずマグネシウム グリシン酸塩200〜400mg/日から試すのが現実的です。理由は、①日本国内で普通にサプリとして購入できる（Doctor\'s Best・NOW Foods・iHerb常備）、②副作用が軽微（過剰摂取で軟便程度・腎機能正常者では安全性高い）、③睡眠だけでなく筋緊張・脚のむずむず・偏頭痛・便秘予防など多面的に効くため投資効率が高い、の3点です。MgGly 4-8週試して「寝つきの不安は減ったが明け方覚醒が残る」「時差ぼけ・交代勤務で生体時計がずれている」場合にメラトニン0.3〜0.5mgを追加検討する流れが無難です。「概日リズム障害が主訴」ならメラトニンから入る選択も合理的ですが、日本では個人輸入前提という制度的ハードルがあります。',
    },
    {
      q: 'メラトニンとマグネシウム グリシン酸塩は併用できる？タイミングは？',
      a: '併用OKです。作用経路が独立（メラトニン＝松果体ホルモン補充・概日リズム／MgGly＝GABA系・神経筋リラックス）で、相互の効果を阻害しません。推奨タイミング：①就寝1時間前にMgGly 200-400mg（全身リラックス導入）、②就寝30分前にメラトニン0.5〜1mg（入眠アンカー）の二段スタックが王道です。両方とも依存性・耐性形成のRCTでの強い報告はありませんが、メラトニン側はSSRI（特にフルボキサミン）併用で血中濃度が最大17倍に上昇する報告があるため、抗うつ薬服用中は医師相談が必須です。MgGlyはテトラサイクリン・フルオロキノロン系抗生物質・ビスホスホネート・甲状腺薬と2-3時間ずらして摂取してください。',
    },
    {
      q: '日本でメラトニンはどう扱うべき？個人輸入は安全？',
      a: '本サイトは個人輸入を推奨する立場ではなく、規制差を事実として提示します。\n\n日本では2025年現在、メラトニンは医薬品（睡眠導入剤類縁）扱いで、ロゼレム（ラメルテオン）等のメラトニン受容体作動薬が処方薬として流通しています。サプリとしての国内流通はなく、入手ルートは原則iHerb等の海外通販による個人輸入で「自己責任」のグレーゾーンです（違法ではないが推奨できる立場ではない）。米国ではメラトニンはDSHEA法下のサプリとして大量流通しており規制差が大きい成分です。\n\n現実的な代替策：①国内処方薬ラメルテオン（医師相談）、②MgGly+グリシン+L-テアニンの国内サプリ3点で睡眠の質を底上げ、③概日リズム障害には光療法（朝の自然光・夜のブルーライトカット）と起床時刻固定が論文上。',
    },
    {
      q: 'メラトニンとマグネシウム グリシン酸塩、副作用とコスパは？',
      a: 'コスパはMgGly（Doctor\'s Best Glycinate 200mg 月¥1,400・NOW Foods Glycinate 月¥1,400-1,800）が圧倒的で、睡眠だけでなく多面的（偏頭痛予防・脚のむずむず・便秘予防・運動回復）に効くため投資効率が高いです。メラトニン（iHerb 1mg製品 月¥800-2,000）は効果実感の速さに対しコスパ良好ですが、日本では個人輸入前提です。\n\n副作用比較：MgGlyは過剰摂取で軟便程度・腎機能正常者では安全性高い（腎不全患者は高マグネシウム血症リスクで医師相談）、メラトニンは翌朝のだるさ（用量0.3-0.5mgまで下げれば軽減）・グミ製品で過剰摂取しやすい・小児は内分泌系への長期影響データが限定的で避けるべき領域。\n\n化粧品メーカー視点では慢性睡眠不足→コルチゾール上昇→皮膚バリア低下・糖化加速のループ視点で、まずMgGlyで睡眠の土台を整えるのがスキンケアの基本戦略として妥当です。',
    },
  ],
  'coq10-vs-pqq': [
    {
      q: 'CoQ10とPQQの違いは？',
      a: 'ミトコンドリアでの役割が完全に異なる補完関係です。\n\nCoQ10（コエンザイムQ10 100〜300mg/日）はミトコンドリア電子伝達系の電子運搬体（複合体IとIIから複合体IIIへ電子を渡す役割）で。\n\n既存ミトコンドリアの稼働・ATP産生・抗酸化に直接関与します（Mortensen 2014 JACC Heart Fail Q-SYMBIO RCT n=420 300mg/日2年で慢性心不全の主要心血管イベント有意減）。\n\nPQQ（ピロロキノリンキノン 10〜20mg/日）はPGC-1αを活性化してミトコンドリアの新規生合成（増やす方向）に関わるとされる独立軸の成分です（Stites 2006 Mol Aspects Medで動物実験ベースの機序評価が中心、Hosoe 2007 Daiichi Pharma単盲検試験 n=17 20mg/日12週で疲労・睡眠スコア改善報告）。「電子を運ぶ（CoQ10）」vs「ミトコンドリアを増やす（PQQ）」の役割分担と覚えると整理しやすいです。',
    },
    {
      q: 'CoQ10とPQQ、どちらから始めるべき？コスパで選ぶなら？',
      a: '論文ベースの優先順位はCoQ10が圧倒的に先です。理由は、①ヒトRCT・メタ解析の蓄積が豊富（心不全・スタチン誘発筋痛・偏頭痛・男性不妊で複数の良質なエビデンス）、②月コスト¥1,000-3,000とコスパ良、③副作用がほぼなく安全性高い、④Q-SYMBIO等の大規模RCT（n=420 2年追跡）で臨床アウトカム改善が報告されている、の4点です。PQQはHosoe 2007等の小規模ヒト試験と動物実験ベース機序評価が中心で。\n\n「ヒトでの臨床アウトカム蓄積はCoQ10と比較すると初期段階」が現状の論文評価です。月コストも¥3,000-6,000とCoQ10の2-3倍。\n\nまずCoQ10 100-200mg/日を8-12週、効果実感後にPQQ追加検討が現実的な順序です。',
    },
    {
      q: 'CoQ10とPQQは併用できる？シナジーはある？',
      a: '併用OK・理論上シナジー設計が合理的です。CoQ10で「既存ミトコンドリアの稼働を支える」、PQQで「新規ミトコンドリアを増やす」役割分担になるため、両者を組み合わせる枠組みは生化学的に整合します。実際にiHerbや国内サプリでCoQ10+PQQ配合の複合製品も増えています。ただしCoQ10+PQQ併用群と単独群の臨床アウトカムを直接比較したヒトRCTは限定的で、現状は「副作用が増えないため安全性は高いが、追加効果の定量的証拠は研究中」が誠実評価です。月コスト¥4,000-9,000の負担を許容できるなら併用合理的、コスパ重視ならCoQ10単独でも論文ベースの効果は得られます。',
    },
    {
      q: 'CoQ10のユビキノール（還元型）とユビキノン（酸化型）はどちらを選ぶ？',
      a: '40代以降・心不全・スタチン服用中はユビキノール（還元型）優先が論文上です。Hosoi 2008 等で高齢者のユビキノール吸収率がユビキノンより高いことが報告されており、体内変換ステップを省ける分だけ吸収効率に優位性があります。一方、30代までの健康な人はユビキノン（酸化型）でコスパ重視で十分です（Bhagavan 2006でユビキノンも体内で還元型に変換されることが確認されています）。商品例：ユビキノール＝Kaneka Ubiquinol（カネカ社・日本企業の世界標準ブランド）配合製品（Doctor\'s Best/Jarrow Formulasなど）が月¥2,500-4,500、ユビキノン＝NOW Foods CoQ10 100mg/Jarrow Q-Absorbが月¥1,000-2,000。脂溶性のため食事と一緒に摂ると吸収率が上がります。',
    },
    {
      q: 'CoQ10・PQQの副作用と併用注意は？スタチン服用中は飲むべき？',
      a: 'ヒトRCTで報告された副作用は両者とも軽微で（CoQ10は稀に消化器症状・不眠、PQQは稀に頭痛）、致死的有害事象の報告はほぼありません。\n\n併用注意：①CoQ10×ワルファリン＝CoQ10はビタミンK様構造を持つためワルファリンの抗凝固作用を弱める可能性があり、INRモニタリング推奨（直接的禁忌ではないが慎重）、②CoQ10×スタチン＝スタチンはコレステロール合成経路でCoQ10合成も抑制するためスタチン誘発筋痛軽減の補助としてCoQ10併用が論文上で合理的（Caso 2007 RCTで筋痛軽減報告）、③CoQ10×降圧薬＝CoQ10自体に軽度降圧作用があり相加的に血圧低下する可能性、④妊娠中・授乳中の安全性は両者とも未確立で避けるべき領域。\n\n化粧品メーカー視点ではŽmitek 2017 J Cosmet Dermatol RCT n=33 CoQ10 150mg/日12週でしわ深さ改善が報告されており、抗老化スタックの補助として位置づけられます。',
    },
  ],
  'resveratrol-vs-quercetin': [
    {
      q: 'レスベラトロールとケルセチンの違いは？',
      a: '両者ともポリフェノールですが、抗老化文脈での主軸が完全に異なります。\n\nレスベラトロール（trans型100〜500mg/日）はブドウ・赤ワイン由来スチルベン系で。\n\nSIRT1（サーチュイン1）活性化によるカロリー制限模倣が中心軸です（Howitz 2003 Nature の古典論文で酵母・線虫・ハエの寿命延長を報告）。\n\nケルセチン（500〜1,000mg/日）はタマネギ・りんご由来フラボノール系で。\n\nsenolytics（老化細胞を選択的に除去する戦略）の主軸として研究が蓄積しています（Zhu 2015 Aging Cellでダサチニブ+ケルセチン D+Q カクテルが老化細胞アポトーシス誘導を確立）。加えてケルセチンには抗ヒスタミン作用・花粉症対策のエビデンスもあり（Mlcek 2016 Molecules review）、抗老化＋アレルギーの二刀流で独自性が高い成分です。「カロリー制限模倣（レスベラトロール）」vs「老化細胞除去＋抗ヒスタミン（ケルセチン）」の役割分担と覚えると整理しやすいです。',
    },
    {
      q: 'レスベラトロールとケルセチン、どちらから始めるべき？senolyticsを狙うなら？',
      a: '目的別の即決：①抗老化・カロリー制限模倣・代謝改善を狙うならレスベラトロール（trans型200-500mg/日）から、②老化細胞除去（senolytics）・花粉症対策併用ならケルセチン（500-1,000mg/日）から。\n\nsenolytics文脈が主目的ならケルセチン優位で、Zhu 2015 Aging Cell・Justice 2019 EBioMedicineの特発性肺線維症ヒトPhase I（D+Q 100mg/週で身体機能改善）を含むsenolytics研究の中心成分です。ただしsenolytics戦略は「毎日少量」ではなく「2-3日連続摂取→2-4週休薬」のサイクル投与が原則（hit-and-run戦略）でレスベラトロールの「毎日継続」とは投与設計が異なります。\n\n初心者向けには毎日継続のレスベラトロール、抗老化を本格的に追うならケルセチンのサイクル投与+Fisetin乗換も視野が無難です。',
    },
    {
      q: 'Fisetin（フィセチン）はケルセチンの上位互換？乗り換えるべき？',
      a: '構造類似で「より強いsenolytics」の位置づけ・将来的な乗換候補です。\n\nFisetin（イチゴ・りんご由来）はケルセチンと同じフラボノール骨格でメチル基の有無が違うのみで、Yousefzadeh 2018 EBioMedicineでマウスのlifespan延長が報告され、現在ヒトPhase II senolytics試験がWake Forest大学等で進行中です。in vitroでケルセチンより低濃度で老化細胞アポトーシス誘導が確認され、「ケルセチン強化版」と評価する研究者もいます。\n\nただし2025年時点でFisetinのヒト臨床アウトカム蓄積はまだ初期段階で、ケルセチンより月コストが2-3倍高い（Fisetin月¥4,000-8,000 vs ケルセチン¥1,500-3,500）のが現状です。\n\n実用的な順序：①まずケルセチン6-12ヶ月でsenolytics戦略に慣れる、②Phase II/III試験結果が出てきたタイミングでFisetinへの乗換または併用を検討、③Fisetin単独でなくケルセチン+Fisetinの併用も理論上合理的。',
    },
    {
      q: 'レスベラトロールとケルセチンは併用できる？スタックの組み方は？',
      a: '併用OK・経路が独立しており現実的です。レスベラトロール（SIRT1経路）とケルセチン（senolytics+抗ヒスタミン）は作用ターゲットが完全に分離しており、相互の効果を阻害しません。実際にDavid Sinclair陣営の推奨スタックでも「NMN+レスベラトロール+ケルセチン+メトホルミン（処方）」という組み合わせが提案されることが多いです。\n\n推奨スタック例：朝食時にtrans型レスベラトロール250mg+ケルセチン500mg（脂溶性レスベラトロールは食事と一緒で吸収率向上・ケルセチンはバイオペリン配合製剤を選ぶと吸収率2倍）、夜にCoQ10 100mg。月コスト¥3,000-7,500程度。\n\nただしsenolytics文脈ではケルセチンを「2-3日連続×4週休薬」のサイクル投与にすると、レスベラトロールの毎日継続スケジュールと別運用になる点に注意。両者の併用論文RCTは限定的ですが、副作用は加算しないため安全性は高いと考えられます。',
    },
    {
      q: 'レスベラトロール・ケルセチンの副作用と併用注意は？ワルファリンと一緒に飲める？',
      a: '両者とも抗血小板作用・CYP抑制が報告されており、抗凝固薬・抗血小板薬服用中は要注意です。\n\n併用注意：①ワルファリン×レスベラトロール/ケルセチン＝両者ともCYP3A4阻害+抗血小板作用でワルファリンの抗凝固作用を増強する可能性、INRモニタリング必須・自己判断併用NG（Pang 2014 等）、②ケルセチン×シプロフロキサシン＝吸収競合報告あり、2-3時間ずらす、③ケルセチン×降圧薬＝相加的血圧低下の可能性、④レスベラトロール×タモキシフェン/シクロスポリン＝CYP3A4阻害で血中濃度上昇懸念、⑤手術前2週間は両者とも休薬推奨（抗血小板作用）、⑥妊娠中・授乳中の安全性は未確立で避けるべき領域。\n\nヒトRCTで報告された副作用は軽微（レスベラトロール高用量で消化器症状・ケルセチン稀に頭痛）。\n\n化粧品メーカー視点ではレスベラトロール外用のシワ・色素沈着改善RCT（Buonocore 2012 JAAD）と経口（Brasnyó 2011 BJN 2型糖尿病インスリン感受性改善）の使い分けで、皮膚直接効果は外用優位を明示します。',
    },
  ],
  'magnesium-glycinate-vs-magnesium': [
    {
      q: 'マグネシウム グリシン酸塩とクエン酸塩の違いは？吸収率・用途で何が変わりますか？',
      a: 'グリシン酸キレート型（Magnesium Glycinate / Bisglycinate）はマグネシウムイオンがアミノ酸グリシンと結合した形態で、Walker 2003 Magnes Res 等で吸収率の高さと下痢になりにくい点が報告されています。グリシン自体がGABA系を介する穏やかな鎮静作用を持つため、睡眠補助・神経筋接合部のリラックス・コルチゾール低下を狙う夜の用途で妥当（Abbasi 2012 J Res Med Sci RCT n=46 高齢者500mg/日×8週でPSQI改善）。一方クエン酸マグネシウム（Magnesium Citrate）はクエン酸塩としてTCAサイクル中間体になる構造で、浸透圧性の穏やかな緩下作用と良好な吸収率のバランス型として位置付けられ、Lindberg 1990 J Am Coll Nutr 等で吸収率が酸化マグネシウムを上回る報告があります。日常的なマグネシウム不足の経済的な補給（月¥450前後）にはクエン酸塩、睡眠・神経用途の高品質補給（月¥1,400前後）にはグリシン酸キレート型、と用途で分けるのが論文上の現実解です。両者を「最強の一本」で選ぼうとせず、「目的×形態」で選ぶ視点が最も外れません。',
    },
    {
      q: '酸化マグネシウムとグリシン酸塩の違いは？睡眠目的に酸化マグネシウムは使えますか？',
      a: '',
    },
    {
      q: '酸化マグネシウムとクエン酸塩の違いは？便秘・不足補給でどう使い分けますか？',
      a: '酸化マグネシウム（医薬品・医薬部外品）は浸透圧性下剤として保険適用された便秘薬としての位置付けが強く、1.5〜2g/日の用量で大腸の水分量を増やして便を柔らかくする作用が主軸です（Mori 2019 J Neurogastroenterol Motil RCT n=34）。クエン酸マグネシウム（食品サプリ）は200〜400mg/日の用量で「日常的なマグネシウム不足補給＋穏やかな緩下作用」というデュアルポジションで、吸収率が酸化マグネシウムを上回るとする報告があります（Lindberg 1990・Coudray 2005）。便秘改善が主目的なら酸化マグネシウム（薬剤師相談のうえドラッグストア・調剤薬局で購入）、日常の不足補給とコスパ重視ならクエン酸塩（NOW Foods Magnesium Citrate 200mg 月¥450 前後）、というステップが現実的です。クエン酸塩で便通改善が不十分なら酸化型に切り替え、というのが論文上の段階的アプローチです。腎機能低下のある方はどちらの形態でも高マグネシウム血症リスクがあり、自己判断での高用量・長期連用は避けるのが安全側です。',
    },
    {
      q: 'マグネシウム形態別（グリシン酸/クエン酸/酸化/L-トレオン酸/塩化）の選び方を一覧で教えてください',
      a: '選び方の即決：睡眠・夜のリラックス→①、日常補給コスパ→②、便秘→③（薬剤師相談）、認知サポートの実験的補完→④、足のつり局所→⑤、偏頭痛予防→⑥。\n\n酸化型を睡眠目的で買うは吸収率の点で実用的ではなく、形態の選び分けで失敗を避けるのが現実的です。',
    },
    {
      q: '酸化マグネシウム・クエン酸塩・グリシン酸塩、副作用と相互作用に違いはありますか？',
      a: '副作用プロファイルは形態で異なる側面があります：①下痢・消化器症状＝酸化マグネシウム＞クエン酸塩＞グリシン酸キレート型の順で頻度が高い傾向。酸化型は緩下作用が主軸のため500mg超で下痢頻度が上がり、グリシン酸キレート型は穏やか（Walker 2003 Magnes Res でグリシン酸キレート型の消化器副作用が酸化型より少ない報告）。②高マグネシウム血症（脱力・血圧低下・徐脈）＝健康な腎機能では稀ですが、腎機能低下のある方では全形態で同様にリスクがあり、特に酸化マグネシウム長期高用量（1.5〜2g/日）での報告が多めです。日本の医薬品インタビューフォームでも酸化マグネシウム長期連用時の血清マグネシウム値モニタリングが推奨されています。③薬物相互作用は形態によらず共通で、テトラサイクリン系・フルオロキノロン系抗菌薬・ビスホスホネート・甲状腺ホルモン薬（レボチロキシン）とは2〜4時間ずらす必要があります（PMC8626210・KASIC Clinical Pearl on Chelation 2025）。④妊娠中・授乳中＝食事レベル・推奨量内の補給は安全と評価される一方、高用量自己判断は避け、産婦人科医相談が前提です。⑤ジゴキシン・カルシウム拮抗薬服用中は心血管モニタリングを継続し、自己判断での高用量摂取を避けてください。論文ベースで安全側に運用するなら、健康な成人で200〜400mg/日の研究使用域を超えない、便秘目的の酸化マグネシウム長期連用は薬剤師相談、腎機能低下のある方は全形態で医師相談、という順序が現実的です。',
    },
  ],
  // ── Sprint 1 Session B Day 5 バッチ 2026-05-13 ────────────
  'niacinamide-vs-palmitoyl-tripeptide': [
    {
      q: 'ナイアシンアミドとパルミトイルトリペプチドの違いは？論文エビデンスはどう違いますか？',
      a: '作用層・作用機序・エビデンスの厚みが完全に異なります。\n\nナイアシンアミド（ビタミンB3・外用5%）は表皮で①メラノソーム転移阻害（Bissett 2005 J Cosmet Dermatol RCT 5%×8週・Hakozaki 2002 Br J Dermatol RCT）でメラニン受け渡しを抑制、②皮脂分泌の低下、③表皮バリア機能強化（セラミド合成促進）、④小じわ軽減の4方面に作用する 複数のヒトRCTが裏付けるマルチ作用成分です。\n\nパルミトイルトリペプチド（外用シグナルペプチド・Matrixyl 3000等の主要構成成分）は、合成されたペンタ/トリペプチドにパルミチン酸を結合させて脂質親和性を高め、皮膚バリアを越えて真皮まで届けてから線維芽細胞にコラーゲン産生シグナルを送る「メッセンジャー型」の合成ペプチドで。\n\n主にメーカー主導のin vitro試験・小規模臨床試験でコラーゲン産生促進・シワ深度改善が報告されています（パルミトイルペンタペプチド-4のSederma社試験等）。両者のエビデンス階層を率直に整理すると。\n\nヒトRCT本数・査読ジャーナル掲載数・メタ解析の存在でナイアシンアミドが一段上、パルミトイルトリペプチドは「メーカー試験ベース・大規模ヒトRCTは限定的」というのが現状の正確な評価です。「ペプチド配合だから効く」「ペプチドだから高性能」はマーケティング寄りの表現で、論文ベースで穏当に評価すると。\n\nシミ・くすみ・小じわ・バリア対策の主軸はナイアシンアミド、深いシワ・たるみへの追加アプローチでパルミトイルトリペプチドを補助的に組み合わせるのが論理整合的です。',
    },
    {
      q: 'ナイアシンアミドとパルミトイルトリペプチドは併用できますか？順番はどうしますか？',
      a: '併用が論文上で合理的です。作用層（表皮vs真皮）・作用機序（メラノソーム転移阻害・バリア強化 vs コラーゲン産生シグナル）が完全に独立で、相互の効果阻害も既知ではありません。両成分とも刺激リスクがほぼゼロでpH安定域も近いため、レチノール・AHA/BHA併用と違って同時塗布のハードルが低いのも実務的な利点です。\n\n推奨パターン：①朝＝ナイアシンアミド5%セラム→保湿クリーム→日焼け止め（パルミトイルペプチドは効果実感まで12-24週かかる長期勝負成分のため、朝晩継続性を優先）。②夜＝洗顔→化粧水→ナイアシンアミド5%→パルミトイルトリペプチド配合美容液（コラーゲン産生シグナルは夜の修復フェーズで活性化しやすい理論）→保湿クリーム、の朝晩運用が王道です。同時塗布する場合は分子サイズが小さいナイアシンアミドが先（数分で角質に浸透）、その後パルミトイルトリペプチド（リポペプチドで真皮指向）の順序が効率的です。両者にレチノールを追加するなら夜のみ・週2-3回から段階導入し、刺激が出ない確認後にナイアシンアミド→レチノール→パルミトイルペプチドの三層運用が王道です。市販品ではThe Ordinary「"Buffet"」のようにナイアシンアミド5%とパルミトイルペプチド系（Matrixyl 3000・Argireline等）が同一製品に併存する処方もあり、論文ベースで合理性のある組み合わせです。',
    },
    {
      q: 'ナイアシンアミド5%とパルミトイルトリペプチド、コラーゲン産生にはどちらが効果ありますか？',
      a: 'コラーゲン産生という観点で見ると、両者の作用機序が異なるため「単純比較」より「補完関係」での評価が現実的です。\n\nナイアシンアミドは直接コラーゲン合成を促進する成分ではありませんが、表皮ケラチノサイトのNAD+前駆体として細胞エネルギー代謝を支え、間接的に皮膚再構築をサポートする報告があります（Bissett 2005では5%×12週で小じわ改善が報告された）。コラーゲン産生への直接効果の論文裏付けは限定的です。\n\nパルミトイルトリペプチド-1/-5は線維芽細胞にTGF-β様シグナルを送ってコラーゲンI型・III型産生を促進する作用機序がメーカー試験で示されており。\n\nコラーゲン産生という機序軸ではパルミトイルトリペプチドの方が直接的です。ただし、コラーゲン産生をヒトで直接定量評価したRCT（皮膚生検でコラーゲンmRNA・タンパク量を測定）の本数は両者ともに限定的で、特にパルミトイルトリペプチドはメーカー主導試験が中心です。\n\n論文ベースの現実的な整理：ナイアシンアミドは「表皮の総合ケア（色素沈着・皮脂・バリア・小じわ）でヒトRCT実績が厚い」、パルミトイルトリペプチドは「真皮のコラーゲン産生シグナルを送るシグナル系ペプチドで作用機序の合理性は明確だがヒトRCT実績は限定的」という階層差を理解したうえで。\n\n主軸はナイアシンアミド・追加アプローチでパルミトイルトリペプチドの構成が無難です。「コラーゲン産生最強」と銘打った高価ペプチド美容液（月¥10,000超）を単独で買うより、ナイアシンアミド5%セラム（月¥2,000-5,000）＋パルミトイルトリペプチド配合美容液（月¥3,000-8,000）の組み合わせの方がエビデンスと費用対効果のバランスが良くなります。深いシワ・たるみへの本格対策ならレチノール（Kafi 2007 RCT 0.4%×24週）の方が論文裏付けが厚く、コラーゲン産生を狙うならレチノールを夜に追加する選択肢も検討する価値があります。',
    },
    {
      q: 'パルミトイルトリペプチド配合化粧品の選び方は？ナイアシンアミドと併用したい場合のおすすめは？',
      a: 'パルミトイルトリペプチド系の市販品は、配合濃度・配合形態（Matrixyl 3000か単体パルミトイルトリペプチド-1/-5かArgirelineか）・基剤の浸透設計で評価軸が分かれます。\n\n主要な配合形態：①Matrixyl 3000（パルミトイルテトラペプチド-7＋パルミトイルトリペプチド-1の複合）＝Sederma社特許のシグナルペプチド複合体で最も流通量が多く、メーカー試験でシワ深度改善・コラーゲン産生促進が報告されている。②Matrixyl synthe\'6（パルミトイルトリペプチド-38）＝Matrixyl 3000の改良版で、より6種類のマトリックス成分（コラーゲンI/III/IV・フィブロネクチン・ヒアルロン酸・ラミニン-5）の産生を狙う設計。③Argireline（アセチルヘキサペプチド-8）＝表情筋の収縮を抑える「塗るボトックス」と呼ばれる別系統のシグナルペプチドで、目尻・額の表情ジワに特化。\n\n選び方の手順：①目的を決める（コラーゲン産生・シワ深度→Matrixyl系・表情ジワ→Argireline）、②配合濃度の明示（Matrixyl 3000なら3-10%が論文実績域・実際の市販品は2-8%が主流）、③全成分表記でパルミトイル系ペプチドが上から5-10番目以内に配置（成分順は配合量順）、④遮光ボトル・エアレスポンプ（ペプチドは酸化・熱で安定性が落ちやすい）、⑤継続できる価格帯（月¥3,000-8,000程度で1日¥100-300）の5点フィルタが現実的です。\n\nナイアシンアミドと併用したい場合のおすすめ：①The Ordinary "Buffet"（パルミトイルテトラペプチド-7＋複数ペプチド＋ヒアルロン酸 月¥2,000程度）はコスパ良好でナイアシンアミド単体5%セラム（同シリーズ月¥1,500）と朝晩運用で組み合わせやすい。②Drunk Elephant Protini Polypeptide Cream（Matrixyl 3000＋シグナルペプチド複合 月¥9,000程度）は高価だが基剤の浸透設計が高い水準。③医薬部外品ではキールズ「DSライン リファイニング セラム」・ロート製薬「オバジX」等のペプチド配合美容液との併用も選択肢。\n\n化粧品メーカー視点として、パルミトイルトリペプチド系は「研究としてはコラーゲン産生機序が明確だがヒトRCT実績は限定的」「マーケティングで効果が膨らみやすい成分カテゴリ」のため、高価製品を単独で買うより、ナイアシンアミド5%セラム（論文RCT実績の厚みのある主軸）＋中価格帯のペプチド美容液（補助）の組み合わせがエビデンスとコスパのバランスで現実的です。\n\n敏感肌・妊娠中でも両成分とも比較的安全とされており、レチノール（妊娠中NG）の代替として「ナイアシンアミド＋パルミトイルトリペプチド」の組み合わせを選ぶのは論文ベースで合理的な選択肢です。',
    },
    {
      q: 'ナイアシンアミドとパルミトイルトリペプチド、効果が出るまでの期間と月コストの差は？',
      a: 'ナイアシンアミドは4-12週で効果実感、パルミトイルトリペプチドは12-24週で効果実感、と効果が出るまでの時間軸が異なります。\n\nナイアシンアミド5%：Bissett 2005 J Cosmet Dermatol RCT 5%×8週で色素沈着・小じわ・皮脂の改善が報告されており。\n\n4-8週で初期の体感・8-12週で論文水準の改善が現実的なタイムライン。月コストは1,000-5,000円程度（無印良品5%・The Ordinary 5%・キュレル等）で論文用量に届く製品が幅広く選べる利点があります。\n\nパルミトイルトリペプチド：Matrixyl 3000のメーカー試験で2ヶ月でシワ深度改善が報告されていますが、ヒトRCT水準では12-24週の継続でようやく改善が体感できる長期勝負成分で、コラーゲン産生からシワ深度改善まで真皮レベルの構造変化を待つ必要があります。月コストはThe Ordinary "Buffet"等の低価格帯（月¥2,000程度）からDrunk Elephant Protini等のプレミアム（月¥9,000）まで幅広く、論文用量に対応する濃度（Matrixyl 3000で3-10%）の製品で月¥3,000-8,000が現実的な相場です。\n\n論文ベースの即決判断：①短期で体感を取りに行きたい（4-8週で効果実感）→ナイアシンアミド5%セラムから始める。②深いシワ・たるみへの中長期アプローチ（12-24週で構造変化を狙う）→ナイアシンアミドにパルミトイルトリペプチドを夜に追加。③コストを抑えたい→ナイアシンアミド5%（月¥1,500-3,000）単独で8-12週運用し、効果体感後にペプチドを追加。④妊娠中授乳中でレチノールが使えない→ナイアシンアミド＋パルミトイルトリペプチドの組み合わせで論文ベース合理的。\n\n「短期＋汎用＋低刺激＋エビデンス厚い」ならナイアシンアミド、「中長期＋深いシワ・コラーゲン産生＋エビデンスはメーカー試験中心」ならパルミトイルトリペプチドという役割分担で、両者の併用はエビデンスとコスパのバランスが良い王道スタックです。',
    },
  ],
  // ── Session F Day 5 バッチ 2026-05-12（muscle/sleep/longevity/cognition 既存pair FAQ追加・magnesium-glycinate-vs-magnesium は Sprint 1 Session B Day 4 ca532ce で先行追加済のため重複回避） ────
  'creatine-vs-hmb': [
    {
      q: 'クレアチンとHMBの違いは？効果はどっちが論文で強い？',
      a: '健常若年トレーニーならクレアチンが圧倒的に強く、HMBは適用集団が違うサプリです。クレアチンはATP再合成の主役でKreider 2017 JISSN ポジションスタンドで筋トレ系サプリ最強評価（数百本のRCT・メタ解析で筋力・パワー・除脂肪体重・無酸素持久力に有意差）。HMBはPhillips 2017 Nutrients レビューで「健常若年トレーニーへの効果はトレーニング刺激と相殺されほぼゼロ」と結論される一方、Wilson 2014 J Strength Cond Res メタ・Wu 2015 Arch Gerontol Geriatr メタでは高齢者・絶対的初心者・カタボリック状況（術後・寝たきり）で有意改善が確認されています。「HMBはクレアチンの劣化版」ではなく適用集団が違うサプリで、健常若年なら同コストでクレアチン2-3本買える計算です。',
    },
    {
      q: '健常若年トレーニーがHMBを飲む意味はある？それともクレアチン一択？',
      a: '健常若年トレーニーはクレアチンモノハイドレート3-5g/日の一択が論文上の結論です。Phillips 2017 Nutrients レビュー、Jakubowski 2019 Med Sci Sports Exerc 等で「トレーニング刺激と栄養充足下で健常若年へのHMB追加効果はほぼ検出されない」と複数指摘されており、月¥3,000-5,000のコストを払う合理性は低いです。クレアチンは月¥1,500-2,500でエビデンスS、HMBは月¥3,000-5,000でエビデンスは集団限定。\n\n判断基準：①健常若年・筋トレ中級者→クレアチンだけ、②60代以上の筋量維持→クレアチン+HMB併用検討、③術後・寝たきり明け・絶食状況→HMB単独で筋分解抑制目的、④プロ競技者の追い込み期だけはHMB追加検討の余地ありが現実解です。',
    },
    {
      q: 'HMBは高齢者や初心者には効くって本当？論文ベースで対象は？',
      a: '高齢者・絶対的初心者・カタボリック状況では論文上効果が確認されています。\n\nWu 2015 Arch Gerontol Geriatr メタ解析では65歳以上の高齢者へのHMB 3g/日×12週で除脂肪体重・筋力・身体機能の有意改善が報告され、Wilson 2014 J Strength Cond Res でも初心者・カタボリック状況（術後・絶食・寝たきり）でHMBの抗異化作用エビデンスが集中しています。\n\nつまり「筋分解が亢進している集団」でこそHMBの真価が出る設計で、健常若年のように筋合成が回っている状態では追加効果が検出されにくい構造です。60代以上のサルコペニア対策、長期入院明け、激しい減量期のトレーニーには検討価値あり。クレアチンと併用しても薬理的に干渉せず、両者とも腎機能への実害は健常者では報告ないため60代以上の併用は現実的です。',
    },
    {
      q: 'クレアチンの副作用「腎臓に悪い」は本当？血清クレアチニン上昇って大丈夫？',
      a: '健常者では実害なし・検査値ノイズです。クレアチンはサプリの中で最も安全性RCTが豊富な成分の一つで、Kreider 2017 JISSN ポジションスタンドでも「健常者で長期摂取の腎機能・肝機能への有害影響は確認されていない」と明言されています。よくある誤解は血清クレアチニン上昇で、これはクレアチンの代謝産物（クレアチニン）が一時的に増えるための検査値上昇であり、実際の腎機能低下ではありません。「クレアチンサプリ服用中」を医師に伝えれば誤判定回避できます。\n\nただし腎疾患既往・透析中・透析予備軍は医師相談必須、また5g/日を超える高用量は消化器症状（下痢・胃部不快）が出やすいので3-5g/日の標準用量で十分。HMBは副作用報告が少ないが長期データは限定的で、両者とも妊娠中・授乳中の安全性データは未確立のため避けるべき領域です。',
    },
    {
      q: '結局、筋肉系サプリで月のお金を1本だけに絞るならどっち？',
      a: '健常若年・中年トレーニーはクレアチンモノハイドレート一択、60代以上の筋量維持ならクレアチン+HMB併用が王道な月支出です。月¥1,500-2,500のクレアチンモノハイドレート（Optimum Nutrition Creapure®/NOW Sports Creatine Monohydrate等のCreapure®特許品が品質安定）に対し、HMBは月¥3,000-5,000で適用集団が限定的。\n\n筋肉系サプリ予算ヒエラルキー：①第一優先=クレアチン（健常若年〜中年）、②第二優先=ホエイプロテイン（食事タンパク質不足時）、③第三優先=L-シトルリン6-8g/日（運動前のパンプ・乳酸クリアランス）、④第四優先=ベータアラニン3-5g/日（高強度持久力・乳酸緩衝）、⑤HMBは特定集団のみ追加検討です。「最新の流行サプリ」より論文蓄積の厚みと自分の集団適合性で選ぶのが論文上のコスパ最適化です。',
    },
  ],
  'melatonin-vs-glycine': [
    {
      q: 'メラトニンとグリシンの違いは？どっちが日本で買える？',
      a: '作用経路と国内入手可否が決定的に違います。メラトニンは脳の松果体由来の睡眠ホルモン補充で生体時計のリセット・概日リズム障害に作用、グリシンは天然アミノ酸として末梢血管拡張による深部体温低下経由の入眠改善に作用します。\n\n国内入手可否：日本ではメラトニンは医薬品扱い（睡眠導入剤類縁）でサプリ流通なし・個人輸入のみが選択肢で本サイトは推奨する立場ではなく事実として規制差を提示します。一方グリシンは食品扱いで味の素「グリナ」・iHerb・Amazonで誰でも購入可能（月¥1,000-4,000）。「軽い不眠でまず試したい」「自然な眠気を補助したい」ならグリシンが第一選択、「時差ぼけ・交代勤務・概日リズム障害」はメラトニンが現実的な使い分けです。',
    },
    {
      q: 'グリシン3g/就寝前の睡眠改善RCTって本当に効く？',
      a: '少人数のRCTで効果が報告されています。\n\nYamadera 2007 Sleep Biol Rhythms RCT n=15で就寝前にグリシン3g摂取が①深部体温低下による入眠促進、②朝の眠気軽減、③日中の認知機能・疲労感改善が確認されました。\n\nBannai 2012 Front Neurol Neurosci でメカニズム（末梢血管拡張による熱放散→中核体温低下→自然な眠気誘発）が整理され、Inagawa 2006 ではオープンラベルでグリシン3g/4週間継続摂取が日中疲労改善を示しています。\n\nただし試験規模が15-20名程度と小さいため大規模メタ解析待ちの位置で、メラトニンの数千名規模のメタ解析（Cochrane 2002 n=1,200・PLOS ONE 2013 n=1,683）と比較するとエビデンスの厚みでは劣ります。\n\n「夜中の覚醒なく深く眠れた感覚」を狙う層には合理的な選択肢で、月¥1,000-2,000のコストで4-8週試して効果判定するのが現実解です。',
    },
    {
      q: 'メラトニンとグリシンは併用できる？タイミングは？',
      a: '併用OK・経路独立で妥当です。メラトニン（生体時計リセット）とグリシン（深部体温低下経由の入眠補助）は作用ターゲットが完全に分離しているため相互の効果を阻害しません。\n\n推奨タイミング：①就寝1時間前にグリシン3g（深部体温が下がり始めるまでに15-30分の遅延を考慮）、②就寝30分前にメラトニン0.3-0.5mg（個人輸入の場合は最小用量から）、③暗い環境で就寝、の二段スタックが無難。\n\nただし日本ではメラトニンは医薬品扱いで本サイトは推奨する立場ではないため、まずグリシン単独で4-8週試し、効果不足の場合に医師相談（睡眠外来）→処方ラメルテオン（メラトニン受容体作動薬・国内承認医薬品）への移行が安全路線です。両者とも依存性はベンゾジアゼピン系より圧倒的に低い特徴があります。',
    },
    {
      q: 'グリシンの副作用と注意点は？毎日3g飲んでも大丈夫？',
      a: 'グリシンはほぼ副作用報告なし・自然アミノ酸でタンパク質構成成分のため安全性は極めて高いです。\n\nYamadera 2007 や Inagawa 2006 のRCTでもグリシン3g/4週間継続で重篤副作用は報告されていません。ただし注意点：①クロザピン（統合失調症治療薬）併用は要注意＝高用量グリシンで精神症状増悪報告（NMDA受容体co-agonist作用）、②腎機能低下時は医師相談（高用量で窒素負荷増加の理論的懸念）、③妊娠中・授乳中はデータ限定のため標準量を超える摂取は避ける、の3点です。\n\nメラトニンは副作用プロファイルがより複雑で、フルボキサミン併用で血中17倍の最強警告・翌朝の眠気残存・悪夢・頭痛・抗うつ薬（SSRI/SNRI）併用注意・降圧薬と相加効果・血糖降下薬との相互作用・自己免疫疾患では炎症性サイトカイン亢進懸念があり、用量階段（0.3-0.5mgから開始）と医師相談が論文上で必須です。',
    },
    {
      q: '不眠で最初に試すべきはメラトニン？グリシン？それともマグネシウム グリシン酸塩？',
      a: '日本在住で軽い不眠ならグリシン3g → 効果不足ならマグネシウム グリシン酸塩200-400mg追加 → それでも不足なら医師相談が王道な順序です。①第一選択=グリシン3g：国内入手容易・食品扱い・副作用ほぼなし・月¥1,000-2,000、②第二選択=マグネシウム グリシン酸塩200-400mg：Abbasi 2012 PSQI改善RCT・国内サプリ流通・月¥1,400-2,000、③第三選択=L-テアニン100-200mg併用：Hidese 2019 RCT で睡眠の質改善・リラックス系を重ねる、④第四選択=医師相談（睡眠外来）：処方ラメルテオン（メラトニン受容体作動薬・国内承認）/抑肝散等の漢方/CBT-I（不眠の認知行動療法）。\n\nメラトニンは個人輸入で本サイトは推奨する立場ではないため、概日リズム障害（時差ぼけ・交代勤務）以外では医師相談ルートが現実的に安全です。慢性不眠は背景に睡眠時無呼吸・うつ・甲状腺異常等の医療領域が隠れている可能性があり、3ヶ月続く場合はサプリ自己判断より医療機関受診が先です。',
    },
  ],
  'nmn-vs-urolithin-a': [
    {
      q: 'NMNとウロリチンAの違いは？どっちが効くと論文で言われている？',
      a: '作用経路が完全に独立していて「どっちが効く」より「補完関係」が論文上の結論です。NMNはNAD+前駆体経路でサーチュイン活性化・全身代謝・インスリン感受性に作用（Yoshino 2021 Science RCT n=25で閉経後肥満女性の骨格筋インスリン感受性改善）、ウロリチンAはmitophagy（不良ミトコンドリア選択的除去）経路の独立軸で（Andreux 2019 Nature Metabolism RCT n=66 健常高齢者でミトコンドリア機能マーカー改善・Liu 2022 JAMA Network Open Phase 2 RCT n=88で筋持久力改善）。両者の経路が完全に分かれているため理論上は「NAD+による生体エネルギー底上げ＋mitophagy による不良ミトコンドリア除去」のシナジーが期待でき、抗老化スタックとして実用的に併用可能です。ただし両者とも長期寿命延長エビデンスはヒトでは未確立で、Damgaard 2023 systematic review でも「血中NAD+/ミトコンドリアマーカー改善は確認・臨床アウトカム差は限定的」と慎重評価です。',
    },
    {
      q: 'ウロリチンAの「腸内変換能個人差30-40%」って何？ザクロを食べれば良くない？',
      a: '腸内細菌の保有率次第でザクロを食べてもウロリチンAが産生されない人が大多数という独自背景です。\n\nSelma 2017 Eur J Nutr で、ザクロ・ベリー類に含まれるエラジタンニンを腸内細菌（特定の Gordonibacter 属等）が代謝してウロリチンAを産生する能力を持つ人は欧米人で30-40%のみと報告され、「ウロリチン産生者・非産生者」の分類が提示されました。\n\n非産生者はザクロを毎日食べてもウロリチンAが体内で作られないため、Mitopure®（Amazentis社・スイスEPFL発スタートアップの特許品）等のウロリチンA直接サプリ摂取が論文上で合理的という独自背景です。日本人での産生者比率は欧米と類似と推定されますが大規模調査は限定的。腸内環境（食物繊維・プロバイオティクス）改善で産生菌増加の可能性はありますが、確実性を取るならサプリ直接摂取が現実解です。',
    },
    {
      q: 'NMNとウロリチンAは併用できる？スタックの組み方は？',
      a: '併用OK・経路独立で抗老化スタックとして理論的シナジーがあります。NMNはNAD+前駆体経路で細胞内エネルギー（ATP）と全身代謝の底上げ、ウロリチンAはmitophagy経路で不良ミトコンドリアの選択的除去とミトコンドリア生合成という、ミトコンドリア機能の「量」と「質」を別軸から介入する設計です。\n\n推奨スタック例：①朝食時にNMN 250mg＋ウロリチンA 500mg（Mitopure®）、②運動前後で吸収率向上、③CoQ10 100mg を追加してミトコンドリア電子伝達系もカバー、④ケルセチン500mg/週で老化細胞除去をsenolytics文脈に拡張。月コストは¥16,000-27,000程度と高単価帯になります。\n\nただし両者ともヒトでの長期寿命延長エビデンスは未確立で「老化マーカー改善は確認・体感は穏やか」の期待値調整が最優先。30代後半以降でミトコンドリア機能低下を意識する層向けの選択肢で、まずは経口Mg・オメガ3・運動・睡眠の基盤を整えた上での追加検討が無難です。',
    },
    {
      q: 'ウロリチンA Mitopure®って何？他社ジェネリックでも効く？',
      a: 'Mitopure® は Amazentis 社（スイスEPFL発スタートアップ）の特許ウロリチンA製剤で、ヒトRCTのエビデンスはほぼこの製品で蓄積されています。\n\nAndreux 2019 Nature Metabolism・Liu 2022 JAMA Network Open など主要なヒトRCTは Mitopure®（Timeline社販売）を使用しており、純度・吸収率・安定性が標準化されています。\n\n他社ジェネリック品（中国OEM由来等のウロリチンAサプリ）は純度・実効含有量・不純物のバラつきが報告されており、第三者検査（NSF/USP/COA）付き・GMP製造の製品でなければ品質保証が困難です。月¥10,000-15,000のコストでエビデンス品質を取るなら Mitopure®（Timeline・Costco Wholesale 取扱）、コスパ重視で品質リスクを許容するなら他社ジェネリックという判断軸になります。「ザクロエキスサプリ＝ウロリチンAサプリ」ではない（産生者でないとウロリチンA血中濃度が上がらない）点も Factcheck として重要です。',
    },
    {
      q: 'NMN・ウロリチンAで皮膚の老化は止まる？外用とどっちを優先すべき？',
      a: '皮膚老化への直接効果はヒトRCT未確立・外用スキンケアを優先するのが化粧品メーカー視点で実用的です。NMNとウロリチンAはどちらもミトコンドリア機能・全身代謝への作用が中心で。\n\n皮膚の老化マーカー（コラーゲン密度・シワ深さ・色素沈着）への直接改善RCTは2025年時点で未確立です。理論上は線維芽細胞・表皮細胞のミトコンドリア機能改善経由で間接効果が期待されますが、現状の論文蓄積は全身代謝・運動パフォーマンス・認知機能寄りです。\n\n化粧品メーカー視点の優先順位：①外用レチノール0.1-0.5%（Kafi 2007 RCTでシワ・たるみへの強いエビデンス）、②外用ナイアシンアミド5%（Bissett 2005 RCT 8週で色素沈着・バリア改善）、③外用ビタミンC15%＋ビタミンE1%＋フェルラ酸0.5%（Lin 2005 抗酸化シールド）、④日焼け止めSPF50/PA++++、⑤経口コラーゲンペプチド5g/日（Bolke 2019 RCT n=72で皮膚水分量・弾力改善）、⑥NMN/ウロリチンAは経口で月¥6-15kの高単価帯のためスキンケアの土台が整った後の追加検討が王道なコスパ判断です。',
    },
  ],
  'lions-mane-vs-bacopa-monnieri': [
    {
      q: 'ライオンズメインとバコパの違いは？どっちが論文で認知機能に効く？',
      a: '作用経路と最適な対象年齢が違うため「どっちが効く」より「使い分け」が論文上です。\n\nライオンズメイン（ヤマブシタケ）は神経成長因子（NGF）誘導経由で神経新生・神経保護に作用し。\n\n高齢者の軽度認知障害（MCI）対象RCTでエビデンスが集中（Mori 2009 Phytother Res RCT n=30 50-80歳MCI患者に3g/日×16週で認知機能スコア有意改善・摂取中止後12週で効果消失も報告）。\n\nバコパモンニエリはアセチルコリン受容体経路で記憶・学習・若年〜中年成人の認知パフォーマンスに作用（Stough 2008 Phytother Res RCT bacopa 300mg/日×12週で健常成人の言語学習・記憶テスト改善・Kongkeaw 2014 J Ethnopharmacol メタ解析 9 RCT で認知機能改善）。\n\n使い分けの結論：若年〜中年の集中力・記憶・学習能力ならバコパ優先、高齢者のMCI予防・認知低下対策ならライオンズメイン優先が現実的です。両者は経路独立で併用可能です。',
    },
    {
      q: 'ライオンズメインの認知症予防エビデンスはどこまで信頼できる？',
      a: 'Mori 2009 のRCTが主要根拠ですが小規模かつ追跡データが限定的です。\n\nMori 2009 Phytother Resは50-80歳の軽度認知障害（MCI）患者30名にヤマブシタケ3g/日×16週で認知機能スコア有意改善を確認した日本の研究で、Mori 2011 Biomed Res でNGF誘導機序が整理されました。\n\nただし試験規模が30名と小さいこと、摂取中止後12週で効果消失が報告されていること、独立検証RCTが少ないことから「認知症が治る」断定は薬機法・論文ベースで両方NGです。「MCI患者対象のRCTで認知機能スコアの改善が報告されている」までが誠実な記述。\n\n化粧品メーカー視点ではコルチゾール低下→皮膚バリア低下抑制の二次効果として位置づけ、認知機能だけを目的にするより睡眠・運動・社会的交流等の基盤介入が論文上で効果大です。月¥2,500-4,500のコストで4-6ヶ月試して効果判定が現実的な期待値です。',
    },
    {
      q: 'バコパは効果が出るまで12週かかるって本当？短期で実感できる？',
      a: '本当です・短期実感型のサプリではなく累積効果型です。\n\nStough 2008 Phytother Res RCT で健常成人にbacopa 300mg/日×12週で言語学習・記憶テストの有意改善、Calabrese 2008 J Altern Complement Med RCT n=54 でも12週評価が標準で、Kongkeaw 2014 J Ethnopharmacol メタ解析でも最低8-12週の継続が必要と整理されています。\n\nカフェイン・L-テアニン・L-アルファGPCのような30-60分の即時感覚はなく、「気づいたら以前より集中できている」「以前覚えにくかった内容が定着している」型の累積効果です。\n\nBacognize®/CDRI 08標準化バコパ（バコサイドA含有量規格化）の方が研究蓄積が多く品質安定。\n\n消化器症状（嘔気・下痢・腹部膨満）が出やすいため食後摂取推奨で、空腹時摂取で不快感が出る場合は朝食後・昼食後の2回分割が現実的です。',
    },
    {
      q: 'ライオンズメインとバコパは併用できる？スタックの組み方は？',
      a: '併用OK・経路独立で現実的なスタックです。\n\nライオンズメイン（NGF誘導）とバコパ（アセチルコリン受容体経路）は作用ターゲットが完全に分離しており相互の効果を阻害しません。\n\n推奨スタック例：①朝食後にバコパ300mg（脂溶性のため食事と一緒で吸収率向上・Bacognize®等規格化品推奨）、②昼食後にライオンズメイン1.5-3g（粉末orカプセル）、③L-テアニン200mg を午後の集中力サポートで追加、④L-アルファGPC 300mg または ホスファチジルセリン 100mg を加えるとアセチルコリン系をさらに強化、というスタックが認知機能向上層で妥当です。月コストは¥4,000-7,000程度。\n\n併用注意：両者とも消化器症状（特にバコパ）が出やすく食後摂取必須、ライオンズメインはキノコアレルギー注意、抗凝固薬と併用は理論的注意（バコパは出血傾向の動物実験報告あり）、妊娠中・授乳中はデータ限定で避けるべき領域です。',
    },
    {
      q: '若年層の集中力UPか、高齢者のMCI対策か、年齢別の使い分けは？',
      a: '若年〜中年（20-50代）の集中力ならバコパ優先、60代以上のMCI予防ならライオンズメイン優先が無難な使い分けです。\n\n若年〜中年層の使い分け：①集中力・記憶・試験/仕事のパフォーマンス→バコパ300mg/日×12週、②即時集中→L-テアニン200mg＋カフェイン100mgの古典スタック、③長期記憶定着→ホスファチジルセリン100mg、④睡眠の質経由→マグネシウム グリシン酸塩。\n\n60代以上の認知低下対策：①ライオンズメイン3g/日×16週（Mori 2009 RCT根拠）、②オメガ3 EPA+DHA 1-2g/日（DHA脳機能サポート）、③ビタミンD 1,000-2,000IU/日（高齢者で低値が認知低下と関連報告）、④B12メチルコバラミン500-1,000μg/日（ホモシステイン低下経由）、⑤運動・社会的交流・睡眠の基盤が論文上で効果大。\n\n両者とも認知症が治る断定は薬機法・論文ベースで両方NGで「MCI患者RCTで認知機能スコア改善が報告された」が誠実な記述。3ヶ月続けて効果評価が現実的な期待値です。',
    },
  ],
  'pantothenic-acid-vs-niacinamide': [
    {
      q: 'ナイアシンアミドとパントテン酸（B5）の違いは？',
      a: '作用ターゲットが完全に異なります。\n\nナイアシンアミドはビタミンB3（ニコチンアミド）の単一分子で、外用5%が標準濃度。表皮ケラチノサイトで①NAD+前駆体としてエネルギー代謝、②メラノソーム転送阻害でメラニン拡散抑制、③セラミド合成促進でバリア機能強化、の3経路で作用（Hakozaki 2002 RCT 5%×8週で色素沈着改善・Bissett 2005 で小じわ改善）。\n\nパントテン酸（B5）はCoA前駆体で、外用は主にD-パンテノール（プロビタミンB5）1-5%として配合される。角質層の水分保持・上皮再生・修復シグナル（Ebner 2002 D-パンテノール5%で皮膚バリア機能改善）が中心で、CICA系コスメ（パンテノール+センテラ）にも頻配合。「B3=メラニン抑制+バリア+小じわの多面作用」vs「B5=保湿+修復+鎮静の限定機能」と整理すると分かりやすく、競合関係ではなく完全な補完関係です。',
    },
    {
      q: 'ナイアシンアミドとパントテン酸は併用できる？順番は？',
      a: '併用が論文上で合理的です。経路が独立で相互の効果を阻害せず、市販でもナイアシンアミド5%+パンテノール3%配合の韓国コスメ・ダーマブランド（COSRX/Cetaphil等）が普及しています。【推奨運用】朝＝化粧水→ナイアシンアミド5%セラム→D-パンテノール配合保湿クリーム、夜＝洗顔→化粧水→D-パンテノール（修復）→ナイアシンアミド5%（攻め）→保湿。同時塗布の場合はパンテノールを先に薄く（バリア準備）→ナイアシンアミドを上に重ねる順序で刺激リスクが下がります。両者とも妊娠中・授乳中も比較的安全とされ、敏感肌・酒さ・アトピー素因の方の組み合わせとして実用性が高い処方です。',
    },
    {
      q: '経口パントテン酸（高用量療法）はニキビに効きますか？',
      a: '論文ベースで限定的な評価です。【歴史的経緯】Lit-Hung Leung 1995 のオープン試験（n=100）で経口パンテノール10g/日でニキビ改善が報告され、一部のSNS・ブログで「ビタミンB5高用量療法」として広まりました。【現代の評価】Yang 2014 RCT（n=48・経口B5複合 2.2g/日×12週）でニキビ病変数の有意減少が報告されましたが、サンプル数小・追試が限定的でエビデンス階層はB（小規模RCT）止まりです。【限界】10g/日の超高用量は消化器症状・脱毛のリスク報告があり、安全性・継続性が課題。【現実的な判断】ニキビ対策としては経口B5高用量療法より、①外用ナイアシンアミド5%（バリア+抗炎症）、②外用アゼライン酸10-15%（角化異常+殺菌）、③皮膚科でディフェリンゲル/エピデュオ等が論文上で第一選択です。経口B5は補助的位置づけに留めるのが安全です。',
    },
    {
      q: 'ニキビ・敏感肌・乾燥肌でどちらを優先すべき？',
      a: '',
    },
    {
      q: '効果が出るまでとコスパで結局どっち？',
      a: 'ナイアシンアミド5%が論文上のコスパ最強・第一選択です。【ナイアシンアミド5%】月コスト¥2,000-5,000・4-8週で色素沈着/バリア/小じわの主観改善・複数RCTで再現性確認（エビデンスS）。【D-パンテノール3-5%】月コスト¥1,500-4,000・2-4週で乾燥感/赤み/ヒリつきの主観改善・Ebner 2002他で軽度バリア改善RCT（エビデンスA）。【迷ったら】ナイアシンアミド5%外用単独から始め、4-8週で評価し、乾燥・赤みが気になれば朝or夜にD-パンテノール配合製品を併用追加。年単位の運用でも安全性が高く、刺激ほぼなし（10%超は注意）・妊娠中も比較的安全（産婦人科確認推奨）の組み合わせは、エビデンス×低リスク×継続性で「30代から始めるスキンケア」の標準形になりやすい構成です。',
    },
  ],
  'lutein-vs-zeaxanthin': [
    {
      q: 'ルテインとゼアキサンチンの違いは？',
      a: '両者とも黄斑色素を構成するカロテノイドですが、構造と分布が異なります。\n\nルテインは黄斑の外側（傍中心窩）に多く分布し、ブルーライト吸収と抗酸化に作用。\n\nゼアキサンチンは黄斑中心窩（フォベア・視力の鋭敏な中心視野）に集積し、最も解像度の高い視野を保護する役割分担があります。化学構造的にはルテインとゼアキサンチンは「立体異性体」（炭素の3つの結合の向きが違う）で、ルテインの一部は体内でメソゼアキサンチン（黄斑の中心部に変換される第3のカロテノイド）に変換されると報告されています。\n\n作用ターゲットが完全に分かれた補完関係で、競合関係ではなく併用が論文上の第一選択です。',
    },
    {
      q: 'ルテインとゼアキサンチンの推奨比率は？AREDS2の10:2はなぜ？',
      a: 'AREDS2試験で確立された10:2比が論文整合の併用標準です。AREDS2（JAMA 2013・n=4,203・5年）は元のAREDS（β-カロテン含有）でβ-カロテンの喫煙者肺癌リスク懸念があったため、ルテイン10mg+ゼアキサンチン2mgに置き換えた大規模RCTです。結果、加齢黄斑変性（AMD）の進行リスクが有意に低下しました（p<0.05）。【なぜ10:2か】食事性カロテノイド摂取比（緑黄色野菜・卵黄等から）に近いとされる比率で、黄斑への蓄積効率も実証されています。【市販品の選び方】ルテイン10mg+ゼアキサンチン2mg配合製品（FloraGLO Lutein特許エキス採用が多い）がAREDS2準拠の標準。Life Extension・NOW Foods・DHC等で配合品があり、月コスト¥1,000-2,500の範囲。「ルテイン単独製品」は黄斑中心窩へのアプローチが弱いため、AREDS2準拠の併用配合が論文上で推奨されます。',
    },
    {
      q: 'ルテインとゼアキサンチンは併用できる？どちらか単独でいい？',
      a: '併用が論文上で強く推奨されます。作用部位が異なる（ルテイン=黄斑外側・ゼアキサンチン=中心窩）ため重複せず、AREDS2試験も併用配合でRCTを組んでいます。【単独使用の限界】ルテイン単独だと黄斑中心窩への蓄積が弱く、視力の最も鋭敏な部分の保護が不完全。ゼアキサンチン単独はゼアキサンチン製品自体が少なく、コスパ的に不利。【併用OK】両者とも安全性プロファイルが類似（高用量で皮膚黄色化・消化器症状が稀）で、相互作用も既知ではありません。【追加検討候補】メソゼアキサンチン（黄斑中心部の主要カロテノイドの一つ）配合製品（MZ・ゼアキサンチン異性体）も近年市販されており、Stringham 2017 RCT等でMPOD（黄斑色素光学密度）の追加改善が報告されています。ただしAREDS2の主要エビデンスはルテイン+ゼアキサンチンの2成分で確立されているため、まず2成分から始めるのが王道です。',
    },
    {
      q: '抗酸化薬・抗凝固薬との併用は大丈夫ですか？',
      a: '【併用OK】ビタミンE・C・亜鉛・銅（AREDS2フォーミュラ全成分）との併用は論文ベースで補完的・推奨。オメガ3 EPA+DHA・アスタキサンチン等の他の脂溶性抗酸化との併用も補完関係（ただし AREDS2 では DHA/EPA 追加群で AMD 進行抑制の追加効果は示されず、ルテイン+ゼアキサンチンが主軸）。【B：理論的相互作用・データ限定】①ワルファリン・抗凝固薬＝高用量カロテノイドの理論的相互作用が一部報告されているが、AREDS2の10mg/2mg用量では明確な臨床的相互作用は確立されていない・服用中は念のため医師相談、②脂質吸収阻害薬（オルリスタット・コレスチラミン）＝脂溶性カロテノイドの吸収低下のため2-4時間ずらす運用が安全側、③ベータカロテン高用量サプリ＝喫煙者の肺癌リスク上昇報告（CARET試験）があるためAREDS2はβ-カロテンを除外。ルテイン・ゼアキサンチン単独ではそのリスクは確認されていません。【A：医師相談必須】妊娠中・授乳中＝高用量サプリは安全性データが限定的なため食事ベース（緑黄色野菜・卵黄）からの摂取を優先してください。',
    },
    {
      q: '効果が出るまで何ヶ月？スマホ眼疲労・加齢黄斑変性予防で時間軸は違う？',
      a: '評価軸ごとに時間軸が完全に異なります。【スマホ・PC作業の眼疲労（短期）】12週でMPOD改善・コントラスト感度向上（Stringham 2017 RCT・10mg+2mg×6ヶ月）。日常使用の「目が疲れにくくなった」「夕方の視界の調子」の主観改善は3-6ヶ月で評価。【加齢黄斑変性の進行抑制（長期）】AREDS2試験では5年継続でAMD進行リスク有意低下が確認されました。家族歴・喫煙歴・55歳以上のAMD予防目的なら数年単位の継続が前提です。【判定基準】3ヶ月で「目の疲れ」「夕方の見え方」の主観評価、6-12ヶ月でMPOD（眼科で測定可）の客観評価、5年以上で加齢黄斑変性予防効果の評価。脂溶性のため食事（特に脂質を含む食事）と一緒に摂取することで吸収率が大幅に上がります。「飲んで1週間で視力が0.X単位上がる」断定的効果は論文ベースで成立せず、累積型の長期保護として位置づけるのが現実的です。',
    },
  ],
  'ashwagandha-vs-panax-ginseng': [
    {
      q: 'アシュワガンダと朝鮮人参（高麗人参）の違いは？',
      a: '植物学的に完全に別科で、活性成分も作用機序も異なります。アシュワガンダ（Withania somnifera・ナス科）の主活性はwithanolide A、Panax人参（朝鮮人参・高麗人参 Panax ginseng・ウコギ科）の主活性はginsenoside Rb1/Rg1（人参サポニン）。「東洋の朝鮮人参・インドのアシュワガンダ・北欧のロディオラ」の3兄弟アダプトゲンの中で、アシュワガンダは HPA軸のコルチゾール調整（慢性ストレス・不眠）、Panax人参は エネルギー代謝・末梢血流・認知（急性疲労・集中力低下）が得意領域。同じ「アダプトゲン」括りでも、評価軸は別物として使い分けるのが現実的です。',
    },
    {
      q: 'アシュワガンダとPanax人参の有効量・形態は？',
      a: '【アシュワガンダ】KSM-66標準化抽出 300-600mg/日・朝食後が論文上の目安（Salve 2019・Chandrasekhar 2012 RCT）。Sensoril、CHO-A等の他規格化品も流通。【Panax人参】高麗紅参（Korean Red Ginseng）またはginsenoside標準化抽出 200-400mg/日が論文上（Reay 2010・Bach 2016 RCT）。市販品では正官庄（Cheong Kwan Jang・韓国KGC社）が世界最大シェアでginsenoside含有量明示。\n\n「ginsenoside量」がそのまま品質を表すため安価な人参茶等は規格化標準量を満たさない可能性があります。両者とも食事直後の脂質吸収併用が推奨で、空腹時は胃腸刺激あり。',
    },
    {
      q: '西洋人参（Panax quinquefolius）と朝鮮人参（Panax ginseng）の違いは？',
      a: '同じPanax属でも品種が異なり、ginsenoside組成と性質が逆です。【朝鮮人参（Panax ginseng・アジア種）】Rg1/Rb2優位の「温める性質」で、エネルギー賦活・集中力向上・男性活力に強く、過剰摂取で不眠・神経興奮の報告あり。【西洋人参（Panax quinquefolius・アメリカ種）】Rb1優位の「冷やす性質」で、鎮静寄り・血糖低下・II型糖尿病補助のRCT（Vuksan 2000 Arch Intern Med・1g 40分前経口で食後血糖低下）。中医学では「朝鮮人参=陽・西洋人参=陰」と分類され、日中疲労なら朝鮮人参・夜の余熱（火照り）には西洋人参の使い分けが東洋医学的にも論文との整合性が高い。「人参」と一括りにすると個人差が大きいため、品種明示の製品選定が必要です。',
    },
    {
      q: 'アシュワガンダとPanax人参は併用できる？',
      a: '併用可能で、両者の経路独立を活かした補完設計が無難です。【設計例】朝（高麗人参200mg）→集中力・末梢血流向上、夜（KSM-66 300-600mg 夕食後）→コルチゾール調整・睡眠の質向上の二段スタック。ただし過剰摂取・複数アダプトゲン同時開始は禁忌で、2-4週ずつ単独試行→効果と副作用評価→併用判断が安全側。【併用時の注意】①血糖降下：両者とも軽度血糖低下作用ありで糖尿病薬併用は要医師相談、②血圧低下：高用量併用で起立性低血圧の報告あり、③SSRI・抗うつ薬：理論的セロトニン症候群懸念で併用は医師相談、④ロディオラとの3者併用は経験的に過剰刺激（不眠・動悸）報告があり推奨されません。',
    },
    {
      q: '副作用・禁忌・薬物相互作用は？',
      a: '【共通禁忌】①妊娠中・授乳中＝両者とも安全性データ限定で産婦人科確認、②自己免疫疾患（橋本病・関節リウマチ・全身性エリテマトーデス）＝免疫調整作用で疾患活動性影響の懸念、③SSRI・MAOI・抗不安薬＝理論的相互作用、④抗凝固薬＝Panax人参でワルファリンINR変動症例報告あり、⑤甲状腺薬＝アシュワガンダで甲状腺ホルモン上昇報告（Sharma 2018 J Altern Complement Med）。【アシュワガンダ固有】高用量で消化器症状・眠気・甲状腺機能亢進、ホルモン依存性疾患（乳がん・前立腺がん）既往は医師相談。【Panax人参固有】高用量で不眠・神経興奮・血圧変動・男性ホルモン作用での前立腺疾患既往注意。降圧薬・血糖降下薬・カフェイン高摂取者は慎重評価が必要です。',
    },
  ],
  'fisetin-vs-quercetin': [
    {
      q: 'フィセチンとケルセチンの違いは？',
      a: 'フラボノール骨格の構造類似ポリフェノールで共にsenolytics（老化細胞除去）作用が報告されますが、senolytics作用強度と二刀流の有無が異なります。【フィセチン】イチゴ・リンゴ・柿に含まれ、Yousefzadeh 2018 EBioMedicineでマウス約20%lifespan延長・複数臓器老化細胞マーカー減少。Wake Forest大学でPhase II臨床試験進行中。【ケルセチン】玉ねぎ・リンゴ皮・茶葉に含まれ、Zhu 2015 Aging Cellで「D+Qカクテル」（dasatinib+quercetin）として最初のsenolytics確立。\n\nsenolytics作用強度はフィセチン>ケルセチンとの in vitro 報告がありますが、ヒトでの大規模RCT比較はまだ未確立です。',
    },
    {
      q: 'フィセチンはケルセチンの上位互換と考えていい？',
      a: '「上位互換」評価は早計で、「適用集団が違う成分」設計が王道です。①ケルセチンはsenolytics以外の二刀流エビデンスが独立して確立（抗ヒスタミン Mlcek 2016 Molecules review・抗炎症・血圧軽度低下 Edwards 2007 J Nutr）、②フィセチンはsenolytics特化だがヒトでの大規模RCTがまだ進行中で「マウス→ヒト」の移植期、③hit-and-run投与（フィセチン 2-3日連続→2-4週休薬）と継続投与（ケルセチン 花粉症対策で日々500mg継続）は運用設計が逆方向。\n\n目的が決まっていれば選定可能：senolytics特化ならフィセチン、花粉症対策・抗炎症日常運用ならケルセチンで、両者を「同じ括り」で比較するより目的別の使い分けが現実的です。',
    },
    {
      q: 'senolytics目的での投与設計（hit-and-run）は？',
      a: '「hit-and-run」サイクル投与が senolytics 文脈の実用的な投与設計です。Justice 2019 EBioMedicineのD+Q Phase Iは「3日間連続投与→3週間休薬」を3サイクル行いました。【フィセチンのhit-and-run例】100-500mg/日を2-3日連続→2-4週休薬→再開、を月1サイクル運用。連日継続より老化細胞除去の効率がよいとする仮説に基づきます。【根拠】老化細胞は除去されても完全に増殖が止まるわけではなく、組織で再蓄積するため定期的な「除去サイクル」が論理的に整合します。【注意】ヒトでの最適投与設計は未確立で、サプリ会社の独自プロトコルが先行している段階。Wake Forest大学のPhase IIフィセチン試験結果待ちが論文上の判断基準で、現状は「マウス→小規模ヒトの移植期」と理解した上で先行投資型の運用と認識することが現実的です。',
    },
    {
      q: '花粉症・抗ヒスタミン目的ではどっち？',
      a: 'ケルセチン一択です。フィセチンは抗ヒスタミン作用のヒトRCTがほぼ未確立で、花粉症対策で論文ベースに整合するのはケルセチンです。【ケルセチン抗ヒスタミン】肥満細胞からのヒスタミン遊離抑制（Mlcek 2016 Molecules review）でアレルギー性鼻炎・花粉症の補助対策。500-1,000mg/日を花粉飛散2-4週前から開始→ピーク期継続が運用例。【市販品】Thorne Quercetin Phytosome・Solgar Quercetin Complex等でbromelain（パイナップル酵素）配合品はケルセチン吸収を補助するため花粉症対策で人気。\n\n第二世代抗ヒスタミン薬の代替ではなく補助レイヤーで、症状コントロール不十分なら処方薬第一選択は変わりません。フィセチンは「ケルセチンの代替」としては適用外で、senolytics特化として認識する方が現実的です。',
    },
    {
      q: '副作用・抗凝固薬・CYP3A4併用は？',
      a: '両者とも抗血小板作用とCYP3A4阻害で薬物相互作用に注意が必要です。【ワルファリン・抗凝固薬】両者ともINR上昇懸念で併用は医師相談・INRモニタリング必須、手術前2週休薬推奨。【CYP3A4基質薬剤】カルシウム拮抗薬・スタチン（特にシンバスタチン）・タクロリムス・シクロスポリン等は血中濃度上昇懸念があり、処方薬服用中は併用前医師相談が安全側。【その他】①ケルセチン高用量（>1g/日）長期で腎機能影響の報告あり腎疾患既往者注意、②フィセチンは高用量データが限定的、③妊娠中・授乳中は両者ともデータ限定で食事ベース摂取を優先、④胆道閉塞・胆石症既往はCYP3A4阻害で胆汁排泄影響の懸念。\n\nSinclair陣営longevityスタック（NMN+レス+ケルセチン or フィセチン+メトホルミン）は研究者個人の運用で、定期的な血液検査と医師フォローが前提の運用です。',
    },
  ],
  'spermidine-vs-resveratrol': [
    {
      q: 'スペルミジンとレスベラトロールの違いは？',
      a: '作用経路が完全に独立しているため競合関係ではなく補完関係です。【スペルミジン】細胞内ポリアミンでautophagy（オートファジー・細胞内自食作用）誘導経由（Eisenberg 2009 Nat Cell Biolで酵母/線虫/マウス寿命延長・Madeo 2018 Nat Med 観察研究 n=829で食事性スペルミジン摂取量と心血管死亡率の逆相関）。【レスベラトロール】SIRT1活性化・カロリー制限模倣経由（Howitz 2003 Nature 古典論文・酵母/線虫/ハエ寿命延長）。\n\nautophagy（細胞内のリサイクル）とSIRT1（カロリー制限模倣）は longevity 文脈で並立する2大経路で、両者は重ならず併用設計が無難です。',
    },
    {
      q: 'スペルミジンは食事から取れる？サプリ必要？',
      a: '食事改善が第一選択で、サプリは補助レイヤーが王道です。【食事由来】小麦胚芽（約30mg/100g）・大豆発酵食品（納豆・味噌）・チーズ熟成品（パルメザン・ブルーチーズ）・干しシイタケが豊富。日本食は世界的にスペルミジン摂取量が多い食文化です。【Madeo 2018の評価軸】食事性スペルミジン摂取量を評価軸としており、精製サプリ単独のヒトRCTエビデンスはまだ初期段階。【サプリ】spermidineLIFE®（Longevity Labs社・小麦胚芽抽出標準化）等で1-3mg/日が論文上、月¥3,500-7,000の高価帯。【判断基準】「食事改善が難しい・小麦胚芽/納豆を日常的に取れない」場合の補助としてサプリを位置づけ、食事改善優先が費用対効果として現実的です。',
    },
    {
      q: 'レスベラトロールの寿命延長エビデンスは？',
      a: 'マウス〜小規模ヒト初期段階で、ヒトでの寿命延長は未確立というのが現実的な評価です。【マウス】Baur 2006 Natureで高脂肪食マウスのlifespan延長・代謝改善が報告。【ヒト】Tomé-Carneiro 2013 Pharmacol Res メタ解析で心血管リスクマーカー改善は確認・寿命延長エビデンスは未確立。\n\n「ヒトでX年寿命が延びる」断定的訴求はNGで、「動物実験で寿命延長が確認された」「ヒトで心血管リスクマーカー改善が報告された」型が無難です。【Sinclair陣営の運用】David Sinclair教授（Harvard）はNMN+レスベラトロール+メトホルミンの個人運用を公表していますが、これは研究者個人の運用で、大規模ヒトRCTでの寿命延長エビデンスとは別レイヤーの話です。',
    },
    {
      q: 'スペルミジンとレスベラトロールは併用できる？',
      a: '併用可能で、autophagy×SIRT1の2経路を同時に動かす設計です。【Sinclairスタック例】NMN（NAD+前駆体）+レスベラトロール（SIRT1）+スペルミジン（autophagy）+メトホルミン（インスリン感受性）の4成分スタックが研究者個人運用として知られます。【判断基準】①予算が限られる場合の優先順位は 食事改善（小麦胚芽・納豆・トランス型ブドウ皮含有食品）→レスベラトロール→スペルミジンサプリ の順、②月コスト¥4,000-11,000の合算になるため食事改善との費用対効果を冷静に比較、③体感型サプリではなく累積投資型でmarker評価（HbA1c・脂質・炎症マーカー等）の6-12ヶ月単位で判定。「飲んだ翌日に若返る」型の即時感覚は両者とも論文ベースで成立しません。',
    },
    {
      q: '副作用・抗凝固薬・妊娠中は？',
      a: '【スペルミジン】食事由来は安全性問題ほぼなし。精製サプリは高用量データ限定で、消化器症状の報告あり。妊娠中・授乳中・乳幼児は安全性データ限定のため食事ベースに切り替えるのが安全側。【レスベラトロール】①抗血小板作用でワルファリン・抗凝固薬INR上昇懸念、手術前2週休薬推奨、②CYP3A4阻害でカルシウム拮抗薬・スタチン・タクロリムス血中濃度上昇懸念、処方薬服用中は併用前医師相談、③エストロゲン様作用が in vitro で報告されており、エストロゲン受容体陽性乳がん既往・子宮内膜症既往は医師相談、④高用量（>1g/日）長期で消化器症状・腎機能影響の散発報告あり、⑤妊娠中・授乳中はデータ限定で避けるのが安全側。\n\n両者とも longevity 文脈の先行投資型サプリで、安全性データの追加蓄積を見守りつつ運用する領域です。',
    },
  ],
  'l-theanine-vs-gaba': [
    {
      q: 'L-テアニンとGABAの違いは？',
      a: '両者ともGABA系神経伝達物質の調整を介してリラックス効果が訴求されますが、血液脳関門（BBB）通過の論点でエビデンス強度が異なります。【L-テアニン】緑茶由来アミノ酸で、Yokogoshi 1998 Neurochem ResでBBB通過が確立・脳内で直接GABA関連経路に作用。Hidese 2019 RCT n=30で200mg/日×4週で睡眠の質・心理ストレス症状有意改善。【GABA経口】BBB通過に論争があり、Boonstra 2015 Front Psychol systematic reviewで「経口GABAはBBBを通過しないが、末梢経由でHPA軸を修飾する間接効果の可能性」が指摘。Abdou 2006 BioFactorsでPharmaGABA® 100mgでα波増加・コルチゾール低下が報告されましたが、プラセボ群との差が穏やかで個人差が大きい。',
    },
    {
      q: '経口GABAは脳に届く？BBB通過論争の現状',
      a: '「直接通過しない」が現在の主流見解で、効果が出る場合は末梢経由の間接作用というのが Factcheck 整合的です。【両論】①BBB通過否定派＝Knudsen 1988以来「GABAは極性が高く脂溶性が低いためBBB通過困難」が定説、②末梢経由肯定派＝Boonstra 2015で「腸管神経系・迷走神経経由でHPA軸を修飾する可能性」、Abdou 2006のα波増加報告も末梢経由の可能性。【現状の評価】「経口GABAが脳に直接効く」断定的訴求は論文ベースで成立しない領域で、効果を感じる場合も穏やか・個人差が大きい。PharmaGABA®（ファーマフーズ社・乳酸菌発酵GABA）等の特定形態のヒトRCTは限定的で、Suntheanine®（味の素社・L-テアニン標準化品）の方が大規模RCTが充実しています。',
    },
    {
      q: 'L-テアニンとGABAの有効量・効果が出るまで',
      a: '【L-テアニン】200-400mg/日が論文上。Hidese 2019で200mg/日×4週で睡眠の質改善。\n\n急性効果は30-60分でα波増加・主観的リラックス感（Kobayashi 1998・Lu 2004 fMRI）、累積効果は2-4週で睡眠の質・心理ストレス症状改善。【GABA】PharmaGABA® 100-200mg/日が市販品の標準用量。Abdou 2006の急性効果も30-60分で報告されますがプラセボ差が穏やか。【判断基準】第一選択はテアニン200mgが王道。「飲んで30分でリラックス」の即時感覚はテアニンの方が再現性高く報告されており、GABAは個人差が大きい印象が論文と一致します。GABAは「PharmaGABA®特定形態の補助レイヤー」として位置づけ、テアニンで効果不十分なら追加検討が現実的な順序です。',
    },
    {
      q: 'L-テアニンとGABAは併用できる？',
      a: '併用可能で、両者ともGABA系経路の補助で穏やか・副作用プロファイルが軽微なため、二段スタックが安全側に運用可能です。【設計例】仕事の集中→朝のテアニン+カフェイン2:1（テアニン200mg+カフェイン100mg・Owen 2008 Nutr Neurosci でテアニン+カフェイン併用で注意改善）、就寝前のリラックス→テアニン200mg+GABA 100mg（PharmaGABA®）の二段スタック。【限界】両者ともベンゾジアゼピン系抗不安薬の代替ではなく補助レイヤーで、不安症状コントロール不十分なら精神科第一選択は変わりません。Lemon Balm（メリッサ）・カモミール・パッションフラワー等のハーブ系GABA調整素材との併用も可能ですが、過剰スタックは効果検証が困難になるため2-3成分までが運用上の上限です。',
    },
    {
      q: '副作用・降圧薬・抗うつ薬併用は？',
      a: '両者とも副作用プロファイルは比較的軽微ですが、薬物相互作用には注意が必要です。【L-テアニン】高用量で頭痛・消化器症状の散発報告あり、降圧薬併用で軽度血圧低下が相加する可能性、SSRI・MAOI・抗不安薬との併用は理論的注意（明確な臨床的問題報告は限定的）。【GABA】消化器症状・頭痛・短時間の血圧低下が報告。①降圧薬併用注意＝血圧低下が相加し起立性低血圧の懸念、②抗不安薬（ベンゾジアゼピン系）併用注意＝鎮静作用相加の懸念、③SSRI・SNRI併用は理論的注意。【共通】妊娠中・授乳中は安全性データ限定で原則避ける、自動車運転前の初回試行は控える、アルコール併用は鎮静作用相加で慎重に。\n\n「サプリだから何でも併用安全」ではなく、降圧薬・精神科処方薬服用中は併用前医師相談が現実的です。',
    },
  ],
  'creatine-vs-l-glutamine': [
    {
      q: 'クレアチンとL-グルタミンの違いは？',
      a: '作用ターゲットが筋肉と腸管で完全に分かれた補完関係です。【クレアチン】ATP再合成（高強度短時間運動のエネルギー供給）経由で筋力・パワー・除脂肪体重に作用（Kreider 2017 JISSNポジションスタンドで「最も研究され効果の証拠が確立されたエルゴジェニックサプリ」評価・Lanhers 2017 Sports Med メタ解析n=1,800超で上半身筋力 +7%・下半身筋力 +8%）。【L-グルタミン】条件付き必須アミノ酸で腸管バリア機能の維持・免疫機能補助に作用（Klimberg 1996 J Surg Resで術後/重症患者の腸管バリア機能補助・Rao 2012 J Epithel Biol Pharmacol systematic reviewで腸粘膜tight junction強化）。「両者とも筋トレ用サプリ」は誤解で、グルタミンの真価は腸活・免疫補助レイヤーです。',
    },
    {
      q: '筋トレ目的でどっち？',
      a: 'クレアチン圧勝で、健常若年トレーニーへの筋トレ目的ならグルタミンは期待外れです。【クレアチン】筋トレ補助エビデンスS（最強評価）・3-5g/日・¥1,000-2,500/月・コスパ最強。【グルタミン】健常若年トレーニーへの筋肥大/筋力効果はCandow 2001 等で否定的で、健常者では血中グルタミン濃度が枯渇しにくく、追加摂取の必要性が薄い。【判断基準】筋トレ目的でサプリ予算が限られるならクレアチン一択で、グルタミンに月¥1,500-3,500を回すならホエイプロテイン・クレアチン増量・ビタミンDの方が論文上のROIが高い。\n\n「筋トレ補助でグルタミンを買う」は2010年代までの古い常識で、現在の現実的な選択はクレアチン+ホエイ+ビタミンD+EAA（必須アミノ酸）の組み合わせです。',
    },
    {
      q: 'グルタミンは腸活に効く？リーキーガット仮説の現状',
      a: '術後/重症患者の腸管バリア補助はエビデンス確立・健常者のリーキーガット改善は仮説段階です。【確立エビデンス】Klimberg 1996 J Surg Resで術後/重症患者の腸管バリア機能補助・短腸症候群（small bowel syndrome）の標準補助療法。Rao 2012 systematic reviewで腸粘膜tight junction（細胞間結合）強化が in vitro〜動物で報告。【仮説段階】健常者のリーキーガット症候群（腸管透過性亢進・LPSの血中流入仮説）は概念自体が代替医療領域中心で、健常者を対象とした大規模RCTでの症状改善エビデンスは限定的。【判断基準】①術後・がん化学療法後・長期入院後の腸活補助→医師相談下で5-10g/日が論文上、②慢性下痢・IBS・炎症性腸疾患補助→消化器内科併走下、③健常者の予防的腸活→食事改善（食物繊維・発酵食品・プレ/プロバイオティクス）が費用対効果で優先です。',
    },
    {
      q: 'クレアチンとグルタミンは併用できる？',
      a: '併用可能で、両者の作用ターゲットが完全に独立しているため運用設計上の問題はありません。【併用例】筋トレ+腸活/免疫補助同時運用＝クレアチン3-5g/日（筋トレ前後）+グルタミン5-10g/日（就寝前または高強度持久運動後）の二段スタック。マラソン・トライアスロン等の高強度持久運動の翌日免疫低下抑制目的にグルタミンを補助レイヤーで追加する設計はCastell 1996 Eur J Appl Physiolの報告に整合的です。【判断基準】①健常若年トレーニー：クレアチン単独で十分・グルタミンは予算余裕時の追加レイヤー、②術後・長期入院・がん化学療法後：医師相談下でグルタミン主軸・クレアチン併用は医師判断、③高強度持久運動アスリート：両者併用が無難、④高齢者サルコペニア対策：クレアチン+ホエイ+ロイシンが主軸でグルタミン優先順位は低い。',
    },
    {
      q: '副作用・腎機能誤判定・術後がん患者・腎疾患既往は？',
      a: '【クレアチン】①血清クレアチニン上昇による腎機能誤判定＝クレアチン代謝物がクレアチニンに変換され血中濃度が見かけ上上昇するが、これは検査値ノイズで実害ではない（Poortmans 1999他複数RCTで腎機能への悪影響否定）。検査前1週間休薬、または医師に「クレアチン摂取中」を申告すればOK、②腎疾患既往者は念のため医師相談、③水分摂取量増加（脱水回避）が必要。【グルタミン】①術後がん患者での慎重論＝Klimberg 1990他で「腫瘍にもグルタミンが供給され腫瘍増殖を促進する可能性」が指摘されており、がん化学療法中の使用は腫瘍内科医判断、②肝機能障害・腎機能障害既往ではアンモニア代謝負荷の懸念で医師相談、③妊娠中・授乳中は安全性データ限定で原則避ける。\n\n両者とも健常者には比較的安全で、医学的既往がある場合は処方医・腫瘍内科医との併走下が王道です。',
    },
  ],
  'vitamin-d-vs-vitamin-k2': [
    {
      q: 'ビタミンDとビタミンK2は併用すべきですか？役割の違いは？',
      a: '両者は補完関係で併用が論文上の第一選択です。ビタミンDは腸管でカルシウムを取り込む「入口の役割」、ビタミンK2（MK-7）はオステオカルシン（骨）とMGP（血管Glaタンパク）を活性化してカルシウムを骨に配分・血管壁への沈着を抑える「配分の役割」です。Hodges 2020 Current Developments in Nutrition のレビューで「D単独高用量での血管石灰化リスクへの理論的懸念とK2併用での最適化」が整理されており、Knapen 2013 Thromb Haemost RCT（閉経後女性 n=244 MK-7 180μg/日×3年）では大腿骨頸部の骨密度維持と動脈硬化指標（cfPWV）改善が報告されています。骨粗鬆症リスク・心血管リスク両軸で気になる中高年は「D3+K2」セット製品（Thorne・Sports Research 等）が現実解です。',
    },
    {
      q: 'MK-7とMK-4の違いは？納豆を食べていればK2サプリは不要ですか？',
      a: 'MK-7（メナキノン-7）は納豆菌由来の長時間作用型で半減期約72時間、低用量（90〜200μg/日）で持続的に作用します。Schurgers 2007 Blood ではMK-7が血中Glaタンパク活性を3日以上維持することが確認されています。\n\nMK-4（メナキノン-4）は動物性食品由来の短時間作用型で半減期約1時間、日本では骨粗鬆症の処方薬として高用量（45mg/日）で使われていますが、サプリ用途では1日数回の分割摂取が必要で利便性は劣ります。\n\n納豆はK2の食事性ソースとして優秀（1パック50g程度で約500μg含有）ですが、毎日継続できない方・血液サラサラ系の薬を服用していない方ならMK-7サプリ（90〜200μg/日）の併用が現実的です。納豆習慣がある方は単独サプリ不要で、D3単独またはD3+K2セットで微量上乗せという運用が現実的です。',
    },
    {
      q: 'ワルファリン（抗凝固薬）服用中はK2サプリを避けるべき？',
      a: 'ワルファリン服用中はK2サプリ単独・D3+K2セットいずれも絶対医師相談が必要です。ワルファリンはビタミンKエポキシド還元酵素（VKOR）を阻害して凝固因子（II・VII・IX・X）の活性化を抑える薬剤で、ビタミンK摂取量の変動でINR（凝固指標）が大きく変動します。納豆・クロレラ・青汁が「ワルファリン禁忌食品」とされる根拠も同じで、K2サプリも一律で「禁忌」「絶対避ける」ではなく「医師管理下で一定量を維持する運用」になります。ワルファリン以外の抗凝固薬（DOAC：エリキュース・リクシアナ・プラザキサ等）はビタミンK代謝への影響がほぼないため、K2併用が問題になりにくいとされていますが、いずれも自己判断ではなく主治医・薬剤師の確認下で開始してください。',
    },
    {
      q: 'D3+K2セット製品とD3単独サプリ、どっちを選ぶ？費用差は？',
      a: '【迷ったらD3+K2セット】が無難な第一選択です。価格差は月¥100-300程度（NOW Foods D3単独¥140/月・Thorne D3+K2¥400-600/月・Sports Research D3+K2¥450/月）で、骨粗鬆症予防・血管石灰化予防の観点で費用対効果が高い差額です。\n\n例外は①ワルファリン服用中、②納豆を毎日食べる習慣がある（食事性K2で十分）、③主治医からK2制限の指示がある、の3ケースで、これらに該当する場合はD3単独を選び、K2は食事と医師相談で管理します。市販品ではThorne D3+K2 1,000IU/200μg・Sports Research D3+K2 5,000IU/100μgが定番、論文RCT中央域（D 1,000-4,000IU・K2 90-200μg）に収まる選択肢です。',
    },
    {
      q: 'ビタミンD・K2の過剰摂取はどこから危険ですか？妊娠中の用量目安は？',
      a: '【ビタミンD】長期的に10,000IU/日超で高カルシウム血症（脱力・吐き気・腎結石・血管石灰化）のリスクが上がります。4,000IU/日以下は多くの研究で安全とされ、NIH ODS の UL（耐用上限量）も4,000IU/日です。【ビタミンK2】副作用報告ほぼなしで、200μg/日の長期摂取RCT（Knapen 2013・3年）でも有害事象は報告されていません。理論的上限値は設定されていませんが、ワルファリン服用者以外で過剰摂取が問題になることはまずありません。【妊娠中・授乳中の用量目安】ビタミンDは1,000〜2,000IU/日（不足が確認されれば産科指導下で4,000IUまで）、ビタミンK2は明確な推奨値はなく食事ベース（納豆等）からの摂取が一般的です。サプリ補充は産婦人科医に相談してください。',
    },
  ],
  // ── Session F Day 7 バッチ 2026-05-13（cardiovascular/cognitive/gut/sleep 既存pair の PAIR_CUSTOM_FAQS 埋め） ────────────
  'l-arginine-vs-l-citrulline': [
    {
      q: 'L-アルギニンとL-シトルリンの違いは？経口でどちらがNO産生を上げる？',
      a: '両者ともNO（一酸化窒素）前駆体で血管拡張に作用しますが、経口吸収率の妥当整理ではシトルリン優位です。\n\nSchwedhelm 2008 Br J Clin Pharmacol RCT n=20でシトルリン経口3g×2/日はアルギニン経口3g×2/日より24h血漿アルギニン濃度AUCを約2倍に高く維持できることが報告されています。これはL-アルギニン経口が肝臓・小腸の尿素回路代謝で初回通過効果として大半が消失する（Bode-Böger 2007 Br J Pharmacol レビュー）のに対し、シトルリンは肝臓を素通りして腎臓でアルギニンに変換される代謝経路の差に基づきます。「血中arg濃度を上げてNO産生を狙う」目的なら経口ではシトルリン優位が現代スポーツ栄養学の標準理解です。',
    },
    {
      q: '運動パフォーマンス目的ならどちらの論文エビデンスが厚い？',
      a: '運動パフォーマンスでは経口シトルリン優位が王道です。Bailey 2010 J Appl Physiol RCT n=9 シトルリン6g/日で重度運動TTE（疲労困憊時間）改善・Pérez-Guisado 2010 J Strength Cond Res n=41 シトルリンマレート8g/日プレワークアウトでベンチプレス反復回数改善が報告されています。一方アルギニン経口のメタ解析（Bescós 2012 Sports Med review）は一致した結果を示していません。実用的にはシトルリンマレート2:1（シトルリン4g+リンゴ酸4g=計8g）をワークアウト30-60分前に水で溶いて摂取する形が主流で、Now Foods/Doctor\'s Best/Thorne 等が¥2,000-4,000/月で入手可能です。',
    },
    {
      q: '男性活力（ED補助）目的ならどちらを選ぶ？PDE5阻害薬との併用は？',
      a: 'ED補助文脈ではシトルリンの方が現実的です。Cormio 2011 Urology RCT n=24 シトルリン1.5g/日×1ヶ月で軽度ED改善が報告されており、アルギニン高用量（5g/日以上）は個人差が大きい印象が論文と一致します。\n\nただし重篤な副作用リスクとして、シルデナフィル（バイアグラ）・タダラフィル（シアリス）・バルデナフィル（レビトラ）等のPDE5阻害薬との併用は絶対回避が必須です。両者ともNO/cGMP経路を増強するため、重篤な低血圧・失神・心筋梗塞・脳梗塞リスクが理論上想定されます。中等度以上のEDは泌尿器科の医療領域で、まず原因疾患（糖尿病・動脈硬化・テストステロン低下・心因性）の鑑別と治療が第一選択です。サプリは軽症補助レベルの位置づけにとどめてください。',
    },
    {
      q: '副作用・併用注意は？ヘルペスとアルギニンの関係は？',
      a: '【副作用】両者とも高用量で消化器症状（腹痛・下痢・嘔気）が報告されます。アルギニン10g超で軽度血圧低下・シトルリン10g超で胃もたれ報告。【ヘルペス】アルギニン高用量はHSV（単純ヘルペスウイルス）再活性化リスクが理論的にあり、Griffith 1987 Dermatologica で経口アルギニンとHSV再発の関連症例が報告されています。アルギニンはウイルス増殖を促進、リジンは拮抗的に作用する関係で、口唇ヘルペス・性器ヘルペス再発を繰り返す方はアルギニン高用量を避けるかリジン併用を検討してください。シトルリンも体内でアルギニンに変換されるため同様の注意が必要です。【併用】PDE5阻害薬・降圧薬（カルシウム拮抗薬・ACE阻害薬・ARB・β遮断薬）併用注意、慢性腎臓病CKD/慢性肝臓病で両者高用量医師相談、妊娠中・授乳中の安全性データ限定的で避けるのが無難です。',
    },
    {
      q: 'コスパ・選び方・第一選択は？',
      a: '【経口で効率を取るならシトルリン第一選択】が無難です。シトルリンマレート2:1（運動目的8g/日）¥2,000-4,000/月・遊離型シトルリン（ED補助1.5-3g/日）¥1,500-3,000/月、アルギニン3-6g/日 ¥1,500-3,500/月。\n\n選び方の3軸：①運動パフォーマンス→シトルリンマレート2:1 8g/日プレワークアウト（Bailey/Pérez-Guisado RCT準拠）、②男性活力補助→シトルリン1.5-3g/日就寝前（Cormio RCT準拠・ただしED本格対応は泌尿器科）、③心血管・血流補助→シトルリン3-6g/日朝（Schwedhelm 2008 血漿arg濃度維持）。化粧品メーカー視点として、シトルリン経口で血流改善経路を取りつつ、皮膚老化対策は外用レチノール/ナイアシンアミドを主軸にする組み合わせが現実解です。\n\nNow Foods/Doctor\'s Best/Thorneがコスパ良好、純度の高い遊離型・規格品を選ぶのが安全です。',
    },
  ],
  'ginkgo-biloba-vs-bacopa-monnieri': [
    {
      q: 'イチョウ葉とバコパモニエリの違いは？作用機序の独立軸を整理',
      a: '両者とも認知サポートで訴求されますが、作用機序が完全に独立しています。\n\nイチョウ葉（EGb 761® Schwabe社特定規格品）はginkgolide BのPAF（血小板活性化因子）拮抗作用で末梢血管拡張・血小板凝集抑制→脳血流改善経路。\n\nバコパモニエリ（CDRI 08標準化品）はbacosides A/Bがアセチルコリン受容体・SSRI様作用・抗酸化を介して中枢神経伝達物質経路に作用。\n\n「末梢血流 vs 中枢神経伝達物質」の独立軸で、競合関係ではなく作用ターゲットが異なる別系統です。両者とも効果が出るまで12-16週の累積効果型で、カフェイン/L-テアニンのような即時感覚はありません。',
    },
    {
      q: 'イチョウ葉は認知症予防に本当に効く？GEM trial の誠実評価は？',
      a: '「認知症予防エビデンスは大規模RCTで否定的の誠実評価」が現代の実用的整理です。\n\nSnitz 2009 GEM trial JAMA n=3,069 健常高齢者にEGb 761® 240mg/日×中央値6年で認知症発症率の有意差なし、DeKosky 2008 JAMA でも認知症進行抑制エビデンス否定的でした。\n\nLe Bars 1997 JAMA RCT n=309 AD/血管性認知症患者でMMSE維持の古典論文はあるものの、その後の大規模RCTで予防効果は確認されておらず、市販品の「認知症予防」訴求は論文ベースで成立しません。現代の整理は「軽度の脳血流改善・末梢循環補助の補助的位置づけ」が誠実評価で、「認知症が治る」絶対NG→「軽度認知障害患者の一部RCTで認知機能スコア改善が報告された」型統一が王道です。',
    },
    {
      q: 'バコパモニエリの論文エビデンスは？効果が出るまでの期間は？',
      a: 'バコパは健常成人の集中力・記憶補助でRCT実績がある成分です。Stough 2008 Phytother Res RCT bacopa 300mg/日×12週で健常成人の言語学習・記憶テスト改善・Kongkeaw 2014 J Ethnopharmacol メタ解析9 RCTで認知機能改善 effect size 0.95（中規模）、Calabrese 2008 J Altern Complement Med でも65歳以上対象12週RCTで記憶獲得改善が報告されています。\n\n効果が出るまで12-16週の累積効果型で、最初の4-8週ではほぼ体感がなく、12週以降に効果が現れる長期勝負成分です。\n\nCDRI 08標準化品（Bacognize®）が研究蓄積が多く品質安定で、Pure Encapsulations/Himalaya/Nature\'s Way 等で¥1,500-3,000/月。消化器症状（嘔気・下痢・腹部膨満）報告ありで食後摂取推奨です。',
    },
    {
      q: '年代別の使い分けは？20-50代と60代以上で選び方は変わる？',
      a: '年代軸の使い分けが現実的です。\n\n①20-50代の集中力・学習能力・記憶補助→バコパ優先（Stough 2008 健常成人RCT実績・CDRI 08 300mg/日×12週）。\n\n②60代以上のMCI（軽度認知障害）への補助→ヤマブシタケ（Mori 2009 Phytother Res 16週で認知機能スコア改善）や他成分と並行で慎重に位置づけ、イチョウ葉単独は予防エビデンス未確立。\n\n③認知症診断後の補助は医療領域・サプリ守備範囲外で、神経内科第一選択（コリンエステラーゼ阻害薬・メマンチン・抗体医薬レカネマブ等）が現代の治療標準です。「軽度の脳血流補助」目的なら高齢者にイチョウ葉を組み合わせる選択肢はあるものの、認知症予防の決定的エビデンスがない点を理解して用いる前提です。',
    },
    {
      q: '副作用・併用注意は？ワルファリン・抗凝固薬との関係は？',
      a: '【イチョウ葉の最重要併用注意】ワルファリン・アスピリン・DOAC（エリキュース/リクシアナ/プラザキサ等）抗凝固薬併用で出血リスク（ginkgolide BのPAF阻害作用）。Vale 1998 Lancet で自然発生硬膜下血腫症例が報告されており、手術前2週休薬推奨、抜歯・内視鏡前も主治医に申告してください。【バコパの注意】消化器症状（嘔気・下痢・腹部膨満）が報告で食後摂取推奨、SSRI様作用がありSSRI/SNRI併用時は理論上セロトニン症候群リスク医師相談、甲状腺機能亢進症で甲状腺ホルモン上昇報告例あり甲状腺疾患既往は医師相談。【両者共通】「認知症が治る」絶対NG→「軽度認知機能サポート」「健常成人の記憶テスト改善が報告」型統一、認知症診断後は神経内科第一選択でサプリ単独治療NGを明示してください。妊娠中・授乳中・小児は安全性データ限定的で避けるのが無難です。',
    },
  ],
  'probiotics-vs-inulin': [
    {
      q: 'プロバイオティクスとイヌリンの違いは？プロバイオvs プレバイオの役割分担',
      a: '両者はプロバイオ vs プレバイオで役割が完全に分かれた補完関係です。\n\nプロバイオティクスは生菌そのものを補充するサプリ（100億〜1000億CFU/日）、イヌリンは腸内有益菌の餌になる水溶性食物繊維（5〜10g/日）で、ISAPP（International Scientific Association for Probiotics and Prebiotics）の公式定義（Hill 2014 / Gibson 2017 Nat Rev Gastroenterol Hepatol）でも別カテゴリです。\n\n両者併用＝シンバイオティクス設計が無難な標準解で、Petschow 2013 Curr Opin Gastroenterol で個別単独より相乗効果が示唆されています。「腸活＝乳酸菌だけ」「食物繊維だけ」ではなく、生菌補充＋餌補給の二段構えが現代の腸活設計です。',
    },
    {
      q: 'プロバイオティクスの株特異性とは？「乳酸菌1000億個」は論文ベースで評価できる？',
      a: '「乳酸菌1000億個」のような株名なし訴求は論文ベースで評価不能です。プロバイオティクスは株ID（株名+ATCC/DSM番号）が決定的で、株IDが明示されている製品のみエビデンスを追えます。代表例＝①Lactobacillus plantarum 299v（LP299v）でIBS-D症状改善（Niedzielin 2001 Eur J Gastroenterol Hepatol RCT）、②Lactobacillus rhamnosus GG（LGG・ATCC 53103）で抗生物質関連下痢AAD予防（Hempel 2012 JAMA メタ）、③Bifidobacterium lactis BB-12で便秘改善（Eskesen 2015 Br J Nutr RCT）、④Lactobacillus reuteri DSM 17938で乳児疝痛軽減（Sung 2018 Pediatrics メタ）。市販品選択時は「○○菌（株ID明記）」で検索し、その株のRCT論文が存在するかを確認するのが論文上選び方です。',
    },
    {
      q: 'イヌリンの論文エビデンスは？短鎖脂肪酸産生の機序は？',
      a: 'イヌリンはBifidobacterium属に選択的に発酵されて短鎖脂肪酸を産生するプレバイオです。チコリ・ゴボウ・タマネギ等に豊富な水溶性食物繊維で、大腸で発酵→酪酸・酢酸・プロピオン酸（SCFA）産生→腸管バリア強化・全菌叢多様性向上が王道経路（Slavin 2013 Nutrients review・Kolida 2007 Br J Nutr メタでビフィズス菌増加確立）。短鎖イヌリン+長鎖イヌリン併用でビフィズス菌増加幅大（Depeint 2008 Am J Clin Nutr）も報告されています。\n\n有効量は5-10g/日（チコリ由来イヌリンパウダー Now Foods/Yerba Prima 等で¥1,000-2,500/月）、最初は2-3g/日から開始して腹部膨満・ガスへの慣らし期間を取るのが推奨です。\n\n「便秘解消」「腸内環境を整える」断定NG→「便通・腸内細菌叢多様性に寄与する報告」型統一が薬機法/景表法整合です。',
    },
    {
      q: 'SIBO（小腸内細菌異常増殖）疑い時のFODMAP配慮は？イヌリンは避けるべき？',
      a: 'SIBO疑い時はイヌリン避けるが現実的です。イヌリンは高FODMAPで、Halmos 2014 Gastroenterologyで腹部膨満・ガス・腹痛症状の増悪リスクが報告されています。\n\nSIBO疑い時の判断＝①腹部膨満・腹痛・下痢が「食物繊維を摂ると悪化する」パターン、②小腸ラクツロース呼気試験で陽性、③消化器内科で抗菌薬（リファキシミン）治療履歴あり、のいずれかなら低FODMAPプロバイオ単独（Saccharomyces boulardii・特定株Lactobacillus等）へ切替が現実解です。\n\n「腸活で食物繊維を増やしたのに調子が悪い」は SIBO疑いのサインで、ヨーグルト・キノコ・玉ねぎ・豆類・小麦も悪化要因になります。原因不明の慢性消化器症状は消化器内科で SIBO・IBS・IBD（炎症性腸疾患）の鑑別を受けてからサプリ設計を組むのが無難な順番です。',
    },
    {
      q: '副作用・併用注意・選び方は？ヨーグルトとサプリの使い分けは？',
      a: '【副作用】両者とも初期2-4週で腹部膨満・ガス・軟便が一般的（菌叢移行期）で、漸増（プロバイオ100億CFU→300億CFU・イヌリン2g→8g）で慣らせます。【併用注意】免疫抑制状態（化学療法中・移植後・HIV進行期）のプロバイオは菌血症リスク稀（Salminen 2004 Clin Infect Dis 症例報告）医師相談下、抗菌薬と同時摂取は2-3時間ずらす、Akkermansia muciniphilaは日本未承認食品扱いで個人輸入領域（Depommier 2019 Nat Med RCT n=32報告ありも国内流通限定的）。【ヨーグルト vs サプリ】ヨーグルトは菌種が限定的で「乳酸菌生菌が胃酸で大半失活」する一方、サプリは胃酸耐性カプセル・腸溶性で大腸到達率が高い設計が多いです。コストではヨーグルト¥3,000-5,000/月 vs サプリ¥1,500-3,500/月でサプリ優位。\n\nシンバイオティクス設計推奨＝LP299vかLGG株100-300億CFU/日+イヌリン5-10g/日朝食時で12週運用が無難です。\n\nCulturelle（LGG）/Renew Life Ultimate Flora/Now Foods Inulin Powderが市販で入手しやすい選択肢です。',
    },
  ],
  '5-htp-vs-l-tryptophan': [
    {
      q: '5-HTPとL-トリプトファンの違いは？セロトニン産生経路の整理',
      a: '両者はセロトニン前駆体で、代謝経路は「L-トリプトファン→5-HTP→セロトニン→メラトニン」です。\n\n5-HTP（5-ヒドロキシトリプトファン）はトリプトファンの中間代謝物で、Griffonia simplicifolia種子由来。BBB（血液脳関門）通過率は5-HTPの方が高く、機序上は5-HTPがより直接的にセロトニン産生に作用します。\n\nL-トリプトファンは必須アミノ酸で食事（肉・魚・乳製品・卵・大豆）からも摂取される成分です。\n\nただし本ペアはYMYL最厳格領域で、機序の優位性で軽々しく選ぶ前に1989年EMS事件の歴史的経緯・SSRI併用禁忌・うつ症状は精神科第一選択を理解した上で慎重に位置づける必要があります。',
    },
    {
      q: '1989年EMS事件とは何ですか？L-トリプトファンサプリは今でも危険ですか？',
      a: '1989年Eosinophilia-Myalgia Syndrome（EMS・好酸球増多筋痛症候群）事件は、Showa Denko社製L-トリプトファン汚染ロット（製造プロセス変更で副産物EBT等が混入）が原因で米国で37名死亡・1,500名以上が筋痛・好酸球増多・神経障害の後遺症を発症した事件です（Slutsker 1990 JAMA・Belongia 1990 NEJM）。FDAは1989年にL-トリプトファン輸入規制を実施、2001年に部分緩和したものの注意喚起は継続しています。\n\n「現行のL-トリプトファンサプリは1990年代以降の製造プロセス改善で大規模事故は発生していない」ものの、歴史的経緯を踏まえた慎重論は今も妥当です。5-HTPはGriffonia種子由来で経路が異なるためEMS関連の汚染リスクは限定的ですが、Michelson 1994 Mayo Clin Proc で5-HTPでも好酸球増多症例の報告（Peak X様代謝物検出）があり、サプリ選択時は信頼できる第三者検査済みブランド（Now Foods/Thorne/Source Naturals）を選ぶのが王道です。',
    },
    {
      q: 'SSRI・抗うつ薬と併用していい？セロトニン症候群とは？',
      a: 'SSRI/SNRI/MAOI/トラマドール/トリプタン/リネゾリド併用は絶対禁忌＝セロトニン症候群最重篤副作用リスクです（Boyer 2005 NEJM レビュー）。セロトニン症候群は3徴＝自律神経不安定（高熱・発汗・頻脈・血圧変動）/神経筋過活動（震え・反射亢進・痙攣）/精神状態変化（混乱・興奮・意識障害）で、横紋筋融解・DIC・死亡例も報告されています。\n\n併用絶対禁忌の処方薬＝①SSRI（フルオキセチン・パロキセチン・セルトラリン・エスシタロプラム）、②SNRI（デュロキセチン・ベンラファキシン）、③三環系抗うつ薬、④MAOI（セレギリン・モクロベミド）、⑤トラマドール（鎮痛薬）、⑥トリプタン系（スマトリプタン等の片頭痛治療薬）、⑦リネゾリド（オキサゾリジノン系抗菌薬・MAO阻害作用）、⑧セントジョーンズワート（ハーブMAO阻害）。\n\n抗うつ薬・抗不安薬・睡眠薬を服用中の方は5-HTP/L-トリプトファン絶対回避、精神科主治医に必ず確認してください。',
    },
    {
      q: 'うつ症状や不眠でサプリを試したいけど、5-HTPは第一選択になりますか？',
      a: '5-HTP/L-トリプトファンは第一選択推奨はしないスタンスが本サイトの立場です。\n\nうつ・不安・パニック発作・睡眠障害は精神科第一選択で、SSRI/SNRI処方+認知行動療法CBTがエビデンス確立済みの標準治療、サプリは補助領域外です。Birdsall 1998 Altern Med Rev レビューで5-HTPの気分症状・不安・線維筋痛症で穏やかな改善報告はあるものの、小規模RCT中心で大規模RCT未整備、Shaw 2002 Cochrane Databaseでも「データ限定的」明示されています。\n\n軽症不眠の現実的代替軸＝①マグネシウム グリシン酸塩400mg/日（Abbasi 2012 RCT PSQI改善・国内入手可・副作用少）、②L-テアニン200mg/日（Hidese 2019 RCT 睡眠の質改善・カフェイン併用OK）、③グリシン3g/日就寝前（Yamadera 2007 深部体温低下＋朝の眠気改善・国内入手可・味の素グリナ等）、④メラトニン0.3-1mg就寝30分前（PLOS ONE 2013メタ入眠潜時短縮・日本では医薬品扱いで個人輸入自己責任）。\n\n5-HTPに進む前にこの4軸を試すのの入り方です。',
    },
    {
      q: '5-HTP・L-トリプトファンを使う場合の用量・副作用・併用注意・代替軸は？',
      a: '【用量】5-HTP 50-200mg/日（食前または就寝前）、L-トリプトファン 500-2,000mg/日（就寝前1-2g）が論文上範囲。Hartmann 1986 Biol Psychiatry でトリプトファン1-2g就寝前の入眠潜時短縮が報告されています。【副作用】消化器症状（嘔気・腹痛・下痢）、頭痛、眠気、夢の鮮明化、Michelson 1994 で好酸球増多症例報告（5-HTPでも稀に発生）。【併用絶対禁忌】SSRI/SNRI/MAOI/三環系/トラマドール/トリプタン系/リネゾリド/セントジョーンズワート（セロトニン症候群リスク）。\n\nカルビドパ（パーキンソン病薬）併用で5-HTP→末梢セロトニン症候群報告、双極性障害で躁転リスク、妊娠中・授乳中・小児禁忌。【代替軸】①SAMe（S-アデノシルメチオニン）＝Cochrane Reviewでうつエビデンス中程度（200-1,600mg/日・¥3,000-8,000/月・SSRI併用は医師相談）、②マグネシウム グリシン酸塩＝軽症不眠・不安補助、③L-テアニン＝即時リラックス。\n\n④ラベンダー精油（Silexan）＝Kasper 2014 RCTで不安軽減報告。\n\n「うつ症状改善」「治る」絶対NG→「気分症状の補助的サポート」型統一、精神科第一選択を必ず明示してください。',
    },
  ],
  // ── Session F Day 8 バッチ 2026-05-13（supplement/skin/hormone/sleep/cardiovascular 既存pair の FAQs 埋め） ────────────
  'vitamin-d-vs-magnesium': [
    {
      q: 'ビタミンDとマグネシウムの違いは？',
      a: '作用ターゲットが骨×神経の二重軸で完全に分かれた補完関係です。ビタミンD3はカルシウム腸管吸収・骨ミネラル化を促進（Holick 2007 NEJM）、マグネシウムは300以上の酵素反応の補因子で特にVD代謝酵素群（25-ヒドロキシラーゼ・1α-ヒドロキシラーゼ・VDBP）の補因子として作用（Uwitonze 2018 J Am Osteopath Assoc レビュー）。\n\n「Mg欠乏ではVDサプリも効きにくい」機序が確立されており、両者の併用は単独より妥当。日本人はMg平均摂取量が推奨量の80-90%・VD十分域到達者は成人の20-30%程度（Yoshimura 2013 J Bone Miner Metab）で、両者欠乏率が高い国民健康課題です。',
    },
    {
      q: 'VDサプリを飲んでも血中濃度が上がらないのはMg不足のせい？',
      a: 'Mg不足はVD代謝低下の主要因の一つで論文ベースの裏付けがあります。\n\nUwitonze 2018 J Am Osteopath Assoc レビューでVD代謝酵素群の多くがMg依存性であることが整理されており。\n\nDeng 2013 BMC Med RCT n=180でMg補給による25(OH)D・1,25(OH)2D血中濃度の代謝マーカー改善が報告されています。\n\nVDサプリ単独で血中25(OH)Dが30 ng/mL以上の十分域に到達しにくい層＝①Mg欠乏（食事摂取量低い・利尿薬服用・慢性下痢）、②肥満（脂肪組織にVD取り込み）、③加齢（皮膚VD合成低下）、④肝/腎機能低下（代謝経路低下）、⑤抗てんかん薬・ステロイド長期服用、⑥黒褐色皮膚（メラニンがUVB遮断）。\n\nMg 200-400mg/日を併用してから6-8週後に25(OH)D再測定が現実的な検証ステップで、それでも上がらない場合は吸収不全・腎機能評価が必要です。',
    },
    {
      q: 'マグネシウムは形態でどれを選べばいい？',
      a: '【形態別の使い分け】①グリシン酸塩（マグネシウム グリシン酸キレート）＝吸収率優位（Walker 2003 Magnes Res）・睡眠・神経鎮静用途（Abbasi 2012 J Res Med Sci RCT PSQI改善）・消化器症状の少なさ→VDと併用する睡眠補助・神経用途で第一選択。②クエン酸塩＝吸収率と便通のバランス型・日常的なMg不足補給の主役・¥1,000-2,000/月。③酸化マグネシウム＝日本では便秘薬として保険適用される医薬品形態（Mori 2019 J Neurogastroenterol Motil RCT で慢性便秘有効性）・吸収率は他形態に比べて低めとされ睡眠・神経用途では推奨されにくい・腎機能低下時は高Mg血症リスクで医師相談。④マレート酸塩・トーラート・リンゴ酸塩等のキレート品＝吸収率優位だが流通量限定。\n\nVD併用なら吸収優位のグリシン酸塩200-400mg/日が無難、Now Foods/Doctor\'s Best/Thorneブランド推奨です。',
    },
    {
      q: 'VDとMgの併用に薬の飲み合わせ・腎機能の注意は？',
      a: '【薬の飲み合わせ】Mgはミネラル系で他薬剤の吸収阻害が頻発＝①テトラサイクリン系・キノロン系抗菌薬（シプロフロキサシン等）はMgとキレート形成で吸収50-80%低下→2-4時間ずらす、②ビスホスホネート系骨粗鬆症薬（アレンドロン酸等）も同様、③レボチロキシン（甲状腺薬）もMgで吸収低下→朝服用後4時間以上ずらす、④ジゴキシン（強心薬）血中濃度変動注意、⑤降圧薬・利尿薬併用は処方医相談。VDは脂溶性で食事と一緒に摂取で吸収率向上。【腎機能の注意】eGFR 30 mL/min/1.73m²未満（CKD G3b以上）の慢性腎臓病・透析患者は高Mg血症リスクで医師管理下。\n\nサルコイドーシス・原発性副甲状腺機能亢進症・腎結石既往は高Ca血症リスクでVD高用量回避・医師相談。健常者の機能性食品範囲（VD 1,000-5,000IU/Mg 200-400mg）では問題ないですが、既往ある場合は処方医申告が安全です。',
    },
    {
      q: 'VD+Mg+カルシウムの骨密度・転倒予防スタックは？月コストは？',
      a: 'VD+Ca+Mgの三本柱がBischoff-Ferrari 2009 BMJ メタ解析の骨折・転倒予防の標準設計です。【用量設計】①VD3 1,000-5,000IU/日（25(OH)D血中濃度測定で30-50 ng/mLを目標）、②カルシウム 食事+サプリで合計1,000-1,200mg/日（牛乳200mLで200mg・小魚・葉物野菜・豆腐から食事優先）、③Mg 200-400mg/日（グリシン酸塩・クエン酸塩）。\n\nCaサプリ単独高用量は心血管リスク懸念（Bolland 2010 BMJ メタ解析でCa1,000mg/日超で心筋梗塞リスク軽度上昇報告→食事優先＋VD+Mgが現代の論文整合解）。\n\n月コスト＝VD3 5,000IU ¥500-1,500 + Mg Glycinate ¥1,000-2,500 + 食事Ca（牛乳・小魚優先）= 月¥1,500-4,000範囲で実用的な骨×神経×血管ケアスタック。\n\n骨密度評価＝閉経後女性・60歳以上男性はDEXA検査（骨密度・骨折リスクFRAX）を整形外科・内科で実施、Tスコア-2.5以下の骨粗鬆症診断後はビスホスホネート等の処方薬主軸+VD/Ca/Mg補助の現代標準治療が王道です。',
    },
  ],
  'retinol-vs-bakuchiol': [
    {
      q: 'レチノールとバクチオールの違いは？',
      a: 'バクチオールはBabchi（Psoralea corylifolia）由来の植物性化合物で「植物性レチノール代替」「妊娠中OKのレチノール代替」として近年注目された成分です。\n\nDhaliwal 2019 Br J Dermatol RCT n=44でバクチオール0.5% vs レチノール0.5%×12週でしわ・色素沈着・写真評価で両者ほぼ同等の効果が報告された独占論文。\n\n機序差＝レチノールはレチノール受容体（RAR/RXR）に結合してDNA転写制御、バクチオールは受容体には結合しないが別経路でレチノール様遺伝子発現変化（RARβ・コラーゲンI/III産生・MMP抑制）を誘導（Chaudhuri 2014 Int J Cosmet Sci）。\n\n「植物性レチノール」表記は厳密には不正確で、Bhakti 2020 J Cosmet Dermatol レビューでは「Retinol Functional Analog」が用語的に正確とされます。',
    },
    {
      q: '妊娠中はレチノール禁止だけどバクチオールは安全？',
      a: 'レチノール（経口・外用とも妊娠中NG）＝催奇形性リスクで妊娠中・授乳中は使用回避（FDA Category Cレチノイド類縁・経口イソトレチノインは妊娠分類X）。\n\nバクチオールは「比較的安全」だが大規模ヒト試験は限定的の誠実評価が必要です。\n\nバクチオールの妊娠中安全性データ＝Babchi種子は伝統的アーユルヴェーダで皮膚疾患に外用使用されてきた歴史があり、Chaudhuri 2014・Dhaliwal 2019 等のRCTでも明らかな副作用は報告されていません。\n\nただし「妊娠中OK」と100%断定する大規模試験は未整備で、本サイトでは「妊娠中・授乳中は外用バクチオールも産婦人科医に確認の上で使用」を推奨します。\n\nレチノールの代替で妊娠中も使えるエビデンス確立成分＝①ナイアシンアミド5%外用（Bissett 2005 RCT 色素沈着・小じわ改善）、②ビタミンC（L-アスコルビン酸）15%外用、③ペプチド系（パルミトイルトリペプチド・Matrixyl 3000）の3軸が現実的に妊娠中安全と評価されています。',
    },
    {
      q: 'バクチオールはレチノールより本当に刺激が少ない？効果は同等？',
      a: '【刺激・赤み・乾燥の差】Dhaliwal 2019 RCT n=44で被験者報告されたスケーリング・乾燥はレチノール0.5%群で有意に多く、バクチオール0.5%群では少なかった結果が報告されています。【効果の同等性】同RCTで12週時点のしわ・色素沈着・写真評価では両者ほぼ同等ですが、①ヒトRCTの累積本数はレチノールが圧倒的（数百本 vs 数本）、②深いシワ・光老化への高濃度効果はトレチノイン処方薬（0.025-0.1%）が確立しており（Kligman 1986古典・Kafi 2007 Arch Dermatol）バクチオール単独では届かない領域、③バクチオールは朝晩使用可（レチノールは原則夜のみ・光分解）・日焼け止め必須要件が緩い・敏感肌で耐容性高い運用上の優位点があります。\n\n「同等」は0.5%濃度・12週・健常者という条件下での話で、深いシワ・光老化対策には引き続きレチノール（または処方トレチノイン）が主軸として現実的です。',
    },
    {
      q: '初心者・敏感肌はどっちから始めるべき？',
      a: '【判断フローチャート】①妊娠中・授乳中・妊娠予定→バクチオール第一選択（産婦人科医確認の上）、またはナイアシンアミド5%・VC15%外用に切替（妊娠中安全性データ厚い）、②敏感肌・赤み出やすい肌・酒さ既往→バクチオール0.5-2%朝晩から開始・刺激なければ4-8週で評価、③初心者・レチノール未経験→バクチオール0.5%で耐容性確認後にレチノール0.025-0.1%（低濃度）週2-3回夜から段階的導入、④深いシワ・光老化対策・中上級者→レチノール0.3-0.5%夜+バクチオール0.5%朝の朝晩スタックが無難、⑤痤瘡（ニキビ）あり→処方アダパレン/トレチノインが第一選択でバクチオールは補助、で進めます。',
    },
    {
      q: 'バクチオールとレチノールの併用はOK？副作用や禁忌は？',
      a: '【併用OK】バクチオール朝+レチノール夜の朝晩スタックは論文ベース合理的で、Chaudhuri 2014 in vitroでも両成分の相加・相乗的なコラーゲン産生促進が示唆されています。\n\nバクチオール副作用＝外用で軽度赤み・乾燥・接触皮膚炎の症例報告（稀）、Babchi種子経口は光感受性増強（ソラレン類縁体）報告ありで外用バクチオールはソラレン含有量がほぼないように精製された化粧品グレードが流通するが経口Babchiは光線療法と併用注意。\n\nレチノール副作用＝赤み・剥離・乾燥（A反応・retinization）が初期2-4週で頻発、強い刺激は濃度・頻度を下げて緩和、AHA/BHA併用注意（強い剥離）、ビタミンC同時使用は朝VC/夜レチノールに分離。【共通禁忌】妊娠中・授乳中はレチノール禁止・バクチオールは産婦人科医確認。\n\n酒さ・脂漏性皮膚炎・アトピー性皮膚炎活動期は両者とも刺激回避。\n\n日焼け直後・脱毛剤併用時・施術後は1週以上回避。\n\n日焼け止めSPF30以上の毎日使用必須（レチノール特に・バクチオール推奨）。市販品の濃度表記・遮光ボトル・エアレスポンプの3点フィルタで選ぶのが化粧品メーカー視点で実用的です。',
    },
  ],
  'saw-palmetto-vs-biotin': [
    {
      q: 'ノコギリヤシとビオチンの違いは？',
      a: '作用ターゲットが完全に分かれた補完関係ですがエビデンス階層と適用集団が大きく異なります。\n\nノコギリヤシは5α-リダクターゼ阻害でDHT（ジヒドロテストステロン）産生を抑制（Iehlé 1995 J Steroid Biochem Mol Biol）で男性型脱毛（AGA）への小規模RCT実績（Prager 2002 J Altern Complement Med n=26・Wessagowit 2016 Australas J Dermatol n=50）。\n\nビオチンはケラチン合成・脂肪酸合成の補酵素（ビオチニル化反応）でビオチン欠乏症のみで髪・爪・皮膚症状を改善・欠乏のない健常者への効果RCTは存在しない（Patel 2017 Skin Appendage Disord レビュー）。「ビオチンで髪が生える」訴求は論文ベースで成立しない裏切り型独占切り口です。',
    },
    {
      q: '男性AGAにはノコギリヤシとフィナステリド、どっちが論文で効く？',
      a: 'フィナステリド（プロペシア・処方薬1mg/日）が圧倒的優位です。\n\nTsujimura 2009 BJU Int 比較研究でノコギリヤシ vs フィナステリドのAGA改善率は約38% vs 68%（直接比較は限定的・観察研究中心）。\n\nMella 2010 Arch Dermatol メタ解析ではフィナステリドの48週改善率約80%。\n\n妥当なAGA第一選択＝①フィナステリド1mg/日（処方薬・5α-RⅡ型阻害）+ ミノキシジル5%外用（処方薬・血管拡張作用）の併用（Mella 2010・Adil 2017 J Am Acad Dermatol メタ）が確立された標準治療、②デュタステリド0.5mg/日（処方薬・5α-RⅠ/Ⅱ両型阻害でフィナステリドより強力・適応外処方の医師あり）、③ミノキシジル内服2.5-5mg/日（オフラベル使用・処方医判断）が現代エビデンス。\n\nノコギリヤシ単独は「処方薬を受診したくない/副作用回避層の補助レイヤー」位置づけが現実的で、薄毛が気になる男性はAGA専門クリニック・皮膚科受診が第一選択、サプリで何ヶ月も様子見するより診察を受けて処方薬選択の判断が王道です。',
    },
    {
      q: 'ビオチンで本当に髪・爪が生える？欠乏症以外で意味ない？',
      a: '「ビオチンで髪・爪が改善する」は欠乏症以外では論文ベースで成立しません。\n\nPatel 2017 Skin Appendage Disord 系統的レビュー＝18件の症例・小規模研究を検証した結果、「ビオチン補給で髪・爪・皮膚が改善した報告はすべてビオチン欠乏症の確認例であり、欠乏のない健常者への効果RCTは存在しない」と明確に結論しています。\n\nビオチン欠乏症の原因＝①生卵白多量摂取（アビジンがビオチン吸収阻害・1日10個以上を長期で稀に発生）、②ビオチニダーゼ欠損症（遺伝性・新生児マススクリーニング対象）、③ビオチン代謝酵素障害（プロピオン酸血症等）、④長期非経口栄養・極端な制限食、⑤抗てんかん薬（フェニトイン・カルバマゼピン）長期服用、⑥妊娠中（生理的低下）。\n\n健常者の通常食事で必要量（成人50μg/日）は卵黄・ナッツ・レバー・サーモン・葉物野菜から十分補給可能。\n\n「髪が薄い」「爪が割れる」原因の現実的探索順序＝鉄/フェリチン/亜鉛/VD/甲状腺機能/PCOS（女性）/AGA（男性）→対応する原因に対応するのが現実的で、ビオチンを高用量で試す価値は欠乏が疑われる場合のみです。',
    },
    {
      q: 'ビオチンの甲状腺・トロポニン検査値誤異常って何？',
      a: 'FDA 2017年警告＝ビオチン高用量（5-10mg/日以上）を継続摂取している人の血液検査で甲状腺ホルモン（TSH・FT3・FT4）・トロポニン（心筋梗塞マーカー）の偽異常が出るリスクが報告されています。\n\n機序＝免疫測定法（ストレプトアビジン-ビオチン結合を利用するImmunoassay）でビオチン高用量が試薬と競合しTSH偽低値・FT4偽高値→甲状腺機能亢進症の誤診。\n\nトロポニン偽低値→心筋梗塞見逃しの危険。\n\n実害事例＝Trambas 2018 N Engl J Med 症例報告でビオチン10mg/日服用者がGraves病と誤診→放射性ヨード治療開始までいきかけた事例。\n\n対応＝①ビオチン5mg/日以上の高用量サプリ摂取者は血液検査48-72時間前に中止を医師・検査技師に申告、②サプリ表示で「Biotin 10,000 mcg」等の高用量品は注意、③通常食事範囲（50μg/日程度）では問題なし。\n\n「美髪サプリ」「ネイル強化サプリ」のビオチン配合品はしばしば5,000-10,000μg（5-10mg）の高用量品で、論文ベース効果は不確かなのに検査値誤異常リスクだけ抱える設計が現実です。',
    },
    {
      q: 'ノコギリヤシとビオチン、女性の薄毛・爪・副作用は？',
      a: '【女性の薄毛（FPHL: Female Pattern Hair Loss・びまん性脱毛）】ノコギリヤシのFPHL RCTは現時点で限定的（Wessagowit 2016 はロロチン併用で改善報告だが小規模）、ビオチン単独も欠乏のない健常女性では効果RCTなし。\n\n女性脱毛の実用的アプローチ＝①鉄/フェリチン<40 ng/mL の潜在性鉄欠乏評価（Kantor 2003 J Invest Dermatol）、②亜鉛・VD・甲状腺（TSH/T3/T4）・PCOS評価、③ミノキシジル外用2%女性専用処方（FDA承認・エビデンス確立）、④産後抜け毛は分娩後6-9ヶ月で自然回復が原則、⑤円形脱毛症は皮膚科治療領域。【爪の脆さ・割れ】ビオチンはHochman 1993 RCT n=22で改善報告（小規模・欠乏含む）、Floersheim 1989 Z Hautkr で2.5mg/日×3ヶ月で爪厚み増加報告。健常者の爪割れ＝過度な水仕事・除光液頻用・乾燥・栄養（タンパク質・鉄・亜鉛）が現実的な原因軸。【副作用・併用】ノコギリヤシ×抗凝固薬（ワルファリン・アスピリン）併用注意・出血傾向増加報告・前立腺癌スクリーニング（PSA）値を軽度低下させる可能性（医師相談）・妊娠中・授乳中・15歳未満禁忌・ホルモン依存性疾患既往は医師相談。\n\nビオチン×甲状腺・トロポニン検査値誤異常（5mg/日以上）必須記述。市販品Now Foods Saw Palmetto・Nature\'s Way Biotin、月コスト¥500-3,500、いずれもAGA/FPHL第一選択ではなく医療受診を優先する立場を本サイトでは明示しています。',
    },
  ],
  'glycine-vs-magnesium': [
    {
      q: 'グリシンとマグネシウムの違いは？',
      a: '作用機序が完全に独立した補完関係で、睡眠サプリの最頻出組合せとして現実的な王道スタックです。\n\nグリシンは阻害性神経伝達物質でYamadera 2007 Sleep Biol Rhythms RCT n=15で3g/就寝前服用により末梢血流増加→放熱促進→深部体温低下→入眠促進+朝の眠気改善+日中認知パフォーマンス改善が報告されています。\n\nマグネシウム（特にグリシン酸塩キレート）はGABA受容体活性化・NMDA受容体拮抗作用でリラックス・神経鎮静（Abbasi 2012 J Res Med Sci RCT n=46 MgGly 500mg×8週でPSQI改善）。経路独立で両者ともBBB通過確立。\n\nグリシンが「冷却・物理的入眠」、Mgが「神経鎮静・リラックス」の役割分担で併用設計が無難です。',
    },
    {
      q: '睡眠サプリの最強組合せは？どっちから始める？',
      a: '【妥当な睡眠サプリ階層】第1段＝グリシン3g+Mgグリシン酸塩200-400mg就寝前（両者経路独立・国内入手可・副作用少・¥1,800-4,000/月）、第2段＝+L-テアニン200mg（Hidese 2019 RCT 睡眠の質改善・カフェイン併用OK・即時リラックス）、第3段＝+メラトニン0.3-1mg就寝30分前（PLOS ONE 2013メタ 入眠潜時短縮・ただし日本では医薬品扱い・個人輸入自己責任で本サイトは推奨しない立場）、第4段＝睡眠外来・CBT-I（不眠の認知行動療法）受診。【始める順序】就寝1時間前にMg 200-400mg→就寝直前にグリシン3gの二段スタックで2-4週運用→改善穏やかならL-テアニン200mg追加→それでも改善なし・3週間以上の慢性不眠は睡眠外来でPSG（終夜睡眠ポリグラフ検査）+ CBT-Iがエビデンス最強の標準治療を受診する流れが王道です。',
    },
    {
      q: 'グリシン3gとMg400mgを併用しても多すぎない？副作用は？',
      a: '【グリシン3g/日】Yamadera 2007 で3g×就寝前を健常者に投与した実績・副作用報告は限定的で、消化器症状（軽度嘔気・軟便）が稀。グリシンは食事タンパク質から1日10-12g程度摂取しているアミノ酸で、サプリ3g追加は生理的範囲内。\n\nただしクロザピン（精神科薬）併用禁忌＝NMDA受容体co-agonist作用で精神症状増悪報告（症例レベル）、統合失調症既往は精神科医相談。【Mg 400mg/日】RDA（成人男性340-370mg・女性270-290mg）の補助範囲内で健常者は問題ない、過剰摂取で軟便・下痢（特に酸化Mg・浸透圧性緩下作用・グリシン酸塩は下痢リスク少ない）。\n\n腎機能低下（eGFR<30）の慢性腎臓病・透析患者は高Mg血症リスクで医師管理下、Mg×テトラサイクリン系/キノロン系/ビスホスホネート/レボチロキシン併用は吸収阻害で2-4時間ずらす運用が必須。\n\n両者併用での累積副作用懸念は健常者では限定的で、医学的既往ある場合は処方医申告が安全です。',
    },
    {
      q: 'グリナ（味の素）とiHerbのグリシン、どっちがいい？',
      a: '【味の素グリナ®】日本市場の標準ブランドで機能性表示食品・パッケージに「3,000mg/包」明示・スティック顆粒で水なしで服用可・グレープフルーツ風味・¥3,000-4,000/月（30包）。\n\n論文（Yamadera 2007・Inagawa 2006）と同じ用量規格で品質安定、医薬部外品扱いの安心感あり、ドラッグストア・Amazon・ヨドバシ等で入手容易。【iHerb・Amazon等の海外グリシン】Now Foods Glycine 1,000mg（カプセル）で3カプセル＝3g/日運用・¥800-1,500/月でコスト1/3-1/2、Doctor\'s Best/Source Naturals/BulkSupplements の粉末品も流通（1日3g≒小さじ1/2）でさらに安価¥500-1,000/月。\n\n選び方の指針＝①手軽さ・国内品質基準重視→グリナ®、②コスト重視・継続性→iHerbのカプセル/粉末、③飲み方好み＝粉末は溶けやすいが甘くないため好き嫌い分かれる・カプセルは確実に3g摂取できる・スティック顆粒は外出先で水なし対応可。\n\n両者とも論文用量3g/就寝前を満たすので効果差は理論上ない、継続性とコストで選ぶのが現実的です。',
    },
    {
      q: 'Mgの形態はグリシン酸塩がベスト？クエン酸・酸化Mgとの違いは？',
      a: '【睡眠・神経用途ではグリシン酸塩がベスト】Walker 2003 Magnes Res でグリシン酸キレート型の吸収率優位と消化器症状（下痢）の少なさが報告。\n\nAbbasi 2012 J Res Med Sci RCT n=46 MgGly 500mg×8週でPSQI改善が論文整合性の根拠。\n\nグリシン酸塩のメリット＝①吸収率優位、②下痢起こしにくい、③グリシン自体に神経鎮静作用がありMg+グリシンの相乗（本ペアで併用するなら理にかなう）、④空腹時OK。【クエン酸塩】吸収率と便通のバランス型・日常的なMg不足補給の主役・¥1,000-2,000/月で価格バランスも良好・Now Foods/Doctor\'s Best/Solgar等の流通品多数。【酸化マグネシウム】日本では便秘薬として保険適用される医薬品形態（重カマ・酸化マグネシウム錠等）。\n\n吸収率は他形態より低めとされるため睡眠・神経用途では推奨されにくいが、Mori 2019 J Neurogastroenterol Motil RCT で慢性便秘への有効性が示されており便秘改善目的では選択肢。\n\n腎機能低下時は高Mg血症リスクで医師相談。【選び方の指針】睡眠・神経・不安対策→グリシン酸塩200-400mg/日。\n\n日常的なMg不足補給→クエン酸塩200-400mg/日。\n\n便秘改善→酸化マグネシウム330-660mg/日（処方薬範囲）で目的別に分けるのが現実的です。',
    },
  ],
  'omega3-vs-vitamin-k2': [
    {
      q: 'オメガ3とビタミンK2の違いは？',
      a: '心血管リスク低減の2軸独立路線で抗血栓・抗炎症 vs 血管石灰化抑制の役割分担です。\n\nオメガ3（EPA+DHA）はEPA→エイコサノイド経路でTXA2減少・血小板凝集抑制・抗炎症（Calder 2017 Biochem Soc Trans）でREDUCE-IT 2019 NEJM RCT n=8,179 EPAエチル製剤2g/日×4.9年中央値でMACE 25%減少（icosapent ethyl・処方薬Vascepa）・Yokoyama 2007 JELIS RCT 日本人 n=18,645 EPA 1.8g/日でMACE 19%減少確認。\n\nビタミンK2（MK-7）はMGP活性化で血管平滑筋のCa沈着を抑制（Schurgers 2008 Blood Hauschka機序）。\n\nKnapen 2013 Thromb Haemost RCT n=244 MK-7 180μg/日×3年で動脈硬度進行抑制報告。両者の経路は完全に独立しており。\n\n「血液をサラサラに保つ × 血管壁にCaを溜めない」の二軸ケアとして併用設計が無難です。',
    },
    {
      q: 'EPA・DHAは心臓に効く？REDUCE-IT試験とは？',
      a: 'REDUCE-IT 2019 NEJM Bhatt et al. RCT n=8,179＝高リスク心血管疾患既往またはハイリスク糖尿病患者にEPAエチル製剤（icosapent ethyl・Vascepa）2g/日×4.9年中央値で主要評価項目MACE（心血管死・非致死性心筋梗塞・非致死性脳卒中・冠血行再建・不安定狭心症）が25%減少（HR 0.75・p<0.001）。これはEPA高純度製剤（処方薬）の試験で、市販OTCサプリの魚油（EPA+DHA混合）とは別物として理解する必要があります。\n\nYokoyama 2007 JELIS試験＝日本人脂質異常症患者n=18,645にEPA 1.8g/日 + スタチン併用 vs スタチン単独でMACE 19%減少を報告した日本人独自のRCTで、日本ではEPA-E（イコサペント酸エチル・処方薬エパデール）が脂質異常症治療に使用されてきました。\n\nOTC魚油サプリ（Lovaza/Vascepa以外）の心血管予防エビデンス＝VITAL 2019 NEJM n=25,871でEPA+DHA 1g/日×5.3年では主要評価項目で有意差なし。\n\n「市販魚油サプリの心血管予防エビデンスは混在」が誠実な整理で。\n\n処方薬icosapent ethyl（純度高EPA）と市販魚油（EPA+DHA混合・純度低）の効果は同等視できない点が王道に重要です。',
    },
    {
      q: 'VK2は血管石灰化を本当に防ぐ？MERIDIAN試験は？',
      a: 'VK2による血管石灰化抑制エビデンスは「観察研究で支持・大規模RCTで決定的エビデンスは未確立」が誠実な評価です。\n\nGeleijnse 2004 Rotterdam Study n=4,807＝K2摂取量上位群で冠動脈疾患死亡率57%減少・全死亡率26%減少（観察研究・因果関係未確定）。\n\nKnapen 2013 Thromb Haemost RCT n=244＝MK-7 180μg/日×3年で動脈硬度（PWV・パルス波伝播速度）進行抑制、Brandenburg 2017 Calcif Tissue Int RCT で大動脈石灰化進行抑制傾向。\n\nただし大規模RCTで心血管イベント（心筋梗塞・脳卒中・心血管死）の減少を直接示した決定的エビデンスはまだ揃っていないのが現状で、Knapen 2013は3年で動脈硬度マーカー改善までで臨床イベントエンドポイントは未測定。\n\n「VK2併用必須」断定は論文ベース不成立。\n\n「機序は明確・観察研究で支持・大規模RCTで決定的エビデンスは未確立」の誠実評価が現実的。Hauschka機序は確立されているためVD高用量併用時のVK2追加は機序的合理性あり、健常者の機能性食品範囲では問題ない選択です。MERIDIAN trialは骨折リスクへのMK-7試験で、現時点で大規模心血管RCTで決定的に肯定された試験はまだないという誠実評価が必要です。',
    },
    {
      q: 'オメガ3とVK2、ワルファリン服用者は飲める？',
      a: '【VK2はワルファリン服用者絶対回避】ワルファリンはVK拮抗薬（VKエポキシド還元酵素阻害でGla化を阻止→凝固因子II/VII/IX/X活性低下）で。\n\nVK2摂取はワルファリン効果を減弱しINR低下→血栓リスク増大の重篤相互作用。\n\n処方医に必ず申告、サプリ・納豆・青菜大量摂取も同様に注意（INR管理が安定しなくなる）。\n\nDOAC（リバーロキサバン/アピキサバン/エドキサバン/ダビガトラン）はVK経路に依存しないため理論上問題ないとされますが、念のため処方医相談が安全です。【オメガ3も抗凝固薬併用注意】オメガ3高用量（EPA+DHA 3g/日以上）で抗血小板作用が増強され、ワルファリン・アスピリン・DOAC併用で出血リスク要注意（Wachira 2014 Pharmacotherapy レビュー・大規模RCTで重篤出血は稀だが慎重論あり）。\n\n手術前2週・抜歯前1週は休薬を歯科医・処方医に申告が無難。\n\n心房細動・脳梗塞既往・人工弁置換術後のワルファリン継続中は両者とも医師判断必須で、自己判断で追加しないのが安全です。',
    },
    {
      q: '魚を食べていればオメガ3サプリは不要？コスパは？',
      a: '【魚食事派】「週2-3回・1食100g程度の青魚（サバ・サンマ・イワシ・マグロ・サーモン）摂取で実用的なEPA+DHA量は確保できる（厚労省 食事摂取基準n-3系1.6-2.0g/日・American Heart Association週2回脂の多い魚）。Mozaffarian 2011 Circulation メタ解析で魚食事と心血管死亡率の逆相関が観察研究で確立。\n\n現代日本人の魚摂取量は減少傾向（厚労省国民健康・栄養調査・1日40-60g程度・推奨70-80g）、外食中心・調理回避層では実質達成困難なケース多い。【サプリ追加適応】①魚を週1回未満、②心血管リスク高い層（脂質異常症・糖尿病・心筋梗塞既往・家族歴）、③うつ症状補助（Mocking 2016 メタ EPA優位 1-2g/日）、④妊娠中・授乳中（DHA胎児脳発達優先）、⑤関節炎・自己免疫疾患補助。\n\n月コスト比較＝魚食事週3回・1食¥300-500=月¥4,000-6,000、Nordic Naturals Ultimate Omega EPA 650mg+DHA 450mg/2ソフトジェル ¥3,500-5,000/月、Now Foods Ultra Omega-3 ¥2,000-3,000/月、コストコKirklandフィッシュオイル¥1,500-2,500/月。\n\n魚食事優先＋足りない週はサプリ補助が王道・経済合理的な現実解です。VK2は食事ではナットウキナーゼ含まない納豆菌培養由来のMenaQ7®相当品が標準で、月¥1,000-2,500の範囲で論文用量100-200μg/日に対応可能です。',
    },
  ],
  // ── Session F Day 8 補完バッチ 2026-05-13（ecd13e2 で PAIR_SEO のみ ship 済の 5 pair の PAIR_CUSTOM_FAQS 補完） ────
  'spermidine-vs-fisetin': [
    {
      q: 'スペルミジンとフィセチンの違いは？両者とも抗老化サプリですが何が違いますか？',
      a: '作用経路と投与設計が完全に独立しています。\n\nスペルミジンはポリアミンの一種でオートファジー（細胞内自食作用）誘導経路で蛋白質凝集物・損傷ミトコンドリアのクリアランスに作用し（Eisenberg 2009 Nat Cell Biol 酵母・線虫・マウス寿命延長）。\n\nMadeo 2018 Nat Med n=829 観察研究で食事性スペルミジン摂取量と心血管死亡率・全死亡率の逆相関が報告されています。\n\nフィセチンはフラボノール骨格でsenolytics（老化細胞除去）独立軸で作用し。\n\nYousefzadeh 2018 EBioMedicine マウスでlifespan延長が報告された新興成分です。投与設計が決定的に異なり。\n\nスペルミジンは毎日継続摂取（食事性摂取軸）／フィセチンは hit-and-run サイクル投与（2-3日連続→2-4週休薬）が David Sinclair等の研究者提唱パターンで真逆の投与設計です。両者は経路独立で併用可能ですが、寿命延長エビデンスはヒトで両者とも未確立である点を伝えるのが論文上で責任ある立場です。',
    },
    {
      q: 'スペルミジンは食事とサプリどちらが効率的ですか？',
      a: '食事改善が現実的にROI最高です。Madeo 2018 Nat Med n=829 観察研究は食事性スペルミジン摂取量評価軸で精製サプリ単独のヒトRCTエビデンスは初期段階に留まっています。\n\nスペルミジン豊富食品＝小麦胚芽（30mg/100g・最豊富）・大豆発酵食品（納豆・味噌）・チーズ熟成品・干しシイタケで日本食はもともと摂取量多い食文化です。\n\n小麦胚芽15g/日で4.5mg・納豆1パック2-3mg・熟成チーズ1スライス1-2mg程度で、食事だけで現実的範囲（1-5mg/日）に到達可能です。一方 spermidineLIFE®等の精製サプリは¥3,500-7,000/月かかり、同価格帯で食材改善＋ケルセチン（抗ヒスタミン二刀流・花粉症エビデンス確立 Mlcek 2016 Molecules）への投資の方が日常体感型のROIが見える領域です。\n\nサプリの優位性は摂取量が安定する点ですが、食事性摂取軸のエビデンスが主軸である現状を踏まえると。\n\nまず食事改善→不足分をサプリで補完が無難な順番です。',
    },
    {
      q: 'フィセチンの hit-and-run 投与とは？毎日継続じゃダメですか？',
      a: 'hit-and-run投与＝2-3日連続100-500mg摂取→2-4週休薬を繰り返すサイクル投与パターンで、senolytics（老化細胞除去）の作用機序（老化細胞のアポトーシス誘導）に基づく投与設計です（Zhu 2015 Aging Cell ダサチニブ+ケルセチンD+Q カクテル古典論文・Justice 2019 EBioMedicine 特発性肺線維症 Phase I 3日×3週で身体機能改善）。老化細胞は新しく蓄積するのに時間がかかるため、毎日継続投与は不要で間欠的にパルス投与で十分という考え方です。\n\n毎日継続だと細胞内のSASP（senescence-associated secretory phenotype）応答が抑制される可能性＋経済性の観点でも hit-and-run が合理的です。\n\nフィセチンは経口バイオアベイラビリティが低いためリポソーム化・ナノエマルジョン製剤（Doctor\'s Best Fisetin等）が市販されています。\n\nただしヒトでのlifespan延長エビデンスは未確立でマウスエビデンスベースの推奨にとどまる点を理解した上で、Wake Forest大学Phase II進行中の結果待ちが現状です。',
    },
    {
      q: 'スペルミジン・フィセチンの副作用や併用注意は？',
      a: '【スペルミジン】食事性摂取は安全性確立、精製サプリ高用量は長期データ限定でホルモン依存性乳がん既往は医師相談（エストロゲン受容体interaction理論的懸念）。【フィセチン】CYP3A4阻害でカルシウム拮抗薬（アムロジピン等）・スタチン（シンバスタチン・アトルバスタチン等）・タクロリムス血中濃度上昇懸念。\n\n抗凝固薬（ワルファリン・DOAC）INR上昇懸念で出血リスク医師相談、グレープフルーツジュース併用でCYP3A4阻害さらに増強。【両者共通】妊娠中・授乳中はエビデンス不足で回避領域、ホルモン依存性疾患既往は医師相談、化学療法中（特にDNA合成阻害系）は腫瘍内科判断必須。\n\n「老化が逆転する」「寿命が延びる」断定NG→「動物試験ベース」「観察研究で関連が示唆された」型統一、サプリ選択は第三者検査済みブランド（Now Foods/Doctor\'s Best/spermidineLIFE® Longevity Labs/Pure Encapsulations）推奨です。',
    },
    {
      q: 'スペルミジン・フィセチン以外の抗老化アプローチで妥当なものは？',
      a: '抗老化アプローチで論文蓄積が最も厚いのはライフスタイル介入＝①運動（有酸素+レジスタンス）（NHANES観察研究で全死亡率減・サルコペニア予防）、②地中海食・植物性食品中心（PREDIMED RCT 心血管イベント減）、③カロリー制限・断食（CALERIE-2 RCT 生体年齢マーカー改善）、④良質な睡眠7-8時間（Cappuccio 2010 Sleep メタ）、⑤社会的つながり（Holt-Lunstad 2010 PLoS Med メタ）がエビデンスの底辺です。\n\nサプリ系ではMortensen 2014 Q-SYMBIO CoQ10心血管・Yoshino 2021 Science NMNインスリン感受性・Andreux 2019 Nat Metab ウロリチンAミトコンドリア機能・Knapen 2013 ビタミンK2動脈硬度等がそれぞれ独立軸でエビデンス確立しています。\n\nスペルミジン・フィセチンはまだヒトRCT初期段階で、ライフスタイル基盤＋確立済みサプリ（CoQ10/ビタミンD3/オメガ3/ビタミンK2/マグネシウム）への投資の入り方です。化粧品メーカー視点では皮膚老化への直接効果RCTが両者とも未確立で外用レチノール/ナイアシンアミド優先が現実解です。',
    },
  ],
  'nattokinase-vs-vitamin-k2': [
    {
      q: 'ナットウキナーゼとビタミンK2の違いは？両者とも納豆由来で混同しがちです',
      a: '両者は納豆菌Bacillus subtilis natto培養由来で同じ素材から派生しますが、作用機序が完全に別です。\n\nナットウキナーゼは線溶系プロテアーゼでプラスミン様作用＝既存血栓を溶かす方向（Sumi 1987 Experientia 古典・Kurosawa 2015 Sci Rep RCT 線溶活性マーカー改善）、NSK-SD® 2,000FU/日が標準用量です。\n\nビタミンK2（MK-7）は脂溶性ビタミンでGla化反応の補酵素として作用し。\n\nマトリックスGlaタンパク質（MGP）活性化→血管平滑筋層の石灰化抑制＋オステオカルシン活性化で骨石灰化促進の二方向＝「血管から石灰を骨へ運ぶ」方向（Geleijnse 2004 Rotterdam Study 観察研究 n=4,807でMK摂取量と動脈石灰化逆相関・Knapen 2013 Thromb Haemost RCT n=244 閉経後女性MK-7 180μg/日×3年で動脈硬度cfPWV有意改善）、MenaQ7® 100-200μg/日が標準用量です。\n\n「両者とも血液サラサラ系」訴求で混同されますが、ナットウキナーゼ=溶かす方／ビタミンK2=石灰化を防ぐ方で作用が決定的に違います。',
    },
    {
      q: 'ビタミンK2のMK-4とMK-7の違いは？どっちを選べばいいですか？',
      a: '半減期と用量が決定的に異なります（Schurgers 2007 Blood）。\n\nMK-4（メナキノン-4）は短半減期1〜2時間で、骨密度RCT用量が45mg/日と大量（処方医薬品「グラケー®カプセル15mg×3回」が骨粗鬆症適応で日本国内処方）です。サプリ用途では血中濃度維持が難しく、1日2-3回分服が必要です。\n\nMK-7（メナキノン-7）は長半減期72時間で。\n\n100-200μg/日の少量で血中濃度持続、納豆発酵由来でMenaQ7®（NattoPharma社特許品）が世界標準規格品です。\n\nサプリ用途ではMK-7が無難選択＝Knapen 2013 RCTがMK-7 180μg/日で動脈硬度改善を確認、用量とコストのバランスが優れています。\n\nMK-4は骨粗鬆症処方医薬品としての位置づけが中心で、サプリでMK-4を選ぶメリットは限定的です。両者を併用する製品（Life Extension Super K with K2 MK-4+MK-7+VK1配合）もありますが、論文ベースではMK-7単独 100-200μg/日が標準解です。',
    },
    {
      q: 'ワルファリンを服用中です。ナットウキナーゼやビタミンK2は飲めますか？',
      a: '両者ともワルファリン服用中は絶対禁忌寄りですが、作用方向が真逆です。\n\nナットウキナーゼは線溶活性増強で出血リスク増（プラスミン様作用＋ワルファリンの抗凝固効果に追加で線溶を進める）、ビタミンK2はワルファリンの抗凝固作用を拮抗（VK依存性凝固因子II・VII・IX・Xを活性化する補酵素のため、ワルファリンの薬理作用を打ち消す）。\n\n「片方は出血、片方は血栓」と真逆の問題が起きるため、両者ともワルファリン服用中は禁忌寄りで、必ず処方医に相談してください。\n\nDOAC（直接経口抗凝固薬：リバーロキサバン・アピキサバン・エドキサバン・ダビガトラン）・抗血小板薬（アスピリン・クロピドグレル）併用も同様に医師相談、手術前2週休薬推奨が王道安全マージンです。ワルファリン服用中の納豆摂取が禁忌（ビタミンK2含有）として知られていますが、サプリ用量のビタミンK2 100-200μg/日でも同じ拮抗作用が成立するため、納豆を控えていればOKという誤解は避けるべきです。',
    },
    {
      q: 'ナットウキナーゼ・ビタミンK2の副作用や注意点は？',
      a: '【ナットウキナーゼ】出血傾向のある方（潰瘍・血友病・脳出血既往）は禁忌、抗凝固薬・抗血小板薬併用は禁忌寄り、消化器症状（嘔気・腹部不快）稀に発生。\n\n納豆アレルギー（PA血症・セミ咬傷由来の遅延型アナフィラキシー報告 Inomata 2007 J Allergy Clin Immunol）は完全回避、妊娠中・授乳中はエビデンス不足で控えめ。【ビタミンK2】安全性プロファイルは高い（脂溶性ビタミンですが過剰症の報告稀）、ワルファリン服用中は前項記載の禁忌、新生児出血症予防のVK1注射（K2サプリと混同注意）、妊娠中は比較的安全領域でMK-7 100μg/日範囲なら問題報告少。【両者共通】手術前2週休薬推奨。\n\n「血栓を溶かす」「動脈硬化を治す」「血液サラサラ」断定NG→「線溶活性マーカー改善が報告」「血管石灰化抑制が示唆された」型統一。心血管1次予防は運動・地中海食・血圧管理（家庭血圧130/80未満目標）・禁煙が現実的優先でサプリは補助領域です。',
    },
    {
      q: 'ナットウキナーゼ・ビタミンK2の市販品の選び方は？',
      a: '【ナットウキナーゼ】NSK-SD®（Japan Bio Science Laboratory社特許品）が世界標準規格品で。\n\nDoctor\'s Best Nattokinase NSK-SD 2,000FU・Now Foods Nattokinase 100mg等が代表市販品です。\n\nFU（フィブリン分解単位）表記が論文用量再現の前提で、mg表記のみの製品は規格不明で論文比較困難です。VK1除去工程済みの製品が抗凝固薬影響を最小化する設計です。月¥1,800-3,500範囲。【ビタミンK2】MenaQ7®（NattoPharma社特許品・納豆発酵由来MK-7標準化品）が論文研究で使用される世界標準規格で。\n\nNow Foods MK-7 100μg MenaQ7®・Life Extension Super K with Advanced K2 Complex・Doctor\'s Best Natural Vitamin K2 MK-7 100μg等が市販主流です。\n\nMK-4 45mg大量摂取は処方医薬品グラケー®領域でサプリ範囲外。月¥1,500-3,000範囲。両者とも第三者検査済みブランド（NSF・USP・ConsumerLab認証）選択推奨、化粧品メーカー視点では血流改善→皮膚バリア機能・コラーゲン合成への補助効果として位置づけ可能ですが、皮膚老化への直接エビデンスRCTは両者とも限定的で外用レチノール/ナイアシンアミド優先が現実解です。',
    },
  ],
  'alpha-lipoic-acid-vs-coq10': [
    {
      q: 'αリポ酸とCoQ10の違いは？両者ともミトコンドリア系サプリで混同しがちです',
      a: '作用ターゲットと適用集団が異なる補完関係です。\n\nαリポ酸（ALA）は水脂溶性両親媒で細胞質・ミトコンドリア両方に分布する強力な抗酸化物質＋ピルビン酸脱水素酵素複合体の補因子として糖代謝に作用。\n\nZiegler 2006 Diabetes Care SYDNEY 2 trial RCT n=181 ALA 600mg/日×5週で糖尿病性末梢神経障害症状有意改善・Ziegler 2011 ALADIN III RCT n=460 で神経障害進行抑制傾向が報告されています。\n\nCoQ10はミトコンドリア内膜の電子伝達系複合体I-III間の電子運搬補酵素で既存ミトコンドリア稼働支援が主軸。\n\nMortensen 2014 JACC Heart Fail Q-SYMBIO RCT n=420 CoQ10 100mg×3/日×2年で心血管イベント・全死亡率有意減・Caso 2007 Am J Cardiol RCT スタチン誘発筋痛軽減が報告されています。\n\n「両者ともミトコンドリア活性化」訴求で重複しがちですが、ALA=糖代謝・抗酸化リサイクル／CoQ10=心血管・スタチン併用で論文蓄積の主戦場が違う点が決定的です。両者は経路独立で併用OKです。',
    },
    {
      q: 'αリポ酸のR体とS体の違いは？どっちを選べばいいですか？',
      a: 'R体（R-ALA・天然型）が生物学的活性が高いためR体優位の選択が無難です。\n\nαリポ酸はR体とS体のラセミ体（50:50混合）が一般的なサプリ形態ですが、生体内のリポイル化補因子として作用するのはR体のみで、S体はR体の作用を一部阻害する可能性も指摘されています（Mignini 2007 Eur Rev Med Pharmacol Sci）。\n\nR-ALA単独製品は通常のラセミ体ALAより高価ですが、有効成分濃度では半分の用量で同等以上の効果が期待できます。\n\nZiegler 2006 SYDNEY 2 trial の用量600mg/日はラセミ体（R+S）で実施されたためR-ALAなら300mg/日相当が王道範囲です。\n\n「αリポ酸 R体」「R-ALA」と表記された製品（Doctor\'s Best Stabilized R-Lipoic Acid・Jarrow Formulas R-Alpha Lipoic Acid）が論文上選択で、月¥2,500-4,500範囲。\n\nチオクト酸（処方医薬品扱い・国内Yansulin・Thioctacid®）は同一成分で、糖尿病性神経障害適応のため自己判断のALAサプリ使用は糖尿病主治医に相談が原則です。',
    },
    {
      q: 'CoQ10のユビキノールとユビキノンの違いは？どっちを選べばいいですか？',
      a: '40代以降はユビキノール（還元型・生体活性型）優位が現実的選択です（Hosoi 2008 Nutrients）。\n\nユビキノン（酸化型・コスパ型）は安価で安定性高く、健常若年層では体内で還元されて利用されるためコスパが優れていますが、加齢でこの還元能力が低下するため40代以降は還元型ユビキノールが直接利用可能で吸収効率が高い設計です（Bhagavan 2006 Mitochondrion）。\n\nKaneka Ubiquinol™（カネカ社・世界唯一の還元型CoQ10原料メーカー）が論文研究で使用される世界標準で。\n\nJarrow Formulas QH-Absorb Ubiquinol・Doctor\'s Best High Absorption CoQ10 with BioPerine・Life Extension Super Ubiquinol CoQ10等が代表市販品です。\n\n用量＝ユビキノール100-200mg/日（食事と一緒に脂溶性吸収）が無難、Mortensen 2014 Q-SYMBIO は CoQ10 100mg×3/日（300mg/日）でしたがユビキノールなら100-200mg/日で同等血中濃度が期待できます。\n\nŽmitek 2017 J Cosmet Dermatol RCT n=33 経口CoQ10 150mg/日×12週でしわ深さ改善で皮膚老化への経口エビデンスも確認されており、化粧品メーカー視点で経口アプローチの根拠成分です。月¥3,000-6,000範囲。',
    },
    {
      q: 'αリポ酸・CoQ10の併用注意は？糖尿病薬やワルファリンを服用中です',
      a: '両薬剤への注意方向が真逆です。【αリポ酸×糖尿病薬】ALA高用量（600-1,200mg/日）は糖尿病薬（メトホルミン・SGLT2阻害薬・GLP-1作動薬・DPP-4阻害薬・スルホニル尿素薬・インスリン）併用で低血糖警告必須で、Diabetes Care 推奨血糖モニタリング強化・処方医と用量調整必須です。\n\n糖尿病性神経障害適応はチオクト酸（処方医薬品）の領域でサプリ自己判断はNGです。【CoQ10×ワルファリン】CoQ10はVK構造類似でVK依存性凝固因子に影響→ワルファリンINR低下＝血栓側のリスク（Engelsen 2002 Thromb Haemost）が報告されており、ワルファリン服用中はINRモニタリング強化が必要です。\n\nCoQ10×降圧薬（カルシウム拮抗薬・ACE阻害薬・ARB・β遮断薬）併用は血圧低下増強で起立性低血圧注意。\n\n化学療法中（特にドキソルビシン）はCoQ10の効果文脈で腫瘍内科判断必須（心毒性軽減vs腫瘍細胞保護の議論あり）。両者とも妊娠中・授乳中はエビデンス限定で医師相談、サプリ選択は第三者検査済みブランド推奨です。',
    },
    {
      q: 'αリポ酸・CoQ10の使い分けは？どっちを優先すべきですか？',
      a: '適用集団・症状で使い分けが王道です。【ALA優先】①糖尿病・前糖尿病・代謝症候群でインスリン抵抗性改善＋抗酸化補助（Ziegler 2006・Diabetes Care 推奨範囲600mg/日・処方医と用量調整）、②糖尿病性末梢神経障害症状の補助（しびれ・痛み・違和感の軽減・神経内科併走）、③全般的な抗酸化サポート（グルタチオン再生補助・ビタミンC/E抗酸化サイクル）。【CoQ10優先】①心不全・心血管疾患既往（Mortensen 2014 Q-SYMBIO 心血管イベント減）、②スタチン服用中の筋痛軽減（Caso 2007 RCT根拠・スタチンによる体内CoQ10合成阻害の補給論拠）、③40代以降の全身的エネルギー低下・抗老化補助（ユビキノール優先）、④皮膚老化・しわ改善の経口アプローチ（Žmitek 2017 RCT根拠・化粧品メーカー視点）。【併用】両者は経路独立で併用シナジー合理（CoQ10で電子伝達系底上げ＋ALAで抗酸化サイクル支援）ですが、まず糖尿病かスタチン服用かで第一選択を決め、必要に応じて追加が無難な順番です。\n\nライフスタイル基盤（運動・地中海食・血圧管理・禁煙）が両者より優先である点は明示してください。',
    },
  ],
  'urolithin-a-vs-coq10': [
    {
      q: 'ウロリチンAとCoQ10の違いは？両者ともミトコンドリア系で混同しがちです',
      a: '作用経路が完全に独立しており併用シナジー合理の補完関係です。\n\nウロリチンAはザクロ・ベリー類・クルミに含まれるエラジタンニンの腸内細菌代謝産物で。\n\nmitophagy（不良ミトコンドリアの選択的オートファジー）誘導＋ミトコンドリア生合成（PGC-1α活性化）の独自軸＝Ryu 2016 Nat Med 線虫マウスでミトコンドリア機能・運動能力改善・Andreux 2019 Nat Metab RCT n=66 健常高齢者500-1,000mg/日×4週でミトコンドリア遺伝子発現有意改善・Liu 2022 JAMA Network Open Phase 2 RCT n=88 ウロリチンA 1,000mg/日×4ヶ月で筋持久力改善が報告された新興エビデンス成分です。\n\nCoQ10は既存ミトコンドリア稼働支援（電子伝達系複合体I-III間の電子運搬補酵素）でMortensen 2014 JACC Heart Fail Q-SYMBIO RCT n=420 心血管イベント有意減・Caso 2007 スタチン誘発筋痛軽減という40年蓄積のエビデンス成分です。\n\n「両者ともミトコンドリア活性化」訴求で混同されますが、ウロリチンA=mitophagy（古いミトコンドリアの分解・除去）／CoQ10=既存ミトコンドリアの稼働支援で経路独立、併用は理論的シナジー合理です。',
    },
    {
      q: 'ザクロを食べればウロリチンAが体内で作られますか？',
      a: '欧米人で30-40%のみウロリチンA産生者で。\n\nザクロを食べても産生されない人が大多数という独自背景があります（Selma 2017 Eur J Nutr 「ウロリチン産生者・非産生者」分類）。ウロリチンAはザクロ・ベリー類・クルミに含まれるエラジタンニンを腸内細菌（Gordonibacter属・Ellagibacter属等）が代謝して産生する成分ですが、これらの腸内細菌の保有率に遺伝的・食生活的個人差が大きく、欧米人観察研究で産生能力ありの割合は約30-40%に留まると報告されています。日本人での詳細データは限定的ですが、同様の個人差が存在すると推測されます。\n\nザクロジュース・ザクロエキスサプリを摂取しても効果が出ない人が過半数という事実から。\n\nMitopure®（Amazentis社特許品・スイスEPFL発・Timeline社米国販売）の直接ウロリチンA摂取が論文上で合理的という産業構造が成立しています。\n\n産生者・非産生者の判定は便検査での腸内細菌叢分析（Viome等）で可能ですが、サプリ直接摂取の方が現実的選択です。',
    },
    {
      q: 'Mitopure®（ウロリチンA）は高価ですが値段に見合う効果がありますか？',
      a: '期待値調整が最優先＝「老化マーカー改善は確認・体感は穏やか・長期寿命延長エビデンスは未確立」が現実的評価です。\n\nMitopure® ¥10,000-15,000/月で日本国内最高価格帯ミトコンドリア系サプリ（500-1,000mg/日推奨）に対し。\n\nCoQ10ユビキノール¥3,000-5,000/月＋運動が王道で総合的なROIではCoQ10が優位な領域です。\n\nLiu 2022 JAMA Network Open Phase 2 RCT n=88 で筋持久力改善は確認されましたが、Andreux 2019 Nat Metab では「ミトコンドリア遺伝子発現改善」マーカーレベルの変化が中心で。\n\n寿命延長・体感的若返り効果はまだ未確立です。\n\nMitopure®ジェネリック品（Doctor\'s Best ウロリチンA等）の品質バラつき＝特許品Mitopure®以外は標準化と純度に課題があり、第三者検査済みの製造ロット選択が論文上で重要です。\n\n業界文脈＝Amazentis社（スイスEPFL発スタートアップ・Nestle Health Science提携）が独自エビデンスで主導、David Sinclair陣営のNMN系とは別の業界文脈で発展しています。\n\n運動（特にレジスタンス＋有酸素併用）の方がミトコンドリア生合成（PGC-1α活性化）に対して論文蓄積が圧倒的に厚いため、まず運動習慣を確立してから経済的余裕でMitopure®追加が現実解です。',
    },
    {
      q: 'ウロリチンA・CoQ10の併用は意味ありますか？副作用は？',
      a: '両者は経路独立で併用シナジー合理＝ウロリチンA=mitophagy（古いミトコンドリア除去）＋CoQ10=既存ミトコンドリア稼働支援で「古いものを掃除しながら新しいものを支える」補完関係です。理論的シナジーですがヒトRCTでの併用エビデンスは未確立で、両者単独のエビデンスからの推測である点を理解してください。【ウロリチンA】長期データ限定で、エストロゲン受容体interaction理論的懸念は要医師相談（特にホルモン依存性乳がん既往）、消化器症状（嘔気・腹部不快）が稀に報告。\n\n妊娠中授乳中はエビデンス未確立で回避領域、Mitopure®は日本国内ヘルスクレーム未認可で海外個人輸入領域です。【CoQ10】ワルファリン併用でINR低下（出血ではなく血栓側のリスク）・降圧薬併用で血圧低下増強・化学療法中（特にドキソルビシン）は腫瘍内科判断必須・妊娠中授乳中エビデンス限定で医師相談、副作用は軽度（消化器症状・不眠稀）。\n\n「老化が逆転」「ミトコンドリア若返り」断定NG→「ミトコンドリア機能マーカー改善が報告」「筋持久力改善が報告」型統一、化粧品メーカー視点では両者とも皮膚老化への直接効果RCTは未確立（CoQ10 Žmitek 2017 のみ）で外用レチノール/ナイアシンアミド優先が現実解です。',
    },
    {
      q: 'ウロリチンA・CoQ10以外でミトコンドリア機能向上に実用的な方法は？',
      a: '運動（特にレジスタンス＋HIIT＋有酸素併用）が論文蓄積最厚＝PGC-1α活性化→ミトコンドリア生合成（mitochondrial biogenesis）の主要シグナル経路を強力に活性化します（Lira 2010 J Physiol・Robinson 2017 Cell Metab）。\n\nHIIT（高強度インターバルトレーニング）でミトコンドリア遺伝子発現が最も大きく変化（Robinson 2017 高齢者対象RCT）し、サプリの効果を凌駕する規模です。\n\nカロリー制限・断食も AMPK→PGC-1α経路で mitophagy 誘導（Bagherniya 2018 Ageing Res Rev）、良質な睡眠7-8時間でミトコンドリア機能維持（Schmitt 2018 Antioxid Redox Signal）が報告されています。\n\nサプリ系では①CoQ10ユビキノール100-200mg/日（前項記載）、②αリポ酸（R-ALA 300-600mg/日）（前項Ziegler 2006）、③NMN/NR（NAD+前駆体）（Yoshino 2021 Science NMN・Martens 2018 Nat Commun NR）、④PQQ 20mg/日（Hosoe 2007 ミトコンドリア生合成補助）、⑤マグネシウム（ATP産生補酵素）が独立軸のエビデンス成分です。\n\nサプリだけに頼らず、運動・断食・睡眠の基盤を作ってから経済的余裕でサプリ追加の入り方です。',
    },
  ],
  'phosphatidylserine-vs-alpha-gpc': [
    {
      q: 'ホスファチジルセリンとα-GPCの違いは？両者とも認知サプリで混同しがちです',
      a: '作用経路と最適な対象が完全に異なる補完関係です。\n\nホスファチジルセリン（PS）は神経細胞膜のリン脂質構成成分で膜流動性・神経伝達物質受容体機能の維持＋コルチゾール抑制の二経路。\n\nCrook 1991 Neurology RCT n=149 ウシ脳由来PS 300mg/日×12週で加齢関連記憶障害改善（古典・現在は狂牛病リスクで大豆由来主流）・Kingsley 2006 Med Sci Sports Exerc PS 750mg/日×10日で運動誘発コルチゾール抑制が報告されています。\n\nα-GPC（L-α-グリセロホスホコリン）はコリン前駆体で血液脳関門通過率が高くアセチルコリン合成基質として脳内コリン濃度を上げる機序。\n\nParker 2011 J Int Soc Sports Nutr RCT n=13 α-GPC 600mg/日×7日でベンチプレス峰力増加・De Jesus Moreno 2003 Clin Ther RCT n=261 α-GPC 1,200mg/日×6ヶ月でAD早期認知機能改善が報告されています。\n\nPS=膜構造×コルチゾール抑制（ストレス×認知の橋）／α-GPC=コリン供給×運動神経筋接合部（運動パフォーマンスの橋）で経路独立、併用OKです。',
    },
    {
      q: 'PSとα-GPCはどっちを選べばいい？年代や用途で使い分けはありますか？',
      a: '年代軸×用途軸で使い分けが無難です。①20-50代運動パフォーマンス（パワー出力・筋力増加）→α-GPC 600mg/日（Parker 2011 RCT・Marcus 2017 ハンドグリップ筋力増加根拠・プレワークアウト摂取）、②慢性ストレス×認知疲労（プレゼンテーション前・受験・集中力低下）→PS 100-300mg（Kingsley 2006 コルチゾール抑制根拠・朝食後または就寝前）、③60代以上のMCI予防・認知機能維持→両者の補助検討（神経内科第一選択前提・Crook 1991 PS／De Jesus Moreno 2003 α-GPC 根拠）、④認知症診断後 → 神経内科処方薬第一選択（コリンエステラーゼ阻害薬ドネペジル・ガランタミン・リバスチグミン・メマンチン・抗体医薬レカネマブ）でサプリは守備範囲外です。\n\n両者は経路独立で併用可能ですが、まず年代×主訴で第一選択を決め、不足分を補完追加が無難な順番です。\n\nカフェイン・L-テアニンのような即時感覚は限定的で、PSは2-4週・α-GPCは1-2週で効果実感が出る累積効果型成分です。',
    },
    {
      q: 'α-GPCに脳卒中リスク上昇の報告があると聞きました。安全性は大丈夫ですか？',
      a: '長期高用量摂取の慎重論あり＝ANRT 2021 Am J Prev Med n=12,532観察研究でα-GPC長期摂取者のTIA・脳卒中リスク 1.46倍が報告されました（観察研究で因果関係未確立だが慎重論あり）。\n\nヒトRCT短期（Parker 2011 7日・De Jesus Moreno 2003 6ヶ月）ではエビデンスがあるが長期高用量は慎重論ありという現状で。\n\n「ヒトRCT短期では運動パフォーマンス・AD早期認知機能改善が報告されている」と「観察研究で長期高用量摂取者で脳卒中リスク上昇が示唆された」を両論併記するのが論文上で責任ある立場です。\n\n安全な使い方＝①短期（数週間〜数ヶ月）のスポット使用に留める（プレワークアウト・試験前等のイベント駆動）、②1日600mg以下の用量範囲を超えない、③脳卒中既往・TIA既往・脳血管疾患リスク高い方は使用回避、④継続摂取する場合は3ヶ月使用→1ヶ月休薬のサイクルを推奨する研究者もいます。一方PSはほぼ副作用報告なしの安全プロファイルで、長期摂取の慎重論なく安全性プロファイルが優れている領域です。コリン供給が必要ならα-GPC短期使用、長期継続ならコリンビタルトレート・レシチン・卵黄食事摂取の方が安全という選択肢もあります。',
    },
    {
      q: 'PSとα-GPCの副作用や併用注意は？',
      a: '【PS】ほぼ副作用報告なしの安全プロファイルで、消化器症状（嘔気・胃部不快）稀に発生、不眠（就寝直前高用量摂取で稀）、抗凝固薬と理論的相互作用報告なしですが手術前1週休薬推奨、妊娠中・授乳中はエビデンス限定で医師相談。\n\nSSRI・抗うつ薬で相互作用報告なしも併用は医師相談、ウシ脳由来は狂牛病リスクで現在は大豆由来主流（Sharp-PS®大豆由来標準化品）です。【α-GPC】コリン供給で末梢副作用が稀に発生＝消化器症状（嘔気・腹痛）・口臭/体臭が魚臭くなる（TMAO産生関連）・頭痛・低血圧・不眠。\n\nアルツハイマー処方薬コリンエステラーゼ阻害薬（ドネペジル・ガランタミン・リバスチグミン）併用で理論的相加効果（コリン作動性過剰）医師相談、抗コリン薬（抗うつ薬・抗精神病薬・抗ヒスタミン薬・尿失禁治療薬等）で薬理拮抗。\n\n前項記載のANRT 2021 観察研究での長期高用量脳卒中リスク示唆、妊娠中・授乳中はエビデンス限定で医師相談です。【両者共通】「認知症が治る」「頭が良くなる」絶対NG→「加齢関連記憶障害の補助的サポート」「運動パフォーマンス指標で改善が報告」型統一、サプリ選択は第三者検査済みブランド（Sharp-PS®・AlphaSize®）推奨です。',
    },
    {
      q: 'PSとα-GPC以外で認知機能サポートに現実的な方法は？',
      a: 'ライフスタイル基盤が論文蓄積最厚＝①運動（有酸素＋レジスタンス併用）（FINGER trial RCT n=1,260で認知機能低下抑制）、②地中海食・MIND食（Morris 2015 Alzheimers Dement で認知症発症リスク減）、③良質な睡眠7-8時間（Cappuccio 2010 Sleep メタ）、④社会的つながり・知的活動（FINGER trial 多面的介入の構成要素）、⑤禁煙・適度な飲酒制限・血圧管理・糖尿病管理（Livingston 2020 Lancet 認知症予防12要因）が認知機能維持の底辺です。\n\nサプリ系では①オメガ3（EPA/DHA 1-2g/日）（Yurko-Mauro 2010 Alzheimers Dement 認知機能維持）、②ビタミンD3 1,000-2,000IU/日（観察研究で認知機能との関連示唆）、③B群ビタミン（特にB12・葉酸・B6 ホモシステイン低下経路）（VITACOG trial 軽度認知障害進行抑制）、④バコパモンニエリ 300mg/日（Stough 2008 RCT 言語学習・記憶改善）、⑤ライオンズメイン 3g/日（Mori 2009 MCI患者認知機能改善）が独立軸のエビデンス成分です。\n\nまずライフスタイル基盤を作ってからサプリ追加の入り方で、化粧品メーカー視点では「慢性ストレス→コルチゾール過剰→皮膚バリア低下・糖化加速」ループへのPS介入軸として副次的に皮膚老化対策にも繋がる位置づけ可能です。',
    },
  ],
  // ── Session F Day 9 バッチ 2026-05-13（stress/antiaging/cognitive/supplement クラスタ拡張デー PAIR_CUSTOM_FAQS） ────
  'ashwagandha-vs-magnesium-glycinate': [
    {
      q: 'アシュワガンダとマグネシウム グリシン酸はどちらを先に試すべき？',
      a: '原因軸でまず分けます。\n\n慢性ストレス・コルチゾール過剰・不安・PMS精神症状が主訴ならアシュワガンダ KSM-66 600mg/日（Chandrasekhar 2012 Indian J Psychol Med RCT n=64 8週でコルチゾール27.9%減根拠）。\n\n軽症不眠・筋けいれん・偏頭痛・PMS身体症状が主訴ならマグネシウム グリシン酸 200-400mg/日（Abbasi 2012 J Res Med Sci RCT n=46 PSQI改善根拠）の段階です。\n\n両者は経路独立で併用合理＝慢性ストレス×睡眠の質低下併発時はアシュワガンダ朝食後・Mg就寝前の時間差摂取が設計の核です。\n\n3-8週評価サイクル+ストレス記録（瞬間・きっかけ・睡眠の質・月経周期）で原因軸特定を経て選択するのが論文上の順序です。\n\n「ストレスフリー」訴求は薬機法/景表法NGで、サプリは生活軸（睡眠・運動・カフェイン制限・マインドフルネス）の補助という前提を必ず明示してください。',
    },
    {
      q: 'アシュワガンダのKSM-66とSensorilと無印の違いは？',
      a: 'withanolide含有量規格と抽出元が決定的に違います。\n\nKSM-66（Ixoreal Biomed社・withanolide 5%以上・抽出溶媒水のみ・根のみ）は世界で最もヒトRCT本数が多い標準化品（Chandrasekhar 2012/Salve 2019/Lopresti 2019等）で論文用量再現の前提です。\n\nSensoril（Natreon社・withanolide 10%以上・葉と根のブレンド）はwithanolide含有量2倍で用量効率優位ですが葉成分の長期安全性データは少ない領域です。\n\n無印アシュワガンダ（カプセル粉末・抽出物の標準化なし）はwithanolide含有量バラつきが大きく効果不確実で、論文ベースの推奨はKSM-66またはSensoril規格品優先です。\n\nコスト＝Jarrow Formulas KSM-66/Pure Encapsulations Ashwagandha（KSM-66）が¥1,500-3,500/月、Sensoril規格品は¥2,500-4,500/月、無印は¥1,000-2,000/月でコスパ低めです。\n\n「アシュワガンダで不眠が治る」断定NGで「ストレス指標・睡眠の質指標の改善が報告」型統一が薬機法整合的です。',
    },
    {
      q: 'マグネシウムの形態（グリシン酸・クエン酸・酸化）の違いは？',
      a: '目的別に形態選択が決定的です。\n\nグリシン酸キレート型（200-400mg/日）は消化器症状少なく吸収率高い（Walker 2003 Magnes Res）→精神症状・睡眠・筋けいれん・PMS精神症状目的の第一選択です。\n\nクエン酸塩（200-400mg/日）はグリシン酸と同等吸収で軽度瀉下作用あり→便秘傾向併発時に有用です。\n\n酸化マグネシウム（300-500mg/日）は吸収率低く便秘薬向きでカマグやマグミット錠の主成分、精神症状・睡眠目的には不向きです。\n\n硫酸塩（エプソムソルト）は瀉下作用強く経口は腸管刺激リスクで入浴剤利用が主流（経皮吸収は科学的エビデンス限定）です。\n\n妥当選択順序＝①精神症状・睡眠・PMS→グリシン酸／②筋けいれん・偏頭痛予防→グリシン酸またはクエン酸／③便秘併発→クエン酸／④単純な便秘→酸化マグネシウム（医薬品）。\n\nDoctor\'s Best/Now Foods Magnesium Glycinateが市販主流で¥1,400-2,000/月で標準化品が入手可能です。',
    },
    {
      q: 'アシュワガンダとマグネシウム グリシン酸の併用注意は？',
      a: '【アシュワガンダ】甲状腺薬（レボチロキシン）avoid（甲状腺機能亢進方向への影響）／SSRI/SNRI/MAOI caution（セロトニン作動性増強）／免疫抑制剤avoid（自己免疫疾患悪化リスク）／鎮静薬caution（鎮静増強）／血糖降下薬caution（低血糖傾向）／妊娠・授乳・自己免疫疾患（橋本病/バセドウ病/SLE/RA）禁忌です。【Mg グリシン酸】テトラサイクリン系/フルオロキノロン系抗菌薬/ビスホスホネート/レボチロキシン併用は2-3時間ずらす（吸収阻害）。\n\n腎機能低下例（CKD stage 3以上）は高Mg血症リスクで医師相談、降圧薬と理論的相加効果で血圧低下注意です。【両者共通】うつ・パニック発作・PMDD・双極性障害は心療内科第一選択でサプリは補助のみ、希死念慮・自殺念慮があれば119/110/いのちの電話（0120-783-556）即時連絡、3週間以上の抑うつ症状継続は心療内科受診が無難な順番です。',
    },
    {
      q: '効果が出るまでどのくらい？評価のタイミングは？',
      a: '【アシュワガンダ】4-8週で効果評価が論文上（Chandrasekhar 2012 8週で有意差・Lopresti 2019 8週で有意差）です。最低4週継続+主観的ストレス指標（PSS自己評価）と客観的睡眠の質（PSQI/起床時倦怠感）を記録、8週時点で改善傾向なければ用量見直し・形態変更（KSM-66→Sensoril）か別軸（Mg/L-テアニン）検討が現実解です。【Mg グリシン酸】4-8週で効果評価（Abbasi 2012 8週で有意差）、特に血清Mgは細胞内Mgの約1%しか反映しないため血液検査での評価は限定的、PSQI/PMS症状日記/筋けいれん頻度の主観評価が中心です。【両者併用】両者とも3-8週評価サイクルで、12週改善なければ原因軸再評価（甲状腺機能/鉄欠乏/うつ/PMDD/副腎機能・YMYL領域は医療機関）の入り方です。\n\n「即効でストレスが消える」期待は薬機法NG×効果実態とも不整合でサプリは生活軸の補助・累積効果型という前提が妥当な範囲です。',
    },
  ],
  'resveratrol-vs-pterostilbene': [
    {
      q: 'レスベラトロールとプテロスチルベンの違いは？',
      a: '化学構造と経口バイオアベイラビリティに決定的な差があります。\n\nプテロスチルベンはレスベラトロールのジメチル化体（3,5位ヒドロキシ基がメトキシ基に置換）で。\n\nKapetanovic 2011 Cancer Chemother Pharmacol動物試験で経口バイオアベイラビリティ約4倍（メトキシ基置換でグルクロン酸抱合受けにくい・分子親油性向上）が報告された改良型誘導体です。両者ともSIRT1活性化・カロリー制限模倣作用が中心機序（Howitz 2003 Nature 古典／Joseph 2008 J Agric Food Chem 動物試験で同等活性）で経路は共有しますが、用量設計が逆＝レスベラトロール150-500mg/日 vs プテロスチルベン50-250mg/日の少量設計が王道です。\n\nヒトRCT本数の絶対差＝レスベラトロールはBrasnyo 2011等で代謝マーカー改善RCT複数本（数十本レベル）vs プテロスチルベンはRiche 2014中心の少数本（数本程度）で蓄積段階が異なります。\n\n「プテロスチルベン=レスベラトロール上位互換」評価は安直で、エビデンス本数・長期安全性の蓄積はレスベラトロール優位、用量効率はプテロスチルベン優位という棲み分けです。',
    },
    {
      q: 'プテロスチルベンの経口バイオアベイラビリティ4倍はヒトでも同じ？',
      a: '動物試験での経口バイオアベイラビリティ4倍は線形ヒト換算できない点が論文上で重要です。\n\nKapetanovic 2011 Cancer Chemother Pharmacolの動物試験（マウス・ラット）で経口バイオアベイラビリティ約4倍が報告された一方、ヒト血漿濃度の直接比較RCTは限定的で、代謝経路の種差・腸内細菌叢の影響・脂肪溶解度差で動物→ヒト換算は議論領域です。\n\nRiche 2014 Funct Foods Health Dis RCT n=80 pterostilbene 250mg/日×6-8週でLDLコレステロール影響観察（コレステロール上昇の議論・他試験では影響なし・ChromaDex社実施）でLDL上昇の懸念が観察されたためヒト長期安全性は要注視領域です。\n\n実用的解釈＝「動物試験では吸収率優位だがヒトでの長期効果・安全性は蓄積中」誠実評価が妥当な範囲で。\n\npTeroPure®（ChromaDex社特許品・99.5%純度）は¥3,500-7,000/月で高単価のため同価格帯のCoQ10ユビキノール/オメガ3 EPA/ビタミンK2 MK-7の方がエビデンス確立度高いROIです。',
    },
    {
      q: 'レスベラトロール・プテロスチルベン以外で抗老化サプリの優先順位は？',
      a: '抗老化サプリのエビデンス確立度ランキング（ヒトRCT本数・長期データ・コスパ統合）＝①オメガ3（EPA/DHA 1-2g/日）（REDUCE-IT 2019 NEJM RCT n=8,179 心血管25%減 ¥2,000-5,000/月）、②ビタミンD3 1,000-2,000IU/日（観察研究で多臓器健康関連 ¥500-1,500/月）、③マグネシウム グリシン酸200-400mg/日（Boyle 2017 SR 18 RCT統合 ¥1,400-2,000/月）、④CoQ10ユビキノール100-200mg/日（Mortensen 2014 Q-SYMBIO 心血管イベント減 ¥3,000-5,000/月・40代以降）、⑤ビタミンK2（MK-7）100-200μg/日（Knapen 2013 動脈硬度改善 ¥1,500-3,000/月）がライフスタイル基盤の上の現実的なサプリ階層です。\n\nスペルミジン・フィセチン・レスベラトロール・プテロスチルベン・NMN・ウロリチンAは新興エビデンスでヒトRCT進行中の領域で。\n\nまず①-⑤の基盤を作ってから余剰投資として追加が無難な順番です。\n\n運動（有酸素+レジスタンス）・地中海食・カロリー制限・良質な睡眠7-8時間・社会的つながりの5基盤が抗老化エビデンス最厚です。',
    },
    {
      q: 'レスベラトロール・プテロスチルベンの副作用や併用注意は？',
      a: '両者ともCYP3A4阻害でカルシウム拮抗薬（アムロジピン等）・スタチン（シンバスタチン・アトルバスタチン）・タクロリムス血中濃度上昇懸念。\n\n抗凝固薬（ワルファリン・DOAC）INR上昇懸念で出血リスク医師相談、グレープフルーツジュース併用でCYP3A4阻害さらに増強です。\n\nエストロゲン様作用（フィトエストロゲン弱）でホルモン依存性乳がん既往・閉経前女性は医師相談、レスベラトロール大量（>500mg/日）で消化器症状（嘔気・下痢）報告、プテロスチルベン高用量でLDL上昇観察（Riche 2014）があり長期高用量は要注視です。\n\n手術前2週休薬推奨（抗凝固リスク）。\n\n妊娠中授乳中はエビデンス不足で回避領域、化学療法中（特にDNA合成阻害系・抗酸化作用での薬効干渉懸念）は腫瘍内科判断必須です。\n\n「老化が逆転」「寿命が延びる」断定NG→「動物試験ベース」「代謝マーカー改善が報告」型統一が薬機法整合的。\n\nNow Foods/Doctor\'s Best レスベラトロール（イタドリ抽出物標準化品）/pTeroPure® プテロスチルベンの第三者検査済みブランド推奨です。',
    },
    {
      q: 'レスベラトロールは食事（赤ワイン）で十分？',
      a: '赤ワインでの摂取量は論文用量に達しない点が現実です。\n\n赤ワイン1杯（150mL）あたりレスベラトロール約0.5-2mg程度で、論文RCT用量150-500mg/日に達するには赤ワイン100-500杯/日相当となり実用不可能です。\n\nピーナッツ・ブドウ皮・イタドリ（Polygonum cuspidatum）が比較的豊富ですが食事性摂取量は1日数mg程度にとどまります。\n\nサプリで論文用量に近づける現実解＝Now Foods/Doctor\'s Best レスベラトロール 250-500mg/日のイタドリ抽出物標準化品（¥1,500-4,000/月）で、ただし経口バイオアベイラビリティが極めて低い（Walle 2004 Drug Metab Disposで25mg経口でも血漿濃度ng/mL）ためヒト RCT効果サイズは動物試験ほど大きくない点を理解した上で位置づけることが論文上の誠実評価です。\n\n赤ワインの心血管恩恵（Fフレンチパラドックス）の真因はアルコール自体・他のポリフェノール・地中海食パターン総合で、レスベラトロール単独の貢献度は議論領域です。アルコール過剰は皮膚老化・肝障害・がんリスク上昇でROIマイナスに転じるため食事性赤ワインは適量（女性1杯/日・男性1-2杯/日）+ サプリ補助が現実解です。',
    },
  ],
  'lions-mane-vs-alpha-gpc': [
    {
      q: 'ライオンズマネとα-GPCの違いは？',
      a: '作用経路が完全に独立しています。\n\nライオンズマネ（ヤマブシタケ・Hericium erinaceus・1,000〜3,000mg/日）は食用キノコ由来でヘリセノン・エリナシンがNGF（神経成長因子）合成促進＝Mori 2009 Phytother Res RCT n=30 MCI患者で3g/日×16週で認知機能テスト有意改善（HDS-R改訂版長谷川式）が中心エビデンスです。\n\nα-GPC（L-α-グリセロホスホコリン・300〜600mg/日）はコリン前駆体で血液脳関門通過率が高くアセチルコリン合成基質として作用。\n\nParker 2011 J Int Soc Sports Nutr RCT n=13 α-GPC 600mg/日×7日でベンチプレス峰力増加・De Jesus Moreno 2003 Clin Ther RCT n=261 AD α-GPC 1,200mg/日×6ヶ月で認知機能改善が中心エビデンスです。\n\n経路独立で併用合理＝NGF誘導×コリン供給の補完関係として理論的整合性ありです。\n\n用途使い分け＝運動パフォーマンス→α-GPC優先／MCI予防・認知機能維持→ライオンズマネ優先／更年期前後の認知疲労→ライオンズマネ優先が現実的選択です。',
    },
    {
      q: 'α-GPCの脳卒中リスク懸念は本当？',
      a: 'ANRT 2021 Am J Prev Med n=12,532観察研究で長期高用量α-GPC摂取者でTIA・脳卒中リスク 1.46倍が報告されました。\n\n観察研究で因果関係未確立（残余交絡の可能性）ですが、コリン代謝経路を介したTMAO（トリメチルアミン-N-オキシド）産生増加が動脈硬化進行に関与する仮説（Tang 2013 NEJM）と整合する文脈で慎重論があります。\n\n論文ベースの誠実評価＝「短期ヒトRCTではエビデンスあるが長期高用量は慎重論あり」期待値調整が必要で、特に60代以上・心血管リスク高い層（高血圧・糖尿病・脂質異常症・心血管疾患既往・脳血管疾患既往）はα-GPC高用量長期使用は慎重に判断すべき領域です。\n\n代替軸＝認知機能補助はライオンズマネ（食用キノコ由来で長期安全性比較的良好）・ホスファチジルセリン（Day 8 phosphatidylserine-vs-alpha-gpc記事連動）・バコパモンニエリ・DHA優位オメガ3が無難な選び方。\n\n運動パフォーマンスはクレアチン3-5g/日（Kreider 2017 JISSN）の方が圧倒的エビデンス蓄積です。\n\nコリンエステラーゼ阻害薬（ドネペジル等）併用は理論的相加効果（コリン作動性過剰）で医師相談です。',
    },
    {
      q: 'ライオンズマネの子実体と菌糸体どちらを選ぶ？',
      a: 'ヘリセノン（子実体由来）vs エリナシン（菌糸体由来）の成分プロファイル差が形態差の核心です。\n\n子実体（fruiting body・ヤマブシタケのキノコ本体部分）はヘリセノン豊富でMori 2009 Phytother Res RCT n=30 MCI患者改善の論文用量（3g/日）は子実体ベースです。\n\n菌糸体（mycelium・キノコの根状部分）はエリナシン豊富で動物試験でのNGF誘導活性報告（Kawagishi 1996）の主要成分です。\n\nHost Defense（Stamets社・米国）は両者ブレンド（子実体+菌糸体）でβ-グルカン含有量規格。\n\nReal Mushrooms は子実体特化（β-グルカン25%以上規格・米国市場での品質基準厳格）で、ヒトRCT用量再現を優先するなら子実体特化品が無難選択です。\n\n「マイコ培養液+菌糸体」表記の安価品はβ-グルカン含有量低い（穀物培養基由来のデンプン含有量高い）ことが多く、サプリ選択時はβ-グルカン含有量規格（25%以上推奨）+ 第三者検査済みブランドを確認することが重要です。\n\n月コスト＝Host Defense Lion\'s Mane（4 oz/¥3,000-4,500・約60日分）vs Real Mushrooms Lion\'s Mane（90 capsules ¥3,000-4,000・1-3ヶ月分）でブランド・濃度・形態（粉末/カプセル/液体エキス）で差があります。',
    },
    {
      q: 'ライオンズマネ・α-GPCの併用注意や副作用は？',
      a: '【ライオンズマネ】キノコアレルギー既往は禁忌寄り（稀にアレルギー反応報告）。\n\n抗凝固薬・抗血小板薬で理論的相互作用報告（in vitro血小板凝集抑制報告）も臨床的問題は稀（手術前1週休薬推奨）。\n\n糖尿病薬で血糖降下作用増強の理論的懸念（動物試験での血糖低下作用）も臨床的影響は限定的、消化器症状（軽度の腹部不快感）が稀に発生。\n\n妊娠中授乳中エビデンス限定で医師相談が前提です。【α-GPC】コリン作動性副作用＝消化器症状（嘔気・下痢）・口臭・体臭が魚臭くなる（TMAO産生関連）・頭痛が稀に発生。\n\nコリンエステラーゼ阻害薬（ドネペジル・ガランタミン・リバスチグミン）併用で理論的相加効果（コリン作動性過剰）医師相談、抗コリン薬と薬理拮抗（過活動膀胱治療薬・三環系抗うつ薬・第一世代抗ヒスタミン薬）。\n\n長期高用量で脳卒中リスク観察研究レベル懸念（ANRT 2021）で60代以上心血管リスク高い層は慎重判断。\n\n妊娠中授乳中エビデンス限定で医師相談が前提です。【両者共通】「認知症が治る」「頭が良くなる」絶対NG→「MCI患者で認知機能改善が報告」「運動パフォーマンス指標で改善が報告」型統一が薬機法整合的です。',
    },
    {
      q: '効果が出るまでどのくらい？評価のタイミングは？',
      a: '【ライオンズマネ】16週で評価が論文用量（Mori 2009 16週RCTで有意差）、ただし4週で主観的集中力・物忘れ頻度の変化を記録開始が現実的設計です。短期で「頭がスッキリする」体感型のサプリではなく累積効果型（NGF誘導でゆっくり神経機能改善）という前提で12-16週継続評価が論文上の順序です。【α-GPC】運動パフォーマンス目的なら7日-2週で評価可能（Parker 2011 7日RCT・Marcus 2017 短期RCT）。\n\n認知機能目的なら3-6ヶ月評価（De Jesus Moreno 2003 6ヶ月RCT）で用途別に評価サイクル異なります。【両者併用】12-16週評価+認知機能の主観的変化記録（仕事のミス回数・名前度忘れ頻度・読書理解力・集中持続時間）が王道フィードバック設計、改善なければ用量見直し（α-GPC 300→600mg/ライオンズマネ1→3g）か原因軸再評価（睡眠の質/慢性ストレス/甲状腺機能/うつ/MCI診断・YMYL領域は医療機関）が次の段階。',
    },
  ],
  'zinc-vs-vitamin-c-oral': [
    {
      q: '亜鉛とビタミンCはどちらが風邪対策に効く？',
      a: 'タイミングと形態で使い分けが決定的です。\n\n風邪初期（症状出現24時間以内）→亜鉛グルコン酸/酢酸塩トローチ75-150mg/日が論文上で第一選択＝Hemilä 2013 Cochrane Database SR 13 RCT n=1,360で風邪期間14-28%短縮（イオン化亜鉛が鼻粘膜ICAM-1受容体ブロックでライノウイルス結合阻害機序）。\n\n経口カプセル形態は粘膜接触なく効果限定で形態がトローチ（口腔内溶解）であることが必須、クエン酸塩・乳酸塩は唾液pHで効果減弱のためグルコン酸/酢酸塩を選択します。\n\nビタミンC継続摂取はHemilä 2017 Cochrane Database 29 RCT大規模解析で一般人口での風邪罹患率低下なし・発症期間8%軽度短縮のみで予防効果は限定的。\n\n極端な身体的ストレス下（マラソンランナー・スキー部隊・寒冷地兵士）では風邪罹患率半減のサブグループ恩恵のみが現実的事実です。\n\nPauling博士の高用量ビタミンC仮説（1970年代）は後続大規模RCTで効果限定確認の科学史的経緯を踏まえた誠実評価が妥当な範囲で、健常人の風邪予防目的でのビタミンC高用量継続は効果限定です。',
    },
    {
      q: '亜鉛の長期摂取で銅欠乏になるって本当？',
      a: '亜鉛長期高用量50mg/日以上で銅欠乏症リスクが上がることは論文ベースで確立されています（Sandstead 1995 Am J Clin Nutr 銅と亜鉛の腸管吸収競合機序）。\n\n銅欠乏は貧血・神経症状（末梢神経障害・運動失調）・心血管リスク（不整脈）で深刻な状態に至るため。\n\n長期サプリ補給時は亜鉛:銅比 10:1-15:1維持（亜鉛15-30mg/日なら銅1-2mg/日併用）を組み立てた流れです。\n\nDoctor\'s Best Zinc Glycinate Chelate + 銅併用品やBalanced Zinc/Copper複合サプリが市販されています。\n\n短期風邪対策のトローチ75-150mg/日（5-7日のみ）は銅欠乏リスク低い（短期間のため累積影響限定的）ため日常サプリ補給と短期トローチ使用は分けて考えます。\n\n血液検査での評価＝亜鉛は血清亜鉛（参考値80-130 μg/dL）、銅はセルロプラスミン+血清銅（亜鉛サプリ長期摂取者は半年-1年に1回の評価推奨）が無難フィードバック設計です。\n\n亜鉛欠乏症状（味覚障害・脱毛・皮膚炎・免疫低下・前立腺機能低下）vs 過剰症状（銅欠乏・HDL低下・吐き気）の両側で評価する必要があります。',
    },
    {
      q: 'ビタミンC外用と経口どちらが皮膚老化に効く？',
      a: 'ヒトRCTでは外用15-20%が経口より直接的に皮膚改善エビデンス強い点が現実です。\n\nPinnell 2003 J Cosmet Sci RCT 15% L-アスコルビン酸外用×3ヶ月で色素沈着・しわ改善・Humbert 2003 Exp Dermatol 5% VC外用 vs 経口比較で外用優位・Traikovich 1999 Arch Otolaryngol 10% VC外用×3ヶ月で皮膚スコア改善が確立しています。\n\n皮膚VC濃度は表皮・真皮で血漿の100倍以上（Pullar 2017 Nutrients）で経口摂取での皮膚到達は限定的。\n\n外用15-20%（L-アスコルビン酸/3-O-エチルアスコルビン酸/アスコルビルリン酸ナトリウム/アスコルビン酸テトライソパルミテート）が論文上で皮膚老化対策の主軸です。\n\n経口ビタミンCはコラーゲン合成補因子として基盤的に重要（プロリン4-/リシン5-ヒドロキシラーゼ補因子）ですが、500-1,000mg/日で皮膚VC濃度上昇は緩やかで。\n\n「経口=ベース・外用=主軸」の補完設計が化粧品メーカー視点の現実解です。\n\n朝食時コラーゲンペプチド5g+ビタミンC500-1,000mg経口+夜VC15%外用が王道階層。\n\n「経口ビタミンCで肌が白くなる」断定NGで外用VC・ナイアシンアミド5%・ハイドロキノン・トラネキサム酸の組合せが色素沈着対策の現実的な選び方です。',
    },
    {
      q: '亜鉛・ビタミンCの併用注意と副作用は？',
      a: '【亜鉛】テトラサイクリン系/フルオロキノロン系抗菌薬avoid（吸収50-90%低下・2-4時間ずらす）。\n\nペニシラミン（金属キレート剤）avoid、銅サプリ吸収競合で銅欠乏リスク（前述）、長期高用量50mg/日以上でHDLコレステロール低下・免疫機能低下（パラドックス）・前立腺がんリスク観察研究レベル懸念（Leitzmann 2003 JNCI）あり、胃部不快感・嘔気（空腹時摂取で稀発生）食後摂取で回避可能。【ビタミンC高用量】シュウ酸結石リスク（カルシウム代謝・腎機能低下例医師相談）、ワルファリンINR低下懸念（1g/日以上・観察研究レベル）。\n\n鉄サプリ吸収増強で過剰鉄リスク（ヘモクロマトーシス既往avoid）。\n\n化学療法中（抗酸化作用で薬効干渉懸念）腫瘍内科判断必須、消化器症状（下痢・腹痛）2-3g/日以上で発生。【両者共通】「免疫力アップ」「風邪予防」断定NG→「免疫細胞機能維持」「風邪期間短縮報告」型統一が薬機法整合的。\n\nNow Foods/Thorne 亜鉛グルコン酸（トローチ）+ Doctor\'s Best 亜鉛+銅併用品vsNow Foods/NOW ビタミンC（緩衝型/エステル化型）の第三者検査済みブランド推奨です。',
    },
    {
      q: '亜鉛・ビタミンC以外で免疫サプリのの段階は？',
      a: '免疫サプリのエビデンス確立度ランキング＝①ビタミンD3 1,000-2,000IU/日（Martineau 2017 BMJ メタ解析 25 RCT n=10,933で急性呼吸器感染症リスク減・特に欠乏者で恩恵大）、②亜鉛グルコン酸/酢酸塩トローチ75-150mg/日（風邪初期24時間以内）（Hemilä 2013 Cochrane）、③プロバイオティクス（株特異性）（Hao 2015 Cochrane 上気道感染症の罹患率・期間軽度減・Lactobacillus rhamnosus GG/ Lactobacillus reuteri DSM 17938/Bifidobacterium animalis BB-12等の株ID必須）、④エルダーベリーシロップ（Tiralongo 2016 Nutrients RCT風邪症状期間短縮・小規模）、⑤ビタミンC経口500-1,000mg/日（極端な身体的ストレス下のみ）（Hemilä 2017 サブグループ）が現実的階層です。\n\nライフスタイル基盤＝良質な睡眠7-8時間（Prather 2015 Sleep感冒罹患リスク睡眠時間で4倍差）・運動（中強度・週150分）・地中海食・ストレス管理・禁煙が免疫機能の底辺で、サプリは補助という前提が論文上の現実解です。\n\n「免疫力」訴求は薬機法/景表法で慎重表記必須で「免疫細胞機能維持」「上気道感染症リスク低減報告」型統一が無難です。',
    },
  ],
  'collagen-peptide-vs-vitamin-c-oral': [
    {
      q: 'コラーゲンペプチドとビタミンC（経口）はどちらを先に試すべき？',
      a: '両者は補完関係で同時摂取が王道です。\n\nコラーゲン合成にビタミンCが補因子として必須＝プロリン4-ヒドロキシラーゼ・リシン5-ヒドロキシラーゼの補酵素として作用し、プロリン残基の4位ヒドロキシ化・リシン残基の5位ヒドロキシ化を触媒。\n\nヒドロキシプロリン・ヒドロキシリシンがコラーゲン三重らせん構造の水素結合形成と架橋結合形成に必須でビタミンC不足では機能的コラーゲン合成困難（極端な欠乏で壊血病に至る）という生化学的根幹があります。\n\nビタミンC不足状態でコラーゲンペプチドだけ大量摂取しても合成効率が頭打ちになる論理的整合性のため。\n\n朝食時にコラーゲンペプチド5g+ビタミンC500-1,000mg同時摂取を踏まえた進め方です（Postlethwaite 1978 PNAS でVC濃度上昇時のコラーゲン合成促進）。\n\nまず食事性で日常基盤＝食事性タンパク質（肉魚卵大豆）十分摂取＋食事性VC（パプリカ・キウイ・柑橘・ブロッコリー）摂取の入り方で、サプリは中高年・閉経後女性・ダイエット中・喫煙者・極端な紫外線暴露・術後創傷治癒補助での追加が現実解です。',
    },
    {
      q: 'コラーゲンペプチドは経口で吸収されないって本当？',
      a: '「経口コラーゲンは胃で分解されてアミノ酸になるだけ」は古い理解で、現在は特定ジペプチド・トリペプチドが分解されずに吸収される機序が確立されています。\n\nIwai 2005 J Agric Food Chem 経口摂取後の血漿プロリン-ヒドロキシプロリン（Pro-Hyp）検出・Shigemura 2009 J Agric Food Chem 線維芽細胞培養でPro-Hypがコラーゲン合成促進シグナル・Asai 2020 Sci Rep 経口Pro-Hypの皮膚到達と線維芽細胞活性化機序確立が中心エビデンスです。\n\nヒトRCTでの皮膚改善エビデンス＝Proksch 2014 Skin Pharmacol Physiol RCT n=114 コラーゲンペプチド2.5g or 5g/日×8週で皮膚弾力・水分量改善（Verisol®/Peptan®等の標準化品）・Asserin 2015 J Cosmet Dermatol RCT n=106 10g/日×8週でしわ深さ改善・Inoue 2016 J Sci Food Agric メタ解析で一貫した改善方向が報告されています。\n\n製品形態差＝特定ペプチド標準化品（Verisol® Gelita社・Peptan® Rousselot社）が論文用量再現の前提で、無標準化コラーゲン粉末は分子量・ペプチド組成バラつきで効果不確実です。\n\n「肌が若返る」「しわが消える」断定NG→「皮膚弾力・水分量・しわ深さの改善が報告」型統一が薬機法整合的です。',
    },
    {
      q: 'コラーゲンペプチドは何を選ぶ？魚由来と豚由来の違いは？',
      a: '規格化と原料種で選択基準が決定的です。\n\nVerisol®（Gelita社・牛または豚由来）/Peptan®（Rousselot社・魚または牛または豚由来）の特定ペプチド標準化品が論文用量再現の前提で。\n\n無標準化コラーゲン粉末は分子量バラつきで効果不確実です。\n\n原料種差＝①魚由来（マリンコラーゲン）は分子量小さく吸収率優位の主張ありも比較RCTでは明確差なし・魚アレルギー既往は禁忌、②豚由来はBSE懸念なし・特定文化圏（イスラム圏ハラール/ユダヤ教コーシャ）で回避ニーズあり、③牛由来はBSEリスク歴史的問題でフリー国家由来品選択推奨、④鶏由来は希少で価格高め。\n\nヒトRCT用量は2.5-10g/日で、Proksch 2014は2.5gで皮膚改善・Asserin 2015は10gで深いしわ改善で用量と効果サイズに正の相関ありです。\n\nコスト＝明治アミノコラーゲン（魚由来Peptan®）/森永おいしいコラーゲン（魚由来）/Vital Proteins（牛由来）/Doctor\'s Best Collagen Peptides（牛由来）が¥1,500-4,000/月で論文用量再現可能です。\n\n「ペプチド」と「アミノ酸」の表記差＝コラーゲンペプチド=分解された短いペプチド（論文エビデンス対象）、コラーゲン加水分解物=同義、コラーゲン（無修飾）=高分子で吸収率低い古い形態でサプリ選択時の表記確認が重要です。',
    },
    {
      q: '経口コラーゲンと外用コラーゲン化粧品どちらが効く？',
      a: '外用コラーゲンは分子量大きく経皮浸透限定で表面保湿が主作用・経口の方が皮膚到達エビデンス強い点が化粧品メーカー視点の現実です。\n\nコラーゲン分子量は約30万Da（テリトリオレートでも数千Da）で角質層通過は分子量500Da以下が目安のため。\n\n外用コラーゲン化粧品の効果は表面保湿（高分子の水分保持）が主軸で皮膚内コラーゲン合成促進への直接効果は限定的です。\n\n化粧品の経口/外用使い分け＝①経口（コラーゲンペプチド2.5-10g+ビタミンC500-1,000mg）＝皮膚深部まで到達してコラーゲン合成促進シグナル（Iwai 2005/Shigemura 2009）、②外用コラーゲン化粧品＝表面保湿の即時効果（手触り・しっとり感）が主軸でしわ・弾力改善の論文蓄積は限定的、③外用レチノール0.025-0.1%/ナイアシンアミド5%/ペプチド系（パルミトイルペンタペプチド-4 Matrixyl/パルミトイルトリペプチド-1）＝コラーゲン合成促進の直接的なヒトRCTエビデンス確立（Kafi 2007/Bissett 2005/Robinson 2005）で外用は分子量制御された活性成分が主軸です。\n\n現実的階層＝経口コラーゲン+VC=ベース／外用レチノール+ナイアシンアミド+ペプチド系=主軸の組合せが化粧品メーカー視点の現実解です。',
    },
    {
      q: 'コラーゲン・ビタミンC以外で皮膚老化対策のの流れは？',
      a: '皮膚老化対策のエビデンス確立度ランキング（ヒトRCT本数・効果サイズ統合）＝①外用レチノール0.025-0.1%/レチナール0.1%（Kafi 2007 Arch Dermatol RCT 0.4%レチノール×24週で深いしわ・弾力・色素沈着改善・光老化対策の論文蓄積最厚）、②日焼け止めSPF30+ PA+++日常使用（紫外線がしわ・色素沈着・光老化の最大要因・Hughes 2013 Ann Intern Med RCTで皮膚老化進行抑制）、③外用ビタミンC15-20%（Pinnell 2003 RCT 色素沈着・しわ改善）、④外用ナイアシンアミド5%（Bissett 2005 RCT しわ・色素沈着・皮膚バリア改善）、⑤外用ペプチド系（Matrixyl/パルミトイルトリペプチド-1）（Robinson 2005/Lintner 2009 RCT しわ改善）、⑥経口コラーゲンペプチド2.5-10g/日（Proksch 2014/Asserin 2015 RCT 皮膚弾力・水分量・しわ改善）、⑦経口アスタキサンチン4-12mg/日（Tominaga 2017 RCT 肌弾力・しわ改善）が現実的階層です。\n\nライフスタイル基盤＝禁煙（タバコは皮膚老化の独立因子・Morita 2007）・紫外線対策・良質な睡眠・地中海食・ストレス管理が皮膚老化対策の底辺で、外用化粧品+経口サプリは補助という前提が化粧品メーカー視点の現実解です。\n\n「美容点滴」「飲む美容液」訴求は薬機法慎重表記必須で「皮膚弾力・水分量・しわ深さの改善が報告」型統一が無難です。',
    },
  ],
  // ── Sprint 3 Session F Day 9 補完 バッチ 2026-05-13（並行セッションf9091db ship後の補完5 KW・skin/cognitive/metabolic/sleep+legal/gut） ────
  'palmitoyl-tripeptide-vs-retinol': [
    {
      q: 'パルミトイルトリペプチドとレチノールの違いは？両者ともしわ・たるみ対策で混同しがちです',
      a: '作用ターゲット・経路・エビデンス階層が大きく異なる補完関係です。パルミトイルトリペプチド（Matrixyl® 3000 = パルミトイル-GHK + パルミトイル-GQPR）はSederma社の合成ペプチドで。\n\n線維芽細胞のコラーゲン産生シグナル誘導（in vitroベース・Robinson 2005 Int J Cosmet Sci メーカー協賛小規模試験 2%×12週でしわ改善・Bhakti 2020 J Cosmet Dermatol レビューで機序整理）ですが、ヒト独立RCTの累積本数は限定的でメーカー試験中心のエビデンス階層です。\n\nレチノールはRAR/RXR受容体結合経由でターンオーバー促進＋真皮コラーゲン産生＋MMP抑制の多経路。\n\nKafi 2007 Arch Dermatol RCT n=36 NIHグラント独立試験 0.4%×24週で深いシワ・色素沈着改善・Kligman 1986古典〜数百本のRCT累積で論文蓄積が圧倒的です。\n\n「植物性レチノール」「レチノール上位互換」訴求は科学的に不正確（パルミトイルトリペプチドはRAR非結合・シグナル経路独立）です。',
    },
    {
      q: 'パルミトイルトリペプチドとレチノールの選び方は？年代や肌タイプで使い分けはありますか？',
      a: 'エビデンスの厚みでレチノール優位、刺激プロファイル・妊娠中可否でパルミトイルトリペプチド優位の使い分けです。【レチノール優先】①深いシワ・光老化対策（30代後半以降の本格的なエイジングケア）、②ヒトRCT累積エビデンス重視、③刺激に耐えられる肌タイプ・継続使用可能な層、④夜のみ使用・日焼け止め必須を守れる層。【パルミトイルトリペプチド優先】①敏感肌・初心者で刺激が出やすい層、②妊娠中・授乳中（レチノールは催奇形性リスクで使用NG・FDA Category Cレチノイド類縁）、③朝晩使用したい層、④光分解リスクを避けたい層。\n\n敏感肌・初心者順序＝ナイアシンアミド5% → パルミトイルトリペプチド → 低濃度レチノール0.1%の段階性が現実解で、両者は経路独立で併用OK・刺激リスクほぼゼロのため中上級者では同時配合品（The Ordinary "Buffet" マルチペプチド+HA・La Roche-Posay Retinol B3 Serumなど）が普及しています。',
    },
    {
      q: '妊娠中はレチノールNGですがパルミトイルトリペプチドは安全ですか？',
      a: 'パルミトイルトリペプチドは妊娠中・授乳中も比較的安全な代替軸として妥当です。レチノールは経口高用量で催奇形性リスク（イソトレチノイン処方薬の催奇形性確立・FDA Pregnancy Category X）が確立しており、外用レチノールは経口より血中移行量が少ないものの妊娠中は念のため使用NG（ACOG 2024 guidance）の立場が一般的です。パルミトイルトリペプチドはペプチド構造で経皮吸収後の全身移行量が極めて少なく、催奇形性リスク報告なし・FDA Category 該当なし・妊娠中安全の代替軸として推奨されます。\n\n妊娠中の代替軸3本柱＝①ナイアシンアミド5%（Bissett 2005 RCT・妊娠中安全）、②ビタミンC 15%（L-アスコルビン酸・Pinnell 2001 抗酸化）、③パルミトイルトリペプチド（コラーゲン産生シグナル）が王道。バクチオール（Bakuchiol）も植物性レチノール代替として注目されていますが、妊娠中の独立した安全性データは限定的のため、ACOG準拠ではナイアシンアミド/VC/ペプチドが第一選択です。',
    },
    {
      q: 'パルミトイルトリペプチドの効果が出るまでどれくらい？コラーゲン産生は本当に起きますか？',
      a: '12-24週の継続使用が現実的目安で、コラーゲン産生シグナル誘導はin vitro試験ベースのため期待値調整必須です。Robinson 2005 Int J Cosmet Sci メーカー協賛試験 Matrixyl® 3000 2%×12週でしわ改善が報告されていますが、ヒトでのコラーゲン産生実証は皮膚生検レベルの試験が限定的で、メーカー協賛試験の結果を慎重に解釈すべき領域です。\n\n「コラーゲンを増やしてくれる」訴求は科学的厳密には『コラーゲン産生シグナルが in vitro で確認されたペプチド』が無難表現で、外用ペプチドが真皮深層に到達してコラーゲン産生を実質的に増やす量的エビデンスは未確立です。レチノールは皮膚生検レベルで真皮コラーゲン増加が確認されており（Kafi 2007 Arch Dermatol・Voorhees研グループ）、エビデンス階層では一段上です。\n\nペプチドはレチノールの代替ではなく補助レイヤーとして位置づけ、敏感肌・妊娠中・初心者で「とりあえずペプチド」の選択は合理的、本格的なエイジングケアではレチノール主軸が王道です。',
    },
    {
      q: 'パルミトイルトリペプチドとレチノールの併用順序・スタック設計は？',
      a: '経路独立で併用OK・刺激リスクほぼゼロの組合せです。【スタック設計】①洗顔→化粧水→ナイアシンアミド5%セラム（バリア補強・色素沈着）→パルミトイルトリペプチドセラム（コラーゲン産生シグナル）→レチノール0.1-0.5%（夜のみ・ターンオーバー）→保湿クリーム→（朝のみ）日焼け止め SPF50+ PA++++が無難な順番です。【併用合理性】①経路独立＝ペプチド（シグナル経路・RAR非結合）+ レチノール（RAR/RXR結合・ターンオーバー）で機序重複なし、②刺激ほぼゼロ＝ペプチドはレチノールの赤み・乾燥を増悪させない（ナイアシンアミド・ペプチドはレチノールの刺激緩和補助）、③朝晩分離可能＝朝ペプチド+ナイアシンアミド+VC+日焼け止め、夜ペプチド+レチノール+保湿の使い分け。市販同時配合品（The Ordinary "Buffet" マルチペプチド+HA・La Roche-Posay Retinol B3 Serum・SkinCeuticals A.G.E. Interrupter）も普及しており、の組み立てです。月コスト¥6,000-15,000の組合せ範囲、3ヶ月以上の継続が前提です。',
    },
  ],
  'centella-asiatica-vs-niacinamide': [
    {
      q: 'ツボクサ（CICA）とナイアシンアミドの違いは？両者とも肌に優しい成分で混同しがちです',
      a: '作用ターゲットが完全に異なる補完関係です。ツボクサエキス（Centella Asiatica・CICA）は鎮静・抗炎症・創傷治癒の第一選択で、TECA標準化（asiaticoside 40% + asiatic acid 30% + madecassic acid 30%）が論文上。\n\nBonté 1994 Wound Repair Regen 創傷治癒in vitro試験・Ratz-Łyko 2016 J Cosmet Laser Ther ヒトRCT TECA抽出物しわ・水分改善・Pyo 2002 Phytother Res madecassoside抗炎症性確認・Bylka 2013 Postepy Dermatol Alergol レビューで「酒さ・脂漏性皮膚炎・敏感肌・赤み」の鎮静作用が論文蓄積、敏感肌・赤み・酒さの第一選択です。ナイアシンアミドはBissett 2005 J Cosmet Dermatol RCT 5%×8週で色素沈着・小じわ・皮脂・バリア機能の4方面改善が確認された多機能ビタミンB3で、補完関係です。',
    },
    {
      q: 'CICAとナイアシンアミドはどっちを選ぶ？敏感肌・赤み肌でも併用OK？',
      a: '症状で第一選択を決め、両者経路独立で併用OKです。【CICA優先】①赤み・酒さ・脂漏性皮膚炎・アトピー肌のバリア低下時（鎮静が最優先）、②ピーリング後・レーザー後の創傷治癒補助、③マスク荒れ・摩擦・刺激後の鎮静、④ニキビ炎症後の鎮静期。【ナイアシンアミド優先】①色素沈着・くすみ・PIH（炎症後色素沈着）、②毛穴開き・皮脂過剰、③バリア機能補強の中長期維持、④小じわ・初期エイジング。\n\n敏感肌順序＝CICA鎮静で炎症落ち着いてからナイアシンアミド多機能の段階性が現実解で、両者経路独立で併用OK、市販でもANUA Heartleaf 77 Toner + Niacinamide 10%セラム等の同時配合処方が韓国コスメ中心に普及。妊娠中も両者比較的安全で、ハイドロキノンの代替路線として実用的です。',
    },
    {
      q: '「韓国コスメCICA」は本当に効くんですか？効果が出るまでどれくらい？',
      a: 'TECA標準化品（asiaticoside 40%+asiatic acid 30%+madecassic acid 30%）は論文ベースで鎮静作用が確認されていますが、「韓国コスメCICA」全般は規格バラつき大・誇張訴求が混在する領域で慎重評価が必要です。論文ベースの有効性確立成分はTECA標準化TECAエキスで、Madecassosol®・TECA-1%等の規格表記がある製品が論文用量再現の前提です。\n\n規格表記なしの「ツボクサ配合」化粧品は asiaticoside/asiatic acid/madecassic acid の含有量がバラつき効果保証が難しい状況です。\n\n効果が出るまで＝①鎮静作用2-4週（赤み・かゆみ・刺激緩和）、②バリア機能改善8-12週、③シワ・水分量改善12-24週（Ratz-Łyko 2016 RCT 24週）。\n\n「酒さが治る」「アトピーが治る」断定NGで、酒さは皮膚科処方治療（メトロニダゾール・イベルメクチン・低用量ドキシサイクリン・血管レーザー）・アトピーは皮膚科処方治療（ステロイド外用・タクロリムス・JAK阻害薬デュピルマブ等の生物学的製剤）が第一選択で、CICAは補助レイヤー位置づけです。',
    },
    {
      q: 'ナイアシンアミドの4効能とは？論文RCTで何が確認されている？',
      a: 'Bissett 2005 J Cosmet Dermatol RCT 5%×8週で①色素沈着改善・②小じわ改善・③皮脂分泌抑制・④バリア機能改善の4方面が確認されています。\n\n機序＝①色素沈着＝Hakozaki 2002 Br J Dermatol で確認されたメラノソーム転移阻害（メラノサイトから角化細胞へのメラニン輸送をブロック）でメラニンを「作らせず」「移送させない」二段ブロック、②小じわ＝NAD/NADPの前駆体でセラミド合成・コラーゲン産生補助（Tanno 2000 Br J Dermatol）、③皮脂＝皮脂腺の脂質産生抑制（Draelos 2006 J Cosmet Laser Ther）、④バリア＝表皮セラミド合成促進で角層含水量・TEWL改善（Bissett 2005 RCT）。\n\n「ナイアシンアミド一択で4方面カバー」は論文ベースで合理的訴求で、5%×8週以上の継続使用が効果実感の前提です。\n\n有効濃度＝2-10%でBissett 2005 の5%が論文用量、4%以下では効果限定的・10%以上は刺激リスクのため5%が現実解です。妊娠中も比較的安全で、ハイドロキノン4%（処方医薬部外品）の代替路線として実用的な選択肢です。',
    },
    {
      q: 'CICAとナイアシンアミド以外で敏感肌・バリア補強に現実的な成分は？',
      a: '論文蓄積最厚は①セラミド・②パンテノール（プロビタミンB5）・③ヒアルロン酸です。【セラミド】細胞間脂質として角層バリアを構築、Imokawa 1991 J Invest Dermatol アトピー皮膚でセラミド減少確認・Kucharekova 2002 経口/外用セラミドRCTで角層含水量改善。【パンテノール】抗炎症＋創傷治癒＋保湿の多経路、Ebner 2002 Am J Clin Dermatol レビューで医療現場の創傷治癒適応（火傷・術後・乳児オムツかぶれ）。【ヒアルロン酸】水分吸引性で角層〜表皮の即時保湿（自重の最大1,000倍の水分保持）、低分子HA（浸透型）と高分子HA（表面保護型）の併用設計が現実的。\n\n敏感肌・バリア補強の妥当スタック＝①洗顔=低刺激アミノ酸系、②化粧水=ヒアルロン酸+グリセリン、③セラム=CICA+ナイアシンアミド、④保湿=セラミド+パンテノール、⑤日焼け止め=ノンケミカル（酸化亜鉛・酸化チタン）SPF30+の入り方です。皮膚科受診タイミングは赤み・湿疹・かゆみが2週間以上継続する場合・浸出液・かさぶた・化膿症状ある場合です。',
    },
  ],
  'berberine-vs-chromium': [
    {
      q: 'ベルベリンとクロムの違いは？両者とも血糖管理サプリで混同しがちです',
      a: '作用経路が異なる補完関係ですが、エビデンス階層と訴求の誇張度合いで慎重評価が必要な領域です。ベルベリンはウコンギ・キハダ等のアルカロイド成分で。\n\nAMPK活性化経由でインスリン感受性改善・腸内細菌叢調整・LDL低下の多経路。\n\nYin 2008 Metabolism RCT n=84 ベルベリン500mg×3/日×3ヶ月でHbA1c 9.5→7.5%改善（メトホルミン1,500mg/日と同等を主張する論文だが小規模・中国単独試験）・Dong 2012 Evid Based Complement Alternat Med メタ解析 14 RCT n=1,068 でHbA1c・空腹時血糖・インスリン改善傾向（heterogeneity 高い）が報告されています。クロム（クロムピコリネート）はインスリン受容体補因子（クロモジュリン経由でインスリンシグナル増強）。\n\nAnderson 1997 Diabetes RCT n=180 クロムピコリネート1,000μg/日×4ヶ月でインスリン感受性改善・Cefalu 2006 J Trace Elem Med Biol メタ解析で2型糖尿病の血糖管理補助、ただしBalk 2007 Diabetes Care メタ解析では「効果は控えめ・heterogeneity 大」と慎重評価です。',
    },
    {
      q: '「ベルベリン=天然のメトホルミン」は本当ですか？効果はメトホルミンと同等？',
      a: '「天然のメトホルミン」訴求は誇張で誠実評価すべき独占切り口です。\n\nメトホルミンはUKPDS 1998 Lancet n=4,209 10年追跡で心血管死亡率・全死亡率減少・ADA推奨2型糖尿病第一選択処方薬として大規模長期RCTで確立、ベルベリンはYin 2008 RCT n=84（中国単独試験・小規模）で「メトホルミン同等」を主張したもののheterogeneity 高い・長期心血管アウトカム未確立です。\n\n実用的評価＝①血糖管理は処方薬第一選択（メトホルミン・GLP-1作動薬セマグルチド・SGLT2阻害薬・DPP-4阻害薬）、②生活軸（運動・地中海食・減量5-10%）が論文蓄積最厚（Diabetes Prevention Program 2002 NEJM 生活介入58%糖尿病発症リスク減 vs メトホルミン31%）、③ベルベリンは補助レイヤーでメトホルミン代替判断は処方医と相談、独断中止は危険です。\n\nサプリ業界の「自然な選択肢」訴求は処方薬への忌避感を利用したマーケティングで、論文ベースでは処方薬の長期エビデンスが圧倒的に厚い点を期待値調整必須です。',
    },
    {
      q: 'ベルベリンとクロムの併用注意は？糖尿病薬を服用中です',
      a: '🚨糖尿病処方薬併用低血糖警告必須＝メトホルミン・SU薬（グリベンクラミド・グリメピリド）・インスリン・GLP-1作動薬（リラグルチド・セマグルチド）・SGLT2阻害薬（エンパグリフロジン・ダパグリフロジン）・DPP-4阻害薬（シタグリプチン・ビルダグリプチン）すべての併用で血糖モニタリング強化・処方医と用量調整必須です。【ベルベリン特異的注意】CYP3A4阻害でアトルバスタチン/シンバスタチン/ロスバスタチン/シクロスポリン/タクロリムス血中濃度上昇懸念。\n\nP-glycoprotein阻害でジゴキシン中毒リスク、ワルファリンINR上昇懸念。\n\n抗生物質テトラサイクリン系・キノロン系で吸収阻害（2-4時間ずらす）、消化器症状（下痢・便秘・腹痛）が高頻度、妊娠中・授乳中NG（核黄疸リスク）。【クロム特異的注意】腎機能低下時クロム蓄積（透析患者高クロム血症）。\n\n鉄欠乏性貧血併発時の鉄吸収阻害（クロムは鉄と競合）、抗酸化サプリ高用量との競合（バナジウム・亜鉛との吸収競合）。両者とも処方医・薬剤師に相談が原則で、サプリ追加は自己判断ではなく医療チーム合意が無難な順番です。',
    },
    {
      q: 'ベルベリンとクロムはどっちを選ぶ？併用は意味ありますか？',
      a: '適用集団・症状で第一選択を決めるのが無難です。【ベルベリン優先】①境界型糖尿病・前糖尿病（IGT/IFG）でHbA1c 5.7-6.4%範囲（処方適応外領域でのサプリ補助）、②メタボリックシンドローム（腹囲・脂質異常・血圧・血糖の複合リスク）、③腸内細菌叢改善目的の補助（Liu 2018 ベルベリンの腸内細菌叢調整研究）、④LDLコレステロール軽度上昇（Kong 2004 Nat Med ベルベリンLDL受容体発現上昇）。【クロム優先】①インスリン抵抗性軽度・血糖変動の安定化補助、②糖尿病薬服用中の血糖管理補助レイヤー（低血糖注意下）、③コスト重視層（クロム¥500-2,000/月 vs ベルベリン¥3,000-6,000/月）、④境界型でクロム単独試行。【両者併用】経路独立でシナジー合理だがヒトRCT未確立、両者単独のエビデンスからの推測で、まず生活軸（運動・地中海食・減量5-10%）→単独試行3ヶ月→改善なし→医療機関受診の入り方です。\n\n処方薬第一選択の領域に独断進入しないが原則で、HbA1c 6.5%以上・空腹時血糖126mg/dL以上は内科受診マストです。',
    },
    {
      q: 'ベルベリン・クロム以外で血糖管理に現実的な方法は？',
      a: '生活軸が論文蓄積圧倒的＝①運動（有酸素＋レジスタンス併用）（Diabetes Prevention Program 2002 NEJM 生活介入で糖尿病発症58%減）、②地中海食・低GI食（PREDIMED 2018 NEJM 心血管リスク低減）、③減量5-10%（Look AHEAD trial 2013 体重5%減で代謝改善）、④質の高い睡眠7-8時間（Spiegel 1999 Lancet 睡眠不足でインスリン抵抗性悪化）、⑤禁煙・適度な飲酒制限（J-DOIT3 厳格生活管理）が血糖管理の底辺です。\n\nサプリ系では①マグネシウム（Mg欠乏者のインスリン感受性改善 Veronese 2017 Diabetes Care メタ）、②ビタミンD（観察研究で2型糖尿病リスク逆相関 Pittas 2018 NEJM D2d trial主要評価項目では有意差なし）、③オメガ3（EPA/DHA インスリン抵抗性関連の補助・Akinkuolie 2011）、④シナモン（Allen 2013 Ann Fam Med メタ 空腹時血糖軽度改善）、⑤ベルベリン・クロムが独立軸のエビデンス成分です。\n\n処方薬（メトホルミン・GLP-1作動薬・SGLT2阻害薬）が第一選択で、サプリは補助レイヤー位置づけ。\n\nHbA1c 6.5%以上は内科受診マストです。',
    },
  ],
  'ramelteon-vs-melatonin': [
    {
      q: 'ラメルテオンとメラトニンの違いは？処方薬とサプリで規制区分が違う？',
      a: '規制区分・作用機序・適応が異なる別カテゴリです。ラメルテオン（ロゼレム®武田薬品 8mg/日）は処方医薬品で。\n\nメラトニンMT1/MT2受容体作動薬として不眠症の入眠困難に承認、Roth 2006 Sleep 多施設RCT n=405 で入眠潜時改善・Mayer 2009 Sleep 慢性不眠RCT・Erman 2006 Sleep Med 高齢者慢性不眠RCTで臨床有効性確立、依存性・離脱症状リスクがベンゾジアゼピン系・非ベンゾジアゼピン系（ゾルピデム・ゾピクロン）より低いプロファイルです。\n\nメラトニンは内因性ホルモンで、日本では医薬品扱い国内サプリ流通なし・海外サプリは個人輸入領域、Auld 2017 Sleep Med Rev メタ解析で入眠潜時短縮平均7分・Buscemi 2005 BMJ メタ解析で時差ぼけ症状改善・Sack 2010 Sleep Med Clin で概日リズム障害（時差ぼけ・交代勤務・DSWPD遅延型睡眠相症候群）の主用途と整理されています。\n\n本サイトのスタンス＝ラメルテオンは処方医判断、メラトニンは推奨しない立場・国内流通サプリ（Mg-glycinate+グリシン+L-テアニン）スタックを軽症不眠の本サイト推奨として提示します。',
    },
    {
      q: 'メラトニンサプリは日本では買えないんですか？個人輸入は大丈夫？',
      a: '日本では医薬品扱いで国内サプリ流通なし。\n\n本サイトの立場＝①慢性不眠（毎晩3週間以上入眠潜時30分以上）→心療内科・睡眠外来受診→ラメルテオン処方検討、②概日リズム障害（時差ぼけ・交代勤務・DSWPD）→国内サプリ流通なし・睡眠外来受診、③軽症入眠困難→Mg-glycinate 200-400mg + グリシン3g + L-テアニン200mg の本サイト推奨スタックが無難な順番です。海外個人輸入での自己判断使用は推奨しません。',
    },
    {
      q: 'ラメルテオンの安全性は？フルボキサミン併用禁忌って本当？',
      a: '🚨フルボキサミン（デプロメール®/ルボックス®）×ラメルテオン併用禁忌＝CYP1A2阻害でラメルテオン血中濃度50-190倍上昇という最強警告領域です。\n\n併用禁忌・注意薬＝①フルボキサミン併用禁忌（うつ・社交不安障害・パニック障害治療薬）、②重度肝障害禁忌、③強CYP1A2阻害薬注意（シプロフロキサシン・エノキサシン・メキシレチン・チクロピジン）、④強CYP3A4阻害薬注意（ケトコナゾール・イトラコナゾール）、⑤強CYP1A2/CYP3A4誘導薬注意（リファンピシン・カルバマゼピン・フェニトイン）。\n\n副作用＝めまい・眠気・倦怠感・頭痛が比較的高頻度、稀にプロラクチン上昇・テストステロン低下・無月経・乳汁分泌・肝機能異常。\n\nプロラクチン上昇関連症状（無月経・乳汁分泌・性欲低下）が出現したら処方医相談・血液検査で確認です。\n\nベンゾジアゼピン系・非ベンゾジアゼピン系（ゾルピデム・ゾピクロン）との比較で依存性・離脱症状リスクは低いプロファイルですが、自己判断での開始・中止・用量変更は厳禁で処方医指示厳守が原則です。本サイトはラメルテオンの使用判断について処方医・睡眠外来に委ねる立場です。',
    },
    {
      q: '不眠のタイプ別にどう対処すべきですか？処方薬・サプリ・受診の判断は？',
      a: '不眠のタイプ別の妥当対処を整理します。【①慢性入眠困難型（毎晩3週間以上入眠潜時30分以上）】→心療内科・内科・睡眠外来受診→ラメルテオン処方検討（処方医判断）+ CBT-I（不眠の認知行動療法・エビデンス確立 Trauer 2015 Ann Intern Med メタ）。【②概日リズム障害（時差ぼけ・交代勤務・DSWPD遅延型睡眠相症候群）】→国内サプリ流通なし・睡眠外来受診→光療法・メラトニン処方薬（適応外使用は処方医判断）+ 行動療法。【③中途覚醒・早朝覚醒型】→心療内科受診（うつ病・不安障害・睡眠時無呼吸症候群の鑑別）→必要に応じて長半減期処方薬（スボレキサント・レンボレキサント・エスゾピクロン）。【④軽症入眠困難（数日〜数週間・ストレス性）】→本サイト推奨スタック=Mg-glycinate 200-400mg + グリシン3g + L-テアニン200mg + 睡眠衛生改善（カフェイン制限・ブルーライト制限・就寝時刻固定・運動習慣）。【⑤睡眠時無呼吸症候群疑い（いびき・無呼吸・日中過眠）】→呼吸器内科・耳鼻咽喉科受診→ポリソムノグラフィ検査→CPAP療法。\n\n自己判断のサプリ・処方薬使用は危険で、2週間以上継続する不眠は受診マストです。',
    },
    {
      q: 'ラメルテオン・メラトニン以外で睡眠サポートに実用的な方法は？',
      a: 'CBT-I（不眠の認知行動療法）が論文蓄積最厚＝Trauer 2015 Ann Intern Med メタ・Cochrane 2015 でCBT-Iは慢性不眠への第一選択治療として確立、睡眠外来・心療内科で実施可能です。\n\n生活軸＝①睡眠衛生（就寝時刻固定・カフェイン午後制限・ブルーライト制限・寝室の温度湿度・遮光）、②運動習慣（有酸素+レジスタンス・就寝3時間前まで）、③カフェイン午後カット（半減期5-6時間）、④アルコール制限（入眠促進だが中途覚醒・睡眠の質悪化）が論文蓄積最厚です。\n\n本サイト推奨サプリスタック＝①マグネシウム グリシン酸塩 200-400mg/日（Abbasi 2012 J Res Med Sci RCT n=46 高齢者PSQI改善）、②グリシン 3g/就寝前（Yamadera 2007 Sleep Biol Rhythms RCT n=15 深部体温低下・朝の眠気改善）、③L-テアニン 200mg/日（Hidese 2019 Nutrients RCT n=30 睡眠の質改善・α波増加）、④バレリアン 400-900mg（Bent 2006 Am J Med メタ 効果限定的・慎重評価）、⑤カモミール（Adib-Hajbaghery 2017 Complement Ther Med 高齢者軽度効果）が独立軸のエビデンス成分です。\n\n自己判断の処方薬・サプリ使用は危険で、慢性不眠は睡眠外来・心療内科受診の入り方です。',
    },
  ],
  'probiotics-vs-akkermansia': [
    {
      q: 'プロバイオティクスとアッカーマンシアの違いは？両者とも腸内細菌サプリで混同しがちです',
      a: '研究段階とエビデンス階層が大きく異なる補完関係です。プロバイオティクスはISAPP公式定義（Hill 2014 Nat Rev Gastroenterol Hepatol）「適量投与で宿主に健康利益をもたらす生きた微生物」で。\n\nLactobacillus / Bifidobacterium 等の従来菌＝L. plantarum 299v（IBS改善 Niedzielin 2001）・LGG（抗菌薬関連下痢予防 Hempel 2012 JAMA メタ）・BB-12（便秘改善 Eskesen 2015）・L. reuteri DSM 17938（乳児コリック軽減 Sung 2018 Pediatrics メタ）等の株単位エビデンスが論文蓄積最厚で、数十年の臨床蓄積があります。\n\nアッカーマンシア（Akkermansia muciniphila MucT）は腸粘液層に常在するムチン分解菌で、Everard 2013 PNAS 動物試験・Plovier 2017 Nat Med パスチャライズ品独自データ・Depommier 2019 Nat Med ヒトRCT n=32 過体重・肥満者×3ヶ月でインスリン感受性改善・LDL低下（限定的・小規模）・Liu 2017 Nat Med 観察研究で2型糖尿病患者の腸内A. muciniphila量低下が報告されている新興エビデンス成分で、研究段階に決定的な差があります。',
    },
    {
      q: '「アッカーマンシアは次世代プロバイオの上位互換」って本当ですか？',
      a: '「次世代上位互換」訴求は時期尚早で誠実評価すべき独占切り口です。\n\nエビデンス階層の決定的差＝①従来プロバイオは数十年のヒトRCT蓄積（IBS・抗菌薬関連下痢・乳児コリック・便秘等のCochrane SR複数本）vs アッカーマンシアはDepommier 2019 1本のヒト小規模RCTレベルでエビデンス階層に決定的な差、②従来プロバイオの株別エビデンスとは比較対象が異なる別カテゴリで「同じ土俵」での優劣評価ではなく、③価格差≒6倍（アッカーマンシア¥6-12k/月 vs Now Foods Probiotic-10 ¥1.5-3k/月）でROIは現状従来プロバイオが圧倒です。\n\n現実的評価＝①特定症状対応（IBS-D・抗菌薬服用中・便秘・乳児コリック）は従来プロバイオ株別選択が第一選択、②アッカーマンシアは新興エビデンス成分で経済的余裕層の試験的選択肢として位置づけ、③「アッカーマンシアが将来の主役」は研究方向としては妥当だが、現時点ではエビデンス十分でないと慎重評価が必要です。サプリ業界の「最新成分」訴求は研究進行中の段階を「確立」と誤認させるマーケティングで、妥当評価では従来プロバイオが現実解です。',
    },
    {
      q: '日本で買えるプロバイオは？「乳酸菌1,000億個」は意味ある訴求ですか？',
      a: '「乳酸菌1,000億個」訴求は株名なしで論文ベース評価不能で、株単位エビデンスを確認した選択が王道です。【国内流通プロバイオの株別選択】①ヤクルト1000＝Lactobacillus casei strain Shirota（精神的ストレス緩和RCT・Marotta 2019・1日1本100億個）、②明治R-1＝Lactobacillus delbrueckii subsp. bulgaricus OLL1073R-1（免疫機能維持・Makino 2010 高齢者上気道感染抑制）、③森永LKM512＝Bifidobacterium animalis subsp. lactis LKM512（便通改善・Matsumoto 2011）、④伊藤園緑茶＋ガセリ菌＝Lactobacillus gasseri SBT2055（腹部脂肪減少・Kadooka 2010）、⑤iHerb海外輸入＝Now Foods Probiotic-10（10株ブレンド）・Garden of Life Raw Probiotics・Jarrow Formulas等。\n\n「乳酸菌1,000億個」訴求は株名・株IDなしで論文ベース評価不能。\n\n菌数より株別エビデンスが現実的選択軸です。\n\n特定症状対応＝IBS-D→LGG・抗菌薬服用中→Saccharomyces boulardii・便秘→BB-12・乳児コリック→L. reuteri DSM 17938の株別選択が現実解です。',
    },
    {
      q: 'アッカーマンシアは日本で買えますか？効果はどれくらい？',
      a: '国内流通の機能性表示食品/特保はなく、海外個人輸入領域です。\n\nPendulum Therapeutics社（米国・スイスEPFL系）のPendulum Akkermansiaが主要製品で、Live Akkermansia muciniphila MucT 1×10^9 CFU/日・¥6,000-12,000/月の高価格帯です。\n\nPlovier 2017 Nat Med でパスチャライズ（低温殺菌）アッカーマンシアが生菌より効果向上の独自データに基づき製剤化されています。\n\n効果のエビデンス＝Depommier 2019 Nat Med ヒトRCT n=32 過体重・肥満者にパスチャライズアッカーマンシア×3ヶ月でインスリン感受性改善・LDL低下・血漿リポ多糖低下が報告されています（限定的・小規模ヒトRCT）。\n\n現状の論文評価＝①動物試験では肥満・糖尿病マウスへの効果一貫、②ヒトRCTはDepommier 2019 1本のみで n=32 小規模、③長期安全性データ未整備、④大腸炎症性疾患（潰瘍性大腸炎・クローン病活動期）での粘液層分解懸念（動物試験ベース）で消化器内科判断必須です。\n\n現実解＝まず食事性発酵食品＋食物繊維（プレバイオ）＋従来プロバイオで腸内環境基盤、経済的余裕でアッカーマンシア追加が無難な順番です。',
    },
    {
      q: 'プロバイオ・アッカーマンシア以外で腸活に実用的な方法は？',
      a: '食事性発酵食品 + 食物繊維（プレバイオ）が論文蓄積最厚です。【発酵食品】①ヨーグルト（株別エビデンスあり・ヨーグルトを毎日100-200g）、②ぬか漬け・キムチ（Lactobacillus属・植物性乳酸菌）、③味噌・納豆（Bacillus subtilis natto・腸内環境改善）、④ケフィア（多菌種ブレンド・Marsh 2014）で、Marco 2017 Curr Opin Biotechnol レビューで発酵食品の腸内菌多様性向上が報告されています。【食物繊維（プレバイオ）】22-25g/日が日本人推奨摂取量（厚労省）に対し平均摂取量は14-15g/日で不足、水溶性食物繊維（イヌリン・βグルカン・ペクチン・サイリウム）+ 不溶性食物繊維（セルロース・リグニン）のバランスを整理した内容です。【シンバイオティクス】Petschow 2013 でプロバイオ+プレバイオ同時摂取のシナジー設計が報告されています。【生活軸】運動習慣・睡眠7-8時間・ストレス管理・腸-脳軸（gut-brain axis）介入（Cryan 2019 Physiol Rev）も腸内環境の基盤です。\n\nサプリは補助レイヤーで、食事性発酵食品+食物繊維+生活軸の入り方です。免疫抑制状態（HIV/AIDS・癌化学療法中・臓器移植後）でプロバイオ追加は菌血症リスクで医師相談下です。',
    },
  ],
  // ── Session F Day 10 v2 バッチ 2026-05-14（AHA + バリア機能 skin 2本デー PAIR_CUSTOM_FAQS） ────
  'glycolic-acid-vs-lactic-acid': [
    {
      q: 'グリコール酸と乳酸のどちらを選ぶ？',
      a: '目的別の使い分けが無難です。\n\nグリコール酸（分子量76 Da・AHA中最小・浸透深度最深）→深層浸透・角質剥離効果最強・しわ/光老化/ニキビ後色素沈着の中上級者向け（Smith 1996 Cutis RCT 8%×12週で皮膚スコア改善・Bernstein 2001 高濃度ピーリング光老化対策根拠）。\n\n乳酸（分子量90 Da・グリコール酸より大きい+保湿効果併存）→穏やかな浸透+保湿効果併存・敏感肌・初心者・乾燥肌・酒さ補助に適性（Berardesca 1989 Br J Dermatol RCT 5%×3ヶ月で皮膚水分量+バリア機能改善・Smith 1996 J Am Acad Dermatol 12%×2週でしわ・皮膚厚改善根拠）。\n\n併用合理＝朝低濃度乳酸（5%）+夜中濃度グリコール酸（10%）の使い分けを組み立てた流れです。\n\n敏感肌の段階的導入＝①バリア回復→②乳酸5%（夜のみ・週2-3回）→③乳酸10% or グリコール酸5%→④グリコール酸10%以上は週2-3回維持・濃度より頻度コントロールの4段階の入り方です。',
    },
    {
      q: 'AHA使用の絶対ルールは？',
      a: '4つの絶対ルールを踏まえた進め方です。\n\n①夜のみ使用＝朝AHA使用後の日中紫外線で色素沈着リスク（Kornhauser 2010 Clin Cosmet Investig Dermatol レビュー）。\n\n②日中SPF30+ PA+++必須＝AHA使用で皮膚バリア一時的に弱化・紫外線感受性増加（Kornhauser 2010根拠）。\n\n③妊娠中は低濃度（5%以下）の家庭用は比較的安全だが医療用ケミカルピーリング（30%以上）は禁忌（医療用は経皮吸収量増加）。\n\n④レチノール併用は刺激重畳で夜時間分離不可（朝AHA/夜レチノール）＝両者とも刺激リスクある成分で同時使用は刺激重畳・赤み・乾燥・落屑のリスク増。\n\n頻度コントロールが濃度より重要＝5-10%濃度を週2-3回 vs 5%濃度を毎日ならの進め方は週2-3回で、毎日使用は高濃度品（10%以上）では推奨しません。\n\n敏感肌・酒さ・脂漏性皮膚炎・アトピー素因はパッチテスト推奨で初使用前に上腕内側で24-48時間反応確認が無難な順番です。',
    },
    {
      q: 'PHA（ポリヒドロキシ酸）はAHA代替になる？',
      a: 'PHA（ポリヒドロキシ酸・グルコノラクトン・乳糖酸）は分子量大きく刺激低い代替軸としての選択肢です。\n\nEdison 2004 J Am Acad Dermatol レビューでPHAはAHAと類似機序（角質剥離+ターンオーバー促進）だが分子量大きく（180-358 Da）皮膚浸透深度が浅く刺激リスク低いことが確立されています。\n\n用途＝敏感肌・酒さ・脂漏性皮膚炎・酒さ・アトピー素因のAHA代替として有用で。\n\nThe Ordinary Lactic Acid 10% + HAは乳酸+PHA配合の現実的な選び方。\n\nNeoStrata Bionic Face CreamはPHA特化品です。\n\n効果サイズはAHAより穏やかで深いしわ・光老化対策にはAHA/レチノールが主軸。\n\nPHAは敏感肌補助・バリア機能改善の位置づけの流れです。\n\n併用合理＝朝PHA+夜AHA（or 朝AHA+夜PHA）の使い分けまたは同一製剤併存（The Ordinary Lactic Acid 10% + HA等）が敏感肌のの段階構成。\n\n両者ともレチノール併用は時間分離推奨（朝AHA/PHA+夜レチノール）です。',
    },
    {
      q: 'グリコール酸・乳酸の併用注意は？',
      a: '併用注意6領域を整理した内容です。\n\n①レチノール・ペプチド・ビタミンC外用との同時使用は刺激重畳で時間分離（朝レチノール/VC＋夜AHA、または朝AHA＋夜レチノール）が王道。\n\n②経口イソトレチノイン・トレチノイン処方薬服用中は外用AHA回避。\n\n③妊娠中授乳中は低濃度家庭用は比較的安全だが医療用ピーリング（30%以上）は禁忌。\n\n④敏感肌・酒さ・脂漏性皮膚炎・アトピー素因はパッチテスト推奨で初使用前24-48時間反応確認。\n\n⑤光感受性増加で日中SPF30+ PA+++必須。\n\n⑥ニキビ素因×サリチル酸（BHA）併用は刺激重畳で時間分離（朝BHA/夜AHAまたはBHA週2-3回+AHA週2-3回交互）。\n\n両者ともほぼ全成分と相性問題ある点が共通＝穏やかな代替軸が必要な場合はPHA（ポリヒドロキシ酸）・マンデル酸（敏感肌AHA代替）・乳酸低濃度（5%）+保湿剤併用の組み合わせです。',
    },
    {
      q: '効果が出るまでどのくらい？評価のタイミングは？',
      a: '【グリコール酸】4-12週で皮膚スコア改善評価が論文上（Smith 1996 12週RCT・Bernstein 2001 高濃度ピーリング短期RCT）。\n\n家庭用5-10%濃度は週2-3回×12週で皮膚テクスチャー・色素沈着・しわ改善評価。\n\n医療用ケミカルピーリング（30-70%）は皮膚科医療判断で1-2週おきに3-6回コースが標準です。【乳酸】8-12週で保湿+バリア改善評価（Berardesca 1989 RCT 3ヶ月で皮膚水分量改善・Smith 1996 12%×2週でしわ改善）。\n\n5-10%濃度の毎日使用 or 週3-4回継続使用で皮膚水分量・バリア機能改善が現実解です。【両者併用】12週評価+皮膚スコア記録（テクスチャー・色素沈着・しわ・乾燥度・刺激度・赤みの主観評価）が現実的フィードバック設計、改善なければ①濃度上げる（5%→10%→15%）／②頻度上げる（週2回→週3回→毎日）／③医療用ピーリングを皮膚科で検討／④原因軸再評価（紫外線対策不足・スキンケア習慣・睡眠・栄養・甲状腺機能・更年期ホルモン変化）が次の段階。\n\n深い色素沈着・肝斑・後天性メラノサイトーシス・光老化は皮膚科の領域（外用ハイドロキノン・トラネキサム酸内服・QスイッチYAGレーザー・ピコレーザー等の医療領域）でサプリ・化粧品は補助という前提が妥当な範囲です。',
    },
  ],
  'ceramide-vs-panthenol': [
    {
      q: 'セラミドとパンテノールの違いは？',
      a: '作用機序と最適な対象が完全に異なる補完関係です。\n\nセラミドは皮膚角質層細胞間脂質の主成分で。\n\nLoden 1997 Acta Derm Venereol RCT セラミド配合保湿剤×3週で皮膚水分量・バリア機能改善・日本皮膚科学会アトピーガイドライン2021でヘパリン類似物質と並ぶ第一選択保湿剤として推奨されています。\n\n経口セラミドはTanaka 2014 J Dermatol Sci RCT 米由来0.6-1.2mg/日×4週でTEWL改善+皮膚水分量改善が中心エビデンスです。\n\nパンテノール（プロビタミンB5・D-パンテノール）は皮膚内でパントテン酸（ビタミンB5）に変換されてコエンザイムA合成・脂質代謝＋角質層への高い水分結合能＋創傷治癒促進の3経路。\n\nMarona 1998/Ebner 2002 レビュー（創傷治癒+抗炎症）・Proksch 2017 J Eur Acad Dermatol Venereol RCT 5%パンテノール×8週で皮膚バリア機能改善が中心エビデンスです。\n\n役割分担＝セラミド=角質層脂質補完・構造修復／パンテノール=創傷治癒+鎮静+保湿の多機能で。\n\n朝パンテノール+夜セラミドの使い分けまたは同一製剤併存（La Roche-Posay Cicaplast Baume B5）を組み立てた流れです。',
    },
    {
      q: '外用セラミドと経口セラミドどちらが効く？',
      a: '両者は経路独立で併用合理＝外用=即時保湿+物理的バリア補完（角層へ直接到達）／経口=体内ベースで皮膚水分量改善（Tanaka 2014 4週RCT根拠）の二刀流で。\n\n敏感肌・アトピー・乾皮症の根本対策には外用が主軸・経口は補助が無難な順番です。\n\n経口セラミド＝Tanaka 2014 RCT 米由来0.6-1.2mg/日×4週でTEWL改善+皮膚水分量改善・Bissett 2015 J Cosmet Dermatol RCT 経口米由来セラミドで皮膚バリア機能改善・コラーゲンペプチドと並ぶ経口美容サプリの代表成分（Tachibana 2008 経口セラミドの皮膚到達経路確立）で、明治アミノコラーゲンPLUSセラミド・ライオン リフロイド・Now Foods Ceramide-PCD等が市販されています。\n\n化粧品メーカー視点＝外用が主軸・経口は補助で、敏感肌・アトピー・乾皮症の根本対策には外用ヒト型セラミド+ヘパリン類似物質+パンテノール+ステロイド・タクロリムス処方薬（皮膚科専門治療）の階層の入り方です。',
    },
    {
      q: 'ヒト型セラミドと植物由来セラミドの違いは？',
      a: '「セラミド配合」訴求は化粧品業界で乱用されている点が論文上で重要です。\n\n①セラミド多型（1/2/3/4/5/6/9/AS/NS/NP/AP/EOS等の十数種類）の含有比率・含有量明示がないと効果不確実。\n\n③植物由来コンセプト品（米セラミド・コンニャクセラミド・大豆セラミド・ユズ種子由来）は規格バラつきありでセラミド分子の経口吸収→皮膚到達経路は確立されている（Tachibana 2008）ものの外用効果はヒト型ほど確立していません。\n\n④「セラミド類似体（疑似セラミド）」は構造類似だが化学的に異なる（Ucerin等のヘパリン類似物質と類似のポジショニング）。\n\n確認指標＝①INCI名（Ceramide AP/NP/NS/EOS等のヒト型表記）、②セラミド○mg or ○%表記（規格明示品）、③日本皮膚科学会アトピーガイドライン2021でセラミド配合保湿剤推奨を満たす品質規格、④ヘパリン類似物質配合品（Curel・ヒルマイルド・Mediplus等）はセラミドと併用合理でアトピー素因・乾皮症の実用的な選択肢です。',
    },
    {
      q: 'セラミド・パンテノールの併用注意は？',
      a: '両者ともほぼ全成分と相性良く併用問題なしが独占特徴です。【セラミド】全成分との併用合理＝外用ステロイド・タクロリムスとの併用合理（バリア補完+抗炎症の補完関係）・経口セラミドはほぼ副作用なし（食経験ベース）・小麦アレルギー既往は小麦由来セラミド回避・米由来セラミドは安全プロファイル良好です。【パンテノール】ほぼ全成分との併用合理で外用ステロイド・タクロリムスとの併用合理。\n\n極稀にパンテノール接触皮膚炎報告（パッチテスト陽性例）あり敏感肌は事前パッチテスト推奨。\n\n経口パントテン酸（ビタミンB5）大量で稀に下痢・消化器症状ですが通常用量で問題なし、両者妊娠中授乳中ほぼ安全領域（経口イソトレチノイン・外用レチノール禁忌の代替軸として活躍）です。\n\n敏感肌・アトピー・乾皮症の段階的導入＝①低刺激クレンジング+保湿（界面活性剤・香料・アルコール最小限）→②ヘパリン類似物質 or ヒト型セラミド配合保湿剤で物理的バリア補完→③パンテノール（CICA/Bepanthen系）で鎮静・創傷治癒補助→④ナイアシンアミド5%でセラミド合成内在性促進（Tanno 2000機序）の4段階が無難な順番です。\n\n「アトピーが治る」「皮膚バリアが完璧に修復」断定NG→「皮膚水分量・TEWL・バリア機能の改善が報告」型統一が薬機法整合的です。',
    },
    {
      q: '効果が出るまでどのくらい？評価のタイミングは？',
      a: '【外用セラミド】1-3週で即時保湿効果評価（Loden 1997 RCT 3週で皮膚水分量改善）、敏感肌・アトピー・乾皮症は継続使用で皮膚バリア状態維持が用途で長期使用想定（症状再燃時のリリーフ→寛解維持）。【経口セラミド】4週で皮膚水分量改善評価（Tanaka 2014 RCT 4週）。\n\nコラーゲンペプチドと並ぶ累積効果型で12週継続で本格評価を踏まえた進め方です。【パンテノール】1-4週で鎮静+保湿効果評価（Proksch 2017 8週RCT 皮膚バリア改善・敏感肌赤み・創傷治癒の即時的鎮静効果は1-2週で体感可能）。【併用】4-12週評価+皮膚スコア記録（水分量・TEWL・赤み・乾燥・かゆみ・刺激度の主観評価）が無難フィードバック設計、改善なければ①ヘパリン類似物質追加（Curel・ヒルマイルド・Mediplus等）／②外用ステロイド短期使用（皮膚科処方）／③タクロリムス外用（皮膚科処方）／④経口セラミド0.6-1.2mg/日追加／⑤原因軸再評価（アトピー素因・接触性皮膚炎・酒さ診断・脂漏性皮膚炎診断→皮膚科受診）が次の段階。\n\nアトピー性皮膚炎・酒さ・脂漏性皮膚炎・乾癬は皮膚科の領域（外用ステロイド・タクロリムス・JAK阻害薬外用デルゴシチニブ・抗炎症処方薬）でサプリ・化粧品は補助という前提が妥当な範囲です。',
    },
  ],
  'myo-inositol-vs-zinc': [
    {
      q: 'ミオイノシトールと亜鉛の違いは？',
      a: '作用機序と最適な対象が完全に異なる補完関係です。\n\nミオイノシトールはビタミンB群類縁体で細胞内セカンドメッセンジャー（イノシトールトリスリン酸IP3経路）として卵巣のインスリンシグナル伝達に関与。\n\nUnfer 2017 Eur Rev Med Pharmacol Sci メタ解析でMyo-inositol 2g×2/日でPCOSインスリン感受性・卵巣機能改善が報告されています。\n\n亜鉛は300以上の酵素補因子として作用し、特に5α-リダクターゼ阻害（テストステロン→DHT変換抑制）・抗酸化（SOD補因子）・タンパク質合成・創傷治癒・免疫に関与。\n\nTepaamorndech 2017 Eur J Nutrでテストステロン代謝関連が報告されています。\n\n作用ターゲットがインスリンシグナル経路（イノシトール）vs ホルモン代謝・酵素経路（亜鉛）で完全独立で。\n\nPCOS・インスリン抵抗性・卵巣機能関連→ミオイノシトール／ニキビ・男性ホルモン関連・男性型脱毛・創傷治癒→亜鉛の使い分けの段階、両者は経路独立で併用合理です。',
    },
    {
      q: 'PCOSにはミオイノシトールと亜鉛どっち？',
      a: 'PCOS診断（多嚢胞性卵巣症候群）は婦人科の診断領域でロッテルダム基準（①稀発月経・無月経 ②高アンドロゲン血症 ③多嚢胞性卵巣 のうち2項目以上）に基づき婦人科・生殖医療科で診断・治療方針決定の入り方、サプリは補助レイヤーです。\n\nミオイノシトール優先＝Unfer 2017 メタ解析でインスリン感受性・排卵機能・FSH/LH比改善報告。\n\nMyo-inositol vs D-chiro-inositol 40:1 比はNIH/Roseff 2002 標準推奨（D-chiro 単独高用量はPCOSで逆効果のエビデンスあり）、用量はMyo-inositol 2g×2/日（朝晩）+ Folic Acid 400μg/日が論文用量再現です。\n\n亜鉛は補助＝Foroozanfard 2015 J Reprod Med RCTで亜鉛50mg/日でホルモン・脂質プロファイル改善報告ありますがインスリン抵抗性軸ではミオイノシトール主軸、亜鉛はニキビ併発・男性型脱毛併発・脂質代謝補助のサブ軸として位置づけが王道です。\n\n「PCOSが治る」「不妊が治る」断定は薬機法/景表法NG→「インスリン感受性・卵巣機能の改善が報告」型統一。\n\nメトホルミン処方・クロミフェン排卵誘発・ゴナドトロピン・体外受精は生殖医療科の専門治療領域で第一選択、サプリは医師相談前提の補助です。',
    },
    {
      q: 'ミオイノシトール 2g×2/日 と亜鉛の用量・形態の選び方は？',
      a: 'ミオイノシトール用量＝Myo-inositol 2g×2/日（朝晩）合計4g/日が論文用量再現（Unfer 2017 メタ解析準拠）。\n\nMyo-inositol : D-chiro-inositol = 40 : 1 比がNIH/Roseff 2002 標準推奨でInofolic Plus（Lo.Li. Pharma）・Now Foods Inositol Pure Powder・Doctor\'s Best Myo-Inositol等の規格明示品が現実的。\n\nD-chiro-inositol 単独高用量品はPCOSで逆効果の可能性（Roseff 2002）で40:1比維持が論文上。\n\n亜鉛用量＝10-30mg/日が現実的維持用量（日本推奨量 男性11mg・女性8mg/日）、短期介入は最大50mg/日（Foroozanfard 2015）。\n\n長期高用量（40mg/日超×6ヶ月超）は銅欠乏リスクで亜鉛:銅 = 10-15 : 1 比維持が必須、形態別＝亜鉛ピコリネート（Now Foods Zinc Picolinate 50mg・吸収率高）・亜鉛グリシネート（Albion Ferrochel系・胃腸障害低・キレート型）・亜鉛グルコン酸（コスパ良・市販一般）でピコリネート or グリシネートが論文用量再現に推奨、酸化亜鉛は吸収率低く非推奨です。\n\n両者は経路独立で併用合理、亜鉛は食事と離す（カルシウム・鉄・ファイテン酸・コーヒー・お茶で吸収阻害）。\n\nミオイノシトールは食前か空腹時が無難タイミングです。',
    },
    {
      q: 'ミオイノシトール・亜鉛の併用注意は？',
      a: '併用注意6領域を整理した内容です。【ミオイノシトール】①糖尿病薬（メトホルミン・SU薬・GLP-1作動薬・SGLT2阻害薬・インスリン）併用は低血糖傾向（インスリン感受性改善の重複作用）で用量・タイミング医師相談必須、②妊娠中・授乳中は葉酸併用前提（Inofolic Plusはミオイノシトール+葉酸配合）で胎児神経管閉鎖障害予防補助エビデンスあり（Cavalli 2008・Greene 2009）、産科医相談前提、③稀に胃腸障害（軟便・ガス）が高用量で発現、低用量開始（1g/日→2g/日→4g/日）が推奨。【亜鉛】①長期高用量（40mg/日超×6ヶ月超）で銅欠乏リスク（貧血・神経症状・免疫低下）→亜鉛:銅 = 10-15 : 1 比維持。\n\n②テトラサイクリン系・フルオロキノロン系抗菌薬・ビスホスホネート・ペニシラミンと併用で吸収阻害（時間分離2-4時間）。\n\n③免疫抑制状態（HIV/AIDS・化学療法中）は腫瘍内科判断。\n\n④妊娠中は推奨量範囲（8-11mg/日）で高用量回避。\n\n⑤男性高用量長期（100mg/日超）で前立腺がんリスク報告（Leitzmann 2003 J Natl Cancer Inst）あり用量管理必須、⑥空腹時亜鉛で吐き気の報告あり食事中・食後摂取推奨です。\n\n「PCOSが治る」「不妊が治る」断定NG→「インスリン感受性・卵巣機能・ホルモンプロファイルの改善が報告」型統一が薬機法整合的。\n\n婦人科・生殖医療科・内分泌内科の診断・処方治療が第一選択でサプリは補助という前提が妥当な範囲です。',
    },
    {
      q: '効果が出るまでどのくらい？評価のタイミングは？',
      a: '【ミオイノシトール】8-12週で評価が論文上（Unfer 2017 メタ解析の介入期間平均8-12週・インスリン抵抗性HOMA-IR改善・月経周期改善・排卵率改善・FSH/LH比改善が主要評価指標）、6ヶ月継続で本格評価の組み立て、PCOS診断ベースの治療では婦人科で月経周期・基礎体温・経腟超音波・血液検査（FSH/LH/E2/T/AMH）の定期評価が必須です。【亜鉛】8-12週で評価（血清亜鉛値65-110μg/dL の維持・ニキビ評価4-12週・男性ホルモン関連評価8-16週）。\n\n長期介入（6ヶ月超）は血清銅・セルロプラスミン値も評価が必須で銅欠乏監視。【両者併用】12週評価+症状記録（月経周期・PCOS症状・ニキビ・体重・インスリン抵抗性・血液検査値）が王道フィードバック設計、改善なければ①婦人科・生殖医療科再受診（メトホルミン処方検討・排卵誘発剤検討）／②内分泌内科（糖尿病・甲状腺機能・副腎疾患の鑑別）／③原因軸再評価（睡眠・運動・体重管理・ストレス・甲状腺機能低下症・クッシング症候群の除外）／④Inofolic Alpha（Myo-inositol + α-リポ酸配合）等の上位処方検討が次の段階。\n\nPCOS・不妊・無月経・希発月経・高アンドロゲン血症は婦人科・生殖医療科の診断・処方治療が第一選択（メトホルミン・クロミフェン・ゴナドトロピン・GnRHアゴニスト・体外受精）でサプリは医師相談前提の補助という前提が妥当な範囲です。',
    },
  ],
  'probiotics-vs-beta-glucan': [
    {
      q: 'プロバイオティクスとβ-グルカンの違いは？',
      a: '作用機序と最適な対象が完全に異なる補完関係です。\n\nプロバイオティクスは ISAPP公式定義 Hill 2014 Nat Rev Gastroenterol Hepatol「適量投与で宿主に健康利益をもたらす生きた微生物」で腸内菌叢補充による腸内環境改善（L. plantarum 299v IBS Niedzielin 2001・LGG 抗菌薬関連下痢予防 Hempel 2012 JAMA メタ解析・BB-12 便秘 Eskesen 2015・L. reuteri DSM 17938 乳児コリック Sung 2018 Pediatrics メタ等の株別エビデンス）です。\n\nβ-グルカンは多糖類でデクチン-1受容体（マクロファージ・好中球・樹状細胞・NK細胞表面）に結合して自然免疫調整シグナルを引き起こす（Akramienė 2007 Medicina 機序レビュー・Vetvicka 2014 J Glycomics Lipidomics レビュー）、抗原性提示促進・サイトカイン産生調整・貪食作用増強の3経路です。\n\n作用経路が腸内菌叢補充（プロバイオ） vs 自然免疫調整（β-グルカン）で完全独立で「比較」より「併用」が論文上。\n\n腸内環境改善→プロバイオ／免疫サポート→β-グルカンの使い分けの入り方です。',
    },
    {
      q: 'β-グルカンは酵母・キノコ・大麦で何が違う？',
      a: 'β-グルカンは起源で3系統に分かれ作用が異なる点が独占的整理軸です。\n\n①酵母β-グルカン（Yestimun®/Wellmune®）= β-1,3/1,6結合構造でSaccharomyces cerevisiae由来。\n\nTalbott 2010 J Am Coll Nutr Wellmune RCTで風邪期間短縮・スポーツアスリート上気道感染症リスク低下が報告、免疫サポート訴求の中心エビデンス。\n\n②キノコβ-グルカン（マイタケD-fraction・霊芝・冬虫夏草・AHCC）= β-1,3/1,6結合構造でNanba 1995/Konno 2002 等のヒト試験で免疫調整・補助療法研究。\n\n癌補助療法領域（補完代替医療）でも研究蓄積あり（HuangAHCC研究他）が第一選択は腫瘍内科の標準治療でサプリは補助。\n\n③大麦・オーツ麦β-グルカン= β-1,3/1,4結合構造でFDA cardiovascular health claim（1日3g以上で血中コレステロール低下）・EFSAヘルスクレーム認可。\n\nOthman 2011 Nutr Rev メタ解析でLDLコレステロール低下が報告、コレステロール低下訴求の主軸です。\n\n起源別の使い分け＝免疫サポート→酵母β-グルカン（Wellmune®規格明示品）／補助療法・健康維持→キノコβ-グルカン（規格明示品AHCC・霊芝抽出物）／コレステロール低下→大麦・オーツ麦β-グルカン（食事+サプリ）が現実的。\n\n「β-グルカン」一括りで論じるのは論文ベース誤りです。',
    },
    {
      q: 'プロバイオティクスはどの株を選ぶべき？「乳酸菌1,000億個」訴求は信頼できる？',
      a: 'プロバイオティクスは株単位でエビデンスが異なる点が独占的整理軸で。\n\n「乳酸菌1,000億個」「乳酸菌1兆個」訴求は株名なしで論文ベース評価不能です。\n\n株別エビデンス＝①L. plantarum 299v Niedzielin 2001 IBS下痢腹痛改善RCT。\n\n②Lactobacillus rhamnosus GG (LGG) Hempel 2012 JAMA メタ解析で抗菌薬関連下痢予防・Vandenplas 2017 小児急性胃腸炎。\n\n③Bifidobacterium animalis BB-12 Eskesen 2015 便秘改善RCT。\n\n④L. reuteri DSM 17938 Sung 2018 Pediatrics メタで乳児コリック改善。\n\n⑤L. casei Shirota株（ヤクルト1000） 国内コホート研究・ストレス軽減・睡眠改善訴求。\n\n⑥L. delbrueckii subsp. bulgaricus OLL1073R-1（明治R-1） 国内研究で免疫サポート訴求です。\n\n国内流通の現実的選択＝ヤクルト1000（Shirota株）・明治R-1（1073R-1株）・森永LKM512・伊藤園緑茶+ガセリ菌SBT2055・新ビオフェルミンS（複合菌）は株名明示で妥当。\n\niHerb海外ブレンド（Now Foods Probiotic-10/Renew Life Ultimate Flora）は10株複合で広域カバーが王道です。\n\n「乳酸菌1,000億個」訴求のCFU数だけでは効果保証なし＝株名・株別エビデンス・摂取期間（4-8週で評価）・腸内到達生存性（耐酸性カプセル・タイミング）の4軸が無難評価指標です。',
    },
    {
      q: 'プロバイオ・β-グルカンの併用注意は？',
      a: '併用注意4領域を組み立てた流れです。【プロバイオティクス】①🚨免疫抑制状態（HIV/AIDS・癌化学療法中・臓器移植後・重症免疫不全症候群・好中球減少症）は菌血症（lactobacillemia・bifidobacteremia）リスクで腫瘍内科・血液内科・感染症科判断必須、特に中心静脈カテーテル留置例で菌血症報告あり。\n\n②急性膵炎では PROPATRIA試験 2008 Lancet で死亡率増加報告で禁忌寄り。\n\n③重症急性胃腸炎は脱水補正・電解質補正が第一選択でサプリ補助。\n\n④抗菌薬服用中は2-3時間時間分離が王道タイミング。【β-グルカン】①🚨酵母由来β-グルカンは酵母アレルギー禁忌（Saccharomyces cerevisiae感作例・パン酵母感作例で稀にアナフィラキシー報告）。\n\n②潰瘍性大腸炎・クローン病活動期は β-グルカンの免疫刺激が悪化要因の可能性で消化器内科判断必須。\n\n③自己免疫疾患（関節リウマチ・SLE・乾癬・橋本病・バセドウ病等）の活動期は免疫過剰反応リスクでリウマチ・膠原病内科相談前提。\n\n④癌化学療法・放射線療法中は腫瘍内科判断でβ-グルカン単独治療は禁忌寄り（標準治療補助レイヤーのみ）。\n\n⑤臓器移植後免疫抑制剤服用中（タクロリムス・シクロスポリン・ミコフェノール酸モフェチル）は感染症科・移植外科判断です。\n\n両者ともに「免疫力アップ」「腸活で病気予防」「免疫力を高める」断定は薬機法/景表法NG→「免疫機能・腸内環境・腸内菌叢バランスの改善が報告」型統一が整合的。\n\n潰瘍性大腸炎・クローン病・重症IBS・C.difficile感染症・SIBO疑い・大腸ポリープ・大腸がんは消化器内科診断+処方治療が第一選択でサプリは補助という前提が妥当な範囲です。',
    },
    {
      q: '効果が出るまでどのくらい？評価のタイミングは？',
      a: '【プロバイオティクス】4-8週で評価が論文上（L. plantarum 299v IBS 4週評価・LGG 抗菌薬関連下痢予防 抗菌薬服用中-終了後2週・BB-12 便秘 4週・L. reuteri DSM 17938 乳児コリック 21日・ヤクルト1000 4-8週）。\n\n症状記録（便通頻度・便性状ブリストル便分類・腹痛・腹部膨満・ガス・睡眠の質・ストレス感）が現実的フィードバック設計。\n\n中止すると4-8週で腸内菌叢が元に戻るため継続使用想定が論文上の現実です。【β-グルカン】4-12週で評価（Talbott 2010 Wellmune 風邪期間短縮 4週・Othman 2011 大麦β-グルカン LDL低下 4-12週・Akramienė 2007 機序レビュー）。\n\n免疫サポート評価は風邪頻度・上気道感染症罹患期間・主観的体調維持・血液検査（CRP・白血球分画）。\n\nコレステロール低下評価は血液検査LDL・HDL・TG・総コレステロール 12週評価が無難指標です。【両者併用】8-12週評価+症状記録（腸内環境・免疫・体調・血液検査値）が王道フィードバック設計、改善なければ①消化器内科受診（IBS・SIBO・潰瘍性大腸炎・クローン病・C.difficile感染症・大腸ポリープ・大腸がんの鑑別）／②循環器内科（高コレステロール血症ならスタチン処方検討・大麦β-グルカンは食事補助）／③感染症科・免疫内科（免疫機能評価）／④原因軸再評価（食事繊維不足・運動不足・睡眠・ストレス・抗菌薬使用歴・PPI長期使用）／⑤腸内菌叢検査（マイキンソー等の便検査で個別最適化）が次の段階。\n\n潰瘍性大腸炎・クローン病・重症IBS・C.difficile感染症・大腸がん・自己免疫疾患・免疫不全症候群は専門内科診断+処方治療が第一選択でサプリは医師相談前提の補助という前提が妥当な範囲です。',
    },
  ],
  'retinol-vs-retinal': [
    {
      q: 'レチノールとレチナールの違いは？',
      a: '変換工程数と効果発現速度が異なる補完関係です。\n\nレチノール（ビタミンA1・Retinol）は皮膚内2段階変換＝レチノール→レチナール→レチノイン酸（活性型RAR/RXR結合）で効果発現に時間が必要。\n\nレチナール（レチンアルデヒド・Retinaldehyde）は1段階変換＝レチナール→レチノイン酸で効果発現速度がレチノールより速い（Saurat 1994 J Invest Dermatol/Sigler 2009 J Drugs Dermatol RCT 0.05%レチナール×3ヶ月でしわ改善が報告）。\n\n両者ともRAR/RXR経由でターンオーバー促進・コラーゲン産生・色素沈着抑制の3経路ですが、変換工程数が少ない=効果発現速度速い+ややある程度の刺激リスクでレチナールはレチノールとトレチノイン（活性型）の中間的位置づけ。\n\n敏感肌の出発点としてレチノール0.1-0.5%→レチナール0.05-0.1%→トレチノイン0.025-0.1%（処方）の段階性の流れです。',
    },
    {
      q: 'レチノール・レチナール・トレチノインの強さ・選び方は？',
      a: 'ビタミンA誘導体の強さ階層＝①レチノールエステル（パルミチン酸レチノール・酢酸レチノール）= 最弱で変換3段階（エステル→レチノール→レチナール→レチノイン酸）、初心者・敏感肌向け、②レチノール= 中（Kafi 2007 Arch Dermatol RCT n=36 0.4%×24週でしわ・色素沈着改善が報告・Kligman 1986古典〜数百本RCT累積）、③レチナール= 中強（Sigler 2009 RCT 0.05%×3ヶ月でしわ改善・変換1段階で効果発現速度速い）。\n\n④トレチノイン（all-trans Retinoic Acid・Retin-A）= 最強（RAR/RXR直接結合・活性型・処方薬・Weiss 1988 JAMA RCT 0.05%×16週でしわ・色素沈着・光老化改善・刺激リスク最大）。\n\n⑤アダパレン（第3世代）= 中強（処方OTC・Differin 0.1%が日本で第2類医薬品ディフェリン®）。\n\n⑥タザロテン（処方薬）= 最強（米国処方）。\n\n選び方＝初心者・敏感肌→レチノールエステル or 低濃度レチノール0.1-0.25%週2-3回→慣れたらレチノール0.5-1.0%毎日→刺激耐性ある層はレチナール0.05-0.1%→処方トレチノイン0.025-0.1%段階導入が無難な順番。\n\nThe Ordinary Retinol 0.5%/Granactive Retinoid 2%・La Roche-Posay Pure Vitamin A Pure Retinol/Avibon Retinaldehyde 0.05%（仏処方）・国内ディフェリン® アダパレン0.1%（皮膚科処方）が市販主流です。',
    },
    {
      q: 'レチノール・レチナールの夜のみ使用ルール・併用NG成分は？',
      a: 'ビタミンA誘導体は夜のみ使用が現実的絶対ルールです。\n\n理由＝①光分解（紫外線でレチノール→7,8-dihydroretinol/レチナール→不活性体に分解）で日中効果激減。\n\n②光感作で日中SPF30+ PA+++必須（皮膚バリア低下中の紫外線対策必須）。\n\n③ターンオーバー促進で角質剥離→紫外線感受性増加で炎症性色素沈着リスク。\n\n併用NG・時間分離必須6領域＝①AHA/BHA（グリコール酸・乳酸・サリチル酸）と同時刺激重畳で時間分離（朝AHA/夜レチノール or 朝レチノール/夜AHA・週交互推奨）。\n\n②ベンゾイルペルオキシド（BPO・処方ニキビ薬）と同時使用でレチノール酸化失活＋刺激重畳で時間分離。\n\n③ビタミンC（外用・特にL-アスコルビン酸）は理論的に酸化還元競合・刺激重畳で時間分離（朝VC/夜レチノール）。\n\n④🚨経口イソトレチノイン（アキュテイン・ロアキュタン）服用中は外用レチノール禁忌（過剰ビタミンA毒性リスク）。\n\n⑤🚨妊娠中・妊娠計画中・授乳中はレチノール・レチナール・トレチノイン・タザロテン禁忌（催奇形性報告ACOG 2024 guidance）→ナイアシンアミド5%+VC15%+パルミトイルトリペプチドの代替軸。\n\n⑥敏感肌・酒さ・脂漏性皮膚炎・アトピー素因はパッチテスト推奨で初使用前24-48時間反応確認。\n\n「シミが消える」「肌が生まれ変わる」「若返る」断定NG→「皮膚スコア改善が報告」型統一が薬機法整合的。\n\n深いしわ・光老化・肝斑は皮膚科の領域（処方トレチノイン・ハイドロキノン・トラネキサム酸内服・QスイッチYAGレーザー・ピコレーザー等の医療領域）でサプリ・化粧品は補助という前提が妥当な範囲です。',
    },
    {
      q: 'レチノール・レチナールの敏感肌・初心者の段階的導入は？',
      a: '段階的導入5ステップを踏まえた進め方です。\n\n【ステップ1】1-2週＝低刺激クレンジング+保湿（セラミド・ヒアルロン酸・パンテノール）でバリア機能補完。\n\nナイアシンアミド5%でセラミド合成内在性促進（Tanno 2000機序）、レチノール導入前の基盤作り。\n\n【ステップ2】2-4週＝レチノールエステル（パルミチン酸レチノール・酢酸レチノール）or 低濃度レチノール0.1-0.25%週2-3回夜のみで慣らし、サンドイッチ法（保湿→レチノール→保湿）で刺激リスク軽減。\n\n赤み・乾燥・剥離は2-4週で慣れる（regression期）。\n\n【ステップ3】4-8週＝慣れたらレチノール0.5%毎日 or 週5回、継続使用で安定期、皮膚スコア記録（テクスチャー・色素沈着・しわ・刺激度・赤みの主観評価）。\n\n【ステップ4】8-12週＝刺激耐性ある層はレチノール1.0% or レチナール0.05-0.1%へ段階アップ。\n\n【ステップ5】12週以降＝評価+次のステップ＝深いしわ・光老化・肝斑・色素沈着が改善不足なら①皮膚科で処方トレチノイン0.025-0.1%検討／②アダパレン0.1%（ディフェリン®）処方／③ハイドロキノン4%併用（皮膚科処方）／④QスイッチYAGレーザー・ピコレーザー医療処置検討が次の段階。\n\n🚨レチノール・レチナールは妊娠中・妊娠計画中・授乳中禁忌（催奇形性報告ACOG 2024 guidance）→ナイアシンアミド5%+VC15%+パルミトイルトリペプチドの3軸代替が無難な選び方。\n\n酒さ・脂漏性皮膚炎・アトピー素因は皮膚科の領域でサプリ・化粧品は補助です。',
    },
    {
      q: '効果が出るまでどのくらい？評価のタイミングは？',
      a: '【レチノール】12-24週で本格評価が論文上（Kafi 2007 Arch Dermatol RCT 0.4%×24週で深いシワ・色素沈着・キメ改善・Kligman 1986古典〜数百本RCT累積で論文蓄積最厚）。\n\n最初の4-8週は刺激期（赤み・乾燥・剥離・小ニキビ）で慣れる期間、8-12週で初期効果体感（肌のキメ・くすみ感）、12-24週で本格効果（しわ・色素沈着改善）の目安。【レチナール】8-12週で評価（Sigler 2009 J Drugs Dermatol RCT 0.05%×3ヶ月でしわ改善・変換1段階で効果発現速度速い）、レチノールより4-8週早く効果体感可能、ただし刺激リスクもややある程度大きい。【両者共通】12週評価+皮膚スコア記録（テクスチャー・色素沈着・しわ・乾燥度・刺激度・赤み・キメの主観評価）が無難フィードバック設計、改善なければ①濃度上げる（0.1%→0.25%→0.5%→1.0%）／②頻度上げる（週2-3回→毎日）／③レチナール段階アップ（0.05%→0.1%）／④皮膚科で処方トレチノイン0.025-0.1%検討／⑤アダパレン0.1%（ディフェリン®）処方／⑥原因軸再評価（紫外線対策不足・スキンケア習慣・睡眠・栄養・甲状腺機能・更年期ホルモン変化）が次の段階。\n\n深いしわ・光老化・肝斑・後天性メラノサイトーシスは皮膚科の領域（外用トレチノイン・ハイドロキノン・トラネキサム酸内服・QスイッチYAGレーザー・ピコレーザー等の医療領域）でサプリ・化粧品は補助という前提が妥当な範囲です。',
    },
  ],
  'tmg-vs-nmn': [
    {
      q: 'TMGとNMNの違いは？',
      a: '作用機序と最適な対象が異なる補完関係です。\n\nTMG（トリメチルグリシン・ベタイン・Betaine）はメチオニン回路でホモシステイン低下のメチル供与体として作用。\n\nOlthof 2003 Am J Clin Nutr RCT TMG 6g/日でホモシステイン17%低下が報告、心血管リスク低減の介入軸として位置づけ。\n\nNMN（ニコチンアミドモノヌクレオチド）はNAD+前駆体でNAD+→サーチュイン活性化（SIRT1-7）・DNA修復酵素PARP活性化・ミトコンドリア機能維持に関与。\n\nYoshino 2021 Science RCT NMN 250mg/日×10週で筋骨格筋NAD+上昇・インスリン感受性改善が報告、抗老化・代謝改善の介入軸です。\n\n作用ターゲットがメチル化サイクル（TMG）vs NAD+代謝（NMN）で経路独立ですが、「メチル化サイクル」で接続する補完関係＝NMN代謝でメチル基消費（NAD+→NAM→MNA変換でSAMからメチル基供給必要）・TMGが補うため。\n\n抗老化サプリスタックでTMG+NMN併用の段階構成として位置づけられています。',
    },
    {
      q: 'NMN代謝でメチル基消費・TMGで補う論理は？',
      a: 'NAD+代謝とメチル化サイクルの接続が独占的整理軸です。\n\nNMN→NAD+→NAM（ニコチンアミド）→MNA（1-メチルニコチンアミド）変換でNNMT（ニコチンアミドN-メチルトランスフェラーゼ）酵素がSAM（S-アデノシルメチオニン）からメチル基を消費。\n\nSAMはメチオニン→ホモシステイン→メチオニン回路で再生。\n\nTMG（ベタイン）がBHMT（ベタイン-ホモシステインメチルトランスフェラーゼ）経由でホモシステイン→メチオニン変換を補うメカニズムです（Williams 2018 Mol Genet Metab レビュー・Brenner 2019 Nat Metab レビュー）。\n\nNMN単独高用量（500-1,000mg/日超）長期介入でホモシステイン値上昇懸念（理論的メチル基消費）に対し。\n\nTMG 500-1,500mg/日併用でメチル化サイクル維持の進め方、抗老化サプリスタックの安全策として位置づけられています。\n\nただしヒトRCTでNMN×TMG併用の長期安全性データは限定的で理論ベースの推奨領域。\n\n血液検査（ホモシステイン・葉酸・ビタミンB12）の定期評価が現実的なフィードバック指標です。\n\nSAM-e・葉酸・ビタミンB12との3軸補完関係も実用的＝メチル化サイクル全体（SAM・葉酸・B12・TMG）の維持が重要で。\n\nMTHFR遺伝子多型C677T 保有集団でメチル化能力低下の可能性があり、興味のある層は遺伝子検査検討領域です（「遺伝子検査が必須」断定NG・情報提供レイヤー）。',
    },
    {
      q: 'TMG・NMNの用量・形態・タイミングの選び方は？',
      a: 'TMG用量＝500-3,000mg/日が王道用量。\n\nOlthof 2003は6g/日で17%ホモシステイン低下ですが1.5-3g/日が現実的維持用量。\n\nNow Foods TMG 1,000mg・Doctor\'s Best TMG・Jarrow Formulas TMG等の規格明示品の組み合わせ、食事と一緒に1-2回分割摂取が論文上タイミング。\n\n朝食時 1.5g + 夕食時 1.5gが血中濃度安定。\n\nNMN用量＝250-500mg/日が現実的維持用量（Yoshino 2021 250mg/日 RCT準拠）。\n\n短期介入は500-1,000mg/日（Igarashi 2022 NPJ Aging 250mg/日 12週で歩行速度・握力改善）。\n\n朝食時 or 空腹時 1回摂取が論文上。\n\nニコチンアミドリボシド（NR）はNMNより吸収率高いメタ解析報告（Trammell 2016 Nat Commun）あり、NR代替もの選択肢。\n\n両者併用スタック＝朝食時 NMN 250-500mg + TMG 1,500mg / 夕食時 TMG 1,500mgの組み立て。\n\n抗老化サプリスタックではNMN+TMG+ビタミンB12+葉酸+α-リポ酸+CoQ10の組み合わせが論文上選択肢。\n\n月コスト目安 NMN ¥3,500-12,000 + TMG ¥1,500-3,000 = ¥5,000-15,000/月です。',
    },
    {
      q: 'TMG・NMNの併用注意は？',
      a: '併用注意6領域を整理した内容です。【TMG】①🚨化学療法・PARP阻害薬服用中はTMG用量医師相談（メチル化サイクル干渉の可能性・腫瘍内科判断）、②妊娠中・授乳中は標準的安全性データ限定で産科医相談前提、③腎機能低下例はTMG高用量で電解質バランス影響の可能性で医師相談。\n\n④稀に高用量で消化器症状（吐き気・下痢）。\n\n⑤葉酸・ビタミンB12との併用が無難（メチル化サイクル全体維持）。\n\n⑥MTHFR C677T 多型保有層で効果発現可能性（遺伝子検査は情報提供レイヤーで断定NG）。【NMN】①🚨化学療法・PARP阻害薬服用中はNMN avoid（腫瘍学会推奨・PMC10177531 pancreatic ductal adenocarcinoma進行促進動物試験・PMC11473484 SASP増強理論的リスク）。\n\n②がん既往・慢性炎症性疾患はcaution。\n\n③妊娠中・授乳中・小児は標準的安全性データなしでavoid、④腎機能低下例はNMN高用量で代謝負荷の可能性で医師相談。\n\n⑤抗凝固薬（ワルファリン）併用は理論的影響限定的だが定期INRモニター推奨。\n\n⑥稀に高用量で消化器症状・頭痛・睡眠の質変化。\n\n⑦長期高用量（1,000mg/日超）×6ヶ月超の安全性データ限定で標準維持用量250-500mg/日推奨。\n\n両者ともに「若返り」「不老」「アンチエイジング（断定）」「老化が止まる」断定NG（薬機法/景表法）→「NAD+上昇・ホモシステイン低下・歩行速度・握力・インスリン感受性改善が報告」型統一が整合的。\n\nヒトでの寿命延長確認サプリは現時点で1つも存在しない誠実な前提（マウスでの寿命延長はBaur 2006 Nature レスベラトロール/Mills 2016 Cell Metab NMN・ヒト大規模長期RCT未確立）が妥当な範囲です。',
    },
    {
      q: '効果が出るまでどのくらい？評価のタイミングは？',
      a: '【TMG】8-12週で評価が論文上（Olthof 2003 RCT 6週で17%ホモシステイン低下・Schwab 2002 ホモシステイン代謝改善 8週）。\n\n評価指標はホモシステイン値（基準値<10μmol/L・>15μmol/Lで高ホモシステイン血症・心血管リスク要因）・葉酸・ビタミンB12の血液検査値。\n\nメチル化能力低下のシグナル（高ホモシステイン血症・MTHFR多型保有）介入軸で6ヶ月継続で本格評価の段階構成。【NMN】8-12週で評価（Yoshino 2021 Science RCT 10週でインスリン感受性改善・Igarashi 2022 NPJ Aging 12週で歩行速度・握力改善・Yamane 2023 中年男性 12週で疲労感改善）。\n\n評価指標は主観的疲労感・体感エネルギー・血中NAD+値（マイキンソー等の検査キット）・ミトコンドリア機能関連バイオマーカー、12-24週で本格評価の進め方。【両者併用】8-12週評価+症状記録（疲労感・体感エネルギー・睡眠の質・運動能力・血液検査値）が王道フィードバック設計、改善なければ①血液検査でホモシステイン・葉酸・ビタミンB12・NAD+関連バイオマーカー評価／②専門外来（抗老化外来・アンチエイジング医療）相談／③用量調整（NMN 500-1,000mg/日へ増量・TMG 3g/日へ増量）／④原因軸再評価（睡眠・運動・栄養・カロリー制限・地中海食・ストレス・甲状腺機能・更年期ホルモン変化）／⑤生活軸介入が主軸が次の段階。\n\n「老化が止まる」「若返る」「寿命が延びる」断定NG→「NAD+上昇・ホモシステイン低下・歩行速度・握力・インスリン感受性・疲労感・体感エネルギーの改善が報告」型統一が薬機法整合的。\n\nヒトでの寿命延長確認サプリは現時点で存在しない誠実な前提が妥当な範囲です。',
    },
  ],
  'astaxanthin-vs-omega3': [
    {
      q: 'アスタキサンチンとオメガ3の違いは？',
      a: '作用機序が完全に異なる補完関係です。\n\nアスタキサンチンはヘマトコッカス藻由来カロテノイドで脂溶性抗酸化物質。\n\n脂質過酸化抑制・一重項酸素消去・スーパーオキシド消去の3経路でビタミンE（α-トコフェロール）の約500倍の一重項酸素消去能力（Kishimoto 2016 Mar Drugs レビュー・Naguib 2000 J Agric Food Chem）。\n\nTominaga 2017 Acta Biochim Pol RCT 6mg/日×12週で肌弾力・しわ・水分量改善が報告、化粧品メーカー視点では皮膚抗酸化サプリとして位置づけ。\n\nオメガ3（EPA/DHA）は必須脂肪酸で細胞膜構成成分＋抗炎症エイコサノイド（プロスタグランジンE3・ロイコトリエンB5・レゾルビン）産生。\n\nREDUCE-IT 2019 NEJM RCT n=8,179 EPA 4g/日×5年で心血管イベント25%減・JELIS 2007 Lancet Yokoyama等の心血管領域メガRCT蓄積。\n\n抗炎症・心血管・脳・神経の主軸サプリとして位置づけ。\n\n作用ターゲットが脂質過酸化抑制（アスタキサンチン）vs 抗炎症・細胞膜構成（オメガ3）で経路独立で併用合理。\n\n両者ともワルファリン INR影響注意が共通点です。',
    },
    {
      q: 'アスタキサンチン・オメガ3はどちらを先に？年代別の優先順位は？',
      a: '年代・目的別の使い分けが無難な順番です。\n\n【20-30代】＝オメガ3優先（REDUCE-IT 2019 NEJM RCT長期心血管予防・JELIS 2007 Lancet Yokoyama・日本人EPA/DHA摂取量低下傾向で食事ベース不足補完）、アスタキサンチンは肌対策補助（Tominaga 2017 RCTで肌弾力・しわ改善）。\n\n月コスト Nordic Naturals Ultimate Omega 2X ¥1,700 + Now Foods Astaxanthin 4mg ¥600 = 計¥2,300/月が現実的。\n\n【40-50代】＝両者併用主軸（抗炎症・心血管・脳・肌・抗酸化の多軸介入）。\n\nアスタキサンチン6-12mg/日×12週で肌弾力・しわ・水分量改善（Tominaga 2017）・オメガ3 EPA+DHA 1-2g/日で抗炎症（VITAL 2019 NEJM RCT n=25,871 CRP改善）。\n\n月コスト ¥2,300-4,000/月が現実解。\n\n【60代以上】＝オメガ3主軸（心血管・認知機能保護：MIDAS 2010 Alzheimers Dement DHA 900mg/日 24週で言語記憶改善・抗炎症・関節・骨密度の多軸メリット）、アスタキサンチンは抗酸化補助位置づけ。\n\n化粧品メーカー視点＝アスタキサンチン6mg/日×12週の肌対策エビデンスは限定的だが特異的（Tominaga 2017 Acta Biochim Pol RCT n=65・コラーゲンペプチド・経口セラミドと並ぶ経口美容サプリの代表成分として位置づけ）。\n\nオメガ3は経口美容より心血管・抗炎症・脳機能の主軸で経口美容の意図でオメガ3単独はROI低い現実的見解です。',
    },
    {
      q: 'アスタキサンチン・オメガ3の用量・形態・タイミングの選び方は？',
      a: 'アスタキサンチン用量＝4-12mg/日が現実的維持用量。\n\nTominaga 2017 RCT 6mg/日×12週で肌対策エビデンス。\n\nChoi 2011 Mol Nutr Food Res RCT 12mg/日×4週で皮脂分泌・皮膚バリア改善。\n\nPark 2010 Br J Nutr 2-8mg/日免疫マーカー改善。\n\nNow Foods Astaxanthin 4mg・Doctor\'s Best High Absorption Astaxanthin・Suntory アスタキサンチン等の規格明示品が王道。\n\nヘマトコッカス藻由来天然型（natural・全trans型）が論文用量再現で合成型（synthetic）は構造異性体比異なるため避ける、食事と一緒に摂取が脂溶性カロテノイド吸収最適タイミング（油脂と同時で吸収率向上）。\n\nオメガ3用量＝EPA+DHA 1-2g/日が無難維持用量（心血管2-4g/日（REDUCE-IT準拠）・抗炎症1-2g/日・脳機能900mg/日DHA）、形態別＝TG型（トリグリセリド型）= 吸収率高・自然な状態（Nordic Naturals Ultimate Omega 2X・Carlson Labs Elite Omega-3）。\n\nrTG型（再エステル化トリグリセリド型）= 高濃度+TG構造（Nordic Naturals ProOmega 2000・Sports Research Omega-3）。\n\nEE型（エチルエステル型）= 一部処方薬・吸収率やや低（イコサペント酸エチル・ロトリガ）。\n\n遊離脂肪酸型 FFA = 吸収率最高。\n\nTG型 or rTG型が論文用量再現に推奨、EPA：DHA比は目的別（心血管EPA優位・脳機能DHA優位・抗炎症両者）、食事と一緒に摂取で吸収率最大化。\n\n酸化・酸敗リスクで冷蔵保存・有効期限管理必須です。',
    },
    {
      q: 'アスタキサンチン・オメガ3の併用注意は？',
      a: '併用注意6領域を組み立てた流れです。【アスタキサンチン】①🚨ワルファリンとの併用caution（症例報告 PMC6495044 でアスタキサンチン×ワルファリンで INR上昇報告）でINRモニター・医師相談、②降圧薬caution（12mg/日以上で拡張期血圧低下メタ解析報告・降圧薬服用中で血圧低下増強の可能性）、③抗血小板薬caution（理論的影響限定的だが手術前1-2週間中止推奨）。\n\n④妊娠中・授乳中は標準的安全性データ限定で産科医相談前提。\n\n⑤稀に高用量（24mg/日超）で皮膚黄色化（β-カロテン様）報告あり用量管理、⑥カロテノイド吸収競合でβ-カロテン・ルテイン・ゼアキサンチンと併用時は時間分離 or 同時摂取（吸収量分散）。【オメガ3】①🚨ワルファリンとの併用monitor（INR延長の可能性でINRモニター・3g/日超では出血傾向）、②抗血小板薬caution（手術前1-2週間中止推奨）、③魚アレルギー禁忌（魚油由来）→藻類由来DHA（Algal DHA・ベジタリアン対応）代替軸（Nordic Naturals Algae Omega・Now Foods DHA-500 Algae）。\n\n④🚨3g/日超で出血傾向・心房細動誘発の可能性（VITAL試験で1g/日では心房細動誘発なしも高用量は注意）。\n\n⑤酸化・酸敗オイルの過剰摂取はかえって有害で冷蔵保存・有効期限管理・酸化試験合格品（IFOS認証等）選択、⑥妊娠中・授乳中は推奨（ACOG/AAP推奨でDHA 200-300mg/日妊娠中・胎児神経発達）でEPA優位品は要注意。\n\nEPA：DHA = 1:2 or DHA優位品が妊娠中推奨。\n\n両者ともに「血液サラサラ」「若返り」「アンチエイジング（断定）」断定NG（薬機法/景表法）→「肌弾力・しわ・水分量・心血管イベント・CRP・トリグリセリド改善が報告」型統一が整合的です。',
    },
    {
      q: '効果が出るまでどのくらい？評価のタイミングは？',
      a: '【アスタキサンチン】8-12週で評価が論文上（Tominaga 2017 Acta Biochim Pol RCT 6mg/日×12週で肌弾力・しわ・水分量改善・Choi 2011 RCT 12mg/日×4週で皮脂分泌・皮膚バリア改善・Park 2010 Br J Nutr 2-8mg/日 4-8週で免疫マーカー改善）。\n\n肌対策評価は皮膚スコア記録（テクスチャー・水分量・しわ・キメ・くすみ・刺激度の主観評価）、目的別評価指標＝①肌対策→12週評価／②目の疲労・調節機能→4-8週評価／③免疫サポート→4-8週評価／④運動パフォーマンス・抗酸化→4-8週評価の組み立て、長期使用想定で継続摂取で抗酸化状態維持が現実解。【オメガ3】12-24週で本格評価（REDUCE-IT 2019 NEJM RCT 5年介入・JELIS 2007 5年介入・VITAL 2019 5年介入の大規模長期RCT・短期は 4-8週で血中EPA/DHA上昇・8-12週でCRP・トリグリセリド改善評価）。\n\n評価指標は血液検査（中性脂肪・LDL・HDL・CRP・オメガ3 index）・心血管イベント長期予防。\n\n最低6ヶ月継続+毎年血液検査評価が王道フィードバック設計。【両者併用】8-12週評価+症状記録（肌弾力・しわ・水分量・体感エネルギー・血液検査値）が現実的フィードバック設計、改善なければ①血液検査でCRP・中性脂肪・LDL・HDL・オメガ3 index評価／②循環器内科・脂質代謝専門外来相談（高コレステロール血症・高トリグリセリド血症ならスタチン・フィブラート・EPA処方薬ロトリガ®/エパデール®検討）／③皮膚科相談（深いしわ・光老化・肝斑なら処方トレチノイン・ハイドロキノン・レーザー医療領域）／④原因軸再評価（紫外線対策不足・スキンケア習慣・睡眠・栄養・運動・甲状腺機能・更年期ホルモン変化）／⑤生活軸介入が主軸が次の段階。\n\n「血液サラサラ」「若返り」「アンチエイジング（断定）」断定NG→「肌弾力・しわ・水分量・心血管イベント・CRP・トリグリセリド・認知機能の改善が報告」型統一が薬機法整合的。\n\n心血管疾患・高コレステロール血症・高トリグリセリド血症・冠動脈疾患・脳卒中既往は循環器内科・脂質代謝専門外来の診断+処方治療が第一選択でサプリは医師相談前提の補助という前提が妥当な範囲です。',
    },
  ],
  // ── Session F Day 10 補完 v3 バッチ 2026-05-14（Day 11 13964d9 と3件先取り衝突回避→ユニーク貢献2件のみ補完ship） ────
  'hyaluronic-acid-vs-collagen-peptide': [
    {
      q: 'ヒアルロン酸とコラーゲンペプチドのどちらを優先すべき？',
      a: '両者経路独立で併用合理の段階構成の現実解です。\n\nヒアルロン酸（経口）はOe 2017 Clin Cosmet Investig Dermatol RCT 経口HA 120mg/日×12週で皮膚水分量改善・Kawada 2014 Nutr J メタ解析で皮膚水分量・小じわ改善・Sato 2002 J Cosmet Sci機序整理（経口HAペプチドが小腸吸収→皮膚到達→ヒアルロン酸合成促進）。\n\nコラーゲンペプチド（経口）はProksch 2014 Skin Pharmacol Physiol RCT n=114 Verisol® 2.5-5g/日×8週で皮膚弾力・水分量改善・Asserin 2015 J Cosmet Dermatol RCT n=106 Peptan® 10g/日×8週でしわ深さ改善・Inoue 2016 メタ解析一貫した改善方向。\n\n作用機序差＝ヒアルロン酸=皮膚水分量・小じわ改善（保湿経路）vs コラーゲンペプチド=皮膚弾力・しわ深さ改善（コラーゲン合成シグナル経路・Pro-Hyp/Hyp-Glyペプチド線維芽細胞活性化）で互いに補完関係、併用RCT（Czajka 2018 Nutr Res 経口HA+コラーゲン+VC+抗酸化複合配合RCTで皮膚弾力・水分量・しわ改善）も存在します。\n\n妥当併用設計＝経口HA 120-200mg/日+コラーゲンペプチド5-10g/日+VC 500-1,000mg/日（コラーゲン合成補因子・Pinnell 2003）×8-12週が王道スタックです。',
    },
    {
      q: '経口コラーゲンは「効かない」と言われた時代があったけど今は？',
      a: '「経口コラーゲンは分解されてアミノ酸になるだけ」評価は古いが論文上整理です。\n\n1980-2000年代の伝統的栄養学では「タンパク質は胃腸で消化→アミノ酸に分解→特定組織への選択的合成は起きない」評価が主流でしたが、2000年代以降の研究で書き換えられました。\n\nIwai 2005 J Agric Food Chemで経口コラーゲンペプチド摂取後の血漿中Pro-Hyp（プロリル-ヒドロキシプロリン）・Hyp-Gly（ヒドロキシプロリル-グリシン）の検出が確認。\n\nShigemura 2009 J Agric Food ChemでPro-Hypが線維芽細胞培養でコラーゲン合成促進シグナルとして機能。\n\nAsai 2020 Sci Repで経口Pro-Hyp皮膚到達と線維芽細胞活性化機序が確立されました。\n\nProksch 2014 RCT n=114（Verisol® 2.5-5g/日×8週）+ Asserin 2015 RCT n=106（Peptan® 10g/日×8週）+ Inoue 2016 メタ解析で皮膚弾力・水分量・しわ深さの改善が一貫して確認されました。\n\n現代の実用的整理＝①コラーゲンは消化されアミノ酸+ペプチドに分解 ②一部のペプチド（Pro-Hyp/Hyp-Gly）は無傷で吸収 ③これらが線維芽細胞に到達してシグナルとして機能で「効かない」評価は20世紀の古典で書き換え済ですが、「飲んだコラーゲンがそのまま肌のコラーゲンになる」も不正確（消化→ペプチド吸収→シグナル経路）で現実的説明が必要な領域です。',
    },
    {
      q: 'ヒアルロン酸サプリの製品はどう選ぶ？分子量の違いは？',
      a: '経口HAの分子量・規格表示で選び分けます。\n\nOe 2017 RCT で経口HA 120mg/日×12週で皮膚水分量改善（HA分子量約5,000Daの低分子化HA・Kewpie社製HyabestEX等）が主要根拠。\n\nKawada 2014 メタ解析で経口HA有意な皮膚改善方向確認。\n\n論文用量再現の前提＝①低分子化HA（分子量3,000-10,000Da・Kewpie HyabestEX®/JBP社等）が小腸吸収しやすい設計、②高分子HA（分子量100万Da以上）は経口で消化分解されるため皮膚到達はペプチド化後、③100-200mg/日が論文用量域です。\n\n製品選び＝①規格表示（分子量・原料）明示があるか、②HyabestEX®/Hydrolyzed HA明示、③併存成分（ビタミンC・コラーゲンペプチド・セラミド・エラスチン等）は併用合理。\n\n外用HAとの差別化＝外用は表面保湿経路で経口とは別カテゴリ。\n\n低分子HA外用（浸透）vs高分子HA外用（表面保護）の使い分け+加水分解HA外用（深部到達）の3形態も整理が必要です。\n\n代表製品＝DHC ヒアルロン酸 ¥1,200-2,500/月（120mg/日）・FANCL ディープチャージコラーゲン¥3,000-4,500/月（HA+コラーゲンペプチド配合）・Now Foods Hyaluronic Acid ¥1,800-3,000/月です。',
    },
    {
      q: 'コラーゲン原料（魚/豚/牛/鶏）の違いは？',
      a: '原料種ごとの違いは①アミノ酸組成差 ②宗教的食制限 ③アレルギー ④BSE/狂牛病リスクの4軸です。\n\n魚由来（マリンコラーゲン）＝Verisol®/Peptan F®/Naticol®等。\n\nPro-Hyp含有量高い+消化吸収速い+生体利用率高が利点。\n\n魚アレルギー（青魚/白身魚）の方は禁忌。\n\nハラール認証/コーシャ認証適合もしばしば。\n\n豚由来（ポーシンコラーゲン）＝Peptan P®/Solgar社製等、人皮膚アミノ酸組成に類似で生体適合性高い+価格中程度、ハラール/コーシャ制限でユダヤ教徒・イスラム教徒回避。\n\n牛由来（ボーバインコラーゲン）＝Sports Research Collagen Peptides/Vital Proteins/Great Lakes Wellness等、Type I+III共存でTendon/Bone/Skin/Joint多軸補助。\n\nBSE/狂牛病リスク回避でBSEフリー国家由来推奨（Grass-fed USA/New Zealand/Argentina等）。\n\nコーシャ認証あり/イスラム圏でも牛は可。\n\n鶏由来（チキンコラーゲン）＝Type II主体でジョイント補助に特化（Lugo 2016 Nutr J RCT chicken UC-II 40mg/日でジョイント補助）、鶏アレルギー注意+希少高価。\n\n妥当選択＝①肌改善目的→魚由来/豚由来（Pro-Hyp含量高）。\n\n②筋骨格目的→牛由来（Type I+III）。\n\n③ジョイント特化→鶏由来UC-II（変性コラーゲン）です。',
    },
    {
      q: '化粧品メーカー視点で経口美容サプリの現実解は？',
      a: '化粧品メーカー視点の冷静な整理として「経口=ベース体内補完・外用=即時主軸」の二刀流が無難現実解です。\n\n論文蓄積階層＝①外用レチノール/tretinoin（Kafi 2007/Kligman 1986数百本RCT累積）+ナイアシンアミド5%（Bissett 2005）+VC15%（Pinnell 2003）が深いしわ・光老化対策の金字塔。\n\n②経口コラーゲンペプチド+HA+VCは皮膚水分量・弾力・小じわ改善の補助レイヤー（Proksch 2014/Oe 2017/Cosgrove 2007観察研究）。\n\n③経口セラミド（Tanaka 2014）+経口エクオール（更年期女性・閉経後5年内）+経口アスタキサンチン（Tominaga 2012）も補助選択肢です。\n\n現実解の階層＝①日常基盤＝食事性タンパク質（魚・大豆・卵・鶏）+食事性VC（ピーマン・キウイ・イチゴ）+食事性HA（鶏皮・サメ軟骨・煮こごり）、②中高年・閉経後女性・ダイエット中・喫煙者・極端紫外線暴露・術後創傷治癒補助→サプリ追加、③深いしわ・光老化対策は外用レチノール+VC+ナイアシンアミドが論文蓄積最厚で経口は補助、④化粧品メーカー視点の冷静な提案=経口だけで深いしわ改善は困難・経口+外用+処方薬（皮膚科）の多軸介入を踏まえた進め方です。\n\n「飲む化粧水」「飲むコラーゲン」訴求は薬機法フレーミング慎重で「皮膚水分量・弾力・しわの改善が報告」型統一が誠実な立場、経口サプリは長期累積効果型（8-12週以上の継続評価）で短期で諦めない継続性を整理した内容です。',
    },
  ],
  'glutathione-vs-nac': [
    {
      q: 'グルタチオンとNAC（N-アセチルシステイン）はどう違うの？',
      a: '両者ともグルタチオン経路の代表成分ですが経口バイオアベイラビリティと位置づけが完全に異なる点が決定的です。\n\nグルタチオン（GSH・還元型グルタチオン）は3アミノ酸（グルタミン酸+システイン+グリシン）からなる体内最強の抗酸化物質で肝臓・赤血球・全細胞内に存在＋酸化ストレス中和・解毒・免疫調整に必須、ただし経口グルタチオンは消化管γ-グルタミルトランスフェラーゼで分解されて血中濃度上がりにくい論文ベース確立（Witschi 1992 Eur J Clin Pharmacol）。\n\nNAC（N-アセチルシステイン）はシステインのアセチル化前駆体で経口吸収後体内でシステインに変換→グルタチオン合成促進が機序。\n\nAtkuri 2007 Curr Opin Pharmacol レビューでNAC=システイン前駆体でグルタチオン体内合成促進が確立。\n\n経口バイオアベイラビリティ確立で論文ベース推奨経路として整理されています。\n\n実用的整理＝①NACでグルタチオン合成促進が論文上確実 ②経口GSHは血漿GSH上昇限定的（Witschi 1992古典・Allen 2011 RCTでは血漿GSH上昇報告ありの両論併記）③静脈内・吸入・舌下・リポソーム化など特殊形態は経口より血中濃度上昇ありの階層です。',
    },
    {
      q: '経口グルタチオン（GSH）は本当に効くの？「飲んでも分解される」と言われるけど？',
      a: '両論併記が王道整理です。\n\n「経口GSHは血中濃度上がらない」古典評価＝Witschi 1992 Eur J Clin Pharmacol で経口GSH 3g単回投与で血漿GSH顕著な上昇なし（消化管γ-グルタミルトランスフェラーゼ分解）が主要根拠で「経口GSHは効かない」評価が主流でした。\n\n「経口GSHでも血漿GSH上昇あり」新規評価＝Allen 2011 J Altern Complement Med RCT n=40 経口GSH 1000mg/日×4週で全血GSH+リンパ球GSH上昇・Richie 2015 Eur J Nutr RCT n=54 経口GSH 250-1000mg/日×6ヶ月で血漿GSH上昇用量依存・Setria® Glutathione（協和発酵バイオ社製・規格化品）の体内吸収データで書き換えが始まっています。\n\n現実解=条件付き現実的整理＝①長期高用量（500-1000mg/日×3-6ヶ月）でなら血漿GSH上昇可能性、②Setria®/SAMe-GSH リポソーム化等の特殊形態が経口より効率的、③シングルドーズ（単回投与）では血中濃度上がらない、④論文ベース確実な経路はNAC→体内グルタチオン合成促進です。\n\n化粧品メーカー視点の整理＝「飲む美白」訴求の経口GSHは美白機序（チロシナーゼ阻害+メラニン経路シフト）動物試験中心+ヒトRCT累積本数限定+静脈内GSH美白広告は薬機法/景品表示法慎重領域です。',
    },
    {
      q: 'NACは何に効く？アセトアミノフェン中毒の処方薬って本当？',
      a: 'NACは処方薬としても市販サプリとしても流通する独自ポジションです。\n\n処方薬としてのNAC＝①アセトアミノフェン（タイレノール®・カロナール®・パラセタモール）過量服用による肝障害解毒第一選択薬（Smilkstein 1988 NEJM 古典・現在も標準治療）、②慢性閉塞性肺疾患COPD・気管支炎の去痰薬（Dekhuijzen 2004 Eur Respir J メタ）、③造影剤腎症予防（Marenzi 2006 NEJM RCT）。\n\nサプリとしてのNAC＝Smaga 2021 NACのCochrane Database SR精神医学領域（双極性障害・統合失調症・薬物依存補助）・Berk 2008 Biol Psychiatry RCT双極性うつ・Magalhães 2013 J Affect Disord双極性メタ・Dean 2011 J Psychiatry Neurosci抗酸化機序整理・多嚢胞性卵巣症候群PCOS補助（Thakker 2015 Obstet Gynecol Int）・COVID-19補助（Atefi 2022 Adv Pharm Bull レビュー・確立度限定）。\n\n妥当用途＝①痰絡み・慢性気管支炎・肺機能補助 600-1,800mg/日 ②抗酸化補助・グルタチオン合成促進 600-1,200mg/日 ③精神医学領域（双極性・統合失調症補助）1,200-2,400mg/日医師相談下です。\n\n規制区分＝米国FDAは2020年「NACはサプリではなく医薬品扱い」見解（ただし市販サプリ流通は継続）、日本ではNACサプリは輸入時注意領域（医薬品扱い解釈）でiHerb等で個人輸入が主流です。',
    },
    {
      q: '美白目的でグルタチオン点滴は意味ある？',
      a: '美白目的のGSH静脈内投与は薬機法/医療法/論文整合性全てで慎重評価が必要な領域です。\n\n論文ベース整理＝Sonthalia 2018 J Cutan Aesthet Surg レビューで経口・静脈内・舌下グルタチオンの美白効果ヒトRCT累積本数限定+効果サイズ穏やかと整理。\n\nWatanabe 2014 Clin Cosmet Investig Dermatol RCT n=60 経口GSH 250mg/日×12週で皮膚明度+メラニン量改善（小規模・規格化品Setria®）は報告ありですが静脈内GSH美白RCTのヒト大規模試験は累積本数限定です。\n\n安全性・規制問題＝①FDA 2019年警告「グルタチオン静脈内投与の美白目的での使用は安全性・有効性が確立されておらず推奨しない」、②フィリピンFDA 2011年警告「腎毒性・スティーブンス・ジョンソン症候群・甲状腺機能障害・腹痛のリスク」、③日本では美容クリニックでの自由診療GSH点滴広告は薬機法/景品表示法上「美白」断定表現NGで「明度改善が報告」型統一が必要、④実用的代替軸＝外用ハイドロキノン4%処方（皮膚科）・トラネキサム酸経口250-500mg×2回/日（処方薬扱い）・ナイアシンアミド5%外用・VC15%外用・アゼライン酸20%外用が論文蓄積最厚です。\n\n化粧品メーカー視点の冷静な整理＝「飲む美白点滴」訴求は科学的に過大評価傾向でメラニン経路への現実的介入は外用処方治療+生活軸（紫外線対策SPF50+ PA++++・抗酸化食事・睡眠）の多軸介入が妥当な範囲です。',
    },
    {
      q: '併用は問題ない？処方薬や他のサプリとの相互作用は？',
      a: '両者経路類似で併用合理ですが処方薬との相互作用に注意が必要です。【グルタチオン】ほぼ全成分との併用合理でシスプラチン・ドキソルビシン等の化学療法薬の効果減弱懸念（抗酸化作用で活性酸素種ROS介在の腫瘍細胞死を相殺・腫瘍内科判断下）・ワルファリンとの相互作用報告例限定・胃腸障害（嘔気・腹部不快感）食後摂取推奨です。【NAC】ニトログリセリン（硝酸薬）併用で頭痛・低血圧増強（Loscalzo 1985 N Engl J Med 機序整理）・抗血小板薬・抗凝固薬（ワルファリン・DOAC）caution（弱い抗血小板作用報告）・手術前1-2週間中止推奨・ACE阻害薬・ARB併用で咳・低血圧増強懸念・気管支喘息でNAC吸入は気管支痙攣リスク（経口は安全プロファイル良好）・胃腸障害（嘔気・嘔吐・腹痛・下痢）食後摂取推奨です。\n\n両者とも妊娠中授乳中はデータ限定・医師相談下。\n\n化学療法中・術後・移植後免疫抑制状態は腫瘍内科・外科医判断下。\n\n精神医学領域での高用量NAC使用は精神科判断下が誠実な立場です。\n\n「美白」「アンチエイジング」「肝臓デトックス」断定NG→「グルタチオン合成促進・抗酸化マーカー改善が報告」型統一が薬機法整合的。\n\n重度疾患（肝障害・腎障害・呼吸器疾患・精神疾患・がん）は専門科第一選択でサプリは補助レイヤーの前提を必ず明示してください。',
    },
  ],
  // ── Session F Day 12 バッチ 2026-05-14（PAIR_CUSTOM_FAQS only 補完・skin/skin/joint/skin/stress 横断デー） ────
  'arbutin-vs-niacinamide': [
    {
      q: 'アルブチンとナイアシンアミドの違いは？',
      a: '作用機序と最適な対象が異なる補完関係です。\n\nアルブチンはハイドロキノン配糖体（β-arbutin = ハイドロキノン β-D-グルコシド／α-arbutin = ハイドロキノン α-D-グルコシド）でチロシナーゼ阻害→メラニン産生抑制が単経路、特にα-arbutin（α結合・Hamed 2020 J Cosmet Dermatol RCT 12週でα-arbutin 2%による色素沈着改善報告）はβ-arbutinより安定性高くハイドロキノン徐放しない構造が無難な選び方です。\n\nナイアシンアミドはビタミンB3形態で多機能成分＝①メラノソーム転送阻害（チロシナーゼ阻害でなくメラノサイト→ケラチノサイト移行を抑制）Hakozaki 2002 Br J Dermatol／②セラミド合成促進 Tanno 2000 Br J Dermatol／③皮脂分泌調整／④抗炎症／⑤バリア機能改善の5経路。\n\nBissett 2005 Dermatol Surg RCT 5%×12週で皮膚色調・しわ・皮脂改善報告。\n\n使い分け＝ピンポイント色素沈着（紫外線シミ・炎症後色素沈着）→アルブチン主軸／多機能ケア（毛穴・皮脂・くすみ・小じわ・バリア機能総合）→ナイアシンアミド主軸、併用合理＝両者経路独立で併用合理（Paula\'s Choice 10% Niacinamide Booster + The Ordinary Alpha Arbutin 2% + HA等の二刀流の進め方）です。',
    },
    {
      q: 'アルブチン 2% とナイアシンアミド 5-10% の選び方は？',
      a: '用量・形態の規格明示が論文用量再現の前提です。【アルブチン】α-arbutin 2%が論文用量再現（Hamed 2020 RCT 12週・α結合でハイドロキノン徐放しない安定構造）・β-arbutin 1-7%は化粧品慣行濃度（日本厚労省2008年医薬部外品有効成分認可）でThe Ordinary Alpha Arbutin 2% + HA / Paula\'s Choice Alpha Arbutin Booster等の規格明示品の組み合わせ。\n\n「アルブチン配合」訴求のみで濃度・形態不明品は効果不確実です。【ナイアシンアミド】5-10%が論文用量再現（Bissett 2005 RCT 5%×12週・Hakozaki 2002 メカニズム研究）でPaula\'s Choice 10% Niacinamide Booster / The Ordinary Niacinamide 10% + Zinc 1% / SkinCeuticals Metacell Renewal B3 (5%) / La Roche-Posay Mela B3 (5%)等が現実的、2%以下は効果限定的・10%超は刺激リスク・酒さ素因で赤み増悪報告でパッチテスト推奨です。\n\n使用順序＝洗顔→化粧水→ナイアシンアミド美容液→アルブチン美容液→保湿乳液→SPF30+の朝ルーティンまたは夜はナイアシンアミドのみ＋週2-3回レチノール時間分離の組み立て。\n\n両者とも光分解少なく朝夜使用可ですが日中SPF30+ PA+++必須（紫外線対策なしで色素沈着の根本対策にならない）です。',
    },
    {
      q: 'アルブチン・ナイアシンアミドの併用注意は？',
      a: '併用注意6領域を組み立てた流れです。【アルブチン】①ハイドロキノン処方薬（4-5%・皮膚科処方）併用は刺激重畳・効果重複で皮膚科判断下。\n\n②妊娠中・授乳中は安全性データ限定でα-arbutinはβ-arbutinより推奨されますが産科医相談下。\n\n③AHA・BHA・レチノール併用時は時間分離（朝アルブチン/夜AHA-BHA・レチノール）。\n\n④濃度高い品（β-arbutin 5%以上）は刺激リスクでパッチテスト推奨。【ナイアシンアミド】①ビタミンC外用（L-アスコルビン酸）との同時併用は古くは"ナイアシン⇄ニコチン酸変換でフラッシュ反応"懸念がありましたが現代製剤では問題なし（Caswell 2018 J Drugs Dermatol レビュー）、②10%超で稀に赤み・刺激（酒さ素因・敏感肌でパッチテスト推奨）。\n\n③経口ナイアシンアミド大量（1g/日超）で肝機能異常・血糖上昇報告で外用と経口は別軸。\n\n④妊娠中授乳中の外用は安全プロファイル良好ですが経口高用量は医師相談下。\n\n⑤レチノール・AHA・BHA併用は時間分離推奨で刺激重畳回避を踏まえた進め方です。\n\n「シミが消える」「肌が白くなる」断定は薬機法/景表法NG→「皮膚色調・色素沈着スコアの改善が報告」型統一が妥当な範囲。\n\n肝斑・後天性メラノサイトーシス・深い色素沈着は皮膚科の領域（外用ハイドロキノン4%・トラネキサム酸経口250-500mg×2回/日処方・QスイッチYAGレーザー・ピコレーザー）でサプリ・化粧品は補助です。',
    },
    {
      q: 'アルブチンとナイアシンアミド以外に併用合理な美白成分は？',
      a: '論文蓄積最厚の併用合理5成分が王道です。\n\n①外用ビタミンC（L-アスコルビン酸15-20%・誘導体APPS/3-O-Ethyl Ascorbic Acid/MAP/SAP）＝Pinnell 2003 Dermatol Surg L-アスコルビン酸15%×12週で光老化・色素沈着改善・抗酸化主軸。\n\n②トラネキサム酸外用2-5%・経口250-500mg×2回/日（皮膚科処方）＝Bala 2018 J Cosmet Dermatol メタ解析で肝斑改善・プラスミン-キニン経路抑制でメラノサイト活性化阻害。\n\n③コウジ酸2%医薬部外品有効成分＝チロシナーゼ阻害でアルブチンと類似経路。\n\n④4-n-ブチルレゾルシノール0.1-0.3%医薬部外品有効成分（ポーラ提案）＝チロシナーゼ阻害の強力作用。\n\n⑤アゼライン酸15-20%（皮膚科処方）＝チロシナーゼ阻害+抗炎症+ニキビ併用ケア。\n\n妥当併用設計＝朝VC15%+アルブチン2%+ナイアシンアミド5-10%+SPF30+ / 夜トラネキサム酸2-5%+ナイアシンアミド5-10%+レチノール（時間分離週2-3回）が独立3経路の積み増し設計。\n\n深い色素沈着・肝斑・光老化は皮膚科の領域（外用ハイドロキノン4%・トラネキサム酸内服・QスイッチYAGレーザー・ピコレーザー・トレチノイン外用）でサプリ・化粧品は補助という前提が妥当な範囲です。',
    },
    {
      q: '効果が出るまでどのくらい？評価のタイミングは？',
      a: '【アルブチン】8-12週で評価が論文上（Hamed 2020 RCT 12週・α-arbutin 2%）。\n\n12週評価でも効果限定的なら濃度上げる（2%→3-5%）or 他経路追加（VC・トラネキサム酸・ナイアシンアミド）or 皮膚科受診の入り方です。【ナイアシンアミド】4-12週で評価（Bissett 2005 RCT 12週・5%×12週で皮膚色調改善）。\n\n多機能成分なので「色素沈着」「皮脂」「毛穴」「バリア機能」「小じわ」の5指標を主観評価が現実的フィードバック設計。\n\n12週で改善なければ濃度上げる（5%→10%）or 他経路追加が次の段階。【両者併用】12週評価+皮膚スコア記録（色調・色素沈着・テクスチャー・毛穴・皮脂・赤み・刺激度の主観評価+VISIA等の客観評価）が無難、改善なければ①外用VC15%追加／②外用トラネキサム酸2-5%追加／③皮膚科受診（外用ハイドロキノン4%・トラネキサム酸経口処方）／④原因軸再評価（紫外線対策不足・スキンケア習慣・睡眠・栄養・甲状腺機能・更年期ホルモン変化）／⑤QスイッチYAGレーザー・ピコレーザーの医療領域が無難な順番です。\n\n「シミが消える」「肌が白くなる」断定NG→「皮膚色調・色素沈着スコアの改善が報告」型統一。\n\n深い色素沈着・肝斑・後天性メラノサイトーシス・光老化は皮膚科の領域（外用ハイドロキノン4%・トラネキサム酸内服・レーザー治療）でサプリ・化粧品は補助という前提が妥当な範囲です。',
    },
  ],
  'ceramide-oral-vs-collagen-peptide': [
    {
      q: '経口セラミドと経口コラーゲンペプチドの違いは？',
      a: '作用機序と最適な対象が完全に異なる補完関係です。\n\n経口セラミドはTanaka 2014 J Dermatol Sci RCT 米由来セラミド0.6-1.2mg/日×4週でTEWL改善+皮膚水分量改善・Bissett 2015 J Cosmet Dermatol RCT 経口米由来セラミドで皮膚バリア機能改善が報告。\n\n皮膚バリア機能・水分保持の角質層に作用（Tachibana 2008 経口セラミドの皮膚到達経路確立）です。\n\n経口コラーゲンペプチドはProksch 2014 Skin Pharmacol Physiol RCT n=114 Verisol® 2.5-5g/日×8週で皮膚弾力28%改善・水分量改善・Asserin 2015 J Cosmet Dermatol RCT n=106 Peptan® 10g/日×8週でしわ深さ改善が中心エビデンス。\n\nPro-Hyp・Hyp-Glyペプチド（Iwai 2005／Shigemura 2009）が線維芽細胞シグナル活性化で真皮コラーゲン合成促進の機序で皮膚弾力・しわ深さの真皮に作用（経路独立）です。\n\n使い分け＝乾燥肌・バリア機能低下・アトピー素因→経口セラミド主軸／皮膚弾力・しわ深さ・光老化対策→経口コラーゲンペプチド主軸、併用合理＝両者経路独立で併用合理（米由来セラミド0.6-1.2mg/日+Verisol® or Peptan® 2.5-10g/日+VC500mg/日の王道スタックの段階構成）です。',
    },
    {
      q: '経口セラミドとコラーゲンペプチドの用量・形態の選び方は？',
      a: '【経口セラミド】米由来セラミド0.6-1.2mg/日×4週が論文用量再現（Tanaka 2014 RCT準拠）でNow Foods Ceramide-PCD（米由来）/ ライオン リフロイド / 明治アミノコラーゲンPLUS セラミド配合品等が市販されています。\n\n小麦由来セラミド（コエンザイムQ10等と配合品）は小麦アレルギー既往で回避・米由来は安全プロファイル良好。\n\nコンニャクセラミド・大豆セラミド・ユズ種子由来は規格バラつきで論文用量再現の前提として米由来セラミド0.6-1.2mg/日の規格明示品が無難な選び方です。【経口コラーゲンペプチド】Verisol®（ゲリタ社）2.5-5g/日×8週（Proksch 2014 RCT）・Peptan®（ルセオ社）10g/日×8週（Asserin 2015 RCT）が論文用量再現。\n\nPro-Hyp・Hyp-Glyペプチド残存率が論文蓄積品の規格指標でフィッシュコラーゲン（魚由来Pro-Hyp含量高+魚アレルギー禁忌）／ポーシンコラーゲン（豚由来人皮膚類似生体適合性高）／ボバインコラーゲン（牛由来Type I+III BSEフリー国家由来推奨）／チキンコラーゲン（鶏由来Type II主体UC-IIジョイント特化）の4軸。\n\n「コラーゲンドリンク10,000mg配合」訴求は規格バラつきで論文ベース評価不能・Verisol® or Peptan® or LeoLina®等の規格明示品が王道、両者併用＝経口セラミド0.6-1.2mg/日+コラーゲンペプチド2.5-10g/日+VC 500-1,000mg/日×8-12週の王道スタックを整理した内容です。',
    },
    {
      q: '経口セラミド・コラーゲンペプチドの併用注意は？',
      a: '両者ともほぼ全成分と相性良く併用問題なしが独占特徴で、併用注意は主にアレルギー領域です。【経口セラミド】①小麦由来セラミドは小麦アレルギー既往で回避（米由来推奨）。\n\n②食経験ベースで安全プロファイル良好・副作用報告ほぼなし、③妊娠中授乳中は安全領域（経口イソトレチノイン・外用レチノール禁忌の代替軸として活躍）。\n\n④稀に消化器症状（軟便・胃部不快感）が高用量で発現・低用量開始推奨。【経口コラーゲンペプチド】①魚由来は魚アレルギー（特に青魚・サバ・イワシ系アレルギー）禁忌→ポーシン（豚）・ボバイン（牛）・チキン（鶏）への切替推奨。\n\n②腎機能低下例（CKDステージ3以上：eGFR<60）は高タンパク質負荷でcaution・腎臓内科判断下。\n\n③痛風・高尿酸血症は嘌呤前駆体としての関与限定的で通常用量は問題なしですが大量摂取（10g/日超）は医師相談、④妊娠中授乳中は安全領域で産科でDHA・葉酸・鉄補給推奨範囲内。\n\n⑤フィッシュコラーゲンは魚アレルギー以外でも稀にヒスタミン反応でパッチテスト推奨。\n\n両者経路独立で併用合理＝米由来セラミド0.6-1.2mg/日+Verisol®2.5-5g/日 or Peptan®10g/日+VC500-1,000mg/日の王道スタック。\n\n「アトピーが治る」「シワが消える」「若返り」断定は薬機法/景表法NG→「皮膚バリア機能・水分量・TEWL・弾力・しわ深さの改善が報告」型統一。\n\nアトピー性皮膚炎・酒さ・脂漏性皮膚炎は皮膚科の領域（外用ステロイド・タクロリムス・JAK阻害薬外用デルゴシチニブ）でサプリは補助です。',
    },
    {
      q: '外用セラミドと経口セラミド・コラーゲンの優先順位は？',
      a: '外用が主軸・経口は補助の段階です。\n\n化粧品メーカー視点現実解＝「経口=ベース体内補完・外用=即時主軸の二刀流」で深いしわ・光老化・アトピー・乾皮症の根本対策には外用ヒト型セラミド+ヘパリン類似物質+パンテノール+外用レチノール+VC+ナイアシンアミド+ペプチドが主軸。\n\n実用的併用設計＝外用ヒト型セラミド+ヘパリン類似物質朝晩+外用レチノール夜+VC外用朝+ナイアシンアミド5-10%+経口セラミド0.6-1.2mg/日+コラーゲンペプチド2.5-10g/日の二刀流が現実解です。',
    },
    {
      q: '効果が出るまでどのくらい？評価のタイミングは？',
      a: '【経口セラミド】4-8週で皮膚水分量・TEWL改善評価（Tanaka 2014 RCT 4週・Bissett 2015 RCT 8-12週）、12週継続で本格評価の進め方、累積効果型（コラーゲンペプチドと並ぶ）で短期評価ではなく中長期視点が現実的フィードバック設計です。【経口コラーゲンペプチド】8週で皮膚弾力・しわ深さ改善評価（Proksch 2014 RCT 8週 Verisol®・Asserin 2015 RCT 8週 Peptan®）、12週継続で本格評価が無難。\n\n両者ともショートカット効果なく累積効果型でフィードバック評価は中長期視点必須。【両者併用】8-12週評価+皮膚スコア記録（水分量・TEWL・弾力・しわ深さ・乾燥度・かゆみ・刺激度の主観評価+VISIA等の客観評価）が王道フィードバック設計、改善なければ①用量上げる（セラミド0.6→1.2mg/日・コラーゲン2.5→10g/日）／②VC500-1,000mg/日追加（コラーゲン合成補因子）／③外用ヒト型セラミド+ヘパリン類似物質+外用レチノール+VC+ナイアシンアミドの外用軸強化／④原因軸再評価（紫外線対策・スキンケア習慣・睡眠・栄養・甲状腺機能・更年期ホルモン変化）／⑤皮膚科受診（アトピー素因・酒さ診断・脂漏性皮膚炎診断）が次の段階。\n\nアトピー性皮膚炎・酒さ・脂漏性皮膚炎・乾癬は皮膚科の領域（外用ステロイド・タクロリムス・JAK阻害薬外用デルゴシチニブ・抗炎症処方薬）でサプリ・化粧品は補助です。',
    },
  ],
  'glucosamine-vs-chondroitin': [
    {
      q: 'グルコサミンとコンドロイチンの違いは？',
      a: '作用機序が異なる補完関係ですが重要な前提として両者ともヒトでの効果は限定的という論文ベースの誠実評価が必要です。\n\nグルコサミンはN-アセチルグルコサミンの前駆体でグリコサミノグリカン（GAG）合成原料・軟骨基質前駆体。\n\nReginster 2001 Lancet・Pavelka 2002 Arch Intern Med RCT グルコサミン硫酸塩1,500mg/日×3年で関節軟骨保護報告が肯定エビデンスですが、Wandel 2010 BMJ メタ解析 RCT 10件統合では効果限定的と評価。\n\nコンドロイチンは硫酸化グリコサミノグリカン（GAG）で軟骨水分保持・関節滑液粘度維持。\n\nHochberg 2016 Ann Rheum Dis RCT コンドロイチン硫酸800mg/日×6ヶ月で関節痛改善報告ですが全体的にエビデンス分かれる状況。\n\n最重要 RCT＝GAIT試験 Clegg 2006 NEJM RCT n=1,583 6ヶ月でグルコサミン1,500mg/日・コンドロイチン1,200mg/日・併用・セレコキシブ・プラセボの5群比較で「グルコサミン単独・コンドロイチン単独はプラセボと有意差なし・併用群のみ中等度以上の痛みでプラセボより改善」と報告（OARSI 2019 guideline・ACR 2019 guidelineでは推奨度低い〜不確実）。\n\n「軟骨が再生する」「変形性膝関節症が治る」断定は薬機法/景表法NG→「関節機能・痛みスコアの改善が報告（効果サイズ限定的）」型統一が誠実な立場です。',
    },
    {
      q: 'グルコサミン硫酸塩・塩酸塩・コンドロイチンの用量・形態の選び方は？',
      a: '【グルコサミン】①グルコサミン硫酸塩（Glucosamine Sulfate）1,500mg/日×3年が論文用量再現（Reginster 2001 Lancet・Pavelka 2002 Arch Intern Med RCT）で欧州で処方薬（医薬品）扱い・Rotta Pharmaceuticals社のDONA®等が薬剤グレード。\n\n②グルコサミン塩酸塩（Glucosamine HCl）は米国・日本サプリで主流ですがHoupt 2008 J Rheumatol RCTで硫酸塩より効果劣る可能性報告、③論文用量再現の前提は硫酸塩でNow Foods Glucosamine Sulfate 1,500mg / Doctor\'s Best Glucosamine Sulfate / Solgar Glucosamine Sulfate等の組み合わせ。\n\nN-アセチルグルコサミン（NAG）はジンマー手術後関節再生研究領域で経口サプリ用途は限定的。【コンドロイチン】コンドロイチン硫酸ナトリウム（Chondroitin Sulfate）1,200mg/日×6ヶ月が論文用量再現（Hochberg 2016 RCT）。\n\n鮫由来・牛由来・豚由来・鶏由来があり鶏由来Type IIが豚牛より低分子で吸収率高。\n\nNow Foods Chondroitin Sulfate / Doctor\'s Best Glucosamine Chondroitin MSM等の規格明示品が現実的。\n\n併用＝グルコサミン硫酸塩1,500mg/日+コンドロイチン硫酸ナトリウム1,200mg/日がGAIT試験準拠の組み合わせ。\n\nMSM（メチルスルホニルメタン）3g/日を加えたDoctor\'s Best Glucosamine Chondroitin MSMが市販主流ですが、論文ベース効果サイズは限定的という前提理解が必須です。',
    },
    {
      q: 'グルコサミン・コンドロイチンの併用注意は？',
      a: '併用注意6領域を組み立てた流れです。\n\n①糖尿病薬（インスリン・SU薬・メトホルミン・GLP-1作動薬・SGLT2阻害薬）併用注意＝グルコサミンは理論的にインスリン抵抗性増加の懸念ありましたがScroggie 2003 Arch Intern Med RCT・Reginster 2001 Lancetでヒト試験では血糖への臨床的影響なしと確認、ただし糖尿病治療中は血糖モニタリング推奨。\n\n②ワルファリン（抗凝固薬）併用でINR上昇報告（Knudsen 2008 Pharmacotherapy系統レビューでグルコサミン・コンドロイチンともワルファリンとのINR延長症例報告あり）→併用時はINR定期測定推奨。\n\n③エビ・カニ・甲殻類アレルギー既往はグルコサミン禁忌（甲殻類由来が主流）→植物由来グルコサミン（コーン・小麦由来）への切替推奨ですが小麦アレルギー注意。\n\n④妊娠中・授乳中は安全性データ限定・医師相談下。\n\n⑤鮫由来コンドロイチンは絶滅危惧種懸念・鶏由来Type II推奨。\n\n⑥ヨウ素アレルギーは魚介由来コンドロイチン回避・植物由来代替推奨。\n\n「変形性膝関節症が治る」「軟骨が再生する」断定は薬機法/景表法NG→「関節機能・痛みスコアの改善が報告（効果サイズ限定的）」型統一。\n\n変形性膝関節症・関節リウマチ・痛風・偽痛風・関節滑膜炎・半月板損傷・前十字靭帯損傷は整形外科第一選択（NSAIDs・ヒアルロン酸関節内注射・ステロイド関節内注射・人工関節置換術TKA/UKA・関節鏡視下手術）でサプリは補助レイヤーという前提が妥当な範囲です。',
    },
    {
      q: '欧州処方薬と日米サプリの規制区分差・関節痛の正しい対応は？',
      a: '規制区分差は論文ベース選択の前提として重要です。【欧州】EMA（欧州医薬品庁）でグルコサミン硫酸塩は処方薬扱い（DONA® 1,500mg/日処方）・Rotta Pharmaceuticals社の薬剤グレードでRCT エビデンスベースに医療用医薬品として承認。\n\nコンドロイチン硫酸も一部欧州諸国で処方薬扱い（フランス・ベルギー等）。【日米】FDA・厚労省でグルコサミン・コンドロイチンともサプリメント扱いで規格バラつき品が市販主流。\n\n「規格明示品（Glucosamine Sulfate 1,500mg/Chondroitin Sulfate 1,200mg明記）」が論文用量再現の前提です。【関節痛の正しい対応階層】①整形外科受診で診断（X線・MRI・血液検査・関節液検査）が第一選択＝変形性膝関節症（KL分類Grade 1-4）・関節リウマチ・痛風・偽痛風（CPPD沈着症）・半月板損傷・前十字靭帯損傷・滑膜炎の鑑別、②保存療法＝NSAIDs（ロキソプロフェン・セレコキシブ）・ヒアルロン酸関節内注射（アルツ・スベニール）・ステロイド関節内注射・物理療法・装具療法、③運動療法＝四頭筋強化・関節可動域訓練・水中歩行・体重管理（5kg減量で膝負荷4倍減）が現実的、④手術療法＝関節鏡視下手術・骨切り術（HTO/DFO）・人工関節置換術（TKA・UKA・THA）。\n\nサプリは保存療法と並ぶ補助レイヤーとして位置づけ。\n\n「軟骨再生」「変形性膝関節症が治る」断定NGで誠実評価が妥当な範囲です。',
    },
    {
      q: '効果が出るまでどのくらい？評価のタイミングは？',
      a: '【グルコサミン】3-6ヶ月で評価が論文上（Reginster 2001 Lancet 3年・Pavelka 2002 Arch Intern Med 3年・Clegg 2006 NEJM 6ヶ月・GAIT trial）、累積効果型で短期評価不可・3-6ヶ月使用して効果なければ中止判断が無難。\n\n効果サイズは限定的でプラセボ効果も大きい領域という前提理解が必要です。【コンドロイチン】6ヶ月で評価（Hochberg 2016 Ann Rheum Dis RCT 6ヶ月）。\n\nグルコサミンと類似の累積効果型で短期評価不可。【両者併用】6ヶ月評価+症状記録（WOMAC痛みスコア・関節可動域・歩行距離・階段昇降・しゃがみ込み・正座可否・腫脹・朝のこわばり・夜間痛の主観評価）が王道フィードバック設計、改善なければ①整形外科再受診（X線KL分類進行確認・MRI半月板損傷確認・関節液検査）／②NSAIDs・ヒアルロン酸関節内注射等の保存療法強化／③装具療法・運動療法強化／④減量介入（5kg減量で膝負荷4倍減）／⑤骨切り術・人工関節置換術等の手術療法検討が次の段階。\n\n変形性膝関節症Grade 3-4・関節リウマチ・痛風・偽痛風・半月板損傷・前十字靭帯損傷は整形外科第一選択（NSAIDs・ヒアルロン酸関節内注射・ステロイド関節内注射・人工関節置換術TKA/UKA・関節鏡視下手術）でサプリは補助。',
    },
  ],
  'kojic-acid-vs-vitamin-c-topical': [
    {
      q: 'コウジ酸とビタミンC外用の違いは？',
      a: '作用機序が異なる補完関係です。\n\nコウジ酸（kojic acid）は麹菌（Aspergillus oryzae）由来でチロシナーゼ阻害→メラニン産生抑制が単経路。\n\n日本では1988年に医薬部外品有効成分認可・濃度2%が論文用量再現（三省製薬・三共・ロート製薬等の医薬部外品配合品）。\n\nビタミンC外用はL-アスコルビン酸（15-20%）・誘導体（APPS・3-O-Ethyl Ascorbic Acid・MAP・SAP・Ascorbyl Glucoside）で多経路抗酸化＝①チロシナーゼ阻害／②活性酸素種（ROS）スカベンジ／③コラーゲン合成補因子／④メラニン還元（既存酸化メラニンの色調改善）／⑤抗炎症の5経路。\n\nPinnell 2003 Dermatol Surg L-アスコルビン酸15%×12週で光老化・色素沈着改善・Humbert 2003 Exp Dermatol RCT VC 5%×6ヶ月で皮膚しわ改善が中心エビデンス。\n\n使い分け＝ピンポイント色素沈着（特に肝斑・紫外線シミ）→コウジ酸主軸／多機能ケア（色素沈着+光老化+しわ+抗酸化総合）→ビタミンC外用主軸、併用合理＝両者経路独立で併用合理（朝VC15%+夜コウジ酸2%の使い分けまたは朝コウジ酸+夜VCの時間分離の組み立て）です。',
    },
    {
      q: 'コウジ酸2003-2006年厚労省の安全性見直しとは？',
      a: 'コウジ酸の規制経緯は事実列挙で中立記述が誠実な立場です。\n\n【経緯】2003年厚労省が長期動物試験（ラット2年間）でコウジ酸の肝臓腫瘍発生懸念を確認→2003年に医薬部外品有効成分の自主回収・新規承認停止→2005年厚労省薬事食品衛生審議会で再評価→2006年に安全性再確認＝①ラット試験で観察された肝臓腫瘍はラット特異的代謝経路に起因しヒトでは外挿性なし、②経皮吸収量が低くヒトでの全身曝露量は極めて少ない、③長期外用での全身性毒性報告なし。\n\n2006年医薬部外品有効成分として再認可で現在は2%濃度でHAKU メラノフォーカス（資生堂）・米肌（KOSE）・ロート製薬メンソレータム アクネス等が市販主流。\n\n【中立評価】煽らず事実列挙＝2003年自主回収の事実 + 2006年再認可の事実を併記。\n\n経皮吸収量が低くヒト全身曝露量は極めて少ない前提でリスクは限定的。\n\n接触皮膚炎・刺激（敏感肌で稀に赤み・かゆみ）報告はありでパッチテスト推奨。\n\n「絶対安全」「100%安心」も「危険」も両極端な訴求は不適切で論文ベースのリスクベネフィット評価が妥当な範囲です。\n\n「シミが消える」「肌が白くなる」断定は薬機法/景表法NG→「皮膚色調・色素沈着スコアの改善が報告」型統一です。',
    },
    {
      q: 'コウジ酸2%とビタミンC外用15-20%の用量・形態の選び方は？',
      a: '【コウジ酸】2%濃度が論文用量再現（医薬部外品有効成分認可濃度・三省製薬・三共・資生堂・KOSE等の規格品）。\n\nHAKU メラノフォーカス（資生堂・コウジ酸+トラネキサム酸+4MSK配合）・米肌（KOSE）・サナ なめらか本舗（コウジ酸配合品）等が王道。\n\n「コウジ酸配合」訴求のみで濃度不明品は効果不確実です。【ビタミンC外用】①L-アスコルビン酸15-20%（pH 2.5-3.5）が論文用量再現（Pinnell 2003 Dermatol Surg）でSkinCeuticals C E Ferulic / Drunk Elephant C-Firma / Paula\'s Choice C15 Super Booster等の規格明示品が無難な選び方、②誘導体（安定性高・刺激低）＝APPS（アプレシエ・脂溶性+水溶性両性）・3-O-Ethyl Ascorbic Acid（ロート製薬メラノCC配合・安定性高）・MAP（マグネシウムアスコルビルリン酸）・SAP（ナトリウムアスコルビルリン酸・抗ニキビ作用併存）・Ascorbyl Glucoside（資生堂HAKU・ベネフィークなど・配糖体安定性高）。\n\nロート製薬メラノCC・The Ordinary Ethylated Ascorbic Acid 15% Solution・ビーグレン Cセラム / Obagi-C Rx Clarifying Serum等の規格明示品の組み合わせ。\n\nL-アスコルビン酸は刺激リスク高い（pH 2.5-3.5で酸性・酒さ素因や敏感肌で赤み）でパッチテスト推奨。\n\n誘導体は安定性+低刺激トレードオフで効果は限定的な傾向。\n\n使用順序＝洗顔→化粧水→VC美容液→コウジ酸美容液→保湿乳液→SPF30+の朝ルーティンまたは夜のみコウジ酸2%＋朝VC15-20%の時間分離の段階構成。\n\n両者とも光分解少なく朝夜使用可ですがL-アスコルビン酸15-20%は酸化しやすく開封後3-6ヶ月以内使用推奨です。',
    },
    {
      q: 'コウジ酸・ビタミンC外用の併用注意は？',
      a: '併用注意6領域を踏まえた進め方です。【コウジ酸】①稀に接触皮膚炎・刺激（敏感肌・酒さ素因で赤み・かゆみ）→パッチテスト推奨。\n\n②妊娠中・授乳中は安全性データ限定で産科医相談下（経皮吸収量低く論理的リスクは限定的ですがデータ不足）。\n\n③ハイドロキノン処方薬（4-5%・皮膚科処方）併用は刺激重畳で皮膚科判断下。\n\n④AHA・BHA・レチノール併用は刺激重畳で時間分離（朝コウジ酸/夜AHA-BHA・レチノール）。【ビタミンC外用】①L-アスコルビン酸15-20%は刺激リスク高い（pH 2.5-3.5酸性・酒さ素因や敏感肌で赤み）でパッチテスト推奨。\n\n②ナイアシンアミド外用との同時併用は古くは"ナイアシン⇄ニコチン酸変換でフラッシュ反応"懸念がありましたが現代製剤では問題なし（Caswell 2018 J Drugs Dermatol レビュー）。\n\n③妊娠中授乳中の外用は安全プロファイル良好ですが経口高用量（500mg/日超）は医師相談下。\n\n④AHA・BHA・レチノール併用は時間分離推奨で刺激重畳回避。\n\n⑤光分解少ないが酸化しやすく開封後3-6ヶ月以内使用（黄変・茶変色は酸化サイン）。\n\n⑥敏感肌・酒さ素因は低刺激誘導体（MAP・SAP・Ascorbyl Glucoside・3-O-Ethyl Ascorbic Acid）への切替推奨です。\n\n「シミが消える」「肌が白くなる」断定は薬機法/景表法NG→「皮膚色調・色素沈着スコアの改善が報告」型統一。\n\n肝斑・後天性メラノサイトーシス・深い色素沈着は皮膚科の領域（外用ハイドロキノン4%・トラネキサム酸経口250-500mg×2回/日処方・QスイッチYAGレーザー・ピコレーザー）でサプリ・化粧品は補助です。',
    },
    {
      q: '効果が出るまでどのくらい？評価のタイミングは？',
      a: '【コウジ酸】8-12週で評価が論文上（医薬部外品の有効性試験 8-12週・三省製薬・資生堂HAKU等の試験準拠）。\n\n12週評価でも効果限定的なら濃度上げる（2%医薬部外品最大濃度）or 他経路追加（VC・トラネキサム酸・ナイアシンアミド）or 皮膚科受診の入り方です。【ビタミンC外用】①L-アスコルビン酸15-20%＝4-12週で評価（Pinnell 2003 Dermatol Surg RCT 12週）。\n\n②誘導体（APPS・3-O-Ethyl Ascorbic Acid・MAP・SAP・Ascorbyl Glucoside）＝12週評価（誘導体は安定性+低刺激トレードオフで効果サイズは限定的・ロート製薬メラノCC等の長期評価データ蓄積）。\n\n多機能成分なので「色素沈着」「皮膚色調」「光老化（しわ・肌のはり）」「抗酸化（くすみ）」「ニキビ・テクスチャー」の5指標を主観評価が現実的フィードバック設計です。【両者併用】12週評価+皮膚スコア記録（色調・色素沈着・テクスチャー・毛穴・皮脂・赤み・刺激度の主観評価+VISIA等の客観評価）が無難、改善なければ①外用トラネキサム酸2-5%追加（肝斑特異的有効）／②ナイアシンアミド5-10%追加（メラノソーム転送阻害の別経路）／③アルブチン2%追加（チロシナーゼ阻害の別経路）／④皮膚科受診（外用ハイドロキノン4%・トラネキサム酸経口処方）／⑤QスイッチYAGレーザー・ピコレーザーの医療領域が無難な順番です。\n\n「シミが消える」「肌が白くなる」断定NG→「皮膚色調・色素沈着スコアの改善が報告」型統一。\n\n深い色素沈着・肝斑・後天性メラノサイトーシス・光老化は皮膚科の領域でサプリ・化粧品は補助です。',
    },
  ],
  'l-theanine-vs-magnesium': [
    {
      q: 'L-テアニンとマグネシウムの違いは？',
      a: '作用機序と最適な対象が異なる補完関係です。\n\nL-テアニン（L-theanine）は茶葉由来アミノ酸（緑茶・玉露・抹茶に多含）でα波増加・グルタミン酸シグナル調整・GABA増加促進の3経路。\n\nHidese 2019 Nutrients RCT n=30 L-テアニン200mg/日×4週でPSS（知覚ストレス）・PSQI（睡眠の質）・認知機能有意改善・Williams 2020 Plant Foods Hum Nutr SR 21 RCT統合で急性ストレス反応一貫した改善・即効性40-60分でα波増加（Yokogoshi 1998 J Nutr Sci Vitaminol 経口テアニンBBB通過確立）。\n\nマグネシウム（Magnesium）は300以上の酵素補因子・GABA受容体活性化・NMDA受容体拮抗・5-HTP→セロトニン代謝補因子の4経路。\n\nBoyle 2017 Nutrients SR 18 RCT統合でストレス・不安・うつサブスケール改善方向・Eur J Clin Nutr 2020 メタ n=1,800欠乏者でCRP・血圧・インスリン抵抗性改善・日本人推奨量より約100mg/日不足（日本人のMg平均摂取量250mg/日・推奨量340mg/日男性・270mg/日女性）。\n\n使い分け＝急性ストレス対応・集中力低下・即効性求める→L-テアニン主軸／慢性ストレス・睡眠の質改善・Mg欠乏疑い・PMS・偏頭痛・筋けいれん・心血管リスク→マグネシウム主軸、併用合理＝両者経路独立で併用合理（夜のL-テアニン200mg+Mg-グリシネート200-400mgの王道スタックが王道睡眠+ストレス設計）です。',
    },
    {
      q: 'L-テアニン200mgとマグネシウム形態の選び方は？',
      a: '【L-テアニン】200mg/日が論文用量再現（Hidese 2019 Nutrients RCT 200mg/日×4週・Williams 2020 SR）でSuntheanine®（太陽化学社・L-体100%規格）が論文用量再現の前提。\n\nSuntheanine®配合品＝Now Foods L-Theanine 200mg Suntheanine® / Doctor\'s Best Suntheanine L-Theanine 150mg / Jarrow Formulas Theanine 200mg等が現実的。\n\n「L-テアニン配合」訴求のみで規格不明品はD-体混入や用量バラつきで効果不確実。\n\n茶由来高品質品は1日緑茶3-5杯で約50-100mgのL-テアニン摂取ですがカフェインも併存でサプリ単独200mgが論文用量再現に推奨。【マグネシウム】形態別優先順位＝①グリシネート（Mg-Glycinate・キレート型）＝吸収率高+胃腸障害低（Doctor\'s Best High Absorption Magnesium / Pure Encapsulations Magnesium Glycinate）が現実的推奨。\n\n②クエン酸塩（Mg-Citrate）＝吸収率良好+穏やかな下剤作用（Now Foods Magnesium Citrate）。\n\n③スレオネート（Mg-L-Threonate）＝BBB通過特化で認知機能補助仮説（Magtein®配合品）。\n\n④マロネート（Mg-Malate）＝筋肉疲労+エネルギー代謝特化。\n\n⑤酸化マグネシウム（Mg Oxide）＝吸収率低い・下剤効果メインで論文用量再現には不適。\n\n⑥クエン酸マグネシウムは医療用「マグミット」と類似だが処方薬は別軸（便秘薬として処方）。\n\n標準用量＝Mg 200-400mg/日（元素換算）×8-12週が論文用量再現。\n\n日本人推奨量340mg/日男性・270mg/日女性に対し平均250mg/日で不足分の補完を整理した内容です。\n\n併用＝夜L-テアニン200mg+Mg-Glycinate 200-400mg+L-Tryptophan 500mg or 5-HTP 50-100mg+メラトニン 0.5-3mgの王道睡眠スタックが無難、ただしメラトニンは日本では処方薬扱いで個人輸入領域です。',
    },
    {
      q: 'L-テアニン・マグネシウムの併用注意は？',
      a: '併用注意6領域を組み立てた流れです。【L-テアニン】①降圧薬併用で血圧低下増強傾向（L-テアニンは穏やかな血圧低下作用あり・Yokogoshi 2003 Biosci Biotechnol Biochem）→血圧モニタリング推奨。\n\n②中枢刺激薬（カフェイン高用量・モディフィニル・アンフェタミン系）併用で薬理拮抗（α波増加vs覚醒）の理論的相互作用。\n\n③妊娠中・授乳中は安全性データ限定（茶葉由来食経験ベースで通常摂取量は安全領域）・産科医相談下、④肝機能低下例は代謝注意ですが通常用量で問題なし。\n\n⑤食後30-60分で効果ピーク・空腹時で吸収速度上がる傾向です。【マグネシウム】①テトラサイクリン系・フルオロキノロン系抗菌薬・ビスホスホネート・甲状腺薬（レボチロキシン）併用で吸収阻害→時間分離2-4時間必須。\n\n②腎機能低下例（CKDステージ3以上：eGFR<60）で高Mg血症リスク（脱力・血圧低下・心拍異常）→腎臓内科判断下。\n\n③高用量（600mg/日超）で下痢・軟便（特にMg-Citrate・酸化Mg）。\n\n④利尿薬（ループ利尿薬・チアジド系）併用でMg排泄増加で補給推奨。\n\n⑤PPI（プロトンポンプ阻害薬）長期使用で低Mg血症報告（Cundy 2008 BMJ）。\n\n⑥カルシウム拮抗薬・ACE阻害薬・ARB併用は血圧低下増強傾向で血圧モニタリング。\n\n⑦妊娠中はMg 300-400mg/日推奨範囲（妊娠高血圧症候群・子癇予防の医療現場でMg硫酸塩静注実績）。\n\n「不眠が治る」「ストレスが消える」「うつが改善」断定は薬機法/景表法NG→「ストレス・睡眠の質・コルチゾール・α波の改善が報告」型統一。',
    },
    {
      q: '睡眠改善にL-テアニン・マグネシウム以外の現実的併用は？',
      a: '論文蓄積最厚の睡眠改善併用5成分が王道です。\n\n③メラトニン 0.5-3mg就寝1時間前＝Ferracioli-Oda 2013 PLOS ONE メタ解析で入眠潜時短縮。\n\n日本では処方薬「ロゼレム（ラメルテオン）」「メラトベル（小児用メラトニン）」扱いで一般サプリは個人輸入領域。\n\n④バレリアン（西洋カノコソウ）400-900mg就寝30分前＝Bent 2006 Am J Med メタ解析で睡眠の質改善傾向（効果サイズ限定的）。\n\n⑤アシュワガンダ KSM-66 300-600mg/日＝Salve 2019 Cureus RCT 8週で睡眠の質改善+コルチゾール低下（慢性ストレス併存の場合）。\n\n妥当睡眠スタック＝夜L-テアニン200mg+Mg-Glycinate 200-400mg+グリシン3g+L-Tryptophan 500mg（or 5-HTP 50-100mg）+メラトニン 0.5-3mg（個人輸入）。\n\n睡眠衛生（光・温度・カフェイン制限・ブルーライト・運動・食事タイミング）が大前提でサプリは補助レイヤー。\n\n慢性不眠（3ヶ月以上）はCBT-I（不眠症の認知行動療法）が第一選択（Riemann 2017 J Sleep Res 欧州ガイドライン推奨度A）でサプリは補助です。',
    },
    {
      q: '効果が出るまでどのくらい？評価のタイミングは？',
      a: '【L-テアニン】急性効果＝40-60分で実感可能（Yokogoshi 1998 経口テアニンBBB通過・Hidese 2019 RCT 200mg/日×4週でPSS・PSQI改善）、慢性効果＝4週で評価（PSS・PSQI・認知機能の主観評価）の進め方。\n\n短期実感型+累積効果型のハイブリッドでフィードバック評価は両軸で記録推奨です。【マグネシウム】8-12週で評価（Boyle 2017 Nutrients SR・Eur J Clin Nutr 2020 メタ）。\n\n累積効果型でMg欠乏補完→ストレス・睡眠・血圧・インスリン抵抗性改善の中長期評価が王道。\n\n睡眠時無呼吸症候群SASは睡眠外来でPSG検査・CPAPでサプリは補助、「不眠が治る」「ストレスが消える」断定NG→「ストレス・睡眠の質・コルチゾール・α波の改善が報告」型統一が誠実な立場です。',
    },
  ],
  // ── Session F Day 12 補完 v2 バッチ 2026-05-14（並行Day 12 0440be1 で3件先取り→ユニーク貢献3件のみship・skin/muscle/hormone横断） ────
  'bakuchiol-vs-niacinamide': [
    {
      q: 'バクチオールとナイアシンアミドの違いは？',
      a: '作用機序が完全に異なる補完関係です。\n\nバクチオール（Bakuchiol）はPsoralea corylifolia（オランダビユ・補骨脂）種子由来メロテルペン。\n\nRAR/RXR非結合だがレチノール様の遺伝子発現プロファイルを示す機序（Chaudhuri 2014 Int J Cosmet Sci 機序レビュー）。\n\nDhaliwal 2019 Br J Dermatol RCT n=44 bakuchiol 0.5% twice daily vs retinol 0.5% daily ×12週でしわ・色素沈着が同等に改善+ヒリヒリ感・剥離はbakuchiol側で有意に少ない（ヘッドtoヘッド比較データの主要根拠）。\n\nBluemke 2022 Drugs Context レビューで「植物性レチノール代替（plant-based retinol alternative）」として整理。\n\nナイアシンアミド（Vitamin B3・Niacinamide）はNAD+前駆体+多方面の皮膚標的＝①セラミド合成促進+TEWL抑制（バリア機能）+②メラノソーム転送阻害（色素沈着）（Hakozaki 2002 Br J Dermatol RCT）+③皮脂分泌調整（毛穴・脂性肌）+④抗炎症（赤み・酒さ補助）+⑤コラーゲン合成促進・抗糖化の4-5方面。\n\nBissett 2005 Dermatol Surg RCT 5%×8週で色素沈着・小じわ・皮脂・バリア機能の4方面改善。\n\nSoma 2005 Int J Dermatol色素沈着レビュー。\n\n論文蓄積数百本でhalo of evidence確立。\n\n作用ターゲット差＝バクチオール=レチノール代替（しわ・色素沈着・ターンオーバー）vs ナイアシンアミド=4方面多機能（バリア・色素沈着・毛穴・抗炎症）で経路独立・併用合理。\n\n両者ともpH適合・刺激低・妊娠中授乳中OK（🚨レチノール/トレチノイン妊娠中NG ACOG 2024の代替軸として最強の組み合わせ）。\n\n化粧品メーカー視点でも「妊娠中・敏感肌・初心者の抗老化スターターキット」として黄金ペアです。',
    },
    {
      q: 'バクチオール・ナイアシンアミドはどちらを優先？妊娠中・敏感肌・初心者の順序は？',
      a: '目的・段階別の使い分けの入り方です。\n\n【妊娠中・授乳中・妊娠計画中】＝両者併用主軸（🚨レチノール/トレチノイン/タザロテン/アダパレン妊娠中NG ACOG 2024 guidance催奇形性懸念の絶対代替軸）。\n\n朝ナイアシンアミド5%+VC15%+夜バクチオール0.5-1%+保湿+SPF50が現実的安全スタック。\n\nBluemke 2022 レビューで「妊娠中・授乳中の抗老化レジメンとしてバクチオールが最有力代替成分」と整理。\n\n【敏感肌・酒さ・アトピー・初心者】＝ナイアシンアミド優先導入（Bissett 2005 5%×8週で4方面改善・刺激リスク最少）。\n\n3-4週適応後にバクチオール0.5%夜のみ追加+段階的にバクチオール1%二回/日が無難階段。\n\nThe Ordinary Niacinamide 10% + Zinc 1%（¥800-1,200）+ The Ordinary Bakuchiol 0.5%（¥1,200-1,800）等の入門スタック。\n\n【既存ユーザー・抗老化深化】＝ナイアシンアミド5-10%維持+バクチオール1%夜+将来的にレチノール段階導入（敏感肌で耐性築いた後）。\n\nバクチオール→低濃度レチノール（0.1-0.25%）→中濃度（0.5%）→高濃度（1%）or レチナールへ段階移行も現実的な選び方。\n\n【予防・全方位抗老化】＝朝ナイアシンアミド5%+VC15%+SPF50/夜バクチオール1%+ペプチド+ヒアルロン酸+セラミドの4軸の組み立て。\n\n月コスト ¥2,000-8,000/月が現実解です。\n\n「シワが消える」「肌が若返る」「アンチエイジング（断定）」断定NG（薬機法/景表法）→「皮膚スコア・しわ・色素沈着・バリア機能改善が報告」型統一が整合的。\n\n深いシワ・光老化・肝斑・酒さ・脂漏性皮膚炎・アトピー性皮膚炎は皮膚科診断+処方治療が第一選択でサプリ・化粧品は補助です。',
    },
    {
      q: 'バクチオール・ナイアシンアミドの有効濃度・形態・タイミングは？',
      a: 'バクチオール濃度＝0.5-1%が王道有効濃度。\n\nDhaliwal 2019 Br J Dermatol RCT 0.5% twice daily×12週でレチノール0.5%と同等のしわ・色素沈着改善（ヘッドtoヘッド主要根拠）。\n\nChaudhuri 2014 In vivo試験 1%でしわ・小じわ・色素沈着・弾力改善。\n\n0.5%が論文標準濃度+1%が上限ラインで1.5-2%以上は刺激リスク+効果プラトー。\n\nSytheon社（米国）の特許成分Sytenol® Aが論文用量再現の主要原料規格。\n\nSytheon® Sytenol A配合品＝Beauty Pie Bakuchiol Smoothing Serum 1% / Indeed Labs Bakuchiol Reface Pads / The Ordinary Bakuchiol 0.5%（Sytenol® A使用明示）等が無難な選び方。\n\n「Psoralea corylifolia extract」表示のみで規格不明品は活性成分含量バラつきで効果不確実、朝夜どちらでもOK（光分解低・光安定性高でレチノールと逆でレチノール代替として朝使用可・朝バクチオール+夜レチノール段階移行もの組み立て）。\n\nナイアシンアミド濃度＝5-10%が現実的有効濃度（Bissett 2005 RCT 5%×8週で4方面改善・Hakozaki 2002 Br J Dermatol RCT 5%色素沈着改善・Navarrete-Solís 2011 Dermatol Res Pract RCT 4%肝斑改善）。\n\n5%が論文標準・10%が上限ラインで20%以上は刺激+赤み報告。\n\nThe Ordinary Niacinamide 10% + Zinc 1%（敏感肌で稀にニキビ悪化報告あり要パッチテスト）/ Paula\'s Choice 10% Niacinamide Booster / CeraVe PM Facial Moisturizing Lotion（4%）等の組み合わせ。\n\n水溶性で形態安定+pH中性領域で朝夜どちらでもOK+レチノール・VC・AHA・BHA・ペプチド全て併用OK+「VC外用とナイアシンアミドの同時併用は古くは"ナイアシン⇄ニコチン酸変換でフラッシュ反応"懸念がありましたが現代製剤では問題なし」（Caswell 2018 J Drugs Dermatol レビューで併用合理性確認）です。\n\n実用的併用設計＝朝ナイアシンアミド5-10%+VC15%+SPF50/夜バクチオール0.5-1%+セラミド+ヒアルロン酸が黄金スタックです。',
    },
    {
      q: 'バクチオール・ナイアシンアミドの併用注意は？',
      a: '併用注意領域を踏まえた進め方です。【バクチオール】①接触皮膚炎稀に報告（Psoralea corylifolia アレルギー素因で発赤・かゆみ・パッチテスト推奨）、②光毒性懸念は理論的に限定的（Psoraleaの近縁種8-MOP/5-MOP psoralenは光毒性強いが、bakuchiol自体は光毒性ほぼなしの Burnett 2018 Int J Toxicol レビュー）、③妊娠中・授乳中OK（経皮吸収限定的+催奇形性データなしでレチノール代替軸として最有力）、④肝機能低下例は理論的注意（経口高用量での肝毒性報告がPsoralea corylifolia種子経口摂取で動物試験あり・外用は影響限定的）。\n\n⑤レチノール代替軸として段階移行（バクチオール→低濃度レチノールへ）の入り方。\n\n⑥AHA/BHA/VC/ペプチド併用OKでpH適合性高い。【ナイアシンアミド】①🚨稀に「ニキビ悪化・赤み・刺激」報告（特にThe Ordinary 10%+Zinc 1%形態で個人差レイヤー・敏感肌は5%以下から段階導入推奨）、②妊娠中・授乳中OK（経皮吸収限定的+ACOG 2024で安全レイヤー）。\n\n③経口高用量ナイアシン（>500mg/日）でフラッシュ・肝機能注意（外用は影響なし・経口は別レイヤー）。\n\n④VC外用との同時併用は現代製剤では問題なし（Caswell 2018 レビュー）。\n\n⑤レチノール・AHA・BHA・ペプチド全て併用OK、⑥稀に光感受性報告で朝使用時はSPF30+ PA+++必須。\n\n【併用合理】＝①朝ナイアシンアミド5-10%+VC15%+SPF50+保湿（多軸抗老化+バリア+UV防御）。\n\n②夜バクチオール0.5-1%+ペプチド+セラミド+ヒアルロン酸（レチノール代替の安全スタック）。\n\n③段階導入：ナイアシンアミド→バクチオール→（敏感肌耐性築いた後）低濃度レチノールが無難な順番。\n\n④🚨レチノール/トレチノイン妊娠中NG ACOG 2024の代替軸として黄金ペア+🚨経口イソトレチノイン服用中も外用レチノール禁忌でバクチオール代替+🚨BPO（過酸化ベンゾイル）併用注意（ナイアシンアミドはBPO併用OK・バクチオールはpH適合で大きな問題なし）。\n\n「シミが消える」「シワが消える」「肌が若返る」「アンチエイジング（断定）」断定NG（薬機法/景表法）→「皮膚スコア・しわ・色素沈着・バリア機能改善が報告」型統一が整合的。\n\n深いシワ・光老化・肝斑・酒さ・脂漏性皮膚炎・悪性黒色腫鑑別が必要な色素沈着・アトピー性皮膚炎は皮膚科診断+処方治療が第一選択でサプリ・化粧品は補助です。',
    },
    {
      q: '効果が出るまでどのくらい？レチノールに移行すべきタイミングは？',
      a: '12週で評価+長期累積効果型が無難フィードバック設計です。【バクチオール】12週で評価（Dhaliwal 2019 Br J Dermatol RCT 0.5% twice daily×12週でしわ・色素沈着改善・Chaudhuri 2014 In vivo試験 1%×12週で皮膚改善）。\n\n評価指標は皮膚スコア記録（しわ深さ・色素沈着面積・テクスチャー・キメ・主観評価・刺激度）、最低3ヶ月以上の継続評価。【ナイアシンアミド】8-12週で評価（Bissett 2005 RCT 5%×8週で4方面改善・Hakozaki 2002 RCT 5%×8週で色素沈着改善・Navarrete-Solís 2011 RCT 4%×8週で肝斑改善）。\n\n評価指標は皮膚スコア+TEWL+水分量+主観評価（しわ・キメ・くすみ・トーン・毛穴・皮脂・刺激度）、最低2-3ヶ月以上の継続評価。【両者併用】12週評価+症状記録が王道フィードバック設計、改善なければ①レチノールへの段階移行＝バクチオール 1% 6ヶ月以上適応後 → 低濃度レチノール 0.1-0.25% 週2-3回（サンドイッチ法）→ 0.5%毎日 → 1.0% or レチナール 0.05-0.1% → 皮膚科処方トレチノイン 0.025-0.05%検討の階段。\n\n②皮膚科受診（深いしわ・光老化・肝斑・酒さ・後天性メラノサイトーシス・悪性黒色腫鑑別）、③皮膚科の領域治療＝①トレチノイン外用（処方・夜のみ・催奇形性で妊娠中NG）+②ハイドロキノン4%外用（処方・肝斑・色素沈着）+③トラネキサム酸経口（処方・肝斑）+④Qスイッチルビーレーザー・ピコセカンドレーザー（老人性色素斑・後天性メラノサイトーシス）+⑤ボトックス・ヒアルロン酸注射（深いシワ・自費診療）+⑥ケミカルピーリング（コウジ酸・グリコール酸・TCA）+⑦サンスクリーン徹底、④紫外線対策の徹底（Mahmoud 2010 J Invest Dermatol RCT サンスクリーンSPF50+×3ヶ月で色素沈着改善は論文蓄積最厚の保存治療）。\n\n⑤生活軸（喫煙・栄養・睡眠・運動・ストレス）見直しが次の段階。\n\n「シワが消える」「シミが消える」「肌が若返る」「アンチエイジング（断定）」断定NG→「皮膚スコア・しわ・色素沈着・バリア機能改善が報告」型統一が薬機法整合的。\n\n深いシワ・光老化・肝斑・酒さ・後天性メラノサイトーシス・悪性黒色腫鑑別が必要な色素沈着は皮膚科診断+治療が第一選択でサプリ・化粧品は補助。\n\n化粧品メーカー視点では「妊娠中・敏感肌・初心者の抗老化スターターキット」として黄金ペア+段階的にレチノールへ移行を整理した内容です。',
    },
  ],
  'creatine-vs-l-citrulline': [
    {
      q: 'クレアチンとL-シトルリンの違いは？',
      a: '作用機序が完全に異なる補完関係です。\n\nクレアチン（Creatine）は肝臓・腎臓・膵臓でアミノ酸（アルギニン+グリシン+メチオニン）から合成+食事（赤身肉・魚）由来。\n\n骨格筋内でクレアチンリン酸（PCr）→ATP再合成（短時間高強度運動の主要エネルギー源）が機序。\n\nKreider 2017 J Int Soc Sports Nutr Position Statementでクレアチンモノハイドレート5g/日が現実的維持用量+ローディング20g/日×5-7日で筋内Cr貯蔵量飽和+Branch 2003 Int J Sport Nutr Exerc Metab メタ解析 96 RCTでレジスタンス運動パフォーマンス+1.0-1.4kg筋量増加。\n\n500本以上のRCT累積で「最も研究されたエルゴジェニックエイド」+Buford 2007 J Int Soc Sports Nutr 安全性レビューで長期使用安全プロファイル良好。\n\nSmith-Ryan 2021 Nutrients高齢者サルコペニア対策レビューでも有効性確認。\n\nL-シトルリン（L-Citrulline）はスイカ・きゅうり等ウリ科由来非タンパク質アミノ酸。\n\n腸管通過→腎臓でL-アルギニンに変換→NO（一酸化窒素）合成→血管拡張+血流増加+乳酸クリアランス促進+成長ホルモン分泌が機序。\n\nPérez-Guisado 2010 J Strength Cond Res RCT シトルリンマレート8g単回でレジスタンス運動反復回数+52.9%+筋肉痛軽減。\n\nSuzuki 2016 J Int Soc Sports Nutr RCT L-シトルリン2.4g/日×7日でサイクリング時間-1.5%（短縮）+主観的疲労感改善。\n\nWax 2015 J Strength Cond Res プレワーク用途。\n\n作用ターゲット差＝クレアチン=ATP再合成（短時間高強度パワー・筋量増加・累積効果型）vs シトルリン=NO/血流（パンプ・持久力・短時間効果）で経路独立・併用合理。\n\nプレワーク用途でクレアチン+シトルリンマレート+βアラニン+カフェインの4成分スタックを組み立てた流れです。',
    },
    {
      q: 'クレアチン・シトルリンはどちらを優先？筋トレ目的別の優先順位は？',
      a: '目的別の使い分けの流れです。\n\n【筋量増加・筋力向上（高重量レジスタンス・パワーリフティング・ボディビル）】＝クレアチン主軸（Branch 2003 メタ 96 RCT+1.0-1.4kg筋量増加・Kreider 2017 Position Statement・Rawson 2003 J Strength Cond Res メタで筋力+8%・筋量+1.3kg）、シトルリンは補助。\n\nクレアチンモノハイドレート5g/日が無難維持用量。\n\n月コスト Now Foods Creatine Monohydrate 100% Pure ¥1,200-1,800/月が現実的。\n\n【パンプ感・持久力・有酸素運動・サイクリング・ランニング】＝シトルリン主軸（Pérez-Guisado 2010 RCT シトルリンマレート8g単回で反復回数+52.9%・Suzuki 2016 RCT 2.4g/日×7日で持久力改善・Bailey 2015 Med Sci Sports Exerc 2.4g/日で運動効率改善）。\n\nシトルリンマレート6-8g単回プレワーク or 維持2-3g/日が王道。\n\n月コスト Now Foods Citrulline Malate Powder ¥2,500-4,000/月。\n\n【プレワーク総合・両軸介入】＝両者併用主軸（クレアチン5g/日（毎日）+シトルリンマレート6-8gプレワーク+βアラニン3-6g/日+カフェイン200-400mgの4成分スタックが現実的。\n\nTrexler 2015 J Int Soc Sports Nutr Position Statement プレワーク）。\n\n月コスト計¥4,000-7,000/月。\n\n【高齢者・サルコペニア対策・回復力強化】＝クレアチン主軸（Smith-Ryan 2021 Nutrients 高齢者レジスタンス運動+クレアチン5g/日で筋量・筋力・身体機能改善・骨密度温存仮説）。\n\nシトルリンは血流・NO経路で副軸。\n\n【女性・初心者・体重増加を避けたい層】＝クレアチンの「水分保持で体重+1-2kg」は懸念ポイント（ただし筋内グリコーゲン+水分貯蔵で筋細胞内水分増加が機序+体脂肪増加ではない）。\n\nシトルリン優位+クレアチン低用量3g/日も実用的な選択肢。\n\n化粧品メーカー視点＝筋量維持はサルコペニア予防+基礎代謝維持+姿勢保持+QOL維持の長期投資+「マッチョになる」訴求は男性向けプロテイン+クレアチン路線・女性層は「身体機能+QOL+老化対策」訴求が無難+「筋肉モリモリ」「ムキムキ」断定NG（薬機法/景表法）→「筋力・筋量・身体パフォーマンス・運動能力改善が報告」型統一が整合的です。',
    },
    {
      q: 'クレアチン・シトルリンの用量・形態・タイミングの選び方は？',
      a: 'クレアチン用量＝5g/日（維持用量）or ローディング20g/日×5-7日→維持5g/日の段階構成。\n\nKreider 2017 Position Statementで「クレアチンモノハイドレート（CrM・Creatine Monohydrate）が論文上第一選択」+「他形態（HCl・ナイトレート・エチルエステル・キレート型）は新規でCrMを凌駕するエビデンスなし」結論。\n\nCreapure®（ドイツAlzChem社特許製法・CrM 99.99%純度+不純物管理規格）が論文用量再現の主要原料、Creapure®配合品＝Now Foods Creatine Monohydrate 100% Pure (Creapure®) / Optimum Nutrition Micronized Creatine Powder (Creapure®) / Jarrow Formulas Creatine Monohydrate (Creapure®)等が王道。\n\n「クレアチン配合」表示のみで規格不明品はバラつき+不純物リスク（Creapure®以外の中国産は不純物検出歴）、摂取タイミング＝運動後+食事と同時（糖質+インスリン）が筋内取り込み最大化（Cribb 2006 Med Sci Sports Exerc）、水分1.5-2L/日でクレアチン水和+腎機能負担分散。\n\nシトルリン用量＝6-8g単回プレワーク or 維持2.4-3g/日が王道維持用量。\n\nPérez-Guisado 2010 RCT シトルリンマレート8g単回でレジスタンス運動反復+52.9%・Suzuki 2016 RCT L-シトルリン2.4g/日×7日で持久力改善、形態別優先順位＝①シトルリンマレート（L-Citrulline Malate・CM・通常1:1 or 2:1比）= プレワーク用途+リンゴ酸（マレート）でTCA回路+乳酸クリアランス（Trexler 2015 Position Statement）。\n\n②純粋L-シトルリン（L-Citrulline）= 維持用量+持久力サポート。\n\n③L-アルギニン（直接NO前駆体）は経口で大部分が肝臓Arg酵素で分解されL-シトルリンよりNO上昇限定的（Schwedhelm 2008 Br J Clin Pharmacol）+L-シトルリン経口→腎臓Arg合成→NO産生が現実的経路、摂取タイミング＝プレワーク30-60分前（NO上昇ピーク+血流増加+パンプ）+空腹時で吸収速度上がる。\n\n現実的併用設計＝クレアチン5g/日（運動後+食事）+シトルリンマレート6-8gプレワーク+βアラニン3-6g/日+カフェイン200-400mgプレワーク+水分1.5-2L/日が4成分スタックです。',
    },
    {
      q: 'クレアチン・シトルリンの併用注意は？',
      a: '併用注意領域を踏まえた進め方です。【クレアチン】①水分保持で体重+1-2kg（筋内グリコーゲン+水分貯蔵で筋細胞内水分増加が機序+体脂肪増加ではない）。\n\n②胃腸障害（嘔気・腹部膨満・下痢）で水分1.5-2L/日+食事と同時+分割摂取（5g×2回/日）で軽減、③稀に筋けいれん・脱水（高用量+水分不足）。\n\n④🚨腎機能低下例（eGFR<60・透析患者）caution（腎機能データ蓄積で健常人は安全プロファイル良好・Pline 2005 Ann Pharmacother レビュー・Lopez 2009 J Athl Train メタで腎機能影響なしだが既存腎疾患・eGFR<60は腎臓内科判断下）。\n\n⑤糖尿病・GFR低下は念のためモニター、⑥肝機能影響データなしで長期使用安全。\n\n⑦妊娠中・授乳中は標準的安全性データ限定で産科医相談下（理論的に安全レイヤー）。\n\n⑧クレアチン+カフェイン併用は古典的に「効果相殺懸念」報告（Vandenberghe 1996）だが近年RCTで否定的（Trexler 2016 J Int Soc Sports Nutr メタで効果相殺なし）。【シトルリン】①🚨降圧薬caution（血圧低下作用報告・降圧薬服用中で血圧低下増強の可能性 Wong 2016 Br J Nutr メタ）。\n\n②🚨PDE5阻害薬（バイアグラ®・シアリス®・レビトラ®）併用caution（NO/cGMP経路重畳で過度の血圧低下+めまい+持続勃起症リスク・処方医相談）。\n\n③🚨硝酸薬（ニトログリセリン・ISDN）併用禁忌（NO/cGMP経路重畳で過度の血圧低下+ショックリスク・絶対回避）。\n\n④抗血小板薬・抗凝固薬caution（理論的影響限定的だが手術前1-2週間中止推奨）、⑤妊娠中・授乳中はデータ限定で産科医相談下、⑥胃腸障害稀で食事と同時摂取で軽減。\n\n⑦ヘルペス活動性期caution（理論的にアルギニン代謝経路でヘルペスウイルス複製サポート懸念・Griffith 1981 Dermatologica古典報告でリジン代替推奨ですがエビデンス限定的）。\n\n【両者併用】＝①プレワーク総合スタック（クレアチン+シトルリンマレート+βアラニン+カフェイン）はTrexler 2015 Position Statement準拠、②水分1.5-2L/日厳守。\n\n③腎機能・肝機能・血圧定期モニター。\n\n④高齢者・既存疾患層は医師相談前提。\n\n⑤プロテイン（ホエイ・カゼイン）併用合理（Cribb 2006 Med Sci Sports Exerc・Antonio 2017 J Int Soc Sports Nutr）。\n\n「マッチョになる」「ムキムキになる」「100kg挙げられる」断定NG（薬機法/景表法）→「筋力・筋量・身体パフォーマンス・運動能力改善が報告」型統一が整合的。\n\n運動パフォーマンスの本格改善は遺伝・トレーニング・栄養・睡眠・回復・継続性の多軸介入でサプリは補助という前提が妥当な範囲です。',
    },
    {
      q: '効果が出るまでどのくらい？評価のタイミングは？',
      a: '【クレアチン】急性効果＝ローディング後5-7日で筋内Cr貯蔵量飽和+1RM・反復回数改善（Hultman 1996 J Appl Physiol ローディング20g/日×5日で筋内Cr+20%）。\n\n中長期効果＝4-12週で筋力+8%・筋量+1.3kg（Branch 2003 メタ 96 RCT・Rawson 2003 メタ）。\n\n評価指標は1RM（最大挙上重量）・8-12RMの反復回数・除脂肪体重（DXA・BIA）・筋周囲径、最低8-12週の継続評価。【シトルリン】急性効果＝摂取30-60分後にNO上昇・血流増加・パンプ実感（Suzuki 2017 J Int Soc Sports Nutr 8g摂取1時間後血漿シトルリン+ピーク）。\n\n中長期効果＝1-2週で持久力・運動効率改善（Suzuki 2016 RCT 2.4g/日×7日でサイクリング時間短縮）。\n\n評価指標はプレワーク主観評価（パンプ感・反復回数・運動疲労感・回復感）+持久力テスト（VO2max・LT・タイムトライアル）。【両者併用】4-12週評価+症状記録（筋力1RM・8-12RM反復回数・除脂肪体重・筋周囲径・持久力・パンプ感・運動疲労感・回復感・体重変化・体組成）が無難フィードバック設計、改善なければ①トレーニング負荷見直し（漸進性過負荷の原則・ボリューム・強度・頻度・休息）。\n\n②栄養軸（タンパク質1.6-2.2g/kg体重/日・カロリー収支・炭水化物タイミング）。\n\n③睡眠（7-9時間/晩・成長ホルモン分泌タイミング）。\n\n④回復（連続トレーニング日数・アクティブリカバリー・ストレッチ・マッサージ）、⑤医療領域＝変形性関節症・腱鞘炎・椎間板ヘルニア・五十肩・足底筋膜炎は整形外科+理学療法/スポーツ医学/リハビリ・甲状腺機能低下症・男性更年期障害（LOH症候群）はテストステロン低下で筋量減少が内分泌内科でTSH/総テストステロン/遊離テストステロン測定+治療検討・サルコペニア（加齢性筋減少症）は栄養+運動+リハビリの多軸介入の入り方。\n\n⑥生活軸（喫煙・大量飲酒・慢性ストレス・睡眠不足）見直しが次の段階。\n\n「マッチョになる」「ムキムキになる」「プロアスリート級になる」断定NG→「筋力・筋量・身体パフォーマンス・運動能力改善が報告」型統一が薬機法整合的。\n\nプロアスリート・競技スポーツ選手は管理栄養士・スポーツ医・トレーナーチームの統合管理が王道でサプリは補助レイヤー。\n\n化粧品メーカー視点では筋量維持はサルコペニア予防+基礎代謝維持+姿勢保持+QOL維持の長期投資+減量・運動・タンパク質の生活軸介入が論文蓄積最厚+サプリ単独で短期奇跡的変化は困難+長期累積効果型が妥当な範囲です。',
    },
  ],
  'equol-vs-collagen-peptide': [
    {
      q: 'エクオールとコラーゲンペプチドの違いは？',
      a: '作用機序が完全に異なる補完関係です。\n\nエクオール（Equol・S-(-)-equol）は大豆イソフラボン（ダイゼイン）の腸内細菌代謝産物でエストロゲン受容体β（ERβ）選択的弱結合作動薬。\n\nSetchell 2002 J Nutrで「エクオール産生菌保有者は日本人40-60%・欧米人20-30%」+「ダイゼイン経口摂取しても産生菌非保有者は血中エクオール上がらない」腸内細菌依存性確立。\n\nLu 2014 Menopause メタ解析 RCT エクオール 10mg/日×12週でホットフラッシュ・骨密度・肌弾力改善傾向+Aso 2012 J Womens Health RCT エクオール 30mg/日×12週でしわ・骨密度改善+Aso 2013 Menopause更年期症状改善。\n\nCrawford 2013 Climacteric メタで更年期血管運動症状軽減、作用ターゲット＝ERβ選択性で乳腺・子宮ERα刺激リスク低い+ホットフラッシュ・骨密度・肌弾力・更年期症状の多軸介入が機序。\n\nコラーゲンペプチド（Collagen Peptides・Hydrolyzed Collagen）は動物由来（魚/豚/牛/鶏）コラーゲンタンパク質を酵素加水分解した低分子ペプチド。\n\nProksch 2014 Skin Pharmacol Physiol RCT n=114 Verisol® 2.5-5g/日×8週で皮膚弾力・水分量改善+Asserin 2015 J Cosmet Dermatol RCT n=106 Peptan® 10g/日×8週でしわ深さ改善、作用機序＝Pro-Hyp/Hyp-Glyペプチドが小腸吸収→線維芽細胞活性化シグナル→真皮コラーゲン合成促進（Iwai 2005 J Agric Food Chem/Shigemura 2009/Asai 2020 Sci Rep機序確立）、ホルモン作用なしで構造補助が特徴。\n\n作用ターゲット差＝エクオール=ホルモン補助（更年期・骨密度・肌弾力の多軸ERβ経路）vs コラーゲンペプチド=構造補助（真皮コラーゲン合成シグナル経路）で経路独立・併用合理。\n\n30-50代女性の重なる悩み（更年期+肌弾力低下+骨密度低下）への黄金スタックとして妥当。\n\n月コスト ¥3,000-7,000/月が現実解です。',
    },
    {
      q: 'エクオール・コラーゲンペプチドはどちらを優先？年代・悩み別の優先順位は？',
      a: '年代・悩み別の使い分けが無難な順番です。\n\n【40-50代更年期世代・ホットフラッシュ・倦怠感・気分変動・睡眠障害・骨密度低下】＝エクオール主軸（Lu 2014 メタ ホットフラッシュ・骨密度改善・Aso 2012/2013 更年期症状改善・Crawford 2013 血管運動症状軽減）。\n\nエクオール 10-30mg/日が現実的維持用量。\n\nEQUELLE/エクエル®（大塚製薬・10mg/日）が国内処方薬扱いではなく機能性表示食品・サプリ流通。\n\nAglycone Max®（小林製薬）/エクオール&ブラックジンジャー（DHC）/エクオール+ラクトビオン酸（小林製薬）等が無難な選び方。\n\n月コスト ¥3,000-5,000/月。\n\n【20-50代肌弾力・しわ・水分量・コラーゲン合成サポート】＝コラーゲンペプチド主軸（Proksch 2014 RCT Verisol® 2.5-5g/日×8週で皮膚弾力・水分量改善・Asserin 2015 RCT Peptan® 10g/日×8週でしわ深さ改善・Inoue 2016 メタ皮膚改善方向一貫）。\n\nVerisol®/Peptan®/SBP-2®等の規格明示品が論文用量再現の前提。\n\nSports Research Collagen Peptides/Vital Proteins Collagen Peptides/明治アミノコラーゲン等。\n\n月コスト ¥2,000-5,000/月。\n\n【更年期+肌対策両軸（40-50代女性）】＝両者併用主軸（経路独立で相互打ち消しなし・エクオール=更年期+骨密度+肌弾力（ERβ経路）+コラーゲンペプチド=真皮コラーゲン合成（構造経路）の補完関係）。\n\n月コスト計¥5,000-10,000/月が現実解。\n\n化粧品メーカー視点では「30代後半から始める更年期・肌対策の実用的スターターキット」として位置づけ。\n\n【20-30代予防・将来の更年期投資】＝コラーゲンペプチド優位+エクオール検討（エクオール産生菌保有確認が前提・尿中エクオール検査キット（ソイチェック®・大塚製薬）で確認）。\n\n産生菌非保有者は大豆イソフラボン摂取してもエクオール変換されず効果限定的で直接エクオール摂取が無難。\n\n【60代以上・閉経後5-10年経過】＝両者併用+ビタミンD+カルシウム+ビスホスホネート/SERM（婦人科処方薬）+運動の多軸介入（閉経後骨密度低下対策は婦人科・整形外科第一選択）。\n\n化粧品メーカー視点では更年期+老化対策の長期投資を整理した内容です。\n\n「閉経が止まる」「若返り」「不老」「アンチエイジング（断定）」断定NG（薬機法/景表法）→「ホットフラッシュ・骨密度・肌弾力・しわ・水分量改善が報告」型統一が整合的です。',
    },
    {
      q: 'エクオール・コラーゲンペプチドの用量・形態・タイミングの選び方は？',
      a: 'エクオール用量＝10-30mg/日が王道維持用量。\n\nLu 2014 メタ 10mg/日×12週・Aso 2012 RCT 30mg/日×12週が主要根拠。\n\nEQUELLE/エクエル®（大塚製薬・10mg/日・国内機能性表示食品）が標準。\n\nAglyMax®（日本新薬・大豆胚芽乳酸菌発酵物）/Sequellete™（米国SOY Connection規格）/小林製薬エクオール+ラクトビオン酸等の組み合わせ。\n\n「大豆イソフラボン配合」訴求のみで産生菌非保有者は変換されず効果限定的+「エクオール配合」明示+10mg/日基準推奨、摂取タイミング＝朝食後 or 夕食後（脂溶性で食事と同時で吸収率向上）、エクオール産生菌保有確認＝ソイチェック®（大塚製薬・尿検査キット ¥4,000-5,000）で事前確認が無難な順番。\n\n産生菌非保有者は直接エクオール摂取+産生菌保有者は大豆イソフラボン摂取（味噌・納豆・豆腐・豆乳・大豆製品）でも血中エクオール上がるで生活軸介入も併存合理。\n\nコラーゲンペプチド用量＝2.5-10g/日が現実的維持用量。\n\nProksch 2014 RCT Verisol® 2.5-5g/日×8週・Asserin 2015 RCT Peptan® 10g/日×8週・Borumand 2014 5g/日RCTが主要根拠、規格明示品＝①Verisol®（GELITA社・分子量2,000Da・Bioactive Collagen Peptides®・特定ペプチド配列規格）皮膚弾力・水分量・しわ改善RCT根拠。\n\n②Peptan®（Rousselot社・分子量2,000-5,000Da）皮膚弾力・水分量改善RCT根拠。\n\n③SBP-2®（Strecker Biotech社）皮膚バリア機能RCT根拠。\n\n④UC-II®（Lonza社・変性Type IIコラーゲン・40mg/日・関節特化）は別カテゴリ、原料種差＝①魚由来（Marine Collagen・Verisol F®）= Pro-Hyp含有量高+消化吸収速い+魚アレルギー禁忌。\n\n②豚由来（Porcine・Peptan P®）= 人皮膚アミノ酸組成類似+ハラール/コーシャ制限。\n\n③牛由来（Bovine・Peptan B®）= Type I+III共存+BSEフリー国家由来推奨（Grass-fed USA/NZ/Argentina）。\n\n④鶏由来（UC-II®）= Type II主体+ジョイント特化、摂取タイミング＝朝食前 or 就寝前空腹時+ビタミンC 500-1,000mg併用（ビタミンCはコラーゲン合成補因子・Pinnell 2003）、継続使用＝8-12週以上の累積効果型で短期で諦めない継続性を組み立てた流れです。\n\n現実的併用設計＝朝エクオール10mg（食後）+夕コラーゲンペプチド5-10g（食前 or 就寝前空腹時）+ビタミンC 500-1,000mg+ビタミンD 1,000-2,000IU+カルシウム600mg（更年期+閉経後骨密度対策）が黄金スタックです。',
    },
    {
      q: 'エクオール・コラーゲンペプチドの併用注意・妊娠中は？',
      a: '併用注意領域を踏まえた進め方です。【エクオール】①🚨ホルモン感受性疾患（乳がん既往・乳がん家族歴ハイリスク・子宮筋腫・子宮内膜症・子宮内膜異型増殖症・卵巣ホルモン感受性腫瘍）caution（ERβ選択性で乳腺ERα刺激リスク低いが、ホルモン感受性疾患既往は婦人科・腫瘍内科判断下・Magee 2011 Womens Health メタでエクオール乳がんリスク中立的+一部研究でリスク低下傾向）。\n\n②🚨妊娠中・妊娠計画中・授乳中NG（ホルモン作用懸念・胎児発達への影響データ不足で産科医判断下）。\n\n③タモキシフェン・アロマターゼ阻害薬（アナストロゾール・レトロゾール）併用caution（ホルモン療法中の追加エストロゲン様作用は腫瘍内科判断下）。\n\n④経口避妊薬・HRT（ホルモン補充療法）併用caution（重畳のホルモン作用で婦人科相談）。\n\n⑤甲状腺機能低下症caution（大豆イソフラボン経口摂取で甲状腺ホルモン吸収阻害+合成阻害報告・甲状腺薬と2-4時間ずらす・甲状腺機能定期モニター）。\n\n⑥稀に消化器症状（腹部膨満・便秘・下痢）で個人差レイヤー。【コラーゲンペプチド】①🚨原料種アレルギー（魚由来→魚アレルギー禁忌・豚由来→ハラール/コーシャ制限・牛由来→宗教的制限+BSE懸念国家回避）、②腎機能低下例caution（高タンパク質負荷でCKDステージ3以上は腎臓内科判断下）、③高プリン体ではない（プリン体含量低くプリン体制限対象外）。\n\n④妊娠中・授乳中ほぼ安全レイヤー（経口高品質コラーゲンペプチドは食品添加物レイヤーでACOG 2024 guidanceで安全領域・ただし高用量10g/日超は産科医相談下）、⑤稀に消化器症状で食事と同時摂取で軽減。\n\n⑥併用薬との相互作用報告ほぼなし。\n\n【両者併用】＝①ビタミンC 500-1,000mg併用合理（コラーゲン合成補因子・Pinnell 2003）。\n\n②ビタミンD 1,000-2,000IU+カルシウム600mg併用合理（閉経後骨密度対策）。\n\n③タンパク質1.0-1.2g/kg体重/日の食事ベースが大前提（コラーゲンペプチドは食事タンパク質の補完レイヤー）。\n\n④🚨乳がん既往・子宮筋腫・子宮内膜症・甲状腺疾患は婦人科・腫瘍内科判断下。\n\n⑤閉経後5年以上の高齢者層はビスホスホネート（処方）+SERM（処方）+カルシウム+ビタミンD+運動の多軸介入の入り方でサプリは補助レイヤー。\n\n「閉経が止まる」「若返り」「不老」「飲む化粧水」「飲むコラーゲン」「アンチエイジング（断定）」断定NG（薬機法/景表法）→「ホットフラッシュ・骨密度・肌弾力・しわ・水分量改善が報告」型統一が整合的。\n\n更年期障害（重度ホットフラッシュ・骨粗鬆症・気分障害・性交障害）は婦人科診断+HRT/SERM/SSRI処方治療が第一選択でサプリは補助という前提が妥当な範囲です。',
    },
    {
      q: '効果が出るまでどのくらい？更年期障害のときはどう動く？（婦人科第一選択）',
      a: '8-12週評価+長期累積効果型が無難フィードバック設計です。【エクオール】8-12週で評価（Lu 2014 メタ 12週・Aso 2012 RCT 12週・Crawford 2013 メタ 8-12週）。\n\n評価指標は更年期症状スコア（Kupperman指数・Greene Climacteric Scale）・ホットフラッシュ頻度・骨密度（DXA・年1回）・肌弾力（Cutometer・主観評価）・気分変動・睡眠の質、最低3ヶ月以上の継続評価。\n\n短期改善なくても継続8-12週で評価が論文用法。【コラーゲンペプチド】8-12週で評価（Proksch 2014 RCT 8週・Asserin 2015 RCT 8週・Borumand 2014 RCT 8週・Inoue 2016 メタ8-12週主流）。\n\n評価指標は皮膚スコア（弾力・水分量・しわ深さ・キメ・主観評価）+TEWL+真皮密度、最低2-3ヶ月以上の継続評価。【両者併用】8-12週評価+症状記録（更年期症状スコア・ホットフラッシュ頻度・気分変動・睡眠・肌弾力・しわ・水分量・骨密度年1回）が王道フィードバック設計、改善なければ①婦人科受診（重度更年期障害・ホットフラッシュ7-10回/日以上・気分障害・性交障害・骨粗鬆症は婦人科診断+治療）、②婦人科第一選択治療＝①HRT（ホルモン補充療法・エストロゲン+プロゲスチン併用・子宮全摘後はエストロゲン単独）= 重度ホットフラッシュ・骨粗鬆症の第一選択（NAMS 2022 Position Statement）+乳がん家族歴・血栓症既往・心血管疾患既往はリスク評価下で個別判断・10年使用までの長期データ。\n\n②SERM（選択的エストロゲン受容体モジュレーター・ラロキシフェン Evista®・バゼドキシフェン）= 骨密度+脂質改善+乳がんリスク低下+ホットフラッシュ悪化の可能性で個別判断。\n\n③SSRI/SNRI（パロキセチン Brisdelle® FDA承認・ベンラファキシン）= 非ホルモン療法でホットフラッシュ軽減。\n\n④ガバペンチン・クロニジン= 補助療法。\n\n⑤ビスホスホネート（アレンドロン酸・リセドロン酸・ゾレドロン酸）= 骨粗鬆症第一選択。\n\n⑥デノスマブ（プラリア®）= 骨粗鬆症SERMで効果不十分例。\n\n⑦テリパラチド（フォルテオ®）= 重度骨粗鬆症+骨折既往、③心療内科（重度気分障害・うつ症状・不眠・不安はSSRI/SNRI+心理療法）、④整形外科（圧迫骨折・大腿骨頸部骨折既往は整形外科専門治療）、⑤生活軸（運動・タンパク質1.0-1.2g/kg体重/日・ビタミンD・カルシウム・禁煙・節酒・大豆食品）。\n\n⑥乳がんスクリーニング・子宮頸がん検診・骨粗鬆症検診（年1回マンモグラフィー・骨密度測定）の定期検査が前提。\n\n「閉経が止まる」「若返り」「不老」「飲む化粧水」「飲むコラーゲン」「アンチエイジング（断定）」断定NG→「ホットフラッシュ・骨密度・肌弾力・しわ・水分量改善が報告」型統一が薬機法整合的。\n\n重度更年期障害・骨粗鬆症・乳がん既往・子宮筋腫・子宮内膜症は婦人科・腫瘍内科・整形外科の診断+処方治療が第一選択でサプリは医師相談前提の補助という前提が妥当な範囲。\n\n化粧品メーカー視点では「30代後半から始める更年期・肌対策の妥当スターターキット」+長期累積効果型+生活軸（運動・栄養・睡眠・社会的接続）の多軸介入が論文蓄積最厚+サプリは補助レイヤーが現実解です。',
    },
  ],
  // ── Session F Day 13 バッチ 2026-05-14（新規2件・skin美白YMYL/joint抗炎症・並行Day 12補完v2で3件先取り回避→ユニーク貢献2件のみ） ────
  'tranexamic-acid-vs-vitamin-c-topical': [
    {
      q: 'トラネキサム酸とビタミンC外用の違いは？',
      a: '作用機序と最適な対象が異なる補完関係です。\n\nトラネキサム酸はプラスミン-プラスミノーゲン系を阻害してメラノサイト活性化シグナルを遮断する単経路抗メラニン産生成分。\n\nBala 2018 J Cosmet Dermatol メタ解析で外用2-5%×8-12週で肝斑改善。\n\nTan 2017 J Drugs Dermatol RCT 経口250mg×2回/日×3ヶ月で肝斑MASI スコア改善。\n\n1962年第一三共（旧三共）が開発した日本発の抗線溶薬で経口は処方薬扱い（トランサミン®）月経過多・術後止血・口腔粘膜炎・喉頭炎の保険適用、美白用途は適応外処方で皮膚科判断下。\n\nビタミンC外用はL-アスコルビン酸15-20%（純粋型）or 誘導体型（APPS/3-O-Ethyl Ascorbic Acid/MAP/SAP/Ascorbyl Glucoside）で5経路多機能成分＝①チロシナーゼ阻害／②ROS（活性酸素種）スカベンジ／③コラーゲン合成補因子（プロリン水酸化酵素 + リジン水酸化酵素の補酵素）／④メラニン還元（酸化型メラニン→還元型）／⑤抗炎症。\n\nPinnell 2003 Dermatol Surg RCT L-アスコルビン酸15%×12週で光老化・色素沈着改善・Humbert 2003 Exp Dermatol VC 5%×6ヶ月でしわ改善が中心エビデンス。\n\n経路が単一プラスミン阻害 vs 多経路抗酸化で完全独立。\n\n肝斑特化はトラネキサム酸主軸／老化・くすみ・コラーゲン産生総合ケアはVC主軸、併用合理（SkinCeuticals Discoloration Defense トラネキサム酸3%+ナイアシンアミド5%+カイネチン0.1%配合品で実用的複合処方）です。',
    },
    {
      q: 'トラネキサム酸 2-5% とVC 15-20% の用量・形態の選び方は？外用vs経口の使い分けは？',
      a: '用量・形態の規格明示が論文用量再現の前提です。【トラネキサム酸 外用】2-5%が論文用量再現（Bala 2018 メタ解析 + Banihashemi 2015 J Cosmet Dermatol RCT 5%×12週で肝斑改善）。\n\nSkinCeuticals Discoloration Defense (TA 3% + Niacinamide 5%) 月¥10,000 / TIA\'M My Signature Red C Serum (TA 2% + VC) / メラノCC 薬用しみ・そばかす対策美容液（ロート製薬・TA + L-アスコルビン酸2-グルコシド + その他複合） が現実的。\n\n「トラネキサム酸配合」訴求のみで濃度不明品は効果不確実。\n\nIliad® Tranexamic Acid（規格化原料）配合品が原料規格明示。【トラネキサム酸 経口】250-500mg×2-3回/日（750-1500mg/日）が論文用量再現（Tan 2017 RCT 250mg×2回×3ヶ月で肝斑改善）。\n\n🚨日本では処方薬扱い（トランサミン®・第一三共）で美白用途は適応外処方。\n\n皮膚科で肝斑診断 + 血栓既往・凝固検査・経口避妊薬・喫煙・肥満等のリスク評価後の処方、個人輸入は薬機法上慎重評価領域で本サイトは推奨しない立場。【VC外用】L-アスコルビン酸15-20%が論文用量再現（Pinnell 2003 RCT 15%×12週）でSkinCeuticals C E Ferulic (L-アスコルビン酸15% + ビタミンE + フェルラ酸) 月¥18,000 / Drunk Elephant C-Firma Day Serum / Paula\'s Choice C15 Super Booster (15%) / Obagi-C Rx System が王道。\n\nロート製薬メラノCC 薬用しみ集中対策美容液（L-アスコルビン酸2-グルコシド・誘導体型・月¥1,000）は誘導体安定性高+低刺激トレードオフでコスパ良好。\n\n誘導体形態の使い分け＝APPS（アプレシエ®・3-O-Ethyl Ascorbic Acid・MAP・SAP・Ascorbyl Glucoside）は安定性高+低刺激+浸透差。\n\nL-アスコルビン酸pH 2.5-3.5酸性で敏感肌は赤み・刺激リスク。\n\n開封後3-6ヶ月以内使用（酸化で褐色化）。\n\n現実的使用順序＝朝VC15-20% + ナイアシンアミド5-10% + SPF30+ PA+++ / 夜トラネキサム酸2-5% + ナイアシンアミド5-10% + レチノール（時間分離週2-3回）が独立3経路の積み増し設計です。',
    },
    {
      q: 'トラネキサム酸・VC外用の併用注意は？肝斑YMYLは？',
      a: '併用注意7領域を整理した内容です。【トラネキサム酸】①🚨経口は処方薬扱い・血栓既往禁忌（深部静脈血栓症 DVT・肺塞栓 PE・脳梗塞・心筋梗塞既往・抗リン脂質抗体症候群・第V因子ライデン変異・プロテインC/S欠乏症・アンチトロンビンIII欠乏症等の血栓性素因）。\n\n②🚨経口避妊薬・ホルモン補充療法HRT併用で血栓リスク重畳（婦人科判断必須）。\n\n③🚨喫煙者・肥満・40歳以上・妊娠中・産褥期は血栓リスク重畳。\n\n④抗凝固薬ワルファリン・DOAC（ダビガトラン・リバーロキサバン・アピキサバン・エドキサバン）併用は出血凝固バランス変動monitor。\n\n⑤腎機能低下例 CKDステージ3以上で用量調整必須（Cr クリアランス10-50 mL/min で50%減量・10 mL/min以下で禁忌）。\n\n⑥月経過多・不正出血の鑑別必須（子宮筋腫・子宮内膜増殖症・子宮体がん・子宮頸がん・凝固因子異常）で婦人科受診、⑦外用は全身性副作用稀だがパッチテスト推奨。【VC外用】①L-アスコルビン酸pH 2.5-3.5酸性で敏感肌・酒さ素因で赤み・刺激リスクでパッチテスト推奨、②開封後3-6ヶ月以内使用（酸化で褐色化・効果減弱）。\n\n③SkinCeuticals C E Ferulic等の純粋型は遮光ボトル+エアレスポンプ推奨。\n\n④鉄欠乏性貧血で経口VC高用量2g/日超は鉄吸収促進だが胃腸障害。\n\n⑤腎結石既往・シュウ酸尿症は経口VC高用量caution。\n\n⑥糖尿病で経口VC高用量は血糖測定干渉（in vitro）。\n\n⑦妊娠中・授乳中の外用は安全プロファイル良好。【YMYL対応 肝斑領域】「シミが消える」「肝斑が完治」「美白」断定は薬機法/景表法NG→「色素沈着スコア・MASIスコア（Melasma Area Severity Index）の改善が報告」型統一、肝斑は皮膚科の領域（外用ハイドロキノン4%処方・トラネキサム酸経口250-500mg×2回/日処方・QスイッチYAGレーザー・ピコレーザー・トレチノイン外用・コブナー反応に注意したPRP）でサプリ・化粧品は補助。\n\n急速進行する色素沈着・新規シミ・形状変化・出血・かゆみは皮膚科受診で悪性黒色腫の鑑別必須（ABCDEルール＝Asymmetry非対称・Border境界不整・Color色調不均一・Diameter直径6mm以上・Evolution変化）。\n\n深い色素沈着・後天性メラノサイトーシス・光老化は皮膚科の領域でサプリ・化粧品は補助という前提が妥当な範囲です。',
    },
    {
      q: 'トラネキサム酸・VC外用以外に併用合理な美白成分は？',
      a: '論文蓄積最厚の併用合理5成分が無難な選び方です。\n\n①ナイアシンアミド 5-10%＝Bissett 2005 Dermatol Surg RCT 5%×12週でメラノソーム転送阻害 + 4方面（色素沈着・小じわ・皮脂・バリア）改善で多機能多経路。\n\nHakozaki 2002 Br J Dermatol機序確立。\n\n②α-アルブチン 2%（ハイドロキノン α-D-グルコシド）＝Hamed 2020 J Cosmet Dermatol RCT 12週で色素沈着改善でチロシナーゼ阻害安定型（β-arbutin より徐放しない安定構造）。\n\nThe Ordinary Alpha Arbutin 2% + HA / Paula\'s Choice Alpha Arbutin Booster規格明示品。\n\n③コウジ酸 2%医薬部外品有効成分＝Yu 2018 J Cosmet Dermatol レビューでチロシナーゼ阻害（2003-2006年厚労省安全性見直し → 2006年安全性再確認で2%濃度医薬部外品再認可・HAKU メラノフォーカス・米肌等）。\n\n④アゼライン酸 15-20%（皮膚科処方）＝Verallo-Rowell 1989 Acta Derm Venereol RCTでハイドロキノン4%同等の肝斑改善 + 抗炎症 + ニキビ併用ケア。\n\n⑤4-n-ブチルレゾルシノール 0.1-0.3%医薬部外品有効成分（ポーラ提案）＝チロシナーゼ阻害の強力作用。\n\nポーラ B.A・ハーバルフォーミュラ G等。\n\n妥当併用設計＝朝VC15-20% + ナイアシンアミド5-10% + α-アルブチン2% + パルミトイルトリペプチド + SPF30+ PA+++ / 夜トラネキサム酸2-5% + ナイアシンアミド5-10% + コウジ酸2% + レチノール（時間分離週2-3回）が独立6経路の積み増し設計、月コスト＝¥10,000-20,000程度（VC ¥3,000-18,000 + ナイアシンアミド ¥1,500-3,000 + TA外用 ¥3,000-10,000 + α-アルブチン ¥1,500 + SPF ¥2,000-3,000）。\n\n深い色素沈着・肝斑・後天性メラノサイトーシス・光老化は皮膚科の領域（外用ハイドロキノン4%処方 = Kligman formula類・トラネキサム酸経口処方・QスイッチYAGレーザー・ピコレーザー・トレチノイン）でサプリ・化粧品は補助という前提が妥当な範囲です。',
    },
    {
      q: '効果が出るまでどのくらい？評価のタイミングは？',
      a: '【トラネキサム酸 外用】8-12週で評価（Bala 2018 メタ解析 + Banihashemi 2015 RCT 5%×12週で肝斑MASI改善）、累積効果型で評価指標＝**①肝斑MASIスコア（Melasma Area Severity Index・皮膚科判定基準）／②色素沈着 VISIA測定 or 主観／③皮膚色調（明るさ L*値）／④刺激度・赤み・乾燥を記録、12週で効果限定的なら①濃度上げる（2%→5%）／②経口トラネキサム酸処方検討（皮膚科受診）／③外用ハイドロキノン4%処方追加／④QスイッチYAGレーザー・ピコレーザー検討が無難な順番。【トラネキサム酸 経口】4-8週で評価（Tan 2017 RCT 250mg×2回×3ヶ月で MASI改善・8週から効果顕在化）、🚨処方薬扱いで皮膚科判断下。\n\n月経過多・血栓イベント・凝固検査の定期モニタリングが現実的フィードバック設計。【VC外用】12-24週で評価（Pinnell 2003 RCT 12週・Humbert 2003 RCT 24週）、累積効果型で評価指標＝**①色素沈着・しわ・テクスチャー VISIA測定 or 主観／②皮膚色調（明るさ L*値）／③コラーゲン産生（皮膚弾力 Cutometer 補助評価）／④刺激度・赤み（pH酸性で敏感肌注意）を記録、24週で効果限定的なら①濃度上げる（5%→15-20%）／②形態変更（誘導体→純粋型 L-アスコルビン酸）／③ナイアシンアミド・トラネキサム酸併用／④皮膚科受診が次の段階。【両者併用】12-24週評価+皮膚スコア記録（MASI・色素沈着・しわ・テクスチャー・皮膚色調・刺激度）が無難フィードバック設計、改善なければ①用量再確認（外用TA 2-5%/VC 15-20%の論文用量確保）／②使用順序再確認（朝VC/夜TA + ナイアシンアミド共用）／③濃度上げる or 経口トラネキサム酸処方検討／④皮膚科受診（外用ハイドロキノン4%・QスイッチYAG・ピコレーザー）／⑤原因軸再評価（紫外線対策不足・スキンケア習慣・睡眠・栄養・甲状腺機能・更年期ホルモン変化・経口避妊薬・妊娠歴）が次の段階。\n\n「シミが消える」「肝斑が完治」「美白」断定NG→「色素沈着スコア・MASIスコアの改善が報告」型統一。\n\n急速進行する色素沈着は皮膚科受診で悪性黒色腫の鑑別必須（ABCDEルール）。\n\n深い色素沈着・肝斑・光老化は皮膚科の領域でサプリ・化粧品は補助という前提が妥当な範囲です。',
    },
  ],
  'curcumin-vs-boswellia': [
    {
      q: 'クルクミンとボスウェリアの違いは？',
      a: '作用機序と最適な対象が異なる補完関係です。\n\nクルクミンはウコン Curcuma longa 根茎由来のジアリルヘプタノイド型ポリフェノールでTNF-α/NF-κB/IL-6/COX-2/JAK-STAT/PI3K-Akt の多経路抗炎症（Aggarwal 2013 Adv Exp Med Biol 機序レビュー）。\n\nMathur 2024 Phytomedicine メタ解析でRCT統合で変形性膝関節症（OA）の WOMAC スコア改善。\n\nDaily 2016 J Med Food メタ解析 8 RCTでOA症状改善。\n\nChandran 2012 Phytother Res RCT 関節リウマチRA症状改善（限定的）が報告。\n\nボスウェリアは乳香 Boswellia serrata 樹脂由来 boswellic acid（特に AKBA = アセチル-11-keto-β-boswellic acid が主要活性成分）で5-リポキシゲナーゼ（5-LOX）阻害による白血球性ロイコトリエン（LTB4/LTC4/LTD4）産生抑制の単経路抗炎症（Ammon 2006 Phytomedicine 機序レビュー）。\n\nSengupta 2008 Arthritis Res Ther RCT 5-Loxin®（AKBA 30%標準化）250mg×8週で OA 痛みスコア・WOMAC改善。\n\nVishal 2011 Int J Med Sci RCT Aflapin®（AKBA + その他 boswellic acid）100mg×30日で類似効果。\n\nSontakke 2007 Indian J Pharmacol RCT OA症状改善。\n\n経路が多経路NF-κB抑制 vs 単経路5-LOX阻害で完全独立で併用シナジー報告（Kizhakkedath 2013 Mol Med Rep Curcugen+Boswellia併用RCT vs 単独で痛みスコア改善優位）。\n\n変形性関節症・関節リウマチ・潰瘍性大腸炎・喘息の補助領域で論文蓄積。\n\n「サプリで治る」訴求は誤りで効果サイズは限定的（NSAIDs・ヒアルロン酸注射等の処方治療には及ばない）が王道位置づけです。',
    },
    {
      q: 'クルクミン経口バイオアベイラビリティ問題と吸収型製剤の選び方は？',
      a: 'クルクミン経口は素のままでは吸収率1%以下という核心問題があります（Anand 2007 Mol Pharm レビュー）。\n\n主な吸収障害要因＝①低水溶性（脂溶性で胃腸液に溶けにくい）／②腸管壁での代謝（グルクロン酸抱合・硫酸抱合で速やかに不活性化）／③肝初回通過効果での代謝で素のターメリックパウダーやウコン粉末配合サプリは血中クルクミン濃度がほぼ上がらない。\n\n論文用量再現の前提＝吸収型製剤を選ぶことで。\n\n①Theracurmin®（セラバリュー社・微粒子化技術・27倍吸収）＝Sasaki 2011 Biol Pharm Bull で27倍吸収確認、Theracurmin Curcumin Supreme by Integrative Therapeutics 60mg/日（クルクミン換算）が現実的。\n\n②BCM-95®（DolCas Biotech社・ターメロン精油含有）＝Antony 2008 Indian J Pharm Sci で6.93倍吸収、Chandran 2012 RCT で関節リウマチに使用。\n\n③Meriva®（Indena社・レシチン複合・29倍吸収）＝Belcaro 2010 Altern Med Rev RCT OA症状改善で使用。\n\n④Longvida®（Verdure Sciences社・固形脂質粒子・65倍吸収）＝Cox 2017 Mol Nutr Food Res 脳血漿透過確認。\n\n⑤Cavacurmin®（Wacker社・サイクロデキストリン複合・40倍吸収）。\n\n⑥CurcuWIN®（OmniActive社・Curcumagalactomannosides・46倍吸収）。\n\n実用的用量＝標準化クルクミン量で1日500-2,000mg（吸収型製剤の場合）。\n\nSengupta 2008 5-Loxin® 250mg×8週・Chandran 2012 BCM-95® 1g/日×8週・Belcaro 2010 Meriva® 200mg×8週・Mathur 2024 メタ全体で500-1,500mg/日の用量範囲。\n\n「ウコン配合」「ターメリック1,000mg」訴求のみで吸収型規格表記なし品は効果不確実、製品例＝Doctor\'s Best High Absorption Curcumin with BioPerline 500mg (Curcumin C3 Complex + ピペリン20倍吸収) 月¥1,500 / iHerb Now Foods Curcumin 665mg / Thorne Meriva-SF (Meriva® + 海洋コラーゲン) の組み合わせで月¥1,500-5,000。\n\nピペリン（黒胡椒抽出物・BioPerine®）併用で20倍吸収増強（Shoba 1998 Planta Med）。',
    },
    {
      q: 'クルクミン 500-2,000mg/日 とボスウェリア 300-500mg×2-3/日 の用量・形態の選び方は？',
      a: '用量・形態の規格明示が論文用量再現の前提です。【クルクミン】吸収型製剤で標準化クルクミン量500-1,500mg/日が論文用量再現（Mathur 2024 メタ全体・Chandran 2012 BCM-95® 1g/日×8週 RA RCT・Belcaro 2010 Meriva® 200mg×8週 OA RCT）。\n\nTheracurmin Curcumin Supreme by Integrative Therapeutics 60mg×2粒/日（120mg 標準化クルクミン換算で素クルクミン換算1,500-3,000mg相当）/ Doctor\'s Best High Absorption Curcumin with BioPerline 500mg×2粒/日（Curcumin C3 Complex + ピペリン）月¥1,500 / Thorne Meriva-SF 250mg×2粒/日 月¥4,500 / iHerb Now Foods Curcumin 665mg×1-2粒/日が現実的。【ボスウェリア】AKBA 30%標準化・300-500mg×2-3回/日が論文用量再現（Sengupta 2008 5-Loxin® 250mg×8週・Vishal 2011 Aflapin® 100mg×30日）。\n\n5-Loxin®（AKBA 30%標準化）/ Aflapin®（AKBA + boswellic acid複合）/ BosPure®（boswellic acid 65%）配合品が原料規格明示。\n\nNow Foods Boswellia Extract 500mg / Doctor\'s Best Boswellia (5-Loxin® 250mg) / iHerb Solaray Boswellia Extract 月¥1,000-3,000が王道。\n\n「ボスウェリア配合」訴求のみで AKBA 含有量・5-LOX阻害活性規格表記なし品は効果不確実。\n\n現実的併用スタック設計＝朝クルクミン吸収型500-1,000mg + ボスウェリア AKBA 標準化250-500mg + 食事（脂質と摂取で吸収増強）/ 夜クルクミン500-1,000mg + ボスウェリア250-500mg + Mg-Glycinate 200-400mg（筋肉弛緩・睡眠補助）で月¥3,000-8,000程度の関節・抗炎症総合ケア設計。\n\n併用シナジー Kizhakkedath 2013 で確認。\n\n化粧品メーカー視点＝経口抗炎症は皮膚バリア機能・酒さ・アトピー・酒さ素因の補助領域でも論文蓄積（Sahebkar 2014 Inflammopharmacology メタ CRP低下）。\n\n「美肌サプリ」としての訴求も論文ベース整合的だが効果サイズ限定的。\n\n外用クルクミン・ボスウェリア配合品もあるが経口吸収型ほどのエビデンスはなしで位置づけ差を理解した使い分けが整合的です。',
    },
    {
      q: 'クルクミン・ボスウェリアの副作用・併用注意は？関節リウマチ・OA・IBDの YMYL は？',
      a: '併用注意8領域を組み立てた流れです。【クルクミン】①🚨抗凝固薬ワルファリン × 抗血小板薬（アスピリン・クロピドグレル）× DOAC（ダビガトラン・リバーロキサバン・アピキサバン）併用で出血リスク（in vitro研究で血小板凝集抑制・Wallace 2020 Front Pharmacol レビュー）、手術前2週間中止。\n\n②胆石・胆道閉塞は胆汁分泌促進で禁忌（Curcumin はコレシストキニン分泌促進・胆嚢収縮で疝痛誘発の可能性）。\n\n③鉄剤吸収阻害でキレート形成・時間分離2-4時間。\n\n④妊娠中・授乳中は通常摂取量（食事）安全だがサプリ高用量データ限定で産婦人科判断下（理論的に子宮収縮促進可能性）。\n\n⑤胃食道逆流症 GERD で稀に悪化。\n\n⑥糖尿病薬併用で血糖低下相乗・monitor、⑦高用量で稀に肝機能異常（Lukefahr 2018 BMJ Case Rep症例報告）。\n\n⑧腎結石既往はシュウ酸含有量考慮。【ボスウェリア】①脂溶性で食事（脂質）と摂取で吸収増強。\n\n②5-LOX阻害で抗血栓・喘息治療薬（ロイコトリエン受容体拮抗薬モンテルカスト/ザフィルルカスト・ジロイトン併用は薬理重畳）。\n\n③IBD（潰瘍性大腸炎・クローン病活動期）でAulin 2001 Eur J Med Res RCT UC寛解期維持効果報告だが消化器内科判断必須。\n\n④妊娠中・授乳中の安全性データ限定産婦人科相談下。\n\n⑤稀に消化器症状（吐き気・下痢・胸焼け）。\n\n⑥抗炎症薬 NSAIDs 併用は薬理重畳で胃腸障害monitor。\n\n⑦Boswellia は伝統医薬アーユルヴェーダで月経促進伝承で月経不順注意。\n\n⑧自己免疫疾患活動期は免疫科判断下。【YMYL対応 関節・抗炎症領域】「変形性関節症が治る」「関節リウマチが完治」「炎症が消える」断定は薬機法/景表法NG→「WOMAC・痛みスコア・CRP・ESRの改善が報告（効果サイズ限定的）」型統一。\n\n変形性膝関節症 OA・関節リウマチ RA は整形外科・リウマチ内科第一選択（NSAIDs・ヒアルロン酸関節内注射・ステロイド関節内注射・メトトレキサート・生物学的製剤TNF-α阻害薬・JAK阻害薬・運動療法・体重管理・人工関節置換術TKA/UKA/THA）でサプリは補助。\n\n潰瘍性大腸炎 UC・クローン病 CD は消化器内科第一選択（5-ASA製剤・ステロイド・免疫調整薬・生物学的製剤）でサプリは補助。\n\n急性関節痛・関節腫脹・発熱は整形外科・リウマチ内科即受診で痛風・偽痛風・化膿性関節炎・骨折の鑑別必須。\n\nサプリ単独治療は論文ベースで非推奨という前提が妥当な範囲です。',
    },
    {
      q: '効果が出るまでどのくらい？評価のタイミングは？',
      a: '【クルクミン】4-8週で評価（Mathur 2024 メタ・Daily 2016 メタ・Chandran 2012 BCM-95® 1g/日×8週 RA RCT・Belcaro 2010 Meriva® 200mg×8週 OA RCT）、累積効果型で評価指標＝①WOMAC スコア（変形性関節症の質問票・痛み・こわばり・身体機能の3軸）／②痛み VAS（Visual Analog Scale 0-100mm）／③朝のこわばり時間（RA評価指標）／④関節腫脹数 / 圧痛数（RA評価指標）／⑤CRP（C反応性タンパク）・ESR（赤血球沈降速度）の炎症マーカー／⑥QOLスコア・歩行距離を記録、8週で効果限定的なら①吸収型製剤への切り替え確認（Theracurmin/Meriva/BCM-95/Longvida/Cavacurmin/CurcuWIN等）／②用量上げる（500→1,500mg/日）／③ボスウェリア併用追加（Kizhakkedath 2013 併用シナジー）／④整形外科・リウマチ内科受診の入り方。【ボスウェリア】4-12週で評価（Sengupta 2008 5-Loxin® 250mg×8週・Vishal 2011 Aflapin® 100mg×30日・Sontakke 2007 OA RCT）、累積効果型で評価指標＝①WOMAC・痛みVAS・朝のこわばり・関節腫脹／②AKBA含有量・5-LOX阻害活性（規格表記確認）／③消化器症状（稀な下痢・胸焼け）を記録、12週で効果限定的なら①AKBA 標準化規格再確認（30%以上 vs 15-25%品質差）／②用量上げる（250→500mg×3/日 = 1,500mg/日）／③クルクミン併用追加／④整形外科・リウマチ内科受診が次の段階。【両者併用】4-12週評価+関節スコア記録（WOMAC・痛みVAS・朝のこわばり・関節腫脹・CRP・ESR・QOL・歩行距離）が無難フィードバック設計、改善なければ①用量再確認（クルクミン吸収型500-1,500mg/ボスウェリア AKBA 標準化250-500mg×2-3/日）／②吸収型製剤確認（素のターメリック粉末では効果不確実）／③整形外科・リウマチ内科受診（NSAIDs・ヒアルロン酸関節内注射・メトトレキサート・生物学的製剤）／④運動療法（四頭筋強化・水中歩行・関節可動域訓練）・体重管理（5kg減量で膝負荷4倍減）／⑤手術検討（関節鏡視下手術・骨切り術HTO/DFO・人工関節置換術TKA/UKA/THA）が次の段階。\n\n「変形性関節症が治る」「関節リウマチが完治」「炎症が消える」断定NG→「WOMAC・痛みスコア・CRP・ESR・QOLの改善が報告（効果サイズ限定的）」型統一。\n\n整形外科・リウマチ内科・消化器内科第一選択でサプリは補助という前提が妥当な範囲。\n\n急性関節痛・関節腫脹・発熱・腹痛・血便は専門医即受診で痛風・偽痛風・化膿性関節炎・骨折・IBD増悪の鑑別必須です。',
    },
  ],

  // Sprint 3 Session F Day 14 バッチ 2026-05-14（新規5件・supplement/skin/hormone横断デー・新規pair拡張フェーズ突入）
  'vitamin-d-vs-omega3': [
    {
      q: 'ビタミンDとオメガ3の違いは？',
      a: '作用機序とエビデンスの厚みが異なる補完関係です。\n\nビタミンD3はコレカルシフェロール（皮膚紫外線UVB変換＋経口サプリ）でCa恒常性・骨代謝・免疫調整・遺伝子発現調節の必須脂溶性ビタミン。\n\n25(OH)D 30-50 ng/mL目標でManson 2019 NEJM VITAL試験 RCT n=25,871でD3 2,000IU/日×5.3年中央値で心血管/がん複合エンドポイント有意差なし（一次予防領域では限定的）。\n\nPittas 2019 NEJM D2d Study RCT n=2,423で糖尿病発症リスクHR 0.88非有意（25(OH)D 30 ng/mL以下のサブグループでは効果傾向）。\n\nTang 2007 Lancet メタ Ca+D併用骨折リスク12%減。\n\nオメガ3 EPA+DHAは必須脂肪酸（α-リノレン酸ALA経路ヒト変換非効率）で抗炎症エイコサノイド（プロスタグランジンPGE3・ロイコトリエンLTB5・レゾルビン）産生。\n\nREDUCE-IT 2019 NEJM RCT n=8,179 イコサペント酸エチル4g/日（EPA高純度処方）×4.9年で心血管イベント25%減（既存ステロール治療下のハイリスク患者対象・Bhatt 2019 NEJM心血管2次予防エビデンス最厚）。\n\nMIDAS 2010 Alzheimers Dement DHA 900mg/日×24週で言語記憶改善。\n\n経路がCa/骨/免疫×抗炎症脂質メディエーターで完全独立で併用合理＝両方とも脂溶性必須栄養素で食事だけでは到達しにくい用量帯のためサプリ補完が王道。\n\n「サプリで心血管予防」「がん予防」「骨折ゼロ」断定は薬機法/景表法NG→「25(OH)D・心血管イベント・骨密度・トリグリセリド・CRPの改善が報告」型統一が責任ある立場です。',
    },
    {
      q: 'ビタミンD3 1,000-4,000IU/日 とオメガ3 EPA+DHA 1,000-2,000mg/日 の用量・形態の選び方は？',
      a: '用量・形態の規格明示が論文用量再現の前提です。【ビタミンD3】1,000-2,000IU/日が現実的維持用量（Manson 2019 VITAL 2,000IU/日・Pittas 2019 D2d 4,000IU/日）。\n\n血中25(OH)D値 30-50 ng/mL（75-125 nmol/L）目標で初回測定後に用量調整が無難、上限耐容量4,000IU/日（高Ca血症・腎結石リスク）。\n\nサルコイドーシス/原発性副甲状腺機能亢進症で禁忌。\n\n形態別＝D3（コレカルシフェロール）がD2（エルゴカルシフェロール）より血中25(OH)D上昇効果優位（Tripkovic 2012 Am J Clin Nutrメタ）。\n\nNOW Foods Vitamin D3 1,000IU/2,000IU 月¥150-300・Doctor\'s Best Vitamin D3 5,000IU 月¥600・Thorne Vitamin D-1,000/D-5,000・Kirkland Vitamin D3 2,000IUが無難な選び方。\n\n液体ドロップ（NOW Foods Liquid Vitamin D3）は吸収速度高+食事と摂取で吸収効率最大。\n\nK2併用（MK-7型 100-200μg/日）でCa血管沈着リスク軽減仮説（Vermeer 2012 Adv Nutrレビュー）。【オメガ3 EPA+DHA】1,000-2,000mg/日（EPA+DHA合計）が王道維持用量（REDUCE-IT 4g/日処方領域・VITAL 1g/日一次予防領域）、FDA 3g/日上限（出血傾向・心房細動誘発の可能性 VITAL 2019）。\n\n形態別優先順位＝①TG型（トリグリセリド型・天然魚油形態・吸収効率良好）／②rTG型（リエステル化TG型・濃縮高EPA/DHA可能・Nordic Naturals Ultimate Omega 2X rTG等）／③EE型（エチルエステル型・薬剤レベル濃縮 EPA高純度・Lovaza®/エパデール®処方薬・空腹時吸収低下）。\n\n「魚油 1,000mg」訴求のみでEPA/DHA含有量・形態表記なし品は効果不確実。\n\n🚨魚アレルギーは藻由来DHA（Algal DHA Nordic Naturals Algae Omega/Now Foods DHA-500 Algae）代替。\n\n🚨開封後3-6ヶ月以内・冷蔵保存・酸敗（酸化臭・色変化）は廃棄が現実的フィードバック設計。',
    },
    {
      q: 'ビタミンDとオメガ3は併用できる？同時摂取の注意点は？',
      a: '併用OK・むしろ同時摂取が吸収効率良好で妥当です。\n\n理由＝両者とも脂溶性栄養素で食事（特に脂質を含む食事）と一緒に摂取で吸収効率最大。\n\nMulligan 2011 J Am Coll Nutr RCT で脂質含有食と同時摂取で D3 吸収32%増。\n\nオメガ3も脂質含有食で吸収増強。\n\nサプリのカプセル形態（ソフトジェル）はオメガ3を担体としてD3を溶解させる組み合わせ製品も存在（Nordic Naturals Omega-D3 等）。\n\n併用注意領域＝①🚨ワルファリン併用注意（オメガ3 3g/日超でINR延長傾向・D3単独はINRに影響少ないがビタミンK拮抗で間接的影響もない）。\n\n②🚨経口高用量D3 4,000IU/日超は高Ca血症リスク（多飲多尿・嘔気・倦怠感・腎機能低下症状が出たら即中止・血清Ca測定）。\n\n③🚨サルコイドーシス・原発性副甲状腺機能亢進症・腎結石既往はD3 caution。\n\n④🚨甲状腺機能亢進症はD3代謝亢進。\n\n⑤🚨抗てんかん薬（フェニトイン・カルバマゼピン・フェノバルビタール）はD3代謝亢進で用量増量検討。\n\n⑥🚨ジゴキシン・サイアザイド利尿薬併用は高Ca血症リスク。\n\n⑦オメガ3 3g/日超で出血傾向（術前1-2週間中止・抗血小板薬/抗凝固薬併用monitor）。\n\n⑧オメガ3心房細動誘発の可能性（VITAL 2019）。\n\n実用的併用設計＝朝食後 D3 1,000-2,000IU+オメガ3 1,000-2,000mg/日または夕食後 D3 2,000IU+オメガ3 1,000-2,000mg/日で月コスト¥1,200-3,500、他必須栄養素併用合理5成分＝K2 MK-7型 100-200μg/日（Ca血管沈着対策）・マグネシウム200-400mg/日（D活性化補酵素）・ビタミンA（レチノール3,000IU以下 妊娠中除く）・ビタミンE（混合トコフェロール）・亜鉛 15-30mg/日の脂溶性栄養素オーケストラ設計です。',
    },
    {
      q: 'VITAL試験・REDUCE-IT試験の解釈と「サプリで心血管予防できる」言説の整理は？',
      a: '両大規模RCTの解釈は慎重に・期待値調整必須です。【VITAL試験 Manson 2019 NEJM】RCT n=25,871・D3 2,000IU/日+オメガ3 1g/日 vs プラセボ・5.3年中央値で一次予防の心血管/がん複合エンドポイントに有意差なし（HR 0.93非有意）が結論、しかしサブグループ解析＝①25(OH)D値 12 ng/mL未満の重度欠乏者でがん死亡率減少傾向／②心筋梗塞では HR 0.72有意改善／③アフリカ系米国人サブグループでがん死亡率低下傾向。\n\n「一次予防では限定的」が無難結論。\n\n「サプリで心血管予防」「がん予防」断定は誤りだが「重度欠乏補正には意味がある」「2次予防領域（既存疾患患者）では別途検討」が責任ある立場。【REDUCE-IT 試験 Bhatt 2019 NEJM】RCT n=8,179・イコサペント酸エチル4g/日（EPA高純度処方）vs プラセボ・4.9年で主要心血管イベント25%減（HR 0.75）有意。\n\nしかし対象は既存ステロール治療下の心血管疾患既往またはハイリスク糖尿病患者（一次予防ではない）。\n\nEPA高純度4g/日は処方薬領域（日本ではエパデール®・米国ではVascepa®処方）。\n\n通常のサプリ用量 EPA+DHA 1g/日とは別領域で「サプリで心血管疾患予防」訴求は適応外領域。\n\nJELIS 2007 Lancet Yokoyama 日本人2次予防 EPA 1.8g/日RCTも既存スタチン治療下のハイリスク対象。\n\n現実的整理＝①重度欠乏補正（25(OH)D 20 ng/mL未満・EPA+DHA 食事1日100mg未満）はサプリ補完価値あり／②一般人口の一次予防では「効果が出る確実な保証はない」が正しい/③心血管2次予防はステロール治療+処方EPAの医療領域でサプリは補助。\n\n「サプリで予防できる」「これだけ飲めば安心」訴求は薬機法/景表法NG→「25(OH)D・心血管イベント・トリグリセリド・CRPの改善が報告された患者群がある」型統一が責任ある立場です。',
    },
    {
      q: '効果が出るまでと評価のタイミングは？',
      a: '【ビタミンD3】8-12週で評価（血中25(OH)D値が新しい用量に対する平衡到達まで8-12週・Lehmann 2013 J Steroid Biochem Mol Biol薬物動態レビュー）、評価指標＝①25(OH)D値（採血・30-50 ng/mL目標）／②骨密度DEXA（年1回・PBM形成期は6ヶ月-1年）／③カルシウム値・腎機能 Cr/eGFR定期測定（高Ca血症スクリーニング）／④免疫機能関連指標（風邪罹患頻度・期間）／⑤主観的倦怠感・気分を記録。\n\n12週で25(OH)D 30 ng/mL未満なら①用量増量（1,000→2,000→4,000IU/日）／②K2 MK-7型併用追加／③脂質含有食と同時摂取確認／④吸収阻害要因（PPI長期・胃切除既往・脂肪吸収不全）の確認が王道次のステップ。【オメガ3 EPA+DHA】4-12週で評価（REDUCE-IT 4.9年・MIDAS 24週・JELIS 4.6年累積効果型）、評価指標＝①トリグリセリド（TG）・LDL/HDL/non-HDL-C・空腹時血糖（脂質パネル）／②CRP・hs-CRP（炎症マーカー）／③血圧（DBP軽度低下傾向）／④認知機能（記憶課題・MMSE/MoCA）／⑤主観的気分・関節痛・ドライアイ・肌を記録、12週で TG改善限定的なら①EPA高純度形態への変更（rTG型→EE型処方検討）／②用量増量（1g→2g/日上限 FDA 3g/日内）／③心血管リスク評価（医療機関）／④原因軸再評価（食事/運動/体重/睡眠/ストレス）が現実的次のステップ。\n\n「サプリで心血管予防」「骨折ゼロ」「がん予防」断定は薬機法/景表法NG→「25(OH)D・心血管イベント・骨密度・TG・CRPの改善が報告」型統一。\n\n重度欠乏（25(OH)D 20 ng/mL未満）/重度のTG高値（500 mg/dL以上 - 急性膵炎リスク）は医療機関第一選択でサプリは補助という前提が妥当な範囲です。',
    },
  ],
  'pdrn-vs-collagen-peptide': [
    {
      q: 'PDRNと経口コラーゲンペプチドの違いは？',
      a: '作用機序・規制区分・コスト感が異なる補完関係です。\n\nPDRN（Polydeoxyribonucleotide）はサケ精巣/精子由来DNA断片（50-1,500塩基対）でA2Aアデノシン受容体経由で線維芽細胞活性化・コラーゲン産生・組織再生（Galeano 2008 Cardiovasc Diabetol動物創傷治癒・Belletti 2007 動物軟骨修復・Squadrito 2017 Front Pharmacol機序レビュー）、美容皮膚科では真皮内注射 or マイクロニードル注入でLee 2015 Skin Res Technol RCT n=22 Rejuran®（韓国製剤・PharmaResearch社）1ml×3回×月1で皮膚弾力・しわ・水分量改善・Park 2018 J Cosmet Dermatol RCT n=20で類似効果。\n\n外用 Choi 2019 J Cosmet Dermatol RCT n=40 PDRN 0.5%ジェル×8週で皮膚弾力改善（エビデンス階層 emerging・新興成分）。\n\nMastelli社 Placentex®（イタリア発祥・1996年承認・組織再生医療領域）は欧州で創傷治癒・関節症補助。\n\nコラーゲンペプチドは経口5-10g/日でPro-Hyp/Hyp-Glyジペプチド吸収→線維芽細胞シグナル経路でⅠ型コラーゲン・ヒアルロン酸産生促進（Iwai 2005 J Agric Food Chemジペプチド吸収検出・Shigemura 2009 J Agric Food Chem 線維芽細胞シグナル機序確立・Asai 2020 経口Pro-Hyp皮膚到達機序確立）。\n\nProksch 2014 Skin Pharmacol Physiol RCT n=114 Verisol® 2.5-5g/日×8週で皮膚弾力・水分量改善・Asserin 2015 J Cosmet Dermatol RCT n=106 Peptan® 10g/日×8週でしわ深さ改善。\n\n経路が美容皮膚科処方境界（PDRN・即効性・高コスト）vs 経口真皮基質補助（コラーゲン・累積効果・低コスト）で完全独立、目的別使い分け＝急速進行光老化・深いしわ・即効性求める・予算ある→PDRN（美容皮膚科 ¥30,000-60,000/回）／継続的真皮基質補助・全身的・低コスト・予防的→コラーゲンペプチド（経口 ¥1,500-5,000/月）。\n\n「経口で同等効果」「美容外科でしか効果出ない」両極端誤りで作用機序・コスト感・即効性・累積効果性で位置づけが異なることが無難な理解です。',
    },
    {
      q: 'PDRN注射 vs PDRN外用 vs 経口コラーゲンの優先順位は？月コストとROIは？',
      a: '目的別優先順位と月コストROIを整理します。【PDRN真皮内注射（美容皮膚科処方薬境界）】Rejuran®（韓国 PharmaResearch社）1ml×3回×月1で論文用量再現（Lee 2015 RCT）。\n\n月コスト¥30,000-60,000/回・3回コースで¥90,000-180,000、ROI＝急速進行光老化・深いしわ・40代以降の真皮基質低下・即効性求める方向け。\n\n美容皮膚科の領域軸でサプリ・化粧品とは別領域。\n\n「美容医療レベルの真皮再生」軸でエビデンス階層 emerging。【PDRN外用（化粧品レベル）】0.5-2%ジェル/セラム（Choi 2019 RCT 0.5%×8週で皮膚弾力改善）。\n\n月コスト¥5,000-15,000、ROI＝注射ほど侵襲なく入門しやすい・敏感肌でも比較的使いやすい。\n\nただしエビデンス階層は注射＞外用で限定的。\n\n「PDRN配合」訴求のみで濃度不明品は効果不確実。\n\nRejuran Healer/Re:Born PDRN Healing Cream/Mediso PDRN Hydra Cream等韓国系製品の組み合わせ。【経口コラーゲンペプチド】Verisol® 2.5-5g/日 or Peptan® 10g/日が論文用量再現（Proksch 2014・Asserin 2015 RCT）。\n\n月コスト¥1,500-5,000、ROI＝全身的・継続的・低コスト・予防的・敏感肌でも安心、累積効果型で4-12週評価。\n\n「経口コラーゲン効かない」評価は古い（Iwai 2005以降の機序確立）。\n\nの順番＝①基礎（全員）= 経口コラーゲン5-10g/日 ¥1,500-5,000/月+外用ヒト型セラミド+VC15-20%+ナイアシンアミド5%+SPF50+/夜レチノール+ペプチド／②加算（特化）= PDRN外用0.5-2% ¥5,000-15,000/月／③加算（即効・予算ある）= PDRN真皮内注射 Rejuran® 3回コース ¥90,000-180,000。\n\n化粧品メーカー視点＝経口は体内ベース補完・外用は即時主軸・注射は美容皮膚科で集中ケアの三層構造で「経口だけ」「注射だけ」両極端は最適でない。\n\n論文蓄積最厚の経口コラーゲンを基盤・外用ヒト型セラミド+ペプチド+レチノール+VCで日常的真皮基質補助・必要時にPDRN注射で集中ケアを踏まえた進め方です。',
    },
    {
      q: 'PDRN・コラーゲンペプチドの副作用・禁忌は？アレルギー対応は？',
      a: '併用注意・禁忌領域7項目を整理した内容です。【PDRN】①🚨サーモン・サケ精巣アレルギー禁忌＝サケ・アジ・サバ等の魚介アレルギー既往は禁忌。\n\n🚨真皮内注射のアレルギー反応リスクで美容皮膚科でパッチテスト→低用量試験→本投与の段階的導入が王道、②🚨注射部位の感染症リスク（針穿刺による細菌感染・ヘルペス再活性化）で注射前48時間以内に皮膚科専門医によるアセスメント。\n\n③🚨ケロイド体質・肥厚性瘢痕既往は注射部位の異常瘢痕リスクで医師判断下。\n\n④🚨抗凝固薬（ワルファリン・DOAC）併用は注射部位の出血・内出血リスクで注射前1-2週間中止 or 美容皮膚科判断。\n\n⑤🚨妊娠中・授乳中の安全性データ限定で産婦人科相談+美容皮膚科判断下。\n\n⑥🚨自己免疫疾患（SLE・RA）活動期は注射部位の異常反応リスクで医師判断下。\n\n⑦外用は注射より侵襲少ないがパッチテスト推奨、主な副作用＝注射部位の赤み・腫れ・内出血（1-2週間で消失）。【コラーゲンペプチド】①🚨魚由来コラーゲン魚アレルギー禁忌（フィッシュコラーゲン・海洋コラーゲンはタラ・サケ・スズキ・サメ等が原料）。\n\n②🚨甲殻類アレルギー（エビ・カニ）対応＝キチン/キトサン由来コラーゲンは回避。\n\nMarine Collagenの一部に甲殻類成分含有可能性で原料表示確認。\n\n③🚨ボバイン（牛）由来はBSE懸念で原産国確認（オーストラリア・ニュージーランド・アルゼンチン産が比較的安心・米国産は注意）。\n\n④🚨豚由来コラーゲンはイスラム教・ユダヤ教・ヒンドゥー教の食事制限で代替原料（魚・鶏・ボバイン）選択。\n\n⑤🚨鶏由来コラーゲンは鶏卵アレルギー対応（タイプII主体・UC-II関節特化）。\n\n⑥🚨鮫由来コラーゲンは絶滅危惧種懸念で持続可能性配慮（ヨシキリザメ・アオザメ・ホシザメ等の保護種使用回避）。\n\n⑦腎機能低下例 CKD ステージ3以上 caution＝蛋白質負荷でクレアチニン上昇可能性で腎臓内科判断下。\n\n痛風・高尿酸血症は通常用量で問題なしだが高用量（20g/日以上）は注意。\n\n🚨経口コラーゲンの「効かない」評価は古い（Iwai 2005以降の Pro-Hyp/Hyp-Gly ジペプチド吸収・線維芽細胞シグナル機序確立）で「効くか効かないか」の二元論ではなく「論文用量・形態・継続期間で効果サイズが変動する」が正しい理解。\n\n「シワが消える」「真皮再生（断定）」「肌が若返る」断定は薬機法/景表法NG→「皮膚弾力・水分量・しわ深さ・コラーゲン産生関連指標の改善が報告」型統一が責任ある立場です。',
    },
    {
      q: 'PDRNの「美容医療でしか効果出ない」と経口コラーゲンの「飲んでも効かない」両極端誤りの整理は？',
      a: '両極端誤りの正しい整理は「論文ベースのエビデンス階層」+「目的別使い分け」で整合的です。【「美容医療でしか効果出ない」誤りの整理】PDRN真皮内注射のエビデンス階層は emerging（新興成分）でRCTサンプル数限定的（Lee 2015 n=22・Park 2018 n=20）、注射でないと効果不確実訴求は外用PDRN 0.5%×8週でも皮膚弾力改善が報告（Choi 2019 RCT n=40）で外用でも一定の効果プロファイル。\n\n「美容医療でしか効果出ない」は誤りだが「即効性・効果サイズで真皮内注射 ＞ 外用」は妥当、目的別使い分け＝40代以降の急速進行光老化・深いしわ・即効性求める→注射／継続的補助・敏感肌→外用で「美容医療しか効かない」二元論ではなく「目的別に注射/外用を組み合わせる」が正しい。【「飲んでも効かない」誤りの整理】経口コラーゲンの「効かない」評価は2005年以前の古い理解＝Iwai 2005以降の Pro-Hyp/Hyp-Gly ジペプチド吸収検出・Shigemura 2009 線維芽細胞シグナル機序・Asai 2020 経口Pro-Hyp皮膚到達機序が確立。\n\nProksch 2014 RCT Verisol® 2.5-5g/日×8週で皮膚弾力・水分量改善・Asserin 2015 RCT Peptan® 10g/日×8週でしわ深さ改善でエビデンス確立、「飲んでも効かない」は誤りだが「論文用量到達・継続期間・形態規格が前提」が正しい。\n\n「コラーゲン1,000mg」訴求のみで含有量・形態不明品は論文用量未到達で効果不確実。\n\nVerisol®/Peptan®/SCP-NS®/Aminoplus®等の規格化原料で5-10g/日×4-12週が現実的。\n\n正しい整理＝①PDRN真皮内注射はエビデンス階層 emerging だが即効性・効果サイズ高（美容皮膚科処方境界）／②PDRN外用は新興成分だが日常的補助価値あり／③経口コラーゲンは累積効果型・規格・用量・継続期間が前提でエビデンス確立／④三層構造（経口基盤+外用日常+注射集中ケア）の進め方。\n\n「美容医療でしか効果出ない」「飲んでも効かない」両極端誤りは「論文ベースのエビデンス階層を理解した目的別使い分け」で解消が責任ある立場です。',
    },
    {
      q: '効果が出るまでと評価のタイミングは？',
      a: '【PDRN真皮内注射】4-12週で評価（Lee 2015 RCT 3ヶ月評価・Park 2018 RCT 3ヶ月評価）。\n\n累積効果型+施術直後の一時的改善併存型で評価指標＝①皮膚弾力（Cutometer測定）／②しわ深さ（VISIA測定 or 主観）／③皮膚水分量（Corneometer測定）／④肌色調・トーン／⑤施術部位の赤み・腫れ・内出血（1-2週間で消失）／⑥患者満足度スコア（GAIS Global Aesthetic Improvement Scale）を美容皮膚科で記録。\n\n3回コース完了後（月1×3回）に総合評価、6-12ヶ月で再施術検討（効果持続期間 6-12ヶ月程度）が無難。【PDRN外用】4-12週で評価（Choi 2019 RCT 8週評価）、累積効果型で評価指標＝①皮膚弾力・水分量・しわ深さ・色調を主観 or VISIA測定、12週で効果限定的なら①濃度上げる（0.5%→2%）／②注射への切替検討（美容皮膚科）／③経口コラーゲン併用追加（基盤補強）／④外用レチノール+VC+ペプチド+セラミド主軸の論文蓄積最厚スタックへの戻りが王道次のステップ。【経口コラーゲンペプチド】4-12週で評価（Proksch 2014 RCT 8週・Asserin 2015 RCT 8週・Czajka 2018 Nutr Res 複合配合8週）、累積効果型で評価指標＝①皮膚弾力（Cutometer測定 or 主観）／②しわ深さ・小じわ（VISIA測定 or 主観）／③皮膚水分量・TEWL／④爪の硬さ・割れ（Hexsel 2017 RCT VERISOL® 4ヶ月で爪症状改善）／⑤関節症状（UC-II 40mg/日 RA/OA補助）／⑥主観的肌の調子・髪の調子を記録、12週で効果限定的なら①用量確認（5-10g/日の論文用量到達）／②規格メーカー切替（Verisol®/Peptan®等の規格化原料）／③形態切替（フィッシュ←→ボバイン←→鶏）／④併用合理スタック追加（経口HA 120mg/日 Oe 2017 RCT・VC 500-1,000mg/日・亜鉛15-30mg/日・ビオチン2.5-5mg/日）／⑤外用レチノール+VC+ペプチド+セラミド主軸への戻りが現実的次のステップ。\n\n「シワが消える」「真皮再生（断定）」「肌が若返る」断定は薬機法/景表法NG→「皮膚弾力・水分量・しわ深さ・関連指標の改善が報告」型統一。\n\n急速進行光老化・深いシワ・たるみは皮膚科の領域（外用レチノール+VC+ハイドロキノン4%処方・ボツリヌス毒素注射・ヒアルロン酸注射・サーマクール・ハイフ・フラクショナルCO2レーザー・PDRN真皮内注射等）でサプリ・化粧品は補助という前提が妥当な範囲です。',
    },
  ],
  'lutein-vs-astaxanthin': [
    {
      q: 'ルテインとアスタキサンチンの違いは？',
      a: '作用機序と最適な対象が異なる補完関係です。\n\nルテイン（10-20mg/日・FloraGLO®/XanMax®規格・マリーゴールド花弁由来）はキサントフィル系カロテノイド（酸素原子含有）でゼアキサンチンと合わせて黄斑色素（MPOD Macular Pigment Optical Density）形成・短波長青色光フィルタ+網膜抗酸化。\n\nAREDS2 JAMA 2013 RCT n=4,203でルテイン10mg+ゼアキサンチン2mg/日×5年で進行型加齢黄斑変性（AMD Age-related Macular Degeneration）への移行リスク減少（β-カロテン非含有処方が無難）。\n\nMa 2012 Br J Ophthalmol メタ AMDリスク低下。\n\nStringham 2017 Foods 認知機能・記憶補助関連。\n\nHammond 2014 Invest Ophthalmol Vis Sci VDT眩しさ・コントラスト感度・羞明改善。\n\nYagi 2009 J Clin Biochem Nutr アスタキサンチン併用での視覚機能改善。\n\nアスタキサンチン（4-12mg/日・AstaReal®/AstaZine®規格・ヘマトコッカス藻 Haematococcus pluvialis 由来）はケトカロテノイド（酸素原子含有・β-カロテンとルテインの構造的中間体）でビタミンE約500倍の一重項酸素消去能力・脂質過酸化抑制・スーパーオキシド消去の3経路抗酸化（Kishimoto 2016 Mar Drugs・Naguib 2000 J Agric Food Chem機序確立）。\n\nTominaga 2017 Acta Biochim Pol RCT n=65 6mg/日×12週で肌弾力・しわ・水分量改善。\n\nChoi 2011 Mol Nutr Food Res RCT 12mg/日×4週で皮脂分泌・皮膚バリア改善。\n\nEkpe 2018 J Photochem Photobiol B メタ。\n\nEarnest 2011 Int J Sports Med運動パフォーマンス補助・Liu 2018 Crit Rev Food Sci Nutr メタ眼精疲労改善関連・Hashimoto 2014 J Clin Biochem Nutr調節機能改善。\n\n経路が黄斑色素形成（眼科特化）×脂質膜抗酸化（肌/眼/運動横断）で独立、目的別使い分け＝AMD予防・コンピュータ作業・読書時眩しさ・MPOD強化→ルテイン主軸（AREDS2強エビデンス）／肌弾力・しわ・運動・眼精疲労総合・全身的抗酸化→アスタキサンチン主軸で両者併用合理（経路独立・目的補完）です。',
    },
    {
      q: 'ルテイン・アスタキサンチンは併用できる？AREDS2のβ-カロテン非含有経緯は？',
      a: '併用OK・むしろ目的補完で実用的です。\n\n理由＝ルテインの黄斑色素形成（眼科特化）vs アスタキサンチンの脂質膜抗酸化（全身横断）で経路独立。\n\nYagi 2009 J Clin Biochem Nutr 併用RCTで視覚機能改善優位。\n\n「眼+全身のカロテノイド総合補助」軸として併用合理。\n\n🚨AREDS2のβ-カロテン非含有経緯＝CARET試験 NEJM 1996 Omenn RCT n=18,314（β-カロテン20-30mg+ビタミンA 25,000IU/日 喫煙者+アスベスト曝露者対象）でβ-カロテン+ビタミンA介入群の肺癌発生率28%増加・心血管死亡26%増加で試験中止。\n\nATBC試験 NEJM 1994 The Alpha-Tocopherol, Beta Carotene Cancer Prevention Study Group RCT n=29,133（フィンランド男性喫煙者対象・β-カロテン20mg+ビタミンE 50mg/日 5-8年介入）で β-カロテン群の肺癌発生18%増加・前立腺癌・脳卒中死亡増加で喫煙者・元喫煙者のβ-カロテン高用量サプリの肺癌リスク確立。\n\nAREDS1試験（1990年代）ではβ-カロテン15mg/日含有処方だったがCARET/ATBC結果を受けて2013年AREDS2試験でβ-カロテン除外・ルテイン10mg+ゼアキサンチン2mg/日に置換。\n\nAREDS2の β-カロテン除外サブグループ解析で禁煙者でもAMD進行抑制に有意差なしでルテイン+ゼアキサンチン置換が王道判断。\n\n現在の眼科サプリ Bausch & Lomb PreserVision AREDS2 Formula/Centrum Vision Health は β-カロテン非含有・ルテイン+ゼアキサンチン処方が現実的選択。\n\nルテインは喫煙者・元喫煙者でも安全プロファイル確認（Mares-Perlman 2002 Arch Ophthalmol 喫煙者でルテイン血中濃度高いほうがAMDリスク低い）。\n\nアスタキサンチンも喫煙者・元喫煙者で発癌リスク増加報告なし（ただしβ-カロテンと構造的に類似カロテノイドのため超高用量は慎重評価）。\n\n現実的選択＝喫煙者・元喫煙者は β-カロテン高用量サプリ（10mg/日以上）回避・βカロテンの代わりにルテイン+ゼアキサンチン+アスタキサンチンの組み合わせが眼+全身抗酸化のの進め方。\n\n「β-カロテン豊富」訴求の眼科サプリ・抗酸化サプリは喫煙歴ある方は避けることが整合的です。',
    },
    {
      q: 'ルテイン・アスタキサンチンの副作用・併用注意は？AMD/眼疾患YMYLは？',
      a: '併用注意7領域・YMYL対応を組み立てた流れです。【ルテイン】①🚨喫煙者・元喫煙者でも安全プロファイル（β-カロテンと違いカロテノイド腫瘍学的リスク報告なし）。\n\n②稀に皮膚黄染（高用量20mg/日以上長期）＝カロテノデルマ・黄疸との鑑別で皮膚科判断。\n\n③脂溶性で食事（脂質）と摂取で吸収増強。\n\n④妊娠中・授乳中の安全性データ限定（食事レベルは安全だがサプリ高用量は産婦人科判断下）。\n\n⑤抗凝固薬・抗血小板薬との大きな相互作用は報告なしだが念のため術前1週間中止が安全側。\n\n⑥AMD進行抑制は予防効果でAMD完治ではない＝既存進行型AMDは抗VEGF硝子体注射（ルセンティス®/アイリーア®）が眼科第一選択。\n\n⑦糖尿病網膜症・緑内障・白内障の鑑別必須で眼科専門医診断後の補助。【アスタキサンチン】①🚨アスタキサンチン×ワルファリン caution（PMC6495044 INR上昇症例報告）でモニタリング。\n\n②🚨アスタキサンチン12mg/日以上で拡張期血圧低下メタ報告（Pashkow 2008 Am J Cardiol レビュー）で降圧薬併用注意・低血圧傾向者caution。\n\n③🚨ヘマトコッカス藻原料純度・酸化管理重要＝ヘマトコッカス藻は強い赤色色素で酸化に弱く・空気/光/熱で分解。\n\nAstaReal®（富士化学工業株式会社）/AstaZine®（Cyanotech社）/Algatech社等の規格化品が現実的。\n\n「アスタキサンチン配合」訴求のみで含有量・規格不明品は効果不確実。\n\n④脂溶性で食事（脂質・特にオレイン酸）と摂取で吸収増強（Mercke Odeberg 2003 Eur J Pharm Sci）、⑤手術前1-2週間中止（軽度の出血リスク）。\n\n⑥稀に消化器症状（吐き気・胃部不快）。\n\n⑦妊娠中・授乳中の安全性データ限定で産婦人科判断下。\n\n⑧高用量で皮膚黄染（カロテノデルマ）稀。\n\n🚨進行型AMD・糖尿病網膜症・緑内障・白内障は眼科第一選択＝進行型AMDは抗VEGF硝子体注射（ルセンティス® ranibizumab/アイリーア® aflibercept/ベオビュ® brolucizumab）が眼科第一選択でサプリは補助。\n\n糖尿病網膜症は内科で血糖管理+眼科でレーザー光凝固/抗VEGF注射/硝子体手術。\n\n緑内障は眼科で点眼薬（プロスタグランジン関連薬・β遮断薬・α2作動薬・炭酸脱水酵素阻害薬）・選択的レーザー線維柱帯形成術SLT・線維柱帯切除術。\n\n白内障は眼科で水晶体再建術（PEA+IOL）。\n\n「AMDが治る」「視力が回復」「白内障予防」断定は薬機法/景表法NG→「黄斑色素密度MPOD・視覚機能・コントラスト感度・調節機能の改善が報告」型統一が責任ある立場。\n\n40代以降の年1回眼科定期検診（眼底検査・OCT・視野検査・眼圧測定）が無難予防設計です。',
    },
    {
      q: 'ルテイン 10-20mg/日・アスタキサンチン 4-12mg/日 の用量・形態・規格の選び方は？',
      a: '用量・形態・規格の明示が論文用量再現の前提です。【ルテイン】10mg/日が王道最小有効量・20mg/日が高用量領域（AREDS2 ルテイン10mg+ゼアキサンチン2mg/日・Stringham 2010 LAST試験 12mg/日・Hammond 2014 ルテイン10mg/日）。\n\nFloraGLO®（Kemin社・マリーゴールド花弁由来・特許製造法）が論文用量再現の規格化原料（AREDS2試験でも使用）。\n\nXanMax®（OmniActive社）もの選択肢。\n\nNow Foods Lutein 10mg/20mg 月¥1,000-2,000・Doctor\'s Best Lutein with FloraGLO 月¥1,200・Solgar Lutein 20mg・Bausch & Lomb PreserVision AREDS2 Formula（ルテイン10mg+ゼアキサンチン2mg+亜鉛+銅+VC+VE処方）月¥3,000-5,000が王道。\n\nゼアキサンチン2mg/日併用が現実的（AREDS2処方・1:5の比率がマリーゴールド花弁由来の天然比率）。\n\nカプセル型（脂溶性・食事と摂取）が無難形態。【アスタキサンチン】4-12mg/日が王道用量域（Tominaga 2017 6mg/日×12週・Choi 2011 12mg/日×4週・Earnest 2011 4mg/日×4週・Hashimoto 2014 6mg/日×4週）。\n\nAstaReal®（富士化学工業株式会社・ヘマトコッカス藻 H. pluvialis 培養・特許酸化防止技術）/AstaZine®（Cyanotech社・ハワイ・USAGI規格）/Astavita®（富士化学工業）/BioAstin®（Cyanotech社）等の規格化原料が無難な選び方。\n\n「アスタキサンチン配合」訴求のみで含有量・規格不明品は効果不確実。\n\nNow Foods Astaxanthin 4mg/10mg（AstaPure®使用）月¥1,500-3,000・Sports Research Astaxanthin 12mg (AstaReal®)・Source Naturals Astaxanthin 4mg・Doctor\'s Best Astaxanthin 6mg with AstaPure®の組み合わせ。\n\n国産では富士化学工業 アスタリール® ACT2/ASTOTS®/AstaReal® L10 配合品もあり。\n\n脂溶性で食事（脂質・特にオレイン酸/魚油）と摂取で吸収増強（Mercke Odeberg 2003 Eur J Pharm Sci 食事との同時摂取で吸収3倍）。\n\nカプセル型（ソフトジェル・遮光ボトル）が酸化管理で妥当形態。\n\n液体・粉末は酸化リスク高で継続性低下。\n\n実用的併用スタック設計＝40代以降の眼+全身抗酸化総合ケアセット＝①ルテイン10-20mg/日 ¥1,000-2,000/月 +②ゼアキサンチン2mg/日（AREDS2比率）+③アスタキサンチン4-12mg/日 ¥1,500-3,000/月 +④オメガ3 EPA+DHA 1,000-2,000mg/日 ¥1,000-3,000/月（DHA眼科補助）+⑤亜鉛15-30mg/日 ¥600-1,000/月（AREDS2処方亜鉛80mg + 銅2mg含有）+⑥VC 500-1,000mg/日+⑦VE混合トコフェロール+⑧ビタミンD3 1,000-2,000IU/日+⑨ブルーベリーアントシアニン or ビルベリーミルチル36%標準化（補助）で月コスト¥4,000-9,000程度。\n\n眼精疲労・コンピュータ作業時間長い・40代-60代の眼+全身抗酸化基盤の総合ケアの組み立て。\n\n重症化（進行型AMD・糖尿病網膜症・緑内障・白内障）は眼科第一選択でサプリは補助という前提です。',
    },
    {
      q: '効果が出るまでと評価のタイミングは？',
      a: '【ルテイン】3-12ヶ月で評価（MPOD黄斑色素密度の上昇は累積効果型・AREDS2 5年介入・Stringham 2010 LAST試験 12ヶ月・Bone 2003 6ヶ月でMPOD上昇）、累積効果型で評価指標＝①MPOD（黄斑色素光学密度・眼科 ヘテロクロマティック・フリッカー・フォトメトリー HFP測定 or 一般眼科では未測定が多い）／②視覚機能（コントラスト感度・グレア回復時間 grading・羞明・暗順応・コンピュータ作業時の眼疲労）／③主観的眼精疲労・かすみ・乾燥／④AMDリスク評価（眼底検査・OCT・AREDSスコア・年1回眼科定期検診）／⑤認知機能・記憶課題（Stringham 2017 補助）を記録、6-12ヶ月で効果限定的なら①用量増量（10→20mg/日）／②ゼアキサンチン併用追加（2mg/日）／③アスタキサンチン併用追加（6mg/日）／④眼科受診（OCT・眼底検査・視野検査）／⑤食事内容確認（緑黄色野菜・ホウレンソウ・ケール・卵黄のルテイン豊富食材）が現実的次のステップ。【アスタキサンチン】4-12週で評価（Tominaga 2017 12週・Choi 2011 4週・Earnest 2011 4週・Hashimoto 2014 4週）、累積効果型+早期効果併存で評価指標＝①肌弾力・しわ・水分量・皮脂分泌・皮膚バリア機能（Cutometer/VISIA測定 or 主観）／②眼精疲労・調節機能・コントラスト感度／③運動パフォーマンス（持久力・回復・主観的疲労感）／④抗酸化指標（MDA・8-OHdG・hs-CRP・TAC）／⑤血圧（12mg/日以上で軽度低下傾向）を記録、12週で効果限定的なら①用量増量（4-6→12mg/日 上限）／②規格メーカー切替(AstaReal®/AstaZine®等)／③脂質と同時摂取確認（吸収3倍 Mercke Odeberg 2003）／④原因軸再評価（紫外線・酸化ストレス源・睡眠・運動・喫煙）／⑤併用合理スタック追加（ルテイン+ゼアキサンチン+オメガ3+VC+VE）が無難次のステップ。\n\n「目が良くなる」「視力が回復」「シワが消える」「白内障予防」「AMD治療」断定は薬機法/景表法NG→「黄斑色素密度MPOD・視覚機能・コントラスト感度・調節機能・肌弾力・しわ・水分量・抗酸化指標の改善が報告」型統一。\n\n🚨進行型AMD・糖尿病網膜症・緑内障・白内障・進行光老化・深いしわは眼科/皮膚科の領域でサプリは補助。\n\n40代以降の年1回眼科定期検診（眼底検査・OCT・視野検査・眼圧測定）・年1回皮膚科定期検診（VISIA測定・皮膚癌スクリーニング）が王道予防設計が責任ある立場です。',
    },
  ],
  // ── Sprint 3 Session F Day 11-15 バッチ 2026-05-15（mid-funnel KW回収・AIO耐性高・+25 pair一括拡張） ───────────────
  // skin系（+8 pair）
  'bakuchiol-vs-tranexamic-acid': [
    { q: 'バクチオールとトラネキサム酸の違いは？妊娠中レチノール代替として有効？', a: '作用機序が完全に独立で補完関係です。\n\nバクチオール（外用0.5-1%・Psoralea corylifolia由来メロテルペン）はレチノール様の遺伝子発現を起こしつつ催奇形性プロファイルが異なることで「植物性レチノール代替」として注目（Dhaliwal 2019 Br J Dermatol RCT n=44で 0.5%×12週がレチノール0.5%と同等のしわ・色素沈着改善・刺激性は有意に低い）。\n\nChaudhuri 2014 Int J Cosmet Sciで遺伝子発現プロファイル類似性の確立。\n\nトラネキサム酸はプラスミン経路（炎症シグナル経由のメラニン産生）を起点側でブロックする単経路抗メラニン産生成分（JAAD 2020 メタ解析 n=561で経口250mg/日のmMASI有意改善・Banihashemi 2015 J Cosmet Dermatol RCT 5%×12週で肝斑改善）。\n\n経路が遺伝子発現×プラスミン阻害で完全独立。\n\nしわ・色素沈着総合→バクチオール／肝斑・PIH特化→トラネキサム酸の使い分け、併用OK。\n\n🚨レチノールは妊娠中NG（A過剰症・催奇形性懸念）でバクチオール+TXA外用は妊娠中も比較的安全と整理されており、レチノール非適応層の代替軸として現実的、ただし「絶対安全」断定は薬機法NGで産科医相談前提。' },
    { q: 'バクチオール・トラネキサム酸 用量・形態の選び方は？', a: '【バクチオール】0.5-1%が論文用量再現（Dhaliwal 2019 0.5%×12週）。\n\nSytenol® A（Sytheon社・規格化バクチオール原料）が現実的。\n\nOle Henriksen Transform Plus Night Gel / The Inkey List Bakuchiol Moisturizer / Herbivore Bakuchiol Retinol Alternative等が市販選択肢、月¥3,000-7,000。【トラネキサム酸 外用】2-5%が論文用量再現。\n\nSkinCeuticals Discoloration Defense (TA 3% + Niacinamide 5%) 月¥10,000 / TIA\'M My Signature Red C Serum / メラノCC（ロート製薬・TA + L-アスコルビン酸2-グルコシド）月¥1,000-1,500が選択肢。\n\n摂取・塗布順序＝夜：洗顔→TA外用→バクチオール→保湿（セラミド+パンテノール）→（必要に応じ）レチノールは併用避ける時間分離。\n\n朝：VC15-20%+ナイアシンアミド5%+SPF50+ PA++++を踏まえた進め方です。' },
    { q: '妊娠中・授乳中の使用は本当に安全？', a: 'バクチオール・TXA外用は妊娠中・授乳中の絶対禁忌データはないが「絶対安全」断定は薬機法NG・産科医・皮膚科医相談前提が妥当な範囲。\n\n🚨レチノール（外用ビタミンA誘導体）は妊娠中NG＝経口イソトレチノイン（ロアキュテイン®）の催奇形性データから外用も理論的回避推奨、🚨ハイドロキノンも妊娠中NG（FDA Pregnancy Category C・全身吸収懸念）。\n\n🚨経口トラネキサム酸は妊娠中・授乳中NG（血栓リスク・胎盤通過懸念）。\n\n妊娠中に使えるシミ・しわ対策＝バクチオール外用＋トラネキサム酸外用2-5%＋ナイアシンアミド5%＋アゼライン酸15-20%（FDA Pregnancy Category B）＋VC外用15%＋SPF50+ PA++++の段階構成、紫外線対策（物理的遮光・帽子・サングラス）+ ホルモン変動による肝斑悪化（妊娠性肝斑 chloasma）への対策が現実的。' },
    { q: 'バクチオール・TXA外用の併用注意は？', a: '【バクチオール】①レチノール併用注意（機序類似で重畳刺激リスク・初期は週2-3回交互→慣れたら毎日）。\n\n②AHA/BHA併用は時間分離（朝AHA・夜バクチオール）。\n\n③敏感肌・酒さは0.25%から開始でパッチテスト推奨。\n\n④🚨Psoralea corylifolia全草には光毒性ソラレン含有だがバクチオール単体は精製で除去・規格化原料推奨。\n\n【TXA外用】①酸性pH製品との同時併用注意（安定性低下・時間分離）、②パッチテスト推奨、③外用は全身性副作用稀だが経口は血栓既往・経口避妊薬・HRT・喫煙者・40歳以上・妊娠中・産褥期は絶対NGで皮膚科処方判断下。\n\n④🚨急速進行する色素沈着・新規シミ・出血・かゆみは皮膚科受診で悪性黒色腫鑑別必須（ABCDEルール）。「シミが消える」「シワが消える」「肝斑が完治」断定は薬機法/景表法NG→「色素沈着スコア・MASIスコア・しわ深さの改善が報告」型統一。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '8-12週で評価（バクチオール12週 Dhaliwal 2019・TXA外用8-12週 Bala 2018 メタ）、累積効果型で評価指標＝①色素沈着面積・濃度（VISIA測定 or 主観）／②しわ深さ・キメ（VISIA・Cutometer）／③肌弾力・水分量（Cutometer）／④主観的明るさ・赤み・刺激／⑤MASIスコア（肝斑特化）を記録、12週で効果限定的なら①用量増量（バクチオール0.5→1%・TXA外用2→5%）／②併用追加（ナイアシンアミド5-10%・VC外用15-20%・アゼライン酸15-20%）／③皮膚科受診（重度肝斑・PIH・色素沈着は皮膚科の領域＝外用ハイドロキノン4%処方・QスイッチYAGレーザー・ピコレーザー・トレチノイン）／④紫外線対策再評価（SPF50+ PA++++日次塗布・帽子・サングラス）／⑤生活軸（睡眠・ストレス・喫煙・経口避妊薬・HRT）が次の段階。' },
  ],
  'hyaluronic-acid-vs-ceramide-oral': [
    { q: 'ヒアルロン酸経口とセラミド経口の違いは？', a: '作用層と機序が異なる補完関係です。\n\nヒアルロン酸経口（120-240mg/日・分子量5,000-30万Da推奨）は腸内代謝後にN-アセチルグルコサミン由来の合成促進経路で関与（Oe 2016 J Clin Biochem Nutr RCT n=60で HA 120mg/日×12週で皮膚水分量・小じわ有意改善・Kawada 2014 Nutr Jレビューで皮膚パラメータ改善）、即時の経口吸収率は限定的だが累積で水分量・小じわ改善が報告。\n\nセラミド経口（グルコシルセラミド40-80mg/日・米由来CERAMIDA®・こんにゃく由来Glucocerolipid®）は腸内代謝後に細胞間脂質前駆体として皮膚バリアを内側から補強しTEWL（経表皮水分蒸散量）を抑制（JDS 2017 RCT n=63で経口グルコシルセラミドが角層水分量・TEWL改善・Ueda 2018 J Dermatolで乾燥肌スコア改善）。「水分保持→ヒアルロン酸／バリア強化→セラミド」の役割分担、敏感肌・アトピー素因では経口セラミド優位。' },
    { q: '用量・形態の選び方は？分子量による違いは？', a: '【HA経口】120-240mg/日が論文用量再現。\n\nECM Inc. Hyaluronan®（鶏冠由来）/ Mobilee® HA（Bioiberica社・5%HA含有）/ HyaMax®（同治療規格）等が王道。\n\n分子量5,000-30万Daが経口吸収・関節到達のバランス妥当。\n\nSolgar Hyaluronic Acid 120mg / DHC ヒアルロン酸 / ファンケル ディープチャージ コラーゲン等、月¥1,500-3,500。\n\n【セラミド経口】40-80mg/日（グルコシルセラミドとして）が論文用量再現。\n\n米由来CERAMIDA®（オリザ油化・米胚芽由来）/ こんにゃく由来Glucocerolipid®/ 小麦由来Lipowheat®等が規格化原料。\n\nDHC セラミド モイスチュア / ファンケル ディープチャージ セラミド / 資生堂ザ・コラーゲン等が選択肢、月¥1,500-4,000。\n\n摂取タイミング＝朝食後 or 夕食後（脂溶性で食事と同時で吸収率向上）。\n\nビタミンC 500-1,000mg併用合理（コラーゲン合成補因子）。' },
    { q: '経口で本当に肌まで届く？外用と経口どっち優先？', a: '経口と外用は補完関係で「どっちか」ではなく「両方」が現実的です。\n\n経口HA・セラミドは腸内代謝後に内因性合成シグナル経由で関与＝直接的に投入HAが皮膚到達ではなくシグナル経路が機序（Iwai 2005/Shigemura 2009のコラーゲンペプチド機序と類似・低分子ペプチド/糖鎖が腸吸収→線維芽細胞シグナル）。\n\nの段階＝①外用が主役（HA外用 0.1-2%が水分保持に即時作用・セラミド外用0.5-2%がバリア機能改善 Spada 2018）+②経口は中長期累積補助（8-12週以上の継続で水分量・TEWL改善が報告）+③朝外用（HA+セラミド+VC15%）+夜外用（セラミド+パンテノール+保湿）+経口（食後）の三層構造の進め方。「経口だけでシミ消える」「飲むだけで肌が変わる」断定NGで生活軸（睡眠・水分・紫外線対策・栄養）と併走が現実解です。' },
    { q: '併用注意は？妊娠中・授乳中は？', a: '併用注意は限定的で実用的安全プロファイル。\n\n【HA経口】①稀に消化器症状（腹部膨満・軟便）で食事と同時摂取で軽減。\n\n②鶏冠由来は鶏アレルギーcaution・微生物発酵由来は問題少。\n\n③妊娠中・授乳中は標準的安全性データ限定で産科医相談下（理論的に安全レイヤー）、④癌既往はcaution（HAが腫瘍微小環境に関与する懸念・腫瘍内科判断下だがエビデンス限定的）。\n\n【セラミド経口】①小麦由来は小麦アレルギー・グルテン不耐症cautionで米/こんにゃく由来推奨、②稀に消化器症状。\n\n③妊娠中・授乳中は標準的安全性データ限定で産科医相談下。\n\n④併用薬との相互作用報告ほぼなし。\n\n【両者併用】＝①ビタミンC 500-1,000mg併用合理。\n\n②ビタミンD 1,000-2,000IU・コラーゲンペプチド 5-10g/日併用合理。\n\n③タンパク質1.0-1.2g/kg体重/日の食事ベースが大前提。\n\n④🚨アトピー性皮膚炎・乾癬・酒さ・脂漏性皮膚炎は皮膚科の領域でサプリは補助という前提です。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '8-12週で評価（Oe 2016 HA 12週 等）、累積効果型で評価指標＝①皮膚水分量（角層水分計・Corneometer）／②TEWL経表皮水分蒸散量（Tewameter）／③小じわ深さ・キメ（VISIA測定 or 主観）／④肌弾力（Cutometer）／⑤主観的乾燥・かさつき・粉ふき・かゆみを記録、12週で効果限定的なら①用量増量（HA 120→240mg/日・セラミド40→80mg/日）／②外用強化（HA外用2%+セラミド外用2%+パンテノール5%+ニコチン酸アミド5%）／③生活軸（加湿器・浴後3分以内保湿・洗顔過度回避・湯温38-39度・睡眠7-9時間・水分1.5-2L/日）／④🚨アトピー性皮膚炎・乾癬・酒さは皮膚科の領域（タクロリムス・コルチコステロイド・JAK阻害薬）／⑤食事軸（魚・大豆・緑黄色野菜・水分）が次の段階。' },
  ],
  'glutathione-vs-vitamin-c-oral': [
    { q: 'グルタチオンと経口ビタミンCの違いは？飲む美白で本当にシミ消える？', a: '作用機序が異なる補完関係ですが「飲む美白で確実にシミが消える」は両者とも論文ベースで断定NGが誠実な立場です。\n\nグルタチオン（GSH・経口250-500mg/日・点滴600-1,200mg・¥3,000-8,000/月）は細胞内最大の抗酸化物質で。\n\nメラニン産生段階（チロシナーゼ活性調整＋ユーメラニン→フェオメラニンへのスイッチ）に作用（Arjinpathana 2012 RCT n=60 500mg/日×4ヶ月で肌色明度のメラニン指数改善が報告された・Sonthalia 2018 Indian J Dermatolレビューで「経口GSHの臨床有効性は議論的・吸収率問題あり」と整理）。\n\n経口ビタミンC（500-1,000mg/日）は抗酸化＋コラーゲン合成促進が中心軸。\n\n経口での美白エビデンスは外用より弱い（Telang 2013 Indian Dermatol Online Jレビューで「経口Cはシステミック土台・シミ消去エビデンスは限定的」と整理）。\n\nの流れ＝外用ナイアシンアミド/TXA/アゼライン酸/ハイドロキノン処方が主役→経口は補助レイヤー。\n\n経口GSHは消化管でジペプチドに分解されやすく吸収率問題が論文指摘（Witschi 1992 Eur J Clin Pharmacol）。' },
    { q: '点滴・舌下・リポソーム経口の違いは？コスパ比較', a: '【点滴GSH（白玉点滴）】600-1,200mg/回・週1-2回・1-3ヶ月コースが美容皮膚科の一般的処方。\n\n1回¥4,000-12,000・コース¥40,000-150,000。\n\n血中濃度ピーク達成が高いが侵襲的＋費用高＋エビデンス階層は症例報告中心（Watanabe 2014 RCT n=83で点滴1,200mg×週2回×4週で皮膚明度改善が報告された）。\n\n🚨FDA 2015年に注射用GSH（米国規制）の品質懸念警告で品質管理が課題。\n\n【舌下GSH】500mgリポソーム舌下スプレー or トローチでSchmitt 2015 Eur J Nutrで舌下経路の血中濃度上昇が経口より高い報告、月¥5,000-12,000。\n\n【リポソーム経口GSH】500mgリポソーム化でSinha 2018 Eur J Clin Nutrで通常経口より血中濃度ピーク高い・Quicksilver Scientific Liposomal Glutathione / Pure Encapsulations Liposomal Glutathione等、月¥5,000-10,000。\n\n【通常経口GSH】Setria® GSH（協和発酵バイオ・規格化原料）500mg/日。\n\nSolgar Reduced L-Glutathione / Now Foods Glutathione 500mg、月¥2,000-5,000。\n\nコスパ比較＝通常経口（最安・吸収率低）<リポソーム経口・舌下（中コスト・吸収率中）<点滴（高コスト・吸収率高だが侵襲的）で目的別判断。' },
    { q: '美白目的なら外用×経口のどう組み合わせる？', a: 'の順番＝①外用が主役＝ハイドロキノン4%処方（皮膚科の領域・短期）+ レチノイン酸処方 or レチノール1% + ナイアシンアミド5-10% + TXA外用2-5% + アゼライン酸15-20% + VC外用15-20% + コウジ酸2% + α-アルブチン2-5%の多経路スタックが無難基盤、②経口は補助レイヤー＝GSH 500mg/日 + VC 500-1,000mg/日 + L-システイン 600-1,200mg/日（NAC・Watanabe 2014）+ TXA経口250-500mg×2回/日（処方・血栓リスク評価下）。\n\n③紫外線対策が一生の予防最強軸＝SPF50+ PA++++日次塗布 + 帽子 + サングラス + 物理的遮光・1-2時間ごと塗り直し、④医療処方治療＝QスイッチYAGレーザー・ピコレーザー・IPL・トレチノイン処方 + 既存シミ除去が王道最強軸、⑤生活軸＝睡眠7-9時間・抗酸化食（緑黄色野菜・ベリー類）・喫煙NG・節酒・経口避妊薬とHRTの肝斑悪化リスク認識。「飲むだけで美白」「シミが消える（断定）」「美白」断定は薬機法/景表法NG。' },
    { q: 'GSH・VC経口の併用注意は？高用量リスクは？', a: '【GSH経口】①血液凝固薬・抗血小板薬caution（理論的影響限定的だが手術前1-2週間中止推奨）、②化学療法中はcaution（抗酸化作用で抗腫瘍薬の作用減弱懸念・腫瘍内科判断下）。\n\n③妊娠中・授乳中は標準的安全性データ限定で産科医相談下。\n\n④稀に消化器症状（腹部膨満・嘔気）、⑤喘息既往はcaution（システイン代謝経路で気道過敏性懸念・Marrades 1997報告）。\n\n【VC経口】①🚨腎結石既往・シュウ酸尿症で高用量2g/日超caution（シュウ酸前駆体・Massey 2005 J Nutrで腎結石リスク上昇報告）。\n\n②鉄欠乏性貧血で非ヘム鉄吸収促進だが胃腸障害。\n\n③血糖測定干渉（in vitro偽高値・自己血糖測定器caution）。\n\n④G6PD欠損症（地中海貧血型）で高用量caution（溶血性貧血リスク・人口の0.5-2%）。\n\n⑤鉄サプリと2-3時間ずらすかVC併用で吸収増強2-3倍、⑥腎機能低下例caution（eGFR<30で1g/日以下推奨・腎臓内科判断）、⑦稀に下痢・胃痛・嘔気（4g/日超で頻発）。\n\n⑧抗凝固薬ワルファリンとの相互作用報告（INR変動）でモニタリング推奨。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '4-12週で評価（Arjinpathana 2012 GSH 4ヶ月 等）、累積効果型で評価指標＝①皮膚色明度（メラニン指数・皮膚色測定計・Mexameter）／②色素沈着面積・濃度（VISIA測定 or 主観）／③MASIスコア（肝斑特化）／④主観的明るさ・くすみ・ツヤ／⑤抗酸化指標（MDA・8-OHdG・hs-CRP・TAC）を記録、3-4ヶ月で効果限定的なら①用量増量（GSH 500→1,000mg/日・VC 500→2,000mg/日 腎結石既往なし限定）／②形態切替（通常経口→リポソーム経口→舌下→点滴の階段）／③外用強化（ナイアシンアミド+TXA+アゼライン酸+ハイドロキノン処方）／④皮膚科受診（重度肝斑・PIH・色素沈着は皮膚科の領域＝QスイッチYAGレーザー・ピコレーザー・IPL・トレチノイン）／⑤紫外線対策再評価／⑥生活軸再評価（睡眠・ストレス・喫煙・経口避妊薬・HRT・抗酸化食）が次の段階。' },
  ],
  'zinc-vs-azelaic-acid': [
    { q: '亜鉛とアゼライン酸の違いは？ニキビ対決でどっちが効く？', a: '作用経路と投与経路が異なる補完関係で併用OKが現実的。\n\n亜鉛（経口20-40mg/日・グルコン酸亜鉛/ピコリン酸亜鉛/酸化亜鉛）は抗炎症＋抗アンドロゲン（5α還元酵素阻害補助）＋抗菌の3経路で内側からニキビに作用（Dreno 2001 Acta Derm Venereol RCT n=332で亜鉛グルコン酸30mg/日×3ヶ月で炎症性ニキビスコア改善・テトラサイクリン同等の改善報告・Cervantes 2018 Dermatol Pract Conceptレビュー）。\n\nアゼライン酸（外用15-20%・処方・10%以下OTC）はチロシナーゼ阻害＋抗炎症＋抗菌（P.acnes/Cutibacterium）の3作用で外用から作用（Pochi 1986 Br J Dermatol RCT n=251で20%×3ヶ月でニキビ皮疹減少・酒さ第一選択薬・JDT 2020 RCT n=40で20%×24週がハイドロキノン4%と同等の肝斑改善）。\n\n軽症〜中等症ニキビは亜鉛単独 or 併用・ホルモン関連ニキビ・PIH併発・酒さ併発はアゼライン酸の優位性高。\n\n重症ニキビ・嚢胞性ニキビは皮膚科の領域（経口イソトレチノイン・経口抗生剤・経口避妊薬・スピロノラクトン処方）。' },
    { q: '用量・形態の選び方は？亜鉛形態別の違いは？', a: '【亜鉛】20-40mg/日が論文用量再現、形態別優先順位＝①亜鉛ピコリン酸（Zinc Picolinate）= 吸収率優位（Barrie 1987 Agents Actions・Thorne Zinc Picolinate 15-30mg / Solgar Zinc Picolinate）。\n\n②亜鉛グルコン酸 = ニキビRCT根拠（Dreno 2001・Now Foods Zinc Gluconate）。\n\n③亜鉛キレート L-OptiZinc® = 吸収バランス。\n\n④亜鉛硫酸 = コスパだが胃腸障害多。\n\n⑤亜鉛酸化物 = 吸収率最低で推奨しない。\n\n🚨長期高用量40mg/日超で銅欠乏Yadrick 1989 Am J Clin Nutrで銅併用（亜鉛:銅=10-15:1）推奨、月¥600-1,200。【アゼライン酸 外用】15-20%（処方）/10%以下（OTC）が論文用量再現。\n\nフィンレア®（処方・15%・第一三共）/ AZELIQ® / The Ordinary Azelaic Acid Suspension 10% / Paula\'s Choice 10% Azelaic Acid Booster / Naturium Azelaic Topical Acid 10%等、月¥1,500-5,000。\n\n摂取・塗布順序＝朝・夜2回外用アゼライン酸+ナイアシンアミド5%+保湿+SPF50+ + 経口亜鉛15-30mg/日（食事と同時）。' },
    { q: 'ニキビタイプ別の選び方（軽症・中等症・重症）', a: '重症度別介入軸＝【面皰主体（黒・白ニキビ）軽症】＝外用BHA（サリチル酸0.5-2%）+ レチノール0.025-0.1%（夜のみ）+ ニコチン酸アミド5%。\n\n【炎症性ニキビ（赤・膿胞）中等症】＝外用アゼライン酸15-20% + BPO（過酸化ベンゾイル2.5-5%）+ 経口亜鉛15-30mg/日 + 経口NAC 600-1,200mg/日。\n\n【嚢胞性ニキビ（深い・痛い）重症】＝🚨皮膚科の領域＝経口イソトレチノイン（ロアキュテイン®・要医師処方・血液検査・避妊指導・うつ症状monitoring）・経口抗生剤（ミノサイクリン・ドキシサイクリン）・経口避妊薬（女性・ヤーズ®・マーベロン®）・スピロノラクトン処方（女性・適応外処方）。\n\n【ホルモン関連ニキビ（あご・口周り・月経前悪化）】＝経口アシュワガンダ + マイインオシトール + ビタミンB6 + 婦人科受診（PCOS鑑別・テストステロン・LH/FSH測定）、\n\n【酒さ・赤ら顔併発】＝アゼライン酸15-20%第一選択 + イベルメクチン外用処方 + ブリモニジン外用処方 + 経口ドキシサイクリン低用量。\n\n【PIH（炎症後色素沈着）併発】＝ナイアシンアミド5-10% + TXA外用2-5% + アゼライン酸15-20% + VC外用15% + 紫外線対策厳守。' },
    { q: '併用注意は？妊娠中・授乳中は？', a: '【亜鉛経口】①🚨長期高用量40mg/日超で銅欠乏（Yadrick 1989）+ HDL低下（Black 1988）で銅併用必須。\n\n②テトラサイクリン/フルオロキノロン系抗菌薬・カルシウム・鉄サプリと2-4時間ずらす（吸収競合）、③ペニシラミン併用注意（キレート相互作用）、④胃腸障害（嘔気・嘔吐）で食事と同時摂取軽減。\n\n⑤妊娠中11mg/日範囲内・授乳中12mg/日範囲内で安全（ACOG・厚労省妊娠中推奨）。\n\n⑥銅欠乏症状（貧血・好中球減少・骨折・神経症状）月以上の長期高用量でmonitor。\n\n【アゼライン酸 外用】①🚨アスピリンアレルギー（サリチル酸過敏）はcaution・パッチテスト推奨。\n\n②白斑（vitiligo）既往caution（色素脱失リスク報告）。\n\n③妊娠中・授乳中ほぼ安全レイヤー（FDA Pregnancy Category B・経口イソトレチノインの代替軸）、④敏感肌は10%から開始+刺激軽減、⑤光感受性軽度上昇でSPF50+塗布必須、⑥稀に灼熱感・かゆみ・赤みで2-4週で慣れる。\n\n⑦アゼライン酸+BPO+レチノール同時使用は刺激重畳で時間分離（朝アゼライン酸+BPO・夜レチノール）。\n\n「ニキビが治る」「肌が綺麗になる」断定は薬機法/景表法NG→「炎症性ニキビ・面皰・色素沈着の改善が報告」型統一。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '4-16週で評価（亜鉛 Dreno 2001 12週・アゼライン酸 Pochi 1986 12週・JDT 2020 24週）、評価指標＝①炎症性病変数（面皰・丘疹・膿胞・嚢胞のカウント）／②非炎症性病変数（白・黒ニキビ）／③GAGS（Global Acne Grading System）／④CADI（Cardiff Acne Disability Index）／⑤PIH（炎症後色素沈着）面積・濃度／⑥皮脂量（Sebumeter）／⑦主観的赤み・痛み・かゆみを記録、12-16週で効果限定的なら①🚨皮膚科受診（重症・嚢胞性ニキビ・瘢痕化リスクは即時皮膚科の領域＝経口イソトレチノイン・経口抗生剤・経口避妊薬・スピロノラクトン）／②用量増量（アゼライン酸10→15-20%処方・亜鉛15→30mg/日）／③併用追加（BPO 2.5-5%+レチノール0.025-0.05%+ナイアシンアミド5%）／④生活軸（高GI食回避・乳製品過剰回避・睡眠7-9時間・ストレス軸再評価・洗顔過度回避）／⑤ホルモン軸（女性・月経周期との関連・PCOS鑑別・婦人科受診）が次の段階。' },
  ],
  'retinol-vs-vitamin-e': [
    { q: 'レチノールとビタミンEの違いは？両方とも脂溶性ビタミンだけど何が違う？', a: '作用ターゲットが完全に異なる補完関係です。\n\nレチノール（外用0.025-1%・ビタミンA誘導体）は核内レチノイン酸受容体RAR/RXR経由で遺伝子発現を調整し。\n\n表皮細胞のターンオーバー促進・コラーゲン産生・色素沈着抑制でしわ・光老化・色素沈着に強いRCTエビデンス（Kafi 2007 Arch Dermatol RCT 0.4%×24週で深いしわ改善・Mukherjee 2006 Clin Interv Aging レビューで光老化への有効性確立）、エビデンス階層 A（外用ビタミンA系で最強の論文蓄積）。\n\nビタミンE（外用α-トコフェロール0.5-5%・経口100-400IU/日）は脂質ラジカル消去型抗酸化として細胞膜の酸化ストレス抑制・他抗酸化成分の安定化が中心（Burke 2011 Indian Dermatol Online J review 等）。\n\n単独ヒトRCTのしわ・色素沈着改善は限定的でVCスタック前提のエビデンスが中心。\n\n「しわ・色素沈着→レチノール主役／抗酸化シールド・VC安定化→ビタミンE補助」の使い分け、併用OKでビタミンEがレチノール酸化分解を抑制する補完関係。' },
    { q: '用量・形態の選び方は？レチノール形態の違いは？', a: '【レチノール 外用】0.025-1%が論文用量再現、形態別エビデンス階層＝①レチノイン酸（トレチノイン・処方・第一線）= Kafi 2007 0.4%×24週で深いしわ改善。\n\n②レチナール（レチンアルデヒド）= レチノールの1段階先・刺激中（Sorg 2014 Dermatology RCT 0.05%×4ヶ月でしわ改善）。\n\n③レチノール = 中刺激・OTCの主役。\n\n④レチニルパルミテート = 弱・初心者向け。\n\n⑤新世代レチノイド（HPR/グラナクチン®）= 刺激極小・濃度高め可。\n\n🚨処方トレチノイン（レチノイン酸0.025-0.1%・第一三共・Stieva-A®/Retin-A®）は皮膚科処方のみ、OTC選択肢＝The Ordinary Retinol 0.5% in Squalane / Paula\'s Choice 1% Retinol Booster / Drunk Elephant A-Passioni Retinol Cream / SK-II GenOptics Aura Essence等、月¥2,000-15,000。【ビタミンE 外用】0.5-5%・α-トコフェロール（D-α-トコフェロール >> DL-α-トコフェロール 合成型）が無難形態。\n\nSkinCeuticals C E Ferulic / Drunk Elephant C-Firma Day Serum等のVCスタック品が主流、月¥10,000-18,000。【ビタミンE 経口】100-400IU/日・混合トコフェロール（α・β・γ・δ）が王道。\n\nNow Foods E-400 / Solgar Vitamin E、月¥1,000-3,000。\n\n🚨高用量400IU/日超は心血管リスク上昇報告（Miller 2005 Ann Intern Medメタ・JAMA 2005）で長期高用量回避。' },
    { q: 'レチノール×ビタミンE併用の論文ベースは？', a: '併用の論文ベース＝①ビタミンEがレチノール酸化分解を抑制する補完関係（Antille 2003 Dermatology in vitro実験でVE併用でレチノール安定化・SkinCeuticals C E Ferulic製品でVC15%+VE1%+フェルラ酸0.5%三者スタックがLin 2005 J Invest Dermatolで紫外線誘発光損傷を単独より顕著に抑制）。\n\n②朝のVC+VE+フェルラ酸スタック→日焼け止め+夜のレチノール+ニコチン酸アミド+保湿の朝晩二段スタックの組み立て。\n\n③VEは経口100-400IU/日と外用0.5-5%の両軸補完可能だが経口高用量400IU/日超は心血管リスク（Miller 2005 メタ）で外用主体+経口は食事ベース（ナッツ・植物油・緑黄色野菜・卵・全粒穀物）が現実的。\n\n④抗酸化スタック（VC15-20%+VE0.5-5%+フェルラ酸0.5%+グリーンティーポリフェノール+ナイアシンアミド5%）は光老化予防の最強軸で。\n\n⑤夜レチノール+VE併用は刺激軽減+効果安定で現実的。\n\n⑥妊娠中はレチノールNGでVE外用は妊娠中安全（バクチオール+VEの代替軸）。' },
    { q: 'レチノール・VE併用注意は？妊娠中・授乳中は？', a: '【レチノール 外用】①🚨妊娠中・授乳中・妊娠計画中NG（経口イソトレチノインの催奇形性データから外用も理論的回避推奨・ACOG/SOGC guidanceで妊娠中レチノイド回避・妊娠中代替軸=バクチオール+TXA+ナイアシンアミド+VC+アゼライン酸）、②夜のみ使用（紫外線でレチノール酸化分解・刺激重畳）。\n\n③日焼け止めSPF50+ PA++++日次必須。\n\n④初心者は0.025-0.05%週2-3回から段階的開始（A28日サイクルで皮膚適応）。\n\n⑤AHA/BHA併用は時間分離（朝AHA・夜レチノール）。\n\n⑥敏感肌・酒さ素因は新世代レチノイド（HPR）or バクチオール代替。\n\n⑦処方トレチノイン（レチノイン酸）は皮膚科処方のみ・刺激最強・経過観察必須、⑧開封後3-6ヶ月以内使用（酸化分解）。\n\n⑨眼周囲・口角・鼻翼は薄く塗布（刺激易）。\n\n【ビタミンE 経口】①🚨抗凝固薬ワルファリン・DOAC併用注意（ビタミンK拮抗作用・INR上昇・出血リスク・Miller 2005 メタ）。\n\n②高用量400IU/日超は心血管リスク上昇報告（Miller 2005 Ann Intern Medメタ・JAMA 2005）でα-トコフェロール単独高用量回避→混合トコフェロール+食事ベース。\n\n③前立腺癌リスク上昇報告（SELECT試験 JAMA 2011）で50歳以上男性高用量caution、④手術前1-2週間中止（出血リスク）。\n\n⑤妊娠中・授乳中は標準量400IU/日以下で安全レイヤー。「シワが消える」「肌が若返る」断定は薬機法/景表法NG。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '【レチノール】12-24週で評価（Kafi 2007 24週 等）、累積効果型で評価指標＝①しわ深さ（VISIA/Cutometer測定 or 主観）／②色素沈着面積（VISIA）／③肌弾力（Cutometer）／④キメ・毛穴（VISIA）／⑤主観的明るさ・ハリ／⑥赤み・刺激・乾燥（許容範囲）、24週で効果限定的なら①用量増量（0.025→0.05→0.1%→0.5→1%段階的）／②形態upgrade（レチノール→レチナール→処方トレチノイン）／③併用追加（VC15-20%+ナイアシンアミド5-10%+ペプチド+ヒアルロン酸+セラミド）／④皮膚科受診（QスイッチYAGレーザー・ピコレーザー・IPL 等）／⑤生活軸（紫外線対策厳守・睡眠・抗酸化食・喫煙NG）が次の段階。\n\n【ビタミンE】12-24週で評価（Burke 2011レビュー・Lin 2003）、評価指標＝①紫外線後の赤み・色素沈着（屋外活動後）／②しわ・キメ（VISIA・VC併用条件下）／③脂質過酸化指標（MDA・8-OHdG）／④主観的肌バリア感覚／⑤抗酸化効果（VC安定性確認）。\n\n累積効果型でVC併用が無難で単独評価は困難です。' },
  ],
  'ferulic-acid-vs-niacinamide': [
    { q: 'フェルラ酸とナイアシンアミドの違いは？', a: '経路が独立した補完関係です。\n\nフェルラ酸（外用0.5-1%・米ぬか・小麦ふすま由来植物性ポリフェノール）は抗酸化作用＋ビタミンC/Eの安定化役で。\n\nSkinCeuticals C E Ferulic（VC15%＋VE1%＋フェルラ酸0.5%）処方の根拠論文 Lin 2005 J Invest Dermatolで紫外線誘発光損傷を単独より顕著に抑制。\n\n単独ヒトRCTは限定的でVCスタック前提のエビデンス中心。\n\nナイアシンアミド（外用5%・ビタミンB3）はメラノソーム転移阻害＋バリア機能強化＋抗炎症＋皮脂調整の4方面に作用（Bissett 2005 RCT 5%×8週で色素沈着改善・Draelos 2005で毛穴・小じわ改善）。「フェルラ酸＝VC安定化のシールド／ナイアシンアミド＝多経路の主役」で併用OK、朝VC＋VE＋フェルラ酸＋ナイアシンアミドの抗酸化＋バリア複合スタックが王道。' },
    { q: '用量・形態の選び方は？', a: '【フェルラ酸 外用】0.5-1%が論文用量再現（Lin 2005で0.5%スタック）。\n\nSkinCeuticals C E Ferulic / Phloretin CF / Drunk Elephant C-Firma等のVCスタック品が主流（月¥15,000-20,000）。\n\nThe Ordinary Resveratrol 3% + Ferulic Acid 3%が低価格選択肢。【ナイアシンアミド】5%が論文用量再現（Bissett 2005）。\n\nThe Ordinary Niacinamide 10% + Zinc 1% / Paula\'s Choice 10% Niacinamide Booster / SkinCeuticals Metacell Renewal B3 / Olay Regenerist等、月¥1,000-10,000。\n\n塗布順序＝朝：VC15%+VE+フェルラ酸→ナイアシンアミド5%→保湿→SPF50+ PA++++。\n\n夜：レチノール or バクチオール→ナイアシンアミド5%→保湿（セラミド+パンテノール）が現実的。' },
    { q: 'フェルラ酸単独で意味ある？VCなしでも効く？', a: 'フェルラ酸単独のヒトRCTは限定的でVCスタック前提のエビデンスが中心。\n\n単独評価論文は in vitro 抗酸化・動物試験中心（Srinivasan 2007 J Clin Biochem Nutr review）。「フェルラ酸単独で何か変わるか」は論文ベースで断定NG。\n\nVC15-20%+VE+フェルラ酸0.5%の三者スタック（SkinCeuticals C E Ferulic処方）が無難軸で、フェルラ酸の役割は「VCを酸化分解から守る安定化役」が中心軸。VCなし単独使用は論文ベースでは推奨弱、ナイアシンアミドとの併用も補完的だが主役にはなりにくい立ち位置です。' },
    { q: '併用注意は？妊娠中・授乳中は？', a: '【フェルラ酸】①稀に赤み・刺激（敏感肌）でパッチテスト推奨。\n\n②妊娠中・授乳中の外用は安全レイヤー（経口データ限定）、③開封後3-6ヶ月以内使用（酸化分解）、④経口は標準的サプリ流通限定で食事ベース推奨。\n\n【ナイアシンアミド】①酒さ素因で稀に紅潮（フラッシング）だがアミド型は遊離型ナイアシンと違いフラッシング少。\n\n②高濃度20%超で稀に赤み・乾燥。\n\n③妊娠中・授乳中ほぼ安全レイヤー。\n\n④経口高用量3g/日超は肝機能影響でcaution（外用5%は問題なし）。\n\n⑤VC（純粋型 L-アスコルビン酸）と同時併用は1960年代の議論があったが現代の安定化処方では問題なし。「シミが消える」「シワが消える」断定は薬機法/景表法NG。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '4-12週で評価（ナイアシンアミド4-8週 Bissett 2005・フェルラ酸はVCスタック評価で12週）、評価指標＝①色素沈着面積・濃度（VISIA測定 or 主観）／②毛穴・キメ（VISIA）／③小じわ深さ（VISIA・Cutometer）／④皮脂量（Sebumeter）／⑤主観的明るさ・バリア感覚／⑥紫外線後の赤み・色素沈着、12週で効果限定的なら①用量増量（ナイアシンアミド5→10%・フェルラ酸0.5→1%）／②併用強化（VC15-20%+VE+ナイアシンアミド+レチノール夜+TXA+アゼライン酸）／③紫外線対策再評価／④皮膚科受診が次の段階。' },
  ],
  'centella-asiatica-vs-panthenol': [
    { q: 'センテラアジアチカとパンテノールの違いは？', a: '両者ともCICA（韓国スキンケアの赤み・敏感肌ケア）の代表成分で機序が異なる補完関係。\n\nセンテラアジアチカ（ツボクサエキス・外用0.1-2%・マデカッソシド/アジアチコシド/アジアチン酸/マデカシン酸の4成分群）は線維芽細胞活性化・コラーゲンI/III合成促進・抗炎症（Bylka 2013 Adv Wound Care reviewで創傷治癒・抗炎症・Ratz-Łyko 2016 J Cosmet Dermatolで肌バリア改善）。\n\nパンテノール（ビタミンB5前駆体・外用1-5%）は皮膚内でパントテン酸（CoA前駆体）に変換され角質層の水分保持・上皮再生・修復シグナル（Ebner 2002 Am J Clin Dermatolで D-パンテノール5%が皮膚バリア機能改善・Yang 2018で創傷治癒促進）。「センテラ＝細胞増殖シグナル／パンテノール＝水分保持＋修復シグナル」で併用OK、市販CICA配合製品にパンテノール併用が多い。' },
    { q: '用量・形態の選び方は？', a: '【センテラアジアチカ】0.1-2%が論文用量再現。\n\nMadecassoside単離0.1%が高エビデンス（Bonté 1994 Planta Med・La Roche-Posay Cicaplast Baume B5 / Dr.Jart+ Cicapair Tiger Grass / SKIN1004 Madagascar Centella Asiatica 100 / COSRX Centella Blemish Cream等）、月¥2,000-6,000。\n\n【D-パンテノール】1-5%が論文用量再現（Ebner 2002）。\n\nLa Roche-Posay Cicaplast / Bepanthen / Eucerin Aquaphor等の医薬部外品レイヤー製品が主流、月¥1,500-4,000。\n\n塗布順序＝洗顔→化粧水→センテラ+パンテノール+ナイアシンアミド5%（CICA セラム）→保湿（セラミド+ヒアルロン酸）→SPF50+の段階構成で。\n\nレチノール・AHA・BHA刺激後の鎮静ステップとして妥当。' },
    { q: 'CICA製品は本当に効果ある？マーケティングだけ？', a: '両者ともCICA領域で論文蓄積はあるが「劇的変化」エビデンスは限定的が誠実な立場。\n\nBonté 1994 Planta Medでマデカッソシドの抗炎症・コラーゲン合成促進が in vitro/動物試験で確立、Ratz-Łyko 2016で肌バリア改善ヒト試験あり、Ebner 2002でD-パンテノール5%皮膚バリア改善RCTあり。\n\nただし「敏感肌が劇的に治る」「酒さが治る」断定エビデンスはない。\n\n実用的位置づけ＝①刺激後の鎮静・修復補助（レチノール/AHA/BHA併用時）／②敏感肌・酒さの日常ケア基盤／③ニキビ後の修復／④バリア機能低下の補助でメイン治療ではなくサブシステム的補助レイヤー。\n\n酒さ・アトピー・乾癬は皮膚科の領域（タクロリムス・コルチコステロイド・JAK阻害薬・イベルメクチン・処方ブリモニジン）でCICA成分は補助。' },
    { q: '併用注意は？妊娠中・授乳中は？', a: '【センテラアジアチカ】①稀に接触皮膚炎・パッチテスト推奨。\n\n②マデカッソシド/アジアチコシドのアレルギー稀。\n\n③妊娠中・授乳中の外用ほぼ安全レイヤー。\n\n④経口センテラ（伝統的アーユルヴェーダ）は肝毒性症例報告で経口避ける。\n\n⑤手術前1-2週間外用中止検討（理論的に血小板影響軽微）。\n\n【パンテノール】①極めて安全プロファイル（医薬品レベル）、②妊娠中・授乳中安全。\n\n③ベパンテン®（医薬品）は乳児・新生児にも使用可、④ほぼ全肌タイプ対応。\n\n⑤稀にラノリン併用品でラノリンアレルギー。「酒さが治る」「アトピーが治る」断定は薬機法/景表法NG・医療領域。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '2-8週で評価（センテラ Ratz-Łyko 2016 8週・パンテノール Ebner 2002 4週・Yang 2018 8週）、早期効果型で評価指標＝①主観的赤み・刺激・かゆみ／②TEWL（経表皮水分蒸散量）／③皮膚水分量（Corneometer）／④紫外線後の赤み回復速度／⑤敏感肌反応閾値（化粧品許容範囲）、8週で効果限定的なら①用量増量（センテラ0.1→2%・パンテノール1→5%）／②併用強化（セラミド外用+スクワラン+ヒアルロン酸+ナイアシンアミド5%）／③皮膚科受診（酒さ・アトピー・乾癬・脂漏性皮膚炎は皮膚科の領域）／④生活軸（洗顔過度回避・湯温38-39度・刺激成分回避）／⑤食事軸（オメガ3・抗酸化食）が次の段階。' },
  ],
  'azelaic-acid-vs-vitamin-c-topical': [
    { q: 'アゼライン酸とビタミンC外用の違いは？併用OK？', a: '経路独立で併用OKの補完関係。\n\nアゼライン酸（外用10-20%・処方）はチロシナーゼ阻害＋抗炎症＋抗菌の3作用で色素沈着・ニキビ・酒さの3軸に対応（JDT 2020 RCT n=40で20%×24週がハイドロキノン4%と同等の肝斑改善・Pochi 1986 RCT n=251で酒さ・ニキビへの作用）。\n\nビタミンC外用は抗酸化＋コラーゲン合成促進＋メラニン産生抑制の3経路（Pinnell 2001でL-アスコルビン酸15%が紫外線誘発酸化ストレス抑制・Humbert 2003 RCT 5%×6ヶ月でしわ改善）。両者は経路独立で市販でもANUA等のアゼライン酸＋VC配合が普及、朝VC＋夜アゼライン酸のスタックが王道。アゼライン酸はハイドロキノン代替としてエビデンス・安全プロファイルが優秀（妊娠中比較的安全・長期使用可）、VCは安定化処方が必要・刺激リスクあり。' },
    { q: '用量・形態の選び方は？', a: '【アゼライン酸 外用】15-20%（処方）/10%以下（OTC）が論文用量再現。\n\nフィンレア®（処方・15%・第一三共）/AZELIQ®/The Ordinary Azelaic Acid Suspension 10% / Paula\'s Choice 10% Azelaic Acid Booster / Naturium Azelaic Topical Acid 10%等、月¥1,500-5,000。【VC外用】L-アスコルビン酸15-20%（純粋型）or 誘導体5-15%（APPS/3-O-Ethyl Ascorbic Acid/MAP/SAP）。\n\nSkinCeuticals C E Ferulic / Drunk Elephant C-Firma / Paula\'s Choice C15 Super Booster / Obagi-C Rx System / ロート製薬メラノCC等、月¥1,000-18,000。\n\n塗布順序＝朝：洗顔→VC15-20%+ナイアシンアミド5%+SPF50+ PA++++。\n\n夜：洗顔→アゼライン酸10-20%+ナイアシンアミド5%+保湿（セラミド+パンテノール）が現実的。' },
    { q: 'ニキビ・肝斑・酒さで使い分けは？', a: '【ニキビ（炎症性・PIH併発）】＝アゼライン酸15-20%主軸（Pochi 1986 RCTで酒さ・ニキビへの作用・抗菌+抗炎症+チロシナーゼ阻害の3経路で同時対応）+VC外用は色素沈着補助。\n\n【肝斑（メラズマ）】＝アゼライン酸20% > VC15-20%（JDT 2020 RCTでアゼライン酸20%がハイドロキノン4%同等の肝斑改善）+TXA外用2-5%+ナイアシンアミド5-10%+紫外線対策厳守の多経路スタック。\n\n【酒さ（赤ら顔）】＝アゼライン酸15-20%が第一選択（Cochrane 2015 review・FDA承認酒さ治療薬・処方フィンレア®15%）、VCは酸性pHで刺激リスクで控える。\n\n【光老化・くすみ・しわ】＝VC15-20% > アゼライン酸（Pinnell 2003・Humbert 2003でしわ改善・コラーゲン合成促進）。\n\n【🚨重症ニキビ・嚢胞性ニキビ・進行肝斑・進行酒さ】＝皮膚科の領域（経口イソトレチノイン・処方TXA経口・QスイッチYAGレーザー・処方ハイドロキノン4%・トレチノイン・イベルメクチン外用処方）でサプリ・化粧品は補助。' },
    { q: '併用注意は？妊娠中・授乳中は？', a: '【アゼライン酸 外用】①🚨アスピリンアレルギー（サリチル酸過敏）caution・パッチテスト推奨。\n\n②白斑（vitiligo）既往caution（色素脱失リスク報告）、③妊娠中・授乳中ほぼ安全（FDA Pregnancy Category B・経口イソトレチノインの代替軸）、④敏感肌は10%から開始、⑤稀に灼熱感・かゆみ・赤みで2-4週で慣れる、⑥光感受性軽度上昇でSPF50+塗布必須。\n\n【VC外用】①L-アスコルビン酸pH 2.5-3.5酸性で敏感肌・酒さ素因で赤み・刺激リスクでパッチテスト推奨、②開封後3-6ヶ月以内使用（酸化で褐色化）。\n\n③遮光ボトル+エアレスポンプ推奨。\n\n④妊娠中・授乳中の外用は安全プロファイル良好。\n\n⑤鉄欠乏性貧血で経口高用量は胃腸障害。\n\n⑥腎結石既往・シュウ酸尿症は経口高用量caution。「シミが消える」「肝斑が完治」「酒さが治る」断定は薬機法/景表法NG。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '4-24週で評価（アゼライン酸 JDT 2020 24週 等）、累積効果型で評価指標＝①色素沈着面積・濃度（VISIA測定 or 主観）／②MASIスコア（肝斑特化）／③炎症性ニキビ病変数／④酒さ重症度（CEA Clinician Erythema Assessment）／⑤しわ深さ（VISIA・Cutometer）／⑥肌弾力・キメ、24週で効果限定的なら①用量increment（アゼライン酸10→15-20%処方・VC15→20%）／②併用強化（ナイアシンアミド+TXA外用+レチノール夜+ハイドロキノン処方）／③皮膚科受診（重症肝斑・酒さ・ニキビは皮膚科の領域＝QスイッチYAGレーザー・ピコレーザー・IPL・処方薬）／④紫外線対策再評価／⑤生活軸（睡眠・ストレス・喫煙・経口避妊薬・HRT・抗酸化食）が次の段階。' },
  ],
  's-boulardii-vs-l-rhamnosus-gg': [
    { q: 'S. boulardii と L. rhamnosus GG の違いは？', a: '作用機序と適応が異なる補完関係。\n\nSaccharomyces boulardii（CNCM I-745株・500mg/日・酵母系プロバイオティクス）は「酵母」のため抗生剤の影響を受けない独自利点があり。\n\n抗生剤関連下痢（AAD）・C. difficile関連下痢の予防RCTで強いエビデンス（McFarland 2010 World J Gastroenterol メタ解析でAAD相対リスク減少・Szajewska 2015 メタ解析でC. diff再発リスク減少）。\n\nLactobacillus rhamnosus GG（ATCC 53103株・10-20億CFU/日・乳酸菌系）は小児急性下痢に対する最強エビデンス（Hojsak 2010 Cochrane review・WHO/ESPGHANガイドライン推奨）、CDIへの効果はメタ解析で示されているが Allen 2013 PLACIDE試験等で議論あり。「抗生剤併用→S. boulardii優先／小児急性下痢→LGG優先」の使い分けが無難、併用OK。' },
    { q: '用量・形態・株名の選び方は？', a: '【S. boulardii】500mg/日（5×10^9 CFU相当）が論文用量再現。\n\n🚨CNCM I-745株（Florastor® / Biocodex社特許株）が論文用量再現の規格化原料（他株は別物扱い）。\n\nFlorastor / Jarrow Formulas Saccharomyces Boulardii + MOS / Now Foods Saccharomyces Boulardii等、月¥2,000-4,000。\n\n【LGG】10-20億CFU/日が論文用量再現。\n\n🚨ATCC 53103株（Culturelle® / DSM社特許株）が論文用量再現の規格化原料。\n\nCulturelle Digestive Health / iHealthのLGG等、月¥1,500-3,500。\n\n重要原則＝プロバイオティクスは「株単位」で論文蓄積を評価（「乳酸菌配合」訴求のみで株名不明品は効果不確実）、摂取タイミング＝食事と同時 or 食直後（胃酸通過対策）。\n\n抗生剤併用時は服用2-4時間ずらす（生菌LGGの場合・S. boulardiiは酵母で抗生剤の影響受けない）。' },
    { q: 'いつ飲む？抗生剤と併用？', a: '【抗生剤関連下痢予防】＝S. boulardii主軸（抗生剤の影響受けない酵母・McFarland 2010メタ）、抗生剤開始と同時にS. boulardii 500mg/日 開始→抗生剤終了後2週間継続。\n\n【C. difficile関連下痢予防・再発予防】＝S. boulardii主軸（Szajewska 2015 メタ・標準治療バンコマイシン/フィダキソマイシン補助）。\n\n【小児急性ウイルス性下痢】＝LGG主軸（Hojsak 2010 Cochrane・WHO/ESPGHAN推奨）。\n\n【IBS-D（下痢型）】＝S. boulardii or LGG（個人差・症状軸で）。\n\n【🚨重症・血便・高熱・脱水・嘔吐持続・小児/高齢者の急性下痢】＝🚨即時医療機関受診で原因鑑別（細菌性赤痢・サルモネラ・カンピロバクター・ロタウイルス・ノロウイルス・C. diff・IBD）、プロバイオティクスは補助。' },
    { q: '併用注意は？免疫不全の人は使える？', a: '【S. boulardii】①🚨免疫不全（HIV/AIDS・化学療法中・移植後・中心静脈カテーテル留置・重症患者）caution（酵母菌血症の症例報告・Munoz 2005 Clin Infect Dis reviewで重症患者は禁忌寄り）。\n\n②妊娠中・授乳中は標準的安全性データ限定で産科医相談下。\n\n③抗真菌薬（ナイスタチン・フルコナゾール・ケトコナゾール）併用で効果減弱。\n\n④稀に消化器症状（腹部膨満・ガス）。\n\n【LGG】①🚨免疫不全・中心静脈カテーテル留置・敗血症ハイリスク caution（LGG菌血症の症例報告・Salminen 2002 Clin Infect Dis reviewでハイリスク群は医師相談）、②稀に消化器症状。\n\n③重症膵炎では PROBIOTICA試験 Lancet 2008でLactobacillusスタックが死亡率上昇報告で重症膵炎は禁忌寄り、④抗生剤と2-4時間ずらす（生菌のため）。\n\n⑤妊娠中・授乳中は安全レイヤー（食事ベースヨーグルト・キムチ・味噌は通常摂取可）。「腸が綺麗になる」「便秘が治る」「免疫力UP」断定は薬機法/景表法NG。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '【抗生剤関連下痢予防】抗生剤開始と同時開始→終了後2週間継続、効果指標＝下痢発生有無・便回数・性状。\n\n【小児急性下痢】摂取24-48時間で症状改善傾向（Hojsak 2010 Cochraneで平均1日短縮）、5日間が王道継続期間。\n\n【IBS-D】4-8週で評価、評価指標＝IBS-SSS（IBS Symptom Severity Score）・便回数・腹痛・便性状。\n\n効果限定的なら①株切替（S. boulardii↔LGG）／②マルチストレイン製品試行（VSL#3®・Visbiome®）／③消化器内科受診（IBD/SIBO/セリアック病/慢性膵炎/胆汁酸吸収不良/微小視顕微鏡的大腸炎 鑑別必須）／④食事軸（FODMAP・低乳製品・ストレス管理）／⑤生活軸（睡眠・運動・水分）が次の段階。' },
  ],
  'inulin-vs-psyllium': [
    { q: 'イヌリンとサイリウムの違いは？', a: '機能が完全に異なる水溶性食物繊維。\n\nイヌリン（5-10g/日・チコリ/アガベ由来フラクタン）はβ(2→1)結合のフルクタン構造でビフィズス菌・F. prausnitzii・Akkermansia等の選択的増殖を促す古典的プレバイオティクス（Slavin 2013 Nutrients reviewでビフィズス菌増殖・Dewulf 2013 Gut RCTで16g/日×3ヶ月でAkkermansia増加）。\n\nSCFAs（短鎖脂肪酸）産生促進で腸内環境改善が中心軸。\n\nサイリウム（5-10g/日・オオバコ種皮Plantago ovata由来）は強いゲル形成能で水分保持・便嵩増大・脂質吸着・LDL低下に作用（Anderson 2000 Am J Clin Nutrメタ解析でLDL有意低下・FDA心臓病リスク低減ヘルスクレーム認可）、便秘・IBS-C・コレステロール対策に現実的。「腸内細菌・SCFAs目的→イヌリン／便通・LDL対策→サイリウム」の使い分け。' },
    { q: '用量・形態の選び方は？', a: '【イヌリン】5-10g/日が現実的維持用量。\n\nOrafti®/Beneo（ベルギーBeneo社・チコリ由来）/Frutafit®（Sensus社）規格化原料。\n\nNow Foods Organic Inulin Pure Powder / DHC イヌリン / Anthony\'s Organic Inulin等、月¥1,500-3,000。\n\n少量から開始（2-3g/日→4週で5-10g/日）でガス・腹部膨満を回避（SIBO/IBS素因あり）。【サイリウム】5-10g/日が無難維持用量。\n\nMetamucil®（P&G）/オオバコ屋（伊那食品）/Konsyl®等、月¥1,000-3,000。\n\n🚨大量水分摂取必須（コップ1杯200mL以上の水と一緒に・気管支詰まりリスク）、摂取タイミング＝食前 or 食中（食物繊維の有効性活用）+ 薬の吸収阻害2時間ずらす。' },
    { q: 'どちらが便秘に効く？コレステロール対策は？', a: '【便秘（弛緩性・直腸性）】＝サイリウム主軸（ゲル形成能で便嵩増大・水分保持・Anderson 2000メタ）。\n\nマグネシウム酸化物（医薬品）併用可・水分1.5-2L/日厳守。\n\n【便秘（イヌリン効くタイプ）】＝腸内細菌叢の改善経由で間接的便通改善（Slavin 2013レビュー）だが短期効果はサイリウム >> イヌリン。\n\n【コレステロール・LDL対策】＝サイリウム主軸（Anderson 2000メタでLDL有意低下・FDA健康強調表示認可・5-10g/日×4-8週で-7%）+食事軸（飽和脂肪減・植物ステロール・ナッツ・大豆）+運動。\n\n【腸内環境改善・腸内細菌育成】＝イヌリン主軸（ビフィズス菌・F. prausnitzii 等）+発酵食品（味噌・キムチ・納豆・ヨーグルト）。\n\n【🚨IBD（潰瘍性大腸炎・クローン病）寛解期】＝サイリウム > イヌリン（イヌリンはガス症状悪化リスク）、活動期は消化器内科第一選択。' },
    { q: '併用注意は？SIBO・IBSは大丈夫？', a: '【イヌリン】①🚨SIBO（小腸内細菌異常増殖）/IBS（FODMAP不耐）でガス・腹部膨満・下痢悪化リスク（Halmos 2014 Gastroenterologyで高FODMAP食でIBS悪化・イヌリンは典型FODMAP）。\n\n②少量から開始（2-3g→4週で5-10g）で順応。\n\n③妊娠中・授乳中は標準量で安全。\n\n④🚨遺伝性フルクトース不耐症（HFI・希少疾患）禁忌。\n\n【サイリウム】①🚨大量水分摂取必須（コップ1杯200mL以上・粉末を乾いた状態で飲み込むと気管・食道閉塞リスク・FDA警告報告）、②薬の吸収阻害（経口避妊薬・甲状腺薬・抗うつ薬・抗凝固薬・ジゴキシン・リチウム・カルバマゼピン）で2時間ずらす。\n\n③炎症性腸閉塞・食道狭窄・嚥下障害禁忌。\n\n④妊娠中・授乳中は安全レイヤー。\n\n⑤稀にアレルギー（オオバコ花粉症と交差反応）。\n\n⑥糖尿病で血糖測定干渉なし・むしろ血糖緩徐。「腸が綺麗になる」「便秘が完治」「コレステロールが下がる（断定）」断定は薬機法/景表法NG（FDAヘルスクレームは「リスク低減助ける」レベル）。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '【サイリウム】便通改善1-2週・LDL低下4-8週（Anderson 2000メタ4-8週でLDL有意低下）、評価指標＝便回数・性状（Bristol Stool Scale 3-4目標）・LDL（4-8週後採血）・腹部膨満。\n\n【イヌリン】腸内環境改善2-4週・SCFAs上昇1-2週（Slavin 2013レビュー）、評価指標＝排ガス頻度（順応期は増加）・便回数・性状・主観的腹部不快感・便秘改善。\n\n効果限定的なら①用量増量（イヌリン5→10g/日・サイリウム5→10g/日）／②形態切替（粉末→カプセル・摂取性向上）／③併用追加（プロバイオティクス LGG/S. boulardii・マグネシウム酸化物医薬品）／④食事軸（FODMAP・水分1.5-2L/日・発酵食品）／⑤消化器内科受診（慢性便秘・血便・腹痛・体重減少は大腸内視鏡検査必須・大腸癌/IBD/憩室炎/SIBO鑑別）／⑥生活軸（運動・ストレス管理）が次の段階。' },
  ],
  'butyrate-vs-resistant-starch': [
    { q: '酪酸とレジスタントスターチの違いは？', a: '既製品 vs 前駆体の補完関係。\n\n酪酸（ブチレート）（経口500-1,500mg/日・酪酸ナトリウム/トリブチリン・腸溶コーティング推奨）は短鎖脂肪酸の代表で大腸上皮細胞の主要エネルギー源・抗炎症（HDAC阻害経由）・腸バリア強化に直接作用（Canani 2011 World J Gastroenterol reviewで腸内代謝産物・上皮ホメオスタシスの中心）、経口での生存率が課題（胃・小腸で吸収されやすく大腸到達が困難）。\n\nレジスタントスターチ（RS・5-30g/日・調理ジャガイモ冷蔵/青バナナ/高アミロースコーン由来）は大腸で腸内細菌（F. prausnitzii 等）が発酵させて内因性酪酸産生を促す前駆体（Topping 2003 Physiol Rev reviewで大腸SCFAs産生・Bird 2010 Mol Nutr Food Resで便量増・腸内環境改善）。「即時供給→酪酸（腸溶製剤）／持続供給×腸内細菌育成→RS」の補完関係。' },
    { q: '用量・形態の選び方は？', a: '【酪酸経口】500-1,500mg/日が王道維持用量。\n\n🚨腸溶コーティング・徐放性製剤が大腸到達の前提（通常剤型は胃・小腸で吸収され大腸到達せず）。\n\nButyraGen®/ButyrEn®/Sodium Butyrate enteric-coated規格化原料。\n\nBodyBio Sodium Butyrate / Healthy Origins Sodium Butyrate等、月¥2,500-5,000。【レジスタントスターチ】5-30g/日が論文用量再現、形態別＝①RS1（物理的バリア）= 全粒穀物・豆類。\n\n②RS2（B型結晶構造）= 青バナナ・生ジャガイモデンプン。\n\n③RS3（老化デンプン）= 冷蔵調理ジャガイモ・冷ご飯・冷パスタ。\n\n④RS4（化学修飾）= Hi-Maize® / Solnul® /Bob\'s Red Mill Potato Starch（生）/ 青バナナ粉等、月¥1,500-3,000。\n\n食事ベース（冷ご飯+冷ポテト+青バナナ）が現実的最強軸。\n\n摂取タイミング＝食事と同時 or 食後・水分1.5-2L/日厳守。' },
    { q: 'どちらを優先？腸内環境改善ではどっち？', a: '【腸内細菌叢の総合改善・F. prausnitzii/Roseburia育成】＝RS主軸（Bird 2010・Martinez 2010 Mol Nutr Food ResでRS摂取で酪酸産生菌増加・腸内多様性向上）。\n\n食事ベース（冷ご飯+冷ポテト+青バナナ+全粒穀物+豆類）が無難基盤。\n\n【IBD（潰瘍性大腸炎）寛解維持・大腸炎症の即時補助】＝酪酸経口（腸溶製剤）主軸（Canani 2011 reviewでIBD補助・Hamer 2010 Aliment Pharmacol Ther review・ただし臨床有効性は議論あり）、消化器内科第一選択は5-ASA/ステロイド/生物学的製剤、酪酸は補助レイヤー。\n\n【便通改善】＝RS主軸（イヌリンより穏やか・サイリウムより弱い）。\n\n【インスリン感受性・血糖管理】＝RS主軸（Robertson 2005 Diabetologia RCT n=10で30g/日RS摂取4週でインスリン感受性改善・Bodinham 2010 Diabet Med RCTで2型糖尿病患者）、糖尿病第一選択はメトホルミン・SGLT2阻害薬・GLP-1。\n\n【腸内多様性育成（FMTでの吉田法）】＝RS + イヌリン + ペクチン + サイリウムの多繊維スタックの進め方。' },
    { q: '併用注意は？SIBO・IBSは大丈夫？', a: '【酪酸経口】①🚨腸溶コーティング非製剤は大腸到達せず無効（製剤選択重要）。\n\n②稀に消化器症状（腹部膨満・ガス・下痢）で少量から開始。\n\n③妊娠中・授乳中は標準的安全性データ限定で産科医相談下。\n\n④🚨IBD活動期は消化器内科判断下（補助レイヤーだが医師判断）、⑤一部に「便臭」変化報告。\n\n【レジスタントスターチ】①🚨SIBO/IBS-D/FODMAP不耐でガス・腹部膨満・下痢悪化リスク（少量2-5g/日から開始・4週で30g/日）。\n\n②妊娠中・授乳中は食事ベース安全。\n\n③糖尿病で食後血糖緩徐（むしろ有益）。\n\n④🚨遺伝性炎症性腸疾患（IBD）活動期は消化器内科判断下、⑤稀に便秘（水分不足時）で水分1.5-2L/日厳守。\n\n⑥冷ご飯/冷ポテトの食中毒（黄色ブドウ球菌）リスクで冷蔵庫保存・早めに食べる。「腸が綺麗になる」「IBDが治る」断定は薬機法/景表法NG・医療領域。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '4-8週で評価（Canani 2011レビュー 等）、累積効果型で評価指標＝①便回数・性状（Bristol 3-4目標）／②腸内環境主観（腹部膨満・ガス・痛み）／③便秘/下痢頻度／④インスリン感受性・空腹時血糖・HbA1c（4-8週後採血）／⑤腸内細菌叢検査（マイキンソー・サイキンソー等）／⑥IBD症状（活動期は医師判断）、8週で効果限定的なら①用量増量（酪酸500→1,500mg/日・RS 5→30g/日段階的）／②食事ベース強化（冷ご飯+冷ポテト+青バナナ+全粒穀物+豆類）／③併用追加（イヌリン+サイリウム+プロバイオティクス LGG/S. boulardii）／④消化器内科受診（慢性便秘・下痢・血便・体重減少・腹痛は大腸内視鏡検査必須）／⑤生活軸（運動・ストレス・睡眠）が次の段階。' },
  ],
  'l-glutamine-vs-carnosine': [
    { q: 'L-グルタミンとカルノシンの違いは？', a: '作用ターゲットがほぼ独立で目的別の優先順位が異なる。\n\nL-グルタミン（5-15g/日・遊離アミノ酸）は腸管上皮細胞の主要エネルギー源・タイトジャンクション構造維持・リーキーガット仮説対策（Rao 2012 Curr Opin Clin Nutr Metab Care reviewで腸バリア修復・Zhou 2019 Gutメタ解析でIBSの腸透過性改善）、ストレス・術後・激しい運動後の腸粘膜回復に妥当。\n\nカルノシン（β-アラニル-L-ヒスチジンジペプチド・500-1,000mg/日）は抗糖化（AGEs生成阻害）・抗酸化・神経筋pH緩衝の3経路（Hipkiss 2009 Adv Food Nutr Res reviewで老化関連糖化阻害・Aldini 2011 J Cell Mol Medレビュー）、腸というより全身性の抗老化用途が中心軸。「腸粘膜修復・運動回復→L-グルタミン／抗糖化・抗老化・神経筋pH緩衝→カルノシン」で機序が独立、併用OKだが目的別の優先順位が異なる。' },
    { q: '用量・形態の選び方は？', a: '【L-グルタミン】5-15g/日が論文用量再現（Rao 2012・Zhou 2019 メタ）。\n\nNow Foods L-Glutamine Pure Powder / Optimum Nutrition L-Glutamine / Thorne L-Glutamine Powder等、月¥1,500-3,500。\n\n摂取タイミング＝空腹時 or 運動前後・分割摂取（5g×2-3回/日）が吸収最適化。【カルノシン】500-1,000mg/日が王道維持用量。\n\n🚨経口カルノシンは消化管でβ-アラニン+ヒスチジンに分解されやすい吸収率問題（Gardner 1991 J Nutrで経口血中ピーク低い）。\n\nβ-アラニン3.2-6.4g/日でカルノシン前駆体補給が現実的代替軸（Hoffman 2008 Amino Acids・Saunders 2017 メタで筋カルノシン濃度上昇）。\n\nNow Foods L-Carnosine 500mg / Doctor\'s Best L-Carnosine / Source Naturals L-Carnosine等、月¥2,500-5,000。' },
    { q: 'リーキーガット仮説は本当？グルタミンで治る？', a: '「リーキーガット症候群」は機能性医学の概念で従来医学では一般的疾患として確立されていないが「腸透過性亢進（intestinal permeability）」は論文蓄積あり（Bischoff 2014 BMC Gastroenterol review・Camilleri 2019 Gut reviewで腸透過性とIBS/IBD/セリアック病の関連）。\n\nL-グルタミンの腸透過性改善RCT＝Zhou 2019 Gut RCT n=106でグルタミン5g×3回/日×8週でPI-IBS（感染後IBS）の腸透過性・IBS-SSS改善（ヒトRCTの最強エビデンス）。\n\nBenjamin 2012 Dig Dis Sciクローン病小規模RCT・Buchman 2001 JPENで腸切除後。「リーキーガットが治る」「腸が完治」断定は薬機法/景表法NGで医療領域（IBD/セリアック病/SIBO/IBS）は消化器内科第一選択、グルタミンは補助レイヤー。' },
    { q: '併用注意は？妊娠中・授乳中は？', a: '【L-グルタミン】①🚨肝機能低下例（肝硬変・肝性脳症既往）caution（アンモニア代謝で脳症増悪リスク・肝臓内科判断下）。\n\n②🚨腎機能低下例caution（eGFR<60で減量・腎臓内科判断下）。\n\n③🚨双極性障害・てんかん既往caution（グルタミン酸過剰刺激神経興奮性懸念）。\n\n④妊娠中・授乳中は標準的安全性データ限定で産科医相談下。\n\n⑤稀に消化器症状（軽度膨満感）、⑥がん患者caution（腫瘍細胞増殖促進懸念・腫瘍内科判断下・特定がん種で議論）。\n\n【カルノシン】①極めて安全プロファイル、②稀に消化器症状。\n\n③妊娠中・授乳中の標準的安全性データ限定で産科医相談下。\n\n④亜鉛キレート型（Polaprezinc・プロマック®処方薬胃潰瘍治療薬）は別物で胃潰瘍は消化器内科第一選択。\n\n⑤β-アラニン代替時はparesthesia（ピリピリ感）が無難。「リーキーガットが治る」「老化が止まる」「アンチエイジング」断定は薬機法/景表法NG。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '【L-グルタミン】2-8週で評価（Zhou 2019 8週・Rao 2012レビュー）、累積効果型で評価指標＝①IBS-SSS（IBS Symptom Severity Score）／②腸透過性指標（Lactulose/Mannitol比・専門検査）／③便回数・性状／④腹部膨満・痛み／⑤主観的疲労感・運動回復、8週で効果限定的なら①消化器内科受診（IBD/セリアック病/SIBO/IBS鑑別）／②食事軸（低FODMAP・グルテン回避・乳製品・添加物）／③ストレス管理（CBT・マインドフルネス）／④プロバイオティクス併用（LGG/S. boulardii/VSL#3®）。\n\n【カルノシン】4-12週で評価（Hipkiss 2009レビュー）、評価指標＝①AGEs指標（HbA1c・グリコアルブミン・専門検査でCML/ペントシジン）／②抗酸化指標（MDA・8-OHdG・hs-CRP）／③主観的疲労感・運動パフォーマンス／④しわ・キメ（VISIA）。\n\n累積効果型でβ-アラニン代替が王道で経口カルノシン単独評価困難です。' },
  ],
  'akkermansia-vs-inulin': [
    { q: 'アッカーマンシアとイヌリンの違いは？戦略が真逆？', a: '戦略が真逆の補完関係。両者ともAkkermansia muciniphila（粘液層に常在し腸バリア・代謝健康に関与する次世代プロバイオ標的菌）を中心軸に据えるが直接補充 vs プレバイオで内因性増殖で戦略が異なる。\n\nAkkermansia直接補充（パスツール化死菌Pasteurized Akkermansia・1×10^10/日・MucinHealth等の規格化品）は肥満・耐糖能・腸バリアでヒトRCTが進展（Depommier 2019 Nat Med RCT n=32で肥満インスリン抵抗性のメタボ指標改善・パスツール化死菌の方が生菌より安全プロファイル良好）、即効性高だが高コスト・規格化品入手限定。\n\nイヌリン（5-10g/日・チコリ由来フラクタン）はAkkermansia含む腸内常在ビフィズス菌・F. prausnitzii等を内因的に増殖させる古典プレバイオティクス（Dewulf 2013 Gut RCTでイヌリン由来フラクタン16g/日×3ヶ月でAkkermansia muciniphila増加）、低コスト・腸内多様性向上だがガス症状リスク。' },
    { q: '用量・形態の選び方は？日本で買える？', a: '【Akkermansia直接補充】1×10^10/日（死菌・パスツール化）が論文用量再現。\n\n🚨パスツール化死菌の方が生菌より安全＆効果安定（Depommier 2019 Nat Med・生菌は腸内常在環境で複雑な相互作用）。\n\nMucinHealth™ Akkermansia（Pendulum Therapeutics社・USA）/Daisy Health Akkermansia / Vitastem Akkermansia muciniphila Postbiotic等。\n\n🚨日本市場での規格化品入手は限定的（個人輸入主体）、月¥10,000-15,000。【イヌリン】5-10g/日が論文用量再現。\n\nOrafti®/Beneo/Frutafit®規格化原料。\n\nNow Foods Organic Inulin / DHC イヌリン / Anthony\'s Organic Inulin等、月¥1,500-3,000、国内入手容易。\n\n戦略の選択＝コストパフォーマンス・国内入手→イヌリン主軸。\n\n研究最前線・代謝指標改善→Akkermansia直接補充検討、併用OK（イヌリン+Akkermansia直接補充の二段スタック）。' },
    { q: 'メタボ・糖尿病・肥満で本当に効く？', a: 'Akkermansia直接補充のメタボ指標改善RCT＝Depommier 2019 Nat Med RCT n=32 オーバーウェイト/肥満インスリン抵抗性患者・パスツール化死菌Akkermansia 1×10^10/日×3ヶ月でインスリン感受性・総コレステロール・体重維持改善（「治療」レベルではなく「補助レイヤー」エビデンス）。\n\nCani 2017 Nat Rev Endocrinol review機序確立。ただし「肥満が治る」「糖尿病が治る」断定は薬機法/景表法NGでメタボ・糖尿病は内分泌内科第一選択（メトホルミン・SGLT2阻害薬・GLP-1作動薬・食事療法・運動療法）でAkkermansiaは補助レイヤー。\n\n実用的位置づけ＝①食事軸（地中海食・低GI・繊維質）+②運動（週150分以上）+③睡眠+④医療治療（メトホルミン等）+⑤Akkermansia/イヌリン補助の多軸介入が現実解。' },
    { q: '併用注意は？妊娠中・授乳中は？', a: '【Akkermansia直接補充】①🚨パスツール化死菌は安全プロファイル良好（生菌より安全）。\n\n②免疫不全（HIV/AIDS・化学療法中・移植後）caution（医師相談）。\n\n③妊娠中・授乳中は標準的安全性データ限定で産科医相談下、④抗生剤併用時は影響限定的（死菌のため）。\n\n⑤稀に消化器症状（腹部膨満・ガス）。\n\n⑥糖尿病・メタボは内分泌内科第一選択でAkkermansiaは補助レイヤー。\n\n【イヌリン】①🚨SIBO/IBS-D/FODMAP不耐でガス・腹部膨満・下痢悪化リスク（少量2-3g/日→4週で5-10g/日）。\n\n②妊娠中・授乳中は安全レイヤー。\n\n③遺伝性フルクトース不耐症HFI禁忌、④水分1.5-2L/日厳守。\n\n⑤糖尿病で血糖測定干渉なし・むしろ血糖緩徐。「腸が綺麗になる」「メタボが治る」「肥満が治る」断定は薬機法/景表法NG・医療領域。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '4-12週で評価（Depommier 2019 3ヶ月・Dewulf 2013 3ヶ月）、累積効果型で評価指標＝①腸内細菌叢検査（マイキンソー・サイキンソーでAkkermansia%測定）／②インスリン感受性（HOMA-IR・空腹時血糖・HbA1c）／③体重・体脂肪率・腰囲／④脂質パネル（LDL/HDL/TG/総コレステロール）／⑤腸内環境主観（便回数・性状・腹部膨満・ガス）／⑥炎症マーカー（hs-CRP）、12週で効果限定的なら①用量増量（イヌリン5→10g/日・Akkermansia生菌切替検討）／②併用追加（イヌリン+Akkermansia直接補充の二段スタック+食物繊維25g/日+発酵食品）／③内分泌内科/消化器内科受診（メタボ・糖尿病・肥満・脂肪肝は医療領域）／④食事軸（地中海食・低GI・繊維質）／⑤運動（週150分以上有酸素+筋トレ）／⑥生活軸（睡眠・ストレス）が次の段階。' },
  ],
  'beta-alanine-vs-l-citrulline': [
    { q: 'β-アラニンとL-シトルリンの違いは？', a: '運動補助でメカニズムが完全独立の補完関係。\n\nβ-アラニン（3.2-6.4g/日・カルノシン前駆体）は筋肉内カルノシン濃度を増やしH+緩衝能を上げて高強度・短時間運動（1-4分の中強度〜高強度）の持久力に作用（Hoffman 2008 Amino Acids RCT n=30で4-6週で持久力改善・Saunders 2017 Br J Sports Medメタ解析）、効果発現は累積型で4-8週の継続摂取が必要、副作用としてピリピリ感（paresthesia）。\n\nL-シトルリン（運動前6-8g・マレート型8-10g）は血管内NO産生→血流増加・パンプ感・乳酸クリアランス改善で即効性が特徴（Bailey 2010 J Appl Physiol RCTで6g摂取後NO増加・運動効率改善・Pérez-Guisado 2010 RCT 8gでレジスタンス運動反復+52.9%）、トレーニング当日〜数日の即時報酬。「持久力（β-アラニン）vs パンプ（シトルリン）」「累積（β-アラニン）vs 即時（シトルリン）」の二軸補完関係。' },
    { q: '用量・形態の選び方は？', a: '【β-アラニン】3.2-6.4g/日が論文用量再現（Saunders 2017 メタ・ISSN Position Stand 2015）。\n\n🚨1回1.6g以下分割摂取でparesthesia（ピリピリ感）軽減。\n\n徐放型CarnoSyn®/SR CarnoSyn®（NAI社特許製法）が論文用量再現の規格化原料。\n\nNow Foods Beta-Alanine Powder / Optimum Nutrition Beta-Alanine / NutraBio Beta-Alanine Carnosyn®等、月¥1,500-3,500。\n\n【L-シトルリン】運動前6-8g（純粋型）/ 8-10g（マレート型1:1 or 2:1比）が論文用量再現。\n\nシトルリンマレート（プレワーク用途・乳酸クリアランス）vs 純粋L-シトルリン（維持・血流NO産生）。\n\nKyowa Quality™ L-Citrulline（協和発酵バイオ）規格化原料。\n\nNow Foods L-Citrulline / Sports Research Citrulline Malate / Bulk Supplements Citrulline Malate 2:1等、月¥2,000-4,500。\n\n摂取タイミング＝β-アラニン分割摂取（朝・運動前・夜の3回）+ シトルリン運動前30-60分（空腹時）。' },
    { q: '併用OK？プレワークスタックの最適解は？', a: '併用OKでプレワーク総合スタックがISSN Position Stand 2015での段階構成＝①β-アラニン3.2-6.4g/日（分割・累積効果型）+②シトルリンマレート6-8g（運動前30-60分・即時効果型）+③クレアチンモノハイドレート5g/日（運動後+食事と同時・累積効果型）+④カフェイン200-400mg（運動前30-60分・即時覚醒・パフォーマンス向上）+⑤ホエイプロテイン20-40g（運動後30分以内・筋合成）+⑥水分1.5-2L/日厳守が4-6成分スタック。\n\nTrexler 2015 J Int Soc Sports Nutr Position Statementで4-6成分マルチスタックの相乗効果確立。' },
    { q: '併用注意は？妊娠中・授乳中は？', a: '【β-アラニン】①paresthesia（ピリピリ感・15-20分・無害）で1回1.6g以下分割摂取で軽減。\n\n②妊娠中・授乳中は標準的安全性データ限定で産科医相談下、③タウリン併用注意（β-アラニン高用量でタウリン取り込み阻害理論的懸念・Dolan 2018だがヒトデータ限定）、④腎機能低下例caution（eGFR<60で減量・腎臓内科判断下）、⑤稀に消化器症状。\n\n【L-シトルリン】①🚨降圧薬caution（血圧低下作用報告・Wong 2016 Br J Nutrメタ）。\n\n②🚨PDE5阻害薬（バイアグラ®・シアリス®）併用caution（NO/cGMP経路重畳で過度の血圧低下）。\n\n③🚨硝酸薬（ニトログリセリン・ISDN）併用禁忌（過度の血圧低下+ショック）、④妊娠中・授乳中はデータ限定で産科医相談下。\n\n⑤ヘルペス活動性期caution（理論的にアルギニン代謝経路で複製サポート懸念・リジン代替推奨）、⑥手術前1-2週間中止検討。「マッチョになる」「ムキムキになる」断定は薬機法/景表法NG→「持久力・パンプ・運動効率改善が報告」型統一が現実的。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '【β-アラニン】4-8週で評価（Saunders 2017 メタ・Hoffman 2008 4-6週）、累積効果型で評価指標＝①持久力テスト（1-4分高強度・サイクリングTT・ローイング）／②反復回数（8-12RM）／③主観的疲労感／④筋カルノシン濃度（専門検査・MRS）。\n\n【L-シトルリン】急性効果＝摂取30-60分後にNO上昇・血流増加・パンプ感（Bailey 2010）。\n\n1-2週で持久力・運動効率改善（Suzuki 2016）、評価指標＝プレワーク主観（パンプ・反復回数・疲労感）+持久力テスト（VO2max・LT・タイムトライアル）。\n\n効果限定的なら①用量増量（β-アラニン3.2→6.4g/日・シトルリン6→10g/日）／②形態切替（純粋→マレート型→徐放型）／③併用追加（クレアチン+カフェイン+ホエイ）／④トレーニング負荷見直し（漸進性過負荷・ボリューム・強度）／⑤栄養軸（タンパク質1.6-2.2g/kg・カロリー収支）／⑥睡眠7-9時間が次の段階。' },
  ],
  'tongkat-ali-vs-ashwagandha': [
    { q: 'トンカットアリとアシュワガンダの違いは？', a: '両者ともアダプトゲン系ハーブで男性活力・ストレス耐性領域で重なるがメカニズムが異なる。\n\nトンカットアリ（Eurycoma longifolia・200-400mg/日・Physta®/LJ100®規格化抽出物）はコルチゾール低下＋テストステロン（特にfree-T）関連で報告蓄積（Tambi 2012 Andrologia RCT n=76で200mg/日×4週でテストステロン正常化・SHBG低下・Talbott 2013 J Int Soc Sports Nutr RCT n=63で200mg/日×4週でストレス指標・コルチゾール改善）。\n\nアシュワガンダ（KSM-66/Sensoril 300-600mg/日）はHPA軸調整経由のコルチゾール低下・睡眠の質改善・テストステロン関連で論文蓄積（Lopresti 2019 Am J Mens Health RCT n=57で600mg/日×8週でテストステロン・DHEAS関連改善・Salve 2019 RCT n=60でコルチゾール有意低下）。「即効性のテストステロン関連→トンカットアリ／慢性ストレス×睡眠×累積→アシュワガンダ」の使い分け、両者経路独立で併用可能（朝トンカットアリ＋夜アシュワガンダの二段スタック）。' },
    { q: '用量・形態の選び方は？規格化原料の重要性は？', a: '【トンカットアリ】200-400mg/日が論文用量再現。\n\n🚨Physta®（HP Ingredients社・FDA NDI届出済・水抽出物）/LJ100®（HP Ingredients社・eurycomanone 22%標準化）規格化原料が論文用量再現の前提。\n\n「トンカットアリ配合」訴求のみで規格不明品は重金属（鉛・水銀）混入歴（Tambi 2012で重金属管理規格化品の重要性指摘）。\n\nNutricost Tongkat Ali / Double Wood Tongkat Ali / Solaray Tongkat Ali Physta®等、月¥3,000-7,000。\n\n【アシュワガンダ】KSM-66 300-600mg/日 or Sensoril 250-500mg/日が論文用量再現。\n\n🚨KSM-66®（Ixoreal Biomed社・withanolides 5%標準化・根のみ抽出）/Sensoril®（NutraGenesis社・withanolides 10%標準化・根+葉抽出物）が論文用量再現の規格化原料。\n\nJarrow Formulas Ashwagandha KSM-66 / Nutricost Ashwagandha KSM-66 / Now Foods Ashwagandha Sensoril等、月¥1,500-4,000。\n\n摂取タイミング＝朝食後トンカットアリ200-400mg + 夕食後or就寝前アシュワガンダ300-600mgの二段スタック。' },
    { q: '男性活力ハーブで論文ベースの差は？', a: '両者ともヒトRCTのテストステロン関連エビデンス蓄積ありだが主軸が異なる＝トンカットアリ＝SHBG（性ホルモン結合グロブリン）低下→free-T（遊離テストステロン）相対的上昇（Tambi 2012）+即効性4-8週、アシュワガンダ＝HPA軸調整→コルチゾール低下→ホルモン環境改善+睡眠の質改善+全身ストレス耐性（Salve 2019・Lopresti 2019）+累積効果8-12週。\n\n「テストステロンが○%上がる」断定は薬機法/景表法NGでホルモン関連指標の改善が報告型統一が誠実。\n\n男性更年期（LOH症候群・テストステロン低下）疑い＝🚨泌尿器科第一選択（血液検査で総テストステロン・遊離テストステロン・LH/FSH/PRL/SHBG測定・LOH症候群診断・テストステロン補充療法TRT処方検討）でハーブは補助レイヤー。\n\n🚨前立腺癌既往・PSA高値はホルモン関連サプリ全般禁忌寄りで泌尿器科判断下。' },
    { q: '併用注意は？前立腺癌・甲状腺は？', a: '【トンカットアリ】①🚨前立腺癌既往・PSA高値・前立腺肥大症caution（理論的にテストステロン関連で進行リスク懸念・泌尿器科判断下）、②🚨女性は妊娠中・授乳中NG。\n\n③SSRI・抗精神病薬caution（理論的相互作用）、④抗凝固薬caution（理論的影響）。\n\n⑤糖尿病薬で血糖低下増強の可能性monitor、⑥肝機能影響データ限定で長期高用量回避。\n\n【アシュワガンダ】①🚨甲状腺機能亢進症NG（Sharma 2018 J Altern Complement Medでアシュワガンダで甲状腺ホルモン上昇・甲状腺機能亢進症・グレーブス病・橋本病でリチウム作用も）。\n\n②🚨自己免疫疾患（橋本病・SLE・関節リウマチ・乾癬・1型糖尿病）caution（Mishra 2000 Altern Med Revでimmunomodulatory作用報告）、③🚨妊娠中・授乳中NG（流産リスク報告）。\n\n④鎮静薬・睡眠薬・抗不安薬caution（鎮静作用重畳）。\n\n⑤甲状腺薬・SSRI・抗精神病薬・降圧薬caution。\n\n⑥稀に消化器症状（嘔気・嘔吐・下痢）。「テストステロンが上がる」「精力UP」「若返り」断定は薬機法/景表法NG。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '4-12週で評価（トンカットアリ Tambi 2012 4週・Talbott 2013 4週・アシュワガンダ Salve 2019 8週・Lopresti 2019 8週）、評価指標＝①総テストステロン・遊離テストステロン・SHBG・LH/FSH（血液検査）／②コルチゾール（朝/夕の唾液 or 血液検査）／③性機能（IIEF-5/AMS質問票）／④筋力（1RM・8-12RM反復回数）／⑤睡眠の質（PSQI）／⑥ストレス（PSS）／⑦疲労感（FACIT-F）／⑧主観的活力・気分・集中力、12週で効果限定的なら①🚨泌尿器科受診（男性更年期・LOH症候群 等）／②内分泌内科（甲状腺・副腎・下垂体機能評価）／③心療内科（慢性ストレス・うつ・睡眠障害）／④生活軸（運動・タンパク質・睡眠7-9時間・体重管理・節酒・禁煙）／⑤食事軸（亜鉛・ビタミンD・オメガ3・卵・赤身肉・牡蠣）／⑥併用追加（亜鉛15-30mg/日+ビタミンD 2,000IU+マグネシウム）が次の段階。' },
  ],
  'tribulus-terrestris-vs-tongkat-ali': [
    { q: 'トリブルスとトンカットアリの違いは？論文ベースで差は？', a: '論文蓄積の質に明確な差があります。\n\nトリブルス・テレストリス（Tribulus terrestris・500-1,500mg/日・ハマビシ）は古典アーユルヴェーダ・伝統的男性活力ハーブで。\n\n過去の動物試験は豊富だがヒトRCTでのテストステロン上昇エビデンスは限定的（Pokrywka 2014 Biol Sport reviewで「ヒトRCTでテストステロン有意上昇は確認されていない」と整理・Roaiah 2016 J Sex Med RCT n=180でED症状改善は報告されたがホルモン変化は限定的・Neychev 2005 J Ethnopharmacolで若年男性のテストステロン変化なし）。\n\nトンカットアリ（Eurycoma longifolia・200-400mg/日）はfree-T増加・SHBG低下のヒトRCT蓄積が比較的厚い（Tambi 2012 Andrologia RCT n=76・Talbott 2013 J Int Soc Sports Nutr RCT n=63）。「ヒトRCTのテストステロン関連エビデンス→トンカットアリ優位／伝統的使用・性機能・ED→トリブルス」の整理。' },
    { q: '用量・形態の選び方は？プロトジオサポニン含量重要？', a: '【トリブルス】500-1,500mg/日が論文用量域。\n\nTribestan®（Sopharma社・ブルガリア・60%プロトジオサポニン標準化）が伝統的規格化原料。\n\n「プロトジオサポニン40-90%標準化」表示が品質指標だがヒトRCTのテストステロン上昇エビデンスは限定的。\n\nNow Foods Tribulus 1,000mg / Optimum Nutrition Tribulus Maximus / Nutricost Tribulus Terrestris等、月¥1,500-3,000。\n\n【トンカットアリ】200-400mg/日が論文用量再現。\n\n🚨Physta®/LJ100®規格化原料が無難選択、月¥3,000-7,000。\n\n選択軸＝論文ベースのテストステロン関連エビデンス→トンカットアリ優位。\n\nED・性機能補助・伝統的使用→トリブルス。\n\nコストパフォーマンス→トリブルス。\n\n併用は経路類似で重複だが理論的に可能。' },
    { q: 'ED・性機能改善エビデンスは？医療治療との関係は？', a: '【ED・性機能改善のヒトRCT】＝Roaiah 2016 J Sex Med RCT n=180でTribulus 750mg/日×3ヶ月でIIEF-EFスコア改善（テストステロン変化なし）。\n\nAkhtari 2014 DARU J Pharm Sci RCT n=67でTribulus 7.5g/日でPDE5阻害薬補助としてのED改善。\n\n🚨ED（勃起機能不全）は泌尿器科第一選択＝①PDE5阻害薬（バイアグラ®・シアリス®・レビトラ®・ザイデナ®・ステンドラ®）= 第一選択薬・8割の症例で有効・処方薬・要医師判断、②心血管原因鑑別（ED発症3-5年後の心筋梗塞リスク上昇報告でED=心血管病の早期警告マーカー）。\n\n③糖尿病・高血圧・脂質異常症の管理。\n\n④心因性ED→心療内科・カウンセリング。\n\n⑤テストステロン補充療法（TRT）= 男性更年期/LOH症候群の特定症例。トリブルス・トンカットアリは補助レイヤーで医療領域では第一選択ではない。「ED が治る」「精力UP」「精力剤」断定は薬機法/景表法NG。' },
    { q: '併用注意は？前立腺癌・心血管疾患は？', a: '【トリブルス】①🚨前立腺癌既往・PSA高値・前立腺肥大症caution（理論的ホルモン関連でテストステロン関連リスク懸念・泌尿器科判断下）。\n\n②🚨心血管疾患既往・心不全caution（Tribulusで動悸・血圧変動報告）。\n\n③🚨糖尿病で血糖低下増強monitor、④🚨女性は妊娠中・授乳中NG（ホルモン作用懸念）、⑤抗凝固薬caution（理論的影響）、⑥稀に消化器症状・頭痛。\n\n【トンカットアリ】①🚨前立腺癌既往・PSA高値・前立腺肥大症caution、②🚨女性は妊娠中・授乳中NG。\n\n③SSRI・抗精神病薬・抗凝固薬・糖尿病薬caution、④肝機能影響データ限定で長期高用量回避。\n\n両者併用＝経路類似で重複・併用の合理性論文ベースで限定的。\n\n「テストステロンが上がる」「精力UP」「ED治る」断定は薬機法/景表法NG→「ホルモン関連指標・ED症状の改善が報告」型統一。\n\n🚨ED・男性更年期は泌尿器科第一選択でハーブは補助レイヤー。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '4-12週で評価（Tribulus Roaiah 2016 12週 等）、評価指標＝①総テストステロン・遊離テストステロン・SHBG・LH/FSH 等（血液検査・年1回以上）／②ED症状（IIEF-EFスコア・AMS質問票）／③性機能・性欲・主観的活力／④筋力（1RM・8-12RM）・コルチゾール（朝/夕）／⑤体組成（除脂肪体重・体脂肪率）／⑥血圧・血糖・脂質パネル、12週で効果限定的なら①🚨泌尿器科受診（ED・男性更年期・LOH症候群・PSA高値・前立腺肥大症は泌尿器科第一選択＝PDE5阻害薬・テストステロン補充療法TRT・PSA定期検査）／②内分泌内科（甲状腺・副腎・下垂体機能評価）／③心療内科（心因性ED・うつ・慢性ストレス）／④生活軸（運動・タンパク質・睡眠7-9時間・体重管理・節酒・禁煙）／⑤食事軸（亜鉛・ビタミンD・オメガ3）／⑥併用切替（トリブルス→トンカットアリ→アシュワガンダの階段）が次の段階。' },
  ],
  'creatine-vs-beta-alanine': [
    { q: 'クレアチンとβ-アラニンの違いは？', a: '作用時間軸が完全に異なる補完関係。\n\nクレアチン（モノハイドレート3-5g/日）はATP-クレアチンリン酸系（短時間爆発的運動・1-10秒）のATP再合成促進で筋力・パワー・除脂肪体重に作用（Kreider 2017 J Int Soc Sports Nutrメタ解析・JISSN 2017ガイドライン・100以上のRCT統合）、効果発現3-4週で運動補助サプリで最も論文蓄積が厚い。\n\nβ-アラニン（3.2-6.4g/日）は筋肉内カルノシン濃度を増やしH+緩衝能を上げて中強度持久（1-4分）に作用（Hoffman 2008 Amino Acids RCT・Saunders 2017 Br J Sports Medメタ解析）、効果発現4-8週。「短時間爆発（クレアチン）×中強度持久（β-アラニン）」で時間軸が補完関係、併用OK・トレーニング目的に応じて優先順位が決まる。' },
    { q: '用量・形態・併用スタックの最適解は？', a: '【クレアチン】5g/日（維持用量）or ローディング20g/日×5-7日→維持5g/日。\n\nCreapure®（AlzChem社・ドイツ）規格化原料が論文用量再現の前提（純度99.99%・他形態HCl/ナイトレート/エチルエステルはCrMを凌駕するエビデンスなし）。\n\nNow Foods Creatine Monohydrate Pure Powder (Creapure®) / Optimum Nutrition Micronized Creatine (Creapure®) / Jarrow Formulas Creatine Monohydrate (Creapure®)等、月¥1,500-3,500。\n\n【β-アラニン】3.2-6.4g/日（1.6g以下分割摂取でparesthesia軽減）。\n\nCarnoSyn®/SR CarnoSyn®規格化原料。\n\nNow Foods Beta-Alanine / NutraBio Beta-Alanine CarnoSyn®等、月¥1,500-3,500。\n\n現実的併用スタック＝①クレアチン5g/日（運動後+食事と同時・累積効果型）+②β-アラニン3.2-6.4g/日（分割摂取・累積効果型）+③シトルリンマレート6-8gプレワーク（即時効果型）+④カフェイン200-400mg（プレワーク）+⑤ホエイプロテイン20-40g運動後+⑥水分1.5-2L/日が4-6成分マルチスタック（Trexler 2015 ISSN Position Statement）。' },
    { q: 'どちらが筋力UPに効く？トレーニング目的別の選び方', a: '【最大筋力・パワー・除脂肪体重UP（パワーリフティング・短時間スプリント）】＝クレアチン主軸（Kreider 2017メタ解析・Branch 2003で1RM +8%・除脂肪体重+1.3kg報告）、β-アラニンは効果限定的。\n\n【中強度持久力UP（1-4分高強度・サイクリングTT・ローイング・600m走・水泳）】＝β-アラニン主軸（Hoffman 2008・Saunders 2017メタ・筋カルノシン濃度上昇でH+緩衝能改善）、クレアチンは限定的。\n\n【総合的筋トレ・ボディビル・除脂肪体重維持】＝両者併用（時間軸補完・併用の相乗効果Trexler 2015 ISSN Position Statement）。\n\n【格闘技・MMA・水泳・自転車競技】＝両者併用 + シトルリンマレート + カフェイン。\n\n【🚨重要】＝「クレアチン単独で筋力↑」「β-アラニン単独で持久力↑」を期待する前にトレーニング負荷（漸進性過負荷の原則）・タンパク質1.6-2.2g/kg体重/日・睡眠7-9時間・カロリー収支が王道最強軸でサプリは補助レイヤー。' },
    { q: '併用注意は？妊娠中・授乳中は？', a: '【クレアチン】①水分保持で体重+1-2kg（筋内グリコーゲン+水分・体脂肪増加ではない）。\n\n②胃腸障害（嘔気・腹部膨満・下痢）で水分1.5-2L/日+食事と同時+分割摂取（5g×2回/日）で軽減、③稀に筋けいれん・脱水（高用量+水分不足）。\n\n④🚨腎機能低下例（eGFR<60・透析患者）caution（腎臓内科判断下・健常人は安全プロファイル良好・Lopez 2009メタ）。\n\n⑤糖尿病・GFR低下は念のためモニター、⑥肝機能影響データなしで長期使用安全。\n\n⑦妊娠中・授乳中は標準的安全性データ限定で産科医相談下。\n\n⑧カフェイン併用は古典的に「効果相殺懸念」報告（Vandenberghe 1996）だが近年RCTで否定的（Trexler 2016 ISSNメタ）。\n\n【β-アラニン】①paresthesia（ピリピリ感）で1回1.6g以下分割摂取で軽減。\n\n②妊娠中・授乳中は標準的安全性データ限定で産科医相談下、③タウリン併用注意（理論的取り込み阻害・Dolan 2018）、④腎機能低下例caution、⑤稀に消化器症状。「マッチョになる」「ムキムキになる」「100kg挙げられる」断定は薬機法/景表法NG。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '【クレアチン】急性効果＝ローディング後5-7日で筋内Cr貯蔵量飽和（Hultman 1996 20g/日×5日で筋内Cr+20%）。\n\n中長期効果＝4-12週で筋力+8%・筋量+1.3kg（Branch 2003 96 RCTメタ・Rawson 2003 メタ）、評価指標＝1RM・8-12RM反復回数・除脂肪体重（DXA・BIA）・筋周囲径。\n\n【β-アラニン】4-8週で評価（Saunders 2017 メタ）、評価指標＝1-4分高強度持久力テスト・反復回数・主観的疲労感。\n\n12-16週で効果限定的なら①トレーニング負荷見直し（漸進性過負荷・ボリューム・強度・頻度・休息）／②栄養軸（タンパク質1.6-2.2g/kg・カロリー収支・炭水化物タイミング）／③睡眠7-9時間／④回復（連続トレーニング日数・アクティブリカバリー）／⑤医療領域（変形性関節症・腱鞘炎・椎間板ヘルニア・五十肩は整形外科+理学療法・男性更年期LOHは内分泌内科・サルコペニアは栄養+運動+リハビリ）／⑥生活軸（喫煙・大量飲酒・慢性ストレス）が次の段階。' },
  ],
  'fadogia-agrestis-vs-tongkat-ali': [
    { q: 'ファドジアとトンカットアリの違いは？論文エビデンス階層は？', a: '両者ともAndrew Huberman氏のポッドキャスト等で言及されて市場が拡大した新興男性活力ハーブだが論文蓄積の厚みに明確な差があります。\n\nファドジア・アグレスティス（Fadogia agrestis・600mg/日）は西アフリカ原産の伝統ハーブで動物試験中心（Yakubu 2008 Asian J Androlでラットのテストステロン関連・性行動関連報告・Yakubu 2005 Reprod Biol Endocrinolでマウスの精子質改善報告）。\n\n🚨ヒトRCTのテストステロン上昇・性機能改善エビデンスは現時点で限定的（emerging段階）。\n\nトンカットアリ（Eurycoma longifolia・200-400mg/日・Physta®/LJ100®規格）はマレーシア政府支援研究を含むヒトRCTが複数蓄積（Tambi 2012 Andrologia RCT n=76・Talbott 2013 J Int Soc Sports Nutr RCT n=63）。「ヒトRCTエビデンス→トンカットアリ優位／動物試験のみ・伝統的使用→ファドジア」のエビデンス階層差。' },
    { q: '用量・形態の選び方は？品質規格の重要性は？', a: '【ファドジア】600mg/日が動物試験ベースの市場用量（ヒトRCT用量未確立）。\n\n🚨ヒトでの安全性・有効性データ限定で市場品質規格化未確立。\n\nDouble Wood Fadogia Agrestis 600mg / Nootropics Depot Fadogia Agrestis 600mg / Solaray Fadogia Agrestis等、月¥3,000-7,000。\n\n🚨「Fadogia 600mg」表示のみで純度・抽出溶媒・重金属検査不明品の品質バラつき大。\n\n【トンカットアリ】200-400mg/日。\n\nPhysta®（HP Ingredients社・水抽出物・FDA NDI届出済・重金属管理）/LJ100®（eurycomanone 22%標準化）規格化原料が論文用量再現の前提、月¥3,000-7,000。\n\n選択軸＝ヒトRCTエビデンス・品質規格化→トンカットアリ優位。\n\n動物試験ベース・新興・実験的→ファドジア。\n\n両者併用は経路類似で重複だが市場では Andrew Huberman推奨の「Fadogia + Tongkat Ali」スタックが普及（妥当根拠は限定的）。' },
    { q: 'Andrew Hubermanポッドキャストで話題になったけど実際どうなの？', a: 'Andrew Huberman推奨スタック（Fadogia 600mg/日 + Tongkat Ali 400mg/日）は2021-2022年のポッドキャストで広く知られたが「論文ベースのエビデンス階層」と「ポッドキャスト/インフルエンサー言及」は別軸で評価が必要です。\n\n論文ベース評価＝①トンカットアリはヒトRCT蓄積でテストステロン関連・コルチゾール改善エビデンスあり（Tambi 2012・Talbott 2013）。\n\n②ファドジアは動物試験中心でヒトRCTのテストステロン上昇エビデンスは現時点で限定的（Yakubu 2008・emerging段階）。\n\n③Huberman推奨スタックは「動物試験ベース + 経験的使用」で長期安全性・有効性の確立されたエビデンスではない。\n\n④🚨肝機能影響データ（特にファドジア高用量で動物試験での懸念報告）で長期使用は注意。\n\n実用的位置づけ＝ヒトRCTエビデンスを重視するならトンカットアリのみ・ファドジアは「実験的補助」レイヤー。\n\n🚨重度ED・男性更年期はハーブよりも泌尿器科第一選択（PDE5阻害薬・TRT）。「テストステロンが○%上がる」「精力UP」断定は薬機法/景表法NG。' },
    { q: '併用注意は？肝機能・腎機能リスクは？', a: '【ファドジア】①🚨ヒトでの長期安全性データ限定（動物試験で高用量での肝・腎影響報告・Yakubu 2008）。\n\n②🚨前立腺癌既往・PSA高値・前立腺肥大症caution、③🚨女性は妊娠中・授乳中NG。\n\n④肝機能・腎機能定期monitor推奨。\n\n⑤抗凝固薬・糖尿病薬・抗うつ薬caution（理論的影響）、⑥稀に消化器症状・頭痛。\n\n⑦動物試験で高用量長期で精巣毒性報告（Yakubu 2005 ラット実験）で長期高用量回避。\n\n【トンカットアリ】①🚨前立腺癌既往・PSA高値・前立腺肥大症caution、②🚨女性は妊娠中・授乳中NG。\n\n③SSRI・抗精神病薬・抗凝固薬・糖尿病薬caution、④肝機能影響データ限定で長期高用量回避。\n\n両者併用注意＝①経路類似で重複・併用の相乗効果論文ベースで限定的。\n\n②長期使用での肝機能影響monitorで AST/ALT/γ-GTP/Cr/PSA年1回以上検査。\n\n③ED・男性更年期は🚨泌尿器科第一選択（PDE5阻害薬・テストステロン補充療法TRT・PSA定期検査）でハーブは補助レイヤー。\n\n「テストステロンが上がる」「精力UP」「ED治る」断定は薬機法/景表法NG→「ホルモン関連指標の改善が報告」型統一。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '4-12週で評価（ヒトRCTデータ限定でTongkat Ali Tambi 2012 4週・Talbott 2013 4週を参考）、評価指標＝①総テストステロン・遊離テストステロン・SHBG・LH/FSH 等（血液検査・年1回以上）／②ED症状（IIEF-EFスコア・AMS質問票）／③性機能・性欲・主観的活力／④筋力（1RM・8-12RM）・コルチゾール／⑤AST/ALT/γ-GTP・Cr（肝腎機能・年1回以上）／⑥体組成・血圧・血糖・脂質、12週で効果限定的なら①🚨泌尿器科受診（ED・男性更年期・LOH症候群・PSA高値は泌尿器科第一選択＝PDE5阻害薬・テストステロン補充療法TRT・PSA定期検査）／②内分泌内科（甲状腺・副腎・下垂体機能評価）／③心療内科（心因性ED・うつ・慢性ストレス）／④🚨ファドジア中止検討（ヒトでの長期安全性データ限定・動物試験で精巣毒性報告）／⑤トンカットアリ単独 or アシュワガンダ切替検討（ヒトRCTエビデンス階層 トンカットアリ・アシュワガンダ > ファドジア）／⑥生活軸（運動・タンパク質・睡眠7-9時間・体重管理・節酒・禁煙）が次の段階。' },
  ],
  'alpha-gpc-vs-citicoline': [
    { q: 'アルファGPCとシチコリンの違いは？', a: '両者ともコリン源として脳内アセチルコリン合成を支えるが代謝経路と作用ターゲットが異なる補完関係。\n\nアルファGPC（L-α-グリセロホスホコリン・300-1,200mg/日）はコリンとグリセロリン酸に分解→コリン部分がアセチルコリン合成に直接利用・残るグリセロリン酸が膜リン脂質合成に寄与（De Jesus Moreno Moreno 2003 Clin Therでアルツハイマー型認知症改善・Bellar 2015 J Am Coll Nutrで運動パフォーマンス改善・パワー出力）、認知機能・運動・パワー出力の領域で論文蓄積。\n\nシチコリン（CDPコリン）（500-2,000mg/日）はコリンとシチジンに分解→コリンがアセチルコリン合成・シチジンがウリジンに変換され膜リン脂質合成に寄与（Silveri 2008 Magn Reson Imaging RCTで前頭葉のリン脂質代謝指標改善・Fioravanti 2005 Cochrane reviewで認知機能改善・脳血管障害後リハビリ）。「運動・短期記憶・パワー→アルファGPC／持続的認知機能・脳血管障害後→シチコリン」の使い分け。' },
    { q: '用量・形態の選び方は？', a: '【アルファGPC】300-1,200mg/日が論文用量再現（De Jesus 2003 1,200mg/日・Bellar 2015 600mg/日）。\n\n🚨AlphaSize®（Chemi Nutra社・米国・大豆/ヒマワリレシチン由来 50%標準化）規格化原料が論文用量再現の前提。\n\nNow Foods Alpha GPC 300mg / Jarrow Formulas Alpha GPC / Nootropics Depot Alpha-GPC等、月¥2,500-5,500。【シチコリン】500-2,000mg/日が論文用量再現。\n\n🚨Cognizin®（Kyowa Hakko協和発酵バイオ社）規格化原料が論文用量再現の前提（Silveri 2008・Yurgelun-Todd 2018でCognizin®使用）。\n\nJarrow Formulas Citicoline (Cognizin®) / Nature\'s Way Citicoline (Cognizin®) / Healthy Origins Cognizin Citicoline等、月¥3,000-6,500。\n\n摂取タイミング＝朝食後 or 朝食後+昼食後（午後の集中力低下対策）・脂溶性で食事と同時で吸収率向上。' },
    { q: 'スマートドラッグ・ノートロピックとして併用は？', a: '現実的併用スタック（ノートロピック設計）＝①アルファGPC 300-600mg/日 + ②シチコリン 500-1,000mg/日の二段コリン源スタックが理論的補完設計（アルファGPC=即時アセチルコリン・シチコリン=膜リン脂質合成）。\n\n③L-テアニン 100-200mg + カフェイン100-200mg（即時集中力・α波・主観的覚醒）。\n\n④バコパモニエラ 300-600mg/日 KSM-66相当（学習記憶累積・8-12週）。\n\n⑤イチョウ葉 EGb 761® 120-240mg/日（脳血流改善）。\n\n⑥オメガ3 EPA+DHA 1-2g/日（DHA脳膜流動性）。\n\n⑦ビタミンB群+ビタミンD+マグネシウム（神経機能維持）の総合スタックの組み立て。\n\n「天才になる」「IQが上がる」「集中力10倍」断定は薬機法/景表法NG→「認知機能・記憶・集中力の改善が報告」型統一。' },
    { q: '併用注意は？認知症の人は使える？', a: '【アルファGPC】①🚨抗コリン薬（アトロピン・三環系抗うつ薬・抗ヒスタミン薬・パーキンソン病治療薬の一部）併用は作用相殺。\n\n②🚨重症筋無力症・パーキンソン病はacetylcholinesterase阻害薬との作用重畳caution。\n\n③妊娠中・授乳中は標準的安全性データ限定で産科医相談下。\n\n④稀に消化器症状（嘔気・胃部不快）、⑤心血管影響データ限定（2021年Cell Metabolism論文でアルファGPC高用量と動脈硬化リスク関連報告で議論・追加研究待ち）、⑥血圧低下作用の可能性で降圧薬併用モニタリング。\n\n【シチコリン】①極めて安全プロファイル（Cognizin®はFDA GRAS認証）。\n\n②妊娠中・授乳中の標準的安全性データ限定で産科医相談下、③稀に消化器症状、④血圧軽度低下作用の可能性。\n\n⑤抗コリン薬で作用相殺、L-DOPA併用カイザー薬effects増強で精神神経科相談下。\n\n🚨認知症（アルツハイマー・血管性・レビー小体型）は神経内科第一選択（ドネペジル・リバスチグミン・ガランタミン・メマンチン処方）でアルファGPC/シチコリンは補助レイヤー。「認知症が治る」「物忘れが改善する」断定は薬機法/景表法NG。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '4-12週で評価（De Jesus 2003 アルファGPC 180日・Bellar 2015 6日（運動）・Silveri 2008 シチコリン 28日・Fioravanti 2005 Cochrane）、累積効果型で評価指標＝①認知機能テスト（MMSE/MoCA・反応時間・作業記憶・処理速度）／②運動パフォーマンス（パワー出力・反応時間・主観的疲労感）／③主観的集中力・記憶・気分／④脳血管症状（脳血管障害後リハビリの場合は神経内科評価）、12週で効果限定的なら①用量増量（アルファGPC 300→1,200mg/日・シチコリン 500→2,000mg/日）／②併用追加（バコパモニエラ+イチョウ葉+L-テアニン+カフェイン+オメガ3+ビタミンB群）／③🚨神経内科受診（重度物忘れ・MCI・認知症疑いは神経内科第一選択＝MRI 等・脳脊髄液検査・神経心理検査）／④生活軸（睡眠7-9時間・運動週150分以上・地中海食・社会的接続・趣味活動）／⑤医療治療検討（認知症処方薬・うつ症状ありSSRI）が次の段階。' },
  ],
  'magnesium-l-threonate-vs-magnesium-glycinate': [
    { q: 'マグネシウムL-スレオネートとグリシン酸塩の違いは？', a: '両者とも吸収率と消化器忍容性が優秀なマグネシウム形態だが作用ターゲットが異なる補完関係。\n\nマグネシウムL-スレオネート（Magtein®・1,500-2,000mg/日として元素マグネシウム約144mg含有）はMITで開発された脳血液関門通過特異形態で、脳内マグネシウム濃度上昇によるシナプス可塑性・認知機能改善が動物試験で報告（Slutsky 2010 Neuronでマウスの記憶・シナプス密度改善）。\n\nヒトでも Liu 2016 J Alzheimers Dis RCT n=44で12週で認知機能スコア改善が報告された（新興・現時点で大規模RCT限定）。\n\nマグネシウム グリシン酸塩（200-400mg/日）はGABA系・NMDA受容体調整経由の神経筋弛緩・睡眠の質改善で論文蓄積（Abbasi 2012 J Res Med Sci RCT n=46 高齢者500mg/日×8週でPSQI改善・Boyle 2017 reviewでストレス・不安への有効性）。「認知機能・記憶→スレオネート／睡眠・神経筋弛緩・コルチゾール対策→グリシン酸」の使い分け、両者経路独立で併用OK（朝スレオネート＋夜グリシン酸の二段スタック）。' },
    { q: '用量・形態の選び方は？マグネシウム形態の階層は？', a: '【マグネシウムL-スレオネート】1,500-2,000mg/日（元素マグネシウム約144mg含有）が論文用量再現。\n\n🚨Magtein®（MagCeutics社・MIT特許製法）規格化原料が論文用量再現の前提。\n\nLife Extension Neuro-Mag Magnesium L-Threonate / Now Foods Magnesium L-Threonate / Double Wood Magnesium L-Threonate等、月¥4,000-7,000。\n\n🚨高コスト（他形態の3-5倍）。【マグネシウム グリシン酸塩】200-400mg/日（元素マグネシウム）。\n\nAlbion® Magnesium Glycinate Chelate / TRAACS® Magnesium Glycinate規格化原料。\n\nNow Foods Magnesium Glycinate / Doctor\'s Best High Absorption Magnesium / Pure Encapsulations Magnesium Glycinate等、月¥1,500-3,500。\n\nマグネシウム形態階層＝①🥇 認知→スレオネート（高コスト）／②🥇 睡眠・神経弛緩→グリシン酸（[[feedback-data-ts-no-markdown]]関連）／③🥇 不足補給→クエン酸塩・マレート塩（バランス型）／④🥇 便秘→酸化マグネシウム（医薬品）／⑤🥈 運動回復→マレート塩（クエン酸回路）／⑥🥉 硫酸塩（瀉下剤）・酸化物（吸収率最低）。' },
    { q: 'スレオネートは本当に効く？高コスト価値ある？', a: '論文ベース評価＝①動物試験は強いエビデンス（Slutsky 2010 Neuronマウス記憶・シナプス密度改善・有意・MIT発の機序確立）、②ヒトRCTは限定的（Liu 2016 J Alzheimers Dis RCT n=44で12週で認知機能スコア改善・但し新興・大規模RCT未確立）、③メカニズム的根拠は明確（脳血液関門通過特異形態）だがエビデンス階層は「emerging」、④コストパフォーマンス＝月¥4,000-7,000の高コストに対しヒトRCT階層は中等度で「論文蓄積を待つ立場」が誠実。\n\nの段階＝①基盤＝マグネシウム不足補給（食事ベース+クエン酸塩・グリシン酸塩200-400mg/日）+ ②睡眠特化＝グリシン酸塩 + ③便秘特化＝酸化マグネシウム + ④認知特化＝スレオネート（新興・追加検討）の階段的アプローチが現実解。「認知症が治る」「IQが上がる」「記憶力UP」断定は薬機法/景表法NG。' },
    { q: '併用注意は？腎機能・薬物相互作用は？', a: '【マグネシウム共通（両形態）】①🚨腎機能低下例（CKD ステージ3以上・eGFR<60）caution（マグネシウム蓄積・高マグネシウム血症リスク・腎臓内科判断下）。\n\n②🚨テトラサイクリン系・フルオロキノロン系抗菌薬（シプロフロキサシン・レボフロキサシン）・ビスホスホネート（アレンドロン酸）・甲状腺薬（レボチロキシン）と2-4時間ずらす（キレート相互作用で吸収阻害）。\n\n③ジゴキシン（強心配糖体）・PPI（オメプラゾール・ランソプラゾール）併用注意。\n\n④利尿薬（フロセミド・サイアザイド）でマグネシウム喪失増加。\n\n⑤稀に消化器症状（下痢・腹部膨満）（酸化マグネシウム > 硫酸塩 > クエン酸塩 > グリシン酸塩 > スレオネート で消化器症状少）。\n\n⑥妊娠中・授乳中は標準量で安全（RDA妊娠中350-360mg/日）。\n\n⑦糖尿病・高血圧・心血管疾患患者は内分泌内科/循環器内科判断下。\n\n「不眠が治る」「認知症が治る」断定は薬機法/景表法NG→「睡眠の質・認知機能の改善が報告」型統一。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '【マグネシウムL-スレオネート】4-12週で評価（Liu 2016 12週・Slutsky 2010動物8週）、累積効果型で評価指標＝①認知機能テスト（MMSE/MoCA・作業記憶・処理速度・反応時間）／②主観的記憶・集中力・気分／③睡眠の質（PSQI）／④血清マグネシウム濃度（参考・脳内濃度反映限定）。\n\n【マグネシウム グリシン酸塩】2-8週で評価（Abbasi 2012 8週・Boyle 2017レビュー）、評価指標＝①睡眠の質（PSQI・ESS）／②不安スコア（GAD-7・HAM-A）／③主観的リラックス・神経筋弛緩／④コルチゾール（朝/夕の唾液 or 血液検査）／⑤筋けいれん・足のむずむず、8-12週で効果限定的なら①用量増量（グリシン酸200→400mg/日・スレオネート1,500→2,000mg/日）／②形態併用（朝スレオネート+夜グリシン酸）／③併用追加（L-テアニン100-200mg+メラトニン0.3-3mg+グリシン3g+亜鉛+ビタミンD）／④🚨神経内科/心療内科受診（重度不眠・MCI・うつ症状はSSRI/SNRI・処方薬第一選択）／⑤生活軸（睡眠衛生・運動・カフェイン制限・スクリーンタイム制限）が次の段階。' },
  ],
  '5-htp-vs-saffron': [
    { q: '5-HTPとサフランの違いは？', a: '両者とも気分・軽度抑うつ症状のサポートで論文があるがメカニズムが異なる。\n\n5-HTP（5-ヒドロキシトリプトファン・グリフォニア由来50-200mg/日）はトリプトファン→5-HTP→セロトニン代謝経路の中間体補給で脳内セロトニン濃度上昇に作用（Birdsall 1998 Altern Med Rev reviewで軽度〜中等度抑うつ症状の改善・複数の小規模RCT・Shaw 2002 Cochrane reviewで議論的）。\n\n即効性高いが SSRI併用でセロトニン症候群リスク・MAOI禁忌の併用注意がシビア。\n\nサフラン（クロッカス・サティバスCrocus sativus標準化抽出物28-30mg/日）は活性成分クロシン・サフラナール・ピクロクロシンによる多経路作用（セロトニン再取り込み阻害＋抗酸化＋抗炎症）で気分改善（Lopresti 2014 Hum Psychopharmacolメタ解析でSSRI同等の抑うつ改善・Hausenblas 2013 J Integr Medメタ解析）。\n\nSSRI/SNRI併用注意は5-HTPほどシビアではないが医師相談前提。' },
    { q: '用量・形態の選び方は？品質規格は？', a: '【5-HTP】50-200mg/日が論文用量再現（Birdsall 1998 50-300mg/日・分割摂取）。\n\n🚨グリフォニア・シンプリシフォリア（Griffonia simplicifolia）種子由来5-HTP規格化原料。\n\nNow Foods 5-HTP 100mg / Natrol 5-HTP 100mg / Doctor\'s Best 5-HTP 100mg with Calcium等、月¥1,500-3,500。\n\n🚨高用量200mg/日超は副作用リスク（過去にEMS - 好酸球増多筋痛症候群の症例報告・原料汚染由来・規格化品で品質管理重要）。【サフラン】28-30mg/日が論文用量再現（Lopresti 2014 メタ 等/日×6週）。\n\n🚨affron®（Pharmactive Biotech社・スペイン・サフラン特許抽出物・サフラナール3.5%標準化）規格化原料。\n\nLife Extension Optimized Saffron with Satiereal® / Now Foods Saffron / Doctor\'s Best Saffron Extract等、月¥3,000-6,000。' },
    { q: 'うつ・気分・PMSで本当に効く？医療治療との関係は？', a: '【軽度〜中等度抑うつ症状】＝サフラン主軸（Lopresti 2014 メタ解析でSSRI同等の抑うつ改善・Akhondzadeh 2005 RCT 6週・複数の小規模RCT）。\n\n5-HTPは小規模RCT・エビデンス階層中等度（Birdsall 1998レビュー・Shaw 2002 Cochrane reviewで議論的）。\n\n【月経前症候群PMS・月経前不快気分障害PMDD】＝サフラン主軸（Agha-Hosseini 2008 BJOG RCTで月経周期2サイクルでPMS改善）。\n\nビタミンB6 50-100mg/日+カルシウム+マグネシウム併用。\n\n【睡眠改善・気分軽度】＝5-HTP夜100mg（30-60分前）。\n\n【ADHD・更年期気分症状】＝サフラン補助検討。\n\n🚨重度うつ病・希死念慮・パニック障害・双極性障害・統合失調症は心療内科/精神科第一選択（SSRI・SNRI・三環系抗うつ薬・抗精神病薬・認知行動療法CBT処方）でハーブ・5-HTPは補助レイヤー。「鬱が治る」「気分が劇的に改善」「PMSが完治」断定は薬機法/景表法NG・医療領域。' },
    { q: '併用注意は？SSRI・MAOI・妊娠中は？', a: '【5-HTP】①🚨SSRI/SNRI/三環系抗うつ薬/MAOI併用でセロトニン症候群リスク（生命危険）NG（フルオキセチン・パロキセチン・セルトラリン・エスシタロプラム・ベンラファキシン・デュロキセチン・トラマドール・トリプタン製剤も含む・心療内科判断必須）、②🚨双極性障害禁忌寄り（躁転リスク）、③🚨妊娠中・授乳中NG。\n\n④抗パーキンソン病薬（カルビドパ・レボドパ）併用注意（末梢でセロトニン産生変動）。\n\n⑤稀に消化器症状（嘔気・嘔吐）、⑥手術前1-2週間中止（出血傾向）。\n\n【サフラン】①🚨SSRI/SNRI/MAOI併用は理論的セロトニン作用重畳caution（5-HTPほどシビアではないが心療内科相談前提）、②🚨妊娠中NG（子宮収縮作用報告・流産リスク・伝統的妊娠中避ける）、③🚨双極性障害caution。\n\n④抗凝固薬・抗血小板薬caution（理論的影響）。\n\n⑤稀に消化器症状・頭痛・めまい。\n\n⑥高用量5g/日以上で毒性（伝統的記述）だがサプリ用量28-30mg/日は安全レイヤー。\n\n⑦アレルギー（イネ科花粉症と交差反応稀）。「鬱が治る」断定は薬機法/景表法NG・🚨医療領域。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '' },
  ],
  'ginkgo-biloba-vs-alpha-gpc': [
    { q: 'イチョウ葉とアルファGPCの違いは？', a: '両者とも認知機能領域だがメカニズムが完全に異なる補完関係。\n\nイチョウ葉エキス（EGb 761®規格化・120-240mg/日）はギンコフラボン配糖体・テルペンラクトンによる脳血流改善＋抗酸化＋血小板活性化因子拮抗（Le Bars 1997 JAMA RCTで認知症患者の認知機能改善 等）。\n\n軽度認知障害（MCI）・血管性認知症の補助エビデンスで論文蓄積。\n\nアルファGPC（300-1,200mg/日）はコリン源としてアセチルコリン合成基質を供給し記憶・運動パフォーマンスに作用（De Jesus Moreno Moreno 2003 Clin Therでアルツハイマー型認知症改善・Bellar 2015 J Am Coll Nutrで運動パフォーマンス改善）。「血流・血管性認知症→イチョウ葉／アセチルコリン補給・運動・短期記憶→アルファGPC」の使い分け、両者経路独立で併用可能で「血流＋神経伝達物質基質」の補完スタック。' },
    { q: '用量・形態の選び方は？EGb 761の重要性は？', a: '【イチョウ葉】120-240mg/日が論文用量再現。\n\n🚨EGb 761®（Schwabe Pharmaceuticals社・ドイツ・特許製法・フラボン配糖体24%+テルペンラクトン6%標準化）規格化原料が論文用量再現の前提。\n\nLe Bars 1997・Birks 2009 Cochrane の主要RCTがEGb 761®使用。\n\n「イチョウ葉エキス配合」訴求のみで規格不明品はギンコール酸（接触皮膚炎・アレルゲン）残留リスク。\n\nNature\'s Way Ginkgold (EGb 761®) / Doctor\'s Best Extra Strength Ginkgo / Now Foods Ginkgo Biloba等、月¥2,000-4,500。【アルファGPC】300-1,200mg/日。\n\nAlphaSize®規格化原料。\n\nNow Foods Alpha GPC 300mg等、月¥2,500-5,500。\n\n併用スタック＝朝食後イチョウ葉 EGb 761 120-240mg + 朝食後or昼食後アルファGPC 300-600mg + L-テアニン100-200mg + カフェイン100-200mg + オメガ3 EPA+DHA 1-2g/日の段階構成。' },
    { q: '認知症・MCI・物忘れでどれが効く？', a: '【軽度認知障害MCI（Mild Cognitive Impairment）・健常加齢者の認知機能サポート】＝イチョウ葉 EGb 761® 240mg/日主軸 + アルファGPC 300-600mg/日 + バコパモニエラ 300mg/日 + オメガ3 + ビタミンB群 + 地中海食の総合スタック。\n\n【血管性認知症】＝イチョウ葉主軸（脳血流改善経路）+ 心血管リスク管理（血圧・血糖・脂質）。\n\n【アルツハイマー型認知症・診断確定例】＝🚨神経内科第一選択（ドネペジル・リバスチグミン・ガランタミン・メマンチン処方・新薬レカネマブ Aducanumab・抗アミロイドβ抗体療法）でハーブ・アルファGPCは補助レイヤー。\n\n【単純物忘れ・年齢相応】＝地中海食・運動・社会的接続・睡眠・趣味活動が現実的最強軸でサプリは補助。\n\n🚨急速進行する物忘れ・人格変化・見当識障害・遂行機能障害は神経内科第一選択（MRI 等・脳脊髄液検査・神経心理検査・血液検査）で認知症診断・早期介入が予後改善の鍵。' },
    { q: '併用注意は？抗凝固薬・手術前は？', a: '【イチョウ葉】①🚨抗凝固薬（ワルファリン・DOAC ダビガトラン・リバーロキサバン・アピキサバン・エドキサバン）併用注意（出血リスク報告・Bone 2008レビュー・血小板活性化因子拮抗作用）。\n\n②🚨抗血小板薬（アスピリン・クロピドグレル・チカグレロル）併用注意（出血リスク重畳）、③🚨手術1-2週間前中止必須（出血リスク・術中・術後出血報告）、④SSRI・MAOI併用注意（理論的セロトニン作用・出血リスク重畳）。\n\n⑤てんかん発作閾値低下の症例報告でてんかん既往caution。\n\n⑥糖尿病薬で血糖低下増強の可能性monitor、⑦妊娠中・授乳中NG（子宮収縮・出血リスク）。\n\n⑧🚨ギンコール酸残留品で接触皮膚炎・アレルギー反応（EGb 761®等の規格化品推奨）。\n\n【アルファGPC】①抗コリン薬で作用相殺。\n\n②重症筋無力症・パーキンソン病caution、③妊娠中・授乳中データ限定、④稀に消化器症状、⑤心血管影響データ限定（2021年Cell Metabolism論文で議論・追加研究待ち）、⑥血圧低下作用の可能性。「認知症が治る」「物忘れが完治」断定は薬機法/景表法NG・🚨医療領域。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '8-24週で評価（イチョウ葉 Le Bars 1997 52週・Birks 2009 Cochrane中央値12-26週・アルファGPC De Jesus 2003 180日）、累積効果型で評価指標＝①認知機能テスト（MMSE/MoCA・反応時間・作業記憶・処理速度・言語流暢性）／②主観的記憶・集中力・気分／③日常生活動作（ADL/IADL）／④脳血管症状（脳血管障害後リハビリの場合は神経内科評価）／⑤心血管リスク（血圧・血糖・脂質）、24週で効果限定的なら①用量増量（イチョウ葉120→240mg/日・アルファGPC 300→1,200mg/日）／②併用追加（バコパモニエラ+L-テアニン+カフェイン+オメガ3+ビタミンB群+ビタミンD）／③🚨神経内科受診（重度物忘れ・MCI・認知症疑い・うつ症状ありは神経内科+心療内科第一選択＝MRI 等・脳脊髄液検査・神経心理検査・処方薬）／④心血管リスク管理（血圧・血糖・脂質・抗血小板薬・SGLT2阻害薬・GLP-1）／⑤生活軸（睡眠7-9時間・運動週150分以上・地中海食・社会的接続・趣味活動・禁煙・節酒）が次の段階。' },
  ],
  'folic-acid-vs-methyl-folate': [
    { q: '葉酸と活性型メチル葉酸の違いは？', a: '両者ともDNA合成・神経管閉鎖障害（NTD）予防・メチル化サイクル補酵素として機能するが代謝経路と推奨される対象層が異なる。\n\n葉酸（モノグルタミン酸型・合成プテロイルモノグルタミン酸）（400-800μg/日）は厚労省2000年通知の唯一の公的言及対象でMRC 1991 Lancet RCT n=1,817のNTD再発リスク72%減・Czeizel 1992 NEJM RCT n=4,753の初発リスク低減のエビデンス基盤。\n\nただし体内でMTHFR酵素により5-MTHFに変換が必要。\n\n活性型メチル葉酸（5-MTHF・L-メチルフォレート）（Quatrefolic®/Metafolin®規格・400-800μg/日）はMTHFR C677T遺伝子多型（日本人10-15%・ホモ接合体5-7%）保持者でMTHFR酵素活性が低下し合成葉酸→5-MTHF変換効率が下がるため、5-MTHF直接補給が論文上で合理的（Pietrzik 2010 Clin Pharmacokinetで5-MTHFの方が血中濃度上昇が早い・Servy 2014で不育症の5-MTHF優位報告）。「妊活/妊娠中の標準→モノグルタミン酸型／MTHFR遺伝子検査陽性・不育症既往・ホモシステイン高値→5-MTHF」の使い分け。' },
    { q: '用量・形態の選び方は？MTHFR遺伝子検査どうする？', a: '【モノグルタミン酸型 葉酸】400-800μg/日が論文用量再現（MRC 1991・Czeizel 1992・厚労省妊婦推奨400μg/日）。\n\nNow Foods Folic Acid 400μg / Nature Made Folic Acid / DHC 葉酸等、月¥200-500（最安）。\n\nNTD既往妊娠歴ありは4mg/日（処方葉酸 フォリアミン®）医師処方。\n\n【活性型メチル葉酸 5-MTHF】400-800μg/日。\n\n🚨Quatrefolic®（Gnosis Bio Inc・USA・グルコサミン塩）/Metafolin®（Merck KGaA・ドイツ・カルシウム塩）規格化原料が論文用量再現の前提。' },
    { q: '妊活・妊娠中はどっち優先？値段差は意味ある？', a: '【標準的妊活・妊娠（NTD既往なし・MTHFR検査未実施）】＝モノグルタミン酸型葉酸400-800μg/日主軸（厚労省2000年通知の唯一の公的言及対象・MRC 1991/Czeizel 1992の最強RCT基盤・コスパ¥200-500/月）、妊娠1ヶ月前-12週は必須。\n\nピジョン葉酸/ベルタ葉酸/エレビット/DHC葉酸等の妊活総合サプリでも400μg含有が標準。\n\n【NTD既往妊娠歴・MTHFR遺伝子検査陽性・不育症既往・反復流産・ホモシステイン高値・40歳以上妊活・抗てんかん薬服用】＝活性型メチル葉酸 5-MTHF 400-800μg/日主軸（Servy 2014・Pietrzik 2010で5-MTHF優位報告）。\n\n月¥1,000-2,500の高コストに見合う妥当選択。\n\n🚨遺伝外来・不育症外来の医師相談下。\n\n🚨葉酸1mg/日超の長期摂取はビタミンB12欠乏マスキング・神経症状進行リスクでB12 500-1,000μg/日併用・血液検査年1回（CBC・MCV・血清B12・葉酸）の進め方。' },
    { q: '併用注意は？抗てんかん薬・がん治療中は？', a: '【両形態共通】①🚨抗てんかん薬（フェニトイン・カルバマゼピン・バルプロ酸・フェノバルビタール）併用で血中濃度低下・葉酸欠乏リスク（医師管理下で1-5mg/日処方葉酸補充検討）。\n\n②🚨メトトレキサート（リウマチ・乾癬・癌治療）併用で5mg/日以上は理論的に抗腫瘍効果減弱・低用量1mg/日週1回は副作用軽減目的で皮膚科/リウマチ科/腫瘍内科判断下。\n\n③🚨葉酸1mg/日超長期摂取はB12欠乏マスキング（ベジタリアン/ヴィーガン/PPI長期/胃切除既往は特にB12不足リスク高）。\n\n④メトホルミン長期でB12吸収阻害。\n\n⑤一部研究で前立腺癌進行リスク上昇報告（Figueiredo 2009 J Natl Cancer Inst・1mg/日超の長期高用量・50歳以上男性caution）。\n\n⑥スルファサラジン（リウマチ・IBD）・トリメトプリム（抗菌薬）・ピリメタミン（抗マラリア薬）併用で吸収阻害・葉酸欠乏monitor、⑦稀に消化器症状・アレルギー。\n\n⑧妊娠中・授乳中は標準量400-800μg/日安全。「妊娠成立する」「不妊が治る」「不育症が治る」断定は薬機法/景表法NG・🚨医療領域。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '【NTD予防】＝妊娠1ヶ月前-12週の継続摂取が必須（MRC 1991でNTD再発リスク72%減）、評価指標＝血清葉酸・赤血球葉酸（年1回採血推奨）・ホモシステイン。\n\n【認知機能・抗加齢】＝24週で評価（Smith 2010 PLOS One VITACOG RCT n=271 葉酸0.8mg+B6 20mg+B12 0.5mg/日×24週で軽度認知障害の脳萎縮率50%以上減少・Ageing Research Reviews 2016 メタ n=2,398）、評価指標＝認知機能テスト（MMSE/MoCA）・ホモシステイン・血清葉酸・血清B12。\n\n【不育症】＝24週以上の継続評価。\n\n🚨不育症は不育症外来・婦人科第一選択（抗リン脂質抗体症候群・染色体異常・甲状腺機能異常・子宮形態異常・凝固因子異常・MTHFR遺伝子多型の総合評価）。\n\n効果限定的なら①MTHFR遺伝子検査（5-MTHF切替判断）／②B12併用追加（500-1,000μg/日 メチルコバラミン）／③ホモシステイン採血（>15μmol/Lは多剤介入）／④🚨婦人科/遺伝外来/不育症外来受診／⑤生活軸（飲酒NG・禁煙・葉酸食 緑黄色野菜・豆類・柑橘類）が次の段階。' },
  ],
  'iron-vs-vitamin-c-oral': [
    { q: '鉄とビタミンCの併用スタックの論文ベースは？', a: '「比較」より「併用スタック」が無難な典型ペア。\n\n鉄（経口18-60mg/日・グリシン酸キレートFerrochel®/ヘム鉄/フマル酸鉄/硫酸鉄等）は赤血球ヘモグロビン合成・酸素輸送・疲労改善で必須ミネラル。\n\n非ヘム鉄（植物性食品・サプリ硫酸鉄/フマル酸鉄/グリシン酸鉄等）は腸管で3価Fe3+から2価Fe2+への還元が吸収律速段階。\n\nビタミンC（500-1,000mg/日）はこの還元を促進し非ヘム鉄吸収率を2-3倍に高める論文蓄積（Hallberg 1989 Am J Clin Nutrで非ヘム鉄吸収率がVC 100mg併用で2-3倍・Cook 2001 Am J Clin Nutrレビューで経典スタック確立）。「鉄欠乏性貧血の女性慢性疲労→鉄+VC同時摂取が論文上」「ヘム鉄（動物性）はVC併用効果が小さい」「鉄サプリ+お茶/コーヒー（タンニン）/カルシウム/PPI/胃切除既往で吸収率低下」の実用的吸収戦略。' },
    { q: '用量・形態の選び方は？鉄形態の階層は？', a: '【鉄経口】18-60mg/日が論文用量域（米国RDA女性18mg/日・男性8mg/日・妊娠中27mg/日・鉄欠乏改善は60-200mg/日処方）、形態別優先順位＝①グリシン酸キレート Ferrochel®（Albion社・吸収率優位+胃腸障害少）= Solgar Gentle Iron 25mg / Thorne Iron Bisglycinate 25mg。\n\n②ヘム鉄 = 動物性食品由来・吸収率高・胃腸障害少（Now Foods Heme Iron / 小林製薬ヘム鉄）。\n\n③フマル酸鉄/グリシン酸鉄 = 中間。\n\n④硫酸鉄 = コスパ良だが胃腸障害多（処方フェロミア®/フェロ・グラデュメット®）。\n\n⑤酸化鉄 = 吸収率最低・推奨しない。\n\n🚨遺伝性ヘモクロマトーシス（HFE遺伝子変異 C282Y/H63D・人口0.5%）絶対禁忌・サプリ前のCBC+フェリチン+TIBC+TSAT血液検査必須、月¥500-2,000。\n\n【VC経口】500-1,000mg/日。\n\nNow Foods Vitamin C-1000 / Solgar Vitamin C / DHC ビタミンC等、月¥300-1,500。\n\n摂取タイミング＝鉄+VC同時摂取（空腹時で吸収増・胃腸障害あれば食事と同時）+ お茶/コーヒー/牛乳/サプリカルシウムは2-3時間ずらす。' },
    { q: '鉄欠乏性貧血の改善ステップは？月経過多どうする？', a: '【鉄欠乏性貧血（IDA）診断ステップ】＝🚨内科/婦人科/血液内科受診＝①CBC（Hb 等）+②フェリチン（鉄貯蔵量）+③TIBC・血清鉄・トランスフェリン飽和度TSAT+④網状赤血球数+⑤潜血便（消化管出血鑑別）。\n\nフェリチン<30で鉄欠乏・Hb<12女性で貧血診断。\n\n【女性慢性疲労・月経過多由来の鉄欠乏】＝鉄60-200mg/日処方フェロミア®+VC500-1,000mg/日+食事軸（赤身肉・レバー・あさり・大豆・ほうれん草+VC食材柑橘・ピーマン・キウイ）、🚨月経過多の原因鑑別＝子宮筋腫・子宮内膜症・子宮内膜増殖症・子宮体がん・凝固因子異常（フォン・ヴィレブランド病等）を婦人科受診で精査。\n\n処方トラネキサム酸250mg×4回/日（月経時5日間）・処方経口避妊薬・ミレーナ®子宮内黄体ホルモンシステム・子宮筋腫核出術・子宮全摘術等の医療治療検討。\n\n【消化管出血由来の鉄欠乏（特に40歳以上男性・閉経後女性）】＝🚨消化器内科第一選択＝上部消化管内視鏡+大腸内視鏡で潰瘍・ピロリ菌・大腸癌・憩室出血・痔・血管異形成鑑別でサプリは補助。' },
    { q: '併用注意は？妊娠中・男性は？', a: '【鉄経口】①🚨遺伝性ヘモクロマトーシス（HFE遺伝子変異 C282Y/H63D・人口0.5%）絶対禁忌（鉄過剰症で肝硬変・心不全・糖尿病・関節炎・性機能低下）。\n\n②🚨サラセミア保因者caution。\n\n③🚨サプリ前のCBC+フェリチン+TIBC+血清鉄+TSAT血液検査必須。\n\n④🚨男性/閉経後女性は鉄欠乏よりむしろ鉄過剰リスクでサプリ前検査がより重要。\n\n⑤🚨フェリチン>100の非欠乏型は補給回避。\n\n⑥テトラサイクリン/フルオロキノロン/ビスホスホネート/レボチロキシン甲状腺薬と2-4時間ずらす。\n\n⑦PPI長期（オメプラゾール・ランソプラゾール）・胃切除既往でB12欠乏マスキング+非ヘム鉄吸収低下。\n\n⑧お茶/コーヒー/タンニン/カルシウム/牛乳で吸収阻害。\n\n⑨稀に消化器症状（嘔気・便秘・黒色便）で食事と同時摂取+グリシン酸キレート切替で軽減。\n\n⑩妊娠中27mg/日・授乳中9mg/日範囲内で安全（ACOG・厚労省妊娠中推奨）。\n\n【VC経口】①🚨腎結石既往・シュウ酸尿症で2g/日超caution（Massey 2005 J Nutr）。\n\n②G6PD欠損症で高用量caution（溶血リスク）、③稀に下痢・胃痛（4g/日超）。\n\n④抗凝固薬ワルファリンINR変動monitor、⑤血糖測定干渉。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '鉄欠乏改善は8-26週（Hb上昇は2-4週・フェリチン正常化は8-26週・Bothwell 2000 reviewで段階的回復）、評価指標＝①CBC（Hb 等・網状赤血球数）／②フェリチン（鉄貯蔵量・最重要指標）／③TIBC・血清鉄・トランスフェリン飽和度TSAT／④主観的疲労感・息切れ・動悸・めまい・冷え／⑤運動パフォーマンス、8-12週で改善限定的なら①🚨内科/婦人科/血液内科受診（消化管出血・月経過多・吸収不良症候群・慢性炎症性疾患・腎性貧血・骨髄抑制鑑別必須）／②鉄注射（フェジン®・フェインジェクト®・モノヴァー®処方）／③用量増量（経口60→200mg/日処方）／④形態切替（硫酸鉄→グリシン酸キレート→ヘム鉄）／⑤VC高用量併用（500→1,000mg/日）／⑥食事軸（赤身肉・レバー・あさり・大豆・ほうれん草+VC食材）／⑦経口避妊薬・ミレーナ®・トラネキサム酸の月経過多治療検討／⑧消化管出血精査（上部+下部内視鏡）が次の段階。' },
  ],
  'methyl-folate-vs-vitamin-b12': [
    { q: 'メチル葉酸とビタミンB12の関係は？比較より補完？', a: '「比較」より「補完関係」が王道なペア。\n\nメチル化サイクル（ホモシステイン→メチオニン変換）で5-MTHFがメチル基をホモシステインに供与・B12がメチオニン合成酵素の補酵素として必須、片方だけでは代謝が回らない構造（Bottiglieri 2005 J Nutrでメチル化サイクル機序確立・Smith 2010 PLOS One VITACOG RCT n=271で葉酸0.8mg+B6 20mg+B12 0.5mg/日×24週で軽度認知障害の脳萎縮率50%以上減少）。\n\nAgeing Research Reviews 2016メタ解析 n=2,398でも葉酸補充で認知機能スコア・ホモシステイン値有意改善（特に高齢者）。\n\n🚨葉酸1mg/日超の長期摂取はB12欠乏の血液所見（巨赤芽球性貧血）を隠す可能性・神経症状進行リスクでベジタリアン/ヴィーガン/PPI長期/胃切除既往はB12不足リスク高。「MTHFR多型陽性→5-MTHF優先／菜食主義者・PPI/胃切除→B12優先／メチル化サイクル最適化→併用」の使い分け。' },
    { q: '用量・形態の選び方は？メチルコバラミン優位？', a: '【メチル葉酸 5-MTHF】400-800μg/日。\n\n🚨Quatrefolic®/Metafolin®規格化原料。\n\nThorne 5-MTHF / Solgar Folate as Metafolin® / Pure Encapsulations Folate等、月¥1,000-2,500。\n\n【ビタミンB12】500-1,000μg/日（経口高用量推奨）が論文用量再現（Smith 2010 VITACOG・経口高用量で消化管Cubam受容体非依存的吸収+IF非依存的受動拡散吸収）、形態別優先順位＝①メチルコバラミン Methylcobalamin（活性型・脳神経特化）。\n\n②アデノシルコバラミン Adenosylcobalamin（活性型・ミトコンドリア特化）。\n\n③シアノコバラミン Cyanocobalamin（合成型・安価・代謝で活性型変換必要）。\n\n④ヒドロキソコバラミン Hydroxocobalamin（注射処方薬・悪性貧血治療）。\n\n🚨ベジタリアン/ヴィーガン/胃切除/PPI長期/メトホルミン長期/65歳以上はメチルコバラミン推奨。\n\nNow Foods Methyl B-12 1,000μg / Jarrow Formulas Methyl B-12 / Solgar Methylcobalamin等、月¥800-2,500。\n\n摂取タイミング＝朝食後分割（5-MTHF + メチルB12を同時に1日1-2回・食事と同時で吸収率向上）。' },
    { q: 'ホモシステインが高い・認知機能下がってきた・どう対処？', a: '【ホモシステイン高値（>15μmol/L）】＝5-MTHF 400-800μg/日 + メチルB12 500-1,000μg/日 + ビタミンB6 P-5-P 20-50mg/日 + TMG/ベタイン 500-3,000mg/日 + コリン+ベタイン食事軸（卵黄・大豆・ビート・キヌア）の総合スタック。\n\n🚨>30μmol/Lは内科・神経内科で精査（MTHFR遺伝子検査・B12/葉酸吸収精査・腎機能・甲状腺機能・喫煙・大量飲酒）。\n\n【軽度認知障害MCI・健常加齢者の認知機能低下】＝Smith 2010 VITACOG処方準拠（葉酸0.8mg+B6 20mg+B12 0.5mg/日×24週）+ オメガ3 EPA+DHA 1-2g/日 + ビタミンD 1,000-2,000IU/日 + 地中海食 + 運動週150分以上 + 社会的接続の総合介入。\n\n【アルツハイマー型認知症・血管性認知症】＝🚨神経内科第一選択（ドネペジル・リバスチグミン・ガランタミン・メマンチン・新薬レカネマブ）でB12+葉酸は補助レイヤー。\n\n【B12欠乏症状（しびれ・歩行障害・記憶障害・舌炎・気分変動）】＝🚨血液内科/神経内科第一選択（血清B12<150pg/mLで欠乏・MMA・ホモシステイン精査・悪性貧血鑑別・B12注射処方ヒドロキソコバラミン）。' },
    { q: '併用注意は？妊娠中・癌治療中は？', a: '【両者共通】①🚨抗てんかん薬（フェニトイン・カルバマゼピン・バルプロ酸・フェノバルビタール）併用で葉酸/B12欠乏リスク（医師管理下で処方薬補充検討）。\n\n②🚨メトトレキサート（リウマチ・乾癬・癌治療）併用は皮膚科/リウマチ科/腫瘍内科判断下（抗腫瘍効果減弱vs副作用軽減のバランス）。\n\n③🚨葉酸1mg/日超長期摂取はB12欠乏マスキング（B12 500-1,000μg/日併用必須）。\n\n④メトホルミン長期でB12吸収阻害+欠乏リスク（Wile 2010メタ・年1回B12測定推奨）。\n\n⑤PPI長期（オメプラゾール・ランソプラゾール・10年以上）・H2ブロッカー・胃切除既往でB12吸収阻害。\n\n⑥スルファサラジン（IBD・リウマチ）・トリメトプリム・ピリメタミンで葉酸吸収阻害。\n\n⑦一部研究で1mg/日超葉酸の前立腺癌進行リスク上昇報告（Figueiredo 2009・50歳以上男性caution）。\n\n⑧妊娠中・授乳中は標準量400-800μg/日葉酸+500μg/日B12安全。\n\n⑨MTHFR多型陽性者は5-MTHF推奨。「認知症が治る」「神経が回復する」断定は薬機法/景表法NG・🚨医療領域。' },
    { q: '効果が出るまでと評価のタイミングは？', a: '4-24週で評価（Smith 2010 VITACOG 24週 等）、累積効果型で評価指標＝①ホモシステイン（4-12週で低下評価・<15μmol/L目標・<10理想）／②血清B12（>400pg/mL目標）+MMA（メチルマロン酸・B12欠乏でより感度高）／③血清葉酸・赤血球葉酸／④認知機能テスト（MMSE/MoCA・反応時間・作業記憶）／⑤主観的記憶・集中力・気分／⑥神経症状（しびれ・歩行障害・舌炎・気分変動）／⑦CBC・MCV（巨赤芽球性貧血鑑別）、12-24週で効果限定的なら①MTHFR遺伝子検査（5-MTHF切替判断・A1298C多型も併行）／②用量増量（B12 500→2,000μg/日・葉酸0.8→1mg/日・但しB12併用必須）／③形態切替（シアノコバラミン→メチルコバラミン→注射処方ヒドロキソコバラミン）／④🚨血液内科/神経内科/消化器内科受診（B12欠乏症・悪性貧血・吸収不良症候群・MCI・認知症・末梢神経障害は医療領域）／⑤生活軸（禁煙・節酒・運動・睡眠・地中海食・社会的接続）／⑥併用追加（ビタミンB6 P-5-P+TMG/ベタイン+コリン+ビタミンD+オメガ3）が次の段階。' },
  ],
  // ── Sprint 3 Session F Day 16-20 バッチ 2026-05-16（mid-funnel KW 第2波・新ルール準拠執筆） ───────────────
  'tranexamic-acid-vs-glutathione': [
    { q: 'トラネキサム酸とグルタチオンの違いは？', a: '作用機序が完全に独立した補完関係です。\n\nトラネキサム酸はプラスミン経路を起点側でブロックする単経路抗メラニン産生成分（JAAD 2020 メタ解析 n=561で経口250mg/日のmMASI有意改善）。\n\nグルタチオンは細胞内最大の抗酸化物質でメラニン産生段階に作用するが経口吸収率に議論あり（Arjinpathana 2012 RCT 500mg/日×4ヶ月でメラニン指数改善・Sonthalia 2018で吸収率問題指摘）。\n\n肝斑特化→TXA優位／全身性くすみ→GSH補助の使い分け、両者併用OK。' },
    { q: '用量・形態の選び方は？', a: 'トラネキサム酸は外用2-5%が論文用量、経口250-500mg/日（処方扱い・美白用途は適応外処方）。\n\nグルタチオンは経口250-500mg/日・Setria®規格化原料が王道。\n\nリポソーム経口・舌下スプレーで吸収率向上（Sinha 2018）、点滴は美容皮膚科処方で1回¥4,000-12,000。\n\n月コスト：TXA外用¥2,000-10,000・経口グルタチオン¥3,000-8,000。' },
    { q: '経口グルタチオンで本当にシミ消える？', a: '「飲む美白で確実にシミが消える」は両者とも論文ベースで断定NGが誠実な立場。\n\n経口GSHは消化管でジペプチドに分解されやすく吸収率問題が論文指摘（Witschi 1992・Sonthalia 2018）。\n\n王道の優先順位は外用ナイアシンアミド/TXA/アゼライン酸/ハイドロキノン処方が主役→経口は補助レイヤー。\n\n紫外線対策（SPF50+ PA++++日次塗布）が一生の予防最強軸。' },
    { q: '併用注意は？妊娠中・血栓既往は？', a: '🚨経口TXAは血栓既往（DVT/PE/脳梗塞/心筋梗塞既往）絶対NG、🚨経口避妊薬・HRT・喫煙者・40歳以上・妊娠中・産褥期も禁忌寄り。\n\n外用TXAは妊娠中も比較的安全。\n\nグルタチオンは抗凝固薬・抗血小板薬で手術前1-2週間中止検討、化学療法中はcaution（腫瘍内科判断下）、喘息既往は気道過敏性懸念。\n\n「シミが消える」「肝斑が完治」断定は薬機法/景表法NG・🚨医療領域。' },
    { q: '効果が出るまでと評価は？', a: '4-12週で評価（TXA外用Bala 2018 メタ・GSH Arjinpathana 2012 4ヶ月）、累積効果型。\n\n評価指標は皮膚色明度（メラニン指数・Mexameter）・色素沈着面積（VISIA）・MASIスコア（肝斑特化）・主観的明るさ。\n\n12週で効果限定的なら皮膚科の領域（ハイドロキノン処方・QスイッチYAGレーザー・ピコレーザー・IPL）、紫外線対策再評価が次の段階。' },
  ],
  'niacinamide-vs-ceramide': [
    { q: 'ナイアシンアミドとセラミドの違いは？', a: '作用ターゲットが異なる補完関係です。\n\nナイアシンアミド5%はメラノソーム転移阻害+バリア機能強化+抗炎症+皮脂調整の4方面に作用（Bissett 2005 RCT 5%×8週で色素沈着改善・Draelos 2005で毛穴・小じわ改善）。\n\nセラミド外用0.5-2%は細胞間脂質構成成分で皮膚バリア構築・TEWL抑制が中心（Spada 2018で角層水分量・TEWL改善）。\n\n色素沈着・毛穴→ナイアシンアミド／敏感肌・乾燥バリア低下→セラミドの使い分けで両者併用OK。' },
    { q: '用量・形態の選び方は？セラミド形態は？', a: 'ナイアシンアミドは5-10%が論文用量域（Bissett 2005）、月¥1,000-10,000。\n\nセラミド形態の優先順位は①セラミドNP（旧3）= 構造保湿の中心、②セラミドAP（旧6-II）= 酵素活性関連、③セラミドEOP（旧1）= ω-OH ceramide・最外層、④擬似セラミド（合成型）= コスパ良。\n\nコレステロール+遊離脂肪酸の三脂質バランス処方が王道（Man 1996 Arch Dermatol）。' },
    { q: 'アトピー素因・敏感肌での選び方は？', a: 'アトピー素因・乾燥型敏感肌ではセラミド主軸。\n\n細胞間脂質減少（特にセラミドNP/EOP）がアトピー皮膚で確認されており、外用セラミド+保湿+ステロイド/タクロリムスの併用が王道（Chamlin 2002 J Am Acad Dermatol RCT）。\n\nナイアシンアミドは紅潮（フラッシング）が稀で敏感肌でも使用可、両者の併用で「バリア+多機能ケア」のスタックが現実的。' },
    { q: '併用注意は？妊娠中・授乳中は？', a: '両者とも極めて安全プロファイル。\n\nナイアシンアミドは酒さ素因で稀にフラッシング、高濃度20%超で稀に赤み・乾燥。妊娠中・授乳中ほぼ安全レイヤー、経口高用量3g/日超は肝機能影響caution（外用5%は問題なし）。\n\nセラミド外用は全肌タイプ対応、妊娠中安全。\n\nVC（純粋型L-アスコルビン酸）との同時併用は古典議論あるが現代の安定化処方では問題なし。' },
    { q: '効果が出るまでと評価は？', a: '2-12週で評価（Bissett 2005 ナイアシンアミド8週・Spada 2018 セラミド8週）、累積効果型。\n\n評価指標は皮膚水分量（Corneometer）・TEWL（Tewameter）・色素沈着面積（VISIA）・毛穴・小じわ（VISIA）・主観的バリア感覚。\n\n12週で効果限定的なら用量増量（ナイアシンアミド5→10%）・併用強化（VC+レチノール夜+パンテノール+ヒアルロン酸）・🚨アトピー/酒さは皮膚科の領域。' },
  ],
  'centella-asiatica-vs-bisabolol': [
    { q: 'センテラアジアチカとビサボロールの違いは？', a: '両者ともCICA・敏感肌領域の代表成分で機序が異なる補完関係。\n\nセンテラはマデカッソシド/アジアチコシド/アジアチン酸/マデカシン酸の4成分群で線維芽細胞活性化・コラーゲン合成促進・抗炎症（Bylka 2013 Adv Wound Care review）。\n\nビサボロールはマトリカリア・カモミール由来モノテルペンで抗炎症・抗刺激・浸透促進（Kamatou 2010 J Ethnopharmacol reviewで紅斑抑制）。' },
    { q: '用量・形態の選び方は？', a: 'センテラ0.1-2%、マデカッソシド単離0.1%が高エビデンス（Bonté 1994 Planta Med）。\n\nビサボロール0.2-0.5%、α-ビサボロール（D-(-)-α-bisabolol・天然型）が論文ベース（合成DL型より純度高）。\n\n両者ともCICA配合製品で同時配合されることが多く、ナイアシンアミド5%+パンテノール+セラミドとの併用が王道スタック。' },
    { q: '酒さ・敏感肌・刺激後ケアでの使い方は？', a: '急性赤み・刺激後の鎮静→ビサボロール主軸（即効性高）、慢性的なバリア低下・敏感肌の日常ケア→センテラ主軸（累積効果型）。\n\nレチノール/AHA/BHA刺激後の鎮静ステップでセンテラ+ビサボロール+パンテノールの三段スタック。\n\n酒さ素因は皮膚科の領域（イベルメクチン外用処方・ブリモニジン・処方アゼライン酸15-20%）でCICA成分は補助。' },
    { q: '併用注意は？妊娠中・授乳中は？', a: '両者とも安全プロファイル良好。\n\nセンテラは稀に接触皮膚炎・パッチテスト推奨、経口センテラ（伝統的アーユルヴェーダ）は肝毒性症例報告で経口は避ける。\n\nビサボロールはカモミール花粉症と理論的に交差反応の可能性、パッチテスト推奨。\n\n両者外用は妊娠中・授乳中ほぼ安全レイヤー、ベパンテン®相当のCICA配合品は乳児/新生児にも使用可。' },
    { q: '効果が出るまでと評価は？', a: '2-8週で評価（センテラ Ratz-Łyko 2016 8週・ビサボロール Kamatou 2010 review）、早期効果型。\n\n評価指標は主観的赤み・刺激・かゆみ、TEWL、皮膚水分量、紫外線後の赤み回復速度、敏感肌反応閾値。\n\n8週で効果限定的なら用量増量・併用強化（セラミド+スクワラン+ヒアルロン酸+ナイアシンアミド5%）・🚨酒さ/アトピー/乾癬は皮膚科の領域。' },
  ],
  'panthenol-vs-bisabolol': [
    { q: 'パンテノールとビサボロールの違いは？', a: '機序が異なる補完関係です。\n\nパンテノール（D-パンテノール・ビタミンB5前駆体）は皮膚内でパントテン酸に変換され角質層の水分保持・上皮再生・修復シグナルに作用（Ebner 2002 Am J Clin Dermatolで5%が皮膚バリア機能改善・Yang 2018で創傷治癒促進）。\n\nビサボロールはカモミール由来モノテルペンで抗炎症・抗刺激・浸透促進（Kamatou 2010で紅斑抑制）。\n\n水分保持・修復→パンテノール／赤み軽減・浸透促進→ビサボロールの使い分け。' },
    { q: '用量・形態の選び方は？', a: 'パンテノール1-5%が論文用量域（Ebner 2002）、ベパンテン®（医薬品）が代表例。\n\nビサボロール0.2-0.5%、α-ビサボロール（天然型）が論文ベース。\n\n両者は同時配合品も多く（La Roche-Posay Cicaplast等のCICA系製品）、洗顔→化粧水→セラム（センテラ+ビサボロール+ナイアシンアミド5%）→保湿（パンテノール+セラミド+ヒアルロン酸）の順序が王道。' },
    { q: 'CICA製品は本当に効果ある？', a: 'パンテノールは医薬部外品レベルの安全性・有効性で、創傷治癒・乾燥肌・刺激後ケアに長年の使用実績（Ebner 2002・Yang 2018）。\n\nビサボロールも紅斑抑制の論文蓄積あり（Kamatou 2010 review）が「劇的変化」エビデンスは限定的。\n\n実用的な位置づけは①刺激後の鎮静・修復補助／②敏感肌の日常ケア基盤／③ニキビ後の修復／④バリア機能低下の補助でメイン治療ではなく補助レイヤー。' },
    { q: '併用注意は？乳児・新生児にも使える？', a: 'パンテノールは極めて安全（医薬品レベル）でベパンテン®は乳児・新生児にも使用可、おむつかぶれ・湿疹・授乳中の乳頭ケア処方品もあり。\n\nビサボロールはカモミール花粉症と理論的に交差反応の可能性、パッチテスト推奨。\n\n両者とも妊娠中・授乳中安全、稀にラノリン併用品でラノリンアレルギー注意。\n\n「酒さが治る」「アトピーが治る」断定は薬機法/景表法NG・医療領域。' },
    { q: '効果が出るまでと評価は？', a: '2-8週で評価（Ebner 2002 パンテノール4週・Kamatou 2010 ビサボロール review）、早期効果型。\n\n評価指標は主観的赤み・刺激・かゆみ・乾燥・粉ふき、TEWL（経表皮水分蒸散量）、皮膚水分量、紫外線後の赤み回復速度。\n\n8週で効果限定的なら用量増量・併用強化（セラミド+スクワラン+ヒアルロン酸+ナイアシンアミド5%）・🚨慢性湿疹/酒さ/アトピーは皮膚科の領域。' },
  ],
  'retinol-vs-tranexamic-acid': [
    { q: 'レチノールとトラネキサム酸の違いは？併用OK？', a: '作用ターゲットが異なる補完関係で併用OKが王道。\n\nレチノール（外用0.025-1%）はターンオーバー促進・コラーゲン産生でしわ・光老化・色素沈着に強いエビデンス（Kafi 2007 RCT 0.4%×24週で深いしわ改善）。\n\nトラネキサム酸（外用2-5%・経口250-500mg/日）はプラスミン経路阻害で肝斑・PIHに作用（JAAD 2020 メタ n=561でmMASI改善）。\n\nしわ・光老化総合→レチノール／肝斑・PIH特化→TXAの使い分け。' },
    { q: '夜の塗布順序は？', a: '王道の順序は①洗顔→②化粧水→③TXA外用2-5%→④レチノール0.025-0.1%（薄く）→⑤保湿（セラミド+パンテノール+ヒアルロン酸）。\n\n両者とも夜のみ使用（紫外線でレチノール酸化分解・刺激重畳）、朝は日焼け止めSPF50+ PA++++必須。\n\nレチノール初心者は週2-3回から開始、敏感肌は新世代レチノイド（HPR/グラナクチン®）orバクチオール代替も検討。' },
    { q: '妊娠中に使える組み合わせは？', a: '🚨レチノールは妊娠中・授乳中・妊娠計画中NG（経口イソトレチノインの催奇形性データから外用も理論的回避推奨・ACOG/SOGC guidance）。\n\n🚨経口TXAも妊娠中NG（血栓リスク・胎盤通過懸念）。\n\n妊娠中に使える美白×しわ対策はバクチオール+TXA外用2-5%+ナイアシンアミド5%+アゼライン酸15-20%（FDA Pregnancy Category B）+VC外用15%+SPF50+ PA++++が現実解。' },
    { q: '併用注意は？刺激リスクは？', a: 'レチノールは🚨妊娠中NG・夜のみ使用・日焼け止め必須・敏感肌は0.025%から段階的開始。\n\nTXA外用は妊娠中も比較的安全だがパッチテスト推奨、🚨経口TXAは血栓既往・経口避妊薬・HRT・喫煙者・40歳以上・妊娠中・産褥期は禁忌寄りで皮膚科処方判断下。\n\n両者同時使用での刺激重畳に注意、レチノールは薄く塗布・初心者は週2-3回交互から開始。' },
    { q: '効果が出るまでと評価は？', a: '8-24週で評価（レチノール Kafi 2007 24週・TXA外用 Bala 2018 メタ）、累積効果型。\n\n評価指標は色素沈着面積（VISIA）・MASIスコア・しわ深さ（VISIA・Cutometer）・肌弾力・主観的明るさ。\n\n24週で効果限定的なら用量段階的増量（レチノール0.025→0.1→0.5→1%）・処方トレチノイン検討・🚨重度肝斑/PIH/色素沈着は皮膚科の領域（QスイッチYAGレーザー・ピコレーザー）。' },
  ],
  'ceramide-vs-bisabolol': [
    { q: 'セラミドとビサボロールの違いは？', a: '機序が完全に異なる補完関係です。\n\nセラミド外用（0.5-2%・主にセラミドNP/AP/EOP）は細胞間脂質構成成分で皮膚バリア構築・TEWL抑制・乾燥型敏感肌の中長期対策（Spada 2018で角層水分量・TEWL改善）。\n\nビサボロール（0.2-0.5%・α-ビサボロール）は抗炎症・抗刺激・浸透促進のカモミール由来モノテルペン（Kamatou 2010で紅斑抑制）。\n\nバリア構築→セラミド／急性赤み軽減→ビサボロールの使い分け。' },
    { q: '冬季悪化・乾燥型敏感肌での選び方は？', a: '冬季悪化・乾燥型バリア低下・アトピー素因→セラミド主軸が王道。\n\n細胞間脂質減少（特にセラミドNP/EOP）がアトピー皮膚で確認されており、外用セラミドが中長期の改善に有効（Chamlin 2002 J Am Acad Dermatol）。\n\n急性的な赤み・刺激後の鎮静が必要な場面ではビサボロール+パンテノール+センテラの即効性が現実的。\n\n両者の併用で「保湿バリア+抗炎症」の王道スタック。' },
    { q: '用量・形態の選び方は？', a: 'セラミドはコレステロール+遊離脂肪酸の三脂質バランス処方が王道（Man 1996 Arch Dermatol）。\n\nビサボロールはα-ビサボロール（D-(-)-α-bisabolol・天然型）が論文ベース。\n\n両者同時配合のCICA系製品が市販で多く、ナイアシンアミド5%+パンテノール+ヒアルロン酸との5成分スタックが現実的、月¥2,000-8,000程度。' },
    { q: '併用注意は？妊娠中・授乳中は？', a: '両者とも極めて安全プロファイル。\n\nセラミド外用は全肌タイプ対応、妊娠中・授乳中安全、稀に小麦由来セラミドで小麦アレルギーcaution（米/こんにゃく由来推奨）。\n\nビサボロールはカモミール花粉症と理論的交差反応の可能性、パッチテスト推奨。\n\n「アトピーが治る」「酒さが治る」断定は薬機法/景表法NG、🚨皮膚科の領域。' },
    { q: '効果が出るまでと評価は？', a: '2-8週で評価（セラミド Spada 2018 8週・ビサボロール Kamatou 2010 review）、累積効果型。\n\n評価指標はTEWL（Tewameter）・皮膚水分量（Corneometer）・主観的乾燥・かさつき・赤み・刺激閾値。\n\n8週で効果限定的なら用量増量・併用強化（パンテノール+ヒアルロン酸+ナイアシンアミド5%+スクワラン）・🚨アトピー/乾癬/酒さは皮膚科の領域。' },
  ],
  'spermidine-vs-urolithin-a': [
    { q: 'スペルミジンとウロリチンAの違いは？', a: '作用ターゲットが異なる補完関係です。\n\nスペルミジン（1-15mg/日・小麦胚芽/納豆/熟成チーズ由来ポリアミン）はオートファジー誘導でlongevity関連（Eisenberg 2016 Nat Medマウス寿命延長・Kiechl 2018 Am J Clin Nutrで食事性スペルミジン摂取と総死亡率低下の関連）。\n\nウロリチンA（500-1,000mg/日・Mitopure®規格・エラグ酸代謝産物）はマイトファジー誘導でミトコンドリア品質管理（Andreux 2019 Nat Metab・Liu 2022 JAMA Network OpenでRCT高齢者筋機能改善）。' },
    { q: '用量・形態・規格化原料は？', a: 'スペルミジンは1-15mg/日、小麦胚芽抽出物（10mg/日相当）が市販主流、Longevity Labs spermidineLIFE®等が規格化原料。\n\nウロリチンAは500-1,000mg/日、Mitopure®（Amazentis社・Nestlé Health Science傘下・特許製法）が論文で使用された規格化原料。\n\n食事ベース（納豆・熟成チーズ・小麦胚芽・大豆発酵食品）は安価で現実的、ザクロ/ベリーから内因性ウロリチンA産生は腸内細菌依存（保有率30-40%）。' },
    { q: '内因性ウロリチンA産生って？', a: 'ザクロやベリー類のエラグ酸を腸内細菌（Gordonibacter・Ellagibacter等）が代謝してウロリチンAが体内産生される機序（Tomás-Barberán 2017 Mol Nutr Food Res）。\n\nただし産生菌保有率は人口の30-40%程度で残りは「メタボタイプB/C」で非産生（García-Villalba 2017）。\n\n非産生者は直接ウロリチンA摂取が現実的、産生者でも摂取量限界があるためサプリ補助が王道。' },
    { q: '併用注意は？癌治療中は？', a: 'スペルミジンは🚨化学療法中はcaution（オートファジー経路が抗腫瘍薬の作用に関与・腫瘍内科判断下）、稀に消化器症状。\n\nウロリチンAは現時点で重篤副作用報告なし（Andreux 2019・Singh 2022）、ただし長期データ蓄積段階で🚨化学療法中・自己免疫疾患はcaution。\n\n両者とも妊娠中・授乳中は標準的安全性データ限定で産科医相談下、「老化が止まる」「不老」断定は薬機法/景表法NG。' },
    { q: '効果が出るまでと評価は？', a: '4-16週で評価（スペルミジン Schwarz 2018 Aging RCT認知機能 16週・ウロリチンA Andreux 2019 4週・Liu 2022 16週）、累積効果型。\n\n評価指標はミトコンドリア機能関連バイオマーカー（要専門検査）・筋機能（握力・歩行速度・6分間歩行）・主観的疲労感・認知機能（MMSE/MoCA）。\n\n12-16週で効果限定的なら用量増量・併用追加（NMN/NR+CoQ10+オメガ3+食事性ポリアミン+運動）・生活軸（運動週150分以上・地中海食・睡眠）。' },
  ],
  'pterostilbene-vs-fisetin': [
    { q: 'プテロスチルベンとフィセチンの違いは？', a: '機序と研究領域が異なる補完関係。\n\nプテロスチルベン（50-250mg/日・ブルーベリー由来3,5-ジメトキシスチルベン）はレスベラトロールの3,5-ジメトキシ体で経口吸収率・血中半減期がレスベラトロールより優位（Riche 2014 J Toxicol RCTで脂質代謝改善・血圧低下報告）。\n\nフィセチン（100-500mg/日・イチゴ/りんご由来フラボノール）はsenolytics（老化細胞除去）特化（Yousefzadeh 2018 EBioMedicineマウス lifespan延長・Wake Forest大学等でヒトPhase II試験進行中）。' },
    { q: '用量・形態・規格化原料は？', a: 'プテロスチルベンはpTeroPure®（Sabinsa社・特許製法）規格化原料、Life Extension Pterostilbene 50mg等、月¥2,500-5,000。\n\nフィセチンはNovusetin®（OptiPure社）規格化原料、Doctor\'s Best Fisetin 100mg with Novusetin®等、月¥2,500-6,000。\n\nsenolytics「ヒット&ラン」プロトコル（フィセチン1,500mg/日×2-3日連続+1ヶ月空ける）が動物試験ベース・ヒトRCT進行中で確立前。' },
    { q: 'senolyticsって何？効果実証は？', a: 'senolyticsは「老化細胞（senescent cells）を選択的に除去する薬剤」の総称で、ダサチニブ+ケルセチンD+Qカクテルが先駆的（Zhu 2015 Aging Cell）。\n\nフィセチンはケルセチンより強い・単剤senolyticsとして注目（Yousefzadeh 2018）。\n\nヒトRCTはWake Forest大学の特発性肺線維症・糖尿病性腎症・骨粗鬆症等で進行中（Justice 2019 EBioMedicineで初Phase Iは安全性確認）、効果実証は確立前のemerging段階。' },
    { q: '併用注意は？癌治療中・抗凝固薬は？', a: 'プテロスチルベンは🚨抗凝固薬・抗血小板薬で出血傾向の可能性（理論的影響限定的）、🚨化学療法中はcaution、糖尿病薬で血糖低下増強monitor。\n\nフィセチンは🚨抗凝固薬・抗血小板薬で出血傾向、🚨化学療法中はcaution（senolyticsは抗腫瘍効果と相互作用の可能性・腫瘍内科判断下）、CYP3A4阻害でカルバマゼピン等の薬物動態変動の可能性。\n\n両者妊娠中・授乳中NG（データ限定）。' },
    { q: '効果が出るまでと評価は？', a: '12-24週で評価（プテロスチルベン Riche 2014 RCT 6-8週・フィセチン animal/Phase I安全性のみ）、累積効果型。\n\n評価指標はバイオマーカー（hs-CRP・IL-6・脂質パネル・血圧・空腹時血糖・HbA1c）、主観的疲労感、関節痛、肌弾力。\n\n効果が確立されたヒトRCT指標は限定的で、両者ともemerging（新興）段階の認識が現実的、生活軸（運動・地中海食・睡眠）が王道の基盤。' },
  ],
  'nmn-vs-spermidine': [
    { q: 'NMNとスペルミジンの違いは？', a: '作用機序が異なる補完関係です。\n\nNMN（250-500mg/日）はNAD+補充でサーチュイン活性化・細胞代謝（Yoshino 2021 Science RCT n=25 250mg/日10週で骨格筋インスリン感受性改善）、NAD+前駆体としては経口吸収・血中NAD+上昇のヒトRCTあり。\n\nスペルミジン（1-15mg/日）はオートファジー誘導で longevity関連（Eisenberg 2016 Nat Medマウス寿命延長・Kiechl 2018食事摂取と総死亡率低下の関連）。\n\nNAD+補充→NMN／オートファジー全般→スペルミジンの併用が王道。' },
    { q: '用量・形態・併用スタックは？', a: 'NMNは250-500mg/日、Uthever®規格化原料（GeneHarbor香港・FDA NDI届出済）等、月¥6,000-12,000。\n\nスペルミジンは1-15mg/日、小麦胚芽抽出物（spermidineLIFE®等）月¥3,000-6,000、または食事ベース（納豆・熟成チーズ・小麦胚芽）が無難。\n\n抗老化スタックはNMN 250-500mg/日+スペルミジン1-15mg/日+CoQ10ユビキノール100mg+オメガ3 1-2g+ビタミンD 2,000IUの5成分が現実的、月¥10,000-20,000。' },
    { q: 'どっちが効くの？ヒトRCT階層は？', a: 'ヒトRCTエビデンスはNMN優位（Yoshino 2021 Scienceで骨格筋インスリン感受性改善・血中NAD+上昇）、ただし臨床アウトカム（疲労・認知）の有意差は限定的（Damgaard 2023 systematic review）。\n\nスペルミジンはヒトの「食事性摂取と総死亡率低下」観察研究（Kiechl 2018）+ Schwarz 2018 Aging RCT認知機能改善があるが小規模、マウス寿命延長エビデンスは強い。\n\n両者とも「寿命が延びる」断定は論文ベースで未確立。' },
    { q: '併用注意は？癌治療中は？', a: 'NMNは現時点で重篤副作用報告なし（Yoshino 2021・Mills 2016）、ただし長期データ限定、🚨化学療法中・がん既往はcaution（NAD+補充が腫瘍細胞増殖を支える理論的懸念・腫瘍内科判断下）。\n\nスペルミジンは🚨化学療法中caution（オートファジー経路と抗腫瘍薬の相互作用）、稀に消化器症状。\n\n両者妊娠中・授乳中は標準的安全性データ限定で産科医相談下。' },
    { q: '効果が出るまでと評価は？', a: '8-16週で評価（NMN Yoshino 2021 10週・スペルミジン Schwarz 2018 16週）、累積効果型。\n\n評価指標は血中NAD+（NMN・専門検査）・インスリン感受性HOMA-IR・空腹時血糖・HbA1c・脂質パネル・主観的疲労感・運動パフォーマンス・認知機能。\n\n16週で効果限定的なら用量増量・併用追加（NR/CoQ10/オメガ3/食事性ポリアミン）・生活軸（運動・地中海食・睡眠7-9時間・カロリー収支）が王道の基盤。' },
  ],
  'sulforaphane-vs-quercetin': [
    { q: 'スルフォラファンとケルセチンの違いは？', a: '作用機序が異なる補完関係です。\n\nスルフォラファン（5-30mg/日・ブロッコリースプラウト由来イソチオシアネート）はNrf2-ARE経路活性化で内因性抗酸化・解毒酵素（GST・NQO1・HO-1）誘導（Fahey 1997 PNAS機序確立・Zhang 2006 Cancer Res化学予防エビデンス）。\n\nケルセチン（500-1,000mg/日・タマネギ/りんご由来フラボノール）はsenolytics特化（Zhu 2015 Aging Cell D+Qカクテルで老化細胞アポトーシス誘導）+抗ヒスタミン（Mlcek 2016）の二刀流。' },
    { q: '用量・形態・規格化原料は？', a: 'スルフォラファンはTrueBroc®（Brassica Protection Products社・特許製法・ブロッコリースプラウト由来）規格化原料、Jarrow Formulas BroccoMax 等、月¥3,000-6,000。\n\nケルセチンはバイオフラボノイドコンプレックスやホスホリポソーム製剤で吸収率向上、Quercetin Phytosome（Mirica/Quercefit®）規格化原料、月¥1,500-3,500。\n\n食事ベースはブロッコリースプラウト100g/日（スルフォラファン20-30mg相当）+タマネギ・りんご・緑茶（ケルセチン20-50mg/日相当）が現実的。' },
    { q: 'Nrf2活性化って何？解毒経路？', a: 'Nrf2-ARE経路は細胞内抗酸化システムの「マスタースイッチ」で、活性化により200以上の解毒・抗酸化酵素（GST・NQO1・HO-1・グルタチオン関連酵素）が誘導される（Suzuki 2013 Mol Cell Biol）。\n\nスルフォラファンはNrf2活性化の最強天然化合物の一つで、化学予防・解毒・抗炎症・神経保護の研究蓄積（Houghton 2019 Front Pharmacol review）。\n\nグルタチオン経口より「内因性産生を高める」アプローチで効率的とする論文整合性あり。' },
    { q: '併用注意は？甲状腺・抗凝固薬は？', a: 'スルフォラファンは🚨甲状腺機能低下症caution（アブラナ科野菜のゴイトロゲン作用・大量摂取で甲状腺機能影響の理論的懸念・甲状腺薬と2-4時間ずらす）、稀に消化器症状。\n\nケルセチンは🚨抗凝固薬・抗血小板薬で出血傾向の可能性（理論的影響）、🚨CYP3A4阻害でシクロスポリン・タクロリムス・カルバマゼピン等の薬物動態変動の可能性、化学療法中はcaution。\n\n両者妊娠中は標準的食事範囲内で安全。' },
    { q: '効果が出るまでと評価は？', a: '4-12週で評価（スルフォラファン Bahadoran 2012 Diabetes Care RCT 12週・ケルセチン Edwards 2007 J Nutrフロリ 6-12週）、累積効果型。\n\n評価指標はバイオマーカー（hs-CRP・脂質パネル・空腹時血糖・HbA1c・抗酸化指標MDA/8-OHdG）、主観的疲労感、アレルギー症状（ケルセチンの場合）。\n\n12週で効果限定的なら用量増量・併用追加（NAC+ビタミンC+E+ω3）・🚨慢性疾患は内科の領域で食事+運動の総合介入。' },
  ],
  'melatonin-vs-magnesium-l-threonate': [
    { q: 'メラトニンとマグネシウムL-スレオネートの違いは？', a: '作用ターゲットが異なる補完関係です。\n\nメラトニン（0.3-3mg）は生体時計リセット・入眠潜時短縮（Cochrane 2002 メタ n=1,200で時差ぼけ改善・PLOS ONE 2013 メタ n=1,683で入眠潜時平均7分短縮）、日本では医薬品扱いで個人輸入前提。\n\nマグネシウムL-スレオネート（1,500-2,000mg/日・元素Mg約144mg含有・Magtein®）は脳血液関門通過特異形態で脳内Mg濃度上昇・認知機能改善（Liu 2016 J Alzheimers Dis RCT n=44で12週で認知機能スコア改善）。' },
    { q: '使い分けは？睡眠と認知どっちが優先？', a: '概日リズム障害（時差ぼけ・交代勤務・明け方早朝覚醒）→メラトニン主軸が王道。\n\n認知機能補助+睡眠の質改善→スレオネート（脳内Mg上昇経路で睡眠の質・記憶の二刀流）。\n\n両者経路独立で併用OK、就寝1時間前スレオネート+就寝30分前メラトニンの二段スタックが現実的。\n\nグリシン酸塩との併用も補完的（神経筋弛緩+脳到達Mg+メラトニン）。' },
    { q: '用量・形態・日本での入手は？', a: 'メラトニンは0.3-3mg、🚨日本では医薬品扱い（睡眠導入剤類縁）でサプリ流通なし・個人輸入は自己責任のグレーゾーン領域。\n\nスレオネートはMagtein®（MagCeutics社・MIT特許製法）規格化原料、Life Extension Neuro-Mag等、月¥4,000-7,000（他形態の3-5倍コスト）。\n\nグリシン酸塩は国内流通（200-400mg/日・¥1,500-3,500/月）で代替軸として現実的。' },
    { q: '併用注意は？フルボキサミン・腎機能は？', a: 'メラトニンは🚨フルボキサミン併用で血中濃度17倍上昇（CYP1A2強阻害）の最強警告、🚨双極性障害・てんかん既往caution、抗凝固薬・降圧薬で作用変動monitor。\n\nスレオネートは🚨腎機能低下例（CKD ステージ3以上・eGFR<60）caution、テトラサイクリン・ビスホスホネート・甲状腺薬と2-4時間ずらす、稀に消化器症状（他形態より少）。\n\n両者妊娠中・授乳中は産科医相談下。' },
    { q: '効果が出るまでと評価は？', a: '【メラトニン】1日目から効果あり（即時型）、評価指標は入眠潜時・総睡眠時間・PSQI（ピッツバーグ睡眠質問票）。\n\n【スレオネート】4-12週で評価（Liu 2016 12週）、累積効果型、評価指標は認知機能テスト（MMSE/MoCA）・主観的記憶・集中力・睡眠の質。\n\n2-3週で効果限定的なら用量階段（メラトニン0.3→1→3mg）、12週で効果限定的なら併用追加（グリシン酸塩+L-テアニン+グリシン+亜鉛+ビタミンD）・🚨重度不眠は心療内科の領域。' },
  ],
  'bacopa-monnieri-vs-rhodiola': [
    { q: 'バコパモニエラとロディオラの違いは？', a: '効果の時間軸が完全に異なる補完関係です。\n\nバコパモニエラ（300-600mg/日・バコサイドA+B 20-50%標準化）は記憶・学習の累積効果型で12週以上の継続が必要（Stough 2001 Psychopharmacology RCT n=46で12週で言語学習・遅延再生改善・Calabrese 2008メタ）。\n\nロディオラ（SHR-5 200-600mg/日・ロザビン+サリドロサイド3:1標準化）は精神疲労・バーンアウト・認知パフォーマンス改善で即時効果型（Phytomedicine 2010 RCT n=101 SHR-5 170mg/日×4週で計算誤り率改善）。' },
    { q: '用量・形態・規格化原料は？', a: 'バコパモニエラはBacoMind®（Natural Remedies社・バコサイド総量45%）or Synapsa®（Centroflora-Cms社）が論文用量再現の規格化原料、月¥2,000-4,500。\n\nロディオラはSHR-5（Swedish Herbal Institute・ロザビン+サリドロサイド3:1）が論文用量再現の規格化原料、Vitanica Rhodiola Strength等、月¥2,500-5,000。\n\n摂取タイミングはバコパ朝食後・ロディオラ朝食前空腹時（覚醒目的）が王道。' },
    { q: '学生・社会人・更年期での使い分けは？', a: '【学生・記憶定着・学習効率】＝バコパ主軸（12週累積で記憶・学習スコア改善・Stough 2001）。\n\n【社会人・プレゼン前・短期パフォーマンス】＝ロディオラ主軸（即効性・精神疲労軽減・Phytomedicine 2010）。\n\n【更年期気分・バーンアウト】＝ロディオラ+アシュワガンダ+サフラン+L-テアニンのアダプトゲンスタック。\n\n両者経路独立で「朝ロディオラ+昼バコパ」の二段スタックも王道、L-テアニン+カフェインも補助的。' },
    { q: '併用注意は？抗うつ薬・甲状腺は？', a: 'バコパは🚨稀に消化器症状（嘔気・嘔吐・下痢）、フェニトイン・カルバマゼピン等の抗てんかん薬で血中濃度変動の可能性、甲状腺機能亢進症caution、抗凝固薬で出血傾向の理論的可能性。\n\nロディオラは🚨双極性障害禁忌（躁転リスク）、🚨MAOI併用NG、SSRI/SNRI併用注意（セロトニン症候群の理論的可能性）、🚨手術前1-2週間中止検討（血圧変動）、稀に不眠・興奮（夕方以降摂取は避ける）。\n\n両者妊娠中・授乳中NG（データ限定）。' },
    { q: '効果が出るまでと評価は？', a: '【バコパ】8-12週で評価（Stough 2001 12週・Calabrese 2008メタ）、累積効果型、評価指標は言語学習テスト・遅延再生・作業記憶・主観的記憶。\n\n【ロディオラ】1-4週で評価（Phytomedicine 2010 4週・J Sports Med 2017 12週）、即時+累積併存、評価指標は精神疲労・燃え尽きスコア・認知パフォーマンス・主観的活力。\n\n12週で効果限定的なら用量増量・併用追加（L-テアニン+アシュワガンダ+カフェイン+オメガ3）・🚨重度うつは心療内科の領域。' },
  ],
  'lions-mane-vs-citicoline': [
    { q: 'ライオンズメインとシチコリンの違いは？', a: '機序が完全に異なる補完関係です。\n\nライオンズメイン（ヤマブシタケ500-3,000mg/日・ヘリセノン/エリナシン規格）はNGF（神経成長因子）誘導で神経再生・髄鞘形成・MCI改善（Mori 2009 Phytother Res RCT n=30で12週で認知機能スコア改善・Saitsu 2019 Biomed Resで気分改善）。\n\nシチコリン（500-2,000mg/日・Cognizin®規格）はコリン+シチジン分解→アセチルコリン合成+膜リン脂質合成（Silveri 2008 RCTで前頭葉リン脂質代謝指標改善・Fioravanti 2005 Cochrane）。' },
    { q: '用量・形態・規格化原料は？', a: 'ライオンズメインはβ-グルカン+ヘリセノン+エリナシン規格化原料が王道、Host Defense Lions Mane / Real Mushrooms Lion\'s Mane等、月¥3,000-7,000。\n\n「子実体（fruiting body）抽出物」が論文整合性ある原料で、菌糸体ベース品との品質差に注意。\n\nシチコリンはCognizin®（Kyowa Hakko協和発酵バイオ社・特許製法）規格化原料、Jarrow Formulas Citicoline等、月¥3,000-6,500。' },
    { q: 'MCI（軽度認知障害）・うつへの使い方は？', a: '【MCI・健常加齢者の認知機能サポート】＝ライオンズメイン主軸（Mori 2009 RCTで12週で認知機能スコア改善）+シチコリン補助（膜リン脂質合成）+オメガ3+ビタミンB群+ビタミンD+地中海食。\n\n【気分・軽度うつ症状】＝ライオンズメイン補助検討（Saitsu 2019で気分改善）+SSRI/SNRI処方は心療内科の領域。\n\n【脳血管障害後リハビリ】＝シチコリン主軸（Fioravanti 2005 Cochrane）+神経内科の領域でリハビリ・処方薬。' },
    { q: '併用注意は？抗凝固薬・喘息は？', a: 'ライオンズメインは🚨きのこアレルギーcaution（パッチテスト推奨）、🚨喘息既往で稀に呼吸器症状報告、🚨抗凝固薬で出血傾向の理論的可能性（手術前1-2週間中止検討）、稀に消化器症状。\n\nシチコリンは極めて安全プロファイル（Cognizin®はFDA GRAS認証）、稀に消化器症状、抗コリン薬で作用相殺、L-DOPA併用は精神神経科の領域。\n\n両者妊娠中・授乳中は標準的安全性データ限定で産科医相談下。' },
    { q: '効果が出るまでと評価は？', a: '【ライオンズメイン】8-16週で評価（Mori 2009 12週・Saitsu 2019 4週）、累積効果型、評価指標は認知機能テスト（MMSE/MoCA）・主観的記憶・気分（HAM-D・PHQ-9）。\n\n【シチコリン】4-12週で評価（Silveri 2008 28日・Fioravanti 2005 Cochrane）、累積効果型、評価指標は認知機能・反応時間・作業記憶・処理速度・主観的集中力。\n\n12-16週で効果限定的なら用量増量・併用追加（バコパ+アルファGPC+L-テアニン+カフェイン）・🚨重度認知機能低下は神経内科の領域。' },
  ],
  'phosphatidylserine-vs-citicoline': [
    { q: 'ホスファチジルセリン（PS）とシチコリンの違いは？', a: '機序が異なる補完関係です。\n\nホスファチジルセリン（100-300mg/日・大豆由来Sharp-PS®/Lipogen規格）は神経細胞膜リン脂質の主成分で記憶・ストレス・コルチゾール調整（Vakhapova 2010 Dement Geriatr Cogn Disord RCT n=72で15週で記憶改善・Hellhammer 2004 Stressで運動後コルチゾール抑制）。\n\nシチコリン（500-2,000mg/日・Cognizin®）はアセチルコリン合成+膜リン脂質合成（Silveri 2008 RCT・Fioravanti 2005 Cochrane）。' },
    { q: 'ストレスケアと認知ケアでの使い分けは？', a: '【慢性ストレス・コルチゾール過剰・夜間使用】＝PS主軸（Hellhammer 2004で運動後コルチゾール抑制・Monteleone 1992 Neuroendocrinologyで急性ストレスコルチゾール抑制）+アシュワガンダ+L-テアニン+マグネシウム。\n\n【持続的認知機能・脳血管障害後リハビリ】＝シチコリン主軸（Silveri 2008・Fioravanti 2005 Cochrane）+ライオンズメイン+オメガ3。\n\n両者経路独立で「夜PS+朝シチコリン」の二段スタック+膜リン脂質合成の補完が王道。' },
    { q: '用量・形態・規格化原料は？', a: 'PSはSharp-PS®（Enzymotec/Frutarom社・特許製法・大豆由来）or Lipogen® PS（Lipogen Ltd社）が論文用量再現の規格化原料、Jarrow Formulas PS-100 / Now Foods Phosphatidyl Serine 100 / Doctor\'s Best PS-100等、月¥2,500-5,500。\n\nシチコリンはCognizin®規格化原料、月¥3,000-6,500。\n\n両者同時配合のノートロピックスタック製品も市販（記憶+ストレス+集中の総合ケア）。' },
    { q: '併用注意は？抗凝固薬・大豆アレルギーは？', a: 'PSは🚨大豆由来アレルギーcaution（ヒマワリ由来製品も市販あり）、🚨抗凝固薬・抗血小板薬で出血傾向の理論的可能性（手術前1-2週間中止検討）、抗コリン薬で作用相殺、稀に消化器症状。\n\nシチコリンは極めて安全プロファイル（Cognizin®はFDA GRAS認証）、稀に消化器症状、抗コリン薬で作用相殺。\n\n両者妊娠中・授乳中は標準的安全性データ限定で産科医相談下。「認知症が治る」断定は薬機法/景表法NG。' },
    { q: '効果が出るまでと評価は？', a: '【PS】8-15週で評価（Vakhapova 2010 15週・Hellhammer 2004 4週ストレス）、累積効果型+ストレス指標は早期。\n\n評価指標は記憶・コルチゾール（朝/夕の唾液 or 血液検査）・主観的ストレス・睡眠の質・運動回復。\n\n【シチコリン】4-12週で評価、認知機能テスト・反応時間・処理速度。\n\n効果限定的なら用量増量・併用追加（ライオンズメイン+バコパ+アシュワガンダ+ω3+ビタミンB群）・🚨重度MCI/認知症は神経内科の領域。' },
  ],
  'dhea-vs-pregnenolone': [
    { q: 'DHEAとプレグネノロンの違いは？YMYL注意点は？', a: 'ホルモン前駆体の階層が異なる補完関係です。\n\nDHEA（25-50mg/日・副腎由来C19ステロイドホルモン前駆体）はアンドロステンジオン経由でテストステロン・エストロゲン両方向に変換（Baulieu 2000 PNAS DHEAge試験n=280で骨密度・肌・性機能改善・Arlt 1999 NEJM副腎不全RCT）。\n\nプレグネノロン（10-30mg/日・コレステロール由来全ステロイドホルモン前駆体）は「マザーステロイド」でDHEA+コルチゾール+プロゲステロン全方向への前駆体（Vallée 2018 Front Endocrinol reviewで認知・気分関連）。' },
    { q: '日本での入手・規制状況は？', a: '🚨日本では両者ともサプリ流通なし・個人輸入は自己責任のグレーゾーン領域。\n\n🚨米国ではDHEA・プレグネノロンともOTCサプリとして流通（FDA Drug Schedule非該当・スポーツ団体は禁止物質として規制）。\n\n本サイトは推奨スタンスを持たない立場で「使う」「飲む」断定はせず、ホルモン前駆体の論文整理・🚨医療領域である事実を提示するのみ。\n\n副腎不全・うつ症状・性機能低下は内分泌内科・心療内科の領域でTRT/HRT処方検討が王道。' },
    { q: '加齢ホルモン低下と医療治療との関係は？', a: 'DHEA-Sは加齢で漸減（20代ピーク→70代で20-30%）、男性更年期（LOH症候群）・女性更年期・副腎不全（addison病等）で低下顕著。\n\n🚨確立された医療治療はTRT（テストステロン補充療法・男性LOH・泌尿器科の領域）・HRT（女性更年期・婦人科の領域）・コルチゾール補充（副腎不全・内分泌内科の領域）。\n\n自己判断でのDHEA/プレグネノロン使用は推奨されない領域、血液検査（DHEA-S・テストステロン・コルチゾール・LH/FSH/PRL）が前提。' },
    { q: '併用注意は？ホルモン依存性疾患・がん既往は？', a: '🚨ホルモン依存性疾患絶対NG＝乳癌既往・前立腺癌既往・PSA高値・子宮筋腫・子宮内膜症・卵巣ホルモン感受性腫瘍・タモキシフェン/アロマターゼ阻害薬使用中。\n\n🚨PCOS既往（高アンドロゲン症状悪化）・多嚢胞性卵巣症候群・男性化症状（多毛・座瘡・薄毛）でcaution。\n\n🚨🚨自己判断使用は推奨されない領域で内分泌内科・婦人科・泌尿器科の領域、抗うつ薬・降圧薬・糖尿病薬との相互作用報告あり。\n\n妊娠中・授乳中・妊娠計画中は絶対NG。' },
    { q: '効果が出るまでと評価は？医療連携は？', a: '🚨自己判断使用は推奨されない領域で評価指標も含めて医療領域での実施が王道。\n\n血液検査（DHEA-S・総テストステロン・遊離テストステロン・E2・コルチゾール・LH/FSH/PRL・PSA・血糖・脂質・肝機能）は3-6ヶ月ごとmonitor、副作用（多毛・座瘡・男性化・血圧上昇・血糖変動・気分変動）。\n\n効果評価は医療領域で内分泌内科・泌尿器科・婦人科の医師判断下、サプリ単独自己判断使用はリスクが上回る領域。' },
  ],
  'holy-basil-vs-ashwagandha': [
    { q: 'ホーリーバジルとアシュワガンダの違いは？', a: '両者ともアーユルヴェーダのアダプトゲン系ハーブで作用領域が異なる補完関係。\n\nホーリーバジル（トゥルシー・Ocimum tenuiflorum・300-600mg/日）は抗炎症・血糖・抗酸化に作用（Saxena 2012 Evid Based Complement Alternat Med RCT 1,200mg/日×6週でストレススコア改善・Cohen 2014 J Ayurveda Integr Med reviewで血糖関連）。\n\nアシュワガンダ（KSM-66 300-600mg/日）はHPA軸調整経由でコルチゾール低下・睡眠の質改善・テストステロン関連（Salve 2019 Cureus RCT 600mg/日×8週でコルチゾール有意低下）。' },
    { q: '用量・形態・規格化原料は？', a: 'ホーリーバジルはOciBest®（Natural Remedies社・特許製法）規格化原料、Organic India Tulsi / New Chapter Holy Basil Force等、月¥2,500-5,000。\n\nアシュワガンダはKSM-66®（Ixoreal Biomed社・withanolides 5%標準化・根のみ抽出）or Sensoril®（NutraGenesis社・withanolides 10%標準化・根+葉抽出物）が論文用量再現の規格化原料、月¥1,500-4,000。\n\n摂取タイミングは朝食後ホーリーバジル+夕食後or就寝前アシュワガンダの二段スタックが王道。' },
    { q: '血糖・抗炎症と睡眠どっち優先？', a: '【血糖管理補助・抗炎症・抗酸化】＝ホーリーバジル主軸（Bhattacharyya 2008 RCT糖尿病患者で空腹時血糖改善・Cohen 2014 review）+ベルベリン+クルクミン+食事+運動。\n\n【慢性ストレス・コルチゾール過剰・睡眠の質低下】＝アシュワガンダ主軸（Salve 2019・Lopresti 2019）+L-テアニン+マグネシウムグリシン酸+メラトニン。\n\n両者経路独立で併用OK、目的別の優先順位が異なる、糖尿病・重度ストレスは医療領域。' },
    { q: '併用注意は？甲状腺・自己免疫は？', a: 'ホーリーバジルは🚨抗凝固薬で出血傾向の理論的可能性、🚨糖尿病薬で血糖低下増強monitor、🚨妊娠中・授乳中NG（子宮収縮作用の可能性・伝統的妊娠中避ける）。\n\nアシュワガンダは🚨甲状腺機能亢進症NG（甲状腺ホルモン上昇報告・Sharma 2018）、🚨自己免疫疾患（橋本病・SLE・関節リウマチ・乾癬・1型糖尿病）caution（Mishra 2000免疫調節作用）、🚨妊娠中・授乳中NG（流産リスク報告）、鎮静薬・睡眠薬で重畳作用。' },
    { q: '効果が出るまでと評価は？', a: '4-12週で評価（ホーリーバジル Saxena 2012 6週・Cohen 2014 review・アシュワガンダ Salve 2019 8週）、累積効果型。\n\n評価指標は主観的ストレス（PSS）・コルチゾール（朝/夕の唾液 or 血液検査）・空腹時血糖・HbA1c・睡眠の質（PSQI）・主観的活力・疲労感（FACIT-F）。\n\n12週で効果限定的なら用量増量・併用追加（ロディオラ+L-テアニン+マグネシウム+ω3）・🚨重度ストレス/糖尿病は内科・心療内科の領域。' },
  ],
  'mucuna-pruriens-vs-tongkat-ali': [
    { q: 'ムクナとトンカットアリの違いは？', a: '機序が異なる男性活力ハーブの補完関係です。\n\nムクナプルリエンス（100-400mg/日・L-DOPA 15-30%標準化）は天然L-DOPA含有でドパミン前駆体・パーキンソン病補助・性機能・気分・男性ホルモン関連（HCS Lab 2004 Phytother Res男性不妊RCTでテストステロン+精子質改善・Katzenschlager 2004 J Neurol Neurosurg PsychiatryでPD症状改善）。\n\nトンカットアリ（200-400mg/日・Physta®/LJ100®規格）はSHBG低下→free-T増加（Tambi 2012 RCT n=76でテストステロン正常化・Talbott 2013でコルチゾール改善）。' },
    { q: '用量・形態・規格化原料は？', a: 'ムクナはL-DOPA 15-30%標準化抽出物が論文用量再現、Solaray Mucuna Dopa 等、月¥2,500-5,500。\n\n🚨L-DOPA含有量が高用量化のリスクで規格明示品が前提、「ムクナ配合」訴求のみで含有量不明品は効果・安全性ともに不確実。\n\nトンカットアリはPhysta®（HP Ingredients社・FDA NDI届出済・水抽出物・重金属管理）or LJ100®（eurycomanone 22%標準化）規格化原料、月¥3,000-7,000。' },
    { q: '気分・ドパミンと男性活力の使い分けは？', a: '【気分・ドパミン・PD補助・性機能】＝ムクナ主軸（Katzenschlager 2004 PD・HCS Lab 2004性機能）。\n\n【free-T・コルチゾール・男性活力・ストレス耐性】＝トンカットアリ主軸（Tambi 2012・Talbott 2013）。\n\n両者経路独立で併用OKだが🚨ムクナ高用量L-DOPAでドパミン受容体下方制御・離脱症状の理論的懸念で短期使用（4-8週単位）が現実的、トンカットアリは継続使用OK。' },
    { q: '併用注意は？SSRI・抗精神病薬は？', a: 'ムクナは🚨SSRI・MAOI・三環系抗うつ薬・抗精神病薬・パーキンソン病治療薬（L-DOPA・カルビドパ・MAOB阻害薬）併用で精神神経科の領域（セロトニン症候群・ドパミン過剰の理論的懸念）、降圧薬で血圧変動、🚨統合失調症・双極性障害禁忌、妊娠中・授乳中NG。\n\nトンカットアリは🚨前立腺癌既往・PSA高値・前立腺肥大症caution、🚨女性は妊娠中・授乳中NG、SSRI・抗精神病薬・抗凝固薬・糖尿病薬caution。' },
    { q: '効果が出るまでと評価は？', a: '【ムクナ】1-8週で評価（HCS Lab 2004 3ヶ月・Katzenschlager 2004 PD急性）、即時+累積併存、評価指標は性機能（IIEF-5/AMS）・主観的気分・テストステロン・PD症状（PDの場合は神経内科の領域）。\n\n【トンカットアリ】4-12週で評価（Tambi 2012 4週・Talbott 2013 4週）、累積効果型、評価指標は総テストステロン・遊離テストステロン・SHBG・コルチゾール・ED症状・主観的活力。\n\n効果限定的なら🚨泌尿器科・神経内科・心療内科の領域。' },
  ],
  'saffron-vs-ashwagandha': [
    { q: 'サフランとアシュワガンダの違いは？', a: '気分とストレス領域で機序が異なる補完関係。\n\nサフラン（28-30mg/日・affron®規格・サフラナール3.5%標準化）はクロシン/サフラナール/ピクロクロシンの多経路（セロトニン再取り込み阻害+抗酸化+抗炎症）で気分改善（Lopresti 2014 Hum Psychopharmacolメタ解析でSSRI同等の抑うつ改善・Akhondzadeh 2005 BMC Psychiatry RCT 30mg/日×6週）。\n\nアシュワガンダ（KSM-66 300-600mg/日）はHPA軸調整経由でコルチゾール低下・睡眠の質改善（Salve 2019）。' },
    { q: 'うつ・PMS・更年期気分での使い分けは？', a: '【軽度〜中等度抑うつ・PMS・更年期気分】＝サフラン主軸（Lopresti 2014メタでSSRI同等・Agha-Hosseini 2008 BJOG RCT PMS）+ビタミンB6+カルシウム+マグネシウム。\n\n【慢性ストレス・コルチゾール過剰・睡眠の質低下】＝アシュワガンダ主軸（Salve 2019・Lopresti 2019）+L-テアニン+マグネシウムグリシン酸+メラトニン。\n\n両者経路独立で併用OK、🚨重度うつ・希死念慮・パニック障害・双極性障害は心療内科の領域。' },
    { q: '用量・形態・規格化原料は？', a: 'サフランはaffron®（Pharmactive Biotech社・スペイン・特許抽出物・サフラナール3.5%標準化）が論文用量再現の規格化原料、Life Extension Optimized Saffron with Satiereal® / Doctor\'s Best Saffron Extract等、月¥3,000-6,000。\n\nアシュワガンダはKSM-66®/Sensoril®規格化原料、月¥1,500-4,000。\n\n摂取タイミングは朝食後サフラン28-30mg+夕食後or就寝前アシュワガンダ300-600mgの二段スタックが王道。' },
    { q: '併用注意は？SSRI・妊娠中は？', a: 'サフランは🚨SSRI/SNRI/MAOI併用は理論的セロトニン作用重畳caution（5-HTPほどシビアではないが心療内科相談前提）、🚨妊娠中NG（子宮収縮作用報告・流産リスク・伝統的妊娠中避ける）、🚨双極性障害caution、抗凝固薬で出血傾向、稀に消化器症状・頭痛・めまい。\n\nアシュワガンダは🚨甲状腺機能亢進症NG、🚨自己免疫疾患caution、🚨妊娠中・授乳中NG、鎮静薬・睡眠薬で重畳作用。' },
    { q: '効果が出るまでと評価は？', a: '4-12週で評価（サフラン Lopresti 2014メタ 6-12週・Akhondzadeh 2005 6週・アシュワガンダ Salve 2019 8週）、累積効果型。\n\n評価指標は抑うつスコア（HAM-D・BDI-II・PHQ-9）・不安スコア（GAD-7）・PMS症状（DRSP）・主観的気分・睡眠の質（PSQI）・コルチゾール。\n\n8-12週で効果限定的なら🚨心療内科・精神科の領域（中等度〜重度抑うつ・希死念慮・パニック障害・双極性障害はSSRI/SNRI・認知行動療法CBT）。' },
  ],
  'iron-vs-vitamin-b12': [
    { q: '鉄とビタミンB12の違いは？貧血の鑑別は？', a: '両者は「貧血」で混同されがちですが原因が異なります。\n\n鉄欠乏性貧血（IDA）は小球性低色素性（MCV<80・Hb低下）で月経過多/消化管出血/吸収不良由来（Camaschella 2015 NEJM review）。\n\nB12欠乏は巨赤芽球性貧血（MCV>100・神経症状併発）で胃切除/PPI長期/メトホルミン長期/ヴィーガン由来（Stabler 2013 NEJM review）。\n\n鑑別はCBC+MCV+フェリチン+血清B12+MMAが王道、サプリ前検査が王道。' },
    { q: '用量・形態の選び方は？', a: '鉄は経口18-60mg/日、形態優先順位は①グリシン酸キレートFerrochel®（吸収率+胃腸障害少）、②ヘム鉄（動物性・吸収率高）、③フマル酸鉄/グリシン酸鉄、④硫酸鉄（胃腸障害多）、⑤酸化鉄（吸収率最低・推奨しない）。\n\nB12は500-1,000μg/日（経口高用量推奨）、形態優先順位は①メチルコバラミン（活性型・脳神経特化）、②アデノシルコバラミン（活性型・ミトコンドリア）、③シアノコバラミン（合成型・コスパ良）、④ヒドロキソコバラミン（注射処方）。' },
    { q: 'B12欠乏のリスクが高い人は？', a: '🚨B12欠乏ハイリスク群＝ベジタリアン/ヴィーガン（動物性食品由来のみ自然摂取）・胃切除既往（内因子IF分泌低下）・PPI長期（オメプラゾール・ランソプラゾール10年以上）・H2ブロッカー長期・メトホルミン長期（Wile 2010メタで吸収阻害）・65歳以上（萎縮性胃炎・自己抗体）・小腸切除既往・SIBO。\n\nハイリスク群はメチルコバラミン500-1,000μg/日経口高用量（受動拡散吸収を活用）、年1回CBC+MCV+血清B12+MMAモニタリングが王道。' },
    { q: '併用注意は？妊娠中は？', a: '鉄は🚨遺伝性ヘモクロマトーシス（HFE変異 C282Y/H63D）絶対NG、🚨男性/閉経後女性はサプリ前検査がより重要、フェリチン>100の非欠乏型は補給回避、テトラサイクリン/フルオロキノロン/ビスホスホネート/レボチロキシンと2-4時間ずらす、お茶/コーヒー/カルシウム/PPIで吸収低下、稀に消化器症状（嘔気・便秘・黒色便）。\n\nB12は🚨葉酸1mg/日超長期で欠乏マスキング、稀に座瘡悪化、両者妊娠中安全（鉄27mg/日・B12 500μg/日）。' },
    { q: '効果が出るまでと評価は？', a: '【鉄欠乏改善】Hb上昇2-4週・フェリチン正常化8-26週（Bothwell 2000 review）、評価指標はCBC（Hb・MCV・網状赤血球数）・フェリチン・TIBC・TSAT・主観的疲労感・息切れ。\n\n【B12欠乏改善】2-6週でホモシステイン低下・MMA改善、評価指標は血清B12・MMA・MCV・神経症状（しびれ・歩行障害・舌炎）。\n\n効果限定的なら🚨内科・血液内科・消化器内科の領域（消化管出血/月経過多/吸収不良/悪性貧血鑑別）。' },
  ],
  'nicotinamide-riboside-vs-resveratrol': [
    { q: 'NR（ニコチンアミドリボシド）とレスベラトロールの違いは？', a: '作用機序が異なる補完関係です。\n\nNR（300-600mg/日・Tru Niagen®・ChromaDex社特許Niagen®配合）はNAD+前駆体で経口吸収・血中NAD+上昇のヒトRCT蓄積（Conze 2019 Sci Rep RCT n=140で8週で血中NAD+用量依存的上昇・Martens 2018 Nat Commun RCT 500mg×2/日6週で収縮期血圧低下）。\n\nレスベラトロール（trans型100-500mg/日）はSIRT1活性化のカロリー制限模倣（Howitz 2003 Nature酵母/線虫/ハエ寿命延長・Tomé-Carneiro 2013メタでヒト寿命延長未確立）。' },
    { q: 'NMNとNRどっち？レスベラトロールも要る？', a: 'NRはヒトRCT蓄積でNAD+上昇のエビデンスがあり、コスパも優位（Tru Niagen 月¥3,500前後 vs NMN月¥6-12k）。\n\nNMNはYoshino 2021でインスリン感受性改善のRCTあるが、NRも同等効果が期待される（NAD+上昇経路は共通）。\n\nレスベラトロールはSIRT1活性化経路で機序的補完だがヒト寿命延長エビデンスは未確立、抗酸化・抗炎症補助レイヤー。\n\n抗老化スタックはNR+CoQ10+オメガ3+ビタミンD+食事+運動が現実的。' },
    { q: '用量・形態・規格化原料は？', a: 'NRはNiagen®（ChromaDex社・米国・特許製法・FDA NDI届出済）が論文用量再現の規格化原料、Tru Niagen 300mg / 600mg が代表例、月¥3,500-7,000。\n\nレスベラトロールはResVida®（DSM社・特許製法・trans-レスベラトロール）or 日本薬品工業のtrans-レスベラトロール規格化原料、月¥1,500-4,000。\n\n摂取タイミングは朝食後（脂溶性で食事と同時で吸収率向上）、CoQ10/ω3併用が王道スタック。' },
    { q: '併用注意は？癌治療中・抗凝固薬は？', a: 'NRは現時点で重篤副作用報告なし（Conze 2019・Martens 2018）、ただし長期データ限定、🚨化学療法中・がん既往はcaution（NAD+補充が腫瘍細胞増殖を支える理論的懸念・腫瘍内科判断下）。\n\nレスベラトロールは🚨抗凝固薬・抗血小板薬（ワルファリン・DOAC・アスピリン・クロピドグレル）で出血傾向の理論的可能性、🚨CYP3A4阻害でカルバマゼピン等の薬物動態変動、エストロゲン感受性疾患既往caution（フィトエストロゲン作用）。\n\n両者妊娠中・授乳中データ限定で産科医相談下。' },
    { q: '効果が出るまでと評価は？', a: '4-12週で評価（NR Conze 2019 8週・Martens 2018 6週・レスベラトロール SRT501 試験・Tomé-Carneiro 2013メタ）、累積効果型。\n\n評価指標は血中NAD+（NR・専門検査）・血圧・脂質パネル・空腹時血糖・HbA1c・主観的疲労感・運動パフォーマンス・抗酸化指標（MDA・8-OHdG）。\n\n12週で効果限定的なら用量増量・併用追加（CoQ10ユビキノール+オメガ3+ビタミンD+食事性ポリフェノール）・生活軸（運動・地中海食・睡眠）が王道の基盤。' },
  ],
  'hesperidin-vs-quercetin': [
    { q: 'ヘスペリジンとケルセチンの違いは？', a: '同じフラボノイドだが作用領域が異なる補完関係。\n\nヘスペリジン（500-1,000mg/日・柑橘類由来フラバノン）は血管内皮機能・微小循環・冷え対策（Morand 2011 Am J Clin Nutr RCT n=24でメタボ患者の血管内皮機能改善・Salden 2016 Am J Clin Nutrで血圧改善）。\n\nケルセチン（500-1,000mg/日・タマネギ/りんご由来フラボノール）はsenolytics特化（Zhu 2015 Aging Cell D+Qカクテル）+抗ヒスタミン（Mlcek 2016 Molecules review）+抗酸化の多面性。' },
    { q: '冷え・むくみ vs アレルギー・抗酸化での使い分けは？', a: '【血管・微小循環・冷え・むくみ・血圧軽度高値】＝ヘスペリジン主軸（Morand 2011・Salden 2016）+ビタミンC（吸収相乗）+ω3+運動。\n\n【senolytics+抗アレルギー（花粉症・喘息）+抗酸化】＝ケルセチン主軸（Zhu 2015・Mlcek 2016）+ホスホリポソーム製剤で吸収率向上+ビタミンC併用。\n\n両者経路独立で併用OK、フラボノイド食事ベース（柑橘・タマネギ・りんご・緑茶・ベリー）が王道の基盤。' },
    { q: '吸収率の問題は？糖転移ヘスペリジン・Quercefit?', a: 'ヘスペリジンは原型では吸収率低・糖転移ヘスペリジン（αGヘスペリジン・林原社・酵素糖転移）で吸収率3-4倍向上（Yamada 2006 J Nutr Sci Vitaminol）、Glico Hesperidin 等の機能性表示食品。\n\nケルセチンも原型では吸収率低・Quercefit®（Indena社・ホスホリポソーム製剤）or Mirica® Quercetin等の特殊製剤で吸収率20倍向上（Riva 2019 Eur J Drug Metab Pharmacokinet）、月¥1,500-4,500。' },
    { q: '併用注意は？降圧薬・抗凝固薬は？', a: 'ヘスペリジンは🚨降圧薬で血圧低下増強の可能性monitor（Salden 2016血圧改善報告から）、🚨カルシウム拮抗薬（CYP3A4阻害でグレープフルーツ類似作用の理論的可能性）、稀に消化器症状。\n\nケルセチンは🚨抗凝固薬・抗血小板薬で出血傾向の可能性、🚨CYP3A4阻害でシクロスポリン・タクロリムス・カルバマゼピン等の薬物動態変動、🚨化学療法中はcaution、稀に頭痛。\n\n両者妊娠中・授乳中は標準的食事範囲内で安全。' },
    { q: '効果が出るまでと評価は？', a: '4-12週で評価（ヘスペリジン Morand 2011 4週・Salden 2016 6週・ケルセチン Edwards 2007 J Nutr 6-12週）、累積効果型。\n\n評価指標は血圧・血管内皮機能（FMD・専門検査）・脂質パネル・アレルギー症状（ケルセチンの場合）・主観的冷え・むくみ・抗酸化指標。\n\n12週で効果限定的なら用量増量・併用追加（VC+VE+ω3+α-リポ酸+CoQ10）・🚨重度心血管疾患・重度アレルギーは内科・アレルギー科の領域。' },
  ],
  'omega3-vs-coq10': [
    { q: 'オメガ3とCoQ10の違いは？', a: '機序が完全に異なる補完関係です。\n\nオメガ3（EPA+DHA 1-2g/日・rTG形態）は細胞膜流動性・抗炎症・心血管予防（REDUCE-IT 2019 NEJM RCT n=8,179 EPA高純度4g/日で心血管25%減・Mozaffarian 2011 Circ Heart Fail メタ）。\n\nCoQ10（100-300mg/日・ユビキノール推奨）はミトコンドリア電子伝達系の電子運搬体でATP産生・抗酸化（Mortensen 2014 Q-SYMBIO RCT n=420で慢性心不全イベント減・Caso 2007 Am J Cardiolでスタチン誘発筋痛軽減）。' },
    { q: '心臓ケア・スタチン服用者での使い方は？', a: '【心血管予防・脳・抗炎症】＝オメガ3主軸（REDUCE-IT・Mozaffarian 2011）+地中海食+運動+禁煙。\n\n【心不全・スタチン服用者・40代以降のATP低下】＝CoQ10主軸（Mortensen 2014・Caso 2007）+ユビキノール優位（40代以降の吸収率優位・Hosoi 2008）。\n\n両者経路独立で併用OKで王道の心臓ケアスタック、🚨心不全・狭心症・心筋梗塞既往は循環器内科の領域でサプリは補助。' },
    { q: '用量・形態・規格化原料は？', a: 'オメガ3はEPA+DHA合計1-2g/日（心血管予防）、rTG形態（再エステル化トリグリセリド）が吸収率優位（Dyerberg 2010 Prostaglandins Leukot Essent Fatty Acids）、IFOS 5-star認証品が品質保証、Nordic Naturals Ultimate Omega 2X等、月¥2,500-5,000。\n\nCoQ10はユビキノール（還元型・Kaneka QH™規格化原料）が40代以降推奨、ユビキノン（酸化型・コスパ良）でも可、月¥1,500-4,500、Jarrow Formulas Ubiquinol QH-Absorb等。' },
    { q: '併用注意は？抗凝固薬は？', a: 'オメガ3は🚨抗凝固薬・抗血小板薬（ワルファリン・DOAC・アスピリン・クロピドグレル）で出血傾向増強の可能性、🚨3g/日超は出血傾向（FDA 2000 GRAS）、手術前1-2週間中止検討、魚アレルギーは藻油切替、甲殻類アレルギーはクリルオイル回避。\n\nCoQ10は🚨ワルファリン併用でINR低下傾向（Heck 2000）でモニタリング、降圧薬で血圧低下増強、化学療法/PARP阻害薬/がん既往はPMC10177531動物試験データで腫瘍学会推奨医師相談、稀に消化器症状。' },
    { q: '効果が出るまでと評価は？', a: '【オメガ3】4-12週で評価（REDUCE-IT 5年介入・Mozaffarian 2011メタ）、累積効果型、評価指標はEPA/AA比（専門検査）・TG・LDL/HDL/Non-HDL・hs-CRP・血圧・主観的疲労感。\n\n【CoQ10】4-12週で評価（Mortensen 2014 2年・Caso 2007 30日・Žmitek 2017 12週）、累積効果型、評価指標は心不全症状（NYHA分類・BNP）・主観的疲労感・運動耐容能・スタチン誘発筋痛。\n\n12週で効果限定的なら用量増量・併用追加（マグネシウム+NR+α-リポ酸+食事・運動）・🚨重度心血管疾患は循環器内科の領域。' },
  ],
  'probiotics-vs-l-rhamnosus-gg': [
    { q: 'マルチ株プロバイオティクスとLGG単独株の違いは？', a: 'プロバイオティクスは「株単位」で論文蓄積を評価する原則がある（McFarland 2015 Front Med）。\n\nL. rhamnosus GG単独株（ATCC 53103・Culturelle®・10-20億CFU/日）は小児急性下痢・抗生剤関連下痢の最強エビデンス（Hojsak 2010 Cochrane review・WHO/ESPGHANガイドライン推奨）。\n\nマルチ株（複数株配合10-100億CFU）は腸内多様性育成の理論的優位だが、エビデンスは株固有のものをまとめて評価できない問題があり、製品ごとに別評価が必要。' },
    { q: '使い分けは？特定疾患か日常か？', a: '【特定疾患の補助（小児急性下痢/IBS/AAD/CDI予防）】＝株指定品主軸（LGG/S. boulardii/VSL#3®/Visbiome®等の論文蓄積品）。\n\n【日常的腸内多様性・健康維持】＝マルチ株+食事ベース（発酵食品・ヨーグルト・キムチ・味噌・納豆）+食物繊維（イヌリン・サイリウム・RS）が現実的。\n\n「腸が綺麗になる」「便秘が治る」「免疫力UP」断定は薬機法/景表法NG、🚨重症下痢・血便・体重減少は消化器内科の領域。' },
    { q: '用量・形態・株表示は？', a: 'LGG単独は10-20億CFU/日（Culturelle® Digestive Health等が論文用量再現の規格化品・ATCC 53103株明示）、月¥1,500-3,500。\n\nマルチ株は製品ごとに株+CFU表示で評価、🚨「乳酸菌配合」「ビフィズス菌配合」訴求のみで株名不明品は効果不確実、Jarrow Formulas Jarro-Dophilus EPS / Garden of Life Primal Defense等の株明示品が王道。\n\n摂取タイミングは食事と同時（胃酸通過対策）、抗生剤併用時は2-4時間ずらす。' },
    { q: '併用注意は？免疫不全は？', a: 'LGG/マルチ株共通＝🚨免疫不全（HIV/AIDS・化学療法中・移植後・中心静脈カテーテル留置・敗血症ハイリスク）caution（菌血症の症例報告・Salminen 2002）、🚨重症膵炎では PROBIOTICA試験 Lancet 2008でLactobacillusスタックが死亡率上昇報告で禁忌寄り、抗生剤と2-4時間ずらす（生菌のため）、稀に消化器症状（腹部膨満・ガス）。\n\nマルチ株は株ごとの相互作用・腸内環境への影響が不明な部分があり、特定疾患の補助は株指定品が現実的。\n\n妊娠中・授乳中は食事ベース安全レイヤー。' },
    { q: '効果が出るまでと評価は？', a: '【小児急性下痢】摂取24-48時間で症状改善（Hojsak 2010で平均1日短縮）。\n\n【抗生剤関連下痢予防】抗生剤開始と同時開始→終了後2週間継続。\n\n【IBS/日常的腸内環境】4-12週で評価、評価指標はIBS-SSS・便回数・性状・腹部膨満・ガス・主観的腹部不快感。\n\n12週で効果限定的なら株切替（LGG↔S. boulardii↔Visbiome®）・🚨消化器内科の領域（IBD/SIBO/セリアック病/慢性膵炎鑑別）・食事軸（FODMAP・低乳製品）。' },
  ],
  'akkermansia-vs-s-boulardii': [
    { q: 'AkkermansiaとS. boulardiiの違いは？', a: '機序と適応が異なる補完関係。\n\nAkkermansia muciniphila（パスツール化死菌1×10^10/日・MucinHealth等）はメタボ・耐糖能・腸バリアでヒトRCTが進展（Depommier 2019 Nat Med RCT n=32で肥満インスリン抵抗性のメタボ指標改善）、次世代プロバイオ標的菌。\n\nS. boulardii（CNCM I-745株・500mg/日・Florastor®）は酵母系で抗生剤の影響を受けない独自利点、AAD/CDI予防（McFarland 2010メタ・Szajewska 2015 CDI再発リスク減）。' },
    { q: 'メタボ・抗生剤併用での使い分けは？', a: '【メタボ・耐糖能・脂肪肝・腸バリア低下】＝Akkermansia主軸（Depommier 2019・パスツール化死菌の方が生菌より安全プロファイル良好）+食事+運動。\n\n【抗生剤併用・CDI予防・小児/旅行者下痢】＝S. boulardii主軸（McFarland 2010・酵母で抗生剤非影響）。\n\n両者経路独立で併用OK、🚨日本市場でのAkkermansia規格化品入手は限定的（個人輸入主体）。' },
    { q: '用量・形態・規格化原料は？', a: 'Akkermansiaはパスツール化死菌1×10^10/日が論文用量、MucinHealth™（Pendulum Therapeutics社・USA）/Daisy Health Akkermansia / Vitastem Akkermansia muciniphila Postbiotic等、月¥10,000-15,000、🚨日本入手限定。\n\nS. boulardiiはCNCM I-745株（Florastor® / Biocodex社特許株）が論文用量再現の規格化原料、Florastor / Jarrow Formulas Saccharomyces Boulardii + MOS等、月¥2,000-4,000。\n\n戦略の選択はコスパ→S. boulardii・研究最前線→Akkermansia。' },
    { q: '併用注意は？免疫不全・抗真菌薬は？', a: 'Akkermansiaは🚨パスツール化死菌で安全プロファイル良好（生菌より安全）、🚨免疫不全はcaution、抗生剤併用時は影響限定的（死菌のため）、稀に消化器症状。\n\nS. boulardiiは🚨免疫不全（HIV/AIDS・化学療法中・移植後・中心静脈カテーテル留置・重症患者）caution（酵母菌血症の症例報告・Munoz 2005）、🚨抗真菌薬（ナイスタチン・フルコナゾール・ケトコナゾール）併用で効果減弱、🚨重症膵炎caution。\n\n両者妊娠中・授乳中データ限定で産科医相談下。' },
    { q: '効果が出るまでと評価は？', a: '【Akkermansia】4-12週で評価（Depommier 2019 3ヶ月）、累積効果型、評価指標は腸内細菌叢検査（マイキンソー・サイキンソーでAkkermansia%測定）・インスリン感受性（HOMA-IR・空腹時血糖・HbA1c）・体重・体脂肪率・脂質パネル・hs-CRP。\n\n【S. boulardii】抗生剤関連下痢は同時開始→終了後2週間継続、CDI予防は症状改善まで、IBS-Dは4-8週で評価。\n\n効果限定的なら🚨消化器内科・内分泌内科の領域（メタボ・糖尿病・IBS鑑別）。' },
  ],
  'butyrate-vs-akkermansia': [
    { q: '酪酸とAkkermansiaの違いは？', a: '両者は腸内環境の代表選手で相互関係がある補完関係。\n\n酪酸（経口500-1,500mg/日・腸溶コーティング製剤）は短鎖脂肪酸の代表で大腸上皮細胞主要エネルギー源・抗炎症（HDAC阻害経由）・腸バリア強化（Canani 2011 World J Gastroenterol review）。\n\nAkkermansia muciniphila（パスツール化死菌1×10^10/日）は粘液層常在菌でメタボ・耐糖能・腸バリア（Depommier 2019 Nat Med RCT）、相互関係としてAkkermansia自身も酪酸産生に寄与する菌叢循環あり。' },
    { q: 'IBD・メタボ・腸バリア低下での使い分けは？', a: '【IBD（潰瘍性大腸炎）寛解維持・大腸炎症の即時補助】＝酪酸経口（腸溶製剤）主軸（Canani 2011 review）+消化器内科の領域での5-ASA/ステロイド/生物学的製剤併用。\n\n【メタボ・耐糖能・腸バリア低下】＝Akkermansia主軸（Depommier 2019）+食事+運動。\n\n両者+食物繊維（イヌリン・サイリウム・RS）25g/日+発酵食品（味噌・キムチ・納豆・ヨーグルト）が王道スタック。' },
    { q: '用量・形態・規格化原料は？', a: '酪酸は500-1,500mg/日、🚨腸溶コーティング・徐放性製剤が大腸到達の前提（通常剤型は胃・小腸で吸収され大腸到達せず）、ButyraGen®/ButyrEn®/Sodium Butyrate enteric-coated規格化原料、BodyBio Sodium Butyrate / Healthy Origins Sodium Butyrate等、月¥2,500-5,000。\n\nAkkermansiaはパスツール化死菌1×10^10/日（MucinHealth™等）、月¥10,000-15,000、🚨日本入手限定。\n\nコスパは食事ベース＞酪酸＞Akkermansiaの順。' },
    { q: '併用注意は？免疫不全・IBD活動期は？', a: '酪酸は🚨腸溶コーティング非製剤は大腸到達せず無効（製剤選択重要）、🚨IBD活動期は消化器内科判断下（補助レイヤーだが医師判断）、稀に消化器症状（腹部膨満・ガス・下痢）で少量から開始、便臭変化報告。\n\nAkkermansiaは🚨パスツール化死菌で安全プロファイル良好、🚨免疫不全はcaution、抗生剤併用時は影響限定的、稀に消化器症状。\n\n両者妊娠中・授乳中データ限定で産科医相談下。' },
    { q: '効果が出るまでと評価は？', a: '4-12週で評価（酪酸 Canani 2011 review・Akkermansia Depommier 2019 3ヶ月）、累積効果型。\n\n評価指標は便回数・性状（Bristol Stool Scale）・腸内環境主観（腹部膨満・ガス）・IBD症状（活動期は医師判断）・インスリン感受性（HOMA-IR）・脂質パネル・腸内細菌叢検査（マイキンソー・サイキンソー）。\n\n12週で効果限定的なら用量増量・併用追加（食物繊維25g/日+発酵食品+S. boulardii）・🚨消化器内科の領域（IBD/SIBO/慢性炎症性疾患）。' },
  ],
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
