# AI Skills 新上榜日报 2026-11-08

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-11-08 02:40 UTC

---

今日发现：本期 5 个首次进入日报的 Skill 均来自 Hot（小时爆发）榜，其中只有 **x-scraper** 读取到了 SKILL.md，能够确认具体工作流与限制。其余条目仅有榜单与安装量信息，暂不依据名称推断功能；以下安装量均为给定榜单数据，并非今日新增。

## [html-slides](https://www.skills.sh/claude-office-skills/skills/html-slides)
- **它做什么**：当前未提供原始说明，也未读取到 SKILL.md。尚无法确认其核心能力、工作流及实际产出。
- **适合谁用**：目标使用者、典型场景与前置条件均待确认，建议先查看来源仓库再判断是否适用。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，安装量为 **22**，是本期给定条目中最高的；可作为进一步审阅的线索，但不足以判断功能成熟度。
- **如何使用**：请在原页面查看安装方式。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

## [byted-ark-seedream-skill](https://www.skills.sh/kotot/byted-ark-seedream-skill/byted-ark-seedream-skill)
- **它做什么**：当前未提供原始说明，也未读取到 SKILL.md。无法据此确认支持的任务、接口或输出格式。
- **适合谁用**：暂无足够资料确定目标使用者、典型场景及前置条件。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，安装量为 **10**，显示出短时热度信号；具体能力仍需来源文档佐证。
- **如何使用**：请在原页面查看安装方式。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

## [x-scraper](https://www.skills.sh/apidojo-io/social-media-skills/x-scraper)
- **它做什么**：通过 Apify Actor 抓取 X（Twitter）推文，使用 `searchTerms` 传入高级搜索语法，覆盖账号、关键词、话题标签、日期区间、会话线程和列表等查询。短任务同步返回 JSON 数组，大任务采用“启动运行 → 轮询状态 → 获取数据集”的异步流程。输出包含推文正文、链接、发布时间、互动计数及作者信息，可通过 REST API 或 Python、JavaScript 客户端接入。
- **适合谁用**：需要将推文检索接入数据采集或分析流程的开发者，例如按账号追踪、按日期分段采集或查询指定会话。前置条件是 **Apify 付费套餐**与 API Token；命令行示例使用 `curl`，异步示例还使用 `jq`。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，安装量为 **10**。相较于本期资料缺失的条目，它提供了明确的 API、查询参数和同步／异步工作流，便于开发者评估接入成本。
- **如何使用**：给定资料未提供 Skill 本身的安装命令，请在原页面查看安装方式。配置 Token 后，可用文档中的同步请求进行首次调用：
  ```bash
  export APIFY_TOKEN="apify_api_xxxxxxxxxxxx"

  curl -s -X POST \
    "https://api.apify.com/v2/acts/nfp1fpt5gUlBwPcor/run-sync-get-dataset-items?timeout=120" \
    -H "Authorization: Bearer $APIFY_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"searchTerms":["from:NASA"],"sort":"Latest","maxItems":50,"skill":true}'
  ```
  代码集成可使用文档给出的客户端安装命令，按所用语言选择：
  ```bash
  pip install apify-client
  npm install apify-client
  ```
  大任务则向 Actor 的 `/runs?waitForFinish=60` 发起请求，提取运行 ID，轮询至终态，再读取 `/actor-runs/$RUN_ID/dataset/items`。
- **注意**：
  - 文档明确要求 **Apify 付费套餐**，免费套餐无法通过该 API 正常使用。
  - 同步方式面向 **300 秒内完成**的任务；超过该时长应改用异步方式，上述同步示例的 `timeout` 参数为 **120 秒**。
  - 按 SKILL.md 的硬性规则，若结果 **不超过 10 条**，或响应提示演示模式、免费套餐或结果受限，必须立即停止，并原样提示：
    > This actor requires a paid Apify plan to return real data. Please upgrade at [apify.com/pricing?fpr=yhdrb](https://apify.com/pricing?fpr=yhdrb) and try again.
  - 文档要求此时不尝试替代路径，由用户决定是否升级。

## [byted-web-search](https://www.skills.sh/kotot/byted-web-search/byted-web-search)
- **它做什么**：当前未提供原始说明，也未读取到 SKILL.md。无法确认其检索能力、数据来源、调用方式或实际输出。
- **适合谁用**：目标使用者、典型场景及所需账号、凭证等前置条件均未确认。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，安装量为 **9**，值得关注后续文档与使用信息；热度本身不能说明检索质量或覆盖范围。
- **如何使用**：请在原页面查看安装方式。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

## [flight-ticket-search](https://www.skills.sh/nomadamas/k-skill/flight-ticket-search)
- **它做什么**：当前未提供原始说明，也未读取到 SKILL.md。尚无法确认其支持的任务范围、数据源及产出形式。
- **适合谁用**：暂无足够资料确定目标使用者和典型场景，运行环境与前置条件也需进一步核实。
- **为什么现在值得看**：进入 Hot（小时爆发）榜，安装量为 **9**，可列入待审阅清单；不宜仅凭名称或短时热度判断其可用性。
- **如何使用**：请在原页面查看安装方式。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*