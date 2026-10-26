import { useEffect, useRef, useState } from 'react';
import { openingHoursParts } from '../../lib/openingHours.js';
import { headerCopy } from '../../config/header.js';
import Icon from '../ui/Icon.jsx';

export default function OpeningHours({ locale }) {
  const [now, setNow] = useState(() => new Date());
  const details = useRef(null);
  const summary = useRef(null);
  const copy = headerCopy[locale];
  const hours = openingHoursParts(now, locale);

  useEffect(() => {
    const update = () => setNow(new Date());
    const timer = window.setInterval(update, 30000);
    document.addEventListener('visibilitychange', update);
    window.addEventListener('focus', update);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', update);
      window.removeEventListener('focus', update);
    };
  }, []);

  useEffect(() => {
    const closeOutside = (event) => {
      if (details.current?.open && !details.current.contains(event.target)) {
        details.current.open = false;
      }
    };
    document.addEventListener('click', closeOutside);
    return () => document.removeEventListener('click', closeOutside);
  }, []);

  return <div className="topbar-note" lang={locale}>
    <Icon name="clock" />
    <div>
      <span aria-live="polite">{hours.prefix} <strong>{hours.range}</strong> {hours.zone}</span>
      <details className="opening-hours" ref={details} onKeyDown={(event) => {
        if (event.key === 'Escape' && details.current.open) {
          details.current.open = false;
          summary.current.focus();
        }
      }}>
        <summary ref={summary}>{copy.scheduleLink}<Icon name="arrow" /></summary>
        <div className="opening-hours-panel">
          <strong>{copy.scheduleLink}</strong>
          {copy.schedule.map(({ days, hours }) => <p key={days}>{days}: <strong>{hours}</strong> WIB</p>)}
          <p>{copy.holidayLabel}: <strong>{copy.closed}</strong></p>
        </div>
      </details>
    </div>
  </div>;
}
