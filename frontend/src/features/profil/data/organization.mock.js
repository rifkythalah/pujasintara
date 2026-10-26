/**
 * Content availability for the approved organization page preview.
 * No institutional hierarchy, personnel, or policy is inferred here.
 * @typedef {Object} PendingOrganizationSection
 * @property {string} id
 * @property {string} title
 * @property {'awaiting-content'} status
 * @property {string} emptyTitle
 * @property {string} description
 *
 * @typedef {Object} OrganizationPreview
 * @property {'awaiting-content'} status
 * @property {string} statusLabel
 * @property {string} notice
 * @property {PendingOrganizationSection[]} sections
 */

/** @type {OrganizationPreview} */
export const organizationPreview = {
  status: 'awaiting-content',
  statusLabel: 'Pratinjau · menunggu konten resmi',
  notice: 'Bagan dan informasi unit kerja belum tersedia. Halaman ini akan dilengkapi setelah materi resmi dikonfirmasi.',
  sections: [
    {
      id: 'bagan-organisasi',
      title: 'Bagan organisasi',
      status: 'awaiting-content',
      emptyTitle: 'Bagan belum tersedia',
      description: 'Bagan organisasi akan ditampilkan di sini setelah materi resmi tersedia. Susunan jabatan dan hubungan antarunit belum dimuat.',
    },
    {
      id: 'informasi-unit-kerja',
      title: 'Informasi unit kerja',
      status: 'awaiting-content',
      emptyTitle: 'Informasi unit kerja belum tersedia',
      description: 'Nama dan keterangan unit kerja akan dilengkapi berdasarkan materi yang telah dikonfirmasi.',
    },
  ],
};
