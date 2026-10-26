/** Data demonstrasi lokal; bukan informasi resmi atau respons API. */
export const homepageMock = {
  onlineServices: [
    {
      id: 'radio-wbs',
      title: 'Radio Streaming Perpusnas -\nWidya Bahana Swara',
      description: 'Dengarkan obrolan (podcast) tentang topik-topik menarik seputar layanan Perpusnas, peringatan momen penting nasional & lagu-lagu pilihan, dalam fasilitas streaming radio serta kanal YouTube Widya Bahana Swara.',
      actions: [
        { label: 'Kanal Youtube WBS', href: 'https://www.youtube.com/@WBSRadioPerpusnas', isExternal: true },
        { label: 'Radio Streaming', streamUrl: 'https://widya-bahana-suara.perpusnas.go.id/live?type=http&nocache=2', isAudio: true },
      ],
      thumbnail: '/assets/radio-perpusnas.png',
      heroImage: '/assets/radio-perpusnas.png',
      alt: 'Studio radio streaming dan rekaman podcast Perpusnas Widya Bahana Swara',
    },
    {
      id: 'naskah-nusantara',
      title: 'Layanan Naskah Nusantara',
      description: 'Portal yang mendokumentasikan hasil dari paket kegiatan pendayagunaan naskah Nusantara di berbagai lembaga dan masyarakat.',
      actions: [
        { label: 'Kunjungi Portal Naskah', href: 'https://khastara.perpusnas.go.id/', isExternal: true },
      ],
      thumbnail: '/assets/layanan-naskah-nusantara.png',
      heroImage: '/assets/layanan-naskah-nusantara.png',
      alt: 'Dokumentasi naskah kuno Nusantara dan lontar bersejarah Perpusnas',
    },
    {
      id: 'diseminasi-informasi',
      title: 'Diseminasi Informasi',
      description: 'Ingin mendapatkan paket informasi sesuai subjek yang diminati secara berkala? Berlangganan sekarang, Gratis!',
      actions: [
        { label: 'Daftar Langganan', href: 'https://docs.google.com/forms/d/e/1FAIpQLSfbaNLgkJfH_yD8sTk66BaVWsDlXGQ8oSAYWZW1z0wjtvw5KA/viewform?embedded=true', isExternal: true },
      ],
      thumbnail: '/assets/diseminasi-informasi.png',
      heroImage: '/assets/diseminasi-informasi.png',
      alt: 'Layanan Diseminasi Informasi Terseleksi Perpustakaan Nasional RI',
    },
    {
      id: 'buletin-layanan',
      title: 'Buletin Layanan',
      description: 'Berita layanan, rekomendasi koleksi, dan produk hasil kemas ulang informasi di lingkungan kerja Pujasintara. Buletin ini akan diterbitkan berkala setiap bulan menggunakan layanan surat elektronik.',
      actions: [
        { label: 'Mulai Berlangganan', href: 'https://lembaran.pujasintara.info/', isExternal: true },
      ],
      thumbnail: '/assets/image.png',
      heroImage: '/assets/image.png',
      alt: 'Buletin Layanan Pujasintara Perpustakaan Nasional RI',
    },
  ],
  agenda: [
    { id: 'diskusi', title: 'Diskusi buku dan berbagi perspektif', category: 'Diskusi buku', theme: 'blue' },
    { id: 'kelas', title: 'Mengenal sumber informasi digital', category: 'Kelas literasi', theme: 'green' },
    { id: 'jelajah', title: 'Jelajah ruang dan koleksi perpustakaan', category: 'Pengenalan layanan', theme: 'sand' },
    { id: 'komunitas', title: 'Ruang temu komunitas pembaca', category: 'Komunitas', theme: 'pale' },
  ],
  news: [
    { id: 'ruang-baca', title: 'Perpustakaan sebagai ruang bertemu pengetahuan', category: 'Literasi', excerpt: 'Contoh ringkasan berita untuk meninjau tata letak artikel pada halaman utama. Materi editorial resmi akan menggantikan teks ini.', theme: 'green' },
    { id: 'koleksi', title: 'Menemukan bacaan untuk perjalanan belajarmu', category: 'Koleksi', excerpt: 'Contoh ringkasan konten koleksi perpustakaan.', theme: 'sand' },
    { id: 'digital', title: 'Lebih dekat dengan sumber informasi digital', category: 'Layanan digital', excerpt: 'Contoh ringkasan konten pengenalan layanan.', theme: 'blue' },
  ],
  digitalServices: ['INLIS', 'OneSearch', 'iPusnas', 'e-Resources', 'SION'],
  onsiteServices: [
    {
      id: 'layanan-keanggotaan',
      title: 'Layanan Keanggotaan',
      image: '/assets/layanan-keanggotaan.png',
      alt: 'Area Layanan Keanggotaan Gedung Perpustakaan Nasional RI',
      href: '/layanan/fasilitas',
    },
    {
      id: 'layanan-ruang-baca',
      title: 'Ruang Baca Terpadu',
      image: '/assets/1792650397_6fe7e700d1b04c209039.jpg',
      alt: 'Fasilitas Ruang Baca Terpadu Koleksi Perpustakaan Nasional RI',
      href: '/layanan/fasilitas',
    },
    {
      id: 'layanan-koleksi-naskah',
      title: 'Layanan Naskah Nusantara Onsite',
      image: '/assets/layanan-naskah-nusantara.png',
      alt: 'Ruang Layanan Koleksi Naskah Nusantara dan Manuskrip',
      href: '/layanan/fasilitas',
    },
    {
      id: 'layanan-referensi',
      title: 'Layanan Referensi & Konsultasi',
      image: '/assets/1792035678_e8dbacb2518f63b160a9.jpg',
      alt: 'Layanan Konsultasi dan Penelusuran Referensi Onsite',
      href: '/layanan/fasilitas',
    },
  ],
};
