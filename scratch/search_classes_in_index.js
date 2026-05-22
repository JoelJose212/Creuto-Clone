const fs = require('fs');
const html = fs.readFileSync('d:/clone/Clone/creuto.com/index.html', 'utf8');

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

console.log("Searching framework classes in index.html:");
classes.forEach(cls => {
  // Let's search inside style tags in index.html
  const regex = new RegExp(`\\.${cls}\\s*\\{[^}]*\\}`, 'g');
  const matches = html.match(regex);
  if (matches) {
    console.log(`\n- Class ${cls} has dynamic styles:`);
    matches.forEach(m => console.log(m));
  } else {
    console.log(`- Class ${cls} not matched in styles`);
  }
});
