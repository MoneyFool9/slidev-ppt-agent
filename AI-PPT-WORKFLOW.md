# AI PPT 工作流文档

> 基于 Claude Code + Slidev + Vercel 的全自动演示文稿工作流
>
> 创建时间：2026-04-13

---

## 一、工作流总览

```
你说主题 → Claude 调研 → Slidev Skill 生成 → 预览验证 → 构建部署 → 分享链接
```

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│   1. 告诉 Claude 主题                                     │
│      "做一个介绍 xxx 的 PPT"                               │
│                ↓                                         │
│   2. Claude 自动调研内容（WebSearch）                       │
│                ↓                                         │
│   3. Slidev Skill 指导生成 slides.md                      │
│      · 自动遵守溢出防护规则                                  │
│      · 自动加 Mermaid scale / maxHeight                   │
│      · 自动选择合适的 layout                                │
│                ↓                                         │
│   4. 启动 Slidev 预览（localhost:3030）                    │
│                ↓                                         │
│   5. Playwright 逐页截图验证                               │
│      · 发现溢出 → 自动修复 → 重新验证                        │
│                ↓                                         │
│   6. npm run build 构建静态文件                            │
│                ↓                                         │
│   7. deploy-to-vercel Skill 一键部署                      │
│      · vercel deploy → 上线                               │
│      · Cloudflare 代理 → 国内可访问                        │
│                ↓                                         │
│   8. 分享链接 ✅                                          │
│      https://ppt.rory-x.me/xxx/                          │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 二、项目结构

```
ppt-research/
├── slides.md                  # PPT 1: A2A 协议分享（24 页）
├── slides-agent-team.md       # PPT 2: Claude Code Agent Team（27 页）
├── slides-pitch-demo.md       # PPT 3: StarFlow AI 路演 Demo（7 页）
├── package.json               # 构建脚本（含多 PPT 并行构建）
├── vercel.json                # Vercel 部署 + SPA 路由配置
├── scripts/
│   └── build-landing.js       # 自动生成 Landing Page
├── dist/                      # 构建产物（部署到 Vercel）
│   ├── index.html             # Landing Page（导航三个 PPT）
│   ├── a2a/                   # A2A 协议静态文件
│   ├── agent-team/            # Agent Team 静态文件
│   └── pitch/                 # StarFlow 路演静态文件
├── .claude/skills/
│   ├── slidev/                # Slidev Skill（含溢出防护规则）
│   └── deploy-to-vercel/      # Vercel 部署 Skill（官方）
├── .agents/skills/            # Skills 本体存储
│   ├── slidev/
│   │   ├── SKILL.md           # Skill 主指令文件
│   │   └── references/        # 52 个参考文档
│   └── deploy-to-vercel/
│       └── SKILL.md           # Vercel 部署指令
└── public/                    # 静态资源（图片等）
```

---

## 三、已安装的 Skills

### 1. Slidev Skill

- **来源**: `npx skills add slidevjs/slidev`
- **路径**: `.claude/skills/slidev`
- **能力**:
  - 指导 Claude 生成符合 Slidev 语法的 slides.md
  - 52 个参考文档覆盖：语法、布局、动画、代码高亮、Mermaid 图表、导出等
  - **内置溢出防护规则**（自定义添加），确保每页内容不超出 980×552px 画布

#### 溢出防护规则摘要

| 元素 | 最大值 | 超出处理 |
|------|--------|---------|
| Bullet points | 5-6 项 | 拆分为两页 |
| 代码块 | 10-12 行 | 加 `{maxHeight:'200px'}` 或拆分 |
| Mermaid 图表 | 8-10 节点 | 必须加 `{scale: 0.45~0.6}` |
| 表格 | 5-6 行 | 拆分或精简 |
| 双栏布局 | 每栏 ~250px 高 | 各栏 ≤ 6 短项 |
| 禁止组合 | — | 同一页不放 代码+图表+列表 |

### 2. Deploy to Vercel Skill

- **来源**: `npx skills add vercel-labs/agent-skills --skill deploy-to-vercel`
- **路径**: `.claude/skills/deploy-to-vercel`
- **能力**:
  - 自动检测项目状态（git remote、Vercel link、CLI 认证）
  - 选择最佳部署方式（git push / CLI deploy / 无认证回退）
  - 团队选择、域名绑定

---

## 四、常用命令

### 开发预览

```bash
# 预览单个 PPT
npx slidev slides.md --port 3030
npx slidev slides-agent-team.md --port 3031
npx slidev slides-pitch-demo.md --port 3032
```

### 构建

```bash
# 一键构建全部 3 个 PPT + Landing Page
npm run build

# 单独构建
npm run build:a2a
npm run build:agent-team
npm run build:pitch
npm run build:landing
```

### 部署

```bash
# 部署到 Vercel（从项目根目录）
vercel deploy -y --no-wait --scope jiahqian-gmailcoms-projects

# 检查部署状态
vercel inspect <deployment-url> --scope jiahqian-gmailcoms-projects
```

### 导出 PDF

```bash
# 需要先安装 playwright-chromium
pnpm add -D playwright-chromium

# 导出
npx slidev export slides.md --format pdf
```

---

## 五、线上访问地址

| 地址 | 内容 |
|------|------|
| https://ppt.rory-x.me | Landing Page（导航页） |
| https://ppt.rory-x.me/a2a/ | A2A 协议分享（24 页） |
| https://ppt.rory-x.me/agent-team/ | Claude Code Agent Team（27 页） |
| https://ppt.rory-x.me/pitch/ | StarFlow AI 路演 Demo（7 页） |

### 域名架构

```
用户 → Cloudflare CDN（全球节点）→ Vercel 源站
       ↑                           ↑
       ppt.rory-x.me              ppt-research.vercel.app
       CNAME → cname.vercel-dns.com
       Proxy: ON（橙色云朵）
```

- **Vercel**: 构建 + 托管静态文件
- **Cloudflare**: DNS 代理 + CDN 加速 + 解决国内 vercel.app 被墙问题
- **SSL**: Cloudflare 设为 Full (strict)

---

## 六、已产出的三个 PPT

### PPT 1: A2A 协议分享（24 页）

- **文件**: `slides.md`
- **主题**: Google A2A (Agent-to-Agent) 协议深度解析
- **内容**: 背景痛点 → 协议概览 → 核心架构（Agent Card / Task / Artifact）→ 通信模式 → 安全机制 → 版本演进 → 代码示例
- **风格**: 技术分享型，Mermaid 图表 + 代码高亮

### PPT 2: Claude Code Agent Team（27 页）

- **文件**: `slides-agent-team.md`
- **主题**: Claude Code 多智能体协作架构
- **内容**: 单 Agent 瓶颈 → Agent Team 架构 → Task Board / Agent Tool / Worktree 隔离 → 实战演示 → Headless & SDK → 最佳实践 → 方案对比
- **风格**: 技术分享型，Magic Move 代码动画 + 时序图

### PPT 3: StarFlow AI 路演（7 页）

- **文件**: `slides-pitch-demo.md`
- **主题**: 虚构产品 StarFlow AI 的路演/宣传 Demo
- **内容**: 封面（渐变标题 + 大图背景）→ 对比卡片 → 核心引擎 → 产品亮点 → 数据页 → CTA → 结尾
- **风格**: 路演/宣传型，毛玻璃效果 + 渐变 + Unsplash 大图 + Iconify 图标
- **证明**: Slidev 完全可以做出精美的非技术类 PPT

---

## 七、Slidev 视觉能力清单

| 能力 | 支持度 | 实现方式 |
|------|--------|---------|
| 全屏背景大图 | ✅ | `layout: image` / `cover` + Unsplash URL |
| 渐变背景/渐变文字 | ✅ | CSS `linear-gradient` + `background-clip: text` |
| 毛玻璃效果 | ✅ | `backdrop-filter: blur(20px)` |
| 圆角卡片 + 阴影 | ✅ | UnoCSS `rounded-2xl` + `box-shadow` |
| 10 万+ 图标 | ✅ | Iconify (`<mdi-xxx />`) |
| 逐步动画 | ✅ | `v-click` / `v-clicks` |
| 入场动画 | ✅ | `v-motion` (@vueuse/motion) |
| 代码高亮 + 行动画 | ✅ | Shiki + `{1\|2-3\|all}` |
| 代码变形动画 | ✅ | Magic Move |
| Mermaid 图表 | ✅ | 流程图/时序图/状态图/Timeline |
| LaTeX 公式 | ✅ | KaTeX |
| 自定义字体 | ✅ | Google Fonts 配置 |
| 多栏布局 | ✅ | `two-cols` / CSS Grid |
| 演讲者备注 | ✅ | HTML 注释 `<!-- -->` |
| 导出 PDF/PPTX | ✅ | `slidev export` |

---

## 八、以后怎么用

只需一句话：

> **"用 Slidev 做一个关于 xxx 的 PPT，然后部署"**

Claude 会自动完成全部流程：
1. WebSearch 调研主题内容
2. 按 Slidev Skill + 溢出规则生成 slides.md
3. 启动预览，Playwright 验证无溢出
4. `npm run build` 构建
5. `vercel deploy` 部署到 ppt.rory-x.me
6. 返回访问链接

**全程无需手动操作。**

---

## 十、命令化 Harness（MVP）

当前新增单命令工作流，核心入口为：

```bash
npm run ppt:creator -- --topic "你的主题" --totalPages 12
```

执行阶段：

1. `input-check`（输入完整性检查）
2. 条件 `clarify`（仅缺字段时触发）
3. `research`（生成 `research-report.json`）
4. `decide-style`（输出 `style-plan.json`）
5. `outline`（输出 `outline.json`）
6. `plan`（输出 `implementation-plan.md`）
7. `generate`（输出 `slides-generated.md`）
8. `qa/fix`（质量检查与自动修复）
9. `build`

所有产物会沉淀到：

```text
artifacts/<run-id>/
```

---

## 十一、发布命令（MVP）

新增发布动作命令 `ppt-publish`：

```bash
npm run ppt:publish -- --target vercel --distPath dist
npm run ppt:publish -- --target github-pages --distPath dist
```

当未提供 `target`：
- 交互环境会触发一次选择提问（Vercel / GitHub Pages）
- 非交互环境可使用 `--defaultTarget` 作为默认目标

发布结果记录在：

```text
publish-report.json
```

---

## 十二、本次会话历程

| 阶段 | 做了什么 |
|------|---------|
| 调研 | 调研 Slidev 制作 PPT 的完整技术方案 |
| PPT 1 | 制作 A2A 协议分享 PPT（24 页） |
| Skill 安装 | 安装 Slidev Skill（`npx skills add slidevjs/slidev`） |
| PPT 2 | 用 Skill 制作 Agent Team PPT（27 页） |
| 溢出修复 | 发现溢出问题 → 在 SKILL.md 中写入防护规则 → 新建参考文档 → 修复两个 PPT → Playwright 逐页验证 |
| 精美验证 | 制作 StarFlow AI 路演 Demo，证明 Slidev 可做宣传级 PPT |
| 部署 | 安装 Vercel CLI + deploy-to-vercel Skill → 构建多 PPT → 部署 Vercel |
| 域名 | 绑定 ppt.rory-x.me + Cloudflare CDN 代理，解决国内访问 |
