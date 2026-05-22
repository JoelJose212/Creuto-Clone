const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const filePath = path.join('D:', 'clone', 'Clone', 'creuto.com', 'how-creuto-help-businesses-scale-smartly.html');
const htmlContent = fs.readFileSync(filePath, 'utf8');

const dom = new JSDOM(htmlContent);
const doc = dom.window.document;

// Look at all style tags in the head or body
const styleContents = [];
doc.querySelectorAll('style').forEach(style => {
  styleContents.push(style.textContent);
});

// Look for opacity: 0 in style contents
console.log('Searching style tags for opacity:0 or related keywords...');
const matches = [];
styleContents.forEach((css, idx) => {
  // Find all class selectors with opacity: 0
  const regex = /(\.[a-zA-Z0-9_-]+)\s*\{[^}]*opacity\s*:\s*0[^}]*\}/gi;
  let m;
  while ((m = regex.exec(css)) !== null) {
    matches.push({
      styleIndex: idx,
      classSelector: m[1],
      rule: m[0]
    });
  }
});

console.log('CSS classes with opacity:0:', matches);
