import Icon from '../../../components/ui/Icon.jsx';
import SectionHeading from '../../../components/ui/SectionHeading.jsx';

export default function AgendaPreview({ agenda }) {
  return <section className="section" id="agenda" aria-labelledby="agenda-title"><div className="container">
    <SectionHeading eyebrow="RUANG TEMU & BELAJAR" title="Agenda & Kegiatan Mendatang" id="agenda-title"><span className="section-note">Contoh agenda · bukan jadwal resmi</span></SectionHeading>
    <div className="agenda-grid">{agenda.map((item, index) => <article className="agenda-card" key={item.id}>
      <div className={`agenda-art theme-${item.theme}`} aria-hidden="true"><span className="art-number">0{index + 1}</span><Icon name="book" /><span>{item.category}</span></div>
      <div className="agenda-body"><span className="small-label">{item.category}</span><h3>{item.title}</h3><p><Icon name="clock" />Jadwal belum ditetapkan</p><p><Icon name="location" />Lokasi belum ditetapkan</p><span className="card-status">Konten demonstrasi</span></div>
    </article>)}</div>
  </div></section>;
}
