/**
 * Cross-day deduplication for trending repos using SQLite.
 * DB file: digests/seen-repos.db (committed to git alongside web-state.json)
 */

import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";

const DB_PATH = path.join("digests", "seen-repos.db");
const DEFAULT_DAYS = 7;

function openDb(): Database.Database {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const db = new Database(DB_PATH);
  db.exec(`
    CREATE TABLE IF NOT EXISTS seen_repos (
      full_name TEXT PRIMARY KEY,
      last_seen TEXT NOT NULL
    )
  `);
  return db;
}

/** Filter out repos seen within the last `days` days. */
export function filterSeenRepos<T extends { fullName: string }>(
  repos: T[],
  label: string,
  days: number = DEFAULT_DAYS,
): T[] {
  if (repos.length === 0) return repos;
  const db = openDb();
  try {
    const cutoff = new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 10);
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
  } finally {
    db.close();
  }
}

/** Mark repos as seen with today's date. */
export function markReposSeen(repos: { fullName: string }[], dateStr: string): void {
  if (repos.length === 0) return;
  const db = openDb();
  try {
    const upsert = db.prepare(
      "INSERT INTO seen_repos (full_name, last_seen) VALUES (?, ?) ON CONFLICT(full_name) DO UPDATE SET last_seen = excluded.last_seen",
    );
    const insertMany = db.transaction((items: { fullName: string }[]) => {
      for (const item of items) upsert.run(item.fullName, dateStr);
    });
    insertMany(repos);
    console.log(`  [dedup] Marked ${repos.length} repos as seen on ${dateStr}`);
  } finally {
    db.close();
  }
}

/** Remove entries older than `days` days to keep the DB small. */
export function cleanOldEntries(days: number = DEFAULT_DAYS): void {
  const db = openDb();
  try {
    const cutoff = new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 10);
    const result = db.prepare("DELETE FROM seen_repos WHERE last_seen < ?").run(cutoff);
    if (result.changes > 0) {
      console.log(`  [dedup] Cleaned ${result.changes} stale entries`);
    }
  } finally {
    db.close();
  }
}
