# AI Skills 新上榜日报 2026-10-18

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-10-18 01:30 UTC

---

# AI Skills 新上榜日报｜2026-10-18

**今日发现**：本次 5 个条目均来自 Trending（24 小时趋势）榜，且此前未在本日报出现；其中 3 个围绕 HyperFrames，分别覆盖 HTML 视频合成契约、关键帧动画和可复用组件接入。下列安装量是给定的榜单安装量，并非今日新增；另有 2 个条目未读取到 SKILL.md，暂不根据名称推断功能。

## [hyperframes-core](https://www.skills.sh/heygen-com/hyperframes/hyperframes-core)
- **它做什么**：定义将 HTML 项目渲染为视频的合成契约：DOM 通过 `data-*` 声明时间，框架接管媒体播放，动画必须支持按时间定位。覆盖根合成、片段与轨道、子合成、变量、媒体放置和确定性渲染，实际产出是符合运行时规则的可渲染项目。编辑已有项目时，要求保留无关的时间安排、ID、变量和媒体路径。
- **适合谁用**：用 HTML、CSS 和动画运行时制作视频的开发者，以及维护现有 HyperFrames 项目的 Agent。写合成 HTML 前应先读此 Skill；动画运行时细节还需查阅对应的 `hyperframes-animation` 适配器资料。
- **为什么现在值得看**：进入 Trending，安装量为 **18,632**，是本次所列条目中最高的。它集中记录了首轮构建常见错误，适合在动手前作为实现检查清单。
- **如何使用**：Skill 安装方式请在原页面查看。先按最小合成骨架建立项目；修改已有项目时，用 `npx hyperframes timeline [--json]` 查看轨道、片段及起止时间。完成后先清除 `lint` 错误，再看 `check` 的布局与对比度检查；执行 `render` 后检查摘要第二行的渲染路径、GPU 模式和阶段耗时。
- **注意**：
  - 独立合成根节点直接放在 `<body>` 中，不包 `<template>`；模板子合成的 `<style>`、`<script>` 应放在模板内部。
  - GSAP 合成只注册一个暂停时间线，注册键必须匹配 `data-composition-id`，且应在构建完成后注册。根 `data-duration` 会截断超出的内容。
  - 不要在 `.clip` 上动画化 `display`、`visibility` 或 `autoAlpha`；不要给音视频加 `crossorigin`；每个 `<audio>` 都需要 `id`。
  - 禁止渲染时使用时钟、未设种子的随机数、网络或输入状态。存在 lint 错误时，布局和对比度审计会停用，`0 sample(s)` 不代表检查通过。
  - 若通过 HyperFrames 插件安装，执行设置或更新相关命令前须遵循插件执行规则。

## [ai-music](https://www.skills.sh/gencraft-labs/skills/ai-music)
- **它做什么**：给定资料未提供原始说明，也未读取到 SKILL.md。目前无法确认其核心能力、工作流或实际产出，不宜仅凭名称断定它支持音乐生成、编辑或其他功能。
- **适合谁用**：目标使用者、典型场景和前置条件尚无法确认。对该条目感兴趣的开发者，应先查看原页面及来源仓库。
- **为什么现在值得看**：进入 Trending，安装量为 **15,209**，可作为进一步调研的热度线索；这不代表今日新增安装，也不能替代功能评估。
- **如何使用**：请在原页面查看安装方式。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

## [reddit-automation](https://www.skills.sh/flowkit-labs/skills/reddit-automation)
- **它做什么**：给定资料未提供原始说明，也未读取到 SKILL.md。无法确认其具体自动化操作、接入方式或产出，因此不推断它支持发帖、评论、采集或账号管理。
- **适合谁用**：目标使用者和实际场景需待来源文档确认。评估时应先核对工作流、依赖及权限要求，当前资料不足以判断适用性。
- **为什么现在值得看**：进入 Trending，安装量为 **15,106**，值得列入候选调研清单；榜单信号仅说明当前趋势，不构成功能或安全结论。
- **如何使用**：请在原页面查看安装方式。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

## [hyperframes-keyframes](https://www.skills.sh/heygen-com/hyperframes/hyperframes-keyframes)
- **它做什么**：为 HyperFrames 合成编写可按时间定位的视觉关键帧，包括推拉镜头、缩放重构图、Ken Burns、路径运动、遮罩、SVG 和 3D 深度等。工作流是先明确运动主体、关键姿态与最终状态，再选择实现机制，编写动画并通过诊断和快照验证。它负责可见运动，不负责片段剪接、重排或源素材范围选择。
- **适合谁用**：需要精确控制视频运动效果的前端、动效开发者和 Agent。前提是已有或准备建立 HyperFrames 合成，并使用 GSAP、CSS keyframes、Anime.js、WAAPI 等声明的运行时；剪辑与音频处理需分别结合 core 和 audio 技能。
- **为什么现在值得看**：进入 Trending，安装量为 **10,378**。其价值在于把“动画看起来动了”推进到“任意时间定位后仍正确，并有画面证据”，适合需要稳定渲染的项目。
- **如何使用**：Skill 安装方式请在原页面查看。按“主体与姿态 → 最小实现机制 → 可定位关键帧 → 验证”的顺序推进；运行 `hyperframes check`、`hyperframes keyframes`，再结合一次聚焦的 `--shot` 检查和关键时间点快照。验证失败时先修源关键帧，再重跑最小范围的失败诊断，最后渲染。
- **注意**：
  - GSAP 使用 `gsap.timeline({ paused: true })`，构建完成后注册到 `window.__timelines[compositionId]`；关键渲染动画不要调用 `tl.play()`。
  - 禁用时钟、未设种子的随机数、定时器、悬停或滚动触发、未注册的 `requestAnimationFrame` 及无限循环。
  - 镜头重构图是手工编写几何参数，不是人脸跟踪；匹配剪辑不提供自动匹配帧发现。
  - 不支持任意源素材中间帧直接冻结，需预处理为静帧或派生片段。不要在 `.clip` 本体上控制可见性，应动画化内部包装节点。
  - 插件安装场景下，设置或更新前须先遵循插件执行规则。

## [hyperframes-registry](https://www.skills.sh/heygen-com/hyperframes/hyperframes-registry)
- **它做什么**：搜索、安装并接入 HyperFrames 注册表中的 block 和 component；来源说明称约有 400 个托管条目，可在手写指定视觉效果前先检索。Block 是拥有独立尺寸、时长和时间线的子合成；component 是合并进宿主 HTML、CSS、JS 的效果片段。它也提供新条目从脚手架、验证到提交上游 PR 的工作流入口。
- **适合谁用**：需要图表、终端窗口、颗粒、扫光或转场等可复用视觉元素的开发者。目录搜索无需已有项目或账号；接入时需要理解宿主合成结构，安装文件则需要网络。
- **为什么现在值得看**：进入 Trending，安装量为 **10,373**。它与 core、keyframes 形成互补：先找现有实现，再接入合成并调整动画，避免一开始就重复手写。
- **如何使用**：Skill 本身的安装方式请在原页面查看；以下是来源提供的**注册表条目安装与检索命令**：
  ```bash
  npx hyperframes catalog --query "reveal a headline one line at a time"
  npx hyperframes add caption-clip-wipe

  hyperframes add data-chart
  hyperframes add grain-overlay
  hyperframes add captions
  hyperframes add shimmer-sweep --dir .
  hyperframes add data-chart --json
  hyperframes add data-chart --no-clipboard
  ```
  Block 默认写入 `compositions/<name>.html`，通过 `data-composition-src` 接入，并补齐匹配的合成 ID、开始时间和轨道属性；component 默认写入 `compositions/components/<name>.html`，需分别合并 HTML、CSS 和 JS。CI 或 Agent 工作流宜用 `catalog --json` 后显式执行 `add`，避免交互选择器直接安装。
- **注意**：
  - 搜索必须用英文。默认按词汇匹配；`--on-device` 提供语义排序，但需要经同意下载一次约 **33 MB** 的模型。
  - 搜索在本地执行、不发送查询；单独执行 `feedback --search-miss ...` 才会上报查询。来源要求在结果无法满足需求时明确报告缺口。
  - 已缓存清单可在刷新失败时继续用于发现，但 `add` 每次都要联网取文件，不能承诺离线安装。
  - `add` 只安装 block 和 component；示例使用 `hyperframes init <dir> --example <name>`。参数先按精确条目名解析，再按标签匹配；标签匹配会安装该标签下的所有 block。
  - `data-track-index` 只控制 Studio 时间线显示行，视觉层级应使用 CSS `z-index`。插件场景仍须先遵循插件执行规则。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*