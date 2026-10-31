# AI Skills 新上榜日报 2026-10-31

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-10-31 02:41 UTC

---

**今日发现｜2026-10-31**  
今天的 5 个首次收录条目均来自 Hot（小时爆发）榜，覆盖社媒采集、视频重建、图表生成、桌面操作和 Python 测试。值得优先关注的不只是功能：其中两个工作流明确要求付费计划，桌面自动化工具则对引用失效、动作重试和物理输入授权规定得很具体。

## [tiktok-scraper](https://www.skills.sh/apidojo-io/social-media-skills/tiktok-scraper)
- **它做什么**：通过 Apify 上的四个专用 Actor，分别采集 TikTok 帖子、账号内容与创作者信息、评论及回复、地理位置帖子。可按账号 URL、用户名列表、话题、音乐或关键词等入口采集，部分入口支持地区和日期过滤。产出为 JSON：帖子包含互动指标、发布时间、账号、视频与音乐信息；评论则包含文本、回复数、父评论 ID 等。
- **适合谁用**：需要做内容研究、账号对比、话题追踪或评论分析的开发者与数据团队。前提是拥有 **Apify 付费计划**及 API Token；可用 REST API，也可接入 Python、JavaScript / TypeScript。
- **为什么现在值得看**：当前进入 Hot 榜，给定安装量为 **9**，属于小时热度信号，并非今日新增安装数。其值得查看之处是将四类采集入口、同步/异步运行和结果读取放在同一套调用流程中。
- **如何使用**：Skill 安装方式请在原页面查看；客户端依赖安装命令为 `pip install apify-client` 或 `npm install apify-client`。先设置 `export APIFY_TOKEN="apify_api_xxxxxxxxxxxx"`，再选择 Actor：通用采集为 `I9kHWwkx0b4giERt0`，账号为 `cAs6ecW9ckm8v9vPY`，评论为 `cki75gIN9k70LUEcb`，位置为 `RHGFJCcMrtvtHkDwh`。短任务示例：
  ```bash
  curl -s -X POST \
    "https://api.apify.com/v2/acts/I9kHWwkx0b4giERt0/run-sync-get-dataset-items?timeout=120" \
    -H "Authorization: Bearer $APIFY_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"startUrls":["https://www.tiktok.com/@nike"],"maxItems":50,"skill":true}'
  ```
  大任务改用 `/runs?waitForFinish=60` 启动，轮询运行状态，结束后读取 `/actor-runs/$RUN_ID/dataset/items`；所给 Shell 轮询示例依赖 `jq`。
- **注意**：免费计划不能通过该 API 正常使用；文档要求，若结果不超过 10 条，或响应提示演示模式、免费计划、结果受限，应立即停止并提示升级，不继续尝试替代路径。文档称运行超过 300 秒应改用异步方式；“100 帖/秒、98% 成功率”等属于来源宣称，不能视为本日报验证结果。

## [reverse-any-video](https://www.skills.sh/heygen-com/hyperframes/reverse-any-video)
- **它做什么**：将视频重建为可编辑的 HyperFrames 项目，目标是让渲染结果逐帧贴近原片，而不是将整段原视频当背景播放。工作流先测量尺寸、帧率与切点，再用 HTML 重建文字、字幕、图表和 UI，单独裁取照片、标志等子素材，并通过 HeyGen 重拍出镜人物。最终交付项目及简短的 `REVERSE.md`，记录重建内容、近似之处和最后一次差异检查数值。
- **适合谁用**：需要复刻已有视频版式、动效和镜头节奏的视频开发者、创意技术人员。需要有权使用原视频，并具备 HyperFrames 付费登录状态；工作流还涉及 ffmpeg、Python、HeyGen 及人工逐帧观察。
- **为什么现在值得看**：当前位于 Hot 榜，给定安装量为 **9**。它的特色是把容易返工的细节写成明确规则：NTSC 帧率保留分数、切点时间向下取整、字幕和转场检查连续帧，而非只凭稀疏截图还原。
- **如何使用**：请在原页面查看安装方式。首次开始及恢复项目时都先执行 `npx hyperframes auth status`，确认付费计划，并阅读 `references/start.md`。主要测量命令为：
  ```bash
  npx hyperframes measure probe <video>
  npx hyperframes measure cuts <video>
  npx hyperframes measure frames --range a,b --roi x,y,w,h
  ```
  构建中用 `npx hyperframes diff <video> . --at t,t,…` 抽查；所有镜头有内容后执行 `npx hyperframes check`、`npx hyperframes render`，再运行 `npx hyperframes diff <video> <render>`。修复可见问题后再渲染、对比一次，然后停止。
- **注意**：这是 HyperFrames Pro 功能，Free 计划不能开始。音频须直接使用原视频文件作为整片音源，各片段静音；禁止播放原片完整画面来代替重建。作为插件使用时，应先遵守插件执行规则。恢复项目时，`REVERSE.md` 中的命令只能当笔记，必须按原配方重建参数、用 `--plan` 检查，不能原样执行；文档还要求单代理完成，不拆给多个子代理。

## [excalidraw-diagram-generator](https://www.skills.sh/github/awesome-copilot/excalidraw-diagram-generator)
- **它做什么**：把自然语言描述转换为可直接打开、编辑的 `.excalidraw` JSON 文件。支持流程图、关系图、思维导图、架构图，以及数据流图、泳道图、类图、时序图和 ER 图。流程是先识别实体与关系，再选择图型、生成形状及连线，最后交付文件、图表摘要、元素数量和打开说明。
- **适合谁用**：需要快速形成技术方案图、业务流程图或数据模型草稿的开发者、架构师和产品人员。输入应说明关键实体、步骤及相互关系；查看结果可用 Excalidraw 网站或其 VS Code 扩展。
- **为什么现在值得看**：当前进入 Hot 榜，给定安装量为 **9**。相比只输出图表描述，它明确要求交付可编辑文件，并给出布局、字体、元素数量和交付前校验规范。
- **如何使用**：请在原页面查看安装方式。可直接描述“生成用户注册流程图”或“绘制 User、Post、Comment 的 ER 图”；按工作流提取节点与关系，生成 `type: "excalidraw"`、`version: 2` 的 JSON，并保存为 `<描述性名称>.excalidraw`。交付前检查 JSON 有效性、唯一 ID、文字可读性、重叠与箭头逻辑，再将文件拖入 Excalidraw 打开；所给资料未提供专用启动或验证 CLI。
- **注意**：所有文本元素必须使用 `fontFamily: 5`（Excalifont）。数据流图应表达数据流动，而非处理步骤先后；复杂需求应拆分，校验清单建议为清晰起见控制在 20 个元素以内。云厂商等专用图标需要另行准备图标库；所给文件在图标库配置部分被截断，不能据此补全后续步骤。

## [agent-desktop](https://www.skills.sh/vercel-labs/agent-desktop/agent-desktop)
- **它做什么**：让 AI 通过操作系统原生无障碍树观察和操作 macOS、Windows、Linux 桌面应用，覆盖按钮、表单、菜单、窗口、剪贴板和截图等操作。它是 CLI 工具，不是自主代理；每条命令返回带 `ok`、`data` 或 `error` 的 JSON，观察、执行和验证循环由调用方负责。
- **适合谁用**：构建桌面 GUI 自动化或 computer-use 工作流的开发者。前提是已安装 `agent-desktop`，并按所在平台配置所需权限；实际支持的界面类型以状态检查结果为准。
- **为什么现在值得看**：当前位于 Hot 榜，给定安装量为 **7**。值得关注的是其明确的动作交付状态与重试规则，可帮助调用方避免在结果不确定时重复点击、输入或提交。
- **如何使用**：请在原页面查看安装方式。先执行 `agent-desktop status` 检查平台、权限及 `supported_surfaces`，再执行 `agent-desktop skills get platform` 加载平台说明。典型循环：
  ```bash
  agent-desktop snapshot --skeleton --app "Notes" -i --compact
  agent-desktop snapshot --root @s8f3k2p9:e3 -i --compact
  agent-desktop click @s8f3k2p9:e12
  agent-desktop snapshot --root @s8f3k2p9:e3 -i --compact
  ```
  示例引用必须换成实际快照返回值；已知角色或名称时优先用 `find`，异步操作后用 `wait`，具体参数查 `agent-desktop <command> --help`。
- **注意**：引用只对一个快照有效，UI 改变后须重新观察。仅在 `disposition.retry` 为 `safe` 时重试或替换动作；其他情况应先读取实时状态。默认 headless 使用语义无障碍调用，无可用路径时失败，不得自行切换到 headed；只有用户明确允许物理输入后才可使用 `--headed`。PowerShell 中需为引用加引号，并改用对应的环境变量和 JSON 处理语法。

## [python-testing-patterns](https://www.skills.sh/wshobson/agents/python-testing-patterns)
- **它做什么**：提供以 pytest 为核心的 Python 测试实践，覆盖测试组织、隔离、fixtures、mock、参数化和 TDD。已给出的具体模式包括用 mock 副作用验证重试次数、用 Freezegun 固定或推进时间、用标记筛选测试，以及生成覆盖率报告。实际产出是测试代码与测试套件结构，不是独立测试执行服务。
- **适合谁用**：正在补充单元测试、集成测试、时间相关测试或重试逻辑测试的 Python 开发者。需要 Python 与 pytest；覆盖率报告依赖 `pytest-cov`，时间控制示例依赖 `freezegun`。
- **为什么现在值得看**：当前进入 Hot 榜，给定安装量为 **8**。内容适合直接用于测试评审：不只断言返回值，还验证瞬时错误是否重试、永久错误是否立即停止，以及达到上限后是否正确退出。
- **如何使用**：Skill 安装方式请在原页面查看。按 Arrange–Act–Assert 编写 `test_*.py`，共享 fixtures 放入 `conftest.py`，用 `pytest test_example.py` 启动；可用 `pytest -m integration` 或 `pytest -m "not slow"` 筛选。覆盖率相关命令保留如下：
  ```bash
  pip install pytest-cov
  pytest --cov=myapp tests/
  pytest --cov=myapp --cov-report=html tests/
  pytest --cov=myapp --cov-fail-under=80 tests/
  pytest --cov=myapp --cov-report=term-missing tests/
  ```
- **注意**：文档强调测试独立、避免共享状态并自行清理；覆盖率应有意义，不能只追求百分比，示例中的 80% 是命令配置示例。重试、Token 等代码引用了业务类或函数，需替换为实际实现，不能整段直接运行。更详细的模式位于 `references/details.md`；异步、属性测试、数据库和 CI/CD 等高级内容被指向 `references/advanced-patterns.md`，本次资料未展开这些文件。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*