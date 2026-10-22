import { useId, useLayoutEffect, useRef } from 'react';
import { NavLink } from 'react-router';
import { getRoute, isNavigationActive } from '../../config/routes.js';
import Icon from '../ui/Icon.jsx';

function NavGroup({ item, depth, openPath, onToggle, onClose, ...linkProps }) {
  const open = openPath[depth] === item.id;
  const trigger = useRef(null);
  const panel = useRef(null);
  const panelId = useId();
  const triggerId = useId();

  // Root panels scroll within the viewport; nested groups stay in normal flow.
  useLayoutEffect(() => {
    if (!open || depth !== 0) return;
    const fitPanel = () => {
      const available = window.innerHeight - panel.current.getBoundingClientRect().top - 16;
      panel.current.style.setProperty('--panel-height', `${Math.max(0, available)}px`);
    };
    fitPanel();
    window.addEventListener('resize', fitPanel);
    window.addEventListener('scroll', fitPanel, { passive: true });
    return () => {
      window.removeEventListener('resize', fitPanel);
      window.removeEventListener('scroll', fitPanel);
    };
  }, [open, depth]);

  // Sibling groups close on activation. Closing during pointer focus could
  // move an accordion button before its click fires; Navbar handles focus exit.
  return <div className="nav-group" data-route-active={isNavigationActive(item, linkProps.currentPath) || undefined}
    onKeyDown={(event) => {
      if (event.key === 'Escape' && open) {
        event.preventDefault();
        event.stopPropagation();
        onClose(depth);
        trigger.current?.focus();
      }
    }}>
    <div className={item.routeId ? 'nav-group-heading has-page' : 'nav-group-heading'}>
      {item.routeId && <NavLink className="nav-link" end to={getRoute(item.routeId).path} onClick={linkProps.onNavigate}>{item.label}</NavLink>}
      <button ref={trigger} id={triggerId} className="nav-trigger" type="button"
        aria-label={item.routeId ? `Submenu ${item.label}` : undefined}
        aria-expanded={open} aria-controls={panelId} onClick={() => onToggle(item.id, depth)}>
        {!item.routeId && item.label}<span aria-hidden="true" className="nav-plus">{open ? '−' : '+'}</span>
      </button>
    </div>
    <div ref={panel} className="nav-panel" id={panelId} hidden={!open} aria-labelledby={triggerId}>
      {open && (item.children === null
        ? <p className="nav-note">Rincian submenu belum tersedia.</p>
        : <>
          {item.children.some((child) => child.status === 'pending') &&
            <p className="nav-note">Tujuan menu belum dikonfirmasi.</p>}
          <ul>{item.children.map((child) => <li key={child.id}>
            <NavItem item={child} depth={depth + 1} openPath={openPath}
              onToggle={onToggle} onClose={onClose} {...linkProps} />
          </li>)}</ul>
        </>)}
    </div>
  </div>;
}

/**
 * @param {{item: import('../../config/navigation.js').NavItem, depth?: number,
 * openPath: string[], currentPath: string, onToggle: Function,
 * onClose: Function, onNavigate: Function}} props
 */
export default function NavItem({ item, depth = 0, currentPath, onNavigate, ...groupProps }) {
  if (item.status === 'pending') {
    return <span className="nav-pending" aria-disabled="true" title="Tujuan menu belum dikonfirmasi">
      {item.label}<span className="sr-only"> — belum aktif</span>
    </span>;
  }
  if (item.kind === 'group') {
    return <NavGroup item={item} depth={depth} currentPath={currentPath} onNavigate={onNavigate} {...groupProps} />;
  }
  if (item.kind === 'external') {
    return <a className="nav-link" href={item.href} onClick={onNavigate}>{item.label}<Icon name="arrow" /></a>;
  }
  return <NavLink className="nav-link" end to={getRoute(item.routeId).path} onClick={onNavigate}>{item.label}</NavLink>;
}
