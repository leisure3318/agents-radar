# Hugging Face 热门模型日报 2026-07-21

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 4 个模型 | 生成时间: 2026-07-21 01:03 UTC

---

# Hugging Face 热门模型日报（2026-07-21）

## 1) 今日速览
本周榜单最显眼的信号是**具身智能/机器人模型强势领跑**，openbmb 的两个 MiniCPM 机器人模型包揽前二，说明 VLA（Vision-Language-Action）方向热度持续上升。  
基础设施层面，NVIDIA 的嵌入模型同时拿到高点赞和高下载，显示**检索、RAG、语义匹配**仍是企业和开发者的长期刚需。  
社区侧，Qwen3.6 的 **GGUF + uncensored** 版本表现活跃，反映出大模型生态正继续向**本地部署、低门槛推理、可定制微调**演进。  
整体来看，本期热点不只集中在“更大模型”，而是更多转向**专用能力 + 可部署性**。

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
- 本期暂无纯语言模型直接上榜；热点更多集中在具身智能、嵌入模型与量化社区版。

### 🎨 多模态与生成（图像、视频、音频、文本到X）
- [openbmb/MiniCPM-RobotManip](https://huggingface.co/openbmb/MiniCPM-RobotManip)  
  作者：openbmb｜点赞：129｜下载：0  
  一句话：面向机器人操作的 vision-language-action 模型，强调“看懂环境并完成操作”，因具身智能热潮冲到榜首。

- [openbmb/MiniCPM-RobotTrack](https://huggingface.co/openbmb/MiniCPM-RobotTrack)  
  作者：openbmb｜点赞：99｜下载：0  
  一句话：面向机器人目标跟踪/跟随的 VLA 模型，延续 MiniCPM 机器人线的连续热度，显示 openbmb 在具身方向布局明确。

### 🔧 专用模型（代码、数学、医疗、嵌入）
- [nvidia/Nemotron-3-Embed-1B-BF16](https://huggingface.co/nvidia/Nemotron-3-Embed-1B-BF16)  
  作者：nvidia｜点赞：85｜下载：61,708  
  一句话：1B 参数的文本嵌入模型，适合语义检索、向量库与 RAG，下载量很高，体现基础语义能力的强需求。

### 📦 微调与量化（社区微调、GGUF、AWQ）
- [LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V3-GGUF](https://huggingface.co/LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V3-GGUF)  
  作者：LuffyTheFox｜点赞：85｜下载：15,148  
  一句话：Qwen3.6 35B 的社区 uncensored + GGUF 版本，面向本地推理和私有部署，说明“可跑、可控、可改”的模型更受欢迎。

---

## 3) 生态信号
本周最强势的家族是 **openbmb/MiniCPM 机器人线**，具身智能/VLA 正快速升温。开源权重仍是主流方向，但竞争焦点已从“是否开源”转向“是否能落地、能部署”。同时，**GGUF 量化与社区微调**继续活跃，说明开发者对低成本本地推理的需求非常明确。NVIDIA 的嵌入模型高下载则表明，RAG、搜索和向量化基础设施依然是 AI 生态的稳定底座。

---

## 4) 值得探索
1. **[openbmb/MiniCPM-RobotManip](https://huggingface.co/openbmb/MiniCPM-RobotManip)**  
   具身智能最前沿方向之一，适合关注机器人操作与 VLA 能力的团队。

2. **[nvidia/Nemotron-3-Embed-1B-BF16](https://huggingface.co/nvidia/Nemotron-3-Embed-1B-BF16)**  
   实用性很强，适合检索、RAG、语义匹配等生产场景。

3. **[LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V3-GGUF](https://huggingface.co/LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V3-GGUF)**  
   适合想研究社区微调、量化部署和本地大模型体验的用户。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*