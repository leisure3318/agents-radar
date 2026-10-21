import { beforeEach, describe, expect, it, vi } from "vitest";
import { parseSkillsResponse } from "../skills.ts";

const { saveFile, createGitHubIssue } = vi.hoisted(() => ({
  saveFile: vi.fn(),
  createGitHubIssue: vi.fn(),
}));
vi.mock("../report.ts", () => ({ saveFile, callLlmLang: vi.fn(), LLM_TOKENS_WEB: 8192 }));
vi.mock("../github.ts", () => ({ createGitHubIssue }));
import { saveSkillsReport } from "../report-savers.ts";

const data = {
  fetchSuccess: true,
  skills: parseSkillsResponse([{ source: "owner/repo", slug: "example" }], "hot"),
};

describe("saveSkillsReport", () => {
  beforeEach(() => vi.clearAllMocks());

  it.each(["", "   ", "⚠️ AI Skills 新上榜报告生成失败。"])(
    "does not publish an unavailable summary: %s",
    async (summary) => {
      expect(await saveSkillsReport(data, summary, "02:00", "2026-10-21", "owner/repo", "")).toBe(false);
      expect(saveFile).not.toHaveBeenCalled();
      expect(createGitHubIssue).not.toHaveBeenCalled();
    },
  );

  it("marks a real report as written only after publishing it", async () => {
    expect(
      await saveSkillsReport(data, "## example\nUseful skill", "02:00", "2026-10-21", "owner/repo", ""),
    ).toBe(true);
    expect(saveFile).toHaveBeenCalledOnce();
    expect(createGitHubIssue).toHaveBeenCalledOnce();
  });

  it("propagates publishing errors so the skill is not marked seen", async () => {
    createGitHubIssue.mockRejectedValueOnce(new Error("GitHub unavailable"));
    await expect(
      saveSkillsReport(data, "## example", "02:00", "2026-10-21", "owner/repo", ""),
    ).rejects.toThrow("GitHub unavailable");
  });
});
