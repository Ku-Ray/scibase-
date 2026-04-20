# 飲み合わせ（薬物相互作用）機能 Phase 1 ブリーフィング

## 目的
SciBase（scibase.app）の全成分ページに「医薬品との飲み合わせ」情報を追加する。
YMYL領域のため、Legal/Research/Factcheck 3部門のレビューを経た設計で実装する。

**ユーザー要望（原文）**：
> 各成分説明に飲み合わせについても記載して欲しいです。ピル飲んでいる場合はトラネキサム酸が飲めないなど。ここら辺を前成分入れて欲しいです。

## 現状（実装前）
- `src/lib/types.ts` に既存：`sideEffects?: string[]` / `contraindications?: string[]`
- `contraindications` は「妊婦・授乳婦」等の禁忌対象者で、**薬との相互作用は未整備**
- UIは `src/app/ingredients/[slug]/page.tsx` の `id="safety"` セクションで副作用・注意が必要な方を表示中

## 部門レビュー結果（要点）

### Legal（最重要）
- **情報提供としての記載はOK**、ただし断定表現NG
- 必須：①メカニズム言及 ②「医師・薬剤師に相談」の帰結 ③出典明記
- 薬の**一般名（成分名）はOK**・商品名はNG
- ページ末尾のDisclaimerに「服薬中は自己判断で併用しない」を追加

### Research
- 出典優先度：①添付文書・FDA Drug Interaction ②Natural Medicines Database ③UpToDate／査読論文
- エビデンス3分類：`established` / `theoretical` / `case-report`
- ソース無しの記載は絶対NG

### Factcheck
- Phase分け必須（全92件×平均3相互作用＝約280件は一括不可）
- 各主張は一次ソース（添付文書・FDA・PubMed）で個別確認

### Product / UIUX
- 既存の「副作用・注意事項」（id="safety"）下に新セクション「飲み合わせ・相互作用」を追加
- FAQ JSON-LDにも組み込み（「[成分] ピル」等のクエリ対応）
- TOCに追加（`{ id: 'interactions', label: '飲み合わせ' }`）

---

## データスキーマ（types.ts追加）

```typescript
export interface Ingredient {
  // ...既存フィールド...
  /** 医薬品・他サプリとの相互作用（併用注意・回避） */
  interactions?: {
    /** 対象物質（一般名・商品名禁止）例: "経口避妊薬（ピル）" "ワルファリン" "SSRI系抗うつ薬" */
    substance: string
    /** 併用レベル：avoid=併用回避 / caution=要注意 / monitor=要経過観察 */
    level: 'avoid' | 'caution' | 'monitor'
    /** 作用機序（1-2文）例: "血栓リスクの増加" "CYP3A4阻害による血中濃度上昇" */
    mechanism: string
    /** 推奨される行動 例: "併用を避ける・医師に相談" "用量調整の可能性・医師に相談" */
    action: string
    /** エビデンス種別：established=添付文書・臨床報告多数 / theoretical=薬理推定 / case-report=事例報告 */
    evidence: 'established' | 'theoretical' | 'case-report'
    /** 出典（添付文書名・FDA・ジャーナル名） */
    source?: string
  }[]
}
```

既存の `contraindications`（妊婦・疾患等）は残す。別物として整理。

---

## UI設計

### 新セクション配置
```
既存：
  safety: 副作用・注意事項（sideEffects + contraindications）
       ↓ この下に追加
新規：
  interactions: 飲み合わせ・医薬品との相互作用
```

### ビジュアル設計
- レベル別カラー：
  - `avoid` → 赤系（border-red-300 bg-red-50）
  - `caution` → amber系（border-amber-300 bg-amber-50）
  - `monitor` → blue系（border-blue-200 bg-blue-50）
- 各アイテムにエビデンスバッジ（established=●実証 / theoretical=○理論 / case-report=△報告）
- セクション末尾に固定文言：
  > 「該当する薬を服用中の方は、自己判断で併用せず、必ず医師・薬剤師に相談してください。」
- 出典は小さく表示（`text-[11px] text-muted-foreground`）

### FAQ JSON-LD 自動生成追加
ingredient page の `faqItems` に以下を追加：
```
Q: [成分名]と薬を一緒に飲んでも大丈夫ですか？
A: [interactions がある場合] [substance]との併用で[mechanism]が報告されています。[action]。服薬中の方は必ず医師に相談してください。
   [ない場合] 現時点で添付文書レベルの重要な相互作用は確認されていませんが、処方薬を服用中の方は念のため医師・薬剤師に相談してください。
```

### TOC追加
`tocSections` 配列に `{ id: 'interactions', label: '飲み合わせ' }` を追加（sideEffectsセクションの直後）。

---

## Phase 1 対象成分（10件）

医薬品相互作用が明確で検索ボリュームが高い成分：

| # | slug | nameJa | 主な相互作用対象薬 |
|---|------|--------|------------------|
| 1 | tranexamic-acid | トラネキサム酸 | 経口避妊薬（ピル）・抗凝固薬 |
| 2 | st-johns-wort | セントジョーンズワート | SSRI・ピル・ワルファリン・免疫抑制剤（多数） |
| 3 | melatonin | メラトニン | ワルファリン・SSRI・ベンゾジアゼピン |
| 4 | magnesium-glycinate | マグネシウムグリシネート | テトラサイクリン・甲状腺薬・ビスホスホネート |
| 5 | vitamin-k2 | ビタミンK2 | ワルファリン |
| 6 | berberine | ベルベリン | CYP3A4基質薬・糖尿病薬・ワルファリン |
| 7 | ashwagandha | アシュワガンダ | 甲状腺薬・免疫抑制剤・鎮静剤・糖尿病薬 |
| 8 | iron | 鉄（該当slug要確認） | テトラサイクリン・甲状腺薬・レボドパ |
| 9 | lions-mane | ヤマブシタケ | 抗凝固薬（理論的） |
| 10 | omega-3 | オメガ3（該当slug要確認） | 抗凝固薬・抗血小板薬 |

※ slug `iron` `omega-3` の正確な名称は data.ts 要確認。存在しない場合は代替成分（例: `fish-oil` 等）に差し替え。

---

## 文面テンプレート（Legal部門承認形）

### 例1：トラネキサム酸 × 経口避妊薬
```
substance: "経口避妊薬（ピル）"
level: "caution"
mechanism: "トラネキサム酸は血液凝固を促進する方向に作用する。ピルも血栓リスクを持つため、併用で血栓症リスクが相加的に高まる可能性が報告されている。"
action: "併用中の方は医師・薬剤師に相談。自己判断での併用は避ける。"
evidence: "established"
source: "第一三共ヘルスケア トランシーノII 添付文書／医薬品インタビューフォーム"
```

### 例2：セントジョーンズワート × SSRI
```
substance: "SSRI系抗うつ薬（パロキセチン等）"
level: "avoid"
mechanism: "両者ともセロトニン再取り込みに影響し、併用でセロトニン症候群のリスクが報告されている。"
action: "併用回避。服薬中は使用しない。医師に相談。"
evidence: "established"
source: "FDA Drug Interaction Warning／PMDA"
```

文面統一ルール：
- `substance` は一般名・カッコ内に補足。商品名禁止。
- `mechanism` は「〜が報告されている」「〜可能性がある」で終える（断定NG）
- `action` は必ず「医師・薬剤師に相談」を含める
- 「治療」「治癒」「改善」の動詞NG（薬機法）

---

## 実装手順（Phase 1）

### Step 1: 型定義拡張
- `src/lib/types.ts` に `interactions` フィールド追加（上記スキーマ）

### Step 2: データ投入（10成分）
- `src/lib/data.ts` の対象10成分にそれぞれ `interactions` 配列を追加
- Factcheck：各相互作用について WebSearch で一次ソース（添付文書・FDA）を確認
- 1相互作用あたり：substance/level/mechanism/action/evidence/source を埋める
- 想定総件数：10成分 × 平均3相互作用 = 約30件

### Step 3: UI実装（ingredient page）
- `src/app/ingredients/[slug]/page.tsx` に新セクション `id="interactions"` を追加（safetyの下）
- レベル別カラーリング
- エビデンスバッジ
- 固定文言「自己判断で併用せず、医師・薬剤師に相談」
- TOC追加

### Step 4: FAQ JSON-LD統合
- 既存 `faqItems` 配列に相互作用Q&A追加
- DOMとJSON-LDで文言一致（dev_checklist タイプB）

### Step 5: Disclaimer強化
- ingredient page末尾のDisclaimerに
  > 「特に処方薬を服用中の方は、サプリメントの併用について必ず医師・薬剤師にご相談ください」
  を追加

### Step 6: 検証
- `npx tsc --noEmit` EXIT=0
- `npm run build` 成功
- Rich Results Test（Google）でFAQ JSON-LDのvalid確認
- 10成分ページを目視確認

---

## 部門チェックリスト（実装時必読）

- [ ] Legal：全 `mechanism` / `action` に断定表現なし
- [ ] Legal：全件「医師・薬剤師に相談」含む
- [ ] Legal：商品名（トランシーノ等）は `source` のみに限定・本文には一般名
- [ ] Research：全件に `source` 明記・`evidence` ランク付与
- [ ] Factcheck：各相互作用主張をWebSearchで確認（推測禁止）
- [ ] UIUX：レベル別カラー識別可能
- [ ] SEO：FAQ JSON-LD と DOM の文言一致
- [ ] SEO：TOC更新・scroll-mt-20 クラス付与

---

## Phase 2以降（参考）

**Phase 2（残り約30成分）**：
- 相互作用報告のある成分：レスベラトロール・コエンザイムQ10・クルクミン・ビタミンE・カルシウム・亜鉛・アルギニン・グリシン・GABA・L-テアニン等
- Phase 1と同じフローで実装

**Phase 3（残り約52成分）**：
- 重要な相互作用なしの成分
- `interactions` には空配列 `[]` を明示的に設定（未調査と区別）
- 該当成分は UI で「現時点で重要な相互作用は報告されていません」表示

---

## 新セッション開始時の指示

新セッションで以下を実行：

```
/Users/raykudo/agescience/brief_interactions_phase1.md を読み込んで、
Phase 1（10成分の飲み合わせ実装）を進めてください。
Step 1-6を順番に実行。Step 2のデータ投入では各相互作用を
WebSearchでファクトチェックしてから書いてください。
```

## 想定作業量
- Phase 1 単体：推定15-20ターン（WebSearch × 30件が主要負荷）
- セッション容量の80%程度で完走できる見込み

## 現在の状態
- 型定義：未実装
- データ：未実装
- UI：未実装
- 設計レビュー：3部門完了（Legal/Research/Factcheck）
