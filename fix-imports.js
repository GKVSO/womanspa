const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src/components');
const files = fs.readdirSync(componentsDir);

const reviewFiles = files.filter(f => f.includes('ReviewsSlider.tsx') || f === 'ReviewsSlider.tsx');
const homeReviewsPath = path.join(__dirname, 'src/components/home/HomeReviews.tsx');
if (fs.existsSync(homeReviewsPath)) reviewFiles.push('home/HomeReviews.tsx');

const galleryFiles = files.filter(f => f.includes('GallerySlider.tsx') || f === 'GallerySlider.tsx');
const homeGalleryPath = path.join(__dirname, 'src/components/home/HomeGallery.tsx');
if (fs.existsSync(homeGalleryPath)) galleryFiles.push('home/HomeGallery.tsx');

function fixImport(filePath) {
  const fullPath = path.join(componentsDir, filePath);
  let content = fs.readFileSync(fullPath, 'utf8');

  if (!content.includes('useGlobalData')) {
    // wait, if it does not include useGlobalData at all, something went wrong.
    console.log("Not found at all in", filePath);
  }

  if (content.includes('useGlobalData') && !content.includes('import { useGlobalData }')) {
    // Insert after "use client";
    content = content.replace(/"use client";\r?\n/, '"use client";\nimport { useGlobalData } from "@/components/GlobalDataProvider";\n');
    fs.writeFileSync(fullPath, content);
    console.log('Fixed import in', filePath);
  }
}

reviewFiles.forEach(fixImport);
galleryFiles.forEach(fixImport);

console.log("Fix complete");
