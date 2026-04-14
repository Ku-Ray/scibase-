import { AnalyzerClient } from '@/components/AnalyzerClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'サプリ診断 | 今のサプリを7軸で評価 | Agescience',
  description: '今飲んでいるサプリメントを入力すると、抗老化・肌・脳・ストレス・睡眠・免疫・代謝の7軸でカバー状況を可視化。不足している成分もレコメンド。',
}

export default function AnalyzerPage() {
  return <AnalyzerClient />
}
