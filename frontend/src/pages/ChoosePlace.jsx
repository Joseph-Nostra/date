import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDateContext } from '../context/DateContext';
import GlassCard from '../components/GlassCard';

const places = [
  {
    id: 1,
    name: 'Romantic Coffee',
    description: 'A cozy corner with the aroma of fresh coffee and whispered conversations.',
    emoji: '☕',
    distance: '0.8 km',
    atmosphere: 4,
    gradient: 'linear-gradient(135deg, #2d1f1a, #4a2c20)',
    image: '☕🌹',
  },
  {
    id: 2,
    name: 'Walk in Nature',
    description: 'Winding trails through blooming gardens and gentle breezes.',
    emoji: '🌿',
    distance: '2.1 km',
    atmosphere: 5,
    gradient: 'linear-gradient(135deg, #1a2d1f, #1f3a25)',
    image: '🌿🦋',
  },
  {
    id: 3,
    name: 'Beach at Sunset',
    description: 'Golden light painting the waves as you walk hand in hand.',
    emoji: '🌅',
    distance: '5.4 km',
    atmosphere: 5,
    gradient: 'linear-gradient(135deg, #3a2a1a, #4a3020)',
    image: '🌅🐚',
  },
  {
    id: 4,
    name: 'Romantic Restaurant',
    description: 'Candlelit tables, soft music, and exquisite cuisine.',
    emoji: '🍷',
    distance: '1.5 km',
    atmosphere: 5,
    gradient: 'linear-gradient(135deg, #2a1a2a, #3a1530)',
    image: '🍷🕯️',
  },
  {
    id: 5,
    name: 'Picnic in the Park',
    description: 'A blanket under the stars with your favorite treats.',
    emoji: '🧺',
    distance: '1.2 km',
    atmosphere: 4,
    gradient: 'linear-gradient(135deg, #1a2a1f, #203a25)',
    image: '🧺🌸',
  },
  {
    id: 6,
    name: 'Custom Place',
    description: 'Choose your own special spot — anywhere your heart leads.',
    emoji: '✨',
    distance: '—',
    atmosphere: 5,
    gradient: 'linear-gradient(135deg, #2a1a30, #3a1540)',
    image: '✨💫',
  },
];

export default function ChoosePlace() {
  const navigate = useNavigate();
  const { currentPlan, setCurrentPlan } = useDateContext();

  const selectPlace = (place) => {
    setCurrentPlan(prev => ({
      ...prev,
      place: place,
      location: prev.location || place.name,
    }));
    navigate('/details');
  };

  return (
    <motion.div
      className="page-container safe-top px-5 pt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl mb-2"
          style={{ fontFamily: 'var(--font-romantic)', color: '#ffd1dc', fontWeight: 400 }}>
          Choose a Place
        </h1>
        <p className="text-sm" style={{ color: 'rgba(232, 160, 180, 0.6)' }}>
          Where will your love story unfold? 📍
        </p>
      </motion.div>

      {/* Place Cards */}
      <div className="flex flex-col gap-4 pb-6">
        {places.map((place, i) => (
          <motion.div
            key={place.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <GlassCard
              className="overflow-hidden"
              onClick={() => selectPlace(place)}
              glow={currentPlan.place?.id === place.id}
            >
              {/* Image area */}
              <div
                className="h-32 flex items-center justify-center text-5xl relative"
                style={{ background: place.gradient }}
              >
                <span>{place.image}</span>
                {/* Distance badge */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-semibold"
                  style={{
                    background: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(10px)',
                    color: 'rgba(232, 160, 180, 0.8)',
                  }}>
                  📍 {place.distance}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold m-0" style={{ color: '#ffd1dc' }}>
                    {place.emoji} {place.name}
                  </h3>
                </div>
                <p className="text-xs leading-relaxed mb-3 m-0"
                  style={{ color: 'rgba(232, 160, 180, 0.6)' }}>
                  {place.description}
                </p>
                {/* Atmosphere rating */}
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-medium mr-1" style={{ color: 'rgba(232, 160, 180, 0.5)' }}>
                    Atmosphere
                  </span>
                  {Array.from({ length: 5 }, (_, j) => (
                    <span key={j} className="text-xs" style={{
                      opacity: j < place.atmosphere ? 1 : 0.2,
                      filter: j < place.atmosphere ? 'drop-shadow(0 0 3px rgba(255, 107, 138, 0.5))' : 'none',
                    }}>
                      ❤️
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
