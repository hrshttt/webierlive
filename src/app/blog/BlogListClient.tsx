"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Lenis from "lenis";
import { Search, ArrowRight, ArrowLeft, BookOpen, Clock, Calendar, ArrowUpDown, Shuffle, ChevronDown, Check } from "lucide-react";
import Link from "next/link";
import Navbar from "../../Navbar";
import Contact from "../../components/Contact";
import { blogPosts, BlogPost } from "../../data/blogPosts";

export default function BlogListClient() {
  const searchParams = useSearchParams();
  const paramQ = searchParams?.get("q") || "";
  const paramCat = searchParams?.get("category") || "";

  type SortMode = "shuffle" | "latest" | "oldest";

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAllPublications, setShowAllPublications] = useState<boolean>(false);
  const [sortMode, setSortMode] = useState<SortMode>("shuffle");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Close sorting dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(e.target as Node)) {
        setIsSortDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Synchronize initial URL query parameters on load
  useEffect(() => {
    if (paramQ) {
      setSearchQuery(paramQ);
    }
    if (paramCat) {
      const match = categories.find((c) => c.toLowerCase() === paramCat.toLowerCase());
      if (match) setSelectedCategory(match);
    }
  }, [paramQ, paramCat]);

  // Keep browser URL query params synced without triggering full page reload
  const updateUrlParams = (newCat: string, newQuery: string) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (newQuery.trim()) {
      url.searchParams.set("q", newQuery.trim());
    } else {
      url.searchParams.delete("q");
    }
    if (newCat && newCat !== "All") {
      url.searchParams.set("category", newCat);
    } else {
      url.searchParams.delete("category");
    }
    window.history.replaceState({}, "", url.toString());
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

  // Seed for daily deterministic shuffle that refreshes daily
  const dailySeed = useMemo(() => {
    const today = new Date();
    return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  }, []);

  // All posts sorted by newest date first (for Featured Post & Recent Contributions)
  const latestSortedPosts = useMemo(() => {
    return [...blogPosts].sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      if (timeB !== timeA) return timeB - timeA;
      return Number(b.id) - Number(a.id);
    });
  }, []);

  // Featured Post: The #1 newest post on the website
  const featuredPost = latestSortedPosts[0];

  // Recent Contributions: Latest posts (excluding the featured one)
  const recentContributions = useMemo(() => {
    return latestSortedPosts.slice(1, 13);
  }, [latestSortedPosts]);

  // Base list for Explore All Publications based on selected sortMode
  const sortedArchivePosts = useMemo(() => {
    if (sortMode === "latest") {
      return latestSortedPosts;
    }
    if (sortMode === "oldest") {
      return [...blogPosts].sort((a, b) => {
        const timeA = new Date(a.date).getTime();
        const timeB = new Date(b.date).getTime();
        if (timeA !== timeB) return timeA - timeB;
        return Number(a.id) - Number(b.id);
      });
    }
    // "shuffle" - Daily Random Mix
    const list = [...blogPosts];
    let s = dailySeed;
    for (let i = list.length - 1; i > 0; i--) {
      s = (s * 9301 + 49297) % 233280;
      const rnd = s / 233280;
      const j = Math.floor(rnd * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }, [sortMode, dailySeed, latestSortedPosts]);

  // Filtering Logic (respects sortMode)
  const filteredPosts = useMemo(() => {
    const list = blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });

    if (sortMode === "latest") {
      return list.sort((a, b) => {
        const timeA = new Date(a.date).getTime();
        const timeB = new Date(b.date).getTime();
        if (timeB !== timeA) return timeB - timeA;
        return Number(b.id) - Number(a.id);
      });
    }
    if (sortMode === "oldest") {
      return list.sort((a, b) => {
        const timeA = new Date(a.date).getTime();
        const timeB = new Date(b.date).getTime();
        if (timeA !== timeB) return timeA - timeB;
        return Number(a.id) - Number(b.id);
      });
    }
    // "shuffle"
    let s = dailySeed;
    for (let i = list.length - 1; i > 0; i--) {
      s = (s * 9301 + 49297) % 233280;
      const rnd = s / 233280;
      const j = Math.floor(rnd * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }, [selectedCategory, searchQuery, sortMode, dailySeed]);

  // Unique Categories list
  const categories = ["All", "Development", "Design", "SEO", "Business", "Security", "AI Systems"];

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
      case "business":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "security":
        return "bg-rose-500/10 text-rose-600 border-rose-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  // Scroll logic for Recent Contributions slider
  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const firstChild = sliderRef.current.firstElementChild as HTMLElement;
      if (firstChild) {
        const cardWidth = firstChild.offsetWidth;
        const gap = 32; // gap-8 is 32px
        const scrollAmount = direction === "left" ? -(cardWidth + gap) : (cardWidth + gap);
        sliderRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const isFiltering = selectedCategory !== "All" || searchQuery !== "";
  
  // Bottom Archive Section Calculations
  const visiblePublicationsCount = showAllPublications ? sortedArchivePosts.length : 12;
  const publicationsToShow = sortedArchivePosts.slice(0, visiblePublicationsCount);

  // Sorting Options for Minimal Dropdown
  const sortOptions = [
    {
      id: "shuffle" as const,
      label: "All",
      desc: "Daily random mix",
    },
    {
      id: "latest" as const,
      label: "Newest",
      desc: "Date: newest first",
    },
    {
      id: "oldest" as const,
      label: "Oldest",
      desc: "Date: oldest first",
    },
  ];

  // Minimalist Dropdown Component Matching Website Aesthetic
  const renderSortDropdown = () => (
    <div className="relative" ref={sortDropdownRef}>
      <button
        type="button"
        onClick={() => setIsSortDropdownOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-black/10 hover:border-black/30 hover:bg-black/5 font-mono text-xs uppercase tracking-wider text-black transition-all cursor-pointer"
        aria-label="Sort publications"
      >
        <ArrowUpDown className="w-3.5 h-3.5 text-[#3533cd]" />
        <span>{sortOptions.find((o) => o.id === sortMode)?.label}</span>
        <ChevronDown
          className={`w-3 h-3 text-black/40 transition-transform duration-200 ${
            isSortDropdownOpen ? "rotate-180 text-black" : ""
          }`}
        />
      </button>

      {isSortDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl border border-black/10 rounded-2xl shadow-lg shadow-black/5 p-1.5 z-50 animate-in fade-in duration-150">
          <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-black/40 border-b border-black/5 mb-1.5">
            Sort By
          </div>
          <div className="flex flex-col gap-1">
            {sortOptions.map((opt) => {
              const isSelected = sortMode === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setSortMode(opt.id);
                    setIsSortDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-black/5 text-black font-bold"
                      : "hover:bg-black/5 text-black/70 hover:text-black font-normal"
                  }`}
                >
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider">
                      {opt.label}
                    </p>
                    <p className="font-sans text-[11px] text-black/45 leading-tight">
                      {opt.desc}
                    </p>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-black" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div ref={containerRef} className="bg-[#f6f6fa] text-[#1a1a1a] min-h-screen selection:bg-[#3533cd] selection:text-white">
      <Navbar />

      {/* Redesigned Hero Header */}
      <section className="relative pt-44 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto overflow-hidden border-b border-black/5">
        <div className="absolute top-28 left-10 w-[500px] h-[500px] bg-[#3533cd]/5 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 md:gap-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-black/10 bg-black/5 text-black/60 font-mono text-xs uppercase tracking-widest mb-6">
              Webier Studio Journal
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-8xl tracking-tight leading-[0.9] text-black">
              Insights &amp;<br />
              Intellect.
            </h1>
          </div>

          <div className="flex gap-6 items-stretch max-w-lg lg:mb-2">
            <div className="w-[1px] bg-black/10 shrink-0" />
            <div className="flex flex-col justify-center">
              <p className="font-sans text-base md:text-xl text-black/70 font-light leading-relaxed">
                Raw perspectives and detailed guides on Next.js systems, technical SEO engineering, conversational AI, and the conversion psychology of elite UI/UX design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured & Filter Section */}
      <section className="px-6 md:px-12 max-w-[1600px] mx-auto pt-16 pb-24">
        {/* Search & Categories Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-black/10 pb-8 mb-12">
          {/* Categories Pill List */}
          <div className="flex flex-nowrap md:flex-wrap items-center gap-2 md:gap-3 overflow-x-auto px-2 py-2 scrollbar-none w-full">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowAllPublications(false); // Reset archive on filter change
                    updateUrlParams(cat, searchQuery);
                  }}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "bg-black text-white shadow-md shadow-black/10 scale-105"
                      : "bg-white/80 hover:bg-white text-black/70 hover:text-black border border-black/5 hover:border-black/10 backdrop-blur-sm"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:max-w-xs">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                updateUrlParams(selectedCategory, val);
              }}
              className="w-full bg-white/80 backdrop-blur-sm border border-black/10 hover:border-black/20 focus:border-[#3533cd] rounded-full py-3 pl-11 pr-5 text-sm outline-none transition-all duration-300 text-black placeholder-black/40"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 w-4.5 h-4.5" />
          </div>
        </div>

        {/* Dynamic Display based on whether filtering is active */}
        {!isFiltering ? (
          <>
            {/* Featured Post Card (Visible when category is 'All' and search query is empty) */}
            {featuredPost && (
              <div className="blog-featured-card mb-24 bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden border border-white/50 shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 group">
                <Link href={`/blog/${featuredPost.slug}`} className="block p-8 md:p-12 lg:p-14">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className={`px-3.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider border ${getCategoryColor(featuredPost.category)}`}>
                        {featuredPost.category}
                      </span>
                      <span className="text-black/50 text-xs font-medium uppercase tracking-widest flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 className="font-display font-black text-3xl md:text-5xl lg:text-6xl leading-[1.05] text-black group-hover:text-[#3533cd] transition-colors duration-300 mb-6 max-w-4xl">
                      {featuredPost.title}
                    </h2>

                    <p className="font-sans text-black/70 text-base md:text-xl leading-relaxed mb-8 font-light max-w-3xl">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="flex flex-col gap-6">
                    {/* Author detail */}
                    <div className="flex items-center gap-3 border-t border-black/5 pt-6">
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="w-10 h-10 rounded-full border border-black/10 object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-black">{featuredPost.author.name}</h4>
                        <p className="text-xs text-black/50">{featuredPost.author.role}</p>
                      </div>
                      <span className="ml-auto font-mono text-xs text-black/40 uppercase tracking-wider">{featuredPost.date}</span>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#3533cd] group-hover:translate-x-1.5 transition-transform duration-300">
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Recent Contributions Section with Left & Right Buttons */}
            {recentContributions.length > 0 && (
              <div className="mb-24">
                <div className="flex items-center justify-between mb-8 border-b border-black/5 pb-4">
                  <h3 className="font-display text-2xl font-bold tracking-tight text-black">
                    Recent Contributions
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => scrollSlider("left")}
                      className="w-10 h-10 rounded-full border border-black/10 hover:bg-black hover:text-white hover:border-black flex items-center justify-center transition-all cursor-pointer"
                      aria-label="Scroll left"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => scrollSlider("right")}
                      className="w-10 h-10 rounded-full border border-black/10 hover:bg-black hover:text-white hover:border-black flex items-center justify-center transition-all cursor-pointer"
                      aria-label="Scroll right"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Slider Viewport */}
                <div className="overflow-hidden -mx-2 px-2">
                  <div
                    ref={sliderRef}
                    className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory pb-4"
                  >
                    {recentContributions.map((post) => (
                      <article
                        key={post.id}
                        className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-21.3px)] flex-shrink-0 snap-start bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden border border-white/50 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 flex flex-col justify-between group"
                      >
                        <Link href={`/blog/${post.slug}`} className="flex flex-col h-full justify-between p-6">
                          <div>
                            <div className="flex items-center gap-3 mb-4">
                              <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getCategoryColor(post.category)}`}>
                                {post.category}
                              </span>
                              <span className="flex items-center gap-1 text-black/50 text-[10px] font-bold uppercase tracking-widest">
                                <Clock className="w-3.5 h-3.5" /> {post.readTime}
                              </span>
                            </div>

                            <div className="flex items-center gap-3 mb-3 text-black/40 text-[10px] font-bold uppercase tracking-widest">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> {post.date}
                              </span>
                            </div>

                            <h3 className="font-display font-bold text-xl leading-[1.15] text-black group-hover:text-[#3533cd] transition-colors duration-300 mb-3 min-h-[50px] line-clamp-2">
                              {post.title}
                            </h3>

                            <p className="font-sans text-black/70 text-sm leading-relaxed mb-6 font-light line-clamp-3">
                              {post.excerpt}
                            </p>
                          </div>

                          <div className="border-t border-black/5 pt-5 flex items-center gap-3">
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="w-8 h-8 rounded-full object-cover border border-black/10"
                            />
                            <div>
                              <h4 className="font-bold text-xs text-black">{post.author.name}</h4>
                              <p className="text-[10px] text-black/50">{post.author.role}</p>
                            </div>
                            <div className="ml-auto w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-[#3533cd] group-hover:bg-[#3533cd] group-hover:text-white transition-all duration-300">
                              <ArrowRight className="w-4 h-4 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                            </div>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Archive: "Explore All Publications" Section */}
            <div className="mt-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-black/5 pb-4">
                <h3 className="font-display text-2xl font-bold tracking-tight text-black">
                  Explore All Publications
                </h3>
                {renderSortDropdown()}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {publicationsToShow.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden border border-white/50 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <Link href={`/blog/${post.slug}`} className="flex flex-col h-full justify-between p-6">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getCategoryColor(post.category)}`}>
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1 text-black/50 text-[10px] font-bold uppercase tracking-widest">
                            <Clock className="w-3.5 h-3.5" /> {post.readTime}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 mb-3 text-black/40 text-[10px] font-bold uppercase tracking-widest">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" /> {post.date}
                          </span>
                        </div>

                        <h3 className="font-display font-bold text-xl leading-[1.15] text-black group-hover:text-[#3533cd] transition-colors duration-300 mb-3 min-h-[50px] line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="font-sans text-black/70 text-sm leading-relaxed mb-6 font-light line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="border-t border-black/5 pt-5 flex items-center gap-3">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-8 h-8 rounded-full object-cover border border-black/10"
                        />
                        <div>
                          <h4 className="font-bold text-xs text-black">{post.author.name}</h4>
                          <p className="text-[10px] text-black/50">{post.author.role}</p>
                        </div>
                        <div className="ml-auto w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-[#3533cd] group-hover:bg-[#3533cd] group-hover:text-white transition-all duration-300">
                          <ArrowRight className="w-4 h-4 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              {/* Show All Toggle Button */}
              {!showAllPublications && sortedArchivePosts.length > 12 && (
                <div className="flex justify-center mt-16">
                  <button
                    onClick={() => setShowAllPublications(true)}
                    className="px-8 py-4 bg-[#1a1a1a] hover:bg-[#3533cd] active:scale-98 text-white rounded-full font-mono text-sm uppercase tracking-widest transition-all duration-300 shadow-lg shadow-black/10 cursor-pointer flex items-center gap-2"
                  >
                    Show All Articles ({blogPosts.length})
                    <ArrowRight className="w-4.5 h-4.5 transform rotate-90" />
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Filtered Results Grid */
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-black/5 pb-4">
              <h3 className="font-display text-2xl font-bold tracking-tight text-black">
                {searchQuery ? `Search Results for "${searchQuery}"` : `${selectedCategory} Articles`} ({filteredPosts.length})
              </h3>
              <div className="flex items-center gap-4">
                {renderSortDropdown()}
                {isFiltering && (
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSearchQuery("");
                      updateUrlParams("All", "");
                    }}
                    className="font-mono text-xs uppercase tracking-wider text-[#3533cd] hover:underline cursor-pointer"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden border border-white/50 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <Link href={`/blog/${post.slug}`} className="flex flex-col h-full justify-between p-6">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getCategoryColor(post.category)}`}>
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1 text-black/50 text-[10px] font-bold uppercase tracking-widest">
                            <Clock className="w-3.5 h-3.5" /> {post.readTime}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 mb-3 text-black/40 text-[10px] font-bold uppercase tracking-widest">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" /> {post.date}
                          </span>
                        </div>

                        <h3 className="font-display font-bold text-xl leading-[1.15] text-black group-hover:text-[#3533cd] transition-colors duration-300 mb-3 min-h-[50px] line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="font-sans text-black/70 text-sm leading-relaxed mb-6 font-light line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="border-t border-black/5 pt-5 flex items-center gap-3">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-8 h-8 rounded-full object-cover border border-black/10"
                        />
                        <div>
                          <h4 className="font-bold text-xs text-black">{post.author.name}</h4>
                          <p className="text-[10px] text-black/50">{post.author.role}</p>
                        </div>
                        <div className="ml-auto w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-[#3533cd] group-hover:bg-[#3533cd] group-hover:text-white transition-all duration-300">
                          <ArrowRight className="w-4 h-4 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-black/15">
                <BookOpen className="w-12 h-12 text-[#3533cd]/40 mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-black mb-2">No Articles Found</h3>
                <p className="text-black/60 max-w-sm mx-auto text-sm">
                  We couldn't find any articles matching "{searchQuery}" in category "{selectedCategory}". Try modifying your search.
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Contact Form footer */}
      <Contact />
    </div>
  );
}
