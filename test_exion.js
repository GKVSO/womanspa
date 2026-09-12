const postgres = require('postgres');
const sql = postgres('postgresql://neondb_owner:npg_aescCOAz26qb@ep-misty-union-b2nepbs9.c-6.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require', { max: 1 });

async function run() {
  const page = await sql`SELECT id FROM pages WHERE slug = 'exion'`;
  const blocks = await sql`SELECT id, content FROM page_blocks WHERE page_id = ${page[0].id} AND type = 'hero'`;
  const block = blocks[0];
  
  // Parse content
  let content = typeof block.content === 'string' ? JSON.parse(block.content) : block.content;
  
  // Set random RU text
  content.title.ru = "ТЕСТ РУССКОГО " + Date.now();
  
  // Save back
  await sql`UPDATE page_blocks SET content = ${content} WHERE id = ${block.id}`;
  console.log("Updated title to:", content.title.ru);
  process.exit(0);
}
run();
