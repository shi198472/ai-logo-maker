import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '功能介绍 — AI Logo Maker',
}

export default function FeaturesPage() {
  const features = [
    { icon: '🤖', title: 'AI智能Logo生成', desc: '基于品牌名、行业和风格偏好，AI在10秒内生成4-6个专属Logo方案。每个Logo都是独一无二的，不是模板拼接。' },
    { icon: '✏️', title: '所见即所得的编辑器', desc: '颜色、字体、图标、布局随意调整。拖拽式操作，无需设计经验即可专业编辑。' },
    { icon: '📦', title: '全品牌套件', desc: '不止Logo。自动生成名片、社媒头图（Facebook/LinkedIn/Twitter）、配色方案、品牌字体建议，一站式搞定品牌视觉。' },
    { icon: '📐', title: '多格式导出', desc: '支持PNG（多尺寸）、SVG矢量、PDF高清格式。无论是印刷还是数字场景，都能完美适配。' },
    { icon: '🛡️', title: '商用授权书', desc: '付费下载即获得完整商用授权书，放心用于商业用途。无需额外支付版权费用。' },
    { icon: '🔄', title: '无限次修改', desc: 'Pro用户60天内可无限次修改调整，直到满意为止。每次修改都保留历史版本。' },
    { icon: '🌐', title: '多语言支持', desc: '支持中英文品牌名，以及80+种语言的品牌名称生成。全球适用。' },
    { icon: '📱', title: '全平台适配', desc: '浏览器打开即可使用，支持电脑、平板和手机。无需安装任何软件。' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <nav className="mb-8 text-sm text-[#636E72] font-[DM_Sans]">
          <Link href="/" className="hover:text-[#FF6B6B]">首页</Link>
          <span className="mx-2">/</span>
          <span className="text-[#2D3436]">功能介绍</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-bold text-[#2D3436] mb-4 font-[Space_Grotesk]">功能介绍</h1>
        <p className="text-lg text-[#636E72] mb-12 font-[DM_Sans]">AI Logo Maker 提供一站式品牌视觉解决方案</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-[#FEF9EF] rounded-2xl p-8 flex gap-4">
              <div className="text-5xl flex-shrink-0">{f.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-[#2D3436] mb-2 font-[Space_Grotesk]">{f.title}</h3>
                <p className="text-[#636E72] font-[DM_Sans] leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
