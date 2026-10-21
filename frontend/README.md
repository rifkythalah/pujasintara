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

Vite menampilkan URL lokal. Halaman React saat ini hanya Beranda (`/`).

```sh
npm run lint
npm run build
npm run preview
```

## Struktur

- `src/app`: komposisi aplikasi.
- `src/pages`: halaman Beranda.
- `src/components/layout`: TopBar, Navbar, Footer, SiteLayout.
- `src/components/navigation`: disclosure menu desktop/mobile dari satu konfigurasi.
- `src/components/ui`: ikon dan heading yang digunakan kembali.
- `src/config/navigation.js`: satu sumber menu sesuai sitemap, ID stabil dan tujuan
  `internal | external | group`. Leaf belum terkonfirmasi memakai `status: pending`
  tanpa URL. Katalog/Direktori memiliki `children: null`, tanpa anak buatan.
- `src/features/homepage`: section, data dummy terpisah, dan boundary service lokal.
- `src/styles`: token warna dan CSS responsif.

Folder hooks, public assets, utilities, dan modul lain dibuat saat benar-benar
dibutuhkan. React Router, Tailwind, backend, dan HTTP client belum ditambahkan.
Tidak ada endpoint yang dipanggil atau keberhasilan API yang disimulasikan.

## Konten dan navigasi sementara

Banner pratinjau serta penanda dummy membedakan konten contoh dari informasi
resmi. Tidak ada tanggal acara, kontak, FAQ, atau ketentuan layanan yang dikarang.
Carousel dapat diubah dengan tombol panah/dot dan tidak bergerak otomatis.
Dropdown bekerja dengan klik/keyboard; Escape menutup grup terdalam dan
mengembalikan fokus. Menu yang belum punya tujuan ditampilkan sebagai teks
belum aktif. Pencarian dinonaktifkan sampai perilakunya disepakati.

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
dummy. Routing dan halaman dalam baru dibuat setelah tujuan menu disepakati.

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
