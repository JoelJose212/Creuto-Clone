const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const cloneDir = path.join('D:', 'clone', 'Clone', 'creuto.com');
const allBlogs = [
  'how-smes-can-leverage-ai.html',
  'how-creuto-help-businesses-scale-smartly.html',
  'why-every-business-owner-should-invest-in-custom-software.html',
  'the-beginning-of-something-real.html',
  'your-customers-are-on-mobile.html',
  'custom-crm.html',
  'software-partner.html',
  'custom-software-development.html',
  'customsoftware-roi.html',
  'startup.html'
];

for (const file of allBlogs) {
  const filePath = path.join(cloneDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Missing: ${file}`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const dom = new JSDOM(content);
  const doc = dom.window.document;
  
  console.log(`File: ${file}`);
  console.log(`  - Ribbon (.mui-1h4dmgi):`, !!doc.querySelector('.mui-1h4dmgi'));
  console.log(`  - Navbar (.mui-143ljvh):`, !!doc.querySelector('.mui-143ljvh'));
  console.log(`  - Footer (.mui-a524gp):`, !!doc.querySelector('.mui-a524gp'));
  console.log(`  - WhatsApp (.mui-160f6iq):`, !!doc.querySelector('.mui-160f6iq'));
}
