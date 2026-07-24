# Hugging Face 热门模型日报 2026-07-24

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-07-24 01:02 UTC

---

# 《Hugging Face 热门模型日报》
**日期：2026-07-24**  
**榜单范围：Hugging Face Hub 热门模型（按周点赞数排序，共 3 个）**

---

## 1) 今日速览
今天的榜单呈现出两个明显信号：**Qwen 生态继续强势领跑**，且不再局限于通用对话，正在向 **TTS / 语音生成** 等方向扩展。  
同时，社区对 **量化版、可本地部署、带“uncensored”标签的衍生模型** 仍然保持高关注，说明“能跑、好用、易部署”依然是热门关键字。  
此外，榜单中出现了带 **security** 标签的小参数模型，表明安全相关能力和轻量级部署正在成为新卖点。  
整体来看，热门趋势从“纯 LLM 竞赛”进一步转向 **多模态、语音、社区微调与高效部署** 的组合竞争。

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

#### 1. [fdtn-ai/antares-1b](https://huggingface.co/fdtn-ai/antares-1b)
- **作者**：fdtn-ai  
- **点赞数**：121  
- **下载数**：2,747  
- **一句话说明**：一个轻量级的 1B 文本生成模型，带有 **security** 标签，说明它可能面向安全相关文本处理或受控生成场景；以小体量进入热门榜，体现出“轻量+垂直能力”的关注度。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

#### 2. [Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice](https://huggingface.co/Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice)
- **作者**：Qwen  
- **点赞数**：1,798  
- **下载数**：2,497,020  
- **一句话说明**：这是一个 **文本到语音（TTS）** 模型，支持自定义声音，下载量极高，说明其在真实应用、Demo 体验和本地/在线语音生成场景中都很受欢迎，是今天最具“落地热度”的模型。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

> 今日榜单中没有明确归入该类的模型。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

#### 3. [LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V5-GGUF](https://huggingface.co/LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V5-GGUF)
- **作者**：LuffyTheFox  
- **点赞数**：117  
- **下载数**：24,982  
- **一句话说明**：这是一个基于 **Qwen3.6** 的社区衍生 **GGUF 量化/本地部署** 版本，带有 **uncensored** 和 **Hermes** 风格标签，反映出社区对“更开放、更可控、更适合本地运行”的微调模型依然高度活跃。

---

## 3) 生态信号
本周最强势的家族仍是 **Qwen**，且正从通用大模型向 **TTS、多模态和社区衍生版本** 纵深扩张。开源权重依旧是主流，且“可下载、可量化、可本地跑”的模型更容易获得实际热度；相比闭源 API，社区更偏好能直接落地的开源方案。值得注意的是，**GGUF 量化与社区微调** 仍非常活跃，说明本地推理、低成本部署和个性化对齐是持续增长的需求点。

---

## 4) 值得探索
1. **[Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice](https://huggingface.co/Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice)**  
   下载量极高，适合优先研究其语音合成质量、声音定制能力和实际部署成本。

2. **[LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V5-GGUF](https://huggingface.co/LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V5-GGUF)**  
   代表了社区对 Qwen 系列的深度再加工，适合关注量化模型、本地部署和对齐风格变化。

3. **[fdtn-ai/antares-1b](https://huggingface.co/fdtn-ai/antares-1b)**  
   虽然规模较小，但带有 security 标签，适合观察轻量模型在安全方向上的应用潜力。

如果你愿意，我也可以把这份日报进一步整理成 **适合公众号发布的排版版**，或者输出为 **Markdown / JSON / 表格版**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*