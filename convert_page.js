const fs = require('fs');
const path = require('path');

function unlayerCSS(css) {
  if (!css) return '';
  let result = "";
  let i = 0;
  while (i < css.length) {
    if (css.substring(i, i + 12) === "@layer mui {") {
      i += 12;
      let braceCount = 1;
      let j = i;
      while (j < css.length && braceCount > 0) {
        if (css[j] === "{") braceCount++;
        else if (css[j] === "}") braceCount--;
        j++;
      }
      const layerContent = css.substring(i, j - 1);
      result += unlayerCSS(layerContent);
      i = j;
    } else if (css.substring(i, i + 11) === "@layer mui{") {
      i += 11;
      let braceCount = 1;
      let j = i;
      while (j < css.length && braceCount > 0) {
        if (css[j] === "{") braceCount++;
        else if (css[j] === "}") braceCount--;
        j++;
      }
      const layerContent = css.substring(i, j - 1);
      result += unlayerCSS(layerContent);
      i = j;
    } else {
      result += css[i];
      i++;
    }
  }
  return result.replace(/\\n/g, '\n').replace(/\\"/g, '"');
}

function htmlToJsx(html) {
  if (!html) return '';
  let jsx = html;

  // Strip script tags
  jsx = jsx.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Replace common attributes
  jsx = jsx.replace(/ class="/g, ' className="');
  jsx = jsx.replace(/ for="/g, ' htmlFor="');
  jsx = jsx.replace(/ tabindex="([^"]*)"/gi, (match, p1) => ' tabIndex={' + p1 + '}');
  jsx = jsx.replace(/crossorigin=/gi, 'crossOrigin=');
  jsx = jsx.replace(/hidden=""/gi, 'hidden');
  jsx = jsx.replace(/ whilehover="[^"]*"/gi, '');
  jsx = jsx.replace(/ whiletap="[^"]*"/gi, '');
  
  jsx = jsx.replace(/ style="([^"]*)"/g, (match, p1) => {
    let styleObj = {};
    p1.split(';').forEach(rule => {
      let parts = rule.split(':');
      if (parts.length >= 2) {
        let key = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        let val = parts.slice(1).join(':').trim();
        if (!isNaN(val) && val !== '') {
          styleObj[key] = Number(val);
        } else {
          styleObj[key] = val;
        }
      }
    });
    return ` style={${JSON.stringify(styleObj)} as any}`;
  });

  // SVG attributes
  const svgAttrs = [
    'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-dasharray', 'stroke-dashoffset',
    'view-box', 'fill-rule', 'clip-rule', 'clip-path', 'stroke-miterlimit'
  ];
  svgAttrs.forEach(attr => {
    const camel = attr.replace(/-([a-z])/g, g => g[1].toUpperCase());
    jsx = jsx.replace(new RegExp(` ${attr}="`, 'g'), ` ${camel}="`);
  });
  
  jsx = jsx.replace(/ viewBox="/gi, ' viewBox="');

  // Self closing tags
  const voidTags = ['img', 'br', 'hr', 'input', 'meta', 'link'];
  voidTags.forEach(tag => {
    const regex = new RegExp(`<${tag}([^>]*?)(?<!/)>`, 'gi');
    jsx = jsx.replace(regex, `<${tag}$1 />`);
  });

  // Link fixes
  jsx = jsx.replace(/ href="([^"]*)\.html"/g, ' href="/$1"');
  jsx = jsx.replace(/ href="([^"]*)index\.html"/g, ' href="/"');
  jsx = jsx.replace(/_next\//g, '/cloned_next/');
  jsx = jsx.replace(/src="(?!\/)([^"]+)"/g, 'src="/$1"');
  jsx = jsx.replace(/srcset="[^"]*"/g, '');
  jsx = jsx.replace(/ srcSet="[^"]*"/g, '');

  jsx = jsx.replace(/ rows="([^"]*)"/g, (match, p1) => ' rows={' + p1 + '}');
  jsx = jsx.replace(/ strokeWidth="([^"]*)"/g, (match, p1) => ' strokeWidth={' + p1 + '}');
  jsx = jsx.replace(/ readOnly(?:="[^"]*")?/g, ' readOnly');
  jsx = jsx.replace(/ disabled(?:="[^"]*")?/g, ' disabled');
  jsx = jsx.replace(/ required(?:="[^"]*")?/g, ' required');
  
  // Opacity/Translate fixes
  jsx = jsx.replace(/opacity:\s*0/g, 'opacity: 1');
  jsx = jsx.replace(/translateY\([^)]+\)/g, 'translateY(0)');
  jsx = jsx.replace(/transform:\s*matrix[^;]+;/g, '');

  // Strip Next.js comments
  jsx = jsx.replace(/<!--.*?-->/gs, '');
  jsx = jsx.replace(/<template data-dgst="[^"]*"><\/template>/g, '');

  return jsx;
}

function processPage(htmlFile, jsonFile, outJsxFile, outCssFile) {
  console.log(`Processing ${htmlFile}...`);
  if (fs.existsSync(htmlFile)) {
    let html = fs.readFileSync(htmlFile, 'utf8');
    let jsx = htmlToJsx(html);
    fs.writeFileSync(outJsxFile, jsx);
    console.log(`Wrote JSX to ${outJsxFile}`);
  } else {
    console.log(`HTML file not found: ${htmlFile}`);
  }

  if (fs.existsSync(jsonFile)) {
    let json = fs.readFileSync(jsonFile, 'utf8');
    try {
      let data = JSON.parse(json);
      let cssArray = [];
      if (Array.isArray(data)) {
        cssArray = data;
      } else if (data.inlineStyles && Array.isArray(data.inlineStyles)) {
        cssArray = data.inlineStyles;
      } else if (data.styles && Array.isArray(data.styles)) {
        cssArray = data.styles;
      } else {
        cssArray = [json];
      }
      
      let cssString = cssArray.join('\\n');
      
      // Strip <style> tags if present
      cssString = cssString.replace(/<style[^>]*>/gi, '').replace(/<\/style>/gi, '');
      
      let css = unlayerCSS(cssString);
      // Clean up url() paths
      css = css.replace(/url\(['"]?(?:[./]*)*img\/([^'"]+)['"]?\)/g, 'url(\'/img/$1\')');
      css = css.replace(/_next\//g, 'cloned_next/');
      fs.writeFileSync(outCssFile, css);
      console.log(`Wrote CSS to ${outCssFile}`);
    } catch (e) {
      console.error(`Error parsing JSON: ${e.message}`);
    }
  } else {
    console.log(`JSON file not found: ${jsonFile}`);
  }
}

// Ensure the script can be called from command line
const args = process.argv.slice(2);
if (args.length >= 4) {
  processPage(args[0], args[1], args[2], args[3]);
} else {
  console.log("Usage: node convert_page.js <in-html> <in-json> <out-jsx-txt> <out-css>");
}
module.exports = { processPage, htmlToJsx, unlayerCSS };
