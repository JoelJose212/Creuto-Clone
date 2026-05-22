const fs = require('fs');
const content = fs.readFileSync('d:/TTT/src/app/page.tsx', 'utf8');

// Find all script tags or script injections
const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
let match;
console.log("Injected script tags in page.tsx:");
while ((match = scriptRegex.exec(content)) !== null) {
  console.log("------------------------");
  console.log(match[0].substring(0, 500));
}

// Find dangerouslySetInnerHTML scripts
const dangerRegex = /dangerouslySetInnerHTML\s*=\s*\{\{\s*__html\s*:\s*[`"']([\s\S]*?)[`"']\s*\}\}/gi;
console.log("\ndangerouslySetInnerHTML scripts in page.tsx:");
while ((match = dangerRegex.exec(content)) !== null) {
  console.log("------------------------");
  console.log(match[0].substring(0, 500));
}

// Also check what other imports page.tsx has
const imports = content.split('\n').filter(line => line.trim().startsWith('import'));
console.log("\nImports in page.tsx:");
console.log(imports);
