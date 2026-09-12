const postgres = require('postgres');
const fs = require('fs');

const sql = postgres('postgresql://neondb_owner:npg_aescCOAz26qb@ep-misty-union-b2nepbs9.c-6.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require', { max: 1 });

const ru = JSON.parse(fs.readFileSync('c:/1Frontend/1Work/2New/womanmedspa-backup/womanmedspa/src/i18n/ru.json', 'utf8'));
const es = JSON.parse(fs.readFileSync('c:/1Frontend/1Work/2New/womanmedspa-backup/womanmedspa/src/i18n/es.json', 'utf8'));

// Build normalized maps
function normalize(str) {
  if (typeof str !== 'string') return '';
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

const ruNormalized = {};
for (const k in ru) {
  const norm = normalize(k);
  if (norm) ruNormalized[norm] = ru[k];
}

const esNormalized = {};
for (const k in es) {
  const norm = normalize(k);
  if (norm) esNormalized[norm] = es[k];
}

const ML_KEYS = new Set([
  "title", "subtitle", "body", "primaryBtn", "secondaryBtn",
  "starsText", "buttonText", "phone", "email", "address", "workHours",
]);

const ML_ITEM_KEYS = new Set([
  "title", "text", "subtitle", "num", "before", "after", "beforeLabel", "afterLabel", "category", "question", "answer", "name", "q", "a",
]);

function getTranslation(enText) {
  if (typeof enText !== "string" || !enText.trim()) return enText;
  const norm = normalize(enText);
  const ruText = ru[enText] || ruNormalized[norm] || "";
  const esText = es[enText] || esNormalized[norm] || "";
  
  // If still missing, try splitting by sentence or comma for bodies (basic heuristic)
  let finalRu = ruText;
  let finalEs = esText;
  
  if (!finalRu && enText.length > 50) {
    // Try splitting by '. '
    const parts = enText.split('. ');
    let allRuMatch = true;
    let allEsMatch = true;
    let buildRu = [];
    let buildEs = [];
    
    for (let p of parts) {
      if (!p.endsWith('.')) p = p + '.';
      let pNorm = normalize(p);
      let pNormNoDot = normalize(p.replace('.', ''));
      
      let pRu = ru[p] || ruNormalized[pNorm] || ruNormalized[pNormNoDot];
      let pEs = es[p] || esNormalized[pNorm] || esNormalized[pNormNoDot];
      
      // also try without trailing dot
      if (!pRu && p.endsWith('.')) {
         let pNoDot = p.slice(0, -1);
         pRu = ru[pNoDot] || ruNormalized[normalize(pNoDot)];
         pEs = es[pNoDot] || esNormalized[normalize(pNoDot)];
      }

      if (pRu) buildRu.push(pRu); else allRuMatch = false;
      if (pEs) buildEs.push(pEs); else allEsMatch = false;
    }
    
    if (allRuMatch && buildRu.length > 0) finalRu = buildRu.join(' ');
    if (allEsMatch && buildEs.length > 0) finalEs = buildEs.join(' ');
  }

  return { en: enText, ru: finalRu, es: finalEs };
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

    for (const key of Object.keys(content)) {
      if (ML_KEYS.has(key)) {
        const val = content[key];
        if (typeof val === 'string' && val.trim() !== '') {
          content[key] = getTranslation(val);
          changed = true;
        } else if (typeof val === 'object' && val !== null && val.en) {
          const trans = getTranslation(val.en);
          if (!val.ru && trans.ru) { val.ru = trans.ru; changed = true; }
          if (!val.es && trans.es) { val.es = trans.es; changed = true; }
        }
      } else if (Array.isArray(content[key])) {
        for (let i = 0; i < content[key].length; i++) {
          const item = content[key][i];
          if (typeof item === 'object' && item !== null) {
            for (const itemKey of Object.keys(item)) {
              if (ML_ITEM_KEYS.has(itemKey)) {
                const itemVal = item[itemKey];
                if (typeof itemVal === 'string' && itemVal.trim() !== '') {
                  item[itemKey] = getTranslation(itemVal);
                  changed = true;
                } else if (typeof itemVal === 'object' && itemVal !== null && itemVal.en) {
                  const trans = getTranslation(itemVal.en);
                  if (!itemVal.ru && trans.ru) { itemVal.ru = trans.ru; changed = true; }
                  if (!itemVal.es && trans.es) { itemVal.es = trans.es; changed = true; }
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
