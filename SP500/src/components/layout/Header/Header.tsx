import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export interface HeaderProps {
  gameName?: string;
  gameStatus?: 'active' | 'paused' | 'ended';
  onSettingsClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  gameName,
  gameStatus,
  onSettingsClick,
}) => {
  const location = useLocation();
  const isGameRoute = location.pathname === '/game';

  return (
    <header className="app-header-component">
      <div className="header-left">
        <Link to="/" className="header-logo">
          <span className="logo-icon">📈</span>
          <div className="logo-text">
            <h1>S&P 500 Simulator</h1>
            <span className="tagline">Practice trading with historical data</span>
          </div>
        </Link>
      </div>

      {isGameRoute && gameName && (
        <div className="header-center">
          <span className="current-game-label">Playing:</span>
          <span className="current-game-name">{gameName}</span>
          {gameStatus && (
            <span className={`game-status-badge game-status-${gameStatus}`}>
              {gameStatus}
            </span>
          )}
        </div>
      )}

      <div className="header-right">
        <nav className="header-nav">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            🎮 Games
          </Link>
          <Link 
            to="/leaderboard" 
            className={`nav-link ${location.pathname === '/leaderboard' ? 'active' : ''}`}
          >
            🏆 Leaderboard
          </Link>
          <Link 
            to="/achievements" 
            className={`nav-link ${location.pathname === '/achievements' ? 'active' : ''}`}
          >
            🎖️ Achievements
          </Link>
        </nav>
        {onSettingsClick && (
          <button className="header-settings-btn" onClick={onSettingsClick} aria-label="Settings">
            ⚙️
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
