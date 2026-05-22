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

console.log('Searching style tags for mui-3qe8o5 exactly...');
styleContents.forEach((css, idx) => {
  const index = css.indexOf('mui-3qe8o5');
  if (index !== -1) {
    console.log(`Found in style tag ${idx} at position ${index}`);
    // extract surrounding text
    console.log(css.substring(Math.max(0, index - 100), Math.min(css.length, index + 300)));
  }
});
