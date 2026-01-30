import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/common';
import { Layout, Header, Footer } from '../components/layout';
import { getLeaderboard, getLeaderboardStats } from '../services/leaderboard';
import type { LeaderboardPeriod, LeaderboardSortBy } from '../types/leaderboard.types';
import './LeaderboardPage.css';

export const LeaderboardPage: React.FC = () => {
  const [period, setPeriod] = useState<LeaderboardPeriod>('all-time');
  const [sortBy, setSortBy] = useState<LeaderboardSortBy>('roi');

  const entries = useMemo(() => getLeaderboard({ period, sortBy, limit: 50 }), [period, sortBy]);
  const stats = useMemo(() => getLeaderboardStats(), []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatROI = (roi: number) => {
    const sign = roi >= 0 ? '+' : '';
    return `${sign}${roi.toFixed(1)}%`;
  };

  const formatProfit = (profit: number) => {
    const sign = profit >= 0 ? '+' : '';
    return `${sign}$${Math.abs(profit).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <Layout
      header={<Header />}
      footer={<Footer />}
      maxWidth="medium"
    >
      <div className="leaderboard-page">
        <div className="leaderboard-header">
          <h1>🏆 Leaderboard</h1>
          <p className="leaderboard-subtitle">
            Top performers ranked by {sortBy === 'roi' ? 'Return on Investment (ROI)' : sortBy === 'profit' ? 'Total Profit' : 'Trade Count'}
          </p>
        </div>

        {stats.totalEntries > 0 && (
          <div className="leaderboard-stats">
            <div className="stat-item">
              <span className="stat-value">{stats.totalEntries}</span>
              <span className="stat-label">Games Played</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{formatROI(stats.highestROI)}</span>
              <span className="stat-label">Best ROI</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{formatROI(stats.averageROI)}</span>
              <span className="stat-label">Avg ROI</span>
            </div>
          </div>
        )}

        <div className="leaderboard-controls">
          <div className="leaderboard-filters">
            <button 
              className={`filter-btn ${period === 'all-time' ? 'active' : ''}`}
              onClick={() => setPeriod('all-time')}
            >
              All Time
            </button>
            <button 
              className={`filter-btn ${period === 'this-month' ? 'active' : ''}`}
              onClick={() => setPeriod('this-month')}
            >
              This Month
            </button>
            <button 
              className={`filter-btn ${period === 'this-week' ? 'active' : ''}`}
              onClick={() => setPeriod('this-week')}
            >
              This Week
            </button>
          </div>

          <div className="leaderboard-sort">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as LeaderboardSortBy)}>
              <option value="roi">ROI</option>
              <option value="profit">Profit</option>
              <option value="trades">Trades</option>
            </select>
          </div>
        </div>

        <Card className="leaderboard-card" padding="none">
          {entries.length === 0 ? (
            <div className="leaderboard-empty">
              <span className="empty-icon">📊</span>
              <h3>No entries yet</h3>
              <p>Complete games to appear on the leaderboard!</p>
            </div>
          ) : (
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th className="col-rank">Rank</th>
                  <th className="col-user">Player</th>
                  <th className="col-game">Game</th>
                  <th className="col-roi">ROI</th>
                  <th className="col-profit">Profit</th>
                  <th className="col-trades">Trades</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id} className={entry.rank <= 3 ? `top-${entry.rank}` : ''}>
                    <td className="col-rank">
                      {entry.rank === 1 && <span className="rank-medal">🥇</span>}
                      {entry.rank === 2 && <span className="rank-medal">🥈</span>}
                      {entry.rank === 3 && <span className="rank-medal">🥉</span>}
                      {entry.rank > 3 && <span className="rank-number">{entry.rank}</span>}
                    </td>
                    <td className="col-user">
                      <span className="username">{entry.username}</span>
                    </td>
                    <td className="col-game">
                      <span className="game-name">{entry.gameName}</span>
                      <span className="game-date">{formatDate(entry.endDate)}</span>
                    </td>
                    <td className="col-roi">
                      <span className={`roi-value ${entry.roi >= 0 ? 'positive' : 'negative'}`}>
                        {formatROI(entry.roi)}
                      </span>
                    </td>
                    <td className="col-profit">
                      <span className={`profit-value ${entry.profit >= 0 ? 'positive' : 'negative'}`}>
                        {formatProfit(entry.profit)}
                      </span>
                    </td>
                    <td className="col-trades">{entry.trades}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>

        <div className="leaderboard-cta">
          <p>Ready to compete?</p>
          <Link to="/" className="cta-button">
            🎮 Start a New Game
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default LeaderboardPage;
