# Hugging Face 热门模型日报 2026-11-14

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 14 个模型 | 生成时间: 2026-11-14 09:55 UTC

---

# Hugging Face 热门模型日报
**日期：2026-11-14｜样本：14 个热门模型**

> 本报依据所提供的榜单快照整理，未独立核验模型卡与性能；点赞、下载均按原始数据展示，不视为当日或当周新增量。分类以主要用途为准，每个仓库仅列一次。

## 今日速览

MiniMax-H3 是本期最突出的生成模型家族：官方图像模型、ComfyUI 适配仓库及带有同家族标签的视频模型同时入榜，显示关注点正从模型发布延伸至工作流与衍生应用。语音方向也较活跃，覆盖 TTS、端侧 CPU 部署和全双工语音交互，但部分项目下载量极低，实际采用程度仍待观察。GGUF、NVFP4、量化与推测解码相关模型集中出现，说明部署成本和推理效率仍是社区重点。DINOv3 则以 **2,233 次点赞、692,241 次下载**保持较高关注度，表明视觉基础特征模型并未被生成式应用掩盖。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

- **[tencent/Qwen3.8-27B-DSpine-b16](https://huggingface.co/tencent/Qwen3.8-27B-DSpine-b16)**  
  作者：tencent｜点赞：**263**｜下载：**4,332**  
  从标签看，这是面向 Qwen 系列的推测解码草稿模型，关注点在于推理加速，而非直接作为独立对话模型使用。

### 🎨 多模态与生成（图像、视频、音频、文本到 X）

- **[MiniMaxAI/MiniMax-H3-Image](https://huggingface.co/MiniMaxAI/MiniMax-H3-Image)**  
  作者：MiniMaxAI｜点赞：**1,064**｜下载：**437,039**  
  支持文生图与图生图的图像生成模型，是本期生成方向的核心热点，并带动适配与衍生仓库受到关注。

- **[Zyphra/ZONOS3-Mini](https://huggingface.co/Zyphra/ZONOS3-Mini)**  
  作者：Zyphra｜点赞：**321**｜下载：**13,068**  
  面向语音合成的 Mini 版本模型，同时标注 safetensors 与 GGUF，体现社区对语音模型部署便利性的关注。

- **[thinkingmachines/Inkling-2-Small](https://huggingface.co/thinkingmachines/Inkling-2-Small)**  
  作者：thinkingmachines｜点赞：**278**｜下载：**1,064**  
  定位小型视觉语言对话模型，吸引了较多关注，但当前下载量尚不足以证明其已广泛落地。

- **[VideoRebirthAI/hyperflow-h3-flash](https://huggingface.co/VideoRebirthAI/hyperflow-h3-flash)**  
  作者：VideoRebirthAI｜点赞：**286**｜下载：**389,065**  
  接收图像与文本输入的视频生成模型，带有 MiniMax-H3、Diffusers 和 GGUF 标签，体现生成生态向视频及多格式部署延伸。

- **[Cactus-Compute/mirage](https://huggingface.co/Cactus-Compute/mirage)**  
  作者：Cactus-Compute｜点赞：**285**｜下载：**18,959**  
  兼具图像描述、目标检测和零样本检测标签的视觉理解模型，值得关注其面向结构化感知任务的适用性。

- **[ConwayResearch/Underdog-Woof](https://huggingface.co/ConwayResearch/Underdog-Woof)**  
  作者：ConwayResearch｜点赞：**261**｜下载：**10**  
  主打端侧、CPU 场景的 TTS 模型，方向契合低成本本地语音需求，但下载量显示实际使用仍待验证。

- **[adventists-ai/Sophon-Realtime-v1](https://huggingface.co/adventists-ai/Sophon-Realtime-v1)**  
  作者：adventists-ai｜点赞：**253**｜下载：**0**  
  定位全双工语音交互与语音智能体，并关注副语言信息，但零下载意味着尚不能据此判断其可用性或采用程度。

- **[meituan-longcat/LongCat-2.5](https://huggingface.co/meituan-longcat/LongCat-2.5)**  
  作者：meituan-longcat｜点赞：**257**｜下载：**971**  
  支持图文输入及文本生成的多模态模型，关注度高于当前下载规模，能力边界仍需结合模型卡与实测确认。

### 🔧 专用模型（代码、数学、医疗、嵌入等）

- **[facebook/dinov3-vitl16-pretrain-lvd1689m](https://huggingface.co/facebook/dinov3-vitl16-pretrain-lvd1689m)**  
  作者：facebook｜点赞：**2,233**｜下载：**692,241**  
  用于图像特征提取的 DINOv3 视觉骨干，在该样本中点赞数最高，反映视觉表征与下游任务研究仍有强劲需求。

### 📦 微调与量化（社区微调、GGUF、AWQ）

- **[Comfy-Org/MiniMax-H3-Image](https://huggingface.co/Comfy-Org/MiniMax-H3-Image)**  
  作者：Comfy-Org｜点赞：**368**｜下载：**1,257,301**  
  面向 ComfyUI 的 MiniMax-H3 单文件分发版本，下载量为本期样本最高，凸显工作流适配的重要性；仅凭派生标签不能确认其训练改动。

- **[mradermacher/gemma-4-31B-it-ARA-heretic-GGUF](https://huggingface.co/mradermacher/gemma-4-31B-it-ARA-heretic-GGUF)**  
  作者：mradermacher｜点赞：**279**｜下载：**105,256**  
  Gemma 衍生的 GGUF 指令模型，带有 heretic、uncensored 等标签，体现社区对本地部署及行为调整版本的需求，具体改动需查阅模型卡。

- **[Edge0/Edge0-145B-NVFP4](https://huggingface.co/Edge0/Edge0-145B-NVFP4)**  
  作者：Edge0｜点赞：**230**｜下载：**14,134**  
  名称标示为 145B、NVFP4 版本，并带有 MoE 与边缘推理标签，关注点是大型模型低精度部署，但不能据此推定其适合普通消费级设备。

- **[chatrlabs/Qwen-Image-2.1-Uncensored-Omni-Quantized](https://huggingface.co/chatrlabs/Qwen-Image-2.1-Uncensored-Omni-Quantized)**  
  作者：chatrlabs｜点赞：**267**｜下载：**68,096**  
  Qwen-Image 家族的社区量化衍生版本，结合 GGUF 与行为调整定位，展示图像生成社区对低门槛部署和定制输出的兴趣。

## 生态信号

MiniMax-H3 在官方图像、ComfyUI 分发和视频相关仓库中形成联动，Qwen 则横跨图像生成与语言推理加速。GGUF、NVFP4 和推测解码集中出现，说明竞争正从模型能力延伸至部署效率。该样本体现开放权重分发及社区衍生的活跃度，但不能据此断言其相对闭源服务的份额上升；权重可下载也不等于许可证完全开源。量化与行为调整版本仍值得持续跟踪。

## 值得探索

1. **[MiniMaxAI/MiniMax-H3-Image](https://huggingface.co/MiniMaxAI/MiniMax-H3-Image)**  
   **适合生成应用开发者。** 可结合 [ComfyUI 适配仓库](https://huggingface.co/Comfy-Org/MiniMax-H3-Image)，比较官方管线与节点式工作流的部署成本、显存需求及输出一致性。

2. **[tencent/Qwen3.8-27B-DSpine-b16](https://huggingface.co/tencent/Qwen3.8-27B-DSpine-b16)**  
   **适合推理优化研究者。** 重点验证与目标模型、推理框架的兼容性，并测量草稿接受率、端到端延迟和额外显存开销，而非只看理论加速。

3. **[facebook/dinov3-vitl16-pretrain-lvd1689m](https://huggingface.co/facebook/dinov3-vitl16-pretrain-lvd1689m)**  
   **适合视觉检索与感知团队。** 可作为特征提取基线，评估其在相似图检索、聚类及下游任务迁移中的价值。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*