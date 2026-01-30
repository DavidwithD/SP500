import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/common';
import { Layout, Header, Footer } from '../components/layout';
import { getAchievementsWithStatus } from '../services/achievements';
import type { AchievementCategory } from '../types/achievement.types';
import './AchievementsPage.css';

const CATEGORY_LABELS: Record<AchievementCategory, { label: string; icon: string }> = {
  trading: { label: 'Trading', icon: '📊' },
  profit: { label: 'Profit', icon: '💰' },
  milestone: { label: 'Milestones', icon: '🎯' },
  special: { label: 'Special', icon: '⭐' },
};

const CATEGORY_ORDER: AchievementCategory[] = ['trading', 'profit', 'milestone', 'special'];

export const AchievementsPage: React.FC = () => {
  const achievements = useMemo(() => getAchievementsWithStatus(), []);

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalCount = achievements.length;
  const progressPercent = totalCount > 0 ? (unlockedCount / totalCount) * 100 : 0;
  const totalPoints = achievements
    .filter(a => a.isUnlocked)
    .reduce((sum, a) => sum + a.definition.points, 0);

  const groupedAchievements = useMemo(() => {
    const groups: Record<AchievementCategory, typeof achievements> = {
      trading: [],
      profit: [],
      milestone: [],
      special: [],
    };
    
    achievements.forEach(a => {
      groups[a.definition.category].push(a);
    });
    
    return groups;
  }, [achievements]);

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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
          <div className="progress-stats">
            <span className="total-points">
              🏆 {totalPoints} points earned
            </span>
          </div>
        </Card>

        {CATEGORY_ORDER.map((category) => (
          <div key={category} className="achievement-category">
            <h2 className="category-title">
              <span className="category-icon">{CATEGORY_LABELS[category].icon}</span>
              {CATEGORY_LABELS[category].label}
              <span className="category-count">
                {groupedAchievements[category].filter(a => a.isUnlocked).length} / {groupedAchievements[category].length}
              </span>
            </h2>
            
            <div className="achievements-grid">
              {groupedAchievements[category].map((achievement) => (
                <div 
                  key={achievement.definition.id} 
                  className={`achievement-card ${achievement.isUnlocked ? 'unlocked' : 'locked'}`}
                >
                  <div className="achievement-icon">
                    {achievement.isUnlocked ? achievement.definition.icon : '🔒'}
                  </div>
                  <div className="achievement-content">
                    <h3 className="achievement-name">{achievement.definition.name}</h3>
                    <p className="achievement-description">{achievement.definition.description}</p>
                    <div className="achievement-points">
                      +{achievement.definition.points} pts
                    </div>
                    {achievement.isUnlocked && achievement.unlockedAt && (
                      <p className="unlocked-date">
                        ✓ Unlocked: {formatDate(achievement.unlockedAt)}
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
