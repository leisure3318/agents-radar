# AI Skills 新上榜日报 2026-11-01

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-11-01 02:31 UTC

---

今日发现：2026-11-01 的新上榜条目均来自 Hot（小时爆发）榜，已读取说明的三个 Skill 分别聚焦近期多源调研、GitHub 操作和代码交付验证。另有两个条目尚未读取到 SKILL.md，仅列出榜单信号，不推断其功能；下列安装量均为给定榜单数据，并非今日新增。

## [stageshow](https://www.skills.sh/benjitaylor/skills/stageshow)
- **它做什么**：当前未提供原始说明，也未读取到 SKILL.md。无法据此确认其核心能力、工作流或实际产出。
- **适合谁用**：目标用户、典型场景与前置条件均待确认，建议先查看来源 `benjitaylor/skills`。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，给定安装量为 **39**；可作为进一步了解的线索，但榜单信号不足以判断功能与成熟度。
- **如何使用**：请在原页面查看安装方式。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

## [last30days](https://www.skills.sh/mvanhorn/last30days-skill/last30days)
- **它做什么**：研究某个主题在最近 30 天的讨论，获取 Reddit、X、YouTube、TikTok、Hacker News、Polymarket、GitHub 和网页中的帖子及互动数据。工作流包含来源诊断、查询解析与规划、运行 Python 研究引擎、补充搜索和证据综合；另提供 doctor 来源健康检查，以及资料库、队列、比较研究等独立路径。
- **适合谁用**：需要了解开发者反馈、工具口碑、产品需求或近期话题的开发者与研究人员。运行环境需要 Node 和经过预检确认的 **Python 3.12+**；可用数据源取决于配置与授权情况。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，给定安装量为 **43**。值得关注的是它不仅强调“搜最近内容”，还明确规定了来源健康诊断、研究执行与综合输出的流程。
- **如何使用**：请在原页面查看安装方式。调用示例为 `last30days AI video tools` 或 `last30days what users want in react`。启动前须完整读取 `references/runtime.md`，执行旧安装检查和解释器预检，并保留预检输出的 `LAST30DAYS_PYTHON=...`；普通研究还须读取 `references/research-runbook.md`，综合前读取 `references/synthesis.md`。给定片段未展示研究引擎的完整命令，不宜自行拼接。
- **注意**：必须使用实际加载的根 SKILL.md 所在目录作为 `SKILL_DIR`，不能猜测引擎路径，也不能用纯 WebSearch 报告冒充已运行该 Skill。元数据未列必填环境变量，但列有多个可选数据源凭据；读取浏览器 Cookie 必须先征得同意，拒绝或跳过后应继续使用可用的免 Cookie 来源。所需参考文件缺失、不可读或 Python 版本检查失败时，应停止对应流程；提供的 SKILL.md 片段存在截断。

## [gh-axi](https://www.skills.sh/kunchenguid/gh-axi/gh-axi)
- **它做什么**：通过面向 Agent 的 `gh-axi` CLI 封装执行 GitHub 操作，覆盖 Issue、PR、Discussion、堆叠 PR、CI、Workflow、Release、仓库、标签、Gist、Projects v2，以及 Actions secrets/variables 等。可用于查看当前仓库概况、管理协作事项、检查运行状态和访问 GitHub API。
- **适合谁用**：经常让 Agent 处理 GitHub 协作与 DevOps 任务的开发者。使用时需要能运行 `npx`，具体命令与配置应以当前 CLI 帮助为准。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，给定安装量为 **11**。它的特点是将操作说明交给 CLI 动态提供，避免 Agent 长期依赖可能过时的静态命令示例。
- **如何使用**：请在原页面查看安装方式。给定的启动与查询命令为：
  ```bash
  npx -y gh-axi
  npx -y gh-axi --help
  npx -y gh-axi <command> --help
  ```
  第一条显示当前仓库仪表盘，后两条分别获取全局和具体子命令用法。
- **注意**：SKILL.md 明确要求以已安装 CLI 的帮助为当前事实来源，不依赖该文件里的静态命令、参数或工作流说明。该 Skill 标记为 `user-invocable: false`；给定资料未说明认证配置细节。

## [no-mistakes](https://www.skills.sh/kunchenguid/no-mistakes/no-mistakes)
- **它做什么**：通过本地门禁流水线验证代码变更，阶段包括意图检查、rebase、代码审查、测试、文档、lint、push、PR 和 CI。支持“只验证已提交变更”，也支持“先完成任务并提交，再验证”；CLI 向标准输出提供机器可读的 TOON，向标准错误输出进度。遇到决策门禁时，需要读取发现项并响应，直到获得最终结果。
- **适合谁用**：希望让 Agent 完成代码修改后继续执行交付验证的开发者。仓库须已初始化，待验证工作必须提交在非默认分支上，且 daemon 已配置可运行的受支持 Agent 后端。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，给定安装量为 **10**。它值得关注的部分是把用户原始意图纳入审查，并明确区分可授权修复的机械问题和必须交由用户决定的产品行为问题，而不只是运行测试。
- **如何使用**：请在原页面查看安装方式。常用启动与诊断命令如下：
  ```bash
  no-mistakes doctor
  no-mistakes init
  no-mistakes axi
  no-mistakes axi run --help
  no-mistakes axi run --intent "<用户希望实现的目标、约束与验收要求>"
  no-mistakes axi status
  ```
  `init` 用于尚未初始化的仓库；运行前先查看 home view。出现 `gate:` 时通过 `no-mistakes axi respond` 处理；新运行须通过 `--intent`、`--intent-file` 或 `--intent -` 三者之一提供明确意图。
- **注意**：验证的是已提交历史，不是未提交工作区；任务模式须保留无关改动，只提交本任务变更。`ask-user` 发现项必须由用户决定，不能擅自授权；审查自动修复默认关闭。运行默认等待 8 分钟，等待到期不等于失败，应检查状态并重新附着，不能因耗时就取消。处于流水线内部的验证 Agent 只能处理分配阶段；遇到 `nested_gate_context` 必须停止并交回外层执行器。测试须断言可观察行为并使用独立依据，不能仅靠搜索实现源码中的字符串证明功能正确；提供的文件片段存在截断。

## [archify](https://www.skills.sh/site/archify.si/archify)
- **它做什么**：当前未提供原始说明，也未读取到 SKILL.md。无法确认其功能范围、执行流程及产出，不根据名称推断用途。
- **适合谁用**：目标用户、典型场景和环境要求均待来源资料确认。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，给定安装量为 **9**。目前只能确认短时榜单热度，是否适合实际项目仍需审阅来源。
- **如何使用**：请在原页面查看安装方式。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*