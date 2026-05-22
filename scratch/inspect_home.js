const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

async function inspect() {
  try {
    console.log("Fetching local home page...");
    const res = await fetch("http://localhost:3000/");
    const html = await res.text();
    console.log("HTML length:", html.length);
    
    // Save to temp file for manual analysis if needed
    fs.writeFileSync("scratch/homepage_fetched.html", html);
    console.log("Saved fetched HTML to scratch/homepage_fetched.html");

    const dom = new JSDOM(html, { runScripts: "outside-only" });
    const { document } = dom.window;

    // Check critical wrappers
    const rootPage = document.getElementById("creuto-home-cloned-page");
    if (!rootPage) {
      console.error("❌ ERROR: Could not find #creuto-home-cloned-page!");
    } else {
      console.log("✅ FOUND: #creuto-home-cloned-page");
      console.log("Class:", rootPage.className);
      console.log("Style attribute:", rootPage.getAttribute("style"));
      console.log("Hidden attribute:", rootPage.getAttribute("hidden"));
    }

    // Check first children
    const bodyChildren = Array.from(document.body.children).map(c => ({
      tag: c.tagName,
      id: c.id,
      className: c.className,
      style: c.getAttribute("style"),
      hidden: c.hasAttribute("hidden")
    }));
    console.log("Body immediate children:", JSON.stringify(bodyChildren, null, 2));

    // Check stylesheet links
    const stylesheets = Array.from(document.querySelectorAll("link[rel='stylesheet']")).map(l => l.getAttribute("href"));
    console.log("Stylesheets loaded:", stylesheets);

    // Check script tags
    const scripts = Array.from(document.querySelectorAll("script")).map(s => ({
      src: s.getAttribute("src"),
      inline: s.textContent ? s.textContent.substring(0, 100) + "..." : null
    }));
    console.log("Scripts loaded:", scripts);

  } catch (err) {
    console.error("❌ FAILED:", err);
  }
}

inspect();
