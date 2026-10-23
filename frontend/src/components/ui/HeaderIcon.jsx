/** Icons used only by the site header. Decorative; controls supply labels. */
export default function HeaderIcon({ name }) {
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === 'plus-circle' && <><circle cx="12" cy="12" r="10" /><path d="M12 7v10M7 12h10" /></>}
    {name === 'language' && <><path d="M3 5h12M9 3v2M12 5c0 6-4 10-9 12M5 8c1 4 4 7 8 9M14 21l4-11 4 11M15.5 17h5" /></>}
    {name === 'instagram' && <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></>}
    {name === 'facebook' && <><circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" /><path d="M13 21v-8h3l.5-3H13V8c0-1 .5-1.5 1.5-1.5H17v-3h-2.5C11 3.5 10 5.5 10 8v2H8v3h2v8" fill="white" stroke="none" /></>}
    {name === 'youtube' && <><rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor" stroke="none" /><path d="m10 9 6 3-6 3Z" fill="white" stroke="none" /></>}
    {name === 'phone' && <path d="m6 3 4 5-3 3c2 3 3 4 6 6l3-3 5 4c-1 4-4 4-7 2C8 17 5 14 3 8 2 5 3 3 6 3Z" fill="currentColor" />}
  </svg>;
}
