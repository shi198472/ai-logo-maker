// Next.js App Router API Route for Logo Generation
// === 多重回退策略获取 Workers AI Binding ===

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
];

interface GenerateBody {
  brandName?: string
  industry?: string
  style?: string
}

interface LogoResult {
  id: number
  name: string
  colors: string[]
  imageData: string | null
  error: string | null
  description: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getWorkersAI(): any {
  try {
    const ctx = (globalThis as any)[Symbol.for("__cloudflare-context__")]
    if (ctx?.env?.AI) return ctx.env.AI
  } catch {/* ignore */}
  try {
    if ((globalThis as any).AI) return (globalThis as any).AI
  } catch {/* ignore */}
  try {
    const symbols = Object.getOwnPropertySymbols(globalThis)
    for (const sym of symbols) {
      const val = (globalThis as any)[sym]
      if (val && typeof val === 'object' && val.env && val.env.AI) return val.env.AI
    }
  } catch {/* ignore */}
  return null
}

// 将流/二进制数据转为 base64（支持 5 种格式）
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function streamToBase64(data: any): Promise<string | null> {
  if (!data) return null

  try {
    let arrayBuffer: ArrayBuffer | null = null

    // 方式1: 已经是 ArrayBuffer
    if (data instanceof ArrayBuffer) {
      arrayBuffer = data
    }
    // 方式2: Uint8Array
    else if (data instanceof Uint8Array) {
      arrayBuffer = data.buffer as ArrayBuffer
    }
    // 方式3: ReadableStream - 通过 Response 转换
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    else if (typeof ReadableStream !== 'undefined' && data instanceof (globalThis as any).ReadableStream) {
      arrayBuffer = await new Response(data).arrayBuffer()
    }
    // 方式4: 有 getReader 方法的流对象
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    else if (typeof data.getReader === 'function') {
      const reader = data.getReader()
      const chunks: Uint8Array[] = []
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        if (value) chunks.push(value)
      }
      if (chunks.length === 0) return null
      const totalLen = chunks.reduce((sum, c) => sum + c.length, 0)
      const merged = new Uint8Array(totalLen)
      let offset = 0
      for (const chunk of chunks) {
        merged.set(chunk, offset)
        offset += chunk.length
      }
      arrayBuffer = merged.buffer as ArrayBuffer
    }
    // 方式5: 有 arrayBuffer 方法的 Response 对象
    else if (typeof data.arrayBuffer === 'function') {
      arrayBuffer = await data.arrayBuffer()
    }

    if (!arrayBuffer || arrayBuffer.byteLength === 0) return null

    // ArrayBuffer → base64
    const bytes = new Uint8Array(arrayBuffer)
    let binary = ''
    const chunkSize = 8192
    for (let j = 0; j < bytes.length; j += chunkSize) {
      binary += String.fromCharCode.apply(
        null,
        Array.from(bytes.slice(j, j + chunkSize)) as number[]
      )
    }
    return btoa(binary)
  } catch (e) {
    console.error('streamToBase64 error:', e)
    return null
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as GenerateBody
    const { brandName, industry = 'tech', style = 'modern' } = body

    if (!brandName || brandName.trim().length === 0) {
      return Response.json({ error: '品牌名称不能为空' }, { status: 400 })
    }

    const brand = brandName.trim().slice(0, 50)
    const stylePrompt = STYLE_PROMPTS[style] || STYLE_PROMPTS.modern

    const industryPromptMap: Record<string, string> = {
      tech: 'technology, digital innovation',
      food: 'restaurant, culinary',
      education: 'education, learning',
      health: 'healthcare, medical',
      retail: 'retail, commerce',
      other: 'professional business',
    };
    const industryPrompt = industryPromptMap[industry] || industryPromptMap.other

    const aiPrompt =
      `Professional minimalist logo design for brand "${brand}". ` +
      `${industryPrompt}. ${stylePrompt}. ` +
      `Clean white background, centered icon, no text or words, vector style, high contrast, ` +
      `award winning design quality, suitable for commercial use`

    const AI = getWorkersAI()

    if (!AI) {
      return Response.json({
        success: true, logos: buildFallbackLogos() as LogoResult[],
        fallback: true, message: 'AI not available',
      })
    }

    // 逐一生成 Logo（不并发，避免超限）
    const logos: LogoResult[] = []
    for (let i = 0; i < COLOR_SCHEMES.length; i++) {
      const scheme = COLOR_SCHEMES[i]
      const name = ['Core', 'Nova', 'Peak'][i]
      const fullPrompt = `${aiPrompt}, color palette: ${scheme.primary} as dominant color with ${scheme.secondary}`

      try {
        console.log(`Generating logo ${i + 1}/${COLOR_SCHEMES.length}: ${name}`)
        const result = await AI.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', {
          prompt: fullPrompt,
          negative_prompt: 'text, words, letters, watermark, low quality, ugly',
          width: 512,
          height: 512,
          num_steps: 15,
        })

        const imageData = await streamToBase64(result)

        logos.push({
          id: i + 1, name, colors: [scheme.primary, scheme.secondary],
          imageData, error: imageData ? null : 'Image conversion failed',
          description: `${stylePrompt.split(' ')[0]} · ${industryPrompt.split(' ')[0]}`,
        })
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error'
        console.error(`Logo ${i + 1} (${name}) failed:`, msg)
        logos.push({
          id: i + 1, name, colors: [scheme.primary, scheme.secondary],
          imageData: null, error: msg,
          description: '',
        })
      }
    }

    return Response.json({ success: true, logos })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('Route error:', msg)
    return Response.json({ error: msg, detail: String(err) }, { status: 500 })
  }
}

function buildFallbackLogos(): LogoResult[] {
  return COLOR_SCHEMES.map((scheme, i) => ({
    id: i + 1,
    name: ['Core', 'Nova', 'Peak'][i],
    colors: [scheme.primary, scheme.secondary],
    imageData: null,
    error: null,
    description: '',
  }))
}
