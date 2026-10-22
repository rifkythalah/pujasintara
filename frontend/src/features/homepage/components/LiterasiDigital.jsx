import SectionHeading from '../../../components/ui/SectionHeading.jsx';

export default function LiterasiDigital({ services }) {
  return <section className="section digital-section" id="literasi-digital" aria-labelledby="digital-title"><div className="container">
    <SectionHeading eyebrow="AKSES PENGETAHUAN" title="Layanan Literasi Digital" id="digital-title" />
    <p className="digital-description">Pratinjau daftar layanan dari spesifikasi proyek. Logo dan tautan resmi akan dilengkapi.</p>
    <ul className="digital-list">{services.map((service) => <li key={service}><span>{service}</span><small>Tautan belum aktif</small></li>)}</ul>
  </div></section>;
}
