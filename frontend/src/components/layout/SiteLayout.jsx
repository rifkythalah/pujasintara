import { useState } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import RouteAccessibility from '../../app/RouteAccessibility.jsx';
import TopBar from './TopBar.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function SiteLayout() {
  const location = useLocation();
  const [locale, setLocale] = useState('id');
  return <>
    <a className="skip-link" href="#konten-utama">Lewati navigasi</a>
    <TopBar locale={locale} onLocaleChange={setLocale} /><Navbar key={location.key} locale={locale} onLocaleChange={setLocale} />
    <main id="konten-utama" tabIndex={-1}><Outlet /></main>
    <Footer />
    <ScrollRestoration />
    <RouteAccessibility />
  </>;
}
