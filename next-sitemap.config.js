/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://aanandi.in',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/dashboard', '/dashboard/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard'],
      },
    ],
  },
}
