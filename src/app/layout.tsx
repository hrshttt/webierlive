import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

// ---------------------------------------------------------------------------
// SEO METADATA — Webier Studio
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  // ── Core ──────────────────────────────────────────────────────────────────
  metadataBase: new URL("https://webierstudio.com"),
  title: {
    default: "Webier Studio | Web Design, SEO & AI Systems for US Businesses",
    template: "%s | Webier Studio",
  },
  description:
    "Webier Studio builds high-performance websites, SEO strategies, and AI-powered systems for businesses in the USA. We craft fast, conversion-focused digital experiences using React & Next.js. Get a free quote today.",
  keywords: [
    "web design agency USA",
    "web development company",
    "Next.js development agency",
    "SEO agency for small businesses",
    "AI chatbot integration",
    "hospitality web design",
    "short term rental website design",
    "React web development USA",
    "web design for restaurants",
    "affordable web design agency",
    "custom website development",
    "branding agency USA",
    "mobile app development",
    "UI UX design agency",
    "Webier Studio",
  ],
  authors: [{ name: "Webier Studio", url: "https://webierstudio.com" }],
  creator: "Webier Studio",
  publisher: "Webier Studio",

  // ── Canonical ─────────────────────────────────────────────────────────────
  alternates: {
    canonical: "https://webierstudio.com",
  },

  // ── Robots ────────────────────────────────────────────────────────────────
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

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://webierstudio.com",
    siteName: "Webier Studio",
    title: "Webier Studio — Web Design, SEO & AI Systems for US Businesses",
    description:
      "We build high-performance websites, SEO strategies, and AI-powered systems that help US businesses grow online. Premium design. Real results.",
    images: [
      {
        url: "https://webierstudio.com/og-image.png",
        width: 500,
        height: 500,
        alt: "Webier Studio — Web Design & AI Systems for US Businesses",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X Card ─────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@webierstudio",
    creator: "@webierstudio",
    title: "Webier Studio — Web Design, SEO & AI Systems",
    description:
      "High-performance websites, SEO, and AI-powered systems for US businesses. Fast. Conversion-focused. Premium.",
    images: ["https://webierstudio.com/og-image.png"],
  },

  // ── Verification (add your codes here when ready) ─────────────────────────
  verification: {
    google: "YOUR_GOOGLE_SITE_VERIFICATION_CODE", // Replace with Search Console code
    // yandex: 'YOUR_YANDEX_CODE',
    // bing: 'YOUR_BING_CODE',
  },

  // ── App / PWA ─────────────────────────────────────────────────────────────
  applicationName: "Webier Studio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // ── Category ─────────────────────────────────────────────────────────────
  category: "Web Design & Digital Agency",
};

// ---------------------------------------------------------------------------
// STRUCTURED DATA (JSON-LD Schemas)
// ---------------------------------------------------------------------------

/** Schema 1 — LocalBusiness / ProfessionalService */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "WebDesign"],
  "@id": "https://webierstudio.com/#business",
  name: "Webier Studio",
  url: "https://webierstudio.com",
  logo: "https://webierstudio.com/logo.png",
  image: "https://webierstudio.com/og-image.png",
  email: "contact@webierstudio.com",
  description:
    "Webier Studio is a premium web design, SEO, and AI systems agency serving US businesses. We build high-performance websites using React and Next.js that drive real business results.",
  foundingDate: "2025",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: 2,
  },
  areaServed: [
    {
      "@type": "Country",
      name: "United States",
    },
    {
      "@type": "Country",
      name: "United Kingdom",
    },
    {
      "@type": "Country",
      name: "United Arab Emirates",
    },
    {
      "@type": "Country",
      name: "India",
    },
  ],
  priceRange: "$$",
  currenciesAccepted: "USD",
  openingHours: "Mo-Fr 09:00-18:00",
  sameAs: [
    "https://www.instagram.com/webier.in/",
    "https://www.linkedin.com/company/webierdev/",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Webier Studio Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Development",
          description:
            "High-performance websites built with React & Next.js for speed, security, and conversions.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mobile App Development",
          description:
            "Cross-platform mobile apps for iOS and Android using React Native.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "UI/UX Design",
          description:
            "Human-centered interface design that converts visitors into customers.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO & Performance Optimization",
          description:
            "Boost search rankings with technical SEO, Core Web Vitals optimization, and content strategy.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Branding & Visual Identity",
          description:
            "Logo, color system, typography, and brand guidelines designed with precision.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Chatbot Integration",
          description:
            "AI-powered chatbots and automation systems to streamline your business operations.",
        },
      },
    ],
  },
};

/** Schema 2 — WebSite (enables Sitelinks Search Box) */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://webierstudio.com/#website",
  name: "Webier Studio",
  url: "https://webierstudio.com",
  description:
    "Premium web design, SEO, and AI-powered systems for US businesses.",
  publisher: {
    "@id": "https://webierstudio.com/#business",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://webierstudio.com/?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

/** Schema 3 — FAQ (Appears in Google rich results / People Also Ask) */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services does Webier Studio offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Webier Studio offers web development, mobile app development, UI/UX design, SEO & performance optimization, branding, and AI chatbot integration for businesses primarily in the USA.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a website cost at Webier Studio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our web design projects start from $500 and scale based on complexity. We offer packages for small businesses, startups, and enterprises. Contact us for a free quote.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to build a website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard business website typically takes 4–8 weeks. More complex projects like e-commerce or web apps can take 6–12 weeks. We always provide a clear timeline before starting.",
      },
    },
    {
      "@type": "Question",
      name: "Does Webier Studio work with clients outside the USA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! While we primarily serve US-based businesses, we have successfully worked with clients in the UK, UAE, and India.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide SEO services along with web design?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We build all websites with technical SEO best practices from the ground up, including fast load times, semantic HTML, structured data, and on-page optimization. We also offer ongoing SEO retainer services.",
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// ROOT LAYOUT
// ---------------------------------------------------------------------------
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* ── Viewport & Theme ─────────────────────────────────────────── */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3533CD" />
        <meta name="color-scheme" content="light" />

        {/* ── Geo Targeting (US-focused) ───────────────────────────────── */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="language" content="English" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />

        {/* ── Preconnect for performance ───────────────────────────────── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* ── Favicon / PWA Icons ─────────────────────────────────────── */}
        <link rel="icon" href="/og-image.png" type="image/png" />
        <link rel="shortcut icon" href="/og-image.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ── Structured Data (JSON-LD) ────────────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* ── Google Analytics (GA4) ────────────────────────────────────── */}
        <Script
          id="ga4-gtag"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-VVVMME8Q0G"
        />
        <Script
          id="ga4-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VVVMME8Q0G', {
                page_path: window.location.pathname,
                send_page_view: true,
              });
            `,
          }}
        />

        {/* ── 3rd-Party Scripts (deferred) ─────────────────────────────── */}
        <Script
          id="vtag-ai-js"
          strategy="afterInteractive"
          src="https://r2.leadsy.ai/tag.js"
          data-pid="17gkBAUsVsoePvCag"
          data-version="062024"
        />
        <Script
          id="chatbase-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="q2NRpEmksjnS4e5lI29r-";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();
            `,
          }}
        />
      </head>
      <body className="bg-bg text-[#1a1a1a] min-h-screen relative font-sans selection:bg-[#3533cd] selection:text-white">
        {children}
      </body>
    </html>
  );
}
