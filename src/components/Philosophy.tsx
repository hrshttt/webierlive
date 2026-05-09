"use client";
import { useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------------------------------
   Type Definitions
--------------------------------------------------------- */
type DivRef = HTMLDivElement | null;
type ParagraphRef = HTMLParagraphElement | null;

const Philosophy = () => {
  const containerRef = useRef<DivRef>(null);
  const textRef = useRef<ParagraphRef>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  /* ---------------------------------------------------------
      GSAP SPLIT + ANIMATIONS
  --------------------------------------------------------- */
  useLayoutEffect(() => {
    const container = containerRef.current;
    const textElement = textRef.current;
    const titleElement = titleRef.current;
    const lineElement = lineRef.current;

    if (!container || !textElement || !titleElement || !lineElement) return;

    const ctx = gsap.context(() => {
      /* 1. Scroll Animation — Title */
      gsap.fromTo(
        titleElement,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
          },
        }
      );

      /* 2. Divider line */
      gsap.fromTo(
        lineElement,
        { width: 0 },
        {
          width: "4rem",
          duration: 1,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
          },
        }
      );

      /* 3. Cinematic Blur-Up Reveal & Highlight Wipe */
      const wordBlocks = textElement.querySelectorAll(".word-block");
      const highlight = textElement.querySelector(".highlight-bg");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textElement,
          start: "top 80%",
        }
      });

      // Smooth cinematic ripple blur reveal
      tl.fromTo(wordBlocks, 
        {
          opacity: 0,
          filter: "blur(10px)",
          y: 15,
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          stagger: 0.03,
          duration: 1,
          ease: "power3.out",
        }, 
        0
      );

      // Sweeping underline animation
      if (highlight) {
        tl.to(highlight, {
          backgroundPosition: "0% 100%",
          duration: 1.5,
          ease: "power3.inOut",
        }, 0.4); // Delay slightly so it sweeps exactly as the words land
      }

      // Maine yahan se Hover Logic remove kar di hai

    }, container);

    return () => ctx.revert();
  }, []);

  /* ---------------------------------------------------------
      MOUSE FOLLOW GLOW
  --------------------------------------------------------- */
  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;

    if (!container || !glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!container || !glow) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(glow, {
        x,
        y,
        duration: 1,
        ease: "power2.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /* ---------------------------------------------------------
      RENDER
  --------------------------------------------------------- */
  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full py-32 px-6 md:px-12 lg:px-24 bg-[#f6f6fa] overflow-hidden"
    >
      {/* Glow */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#148ac4] rounded-full mix-blend-multiply filter blur-[100px] opacity-10 pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        {/* LEFT */}
        <div className="lg:col-span-4">
          <div className="sticky top-32">
            <h2
              ref={titleRef}
              className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tighter text-BLACK leading-none"
            >
              The <br />
              <span className="text-[#3533CD]">Philosophy</span>
            </h2>

            <div
              ref={lineRef}
              className="h-1.5 bg-[#3533cd] mt-6 rounded-full"
            ></div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-8">
          <p className="font-sans text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.35] text-[#000000] tracking-tight" ref={textRef as any}>
            
            {"Most agencies sell you a website.".split(" ").map((word, i) => (
              <span key={`line1-${i}`}>
                <span className="word-block inline-block opacity-0">{word}</span>
                {" "}
              </span>
            ))}
            
            <span 
              className="highlight-bg pb-2" 
              style={{ 
                WebkitBoxDecorationBreak: "clone",
                boxDecorationBreak: "clone",
                backgroundImage: "linear-gradient(to right, #3533CD 50%, transparent 50%)", 
                backgroundSize: "200% 6px", 
                backgroundPosition: "100% 100%",
                backgroundRepeat: "no-repeat"
              }}
            >
              {"We build the thing your competitors will WISH they thought of first.".split(" ").map((word, i) => (
                <span key={`line2-${i}`}>
                  <span className="word-block inline-block opacity-0">{word}</span>
                  {" "}
                </span>
              ))}
            </span>
            
            {" "}
            {"No bloated teams. No templates. Just two people who care too much about your business.".split(" ").map((word, i) => (
              <span key={`line3-${i}`}>
                <span className="word-block inline-block opacity-0">{word}</span>
                {" "}
              </span>
            ))}

          </p>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
