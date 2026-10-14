import type { IncomingMessage, ServerResponse } from "node:http";

/**
 * Deploy this directory as a separate Vercel project with OIDC Federation
 * enabled. It intentionally exposes only the two leaderboard views consumed
 * by agents-radar, never the OIDC token itself.
 */

const ALLOWED_VIEWS = new Set(["trending", "hot"]);

function sendJson(response: ServerResponse, status: number, body: unknown): void {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Cache-Control", "no-store");
  response.end(JSON.stringify(body));
}

export default async function handler(request: IncomingMessage, response: ServerResponse): Promise<void> {
  const incoming = new URL(request.url ?? "/", "https://skills-proxy.invalid");
  const view = incoming.searchParams.get("view") ?? "trending";
  if (!ALLOWED_VIEWS.has(view)) return sendJson(response, 400, { error: "Unsupported view" });

  // Vercel puts a function invocation token on the request header. The
  // environment variable is available during builds, not function execution.
  const oidcHeader = request.headers["x-vercel-oidc-token"];
  const token = (Array.isArray(oidcHeader) ? oidcHeader[0] : oidcHeader) ?? process.env.VERCEL_OIDC_TOKEN;
  if (!token) return sendJson(response, 503, { error: "Vercel OIDC is not configured" });

  const upstream = new URL("https://skills.sh/api/v1/skills");
  upstream.searchParams.set("view", view);
  upstream.searchParams.set("per_page", "30");

  try {
    const upstreamResponse = await fetch(upstream, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    const body = await upstreamResponse.text();
    response.statusCode = upstreamResponse.status;
    response.setHeader("Content-Type", upstreamResponse.headers.get("Content-Type") ?? "application/json");
    // A daily client does not need stale leaderboard data.
    response.setHeader("Cache-Control", "no-store");
    response.end(body);
  } catch (error) {
    console.error("skills.sh request failed", error);
    sendJson(response, 502, { error: "Unable to reach skills.sh" });
  }
}
