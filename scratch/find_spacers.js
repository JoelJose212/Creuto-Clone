const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const filePath = path.join('D:', 'clone', 'Clone', 'creuto.com', 'how-creuto-help-businesses-scale-smartly.html');
const htmlContent = fs.readFileSync(filePath, 'utf8');

const dom = new JSDOM(htmlContent);
const doc = dom.window.document;

console.log('--- FIRST 15 CHILDREN OF BODY ---');
const children = Array.from(doc.body.children);
children.slice(0, 15).forEach((el, idx) => {
  console.log(`${idx}: ${el.tagName}.${el.className} | id: "${el.id}" | style: "${el.getAttribute('style') || ''}"`);
});
