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
            <li>功能</li><li>定价</li><li>案例</li><li>FAQ</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-3 font-[Space_Grotesk]">公司</h4>
          <ul className="space-y-2 text-sm font-[DM_Sans]">
            <li>关于</li><li>博客</li><li>合作伙伴</li><li>联系我们</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-3 font-[Space_Grotesk]">法律</h4>
          <ul className="space-y-2 text-sm font-[DM_Sans]">
            <li>隐私政策</li><li>服务条款</li><li>Cookie政策</li><li>退款政策</li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-white/20 text-center text-sm font-[DM_Sans]">
        © 2026 AI Logo Maker. All rights reserved.
      </div>
    </footer>
  )
}
