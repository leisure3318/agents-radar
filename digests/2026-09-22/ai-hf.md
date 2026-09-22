# Hugging Face 热门模型日报 2026-09-22

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 6 个模型 | 生成时间: 2026-09-22 03:50 UTC

---

# Hugging Face 热门模型日报｜2026-09-22

## 1. 今日速览

今日 Hugging Face 热榜呈现出明显的 **Qwen 生态扩散**：从图像生成 GGUF，到文本生成、ASR 相关模型均可见 Qwen 系列技术栈影响。  
图像生成侧，**Qwen-Image-2.1-GGUF** 以 678 点赞领跑，说明社区对本地化、ComfyUI 友好的生成模型需求依然强劲。  
语言模型方面，Altworld、Yandex、小米 MiMo 均有新模型上榜，显示大模型发布仍集中在开源权重、RL 强化和多模态能力演进。  
同时，网易有道的 **Confucius4-R2T2** 进入 ASR 热榜，反映语音识别模型也在向大模型架构融合。

---

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

#### [Altworld/Hemmingway-1](https://huggingface.co/Altworld/Hemmingway-1)
- 作者：Altworld  
- 点赞数：396  
- 下载数：834  
- 一句话说明：基于 Qwen3.5 / Qwen3.8 相关技术栈的文本生成模型，因新发布且具备较高社区关注度登上趋势榜。

#### [XiaomiMiMo/MiMo-V2.6-Flash-RL](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Flash-RL)
- 作者：XiaomiMiMo  
- 点赞数：208  
- 下载数：0  
- 一句话说明：小米 MiMo V2.6 系列的 Flash RL 版本，主打文本生成与多模态方向，体现厂商模型在强化学习优化上的持续投入。

#### [yandex/AliceAI-Foundation-80B-A3B-Base](https://huggingface.co/yandex/AliceAI-Foundation-80B-A3B-Base)
- 作者：yandex  
- 点赞数：208  
- 下载数：676  
- 一句话说明：Yandex 发布的 80B 级基础语言模型，带有 custom_code 标签，适合研究大规模基础模型架构与训练路线。

#### [XiaomiMiMo/MiMo-V2.6-Pro-RL](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL)
- 作者：XiaomiMiMo  
- 点赞数：192  
- 下载数：0  
- 一句话说明：MiMo V2.6 系列的 Pro RL 版本，相比 Flash 版本可能更偏高能力配置，因小米多模态大模型路线受到关注。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

#### [netease-youdao/Confucius4-R2T2](https://huggingface.co/netease-youdao/Confucius4-R2T2)
- 作者：netease-youdao  
- 点赞数：233  
- 下载数：1,864  
- 一句话说明：网易有道推出的自动语音识别模型，标签显示其融合 qwen3_asr 与 Confucius4 架构，反映语音模型向大模型化演进。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

今日榜单中暂无明确面向代码、数学、医疗或嵌入检索的专用模型上榜。值得注意的是，ASR 模型 [netease-youdao/Confucius4-R2T2](https://huggingface.co/netease-youdao/Confucius4-R2T2) 可视为语音识别垂直任务模型，但其已归入多模态与音频生成/理解方向。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

#### [abenzerps/Qwen-Image-2.1-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-GGUF)
- 作者：abenzerps  
- 点赞数：678  
- 下载数：33,232  
- 一句话说明：Qwen-Image-2.1 的 GGUF 版本，面向本地推理与 ComfyUI 工作流，凭借高下载量和低门槛部署成为今日最热模型。

---

## 3. 生态信号

今日热榜最明显的信号是 **Qwen 生态继续扩张**：图像生成、文本生成、ASR 均出现 Qwen 相关标签或衍生模型。开源权重仍是社区关注核心，Yandex、小米、网易有道等机构均选择在 Hugging Face 发布可研究模型。量化方面，GGUF 依然强势，尤其在图像生成和 ComfyUI 场景中，低门槛本地部署显著放大了传播与下载。

---

## 4. 值得探索

1. **[abenzerps/Qwen-Image-2.1-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-GGUF)**  
   最值得优先尝试。点赞和下载均遥遥领先，适合研究 Qwen 图像生成模型的本地化部署、ComfyUI 集成和 GGUF 推理效率。

2. **[yandex/AliceAI-Foundation-80B-A3B-Base](https://huggingface.co/yandex/AliceAI-Foundation-80B-A3B-Base)**  
   80B 级基础模型具备较高研究价值，适合关注大规模开源基础模型、custom code 架构和非美国厂商模型路线的研究者。

3. **[netease-youdao/Confucius4-R2T2](https://huggingface.co/netease-youdao/Confucius4-R2T2)**  
   值得语音方向团队关注。它代表 ASR 模型与大语言模型架构融合的趋势，可用于观察中文语音识别和多模态理解能力的发展。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*