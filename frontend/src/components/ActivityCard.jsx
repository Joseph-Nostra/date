import { motion } from 'framer-motion';

export default function ActivityCard({ emoji, title, isSelected, onClick, delay = 0 }) {
  return (
    <motion.button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 rounded-2xl border-0 cursor-pointer transition-all"
      style={{
        background: isSelected
          ? 'linear-gradient(135deg, rgba(168, 23, 68, 0.3), rgba(107, 29, 58, 0.4))'
          : 'rgba(40, 12, 22, 0.35)',
        backdropFilter: 'blur(16px)',
        border: isSelected
          ? '1px solid rgba(168, 23, 68, 0.5)'
          : '1px solid rgba(168, 23, 68, 0.1)',
        boxShadow: isSelected
          ? '0 0 20px rgba(168, 23, 68, 0.3)'
          : 'none',
        minWidth: '90px',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.08, duration: 0.4 }}
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-2xl" style={{
        filter: isSelected ? 'drop-shadow(0 0 8px rgba(168, 23, 68, 0.5))' : 'none',
      }}>
        {emoji}
      </span>
      <span className="text-xs font-medium" style={{
        color: isSelected ? '#ff6b8a' : 'rgba(245, 230, 236, 0.6)',
      }}>
        {title}
      </span>
    </motion.button>
  );
}
