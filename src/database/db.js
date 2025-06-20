const Database = require("better-sqlite3");
const path = require("path");

// Create or open the database file
const db = new Database(path.resolve(__dirname, "twitter.db"));

// --- Weverse-related code commented out for now ---
/*
// Create a table for posts if it doesn't exist
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    author_name TEXT,
    author_profile TEXT,
    artist_name TEXT,
    message TEXT,
    media_url TEXT,
    media_type TEXT,
    published_at INTEGER,
    share_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
  `
).run();

// Function to check if a post exist
function postExists(postId) {
  const row = db.prepare("SELECT 1 FROM posts WHERE id = ?").get(postId);
  return !!row;
}

// Function to save a new post
function savePost({
  id,
  author_name,
  author_profile,
  artist_name,
  message,
  media_url,
  media_type,
  published_at,
  share_url,
}) {
  db.prepare(
    `
    INSERT INTO posts (
    id, author_name, author_profile, artist_name, message, media_url, media_type, published_at, share_url
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
  ).run(
    id,
    author_name,
    author_profile,
    artist_name,
    message,
    media_url,
    media_type,
    published_at,
    share_url
  );
}
*/

// --- Twitter integration: settings table for last tweet ID ---
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  )
`
).run();

function getLastTweetId() {
  const row = db
    .prepare("SELECT value FROM settings WHERE key = ?")
    .get("lastTweetId");
  return row ? row.value : null;
}

function setLastTweetId(id) {
  db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)").run(
    "lastTweetId",
    id
  );
}

module.exports = {
  getLastTweetId,
  setLastTweetId,
  // postExists,
  // savePost,
};
