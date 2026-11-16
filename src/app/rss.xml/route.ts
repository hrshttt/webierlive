import { blogPosts } from "../../data/blogPosts";

export async function GET() {
  const siteUrl = "https://webierstudio.com";

  const escapeXml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  };

  const parseToRfc822 = (dateStr: string): string => {
    try {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) return d.toUTCString();
    } catch {}
    return new Date().toUTCString();
  };

  const rssItems = blogPosts
    .map((post) => {
      const pubDate = parseToRfc822(post.date);
      const title = escapeXml(post.title);
      const description = escapeXml(post.excerpt);
      const category = escapeXml(post.category);
      const author = escapeXml(post.author.name);
      const postUrl = `${siteUrl}/blog/${post.slug}`;

      return `    <item>
      <title>${title}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${category}</category>
      <dc:creator>${author}</dc:creator>
    </item>`;
    })
    .join("\n");

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Webier Studio Journal — Web Design, SEO &amp; AI Systems</title>
    <link>${siteUrl}/blog</link>
    <description>Actionable insights, technical guides, and architectural breakdowns on Next.js, Core Web Vitals, Technical SEO, and AI chatbots by Webier Studio.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>`;

  return new Response(xmlContent, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
