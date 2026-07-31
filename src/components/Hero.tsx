import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ShieldAlert, ChevronDown, Terminal } from 'lucide-react';
import heroRedPill from '../assets/Hero-RedPill.png';
import heroBluePill from '../assets/Hero-BluePill.png';

interface HeroProps {
  theme: 'red' | 'blue';
}

export default function Hero({ theme }: HeroProps) {
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
