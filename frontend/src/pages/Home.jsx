import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDateContext } from '../context/DateContext';
import GlassCard from '../components/GlassCard';
import RomanticButton from '../components/RomanticButton';

const activities = [
  { emoji: '☕', title: 'Coffee', activity: 'Romantic Coffee' },
  { emoji: '🌿', title: 'Nature Walk', activity: 'Walk in Nature' },
  { emoji: '🌅', title: 'Sunset', activity: 'Beach Sunset' },
  { emoji: '🍷', title: 'Dinner', activity: 'Romantic Dinner' },
  { emoji: '🎬', title: 'Cinema', activity: 'Cinema' },
  { emoji: '🧺', title: 'Picnic', activity: 'Picnic' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Home() {
  const navigate = useNavigate();
  const { setCurrentPlan } = useDateContext();

  const handleQuickActivity = (activity) => {
    setCurrentPlan(prev => ({ ...prev, activity: activity.activity }));
    navigate('/plan');
  };

  return (
    <motion.div
      className="page-container safe-top"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.div
        className="relative min-h-[50vh] flex flex-col items-center justify-center text-center px-6 pt-8 pb-6"
        variants={itemVariants}
      >
        {/* Decorative glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168, 23, 68, 0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Rose decoration */}
        <motion.div
          className="text-5xl mb-4"
          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        >
          🌹
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl sm:text-5xl mb-4 leading-tight glow-text"
          style={{
            fontFamily: 'var(--font-romantic)',
            color: '#ffd1dc',
            fontWeight: 400,
          }}
          variants={itemVariants}
        >
          Plan a Moment<br />to Remember
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-sm sm:text-base mb-8 max-w-[300px] leading-relaxed"
          style={{ color: 'rgba(232, 160, 180, 0.7)' }}
          variants={itemVariants}
        >
          Because the perfect date starts with the perfect moment.
        </motion.p>

        {/* CTA */}
        <motion.div variants={itemVariants}>
          <RomanticButton
            size="lg"
            onClick={() => navigate('/plan')}
          >
            Plan a Date ❤️
          </RomanticButton>
        </motion.div>
      </motion.div>

      {/* Quick Activities */}
      <motion.div className="px-5 pb-8" variants={itemVariants}>
        <h2 className="text-base font-semibold mb-4" style={{ color: 'rgba(232, 160, 180, 0.8)' }}>
          ✨ Quick Start
        </h2>

        <div className="grid grid-cols-3 gap-3">
          {activities.map((act, i) => (
            <GlassCard
              key={act.title}
              className="p-4 flex flex-col items-center gap-2"
              onClick={() => handleQuickActivity(act)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              <span className="text-2xl">{act.emoji}</span>
              <span className="text-xs font-medium" style={{ color: 'rgba(245, 230, 236, 0.7)' }}>
                {act.title}
              </span>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      {/* Romantic quote */}
      <motion.div
        className="px-8 pb-10 text-center"
        variants={itemVariants}
      >
        <GlassCard className="p-6" glow>
          <p className="text-xl mb-2" style={{ fontFamily: 'var(--font-romantic)', color: '#ffd1dc' }}>
            "Every love story is beautiful, but ours is my favorite."
          </p>
          <p className="text-xs" style={{ color: 'rgba(232, 160, 180, 0.5)' }}>— Unknown</p>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
