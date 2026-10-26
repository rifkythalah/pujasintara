import { useState } from 'react';
import { Link } from 'react-router';
import '../layanan-fisik.css';

/**
 * @typedef {Object} OnsiteService
 * @property {string} id
 * @property {string} title
 * @property {string} image
 * @property {string} [alt]
 * @property {string} [href]
 */

const defaultServices = [
  {
    id: 'layanan-keanggotaan',
    title: 'Layanan Keanggotaan',
    image: '/assets/layanan-keanggotaan.png',
    alt: 'Fasilitas Layanan Keanggotaan di Gedung Perpustakaan Nasional RI',
    href: '/layanan/fasilitas',
  },
];

/**
 * Komponen Fasilitas Layanan Onsite Terpadu (Layanan Fisik & Ruang Baca Terpadu).
 * Menampilkan carousel banner wide beresolusi tinggi dengan efek hover fade-black,
 * highlight judul layanan di tengah gambar, tombol panah navigasi, dan indikator dash.
 *
 * @param {{ services?: OnsiteService[] }} props
 */
export default function LayananFisik({ services }) {
  const list = services && services.length > 0 ? services : defaultServices;
  const [index, setIndex] = useState(0);

  const current = list[index];

  const handlePrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + list.length) % list.length);
  };

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % list.length);
  };

  const handleIndicatorClick = (e, targetIndex) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex(targetIndex);
  };

  return (
    <section className="section physical-section" id="layanan-fisik" aria-labelledby="physical-title">
      <div className="container">
        {/* Header Section Rata Tengah */}
        <header className="physical-header">
          <p className="physical-eyebrow">Fasilitas Onsite di Gedung Layanan Perpustakaan Nasional RI</p>
          <h2 id="physical-title" className="physical-title">
            Layanan Fisik & Ruang Baca Terpadu
          </h2>
        </header>

        {/* Banner Carousel Gambar Lebar (Wide) dengan Efek Hover Fade Black */}
        <div
          className="onsite-carousel-container"
          role="region"
          aria-roledescription="carousel"
          aria-label="Fasilitas Layanan Onsite Perpustakaan Nasional RI"
        >
          <Link
            to={current.href || '/layanan/fasilitas'}
            className="onsite-slide-link"
            aria-label={`Buka informasi fasilitas: ${current.title}`}
          >
            <div className="onsite-slide-active" key={current.id}>
              {/* Gambar Banner Utama */}
              <img
                src={current.image}
                alt={current.alt || current.title}
                className="onsite-banner-img"
              />

              {/* Overlay Fade Black saat Hover + Judul di Tengah */}
              <div className="onsite-hover-overlay" aria-hidden="true">
                <h3 className="onsite-banner-title">{current.title}</h3>
              </div>
            </div>
          </Link>

          {/* Tombol Panah Kiri (Chevron Left) */}
          <button
            type="button"
            className="onsite-arrow-btn onsite-arrow-prev"
            onClick={handlePrev}
            aria-label="Fasilitas layanan sebelumnya"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Tombol Panah Kanan (Chevron Right) */}
          <button
            type="button"
            className="onsite-arrow-btn onsite-arrow-next"
            onClick={handleNext}
            aria-label="Fasilitas layanan berikutnya"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Indikator Garis Bawah Horizontal */}
          {list.length > 1 && (
            <div className="onsite-indicators" role="tablist" aria-label="Pilih fasilitas layanan">
              {list.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  className={`onsite-indicator-btn ${idx === index ? 'is-active' : ''}`}
                  onClick={(e) => handleIndicatorClick(e, idx)}
                  aria-label={`Pilih fasilitas: ${item.title}`}
                  aria-selected={idx === index}
                  role="tab"
                >
                  <span className="onsite-indicator-dash" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
