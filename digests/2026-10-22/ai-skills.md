# AI Skills 新上榜日报 2026-10-22

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-10-22 01:48 UTC

---

今日发现：2026-10-22 的新上榜条目中，图像生成、视频生成与 X 发布三个 Skill 共用 `belt` CLI，可衔接成“生成素材→发布内容”的工作流。另一项值得开发者关注的是 HyperFrames 迁移 Skill：它明确区分原生转换、托管和媒体导入，并要求逐帧验证，而不是只求“能播放”。

## [ai-video-generation](https://www.skills.sh/skills-shell/superpowers/ai-video-generation)
- **它做什么**：通过 inference.sh CLI 调用 40 多种视频模型，覆盖文生视频、图生视频、参考图生视频、口型同步和头像动画。还可调用自然语言视频编辑、拟音、超分辨率及带转场的片段合并工具，组合出生成与后处理流程。
- **适合谁用**：制作产品演示、营销短片、社交媒体视频或数字人口播的开发者与内容团队。前置条件是安装 inference.sh 的 `belt` CLI 并登录；图生视频、口型同步等流程还需提供图片或音频 URL。
- **为什么现在值得看**：进入 Trending（24 小时趋势），给定安装量为 **9,714**，并非今日新增。它将多家模型和后处理工具放在同一套 CLI 工作流中，适合评估跨模型的视频生产管线。
- **如何使用**：
  ```bash
  # 安装来源文档推荐的 belt CLI skill
  npx skills add belt-sh/cli

  # 安装 belt CLI 后登录并生成视频
  belt login
  belt app run google/veo-3-1-fast --input '{"prompt":"drone shot flying over a forest"}'

  # 浏览视频应用
  belt app list --category video
  ```
  需要带同步音频的视频时，来源示例使用 `bytedance/seedance-2-0`，传入 `generate_audio: true`；后处理可分别调用 `infsh/hunyuanvideo-foley`、`falai/topaz-video-upscaler` 和 `infsh/media-merger`。
- **注意**：各模型输入字段并不统一，例如 Wan 示例用 `image_url`，Seedance 用 `image` 或 `reference_image`。分辨率和时长限制也因模型而异：文档列出 Seedance 2.0 最高 1080p、HappyHorse T2V 最长 15 秒、HappyHorse I2V 最高 1080P／15 秒，不能视为所有模型的统一能力。

## [twitter-automation](https://www.skills.sh/skills-shell/superpowers/twitter-automation)
- **它做什么**：通过 `belt` 调用 Twitter/X 应用，发布文字或带媒体的帖子，并执行点赞、转发、删除、发私信、关注及查询操作。文档还给出“先生成图片或视频，再把结果 URL 交给 `x/post-create`”的串联流程。
- **适合谁用**：需要把内容生产接到 X 发布环节的开发者、社媒运营和自动化工作流维护者。需安装并登录 `belt`，并参考来源所链接的 X.com Integration 文档完成集成配置。
- **为什么现在值得看**：进入 Trending（24 小时趋势），给定安装量为 **9,713**。它与本期两个媒体生成 Skill 使用同一 CLI，值得关注的是素材生成与发布之间的连接方式，而不只是单独发帖。
- **如何使用**：
  ```bash
  npx skills add belt-sh/cli
  belt login

  # 发布文字
  belt app run x/post-tweet --input '{"text":"Just shipped a new feature!"}'

  # 获取带媒体帖子的输入样例，编辑后执行
  belt app sample x/post-create --save input.json
  belt app run x/post-create --input input.json
  ```
  带媒体输入示例包含 `text` 和 `media_url`；其他操作使用对应应用，如 `x/post-get` 接收 `tweet_id`，`x/user-get` 接收 `username`。
- **注意**：依赖 inference.sh 的 `belt` CLI。虽然描述提到内容调度，但给定正文未提供定时发布命令或调度参数；图片、视频联动示例中的结果 URL 也需要从生成结果中提取并填入，不能直接把占位符当作可运行输入。

## [ai-image-generation](https://www.skills.sh/skills-shell/superpowers/ai-image-generation)
- **它做什么**：通过 inference.sh CLI 调用 50 多种图像模型，覆盖文生图、图像编辑、局部重绘、LoRA 风格、文字渲染和超分辨率。文档提供 GPT-Image-2、FLUX、Gemini、Grok、Seedream、Reve 等入口，也给出多图横向拼接的示例。
- **适合谁用**：为产品原型、营销物料、概念设计和社交内容批量生成视觉素材的开发者或设计团队。需安装并登录 `belt`；编辑和放大流程需要提供源图 URL。
- **为什么现在值得看**：进入 Trending（24 小时趋势），给定安装量为 **9,713**。它提供同一 CLI 下的多模型入口，也能为图生视频和 X 媒体发布流程提供前置素材。
- **如何使用**：
  ```bash
  npx skills add belt-sh/cli
  belt login

  # 文生图
  belt app run falai/flux-dev-lora --input '{"prompt":"a cat astronaut in space"}'

  # 使用现有图片进行编辑
  belt app run openai/gpt-image-2 --input '{
    "prompt":"change the background to a beach at sunset",
    "images":["https://your-image.jpg"]
  }'

  # 浏览图像应用
  belt app list --category image
  ```
  放大图像使用 `falai/topaz-image-upscaler`，传入 `image_url`；拼接使用 `infsh/stitch-images`，传入图片数组及 `direction`。
- **注意**：依赖 `belt` CLI；不同模型的参数与能力不能通用套用，例如编辑示例使用 `images` 数组，放大工具使用 `image_url`。文档中的 2K–4K、LoRA 或文字渲染能力均对应具体模型，不代表所有入口都具备这些能力。

## [review-loop](https://www.skills.sh/2dmurali/review-loop-skill/review-loop)
- **它做什么**：给定资料没有原始说明，也未读取到 SKILL.md。目前只能确认条目名称与来源，无法据此判断其审查对象、循环流程或实际产出。
- **适合谁用**：目标使用者、典型场景和前置条件均待核实；建议先审阅来源仓库，再判断是否适合现有开发流程。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，给定安装量为 **400**，说明它值得进一步查看，但榜单信号本身不能证明功能或质量。
- **如何使用**：请在原页面查看安装方式。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

## [remotion-to-hyperframes](https://www.skills.sh/heygen-com/hyperframes/remotion-to-hyperframes)
- **它做什么**：把已有视频代码或渲染素材导入 HyperFrames，并与原始视频逐帧对比。它分为三种导入层级：Native 转为 HTML＋GSAP，保留元素级编辑；Hosted 保留浏览器绘制代码，由 HyperFrames 控制时间；Media 则导入渲染文件，只编辑剪切、位置和图层。
- **适合谁用**：将 Remotion 项目或 Motion Canvas、Lottie、Three.js、p5.js 等动画迁入 HyperFrames 的开发者，也适合复用 Manim、After Effects、Blender 渲染结果的团队。前置条件取决于导入路线；Native 的 Remotion 检查需用到 `python3`，验证流程使用 HyperFrames CLI 和原始视频。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，给定安装量为 **195**。它的看点是明确规定迁移边界、可编辑程度和验证步骤，适合已有视频工程的迁移评估。
- **如何使用**：给定资料未提供安装命令，请在原页面查看安装方式。核心检查与验证命令如下：
  ```bash
  # Remotion 迁移前先检查源代码
  python3 <SKILL_DIR>/scripts/lint_source.py <source-dir>

  # 迁移后，在指定时间点与原视频逐帧对照
  npx hyperframes snapshot --at <t,…> --against <original.mp4>

  # 对两个渲染文件进行逐帧 SSIM 检查
  scripts/render_diff.sh <original.mp4> <hf.mp4> <out>
  ```
  Native 转换需按场景拆分子合成，将帧数换算为秒、资源路径改为根相对路径，并把原始 props 映射为可编辑变量。验证应覆盖每个场景及每次切点两侧；无法完整迁移的内容写入 `TRANSLATION_NOTES.md`。
- **注意**：Remotion 中的 `useState`、`useReducer`、带依赖的 `useEffect`、异步 `calculateMetadata` 和所列 React UI 套件属于原生转换阻断项，必须托管或重构，不能近似替代。Hosted 不得以 `requestAnimationFrame` 或计时器为时间源，随机性必须使用种子；依赖墙上时钟、实时物理或网络的代码只能作为媒体导入。对比时，Remotion 侧需设置 PNG 和 `bt709`，避免编码差异干扰；若处于 HyperFrames 插件内，执行设置或更新检查命令前须遵循插件执行规则。最终交付还需逐项说明导入层级、Studio 可编辑范围及逐帧比较结果。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*