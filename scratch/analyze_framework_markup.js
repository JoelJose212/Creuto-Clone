const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('scratch/framework_section_original.html', 'utf8');
const dom = new JSDOM(html);
const { document } = dom.window;

console.log("Analyzing original framework section markup...");

// Find the main classes and wrappers
const root = document.querySelector('.mui-13ijn4y');
console.log("Root element tag:", root ? root.tagName : "NONE");

const sliderContainer = document.querySelector('.mui-w1q9pb');
console.log("Slider container:", sliderContainer ? "FOUND" : "NOT FOUND");

// Let's find children of the sliderContainer
if (sliderContainer) {
  const children = Array.from(sliderContainer.children);
  console.log("Slider container children count:", children.length);
  children.forEach((child, i) => {
    console.log(`Child ${i}: tag=${child.tagName}, className=${child.className}`);
  });
}

// Let's check the items (Craftsmanship, Creativity, Clarity, etc.)
// Wait, the HTML shows "Craftsmanship", "Consistency", etc.
const craftsmanship = Array.from(document.querySelectorAll('*')).filter(el => el.textContent === 'Craftsmanship');
console.log("Craftsmanship occurrences:", craftsmanship.length);
if (craftsmanship.length > 0) {
  console.log("Craftsmanship parent structure:");
  let parent = craftsmanship[0].parentElement;
  console.log("Parent:", parent.tagName, parent.className);
  let grandParent = parent.parentElement;
  console.log("Grandparent:", grandParent.tagName, grandParent.className);
}

// Let's write the simplified clean structure of the slider/circle element
const circularContainer = document.querySelector('.mui-1goid3c');
if (circularContainer) {
  console.log("\nFound circular container (.mui-1goid3c)!");
  console.log("Children of .mui-1goid3c:");
  Array.from(circularContainer.children).forEach((child, i) => {
    console.log(`- Child ${i}: tag=${child.tagName}, className=${child.className}`);
  });
  
  // Write the outer HTML of the circularContainer to a separate file for close review
  fs.writeFileSync("scratch/circular_container.html", circularContainer.outerHTML);
  console.log("Saved circular container HTML to scratch/circular_container.html");
} else {
  console.log("❌ Could not find circular container .mui-1goid3c");
}
