import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: 'Agescience — サプリの「本当に効く」を、論文で確かめる',
    template: '%s | Agescience',
  },
  description:
    '悩みを選ぶだけで、論文に基づいたサプリメント推薦が分かる。メタ解析・RCT・コホート研究のエビデンスレベルを透明に示す、科学的サプリ推薦データベース。',
  keywords: ['サプリメント', 'エビデンス', '論文', '老化対策', 'アンチエイジング', '科学的根拠'],
  openGraph: {
    title: 'Agescience — サプリの「本当に効く」を、論文で確かめる',
    description: '悩みを選ぶだけで、論文ランク付きのサプリが分かる。',
    type: 'website',
    locale: 'ja_JP',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={cn("font-sans", geist.variable)}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
