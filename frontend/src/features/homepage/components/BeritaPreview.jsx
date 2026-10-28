import { Link } from 'react-router';
import '../berita-preview.css';

/**
 * @typedef {Object} NewsItem
 * @property {string} id
 * @property {string} title
 * @property {string} [author]
 * @property {string} [date]
 * @property {string} [excerpt]
 * @property {string} [image]
 * @property {string} [alt]
 * @property {string} [href]
 */

/**
 * Komponen Pratinjau Berita Terkini & Kabar Literasi Nusantara di Halaman Utama.
 * Menampilkan 1 berita utama (featured) di kolom kiri dan 2 berita pendukung di kolom kanan.
 *
 * @param {{ news?: NewsItem[] }} props
 */
export default function BeritaPreview({ news }) {
  const items = news && news.length > 0 ? news : [];
  const featuredItem = items[0];
  const secondaryItems = items.slice(1);

  return (
    <section className="section berita-section" id="berita" aria-labelledby="berita-title">
      <div className="container">
        {/* Header Section: Eyebrow + Judul di Kiri, Tombol CTA Hijau di Kanan */}
        <header className="berita-header">
          <div className="berita-header-text">
            <p className="berita-eyebrow">Kabar Literasi Nusantara</p>
            <h2 id="berita-title" className="berita-title">
              Berita Terkini
            </h2>
          </div>
          <Link to="/aktivitas/berita" className="berita-header-cta">
            Lihat Berita Literasi Lainnya
          </Link>
        </header>

        {/* Grid Layout: Berita Utama di Kiri & 2 Berita Stacked di Kanan */}
        <div className="berita-main-grid">
          {/* Kolom Kiri: Berita Utama */}
          {featuredItem && (
            <article className="berita-featured-card">
              <div className="berita-featured-media">
                <img
                  src={featuredItem.image || '/assets/berita-siniar-literasi.png'}
                  alt={featuredItem.alt || featuredItem.title}
                  className="berita-featured-img"
                  loading="lazy"
                />
              </div>

              <h3 className="berita-featured-title">
                {featuredItem.title}
              </h3>

              <div className="berita-featured-meta">
                <span>{featuredItem.author || 'Dede Gumilar'}</span>
                <span> | </span>
                <span>{featuredItem.date || '30 Juli 2026'}</span>
              </div>

              <p className="berita-featured-excerpt">
                {featuredItem.excerpt}
              </p>

              <div className="berita-action-footer">
                <Link to={featuredItem.href || '/aktivitas/berita'} className="berita-detail-link">
                  <span className="circle-arrow-icon" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M7.5 10H12.5M12.5 10L9.5 7M12.5 10L9.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>Baca Selengkapnya</span>
                </Link>
              </div>
            </article>
          )}

          {/* Kolom Kanan: 2 Berita Tambahan Berjejer Vertikal */}
          <div className="berita-secondary-list">
            {secondaryItems.map((item) => (
              <article className="berita-item-row" key={item.id}>
                <div className="berita-item-media">
                  <img
                    src={item.image || '/assets/berita-cozy-corner.png'}
                    alt={item.alt || item.title}
                    className="berita-item-img"
                    loading="lazy"
                  />
                </div>

                <div className="berita-item-content">
                  <h3 className="berita-item-title">
                    {item.title}
                  </h3>

                  <div className="berita-item-meta">
                    <span>{item.author || 'Dede Gumilar'}</span>
                    <span> | </span>
                    <span>{item.date || '14 Juli 2026'}</span>
                  </div>

                  <p className="berita-item-excerpt">
                    {item.excerpt}
                  </p>

                  <div className="berita-action-footer">
                    <Link to={item.href || '/aktivitas/berita'} className="berita-detail-link">
                      <span className="circle-arrow-icon" aria-hidden="true">
                        <svg viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M7.5 10H12.5M12.5 10L9.5 7M12.5 10L9.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>Baca Selengkapnya</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
