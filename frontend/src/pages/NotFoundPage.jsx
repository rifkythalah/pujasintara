import { Link } from 'react-router';
import PageHeader from '../components/ui/PageHeader.jsx';
import { getRoute } from '../config/routes.js';

export default function NotFoundPage() {
  return <>
    <PageHeader category="404" title="Halaman tidak ditemukan" description="Alamat yang Anda buka tidak tersedia. Periksa kembali alamat atau lanjutkan melalui navigasi utama." breadcrumbs={[{ label: 'Beranda', to: getRoute('home').path }, { label: 'Halaman tidak ditemukan' }]} />
    <div className="container not-found-content"><Link className="button button-green" to={getRoute('home').path}>Kembali ke Beranda</Link><Link className="page-text-link" to={getRoute('bantuan').path}>Buka Bantuan</Link></div>
  </>;
}
