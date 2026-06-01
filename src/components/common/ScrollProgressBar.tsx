import { useEffect, useRef } from 'react';

export const ScrollProgressBar = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] origin-left pointer-events-none"
      style={{
        background: 'linear-gradient(90deg, #1D4ED8 0%, #60A5FA 55%, #8B5CF6 100%)',
        transform: 'scaleX(0)',
        boxShadow: '0 0 10px rgba(96,165,250,0.7), 0 0 4px rgba(37,99,235,0.5)',
      }}
    />
  );
};
