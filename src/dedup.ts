/**
 * Cross-day deduplication cache (SQLite).
 * DB file: digests/dedup.db (committed to git alongside web-state.json)
 */

import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";

const DB_PATH = path.join("digests", "dedup.db");

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
    CREATE TABLE IF NOT EXISTS seen_hf_models (
      model_id TEXT PRIMARY KEY,
      last_seen TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS seen_arxiv_papers (
      paper_id TEXT PRIMARY KEY,
      last_seen TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS seen_devto_articles (
      article_id INTEGER PRIMARY KEY,
      last_seen TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS seen_lobsters_stories (
      story_url TEXT PRIMARY KEY,
      last_seen TEXT NOT NULL
    );
  `);
  return db;
}

// ---------------------------------------------------------------------------
// Trending repos
// ---------------------------------------------------------------------------

/** Filter out repos already seen (all-time). */
export function filterSeenRepos<T extends { fullName: string }>(
  db: Database.Database,
  repos: T[],
  label: string,
): T[] {
  if (repos.length === 0) return repos;
  const seen = new Set(
    (
      db.prepare("SELECT full_name FROM seen_repos").all() as {
        full_name: string;
      }[]
    ).map((r) => r.full_name),
  );
  const filtered = repos.filter((r) => !seen.has(r.fullName));
  console.log(
    `  [dedup/${label}] ${repos.length} repos → ${filtered.length} new (${repos.length - filtered.length} skipped)`,
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

/** Filter out issues/PRs already seen (all-time). */
export function filterUnseenItems<T extends { number: number }>(
  db: Database.Database,
  repoId: string,
  items: T[],
): T[] {
  if (items.length === 0) return items;
  const seen = new Set(
    (
      db.prepare("SELECT item_number FROM seen_items WHERE repo_id = ?").all(repoId) as {
        item_number: number;
      }[]
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

/** Filter out releases already seen (all-time). */
export function filterUnseenReleases<T extends { tag_name: string }>(
  db: Database.Database,
  repoId: string,
  releases: T[],
): T[] {
  if (releases.length === 0) return releases;
  const seen = new Set(
    (
      db.prepare("SELECT tag_name FROM seen_releases WHERE repo_id = ?").all(repoId) as { tag_name: string }[]
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
// HuggingFace models
// ---------------------------------------------------------------------------

/** Filter out HF models already seen (all-time). */
export function filterUnseenHfModels<T extends { id: string }>(db: Database.Database, models: T[]): T[] {
  if (models.length === 0) return models;
  const seen = new Set(
    (
      db.prepare("SELECT model_id FROM seen_hf_models").all() as {
        model_id: string;
      }[]
    ).map((r) => r.model_id),
  );
  const filtered = models.filter((m) => !seen.has(m.id));
  console.log(
    `  [dedup/hf] ${models.length} models → ${filtered.length} new (${models.length - filtered.length} skipped)`,
  );
  return filtered;
}

/** Mark HF models as seen with today's date. */
export function markHfModelsSeen(db: Database.Database, models: { id: string }[], dateStr: string): void {
  if (models.length === 0) return;
  const upsert = db.prepare(
    "INSERT INTO seen_hf_models (model_id, last_seen) VALUES (?, ?) ON CONFLICT(model_id) DO UPDATE SET last_seen = excluded.last_seen",
  );
  const insertMany = db.transaction((rows: { id: string }[]) => {
    for (const row of rows) upsert.run(row.id, dateStr);
  });
  insertMany(models);
}

// ---------------------------------------------------------------------------
// ArXiv papers
// ---------------------------------------------------------------------------

/** Filter out ArXiv papers already seen (all-time). */
export function filterUnseenArxivPapers<T extends { id: string }>(db: Database.Database, papers: T[]): T[] {
  if (papers.length === 0) return papers;
  const seen = new Set(
    (
      db.prepare("SELECT paper_id FROM seen_arxiv_papers").all() as {
        paper_id: string;
      }[]
    ).map((r) => r.paper_id),
  );
  const filtered = papers.filter((p) => !seen.has(p.id));
  console.log(
    `  [dedup/arxiv] ${papers.length} papers → ${filtered.length} new (${papers.length - filtered.length} skipped)`,
  );
  return filtered;
}

/** Mark ArXiv papers as seen with today's date. */
export function markArxivPapersSeen(db: Database.Database, papers: { id: string }[], dateStr: string): void {
  if (papers.length === 0) return;
  const upsert = db.prepare(
    "INSERT INTO seen_arxiv_papers (paper_id, last_seen) VALUES (?, ?) ON CONFLICT(paper_id) DO UPDATE SET last_seen = excluded.last_seen",
  );
  const insertMany = db.transaction((rows: { id: string }[]) => {
    for (const row of rows) upsert.run(row.id, dateStr);
  });
  insertMany(papers);
}

// ---------------------------------------------------------------------------
// Dev.to articles
// ---------------------------------------------------------------------------

/** Filter out Dev.to articles already seen (all-time). */
export function filterUnseenDevtoArticles<T extends { id: number }>(
  db: Database.Database,
  articles: T[],
): T[] {
  if (articles.length === 0) return articles;
  const seen = new Set(
    (
      db.prepare("SELECT article_id FROM seen_devto_articles").all() as {
        article_id: number;
      }[]
    ).map((r) => r.article_id),
  );
  const filtered = articles.filter((a) => !seen.has(a.id));
  console.log(
    `  [dedup/devto] ${articles.length} articles → ${filtered.length} new (${articles.length - filtered.length} skipped)`,
  );
  return filtered;
}

/** Mark Dev.to articles as seen with today's date. */
export function markDevtoArticlesSeen(
  db: Database.Database,
  articles: { id: number }[],
  dateStr: string,
): void {
  if (articles.length === 0) return;
  const upsert = db.prepare(
    "INSERT INTO seen_devto_articles (article_id, last_seen) VALUES (?, ?) ON CONFLICT(article_id) DO UPDATE SET last_seen = excluded.last_seen",
  );
  const insertMany = db.transaction((rows: { id: number }[]) => {
    for (const row of rows) upsert.run(row.id, dateStr);
  });
  insertMany(articles);
}

// ---------------------------------------------------------------------------
// Lobsters stories
// ---------------------------------------------------------------------------

/** Filter out Lobsters stories already seen (all-time). */
export function filterUnseenLobstersStories<T extends { url: string }>(
  db: Database.Database,
  stories: T[],
): T[] {
  if (stories.length === 0) return stories;
  const seen = new Set(
    (
      db.prepare("SELECT story_url FROM seen_lobsters_stories").all() as {
        story_url: string;
      }[]
    ).map((r) => r.story_url),
  );
  const filtered = stories.filter((s) => !seen.has(s.url));
  console.log(
    `  [dedup/lobsters] ${stories.length} stories → ${filtered.length} new (${stories.length - filtered.length} skipped)`,
  );
  return filtered;
}

/** Mark Lobsters stories as seen with today's date. */
export function markLobstersStoriesSeen(
  db: Database.Database,
  stories: { url: string }[],
  dateStr: string,
): void {
  if (stories.length === 0) return;
  const upsert = db.prepare(
    "INSERT INTO seen_lobsters_stories (story_url, last_seen) VALUES (?, ?) ON CONFLICT(story_url) DO UPDATE SET last_seen = excluded.last_seen",
  );
  const insertMany = db.transaction((rows: { url: string }[]) => {
    for (const row of rows) upsert.run(row.url, dateStr);
  });
  insertMany(stories);
}
