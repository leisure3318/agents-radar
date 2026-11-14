# AI Skills 新上榜日报 2026-11-14

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-11-14 09:55 UTC

---

# AI Skills 新上榜日报｜2026-11-14

**今日发现**：本期 5 个首次进入本日报的条目中，视频相关 Skill 占了 3 个，覆盖风格模板制作、Remotion 编程式视频和多模型视频生成；另有网站构建与 X 自动化方向。Trending 反映 24 小时趋势，Hot 反映小时爆发，以下安装量均为给定榜单展示值，**不是今日新增**。

## [website-builder](https://www.skills.sh/flowkit-labs/skills/website-builder)
- **它做什么**：当前仅有名称和榜单资料，未提供原始说明，也未读取到 SKILL.md。无法据此确认它的网站生成流程、技术栈或实际交付物。
- **适合谁用**：可供关注网站构建的开发者进一步考察；具体适用场景和前置条件需要查看来源仓库 `flowkit-labs/skills`。
- **为什么现在值得看**：进入 Trending（24 小时趋势），展示安装量为 **14,669**；热度值得关注，但资料不足以判断其具体能力。
- **如何使用**：请在原页面查看安装方式。
- **注意**：未读取到 SKILL.md，请先审阅来源仓库。

## [style-sampling](https://www.skills.sh/heygen-com/hyperframes/style-sampling)
- **它做什么**：基于 HyperFrames 的成熟风格模板，用用户的新主题制作一集视频，覆盖拼贴解说、中文财经解说、动画科学解说、3D 品牌解说和 3D 真实犯罪五类。工作流不仅参考画面，还要求延续模板的结构、节奏、图形和声音设计，并使用用户自己的声音；财经模板还需要用户本人出镜素材。拉取模板后，按对应系列的 `REMIX.md` 制作，分镜和草稿都要交由用户确认。
- **适合谁用**：希望按固定节目风格持续制作内容的创作者、视频团队和开发者。前置条件是 HyperFrames 登录状态、**Pro 套餐**，以及模板要求的声音或人脸素材；五类中只有财经模板明确面向中文，其余为英文。
- **为什么现在值得看**：进入 Trending（24 小时趋势），展示安装量 **12,874**。值得关注的是它把“风格参考”落实为模板、系列流程与两次人工确认，而不只是提供生成提示词。
- **如何使用**：资料未给出 Skill 安装命令，请在原页面查看安装方式。启动时运行一次使用事件命令，每次开始或恢复任务都先检查登录状态；用户选定模板且具备权限后再拉取：
  ```bash
  npx hyperframes events --skill=style-sampling
  npx hyperframes auth status
  npx hyperframes templates pull <slug>
  ```
  模板落在 `templates/<slug>/`。继续前须读取 `references/remix.md`，并遵循模板中 `series/<series>/REMIX.md`；未登录或 Free 用户分别按文档由用户执行登录、订阅流程：
  ```bash
  npx hyperframes auth login
  npx hyperframes billing subscribe --feature templates --skill style-sampling
  ```
- **注意**：模板由服务端校验 Pro 权限，拉取本身不消耗 credits；拉取失败时不得从记忆、网页或其他副本重建模板。不得使用原创作者的脸、声音、素材、标志或节目名。生成媒体另走 credits 流程；用户指定预算需写入 `.hyperframes/credit-limit.json`，恢复时重新确认，不能容纳的步骤须先征求意见。启动事件使用 CLI 遥测，登录时可能关联账户，并遵循退出遥测设置；插件环境还需遵守专门的执行规则。

## [remotion-best-practices](https://www.skills.sh/remotion-dev/skills/remotion-best-practices)
- **它做什么**：这是 Remotion 技能的路由入口，而非单一视频模板。它按任务加载新建视频、React 标记、地图、多媒体、字幕、交互、渲染、SaaS 等专项参考文档。制作视频时默认交付方向是可交互的 Studio 预览，只有用户明确要求导出时才渲染文件。
- **适合谁用**：使用 Remotion／React 制作视频、地理动画、字幕内容，或开发视频应用的开发者。已有项目和从零建项目均有对应入口；具体配置要求需继续阅读它指向的参考文件。
- **为什么现在值得看**：进入 Trending（24 小时趋势），展示安装量 **8,000**。其价值在于规范代理的工作顺序：先加载对应文档、尽早打开预览，再持续修改，而不是直接生成最终视频。
- **如何使用**：资料未给出 Skill 安装命令，请在原页面查看安装方式。新建视频或 composition 时，无论是否已有项目，都先加载 `./remotion-create/REFERENCE.md`。项目一旦可运行，便启动 Studio，并在构建或编辑 composition 前打开预览：
  ```bash
  npx remotion studio
  ```
  有内置浏览器的代理也可运行：
  ```bash
  npx remotion studio --no-open
  ```
  随后打开命令实际打印的 URL，确认 Studio 和已有 composition 的视频预览能加载。仅在用户明确要求渲染、导出或 MP4 时使用：
  ```bash
  npx remotion render
  ```
- **注意**：不要覆盖用户在对话外做出的意外改动，应保留或先确认。使用 Cursor 时不加 `--no-open`；其他客户端若无法在内置浏览器打开预览，也应改用自动打开浏览器的方式。地图、抠像、字幕、部署、许可和升级等任务需继续加载相应专项文档，入口文件本身未展开这些细节。

## [ai-video-generation](https://www.skills.sh/beltsh/superpowers/ai-video-generation)
- **它做什么**：通过 inference.sh 的 `belt` CLI 调用视频生成应用，来源说明覆盖 40 多个模型，包括 Veo、Seedance、HappyHorse、Wan 和 Grok。可执行文生视频、图生视频、参考图生成视频、口型同步、头像动画及自然语言视频编辑。还列出了拟音、视频放大和带转场合并工具，可串联生成后的处理流程。
- **适合谁用**：需要用命令行制作社交视频、营销素材、产品演示或数字人口播的开发者。前置条件是安装 inference.sh CLI（`belt`）并登录；图生视频、口型同步等任务还需提供相应图片、音频或视频 URL。
- **为什么现在值得看**：进入 Hot（小时爆发），展示安装量 **81**。它值得观察的是统一 CLI 下的模型选择和媒体处理组合，而非单一模型的提示词封装。
- **如何使用**：先按文档安装 belt CLI skill，并确保 `belt` CLI 已安装：
  ```bash
  npx skills add belt-sh/cli
  belt login
  belt app list --category video
  ```
  最小生成示例：
  ```bash
  belt app run google/veo-3-1-fast --input '{"prompt":"drone shot flying over a forest"}'
  ```
  需要带音频的 Seedance 示例：
  ```bash
  belt app run bytedance/seedance-2-0 --input '{
    "prompt":"a jazz band performing in a dimly lit club",
    "generate_audio":true,
    "duration":10
  }'
  ```
- **注意**：各应用的输入字段并不统一，例如图像可能使用 `image_url`、`image` 或 `reference_image`，视频可能使用 `video` 或 `video_url`，不能直接互换。来源标注 Seedance 2.0 最高 1080p、HappyHorse 文生视频最长 15 秒，HappyHorse 图生视频最高 1080P／15 秒；不要将个别模型的规格泛化到全部模型。文件未说明统一价格、配额或审批机制。

## [twitter-automation](https://www.skills.sh/beltsh/superpowers/twitter-automation)
- **它做什么**：通过 inference.sh 的 `belt` CLI 调用 X 应用，完成文字发帖、媒体发帖、点赞、转发、删除、私信、关注，以及帖子和用户资料查询。文档给出“生成图片或视频 → 从结果取得媒体 URL → 发布到 X”的串联流程。虽然描述中提到内容排程，但所给正文没有展示具体定时命令或配置。
- **适合谁用**：需要把内容生成接入 X 发布流程，或通过命令行执行账号操作的开发者、内容运营团队。依赖 `belt` CLI、登录，以及 X 集成配置；具体集成步骤需查看其链接的 X.com Integration 文档。
- **为什么现在值得看**：进入 Hot（小时爆发），展示安装量 **80**。它与同榜视频生成 Skill 使用同一套 CLI，便于衔接“生成素材—发布内容”的工作流。
- **如何使用**：保留来源给出的 CLI skill 安装方式，登录后可执行文字发帖：
  ```bash
  npx skills add belt-sh/cli
  belt login
  belt app run x/post-tweet --input '{"text":"Hello from inference.sh!"}'
  ```
  媒体发帖先取得输入样例，再编辑并提交：
  ```bash
  belt app sample x/post-create --save input.json
  # 编辑 input.json，填写 text 和 media_url
  belt app run x/post-create --input input.json
  ```
  查询帖子可使用：
  ```bash
  belt app run x/post-get --input '{"tweet_id":"1234567890"}'
  ```
- **注意**：生成素材的示例需要从第一步结果中取得实际媒体 URL，再填入发帖请求，并非自动完成结果传递。发帖、点赞、转发、私信、关注和删除均对应实际账号操作；所给文件未规定逐次审批、试运行、速率限制或权限范围，不能据此假定这些机制已内置。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*