/** @typedef {'id' | 'en'} HeaderLocale */
/** @type {Record<HeaderLocale, {schedule: string, scheduleNote: string, scheduleLink: string, schedulePending: string, languageLabel: string, socialPending: string}>} */
export const headerCopy = {
  id: { schedule: 'Senin – Jumat: 08.00 – 19.00 WIB', scheduleNote: 'Sabtu – Minggu: 09.00 – 16.00 WIB', scheduleLink: 'Jadwal jam buka', schedulePending: 'Jadwal reguler mingguan. Halaman jadwal lengkap akan ditambahkan.', languageLabel: 'Bahasa informasi jadwal', socialPending: 'Tautan resmi belum tersedia' },
  en: { schedule: 'Monday – Friday: 08:00 – 19:00 WIB', scheduleNote: 'Saturday – Sunday: 09:00 – 16:00 WIB', scheduleLink: 'Opening hours', schedulePending: 'Regular weekly hours. The full schedule page will be added later.', languageLabel: 'Opening hours language', socialPending: 'Official link not available yet' },
};

/** @type {{id: string, label: string, href: string | null}[]} */
export const socialLinks = [
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/perpusnas.go.id/?hl=id' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/ayokeperpusnas' },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@PerpustakaanNasionalRI' },
];
