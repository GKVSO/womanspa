import postgres from "postgres";

// PostgreSQL connection
// For local dev: postgresql://user:password@localhost:5432/womanmedspa
// For VPS: set DATABASE_URL in .env.local
const sql = postgres(process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/womanmedspa", {
  max: 10,
});

// ===== Schema =====
export async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS pages (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL DEFAULT '',
      seo_title TEXT NOT NULL DEFAULT '',
      seo_description TEXT NOT NULL DEFAULT '',
      published INTEGER NOT NULL DEFAULT 1,
      is_home INTEGER NOT NULL DEFAULT 0,
      vagaro_booking_url TEXT DEFAULT '',
      vagaro_booking_embed TEXT DEFAULT '',
      vagaro_booking_mode TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;

  // Migration for existing tables
  try {
    await sql`ALTER TABLE pages ADD COLUMN IF NOT EXISTS vagaro_booking_url TEXT DEFAULT ''`;
    await sql`ALTER TABLE pages ADD COLUMN IF NOT EXISTS vagaro_booking_embed TEXT DEFAULT ''`;
    await sql`ALTER TABLE pages ADD COLUMN IF NOT EXISTS vagaro_booking_mode TEXT DEFAULT ''`;
  } catch (e) {
    // Ignore if column already exists or error
  }

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
}

// ===== Pages =====
export function getAllPages() {
  return sql`SELECT * FROM pages ORDER BY is_home DESC, updated_at DESC`;
}

export function getPageById(id: number) {
  return sql`SELECT * FROM pages WHERE id = ${id}`.then((r) => r[0] ?? null);
}

export function getPageBySlug(slug: string) {
  return sql`SELECT * FROM pages WHERE slug = ${slug}`.then((r) => r[0] ?? null);
}

export function createPage(slug: string, title: string) {
  return sql`INSERT INTO pages (slug, title) VALUES (${slug}, ${title}) RETURNING id`.then((r) => r[0].id);
}

export async function updatePage(id: number, data: { 
  title?: string; 
  slug?: string; 
  seo_title?: string; 
  seo_description?: string; 
  published?: number; 
  is_home?: number;
  vagaro_booking_url?: string;
  vagaro_booking_embed?: string;
  vagaro_booking_mode?: string;
}) {
  const sets: string[] = [];
  const values: (string | number)[] = [];
  let i = 1;

  for (const [key, val] of Object.entries(data)) {
    if (val !== undefined) {
      sets.push(`${key} = $${i}`);
      values.push(val as string | number);
      i++;
    }
  }

  if (sets.length === 0) return;
  sets.push(`updated_at = NOW()`);

  // Use sql.unsafe for dynamic queries (safe - values are parameterized)
  return sql.unsafe(`UPDATE pages SET ${sets.join(", ")} WHERE id = $${i}`, [...values, id]);
}

export function deletePage(id: number) {
  return sql`DELETE FROM pages WHERE id = ${id}`;
}

// ===== Blocks =====
export function getBlocks(pageId: number) {
  return sql`SELECT * FROM page_blocks WHERE page_id = ${pageId} ORDER BY sort_order ASC`;
}

export function upsertBlocks(pageId: number, blocks: { type: string; content: Record<string, unknown> }[]) {
  // Delete existing blocks and re-insert
  return sql`DELETE FROM page_blocks WHERE page_id = ${pageId}`.then(() => {
    if (blocks.length === 0) return;
    const values: (string | number)[] = [];
    const placeholders: string[] = [];
    blocks.forEach((b, i) => {
      const offset = i * 4;
      placeholders.push(`($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}::jsonb)`);
      values.push(pageId, b.type, i, JSON.stringify(b.content) || "{}");
    });
    return sql.unsafe(
      `INSERT INTO page_blocks (page_id, type, sort_order, content) VALUES ${placeholders.join(", ")}`,
      values
    );
  });
}

// ===== Settings =====
export function getSetting(key: string) {
  return sql`SELECT value FROM settings WHERE key = ${key}`.then((r) => r[0]?.value ?? null);
}

export function setSetting(key: string, value: string) {
  return sql`INSERT INTO settings (key, value) VALUES (${key}, ${value}) ON CONFLICT (key) DO UPDATE SET value = ${value}`;
}

export default sql;