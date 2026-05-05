'use client'
import { useState, useEffect, useRef } from 'react'

const industries = [
  { value: 'tech', label: '科技', emoji: '⬡' },
  { value: 'food', label: '餐饮', emoji: '✦' },
  { value: 'education', label: '教育', emoji: '✧' },
  { value: 'health', label: '健康', emoji: '＋' },
  { value: 'retail', label: '零售', emoji: '◆' },
  { value: 'other', label: '其他', emoji: '◯' },
]

const styles = [
  { value: 'minimal', label: '简洁', emoji: '◯' },
  { value: 'modern', label: '现代', emoji: '◆' },
  { value: 'vintage', label: '复古', emoji: '✧' },
  { value: 'tech', label: '科技', emoji: '⬡' },
  { value: 'artistic', label: '文艺', emoji: '✦' },
  { value: 'cartoon', label: '卡通', emoji: '★' },
]

interface LogoResult {
  id: number
  name: string
  colors: string[]
  imageData: string | null  // base64
  error?: string
}

export default function LogoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [brandName, setBrandName] = useState('')
  const [industry, setIndustry] = useState('tech')
  const [style, setStyle] = useState('modern')
  const [step, setStep] = useState<'input' | 'loading' | 'preview'>('input')
  const [progress, setProgress] = useState(0)
  const [logos, setLogos] = useState<LogoResult[]>([])
  const [selectedLogo, setSelectedLogo] = useState<number | null>(null)
  const progressRef = useRef(true)

  // 检测 Cloudflare 环境
  const isCloudflare = typeof window !== 'undefined' && window.location.hostname.includes('pages.dev')

  useEffect(() => {
    if (step === 'loading') {
      setProgress(0)
      progressRef.current = true
      let p = 0
      const tick = () => {
        if (!progressRef.current) return
        p += Math.random() * 12 + 3
        if (p >= 95) p = 95
        setProgress(Math.round(p))
        if (progressRef.current) setTimeout(tick, 300)
      }
      tick()
      return () => { progressRef.current = false }
    }
  }, [step])

  const handleGenerate = async () => {
    if (!brandName.trim()) return

    setStep('loading')
    setSelectedLogo(null)
    setLogos([])

    try {
      // 调用 Cloudflare Function API
      const resp = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brandName, industry, style }),
      })

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({})) as { error?: string }
        throw new Error(errData.error || `HTTP ${resp.status}`)
      }

      const data = await resp.json() as { logos?: LogoResult[] }
      setProgress(100)

      setTimeout(() => {
        setLogos(data.logos || [])
        setStep('preview')
      }, 500)
    } catch (err: any) {
      console.error('生成失败:', err)
      // 降级：生成占位符
      const fallback = Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        name: ['Core', 'Nova', 'Peak', 'Lux', 'Arc', 'Zoe'][i],
        colors: [['#3B82F6', '#8B5CF6'], ['#F59E0B', '#EF4444'], ['#10B981', '#059669'],
          ['#EC4899', '#8B5CF6'], ['#06B6D4', '#3B82F6'], ['#F97316', '#DC2626']][i],
        imageData: null,
        error: err.message || '生成失败，请稍后重试',
      }))
      setProgress(100)
      setTimeout(() => {
        setLogos(fallback)
        setStep('preview')
      }, 500)
    }
  }

  const downloadAsPNG = async (logo: LogoResult) => {
    if (!logo.imageData) return
    const link = document.createElement('a')
    link.href = `data:image/png;base64,${logo.imageData}`
    link.download = `${brandName}-${logo.name}-logo.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const downloadAsSVG = (logo: LogoResult) => {
    if (!logo.imageData) return
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
      <rect width="512" height="512" fill="white"/>
      <image href="data:image/png;base64,${logo.imageData}" x="0" y="0" width="512" height="512"/>
    </svg>`
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${brandName}-${logo.name}-logo.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSelectAndClose = () => {
    if (selectedLogo !== null) {
      const logo = logos.find(l => l.id === selectedLogo)
      if (logo) downloadAsPNG(logo)
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in">
        {/* 顶部栏 */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#2D3436] font-[Space_Grotesk]">
            {step === 'input' ? '✨ AI Logo 生成器' : step === 'loading' ? '🤖 AI 创意生成中...' : '🎨 选择你喜欢的 Logo'}
          </h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 text-lg transition-colors">✕</button>
        </div>

        <div className="p-6">
          {step === 'input' && (
            // ===== 步骤1：输入 =====
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#2D3436] mb-2 font-[Space_Grotesk]">品牌名称 <span className="text-[#FF6B6B]">*</span></label>
                <input
                  type="text" placeholder="例如：星辰科技、美味小馆、未来教育..."
                  value={brandName} onChange={e => setBrandName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && brandName.trim() && handleGenerate()}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] font-[DM_Sans] placeholder:text-gray-300"
                  autoFocus maxLength={30}
                />
                <p className="text-xs text-gray-400 mt-1 font-[DM_Sans]">支持中英文，建议2-8个字</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#2D3436] mb-2 font-[Space_Grotesk]">所属行业</label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {industries.map(ind => (
                    <button key={ind.value} onClick={() => setIndustry(ind.value)}
                      className={`py-2.5 px-3 rounded-xl text-sm font-[DM_Sans] transition-all flex flex-col items-center gap-1 ${
                        industry === ind.value ? 'bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] text-white shadow-md' : 'bg-gray-50 text-[#636E72] hover:bg-gray-100'
                      }`}>
                      <span className="text-lg">{ind.emoji}</span>
                      <span className="text-xs font-medium">{ind.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#2D3436] mb-2 font-[Space_Grotesk]">设计风格</label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {styles.map(s => (
                    <button key={s.value} onClick={() => setStyle(s.value)}
                      className={`py-3 px-3 rounded-xl text-sm font-[DM_Sans] transition-all flex flex-col items-center gap-1 ${
                        style === s.value ? 'bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] text-white shadow-md' : 'bg-gray-50 text-[#636E72] hover:bg-gray-100'
                      }`}>
                      <span className="text-lg">{s.emoji}</span>
                      <span className="text-xs font-medium">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {brandName.trim() && (
                <div className="bg-gradient-to-br from-gray-50 to-red-50 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-[#FF6B6B] flex items-center justify-center text-white text-2xl font-bold shadow-sm">
                    {brandName.slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-bold text-[#2D3436] font-[Space_Grotesk] text-lg">{brandName}</p>
                    <p className="text-xs text-[#636E72] font-[DM_Sans]">
                      {industries.find(i => i.value === industry)?.label} · {styles.find(s => s.value === style)?.label}风格
                    </p>
                  </div>
                </div>
              )}

              <button onClick={handleGenerate} disabled={!brandName.trim()}
                className={`w-full py-4 rounded-xl text-lg font-bold font-[Space_Grotesk] transition-all flex items-center justify-center gap-2 ${
                  brandName.trim()
                    ? 'bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}>
                <span>🤖</span><span>立即生成我的 Logo</span>
              </button>

              {!isCloudflare && (
                <p className="text-center text-xs text-amber-500 font-[DM_Sans]">⚠️ 当前为本地预览，AI 生成需部署到 Cloudflare 后使用</p>
              )}
            </div>
          )}

          {step === 'loading' && (
            // ===== 步骤2：加载动画 =====
            <div className="flex flex-col items-center justify-center py-12 gap-6">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
                <svg className="absolute inset-0 w-24 h-24" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="6" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke="url(#grad2)" strokeWidth="6"
                    strokeLinecap="round" strokeDasharray="283"
                    strokeDashoffset={283 - (283 * progress) / 100} transform="rotate(-90 50 50)" />
                  <defs>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF6B6B" />
                      <stop offset="100%" stopColor="#FF8E53" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl animate-pulse">🤖</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-[#2D3436] font-[Space_Grotesk] mb-1">AI 正在为你设计 Logo...</p>
                <p className="text-sm text-[#636E72] font-[DM_Sans]">{progress}%</p>
              </div>
              <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex gap-6 text-xs text-[#636E72] font-[DM_Sans]">
                <span className={progress >= 20 ? 'text-[#FF6B6B] font-bold' : ''}>分析品牌特征</span>
                <span className={progress >= 60 ? 'text-[#FF6B6B] font-bold' : ''}>AI 绘制方案</span>
                <span className={progress >= 90 ? 'text-[#FF6B6B] font-bold' : ''}>生成品牌标识</span>
              </div>
            </div>
          )}

          {step === 'preview' && (
            // ===== 步骤3：预览结果 =====
            <div className="space-y-5">
              <div className="flex items-center gap-3 text-sm text-[#636E72] font-[DM_Sans] bg-gradient-to-r from-gray-50 to-red-50 rounded-xl px-4 py-3">
                <span className="font-bold text-[#2D3436] text-base">{brandName}</span>
                <span className="text-gray-300">|</span>
                <span>{industries.find(i => i.value === industry)?.label}</span>
                <span className="text-gray-300">|</span>
                <span>{styles.find(s => s.value === style)?.label}风格</span>
                <button onClick={() => { setStep('input'); setLogos([]) }} className="ml-auto text-[#FF6B6B] hover:underline text-xs">↺ 重新设置</button>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { label: '为你生成', value: logos.length.toString(), unit: '款方案' },
                  { label: '生成方式', value: logos[0]?.imageData ? 'AI' : '演示', unit: logos[0]?.imageData ? '' : '(离线)' },
                  { label: '版权状态', value: '✓', unit: '可商用' },
                ].map(stat => (
                  <div key={stat.label} className="bg-gray-50 rounded-xl px-4 py-3">
                    <div className="font-bold text-[#2D3436] font-[Space_Grotesk] text-lg">{stat.value} {stat.unit}</div>
                    <div className="text-xs text-[#636E72] font-[DM_Sans]">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {logos.map(logo => (
                  <LogoCard
                    key={logo.id}
                    logo={logo}
                    brandName={brandName}
                    selected={selectedLogo === logo.id}
                    onSelect={() => setSelectedLogo(selectedLogo === logo.id ? null : logo.id)}
                    onDownloadPNG={() => downloadAsPNG(logo)}
                    onDownloadSVG={() => downloadAsSVG(logo)}
                  />
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => { setStep('input'); setLogos([]) }}
                  className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 text-[#636E72] font-bold font-[Space_Grotesk] hover:bg-gray-50 hover:border-gray-300 transition-all">
                  ↺ 重新生成
                </button>
                <button onClick={handleSelectAndClose} disabled={selectedLogo === null}
                  className={`flex-1 py-3.5 rounded-xl font-bold font-[Space_Grotesk] transition-all flex items-center justify-center gap-2 ${
                    selectedLogo
                      ? 'bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white hover:shadow-xl active:scale-[0.99]'
                      : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  }`}>
                  {selectedLogo ? <><span>⬇</span><span>下载所选 Logo</span></> : <span>👆 请先选择一个 Logo</span>}
                </button>
              </div>

              <p className="text-center text-xs text-gray-400 font-[DM_Sans]">
                💡 选中 Logo 后可下载 PNG 或 SVG 格式，支持在设计软件中进一步编辑
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        .animate-in { animation: fade-in 0.25s ease-out; }
      `}</style>
    </div>
  )
}

// ===== Logo卡片子组件 =====
function LogoCard({ logo, brandName, selected, onSelect, onDownloadPNG, onDownloadSVG }: any) {
  const hasImage = !!logo.imageData

  return (
    <div
      onClick={onSelect}
      className={`relative rounded-2xl p-4 flex flex-col items-center gap-3 transition-all border-2 cursor-pointer ${
        selected ? 'border-[#FF6B6B] shadow-lg bg-gradient-to-br from-white to-red-50' : 'border-gray-100 hover:border-gray-200 hover:shadow-md bg-white'
      }`}
    >
      {/* Logo图片区 */}
      <div className="w-28 h-28 rounded-2xl flex items-center justify-center overflow-hidden bg-gray-50 border border-gray-100">
        {hasImage ? (
          <img src={`data:image/png;base64,${logo.imageData}`} alt={logo.name}
            className="w-full h-full object-contain p-2" />
        ) : (
          <div className="text-center">
            <div className="text-3xl mb-1">{['⬡','✦','✧','＋','◆','◯'][logo.id - 1]}</div>
            <div className="text-xs text-gray-400 font-[DM_Sans]">{logo.error ? 'AI 离线' : logo.name}</div>
          </div>
        )}
      </div>

      <div className="text-center">
        <div className="font-bold text-[#2D3436] font-[Space_Grotesk] text-sm">{logo.name}</div>
        <div className="text-xs text-[#636E72] font-[DM_Sans]">{logo.colors.join(' · ')}</div>
      </div>

      {selected && (
        <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white text-xs shadow-lg z-10">✓</div>
      )}

      {/* 下载按钮 */}
      {selected && hasImage && (
        <div className="flex gap-2 w-full">
          <button onClick={(e) => { e.stopPropagation(); onDownloadPNG() }}
            className="flex-1 py-1.5 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white text-xs font-bold rounded-lg hover:shadow-md transition-all font-[DM_Sans]">
            ⬇ PNG
          </button>
          <button onClick={(e) => { e.stopPropagation(); onDownloadSVG() }}
            className="flex-1 py-1.5 border-2 border-[#FF6B6B] text-[#FF6B6B] text-xs font-bold rounded-lg hover:bg-red-50 transition-all font-[DM_Sans]">
            ⬇ SVG
          </button>
        </div>
      )}
    </div>
  )
}
