"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Navbar from "../Navbar";
import Hero from "../components/Hero";
import Philosophy from "../components/Philosophy";
import Services from "../components/Services";
import Process from "../components/Process";
import Projects from "../components/Projects";
import Achievements from "../components/Achievements";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // 1. Initialize Lenis with optimized timing and natural physics
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false,
    });

    // 2. Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Store globally so Navbar and other components can use Lenis scrollTo
    (window as any).lenis = lenis;

    // Check if there is a pending scroll target (from cross-page navigation or hash)
    const targetSection =
      sessionStorage.getItem("webier_scroll_target") ||
      (window.location.hash ? window.location.hash.replace("#", "") : null);

    if (targetSection) {
      sessionStorage.removeItem("webier_scroll_target");
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      setTimeout(() => {
        const el = document.getElementById(targetSection);
        if (el) {
          lenis.scrollTo(el, { offset: -60, duration: 1.2 });
        }
      }, 400);
    }

    // 3. Drive Lenis with GSAP's Ticker via named function for proper cleanup
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // Enable smooth lag recovery (prevents abrupt frame skipping)
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
      delete (window as any).lenis;
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <Services />
        <Process />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  );
}

