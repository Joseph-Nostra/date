import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDateContext } from '../context/DateContext';
import GlassCard from '../components/GlassCard';
import RomanticButton from '../components/RomanticButton';
import HeartAnimation from '../components/HeartAnimation';

export default function DateDetails() {
  const navigate = useNavigate();
  const { currentPlan, addDate, resetPlan } = useDateContext();
  const [confirmed, setConfirmed] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '—';
    const [h, m] = timeStr.split(':');
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${m} ${ampm}`;
  };

  const handleConfirm = async () => {
    if (isSubmitting || confirmed) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const dateData = {
      date: currentPlan.date,
      time: currentPlan.time,
      activity: currentPlan.activity,
      location: currentPlan.location || currentPlan.place?.name || 'Not specified',
      place: currentPlan.place ? { name: currentPlan.place.name } : null,
      note: currentPlan.note || '',
    };

    try {
      const response = await fetch('http://localhost:5000/api/dates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dateData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Save date to localStorage via Context
        addDate(dateData);
        setConfirmed(true);
        setShowHearts(true);
        setTimeout(() => {
          resetPlan();
          navigate('/my-dates');
        }, 2500);
      } else {
        setErrorMessage(
          data.message || 'Something went wrong while sending your date request. Please try again. ❤️'
        );
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setErrorMessage(
        'Unable to connect to server. Please check that backend server is running on http://localhost:5000 ❤️'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const details = [
    { icon: '📅', label: 'Date', value: formatDate(currentPlan.date) },
    { icon: '🕐', label: 'Time', value: formatTime(currentPlan.time) },
    { icon: '📍', label: 'Place', value: currentPlan.location || currentPlan.place?.name || '—' },
    { icon: '💝', label: 'Activity', value: currentPlan.activity || '—' },
  ];

  return (
    <motion.div
      className="page-container safe-top px-5 pt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <HeartAnimation trigger={showHearts} count={15} />

      {/* Header */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="text-4xl mb-3"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          🌹
        </motion.div>
        <h1 className="text-3xl mb-2"
          style={{ fontFamily: 'var(--font-romantic)', color: '#ffd1dc', fontWeight: 400 }}>
          {confirmed ? 'Date Confirmed!' : 'Your Date Details'}
        </h1>
        <p className="text-sm" style={{ color: 'rgba(232, 160, 180, 0.6)' }}>
          {confirmed ? 'A beautiful moment awaits you ❤️' : 'Review your perfect date ✨'}
        </p>
      </motion.div>

      {/* Error notification banner */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 p-4 rounded-2xl border text-xs leading-relaxed"
          style={{
            background: 'rgba(168, 23, 68, 0.25)',
            borderColor: 'rgba(212, 30, 92, 0.4)',
            color: '#ffd1dc',
            boxShadow: '0 0 15px rgba(168, 23, 68, 0.3)',
          }}
        >
          ⚠️ {errorMessage}
        </motion.div>
      )}

      {/* Summary Card */}
      <GlassCard className="p-6 mb-6" glow>
        {details.map((detail, i) => (
          <motion.div
            key={detail.label}
            className="flex items-start gap-3 py-3"
            style={{
              borderBottom: i < details.length - 1 ? '1px solid rgba(168, 23, 68, 0.1)' : 'none',
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <span className="text-lg shrink-0">{detail.icon}</span>
            <div>
              <p className="text-[10px] uppercase tracking-widest m-0 mb-1"
                style={{ color: 'rgba(232, 160, 180, 0.5)' }}>
                {detail.label}
              </p>
              <p className="text-sm font-medium m-0" style={{ color: '#ffd1dc' }}>
                {detail.value}
              </p>
            </div>
          </motion.div>
        ))}
      </GlassCard>

      {/* Romantic Note */}
      {currentPlan.note && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard className="p-5 mb-6">
            <p className="text-[10px] uppercase tracking-widest mb-2 m-0"
              style={{ color: 'rgba(232, 160, 180, 0.5)' }}>
              💌 Your Romantic Note
            </p>
            <p className="text-sm leading-relaxed m-0"
              style={{ color: '#ffd1dc', fontStyle: 'italic' }}>
              "{currentPlan.note}"
            </p>
          </GlassCard>
        </motion.div>
      )}

      {/* Confirm Button */}
      {!confirmed && (
        <motion.div
          className="pb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <RomanticButton
            fullWidth
            size="lg"
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending... ❤️' : 'Confirm Date ❤️'}
          </RomanticButton>
        </motion.div>
      )}

      {/* Confirmed feedback */}
      {confirmed && (
        <motion.div
          className="text-center py-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <p className="text-2xl" style={{ fontFamily: 'var(--font-romantic)', color: '#ff6b8a' }}>
            Love is in the air! 🌹
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
