'use client'
import { useState, useEffect } from 'react'

const industries = [
  { value: 'tech', label: '科技', icon: '⬡', color: '#3B82F6' },
  { value: 'food', label: '餐饮', icon: '✦', color: '#F59E0B' },
  { value: 'education', label: '教育', icon: '✧', color: '#8B5CF6' },
  { value: 'health', label: '健康', icon: '＋', color: '#10B981' },
  { value: 'retail', label: '零售', icon: '◆', color: '#EC4899' },
  { value: 'other', label: '其他', icon: '◯', color: '#06B6D4' },
]

const styleConfigs = [
  { value: 'minimal', label: '简洁', symbol: '◯', font: 'sans-serif', shape: 'circle' },
  { value: 'modern', label: '现代', symbol: '◆', font: 'sans-serif', shape: 'hexagon' },
  { value: 'vintage', label: '复古', symbol: '✦', font: 'serif', shape: 'shield' },
  { value: 'tech', label: '科技', symbol: '⬡', font: 'monospace', shape: 'diamond' },
  { value: 'artistic', label: '文艺', symbol: '✧', font: 'cursive', shape: 'oval' },
  { value: 'cartoon', label: '卡通', symbol: '★', font: 'sans-serif', shape: 'cloud' },
]

// Logo生成器：根据品牌名、行业、风格生成唯一SVG
function generateLogoSVG(
  brandName: string,
  industryValue: string,
  styleValue: string,
  colorSet: string[]
): string {
  const industry = industries.find(i => i.value === industryValue) || industries[0]
  const style = styleConfigs.find(s => s.value === styleValue) || styleConfigs[0]
  const [primary, secondary] = colorSet
  const shortName = brandName.slice(0, 3).toUpperCase()

  const symbol = industry.icon
  const shape = style.shape
  const font = style.font

  const shapes: Record<string, string> = {
    circle: `<circle cx="40" cy="40" r="36" fill="${primary}" opacity="0.15"/><circle cx="40" cy="40" r="26" fill="${primary}"/>`,
    hexagon: `<polygon points="40,6 68,23 68,57 40,74 12,57 12,23" fill="${primary}" opacity="0.15"/><polygon points="40,16 60,29 60,51 40,64 20,51 20,29" fill="${primary}"/>`,
    shield: `<path d="M40 6 L70 18 L70 48 Q70 68 40 76 Q10 68 10 48 L10 18 Z" fill="${primary}" opacity="0.15"/><path d="M40 18 L60 26 L60 44 Q60 58 40 64 Q20 58 20 44 L20 26 Z" fill="${primary}"/>`,
    diamond: `<polygon points="40,6 74,40 40,74 6,40" fill="${primary}" opacity="0.15"/><polygon points="40,18 62,40 40,62 18,40" fill="${primary}"/>`,
    oval: `<ellipse cx="40" cy="40" rx="36" ry="28" fill="${primary}" opacity="0.15"/><ellipse cx="40" cy="40" rx="28" ry="20" fill="${primary}"/>`,
    cloud: `<path d="M20,50 Q10,50 10,40 Q10,28 22,26 Q24,16 38,16 Q52,14 56,24 Q70,24 70,36 Q72,48 60,50 Z" fill="${primary}" opacity="0.15"/><path d="M26,46 Q18,46 18,38 Q18,30 26,28 Q28,20 40,20 Q52,18 56,28 Q64,28 64,36 Q66,44 56,46 Z" fill="${primary}"/>`,
  }

  const fonts: Record<string, string> = {
    'sans-serif': 'Arial, Helvetica, sans-serif',
    'serif': 'Georgia, Times New Roman, serif',
    'monospace': 'Courier New, monospace',
    'cursive': 'Comic Sans MS, cursive',
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="white"/>
  <!-- 背景形状 -->
  <g transform="translate(50,30)">
    ${shapes[shape]}
    <!-- 符号 -->
    <text x="40" y="48" text-anchor="middle" fill="white" font-size="20" font-weight="bold" font-family="${fonts[font]}">${symbol}</text>
  </g>
  <!-- 品牌名称 -->
  <text x="100" y="130" text-anchor="middle" fill="${primary}" font-size="22" font-weight="bold" font-family="${fonts[font]}">${shortName}</text>
  <!-- 装饰线 -->
  <rect x="60" y="140" width="80" height="3" rx="1.5" fill="${secondary}"/>
  <!-- 副标题 -->
  <text x="100" y="162" text-anchor="middle" fill="#888888" font-size="11" font-family="Arial, Helvetica, sans-serif">${industry.label}</text>
</svg>`
}

const colorSets = [
  ['#3B82F6', '#8B5CF6'],
  ['#F59E0B', '#EF4444'],
  ['#10B981', '#059669'],
  ['#EC4899', '#8B5CF6'],
  ['#06B6D4', '#3B82F6'],
  ['#F97316', '#DC2626'],
]

interface LogoVariant {
  id: number
  name: string
  colors: string[]
  industry: string
  style: string
  description: string
}

function buildLogoVariants(industryValue: string, styleValue: string): LogoVariant[] {
  const industry = industries.find(i => i.value === industryValue) || industries[0]
  const style = styleConfigs.find(s => s.value === styleValue) || styleConfigs[0]
  const names = ['Core', 'Nova', 'Peak', 'Flux', 'Arc', 'Zoe']
  return names.map((name, i) => ({
    id: i + 1,
    name,
    colors: colorSets[i],
    industry: industry.value,
    style: style.value,
    description: `${style.label} · ${industry.label}`,
  }))
}

// Loading Spinner Component
function LoadingSpinner({ progress }: { progress: number }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-6">
      {/* 旋转Logo动画 */}
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
        <svg className="absolute inset-0 w-24 h-24" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="6" />
          <circle
            cx="50" cy="50" r="45" fill="none"
            stroke="url(#grad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * progress) / 100}
            transform="rotate(-90 50 50)"
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="100%" stopColor="#FF8E53" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl animate-pulse">🤖</span>
        </div>
      </div>

      {/* 进度文字 */}
      <div className="text-center">
        <p className="text-lg font-bold text-[#2D3436] font-[Space_Grotesk] mb-1">AI 正在为你设计 Logo...</p>
        <p className="text-sm text-[#636E72] font-[DM_Sans]">{progress}%</p>
      </div>

      {/* 进度条 */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 步骤提示 */}
      <div className="flex gap-6 text-xs text-[#636E72] font-[DM_Sans]">
        <span className={progress >= 20 ? 'text-[#FF6B6B] font-bold' : ''}>分析品牌特征</span>
        <span className={progress >= 60 ? 'text-[#FF6B6B] font-bold' : ''}>匹配设计方案</span>
        <span className={progress >= 90 ? 'text-[#FF6B6B] font-bold' : ''}>生成品牌标识</span>
      </div>
    </div>
  )
}

interface LogoCardProps {
  variant: LogoVariant
  brandName: string
  selected: boolean
  onSelect: () => void
  onDownload: () => void
}

function LogoCard({ variant, brandName, selected, onSelect, onDownload }: LogoCardProps) {
  const svgContent = generateLogoSVG(brandName, variant.industry, variant.style, variant.colors)
  const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`
  const shortName = brandName.slice(0, 3).toUpperCase()

  return (
    <div
      className={`relative rounded-2xl p-5 flex flex-col items-center gap-3 transition-all border-2 cursor-pointer ${
        selected
          ? 'border-[#FF6B6B] shadow-lg bg-gradient-to-br from-white to-red-50'
          : 'border-gray-100 hover:border-gray-200 hover:shadow-md bg-white'
      }`}
      onClick={onSelect}
    >
      {/* Logo图形区 */}
      <div
        className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100"
        style={{ background: 'white' }}
      >
        <img
          src={svgDataUrl}
          alt={variant.name}
          className="w-full h-full rounded-xl object-contain"
        />
      </div>

      {/* Logo名称 */}
      <div className="text-center">
        <div className="font-bold text-[#2D3436] font-[Space_Grotesk] text-sm">{variant.name}</div>
        <div className="text-xs text-[#636E72] font-[DM_Sans]">{variant.description}</div>
      </div>

      {/* 选中标记 */}
      {selected && (
        <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white text-xs shadow-lg z-10">
          ✓
        </div>
      )}

      {/* 下载按钮（选中时显示） */}
      {selected && (
        <button
          onClick={(e) => { e.stopPropagation(); onDownload() }}
          className="mt-1 px-4 py-1.5 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white text-xs font-bold rounded-lg hover:shadow-md transition-all font-[DM_Sans]"
        >
          ⬇ 下载 SVG
        </button>
      )}
    </div>
  )
}

export default function LogoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [brandName, setBrandName] = useState('')
  const [industry, setIndustry] = useState('tech')
  const [style, setStyle] = useState('modern')
  const [step, setStep] = useState<'input' | 'loading' | 'preview'>('input')
  const [progress, setProgress] = useState(0)
  const [selectedLogo, setSelectedLogo] = useState<number | null>(null)
  const [variants, setVariants] = useState<LogoVariant[]>([])
  const [previewLogo, setPreviewLogo] = useState<LogoVariant | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  if (!isOpen) return null

  const handleGenerate = () => {
    if (!brandName.trim()) return
    setStep('loading')
    setProgress(0)
    setSelectedLogo(null)

    // 模拟AI生成过程
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 15 + 5
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        const newVariants = buildLogoVariants(industry, style)
        setVariants(newVariants)
        setTimeout(() => {
          setStep('preview')
          setProgress(0)
        }, 300)
      }
      setProgress(Math.min(Math.round(p), 100))
    }, 200)
  }

  const handleDownload = (variant: LogoVariant) => {
    const svgContent = generateLogoSVG(brandName, variant.industry, variant.style, variant.colors)
    const blob = new Blob([svgContent], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${brandName}-${variant.name}-logo.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSelectAndClose = () => {
    if (selectedLogo !== null) {
      const variant = variants.find(v => v.id === selectedLogo)
      if (variant) {
        handleDownload(variant)
      }
    }
    onClose()
  }

  const handleReset = () => {
    setStep('input')
    setProgress(0)
    setSelectedLogo(null)
    setVariants([])
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 遮罩层 */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* 模态框 */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in">
        {/* 顶部栏 */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#2D3436] font-[Space_Grotesk]">
            {step === 'input' ? '✨ AI Logo 生成器' : step === 'loading' ? '🤖 AI 创意生成中...' : '🎨 选择你喜欢的 Logo'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 text-lg"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {/* ========== 步骤1：输入 ========== */}
          {step === 'input' && (
            <div className="space-y-6">
              {/* 品牌名输入 */}
              <div>
                <label className="block text-sm font-bold text-[#2D3436] mb-2 font-[Space_Grotesk]">
                  品牌名称 <span className="text-[#FF6B6B]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="例如：星辰科技、美味小馆、未来教育..."
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && brandName.trim() && handleGenerate()}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] font-[DM_Sans] placeholder:text-gray-300"
                  autoFocus
                  maxLength={30}
                />
                <p className="text-xs text-gray-400 mt-1 font-[DM_Sans]">支持中英文，建议2-8个字</p>
              </div>

              {/* 行业选择 */}
              <div>
                <label className="block text-sm font-bold text-[#2D3436] mb-2 font-[Space_Grotesk]">所属行业</label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {industries.map((ind) => (
                    <button
                      key={ind.value}
                      onClick={() => setIndustry(ind.value)}
                      className={`py-2.5 px-3 rounded-xl text-sm font-[DM_Sans] transition-all flex flex-col items-center gap-1 ${
                        industry === ind.value
                          ? 'bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] text-white shadow-md'
                          : 'bg-gray-50 text-[#636E72] hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-lg">{ind.icon}</span>
                      <span className="text-xs font-medium">{ind.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 风格选择 */}
              <div>
                <label className="block text-sm font-bold text-[#2D3436] mb-2 font-[Space_Grotesk]">设计风格</label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {styleConfigs.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setStyle(s.value)}
                      className={`py-3 px-3 rounded-xl text-sm font-[DM_Sans] transition-all flex flex-col items-center gap-1 ${
                        style === s.value
                          ? 'bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] text-white shadow-md'
                          : 'bg-gray-50 text-[#636E72] hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-lg">{s.symbol}</span>
                      <span className="text-xs font-medium">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Logo实时预览（可选增强） */}
              {brandName.trim() && (
                <div className="bg-gradient-to-br from-gray-50 to-red-50 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl shadow-sm"
                    style={{ background: colorSets[industries.findIndex(i => i.value === industry) % 6][0] }}>
                    {industries.find(i => i.value === industry)?.icon}
                  </div>
                  <div>
                    <p className="font-bold text-[#2D3436] font-[Space_Grotesk] text-lg">{brandName}</p>
                    <p className="text-xs text-[#636E72] font-[DM_Sans]">
                      {industries.find(i => i.value === industry)?.label} · {styleConfigs.find(s => s.value === style)?.label}风格
                    </p>
                  </div>
                </div>
              )}

              {/* 生成按钮 */}
              <button
                onClick={handleGenerate}
                disabled={!brandName.trim()}
                className={`w-full py-4 rounded-xl text-lg font-bold font-[Space_Grotesk] transition-all flex items-center justify-center gap-2 ${
                  brandName.trim()
                    ? 'bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>🤖</span>
                <span>立即生成我的 Logo</span>
              </button>
            </div>
          )}

          {/* ========== 步骤2：加载中 ========== */}
          {step === 'loading' && (
            <LoadingSpinner progress={progress} />
          )}

          {/* ========== 步骤3：预览结果 ========== */}
          {step === 'preview' && (
            <div className="space-y-5">
              {/* 品牌信息条 */}
              <div className="flex items-center gap-3 text-sm text-[#636E72] font-[DM_Sans] bg-gradient-to-r from-gray-50 to-red-50 rounded-xl px-4 py-3">
                <span className="font-bold text-[#2D3436] text-base">{brandName}</span>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1">
                  <span>{industries.find(i => i.value === industry)?.icon}</span>
                  <span>{industries.find(i => i.value === industry)?.label}</span>
                </span>
                <span className="text-gray-300">|</span>
                <span>{styleConfigs.find(s => s.value === style)?.label}风格</span>
                <button onClick={handleReset} className="ml-auto text-[#FF6B6B] hover:underline text-xs flex items-center gap-1">
                  ↺ 重新设置
                </button>
              </div>

              {/* 统计信息 */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: '为你生成', value: '6', unit: '款方案' },
                  { label: '生成耗时', value: '<3', unit: '秒' },
                  { label: '版权状态', value: '✓', unit: '可商用' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-gray-50 rounded-xl px-4 py-3 text-center">
                    <div className="font-bold text-[#2D3436] font-[Space_Grotesk] text-lg">{stat.value}</div>
                    <div className="text-xs text-[#636E72] font-[DM_Sans]">{stat.unit}</div>
                  </div>
                ))}
              </div>

              {/* Logo展示网格 */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {variants.map((variant) => (
                  <LogoCard
                    key={variant.id}
                    variant={variant}
                    brandName={brandName}
                    selected={selectedLogo === variant.id}
                    onSelect={() => setSelectedLogo(variant.id === selectedLogo ? null : variant.id)}
                    onDownload={() => handleDownload(variant)}
                  />
                ))}
              </div>

              {/* 底部操作区 */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 text-[#636E72] font-bold font-[Space_Grotesk] hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
                >
                  ↺ 重新生成
                </button>
                <button
                  onClick={handleSelectAndClose}
                  disabled={selectedLogo === null}
                  className={`flex-1 py-3.5 rounded-xl font-bold font-[Space_Grotesk] transition-all flex items-center justify-center gap-2 ${
                    selectedLogo
                      ? 'bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white hover:shadow-xl active:scale-[0.99]'
                      : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  {selectedLogo ? (
                    <>
                      <span>⬇</span>
                      <span>下载所选 Logo</span>
                    </>
                  ) : (
                    <span>👆 请先选择一个 Logo</span>
                  )}
                </button>
              </div>

              <p className="text-center text-xs text-gray-400 font-[DM_Sans]">
                💡 下载文件为 SVG 矢量格式，可商用。支持在设计软件中进一步编辑
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-in { animation: fade-in 0.25s ease-out; }
      `}</style>
    </div>
  )
}
