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

function getWords(str) {
  if (typeof str !== 'string') return [];
  return str.toLowerCase().replace(/[^a-z0-9]/g, ' ').split(/\s+/).filter(w => w.length > 2);
}

function jaccard(w1, w2) {
  if (w1.length === 0 || w2.length === 0) return 0;
  const set1 = new Set(w1);
  const set2 = new Set(w2);
  let intersection = 0;
  for (let w of set1) {
    if (set2.has(w)) intersection++;
  }
  const union = set1.size + set2.size - intersection;
  return intersection / union;
}

const ruNormalized = {};
const ruWords = [];
for (const k in ru) {
  const norm = normalize(k);
  if (norm) {
    ruNormalized[norm] = ru[k];
    ruWords.push({ key: k, words: getWords(k), val: ru[k] });
  }
}

const esNormalized = {};
const esWords = [];
for (const k in es) {
  const norm = normalize(k);
  if (norm) {
    esNormalized[norm] = es[k];
    esWords.push({ key: k, words: getWords(k), val: es[k] });
  }
}

const ML_KEYS = new Set([
  "title", "subtitle", "body", "primaryBtn", "secondaryBtn",
  "starsText", "buttonText", "phone", "email", "address", "workHours",
]);

const ML_ITEM_KEYS = new Set([
  "title", "text", "subtitle", "num", "before", "after", "beforeLabel", "afterLabel", "category", "question", "answer", "name", "q", "a",
]);

function getFuzzyTranslation(enText, wordsList) {
  let bestMatch = null;
  let maxScore = 0;
  const targetWords = getWords(enText);
  if (targetWords.length < 2) return "";
  
  for (const item of wordsList) {
    const score = jaccard(targetWords, item.words);
    // If overlap is greater than 40% and we share at least 3 words (or it's a short sentence)
    if (score > 0.20 && score > maxScore) {
      maxScore = score;
      bestMatch = item.val;
    }
  }
  return maxScore > 0.20 ? bestMatch : "";
}

function getTranslation(enText) {
  if (typeof enText !== "string" || !enText.trim()) return enText;
  const norm = normalize(enText);
  let ruText = ru[enText] || ruNormalized[norm] || "";
  let esText = es[enText] || esNormalized[norm] || "";
  
  if (!ruText) {
    ruText = getFuzzyTranslation(enText, ruWords);
  }
  if (!esText) {
    esText = getFuzzyTranslation(enText, esWords);
  }

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
