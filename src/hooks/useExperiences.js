import { useState } from 'react';

const EXPERIENCES = [
  {
    id: 1,
    title: 'SMK Maarif 9 Kebumen',
    organization: 'Light Vehicle Engineering',
    period: '2021 – 2024',
    description: 'Studied vehicle systems, mechanics, automotive electronics, and engine diagnostics.',
    skills: ['Mechanical', 'Engine', 'Diagnostics'],
    type: 'education',
    is_current: false,
    order: 1,
  },
  {
    id: 2,
    title: 'Computer Science Student',
    organization: 'Universitas Putra Bangsa',
    period: 'Semester 4',
    description: 'Studying web development, data structures, databases, and building modern applications.',
    skills: ['Web Development', 'Database', 'UI/UX'],
    type: 'education',
    is_current: true,
    order: 2,
  },
  {
    id: 3,
    title: 'Web Developer',
    organization: null,
    period: '2024 - Present',
    description: 'Building modern websites and implementing systems.',
    skills: ['Fullstack Developer', 'React', 'Tailwind'],
    type: 'work',
    is_current: true,
    order: 3,
  },
];

export function useExperiences() {
  const [experiences] = useState(EXPERIENCES);

  return { experiences, loading: false, error: null };
}
