# AI Skills 新上榜日报 2026-11-22

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-11-22 01:55 UTC

---

今日发现：2026-11-22 的新上榜条目集中在两条工作流：Remotion 的“建项目—编写视频—实时预览”，以及 Link 的“只读财务查询—购买凭据审批”。前三项进入 Trending（24 小时趋势），后两项进入 Hot（小时爆发）；下列安装量均为所给榜单数据，并非今日新增。

## [remotion-create](https://www.skills.sh/remotion-dev/skills/remotion-create)
- **它做什么**：指导创建新的 Remotion 项目和视频 composition，覆盖目录检查、脚手架初始化、预览启动及 React 内容编写。它要求先打开 Studio，再开始修改视频，并根据剪辑时间线、多场景、交互编辑等需求衔接对应规范。
- **适合谁用**：从零制作 Remotion 视频的开发者，或需要给现有项目新增视频内容的 AI 编程助手。前置环境是 Node.js 和 Git；若已有项目，应跳过脚手架创建。
- **为什么现在值得看**：进入 Trending，安装量为 **7,084**。值得关注的是它把创建顺序和目录处理写得很具体，适合作为视频生成任务的启动流程。
- **如何使用**：给定资料未提供 Skill 安装命令，请在原页面查看安装方式。创建项目时，先检查当前目录及隐藏文件：
  ```bash
  # 空目录中创建
  npx create-video@latest --yes --blank --no-tailwind .

  # 非空目录中创建新子目录
  npx create-video@latest --yes --blank --no-tailwind my-video
  cd my-video
  ```
  脚手架会安装依赖；若依赖安装报错，在项目中运行 `npm i`。项目可运行后立即按 `remotion-studio` 指引打开预览，并保持运行。
- **注意**：只能清理 `.DS_Store` 等可丢弃的系统元数据，不能把 `.env`、`.git` 等隐藏内容视为垃圾。默认命令不启用 Tailwind；需要时另读 `tailwind.md`。编写 composition 注册、独立剪辑节点及多场景结构前，应先读对应规范；创建完成后的后续任务转用 `remotion-best-practices`。

## [remotion-markup](https://www.skills.sh/remotion-dev/skills/remotion-markup)
- **它做什么**：提供 Remotion React 内容、动画、媒体和效果的编写规范，重点兼顾逐帧渲染与 Studio 可编辑性。它要求使用 `useCurrentFrame()` 和 `interpolate()` 驱动动画，并按需要引导到时间线、音频、字幕、地图、抠像、转场及特效文档。
- **适合谁用**：已经有 Remotion 项目、正在编写或重构视频组件的 React 开发者。尤其适合需要在 Studio 中继续调整时间、样式和关键帧的项目。
- **为什么现在值得看**：进入 Trending，安装量为 **7,045**。它不仅列出视觉能力，还明确给出组件拆分、帧率换算和可编辑代码结构的约束，适合审查 AI 生成的视频代码。
- **如何使用**：给定资料未提供 Skill 安装命令，请在原页面查看安装方式。核心实现路径是：
  - 将 `useCurrentFrame()` 放在真正需要帧信息的最小组件中；秒转帧使用 `useVideoConfig()` 获取的 `fps`。
  - 把 `interpolate()` 保持在 JSX 的 `style` 属性内，优先用 `scale`、`translate`、`rotate`，缩放动画使用 `output: 'perceptual-scale'`。
  - 资源放入根目录 `public/`，通过 `staticFile()` 引用；音视频使用 `@remotion/media` 的 `<Audio>`、`<Video>`，图片使用 `<CanvasImage>`。
  - 添加效果前先读 `effects.md`，确认导入、参数和环境设置。
- **注意**：CSS `transition`、CSS `animation` 和 Tailwind 动画类不能正确渲染，应改写为帧驱动动画。普通 HTML、`<Interactive.*>`、`<AbsoluteFill>` 和 `<Sequence>` 不直接接受 `effects`；需要对其内容加效果时，使用 `<HtmlInCanvas>` 包裹。不要覆盖用户在对话之外做出的意外代码变更；非 Chrome 环境的动态图像使用需参考 `@remotion/gif`。给定原文尾部有截断，参数化视频部分未完整展示。

## [remotion-studio](https://www.skills.sh/remotion-dev/skills/remotion-studio)
- **它做什么**：指导启动 Remotion Studio，让用户在视频创建或编辑期间实时预览并反馈。还规定了浏览器打开方式、已有实例处理和预览加载验证步骤。
- **适合谁用**：运行 Remotion 项目的开发者，以及有内置浏览器的 AI 编程客户端。项目应先达到可运行状态。
- **为什么现在值得看**：进入 Trending，安装量为 **7,045**。它补齐了视频生成流程中的预览与验证环节，而不只是让助手修改源码。
- **如何使用**：给定资料未提供 Skill 安装命令，请在原页面查看安装方式。启动命令为：
  ```bash
  npx remotion studio
  ```
  若明确要用客户端内置浏览器：
  ```bash
  npx remotion studio --no-open
  ```
  使用 `--no-open` 后，必须打开命令打印的准确 URL，验证 Studio 加载；有 composition 后，还要验证视频预览加载。可用 `--port=<number>` 指定端口、`--log=<level>` 设置日志、`--force-new` 强制启动另一实例。
- **注意**：Cursor 中应使用不带 `--no-open` 的命令，让浏览器自动打开。无法在内置浏览器中打开 URL 时，不要使用 `--no-open`。若 Studio 已打开，命令会打印 URL 后退出；否则会启动长时间运行的进程。

## [financial-insights](https://www.skills.sh/stripe/link-cli/financial-insights)
- **它做什么**：只读查询用户的 Link 交易、余额、已连接账户和预计算洞察，回答支出、收入、可用资金及购物历史模式等问题。输出应是带时间范围、来源和限制说明的摘要，而不是原始记录堆积；不负责付款或修改账户来源。
- **适合谁用**：接入 Link 扩展的财务助手或消费分析应用开发者。应用需配置钱包和授权提供方，相关原生工具也必须已挂载并具备所需权限。
- **为什么现在值得看**：进入 Hot，安装量为 **25**。它的价值在于细化了金融数据解释规则，包括币种精度、收支符号、完整分页和权限缺失处理，而非仅提供查询入口。
- **如何使用**：给定资料未提供 Skill 安装命令，请在原页面查看安装方式。使用实际发现的挂载前缀调用原生工具，例如 `link__list_transactions`，参数以工具 schema 为准：
  - 交易与消费用 `list_transactions`；余额用 `list_balances`；账户与能力用 `list_sources`。
  - 洞察先用 `list_available_insight_types` 确认类型和权限，再用 `list_insights` 请求所需 ID。
  - 计算完整月份总额时必须完整分页；后续页保持原过滤条件，只改变游标。
- **注意**：金额按 ISO 4217 的最小货币单位解释，不能一律除以 100，跨币种不可直接求和。`current` 不等于可用资金，信用额度已使用金额也不是可用现金；应关注 `as_of`。授权拒绝或缺权限时解释并停止，不在聊天中索要 token，也不反复重试。洞察的 `pending`、缺权限或失败不能写成“零活动”；数据仅覆盖已授权来源，不能把观察到的历史模式当成用户声明的偏好。

## [create-payment-credential](https://www.skills.sh/stripe/link-cli/create-payment-credential)
- **它做什么**：创建和管理 Link 支出请求，在获批后获取卡凭据、Shared Payment Token（SPT）或绑定商户的 Link Pay Token（LPT），用于一次性或周期性购买。工作流涵盖钱包核验、购买信息确认、支付方式与配送选择、用户审批和按需领取凭据；领取凭据不代表结账成功。
- **适合谁用**：构建购物代理、订阅购买或程序化支付流程的开发者。需要应用配置的 Link 钱包、已挂载的原生工具，以及确认后的商户、含税运最终金额和商品信息。
- **为什么现在值得看**：进入 Hot，安装量为 **25**。它覆盖了购买代理中容易混淆的边界：草稿不等于授权、审批不等于支付成功、撤销凭据不等于取消商户订阅。
- **如何使用**：给定资料未提供 Skill 安装命令，请在原页面查看安装方式。通过实际挂载前缀调用工具，传结构化参数而非命令字符串：
  1. 必要时调用 `retrieve_user_info`，确认用户、限额和验证要求。
  2. 补齐购买信息；`context` 至少 **100 个字符**，描述实际购买内容。
  3. 调用 `create_spend_request`，默认保留 `request_approval: true`，展示返回的 `approval_url`。
  4. 用同一 ID 调用 `retrieve_spend_request` 检查状态；获批且需要使用时，按类型指定 `include: ["card"]`、`["shared_payment_token"]` 或 `["link_pay_token"]`。
  5. 周期性请求通过 `recurring` 指定日、周、月或年及可选间隔倍数，`amount` 表示每期支出上限。
- **注意**：不得编造 `network_id` 或 `merchant_account_id`；LPT 不支持测试模式。金额使用结账币种的最小单位，不自行换汇。延长请求有效期不会延长 **30 分钟审批窗口**，使用前仍须检查状态和凭据 `valid_until`；一次性 SPT 是单次使用。授权失败或拒绝应停止，不在聊天中索要 token，也不在回复或报告中展示支付凭据。周期性请求的撤销不取消商户订阅，仍需走商户取消流程。给定 SKILL.md 在最后一节被截断，接入前应审阅完整来源。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*