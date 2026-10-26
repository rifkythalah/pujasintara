/** @typedef {'id' | 'en'} HeaderLocale */
/** @type {Record<HeaderLocale, {schedule: {days: string, hours: string}[], scheduleLink: string, holidayLabel: string, closed: string, languageLabel: string, socialPending: string}>} */
export const headerCopy = {
  id: {
    schedule: [{ days: 'Senin – Jumat', hours: '08.00 – 19.00' }, { days: 'Sabtu – Minggu', hours: '09.00 – 16.00' }],
    scheduleLink: 'Jadwal Jam Buka', holidayLabel: 'Cuti Bersama Dan Hari Libur Nasional', closed: 'Tutup',
    languageLabel: 'Bahasa informasi jadwal', socialPending: 'Tautan resmi belum tersedia',
  },
  en: {
    schedule: [{ days: 'Monday – Friday', hours: '08:00 – 19:00' }, { days: 'Saturday – Sunday', hours: '09:00 – 16:00' }],
    scheduleLink: 'Opening Hours', holidayLabel: 'Collective Leave And National Holidays', closed: 'Closed',
    languageLabel: 'Opening hours language', socialPending: 'Official link not available yet',
  },
};

/** @type {{id: string, label: string, href: string | null}[]} */
export const socialLinks = [
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/perpusnas.go.id/?hl=id' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/ayokeperpusnas' },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@PerpustakaanNasionalRI' },
];
