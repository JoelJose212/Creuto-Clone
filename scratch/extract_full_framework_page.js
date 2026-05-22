const fs = require('fs');
const content = fs.readFileSync('d:/TTT/src/app/page.tsx', 'utf8');

const startStr = '<section className="MuiBox-root mui-9ou6f4">';
const startIndex = content.indexOf(startStr);
if (startIndex === -1) {
  console.log("❌ Could not find section mui-9ou6f4");
} else {
  // Let's find where the section ends by matching braces/tags or by looking for the next section
  // Let's find the next <section or something
  const nextSectionIndex = content.indexOf('<section className="MuiBox-root mui-14avacf">', startIndex + 10);
  if (nextSectionIndex === -1) {
    console.log("Could not find next section, saving till the end of file (truncated to 50k chars)");
    fs.writeFileSync("scratch/framework_section_ttt.html", content.substring(startIndex, startIndex + 50000));
  } else {
    fs.writeFileSync("scratch/framework_section_ttt.html", content.substring(startIndex, nextSectionIndex));
    console.log("Saved exact section to scratch/framework_section_ttt.html");
  }
}
