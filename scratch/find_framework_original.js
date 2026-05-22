const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('d:/clone/Clone/creuto.com/index.html', 'utf8');
const dom = new JSDOM(html);
const { document } = dom.window;

// Find elements with text containing "C Is for CREUTO" or similar
const headings = Array.from(document.querySelectorAll('h2, h3, div, p'));
const targetHeading = headings.find(h => h.textContent.includes("C Is for CREUTO") || h.textContent.includes("C Is How We Build"));

if (!targetHeading) {
  console.log("❌ Could not find heading with 'C Is for CREUTO'");
} else {
  console.log("✅ Found heading!");
  // Let's traverse up to find the parent section/container
  let container = targetHeading;
  while (container && container.tagName !== 'SECTION' && !container.classList.contains('MuiBox-root')) {
    container = container.parentElement;
  }
  
  if (container) {
    console.log("Container tag:", container.tagName);
    console.log("Container class:", container.className);
    console.log("Saving container HTML to scratch/framework_section_original.html...");
    fs.writeFileSync("scratch/framework_section_original.html", container.outerHTML);
    console.log("Saved!");
    
    // Check if there are other scripts or class names associated
    console.log("\nSnippet of framework section outerHTML:");
    console.log(container.outerHTML.substring(0, 1500));
  } else {
    console.log("Could not find suitable section/MuiBox-root parent container.");
  }
}
