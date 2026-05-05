'use client'
import { useState } from 'react'

export default function Hero({ onGetStarted }: { onGetStarted?: () => void }) {
  const [brandName, setBrandName] = useState('')
  const [industry, setIndustry] = useState('tech')

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FF6B6B] via-[#4ECDC4] to-[#FFE66D] py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight font-[Space_Grotesk]">
          3分钟，用AI打造你的品牌视觉
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-[DM_Sans]">
          输入品牌名，AI自动生成Logo+名片+社媒头图+配色方案。商用版权全包。
        </p>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-2xl mx-auto shadow-xl">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="输入品牌名称..."
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] font-[DM_Sans]"
            />
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 text-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] font-[DM_Sans]"
            >
              <option value="tech">科技</option>
              <option value="food">餐饮</option>
              <option value="education">教育</option>
              <option value="health">健康</option>
              <option value="retail">零售</option>
              <option value="other">其他</option>
            </select>
          </div>
          <button
            onClick={onGetStarted}
            className="w-full bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-bold py-3 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-[1.02] font-[Space_Grotesk]"
          >
            ✨ 免费生成我的Logo
          </button>
          <p className="text-sm text-gray-400 mt-3 font-[DM_Sans]">无需信用卡 · 30秒出方案</p>
        </div>
      </div>
    </section>
  )
}
