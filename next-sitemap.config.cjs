/** @type {import('next-sitemap').IConfig} */
const fs = require('fs');
const path = require('path');

// Extract blog slugs directly from TS file to avoid require() ESM/TS issues in Node runtime
const getBlogSlugs = () => {
  const slugs = new Set();
  try {
    const filePath = path.join(__dirname, 'src', 'data', 'blogPosts.ts');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const slugRegex = /slug:\s*["']([^"']+)["']/g;
    let match;
    while ((match = slugRegex.exec(fileContent)) !== null) {
      slugs.add(match[1]);
    }
  } catch (error) {
    console.error("Failed to extract slugs for sitemap:", error);
  }
  return Array.from(slugs);
};

module.exports = {
  siteUrl: 'https://webierstudio.com',
  generateRobotsTxt: false, // we manage our own robots.txt
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  autoLastmod: true,
  exclude: ['/api/*', '/admin/*'],
  trailingSlash: false,
  additionalPaths: async (config) => {
    const paths = [];
    
    // Homepage
    paths.push({
      loc: '/',
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: new Date().toISOString(),
    });

    // Blog listing
    paths.push({
      loc: '/blog',
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    });

    // Individual blog posts
    const slugs = getBlogSlugs();
    slugs.forEach((slug) => {
      paths.push({
        loc: `/blog/${slug}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      });
    });

    return paths;
  },
}
