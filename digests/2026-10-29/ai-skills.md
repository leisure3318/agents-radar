# AI Skills 新上榜日报 2026-10-29

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-10-29 02:48 UTC

---

今日发现：2026-10-29 的新上榜条目中，HyperFrames 的两项 Trending Skill 分别面向现场演示和 Figma 设计导入，工作流与交付边界都很具体。Hot 榜则出现了动效减法、写作规范和工程判断原则，重点不是增加功能，而是约束修改方式、减少返工。

## [slideshow](https://www.skills.sh/heygen-com/hyperframes/slideshow)
- **它做什么**：构建可现场播放的 HyperFrames 演示文稿，也能把已有页面改成演示。每页是顶层 scene，通过写在 HTML 中的 JSON 声明主线页面、分步揭示、分支热点和演讲者备注。实际交付是可运行的 deck 与访问 URL，**不是 MP4**。
- **适合谁用**：需要产品演示、技术分享或交互式讲解的开发者；前提是按 HyperFrames composition 契约组织项目。迁移已有页面时，需要保留原来的视觉、交互及媒体行为，而不是用近似静态图替代。
- **为什么现在值得看**：进入 Trending（24 小时趋势），给定安装量为 **8,447**，并非今日新增。值得关注的是它把分支导航、备注和观众窗口纳入了明确的交付流程。
- **如何使用**：资料未提供安装命令，请在原页面查看安装方式。手工制作具名视觉元素前，先运行 `npx hyperframes catalog --query "<英文视觉描述>" --json`；完成后反复执行 `npx hyperframes check --json`，直至检查通过。用 `npx hyperframes present <project-dir>` 启动并交付打印出的 URL；静态截图使用 `snapshot --at`。
- **注意**：JSON 岛必须直接写入 HTML，不能由脚本生成；fragment 使用绝对时间，导航只 seek、不连续播放，因此每个停留状态都必须能独立正确显示。不要用 `render` 导出 deck：来源明确指出它只保留首个 scene，并会静默截断。根页面应使用 `<hyperframes-slideshow>` 包裹播放器，不要重做其导航与演讲者控件；插件环境还须先遵循插件执行规则。Google Meet 应共享观众标签页，Zoom 应将其独立成窗口再共享，完全被遮挡的窗口会冻结。

## [figma](https://www.skills.sh/heygen-com/hyperframes/figma)
- **它做什么**：将 Figma 素材、品牌 token 和组件导入 HyperFrames 视频项目，组件可转换为保持精确几何布局的可编辑 HTML。导入发生在构建阶段，文件及来源记录保存在本地，渲染时不再请求 Figma。它也定义了动效转换和分镜重建流程：把连续画面视为元素状态之间的变化，而不是逐张播放幻灯片。
- **适合谁用**：需要复用 Figma 品牌资产、产品 UI 或动效分镜的视频开发者。素材、token 和组件走 REST，需要 `FIGMA_TOKEN`；动效和 shader 数据需要 Figma connector，或由用户提供原生导出。
- **为什么现在值得看**：进入 Trending（24 小时趋势），给定安装量为 **8,255**。其具体价值在于覆盖了从设计导入、变量绑定到像素与运动验证的链路，而不只是下载图片。
- **如何使用**：资料未提供安装命令，请在原页面查看安装方式。先确认 shell 或项目 `.env` 中存在 `FIGMA_TOKEN`，再按需求运行：
  - 素材：`npx hyperframes figma asset '<url or fileKey:nodeId>' --format svg|png --scale 2 --description "<说明>"`
  - 品牌变量：`npx hyperframes figma tokens <fileKey>`，应先于组件导入运行，并将输出条目放入 `data-composition-variables`。
  - 可编辑组件：`npx hyperframes figma component '<url or fileKey:nodeId>'`
  
  重要组件应另导出同节点 PNG 对照。动效通过 `motionContextToDocs` → `motionToGsap` → `emitTimelineScript` 转换，再用 `verify-motion.mjs --reference <export.mp4> --render <render.mp4> --crop WxH+X+Y` 验证。
- **注意**：没有 token 时应指导用户自行创建并停止，不要让用户把 token 粘贴进聊天；权限至少涉及只读 File content、File metadata，非 Enterprise 方案导入 token 还涉及 Library content。非 Enterprise 的变量请求可回退到 published styles。shader 导出会被压成底色，应请求原生 PNG/MP4；无法转换的动效可冻结为视频素材。运动验证低于 15 dB 应修正转换，不能降低阈值；分镜建议每批约 4 帧，超过约 12 个节点可能超时。最终 composition 不应留下 Figma URL。

## [remove-animations](https://www.skills.sh/emilkowalski/skills/remove-animations)
- **它做什么**：审查界面已有动画，按触发方式、使用频率、功能目的和时长决定删除、缩减或保留，并直接修改代码。工作流包括扫描候选、记录判定分支、检查删除风险、清理遗留代码和验证。它只做动效减法，不负责新增动画，也不修复保留动画的缓动、原点或可中断性。
- **适合谁用**：觉得应用“慢”“动画过多”，想精简仪表盘、后台或高频交互的前端开发者。需要能读取并修改项目代码；若项目已有类型检查和测试，应一并运行。
- **为什么现在值得看**：进入 Hot（小时爆发），给定安装量为 **30**。它提供了可落到代码位置的删减标准，尤其针对快捷键弹窗、高频导航、反复入场的数据图表和无目的装饰。
- **如何使用**：资料未提供安装命令，请在原页面查看安装方式。先识别技术栈、动效库和各界面的使用频率，再搜索 `transition`、`@keyframes`、`motion.`、`AnimatePresence`、`whileInView`、`stagger` 等。逐项判定并编辑，之后运行项目类型检查与测试，搜索被删名称以确认没有残留引用；最终报告须包含“删除与缩减”“刻意保留”“清理与结论”三部分。
- **注意**：删除动画必须同时处理隐藏初态、动画结束回调、延迟卸载、焦点移动及相关测试，否则可能留下不可见元素或无意义等待。如果布局动画掩盖了布局跳变，应保留并报告，修布局不在范围内。有文档说明理由的动画应保留；卸载动效依赖前必须询问用户。首次调用且没有具体问题时，来源要求只返回指定的英文就绪语。

## [writing](https://www.skills.sh/masseater/skills/writing)
- **它做什么**：为文档、注释、提交消息、PR 正文、文章及小说提供写作和修订规范，也用于处理“AI 味重”或难读的文字。核心是先明确读者需要作出的判断及其理由，再安排结构、句子和阅读节奏，而不是机械套用句式。它区分工作手册、参考、解释和教程四种文档，主张避免混杂阅读目的。
- **适合谁用**：编写开发文档、README、AI 上下文文件或日语内容的开发者与作者。使用时需要配合阅读其引用规范；日语措辞另遵循 `philtzjp/skills` 的 `japanese`。
- **为什么现在值得看**：进入 Hot（小时爆发），给定安装量为 **27**。它值得看的地方是把“为什么写、读者如何理解”置于措辞润色之前，并明确反对复制可从代码导出、容易过期的信息。
- **如何使用**：资料未提供安装命令，请在原页面查看安装方式。先确定文档类型、目的及需要保护的信息，再调整结构与表达；阅读 `references/rhythm.md`，解释性文章还须阅读目的与理由、易过期信息、标点、目的优先和标题等引用文件。编写 README、AI 上下文或小说时，再进入对应 `usecases/`。
- **注意**：这是一套写作规范，给定资料没有 CLI 或自动验证命令。它依赖 `humanity-and-humanness`、日语规范及多个引用文件；本次材料只提供这些文件的链接或摘要，未包含正文，不能据此扩展出更具体规则。来源明确要求按文字承担的功能判断，不应机械套用禁令，也不能为追求简短而删掉必要上下文。

## [poteto-principles](https://www.skills.sh/masseater/skills/poteto-principles)
- **它做什么**：为设计、实现、修复、重构、迁移、验证和文档修改提供工程判断原则。内容包括先确定数据结构、修根因、构建可重复工具、让操作幂等、迁移调用方后删除旧 API，以及用用户可见行为验证结果。它是判断框架，不是自动执行某项开发任务的工具。
- **适合谁用**：承担跨模块修改、API 迁移、重构和验证工作的开发者，尤其适合在动手前补查容易遗漏的设计与执行视角。
- **为什么现在值得看**：进入 Hot（小时爆发），给定安装量为 **27**。它把“少改一点”“验证实物”“减少共享可变状态”等经验整理为可查阅的原则，适合辅助审视改动方案。
- **如何使用**：资料未提供安装命令，请在原页面查看安装方式。来源要求开始相关工作时阅读此 Skill，并阅读 `references/` 中的全部原则。可先依据其中列出的视角审视方案，再把工作切成可验证的小单元，逐项实施并检查用户实际看到的结果；没有提供启动或验证 CLI。
- **注意**：给定材料只有原则索引和一句话摘要，没有各引用文件的正文，因此不能把摘要扩展成未提供的实施细则。其中“可逆工作不等待人工确认”等表述属于该原则集的执行取向，不代表已获得具体项目的操作授权。来源也未声明特定运行时或工具依赖。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*