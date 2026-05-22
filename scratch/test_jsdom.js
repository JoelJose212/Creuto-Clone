const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const filePath = path.join('D:', 'clone', 'Clone', 'creuto.com', 'how-creuto-help-businesses-scale-smartly.html');
const htmlContent = fs.readFileSync(filePath, 'utf8');
const bodyMatch = /<body[^>]*?>([\s\S]*?)<\/body>/i.exec(htmlContent);
const bodyHtml = bodyMatch ? bodyMatch[1] : "";
const dom = new JSDOM(bodyHtml);
const doc = dom.window.document;

console.log('Testing style modifications via JSDOM API:');

doc.querySelectorAll('[style]').forEach(el => {
  const originalStyle = el.getAttribute('style');
  const opacity = el.style.opacity;
  const transform = el.style.transform;
  
  if (opacity === '0' || originalStyle.includes('opacity:0') || originalStyle.includes('opacity: 0')) {
    console.log('\nFound element with opacity 0:');
    console.log('Original Style:', originalStyle);
    
    // Modify style properties using JSDOM API
    el.style.opacity = '1';
    if (el.style.transform) {
      el.style.transform = 'none';
    }
    
    console.log('New Style:', el.getAttribute('style'));
  }
});


