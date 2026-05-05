// Cloudflare Pages Function: /api/generate
// 对接 Workers AI 生成 Logo 图片

interface Env {
  AI: any;
}

interface GenerateRequest {
  brandName: string;
  industry: string;
  style: string;
}

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

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
    },
  });
}

export const onRequest = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;

  // OPTIONS 预检
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS });
  }

  // 只接受 POST
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  let body: GenerateRequest;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: '无效的请求格式' }, 400);
  }

  const { brandName, industry = 'tech', style = 'modern' } = body;
  if (!brandName || brandName.trim().length === 0) {
    return jsonResponse({ error: '品牌名称不能为空' }, 400);
  }

  const brand = brandName.trim().slice(0, 50);
  const industryPrompt = INDUSTRY_PROMPTS[industry] || INDUSTRY_PROMPTS.other;
  const stylePrompt = STYLE_PROMPTS[style] || STYLE_PROMPTS.modern;

  const aiPrompt = `Professional minimalist logo design for brand "${brand}". ${industryPrompt}. ${stylePrompt}. Clean white background, centered icon, no text or words, vector style, high contrast, award winning design quality, suitable for commercial use, white background`;

  // AI 未绑定 → 降级返回演示数据
  if (!env.AI) {
    console.warn('AI binding not found, returning fallback data');
    return jsonResponse({
      success: true,
      logos: buildFallbackLogos(brand, industry, style),
      fallback: true,
      message: 'AI 未配置，返回演示数据。请在 Cloudflare 仪表板启用 Workers AI。',
    });
  }

  const tasks = COLOR_SCHEMES.map(async (scheme, i) => {
    try {
      const fullPrompt = aiPrompt + `, color palette: ${scheme.primary} as dominant color with ${scheme.secondary}`;
      const result: any = await env.AI.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', {
        prompt: fullPrompt,
        negative_prompt: 'text, words, letters, watermark, signature, blurry, low quality, distorted, ugly',
        width: 1024,
        height: 1024,
        num_steps: 25,
      });

      return {
        id: i + 1,
        name: ['Core', 'Nova', 'Peak', 'Lux', 'Arc', 'Zoe'][i],
        colors: [scheme.primary, scheme.secondary],
        imageData: result?.image || null,
        description: `${stylePrompt.split(' ')[0]} · ${industryPrompt.split(' ')[0]}`,
      };
    } catch (err: any) {
      console.error(`Logo ${i + 1} failed:`, err);
      return {
        id: i + 1,
        name: ['Core', 'Nova', 'Peak', 'Lux', 'Arc', 'Zoe'][i],
        colors: [scheme.primary, scheme.secondary],
        imageData: null,
        error: err?.message || '生成失败',
        description: '',
      };
    }
  });

  const results = await Promise.all(tasks);
  return jsonResponse({ success: true, logos: results });
};

function buildFallbackLogos(brand: string, industry: string, style: string) {
  const industryPrompt = INDUSTRY_PROMPTS[industry] || INDUSTRY_PROMPTS.other;
  const stylePrompt = STYLE_PROMPTS[style] || STYLE_PROMPTS.modern;
  return COLOR_SCHEMES.map((scheme, i) => ({
    id: i + 1,
    name: ['Core', 'Nova', 'Peak', 'Lux', 'Arc', 'Zoe'][i],
    colors: [scheme.primary, scheme.secondary],
    imageData: null,
    error: null,
    description: `${stylePrompt.split(' ')[0]} · ${industryPrompt.split(' ')[0]}`,
  }));
}
