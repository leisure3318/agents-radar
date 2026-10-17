# AI Skills 新上榜日报 2026-10-17

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-10-17 01:31 UTC

---

今日发现：2026-10-17 的「AI Skills 新上榜」收录 5 个此前未在本日报出现的 Skill，均来自 Trending（24 小时趋势）榜。`find-skills` 提供了完整的发现、筛选与安装工作流；其余 4 个条目未读取到 SKILL.md，目前只能确认榜单信息，不能据名称判断具体功能与依赖。

## [find-skills](https://www.skills.sh/vercel-labs/skills/find-skills)
- **它做什么**：帮助用户从开放 Agent Skills 生态中发现并安装适合当前任务的 Skill。工作流是先明确领域与任务、查看 skills.sh 排行榜，再按关键词搜索，并核查安装量、来源与仓库星标。最终向用户提供候选 Skill 的用途、来源、安装量、安装命令和详情链接；找不到时，可直接协助任务或建议创建自己的 Skill。
- **适合谁用**：希望为 Agent 扩展测试、设计、部署、代码审查等能力的开发者，以及需要替用户寻找现成工作流的 Agent。命令行操作使用 Skills CLI（`npx skills`），需要能运行相应命令的环境。
- **为什么现在值得看**：当前进入 Trending（24 小时趋势）榜，安装量为 **17,637**，值得关注其作为技能发现入口的工作流；这一数字不是今日新增安装量。
- **如何使用**：
  - 安装此 Skill：`npx skills add vercel-labs/skills@find-skills`。
  - 先查看 [skills.sh 排行榜](https://skills.sh/)，未找到合适选项时再搜索：`npx skills find [query] [--owner <owner>]`，例如 `npx skills find react performance`。
  - 推荐前核查安装量、来源与 GitHub 星标；用户决定继续后，可执行 `npx skills add <owner/repo@skill> -g -y`。
  - 更新已安装技能：`npx skills update`；无匹配技能时可用 `npx skills init my-xyz-skill` 创建新技能。
- **注意**：SKILL.md 明确要求**不能只凭搜索结果推荐**：优先考虑安装量 1K+ 的技能，对低于 100 次安装或来源仓库少于 100 星的技能保持谨慎，并核查来源信誉。这些是筛选指引，不构成安全保证。`-g` 表示用户级全局安装，`-y` 会跳过确认提示，应在用户希望继续安装后使用。

## [ai-video-generation](https://www.skills.sh/gencraft-labs/skills/ai-video-generation)
- **它做什么**：给定资料未提供原始说明，也未读取到 SKILL.md。目前无法确认其具体能力、操作流程和实际产出，不能仅凭名称推断支持的模型或生成方式。
- **适合谁用**：可作为关注 AI 视频生成方向的开发者的待核查条目；具体适用场景、账户要求与运行前置条件尚不明确。
- **为什么现在值得看**：当前进入 Trending（24 小时趋势）榜，安装量为 **14,623**。榜单趋势值得关注，但安装量不代表今日新增，也不能替代功能核查。
- **如何使用**：请在原页面查看安装方式。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

## [video-edit](https://www.skills.sh/gencraft-labs/skills/video-edit)
- **它做什么**：给定资料未提供原始说明，也未读取到 SKILL.md。目前无法确认其支持哪些视频编辑操作、输入输出格式或自动化工作流。
- **适合谁用**：可作为有视频编辑需求的开发者的待核查条目；是否适合具体剪辑任务，以及所需工具和环境，均需查阅来源资料。
- **为什么现在值得看**：当前进入 Trending（24 小时趋势）榜，安装量为 **14,602**，提供了一个值得进一步审阅的趋势信号；该数字不是今日新增。
- **如何使用**：请在原页面查看安装方式。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

## [image-to-video](https://www.skills.sh/gencraft-labs/skills/image-to-video)
- **它做什么**：给定资料未提供原始说明，也未读取到 SKILL.md。目前无法确认其图像输入要求、视频生成流程或输出规格。
- **适合谁用**：可作为关注图像转视频方向的开发者的待核查条目；具体使用场景、模型或服务依赖尚不明确。
- **为什么现在值得看**：当前进入 Trending（24 小时趋势）榜，安装量为 **14,577**。这说明它出现在当前趋势榜中，并不表示今日新增了同等数量的安装。
- **如何使用**：请在原页面查看安装方式。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

## [ai-image-generation](https://www.skills.sh/gencraft-labs/skills/ai-image-generation)
- **它做什么**：给定资料未提供原始说明，也未读取到 SKILL.md。目前无法确认其图像生成能力、支持的模型、参数配置或实际交付形式。
- **适合谁用**：可作为关注 AI 图像生成方向的开发者的待核查条目；是否需要外部服务、凭据或本地运行环境，需要进一步审阅。
- **为什么现在值得看**：当前进入 Trending（24 小时趋势）榜，安装量为 **14,552**，值得纳入后续核查清单；安装量不是今日新增，也不能据此判断功能完整性。
- **如何使用**：请在原页面查看安装方式。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*