import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import fs from "node:fs";

// ---------------------------------------------------------------------------
// Mock provider — intercepts createProvider() so the module-level `provider`
// in report.ts uses our controllable mock instead of a real SDK client.
// ---------------------------------------------------------------------------

const { mockCall, fallbackCall } = vi.hoisted(() => ({
  fallbackCall: vi.fn<(prompt: string, maxTokens: number) => Promise<string>>(),
  mockCall: vi.fn<(prompt: string, maxTokens: number) => Promise<string>>(),
}));

vi.mock("../providers/index.ts", async (importOriginal) => {
  const orig = await importOriginal<typeof import("../providers/index.ts")>();
  return {
    ...orig,
    createProvider: () => ({ name: "mock", call: mockCall }),
  };
});

vi.mock("../providers/deepseek.ts", () => ({
  DeepSeekProvider: class {
    name = "deepseek";
    call = fallbackCall;
  },
}));

import { is429, callLlm, saveFile, autoGenFooter } from "../report.ts";

// ---------------------------------------------------------------------------
// is429
// ---------------------------------------------------------------------------

describe("is429", () => {
  it("detects status 429 from error-like objects", () => {
    expect(is429({ status: 429 })).toBe(true);
  });

  it("detects 429 from string representation", () => {
    expect(is429(new Error("Request failed with 429"))).toBe(true);
  });

  it("returns false for other status codes", () => {
    expect(is429({ status: 500 })).toBe(false);
    expect(is429({ status: 200 })).toBe(false);
  });

  it("returns false for null/undefined", () => {
    expect(is429(null)).toBe(false);
    expect(is429(undefined)).toBe(false);
  });

  it("returns false for unrelated errors", () => {
    expect(is429(new Error("Something else"))).toBe(false);
  });

  it("detects OpenAI SDK RateLimitError shape (status + code)", () => {
    const openaiError = Object.assign(new Error("Rate limit reached"), {
      status: 429,
      code: "rate_limit_exceeded",
      type: "tokens",
    });
    expect(is429(openaiError)).toBe(true);
  });

  it("detects Anthropic SDK APIError shape (status + headers)", () => {
    const anthropicError = Object.assign(new Error("rate_limit_error"), {
      status: 429,
      headers: { "retry-after": "30" },
    });
    expect(is429(anthropicError)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// saveFile
// ---------------------------------------------------------------------------

describe("saveFile", () => {
  beforeEach(() => {
    vi.spyOn(fs, "mkdirSync").mockReturnValue(undefined);
    vi.spyOn(fs, "writeFileSync").mockReturnValue(undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the expected file path", () => {
    const result = saveFile("content", "2026-03-09", "ai-cli.md");
    expect(result).toBe("digests/2026-03-09/ai-cli.md");
  });

  it("creates parent directories recursively", () => {
    saveFile("content", "2026-03-09", "ai-cli.md");
    expect(fs.mkdirSync).toHaveBeenCalledWith("digests/2026-03-09", { recursive: true });
  });

  it("writes content as utf-8", () => {
    saveFile("hello world", "2026-03-09", "test.md");
    expect(fs.writeFileSync).toHaveBeenCalledWith("digests/2026-03-09/test.md", "hello world", "utf-8");
  });
});

// ---------------------------------------------------------------------------
// autoGenFooter
// ---------------------------------------------------------------------------

describe("autoGenFooter", () => {
  const originalEnv = process.env["DIGEST_REPO"];

  afterEach(() => {
    if (originalEnv !== undefined) {
      process.env["DIGEST_REPO"] = originalEnv;
    } else {
      delete process.env["DIGEST_REPO"];
    }
  });

  it("returns empty string when DIGEST_REPO is not set", () => {
    delete process.env["DIGEST_REPO"];
    expect(autoGenFooter()).toBe("");
  });

  it("returns empty string when DIGEST_REPO is empty", () => {
    process.env["DIGEST_REPO"] = "";
    expect(autoGenFooter()).toBe("");
  });

  it("returns Chinese footer when DIGEST_REPO is set", () => {
    process.env["DIGEST_REPO"] = "user/repo";
    const result = autoGenFooter("zh");
    expect(result).toContain("agents-radar");
    expect(result).toContain("github.com/user/repo");
    expect(result).toContain("自动生成");
  });

  it("returns English footer when lang is en", () => {
    process.env["DIGEST_REPO"] = "user/repo";
    const result = autoGenFooter("en");
    expect(result).toContain("auto-generated");
    expect(result).toContain("agents-radar");
  });
});

// ---------------------------------------------------------------------------
// callLlm
// ---------------------------------------------------------------------------

describe("callLlm", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockCall.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("passes prompt and maxTokens to provider.call()", async () => {
    mockCall.mockResolvedValueOnce("response text");

    const result = await callLlm("hello", 2048);

    expect(result).toBe("response text");
    expect(mockCall).toHaveBeenCalledOnce();
    expect(mockCall).toHaveBeenCalledWith("hello", 2048);
  });

  it("uses default maxTokens of 4096", async () => {
    mockCall.mockResolvedValueOnce("ok");

    await callLlm("prompt");

    expect(mockCall).toHaveBeenCalledWith("prompt", 4096);
  });

  it("retries on 429 with exponential backoff", async () => {
    const err429 = Object.assign(new Error("rate limited"), { status: 429 });
    mockCall.mockRejectedValueOnce(err429);
    mockCall.mockResolvedValueOnce("success after retry");

    const promise = callLlm("prompt", 1024);

    // First call rejects with 429 — advance past the 5 s backoff
    await vi.advanceTimersByTimeAsync(5_000);

    const result = await promise;
    expect(result).toBe("success after retry");
    expect(mockCall).toHaveBeenCalledTimes(2);
  });

  it("retries up to MAX_RETRIES times then throws", async () => {
    const err429 = Object.assign(new Error("rate limited"), { status: 429 });
    mockCall
      .mockRejectedValueOnce(err429)
      .mockRejectedValueOnce(err429)
      .mockRejectedValueOnce(err429)
      .mockRejectedValueOnce(err429);

    const promise = callLlm("prompt", 1024);
    // Attach a no-op catch immediately so Node doesn't flag unhandled rejection
    // before the expect() below gets a chance to inspect the rejection.
    promise.catch(() => {});

    // Advance through all 3 retry backoffs: 5s, 10s, 20s
    await vi.advanceTimersByTimeAsync(5_000);
    await vi.advanceTimersByTimeAsync(10_000);
    await vi.advanceTimersByTimeAsync(20_000);

    await expect(promise).rejects.toThrow("rate limited");
    // 1 initial + 3 retries = 4 total calls
    expect(mockCall).toHaveBeenCalledTimes(4);
  });

  it.each([408, 500, 502, 503, 504])("recovers from transient HTTP %s", async (status) => {
    mockCall.mockRejectedValueOnce(Object.assign(new Error("unavailable"), { status }));
    mockCall.mockResolvedValueOnce("recovered");
    const promise = callLlm("prompt");
    await vi.advanceTimersByTimeAsync(5_000);
    expect(await promise).toBe("recovered");
    expect(mockCall).toHaveBeenCalledTimes(2);
  });

  it.each(["APIConnectionError", "APIConnectionTimeoutError"])("retries %s", async (name) => {
    mockCall.mockRejectedValueOnce(Object.assign(new Error("connection failed"), { name }));
    mockCall.mockResolvedValueOnce("recovered");
    const promise = callLlm("prompt");
    await vi.advanceTimersByTimeAsync(5_000);
    expect(await promise).toBe("recovered");
  });

  it("throws immediately on non-429 errors", async () => {
    mockCall.mockRejectedValueOnce(new Error("server error"));

    await expect(callLlm("prompt")).rejects.toThrow("server error");
    expect(mockCall).toHaveBeenCalledOnce();
  });

  it("does not leak concurrency slots on 429 retries", async () => {
    const err429 = Object.assign(new Error("429"), { status: 429 });
    mockCall.mockRejectedValueOnce(err429);
    mockCall.mockResolvedValueOnce("ok");

    const promise = callLlm("prompt");
    await vi.advanceTimersByTimeAsync(5_000);
    await promise;

    // If slots leaked, subsequent calls would hang. Fire LLM_CONCURRENCY (5)
    // calls to prove all slots are available.
    mockCall.mockResolvedValue("ok");
    const batch = Array.from({ length: 5 }, (_, i) => callLlm(`p${i}`));
    const results = await Promise.all(batch);
    expect(results).toEqual(["ok", "ok", "ok", "ok", "ok"]);
  });
});

describe("publication health", () => {
  beforeEach(() => {
    vi.resetModules();
    mockCall.mockReset();
  });

  it("blocks publication after a 502 even when the caller catches it", async () => {
    const report = await import("../report.ts");
    vi.useFakeTimers();
    mockCall.mockRejectedValue(Object.assign(new Error("Bad Gateway"), { status: 502 }));
    const failed = expect(report.callLlm("prompt")).rejects.toThrow("Bad Gateway");
    await vi.runAllTimersAsync();
    await failed;
    vi.useRealTimers();
    expect(() => report.assertLlmSuccess()).toThrow("publication aborted");
  });

  it("allows successful requests and skipped English summaries", async () => {
    const report = await import("../report.ts");
    mockCall.mockResolvedValueOnce("summary");
    await report.callLlm("prompt");
    await report.callLlmLang("en", "prompt");
    expect(() => report.assertLlmSuccess()).not.toThrow();
  });
});

describe("provider failover", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers();
    vi.stubEnv("DEEPSEEK_API_KEY", "test-key");
    mockCall.mockReset();
    fallbackCall.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
  });

  it("falls back after persistent 503 and permits publication", async () => {
    const report = await import("../report.ts");
    mockCall.mockRejectedValue(Object.assign(new Error("Service Unavailable"), { status: 503 }));
    fallbackCall.mockResolvedValue("backup summary");
    const result = report.callLlm("prompt", 2048);
    await vi.runAllTimersAsync();
    expect(await result).toBe("backup summary");
    expect(mockCall).toHaveBeenCalledTimes(4);
    expect(fallbackCall).toHaveBeenCalledWith("prompt", 2048);
    expect(() => report.assertLlmSuccess()).not.toThrow();
  });

  it("preserves immediate fallback for 403", async () => {
    const report = await import("../report.ts");
    mockCall.mockRejectedValue(Object.assign(new Error("quota"), { status: 403 }));
    fallbackCall.mockResolvedValue("backup summary");
    expect(await report.callLlm("prompt")).toBe("backup summary");
    expect(mockCall).toHaveBeenCalledOnce();
  });

  it("blocks publication if both providers fail", async () => {
    const report = await import("../report.ts");
    mockCall.mockRejectedValue(Object.assign(new Error("unavailable"), { status: 503 }));
    fallbackCall.mockRejectedValue(new Error("backup failed"));
    const failed = expect(report.callLlm("prompt")).rejects.toThrow("backup failed");
    await vi.runAllTimersAsync();
    await failed;
    expect(() => report.assertLlmSuccess()).toThrow("publication aborted");
  });

  it("does not mask invalid requests with fallback", async () => {
    const report = await import("../report.ts");
    mockCall.mockRejectedValue(Object.assign(new Error("bad request"), { status: 400 }));
    await expect(report.callLlm("prompt")).rejects.toThrow("bad request");
    expect(fallbackCall).not.toHaveBeenCalled();
  });
});
