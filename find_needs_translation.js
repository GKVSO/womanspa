const postgres = require('postgres');
const fs = require('fs');

const sql = postgres('postgresql://neondb_owner:npg_aescCOAz26qb@ep-misty-union-b2nepbs9.c-6.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require', { max: 1 });

const ru = JSON.parse(fs.readFileSync('c:/1Frontend/1Work/2New/womanmedspa-backup/womanmedspa/src/i18n/ru.json', 'utf8'));

function normalize(str) {
  if (typeof str !== 'string') return '';
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

const ruNormalized = {};
for (const k in ru) {
  const norm = normalize(k);
  if (norm) ruNormalized[norm] = ru[k];
}

const ML_KEYS = new Set([
  "title", "subtitle", "body", "primaryBtn", "secondaryBtn",
  "starsText", "buttonText", "phone", "email", "address", "workHours",
]);

const ML_ITEM_KEYS = new Set([
  "title", "text", "subtitle", "num", "before", "after", "beforeLabel", "afterLabel", "category", "question", "answer", "name", "q", "a",
]);

async function run() {
  const blocks = await sql`SELECT id, content FROM page_blocks`;
  
  const needsTranslation = {};

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
        // it's a string, we need to check if it's perfectly in ru.json
        const norm = normalize(val);
        if (!ru[val] && !ruNormalized[norm]) {
          needsTranslation[val] = true;
        }
      } else if (typeof val === 'object' && val !== null && val.en) {
        // it's an object, we STILL check if the English text is perfectly in ru.json
        const norm = normalize(val.en);
        if (!ru[val.en] && !ruNormalized[norm]) {
          needsTranslation[val.en] = true;
        }
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

  const arr = Object.keys(needsTranslation);
  fs.writeFileSync('needs_translation.json', JSON.stringify(arr, null, 2));
  console.log(`Found ${arr.length} strings needing translation.`);
  process.exit(0);
}

run();
