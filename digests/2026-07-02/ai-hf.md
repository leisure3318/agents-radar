# Hugging Face 热门模型日报 2026-07-02

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 2 个模型 | 生成时间: 2026-07-02 01:34 UTC

---

# Hugging Face 热门模型日报（2026-07-02）

## 1）今日速览
今天 Hugging Face 热门榜上，**多模态/Agent 能力**继续成为关注焦点，两款模型都带有视觉相关标签，说明“能看图、能对话、能执行任务”的模型仍在升温。  
同时，榜单也反映出社区对**高性能开源权重**与**本地可部署版本**的强需求：一款偏前沿能力，一款偏 GGUF/llama.cpp 落地。  
从点赞与下载结构看，趋势不仅在“模型更强”，也在“更容易被用起来”。  
总体而言，2026 年中旬的模型生态正从单一文本生成，快速走向**多模态 + 工具化 + 端侧部署**。

---

## 2）热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
- **[InternScience/Agents-A1](https://huggingface.co/InternScience/Agents-A1)**  
  作者：InternScience ｜ 点赞：140 ｜ 下载：511  
  一句话说明：这是一款偏 **Agent/指令执行** 方向的生成模型，结合了 **Qwen3.5-MoE** 与多模态标签，说明它不仅能聊，还可能擅长任务型推理与工具协作，因此在趋势榜上表现突出。

### 🎨 多模态与生成（图像、视频、音频、文本到X）
- **[InternScience/Agents-A1](https://huggingface.co/InternScience/Agents-A1)**  
  作者：InternScience ｜ 点赞：140 ｜ 下载：511  
  一句话说明：模型带有 **image-text-to-text** 标签，说明其具备视觉理解与文本生成的多模态能力，符合当前“看图理解 + 任务执行”的热门方向。

- **[Jackrong/Qwopus3.6-35B-A3B-Coder-MTP-GGUF](https://huggingface.co/Jackrong/Qwopus3.6-35B-A3B-Coder-MTP-GGUF)**  
  作者：Jackrong ｜ 点赞：100 ｜ 下载：12,635  
  一句话说明：这是一个面向 **视觉输入与代码/文本生成** 的多模态模型，热门原因不仅在于能力组合，更在于其 **GGUF** 形态极利于本地部署与推理，带动了大量下载。

### 🔧 专用模型（代码、数学、医疗、嵌入）
- **[Jackrong/Qwopus3.6-35B-A3B-Coder-MTP-GGUF](https://huggingface.co/Jackrong/Qwopus3.6-35B-A3B-Coder-MTP-GGUF)**  
  作者：Jackrong ｜ 点赞：100 ｜ 下载：12,635  
  一句话说明：模型名中的 **Coder** 已明确指向代码能力，适合开发、补全、推理类任务；高下载量说明开发者社区对“可用的代码模型”需求持续强劲。

### 📦 微调与量化（社区微调、GGUF、AWQ）
- **[Jackrong/Qwopus3.6-35B-A3B-Coder-MTP-GGUF](https://huggingface.co/Jackrong/Qwopus3.6-35B-A3B-Coder-MTP-GGUF)**  
  作者：Jackrong ｜ 点赞：100 ｜ 下载：12,635  
  一句话说明：该模型采用 **GGUF** 发布，显著降低了本地部署门槛；“高下载、相对中等点赞”的结构也很典型，代表量化版模型在实用层面被快速采用。

---

## 3）生态信号
当前势头最旺的是 **Qwen 系列相关变体** 与 **多模态/Agent 型模型**：前者继续作为社区改造和二次开发的底座，后者则承接“看图、写代码、执行任务”的新需求。开源权重仍明显强于闭源生态的可参与度，尤其在 Hugging Face 上，社区更偏好能下载、能改造、能部署的模型。值得注意的是，**GGUF** 这类量化发布形式下载量非常高，说明“本地跑得动”已成为模型热度的重要驱动力。

---

## 4）值得探索
1. **[InternScience/Agents-A1](https://huggingface.co/InternScience/Agents-A1)**  
   值得研究其 Agent 能力与多模态融合方式，适合关注任务型模型演进的人。

2. **[Jackrong/Qwopus3.6-35B-A3B-Coder-MTP-GGUF](https://huggingface.co/Jackrong/Qwopus3.6-35B-A3B-Coder-MTP-GGUF)**  
   值得尝试本地部署与代码场景测试，尤其适合看 GGUF 量化后的实际可用性。

3. **[Jackrong/Qwopus3.6-35B-A3B-Coder-MTP-GGUF](https://huggingface.co/Jackrong/Qwopus3.6-35B-A3B-Coder-MTP-GGUF)**  
   适合进一步观察多模态代码模型在“视觉理解 + 编程”任务中的表现与边界。

如果你愿意，我也可以把这份日报继续整理成**适合公众号发布的版本**，或者输出成**表格版 Markdown**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*