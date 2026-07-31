import { useEffect, useState } from 'react';
import { Compass, X, ChevronRight, Navigation } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const isRed = theme === 'red';
  const primaryBgClass = isRed ? 'bg-red-500' : 'bg-blue-600';
  const primaryTextClass = isRed ? 'text-red-500' : 'text-blue-500';
  const primaryBorderClass = isRed
    ? 'border-red-500 shadow-xl'
    : 'border-blue-600 shadow-xl';

  const activeSectionObj = sections.find((s) => s.id === activeSection) || sections[0];

  return (
    <>
      {/* DESKTOP / TABLET SIDE NAV RAIL */}
      <nav
        aria-label="Scroll Side Navigation Desktop"
        className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col items-end gap-6 pointer-events-auto select-none"
      >
        {/* Background Vertical Laser Guide Track */}
        <div className="absolute right-[11px] top-3 bottom-3 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent pointer-events-none" />

        {sections.map((sec) => {
          const isActive = activeSection === sec.id;

          return (
            <div
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="group relative flex items-center cursor-pointer p-1"
            >
              {/* Label Badge */}
              <div
                className={`mr-3.5 transition-all duration-500 cubic-bezier(0.16,1,0.3,1) ${
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
                        ? isRed
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-[#0044ff]/20 text-[#6699ff]'
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

              {/* Target HUD Node & Indicator Bar */}
              <div className="relative flex items-center justify-end w-12 h-6">
                {isActive ? (
                  <>
                    <div
                      className={`h-[2px] w-8 rounded-full bg-gradient-to-r from-transparent ${
                        isRed ? 'to-red-500' : 'to-[#0044ff]'
                      }`}
                    />
                    <div
                      className={`relative w-5 h-5 rounded-full border flex items-center justify-center bg-zinc-950 ${
                        isRed ? 'border-red-500' : 'border-blue-600'
                      }`}
                    >
                      <span
                        className={`animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full opacity-75 ${primaryBgClass}`}
                      />
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${primaryBgClass}`} />
                    </div>
                  </>
                ) : (
                  <div className="w-full flex justify-end items-center pr-1.5">
                    <div className="w-5 h-[2px] bg-white/25 group-hover:bg-white/80 group-hover:w-8 transition-all duration-300 rounded-full" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </nav>

      {/* MOBILE FLOATING NAV BUTTON (Visible on Mobile screens) */}
      <div className="block md:hidden fixed bottom-5 right-5 z-[999] pointer-events-auto">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Mobile Navigation Drawer"
          className={`flex items-center gap-2 px-4 py-3 rounded-full bg-zinc-950/95 backdrop-blur-2xl border shadow-2xl transition-all duration-300 active:scale-95 ${
            mobileMenuOpen
              ? 'border-white text-white'
              : isRed
              ? 'border-red-500/80 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]'
              : 'border-blue-500/80 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]'
          }`}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Compass className={`w-5 h-5 animate-spin-slow ${primaryTextClass}`} />
          )}

          <div className="flex items-center gap-1.5 font-mono text-xs font-bold">
            <span className={primaryTextClass}>{activeSectionObj.number}</span>
            <span className="text-white/40">//</span>
            <span className="text-white tracking-wider uppercase">{activeSectionObj.label}</span>
          </div>
        </button>
      </div>

      {/* MOBILE MENU DRAWER MODAL */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[990] md:hidden animate-in fade-in duration-200"
          />

          {/* Floating Drawer Container */}
          <div className="fixed inset-x-4 bottom-20 z-[995] md:hidden bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 rounded-2xl p-5 shadow-2xl space-y-4 animate-in slide-in-from-bottom-6 duration-300">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-zinc-400">
                <Navigation className={`w-4 h-4 ${primaryTextClass}`} />
                <span>SELECT MATRIX SECTION</span>
              </div>
              <span className="font-mono text-[10px] font-bold text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded">
                7 ZONES
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto no-scrollbar">
              {sections.map((sec) => {
                const isActive = activeSection === sec.id;

                return (
                  <button
                    key={`mobile-nav-${sec.id}`}
                    onClick={() => {
                      scrollToSection(sec.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl border text-left transition-all duration-200 ${
                      isActive
                        ? isRed
                          ? 'border-red-500/80 bg-red-500/15 text-white shadow-lg'
                          : 'border-blue-500/80 bg-blue-600/15 text-white shadow-lg'
                        : 'border-zinc-800/80 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 font-mono">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded ${
                          isActive
                            ? isRed
                              ? 'bg-red-500/30 text-red-400'
                              : 'bg-blue-600/30 text-blue-400'
                            : 'bg-zinc-800 text-zinc-500'
                        }`}
                      >
                        {sec.number}
                      </span>
                      <span className="text-xs font-bold tracking-widest uppercase">
                        {sec.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isActive && (
                        <span className={`w-2 h-2 rounded-full animate-ping ${primaryBgClass}`} />
                      )}
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-600'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
