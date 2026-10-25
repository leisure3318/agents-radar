# AI Skills 新上榜日报 2026-10-25

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-10-25 01:34 UTC

---

今日发现：2026-10-25 的新上榜 Skill 分成两条主线：通过 `belt` 串联图像、配音与数字人视频生产，以及围绕代码规范、依赖源码和 Vite 构建提升开发效率。以下 5 项均为本日报首次收录；安装量为给定榜单数据，不代表今日新增。

## [ai-image-generation](https://www.skills.sh/bankai-skills/superpowers/ai-image-generation)
- **它做什么**：通过 inference.sh 的 `belt` CLI 调用 50 多种图像模型，覆盖文生图、图像编辑、局部重绘、LoRA、放大和文字渲染。工作流是选择模型 App ID、提交 JSON 输入，再将图片用于商品样片、海报或后续视频制作；文档还提供 Topaz 放大与多图拼接命令。
- **适合谁用**：需要在终端或 Agent 工作流中制作视觉素材的开发者、设计与营销团队。前置条件是安装 inference.sh CLI（`belt`）并登录，按所选模型准备提示词或图片 URL。
- **为什么现在值得看**：进入 **Trending（24 小时趋势）**，给定安装量为 **9,725**。值得关注的是统一的 CLI 调用入口：可以在同一工作流中选择 GPT-Image-2、FLUX、Gemini、Grok、Seedream 等模型，而不只是学习单一模型的提示词。
- **如何使用**：
  ```bash
  # 安装文档指定的 belt CLI Skill
  npx skills add belt-sh/cli

  belt login
  belt app list --category image
  belt app run falai/flux-dev-lora --input '{"prompt":"a cat astronaut in space"}'
  ```
  图像编辑示例使用 `openai/gpt-image-2`，输入 `prompt` 和 `images` 数组；放大使用 `falai/topaz-image-upscaler`，输入 `image_url`。文档另提供完整平台 Skill：
  ```bash
  npx skills add inference-sh/skills@infsh-cli
  ```
- **注意**：依赖 `belt` CLI，来源的工具权限声明为 `Bash(belt *)`。不同模型输入字段并不完全相同，例如编辑用 `images`、放大用 `image_url`，不能将一套参数直接套到所有 App；模型能力与价格描述应视为来源说明，而非本日报实测结果。

## [ai-avatar-video](https://www.skills.sh/bankai-skills/superpowers/ai-avatar-video)
- **它做什么**：通过 `belt` 将人像与文本脚本或音频组合成数字人、口型同步和虚拟讲解视频。推荐路径是用 `pruna/p-image` 生成人像，再用内置 TTS 的 `pruna/p-video-avatar` 生成视频；需要多人物驱动时可选 OmniHuman。另有翻译配音工作流：Whisper 转写 → 手动或 LLM 翻译 → Kokoro 合成语音 → LatentSync 对齐原视频口型。
- **适合谁用**：制作产品讲解、课程、UGC 风格广告、本地化配音或 NPC 对话的开发者与内容团队。需要 `belt`、登录账号，以及人像图片和脚本；使用不带 TTS 的模型时，还需先准备音频。
- **为什么现在值得看**：进入 **Trending（24 小时趋势）**，给定安装量为 **9,725**。其可操作价值在于明确区分“人像＋脚本直接生成”和“先合成语音再驱动人物”两种路径，便于按控制需求组织媒体流水线。
- **如何使用**：
  ```bash
  npx skills add belt-sh/cli

  belt login
  belt app run pruna/p-video-avatar --input '{
    "image":"https://portrait.jpg",
    "voice_script":"Welcome to our product demo!",
    "voice":"Zephyr (Female)",
    "resolution":"1080p"
  }'
  ```
  可用 `voice_prompt` 控制声音风格、`video_prompt` 控制画面表现；已有音频时改用 `audio` 输入。文档提供专用 Skill 和视频 App 浏览命令：
  ```bash
  npx skills add inference-sh/skills@p-video-avatar
  belt app list --category video
  ```
- **注意**：P-Video-Avatar 输出宽高比与输入图片一致，竖屏可先生成 `9:16` 人像；文档建议使用正面、光照良好的高质量照片和低背景噪声的音频。其内置 TTS 标注为 30 种声音、10 种语言；OmniHuman 与 PixVerse 不带内置 TTS。文档中的速度、成本及倍数比较是来源数据，非本日报独立验证。

## [ultracite](https://www.skills.sh/haydenbleasel/ultracite/ultracite)
- **它做什么**：为 JavaScript/TypeScript 项目提供 lint 与格式化预设，支持 Oxlint＋Oxfmt、Biome、ESLint＋Prettier＋Stylelint 三套后端。除初始化外，还覆盖已有配置迁移、只读检查、自动修复、环境诊断和升级。迁移流程允许保留原后端，将项目特有规则接在预设之后，再逐步消化遗留问题。
- **适合谁用**：维护 JS/TS 仓库、统一团队代码规范或为编码 Agent 配置规则的开发者。开始前应检查 `package.json` 是否包含 `ultracite`，并向上查找 Biome、ESLint 或 Oxlint 配置，确认实际后端。
- **为什么现在值得看**：进入 **Hot（小时爆发）**，给定安装量为 **57**。相比只提供风格建议的 Skill，它给出了初始化、渐进迁移、升级与排错的完整操作路径，适合正在整理工程规范的项目。
- **如何使用**：Skill 安装方式请在原页面查看；项目内启动与验证命令如下：
  ```bash
  bunx ultracite init
  bunx ultracite check
  bunx ultracite fix
  bunx ultracite doctor
  ```
  `check` 为只读检查，`fix` 自动修改；两者均可指定文件路径。CI 可显式选择后端与集成：
  ```bash
  bunx ultracite init --pm bun --linter biome \
    --frameworks react next --integrations husky lint-staged --yes
  ```
  升级使用来源给出的命令：
  ```bash
  npx ultracite@latest upgrade
  ```
- **注意**：日常命令应使用项目已安装版本，可按包管理器换成 `npx`、`pnpm exec` 或 `yarn`；`pnpm dlx`、`yarn dlx` 会下载最新版，Yarn 1 没有 `dlx`。`--type-aware` 还会开启 tsconfig 的 `strictNullChecks`；`--hooks` 会启用自动修复钩子。Cypress、Storybook 预设在 Oxlint 和 Biome 上为空；不要假定各后端规则完全一致，也不要强行覆盖仓库已有格式偏好。

## [opensrc](https://www.skills.sh/vercel-labs/opensrc/opensrc)
- **它做什么**：获取依赖的源码仓库并缓存，让 Agent 能阅读实现，而不只依赖类型定义和文档。核心接口 `opensrc path <pkg>` 返回源码绝对路径，未缓存时自动获取，可直接接入 `rg`、`cat`、`find` 等命令。支持 npm、PyPI、crates.io 包及直接指定仓库。
- **适合谁用**：需要排查库内部行为、验证边界情况或研究实现模式的开发者与编码 Agent。前置条件是环境中可运行 `opensrc`；npm 项目还可利用锁文件解析已安装版本。
- **为什么现在值得看**：进入 **Hot（小时爆发）**，给定安装量为 **53**。它将“获取对应版本源码”变成可组合的终端操作，适合文档无法解释实际行为的依赖调试任务。
- **如何使用**：请在原页面查看安装方式。核心用法：
  ```bash
  opensrc path zod
  rg "parse" $(opensrc path zod)
  opensrc path zod@3.22.0
  opensrc path pypi:requests
  opensrc path crates:serde
  opensrc path owner/repo#main
  ```
  在其他项目中解析 npm 版本可用 `--cwd /path/to/project`；缓存核查与清理使用 `opensrc list`、`opensrc remove zod`、`opensrc clean`。
- **注意**：默认全局缓存位于 `~/.opensrc/`，可通过 `OPENSRC_HOME` 覆盖。npm 自动版本检测支持 `package-lock.json`、`pnpm-lock.yaml`、`yarn.lock`；PyPI 和 crates.io 使用显式版本或最新版，不应假定会匹配本地环境。进度写入 stderr、路径写入 stdout；`clean` 会清空缓存。来源明确建议：简单 API 用法若文档或类型已能回答，不必获取源码。

## [vite](https://www.skills.sh/antfu/skills/vite)
- **它做什么**：面向 Vite 配置、插件开发、库构建和 SSR，提供命令速查及专题参考入口。来源基于 **Vite v8.3.1**，重点包含 Vite 8 从 esbuild＋Rollup 转向 **Oxc＋Rolldown** 的迁移。还覆盖虚拟模块、插件顺序、`import.meta.glob`、环境变量和多环境 API 等主题。
- **适合谁用**：维护 Vite 前端工程、编写 Vite 插件、构建组件库或 SSR 应用的开发者。尤其适合准备迁移 Vite 8、需要定位配置与构建参考资料的团队。
- **为什么现在值得看**：进入 **Hot（小时爆发）**，给定安装量为 **49**。其资料生成日期为 **2026-09-25**，且明确标注对应 Vite 版本，适合用来核对新构建链下的配置方向，而非继续沿用旧版假设。
- **如何使用**：Skill 安装方式请在原页面查看；已配置 Vite 的项目可使用：
  ```bash
  vite
  vite build
  vite preview
  vite build --ssr
  ```
  配置优先使用 `vite.config.ts` 与 `defineConfig`；按任务查阅 `core-config`、`core-plugin-api`、`build-and-ssr` 或 `rolldown-migration` 对应参考文件。
- **注意**：来源明确偏好 TypeScript 配置与 ESM，避免 CommonJS。当前提供的是 Skill 主文件和参考索引，未展开具体迁移规则，不能据此推断所有旧配置或插件均兼容 Vite 8；正式迁移前应阅读对应参考文件。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*