'use client'
import { useState } from 'react'
import Link from 'next/link'

const faqs = [
  { q: '生成Logo可以商用吗？', a: '可以。付费下载即获得完整商用授权书，放心使用于网站、名片、包装、广告等任何商业场景。' },
  { q: '不满意可以修改吗？', a: 'Pro用户60天内可无限次修改调整，包括颜色、字体、图标、布局等，直到满意为止。' },
  { q: '需要安装软件吗？', a: '不需要。浏览器打开即可使用，支持电脑、平板和手机。无需下载或安装任何软件。' },
  { q: '支持哪些导出格式？', a: '支持PNG（多尺寸）、SVG矢量、PDF高清，满足印刷和数字场景需求。' },
  { q: '和Canva/Hatchful有什么区别？', a: '我们是AI智能生成+全品牌套件，不是模板填空。每个Logo根据你的品牌信息独一无二生成，而非从模板库选取。' },
  { q: '可以退款吗？', a: '14天内不满意全额退款，零风险试用。联系客服即可办理，无任何隐藏条件。' },
  { q: 'Logo会不会和别人一样？', a: 'AI每次生成都是独一无二的，结合你的品牌名、行业和风格偏好生成专属方案，无需担心重复。' },
  { q: '支持中文品牌名吗？', a: '支持中英文品牌名，以及80+种语言的品牌名称生成。全球适用。' },
  { q: 'Free套餐有次数限制吗？', a: 'Free套餐提供3次免费生成机会，含PNG水印预览。升级到Pro即可获得完整导出权限。' },
  { q: 'Business套餐适合团队吗？', a: '适合。Business套餐支持无限品牌数×团队成员数，提供品牌指南PDF和API接入，适合代理公司和品牌团队。' },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <nav className="mb-8 text-sm text-[#636E72] font-[DM_Sans]">
          <Link href="/" className="hover:text-[#FF6B6B]">首页</Link>
          <span className="mx-2">/</span>
          <span className="text-[#2D3436]">FAQ</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-bold text-[#2D3436] mb-4 font-[Space_Grotesk]">常见问题</h1>
        <p className="text-lg text-[#636E72] mb-12 font-[DM_Sans]">关于AI Logo Maker，你可能想知道的都在这里</p>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors font-[DM_Sans]"
              >
                <span className="font-semibold text-[#2D3436]">{faq.q}</span>
                <span className={`transform transition-transform ${openIndex === i ? 'rotate-180' : ''} text-[#FF6B6B]`}>▾</span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4 text-[#636E72] font-[DM_Sans] leading-relaxed">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
