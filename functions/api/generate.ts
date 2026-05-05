export interface Env {
  AI: Ai;
}

interface GenerateRequest {
  brandName: string;
  industry: string;
  style: string;
}

// 行业→英文提示词映射
const INDUSTRY_PROMPTS: Record<string, string> = {
  tech: 'technology company, futuristic, digital innovation',
  food: 'restaurant, culinary, food and dining, warm atmosphere',
  education: 'education, learning, knowledge, academic',
  health: 'healthcare, medical, wellness, clean and professional',
  retail: 'retail, shopping, commerce, vibrant',
  other: 'professional, versatile business',
};

// 风格→英文提示词映射
const STYLE_PROMPTS: Record<string, string> = {
  minimal: 'minimalist logo, clean lines, simple geometric shapes, flat design',
  modern: 'modern logo, sleek, contemporary, bold typography',
  vintag: 'vintage logo, retro style, classic emblem, ornate details',
  tech: 'tech logo, circuit patterns, digital aesthetic, neon accents',
  artistic: 'artistic logo, creative, hand-drawn feel, expressive',
  cartoon: 'playful logo, friendly, rounded shapes, fun and vibrant',
};

// 颜色方案
const COLOR_SCHEMES = [
  { primary: 'deep blue', secondary: 'purple' },
  { primary: 'warm orange', secondary: 'red' },
  { primary: 'forest green', secondary: 'teal' },
  { primary: 'hot pink', secondary: 'purple' },
  { primary: 'cyan', secondary: 'blue' },
  { primary: 'orange', secondary: 'dark red' },
];

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body: GenerateRequest = await context.request.json();
    const { brandName, industry = 'tech', style = 'modern' } = body;

    if (!brandName || brandName.trim().length === 0) {
      return Response.json({ error: '品牌名称不能为空' }, { status: 400 });
    }

    // 并发生成6款方案
    const schemes = COLOR_SCHEMES;
    const results = await Promise.allSettled(
      schemes.map(async (scheme, i) => {
        const industryPrompt = INDUSTRY_PROMPTS[industry] || INDUSTRY_PROMPTS.other;
        const stylePrompt = STYLE_PROMPTS[style] || STYLE_PROMPTS.modern;

        const prompt = `Professional logo design for brand "${brandName}". ${industryPrompt}. ${stylePrompt}. ` +
          `Color scheme: ${scheme.primary} and ${scheme.secondary}. ` +
          `Flat vector style, white background, no text, iconic symbol only, high quality, 8k`;

        // 调用 Workers AI (Stable Diffusion XL)
        const response = await context.env.AI.run('@cf/stabilityai/stable-diffusion-xl-base-1.0' as any, {
          prompt,
          negative_prompt: 'text, words, letters, typography, watermark, signature, blurry, low quality',
          width: 512,
          height: 512,
        } as any);

        return {
          id: i + 1,
          name: ['Core', 'Nova', 'Peak', 'Lux', 'Arc', 'Zoe'][i],
          colors: [scheme.primary, scheme.secondary],
          imageData: (response as any).image,
          description: `${stylePrompt} · ${industryPrompt}`,
        };
      })
    );

    const logos = results.map((r, i) => {
      if (r.status === 'fulfilled') return r.value;
      // 降级：返回占位符
      return {
        id: i + 1,
        name: ['Core', 'Nova', 'Peak', 'Lux', 'Arc', 'Zoe'][i],
        colors: [schemes[i].primary, schemes[i].secondary],
        imageData: null,
        error: (r as PromiseRejectedResult).reason?.message || '生成失败',
        description: '',
      };
    });

    return Response.json({ success: true, logos });
  } catch (err: any) {
    return Response.json(
      { error: err.message || '服务器错误' },
      { status: 500 }
    );
  }
};
