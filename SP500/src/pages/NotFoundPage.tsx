import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common';
import './NotFoundPage.css';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-icon">📉</div>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-message">
          Oops! Looks like this page went down like a bad trade.
          <br />
          Let's get you back on track.
        </p>
        <div className="not-found-actions">
          <Link to="/">
            <Button variant="primary" size="large">
              🏠 Go to Home
            </Button>
          </Link>
          <Link to="/games">
            <Button variant="secondary" size="large">
              🎮 View Games
            </Button>
          </Link>
        </div>
        <div className="not-found-hint">
          <p>Looking for something specific?</p>
          <ul>
            <li><Link to="/">Games Dashboard</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
            <li><Link to="/achievements">Achievements</Link></li>
            <li><Link to="/settings">Settings</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
