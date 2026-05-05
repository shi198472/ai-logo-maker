import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '服务条款 — AI Logo Maker',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <nav className="mb-8 text-sm text-[#636E72] font-[DM_Sans]">
          <Link href="/" className="hover:text-[#FF6B6B]">首页</Link>
          <span className="mx-2">/</span>
          <span className="text-[#2D3436]">服务条款</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-bold text-[#2D3436] mb-6 font-[Space_Grotesk]">服务条款</h1>
        <div className="text-[#636E72] font-[DM_Sans] leading-relaxed space-y-4">
          <p>最后更新：2026年5月</p>
          <h2 className="text-xl font-bold text-[#2D3436] font-[Space_Grotesk] mt-8">1. 服务说明</h2>
          <p>AI Logo Maker 提供AI驱动的Logo和品牌视觉设计服务。使用本服务即表示您同意本条款。</p>
          <h2 className="text-xl font-bold text-[#2D3436] font-[Space_Grotesk] mt-8">2. 账户责任</h2>
          <p>您负责维护账户安全，对账户下所有活动负责。如发现未经授权使用，请立即通知我们。</p>
          <h2 className="text-xl font-bold text-[#2D3436] font-[Space_Grotesk] mt-8">3. 知识产权</h2>
          <p>通过付费服务生成的Logo和品牌资产，其知识产权归您所有。免费套餐生成的资产仅供预览，不可商用。</p>
          <h2 className="text-xl font-bold text-[#2D3436] font-[Space_Grotesk] mt-8">4. 退款政策</h2>
          <p>Pro套餐用户在购买后14天内可申请全额退款。Business套餐按月订阅，可随时取消。退款请联系客服。</p>
          <h2 className="text-xl font-bold text-[#2D3436] font-[Space_Grotesk] mt-8">5. 服务限制</h2>
          <p>我们不对AI生成结果的独创性或适用性做出保证。用户有责任在使用生成内容前进行必要的法律审查。</p>
          <h2 className="text-xl font-bold text-[#2D3436] font-[Space_Grotesk] mt-8">6. 条款变更</h2>
          <p>我们保留随时修改条款的权利。重大变更将通过邮件或网站公告通知。继续使用服务即表示接受更新后的条款。</p>
          <h2 className="text-xl font-bold text-[#2D3436] font-[Space_Grotesk] mt-8">7. 联系我们</h2>
          <p>如有任何问题，请联系：legal@ailogomaker.com</p>
        </div>
      </div>
    </div>
  )
}
