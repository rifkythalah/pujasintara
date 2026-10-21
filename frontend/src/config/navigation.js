/**
 * Menu mengikuti docs/docs/pujasintara-sitemap.md.
 * Resolved destinations use kind: internal | external | group.
 * Pending leaves deliberately have no kind or URL until verified.
 * Group children === null means unknown, not an empty approved submenu.
 * @typedef {{id: string, label: string, status: 'pending'} |
 * {id: string, label: string, kind: 'internal', to: string} |
 * {id: string, label: string, kind: 'external', href: string} |
 * {id: string, label: string, kind: 'group', children: NavItem[] | null}} NavItem
 */
const pending = (id, label) => ({ id, label, status: 'pending' });

/** @type {NavItem[]} */
export const navigation = [
  { id: 'home', label: 'Beranda', kind: 'internal', to: '/' },
  { id: 'profil', label: 'Profil', kind: 'group', children: [
    pending('struktur-organisasi', 'Struktur Organisasi'),
    pending('tugas-dan-fungsi', 'Tugas dan Fungsi'),
    pending('daftar-pegawai', 'Daftar Pegawai'),
    pending('maklumat-pelayanan', 'Maklumat Pelayanan'),
    pending('pustakawan-berkarya', 'Pustakawan Berkarya'),
  ] },
  { id: 'layanan', label: 'Layanan', kind: 'group', children: [
    pending('informasi-layanan', 'Informasi Layanan'),
    pending('tanya-pustakawan', 'Tanya Pustakawan'),
    pending('diseminasi-informasi', 'Diseminasi Informasi'),
    pending('fasilitas', 'Fasilitas'),
    { id: 'katalog', label: 'Katalog', kind: 'group', children: null },
    { id: 'direktori', label: 'Direktori', kind: 'group', children: null },
  ] },
  { id: 'aktivitas', label: 'Aktivitas', kind: 'group', children: [
    pending('agenda', 'Agenda'), pending('berita', 'Berita'),
    pending('galeri-video', 'Galeri Video'), pending('pengumuman', 'Pengumuman'),
    pending('info-barang-tertinggal', 'Info Barang Tertinggal'),
  ] },
  { id: 'dokumen-publik', label: 'Dokumen Publik', kind: 'group', children: [
    pending('panduan-layanan', 'Panduan Layanan'),
    pending('seri-penelusuran-referensi', 'Seri Penelusuran Referensi'),
    pending('infografis', 'Infografis'),
    pending('laporan-media-monitoring', 'Laporan Media Monitoring'),
    pending('standar-pelayanan', 'Standar Pelayanan'),
    pending('survei-kepuasan', 'Survei Kepuasan'),
    pending('tindakan-aduan', 'Tindakan Aduan'),
    pending('produk-kemas-ulang', 'Produk Kemas Ulang'),
  ] },
  pending('kontak', 'Kontak Kami'),
  { id: 'bantuan', label: 'Bantuan', kind: 'group', children: [pending('faq', 'FAQ')] },
];
