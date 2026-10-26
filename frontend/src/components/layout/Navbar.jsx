import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { navigation } from '../../config/navigation.js';
import NavItem from '../navigation/NavItem.jsx';
import Icon from '../ui/Icon.jsx';
import SiteLogo from './SiteLogo.jsx';
import MobileNav from '../navigation/MobileNav.jsx';

export default function Navbar({ locale, onLocaleChange }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openPath, setOpenPath] = useState([]);
  const container = useRef(null);
  const toggle = useRef(null);
  const nav = useRef(null);
  const list = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [focusedId, setFocusedId] = useState(null);
  const { pathname: currentPath } = useLocation();

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const items = [...list.current.children].filter((item) => item.dataset.navId);
      const target = items.find((item) => item.dataset.navId === (hoveredId ?? focusedId))
        ?? items.find((item) => item.querySelector('[aria-current="page"], [data-route-active="true"]'));
      const control = target?.querySelector(':scope > .nav-link, :scope > .nav-group > .nav-group-heading > .nav-trigger');
      const bounds = control ? [...control.children].map((child) => child.getBoundingClientRect()) : [];
      const rect = bounds.length ? { left: Math.min(...bounds.map((box) => box.left)), width: Math.max(...bounds.map((box) => box.right)) - Math.min(...bounds.map((box) => box.left)) } : null;
      list.current.style.setProperty('--indicator-left', `${rect ? rect.left - list.current.getBoundingClientRect().left : 0}px`);
      list.current.style.setProperty('--indicator-width', `${rect?.width ?? 0}px`);
    };
    updateIndicator();
    const observer = new ResizeObserver(updateIndicator);
    observer.observe(list.current);
    for (const label of list.current.querySelectorAll('.nav-label')) observer.observe(label);
    return () => observer.disconnect();
  }, [hoveredId, focusedId, currentPath]);

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

  return <div ref={container} className="navbar"
    onBlur={(event) => { if (!mobileOpen && !event.currentTarget.contains(event.relatedTarget)) closeAll(); }}
    onKeyDown={(event) => {
      if (event.key === 'Escape' && mobileOpen) {
        event.preventDefault();
        closeAll();
        toggle.current?.focus();
      }
    }}>
    <div className="container nav-container">
      <SiteLogo className="mobile-brand" />
      <button ref={toggle} className="mobile-toggle" type="button"
        aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-haspopup="dialog"
        onClick={() => { setMobileOpen(!mobileOpen); setOpenPath([]); }}>
        <Icon name={mobileOpen ? 'close' : 'menu'} /><span className="mobile-toggle-label">{mobileOpen ? 'Tutup menu' : 'Menu utama'}</span>
      </button>
      <nav ref={nav} id="site-navigation" className="site-nav" aria-label="Navigasi utama"
        onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocusedId(null); }}>
        <ul ref={list} className="nav-list" onMouseLeave={() => setHoveredId(null)}>{navigation.map((item) => <li key={item.id} data-nav-id={item.id}
          onFocus={() => setFocusedId(item.id)}
          onMouseEnter={() => {
            if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
              setHoveredId(item.id);
              if (item.kind !== 'group' && !nav.current.contains(document.activeElement)) setOpenPath([]);
            }
          }}>
          <NavItem item={item} currentPath={currentPath} openPath={openPath} onNavigate={closeAll}
            onOpen={(id, depth) => setOpenPath((path) => path[depth] === id ? path : [...path.slice(0, depth), id])}
            onClose={(depth) => setOpenPath((path) => path.slice(0, depth))}
            onToggle={(id, depth) => setOpenPath((path) =>
              path[depth] === id ? path.slice(0, depth) : [...path.slice(0, depth), id])} />
        </li>)}<li className="nav-indicator" aria-hidden="true" /></ul>
      </nav>
      <MobileNav open={mobileOpen} onClose={closeAll} locale={locale} onLocaleChange={onLocaleChange}
        currentPath={currentPath} openPath={openPath}
        onCloseGroup={(depth) => setOpenPath((path) => path.slice(0, depth))}
        onToggle={(id, depth) => setOpenPath((path) => path[depth] === id ? path.slice(0, depth) : [...path.slice(0, depth), id])} />
      <button className="search-button" type="button" disabled aria-label="Pencarian situs belum tersedia" title="Pencarian situs belum tersedia"><Icon name="search" /></button>
    </div>
  </div>;
}
