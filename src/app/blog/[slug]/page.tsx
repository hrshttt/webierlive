"use client";

import React, { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { ArrowLeft, Clock, Calendar, ArrowRight, Share2, Check } from "lucide-react";
import Link from "next/link";
import Navbar from "../../../Navbar";
import Contact from "../../../components/Contact";
import { blogPosts, BlogPost } from "../../../data/blogPosts";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = blogPosts.find((p) => p.slug === slug);
  const containerRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Category Colors
  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "development":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "design":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "seo":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "ai systems":
        return "bg-indigo-500/10 text-indigo-600 border-indigo-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  // 404 Case
  if (!post) {
    return (
      <div className="min-h-screen bg-[#f6f6fa] text-[#1a1a1a] flex flex-col items-center justify-center p-6">
        <Navbar />
        <div className="text-center max-w-md bg-white/70 backdrop-blur-md border border-black/5 rounded-3xl p-12 shadow-xl shadow-black/5">
          <h1 className="font-display font-black text-4xl text-black mb-4">Post Not Found</h1>
          <p className="font-sans text-black/60 mb-8 font-light">
            The article you are looking for does not exist or has been relocated to another slug.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-[#3533cd] hover:bg-[#3533cd]/95 text-white font-bold text-sm uppercase tracking-wider rounded-full py-3.5 px-8 transition-colors shadow-lg shadow-[#3533cd]/15"
          >
            <ArrowLeft className="w-4 h-4" /> Back To Blog
          </Link>
        </div>
      </div>
    );
  }

  // Related Posts calculation
  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div ref={containerRef} className="bg-[#f6f6fa] text-[#1a1a1a] min-h-screen selection:bg-[#3533cd] selection:text-white relative">
      <title>{`${post.title} | Webier Studio`}</title>
      <meta name="description" content={post.excerpt} />
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-[#3533cd] z-[99999] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <Navbar />

      {/* Main Post Wrapper */}
      <article className="pt-36 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Back Navigation Button */}
          <Link
            href="/blog"
            className="back-btn inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-black/60 hover:text-black transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Articles
          </Link>

          {/* Post Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className={`post-meta-item px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${getCategoryColor(post.category)}`}>
                {post.category}
              </span>
              <span className="post-meta-item text-black/50 text-xs font-medium uppercase tracking-widest flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {post.date}
              </span>
              <span className="post-meta-item text-black/50 text-xs font-medium uppercase tracking-widest flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {post.readTime}
              </span>
            </div>

            <h1 className="post-title font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-black mb-8">
              {post.title}
            </h1>

            {/* Author Profile and actions bar */}
            <div className="post-author-bar flex flex-wrap items-center justify-between gap-6 border-y border-black/10 py-6 mb-12">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full border border-black/10 object-cover"
                />
                <div>
                  <h4 className="font-bold text-sm text-black">{post.author.name}</h4>
                  <p className="text-xs text-black/50">{post.author.role}</p>
                </div>
              </div>

              {/* Utility Buttons */}
              <div className="flex gap-2 relative">
                <button
                  onClick={handleShare}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer ${
                    copied
                      ? "border-[#3533cd] bg-white text-[#3533cd] scale-105"
                      : "border-black/15 bg-white text-black hover:bg-[#3533cd] hover:text-white hover:border-[#3533cd]"
                  }`}
                  title="Share Link"
                >
                  {copied ? <Check className="w-4 h-4 text-[#3533cd]" /> : <Share2 className="w-4 h-4" />}
                </button>

                {/* "Link copied" text appearing smoothly below */}
                <span
                  className={`absolute top-12 right-0 bg-black text-white text-[9px] font-mono uppercase tracking-widest px-2.5 py-1.5 rounded-md transition-all duration-300 shadow-md shadow-black/10 whitespace-nowrap z-10 ${
                    copied ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
                  }`}
                >
                  Link copied
                </span>
              </div>
            </div>
          </header>

          {/* Post Content rendering */}
          <div className="post-body-content max-w-3xl mx-auto border-b border-black/10 pb-16 mb-20">
            {post.content.map((item, index) => {
              switch (item.type) {
                case "paragraph":
                  return (
                    <p key={index} className="font-sans text-lg md:text-xl text-black/85 leading-relaxed mb-6 font-light">
                      {item.text}
                    </p>
                  );
                case "heading":
                  const Tag = item.level === 3 ? "h3" : "h2";
                  const classes = item.level === 3 
                    ? "font-display font-bold text-2xl md:text-3xl text-black mt-12 mb-4 tracking-tight"
                    : "font-display font-black text-3xl md:text-4xl text-black mt-16 mb-6 tracking-tight border-b border-black/5 pb-2";
                  return (
                    <Tag key={index} className={classes}>
                      {item.text}
                    </Tag>
                  );
                case "quote":
                  return (
                    <blockquote key={index} className="border-l-4 border-[#3533cd] pl-6 py-2 my-10 bg-[#3533cd]/5 rounded-r-xl pr-6">
                      <p className="font-sans italic text-xl md:text-2xl text-black/90 leading-relaxed font-light">
                        "{item.text}"
                      </p>
                      {item.author && (
                        <cite className="block font-mono text-xs uppercase tracking-widest text-[#3533cd] mt-3 font-semibold not-italic">
                          — {item.author}
                        </cite>
                      )}
                    </blockquote>
                  );
                case "list":
                  return (
                    <ul key={index} className="list-none flex flex-col gap-3 my-8 pl-2">
                      {item.items.map((listItem, i) => (
                        <li key={i} className="font-sans text-lg md:text-xl text-black/85 font-light flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-[#3533cd] mt-2.5 shrink-0" />
                          <span>{listItem}</span>
                        </li>
                      ))}
                    </ul>
                  );
                case "code":
                  return (
                    <div key={index} className="my-10 rounded-2xl overflow-hidden border border-white/20 shadow-lg shadow-black/10">
                      <div className="bg-[#121216] px-6 py-3 border-b border-white/5 flex items-center justify-between">
                        <span className="font-mono text-xs text-white/40 uppercase tracking-widest">{item.language}</span>
                        <div className="flex gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        </div>
                      </div>
                      <pre className="bg-[#0b0b0d] p-6 overflow-x-auto text-sm font-mono text-[#e4e4e7] leading-relaxed scrollbar-thin">
                        <code>{item.code}</code>
                      </pre>
                    </div>
                  );
                default:
                  return null;
              }
            })}

            {/* Post tags */}
            <div className="flex flex-wrap gap-2 mt-12">
              {post.tags.map((tag) => (
                <span key={tag} className="px-4 py-2 bg-white border border-black/5 text-xs text-black/60 rounded-full font-bold uppercase tracking-wider">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related Articles Footer section */}
          {relatedPosts.length > 0 && (
            <div className="mt-20">
              <h3 className="font-display text-3xl font-black tracking-tight text-black mb-8 border-b border-black/5 pb-4">
                Recommended Reading
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((p) => (
                  <article
                    key={p.id}
                    className="bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden border border-white/50 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                  >
                    <Link href={`/blog/${p.slug}`} className="flex flex-col h-full justify-between p-6">
                      <div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border mb-4 inline-block ${getCategoryColor(p.category)}`}>
                          {p.category}
                        </span>

                        <h4 className="font-display font-bold text-lg leading-[1.1] text-black group-hover:text-[#3533cd] transition-colors duration-300 mb-2">
                          {p.title}
                        </h4>

                        <p className="font-sans text-black/60 text-xs leading-relaxed line-clamp-3 font-light mb-6">
                          {p.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-black/5 pt-4">
                        <span className="text-[10px] font-mono text-black/40 uppercase tracking-widest">{p.date}</span>
                        <div className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center text-[#3533cd] group-hover:bg-[#3533cd] group-hover:text-white transition-all duration-300">
                          <ArrowRight className="w-3.5 h-3.5 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Contact Form instead of Footer */}
      <Contact />
    </div>
  );
}
