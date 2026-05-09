// AI 深度诊断端点 - 实际调用 AI 模型测试
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getWorkersAI(): any {
  try {
    const ctx = (globalThis as any)[Symbol.for("__cloudflare-context__")]
    if (ctx?.env?.AI) return ctx.env.AI
  } catch {/* continue */}
  try {
    if ((globalThis as any).AI) return (globalThis as any).AI
  } catch {/* continue */}
  try {
    const symbols = Object.getOwnPropertySymbols(globalThis)
    for (const sym of symbols) {
      const val = (globalThis as any)[sym]
      if (val && typeof val === 'object' && val.env) {
        if (val.env.AI) return val.env.AI
      }
    }
  } catch {/* continue */}
  return null
}

interface TestResult {
  name: string
  success?: boolean
  started?: boolean
  error?: string
  error_name?: string
  error_stack?: string | null
  response_type?: string
  response_isArrayBuffer?: boolean
  response_constructor?: string
  response_size?: number | null
  response_keys?: string[]
  response_json?: string
  response_value?: string
  decoded_text?: string
}

export async function GET(): Promise<Response> {
  const AI = getWorkersAI()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tests: TestResult[] = []
  const aiMethods = AI
    ? Object.getOwnPropertyNames(Object.getPrototypeOf(AI)).concat(Object.keys(AI))
    : []

  if (!AI) {
    return Response.json({ ai_found: false, tests, error: 'AI binding not found' })
  }

  // 测试1: 尝试调用 AI.run 查看是否报错（使用最小的文本模型）
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resp: any = await AI.run('@cf/meta/llama-3-8b-instruct', {
      prompt: 'Say "OK"',
      max_tokens: 10,
    })
    const t: TestResult = { name: 'AI.run() Llama-3 test', success: true }
    t.response_type = typeof resp
    t.response_isArrayBuffer = resp instanceof ArrayBuffer
    t.response_constructor = resp?.constructor?.name

    if (resp instanceof ArrayBuffer) {
      const decoder = new TextDecoder()
      t.decoded_text = decoder.decode(resp).slice(0, 200)
      t.response_size = resp.byteLength
    } else if (typeof resp === 'object' && resp !== null) {
      t.response_keys = Object.keys(resp)
      try { t.response_json = JSON.stringify(resp).slice(0, 300) } catch { /* ignore */ }
    } else {
      t.response_value = String(resp).slice(0, 200)
    }
    tests.push(t)
  } catch (e: unknown) {
    tests.push({
      name: 'AI.run() Llama-3 test',
      success: false,
      error: e instanceof Error ? e.message : String(e),
      error_name: e instanceof Error ? e.name : typeof e,
    })
  }

  // 测试2: 尝试 SD 模型
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sdResp: any = await AI.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', {
      prompt: 'A simple red circle on white background, minimal',
      width: 256,
      height: 256,
      num_steps: 5,
    })
    const t: TestResult = { name: 'Stable Diffusion test', success: true }
    t.response_type = typeof sdResp
    t.response_isArrayBuffer = sdResp instanceof ArrayBuffer
    t.response_constructor = sdResp?.constructor?.name
    t.response_size = sdResp instanceof ArrayBuffer ? sdResp.byteLength : null
    tests.push(t)
  } catch (e: unknown) {
    tests.push({
      name: 'Stable Diffusion test',
      success: false,
      error: e instanceof Error ? e.message : String(e),
      error_name: e instanceof Error ? e.name : typeof e,
    })
  }

  return Response.json({
    ai_found: true,
    ai_type: typeof AI,
    ai_methods: aiMethods,
    tests,
  })
}
