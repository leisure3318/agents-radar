# Hugging Face 热门模型日报 2026-07-31

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 5 个模型 | 生成时间: 2026-07-31 01:08 UTC

---

# Hugging Face 热门模型日报（2026-07-31）

## 1) 今日速览
本周 Hugging Face 热榜呈现出两个明显方向：一是 **MoE 大模型继续升温**，尤其是基于 Qwen / DeepSeek 风格架构的指令与思考型模型；二是 **多模态与生成类模型扩散**，从图像理解到 TTS、扩散工作流都有新面孔上榜。  
值得注意的是，榜单里既有 **Preview 版语音模型**，也有 **ComfyUI 单文件扩散模型**，说明社区对“可直接试用、可快速集成”的模型包装越来越买单。  
整体来看，HF 热门不再只由纯文本 LLM 主导，而是明显向 **语音、视觉、生成工作流** 外溢。  

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

- **[amd/Instella-MoE-16B-A3B-Think](https://huggingface.co/amd/Instella-MoE-16B-A3B-Think)**  
  作者：amd ｜ 点赞：94 ｜ 下载：1,315  
  一句话说明：一款面向推理/思考场景的 **MoE 语言模型**，带有 DeepSeek_v3 风格标签，说明“更强推理 + 更低激活参数”的路线仍在持续吸引关注。

- **[EschaLabs/Qwen3.6-35B-A3B-Escha-W2](https://huggingface.co/EschaLabs/Qwen3.6-35B-A3B-Escha-W2)**  
  作者：EschaLabs ｜ 点赞：93 ｜ 下载：201  
  一句话说明：基于 **Qwen3 系列** 的社区版本，采用 MoE 路线与变体微调，体现了 Qwen 生态在开源社区中的持续扩散与二次开发热度。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

- **[Audio8/Audio8-TTS-Preview-0.6b](https://huggingface.co/Audio8/Audio8-TTS-Preview-0.6b)**  
  作者：Audio8 ｜ 点赞：126 ｜ 下载：225  
  一句话说明：一个 **文本转语音（TTS）预览模型**，点赞领先，说明语音生成正在成为 HF 热门赛道之一，且“轻量预览版”更容易获得社区尝鲜。

- **[thinkingmachines/Inkling-Small](https://huggingface.co/thinkingmachines/Inkling-Small)**  
  作者：thinkingmachines ｜ 点赞：113 ｜ 下载：840  
  一句话说明：一款 **图文输入到文本输出** 的多模态小模型，代表“轻量多模态助手”方向，兼顾可用性与传播性。

- **[Comfy-Org/Mage-Flow](https://huggingface.co/Comfy-Org/Mage-Flow)**  
  作者：Comfy-Org ｜ 点赞：97 ｜ 下载：44,714  
  一句话说明：一个面向 **ComfyUI/扩散工作流** 的单文件模型，下载量极高，说明“开箱即用”的生成式模型封装方式非常受欢迎。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

- 本期榜单中 **未出现明确的专用模型**。  
  当前热门更多集中在通用对话、多模态理解与生成式语音/图像工作流。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

- 本期榜单中 **未出现典型 GGUF / AWQ 量化模型**。  
  但像 **[EschaLabs/Qwen3.6-35B-A3B-Escha-W2](https://huggingface.co/EschaLabs/Qwen3.6-35B-A3B-Escha-W2)**、**[amd/Instella-MoE-16B-A3B-Think](https://huggingface.co/amd/Instella-MoE-16B-A3B-Think)** 这类社区派生版本，已经体现出明显的二次微调与变体传播特征。

---

## 3) 生态信号
本周势头最强的仍是 **MoE 语言模型家族**，尤其是沿着 DeepSeek / Qwen 这两条主线的“思考型”变体；同时，**语音生成与图文多模态** 的存在感显著增强。开源权重仍是绝对主流，榜单没有明显闭源模型身影，说明 HF 的热度依旧由可复现、可微调、可本地部署的模型驱动。值得注意的是，**单文件分发、社区适配、预览版模型** 获得了更高传播效率，表明“能快速跑起来”比“参数更大”更容易冲榜。

---

## 4) 值得探索

1. **[amd/Instella-MoE-16B-A3B-Think](https://huggingface.co/amd/Instella-MoE-16B-A3B-Think)**  
   值得研究 MoE 在推理场景中的实际收益，以及与 DeepSeek/Qwen 系路线的差异。

2. **[Audio8/Audio8-TTS-Preview-0.6b](https://huggingface.co/Audio8/Audio8-TTS-Preview-0.6b)**  
   适合关注轻量级 TTS、低成本语音生成与产品化落地。

3. **[Comfy-Org/Mage-Flow](https://huggingface.co/Comfy-Org/Mage-Flow)**  
   对 ComfyUI / 扩散生态用户很有价值，适合观察“模型 + 工作流”式分发的趋势。

如果你愿意，我也可以把这份日报进一步整理成 **适合公众号/飞书/Notion 的排版版本**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*