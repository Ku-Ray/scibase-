/**
 * Bランク 39サプリ + 6トピカル = 45成分の1位商品に
 * benefitHeading / pros / cons を投入。
 * allantoin は panthenol と URL重複（同一ASIN B0CSS3MC3J）のため除外。
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
  // ===== Supplements (39) =====
  { url: 'https://www.amazon.co.jp/-/en/Vitamin-Booster-Nicotinamide-Riboside-Tablets/dp/B07TK4VYWS?tag=scibase-22',
    benefitHeading: 'TRU NIAGEN® NR 300mg・NAD+前駆体・抗老化研究で最も使われる正規ブランド',
    pros: ['ニコチンアミドリボシド（NR）はNAD+を直接補充する前駆体','TRU NIAGEN®はChromaDex社特許取得の唯一のNRブランド','1カプセル300mg・NAD+メタ解析使用域','NSF認証・GMP・原料純度公開'],
    cons: ['価格は¥5,300/月とプレミアム帯','高用量の長期安全性データは限定的','抗がん剤治療中は医師相談必須'] },
  { url: 'https://www.iherb.com/pr/now-foods-gaba-750-mg-100-veg-capsules/5020',
    benefitHeading: 'GABA 750mg・睡眠・ストレス研究で使われる用量上限を1カプセルで',
    pros: ['GABAは抑制性神経伝達物質で経口摂取RCTで使用実績','1カプセル750mgで研究使用量上限を大きく超える','NOW Foods GMP・第三者検査済み','100粒で約3.3ヶ月分（¥660/月）'],
    cons: ['血液脳関門を通過しにくく効果は処方依存','降圧薬と併用で過度な血圧低下リスク','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/now-foods-taurine-pure-powder-1-lb-454-g/747',
    benefitHeading: 'L-タウリン純粋粉末1g/食・心血管・運動パフォーマンスRCT用量下限',
    pros: ['タウリンは含硫アミノ酸で肝・心・神経機能に必須','1食1gで研究使用量下限（500-3000mg/日）','454g大容量で約15ヶ月分（¥120/月）と最安レベル','NOW Foods GMP・第三者検査済み'],
    cons: ['高用量で消化器症状・血圧低下が出やすい','ベンゾジアゼピン系・抗てんかん薬と相互作用','粉末特有の苦味あり'] },
  { url: 'https://www.iherb.com/pr/host-defense-lion-s-mane-mushroom-capsules-60-count/71281',
    benefitHeading: 'Host Defense ヤマブシタケ・有機Mushroom特化ブランド・NGF産生RCT',
    pros: ['Host DefenseはPaul Stamets博士監修の老舗キノコブランド','1日1g（1カプセル）で研究使用量下限（500-3000mg/日）','USDA Organic + Non-GMO Project Verified','神経成長因子（NGF）産生促進RCTで認知機能改善報告'],
    cons: ['効果実感まで12-16週の継続が必要','キノコアレルギーの方は使用不可','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/thorne-quercetin-phytosome-60-capsules/93196',
    benefitHeading: 'Phytosome技術で生体利用率20倍・Thorne 抗酸化・抗ヒスタミン用量下限',
    pros: ['Phytosome技術はリン脂質結合で吸収率を約20倍に向上','1カプセル500mgで研究使用量下限（500-1000mg/日）','Thorne NSF認証・原料純度公開で最高クラス','ビタミンCとの併用で抗酸化相乗効果'],
    cons: ['抗凝固薬との併用で出血リスク増','価格は¥2,750/月とプレミアム帯','海外発送で到着まで7-14日'] },
  { url: 'https://www.amazon.co.jp/dp/B07TK4VYWS?tag=scibase-22',
    benefitHeading: 'TRU NIAGEN® NR 300mg・NAD+補充の代表ブランドを国内Prime対応で',
    pros: ['TRU NIAGEN®はChromaDex社特許取得の唯一のNRブランド','1カプセル300mgでNAD+研究使用域','国内Prime対応で即日〜翌日着・海外発送の不便なし','NSF認証・GMP・原料純度公開'],
    cons: ['価格は¥2,670/月とプレミアム帯','高用量の長期安全性データは限定的','抗がん剤治療中は医師相談必須'] },
  { url: 'https://www.amazon.co.jp/dp/B0CKKPYTL8?tag=scibase-22',
    benefitHeading: 'αケトグルタル酸1000mg×2粒・ミトコンドリア機能・寿命研究で注目',
    pros: ['AKGはクエン酸回路の重要中間体・ミトコンドリア機能に直結','1カプセル1000mg・2粒で研究使用量レンジ（1-3g/日）','240粒で約4ヶ月分（¥1,130/月）','動物実験で寿命延伸データ・ヒトRCT進行中'],
    cons: ['高用量で胃腸症状（吐き気・下痢）が出やすい','ヒトでの長期エビデンスはまだ蓄積中','国内Amazon発送だが在庫変動あり'] },
  { url: 'https://www.iherb.com/pr/now-foods-l-arginine-1000-mg-120-tablets/422',
    benefitHeading: '一酸化窒素（NO）前駆体L-アルギニン1000mg・血流・運動RCT用量下限',
    pros: ['L-アルギニンはNO合成経路を介して血流改善に作用','1錠1000mg・3粒で研究使用量下限（3-6g/日）','単純アミノ酸で安全域が広い','NOW Foods GMP・第三者検査済み'],
    cons: ['ヘルペス再活性化リスク（リジンとのバランス重要）','降圧薬・ED薬と併用で過度な血圧低下リスク','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/now-foods-acetyl-l-carnitine-500-mg-200-veg-capsules/1027',
    benefitHeading: '脳血液関門を通過するアセチル化L-カルニチン・認知機能RCT用量下限',
    pros: ['ALCARは血液脳関門を通過しL-カルニチンより脳での生理活性高い','1カプセル500mgで研究使用量下限（500-2000mg/日）','200粒で約6.7ヶ月分（¥630/月）と長期コスパ良好','NOW Foods GMP・第三者検査済み'],
    cons: ['甲状腺機能低下症の方は薬効に影響する可能性','抗凝固薬・甲状腺薬と相互作用報告','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/doctor-s-best-best-glucosamine-sulfate-750-mg-360-caps/15669',
    benefitHeading: 'グルコサミン硫酸塩 1500mg/日（750mg×2）・関節RCTで使用される標準用量',
    pros: ['グルコサミン硫酸塩はメタ解析で関節軟骨保護効果','750mg×2粒で研究使用量（1500mg/日）を満たす','360粒で約6ヶ月分（¥630/月）と長期コスパ良好',"Doctor's Best 第三者検査・GMP認証"],
    cons: ['甲殻類アレルギーの方は禁忌','糖尿病薬との併用で血糖値変動の可能性','効果実感まで12-24週の継続が必要','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/solgar-glucosamine-chondroitin-complex-150-tablets/4520',
    benefitHeading: 'グルコサミン+コンドロイチン+MSM複合・関節炎RCTで併用効果が報告',
    pros: ['3成分複合で関節サポート研究の標準的な配合','1日3錠で研究使用量レンジ（コンドロイチン800-1200mg）','Solgar 1947年創業・第三者検査公開','単独成分より複合製剤の方がメタ解析で優位の報告'],
    cons: ['甲殻類アレルギーの方は事前に確認','抗凝固薬と併用で出血リスク増','効果実感まで12-24週の継続が必要'] },
  { url: 'https://www.amazon.co.jp/dp/B07QLTD47P?tag=scibase-22',
    benefitHeading: '大塚製薬エクエル・エクオール産生菌不足の方に直接エクオール10mg補充',
    pros: ['日本人の約半数はエクオール非産生菌型でこのサプリが直接補充手段','大塚製薬の発酵特許で大豆胚芽から生成される正規エクオール','1日4粒で更年期症状RCT用量（10mg/日）','国内製造・薬機法準拠・ドラッグストア入手可能'],
    cons: ['ホルモン感受性疾患（乳がん等）の既往ある方は要相談','価格は¥3,600/月と国内サプリでは高め','効果実感まで4-12週の継続が必要'] },
  { url: 'https://www.iherb.com/pr/now-foods-soy-isoflavones-150-mg-120-veg-capsules/10050',
    benefitHeading: '大豆イソフラボン150mg(60mgアグリコン)・更年期症状RCT用量上限',
    pros: ['1カプセル150mg(アグリコン60mg)で研究使用量上限（50-100mg/日）','大豆発酵濃縮エキスで吸収効率に配慮','120粒で約4ヶ月分（¥550/月）','NOW Foods GMP・第三者検査済み'],
    cons: ['ホルモン感受性疾患の既往ある方は禁忌','抗血栓薬・甲状腺薬と相互作用','大豆アレルギーの方は使用不可','海外発送で到着まで7-14日'] },
  { url: 'https://www.amazon.co.jp/dp/B0058A9SF0?tag=scibase-22',
    benefitHeading: '酪酸ナトリウム600mg・短鎖脂肪酸・腸バリア機能RCTで使われる用量上限',
    pros: ['酪酸は腸上皮細胞のエネルギー源として直接作用する短鎖脂肪酸','1カプセル600mgで研究使用量上限（300-600mg/日）','BodyBio はミトコンドリア研究特化の老舗ブランド','リーキーガット改善RCTで使用実績'],
    cons: ['価格は¥1,650/月とやや高め','ナトリウム摂取制限のある方は要注意','飲み始めにガス・腹部膨満感が出ることがある'] },
  { url: 'https://www.iherb.com/pr/now-foods-alpha-gpc-300-mg-60-veg-capsules/48493',
    benefitHeading: '高吸収型コリン Alpha-GPC 300mg・認知機能RCT用量下限を1カプセルで',
    pros: ['Alpha-GPCはコリン誘導体の中で最も生体利用率が高い','1カプセル300mgで研究使用量下限（300-600mg/日）','認知症RCTで使用実績あり','NOW Foods GMP認証'],
    cons: ['抗コリン薬・ベンゾジアゼピンと相互作用報告','高用量で頭痛・胃腸症状が出ることがある','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/now-foods-5-htp-100-mg-120-veg-capsules/748',
    benefitHeading: 'グリフォニア種子由来5-HTP・セロトニン直接前駆体・気分・睡眠RCT用量下限',
    pros: ['5-HTPはセロトニンの直接前駆体でトリプトファンより変換率高い','1カプセル100mgで研究使用量下限（50-200mg/日）','グリフォニア種子由来の天然原料','120粒で約4ヶ月分（¥550/月）'],
    cons: ['SSRI・MAO阻害薬との併用でセロトニン症候群リスク','妊娠・授乳中・自己免疫疾患の方は不可','飲み始めに胃腸症状（吐き気・嘔吐）が出やすい','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/life-extension-pqq-caps-with-biopqq-20-mg-30-vegetarian-capsules/48823',
    benefitHeading: 'BioPQQ®20mg・ミトコンドリア新生RCT用量上限・三菱ガス化学特許品質',
    pros: ['BioPQQ®は三菱ガス化学（日本）の特許取得・発酵法製造','1カプセル20mgで研究使用量上限（10-20mg/日）','ミトコンドリア新生促進・認知機能改善RCT','Life Extension GMP・第三者検査公開'],
    cons: ['価格は¥3,500/月とプレミアム帯','長期安全性データはまだ蓄積中','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/now-foods-betaine-hcl-648-mg-120-capsules/728',
    benefitHeading: 'TMG（Trimethylglycine）1000mg・ホモシステイン低下・メチル化RCT',
    pros: ['TMGはホモシステイン代謝を直接サポートするメチル基ドナー','1カプセル1000mgで研究使用量下限（1-3g/日）','心血管リスクマーカー改善RCT実績','NOW Foods GMP認証'],
    cons: ['高用量で胃腸症状・体臭変化が出ることがある','メトトレキサート服用中は医師相談','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/now-foods-certified-organic-spirulina-1000-mg-500-tablets/5298',
    benefitHeading: 'USDA Organic スピルリナ・1日4g（4錠）で総合栄養補給RCT用量レンジ中央値',
    pros: ['USDA Organic + Non-GMO Project Verifiedの最高ランク認証','1日4錠で研究使用量レンジ中央値（1-8g/日）','完全タンパク・ビタミン・ミネラル豊富な栄養補給','500錠で約4ヶ月分（¥670/月）'],
    cons: ['自己免疫疾患のある方は事前に医師相談','痛風・高尿酸血症の方は要注意（プリン体含有）','ヨウ素過敏の方は甲状腺機能を観察','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/now-foods-evening-primrose-oil-1300-mg-300-softgels/740',
    benefitHeading: 'γ-リノレン酸（GLA）含有月見草油1300mg・PMS・乾燥肌RCT用量下限',
    pros: ['月見草油はGLA（γ-リノレン酸）の主要供給源','1ソフトジェル1300mgで研究使用量下限（1-3g/日）','300粒で約10ヶ月分（¥280/月）と最安レベル','NOW Foods GMP認証'],
    cons: ['抗凝固薬と併用で出血リスク増','妊娠中は禁忌','効果実感まで12週の継続が必要','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/now-foods-l-glutamine-pure-powder-1-lb-454-g/783',
    benefitHeading: 'L-グルタミン純粋粉末5g/食・腸バリア機能・運動回復RCT用量下限',
    pros: ['L-グルタミンは腸上皮細胞のエネルギー源として直接作用','1食5gで研究使用量下限（5-15g/日）','454g粉末で約3ヶ月分（¥930/月）','NOW Foods GMP・第三者検査済み'],
    cons: ['肝硬変・腎機能障害のある方は禁忌','抗痙攣薬と相互作用','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/jarrow-formulas-broccomax-myrosinase-active-60-veggie-caps/1437',
    benefitHeading: 'Myrosinase活性配合BroccoMax・スルフォラファン直接生成のRCT用量',
    pros: ['Myrosinase酵素併配で胃でスルフォラファンに直接変換される処方','体内変換型の他社製品より生体利用率が高い','1カプセル/日で抗酸化・解毒酵素誘導RCT用量','Jarrow Formulas GMP・第三者検査済み'],
    cons: ['高用量で胃腸症状・甲状腺機能影響の可能性','抗凝固薬と併用で出血リスク増','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/doctor-s-best-nattokinase-2000-fus-90-veggie-caps/36457',
    benefitHeading: '2000FU/カプセル・血栓溶解RCT使用域中央値・大豆発酵由来酵素',
    pros: ['納豆菌培養から精製したフィブリン分解酵素','1カプセル2000FUで研究使用量レンジ（2000-4000FU/日）',"Doctor's Best 第三者検査・GMP認証",'90粒で約3ヶ月分（¥1,270/月）'],
    cons: ['抗凝固薬・抗血小板薬と併用で出血リスク増','手術前2週間は休薬必須','妊娠中・潰瘍のある方は禁忌','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/now-foods-glutathione-500-mg-60-veg-capsules/731',
    benefitHeading: '還元型グルタチオン500mg・体内最強の抗酸化・肝デトックスRCT用量上限',
    pros: ['還元型（GSH）は活性体で経口吸収後に直接抗酸化として機能','1カプセル500mgで研究使用量上限（250-1000mg/日）','NOW Foods GMP・第三者検査済み','システイン・メチオニンと併用で吸収促進'],
    cons: ['経口グルタチオンは胃酸で分解されるため脂質と一緒に摂取','効果実感まで4-8週の継続が必要','価格は¥2,100/月とやや高め','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/now-foods-l-carnosine-500-mg-50-veg-capsules/733',
    benefitHeading: 'L-カルノシン500mg・抗糖化（糖尿病合併症対策）RCT用量下限',
    pros: ['L-カルノシンは抗糖化（AGE生成抑制）作用が報告される稀な成分','500mg×2で研究使用量下限（1000-2000mg/日）','動物実験で寿命延伸・人での認知機能改善報告','NOW Foods GMP認証'],
    cons: ['大量摂取で腸内菌バランスへの影響可能性','ヒトRCTはまだ規模が限定的','価格は¥4,200/月とプレミアム帯','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/now-foods-apigenin-50-mg-90-veg-capsules/142023',
    benefitHeading: 'アピゲニン50mg・パセリ・カモミール由来フラボン・睡眠・抗炎症RCT',
    pros: ['アピゲニンはGABA-A受容体に弱く結合し鎮静作用が報告される','1カプセル50mgで研究使用量下限（50-100mg/日）','David Sinclair研究室で取り上げられた抗老化候補','NOW Foods GMP認証'],
    cons: ['抗凝固薬・降圧薬と相互作用報告','妊娠中は禁忌','ヒトRCTはまだ規模が限定的','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/jarrow-formulas-pterostilbene-50-mg-60-capsules/15213',
    benefitHeading: 'プテロスチルベン50mg・レスベラトロールより吸収率約4倍の構造類似体',
    pros: ['プテロスチルベンはレスベラトロールより脂溶性が高く吸収率約4倍','半減期が長く血中濃度を維持しやすい','1カプセル50mgで研究使用量下限（50-200mg/日）','Jarrow Formulas GMP認証'],
    cons: ['ヒトRCTはまだ規模が限定的','抗凝固薬・降圧薬と相互作用報告','価格は¥1,750/月とやや高め','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/now-foods-silymarin-milk-thistle-extract-300-mg-200-veg-capsules/21048',
    benefitHeading: 'シリマリン300mg・肝保護・肝機能改善RCT用量下限・80%標準化エキス',
    pros: ['シリマリン80%標準化エキスで肝保護メタ解析使用域','1カプセル300mgで研究使用量下限（280-600mg/日）','200粒で約6.7ヶ月分（¥450/月）と最安レベル','NOW Foods GMP認証'],
    cons: ['キク科アレルギーの方は注意','ホルモン感受性疾患の既往ある方は要相談','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/now-foods-saw-palmetto-320-mg-90-softgels/16005',
    benefitHeading: 'ノコギリヤシ320mg・前立腺肥大BPH RCT用量・85-95%脂肪酸標準化',
    pros: ['320mg/日は欧州BPH治療ガイドラインで使われる標準用量','1ソフトジェルで研究使用量下限を満たす','85-95%脂肪酸標準化エキスで品質保証','NOW Foods GMP認証'],
    cons: ['抗凝固薬・テストステロン薬と相互作用','効果実感まで8-12週の継続が必要','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/now-foods-olive-leaf-extract-500-mg-60-veg-capsules/698',
    benefitHeading: 'オレウロペイン18%標準化エキス500mg・血圧・抗菌RCT用量',
    pros: ['オレウロペイン18%標準化で抗酸化・抗菌作用が確認される規格','1カプセル500mgで研究使用量下限（500-1000mg/日）','軽度高血圧改善RCT実績','NOW Foods GMP認証'],
    cons: ['降圧薬と併用で過度な血圧低下リスク','糖尿病薬と併用で低血糖リスク','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/now-foods-hyaluronic-acid-100-mg-60-veg-capsules/26059',
    benefitHeading: 'ヒアルロン酸経口100mg・皮膚水分量・関節RCT用量レンジ中央値',
    pros: ['経口ヒアルロン酸は皮膚水分量改善RCTで使用実績','1カプセル100mgで研究使用量レンジ中央値（80-200mg/日）','60粒で約2ヶ月分（¥1,500/月）','NOW Foods GMP認証'],
    cons: ['効果実感まで6-12週の継続が必要','大規模RCTはまだ限定的','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/host-defense-mushrooms-reishi-120-capsules/21453',
    benefitHeading: '霊芝（マンネンタケ）2g/日・免疫サポート・睡眠改善RCT用量レンジ中央値',
    pros: ['USDA Organic + Non-GMO Project Verified','1日2g（2粒）で研究使用量レンジ中央値（1-3g/日）','Host Defense Paul Stamets博士監修ブランド','120粒で約2ヶ月分（¥2,900/月）'],
    cons: ['抗凝固薬・免疫抑制剤と相互作用報告','キノコアレルギーの方は使用不可','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/host-defense-cordyceps-mushroom-supplement-60-capsules/109278',
    benefitHeading: '冬虫夏草2g/日・運動パフォーマンス・疲労回復RCT用量レンジ中央値',
    pros: ['USDA Organic + Non-GMO Project Verified','1日2g（2粒）で研究使用量レンジ中央値（1-3g/日）','高地での運動耐性改善RCT実績','Host Defense Paul Stamets博士監修ブランド'],
    cons: ['抗凝固薬・免疫抑制剤と相互作用報告','高用量で胃腸症状・口渇が出ることがある','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/biosil-advanced-collagen-generator-60-capsules/36219',
    benefitHeading: 'BioSil ch-OSA 5mg・コラーゲン産生・骨・髪RCTで使用される特許形態',
    pros: ['ch-OSA®（コリン安定化オルトケイ酸）は唯一吸収可能なシリカ形態','1カプセル5mgで研究使用量下限（10-40mg/日相当の生体利用量）','コラーゲン産生・髪・爪・骨密度RCT実績','特許取得形態で他社では入手不可'],
    cons: ['価格は¥2,500/月とやや高め','効果実感まで12-24週の継続が必要','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/now-foods-chromium-picolinate-200-mcg-250-veg-capsules/678',
    benefitHeading: 'クロムピコリネート200mcg・血糖管理RCT用量下限・吸収率高い活性形態',
    pros: ['ピコリネート型は吸収率が高くインスリン感受性RCT使用実績','1カプセル200mcgで研究使用量下限（200-1000mcg/日）','250粒で約8.3ヶ月分（¥240/月）と最安レベル','NOW Foods GMP認証'],
    cons: ['高用量長期で腎機能・肝機能影響の症例報告','糖尿病薬と併用で低血糖リスク','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/amazing-herbs-black-seed-oil-100-pure-cold-pressed-1000-mg-60-softgels/3737',
    benefitHeading: 'ニゲラ・サティバ種子油1000mg・チモキノン主要活性成分・コールドプレス処方',
    pros: ['ニゲラ種子油はチモキノンを含む伝統医学使用の油脂','1ソフトジェル1000mgで研究使用量レンジ（500-2000mg/日）','コールドプレス（低温抽出）で活性成分保持','抗炎症・血糖・脂質改善RCT実績'],
    cons: ['抗凝固薬・降圧薬・糖尿病薬と相互作用','妊娠中は禁忌','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/now-foods-astragalus-root-500-mg-100-veg-capsules/722',
    benefitHeading: '黄耆（オウギ）500mg・伝統中国医学免疫サポートRCT用量下限',
    pros: ['黄耆は伝統中国医学（TCM）で免疫サポートの代表的な生薬','1カプセル500mgで研究使用量下限（500-1500mg/日）','テロメラーゼ活性化研究で注目される活性成分含有','NOW Foods GMP認証'],
    cons: ['自己免疫疾患のある方は禁忌','免疫抑制剤・利尿薬と相互作用','海外発送で到着まで7-14日'] },
  { url: 'https://www.iherb.com/pr/doctor-s-best-fisetin-100-mg-30-veggie-caps/43592',
    benefitHeading: 'フィセチン100mg・セノリティクス（老化細胞除去）研究で注目のフラボノイド',
    pros: ['フィセチンは老化細胞除去（セノリティクス）研究で最も注目される','イチゴ・りんごに含まれる天然フラボノイド','1カプセル100mgで研究使用量下限（100-500mg/日）',"Doctor's Best 第三者検査・GMP認証"],
    cons: ['ヒトRCTはまだ規模が限定的','抗凝固薬・抗炎症薬との相互作用報告','価格は¥3,800/月とプレミアム帯','海外発送で到着まで7-14日'] },
  { url: 'https://www.amazon.co.jp/dp/B003G70U3G?tag=scibase-22',
    benefitHeading: 'USDA Organic マカ500mg・性機能・更年期症状RCT用量下限を3粒で',
    pros: ['マカはペルー高地原産・テストステロン非介在の作用機序','500mg×3粒で研究使用量下限（1500-3500mg/日）','USDA Organic 認証・GMP製造','ホルモン感受性疾患でも比較的安全とされる'],
    cons: ['妊娠中・甲状腺疾患の方は要医師相談','効果実感まで4-12週の継続が必要','国内Amazon発送だが在庫変動あり'] },

  // ===== Topicals (6) =====
  { url: 'https://www.iherb.com/pr/benton-bakuchiol-serum-1-18-fl-oz-35-ml/115665',
    benefitHeading: 'バクチオール・レチノール代替の植物由来成分・妊娠中も使えるRCT実績',
    pros: ['バクチオールはレチノール類似のシワ改善RCTで効果が確認された植物成分','妊娠・授乳中も使える低リスク代替成分','Bentonは韓国発の透明処方ブランド','35mlで約2.5ヶ月分（¥1,280/月）'],
    cons: ['レチノールよりエビデンス蓄積はまだ限定的','効果実感まで12週の継続が必要','海外発送で到着まで7-14日'] },
  { url: 'https://www.amazon.co.jp/Ordinary-Hyaluronic-Acid-2-30ml/dp/B01MYEZPC8?tag=scibase-22',
    benefitHeading: 'ヒアルロン酸2% + B5・分子量3種で表皮・真皮の多層保湿アプローチ',
    pros: ['高分子・中分子・低分子の3種HA配合で多層保湿','パンテノール（B5）併配でバリア修復の相乗効果','The Ordinary 透明処方公開ブランド','¥1,400前後の入手しやすさ・全肌タイプ対応'],
    cons: ['真皮への浸透は分子量と乾燥環境に依存','乾燥環境では肌から水分を奪うパラドックス報告','単体使用より保湿クリームと重ね使い推奨'] },
  { url: 'https://www.amazon.co.jp/dp/B083NTHVJV?tag=scibase-22',
    benefitHeading: 'ツボクサ（CICA）配合クリーム・バリア修復・抗炎症RCT実績のK-beauty定番',
    pros: ['ツボクサ抽出物（マデカッソシド・アジアチコシド）はバリア修復RCT実績','VT CosmeticsはBTSコラボで知られるK-beauty 定番ブランド','50mlクリームで約2ヶ月分（¥990/月）','鎮静・敏感肌・赤み対策の総合ケア'],
    cons: ['クリーム形状のためテカりやすい肌タイプには重い','香料配合で敏感な方は使用感に注意','効果実感まで4-8週の継続が必要'] },
  { url: 'https://www.amazon.co.jp/dp/B0719WNNK4?tag=scibase-22',
    benefitHeading: '100%植物由来スクワラン・皮脂類似構造で全肌タイプ対応の最低刺激オイル',
    pros: ['100%植物由来（オリーブ・サトウキビ）で動物性スクワレンと違い無臭','皮脂類似構造で肌なじみが良く刺激性最低レベル','The Ordinary 透明処方公開ブランド','30mlオイルで約3ヶ月分（¥500/月）'],
    cons: ['単独では保湿成分追加が必要（封じ込めるオイルのため）','ニキビ肌は毛穴詰まりに注意（コメドジェニック性は低いが個人差）'] },
  { url: 'https://www.amazon.co.jp/dp/B07BGJMNYL?tag=scibase-22',
    benefitHeading: 'マンデル酸10% AHA・大分子で刺激最少・敏感肌・色素沈着の入門ピーリング',
    pros: ['マンデル酸はAHAの中で分子サイズが最大で刺激が最少','10%濃度は外用RCTで色素沈着改善が確認される使用域','ヒアルロン酸併配でピーリング後の乾燥を緩和','The Ordinary 透明処方公開ブランド'],
    cons: ['朝使用後はSPF併用必須','効果はグリコール酸より穏やかで時間がかかる','レチノール・ビタミンCと同時使用で過剰刺激リスク'] },
  { url: 'https://www.amazon.co.jp/dp/B0DHL3169M?tag=scibase-22',
    benefitHeading: 'PDRN（サケ精子由来DNA）配合・組織修復・コラーゲン産生RCTで注目',
    pros: ['PDRNは医療用注射での皮膚再生実績がある成分の外用版','サケ精子由来の天然DNA断片で創傷治癒・抗炎症RCT実績','ANUA はK-beauty 透明処方・敏感肌対応ブランド','ヒアルロン酸併配で水分保持を強化'],
    cons: ['外用での生体利用率は注射より限定的','効果実感まで12-24週の継続が必要','サケアレルギーの方は使用不可'] },
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
