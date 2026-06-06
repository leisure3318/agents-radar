/**
 * Cross-day deduplication for GitHub items.
 *
 * Persists seen item numbers and release tags to digests/seen-items.json so
 * the same issue / PR / release is never reported twice across consecutive
 * daily runs (edge case: items created right at the 24 h boundary).
 */

import fs from "node:fs";
import path from "node:path";

const STATE_FILE = path.join("digests", "seen-items.json");
/** Keep at most this many item numbers per repo to bound file growth. */
const MAX_ITEMS = 1000;
/** Keep at most this many release tags per repo. */
const MAX_RELEASES = 200;

interface SeenState {
  items: Record<string, number[]>;
  releases: Record<string, string[]>;
}

export function loadSeenItems(): SeenState {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, "utf-8")) as SeenState;
  } catch {
    return { items: {}, releases: {} };
  }
}

export function saveSeenItems(state: SeenState): void {
  fs.mkdirSync("digests", { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + "\n", "utf-8");
}

export function filterUnseen<T extends { number: number }>(
  repoId: string,
  items: T[],
  state: SeenState,
): T[] {
  const seen = new Set(state.items[repoId] ?? []);
  return items.filter((i) => !seen.has(i.number));
}

export function filterUnseenReleases<T extends { tag_name: string }>(
  repoId: string,
  releases: T[],
  state: SeenState,
): T[] {
  const seen = new Set(state.releases[repoId] ?? []);
  return releases.filter((r) => !seen.has(r.tag_name));
}

export function markSeen(
  repoId: string,
  items: { number: number }[],
  releases: { tag_name: string }[],
  state: SeenState,
): void {
  const existingItems = state.items[repoId] ?? [];
  const newNums = items.map((i) => i.number).filter((n) => !existingItems.includes(n));
  state.items[repoId] = [...existingItems, ...newNums].slice(-MAX_ITEMS);

  const existingTags = state.releases[repoId] ?? [];
  const newTags = releases.map((r) => r.tag_name).filter((t) => !existingTags.includes(t));
  state.releases[repoId] = [...existingTags, ...newTags].slice(-MAX_RELEASES);
}
