import ScrollImagesPro, { type ScrollImageItem } from './ScrollImagesPro';

import orbytCrmImg from '../assets/works/orbyt-crm.png';
import leadsCrmImg from '../assets/works/leads-crm.png';
import resuFlowImg from '../assets/works/ResuFlow.png';
import grindXImg from '../assets/works/Grind-X.png';
import genoraImg from '../assets/works/Genora.png';
import chattrixImg from '../assets/works/Chattrix.png';
import cravezyImg from '../assets/works/Cravezy.png';

interface WorksProps {
  theme: 'red' | 'blue';
}

const PROJECTS_DATA: ScrollImageItem[] = [
  {
    id: 'orbyt-crm',
    title: 'Orbyt CRM',
    giantTitle: 'ONE',
    heading: 'Full-Stack CRM Platform',
    tags: ['MERN', 'Socket.IO', 'Gemini AI', 'Zustand', 'RBAC', 'JWT'],
    description:
      'Orbyt CRM is a secure full-stack CRM built on the MERN stack with Role-Based Access Control (RBAC) and JWT authentication. Features a drag-and-drop task management interface powered by Zustand for scalable state management, real-time notifications via Socket.IO, and Gemini AI integration for automated business insights and analytics.',
    image: orbytCrmImg,
    link: '#',
  },
  {
    id: 'leads-crm',
    title: 'Leads Management CRM',
    giantTitle: 'TWO',
    heading: 'Scalable Lead Dashboard',
    tags: ['MERN', 'Socket.IO', 'Zustand', 'Google Sheets API', 'MongoDB', 'Cron'],
    description:
      'A scalable lead management CRM with RBAC for hierarchical employee and admin workflows. Built automated pipelines via Google Sheets API and cron jobs to sync and deduplicate leads in MongoDB. Delivers real-time analytics and live notifications across client sessions using Socket.IO.',
    image: leadsCrmImg,
    link: '#',
  },
  {
    id: 'resuflow',
    title: 'ResuFlow',
    giantTitle: 'THREE',
    heading: 'AI-Powered Resume Builder',
    tags: ['MERN', 'AI', 'Google Gemini', 'ImageKit', 'REST API', 'Responsive'],
    description:
      'ResuFlow enables users to create, edit, and manage professional resumes with live preview, shareable online links, and AI-based optimization powered by Google Gemini AI. Features smart suggestions, keyword enhancement, image background removal using ImageKit, secure authentication, and 12+ professional templates. Delivers a smooth, fast, and intuitive user experience across all devices.',
    image: resuFlowImg,
  },
  {
    id: 'grind-x',
    title: 'GRIND-X',
    giantTitle: 'FOUR',
    heading: 'Full-Stack Fitness App (MERN)',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Cloudinary'],
    description:
      'Full-stack fitness app built with MERN stack featuring real-time workout tracking, nutrition monitoring, and custom workout plans. Includes JWT authentication, Cloudinary integration, drag-and-drop workout builder, interactive analytics dashboard with Chart.js, and comprehensive nutrition database with cross-device data persistence.',
    image: grindXImg,
  },
  {
    id: 'genora',
    title: 'Genora.ai',
    giantTitle: 'FIVE',
    heading: 'AI SaaS Platform (PERN)',
    tags: ['React', 'Node', 'Postgres', 'Clerk', 'Stripe', 'AI'],
    description:
      'Genora.ai is a production AI SaaS featuring article & blog title generators, image generation, background/object remover and resume analyzer. Built with a PERN stack, Clerk authentication, and Stripe subscription billing; deployed on Vercel with Neon Postgres.',
    image: genoraImg,
  },
  {
    id: 'chattrix',
    title: 'Chattrix',
    giantTitle: 'SIX',
    heading: 'Real-time Chat Engine',
    tags: ['Socket.IO', 'MERN', 'Realtime', 'Websockets'],
    description:
      'Chattrix is a full-stack chat app built with the MERN stack and Socket.IO. Real-time messaging, presence and media preview with a focus on low-latency interactions and mobile responsiveness.',
    image: chattrixImg,
  },
  {
    id: 'cravezyy',
    title: 'Cravezyy',
    giantTitle: 'SEVEN',
    heading: 'Food Delivery App (MERN)',
    tags: ['MERN', 'MongoDB', 'Express', 'React', 'Node', 'Socket'],
    description:
      'Food delivery app built on the MERN stack — features meal planning, sticky cart and nutrition based filtering. Focused on mobile-first experiences and smooth ordering flows. Deployed with Render.',
    image: cravezyImg,
  },
];

export default function Works({ theme }: WorksProps) {
  return (
    <section id="works-content" className="relative w-full bg-black">
      {/* Bi-Directional Pinned Scroll Gallery Component */}
      <ScrollImagesPro items={PROJECTS_DATA} theme={theme} />
    </section>
  );
}
