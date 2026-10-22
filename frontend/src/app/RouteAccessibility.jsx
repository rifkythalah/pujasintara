import { useEffect } from 'react';
import { useLocation, useMatches } from 'react-router';

export default function RouteAccessibility() {
  const location = useLocation();
  const matches = useMatches();
  const title = matches.at(-1)?.handle?.title ?? 'Pujasintara';

  useEffect(() => {
    document.title = `${title} — Pujasintara (Pratinjau)`;
    let hashId = '';
    try { hashId = decodeURIComponent(location.hash.slice(1)); } catch { /* Ignore malformed hash. */ }
    const destination = (hashId && document.getElementById(hashId)) || document.getElementById('konten-utama');
    if (destination) {
      // ScrollRestoration handles scroll separately, including browser Back/Forward.
      if (!destination.hasAttribute('tabindex')) destination.setAttribute('tabindex', '-1');
      destination.focus({ preventScroll: true });
    }
  }, [location.key, location.hash, title]);

  return null;
}
