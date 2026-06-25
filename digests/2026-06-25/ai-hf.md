# Hugging Face 热门模型日报 2026-06-25

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 4 个模型 | 生成时间: 2026-06-25 01:34 UTC

---

# Hugging Face 热门模型日报  
**日期：2026-06-25**

## 1) 今日速览
今天的榜单明显呈现出“两条主线”：一条是以 **Krea-2** 为代表的高关注图像生成模型，说明文生图仍是最容易引爆社区热度的方向；另一条是 **Qwen** 体系持续向 Agent、多模态与本地可部署生态延伸，体现国产开源模型家族的持续扩张。  
此外，**ComfyUI** 生态中的模型打包与适配版本继续获得关注，说明“模型原生能力”之外，**可用性与工作流集成**也在成为热门。  
最后，**GGUF/llama.cpp** 这类量化分发形态下载量很高，表明社区对**本地推理、低门槛部署**的需求依然强劲。

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

#### 1. [Qwen/Qwen-AgentWorld-35B-A3B](https://huggingface.co/Qwen/Qwen-AgentWorld-35B-A3B)
- **作者**：Qwen  
- **点赞**：147  
- **下载**：223  
- **一句话说明**：这是 Qwen 系列面向 **Agent/多模态世界理解** 的大模型版本，点赞高说明社区对“LLM + Agent + 多模态”的下一代能力非常买账。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

#### 2. [krea/Krea-2-Raw](https://huggingface.co/krea/Krea-2-Raw)
- **作者**：krea  
- **点赞**：157  
- **下载**：1,205  
- **一句话说明**：一款 **text-to-image** 图像生成模型，点赞登顶，说明高质量文生图仍是 Hugging Face 上最强吸引力的方向之一。

#### 3. [Comfy-Org/Krea-2](https://huggingface.co/Comfy-Org/Krea-2)
- **作者**：Comfy-Org  
- **点赞**：88  
- **下载**：10  
- **一句话说明**：这是面向 **ComfyUI** 的 Krea-2 生态适配/打包版本，反映出热门模型正在快速进入“可直接工作流化”的社区分发阶段。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

#### 今日样本中暂无典型独立专用模型
- **补充观察**：榜单里更接近专用场景的是 **Qwopus3.6-27B-Coder-Compat-MTP-GGUF**，但它更偏向“量化分发 + 代码/视觉兼容”的社区落地版本，因此放入下方“微调与量化”。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

#### 4. [Jackrong/Qwopus3.6-27B-Coder-Compat-MTP-GGUF](https://huggingface.co/Jackrong/Qwopus3.6-27B-Coder-Compat-MTP-GGUF)
- **作者**：Jackrong  
- **点赞**：83  
- **下载**：10,867  
- **一句话说明**：这是一个 **GGUF + llama.cpp** 友好的社区量化版本，下载量远高于点赞，典型反映了“能本地跑、易部署、可直接用”带来的真实需求。

---

## 3) 生态信号
当前势头最强的家族是 **Krea** 与 **Qwen**：前者代表高质量文生图的持续热度，后者则在 Agent、多模态与大参数模型方向上不断扩展。整体上，榜单同时体现出 **开源/开放权重模型** 与 **闭源或许可更严格模型** 并行受欢迎；但从下载量看，社区更偏好可本地部署、可直接集成的版本。量化与生态打包活动非常活跃，尤其是 **GGUF、llama.cpp、ComfyUI** 相关发布，说明“模型能力”正在快速转化为“实际可用性”。

---

## 4) 值得探索
1. **[krea/Krea-2-Raw](https://huggingface.co/krea/Krea-2-Raw)**  
   文生图热度最高，适合关注最新图像生成质量与风格表现。

2. **[Qwen/Qwen-AgentWorld-35B-A3B](https://huggingface.co/Qwen/Qwen-AgentWorld-35B-A3B)**  
   值得研究 Qwen 系列如何把 Agent 能力与多模态理解结合起来。

3. **[Jackrong/Qwopus3.6-27B-Coder-Compat-MTP-GGUF](https://huggingface.co/Jackrong/Qwopus3.6-27B-Coder-Compat-MTP-GGUF)**  
   适合关注本地推理、量化落地与真实部署场景，下载量很能说明问题。  

如果你愿意，我也可以把这份日报进一步整理成 **表格版** 或 **适合公众号发布的简报版**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*