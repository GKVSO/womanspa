const postgres = require('postgres');
const fs = require('fs');

const sql = postgres('postgresql://neondb_owner:npg_aescCOAz26qb@ep-misty-union-b2nepbs9.c-6.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require', { max: 1 });

const t1 = JSON.parse(fs.readFileSync('C:/Users/neron/.gemini/antigravity/brain/0f34aa31-a9c5-470b-86a1-d3bb720ac9af/scratch/t1.json', 'utf8'));
const t2 = JSON.parse(fs.readFileSync('C:/Users/neron/.gemini/antigravity/brain/0f34aa31-a9c5-470b-86a1-d3bb720ac9af/scratch/t2.json', 'utf8'));
const t3 = JSON.parse(fs.readFileSync('C:/Users/neron/.gemini/antigravity/brain/0f34aa31-a9c5-470b-86a1-d3bb720ac9af/scratch/t3.json', 'utf8'));
const t4 = JSON.parse(fs.readFileSync('C:/Users/neron/.gemini/antigravity/brain/0f34aa31-a9c5-470b-86a1-d3bb720ac9af/scratch/t4.json', 'utf8'));

const dict = { ...t1, ...t2, ...t3, ...t4 };

const ML_KEYS = new Set([
  "title", "subtitle", "body", "primaryBtn", "secondaryBtn",
  "starsText", "buttonText", "phone", "email", "address", "workHours",
]);

const ML_ITEM_KEYS = new Set([
  "title", "text", "subtitle", "num", "before", "after", "beforeLabel", "afterLabel", "category", "question", "answer", "name", "q", "a",
]);

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

    function applyTranslation(val) {
      if (typeof val === 'string' && val.trim() !== '') {
        const trans = dict[val];
        if (trans) {
          changed = true;
          return { en: val, ru: trans.ru, es: trans.es };
        }
      } else if (typeof val === 'object' && val !== null && val.en) {
        const trans = dict[val.en];
        if (trans) {
          if (!val.ru) { val.ru = trans.ru; changed = true; }
          if (!val.es) { val.es = trans.es; changed = true; }
          // if it was poorly translated by jaccard, overwrite it with perfect translation
          if (val.ru !== trans.ru) { val.ru = trans.ru; changed = true; }
          if (val.es !== trans.es) { val.es = trans.es; changed = true; }
        }
      }
      return val;
    }

    for (const key of Object.keys(content)) {
      if (ML_KEYS.has(key)) {
        content[key] = applyTranslation(content[key]);
      } else if (Array.isArray(content[key])) {
        for (let i = 0; i < content[key].length; i++) {
          const item = content[key][i];
          if (typeof item === 'object' && item !== null) {
            for (const itemKey of Object.keys(item)) {
              if (ML_ITEM_KEYS.has(itemKey)) {
                item[itemKey] = applyTranslation(item[itemKey]);
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

  console.log(`Updated ${updatedCount} blocks using AI dictionary.`);
  process.exit(0);
}

run();
