import type { Metadata } from "next";
import BlogListClient from "./BlogListClient";

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
        width: 500,
        height: 500,
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
// PAGE COMPONENT (Server Component — renders client UI)
// ---------------------------------------------------------------------------
export default function BlogPage() {
  return <BlogListClient />;
}
