import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Zap, Shield, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceProps {
  theme: 'red' | 'blue';
}

const DEPLOYMENTS = [
  {
    id: 'fyno',
    index: '01',
    period: 'APR 2026 – JUL 2026',
    type: 'FULL STACK',
    role: 'Full Stack Developer Intern',
    company: 'Fyno Digital',
    watermark: 'FYNO',
    icon: Zap,
    impact: [
      'Built two full-stack CRM platforms (MERN) with RBAC, JWT auth, and real-time Socket.IO notifications.',
      'Integrated Gemini AI and Google Sheets API to automate lead sync and generate business insights via dashboards.',
      'Converted both platforms into native Android APKs using Android Studio for mobile access.',
      'Automated budget tracking and multi-channel alerts (Telegram, Resend API) via Node-cron and Meta Graph API.',
    ],
    stack: ['MERN', 'SOCKET.IO', 'GEMINI AI', 'ANDROID', 'NODE-CRON', 'META API'],
  },
  {
    id: 'aicte',
    index: '02',
    period: 'JAN 2025 – APR 2025',
    type: 'FULL STACK + AI',
    role: 'Full Stack + AI Development Intern',
    company: 'AICTE EduSkills',
    watermark: 'AICTE',
    icon: Shield,
    impact: [
      'Secured backend endpoints with JWT auth middleware across all API routes.',
      'Maintained continuous CI/CD pipelines and Git workflow for seamless deployments.',
    ],
    stack: ['JWT AUTH', 'CI/CD', 'REACT', 'NODE.JS'],
  },
  {
    id: 'prepinsta',
    index: '03',
    period: 'JUN 2024 – AUG 2024',
    type: 'FULL STACK',
    role: 'Full Stack Web Development Intern',
    company: 'PrepInsta Technologies',
    watermark: 'PREP',
    icon: Code2,
    impact: [
      'Optimized 15+ core web features via REST API integrations.',
      'Resolved 25+ critical defects via Postman API debugging.',
    ],
    stack: ['REST API', 'POSTMAN', 'NODE.JS'],
  },
];

export default function Experience({ theme }: ExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const isRed = theme === 'red';
  const primaryBg = isRed ? 'bg-red-500' : 'bg-blue-600';
  const primaryText = isRed ? 'text-red-500' : 'text-blue-500';
  const primaryBorder = isRed ? 'border-red-500/40' : 'border-blue-500/40';

  useGSAP(
    () => {
      const total = DEPLOYMENTS.length;

      // Initial states
      gsap.set('.exp-content', { opacity: 0, y: 40, pointerEvents: 'none' });
      gsap.set('.exp-content:first-child', { opacity: 1, y: 0, pointerEvents: 'auto' });

      gsap.set('.exp-watermark', { opacity: 0, scale: 0.92 });
      gsap.set('.exp-watermark:first-child', { opacity: 0.04, scale: 1 });

      gsap.set('.exp-counter', { opacity: 0, scale: 0.7 });
      gsap.set('.exp-counter:first-child', { opacity: 1, scale: 1 });

      gsap.set('.exp-bignum', { opacity: 0, scale: 0.7 });
      gsap.set('.exp-bignum:first-child', { opacity: 1, scale: 1 });

      gsap.set('.exp-progress-fill', { height: `${(1 / total) * 100}%` });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: pinRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      });

      for (let i = 0; i < total - 1; i++) {
        const label = `dep${i}`;
        tl.addLabel(label, i);

        // Progress bar
        tl.to('.exp-progress-fill', { height: `${((i + 2) / total) * 100}%`, ease: 'none' }, label);

        // Counter dots
        tl.to(`.exp-dot:nth-child(${i + 1})`, { opacity: 0.25, scale: 0.7, ease: 'none' }, label);
        tl.to(`.exp-dot:nth-child(${i + 2})`, { opacity: 1, scale: 1.2, ease: 'none' }, label);

        // Content panels
        tl.to(`.exp-content:nth-child(${i + 1})`, { opacity: 0, y: -40, pointerEvents: 'none', ease: 'none' }, label);
        tl.to(`.exp-content:nth-child(${i + 2})`, { opacity: 1, y: 0, pointerEvents: 'auto', ease: 'none' }, label);

        // Watermarks
        tl.to(`.exp-watermark:nth-child(${i + 1})`, { opacity: 0, scale: 1.08, ease: 'none' }, label);
        tl.to(`.exp-watermark:nth-child(${i + 2})`, { opacity: 0.04, scale: 1, ease: 'none' }, label);

        // Header counter
        tl.to(`.exp-counter:nth-child(${i + 1})`, { opacity: 0, scale: 1.3, ease: 'none' }, label);
        tl.to(`.exp-counter:nth-child(${i + 2})`, { opacity: 1, scale: 1, ease: 'none' }, label);

        // Big number stamp
        tl.to(`.exp-bignum:nth-child(${i + 1})`, { opacity: 0, scale: 1.3, ease: 'none' }, label);
        tl.to(`.exp-bignum:nth-child(${i + 2})`, { opacity: 1, scale: 1, ease: 'none' }, label);

        ScrollTrigger.refresh();
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="experience-content"
      ref={containerRef}
      className="relative w-full bg-black"
      style={{ height: `${DEPLOYMENTS.length * 150}vh` }}
    >
      <div
        ref={pinRef}
        className="w-full h-screen overflow-hidden bg-black relative flex flex-col select-none"
      >
        {/* ── EDITORIAL HEADER ── */}
        <div className="relative z-30 w-full flex items-center justify-between border-b border-zinc-800/80 px-6 md:px-12 lg:px-16 py-4 md:py-5">
          <div className="flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full ${primaryBg}`} />
            <span className="font-mono text-xs font-bold tracking-widest text-zinc-300 uppercase">
              FIELD DEPLOYMENT // INTERNSHIPS
            </span>
          </div>

          <h2 className="text-lg md:text-2xl font-black tracking-tight text-white uppercase font-sans">
            BATTLE <span className={primaryText}>RECORD</span>
          </h2>

          {/* Live index counter */}
          <div className="hidden md:flex items-center gap-2 font-mono text-xs text-zinc-400 bg-zinc-950 px-3.5 py-1.5 rounded-full border border-zinc-800">
            <span>DEPLOYMENT</span>
            <div className="relative h-4 w-5 overflow-hidden">
              {DEPLOYMENTS.map((d) => (
                <span
                  key={`idx-${d.id}`}
                  className={`exp-counter absolute inset-0 flex items-center justify-center font-bold will-change-transform ${primaryText}`}
                >
                  {d.index}
                </span>
              ))}
            </div>
            <span className="text-zinc-500">/</span>
            <span className="text-white font-bold">0{DEPLOYMENTS.length}</span>
          </div>
        </div>

        {/* ── GIANT WATERMARK ── */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0">
          {DEPLOYMENTS.map((d) => (
            <span
              key={`wm-${d.id}`}
              className="exp-watermark absolute font-black uppercase tracking-tighter leading-none select-none will-change-transform text-white [-webkit-text-stroke:1px_rgba(255,255,255,0.07)]"
              style={{ fontSize: 'clamp(80px, 18vw, 260px)' }}
            >
              {d.watermark}
            </span>
          ))}
        </div>

        {/* ── LEFT PROGRESS RAIL ── */}
        <div className="absolute left-4 md:left-8 top-24 bottom-16 w-[2px] bg-zinc-800 rounded-full overflow-hidden z-20">
          <div className={`exp-progress-fill absolute top-0 left-0 w-full rounded-full ${primaryBg}`} />
        </div>

        {/* ── DOT NAV ── */}
        <div className="absolute left-[7px] md:left-[23px] top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
          {DEPLOYMENTS.map((d, i) => (
            <div
              key={`dot-${d.id}`}
              className={`exp-dot w-2.5 h-2.5 rounded-full will-change-transform ${i === 0 ? `scale-[1.2] ${primaryBg}` : 'opacity-25 scale-[0.7] bg-zinc-500'}`}
            />
          ))}
        </div>

        {/* ── MAIN CONTENT PANELS ── */}
        <div className="flex-1 relative w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-20 flex items-center z-10">
          {DEPLOYMENTS.map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.id}
                className="exp-content absolute inset-x-8 md:inset-x-16 lg:inset-x-20 will-change-transform grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* LEFT: MISSION INFO */}
                <div className="lg:col-span-6 flex flex-col gap-5">
                  {/* Top meta row */}
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-[10px] font-bold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border ${primaryBorder} ${primaryText} bg-black/80`}>
                      {d.type}
                    </span>
                    <span className="h-px w-8 bg-zinc-700" />
                    <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">{d.period}</span>
                  </div>

                  {/* Role title */}
                  <div>
                    <h3 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black text-white uppercase tracking-tight leading-[1.02]">
                      {d.role.split(' ').slice(0, -1).join(' ')}
                    </h3>
                    <h3 className={`font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black uppercase tracking-tight leading-[1.02] ${primaryText}`}>
                      {d.role.split(' ').slice(-1)[0]}
                    </h3>
                  </div>

                  {/* Company badge */}
                  <div className={`inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-xl bg-zinc-950 border ${primaryBorder}`}>
                    <Icon className={`w-4 h-4 ${primaryText}`} />
                    <span className="font-mono text-xs font-bold tracking-widest text-white uppercase">{d.company}</span>
                  </div>

                  {/* Stack tags */}
                  <div className="flex flex-wrap gap-2">
                    {d.stack.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase rounded-md bg-zinc-900 text-zinc-300 border border-zinc-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* RIGHT: IMPACT LOG */}
                <div className="lg:col-span-6 flex flex-col gap-3">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`w-1 h-4 rounded-full ${primaryBg}`} />
                    <span className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500">
                      IMPACT LOG
                    </span>
                  </div>

                  <div className={`rounded-2xl bg-zinc-950 border ${primaryBorder} p-5 md:p-6 space-y-4`}>
                    {d.impact.map((line, i) => (
                      <div key={i} className="flex items-start gap-3 group">
                        <div className={`mt-[7px] w-[5px] h-[5px] rounded-full shrink-0 ${primaryBg} group-hover:scale-125 transition-transform duration-200`} />
                        <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-sans">{line}</p>
                      </div>
                    ))}
                  </div>

                  {/* Deployment index stamp */}
                  <div className="flex items-center justify-end gap-2 mt-1">
                    <span className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase">DEPLOYMENT</span>
                    <span className={`font-mono text-xs font-black ${primaryText}`}>{d.index} / 0{DEPLOYMENTS.length}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── BOTTOM SCROLL CUE ── */}
        <div className="absolute bottom-5 md:bottom-7 left-6 md:left-12 lg:left-16 flex items-center gap-3 opacity-50 z-20">
          <div className={`w-8 h-[2px] ${primaryBg}`} />
          <span className="font-mono text-[10px] text-zinc-400 tracking-[0.3em] uppercase font-semibold">
            SCROLL TO CYCLE DEPLOYMENTS
          </span>
        </div>

        {/* ── RIGHT SIDE: GIANT INDEX NUMBER ── */}
        <div className="absolute right-6 md:right-12 lg:right-16 bottom-8 z-20 pointer-events-none">
          <div className="relative h-16 md:h-20 overflow-hidden flex items-center">
            {DEPLOYMENTS.map((d) => (
              <span
                key={`bigidx-${d.id}`}
                className={`exp-bignum absolute font-black font-mono will-change-transform ${primaryText}`}
                style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}
              >
                {d.index}
              </span>
            ))}
          </div>
          <div className={`h-[2px] w-full ${primaryBg} opacity-40`} />
          <span className="font-mono text-[10px] text-zinc-600 tracking-[0.3em] uppercase mt-1 block text-right">
            ACTIVE
          </span>
        </div>
      </div>
    </section>
  );
}
