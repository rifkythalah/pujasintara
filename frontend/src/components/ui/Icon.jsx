const paths = {
  book: 'M12 6c-3-3-7-3-10-2v15c3-1 7-1 10 2m0-15c3-3 7-3 10-2v15c-3-1-7-1-10 2V6Z',
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  chevron: 'm6 9 6 6 6-6',
  search: 'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'm6 6 12 12M6 18 18 6',
  clock: 'M12 7v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  chat: 'M21 11a8 8 0 0 1-8 8H7l-5 3V11a9 9 0 0 1 19 0ZM7 9h9M7 13h6',
  location: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
};

export default function Icon({ name, className = '' }) {
  return <svg className={`icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.book} /></svg>;
}
