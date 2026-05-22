const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/page.tsx');
const content = fs.readFileSync(filePath, 'utf8');

// Find the index of the start of the framework section
const startTag = '<section className="MuiBox-root mui-9ou6f4">';
const startIndex = content.indexOf(startTag);

if (startIndex === -1) {
  console.log("Could not find start tag");
  // Let's print some sections or tags that exist in the file to help us find it
  const sections = [];
  let pos = 0;
  while (true) {
    const idx = content.indexOf('<section', pos);
    if (idx === -1) break;
    const endIdx = content.indexOf('>', idx);
    sections.push(content.substring(idx, endIdx + 1));
    pos = endIdx;
  }
  console.log("Found sections:", sections);
  process.exit(1);
}

console.log("Found start tag at index:", startIndex);

// Let's find the next section tag to see where the current section ends
const nextSectionIdx = content.indexOf('<section', startIndex + startTag.length);
console.log("Next section starts at index:", nextSectionIdx);

if (nextSectionIdx !== -1) {
  const sectionContent = content.substring(startIndex, nextSectionIdx);
  console.log("Section length:", sectionContent.length);
  // Let's print the first 200 chars and last 200 chars of the section
  console.log("First 200 chars:", sectionContent.substring(0, 200));
  console.log("Last 200 chars:", sectionContent.substring(sectionContent.length - 200));
} else {
  console.log("No next section found!");
}
