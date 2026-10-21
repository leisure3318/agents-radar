/**
 * skills.sh discovery client.
 *
 * skills.sh's public API requires Vercel OIDC. The daily GitHub Action calls
 * a small, private proxy instead, so its credentials never enter this repo.
 */

export type SkillsView = "trending" | "hot";

export interface TrendingSkill {
  id: string;
  name: string;
  source: string;
  slug: string;
  description: string;
  installs: number | null;
  url: string;
  installCommand: string | null;
  views: SkillsView[];
  /** The source SKILL.md, loaded only for the few newly discovered skills. */
  skillMd: string;
}

export interface SkillsData {
  skills: TrendingSkill[];
  fetchSuccess: boolean;
}

interface ProxySkill {
  id?: unknown;
  name?: unknown;
  source?: unknown;
  slug?: unknown;
  description?: unknown;
  installs?: unknown;
  installs_count?: unknown;
  url?: unknown;
  html_url?: unknown;
  install_command?: unknown;
  installCommand?: unknown;
  isDuplicate?: unknown;
  is_duplicate?: unknown;
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function numberOrNull(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function extractRows(payload: unknown): ProxySkill[] {
  if (Array.isArray(payload)) return payload as ProxySkill[];
  if (!payload || typeof payload !== "object") return [];
  const record = payload as Record<string, unknown>;
  for (const key of ["skills", "data", "items"]) {
    if (Array.isArray(record[key])) return record[key] as ProxySkill[];
  }
  return [];
}

export function parseSkillsResponse(payload: unknown, view: SkillsView): TrendingSkill[] {
  const deduped = new Map<string, TrendingSkill>();
  for (const row of extractRows(payload)) {
    if (row.isDuplicate === true || row.is_duplicate === true) continue;
    const source = text(row.source);
    const slug = text(row.slug);
    const id = text(row.id) || (source && slug ? `${source}/${slug}` : "");
    if (!id) continue;

    const existing = deduped.get(id);
    const skill: TrendingSkill = {
      id,
      name: text(row.name) || slug || id,
      source,
      slug,
      description: text(row.description),
      installs: numberOrNull(row.installs) ?? numberOrNull(row.installs_count),
      url: text(row.url) || text(row.html_url) || `https://www.skills.sh/${id}`,
      installCommand: text(row.install_command) || text(row.installCommand) || null,
      views: existing ? [...existing.views, view] : [view],
      skillMd: "",
    };
    deduped.set(id, existing ? { ...skill, views: skill.views } : skill);
  }
  return [...deduped.values()];
}

const GITHUB_API = "https://api.github.com";
const SKILL_MD_MAX_CHARS = 12_000;

interface GitTreeEntry {
  path?: string;
  type?: string;
}

function isGitHubRepo(source: string): boolean {
  return /^[^/\s]+\/[^/\s]+$/.test(source);
}

/**
 * Find a Skill's instruction file in its source repository.  skills.sh only
 * exposes leaderboard metadata, so this adds the primary source needed for a
 * useful Chinese explanation.  We inspect one tree per distinct repository
 * and retrieve only the exact `<slug>/SKILL.md` match.
 */
async function loadSkillMd(source: string, slug: string): Promise<string> {
  if (!isGitHubRepo(source) || !slug) return "";
  try {
    const treeResponse = await fetch(`${GITHUB_API}/repos/${source}/git/trees/HEAD?recursive=1`, {
      headers: { Accept: "application/vnd.github+json" },
      signal: AbortSignal.timeout(15_000),
    });
    if (!treeResponse.ok) throw new Error(`tree HTTP ${treeResponse.status}`);
    const tree = (await treeResponse.json()) as { tree?: GitTreeEntry[] };
    const expected = `/${slug.toLowerCase()}/skill.md`;
    const entry = tree.tree?.find(
      (item) => item.type === "blob" && item.path?.toLowerCase().endsWith(expected),
    );
    if (!entry?.path) return "";

    const rawUrl = `https://raw.githubusercontent.com/${source}/HEAD/${entry.path}`;
    const contentResponse = await fetch(rawUrl, { signal: AbortSignal.timeout(15_000) });
    if (!contentResponse.ok) throw new Error(`content HTTP ${contentResponse.status}`);
    return (await contentResponse.text()).slice(0, SKILL_MD_MAX_CHARS);
  } catch (error) {
    console.warn(`  [skills.sh] unable to read ${source}/${slug} SKILL.md: ${error}`);
    return "";
  }
}

/** Add source instructions to the small, new-only report set before LLM analysis. */
export async function enrichSkillsWithSource(skills: TrendingSkill[]): Promise<TrendingSkill[]> {
  return Promise.all(
    skills.map(async (skill) => ({ ...skill, skillMd: await loadSkillMd(skill.source, skill.slug) })),
  );
}

async function fetchView(proxyUrl: string, view: SkillsView): Promise<TrendingSkill[]> {
  const url = new URL(proxyUrl);
  url.searchParams.set("view", view);
  url.searchParams.set("per_page", "30");
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return parseSkillsResponse(await response.json(), view);
}

/** Fetch and merge the current Trending and Hot leaderboards. */
export async function fetchSkillsTrendingData(
  proxyUrl = process.env["SKILLS_PROXY_URL"] ?? "",
): Promise<SkillsData> {
  if (!proxyUrl) {
    console.log("  [skills.sh] SKILLS_PROXY_URL is not configured — skipping.");
    return { skills: [], fetchSuccess: false };
  }
  try {
    const results = await Promise.all([fetchView(proxyUrl, "trending"), fetchView(proxyUrl, "hot")]);
    const merged = new Map<string, TrendingSkill>();
    for (const skill of results.flat()) {
      const previous = merged.get(skill.id);
      merged.set(
        skill.id,
        previous ? { ...skill, views: [...new Set([...previous.views, ...skill.views])] } : skill,
      );
    }
    const skills = [...merged.values()].slice(0, 60);
    console.log(`  [skills.sh] ${skills.length} unique skills from Trending + Hot`);
    return { skills, fetchSuccess: true };
  } catch (error) {
    console.error(`  [skills.sh] fetch failed: ${error}`);
    return { skills: [], fetchSuccess: false };
  }
}
