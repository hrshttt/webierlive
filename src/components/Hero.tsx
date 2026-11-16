"use client";
import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  // Canvas & Physics Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Physics Configuration
    const GRID_SPACING = 48; // Optimized from 40 to reduce dot count and physics calculations by ~30%
    const MOUSE_RADIUS = 200;
    const MOUSE_FORCE = 1.5;
    const SPRING_STIFFNESS = 0.08;
    const FRICTION = 0.9;

    // Dot Configuration
    const BASE_RADIUS = 1.5;
    const MAX_RADIUS = 4.5;

    const mouse = { x: -1000, y: -1000 };

    class Dot {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;

      constructor(x: number, y: number) {
        this.x = this.originX = x;
        this.y = this.originY = y;
        this.vx = 0;
        this.vy = 0;
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < MOUSE_RADIUS * MOUSE_RADIUS) {
          const dist = Math.sqrt(distSq);
          const angle = Math.atan2(dy, dx);
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          const push = force * MOUSE_FORCE;

          this.vx -= Math.cos(angle) * push;
          this.vy -= Math.sin(angle) * push;
        }

        const dxOrigin = this.originX - this.x;
        const dyOrigin = this.originY - this.y;

        this.vx += dxOrigin * SPRING_STIFFNESS;
        this.vy += dyOrigin * SPRING_STIFFNESS;

        this.vx *= FRICTION;
        this.vy *= FRICTION;

        this.x += this.vx;
        this.y += this.vy;
      }

      draw(context: CanvasRenderingContext2D) {
        const dX = this.x - this.originX;
        const dY = this.y - this.originY;
        const displacement = Math.sqrt(dX * dX + dY * dY);
        const factor = Math.min(displacement / 30, 1);
        const size = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * factor;

        const r = 53 * factor;
        const g = 51 * factor;
        const b = 205 * factor;
        const a = 0.15 + 0.85 * factor;

        context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        context.beginPath();
        context.arc(this.x, this.y, size, 0, Math.PI * 2);
        context.fill();
      }
    }

    let dots: Dot[] = [];
    let isRunning = false;
    let lastMouseMoveTime = 0;

    const init = () => {
      dots = [];
      const cols = Math.floor(width / GRID_SPACING) + 2;
      const rows = Math.floor(height / GRID_SPACING) + 2;
      const offsetX = (width - (cols - 1) * GRID_SPACING) / 2;
      const offsetY = (height - (rows - 1) * GRID_SPACING) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * GRID_SPACING + offsetX;
          const y = r * GRID_SPACING + offsetY;
          dots.push(new Dot(x, y));
        }
      }
      drawFrame();
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        ctx.moveTo(dot.x + BASE_RADIUS, dot.y);
        ctx.arc(dot.x, dot.y, BASE_RADIUS, 0, Math.PI * 2);
      }
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Batch-draw static dots in a single canvas pass
      ctx.beginPath();
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      
      const activeDots: Dot[] = [];
      let totalEnergy = 0;
      
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        dot.update();
        
        const dX = dot.x - dot.originX;
        const dY = dot.y - dot.originY;
        const displacementSq = dX * dX + dY * dY;
        totalEnergy += displacementSq;
        
        if (displacementSq > 0.05) {
          activeDots.push(dot);
        } else {
          ctx.moveTo(dot.x + BASE_RADIUS, dot.y);
          ctx.arc(dot.x, dot.y, BASE_RADIUS, 0, Math.PI * 2);
        }
      }
      ctx.fill();
      
      // Draw active glowing dots
      for (let i = 0; i < activeDots.length; i++) {
        activeDots[i].draw(ctx);
      }
      
      const now = performance.now();
      const mouseRecentlyActive = now - lastMouseMoveTime < 600;

      // If dots have settled and mouse isn't interacting, pause the loop to save 100% idle CPU/GPU
      if (!mouseRecentlyActive && activeDots.length === 0 && totalEnergy < 0.2) {
        isRunning = false;
        animationFrameId.current = null;
        drawFrame();
        return;
      }
      
      animationFrameId.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!isRunning) {
        isRunning = true;
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };

    // --- Performance Optimization: Intersection Observer ---
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
            isRunning = false;
          }
        }
      },
      { threshold: 0 }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      init();
      startAnimation();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      lastMouseMoveTime = performance.now();
      startAnimation();
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      lastMouseMoveTime = 0;
    };

    handleResize();

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Text Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(".hero-title-char", {
        opacity: 0,
        filter: "blur(20px)",
        scale: 1.15,
        y: 10,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.06,
        onComplete: () => {
          gsap.set(".hero-title-char", { clearProps: "filter,willChange" });
        },
      })
        .from(
          ".hero-tagline",
          {
            opacity: 0,
            y: 20,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.9"
        )
        .from(
          ".hero-desc-container",
          {
            opacity: 0,
            x: -20,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.9"
        )
        .from(
          ".hero-meta",
          {
            opacity: 0,
            y: -10,
            duration: 0.9,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.9"
        );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen flex flex-col items-center justify-center bg-[#f6f6fa] overflow-hidden text-primary"
    >
      {/* Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 pointer-events-none select-none">
        {/* Top Meta Details */}
        <div className="absolute top-28 w-full max-w-[90vw] flex justify-between font-display text-xs md:text-sm font-semibold tracking-widest uppercase opacity-40 hero-meta">
          <span>Digital Agency</span>
          <span>Web Dev Studio</span>
        </div>

        {/* Massive Headline - SEO Optimized */}
        <div className="flex flex-col items-center mix-blend-multiply">
          <h1
            aria-label="Webier Studio — Premium Web Design, SEO & AI Systems Agency"
            className="font-display font-bold text-[18vw] leading-[0.8] tracking-tighter text-blue-800 transform scale-x-125 origin-center hero-title overflow-visible whitespace-nowrap"
          >
            <span className="sr-only">Webier Studio — Premium Web Design, SEO & AI Systems Agency for US Businesses</span>
            {/* aria-hidden ensures screen readers read the label above, not individual letters */}
            {["W", "E", "B", "I", "E", "R"].map((char, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="hero-title-char inline-block will-change-[filter,transform,opacity]"
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* Sub-content Container */}
        <div className="mt-12 md:mt-24 flex flex-row items-start text-left gap-4 md:gap-8 max-w-4xl mix-blend-multiply px-4 w-full justify-center">
          <h2 className="hero-tagline font-display font-bold text-[10px] sm:text-xs md:text-xl text-accent2 tracking-[0.15em] md:tracking-[0.25em] uppercase w-[35%] md:w-1/3 text-right pt-1 md:pt-2">
            Beyond Digital
            <br />
            Boundaries
          </h2>

          <div className="block w-[1px] h-16 md:h-20 bg-black/20 hero-desc-container"></div>

          <div className="hero-desc-container w-[65%] md:w-2/3 pl-2 md:pl-4">
            <p className="font-display font-medium text-xs sm:text-sm md:text-2xl text-black leading-relaxed">
              We exist to disrupt the ordinary. Crafting immersive digital
              ecosystems where strategy meets pure aesthetic chaos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
