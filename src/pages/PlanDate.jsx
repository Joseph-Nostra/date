import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDateContext } from '../context/DateContext';
import ActivityCard from '../components/ActivityCard';
import RomanticButton from '../components/RomanticButton';

const activities = [
  { emoji: '☕', title: 'Coffee', value: 'Romantic Coffee' },
  { emoji: '🌿', title: 'Nature Walk', value: 'Walk in Nature' },
  { emoji: '🌅', title: 'Sunset', value: 'Beach Sunset' },
  { emoji: '🍷', title: 'Dinner', value: 'Romantic Dinner' },
  { emoji: '🎬', title: 'Cinema', value: 'Cinema' },
  { emoji: '🧺', title: 'Picnic', value: 'Picnic' },
  { emoji: '✨', title: 'Custom', value: 'Custom' },
];

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
  fontFamily: 'var(--font-body)',
  transition: 'border-color 0.3s, box-shadow 0.3s',
};

const inputFocusHandler = (e) => {
  e.target.style.borderColor = 'rgba(168, 23, 68, 0.5)';
  e.target.style.boxShadow = '0 0 15px rgba(168, 23, 68, 0.2)';
};
const inputBlurHandler = (e) => {
  e.target.style.borderColor = 'rgba(168, 23, 68, 0.2)';
  e.target.style.boxShadow = 'none';
};

export default function PlanDate() {
  const navigate = useNavigate();
  const { currentPlan, setCurrentPlan } = useDateContext();

  const updateField = (field, value) => {
    setCurrentPlan(prev => ({ ...prev, [field]: value }));
  };

  const canContinue = currentPlan.date && currentPlan.time && currentPlan.activity;

  const handleContinue = () => {
    navigate('/places');
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
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-3xl mb-2"
          style={{ fontFamily: 'var(--font-romantic)', color: '#ffd1dc', fontWeight: 400 }}>
          Plan Your Date
        </h1>
        <p className="text-sm" style={{ color: 'rgba(232, 160, 180, 0.6)' }}>
          Every detail makes it special 🌹
        </p>
      </motion.div>

      {/* Date Input */}
      <motion.div
        className="mb-5"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
      >
        <label className="block text-xs font-semibold mb-2 tracking-wider uppercase"
          style={{ color: 'rgba(232, 160, 180, 0.6)' }}>
          📅 Select Date
        </label>
        <input
          type="date"
          value={currentPlan.date}
          onChange={(e) => updateField('date', e.target.value)}
          style={inputStyle}
          onFocus={inputFocusHandler}
          onBlur={inputBlurHandler}
        />
      </motion.div>

      {/* Time Input */}
      <motion.div
        className="mb-5"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label className="block text-xs font-semibold mb-2 tracking-wider uppercase"
          style={{ color: 'rgba(232, 160, 180, 0.6)' }}>
          🕐 Select Time
        </label>
        <input
          type="time"
          value={currentPlan.time}
          onChange={(e) => updateField('time', e.target.value)}
          style={inputStyle}
          onFocus={inputFocusHandler}
          onBlur={inputBlurHandler}
        />
      </motion.div>

      {/* Activity Selection */}
      <motion.div
        className="mb-5"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.25 }}
      >
        <label className="block text-xs font-semibold mb-3 tracking-wider uppercase"
          style={{ color: 'rgba(232, 160, 180, 0.6)' }}>
          💝 Choose Activity
        </label>
        <div className="flex flex-wrap gap-2.5">
          {activities.map((act, i) => (
            <ActivityCard
              key={act.value}
              emoji={act.emoji}
              title={act.title}
              isSelected={currentPlan.activity === act.value}
              onClick={() => updateField('activity', act.value)}
              delay={i}
            />
          ))}
        </div>
      </motion.div>

      {/* Location Input */}
      <motion.div
        className="mb-5"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label className="block text-xs font-semibold mb-2 tracking-wider uppercase"
          style={{ color: 'rgba(232, 160, 180, 0.6)' }}>
          📍 Location
        </label>
        <input
          type="text"
          placeholder="Where will your date be?"
          value={currentPlan.location}
          onChange={(e) => updateField('location', e.target.value)}
          style={inputStyle}
          onFocus={inputFocusHandler}
          onBlur={inputBlurHandler}
        />
      </motion.div>

      {/* Romantic Note */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.35 }}
      >
        <label className="block text-xs font-semibold mb-2 tracking-wider uppercase"
          style={{ color: 'rgba(232, 160, 180, 0.6)' }}>
          💌 Romantic Note (optional)
        </label>
        <textarea
          placeholder="Write something special..."
          value={currentPlan.note}
          onChange={(e) => updateField('note', e.target.value)}
          rows={3}
          style={{ ...inputStyle, resize: 'none' }}
          onFocus={inputFocusHandler}
          onBlur={inputBlurHandler}
        />
      </motion.div>

      {/* CTA */}
      <motion.div
        className="pb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <RomanticButton
          fullWidth
          size="lg"
          onClick={handleContinue}
          disabled={!canContinue}
        >
          Continue ❤️
        </RomanticButton>
      </motion.div>
    </motion.div>
  );
}
