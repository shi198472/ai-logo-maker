// AI 深度诊断端点 - 实际调用 AI 模型测试
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getWorkersAI(): any {
  try { const ctx = (globalThis as any)[Symbol.for("__cloudflare-context__")]; if (ctx?.env?.AI) return ctx.env.AI } catch {/**/}
  try { if ((globalThis as any).AI) return (globalThis as any).AI } catch {/**/}
  try { const symbols = Object.getOwnPropertySymbols(globalThis); for (const sym of symbols) { const val = (globalThis as any)[sym]; if (val && typeof val === 'object' && val.env && val.env.AI) return val.env.AI } } catch {/**/}
  return null
}

interface TestRes { name: string; success?: boolean; error?: string; data?: string; size?: number }

export async function GET(): Promise<Response> {
  const AI = getWorkersAI()
  const tests: TestRes[] = []

  if (!AI) return Response.json({ ai_found: false, tests, error: 'AI not found' })

  // 测试: 读取 SD 模型的实际输出
  try {
    const result = await AI.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', {
      prompt: 'A simple red circle on white background',
      width: 256, height: 256, num_steps: 5,
    })

    const t: TestRes = { name: 'SD ReadableStream test', success: true }
    t.data = JSON.stringify({
      type: typeof result,
      constructor: result?.constructor?.name,
      isArrayBuffer: result instanceof ArrayBuffer,
      isUint8Array: result instanceof Uint8Array,
      hasGetReader: typeof result?.getReader === 'function',
      hasArrayBuffer: typeof result?.arrayBuffer === 'function',
      keys: typeof result === 'object' ? Object.keys(result).slice(0, 10) : [],
    })

    // 尝试通过 Response 转换
    try {
      const resp = new Response(result)
      const buf = await resp.arrayBuffer()
      t.size = buf.byteLength
    } catch (e2: unknown) {
      t.error = String(e2)
    }

    tests.push(t)
  } catch (e: unknown) {
    tests.push({ name: 'SD test', success: false, error: e instanceof Error ? e.message : String(e) })
  }

  return Response.json({ ai_found: true, tests })
}
