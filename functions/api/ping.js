// 最简测试：验证 Cloudflare Pages Function 路由是否生效
// 文件：functions/api/ping.js（优先级高于 .ts，用于测试）

export async function onRequest(context) {
  const { request } = context;
  
  // OPTIONS 预检
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  const body = await request.json().catch(() => ({}));
  
  return new Response(JSON.stringify({
    success: true,
    message: 'pong! Cloudflare Pages Function 正常工作',
    received: body,
    timestamp: new Date().toISOString(),
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
