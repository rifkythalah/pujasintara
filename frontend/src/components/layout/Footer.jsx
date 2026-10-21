import Icon from '../ui/Icon.jsx';

export default function Footer() {
  return <footer className="footer">
    <div className="container footer-grid">
      <div><div className="footer-brand"><Icon name="book" /><strong>PUJASINTARA</strong></div><p>Perpustakaan Nasional Republik Indonesia</p><p className="footer-tagline">Pujasintara Melayani Nusantara.</p></div>
      <div><h2>Jelajahi pratinjau</h2><a href="#layanan-online">Layanan Online</a><a href="#layanan-fisik">Layanan Fisik</a><a href="#agenda">Agenda Kegiatan</a><a href="#berita">Berita</a></div>
      <div><h2>Informasi layanan</h2><p>Kontak, jam operasional, dan kanal resmi akan diisi setelah diverifikasi.</p><span className="footer-status">Konten demonstrasi</span></div>
    </div>
    <div className="container footer-bottom"><span>Pratinjau pengembangan frontend · Pujasintara</span><a href="#atas">Kembali ke atas ↑</a></div>
  </footer>;
}
