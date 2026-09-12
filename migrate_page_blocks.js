const postgres = require('postgres');
const fs = require('fs');

const sql = postgres('postgresql://neondb_owner:npg_aescCOAz26qb@ep-misty-union-b2nepbs9.c-6.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require', { max: 1 });

const ru = JSON.parse(fs.readFileSync('c:/1Frontend/1Work/2New/womanmedspa-backup/womanmedspa/src/i18n/ru.json', 'utf8'));
const es = JSON.parse(fs.readFileSync('c:/1Frontend/1Work/2New/womanmedspa-backup/womanmedspa/src/i18n/es.json', 'utf8'));

const ML_KEYS = new Set([
  "title", "subtitle", "body", "primaryBtn", "secondaryBtn",
  "starsText", "buttonText", "phone", "email", "address", "workHours",
]);

const ML_ITEM_KEYS = new Set([
  "title", "text", "subtitle", "num", "before", "after", "beforeLabel", "afterLabel", "category", "question", "answer", "name", "q", "a",
]);

function getTranslation(enText) {
  if (typeof enText !== "string" || !enText) return enText;
  const ruText = ru[enText] || "";
  const esText = es[enText] || "";
  return { en: enText, ru: ruText, es: esText };
}

async function run() {
  const blocks = await sql`SELECT id, content FROM page_blocks`;
  console.log(`Found ${blocks.length} blocks to process.`);
  
  let updatedCount = 0;

  for (const block of blocks) {
    let content;
    try {
      content = typeof block.content === 'string' ? JSON.parse(block.content) : block.content;
    } catch (e) {
      continue;
    }
    
    if (!content) continue;
    let changed = false;

    // Migrate root ML_KEYS
    for (const key of Object.keys(content)) {
      if (ML_KEYS.has(key)) {
        const val = content[key];
        if (typeof val === 'string' && val.trim() !== '') {
          content[key] = getTranslation(val);
          changed = true;
        } else if (typeof val === 'object' && val !== null && val.en && typeof val.ru === 'string' && val.ru === '') {
          // If it is already an MLObject but ru is empty, try to fill it
          const ruText = ru[val.en] || "";
          const esText = es[val.en] || "";
          if (ruText || esText) {
             content[key].ru = ruText || val.ru;
             content[key].es = esText || val.es;
             changed = true;
          }
        }
      } else if (Array.isArray(content[key])) {
        // Look for items inside lists
        for (let i = 0; i < content[key].length; i++) {
          const item = content[key][i];
          if (typeof item === 'object' && item !== null) {
            for (const itemKey of Object.keys(item)) {
              if (ML_ITEM_KEYS.has(itemKey)) {
                const itemVal = item[itemKey];
                if (typeof itemVal === 'string' && itemVal.trim() !== '') {
                  item[itemKey] = getTranslation(itemVal);
                  changed = true;
                } else if (typeof itemVal === 'object' && itemVal !== null && itemVal.en && typeof itemVal.ru === 'string' && itemVal.ru === '') {
                  const ruText = ru[itemVal.en] || "";
                  const esText = es[itemVal.en] || "";
                  if (ruText || esText) {
                     item[itemKey].ru = ruText || itemVal.ru;
                     item[itemKey].es = esText || itemVal.es;
                     changed = true;
                  }
                }
              }
            }
          }
        }
      }
    }

    if (changed) {
      await sql`UPDATE page_blocks SET content = ${JSON.stringify(content)} WHERE id = ${block.id}`;
      updatedCount++;
    }
  }

  console.log(`Updated ${updatedCount} blocks.`);
  process.exit(0);
}

run();
