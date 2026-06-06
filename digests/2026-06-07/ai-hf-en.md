# Hugging Face Trending Models Digest 2026-06-07

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-06-06 22:58 UTC

---

# Hugging Face Trending Models Digest — 2026-06-07

## 1) Today’s Highlights
This week is dominated by **large open-weight language models** and **multimodal foundation models**, with DeepSeek, Gemma, Qwen, Nemotron, and Cosmos all showing strong traction. NVIDIA is especially broad across the board, with releases spanning LLMs, ASR, OCR, vision-language, text-to-image, and text-to-video. At the same time, **community quantization and repackaging are clearly driving adoption**: GGUF, NVFP4, FP8, and NF4 variants are pulling substantial downloads. The other major signal is the continued rise of **practical multimodal systems**—models that can locate, read, speak, render, or generate video are drawing sustained attention.

---

## 2) Trending Models

### 🧠 Language Models (LLMs, chat models, instruction-tuned)

- **[deepseek-ai/DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)** — Author: deepseek-ai | Likes: 4,679 | Downloads: 5,510,611  
  A flagship conversational LLM with massive community interest; it’s trending as a top-tier open-weight benchmark for general-purpose reasoning and chat.

- **[deepseek-ai/DeepSeek-V4-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)** — Author: deepseek-ai | Likes: 1,421 | Downloads: 3,436,213  
  A faster/lighter sibling in the DeepSeek V4 family, trending for users who want strong capability with more practical deployment characteristics.

- **[sapientinc/HRM-Text-1B](https://huggingface.co/sapientinc/HRM-Text-1B)** — Author: sapientinc | Likes: 711 | Downloads: 161,627  
  A compact text-generation model built around HRM, attracting attention for efficiency-focused experimentation and smaller-footprint inference.

- **[openbmb/MiniCPM5-1B](https://huggingface.co/openbmb/MiniCPM5-1B)** — Author: openbmb | Likes: 774 | Downloads: 100,575  
  A small but capable text model that’s trending because of its strong appeal for edge and local deployment.

- **[google/gemma-4-12B-it](https://huggingface.co/google/gemma-4-12B-it)** — Author: google | Likes: 613 | Downloads: 315,131  
  Google’s instruction-tuned Gemma 4 release, trending for its unified any-to-any direction and strong developer interest.

- **[LiquidAI/LFM2.5-8B-A1B](https://huggingface.co/LiquidAI/LFM2.5-8B-A1B)** — Author: LiquidAI | Likes: 531 | Downloads: 95,440  
  A compact MoE-style language model that’s drawing interest for efficiency and practical active-parameter sizing.

- **[google/gemma-4-12B](https://huggingface.co/google/gemma-4-12B)** — Author: google | Likes: 374 | Downloads: 84,549  
  The base Gemma 4 12B model is trending as a foundation for customization, fine-tuning, and multimodal experimentation.

- **[JetBrains/Mellum2-12B-A2.5B-Thinking](https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking)** — Author: JetBrains | Likes: 239 | Downloads: 16,395  
  A thinking-oriented conversational model that stands out for reasoning-focused usage and developer curiosity.

- **[nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16)** — Author: nvidia | Likes: 142 | Downloads: 47,285  
  NVIDIA’s massive BF16 checkpoint is trending as a frontier-scale open release for organizations exploring large-scale inference.

---

### 🎨 Multimodal & Generation (image, video, audio, text-to-X)

- **[nvidia/LocateAnything-3B](https://huggingface.co/nvidia/LocateAnything-3B)** — Author: nvidia | Likes: 1,449 | Downloads: 111,078  
  A vision-language grounding model for locating objects and regions in images; it’s trending for practical visual search and assistant workflows.

- **[stepfun-ai/Step-3.7-Flash](https://huggingface.co/stepfun-ai/Step-3.7-Flash)** — Author: stepfun-ai | Likes: 342 | Downloads: 38,716  
  A fast multimodal model for image-text-to-text tasks, gaining traction for general vision-language usefulness.

- **[ideogram-ai/ideogram-4-fp8](https://huggingface.co/ideogram-ai/ideogram-4-fp8)** — Author: ideogram-ai | Likes: 303 | Downloads: 2,818  
  An FP8 text-to-image checkpoint that’s trending because users want higher-throughput image generation with quality preserved.

- **[ideogram-ai/ideogram-4-nf4](https://huggingface.co/ideogram-ai/ideogram-4-nf4)** — Author: ideogram-ai | Likes: 210 | Downloads: 2,671  
  A lower-memory NF4 variant of Ideogram 4, popular among users optimizing for deployment efficiency.

- **[nvidia/Cosmos3-Nano](https://huggingface.co/nvidia/Cosmos3-Nano)** — Author: nvidia | Likes: 182 | Downloads: 24,820  
  A compact Cosmos3 omni model, trending as a lightweight entry point into NVIDIA’s multimodal generation stack.

- **[nvidia/Cosmos3-Super](https://huggingface.co/nvidia/Cosmos3-Super)** — Author: nvidia | Likes: 147 | Downloads: 20,403  
  A larger Cosmos3 release attracting attention for broader omni-generation capabilities across modalities.

- **[nvidia/Cosmos3-Super-Text2Image](https://huggingface.co/nvidia/Cosmos3-Super-Text2Image)** — Author: nvidia | Likes: 119 | Downloads: 1,634  
  The text-to-image variant in the Cosmos3 family, trending as part of NVIDIA’s expanding multimodal generation lineup.

- **[nvidia/Cosmos3-Super-Image2Video](https://huggingface.co/nvidia/Cosmos3-Super-Image2Video)** — Author: nvidia | Likes: 109 | Downloads: 1,295  
  An image-to-video model that is drawing interest for animation and video synthesis workflows.

- **[ByteDance/Bernini-R](https://huggingface.co/ByteDance/Bernini-R)** — Author: ByteDance | Likes: 149 | Downloads: 223  
  A fresh image-text-to-video renderer, trending for its research novelty and early community curiosity.

- **[meituan-longcat/LongCat-Video-Avatar-1.5](https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.5)** — Author: meituan-longcat | Likes: 525 | Downloads: 1,806  
  An audio-text-to-video avatar model, notable for creator-focused avatar generation and interactive media use cases.

- **[SulphurAI/Sulphur-2-base](https://huggingface.co/SulphurAI/Sulphur-2-base)** — Author: SulphurAI | Likes: 1,579 | Downloads: 1,704,964  
  A text-to-video base model distributed in accessible formats, trending strongly due to huge download volume and strong video-generation interest.

- **[bosonai/higgs-audio-v3-tts-4b](https://huggingface.co/bosonai/higgs-audio-v3-tts-4b)** — Author: bosonai | Likes: 151 | Downloads: 2,184  
  A text-to-speech model drawing attention for audio synthesis and multimodal voice applications.

- **[MisoLabs/MisoTTS](https://huggingface.co/MisoLabs/MisoTTS)** — Author: MisoLabs | Likes: 129 | Downloads: 0  
  A speech-synthesis model trending as a fresh TTS release for voice generation experimentation.

- **[google/magenta-realtime-2](https://huggingface.co/google/magenta-realtime-2)** — Author: google | Likes: 108 | Downloads: 9,394  
  A text-to-audio model that stands out for real-time music/audio generation interest.

---

### 🔧 Specialized Models (code, math, medical, embeddings, OCR, ASR, task-specific)

- **[nvidia/nemotron-3.5-asr-streaming-0.6b](https://huggingface.co/nvidia/nemotron-3.5-asr-streaming-0.6b)** — Author: nvidia | Likes: 217 | Downloads: 1,380  
  A streaming speech-recognition model, trending for low-latency ASR use cases and real-time deployment.

- **[PaddlePaddle/PaddleOCR-VL-1.6](https://huggingface.co/PaddlePaddle/PaddleOCR-VL-1.6)** — Author: PaddlePaddle | Likes: 257 | Downloads: 8,365  
  A document/OCR-focused vision-language model, popular for text extraction and document intelligence.

- **[nvidia/PiD](https://huggingface.co/nvidia/PiD)** — Author: nvidia | Likes: 312 | Downloads: 972  
  A diffusion-based image-to-image model focused on super-resolution and restoration, trending for practical enhancement workflows.

---

### 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, FP8/NF4/NVFP4)

- **[unsloth/gemma-4-12b-it-GGUF](https://huggingface.co/unsloth/gemma-4-12b-it-GGUF)** — Author: unsloth | Likes: 420 | Downloads: 458,174  
  A GGUF-packaged Gemma 4 instruction model, trending because it makes a strong multimodal checkpoint easy to run locally.

- **[HauhauCS/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive](https://huggingface.co/HauhauCS/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive)** — Author: HauhauCS | Likes: 1,486 | Downloads: 2,771,843  
  An aggressive uncensored community variant of Qwen3.6, trending hard because of massive download demand and open local-chat interest.

- **[nvidia/Qwen3.6-35B-A3B-NVFP4](https://huggingface.co/nvidia/Qwen3.6-35B-A3B-NVFP4)** — Author: nvidia | Likes: 196 | Downloads: 1,015,381  
  A deployment-optimized NVFP4 checkpoint, trending for efficient inference on a large MoE-style model.

- **[nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4)** — Author: nvidia | Likes: 117 | Downloads: 17,225  
  A quantized frontier-scale Nemotron release, notable for making an enormous model more practical to serve.

- **[ideogram-ai/ideogram-4-fp8](https://huggingface.co/ideogram-ai/ideogram-4-fp8)** — Author: ideogram-ai | Likes: 303 | Downloads: 2,818  
  FP8 packaging is the headline here: a high-quality image generator made more inference-friendly.

- **[ideogram-ai/ideogram-4-nf4](https://huggingface.co/ideogram-ai/ideogram-4-nf4)** — Author: ideogram-ai | Likes: 210 | Downloads: 2,671  
  The NF4 variant reinforces demand for lower-memory, easier-to-run image generation checkpoints.

- **[SulphurAI/Sulphur-2-base](https://huggingface.co/SulphurAI/Sulphur-2-base)** — Author: SulphurAI | Likes: 1,579 | Downloads: 1,704,964  
  Distributed with GGUF/quantized-friendly packaging, it’s trending as a community-accessible way into video generation.

---

## 3) Ecosystem Signal
The strongest momentum is clearly in **frontier open-weight model families**: DeepSeek, Gemma 4, Qwen, Nemotron, MiniCPM, LFM2.5, and Cosmos are all visible, suggesting that users are actively comparing large models they can actually deploy or customize. **Multimodal is no longer a niche**—the trend now spans visual grounding, OCR, ASR, TTS, text-to-image, and text-to-video in the same week. NVIDIA stands out for breadth, not just scale, with releases across almost every major modality. Open-weight models still dominate likes and downloads, while proprietary or semi-proprietary releases like Google Gemma and Ideogram maintain strong visibility through quality and brand trust. Finally, quantization is a major adoption signal: GGUF, FP8, NF4, and NVFP4 variants show that the ecosystem is optimizing aggressively for local inference, lower cost, and faster iteration.

---

## 4) Worth Exploring

1. **[deepseek-ai/DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)**  
   Best “baseline” model to study this week: it has the strongest traction and serves as a reference point for open-weight frontier LLM quality.

2. **[google/gemma-4-12B-it](https://huggingface.co/google/gemma-4-12B-it)**  
   Worth exploring for its unified any-to-any direction and because it represents where mainstream multimodal instruction tuning is heading.

3. **[nvidia/LocateAnything-3B](https://huggingface.co/nvidia/LocateAnything-3B)**  
   A strong candidate for practical multimodal experimentation, especially if you care about grounding, visual assistants, or search-by-region workflows.

---
*This digest is auto-generated by [agents-radar](https://github.com/leisure3318/agents-radar).*