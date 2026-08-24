import { motion } from 'framer-motion';
import { useDateContext } from '../context/DateContext';
import GlassCard from '../components/GlassCard';

const activityEmojis = {
  'Romantic Coffee': '☕',
  'Walk in Nature': '🌿',
  'Beach Sunset': '🌅',
  'Romantic Dinner': '🍷',
  'Cinema': '🎬',
  'Picnic': '🧺',
  'Custom': '✨',
};

export default function MyDates() {
  const { dates, updateDateStatus } = useDateContext();

  const today = new Date().toISOString().split('T')[0];
  const upcoming = dates.filter(d => d.date >= today && d.status === 'upcoming');
  const past = dates.filter(d => d.date < today || d.status === 'completed');

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '—';
    const [h, m] = timeStr.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    return `${hour % 12 || 12}:${m} ${ampm}`;
  };

  const DateCard = ({ dateItem, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <GlassCard className="p-4 flex gap-4 items-start">
        {/* Activity icon */}
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, rgba(168, 23, 68, 0.2), rgba(107, 29, 58, 0.3))',
            border: '1px solid rgba(168, 23, 68, 0.15)',
          }}>
          {activityEmojis[dateItem.activity] || '❤️'}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold m-0 truncate" style={{ color: '#ffd1dc' }}>
              {dateItem.activity}
            </h3>
            <span className="text-lg flex-shrink-0 ml-2">❤️</span>
          </div>
          <p className="text-xs m-0 mb-1" style={{ color: 'rgba(232, 160, 180, 0.7)' }}>
            📍 {dateItem.location}
          </p>
          <div className="flex items-center gap-3 text-[11px]" style={{ color: 'rgba(232, 160, 180, 0.5)' }}>
            <span>📅 {formatDate(dateItem.date)}</span>
            <span>🕐 {formatTime(dateItem.time)}</span>
          </div>

          {/* Status */}
          <div className="mt-2">
            <span
              className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
              style={{
                background: dateItem.status === 'upcoming'
                  ? 'rgba(168, 23, 68, 0.2)' : 'rgba(40, 100, 60, 0.2)',
                color: dateItem.status === 'upcoming' ? '#ff6b8a' : '#6bffa0',
                border: `1px solid ${dateItem.status === 'upcoming'
                  ? 'rgba(168, 23, 68, 0.3)' : 'rgba(40, 100, 60, 0.3)'}`,
              }}
            >
              {dateItem.status === 'upcoming' ? '💕 Upcoming' : '✅ Completed'}
            </span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );

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
          My Dates
        </h1>
        <p className="text-sm" style={{ color: 'rgba(232, 160, 180, 0.6)' }}>
          Your romantic journey so far 💕
        </p>
      </motion.div>

      {/* Empty state */}
      {dates.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <span className="text-5xl block mb-4">💝</span>
          <p className="text-lg mb-2" style={{ fontFamily: 'var(--font-romantic)', color: '#ffd1dc' }}>
            No dates planned yet
          </p>
          <p className="text-xs" style={{ color: 'rgba(232, 160, 180, 0.5)' }}>
            Start planning your first romantic date!
          </p>
        </motion.div>
      )}

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'rgba(232, 160, 180, 0.6)' }}>
            💕 Upcoming Dates
          </h2>
          <div className="flex flex-col gap-3">
            {upcoming.map((d, i) => <DateCard key={d.id} dateItem={d} index={i} />)}
          </div>
        </div>
      )}

      {/* Past */}
      {past.length > 0 && (
        <div className="pb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'rgba(232, 160, 180, 0.6)' }}>
            ✨ Past Dates
          </h2>
          <div className="flex flex-col gap-3">
            {past.map((d, i) => <DateCard key={d.id} dateItem={d} index={i} />)}
          </div>
        </div>
      )}
    </motion.div>
  );
}
