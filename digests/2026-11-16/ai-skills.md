# AI Skills 新上榜日报 2026-11-16

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-11-16 03:03 UTC

---

今日发现：2026-11-16 的新上榜条目中，`remotion-captions` 给出了明确的字幕数据规范与工作流，适合正在用 Remotion 制作视频的开发者。另有 4 个飞书相关 Skill 进入 Hot 小时爆发榜，但均未读取到说明文件，目前只能确认榜单信号，不能据名称推断具体能力。

## [remotion-captions](https://www.skills.sh/remotion-dev/skills/remotion-captions)
- **它做什么**：用于字幕转写、展示和动画处理，要求所有字幕以 JSON 形式处理，并采用 `@remotion/captions` 的 `Caption` 类型。该类型包含文本、起止毫秒时间、时间戳、置信度和可选的分页标记。来源文件分别提供了音视频转写、视频内字幕展示，以及从 `.srt` 文件导入字幕的后续指引。
- **适合谁用**：使用 Remotion 制作视频、需要生成或导入字幕并在视频中呈现的开发者。前置条件是按指定的 `Caption` 数据结构处理字幕，并根据任务读取对应的工作流文件。
- **为什么现在值得看**：进入 Trending（24 小时趋势）榜，给定安装量为 **7,927**，可作为近期关注度信号；该数字并非今日新增安装量。
- **如何使用**：给定资料未提供安装命令，请在原页面查看安装方式。转写音视频时读取 `transcribe-captions.md`；展示字幕时读取 `display-captions.md`；导入 SRT 时读取 `import-srt-captions.md`。类型引用为 `import type { Caption } from "@remotion/captions";`。完成后加载 `remotion-best-practices` Skill；除非另有指示，若尚未打开 Remotion Studio，应将其打开。资料未给出具体启动或验证命令。
- **注意**：SKILL.md 标注版本为 `4.0.543`，明确要求字幕使用 JSON 和指定的 `Caption` 类型；其中 `timestampMs`、`confidence` 可为 `null`，`pageBreakAfter` 为可选字段。当前材料未包含上述三个工作流文件的正文，因此无法确认转写引擎、额外依赖或执行命令。

## [lark-shared](https://www.skills.sh/site/open.feishu.cn/lark-shared)
- **它做什么**：给定资料仅提供名称、来源与榜单信息，未提供功能说明，也未读取到 SKILL.md。无法确认其核心能力、工作流或实际产出。
- **适合谁用**：关注飞书相关 Skill 的开发者可将其作为待审阅条目；具体适用场景和前置条件需查看来源后确认。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，给定安装量为 **329**。这是小时级热度信号，不代表今日新增 329 次安装。
- **如何使用**：请在原页面查看安装方式。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

## [lark-wiki](https://www.skills.sh/site/open.feishu.cn/lark-wiki)
- **它做什么**：给定资料没有原始说明，且未读取到 SKILL.md。无法仅凭名称确认其支持哪些操作、采用何种工作流或会产出什么结果。
- **适合谁用**：关注飞书相关 Skill 的开发者可先审阅来源；是否适合具体业务场景，以及需要哪些前置条件，目前无法判断。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，给定安装量为 **325**，值得作为近期热度条目关注；该数字不是今日新增安装量。
- **如何使用**：请在原页面查看安装方式。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

## [lark-doc](https://www.skills.sh/site/open.feishu.cn/lark-doc)
- **它做什么**：给定资料仅能确认此 Skill 来自 `open.feishu.cn`，没有可用的功能说明或 SKILL.md。其具体能力、输入输出和操作流程均待核实。
- **适合谁用**：关注飞书相关 Skill 的开发者可进一步查看；当前资料不足以确定目标使用者、典型场景或前置条件。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，给定安装量为 **326**，体现了小时级榜单热度；不能据此认定为今日新增安装。
- **如何使用**：请在原页面查看安装方式。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

## [lark-base](https://www.skills.sh/site/open.feishu.cn/lark-base)
- **它做什么**：给定资料未提供原始说明，也未读取到 SKILL.md。暂时无法确认其核心功能、工作流和实际产出，不宜按名称推断支持的操作。
- **适合谁用**：关注飞书相关 Skill 的开发者可将其纳入审阅清单；实际适用场景、依赖与前置条件需要进一步确认。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，给定安装量为 **325**，是值得留意的短时热度信号；安装量并非今日新增数据。
- **如何使用**：请在原页面查看安装方式。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*