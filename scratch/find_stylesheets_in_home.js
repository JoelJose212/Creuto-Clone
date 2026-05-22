const fs = require('fs');
const content = fs.readFileSync('d:/TTT/src/app/page.tsx', 'utf8');

const regex = /<link[^>]*href=["']([^"']+)["'][^>]*>/gi;
let match;
console.log("Stylesheet links found in page.tsx:");
while ((match = regex.exec(content)) !== null) {
  console.log(match[0]);
}

const cssRegex = /["']([^"']+\.css)["']/gi;
console.log("\nCSS strings referenced in page.tsx:");
while ((match = cssRegex.exec(content)) !== null) {
  console.log(match[1]);
}
