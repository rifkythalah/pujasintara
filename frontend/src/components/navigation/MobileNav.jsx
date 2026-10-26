import { useEffect, useRef } from 'react';
import { navigation } from '../../config/navigation.js';
import SiteLogo from '../layout/SiteLogo.jsx';
import LanguageSelector from '../layout/LanguageSelector.jsx';
import Icon from '../ui/Icon.jsx';
import NavItem from './NavItem.jsx';

export default function MobileNav({ open, onClose, locale, onLocaleChange, currentPath, openPath, onToggle, onCloseGroup }) {
  const dialog = useRef(null);
  const closeButton = useRef(null);

  useEffect(() => {
    const element = dialog.current;
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    closeButton.current.focus({ preventScroll: true });
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return <dialog ref={dialog} id="mobile-navigation" className="mobile-drawer" aria-label="Menu utama"
    onKeyDown={(event) => {
      if (event.key !== 'Tab') return;
      const controls = [...dialog.current.querySelectorAll('a[href], button:not(:disabled)')].filter((element) => element.getClientRects().length);
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }}
    onCancel={(event) => { event.preventDefault(); onClose(); }}
    onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="drawer-content">
      <div className="drawer-header">
        <div onClick={onClose}><SiteLogo /></div>
        <button ref={closeButton} type="button" className="drawer-close" onClick={onClose} aria-label="Tutup menu"><Icon name="close" /></button>
      </div>
      <nav className="drawer-navigation" aria-label="Navigasi seluler">
        <ul className="nav-list">{navigation.map((item) => <li key={item.id} data-nav-id={item.id}>
          <NavItem item={item} currentPath={currentPath} openPath={openPath} onNavigate={onClose}
            onToggle={onToggle} onClose={onCloseGroup} onOpen={() => {}} />
        </li>)}</ul>
      </nav>
      <div className="drawer-languages"><LanguageSelector locale={locale} onLocaleChange={onLocaleChange} /></div>
    </div>
  </dialog>;
}
