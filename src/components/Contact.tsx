"use client";
import React, { useRef, useState } from "react";
import { ArrowUpRight, Instagram, Linkedin, Loader2 } from "lucide-react";

// --- Types ---
interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

// --- Sub Component: Social Link ---
const SocialLink = ({ href, icon, label }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-2 text-black/60 hover:text-[#3533cd] transition-colors duration-300"
    aria-label={label}
  >
    <span className="group-hover:-translate-y-1 transition-transform duration-300">
      {icon}
    </span>
    <span className="font-mono text-xs uppercase tracking-wide hidden md:block">
      {label}
    </span>
  </a>
);

// --- Form Component ---
const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto flex flex-col gap-8 text-left mt-16 z-20 relative bg-white/50 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-black/5 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <label className="font-mono text-xs uppercase tracking-widest text-black/60">Name</label>
          <input required name="name" type="text" className="border-b border-black/20 bg-transparent py-3 text-lg focus:outline-none focus:border-[#3533cd] transition-colors" placeholder="John Doe" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-mono text-xs uppercase tracking-widest text-black/60">Email</label>
          <input required name="email" type="email" className="border-b border-black/20 bg-transparent py-3 text-lg focus:outline-none focus:border-[#3533cd] transition-colors" placeholder="john@example.com" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <label className="font-mono text-xs uppercase tracking-widest text-black/60">Service Interested In</label>
          <select required name="service" defaultValue="" className="border-b border-black/20 bg-transparent py-3 text-lg focus:outline-none focus:border-[#3533cd] transition-colors appearance-none">
            <option value="" disabled>Select a service</option>
            <option value="Web Development">Web Development</option>
            <option value="SEO">SEO</option>
            <option value="AI Automation">AI Automation</option>
            <option value="Branding">Branding</option>
            <option value="Google & Meta Ads">Google & Meta Ads</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-mono text-xs uppercase tracking-widest text-black/60">Budget Range</label>
          <select required name="budget" defaultValue="" className="border-b border-black/20 bg-transparent py-3 text-lg focus:outline-none focus:border-[#3533cd] transition-colors appearance-none">
            <option value="" disabled>Select a budget</option>
            <option value="Under $500">Under $500</option>
            <option value="$500–$1,500">$500–$1,500</option>
            <option value="$1,500–$5,000">$1,500–$5,000</option>
            <option value="$5,000+">$5,000+</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs uppercase tracking-widest text-black/60">Message</label>
        <textarea required name="message" rows={4} className="border-b border-black/20 bg-transparent py-3 text-lg focus:outline-none focus:border-[#3533cd] transition-colors resize-none" placeholder="Tell us about your project..."></textarea>
      </div>

      <button type="submit" disabled={status === 'loading' || status === 'success'} className="mt-4 bg-[#1a1a1a] hover:bg-[#3533cd] text-white py-5 rounded-full font-mono text-sm uppercase tracking-widest transition-colors flex items-center justify-center gap-2 group">
        {status === 'loading' && <Loader2 className="animate-spin" size={16} />}
        {status === 'idle' && (
          <>
            Send Message
            <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
          </>
        )}
        {status === 'success' && 'Message Sent ✓'}
        {status === 'error' && 'Try Again'}
      </button>
      
      {status === 'success' && <p className="text-green-600 text-center font-mono text-sm mt-2">Message sent! We'll be in touch soon.</p>}
      {status === 'error' && <p className="text-red-600 text-center font-mono text-sm mt-2">Something went wrong. Email us directly.</p>}
    </form>
  )
}

// --- Main Component ---
const Contact = () => {
  const email = "contact@webierstudio.com";

  return (
    <section
      className="relative w-full bg-[#fcfcfc] text-black min-h-screen flex flex-col justify-between px-4 md:px-8 lg:px-12 pt-32 pb-8 overflow-hidden font-sans"
      id="contact"
    >
      {/* Background Grid (Subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto flex-1 flex flex-col justify-center items-center text-center">
        {/* Animated Badge */}
        <div className="mb-8 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 backdrop-blur-sm animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3533cd] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFC947]"></span>
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-black/60">
              Available for new projects
            </span>
          </div>
        </div>

        {/* Headline */}
        <h2 className="font-display text-[12vw] md:text-[8rem] lg:text-[10rem] font-black leading-[0.85] tracking-tighter uppercase text-[#3533CD] mb-8 mix-blend-difference">
          Let's{" "}
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "2px black" }}
          >
            Talk
          </span>
        </h2>

        {/* Magnetic Email Interaction */}
        <a
          href={`mailto:${email}`}
          className="group relative cursor-pointer inline-flex items-center justify-center gap-4 md:gap-8 hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] mb-8"
        >
          <h3 className="font-sans text-2xl md:text-5xl font-light text-black/80 group-hover:text-[#3533CD] transition-colors duration-300">
            {email}
          </h3>

          {/* Expandable Action Button */}
          <div className="relative h-12 flex items-center justify-center rounded-full bg-[#f6f6fa] group-hover:bg-[#3533CD] transition-all duration-500 w-12 group-hover:w-48 overflow-hidden">
            <ArrowUpRight
              size={20}
              className="absolute text-black/40 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-4 group-hover:scale-0"
            />

            <span className="absolute opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-white text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
              Click to Open Mail
            </span>
          </div>
        </a>

        {/* Contact Form */}
        <ContactForm />
      </div>

      {/* Footer / Socials */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto border-t border-black/10 pt-12 mt-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-black/40">
            Socials
          </span>
          <div className="flex gap-8">
            <SocialLink
              href="https://www.instagram.com/webier.in/"
              icon={<Instagram size={20} />}
              label="Instagram"
            />
            <SocialLink
              href="https://www.linkedin.com/company/webierdev/"
              icon={<Linkedin size={20} />}
              label="LinkedIn"
            />
          </div>
        </div>

        <div className="flex flex-col md:items-end gap-2 text-right">
          <p className="font-display text-2xl font-bold uppercase tracking-tight">
            Webier
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
