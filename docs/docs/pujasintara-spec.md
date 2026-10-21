# Pujasintara — Design Spec + React/Laravel Implementation Plan

## Context

The Pujasintara homepage (Perpustakaan Nasional RI) is currently a single-file, static
React 19 + Vite 8 + Tailwind v4 app (`src/App.tsx`, ~580 lines) with all content hardcoded
in `const` arrays and no backend. The user wants to evolve this into a real product:

- **Frontend:** React (keep the existing Vite + Tailwind v4 stack and the visual result already
  built — the "Layanan Online" carousel, white top bar, Tanya Pustakawan bar, etc.).
- **Backend:** Laravel exposing a **REST API only** (DB + migrations + seeders). No admin UI now
  ("admin nanti") — content is seeded/edited via DB/seeders for the first iteration.
- The visual target is the reference the user provided (screenshots under `/tmp/attachments` and
  `src/imports/*.png`). Two deliverables are requested: a **`design.md`** (visual/design spec) and
  this **implementation plan**.

Goal: produce `design.md` capturing the design system, then split the monolithic frontend into
components that fetch dynamic content from a Laravel API, while the page keeps rendering exactly
like the approved example.

---

## Deliverable 1 — `design.md` (to be created at repo root)

A design-system document mirroring the built UI. Intended contents:

### Brand & tokens (already partly in `src/index.css` `@theme`)
- Colors: `--color-primary: #012269` (deep blue), `--color-accent: #10743b` (green),
  surfaces `#ffffff` / `#f9f9f9` / `#fefefe`, borders `#bababa` / `#e2e2e2`,
  muted text `#424751` / `#c3c3c3`, dashed-bar border `#4d7bd6`.
- Fonts (Google Fonts via `@import` in `src/index.css`):
  Plus Jakarta Sans (headings/nav), Montserrat (body/cards), Inter (footer legal).
- Radii, shadows (`shadow-[0px_4px_4px_rgba(0,0,0,0.25)]` for green CTAs), spacing scale.

### Layout & sections (document each with its rules)
1. **Top bar (white):** wide logo banner left · clock + jam buka center · language + social right.
2. **Navbar (blue, sticky):** menu with ⊕ dropdown affordances · "Kontak Kami".
3. **Hero:** full-bleed image + blue overlay, centered welcome copy + green CTA.
4. **Layanan Online (signature section):** two-column grid `[1fr_44%]`. Left column stacks
   header → divider → card (text + small slide image) → right-aligned circular arrows →
   **Tanya Pustakawan blue bar bleeding to the left frame edge, single line**. Right column is the
   tall carousel image (top aligned with "Inovasi Layanan Publik", bottom aligned with the blue bar)
   plus a **~34px faded peek** of the next slide separated by a gap.
5. **Layanan Fisik & Ruang Baca:** image banner with centered title overlay.
6. **Agenda & Kegiatan:** 4-up card grid + date badge.
7. **Berita Terkini:** one large feature card + two horizontal cards.
8. **Layanan Literasi Digital:** partner logo row.
9. **Footer:** background image + blue overlay, logo + social, 4–5 column link/stat grid, legal line.

### Component inventory & states
Carousel (crossfade + peek + dots + arrows), cards, badges, CTA buttons, social icon buttons,
responsive/collapse rules (grid → stacked at `lg`/`sm`, blue bar returns to gutter on mobile).

> `design.md` is documentation only; it does not change runtime behavior.

---

## Deliverable 2 — Implementation

### Repository structure
Keep the React app at the repo root; add Laravel as a sibling folder.

```
/workspaces/default/code
├── src/ ...            # existing React app (root Vite project)
├── public/assets/      # existing images/SVGs
├── design.md           # NEW
├── backend/            # NEW — Laravel API
└── plans/
```

### Backend (Laravel — API only)

**Setup:** `composer create-project laravel/laravel backend`, configure `.env`
(SQLite for dev is simplest: `DB_CONNECTION=sqlite` + `database/database.sqlite`), enable CORS in
`config/cors.php` for the Vite dev origin, prefix all routes under `/api`.

**Domain models / migrations / seeders** (derived from the hardcoded arrays in `src/App.tsx`):

| Resource | Key fields | Source array in App.tsx |
|---|---|---|
| `online_services` (carousel) | title, description, image_path, links (json: label+url), sort | `carouselSlides` + radio card copy |
| `agenda_events` | title, date, time, location, image_path, detail_url | `agendaCards` |
| `news` | title, excerpt, image_path, author, published_at, is_featured, category | `newsLeft` / `newsRight` |
| `digital_partners` | name, logo_path, url, sort | `imgPartner1..5` |
| `nav_links` | label, url, has_dropdown, sort | `navLinks` |
| `site_settings` (singleton key/value) | jam operasional, kontak, statistik, hero copy, social links | top bar / hero / footer |

For each: `php artisan make:model X -m`, an Eloquent model, an API Resource
(`php artisan make:resource XResource`) for clean JSON shaping, a seeder that mirrors the current
hardcoded content, and a read `index`/`show` controller.

**Routes (`routes/api.php`):**
```
GET /api/online-services
GET /api/agenda
GET /api/news            (?featured=1 supported)
GET /api/partners
GET /api/nav-links
GET /api/settings
GET /api/homepage        # optional aggregate: returns all of the above in one payload
```
Prefer the single `/api/homepage` aggregate to minimize round-trips on first load.

Image handling for now: keep serving images from the frontend `public/assets` and store only the
`/assets/<file>` path string in the DB (no upload pipeline yet — that comes with the admin later).

### Frontend (React) — make it data-driven, keep the design

1. **Componentize `src/App.tsx`** into `src/components/` (one file per section), preserving the exact
   current markup/classes:
   `TopBar`, `Navbar`, `Hero`, `LayananOnline` (the carousel — keep grid `[1fr_44%]`, left-bleed
   blue bar, 34px peek, single-line bar), `LayananFisik`, `Agenda`, `Berita`, `LiterasiDigital`,
   `Footer`. Move the inline `Icon*` components to `src/components/icons.tsx`.
2. **Types:** `src/types.ts` mirroring the API resources.
3. **API client:** `src/lib/api.ts` using `fetch` with `VITE_API_BASE_URL` (add `.env` +
   `src/vite-env.d.ts` typing). Add a single `useHomepage()` hook (plain `useState`/`useEffect`, or
   add `@tanstack/react-query` if we want caching — recommend react-query for loading/error/retry).
4. **Wiring:** `App.tsx` calls `useHomepage()`, passes data down as props; each section renders from
   props instead of the module-level `const` arrays. Keep local UI state (`slide`, `menuOpen`).
5. **States:** lightweight skeleton/placeholder while loading and a graceful fallback so the layout
   never collapses if the API is down (fall back to seeded defaults or empty-safe rendering).
6. **Assets:** unchanged — still referenced via `/assets/...`; DB returns those same paths.

### Suggested order of work
1. Create `design.md`.
2. Scaffold `backend/` Laravel + SQLite + CORS.
3. Migrations → models → resources → seeders (content copied from current arrays).
4. Controllers + `routes/api.php` (+ `/api/homepage` aggregate). Verify with `curl`.
5. Frontend: split components (no behavior change), verify visual parity with the example.
6. Add `api.ts` + `useHomepage()` + `.env`; swap hardcoded arrays for API data.
7. Loading/error/fallback polish.

---

## Verification

- **Backend:** `php artisan migrate --seed`, then `php artisan serve` and
  `curl http://127.0.0.1:8000/api/homepage` — confirm JSON matches the seeded content shape.
- **Frontend visual parity:** `pnpm dev`; compare the "Layanan Online" section against the user's
  reference screenshot — single-line blue bar bleeding left, tall right image aligned top
  ("Inovasi Layanan Publik") to bottom (blue bar), ~34px faded next-slide peek, working arrows/dots.
- **Integration:** set `VITE_API_BASE_URL` to the Laravel origin; confirm agenda/berita/partners/
  carousel/settings all render from the API and that stopping the API shows the fallback, not a crash.
- **Typecheck:** `npx tsc --noEmit` stays clean after componentization.
- **Responsive:** grid collapses at `lg`/`sm`, blue bar returns to the gutter, no overflow on mobile.

---

## Prompt siap-pakai untuk Antigravity (copy–paste berurutan)

Tempel satu per satu ke chatbox Antigravity, **berurutan**. Setiap prompt sudah memuat konteks
tech-stack + spesifikasi visual supaya hasilnya sesuai contoh. Ganti bagian `[...]` bila perlu.

### Prompt 0 — Konteks proyek (tempel paling awal, sekali saja)
```
Kita bangun website "Pujasintara" (homepage Perpustakaan Nasional RI).
Tech stack: Frontend React 19 + Vite + TypeScript + Tailwind CSS v4. Backend Laravel (REST API saja).
Bahasa konten: Indonesia. Font: Plus Jakarta Sans (heading/nav), Montserrat (body/card), Inter (footer),
di-load via Google Fonts @import di src/index.css (import CSS harus paling atas).
Warna: primary #012269 (biru tua), accent #10743b (hijau), surface #ffffff/#f9f9f9/#fefefe,
border #bababa/#e2e2e2, teks redup #424751/#c3c3c3, border dashed bar #4d7bd6.
Semua gambar/SVG ada di public/assets dan dirujuk lewat prefix "/assets/<file>".
Buat layout responsif (grid/flex, collapse di layar kecil), JANGAN pakai reset CSS universal.
Tampilan HARUS mengikuti screenshot referensi yang aku berikan. Konfirmasi paham sebelum lanjut.
```

### Prompt 1 — Struktur & shell aplikasi
```
Pecah homepage jadi komponen per-section di src/components/:
TopBar, Navbar, Hero, LayananOnline, LayananFisik, Agenda, Berita, LiterasiDigital, Footer,
dan icons.tsx untuk semua ikon SVG inline. App.tsx merakit semuanya berurutan.
Buat src/types.ts untuk tipe data konten. Jangan ubah tampilan—hanya rapikan struktur.
```

### Prompt 2 — Top bar (putih) + Navbar (biru sticky)
```
Buat TopBar latar PUTIH: kiri logo banner lebar (/assets logo), tengah ikon jam + teks
"Buka hari ini pukul 08:00–19:00" dengan link "Jadwal jam buka", kanan pemilih bahasa
Indonesia|English + ikon sosial (Facebook, X, Instagram, YouTube) warna hitam.
Di bawahnya Navbar biru #012269 STICKY: menu Beranda, Profil, Layanan, Aktivitas,
Dokumen Publik, Bantuan (item ber-dropdown pakai badge ⊕), dan link "Kontak Kami" di kanan.
Teks putih. Sertakan menu hamburger di mobile.
```

### Prompt 3 — Hero
```
Buat Hero: gambar full-bleed /assets hero + overlay biru #012269/35%. Teks tengah:
"Selamat Datang di Situs Web", subjudul instansi, judul besar
"Pujasintara • Perpustakaan Nasional Republik Indonesia", tagline "Pujasintara Melayani Nusantara",
lalu tombol hijau #10743b "Lihat Agenda Kegiatan Gedung Layanan Perpusnas".
```

### Prompt 4 — Layanan Online (section utama, paling detail)
```
Buat section "Layanan Online Pujasintara" PERSIS seperti screenshot referensi.
Pakai grid 2 kolom lg:grid-cols-[1fr_44%].
KIRI (satu kolom, ditumpuk): eyebrow "Inovasi Layanan Publik" -> judul biru besar
"Layanan Online Pujasintara" -> garis pembatas -> kartu ber-border (teks radio + 2 link ber-ikon
"Kanal Youtube WBS" & "Radio Streaming" + gambar slide kecil di kanan kartu) -> tombol panah bulat
kiri/kanan rata-KANAN -> bar biru "Tanya Pustakawan".
Bar biru: SATU BARIS saja (font ~12–13px), teks "Butuh informasi referensi koleksi atau pertanyaan
tentang layanan Perpusnas?" di kiri dan link "Tanya Pustakawan" di kanan, border dashed #4d7bd6,
dan bar ini NYAMBUNG sampai batas KIRI frame (bleed pakai negative margin membatalkan padding container).
KANAN: gambar carousel TINGGI—atasnya sejajar dengan "Inovasi Layanan Publik", bawahnya sejajar
dengan bar Tanya Pustakawan (karena satu baris grid). Di tepi kanan ada PEEK gambar slide berikutnya
yang KECIL (~34px, lebih sempit dari gambar utama) dipisah gap. Carousel: crossfade antar slide,
dot indicator, panah & dot menggerakkan slide yang sama.
```

### Prompt 5 — Layanan Fisik, Agenda, Berita, Literasi Digital
```
Buat 4 section:
1) Layanan Fisik & Ruang Baca Terpadu: banner gambar + overlay + judul tengah "Layanan Keanggotaan".
2) Agenda & Kegiatan Mendatang: grid 4 kartu (gambar + badge tanggal + judul + waktu + lokasi +
   link "Lihat Detail Agenda"), plus tombol hijau "Lihat Kalender Agenda Lengkap".
3) Berita Terkini: 1 kartu besar unggulan + 2 kartu horizontal, tombol hijau "Lihat Berita Lainnya".
4) Layanan Literasi Digital: baris logo mitra (INLIS, OneSearch, iPusnas, e-Resources, SION).
Semua konten Bahasa Indonesia, ambil dari /assets.
```

### Prompt 6 — Footer
```
Buat Footer: background gambar + overlay biru #012269/80%. Baris atas logo + ikon sosial dalam
lingkaran. Grid kolom: Tentang + Statistik Website, Layanan, Aktivitas, Jam Operasional + Kontak.
Baris bawah teks legal "Hak Cipta dilindungi Undang-undang © 2026 Perpustakaan Nasional RI" (font Inter).
```

### Prompt 7 — Backend Laravel (API saja) + integrasi
```
Buat backend Laravel di folder backend/ (REST API saja, tanpa admin). Pakai SQLite untuk dev,
aktifkan CORS untuk origin Vite. Buat migration+model+API Resource+seeder untuk:
online_services (carousel), agenda_events, news (punya is_featured), digital_partners, nav_links,
site_settings (singleton: jam operasional, kontak, statistik, hero copy, social links).
Isi seeder dari konten yang sekarang. Endpoint: GET /api/online-services, /api/agenda, /api/news,
/api/partners, /api/nav-links, /api/settings, dan agregat GET /api/homepage.
Simpan path gambar sebagai "/assets/<file>" (belum ada upload).
Di frontend buat src/lib/api.ts (pakai VITE_API_BASE_URL) + hook useHomepage() (react-query),
lalu ganti data hardcoded jadi data dari API dengan state loading + fallback aman.
```

> Tips: kalau Antigravity minta konfirmasi, jawab sesuai; lampirkan screenshot referensi lagi di
> Prompt 4 supaya fidelitas carousel-nya tinggi.
