# Mulai dari sini — Pujasintara Codex Starter v2

Paket ini memperbarui aturan dan prompt sebelumnya berdasarkan **4 screenshot menu asli Pujasintara** plus kebutuhan `Kontak Kami` dan `Bantuan/FAQ`.

## Pemakaian di VS Code Codex
1. Buka folder *root* proyek Pujasintara yang sebenarnya di VS Code (bukan folder kosong yang berbeda).
2. **Backup atau review dulu** jika proyek sudah punya `AGENTS.md`, `docs/` atau file lain bernama sama. Gabungkan aturan, jangan sembarang menimpa.
3. Salin `AGENTS.md`, `CODEX-FRONTEND-PROMPTS.md`, folder `docs/`, dan `README-START-HERE.md` ke root proyek.
4. Buka Codex extension, mode `Work locally`, pilih mode perencanaan/`/plan` jika tersedia.
5. Buka `CODEX-FRONTEND-PROMPTS.md`, mulai dari **PROMPT 1**. Minta audit READ-ONLY terlebih dahulu.
6. Tinjau hasil audit, sesuaikan framework/arsitektur, baru beri izin untuk PROMPT 2. Kerjakan prompt selanjutnya SATU per SATU.
7. Gunakan Git checkpoint sebelum perubahan besar. Jangan memilih `Full access` hanya untuk mempercepat: akses penuh tidak diperlukan untuk penataan arsitektur.

## Dokumen penting
- `AGENTS.md`: aturan kerja permanen untuk Codex.
- `docs/pujasintara-sitemap.md`: struktur navigasi berdasar screenshot; berisi path *usulan*, bukan URL asli yang sudah dikonfirmasi.
- `docs/pujasintara-spec.md`: dokumentasi sebelumnya tentang homepage/design dan rencana backend historis (backend BELUM diizinkan untuk fase ini).
- `docs/references/*.png`: screenshot dropdown asli (Profil, Layanan, Aktivitas, Dokumen Publik).
- `CODEX-FRONTEND-PROMPTS.md`: prompt audit, fondasi, navbar, routing, implementasi konten, dan review.

## Batasan
- Tidak membuat Laravel/backend sekarang.
- Tidak mengarang isi submenu `Katalog` / `Direktori` atau FAQ.
- Tidak membuat semua page dummy tanpa persetujuan.
- Tidak mengubah warna desain homepage yang sudah disetujui hanya karena screenshot menu asli berwarna turquoise.
- Codex tetap perlu membaca kode yang benar-benar ada sebelum melakukan migrasi framework.
