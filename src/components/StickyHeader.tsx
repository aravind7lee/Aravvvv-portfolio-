import { ArrowLeft } from 'lucide-react';

interface StickyHeaderProps {
  theme: 'red' | 'blue';
  onThemeChange: (theme: 'selection' | 'red' | 'blue') => void;
}

export default function StickyHeader({ theme, onThemeChange }: StickyHeaderProps) {
  const isRed = theme === 'red';

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-[100] px-4 sm:px-6 md:px-12 flex items-center justify-between gap-2 pointer-events-none select-none">
      {/* Left Control: Reselect Protocol */}
      <button
        onClick={() => onThemeChange('selection')}
        className="pointer-events-auto group flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/90 backdrop-blur-xl border border-white/20 hover:border-white/40 text-zinc-300 hover:text-white transition-all duration-300 active:scale-95 cursor-pointer shadow-2xl"
      >
        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400 group-hover:text-white group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-bold">
          RESELECT PROTOCOL
        </span>
      </button>

      {/* Right Control: Sticky Dual Red/Blue Pill Switcher */}
      <div className="pointer-events-auto flex items-center p-1 sm:p-1.5 rounded-full bg-black/90 backdrop-blur-xl border border-white/20 shadow-2xl">
        <button
          onClick={() => onThemeChange('red')}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
            isRed
              ? 'bg-red-500 text-white font-bold shadow-[0_0_18px_rgba(239,68,68,0.6)]'
              : 'hover:bg-zinc-900 text-zinc-400 hover:text-red-400'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isRed ? 'bg-white' : 'bg-red-500/50'
            }`}
          />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold">
            RED PILL
          </span>
        </button>

        <div className="w-[1px] h-3 sm:h-4 bg-zinc-800 mx-1" />

        <button
          onClick={() => onThemeChange('blue')}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
            !isRed
              ? 'bg-blue-600 text-white font-bold shadow-[0_0_18px_rgba(0,102,255,0.6)]'
              : 'hover:bg-zinc-900 text-zinc-400 hover:text-blue-400'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              !isRed ? 'bg-white' : 'bg-blue-500/50'
            }`}
          />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold">
            BLUE PILL
          </span>
        </button>
      </div>
    </header>
  );
}
