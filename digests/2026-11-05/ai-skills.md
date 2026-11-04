# AI Skills 新上榜日报 2026-11-05

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-11-04 16:23 UTC

---

今日发现：本期 5 个首次进入日报的 Skill 均来自 `microsoft/azure-skills`，登上 skills.sh Trending（24 小时趋势）榜，覆盖 Azure AI 调用、应用上云、技能发现、工作负载升级和合规审计。值得关注的不只是功能范围，还有来源中明确规定的审批节点、验证流程与任务边界；下列安装量为给定榜单数据，并非今日新增。

## [azure-ai](https://www.skills.sh/microsoft/azure-skills/azure-ai)
- **它做什么**：为 Azure AI Search、Speech、OpenAI 和 Document Intelligence 提供使用指引，涵盖全文／向量／混合检索、语音转写、语音合成和 OCR。具体操作包括列出搜索索引、读取索引详情、执行查询，以及通过 Speech 工具完成转写和文本转语音；同时提供多语言 SDK 参考。
- **适合谁用**：需要接入 Azure 搜索、语音或文档处理服务的开发者。优先使用 Azure MCP；编程接入可参考对应服务的 Python、TypeScript、.NET 等 SDK 指南。
- **为什么现在值得看**：当前位列 Trending，安装量为 **14,067**。如果正在为应用增加检索或语音能力，它提供了明确的服务与工具映射，便于快速选择调用入口。
- **如何使用**：请在原页面查看安装方式。启用 Azure MCP 后，可通过 `azure__search` 执行 `search_index_list`、`search_index_get`、`search_query`，通过 `azure__speech` 执行 `speech_transcribe`、`speech_synthesize`；CLI 入口包括 `az search` 和 `az cognitiveservices`。
- **注意**：来源优先推荐 MCP。若未启用，在 Copilot CLI 或 Claude Code 中运行 `/mcp` 并启用 Azure MCP；其他客户端需通过其 MCP 配置启用。来源未给出 Document Intelligence 的 MCP 或 CLI 入口，不应将全部服务视为均可由上述工具直接操作。

## [azure-app-onboard](https://www.skills.sh/microsoft/azure-skills/azure-app-onboard)
- **它做什么**：将业务想法或已有代码库推进到 Azure 部署，产出架构方案、成本估算、IaC 文件和部署资源。工作流依次包含会话与登录检查、范围判断、前置扫描、需求确认、架构设计、脚手架审批、生成文件、部署审批、部署及交接；已有应用可按原样或以最小改动迁移。
- **适合谁用**：知道要构建什么、但不确定 Azure 服务选型的开发者，以及希望先了解成本再上云的团队。输入可以是业务想法或现有代码，也可补充预算和规模偏好；流程会验证 Azure CLI 身份、订阅与用户信息。
- **为什么现在值得看**：当前位列 Trending，安装量为 **14,065**。它把服务选型、成本估算和部署串成一条流程，尤其适合尚未确定架构的首次上云项目。
- **如何使用**：请在原页面查看安装方式。从“把这个应用部署到 Azure，并先给出架构和成本估算”等任务启动；每次会话先读取 `references/pipeline-rules.md`，再按步骤执行。前置扫描会调用 `azure-app-onboard-prereq`；生成 `scaffold-manifest.json` 后必须立即进入部署审批，并以 **“🚀 Ready to deploy? (Yes / Run manually / Edit plan / Cancel)”** 作为回复的最后内容，等待用户选择。
- **注意**：生成文件前和部署前均有审批门；前置扫描若为 `blocked` 或设置了 `routeToSkill`，必须停止。执行 `az deployment`、`az webapp deploy` 或 `az acr build` 前须按规定读取部署清单及内部 `deploy/SKILL.md`，不得转调独立的 `azure-deploy`。单纯运行 `azd up`、已知架构的 IaC 生成、现有成本优化或 AKS 管理应使用其他对应 Skill；MCP 不可用时须披露受影响检查及估算假设。

## [discover-azure-skills](https://www.skills.sh/microsoft/azure-skills/discover-azure-skills)
- **它做什么**：根据 Azure 任务搜索技能目录，筛选相关 Skill，并给出对应插件的安装指引。它先枚举插件和技能目录，再阅读候选 `SKILL.md` 的描述，最后读取 `plugin.json` 确认真正的插件名，输出匹配结果。
- **适合谁用**：准备处理 Azure 或 Microsoft 云服务任务，但当前加载的 Skill 或工具尚不能覆盖需求的开发者。工作流需要访问 GitHub Contents API 和原始文件地址。
- **为什么现在值得看**：当前位列 Trending，安装量为 **14,062**。当 Azure 技能按多个插件组织时，它能帮助先找到正确入口，而不是凭目录名称猜测安装对象。
- **如何使用**：请在原页面查看安装方式。启动时描述具体 Azure 任务；流程从 `https://api.github.com/repos/microsoft/azure-skills/contents/.github/plugins?ref=main` 枚举插件，再查询各插件的 `skills` 目录、候选 `SKILL.md` 和 `.plugin/plugin.json`。最终按 Copilot CLI、Claude Code 或其他客户端的安装参考给出指引。
- **注意**：插件名可能不同于目录名，安装时必须以 `plugin.json` 为准。技能通过安装其所属插件获得；给定资料未包含各客户端的具体安装命令，因此不能直接补写。该 Skill 的职责是发现与推荐，不是执行匹配到的 Azure 任务。

## [azure-upgrade](https://www.skills.sh/microsoft/azure-skills/azure-upgrade)
- **它做什么**：评估并升级 Azure 内部的服务、托管计划或 SKU，也支持将 Java 代码中的旧版 `com.microsoft.azure.*` SDK 迁移到 `com.azure.*`。明确列出的场景包括 Functions Consumption → Flex Consumption，以及 Azure Cache for Redis／Enterprise → Azure Managed Redis；服务升级按识别、评估、迁移前采集、升级、验证和交接推进，并记录迁移状态。
- **适合谁用**：维护现有 Azure 工作负载、准备更换计划或 Redis 服务，以及需要现代化 Java Azure SDK 的开发者。兼容性要求为 **Python 3.10+**，并需使用 Azure 最佳实践和文档 MCP 工具。
- **为什么现在值得看**：当前位列 Trending，安装量为 **14,061**。它不仅关注迁移执行，还明确区分 Linux／Windows Functions 路径、代码兼容性评估和迁移后的验证状态，适合升级前先做准备度检查。
- **如何使用**：请在原页面查看安装方式。先指定源资源与目标计划／SKU，确认目标后加载对应场景参考并生成评估；Linux Functions 的订阅级候选发现使用 `az functionapp flex-migration list`，Windows 需按专用流程手动发现并检查兼容性。进度写入 `<UPGRADE_DIR>/upgrade-status.md`；Java SDK 迁移走独立源码现代化流程。
- **注意**：升级操作前必须先评估并确认目标；破坏性操作须通过 `ask_user` 获批，未经明确确认不得停止或删除原应用。Windows Consumption → Flex 默认将源应用视为只读，每次修改均需单独审批；脚本必须幂等且可恢复。验证受限时应记录为延期，不能自动放宽安全限制或声称功能验证成功；跨云迁移不属于此 Skill。

## [azure-compliance](https://www.skills.sh/microsoft/azure-skills/azure-compliance)
- **它做什么**：使用 azqr 开展 Azure 资源合规与最佳实践评估，并检查 Key Vault 中密钥、机密和证书的到期情况。工作流先选择订阅或资源组范围，再运行扫描、保存输出、分析结果，最后按 Critical、High、Medium、Low 分类并提出修复建议。
- **适合谁用**：负责 Azure 资源治理、安全审计和 Key Vault 到期管理的开发者或平台团队。前置条件是已通过 `az login` 登录，并具备读取资源配置及 Key Vault 元数据的权限。
- **为什么现在值得看**：当前位列 Trending，安装量为 **14,061**。它将资源评估和凭据到期检查纳入同一审计流程，适合建立周期性检查与问题跟踪机制。
- **如何使用**：请在原页面查看安装方式。先运行 `az login`，选择订阅或资源组后，通过 `mcp_azure_mcp_extension_azqr` 运行扫描并保存产物；使用 `keyvault_key_list/get`、`keyvault_secret_list/get`、`keyvault_certificate_list/get` 对应工具检查各类对象及到期信息。具体评估前应阅读对应的 azqr 或 Key Vault 审计参考。
- **注意**：合规报告与修复执行应分开，不应把扫描视为自动修复。遇到 `Forbidden` 需检查权限和角色分配，遇到 `Not found` 需核对订阅与资源组。来源建议按周或按月扫描并持续验证修复效果，但未宣称扫描结果等同于取得合规认证。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*