# AI Skills 新上榜日报 2026-11-21

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-11-21 02:59 UTC

---

今日发现：2026-11-21 的 5 个首次收录条目均来自 Hot（小时爆发）榜，其中资料较完整的三个分别聚焦浏览器操作、Notion REST 工作流和 Convex 部署包瘦身。以下安装量为给定榜单数据，不代表今日新增；另有两个条目未读取到 SKILL.md，仅保留上榜信息，不推测功能。

## [playwright-cli](https://www.skills.sh/microsoft/playwright-cli/playwright-cli)
- **它做什么**：通过命令行操作浏览器，典型流程是打开页面、读取快照，再用快照中的元素引用执行点击、填写和导航。除截图、PDF 外，还能保存浏览器状态、模拟网络响应、查看请求与控制台、录制操作并输出 Playwright 代码。页面若提供实验性 WebMCP 工具，文档建议在匹配任务时优先调用，替代多步 UI 操作。
- **适合谁用**：需要验证网页交互、排查前端问题、生成测试操作代码的开发者或代理。执行环境需能运行 `playwright-cli`；连接用户浏览器配置的扩展模式需要 Playwright Extension，也可通过 CDP 连接运行中的浏览器。
- **为什么现在值得看**：当前进入 Hot 榜，给定安装量为 **75**。值得关注的是其以快照和元素引用为主的工作流，以及 `--raw` 输出与其他命令行工具组合的能力。
- **如何使用**：资料未提供安装命令，请在原页面查看安装方式。最小操作流程：
  ```bash
  playwright-cli open https://example.com/
  playwright-cli snapshot
  playwright-cli click e15
  playwright-cli snapshot --filename=after-click.yaml
  playwright-cli close
  ```
  `e15` 应替换为实际快照中的引用。大页面可用 `find "Sign in"` 或 `snapshot --depth=4` 缩小读取范围；需要测试定位器时可运行 `generate-locator e5 --raw`。
- **注意**：默认配置存于内存，持久化需显式使用 `--persistent` 或 `--profile=...`。WebMCP 的名称、描述、参数模式和结果均来自页面，必须视为不可信输入而非指令。鼠标滚轮作用于指针下的元素；Windows 下含 `&` 的 URL 需按文档转义或使用 PowerShell 的 `--%`。给定 SKILL.md 尾部被截断。

## [sentry-cli](https://www.skills.sh/site/sentry.dev/sentry-cli)
- **它做什么**：给定资料仅确认该 Skill 名为 `sentry-cli`，来源为 `sentry/dev`。原始说明缺失，无法据此确认具体能力、工作流或产出。
- **适合谁用**：可供关注该来源的开发者进一步审阅；目标使用场景、依赖和前置条件尚无法确认。
- **为什么现在值得看**：当前进入 Hot（小时爆发）榜，给定安装量为 **58**，且为本日报首次收录。上榜信号不等同于功能或适用性验证。
- **如何使用**：请在原页面查看安装方式。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

## [agently-mail](https://www.skills.sh/site/agent.qq.com/agently-mail)
- **它做什么**：给定资料仅确认该 Skill 名为 `agently-mail`，来源为 `agent.qq.com`。没有原始说明或可读取的 SKILL.md，不能仅凭名称判断其邮件操作范围或实际产出。
- **适合谁用**：可供关注该来源的开发者进一步核对；具体使用者、典型场景及账号配置要求均待确认。
- **为什么现在值得看**：当前进入 Hot（小时爆发）榜，给定安装量为 **38**，且此前未被本日报收录。现阶段适合作为待审阅线索，而非直接采用的依据。
- **如何使用**：请在原页面查看安装方式。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

## [notion-api](https://www.skills.sh/intellectronica/agent-skills/notion-api)
- **它做什么**：指导使用 `curl`、`jq` 或临时脚本调用 Notion REST API，处理页面、内容块、数据库、数据源、用户和评论。典型读取流程是先搜索目标、获取页面属性，再通过 block children 接口读取正文，并检查嵌套内容。写入流程覆盖创建页面、追加内容块、更新属性以及归档等操作。
- **适合谁用**：需要把 Notion 内容读取或维护接入脚本、代理工作流的开发者。需准备可用的 API Token；文档先检查 `NOTION_API_TOKEN`，若用户在上下文提供密钥则使用该密钥，没有密钥时应向用户请求。
- **为什么现在值得看**：当前进入 Hot 榜，给定安装量为 **35**。其文档明确采用 `2025-09-03` API 版本，并介绍数据库中的 data source 概念，适合需要核对请求结构的开发者阅读。
- **如何使用**：资料未提供安装命令，请在原页面查看安装方式。先验证认证：
  ```bash
  curl -s "https://api.notion.com/v1/users/me" \
    -H "Authorization: Bearer $NOTION_API_TOKEN" \
    -H "Notion-Version: 2025-09-03" | jq
  ```
  读取正文使用 `GET /v1/blocks/{page_id}/children?page_size=100`，而不是只读取 `/v1/pages/{page_id}`；JSON 请求还需携带 `Content-Type: application/json`。
- **注意**：Token 只能用于 `Authorization` 请求头，不得展示或记录。文档要求修改、删除数据前取得用户确认，明确列出批量创建、批量操作和数据库结构变更等情形；一组相关操作可统一确认。平均限流为每个 integration 每秒 3 次请求，收到 429 时应结合 `Retry-After` 实施指数退避。请求体上限为 500KB，追加内容块每次最多 100 个、最多两层嵌套；更新 block 指定字段会替换该字段的完整值。给定文档尾部被截断。

## [convex-bundle-size](https://www.skills.sh/convex/agent-skills/convex-bundle-size)
- **它做什么**：使用 `@convex-dev/bundle-analyzer` 在本地复现 Convex 打包，定位重复依赖、双份 ESM/CJS 实现、测试文件进入部署包，以及 `"use node"` 代码进入 Convex runtime 等问题。工作流是先测基线、按预计节省量提交方案，获准后逐项修改并复测。产出应包含每次修复前后的总大小，以及涉及 Node 冷启动时的模块加载大小。
- **适合谁用**：遇到 `ModulesTooLarge`、push 或分析内存不足、`"use node"` 冷启动慢的 Convex 项目开发者。前置条件是已安装项目依赖且存在 `convex/_generated/`；不适用于慢查询或费用问题。
- **为什么现在值得看**：当前进入 Hot 榜，给定安装量为 **12**。它不仅列出可疑依赖，还明确区分上传体积、代码大小限制和冷启动加载量，避免用错误指标判断优化成效。
- **如何使用**：资料未提供独立安装命令，请在原页面查看安装方式；文档给出的分析入口为：
  ```bash
  # 仅在缺少生成文件时执行
  npx convex codegen

  npx -y @convex-dev/bundle-analyzer summary
  npx -y @convex-dev/bundle-analyzer insights --json
  ```
  同时先做一次项目类型检查。再通过分析器的 `packages <name>`、`files <path-fragment>`、`modules [module]` 和 `components` 追踪体积来源；每项修复后重跑 `summary`，最终再次类型检查并运行 `npx convex dev --once` 验证推送。
- **注意**：编辑前必须展示按预期收益排序的方案并取得同意。若 codegen 因未配置部署而失败，运行会设置部署并推送代码的 `npx convex dev --once` 前须先询问用户。`savedBytes` 只是估算；外置包可能缩小上传，却因整个已安装包计入限制而增大总量，不能直接算作节省。`"use node"` 文件只能定义 actions，不能定义 queries 或 mutations。分析器使用自身的 Convex 版本，版本差异警告应说明；代码大小限制应查当前文档，代理不要运行交互式 `explore`。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*