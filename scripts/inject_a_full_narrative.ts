/**
 * Aランク 残26サプリ + Aランク topical 18 = 44成分の1位商品に
 * benefitHeading / pros / cons を投入。
 */
import * as fs from 'node:fs'
import * as path from 'node:path'

const dataPath = path.resolve(__dirname, '../src/lib/data.ts')
let src = fs.readFileSync(dataPath, 'utf-8')

interface Inject {
  url: string
  benefitHeading: string
  pros: string[]
  cons: string[]
}

const injects: Inject[] = [
  // ========== Supplements (26) ==========
  {
    url: 'https://jp.iherb.com/pr/california-gold-nutrition-astaxanthin-astalif-pure-icelandic-12-mg-120-veggie-softgels/71684',
    benefitHeading: 'アイスランド産Astalif純粋アスタキサンチン12mg・1ソフトジェルで研究使用量上限',
    pros: [
      'アイスランド産Haematococcus pluvialis由来・Astalif特許品質',
      '1ソフトジェル12mgで研究使用量（4-12mg/日）の上限をカバー',
      '120粒で約4ヶ月分（¥700/月）と長期コスパ良好',
      '脂溶性のためソフトジェル形状で吸収率に配慮',
    ],
    cons: [
      '抗凝固薬（ワルファリン）との併用で出血傾向増の可能性',
      '効果実感まで4-8週の継続が必要',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/life-extension-mega-green-tea-extract-725-mg-decaffeinated-100-vegetarian-capsules/14099',
    benefitHeading: '1カプセル725mg EGCG・カフェインレスで夜間も飲める研究使用量レンジ最上位',
    pros: [
      '1カプセル725mg EGCGで研究使用量（400-800mg/日）の上限',
      'カフェインレス処方で夜間摂取も可能',
      'Life Extension GMP認証・第三者検査公開',
      '100粒で約3.3ヶ月分（¥960/月）',
    ],
    cons: [
      '高用量（1200mg超）で肝機能異常の症例報告あり',
      '鉄剤・抗凝固薬との併用に注意',
      '空腹時摂取は胃の不快感が出やすい',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://jp.iherb.com/pr/now-foods-phosphatidyl-serine-120-veg-capsules/745',
    benefitHeading: '認知機能RCT用量の下限100mgを1カプセルで・記憶・集中力の研究使用域',
    pros: [
      '1カプセル100mgで研究使用量（100-300mg/日）の下限を満たす',
      '大豆レシチン由来PS・脂質と一緒に摂取で吸収率向上',
      'NOW Foods 自社GMP・第三者検査済み',
      '120粒で約4ヶ月分（¥950/月）',
    ],
    cons: [
      '抗コリン薬・抗凝固薬との相互作用報告あり',
      '効果実感まで12週の継続が必要',
      '大豆アレルギーの方は使用前に確認',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/life-extension-ginkgo-biloba-certified-extract-120-mg-365-vegetarian-capsules/62310',
    benefitHeading: 'EGb761標準化エキス120mg・認知症RCTで使われた規格を1カプセルで',
    pros: [
      'EGb761は欧州で医薬品認可されているスタンダード規格',
      '1カプセル120mgで研究使用量（120-240mg/日）の下限',
      '365粒で約12ヶ月分・¥310/月と最安レベル',
      'Life Extension GMP・第三者検査済み',
    ],
    cons: [
      '抗凝固薬（ワルファリン・アスピリン）と併用で出血リスク増',
      '手術前2週間は休薬が推奨される',
      '効果実感まで6-12週の継続が必要',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/jarrow-formulas-selenium-200-mcg-90-capsules/1155',
    benefitHeading: 'SelenoExcell有機セレン200mcg・甲状腺・抗酸化RCTで使用される標準形態',
    pros: [
      'SelenoExcellは有機セレン（セレノメチオニン）で吸収率と安全域が高い',
      '1カプセル200mcgで研究使用量上限（55-200mcg/日）',
      'Jarrow Formulas GMP・第三者検査済み',
      '90粒で約3ヶ月分（¥400/月）',
    ],
    cons: [
      '過剰摂取（400mcg超）で爪・髪の異常・神経症状リスク',
      '甲状腺機能亢進症の方は医師相談必須',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/life-extension-lutein-plus-20-mg-60-softgels/87041',
    benefitHeading: 'ルテイン20mg + ゼアキサンチン配合・AREDS2研究準拠の眼の黄斑保護用量',
    pros: [
      'AREDS2研究で使用された加齢黄斑変性RCTの主要成分',
      '1ソフトジェル20mgで研究使用量上限（10-20mg/日）',
      'ゼアキサンチン併配で網膜中心部への蓄積効率向上',
      'Life Extension GMP・第三者検査済み',
    ],
    cons: [
      '価格は¥1,100/月とやや高め',
      '効果実感まで6-12ヶ月の継続が必要',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/solgar-calcium-citrate-with-vitamin-d3-240-tablets/4467',
    benefitHeading: 'クエン酸Ca + ビタミンD3配合・骨密度RCT準拠で胃酸不要の吸収型',
    pros: [
      'クエン酸Caは炭酸Caより吸収率が高く胃酸不要',
      'ビタミンD3併配でCa吸収・骨形成の両輪をカバー',
      '2錠で500mgの研究使用量下限を満たす',
      'Solgar 1947年創業・第三者検査公開',
    ],
    cons: [
      '高用量摂取（1500mg超）で結石・心血管リスク報告あり',
      '鉄剤・甲状腺薬・テトラサイクリンと2時間以上ずらす',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/jarrow-formulas-methyl-b-12-1000-mcg-100-lozenges/4212',
    benefitHeading: '活性型メチルコバラミン1000mcg・舌下錠で胃酸障害があっても吸収可能',
    pros: [
      'メチルコバラミンは生体内で即利用できる活性型B12',
      '舌下錠で胃酸を介さず口腔粘膜から直接吸収',
      '1錠1000mcgで研究使用量上限（500-1000mcg/日）',
      '100錠で約3.3ヶ月分（¥540/月）',
    ],
    cons: [
      'メトホルミン・H2ブロッカー服用中の方は欠乏チェック推奨',
      '葉酸との併用が認知症予防には推奨される',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/thorne-pyridoxal-5-phosphate-180-capsules/18472',
    benefitHeading: "活性型P-5-P（ピリドキサール5'-リン酸）・MTHFR遺伝子多型でも代謝可能",
    pros: [
      'P-5-Pは肝臓で変換不要の活性型B6・MTHFR多型でも吸収可',
      '1カプセル50mgで研究使用量上限（10-50mg/日）',
      'Thorne NSF認証・原料純度公開で信頼性最高ランク',
      '180粒で約6ヶ月分（¥530/月）',
    ],
    cons: [
      '高用量長期摂取で末梢神経障害（しびれ）報告あり',
      '抗てんかん薬・パーキンソン病薬と相互作用',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/now-foods-l-citrulline-pure-powder-4-oz-113-g/12227',
    benefitHeading: '純度99%以上のL-シトルリン粉末・血流・運動パフォーマンスRCT用量',
    pros: [
      'L-シトルリンはL-アルギニンより血中濃度が長く維持される',
      '1食3gで研究使用量下限（3-8g/日）を満たす',
      '粉末タイプで用量を細かく調整可能',
      'NOW Foods GMP・第三者検査済み',
    ],
    cons: [
      'ED治療薬（PDE5阻害薬）との併用で過度な血圧低下リスク',
      '113g粉末で37日分のため大量必要時はリピート購入',
      '粉末特有の酸味があり飲みにくい場合あり',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/now-foods-inulin-pure-powder-227-g/659',
    benefitHeading: '水溶性食物繊維イヌリン・腸内ビフィズス菌RCTで使われる5g/食用量',
    pros: [
      'イヌリンは腸内ビフィズス菌のエサとなる短鎖脂肪酸産生プレバイオティクス',
      '1食5gで研究使用量下限（5-10g/日）',
      '無味で飲料・スープに溶けやすい粉末',
      'NOW Foods GMP・第三者検査済み',
    ],
    cons: [
      '飲み始めにガス・腹部膨満感が出やすい（数日で軽快）',
      'フルクタン不耐症（FODMAP）の方は症状悪化の可能性',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/now-foods-bacopa-extract-450-mg-90-veg-capsules/64543',
    benefitHeading: 'バコサイド20%以上の標準化エキス450mg・記憶力RCTで使われる用量',
    pros: [
      'バコサイド類はインド伝承医学で記憶力改善に使われる活性成分',
      '1カプセル450mgで研究使用量上限（300-450mg/日）',
      '食物と一緒に摂取することで吸収率が向上',
      'NOW Foods 自社GMP・第三者検査済み',
    ],
    cons: [
      '甲状腺薬・抗痙攣薬との併用注意',
      '効果実感まで12週の継続が必要',
      '飲み始めに胃腸症状（嘔気・下痢）が出やすい',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/solgar-panax-ginseng-root-extract-250-mg-60-veggie-caps/4559',
    benefitHeading: 'G115標準化エキス250mg・疲労・認知機能RCTで使われた特許規格',
    pros: [
      'G115は最も研究使用実績が多い高麗人参標準化エキス',
      '1カプセル250mgで研究使用量上限（200-400mg/日）',
      'ジンセノサイド4%以上を保証する規格化',
      'Solgar 1947年創業・第三者検査公開',
    ],
    cons: [
      '降圧薬・糖尿病薬・抗凝固薬との相互作用報告',
      '高血圧・自己免疫疾患の方は医師相談必須',
      '不眠・頭痛・血圧上昇が出ることがある',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/now-foods-niacin-flush-free-500-mg-180-veg-capsules/656',
    benefitHeading: 'フラッシュフリー処方（イノシトールヘキサニコチネイト型）500mg・顔面紅潮を回避',
    pros: [
      'イノシトールヘキサニコチネイト型でフラッシュ反応（紅潮）を回避',
      '1カプセル500mgで脂質改善RCT使用域',
      '180粒で約6ヶ月分（¥370/月）',
      'NOW Foods GMP・第三者検査済み',
    ],
    cons: [
      '通常型ナイアシンより肝負荷リスクが高い報告あり',
      '高用量長期で肝機能異常・血糖上昇の可能性',
      'スタチンとの併用で筋肉症状リスク増',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://jp.iherb.com/pr/now-foods-magnesium-glycinate-180-tablets-100-mg-per-tablet/88819',
    benefitHeading: 'グリシン酸キレート型100mg×180錠・吸収率優位の睡眠・PMS RCT用量',
    pros: [
      'グリシン酸キレート型は酸化Mgより吸収率が高い',
      '100mg×2錠で研究使用量下限（200-400mg/日）を満たす',
      'NOW Foods GMP・第三者検査済み',
      '180錠で約3ヶ月分（¥830/月）',
    ],
    cons: [
      '腎機能障害のある方は事前に医師相談',
      '抗生物質・甲状腺薬と2時間以上ずらして服用',
      '高用量で下痢・軟便が出やすい',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/now-foods-hmb-500-mg-120-veg-capsules/759',
    benefitHeading: 'ロイシン代謝産物HMB・筋分解抑制RCT用量1500mg/日を3カプセル分割で',
    pros: [
      'HMBは筋肉分解抑制でメタ解析の使用実績あり',
      '500mg×3=1500mgの研究使用量下限を満たす',
      '高齢者の筋力維持・サルコペニア予防の臨床試験で使用',
      'NOW Foods GMP・第三者検査済み',
    ],
    cons: [
      '1日3回の分割摂取が推奨される（頻度が課題）',
      '効果実感まで8-12週の継続が必要',
      '価格は¥3,380/月とやや高め',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/jarrow-formulas-inositol-powder-600-g/1443',
    benefitHeading: 'PCOS・不安症RCT用量4g/日を粉末1食で・600g大容量で約5ヶ月分',
    pros: [
      'ミオイノシトールはPCOS・不安症メタ解析で使用実績あり',
      '1食4gで研究使用量上限（2-4g/日）',
      '600g大容量で約5ヶ月分（¥640/月）',
      'Jarrow Formulas GMP・第三者検査済み',
    ],
    cons: [
      '高用量で下痢・腹部膨満感が出やすい',
      'リチウム服用中の方は併用注意',
      '粉末特有の溶け残り感があり飲みにくい場合あり',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/jarrow-formulas-lutein-20-mg-90-softgels/1447',
    benefitHeading: 'ルテイン20mg + ゼアキサンチン1mg・黄斑色素沈着RCT準拠の比率20:1',
    pros: [
      'ルテイン:ゼアキサンチン20:1は天然食事比に近い理想配合',
      'AREDS2研究準拠の用量レンジ（ゼアキサンチン2mg/日）',
      '90粒で約3ヶ月分（¥930/月）',
      'Jarrow Formulas GMP・第三者検査済み',
    ],
    cons: [
      '喫煙者はベータカロテン併用でがんリスク増の懸念',
      '効果実感まで6-12ヶ月の継続が必要',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/now-foods-beta-glucan-with-igg-250-mg-60-veg-capsules/44226',
    benefitHeading: '酵母由来βグルカン250mg + 免疫グロブリンIgG・免疫サポートRCT用量下限',
    pros: [
      '酵母由来βグルカンは免疫細胞活性化のメタ解析で使用実績あり',
      '1カプセル250mgで研究使用量下限（250-500mg/日）',
      '牛コロストラム由来IgGで上気道感染対策の補助成分配合',
      'NOW Foods GMP・第三者検査済み',
    ],
    cons: [
      '自己免疫疾患のある方は事前に医師相談',
      '免疫抑制剤との併用で薬効が低下する可能性',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://jp.iherb.com/pr/now-foods-l-tryptophan-500-mg-120-veg-capsules/13859',
    benefitHeading: 'セロトニン前駆体L-トリプトファン500mg・気分・睡眠RCTで使われる用量下限',
    pros: [
      'L-トリプトファンはセロトニン・メラトニン合成の前駆体',
      '1カプセル500mgで研究使用量下限（500-2000mg/日）',
      '5-HTPと違い吸収競合が起きにくい天然形',
      'NOW Foods GMP・第三者検査済み',
    ],
    cons: [
      'SSRI・MAO阻害薬との併用でセロトニン症候群リスク',
      '妊娠・授乳中・自己免疫疾患の方は不可',
      '単体大量摂取は他のアミノ酸吸収を阻害する可能性',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/now-foods-boswellia-extract-500-mg-90-softgels/57586',
    benefitHeading: 'ボスウェル酸65%標準化エキス500mg・関節炎RCTで使われる用量上限',
    pros: [
      'ボスウェル酸（AKBA）は5-LOX阻害で抗炎症作用が報告される',
      '1カプセル500mgで研究使用量上限（300-500mg/日）',
      '65%ボスウェル酸標準化で品質保証',
      'NOW Foods GMP認証',
    ],
    cons: [
      '抗凝固薬・NSAIDsと併用で出血リスク増',
      '妊娠中は禁忌（流産誘発の可能性）',
      '効果実感まで4-8週の継続が必要',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/now-foods-l-carnitine-500-mg-60-veg-capsules/770',
    benefitHeading: '脂肪酸燃焼補酵素L-カルニチン500mg・運動パフォーマンスRCT用量下限',
    pros: [
      'L-カルニチンは長鎖脂肪酸のミトコンドリア輸送に必須',
      '1カプセル500mgで研究使用量下限（500-3000mg/日）',
      '食事のタンパク質と一緒に摂取で吸収率向上',
      'NOW Foods GMP・第三者検査済み',
    ],
    cons: [
      '甲状腺機能低下症の方は薬効に影響する可能性',
      '高用量で魚臭体臭・下痢が出やすい',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/now-foods-uc-ii-joint-health-undenatured-type-ii-collagen-40-mg-120-veg-capsules/46571',
    benefitHeading: '非変性UC-II 40mg・関節炎メタ解析用量・グルコサミンより少量で効くRCT',
    pros: [
      'UC-IIは非変性Ⅱ型コラーゲンでメタ解析使用実績の多い特許規格',
      '1カプセル40mgで研究使用量下限（40-80mg/日）',
      'グルコサミン1500mgよりも少量で関節改善RCT結果',
      'NOW Foods GMP認証',
    ],
    cons: [
      '鶏由来のため鶏肉アレルギーの方は使用不可',
      '効果実感まで12-24週の継続が必要',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://www.amazon.co.jp/dp/B0013OX7XY?tag=scibase-22',
    benefitHeading: '水溶性・脂溶性両方で働く万能抗酸化αリポ酸300mg・末梢神経RCT用量下限',
    pros: [
      'αリポ酸は細胞内外の両方で抗酸化として機能する稀な成分',
      '1カプセル300mgで研究使用量下限（200-600mg/日）',
      '糖尿病性末梢神経障害RCTで使用実績あり',
      'Jarrow Formulas GMP認証',
    ],
    cons: [
      '糖尿病薬と併用で低血糖リスク',
      '甲状腺ホルモン薬の吸収を阻害する可能性',
      '空腹時摂取が推奨されるが胃の不快感が出やすい',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/swanson-phytoceramides-advanced-formula-30-mg-30-veggie-caps/118634',
    benefitHeading: '小麦由来グルコシルセラミド30mg・経口摂取で皮膚バリア改善RCT用量上限',
    pros: [
      '小麦胚芽由来グルコシルセラミドは皮膚水分量改善RCT実績あり',
      '1カプセル30mgで研究使用量上限（6-30mg/日）',
      '経口摂取で全身の皮膚に作用するため部位別塗布不要',
      '30粒で約1ヶ月分（¥2,200/月）',
    ],
    cons: [
      '小麦アレルギー・グルテン過敏症の方は使用不可',
      '効果実感まで4-8週の継続が必要',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/naturesplus-bioperine-10-90-capsules-10-mg-per-capsule/79230',
    benefitHeading: 'BioPerine®黒胡椒抽出物・他成分の吸収率を最大2000%向上させる吸収補助剤',
    pros: [
      'BioPerine®はSabinsa社特許取得の黒胡椒抽出物（ピペリン95%）',
      'クルクミン・CoQ10等と併用で吸収率2-20倍向上の報告',
      '1カプセル10mgで研究使用量レンジ中央値（5-20mg/日）',
      '90粒で約3ヶ月分（¥600/月）',
    ],
    cons: [
      '薬物代謝（CYP3A4）を阻害するため服薬中は医師相談',
      '単体での明確な薬理効果はなく必ず併用前提',
      '胃の不快感・下痢が出ることがある',
      '海外発送で到着まで7-14日',
    ],
  },

  // ========== Topicals A-rank (18) ==========
  {
    url: 'https://www.amazon.co.jp/dp/B07L6BYVV3?tag=scibase-22',
    benefitHeading: 'ナイアシンアミド10%濃度・メラニン産生抑制とバリア改善のRCT使用域上限',
    pros: [
      '10%濃度はナイアシンアミドRCTの研究使用域上限',
      '亜鉛1%併配で皮脂・毛穴目立ちへの相乗効果',
      'The Ordinaryは透明な処方公開ブランド・薬機法準拠',
      '¥1,500前後の入手しやすさ・全肌タイプ対応',
    ],
    cons: [
      '高濃度のため敏感肌は最初2-3日おきから慣らす必要あり',
      'ビタミンC（純粋アスコルビン酸）と同時使用で効果減少報告',
      '効果実感まで4-8週の継続が必要',
    ],
  },
  {
    url: 'https://www.amazon.co.jp/dp/B07XJ7XWLW?tag=scibase-22',
    benefitHeading: 'CeraVe レチノールセラム・セラミド3種配合で刺激緩和・夜のみのスタンダード処方',
    pros: [
      'セラミド3種配合でレチノール特有のバリア破壊を緩和',
      'カプセル化技術で皮膚浸透時にゆっくり放出する低刺激処方',
      '米国皮膚科医推奨ブランド・敏感肌でも使いやすい',
      '30mlで約3-4ヶ月分のコスパ良好',
    ],
    cons: [
      '妊娠・授乳中は禁忌（胎児リスクあり）',
      '朝の使用は光感受性のためNG・夜のみ',
      '紫外線対策（SPF）の併用必須',
      '効果実感まで12-24週の継続が必要',
    ],
  },
  {
    url: 'https://www.amazon.co.jp/dp/B0DY118QZ4?tag=scibase-22',
    benefitHeading: 'レチナール（レチンアルデヒド）500ppm・レチノールの11倍変換効率の上位ビタミンA誘導体',
    pros: [
      'レチナールはレチノールより1段階手前で変換効率が高い',
      '500ppm（0.05%）は新規ユーザー向けの中濃度設定',
      '国内メーカー（Cosmedon）製で日本人肌向け処方',
      'レチノールよりシワ・色素沈着の改善RCTで上位',
    ],
    cons: [
      '妊娠・授乳中は禁忌',
      '朝の使用は光感受性のためNG・夜のみ',
      '開封後は冷蔵保存推奨（光・酸素で失活しやすい）',
      '価格はレチノールより高めの傾向',
    ],
  },
  {
    url: 'https://www.amazon.co.jp/-/en/Ordinary-C-Suspension-Sphere-Suspension-Hyaluronic/dp/B07S9P1R3C?tag=scibase-22',
    benefitHeading: '純粋L-アスコルビン酸23%・コラーゲン合成促進・美白RCT使用上限濃度',
    pros: [
      'L-アスコルビン酸23%はビタミンC外用RCTで効果が確認される高濃度域',
      'ヒアルロン酸スフィア2%併配で乾燥・刺激を緩和',
      'The Ordinary 透明処方公開ブランド',
      '¥1,500前後の入手しやすさ',
    ],
    cons: [
      '純粋ビタミンCは酸化が早く開封後3-6ヶ月以内に使い切り',
      '敏感肌・薄い皮膚はピリつき・赤みが出やすい',
      'ナイアシンアミドと同時使用で効果減少の報告',
      '朝の使用後はSPF併用必須',
    ],
  },
  {
    url: 'https://www.amazon.co.jp/CeraVe-%E3%83%A2%E3%82%A4%E3%82%B9%E3%83%81%E3%83%A3%E3%83%A9%E3%82%A4%E3%82%B8%E3%83%B3%E3%82%B0%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%A0-Moisturizing-Cream-Moisturizer/dp/B07RRFGHWK?tag=scibase-22',
    benefitHeading: 'CeraVe モイスチャライジングクリーム・セラミド3種 + MVE技術で持続的バリア修復',
    pros: [
      'セラミド1・3・6-IIの3種配合で皮膚バリアの主要セラミドを補充',
      'MVE（Multivesicular Emulsion）技術で24時間持続的に放出',
      '米国皮膚科医推奨ブランド・乾燥・敏感肌RCT実績あり',
      '幅広い肌タイプに対応',
    ],
    cons: [
      'クリーム形状のため首・体には伸ばしにくいテクスチャー',
      '香料・着色料無添加だが好み分かれる油性感',
      '大容量で開封後は微生物コンタミに注意',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/prescriptskin-glycolic-acid-toner-6-fl-oz-177-ml/96981',
    benefitHeading: 'グリコール酸7% AHAトナー・角質ターンオーバーRCT使用域・夜のみ',
    pros: [
      'グリコール酸7%はAHAピーリングRCTで効果が確認される中濃度域',
      'pH3.5前後の酸性で角質剥離効果が機能する設計',
      '177ml大容量で約3-4ヶ月分のコスパ良好',
      '顔・首・デコルテに使用可',
    ],
    cons: [
      '光感受性のため朝使用後はSPF必須・夜のみ推奨',
      '敏感肌・赤ら顔は週1回から慣らす必要あり',
      'レチノール・ビタミンCとの同時使用で過剰刺激リスク',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://www.amazon.co.jp/dp/B0BTK278VB?tag=scibase-22',
    benefitHeading: "サリチル酸2% BHA・毛穴・ニキビRCT使用上限濃度・脂溶性で皮脂腺内部まで浸透",
    pros: [
      'サリチル酸2%は外用RCT使用上限濃度で効果と安全のバランス◎',
      '脂溶性のため皮脂腺内部まで浸透し毛穴詰まりを直接溶解',
      "Paula's Choice 透明処方ブランド・敏感肌対応の緩衝系",
      '118mlで約3-4ヶ月分のコスパ良好',
    ],
    cons: [
      '妊娠・授乳中は禁忌（胎児リスクあり）',
      'アスピリンアレルギーの方は禁忌（同系統成分）',
      '乾燥肌・冬季は使用頻度を週2-3回に減らす必要あり',
      '朝の使用後はSPF併用推奨',
    ],
  },
  {
    url: 'https://www.amazon.co.jp/dp/B0DCGDL4LZ?tag=scibase-22',
    benefitHeading: 'アゼライン酸15%・色素沈着・ニキビ・酒さの3軸RCTで効果確認の多機能美白成分',
    pros: [
      'アゼライン酸15%は外用RCTで色素沈着・酒さ改善の使用上限濃度',
      'ハイドロキノンと違い長期使用可・妊婦も使える低リスク成分',
      'ANUA はK-beauty 透明処方ブランド・敏感肌対応',
      '1本でメラニン抑制 + 抗炎症 + 抗菌の3役',
    ],
    cons: [
      '開始2-4週目に一時的な肌の赤み・ピリつきが出ることがある',
      '高濃度（医療用20%）よりは効果は穏やか',
      '効果実感まで12-16週の継続が必要',
    ],
  },
  {
    url: 'https://www.amazon.co.jp/dp/B09Q31N6TV?tag=scibase-22',
    benefitHeading: 'αアルブチン2%・ハイドロキノン代替の安全な美白成分・チロシナーゼ阻害RCT使用域',
    pros: [
      'αアルブチンはβアルブチンより約10倍メラニン抑制効果が高い',
      '2%濃度は外用RCTで色素沈着改善が確認される使用域',
      'ヒアルロン酸併配で保湿・刺激緩和',
      'ハイドロキノンの長期使用リスク（白斑等）を回避できる代替',
    ],
    cons: [
      '効果実感まで12-16週の継続が必要',
      '完成肝斑には効果が限定的',
      'ビタミンC・レチノールとの併用で効果増強だが刺激も増す',
    ],
  },
  {
    url: 'https://www.amazon.co.jp/dp/B07H3ZQ8R4?tag=scibase-22',
    benefitHeading: 'コウジ酸代替・ナイアシンアミド10% + 亜鉛1%の美白複合ケア処方',
    pros: [
      'コウジ酸は麹由来の伝統美白成分でチロシナーゼ阻害RCT実績',
      'ナイアシンアミド10%・亜鉛1%併配で複合的な色素抑制',
      'Cos De BAHA はK-beauty 透明処方・低価格帯',
      '30mlで約2ヶ月分のコスパ良好',
    ],
    cons: [
      'コウジ酸単独製品は日本国内では入手しにくい',
      '開始2週目に肌のピリつきが出ることがある',
      'ビタミンCと同時使用で効果減少の報告',
    ],
  },
  {
    url: 'https://www.amazon.co.jp/dp/B07ND57TWQ?tag=scibase-22',
    benefitHeading: 'トラネキサム酸配合・肝斑メーカーRCTで承認の医薬部外品美白美容液',
    pros: [
      'トラネキサム酸は肝斑メタ解析で内服・外用ともに使用実績あり',
      '肌美精（クラシエ）医薬部外品認定で薬機法準拠の表現',
      '30mlで約2ヶ月分・国内ドラッグストア入手可能',
      '国産処方で日本人肌特化',
    ],
    cons: [
      '肝斑以外のシミ（老人性・炎症後）には効果が限定的',
      '内服薬のトラネキサム酸との併用は医師相談',
      '効果実感まで12週の継続が必要',
    ],
  },
  {
    url: 'https://www.amazon.co.jp/dp/B0937GYRL1?tag=scibase-22',
    benefitHeading: '乳酸10% AHA・最も穏やかなピーリング成分・ヒアルロン酸併配で保湿',
    pros: [
      '乳酸はAHAの中で分子サイズが大きく刺激が少ない',
      '10%濃度は外用RCT使用域中央値・週2-3回の慣らし向き',
      'ヒアルロン酸併配でピーリング後の乾燥を緩和',
      'The Ordinary 透明処方ブランド',
    ],
    cons: [
      '朝使用後はSPF併用必須',
      '敏感肌・赤ら顔は週1回から慣らす必要あり',
      'レチノール・ビタミンCとの同時使用で過剰刺激リスク',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/solgar-vitamin-e-400-iu-with-mixed-tocopherols-100-softgels/4641',
    benefitHeading: '混合トコフェロール400IU・脂溶性抗酸化ビタミン・心血管RCT使用域中央値',
    pros: [
      '混合トコフェロール（α・β・γ・δ）型は単一α型より生理活性が広い',
      '1ソフトジェル400IUは研究使用量レンジ中央値（100-400IU/日）',
      'ω3とともに摂取で抗酸化相乗効果（メタ解析）',
      'Solgar GMP・第三者検査公開',
    ],
    cons: [
      '抗凝固薬（ワルファリン）と併用で出血リスク増',
      '高用量400IU超の長期摂取は前立腺がんリスク増の懸念',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://www.amazon.co.jp/dp/B00095W7D4?tag=scibase-22',
    benefitHeading: 'ビタミンC15% + E1% + フェルラ酸0.5%の特許処方・UV肌老化RCTで光防護効果確認',
    pros: [
      'SkinCeuticals C E Ferulic は皮膚科医監修の特許処方の代名詞',
      'フェルラ酸はビタミンC・Eの安定化と抗酸化力を倍増させる',
      'UV誘発光老化抑制のRCTで効果が確認された組み合わせ',
      '朝使用で1日中UV防護効果が持続',
    ],
    cons: [
      '価格は1本¥18,000前後とプレミアム最上位帯',
      '開封後は3ヶ月以内に使い切り推奨（酸化）',
      '純粋ビタミンCのため敏感肌・薄い皮膚はピリつきあり',
    ],
  },
  {
    url: 'https://www.amazon.co.jp/dp/B09CK7V4T6?tag=scibase-22',
    benefitHeading: 'アデノシン配合・日本承認のしわ改善有効成分・夜間集中ケア処方',
    pros: [
      'アデノシンは日本の医薬部外品で「しわ改善」承認の有効成分',
      '夜間の細胞修復タイミングに合わせたアンプル型処方',
      'MISSHA はK-beauty 売上トップクラスブランド',
      '50ml大容量で約2-3ヶ月分のコスパ良好',
    ],
    cons: [
      'アデノシン濃度が公開されていないため効果は処方依存',
      '効果実感まで8-12週の継続が必要',
      '香料配合のため香り苦手な方は注意',
    ],
  },
  {
    url: 'https://www.amazon.co.jp/dp/B0CSS3MC3J?tag=scibase-22',
    benefitHeading: 'パンテノール5%（B5+）配合・敏感肌バリア修復クリーム・皮膚科医監修',
    pros: [
      'パンテノールは皮膚でパントテン酸に変換され保湿・バリア修復',
      'La Roche-Posay は仏皮膚科医推奨ブランド・敏感肌RCT実績',
      '5%濃度（B5+）は外用RCT効果確認域',
      '顔・体・赤ちゃんの肌にも使える低刺激処方',
    ],
    cons: [
      'クリーム形状のため広範囲には伸ばしにくい',
      '香料無添加だがシリコン配合で好み分かれる',
      '重いテクスチャーのため脂性肌は不向き',
    ],
  },
  {
    url: 'https://www.iherb.com/pr/now-foods-pantothenic-acid-500-mg-250-veg-capsules/326',
    benefitHeading: 'パントテン酸500mg・副腎・コエンザイムA・ニキビ改善RCT用量下限',
    pros: [
      'パントテン酸はコエンザイムA合成に必須の水溶性ビタミン',
      '1カプセル500mgで研究使用量下限（500-2000mg/日）',
      'ニキビ改善RCTで皮脂分泌減少の報告あり',
      'NOW Foods GMP・第三者検査済み',
    ],
    cons: [
      '高用量（10g/日超）で下痢・胃腸障害リスク',
      '効果実感まで8-12週の継続が必要',
      '海外発送で到着まで7-14日',
    ],
  },
  {
    url: 'https://www.amazon.co.jp/dp/B0BQQG379H?tag=scibase-22',
    benefitHeading: 'マトリキシル®10% + ヒアルロン酸・コラーゲン産生シグナルペプチド配合のしわ改善RCT',
    pros: [
      'マトリキシル®（パルミトイルペンタペプチド）はしわ改善RCT複数実績',
      '10%濃度は外用RCTで効果が確認される使用域',
      'ヒアルロン酸併配で乾燥・小じわを総合ケア',
      'The Ordinary 透明処方・低価格帯',
    ],
    cons: [
      'ペプチドは高温・酸化に弱いため開封後早めに使い切り',
      '効果実感まで12-24週の継続が必要',
      '価格対効果はプレミアム製品に劣る傾向',
    ],
  },
]

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function findProductBlock(src: string, url: string): { start: number; end: number; text: string } | null {
  const urlEsc = escapeRegex(url)
  const m = new RegExp(`url:\\s*'${urlEsc}'`).exec(src)
  if (!m) return null
  let i = m.index
  while (i > 0 && src[i] !== '{') i--
  let depth = 0
  let j = i
  while (j < src.length) {
    if (src[j] === '{') depth++
    else if (src[j] === '}') {
      depth--
      if (depth === 0) return { start: i, end: j + 1, text: src.slice(i, j + 1) }
    }
    j++
  }
  return null
}

function formatStringList(items: string[], indent: string): string {
  const inner = items.map(s => `${indent}  '${s.replace(/'/g, "\\'")}',`).join('\n')
  return `[\n${inner}\n${indent}]`
}

function setOrInsertField(blockText: string, field: string, value: string): string {
  const re = new RegExp(`${field}:\\s*(?:\\[[^\\]]*\\]|'(?:\\\\.|[^'\\\\])*')`, 's')
  if (re.test(blockText)) {
    return blockText.replace(re, `${field}: ${value}`)
  }
  if (/qualityNote:/.test(blockText)) {
    return blockText.replace(/(\s+)(qualityNote:)/, `$1${field}: ${value},$1$2`)
  }
  return blockText.replace(/,\n( *)\}$/, `,\n$1  ${field}: ${value},\n$1}`)
}

let edits = 0
const log: string[] = []
const misses: string[] = []

for (const inj of injects) {
  const block = findProductBlock(src, inj.url)
  if (!block) {
    misses.push(`MISS: ${inj.url}`)
    continue
  }
  let text = block.text
  text = setOrInsertField(text, 'benefitHeading', `'${inj.benefitHeading.replace(/'/g, "\\'")}'`)
  text = setOrInsertField(text, 'pros', formatStringList(inj.pros, '        '))
  text = setOrInsertField(text, 'cons', formatStringList(inj.cons, '        '))
  src = src.slice(0, block.start) + text + src.slice(block.end)
  edits++
  log.push(`OK ${inj.url.slice(0, 80)}`)
}

fs.writeFileSync(dataPath, src, 'utf-8')
console.log(log.join('\n'))
if (misses.length) {
  console.log('\n===MISSES===')
  console.log(misses.join('\n'))
}
console.log(`\n${edits}/${injects.length} products updated.`)
