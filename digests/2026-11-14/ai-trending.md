# AI 开源趋势日报 2026-11-14

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-14 09:55 UTC

---

# AI 开源趋势日报
**日期：2026-11-14｜数据来源：GitHub Trending 与 AI 主题搜索**

> **数据口径**：本期从 7 个 Trending 仓库中筛选出 **5 个明确涉及 AI 的项目**；主题搜索无结果。输入中的总 stars 均为 `0`，且低于今日新增值，存在明显口径异常，因此统一标为“总量待核实”，今日新增沿用提供的数据。各分类仅列实际入选项目，不为满足数量要求补充榜外仓库。

## 1. 今日速览

今日最强信号是 **围绕编码 Agent 的配套生态升温**：从提供最新 Web 实践，到安全漏洞处理，再到人工审阅与反馈，关注点正由“生成代码”扩展到“可靠交付”。其中，[GoogleChrome/modern-web-guidance-src](https://github.com/GoogleChrome/modern-web-guidance-src) 今日新增 **1,925 stars**，在本次 AI 入选项目中领先。垂直应用则延伸至交易研究技能和 AI 视频增强，但后者涉及的技术兼容性与性能宣传仍需独立验证。当前样本未出现大模型训练或 RAG 类项目，不能据此判断这些领域整体降温。

## 2. 各维度热门项目

### 🔧 AI 基础工具

| 项目 | Stars 数据 | 项目定位与关注理由 |
|---|---|---|
| [GoogleChrome/modern-web-guidance-src](https://github.com/GoogleChrome/modern-web-guidance-src) | 总量待核实（原始值 0）；**今日 +1,925** | 为编码 Agent 提供最新 Web 开发最佳实践，反映社区对改善 Agent 技术知识时效性和代码质量的强烈需求。 |
| [openai/codex-security](https://github.com/openai/codex-security) | 总量待核实（原始值 0）；**今日 +751** | 面向安全漏洞发现、验证与修复的 Codex Security CLI 和 TypeScript SDK，体现 AI 编码工具向安全工程环节延伸。 |

### 🤖 AI 智能体 / 工作流

| 项目 | Stars 数据 | 项目定位与关注理由 |
|---|---|---|
| [backnotprop/plannotator](https://github.com/backnotprop/plannotator) | 总量待核实（原始值 0）；**今日 +108** | 面向 Agent 协作的计划、批注与代码审阅工作区，通过集中反馈支持“人在回路”的开发流程。 |

### 📦 AI 应用

| 项目 | Stars 数据 | 项目定位与关注理由 |
|---|---|---|
| [tradermonty/claude-trading-skills](https://github.com/tradermonty/claude-trading-skills) | 总量待核实（原始值 0）；**今日 +69** | 为 Claude Code 提供市场分析、技术图表和策略开发等交易研究技能，体现通用 Agent 向金融垂直工作流扩展；亦可归入智能体工具生态。 |
| [Likely7/Veyra-NRVideo](https://github.com/Likely7/Veyra-NRVideo) | 总量待核实（原始值 0）；**今日 +256** | 宣称集成 AI 超分辨率、图像增强与帧生成的视频播放及采集增强工具；因明确涉及 AI 图像处理而入选，但描述中的“DLSS 5”“120FPS”等能力与效果尚未核验。 |

### 🧠 大模型 / 训练
本期无符合条件的项目。

### 🔍 RAG / 知识库
本期无符合条件的项目。面向 Agent 的 Web 实践资料不等同于 RAG 系统，因此未将其归入此类。

## 3. 趋势信号分析

本期最明确的信号是，社区关注正从“让 Agent 写代码”转向“让 Agent 按规范、安全且可审阅地完成任务”。Web 最佳实践与安全 CLI 分别获得 1,925 和 751 个今日新增 stars，人工反馈工作区则补齐协作环节，构成知识约束、安全验证与人工监督的工具链。TypeScript 出现在三个编码 Agent 配套项目中，显示其在这组样本里的突出地位；交易技能包则体现领域能力模块化。AI 视频增强也是值得观察的方向，但性能宣传仍需验证。仅凭单日榜单无法确认任何方向“首次登榜”，也无发布记录支撑其与近期模型发布的因果关联；更稳妥的判断是，开发者正在关注 Agent 的可靠性和行业落地。

## 4. 社区关注热点

- **Agent 的知识时效性**：[modern-web-guidance-src](https://github.com/GoogleChrome/modern-web-guidance-src) 值得关注其如何向编码 Agent 提供和更新开发规范，而不只是增加上下文材料。
- **安全任务的验证闭环**：[codex-security](https://github.com/openai/codex-security) 的观察重点是漏洞发现后的验证、误报控制和修复质量，而非仅看生成能力。
- **人在回路的协作体验**：[plannotator](https://github.com/backnotprop/plannotator) 展示了计划审阅与反馈回传的产品方向，适合关注团队如何约束和监督 Agent。
- **领域技能包的可复用性**：[claude-trading-skills](https://github.com/tradermonty/claude-trading-skills) 可用于观察金融研究流程的技能化封装，但工具输出不等于有效投资建议。
- **AI 视频增强的可验证性**：[Veyra-NRVideo](https://github.com/Likely7/Veyra-NRVideo) 应优先检查硬件要求、实现路径、画质损失与端到端延迟，再评估其实际价值。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*