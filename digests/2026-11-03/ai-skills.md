# AI Skills 新上榜日报 2026-11-03

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-11-02 18:29 UTC

---

今日发现（2026-11-03）：本期 5 个首次收录的 Skill 均来自 Hot（小时爆发）榜，其中 4 个围绕 Amplitude 埋点工作流，覆盖变更分析、调用模式发现和具体埋点计划生成；另一个是 Remotion 授权资料入口。以下安装量为给定榜单数据，不代表今日新增。

## [remotion-license](https://www.skills.sh/remotion-dev/skills/remotion-license)
- **它做什么**：为 Remotion 授权问题提供官方资料入口，包括许可证、授权 FAQ 和条款与条件。实际作用是引导查阅相关文档，并提供购买入口；给定 SKILL.md 没有列出具体价格、授权资格或豁免条件。
- **适合谁用**：正在评估 Remotion 使用许可、采购授权或核对条款的开发者与团队。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，给定安装量为 **98**。如果项目正在采用 Remotion，这是一个集中定位授权资料的入口，但榜单热度不能代替条款核查。
- **如何使用**：请在原页面查看安装方式。使用时提出具体授权问题，并按问题查阅[许可证](https://www.remotion.dev/docs/license.md)、[授权 FAQ](https://www.remotion.dev/docs/license/faq.md)或[条款与条件](https://www.remotion.dev/docs/terms.md)；购买入口为 [remotion.pro/license](https://www.remotion.pro/license)。
- **注意**：来源标注版本为 `4.0.540`。SKILL.md 只提供资料链接，没有授权判断命令，也没有说明使用此 Skill 即可完成合规审查。

## [instrument-events](https://www.skills.sh/amplitude/mcp-marketplace/instrument-events)
- **它做什么**：接收 `discover-event-surfaces` 生成的 `event_candidates` YAML，只为 `priority: 3` 的关键事件制定埋点计划。它会读取相关代码、定位结果已确认的插入点，并沿用现有埋点函数、导入路径和属性结构。产出结构化 `trackingPlan` JSON，包含项目路由、事件与属性定义、文件路径、修改前行号、函数锚点及建议埋点代码。
- **适合谁用**：已经拿到事件候选列表、准备将关键事件落实到代码的工程师。前置条件包括可读取的仓库，以及 `taxonomy`、`discover-analytics-patterns` 等配套 Skill。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，给定安装量为 **23**。它值得关注的具体点是把“该追踪什么”推进到“在哪个函数、什么时机、用哪些现有变量追踪”。
- **如何使用**：请在原页面查看安装方式。提供 `event_candidates` YAML，先确认筛选后的关键事件；准备仓库根目录的 `.amplitude/instrumentation-agent.yaml`，用 `rules` 配置路径到 `app_ids` 的映射。也可通过可选的 `.amplitude/instrumentation-agent-context.md` 提供命名规则、SDK 封装约定或参考文件。
- **注意**：没有 `priority: 3` 事件就停止。缺少项目映射文件时，必须先让用户选择创建配置、确认自动拟定的映射，或提供单一 app ID；不得编造数字 ID，单项目回退路径不会自动把事件加入 plan。路径规则采用“最后匹配者优先”；属性只使用插入点作用域内的变量，通常保留 2–4 个适合分析的原始类型属性，避免重复发送 SDK 已自动采集的字段。给定原文在字段说明处截断，不能据此确认后续写回步骤的完整行为。

## [add-analytics-instrumentation](https://www.skills.sh/amplitude/mcp-marketplace/add-analytics-instrumentation)
- **它做什么**：这是埋点工作流的总入口，接受 PR、分支、文件／目录或自然语言功能描述。它先收集代码并形成 `change_brief`，再依次调用 `discover-event-surfaces` 和 `instrument-events`，最终给出关键事件的具体埋点计划。结果会解释事件价值、Amplitude 项目路由、插入位置和发送属性，再询问是否调整或进入实现。
- **适合谁用**：希望直接说“给这个 PR 加埋点”或“分析结账流程该追踪什么”的开发者。需要访问相关代码；PR／分支场景还需要相应的变更读取能力，并依赖流水线中的配套 Skill。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，给定安装量为 **23**。相比逐个调用底层步骤，它提供统一入口，并能为没有 diff 的文件或功能描述构建分析输入。
- **如何使用**：请在原页面查看安装方式。提供 PR 链接、分支、现有路径或功能描述即可；PR／分支交给 `diff-intake`，文件／目录直接读取，功能描述则先用 `git log --all --grep="<patterns>"` 查找相关提交，再结合关键词、路径和路由搜索代码。最终检查计划中的事件、位置、属性及项目归属。
- **注意**：直接分析目录时会跳过测试、配置、锁文件和生成代码。没有候选事件就停止；PR 不存在、Git 命令失败或没有可分析文件等情况也必须明确报错并停止，不能用不完整数据继续。这里的“一站式”产出是计划，不代表已经自动修改代码。

## [discover-analytics-patterns](https://www.skills.sh/amplitude/mcp-marketplace/discover-analytics-patterns)
- **它做什么**：发现仓库实际使用的埋点 SDK、函数签名、导入方式和自定义封装，而不是列出应该新增哪些事件。它会按调用函数、方法和参数结构对模式去重，输出示例、相关文件路径，以及事件名和属性名的命名约定。直接 SDK 调用、Ampli 类型化方法和自定义 wrapper 会分别记录。
- **适合谁用**：准备新增埋点、需要了解现有分析代码风格的工程师，尤其适合存在多个 SDK 或自定义 Hook／封装的仓库。来源要求在编写任何埋点代码前使用该 Skill。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，给定安装量为 **23**。它关注的是让新埋点复用现有工程约定，避免只知道底层 SDK，却绕过项目实际使用的封装。
- **如何使用**：请在原页面查看安装方式。先读取可选的 `.amplitude/instrumentation-agent-context.md`；连接 Amplitude MCP 时，通过其当前目录提供的 taxonomy 与事件属性读取能力获取样本，再回查代码。没有 MCP 时，用 Grep 搜索 `\.track\(`、`ampli\.`、`sendEvent`、Amplitude 导入和 HTTP API 地址等信号，并检查 SDK 导入文件是否导出 wrapper。
- **注意**：命名依据严格按“客户上下文 → MCP 数据 → 仓库真实调用 → `taxonomy`”排序；MCP 不可用时可以回退到代码搜索。不得用 `[Amplitude]`、`[Guides-Surveys]` 等系统名称推断命名惯例；通常排除测试和 mock，除非它们是唯一证据。证据不足必须明确说明；完全找不到调用时，应提示检查分析库是否已接入，而不是猜测模式。

## [diff-intake](https://www.skills.sh/amplitude/mcp-marketplace/diff-intake)
- **它做什么**：读取 PR 或分支差异，生成供后续埋点分析消费的 `change_brief` YAML。它先对变更文件分类，再只针对 Core Logic 文件读取代码与详细 diff，提炼用户可感知的变化、交互表面和逐文件摘要。最终还会标记变更类型、前后端范围与 `analytics_scope`。
- **适合谁用**：从 PR 或分支开始检查埋点覆盖的开发者、代码评审者，以及后续事件发现流水线。PR 路径需要可用的 GitHub CLI `gh` 及相应访问权限；详细差异分析需要 Git 能访问相关提交。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，给定安装量为 **23**。它把代码变更转成机器可读的分析输入，并区分功能变化、修复、重构与无需继续分析的改动。
- **如何使用**：请在原页面查看安装方式。PR 可先运行 `gh pr view <number-or-url>`，再用 `gh pr view <pr-number> --json files --jq '.files[] | "\(.path)\t+\(.additions) -\(.deletions)\t"'` 获取文件列表；通过 `gh pr view <number-or-url> --json baseRefOid,headRefOid` 取得提交引用后，用 `git diff <baseRefOid>...<headRefOid> -- <files>` 查看详细差异。分支场景使用 `git log <main|master>..<branch>` 和 `git diff --stat <main|master>..<branch>` 开始分析。
- **注意**：最终只输出 YAML 代码块，不附前后说明；`file_summary_map` 必须逐文件列出，不能用 glob。非 Core Logic 文件不进入详细摘要；纯后端或没有明确交互表面时，不得虚构 UI 组件。若 `analytics_scope: none`，应在 brief 中注明不需要运行下游 Skill。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*