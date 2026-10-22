# Pujasintara frontend

React + Vite, **JavaScript/JSX tanpa TypeScript**, npm dan CSS biasa. UI sementara
mengikuti susunan homepage pada dokumentasi; revisi visual menunggu desain Figma.

## Menjalankan

Gunakan Node.js 22.20+ (sesuaikan dengan `engines` dependensi yang terpasang).

```sh
cd frontend
npm ci
npm run dev
```

Vite menampilkan URL lokal. React Router menangani Beranda, 25 halaman sementara,
Bantuan dengan FAQ, dan NotFound. Path terdaftar di `src/config/routes.js`.

```sh
npm run lint
npm test
npm run build
npm run preview
```

## Struktur

- `src/app`: router, komposisi aplikasi, serta pengaturan fokus/judul dokumen.
- `src/pages`: Beranda, satu PlannedPage bersama, Bantuan, dan NotFound.
- `src/components/layout`: TopBar, Navbar, Footer, SiteLayout.
- `src/components/navigation`: disclosure menu desktop/mobile dari satu konfigurasi.
- `src/components/ui`: ikon, PageHeader, Breadcrumb, dan heading bersama.
- `src/config/navigation.js`: satu sumber menu sesuai sitemap, ID stabil dan tujuan
  `internal | external | group`. Semua item bernama memakai ID route lokal yang
  disetujui. Katalog/Direktori punya halaman serta toggle submenu terpisah,
  dengan `children: null` tanpa anak buatan. Bantuan adalah link langsung.
- `src/config/routes.js`: path, materi placeholder, serta metadata halaman.
  Label dan breadcrumb diturunkan dari konfigurasi navigasi.
- `src/features/bantuan/data/faq.js`: FAQ yang menjelaskan perilaku pratinjau,
  bukan ketentuan layanan Perpusnas.
- `src/features/homepage`: section, data dummy terpisah, dan boundary service lokal.
- `src/styles`: token warna dan CSS responsif.

Folder hooks, public assets, utilities, dan modul lain dibuat saat benar-benar
dibutuhkan. React Router telah ditambahkan; Tailwind, backend, dan HTTP client belum.
Tidak ada endpoint yang dipanggil atau keberhasilan API yang disimulasikan.

## Konten dan navigasi sementara

Banner pratinjau serta penanda dummy membedakan konten contoh dari informasi
resmi. Tidak ada tanggal acara, kontak, FAQ institusi, atau ketentuan layanan yang dikarang.
Carousel dapat diubah dengan tombol panah/dot dan tidak bergerak otomatis.
Dropdown bekerja dengan klik/keyboard; Escape menutup grup terdalam dan
mengembalikan fokus. Halaman dalam menggunakan konten sementara berlabel jelas.
Pencarian dinonaktifkan sampai perilakunya disepakati.

## Routing dan halaman sementara

- `SiteLayout` memuat TopBar, Navbar, `Outlet`, Footer, serta scroll restoration.
- `PlannedPage` merender metadata sesuai route, tanpa menyalin layout ke 25 file.
- Bantuan dapat dibuka langsung di `/bantuan`; FAQ adalah bagian `#faq`.
- Katalog dan Direktori bisa dibuka lewat labelnya; tombol `+` terpisah tetap
  menampilkan status rincian submenu belum tersedia.
- Grup tanpa halaman indeks pada breadcrumb berupa teks, bukan link mati.
- Link internal menggunakan React Router; link eksternal tetap anchor biasa.
- Footer menggunakan `/#...` untuk kembali ke bagian homepage dari halaman dalam.
- URL tidak terdaftar menampilkan NotFound. Tidak ada alias `/bantuan/faq` atau
  route anak Katalog/Direktori yang dibuat berdasarkan tebakan.

Deployment SPA memerlukan fallback ke `index.html` untuk URL aplikasi. File/aset
nyata harus dilayani lebih dahulu; jangan mengubah URL aset hilang menjadi HTML.
Konfigurasi spesifik hosting belum dibuat karena hosting belum ditentukan.
NotFound di aplikasi adalah UI 404; status HTTP pada hosting statis bergantung pada
konfigurasi hosting. `npm run preview` hanya untuk verifikasi build lokal.

Nama layanan literasi digital berasal dari spesifikasi historis. Logo resmi,
tautan, informasi kontak, serta materi berita/agenda perlu diverifikasi sebelum
digunakan di produksi. Font menggunakan fallback sistem tanpa request eksternal.

## Preservasi source lama

- Entry HTML lama disalin ke `../archive/frontend-before-react/index.html`.
- `test.html` dan seluruh `layanan-publik/` tidak diubah.
- Hero React mengimpor SVG lama dari lokasi aslinya. Vite menghasilkan aset build
  tersendiri; source, nama file asli, dan URL relatif halaman lama tetap utuh.
- Dalam server dev Vite, prototipe tersedia di `/layanan-publik/index.html` dan
  halaman uji di `/test.html`. Keduanya tidak otomatis dimasukkan ke build React.
- `dist/` hanya berisi build aplikasi baru. Tidak ada commit atau deployment otomatis.

Dokumen lama berada di `../docs/docs/`. Instruksi terbaru pengguna menetapkan
JavaScript, menggantikan preferensi TypeScript dalam dokumentasi historis.

## Integrasi berikutnya

`getHomepageContent()` saat ini mengembalikan data lokal secara sinkron.
Saat REST API diizinkan, tambahkan adapter dan kontrak respons, lalu state
loading/error/empty pada hook feature. Jangan menyamarkan error API dengan data
dummy. Tujuan eksternal/formulir/berkas asli tetap menunggu verifikasi; halaman
lokal sementara tidak mensimulasikan pengiriman survei, aduan, atau konsultasi.

## Verifikasi setup — 21 Oktober 2026

- `npm run lint`: lulus tanpa warning.
- `npm run build`: lulus (React 19.3.1, Vite 8.3.5).
- Chrome headless: homepage HTTP 200; panah/dot carousel; dropdown via keyboard
  dan klik; submenu Katalog; Escape dan pengembalian fokus; klik di luar menu.
- Lebar 320, 390, 768, 850, 1024, dan 1440 px: tanpa overflow horizontal,
  termasuk accordion mobile terbuka. Tidak ada error JavaScript runtime.
- Reduced motion terverifikasi; screenshot desktop/mobile ditinjau.
- URL HTML/aset legacy tetap HTTP 200 pada dev server.
- Source legacy dan salinan entrypoint dibandingkan byte-for-byte dengan Git.

Pemeriksaan browser menggunakan alat sementara di luar repository; belum ada
suite pengujian browser yang disimpan sebagai dependensi proyek. Pengujian ini
bukan audit aksesibilitas menyeluruh atau verifikasi desain Figma.

## Verifikasi routing — 22 Oktober 2026

- `npm test`: 4 pengujian lulus (registrasi menu/route, Katalog/Direktori,
  Bantuan langsung, breadcrumb dan halaman aktif).
- `npm run lint`, `npm run build`, dan `git diff --check`: lulus.
- Chrome: 27 URL langsung dan refresh berhasil; tidak ada error JavaScript.
- Navigasi SPA, Back/Forward, pemulihan posisi scroll, fokus/judul halaman,
  breadcrumb, serta indikator halaman/grup aktif terverifikasi.
- FAQ keyboard, link halaman dan toggle Katalog/Direktori, anchor footer lintas
  halaman, NotFound serta tautan pemulihannya terverifikasi.
- Lebar 320, 390, 768, 850, 851, 1024, 1440 px: tanpa overflow horizontal;
  menu mobile menutup setelah navigasi, termasuk navigasi bertingkat.
- Hasil build lokal: deep link dan refresh diuji pada Profil, Katalog, Bantuan,
  serta URL tidak dikenal. Ini belum memverifikasi konfigurasi hosting produksi.
- Source homepage, token warna, HTML legacy, dan SVG asli tidak berubah.
  URL legacy tetap tersedia pada server development.

## Berkas tahap routing

Ditambahkan:
- `src/app/router.jsx`, `src/app/RouteAccessibility.jsx`.
- `src/config/routes.js`.
- `src/components/ui/PageHeader.jsx`, `src/components/ui/Breadcrumb.jsx`.
- `src/pages/PlannedPage.jsx`, `src/pages/NotFoundPage.jsx`, `src/pages/bantuan/HelpPage.jsx`.
- `src/features/bantuan/data/faq.js`, `src/styles/pages.css`, `tests/routes.test.js`.

Disesuaikan:
- `package.json`, `package-lock.json`, `src/main.jsx`, `src/app/App.jsx`.
- `src/config/navigation.js`, `src/components/navigation/NavItem.jsx`.
- `src/components/layout/SiteLayout.jsx`, `Navbar.jsx`, `TopBar.jsx`, `Footer.jsx`.
- `src/styles/global.css` (aturan untuk grup dengan tautan halaman dan toggle terpisah).
- `README.md`, `../AGENTS.md`, `../docs/docs/pujasintara-sitemap.md` untuk keputusan terbaru.
