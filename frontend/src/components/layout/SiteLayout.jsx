import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import RouteAccessibility from '../../app/RouteAccessibility.jsx';
import TopBar from './TopBar.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function SiteLayout() {
  const location = useLocation();
  return <>
    <a className="skip-link" href="#konten-utama">Lewati navigasi</a>
    <div className="preview-notice"><span>PRATINJAU</span> Konten dummy untuk pengembangan. Informasi di halaman ini bukan pengumuman resmi.</div>
    <TopBar /><Navbar key={location.key} />
    <main id="konten-utama" tabIndex={-1}><Outlet /></main>
    <Footer />
    <ScrollRestoration />
    <RouteAccessibility />
  </>;
}
