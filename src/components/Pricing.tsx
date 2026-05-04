export default function Pricing() {
  const plans = [
    { name: 'Free', price: '$0', note: '永久免费', features: ['水印预览', '3次生成机会', 'PNG(低清)'], cta: '开始免费试用', featured: false },
    { name: 'Pro', price: '$19.9', note: '单次购买', features: ['全品牌套件×1', 'SVG矢量导出', '商用授权书', '60天内可修改'], cta: '选择Pro', featured: true },
    { name: 'Business', price: '$99', note: '/月', features: ['无限品牌×团队', '品牌指南PDF', '优先支持', '团队协作'], cta: '选择Business', featured: false },
  ]
  return (
    <section className="py-20 px-4 bg-[#FEF9EF]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-4 font-[Space_Grotesk]">简单透明的定价</h2>
        <p className="text-[#636E72] mb-12 font-[DM_Sans]">Pro年付仅 $399/年 (省32%) · 14天无条件退款</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((p, i) => (
            <div key={i} className={`rounded-2xl p-8 text-left ${p.featured ? 'bg-[#FF6B6B] text-white scale-105 shadow-xl' : 'bg-white shadow-sm'}`}>
              <h3 className={`text-2xl font-bold mb-2 font-[Space_Grotesk] ${p.featured ? 'text-white' : 'text-[#2D3436]'}`}>{p.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold font-[Space_Grotesk]">{p.price}</span>
                <span className={`ml-1 font-[DM_Sans] ${p.featured ? 'text-white/80' : 'text-[#636E72]'}`}>{p.note}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 font-[DM_Sans]">
                    <span>✅</span> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-bold font-[Space_Grotesk] transition-all ${p.featured ? 'bg-white text-[#FF6B6B] hover:bg-gray-100' : 'bg-[#2D3436] text-white hover:bg-[#1a1f1f]'}`}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
