# Pujasintara — Sitemap & Frontend Information Architecture v2

## Keputusan implementasi — 22 Oktober 2026

Pengguna menyetujui React Router dengan JavaScript + JSDoc dan satu planned page
bersama. Seluruh item yang sudah bernama mendapat route lokal sementara,
termasuk yang sebelumnya bertanda perlu konfirmasi tujuan. Ini bukan konfirmasi
URL website lama atau layanan eksternal. Konten resmi dan desain masih menunggu.

- Katalog: `/layanan/katalog`; Direktori: `/layanan/direktori`. Label membuka
  halaman, tombol `+` terpisah membuka submenu. Anak submenu tetap tidak diketahui.
- Bantuan adalah tautan langsung `/bantuan`. FAQ berada di `/bantuan#faq`, bukan
  submenu atau route `/bantuan/faq`.
- Grup Profil, Layanan, Aktivitas, dan Dokumen Publik tetap dropdown tanpa halaman
  indeks. Tidak ada route detail atau pencarian yang ditambahkan.
- `frontend/src/config/navigation.js` adalah sumber label/hierarki;
  `frontend/src/config/routes.js` adalah sumber path dan metadata halaman.

Matriks dan struktur di bawah merekam usulan historis; keputusan di atas
menggantikannya untuk status route lokal, Katalog/Direktori, dan Bantuan.

**Status:** informasi menu didasarkan pada screenshot website asli yang diberikan pengguna pada 20 Oktober 2026. Struktur `Bantuan`/FAQ dan `Kontak Kami` ditambahkan atas instruksi pengguna. URL/path di bawah adalah **usulan penamaan untuk React Router**, bukan URL yang terbukti ada di website asli. Konten tiap halaman belum diberikan kecuali homepage dalam spesifikasi lama.

## Peta navigasi

```text
Pujasintara
├── Beranda
├── Profil  [dropdown]
│   ├── Struktur Organisasi
│   ├── Tugas dan Fungsi
│   ├── Daftar Pegawai
│   ├── Maklumat Pelayanan
│   └── Pustakawan Berkarya
├── Layanan  [dropdown]
│   ├── Informasi Layanan
│   ├── Tanya Pustakawan
│   ├── Diseminasi Informasi
│   ├── Fasilitas
│   ├── Katalog  [dropdown tingkat kedua; anak belum diketahui]
│   └── Direktori [dropdown tingkat kedua; anak belum diketahui]
├── Aktivitas  [dropdown]
│   ├── Agenda
│   ├── Berita
│   ├── Galeri Video
│   ├── Pengumuman
│   └── Info Barang Tertinggal
├── Dokumen Publik  [dropdown]
│   ├── Panduan Layanan
│   ├── Seri Penelusuran Referensi
│   ├── Infografis
│   ├── Laporan Media Monitoring
│   ├── Standar Pelayanan
│   ├── Survei Kepuasan
│   ├── Tindakan Aduan
│   └── Produk Kemas Ulang
├── Kontak Kami  [halaman]
└── Bantuan  [tambahan dari pengguna]
    └── FAQ  [disepakati; isi pertanyaan belum tersedia]
```

Ikon Search terlihat di navbar screenshot. Fitur pencarian belum ditentukan: jangan mengarang search API atau search-result route. Pastikan tetap responsive bila top-level Bantuan ditambahkan.

## Menu, jenis, dan calon path React

| Navigasi | Item | Usulan path | Jenis | Catatan |
|---|---|---|---|---|
| — | Beranda | `/` | Internal | Homepage sesuai desain terdahulu |
| Profil | Struktur Organisasi | `/profil/struktur-organisasi` | Perlu konfirmasi tujuan | Teks dari screenshot |
| Profil | Tugas dan Fungsi | `/profil/tugas-dan-fungsi` | Perlu konfirmasi tujuan | Teks dari screenshot |
| Profil | Daftar Pegawai | `/profil/daftar-pegawai` | Perlu konfirmasi tujuan | Teks dari screenshot |
| Profil | Maklumat Pelayanan | `/profil/maklumat-pelayanan` | Perlu konfirmasi tujuan | Teks dari screenshot |
| Profil | Pustakawan Berkarya | `/profil/pustakawan-berkarya` | Perlu konfirmasi tujuan | Teks dari screenshot |
| Layanan | Informasi Layanan | `/layanan/informasi-layanan` | Perlu konfirmasi tujuan | Bisa menjadi halaman lokal |
| Layanan | Tanya Pustakawan | `/layanan/tanya-pustakawan` | Perlu konfirmasi tujuan | Bisa berupa layanan eksternal; verifikasi |
| Layanan | Diseminasi Informasi | `/layanan/diseminasi-informasi` | Perlu konfirmasi tujuan | Teks dari screenshot |
| Layanan | Fasilitas | `/layanan/fasilitas` | Perlu konfirmasi tujuan | Teks dari screenshot |
| Layanan | Katalog | — | `group` bertingkat | Children dan perilaku klik parent TBD |
| Layanan | Direktori | — | `group` bertingkat | Children dan perilaku klik parent TBD |
| Aktivitas | Agenda | `/aktivitas/agenda` | Perlu konfirmasi tujuan | Daftar/detail bisa dikembangkan kemudian |
| Aktivitas | Berita | `/aktivitas/berita` | Perlu konfirmasi tujuan | Daftar/detail bisa dikembangkan kemudian |
| Aktivitas | Galeri Video | `/aktivitas/galeri-video` | Perlu konfirmasi tujuan | Teks dari screenshot |
| Aktivitas | Pengumuman | `/aktivitas/pengumuman` | Perlu konfirmasi tujuan | Teks dari screenshot |
| Aktivitas | Info Barang Tertinggal | `/aktivitas/info-barang-tertinggal` | Perlu konfirmasi tujuan | Teks dari screenshot |
| Dokumen Publik | Panduan Layanan | `/dokumen-publik/panduan-layanan` | Perlu konfirmasi tujuan | Bisa berupa dokumen/link; verifikasi |
| Dokumen Publik | Seri Penelusuran Referensi | `/dokumen-publik/seri-penelusuran-referensi` | Perlu konfirmasi tujuan | Bisa berupa dokumen/link; verifikasi |
| Dokumen Publik | Infografis | `/dokumen-publik/infografis` | Perlu konfirmasi tujuan | Bisa berupa koleksi konten |
| Dokumen Publik | Laporan Media Monitoring | `/dokumen-publik/laporan-media-monitoring` | Perlu konfirmasi tujuan | Verifikasi apakah PDF/link |
| Dokumen Publik | Standar Pelayanan | `/dokumen-publik/standar-pelayanan` | Perlu konfirmasi tujuan | Verifikasi apakah PDF/link |
| Dokumen Publik | Survei Kepuasan | `/dokumen-publik/survei-kepuasan` | Perlu konfirmasi tujuan | Verifikasi apakah form/halaman eksternal |
| Dokumen Publik | Tindakan Aduan | `/dokumen-publik/tindakan-aduan` | Perlu konfirmasi tujuan | Verifikasi apakah layanan/form |
| Dokumen Publik | Produk Kemas Ulang | `/dokumen-publik/produk-kemas-ulang` | Perlu konfirmasi tujuan | Teks dari screenshot |
| — | Kontak Kami | `/kontak-kami` | Usulan internal | Konten belum disuplai |
| Bantuan | FAQ | `/bantuan/faq` | Usulan internal | Pertanyaan-jawaban belum disuplai |

**Status navigasi:** Hanya nama menu dan struktur dropdown yang dikonfirmasi screenshot. `Kontak Kami` dan `Bantuan` berasal dari instruksi pengguna. Jangan memperlakukan *proposed path* sebagai URL website lama atau menciptakan isi halamannya. Tanyakan apakah `Bantuan` juga perlu halaman indeks `/bantuan` dan apakah FAQ menjadi satu-satunya submenu.

## Target frontend structure (proposed, create only as needed)

```text
pujasintara/
├── AGENTS.md
├── CODEX-FRONTEND-PROMPTS.md
├── docs/
│   ├── pujasintara-spec.md
│   ├── pujasintara-sitemap.md
│   └── references/*.png
├── public/
│   └── assets/                      # keep original paths stable
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── router.tsx
│   │   └── providers.tsx            # only when needed
│   ├── config/
│   │   └── navigation.ts            # typed single source of menu truth
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── profil/                   # 5 Profil page components when approved
│   │   ├── layanan/                 # 4 identified leaves; nested groups TBD
│   │   ├── aktivitas/               # 5 Aktivitas page components when approved
│   │   ├── dokumen-publik/          # 8 Dokumen Publik pages when approved
│   │   ├── kontak/                  # Kontak Kami page
│   │   ├── bantuan/                 # FAQ and approved help pages
│   │   └── NotFoundPage.tsx         # when routing is implemented
│   ├── components/
│   │   ├── layout/                  # SiteLayout, TopBar, Navbar, Footer
│   │   ├── navigation/              # DesktopNav, MobileNav, DropdownMenu etc.
│   │   └── ui/                      # Breadcrumb, Button, Card, PageHeader etc.
│   ├── features/
│   │   ├── homepage/
│   │   │   ├── components/           # Hero, LayananOnline, LayananFisik, etc.
│   │   │   ├── data/                 # homepage.mock.ts (while API deferred)
│   │   │   └── types.ts
│   │   └── ...                      # domain logic when implemented
│   ├── hooks/                      # generic reusable hooks only
│   ├── lib/                        # utilities, future API client only when needed
│   ├── styles/                     # design tokens/styles as appropriate
│   └── main.tsx
└── package.json
```

Use stable typed navigation items: `id`, `label`, discriminated `kind: internal | external | group`, `to` or `href` only for usable links, `children` for nested groups; item ordering should match screenshot. Keep `navigation.ts` in sync with the router and avoid duplicating menu arrays inside JSX.

## Navigation interaction specifications

1. Desktop: top-level dropdown positioning follows menu item, does not block unrelated content; toggles work via click and keyboard, not only hover.
2. Nested menus: Katalog & Direktori can expand recursively after actual submenu names are provided. Until then, show no invented links; agree on temporary UI state with user.
3. Mobile: collapsed navigation/drawer with accessible nested accordion. Prevent horizontal overflow from seven top-level entries.
4. Use semantic link/button roles, `aria-expanded`, keyboard navigation, logical focus, Escape to close, click-outside where appropriate, active route indicator, and focus-visible states.
5. Shared `SiteLayout` wraps all pages; keep TopBar/Nav/Footer reusable. Breadcrumb components must reflect verified hierarchy.
6. Avoid broken hrefs, automatic redirects to guessed paths, and copying homepage markup into other routes.
7. Verify navigation by mouse, keyboard, mobile viewport, direct URL refresh and browser back/forward.

## Visual note

The four screenshots serve as navigation references. Their turquoise navbar differs from the previous design document's dark blue `#012269`; preserve the user's **approved current UI** and ask before changing colors, type or hover appearance. The desired hierarchy is independent of that color decision.

## Open decisions to ask user, NOT silently assume

- Submenu labels and URLs of Katalog and Direktori.
- Whether each menu item is an internal page, external service, downloadable file, or expands another menu.
- Whether Bantuan is a direct page, dropdown containing FAQ, or both; contents beyond FAQ.
- Actual content for each inner page, including contacts and FAQ.
- Whether search should index local content, connect to an existing service, or remain UI-only until backend.
- Whether the new screenshot palette represents current original site to be replaced, or a desired navbar color (earlier approved design uses deep blue).

## Recommended phases

1. READ-ONLY audit existing repo and current navigation.
2. Prepare React/Vite/TypeScript frontend foundation only if necessary, with Git checkpoint and explicit approval.
3. Implement reusable, typed, accessible navigation config and dropdown controls, preserving current visual appearance.
4. Approve route matrix / external links / placeholder policy; implement routing and shared page shells only as approved.
5. Implement each approved page's real content in small batches.
6. Audit types, build, responsive behavior, keyboard accessibility, nested menus and future API boundary.
