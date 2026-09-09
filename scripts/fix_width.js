const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
let count = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  if (content.includes('style={{ width: `${progressPercent}%` }}')) {
    content = content.replace(/style=\{\{\s*width:\s*`\$\{progressPercent\}%`\s*\}\}/g, 'style={{ transform: `scaleX(${progressPercent / 100})`, transformOrigin: "left" }}');
    content = content.replace(/transition-all duration-300"/g, 'transition-transform duration-300"');
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(file, content);
    count++;
  }
});
console.log('Fixed width animations in ' + count + ' files.');
