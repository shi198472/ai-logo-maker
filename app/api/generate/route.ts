// Next.js App Router API Route for Logo Generation
// === 多重回退策略获取 Workers AI Binding ===

const INDUSTRY_PROMPTS: Record<string, string> = {
  tech: 'technology company, futuristic, digital innovation, clean professional',
  food: 'restaurant, culinary, food and dining, warm inviting atmosphere',
  education: 'education, learning, knowledge, academic institution',
  health: 'healthcare, medical, wellness, clean trustworthy professional',
  retail: 'retail, shopping, commerce, vibrant modern brand',
  other: 'professional versatile business, clean minimal brand',
};

const STYLE_PROMPTS: Record<string, string> = {
  minimal: 'minimalist logo design, clean lines, simple geometric shapes, flat design, negative space',
  modern: 'modern logo design, sleek contemporary style, bold clean typography, professional',
  vintage: 'vintage retro logo, classic emblem style, timeless elegance, traditional craft',
  tech: 'tech startup logo, circuit patterns, digital aesthetic, futuristic innovation',
  artistic: 'artistic creative logo, expressive unique design, hand-drawn quality, creative',
  cartoon: 'playful fun logo, friendly character style, rounded shapes, cheerful vibrant',
};

const COLOR_SCHEMES = [
  { primary: 'deep blue', secondary: 'purple accent' },
  { primary: 'warm orange', secondary: 'red accent' },
  { primary: 'forest green', secondary: 'teal accent' },
  { primary: 'hot pink', secondary: 'violet accent' },
  { primary: 'bright cyan', secondary: 'blue accent' },
  { primary: 'orange', secondary: 'dark red accent' },
];

interface GenerateBody {
  brandName?: string
  industry?: string
  style?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getWorkersAI(): any {
  // 策略1: 通过 OpenNext Cloudflare Context (Symbol.for)
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctx = (globalThis as any)[Symbol.for("__cloudflare-context__")]
    if (ctx?.env?.AI) return ctx.env.AI
  } catch {/* continue */}

  // 策略2: 直接检查 globalThis.AI (某些 Wrangler 版本会注入)
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((globalThis as any).AI) return (globalThis as any).AI
  } catch {/* continue */}

  // 策略3: 遍历所有 Symbol 属性查找 Cloudflare 上下文
  try {
    const symbols = Object.getOwnPropertySymbols(globalThis)
    for (const sym of symbols) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const val = (globalThis as any)[sym as unknown as string]
      if (val && typeof val === 'object' && val.env) {
        const envAI = val.env.AI
        if (envAI) return envAI
      }
    }
  } catch {/* continue */}

  return null
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as GenerateBody
    const { brandName, industry = 'tech', style = 'modern' } = body

    if (!brandName || brandName.trim().length === 0) {
      return Response.json({ error: '品牌名称不能为空' }, { status: 400 })
    }

    const brand = brandName.trim().slice(0, 50)
    const industryPrompt = INDUSTRY_PROMPTS[industry] || INDUSTRY_PROMPTS.other
    const stylePrompt = STYLE_PROMPTS[style] || STYLE_PROMPTS.modern

    const aiPrompt =
      `Professional minimalist logo design for brand "${brand}". ${industryPrompt}. ${stylePrompt}. ` +
      `Clean white background, centered icon, no text or words, vector style, high contrast, ` +
      `award winning design quality, suitable for commercial use`

    // 获取 Workers AI (多重策略)
    const AI = getWorkersAI()

    if (!AI) {
      console.warn('Workers AI not available, returning fallback')
      return Response.json({
        success: true,
        logos: buildFallbackLogos(brand, industry, style),
        fallback: true,
        message: 'Workers AI not configured. Please check Cloudflare Workers AI binding.',
      })
    }

    if (!AI.run || typeof AI.run !== 'function') {
      console.warn('Workers AI.run not available, returning fallback')
      return Response.json({
        success: true,
        logos: buildFallbackLogos(brand, industry, style),
        fallback: true,
        message: 'Workers AI.run method not available.',
      })
    }

    // 并发生成 6 款不同配色的 Logo
    const tasks = COLOR_SCHEMES.map(async (scheme, i) => {
      try {
        const fullPrompt =
          aiPrompt +
          `, color palette: ${scheme.primary} as dominant color with ${scheme.secondary}`
        const result = (await AI.run(
          '@cf/stabilityai/stable-diffusion-xl-base-1.0',
          {
            prompt: fullPrompt,
            negative_prompt:
              'text, words, letters, watermark, signature, blurry, low quality, distorted, ugly',
            width: 1024,
            height: 1024,
            num_steps: 20,
          }
        )) as { image?: string }

        return {
          id: i + 1,
          name: ['Core', 'Nova', 'Peak', 'Lux', 'Arc', 'Zoe'][i],
          colors: [scheme.primary, scheme.secondary],
          imageData: result?.image || null,
          description: `${stylePrompt.split(' ')[0]} · ${industryPrompt.split(' ')[0]}`,
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Generation failed'
        console.error(`Logo ${i + 1} failed:`, message)
        return {
          id: i + 1,
          name: ['Core', 'Nova', 'Peak', 'Lux', 'Arc', 'Zoe'][i],
          colors: [scheme.primary, scheme.secondary],
          imageData: null,
          error: message,
          description: '',
        }
      }
    })

    const results = await Promise.all(tasks)
    return Response.json({ success: true, logos: results })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('Route error:', msg)
    return Response.json({ error: msg }, { status: 500 })
  }
}

function buildFallbackLogos(brand: string, industry: string, style: string) {
  const industryPrompt = INDUSTRY_PROMPTS[industry] || INDUSTRY_PROMPTS.other
  const stylePrompt = STYLE_PROMPTS[style] || STYLE_PROMPTS.modern
  return COLOR_SCHEMES.map((scheme, i) => ({
    id: i + 1,
    name: ['Core', 'Nova', 'Peak', 'Lux', 'Arc', 'Zoe'][i],
    colors: [scheme.primary, scheme.secondary],
    imageData: null,
    error: null,
    description: `${stylePrompt.split(' ')[0]} · ${industryPrompt.split(' ')[0]}`,
  }))
}
