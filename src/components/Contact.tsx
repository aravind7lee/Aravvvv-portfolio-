import React, { useState, useEffect } from 'react';
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  ArrowUp,
  Send,
  GitBranch,
  Globe,
  Clock,
  Terminal,
  ShieldAlert,
} from 'lucide-react';

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

interface ContactProps {
  theme: 'selection' | 'red' | 'blue';
}

export default function Contact({ theme }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [timeStr, setTimeStr] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const isRed = theme === 'red';
  const primaryBgClass = isRed ? 'bg-red-500' : 'bg-blue-600';
  const primaryTextClass = isRed ? 'text-red-500' : 'text-blue-500';

  const emailAddress = 'aravindrajaa03@gmail.com';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeStr(now.toLocaleTimeString('en-US', options) + ' IST');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      num: '01',
      name: 'GITHUB',
      handle: 'github.com/aravind7lee',
      href: 'https://github.com/aravind7lee',
      icon: GitBranch,
    },
    {
      num: '02',
      name: 'LINKEDIN',
      handle: 'linkedin.com/in/aravind042',
      href: 'https://linkedin.com/in/aravind042',
      icon: LinkedinIcon,
    },
    {
      num: '03',
      name: 'INSTAGRAM',
      handle: '@aravvvvv.___',
      href: 'https://www.instagram.com/aravvvvv.___',
      icon: InstagramIcon,
    },
    {
      num: '04',
      name: 'EMAIL MAIL',
      handle: 'aravindrajaa03@gmail.com',
      href: 'mailto:aravindrajaa03@gmail.com',
      icon: Mail,
    },
  ];

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-black text-white pt-24 pb-16 px-6 md:px-12 lg:px-20 flex flex-col justify-between select-none border-t border-zinc-900 z-[40]"
    >
      <div className="w-full max-w-7xl mx-auto space-y-16 my-auto">
        {/* HEADER */}
        <div className="space-y-6 border-b border-zinc-800/80 pb-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className={`w-2.5 h-2.5 rounded-full ${primaryBgClass}`} />
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-zinc-400 uppercase flex items-center gap-2">
                {isRed ? (
                  <>
                    <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
                    <span>05 // CRIMSON TRANSMISSION LINK</span>
                  </>
                ) : (
                  <>
                    <Terminal className="w-3.5 h-3.5 text-blue-500" />
                    <span>05 // COBALT TRANSMISSION LINK</span>
                  </>
                )}
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[10px] md:text-xs font-bold tracking-wider text-zinc-300 uppercase">
                OPEN FOR FULL-TIME ROLES & CONTRACTS
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2">
            <div className="space-y-2">
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-sans leading-none">
                INITIATE <span className={primaryTextClass}>TRANSMISSION.</span>
              </h2>
              <p className="text-xs md:text-sm text-zinc-400 font-mono max-w-xl leading-relaxed pt-1">
                Reach out directly for full-time roles, SaaS platforms, or high-impact contracts.
              </p>
            </div>

            {/* DIRECT EMAIL BAR */}
            <div className="flex flex-wrap items-center gap-3 bg-zinc-950 border border-zinc-800 p-2.5 rounded-2xl shadow-xl shrink-0">
              <a
                href={`mailto:${emailAddress}`}
                className="font-mono text-sm sm:text-base font-bold text-white hover:text-zinc-300 transition-colors px-3 py-1"
              >
                {emailAddress}
              </a>
              <button
                onClick={handleCopy}
                className={`py-2 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : isRed
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>COPIED ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY MAIL</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MAIN 2-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-6 space-y-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">
                  LOCAL TIMEZONE
                </span>
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-white pt-0.5">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{timeStr || '12:35 PM IST'}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">
                  PRIMARY LOCATION
                </span>
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-white pt-0.5">
                  <Globe className="w-3.5 h-3.5 text-zinc-400" />
                  <span>INDIA • WORLDWIDE</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                <span className="font-mono text-xs font-bold text-zinc-400 tracking-wider uppercase">
                  // CONNECT ACROSS NETWORKS
                </span>
                <span className="font-mono text-[10px] text-zinc-500">
                  4 DIRECT CHANNELS
                </span>
              </div>

              <div className="divide-y divide-zinc-800/60 border-y border-zinc-800/60">
                {socialLinks.map((social) => {
                  const IconComp = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between py-4 transition-all duration-300 hover:px-2 cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs font-bold text-zinc-600 group-hover:text-white transition-colors">
                          {social.num}
                        </span>
                        <IconComp className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                        <span className="font-mono text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">
                          {social.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="hidden sm:inline font-mono text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                          {social.handle}
                        </span>
                        <ArrowUpRight className={`w-4 h-4 text-zinc-600 group-hover:text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${primaryTextClass}`} />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: FORM TERMINAL */}
          <div className="lg:col-span-6 w-full">
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-xl space-y-8">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight font-sans">
                    DIRECT MESSAGE FORM
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mt-1">
                    Send a message straight to my inbox.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 font-mono text-[10px] text-zinc-400">
                  <Mail className="w-3 h-3 text-zinc-400" />
                  <span>DIRECT INBOX</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 01: NAME */}
                <div className="group relative border-b border-zinc-800 focus-within:border-zinc-500 transition-colors">
                  <label className="flex items-center gap-2 font-mono text-xs font-bold text-zinc-500 uppercase pb-1">
                    <span className="text-[10px] text-zinc-600 group-focus-within:text-white">01 //</span>
                    <span className="group-focus-within:text-white">YOUR NAME</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent text-white font-mono text-sm py-2 focus:outline-none placeholder-zinc-700"
                  />
                  <span className={`absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-focus-within:w-full ${primaryBgClass}`} />
                </div>

                {/* 02: EMAIL */}
                <div className="group relative border-b border-zinc-800 focus-within:border-zinc-500 transition-colors">
                  <label className="flex items-center gap-2 font-mono text-xs font-bold text-zinc-500 uppercase pb-1">
                    <span className="text-[10px] text-zinc-600 group-focus-within:text-white">02 //</span>
                    <span className="group-focus-within:text-white">YOUR EMAIL</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent text-white font-mono text-sm py-2 focus:outline-none placeholder-zinc-700"
                  />
                  <span className={`absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-focus-within:w-full ${primaryBgClass}`} />
                </div>

                {/* 03: MESSAGE */}
                <div className="group relative border-b border-zinc-800 focus-within:border-zinc-500 transition-colors">
                  <label className="flex items-center gap-2 font-mono text-xs font-bold text-zinc-500 uppercase pb-1">
                    <span className="text-[10px] text-zinc-600 group-focus-within:text-white">03 //</span>
                    <span className="group-focus-within:text-white">YOUR MESSAGE</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your project, role, or vision..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent text-white font-mono text-sm py-2 focus:outline-none placeholder-zinc-700 resize-none"
                  />
                  <span className={`absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-focus-within:w-full ${primaryBgClass}`} />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className={`w-full py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer shadow-lg ${
                      submitted
                        ? 'bg-emerald-600 text-white'
                        : isRed
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {submitted ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>MESSAGE TRANSMITTED ✓</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>TRANSMIT MESSAGE</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="w-full max-w-7xl mx-auto pt-12 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500 mt-12">
        <div className="flex items-center gap-3">
          <span>© 2026 ARAVIND</span>
          <span>•</span>
          <span>BASED IN INDIA</span>
          <span>•</span>
          <span>WORKING WORLDWIDE</span>
        </div>

        <button
          onClick={scrollToTop}
          className="group px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 flex items-center gap-2 font-mono text-xs font-bold text-zinc-300 hover:text-white transition-all cursor-pointer shadow-md"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
}
