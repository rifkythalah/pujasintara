import { useState, useRef } from 'react';
import { Link } from 'react-router';
import '../layanan-online.css';

/**
 * @typedef {Object} ServiceAction
 * @property {string} label
 * @property {string} [href]
 * @property {string} [streamUrl]
 * @property {boolean} [isExternal]
 * @property {boolean} [isAudio]
 */

/**
 * @typedef {Object} OnlineServiceItem
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {ServiceAction[]} actions
 * @property {string} thumbnail
 * @property {string} heroImage
 * @property {string} [alt]
 */

/**
 * Komponen Inovasi Layanan Publik / Layanan Online Pujasintara.
 * Menampilkan carousel informasi layanan daring dengan bleed ganda (kiri & kanan),
 * audio streaming player terintegrasi dengan pengatur volume dinamis & minimize button,
 * teks informasi yang sejajar rata kiri dengan judul, dan animasi transisi yang mulus.
 *
 * @param {{ services: OnlineServiceItem[] }} props
 */
export default function LayananOnline({ services }) {
  const [index, setIndex] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioPlayerOpen, setAudioPlayerOpen] = useState(false);
  const [volumeOpen, setVolumeOpen] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const audioRef = useRef(null);

  if (!services || services.length === 0) {
    return null;
  }

  const current = services[index];
  const nextIndex = (index + 1) % services.length;
  const next = services[nextIndex];

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % services.length);
  };

  // Trigger klik button Radio Streaming di actions
  const handleRadioClick = (e, streamUrl) => {
    e.preventDefault();
    if (audioPlayerOpen) {
      // Jika player sudah terbuka, klik tombol Radio Streaming akan me-minimize/hide player
      // namun audio tetap berjalan di latar belakang!
      setAudioPlayerOpen(false);
    } else {
      // Jika player tertutup, buka player dan pastikan radio menyala
      setAudioPlayerOpen(true);
      if (audioRef.current) {
        if (audioRef.current.src !== streamUrl) {
          audioRef.current.src = streamUrl;
        }
        if (!audioPlaying) {
          audioRef.current
            .play()
            .then(() => setAudioPlaying(true))
            .catch(() => setAudioPlaying(false));
        }
      }
    }
  };

  // Toggle play/pause dari button di dalam mini player bar
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (audioPlaying) {
      audioRef.current.pause();
      setAudioPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setAudioPlaying(true))
        .catch(() => setAudioPlaying(false));
    }
  };

  // Ubah volume audio
  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  // Toggle volume slider
  const toggleVolume = () => {
    setVolumeOpen((prev) => !prev);
  };

  // Bar audio hanya tampil di card informasi layanan radio
  const isRadioSlide = current.id === 'radio-wbs';

  return (
    <section className="section online-section" id="layanan-online" aria-labelledby="online-title">
      {/* Hidden audio element untuk radio streaming loop di latar belakang */}
      <audio
        ref={audioRef}
        loop
        preload="none"
        onPlay={() => setAudioPlaying(true)}
        onPause={() => setAudioPlaying(false)}
      />

      <div className="container online-section-container">
        {/* Kolom Kiri: Header + Card Informasi Bleed Kiri + Navigasi + Bar Tanya Pustakawan */}
        <div className="online-left-column">
          <header className="online-header">
            <p className="online-eyebrow">Inovasi Layanan Publik</p>
            <h2 id="online-title" className="online-main-title">
              Layanan Online<br />Pujasintara
            </h2>
          </header>

          {/* Card Informasi Putih (Distretch panjang, sejajar rata kiri dengan judul) */}
          <article className="online-info-card" aria-live="polite" aria-atomic="true">
            <div className="info-card-content" key={current.id}>
              <h3 className="info-card-title">{current.title}</h3>
              <p className="info-card-desc">{current.description}</p>

              <div className="info-card-actions">
                {current.actions?.map((act, actIndex) => {
                  if (act.isAudio) {
                    return (
                      <button
                        key={actIndex}
                        type="button"
                        onClick={(e) => handleRadioClick(e, act.streamUrl)}
                        className={`info-action-link ${audioPlayerOpen ? 'is-active-player' : ''}`}
                        aria-label={audioPlayerOpen ? 'Sembunyikan player radio streaming' : 'Buka player radio streaming'}
                        title={audioPlayerOpen ? 'Klik untuk menyembunyikan player (radio tetap menyala)' : 'Klik untuk memutar radio streaming'}
                      >
                        <span className="circle-arrow-icon" aria-hidden="true">
                          {audioPlayerOpen ? (
                            /* Icon minimize saat player terbuka */
                            <svg viewBox="0 0 20 20" fill="none">
                              <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
                              <path d="M6 10H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                          ) : (
                            /* Icon circle arrow awal */
                            <svg viewBox="0 0 20 20" fill="none">
                              <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
                              <path d="M7.5 10H12.5M12.5 10L9.5 7M12.5 10L9.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                        <span>{act.label}</span>
                      </button>
                    );
                  }

                  return act.isExternal ? (
                    <a
                      key={actIndex}
                      href={act.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="info-action-link"
                    >
                      <span className="circle-arrow-icon" aria-hidden="true">
                        <svg viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M7.5 10H12.5M12.5 10L9.5 7M12.5 10L9.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>{act.label}</span>
                    </a>
                  ) : (
                    <Link
                      key={actIndex}
                      to={act.href}
                      className="info-action-link"
                    >
                      <span className="circle-arrow-icon" aria-hidden="true">
                        <svg viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M7.5 10H12.5M12.5 10L9.5 7M12.5 10L9.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>{act.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Audio Player Bar: HANYA tampil di card informasi layanan radio ketika dibuka */}
              {isRadioSlide && audioPlayerOpen && (
                <div className={`radio-mini-player ${volumeOpen ? 'has-volume-open' : ''}`} aria-label="Pemutar Radio Streaming Perpusnas">
                  {/* Tombol Play / Pause */}
                  <button
                    type="button"
                    className="player-play-btn"
                    onClick={togglePlayPause}
                    aria-label={audioPlaying ? 'Jeda Radio' : 'Putar Radio'}
                  >
                    {audioPlaying ? (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="5" width="4" height="14" rx="1" />
                        <rect x="14" y="5" width="4" height="14" rx="1" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  {/* Dot merah berkedip untuk live streaming */}
                  <span className="live-dot" aria-label="Live streaming aktif" />

                  {/* Bar Durasi Play: Full warna, memendek otomatis saat volume slider dibuka */}
                  <div className="player-progress-bar">
                    <div className={`player-progress-fill ${audioPlaying ? 'is-live' : ''}`} />
                  </div>

                  {/* Pengatur Volume di samping kanan bar */}
                  <div className="player-volume-group">
                    {volumeOpen && (
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="player-volume-slider"
                        aria-label="Atur volume radio"
                      />
                    )}
                    <button
                      type="button"
                      className="player-volume-btn"
                      onClick={toggleVolume}
                      aria-label={volumeOpen ? 'Tutup pengatur volume' : 'Buka pengatur volume'}
                      title="Atur volume"
                    >
                      {volume === 0 ? (
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.828 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.828l3.555-2.784a1 1 0 011.000-.14zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.784L4.828 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.828l3.555-2.784a1 1 0 011.000-.14zM13.293 6.293a1 1 0 011.414 0 5 5 0 010 7.072 1 1 0 11-1.414-1.414 3 3 0 000-4.244 1 1 0 010-1.414z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Foto di Sisi Kanan Card Info (Animasi transisi gambar) */}
            <div className="info-card-thumb-wrapper" key={`thumb-${current.id}`}>
              <img
                src={current.thumbnail}
                alt={`Pratinjau ${current.title}`}
                className="info-card-thumb"
              />
            </div>
          </article>

          {/* Navigasi Bulat Prev / Next */}
          <div className="online-carousel-nav">
            <button
              type="button"
              className="carousel-circle-btn prev-btn"
              onClick={handlePrev}
              aria-label="Layanan sebelumnya"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              className="carousel-circle-btn next-btn"
              onClick={handleNext}
              aria-label="Layanan berikutnya"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Bar Biru Tanya Pustakawan (Distretch panjang, sejajar rata kiri dengan judul) */}
          <div className="tanya-pustakawan-bar">
            <span className="tanya-pustakawan-prompt">
              Butuh informasi referensi koleksi atau pertanyaan tentang layanan Perpusnas?
            </span>
            <Link to="/layanan/tanya-pustakawan" className="tanya-pustakawan-cta">
              <svg className="thumbs-up-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
              </svg>
              <span>Tanya Pustakawan</span>
            </Link>
          </div>
        </div>

        {/* Kolom Kanan: Main Hero Image Card + Peek Next Card yang menempel di ujung kanan frame */}
        <div className="online-right-column">
          <div className="online-carousel-display" role="region" aria-roledescription="carousel" aria-label="Visual pratinjau layanan online">
            {/* Foto Utama yang Aktif (Animasi crossfade mulus) */}
            <div className="main-service-card" key={`hero-${current.id}`}>
              <img
                src={current.heroImage}
                alt={current.alt || current.title}
                className="main-service-image"
              />
            </div>

            {/* Kartu Pratinjau Sekilas Layanan Berikutnya (Menempel di dinding kanan frame) */}
            <button
              type="button"
              className="peek-service-card"
              onClick={handleNext}
              aria-label={`Lanjut ke layanan berikutnya: ${next.title}`}
              key={`peek-${next.id}`}
            >
              <img
                src={next.heroImage}
                alt=""
                className="peek-service-image"
                aria-hidden="true"
              />
              <div className="peek-overlay-fade" aria-hidden="true" />
              <div className="peek-text-container" aria-hidden="true">
                <span className="peek-next-title">
                  {next.title.replace('\n', ' ')}
                </span>
                <span className="peek-next-hint">
                  Layanan yang tersedia dari Pujasintara lainnya
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
