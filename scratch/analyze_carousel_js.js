const fs = require('fs');
const path = require('path');

const chunk1 = fs.readFileSync('d:/clone/Clone/creuto.com/_next/static/chunks/0-nphims6rlic.js', 'utf8');
const chunk2 = fs.readFileSync('d:/clone/Clone/creuto.com/_next/static/chunks/0.8-prwo9c-7_.js', 'utf8');

console.log("Chunk 1 size:", chunk1.length);
console.log("Chunk 2 size:", chunk2.length);

function findMatches(content, query) {
  let pos = 0;
  let matches = [];
  while ((pos = content.indexOf(query, pos)) !== -1) {
    matches.push(content.substring(Math.max(0, pos - 150), Math.min(content.length, pos + 150)));
    pos += query.length;
    if (matches.length > 5) break;
  }
  return matches;
}

console.log("\nSearching for 'gp-face' in Chunk 1:");
console.log(findMatches(chunk1, 'gp-face'));

console.log("\nSearching for 'gp-face' in Chunk 2:");
console.log(findMatches(chunk2, 'gp-face'));

console.log("\nSearching for 'gp-panel' in Chunk 1:");
console.log(findMatches(chunk1, 'gp-panel'));

console.log("\nSearching for 'gp-panel' in Chunk 2:");
console.log(findMatches(chunk2, 'gp-panel'));

console.log("\nSearching for 'gp-carousel' in Chunk 1:");
console.log(findMatches(chunk1, 'gp-carousel'));

console.log("\nSearching for 'gp-carousel' in Chunk 2:");
console.log(findMatches(chunk2, 'gp-carousel'));
