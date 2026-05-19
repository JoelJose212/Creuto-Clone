const fs = require('fs');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('index_extracted_body.html', 'utf8');
const dom = new JSDOM(html);
const children = dom.window.document.body.children;

for (let i = 0; i < children.length; i++) {
  const child = children[i];
  const outer = child.outerHTML.substring(0, 150).replace(/\n/g, ' ');
  console.log(`Child ${i}: <${child.tagName}> class="${child.className}" text snippet: ${child.textContent.substring(0, 50).trim()}... HTML: ${outer}`);
}
