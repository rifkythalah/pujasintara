import { Link } from 'react-router';
import PageHeader from '../components/ui/PageHeader.jsx';
import Icon from '../components/ui/Icon.jsx';
import { routes, getRoute } from '../config/routes.js';

export default function PlannedPage({ page }) {
  const related = page.groupId ? routes.filter((other) => other.groupId === page.groupId && other.id !== page.id) : [];

  return <>
    <PageHeader title={page.title} category={page.category} description={page.summary} breadcrumbs={page.breadcrumbs} />
    <div className="container inner-page-grid">
      <section className="page-card planned-content" aria-labelledby="planned-title">
        <span className="page-status">Pratinjau halaman · konten belum tersedia</span>
        <h2 id="planned-title">Informasi sedang disiapkan</h2>
        <p>Halaman {page.title} sudah dapat dijelajahi. Materi resmi dan tampilan lengkap akan ditambahkan setelah tersedia.</p>
        {page.topics ? <>
          <h3>Rencana isi halaman</h3>
          <p className="page-note">Berikut gambaran materi untuk halaman ini, bukan informasi layanan yang sudah berlaku.</p>
          <ul className="planned-topics">{page.topics.map((topic) => <li key={topic}><Icon name="book" /><span>{topic}<small>Menunggu materi terverifikasi</small></span></li>)}</ul>
        </> : <div className="page-empty"><Icon name="book" /><div><h3>Rincian belum tersedia</h3><p>Daftar pilihan {page.title.toLowerCase()} akan dilengkapi setelah informasinya tersedia.</p></div></div>}
        <div className="page-actions"><Link className="button button-green" to={getRoute('home').path}>Kembali ke Beranda<Icon name="arrow" /></Link><Link className="page-text-link" to={getRoute('bantuan').path}>Buka Bantuan</Link></div>
      </section>
      <aside className="page-sidebar" aria-label="Navigasi terkait">
        {related.length > 0 && <section className="page-card"><h2>Jelajahi {page.category}</h2><ul className="related-links">{related.map((other) => <li key={other.id}><Link to={other.path}>{other.title}<Icon name="arrow" /></Link></li>)}</ul></section>}
        <section className="page-card page-info"><Icon name="chat" /><h2>Tentang pratinjau ini</h2><p>Halaman ini membantu Anda meninjau susunan informasi Pujasintara. Konten sementara tidak menggantikan informasi resmi Perpustakaan Nasional RI.</p></section>
      </aside>
    </div>
  </>;
}
