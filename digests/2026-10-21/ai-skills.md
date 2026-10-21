# AI Skills 新上榜日报 2026-10-21

> *数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 首次生成时间: 2026-10-21 01:59 UTC*

---

> 修复说明：自动摘要因模型网关 HTTP 502 失败。本报告依据本次运行的 5 个 Skill ID，以及修复时读取的源仓库 SKILL.md 补全。历史安装量、排名和 Trending/Hot 归属未保存在去重记录中，因此不作推断；源文件可能已在首次上榜后更新。

## 1. embedded-captions — 给口播视频添加字幕与人物遮挡效果

- **来源**：[Skills 页面](https://www.skills.sh/heygen-com/hyperframes/embedded-captions) · [源文件](https://github.com/heygen-com/hyperframes/blob/HEAD/skills/embedded-captions/SKILL.md)
- **能做什么**：为已有的单主体口播视频添加逐字字幕、人物背后的嵌入式字幕或特效字幕。流程涵盖本地转录、人物抠像、字幕排版、预览与合成；多镜头视频需要先拆分。
- **适用场景与开始方式**：适合已有成片，只想补字幕或强调重点词的场景。默认以普通字幕承载大部分内容，仅在高潮处加入人物遮挡效果；源文件提供 35 种视觉样式。
- **使用边界**：按 Skills 页面说明安装，准备视频后先确定样式，再完成准备、预览和合成。需要 Bash、FFmpeg/ffprobe 及项目中的预览依赖；转录与抠像首次使用可能下载模型。

## 2. seeker-domains — 在移动应用中解析 .skr 域名

- **来源**：[Skills 页面](https://www.skills.sh/solana-mobile/solana-mobile-skills/seeker-domains) · [源文件](https://github.com/solana-mobile/solana-mobile-skills/blob/HEAD/skills/seeker-domains/SKILL.md)
- **能做什么**：将 .skr 名称解析为钱包地址，或将地址反查为名称，适用于个人资料、好友列表和交易记录。源文件使用 @solana-mobile/skr-domain 与 @solana/kit。
- **适用场景与开始方式**：适合用易读名称替代截断的钱包地址。先决定解析放在客户端还是现有后端；后端可保护 RPC 密钥、缓存查询并限制请求频率。
- **使用边界**：.skr 查询使用主网，即使应用运行在 devnet。反向查询依赖部分 RPC 服务会限制的 getProgramAccounts。React Native 还需 WebCrypto 支持；未注册与 RPC 故障应分别处理。

## 3. solana-mobile — 搭建与排查 Android Solana 应用

- **来源**：[Skills 页面](https://www.skills.sh/solana-mobile/solana-mobile-skills/solana-mobile) · [源文件](https://github.com/solana-mobile/solana-mobile-skills/blob/HEAD/skills/solana-mobile/SKILL.md)
- **能做什么**：通过 solana-mobile CLI 创建 Expo / React Native 项目、检查 Android 工具链、管理模拟器和设备、安装测试钱包，以及运行设备可访问的本地验证节点。
- **适用场景与开始方式**：适合从零建立移动应用，或排查环境和开发构建问题。先查看 `npx solana-mobile@latest --help`；创建项目用 `npx solana-mobile@latest create`，环境检查用 `npx solana-mobile@latest doctor`。
- **使用边界**：Mobile Wallet Adapter 需要 Android 原生开发构建，Expo Go 不包含所需原生模块。源文件优先采用 @solana/kit 模板，同时保留已有 web3.js 项目的兼容路径。

## 4. solana-mobile-publishing — 构建、签名并发布到 Solana dApp Store

- **来源**：[Skills 页面](https://www.skills.sh/solana-mobile/solana-mobile-skills/solana-mobile-publishing) · [源文件](https://github.com/solana-mobile/solana-mobile-skills/blob/HEAD/skills/solana-mobile-publishing/SKILL.md)
- **能做什么**：指导首次发行和后续更新，包括发布者账号、App NFT、Android release 构建、APK 签名与 dapp-store CLI 发布，也覆盖 debug 正常而 release 异常的排查。
- **适用场景与开始方式**：适合应用已开发完成、准备上架的阶段。先确认发布者身份、App NFT 和签名资料，再按源文件构建、签名、发布；源文件要求 CLI 1.0.1 或更新版本。
- **使用边界**：提交格式为 APK，不能用 AAB 替代。发布者钱包与签名密钥涉及应用长期身份，后续版本需要维持签名身份；应妥善保管在密钥管理环境中。本文未执行任何链上或商店发布。

## 5. solana-mobile-wallet — 在 React Native 中连接钱包、签名与发送交易

- **来源**：[Skills 页面](https://www.skills.sh/solana-mobile/solana-mobile-skills/solana-mobile-wallet) · [源文件](https://github.com/solana-mobile/solana-mobile-skills/blob/HEAD/skills/solana-mobile-wallet/SKILL.md)
- **能做什么**：使用 Mobile Wallet Adapter 和 Wallet UI 接入连接、断开、消息签名、Solana 登录及交易发送。新项目采用 @solana/kit 与 @wallet-ui/react-native-kit，已有 web3.js 项目沿用对应接口。
- **适用场景与开始方式**：适合项目与 Android 开发构建已就绪、需要接入钱包功能的阶段。先检查依赖及根组件中的 MobileWalletProvider，再通过 useMobileWallet 获取 account、connect、disconnect 和 client。
- **使用边界**：不能在 Expo Go 中使用 MWA，不要混用 kit 与 web3.js 的 Provider、Hook 和交易结构。取消连接会使 Promise 拒绝，应按正常交互处理；查询缓存应包含网络标识。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成；本次故障后的内容根据源文件补全。*
