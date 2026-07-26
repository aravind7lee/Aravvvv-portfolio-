import { useState, useEffect, useRef } from 'react';
import chooseImage from '../assets/ChooseAnyOne.png';
import { ShieldAlert, Zap, Flame, Sparkles, Target, Activity, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface SelectionScreenProps {
  onSelect: (theme: 'red' | 'blue') => void;
}

export default function SelectionScreen({ onSelect }: SelectionScreenProps) {
  const [hovered, setHovered] = useState<'none' | 'left' | 'right'>('none');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [timeStr, setTimeStr] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Live UTC HUD Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toISOString().substring(11, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut listener (Left Arrow for Blue, Right Arrow for Red)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'b' || e.key === 'B') {
        onSelect('blue');
      } else if (e.key === 'ArrowRight' || e.key === 'r' || e.key === 'R') {
        onSelect('red');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSelect]);

  // Subtle Mouse Camera Parallax Movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="h-screen w-screen relative overflow-hidden bg-[#030305] flex items-center justify-center select-none perspective-[1000px]"
    >
      {/* Cinematic Camera Parallax Image Layer */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out bg-contain bg-[center_75%] md:bg-[center_85%] bg-no-repeat filter brightness-[0.92] contrast-[1.05]"
        style={{
          backgroundImage: `url(${chooseImage})`,
          transform:
            hovered === 'left'
              ? `scale(1.14) translate(${mousePos.x * 20 + 20}px, ${mousePos.y * 10 - 10}px)`
              : hovered === 'right'
              ? `scale(1.14) translate(${mousePos.x * 20 - 20}px, ${mousePos.y * 10 - 10}px)`
              : `scale(1.02) translate(${mousePos.x * 12}px, ${mousePos.y * 8}px)`,
          transformOrigin:
            hovered === 'left'
              ? '25% 80%'
              : hovered === 'right'
              ? '75% 80%'
              : '50% 85%',
        }}
      />

      {/* Deep Matte Vignette Overlay Mask */}
      <div
        className={`absolute inset-0 bg-[#030305] transition-opacity duration-700 ease-out pointer-events-none z-0 ${
          hovered !== 'none' ? 'opacity-65' : 'opacity-25'
        }`}
      />

      {/* Tactical Corner HUD Framing Lines */}
      <div className="absolute inset-4 md:inset-8 border border-white/10 pointer-events-none z-20 flex flex-col justify-between p-3 md:p-5">
        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 tracking-[0.3em] uppercase">
          <span className="flex items-center gap-2">
            <Activity className="w-3 h-3 text-zinc-400" />
            <span>SYSTEM // MATRIX SELECTION</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>STATUS: ONLINE</span>
            <span className="text-zinc-600">[{timeStr}]</span>
          </span>
        </div>

        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 tracking-[0.3em] uppercase">
          <span>COORDINATES: 25.04 N // 75.12 W</span>
          <span className="text-zinc-400 font-bold">CHOOSE YOUR REALITY</span>
        </div>
      </div>

      {/* Absolute Bottom Edge Keyboard Helper Badge */}
      <div className="absolute bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex items-center">
        <span className="text-[9px] md:text-[10px] font-mono text-zinc-300 font-bold bg-zinc-950/95 px-4 py-1.5 rounded-full border border-zinc-800 shadow-2xl tracking-[0.25em] uppercase whitespace-nowrap">
          HOVER HANDS OR PRESS <span className="text-white font-black">[ ◄ / ► ]</span> KEYS TO CHOOSE
        </span>
      </div>

      {/* Energetic High-Aura Top Welcome Header */}
      <div
        className={`absolute top-[5%] md:top-[7%] left-0 w-full px-4 text-center z-20 transition-all duration-700 pointer-events-none ${
          hovered !== 'none'
            ? 'opacity-0 -translate-y-4 scale-95'
            : 'opacity-100 translate-y-0 scale-100'
        }`}
      >
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-950/90 border border-zinc-800 shadow-2xl mb-2.5 md:mb-3">
          <Flame className="w-4 h-4 text-red-500 animate-pulse" />
          <span className="font-mono text-[10px] md:text-[11px] font-bold tracking-[0.25em] text-zinc-200 uppercase">
            WELCOME TO MY PORTFOLIO // CHOOSE YOUR REALITY
          </span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </div>

        <h1 className="text-white font-sans font-black text-xl sm:text-3xl md:text-5xl lg:text-6xl tracking-[0.2em] md:tracking-[0.25em] uppercase whitespace-nowrap drop-shadow-2xl">
          YOU CAN CHOOSE ONLY ONE
        </h1>
      </div>

      {/* Top-Left Luxury Editorial Card (Blue Pill - Cobalt Protocol) */}
      <div
        className={`absolute top-[15%] md:top-[18%] left-[3%] md:left-[5%] z-30 transition-all duration-700 ease-out pointer-events-none flex flex-col items-start ${
          hovered === 'left'
            ? 'opacity-100 scale-100 translate-y-0 blur-none'
            : 'opacity-0 scale-95 -translate-y-4 blur-sm'
        }`}
      >
        <div className="relative bg-zinc-950/95 p-6 md:p-7 rounded-2xl border border-blue-500/50 shadow-2xl max-w-sm space-y-4 overflow-hidden">
          {/* Tactical Corner Marks */}
          <div className="absolute top-2 left-2 text-[9px] font-mono text-blue-500/40">⌜</div>
          <div className="absolute top-2 right-2 text-[9px] font-mono text-blue-500/40">⌝</div>
          <div className="absolute bottom-2 left-2 text-[9px] font-mono text-blue-500/40">⌞</div>
          <div className="absolute bottom-2 right-2 text-[9px] font-mono text-blue-500/40">⌟</div>

          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <div className="flex items-center gap-2 text-[10px] font-mono text-blue-400 font-bold tracking-[0.2em] uppercase">
              <Zap className="w-4 h-4 text-blue-500" />
              <span>COBALT PROTOCOL</span>
            </div>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800/50 uppercase">
              VER 2.0
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-none font-sans">
            ENTER THE <br />
            <span className="text-blue-500">DEPTHS</span>
          </h2>

          <div className="space-y-2 text-xs font-mono text-zinc-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
              <span>Precision Electric Cobalt Aesthetic</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
              <span>Deep Digital Full-Stack Architecture</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
              <span>Kinetic GSAP Motion & Smooth Physics</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onSelect('blue')}
              className="group w-full py-3.5 rounded-xl bg-blue-600 text-white font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-blue-700 transition-all flex items-center justify-center gap-2 cursor-pointer pointer-events-auto shadow-lg"
            >
              <span>INGEST BLUE PILL</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Top-Right Luxury Editorial Card (Red Pill - Crimson Protocol) */}
      <div
        className={`absolute top-[15%] md:top-[18%] right-[3%] md:right-[5%] z-30 transition-all duration-700 ease-out pointer-events-none flex flex-col items-end ${
          hovered === 'right'
            ? 'opacity-100 scale-100 translate-y-0 blur-none'
            : 'opacity-0 scale-95 -translate-y-4 blur-sm'
        }`}
      >
        <div className="relative bg-zinc-950/95 p-6 md:p-7 rounded-2xl border border-red-500/50 shadow-2xl max-w-sm space-y-4 text-right overflow-hidden">
          {/* Tactical Corner Marks */}
          <div className="absolute top-2 left-2 text-[9px] font-mono text-red-500/40">⌜</div>
          <div className="absolute top-2 right-2 text-[9px] font-mono text-red-500/40">⌝</div>
          <div className="absolute bottom-2 left-2 text-[9px] font-mono text-red-500/40">⌞</div>
          <div className="absolute bottom-2 right-2 text-[9px] font-mono text-red-500/40">⌟</div>

          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-800/50 uppercase">
              VER 2.0
            </span>
            <div className="flex items-center gap-2 text-[10px] font-mono text-red-400 font-bold tracking-[0.2em] uppercase">
              <span>CRIMSON PROTOCOL</span>
              <ShieldAlert className="w-4 h-4 text-red-500" />
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-none font-sans">
            EMBRACE <br />
            <span className="text-red-500">REALITY</span>
          </h2>

          <div className="space-y-2 text-xs font-mono text-zinc-300 text-left">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
              <span>High-Intensity Crimson Visual Power</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
              <span>Uncompromising Engineering Performance</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
              <span>High-Aura Masculine Developer Authority</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onSelect('red')}
              className="group w-full py-3.5 rounded-xl bg-red-600 text-white font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-red-700 transition-all flex items-center justify-center gap-2 cursor-pointer pointer-events-auto shadow-lg"
            >
              <span>INGEST RED PILL</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tactical Radar Target Lock Scope Nodes */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Left Hand Scope (Blue) */}
        <div
          className={`absolute bottom-[24%] left-[26%] md:left-[30%] -translate-x-1/2 transition-all duration-500 flex flex-col items-center gap-2 ${
            hovered === 'left' ? 'scale-125 opacity-100' : 'scale-100 opacity-75'
          }`}
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-blue-500/80 bg-zinc-950/90 shadow-xl">
            {/* Rotating Tactical Radar Crosshair Ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-blue-400/50 animate-[spin_10s_linear_infinite]" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
            <Target className="w-3.5 h-3.5 text-blue-400 absolute opacity-40" />
          </div>
          <span className="font-mono text-[9px] font-bold text-blue-400 tracking-widest uppercase bg-zinc-950 px-2.5 py-0.5 rounded border border-zinc-800 shadow-lg flex items-center gap-1">
            <span>BLUE PILL</span>
            <span className="text-white">[ ◄ ]</span>
          </span>
        </div>

        {/* Right Hand Scope (Red) */}
        <div
          className={`absolute bottom-[24%] right-[26%] md:right-[30%] translate-x-1/2 transition-all duration-500 flex flex-col items-center gap-2 ${
            hovered === 'right' ? 'scale-125 opacity-100' : 'scale-100 opacity-75'
          }`}
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-red-500/80 bg-zinc-950/90 shadow-xl">
            {/* Rotating Tactical Radar Crosshair Ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-red-400/50 animate-[spin_10s_linear_infinite]" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            <Target className="w-3.5 h-3.5 text-red-400 absolute opacity-40" />
          </div>
          <span className="font-mono text-[9px] font-bold text-red-400 tracking-widest uppercase bg-zinc-950 px-2.5 py-0.5 rounded border border-zinc-800 shadow-lg flex items-center gap-1">
            <span>RED PILL</span>
            <span className="text-white">[ ► ]</span>
          </span>
        </div>
      </div>

      {/* Interactive Precise Hand Hover Boundaries */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        {/* Middle Safe Zone (Suit & Chest) */}
        <div
          className="absolute inset-0 pointer-events-auto"
          onMouseEnter={() => setHovered('none')}
        />

        {/* Left Hand Hit-box */}
        <div
          className="absolute bottom-[5%] left-[8%] md:left-[14%] w-[38%] md:w-[28%] h-[50%] md:h-[55%] cursor-pointer pointer-events-auto"
          onMouseEnter={(e) => {
            e.stopPropagation();
            setHovered('left');
          }}
          onMouseLeave={() => setHovered('none')}
          onClick={() => onSelect('blue')}
          onTouchEnd={(e) => {
            e.preventDefault();
            if (hovered === 'left') onSelect('blue');
            else setHovered('left');
          }}
        />

        {/* Right Hand Hit-box */}
        <div
          className="absolute bottom-[5%] right-[8%] md:right-[14%] w-[38%] md:w-[28%] h-[50%] md:h-[55%] cursor-pointer pointer-events-auto"
          onMouseEnter={(e) => {
            e.stopPropagation();
            setHovered('right');
          }}
          onMouseLeave={() => setHovered('none')}
          onClick={() => onSelect('red')}
          onTouchEnd={(e) => {
            e.preventDefault();
            if (hovered === 'right') onSelect('red');
            else setHovered('right');
          }}
        />
      </div>
    </div>
  );
}
