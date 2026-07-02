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

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
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
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: "https://webierstudio.com/og-image.png",
          width: 500,
          height: 500,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Webier Studio`,
      description: post.excerpt,
      images: ["https://webierstudio.com/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
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

  // Article Schema JSON-LD for rich results
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Webier Studio",
      url: "https://webierstudio.com",
      logo: {
        "@type": "ImageObject",
        url: "https://webierstudio.com/webierLogo.webp",
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://webierstudio.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    url: `https://webierstudio.com/blog/${post.slug}`,
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
