import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/common';
import { Layout, Header, Footer } from '../components/layout';
import './LeaderboardPage.css';

interface LeaderboardEntry {
  rank: number;
  username: string;
  roi: number;
  profit: number;
  trades: number;
  gameName: string;
  endDate: string;
}

// Placeholder data for the leaderboard
const PLACEHOLDER_DATA: LeaderboardEntry[] = [
  { rank: 1, username: 'TraderPro', roi: 156.2, profit: 15620, trades: 45, gameName: 'Bull Run 2020', endDate: '2021-12-31' },
  { rank: 2, username: 'WallStreetWiz', roi: 132.8, profit: 13280, trades: 38, gameName: 'Recovery Play', endDate: '2021-06-15' },
  { rank: 3, username: 'IndexFundFan', roi: 98.5, profit: 9850, trades: 12, gameName: 'Long Game', endDate: '2022-03-20' },
  { rank: 4, username: 'SwingMaster', roi: 87.3, profit: 8730, trades: 67, gameName: 'Quick Trades', endDate: '2021-09-30' },
  { rank: 5, username: 'PatientInvestor', roi: 76.4, profit: 7640, trades: 8, gameName: 'Buy & Hold', endDate: '2022-01-15' },
];

export const LeaderboardPage: React.FC = () => {
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
            Top performers ranked by Return on Investment (ROI)
          </p>
        </div>

        <div className="leaderboard-filters">
          <button className="filter-btn active">All Time</button>
          <button className="filter-btn">This Month</button>
          <button className="filter-btn">This Week</button>
        </div>

        <Card className="leaderboard-card" padding="none">
          <div className="leaderboard-notice">
            <span className="notice-icon">🚧</span>
            <div className="notice-content">
              <strong>Coming Soon!</strong>
              <p>
                The leaderboard feature is under development. Complete games to see your scores here!
                For now, here's a preview of how it will look.
              </p>
            </div>
          </div>

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
              {PLACEHOLDER_DATA.map((entry) => (
                <tr key={entry.rank} className={entry.rank <= 3 ? `top-${entry.rank}` : ''}>
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
                    <span className="game-date">{entry.endDate}</span>
                  </td>
                  <td className="col-roi">
                    <span className="roi-value positive">+{entry.roi.toFixed(1)}%</span>
                  </td>
                  <td className="col-profit">
                    <span className="profit-value positive">
                      ${entry.profit.toLocaleString()}
                    </span>
                  </td>
                  <td className="col-trades">{entry.trades}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
