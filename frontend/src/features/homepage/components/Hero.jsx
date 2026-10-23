import { Link } from 'react-router';
import { getRoute } from '../../../config/routes.js';
import Icon from '../../../components/ui/Icon.jsx';
import { heroCopy, heroInterval, heroSlides } from '../data/hero.js';
import useHeroCarousel from '../hooks/useHeroCarousel.js';
import '../hero-carousel.css';

export default function Hero() {
  const { index, paused, playing, reducedMotion, select, setHovered, setPaused } = useHeroCarousel(heroSlides.length, heroInterval);
  return <section className="homepage-hero" aria-label="Sorotan Pujasintara" aria-roledescription="carousel"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={(event) => { if (!event.target.closest('.hero-playback') && !event.currentTarget.contains(event.relatedTarget)) setPaused(true); }}>
    <div className="hero-slides" aria-live={playing ? 'off' : 'polite'}>
      {heroSlides.map((slide, position) => <div key={slide.id} className={`hero-slide hero-slide-${slide.kind}${position === index ? ' is-current' : ''}`}
        role="group" aria-roledescription="slide" aria-label={`${position + 1} dari ${heroSlides.length}`}
        aria-hidden={position !== index} inert={position !== index}>
        <img className="hero-photo" src={slide.src} alt={slide.alt} fetchPriority={position === 0 ? 'high' : 'auto'} decoding="async" />
        {slide.kind === 'welcome' && <div className="hero-welcome">
          <p className="hero-intro">{heroCopy.welcome}<br />{heroCopy.institution}</p>
          <h1>{heroCopy.title}</h1>
          <p className="hero-tagline">{heroCopy.tagline}</p>
          <Link className="hero-cta" to={getRoute(heroCopy.routeId).path}>{heroCopy.action}</Link>
        </div>}
      </div>)}
    </div>
    {heroSlides.length > 1 && <div className="hero-pagination" aria-label="Kontrol gambar hero">
      <button type="button" className="hero-previous" aria-label="Gambar sebelumnya" onClick={() => select(index - 1)}><Icon name="arrow" /></button>
      <div className="hero-position-dots">{heroSlides.map((slide, position) => <button key={slide.id} type="button"
        aria-label={`Tampilkan gambar ${position + 1}`} aria-pressed={index === position} onClick={() => select(position)}><span /></button>)}</div>
      <span className="hero-position">{index + 1} / {heroSlides.length}</span>
      <button type="button" aria-label="Gambar berikutnya" onClick={() => select(index + 1)}><Icon name="arrow" /></button>
      {!reducedMotion && <button type="button" className="hero-playback" onClick={() => setPaused(!paused)}>{paused ? 'Putar' : 'Jeda'}<span className="sr-only"> pergantian gambar otomatis</span></button>}
    </div>}
  </section>;
}
