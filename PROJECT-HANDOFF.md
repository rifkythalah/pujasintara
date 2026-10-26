# Pujasintara — Memori Proyek & Panduan Handoff AI

Terakhir diperbarui: 26 Oktober 2026. Dokumen ini adalah snapshot keputusan dan kondisi proyek, bukan bukti bahwa kode di masa depan masih sama. Verifikasi repository sebelum bekerja.

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
- Jangan commit/push/deploy otomatis, reset hard, clean, atau menghapus perubahan lokal.
- Untuk setup, routing baru, atau refactor banyak file: tunjukkan rencana konkret dan minta persetujuan sesuai AGENTS. Revisi terlokalisasi yang sudah diminta boleh langsung dikerjakan.
- Screenshot lampiran adalah referensi, bukan otomatis tersedia sebagai file lokal. Cari aset/path yang diberikan; jangan mengaku menyalin file yang belum ditemukan.

## 4. Stack dan struktur aktual

Branch aktif saat handoff: `feature/setup-framework` (sudah di-push & merged ke `develop` via PR #9).
Branch `develop` adalah target pengembangan. Branch `main` **hanya** berisi "Initial commit" + satu revert commit; jangan merge ke main kecuali ada persetujuan rilis eksplisit.

- App: `frontend/`, React 19, Vite 8, React Router 7, npm.
- Bahasa: JavaScript/JSX dengan JSDoc untuk tipe data (bukan TypeScript).
- Node yang disyaratkan package.json: >=22.20.0.
- Styling: CSS biasa. Tailwind tidak tercantum sebagai dependency; class ala Tailwind dari chat tidak otomatis bekerja.
- `frontend/public/assets/`: gambar asli dan font lokal (jangan dipindah/rename tanpa audit seluruh import).

### Struktur `src/`

```
src/
├── app/
│   ├── App.jsx                 — root provider, layout wrapper
│   ├── router.jsx              — semua route definition
│   └── RouteAccessibility.jsx  — scroll to top & focus saat pindah route
├── config/
│   ├── navigation.js           — SATU sumber hierarki menu (internal/external/group)
│   ├── routes.js               — 27 route + getRoute() + isNavigationActive()
│   └── header.js               — copy TopBar (jadwal jam buka, sosial, i18n ID/EN)
├── components/
│   ├── layout/                 — SiteLayout, TopBar, Navbar, Footer, SiteLogo,
│   │                             OpeningHours, LanguageSelector
│   ├── navigation/             — NavItem (rekursif), MobileNav
│   └── ui/                     — PageHeader, Breadcrumb, HeaderIcon, Icon,
│                                 SectionHeading
├── features/
│   ├── homepage/
│   │   ├── components/         — Hero, LayananOnline, LayananFisik, AgendaPreview,
│   │   │                         BeritaPreview, LiterasiDigital
│   │   ├── data/               — hero.js, homepage.mock.js  ← data mock bertipe JSDoc
│   │   ├── hooks/              — useHeroCarousel.js
│   │   ├── services/           — homepageService.js  ← boundary API masa depan
│   │   ├── hero-carousel.css
│   │   ├── layanan-online.css
│   │   └── layanan-fisik.css
│   ├── profil/
│   │   ├── data/               — organization.mock.js
│   │   └── organization.css
│   └── bantuan/
│       └── data/               — faq.js
├── lib/
│   └── openingHours.js         — logika jam buka berdasarkan weekday Asia/Jakarta
├── pages/
│   ├── HomePage.jsx            — menyusun 6 section homepage (lihat §10)
│   ├── NotFoundPage.jsx
│   ├── PlannedPage.jsx         — shell bersama untuk halaman belum selesai
│   ├── bantuan/HelpPage.jsx
│   └── profil/OrganizationPage.jsx
├── styles/
│   ├── tokens.css              — design tokens (warna, container, gutter)
│   ├── global.css              — reset, container, responsive gutter
│   ├── header.css              — TopBar, Navbar, dropdown, mobile drawer
│   ├── header-fonts.css        — @font-face Plus Jakarta Sans & Montserrat lokal
│   └── pages.css               — styling PlannedPage & halaman umum
└── tests/
    ├── openingHours.test.js
    └── routes.test.js
```

Halaman tidak menyalin TopBar/Navbar/Footer. Gunakan `SiteLayout` + shared `PageHeader`/`Breadcrumb`. Pisahkan data mock bertipe JSDoc dari JSX. Service boundary boleh disiapkan, tetapi **jangan memanggil endpoint fiktif atau menyimulasikan sukses API**.

## 5. Navigasi dan halaman yang disetujui

| Menu | Anak/tujuan |
| --- | --- |
| Beranda | `/` |
| Profil | Struktur Organisasi; Tugas dan Fungsi; Daftar Pegawai; Maklumat Pelayanan; Pustakawan Berkarya |
| Layanan | Informasi Layanan; Tanya Pustakawan; Diseminasi Informasi; Fasilitas; Katalog (+); Direktori (+) |
| Aktivitas | Agenda; Berita; Galeri Video; Pengumuman; Info Barang Tertinggal |
| Dokumen Publik | Panduan Layanan; Seri Penelusuran Referensi; Infografis; Laporan Media Monitoring; Standar Pelayanan; Survei Kepuasan; Tindakan Aduan; Produk Kemas Ulang |
| Bantuan | Langsung `/bantuan`, FAQ di dalam halaman; bukan dropdown |
| Kontak Kami | `/kontak-kami`, posisi desktop di sisi kanan |

Path internal konkret ada di `config/routes.js`: gunakan `getRoute(id)`, jangan menebak URL. Ada 27 definisi route plus fallback NotFound. `Struktur Organisasi` mempunyai page khusus (`OrganizationPage.jsx`); sebagian besar halaman lain masih `PlannedPage`, bukan konten resmi selesai.

`Katalog` dan `Direktori` memiliki local landing page serta toggle submenu terpisah. Anak submenu masih **UNKNOWN**: jangan menciptakan label/URL anak. Tidak boleh menggunakan `href="#"` sebagai navigasi palsu.

Search hanya UI yang dipertahankan; sistem pencarian/backend belum disetujui. Jangan membuat fitur pencarian diam-diam.

## 6. Aturan kebenaran konten

Jangan mengarang struktur kelembagaan, nama pegawai, kebijakan, layanan, FAQ institusi, agenda, berita atau kontak resmi. Konten belum tersedia harus diberi status jelas dan dikonfirmasi. Pengguna mengizinkan `PlannedPage` bersama, bukan puluhan halaman dengan fakta tebakan. FAQ prototype boleh menjelaskan perilaku prototype yang benar-benar ada.

Banner pratinjau global paling atas sudah dihapus atas permintaan pengguna. Ini tidak menghapus kewajiban menandai konten placeholder pada bagian yang relevan.

## 7. Header/navbar yang sudah disetujui

- Putih untuk TopBar, navy `#012269` untuk navbar, hijau `#10743b` untuk aksen/CTA.
- Logo: `/assets/Logo-Pujasintara-Black.png`, komponen `SiteLogo` bersama. Logo tidak boleh diganti dengan teks atau ilustrasi baru.
- Logo mobile 44px; >=768px 56px; desktop >1100px tinggi dinamis `clamp(56px, 5vw, 96px)`. Lihat aturan aktual `header.css` sebelum mengubah.
- TopBar: logo kiri; ikon jam + jadwal di tengah; pilihan ID/EN dan sosial di kanan.
- Jadwal lebih kecil daripada logo dan sejajar secara vertikal. Hanya rentang jam yang bold pada teks hari ini.
- Font header/hero: Plus Jakarta Sans dan Montserrat lokal, alias CSS `Header Jakarta`/`Header Montserrat`. Jangan memperluas perubahan font seluruh website tanpa permintaan.
- Menu normal medium, hover/active bold. Garis putih bergerak mengikuti hover/focus dan kembali ke active route.
- Plus dalam lingkaran berupa SVG terpusat, berputar saat hover; dropdown terbuka lewat hover dan tetap mendukung klik/keyboard.
- Tablet 601–850px: hamburger di kiri, drawer dari kiri. <=600px: logo/search/hamburger, drawer dari kanan. Bahasa di dalam drawer.
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

`lib/openingHours.js` menentukan jadwal hari ini berdasarkan weekday di Asia/Jakarta. `OpeningHours` memperbarui waktu setiap 30 detik dan ketika fokus/visibility berubah.

**PENTING:** kalender tanggal libur nasional/cuti bersama belum diimplementasikan. Teks hari ini masih mengikuti hari kerja/weekend; jangan mengklaim status otomatis mengetahui hari libur.

Popup menggunakan native `details/summary`. Judul `Jadwal Jam Buka`, setiap awalan kata kapital, rentang waktu dan kata Tutup bold. Klik di dalam panel tidak menutup; klik di luar, klik pemicu, atau Escape menutup; Escape mengembalikan fokus ke pemicu. Copy ID/EN di `config/header.js`, markup/perilaku di `OpeningHours.jsx`, style di `header.css`. Belum ada route halaman jadwal lengkap.

## 9. Hero/carousel yang sudah disetujui

File utama:
- `features/homepage/components/Hero.jsx`
- `features/homepage/data/hero.js`
- `features/homepage/hooks/useHeroCarousel.js`
- `features/homepage/hero-carousel.css`

Perilaku:
- 8 slide saat handoff; interval **5000ms**.
- Bergerak ke kiri: gambar lama keluar kiri, gambar baru masuk kanan. Tidak fade.
- Kontrol visual hanya batang indikator putih; tanpa angka, teks pause/putar, panah atau latar biru.
- Sambutan dan CTA hanya pada slide gedung (`kind: welcome`). Slide informasi bersih tanpa overlay copy/tombol.
- Gedung `brightness(.85)`. Desktop `aspect-ratio 3/1`; informasi `object-fit contain`, gedung `cover`.
- Hero background full width; teks mengikuti container global.
- CTA menuju route Agenda, tengah, font `clamp(12px,.9vw,18px)`, padding `10px 20px`, min-height 44px.
- Timer berhenti ketika tab tersembunyi, fokus berada dalam hero, atau `prefers-reduced-motion` aktif.

Aset hero (8 slide):
1. `Gambar ChatGPT 25 Sep 2026, 10.45.19 1.png` — gedung/welcome
2. `1791953659_4489d110cb19e35ccf30.jpg` — Pancasila
3. `1744591601_cdbdd251e4cabe6dbe03.png`
4. `1777340793_9894a6f04be531191bca.jpg`
5. `1791953659_4489d110cb19e35ccf30 copy.jpg`
6. `1792035678_e8dbacb2518f63b160a9.jpg`
7. `1792650397_6fe7e700d1b04c209039.jpg`
8. `1792650647_05738698647bf30cb06b.jpg`

## 10. Homepage — section yang sudah ada

`HomePage.jsx` merender 6 section secara berurutan. Data diambil via `homepageService.js` yang membaca `homepage.mock.js`.

### 10a. LayananOnline (`layanan-online.css`)
Carousel layanan online dengan bleed ganda (kiri & kanan), audio streaming player terintegrasi (Radio WBS) dengan pengatur volume dinamis & minimize button. Data `onlineServices` (4 item saat handoff):
1. Radio Streaming WBS — audio stream + link YouTube
2. Layanan Naskah Nusantara — link ke `khastara.perpusnas.go.id`
3. Diseminasi Informasi — link ke Google Form berlangganan
4. Buletin Layanan — link ke `lembaran.pujasintara.info`

### 10b. LayananFisik (`layanan-fisik.css`) — **selesai 26 Okt 2026**
Carousel banner wide beresolusi tinggi fasilitas onsite. Efek hover fade-black + judul layanan muncul di tengah gambar. Tombol panah kiri/kanan (chevron SVG) + indikator garis bawah horizontal. Data `onsiteServices` (4 item saat handoff):
1. Layanan Keanggotaan (`layanan-keanggotaan.png`) — aset baru
2. Ruang Baca Terpadu (`1792650397_...jpg`)
3. Layanan Naskah Nusantara Onsite (`layanan-naskah-nusantara.png`)
4. Layanan Referensi & Konsultasi (`1792035678_...jpg`)

Semua item menuju `/layanan/fasilitas` (planned page). Aset baru: `layanan-keanggotaan.png`, `layanan-koleksi-anak.png` (tersedia di `public/assets/` meski item ke-2 saat ini memakai foto ruang baca).

### 10c. AgendaPreview
4 kartu agenda mock (Diskusi buku, Kelas literasi, Pengenalan layanan, Komunitas). Tema warna: blue, green, sand, pale. Bukan agenda resmi.

### 10d. BeritaPreview
3 kartu berita mock dengan placeholder editorial. Bukan konten resmi.

### 10e. LiterasiDigital
5 layanan digital: INLIS, OneSearch, iPusnas, e-Resources, SION.

## 11. Spacing/layout

- `styles/tokens.css`: container maksimal 1920px; gutter default `clamp(24px, 4.5vw, 160px)`.
- Override desktop >1100px: **gutter 10vw per sisi** (~80% viewport untuk konten).
- `styles/global.css`: <=850px gutter 24px, <=600px 20px.
- `.container`: `width: min(container, 100% - 2*gutter)`, `margin-inline: auto`.
- TopBar, navbar, hero copy, section dan footer harus sejajar. Background hero/nav tetap full bleed.
- CSS global/header memiliki beberapa override berlapis. Periksa cascade/breakpoint sebelum menambahkan aturan baru; jangan memulai refactor luas tanpa persetujuan.

## 12. Git & branch workflow

| Branch | Tujuan |
|--------|--------|
| `main` | Hanya "Initial commit" + revert PR #7. **Jangan merge ke sini** kecuali ada persetujuan rilis eksplisit. |
| `develop` | Branch integrasi utama. Semua PR feature branch di-merge ke sini. |
| `feature/setup-framework` | Branch aktif pengembangan. Merged ke `develop` via PR #9 (26 Okt 2026). |

Alur yang benar: buat branch baru dari `develop` → kerjakan → PR ke **`develop`**, bukan ke `main`. Default GitHub sering mengarahkan PR ke `main`; selalu cek dropdown `base` sebelum submit PR.

## 13. Pemeriksaan dan cara menjalankan

Dari `frontend/` dengan Node >=22.20.0:

```sh
npm run dev      # dev server Vite
npm run lint     # ESLint
npm test         # unit test routes & jam buka
npm run build    # build produksi
```

Dari root: `git diff --check`, tinjau diff dan status. Jangan menjalankan `npm install` jika dependency sudah tersedia dan tidak ada perubahan kebutuhan.

Pada Mac sesi ini Node22 ada di `/Users/macbookpro/.nvm/versions/node/v22.20.0/bin`; path itu spesifik mesin, jangan dianggap universal.

Untuk perubahan navigasi/router: uji browser back/forward, deep link, refresh, NotFound, active route, dropdown bertingkat, keyboard, Escape, focus, mobile drawer.

Hasil pemeriksaan historis, bukan jaminan untuk revisi berikutnya:
- Revisi inset: alignment dan overflow browser pada 12 ukuran 320–2560px lulus.
- Revisi popup terakhir: lint, build, diff lulus; browser memeriksa bold hours, keterangan tutup, klik dalam/luar, Escape/focus dan bahasa Inggris.
- Suite unit tersedia untuk routes/jam buka; jalankan lagi sesuai perubahan.

## 14. Titik kelanjutan dan pekerjaan belum selesai

Status section homepage (26 Okt 2026):
- ✅ Hero/carousel (8 slide)
- ✅ Layanan Online (carousel + audio player)
- ✅ Layanan Fisik (carousel onsite — baru selesai)
- ⏳ AgendaPreview — layout ada, konten masih mock
- ⏳ BeritaPreview — layout ada, konten masih mock
- ⏳ LiterasiDigital — layout ada, data mock

Belum final: konten resmi halaman internal, desain section berikutnya, tujuan detail Katalog/Direktori, route jadwal lengkap, kalender libur nasional, i18n seluruh situs, pencarian, API Laravel dan deployment. Ini daftar status, bukan izin untuk mengimplementasikan semuanya.


Setelah sesi penting, perbarui handoff ini: keputusan baru yang menggantikan keputusan lama, file relevan, hasil pemeriksaan aktual, dan hal yang menunggu pengguna. Jangan menyimpan token, kredensial, atau data sensitif di dokumen memori.
