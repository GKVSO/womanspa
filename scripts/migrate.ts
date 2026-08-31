// Скрипт миграции: инициализирует PostgreSQL и создаёт дефолтного админа.
// Запуск: npx tsx scripts/migrate.ts
import postgres from "postgres";
import bcrypt from "bcryptjs";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local manually
const envPath = resolve(process.cwd(), ".env.local");
try {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      process.env[key] = val;
    }
  }
} catch { /* ignore */ }

const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/womanmedspa";

async function migrate() {
  console.log("Connecting to PostgreSQL...");
  const sql = postgres(DATABASE_URL, { max: 5 });

  console.log("Creating tables...");

  await sql`
    CREATE TABLE IF NOT EXISTS pages (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL DEFAULT '',
      seo_title TEXT NOT NULL DEFAULT '',
      seo_description TEXT NOT NULL DEFAULT '',
      published INTEGER NOT NULL DEFAULT 1,
      is_home INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS page_blocks (
      id SERIAL PRIMARY KEY,
      page_id INTEGER NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
      type TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      content JSONB NOT NULL DEFAULT '{}'
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL DEFAULT ''
    )
  `;

  console.log("Tables created ✓");

  // Seed default admin credentials
  const existing = await sql`SELECT value FROM settings WHERE key = 'admin_password'`;
  if (existing.length === 0) {
    const hash = await bcrypt.hash("admin12345", 10);
    await sql`INSERT INTO settings (key, value) VALUES ('admin_password', ${hash})`;
    await sql`INSERT INTO settings (key, value) VALUES ('admin_username', 'admin')`;
    console.log("Default admin created: admin / admin12345 ✓");
  } else {
    console.log("Admin credentials already exist, skipping.");
  }

  await sql.end();
  console.log("Migration complete ✓");
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});