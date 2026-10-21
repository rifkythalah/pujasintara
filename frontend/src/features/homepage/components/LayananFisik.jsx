import Icon from '../../../components/ui/Icon.jsx';

export default function LayananFisik() {
  return <section className="physical-section" id="layanan-fisik" aria-labelledby="physical-title">
    <div className="container physical-content"><div><p className="eyebrow light">LAYANAN FISIK & RUANG BACA TERPADU</p><h2 id="physical-title">Ada ruang untuk<br />setiap rasa ingin tahu.</h2><p>Pratinjau area layanan keanggotaan dan ruang baca.<br />Informasi fasilitas serta prosedur kunjungan akan dilengkapi.</p><span className="outline-label">Layanan Keanggotaan · contoh tampilan</span></div><div className="reading-art" aria-hidden="true"><Icon name="book" /><span>BACA.<br />TEMUKAN.<br />TUMBUH.</span></div></div>
  </section>;
}
