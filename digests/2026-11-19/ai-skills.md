# AI Skills 新上榜日报 2026-11-19

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-11-18 17:15 UTC

---

今日发现：本次 5 个首次进入日报的 Skill 均来自 Hot（小时爆发）榜，方向涵盖跨云迁移、参考驱动的 UI 设计与企业 EDI 集成。资料完整度差异较大：其中 3 个可依据 SKILL.md 提炼工作流，另 2 个暂只能确认上榜信息；安装量均为给定榜单数据，不代表今日新增。

## [thinkui](https://www.skills.sh/site/thinkui.xyz/thinkui)
- **它做什么**：当前未提供原始说明，也未读取到 SKILL.md。仅凭名称无法确认其核心能力、工作流或实际产出。
- **适合谁用**：适合希望进一步核查该项目的开发者；目标场景与前置条件尚无资料可确认。
- **为什么现在值得看**：进入 Hot 小时爆发榜，给定安装量为 32，是本批条目中最高的；这反映近期热度信号，不足以判断功能质量或成熟度。
- **如何使用**：请在原页面查看安装方式。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

## [runpod-cloud-migrate](https://www.skills.sh/runpod/runpod-plugins-official/runpod-cloud-migrate)
- **它做什么**：将其他云或 GPU 平台上的工作负载迁移到 Runpod，覆盖 AWS、Google Cloud、Azure、Modal、Replicate 等来源。流程是先扫描仓库与盘点线上资源，再按负载形态映射到 Pod、Serverless、vLLM endpoint 或 Instant Cluster，提交包含成本上界的计划。随后逐个迁移、用真实请求对比旧新部署，并交付资源位置、计费状态、未决问题与回滚方法。
- **适合谁用**：准备迁移推理服务、训练任务、交互式 GPU 环境或常驻服务的开发者与平台工程师。需要项目仓库、源平台资源清单，以及创建 Runpod 资源的相应工具；具体操作会交给 `runpod-mcp`、`runpodctl`、`runpod-flash` 等配套 Skill。
- **为什么现在值得看**：进入 Hot 小时爆发榜，给定安装量为 4。值得关注的是它将“迁移”拆成可审批、可验证、可回滚的逐负载流程，而非只改 SDK 或部署配置。
- **如何使用**：请在原页面查看安装方式。先定位随 Skill 附带的扫描器，再从用户仓库根目录执行：
  ```bash
  SCAN="$CLAUDE_PLUGIN_ROOT/skills/runpod-cloud-migrate/scripts/scan_cloud_usage.py"
  python3 "$SCAN" .          # 按平台与类型输出 Markdown 摘要
  python3 "$SCAN" . --json   # 输出全部命中，便于检查大型仓库
  ```
  若该路径不存在，必须先按 SKILL.md 的回退路径找到脚本，不能直接继续。扫描后打开命中文件，结合源平台只读资源查询，阅读对应迁移手册；部署后从两个平台之外向旧新服务发送同样输入，比较输出、冷/热请求延迟及错误处理。
- **注意**：声明兼容 Linux、macOS、Windows；扫描命令依赖 `python3`，扫描器本身只读文件，不联网、不读取凭据、不修改文件。创建任何计费资源前必须获得计划批准；源平台资源未经逐项明确授权不得停止、缩容、删除或修改。凭据只迁移名称，值由用户设置为秘密或环境变量；GPU 与数据中心选择前要查实时库存。该 Skill 不用于 Runpod API 版本之间的代码迁移，后者应使用 `runpod-migrate`。

## [likec4-dsl](https://www.skills.sh/site/likec4.dev/likec4-dsl)
- **它做什么**：当前没有原始说明，也未读取到 SKILL.md。无法据此确认它支持哪些 DSL 操作、命令或生成产物。
- **适合谁用**：适合正在评估该项目、愿意先核查来源文档的开发者；具体目标人群、场景与依赖尚待确认。
- **为什么现在值得看**：进入 Hot 小时爆发榜，给定安装量为 4，可作为后续查阅线索，但不能仅凭榜单推断其能力范围。
- **如何使用**：请在原页面查看安装方式。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

## [refero-design](https://www.skills.sh/referodesign/refero_skill/refero-design)
- **它做什么**：提供“先研究、后设计”的 UI 与产品设计方法，要求实现前用参考资料支撑视觉、布局、内容和交互决策。它将研究分为 Styles（视觉方向）、Screens（具体界面模式）和 Flows（多步骤旅程），并形成概念、设计 token 方向、决策记录与参考锁定。实现后还要对照锁定目标检查渲染结果，修正设计偏移。
- **适合谁用**：面向做落地页、产品界面、改版和前端视觉打磨的设计师与开发者。具备 Refero MCP 时可做实时参考研究；未配置 MCP 时，也可用随附工艺参考和用户提供的资料，但不能跳过研究。
- **为什么现在值得看**：进入 Hot 小时爆发榜，给定安装量为 4。它的特色是要求选择一个主导方向、只借用少量次要细节，并保留参考中颜色、字体与组件的角色含义，避免把多个参考平均成泛化方案。
- **如何使用**：请在原页面查看安装方式。若要接入实时研究，资料给出的 MCP 配置命令为：
  ```bash
  claude mcp add --transport http refero https://api.refero.design/mcp
  ```
  然后在 Claude Code 中运行 `/mcp` 并登录 Refero。先写简短设计 brief；视觉任务优先用 `refero_search_styles` 搜索 3～5 个角度，再用 `refero_get_style` 取回 3～4 个强参考。具体界面和旅程分别用 screens、flows 工具研究，完成参考锁定后再编码，并做渲染对照验证。
- **注意**：研究是强制步骤，但 MCP 不是必需条件。Styles 当前主要覆盖 Web 营销和产品宣传页面，不覆盖应用内仪表盘、认证、设置或 iOS 页面作为完整风格系统，这些任务需结合 Screens／Flows。重大改版或新视觉语言默认探索 3 个参考锁定方案供用户选择；图像生成只在确实影响结果时使用，并非每个环境都可用。给定 SKILL.md 尾部被截断，后续规则未完整提供。

## [building-b2b](https://www.skills.sh/site/celigo.ai/building-b2b)
- **它做什么**：指导在 Celigo B2B Manager 中构建 EDI 集成，包括交易伙伴接入、EDI profile、文件解析／生成规则、数据流与交易监控。支持 X12、EDIFACT，以及 FTP/SFTP、AS2、S3、VAN 和云文件提供商的文件夹模式。核心流程是查找伙伴模板、复用既有资源，再建立连接、信封配置、文件定义与收发流程。
- **适合谁用**：面向负责供应链订单、发票、发货通知等业务文档交换的集成工程师。需要可访问的 Celigo 账户与 CLI，以及伙伴提供的真实连接信息、身份标识、规范或样例文件；部分文件定义字段涉及 EDI 授权账户。
- **为什么现在值得看**：进入 Hot 小时爆发榜，给定安装量为 3。资料包含不少落地细节，例如模板不能直接当作真实连接参数、同一伙伴应复用 profile，以及不同文档类型需要各自匹配的文件定义。
- **如何使用**：请在原页面查看安装方式。先查询伙伴模板并读取完整配置：
  ```bash
  celigo tp-connectors list --distinct
  celigo tp-connectors get <connectorId>
  ```
  创建前检查现有资源：
  ```bash
  celigo account search "<partner-name>"
  celigo edi-profiles list | grep -i "<partner-name>"
  celigo file-definitions list | grep -i "<partner-name>"
  celigo connections list | grep -i "<partner-name>"
  ```
  准备真实连接参数后创建并验证连接：
  ```bash
  celigo connections create --tp-connector <id or name> < connection.json
  celigo connections ping <connectionId>
  ```
  后续按 schema 建立 EDI profile、文件定义和流；文档交换监控入口为 `celigo edi-transactions list`。
- **注意**：伙伴 connector 是模板，API／CLI 不会通过一次“安装”自动创建全部资源。不要复制模板中的占位连接值：AS2 的 `partnerId` 创建后不可更改，修复需新建连接；未知或未发布的 connector ID 会触发 422。伙伴身份字段必须取自指南、样例或 connector，缺失时询问，不能编造。EDI profile 和文件定义属于账户级资源；文件定义的序列化 `rules[]` 最多 20 KB。固定宽度定义必须按顺序声明所有列及长度，`startPosition` 会被忽略；缺少规定字段会被拒绝。给定正文在创建 EDI profile 部分截断，后续细节未完整提供。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*