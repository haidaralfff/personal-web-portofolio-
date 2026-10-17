import { useState } from 'react';

const EXPERIENCES = [
  {
    id: 1,
    title: 'SMK Maarif 9 Kebumen',
    organization: 'Teknik Kendaraan Ringan',
    period: '2021 – 2024',
    description: 'Belajar soal sistem kendaraan, mesin, sampai elektronik otomotif.',
    skills: ['Mekanika', 'Mesin', 'Diagnosa'],
    type: 'education',
    is_current: false,
    order: 1,
  },
  {
    id: 2,
    title: 'Mahasiswa Ilmu Komputer',
    organization: 'Universitas Putra Bangsa',
    period: 'Semester 4',
    description: 'Lagi belajar web development, database, sampai bikin aplikasi yang beneran jalan.',
    skills: ['Web Development', 'Database', 'UI/UX'],
    type: 'education',
    is_current: true,
    order: 2,
  },
  {
    id: 3,
    title: 'Web Developer',
    organization: null,
    period: '2024 - Sekarang',
    description: 'Bikin website modern dan sistem yang jalan.',
    skills: ['Membangun Website', 'Berpikir Kritis dan Analitis', 'Pemecahan Masalah', 'Pengembangan Perangkat Lunak'],
    type: 'work',
    is_current: true,
    order: 3,
  },
];

export function useExperiences() {
  const [experiences] = useState(EXPERIENCES);

  return { experiences, loading: false, error: null };
}
