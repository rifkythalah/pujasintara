# Pujasintara — Codex Repository Instructions (Sitemap v2)

## Mission
Build the public-facing Pujasintara website (Perpustakaan Nasional RI) as a maintainable, accessible, responsive frontend. The immediate scope is frontend only; Laravel REST API integration is deferred until explicitly authorized.

## Sources and precedence
1. The user's newest explicit instruction / approved decision is authoritative.
2. `docs/pujasintara-sitemap.md` defines the current information architecture and navigation labels, including menus confirmed by screenshots.
3. `docs/references/` holds four screenshots of the original navigation. Use them for information hierarchy and dropdown behavior, NOT as automatic authorization to replace the approved visual palette.
4. `docs/pujasintara-spec.md` documents the prior homepage visual specification, styling, and historic React/Laravel proposal. It is not proof of the currently installed framework or existing files.
5. The actual repository is authoritative about the *current state* of code and configuration. Inspect it before editing. Surface conflicts for user approval.

If these sources conflict, state the discrepancy and request a decision rather than silently choosing a redesign or deleting functionality.

## Approved navigation and page scope
- **Beranda:** homepage `/`.
- **Profil:** Struktur Organisasi; Tugas dan Fungsi; Daftar Pegawai; Maklumat Pelayanan; Pustakawan Berkarya.
- **Layanan:** Informasi Layanan; Tanya Pustakawan; Diseminasi Informasi; Fasilitas; Katalog (nested `+` group); Direktori (nested `+` group).
- **Aktivitas:** Agenda; Berita; Galeri Video; Pengumuman; Info Barang Tertinggal.
- **Dokumen Publik:** Panduan Layanan; Seri Penelusuran Referensi; Infografis; Laporan Media Monitoring; Standar Pelayanan; Survei Kepuasan; Tindakan Aduan; Produk Kemas Ulang.
- **Kontak Kami:** standalone main navigation entry / contact page.
- **Bantuan:** main navigation entry with FAQ. Other help content is TBD.
- **Search:** screenshot shows a search icon, but search behavior and source are not specified; preserve UI if present and ask before introducing a search system.

**Important limits:** `Katalog` and `Direktori` are known to be expandable but their actual children are UNKNOWN. Do not invent child labels, routes, links or content. The exact destination and whether an item opens a local route, external service, PDF, or expands a submenu must be verified. Paths in `docs/pujasintara-sitemap.md` are *proposed*, not confirmed existing URLs. Avoid dummy `href="#"` links that pretend to work.

## Current frontend scope and framework
- Work only on frontend until backend work is explicitly approved. Never scaffold Laravel, databases, migrations, seeders, admin, authentication or REST API endpoints during this phase.
- Preferred framework: React + Vite + TypeScript; Tailwind CSS v4 where appropriate and compatible with the inspected project. Inspect `package.json`, lockfile, entrypoints and styling first. Never scaffold React on top of an existing React project blindly.
- Do not change the existing package manager or lockfile without approval.
- Keep the currently accepted homepage appearance: white top bar, existing navbar and hero, Layanan Online layout and carousel, Layanan Fisik, Agenda, Berita, Literasi Digital and Footer. The historical design spec uses primary `#012269` and accent `#10743b`. The new navigation screenshots have a teal bar; they establish menu structure only until the user explicitly approves a color change.
- Preserve existing asset filenames and working `/assets/...` paths until an individually reviewed migration.

## Architecture principles
- Treat a **page** as a route-level view, a **feature** as domain-specific UI/data/logic, a **layout** as shared site chrome, and a **UI component** as a genuinely reusable visual primitive.
- Suggested target (adapt to existing code, create folders only when used):
  - `src/app/` — app bootstrap, router, providers.
  - `src/config/navigation.ts` — ONE typed, data-driven source for top-level navigation, dropdown groups, and nested menu items.
  - `src/pages/HomePage.tsx`, `src/pages/profil/`, `src/pages/layanan/`, `src/pages/aktivitas/`, `src/pages/dokumen-publik/`, `src/pages/kontak/`, `src/pages/bantuan/` — route-level pages only as content is ready.
  - `src/components/layout/` — SiteLayout, TopBar, Navbar, DesktopNav, MobileNav, Footer, and related layout components as justified.
  - `src/components/navigation/` — NavItem, DropdownMenu, NestedMenu / MobileMenu, only where complexity warrants.
  - `src/components/ui/` — reusable buttons, cards, breadcrumbs, headings, loading/empty states.
  - `src/features/homepage/` — homepage Hero, LayananOnline, LayananFisik, AgendaPreview, BeritaPreview, LiterasiDigital and associated types/mock data.
  - `src/features/<domain>/` — domain-specific UI/data/logic when required (for example agenda and news listing/detail later).
  - `src/hooks/`, `src/lib/`, `src/styles/`, `src/types/` as required.
  - `public/assets/` — original public assets; do not relocate without auditing imports/URLs.
- Avoid giant `App.tsx` or `Navbar.tsx` files, code duplicated across pages, content arrays buried in JSX, and dozens of meaningless empty file scaffolds.
- Use React Router only if already installed or explicitly approved for addition. Keep route definitions and navigation config aligned; ensure deep links and refresh work in the Vite app.
- Navigation entries should explicitly model `internal | external | group` and optional children, with stable IDs. Do not assume every label corresponds to an internal route.
- During frontend-only development, use typed mock data separated from view components; keep an API integration boundary for future Laravel use. Do not call nonexistent endpoints or fake API success.
- Layout, breadcrumbs, not-found handling, and planned-page state should be centralized, not copy-pasted into dozens of pages.

## Navigation usability / accessibility
- Support desktop click/toggle and keyboard interaction. Hover may enhance usability but must not be the ONLY activation mechanism.
- Use semantic `<nav>`, actual links for navigation, buttons for expanding groups, `aria-expanded`, sensible focus order, Escape to close, and focus management as appropriate.
- Handle submenu-within-submenu (`Katalog`, `Direktori`) on desktop and mobile without clipped overlays or mouse-only interactions.
- Mobile navigation should use an accessible accordion/drawer pattern; avoid overflowing the top-level navbar when adding `Bantuan`.
- Differentiate active page from expanded menu state and from hover state.
- Do not fabricate FAQ answers or service details. Empty/under-construction pages must be explicitly marked and require user approval before generating them.

## Engineering and safety workflow
- Before modifying code: inspect project structure, dependencies, Git status, assets, actual routes and existing UI. Present a plan, affected files, and checkpoint recommendation; wait for approval for setup, routing changes, or multi-file refactors.
- Implement small, individually reviewable phases: audit -> frontend foundation -> navbar/menu behavior -> approved routes/shells -> page content -> verification.
- Keep diffs narrowly scoped. Do not silently redesign navigation/branding or delete existing work. Do not run `git reset --hard`, `git clean -fd`, destructive checkout, or overwrite unrelated files without explicit informed approval.
- Do not commit/push/deploy automatically. Explain how to create a Git checkpoint and do it only with user approval.
- Before claiming completion, run applicable checks (typecheck, lint, build, smoke testing where available), record actual results, changed files and unresolved issues. Never claim checks you did not run.
- Answer the user in Bahasa Indonesia unless otherwise requested.
