const fs = require('fs');

const files = [
  'd:/TTT/public/cloned_next/static/chunks/11e_lg_sg.5lk.css',
  'd:/TTT/public/cloned_next/static/chunks/15cdx8da0wltn.css',
  'd:/TTT/public/cloned_next/static/chunks/0ghnlru.2-aun.css',
  'd:/TTT/public/cloned_next/static/chunks/054gr0kjs26lp.css'
];

console.log("Checking CSS files in TTT/public/cloned_next/static/chunks:");
for (const file of files) {
  console.log(`${file}:`, fs.existsSync(file) ? "EXISTS" : "MISSING");
}
