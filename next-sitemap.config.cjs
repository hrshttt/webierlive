/** @type {import('next-sitemap').IConfig} */
const fs = require('fs');
const path = require('path');

// Extract blog slugs and dates directly from TS file
const getBlogData = () => {
  const blogs = [];
  try {
    const filePath = path.join(__dirname, 'src', 'data', 'blogPosts.ts');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Extract slug and date pairs
    const blockRegex = /slug:\s*["']([^"']+)["'][\s\S]*?date:\s*["']([^"']+)["']/g;
    let match;
    while ((match = blockRegex.exec(fileContent)) !== null) {
      const slug = match[1];
      const dateStr = match[2];
      let isoDate;
      try {
        const d = new Date(dateStr);
        isoDate = !isNaN(d.getTime()) ? d.toISOString() : new Date().toISOString();
      } catch {
        isoDate = new Date().toISOString();
      }
      blogs.push({ slug, date: isoDate });
    }
  } catch (error) {
    console.error("Failed to extract blog data for sitemap:", error);
  }
  return blogs;
};

module.exports = {
  siteUrl: 'https://webierstudio.com',
  generateRobotsTxt: false,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  autoLastmod: false, // We set lastmod manually per page
  exclude: ['/api/*', '/admin/*', '/feed.xml', '/rss.xml'],
  trailingSlash: false,

  // Transform each auto-discovered path with proper priority & lastmod
  transform: async (config, url) => {
    const blogData = getBlogData();

    // Homepage
    if (url === '/') {
      return {
        loc: url,
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    // Blog listing page
    if (url === '/blog') {
      return {
        loc: url,
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }

    // Individual blog posts — use actual publish date as lastmod
    if (url.startsWith('/blog/')) {
      const slug = url.replace('/blog/', '');
      const blog = blogData.find(b => b.slug === slug);
      return {
        loc: url,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: blog ? blog.date : new Date().toISOString(),
      };
    }

    // Default for any other pages
    return {
      loc: url,
      changefreq: 'monthly',
      priority: 0.5,
      lastmod: new Date().toISOString(),
    };
  },
};
