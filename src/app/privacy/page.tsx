import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '隐私政策 — AI Logo Maker',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <nav className="mb-8 text-sm text-[#636E72] font-[DM_Sans]">
          <Link href="/" className="hover:text-[#FF6B6B]">首页</Link>
          <span className="mx-2">/</span>
          <span className="text-[#2D3436]">隐私政策</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-bold text-[#2D3436] mb-6 font-[Space_Grotesk]">隐私政策</h1>
        <div className="text-[#636E72] font-[DM_Sans] leading-relaxed space-y-4">
          <p>最后更新：2026年5月</p>
          <h2 className="text-xl font-bold text-[#2D3436] font-[Space_Grotesk] mt-8">1. 信息收集</h2>
          <p>我们收集您在使用AI Logo Maker时提供的信息，包括但不限于：品牌名称、行业选择、设计偏好等。这些信息仅用于生成您的Logo设计方案。</p>
          <h2 className="text-xl font-bold text-[#2D3436] font-[Space_Grotesk] mt-8">2. 信息使用</h2>
          <p>我们使用收集的信息来：提供和优化Logo生成服务；改进我们的AI算法；通过邮件发送重要的服务更新。</p>
          <h2 className="text-xl font-bold text-[#2D3436] font-[Space_Grotesk] mt-8">3. 信息保护</h2>
          <p>我们采用行业标准的安全措施保护您的个人信息，包括SSL加密传输、数据加密存储和严格的访问控制。</p>
          <h2 className="text-xl font-bold text-[#2D3436] font-[Space_Grotesk] mt-8">4. Cookie使用</h2>
          <p>我们使用必要的Cookie来确保网站正常运行。我们也会使用分析Cookie来了解用户如何使用我们的服务，从而持续改进产品体验。</p>
          <h2 className="text-xl font-bold text-[#2D3436] font-[Space_Grotesk] mt-8">5. 第三方服务</h2>
          <p>我们可能使用第三方服务来处理支付和提供分析服务。这些服务提供商仅在其必要范围内访问您的信息，并受到保密协议的约束。</p>
          <h2 className="text-xl font-bold text-[#2D3436] font-[Space_Grotesk] mt-8">6. 联系我们</h2>
          <p>如对隐私政策有任何疑问，请联系我们：privacy@ailogomaker.com</p>
        </div>
      </div>
    </div>
  )
}
