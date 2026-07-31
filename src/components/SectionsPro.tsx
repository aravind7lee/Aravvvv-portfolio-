import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Eye, Film, Layers, Compass } from 'lucide-react';

import defaultRevealImg from '../assets/sections_pro/reveal_hero.png';

gsap.registerPlugin(ScrollTrigger);

export interface SectionsProProps {
  /** Section HTML element ID for scroll-linking and side navigation */
  id?: string;
  sectionId?: string;

  /** Fully editable heading text */
  headingText?: string;
  heading?: string;

  /** Fully editable subheading or tagline */
  subheading?: string;
  subtitle?: string;

  /** Swappable reveal image URL or import */
  revealImage?: string;
  image?: string;

  /** Customizable background color (Hex, RGB, or CSS color string) */
  bgColor?: string;

  /** Text & Accent Theme ('red' | 'blue') */
  theme?: 'red' | 'blue';

  /** Editable description paragraph */
  description?: string;

  /** Editable tags / metadata pills */
  tags?: string[];

  /** Editable CTA label */
  ctaText?: string;

  /** Editable CTA link */
  ctaLink?: string;

  /** Optional badge text header */
  badge?: string;

  /** Optional custom child components */
  children?: React.ReactNode;

  /** Section pinning scroll height (e.g. '220vh', '300vh') */
  height?: string;

  /** Additional custom class names */
  className?: string;
}

export default function SectionsPro({
  id = 'sections-pro',
  sectionId,
  headingText,
  heading,
  subheading,
  subtitle,
  revealImage,
  image,
  bgColor = '#000000',
  theme = 'red',
  description,
  tags,
  ctaText = 'EXPLORE SECTIONS PRO',
  ctaLink = '#works',
  badge = 'SECTIONS PRO • CINEMATIC REVEAL',
  children,
  height = '450vh',
  className = '',
}: SectionsProProps) {
  const effectiveId = sectionId || id;
  const mainHeading = headingText || heading || 'CINEMATIC SCROLL REVEAL';
  const mainSubheading = subheading || subtitle || 'EDITORIAL IMAGE BLEED THROUGH BOLD TYPOGRAPHY';
  const activeImage = revealImage || image || defaultRevealImg;
  const mainDescription =
    description ||
    'Sections Pro is a premium section component that reveals high-resolution imagery through bold, editorial typography as the user scrolls. The image bleeds through the letterforms before expanding into a full cinematic moment.';

  const defaultTags = tags || ['Scroll-Reveal', 'Framer Quality', 'GSAP Scrub', 'Responsive', '4K Image Bleed'];

  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const textMaskRef = useRef<HTMLHeadingElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const contentCardRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const isRed = theme === 'red';
  const primaryTextColor = isRed ? 'text-red-500' : 'text-[#0044ff]';
  const primaryBgColor = isRed ? 'bg-red-500' : 'bg-[#0044ff]';
  const buttonStyle = isRed
    ? 'bg-red-500 text-white hover:bg-red-600 shadow-[0_0_25px_rgba(239,68,68,0.4)]'
    : 'bg-[#0044ff] text-white hover:bg-blue-600 shadow-[0_0_25px_rgba(0,68,255,0.4)]';

  useEffect(() => {
    const container = containerRef.current;
    const pinEl = pinRef.current;
    const textMask = textMaskRef.current;
    const bgLayer = bgLayerRef.current;
    const contentCard = contentCardRef.current;
    const badgeEl = badgeRef.current;
    const subtitleEl = subtitleRef.current;
    const progressTextEl = progressTextRef.current;
    const progressBarEl = progressBarRef.current;

    if (!container || !pinEl) return;

    const ctx = gsap.context(() => {
      // Create ScrollTrigger scrub timeline pinned to container with buttery smooth inertia
      const st = ScrollTrigger.create({
        trigger: container,
        pin: pinEl,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;

          if (progressTextEl) {
            progressTextEl.innerText = `${Math.round(progress * 100)}%`;
          }
          if (progressBarEl) {
            progressBarEl.style.width = `${progress * 100}%`;
          }

          // 1. Gradual text mask zoom & inner image bleed (Phase: 0.0 -> 0.85)
          if (textMask) {
            const textScale = 1 + progress * 0.55;
            const textOpacity = progress > 0.88 ? Math.max(0, (1 - progress) * 8.33) : 1;
            const bgSize = 130 + progress * 90;
            const bgPosY = 50 + (progress - 0.5) * 20;

            gsap.set(textMask, {
              scale: textScale,
              opacity: textOpacity,
              backgroundSize: `${bgSize}%`,
              backgroundPosition: `center ${bgPosY}%`,
            });
          }

          // 2. Full background image unclip / opacity reveal behind typography (Phase: 0.35 -> 0.75)
          if (bgLayer) {
            const bgOpacity = gsap.utils.clamp(0, 1, (progress - 0.35) * 2.5);
            const bgScale = 1.2 - progress * 0.15;
            gsap.set(bgLayer, {
              opacity: bgOpacity,
              scale: bgScale,
            });
          }

          // 3. Editorial content card reveal (Phase: 0.5 -> 0.9)
          if (contentCard) {
            const cardY = gsap.utils.clamp(0, 60, (1 - (progress - 0.5) * 2.5) * 60);
            const cardOpacity = gsap.utils.clamp(0, 1, (progress - 0.5) * 2.8);
            gsap.set(contentCard, {
              y: cardY,
              opacity: cardOpacity,
            });
          }

          // 4. Header Badge & Subtitle
          if (badgeEl) {
            const badgeOpacity = gsap.utils.clamp(0, 1, progress * 3);
            const badgeY = (1 - Math.min(1, progress * 2.5)) * -15;
            gsap.set(badgeEl, {
              opacity: badgeOpacity,
              y: badgeY,
            });
          }
          if (subtitleEl) {
            const subOpacity = gsap.utils.clamp(0, 1, progress * 3);
            const subY = (1 - Math.min(1, progress * 2.5)) * 15;
            gsap.set(subtitleEl, {
              opacity: subOpacity,
              y: subY,
            });
          }
        },
      });

      ScrollTrigger.refresh();
      return () => st.kill();
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [effectiveId, height]);

  return (
    <section
      id={effectiveId}
      ref={containerRef}
      className={`relative w-full text-white select-none overflow-hidden ${className}`}
      style={{
        backgroundColor: bgColor,
        minHeight: height,
      }}
    >
      {/* Pinned Cinematic Scroll Viewport */}
      <div
        ref={pinRef}
        className="relative w-full h-screen flex flex-col justify-between items-center overflow-hidden py-8 px-4 md:px-12 z-10"
        style={{ backgroundColor: bgColor }}
      >
        {/* Editorial Top Navigation & Badge Header */}
        <div
          ref={badgeRef}
          className="relative z-40 w-full max-w-7xl mx-auto flex items-center justify-between border-b border-white/10 pb-4"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${primaryBgColor}`} />
              <span className={`relative inline-flex rounded-full h-3 w-3 ${primaryBgColor}`} />
            </span>
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-white/80 uppercase flex items-center gap-2">
              <Film className="w-3.5 h-3.5 text-white/70" />
              {badge}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 font-mono text-xs text-white/60 bg-zinc-950/90 px-4 py-1.5 rounded-full border border-white/15 backdrop-blur-md shadow-xl">
            <span className="text-white/40">SCROLL REVEAL</span>
            <span ref={progressTextRef} className={`font-bold ${primaryTextColor}`}>
              0%
            </span>
          </div>
        </div>

        {/* Backdrop Layer: Revealed Image expanding behind typography */}
        <div
          ref={bgLayerRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-0 transition-opacity duration-300"
        >
          <img
            src={activeImage}
            alt={mainHeading}
            className="w-full h-full object-cover object-center filter brightness-[0.5] contrast-[1.15]"
          />
          {/* Subtle Dark Vignette & Gradient Overlays */}
          <div className={`absolute inset-0 bg-gradient-to-t ${isRed ? 'from-black via-black/50 to-red-950/30' : 'from-black via-black/50 to-blue-950/30'}`} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black" />
        </div>

        {/* Central Bold Typography with Image Bleed Mask */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 px-4 text-center">
          <p
            ref={subtitleRef}
            className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-zinc-400 font-bold mb-4 flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-zinc-500" />
            {mainSubheading}
          </p>

          <h1
            ref={textMaskRef}
            className="text-[13vw] sm:text-[11vw] lg:text-[9vw] font-black leading-[0.88] uppercase tracking-tighter select-none transition-all duration-75 max-w-6xl font-sans"
            style={{
              backgroundImage: `url(${activeImage})`,
              backgroundSize: '160%',
              backgroundPosition: 'center center',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: isRed
                ? 'drop-shadow(0 0 35px rgba(239, 68, 68, 0.45)) drop-shadow(0 20px 30px rgba(0,0,0,0.9))'
                : 'drop-shadow(0 0 35px rgba(0, 68, 255, 0.45)) drop-shadow(0 20px 30px rgba(0,0,0,0.9))',
              textShadow: '0 0 1px rgba(255,255,255,0.1)',
            }}
          >
            {mainHeading}
          </h1>

          <div className="mt-6 flex items-center gap-2 text-white/40 font-mono text-[11px] uppercase tracking-widest">
            <span>[ SCROLL DOWN TO UNCLIP IMAGE ]</span>
          </div>
        </div>

        {/* Editorial Floating Content Card (Appears as user scrubs past 40%) */}
        <div
          ref={contentCardRef}
          className="relative z-30 w-full max-w-5xl mx-auto my-auto opacity-0 translate-y-12 transition-all duration-300 pointer-events-auto"
        >
          <div className="bg-zinc-950/90 backdrop-blur-2xl p-6 sm:p-8 md:p-10 rounded-3xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-sans">
                {mainHeading}
              </h2>

              <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                {mainDescription}
              </p>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {defaultTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg text-[11px] font-mono font-semibold bg-zinc-900/90 text-white/90 border border-white/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 2: Interactive Action & Mini Preview */}
            <div className="md:col-span-4 flex flex-col justify-between items-center md:items-end gap-6 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
              <div className="w-full relative aspect-video rounded-xl overflow-hidden border border-white/15 bg-black shadow-lg group">
                <img
                  src={activeImage}
                  alt="Section Reveal Preview"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5 bg-black/80 px-3 py-1 rounded-full border border-white/20">
                    <Eye className="w-3.5 h-3.5" /> REVEAL ACTIVE
                  </span>
                </div>
              </div>

              <a
                href={ctaLink}
                className={`group w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 ${buttonStyle}`}
              >
                <span>{ctaText}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Custom Child Elements (if passed) */}
        {children && (
          <div className="relative z-30 w-full max-w-7xl mx-auto pointer-events-auto">
            {children}
          </div>
        )}

        {/* Bottom Editorial Scroll Track Indicator */}
        <div className="relative z-40 w-full max-w-7xl mx-auto flex items-center justify-between border-t border-white/10 pt-4 pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="w-24 h-[2px] bg-white/20 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className={`h-full transition-all duration-150 ${primaryBgColor}`}
                style={{ width: '0%' }}
              />
            </div>
            <span className="font-mono text-[11px] text-white/50 uppercase tracking-widest">
              PROGRESS
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs text-white/60">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-white/40" />
              <span className="hidden sm:inline">SECTION ID:</span>
              <span className={`font-bold ${primaryTextColor}`}>#{effectiveId}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Named export support
export { SectionsPro };
