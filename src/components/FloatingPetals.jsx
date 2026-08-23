import { useMemo } from 'react';

export default function FloatingPetals() {
  const petals = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${8 + Math.random() * 8}s`,
      size: 10 + Math.random() * 14,
      drift: `${-60 + Math.random() * 120}px`,
      spin: `${180 + Math.random() * 360}deg`,
      opacity: 0.3 + Math.random() * 0.4,
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: p.left,
            top: '-20px',
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            '--drift': p.drift,
            '--spin': p.spin,
            animation: `float-petal ${p.duration} ${p.delay} linear infinite`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
            <path
              d="M12 2C12 2 6 7 6 12C6 15 8.5 17 12 17C15.5 17 18 15 18 12C18 7 12 2 12 2Z"
              fill="rgba(168, 23, 68, 0.6)"
            />
            <path
              d="M12 6C12 6 8 9 8 12C8 14 9.5 15 12 15C14.5 15 16 14 16 12C16 9 12 6 12 6Z"
              fill="rgba(212, 30, 92, 0.4)"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
