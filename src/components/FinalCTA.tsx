export default function FinalCTA({ onGetStarted }: { onGetStarted?: () => void }) {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#FF6B6B] via-[#4ECDC4] to-[#FFE66D]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-[Space_Grotesk]">
          你的品牌，值得一个专业的开始
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-8 font-[DM_Sans]">
          已有 12,000+ 创业者用AI Logo Maker打造了品牌。下一个就是你。
        </p>
        <button
          onClick={onGetStarted}
          className="bg-white text-[#2D3436] hover:bg-gray-100 font-bold py-4 px-10 rounded-xl text-lg transition-all transform hover:scale-105 font-[Space_Grotesk]"
        >
          🚀 免费生成我的Logo
        </button>
      </div>
    </section>
  )
}
