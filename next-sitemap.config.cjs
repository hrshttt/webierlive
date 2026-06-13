/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://webierstudio.com',
  generateRobotsTxt: false, // we manage our own robots.txt
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 1.0,
  autoLastmod: true,
  // Exclude API routes from sitemap
  exclude: ['/api/*', '/admin/*'],
  // Add trailing slash consistency
  trailingSlash: false,
}
