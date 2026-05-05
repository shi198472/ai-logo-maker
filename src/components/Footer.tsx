export default function Footer() {
  return (
    <footer className="bg-[#2D3436] text-white/80 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="text-xl font-bold text-white mb-4 font-[Space_Grotesk]">AI Logo Maker</div>
          <p className="text-sm font-[DM_Sans]">3分钟打造你的品牌视觉</p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-3 font-[Space_Grotesk]">产品</h4>
          <ul className="space-y-2 text-sm font-[DM_Sans]">
            <li><a href="/features" className="hover:text-white transition-colors">功能</a></li>
            <li><a href="/pricing" className="hover:text-white transition-colors">定价</a></li>
            <li><a href="/cases" className="hover:text-white transition-colors">案例</a></li>
            <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-3 font-[Space_Grotesk]">公司</h4>
          <ul className="space-y-2 text-sm font-[DM_Sans]">
            <li><a href="/about" className="hover:text-white transition-colors">关于</a></li>
            <li><a href="/about" className="hover:text-white transition-colors">博客</a></li>
            <li><a href="/about" className="hover:text-white transition-colors">合作伙伴</a></li>
            <li><a href="/contact" className="hover:text-white transition-colors">联系我们</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-3 font-[Space_Grotesk]">法律</h4>
          <ul className="space-y-2 text-sm font-[DM_Sans]">
            <li><a href="/privacy" className="hover:text-white transition-colors">隐私政策</a></li>
            <li><a href="/terms" className="hover:text-white transition-colors">服务条款</a></li>
            <li><a href="/privacy" className="hover:text-white transition-colors">Cookie政策</a></li>
            <li><a href="/terms" className="hover:text-white transition-colors">退款政策</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-white/20 text-center text-sm font-[DM_Sans]">
        © 2026 AI Logo Maker. All rights reserved.
      </div>
    </footer>
  )
}
