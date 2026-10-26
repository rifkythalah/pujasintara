/** @typedef {{id: string, src: string, alt: string, kind: 'welcome' | 'information'}} HeroSlide */
export const heroInterval = 5000;
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
  {"id": "naskah-memory-of-the-world", "src": "/assets/1744591601_cdbdd251e4cabe6dbe03.png", "alt": "Banner naskah Sang Hyang Siksa Kandang Karesian dan karya Hamzah Fansuri, Memory of the World.", "kind": "information"},
  {"id": "hut-perpusnas-46", "src": "/assets/1777340793_9894a6f04be531191bca.jpg", "alt": "Banner ulang tahun ke-46 Perpusnas: Merawat Pustaka, Memartabatkan Bangsa.", "kind": "information"},
  {"id": "pancasila-tambahan", "src": "/assets/1791953659_4489d110cb19e35ccf30 copy.jpg", "alt": "Banner peringatan Hari Kesaktian Pancasila, 1 Oktober 2026.", "kind": "information"},
  {"id": "hari-museum-indonesia", "src": "/assets/1792035678_e8dbacb2518f63b160a9.jpg", "alt": "Banner Selamat Hari Museum Indonesia, 12 Oktober 2026.", "kind": "information"},
  {"id": "hari-perpustakaan-sekolah", "src": "/assets/1792650397_6fe7e700d1b04c209039.jpg", "alt": "Banner Hari Perpustakaan Sekolah Internasional, 18 Oktober 2026.", "kind": "information"},
  {"id": "hari-kebudayaan-nasional", "src": "/assets/1792650647_05738698647bf30cb06b.jpg", "alt": "Banner Hari Kebudayaan Nasional, 17 Oktober 2026.", "kind": "information"},
];
