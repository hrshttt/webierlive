import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Webier Studio — Web Design, SEO & AI Systems for US Businesses',
  description: 'Webier Studio builds high-performance websites, SEO strategies, and AI-powered systems for businesses in the USA. Premium design. Real results.',
  keywords: 'web design agency, web development USA, SEO agency, AI chatbot integration, Next.js development, hospitality web design',
  authors: [{ name: 'Webier Studio' }],
  creator: 'Webier Studio',
  metadataBase: new URL('https://webierstudio.com'),
  openGraph: {
    title: 'Webier Studio — Web Design & AI Systems for US Businesses',
    description: 'High-performance websites, SEO, and AI-powered systems for US businesses.',
    url: 'https://webierstudio.com',
    siteName: 'Webier Studio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webier Studio — Web Design & AI Systems',
    description: 'High-performance websites, SEO, and AI systems for US businesses.',
    creator: '@webierstudio',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script 
          id="vtag-ai-js" 
          strategy="afterInteractive" 
          src="https://r2.leadsy.ai/tag.js" 
          data-pid="17gkBAUsVsoePvCag" 
          data-version="062024"
        />
      </head>
      <body className="bg-bg text-[#1a1a1a] min-h-screen relative font-sans selection:bg-[#3533cd] selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Webier Studio",
              "url": "https://webierstudio.com",
              "email": "contact@webierstudio.com",
              "description": "Premium web design, SEO, and AI-powered systems for US businesses.",
              "foundingDate": "2025",
              "areaServed": {
                "@type": "Country",
                "name": "United States"
              },
              "serviceType": [
                "Web Design",
                "Web Development",
                "SEO Optimization",
                "AI Chatbot Integration",
                "Branding"
              ],
              "sameAs": [
                "https://instagram.com/webierstudio",
                "https://linkedin.com/company/webierstudio"
              ]
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
