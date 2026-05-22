const fs = require('fs');
const path = require('path');

function searchDir(dir, query) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      if (['node_modules', '.next', '.git'].includes(file)) continue;
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        results = results.concat(searchDir(fullPath, query));
      } else {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes(query)) {
          results.push(fullPath);
        }
      }
    }
  } catch (err) {}
  return results;
}

console.log("Searching for '0ghnlru.2-aun.css' imports:");
console.log(searchDir("d:/TTT", "0ghnlru.2-aun.css"));
console.log("Searching for 'cloned_next' imports:");
console.log(searchDir("d:/TTT", "cloned_next"));
