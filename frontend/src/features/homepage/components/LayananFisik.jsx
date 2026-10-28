import { useState, useEffect } from 'react';
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
  {
    id: 'layanan-koleksi-anak',
    title: 'Layanan Koleksi Anak',
    image: '/assets/layanan-koleksi-anak.png',
    alt: 'Fasilitas Layanan Koleksi Anak Perpustakaan Nasional RI',
    href: '/layanan/fasilitas',
  },
  {
    id: 'layanan-multimedia',
    title: 'Layanan Multimedia',
    image: '/assets/layanan-multimedia.png',
    alt: 'Fasilitas Layanan Multimedia Perpustakaan Nasional RI',
    href: '/layanan/fasilitas',
  },
  {
    id: 'layanan-monograf-terbuka',
    title: 'Layanan Monograf Terbuka',
    image: '/assets/layanan-monograf terbuka.png',
    alt: 'Fasilitas Layanan Monograf Terbuka Perpustakaan Nasional RI',
    href: '/layanan/fasilitas',
  },
  {
    id: 'layanan-lainnya',
    title: 'Lihat Selengkapnya Untuk 20 Layanan Lainnya',
    image: '/assets/layanan-lainnya.png',
    alt: 'Lihat Selengkapnya Untuk 20 Layanan Fasilitas Perpustakaan Nasional RI Lainnya',
    href: '/layanan/informasi-layanan',
  },
];

/**
 * Komponen Fasilitas Layanan Onsite Terpadu (Layanan Fisik & Ruang Baca Terpadu).
 * Menampilkan carousel banner wide beresolusi tinggi dengan efek hover fade-black,
 * judul layanan di tengah gambar tanpa animasi teks show-up, autoplay 3 detik,
 * tombol panah navigasi, dan indikator dash.
 *
 * @param {{ services?: OnsiteService[] }} props
 */
export default function LayananFisik({ services }) {
  const list = services && services.length > 0 ? services : defaultServices;
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState(null);
  const [direction, setDirection] = useState('forward');
  const [isPaused, setIsPaused] = useState(false);

  // Autoplay gulir otomatis setiap 3 detik jika tidak ada interaksi (hover / focus)
  useEffect(() => {
    if (isPaused || list.length <= 1) return;

    const intervalTimer = setInterval(() => {
      setDirection('forward');
      setPrevious(index);
      setIndex((prev) => (prev + 1) % list.length);
    }, 3000);

    return () => clearInterval(intervalTimer);
  }, [isPaused, index, list.length]);

  const handlePrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDirection('backward');
    setPrevious(index);
    setIndex((prev) => (prev - 1 + list.length) % list.length);
  };

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDirection('forward');
    setPrevious(index);
    setIndex((prev) => (prev + 1) % list.length);
  };

  const handleIndicatorClick = (e, targetIndex) => {
    e.preventDefault();
    e.stopPropagation();
    if (targetIndex === index) return;
    setDirection(targetIndex > index ? 'forward' : 'backward');
    setPrevious(index);
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
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setIsPaused(false);
            }
          }}
        >
          {/* Container Slides dengan Transisi Slide In ke Kiri seperti Section Hero */}
          <div className={`onsite-slides-wrapper direction-${direction}`}>
            {list.map((item, pos) => {
              const isCurrent = pos === index;
              const isPrev = pos === previous;

              if (!isCurrent && !isPrev) {
                return null;
              }

              return (
                <div
                  key={item.id}
                  className={`onsite-slide ${isCurrent ? 'is-current' : ''} ${isPrev ? 'is-previous' : ''}`}
                  aria-hidden={!isCurrent}
                >
                  <Link
                    to={item.href || '/layanan/fasilitas'}
                    className="onsite-slide-link"
                    aria-label={`Buka informasi fasilitas: ${item.title}`}
                    tabIndex={isCurrent ? 0 : -1}
                  >
                    <div className="onsite-slide-viewport">
                      {/* Gambar Banner Utama */}
                      <img
                        src={item.image}
                        alt={item.alt || item.title}
                        className="onsite-banner-img"
                      />

                      {/* Overlay Fade Black saat Hover + Judul di Tengah (Statis tanpa animasi teks mandiri) */}
                      <div className="onsite-hover-overlay" aria-hidden="true">
                        <h3 className="onsite-banner-title">{item.title}</h3>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

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
