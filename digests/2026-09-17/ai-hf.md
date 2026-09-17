# Hugging Face 热门模型日报 2026-09-17

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-09-17 03:56 UTC

---

# Hugging Face 热门模型日报  
日期：2026-09-17

## 1. 今日速览

今日 Hugging Face 热榜呈现出两个明显方向：一是 **Qwen 系模型的社区量化与高效推理版本持续活跃**，二是 **多模态 / 视觉语言模型仍是关注焦点**。  
`ukisai/Swift-Qwen3.8-27B-GGUF` 以 GGUF 形态获得高下载量，说明本地部署与 llama.cpp 生态需求旺盛。  
`Comfy-Org/YuE2` 则体现了 ComfyUI 工作流和生成式内容工具链的持续扩张。  
同时，`TaichuAI/ZDTaichu5.0-9B` 代表国产多模态模型在空间推理、视觉语言理解方向继续推进。

---

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

暂无纯语言模型上榜。今日榜单更偏向 **多模态模型** 与 **量化 / 推理优化版本**。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

#### [Comfy-Org/YuE2](https://huggingface.co/Comfy-Org/YuE2)

- 作者：Comfy-Org  
- 点赞数：152  
- 下载数：59,231  
- 一句话说明：面向 ComfyUI 生态的生成式模型资源，基于 SheetSage2 相关权重，因与工作流工具链结合紧密、下载量高而进入趋势榜。

#### [TaichuAI/ZDTaichu5.0-9B](https://huggingface.co/TaichuAI/ZDTaichu5.0-9B)

- 作者：TaichuAI  
- 点赞数：155  
- 下载数：213  
- 一句话说明：9B 规模的视觉语言多模态模型，强调图文理解与空间推理能力，代表国产多模态模型的新进展。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

暂无明显的代码、数学、医疗或嵌入类专用模型上榜。今日更值得关注的是 **视觉语言模型** 和 **社区量化部署形态**。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

#### [ukisai/Swift-Qwen3.8-27B-GGUF](https://huggingface.co/ukisai/Swift-Qwen3.8-27B-GGUF)

- 作者：ukisai  
- 点赞数：189  
- 下载数：55,309  
- 一句话说明：基于 Qwen3.8 / Qwen3.5 相关体系的 GGUF 量化版本，适配 llama.cpp，本地高效推理需求推动其热度上升。

---

## 3. 生态信号

今日榜单显示，**Qwen 系与国产多模态模型家族仍具上升势头**：一方面，Qwen 衍生的 GGUF 版本说明社区对本地部署、低成本推理和边缘设备运行的需求持续增长；另一方面，TaichuAI 的视觉语言模型表明中文生态正在继续强化多模态理解与空间推理能力。相比闭源 API，开源权重与可下载模型在开发者群体中仍有强吸引力，尤其是能接入 llama.cpp、ComfyUI 等成熟工具链的模型。值得注意的是，GGUF、ComfyUI 单文件模型、社区微调版本正在成为模型传播的重要形态。

---

## 4. 值得探索

1. **[ukisai/Swift-Qwen3.8-27B-GGUF](https://huggingface.co/ukisai/Swift-Qwen3.8-27B-GGUF)**  
   适合关注本地 LLM / 多模态推理的开发者，GGUF 格式便于在 llama.cpp 生态中测试不同量化精度与推理效率。

2. **[TaichuAI/ZDTaichu5.0-9B](https://huggingface.co/TaichuAI/ZDTaichu5.0-9B)**  
   值得用于研究中文多模态理解、图文问答和空间推理能力，尤其适合对国产 VLM 进展感兴趣的团队。

3. **[Comfy-Org/YuE2](https://huggingface.co/Comfy-Org/YuE2)**  
   适合 ComfyUI 用户和生成式内容工作流研究者探索，下载量较高，说明其在实际创作工具链中可能已有较强需求。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*