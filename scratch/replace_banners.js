const fs = require('fs');
const path = require('path');

function replaceBannerInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let searchStr = 'className="MuiBox-root mui-1h4dmgi"';
  let index = content.indexOf(searchStr);
  if (index === -1) return false;

  // Find the opening <div of this banner
  let openDivIndex = content.lastIndexOf('<div', index);
  if (openDivIndex === -1) {
    console.error("Could not find opening div for banner in " + filePath);
    return false;
  }

  // Trace matching closing </div>
  let level = 0;
  let pos = openDivIndex;
  let closedDivIndex = -1;

  while (pos < content.length) {
    if (content.substr(pos, 4) === '<div') {
      let nextChar = content.charAt(pos + 4);
      if (nextChar === ' ' || nextChar === '>') {
        level++;
      }
    } else if (content.substr(pos, 6) === '</div>') {
      level--;
      if (level === 0) {
        closedDivIndex = pos + 6;
        break;
      }
    }
    pos++;
  }

  if (closedDivIndex === -1) {
    console.error("Could not find matching closing div for banner in " + filePath);
    return false;
  }

  // Replace this block with <AnnouncementBanner />
  let bannerBlock = content.substring(openDivIndex, closedDivIndex);
  let newContent = content.substring(0, openDivIndex) + '<AnnouncementBanner />' + content.substring(closedDivIndex);

  // Add import if not present
  if (!newContent.includes('import AnnouncementBanner')) {
    let insertIndex = 0;
    if (newContent.includes('"use client"')) {
      insertIndex = newContent.indexOf('"use client"') + 12;
      while (insertIndex < newContent.length && (newContent[insertIndex] === '\n' || newContent[insertIndex] === '\r' || newContent[insertIndex] === ';')) {
        insertIndex++;
      }
    } else if (newContent.includes("'use client'")) {
      insertIndex = newContent.indexOf("'use client'") + 12;
      while (insertIndex < newContent.length && (newContent[insertIndex] === '\n' || newContent[insertIndex] === '\r' || newContent[insertIndex] === ';')) {
        insertIndex++;
      }
    } else {
      let firstImport = newContent.indexOf('import ');
      if (firstImport !== -1) {
        insertIndex = firstImport;
      }
    }
    
    newContent = newContent.substring(0, insertIndex) + "\nimport AnnouncementBanner from '@/components/layout/AnnouncementBanner';\n" + newContent.substring(insertIndex);
  }

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log("Successfully replaced banner in: " + filePath);
  return true;
}

function traverseDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      traverseDirectory(filePath);
    } else if (stat.isFile() && (file.endsWith('.tsx') || file.endsWith('.jsx'))) {
      replaceBannerInFile(filePath);
    }
  }
}

// Target the src/app directory
const targetDir = path.join(__dirname, '..', 'src', 'app');
console.log("Starting banner replacement in: " + targetDir);
traverseDirectory(targetDir);
console.log("Completed banner replacement scan!");
