// AI Binding 诊断端点 - 用于排查 Logo 生成问题

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tests: any[] = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: Request): Promise<Response> {
  tests.length = 0;

  // 测试1: 检查 globalThis.AI
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globalAi = (globalThis as any).AI;
  tests.push({
    name: 'globalThis.AI',
    available: !!globalAi,
    type: typeof globalAi,
  });

  // 测试2: 检查 OpenNext Cloudflare Context (Symbol.for)
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctx = (globalThis as any)[Symbol.for("__cloudflare-context__")]
    tests.push({
      name: 'Symbol.for("__cloudflare-context__")',
      found: !!ctx,
      type: typeof ctx,
      envKeys: ctx?.env ? Object.keys(ctx.env) : [],
      hasAI: !!(ctx?.env?.AI),
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    tests.push({ name: 'Symbol.for("__cloudflare-context__")', error: e?.message });
  }

  // 测试3: 遍历 globalThis 上所有 Symbol 属性
  const symbols = Object.getOwnPropertySymbols(globalThis);
  for (const sym of symbols) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const val = (globalThis as any)[sym];
    if (val && typeof val === 'object' && val.env) {
      tests.push({
        name: 'Symbol with env found',
        symDescription: sym.toString(),
        envKeys: Object.keys(val.env),
        hasAI: !!(val.env?.AI),
        aiType: val.env?.AI ? typeof val.env.AI : 'N/A',
      });
    }
  }

  // 综合结果
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const aiAvailable = tests.some((t: any) => t.hasAI === true);

  return Response.json({
    success: true,
    ai_available: aiAvailable,
    tests,
    timestamp: new Date().toISOString(),
  });
}
