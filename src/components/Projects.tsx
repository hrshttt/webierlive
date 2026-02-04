import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Plus, Info } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "SIP CLUB",
    desc: "Tokyo-based café. Cool, aesthetic, and premium Japanese minimal vibes.",
    year: "2025",
    img: "/sip.jpg",
    link: "https://sip-club-webier.vercel.app/",
  },
  {
    id: "02",
    title: "KORDEN",
    desc: "Semiconductor product brand focused on high-performance tech solutions.",
    year: "2025",
    img: "/korden.jpg",
    link: "https://www.korden.tech/",
  },
  {
    id: "03",
    title: "SOZO",
    desc: "Premium clothing brand crafting high-quality, modern fashion essentials.",
    year: "2025",
    img: "/sozo.jpg",
    link: "https://www.sozocorporate.com/",
  },
  {
    id: "04",
    title: "SAVERA",
    desc: "Luxury real estate brand selling premium properties across Dubai and India.",
    year: "2024",
    img: "/savera.jpg",
    link: "https://savera-webier.vercel.app/",
  },
  {
    id: "05",
    title: "MARTINI",
    desc: "Aesthetic café based in Pune. Cinematic dining with a luxury experience.",
    year: "2024",
    img: "/martini.jpg",
    link: "https://martini-webier.vercel.app/",
  },
  {
    id: "06",
    title: "VIBEMAKER",
    desc: "Bold digital marketing agency powered by GSAP-driven experiences.",
    year: "2024",
    img: "/vibemaker.jpg",
    link: "https://vibe-maker-sigma.vercel.app/",
  }
];


const SelectedWorks = () => {
  const container = useRef(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray(".work-section");

    sections.forEach((section: any, i) => {
      // 1. PINNING LOGIC (Stacked Effect)
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        pin: true,
        pinSpacing: false,
        end: "bottom top",
      });

      // 2. KINETIC BACKGROUND MOVEMENT
      const title = section.querySelector(".work-title");
      if (title) {
        gsap.to(title, {
          xPercent: -20,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          }
        });
      }

      // 3. IMAGE SCALE REVEAL
      const img = section.querySelector(".work-img-container");
      gsap.fromTo(img, 
        { scale: 0.9, opacity: 0.8 },
        { 
          scale: 1, 
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          }
        }
      );
    });
  }, { scope: container });

  return (
    <section ref={container} className="bg-[#fcfcfc] overflow-hidden relative">
      
      {/* --- RESPONSIVE HEADER --- */}
      <div className=" flex flex-col justify-center px-6 md:px-20 bg-[#fcfcfc] relative z-20 border-b border-black/5">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 mt-20 mb-5">
            <span className="w-2 h-2 bg-[#3533CD] rounded-full animate-pulse"></span>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-black/40">Portfolio Archive 2026</p>
          </div>
          
          <h2 className="font-display text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-20">
            <span className="text-[#3533CD]">Selected</span> <br /> 
            <span className="text-transparent" style={{ WebkitTextStroke: "1px black" }}>Archive</span>
          </h2>
          
         
        </div>
      </div>

      {/* --- WORK SECTIONS --- */}
      {projects.map((project) => (
        <div 
          key={project.id} 
          className="work-section relative h-screen w-full flex items-center justify-center bg-[#fcfcfc]"
        >
          {/* AMBIENT BLOBS */}
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-[#3533CD]/5 blur-[100px] rounded-full pointer-events-none"></div>

          {/* KINETIC BACKGROUND TEXT */}
          <h3 className="work-title absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap font-display text-[25vw] font-black uppercase text-black/[0.015] pointer-events-none z-0 select-none">
            {project.title} • {project.id} • {project.title}
          </h3>

          <div className="relative z-10 w-full max-w-7xl px-4 md:px-12 grid grid-cols-12 gap-6 md:gap-16 items-center">
            
            {/* --- LEFT: THE CARD PIECE --- */}
            <div className="col-span-12 lg:col-span-7">
              <div className="work-img-container relative group">
                {/* Industrial Detailing */}
                <div className="absolute -top-3 -left-3 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-[#3533CD]"></div>
                  <div className="w-6 h-[1px] bg-black/10 mt-[3px]"></div>
                </div>
                

                {/* Main Image Wrapper */}
                <div className="relative aspect-[4/5] md:aspect-video overflow-hidden rounded-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-black/5 bg-white">
                  <img 
                    src={project.img} 
                    alt={project.title}
                    loading="lazy" 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  />
                  
            

                  <div className="absolute bottom-6 right-6 z-20">
                    <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm group-hover:bg-[#3533CD] group-hover:border-[#3533CD] transition-all duration-500">
                      <Plus className="text-white w-6 h-6 transition-transform group-hover:rotate-90" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- RIGHT: CONTENT PIECE --- */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-6 md:gap-10 mt-6 lg:mt-0 lg:pl-4">
              <div className="flex items-center justify-between lg:justify-start lg:gap-8">
                <div className="flex flex-col">
                  <span className="font-display text-6xl font-black text-black leading-none italic">
                    {project.id}<span className="text-[#3533CD]">.</span>
                  </span>
                </div>

              </div>

              <div className="space-y-4 md:space-y-6">
                <h4 className="font-display text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-black leading-[0.85] transition-all">
                  {project.title}
                </h4>
                <div className="flex gap-4 items-start">
                  <Info size={16} className="text-[#3533CD] mt-1 shrink-0" />
                  <p className="font-sans text-black/60 text-sm md:text-base leading-relaxed max-w-sm">
                    {project.desc}
                  </p>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <a 
                href={project.link}
                target="_blank"
                className="group relative flex items-center justify-between w-full max-w-[280px] px-8 py-5 bg-black rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] shadow-xl"
              >
                {/* Liquid Fill Effect */}
                <div className="absolute inset-0 w-0 h-full bg-[#3533CD] transition-all duration-500 ease-out group-hover:w-full"></div>
                
                <span className="relative z-10 font-bold uppercase tracking-[0.3em] text-[10px] text-white transition-colors duration-500">
                  Launch Project
                </span>
                
                <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-md group-hover:bg-white group-hover:text-[#3533CD] transition-all duration-500 transform group-hover:rotate-45">
                  <ArrowUpRight size={18} />
                </div>
              </a>
            </div>
          </div>
        </div>
      ))}

      

    </section>
  );
};

export default SelectedWorks;