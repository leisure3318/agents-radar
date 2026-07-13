# Hugging Face 热门模型日报 2026-07-13

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 4 个模型 | 生成时间: 2026-07-13 01:10 UTC

---

# Hugging Face 热门模型日报（2026-07-13）

## 1) 今日速览
今天榜单的核心信号很明确：**Qwen 系模型家族继续领跑**，且热度已经从“基座能力”扩展到“量化部署”和“高效推理”两条线。  
其中 **unsloth/Qwen3.6-27B-NVFP4** 以最高点赞和超高下载量，显示出社区对“可直接落地”的多模态模型需求极强。  
另一方面，**bottlecapai/ThinkingCap-Qwen3.6-27B-GGUF** 的下载量也非常亮眼，说明 GGUF/llama.cpp 生态仍然是本地部署的重要入口。  
此外，榜单还出现了 **image-to-video** 和 **text-to-speech** 方向的新面孔，表明生成式模型的热门赛道正在从纯文本进一步向视频与语音外延。  

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
> 本日榜单中未出现纯文本 LLM 独立上榜项，主要热度集中在多模态与量化部署版本。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

#### 1. [robbyant/lingbot-world-v2-14b-causal-fast](https://huggingface.co/robbyant/lingbot-world-v2-14b-causal-fast)
- 作者：robbyant
- 点赞：85
- 下载：0
- 一句话说明：这是一个 **image-to-video / World Model** 方向模型，主打从单张图像生成动态视频内容；上榜说明社区对“世界模型”与视频生成的关注持续升温。

#### 2. [nineninesix/gepard-1.0](https://huggingface.co/nineninesix/gepard-1.0)
- 作者：nineninesix
- 点赞：85
- 下载：2,263
- 一句话说明：这是一个 **text-to-speech** 模型，标签显示其与 `qwen3_5_text` 相关，说明它可能借助文本大模型能力增强语音生成；热度来自“文本能力 + 语音输出”的实用型多模态路线。

#### 3. [unsloth/Qwen3.6-27B-NVFP4](https://huggingface.co/unsloth/Qwen3.6-27B-NVFP4)
- 作者：unsloth
- 点赞：179
- 下载：1,378,663
- 一句话说明：这是一个 **image-text-to-text** 的 Qwen3.6 量化/优化版本，兼顾多模态推理与高效部署；高点赞、高下载反映出它是当前最受欢迎的“强能力 + 易落地”组合之一。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）
> 本日榜单中未见典型代码、数学、医疗或嵌入类专用模型上榜。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

#### 1. [bottlecapai/ThinkingCap-Qwen3.6-27B-GGUF](https://huggingface.co/bottlecapai/ThinkingCap-Qwen3.6-27B-GGUF)
- 作者：bottlecapai
- 点赞：83
- 下载：312,299
- 一句话说明：这是一个基于 **Qwen3.6-27B** 的 **GGUF** 版本，面向本地推理和 llama.cpp 生态；高下载量说明“可本地跑、易集成”的量化模型仍是社区刚需。

#### 2. [unsloth/Qwen3.6-27B-NVFP4](https://huggingface.co/unsloth/Qwen3.6-27B-NVFP4)
- 作者：unsloth
- 点赞：179
- 下载：1,378,663
- 一句话说明：这是一个面向高效推理的 **NVFP4** 量化/优化模型，兼顾性能与部署效率；其热度体现了社区对“大模型轻量化”的强烈偏好。

#### 3. [robbyant/lingbot-world-v2-14b-causal-fast](https://huggingface.co/robbyant/lingbot-world-v2-14b-causal-fast)
- 作者：robbyant
- 点赞：85
- 下载：0
- 一句话说明：标题中的 `fast` 与 `causal` 暗示其在推理效率或生成链路上做了优化；虽然下载暂时为 0，但作为新发布模型已进入关注视野。

---

## 3) 生态信号
Qwen 系列仍是当前开源模型生态的绝对热点，尤其在 **多模态、量化和高效推理** 三个方向持续扩张。开源权重明显压过闭源方案：社区更愿意追捧可下载、可本地部署、可二次开发的模型。值得注意的是，**GGUF、NVFP4、fast** 等标签频繁出现，说明“能跑起来、跑得快”已成为模型热度的重要决定因素。

---

## 4) 值得探索

1. **[unsloth/Qwen3.6-27B-NVFP4](https://huggingface.co/unsloth/Qwen3.6-27B-NVFP4)**  
   理由：下载量最高，说明可用性和社区认可度都很强；适合优先研究其多模态能力与部署效率。

2. **[bottlecapai/ThinkingCap-Qwen3.6-27B-GGUF](https://huggingface.co/bottlecapai/ThinkingCap-Qwen3.6-27B-GGUF)**  
   理由：GGUF 版本对本地推理友好，适合验证 Qwen3.6 在轻量环境中的表现。

3. **[nineninesix/gepard-1.0](https://huggingface.co/nineninesix/gepard-1.0)**  
   理由：TTS 模型结合文本大模型标签，代表“语音生成 + 语言能力”的融合趋势，值得关注其架构设计。  

如果你愿意，我可以把这份日报进一步整理成 **更像媒体稿的版本**，或者做成 **适合公众号/Notion 发布的排版版**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*