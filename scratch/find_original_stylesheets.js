const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('d:/clone/Clone/creuto.com/index.html', 'utf8');
const dom = new JSDOM(html);
const { document } = dom.window;

const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.outerHTML);
console.log("Original index.html linked stylesheets:");
console.log(links);
