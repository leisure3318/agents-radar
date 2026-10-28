# AI Skills 新上榜日报 2026-10-28

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-10-28 02:34 UTC

---

今日发现：2026-10-28 的 5 个新上榜条目均来自 Hot（小时爆发）榜，其中资料较完整的是 PR 自动审查、电话数字员工和多岗位专业知识路由。以下安装量为给定榜单数据，不代表今日新增；另有两个条目尚缺来源文档，暂不推断其功能。

## [gh-issue-sync](https://www.skills.sh/mitsuhiko/gh-issue-sync/gh-issue-sync)
- **它做什么**：给定资料未提供原始说明，也未读取到 SKILL.md。目前无法确认其具体工作流、同步对象或实际产出，不能仅凭名称判断功能。
- **适合谁用**：目标使用者和前置条件尚无法核实；建议有相关需求的开发者先审阅来源仓库 `mitsuhiko/gh-issue-sync`。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，给定安装量为 24，可作为进一步考察的信号，但不足以说明功能成熟度。
- **如何使用**：请在原页面查看安装方式。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

## [higgsfield-faceless-video](https://www.skills.sh/higgsfield-ai/skills/higgsfield-faceless-video)
- **它做什么**：给定资料没有原始说明，SKILL.md 也未读取到。暂时无法确认视频制作流程、输入素材、生成服务或输出格式。
- **适合谁用**：目标使用者、账号要求及运行环境均待核实；可先检查来源仓库 `higgsfield-ai/skills` 中对应条目的文档。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，给定安装量为 18；值得关注其后续文档，但不宜据此推断生成效果或可用性。
- **如何使用**：请在原页面查看安装方式。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

## [whobot-phonecall-skill](https://www.skills.sh/whobot-ai/skills/whobot-phonecall-skill)
- **它做什么**：围绕真实电话业务，支持按行业寻找标杆员工、体验网页语音或经确认与验证后的真实电话，以及创建、调优电话数字员工、上传外呼线索和查看线索包。工作流由 `whobot` 命令返回的 `next` 驱动，覆盖回访、邀约、通知、线索筛选和热线接听等场景。产品能力、当前 Skill 可执行操作与某个员工实际可用操作需要分别判断，不能混为一谈。
- **适合谁用**：需要电话业务自动化的企业，以及为其接入工具的开发者。执行前需要可用且协议兼容的 `whobot` CLI；登录和具体操作按系统返回继续。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，给定安装量为 26。值得关注的不只是业务范围，还有明确的确认、状态查询与异常停止流程，便于评估如何接入宿主 Agent。
- **如何使用**：给定资料未提供完整安装命令，请在原页面查看安装方式；安装或更新遵循 `references/setup.md`。首次调用先运行 `whobot status --skill 2.0.0` 并读取 `references/protocol.md`；查通话进度用 `whobot call show`，员工可用操作看 `whobot agents show <agent>` 的 `actions`。产品介绍读取 `product`、`company` 资料，不调用 CLI；业务动作严格跟随返回的 `next.command`。
- **注意**：宿主命令超时至少设为 130 秒；预检返回 `stop` 时停止业务，升级后重查。线索上传前须取得明确同意，其他操作按 `next.confirm` 确认；不得自行拼接确认、计费等参数。`state=unknown` 时不得重复拨打、上传或创建；同一命令失败两次即停止。仅适用于其声明的合法业务，不适用于纯文字客服、聊天机器人或单纯语音合成；费用和能力以资料及系统返回为准。

## [review-pr](https://www.skills.sh/dbpolito/skills/review-pr)
- **它做什么**：在 CI 中审查 GitHub PR，寻找由本次变更新增或加重的实质缺陷，并发布可执行的行内反馈。先固定 base/head SHA，独立追踪完整差异及调用链、尝试反证候选问题，再读取历史讨论、按根因去重并核实旧反馈。最终提交一份正式 review，包含覆盖情况、证据、缺口、版本信息和评分；覆盖不完整必须明确标为 **Review incomplete**。
- **适合谁用**：希望在 CI 中运行无人值守代码审查的维护者。依赖 `git`、`gh`、`jq`，需要完整的相关提交历史、与 PR head 一致的 checkout，以及读取 PR 和发布评审所需的访问权限。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，给定安装量为 7。其看点是把“独立调查—历史核对—发布前验新—失败去重”串成流程，适合关注自动评审可追溯性和重复评论问题的团队。
- **如何使用**：给定资料未提供安装命令，请在原页面查看安装方式。提供仓库与 PR，或通过 `GITHUB_REPOSITORY`、`PR_NUMBER`、`GITHUB_EVENT_PATH` 解析目标，并固定完整 base/head SHA。发布时用 `jq` 构造 JSON，直接管道传给 `gh api --method POST "repos/OWNER/REPO/pulls/NUMBER/reviews" --input -`；只有完整五星审查使用 `APPROVE`，其余使用 `COMMENT`。
- **注意**：不得修改已跟踪文件、索引、分支或固定版本；默认不运行测试及环境设置命令，也不查看 CI checks/logs。仅在用户明确要求时运行范围内的安全定向测试。checkout 不匹配、PR 已关闭、为草稿或版本变化时须停止；发布前后都要核验 SHA。不得合并 PR、关闭讨论线程或修改 PR 元数据；发布失败时按规则尝试发布去重后的故障评论，不能盲目重试。

## [it-role-expert](https://www.skills.sh/site/krafton-ai.kira/it-role-expert)
- **它做什么**：根据问题选择工程、产品、设计、数据、营销、销售、运营、人事、法务、财务、管理或学术等岗位的参考资料，再应用其中的职责知识、决策框架和最佳实践作答。实际产出是岗位视角的建议或分析，不是自动执行业务任务。没有专业岗位需求时，回退到 General Colleague；同一问题也可结合多个岗位视角。
- **适合谁用**：需要岗位化咨询、跨职能分析或为 Agent 配置专业知识路由的开发者和团队。前提是能读取对应的 `references/[category]/[role].md` 文件。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，给定安装量为 6。它提供了轻量的“识别角色—读取资料—应用框架”模式，值得需要多岗位知识组织方式的开发者参考。
- **如何使用**：给定资料未提供安装命令，请在原页面查看安装方式。使用时先识别角色，再读取对应参考文件：例如需求优先级读 `references/product-design/product-manager.md`，前端审查读 `references/engineering/frontend-engineer.md`；一般职场问题读 `references/general/general-colleague.md`。文档未给出启动或验证命令。
- **注意**：明确强调提供专业知识而非模仿人格、语气或沟通风格；建议须结合实际约束并考虑跨职能协作。本次给定资料未包含各岗位参考文件正文，因此无法进一步核实其中的具体框架或工具要求。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*