# AI Skills 新上榜日报 2026-11-04

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-11-03 16:19 UTC

---

今日发现（2026-11-04）：本期 5 个首次收录的 Skill 均来自 `microsoft/azure-skills`，进入 skills.sh Trending（24 小时趋势）榜，覆盖 Foundry Agent 开发、Azure 部署准备与验证、生产诊断和 AKS 规划。值得关注的是它们对工作流边界的明确划分：准备不等于部署，验证通过不等于自动部署，诊断也可以仅依据已有证据完成。

## [microsoft-foundry](https://www.skills.sh/microsoft/azure-skills/microsoft-foundry)
- **它做什么**：覆盖 Microsoft Foundry 的模型部署、Agent 创建与部署、调用、评估、监控和故障排查，通过子技能按任务分流。具体工作流包括从生产追踪构建评估数据集、通过评估优化提示词，以及执行 SFT、DPO、RFT 微调；基础设施侧还涵盖项目创建、配额、RBAC 和网络隔离。
- **适合谁用**：使用 Microsoft Foundry 构建 Agent 或管理模型的开发者、平台工程师。新项目可按“创建项目或隔离网络 → 部署模型 → 创建 Agent → 部署 → 调用”的路径推进；已有代码应走常规 `create`，而不是仅用于从零创建的 quick start。
- **为什么现在值得看**：当前位于 Trending，页面安装量为 **25,770**，不是今日新增安装量。它的看点是把开发、评估、优化和运维串成同一套任务路由，而非仅提供模型部署入口。
- **如何使用**：请在原页面查看安装方式。加载后须先在 Skill 根目录运行依赖检查，等待完成并按输出继续：
  ```bash
  ./scripts/check-and-setup-dependencies.sh   # macOS / Linux
  ./scripts/check-and-setup-dependencies.ps1  # Windows，pwsh
  ```
  随后先读对应子技能；使用 Foundry MCP 前，先调用 Azure MCP 的 `foundry` 工具发现可用工具与参数。任何 `azd` 命令执行前都要阅读 `azd-guidance`，尤其是 `AZURE_DEV_USER_AGENT` 设置规则。
- **注意**：依赖脚本只安装缺失依赖，所给片段未列出完整依赖清单。`validate` 子技能只能在用户明确要求时调用，不能主动加入其他流程；`insights` 只读取已有监控生成的洞察，不启动新分析。此 Skill 不用于 Azure Functions、App Service 或通用 Azure 部署；来源尾部有截断。

## [azure-validate](https://www.skills.sh/microsoft/azure-skills/azure-validate)
- **它做什么**：在部署前检查 Azure 项目的配置、Bicep/Terraform 基础设施、RBAC、托管身份权限及前置条件。采用逐步脚本驱动验证，将进度记录到 `.azure/validate-status.json`，完整通过后才可将部署计划标记为 `Validated`。
- **适合谁用**：已完成 `azure-prepare`、需要检查部署就绪程度或排查部署错误的开发者。前提是工作区存在 `.azure/deployment-plan.md`，状态为 `Approved` 或更后阶段；缺少计划时必须先返回准备流程。
- **为什么现在值得看**：当前位于 Trending，页面安装量为 **25,767**。它将“检查一下能否部署”落实为有状态、可记录证据的流程，适合接入团队部署交接。
- **如何使用**：请在原页面查看安装方式。首次运行不传已完成步骤参数：
  ```bash
  # Windows
  pwsh references/scripts/workflow.ps1 -WorkspacePath <workspace-path>

  # macOS / Linux
  bash references/scripts/workflow.sh --workspace-path <workspace-path>
  ```
  执行脚本给出的下一步，再用 `-CompletedStep <value>` 或 `--completed-step <value>` 回传结果，循环至工作流完成。
- **注意**：所有检查必须通过，不能带着失败项部署；破坏性操作需要 `ask_user`。仅请求验证时，应记录证据、更新状态后停止；用户明确要求部署时，交给 `azure-deploy`，不能直接运行 `azd up`、`azd deploy` 等部署命令。

## [azure-diagnostics](https://www.skills.sh/microsoft/azure-skills/azure-diagnostics)
- **它做什么**：针对 Azure 生产故障执行系统化排查：识别症状、检查资源健康、审查日志、分析指标、调查近期变更，并记录发现及尝试过的修复步骤。覆盖 App Service、Container Apps、Functions、AKS、VM，以及 Event Hubs/Service Bus；可使用 AppLens、Azure Monitor 和 KQL，也支持仅基于用户提供的证据分析。
- **适合谁用**：负责 Azure 应用值班、故障定位和运行维护的开发者、SRE。典型场景包括 Container Apps 503、探针失败、Functions 配置变更后遥测消失、AKS Pod 异常，以及消息连接或锁续期问题。
- **为什么现在值得看**：当前位于 Trending，页面安装量为 **25,767**。它特别强调检查近期配置变化，以及“运行正常但数据流向错误目标”的问题，避免只围绕表面报错查日志。
- **如何使用**：请在原页面查看安装方式。有权限进行在线采集且资源标识已知时，优先使用随附诊断脚本；可用时使用 AppLens MCP，并通过 Resource Health 检查健康状态。来源给出的常用命令包括：
  ```bash
  az monitor activity-log list -g RG --max-events 20
  az containerapp logs show --name APP -g RG --follow
  az monitor app-insights query --apps APP-INSIGHTS -g RG \
    --analytics-query "traces | where timestamp > ago(1h) | order by timestamp desc | take 50"
  ```
- **注意**：先用已有证据；若用户要求 evidence-only 或禁止在线访问，不得查询或修改 Azure，应明确假设并给出可选验证步骤。AKS、VM 和 Messaging 问题分别路由到专门文档；即使可选 `aks-skills` 未安装或被拒绝，基础 AKS 诊断仍应保留。

## [azure-prepare](https://www.skills.sh/microsoft/azure-skills/azure-prepare)
- **它做什么**：为基于 Azure Developer CLI（`azd`）的项目生成部署计划、`azure.yaml`、Bicep/Terraform 基础设施和 Dockerfile。流程先分析工作区、需求与架构，获得用户批准后再生成产物、做功能验证，最后交给 `azure-validate`。
- **适合谁用**：明确选择 `azd`，或项目已经存在 `azure.yaml` 的开发者，适用于新建、修改及现代化改造项目。虽然正文列出较宽泛的触发场景，入口描述明确限定了 azd 使用范围。
- **为什么现在值得看**：当前位于 Trending，页面安装量为 **25,757**。它把落盘计划、用户审批和部署交接设为硬性步骤，适合希望让 AI 生成基础设施过程可审阅的团队。
- **如何使用**：请在原页面查看安装方式。启动后首先在工作区根目录写入 `.azure/deployment-plan.md` 骨架，逐步补全分析与决策，再提交用户审批。批准后生成 `infra/`、`azure.yaml` 和所需 Dockerfile；完成准备后将计划状态更新为 `Ready for Validation`，调用 `azure-validate`，不要直接部署。
- **注意**：订阅和区域需通过 `ask_user` 确认，破坏性操作也需审批。不能删除用户项目或工作区目录；`azd init -t <template>` 仅限新项目，不能用于已有工作区。Python App Service 纯代码部署和跨云迁移应转交专用 Skill；SQL Server Bicep 明确禁止生成管理员用户名/密码属性，要求无条件使用 Entra-only 身份验证。来源尾部有截断。

## [azure-kubernetes](https://www.skills.sh/microsoft/azure-skills/azure-kubernetes)
- **它做什么**：根据需求规划、创建和配置 AKS 集群，重点区分难以事后调整的 Day-0 决策与可后续启用的 Day-1 功能。产出包含配置建议及理由，覆盖 Automatic/Standard 选择、网络、身份、可观测性、升级策略、节点池和成本评估；成本分析还可按 Pod 规格调整、VPA、Cluster Autoscaler、Spot 等方向分流。
- **适合谁用**：负责新建 AKS 环境、集群治理或容量规划的平台工程师。需要明确环境、区域、规模、网络、安全和成本约束；向已有集群部署应用应使用 `azure-kubernetes-app-deploy`，基础故障诊断则交给 `azure-diagnostics`。
- **为什么现在值得看**：当前位于 Trending，页面安装量为 **25,753**。它不仅列配置项，还强调记录网络与 API Server 等关键决策依据，并要求综合成本评审输出统一的排序报告，而非把单项优化当作完整结论。
- **如何使用**：请在原页面查看安装方式。先通过 Azure MCP 的 `mcp_azure_mcp_aks` 发现客户端实际提供的 AKS 工具，选择最小适用工具；能力未暴露时才回退到 `az aks`。来源列出的命令入口包括 `az aks create`、`az aks show`、`kubectl get`、`kubectl describe`，具体参数需查随附 CLI reference。
- **注意**：默认建议 AKS Automatic，有特定定制需求时再考虑 Standard；Day-0 关键需求不清时必须追问。不要索取或输出密钥，也不要要求用户粘贴订阅 ID，应通过 MCP 或 `az account show/list` 发现上下文。NAP 节省成本不作保证；不能承诺零停机，成本证据不足应标为缺口，也不能仅凭本次评审建议购买长期承诺。来源尾部有截断。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*