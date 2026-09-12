process.env.DATABASE_URL = "postgresql://neondb_owner:npg_aescCOAz26qb@ep-misty-union-b2nepbs9.c-6.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
import { setSetting, getSetting } from "./src/lib/db";

const initialReviews = [
  {
    id: 1,
    category: "Skin Rejuvenation",
    title: "Skin Looked Smoother!",
    text: "I wanted healthier skin without downtime. Candela Matrix smoothed my texture and left my face looking fresher and much more radiant now too.",
    name: "Jennifer Morales",
    initials: "JM",
    stars: 5,
  },
  {
    id: 2,
    category: "Body Contouring",
    title: "Amazing Results!",
    text: "The body contouring treatment exceeded all my expectations. I saw a clear difference after just a few sessions, and it was very comfortable.",
    name: "Sarah Johnson",
    initials: "SJ",
    stars: 5,
  },
  {
    id: 3,
    category: "Laser Hair Removal",
    title: "Best Investment Ever",
    text: "After years of waxing, laser hair removal changed everything. The staff was gentle and professional, and the results are so truly permanent.",
    name: "Maria Rodriguez",
    initials: "MR",
    stars: 5,
  },
  {
    id: 4,
    category: "Wellness",
    title: "Felt Rejuvenated",
    text: "The wellness program is a complete experience from the start. I walked out feeling like a new person. The treatments were tailored to needs.",
    name: "Amanda Wilson",
    initials: "AW",
    stars: 5,
  },
  {
    id: 5,
    category: "Skin Rejuvenation",
    title: "Glowing Skin",
    text: "My friends keep asking what I did to my skin! The rejuvenation treatments are top-notch and the results speak for themselves, truly amazing.",
    name: "Jessica Brown",
    initials: "JB",
    stars: 5,
  },
  {
    id: 6,
    category: "Body Contouring",
    title: "Contour Like Never Before",
    text: "I was skeptical at first, but the body contouring results are incredible. My clothes fit better and I feel so much more confident in myself.",
    name: "Elizabeth Garcia",
    initials: "EG",
    stars: 5,
  },
];

const initialGallery = [
  { id: 1, category: "Body", before: "/before-image.webp", after: "/after-image.webp" },
  { id: 2, category: "Face", before: "/before-image-2.webp", after: "/after-image-2.webp" },
  { id: 3, category: "Body", before: "/before-image.webp", after: "/after-image.webp" },
  { id: 4, category: "Body", before: "/before-image-2.webp", after: "/after-image-2.webp" },
  { id: 5, category: "Face", before: "/before-image.webp", after: "/after-image.webp" },
];

async function run() {
  console.log("Starting migration...");
  await setSetting("global_reviews", JSON.stringify(initialReviews));
  await setSetting("global_gallery", JSON.stringify(initialGallery));
  console.log("Migration complete!");
  process.exit(0);
}

run();
