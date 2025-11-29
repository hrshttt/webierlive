import React, { useRef, useState } from "react";
import { ArrowUpRight, Instagram, Linkedin } from "lucide-react";

// --- Types ---
interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

// --- Sub Component: Social Link ---
const SocialLink = ({ href, icon, label }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-2 text-black/60 hover:text-[#3533cd] transition-colors duration-300"
    aria-label={label}
  >
    <span className="group-hover:-translate-y-1 transition-transform duration-300">
      {icon}
    </span>
    <span className="font-mono text-xs uppercase tracking-wide hidden md:block">
      {label}
    </span>
  </a>
);

// --- Sub Component: Magnetic Button ---
const MagneticButton = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();

    // Calculate center
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Calculate distance from center
    const dist = { x: clientX - centerX, y: clientY - centerY };

    // Magnetic Pull Strength (0.4 is the intensity)
    setPosition({ x: dist.x * 0.4, y: dist.y * 0.4 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
      className="group relative w-48 h-48 md:w-56 md:h-56 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center cursor-pointer hover:bg-[#3533cd] transition-colors duration-500 ease-out z-20"
    >
      <div className="relative z-10 flex flex-col items-center gap-2 pointer-events-none">
        <span className="font-display text-xl md:text-2xl font-bold uppercase tracking-widest group-hover:scale-110 transition-transform duration-300">
          Start A<br />
          Project
        </span>
        <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-300" />
      </div>

      {/* Ripple Effect on Hover */}
      <div className="absolute inset-0 rounded-full border border-black/10 scale-125 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out" />
      <div className="absolute inset-0 rounded-full border border-black/5 scale-150 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 delay-75 ease-out" />
    </button>
  );
};

// --- Main Component ---
const Contact = () => {
  const email = "webierwebdev@gmail.com";

  return (
    <section
      className="relative w-full bg-white text-black min-h-screen flex flex-col justify-between px-4 md:px-8 lg:px-12 pt-32 pb-8 overflow-hidden font-sans"
      id="contact"
    >
      {/* Background Grid (Subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto flex-1 flex flex-col justify-center items-center text-center">
        {/* Animated Badge */}
        <div className="mb-12 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 backdrop-blur-sm animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3533cd] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFC947]"></span>
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-black/60">
              Available for new projects
            </span>
          </div>
        </div>

        {/* Headline */}
        <h2 className="font-display text-[12vw] md:text-[11rem] font-black leading-[0.8] tracking-tighter uppercase text-[#3533CD] mb-8 mix-blend-difference">
          Let's{" "}
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "2px black" }}
          >
            Talk
          </span>
        </h2>

        {/* Magnetic Email Interaction */}
        <a
          href={`mailto:${email}`}
          className="group relative cursor-pointer inline-flex items-center justify-center gap-4 md:gap-8 hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
        >
          <h3 className="font-sans text-3xl md:text-6xl font-light text-black/80 group-hover:text-[#3533CD] transition-colors duration-300">
            {email}
          </h3>

          {/* Expandable Action Button */}
          <div className="relative h-12 flex items-center justify-center rounded-full bg-[#f6f6fa] group-hover:bg-[#3533CD] transition-all duration-500 w-12 group-hover:w-48 overflow-hidden">
            <ArrowUpRight
              size={20}
              className="absolute text-black/40 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-4 group-hover:scale-0"
            />

            <span className="absolute opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-white text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
              Click to Open Mail
            </span>
          </div>
        </a>

        {/* Magnetic Button Area */}
        <div className="mt-24 mb-24 md:mb-0 w-full flex justify-center h-[200px] items-center">
          <MagneticButton />
        </div>
      </div>

      {/* Footer / Socials */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto border-t border-black/10 pt-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-black/40">
            Socials
          </span>
          <div className="flex gap-8">
            <SocialLink
              href="https://www.instagram.com/webier.in/"
              icon={<Instagram size={20} />}
              label="Instagram"
            />
            <SocialLink
              href="https://www.linkedin.com/company/webierdev/"
              icon={<Linkedin size={20} />}
              label="LinkedIn"
            />
          </div>
        </div>

        <div className="flex flex-col md:items-end gap-2 text-right">
          <p className="font-display text-2xl font-bold uppercase tracking-tight">
            Webier
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
