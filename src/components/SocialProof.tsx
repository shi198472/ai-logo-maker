export default function SocialProof() {
  const reviews = [
    { text: '花了$500找设计师做Logo，改了三稿都不满意。用AI Logo Maker 3分钟搞定，比我找设计师的那版好10倍。', author: 'Sarah L.', role: '电商创业者' },
    { text: '原来以为AI做的Logo会很假，结果生成的效果直接用了。还顺带帮我做了名片和社媒图，省了$1000。', author: 'James C.', role: '自由职业者' },
    { text: '从输入品牌名到下载品牌套件，一共5分钟。商用授权书也一起给了，省心。', author: 'Mike T.', role: 'YouTube创作者' },
  ]
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-4 font-[Space_Grotesk]">
          12,000+ 创业者已经用AI Logo Maker打造了品牌
        </h2>
        <div className="flex justify-center gap-8 mb-12 flex-wrap">
          {[
            { num: '⭐ 4.8/5', label: '用户满意度' },
            { num: '⏱ 83秒', label: '平均出方案' },
            { num: '🏪 200+', label: '覆盖行业' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold text-[#FF6B6B] font-[Space_Grotesk]">{s.num}</div>
              <div className="text-[#636E72] font-[DM_Sans]">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-[#FEF9EF] rounded-2xl p-6 text-left shadow-sm">
              <p className="text-[#2D3436] mb-4 font-[DM_Sans] leading-relaxed">"{r.text}"</p>
              <div>
                <div className="font-bold text-[#2D3436] font-[Space_Grotesk]">{r.author}</div>
                <div className="text-sm text-[#636E72] font-[DM_Sans]">{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
