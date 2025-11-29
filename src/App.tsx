import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Components
import Navbar from "./Navbar";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import Services from "./components/Services";
import Process from "./components/Process";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
// import Footer from './components/Footer'; // Commented out because Contact.tsx acts as the Footer now
import SEO from "./components/SEO"; // Import the SEO component we made

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Initialize Lenis (Smooth Scrolling)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for premium feel
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // 2. Sync Lenis with GSAP ScrollTrigger
    // This ensures animations don't jitter while scrolling
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Use GSAP's Ticker to drive Lenis
    // This is more performant than requestAnimationFrame for GSAP apps
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP lag smoothing to prevent stuttering on heavy loads
    gsap.ticker.lagSmoothing(0);

    // Simulate loading (or wait for assets)
    const timer = setTimeout(() => setIsLoading(false), 500);

    // Cleanup function
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#fcfcfc] z-50 flex items-center justify-center">
        <div className="animate-pulse">
          <h1 className="font-display text-4xl text-[#3533cd] tracking-tighter font-bold">
            WEBIER
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfc] text-[#1a1a1a] min-h-screen relative font-sans selection:bg-[#3533cd] selection:text-white">
      {/* --- SEO LAYER --- */}
      <SEO
        title="Webier IT Solutions | Premium Web & App Development"
        description="We build high-performance websites and mobile apps. Transforming ideas into digital reality with modern design and cutting-edge technology."
        url="https://webier.online"
      />

      <Navbar />

      <main>
        <Hero />
        <Philosophy />
        <Services />
        <Process />
        <Projects />
        <Achievements />
        {/* Contact acts as the visual footer */}
        <Contact />
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default App;
