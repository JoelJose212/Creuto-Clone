const fs = require('fs');
const css = fs.readFileSync('d:/TTT/public/cloned_next/static/chunks/0ghnlru.2-aun.css', 'utf8');

// Find all CSS rules related to gp-
const lines = css.split('}');
console.log("CSS Rules containing 'gp-':");
let count = 0;
for (const rule of lines) {
  if (rule.includes('gp-')) {
    console.log("------------------------");
    console.log(rule.trim() + '}');
    count++;
    if (count > 25) break;
  }
}
