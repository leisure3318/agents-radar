# AI Skills 新上榜日报 2026-11-26

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-11-26 03:58 UTC

---

今日发现：本期 5 个首次收录的 Skill 分成两条工作链：从用户访谈到“先设计、后编码”，以及从网站专项审计到上线检查和 CI 门禁。`user-interview-guide` 同时进入 Trending 与 Hot，其余 4 项进入 Hot；以下安装量均为给定榜单数据，不代表今日新增。

## [user-interview-guide](https://www.skills.sh/uxpilot-ai/user-interview-skill/user-interview-guide)
- **它做什么**：把研究目标转成可执行的 1:1 用户访谈提纲，覆盖客户发现、激活、流失、产品切换和概念访谈，也能审查诱导性、假设性或问题过载的旧提纲。先明确“要了解什么”和“结果如何使用”，再选择深入研究设计、立即起草或从已有材料提取上下文。最终产出包括确认后的访谈焦点、分时段核心问题与可选追问、简短主持人提示卡，以及访后即时复盘。
- **适合谁用**：产品经理、用户研究员，以及需要直接参与客户访谈的开发者。适合手里已有支持记录、分析数据或产品假设，但尚未形成中立问题的场景；不依赖 UX Pilot 即可完成访谈提纲。
- **为什么现在值得看**：同时出现在 **Trending（24 小时趋势）与 Hot（小时爆发）**，给定安装量为 **719**。值得关注的是它把研究设计和问题改写做成了明确流程，而不只是生成一份通用问题清单。
- **如何使用**：请在原页面查看安装方式。启动时提供研究目标、结果用途及已有材料；选择立即起草时，只补充会实质影响提纲的缺失约束，并明确假设。Skill 要求读取 `references/interview-modes.md` 和 `references/question-design.md`；涉及招募、同意、录音或敏感话题时，再读取相应参考文件，完整研究轮次使用 `assets/interview-guide-template.md`。
- **注意**：澄清问题必须每轮只问一个，不能把两个方向性问题合并；选择深入模式后，只有用户可以结束，不能由 Agent 自行转入起草。访谈揭示的是机制和用户语言，不能据此判断普遍程度、因果增益、付费意愿或未来留存；若主要目标是观察任务完成、测量比例或测试因果，应说明访谈并非首选方法。UX Pilot 仅为交付后的可选关联工具。

## [ui-design](https://www.skills.sh/uxpilot-ai/frontend-design-skill/ui-design)
- **它做什么**：先在用户可查看、编辑的 UX Pilot 画布上设计真实界面，再按项目现有技术栈落地代码。它先读取 README、路由、页面文案和设计变量形成 brief，设计后展示链接、处理对比度与文字裁切等检查项，最后读取设计 HTML 并使用项目组件和 tokens 重建。支持 UX Pilot 生成设计，以及自行编写 HTML 后导入画布两条路径。
- **适合谁用**：希望在写代码前确认页面效果的前端开发者、设计工程师和产品团队，适用于落地页、仪表盘、应用页面及组件改版。前置条件是连接 **UX Pilot MCP server** 并登录 UX Pilot 账号。
- **为什么现在值得看**：进入 **Hot（小时爆发）**，给定安装量为 **402**。它把“看设计—做修改—确认后实现”串成可见流程，适合不想让 Agent 直接跳到代码的团队。
- **如何使用**：Skill 安装方式请在原页面查看。Claude Code 的 MCP 连接命令为：
  ```bash
  claude mcp add --transport http uxpilot https://mcp.uxpilot.net/mcp
  ```
  然后在 Claude Code 内执行 `/mcp` 登录；其他支持的 Agent 使用同一 MCP URL 配置。确认可用工具后，默认调用 `design`，设置 `action: "agent"`：首轮仅返回摘要和 `confirmationToken`，用户同意后携带 `confirmed: true` 与 token 再次调用。启动后立即分享 `designUrl`，每 5～10 秒用 `get_job` 查询；编码前读取 `references/implementing.md`。
- **注意**：默认生成路径消耗 credits，必须先告知并取得确认；自行写 HTML 后 `import` 不消耗 credits，但免费计划的导入与编辑有每周操作额度。免费计划不能读取 UX Pilot 生成界面的 HTML，遇到拒绝必须暂停，让用户选择升级或按截图近似重建；自行导入的 HTML 可以读回。必须先展示设计和链接再写代码，不得循环重试被拒绝的请求，也不能编造价格或额度；设计中的虚构名称、引语和数字只能作为待替换占位内容。

## [accessibility-audit](https://www.skills.sh/squirrelscan/skills/accessibility-audit)
- **它做什么**：使用 squirrelscan 的手写标记检查规则，检查可访问名称、表单标签、ARIA、标题、地标、部分对比度、语言、缩放和触控目标问题。结果按共享组件或模板归组，优先修复页面级阻断、控件名称、ARIA、结构和视觉问题，再复审。交付自动化发现、跳过检查的解释，以及需要人工验证的清单。
- **适合谁用**：维护 React/Next.js、WordPress、Shopify、Webflow 或静态站点的开发者，以及需要做 WCAG 相关排查的团队。需要 PATH 中可用的 `squirrel` CLI，或已连接的托管 squirrelscan MCP server。
- **为什么现在值得看**：进入 **Hot（小时爆发）**，给定安装量为 **69**。它将“按组件修复”和“自动化覆盖边界”都写进流程，尤其适合避免把扫描无报错误当成无障碍合规证明。
- **如何使用**：Skill 安装方式请在原页面查看；CLI 缺失时按来源指引从 `https://squirrelscan.com/download` 安装。先执行：
  ```bash
  squirrel --version
  squirrel auth status
  ```
  首轮可导出完整 JSON：
  ```bash
  squirrel audit https://example.com --level surface \
    --rule-include a11y,images/alt-text,mobile/viewport-zoom \
    --format json -o a11y.json
  ```
  按组件修复后，用 `--level full`、`--wcag-level AA` 复审，并检查 `skippedChecks`；已有审计可用 `squirrel report <audit-id> --wcag-checklist markdown` 输出准则清单。
- **注意**：这不是 axe-core 扫描，也不覆盖全部 WCAG；键盘流程、焦点顺序、屏幕阅读器表现、字幕和替代文本质量等仍需人工检查。`llm` 格式只抽样展示，完整列表应看 JSON；跳过不等于通过，对比度和焦点样式不能靠猜，应取得设计 tokens 后修改再审计。未登录或 `--offline` 时本地免费且不发布；普通登录审计按来源计费规则扣 credits，并可能加入仪表盘、启用周期审计及发布非公开列出的报告，须先告知并获同意，可提供 `--offline` 或 `--no-publish`；非自有站点加 `--ephemeral`。结论只能写“无自动化发现”，不能写“符合 WCAG”。

## [website-ci-gate](https://www.skills.sh/squirrelscan/skills/website-ci-gate)
- **它做什么**：为 GitHub Actions、GitLab 或预览部署编写 squirrelscan 审计门禁，用总分、分类分、错误级发现或新增发现决定是否阻止流水线。先跑真实基线，选择当前站点能够通过的阈值，再配置 CI 并验证失败路径。它负责门禁配置，不负责修复发现。
- **适合谁用**：希望在 PR、预览部署或发布阶段阻止网站质量回退的前端、平台和 DevOps 团队。需要 squirrel CLI 或托管 MCP 连接；CI 中使用 CLI 或官方 Action，云端“仅拦截新增发现”还需要组织 API key。
- **为什么现在值得看**：进入 **Hot（小时爆发）**，给定安装量为 **69**。它区分绝对阈值与历史新增发现，并明确处理审计未成功执行的退出码，避免流水线因“没审到”而错误放行。
- **如何使用**：Skill 安装方式请在原页面查看。先运行 `squirrel --version`、`squirrel auth status`，再建立基线：
  ```bash
  squirrel audit https://staging.example.com --level quick \
    --format json -o baseline.json
  ```
  根据实际分数设置门禁；以下仅为来源示例，不是通用推荐阈值：
  ```bash
  squirrel audit "$URL" --level quick --format json -o report.json \
    --fail-on 'score<85' --fail-on 'score:perf<70' \
    --fail-on 'severity>=error'
  ```
  GitHub 优先使用 `squirrelscan/audit-action@v1`。若只阻止新增错误，使用：
  ```bash
  squirrel ci <url> --website <id> --fail-on-new error
  ```
- **注意**：`--fail-on` 是绝对阈值，表达式必须加引号；仅新增模式需要 `SQUIRRELSCAN_API_KEY` 具备 `audits:read`、`audits:write` 权限，首次无基线时退出 0。所有非零退出码都应让作业失败，不能只处理阈值触发的 `2`；`3/4/5` 分别代表被拦截、跨站重定向和无法访问。修改现有工作流前必须展示 diff，密钥只能由用户配置到 CI secret store；故意引入回归以验证红灯前，也应取得同意。未登录 CI 审计免费；组织 key 模式免审计和页面费用，仅云渲染按每页 2 credits 计费，`--http` 不渲染。完成标准是当前主线通过、刻意回归失败，并在仓库中记录阈值理由。

## [launch-checklist](https://www.skills.sh/squirrelscan/skills/launch-checklist)
- **它做什么**：为新站、改版或迁移执行上线前检查：先做一次完整基线，再按泄漏与入侵迹象、HTTPS、索引、链接和运行错误等顺序处理阻断项。随后检查 SEO、无障碍、性能、安全响应头和结构化数据，并输出标明“已清除／未清除／未检查”的 go/no-go 表。上线后对正式 URL 强制刷新复审，与基线比较，并建议加入 CI 门禁。
- **适合谁用**：负责发布验收、迁移切换和网站上线的开发者及发布负责人。需要可访问的预发布与正式 URL，以及 squirrel CLI 或已连接的托管 MCP；专项修复会交接给对应审计 Skill。
- **为什么现在值得看**：进入 **Hot（小时爆发）**，给定安装量为 **69**。它与本期专项无障碍检查、CI 门禁形成衔接：先做发布决策，再持续防止回退，而不是只交一份扫描分数。
- **如何使用**：Skill 安装方式请在原页面查看。先执行 `squirrel --version`、`squirrel auth status`，再建立完整基线：
  ```bash
  squirrel audit https://staging.example.com --level full \
    --format json -o launch-baseline.json
  ```
  读取分数、错误级发现和 `Not checked:`，按阻断项逐类处理。DNS 与部署完成后重新审计正式站点：
  ```bash
  squirrel audit https://example.com --level full --refresh \
    --format json -o launch-live.json
  squirrel report --diff <baseline-audit-id>
  ```
- **注意**：不得为了上线而移除预发布环境自身的 `noindex`；应只在生产构建中移除，并在正式 URL 上验证。退出码 `3/4/5` 表示没有完成审计，必须先修正访问条件或 URL；“未检查”不能写成“已清除”。工具不能判断文案、设计或法律合规，表单端到端、分析与同意机制、法律页面、邮件发送域等仍需人工核验。普通登录审计会计费并可能产生仪表盘、周期审计及报告发布行为，须先获同意；可选 `--offline`、`--no-publish`，非自有站点加 `--ephemeral`。只有正式站点的全部阻断项清除，或用户在 go/no-go 表中书面接受每个未结项，才达到停止条件。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*