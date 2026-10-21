# Pujasintara — Prompt Bertahap untuk Codex VS Code (Sitemap v2)

> **Persiapan:** buka ROOT proyek di VS Code. Taruh `AGENTS.md` di root, `docs/pujasintara-spec.md` dan `docs/pujasintara-sitemap.md` di `docs/`, serta keempat screenshot menu di `docs/references/`. Baca `README-START-HERE.md` terlebih dahulu. Gunakan `Work locally`. Jangan jalankan semua prompt sekaligus.

## PROMPT 1 — Audit proyek + sitemap (READ-ONLY)

Saya ingin mengembangkan frontend Pujasintara menggunakan React + Vite + TypeScript, dengan Tailwind CSS v4 bila cocok. Backend Laravel belum dikerjakan.

Baca `AGENTS.md`, `docs/pujasintara-spec.md`, `docs/pujasintara-sitemap.md`, serta screenshot `docs/references/`. Audit workspace sesungguhnya: struktur file, package.json/lockfile, versi dependency, status Git, source code, styles, assets, framework, dan rute yang sudah ada. Jangan berasumsi setup React sudah ada hanya karena tertulis di dokumen lama.

Struktur utama yang harus dipertahankan: Beranda, Profil, Layanan, Aktivitas, Dokumen Publik, Kontak Kami, dan Bantuan/FAQ. Profil, Layanan, Aktivitas, Dokumen Publik memiliki dropdown menurut sitemap. `Katalog` dan `Direktori` adalah submenu bertingkat dengan child UNKNOWN; jangan mengarang isinya.

**Pada tahap ini READ-ONLY:** jangan mengubah, membuat, menghapus file, install package, ataupun melakukan perintah Git destruktif.

Tampilkan:
1. Audit keadaan proyek yang benar-benar ditemukan.
2. Perbandingan current state dengan target sitemap dan desain.
3. Usulan arsitektur `src/app`, `src/config/navigation.ts`, `src/pages`, `src/components/layout`, `src/components/navigation`, `src/components/ui`, `src/features`, `src/hooks`, `src/lib`, `src/styles` dan assets — proporsional, tidak membuat banyak folder kosong.
4. Daftar route internal *usulan*, entri eksternal/TBD, dropdown bertingkat, dan hal yang membutuhkan konfirmasi.
5. Rencana bertahap beserta perubahan file, risiko, dan verifikasi setiap tahap.
6. Usulan checkpoint Git sebelum perubahan besar.

Berhenti dan tunggu persetujuan saya.

---

## PROMPT 2 — Fondasi frontend React (SETELAH audit disetujui)

Lakukan HANYA fase fondasi yang sudah saya setujui. Gunakan instruksi `AGENTS.md` dan sitemap v2.

- Pertahankan proyek React/Vite bila sudah ada; jangan scaffold ulang. Jika masih statis, migrasikan secara terencana dan aman sesuai persetujuan.
- Gunakan TypeScript dan styling yang sudah ada/yang disetujui. Jangan tiba-tiba mengganti warna, font, atau layout.
- Buat pemisahan page-level layout, reusable UI, homepage feature, navigation config, types, dan mock data sesuai kebutuhan nyata. `App.tsx` menjadi komposisi aplikasi/routing, bukan monolit UI.
- Pertahankan semua konten dan assets homepage, terutama carousel Layanan Online dan bar Tanya Pustakawan.
- Jangan membuat puluhan halaman kosong dan jangan mengarang isi atau rute.
- Tidak membuat backend/API/DB/admin.
- Jalankan validasi yang memungkinkan dan laporkan perubahan yang benar-benar dibuat. Berhenti untuk review.

---

## PROMPT 3 — Implementasi Navbar & dropdown (SETELAH fondasi disetujui)

Implementasikan **hanya** navigasi frontend menurut `docs/pujasintara-sitemap.md` dan screenshot asli.

Aturan:
- Top-level: Beranda; Profil; Layanan; Aktivitas; Dokumen Publik; Kontak Kami; Bantuan. Pertahankan ikon pencarian jika sudah ada, tetapi jangan mengarang backend pencarian.
- Profil: Struktur Organisasi; Tugas dan Fungsi; Daftar Pegawai; Maklumat Pelayanan; Pustakawan Berkarya.
- Layanan: Informasi Layanan; Tanya Pustakawan; Diseminasi Informasi; Fasilitas; Katalog (+ submenu bertingkat); Direktori (+ submenu bertingkat).
- Aktivitas: Agenda; Berita; Galeri Video; Pengumuman; Info Barang Tertinggal.
- Dokumen Publik: Panduan Layanan; Seri Penelusuran Referensi; Infografis; Laporan Media Monitoring; Standar Pelayanan; Survei Kepuasan; Tindakan Aduan; Produk Kemas Ulang.
- Bantuan: FAQ; submenu tambahan masih TBD.

Buat `src/config/navigation.ts` sebagai sumber tunggal data menu dengan tipe untuk internal link, external link dan expandable group. Pisahkan komponen desktop/mobile jika membantu, gunakan semantic HTML, keyboard-friendly toggling, `aria-expanded`, Escape/close behavior yang masuk akal, dan mobile accordion/drawer. Menu bertingkat wajib didukung secara generik, tetapi JANGAN buat child atau URL fiktif untuk Katalog/Direktori. `href="#"` dilarang sebagai placeholder navigasi.

Pertahankan visual homepage yang telah disetujui: screenshot baru dipakai untuk STRUKTUR menu, bukan instruksi mengganti brand palette. Buat perubahan terlokalisasi, tampilkan daftar file diubah, jalankan pemeriksaan, dan berhenti untuk review.

---

## PROMPT 4 — Perancangan route + page shell (SETELAH navbar disetujui)

Berdasarkan sitemap yang disetujui, rancang routing untuk halaman-halaman internal Pujasintara. Pisahkan `SiteLayout` (TopBar, Navbar, Footer), shared `PageHeader`, breadcrumb, dan route-level `Page` agar setiap halaman tidak menyalin layout.

Sebelum mengubah kode, tampilkan matriks menu -> jenis (internal/eksternal/group) -> path yang DIUSULKAN -> status konten. Tandai tujuan yang belum diketahui. Konfirmasikan dulu apakah halaman yang belum didesain boleh memakai satu komponen placeholder eksplisit bersama (bukan membuat lusinan halaman dummy berisi konten tebakan).

Setelah saya menyetujui matriks, implementasikan hanya jalur yang disetujui. Jangan membuat tautan rusak. Periksa browser back/forward, deep link, refresh, mobile, active route, NotFound dan nested nav. Berhenti untuk review.

---

## PROMPT 5 — Implementasi isi halaman satu per satu

Kerjakan satu halaman atau satu kelompok terkait yang sudah saya setujui. Gunakan `AGENTS.md`, sitemap v2, screenshot desain spesifik (jika saya berikan), shared `SiteLayout`, route-level page, komponen reusable, dan feature modules jika diperlukan.

Jangan menciptakan informasi kelembagaan, layanan, daftar pegawai, FAQ, atau detail kebijakan Perpusnas. Konten belum tersedia harus ditandai dan dikonfirmasi. Pisahkan typed mock data dari JSX. Jangan ubah homepage ataupun menu di luar cakupan. Laporkan diff dan hasil pemeriksaan sebelum lanjut.

---

## PROMPT 6 — Audit frontend (READ-ONLY)

Audit struktur React, routes, navigation config, dropdown multi-level, keyboard navigation, responsiveness, komponen yang diduplikasi, large files, TypeScript, pemisahan mock data/API boundary, assets, dan potensi regresi visual. Tampilkan temuan dengan lokasi file, tingkat risiko dan usulan solusi minimal. Jangan mengubah file sebelum persetujuan.

---

## SEBELUM EKSPERIMEN DESAIN / REFACTOR BESAR

"Bantu saya meninjau `git status` dan membuat checkpoint Git untuk hasil yang sudah disetujui. Tunjukkan perintah dan file yang akan dicatat; jangan commit sampai saya setujui. Setelah eksperimen, saya ingin mampu mengembalikan versi sebelumnya tanpa menimpa perubahan yang tidak terkait."
