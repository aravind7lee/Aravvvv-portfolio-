import ScrollImagesPro, { type ScrollImageItem } from './ScrollImagesPro';

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
    id: 'resuflow',
    title: 'ResuFlow',
    giantTitle: 'ONE',
    heading: 'AI-Powered Resume Builder',
    tags: ['MERN', 'AI', 'Google Gemini', 'ImageKit', 'REST API', 'Responsive'],
    description:
      'ResuFlow enables users to create, edit, and manage professional resumes with live preview, shareable online links, and AI-based optimization powered by Google Gemini AI. Features smart suggestions, keyword enhancement, image background removal using ImageKit, secure authentication, and 12+ professional templates. Delivers a smooth, fast, and intuitive user experience across all devices.',
    image: resuFlowImg,
  },
  {
    id: 'grind-x',
    title: 'GRIND-X',
    giantTitle: 'TWO',
    heading: 'Full-Stack Fitness App (MERN)',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Cloudinary'],
    description:
      'Full-stack fitness app built with MERN stack featuring real-time workout tracking, nutrition monitoring, and custom workout plans. Includes JWT authentication, Cloudinary integration, drag-and-drop workout builder, interactive analytics dashboard with Chart.js, and comprehensive nutrition database with cross-device data persistence.',
    image: grindXImg,
  },
  {
    id: 'genora',
    title: 'Genora.ai',
    giantTitle: 'THREE',
    heading: 'AI SaaS Platform (PERN)',
    tags: ['React', 'Node', 'Postgres', 'Clerk', 'Stripe', 'AI'],
    description:
      'Genora.ai is a production AI SaaS featuring article & blog title generators, image generation, background/object remover and resume analyzer. Built with a PERN stack, Clerk authentication, and Stripe subscription billing; deployed on Vercel with Neon Postgres.',
    image: genoraImg,
  },
  {
    id: 'chattrix',
    title: 'Chattrix',
    giantTitle: 'FOUR',
    heading: 'Real-time Chat Engine',
    tags: ['Socket.IO', 'MERN', 'Realtime', 'Websockets'],
    description:
      'Chattrix is a full-stack chat app built with the MERN stack and Socket.IO. Real-time messaging, presence and media preview with a focus on low-latency interactions and mobile responsiveness.',
    image: chattrixImg,
  },
  {
    id: 'cravezyy',
    title: 'Cravezyy',
    giantTitle: 'FIVE',
    heading: 'Food Delivery App (MERN)',
    tags: ['MERN', 'MongoDB', 'Express', 'React', 'Node', 'Socket'],
    description:
      'Food delivery app built on the MERN stack — features meal planning, sticky cart and nutrition based filtering. Focused on mobile-first experiences and smooth ordering flows. Deployed with Render.',
    image: cravezyImg,
  },
];

export default function Works({ theme }: WorksProps) {
  return (
    <section id="works" className="relative w-full bg-black">
      {/* Bi-Directional Pinned Scroll Gallery Component */}
      <ScrollImagesPro items={PROJECTS_DATA} theme={theme} />
    </section>
  );
}
