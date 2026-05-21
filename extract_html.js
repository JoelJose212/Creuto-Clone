const fs = require('fs');

const inFile = process.argv[2];
const outHtml = process.argv[3];
const outJson = process.argv[4];

const content = fs.readFileSync(inFile, 'utf-8');

// Extract the main div with id __next or just the first child of body?
// In case-studies.html, it's <div class="MuiBox-root mui-1h4dmgi"> but wait, it's actually `<div class="MuiBox-root mui-1h4dmgi">...`
// Wait, looking at the html, there is `<!--/$--><div class="MuiBox-root mui-1h4dmgi">` ... `<script src="_next/static/chunks/webpack...` at the end.
// Let's just find the first `<div` after `<body>` or `<!--/$-->`.
const divStart = content.indexOf('<div');
// find the last </div> before the first <script at the end
const scriptStart = content.lastIndexOf('<script src="_next/static/chunks/webpack');
let endDiv = content.lastIndexOf('</div>', scriptStart !== -1 ? scriptStart : content.length);
if (endDiv !== -1) { endDiv += 6; } else { endDiv = content.length; }

const bodyHtml = content.substring(divStart, endDiv);

// Extract styles
const styles = [];
const styleRegex = /<style data-emotion="[^"]+">([^<]+)<\/style>/g;
let match;
while ((match = styleRegex.exec(content)) !== null) {
  styles.push(match[1]);
}

fs.writeFileSync(outHtml, bodyHtml, 'utf-8');
fs.writeFileSync(outJson, JSON.stringify(styles, null, 2), 'utf-8');
console.log(`Extracted HTML to ${outHtml}`);
console.log(`Extracted ${styles.length} styles to ${outJson}`);
