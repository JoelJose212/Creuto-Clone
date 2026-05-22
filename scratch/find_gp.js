const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

function extract() {
  console.log("Reading original index.html...");
  const html = fs.readFileSync("d:/clone/Clone/creuto.com/index.html", "utf8");
  const dom = new JSDOM(html);
  const { document } = dom.window;

  const carousel = document.querySelector(".gp-carousel");
  if (!carousel) {
    console.error("❌ Could not find .gp-carousel in original index.html");
    return;
  }

  console.log("✅ Found .gp-carousel in original index.html");
  console.log("Carousel HTML structure snippet:");
  console.log(carousel.outerHTML.substring(0, 2000));
  
  // Let's also check if there is an inline script or external JS file associated with gp-carousel
  const scripts = Array.from(document.querySelectorAll("script")).map(s => ({
    src: s.getAttribute("src"),
    content: s.textContent ? s.textContent.substring(0, 200) : ""
  }));
  
  console.log("\nAll script tags in original index.html:");
  console.log(JSON.stringify(scripts, null, 2));

  // Write full carousel structure to a text file for complete analysis
  fs.writeFileSync("scratch/original_carousel.html", carousel.outerHTML);
  console.log("\nSaved full carousel HTML to scratch/original_carousel.html");
}

extract();
