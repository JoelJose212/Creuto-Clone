const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const filePath = path.join('D:', 'clone', 'Clone', 'creuto.com', 'how-creuto-help-businesses-scale-smartly.html');
const htmlContent = fs.readFileSync(filePath, 'utf8');

const dom = new JSDOM(htmlContent);
const doc = dom.window.document;

const styleContents = [];
doc.querySelectorAll('style').forEach(style => {
  styleContents.push(style.textContent);
});

console.log('Searching style tags for padding or margin on body/html...');
styleContents.forEach((css, idx) => {
  // search for selector body or html in style block
  const regex = /(body|html)\s*\{([^}]+)\}/gi;
  let m;
  while ((m = regex.exec(css)) !== null) {
    console.log(`Found: "${m[0]}" in style tag ${idx}`);
  }
});
