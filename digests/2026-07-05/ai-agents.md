# OpenClaw 生态日报 2026-07-05

> Issues: 10 | PRs: 30 | 覆盖项目: 13 个 | 生成时间: 2026-07-05 03:37 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [NullClaw](https://github.com/nullclaw/nullclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyagi)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报（2026-07-05）

## 1) 今日速览
OpenClaw 今天处于**高活跃、明显偏修复与打磨**的节奏：过去 24 小时里 Issues 更新 10 条、PR 更新 30 条，且没有新版本发布，说明团队主要在通过持续合并修复和体验优化推进主线，而不是做一次集中发版。  
今日共有 **17 个 PR 已合并/关闭**、**3 个 Issue 已关闭**，整体交付效率不错，项目在 **移动端、Codex/Agents、插件安装、文档、Control UI** 等方向都有推进。  
与此同时，今天新报的若干问题带有 **P1/P2、message-loss、session-state、security** 等标签，表明项目当前的主要健康度特征是：**功能迭代很快，但稳定性与边界条件修复仍然是主战场**。  
总体看，项目健康度为**活跃且稳步前进**，但仍需持续关注会话丢失、消息中断、插件安装和渠道兼容性风险。

---

## 2) 版本发布
**今日无新版本发布。**

---

## 3) 项目进展
今天的 PR 进展以“修复真实用户痛点、降低交互摩擦、收敛稳定性风险”为主，以下几项最能代表项目向前推进的方向：

- **文档体系重写，降低“文档与代码不一致”风险**  
  PR [#100142](https://github.com/openclaw/openclaw/pull/100142) 合并/推进了“基于当前源码重写已发布文档”的工作，直接回应了 Issue [#100141](https://github.com/openclaw/openclaw/issues/100141)。  
  这对外部用户和维护者都很关键：减少过时配置、虚构 flags、错误行为描述带来的认知成本。

- **移动端操作能力增强：终端与配对入口更可见**  
  PR [#100157](https://github.com/openclaw/openclaw/pull/100157) 对应 Issue [#100154](https://github.com/openclaw/openclaw/issues/100154)，把移动配对入口前置到更容易发现的位置。  
  这意味着项目从“有功能”向“可发现、可用、可运营”进一步迈进。

- **Android / iOS 的终端能力补齐**  
  PR [#100152](https://github.com/openclaw/openclaw/pull/100152) 与 PR [#100150](https://github.com/openclaw/openclaw/pull/100150) 分别覆盖 Android 和 iOS 的全屏 Web Terminal 体验。  
  这类 PR 说明 OpenClaw 正在把“运维/操作入口”从桌面扩展到移动端，提升远程可操作性。

- **Codex / Agents 链路稳定性修复**  
  PR [#100156](https://github.com/openclaw/openclaw/pull/100156) 针对 Issue [#100153](https://github.com/openclaw/openclaw/issues/100153) 修复“message-tool only turn 在发送进度消息后停住”的问题。  
  PR [#100160](https://github.com/openclaw/openclaw/pull/100160) 则在 Codex transcript ownership 上做了收敛，减少重复落盘/回退造成的歧义。  
  这类修复直接影响消息交付和会话完整性，是今天最具“稳定性增益”的推进。

- **插件与安装链路边界问题被主动处理**  
  PR [#99896](https://github.com/openclaw/openclaw/pull/99896) 针对 Docker / 跨文件系统下 git 插件安装的 EXDEV 问题提供修复路径，对应 Issue [#99885](https://github.com/openclaw/openclaw/issues/99885)。  
  这类问题虽然看起来边缘，但很影响容器化部署和真实生产环境可用性。

综合来看，今天的进展不是“单点功能爆发”，而是**围绕通信链路、移动端可达性、文档可信度和插件安装稳定性做系统性补强**。  
从量上看，**17 个 PR 被合并/关闭**，说明项目向前推进的速度较快；从质上看，推进内容集中在真实用户可感知的问题上，属于高价值交付。

---

## 4) 社区热点
今天社区讨论热度主要集中在 **高优先级问题报告**，而不是 PR 评论区；在已给数据中，Issue 的评论活跃度明显高于 PR。

### 热点 1：插件 SDK 的安全/产品决策讨论
- Issue [#100137](https://github.com/openclaw/openclaw/issues/100137)  
  `feat(plugin-sdk): expose stripInboundMetadata for channel plugins`  
  特征：**2 条评论、1 个 👍、P2、security/ux-friction、needs-maintainer-review、needs-product-decision**。  
  这是今天最值得关注的讨论点之一：它涉及 **channel plugin 如何处理 LLM 输出中的 inbound metadata**，本质上是“安全边界 + 渠道用户可见体验”的平衡问题。  
  用户诉求很清晰：插件要能正确剥离元数据块，否则用户会直接看到不该出现的内部信息或格式噪音。  
  链接：[#100137](https://github.com/openclaw/openclaw/issues/100137)

### 热点 2：会话维护 warning 的误抑制修复
- Issue [#99983](https://github.com/openclaw/openclaw/issues/99983)  
  `[Bug]: session-maintenance warning dedupe key drops 0/undefined fields`  
  特征：**2 条评论、1 个 👍、P3、message-loss**，且已关闭。  
  这个问题体现出用户对“限额变更后是否还能重新告警”的敏感性：一旦 warning 被错误去重，就会让运维者误以为系统没有变化。  
  它虽然是 P3，但典型地反映了项目对“告警正确性”的重视。  
  链接：[#99983](https://github.com/openclaw/openclaw/issues/99983)

### 次热点：新报问题多为“真实可用性”诉求
今天多个新 Issue 都是“能用，但不够顺手/会丢消息/会漏状态”的类型：
- [#100162](https://github.com/openclaw/openclaw/issues/100162) empty final payload 导致 reply 静默丢失
- [#100154](https://github.com/openclaw/openclaw/issues/100154) 移动配对入口不易发现
- [#100145](https://github.com/openclaw/openclaw/issues/100145) Settings 页面拥挤、Advanced 无返回
- [#100153](https://github.com/openclaw/openclaw/issues/100153) Codex message-tool only turn 可能停住

**结论：今天的热点不是“新能力炫技”，而是“让现有能力在真实场景里不失真、不丢失、不迷路”。**

---

## 5) Bug 与稳定性
按严重程度排序，今日值得优先关注的稳定性问题如下：

### P0 / P1：消息丢失、会话中断、潜在“砖化”
1. **[#100162](https://github.com/openclaw/openclaw/issues/100162)** — `embedded_run` 完成但 final payload 为空，reply 静默丢失，lane 变“黑”  
   - 严重性：**P1**
   - 影响：**session-state / message-loss**
   - 现状：**无直接 fix PR 出现在今日列表**
   - 评价：这是今天最危险的问题之一，因为它是“完成了但用户看不到结果”的沉默失败。

2. **[#100153](https://github.com/openclaw/openclaw/issues/100153)** — Codex `message_tool_only` turn 在发送状态消息后停止  
   - 严重性：**P1**
   - 影响：**message-loss**
   - 对应修复 PR：**[#100156](https://github.com/openclaw/openclaw/pull/100156)**（已提交，修复方向明确）
   - 评价：这是典型的“进度已发出、后续工作却没完成”的交互断裂问题。

3. **[#100139](https://github.com/openclaw/openclaw/issues/100139)** — WhatsApp 直接回复在 2026.6.11 上首条后停止  
   - 严重性：**P1**
   - 影响：**session-state / message-loss**
   - 状态：**已关闭**
   - 评价：说明该回归已被处理，但它暴露出跨渠道会话初始化的脆弱性。

### P2：部署/兼容性与使用体验问题
4. **[#99885](https://github.com/openclaw/openclaw/issues/99885)** — Docker 中 git 插件安装遇到 EXDEV 跨设备链接错误  
   - 严重性：**P2**
   - 影响：**ux-friction**
   - 对应修复 PR：**[#99896](https://github.com/openclaw/openclaw/pull/99896)**（已给出修复方案）
   - 评价：这是生产部署场景下很常见的容器文件系统问题，值得尽快落地。

5. **[#100137](https://github.com/openclaw/openclaw/issues/100137)** — `stripInboundMetadata` 需暴露给 channel plugins  
   - 严重性：**P2**
   - 影响：**security / ux-friction**
   - 现状：**待维护者与产品决策**
   - 评价：这类问题的风险不是崩溃，而是“输出污染/安全边界不清”。

### P3：已关闭的小但重要的正确性问题
6. **[#99983](https://github.com/openclaw/openclaw/issues/99983)** — session-maintenance warning 去重 key 丢失 0/undefined 字段  
   - 严重性：**P3**
   - 影响：**message-loss / 告警正确性**
   - 状态：**已关闭**
   - 对应修复 PR：**[#100050](https://github.com/openclaw/openclaw/pull/100050)**

### 相关修复信号
- **[#100149](https://github.com/openclaw/openclaw/pull/100149)**：防 Anthropic thinking-signature replay 导致会话“砖化”  
- **[#100146](https://github.com/openclaw/openclaw/pull/100146)**：当 `sessions_yield` 没有 continuation evidence 时发诊断  
- **[#100159](https://github.com/openclaw/openclaw/pull/100159)**：WhatsApp 终端 QR 刷新时替换过期二维码  
这些都说明团队正在持续压制“会话失联、渠道卡死、交互误导”类风险。

---

## 6) 功能请求与路线图信号
今天的新功能请求大多不是“纯新增”，而是**围绕现有能力做可发现性、可用性与可信度升级**。结合已有 PR 判断，以下需求很可能进入下一阶段：

### 1. 插件 SDK：向 channel plugins 暴露 `stripInboundMetadata`
- Issue [#100137](https://github.com/openclaw/openclaw/issues/100137)
- 路线图信号：涉及 **security review + product decision**，优先级不低，但需要明确边界定义。
- 判断：**有较大概率进入下一轮讨论/实现**，但不会是无条件放行型改动。

### 2. 移动端配对入口前置
- Issue [#100154](https://github.com/openclaw/openclaw/issues/100154)
- 对应 PR：**[#100157](https://github.com/openclaw/openclaw/pull/100157)**
- 判断：**高度接近落地**，因为已出现明确实现 PR。

### 3. Settings 页重构与 Simple/Advanced 状态持久化
- Issue [#100145](https://github.com/openclaw/openclaw/issues/100145)
- 对应 PR：**[#100147](https://github.com/openclaw/openclaw/pull/100147)**
- 判断：这是典型的“可用性修复 + 信息架构调整”，很像即将合并的产品体验优化。

### 4. 文档重写与发布文档对齐源码
- Issue [#100141](https://github.com/openclaw/openclaw/issues/100141)
- 对应 PR：**[#100142](https://github.com/openclaw/openclaw/pull/100142)**
- 判断：**高概率纳入近期版本**，因为文档问题直接影响新用户和维护者效率。

### 5. 私有会话跨会话记忆
- PR [#100140](https://github.com/openclaw/openclaw/pull/100140)（对应路线方向：Issue [#99611](https://github.com/openclaw/openclaw/issues/99611)）
- 判断：这是较大的产品级能力升级，若合入，将显著改变“个人 AI 助手”属性，属于路线图级信号。

---

## 7) 用户反馈摘要
从今日 Issues 的描述里，可以提炼出几类非常真实的用户痛点：

### 1. 用户最在意的是“消息有没有真的送达”
- [#100162](https://github.com/openclaw/openclaw/issues/100162)
- [#100153](https://github.com/openclaw/openclaw/issues/100153)
- [#100139](https://github.com/openclaw/openclaw/issues/100139)

这些反馈反复出现的关键词是 **silently dropped、stops after first message、lane goes dark**。  
说明用户并不只关心模型是否“思考了”，而是更关心 **最终结果是否可见、可追踪、可恢复**。

### 2. 移动端用户需要“入口更明显”
- [#100154](https://github.com/openclaw/openclaw/issues/100154)
- [#100145](https://github.com/openclaw/openclaw/issues/100145)

用户并不是反对功能本身，而是抱怨 **入口太深、路径不直观、Advanced 模式存在单向陷阱**。  
这说明 OpenClaw 的问题已经从“没有功能”转向“功能有了但发现成本太高”。

### 3. 容器与部署场景需要更强健的默认行为
- [#99885](https://github.com/openclaw/openclaw/issues/99885)

Docker / bind mount / cross-device link 这类场景很现实，用户希望插件安装“开箱即用”，而不是依赖文件系统偶然兼容。

### 4. 渠道插件和元数据处理需要更专业的边界
- [#100137](https://github.com/openclaw/openclaw/issues/100137)

用户对 channel plugins 的期待不只是“能接入”，还包括 **输出洁净、上下文安全、内部元数据不外泄**。  
这类反馈说明 OpenClaw 正在进入更成熟的集成阶段。

---

## 8) 待处理积压
今日没有明显“长期未响应”的老 Issue 被新增披露，但从 PR 状态看，存在一批值得维护者持续跟进的待处理项：

### 优先关注的待审 PR
- **[#100142](https://github.com/openclaw/openclaw/pull/100142)** — docs rewrite，状态：waiting on author  
- **[#100149](https://github.com/openclaw/openclaw/pull/100149)** — Anthropic thinking-signature replay 防护，状态：needs proof  
- **[#100147](https://github.com/openclaw/openclaw/pull/100147)** — Settings 重构，ready for maintainer look  
- **[#100159](https://github.com/openclaw/openclaw/pull/100159)** — WhatsApp QR 刷新修复，ready for maintainer look  
- **[#100057](https://github.com/openclaw/openclaw/pull/100057)** — memory dreaming sweeps by agent，ready for maintainer look  

### 值得特别盯住的高风险方向
- **[#100162](https://github.com/openclaw/openclaw/issues/100162)**：空 payload 导致静默丢消息，若不尽快处理，用户体感会非常差  
- **[#100137](https://github.com/openclaw/openclaw/issues/100137)**：安全/产品边界问题，容易卡在审查而延后  
- **[#100153](https://github.com/openclaw/openclaw/issues/100153)**：直接影响对话完整性，建议尽快确认 [#100156](https://github.com/openclaw/openclaw/pull/100156) 的落地状态

---

### 总体判断
OpenClaw 今天的状态可以概括为：**交付节奏快、修复导向强、用户需求明确，但会话可靠性与边界兼容性仍是核心挑战**。  
如果接下来 1-2 天内上述高优先级修复继续合入，项目整体健康度会进一步提升；反之，像 #100162 这类“静默失败”问题若积压过久，会明显侵蚀用户信任。

---

## 横向生态对比

以下为基于 2026-07-05 各项目动态的**横向对比分析报告**（以过去 24 小时可见活跃度为准）。

---

## 1) 生态全景

个人 AI 助手 / 自主智能体开源生态，当前正从“功能可用”进入“可靠可部署”阶段。头部项目的主要工作重心不再是炫技式新能力，而是**会话可靠性、消息一致性、跨平台兼容、安全边界、移动/桌面可用性**等基础体验。  
今天的动态也显示，多个项目都在修复“静默失败”“状态丢失”“重复投递”“部署异常”这类真实生产问题，说明生态正在经历从实验性工具向产品化系统的过渡。  
与此同时，社区活跃度明显分层：少数项目高频迭代，大量长尾项目处于低噪声或停滞状态，生态成熟度并不均衡。

---

## 2) 各项目活跃度对比

> 说明：下表为**今日可见活跃度**，不是仓库总 Issue/PR 数。

| 项目 | 今日 Issues 活跃 | 今日 PR 活跃 | Release 情况 | 健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 10 | 30 | 无新版本 | **高活跃，稳步前进；修复导向明显，但稳定性仍是主战场** |
| **Hermes Agent** | 12 | 32 | 无新版本 | **高活跃，迭代快；兼容性/状态管理复杂度上升** |
| **NanoClaw** | 0 | 1 | 无新版本 | **低活跃但稳定，偏维护与一致性修补** |
| **NanoBot** | 0 | 0 | 无新版本 | **无活动，观察中** |
| **PicoClaw** | 0 | 0 | 无新版本 | **无活动，观察中** |
| **NullClaw** | 0 | 0 | 无新版本 | **无活动，观察中** |
| **IronClaw** | 0 | 0 | 无新版本 | **无活动，观察中** |
| **LobsterAI** | 0 | 0 | 无新版本 | **无活动，观察中** |
| **TinyClaw** | 0 | 0 | 无新版本 | **无活动，观察中** |
| **Moltis** | 0 | 0 | 无新版本 | **无活动，观察中** |
| **CoPaw** | 0 | 0 | 无新版本 | **无活动，观察中** |
| **ZeptoClaw** | 0 | 0 | 无新版本 | **无活动，观察中** |
| **ZeroClaw** | 0 | 0 | 无新版本 | **无活动，观察中** |

---

## 3) OpenClaw 在生态中的定位

### 生态位置
OpenClaw 与 Hermes Agent 同属当前生态的**第一梯队**：  
- 都有较高的 Issues / PR 活跃度；
- 都在处理真实用户场景中的稳定性问题；
- 都没有新版本发布，说明当前更偏“持续修复与收敛”，不是集中发版。

### 相比同类的优势
1. **用户场景更偏产品端**
   - OpenClaw 今日重点集中在**移动端、Control UI、插件安装、文档、Codex/Agents 链路**。
   - 这说明它更像一个**面向终端用户的个人 AI 助手平台**，而不是纯底层框架。

2. **问题闭环更强**
   - 今日有大量 PR 指向明确 Issue，且已出现较多合并/关闭成果。
   - 这代表 OpenClaw 在“发现问题 → 修复 → 收敛”的闭环上效率较高。

3. **真实可用性导向更强**
   - 重点修复的是消息丢失、会话断裂、插件安装异常、移动端入口不可见等问题。
   - 说明项目在追求“真实场景可用”，而不是只追求功能覆盖。

### 与 Hermes 的技术路线差异
- **OpenClaw**：更偏**产品层 / 应用层**，强调多渠道、移动端、Control UI、Codex/Agents、文档可信度。
- **Hermes Agent**：更偏**平台层 / 基础设施层**，强调 CLI、Gateway、Auth、Compression、Memory、Provider 兼容性、桌面常驻体验。
- **NanoClaw**：更偏**运行时消息一致性**，聚焦 agent-runner 这类细颗粒链路。

### 社区规模对比
- **OpenClaw vs Hermes**：两者是生态头部，活跃度接近；OpenClaw 的用户场景更集中，Hermes 的系统面更宽。
- **OpenClaw vs NanoClaw**：OpenClaw 明显更大，议题覆盖和社区互动都更广。
- **OpenClaw vs 其余项目**：其余项目今日基本无可见活跃，OpenClaw 属于绝对主场项目。

---

## 4) 共同关注的技术方向

### 1. 会话可靠性 / 消息一致性
涉及项目：
- **OpenClaw**：#100162、#100153、#100139，关注静默丢消息、turn 停止、会话中断
- **NanoClaw**：#2956，关注 final output 与 tool-send 内容重复投递
- **Hermes Agent**：#58599、#58630、#58610，关注状态持久化、压缩状态复用、工具结果治理

**共同诉求**：  
确保“模型说了什么、工具发了什么、最终展示了什么”三者一致，避免静默失败、重复输出和状态漂移。

---

### 2. 跨平台与部署兼容性
涉及项目：
- **OpenClaw**：Android/iOS 全屏终端、Docker 下 git 插件 EXDEV 问题
- **Hermes Agent**：Python 3.14 崩溃、0.0.0.0 下 BasicAuth 500、Linux 更新回退、macOS Keychain 污染

**共同诉求**：  
AI 智能体已经从“本地 demo”走向“多平台真实部署”，兼容性问题正在成为第一类风险。

---

### 3. 安全边界与权限控制
涉及项目：
- **OpenClaw**：#100137，channel plugins 的 inbound metadata 剥离
- **Hermes Agent**：#58631、#58628、#58627，终端绕过保护文件、symlink 风险、敏感 token masking

**共同诉求**：  
插件化、工具化越强，越需要明确安全边界，避免内部元数据泄露、越权执行和输出污染。

---

### 4. 可用性与可发现性
涉及项目：
- **OpenClaw**：移动配对入口前置、Settings 页面重构、文档重写
- **Hermes Agent**：关闭窗口最小化托盘、Dashboard LAN 可访问、CLI alias 升级

**共同诉求**：  
生态正在从“有功能”进入“好找、好用、好理解、好部署”的产品化阶段。

---

### 5. 状态治理与上下文压缩
涉及项目：
- **Hermes Agent**：大工具结果压缩、in-place 状态拆分、steer 持久化问题
- **OpenClaw**：transcript ownership 收敛、session-state 修复

**共同诉求**：  
长会话和多工具协作场景下，状态管理已成为智能体系统的核心工程问题。

---

## 5) 差异化定位分析

| 维度 | OpenClaw | Hermes Agent | NanoClaw | 其余项目 |
|---|---|---|---|---|
| 功能侧重 | 个人 AI 助手、移动端、渠道插件、Control UI | Agent 基础设施、桌面/CLI/Gateway/Auth/Provider | runner 级消息一致性 | 暂无可见信号 |
| 目标用户 | 终端用户、运营者、集成方 | 开发者、Power user、平台维护者 | 小团队/组件集成者 | 不明或低活跃 |
| 技术架构倾向 | 多渠道应用层、交互闭环 | 框架层、状态与权限治理 | 输出投递与去重逻辑 | 未体现 |
| 当前主战场 | 消息可靠性、移动端、插件安装、文档 | 兼容性、桌面体验、压缩治理、权限安全 | 重复消息投递 | 无活动 |

### 核心差异结论
- **OpenClaw**：更像“可直接使用的个人 AI 助手平台”。
- **Hermes Agent**：更像“支撑多个助手/工作流的智能体基础设施”。
- **NanoClaw**：更像“智能体消息链路的轻量运行时组件”。
- 其余项目当前没有足够动态支撑明确定位。

---

## 6) 社区热度与成熟度

### 第一层：快速迭代阶段
- **OpenClaw**
- **Hermes Agent**

特征：
- Issue/PR 高频；
- 修复导向强；
- 版本发布谨慎；
- 已进入“真实用户问题驱动开发”阶段。

### 第二层：质量巩固阶段
- **NanoClaw**

特征：
- 活跃度低，但方向明确；
- 聚焦一致性、去重、交互正确性；
- 更像在打基础质量。

### 第三层：低活跃 / 待观察
- **NanoBot、PicoClaw、NullClaw、IronClaw、LobsterAI、TinyClaw、Moltis、CoPaw、ZeptoClaw、ZeroClaw**

特征：
- 今日无可见活动；
- 无法判断当前迭代强度；
- 更适合作为长期观察对象。

---

## 7) 值得关注的趋势信号

### 1. 生态正在进入“可靠性优先”阶段
AI 智能体项目的竞争焦点，已从“谁能跑”转向“谁更稳”。  
静默丢消息、会话断裂、重复投递、状态漂移，这些问题正在成为用户最敏感的痛点。

### 2. 产品化能力变得和模型能力同等重要
移动端入口、桌面托盘、Dashboard 网络访问、文档准确性、Settings 可理解性，这些非模型能力正在显著影响项目口碑。

### 3. 安全与权限边界开始前置
插件元数据、终端绕过、token masking、symlink 安全，这说明智能体系统已进入“工具链+权限链”时代，安全不再是附属项。

### 4. 多平台兼容是新的门槛
Python 版本、macOS Keychain、Windows/Linux 桌面、移动端终端、Docker 文件系统冲突，都表明“跨平台可运行”正在成为基础门槛，而不是加分项。

### 5. 头部项目开始分化：产品平台 vs 基础框架
- **OpenClaw** 更偏终端产品与交互闭环；
- **Hermes Agent** 更偏框架与基础设施；
- 这类分化会决定后续生态协作和用户群分层。

---

### 结论

今天的生态信号非常清晰：**头部项目都在做“稳定性工程”和“产品化打磨”，而不是单纯扩功能**。  
OpenClaw 和 Hermes Agent 是当前最值得持续跟踪的两个主线项目，前者偏用户交互与多端可达性，后者偏平台能力与系统治理；NanoClaw 则代表了更轻量的质量修补路线。  
对开发者和技术决策者而言，下一阶段应重点关注：**消息链路可靠性、状态一致性、跨平台兼容、安全边界、以及移动/桌面端的可用性**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-07-05）

## 1) 今日速览
今天 Hermes Agent 处于**高活跃、以修复与架构收敛为主**的状态：过去 24 小时内出现了 **12 条 Issue 更新** 和 **32 条 PR 更新**，但**没有新版本发布**，说明代码层面推进很快，发布节奏相对保守。  
从议题分布看，团队同时在处理 **桌面端、CLI、Gateway、Auth、Compression、Memory/Tool 体系** 等多个方向的问题，覆盖面很广。  
当天至少有 **2 个 Issue 关闭、3 个 PR 关闭/合并**，表明已有部分问题完成闭环，但新增问题与修复提案仍然很多，项目处于“高输入、高迭代”的阶段。  
整体健康度判断：**活跃度高、问题发现速度快、工程复杂度上升，稳定性与兼容性是当前主线**。

---

## 2) 版本发布
**今日无新版本发布。**

---

## 3) 项目进展
今日已关闭/合并的关键 PR，主要集中在**测试稳定性**与**压缩/提示行为控制**：

- [#58613 fix(tests): isolate Anthropic keychain credentials](https://github.com/nousresearch/hermes-agent/pull/58613)  
  解决 macOS 上 Anthropic 适配器测试会读到真实 Claude Code Keychain 凭据的问题，提升了测试可重复性与隔离性。对应 Issue：[#58609](https://github.com/nousresearch/hermes-agent/issues/58609)

- [#58618 fix: gate Codex gpt-5.5 autoraise warning](https://github.com/nousresearch/hermes-agent/pull/58618)  
  对 Codex gpt-5.5 的 autoraise 提示逻辑做了开关化，属于**可配置性与用户体验**改进，降低了默认行为对用户的打扰。

> 说明：本次数据中显示过去 24 小时有 **3 条 PR 已合并/关闭**，但摘要里只展示了 2 条已关闭 PR；其余 1 条未在提供的数据中列出。  
> 从整体看，今天项目更多是在**补齐边界条件、修复跨平台问题、增强安全与稳定性**，而不是做大版本功能宣发。

---

## 4) 社区热点
今日讨论最活跃的议题，集中在以下几类问题：

### 1. Python 3.14 兼容性崩溃
- Issue: [#58596 DaemonThreadPoolExecutor crashes on Python 3.14](https://github.com/nousresearch/hermes-agent/issues/58596)  
  评论数：2  
  这是今日最受关注的单个 Issue，核心诉求是：Hermes 在 Python 3.14 下的并发执行路径失效，影响 delegation、skills hub fan-out、memory sync 等一系列能力。  
  **背后诉求**：用户希望 Hermes 作为长时间运行的 Agent 基础设施时，能保持对新 Python 版本的兼容。

### 2. Dashboard 在 0.0.0.0 下的 BasicAuth 500
- Issue: [#58626 Dashboard: BasicAuthProvider triggers NotImplementedError when binding to 0.0.0.0](https://github.com/nousresearch/hermes-agent/issues/58626)  
  评论数：1  
  这个问题说明用户在**局域网/非回环地址部署 Dashboard** 时遇到了可用性障碍。  
  **背后诉求**：Dashboard 被用于真实网络环境，而不是只在本机开发场景中使用。

### 3. 桌面端关闭窗口行为
- Issue: [#58621 关闭窗口时最小化到系统托盘](https://github.com/nousresearch/hermes-agent/issues/58621)  
  评论数：1  
  用户希望桌面端支持“关闭即最小化到托盘”的常见桌面软件体验。  
  **背后诉求**：Hermes Desktop 被当作常驻应用使用，用户更偏好“不断进程”的交互模式。

### 4. Provider 生态扩展
- Issue: [#58603 Add Groq and Cerebras as recognized providers in hermes auth](https://github.com/nousresearch/hermes-agent/issues/58603)  
  评论数：1  
  用户希望 auth 系统识别更多 OpenAI-compatible provider。  
  **背后诉求**：降低接入门槛，提升多模型、多供应商切换灵活性。

> 今日 PR 的评论数/反应数未完整展示，因此社区热点主要由 Issue 侧驱动。整体上看，用户更关注**兼容性、部署可用性、桌面体验、Provider 覆盖**，而不是单点新功能炫技。

---

## 5) Bug 与稳定性
以下按严重程度与影响面排序：

### P2 / 高优先级

1. **Python 3.14 并发崩溃**
   - Issue: [#58596](https://github.com/nousresearch/hermes-agent/issues/58596)
   - 影响：`delegate_task`、异步 delegation、skills hub fan-out、memory sync 等并发相关能力可能全线受影响
   - 现状：**尚未看到明确 fix PR**
   - 评估：兼容性阻断级问题，建议优先处理

2. **Dashboard 在 0.0.0.0 下 BasicAuth 触发 500**
   - Issue: [#58626](https://github.com/nousresearch/hermes-agent/issues/58626)
   - 影响：局域网访问 Dashboard 失败，影响真实部署
   - 现状：**暂无对应 fix PR**
   - 评估：部署可用性问题，优先级高

3. **Compression abort 复用陈旧的 in-place compaction 状态**
   - Issue: [#58630](https://github.com/nousresearch/hermes-agent/issues/58630)
   - 对应修复 PR: [#58629](https://github.com/nousresearch/hermes-agent/pull/58629)
   - 影响：会造成压缩/会话状态误判，属于 session-state 风险
   - 评估：已有修复方案，建议尽快验证回归

4. **Desktop 重连时持续生成未清理的 serve 进程**
   - Issue: [#58619](https://github.com/nousresearch/hermes-agent/issues/58619)
   - 对应修复 PR: [#58624](https://github.com/nousresearch/hermes-agent/pull/58624)
   - 影响：长期运行会出现进程堆积，资源泄漏风险明显
   - 评估：典型稳定性问题，修复路径已出现

5. **/steer 跨 reload/fork 的持久化丢失**
   - Issue: [#58599](https://github.com/nousresearch/hermes-agent/issues/58599)
   - 现状：**暂无对应 fix PR**
   - 影响：会话重载/分叉/压缩后 steer 信息丢失，影响 Agent 行为一致性
   - 评估：功能正确性与状态一致性问题

6. **`hermes insights` 记账 token 不完整**
   - Issue: [#58592](https://github.com/nousresearch/hermes-agent/issues/58592)
   - 现状：**暂无对应 fix PR**
   - 影响：用户看到的 token 数与 OpenRouter 计费不一致，影响成本判断
   - 评估：会直接伤害用户对计费/分析结果的信任

### P3 / 中优先级

7. **Anthropic adapter 测试受 macOS Keychain 污染**
   - Issue: [#58609](https://github.com/nousresearch/hermes-agent/issues/58609)
   - 对应修复 PR: [#58612](https://github.com/nousresearch/hermes-agent/pull/58612)、[#58613](https://github.com/nousresearch/hermes-agent/pull/58613)
   - 影响：测试不稳定、机器间结果不一致
   - 评估：工程质量问题，但修复已推进

8. **Linux Desktop 发现更新后反复回退 / sandbox 权限重置**
   - Issue: [#58593](https://github.com/nousresearch/hermes-agent/issues/58593)
   - 现状：**暂无对应 fix PR**
   - 影响：更新流程不可靠，且可能破坏 Electron sandbox 权限
   - 评估：桌面端发布链路风险

9. **TUI macOS emoji picker 不可输入**
   - Issue: [#58617](https://github.com/nousresearch/hermes-agent/issues/58617)
   - 现状：已关闭
   - 影响：输入法/emoji 体验问题，影响较轻

---

## 6) 功能请求与路线图信号
今日出现的功能请求，和已有 PR 方向相互呼应，能看出下一阶段路线图的几个信号：

### 1. Desktop 体验增强
- Issue: [#58621 关闭窗口时最小化到系统托盘](https://github.com/nousresearch/hermes-agent/issues/58621)
- PR: [#58632 cache cron run history to avoid remount spinner](https://github.com/nousresearch/hermes-agent/pull/58632)
- 信号：桌面端正在往“常驻化、低打扰、状态保留”方向演进。  
  这类需求很可能继续进入下一版本的桌面体验优化清单。

### 2. Provider/Auth 兼容性扩展
- Issue: [#58603 Add Groq and Cerebras as recognized providers](https://github.com/nousresearch/hermes-agent/issues/58603)
- PR: [#58631 gate terminal bypass of protected files](https://github.com/nousresearch/hermes-agent/pull/58631)、[#58628 symlink-sensitive auto-approve guard](https://github.com/nousresearch/hermes-agent/pull/58628)、[#58627 SendGrid token masking](https://github.com/nousresearch/hermes-agent/pull/58627)
- 信号：Auth 和安全边界仍是重点，且生态兼容性在扩大。  
  如果 Hermes 继续强化 provider registry，这类请求大概率会被吸收。

### 3. 大输出、长会话、工具结果治理
- PR: [#58610 compact large tool results behind handles](https://github.com/nousresearch/hermes-agent/pull/58610)
- PR: [#58629 split in-place attempt and run signals](https://github.com/nousresearch/hermes-agent/pull/58629)
- Issue: [#58630 stale compaction state](https://github.com/nousresearch/hermes-agent/issues/58630)
- 信号：项目正在向“**更稳的状态管理 + 更小的会话体积 + 更少的上下文污染**”收敛。  
  这非常像下一版本的主线之一。

### 4. CLI 体验与命令一致性
- PR: [#58616 alias upgrade to update command](https://github.com/nousresearch/hermes-agent/pull/58616)
- 信号：CLI 仍在做低风险、低成本的可用性改良，属于容易被纳入发布的功能。

### 5. 项目系统产品化
- PR: [#58634 add projects.enabled config toggle](https://github.com/nousresearch/hermes-agent/pull/58634)
- 信号：`projects` 子系统开始向“第一类配置能力”靠拢，说明项目管理相关能力正在产品化，而不是纯实验性特性。

> 综合判断：**下一版本最可能优先吸收的是桌面体验、权限/安全、状态压缩、Provider 兼容性这几条线。**

---

## 7) 用户反馈摘要
从今天的 Issue 内容中，可以归纳出几类非常明确的真实用户痛点：

1. **跨平台兼容性压力很大**
   - Python 3.14 崩溃：[#58596](https://github.com/nousresearch/hermes-agent/issues/58596)
   - macOS 输入法/Keychain：[#58617](https://github.com/nousresearch/hermes-agent/issues/58617)、[#58609](https://github.com/nousresearch/hermes-agent/issues/58609)
   - Linux 更新与权限：[#58593](https://github.com/nousresearch/hermes-agent/issues/58593)

2. **用户把 Hermes 当作长期运行的生产工具在用**
   - Dashboard 需要能对局域网稳定服务：[#58626](https://github.com/nousresearch/hermes-agent/issues/58626)
   - Desktop 要能托盘驻留而不是退出：[#58621](https://github.com/nousresearch/hermes-agent/issues/58621)
   - 重连不能不断拉起进程：[#58619](https://github.com/nousresearch/hermes-agent/issues/58619)

3. **用户对成本、记账和透明度很敏感**
   - token 统计不准会直接影响对账与使用判断：[#58592](https://github.com/nousresearch/hermes-agent/issues/58592)

4. **用户期待更广的模型与服务接入能力**
   - Groq / Cerebras 识别需求：[#58603](https://github.com/nousresearch/hermes-agent/issues/58603)

总体来看，反馈并不是“功能不够多”，而是更偏向：**稳定、兼容、可部署、可持续使用、状态可信**。这说明 Hermes 已经进入“真实使用场景放大问题”的阶段。

---

## 8) 待处理积压
本次快照里看不到明显“长期未响应”的老 Issue/PR（多数都是 **2026-07-05 当天新鲜产生**）。  
但从优先级与影响面看，以下条目应视为**高优先级积压候选**，建议维护者尽快安排：

- [#58596 Python 3.14 并发崩溃](https://github.com/nousresearch/hermes-agent/issues/58596) — 兼容性阻断
- [#58626 Dashboard BasicAuth 500](https://github.com/nousresearch/hermes-agent/issues/58626) — 部署可用性阻断
- [#58592 insights token 统计不准](https://github.com/nousresearch/hermes-agent/issues/58592) — 影响计费可信度
- [#58593 Linux Desktop 更新反复失败](https://github.com/nousresearch/hermes-agent/issues/58593) — 发布链路风险
- [#58599 /steer 持久化丢失](https://github.com/nousresearch/hermes-agent/issues/58599) — 会话一致性风险
- [#58630 压缩状态复用问题](https://github.com/nousresearch/hermes-agent/issues/58630) — 已有修复 PR [#58629](https://github.com/nousresearch/hermes-agent/pull/58629)，建议优先验证
- [#58619 Desktop serve 进程泄漏](https://github.com/nousresearch/hermes-agent/issues/58619) — 已有修复 PR [#58624](https://github.com/nousresearch/hermes-agent/pull/58624)，建议尽快合并

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合发 Slack/飞书的精简版**，或  
2. **适合内部周报/晨会的管理层摘要版**。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

以下为 **NanoClaw（github.com/qwibitai/nanoclaw）2026-07-05 项目动态日报**。  
整体看，今天项目处于 **低噪声、低波动** 状态：没有新增或活跃 Issues，没有新版本发布，唯一的明显动态是一条围绕 **agent-runner 重复消息投递** 的修复型 PR。项目当前健康度偏稳，维护重心更像是在做交互正确性与边界条件修补，而不是功能扩张。

---

## 1. 今日速览
- 今日仓库整体活跃度较低：**Issues 0 更新、Release 0 发布**，说明社区侧没有出现新的集中性问题或大规模讨论。
- 唯一值得关注的变动是 **1 条 open PR**，聚焦在 `agent-runner` 的消息去重问题，属于典型的稳定性/一致性修复。
- 从信号上看，NanoClaw 目前更像是在做 **可靠性打磨**，而非新功能冲刺。
- 结合数据，项目今日状态可评估为：**健康、平稳、维护导向明确，但社区互动偏弱**。  
  链接：项目主页 https://github.com/qwibitai/nanoclaw

---

## 2. 版本发布
- **今日无新版本发布**，因此没有可披露的变更说明、破坏性变更或迁移注意事项。  
  链接：Releases 页面 https://github.com/qwibitai/nanoclaw/releases

---

## 3. 项目进展
### 今日重要 PR
1. **#2956 [OPEN] fix(agent-runner): suppress duplicate delivery when the final output repeats tool-sent content**  
   链接：https://github.com/qwibitai/nanoclaw/pull/2956

   **推进内容：**
   - 该 PR 试图修复一种典型的 agent 输出重复投递问题：
     - agent 先通过 `send_message` MCP tool 发出回复；
     - 随后最终输出又重复同一段文本；
     - 结果导致同一内容被发送两次。
   - PR 说明中指出，当前路径里：
     - 包裹在 `<message>` 的内容会直接进入 `dispatchResultText` 的发送流程，**缺少重复检测**；
     - bare restated text 又会触发另一轮重复判断逻辑，导致双发。
   - 如果合并，这将显著提升 **agent 输出一致性**、减少用户侧“同一句话出现两次”的体验问题。

### 今日整体向前迈进了多少
- 从“功能量”看，今天推进不大；
- 从“质量提升”看，这是一个很有价值的修复点，属于 **小步但高收益** 的工程改进；
- 对一个 AI Agent / 个人助手类项目而言，这类问题会直接影响用户对“智能体可靠性”的感知，因此 PR 的优先级不低。  

---

## 4. 社区热点
### 今日最活跃讨论
- **无 Issues 活跃，无评论活跃的 Issues 记录。**
- **唯一可见热点是 PR #2956**，但当前数据里没有显示评论数，且为 0 reaction。  
  链接：https://github.com/qwibitai/nanoclaw/pull/2956

### 热点背后的诉求
- 从标题和摘要看，社区/维护者关注点集中在：
  1. **避免重复消息投递**
  2. **修正 MCP tool 与最终输出之间的消息一致性**
  3. **提升 agent 对外表现的确定性**
- 这类诉求通常来自真实使用场景：用户希望 agent “说一次就够”，而不是因为内部流程重复而导致冗余输出。

---

## 5. Bug 与稳定性
### 今日报告的 Bug / 回归
- **今日 Issues 中没有新增 Bug、崩溃或回归报告。**  
  链接：https://github.com/qwibitai/nanoclaw/issues

### 现阶段可见的稳定性问题
1. **重复消息投递问题（中等严重度，未合并修复）**
   - 来源：PR #2956
   - 表现：`send_message` 工具发送后，最终输出又重复相同内容，造成双发。
   - 影响：
     - 用户体验下降；
     - 可能影响上层 workflow 的幂等性；
     - 在多轮 agent 协作时容易引发“重复确认/重复执行”的误判。
   - 是否已有 fix PR：**有，#2956，但当前仍为 OPEN，尚未合并。**
   - 链接：https://github.com/qwibitai/nanoclaw/pull/2956

### 严重程度排序
- **中等：重复投递/重复输出**
  - 不像崩溃或数据丢失那样致命，但在 AI 助手产品中属于会明显伤害体验的稳定性问题。

---

## 6. 功能请求与路线图信号
### 今日新增功能请求
- **未见新增 Issues，因此没有可确认的新功能需求。**  
  链接：https://github.com/qwibitai/nanoclaw/issues

### 路线图信号
- 虽然没有显式 feature request，但 PR #2956 释放出一个很明确的路线图信号：
  - 项目短期更关注 **消息链路正确性**
  - 优先级可能高于新能力扩展
  - 下一版本若合并该 PR，预计会把 **agent-runner 的输出治理、去重、幂等性** 作为基础能力继续强化
- 对 AI 智能体项目而言，这通常是较健康的演进顺序：先稳交互，再扩功能。  
  链接：https://github.com/qwibitai/nanoclaw/pull/2956

---

## 7. 用户反馈摘要
### Issues 评论中的真实反馈
- **今日无 Issues、无评论数据**，因此无法从用户反馈中提炼出真实痛点或满意点。  
  链接：https://github.com/qwibitai/nanoclaw/issues

### 可推断的使用场景
- 虽然没有评论，但 PR #2956 暗示了一个典型场景：
  - 用户通过 MCP 工具触发消息发送；
  - agent 最终输出与工具发送内容重叠；
  - 结果造成重复展示。
- 这说明 NanoClaw 被用于需要 **工具调用 + 自然语言最终输出** 紧密协同的 agent 工作流，这类场景对输出去重非常敏感。

### 目前可见的反馈倾向
- **满意点**：从今日数据无法确认。
- **不满意点**：可推测集中在“重复输出”这种交互瑕疵上。  
  链接：https://github.com/qwibitai/nanoclaw/pull/2956

---

## 8. 待处理积压
### 长期未响应的重要 Issue / PR
- **当前快照中没有可识别的长期未响应 Issue。**
- 唯一 open PR 为 **#2956**，且创建/更新都在 2026-07-05，当日新鲜度高，不属于积压。  
  链接：https://github.com/qwibitai/nanoclaw/pull/2956

### 维护者建议关注点
- 尽快评估并处理 PR #2956：
  - 若逻辑正确，建议合并；
  - 若实现有边界风险，建议补充测试后再进主干。
- 在当前“零 Issues、单 PR”的态势下，及时处理这类高价值修复能有效维持项目口碑与稳定性。  
  链接：https://github.com/qwibitai/nanoclaw/pull/2956

---

### 总结判断
NanoClaw 今天呈现出 **低活跃但稳定聚焦** 的状态：没有版本发布、没有 Issues 风暴，唯一的工作重心是一条与 agent 输出一致性相关的修复 PR。对 AI 智能体项目而言，这种“修细节、保一致”的投入是正向信号，说明维护者在优先处理真实用户可感知的问题。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*