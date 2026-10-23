const jakartaWeekday = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Jakarta', weekday: 'short' });

/** Regular weekly hours supplied by the user; no holiday exceptions supplied.
 * @param {Date} date
 * @param {'id' | 'en'} locale
 */
export function openingHoursParts(date, locale = 'id') {
  const day = jakartaWeekday.format(date);
  const weekend = day === 'Sat' || day === 'Sun';
  const hours = weekend ? ['09', '16'] : ['08', '19'];
  const separator = locale === 'en' ? ':' : '.';
  return { prefix: locale === 'en' ? 'Open today' : 'Buka hari ini pukul', range: `${hours[0]}${separator}00 – ${hours[1]}${separator}00`, zone: 'WIB' };
}

/** @param {Date} date @param {'id' | 'en'} locale */
export function todayOpeningHours(date, locale = 'id') {
  const { prefix, range, zone } = openingHoursParts(date, locale);
  return `${prefix} ${range} ${zone}`;
}
