# 🚀 AI Logo Maker — 部署到 Cloudflare Pages 小白指南

> 本指南适合计算机零基础用户，每一步都配有图片描述。

---

## 准备工作

- ✅ 浏览器（Chrome / Edge 都可以）
- ✅ VPN 已开启（您已经在用了）
- ✅ 10分钟空闲时间

---

## 第一步：注册 Cloudflare 账号

> Cloudflare 是一家美国网络服务公司，提供免费的网站部署服务。

### 操作步骤：

1️⃣ 打开浏览器，在地址栏输入：
```
https://dash.cloudflare.com/sign-up
```
然后按键盘上的 **回车键 （Enter）**

2️⃣ 你会看到一个注册页面，填写：

| 字段 | 填写内容 |
|------|----------|
| **Email** | 输入你的邮箱地址（随便哪个邮箱都行） |
| **Password** | 设置密码（建议用你常用的密码） |

3️⃣ 点击蓝色的 **"Create Account"** 按钮

4️⃣ 去你的邮箱收件箱，找到 Cloudflare 发来的验证邮件，点击里面的 **"Verify Email"** 按钮

5️⃣ 回到浏览器，自动进入 Cloudflare 控制台

> 💡 如果已经有账号，直接登录就行：https://dash.cloudflare.com

---

## 第二步：找到 Pages 入口

1️⃣ 登录后会看到一个控制台页面，**左侧有一个竖条菜单栏**

2️⃣ 在左侧菜单栏里找到 **"Workers & Pages"** 并点击它
   - 这个选项一般在左侧菜单靠中间的位置
   - 图标是一个 ⚡ 闪电符号

3️⃣ 页面中间会有一个 **"Create"** 按钮，点击它
   - 按钮颜色是蓝色的，在页面右上方

4️⃣ 弹出一个窗口，上面有两个选项标签：
   - **"Workers"**（左边）
   - **"Pages"**（右边）← **点这个！**

---

## 第三步：连接 GitHub

1️⃣ 在 Pages 页面里，你会看到一个 **"Connect to Git"** 按钮
   - 它是蓝色的，在页面中间
   - 点击它

2️⃣ 浏览器会跳转到 GitHub 的授权页面

3️⃣ 如果没登录 GitHub，先输入你的 GitHub 账号密码登录

4️⃣ 看到一个 **"Authorize Cloudflare Pages"** 的页面
   - 点击绿色的 **"Authorize Cloudflare-Pages"** 按钮

5️⃣ 自动跳回 Cloudflare，现在可以看到你的 GitHub 仓库列表了

---

## 第四步：选择仓库

1️⃣ 在仓库列表里，找到 **"ai-logo-maker"**
   - 仓库名字旁边有个 📁 文件夹图标
   - 如果列表很长，可以在搜索框输入 `ai-logo-maker` 快速找到

2️⃣ 点击仓库右边的 **"Begin setup"** 按钮
   - 这是个灰色的按钮

---

## 第五步：填写构建配置（最重要的一步）

你会看到一个配置页面，有很多输入框。**按下面的表格填写：**

### 第一部分：基本信息

| 项目 | 填写内容 |
|------|----------|
| **Project name**（项目名称） | 自动填好了 `ai-logo-maker`，不用改 |
| **Production branch**（分支） | 自动填好了 `main`，不用改 |

### 第二部分：构建设置（需要手动改）

向下滚动，找到 **"Build settings"** 部分。**默认是 "Automatic"，需要改成手动配置：**

1. 找到 **"Build command"** 输入框
   - 默认显示：`无` 或 `npm run build`
   - **请删除默认内容，填入以下内容：**
   ```
   npm install --legacy-peer-deps && npm run build
   ```
   > 复制上面这行文字，按 Ctrl + V 粘贴到输入框里

2. 找到 **"Build output directory"** 输入框
   - 默认显示：`无`
   - **请删除默认内容，填入以下内容：**
   ```
   .next
   ```
   > 注意：前面有个点 `.`，不要漏掉

### 第三部分：环境变量（可选）

3. 找到 **"Environment variables"** 部分
   - 点击 **"Add variable"** 按钮
   - 在变量名输入框填：`NODE_VERSION`
   - 在变量值输入框填：`18`
   - 点击 **"Save"** 或旁边的空白处确认

---

## 第六步：开始部署

1️⃣ 把页面滚动到最底部

2️⃣ 看到蓝色的 **"Save and Deploy"** 按钮
   - **点击它！**

3️⃣ 页面会变到一个新页面，中间有一个进度条在转，显示：
   ```
   🚧 Deploying your project...
   ```

4️⃣ **等待 2-5 分钟**，可以去喝杯水

5️⃣ 当看到这个画面就表示部署成功：

   ```
   ✅ Your project is live!
   
   https://ai-logo-maker.pages.dev
   ```

---

## 第七步：访问你的网站

1️⃣ 点击上面的链接，或者复制这个地址到浏览器打开：

   ```
   https://ai-logo-maker.pages.dev
   ```

2️⃣ 恭喜！🎉 **你的 AI Logo Maker 网站已经正式上线了！**

3️⃣ 这个地址是**永久有效的**，任何人都可以通过这个链接访问你的网站

---

## ❓ 如果部署失败怎么办？

### 常见错误1：Build Command 没配置对

**现象**：部署后显示红色的 ❌ 或者 "Build Failed"

**解决方法**：
1. 回到项目主页面
2. 点击 **"Settings"** 标签
3. 找到 **"Build configuration"** 部分
4. 确认 Build command 填的是：
   ```
   npm install --legacy-peer-deps && npm run build
   ```
5. 确认 Build output directory 填的是：
   ```
   .next
   ```
6. 点击页面底部的 **"Save"**
7. 回到 **"Deployments"** 标签页
8. 点击 **"Retry deployment"** 重新部署

### 常见错误2：GitHub 没授权

**现象**：找不到你的 `ai-logo-maker` 仓库

**解决方法**：
1. 回到 Cloudflare Pages 页面
2. 点击右上角你的头像 → **"Account"**
3. 找到 **"GitHub"** 连接
4. 点击 **"Re-authorize"**
5. 在 GitHub 页面重新点 **"Authorize"**

---

## 📱 善后操作

### 如何重新部署（修改代码后）

以后每次你推送代码到 GitHub 的 `main` 分支，Cloudflare 会自动重新部署，不需要手动操作。

### 如何查看部署日志

1. 进入 Pages 项目页面
2. 点击 **"Deployments"** 标签
3. 点击某次部署的 **"View build log"**
4. 可以看到每一行构建输出

### 如何绑定自己的域名

1. 进入 Pages 项目页面
2. 点击 **"Custom Domains"** 标签
3. 点击 **"Set up a custom domain"**
4. 输入你的域名（比如 `ailogo.com`）
5. 按照提示配置 DNS 记录

---

## ✅ 总结

| 步骤 | 大概时间 |
|------|----------|
| 注册 Cloudflare | 2分钟 |
| 连接 GitHub | 1分钟 |
| 配置构建设置 | 2分钟 |
| 等待部署 | 3-5分钟 |
| **总计** | **约 10分钟** |

**现在可以开始操作了！** 在哪个步骤卡住了，随时截图问我，我帮你解决 💪
