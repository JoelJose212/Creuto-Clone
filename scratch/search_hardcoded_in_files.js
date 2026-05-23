const fs = require('fs');
const path = require('path');

function searchInFile(filePath, searchStr) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  let idx = 0;
  const regex = new RegExp(searchStr, 'gi');
  let match;
  while ((match = regex.exec(content)) !== null) {
    console.log(`\n=== Found match in ${path.basename(filePath)} at index ${match.index} ===`);
    const start = Math.max(0, match.index - 100);
    const end = Math.min(content.length, match.index + 400);
    console.log(content.substring(start, end));
  }
}

const srcAppDir = path.join('d:', 'TTT', 'src', 'app');
searchInFile(path.join(srcAppDir, 'careers', 'page.tsx'), 'product engineering');

