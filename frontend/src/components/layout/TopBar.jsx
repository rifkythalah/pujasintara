import { Link } from 'react-router';
import { getRoute } from '../../config/routes.js';
import Icon from '../ui/Icon.jsx';

export default function TopBar() {
  return <header className="topbar" id="atas">
    <div className="container topbar-content">
      <Link className="brand" to={getRoute('home').path} aria-label="Pujasintara — Beranda">
        <span className="brand-symbol"><Icon name="book" /></span>
        <span><strong>PUJASINTARA</strong><small>Perpustakaan Nasional Republik Indonesia</small></span>
      </Link>
      <div className="topbar-note"><Icon name="clock" /><span>Ruang pengetahuan untuk semua<small>Informasi jam layanan akan dilengkapi</small></span></div>
      <span className="language-label">Bahasa Indonesia</span>
    </div>
  </header>;
}
