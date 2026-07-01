"use client";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";

const projects = [
  {
    id: "01",
    title: "EASTPOINTE",
    desc: "A luxury lake cabin experience balancing rugged nature with refined comfort.",
    year: "2024",
    video: "/eastpointe.mp4",
    link: "https://www.eastpointekc.com/",
    tags: ["Hospitality", "Next.js", "TailwindCSS", "SEO"],
    accentColor: "from-[#148ac4]/10 to-[#3533cd]/5",
  },
  {
    id: "02",
    title: "KORDEN TECH",
    desc: "A high-performance semiconductor brand showcasing cutting-edge tech products.",
    year: "2025",
    video: "/korden.mp4",
    link: "https://www.korden.tech/",
    tags: ["Semiconductor", "React", "UX/UI Design", "Performance"],
    accentColor: "from-[#3533cd]/10 to-[#3533cd]/5",
  },
  {
    id: "03",
    title: "SOZO CORPORATE",
    desc: "Premium modern clothing brand crafting minimalist high-quality fashion essentials.",
    year: "2025",
    video: "/sozo.mp4",
    link: "https://www.sozocorporate.com/",
    tags: ["E-Commerce", "Brand Strategy", "AI Integration", "Fast-Load"],
    accentColor: "from-[#FFC947]/10 to-[#3533cd]/5",
  }
];

const ProjectVideo = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Play only when visible in the viewport
          video.play().catch(() => {});
        } else {
          // Pause immediately when scrolled off-screen to free up GPU and CPU decoding resources
          video.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <video 
      ref={videoRef}
      src={src} 
      muted 
      loop
      playsInline 
      preload="auto"
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
    />
  );
};

const SelectedWorks = () => {
  const container = useRef<HTMLElement>(null);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px 0px -100px 0px", // triggers slightly before entering
        threshold: 0.05,
      }
    );

    if (container.current) {
      observer.observe(container.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={container} 
      id="work"
      className="relative w-full py-20 md:py-32 bg-[#f6f6fa] overflow-hidden" 
    >
      {/* Background Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none -z-10"
        style={{
          backgroundImage: "radial-gradient(#3533cd/8% 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px"
        }}
      />

      {/* HEADER */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 mb-12 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/60 pb-8">
          <div>
           
            
            <h2 className="font-display text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter text-[#3533CD] leading-none">
              OUR{" "}
              <br/>
              <span 
                className="text-transparent"
                style={{ WebkitTextStroke: "1px #0f172a" }}
              >
                WORKS
              </span>
            </h2>
          </div>

        <div className="flex items-center gap-4 mt-6 md:mt-0 justify-center md:justify-start">
            <span className="w-2 h-2 bg-[#FFC947] rounded-full animate-ping"></span>
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-black/50">
              / Projects
            </p>
          </div>
        </div>
      </div>

      {/* PROJECTS GRID */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <a 
              href={project.link}
              target="_blank"
              rel="noreferrer"
              key={project.id}
              className="group relative flex flex-col bg-white/70 hover:bg-white backdrop-blur-md rounded-[24px] border border-slate-200/40 hover:border-[#3533cd]/20 shadow-md hover:shadow-[0_30px_60px_-15px_rgba(53,51,205,0.12)] overflow-hidden transition-all duration-700"
            >
              
              {/* Subtle hover background accent glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

              {/* Video aspect frame */}
              <div className="aspect-[16/10] overflow-hidden rounded-[18px] m-3 relative bg-slate-950 border border-slate-200/20 shadow-sm">
                
                {/* Autoplaying Hardware-Accelerated Video */}
                <ProjectVideo src={project.video} />
                
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/20 transition-colors duration-500 pointer-events-none" />

              </div>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-1.5 px-6 pt-4">
                {project.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200/30 group-hover:bg-white/80 transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title & Info */}
              <div className="p-6 pt-3 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl lg:text-3xl font-black uppercase tracking-tight text-slate-900 group-hover:text-[#3533CD] transition-colors duration-300 flex items-center justify-between">
                    {project.title}
                    <ArrowUpRight 
                      size={20} 
                      className="text-slate-400 group-hover:text-[#3533CD] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" 
                    />
                  </h3>
                  
                  <p className="font-sans text-slate-500 text-xs lg:text-sm mt-2 font-normal leading-relaxed">
                    {project.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between text-[#3533CD] font-mono text-[10px] uppercase tracking-widest font-black border-t border-slate-100 pt-4">
                  <span>Launch Project</span>
                  <div className="w-8 h-8 rounded-full bg-[#3533CD]/10 text-[#3533CD] group-hover:bg-[#3533CD] group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </div>
              </div>

            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectedWorks;