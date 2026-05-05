import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '联系我们 — AI Logo Maker',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <nav className="mb-8 text-sm text-[#636E72] font-[DM_Sans]">
          <Link href="/" className="hover:text-[#FF6B6B]">首页</Link>
          <span className="mx-2">/</span>
          <span className="text-[#2D3436]">联系我们</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-bold text-[#2D3436] mb-4 font-[Space_Grotesk]">联系我们</h1>
        <p className="text-lg text-[#636E72] mb-12 font-[DM_Sans]">有任何问题或建议？我们很乐意听到你的声音</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#FEF9EF] rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-lg font-bold text-[#2D3436] mb-2 font-[Space_Grotesk]">邮件</h3>
            <p className="text-[#636E72] font-[DM_Sans]">hello@ailogomaker.com</p>
            <p className="text-sm text-[#636E72] font-[DM_Sans]">24小时内回复</p>
          </div>
          <div className="bg-[#FEF9EF] rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-lg font-bold text-[#2D3436] mb-2 font-[Space_Grotesk]">在线客服</h3>
            <p className="text-[#636E72] font-[DM_Sans]">工作时间：周一至周五 9:00-18:00</p>
            <p className="text-sm text-[#636E72] font-[DM_Sans]">即刻回复</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-[#2D3436] mb-6 font-[Space_Grotesk]">发送消息</h2>
          <div className="space-y-4">
            <input type="text" placeholder="你的姓名" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] font-[DM_Sans]" />
            <input type="email" placeholder="你的邮箱" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] font-[DM_Sans]" />
            <textarea placeholder="消息内容" rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] font-[DM_Sans]" />
            <button className="bg-[#FF6B6B] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#ff5252] transition-all font-[Space_Grotesk]">发送消息</button>
          </div>
        </div>
      </div>
    </div>
  )
}
