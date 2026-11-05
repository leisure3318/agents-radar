# AI Skills 新上榜日报 2026-11-06

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-11-05 16:30 UTC

---

今日发现：2026-11-06 的「AI Skills 新上榜」中，4 个 Trending 条目覆盖 Azure 部署前检查、身份认证、AI 网关与数据分析；另有一个 Hot 条目聚焦源码优先、隔离验证的安全审计。以下 5 项均为本日报首次收录；安装量是给定榜单展示值，不代表今日新增。

## [azure-app-onboard-prereq](https://www.skills.sh/microsoft/azure-skills/azure-app-onboard-prereq)
- **它做什么**：在基础设施规划之前，检查仓库的构建健康度、应用完整性和 Azure 部署可行性，为每个组件给出 PASS／WARN／FAIL。工作流涵盖会话建立、仓库扫描、逐组件评估、问题展示、必要修复及后续路由，产出 `prereq-output.json`、会话上下文和 `readiness-report.md`。
- **适合谁用**：准备把现有应用迁往 Azure、需要先确认依赖兼容性和部署阻塞项的开发者。可以独立调用，也可以作为 `azure-app-onboard` 流水线的第一阶段；会检查 Azure 账户与 CLI 可用性。
- **为什么现在值得看**：进入 Trending（24 小时趋势），展示安装量 **13,269**。它将“代码是否具备部署条件”与基础设施生成、部署操作分开，适合在启动云上部署工作前做一次有产物的检查。
- **如何使用**：请在原页面查看安装方式。可用“检查我的应用是否准备好部署到 Azure”等请求启动；流程先建立或恢复 `.copilot-azure/sessions/{session-id}/`，再运行 `az account show` 获取账户信息。结束前通过 `git rev-parse HEAD` 记录扫描提交，便于恢复会话时识别代码变化。
- **注意**：默认是**只读评估与静态验证**，禁止执行 `npm install`、`pytest`、`dotnet build` 等安装、构建或测试命令。仅对代理修改或从零编写的代码，才允许通过专门的、逐命令用户确认关卡进行构建验证；一般性事先同意不算授权。代码或破坏性修改需 `ask_user`，评估不得使用子代理；检测到功能性 AWS／Google Cloud／Firebase SDK 依赖时，需按迁移关卡处理，不能直接继续架构规划。

## [entra-app-registration](https://www.skills.sh/microsoft/azure-skills/entra-app-registration)
- **它做什么**：指导创建 Microsoft Entra ID 应用注册，配置认证方式、重定向 URI、API 权限及客户端凭据，再将 OAuth 流程接入应用。覆盖交互式控制台登录与服务间 Client Credentials 认证，并提供 MSAL 集成参考。
- **适合谁用**：为 Web、SPA、移动／桌面应用或后台服务接入微软身份平台的开发者。开始前需明确应用名称与类型、目标 API 和权限，以及适用时的重定向 URI；服务间认证还需确定凭据方式。
- **为什么现在值得看**：进入 Trending（24 小时趋势），展示安装量 **13,266**。它把应用注册到代码集成串成明确流程，适合需要同时处理身份配置与应用实现的团队。
- **如何使用**：请在原页面查看安装方式。可从 Azure Portal → Microsoft Entra ID → App registrations 创建注册，或使用 `az ad app create`；通过 `az ad app show` 查看详情、`az ad app permission add` 添加权限、`az ad sp create` 创建服务主体。确需生成客户端密钥时使用 `az ad app credential reset`；代码侧参考 `Microsoft.Identity.Client`、`@azure/msal-browser`／`@azure/msal-node` 或 Python `msal`。
- **注意**：客户端密钥仅适用于机密客户端，创建后值只显示一次，不应硬编码。来源建议生产环境优先使用证书、仅请求必要权限，并验证令牌的签发者、受众和有效期；重定向 URI 应使用 HTTPS，localhost 除外。已有 IaC 或需要配置审计历史的项目，建议用 IaC 管理注册；该 Skill 不面向 Key Vault 密钥管理或通用 Azure 资源安全指导。

## [azure-aigateway](https://www.skills.sh/microsoft/azure-skills/azure-aigateway)
- **它做什么**：将 Azure API Management（APIM）配置成 AI Gateway，管理 AI 模型、MCP 工具和代理的访问策略。具体包括添加模型后端、配置托管身份访问、语义缓存、Token 限额、内容安全、负载均衡与 Token 指标，并通过网关请求测试调用链路。
- **适合谁用**：已经使用或准备配置 APIM，希望统一管理模型调用、工具限流和 AI 用量的开发者及平台团队。明确依赖 Azure CLI（`az`）；配置与测试需要目标 APIM、模型后端等资源信息。
- **为什么现在值得看**：进入 Trending（24 小时趋势），展示安装量 **13,265**。值得关注的是它同时覆盖模型、工具与代理三类治理入口，而不只是提供一个模型调用示例。
- **如何使用**：请在原页面查看安装方式。用 `az apim show --name <apim-name> --resource-group <rg> --query "gatewayUrl" -o tsv` 获取网关地址，使用 `az apim backend list` 检查后端；添加后端使用 `az apim backend create`。来源示例通过 `az role assignment create` 为 APIM 身份授予目标资源上的 `Cognitive Services User` 角色，再用带 `Ocp-Apim-Subscription-Key` 请求头的 `curl` POST 请求测试 `/openai/deployments/<deployment>/chat/completions?api-version=2024-02-01`。
- **注意**：**部署 APIM 本身应使用 `azure-prepare`**，该 Skill 主要负责网关配置与测试。来源推荐的入站策略顺序为认证 → 语义缓存查询 → Token 限额 → 内容安全 → 后端选择 → 指标。文档中的缓存节省比例不是当前环境的实测结果，配置内容安全策略也不能据此推断网关已具备确定的安全效果。

## [azure-kusto](https://www.skills.sh/microsoft/azure-skills/azure-kusto)
- **它做什么**：使用 KQL 查询 Azure Data Explorer（Kusto／ADX），按“发现资源 → 探索表结构 → 查询 → 分析结果”的流程处理日志、遥测和时间序列数据。支持聚合、分位数、时间分桶及跨表关联；目标表位置不明时，先批量检索候选来源的元数据，再查询已确认包含该表的数据源。
- **适合谁用**：分析应用日志、IoT 遥测、性能指标或关联事件的开发者与数据工程师。需明确订阅、集群、数据库等参数，查询至少需要数据库 Viewer 权限；优先使用 Azure MCP Kusto 工具。
- **为什么现在值得看**：进入 Trending（24 小时趋势），展示安装量 **13,264**。它特别强调先找表、再读结构、最后查询，能避免在多集群或多工作区环境中把“查询为空”误判为“数据不存在”。
- **如何使用**：请在原页面查看安装方式。依次调用 `kusto_cluster_list`、`kusto_database_list`、`kusto_table_schema_get` 和 `kusto_query`；可先用 `Events | where Timestamp > ago(1h) | take 100` 探索近期数据。MCP 不可用时，可用 `az kusto cluster list --resource-group <rg-name>` 等命令发现资源，查询则通过 `az rest --method post` 请求集群的 `/v1/rest/query`，请求体包含 `db` 与 `csl`。
- **注意**：尽早添加时间过滤，使用 `take`／`limit` 控制探索结果规模，并用 `project` 只选择所需列。集群名称参数不应包含 `.kusto.windows.net` 后缀；表位置未知时，必须检查所有候选来源后才能报告未找到。MCP 超时、连接或认证失败，以及已知有数据却返回空响应时，来源提供了 CLI 回退路径。

## [security-audit](https://www.skills.sh/cloudflare/security-audit-skill/security-audit)
- **它做什么**：以源码和真实信任边界为依据审查漏洞，为发现提供受影响主体或资源、证据、安全复现方式、优先级及最小有效修复。默认是针对问题的指导模式；明确请求完整审计、渗透测试或报告产物时，才进入完整流程，建立覆盖台账、发现记录和审计报告。
- **适合谁用**：需要审查代码库、API、CLI、库或守护进程的维护者与安全工程师。动态验证依赖已在本地可用的工具和依赖，以及满足文档全部控制要求的操作系统级沙箱；完整审计还需确定目标、源码版本、范围和输出目录。
- **为什么现在值得看**：进入 Hot（小时爆发），展示安装量 **110**。它的特点在于严格区分“候选问题”“已确认漏洞”和“仍需验证”，并将执行隔离、证据留存和历史覆盖复核纳入审计流程。
- **如何使用**：请在原页面查看安装方式。针对单个问题可直接请求聚焦审查；需要完整流程时，应明确提出完整代码库审计或报告要求。完整模式默认在目标仓库外创建 `~/security-audit-skill/<repo-name>/run-<N>`，由父代理维护 `run-metadata.json`、`coverage-ledger.json`、`findings.json`、`REPORT.md` 等共享产物；给定片段未提供统一启动 CLI 命令。
- **注意**：加载 Skill **不等于授权完整审计或创建文件**，意图不明确时应先询问。执行目标控制的构建、测试或进程必须具备断外网、空环境白名单、只读目标与工具链、独立 `scratch/` 写入及资源限额；任一控制无法落实，就不得执行目标代码，需报告验证阻塞。不允许安装或下载依赖、探测线上端点或生产身份；留存证据必须由可信父侧代码按允许列表校验和转存。提供的 SKILL.md 在运行配置说明处截断，不能据此补全未展示的完整六阶段细节。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*