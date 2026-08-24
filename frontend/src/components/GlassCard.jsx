import { motion } from 'framer-motion';

export default function GlassCard({
  children,
  className = '',
  onClick,
  whileHover = { scale: 1.02, y: -2 },
  whileTap = { scale: 0.98 },
  glow = false,
  ...props
}) {
  return (
    <motion.div
      className={`glass rounded-2xl ${glow ? 'glow-sm' : ''} ${className}`}
      onClick={onClick}
      whileHover={whileHover}
      whileTap={onClick ? whileTap : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
