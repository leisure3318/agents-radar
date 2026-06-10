/**
 * Cross-day deduplication cache (SQLite).
 * DB file: digests/dedup.db (committed to git alongside web-state.json)
 */

import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";

const DB_PATH = path.join("digests", "dedup.db");

const DEFAULT_REPO_DAYS = 7;
const DEFAULT_ITEM_DAYS = 30;

export function openDedupDb(): Database.Database {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const db = new Database(DB_PATH);
  db.exec(`
    CREATE TABLE IF NOT EXISTS seen_repos (
      full_name TEXT PRIMARY KEY,
      last_seen TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS seen_items (
      repo_id TEXT NOT NULL,
      item_number INTEGER NOT NULL,
      last_seen TEXT NOT NULL,
      PRIMARY KEY (repo_id, item_number)
    );
    CREATE TABLE IF NOT EXISTS seen_releases (
      repo_id TEXT NOT NULL,
      tag_name TEXT NOT NULL,
      last_seen TEXT NOT NULL,
      PRIMARY KEY (repo_id, tag_name)
    );
  `);
  return db;
}

function cutoffDate(days: number): string {
  return new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 10);
}

// ---------------------------------------------------------------------------
// Trending repos
// ---------------------------------------------------------------------------

/** Filter out repos seen within the last `days` days. */
export function filterSeenRepos<T extends { fullName: string }>(
  db: Database.Database,
  repos: T[],
  label: string,
  days: number = DEFAULT_REPO_DAYS,
): T[] {
  if (repos.length === 0) return repos;
  const cutoff = cutoffDate(days);
  const seen = new Set(
    (
      db.prepare("SELECT full_name FROM seen_repos WHERE last_seen >= ?").all(cutoff) as {
        full_name: string;
      }[]
    ).map((r) => r.full_name),
  );
  const filtered = repos.filter((r) => !seen.has(r.fullName));
  console.log(
    `  [dedup/${label}] ${repos.length} repos → ${filtered.length} new (${repos.length - filtered.length} skipped, ${days}d window)`,
  );
  return filtered;
}

/** Mark repos as seen with today's date. */
export function markReposSeen(db: Database.Database, repos: { fullName: string }[], dateStr: string): void {
  if (repos.length === 0) return;
  const upsert = db.prepare(
    "INSERT INTO seen_repos (full_name, last_seen) VALUES (?, ?) ON CONFLICT(full_name) DO UPDATE SET last_seen = excluded.last_seen",
  );
  const insertMany = db.transaction((items: { fullName: string }[]) => {
    for (const item of items) upsert.run(item.fullName, dateStr);
  });
  insertMany(repos);
  console.log(`  [dedup] Marked ${repos.length} repos as seen on ${dateStr}`);
}

// ---------------------------------------------------------------------------
// GitHub issues / PRs
// ---------------------------------------------------------------------------

/** Filter out issues/PRs reported within the last `days` days. */
export function filterUnseenItems<T extends { number: number }>(
  db: Database.Database,
  repoId: string,
  items: T[],
  days: number = DEFAULT_ITEM_DAYS,
): T[] {
  if (items.length === 0) return items;
  const cutoff = cutoffDate(days);
  const seen = new Set(
    (
      db
        .prepare("SELECT item_number FROM seen_items WHERE repo_id = ? AND last_seen >= ?")
        .all(repoId, cutoff) as { item_number: number }[]
    ).map((r) => r.item_number),
  );
  return items.filter((i) => !seen.has(i.number));
}

/** Mark issues/PRs as reported with today's date. */
export function markItemsSeen(
  db: Database.Database,
  repoId: string,
  items: { number: number }[],
  dateStr: string,
): void {
  if (items.length === 0) return;
  const upsert = db.prepare(
    "INSERT INTO seen_items (repo_id, item_number, last_seen) VALUES (?, ?, ?) ON CONFLICT(repo_id, item_number) DO UPDATE SET last_seen = excluded.last_seen",
  );
  const insertMany = db.transaction((rows: { number: number }[]) => {
    for (const row of rows) upsert.run(repoId, row.number, dateStr);
  });
  insertMany(items);
}

// ---------------------------------------------------------------------------
// GitHub releases
// ---------------------------------------------------------------------------

/** Filter out releases reported within the last `days` days. */
export function filterUnseenReleases<T extends { tag_name: string }>(
  db: Database.Database,
  repoId: string,
  releases: T[],
  days: number = DEFAULT_ITEM_DAYS,
): T[] {
  if (releases.length === 0) return releases;
  const cutoff = cutoffDate(days);
  const seen = new Set(
    (
      db
        .prepare("SELECT tag_name FROM seen_releases WHERE repo_id = ? AND last_seen >= ?")
        .all(repoId, cutoff) as { tag_name: string }[]
    ).map((r) => r.tag_name),
  );
  return releases.filter((r) => !seen.has(r.tag_name));
}

/** Mark releases as reported with today's date. */
export function markReleasesSeen(
  db: Database.Database,
  repoId: string,
  releases: { tag_name: string }[],
  dateStr: string,
): void {
  if (releases.length === 0) return;
  const upsert = db.prepare(
    "INSERT INTO seen_releases (repo_id, tag_name, last_seen) VALUES (?, ?, ?) ON CONFLICT(repo_id, tag_name) DO UPDATE SET last_seen = excluded.last_seen",
  );
  const insertMany = db.transaction((rows: { tag_name: string }[]) => {
    for (const row of rows) upsert.run(repoId, row.tag_name, dateStr);
  });
  insertMany(releases);
}

// ---------------------------------------------------------------------------
// Maintenance
// ---------------------------------------------------------------------------

/** Remove stale entries to keep the DB small. */
export function cleanOldEntries(
  db: Database.Database,
  repoDays: number = DEFAULT_REPO_DAYS,
  itemDays: number = DEFAULT_ITEM_DAYS,
): void {
  const repos = db.prepare("DELETE FROM seen_repos WHERE last_seen < ?").run(cutoffDate(repoDays));
  const items = db.prepare("DELETE FROM seen_items WHERE last_seen < ?").run(cutoffDate(itemDays));
  const releases = db.prepare("DELETE FROM seen_releases WHERE last_seen < ?").run(cutoffDate(itemDays));
  const total = repos.changes + items.changes + releases.changes;
  if (total > 0) {
    console.log(
      `  [dedup] Cleaned ${repos.changes} repos, ${items.changes} items, ${releases.changes} releases`,
    );
  }
}
