import fs from 'fs';
import path from 'path';

// Load env before db
process.env.DATABASE_URL = "postgresql://neondb_owner:npg_aescCOAz26qb@ep-misty-union-b2nepbs9.c-6.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
import { getSetting, setSetting } from './src/lib/db';

const ruPath = path.join(process.cwd(), 'src/i18n/ru.json');
const esPath = path.join(process.cwd(), 'src/i18n/es.json');

const ru = JSON.parse(fs.readFileSync(ruPath, 'utf8'));
const es = JSON.parse(fs.readFileSync(esPath, 'utf8'));

// Helper to check if a value is an ML object
function isML(v: any) {
  return typeof v === 'object' && v !== null && 'en' in v;
}

// Convert string to ML object using the loaded dictionaries
function toML(str: any) {
  if (isML(str)) return str; // already converted
  if (!str) return { en: "", ru: "", es: "" };
  
  const key = String(str).trim();
  return {
    en: str,
    ru: ru[key] || "",
    es: es[key] || ""
  };
}

async function run() {
  console.log("Starting i18n migration for global data...");
  
  const reviewsStr = await getSetting("global_reviews");
  if (reviewsStr) {
    const reviews = JSON.parse(reviewsStr);
    const newReviews = reviews.map((r: any) => ({
      ...r,
      category: toML(r.category),
      name: toML(r.name),
      initials: toML(r.initials),
      title: toML(r.title),
      text: toML(r.text)
    }));
    await setSetting("global_reviews", JSON.stringify(newReviews));
    console.log(`Migrated ${newReviews.length} reviews.`);
  }

  const galleryStr = await getSetting("global_gallery");
  if (galleryStr) {
    const gallery = JSON.parse(galleryStr);
    const newGallery = gallery.map((r: any) => ({
      ...r,
      category: toML(r.category),
      beforeLabel: toML(r.beforeLabel),
      afterLabel: toML(r.afterLabel)
    }));
    await setSetting("global_gallery", JSON.stringify(newGallery));
    console.log(`Migrated ${newGallery.length} gallery items.`);
  }

  console.log("Migration complete!");
  process.exit(0);
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
