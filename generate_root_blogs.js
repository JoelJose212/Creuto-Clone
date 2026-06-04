const fs = require('fs');
const path = require('path');
const { htmlToJsx, unlayerCSS } = require('./convert_page');
const { JSDOM } = require('jsdom');

const cloneDir = path.join('D:', 'clone', 'Clone', 'moolsap.com');
const targetDir = path.join('src', 'app', '[slug]', 'data');
const pageFilePath = path.join('src', 'app', '[slug]', 'page.tsx');

const allBlogs = [
  'how-smes-can-leverage-ai.html',
  'how-moolsap-help-businesses-scale-smartly.html',
  'why-every-business-owner-should-invest-in-custom-software.html',
  'the-beginning-of-something-real.html',
  'your-customers-are-on-mobile.html',
  'custom-crm.html',
  'software-partner.html',
  'custom-software-development.html',
  'customsoftware-roi.html',
  'startup.html'
];

function cleanHtmlWithJsdom(bodyHtml) {
  const dom = new JSDOM(bodyHtml);
  const doc = dom.window.document;

  // 1. Remove duplicate footer and whatsapp widget
  const selectorsToRemove = [
    '.mui-a524gp',  // Cloned Footer
    '.mui-160f6iq'  // WhatsApp widget
  ];
  
  selectorsToRemove.forEach(sel => {
    doc.querySelectorAll(sel).forEach(el => {
      el.remove();
    });
  });

  // 2. Remove inline animated invisible states (reset opacity/transforms)
  doc.querySelectorAll('[style]').forEach(el => {
    const originalStyle = el.getAttribute('style') || '';
    if (originalStyle.includes('opacity') || originalStyle.includes('transform')) {
      if (el.style.opacity === '0' || originalStyle.includes('opacity:0') || originalStyle.includes('opacity: 0')) {
        el.style.opacity = '1';
      }
      if (el.style.transform && el.style.transform !== 'none') {
        el.style.transform = 'none';
      }
    }
  });

  return doc.body.innerHTML;
}



function preprocess(html) {
  let res = html;
  
  // Replace base paths for assets
  res = res.replace(/(["'\s])(img|icons|favicon)\//g, "$1/$2/");
  res = res.replace(/(["'\s])_next\//g, "$1/cloned_next/");
  res = res.replace(/(["'\s])(favicon652a\.ico)/g, "$1/$2");
  
  // Clean up static links
  res = res.replace(/href="ai\.html"/g, 'href="/ai"');
  res = res.replace(/href="about\.html"/g, 'href="/about"');
  res = res.replace(/href="services\.html"/g, 'href="/services"');
  res = res.replace(/href="case-studies\.html"/g, 'href="/case-studies"');
  res = res.replace(/href="contact\.html"/g, 'href="/contact"');
  res = res.replace(/href="careers\.html"/g, 'href="/careers"');
  res = res.replace(/href="portfolio\.html"/g, 'href="/portfolio"');
  res = res.replace(/href="blog\.html"/g, 'href="/blog"');
  res = res.replace(/href="index\.html"/g, 'href="/"');
  
  // Replace blog post links to go to root directly
  res = res.replace(/href="(how-smes-can-leverage-ai|your-customers-are-on-mobile|why-every-business-owner-should-invest-in-custom-software|how-moolsap-help-businesses-scale-smartly|the-beginning-of-something-real|custom-crm|software-partner|custom-software-development|customsoftware-roi|startup)\.html"/g, 'href="/$1"');

  // Correct image CDN paths (e.g. absolute online or local assets)
  // Correcting any "/https://" prefix to "https://"
  res = res.replace(/src="\/https:\/\/creutocdn\.s3\.ap-south-1\.amazonaws\.com\/([^"]+)"/g, 'src="https://creutocdn.s3.ap-south-1.amazonaws.com/$1"');
  res = res.replace(/src="\.\.\/creutocdn\.s3\.ap-south-1\.amazonaws\.com\/([^"]+)"/g, 'src="https://creutocdn.s3.ap-south-1.amazonaws.com/$1"');
  res = res.replace(/src="\/_next\/static\/chunks\/images\/([^"]+)"/g, 'src="https://creutocdn.s3.ap-south-1.amazonaws.com/$1"');
  
  // If we downloaded/copied images locally, they are in /image/ folder:
  // e.g. partner (1).png, the moolsap story.png, etc.
  res = res.replace(/src="https:\/\/creutocdn\.s3\.ap-south-1\.amazonaws\.com\/image\/1760342828095-partner%20\(1\)\.png"/g, 'src="/image/1760342828095-partner (1).png"');
  res = res.replace(/src="https:\/\/creutocdn\.s3\.ap-south-1\.amazonaws\.com\/image\/1760337632265-partner%20\(1\)\.png"/g, 'src="/image/1760337632265-partner (1).png"');
  res = res.replace(/src="https:\/\/creutocdn\.s3\.ap-south-1\.amazonaws\.com\/image\/1756718808568-partner%20\(1\)\.png"/g, 'src="/image/1756718808568-partner (1).png"');
  res = res.replace(/src="https:\/\/creutocdn\.s3\.ap-south-1\.amazonaws\.com\/image\/1756715048910-partner\.png"/g, 'src="/image/1756715048910-partner.png"');
  res = res.replace(/src="https:\/\/creutocdn\.s3\.ap-south-1\.amazonaws\.com\/image\/1756713571459-the%20moolsap%20story\.png"/g, 'src="/image/1756713571459-the moolsap story.png"');

  return res;
}

function generateAll() {
  console.log('Starting all blogs generation...');

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const componentNames = [];
  const metadataMap = {};

  for (const file of allBlogs) {
    const filePath = path.join(cloneDir, file);
    if (!fs.existsSync(filePath)) {
      console.error(`Missing cloned HTML file: ${filePath}`);
      continue;
    }

    const slug = file.replace('.html', '');
    const componentName = slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
    componentNames.push({ slug, componentName });

    const htmlContent = fs.readFileSync(filePath, 'utf8');

    // 1. Extract Title
    const titleMatch = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(htmlContent);
    const title = titleMatch ? titleMatch[1].trim() : `${slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')} | MoolSap Blog`;

    // 2. Extract Description
    let description = "Read the latest engineering articles, product strategy guides, and development insights from MoolSap.";
    const descMatch = /<meta[^>]*?name="description"[^>]*?content="([^"]*)"/i.exec(htmlContent) || 
                      /<meta[^>]*?content="([^"]*)"[^>]*?name="description"/i.exec(htmlContent);
    if (descMatch) {
      description = descMatch[1].trim();
    }
    
    metadataMap[slug] = { title, description };

    // 3. Extract stylesheet links
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

    // 4. Extract Inline Styles
    const styleRegex = /<style[^>]*?>([\s\S]*?)<\/style>/g;
    const inlineStyles = [];
    while ((m = styleRegex.exec(htmlContent)) !== null) {
      const unlayered = unlayerCSS(m[1]);
      inlineStyles.push(unlayered.replace(/\`/g, '\\`').replace(/\\/g, '\\\\'));
    }

    // 5. Extract Body
    const bodyRegex = /<body[^>]*?>([\s\S]*?)<\/body>/i;
    const bodyMatch = bodyRegex.exec(htmlContent);
    let bodyHtml = bodyMatch ? bodyMatch[1] : "";

    // 6. Preprocess Body
    bodyHtml = preprocess(bodyHtml);
    bodyHtml = cleanHtmlWithJsdom(bodyHtml);

    // 7. htmlToJsx
    let jsx = htmlToJsx(bodyHtml);
    // Correct absolute S3 CDN URLs that were prepended with a slash by htmlToJsx
    jsx = jsx.replace(/src="\/https:\/creutocdn\.s3\.ap-south-1\.amazonaws\.com\/([^"]+)"/g, 'src="https://creutocdn.s3.ap-south-1.amazonaws.com/$1"');
    jsx = jsx.replace(/src="\/https:\/\/creutocdn\.s3\.ap-south-1\.amazonaws\.com\/([^"]+)"/g, 'src="https://creutocdn.s3.ap-south-1.amazonaws.com/$1"');

    // 8. Generate Component TSX
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
    fs.writeFileSync(path.join(targetDir, `${componentName}.tsx`), tsxContent);
    console.log(`Generated ${componentName}.tsx`);
  }

  // Generate registry (data/index.ts)
  const registryContent = `import React from 'react';

export const blogsComponents: Record<string, () => Promise<{ default: React.ComponentType<any> }>> = {
${componentNames.map(c => `  '${c.slug}': () => import('./${c.componentName}'),`).join('\n')}
};
`;
  fs.writeFileSync(path.join(targetDir, 'index.ts'), registryContent);
  console.log(`Generated component registry (index.ts)`);

  // Generate dynamic routing page (src/app/[slug]/page.tsx)
  const dynamicPageContent = `import { Metadata } from "next"
import { notFound } from "next/navigation"
import { blogsComponents } from "./data"
import Footer from "@/components/layout/Footer"

const BLOG_METADATA_MAP: Record<string, { title: string; description: string }> = ${JSON.stringify(metadataMap, null, 2)};

export async function generateStaticParams() {
  return Object.keys(BLOG_METADATA_MAP).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const meta = BLOG_METADATA_MAP[slug];

  if (!meta) {
    return {
      title: "MoolSap Blog Post",
    }
  }

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: \`https://moolsap.com/\${slug}\`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: \`https://moolsap.com/\${slug}\`,
      siteName: "MoolSap",
      type: "article",
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  if (!BLOG_METADATA_MAP[slug]) {
    notFound()
  }

  const getComponent = (blogsComponents as any)[slug];

  if (!getComponent) {
    notFound();
  }

  const Component = (await getComponent()).default;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: \`
        #moolsap-blogpost-cloned-page {
          background-color: #ffffff;
        }
        #moolsap-blogpost-cloned-page,
        #moolsap-blogpost-cloned-page h1,
        #moolsap-blogpost-cloned-page h2,
        #moolsap-blogpost-cloned-page h3,
        #moolsap-blogpost-cloned-page h4,
        #moolsap-blogpost-cloned-page h5,
        #moolsap-blogpost-cloned-page h6,
        #moolsap-blogpost-cloned-page p,
        #moolsap-blogpost-cloned-page span,
        #moolsap-blogpost-cloned-page li,
        #moolsap-blogpost-cloned-page a,
        #moolsap-blogpost-cloned-page button,
        #moolsap-blogpost-cloned-page label,
        #moolsap-blogpost-cloned-page div,
        #moolsap-blogpost-cloned-page .MuiTypography-root {
          font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
        }
      \`}} />

      <div id="moolsap-blogpost-cloned-page">
        <Component />
      </div>
      <Footer />
    </>
  )
}
`;
  fs.writeFileSync(pageFilePath, dynamicPageContent);
  console.log(`Generated root page router (page.tsx)`);
  console.log('All blogs generation complete!');
}

generateAll();
