import Icon from '../ui/Icon.jsx';

export default function TopBar() {
  return <header className="topbar" id="atas">
    <div className="container topbar-content">
      <a className="brand" href="/" aria-label="Pujasintara — Beranda">
        <span className="brand-symbol"><Icon name="book" /></span>
        <span><strong>PUJASINTARA</strong><small>Perpustakaan Nasional Republik Indonesia</small></span>
      </a>
      <div className="topbar-note"><Icon name="clock" /><span>Ruang pengetahuan untuk semua<small>Informasi jam layanan akan dilengkapi</small></span></div>
      <span className="language-label">Bahasa Indonesia</span>
    </div>
  </header>;
}
