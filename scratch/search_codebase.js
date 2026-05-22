const fs = require('fs');
const path = require('path');

function searchDir(dir, query, exclude = ['node_modules', '.next', '.git']) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      if (exclude.includes(file)) continue;
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        results = results.concat(searchDir(fullPath, query, exclude));
      } else {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes(query)) {
          results.push(fullPath);
        }
      }
    }
  } catch (err) {
    // Ignore read errors
  }
  return results;
}

console.log("Searching in d:/TTT...");
const tttResults = searchDir("d:/TTT", "gp-carousel");
console.log("TTT results for 'gp-carousel':", tttResults);

const tttResults2 = searchDir("d:/TTT", "gp-scene");
console.log("TTT results for 'gp-scene':", tttResults2);

const tttResults3 = searchDir("d:/TTT", "carousel");
console.log("TTT results for 'carousel':", tttResults3.slice(0, 10));

console.log("\nSearching in d:/clone...");
const cloneResults = searchDir("d:/clone", "gp-carousel");
console.log("Clone results for 'gp-carousel':", cloneResults);
