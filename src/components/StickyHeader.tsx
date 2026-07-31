import { ArrowLeft } from 'lucide-react';

interface StickyHeaderProps {
  theme: 'red' | 'blue';
  onThemeChange: (theme: 'selection' | 'red' | 'blue') => void;
}

export default function StickyHeader({ theme, onThemeChange }: StickyHeaderProps) {
  const isRed = theme === 'red';

  return (
    <header className="fixed top-2 sm:top-5 left-0 right-0 z-[100] px-2 sm:px-6 md:px-12 flex items-center justify-between gap-1.5 sm:gap-4 pointer-events-none select-none max-w-full">
      {/* Left Control: Reselect Protocol */}
      <button
        onClick={() => onThemeChange('selection')}
        className="pointer-events-auto group flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-2 rounded-full bg-black/90 backdrop-blur-xl border border-white/20 hover:border-white/40 text-zinc-300 hover:text-white transition-all duration-300 active:scale-95 cursor-pointer shadow-2xl whitespace-nowrap shrink-0"
      >
        <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 text-zinc-400 group-hover:text-white group-hover:-translate-x-1 transition-transform duration-300 shrink-0" />
        <span className="font-mono text-[9px] min-[360px]:text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.2em] font-bold whitespace-nowrap">
          <span className="hidden min-[380px]:inline">RESELECT PROTOCOL</span>
          <span className="min-[380px]:hidden">RESELECT</span>
        </span>
      </button>

      {/* Right Control: Sticky Dual Red/Blue Pill Switcher */}
      <div className="pointer-events-auto flex items-center p-0.5 sm:p-1.5 rounded-full bg-black/90 backdrop-blur-xl border border-white/20 shadow-2xl shrink-0">
        <button
          onClick={() => onThemeChange('red')}
          className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3.5 py-0.5 sm:py-1.5 rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap ${
            isRed
              ? 'bg-red-500 text-white font-bold shadow-[0_0_18px_rgba(239,68,68,0.6)]'
              : 'hover:bg-zinc-900 text-zinc-400 hover:text-red-400'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0 ${
              isRed ? 'bg-white' : 'bg-red-500/50'
            }`}
          />
          <span className="font-mono text-[9px] min-[360px]:text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-bold whitespace-nowrap">
            <span className="hidden min-[400px]:inline">RED PILL</span>
            <span className="min-[400px]:hidden">RED</span>
          </span>
        </button>

        <div className="w-[1px] h-3 sm:h-4 bg-zinc-800 mx-0.5 sm:mx-1 shrink-0" />

        <button
          onClick={() => onThemeChange('blue')}
          className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3.5 py-0.5 sm:py-1.5 rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap ${
            !isRed
              ? 'bg-blue-600 text-white font-bold shadow-[0_0_18px_rgba(0,102,255,0.6)]'
              : 'hover:bg-zinc-900 text-zinc-400 hover:text-blue-400'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0 ${
              !isRed ? 'bg-white' : 'bg-blue-500/50'
            }`}
          />
          <span className="font-mono text-[9px] min-[360px]:text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-bold whitespace-nowrap">
            <span className="hidden min-[400px]:inline">BLUE PILL</span>
            <span className="min-[400px]:hidden">BLUE</span>
          </span>
        </button>
      </div>
    </header>
  );
}
