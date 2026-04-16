# slidev-ppt-agent

一条命令，让任何 AI Agent 学会做高质量 PPT，内置预览和一键发布。

```bash
npx slidev-ppt-agent create my-deck
```

## 它做什么

`slidev-ppt-agent` 脚手架化一个完整的 PPT 工作区，任何 AI Agent 都能读懂。安装后，你的 Agent（Cursor、Claude Code、Codex、opencode、codebuddy 等）将获得完整的 7 阶段 PPT 制作能力：

1. **澄清** -- 理解受众、场景、目标
2. **调研** -- 多维度 WebSearch 获取事实内容
3. **风格决策** -- 匹配设计原型和视觉 Token
4. **大纲** -- 金字塔原理结构 + 校验
5. **编写** -- Slidev Markdown + Bento Grid 布局
6. **预览** -- 构建并本地启动预览
7. **审查** -- 质量清单 + 自动修复

## 快速开始

### 创建新项目

```bash
npx slidev-ppt-agent create my-deck
cd my-deck
```

然后在你的 AI Agent 中打开项目，说：

```
/ppt-creator 帮我做一个关于 Kubernetes 的技术分享 PPT，受众是后端工程师
```

### 注入到已有项目

```bash
cd existing-project
npx slidev-ppt-agent init
```

## CLI 命令

| 命令 | 说明 |
|------|------|
| `create [name]` | 创建带完整 Agent 能力的新 PPT 项目 |
| `init` | 将能力注入到已有项目 |
| `update` | 升级 skills 和设计系统到最新版 |
| `build [file]` | 构建幻灯片为静态站点 |
| `preview [file]` | 开发预览（.md 文件）或静态预览（dist/） |
| `publish` | 构建并发布到 Vercel 或 GitHub Pages |

### 发布

首次发布运行引导式向导：

```bash
npx slidev-ppt-agent publish
```

```
? 选择发布平台
  > Vercel（推荐：全球 CDN，自动 HTTPS）
    GitHub Pages（免费，需 GitHub 仓库）

构建中... 完成
部署中... 完成

站点地址: https://my-deck.vercel.app
后续发布只需: npx slidev-ppt-agent publish
```

首次配置后，设置保存在 `.ppt-agent.json`，后续发布一条命令搞定。

## 平台支持

| 平台 | 入口文件 | 发现机制 |
|------|----------|----------|
| Cursor | `.cursor/rules/ppt-commands.mdc` | 自动加载 |
| Claude Code | `CLAUDE.md` -> `AGENTS.md` | 自动读取 |
| Codex | `AGENTS.md` | 自动读取 |
| opencode | `AGENTS.md` | 读取项目根目录 |
| codebuddy | `AGENTS.md` | 读取项目根目录 |

`AGENTS.md` 是单一事实来源，其他平台入口文件都是薄适配层。

## 脚手架产出结构

```
my-deck/
├── .agents/skills/         # 9 个 Agent 技能（调研、设计、大纲、编写等）
├── .cursor/rules/          # Cursor 编排规则
├── design-system/          # Token、原型、页面模板、CSS
├── schemas/                # Agent 输出的 JSON Schema 校验
├── scripts/                # 工程辅助脚本
├── AGENTS.md               # 通用 Agent 入口
├── CLAUDE.md               # Claude Code 入口
├── .ppt-agent.json         # 项目配置（版本、发布设置）
└── package.json            # Slidev 依赖
```

## 设计系统

内置从专业级演示文稿提取的完整设计系统：

- **原型**: `technical-share` 和 `pitch-deck` 叙事结构
- **Token**: 调色板、字体排版、间距、动效预设
- **页面模板**: 封面、目录、内容分栏、三卡片、代码展示、双栏详情、总结
- **CSS 类**: `.glass-card`、`.icon-box`、`.section-bar`、`.tag-badge`、`.gradient-title`

## 升级

```bash
npx slidev-ppt-agent update
```

安全升级 skills、设计系统、schemas 和脚本。检测用户修改，覆盖前提供备份。

## 许可证

MIT
