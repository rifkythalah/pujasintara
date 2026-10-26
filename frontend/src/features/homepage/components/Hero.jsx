import { Link } from 'react-router';
import { getRoute } from '../../../config/routes.js';
import { heroCopy, heroInterval, heroSlides } from '../data/hero.js';
import useHeroCarousel from '../hooks/useHeroCarousel.js';
import '../hero-carousel.css';

export default function Hero() {
  const { index, previous, playing, select, setPaused } = useHeroCarousel(heroSlides.length, heroInterval);
  return <section className="homepage-hero" data-slide-kind={heroSlides[index].kind} aria-label="Sorotan Pujasintara" aria-roledescription="carousel"
    onFocusCapture={() => setPaused(true)}
    onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
    <div className="hero-slides" aria-live={playing ? 'off' : 'polite'}>
      {heroSlides.map((slide, position) => <div key={slide.id} className={`hero-slide hero-slide-${slide.kind}${position === index ? ' is-current' : position === previous ? ' is-previous' : ''}`}
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
      <div className="hero-position-dots">{heroSlides.map((slide, position) => <button key={slide.id} type="button"
        aria-label={`Tampilkan gambar ${position + 1}`} aria-pressed={index === position} onClick={() => select(position)}><span /></button>)}</div>
    </div>}
  </section>;
}
