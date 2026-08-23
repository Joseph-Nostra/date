import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const tabs = [
  { path: '/', icon: '🏠', label: 'Home' },
  { path: '/plan', icon: '💕', label: 'Plan' },
  { path: '/places', icon: '📍', label: 'Places' },
  { path: '/my-dates', icon: '📅', label: 'My Dates' },
  { path: '/memory', icon: '💝', label: 'Memory' },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom">
      <div className="glass-strong mx-auto max-w-[430px]"
        style={{
          borderTop: '1px solid rgba(168, 23, 68, 0.2)',
          borderRadius: '20px 20px 0 0',
        }}>
        <div className="flex items-center justify-around px-2 pt-2 pb-[max(8px,env(safe-area-inset-bottom))]">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 no-underline"
            >
              {({ isActive }) => (
                <motion.div
                  className="flex flex-col items-center gap-0.5"
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    className="relative flex items-center justify-center w-10 h-8 rounded-2xl text-lg"
                    animate={{
                      backgroundColor: isActive ? 'rgba(168, 23, 68, 0.25)' : 'transparent',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span style={{ filter: isActive ? 'drop-shadow(0 0 8px rgba(168, 23, 68, 0.6))' : 'none' }}>
                      {tab.icon}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: 'rgba(168, 23, 68, 0.15)',
                          boxShadow: '0 0 15px rgba(168, 23, 68, 0.3)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.div>
                  <span
                    className="text-[10px] font-medium tracking-wide"
                    style={{
                      color: isActive ? '#ff6b8a' : 'rgba(245, 230, 236, 0.5)',
                    }}
                  >
                    {tab.label}
                  </span>
                </motion.div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
