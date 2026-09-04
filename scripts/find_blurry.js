const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 1. Get all images in public/
function getImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getImages(fullPath, fileList);
    } else if (file.match(/\.(png|jpg|jpeg|webp)$/i)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

// 2. Get all tsx files
function getTsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getTsxFiles(fullPath, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

async function analyze() {
  const images = getImages('./public');
  const tsxFiles = getTsxFiles('./src');
  
  // Read all TSX content into memory for quick searching
  const tsxContents = tsxFiles.map(f => ({
    path: f,
    content: fs.readFileSync(f, 'utf8')
  }));

  const results = [];

  for (const imgPath of images) {
    const fileName = path.basename(imgPath);
    
    // Find where it's used
    const usedIn = [];
    let isHero = false;
    
    for (const tsx of tsxContents) {
      if (tsx.content.includes(fileName)) {
        usedIn.push(tsx.path);
        if (tsx.path.toLowerCase().includes('hero') || tsx.content.includes('bg-[url') || tsx.content.includes('w-full')) {
          isHero = true;
        }
      }
    }

    if (usedIn.length > 0) {
      try {
        const metadata = await sharp(imgPath).metadata();
        
        // If it's used in a large container but width is smallish
        if (isHero && metadata.width < 1400) {
          results.push({
            file: fileName,
            width: metadata.width,
            height: metadata.height,
            usedIn: usedIn.map(p => path.basename(p)).join(', ')
          });
        }
      } catch (e) {
        // ignore sharp errors
      }
    }
  }
  
  // Sort by width ascending (worst offenders first)
  results.sort((a, b) => a.width - b.width);
  
  console.log(JSON.stringify(results, null, 2));
}

analyze().catch(console.error);
