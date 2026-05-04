# AI Logo Maker — Cloudflare Pages 部署指南

## 方案选择

⚠️ **重要说明**: 当前 Windows 开发环境下，推荐通过 **Cloudflare Dashboard 连接 GitHub** 方式部署（最简单可靠）。

---

## 方法一：Cloudflare Dashboard（推荐，5分钟完成）

### 第一步：推送代码到 GitHub

```bash
# 在项目根目录初始化 git（如果还没有）
git init
git add .
git commit -m "feat: AI Logo Maker MVP ready for deployment"

# 在 GitHub 创建仓库 ai-logo-maker，然后推送
git remote add origin https://github.com/YOUR_USERNAME/ai-logo-maker.git
git push -u origin main
```

### 第二步：Cloudflare Pages 部署

1. 登录 https://dash.cloudflare.com → 进入 **Pages**
2. 点击 **Create a project** → **Connect to Git**
3. 选择 GitHub 仓库 `ai-logo-maker`
4. 构建配置：

| 字段 | 值 |
|------|-----|
| Framework preset | `Next.js` |
| Build command | `npm run build` |
| Build output directory | `.next` |
| Node.js version | `18` 或 `20` |
| Environment variables | 见下方 |

5. 点击 **Save and Deploy**

### 第三步：环境变量配置

在 Cloudflare Pages 项目设置 → Environment variables 中添加：

```
# 如需 Stripe 支付（暂时可留空）
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx

# 如需 AI 图像生成 API（暂时可留空）
OPENAI_API_KEY=sk-xxx
# 或 Stable Diffusion API 等

# 站点 URL（部署后填入）
NEXT_PUBLIC_SITE_URL=https://ai-logo-maker.pages.dev
```

### 第四步：自定义域名（可选）

1. 在 Pages 项目 → **Custom domains**
2. 添加 `logomaker.ai`（需先在域名注册商配置 DNS 指向 Cloudflare）

---

## 方法二：Wrangler CLI（需要 WSL 或 Linux 环境）

> ⚠️ Windows 原生环境对 `@opennextjs/cloudflare` 支持不佳，建议在 WSL 或 GitHub Actions 中执行。

### 使用 OpenNext（推荐新方案）

```bash
# 安装 OpenNext Cloudflare 适配器
npm install @opennextjs/cloudflare

# 修改 package.json，添加部署脚本
# "deploy": "opennextjs-cloudflare build && wrangler deploy"

# 构建并部署到 Cloudflare Workers（非 Pages）
npx @opennextjs/cloudflare
npx wrangler deploy
```

---

## 当前项目状态说明

当前 `ai-logo-maker` 是一个 **前端 MVP 演示版**：
- ✅ 完整的落地页 UI（Hero、Pricing、FAQ 等）
- ✅ 响应式设计，移动端适配
- ⚠️ AI 图像生成功能为模拟（未接入真实 API）
- ⚠️ Stripe 支付为演示（未接入真实支付）

### 建议的 MVP 上线策略

**Phase 1（本周）**: 上线落地页 + Waitlist 收集
- 部署静态落地页到 Cloudflare Pages
- 用 [ConvertKit](https://convertkit.com) 或 [Buttondown](https://buttondown.email) 免费层收集等待列表邮件
- 推广到 Product Hunt / Reddit / Twitter

**Phase 2（验证后）**: 接入真实 API
- 有明确需求信号（>100 waitlist 注册）再接入 AI 图像 API
- 接入 Stripe 支付
- 切换为完整功能版本

---

## 快速部署 Checklist

```
□ 代码已推送到 GitHub
□ GitHub 仓库已连接到 Cloudflare Pages
□ 构建命令配置正确 (npm run build)
□ 输出目录配置正确 (.next)
□ 自定义域名已配置（如用自定义域名）
□ HTTPS 已自动启用（Cloudflare 自动提供）
□ 部署成功，站点可访问
□ 在浏览器验证所有页面正常
□ GA4 跟踪代码已添加（可选）
```
