const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

// Ensure database directory exists (important for Render)
const dbPath = path.join(__dirname, "database.db");
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log("Created database directory");
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err);
    process.exit(1); // Exit if database connection fails
  }
  console.log("Connected to SQLite database at:", dbPath);
});

// Enable foreign keys
db.run("PRAGMA foreign_keys = ON");

// Initialize database tables
db.serialize(() => {
  console.log("Initializing database tables...");

  db.run(
    `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `,
    (err) => {
      if (err) console.error("Error creating users table:", err);
      else console.log("Users table ready");
    }
  );

  db.run(
    `
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      author_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES users (id)
    )
  `,
    (err) => {
      if (err) console.error("Error creating blog_posts table:", err);
      else console.log("Blog posts table ready");
    }
  );

  db.run(
    `
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER,
      user_id INTEGER,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES blog_posts (id),
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `,
    (err) => {
      if (err) console.error("Error creating comments table:", err);
      else console.log("Comments table ready");
    }
  );

  db.run(
    `
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `,
    (err) => {
      if (err) console.error("Error creating contact_submissions table:", err);
      else console.log("Contact submissions table ready");
    }
  );

  console.log("Database initialization complete");
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Closing database connection...");
  db.close((err) => {
    if (err) {
      console.error("Error closing database:", err);
    } else {
      console.log("Database connection closed.");
    }
    process.exit(0);
  });
});

module.exports = db;
