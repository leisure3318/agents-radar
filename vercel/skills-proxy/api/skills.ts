/**
 * Deploy this directory as a separate Vercel project with OIDC Federation
 * enabled. It intentionally exposes only the two leaderboard views consumed
 * by agents-radar, never the OIDC token itself.
 */

const ALLOWED_VIEWS = new Set(["trending", "hot"]);

export const config = { runtime: "edge" };

export default async function handler(request: Request): Promise<Response> {
  const incoming = new URL(request.url);
  const view = incoming.searchParams.get("view") ?? "trending";
  if (!ALLOWED_VIEWS.has(view)) return Response.json({ error: "Unsupported view" }, { status: 400 });

  const token = process.env.VERCEL_OIDC_TOKEN;
  if (!token) return Response.json({ error: "Vercel OIDC is not configured" }, { status: 503 });

  const upstream = new URL("https://skills.sh/api/v1/skills");
  upstream.searchParams.set("view", view);
  upstream.searchParams.set("per_page", "30");

  const response = await fetch(upstream, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });
  const body = await response.text();
  return new Response(body, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") ?? "application/json",
      // A daily client does not need stale leaderboard data.
      "Cache-Control": "no-store",
    },
  });
}
