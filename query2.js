const postgres = require('postgres');
const sql = postgres('postgresql://neondb_owner:npg_aescCOAz26qb@ep-misty-union-b2nepbs9.c-6.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require', { max: 1 });

async function run() {
  const r = await sql`SELECT value FROM settings WHERE key = 'global_consultation'`;
  console.log(r[0]?.value);
  process.exit(0);
}
run();
