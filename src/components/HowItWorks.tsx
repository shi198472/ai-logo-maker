export default function HowItWorks() {
  const steps = [
    { num: '1', icon: '🎯', title: '输入品牌信息', desc: '输入品牌名，选择行业和风格偏好' },
    { num: '2', icon: '🤖', title: 'AI智能生成', desc: '10秒内生成4-6个专属Logo方案' },
    { num: '3', icon: '✏️', title: '自由微调', desc: '调整颜色、字体、图标，直到满意' },
    { num: '4', icon: '📦', title: '一键打包', desc: 'Logo+名片+社媒图+配色方案，全部导出' },
  ]
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-4 font-[Space_Grotesk]">
          4步搞定，比点外卖还快
        </h2>
        <p className="text-[#636E72] mb-12 font-[DM_Sans]">从输入品牌名到下载品牌套件，全程不超过5分钟</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              <div className="text-5xl mb-4">{s.icon}</div>
              <div className="w-10 h-10 rounded-full bg-[#FF6B6B] text-white flex items-center justify-center font-bold mx-auto mb-3 font-[Space_Grotesk]">{s.num}</div>
              <h3 className="text-xl font-bold text-[#2D3436] mb-2 font-[Space_Grotesk]">{s.title}</h3>
              <p className="text-[#636E72] font-[DM_Sans]">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 relative">
          <div className="h-1 bg-gradient-to-r from-[#FF6B6B] via-[#4ECDC4] to-[#FFE66D] rounded-full max-w-4xl mx-auto" />
        </div>
      </div>
    </section>
  )
}
