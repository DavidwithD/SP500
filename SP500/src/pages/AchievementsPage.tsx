import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/common';
import { Layout, Header, Footer } from '../components/layout';
import './AchievementsPage.css';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'trading' | 'profit' | 'milestone' | 'special';
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  target?: number;
}

// Achievement definitions
const ACHIEVEMENTS: Achievement[] = [
  // Trading achievements
  { id: 'first-trade', name: 'First Steps', description: 'Complete your first trade', icon: '🎯', category: 'trading', unlocked: false },
  { id: 'ten-trades', name: 'Getting Started', description: 'Complete 10 trades', icon: '📈', category: 'trading', unlocked: false, progress: 0, target: 10 },
  { id: 'fifty-trades', name: 'Active Trader', description: 'Complete 50 trades', icon: '📊', category: 'trading', unlocked: false, progress: 0, target: 50 },
  { id: 'hundred-trades', name: 'Trading Pro', description: 'Complete 100 trades', icon: '🏆', category: 'trading', unlocked: false, progress: 0, target: 100 },
  
  // Profit achievements
  { id: 'first-profit', name: 'In the Green', description: 'Make your first profitable trade', icon: '💵', category: 'profit', unlocked: false },
  { id: 'ten-percent', name: 'Double Digits', description: 'Achieve 10% ROI in a game', icon: '📈', category: 'profit', unlocked: false },
  { id: 'fifty-percent', name: 'Half Way There', description: 'Achieve 50% ROI in a game', icon: '🚀', category: 'profit', unlocked: false },
  { id: 'hundred-percent', name: 'Doubled Up', description: 'Achieve 100% ROI in a game', icon: '💰', category: 'profit', unlocked: false },
  { id: 'thousand-profit', name: 'Big Winner', description: 'Earn $1,000 profit in a single game', icon: '💎', category: 'profit', unlocked: false },
  
  // Milestone achievements
  { id: 'first-game', name: 'New Investor', description: 'Start your first game', icon: '🎮', category: 'milestone', unlocked: false },
  { id: 'five-games', name: 'Experienced', description: 'Play 5 different games', icon: '⭐', category: 'milestone', unlocked: false, progress: 0, target: 5 },
  { id: 'complete-game', name: 'Finisher', description: 'Complete a game from start to end', icon: '🏁', category: 'milestone', unlocked: false },
  { id: 'long-hold', name: 'Patient Investor', description: 'Hold shares for 30+ days', icon: '⏳', category: 'milestone', unlocked: false },
  { id: 'year-played', name: 'Time Traveler', description: 'Advance through 1 year of simulation', icon: '📅', category: 'milestone', unlocked: false },
  
  // Special achievements
  { id: 'buy-low', name: 'Bottom Fisher', description: 'Buy at a 52-week low', icon: '🎣', category: 'special', unlocked: false },
  { id: 'sell-high', name: 'Peak Seller', description: 'Sell at a 52-week high', icon: '🏔️', category: 'special', unlocked: false },
  { id: 'perfect-timing', name: 'Perfect Timing', description: 'Buy low and sell high in the same game', icon: '⏰', category: 'special', unlocked: false },
  { id: 'win-streak', name: 'Hot Streak', description: '5 profitable trades in a row', icon: '🔥', category: 'special', unlocked: false },
];

const CATEGORY_LABELS = {
  trading: { label: 'Trading', icon: '📊' },
  profit: { label: 'Profit', icon: '💰' },
  milestone: { label: 'Milestones', icon: '🎯' },
  special: { label: 'Special', icon: '⭐' },
};

export const AchievementsPage: React.FC = () => {
  const unlockedCount = ACHIEVEMENTS.filter(a => a.unlocked).length;
  const totalCount = ACHIEVEMENTS.length;
  const progressPercent = (unlockedCount / totalCount) * 100;

  const groupedAchievements = {
    trading: ACHIEVEMENTS.filter(a => a.category === 'trading'),
    profit: ACHIEVEMENTS.filter(a => a.category === 'profit'),
    milestone: ACHIEVEMENTS.filter(a => a.category === 'milestone'),
    special: ACHIEVEMENTS.filter(a => a.category === 'special'),
  };

  return (
    <Layout
      header={<Header />}
      footer={<Footer />}
      maxWidth="medium"
    >
      <div className="achievements-page">
        <div className="achievements-header">
          <h1>🎖️ Achievements</h1>
          <p className="achievements-subtitle">
            Complete challenges and earn badges as you master trading!
          </p>
        </div>

        <Card className="progress-card">
          <div className="progress-header">
            <span className="progress-label">Overall Progress</span>
            <span className="progress-count">{unlockedCount} / {totalCount}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="progress-hint">
            🚧 Achievement tracking coming soon! Play games to unlock badges.
          </p>
        </Card>

        {(Object.keys(groupedAchievements) as Array<keyof typeof groupedAchievements>).map((category) => (
          <div key={category} className="achievement-category">
            <h2 className="category-title">
              <span className="category-icon">{CATEGORY_LABELS[category].icon}</span>
              {CATEGORY_LABELS[category].label}
            </h2>
            
            <div className="achievements-grid">
              {groupedAchievements[category].map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                >
                  <div className="achievement-icon">
                    {achievement.unlocked ? achievement.icon : '🔒'}
                  </div>
                  <div className="achievement-content">
                    <h3 className="achievement-name">{achievement.name}</h3>
                    <p className="achievement-description">{achievement.description}</p>
                    {achievement.progress !== undefined && achievement.target && (
                      <div className="achievement-progress">
                        <div className="mini-progress-bar">
                          <div 
                            className="mini-progress-fill" 
                            style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                          />
                        </div>
                        <span className="progress-text">
                          {achievement.progress} / {achievement.target}
                        </span>
                      </div>
                    )}
                    {achievement.unlockedAt && (
                      <p className="unlocked-date">
                        Unlocked: {achievement.unlockedAt}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="achievements-cta">
          <p>Start playing to unlock achievements!</p>
          <Link to="/" className="cta-button">
            🎮 Play Now
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default AchievementsPage;
