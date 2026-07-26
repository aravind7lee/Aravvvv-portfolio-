import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  FileCode,
  Braces,
  Database,
  Code,
  Layout,
  Layers,
  Server,
  Cpu,
  HardDrive,
  Lock,
  KeyRound,
  Webhook,
  CreditCard,
  Sparkles,
  GitBranch,
  GitCommit,
  Terminal,
  Send,
  Code2,
  Boxes,
  Blocks,
  type LucideIcon,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SkillItem {
  name: string;
  icon: LucideIcon;
}

interface SkillZone {
  id: number;
  numberStr: string;
  title: string;
  watermark: string;
  icon: LucideIcon;
  skills: SkillItem[];
}

const SKILL_ZONES: SkillZone[] = [
  {
    id: 1,
    numberStr: '01',
    title: 'CORE FOUNDATION',
    watermark: 'FOUNDATION',
    icon: Code2,
    skills: [
      { name: 'Python', icon: FileCode },
      { name: 'JavaScript', icon: Braces },
      { name: 'SQL', icon: Database },
      { name: 'HTML5', icon: Code },
      { name: 'CSS3', icon: Layout },
    ],
  },
  {
    id: 2,
    numberStr: '02',
    title: 'FULL-STACK ARCHITECTURE',
    watermark: 'ARCHITECTURE',
    icon: Layers,
    skills: [
      { name: 'React.js', icon: Layers },
      { name: 'TypeScript', icon: Braces },
      { name: 'Tailwind CSS', icon: Blocks },
      { name: 'Redux Toolkit', icon: Boxes },
      { name: 'Node.js', icon: Server },
      { name: 'Express.js', icon: Cpu },
    ],
  },
  {
    id: 3,
    numberStr: '03',
    title: 'DATABASES & AUTH',
    watermark: 'DATABASES',
    icon: Database,
    skills: [
      { name: 'MongoDB', icon: Database },
      { name: 'PostgreSQL', icon: HardDrive },
      { name: 'JWT Auth', icon: Lock },
      { name: 'Clerk', icon: KeyRound },
    ],
  },
  {
    id: 4,
    numberStr: '04',
    title: 'APIS & AI SYSTEMS',
    watermark: 'SYSTEMS',
    icon: Sparkles,
    skills: [
      { name: 'REST APIs', icon: Webhook },
      { name: 'Stripe API', icon: CreditCard },
      { name: 'Google Gemini AI', icon: Sparkles },
    ],
  },
  {
    id: 5,
    numberStr: '05',
    title: 'FIELD TOOLING',
    watermark: 'TOOLING',
    icon: Terminal,
    skills: [
      { name: 'Git', icon: GitBranch },
      { name: 'GitHub', icon: GitCommit },
      { name: 'VS Code', icon: Terminal },
      { name: 'Postman', icon: Send },
    ],
  },
];

interface SkillsWheelProps {
  theme: 'selection' | 'red' | 'blue';
}

export default function SkillsWheel({ theme }: SkillsWheelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const isRed = theme === 'red';
  const primaryBgClass = isRed ? 'bg-red-500' : 'bg-blue-600';
  const primaryTextClass = isRed ? 'text-red-500' : 'text-blue-500';
  const primaryBorderClass = isRed
    ? 'border-red-500/60 shadow-lg'
    : 'border-blue-600/60 shadow-lg';

  useGSAP(
    () => {
      const totalItems = SKILL_ZONES.length;
      const angleStep = 360 / totalItems; // 72 degrees per zone for 5 items

      // 1. HARDWARE-ACCELERATED INITIAL STATES
      gsap.set('.skill-content', {
        opacity: 0,
        y: 35,
        pointerEvents: 'none',
        force3D: true,
      });
      gsap.set('.skill-content:first-child', {
        opacity: 1,
        y: 0,
        pointerEvents: 'auto',
      });

      gsap.set('.hub-number', {
        opacity: 0,
        scale: 0.7,
        force3D: true,
      });
      gsap.set('.hub-number:first-child', {
        opacity: 1,
        scale: 1,
      });

      gsap.set('.watermark-text', {
        opacity: 0,
        scale: 0.9,
        force3D: true,
      });
      gsap.set('.watermark-text:first-child', {
        opacity: 0.03,
        scale: 1,
      });

      gsap.set('.laser-progress-bar', { top: '0%', force3D: true });

      gsap.set('.wheel-ring', { rotation: 0, force3D: true });
      gsap.set('.wheel-icon', { rotation: 0, force3D: true });

      // Inactive node state
      gsap.set('.node-wrapper', { opacity: 0.35, scale: 0.85 });
      gsap.set('.node-wrapper:first-child', { opacity: 1, scale: 1.15 });

      // 2. MASTER SCROLLTIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: pinRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        },
      });

      // 3. THE WHEEL & CONTENT ANIMATION SEQUENCE
      for (let i = 0; i < totalItems - 1; i++) {
        const label = `step${i}`;
        tl.addLabel(label, i);

        // A. Rotate Main Ring
        tl.to('.wheel-ring', { rotation: -(i + 1) * angleStep, ease: 'none' }, label);

        // B. Counter-Rotate Icons inside nodes to keep them upright
        tl.to('.wheel-icon', { rotation: (i + 1) * angleStep, ease: 'none' }, label);

        // C. Animate Left Vertical Laser Progress Bar Down
        tl.to(
          '.laser-progress-bar',
          { top: `${((i + 1) / (totalItems - 1)) * 80}%`, ease: 'none' },
          label
        );

        // D. Left Panel Zone Content Transition
        tl.to(
          `.skill-content:nth-child(${i + 1})`,
          { opacity: 0, y: -35, pointerEvents: 'none', ease: 'none' },
          label
        );
        tl.to(
          `.skill-content:nth-child(${i + 2})`,
          { opacity: 1, y: 0, pointerEvents: 'auto', ease: 'none' },
          label
        );

        // E. Center Hub Numbers Transition
        tl.to(
          `.hub-number:nth-child(${i + 1})`,
          { opacity: 0, scale: 1.3, ease: 'none' },
          label
        );
        tl.to(
          `.hub-number:nth-child(${i + 2})`,
          { opacity: 1, scale: 1, ease: 'none' },
          label
        );

        // F. Active Node Highlight Transition
        tl.to(
          `.node-wrapper:nth-child(${i + 1})`,
          { opacity: 0.35, scale: 0.85, ease: 'none' },
          label
        );
        tl.to(
          `.node-wrapper:nth-child(${i + 2})`,
          { opacity: 1, scale: 1.15, ease: 'none' },
          label
        );

        // G. Background Watermark Parallax Transition
        tl.to(
          `.watermark-text:nth-child(${i + 1})`,
          { opacity: 0, scale: 1.1, ease: 'none' },
          label
        );
        tl.to(
          `.watermark-text:nth-child(${i + 2})`,
          { opacity: 0.03, scale: 1, ease: 'none' },
          label
        );
        // Refresh ScrollTrigger to calculate accurate layout metrics
        ScrollTrigger.refresh();
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="skills-mastery"
      className="relative w-full bg-black z-[40] min-h-[400vh]"
      style={{ height: '400vh' }}
    >
      {/* PINNED VIEWPORT */}
      <div
        ref={pinRef}
        className="w-full h-screen overflow-hidden bg-black relative flex items-center justify-center select-none"
      >
        {/* TOP EDITORIAL SECTION HEADER */}
        <div className="absolute top-6 md:top-8 left-12 md:left-24 right-8 md:right-16 z-30 flex items-center justify-between border-b border-zinc-800/80 pb-3 md:pb-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full ${primaryBgClass}`} />
            <span className="font-mono text-xs font-bold tracking-widest text-zinc-300 uppercase">
              TECHNICAL MASTERY // 03 SKILLS
            </span>
          </div>

          <h2 className="text-lg md:text-2xl font-black tracking-tight text-white uppercase font-sans">
            TECHNICAL <span className={primaryTextClass}>MASTERY</span>
          </h2>

          <div className="hidden md:flex items-center gap-2 font-mono text-xs text-zinc-400 bg-zinc-950 px-3.5 py-1.5 rounded-full border border-zinc-800">
            <span>SYSTEM</span>
            <span className={`font-bold ${primaryTextClass}`}>SKILLS</span>
            <span className="text-zinc-500">//</span>
            <span className="text-white font-bold">5 ZONES</span>
          </div>
        </div>

        {/* FULL HEIGHT LEFT VERTICAL LASER PROGRESS RAIL */}
        <div className="absolute left-4 md:left-12 lg:left-16 top-24 bottom-16 w-[2px] bg-zinc-800 rounded-full overflow-hidden z-20">
          <div
            className={`laser-progress-bar absolute top-0 left-0 w-full h-1/5 rounded-full ${primaryBgClass}`}
          />
        </div>

        {/* GIANT BACKGROUND WATERMARK TYPOGRAPHY */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0">
          {SKILL_ZONES.map((zone) => (
            <span
              key={`watermark-${zone.id}`}
              className="watermark-text absolute text-[14vw] md:text-[18vw] font-black uppercase text-zinc-800/40 tracking-tighter leading-none select-none will-change-transform will-change-opacity whitespace-nowrap"
            >
              {zone.watermark}
            </span>
          ))}
        </div>

        {/* MAIN GRID: LEFT CONTENT + RIGHT WHEEL SELECTOR */}
        <div className="w-full max-w-[1500px] mx-auto px-8 md:px-16 lg:px-24 pl-12 md:pl-24 lg:pl-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10">
          {/* LEFT PANEL: ZONE CONTENT */}
          <div className="lg:col-span-7 relative h-[420px] md:h-[450px] w-full flex items-center">
            <div className="relative w-full">
              {SKILL_ZONES.map((zone) => (
                <div
                  key={zone.id}
                  className="skill-content absolute top-1/2 -translate-y-1/2 left-0 right-0 will-change-transform will-change-opacity"
                >
                  {/* TOP NUMERIC HUD COUNTER */}
                  <div className="flex items-baseline gap-2 mb-3 md:mb-4">
                    <span
                      className={`text-4xl md:text-6xl font-black font-mono tracking-tighter ${primaryTextClass}`}
                    >
                      {zone.numberStr}
                    </span>
                    <span className="text-zinc-500 font-mono text-xl md:text-2xl font-bold">
                      / 05
                    </span>
                  </div>

                  {/* SUB-HEADING & TITLE */}
                  <div className="flex items-center gap-3 mb-5 md:mb-7">
                    <span className="font-mono text-xl md:text-3xl font-bold text-zinc-500">
                      {zone.numberStr} //
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none">
                      {zone.title}
                    </h2>
                  </div>

                  {/* TECH STACK MATTE CARDS */}
                  <div className="flex flex-wrap items-center gap-2.5 md:gap-3.5 max-w-2xl">
                    {zone.skills.map((skill) => {
                      const SkillIcon = skill.icon;
                      return (
                        <div
                          key={skill.name}
                          className="px-4 py-2.5 md:px-5 md:py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center gap-3 hover:border-zinc-600 transition-all duration-300 group shadow-md"
                        >
                          <div className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 group-hover:scale-105 transition-transform duration-300">
                            <SkillIcon
                              className={`w-4 h-4 md:w-5 md:h-5 ${primaryTextClass}`}
                            />
                          </div>
                          <span className="font-mono text-xs md:text-sm font-semibold text-zinc-200 tracking-wide">
                            {skill.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL: 360-DEGREE ROTATING WHEEL SELECTOR */}
          <div className="lg:col-span-5 relative flex items-center justify-center h-[340px] md:h-[450px] w-full">
            {/* MAIN ROTATING RING */}
            <div className="wheel-ring absolute w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-full border border-zinc-800 will-change-transform [--ring-radius:150px] md:[--ring-radius:190px]">
              {SKILL_ZONES.map((zone, i) => {
                const rotation = i * (360 / SKILL_ZONES.length);
                const ZoneIcon = zone.icon;

                return (
                  <div
                    key={`node-${zone.id}`}
                    className="node-wrapper absolute top-1/2 left-1/2 w-14 h-14 md:w-16 md:h-16 -mt-7 -ml-7 md:-mt-8 md:-ml-8 will-change-transform will-change-opacity"
                    style={{
                      transform: `rotate(${rotation}deg) translateX(calc(-1 * var(--ring-radius, 150px))) rotate(${-rotation}deg)`,
                    }}
                  >
                    <div
                      className={`wheel-icon w-full h-full rounded-full bg-zinc-950 border flex items-center justify-center transition-colors duration-300 ${
                        i === 0
                          ? primaryBorderClass
                          : 'border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      <ZoneIcon
                        className={`w-5 h-5 md:h-6 md:w-6 ${
                          i === 0 ? 'text-white' : 'text-zinc-500'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CENTER HUB */}
            <div
              className={`absolute z-20 w-28 h-28 md:w-36 md:h-36 rounded-full bg-zinc-950 flex items-center justify-center flex-col border shadow-xl ${
                isRed ? 'border-red-500/50' : 'border-blue-600/50'
              }`}
            >
              <div className="relative w-full h-10 md:h-12 overflow-hidden flex items-center justify-center mb-0.5">
                {SKILL_ZONES.map((zone) => (
                  <span
                    key={`hub-${zone.id}`}
                    className={`hub-number absolute text-3xl md:text-5xl font-black ${primaryTextClass} will-change-transform will-change-opacity`}
                  >
                    {zone.numberStr}
                  </span>
                ))}
              </div>

              <div className="w-6 md:w-8 h-[1px] bg-zinc-800 mb-0.5" />
              <span className="font-mono text-[10px] md:text-xs text-zinc-500 tracking-widest font-bold">
                05
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM SCROLL INDICATOR */}
        <div className="absolute bottom-6 md:bottom-8 left-6 md:left-12 lg:left-16 flex items-center gap-3 opacity-60 z-20">
          <div className={`w-8 h-[2px] ${primaryBgClass}`} />
          <span className="font-mono text-[10px] md:text-xs text-zinc-400 tracking-[0.3em] uppercase font-semibold">
            SCROLL TO CYCLE THROUGH ZONES
          </span>
        </div>
      </div>
    </section>
  );
}
