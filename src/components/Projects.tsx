"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "EASTPOINTE",
    desc: "A Luxury Lake Cabin Experience perfect balance of rugged nature and refined comfort",
    year: "2024",
    video: "/eastpointe.mp4",
    link: "https://www.eastpointekc.com/",
  },
  {
    id: "02",
    title: "KORDEN TECHNOLOGIES",
    desc: "Semiconductor product brand focused on high-performance tech solutions.",
    year: "2025",
    video: "/korden.mp4",
    link: "https://www.korden.tech/",
  },
  {
    id: "03",
    title: "SOZO CORPORATE",
    desc: "Premium clothing brand crafting high-quality, modern fashion essentials.",
    year: "2025",
    video: "/sozo.mp4",
    link: "https://www.sozocorporate.com/",
  }
];

const SelectedWorks = () => {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".project-card");

    // Set initial clip-path states
    gsap.set(cards[0] as Element, { zIndex: 10, clipPath: "inset(0% 0% 0% 0%)" });
    gsap.set(cards[1] as Element, { zIndex: 20, clipPath: "inset(100% 0% 0% 0%)" });
    gsap.set(cards[2] as Element, { zIndex: 30, clipPath: "inset(100% 0% 0% 0%)" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=3000",
        scrub: 1,
        pin: true,
      }
    });

    // =====================================
    // Transition 0 -> 1
    // =====================================
    tl.to(cards[1] as Element, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.inOut" }, 0);
    // Push Card 0 down for parallax depth
    tl.to((cards[0] as Element).querySelector(".project-content"), { y: "20vh", opacity: 0.5, duration: 1, ease: "power2.inOut" }, 0);
    // Pull Card 1 up from bottom
    tl.fromTo((cards[1] as Element).querySelector(".project-content"), { y: "-20vh" }, { y: "0vh", duration: 1, ease: "power2.inOut" }, 0);

    // =====================================
    // Transition 1 -> 2
    // =====================================
    tl.to(cards[2] as Element, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.inOut" }, 1);
    tl.to((cards[1] as Element).querySelector(".project-content"), { y: "20vh", opacity: 0.5, duration: 1, ease: "power2.inOut" }, 1);
    tl.fromTo((cards[2] as Element).querySelector(".project-content"), { y: "-20vh" }, { y: "0vh", duration: 1, ease: "power2.inOut" }, 1);

    // =====================================
    // VIDEO PLAYBACK LOGIC
    // =====================================
    tl.eventCallback("onUpdate", () => {
      const progress = tl.progress();
      cards.forEach((card: any, index) => {
        const video = card.querySelector(".main-video") as HTMLVideoElement;
        const bgVideo = card.querySelector(".bg-video") as HTMLVideoElement;
        
        let isActive = false;
        if (index === 0 && progress < 0.3) isActive = true;
        if (index === 1 && progress > 0.2 && progress < 0.8) isActive = true;
        if (index === 2 && progress > 0.7) isActive = true;

        if (isActive) {
          if (video?.paused) video.play().catch(() => {});
          if (bgVideo?.paused) bgVideo.play().catch(() => {});
        } else {
          if (video && !video.paused) video.pause();
          if (bgVideo && !bgVideo.paused) bgVideo.pause();
        }
      });
    });

  }, { scope: container });

  return (
    <section 
      ref={container} 
      id="work"
      className="relative h-screen w-full bg-[#f8f9fa]" 
    >
      
      {/* Static HUD / Header */}
      <div className="absolute top-8 left-6 md:top-12 md:left-12 z-50 pointer-events-none text-black">
         <h2 className="font-display font-black uppercase text-xl md:text-2xl tracking-widest text-[#3533CD]">
           Archive
         </h2>
         <div className="flex items-center gap-3 mt-2">
            <span className="w-1.5 h-1.5 bg-[#3533CD] rounded-full animate-pulse"></span>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-black/50">Curated Works</p>
         </div>
      </div>

      {/* Editorial Curtain Deck */}
      <div className="absolute inset-0">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="project-card absolute inset-0 overflow-hidden bg-[#f8f9fa]"
          >
            {/* Ambient Glow tied directly to this card */}
            <div className="absolute inset-0 -z-20 pointer-events-none overflow-hidden">
              <video 
                src={project.video} 
                muted loop playsInline 
                className="bg-video absolute inset-0 w-full h-full object-cover" 
                style={{ filter: "blur(120px) saturate(200%) opacity(0.5)", transform: "scale(1.2)" }} 
              />
              <div className="absolute inset-0 bg-[#f8f9fa]/70 backdrop-blur-[50px]"></div>
            </div>

            {/* Content Wrapper for Parallax */}
            <div className="project-content w-full h-full relative">
              
              {/* Maximalist Background Number */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-10 md:-left-4 lg:left-12 -z-10 font-display font-black text-[50vw] md:text-[40vw] lg:text-[35vw] leading-none text-black/[0.03] select-none pointer-events-none tracking-tighter">
                {project.id}
              </div>

              {/* Left-Aligned Video Frame */}
              <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 lg:left-16 w-[90vw] md:w-[60vw] lg:w-[50vw] aspect-[4/5] md:aspect-video lg:aspect-[16/10] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.1)] bg-white group border border-black/5">
                <video 
                  src={project.video} 
                  muted loop playsInline 
                  className="main-video w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 pointer-events-none"></div>
                
                {/* Hover Button */}
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer"
                >
                   <div className="bg-white text-black px-6 py-4 rounded-full font-mono text-[11px] uppercase tracking-widest font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                      View Full Project <ArrowUpRight size={14} className="text-[#3533CD]" />
                   </div>
                </a>
              </div>

              {/* Bottom-Right Typography */}
              <div className="absolute bottom-8 right-6 md:bottom-16 md:right-16 lg:bottom-24 lg:right-24 flex flex-col items-end text-right z-20 pointer-events-auto max-w-[85vw] md:max-w-[40vw] lg:max-w-[35vw]">
                 <span className="font-mono text-[#3533CD] text-xs md:text-sm tracking-widest mb-2 md:mb-4 uppercase font-bold">
                   Project // {project.year}
                 </span>
                 
                 <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-[4rem] font-black uppercase tracking-tighter text-black leading-[0.9] text-balance">
                   {project.title}
                 </h2>
                 
                 <p className="font-sans text-black/60 text-sm md:text-base lg:text-lg mt-3 md:mt-4 max-w-xs md:max-w-sm font-light leading-relaxed">
                   {project.desc}
                 </p>
                 
                 <a 
                   href={project.link} 
                   target="_blank" 
                   rel="noreferrer" 
                   className="mt-6 md:mt-8 flex items-center gap-3 border border-black/20 rounded-full px-6 py-3 md:px-8 md:py-4 bg-white/50 backdrop-blur-md text-black hover:bg-black hover:text-white transition-colors uppercase tracking-widest text-[10px] md:text-xs font-bold"
                 >
                   Launch Project <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
                 </a>
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default SelectedWorks;