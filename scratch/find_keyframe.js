const fs = require('fs');
const css = fs.readFileSync('d:/TTT/public/cloned_next/static/chunks/0ghnlru.2-aun.css', 'utf8');

const keyframeIndex = css.indexOf('@keyframes gp-revolve');
if (keyframeIndex !== -1) {
  console.log("Full Keyframes definition:");
  console.log(css.substring(keyframeIndex, keyframeIndex + 300));
} else {
  console.log("Keyframes not found");
}
