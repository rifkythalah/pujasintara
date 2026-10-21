import { useRef, useState } from 'react';
import { navigation } from '../../config/navigation.js';
import NavItem from '../navigation/NavItem.jsx';
import Icon from '../ui/Icon.jsx';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggle = useRef(null);

  return <div className="navbar" onKeyDown={(event) => {
    if (event.key === 'Escape' && mobileOpen) { setMobileOpen(false); toggle.current?.focus(); }
  }}>
    <div className="container nav-container">
      <button ref={toggle} className="mobile-toggle" type="button" aria-expanded={mobileOpen} aria-controls="site-navigation" onClick={() => setMobileOpen(!mobileOpen)}>
        <Icon name={mobileOpen ? 'close' : 'menu'} />{mobileOpen ? 'Tutup menu' : 'Menu utama'}
      </button>
      <nav id="site-navigation" className={mobileOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Navigasi utama">
        <ul className="nav-list">{navigation.map((item) => <li key={item.id}><NavItem item={item} /></li>)}</ul>
      </nav>
      <button className="search-button" type="button" disabled aria-label="Pencarian situs belum tersedia" title="Pencarian situs belum tersedia"><Icon name="search" /></button>
    </div>
  </div>;
}
