# AI Skills 新上榜日报 2026-10-30

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-10-30 02:53 UTC

---

# AI Skills 新上榜日报 · 2026-10-30

**今日发现**：本期 5 个首次收录的 Skill 均来自 `mattpocock/skills`，覆盖方案追问、深模块设计、架构扫描和代码审查，能够串成“发现问题—澄清决策—验证改动”的工作流。其中 `grilling` 与 `improve-codebase-architecture` 同时进入 Trending 和 Hot，兼具 24 小时趋势与小时爆发信号。

## [grilling](https://www.skills.sh/mattpocock/skills/grilling)
- **它做什么**：把计划、决策或想法拆成一棵“设计树”，按依赖关系逐轮追问，直到所有分支都得到讨论。每轮只提出前置条件已明确的问题，逐题给出推荐答案，并把问题写成回答“是”即可接受推荐的形式。实际产出是经过用户逐轮确认的共同理解，而不是直接执行方案。
- **适合谁用**：需要压力测试技术方案、产品计划或重要决策的开发者与负责人。涉及代码库或运行环境事实时，执行环境需要能够派发具有独立上下文的子代理进行调查。
- **为什么现在值得看**：同时进入 **Trending + Hot**，给定安装量为 **283**。值得关注的是其按决策依赖推进的追问机制，而不是单纯增加问题数量；安装量不代表今日新增。
- **如何使用**：请在原页面查看安装方式。启动时可要求对某个方案进行“grill”或压力测试；每轮回答编号问题，等待下一轮推进。环境事实由子代理查明，不应让用户提供本可自行查询的信息；调查未结束时，仍可先讨论不依赖它的其他问题。
- **注意**：同一轮中，不能提出依赖本轮其他未决答案的问题。决策必须交给用户；只有设计树已无待讨论分支才算完成，且在用户确认双方已达成共同理解前，不得执行方案。

## [improve-codebase-architecture](https://www.skills.sh/mattpocock/skills/improve-codebase-architecture)
- **它做什么**：扫描代码库中的架构摩擦，寻找把浅模块改造成深模块的机会，目标是改善可测试性与 AI 导航体验。它会生成 HTML 报告，为每个候选展示涉及文件、问题、方案、收益、前后对比图和推荐强度，并给出首选建议。用户选中候选后，再调用 `grilling` 深入讨论约束、依赖、接口形状和测试安排。
- **适合谁用**：准备重构、但还未确定从哪里切入的维护者和技术负责人。需要访问代码库、Git 历史，并能调用 `codebase-design`、`grilling`、`domain-modeling` 及独立上下文子代理。
- **为什么现在值得看**：同时进入 **Trending + Hot**，给定安装量为 **248**。它把架构建议变成可视化候选供用户选择，并优先关注近期反复修改的区域，适合用来筛选有现实收益的重构。
- **如何使用**：请在原页面查看安装方式。启动时可指定模块或痛点；否则先用 `git log --oneline` 查找改动热点，再读取 `GLOSSARY.md` 和相关 `docs/adr/`。报告写入 `<tmpdir>/architecture-review-<timestamp>.html`，随后通过 Linux 的 `xdg-open <path>`、macOS 的 `open <path>` 或 Windows 的 `start <path>` 打开；用户选定候选后才进入追问阶段。
- **注意**：设置了 `disable-model-invocation: true`。临时目录优先取 `$TMPDIR`，回退到 `/tmp`，Windows 使用 `%TEMP%`；报告不写入仓库，但 Tailwind 和 Mermaid 通过 CDN 加载。候选报告阶段不得提前提出接口设计；与既有 ADR 冲突的建议必须明确标注并说明重开讨论的理由。后续讨论可能直接新增或更新 `GLOSSARY.md`；对具有长期意义的拒绝理由，只应先询问用户是否记录为 ADR。

## [grill-me](https://www.skills.sh/mattpocock/skills/grill-me)
- **它做什么**：这是一个极简入口，来源正文只有一条指令：调用 Skill 工具执行 `grilling`。它不定义独立的追问流程，而是复用 `grilling` 的逐轮访谈，帮助用户打磨计划或设计。
- **适合谁用**：希望主动发起方案拷问、偏好显式入口的开发者。前置条件是环境中可调用 `grilling`。
- **为什么现在值得看**：进入 **Trending**，给定安装量为 **7,218**。它与本期同时上榜的 `grilling` 是“入口与底层流程”的关系，不宜把两者当成不同的访谈能力。
- **如何使用**：请在原页面查看安装方式。显式启动 `grill-me` 后，它会调用 Skill 工具中的 `"grilling"`；随后按后者的编号问题逐轮作答。
- **注意**：设置了 `disable-model-invocation: true`，且自身没有补充流程或备用实现。实际追问与执行限制来自被调用的 `grilling`，包括在用户确认共同理解前不得执行方案。

## [codebase-design](https://www.skills.sh/mattpocock/skills/codebase-design)
- **它做什么**：提供一套设计“深模块”的共享词汇与原则：用较小的 interface 承载较多行为，为调用方提供 leverage，让维护者获得 locality。它通过 deletion test、以 interface 作为测试面、检查 seam 是否存在真实变化等方式评估设计。需要比较方案时，可进一步使用并行子代理探索差异明显的接口设计。
- **适合谁用**：正在设计模块接口、调整 seam、改善测试性或减少跨文件理解成本的开发者。也适合作为其他架构 Skill 的共同设计语言。
- **为什么现在值得看**：进入 **Trending**，给定安装量为 **7,089**。它是本期架构扫描 Skill 明确依赖的设计基础，适合先统一评审语言，再讨论具体重构。
- **如何使用**：请在原页面查看安装方式。可通过 Skill 工具调用 `"codebase-design"`，围绕当前模块检查：能否减少方法、简化参数、把更多复杂性藏进实现。深入重构参考 `DEEPENING.md`；探索多种接口方案参考 `DESIGN-IT-TWICE.md`，按 depth、locality 和 seam 位置比较。
- **注意**：必须准确使用 `module`、`interface`、`depth`、`seam`、`adapter`、`leverage`、`locality` 等词汇，不用 component、service、API、boundary 替代。这里的 interface 包括不变量、调用顺序、错误模式、配置和性能特征，并非只指类型签名；depth 也不以实现行数与接口行数的比例衡量。来源强调不要为假想变化引入 seam：“一个 adapter 是假想 seam，两个才是真实 seam”。

## [code-review](https://www.skills.sh/mattpocock/skills/code-review)
- **它做什么**：以用户指定的 Git 固定点为参照，从 **Standards（规范）**和 **Spec（需求）**两条轴审查改动。两条轴由独立上下文的子代理并行执行，最终分别报告规范偏离、需求缺失、范围膨胀和实现偏差。结果保留为两个章节，不合并排序，并分别汇总发现数量与各轴最严重的问题。
- **适合谁用**：审查分支、PR 或一组已提交改动的开发者与评审者。需要有效的 Git 参照点、仓库规范文档，以及可获取的需求来源；未配置 issue tracker 时，应先运行 `/setup-matt-pocock-skills`。
- **为什么现在值得看**：进入 **Trending**，给定安装量为 **7,008**。它明确区分“代码符合规范”和“代码实现了正确需求”，避免一类审查结果掩盖另一类问题。
- **如何使用**：请在原页面查看安装方式。提供 commit、分支、tag 或 `HEAD~5` 等固定点，先以 `git rev-parse <fixed-point>` 验证，再检查 `git diff <fixed-point>...HEAD` 是否非空，并通过 `git log <fixed-point>..HEAD --oneline` 获取提交列表。需求依次从提交中的 issue 引用、用户指定路径、匹配功能的 `docs/`、`specs/`、`.scratch/` 文件中查找；规范来源必须包含存在的 `CODING_STANDARDS.md` 和 `CONTRIBUTING.md`。
- **注意**：三点 diff 比较的是固定点与 `HEAD` 的 merge-base 到 `HEAD`，不能据此声称覆盖未提交改动；无效引用或空 diff 必须提前终止。没有需求时先询问用户，确认不存在后跳过 Spec 子代理并注明。仓库成文规范优先于内置代码异味基线，异味只能作为判断性提示，工具已检查的事项应跳过；两份子代理报告各限 400 词以内，最终不得跨轴合并或重排。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*