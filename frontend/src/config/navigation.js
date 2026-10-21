/**
 * Menu mengikuti docs/docs/pujasintara-sitemap.md.
 * Jenis tujuan hanya ditetapkan setelah dikonfirmasi. Label yang belum diketahui
 * tujuannya tetap pending, bukan internal link dengan URL tebakan.
 * children: null berarti isi grup belum diketahui (Katalog dan Direktori).
 *
 * @typedef {{id: string, label: string}} NavBase
 * @typedef {NavBase & {kind: 'internal', to: string}} InternalNavItem
 * @typedef {NavBase & {kind: 'external', href: string}} ExternalNavItem
 * @typedef {NavBase & {kind: 'group', children: NavItem[] | null}} NavGroup
 * @typedef {NavBase & {status: 'pending'}} PendingNavItem
 * @typedef {InternalNavItem | ExternalNavItem | NavGroup | PendingNavItem} NavItem
 */
/** @param {string} id @param {string} label @returns {PendingNavItem} */
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
