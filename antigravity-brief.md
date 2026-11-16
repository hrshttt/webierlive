# Antigravity Dev Brief — Webier Studio
## SEO, AI Crawlability & Contact Form

**Project:** webierstudio.com  
**Stack:** Next.js 14 App Router, TypeScript, Tailwind, GSAP, Lenis  
**Deployed on:** Vercel  

---

## 1. Meta Tags & Page Title

In `app/layout.tsx`, replace any existing title/meta with Next.js native metadata:

```tsx
import type { Metadata } from 'next'

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
}
```

---

## 2. robots.txt

Create file at `public/robots.txt`:

```txt
User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: cohere-ai
Allow: /

Sitemap: https://webierstudio.com/sitemap.xml
```

---

## 3. llms.txt

Create file at `public/llms.txt`:

```txt
# Webier Studio

> A premium web design and digital studio building high-performance websites, SEO strategies, and AI-powered systems for businesses in the USA.

## About
Webier Studio is a focused two-person digital agency. We blend strategy with design to create websites that don't just look good — they perform. Est. 2025.

## Services
- Web Development (React / Next.js / TypeScript)
- SEO & Performance Optimization
- AI Chatbot Integration & Automation
- Branding & Visual Identity
- Google & Meta Ads Management

## Work
- East Pointe (eastpointekc.com): Luxury lake cabin experience near Kansas City, Missouri. Full website design and development.
- Korden Technologies (korden.tech): Semiconductor and critical component sourcing brand. B2B website design and development.
- SOZO Inc. (sozocorporate.com): Independent premium streetwear brand. E-commerce and brand website.

## Target Clients
US-based businesses — especially hospitality, short-term rentals, local service businesses, and startups looking for premium digital presence.

## Contact
Email: contact@webierstudio.com
Website: https://webierstudio.com
Instagram: @webierstudio
LinkedIn: linkedin.com/company/webierstudio
```

---

## 4. Schema Markup (JSON-LD)

Add this inside `app/layout.tsx`, inside the `<body>` tag before `{children}`:

```tsx
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
```

---

## 5. Sitemap

Install the package:
```bash
npm install next-sitemap
```

Create `next-sitemap.config.js` in root:
```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://webierstudio.com',
  generateRobotsTxt: false, // we already have a custom one
  sitemapSize: 7000,
}
```

Add to `package.json` scripts:
```json
"postbuild": "next-sitemap"
```

---

## 6. Contact Form

### UI Component
Add a contact form section to the single-scroll page. Keep it consistent with the existing Webier design language — dark/light theme, bold typography, minimal inputs.

Fields:
- **Name** (text input)
- **Email** (email input)
- **Service Interested In** (dropdown: Web Development / SEO / AI Automation / Branding / Google & Meta Ads / Other)
- **Budget Range** (dropdown: Under $500 / $500–$1,500 / $1,500–$5,000 / $5,000+)
- **Message** (textarea)
- **Submit button**

### Email Delivery — Resend

Install:
```bash
npm install resend
```

Create `app/api/contact/route.ts`:
```ts
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, email, service, budget, message } = await req.json()

  try {
    await resend.emails.send({
      from: 'Webier Contact <onboarding@resend.dev>',
      to: 'contact@webierstudio.com',
      subject: `New inquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
```

Add to `.env.local`:
```
RESEND_API_KEY=your_resend_api_key_here
```

Add to Vercel environment variables as well:
```
RESEND_API_KEY=your_resend_api_key_here
```

Get free API key at: https://resend.com (free tier = 3,000 emails/month)

### Form State (in your contact section component)
```tsx
'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    setStatus(res.ok ? 'success' : 'error')
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* your styled inputs here */}
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'success' && <p>Message sent! We'll be in touch soon.</p>}
      {status === 'error' && <p>Something went wrong. Email us directly.</p>}
    </form>
  )
}
```

---

## Summary Checklist for Antigravity

- [ ] Meta tags added to `app/layout.tsx`
- [ ] `public/robots.txt` created
- [ ] `public/llms.txt` created
- [ ] Schema JSON-LD added to `app/layout.tsx`
- [ ] `next-sitemap` installed and configured
- [ ] Contact form UI added to scroll page (matching existing design)
- [ ] `/api/contact/route.ts` created
- [ ] Resend account created, API key added to `.env.local` and Vercel env vars
- [ ] All changes deployed to Vercel
- [ ] Test contact form end-to-end after deploy
- [ ] Run https://pagespeed.web.dev on live site and screenshot scores

---

**Priority order:** robots.txt → llms.txt → meta tags → schema → sitemap → contact form
