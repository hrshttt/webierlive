import React, { useRef, useEffect } from "react";
import {
  ArrowRight,
  Globe,
  Smartphone,
  Wand2,
  PenTool,
  ShieldCheck,
  Rocket,
  Clock,
  Users,
  // FileText removed (unused)
  Hash,
} from "lucide-react";

/* ---------------------------------------------------
   TYPES
--------------------------------------------------- */

interface StepType {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  duration: string;
  team: string[];
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  fileType: string;
}

/* ---------------------------------------------------
   DATA
--------------------------------------------------- */

const steps: StepType[] = [
  {
    id: "01",
    title: "Web Development",
    subtitle: "Build for Scale",
    desc: "High-performance websites crafted for speed, security, and conversions using modern frameworks.",
    duration: "4–8 Weeks",
    team: ["Full Stack Dev"],
    icon: <Globe className="w-5 h-5" />,
    color: "bg-blue-50 text-blue-600",
    borderColor: "group-hover:border-blue-500/30",
    fileType: "website_core.tsx",
  },
  {
    id: "02",
    title: "App Development",
    subtitle: "Mobile First",
    desc: "Building seamless, intuitive mobile experiences for iOS, Android, and cross-platform using React Native.",
    duration: "6–12 Weeks",
    team: ["App Developer"],
    icon: <Smartphone className="w-5 h-5" />,
    color: "bg-purple-50 text-purple-600",
    borderColor: "group-hover:border-purple-500/30",
    fileType: "app_build.ts",
  },
  {
    id: "03",
    title: "UI/UX Design",
    subtitle: "Design That Converts",
    desc: "Human-centered design for interfaces that look stunning and feel effortless, increasing engagement.",
    duration: "2–4 Weeks",
    team: ["UI/UX Designer"],
    icon: <PenTool className="w-5 h-5" />,
    color: "bg-pink-50 text-pink-600",
    borderColor: "group-hover:border-pink-500/30",
    fileType: "design_system.fig",
  },
  {
    id: "04",
    title: "SEO & Performance",
    subtitle: "Visibility That Matters",
    desc: "Boost your rankings with technical SEO, performance optimization, and content structuring.",
    duration: "1–3 Months (Ongoing)",
    team: ["SEO Specialist"],
    icon: <Rocket className="w-5 h-5" />,
    color: "bg-orange-50 text-orange-600",
    borderColor: "group-hover:border-orange-500/30",
    fileType: "seo_report.pdf",
  },
  {
    id: "05",
    title: "Branding",
    subtitle: "Identity That Sticks",
    desc: "Your brand’s visual language—logo, colors, typography, and messaging—designed with precision.",
    duration: "3–6 Weeks",
    team: ["Brand Designer"],
    icon: <Wand2 className="w-5 h-5" />,
    color: "bg-green-50 text-green-600",
    borderColor: "group-hover:border-green-500/30",
    fileType: "brand_guide.pdf",
  },
  {
    id: "06",
    title: "Maintenance & Support",
    subtitle: "Always Up & Running",
    desc: "Continuous monitoring, updates, bug fixes, and enhancements to keep your product performing.",
    duration: "Monthly",
    team: ["Support Engineer"],
    icon: <ShieldCheck className="w-5 h-5" />,
    color: "bg-gray-50 text-gray-600",
    borderColor: "group-hover:border-gray-500/30",
    fileType: "update_logs.json",
  },
];

/* ---------------------------------------------------
   MAIN COMPONENT
--------------------------------------------------- */

const Services = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    let ticking = false;

    const animateCards = () => {
      const cards = cardsRef.current;

      cards.forEach((card, index) => {
        if (!card) return;

        const nextCard = cards[index + 1];
        const cardInner = card.querySelector<HTMLDivElement>(".process-card-inner");
        if (!cardInner) return;

        if (!nextCard) {
          cardInner.style.transform = "scale(1) translateY(0)";
          cardInner.style.opacity = "1";
          cardInner.style.filter = "brightness(1)";
          return;
        }

        const rect = card.getBoundingClientRect();
        const nextRect = nextCard.getBoundingClientRect();
        const distance = nextRect.top - rect.top;
        
        // Squashing starts earlier on mobile to prevent overlap issues
        const startSquashDistance = window.innerWidth < 768 ? 400 : 600;

        if (distance < startSquashDistance && distance > 0) {
          const progress = 1 - distance / startSquashDistance;
          const safeProgress = Math.max(0, Math.min(progress, 1));
          const scale = 1 - safeProgress * 0.05;
          const brightness = 1 - safeProgress * 0.2;
          const y = safeProgress * 10;

          cardInner.style.transform = `scale(${scale}) translateY(${y}px)`;
          cardInner.style.filter = `brightness(${brightness})`;
        } else {
          cardInner.style.transform = "scale(1) translateY(0)";
          cardInner.style.filter = "brightness(1)";
        }
      });
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          animateCards();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", animateCards); // Re-calc on resize
    animateCards();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", animateCards);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen font-sans bg-slate-50"
      id="services"
    >
      {/* HEADER SECTION */}
      <div className="relative w-full bg-slate-100 py-16 md:pt-24 px-4 md:px-8 lg:px-12 border-b border-slate-200 z-20">
        <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center md:flex-row md:justify-between md:items-end md:text-left gap-6 md:gap-0">
          <div>
            <h2 className="font-display text-5xl md:text-9xl font-black uppercase tracking-tighter text-[#3533CD] leading-[0.85]">
              Our <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px #0f172a" }}
              >
                Services
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#FFC947] rounded-full animate-pulse"></span>
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-500">
              / Workflow Engine
            </p>
          </div>
        </div>
      </div>

      {/* CARDS SECTION */}
      <div className="relative w-full bg-slate-100 py-10 md:py-20 px-4 md:px-8 lg:px-12 pb-24 md:pb-40">
        <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col items-center">
          {steps.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="sticky w-full"
              style={{
                /* MOBILE MAGIC: 
                   1. '5vh' keeps it close to the top on small screens.
                   2. '35px' (index * 35) is roughly the height of the mobile header (h-10 = 40px). 
                   This creates a perfect stack where only the "tabs" are visible.
                   
                   DESKTOP:
                   The logic scales naturally because vh increases on desktop.
                */
                top: `calc(5vh + ${index * 35}px)`, 
                zIndex: index + 1,
                marginBottom: "20px", // Reduced margin on mobile
              }}
            >
              <div
                className={`process-card-inner group relative bg-white rounded-xl border border-slate-200 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] md:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 overflow-hidden ${step.borderColor}`}
              >
                {/* RESPONSIVE HEADER HEIGHT */}
                <div className="flex items-center justify-between px-4 md:px-6 py-2 md:py-4 border-b border-slate-100 bg-slate-50/80 backdrop-blur-md select-none h-10 md:h-[60px]">
                  <div className="flex gap-1.5 md:gap-2">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f57] border border-black/5" />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#febc2e] border border-black/5" />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#28c840] border border-black/5" />
                  </div>

                  <div className="flex items-center gap-2 opacity-50">
                    <Hash size={10} className="md:w-3 md:h-3" />
                    <span className="font-mono text-[10px] md:text-[11px] text-slate-500">
                      {step.fileType}
                    </span>
                  </div>

                  <div className="w-8 md:w-10"></div>
                </div>

                {/* CONTENT BODY */}
                <div className="flex flex-col lg:flex-row min-h-[350px] md:min-h-[400px]">
                  
                  {/* LEFT SIDEBAR (Title + Icons) */}
                  <div className="w-full lg:w-1/3 bg-slate-50/30 border-b lg:border-r border-slate-100 p-5 md:p-8 flex flex-col justify-between relative">
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${step.color.split(" ")[0]}`}></div>

                    <div className="flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-4 mb-4 lg:mb-0">
                      <div className="flex items-center justify-between w-full lg:w-auto lg:mb-8">
                        <span className="text-5xl md:text-7xl font-bold text-[#3533CD] opacity-60">
                          {step.id}
                        </span>
                        
                        {/* Icon on Mobile (Right aligned) / Desktop (Below ID) */}
                        <div className={`p-2 md:p-3 md:ml-50 rounded-xl ${step.color} bg-opacity-10 border border-slate-200/60`}>
                          {step.icon}
                        </div>
                      </div>
                      
                      {/* Mobile Only: Quick Tag */}
                      <span className={`lg:hidden text-[10px] uppercase font-bold px-2 py-1 rounded bg-white border border-slate-100 ${step.color.split(" ")[1]}`}>
                        {step.subtitle}
                      </span>
                    </div>

                    {/* Meta Info */}
                    <div className="space-y-4 md:space-y-6">
                      <div className="flex items-start gap-3 md:gap-4">
                        <Clock size={14} className="text-slate-400 mt-1 md:w-4 md:h-4" />
                        <div>
                          <p className="text-[9px] md:text-[10px] uppercase text-slate-400 mb-0.5 md:mb-1">Timeline</p>
                          <p className="text-xs md:text-sm font-semibold text-slate-700">{step.duration}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 md:gap-4">
                        <Users size={14} className="text-slate-400 mt-1 md:w-4 md:h-4" />
                        <div>
                          <p className="text-[9px] md:text-[10px] uppercase text-slate-400 mb-0.5 md:mb-1">Specialists</p>
                          <div className="flex flex-wrap gap-1">
                            {step.team.map((person, i) => (
                              <span key={i} className="text-[10px] md:text-xs bg-white px-1.5 py-0.5 md:px-2 md:py-1 rounded border border-slate-100 shadow-sm text-slate-600">
                                {person}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT CONTENT */}
                  <div className="w-full lg:w-2/3 p-5 md:p-12 flex flex-col justify-center">
                    {/* Subtitle hidden on mobile here to save space, shown in sidebar above */}
                    <span className={`hidden lg:inline-block w-fit px-3 py-1.5 rounded-md text-[10px] uppercase font-bold mb-6 ${step.color.split(" ")[0] + " bg-opacity-10"}`}>
                      {step.subtitle}
                    </span>

                    <h3 className="text-2xl md:text-5xl font-bold text-slate-900 mb-3 md:mb-6">
                      {step.title}
                    </h3>

                    <p className="text-sm md:text-lg text-slate-500 leading-relaxed max-w-xl mb-6 md:mb-10">
                      {step.desc}
                    </p>

                    <div className="flex items-center gap-3 md:gap-4 cursor-pointer group w-fit mt-auto lg:mt-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#3533CD] group-hover:text-white transition-all">
                        <ArrowRight size={18} className="md:w-5 md:h-5" />
                      </div>
                      
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;