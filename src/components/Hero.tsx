import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, Flame, ShieldAlert, ChevronDown, Terminal } from 'lucide-react';
import heroRedPill from '../assets/Hero-RedPill.png';
import heroBluePill from '../assets/Hero-BluePill.png';

interface HeroProps {
  theme: 'red' | 'blue';
  onThemeChange: (theme: 'selection' | 'red' | 'blue') => void;
}

export default function Hero({ theme, onThemeChange }: HeroProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [imageReady, setImageReady] = useState(false);
  const isRed = theme === 'red';

  const heroImage = isRed ? heroRedPill : heroBluePill;

  // Pre-decode & ensure image is 100% ready before triggering cinematic reveal
  useEffect(() => {
    setImageReady(false);
    const img = new Image();
    img.src = heroImage;
    if (img.complete) {
      setImageReady(true);
    } else {
      img.onload = () => setImageReady(true);
      if (img.decode) {
        img.decode().then(() => setImageReady(true)).catch(() => setImageReady(true));
      }
    }
  }, [heroImage]);

  // AURA Cinematic Reveal Sequence
  useEffect(() => {
    if (!imageReady) return;
    const tl = gsap.timeline();

    tl.fromTo(
      imageRef.current,
      { scale: 1.15, opacity: 0, filter: 'blur(12px) brightness(0.5)' },
      { scale: 1, opacity: 1, filter: 'blur(0px) brightness(0.95)', duration: 1.4, ease: 'power3.out' }
    );

    if (textRef.current) {
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0.3
      );
    }
  }, [imageReady, theme]);

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-[#030304]">
      {/* Background Volumetric Atmosphere Beam */}
      <div
        className={`absolute inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${
          isRed
            ? 'bg-[radial-gradient(ellipse_at_center,_rgba(235,20,50,0.15)_0%,_rgba(3,3,4,0.95)_75%)]'
            : 'bg-[radial-gradient(ellipse_at_center,_rgba(0,102,255,0.15)_0%,_rgba(3,3,4,0.95)_75%)]'
        }`}
      />

      {/* Background Hero Image with Pre-Decode Protection */}
      <img
        ref={imageRef}
        src={heroImage}
        onLoad={() => setImageReady(true)}
        alt={`Hero ${theme} pill`}
        className={`absolute inset-0 w-full h-full object-contain object-center z-10 transition-opacity duration-500 ${
          imageReady ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Top Header Controls */}
      <header className="absolute top-4 sm:top-6 left-0 right-0 z-[50] px-4 sm:px-6 md:px-12 flex items-center justify-between gap-2 pointer-events-none">
        {/* Left Control: Reselect */}
        <button
          onClick={() => onThemeChange('selection')}
          className="pointer-events-auto group flex items-center gap-2 px-4 py-2 rounded-full bg-black border border-white/20 hover:border-white/40 text-zinc-300 hover:text-white transition-all duration-300 active:scale-95 cursor-pointer shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold">
            RESELECT PROTOCOL
          </span>
        </button>

        {/* Center Badge (Clean Solid Monochrome with Theme Highlight) */}
        {isRed ? (
          <div className="hidden lg:flex pointer-events-auto items-center gap-2.5 px-4 py-1.5 rounded-full bg-black border border-red-500/40 shadow-lg">
            <Flame className="w-4 h-4 text-red-500" />
            <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-white uppercase">
              CRIMSON PROTOCOL ACTIVE
            </span>
          </div>
        ) : (
          <div className="hidden lg:flex pointer-events-auto items-center gap-2.5 px-4 py-1.5 rounded-full bg-black border border-blue-500/40 shadow-lg">
            <Terminal className="w-4 h-4 text-blue-500" />
            <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-white uppercase">
              COBALT PROTOCOL ACTIVE
            </span>
          </div>
        )}

        {/* Right Control: Dual Theme Switcher */}
        <div className="pointer-events-auto flex items-center p-1.5 rounded-full bg-black border border-white/20 shadow-lg">
          <button
            onClick={() => onThemeChange('red')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              isRed
                ? 'bg-red-500 text-white font-bold'
                : 'hover:bg-zinc-900 text-zinc-400 hover:text-red-400'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isRed ? 'bg-white' : 'bg-red-500/50'
              }`}
            />
            <span className="font-mono text-xs uppercase tracking-widest font-bold">
              RED PILL
            </span>
          </button>

          <div className="w-[1px] h-4 bg-zinc-800 mx-1" />

          <button
            onClick={() => onThemeChange('blue')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              !isRed
                ? 'bg-blue-600 text-white font-bold'
                : 'hover:bg-zinc-900 text-zinc-400 hover:text-blue-400'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                !isRed ? 'bg-white' : 'bg-blue-500/50'
              }`}
            />
            <span className="font-mono text-xs uppercase tracking-widest font-bold">
              BLUE PILL
            </span>
          </button>
        </div>
      </header>

      {/* Bottom Floating Card: Clean Solid Card, No Neon Shadows */}
      <div
        ref={textRef}
        className="absolute bottom-8 left-4 sm:left-6 md:left-12 z-20 pointer-events-none hidden sm:block"
      >
        <div
          className={`p-5 rounded-2xl bg-zinc-950 border shadow-xl max-w-sm space-y-2 ${
            isRed ? 'border-red-500/30' : 'border-blue-500/30'
          }`}
        >
          <div className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-widest uppercase">
            {isRed ? (
              <>
                <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
                <span className="text-red-400">CRIMSON ARCHITECTURE</span>
              </>
            ) : (
              <>
                <Terminal className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-blue-400">COBALT ARCHITECTURE</span>
              </>
            )}
          </div>
          <p className="text-xs font-mono text-zinc-300 leading-relaxed">
            Full-Stack Software Engineer & Creative UI Architect building high-performance web applications.
          </p>
        </div>
      </div>

      {/* Scroll Down Cue */}
      <div className="absolute bottom-6 right-6 md:right-12 z-20 pointer-events-none flex flex-col items-center gap-1.5 font-mono text-[10px] font-bold text-zinc-500 tracking-[0.25em] uppercase">
        <span>SCROLL DOWN</span>
        <ChevronDown
          className={`w-4 h-4 animate-bounce ${
            isRed ? 'text-red-500' : 'text-blue-500'
          }`}
        />
      </div>
    </section>
  );
}
