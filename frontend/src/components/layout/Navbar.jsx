import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { navigation } from '../../config/navigation.js';
import NavItem from '../navigation/NavItem.jsx';
import Icon from '../ui/Icon.jsx';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openPath, setOpenPath] = useState([]);
  const container = useRef(null);
  const toggle = useRef(null);
  const nav = useRef(null);
  const currentPath = window.location.pathname;

  function closeAll() {
    setMobileOpen(false);
    setOpenPath([]);
  }

  useEffect(() => {
    const closeOutside = (event) => {
      if (!container.current?.contains(event.target)) {
        // A pointer on non-focusable content must not leave focus in hidden UI.
        if (nav.current?.contains(document.activeElement)) {
          const mobile = window.matchMedia('(max-width: 850px)').matches;
          const destination = mobile ? toggle.current : nav.current.querySelector('a');
          destination?.focus({ preventScroll: true });
        }
        closeAll();
      }
    };
    const breakpoint = window.matchMedia('(max-width: 850px)');
    const resetAtBreakpoint = (event) => {
      const active = document.activeElement;
      if (nav.current?.contains(active) || active === toggle.current) {
        const destination = event.matches ? toggle.current : nav.current.querySelector('a');
        destination?.focus({ preventScroll: true });
      }
      closeAll();
    };
    document.addEventListener('pointerdown', closeOutside);
    breakpoint.addEventListener('change', resetAtBreakpoint);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      breakpoint.removeEventListener('change', resetAtBreakpoint);
    };
  }, []);

  useLayoutEffect(() => {
    if (!mobileOpen) return;
    const fitMenu = () => {
      const available = window.innerHeight - nav.current.getBoundingClientRect().top - 16;
      nav.current.style.setProperty('--mobile-nav-height', `${Math.max(0, available)}px`);
    };
    fitMenu();
    window.addEventListener('resize', fitMenu);
    window.addEventListener('scroll', fitMenu, { passive: true });
    return () => {
      window.removeEventListener('resize', fitMenu);
      window.removeEventListener('scroll', fitMenu);
    };
  }, [mobileOpen]);

  return <div ref={container} className="navbar"
    onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) closeAll(); }}
    onKeyDown={(event) => {
      if (event.key === 'Escape' && mobileOpen) {
        event.preventDefault();
        closeAll();
        toggle.current?.focus();
      }
    }}>
    <div className="container nav-container">
      <button ref={toggle} className="mobile-toggle" type="button"
        aria-expanded={mobileOpen} aria-controls="site-navigation"
        onClick={() => { setMobileOpen(!mobileOpen); setOpenPath([]); }}>
        <Icon name={mobileOpen ? 'close' : 'menu'} />{mobileOpen ? 'Tutup menu' : 'Menu utama'}
      </button>
      <nav ref={nav} id="site-navigation" className={mobileOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Navigasi utama">
        <ul className="nav-list">{navigation.map((item) => <li key={item.id}>
          <NavItem item={item} currentPath={currentPath} openPath={openPath} onNavigate={closeAll}
            onClose={(depth) => setOpenPath((path) => path.slice(0, depth))}
            onToggle={(id, depth) => setOpenPath((path) =>
              path[depth] === id ? path.slice(0, depth) : [...path.slice(0, depth), id])} />
        </li>)}</ul>
      </nav>
      <button className="search-button" type="button" disabled aria-label="Pencarian situs belum tersedia" title="Pencarian situs belum tersedia"><Icon name="search" /></button>
    </div>
  </div>;
}
