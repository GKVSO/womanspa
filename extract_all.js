const postgres = require('postgres');
const fs = require('fs');

const sql = postgres('postgresql://neondb_owner:npg_aescCOAz26qb@ep-misty-union-b2nepbs9.c-6.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require', { max: 1 });

const ML_KEYS = new Set([
  "title", "subtitle", "body", "primaryBtn", "secondaryBtn",
  "starsText", "buttonText", "phone", "email", "address", "workHours",
]);

const ML_ITEM_KEYS = new Set([
  "title", "text", "subtitle", "num", "before", "after", "beforeLabel", "afterLabel", "category", "question", "answer", "name", "q", "a",
]);

async function run() {
  const blocks = await sql`SELECT id, content FROM page_blocks`;
  
  const allEng = new Set();

  for (const block of blocks) {
    let content;
    try {
      content = typeof block.content === 'string' ? JSON.parse(block.content) : block.content;
    } catch (e) {
      continue;
    }
    
    if (!content) continue;

    function check(val) {
      if (typeof val === 'string' && val.trim() !== '') {
        allEng.add(val);
      } else if (typeof val === 'object' && val !== null && val.en) {
        allEng.add(val.en);
      }
    }

    for (const key of Object.keys(content)) {
      if (ML_KEYS.has(key)) {
        check(content[key]);
      } else if (Array.isArray(content[key])) {
        for (let i = 0; i < content[key].length; i++) {
          const item = content[key][i];
          if (typeof item === 'object' && item !== null) {
            for (const itemKey of Object.keys(item)) {
              if (ML_ITEM_KEYS.has(itemKey)) {
                check(item[itemKey]);
              }
            }
          }
        }
      }
    }
  }

  const allEngArray = Array.from(allEng);
  fs.writeFileSync('all_english_strings.json', JSON.stringify(allEngArray, null, 2));
  console.log(`Found ${allEngArray.length} unique English strings.`);
  process.exit(0);
}

run();
