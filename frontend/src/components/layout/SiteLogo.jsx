import { Link } from 'react-router';
import { getRoute } from '../../config/routes.js';

export default function SiteLogo({ className = '' }) {
  return <Link className={`brand ${className}`} to={getRoute('home').path} aria-label="Pujasintara — Beranda">
    <img className="brand-logo" src="/assets/Logo-Pujasintara-Black.png" width="2172" height="724" alt="Pusat Jasa Informasi Perpustakaan dan Pengelolaan Naskah Nusantara — Perpustakaan Nasional Republik Indonesia" />
  </Link>;
}
