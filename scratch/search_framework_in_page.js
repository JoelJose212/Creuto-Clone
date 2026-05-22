const fs = require('fs');
const content = fs.readFileSync('d:/TTT/src/app/page.tsx', 'utf8');

// Find the section that has C Is for CREUTO
const index = content.indexOf('C Is for CREUTO. C Is How We Build.');
if (index === -1) {
  console.log("❌ Could not find 'C Is for CREUTO' in page.tsx");
} else {
  console.log("✅ Found 'C Is for CREUTO' in page.tsx!");
  console.log("Showing surrounding text (1500 chars):");
  console.log(content.substring(index - 200, index + 3000));
}
