const fs = require('fs');
const path = require('path');
const { htmlToJsx, unlayerCSS } = require('./convert_page');

const cloneDir = path.join('D:', 'clone', 'Clone', 'moolsap.com');

const configs = [
  {
    name: 'case-studies',
    sourceDir: path.join(cloneDir, 'case-studies'),
    targetDir: path.join('src', 'app', 'case-studies', '[slug]', 'data'),
    pageFilePath: path.join('src', 'app', 'case-studies', '[slug]', 'page.tsx'),
    preprocess: (html) => {
      let res = html;
      res = res.replace(/(["'\s])\.\.\/(img|icons|favicon)\//g, "$1/$2/");
      res = res.replace(/(["'\s])\.\.\/_next\//g, "$1/cloned_next/");
      res = res.replace(/(["'\s])(favicon652a\.ico)/g, "$1/$2");
      res = res.replace(/href="\.\.\/ai\.html"/g, 'href="/ai"');
      res = res.replace(/href="\.\.\/about\.html"/g, 'href="/about"');
      res = res.replace(/href="\.\.\/services\.html"/g, 'href="/services"');
      res = res.replace(/href="\.\.\/case-studies\.html"/g, 'href="/case-studies"');
      res = res.replace(/href="\.\.\/contact\.html"/g, 'href="/contact"');
      res = res.replace(/href="\.\.\/careers\.html"/g, 'href="/careers"');
      res = res.replace(/href="\.\.\/blog\.html"/g, 'href="/blogs"');
      res = res.replace(/href="\.\.\/index\.html"/g, 'href="/"');
      res = res.replace(/href="\.\.\/case-studies\/([^"]+)\.html"/g, 'href="/case-studies/$1"');
      res = res.replace(/href="\.\.\/case-studies\/([^"]+)"/g, 'href="/case-studies/$1"');
      res = res.replace(/href="\.\.\/services\/custom-software-development\.html"/g, 'href="/services"');
      res = res.replace(/href="\.\.\/services\/mobile-apps-development\.html"/g, 'href="/services"');
      res = res.replace(/href="\.\.\/services\/web-app-development\.html"/g, 'href="/services"');
      res = res.replace(/href="\.\.\/services\/ai-engineering-services\.html"/g, 'href="/services"');
      res = res.replace(/href="\.\.\/services\/devops-cloud-engineering\.html"/g, 'href="/services"');
      res = res.replace(/href="\.\.\/services\/mvp-development\.html"/g, 'href="/services"');
      return res;
    }
  },
  {
    name: 'blogs',
    sourceDir: cloneDir, // blogs are in the root directory
    targetDir: path.join('src', 'app', 'blogs', '[slug]', 'data'),
    pageFilePath: path.join('src', 'app', 'blogs', '[slug]', 'page.tsx'),
    preprocess: (html) => {
      let res = html;
      res = res.replace(/(["'\s])(img|icons|favicon)\//g, "$1/$2/");
      res = res.replace(/(["'\s])_next\//g, "$1/cloned_next/");
      res = res.replace(/(["'\s])(favicon652a\.ico)/g, "$1/$2");
      res = res.replace(/href="ai\.html"/g, 'href="/ai"');
      res = res.replace(/href="about\.html"/g, 'href="/about"');
      res = res.replace(/href="services\.html"/g, 'href="/services"');
      res = res.replace(/href="case-studies\.html"/g, 'href="/case-studies"');
      res = res.replace(/href="contact\.html"/g, 'href="/contact"');
      res = res.replace(/href="careers\.html"/g, 'href="/careers"');
      res = res.replace(/href="portfolio\.html"/g, 'href="/portfolio"');
      res = res.replace(/href="blog\.html"/g, 'href="/blogs"');
      res = res.replace(/href="index\.html"/g, 'href="/"');
      res = res.replace(/href="(how-smes-can-leverage-ai|your-customers-are-on-mobile|why-every-business-owner-should-invest-in-custom-software|how-moolsap-help-businesses-scale-smartly|the-beginning-of-something-real)\.html"/g, 'href="/blogs/$1"');
      return res;
    },
    // filter to only blog files
    filter: (file) => [
      'how-smes-can-leverage-ai.html',
      'your-customers-are-on-mobile.html',
      'why-every-business-owner-should-invest-in-custom-software.html',
      'how-moolsap-help-businesses-scale-smartly.html',
      'the-beginning-of-something-real.html'
    ].includes(file)
  },
  {
    name: 'careers',
    sourceDir: path.join(cloneDir, 'careers'),
    targetDir: path.join('src', 'app', 'careers', '[slug]', 'data'),
    pageFilePath: path.join('src', 'app', 'careers', '[slug]', 'page.tsx'),
    preprocess: (html) => {
      let res = html;
      res = res.replace(/(["'\s])\.\.\/(img|icons|favicon)\//g, "$1/$2/");
      res = res.replace(/(["'\s])\.\.\/_next\//g, "$1/cloned_next/");
      res = res.replace(/(["'\s])(favicon652a\.ico)/g, "$1/$2");
      res = res.replace(/href="\.\.\/ai\.html"/g, 'href="/ai"');
      res = res.replace(/href="\.\.\/about\.html"/g, 'href="/about"');
      res = res.replace(/href="\.\.\/services\.html"/g, 'href="/services"');
      res = res.replace(/href="\.\.\/case-studies\.html"/g, 'href="/case-studies"');
      res = res.replace(/href="\.\.\/contact\.html"/g, 'href="/contact"');
      res = res.replace(/href="\.\.\/careers\.html"/g, 'href="/careers"');
      res = res.replace(/href="\.\.\/blog\.html"/g, 'href="/blogs"');
      res = res.replace(/href="\.\.\/index\.html"/g, 'href="/"');
      return res;
    },
    filter: (file) => !file.startsWith('apply') // filter out apply HTML files
  }
];

function generateComponent(config) {
  if (!fs.existsSync(config.targetDir)) {
    fs.mkdirSync(config.targetDir, { recursive: true });
  }

  const files = fs.readdirSync(config.sourceDir).filter(f => f.endsWith('.html'));
  
  const componentNames = [];

  for (const file of files) {
    if (config.filter && !config.filter(file)) continue;

    const slug = file.replace('.html', '');
    const componentName = slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
    
    componentNames.push({ slug, componentName });

    const htmlContent = fs.readFileSync(path.join(config.sourceDir, file), 'utf8');

    // 1. Extract Links
    const linkRegex = /<link[^>]*?rel="stylesheet"[^>]*?>/g;
    let m;
    const links = [];
    while ((m = linkRegex.exec(htmlContent)) !== null) {
      const hrefMatch = /href="([^"]+)"/.exec(m[0]);
      if (hrefMatch) {
        let href = hrefMatch[1];
        href = href.replace(/\.\.\/_next\//g, "cloned_next/").replace(/_next\//g, "cloned_next/");
        if (!href.startsWith('/')) href = '/' + href;
        links.push(href);
      }
    }

    // 2. Extract Styles
    const styleRegex = /<style[^>]*?>([\s\S]*?)<\/style>/g;
    const inlineStyles = [];
    while ((m = styleRegex.exec(htmlContent)) !== null) {
      const unlayered = unlayerCSS(m[1]);
      inlineStyles.push(unlayered.replace(/\`/g, '\\`').replace(/\\/g, '\\\\'));
    }

    // 3. Extract Body
    const bodyRegex = /<body[^>]*?>([\s\S]*?)<\/body>/i;
    const bodyMatch = bodyRegex.exec(htmlContent);
    let bodyHtml = bodyMatch ? bodyMatch[1] : "";

    // 4. Preprocess Body
    bodyHtml = config.preprocess(bodyHtml);

    // 5. htmlToJsx
    let jsx = htmlToJsx(bodyHtml);

    // 6. Generate TSX file content
    const tsxContent = `import React from 'react';

export default function ${componentName}() {
  return (
    <>
      {/* Stylesheets */}
      ${links.map(href => `<link rel="stylesheet" href="${href}" />`).join('\n      ')}

      {/* Inline Styles */}
      ${inlineStyles.map(css => `<style dangerouslySetInnerHTML={{ __html: \`${css}\` }} />`).join('\n      ')}

      {/* Body */}
      ${jsx}
    </>
  );
}
`;
    fs.writeFileSync(path.join(config.targetDir, `${componentName}.tsx`), tsxContent);
    console.log(`Generated ${componentName}.tsx for ${config.name}`);
  }

  // Generate registry
  const registryContent = `import React from 'react';

export const ${config.name}Components: Record<string, () => Promise<{ default: React.ComponentType<any> }>> = {
${componentNames.map(c => `  '${c.slug}': () => import('./${c.componentName}'),`).join('\n')}
};
`;

  fs.writeFileSync(path.join(config.targetDir, 'index.ts'), registryContent);
  console.log(`Generated registry for ${config.name}`);
}

configs.forEach(generateComponent);
