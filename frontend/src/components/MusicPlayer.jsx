import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [currentTrack, setCurrentTrack] = useState(0);
  const intervalRef = useRef(null);

  const tracks = [
    { title: 'Moonlit Serenade', artist: 'Romantic Vibes', duration: '3:45' },
    { title: 'Whispers of Love', artist: 'Evening Stars', duration: '4:12' },
    { title: 'Eternal Bloom', artist: 'Rose Garden', duration: '3:58' },
  ];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            nextTrack();
            return 0;
          }
          return p + 0.3;
        });
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextTrack = () => {
    setCurrentTrack((c) => (c + 1) % tracks.length);
    setProgress(0);
  };
  const prevTrack = () => {
    setCurrentTrack((c) => (c - 1 + tracks.length) % tracks.length);
    setProgress(0);
  };

  const track = tracks[currentTrack];

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed z-[60] w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border-0"
        style={{
          bottom: 'calc(90px + env(safe-area-inset-bottom, 0px))',
          right: '16px',
          background: 'linear-gradient(135deg, #6b1d3a, #a81744)',
          boxShadow: '0 0 20px rgba(168, 23, 68, 0.5), 0 4px 15px rgba(0,0,0,0.3)',
        }}
        whileTap={{ scale: 0.9 }}
        animate={isPlaying ? {
          boxShadow: [
            '0 0 20px rgba(168, 23, 68, 0.5), 0 4px 15px rgba(0,0,0,0.3)',
            '0 0 30px rgba(168, 23, 68, 0.7), 0 4px 15px rgba(0,0,0,0.3)',
            '0 0 20px rgba(168, 23, 68, 0.5), 0 4px 15px rgba(0,0,0,0.3)',
          ],
        } : {}}
        transition={isPlaying ? { repeat: Infinity, duration: 2 } : {}}
      >
        <span className="text-lg">{isPlaying ? '🎵' : '🎶'}</span>
      </motion.button>

      {/* Expanded player */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed z-[70] left-3 right-3 glass-strong rounded-3xl p-5 overflow-hidden"
            style={{
              bottom: 'calc(90px + env(safe-area-inset-bottom, 0px))',
              maxWidth: '400px',
              margin: '0 auto',
            }}
          >
            {/* Close */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-3 right-4 text-rose-gold/60 text-xl bg-transparent border-0 cursor-pointer"
            >✕</button>

            {/* Cover art placeholder */}
            <div className="w-20 h-20 mx-auto rounded-2xl mb-4 flex items-center justify-center text-4xl"
              style={{
                background: 'linear-gradient(135deg, #2a0f1a, #4a1530)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
              }}
            >
              🌹
            </div>

            {/* Track info */}
            <div className="text-center mb-4">
              <h4 className="text-rose-soft font-semibold text-sm m-0">{track.title}</h4>
              <p className="text-rose-gold/60 text-xs mt-1 m-0">{track.artist}</p>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-white/10 rounded-full mb-4 cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setProgress(((e.clientX - rect.left) / rect.width) * 100);
              }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #a81744, #ff6b8a)',
                }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mb-4">
              <button onClick={prevTrack} className="text-rose-gold/70 text-lg bg-transparent border-0 cursor-pointer hover:text-rose-pink transition-colors">⏮</button>
              <motion.button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full flex items-center justify-center border-0 cursor-pointer text-white text-lg"
                style={{
                  background: 'linear-gradient(135deg, #a81744, #d41e5c)',
                  boxShadow: '0 0 20px rgba(168, 23, 68, 0.4)',
                }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? '⏸' : '▶'}
              </motion.button>
              <button onClick={nextTrack} className="text-rose-gold/70 text-lg bg-transparent border-0 cursor-pointer hover:text-rose-pink transition-colors">⏭</button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2 px-2">
              <span className="text-xs text-rose-gold/50">🔈</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 h-1 appearance-none bg-white/10 rounded-full outline-none"
                style={{
                  accentColor: '#a81744',
                }}
              />
              <span className="text-xs text-rose-gold/50">🔊</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
