'use client'
import { useState } from 'react'

const faqs = [
  { q: '生成Logo可以商用吗？', a: '可以。付费下载即获得完整商用授权书，放心使用。' },
  { q: '不满意可以修改吗？', a: 'Pro用户60天内可无限次修改调整，直到满意为止。' },
  { q: '需要安装软件吗？', a: '不需要。浏览器打开即可使用，支持电脑和手机。' },
  { q: '支持哪些导出格式？', a: 'PNG(多尺寸)、SVG矢量、PDF高清，满足印刷和数字场景。' },
  { q: '和Canva/Hatchful有什么区别？', a: '我们是AI智能生成+全品牌套件，不是模板填空，每个Logo独一无二。' },
  { q: '可以退款吗？', a: '14天内不满意全额退款，零风险试用。' },
  { q: 'Logo会不会和别人一样？', a: 'AI每次生成都是独一无二的，无需担心重复。' },
  { q: '支持中文品牌名吗？', a: '支持中英文品牌名，以及80+种语言的品牌名称生成。' },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-12 text-center font-[Space_Grotesk]">常见问题</h2>
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
                <div className="px-6 pb-4 text-[#636E72] font-[DM_Sans]">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
