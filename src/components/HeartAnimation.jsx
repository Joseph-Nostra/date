import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeartAnimation({ trigger = false, count = 8 }) {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    if (trigger) {
      const newHearts = Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 200 - 100,
        delay: Math.random() * 0.5,
        size: 12 + Math.random() * 16,
        duration: 1.5 + Math.random() * 1,
      }));
      setHearts(newHearts);
      setTimeout(() => setHearts([]), 3000);
    }
  }, [trigger, count]);

  return (
    <div className="fixed inset-0 z-[80] pointer-events-none flex items-center justify-center">
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: -150 - Math.random() * 100,
              x: h.x,
              scale: [0, 1.2, 1, 0.8],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: h.duration, delay: h.delay, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              fontSize: h.size,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
