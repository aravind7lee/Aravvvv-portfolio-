import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Sparkles, Award, Terminal, ShieldAlert } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  theme: 'red' | 'blue';
}

export default function About({ theme }: AboutProps) {
  const isRed = theme === 'red';
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const primaryColorClass = isRed ? 'text-red-500' : 'text-blue-500';
  const primaryBgClass = isRed ? 'bg-red-500' : 'bg-blue-600';
  const primaryBorderClass = isRed ? 'border-red-500/40' : 'border-blue-500/40';

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        once: true,
      },
    });

    tl.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
    )
      .fromTo(
        textRef.current?.children as HTMLCollection,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(
        statsRef.current?.children as HTMLCollection,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        ctaRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
        '-=0.3'
      );

    tl.fromTo(
      lineRef.current,
      { scaleY: 0 },
      { scaleY: 1, duration: 0.8, ease: 'power3.inOut' },
      '<'
    ).fromTo(
      timelineRef.current?.children as HTMLCollection,
      { x: 25, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out' },
      '<+=0.1'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="about-content"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black py-24 md:py-32 flex items-center overflow-hidden border-t border-zinc-900"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col pt-2">
            {/* Identity Tag */}
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${primaryBgClass}`}
                />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${primaryBgClass}`} />
              </span>
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-zinc-400 font-bold flex items-center gap-2">
                {isRed ? (
                  <>
                    <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
                    <span>IDENTITY // CRIMSON ARCHITECTURE</span>
                  </>
                ) : (
                  <>
                    <Terminal className="w-3.5 h-3.5 text-blue-500" />
                    <span>IDENTITY // COBALT ARCHITECTURE</span>
                  </>
                )}
              </span>
            </div>

            {/* Headline */}
            <h2
              ref={titleRef}
              className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-[1.2] mb-6 uppercase"
            >
              Architecting high-performance systems with{' '}
              <span className={primaryColorClass}>precision.</span>
            </h2>

            {/* Body Text */}
            <div
              ref={textRef}
              className="space-y-4 font-sans text-zinc-300 text-sm sm:text-base font-normal leading-relaxed max-w-xl"
            >
              <p>
                As an MCA graduate, I specialize in engineering robust SaaS products and AI-driven platforms. My focus lies at the intersection of high-performance backend architecture and seamless, accessible frontend execution.
              </p>
              <p>
                With a foundation built on three professional internships and multiple production deployments across the MERN/PERN stack, I approach every project with a problem-solving mindset.
              </p>

              {/* Stack Badges */}
              <div className="pt-2 flex flex-wrap gap-2">
                {['MERN / PERN STACK', 'SAAS ARCHITECTURE', 'AI PLATFORMS', 'SYSTEM DESIGN'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-[10px] font-mono font-semibold tracking-wider uppercase rounded-full text-zinc-300 border border-zinc-800 bg-zinc-900/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div
              ref={statsRef}
              className="flex flex-wrap gap-8 sm:gap-12 mt-8 pt-6 border-t border-zinc-800"
            >
              <div className="flex flex-col group cursor-default">
                <span className="font-sans text-3xl sm:text-4xl font-black text-white mb-1">
                  10<span className={primaryColorClass}>+</span>
                </span>
                <div className="flex items-center gap-2 text-zinc-400 font-mono text-[11px] uppercase tracking-widest">
                  <span className={primaryColorClass}>✦</span> Projects Built
                </div>
              </div>

              <div className="flex flex-col group cursor-default">
                <span className="font-sans text-3xl sm:text-4xl font-black text-white mb-1">
                  3
                </span>
                <div className="flex items-center gap-2 text-zinc-400 font-mono text-[11px] uppercase tracking-widest">
                  <span className={primaryColorClass}>⎋</span> Internships
                </div>
              </div>

              <div className="flex flex-col group cursor-default">
                <span className="font-sans text-3xl sm:text-4xl font-black text-white mb-1">
                  100<span className={primaryColorClass}>%</span>
                </span>
                <div className="flex items-center gap-2 text-zinc-400 font-mono text-[11px] uppercase tracking-widest">
                  <span className={primaryColorClass}>★</span> Commitment
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div ref={ctaRef} className="mt-8">
              <a
                href="#contact"
                className={`group inline-flex items-center gap-3 px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] font-bold text-white transition-all duration-300 cursor-pointer rounded-full shadow-lg ${
                  isRed
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <span>GET IN TOUCH</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Timeline Cards */}
          <div className="lg:col-span-5 flex flex-col pt-4 mt-8 lg:mt-0">
            <div className="flex flex-col relative">
              <div
                ref={lineRef}
                className={`absolute top-0 bottom-0 left-[6px] w-[2px] origin-top ${
                  isRed ? 'bg-red-500/80' : 'bg-blue-600/80'
                }`}
              />

              <div ref={timelineRef} className="flex flex-col space-y-6">
                {/* MCA Item */}
                <div className="relative pl-8 p-5 -ml-3 rounded-2xl bg-zinc-950 border border-zinc-800">
                  <div
                    className={`absolute left-[-5px] top-6 w-[12px] h-[12px] bg-black border ${primaryBorderClass}`}
                  />
                  <span className={`font-mono text-xs tracking-[0.2em] uppercase mb-1 block ${primaryColorClass}`}>
                    2023 – 2025
                  </span>
                  <h3 className="font-sans text-2xl text-white font-black mb-1 uppercase tracking-tight">
                    MCA
                  </h3>
                  <p className="text-xs text-zinc-400 mb-3 font-mono uppercase">
                    SRM Institute of Science and Technology
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-900 border border-zinc-800 text-white">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>CGPA: <strong>9.73</strong></span>
                    <Award className="w-3.5 h-3.5 text-amber-400 ml-1" />
                  </div>
                </div>

                {/* BCA Item */}
                <div className="relative pl-8 p-5 -ml-3 rounded-2xl bg-zinc-950 border border-zinc-800">
                  <div
                    className={`absolute left-[-5px] top-6 w-[12px] h-[12px] bg-black border ${primaryBorderClass}`}
                  />
                  <span className={`font-mono text-xs tracking-[0.2em] uppercase mb-1 block ${primaryColorClass}`}>
                    2020 – 2023
                  </span>
                  <h3 className="font-sans text-2xl text-white font-black mb-1 uppercase tracking-tight">
                    BCA
                  </h3>
                  <p className="text-xs text-zinc-400 mb-3 font-mono uppercase">
                    SRM Institute of Science and Technology
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-900 border border-zinc-800 text-white">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>CGPA: <strong>9.30</strong></span>
                    <Award className="w-3.5 h-3.5 text-amber-400 ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
