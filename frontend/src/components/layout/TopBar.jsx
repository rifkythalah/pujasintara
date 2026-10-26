import SiteLogo from './SiteLogo.jsx';
import { headerCopy, socialLinks } from '../../config/header.js';
import LanguageSelector from './LanguageSelector.jsx';
import OpeningHours from './OpeningHours.jsx';
import HeaderIcon from '../ui/HeaderIcon.jsx';

export default function TopBar({ locale, onLocaleChange }) {
  const copy = headerCopy[locale];
  return <header className="topbar" id="atas">
    <div className="container topbar-content">
      <SiteLogo />
      <OpeningHours locale={locale} />
      <div className="topbar-tools">
        <LanguageSelector locale={locale} onLocaleChange={onLocaleChange} />
        <div className="header-socials" role="group" aria-label="Media sosial">
          {socialLinks.map((social) => social.href
            ? <a key={social.id} href={social.href} aria-label={social.label}><HeaderIcon name={social.id} /></a>
            : <button key={social.id} type="button" disabled title={`${social.label}: ${copy.socialPending}`} aria-label={`${social.label}: ${copy.socialPending}`}><HeaderIcon name={social.id} /></button>)}
        </div>
      </div>
    </div>
  </header>;
}
