# Hugging Face 热门模型日报 2026-06-20

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 9 个模型 | 生成时间: 2026-06-20 01:37 UTC

---

# Hugging Face 热门模型日报（2026-06-20）

## 今日速览
今天榜单最亮眼的是 **zai-org/GLM-5.2**，以明显优势领跑，说明大模型主干版本仍是社区关注焦点。  
同时，**GLM-5.2-FP8** 和 **GLM-5.2-GGUF** 一起上榜，显示同一模型家族的不同部署形态正在同步升温。  
此外，**Qwen 系**、**Gemma 系** 的社区微调/量化版本持续活跃，说明“可本地跑、可快速试”的模型更容易获得关注。  
另一条值得注意的趋势是：**数学、agentic、TTS、图文理解** 等细分方向都有新模型进入热榜，生态正在从通用聊天向“可落地任务”扩展。

---

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

- **[zai-org/GLM-5.2](https://huggingface.co/zai-org/GLM-5.2)**  
  作者：zai-org｜点赞：1,537｜下载：11,871  
  一句话：GLM 系列主版本，属于通用对话/生成型大模型，是本周最受关注的基础模型发布。

- **[WeiboAI/VibeThinker-3B](https://huggingface.co/WeiboAI/VibeThinker-3B)**  
  作者：WeiboAI｜点赞：459｜下载：12,148  
  一句话：3B 级小模型，标签指向数学能力，说明轻量化推理/解题模型仍然很有热度。

- **[lordx64/Qwable-v1](https://huggingface.co/lordx64/Qwable-v1)**  
  作者：lordx64｜点赞：130｜下载：1,865  
  一句话：基于 Qwen3.5 MoE 的图文模型，兼具多模态与生成能力，因此在社区里获得较高关注。

- **[Mia-AiLab/Qwable-3.6-27b](https://huggingface.co/Mia-AiLab/Qwable-3.6-27b)**  
  作者：Mia-AiLab｜点赞：104｜下载：16,105  
  一句话：Qwen3.6 27B 级社区版本，虽然任务字段未明确，但明显属于大参数量开源衍生模型，兼顾可玩性和本地部署价值。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

- **[lordx64/Qwable-v1](https://huggingface.co/lordx64/Qwable-v1)**  
  作者：lordx64｜点赞：130｜下载：1,865  
  一句话：该模型支持 image-text-to-text，是榜单里少见的图文理解/多模态生成模型，属于跨模态热门方向。

- **[owensong/Inflect-Nano-v1](https://huggingface.co/owensong/Inflect-Nano-v1)**  
  作者：owensong｜点赞：123｜下载：0  
  一句话：超小型文本转语音模型，体现出音频生成正在向“轻量、可嵌入、易部署”方向演进。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

- **[WeiboAI/VibeThinker-3B](https://huggingface.co/WeiboAI/VibeThinker-3B)**  
  作者：WeiboAI｜点赞：459｜下载：12,148  
  一句话：标签明确指向 math，说明高性价比数学推理模型仍然是热门细分赛道。

- **[yuxinlu1/gemma-4-12B-agentic-fable5-composer2.5-v2-3.5x-tau2-GGUF](https://huggingface.co/yuxinlu1/gemma-4-12B-agentic-fable5-composer2.5-v2-3.5x-tau2-GGUF)**  
  作者：yuxinlu1｜点赞：102｜下载：0  
  一句话：Gemma 4 的 agentic/coding 定向版本，偏向终端与编程工作流，属于“任务导向型”模型的典型代表。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

- **[unsloth/GLM-5.2-GGUF](https://huggingface.co/unsloth/GLM-5.2-GGUF)**  
  作者：unsloth｜点赞：181｜下载：8,392  
  一句话：GLM-5.2 的 GGUF 量化版，方便本地推理与 llama.cpp 生态使用，说明社区正在迅速补齐部署版本。

- **[zai-org/GLM-5.2-FP8](https://huggingface.co/zai-org/GLM-5.2-FP8)**  
  作者：zai-org｜点赞：105｜下载：93,927  
  一句话：FP8 精度版本下载量极高，表明企业/开发者对高性能推理部署的需求非常强。

- **[bytkim/Qwen3.6-27B-MTP-pi-tune-GGUF](https://huggingface.co/bytkim/Qwen3.6-27B-MTP-pi-tune-GGUF)**  
  作者：bytkim｜点赞：86｜下载：8,138  
  一句话：Qwen3.6 27B 的社区调优 GGUF 版本，体现出“基座模型 + 低门槛量化 + 轻微微调”的热门组合。

---

## 生态信号
本周势头最强的是 **GLM-5.2 家族**，同一基座同时覆盖原版、FP8、GGUF，多形态分发非常成熟；**Qwen 系**与 **Gemma 系**的社区衍生也持续活跃。整体上，开源权重仍是绝对主流，且用户更偏好可本地部署的量化版本。值得注意的是，量化不只是“压缩”，而是已经成为模型传播与试用的重要入口。

---

## 值得探索

1. **[zai-org/GLM-5.2](https://huggingface.co/zai-org/GLM-5.2)**  
   领跑榜单，适合直接观察新一代通用大模型的能力边界。

2. **[WeiboAI/VibeThinker-3B](https://huggingface.co/WeiboAI/VibeThinker-3B)**  
   3B 小模型却有很高关注度，适合研究“小模型如何做强数学推理”。

3. **[unsloth/GLM-5.2-GGUF](https://huggingface.co/unsloth/GLM-5.2-GGUF)**  
   代表了“热门基座 + 社区量化”的最佳实践，适合本地部署与生态研究。

如果你愿意，我还可以把这份日报进一步整理成 **适合公众号发布的版式** 或 **表格版 Markdown**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*