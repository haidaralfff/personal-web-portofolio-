import { useState } from 'react';
import SipbansosImg from '../portofolio/sipbansos.png';
import CoffeImg from '../portofolio/coffe.png';

const PROJECTS = [
  {
    id: 1,
    title: 'SIPBANSOS',
    category: 'Sistem Informasi',
    description: 'Sistem Informasi Bantuan Sosial — platform buat ngelola data bantuan sosial, mulai dari pengajuan sampai distribusinya, dengan tampilan yang gampang dipakai.',
    features: ['Kelola Data', 'Lacak Pengajuan', 'Login Aman', 'Tampilan Responsif'],
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
    description: 'Menu digital dan sistem POS buat kedai kopi. Dibuat buat alur dari lihat menu sampai checkout, dengan tampilan senyaman kopinya.',
    features: ['Navigasi', 'Section', 'Responsif', 'Animasi'],
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
