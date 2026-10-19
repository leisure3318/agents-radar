# Hugging Face 热门模型日报 2026-10-19

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 2 个模型 | 生成时间: 2026-10-19 01:37 UTC

---

# Hugging Face 热门模型日报
**日期：2026-10-19｜按周点赞数排序｜样本：2 个模型**

## 今日速览

今日样本的关注度集中在**图像生成工作流**与**对话语言模型**两个方向，两个模型的点赞数接近，但下载规模差异明显。Comfy-Org/MOSS-Image 下载量达 354,126，结合 ComfyUI 与单文件扩散模型标签，显示出较强的工具链分发信号。腾讯 Hy-Memory-30B-A3B 获得 189 个点赞，但下载量仅 1,187，呈现“关注度较高、下载规模较小”的特征。需要注意，本榜仅含两个模型，不能据此判断整个 Hub 的主流趋势，也不能将上榜等同于今日首发。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

**[tencent/Hy-Memory-30B-A3B](https://huggingface.co/tencent/Hy-Memory-30B-A3B)**  
- **作者：** tencent
- **点赞：** 189｜**下载：** 1,187
- **一句话说明：** 面向文本生成与对话的语言模型，提供 Transformers、Safetensors 生态标签；当前点赞表现突出，但其记忆能力、架构及性能仍需结合模型卡验证。

### 🎨 多模态与生成（图像、视频、音频、文本到 X）

**[Comfy-Org/MOSS-Image](https://huggingface.co/Comfy-Org/MOSS-Image)**  
- **作者：** Comfy-Org
- **点赞：** 195｜**下载：** 354,126
- **一句话说明：** 基于 OpenMOSS-Team/MOSS-Image-Base 的图像扩散模型衍生发布，带有 ComfyUI 和单文件分发标签，以本次样本最高的点赞数与下载量领跑。

### 🔧 专用模型（代码、数学、医疗、嵌入）

本次样本暂无明确属于此类的模型。

### 📦 微调与量化（社区微调、GGUF、AWQ）

- **MOSS-Image 同时具有微调属性：** `base_model:finetune` 标签表明其与基础模型存在微调衍生关系；已在图像生成类别列出，不重复计数。
- 本次样本未出现明确的 **GGUF、AWQ 或其他量化格式**标签。

## 生态信号

在本次样本中，MOSS 图像模型生态凭借 ComfyUI 适配与单文件分发获得更大的下载规模，腾讯 Hy-Memory 则体现出对话模型方向的关注热度。MOSS-Image 标注 Apache-2.0，为开放许可下的使用与集成提供了积极信号；Hy-Memory 的许可信息未提供，不能据此判断其开放程度。微调活动可见于 MOSS 的衍生关系，但暂无明确量化信号，也不足以比较开放权重与闭源模型的整体走势。

## 值得探索

1. **[Comfy-Org/MOSS-Image](https://huggingface.co/Comfy-Org/MOSS-Image)**  
   适合优先评估 ComfyUI 集成体验、单文件部署便利性，以及相较基础模型的生成效果变化。较高下载量是值得关注的分发信号，但不等同于质量保证。

2. **[tencent/Hy-Memory-30B-A3B](https://huggingface.co/tencent/Hy-Memory-30B-A3B)**  
   适合研究其对话表现，并重点核验模型名称所暗示的记忆机制与参数配置。建议先查看模型卡中的许可证、推理要求和评测，再开展部署测试。

---
*数据说明：点赞、下载及标签均来自所提供的榜单快照；未提供模型卡、发布时间或性能评测，不作额外事实推断。*

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*