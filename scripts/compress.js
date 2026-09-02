const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await processDirectory(fullPath);
    } else if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.webp') || file.endsWith('.jpeg')) {
      const stat = fs.statSync(fullPath);
      if (stat.size > 500 * 1024) { // larger than 500KB
        console.log(`Compressing ${fullPath} (${(stat.size / 1024 / 1024).toFixed(2)} MB)...`);
        try {
          const tempPath = fullPath + '.tmp';
          const metadata = await sharp(fullPath).metadata();
          let pipeline = sharp(fullPath);
          
          if (metadata.width > 1920) {
              pipeline = pipeline.resize(1920);
          }

          if (file.endsWith('.png')) {
            await pipeline.png({ quality: 75, compressionLevel: 9 }).toFile(tempPath);
          } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
            await pipeline.jpeg({ quality: 75 }).toFile(tempPath);
          } else if (file.endsWith('.webp')) {
            await pipeline.webp({ quality: 75 }).toFile(tempPath);
          }
          
          fs.renameSync(tempPath, fullPath);
          const newStat = fs.statSync(fullPath);
          console.log(`-> Reduced to ${(newStat.size / 1024 / 1024).toFixed(2)} MB`);
        } catch (e) {
          console.error(`Error compressing ${fullPath}:`, e);
        }
      }
    }
  }
}

processDirectory('./public').then(() => console.log('Done!')).catch(console.error);
