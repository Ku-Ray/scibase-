<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# SEO部門レビュー必須ルール

SciBase の全開発作業で、着手前と完了後にSEO部門の観点でレビューを行う。基盤を崩すと検索流入が直接消えるため、例外なし。

## 参照ファイル

- `/Users/raykudo/secretary_bot/departments/seo/config.json` — 専門知識体系・優先対応リスト
- `/Users/raykudo/secretary_bot/departments/seo/dev_checklist.md` — タイプ別チェックリスト

## 適用フロー

1. **着手前**：開発タスクのタイプ（A〜E）を特定し、dev_checklist.md の該当セクションを読み込む
2. **実装中**：チェックリストの必須項目を満たすよう実装
3. **完了前**：全項目をセルフレビュー。満たせない項目はユーザーに判断を仰ぐ
4. **完了後**：`npx tsc --noEmit` と `npm run build` で検証
5. **デプロイ後**：Rich Results Test と Twitter Card Validator で本番確認

## 絶対に崩してはいけない項目

- canonical URL（重複インデックスの致命傷）
- h1 の唯一性
- JSON-LD と DOM の文言一致
- sitemap への登録
- 動的ルートの generateStaticParams

## 頭の中でチェックリストを済ませない

config.json と dev_checklist.md を**実際に読み込んで**適用する。config参照なしのレビューは無効。
