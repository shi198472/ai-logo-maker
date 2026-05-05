import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '案例展示 — AI Logo Maker',
}

export default function CasesPage() {
  const cases = [
    { name: 'Nexus Tech', industry: '科技', desc: '一家AI创业公司的品牌升级，从Logo到整套品牌视觉体系。', logos: ['◯', '◆', '△'], colors: ['#3B82F6', '#8B5CF6'] },
    { name: 'Bloom Coffee', industry: '餐饮', desc: '独立咖啡店的品牌形象设计，温暖而有质感。', logos: ['✦', '★'], colors: ['#F59E0B', '#EF4444'] },
    { name: 'GreenLeaf', industry: '健康', desc: '健康食品品牌的视觉系统，清新自然。', logos: ['◯', '✦'], colors: ['#10B981', '#059669'] },
    { name: 'StarEdu', industry: '教育', desc: '在线教育平台的品牌形象，专业而亲切。', logos: ['★', '⬡'], colors: ['#06B6D4', '#3B82F6'] },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <nav className="mb-8 text-sm text-[#636E72] font-[DM_Sans]">
          <Link href="/" className="hover:text-[#FF6B6B]">首页</Link>
          <span className="mx-2">/</span>
          <span className="text-[#2D3436]">案例</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-bold text-[#2D3436] mb-4 font-[Space_Grotesk]">成功案例</h1>
        <p className="text-lg text-[#636E72] mb-12 font-[DM_Sans]">看看其他创业者用AI Logo Maker打造了怎样的品牌</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((c, i) => (
            <div key={i} className="border border-gray-200 rounded-3xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex -space-x-2">
                  {c.logos.map((logo, j) => (
                    <div key={j}
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-md border-2 border-white"
                      style={{ background: c.colors[j % c.colors.length], zIndex: c.logos.length - j }}
                    >
                      {logo}
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#2D3436] font-[Space_Grotesk]">{c.name}</h3>
                  <span className="text-sm text-[#FF6B6B] font-[DM_Sans]">{c.industry}</span>
                </div>
              </div>
              <p className="text-[#636E72] font-[DM_Sans] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
