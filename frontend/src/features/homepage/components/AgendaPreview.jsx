import { useRef } from 'react';
import { Link } from 'react-router';
import '../agenda-preview.css';

/**
 * @typedef {Object} AgendaItem
 * @property {string} id
 * @property {string} title
 * @property {string} [date]
 * @property {string} [time]
 * @property {string} [location]
 * @property {string} [image]
 * @property {string} [alt]
 * @property {string} [href]
 */

/**
 * Komponen Pratinjau Agenda & Kegiatan Mendatang di Halaman Utama.
 * Menampilkan kartu kegiatan berbingkai bersih dengan logo instansi, badge tanggal,
 * thumbnail foto kegiatan, waktu, lokasi, dan tautan detail agenda.
 * Pada mode mobile, kartu dapat digulir horizontal dengan tombol navigasi kiri/kanan
 * dan tombol CTA "Lihat Agenda Lainnya" di tengah.
 *
 * @param {{ agenda?: AgendaItem[] }} props
 */
export default function AgendaPreview({ agenda }) {
  const items = agenda && agenda.length > 0 ? agenda : [];
  const scrollRef = useRef(null);

  /** Geser kartu ke kiri (prev) */
  const scrollPrev = () => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector('.agenda-card-item');
    const scrollDistance = card ? card.clientWidth + 16 : 280;
    el.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
  };

  /** Geser kartu ke kanan (next) */
  const scrollNext = () => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector('.agenda-card-item');
    const scrollDistance = card ? card.clientWidth + 16 : 280;
    el.scrollBy({ left: scrollDistance, behavior: 'smooth' });
  };

  return (
    <section className="section agenda-section" id="agenda" aria-labelledby="agenda-title">
      <div className="container">
        {/* Header Section: Eyebrow + Judul di Kiri, CTA Kalender Lengkap di Kanan */}
        <header className="agenda-header">
          <div className="agenda-header-text">
            <p className="agenda-eyebrow">Kalender Kegiatan</p>
            <h2 id="agenda-title" className="agenda-title">
              Agenda &amp; Kegiatan Mendatang
            </h2>
          </div>
        </header>

        {/* Grid Kartu Agenda (4 Kolom di Desktop, Scrollable Horizontal di Mobile) */}
        <div
          className="agenda-cards-grid"
          ref={scrollRef}
          role="region"
          aria-label="Daftar Kartu Agenda Kegiatan"
        >
          {items.map((item) => (
            <article className="agenda-card-item" key={item.id}>
              {/* Atas Card: Logo Bintang Perpusnas di Kiri + Badge Tanggal di Kanan */}
              <div className="agenda-card-top">
                <img
                  src="/assets/logo-bintang-perpusnas.png"
                  alt="Logo Bintang Perpustakaan Nasional RI"
                  className="agenda-card-brand"
                />
                <span className="agenda-card-date-badge">
                  {item.date || '30 Sep 2026'}
                </span>
              </div>

              {/* Foto / Poster Kegiatan */}
              <div className="agenda-card-media">
                <img
                  src={item.image || '/assets/radio-perpusnas.png'}
                  alt={item.alt || item.title}
                  className="agenda-card-img"
                  loading="lazy"
                />
              </div>

              {/* Judul Kegiatan */}
              <h3 className="agenda-card-heading">{item.title}</h3>

              {/* Meta Informasi: Waktu & Lokasi */}
              <div className="agenda-card-meta">
                <div className="agenda-meta-item">
                  <svg
                    className="agenda-meta-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{item.time || '09.15 - 13.00 WIB · Terbuka Untuk Umum'}</span>
                </div>
                <div className="agenda-meta-item">
                  <svg
                    className="agenda-meta-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{item.location || 'Lantai 4 Perpustakaan Nasional RI'}</span>
                </div>
              </div>

              {/* Footer Card: Action Link Rata Kanan */}
              <div className="agenda-card-footer">
                <Link to={item.href || '/aktivitas/agenda'} className="agenda-detail-link">
                  <span className="circle-arrow-icon" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
                      <path
                        d="M7.5 10H12.5M12.5 10L9.5 7M12.5 10L9.5 13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>Lihat Detail Agenda</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Kontrol Navigasi Mobile: ← | Lihat Agenda Lainnya | → */}
        <div className="agenda-mobile-nav" aria-label="Navigasi geser kartu agenda">
          <button
            type="button"
            className="agenda-circle-btn"
            onClick={scrollPrev}
            aria-label="Geser ke agenda sebelumnya"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <Link to="/aktivitas/agenda" className="agenda-mobile-cta">
            Lihat Agenda Lainnya
          </Link>

          <button
            type="button"
            className="agenda-circle-btn"
            onClick={scrollNext}
            aria-label="Geser ke agenda berikutnya"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
