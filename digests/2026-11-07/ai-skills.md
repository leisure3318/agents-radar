# AI Skills 新上榜日报 2026-11-07

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-11-07 03:10 UTC

---

今日发现：2026-11-07 的「AI Skills 新上榜」中，Azure 的 Python 部署、消息 SDK 排障和可靠性治理进入 Trending，工作流与适用边界都较明确。Hot 榜则出现 SoundCraft 音频自动化和科研制图方向条目；后者未读取到 SKILL.md，暂不能据名称确认能力。

## [python-appservice-deploy](https://www.skills.sh/microsoft/azure-skills/python-appservice-deploy)
- **它做什么**：将 Flask、Django、FastAPI 或通用 Python 代码部署到 Azure App Service Linux，缺少资源时创建资源组、P0v3 计划和 Python 3.14 Web App。工作流先解析订阅、区域与应用上下文，再识别框架；根据 `azure.yaml` 是否配置 App Service，选择 `azd` 或 Azure CLI 部署路径，并配置启动命令和远程构建。
- **适合谁用**：需要把 Python 应用直接部署到 App Service 的开发者。前置条件是检查 Azure CLI 是否为最新稳定版；应用名需要交互确认，其余资源名和区域等尽量使用推导值或默认值。
- **为什么现在值得看**：进入 Trending（24 小时趋势），所给安装量为 **10,690**，不是今日新增。值得关注的是它把脚本换行、Django 静态资源检查和部署后停止操作等细节写成了明确规则。
- **如何使用**：请在原页面查看安装方式。创建计划前调用 `azure-quotas` 检查配额；运行时参数使用 `--runtime "PYTHON:3.14"`。设置 `SCM_DO_BUILD_DURING_DEPLOYMENT=true`，FastAPI 启动命令固定为 `python -m uvicorn main:app --host 0.0.0.0`；部署使用 `azd deploy` 或 `az webapp deploy --type zip --track-status false --enriched-errors true`。
- **注意**：更新 Azure CLI 需批准。选中的 shell／启动文件必须规范为 LF 并验证无 CR 字节，规范化、验证或打包失败即停止，只能部署新生成的包；Django 远程构建要求 `STATIC_ROOT` 及成功的系统检查、`collectstatic` 检查。禁止使用 `az webapp up`，也禁止部署返回后立即执行日志追踪、`curl` 或健康探测；文档提示预热需 2–3 分钟。此 Skill 不适用于 Container Apps、Functions、非 Python 或完整 IaC／基础设施任务；VNet、Key Vault、数据库等需求转交 `azure-prepare`。

## [azure-messaging](https://www.skills.sh/microsoft/azure-skills/azure-messaging)
- **它做什么**：诊断 Azure Event Hubs 与 Service Bus SDK 的连接、认证、AMQP 链路和消息处理问题。覆盖消息锁／会话锁失效、续锁失败、空闲断连、慢重连、重复事件、checkpoint 偏移重置，以及重试、预取、批量接收等配置问题。产出是结合资源健康、配置检查和 Microsoft Learn 文档的修复建议。
- **适合谁用**：维护 Event Hubs 消费者、Service Bus 队列或主题订阅的应用开发者与排障人员。需要相关 Azure MCP 工具；SDK 与版本信息有助于定位，但未提供时可先诊断、必要时再追问。
- **为什么现在值得看**：进入 Trending（24 小时趋势），所给安装量为 **10,690**，不代表当天新增。它把“消息不再处理”等宽泛症状拆成了健康状态、SDK 错误、实体配置和文档查证几个可执行步骤。
- **如何使用**：请在原页面查看安装方式。先识别 SDK 与版本，用 `mcp_azure_mcp_resourcehealth` 的 `get` 检查资源健康，再匹配语言专属排障指南；通过 `mcp_azure_mcp_documentation` 搜索 Microsoft Learn，检查连接字符串、实体名和消费者组，最后给出附文档依据的修复方案。可使用 Event Hubs／Service Bus MCP 工具枚举资源，并用 Monitor 的 `logs_query` 查询 KQL 诊断日志。
- **注意**：范围是 Event Hubs、Service Bus 的 **SDK 排障**，不是通用消息基础设施部署。语言相关的连接、SDK 和认证指南位于 `azure-diagnostics` Skill 的 `troubleshooting/messaging/`；当前资料没有给出具体修复命令，不宜直接套用未经核对的配置修改。

## [azure-reliability](https://www.skills.sh/microsoft/azure-skills/azure-reliability)
- **它做什么**：评估 Azure Functions 与 App Service 的可靠性配置，检查计算资源可用区冗余、存储冗余、健康探测和多区域故障转移。先做平台资源发现，再按服务与计划类型深入检查，输出按可靠性特性组织的清单，而非数值评分。经用户确认后，可选择直接执行 CLI 修改，或更新 Bicep／Terraform 等 IaC。
- **适合谁用**：需要排查单点故障、检查灾难恢复准备度，或改进现有 Functions／App Service 配置的平台工程师与应用负责人。需先 `az login`；评估需要目标订阅／资源组的 Reader 权限，配置变更需要 Contributor 权限。
- **为什么现在值得看**：进入 Trending（24 小时趋势），所给安装量为 **10,690**，不是今日新增。它的实用点在于将“发现问题”与“分阶段修复”衔接起来，并区分即时 CLI 变更和可持续保留的 IaC 修改。
- **如何使用**：请在原页面查看安装方式。先执行 `az extension add --name resource-graph`，再通过 `az graph query` 发现指定范围内的资源；订阅范围使用 `--subscriptions <sub-id>`，资源组或应用名使用相应查询过滤条件。评估清单按计算可用区冗余、可用区冗余存储、健康探测、多区域故障转移排列；确认修复后选择 CLI 或 IaC 路径，先处理计算冗余和健康检查，再单独确认较慢的存储迁移及多区域配置。
- **注意**：执行任何变更前都必须确认，并说明成本影响及破坏性操作；多区域工作必须获得明确同意。当前仅支持 Functions 和 App Service，Container Apps 应标记为未评估，不能为其编造命令或 IaC 补丁。所有查询必须限制在用户指定范围内；评估不得给数字分数。所给 SKILL.md 在执行顺序处截断，具体服务命令需继续查阅对应参考文件。

## [soundcraft](https://www.skills.sh/mroxso/artcraft-skills/soundcraft)
- **它做什么**：通过 SoundCraft 的结构化控制协议、MCP 桥接或无界面 CLI，创建和编辑会话、轨道、片段、混音、自动化及音频导出。操作遵循“先检查状态、再编辑、后验证”：读取会话和界面信息，优先执行结构化命令，再重新检查会话及截图，报告导出结果与实质性错误。
- **适合谁用**：已经使用 SoundCraft、希望自动化音频编辑或编写应用测试的开发者与音频工作流维护者。需先发现本机可执行文件和运行中的会话，尽可能复用已有实例，并阅读相关控制协议。
- **为什么现在值得看**：进入 Hot（小时爆发），所给安装量为 **1**，适合作为早期探索对象，而非成熟度或广泛采用的证明。值得看的是它同时提供桌面控制、实时应用桥接和 headless 路径，并要求运行时发现命令。
- **如何使用**：请在原页面查看安装方式。桌面端可用 `soundcraft --control 0` 启动并取得空闲端口；连接运行中的应用用 `soundcraft-cli app --port <port> <method or command id> [JSON]`。无界面示例为 `soundcraft-cli run --demo --cmd 'mix.volume={"track":"Kick","db":-6}' --bounce out.wav`；MCP 使用 `soundcraft-cli mcp [--demo]` 或 `soundcraft-cli mcp --connect <port>`。编辑前调用 `session.inspect`、`ui.inspect`、`engine.commands`，编辑后重读会话并用 `ui.screenshot` 验证。
- **注意**：此 Skill **不安装 SoundCraft，也不配置 MCP 服务器**。TCP 控制使用 `127.0.0.1` 上的逐行 JSON，请按 `id` 匹配响应并检查 `ok`；命令 ID 与参数须从 `engine.commands` 获取，不能猜测。`engine.execute` 不打开对话框，`ui.menu.invoke` 可能打开；模拟输入后应检查状态。自动化测试用 `SOUNDCRAFT_CONFIG_DIR` 隔离状态，UI 验收使用 `--no-audio`；冒烟测试禁止轨道录音待命、输入监听或开始录音。

## [scientific-figure-making](https://www.skills.sh/chenliu-1996/figures4papers/scientific-figure-making)
- **它做什么**：名称指向科研制图方向，但本次未读取到 SKILL.md，原始说明也未提供。无法确认它支持哪些图表、输入数据、绘图工具或导出格式，也无法确认实际工作流与产出。
- **适合谁用**：可供有论文或科研图表需求的开发者进一步查看；具体适用场景与前置条件需以来源仓库说明为准。
- **为什么现在值得看**：进入 Hot（小时爆发），所给安装量为 **1**，说明它是本次值得留意的早期条目；不能据此判断功能完整度或使用效果。
- **如何使用**：请在原页面查看安装方式。当前资料不足以提供启动、绘图或验证命令。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*