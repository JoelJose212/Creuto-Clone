const fs = require('fs');
const path = require('path');

function searchInCss(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  let idx = 0;
  while ((idx = content.indexOf('mui-1h4dmgi', idx)) !== -1) {
    console.log(`\n=== Found mui-1h4dmgi in ${path.basename(filePath)} at index ${idx} ===`);
    const start = Math.max(0, idx - 150);
    const end = Math.min(content.length, idx + 400);
    console.log(content.substring(start, end));
    idx += 'mui-1h4dmgi'.length;
  }
}

const srcAppDir = path.join('d:', 'TTT', 'src', 'app');
searchInCss(path.join(srcAppDir, 'homePageStyles.css'));
searchInCss(path.join(srcAppDir, 'careers', 'careersPageStyles.css'));
searchInCss(path.join(srcAppDir, 'globals.css'));
