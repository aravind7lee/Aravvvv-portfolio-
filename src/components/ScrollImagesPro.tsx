import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ChevronRight, ChevronLeft, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollImageItem {
  id: string;
  title: string;
  giantTitle: string;
  heading: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
}

export interface ScrollImagesProProps {
  items: ScrollImageItem[];
  theme?: 'red' | 'blue';
}

export default function ScrollImagesPro({ items, theme = 'red' }: ScrollImagesProProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const isRed = theme === 'red';
  const primaryTextColor = isRed ? 'text-red-500' : 'text-[#0044ff]';
  const primaryBgColor = isRed ? 'bg-red-500' : 'bg-[#0044ff]';
  const primaryBorderColor = isRed ? 'border-red-500/40' : 'border-[#0044ff]/40';
  const buttonStyle = isRed
    ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg'
    : 'bg-[#0044ff] text-white hover:bg-blue-600 shadow-lg';

  // Bi-directional ScrollTrigger (Symmetrical pinning for scroll down and scroll up)
  useEffect(() => {
    const container = containerRef.current;
    const pinEl = pinRef.current;
    if (!container || !pinEl || items.length === 0) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        pin: pinEl,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          const rawIdx = Math.floor(self.progress * items.length);
          const newIdx = Math.min(Math.max(rawIdx, 0), items.length - 1);
          setActiveIndex((prev) => (prev !== newIdx ? newIdx : prev));
        },
      });
      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [items.length]);

  // Clean Entrance Transition on Slide Switch
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 15, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' }
      );
    }
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.05, filter: 'brightness(0.35)' },
        { scale: 1, filter: 'brightness(0.4)', duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activeIndex]);

  const setSlide = (index: number) => {
    const targetIndex = Math.min(Math.max(index, 0), items.length - 1);
    setActiveIndex(targetIndex);
  };

  const activeItem = items[activeIndex] || items[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black text-white select-none overflow-hidden min-h-[590vh]"
      style={{ height: `${items.length * 80 + 30}vh` }}
    >
      {/* Pinned Viewport Frame */}
      <div
        ref={pinRef}
        className="relative w-full h-screen flex flex-col justify-between items-center overflow-hidden bg-black pt-14 pb-6 sm:py-8 px-4 md:px-12 z-10"
      >
        {/* Clean Editorial Section Header (No Gradients or Neon Glows) */}
        <div className="relative z-30 w-full flex items-center justify-between border-b border-white/10 pb-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full ${primaryBgColor}`} />
            <span className="font-mono text-xs font-bold tracking-widest text-white/80 uppercase">
              SELECTED WORKS / 0{activeIndex + 1}
            </span>
          </div>

          <h2 className="text-xl md:text-3xl font-extrabold tracking-tight text-white uppercase font-sans">
            FEATURED <span className={primaryTextColor}>WORKS</span>
          </h2>

          <div className="hidden md:flex items-center gap-2 font-mono text-xs text-white/50 bg-zinc-950 px-3.5 py-1.5 rounded-full border border-white/10">
            <span>PROJECT</span>
            <span className={`font-bold ${primaryTextColor}`}>0{activeIndex + 1}</span>
            <span>OF</span>
            <span className="text-white font-bold">0{items.length}</span>
          </div>
        </div>

        {/* Crisp Dark Background Wallpaper Layer */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {activeItem.image ? (
            <img
              ref={imageRef}
              src={activeItem.image}
              alt={activeItem.title}
              className="w-full h-full object-cover object-center filter brightness-[0.35] contrast-[1.05]"
            />
          ) : (
            <div className="w-full h-full bg-zinc-950" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/90" />
        </div>

        {/* Giant Watermark Typography (Clean Subtle Stroke, No Neon Dropshadow) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-10">
          <h1
            className="text-[24vw] md:text-[20vw] font-black leading-none uppercase select-none opacity-80 text-white/5 [-webkit-text-stroke:1px_rgba(255,255,255,0.08)]"
          >
            {activeItem.giantTitle}
          </h1>
        </div>

        {/* Showcase Layout */}
        <div
          ref={cardRef}
          className="relative z-20 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-2"
        >
          {/* Left Column: Project Details */}
          <div className="lg:col-span-6 space-y-4 md:space-y-5">
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold border flex items-center gap-2 bg-black/90 ${primaryTextColor} ${primaryBorderColor}`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>PROJECT 0{activeIndex + 1}</span>
              </span>
              <span className="h-[1px] w-8 bg-white/20" />
              <span className="text-xs font-mono text-white/60 tracking-widest uppercase">
                {activeItem.title}
              </span>
            </div>

            <h3
              ref={titleRef}
              className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight uppercase font-sans"
            >
              {activeItem.heading}
            </h3>

            <div className="flex flex-wrap gap-2 pt-0.5">
              {activeItem.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-md text-[11px] font-mono font-semibold bg-zinc-900 text-white/90 border border-white/15"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-xs md:text-sm text-gray-300 font-sans leading-relaxed line-clamp-3 md:line-clamp-5 bg-zinc-950 p-5 rounded-2xl border border-white/10 shadow-xl">
              {activeItem.description}
            </p>

            <div className="pt-2">
              <a
                href={activeItem.link || '#'}
                target={activeItem.link ? '_blank' : '_self'}
                rel="noreferrer"
                className={`group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 ${buttonStyle}`}
              >
                <span>EXPLORE PROJECT</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Screenshot Card (Clean Border, No Glowing Box Shadow) */}
          <div className="lg:col-span-6 hidden lg:block">
            <div
              className={`relative rounded-2xl overflow-hidden border p-2 bg-zinc-950 shadow-2xl transition-all duration-300 group ${primaryBorderColor}`}
            >
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black">
                {activeItem.image ? (
                  <img
                    src={activeItem.image}
                    alt={activeItem.heading}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                    <span className="font-mono text-xs text-zinc-600 tracking-widest uppercase">SCREENSHOT COMING SOON</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-xs font-mono text-white flex items-center gap-1 font-bold">
                    VIEW DETAILS <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Rail Navigation Dots */}
        <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3 pointer-events-auto">
          <div className="w-[2px] h-24 bg-white/15 rounded-full relative overflow-hidden">
            <div
              className={`w-full transition-all duration-300 ${primaryBgColor}`}
              style={{
                height: `${((activeIndex + 1) / items.length) * 100}%`,
              }}
            />
          </div>

          {items.map((it, i) => (
            <button
              key={it.id}
              onClick={() => setSlide(i)}
              aria-label={`Jump to project ${i + 1}`}
              className="group relative p-1 focus:outline-none"
            >
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? `scale-125 ${primaryBgColor}` : 'bg-white/30 hover:bg-white/70'
                }`}
              />
              <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none bg-black text-white font-mono text-[10px] px-2.5 py-1 rounded whitespace-nowrap border border-white/20 shadow-lg">
                0{i + 1} — {it.title}
              </div>
            </button>
          ))}
        </div>

        {/* Bottom Navigation & Thumbnail Strip (Clean Non-Glow Styling) */}
        <div className="relative z-50 w-full max-w-7xl mx-auto flex items-center justify-between border-t border-white/10 pt-4 pointer-events-auto">
          {/* Thumbnail Carousel */}
          <div className="hidden sm:flex items-center gap-2">
            {items.map((it, idx) => (
              <button
                key={it.id}
                onClick={() => setSlide(idx)}
                className={`group relative h-10 w-16 md:w-20 rounded-lg overflow-hidden border transition-all duration-300 ${
                  idx === activeIndex
                    ? `${primaryBorderColor} ring-1 ring-white/40 scale-105`
                    : 'border-white/15 opacity-40 hover:opacity-100 hover:border-white/40'
                }`}
              >
                {it.image ? (
                  <img
                    src={it.image}
                    alt={it.title}
                    className="w-full h-full object-cover filter brightness-[0.7]"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-900" />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center font-mono text-[10px] font-bold text-white">
                  0{idx + 1}
                </div>
              </button>
            ))}
          </div>

          {/* Arrow Navigation Controls */}
          <div className="flex items-center gap-3 ml-auto">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setSlide(activeIndex - 1);
              }}
              disabled={activeIndex === 0}
              className={`p-3 rounded-full border border-white/20 bg-black text-white transition-all duration-300 ${
                activeIndex === 0
                  ? 'opacity-20 cursor-not-allowed'
                  : 'hover:bg-white/20 hover:scale-105 active:scale-95 cursor-pointer shadow-md'
              }`}
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="px-4 py-2 rounded-full bg-black border border-white/20 flex items-center gap-2 font-mono text-xs font-bold text-white shadow-md select-none">
              <span className={primaryTextColor}>0{activeIndex + 1}</span>
              <span className="text-white/30">/</span>
              <span className="text-white/70">0{items.length}</span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setSlide(activeIndex + 1);
              }}
              disabled={activeIndex === items.length - 1}
              className={`p-3 rounded-full border border-white/20 bg-black text-white transition-all duration-300 ${
                activeIndex === items.length - 1
                  ? 'opacity-20 cursor-not-allowed'
                  : 'hover:bg-white/20 hover:scale-105 active:scale-95 cursor-pointer shadow-md'
              }`}
              aria-label="Next Project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
