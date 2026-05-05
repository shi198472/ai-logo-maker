import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '关于我们 — AI Logo Maker',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <nav className="mb-8 text-sm text-[#636E72] font-[DM_Sans]">
          <Link href="/" className="hover:text-[#FF6B6B]">首页</Link>
          <span className="mx-2">/</span>
          <span className="text-[#2D3436]">关于</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-bold text-[#2D3436] mb-6 font-[Space_Grotesk]">关于AI Logo Maker</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-[#636E72] font-[DM_Sans] leading-relaxed mb-6">
            AI Logo Maker 诞生于一个简单的想法：<strong className="text-[#2D3436]">每个创业者都应该拥有一个专业的品牌形象，而不需要花几千美元请设计师。</strong>
          </p>
          <p className="text-lg text-[#636E72] font-[DM_Sans] leading-relaxed mb-6">
            我们是一支由AI技术专家和品牌设计师组成的团队，相信AI技术可以大幅降低品牌设计的门槛。
            通过先进的AI生成算法，我们让品牌设计变得像填空一样简单——输入品牌名，选择行业和风格，AI就能在30秒内生成专业水准的Logo和全套品牌视觉方案。
          </p>
          <p className="text-lg text-[#636E72] font-[DM_Sans] leading-relaxed mb-6">
            自上线以来，已有超过12,000位创业者使用AI Logo Maker打造了他们的品牌。
            我们的用户包括电商卖家、自由职业者、YouTube创作者、餐饮店主等各行各业的创业者。
          </p>
          <p className="text-lg text-[#636E72] font-[DM_Sans] leading-relaxed mb-6">
            未来，我们将持续优化AI生成质量，扩展品牌套件的品类，让品牌创建变得更简单、更高效。
          </p>
        </div>
        <div className="mt-12 bg-[#FEF9EF] rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4 font-[Space_Grotesk]">联系我们</h2>
          <p className="text-[#636E72] font-[DM_Sans] mb-2">📧 hello@ailogomaker.com</p>
          <p className="text-[#636E72] font-[DM_Sans]">🌐 ailogomaker.com</p>
        </div>
      </div>
    </div>
  )
}
