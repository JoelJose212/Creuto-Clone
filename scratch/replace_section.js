const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Insert import statement
const importStylesStr = 'import "./homePageStyles.css"';
const importStylesIdx = content.indexOf(importStylesStr);
if (importStylesIdx === -1) {
  console.error("Could not find import for styles!");
  process.exit(1);
}

const importStr = '\nimport FrameworkSection from "@/components/sections/FrameworkSection"';
if (!content.includes('import FrameworkSection')) {
  content = content.substring(0, importStylesIdx + importStylesStr.length) + 
            importStr + 
            content.substring(importStylesIdx + importStylesStr.length);
  console.log("Import statement inserted!");
} else {
  console.log("Import statement already exists!");
}

// 2. Locate framework section and replace
const startTag = '<section className="MuiBox-root mui-9ou6f4">';
const startIndex = content.indexOf(startTag);
if (startIndex === -1) {
  console.error("Could not find start tag!");
  process.exit(1);
}

const nextSectionIdx = content.indexOf('<section', startIndex + startTag.length);
if (nextSectionIdx === -1) {
  console.error("Could not find next section start!");
  process.exit(1);
}

content = content.substring(0, startIndex) + 
          '<FrameworkSection />' + 
          content.substring(nextSectionIdx);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Section replaced successfully!");
