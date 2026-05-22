const fs = require('fs');
const path = require('path');

const classes = [
  'mui-w1q9pb',
  'mui-1goid3c',
  'mui-pkeizy',
  'mui-1ris9kj',
  'mui-a6mqga',
  'mui-ybem02',
  'mui-gpolos',
  'mui-558xq1'
];

const cssDir = 'd:/TTT/public/cloned_next/static/chunks';
const files = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));

console.log("Searching framework classes in all cloned CSS files:");
for (const file of files) {
  const filePath = path.join(cssDir, file);
  const css = fs.readFileSync(filePath, 'utf8');
  console.log(`\n--- File: ${file} ---`);
  classes.forEach(cls => {
    const index = css.indexOf(cls);
    if (index !== -1) {
      console.log(`- ${cls}: FOUND`);
      console.log(css.substring(Math.max(0, index - 50), Math.min(css.length, index + 350)));
    }
  });
}
