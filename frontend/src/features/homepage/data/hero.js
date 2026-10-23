/** @typedef {{id: string, src: string, alt: string, kind: 'welcome' | 'information'}} HeroSlide */
export const heroInterval = 3000;
export const heroCopy = {
  welcome: 'Selamat Datang di Situs Web',
  institution: 'Pusat Jasa Informasi Perpustakaan dan Pengelolaan Naskah Nusantara',
  title: 'Pujasintara • Perpustakaan Nasional Republik Indonesia',
  tagline: 'Pujasintara Melayani Nusantara',
  action: 'Lihat Agenda Kegiatan Gedung Layanan Perpusnas',
  routeId: 'agenda',
};
/** @type {HeroSlide[]} */
export const heroSlides = [
  { id: 'gedung-perpusnas', src: '/assets/Gambar ChatGPT 25 Sep 2026, 10.45.19 1.png', alt: 'Tampak depan gedung Perpustakaan Nasional Republik Indonesia.', kind: 'welcome' },
  { id: 'hari-kesaktian-pancasila', src: '/assets/1791953659_4489d110cb19e35ccf30.jpg', alt: 'Memperingati Hari Kesaktian Pancasila, 1 Oktober 2026. Pancasila Pemersatu Bangsa. Menuju Indonesia Berdaulat, Adil, dan Makmur.', kind: 'information' },
  // Append supplied banner assets with kind: 'information'; no welcome text or CTA.
];
