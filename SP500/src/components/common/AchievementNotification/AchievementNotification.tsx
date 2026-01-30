import { useState, useEffect, useCallback } from 'react';
import type { AchievementDefinition } from '../../../types/achievement.types';
import './AchievementNotification.css';

interface AchievementNotificationProps {
  achievement: AchievementDefinition | null;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export const AchievementNotification: React.FC<AchievementNotificationProps> = ({
  achievement,
  onClose,
  autoClose = true,
  autoCloseDelay = 5000,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const handleClose = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsLeaving(false);
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      setIsLeaving(false);

      if (autoClose) {
        const timer = setTimeout(handleClose, autoCloseDelay);
        return () => clearTimeout(timer);
      }
    }
  }, [achievement, autoClose, autoCloseDelay, handleClose]);

  if (!achievement || !isVisible) {
    return null;
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'trading': return '📊';
      case 'profit': return '💰';
      case 'milestone': return '🏆';
      case 'special': return '⭐';
      default: return '🎯';
    }
  };

  return (
    <div 
      className={`achievement-notification ${isLeaving ? 'leaving' : ''}`}
      role="alert"
      aria-live="polite"
    >
      <div className="achievement-notification__glow" />
      
      <div className="achievement-notification__content">
        <div className="achievement-notification__header">
          <span className="achievement-notification__badge">
            🎉 Achievement Unlocked!
          </span>
          <button 
            className="achievement-notification__close"
            onClick={handleClose}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
        
        <div className="achievement-notification__body">
          <div className="achievement-notification__icon">
            <span className="achievement-notification__emoji">
              {achievement.icon}
            </span>
            <span className="achievement-notification__category-icon">
              {getCategoryIcon(achievement.category)}
            </span>
          </div>
          
          <div className="achievement-notification__details">
            <h3 className="achievement-notification__title">
              {achievement.name}
            </h3>
            <p className="achievement-notification__description">
              {achievement.description}
            </p>
            <div className="achievement-notification__points">
              +{achievement.points} points
            </div>
          </div>
        </div>
      </div>
      
      <div className="achievement-notification__progress-bar">
        <div 
          className="achievement-notification__progress-fill"
          style={{ animationDuration: `${autoCloseDelay}ms` }}
        />
      </div>
    </div>
  );
};

export default AchievementNotification;
