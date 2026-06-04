const fs = require('fs');

const inJsx = process.argv[2];
const inOriginalPage = process.argv[3];
const outPage = process.argv[4];
const cssName = process.argv[5]; // e.g. servicesPageStyles.css
const containerId = process.argv[6]; // e.g. moolsap-services-cloned-page

let original = fs.readFileSync(inOriginalPage, 'utf8');
let jsx = fs.readFileSync(inJsx, 'utf8');

// Extract metadata block
let metadataMatch = original.match(/export const metadata: Metadata = \{[\s\S]*?\n\}/);
let metadata = metadataMatch ? metadataMatch[0] : '';

// In the original page, there are chunks CSS loaded:
let stylesMatch = original.match(/cache\.styles\.map[\s\S]*?<link key=\{index\} rel="stylesheet" href=\{absoluteHref\} \/>\n\s*\}\)/);
let chunkStyles = `
        <link rel="stylesheet" href="/cloned_next/static/chunks/11e_lg_sg.5lk.css" />
        <link rel="stylesheet" href="/cloned_next/static/chunks/15cdx8da0wltn.css" />
`;
// We will just hardcode the chunk styles for now or let them be omitted if they are bundled in css.
// Actually, earlier the script extracted CSS chunks? No, we extracted `styles` array from JSON.
// Let's read the JSON to get the link tags.
let jsonPath = inOriginalPage.replace('src\\app\\', '').replace('src/app/', '').replace('/page.tsx', '').replace('\\page.tsx', '');
// The JSON is in root.
let jsonName = inJsx.replace('_jsx.txt', '_extracted_styles.json');
let chunkLinks = '';
if (fs.existsSync(jsonName)) {
  let json = JSON.parse(fs.readFileSync(jsonName, 'utf8'));
  if (json.styles && Array.isArray(json.styles)) {
    chunkLinks = json.styles.map(s => {
      let href = s.replace(/_next\//g, 'cloned_next/');
      href = href.startsWith('/') ? href : '/' + href;
      return `        <link rel="stylesheet" href="${href}" />`;
    }).join('\n');
  }
}

const componentName = cssName.replace('PageStyles.css', 'Page');
const componentNameUpper = componentName.charAt(0).toUpperCase() + componentName.slice(1);

const template = `import { Metadata } from "next"
import "./${cssName}"

${metadata}

export default function ${componentNameUpper}() {
  return (
    <>
${chunkLinks}
      <style dangerouslySetInnerHTML={{ __html: \`
        #${containerId},
        #${containerId} h1,
        #${containerId} h2,
        #${containerId} h3,
        #${containerId} h4,
        #${containerId} h5,
        #${containerId} h6,
        #${containerId} p,
        #${containerId} span,
        #${containerId} li,
        #${containerId} a,
        #${containerId} button,
        #${containerId} label,
        #${containerId} div,
        #${containerId} .MuiTypography-root {
          font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
        }
      \`}} />
      <div id="${containerId}">
        ${jsx}
      </div>
    </>
  )
}
`;

fs.writeFileSync(outPage, template);
console.log(`Successfully generated ${outPage}`);
