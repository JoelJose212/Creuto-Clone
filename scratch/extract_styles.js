const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../index_extracted_styles.json');
const styles = JSON.parse(fs.readFileSync(stylesPath, 'utf8'));

const targets = ['15ypa2q', 'wb3r58', 'k1sxo', '1medwe2'];

targets.forEach(target => {
  console.log(`=== Matches for ${target} ===`);
  styles.forEach((block, idx) => {
    // Find all style rules
    const regex = new RegExp(`(\\.[^{]*${target}[^{]*\\{[^\\}]*\\})`, 'g');
    let match;
    while ((match = regex.exec(block)) !== null) {
      console.log(`Block ${idx}: ${match[1]}`);
    }
  });
});
