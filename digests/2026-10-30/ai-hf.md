# Hugging Face 热门模型日报 2026-10-30

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 4 个模型 | 生成时间: 2026-10-30 02:53 UTC

---

# Hugging Face 热门模型日报
**日期：2026-10-30｜基于所提供的 4 个模型快照**

## 今日速览

Mistral Large 4 以 **1,228 次点赞**成为本组最受关注的模型，多模态大模型仍是重要关注焦点。LiquidAI 的 LFM3-VL-2B 则代表轻量级视觉语言模型方向，适合关注资源受限部署的开发者进一步研究。语言模型方面，Clover 的 MoE 预览版为稀疏架构探索提供了新候选。与此同时，Unsloth 提供的 Nemotron GGUF 版本以 **90,640 次下载**显著领先，显示量化分发与本地推理具有较强需求，但下载量不能直接等同于实际用户数。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

**[Diffuspace/Clover-35B-A3B-Preview](https://huggingface.co/Diffuspace/Clover-35B-A3B-Preview)**
- **作者：** Diffuspace
- **点赞：** 149｜**下载：** 1,030
- **一句话说明：** 带有 `clover_moe` 标签的文本生成预览模型，其命名暗示总参数与激活参数分离的稀疏设计，是观察 MoE 模型效率路线的候选；具体参数定义与能力需查阅模型卡。

### 🎨 多模态与生成（图像、视频、音频、文本到 X）

**[mistralai/Mistral-Large-4-1T-A52B](https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B)**
- **作者：** mistralai
- **点赞：** 1,228｜**下载：** 278
- **一句话说明：** Mistral 的图文输入、文本输出模型，凭借本组最高点赞量及 vLLM、SGLang 生态标签值得关注，但部署要求与实际兼容性仍需核实。

**[LiquidAI/LFM3-VL-2B](https://huggingface.co/LiquidAI/LFM3-VL-2B)**
- **作者：** LiquidAI
- **点赞：** 167｜**下载：** 4,193
- **一句话说明：** 定位轻量级视觉语言模型，2B 命名与图文任务组合使其成为研究低资源多模态推理的候选，下载量也显示出一定试用热度。

### 🔧 专用模型（代码、数学、医疗、嵌入）

本次快照中**暂无明确归入此类的模型**；不宜仅凭通用模型名称推断其专用能力。

### 📦 微调与量化（社区微调、GGUF、AWQ）

**[unsloth/NVIDIA-Nemotron-3.5-Bolt-E4B-GGUF](https://huggingface.co/unsloth/NVIDIA-Nemotron-3.5-Bolt-E4B-GGUF)**
- **作者：** unsloth
- **点赞：** 150｜**下载：** 90,640
- **一句话说明：** NVIDIA Nemotron 家族的社区 GGUF 分发版本，以本组最高下载量体现本地推理与量化部署需求；具体量化档位、内存占用和运行支持需查看仓库文件。

## 生态信号

本次样本中，Mistral 领跑关注度，Nemotron 的 GGUF 分发领跑下载，LiquidAI 则体现轻量多模态方向的吸引力。大模型与小模型并行，MoE 和量化分别指向计算效率与部署便利。社区 GGUF 活动值得关注，但未见明确的微调证据。Hub 热度反映公开模型生态活跃，却不足以判断开源权重相对闭源的整体走势；权重可用性与商用权限仍需逐项核查。

## 值得探索

1. **LFM3-VL-2B：轻量多模态实验首选**  
   适合优先测试图文问答的质量、延迟与显存占用，检验小模型能否满足具体业务需求。

2. **NVIDIA-Nemotron-3.5-Bolt-E4B-GGUF：本地部署观察对象**  
   适合比较不同量化档位的质量与速度，并确认目标推理工具链的兼容性。

3. **Mistral-Large-4-1T-A52B：大型多模态架构研究对象**  
   关注度突出，可优先研究模型卡、架构和服务框架支持，再判断是否具备实际部署条件。

> **口径说明：** 以上分析仅依据所给快照，未核验模型卡、许可证或性能。原列表第 3、4 项的点赞数与排序存在差异；若排序依据是独立的“周新增点赞”，需另行确认。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*