import { motion } from 'framer-motion';

export default function RomanticButton({
  children,
  onClick,
  className = '',
  disabled = false,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
}) {
  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm rounded-xl',
    md: 'px-8 py-3.5 text-base rounded-2xl',
    lg: 'px-10 py-4 text-lg rounded-2xl',
  };

  const baseStyle = {
    primary: {
      background: 'linear-gradient(135deg, #8b2d4a, #a81744, #d41e5c)',
      color: '#fff',
      boxShadow: '0 0 20px rgba(168, 23, 68, 0.4), 0 4px 15px rgba(0,0,0,0.2)',
    },
    secondary: {
      background: 'rgba(107, 29, 58, 0.3)',
      color: '#ff6b8a',
      border: '1px solid rgba(168, 23, 68, 0.3)',
    },
    ghost: {
      background: 'transparent',
      color: '#e8a0b4',
    },
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        font-semibold tracking-wide border-0 cursor-pointer
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      style={{
        ...baseStyle[variant],
        fontFamily: 'var(--font-body)',
      }}
      whileHover={!disabled ? { scale: 1.03, y: -1 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      animate={variant === 'primary' && !disabled ? {
        boxShadow: [
          '0 0 20px rgba(168, 23, 68, 0.4), 0 4px 15px rgba(0,0,0,0.2)',
          '0 0 30px rgba(168, 23, 68, 0.6), 0 4px 20px rgba(0,0,0,0.3)',
          '0 0 20px rgba(168, 23, 68, 0.4), 0 4px 15px rgba(0,0,0,0.2)',
        ],
      } : {}}
      transition={variant === 'primary' ? { boxShadow: { repeat: Infinity, duration: 2.5 } } : {}}
    >
      {children}
    </motion.button>
  );
}
