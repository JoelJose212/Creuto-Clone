const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../index_extracted_body.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Find the section that has "C Is for CREUTO"
const startIndex = htmlContent.indexOf('C Is for CREUTO');
if (startIndex !== -1) {
  // Grab a large chunk of HTML starting from 1000 characters before that text to 20000 characters after
  const start = Math.max(0, startIndex - 1000);
  const end = Math.min(htmlContent.length, startIndex + 25000);
  console.log(htmlContent.substring(start, end));
} else {
  console.log('Not found');
}
