import { homepageMock } from '../data/homepage.mock.js';

// Boundary data lokal. Adapter REST baru ditambahkan setelah integrasi disetujui.
// Tidak mensimulasikan request maupun keberhasilan API.
export function getHomepageContent() {
  return homepageMock;
}
