import { navigation } from './navigation.js';

// Local page shells approved on 22 October 2026. No external URL is inferred.
const definitions = [
  { id: 'home', path: '/', view: 'home' },
  { id: 'struktur-organisasi', path: '/profil/struktur-organisasi', summary: 'Ruang informasi mengenai susunan organisasi Pujasintara.', topics: ['Bagan organisasi', 'Informasi unit kerja'] },
  { id: 'tugas-dan-fungsi', path: '/profil/tugas-dan-fungsi', summary: 'Ruang pengenalan tugas dan fungsi unit layanan.', topics: ['Uraian tugas', 'Ruang lingkup fungsi'] },
  { id: 'daftar-pegawai', path: '/profil/daftar-pegawai', summary: 'Ruang informasi pegawai yang akan dilengkapi dengan data terverifikasi.', topics: ['Daftar pegawai', 'Informasi penugasan'] },
  { id: 'maklumat-pelayanan', path: '/profil/maklumat-pelayanan', summary: 'Ruang publikasi maklumat pelayanan.', topics: ['Materi maklumat', 'Dokumen resmi'] },
  { id: 'pustakawan-berkarya', path: '/profil/pustakawan-berkarya', summary: 'Ruang pengenalan karya dan kontribusi pustakawan.', topics: ['Daftar karya', 'Informasi publikasi'] },
  { id: 'informasi-layanan', path: '/layanan/informasi-layanan', summary: 'Ruang pengenalan informasi layanan Pujasintara.', topics: ['Deskripsi layanan', 'Panduan penggunaan layanan'] },
  { id: 'tanya-pustakawan', path: '/layanan/tanya-pustakawan', summary: 'Ruang informasi layanan Tanya Pustakawan. Konsultasi belum tersedia pada pratinjau ini.', topics: ['Informasi layanan referensi', 'Kanal komunikasi resmi'] },
  { id: 'diseminasi-informasi', path: '/layanan/diseminasi-informasi', summary: 'Ruang publikasi materi diseminasi informasi.', topics: ['Materi informasi', 'Dokumentasi kegiatan'] },
  { id: 'fasilitas', path: '/layanan/fasilitas', summary: 'Ruang pengenalan fasilitas perpustakaan.', topics: ['Informasi fasilitas', 'Panduan penggunaan fasilitas'] },
  { id: 'katalog', path: '/layanan/katalog', summary: 'Halaman awal Katalog. Rincian pilihan katalog dan tujuannya belum tersedia.', topics: null },
  { id: 'direktori', path: '/layanan/direktori', summary: 'Halaman awal Direktori. Rincian pilihan direktori dan tujuannya belum tersedia.', topics: null },
  { id: 'agenda', path: '/aktivitas/agenda', summary: 'Ruang informasi agenda dan kegiatan. Belum ada jadwal resmi pada pratinjau ini.', topics: ['Daftar kegiatan', 'Waktu dan lokasi terverifikasi'] },
  { id: 'berita', path: '/aktivitas/berita', summary: 'Ruang publikasi berita dan cerita dari perpustakaan.', topics: ['Daftar berita', 'Materi editorial'] },
  { id: 'galeri-video', path: '/aktivitas/galeri-video', summary: 'Ruang dokumentasi video kegiatan dan layanan.', topics: ['Materi video', 'Keterangan dokumentasi'] },
  { id: 'pengumuman', path: '/aktivitas/pengumuman', summary: 'Ruang informasi pengumuman untuk pengunjung.', topics: ['Pengumuman resmi', 'Tanggal publikasi'] },
  { id: 'info-barang-tertinggal', path: '/aktivitas/info-barang-tertinggal', summary: 'Ruang informasi barang tertinggal. Data dan tata cara pengambilan belum tersedia.', topics: ['Informasi barang', 'Panduan tindak lanjut'] },
  { id: 'panduan-layanan', path: '/dokumen-publik/panduan-layanan', summary: 'Ruang publikasi panduan layanan perpustakaan.', topics: ['Materi panduan', 'Berkas yang telah diverifikasi'] },
  { id: 'seri-penelusuran-referensi', path: '/dokumen-publik/seri-penelusuran-referensi', summary: 'Ruang publikasi seri penelusuran referensi.', topics: ['Daftar seri', 'Materi referensi'] },
  { id: 'infografis', path: '/dokumen-publik/infografis', summary: 'Ruang penyajian informasi dalam bentuk infografis.', topics: ['Materi infografis', 'Keterangan dan sumber'] },
  { id: 'laporan-media-monitoring', path: '/dokumen-publik/laporan-media-monitoring', summary: 'Ruang publikasi laporan media monitoring.', topics: ['Daftar laporan', 'Periode dan berkas publikasi'] },
  { id: 'standar-pelayanan', path: '/dokumen-publik/standar-pelayanan', summary: 'Ruang publikasi standar pelayanan. Ketentuan resmi belum dimuat.', topics: ['Dokumen standar', 'Informasi versi dokumen'] },
  { id: 'survei-kepuasan', path: '/dokumen-publik/survei-kepuasan', summary: 'Ruang informasi survei kepuasan. Pengisian survei belum tersedia pada pratinjau ini.', topics: ['Informasi survei', 'Kanal survei resmi'] },
  { id: 'tindakan-aduan', path: '/dokumen-publik/tindakan-aduan', summary: 'Ruang informasi tindakan aduan. Pengiriman aduan belum tersedia pada pratinjau ini.', topics: ['Informasi tindak lanjut', 'Kanal layanan resmi'] },
  { id: 'produk-kemas-ulang', path: '/dokumen-publik/produk-kemas-ulang', summary: 'Ruang pengenalan produk kemas ulang informasi.', topics: ['Daftar produk', 'Materi publikasi'] },
  { id: 'kontak', path: '/kontak-kami', summary: 'Ruang informasi kontak Pujasintara. Alamat dan kanal komunikasi akan dilengkapi setelah diverifikasi.', topics: ['Alamat layanan', 'Kontak dan jam layanan'] },
  { id: 'bantuan', path: '/bantuan', view: 'help', summary: 'Panduan menjelajahi pratinjau Pujasintara dan pertanyaan yang sering muncul.' },
];

// Labels and ancestry come from navigation, so the router never duplicates menus.
function indexNavigation(items, ancestors = [], index = new Map()) {
  for (const item of items) {
    if (item.routeId) index.set(item.routeId, { item, ancestors });
    if (item.kind === 'group' && item.children) indexNavigation(item.children, [...ancestors, item], index);
  }
  return index;
}
const navigationIndex = indexNavigation(navigation);
const paths = new Map(definitions.map((page) => [page.id, page.path]));

export const routes = definitions.map((definition) => {
  const entry = navigationIndex.get(definition.id);
  if (!entry) throw new Error(`Route ${definition.id} is missing its navigation entry.`);
  const { item, ancestors } = entry;
  return {
    view: 'planned',
    ...definition,
    title: item.label,
    category: ancestors[0]?.label ?? 'Pujasintara',
    groupId: ancestors[0]?.id ?? null,
    breadcrumbs: [
      { label: navigationIndex.get('home').item.label, to: '/' },
      ...ancestors.map((parent) => ({ label: parent.label, to: paths.get(parent.routeId) })),
      { label: item.label },
    ],
  };
});

/** @param {string} id */
export function getRoute(id) {
  const route = routes.find((page) => page.id === id);
  if (!route) throw new Error(`Unknown route ID: ${id}`);
  return route;
}

/** @param {string} pathname */
export function normalizePath(pathname) {
  return pathname.replace(/\/+$/, '') || '/';
}

/** @param {import('./navigation.js').NavItem} item @param {string} pathname */
export function isNavigationActive(item, pathname) {
  const current = normalizePath(pathname);
  return Boolean((item.routeId && getRoute(item.routeId).path === current) ||
    (item.kind === 'group' && item.children?.some((child) => isNavigationActive(child, current))));
}
