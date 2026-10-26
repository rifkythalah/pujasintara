import { headerCopy } from '../../config/header.js';
import HeaderIcon from '../ui/HeaderIcon.jsx';

export default function LanguageSelector({ locale, onLocaleChange }) {
  return <div className="header-languages" role="group" aria-label={headerCopy[locale].languageLabel}>
    <HeaderIcon name="language" />
    <button type="button" lang="id" aria-pressed={locale === 'id'} onClick={() => onLocaleChange('id')}>Indonesia</button>
    <button type="button" lang="en" aria-pressed={locale === 'en'} onClick={() => onLocaleChange('en')}>English</button>
  </div>;
}
