import { useState } from 'react';

const ABOUT = {
  bio_paragraph_1:
    'Saya adalah mahasiswa Ilmu Komputer semester 5 di Universitas Putra Bangsa yang memiliki ketertarikan kuat pada pengembangan perangkat lunak dan kreativitas digital. Saya berfokus pada pengembangan aplikasi web modern, dengan perhatian pada kode yang bersih, mudah dipelihara, serta desain yang mudah digunakan.',

  bio_paragraph_2:
    'Saya sangat tertarik untuk memahami logika sistem, arsitektur perangkat lunak, serta teknologi yang bekerja di balik aplikasi modern agar dapat membangun solusi yang efisien, skalabel, dan dapat diandalkan. Saya terus meningkatkan kemampuan melalui proyek-proyek nyata, mempelajari teknologi baru, dan menerapkan konsep pengembangan perangkat lunak untuk menyelesaikan permasalahan di dunia nyata.',

  bio_paragraph_3:
    'Di luar pemrograman, saya juga memiliki ketertarikan pada video editing dan digital content creation, di mana saya menggabungkan kemampuan teknis dan kreativitas untuk menghasilkan karya visual yang menarik.',

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
