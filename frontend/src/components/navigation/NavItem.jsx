import { useEffect, useRef, useState } from 'react';
import Icon from '../ui/Icon.jsx';

function NavGroup({ item }) {
  const [open, setOpen] = useState(false);
  const container = useRef(null);
  const trigger = useRef(null);
  const panelId = `submenu-${item.id}`;

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event) => {
      if (!container.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [open]);

  return <div className="nav-group" ref={container}
    onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
    onKeyDown={(event) => {
      if (event.key === 'Escape' && open) {
        event.stopPropagation();
        setOpen(false);
        trigger.current?.focus();
      }
    }}>
    <button ref={trigger} className="nav-trigger" type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(!open)}>
      {item.label}<span aria-hidden="true" className="nav-plus">{open ? '−' : '+'}</span>
    </button>
    {open && <div className="nav-panel" id={panelId}>
      {item.children ? <>
        <p className="nav-note">Pratinjau menu · tujuan belum aktif</p>
        <ul>{item.children.map((child) => <li key={child.id}><NavItem item={child} /></li>)}</ul>
      </> : <p className="nav-note">Rincian submenu belum tersedia.</p>}
    </div>}
  </div>;
}

export default function NavItem({ item }) {
  if (item.kind === 'group') return <NavGroup item={item} />;
  if (item.status === 'pending') return <span className="nav-pending" aria-disabled="true" title="Tujuan menu belum dikonfirmasi">{item.label}<span className="sr-only"> — belum aktif</span></span>;
  if (item.kind === 'external') return <a href={item.href}>{item.label}<Icon name="arrow" /></a>;
  return <a className="nav-link" href={item.to} aria-current={item.to === '/' ? 'page' : undefined}>{item.label}</a>;
}
