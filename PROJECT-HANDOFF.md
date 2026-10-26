# Pujasintara — Memori Proyek & Panduan Handoff AI

Terakhir diperbarui: 23 Oktober 2026. Dokumen ini adalah snapshot keputusan dan kondisi proyek, bukan bukti bahwa kode di masa depan masih sama. Verifikasi repository sebelum bekerja.

## 1. Mulai percakapan baru

Salin prompt berikut ke agent baru:

> Baca `AGENTS.md` dan `PROJECT-HANDOFF.md` terlebih dahulu. Periksa Git status, branch, kode aktual, dan dokumentasi sitemap sebelum mengubah file. Proyek ini frontend React JavaScript/JSX + JSDoc, bukan TypeScript. Pertahankan hasil desain yang sudah disetujui dan semua source/aset lama. Kerjakan hanya tugas terbaru saya, jalankan pemeriksaan yang relevan, laporkan file yang berubah dan batasan yang belum selesai. Jangan commit, push, deploy, menambah backend, atau mengarang konten kelembagaan. Tugas berikutnya: [tulis permintaan dan lampirkan referensi desain].

Agent perlu memberi ringkasan pemahaman singkat, lalu melaksanakan perubahan yang sudah diotorisasi. Jangan menganggap semua rencana dalam dokumen ini sebagai perintah untuk langsung dikerjakan.

## 2. Urutan sumber dan keputusan

1. Instruksi terbaru pengguna dan keputusan eksplisit yang disetujui.
2. `AGENTS.md` untuk aturan repository.
3. `docs/docs/pujasintara-sitemap.md` untuk arsitektur informasi/menu v2.
4. Screenshot/desain spesifik yang diberikan pengguna untuk section terkait.
5. `docs/docs/pujasintara-spec.md`, `CODEX-FRONTEND-PROMPTS.md`, README untuk konteks historis.
6. Kode, package.json, lockfile dan Git untuk keadaan implementasi sebenarnya.

Path dokumentasi aktual saat handoff adalah `docs/docs/`, meskipun beberapa instruksi lama menyebut `docs/`. Cari lokasi aktual dengan `rg --files`; jangan membuat salinan hanya karena path historis berbeda. Screenshot menu asli menetapkan hierarki, bukan izin mengganti palet menjadi teal.

Keputusan JavaScript + JSDoc menggantikan rekomendasi TypeScript lama di AGENTS/spec. File navigation yang benar adalah `.js`, bukan `.ts`. Bila ada konflik baru yang belum terselesaikan, jelaskan dan minta keputusan pengguna.

## 3. Batas pekerjaan dan kebiasaan pengguna

- Frontend saja. Integrasi Laravel REST API ditunda; jangan scaffold backend, database, autentikasi, admin atau endpoint.
- Bahasa komunikasi: Indonesia. Pengguna memberi revisi visual bertahap; selesaikan section yang diminta dan berhenti untuk review.
- Jangan mengubah homepage/menu/section lain di luar cakupan permintaan.
- Jangan menghapus, memindah atau menimpa legacy HTML dan aset. Pertahankan nama file dan URL `/assets/...` yang bekerja, termasuk nama dengan spasi.
- Jangan install ulang framework atau mengganti package manager/lockfile tanpa kebutuhan dan persetujuan.
- Jangan commit/push/deploy otomatis, reset hard, clean, atau menghapus perubahan lokal. Git status saat handoff berisi perubahan belum di-commit dan aset untracked.
- Untuk setup, routing baru, atau refactor banyak file: tunjukkan rencana konkret dan minta persetujuan sesuai AGENTS. Revisi terlokalisasi yang sudah diminta boleh langsung dikerjakan.
- Screenshot lampiran adalah referensi, bukan otomatis tersedia sebagai file lokal. Cari aset/path yang diberikan; jangan mengaku menyalin file yang belum ditemukan.

## 4. Stack dan struktur aktual

Branch saat handoff: `feature/setup-framework`. Verifikasi lagi; jangan pindah branch sambil menimpa perubahan lokal.

- App: `frontend/`, React 19, Vite 8, React Router 7, npm.
- Bahasa: JavaScript/JSX dengan JSDoc untuk tipe data.
- Node yang disyaratkan package.json: >=22.20.0.
- Styling: CSS biasa. Tailwind tidak tercantum sebagai dependency saat handoff; class ala Tailwind dari chat tidak otomatis bekerja.
- `frontend/public/assets/`: gambar asli dan font lokal.
- `frontend/src/app/`: App, router, aksesibilitas saat perpindahan route.
- `frontend/src/config/navigation.js`: sumber tunggal label/hierarki menu; jenis internal, external, group.
- `frontend/src/config/routes.js`: ID, path, metadata dan planned content halaman.
- `frontend/src/components/layout/`: SiteLayout, TopBar, Navbar, Footer, SiteLogo, OpeningHours, LanguageSelector.
- `frontend/src/components/navigation/`: NavItem rekursif dan MobileNav.
- `frontend/src/components/ui/`: PageHeader, Breadcrumb, ikon dan primitive bersama.
- `frontend/src/pages/`: route-level views; sebagian besar memakai PlannedPage bersama.
- `frontend/src/features/homepage/`: komponen section, data mock, service boundary, hero hook/CSS.
- `frontend/src/features/profil/`: data dan styling Struktur Organisasi.
- `frontend/src/styles/`: tokens, global, header, fonts, halaman.
- `frontend/tests/`: tes route dan jam buka.

Halaman tidak menyalin TopBar/Navbar/Footer. Gunakan SiteLayout + shared PageHeader/breadcrumb. Pisahkan data mock bertipe JSDoc dari JSX. Service boundary boleh disiapkan, tetapi jangan memanggil endpoint fiktif atau menyimulasikan sukses API.

## 5. Navigasi dan halaman yang disetujui

| Menu | Anak/tujuan |
| --- | --- |
| Beranda | `/` |
| Profil | Struktur Organisasi; Tugas dan Fungsi; Daftar Pegawai; Maklumat Pelayanan; Pustakawan Berkarya |
| Layanan | Informasi Layanan; Tanya Pustakawan; Diseminasi Informasi; Fasilitas; Katalog; Direktori |
| Aktivitas | Agenda; Berita; Galeri Video; Pengumuman; Info Barang Tertinggal |
| Dokumen Publik | Panduan Layanan; Seri Penelusuran Referensi; Infografis; Laporan Media Monitoring; Standar Pelayanan; Survei Kepuasan; Tindakan Aduan; Produk Kemas Ulang |
| Bantuan | Langsung `/bantuan`, FAQ di dalam halaman; bukan dropdown |
| Kontak Kami | `/kontak-kami`, posisi desktop di sisi kanan |

Path internal konkret ada di `config/routes.js`: gunakan getRoute/routeId, jangan menebak URL. Ada 27 definisi route plus fallback NotFound. Struktur Organisasi mempunyai page khusus; sebagian besar halaman lain masih planned page, bukan konten resmi selesai.

Katalog dan Direktori memiliki local landing page serta toggle submenu terpisah. Anak submenu masih UNKNOWN: jangan menciptakan label/URL anak. Jenis tujuan eksternal/PDF baru harus diverifikasi. Tidak boleh menggunakan `href="#"` sebagai navigasi palsu.

Search hanya UI yang dipertahankan; sistem pencarian/backend belum disetujui. Jangan membuat fitur pencarian diam-diam.

## 6. Aturan kebenaran konten

Jangan mengarang struktur kelembagaan, nama pegawai, kebijakan, layanan, FAQ institusi, agenda, berita atau kontak resmi. Konten belum tersedia harus diberi status jelas dan dikonfirmasi. Pengguna mengizinkan planned pages bersama, bukan puluhan halaman dengan fakta tebakan. FAQ prototype boleh menjelaskan perilaku prototype yang benar-benar ada.

Banner pratinjau global paling atas sudah dihapus atas permintaan pengguna. Ini tidak menghapus kewajiban menandai konten placeholder pada bagian yang relevan. Banner gambar yang disediakan pengguna adalah aset tampilan; jangan menyimpulkan kebijakan baru dari isi gambar tanpa kebutuhan/verifikasi.

## 7. Header/navbar yang sudah disetujui

- Putih untuk TopBar, navy `#012269` untuk navbar, hijau `#10743b` untuk aksen/CTA.
- Logo: `/assets/Logo-Pujasintara-Black.png`, SiteLogo bersama. Logo tidak boleh diganti dengan teks atau ilustrasi baru.
- Logo mobile 44px; >=768px 56px; desktop >1100px tinggi dinamis `clamp(56px, 5vw, 96px)`. Lihat aturan aktual header.css sebelum mengubah.
- TopBar: logo kiri; ikon jam + jadwal di tengah; pilihan ID/EN dan sosial di kanan.
- Jadwal lebih kecil daripada logo dan sejajar secara vertikal. Hanya rentang jam yang bold pada teks hari ini.
- Font header/hero: Plus Jakarta Sans dan Montserrat lokal, alias CSS `Header Jakarta`/`Header Montserrat`. Jangan memperluas perubahan font seluruh website tanpa permintaan.
- Menu normal medium, hover/active bold. Garis putih bergerak mengikuti hover/focus dan kembali ke active route, panjang termasuk ikon.
- Plus dalam lingkaran berupa SVG terpusat, berputar saat hover; dropdown terbuka lewat hover dan tetap mendukung klik/keyboard.
- Tablet 601–850px: hamburger di kiri, drawer dari kiri. <=600px: logo/search/hamburger, drawer dari kanan. Bahasa di dalam drawer. Detail breakpoint harus dibaca di CSS.
- Drawer: backdrop, Escape, tutup luar/X, penguncian scroll, focus trap/return, menu bertingkat dan perubahan route ditangani.
- Locale baru meliputi informasi jadwal; bukan penerjemahan penuh semua halaman.

Sosial yang dikonfirmasi pengguna:
- Instagram: https://www.instagram.com/perpusnas.go.id/?hl=id
- Facebook: https://www.facebook.com/ayokeperpusnas
- YouTube: https://www.youtube.com/@PerpustakaanNasionalRI

## 8. Jadwal dan popup: keputusan terbaru

Pengguna mengonfirmasi:
- Senin – Jumat: **08.00 – 19.00** WIB.
- Sabtu – Minggu: **09.00 – 16.00** WIB.
- Cuti Bersama Dan Hari Libur Nasional: **Tutup**.

`lib/openingHours.js` menentukan jadwal hari ini berdasarkan weekday di Asia/Jakarta. OpeningHours memperbarui waktu setiap 30 detik dan ketika fokus/visibility berubah.

PENTING: kalender tanggal libur nasional/cuti bersama belum diimplementasikan. Teks hari ini masih mengikuti hari kerja/weekend; jangan mengklaim status otomatis mengetahui hari libur atau bahwa perpustakaan sedang buka pada detik tersebut.

Popup menggunakan native details/summary. Judul `Jadwal Jam Buka`, setiap awalan kata kapital, rentang waktu dan kata Tutup bold. Kalimat halaman jadwal akan ditambahkan sudah diganti dengan keterangan libur di atas. Klik di dalam panel tidak menutup; klik di luar, klik pemicu, atau Escape menutup; Escape mengembalikan fokus ke pemicu. Copy ID/EN di `config/header.js`, markup/perilaku di OpeningHours.jsx, style di header.css. Belum ada route halaman jadwal lengkap.

## 9. Hero/carousel yang sudah disetujui

File utama:
- `features/homepage/components/Hero.jsx`
- `features/homepage/data/hero.js`
- `features/homepage/hooks/useHeroCarousel.js`
- `features/homepage/hero-carousel.css`

Perilaku:
- 8 slide saat handoff; interval **5000ms**, bukan 3000ms yang diminta sebelumnya.
- Bergerak ke kiri: gambar lama keluar kiri, gambar baru masuk kanan. Tidak fade.
- Kontrol visual hanya batang indikator putih; tanpa angka, teks pause/putar, panah atau latar biru.
- Sambutan dan CTA hanya pada slide gedung (`kind: welcome`). Slide informasi bersih tanpa overlay copy/tombol.
- Gedung brightness(.85), setara penggelapan 15% secara CSS. Jangan edit file asli untuk exposure.
- Desktop aspect-ratio 3/1; informasi object-fit contain, gedung cover. Mobile mempunyai aturan tinggi berbeda; width100% mencegah overflow dari aspect ratio + tinggi tetap.
- Hero background full width; teks mengikuti container global. Judul satu baris desktop, boleh membungkus responsif.
- CTA menuju route Agenda, tengah, font clamp(12px,.9vw,18px), padding10px20px, min-height44px; mobile12px dan padding8px16px.
- Timer berhenti ketika tab tersembunyi, fokus berada dalam hero, atau prefers-reduced-motion aktif. Jangan menganggap ini bug autoplay.

Aset sesuai daftar saat handoff:
1. `Gambar ChatGPT 25 Sep 2026, 10.45.19 1.png` — gedung/welcome.
2. `1791953659_4489d110cb19e35ccf30.jpg` — Pancasila.
3. `1744591601_cdbdd251e4cabe6dbe03.png`.
4. `1777340793_9894a6f04be531191bca.jpg`.
5. `1791953659_4489d110cb19e35ccf30 copy.jpg`.
6. `1792035678_e8dbacb2518f63b160a9.jpg`.
7. `1792650397_6fe7e700d1b04c209039.jpg`.
8. `1792650647_05738698647bf30cb06b.jpg`.

Versi Pancasila `copy.jpg` sama dengan banner Pancasila sebelumnya; pengguna sudah diberi tahu bahwa tampil dua kali. Jangan menghapus tanpa permintaan. Slide baru cukup masuk data dengan ID unik dan alt yang sesuai gambar, tanpa menciptakan konten institusi tambahan.

## 10. Spacing/layout: jangan kembali terlalu lebar

Pengguna terakhir meminta konten lebih masuk ke tengah, mengikuti garis merah screenshot kedua.

- `styles/tokens.css`: container maksimal1920px; gutter default clamp(24px,4.5vw,160px).
- Override desktop >1100px: **gutter10vw per sisi** (sekitar80% viewport untuk konten sampai max-container tercapai).
- `styles/global.css`: <=850px gutter24px, <=600px20px.
- `.container`: width min(container,100%-2*gutter), margin-inline auto.
- TopBar, navbar, hero copy, section dan footer harus sejajar. Background hero/nav tetap full bleed.
- Grid/card mengikuti container; hindari lebar piksel tetap yang menimbulkan overflow.
- `header.css` mengatur gap menu, padding link, margin-left:auto pada Kontak Kami. Jarak antarmenu berbeda dari gutter luar.
- Ask-bar Layanan Online memiliki breakout margin/padding di global.css; hitung bersama container bila mengubah gutter.
- CSS global/header memiliki beberapa override berlapis. Periksa cascade/breakpoint sebelum menambahkan aturan baru; jangan memulai refactor luas tanpa persetujuan.

## 11. Pemeriksaan dan cara menjalankan

Dari `frontend/` dengan Node>=22.20.0:

```sh
npm run dev
npm run lint
npm test
npm run build
```

Dari root: `git diff --check`, tinjau diff dan status. Jangan menjalankan npm install jika dependency sudah tersedia dan tidak ada perubahan kebutuhan.

Pada Mac sesi ini Node22 ada di `/Users/macbookpro/.nvm/versions/node/v22.20.0/bin`; path itu spesifik mesin, jangan dianggap universal.

Untuk perubahan navigasi/router: browser back/forward, deep link, refresh, NotFound, active route, dropdown bertingkat, keyboard, Escape, focus, mobile drawer. Deployment produksi nantinya memerlukan fallback SPA untuk BrowserRouter; build sukses tidak membuktikan konfigurasi hosting sudah benar.

Untuk perubahan visual: cek beberapa viewport (misalnya320,390,768,1024,1440,1920), overflow horizontal, alignment container, ukuran CTA, keterbacaan dan gambar. Jangan mengklaim tes browser hanya dari build. Tool Playwright sementara pernah dipakai dari `/private/tmp/pujasintara-header-check`; itu bukan dependency repo atau tes permanen dan mungkin sudah hilang. Jangan mengandalkannya tanpa memeriksa.

Hasil pemeriksaan historis, bukan jaminan untuk revisi berikutnya:
- Revisi inset: alignment dan overflow browser pada12 ukuran320–2560px lulus.
- Revisi tombol: build dan diff lulus.
- Revisi popup terakhir: lint, build, diff lulus; browser memeriksa bold hours, keterangan tutup, klik dalam/luar, Escape/focus dan bahasa Inggris.
- Suite unit tersedia untuk routes/jam buka; jalankan lagi sesuai perubahan, jangan mengaku semua tes baru dijalankan berdasarkan hasil lama.

## 12. Titik kelanjutan dan pekerjaan belum selesai

Pengguna sedang menyelesaikan header/hero sebelum melanjutkan section di bawahnya (Layanan Online). Tunggu instruksi/desain section itu; jangan langsung merombak seluruh homepage.

Belum final: konten resmi halaman internal, desain section berikutnya, tujuan detail Katalog/Direktori, route jadwal lengkap, kalender libur, i18n seluruh situs, pencarian, API Laravel dan deployment. Ini daftar status, bukan izin untuk mengimplementasikan semuanya.

Setelah sesi penting, perbarui handoff ini: keputusan baru yang menggantikan keputusan lama, file relevan, hasil pemeriksaan aktual, dan hal yang menunggu pengguna. Jangan menyimpan token, kredensial, atau data sensitif di dokumen memori.
