"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import Link from "next/link";

// Links configuration
// ENSURE THESE IDS MATCH YOUR SECTION IDS EXACTLY
const navLinks = ["About", "Services", "Process", "Work", "Impact", "Blog"];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const navRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const [isClickNavigating, setIsClickNavigating] = useState(false);
  const lastScrollY = useRef(0);

  // --- Helper: Scroll to Section without Hash in URL ---
  const scrollToSection = (sectionId: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    setIsMobileMenuOpen(false);
    setIsClickNavigating(true);
    setTimeout(() => {
      setIsClickNavigating(false);
    }, 1200);

    setActiveSection(sectionId);

    if (isHome) {
      const element = document.getElementById(sectionId);
      if (element) {
        const lenis = (window as any).lenis;
        if (lenis && typeof lenis.scrollTo === "function") {
          lenis.scrollTo(element, { offset: -60, duration: 1.2 });
        } else {
          const y = element.getBoundingClientRect().top + window.pageYOffset - 60;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
      // Ensure URL stays clean without #
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    } else {
      // Cross-page navigation from /blog or other pages
      sessionStorage.setItem("webier_scroll_target", sectionId);
      router.push("/");
    }
  };

  // --- 1. Scroll Direction Logic ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);

      if (isClickNavigating) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (isScrollingDown) {
        if (currentScrollY > 60 && scrollDifference > 12) {
          setIsVisible((prev) => (prev ? false : prev));
          setIsMobileMenuOpen(false);
        }
      } else {
        if (scrollDifference > 6) {
          setIsVisible((prev) => (!prev ? true : prev));
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClickNavigating]);

  // --- 2. Active Section Observer ---
  useEffect(() => {
    if (!isHome) return;

    // Add 'hero' and 'contact' manually as they aren't in navLinks
    const sections = [
      "hero",
      ...navLinks.filter(l => l.toLowerCase() !== "blog").map((link) => link.toLowerCase()),
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isHome]);

  // --- 3. Navbar Show/Hide Animation ---
  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      yPercent: isVisible ? 0 : -140,
      opacity: isVisible ? 1 : 0,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [isVisible]);

  // --- 4. Mobile Menu Animation ---
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        autoAlpha: 0,
        y: -10,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isMobileMenuOpen]);

  // --- 5. Spotlight Logic ---
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!spotlightRef.current || !navRef.current || window.innerWidth < 768)
      return;

    const navRect = navRef.current.getBoundingClientRect();
    const x = e.clientX - navRect.left;

    gsap.to(spotlightRef.current, {
      x: x,
      opacity: 1,
      scale: 1,
      duration: 0.4,
    });
  };

  const handleMouseLeave = () => {
    if (!spotlightRef.current) return;
    gsap.to(spotlightRef.current, { opacity: 0, scale: 0.5, duration: 0.3 });
  };

  return (
    <div className="fixed top-6 left-0 w-full flex flex-col items-center z-[9999] pointer-events-none px-4">
      {/* --- Main Navbar Pill --- */}
      <nav
        ref={navRef}
        className="pointer-events-auto relative bg-white/90 backdrop-blur-xl border border-white/40 shadow-xl shadow-black/5 rounded-full px-4 py-2 md:px-2 md:py-2 flex items-center justify-between md:justify-center md:gap-2 w-full md:w-auto max-w-[500px] md:max-w-none transition-all duration-300 z-50"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        role="navigation"
        aria-label="Main Navigation"
      >
        {/* Spotlight Effect */}
        <div
          ref={spotlightRef}
          className="absolute top-1/2 left-0 w-16 h-16 bg-[#3533cd]/20 rounded-full blur-xl -translate-y-1/2 -translate-x-1/2 pointer-events-none opacity-0 hidden md:block"
        />

        {/* Logo */}
        <a
          href="/"
          onClick={(e) => scrollToSection("hero", e)}
          className="pl-2 md:pl-6 pr-6 relative z-10 group/logo cursor-pointer"
          aria-label="Webier Home"
        >
          <span className="font-display font-black text-2xl tracking-tighter text-[#3533CD]">
            W
            <span className="text-[#FFC947] inline-block transition-transform duration-500 group-hover/logo:rotate-[360deg]">
              .
            </span>
          </span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => {
            const isBlogLink = item.toLowerCase() === "blog";
            const sectionId = item.toLowerCase();
            const isActive = isBlogLink 
              ? pathname.startsWith("/blog")
              : (isHome && activeSection === sectionId);

            if (isBlogLink) {
              return (
                <MagneticItem key={item}>
                  <Link
                    href="/blog"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative px-5 py-3 rounded-full overflow-hidden group/btn block"
                  >
                    <span className="absolute inset-0 bg-[#3533cd] translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-500 rounded-full z-0"></span>
                    <div className="relative z-10 flex flex-col h-[20px] overflow-hidden">
                      <span
                        className={`block text-xs font-bold uppercase tracking-widest group-hover/btn:-translate-y-full transition-transform duration-500 h-[20px] flex items-center justify-center ${
                          isActive ? "text-[#3533cd]" : "text-black"
                        }`}
                      >
                        {item}
                      </span>
                      <span className="block text-sm font-serif italic text-white group-hover/btn:-translate-y-full transition-transform duration-500 absolute top-full left-0 w-full h-[20px] flex items-center justify-center">
                        {item}
                      </span>
                    </div>
                    <span
                      className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#3533cd] rounded-full transition-all duration-300 ${
                        isActive
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-0 group-hover/btn:opacity-0"
                      }`}
                    ></span>
                  </Link>
                </MagneticItem>
              );
            }

            return (
              <MagneticItem key={item}>
                <a
                  href={isHome ? "/" : `/#${sectionId}`}
                  onClick={(e) => scrollToSection(sectionId, e)}
                  className="relative px-5 py-3 rounded-full overflow-hidden group/btn block cursor-pointer"
                >
                  <span className="absolute inset-0 bg-[#3533cd] translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-500 rounded-full z-0"></span>
                  <div className="relative z-10 flex flex-col h-[20px] overflow-hidden">
                    <span
                      className={`block text-xs font-bold uppercase tracking-widest group-hover/btn:-translate-y-full transition-transform duration-500 h-[20px] flex items-center justify-center ${
                        isActive ? "text-[#3533cd]" : "text-black"
                      }`}
                    >
                      {item}
                    </span>
                    <span className="block text-sm font-serif italic text-white group-hover/btn:-translate-y-full transition-transform duration-500 absolute top-full left-0 w-full h-[20px] flex items-center justify-center">
                      {item}
                    </span>
                  </div>
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#3533cd] rounded-full transition-all duration-300 ${
                      isActive
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-0 group-hover/btn:opacity-0"
                    }`}
                  ></span>
                </a>
              </MagneticItem>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="pl-4 pr-2 hidden md:block">
          <a
            href={isHome ? "/" : "/#contact"}
            onClick={(e) => scrollToSection("contact", e)}
            className="block relative overflow-hidden bg-black text-white px-6 py-2.5 rounded-full text-[10px] uppercase font-bold tracking-widest group hover:shadow-lg transition-all cursor-pointer"
          >
            <span className="relative z-10 group-hover:text-[#3533cd] transition-colors">
              Let's Talk
            </span>
            <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300"></div>
          </a>
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden relative z-50 p-2 w-10 h-10 flex flex-col justify-center gap-1.5 group cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span
            className={`w-5 h-0.5 bg-black rounded-full transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`w-5 h-0.5 bg-black rounded-full transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-5 h-0.5 bg-black rounded-full transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </nav>

      {/* --- Mobile Menu --- */}
      <div
        ref={mobileMenuRef}
        className="md:hidden pointer-events-auto absolute top-full mt-2 w-[90%] max-w-[300px] bg-white rounded-2xl shadow-2xl shadow-black/10 border border-black/5 overflow-hidden opacity-0 invisible origin-top"
      >
        <div className="flex flex-col p-2">
          {navLinks.map((link) => {
            const isBlogLink = link.toLowerCase() === "blog";
            const sectionId = link.toLowerCase();
            const isActive = isBlogLink 
              ? pathname.startsWith("/blog")
              : (isHome && activeSection === sectionId);

            if (isBlogLink) {
              return (
                <Link
                  key={link}
                  href="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  <span
                    className={`text-sm font-bold uppercase tracking-wider ${
                      isActive ? "text-[#3533cd]" : "text-gray-800"
                    }`}
                  >
                    {link}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-[#3533cd] text-lg">
                    →
                  </span>
                </Link>
              );
            }

            return (
              <a
                key={link}
                href={isHome ? "/" : `/#${sectionId}`}
                onClick={(e) => scrollToSection(sectionId, e)}
                className="group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                <span
                  className={`text-sm font-bold uppercase tracking-wider ${
                    isActive ? "text-[#3533cd]" : "text-gray-800"
                  }`}
                >
                  {link}
                </span>
                <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-[#3533cd] text-lg">
                  →
                </span>
              </a>
            );
          })}

          <div className="h-[1px] bg-gray-100 w-full my-1"></div>

          <a
            href={isHome ? "/" : "/#contact"}
            onClick={(e) => scrollToSection("contact", e)}
            className="block text-center w-full mt-1 bg-black text-white px-4 py-3 rounded-xl text-xs uppercase font-bold tracking-widest hover:bg-[#3533cd] transition-colors duration-300 cursor-pointer"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </div>
  );
};

// --- Micro-Component: Magnetic Effect ---
interface MagneticItemProps {
  children: React.ReactNode;
}

const MagneticItem = ({ children }: MagneticItemProps) => {
  const magnetic = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const el = magnetic.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.2);
      yTo(y * 0.2);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <li ref={magnetic} className="relative block list-none">
      {children}
    </li>
  );
};

export default Navbar;
