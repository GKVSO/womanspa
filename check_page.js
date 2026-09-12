const postgres = require('postgres');
const sql = postgres('postgresql://neondb_owner:npg_aescCOAz26qb@ep-misty-union-b2nepbs9.c-6.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require', { max: 1 });
async function run() {
  const page = await sql`SELECT id, slug FROM pages WHERE slug = 'exion'`;
  console.log(page);
  process.exit(0);
}
run();
