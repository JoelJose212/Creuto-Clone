const fs = require('fs');
const path = require('path');

const compPath = path.join('d:', 'TTT', 'src', 'app', '[slug]', 'data', 'HowCreutoHelpBusinessesScaleSmartly.tsx');
if (fs.existsSync(compPath)) {
  const content = fs.readFileSync(compPath, 'utf8');
  console.log('File size:', content.length);
  const exists = content.includes('mui-3qe8o5');
  console.log('Includes mui-3qe8o5:', exists);
  if (exists) {
    const idx = content.indexOf('mui-3qe8o5');
    console.log('Snippet:', content.substring(idx - 100, idx + 200));
  }
} else {
  console.log('Component not found');
}
