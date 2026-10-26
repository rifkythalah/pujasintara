import { useEffect, useState } from 'react';

export default function useHeroCarousel(count, interval) {
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState(null);
  const [paused, setPaused] = useState(false);

  const [hidden, setHidden] = useState(() => document.hidden);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const motionChanged = (event) => setReducedMotion(event.matches);
    const visibilityChanged = () => setHidden(document.hidden);
    media.addEventListener('change', motionChanged);
    document.addEventListener('visibilitychange', visibilityChanged);
    return () => {
      media.removeEventListener('change', motionChanged);
      document.removeEventListener('visibilitychange', visibilityChanged);
    };
  }, []);
  const playing = count > 1 && !paused && !hidden && !reducedMotion;
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => (() => { setPrevious(index); setIndex((index + 1) % count); })(), interval);
    return () => window.clearTimeout(timer);
  }, [index, count, interval, playing]);
  const select = (next) => { if (next === index) return; setPrevious(index); setIndex((next + count) % count); };
  return { index, previous, playing, select, setPaused };
}
