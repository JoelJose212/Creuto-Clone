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

// Search for margin-top or padding-top inside style tags
console.log('Searching style tags for margin-top or padding-top...');
const matches = [];
styleContents.forEach((css, idx) => {
  const regex = /(\.[a-zA-Z0-9_-]+)\s*\{[^}]*(margin-top|padding-top)\s*:[^}]*\}/gi;
  let m;
  while ((m = regex.exec(css)) !== null) {
    matches.push({
      styleIndex: idx,
      classSelector: m[1],
      rule: m[0]
    });
  }
});

console.log('Classes with margin-top or padding-top:', matches);
