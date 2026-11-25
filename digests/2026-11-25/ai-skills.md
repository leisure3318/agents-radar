# AI Skills 新上榜日报 2026-11-25

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-11-25 04:47 UTC

---

# AI Skills 新上榜日报｜2026-11-25

**今日发现**：本期 5 个首次收录条目集中在两类工作流：Remotion 的文档检索与视频组件复用，以及 Caveman 的精简表达、文件压缩与用量查看。值得区分的是：表达更短、文件更小，不等于已经测得 token 或账单节省。

## [remotion-docs](https://www.skills.sh/remotion-dev/skills/remotion-docs)
- **它做什么**：为开发者提供查找、读取当前 Remotion 文档的标准流程。先用 Algolia 搜索概念或 API，再从结果提取文档 URL，追加 `.md` 获取 Markdown，最后依据当前文档实现，而不是依赖记忆中的 API。
- **适合谁用**：正在开发 Remotion 视频、需要核实 API 用法或版本细节的开发者。使用环境需要能够请求 Algolia 搜索接口及 Remotion 文档。
- **为什么现在值得看**：进入 **Trending（24 小时趋势）**，给定安装量为 **9,413**，不是今日新增。它解决的是实现前的资料定位问题，可与其他 Remotion 开发 Skill 配合使用。
- **如何使用**：Skill 安装方式请在原页面查看。核心流程为：
  1. 向 SKILL.md 给出的 Algolia 接口发送 `POST` 请求，使用 `remotion` 索引、目标查询词和 `hitsPerPage=10`。
  2. 选择返回结果中的相关 `url`。
  3. 在文档 URL 后追加 `.md`，例如 `https://www.remotion.dev/docs/use-video-config.md`。
  4. 读取后再实现。
- **注意**：来源标注版本为 `4.0.547`。它用于发现和读取文档，不是通用最佳实践指南；如果当前任务不需要检索文档，来源建议改用 `remotion-best-practices`。

## [remotion-elements](https://www.skills.sh/remotion-dev/skills/remotion-elements)
- **它做什么**：把标题、背景、图表、字幕样式等可复用 React 视频组件复制进 Remotion 项目，之后可以直接编辑源码并与其他组件组合。它还可将 Element 库注册到 Remotion Studio，供用户预览并拖入 composition。安装流程会补齐缺失包、将素材保存到 `public/`，在 composition 组件旁写入 `.element.tsx`，并从第 0 帧插入 Element。
- **适合谁用**：已有 Remotion 项目、想快速复用现成视觉组件的开发者。若项目尚未创建，应先使用 `remotion-create`；如果有多个 composition，需要明确目标 ID。
- **为什么现在值得看**：进入 **Hot（小时爆发）**，给定安装量为 **166**。它不只是组件目录，还明确了“找页面、注册库、预演、安装、适配、预览”的完整落地流程。
- **如何使用**：Skill 安装方式请在原页面查看。先读取 `https://www.remotion.dev/elements/libraries.md` 查找库及 Markdown 索引；确定 Element 后，使用其**页面 URL，而不是 Markdown 文档 URL**。
  ```bash
  npx remotion elements add-library <library-url>
  npx remotion elements use <element-page-url> --composition <composition-id> --dry-run
  npx remotion elements use <element-page-url> --composition <composition-id> --yes
  ```
  已知来源库时先注册库；仅拿到 Element 页面 URL 时可跳过注册。确认 dry run 列出的文件、包和素材后再安装，最后调整文本、颜色、props 和 `<Sequence>`，在 Studio 检查渲染。
- **注意**：`add-library` 需要 Remotion **4.0.547 或更高版本**；旧版本需手动添加 `Config.addElementLibrary({url: '<library-url>'})`。若 `elements use` 或 `--dry-run` 无法识别，来源说明版本低于 **4.0.543**，应升级或询问用户。若缺少配置文件，创建包含 `import {Config} from '@remotion/cli/config';` 的 `remotion.config.ts` 后重试。页面包含多个 Element 时加 `--element <slug>`；找不到 Element 时检查 HTML 中的 `application/vnd.remotion.element+json`，必要时使用其链接指向的 JSON URL 重试。已有文件内容不同时，只有用户同意才加 `--overwrite`。**Element 源码会在项目中执行，只安装用户提供的页面或用户信任的库中的组件**；编辑 markup 前应加载 `remotion-markup`。

## [caveman-stats](https://www.skills.sh/juliusbrussee/caveman/caveman-stats)
- **它做什么**：展示当前会话已记录的输出 token、缓存读取 token、响应次数及可用的模式归属信息，或指引用户查看宿主原生用量报告。在 Claude Code 中，它依赖 hook 提供报告，并要求原样输出，不自行计算或补充数字。
- **适合谁用**：想查看 Caveman 模式使用记录、核对会话用量的用户。Claude Code 的统计依赖配套 hook；Gemini CLI 和其他宿主则需要使用各自的原生统计能力。
- **为什么现在值得看**：进入 **Hot（小时爆发）**，给定安装量为 **62**。它的关键价值在于明确区分“观察到的用量”与“未经对照测量的节省”，避免把输出变短直接解释成节省金额。
- **如何使用**：Skill 安装方式请在原页面查看。Claude Code 中触发：
  ```text
  /caveman-stats
  ```
  `src/hooks/caveman-mode-tracker.js` 会运行 `src/hooks/caveman-stats.js`，通过 `hookSpecificOutput.additionalContext` 提供报告；应将报告原样放进代码块。Gemini CLI 用户应自行运行 `/stats model` 或 `/stats session`。来源还说明：`--all`、`--since 7d` 按每个会话最新记录的输出计数聚合，`--share` 分享观察到的用量，但节省仍未知。
- **注意**：Gemini 自定义命令不能调用内置统计命令，也不能读取实时会话指标；不得把 Claude Code transcript 当作 Gemini 用量。没有原生报告的宿主应说明当前会话用量不可用。没有对照测量时，不得推导节省 token、百分比、金额、规则开销或净收益；原始与当前记忆文件的字节差也不能证明 token 或账单节省。历史 `est_saved_*` 字段会被忽略，但原始记录保留。

## [caveman-compress](https://www.skills.sh/juliusbrussee/caveman/caveman-compress)
- **它做什么**：将 `CLAUDE.md`、待办清单、偏好等自然语言文件压缩为更简练的表达，并以压缩结果覆盖原文件。它保留可读备份，要求代码块、行内代码、命令、路径、URL、技术术语、数值等保持原样，同时保留 Markdown 标题及列表、表格等结构。
- **适合谁用**：希望精简长期加载的记忆文件或自然语言说明文件的开发者。需要明确文件路径、可运行 `python3` 的环境，以及配置好的模型提供方。
- **为什么现在值得看**：进入 **Hot（小时爆发）**，给定安装量为 **62**。相比仅改变回复风格，它直接处理持久化文件，并给出了备份、校验、定向修复和失败后不覆盖原文件的工作流。
- **如何使用**：Skill 安装方式请在原页面查看。使用 `/caveman-compress <filepath>` 触发；从 SKILL.md 所在目录运行：
  ```bash
  python3 -m scripts <absolute_filepath>
  ```
  脚本检测文件类型、调用配置的提供方压缩、验证输出；出错时只做定向修复，最多重试 2 次，仍失败则报告错误并保持原文件不变。备份名为 `<filename>.original.md`，保存在源目录之外：Unix 使用 `$XDG_DATA_HOME/caveman-compress/backups/<parent-dir-name>/`，Windows 使用 `%LOCALAPPDATA%\caveman-compress\backups\<parent-dir-name>\`。
- **注意**：**文件全文会发送到配置的模型提供方**，可涉及 `claude` CLI、Anthropic API、`codex` CLI、`opencode` 或 OpenAI 兼容端点；不要压缩不应让提供方看到的文件。脚本会拒绝名称像秘密文件的路径，并在发送前拒绝检测到凭据的文本，但这不构成任意文件均可安全发送的保证。必须明确提供文件路径；只有粘贴文本时，应先询问路径或提出保存为文件。仅处理 `.md`、`.txt`、`.typ`、`.typst`、`.tex` 和无扩展名自然语言文件，不修改 `.py`、`.js`、`.json`、`.yaml` 等代码或配置文件；混合内容只压缩正文，不确定的部分保持不变，也不压缩 `FILE.original.md`。

## [caveman](https://www.skills.sh/juliusbrussee/caveman/caveman)
- **它做什么**：将助手回复调整为“答案先行、删除套话、保留技术事实”的简洁风格，而不是故意使用破碎语法。它要求代码、命令、路径、数值和错误信息保持原样，默认只展示代码改动及少量上下文。模式持续到用户明确关闭。
- **适合谁用**：主要在终端阅读回复、偏好简短解释和精确操作指令的开发者。它压缩的是表达方式，不改变用户指定的回复语言，也不以牺牲否定词或清晰度换取更短文本。
- **为什么现在值得看**：进入 **Hot（小时爆发）**，给定安装量为 **76**。它将“少说废话”细化为可执行规则，并明确安全警告、不可逆操作和持久化内容等场景不能盲目追求简短；不能据此声称已经测得 token 节省。
- **如何使用**：Skill 安装方式请在原页面查看。使用 `/caveman` 开启，以 `stop caveman` 或 `normal mode` 关闭；`/caveman status` 只查询状态，不会激活或改变模式。`/caveman ultra` 和 `/caveman wenyan` 分别转用 `ultracave`、`megacave` Skill。
- **注意**：状态优先转述 hook 提供的 `Caveman mode: <mode>`；没有 hook 时报告此前实际使用的模式，并标注 `(not tracked by this host)`，不能从默认配置推断。安全警告、不可逆操作确认、容易混淆的步骤及向用户提问时应使用完整清楚的表述。写入聊天之外的代码、注释、提交、文档、工单和记忆文件等内容时，不应沿用压缩话风；`/caveman-compress` 是明确例外。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*