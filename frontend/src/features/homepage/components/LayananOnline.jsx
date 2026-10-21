import { useState } from 'react';
import Icon from '../../../components/ui/Icon.jsx';

export default function LayananOnline({ services }) {
  const [index, setIndex] = useState(0);
  const slide = services[index];
  const next = services[(index + 1) % services.length];
  const navigate = (direction) => setIndex((value) => (value + direction + services.length) % services.length);

  return <section className="section online-section" id="layanan-online" aria-labelledby="online-title">
    <div className="container online-grid">
      <div className="online-copy">
        <p className="eyebrow">INOVASI LAYANAN PUBLIK</p><h2 id="online-title">Layanan Online<br />Pujasintara</h2>
        <div className="online-card" aria-live="polite" aria-atomic="true"><span className="small-label">{slide.category} · contoh</span><h3>{slide.title}</h3><p>{slide.description}</p><span className="text-note">Tautan layanan belum diaktifkan</span></div>
        <div className="carousel-controls"><span className="slide-number">{String(index + 1).padStart(2, '0')} <span>/ {String(services.length).padStart(2, '0')}</span></span><button type="button" className="round-button previous" aria-label="Layanan sebelumnya" onClick={() => navigate(-1)}><Icon name="arrow" /></button><button type="button" className="round-button" aria-label="Layanan berikutnya" onClick={() => navigate(1)}><Icon name="arrow" /></button></div>
        <div className="ask-bar"><Icon name="chat" /><span>Butuh informasi referensi koleksi?<strong>Tanya Pustakawan</strong></span><span className="ask-status">Kanal belum aktif</span></div>
      </div>
      <div className="carousel" role="region" aria-roledescription="carousel" aria-label="Pratinjau layanan online">
        <div className={`service-cover theme-${slide.theme}`} role="group" aria-roledescription="slide" aria-label={`${index + 1} dari ${services.length}: ${slide.title}`}>
          <div className="cover-top"><Icon name="book" /><span>PUJASINTARA<br /><small>CONTOH MATERI LAYANAN</small></span></div>
          <div className="cover-copy"><span>{slide.eyebrow}</span><p>{slide.cover}</p></div>
          <div className="book-art" aria-hidden="true"><i /><i /><i /><i /></div>
          <span className="cover-bottom">Buka halaman baru dalam perjalananmu.</span>
        </div>
        <div className={`carousel-peek theme-${next.theme}`} aria-hidden="true"><span>{next.cover}</span></div>
        <div className="carousel-dots" aria-label="Pilih layanan">{services.map((item, itemIndex) => <button key={item.id} type="button" aria-label={`Tampilkan layanan ${itemIndex + 1}: ${item.title}`} aria-pressed={index === itemIndex} onClick={() => setIndex(itemIndex)}><span /></button>)}</div>
      </div>
    </div>
  </section>;
}
