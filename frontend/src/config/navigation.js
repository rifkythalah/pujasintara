/**
 * Menu mengikuti docs/docs/pujasintara-sitemap.md.
 * Keputusan 22 Oktober 2026: semua item bernama memiliki halaman lokal sementara;
 * Bantuan adalah halaman langsung. Tujuan layanan eksternal tetap belum ditetapkan.
 * children: null berarti isi grup belum diketahui (Katalog dan Direktori).
 *
 * @typedef {{id: string, label: string}} NavBase
 * @typedef {NavBase & {kind: 'internal', routeId: string}} InternalNavItem
 * @typedef {NavBase & {kind: 'external', href: string}} ExternalNavItem
 * @typedef {NavBase & {kind: 'group', routeId?: string, children: NavItem[] | null}} NavGroup
 * @typedef {NavBase & {status: 'pending'}} PendingNavItem
 * @typedef {InternalNavItem | ExternalNavItem | NavGroup | PendingNavItem} NavItem
 */
/** @param {string} id @param {string} label @returns {InternalNavItem} */
const internal = (id, label) => ({ id, label, kind: 'internal', routeId: id });

/** @type {NavItem[]} */
export const navigation = [
  internal('home', 'Beranda'),
  { id: 'profil', label: 'Profil', kind: 'group', children: [
    internal('struktur-organisasi', 'Struktur Organisasi'),
    internal('tugas-dan-fungsi', 'Tugas dan Fungsi'),
    internal('daftar-pegawai', 'Daftar Pegawai'),
    internal('maklumat-pelayanan', 'Maklumat Pelayanan'),
    internal('pustakawan-berkarya', 'Pustakawan Berkarya'),
  ] },
  { id: 'layanan', label: 'Layanan', kind: 'group', children: [
    internal('informasi-layanan', 'Informasi Layanan'),
    internal('tanya-pustakawan', 'Tanya Pustakawan'),
    internal('diseminasi-informasi', 'Diseminasi Informasi'),
    internal('fasilitas', 'Fasilitas'),
    { id: 'katalog', label: 'Katalog', kind: 'group', routeId: 'katalog', children: null },
    { id: 'direktori', label: 'Direktori', kind: 'group', routeId: 'direktori', children: null },
  ] },
  { id: 'aktivitas', label: 'Aktivitas', kind: 'group', children: [
    internal('agenda', 'Agenda'), internal('berita', 'Berita'),
    internal('galeri-video', 'Galeri Video'), internal('pengumuman', 'Pengumuman'),
    internal('info-barang-tertinggal', 'Info Barang Tertinggal'),
  ] },
  { id: 'dokumen-publik', label: 'Dokumen Publik', kind: 'group', children: [
    internal('panduan-layanan', 'Panduan Layanan'),
    internal('seri-penelusuran-referensi', 'Seri Penelusuran Referensi'),
    internal('infografis', 'Infografis'),
    internal('laporan-media-monitoring', 'Laporan Media Monitoring'),
    internal('standar-pelayanan', 'Standar Pelayanan'),
    internal('survei-kepuasan', 'Survei Kepuasan'),
    internal('tindakan-aduan', 'Tindakan Aduan'),
    internal('produk-kemas-ulang', 'Produk Kemas Ulang'),
  ] },
  internal('bantuan', 'Bantuan'),
  internal('kontak', 'Kontak Kami'),
];
