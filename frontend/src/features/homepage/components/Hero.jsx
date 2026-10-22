import heroIllustration from '../../../../layanan-publik/assets/hero-background.svg';
import Icon from '../../../components/ui/Icon.jsx';

export default function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <img className="hero-image" src={heroIllustration} alt="" />
    <div className="hero-shade" />
    <div className="container hero-content">
      <p className="eyebrow light">SELAMAT DATANG DI SITUS WEB</p>
      <p className="hero-institution">Perpustakaan Nasional Republik Indonesia</p>
      <h1 id="hero-title">Pujasintara<br /><span>Melayani Nusantara.</span></h1>
      <p className="hero-description">Ruang untuk menjelajahi pengetahuan,<br />menumbuhkan gagasan, dan terus belajar.</p>
      <a className="button button-green" href="#agenda">Lihat pratinjau agenda kegiatan<Icon name="arrow" /></a>
      <span className="hero-caption">Ilustrasi sementara · menunggu desain Figma</span>
    </div>
    <div className="hero-bottom"><span>MEMBACA</span><span>BELAJAR</span><span>BERKARYA</span></div>
  </section>;
}
