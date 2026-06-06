# AI CLI Tools Community Digest 2026-06-07

> Generated: 2026-06-06 22:58 UTC | Tools covered: 9

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Kimi Code CLI](https://github.com/MoonshotAI/kimi-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/badlogic/pi-mono)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [DeepSeek TUI](https://github.com/Hmbown/DeepSeek-TUI)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

## 1) Ecosystem Overview

The AI CLI ecosystem is converging on a common set of hard problems: **session reliability, context/memory management, model routing, and integration stability**. Across tools, the community is no longer focused only on “can it run?” but on **whether it can run predictably across long sessions, multiple platforms, and external providers**. The most active projects are iterating quickly on both product features and infrastructure hardening, while smaller projects are concentrating on UX polish, compatibility, and parity gaps. Overall, the market is maturing from novelty tooling into **workflow-critical developer infrastructure**.

---

## 2) Activity Comparison

| Tool | Issues highlighted today | PRs highlighted today | Release status today |
|---|---:|---:|---|
| **Claude Code** | 10 | 3 | **2 releases** (`v2.1.166`, `v2.1.167`) |
| **OpenAI Codex** | 10 | 10 | **2 alpha releases** (`rust-v0.138.0-alpha.5/.6`) |
| **Gemini CLI** | 9 | 4 | No release |
| **GitHub Copilot CLI** | 7 | 0 | No release |
| **Kimi Code CLI** | 1 | 0 | No release |
| **OpenCode** | 10 | 10 | No release |
| **Pi** | 10 | 4 | No release |
| **Qwen Code CLI** | 2 | 9 | **1 nightly release** (`v0.17.1-nightly...`) |
| **DeepSeek TUI** | 2 | 10 | No release |

*Note: counts reflect the items explicitly highlighted in each community digest for the last 24 hours, not total repo-wide activity.*

---

## 3) Shared Feature Directions

### A. Session continuity and compaction reliability
Appears across:
- **Claude Code** — compaction failures, orphaned tool results, unrecoverable long sessions
- **OpenAI Codex** — instruction rewriting during compaction, slow compaction after pause/resume, context-window misreporting
- **OpenCode** — infinite compaction loops, history growth, session accounting issues
- **GitHub Copilot CLI** — instruction corruption during compaction
- **Qwen Code CLI** — history compaction / OOM prevention
- **DeepSeek TUI** — stream decoding and session interruption issues

**Common need:** preserve state accurately, make compaction deterministic, and avoid session corruption or runaway resource use.

---

### B. Windows and platform-specific reliability
Appears across:
- **Claude Code** — cowork RPC drops on Windows, VS Code/devcontainer issues
- **OpenAI Codex** — sandbox runner failure, plugin/browser/computer-use regressions on Windows
- **GitHub Copilot CLI** — Windows MCP re-init loop
- **OpenCode** — crashes on older CPUs/Windows compatibility issues
- **Kimi Code CLI** — Windows Work tab startup loop
- **DeepSeek TUI** — keyboard-layout compatibility, stream errors on desktop environments

**Common need:** stronger platform abstraction and better handling of OS-specific runtime behavior.

---

### C. Model access, routing, and cost control
Appears across:
- **Claude Code** — fallback model support, rate limiting, billing correctness
- **OpenAI Codex** — lower-cost/open-weight models, memory/model cost controls
- **GitHub Copilot CLI** — affordability and access to better models on free tier
- **Gemini CLI** — model availability and migration continuity
- **OpenCode** — provider/model compatibility and usage accounting
- **Qwen Code CLI** — model/platform parity implied by daemon/web-shell work

**Common need:** transparent model selection, graceful fallback, and predictable spend.

---

### D. Agent orchestration, subagents, and permissions
Appears across:
- **Claude Code** — auto-approval inheritance, permission ordering, subagent workspace behavior
- **OpenAI Codex** — subagent role exposure, instruction inheritance, lifecycle behavior
- **Gemini CLI** — lifecycle hooks (`AfterAgent`) and automation behavior
- **Qwen Code CLI** — ACP mode parity, hooks diagnostics, declarative agent definitions
- **OpenCode** — background subagents, task execution ergonomics
- **Pi** — extension/session control and durable context behavior

**Common need:** explicit, predictable agent boundaries and lifecycle semantics.

---

### E. Integration surfaces: MCP, plugins, hooks, and remote control
Appears across:
- **Claude Code** — MCP disconnects, plugin regressions, base URL propagation to subprocesses
- **OpenAI Codex** — plugin/browser/computer-use paths, extension API contracts
- **GitHub Copilot CLI** — MCP OAuth startup fan-out and host reconnect churn
- **Qwen Code CLI** — HTTP rewind, settings, and hooks diagnostics for daemon/web-shell
- **OpenCode** — plugin APIs and provider integrations
- **Gemini CLI** — hooks and extension-gallery discoverability

**Common need:** more robust integration contracts and better observability for remote/plugin workflows.

---

## 4) Differentiation Analysis

### Claude Code
- **Primary focus:** reliability, permissions, cost correctness, enterprise integration.
- **Technical style:** control-plane improvements, permission model tightening, fallback routing, plugin/MCP correctness.
- **Target users:** advanced team workflows, plugin authors, enterprise and multi-agent users.

### OpenAI Codex
- **Primary focus:** session continuity, instruction fidelity, Windows stability, subagent architecture.
- **Technical style:** strong internal refactors around instructions, memory, extension APIs, and TUI correctness.
- **Target users:** power users building long-running or multi-agent coding sessions, especially on Windows.

### Gemini CLI
- **Primary focus:** hooks, multimodal reliability, model lifecycle management, security hardening.
- **Technical style:** pragmatic bug fixes plus model-promotion maintenance and prompt-safety improvements.
- **Target users:** users leveraging image/vision workflows, automation hooks, and Google model ecosystem access.

### GitHub Copilot CLI
- **Primary focus:** MCP reliability, instruction fidelity, affordability, i18n.
- **Technical style:** smaller feature surface, but deep focus on startup behavior and correctness under integration load.
- **Target users:** CLI-first users depending on MCP servers and GitHub ecosystem workflows.

### Kimi Code CLI
- **Primary focus:** startup reliability of `kimi web` and daemon/WebSocket readiness.
- **Technical style:** narrow, regression-driven debugging with limited public surface activity.
- **Target users:** users of the web/work-tab experience, especially on Windows.

### OpenCode
- **Primary focus:** runtime stability, provider compatibility, cost/accounting correctness, and UI/desktop robustness.
- **Technical style:** fast patch cadence with broad infrastructure fixes and telemetry improvements.
- **Target users:** heavy daily users needing multiple providers, long sessions, and desktop/TUI workflows.

### Pi
- **Primary focus:** extension API ergonomics, TUI polish, provider compatibility, and prompt tooling.
- **Technical style:** compact, iterative, and ecosystem-oriented; strong emphasis on developer experience.
- **Target users:** extension authors and power users building prompt-driven workflows.

### Qwen Code CLI
- **Primary focus:** daemon/web-shell parity, remote control APIs, session management, ACP mode completeness.
- **Technical style:** rapid expansion of remote-operable surfaces and long-session stability fixes.
- **Target users:** users operating the CLI as a server/daemon or via scriptable remote clients.

### DeepSeek TUI
- **Primary focus:** terminal ergonomics, keyboard layout correctness, runtime metadata, multi-tab UX.
- **Technical style:** concentrated UI/runtime hardening and parity work with a strong TUI bias.
- **Target users:** keyboard-heavy terminal users, especially international layouts and multi-context workflows.

---

## 5) Community Momentum & Maturity

### Most active communities today
- **OpenCode** and **OpenAI Codex** show the strongest combined issue + PR activity, indicating high iteration velocity.
- **Claude Code** also has strong momentum, especially in issue pressure and release cadence.
- **Pi** shows a healthy but smaller community with quick triage and clean closure patterns.
- **Qwen Code CLI** has a concentrated burst of PR activity, suggesting an active implementation push despite fewer issue updates.

### Rapidly iterating projects
- **OpenCode**: broad hardening across memory, streams, startup, and provider support.
- **OpenAI Codex**: strong refactor-driven pace around instructions and extensions.
- **Qwen Code CLI**: intense work on daemon/web-shell parity and remote APIs.
- **Claude Code**: frequent releases plus visible control-plane changes.

### More mature / stable-seeming communities
- **Pi**: smaller scale, but issues are often quickly resolved and scoped.
- **Gemini CLI**: steady maintenance with focused fixes, security work, and model lifecycle updates.
- **Copilot CLI**: lower surface area and slower visible PR cadence, but clear focus on key reliability seams.

---

## 6) Trend Signals

1. **AI CLIs are becoming stateful platforms, not just command runners.**  
   Session continuity, memory, hooks, and agent lifecycle management are now first-class concerns.

2. **Reliability is a competitive feature.**  
   Users care deeply about compaction correctness, recovery behavior, and long-session stability.

3. **Cost transparency is now a product requirement.**  
   Communities are actively pushing for better model fallback, quota visibility, and billing correctness.

4. **Integration surfaces are expanding fast.**  
   MCP, plugins, daemon APIs, and hooks are being treated as core architecture, not add-ons.

5. **Windows remains a major differentiation test.**  
   Many of the highest-severity issues are platform-specific, especially on Windows desktop and sandbox paths.

6. **Developer trust depends on permission and instruction fidelity.**  
   Approval flows, subagent boundaries, and instruction persistence are under close scrutiny.

7. **Multimodal and international UX are moving from “nice to have” to baseline expectations.**  
   Vision, RTL text, keyboard layouts, and TUI rendering quality are now meaningful adoption factors.

If you want, I can turn this into a **1-page executive brief** or a **ranked matrix by risk, momentum, and product maturity**.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

Below is a concise community highlights report for **anthropics/skills** as of **2026-06-07**.

> **Method note:** the provided PR export shows `Comments: undefined`, so the “top” PR ranking below is a **qualitative attention ranking** based on prominence, recency, and scope rather than a verified comment count.

---

## 1) Top Skills Ranking

1. **[PR #1140 — agent-creator + multi-tool eval fix](https://github.com/anthropics/skills/pull/1140)**  
   **What it does:** Adds an `agent-creator` meta-skill for building task-specific agent sets, plus fixes to multi-tool evaluation and Windows support.  
   **Why it drew attention:** It touches core Claude Code orchestration, not just one niche domain skill.  
   **Status:** **Open**

2. **[PR #723 — testing-patterns](https://github.com/anthropics/skills/pull/723)**  
   **What it does:** Broad testing guidance covering unit tests, React component tests, integration tests, and testing philosophy.  
   **Why it drew attention:** Testing is one of the highest-leverage skill categories for developer adoption.  
   **Status:** **Open**

3. **[PR #514 — document-typography](https://github.com/anthropics/skills/pull/514)**  
   **What it does:** Adds typographic quality control for generated documents, including widow/orphan handling and numbering alignment.  
   **Why it drew attention:** Document quality is a common pain point across generated reports, proposals, and docs.  
   **Status:** **Open**

4. **[PR #486 — ODT skill](https://github.com/anthropics/skills/pull/486)**  
   **What it does:** Creates, fills, reads, and converts OpenDocument files (`.odt`, `.ods`).  
   **Why it drew attention:** Strong interoperability value for LibreOffice/OpenDocument workflows and enterprise document handling.  
   **Status:** **Open**

5. **[PR #568 — ServiceNow platform skill](https://github.com/anthropics/skills/pull/568)**  
   **What it does:** Broad ServiceNow coverage spanning ITSM, ITOM, SecOps, ITAM/SAM, FSM, SPM, CSDM, and IntegrationHub.  
   **Why it drew attention:** Enterprise platform skills tend to attract attention because they map to high-value operational workflows.  
   **Status:** **Open**

6. **[PR #363 — feature-dev workflow fix](https://github.com/anthropics/skills/pull/363)**  
   **What it does:** Fixes a TodoWrite overwrite bug that caused later phases of the `/feature-dev` workflow to be skipped.  
   **Why it drew attention:** It affects a core Claude Code workflow, so reliability improvements here have broad impact.  
   **Status:** **Open**

7. **[PR #190 — n8n-builder / n8n-debugger community skills](https://github.com/anthropics/skills/pull/190)**  
   **What it does:** Adds automation-oriented community skills for building and debugging n8n workflows.  
   **Why it drew attention:** Workflow automation remains a consistently popular use case for Skills.  
   **Status:** **Open**

---

## 2) Community Demand Trends

### A. Skill distribution and sharing
- **[Org-wide skill sharing](https://github.com/anthropics/skills/issues/228)** is the clearest demand signal: users want Skills to be shareable across teams without manual file copying.
- **[Duplicate installs / overlapping collections](https://github.com/anthropics/skills/issues/189)** shows demand for cleaner packaging and less context-window waste.
- **[Portability labels](https://github.com/anthropics/skills/issues/1156)** indicate users want explicit metadata about where a skill is valid.

### B. Reliability, evaluation, and debugging
- **[run_eval trigger failures](https://github.com/anthropics/skills/issues/556)** and **[Windows crashes in run_eval.py](https://github.com/anthropics/skills/issues/1099)** show strong demand for trustworthy skill testing infrastructure.
- **[Skills disappearing / not found](https://github.com/anthropics/skills/issues/62)** and **[404 loading errors](https://github.com/anthropics/skills/issues/61)** point to operational reliability issues that block adoption.
- The community is clearly asking for better “did my skill actually trigger?” tooling, not just more skills.

### C. Security and trust boundaries
- **[Namespace abuse / impersonation risk](https://github.com/anthropics/skills/issues/492)** highlights concern that community skills under the `anthropic/` namespace can mislead users.
- **[SharePoint Online access-control concerns](https://github.com/anthropics/skills/issues/1175)** shows enterprise users want explicit permission handling and safer doc workflows.

### D. Interoperability and ecosystem integration
- **[Expose Skills as MCPs](https://github.com/anthropics/skills/issues/16)** suggests interest in making skills more tool-like and composable.
- **[Bedrock support](https://github.com/anthropics/skills/issues/29)** and **[MCP excess data / context pressure](https://github.com/anthropics/skills/issues/1102)** show demand for cross-platform support and better payload management.
- **[Multi-file preload / inline bundling](https://github.com/anthropics/skills/issues/1220)** indicates users want richer skill packaging without losing usability.

### E. Better authoring guidance
- **[skill-creator best-practice update](https://github.com/anthropics/skills/issues/202)** implies the community wants more operational, less tutorial-like skill authoring patterns.
- This aligns with demand for practical skills in **workflow automation, test generation, documentation, and enterprise operations** rather than purely conceptual examples.

---

## 3) High-Potential Pending Skills

These are open PRs that look closest to landing because they solve clear, practical problems.

- **[PR #1140 — agent-creator](https://github.com/anthropics/skills/pull/1140)**  
  High leverage meta-skill plus platform fixes; strong chance of broad adoption if stabilized.

- **[PR #723 — testing-patterns](https://github.com/anthropics/skills/pull/723)**  
  Broad developer utility, especially valuable for code quality and validation workflows.

- **[PR #514 — document-typography](https://github.com/anthropics/skills/pull/514)**  
  Narrow on the surface, but highly practical for polished document output.

- **[PR #486 — ODT skill](https://github.com/anthropics/skills/pull/486)**  
  Strong enterprise/document interoperability use case.

- **[PR #363 — feature-dev workflow fix](https://github.com/anthropics/skills/pull/363)**  
  Reliability fix for a core workflow; likely to be welcomed quickly.

- **[PR #1099 — Windows `run_eval.py` crash fix](https://github.com/anthropics/skills/pull/1099)**  
  Important infrastructure fix for contributors on Windows, likely to reduce friction in skill development.

---

## 4) Skills Ecosystem Insight

**The community’s most concentrated demand is for Skills that are easier to share, safer to trust, and more reliable to evaluate and run across environments—especially for enterprise workflows, documentation, and developer automation.**

---

# Claude Code Community Digest — 2026-06-07

## 1) Today’s Highlights
Claude Code shipped two back-to-back releases: **v2.1.167** focused on reliability, while **v2.1.166** added meaningful control-plane changes like fallback model support and richer deny-rule matching. Meanwhile, the issue tracker is dominated by regressions in permissions, tool execution, compaction, and platform-specific behavior across Windows, macOS, Linux, VS Code, iOS, and plugins.  
The overall signal: the community is pushing hard on **stability, cost predictability, and approval/tooling correctness**.

## 2) Releases
- **[v2.1.167](https://github.com/anthropics/claude-code/releases/tag/v2.1.167)** — Bug fixes and reliability improvements.
- **[v2.1.166](https://github.com/anthropics/claude-code/releases/tag/v2.1.166)** — Added `fallbackModel` to try up to three fallback models when the primary is overloaded/unavailable; `--fallback-model` now applies to interactive sessions too. Also added glob support in deny-rule tool-name matching.

## 3) Hot Issues
1. **[#65936](https://github.com/anthropics/claude-code/issues/65936)** — *Cowork broken after auto-update on Windows; RPC drops with EOF*  
   Why it matters: breaks collaboration workflows immediately after update. Community signal is already strong for a fresh regression report with repro and platform tagging.

2. **[#65911](https://github.com/anthropics/claude-code/issues/65911)** — *Channel messages that trigger `no_response` still incur full API billing*  
   Why it matters: direct cost leak in plugin/channel mode. The report is important because it identifies a billing mismatch, not just a UX issue; early discussion is already active.

3. **[#65918](https://github.com/anthropics/claude-code/issues/65918)** — *CreateTeam peer agents do not inherit workspace auto-approval*  
   Why it matters: agent delegation breaks when peer agents lose expected sandbox/file permissions. The issue points to a regression in multi-agent orchestration.

4. **[#65938](https://github.com/anthropics/claude-code/issues/65938)** — *`advisor_tool_result` becomes orphaned mid-roundtrip and causes permanent API 400*  
   Why it matters: can make a session unrecoverable. This is a high-severity protocol/state bug with a clear failure mode and reproducible trigger.

5. **[#65934](https://github.com/anthropics/claude-code/issues/65934)** — *Allow-listed Read/Write soft-deny after permission timeout in remote multi-session VS Code*  
   Why it matters: remote/devcontainer-style workflows can silently fail after long waits. Community reaction suggests frustration with “phantom rejection” behavior.

6. **[#65917](https://github.com/anthropics/claude-code/issues/65917)** — *Transient MCP disconnect evicts tools and invalidates prompt cache prefix*  
   Why it matters: hurts both reliability and token efficiency. This is exactly the kind of infrastructure-level bug that can cascade into repeated misses and higher cost.

7. **[#65910](https://github.com/anthropics/claude-code/issues/65910)** — *Permission prompt can be replaced by a newer pending approval in manual-approve mode*  
   Why it matters: labeled as a security bug and has direct command-approval risk. This is one of the most sensitive reports in the batch.

8. **[#65905](https://github.com/anthropics/claude-code/issues/65905)** — *Auto-compact fails on Sonnet 4.6; context grows past 200K and becomes unrecoverable*  
   Why it matters: hits a core guardrail. The report indicates a hard failure in long-running sessions, with context overflow and failed manual recovery.

9. **[#65913](https://github.com/anthropics/claude-code/issues/65913)** — *Anthropic API reports server rate limiting on valid requests*  
   Why it matters: impacts users as a platform reliability problem, not a local misconfiguration. Even with only one comment, this is an important operational complaint.

10. **[#65939](https://github.com/anthropics/claude-code/issues/65939)** — *Expo plugin runs `/login` on every message, making Claude Code unusable*  
    Why it matters: an integration bug that effectively blocks a plugin workflow. This is a classic “works until it doesn’t” friction point for ecosystem users.

## 4) Key PR Progress
> Only 3 PRs were active in the provided snapshot.

1. **[#65919](https://github.com/anthropics/claude-code/pull/65919)** — *Document `${CLAUDE_PLUGIN_ROOT}` limitation in subagents*  
   Clarifies a known limitation where subagents receive `${CLAUDE_PLUGIN_ROOT}` / `${CLAUDE_PROJECT_DIR}` as literal strings, preventing plugin-bundled file access. This is a valuable docs fix for agent developers.

2. **[#65916](https://github.com/anthropics/claude-code/pull/65916)** — *Clarify `allowed-tools` vs agent tools enforcement*  
   Important documentation cleanup: `allowed-tools` is an auto-approval mechanism, while `tools:` in subagent frontmatter is the actual capability boundary. This should reduce permission-model confusion.

3. **[#65875](https://github.com/anthropics/claude-code/pull/65875)** — *Forward `ANTHROPIC_BASE_URL` to `agentic_review` child process*  
   Fixes proxy/gateway deployments (e.g. LiteLLM/Bifrost) where the advisor subprocess incorrectly defaulted to the public Anthropic endpoint. High value for enterprise and self-hosted setups.

## 5) Feature Request Trends
1. **More flexible model fallback and routing**
   - Users want better resilience under overload and outages, building on the new `fallbackModel` setting in **[v2.1.166](https://github.com/anthropics/claude-code/releases/tag/v2.1.166)**.
   - Related issues emphasize model availability, latency, and rate-limit handling: **[#65942](https://github.com/anthropics/claude-code/issues/65942)**, **[#65913](https://github.com/anthropics/claude-code/issues/65913)**.

2. **Tighter permission and approval controls**
   - Repeated requests around auto-approval inheritance, prompt ordering, deny rules, and enforcement semantics: **[#65918](https://github.com/anthropics/claude-code/issues/65918)**, **[#65910](https://github.com/anthropics/claude-code/issues/65910)**, **[#65916](https://github.com/anthropics/claude-code/pull/65916)**, **[#65936](https://github.com/anthropics/claude-code/issues/65936)**.

3. **Better cost transparency and billing correctness**
   - Strong concern that “non-response” and transient work should not be billed like full turns: **[#65911](https://github.com/anthropics/claude-code/issues/65911)**, **[#65903](https://github.com/anthropics/claude-code/issues/65903)**, **[#65917](https://github.com/anthropics/claude-code/issues/65917)**.

4. **Context management and compaction reliability**
   - Auto-compact, session recovery, and tool-result sizing are recurring themes: **[#65905](https://github.com/anthropics/claude-code/issues/65905)**, **[#65937](https://github.com/anthropics/claude-code/issues/65937)**, **[#65938](https://github.com/anthropics/claude-code/issues/65938)**, **[#65946](https://github.com/anthropics/claude-code/issues/65946)**.

5. **Improved cross-platform and integration stability**
   - Windows, macOS, Linux, VS Code, iOS, Telegram, Expo, MCP, and cowork/agent workflows all have active reports: **[#65936](https://github.com/anthropics/claude-code/issues/65936)**, **[#65934](https://github.com/anthropics/claude-code/issues/65934)**, **[#65946](https://github.com/anthropics/claude-code/issues/65946)**, **[#65939](https://github.com/anthropics/claude-code/issues/65939)**.

## 6) Developer Pain Points
- **Permission flow brittleness**: approvals can time out, be replaced, or fail to propagate across sessions and agents. See **[#65910](https://github.com/anthropics/claude-code/issues/65910)**, **[#65918](https://github.com/anthropics/claude-code/issues/65918)**, **[#65934](https://github.com/anthropics/claude-code/issues/65934)**.
- **Unexpected cost from “silent” or infrastructure turns**: users are sensitive to paying for no-op channel messages and cache invalidation side effects. See **[#65911](https://github.com/anthropics/claude-code/issues/65911)** and **[#65917](https://github.com/anthropics/claude-code/issues/65917)**.
- **Long-session instability**: compaction, tool-call parsing, and context growth continue to produce unrecoverable sessions. See **[#65905](https://github.com/anthropics/claude-code/issues/65905)**, **[#65938](https://github.com/anthropics/claude-code/issues/65938)**, **[#65941](https://github.com/anthropics/claude-code/issues/65941)**.
- **Integration regressions**: plugins and companion apps can become unusable when auth or sync flows misfire. See **[#65939](https://github.com/anthropics/claude-code/issues/65939)** and **[#65946](https://github.com/anthropics/claude-code/issues/65946)**.
- **Documentation gaps around tool boundaries**: multiple PRs were needed just to clarify enforcement semantics and subagent path behavior. See **[#65916](https://github.com/anthropics/claude-code/pull/65916)** and **[#65919](https://github.com/anthropics/claude-code/pull/65919)**.

If you want, I can also convert this into a **Slack-ready shorter digest** or a **table format by severity/platform**.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-06-07

## 1) Today’s Highlights
Codex saw two back-to-back alpha releases on the Rust 0.138 line, while the issue tracker was dominated by Windows reliability, session continuity, and plugin/browser/computer-use regressions. On the engineering side, the PR queue is heavily focused on a broader instructions refactor, subagent lifecycle behavior, and tightening CLI/TUI edge cases. Overall, the community signal is clear: users want more stable sessions, fewer platform-specific failures, and better control over model/context/memory behavior.

## 2) Releases
- [rust-v0.138.0-alpha.6](https://github.com/openai/codex/releases/tag/rust-v0.138.0-alpha.6) — published as a new pre-release in the 0.138.0-alpha line. The feed does not include changelog details, so this should be treated as an incremental alpha drop.
- [rust-v0.138.0-alpha.5](https://github.com/openai/codex/releases/tag/rust-v0.138.0-alpha.5) — another recent alpha release in the same line, likely part of the same stabilization cycle.

## 3) Hot Issues
1. [#26825](https://github.com/openai/codex/issues/26825) — **Codex mobile remote visibly reconnects on app resume instead of silently restoring active thread**  
   Why it matters: app-resume should feel seamless; visible reconnects break continuity and trust. Community reaction: 3 comments already, suggesting an immediate UX pain point.

2. [#26803](https://github.com/openai/codex/issues/26803) — **Windows sandbox runner fails with `CreateProcessAsUserW failed: 5`**  
   Why it matters: this blocks command execution on Windows 11, effectively breaking the desktop workflow. Community reaction: 3 comments, indicating a reproducible and high-priority regression.

3. [#26783](https://github.com/openai/codex/issues/26783) — **gpt-5.5 reports a 2432-token context window in 0.137.0, triggering repeated auto-compaction**  
   Why it matters: a bad context-window report can drain quota and degrade session quality fast. Community reaction: 3 comments, with the issue clearly resonating with users seeing unexpected usage burn.

4. [#26828](https://github.com/openai/codex/issues/26828) — **Custom subagent roles not exposed in `spawn_agent` schema on Windows/Ubuntu**  
   Why it matters: this limits multi-agent workflows and makes custom subagents inaccessible in practice. Community reaction: 2 comments, enough to show this is already blocking real setups.

5. [#26808](https://github.com/openai/codex/issues/26808) — **Chronicle memory writer should expose model and cost controls**  
   Why it matters: background memory generation is consuming quota without user control, which is a billing and trust issue. Community reaction: 2 comments, reflecting concern over hidden spend.

6. [#26806](https://github.com/openai/codex/issues/26806) — **Allow subagents to override inherited personal/custom instructions**  
   Why it matters: users need scoping controls so specialized agents are not forced to inherit global behavior. Community reaction: 2 comments; this is an architectural workflow request, not just a UI tweak.

7. [#26780](https://github.com/openai/codex/issues/26780) — **Windows Statsig bootstrap fails on `user.custom.workspace_type`, disabling i18n and Browser Use**  
   Why it matters: a config/bootstrap failure can silently disable major features and localization. Community reaction: 2 comments, suggesting more than one affected user/environment.

8. [#26776](https://github.com/openai/codex/issues/26776) — **Chrome plugin not shown and Computer Use unavailable on Windows**  
   Why it matters: this removes a core “agent can act in browser” capability on Windows. Community reaction: 2 comments, pointing to a recurring plugin-enablement problem.

9. [#26829](https://github.com/openai/codex/issues/26829) — **`resmemory allocation of 1761838 bytes failed`**  
   Why it matters: memory allocation failures can abruptly terminate sessions or features, especially under load. Community reaction: 1 comment so far, but the failure mode is severe.

10. [#26826](https://github.com/openai/codex/issues/26826) — **Context compaction becomes much slower after pausing and resuming automatic compaction**  
    Why it matters: compaction is a core performance path; regressions here directly affect long sessions. Community reaction: 1 comment, but it aligns with broader context-management complaints.

## 4) Key PR Progress
1. [#26835](https://github.com/openai/codex/pull/26835) — **Test extension API contracts**  
   Adds direct coverage for the shared extension API so regressions in typed state, registry ordering, and capability adapters are caught earlier.

2. [#26834](https://github.com/openai/codex/pull/26834) — **Adopt global instructions contributors**  
   Moves global-instructions ownership toward a contributor model, making host-provided instruction sources more explicit.

3. [#26833](https://github.com/openai/codex/pull/26833) — **Persist structured instruction snapshots**  
   Protects history-sharing and resume semantics by preserving the instructions active when a thread’s history was produced.

4. [#26832](https://github.com/openai/codex/pull/26832) — **Add CODEX_HOME instructions contributor**  
   Extracts CODEX_HOME instruction discovery into a dedicated contributor path instead of keeping it buried in core config logic.

5. [#26831](https://github.com/openai/codex/pull/26831) — **Add global instructions contributor API**  
   Introduces the extension point hosts need to supply global instructions cleanly through the contributor system.

6. [#26830](https://github.com/openai/codex/pull/26830) — **Characterize global instruction lifecycle**  
   Adds end-to-end coverage for instruction behavior across thread creation, compaction, resume, forks, and subagents.

7. [#26821](https://github.com/openai/codex/pull/26821) — **Exclude external tool output from memories**  
   Prevents external context from polluting memory generation, reducing unwanted or low-value memory accumulation.

8. [#26818](https://github.com/openai/codex/pull/26818) — **Fix TUI prompt parsing for `resume` and `fork`**  
   Makes interactive resume/fork flows accept prompts reliably instead of mis-parsing positional arguments.

9. [#26804](https://github.com/openai/codex/pull/26804) — **Send Codex product SKU to plugin-service**  
   Fixes plugin filtering by ensuring remote plugin requests are tagged correctly for Codex-specific availability.

10. [#26754](https://github.com/openai/codex/pull/26754) — **Prepare side threads off the TUI event loop**  
    Addresses a deadlock risk when creating side conversations under heavy event pressure or slow fork operations.

## 5) Feature Request Trends
Across today’s issues, the strongest feature-request themes are:

- **Subagent control and customization**  
  Users want better control over subagent inheritance, roles, and prompt scoping. See [#26806](https://github.com/openai/codex/issues/26806) and [#26828](https://github.com/openai/codex/issues/26828).

- **Model, memory, and cost controls**  
  Requests are growing for visibility into background spending and the ability to tune memory/model behavior. See [#26808](https://github.com/openai/codex/issues/26808) and [#26783](https://github.com/openai/codex/issues/26783).

- **Session continuity and compaction reliability**  
  Users want smoother resume behavior, fewer reconnect disruptions, and more predictable compaction. See [#26825](https://github.com/openai/codex/issues/26825), [#26826](https://github.com/openai/codex/issues/26826), and [#26787](https://github.com/openai/codex/issues/26787).

- **Windows compatibility and bundled feature stability**  
  Many issues are Windows-specific, especially around sandboxing, plugins, browser/computer-use, and app startup. See [#26803](https://github.com/openai/codex/issues/26803), [#26776](https://github.com/openai/codex/issues/26776), [#26780](https://github.com/openai/codex/issues/26780), and [#26792](https://github.com/openai/codex/issues/26792).

- **CLI/TUI parity and workflow ergonomics**  
  Users keep asking for consistent behavior across CLI and desktop surfaces, plus better interaction shortcuts and parsing. See [#26820](https://github.com/openai/codex/issues/26820), [#26819](https://github.com/openai/codex/issues/26819), and [#26818](https://github.com/openai/codex/pull/26818).

## 6) Developer Pain Points
The recurring frustration is **platform fragility**, especially on Windows: sandbox failures, plugin bootstrap issues, browser/computer-use breakage, and remote/session disconnects appear repeatedly. A second theme is **poor observability and control** around quota, memory, and compaction, with users concerned that Codex is spending tokens in the background or misreporting context limits. Finally, developers want **more predictable multi-agent behavior**—subagent inheritance, role exposure, and lifecycle handling are still rough edges that affect advanced workflows.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## 1) Today’s Highlights

No new release was published in the last 24 hours, but the issue tracker saw steady activity around core UX, agent hooks, model selection, image handling, and security hardening. The most notable signals are a cluster of bug reports around runtime behavior (`/model`, hooks, vision input) and two higher-interest feature requests involving Google AI Studio auth and Gemma support.  
On the engineering side, the repo also shows active maintenance work: one PR hardens prompt handling for untrusted data, while another adds image-grounding hints to improve vision reliability.

## 2) Releases

No releases in the last 24 hours.

## 3) Hot Issues

> Only 9 issues were updated in the last 24 hours, so this section covers all of them.

1. **[#27715 – Auto missing from `/model` when `dynamicModelConfiguration` is enabled](https://github.com/google-gemini/gemini-cli/issues/27715)**  
   Why it matters: This is a core configuration/UI regression affecting model discoverability. If “Auto” disappears, users may assume the feature is unavailable or broken.  
   Community reaction: Early report, minimal chatter so far, but it directly touches an experimental feature many power users will test.

2. **[#27712 – `hooks.AfterAgent` never executes from `settings.json`](https://github.com/google-gemini/gemini-cli/issues/27712)**  
   Why it matters: Lifecycle hooks are foundational for automation and agent orchestration. A missing `AfterAgent` callback can break workflows, cleanup logic, and post-processing.  
   Community reaction: One 👍, suggesting real developer interest and a likely reproducible bug.

3. **[#27710 – Vision hallucination after reading the correct clipboard PNG](https://github.com/google-gemini/gemini-cli/issues/27710)**  
   Why it matters: This is a serious reliability issue for multimodal usage. The CLI correctly ingests the image, but the model returns unrelated content, which undermines trust in image analysis tasks.  
   Community reaction: No comments yet, but the linked follow-up PR shows the issue is already being actively addressed.

4. **[#27713 – Restore Google AI Studio API authentication and Gemma 4 support](https://github.com/google-gemini/gemini-cli/issues/27713)**  
   Why it matters: This is a high-value compatibility request from users who depend on Google AI Studio auth and newer model access. It points to a major workflow gap for existing users migrating from older Gemini CLI behavior.  
   Community reaction: One 👍, indicating concrete demand.

5. **[#27707 – Extension meets listing requirements but is missing from the gallery](https://github.com/google-gemini/gemini-cli/issues/27707)**  
   Why it matters: Extension discovery is part of the ecosystem story. If valid extensions don’t surface, the gallery loses credibility and extension authors lose visibility.  
   Community reaction: No strong engagement yet, but this is important for the platform ecosystem.

6. **[#27709 – Non-interactive integration request for Yandex Alice/API](https://github.com/google-gemini/gemini-cli/issues/27709)**  
   Why it matters: This indicates demand for broader integration support in the non-interactive path. Even though the request text is sparse, it reflects interest in connecting Gemini CLI to external assistants/services.  
   Community reaction: Low signal; likely needs clarification and structured requirements.

7. **[#27706 – “aj agents full free in web ide” enhancement request](https://github.com/google-gemini/gemini-cli/issues/27706)**  
   Why it matters: The issue text is noisy, but it appears to be a request for deeper web IDE/agent integration and broader platform access.  
   Community reaction: Currently low-quality input, useful mainly as a triage signal rather than a product request.

8. **[#27714 – Security-related issue with chat history attachment request](https://github.com/google-gemini/gemini-cli/issues/27714)**  
   Why it matters: The security label and automated request for exported chat history indicate potential sensitive-data handling concerns.  
   Community reaction: No real discussion yet; likely needs manual triage and careful privacy handling.

9. **[#27716 – Off-topic/garbage submission (`www.xnxx.com`)](https://github.com/google-gemini/gemini-cli/issues/27716)**  
   Why it matters: Not a product issue, but it highlights moderation and triage noise. This kind of submission increases overhead for maintainers.  
   Community reaction: No engagement; should be filtered quickly.

## 4) Key PR Progress

> Only 4 PRs were updated in the last 24 hours, so this section covers all of them.

1. **[#27711 – Add image-grounding hint in function response for image analysis](https://github.com/google-gemini/gemini-cli/pull/27711)**  
   Why it matters: This PR directly addresses the vision hallucination reported in #27710 by improving grounding in image-related function responses.  
   Impact: Likely to reduce unrelated image descriptions and improve trust in multimodal workflows.

2. **[#27708 – Harden AI prompt handling around untrusted data](https://github.com/google-gemini/gemini-cli/pull/27708)**  
   Why it matters: This is a strong security/robustness improvement. It avoids passing potentially unsafe data directly into prompts, reducing prompt-injection risk.  
   Impact: Improves safety in CI and any workflow that processes external or user-controlled input.

3. **[#27705 – Promote Gemini 3.1 Flash Lite to GA and support Gemini 3.5 Flash](https://github.com/google-gemini/gemini-cli/pull/27705)**  
   Why it matters: Model lifecycle updates are critical for keeping the CLI aligned with available Gemini variants.  
   Impact: Helps ensure users aren’t stranded on retired preview models and can access newer model options.

4. **[#27704 – Promote Gemini 3.1 Flash Lite to GA and support Gemini 3.5 Flash](https://github.com/google-gemini/gemini-cli/pull/27704)**  
   Why it matters: This appears to be the closed/internal counterpart of the same model-promotion work, suggesting active release-branch consolidation.  
   Impact: Reinforces the model migration effort and indicates this work is moving through the pipeline.

## 5) Feature Request Trends

Across the updated issues, the strongest request themes are:

- **Model availability and selection improvements**  
  Users want stable, visible access to current models and clearer `/model` behavior, especially with dynamic configuration enabled.  
  Link: [#27715](https://github.com/google-gemini/gemini-cli/issues/27715), [#27713](https://github.com/google-gemini/gemini-cli/issues/27713)

- **Better agent lifecycle hooks and automation**  
  The hook system is being used as an extension point, and users expect `AfterAgent` and related lifecycle events to work reliably.  
  Link: [#27712](https://github.com/google-gemini/gemini-cli/issues/27712)

- **Stronger multimodal reliability**  
  Vision/image workflows need better grounding so the model responds to the actual image rather than hallucinating unrelated content.  
  Link: [#27710](https://github.com/google-gemini/gemini-cli/issues/27710), [#27711](https://github.com/google-gemini/gemini-cli/pull/27711)

- **Ecosystem discoverability and integration**  
  Extension gallery visibility and broader external integration requests suggest users want Gemini CLI to function as a platform, not just a standalone tool.  
  Link: [#27707](https://github.com/google-gemini/gemini-cli/issues/27707), [#27709](https://github.com/google-gemini/gemini-cli/issues/27709), [#27706](https://github.com/google-gemini/gemini-cli/issues/27706)

- **Access/auth continuity for power users**  
  There is demand to restore Google AI Studio authentication paths and support newer models like Gemma 4.  
  Link: [#27713](https://github.com/google-gemini/gemini-cli/issues/27713)

## 6) Developer Pain Points

The recurring frustrations this week are:

- **Configuration drift and hidden regressions**: features like `/model` can behave unexpectedly when experimental settings are enabled.  
  [#27715](https://github.com/google-gemini/gemini-cli/issues/27715)

- **Lifecycle hooks not firing as documented**: automation users rely on hooks for integrations, and missing callbacks break real workflows.  
  [#27712](https://github.com/google-gemini/gemini-cli/issues/27712)

- **Unreliable multimodal outputs**: even when image ingestion succeeds, output grounding can fail, which is especially damaging for debugging and visual analysis tasks.  
  [#27710](https://github.com/google-gemini/gemini-cli/issues/27710), [#27711](https://github.com/google-gemini/gemini-cli/pull/27711)

- **Model migration churn**: users want clear support for current GA models and continuity across deprecations and preview transitions.  
  [#27705](https://github.com/google-gemini/gemini-cli/pull/27705), [#27713](https://github.com/google-gemini/gemini-cli/issues/27713)

- **Triage noise and security-sensitive reports**: maintainers are dealing with both low-signal submissions and issues that may involve sensitive chat artifacts.  
  [#27714](https://github.com/google-gemini/gemini-cli/issues/27714), [#27716](https://github.com/google-gemini/gemini-cli/issues/27716)

If you want, I can also turn this into a **shorter executive brief** or a **Slack-ready update**.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

## GitHub Copilot CLI Community Digest — 2026-06-07

### 1) Today’s Highlights
Copilot CLI saw **no new releases** in the last 24 hours, so the discussion is concentrated entirely on issues. The strongest signal is around **MCP reliability on Windows and remote OAuth startup behavior**, suggesting the community is running into repeated initialization and auth churn in real workflows. There’s also clear interest in **context handling correctness**, **model affordability/access**, and **internationalization**.

### 2) Releases
- **No releases published in the last 24 hours.**

### 3) Hot Issues
1. **[#3706](https://github.com/github/copilot-cli/issues/3706) — Remote MCP OAuth startup fans out across hosts/reconnects, causing repeated auth and rate limits**  
   Why it matters: This is a high-severity operational bug for users relying on remote HTTP MCP servers with OAuth. The report mentions repeated `initialize`/OAuth/tool-list calls in a single session, which can quickly trigger rate limits and degrade UX.  
   Community reaction: **0 comments, 0 👍** so far, but the issue description is detailed and points to real production friction.

2. **[#3701](https://github.com/github/copilot-cli/issues/3701) — Copilot CLI bug: runaway MCP server spawning (IDE lock-file watcher re-init loop)**  
   Why it matters: This appears to be a serious stability issue on **Windows + IDE integration**, where MCP servers are repeatedly spawned due to a re-init loop. That can lock up workflows and consume resources quickly.  
   Community reaction: **Closed** with **2 comments**, indicating active triage and likely a resolution path. No 👍 yet, but the technical detail suggests a well-observed failure mode.

3. **[#3703](https://github.com/github/copilot-cli/issues/3703) — Instructions rewritten during compaction result in serious errors**  
   Why it matters: This hits the core product promise: preserving user instructions. If compaction rewrites instructions incorrectly, the agent can behave in ways that are hard to predict or trust.  
   Community reaction: **1 comment, 0 👍**. Early but important—this is a quality and trust issue rather than a cosmetic bug.

4. **[#3707](https://github.com/github/copilot-cli/issues/3707) — Support lower-cost/open-weight model options to improve affordability**  
   Why it matters: This is a strategic feature request tied to adoption and retention. The request reflects concern that token-based usage can become expensive too fast, especially for heavier users.  
   Community reaction: **0 comments, 0 👍**. Even without engagement, the request aligns with a broader affordability conversation.

5. **[#3705](https://github.com/github/copilot-cli/issues/3705) — [Copilot Free] Only Claude Haiku 4.5 available — request access to Claude Sonnet/Opus models**  
   Why it matters: This is another model-access request, but specifically for **Copilot Free** users. It shows demand for broader model choice beyond the entry-tier default.  
   Community reaction: **0 comments, 0 👍**. Likely to resonate with free-tier users looking for more capable models.

6. **[#3704](https://github.com/github/copilot-cli/issues/3704) — Hebrew text should be RTL but displayed LTR**  
   Why it matters: This is a localization/accessibility issue affecting **Hebrew and Arabic** output display. For a terminal-first product, proper RTL rendering is important for usability and correctness.  
   Community reaction: **0 comments, 0 👍**. A focused but meaningful rendering bug.

7. **[#3702](https://github.com/github/copilot-cli/issues/3702) — Small suggestion: Add /ot to the list of synonyms for /ask and /btw**  
   Why it matters: This is a low-risk UX enhancement that would improve command discoverability and shortcut ergonomics. Small alias additions can reduce friction for frequent users.  
   Community reaction: **0 comments, 0 👍**. A lightweight feature request, likely useful but not urgent.

### 4) Key PR Progress
- **No pull requests were updated in the last 24 hours.**  
  There’s no PR activity to summarize for this digest window.

### 5) Feature Request Trends
Across the open issues, the most-requested directions are:

- **MCP reliability and startup deduplication**  
  Repeated initialization, spawning, and OAuth fan-out are the strongest technical concerns. Users want the CLI to behave predictably with multiple workspaces, IDE integration, and remote MCP servers.  
  Related: [#3701](https://github.com/github/copilot-cli/issues/3701), [#3706](https://github.com/github/copilot-cli/issues/3706)

- **Lower-cost and broader model access**  
  Users want more affordable usage and access to higher-capability models, including on free plans. This points to demand for more flexible model routing and pricing options.  
  Related: [#3707](https://github.com/github/copilot-cli/issues/3707), [#3705](https://github.com/github/copilot-cli/issues/3705)

- **Instruction fidelity during compaction**  
  The community expects the CLI to preserve instructions exactly, especially during memory compaction and context rewriting.  
  Related: [#3703](https://github.com/github/copilot-cli/issues/3703)

- **Localization and RTL terminal support**  
  Users want proper rendering for non-Latin scripts and right-to-left languages.  
  Related: [#3704](https://github.com/github/copilot-cli/issues/3704)

- **Small usability improvements in command aliases**  
  Minor CLI shortcuts still matter to power users and can improve workflow speed.  
  Related: [#3702](https://github.com/github/copilot-cli/issues/3702)

### 6) Developer Pain Points
The recurring frustrations are pretty clear:

- **Stateful agent behavior is brittle**: compaction and re-init loops can alter instructions or re-trigger servers unexpectedly.
- **MCP integration is noisy and expensive**: duplicated startup, OAuth churn, and repeated tool-list calls create instability and possible rate-limit issues.
- **Model access and pricing are limiting adoption**: users want more options, especially cheaper or open-weight alternatives.
- **Terminal UX still has gaps**: RTL rendering and command alias ergonomics show that basic interface polish remains important.
- **Trust and predictability matter most**: the most serious issues are not about missing features, but about the CLI doing the wrong thing repeatedly.

If you want, I can also turn this into a **shorter executive summary** or a **Slack-ready digest**.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI Community Digest — 2026-06-07

## 1) Today’s Highlights
Activity was light in the last 24 hours: there were **no new releases** and **no pull requests** updated. The main signal is a **high-severity Windows bug** in `kimi web`’s Work tab, where users hit a **“Daimon control WS not ready”** error followed by an **infinite reload loop at 99%**.  
This issue appears to block core workflow access on Windows 10/11 and is currently **open with no comments or reactions**, suggesting it is newly surfaced but not yet broadly triaged.

## 2) Releases
**No new releases in the last 24 hours.**

## 3) Hot Issues
Only **one issue** was updated in the last 24 hours, so there isn’t enough volume to rank 10 noteworthy issues. The most important item is:

1. **[#2435 — [Bug] Kimi Work tab: “Daimon control WS not ready” + infinite reload at 99%](https://github.com/MoonshotAI/kimi-cli/issues/2435)**  
   - **Why it matters:** This appears to block access to the Work tab entirely, impacting a core UI path in `kimi web`. The failure mode suggests a WebSocket daemon startup regression or initialization race on Windows.  
   - **Community reaction:** **0 comments, 0 👍** so far, indicating no visible discussion yet despite the severity.

## 4) Key PR Progress
There were **no pull requests updated in the last 24 hours**, so there is no PR progress to summarize for today.

## 5) Feature Request Trends
Based on the only updated issue available, the main user need implied is:

- **More reliable `kimi web` / Work tab startup on Windows**  
  The issue points to a desire for a stable daemon/WebSocket initialization flow and a UI that fails gracefully instead of looping at 99%.

## 6) Developer Pain Points
From today’s available data, the recurring pain point is:

- **Startup reliability and daemon connectivity failures**  
  Developers/users are being blocked by an initialization problem in the Work tab, with an error that prevents progress and causes repeated reloads. This suggests friction around cross-platform service startup, WebSocket readiness checks, and recovery UX on Windows.

---

If you want, I can also turn this into a **daily Slack-ready version** or a **more analytical digest with severity tags and action items**.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-06-07

## 1) Today’s Highlights
No new releases landed in the last 24 hours, but the repo was busy with high-signal bug reports and a steady stream of fix-oriented PRs. The dominant theme is reliability: terminal/UI freezes, long-session instability, SSE/memory leaks, provider regressions, and Windows compatibility issues. On the PR side, contributors are actively landing patches for streaming, session accounting, migrations, and provider/runtime integrations.

## 2) Releases
No releases published in the last 24 hours.

## 3) Hot Issues
1. **[#31105 — CLI repeats system message markers as raw numbers](https://github.com/anomalyco/opencode/issues/31105)**  
   Windows users report the terminal flooding with repeated numeric markers like `259 259 259...`, effectively corrupting the session display. This is high-impact because it makes the CLI unusable once triggered. **Community reaction:** 4 comments, suggesting multiple people are reproducing or debugging it.

2. **[#31099 — Desktop renderer freezes with Solid.js infinite loop](https://github.com/anomalyco/opencode/issues/31099)**  
   The desktop app becomes unresponsive after long use, with the renderer logging a freeze tied to `findDOMIndex` behavior. This matters because it is a full UI lockup, not a minor glitch. **Community reaction:** 4 comments, indicating active triage.

3. **[#31155 — Windows crash on older CPUs without AVX2](https://github.com/anomalyco/opencode/issues/31155)**  
   OpenCode crashes immediately with “Illegal instruction” on machines lacking AVX2 support, and the fallback “baseline” path still fails. This is a broad compatibility blocker for older Windows hardware. **Community reaction:** 2 comments.

4. **[#31147 — Bedrock regression with SSO login in 1.16](https://github.com/anomalyco/opencode/issues/31147)**  
   AWS Bedrock users hit an auth/provider regression after upgrading to 1.16, breaking a major enterprise workflow. This is especially important because it affects a core cloud provider path. **Community reaction:** 2 comments.

5. **[#31141 — Subagents fail with `ProviderModelNotFoundError` on tool-using tasks](https://github.com/anomalyco/opencode/issues/31141)**  
   Tool-using subagents fail across write/read/websearch tasks, while text-only checks pass. That points to a serious execution-path mismatch in agent orchestration. **Community reaction:** 2 comments.

6. **[#31129 — Background subagent shortcut appears enabled but does nothing](https://github.com/anomalyco/opencode/issues/31129)**  
   The UI advertises backgrounding (`ctrl+b` / custom keybind), but the endpoint returns false unless an experimental flag is set. This creates a trust gap between release notes/UI hints and actual behavior. **Community reaction:** 2 comments.

7. **[#31087 — SSE streams grow memory without bound](https://github.com/anomalyco/opencode/issues/31087)**  
   Long-running sessions can cause server worker memory to climb until the process becomes unresponsive. This is one of the most important infrastructure stability issues in the batch. **Community reaction:** 2 comments.

8. **[#31122 — OMO harness deadlocks when the stream never closes](https://github.com/anomalyco/opencode/issues/31122)**  
   The stream consumer can hang indefinitely if the provider stops emitting but leaves the connection open. This is a subtle but severe reliability bug; it also received a **👍** from the community, signaling strong pain.

9. **[#31119 — Startup breaks on legacy SQLite migrations: `no such column: name`](https://github.com/anomalyco/opencode/issues/31119)**  
   Updated installs can fail to launch due to an older migration schema mismatch. This is a critical upgrade-blocker because it prevents users from even opening the app. **Community reaction:** 1 comment so far, but it is a high-severity regression.

10. **[#31152 — Infinite compaction loop on every response](https://github.com/anomalyco/opencode/issues/31152)**  
    Even a trivial “hi” message can trigger an endless Build → Compaction cycle. This is an especially dangerous failure mode because it can rack up cost and make the agent unusable. **Community reaction:** early report, but severity is very high.

## 4) Key PR Progress
1. **[#31131 — Batch fix for SSE memory, permissions, encoding, and V2 last-step issues](https://github.com/anomalyco/opencode/pull/31131)**  
   A broad, low-risk patch set that bundles several of the week’s most pressing stability fixes. This is the kind of “operational hardening” PR that can reduce multiple incident classes at once.

2. **[#31107 — Bound SSE event queues to prevent unbounded memory growth](https://github.com/anomalyco/opencode/pull/31107)**  
   Directly addresses the memory-growth issue in long-lived event streams by replacing unbounded buffering. This is likely one of the most impactful reliability fixes in the queue.

3. **[#31123 — Add stream timeout to prevent OMO harness deadlock](https://github.com/anomalyco/opencode/pull/31123)**  
   Introduces timeout handling so the harness does not hang forever when a provider stalls without closing the stream. This should materially improve agent robustness in flaky provider scenarios.

4. **[#31121 — Handle legacy drizzle migrations without `name` column](https://github.com/anomalyco/opencode/pull/31121)**  
   Fixes a startup blocker for older SQLite installs by tolerating historical schema shape. Important for upgrade reliability and backward compatibility.

5. **[#31112 — Retry failed session wakes once](https://github.com/anomalyco/opencode/pull/31112)**  
   Improves resilience of advisory session wake handling by retrying once and preferring newer coalesced work. This targets a subtle but user-visible failure mode in session orchestration.

6. **[#31139 — Thread per-request fetch through native transport for websocket support](https://github.com/anomalyco/opencode/pull/31139)**  
   Restores websocket compatibility for Codex OAuth/native LLM paths by propagating per-request fetch overrides. A key integration fix for advanced provider setups.

7. **[#31138 — Derive per-model stats from step-finish parts](https://github.com/anomalyco/opencode/pull/31138)**  
   Improves telemetry/accounting accuracy by computing model stats from the right lifecycle events. This helps make usage and cost reporting more trustworthy.

8. **[#31136 — Exclude pre-fork costs from forked session totals](https://github.com/anomalyco/opencode/pull/31136)**  
   Fixes duplicated cost/token accounting when sessions are forked. This is important for accurate billing and analysis across branched conversations.

9. **[#31157 — Add token activity heatmap to the home sidebar](https://github.com/anomalyco/opencode/pull/31157)**  
   A user-facing analytics feature that visualizes usage over time in a contribution-grid style panel. This suggests growing investment in observability and usage insight.

10. **[#31118 — Add freemodel.dev auth provider](https://github.com/anomalyco/opencode/pull/31118)**  
    Expands provider support with a built-in auth integration for freemodel.dev. This broadens OpenCode’s model access surface for users who want gateway-based workflows.

## 5) Feature Request Trends
- **Agent control and execution ergonomics** — users want background subagents, safer task loops, retryable wakes, and better handling of task/subtask permissions.  
  Examples: [#31129](https://github.com/anomalyco/opencode/issues/31129), [#31108](https://github.com/anomalyco/opencode/issues/31108), [#31140](https://github.com/anomalyco/opencode/issues/31140)

- **Keyboard and UI customization** — recurring asks include remappable shortcuts and platform-specific input fixes.  
  Examples: [#31100](https://github.com/anomalyco/opencode/issues/31100), [#31089](https://github.com/anomalyco/opencode/issues/31089)

- **Extensibility and plugin APIs** — contributors are asking for hooks around system prompts, environment info, and community plugin discovery.  
  Examples: [#31158](https://github.com/anomalyco/opencode/issues/31158), [#31161](https://github.com/anomalyco/opencode/issues/31161)

- **Broader provider/model compatibility** — demand remains strong for Bedrock, Databricks-compatible gateways, freemodel-style auth, and more model catalog accuracy.  
  Examples: [#31147](https://github.com/anomalyco/opencode/issues/31147), [#31156](https://github.com/anomalyco/opencode/issues/31156), [#31128](https://github.com/anomalyco/opencode/issues/31128), [#31150](https://github.com/anomalyco/opencode/issues/31150)

- **Integrated tooling and richer workflows** — the community is asking for browser control, better session management, and clearer UI state.  
  Examples: [#31143](https://github.com/anomalyco/opencode/issues/31143), [#31104](https://github.com/anomalyco/opencode/issues/31104), [#31153](https://github.com/anomalyco/opencode/issues/31153)

## 6) Developer Pain Points
- **Long-running stability issues** keep surfacing: freezes, segfaults, deadlocks, and infinite loops are the most repeated complaint pattern.  
  Examples: [#31099](https://github.com/anomalyco/opencode/issues/31099), [#31144](https://github.com/anomalyco/opencode/issues/31144), [#31122](https://github.com/anomalyco/opencode/issues/31122), [#31152](https://github.com/anomalyco/opencode/issues/31152)

- **Memory and stream backpressure problems** are a recurring operational concern for server and harness code.  
  Examples: [#31087](https://github.com/anomalyco/opencode/issues/31087), [#31107](https://github.com/anomalyco/opencode/pull/31107), [#31123](https://github.com/anomalyco/opencode/pull/31123)

- **Provider integration regressions** are frustrating users who rely on OpenCode across multiple backends and auth modes.  
  Examples: [#31147](https://github.com/anomalyco/opencode/issues/31147), [#31156](https://github.com/anomalyco/opencode/issues/31156), [#31128](https://github.com/anomalyco/opencode/issues/31128), [#31118](https://github.com/anomalyco/opencode/pull/31118)

- **Upgrade and compatibility regressions** are blocking adoption on Windows, legacy SQLite installs, and desktop packaging paths.  
  Examples: [#31155](https://github.com/anomalyco/opencode/issues/31155), [#31119](https://github.com/anomalyco/opencode/issues/31119), [#31148](https://github.com/anomalyco/opencode/issues/31148)

- **State/reporting clarity** is still a pain point: users want accurate versioning, session restore, cost accounting, and better visibility into what the app is doing.  
  Examples: [#31153](https://github.com/anomalyco/opencode/issues/31153), [#31104](https://github.com/anomalyco/opencode/issues/31104), [#31136](https://github.com/anomalyco/opencode/pull/31136), [#31138](https://github.com/anomalyco/opencode/pull/31138)

If you want, I can also turn this into a shorter “Slack-ready” version or a more executive-style weekly brief.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi Community Digest — 2026-06-07

## 1) Today’s Highlights
Pi saw a concentrated burst of same-day triage: 10 issues and 4 PRs were updated in the last 24 hours, and almost everything was closed quickly. The strongest themes were developer-experience polish, extension API ergonomics, and compatibility fixes for model/provider behavior. The only clearly open item is a request to add UI and validation metadata to spirit prompt arguments, which points to continued investment in prompt authoring workflows.

## 2) Releases
No new releases in the last 24 hours.

## 3) Hot Issues
> All 10 updated issues were either closed the same day or remain lightly discussed, with low reaction volume overall (mostly 0 👍 and 1–2 comments), suggesting focused but not broadly debated requests.

1. **[#5456](https://github.com/badlogic/pi-mono/issues/5456) — openai-responses provider ignores `compat.supportsDeveloperRole`**  
   **Why it matters:** This is a compatibility bug that can break agents on providers that do not support the `developer` role, especially when reasoning is enabled.  
   **Community reaction:** 2 comments, 0 👍; small discussion, but high technical importance for cross-provider reliability.

2. **[#5462](https://github.com/badlogic/pi-mono/issues/5462) — Markdown code blocks render literal triple-backtick fences in TUI**  
   **Why it matters:** Affects readability in the terminal UI and makes rendered assistant output look like raw Markdown.  
   **Community reaction:** 1 comment, 0 👍; classic UX polish issue with immediate user-visible impact.

3. **[#5461](https://github.com/badlogic/pi-mono/issues/5461) — Allow extensions to durably evict injected context mid-session**  
   **Why it matters:** Important for extension authors who need canonical session state to reflect removed context, not just append-only history.  
   **Community reaction:** 1 comment, 0 👍; indicates strong interest in more precise session lifecycle controls.

4. **[#5460](https://github.com/badlogic/pi-mono/issues/5460) — `roll attest`: external evidence from `ac-map.json` can’t reach dynamic `runDir`**  
   **Why it matters:** Blocks attestation workflows that rely on externally prepared evidence files; this is a pipeline/integration correctness issue.  
   **Community reaction:** 1 comment, 0 👍; narrow but important for automation users.

5. **[#5459](https://github.com/badlogic/pi-mono/issues/5459) — Add UI and validation metadata for spirit prompt arguments**  
   **Why it matters:** A strategic feature request for making prompt forms more usable and less error-prone through inline metadata.  
   **Community reaction:** 1 comment, 0 👍; this is the main open issue in today’s batch and likely a near-term roadmap candidate.

6. **[#5455](https://github.com/badlogic/pi-mono/issues/5455) — Export `RpcExtensionUIRequest` / `RpcExtensionUIResponse` from the public API**  
   **Why it matters:** Expands the public surface needed by extension developers, removing a protocol access gap.  
   **Community reaction:** 1 comment, 0 👍; a targeted API exposure request from an ecosystem integrator.

7. **[#5454](https://github.com/badlogic/pi-mono/issues/5454) — Navigating between prompts also moves within multiline prompt text**  
   **Why it matters:** Breaks expected keyboard navigation and can make prompt history editing frustrating in the TUI.  
   **Community reaction:** 1 comment, 0 👍; a small but highly actionable interaction bug.

8. **[#5453](https://github.com/badlogic/pi-mono/issues/5453) — `pi.dev/packages` shows stale npm packument `readme` instead of tarball README**  
   **Why it matters:** Causes incorrect language/content on package pages and undermines trust in package metadata rendering.  
   **Community reaction:** 1 comment, 0 👍; a correctness issue with visible product impact.

9. **[#5448](https://github.com/badlogic/pi-mono/issues/5448) — Support overwriting `expandPromptTemplates` in `sendUserMessage`**  
   **Why it matters:** Gives extensions more control over command-triggered flows and prompt expansion behavior.  
   **Community reaction:** 1 comment, 0 👍; clearly aimed at extension author productivity.

10. **[#5457](https://github.com/badlogic/pi-mono/issues/5457) — Add copy button for shell in control panel**  
    **Why it matters:** A simple usability win that reduces friction for users copying shell commands from the UI.  
    **Community reaction:** 0 comments, 0 👍; low discussion, but straightforward UX value.

## 4) Key PR Progress
> Only 4 PRs were updated in the last 24 hours, and all were closed.

1. **[PR #5458](https://github.com/badlogic/pi-mono/pull/5458) — Merge pull request #1 from earendil-works/main**  
   **Progress:** Repository merge PR; likely integration/branch consolidation with no detailed feature note in the feed.

2. **[PR #5452](https://github.com/badlogic/pi-mono/pull/5452) — Codex/readme install rewrite**  
   **Progress:** Readme/installation rewrite, likely improving onboarding and setup instructions.

3. **[PR #5451](https://github.com/badlogic/pi-mono/pull/5451) — Fix security issue in vitest**  
   **Progress:** Security-oriented dependency/tooling fix, important for CI and test environment hygiene.

4. **[PR #5450](https://github.com/badlogic/pi-mono/pull/5450) — fix(tui): make Tab submit slash commands from autocomplete like Enter**  
   **Progress:** Improves command entry flow in the TUI by aligning Tab behavior with Enter for slash-command submission.

## 5) Feature Request Trends
Across today’s issues, the clearest request patterns are:

- **Extension API ergonomics:** requests for public RPC type exports, durable context eviction, and `sendUserMessage` behavior control.
- **Prompt authoring UX:** inline metadata for prompt arguments, validation support, and better form rendering for spirit prompts.
- **Terminal UI polish:** markdown rendering fixes, prompt navigation behavior, and shell copy affordances.
- **Provider/model compatibility:** handling provider differences such as unsupported `developer` roles.
- **Platform/content correctness:** fixing stale package README rendering and evidence-path resolution in attest workflows.

## 6) Developer Pain Points
Recurring developer frustrations today center on **control and predictability**: extension authors want clearer APIs, stable session semantics, and better ways to shape prompt workflows. Another cluster is **TUI interaction friction**—navigation bugs, command submission inconsistencies, and low-effort but high-frequency UX gaps like copy-to-clipboard support. Finally, there’s a strong signal for **compatibility correctness** across providers and metadata pipelines, where small mismatches can break downstream tooling or misrepresent content.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

## Qwen Code Community Digest — 2026-06-07

### 1) Today’s Highlights
Qwen Code’s activity in the last 24 hours is heavily concentrated on **daemon/web-shell parity** and **session/state management**: new PRs add HTTP rewind, settings, hooks diagnostics, and ACP-mode command support. The only release in the window is a **nightly patch** that improves copy behavior by skipping thought parts. On the issue side, the community is asking for better **scriptable session tooling** and more **declarative agent configuration**.

---

### 2) Releases
- **[v0.17.1-nightly.20260606.16c1d9a5a](https://github.com/QwenLM/qwen-code/releases/tag/v0.17.1-nightly.20260606.16c1d9a5a)**  
  Changes in this nightly:
  - `chore(release): v0.17.1`
  - `fix(cli): skip thought parts in copy output`  
  This looks like a small but practical CLI polish release, mainly reducing noise in copied output.

---

### 3) Hot Issues
> Only **2 issues** were updated in the last 24h slice, so this section covers all active issue signals in the provided data.

1. **[#4825 — qwen sessions list subcommand with `--json`, `--tag`, and date filters](https://github.com/QwenLM/qwen-code/issues/4825)**  
   - **Why it matters:** This is a strong request for a script-friendly session inventory command, which would make session history much easier to automate and integrate with tooling.  
   - **Community reaction:** 3 comments, 0 👍 — early but concrete demand, with no negative vote signal yet.

2. **[#4821 — Support declarative agent definitions via frontmatter files](https://github.com/QwenLM/qwen-code/issues/4821)**  
   - **Why it matters:** This would move custom agent setup from TypeScript to Markdown/YAML frontmatter, lowering the barrier for extension and sharing.  
   - **Community reaction:** 3 comments, 0 👍 — another clearly actionable feature request, still in needs-triage.

---

### 4) Key PR Progress
> The 24h PR window contains **9 PRs**; I’ve included the most important progress items and one release PR to round out the main themes.

1. **[#4826 — Enable `/directory` command in ACP mode](https://github.com/QwenLM/qwen-code/pull/4826)**  
   Extends directory management to web-shell/ACP users by switching to `MessageActionReturn` flow.

2. **[#4824 — Prevent OOM by compacting API history, UI history, and triggering under memory pressure](https://github.com/QwenLM/qwen-code/pull/4824)**  
   A significant stability fix aimed at long-running sessions; targets old-space exhaustion and history growth.

3. **[#4823 — Microcompact resumed goal continuations](https://github.com/QwenLM/qwen-code/pull/4823)**  
   Improves cleanup behavior for resumed/long-running goal continuations, reducing stale tool-result buildup.

4. **[#4822 — Add hooks diagnostic HTTP/ACP surface](https://github.com/QwenLM/qwen-code/pull/4822)**  
   Adds read-only endpoints for querying workspace/session hook configuration from remote clients.

5. **[#4820 — Add HTTP rewind endpoints for daemon/web-shell](https://github.com/QwenLM/qwen-code/pull/4820)**  
   Important remote-control feature: lets daemon clients rewind session conversation/files via HTTP instead of TUI-only UI flows.

6. **[#4816 — Add `/settings` slash command for web-shell](https://github.com/QwenLM/qwen-code/pull/4816)**  
   Brings settings management into the web-shell/daemon experience with API routes, SDK hooks, and UI wiring.

7. **[#4819 — Enable `/remember`, `/forget`, `/dream` in ACP mode](https://github.com/QwenLM/qwen-code/pull/4819)**  
   Adds memory-related slash commands to ACP mode, helping close interactive-vs-web-shell parity gaps.

8. **[#4818 — Revert “enable `/remember`, `/forget`, `/dream` in ACP mode”](https://github.com/QwenLM/qwen-code/pull/4818)**  
   The revert suggests either a regression, compatibility issue, or branch synchronization step in the daemon workstream.

9. **[#4817 — Add HTTP rewind endpoints for daemon/web-shell](https://github.com/QwenLM/qwen-code/pull/4817)**  
   A closed/older branch variant of the rewind work; useful as a signal that this capability is being iterated quickly.

10. **[#4742 — Release v0.17.1](https://github.com/QwenLM/qwen-code/pull/4742)**  
   Release housekeeping that ties the nightly tag to the current release train.

---

### 5) Feature Request Trends
The strongest request patterns in the provided data are:

- **Scriptable session management**  
  Users want `qwen sessions list` with JSON output, tag filtering, and date filters for automation and analysis.

- **Declarative agent configuration**  
  There’s clear interest in defining custom agents via Markdown/frontmatter rather than hardcoding them in TypeScript.

- **ACP/web-shell parity**  
  Multiple PRs point to demand for the same commands and workflows available in interactive mode to also work in remote/daemon mode.

- **Remote session control APIs**  
  Rewind, hooks diagnostics, and settings endpoints suggest growing demand for HTTP-accessible control surfaces.

- **Memory and history stability**  
  The OOM-related PRs imply a broader need for long-session robustness and better history compaction.

---

### 6) Developer Pain Points
Recurring frustrations visible in this window include:

- **No easy CLI for session introspection/export**  
  Users want structured access to session history rather than manual browsing of stored files.

- **Configuration is too code-centric for agents**  
  Agent definitions being embedded in TypeScript makes customization harder than a frontmatter-based model would.

- **Feature parity gaps between interactive and ACP/web-shell modes**  
  Commands like `/directory`, `/settings`, `/remember`, `/forget`, and `/dream` are being ported over because remote users hit missing functionality.

- **Long-running sessions can degrade memory usage**  
  The OOM-focused PRs indicate pain from history growth and stale tool-result accumulation.

- **Operational visibility is limited in daemon mode**  
  Hooks, rewind, and settings all need diagnosable, remotely accessible APIs for web-shell and SDK consumers.

If you want, I can also turn this into a **shorter Slack-style digest** or a **weekly changelog format**.

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

## DeepSeek TUI Community Digest — 2026-06-07

### 1) Today’s Highlights
No new releases landed in the last 24 hours, but the repo saw meaningful stability and UX work. The biggest user-facing themes were keyboard-layout compatibility and runtime error handling, highlighted by the open stream failure report in [#2847](https://github.com/Hmbown/CodeWhale/issues/2847) and the AZERTY/AltGr conflict in [#2863](https://github.com/Hmbown/CodeWhale/issues/2863).  
At the same time, the project continued its v0.9 hardening push with multi-tab groundwork, hotbar infrastructure, runtime metadata exposure, and extensive release-evidence documentation.

### 2) Releases
None in the last 24 hours.

---

### 3) Hot Issues
*Note: only 2 issue threads were updated in the last 24h, so this section mixes those issues with the most relevant issue-driven follow-up fixes currently absorbing community attention.*

1. [#2847 — Abnormal stop working while coding or analysis](https://github.com/Hmbown/CodeWhale/issues/2847)  
   Open bug reporting `Warn Stream read error: error decoding response body`. Important because it interrupts active coding/analysis sessions; 2 comments suggest a reproducible pain point, but no visible 👍 traction yet.

2. [#2863 — French AZERTY @ key conflicts with Alt-@ sidebar shortcut in TUI composer](https://github.com/Hmbown/CodeWhale/issues/2863)  
   Closed bug on keyboard shortcut collisions for European layouts. This is a classic accessibility/usability issue: small in scope, but high impact for affected users; 1 comment indicates a focused real-world repro.

3. [#2867 — fix(tui): prevent AltGr from swallowing @/#/$/!/% characters in composer](https://github.com/Hmbown/CodeWhale/pull/2867)  
   A direct response to the keyboard-layout problem. This matters because AltGr behavior on Windows commonly breaks text entry in European layouts, and this fix reduces false shortcut activation.

4. [#2849 — fix(tui): classify stream decode failures as network errors](https://github.com/Hmbown/CodeWhale/pull/2849)  
   Addresses the class of failures behind #2847 by turning cryptic decode failures into recoverable network interruptions. This should improve user trust and reduce “app just died” impressions.

5. [#2848 — fix(vscode): keep agent view metadata on snapshot errors](https://github.com/Hmbown/CodeWhale/pull/2848)  
   Important for resilience: even when snapshot listing fails, users still retain branch/workspace context. That reduces workflow disruption in read-only views.

6. [#2862 — feat(runtime-api): expose git status metadata for Agent View](https://github.com/Hmbown/CodeWhale/pull/2862)  
   Adds `head` and `dirty` metadata to runtime summaries and API responses. Community value is high because users want immediate repo-state visibility without extra manual checks.

7. [#2864 — feat(tui): add multi-tab system core (manager + persistence)](https://github.com/Hmbown/CodeWhale/pull/2864)  
   A major workflow request area: multi-context navigation. Tabs are a foundational UX feature for power users juggling multiple tasks, threads, or repos.

8. [#2866 — feat(tui): add hotbar action registry foundation](https://github.com/Hmbown/CodeWhale/pull/2866)  
   Lays the groundwork for extensible command/action dispatch. This matters because it can unlock more discoverable, customizable workflows later.

9. [#2865 — Modernize toward latest Claude Code (prompts, hooks, skills, agents, UI)](https://github.com/Hmbown/CodeWhale/pull/2865)  
   Broad parity/modernization work. It signals a strategic push to close feature gaps and keep the product aligned with competitive AI coding assistant expectations.

10. [#2857 — docs(release): record v0.9 core gate evidence](https://github.com/Hmbown/CodeWhale/pull/2857)  
    Not a user-facing feature, but highly relevant community-wise: it shows the project is tightening its release bar with reproducible checks and acceptance evidence.

---

### 4) Key PR Progress

1. [#2867 — fix(tui): prevent AltGr from swallowing @/#/$/!/% characters in composer](https://github.com/Hmbown/CodeWhale/pull/2867)  
   Fixes international keyboard input in the composer and prevents shortcut conflicts.

2. [#2866 — feat(tui): add hotbar action registry foundation](https://github.com/Hmbown/CodeWhale/pull/2866)  
   Introduces the action registry layer needed for a more modular command system.

3. [#2865 — Modernize toward latest Claude Code (prompts, hooks, skills, agents, UI)](https://github.com/Hmbown/CodeWhale/pull/2865)  
   Large modernization effort spanning behavior, lifecycle, and UI parity.

4. [#2864 — feat(tui): add multi-tab system core (manager + persistence)](https://github.com/Hmbown/CodeWhale/pull/2864)  
   Adds the tab-core/persistence slice needed for multi-tab workflows.

5. [#2862 — feat(runtime-api): expose git status metadata for Agent View](https://github.com/Hmbown/CodeWhale/pull/2862)  
   Surfaces branch/head/dirty state to runtime consumers and GUI views.

6. [#2849 — fix(tui): classify stream decode failures as network errors](https://github.com/Hmbown/CodeWhale/pull/2849)  
   Improves error taxonomy and makes stream failures more actionable.

7. [#2848 — fix(vscode): keep agent view metadata on snapshot errors](https://github.com/Hmbown/CodeWhale/pull/2848)  
   Improves extension-side resilience when snapshot refreshes fail.

8. [#2852 — test(whaleflow): replay dogfood workflow from recorded trace](https://github.com/Hmbown/CodeWhale/pull/2852)  
   Strengthens regression coverage by replaying a real workflow trace and validating divergence detection.

9. [#2850 — feat(config): add dormant harness profile resolver](https://github.com/Hmbown/CodeWhale/pull/2850)  
   Adds deterministic profile resolution logic while keeping runtime behavior dormant for safety.

10. [#2861 — docs(release): record Linux startup evidence](https://github.com/Hmbown/CodeWhale/pull/2861)  
    Adds Linux startup verification evidence to support release readiness and cross-platform confidence.

---

### 5) Feature Request Trends
1. **International keyboard and shortcut compatibility** — especially AltGr and European layouts.  
   Evidence: [#2863](https://github.com/Hmbown/CodeWhale/issues/2863), [#2867](https://github.com/Hmbown/CodeWhale/pull/2867)

2. **Better runtime error resilience and clearer failure classification** — especially stream/body decode issues.  
   Evidence: [#2847](https://github.com/Hmbown/CodeWhale/issues/2847), [#2849](https://github.com/Hmbown/CodeWhale/pull/2849)

3. **Richer workflow navigation and context management** — tabs, hotbar actions, sidebar metadata, and thread visibility.  
   Evidence: [#2864](https://github.com/Hmbown/CodeWhale/pull/2864), [#2866](https://github.com/Hmbown/CodeWhale/pull/2866), [#2862](https://github.com/Hmbown/CodeWhale/pull/2862), [#2848](https://github.com/Hmbown/CodeWhale/pull/2848)

4. **Parity with Claude Code’s broader UX/agent model** — prompts, hooks, skills, agents, and UI behavior.  
   Evidence: [#2865](https://github.com/Hmbown/CodeWhale/pull/2865)

5. **Stronger release discipline and traceable acceptance evidence** — startup checks, smoke tests, and documented gates.  
   Evidence: [#2857](https://github.com/Hmbown/CodeWhale/pull/2857), [#2861](https://github.com/Hmbown/CodeWhale/pull/2861), [#2859](https://github.com/Hmbown/CodeWhale/pull/2859), [#2860](https://github.com/Hmbown/CodeWhale/pull/2860)

---

### 6) Developer Pain Points
- **Keyboard input collisions on non-US layouts** continue to block normal typing in the composer.  
  Source: [#2863](https://github.com/Hmbown/CodeWhale/issues/2863), [#2867](https://github.com/Hmbown/CodeWhale/pull/2867)

- **Stream decoding failures are still surfacing as workflow-stopping errors** during coding and analysis.  
  Source: [#2847](https://github.com/Hmbown/CodeWhale/issues/2847), [#2849](https://github.com/Hmbown/CodeWhale/pull/2849)

- **Metadata loss during snapshot/listing failures hurts context continuity** in read-only views and agent panes.  
  Source: [#2848](https://github.com/Hmbown/CodeWhale/pull/2848), [#2862](https://github.com/Hmbown/CodeWhale/pull/2862)

- **The UX is moving toward multi-context power-user workflows, but the current single-pane flow still creates friction.**  
  Source: [#2864](https://github.com/Hmbown/CodeWhale/pull/2864), [#2866](https://github.com/Hmbown/CodeWhale/pull/2866)

- **Release validation remains documentation-heavy and evidence-driven**, indicating a strong need for reproducibility but also a significant maintainer burden.  
  Source: [#2857](https://github.com/Hmbown/CodeWhale/pull/2857), [#2861](https://github.com/Hmbown/CodeWhale/pull/2861), [#2859](https://github.com/Hmbown/CodeWhale/pull/2859), [#2860](https://github.com/Hmbown/CodeWhale/pull/2860)

If you want, I can also turn this into a shorter Slack-style digest or a table format for internal sharing.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/leisure3318/agents-radar).*