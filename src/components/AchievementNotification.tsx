import {Alert} from 'antd';
import {motion, AnimatePresence} from 'framer-motion';
import {Achievement} from '../utils/achievements';

interface AchievementNotificationProps {
  achievement: Achievement | null;
  onClose: () => void;
}

function AchievementNotification({achievement, onClose}: AchievementNotificationProps) {
  if (!achievement) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100, scale: 0.3 }}
        animate={{ opacity: 1, y: 20, scale: 1 }}
        exit={{ opacity: 0, y: -100, scale: 0.3 }}
        transition={{ type: 'spring', bounce: 0.4, duration: 0.6 }}
        style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          maxWidth: '90%',
          width: '500px',
        }}
      >
        <Alert
          message={
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem' }}>
              <span style={{ fontSize: '2rem' }}>{achievement.icon}</span>
              <div>
                <div style={{ fontWeight: 'bold' }}>Achievement Unlocked!</div>
                <div>{achievement.title}</div>
              </div>
            </div>
          }
          description={achievement.description}
          type="success"
          closable
          onClose={onClose}
          style={{
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: '2px solid #52c41a',
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default AchievementNotification;
