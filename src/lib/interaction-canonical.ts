/**
 * interaction-canonical.ts
 *
 * data.ts の `interactions[].substance` 文字列は実データ調査時点で 558 種の
 * 表記揺れがある（ワルファリン / ワルファリン（抗凝固薬） / 抗凝固薬（ワル
 * ファリン・DOAC）…）。
 *
 * このファイルは canonical（標準化された）薬剤・状態キーと、それに該当する
 * 表記揺れの regex を保持する。
 *
 * 設計方針：
 * - data.ts は無変更（既存記事・SEO・schema 全て無影響）
 * - 1 substance 文字列に複数 canonical が当たるのは仕様（class + 具体薬を両
 *   方含む文字列のため）。matchAllCanonical() ですべて返す
 * - matchPrimaryCanonical() は宣言順 first-match で最も特異性の高いものを返す
 *
 * カバレッジ：147 canonical で 558 unique substance のうち 544 (97.5%) を捕捉。
 * 983 interaction エントリのうち 969 (98.6%) をカバー。
 *
 * 監査スクリプト：scripts/audit_canonical_coverage.py
 */

export type CanonicalCategory =
  | 'anticoagulant'
  | 'antiplatelet'
  | 'antihypertensive'
  | 'antidiabetic'
  | 'thyroid'
  | 'immunosuppressant'
  | 'antibiotic'
  | 'cyp_substrate'
  | 'antidepressant'
  | 'antipsychotic'
  | 'sedative'
  | 'antiepileptic'
  | 'statin'
  | 'nsaid'
  | 'gastric'
  | 'hormone'
  | 'chemotherapy'
  | 'bisphosphonate'
  | 'parkinsonian'
  | 'cognitive'
  | 'erectile'
  | 'anticholinergic'
  | 'opioid'
  | 'lifestyle'
  | 'condition'
  | 'mineral_supp'
  | 'topical'
  | 'vaccine'
  | 'lab_test'
  | 'stimulant'
  | 'cardiac'
  | 'other_drug'
  | 'supplement_other'

export interface CanonicalEntry {
  /** unique key（検索 UI 表示にも使用） */
  key: string
  /** 大分類 */
  category: CanonicalCategory
  /** substance 文字列を捕捉する regex */
  pattern: RegExp
}

export const CATEGORY_LABEL: Record<CanonicalCategory, string> = {
  anticoagulant: '抗凝固',
  antiplatelet: '抗血小板',
  antihypertensive: '降圧',
  antidiabetic: '糖尿病',
  thyroid: '甲状腺',
  immunosuppressant: '免疫抑制',
  antibiotic: '抗生物質・抗菌薬',
  cyp_substrate: 'CYP 基質薬',
  antidepressant: '抗うつ',
  antipsychotic: '抗精神病',
  sedative: '鎮静・睡眠',
  antiepileptic: '抗てんかん',
  statin: '脂質異常',
  nsaid: 'NSAIDs・鎮痛',
  gastric: '胃酸抑制',
  hormone: 'ホルモン',
  chemotherapy: '化学療法',
  bisphosphonate: 'ビスホスホネート',
  parkinsonian: 'パーキンソン病',
  cognitive: '認知症処方薬',
  erectile: 'ED 治療薬',
  anticholinergic: '抗コリン・抗ヒスタミン',
  opioid: 'オピオイド',
  lifestyle: '生活習慣',
  condition: '状態・既往',
  mineral_supp: 'ミネラル・ビタミン',
  topical: '外用薬',
  vaccine: 'ワクチン',
  lab_test: '検査',
  stimulant: '中枢刺激',
  cardiac: '循環器',
  other_drug: 'その他処方薬',
  supplement_other: 'その他サプリ・ハーブ',
}

export const CANONICAL_INTERACTIONS: CanonicalEntry[] = [
  // 抗凝固・抗血小板
  { key: 'ワルファリン', category: 'anticoagulant', pattern: /ワルファリン/ },
  { key: 'DOAC', category: 'anticoagulant', pattern: /DOAC|直接経口抗凝固薬|リバーロキサバン|アピキサバン|エドキサバン|ダビガトラン/ },
  { key: '抗血小板薬', category: 'antiplatelet', pattern: /抗血小板|アスピリン|クロピドグレル|プラスグレル|チカグレロル/ },
  { key: '抗凝固薬', category: 'anticoagulant', pattern: /抗凝固薬|アセノクマロール|ヘパリン|線溶薬/ },

  // 糖尿病
  { key: 'インスリン', category: 'antidiabetic', pattern: /インスリン/ },
  { key: 'メトホルミン', category: 'antidiabetic', pattern: /メトホルミン/ },
  { key: 'SU剤', category: 'antidiabetic', pattern: /SU.?剤|スルホニル|グリベンクラミド|グリメピリド|グリクラジド/ },
  { key: 'SGLT2阻害薬', category: 'antidiabetic', pattern: /SGLT2/ },
  { key: 'DPP-4阻害薬', category: 'antidiabetic', pattern: /DPP.?4/ },
  { key: 'GLP-1作動薬', category: 'antidiabetic', pattern: /GLP.?1/ },
  { key: 'α-グルコシダーゼ阻害薬', category: 'antidiabetic', pattern: /α-?グルコシダーゼ|アカルボース|ボグリボース|ミグリトール/ },
  { key: '糖尿病治療薬', category: 'antidiabetic', pattern: /糖尿病|血糖降下|経口血糖|グリニド|血糖低下/ },

  // 降圧
  { key: 'ACE阻害薬', category: 'antihypertensive', pattern: /ACE.?阻害|リシノプリル|エナラプリル|カプトプリル|ラミプリル/ },
  { key: 'ARB', category: 'antihypertensive', pattern: /\bARB|アンジオテンシン.*受容体|ロサルタン|バルサルタン|オルメサルタン|テルミサルタン|アジルサルタン/ },
  { key: 'Ca拮抗薬', category: 'antihypertensive', pattern: /カルシウム拮抗|Ca.?拮抗|アムロジピン|ニフェジピン|ジルチアゼム|ベラパミル/ },
  { key: 'β遮断薬', category: 'antihypertensive', pattern: /β遮断|ベータブロッカー|プロプラノロール|メトプロロール|ビソプロロール|ナドロール|カルベジロール/ },
  { key: 'α遮断薬', category: 'antihypertensive', pattern: /α遮断|タムスロシン|プラゾシン/ },
  { key: 'チアジド系利尿薬', category: 'antihypertensive', pattern: /チアジド|サイアザイド|ヒドロクロロチアジド/ },
  { key: 'ループ利尿薬', category: 'antihypertensive', pattern: /ループ利尿|フロセミド|ブメタニド/ },
  { key: 'カリウム保持性利尿薬', category: 'antihypertensive', pattern: /カリウム保持|スピロノラクトン|トリアムテレン|エプレレノン/ },
  { key: '降圧薬', category: 'antihypertensive', pattern: /降圧|高血圧|血圧.*薬|利尿薬/ },

  // 甲状腺
  { key: '甲状腺ホルモン薬', category: 'thyroid', pattern: /甲状腺ホルモン|甲状腺薬|レボチロキシン|チラーヂン/ },
  { key: '抗甲状腺薬', category: 'thyroid', pattern: /抗甲状腺|チアマゾール|プロピルチオウラシル|メルカゾール/ },
  { key: '甲状腺機能関連', category: 'thyroid', pattern: /甲状腺機能(低下|関連|亢進)|甲状腺疾患/ },

  // 免疫抑制
  { key: 'タクロリムス', category: 'immunosuppressant', pattern: /タクロリムス|プログラフ/ },
  { key: 'シクロスポリン', category: 'immunosuppressant', pattern: /シクロスポリン|サンディミュン|ネオーラル/ },
  { key: 'mTOR阻害薬', category: 'immunosuppressant', pattern: /mTOR|ラパマイシン|シロリムス|エベロリムス/ },
  { key: 'メトトレキサート', category: 'immunosuppressant', pattern: /メトトレキサート|メソトレキセート|MTX/ },
  { key: '副腎皮質ステロイド', category: 'immunosuppressant', pattern: /ステロイド|プレドニゾロン|プレドニゾン|デキサメタゾン|コルチコステロイド/ },
  { key: '免疫抑制剤', category: 'immunosuppressant', pattern: /免疫抑制|生物学的製剤/ },

  // 抗生物質・抗菌薬
  { key: 'テトラサイクリン系', category: 'antibiotic', pattern: /テトラサイクリン|ドキシサイクリン|ミノサイクリン/ },
  { key: 'フルオロキノロン系', category: 'antibiotic', pattern: /フルオロキノロン|キノロン|シプロフロキサシン|レボフロキサシン|モキシフロキサシン/ },
  { key: 'マクロライド系', category: 'antibiotic', pattern: /マクロライド|エリスロマイシン|クラリスロマイシン|アジスロマイシン/ },
  { key: 'ペニシリン系', category: 'antibiotic', pattern: /ペニシリン|アモキシシリン|アンピシリン/ },
  { key: 'スルファ系', category: 'antibiotic', pattern: /スルファ|ST合剤|サルファ/ },
  { key: 'アゾール系抗真菌薬', category: 'antibiotic', pattern: /アゾール|フルコナゾール|イトラコナゾール|ボリコナゾール|抗真菌/ },
  { key: '抗HIV薬', category: 'antibiotic', pattern: /抗HIV|HIV薬|プロテアーゼ阻害|NNRTI/ },
  { key: '抗ウイルス薬', category: 'antibiotic', pattern: /抗ウイルス|IFN-α|インターフェロン/ },
  { key: '抗生物質', category: 'antibiotic', pattern: /抗生物質|抗生剤|抗菌薬/ },

  // 抗うつ・精神神経
  { key: 'SSRI', category: 'antidepressant', pattern: /SSRI|セルトラリン|パロキセチン|エスシタロプラム|フルオキセチン|フルボキサミン|シタロプラム/ },
  { key: 'SNRI', category: 'antidepressant', pattern: /SNRI|デュロキセチン|ベンラファキシン|ミルナシプラン/ },
  { key: '三環系抗うつ薬', category: 'antidepressant', pattern: /三環系|アミトリプチリン|イミプラミン|クロミプラミン|ノルトリプチリン/ },
  { key: 'MAO阻害薬', category: 'antidepressant', pattern: /MAO.?阻害|MAOI|モノアミン酸化酵素|フェネルジン|セレギリン|モクロベミド|トラニルシプロミン/ },
  { key: 'セロトニン作動薬', category: 'antidepressant', pattern: /セロトニン作動/ },
  { key: '抗うつ薬', category: 'antidepressant', pattern: /抗うつ/ },
  { key: 'リチウム', category: 'antipsychotic', pattern: /リチウム|双極性/ },
  { key: 'クロザピン', category: 'antipsychotic', pattern: /クロザピン/ },
  { key: '抗精神病薬', category: 'antipsychotic', pattern: /抗精神病|ハロペリドール|リスペリドン|オランザピン|クエチアピン|フェノチアジン/ },

  // 鎮静・睡眠
  { key: 'ベンゾジアゼピン', category: 'sedative', pattern: /ベンゾジアゼピン|ジアゼパム|アルプラゾラム|ロラゼパム|エチゾラム|クロナゼパム/ },
  { key: 'Z薬', category: 'sedative', pattern: /ゾルピデム|エスゾピクロン|ゾピクロン/ },
  { key: '睡眠薬', category: 'sedative', pattern: /睡眠薬|睡眠導入|不眠/ },
  { key: '鎮静薬', category: 'sedative', pattern: /鎮静|抗不安|中枢神経抑制/ },

  // 抗てんかん
  { key: 'フェニトイン', category: 'antiepileptic', pattern: /フェニトイン/ },
  { key: 'カルバマゼピン', category: 'antiepileptic', pattern: /カルバマゼピン/ },
  { key: 'バルプロ酸', category: 'antiepileptic', pattern: /バルプロ酸/ },
  { key: '抗てんかん薬', category: 'antiepileptic', pattern: /抗てんかん|抗痙攣|プリミドン|ラモトリギン|レベチラセタム/ },
  { key: 'けいれん・痙攣薬', category: 'antiepileptic', pattern: /けいれん|痙攣/ },

  // 脂質異常・循環器
  { key: 'スタチン', category: 'statin', pattern: /スタチン|HMG-CoA|アトルバスタチン|ロスバスタチン|シンバスタチン|プラバスタチン|ピタバスタチン|ロバスタチン/ },
  { key: 'エゼチミブ', category: 'statin', pattern: /エゼチミブ/ },
  { key: '胆汁酸吸着樹脂', category: 'statin', pattern: /コレスチラミン|コレセベラム|胆汁酸/ },
  { key: 'ジゴキシン', category: 'cardiac', pattern: /ジゴキシン|デジタリス/ },
  { key: '硝酸薬', category: 'cardiac', pattern: /硝酸薬|ニトログリセリン|硝酸イソソルビド/ },
  { key: 'アミオダロン', category: 'cardiac', pattern: /アミオダロン|抗不整脈/ },
  { key: '心血管系薬剤', category: 'cardiac', pattern: /心不全|心血管系|心血管.*薬/ },
  { key: 'QT延長薬', category: 'cardiac', pattern: /QT延長/ },

  // NSAIDs・鎮痛
  { key: 'NSAIDs', category: 'nsaid', pattern: /NSAID|イブプロフェン|ナプロキセン|ロキソプロフェン|ジクロフェナク|COX阻害|セレコキシブ/ },
  { key: 'アセトアミノフェン', category: 'nsaid', pattern: /アセトアミノフェン|パラセタモール|カロナール|タイレノール/ },
  { key: 'オピオイド', category: 'opioid', pattern: /オピオイド|モルヒネ|オキシコドン|コデイン|トラマドール|フェンタニル|ペチジン|メペリジン/ },

  // 胃酸・消化器
  { key: 'PPI', category: 'gastric', pattern: /PPI|プロトンポンプ|オメプラゾール|ランソプラゾール|エソメプラゾール|ラベプラゾール/ },
  { key: 'H2ブロッカー', category: 'gastric', pattern: /H2.?ブロッカー|ファモチジン|シメチジン|ラニチジン/ },

  // ホルモン
  { key: '経口避妊薬', category: 'hormone', pattern: /経口避妊薬|ピル/ },
  { key: 'ホルモン補充療法', category: 'hormone', pattern: /ホルモン補充|HRT|エストロゲン補充/ },
  { key: 'エストロゲン製剤', category: 'hormone', pattern: /エストロゲン|エチニルエストラジオール/ },
  { key: 'テストステロン製剤', category: 'hormone', pattern: /テストステロン/ },
  { key: 'タモキシフェン', category: 'hormone', pattern: /タモキシフェン|芳香化酵素|アロマターゼ/ },
  { key: '性ホルモン製剤', category: 'hormone', pattern: /性ホルモン|ホルモン療法|ホルモン剤/ },

  // 抗がん
  { key: '化学療法薬', category: 'chemotherapy', pattern: /化学療法|抗がん|抗癌|シスプラチン|5-?フルオロウラシル|シクロホスファミド|抗悪性腫瘍|放射線療法/ },
  { key: 'チロシンキナーゼ阻害薬', category: 'chemotherapy', pattern: /チロシンキナーゼ|イマチニブ/ },
  { key: '分子標的薬', category: 'chemotherapy', pattern: /分子標的|PARP阻害|免疫チェックポイント|免疫療法/ },

  // 骨・パーキンソン・認知症
  { key: 'ビスホスホネート', category: 'bisphosphonate', pattern: /ビスホスホネート|ビスフォスフォネート|アレンドロン酸|リセドロン酸|ミノドロン酸|イバンドロン酸/ },
  { key: 'レボドパ', category: 'parkinsonian', pattern: /レボドパ|カルビドパ|マドパー|ネオドパストン|パーキンソン/ },
  { key: 'コリンエステラーゼ阻害薬', category: 'cognitive', pattern: /ドネペジル|リバスチグミン|ガランタミン|コリンエステラーゼ|認知症処方薬|アセチルコリンエステラーゼ/ },
  { key: 'メマンチン', category: 'cognitive', pattern: /メマンチン/ },

  // ED
  { key: 'PDE5阻害薬', category: 'erectile', pattern: /PDE5|ED治療薬|シルデナフィル|タダラフィル|バルデナフィル|バイアグラ|シアリス/ },

  // 抗コリン・抗ヒスタミン
  { key: '抗コリン薬', category: 'anticholinergic', pattern: /抗コリン|オキシブチニン|スコポラミン/ },
  { key: '抗ヒスタミン薬', category: 'anticholinergic', pattern: /抗ヒスタミン|ジフェンヒドラミン|フェキソフェナジン/ },

  // CYP・肝代謝
  { key: 'CYP3A4基質薬', category: 'cyp_substrate', pattern: /CYP3A4/ },
  { key: 'CYP2C9基質薬', category: 'cyp_substrate', pattern: /CYP2C9/ },
  { key: 'CYP2C19基質薬', category: 'cyp_substrate', pattern: /CYP2C19/ },
  { key: 'CYP2D6基質薬', category: 'cyp_substrate', pattern: /CYP2D6/ },
  { key: 'CYP1A2基質薬', category: 'cyp_substrate', pattern: /CYP1A2/ },
  { key: 'CYP2E1基質薬', category: 'cyp_substrate', pattern: /CYP2E1/ },
  { key: 'CYP2C8基質薬', category: 'cyp_substrate', pattern: /CYP2C8/ },
  { key: 'CYP代謝薬', category: 'cyp_substrate', pattern: /CYP|肝代謝薬|UGT|P-?糖タンパク|OATP|OCTN/ },

  // 中枢刺激
  { key: '中枢刺激薬', category: 'stimulant', pattern: /中枢刺激|刺激薬|メチルフェニデート|ADHD治療/ },

  // 検査・ワクチン
  { key: '生ワクチン', category: 'vaccine', pattern: /生ワクチン|MMR|水痘|BCG/ },
  { key: 'ワクチン', category: 'vaccine', pattern: /ワクチン/ },
  { key: '免疫測定検査', category: 'lab_test', pattern: /免疫測定|TSH|FT4|hCG|トロポニン|甲状腺機能検査/ },
  { key: '検査値全般', category: 'lab_test', pattern: /検査値|血液検査|尿検査/ },
  { key: 'ヨウ素造影剤', category: 'lab_test', pattern: /ヨウ素造影|造影剤|CT|血管造影/ },
  { key: 'PSA検査', category: 'lab_test', pattern: /PSA/ },

  // 外用・スキンケア
  { key: 'レチノイド外用', category: 'topical', pattern: /レチノイド|レチノール|レチノイン酸|トレチノイン|タザロテン|外用レチノイド/ },
  { key: '経口レチノイド', category: 'topical', pattern: /イソトレチノイン|アシトレチン|経口レチノイド/ },
  { key: 'AHA/BHA外用', category: 'topical', pattern: /AHA|BHA|グリコール酸|サリチル酸|乳酸.*外用|角質剥離/ },
  { key: '過酸化ベンゾイル', category: 'topical', pattern: /過酸化ベンゾイル/ },
  { key: '光感受性薬剤', category: 'topical', pattern: /光感受性|光線療法|光感作/ },
  { key: '頭皮外用薬', category: 'topical', pattern: /頭皮外用|育毛剤|頭皮治療/ },
  { key: '抗アンドロゲン薬', category: 'topical', pattern: /抗アンドロゲン|スピロノラクトン.*アンドロゲン/ },
  { key: '5α還元酵素阻害薬', category: 'topical', pattern: /フィナステリド|デュタステリド|5α還元|finasteride/ },
  { key: 'ミノキシジル', category: 'topical', pattern: /minoxidil|ミノキシジル/ },
  { key: 'ピーリング・レーザー', category: 'topical', pattern: /ピーリング|レーザー脱毛/ },

  // ミネラル・サプリ相互
  { key: '鉄製剤', category: 'mineral_supp', pattern: /鉄(剤|分|サプリ|製剤|含|強化)|硫酸鉄|ビスグリシン酸鉄/ },
  { key: 'カルシウム製剤', category: 'mineral_supp', pattern: /カルシウム(製剤|サプリ|強化|含)/ },
  { key: '亜鉛サプリ', category: 'mineral_supp', pattern: /亜鉛サプリ|亜鉛強化/ },
  { key: '銅サプリ', category: 'mineral_supp', pattern: /銅サプリ|銅(製剤|含|高用量)|銅キレート/ },
  { key: '葉酸・ビタミンB群', category: 'mineral_supp', pattern: /葉酸|ビタミンB|B12|B6|B2|ナイアシン|ナイアシンアミド|NMN|NR|リボフラビン/ },
  { key: 'ビタミンD高用量', category: 'mineral_supp', pattern: /ビタミンD.*高用量|ビタミンD3.*高用量/ },
  { key: 'ビタミンC外用', category: 'mineral_supp', pattern: /ビタミンC.*外用|アスコルビン酸.*外用/ },
  { key: 'ビタミンE高用量', category: 'mineral_supp', pattern: /α-?トコフェロール|ビタミンE.*大量|ビタミンE.*高用量/ },
  { key: 'β-カロチンサプリ', category: 'mineral_supp', pattern: /β-?カロチン|β-?カロテン/ },
  { key: 'ビオチン高用量', category: 'mineral_supp', pattern: /ビオチン.*高用量/ },

  // 生活習慣
  { key: 'アルコール', category: 'lifestyle', pattern: /アルコール|飲酒/ },
  { key: 'カフェイン', category: 'lifestyle', pattern: /カフェイン|コーヒー|茶.*感受性/ },
  { key: 'グレープフルーツ', category: 'lifestyle', pattern: /グレープフルーツ/ },
  { key: '喫煙', category: 'lifestyle', pattern: /喫煙|タバコ/ },
  { key: 'マウスウォッシュ', category: 'lifestyle', pattern: /マウスウォッシュ|クロルヘキシジン|リステリン/ },

  // 状態・条件
  { key: '妊娠中・授乳中', category: 'condition', pattern: /妊娠中|授乳中|妊娠.*女性|妊活/ },
  { key: '肝機能障害', category: 'condition', pattern: /肝機能障害|肝疾患|肝障害/ },
  { key: '腎機能障害', category: 'condition', pattern: /腎機能|腎排泄|腎毒性/ },
  { key: '手術前後', category: 'condition', pattern: /手術|抜歯/ },
  { key: 'がん既往・治療中', category: 'condition', pattern: /がん(既往|治療中)|癌(既往|治療中)|ホルモン依存性|エストロゲン受容体陽性/ },
  { key: 'IBD', category: 'condition', pattern: /IBD|炎症性腸|潰瘍性大腸|クローン|メサラジン/ },
  { key: '血栓症既往', category: 'condition', pattern: /血栓症|血栓素因/ },
  { key: '老化細胞関連', category: 'condition', pattern: /老化細胞|SASP/ },
  { key: '肝毒性薬剤', category: 'condition', pattern: /肝毒性/ },
  { key: '重症患者・カテーテル', category: 'condition', pattern: /中心静脈カテーテル|重症患者/ },

  // その他処方薬・サプリ
  { key: 'ペニシラミン', category: 'other_drug', pattern: /ペニシラミン/ },
  { key: 'トリエンチン', category: 'other_drug', pattern: /トリエンチン/ },
  { key: '尿酸降下薬', category: 'other_drug', pattern: /尿酸降下|アロプリノール|フェブキソスタット/ },
  { key: 'UDCA', category: 'other_drug', pattern: /UDCA|ウルソデオキシコール/ },
  { key: 'リン吸着薬', category: 'other_drug', pattern: /リン吸着|炭酸ランタン|セベラマー/ },
  { key: 'メラノコルチン関連薬', category: 'other_drug', pattern: /メラノタン|PT-141|メラノコルチン/ },
  { key: 'アレルギー薬剤', category: 'other_drug', pattern: /クラゲ.*アレルギー|甲殻類アレルギー/ },
  { key: '経口薬全般', category: 'other_drug', pattern: /経口薬全般|肝代謝薬全般/ },
  { key: 'タウリンサプリ', category: 'supplement_other', pattern: /タウリン/ },
  { key: 'ハーブ・他サプリ', category: 'supplement_other', pattern: /セントジョーンズ|5-HTP|カバ|コンフリー|ジャーマンダー|肝毒性ハーブ|ベルベリン|α-リポ酸|クロム|シナモン|消化酵素|乳酸菌|プロバイオティクス全般/ },
]

// 開発時に key の重複を検出する
const KEYS = new Set<string>()
for (const e of CANONICAL_INTERACTIONS) {
  if (KEYS.has(e.key)) {
    throw new Error(`Duplicate canonical key: ${e.key}`)
  }
  KEYS.add(e.key)
}

/**
 * substance 文字列に該当する canonical エントリを **すべて** 返す。
 * 例：「ワルファリン（抗凝固薬）」→ [ワルファリン, 抗凝固薬]
 */
export function matchAllCanonical(substance: string): CanonicalEntry[] {
  return CANONICAL_INTERACTIONS.filter((e) => e.pattern.test(substance))
}

/**
 * 宣言順 first-match の canonical 1 件（最も特異性の高いものを返す設計）
 */
export function matchPrimaryCanonical(substance: string): CanonicalEntry | null {
  return CANONICAL_INTERACTIONS.find((e) => e.pattern.test(substance)) ?? null
}

/**
 * substance 文字列が指定した canonical key にマッチするか
 */
export function matchesCanonicalKey(substance: string, key: string): boolean {
  const entry = CANONICAL_INTERACTIONS.find((e) => e.key === key)
  if (!entry) return false
  return entry.pattern.test(substance)
}

/**
 * カテゴリ別に canonical をグループ化して返す（検索 UI のセクション分け用）
 */
export function groupCanonicalByCategory(): Record<CanonicalCategory, CanonicalEntry[]> {
  const result = {} as Record<CanonicalCategory, CanonicalEntry[]>
  for (const cat of Object.keys(CATEGORY_LABEL) as CanonicalCategory[]) {
    result[cat] = []
  }
  for (const e of CANONICAL_INTERACTIONS) {
    result[e.category].push(e)
  }
  return result
}
