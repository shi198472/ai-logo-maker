#!/usr/bin/env node
/**
 * AI Logo Maker - OpenNext + Cloudflare Workers 构建脚本
 * 
 * 运行此脚本进行本地构建和部署：
 *   node scripts/deploy.js
 */

import { execSync } from 'child_process'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'

const ROOT = new URL('.', import.meta.url).pathname

function run(cmd, opts = {}) {
  console.log(`\n$ ${cmd}`)
  try {
    const output = execSync(cmd, {
      cwd: ROOT,
      stdio: 'inherit',
      ...opts,
    })
    return output?.toString()
  } catch (err) {
    console.error('命令失败:', err.message)
    process.exit(1)
  }
}

async function main() {
  console.log('🚀 AI Logo Maker - OpenNext 构建开始')

  // 1. 安装依赖
  run('npm ci')

  // 2. 运行 OpenNext 构建
  //    opennextjs-cloudflare build 会自动调用 next build
  console.log('\n📦 运行 OpenNext 构建...')
  run('./node_modules/.bin/opennextjs-cloudflare build')

  // 3. 验证输出
  const workerPath = join(ROOT, '.open-next/worker.js')
  if (!existsSync(workerPath)) {
    console.error('❌ OpenNext 构建失败：worker.js 未生成')
    process.exit(1)
  }
  console.log('✅ OpenNext 构建成功')

  // 4. 创建 wrangler.toml（用于 wrangler pages deploy）
  const wranglerToml = `name = "ai-logo-maker"
compatibility_date = "2026-05-01"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".open-next"

[ai]
binding = "AI"
`
  writeFileSync(join(ROOT, 'wrangler-generated.toml'), wranglerToml)
  console.log('✅ wrangler 配置已生成')

  // 5. 部署到 Cloudflare Pages
  const token = process.env.CLOUDFLARE_API_TOKEN
  if (!token) {
    console.warn('⚠️  未设置 CLOUDFLARE_API_TOKEN，跳过自动部署')
    console.log('   请手动运行：wrangler pages deploy .open-next/ --project-name=ai-logo-maker')
    console.log('   或在 GitHub Actions 中设置 CLOUDFLARE_API_TOKEN secret')
    return
  }

  console.log('\n🚀 部署到 Cloudflare Pages...')
  run(
    `npx wrangler pages deploy .open-next/ --project-name=ai-logo-maker --config=wrangler-generated.toml`,
    { env: { ...process.env, CLOUDFLARE_API_TOKEN: token } }
  )

  console.log('✅ 部署完成!')
}

main().catch(err => {
  console.error('构建失败:', err)
  process.exit(1)
})
