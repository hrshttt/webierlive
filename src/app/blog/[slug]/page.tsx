import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "../../../data/blogPosts";
import BlogPostClient from "./BlogPostClient";

// ---------------------------------------------------------------------------
// STATIC PARAMS — Pre-generate all blog post pages at build time
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Helper: Parse human-readable date to ISO 8601 for Google & OpenGraph
const parseDate = (dateStr: string): string => {
  try {
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) return parsed.toISOString();
  } catch {}
  return new Date().toISOString();
};

// ---------------------------------------------------------------------------
// DYNAMIC METADATA — Unique SEO metadata for each blog post
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The article you are looking for does not exist.",
    };
  }

  const publishedIso = parseDate(post.date);

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [
      ...post.tags,
      post.category,
      "Webier Studio",
      "web development insights",
      "technical SEO agency",
      "Next.js best practices",
      "UI UX design guide",
    ],
    authors: [{ name: post.author.name, url: "https://webierstudio.com" }],
    creator: post.author.name,
    publisher: "Webier Studio",
    alternates: {
      canonical: `https://webierstudio.com/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Webier Studio`,
      description: post.excerpt,
      url: `https://webierstudio.com/blog/${post.slug}`,
      siteName: "Webier Studio",
      type: "article",
      locale: "en_US",
      publishedTime: publishedIso,
      modifiedTime: publishedIso,
      authors: [post.author.name],
      section: post.category,
      tags: post.tags,
      images: [
        {
          url: "https://webierstudio.com/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@webierstudio",
      creator: "@webierstudio",
      title: `${post.title} | Webier Studio`,
      description: post.excerpt,
      images: ["https://webierstudio.com/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// ---------------------------------------------------------------------------
// PAGE COMPONENT (Server Component)
// ---------------------------------------------------------------------------
export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Helper: Extract plain text from content blocks for wordCount & articleBody
  const plainText = post.content
    .map((block) => {
      if ("text" in block) return block.text;
      if ("items" in block) return block.items.join(" ");
      if ("code" in block) return block.code;
      return "";
    })
    .join(" ");

  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const articleBodyExcerpt = plainText.slice(0, 5000);
  const minutes = Math.max(1, parseInt(post.readTime) || 5);

  // High-Performance BlogPosting Schema for Google Rich Snippets & AI LLMs
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://webierstudio.com/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    image: [
      "https://webierstudio.com/og-image.png"
    ],
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      url: "https://webierstudio.com",
      worksFor: {
        "@type": "Organization",
        name: "Webier Studio",
        url: "https://webierstudio.com"
      }
    },
    publisher: {
      "@type": "Organization",
      name: "Webier Studio",
      url: "https://webierstudio.com",
      logo: {
        "@type": "ImageObject",
        url: "https://webierstudio.com/webierLogo.webp"
      }
    },
    datePublished: parseDate(post.date),
    dateModified: parseDate(post.date),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://webierstudio.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    url: `https://webierstudio.com/blog/${post.slug}`,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    wordCount: wordCount,
    timeRequired: `PT${minutes}M`,
    articleBody: articleBodyExcerpt,
    about: post.tags.map((tag) => ({
      "@type": "Thing",
      name: tag,
    })),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".post-title", ".post-body-content p"],
    },
    copyrightYear: 2026,
    copyrightHolder: {
      "@type": "Organization",
      name: "Webier Studio"
    }
  };

  // BreadcrumbList Schema for navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://webierstudio.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://webierstudio.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://webierstudio.com/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      {/* Structured Data for this blog post */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <BlogPostClient slug={params.slug} />
    </>
  );
}
