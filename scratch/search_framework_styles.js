const fs = require('fs');

const css = fs.readFileSync('d:/TTT/public/cloned_next/static/chunks/0ghnlru.2-aun.css', 'utf8');

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

console.log("Searching classes in 0ghnlru.2-aun.css:");
classes.forEach(cls => {
  const index = css.indexOf(cls);
  if (index !== -1) {
    console.log(`- ${cls}: FOUND at pos ${index}`);
    // print surrounding 200 chars
    console.log(css.substring(Math.max(0, index - 50), Math.min(css.length, index + 250)));
  } else {
    console.log(`- ${cls}: NOT FOUND`);
  }
});
