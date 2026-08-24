import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDateContext } from '../context/DateContext';
import GlassCard from '../components/GlassCard';
import RomanticButton from '../components/RomanticButton';
import HeartAnimation from '../components/HeartAnimation';

export default function DateMemory() {
  const { memories, addMemory } = useDateContext();
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [note, setNote] = useState('');
  const [rating, setRating] = useState(0);
  const [saved, setSaved] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = (ev) => setPhotoPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    addMemory({
      photo: photoPreview,
      note,
      rating,
    });
    setShowHearts(true);
    setSaved(true);
    setTimeout(() => {
      setPhoto(null);
      setPhotoPreview('');
      setNote('');
      setRating(0);
      setSaved(false);
      setShowHearts(false);
    }, 3000);
  };

  const inputStyle = {
    background: 'rgba(40, 12, 22, 0.5)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(168, 23, 68, 0.2)',
    borderRadius: '16px',
    padding: '14px 18px',
    color: '#f5e6ec',
    fontSize: '15px',
    width: '100%',
    outline: 'none',
    resize: 'none',
    fontFamily: 'var(--font-body)',
  };

  return (
    <motion.div
      className="page-container safe-top px-5 pt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <HeartAnimation trigger={showHearts} count={12} />

      {/* Header */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl mb-2"
          style={{ fontFamily: 'var(--font-romantic)', color: '#ffd1dc', fontWeight: 400 }}>
          Date Memory
        </h1>
        <p className="text-sm" style={{ color: 'rgba(232, 160, 180, 0.6)' }}>
          Save your most precious moments 💝
        </p>
      </motion.div>

      {/* Create Memory Form */}
      <GlassCard className="p-5 mb-6" glow>
        <h3 className="text-sm font-semibold mb-4 m-0" style={{ color: '#ffd1dc' }}>
          ✨ New Memory
        </h3>

        {/* Photo upload */}
        <div className="mb-4">
          <label className="block text-[10px] uppercase tracking-widest mb-2 font-semibold"
            style={{ color: 'rgba(232, 160, 180, 0.5)' }}>
            📸 Upload Photo
          </label>
          <motion.label
            className="flex flex-col items-center justify-center rounded-2xl cursor-pointer overflow-hidden"
            style={{
              height: photoPreview ? '200px' : '120px',
              background: 'rgba(40, 12, 22, 0.4)',
              border: '2px dashed rgba(168, 23, 68, 0.3)',
            }}
            whileHover={{ borderColor: 'rgba(168, 23, 68, 0.5)' }}
          >
            {photoPreview ? (
              <img src={photoPreview} alt="Memory" className="w-full h-full object-cover" />
            ) : (
              <>
                <span className="text-3xl mb-2">📷</span>
                <span className="text-xs" style={{ color: 'rgba(232, 160, 180, 0.5)' }}>
                  Tap to add a photo
                </span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </motion.label>
        </div>

        {/* Note */}
        <div className="mb-4">
          <label className="block text-[10px] uppercase tracking-widest mb-2 font-semibold"
            style={{ color: 'rgba(232, 160, 180, 0.5)' }}>
            💌 Romantic Note
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="How was your date? Write about this special moment..."
            rows={3}
            style={inputStyle}
          />
        </div>

        {/* Rating */}
        <div className="mb-5">
          <label className="block text-[10px] uppercase tracking-widest mb-2 font-semibold"
            style={{ color: 'rgba(232, 160, 180, 0.5)' }}>
            ❤️ Rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                onClick={() => setRating(star)}
                className="text-2xl bg-transparent border-0 cursor-pointer p-1"
                whileTap={{ scale: 0.8 }}
                animate={star <= rating ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
                style={{
                  opacity: star <= rating ? 1 : 0.25,
                  filter: star <= rating ? 'drop-shadow(0 0 6px rgba(255, 107, 138, 0.5))' : 'none',
                }}
              >
                ❤️
              </motion.button>
            ))}
          </div>
        </div>

        {/* Save */}
        <RomanticButton
          fullWidth
          onClick={handleSave}
          disabled={!note && !photoPreview}
        >
          {saved ? '✅ Memory Saved!' : 'Save Memory 💝'}
        </RomanticButton>
      </GlassCard>

      {/* Saved Memories */}
      {memories.length > 0 && (
        <div className="pb-6">
          <h3 className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'rgba(232, 160, 180, 0.6)' }}>
            ✨ Saved Memories
          </h3>
          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {memories.map((mem, i) => (
                <motion.div
                  key={mem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <GlassCard className="overflow-hidden">
                    {mem.photo && (
                      <img src={mem.photo} alt="Memory" className="w-full h-40 object-cover" />
                    )}
                    <div className="p-4">
                      {mem.note && (
                        <p className="text-sm leading-relaxed mb-2 m-0"
                          style={{ color: '#ffd1dc', fontStyle: 'italic' }}>
                          "{mem.note}"
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }, (_, j) => (
                            <span key={j} className="text-sm"
                              style={{ opacity: j < mem.rating ? 1 : 0.2 }}>
                              ❤️
                            </span>
                          ))}
                        </div>
                        <span className="text-[10px]" style={{ color: 'rgba(232, 160, 180, 0.4)' }}>
                          {new Date(mem.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </motion.div>
  );
}
