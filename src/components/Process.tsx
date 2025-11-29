import { ArrowUpRight } from "lucide-react";

/* --------------------------------------------------
   TYPES
-------------------------------------------------- */
interface StepType {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
}

/* --------------------------------------------------
   DATA
-------------------------------------------------- */
const steps: StepType[] = [
  {
    id: "01",
    title: "Discovery",
    subtitle: "The Foundation",
    desc: "We don't start with code; we start with questions. We immerse ourselves in your ecosystem to uncover the raw truths of your business. This isn't just about requirements gathering—it's about understanding the 'why' behind the 'what'.",
    tags: ["Market Research", "Stakeholder Interviews", "Competitor Audit"],
  },
  {
    id: "02",
    title: "Strategy",
    subtitle: "The Blueprint",
    desc: "Data meets intuition. We build a strategic roadmap that defines not just where we're going, but exactly how we'll get there. We define user personas, map out journeys, and establish the technical architecture.",
    tags: ["User Journey Maps", "Information Architecture", "Tech Stack Selection"],
  },
  {
    id: "03",
    title: "Design",
    subtitle: "Visual Language",
    desc: "We strip away the noise to reveal the signal. Our design phase focuses on creating intuitive, beautiful interfaces that feel inevitable. We prototype, test, and iterate until every interaction feels natural.",
    tags: ["UI/UX Design", "Design Systems", "Interactive Prototyping"],
  },
  {
    id: "04",
    title: "Development",
    subtitle: "The Engine",
    desc: "Clean, scalable, and secure. We translate designs into fluid digital experiences using modern architectures. We prioritize performance, accessibility, and clean code that scales with your business.",
    tags: ["React / Next.js", "API Integration", "Performance Optimization"],
  },
  {
    id: "05",
    title: "Launch",
    subtitle: "Liftoff",
    desc: "Deployment is just the beginning. We manage the launch process with military precision, ensuring zero downtime. Post-launch, we monitor analytics and user feedback to continuously refine the product.",
    tags: ["QA Testing", "Cloud Deployment", "Analytics Setup"],
  },
];

/* --------------------------------------------------
   COMPONENT
-------------------------------------------------- */

const Process = () => {
  return (
    <section
      className="relative w-full bg-[#f6f6fa] text-black py-16 md:py-24 px-4 md:px-12 lg:px-24"
      id="process"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:items-end md:text-left mb-12 md:mb-20 border-b border-black/10 pb-8">
          <div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter text-[#3533CD]  leading-[0.9]">
              Our <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Process
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-4 mt-6 md:mt-0 justify-center md:justify-start">
            <span className="w-2 h-2 bg-[#FFC947] rounded-full animate-ping"></span>
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-black/50">
              / Workflow Engine
            </p>
          </div>
        </div>

        {/* List Container */}
        {/* MOBILE: Flex Col with Gap | DESKTOP: Border Top, No Gap */}
        <div className="flex flex-col gap-4 md:gap-0 md:border-t md:border-black/10">
          {steps.map((step: StepType) => (
            <div
              key={step.id}
              className="
                group relative transition-all duration-500 
                
                /* MOBILE CARD STYLES */
                bg-white rounded-2xl p-6 border border-black/5 shadow-sm
                
                /* DESKTOP LIST STYLES (Resets mobile styles) */
                md:bg-transparent md:rounded-none md:p-0 md:border-b md:border-black/10 md:shadow-none md:hover:bg-white
              "
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 md:gap-8 lg:gap-20 md:py-16 md:px-4">
                
                {/* Step Number */}
                <div className="flex items-center justify-between md:block mb-2 md:mb-0">
                  <span className="font-display text-5xl md:text-6xl lg:text-8xl font-black text-black/5 group-hover:text-[#3533cd] transition-colors duration-300 select-none">
                    {step.id}
                  </span>
                  
                  {/* Mobile Only Arrow (Visual cue) */}
                  <div className="md:hidden w-8 h-8 rounded-full bg-black/5 flex items-center justify-center">
                    <ArrowUpRight size={16} className="text-black/40" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col pt-0 lg:pt-2">
                  <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 mb-4 md:mb-6">
                    <h3 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-black uppercase tracking-tight group-hover:translate-x-0 lg:group-hover:translate-x-2 transition-transform duration-300">
                      {step.title}
                    </h3>
                    <span className="font-serif italic text-base md:text-xl text-black/40">
                      {step.subtitle}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
                    <p className="font-sans text-sm md:text-xl text-black/60 leading-relaxed font-light">
                      {step.desc}
                    </p>

                    {/* Tags */}
                    <div className="mt-2 md:mt-0 pt-4 md:pt-0 border-t border-black/5 md:border-none">
                      <h4 className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-black/30 mb-3 md:mb-4">
                        Deliverables
                      </h4>

                      <div className="flex flex-wrap gap-2">
                        {step.tags.map((tag: string, i: number) => (
                          <span
                            key={i}
                            className="px-2 py-1 md:px-3 bg-[#f6f6fa] border border-black/5 rounded-full font-mono text-[10px] md:text-xs uppercase tracking-wide text-black/60 group-hover:border-[#3533cd]/20 group-hover:text-[#3533cd] transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Arrow Icon */}
                <div className="hidden lg:block pt-4">
                  <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#3533cd] group-hover:border-transparent transition-all duration-300">
                    <ArrowUpRight
                      className="text-black/40 group-hover:text-white transition-colors"
                      size={24}
                    />
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

export default Process;