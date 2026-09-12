const postgres = require('postgres');
const sql = postgres('postgresql://neondb_owner:npg_aescCOAz26qb@ep-misty-union-b2nepbs9.c-6.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require', { max: 1 });
async function run() {
  const blocks = await sql`SELECT content FROM page_blocks LIMIT 10`;
  console.log(JSON.stringify(blocks, null, 2));
  process.exit(0);
}
run();
