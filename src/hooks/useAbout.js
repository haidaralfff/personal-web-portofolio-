import { useState } from 'react';

const ABOUT = {
  bio_paragraph_1:
    'Mahasiswa Ilmu Komputer semester 5 di Universitas Putra Bangsa. Suka banget bikin software dan main-main sama kreativitas digital. Fokusnya ke web modern — kode rapi, gampang dirawat, dan desain yang enak dipakai.',

  bio_paragraph_2:
    'Penasaran sama cara kerja sistem di balik aplikasi, dari arsitektur sampai teknologinya. Makanya terus latihan lewat proyek nyata, belajar tech baru, dan nyoba nyelesaiin masalah yang ada di dunia nyata.',
  tech_stack: [
    'React',
    'Tailwind CSS',
    'JavaScript',
    'Node.js',
    'Express',
    'PostgreSQL',
    'Supabase',
    'Git',
    'Figma',
  ],
};
export function useAbout() {
  const [about] = useState(ABOUT);

  return { about, loading: false, error: null };
}
