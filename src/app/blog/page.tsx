import { Suspense } from "react";
import type { Metadata } from "next";
import BlogListClient from "./BlogListClient";
import { blogPosts } from "../../data/blogPosts";

// ---------------------------------------------------------------------------
// SEO METADATA — Blog Listing Page
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: "Blog | Web Design, SEO & Development Insights",
  description:
    "Expert guides on web development, SEO strategies, UI/UX design, AI chatbot integration, and digital marketing. Actionable insights from Webier Studio to help your business grow online.",
  keywords: [
    "web development blog",
    "SEO tips for small business",
    "Next.js tutorials",
    "UI UX design best practices",
    "AI chatbot integration guide",
    "web design trends 2026",
    "website speed optimization",
    "conversion rate optimization tips",
    "digital marketing blog",
    "React development tutorials",
    "local SEO guide",
    "e-commerce website tips",
    "website maintenance best practices",
    "custom website vs website builder",
    "mobile first design",
    "website redesign guide",
    "website accessibility WCAG",
    "branding for small business",
    "GSAP micro animations Next.js",
    "Core Web Vitals INP optimization",
    "Next.js App Router caching guide",
    "luxury hospitality web design",
    "Next.js security headers CSP",
    "Google schema markup JSON-LD",
    "dark mode UI design best practices",
    "AI chatbots for lead generation",
  ],
  alternates: {
    canonical: "https://webierstudio.com/blog",
  },
  openGraph: {
    title: "Blog & Insights | Webier Studio",
    description:
      "Deep dives and expert guides on Next.js development, technical SEO, AI integrations, and conversion-focused UI/UX design.",
    url: "https://webierstudio.com/blog",
    siteName: "Webier Studio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://webierstudio.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Webier Studio Blog — Web Development & SEO Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Insights | Webier Studio",
    description:
      "Expert guides on web development, SEO, UI/UX design, and AI systems from Webier Studio.",
    images: ["https://webierstudio.com/og-image.png"],
  },
};

// ---------------------------------------------------------------------------
// CollectionPage JSON-LD — tells Google and AI bots about all articles
// ---------------------------------------------------------------------------
const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://webierstudio.com/blog#collection",
  name: "Webier Studio Blog — Web Design, SEO & AI Insights",
  description:
    "Expert articles on web development, SEO, UI/UX design, website performance, Next.js, and digital strategy for businesses.",
  url: "https://webierstudio.com/blog",
  isPartOf: {
    "@type": "WebSite",
    "@id": "https://webierstudio.com/#website",
    name: "Webier Studio",
  },
  publisher: {
    "@type": "Organization",
    "@id": "https://webierstudio.com/#organization",
    name: "Webier Studio",
    logo: "https://webierstudio.com/webierLogo.webp",
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: blogPosts.length,
    itemListElement: blogPosts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://webierstudio.com/blog/${post.slug}`,
      name: post.title,
      description: post.excerpt,
    })),
  },
};

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
  ],
};

// ---------------------------------------------------------------------------
// PAGE COMPONENT (Server Component — renders client UI)
// ---------------------------------------------------------------------------
export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Suspense fallback={<div className="min-h-screen bg-[#f6f6fa]" />}>
        <BlogListClient />
      </Suspense>
    </>
  );
}
