const fs = require('fs');
const content = fs.readFileSync('d:/TTT/src/app/page.tsx', 'utf8');

const lines = content.split('\n');
console.log("Lines containing 'cloned_next' in page.tsx:");
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('cloned_next')) {
    console.log(`${i+1}: ${lines[i].trim()}`);
  }
}
