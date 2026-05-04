import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Logo Maker — 3分钟AI生成专属Logo+品牌套件 | 商用版权',
  description: '输入品牌名，AI自动生成Logo、名片、社媒头图、配色方案。12000+创业者选择。无需设计经验，30秒出方案。',
  openGraph: {
    title: 'AI Logo Maker — 3分钟打造你的品牌视觉',
    description: 'AI智能生成Logo+品牌套件，商用版权全包。免费试用。',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="font-sans bg-warm-bg text-dark-text">{children}</body>
    </html>
  )
}
