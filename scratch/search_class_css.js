const fs = require('fs');
const path = require('path');

const chunksDir = path.join('d:', 'TTT', 'public', 'cloned_next', 'static', 'chunks');
if (fs.existsSync(chunksDir)) {
  const files = fs.readdirSync(chunksDir);
  console.log('Searching in chunks dir:', chunksDir);
  files.forEach(file => {
    if (file.endsWith('.css')) {
      const cssPath = path.join(chunksDir, file);
      const content = fs.readFileSync(cssPath, 'utf8');
      if (content.includes('mui-3qe8o5')) {
        console.log(`Found mui-3qe8o5 in file: ${file}`);
        // print a small snippet around the class name
        const idx = content.indexOf('mui-3qe8o5');
        console.log('Snippet:', content.substring(Math.max(0, idx - 100), Math.min(content.length, idx + 200)));
      }
    }
  });
} else {
  console.log('chunks dir not found');
}
