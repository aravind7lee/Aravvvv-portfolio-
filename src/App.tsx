import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SelectionScreen from './components/SelectionScreen';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import SkillsWheel from './components/SkillsWheel';
import Works from './components/Works';
import Contact from './components/Contact';
import ScrollSideNav from './components/ScrollSideNav';
import SectionsPro from './components/SectionsPro';

import revealAboutImg from './assets/sections_pro/reveal_about.png';
import revealExperienceImg from './assets/sections_pro/reveal_experience.png';
import revealSkillsImg from './assets/sections_pro/reveal_skills.png';
import revealWorksImg from './assets/sections_pro/reveal_works.png';
import revealContactImg from './assets/sections_pro/reveal_contact.png';
import heroRedPill from './assets/Hero-RedPill.png';
import heroBluePill from './assets/Hero-BluePill.png';

function App() {
  const [theme, setTheme] = useState<'selection' | 'red' | 'blue'>('selection');

  // Preload high-res hero images in background memory
  useEffect(() => {
    const imgRed = new Image();
    imgRed.src = heroRedPill;
    const imgBlue = new Image();
    imgBlue.src = heroBluePill;
  }, []);

  useEffect(() => {
    if (theme === 'selection') return;

    // Calibrated Lenis smooth scroll engine for gentle, controlled scrolling
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.45, // Halves mouse wheel step speed across all sections
      touchMultiplier: 1.2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after initializing Lenis
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, [theme]);

  if (theme === 'selection') {
    return <SelectionScreen onSelect={setTheme} />;
  }

  return (
    <main className={`min-h-screen w-full flex flex-col bg-background relative overflow-hidden ${theme === 'red' ? 'theme-red' : 'theme-blue'}`}>
      <ScrollSideNav theme={theme} />

      {/* SECTION 01: HERO */}
      <Hero theme={theme} onThemeChange={setTheme} />

      {/* SECTION 02: ABOUT */}
      <SectionsPro
        id="about"
        theme={theme}
        headingText="ABOUT"
        subheading="WHO WE ARE • PERSONAL BACKSTORY"
        revealImage={revealAboutImg}
        bgColor="#000000"
        badge="SECTION 02 • ABOUT"
        description="Full-stack developer specializing in scalable MERN web applications, modern UI/UX design systems, and AI integrations."
        tags={['Full-Stack', 'MERN', 'TypeScript', 'AI Integration', 'GSAP']}
        ctaText="VIEW BIOGRAPHY"
        ctaLink="#about-content"
      />
      <About theme={theme} />

      {/* SECTION 03: EXPERIENCE */}
      <SectionsPro
        id="experience"
        theme={theme}
        headingText="EXPERIENCE"
        subheading="CAREER PATH • DEPLOYMENTS & IMPACT"
        revealImage={revealExperienceImg}
        bgColor="#000000"
        badge="SECTION 03 • EXPERIENCE"
        description="Professional engineering experience across Fyno Digital, AICTE EduSkills, and PrepInsta Technologies."
        tags={['Fyno Digital', 'AICTE', 'PrepInsta', 'MERN Stack', 'Socket.IO']}
        ctaText="VIEW TIMELINE"
        ctaLink="#experience-content"
      />
      <Experience theme={theme} />

      {/* SECTION 04: SKILLS */}
      <SectionsPro
        id="skills-mastery"
        theme={theme}
        headingText="SKILLS"
        subheading="TECHNICAL MASTERY • FULL STACK & AI"
        revealImage={revealSkillsImg}
        bgColor="#000000"
        badge="SECTION 04 • SKILLS"
        description="Technical mastery spanning Frontend engineering, Backend architectures, Databases, Security protocols, and AI SDKs."
        tags={['React.js', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'Docker']}
        ctaText="SPIN SKILLS WHEEL"
        ctaLink="#skills-content"
      />
      <SkillsWheel theme={theme} />

      {/* SECTION 05: WORKS */}
      <SectionsPro
        id="works"
        theme={theme}
        headingText="WORKS"
        subheading="FEATURED PROJECTS • PORTFOLIO"
        revealImage={revealWorksImg}
        bgColor="#000000"
        badge="SECTION 05 • WORKS"
        description="Production full-stack CRM platforms, AI-powered resume builders, real-time chat engines, and fitness applications."
        tags={['Orbyt CRM', 'ResuFlow', 'GRIND-X', 'Genora.ai', 'Chattrix']}
        ctaText="EXPLORE ALL WORKS"
        ctaLink="#works-content"
      />
      <Works theme={theme} />

      {/* SECTION 06: CONTACT */}
      <SectionsPro
        id="contact"
        theme={theme}
        headingText="CONTACT"
        subheading="GET IN TOUCH • LET'S TALK"
        revealImage={revealContactImg}
        bgColor="#000000"
        badge="SECTION 06 • CONTACT"
        description="Open for software engineering roles, full-stack development, AI integrations, and freelance consultations."
        tags={['Open for Roles', 'Direct Email', 'Social Links', 'Instant Connect']}
        ctaText="OPEN CONTACT FORM"
        ctaLink="#contact-content"
      />
      <Contact theme={theme} />
    </main>
  );
}

export default App;
