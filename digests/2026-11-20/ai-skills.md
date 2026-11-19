# AI Skills 新上榜日报 2026-11-20

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-11-19 17:22 UTC

---

今日发现：2026-11-20 的这批新面孔全部来自 Hot（小时爆发）榜，重点集中在 Agent 开发、评估与可观测性，也有两项分别面向软件工厂设计和界面“去 AI 味”。以下 5 项均未在本日报历史中出现；安装量是给定榜单快照值，不代表今日新增。

## [software-factory](https://www.skills.sh/mattpocock/skills/software-factory)
- **它做什么**：为设计“把工单、PR 和定时安排转化为已合并代码”的多 Agent 软件工厂提供统一术语与设计方法，而不是直接搭建运行系统。设计分为服务选型与任务定义两部分：为每个服务槽位指定产品，再逐项明确任务的触发条件、读写对象、后续触发、人工介入点及防重复机制。实际产出是一份边界清晰、能说明如何运转的软件工厂方案。
- **适合谁用**：准备自动化工单分诊、PR 审查、代码实现或渐进式检查迁移的开发者与技术负责人。应先明确要解决的问题，再选 ticket tracker、git host、orchestrator、runner 等服务。
- **为什么现在值得看**：进入 Hot 小时爆发榜，当前安装量为 **46**。它关注的不是再增加一个 Agent，而是补齐自动化系统里的人工交接、去重与循环终止设计。
- **如何使用**：请在原页面查看安装方式。从具体问题出发，先阅读 `EXAMPLE-TASKS.md`；选服务时阅读对应 survey，再研究当前产品选项。完成标准是每个服务槽位都有明确选择，可观测平台也可明确选择不配置；每个任务和 ticket source 都须回答文档列出的设计问题。
- **注意**：元数据设有 `disable-model-invocation: true`。run 不等待人工，必须结束后由人工后续修改触发新 run；runner 上的数据不跨 run 保留。文档要求逐个增加自动触发器、初期限流并对每个 PR 保留人工审查，同时配合确定性检查、独立自动审查，并将循环尝试限制在少数几次后交给人工。

## [unslop-ui](https://www.skills.sh/felipebasurto/unslop-ui/unslop-ui)
- **它做什么**：清理界面、图表和仪表盘里多余的文字与装饰，包括标题上方的小标签、装饰编号、重复副标题、解释显而易见行为的说明、无真实状态支撑的徽章与圆点。图表部分强调减少重复编码、弱化辅助线，并在可行时用直接标签替代图例。加上 `--surface` 后，才进一步处理渐变、光晕、不合规范的间距、过重字重及装饰动画。
- **适合谁用**：维护网页、应用界面或数据看板的前端开发者、设计工程师。目标可以是文件、目录或组件；需要能读取实现代码，以核对文案依据、状态绑定及已有设计 token。
- **为什么现在值得看**：进入 Hot 小时爆发榜，当前安装量为 **26**。相比泛泛要求“去 AI 味”，它提供了 U1—U20 的具体检查规则，且明确把删除冗余作为默认修复方式。
- **如何使用**：请在原页面查看安装方式。传入目标文件、目录或组件，按需附加 `--surface`；无目标时使用对话中已修改的文件，或询问用户。编辑前先读取已安装 `/pstack:unslop` 的规则；没有则读随附的 `references/unslop-fallback.md`，表层调整另参考 `references/tokens.md`。
- **注意**：声明的工具范围为 `Read, Grep, Glob, LS`，并设置 `disable-model-invocation: true`。默认不改逻辑、数据、配色、间距 token 或布局结构，只有文档列出的例外；即使启用 `--surface`，也不是整体重设计。不得编造数字、集成或收益，不得删除无障碍名称；表单必须保留关联输入框的可见标签。给定 SKILL.md 在末尾被截断。

## [google-agents-cli-adk-code](https://www.skills.sh/google/agents-cli/google-agents-cli-adk-code)
- **它做什么**：为 ADK Agent 编码提供 Python、Go API 模式与参考实现入口，覆盖工具、回调、状态、制品、多 Agent 编排及图式 Workflow API。它要求先查与能力匹配的 recipe 或上游示例，再编写代码；需要精确签名时检查已安装包源码。实际用途是指导现有项目中的 Agent 实现，而非创建或部署项目。
- **适合谁用**：正在 ADK 项目中添加工具、回调、状态管理或编排逻辑的开发者。前置条件是具备 `agents-cli`，并且项目已经完成 scaffold。
- **为什么现在值得看**：进入 Hot 小时爆发榜，当前安装量为 **38**。它把常用 API、显式图拓扑、实时语音/视频等需求分流到不同参考文件，适合编码前快速定位资料。
- **如何使用**：依赖安装命令为 `uv tool install google-agents-cli`。先激活 `/google-agents-cli-workflow`，运行 `agents-cli info` 验证项目配置；已有代码按文档执行 `agents-cli scaffold enhance .`。Python 先读 `references/recipes.md`，Go 则先克隆并阅读上游匹配的 `examples/`；需要更深入资料时可用 `curl https://adk.dev/llms.txt` 获取文档索引。
- **注意**：未完成 scaffold 前不得写 Agent 代码；没有项目时，应先通过 workflow 的 Phase 0 与用户确认规格。项目创建应转用 `/google-agents-cli-scaffold`，部署应转用 `/google-agents-cli-deploy`，不能把本 Skill 当成全流程入口。

## [google-agents-cli-observability](https://www.skills.sh/google/agents-cli/google-agents-cli-observability)
- **它做什么**：指导为 Agent 配置 Cloud Trace、提示词与响应日志、BigQuery Agent Analytics，以及第三方可观测平台。它区分调用链追踪、完整交互内容存储和结构化 Agent 事件，并给出部署顺序、环境变量与排障检查点。适合定位执行延迟、工具调用路径和遥测缺失问题。
- **适合谁用**：需要监控或排查已部署 Agent 的开发者、平台工程师。需要 `agents-cli`；若项目尚未 scaffold，应先使用 scaffold Skill，并先与用户确认所需遥测层级。
- **为什么现在值得看**：进入 Hot 小时爆发榜，当前安装量为 **36**。最值得关注的是它明确区分了“trace 中不含内容”和“GCS/BigQuery 不保存完整对话”——两者不是同一个开关。
- **如何使用**：依赖安装命令为 `uv tool install google-agents-cli`。不需要 Terraform 管理遥测时可直接 `agents-cli deploy`；需要时先运行 `agents-cli infra single-project --apply --project PROJECT_ID`，再部署。通过 Cloud Console → Trace → Trace explorer 查看链路；本地可结合 `agents-cli playground` 验证。
- **注意**：若已用命令式 `agents-cli deploy` 部署，不要随后直接 apply Terraform；应按文档选择删除重建，或保留实例并通过 `agents-cli deploy --update-env-vars "KEY=VALUE,..."` 更新，同时补齐遥测 IAM 权限。GCS completion 上传及 ADK BigQuery Analytics 插件仅支持 Python，Go 虽有 BigQuery 遥测基础设施，但不能据此推断支持这些能力。Terraform 部署默认在 GCS/BigQuery 保存完整内容、trace 中不含内容；Python 的内容捕获变量使用枚举，Go 使用布尔值，且该变量不控制 GCS/BigQuery completion 上传。

## [google-agents-cli-eval](https://www.skills.sh/google/agents-cli/google-agents-cli-eval)
- **它做什么**：提供“准备数据 → 运行评估 → 分析失败 → 修复并复测”的质量迭代流程，适用于不同框架的 agents-cli 项目。它指导选择指标、编写单轮或多轮数据集、查看逐案例分数与 judge 理由，并比较修复前后的结果。可选能力包括失败聚类、用户模拟数据生成和 ADK GEPA 提示词优化。
- **适合谁用**：需要给 Agent 建立回归评估、分析工具选择错误或验证回答质量的开发者。需要 `agents-cli`；scaffold 项目通常已有数据集和评估配置，Python 位于 `tests/eval/`，Go 位于 `eval/`。
- **为什么现在值得看**：进入 Hot 小时爆发榜，当前安装量为 **36**。它将评估落实到结果文件、阈值、失败退出码与前后对比，而不只是给出一组评分指标。
- **如何使用**：先安装 uv（如未安装），再执行 `uv tool install google-agents-cli`。从 1—2 个案例开始运行 `agents-cli eval run`，查看 `artifacts/grade_results/results_<ts>.{json,html}`；与用户约定阈值并写入配置，也可使用 `agents-cli eval run --fail-under custom_response_quality=4`。修复后运行 `agents-cli eval compare <prev_results>.json <new_results>.json` 检查改善与回退；命令参数以 `agents-cli eval <subcommand> --help` 为准。
- **注意**：指标低于阈值或案例出错时，`eval run` 退出码为 1。内置多轮指标仅有 `multi_turn_task_success`、`multi_turn_trajectory_quality`、`multi_turn_tool_use_quality`，其他内置指标用于多轮 traces 会返回 400。应保留不参与迭代的留出案例，不要靠降低阈值或删除波动案例过关。GEPA 优化耗时且昂贵，必须由用户明确要求；先尽量手工修复，最后只执行一次 `eval optimize`，不要循环运行。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*