# AI Skills 新上榜日报 2026-11-18

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-11-18 04:42 UTC

---

今日发现：2026-11-18 的新上榜条目分成两条主线：Azure 企业基础设施的分阶段规划与部署，以及围绕 inference.sh `belt` CLI 的图像、数字人和浏览器自动化工作流。以下 5 项均为本日报首次收录；安装量是给定榜单展示值，并非今日新增。

## [azure-enterprise-infra-planner](https://www.skills.sh/microsoft/azure-skills/azure-enterprise-infra-planner)
- **它做什么**：从工作负载描述出发，规划 Azure 网络、身份、RBAC、合规及跨区域容灾拓扑，直接生成 Bicep 或 Terraform，不使用 `azd`。流程分为提取洞察、研究最佳实践、研究资源、生成计划、用户审批、生成并验证 IaC、确认部署七个阶段，产出 `.azure/insights.json`、`.azure/infrastructure-plan.json` 和 `infra/` 下的代码。对于引用现有基础设施的场景，会先盘点并引用既有资源，再以增量方式接入新工作负载。
- **适合谁用**：云架构师、平台工程师，以及需要设计 landing zone、hub-spoke 网络、私有端点或多资源组部署的团队。需具备相应 Azure 环境、Bicep 或 Terraform 工具链；应用中心型工作流则由来源建议优先使用 `azure-prepare`。
- **为什么现在值得看**：进入 Trending（24 小时趋势），展示安装量为 **11,385**。值得关注的是它将“架构方案—审批—IaC 验证—部署确认”串成带关卡的流程，而不只是生成资源模板。
- **如何使用**：给定资料未提供该 Skill 的安装命令，请在原页面查看安装方式。启动时可描述“设计 hub-spoke 网络”或“规划多区域容灾拓扑”；本地验证使用 `az bicep build` 或 `terraform validate`，并运行 `checkov`。部署相关命令包括 `az deployment group create`、`terraform init`、`terraform plan` 和 `terraform apply`，应按审批后的方案选择执行。
- **注意**：第 5 阶段必须获得明确审批；第 6 阶段要求本地验证零错误、`checkov` 无未解决的高危/严重发现，并展示命令输出和完成自检；第 7 阶段还需用户明确确认部署风险。这些是流程要求，不代表生成代码已被实际验证。引用既有资源时不得重建、修改或销毁这些资源，部署仅允许增量执行并提供 what-if 预览；MCP 工具失败时重试一次，仍失败则回退到参考文件并告知用户。

## [ai-image-generation](https://www.skills.sh/beltsh/superpowers/ai-image-generation)
- **它做什么**：通过 inference.sh CLI 调用来源列出的 50 多种图像模型，覆盖文生图、图生图、编辑、局部重绘、LoRA、文字渲染和放大。工作流以选择 App ID、提交 JSON 输入为主，可生成产品图、海报、概念图，也可接入 Topaz 放大或图片拼接步骤。
- **适合谁用**：需要在开发脚本或 Agent 工作流中生成营销素材、产品样机和插画的开发者、设计及内容团队。前置条件是安装 inference.sh CLI（命令名 `belt`）并登录。
- **为什么现在值得看**：进入 Hot（小时爆发），展示安装量为 **240**。其看点是把多个图像服务统一到 `belt app run` 调用方式中，便于在同一工作流里切换生成、编辑和后处理步骤。
- **如何使用**：来源给出的 CLI Skill 安装命令为：
  ```bash
  npx skills add belt-sh/cli
  ```
  安装实际 `belt` CLI 后，登录、查看图像应用并生成图片：
  ```bash
  belt login
  belt app list --category image
  belt app run falai/flux-dev-lora --input '{"prompt":"a cat astronaut in space"}'
  ```
  编辑示例使用 `openai/gpt-image-2`，输入包含 `prompt` 和 `images`；放大示例使用 `falai/topaz-image-upscaler`，输入字段为 `image_url`。
- **注意**：依赖 inference.sh CLI；`npx skills add belt-sh/cli` 是安装 CLI Skill 的命令，不应与 CLI 二进制安装混为一谈。不同模型的输入字段和能力不同，不能假定所有模型都支持相同参数；来源列出的模型价格与效果描述也不等于本次实测结果。

## [ai-avatar-video](https://www.skills.sh/beltsh/superpowers/ai-avatar-video)
- **它做什么**：把人物肖像与文稿或音频组合成数字人、口型同步和虚拟讲解视频。推荐路径是用 `pruna/p-video-avatar` 的内置 TTS，直接从图片和台词生成视频；也可先生成语音，再交给 OmniHuman 或 PixVerse。来源还提供“转录原视频—翻译—生成新语言语音—LatentSync 对口型”的配音流程，其中翻译需手工或由 LLM 完成。
- **适合谁用**：制作产品讲解、培训视频、UGC 风格广告、多语言配音或 NPC 对话的开发者和内容团队。需要 `belt` CLI、登录账号，以及肖像图片和台词或音频；没有肖像时可先用 `pruna/p-image` 生成。
- **为什么现在值得看**：进入 Hot（小时爆发），展示安装量为 **240**。值得看的是它明确区分内置 TTS 的一步生成路径与外置语音的多步路径，方便按多人物驱动、声音表现或已有视频配音需求选型。
- **如何使用**：先安装来源指定的 CLI Skill，并准备实际 CLI：
  ```bash
  npx skills add belt-sh/cli
  belt login
  belt app run pruna/p-video-avatar --input '{
    "image":"https://portrait.jpg",
    "voice_script":"欢迎观看我们的产品演示。",
    "voice":"Zephyr (Female)",
    "resolution":"1080p"
  }'
  ```
  若用无内置 TTS 的模型，可先调用 `inworld/text-to-speech-2`，再把输出音频 URL 传给 `bytedance/omnihuman-1-5` 的 `audio_url`。
- **注意**：来源称 P-Video-Avatar 支持 30 种声音、10 种语言及 1080p，输出宽高比跟随输入图片；竖屏视频可先准备 `9:16` 肖像。建议使用正面、光线良好的高质量照片和低噪声清晰音频。OmniHuman、PixVerse 需要另备音频；来源中的速度、价格及“更快更便宜”属于其给出的对比数据，并非本次验证。

## [agent-browser](https://www.skills.sh/beltsh/superpowers/agent-browser)
- **它做什么**：通过 inference.sh 调用基于 Playwright 的浏览器自动化，以 `@e` 元素引用完成点击、表单填写、拖拽和上传。还支持页面截图、JavaScript 执行、代理和会话录像，可用于数据提取、网页测试及操作演示。核心流程是打开页面、读取元素引用、交互、重新获取快照，最后关闭会话。
- **适合谁用**：需要为 Agent 接入网页操作、编写表单自动化或留存测试截图与录像的开发者。需安装并登录 `belt` CLI；来源的 Shell 示例还使用 `jq` 提取 `session_id`。
- **为什么现在值得看**：进入 Hot（小时爆发），展示安装量为 **44**。其具体价值在于把浏览器操作组织成带状态的会话，并明确规定元素引用的刷新时机，便于构建可重复的网页操作流程。
- **如何使用**：安装 CLI Skill，并在实际 CLI 就绪后运行：
  ```bash
  npx skills add belt-sh/cli
  belt login
  SESSION=$(belt app run agent-browser --function open --session new \
    --input '{"url":"https://example.com"}' | jq -r '.session_id')

  belt app run agent-browser --function snapshot \
    --session "$SESSION" --input '{}'

  belt app run agent-browser --function close \
    --session "$SESSION" --input '{}'
  ```
  交互使用 `--function interact`，例如 `{"action":"click","ref":"@e3"}`，其中引用必须来自当前页面快照；录像需在 `open` 时设置 `"record_video":true`。
- **注意**：导航后旧引用会失效；点击引发跳转、提交表单或动态内容加载后都应重新 `snapshot`。首次调用必须使用 `--session new`，后续复用返回的 `session_id`，结束时调用 `close`；启用录像后，关闭会话才返回视频。

## [agent-tools](https://www.skills.sh/beltsh/superpowers/agent-tools)
- **它做什么**：提供 inference.sh 云端应用的通用 CLI 入口，覆盖图像、视频、LLM、搜索、3D 和 Twitter/X 操作。典型流程是发现应用、查看详情、生成样例输入、运行任务，再查询状态；输入本地文件路径时，CLI 会自动上传文件。相比专项 Skill，它更像跨应用工作流的基础工具箱。
- **适合谁用**：希望用统一脚本调用多类 AI 服务的开发者和 Agent 构建者。运行依赖 `belt` CLI 和登录账号，模型在云端运行，来源明确称不需要本地 GPU。
- **为什么现在值得看**：进入 Hot（小时爆发），展示安装量为 **20**。虽然展示安装量较低，但它提供了应用发现、输入样例及异步任务查询等基础操作，适合先探索平台再选择专项 Skill。
- **如何使用**：保留来源给出的 CLI Skill 与 CLI 安装、登录命令：
  ```bash
  npx skills add belt-sh/cli
  curl -fsSL https://cli.inference.sh | sh
  belt login
  ```
  发现应用并准备可检查的输入：
  ```bash
  belt app search "flux"
  belt app get google/veo-3-1-fast
  belt app sample google/veo-3-1-fast --save input.json
  belt app run google/veo-3-1-fast --input input.json --no-wait
  belt task get <task-id>
  ```
- **注意**：本地文件路径会触发上传，需先确认输入文件。来源说明安装器会按系统与架构下载二进制并验证 SHA-256；若已安装 `cosign`，还会自动验证 Sigstore 签名，也提供手动下载安装方式。上述是安装流程说明，不构成独立安全审计结论；各 App 的输入应分别查看详情或样例。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*