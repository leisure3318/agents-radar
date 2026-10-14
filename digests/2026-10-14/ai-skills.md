# AI Skills 新上榜日报 2026-10-14

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 说明依据：各来源仓库的 `SKILL.md`

---

今日发现：4 个条目来自 HeyGen 的 HyperFrames——一套以 HTML、可 seek 时间轴和命令行为基础的 AI 视频制作框架；另一个是通过 inference.sh 调用多种图像模型的 Skill。以下说明已直接依据各自 `SKILL.md`，而非榜单的空白描述。

## [hyperframes-cli](https://www.skills.sh/heygen-com/hyperframes/hyperframes-cli)

- **它做什么**：HyperFrames 的完整命令行制作流程：创建项目、搜索/安装动画组件、编辑时间轴、lint/check、截图审查、浏览器预览，以及本地、HeyGen 云、AWS Lambda、Cloud Run 渲染。它也用于排查构建或渲染失败。
- **适合谁用**：用 AI 智能体制作 HTML 视频，并希望把“创作—视觉检查—最终交付”变成可重复工程流程的开发者。
- **为什么现在值得看**：Trending（24 小时趋势），安装量 30,599；它是同一套 HyperFrames Skill 的执行中枢。
- **如何使用**：要求 Node.js 22+ 与 FFmpeg。常用闭环：`npx hyperframes init <project>` → `npx hyperframes lint` → `npx hyperframes check` → `npx hyperframes preview --background`；确认后才用 `npx hyperframes render --quality looks --output out.mp4`，再以 `ffprobe` 验证成品。
- **注意**：`check` 已包含 lint；Skill 明确要求预览确认后才能渲染。作品必须避免随机时间、无限循环等非确定性动画，保证逐帧渲染可复现。

## [hyperframes-animation](https://www.skills.sh/heygen-com/hyperframes/hyperframes-animation)

- **它做什么**：HyperFrames 的动画知识库与规范：原子动画规则、多阶段场景蓝图、转场、24 种文本动效，以及 GSAP、Lottie、Three.js、Anime.js、CSS、WAAPI、WebGPU 等运行时的接入方式；还能导出动画地图审计已有作品。
- **适合谁用**：需要为 HTML 视频制作标题入场、镜头运动、3D/粒子效果、角色动画或场景转场的前端和 AI 视频智能体。
- **为什么现在值得看**：Trending，安装量 30,311。它把动效拆成可复用规则与可验证时间轴，减少智能体随意拼接动画造成的不稳定结果。
- **如何使用**：先从 `rules-index.md` 选择 2–4 个原子规则；复杂场景再用 `blueprints-index.md`。默认使用一个暂停的 GSAP 时间轴；Lottie 适合 AE 资产，Three.js 适合 3D。可运行 `animation-map.mjs` 审计编排。
- **注意**：依赖 `hyperframes-core`。不能在 tween 时读取 DOM 实时布局，也不能用 `Math.random`、`Date.now` 等；空间动画用 `x/y/scale/rotation`，不要用 `top/left/width/height` 做布局动画。

## [hyperframes](https://www.skills.sh/heygen-com/hyperframes/hyperframes)

- **它做什么**：HyperFrames 的总入口和任务路由器。它先判断项目状态与交付物，再把请求分到 Remotion 迁移、幻灯片、字幕、访谈剪辑、音乐视频、短动效、产品发布视频、解说视频或通用视频等工作流。
- **适合谁用**：从网页、GitHub PR、Figma、文案、素材或音乐开始，让智能体制作视频；或要恢复和维护已有 HyperFrames 项目的人。
- **为什么现在值得看**：Trending，安装量 30,286。它说明核心模型：以带 `data-*` 时间信息的 HTML DOM 加可 seek 动画运行时来渲染视频。
- **如何使用**：新创作先执行 `npx hyperframes usage --json`，再按交付物进入对应工作流。已有项目做检查/预览/渲染时直接进入相应操作；固定 CLI 的项目先以 `npx hyperframes@latest upgrade --project . --check` 检查版本。
- **注意**：它不是一键渲染工具。升级后必须执行 `npx hyperframes check`；失败应回退。最终渲染前仍要在 Studio 中预览确认。

## [media-use](https://www.skills.sh/heygen-com/hyperframes/media-use)

- **它做什么**：HyperFrames 的媒体资源工作流。用统一的 `resolve` 命令查找、复用或生成背景音乐、音效、图片、图标、Logo、配音、调色/LUT；也支持 TTS、转写、字幕、抠图、剪辑、重构图和素材记忆。
- **适合谁用**：制作产品演示、视频或社媒内容时，需要让智能体稳定地找素材、生成旁白、处理媒体并复用项目资源的人。
- **为什么现在值得看**：Trending，安装量 30,203。它补齐了 AI 视频流程中最常重复、最容易散乱的素材获取和处理环节。
- **如何使用**：`npx hyperframes media-use resolve --type <type> --intent "<描述>" --project <目录>`，其中 type 包括 `bgm`、`sfx`、`image`、`icon`、`logo`、`voice`、`grade`、`lut`。若未设置 `HEYGEN_API_BASE`，首次使用 HeyGen 能力需登录 CLI，并用 `npx hyperframes media-use resolve --doctor` 验证。
- **注意**：音乐、音效、TTS、头像视频等部分能力依赖 HeyGen CLI/登录；OAuth 免费额度与 API Key 计费不同。Skill 要求先检查可复用素材，媒体替换和调色应先提出并预览，不能静默修改作品。

## [ai-image-generation](https://www.skills.sh/magentosh/superpowers/ai-image-generation)

- **它做什么**：通过 [inference.sh](https://inference.sh) 的 `belt` CLI 调用 50+ 图像模型，涵盖文生图、图生图、局部重绘、LoRA、编辑、超分和文字渲染。Skill 列出了 GPT-Image-2、FLUX、Gemini、Grok、Seedream、Reve、Topaz 等模型及适用场景。
- **适合谁用**：生成产品效果图、概念图、插画、社媒配图或营销视觉，并需要按速度、价格、LoRA、编辑能力或文字生成质量切换模型的人。
- **为什么现在值得看**：Trending，安装量 29,318。它以一个 CLI 统一多个供应商，适合需要快速比较和替换模型的工作流。
- **如何使用**：先安装 `npx skills add belt-sh/cli` 并执行 `belt login`。例如：`belt app run falai/flux-dev-lora --input '{"prompt":"a cat astronaut in space"}'`；`belt app list --category image` 可浏览图像应用。GPT-Image-2 适合编辑/局部重绘，Topaz 用于超分。
- **注意**：依赖 inference.sh 的 CLI 与登录；模型可用性、费用、配额和参数以其当前文档为准。处理外部图片前需确认拥有使用和编辑授权。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*
