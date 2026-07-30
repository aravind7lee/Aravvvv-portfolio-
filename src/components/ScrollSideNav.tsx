import { useEffect, useState } from 'react';

interface NavSection {
  id: string;
  label: string;
  number: string;
}

interface ScrollSideNavProps {
  theme: 'red' | 'blue';
  sections?: NavSection[];
}

const DEFAULT_SECTIONS: NavSection[] = [
  { id: 'hero', label: 'HERO', number: '01' },
  { id: 'about', label: 'ABOUT', number: '02' },
  { id: 'sections-pro', label: 'CINEMA', number: '03' },
  { id: 'experience', label: 'EXP', number: '04' },
  { id: 'skills-mastery', label: 'SKILLS', number: '05' },
  { id: 'works', label: 'WORKS', number: '06' },
  { id: 'contact', label: 'CONTACT', number: '07' },
];

export default function ScrollSideNav({
  theme,
  sections = DEFAULT_SECTIONS,
}: ScrollSideNavProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || 'hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const primaryBgClass = theme === 'red' ? 'bg-red-500' : 'bg-blue-600';
  const primaryBorderClass = theme === 'red' 
    ? 'border-red-500 shadow-xl' 
    : 'border-blue-600 shadow-xl';

  return (
    <nav 
      aria-label="Scroll Side Navigation"
      className="fixed right-3 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-4 md:gap-6 pointer-events-auto select-none"
    >
      {/* Background Vertical Laser Guide Track */}
      <div className="absolute right-[9px] md:right-[11px] top-3 bottom-3 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent pointer-events-none" />

      {sections.map((sec) => {
        const isActive = activeSection === sec.id;

        return (
          <div
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className="group relative flex items-center cursor-pointer p-1 md:p-1"
          >
            {/* Desktop / Tablet Label Badge */}
            <div 
              className={`hidden md:block mr-3.5 transition-all duration-500 cubic-bezier(0.16,1,0.3,1) ${
                isActive 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              <div 
                className={`px-3.5 py-1.5 rounded-full bg-black/90 backdrop-blur-xl border flex items-center gap-2.5 transition-all duration-300 shadow-2xl ${
                  isActive ? primaryBorderClass : 'border-white/15 group-hover:border-white/35'
                }`}
              >
                <span 
                  className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isActive 
                      ? (theme === 'red' ? 'bg-red-500/20 text-red-400' : 'bg-[#0044ff]/20 text-[#6699ff]') 
                      : 'bg-white/10 text-gray-400'
                  }`}
                >
                  {sec.number}
                </span>
                <span className="font-mono text-[11px] tracking-[0.2em] text-white uppercase font-bold">
                  {sec.label}
                </span>
              </div>
            </div>

            {/* Mobile Compact Label Badge (Renders on mobile screens) */}
            <div 
              className={`block md:hidden mr-2 transition-all duration-300 ${
                isActive 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              <div 
                className={`px-2.5 py-1 rounded-full bg-black/95 backdrop-blur-md border flex items-center gap-1.5 shadow-xl ${
                  isActive ? (theme === 'red' ? 'border-red-500/50' : 'border-[#0044ff]/50') : 'border-white/20'
                }`}
              >
                <span 
                  className={`font-mono text-[9px] font-bold ${
                    theme === 'red' ? 'text-red-400' : 'text-[#6699ff]'
                  }`}
                >
                  {sec.number}
                </span>
                <span className="font-mono text-[9px] tracking-wider text-white uppercase font-bold">
                  {sec.label}
                </span>
              </div>
            </div>

            {/* Target HUD Node & Indicator Bar */}
            <div className="relative flex items-center justify-end w-6 md:w-12 h-5 md:h-6">
              {isActive ? (
                <>
                  {/* Glowing Laser Bar (Desktop) */}
                  <div 
                    className={`hidden md:block h-[2px] w-8 rounded-full bg-gradient-to-r from-transparent ${
                      theme === 'red' ? 'to-red-500' : 'to-[#0044ff]'
                    }`}
                  />
                  {/* Outer HUD Ring Node */}
                  <div className={`relative w-4 h-4 md:w-5 md:h-5 rounded-full border flex items-center justify-center bg-zinc-950 ${
                    theme === 'red' ? 'border-red-500' : 'border-blue-600'
                  }`}>
                    {/* Animated Pulsing Core */}
                    <span className={`animate-ping absolute inline-flex h-2 w-2 md:h-2.5 md:w-2.5 rounded-full opacity-75 ${primaryBgClass}`} />
                    <span className={`relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 ${primaryBgClass}`} />
                  </div>
                </>
              ) : (
                /* Inactive Bar Indicator */
                <div className="w-full flex justify-end items-center pr-0.5 md:pr-1.5">
                  <div className="w-3 md:w-5 h-[2px] bg-white/25 group-hover:bg-white/80 group-hover:w-4 md:group-hover:w-8 transition-all duration-300 rounded-full" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
