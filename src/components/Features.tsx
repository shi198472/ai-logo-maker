export default function Features() {
  const features = [
    { icon: '🎨', title: 'AI智能设计', desc: '基于行业+风格，生成专业级Logo，不是模板拼接' },
    { icon: '✏️', title: '灵活自定义', desc: '颜色、字体、图标随意调，所见即所得' },
    { icon: '📦', title: '品牌套件', desc: 'Logo+名片+社媒头图+配色方案，一站式配齐' },
    { icon: '🔒', title: '商用版权', desc: '生成内容全归你，提供商用授权书，放心使用' },
  ]
  return (
    <section className="py-20 px-4 bg-[#A8E6CF]/20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-12 font-[Space_Grotesk]">
          为什么创业者都选AI Logo Maker？
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow text-left flex gap-4">
              <div className="text-5xl flex-shrink-0">{f.icon}</div>
              <div>
                <h3 className="text-2xl font-bold text-[#2D3436] mb-2 font-[Space_Grotesk]">{f.title}</h3>
                <p className="text-[#636E72] font-[DM_Sans] text-lg">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
