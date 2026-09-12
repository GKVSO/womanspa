const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src/components');
const files = fs.readdirSync(componentsDir);

const reviewFiles = files.filter(f => f.includes('ReviewsSlider.tsx') || f === 'ReviewsSlider.tsx');
// Also HomeReviews.tsx is in src/components/home/HomeReviews.tsx
const homeReviewsPath = path.join(__dirname, 'src/components/home/HomeReviews.tsx');
if (fs.existsSync(homeReviewsPath)) reviewFiles.push('home/HomeReviews.tsx');

const galleryFiles = files.filter(f => f.includes('GallerySlider.tsx') || f === 'GallerySlider.tsx');
const homeGalleryPath = path.join(__dirname, 'src/components/home/HomeGallery.tsx');
if (fs.existsSync(homeGalleryPath)) galleryFiles.push('home/HomeGallery.tsx');

function refactorReviews(filePath) {
  const fullPath = path.join(componentsDir, filePath);
  let content = fs.readFileSync(fullPath, 'utf8');

  // Skip if already refactored
  if (content.includes('useGlobalData')) return;

  // Remove the hardcoded array
  content = content.replace(/const reviews(?::\s*Review\[\])?\s*=\s*\[[\s\S]*?\];/g, '// Hardcoded reviews removed');

  // Insert import
  content = content.replace(/(import .*;\n)/, '$1import { useGlobalData } from "@/components/GlobalDataProvider";\n');

  // Insert hook inside component
  content = content.replace(/(export default function \w+\([^)]*\)\s*\{)/, '$1\n  const { reviews } = useGlobalData();');

  fs.writeFileSync(fullPath, content);
  console.log('Refactored', filePath);
}

function refactorGallery(filePath) {
  const fullPath = path.join(componentsDir, filePath);
  let content = fs.readFileSync(fullPath, 'utf8');

  if (content.includes('useGlobalData')) return;

  // Some use const slides = [ ... ]
  content = content.replace(/const slides\s*=\s*\[[\s\S]*?\];/g, '// Hardcoded slides removed');
  // Some might use something else? Check if they use slides.

  content = content.replace(/(import .*;\n)/, '$1import { useGlobalData } from "@/components/GlobalDataProvider";\n');

  content = content.replace(/(export default function \w+\([^)]*\)\s*\{)/, '$1\n  const { gallery: slides } = useGlobalData();');

  fs.writeFileSync(fullPath, content);
  console.log('Refactored', filePath);
}

reviewFiles.forEach(refactorReviews);
galleryFiles.forEach(refactorGallery);

console.log("Refactoring complete");
