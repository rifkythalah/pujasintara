import Hero from '../features/homepage/components/Hero.jsx';
import LayananOnline from '../features/homepage/components/LayananOnline.jsx';
import LayananFisik from '../features/homepage/components/LayananFisik.jsx';
import AgendaPreview from '../features/homepage/components/AgendaPreview.jsx';
import BeritaPreview from '../features/homepage/components/BeritaPreview.jsx';
import LiterasiDigital from '../features/homepage/components/LiterasiDigital.jsx';
import { getHomepageContent } from '../features/homepage/services/homepageService.js';

export default function HomePage() {
  const content = getHomepageContent();
  return <><Hero /><LayananOnline services={content.onlineServices} /><LayananFisik /><AgendaPreview agenda={content.agenda} /><BeritaPreview news={content.news} /><LiterasiDigital services={content.digitalServices} /></>;
}
