# AI Skills 新上榜日报 2026-11-15

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-11-15 03:02 UTC

---

今日发现（2026-11-15）：本期 5 个 Skill 均为日报首次收录，涵盖 Remotion 视频导出，以及深度学习仓库的只读分析、环境准备、短任务验证和隔离式探索改码。`remotion-render` 进入 24 小时 Trending，其余 4 项进入小时级 Hot；下列安装量均为给定榜单数据，不代表今日新增。

## [remotion-render](https://www.skills.sh/remotion-dev/skills/remotion-render)
- **它做什么**：将 Remotion composition 导出为视频、单张静帧或指定帧的图片序列。支持以行内 JSON 或 JSON 文件传入 input props，并将其浅合并到 composition 的 `defaultProps` 上。
- **适合谁用**：已有 Remotion 项目、需要导出视频或批量抽帧的开发者；也适用于使用 `<HtmlInCanvas>` 的 composition。
- **为什么现在值得看**：进入 **Trending（24 小时趋势）**，安装量为 **7,077**。它的实用价值在于明确了浏览器选择、参数传递、许可和帧文件命名这些容易影响导出流程的细节。
- **如何使用**：请在原页面查看安装方式。核心导出命令为：
  ```bash
  npx remotion render
  npx remotion render [composition-id] out/video.mp4 --props=./props.json
  npx remotion still
  npx remotion render [composition-id] out/frames --frames=0,30,90 --image-format=png
  ```
  也可用 `--props='{"title": "Hello"}'` 传参。需要许可证的公司应在每次渲染时传入可用密钥：
  ```bash
  npx remotion render [composition-id] out/video.mp4 --license-key=$REMOTION_PRIVATE_LICENSE_KEY
  ```
  符合免费许可条件时使用 `free-license`；测试渲染添加 `--is-production=false`。
- **注意**：默认使用 Remotion 自带浏览器，并允许其按需下载或更新；除非用户明确要求，不复用录制浏览器，也不设置 `--browser-executable`、`browserExecutable` 或 `chromeMode`。不要传入空的 `--license-key`。图片序列默认名为 `element-[frame].[ext]`，帧号按最高帧数位数补零，应列出输出目录确认文件名，或用 `--image-sequence-pattern` 指定模式。透明视频需另查来源中的 `transparent-videos.md`。

## [explore-code](https://www.skills.sh/lllllllama/rigorpilot-skills/explore-code)
- **它做什么**：在深度学习研究仓库中实施有边界的候选改动，例如模块移植、backbone 适配、插入 LoRA／adapter 或替换 head。优先采用有来源依据的复制和最小适配，并记录改动意义、回滚方式及其仍属于候选方案的原因。产出位于 `explore_outputs/`，包括 `CHANGESET.md`、`SCIENTIFIC_CHANGELOG.md`、`COMPARABILITY_REPORT.md`、`TOP_RUNS.md` 和 `status.json`。
- **适合谁用**：希望尝试低风险模型迁移或模块组合的研究开发者。前提是研究者已**明确授权探索性改码**，且工作位于独立分支或 worktree。
- **为什么现在值得看**：进入 **Hot（小时爆发）**，安装量为 **239**。值得关注的是它对“候选实现”和“已验证贡献”的区分，以及隔离、回滚和可比性记录要求。
- **如何使用**：请在原页面查看安装方式。先确认授权并隔离工作，再依据来源规划和实施候选改动；SKILL.md 指向 `references/explore-policy.md`、`scripts/plan_code_changes.py` 和 `scripts/write_outputs.py`，但未提供具体调用参数。需要执行验证时，可交给 `minimal-run-and-audit` 或 `run-train`。
- **注意**：不得混入可信基线；不用于可信基线复现、保守调试、常规训练、大规模重构或从零实现新想法。若任务同时涉及 `current_research` 协调与探索运行，应改用 `ai-research-explore`。还需遵循共享的 agent operating principles 和 research rigor principles。

## [analyze-project](https://www.skills.sh/lllllllama/rigorpilot-skills/analyze-project)
- **它做什么**：以只读为主的方式梳理深度学习仓库，定位模型结构、训练／推理入口、配置关系和可能的插入点。可以标记可疑实现模式，但这些只是启发式线索，不能直接认定为 bug。产出为 `analysis_outputs/SUMMARY.md`、`RISKS.md` 和 `status.json`。
- **适合谁用**：准备接手、审阅或修改研究代码，但希望先理解仓库的开发者；尤其适合明确要求不改代码、不跑重任务的场景。
- **为什么现在值得看**：进入 **Hot（小时爆发）**，安装量为 **239**。它将仓库理解与代码修复分开，适合作为后续实验和改动之前的分析环节。
- **如何使用**：请在原页面查看安装方式。围绕模型、入口和配置开展静态检查，并按上述路径整理摘要与风险；可使用轻量静态检查辅助工具。来源要求参考 `references/analysis-policy.md`、共享 operating principles 和 `research-pitfall-checklist.md`，未给出具体启动命令。
- **注意**：不修改仓库代码，不承担最终复现产出；不用于执行失败命令、调试 traceback、环境安装、资产下载或探索性补丁。不得将可疑模式描述为已确认缺陷。

## [minimal-run-and-audit](https://www.skills.sh/lllllllama/rigorpilot-skills/minimal-run-and-audit)
- **它做什么**：围绕已选定的 smoke test、README 文档中的推理或评估命令，采集或规范化执行证据。输出标准化的 `repro_outputs/` 文件，记录科学含义变化及证据状态，并说明与 README、论文或基线的可比性。报告需区分 verified、partial 和 blocked；仓库文件有变化时还要提供 `PATCHES.md`。
- **适合谁用**：已经确定复现目标、运行命令、环境与资产假设，只需要短时非训练验证及审计报告的开发者。也可承接主 Skill 或轻量辅助工具提供的执行证据。
- **为什么现在值得看**：进入 **Hot（小时爆发）**，安装量为 **239**。它聚焦于“命令是否真正验证了目标”，而不只是记录进程是否退出。
- **如何使用**：请在原页面查看安装方式。先提供复现目标、可运行命令、环境与资产假设，以及可选的补丁元数据，再执行或整理证据。来源列出 `scripts/run_command.py`、`scripts/write_outputs.py` 和 `references/reporting-policy.md`，未给出完整调用命令；报告应包含 `SCIENTIFIC_CHANGELOG.md` 与 `COMPARABILITY_REPORT.md`。
- **注意**：不自行选择总目标，不负责训练启动、恢复或长时间训练状态，也不替代初始仓库扫描和环境搭建。不得隐瞒影响评估、预处理、checkpoint、指标或其他科学含义的改动，也不能把高风险代码修改包装为可接受实践。

## [env-and-assets-bootstrap](https://www.skills.sh/lllllllama/rigorpilot-skills/env-and-assets-bootstrap)
- **它做什么**：针对 README 已记录的具体复现目标，准备保守、优先 conda 的环境方案，以及 checkpoint、数据集和缓存目录的路径假设。实际产出包括环境准备说明、候选 conda 命令、资产路径计划、来源线索和未解决的依赖／资产风险。
- **适合谁用**：已完成仓库接入和目标选择，但在运行前仍需创建环境、定位权重或准备数据路径的研究开发者。输入应包含仓库路径、复现目标、README 安装步骤，以及已知操作系统或包约束。
- **为什么现在值得看**：进入 **Hot（小时爆发）**，安装量为 **239**。它将环境与资产准备单独拆出，便于在执行验证前明确路径和依赖方面的未决问题。
- **如何使用**：请在原页面查看安装方式。按具体仓库 README 制定环境与资产计划；来源列出 `scripts/bootstrap_env.py`、`scripts/plan_setup.py`、`scripts/prepare_assets.py`，但没有提供可直接复制的参数示例。策略依据为 `references/env-policy.md` 和 `references/assets-policy.md`。
- **注意**：`scripts/bootstrap_env.sh` 仅作为 Python bootstrapper 的 POSIX 包装入口使用。不负责目标选择、完整编排或最终运行报告；若仓库已有无需转换的即用环境，或请求只是脱离具体复现目标的通用包管理问题，则不适用。论文信息缺口只能转交可选的 paper resolver，而非由本 Skill 自行展开检索。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*