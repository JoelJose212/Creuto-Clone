const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const filePath = path.join('D:', 'clone', 'Clone', 'creuto.com', 'how-creuto-help-businesses-scale-smartly.html');
const htmlContent = fs.readFileSync(filePath, 'utf8');

const dom = new JSDOM(htmlContent);
const doc = dom.window.document;

console.log('--- ALL ELEMENTS WITH STYLE ATTRIBUTE ---');
doc.querySelectorAll('[style]').forEach(el => {
  console.log(`${el.tagName}.${el.className}: "${el.getAttribute('style')}"`);
});
