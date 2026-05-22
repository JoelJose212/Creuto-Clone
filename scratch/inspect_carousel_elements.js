const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('scratch/homepage_fetched.html', 'utf8');
const dom = new JSDOM(html);
const { document } = dom.window;

const wrapper = document.querySelector('.gp-wrapper');
if (!wrapper) {
  console.log("❌ Could not find .gp-wrapper");
} else {
  console.log("✅ Found .gp-wrapper");
  const scene = wrapper.querySelector('.gp-scene');
  if (!scene) {
    console.log("❌ Could not find .gp-scene");
  } else {
    console.log("✅ Found .gp-scene");
    const occluder = scene.querySelector('.gp-occluder');
    console.log(occluder ? "✅ Found .gp-occluder" : "❌ Could not find .gp-occluder");
    
    const carousel = scene.querySelector('.gp-carousel');
    if (!carousel) {
      console.log("❌ Could not find .gp-carousel");
    } else {
      console.log("✅ Found .gp-carousel");
      const panels = carousel.querySelectorAll('.gp-panel');
      console.log(`Number of .gp-panel elements: ${panels.length}`);
      if (panels.length > 0) {
        console.log("First panel structure:", panels[0].outerHTML);
      }
    }
  }
}
