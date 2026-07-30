import { useState, useEffect, useRef } from 'react';
import chooseImage from '../assets/ChooseAnyOne.png';
import { Activity, Flame, Sparkles, Volume2, VolumeX, ArrowLeft, ArrowRight, Shield, Zap } from 'lucide-react';

interface SelectionScreenProps {
  onSelect: (theme: 'red' | 'blue') => void;
}

export default function SelectionScreen({ onSelect }: SelectionScreenProps) {
  const [hovered, setHovered] = useState<'none' | 'left' | 'right'>('none');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [timeStr, setTimeStr] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [transitioning, setTransitioning] = useState<'none' | 'red' | 'blue'>('none');
  const containerRef = useRef<HTMLDivElement>(null);

  // Web Audio API Synthesizer for tactile cinematic sound feedback
  const playAudioTone = (freq: number, type: OscillatorType = 'sine', duration = 0.25, volume = 0.04) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context failover
    }
  };

  // Live Indian Standard Time (IST) HUD Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTimeStr(`${istTime.toUpperCase()} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut listener (Left Arrow / B for Blue, Right Arrow / R for Red)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (transitioning !== 'none') return;
      if (e.key === 'ArrowLeft' || e.key === 'b' || e.key === 'B') {
        triggerSelect('blue');
      } else if (e.key === 'ArrowRight' || e.key === 'r' || e.key === 'R') {
        triggerSelect('red');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSelect, transitioning, soundEnabled]);

  // Handle Selection with Warp FX
  const triggerSelect = (choice: 'blue' | 'red') => {
    if (transitioning !== 'none') return;
    setTransitioning(choice);

    // Audio sting
    if (choice === 'blue') {
      playAudioTone(45, 'sine', 0.9, 0.12);
      playAudioTone(110, 'triangle', 0.6, 0.08);
      playAudioTone(220, 'sine', 0.4, 0.05);
    } else {
      playAudioTone(40, 'sawtooth', 0.9, 0.12);
      playAudioTone(85, 'sine', 0.6, 0.08);
      playAudioTone(170, 'triangle', 0.4, 0.05);
    }

    setTimeout(() => {
      onSelect(choice);
    }, 850);
  };

  // Subtle Mouse Camera Parallax Movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleHoverState = (state: 'none' | 'left' | 'right') => {
    if (state !== hovered && state !== 'none') {
      if (state === 'left') playAudioTone(55, 'sine', 0.25, 0.05);
      if (state === 'right') playAudioTone(50, 'sawtooth', 0.25, 0.05);
    }
    setHovered(state);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => handleHoverState('none')}
      className="h-screen w-screen relative overflow-hidden bg-[#030304] flex items-center justify-center select-none perspective-[1200px]"
    >
      {/* Cinematic Pill Iris Energy Reveal Overlay Pass */}
      <div
        className={`absolute inset-0 z-50 pointer-events-none transition-all duration-850 ease-in-out ${
          transitioning === 'blue'
            ? 'bg-black opacity-100'
            : transitioning === 'red'
            ? 'bg-black opacity-100'
            : 'opacity-0'
        }`}
        style={{
          clipPath:
            transitioning === 'blue'
              ? 'circle(160% at 27% 76%)'
              : transitioning === 'red'
              ? 'circle(160% at 73% 76%)'
              : 'circle(0% at 50% 50%)',
        }}
      />

      {/* 1. Dynamic Volumetric Atmosphere Lighting Pass */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 ease-out z-0"
        style={{
          background:
            transitioning === 'blue' || hovered === 'left'
              ? `radial-gradient(circle at 25% 75%, rgba(0, 102, 255, 0.32) 0%, transparent 60%)`
              : transitioning === 'red' || hovered === 'right'
              ? `radial-gradient(circle at 75% 75%, rgba(235, 20, 50, 0.32) 0%, transparent 60%)`
              : `none`,
        }}
      />

      {/* 2. Pure Original Image Layer - Mobile Responsive Camera Zoom & Alignment */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out bg-contain bg-[center_55%] sm:bg-[center_70%] md:bg-[center_85%] bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${chooseImage})`,
          transform:
            transitioning === 'blue'
              ? `scale(1.35) translate(25px, -15px)`
              : transitioning === 'red'
              ? `scale(1.35) translate(-25px, -15px)`
              : hovered === 'left'
              ? `scale(1.14) translate(35px, -10px)`
              : hovered === 'right'
              ? `scale(1.14) translate(-35px, -10px)`
              : `scale(1) translate(${mousePos.x * 6}px, ${mousePos.y * 4}px)`,
          transformOrigin: '50% 60%',
        }}
      />

      {/* 3. Minimal Soft Vignette */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-out pointer-events-none z-[1] ${
          hovered !== 'none' ? 'opacity-30 bg-gradient-to-t from-black via-transparent to-black/60' : 'opacity-10 bg-black'
        }`}
      />

      {/* 4. Film Grain Texture Canvas Pass */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.045] mix-blend-overlay z-[2]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 5. Clean Tactical HUD Top Framing Header */}
      <div className="absolute top-3 sm:top-4 md:top-6 left-4 sm:left-6 md:left-10 right-4 sm:right-6 md:right-10 pointer-events-none z-20 flex justify-between items-center text-[9px] sm:text-[10px] md:text-xs font-mono tracking-[0.2em] sm:tracking-[0.3em] text-zinc-400 uppercase">
        <span className="flex items-center gap-1.5 sm:gap-2">
          <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-400" />
          <span className="font-bold text-zinc-400">SYSTEM // MATRIX SELECTION</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-zinc-400 hidden sm:inline">STATUS: ONLINE</span>
          <span className="text-zinc-500 font-bold sm:font-normal">[{timeStr}]</span>
        </span>
      </div>

      {/* 6. Main High-Impact Typography Header & Top Welcome Badge */}
      <div
        className={`absolute top-[6%] sm:top-[7%] left-0 w-full px-2 sm:px-4 text-center z-20 transition-all duration-700 pointer-events-none flex flex-col items-center ${
          hovered !== 'none' || transitioning !== 'none'
            ? 'opacity-0 -translate-y-4 scale-95'
            : 'opacity-100 translate-y-0 scale-100'
        }`}
      >
        <div className="inline-flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-zinc-950/95 border border-zinc-800 shadow-2xl mb-1.5 sm:mb-3 max-w-[92vw]">
          <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 animate-pulse shrink-0" />
          <span className="font-mono text-[8.5px] min-[380px]:text-[9.5px] sm:text-[11px] font-bold tracking-[0.12em] sm:tracking-[0.25em] text-zinc-200 uppercase whitespace-nowrap overflow-hidden text-ellipsis">
            WELCOME TO MY PORTFOLIO // CHOOSE YOUR REALITY
          </span>
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
        </div>

        <h1 className="text-white font-sans font-black text-sm min-[380px]:text-base sm:text-3xl md:text-5xl lg:text-6xl tracking-[0.08em] sm:tracking-[0.18em] md:tracking-[0.24em] uppercase whitespace-nowrap drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] max-w-full px-2">
          YOU CAN CHOOSE ONLY ONE
        </h1>
      </div>

      {/* 7. Pill Focus Spotlight & Text Overlay - Aligned Directly Beside Hand Level (Cobalt) */}
      <div
        className={`absolute top-[28%] sm:top-[32%] md:top-[36%] left-[4%] md:left-[7%] z-30 transition-all duration-500 pointer-events-none flex flex-col items-start space-y-2 sm:space-y-2.5 ${
          transitioning !== 'none'
            ? 'opacity-0 scale-90 blur-md duration-300'
            : hovered === 'left'
            ? 'opacity-100 translate-x-0 blur-none'
            : 'opacity-0 -translate-x-8 blur-sm'
        }`}
      >
        <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-[11px] font-bold text-blue-400 tracking-[0.25em] sm:tracking-[0.3em] uppercase">
          <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
          <span>COBALT PROTOCOL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight font-sans leading-none">
          BLUE <span className="text-blue-500">PILL</span>
        </h2>
        <p className="max-w-[260px] sm:max-w-sm font-mono text-[11px] sm:text-xs text-zinc-300 leading-relaxed pt-0.5 sm:pt-1">
          Smooth kinetic motion, full-stack systems, and polished digital experiences.
        </p>
        <div className="pt-1.5 sm:pt-2">
          <button
            onClick={() => triggerSelect('blue')}
            className="pointer-events-auto px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-mono text-[11px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase transition-all duration-300 flex items-center gap-2 shadow-[0_0_30px_rgba(0,102,255,0.5)] cursor-pointer active:scale-95"
          >
            <span>INGEST BLUE PILL</span>
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* 8. Pill Focus Spotlight & Text Overlay - Aligned Directly Beside Hand Level (Crimson) */}
      <div
        className={`absolute top-[28%] sm:top-[32%] md:top-[36%] right-[4%] md:right-[7%] z-30 transition-all duration-500 pointer-events-none flex flex-col items-end text-right space-y-2 sm:space-y-2.5 ${
          transitioning !== 'none'
            ? 'opacity-0 scale-90 blur-md duration-300'
            : hovered === 'right'
            ? 'opacity-100 translate-x-0 blur-none'
            : 'opacity-0 translate-x-8 blur-sm'
        }`}
      >
        <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-[11px] font-bold text-red-500 tracking-[0.25em] sm:tracking-[0.3em] uppercase">
          <span>CRIMSON PROTOCOL</span>
          <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight font-sans leading-none">
          RED <span className="text-red-500">PILL</span>
        </h2>
        <p className="max-w-[260px] sm:max-w-sm font-mono text-[11px] sm:text-xs text-zinc-300 leading-relaxed pt-0.5 sm:pt-1 text-right">
          Raw high-intensity authority, uncompromising engineering, and peak performance.
        </p>
        <div className="pt-1.5 sm:pt-2">
          <button
            onClick={() => triggerSelect('red')}
            className="pointer-events-auto px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-mono text-[11px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase transition-all duration-300 flex items-center gap-2 shadow-[0_0_30px_rgba(235,20,50,0.5)] cursor-pointer active:scale-95"
          >
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>INGEST RED PILL</span>
          </button>
        </div>
      </div>

      {/* 9. Minimalist Pill Markers Directly Hovering Over the Hands */}
      <div
        className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 ${
          transitioning !== 'none' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Left Pill (Blue) in Palm */}
        <div
          className={`absolute bottom-[28%] sm:bottom-[22%] md:bottom-[24%] left-[24%] sm:left-[27%] md:left-[31%] -translate-x-1/2 transition-all duration-500 flex flex-col items-center gap-1.5 sm:gap-2 ${
            hovered === 'left' ? 'scale-110 sm:scale-125 opacity-100' : 'scale-95 sm:scale-100 opacity-80 sm:opacity-70'
          }`}
        >
          <div className="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-blue-500/60 bg-blue-950/80 shadow-[0_0_20px_rgba(0,102,255,0.6)]">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-400 animate-ping absolute" />
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-500 relative" />
          </div>
          <span className="font-mono text-[8px] sm:text-[9px] font-bold text-blue-400 tracking-wider sm:tracking-widest uppercase bg-black/90 px-2.5 py-0.5 sm:py-1 rounded-full border border-blue-500/30 whitespace-nowrap">
            [ ◄ BLUE PILL ]
          </span>
        </div>

        {/* Right Pill (Red) in Palm */}
        <div
          className={`absolute bottom-[28%] sm:bottom-[22%] md:bottom-[24%] right-[24%] sm:right-[27%] md:right-[31%] translate-x-1/2 transition-all duration-500 flex flex-col items-center gap-1.5 sm:gap-2 ${
            hovered === 'right' ? 'scale-110 sm:scale-125 opacity-100' : 'scale-95 sm:scale-100 opacity-80 sm:opacity-70'
          }`}
        >
          <div className="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-red-500/60 bg-red-950/80 shadow-[0_0_20px_rgba(235,20,50,0.6)]">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400 animate-ping absolute" />
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500 relative" />
          </div>
          <span className="font-mono text-[8px] sm:text-[9px] font-bold text-red-400 tracking-wider sm:tracking-widest uppercase bg-black/90 px-2.5 py-0.5 sm:py-1 rounded-full border border-red-500/30 whitespace-nowrap">
            [ RED PILL ► ]
          </span>
        </div>
      </div>

      {/* 10. Direct Hand Interactive Hit-boxes */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        {/* Center Neutral Body Region */}
        <div
          className="absolute inset-0 pointer-events-auto"
          onMouseEnter={() => handleHoverState('none')}
        />

        {/* Left Hand Target Area */}
        <div
          className="absolute bottom-[2%] left-[4%] sm:left-[6%] md:left-[12%] w-[45%] sm:w-[42%] md:w-[32%] h-[60%] md:h-[60%] cursor-pointer pointer-events-auto touch-manipulation"
          onMouseEnter={(e) => {
            e.stopPropagation();
            handleHoverState('left');
          }}
          onMouseLeave={() => handleHoverState('none')}
          onClick={() => triggerSelect('blue')}
          onTouchEnd={(e) => {
            e.preventDefault();
            if (hovered === 'left') triggerSelect('blue');
            else handleHoverState('left');
          }}
        />

        {/* Right Hand Target Area */}
        <div
          className="absolute bottom-[2%] right-[4%] sm:right-[6%] md:right-[12%] w-[45%] sm:w-[42%] md:w-[32%] h-[60%] md:h-[60%] cursor-pointer pointer-events-auto touch-manipulation"
          onMouseEnter={(e) => {
            e.stopPropagation();
            handleHoverState('right');
          }}
          onMouseLeave={() => handleHoverState('none')}
          onClick={() => triggerSelect('red')}
          onTouchEnd={(e) => {
            e.preventDefault();
            if (hovered === 'right') triggerSelect('red');
            else handleHoverState('right');
          }}
        />
      </div>

      {/* 11. Minimalist Bottom Controls & Audio Toggle */}
      <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 right-4 sm:right-6 z-30 pointer-events-none flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-zinc-400 uppercase tracking-[0.15em] sm:tracking-[0.2em]">
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span className="hidden min-[400px]:inline">COORDINATES: 25.04 N // 75.12 W</span>
          <span className="min-[400px]:hidden">COORD: 25.04 N // 75.12 W</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2 sm:gap-4 bg-black/90 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-zinc-800/80 shadow-2xl">
          <span className="hidden sm:inline text-zinc-300 font-bold">
            HOVER HANDS OR PRESS <span className="text-white font-black">[ ◄ / ► ]</span> KEYS TO CHOOSE
          </span>
          <div className="w-[1px] h-3 bg-zinc-800 hidden sm:block" />
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Toggle Sound Effects"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold text-[8.5px] sm:text-[10px]">AUDIO ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                <span className="text-zinc-500 font-bold text-[8.5px] sm:text-[10px]">AUDIO OFF</span>
              </>
            )}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 text-zinc-500">
          <span>CHOOSE YOUR REALITY</span>
        </div>
      </div>
    </div>
  );
}

