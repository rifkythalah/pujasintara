import { Link } from 'react-router';
import PageHeader from '../../components/ui/PageHeader.jsx';
import Icon from '../../components/ui/Icon.jsx';
import { getRoute } from '../../config/routes.js';
import { previewFaq } from '../../features/bantuan/data/faq.js';

export default function HelpPage({ page }) {
  return <>
    <PageHeader title={page.title} category="Panduan pengunjung" description={page.summary} breadcrumbs={page.breadcrumbs} />
    <div className="container inner-page-grid">
      <section className="page-card help-faq" id="faq" aria-labelledby="faq-title">
        <span className="page-status">FAQ pratinjau · bukan ketentuan layanan resmi</span>
        <h2 id="faq-title">Pertanyaan yang sering muncul</h2>
        <p>Jawaban berikut membantu Anda menggunakan pratinjau website. FAQ layanan Perpusnas akan dilengkapi setelah materi resmi tersedia.</p>
        {previewFaq.map((faq) => <details key={faq.id}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}
      </section>
      <aside className="page-sidebar" aria-label="Bantuan navigasi"><section className="page-card page-info"><Icon name="book" /><h2>Mulai menjelajah</h2><p>Temukan halaman yang Anda butuhkan melalui menu utama. Halaman yang belum memiliki materi resmi ditandai dengan jelas.</p><Link className="page-text-link" to={getRoute('home').path}>Kembali ke Beranda →</Link></section><section className="page-card"><h2>Informasi kontak</h2><p>Informasi kontak akan dilengkapi setelah diverifikasi.</p><Link className="page-text-link" to={getRoute('kontak').path}>Buka halaman Kontak Kami →</Link></section></aside>
    </div>
  </>;
}
