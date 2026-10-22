import Icon from '../../../components/ui/Icon.jsx';
import SectionHeading from '../../../components/ui/SectionHeading.jsx';

export default function BeritaPreview({ news }) {
  return <section className="section news-section" id="berita" aria-labelledby="news-title"><div className="container">
    <SectionHeading eyebrow="CERITA DARI PERPUSTAKAAN" title="Berita Terkini" id="news-title"><span className="section-note">Pratinjau tata letak editorial</span></SectionHeading>
    <div className="news-grid">{news.map((item, index) => <article className={index === 0 ? 'news-card featured-news' : 'news-card'} key={item.id}>
      <div className={`news-art theme-${item.theme}`} aria-hidden="true"><Icon name="book" /><span>{index === 0 ? 'Pengetahuan\nuntuk semua.' : item.category}</span></div>
      <div className="news-body"><span className="small-label">{item.category} <span> / DUMMY</span></span><h3>{item.title}</h3><p>{item.excerpt}</p><span className="text-note">Artikel lengkap belum tersedia</span></div>
    </article>)}</div>
  </div></section>;
}
