# AI Skills 新上榜日报 2026-10-20

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-10-20 02:03 UTC

---

# AI Skills 新上榜日报｜2026-10-20

**今日发现**：今天的 5 个新条目均同时进入 Trending（24 小时趋势）与 Hot（小时爆发），其中 4 个来自 HyperFrames，分别覆盖短动效、自由视频创作、产品宣传和无出镜讲解。另一个是浏览器自动化工具 agent-browser，其使用文档由已安装 CLI 动态提供；以下安装量均为给定榜单数据，**不是今日新增量**。

## [motion-graphics](https://www.skills.sh/heygen-com/hyperframes/motion-graphics)
- **它做什么**：制作以运动设计为核心的短片，例如动态文字、数字递增、数据图表、Logo 演绎、地图和网页动效，产出 MP4 或透明叠加素材。流程是先判断是否需要搜索素材，再围绕已取得的素材设计镜头，由子代理完成规划、设计和构建，最后执行检查与预览；纯文字、数字等类别可跳过素材获取。
- **适合谁用**：需要制作短标题、数据展示、品牌片头或社交叠加层的开发者与设计团队。默认面向通常不足 10 秒、最长约 30 秒、无旁白且无真人主体的动效；更长、有旁白或多场景的内容应交给 `/hyperframes` 重新路由。
- **为什么现在值得看**：同时出现在 Trending 与 Hot，给定安装量为 **467**。值得关注的是其“素材先行、复用组件、验证后再请求渲染”的明确生产流程，而不只是动效生成能力。
- **如何使用**：资料未给出独立 Skill 安装命令，请在原页面查看安装方式。首次环境检查运行 `npx hyperframes doctor`；独立安装场景下，更新前须征求用户确认：
  ```bash
  npx hyperframes skills update motion-graphics
  ```
  项目尚无 `hyperframes.json` 时初始化：
  ```bash
  npx hyperframes init "videos/<project-name>" --non-interactive --example=blank --skill=motion-graphics
  ```
  检查 `shot-plan.json` 是否生成，随后执行文档列出的 `lint`、`check` 和证明快照检查；通过后打开 Studio 预览，经明确批准才运行 `hyperframes render`。透明叠加可选择 `--format webm/mov`。
- **注意**：明确支持 macOS Apple Silicon 或 Linux x64，依赖 Node、FFmpeg；原文给出的工具安装命令为 `brew install node ffmpeg`。macOS GPU 渲染使用 `export PRODUCER_BROWSER_GPU_MODE=hardware`。不得在工作区根目录初始化，项目命令须在项目目录子 shell 中运行；Figma 输入必须先走 `/figma`。搜索不可用时可退化为无素材方案并记录到 `context.log`；自动构建不等于自动获准渲染。

## [agent-browser](https://www.skills.sh/vercel-labs/agent-browser/agent-browser)
- **它做什么**：为 AI Agent 提供浏览器自动化 CLI，可用于页面导航、表单填写、点击、截图、数据提取和 Web 应用测试。底层通过 CDP 操作 Chrome/Chromium，以可访问性树快照和紧凑的 `@eN` 元素引用组织交互；还提供 Electron、Slack、探索式测试及云浏览器等专项工作流。
- **适合谁用**：开发浏览器 Agent、执行重复性网站操作或开展 QA 的开发者。Electron 桌面应用、Slack、Vercel Sandbox 和 AWS Bedrock AgentCore 场景，应先加载对应专项文档。
- **为什么现在值得看**：同时进入 Trending 与 Hot，给定安装量为 **417**。其突出之处是由 CLI 返回与安装版本匹配的操作指南，减少静态 Skill 文档与实际命令不一致的问题。
- **如何使用**：给定安装命令为：
  ```bash
  npm i -g agent-browser && agent-browser install
  ```
  安装后，开展自动化前先读取核心工作流，而不是直接猜测操作命令：
  ```bash
  agent-browser skills get core
  agent-browser skills get core --full
  ```
  用 `agent-browser skills list` 查看当前版本提供的内容；按任务加载 `agent-browser skills get electron`、`slack`、`dogfood` 或 `derive-client` 等专项指南。
- **注意**：给定 SKILL.md 是发现入口，不是完整使用手册，具体工作流和故障排查须从 CLI 加载。它明确不依赖 Playwright 或 Puppeteer。可观测性 Dashboard 独立运行于 **4848** 端口；Agent 应留在 Dashboard 的来源域，内部会代理会话状态和流量，无需暴露各会话端口。

## [general-video](https://www.skills.sh/heygen-com/hyperframes/general-video)
- **它做什么**：当专用流程不适用时，创建或编辑自定义 HyperFrames 视频，覆盖较长、多场景、品牌集锦、蒙太奇、静态循环、标题卡和素材重剪。它优先读取已有项目状态：明确的修改直接执行，已有简报则沿用决策，新创作先经 `/hyperframes` 确认路线。
- **适合谁用**：需要自由编排多场景视频、修改已有作品，或希望以 `flow: companion` 与 Agent 协作创作的开发者及视频团队。构建时需按阶段加载 core、creative、animation、media-use 等相关技能。
- **为什么现在值得看**：同时进入 Trending 与 Hot，给定安装量为 **468**。它把续作、协作方式、资源用量与时间轴编辑纳入同一流程，适合已有项目迭代，而不仅是一次性生成。
- **如何使用**：资料未给出独立 Skill 安装命令，请在原页面查看安装方式。启动时先读取用量并更新工作流：
  ```bash
  npx hyperframes usage --json
  npx hyperframes skills update general-video
  ```
  新项目经 `/hyperframes` 路由后初始化：
  ```bash
  npx hyperframes init "videos/<project>" --non-interactive --example=blank --skill=general-video
  ```
  起草后、渲染前等里程碑再次检查用量。剪切已有视频时，用 `data-media-start` 与 `data-duration` 定义源片段，以 `data-start` 定义时间轴位置；带声音的片段保留 `data-has-audio="true"`。
- **注意**：用量未知时必须说明，不能猜测额度；更新失败也必须报告。时间剪辑由 `/hyperframes-core` 负责，keyframes 只用于缩放、平移、遮罩等视觉属性动画。首次调用需认证的媒体提供方前，运行 `npx hyperframes auth status` 并原样展示结果；协作模式等待登录或明确选择离线，自动模式只能使用可用的离线提供方，无法满足要求时须报告阻塞。协作模式不会取消验证、最终预览和渲染审批。

## [product-launch-video](https://www.skills.sh/heygen-com/hyperframes/product-launch-video)
- **它做什么**：将产品或营销 URL、脚本、简报转成产品发布与宣传视频，也用于网站导览和原样展示。流程依次产出网站捕获资料、设计规范 `frame.md`、分镜与脚本、音频元数据、逐帧 HTML，最终输出 `renders/video.mp4`。
- **适合谁用**：制作 SaaS 宣传、功能发布、产品演示、应用或公司发布视频的开发者与营销团队。新项目先由 `/hyperframes` 确认简报；已有项目则恢复状态，不重复盘问需求。
- **为什么现在值得看**：同时进入 Trending 与 Hot，给定安装量为 **423**。值得重点阅读的是网站捕获的验收条件：失败后不能继续使用半成品素材，也不能擅自虚构网站页面来完成视频。
- **如何使用**：资料未给出独立 Skill 安装命令，请在原页面查看安装方式。独立安装场景下，经用户确认后更新：
  ```bash
  npx hyperframes skills update product-launch-video
  ```
  初始化并检查登录状态，再捕获目标网站：
  ```bash
  npx hyperframes init "videos/<project>" --non-interactive --example=blank --skill=product-launch-video
  npx hyperframes auth status
  npx hyperframes capture "<URL>" -o ./capture --json
  ```
  后两条及后续相对路径命令在项目根目录执行。捕获完成立即检查 JSON、输出目录和必需文件；设计预设通过 `node <SKILL_DIR>/scripts/build-frame.mjs --preset <name> --hyperframes .` 转成项目规范。
- **注意**：捕获返回非零、JSON 为 `ok: false` 或存在 `capture/BLOCKED.md`，均须停止该捕获路线；不能消费部分截图或 DOM。原样展示应使用真实截图，整页重建仅限用户明确要求风格化演绎。`auth status` 未登录时退出码为 1 属正常状态，不应重试或用 `&&` 意外中断流程；离线能力不足必须报告。Figma 输入先走 `/figma`，素材先经 `/media-use`；分镜、预览和渲染须遵循简报约定的审批节点。

## [faceless-explainer](https://www.skills.sh/heygen-com/hyperframes/faceless-explainer)
- **它做什么**：把文章、笔记、主题或简报转成无出镜讲解视频，用文字、抽象图形、图解和数据可视化逐场景表达内容。它没有网站捕获环节：先保存原文，再选择设计预设、组织教学分镜与旁白、生成音频、逐帧构建并输出 MP4；叙事顺序可以重排、合并和压缩，不必照搬原文段落。
- **适合谁用**：制作概念解释、操作教程、清单类内容的开发者、技术教育者与内容团队。前提是以文本解释主题，而非展示产品网站；后者应转到 `/product-launch-video`。
- **为什么现在值得看**：同时进入 Trending 与 Hot，给定安装量为 **421**。其区分了“信息来源”和“视觉设计”：原文负责教学事实，分镜负责讲述方式，不能为了套用动画蓝图而新增事实或段落。
- **如何使用**：资料未给出独立 Skill 安装命令，请在原页面查看安装方式。独立安装场景下，经用户确认后更新并初始化：
  ```bash
  npx hyperframes skills update faceless-explainer
  npx hyperframes init "videos/<project>" --non-interactive --example=blank --skill=faceless-explainer
  ```
  在项目中写入 `BRIEF.md`，运行 `npx hyperframes auth status`，并创建保存原文的 `capture/extracted/visible-text.txt` 与设计令牌 `tokens.json`。随后执行：
  ```bash
  node <SKILL_DIR>/scripts/build-frame.mjs --preset <name> --hyperframes .
  ```
  脚本退出码为 0 后进入分镜与脚本阶段；需要旁白时生成 `SCRIPT.md`，音频阶段在分镜审批节点通过后开始。
- **注意**：**不要运行 `npx hyperframes capture`**，也不要创建虚构的素材清单或填充 `capture/assets/`。用户提供的真实图片可放入 `public/<basename>` 并记入分镜。未明确提供品牌色和字体时，`tokens.json` 对应字段保持为空，使用预设配色。协作模式需审阅分镜；自动模式可通知后继续，但仍保留最终预览与渲染审批。给定来源在音频步骤开头截断，不能据此补写后续生成或验证命令。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*