const jsdom = require('jsdom');
const { JSDOM } = jsdom;

async function run() {
  console.log("Starting simplified JSDOM Console Inspector...");
  
  const virtualConsole = new jsdom.VirtualConsole();
  
  virtualConsole.on("log", (message) => {
    console.log("[CONSOLE LOG]:", message);
  });
  virtualConsole.on("info", (message) => {
    console.log("[CONSOLE INFO]:", message);
  });
  virtualConsole.on("warn", (message) => {
    console.log("[CONSOLE WARN]:", message);
  });
  virtualConsole.on("error", (message) => {
    console.error("[CONSOLE ERROR]:", message);
  });
  
  virtualConsole.on("jsdomError", (error) => {
    console.error("[JSDOM ERROR]:", error.stack || error.message);
  });

  try {
    const dom = await JSDOM.fromURL("http://localhost:3000/", {
      runScripts: "dangerously",
      resources: "usable",
      virtualConsole,
      pretendToBeVisual: true
    });

    console.log("Page loaded. Waiting 4 seconds for scripts to execute...");
    await new Promise(resolve => setTimeout(resolve, 4000));
    console.log("Finished waiting.");
    dom.window.close();
  } catch (err) {
    console.error("❌ JSDOM loading failed:", err);
  }
}

run();
