import { useState } from 'react';
import SipbansosImg from '../portofolio/sipbansos.png';
import CoffeImg from '../portofolio/coffe.png';

const PROJECTS = [
  {
    id: 1,
    title: 'SIPBANSOS',
    category: 'Social Assistance',
    description: 'Sistem Informasi Bantuan Sosial — a platform for managing social assistance data, streamlining the process from application to distribution with a clean, accessible interface.',
    features: ['Data Management', 'Application Tracking', 'Secure Auth', 'Responsive Design'],
    tech_stack: ['Reactjs', 'Tailwind CSS', 'Go', 'PostgreSQL'],
    image: SipbansosImg,
    github_url: 'https://github.com/haidaralfff/SIPBANSOS',
    live_url: 'https://sipbansos.vercel.app/',
    order: 1,
  },
  {
    id: 2,
    title: 'Simple Coffee Landing Page',
    category: 'Landing Page',
    description: 'Digital menu and POS system for a modern coffee shop. Built to handle the flow from browsing to checkout with an interface that feels as warm as the coffee it serves.',
    features: ['Navigation', 'Section', 'Responsive Design', 'Animations'],
    tech_stack: ['HTML', 'CSS', 'JavaScript', 'AOS Library'],
    image: CoffeImg,
    github_url: 'https://github.com/haidaralfff/simple-coffeshop',
    live_url: 'https://simple-coffeshop.vercel.app/',
    order: 2,
  },
];

export function useProjects() {
  const [projects] = useState(PROJECTS);

  return { projects, loading: false, error: null };
}
