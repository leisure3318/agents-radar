# AI Skills 新上榜日报 2026-10-27

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-10-27 02:24 UTC

---

今日发现：2026-10-27 的 5 个新上榜 Skill 均来自 `lllllllama/rigorpilot-skills`，进入 Hot（小时爆发）榜，覆盖深度学习仓库的接入规划、可信复现、候选探索、训练执行和故障诊断。共同特点是明确划分工作边界，并要求保存命令、日志和科研可比性证据，而不把“命令跑通”直接当作复现成功。

## [ai-research-reproduction](https://www.skills.sh/lllllllama/rigorpilot-skills/ai-research-reproduction)
- **它做什么**：以 README 为首要依据，选择最小可信复现目标，优先级依次为已记录的推理、评估、训练启动或部分验证，完整训练则需用户明确确认。流程覆盖接入、必要准备、受审阅的执行和结果验证，将摘要、命令、日志、科学变更及可比性报告等写入 `repro_outputs/`。只有存在明确的预期指标与容差时，才可判定 `result-match`。
- **适合谁用**：需要端到端复现深度学习仓库、但希望控制计算规模并保留审计证据的开发者或研究者；前置条件是有目标仓库及可供理解复现意图的 README。
- **为什么现在值得看**：当前进入 Hot（小时爆发）榜，安装量为 **250**，值得关注其“先规划、再执行、后验证”的复现路径；该数字是所给安装量，并非今日新增。
- **如何使用**：请在原页面查看安装方式。先读 README 和理解目标命令所需的测试、配置或源码，再依次使用：
  ```bash
  scripts/orchestrate_repro.py --repo <repo> --plan-only --agent-output
  scripts/orchestrate_repro.py --repo <repo> --run-selected --command-id <cmd-XX> --plan-fingerprint <fingerprint> --agent-output
  scripts/orchestrate_repro.py --repo <repo> --verify-output --agent-output
  ```
  执行前审阅候选命令、副作用约定、选择指纹及返回的 `reviewed_run_args`；首次环境或安装诊断使用 `scripts/doctor.py`。未指定输出目录时，证据写入 `<repo>/repro_outputs`。
- **注意**：编排脚本要求 **Python 3.11+ 和 Git**；目标仓库还可能需要额外审阅的依赖、网络或加速器。数据集、划分、检查点、预处理、指标、损失或模型语义等变更前必须暂停确认；优先不改仓库，确需修改时使用 `repro/YYYY-MM-DD-short-task` 分支并记录补丁。`--timeout` 限制的是目标命令，不要用相同或更短的外部超时包住整个编排器，以免妨碍子进程终止和证据落盘。

## [ai-research-explore](https://www.skills.sh/lllllllama/rigorpilot-skills/ai-research-explore)
- **它做什么**：在已有 `current_research` 锚点上开展明确授权的候选研究探索，而不是从零寻找研究方向。外层先冻结任务、数据集、评估和预算并筛选想法，内层每次只做有界候选修改或实验，以真实指标、产物和复现记录进行比较。相关产物按需写入 `analysis_outputs/`、`sources/` 和 `explore_outputs/`，并记录科学含义及比较边界。
- **适合谁用**：已经确定任务家族、数据集、基准、评估方法和 SOTA 参考，希望围绕现有研究状态尝试变体的研究者。必须同时具备明确探索授权，以及分支、提交、检查点、运行记录或已训练本地模型等持久锚点。
- **为什么现在值得看**：当前进入 Hot（小时爆发）榜，安装量为 **250**。它与可信复现入口明确分工，适合关注“候选实验如何保持公平比较和可追溯性”的团队。
- **如何使用**：请在原页面查看安装方式。确认授权与 `current_research` 后，提交 `variant_spec` 或更推荐的 `research_campaign`；后者核心字段包括任务、数据集、基准、评估来源、SOTA 参考和计算预算。来源列出的编排与产物脚本为 `scripts/orchestrate_explore.py`、`scripts/write_outputs.py`，未提供具体命令参数；代码适配交给 `explore-code`，短周期试验或扫参交给 `explore-run`。
- **注意**：活动期间应固定 `evaluation_source` 和 `sota_reference`；来源查询须有界、优先缓存，不是开放式文献搜索。缺少锚点或评估、预算耗尽、科学含义不清或遇到人工检查点时应停止。新颖性和重要性在文献对照、消融与公平比较前仍是假设，不承诺自主发现、新颖性证明或可信复现成功。

## [run-train](https://www.skills.sh/lllllllama/rigorpilot-skills/run-train)
- **它做什么**：保守执行已经选定的训练命令，支持启动验证、短程验证、完整训练启动和恢复训练。将可获得的配置、随机种子、日志、检查点、指标及运行假设纳入证据，并清楚区分部分完成、受阻、已恢复和已启动等状态。标准产物写入 `train_outputs/`，包括摘要、命令、日志、科学变更、可比性报告和 `status.json`。
- **适合谁用**：已经完成目标选择、具备可运行训练命令，并明确环境和资源假设的研究者或工程师；尤其适合先验证训练能否启动，再决定后续运行的场景。
- **为什么现在值得看**：当前进入 Hot（小时爆发）榜，安装量为 **249**。它把训练执行与选题、环境准备、探索性改代码分开，值得需要规范训练交接和状态汇报的团队关注。
- **如何使用**：请在原页面查看安装方式。提供训练目标、可运行命令、环境与资产假设，以及启动验证、短程验证、完整启动或恢复模式；按 `references/training-policy.md` 执行。来源列出 `scripts/run_training.py` 和 `scripts/write_outputs.py`，但未给出具体调用参数；运行后检查 `train_outputs/` 中的状态与证据。
- **注意**：它不负责环境安装或资产下载，不适用于仅推理、仅评估、探索性扫参或自主实现研究想法，也不承担端到端编排。配置、种子和检查点等上下文是在可获得时记录，不能据此假定每次运行都具备完整信息。

## [safe-debug](https://www.skills.sh/lllllllama/rigorpilot-skills/safe-debug)
- **它做什么**：面向 traceback、终端报错、CUDA OOM、检查点加载失败、形状不匹配、NaN loss 等具体故障，先诊断并缩小根因，再提出最小修复方案。默认不修改仓库代码，将诊断、补丁计划和状态分别写入 `debug_outputs/DIAGNOSIS.md`、`PATCH_PLAN.md` 与 `status.json`。
- **适合谁用**：遇到具体训练或推理失败，希望先弄清原因、再审批修改的开发者和研究者。需要提供报错、调用栈或可描述的失败症状，而不是仅要求泛泛浏览仓库。
- **为什么现在值得看**：当前进入 Hot（小时爆发）榜，安装量为 **249**。其值得关注的重点是把“诊断”“批准修改”和“科研贡献”分开，而不是仅凭名称认定它能保证修复安全。
- **如何使用**：请在原页面查看安装方式。提交错误与相关上下文，先获得诊断和最小补丁计划，再明确批准是否修改；来源要求参考 `references/debug-policy.md`、共享科研严谨性原则和研究陷阱检查清单，未提供启动或验证命令。
- **注意**：任何必要补丁都应先获得明确批准；中高风险变更前应先安排保存点或分支。不用于大规模重构、推测性适配或自动探索性打补丁；调试修复不自动构成研究贡献，若改变实验含义或可比性，必须明确说明。

## [repo-intake-and-plan](https://www.skills.sh/lllllllama/rigorpilot-skills/repo-intake-and-plan)
- **它做什么**：在 README-first 复现开始时扫描仓库结构、README 和常见项目文件，提取文档中的命令并分类为推理、评估、训练或其他候选。输出简洁的结构概览、命令清单、最小可信复现建议，以及重要歧义和风险，供主编排器选择后续路径。
- **适合谁用**：希望“先看仓库、暂不运行”的开发者，或需要快速接入规划的复现编排器。输入是目标仓库路径及可访问的 README、常见项目文件，也可附带“推理优先”等偏好。
- **为什么现在值得看**：当前进入 Hot（小时爆发）榜，安装量为 **249**。它将仓库接入限定为扫描和计划，适合在投入环境配置或计算资源前，先核对项目实际记录了哪些可复现入口。
- **如何使用**：请在原页面查看安装方式。提供仓库路径与目标偏好，按 `references/repo-scan-rules.md` 和 `scripts/` 下的辅助脚本完成扫描；来源未给出具体启动命令。重点审阅返回的命令分类、最小目标建议及歧义清单。
- **注意**：这是通常由主编排器调用的辅助 Skill，不安装环境、不准备大型资产、不执行实质性复现命令，也不决定高风险补丁。不负责最终报告、论文查询或端到端编排；若已有选定命令、只需准备或执行，应使用对应阶段的工具。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*