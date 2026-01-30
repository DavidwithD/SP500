import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { GameSession } from '../types';
import { formatCurrency } from '../services/gameService';
import './GamesPage.css';

interface GamesPageProps {
  games: GameSession[];
  onCreateGame: (gameName: string, startDate: Date, startingCash: number) => void;
  onSelectGame: (gameId: string) => void;
  onDeleteGame: (gameId: string) => void;
}

export default function GamesPage({ games, onCreateGame, onSelectGame, onDeleteGame }: GamesPageProps) {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [gameName, setGameName] = useState('');
  const [startDate, setStartDate] = useState('2020-01-02');
  const [startingCash, setStartingCash] = useState(10000);

  const handleCreateGame = () => {
    if (!gameName.trim()) {
      alert('Please enter a game name');
      return;
    }

    const date = new Date(startDate);
    onCreateGame(gameName, date, startingCash);
    
    // Reset form
    setGameName('');
    setStartDate('2020-01-02');
    setStartingCash(10000);
    setShowCreateModal(false);
  };

  const handlePlayGame = (gameId: string) => {
    onSelectGame(gameId);
    navigate('/game');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      active: { emoji: '🎮', label: 'Active', class: 'active' },
      paused: { emoji: '⏸️', label: 'Paused', class: 'paused' },
      ended: { emoji: '🏁', label: 'Ended', class: 'ended' },
    };
    return badges[status as keyof typeof badges] || badges.active;
  };

  return (
    <div className="games-page">
      <div className="games-header">
        <div className="header-content">
          <h1>📊 My Trading Games</h1>
          <p className="subtitle">Select a game to continue or create a new one</p>
        </div>
        <button className="btn-create-game" onClick={() => setShowCreateModal(true)}>
          ➕ Create New Game
        </button>
      </div>

      {games.length === 0 ? (
        <div className="empty-games">
          <div className="empty-icon">🎯</div>
          <h2>No Games Yet</h2>
          <p>Create your first trading game to start learning!</p>
          <button className="btn-create-first" onClick={() => setShowCreateModal(true)}>
            🚀 Create Your First Game
          </button>
        </div>
      ) : (
        <div className="games-grid">
          {games.map((game) => {
            const badge = getStatusBadge(game.status);

            return (
              <div key={game.gameId} className="game-card">
                <div className="game-card-header">
                  <h3>{game.gameName}</h3>
                  <span className={`status-badge ${badge.class}`}>
                    {badge.emoji} {badge.label}
                  </span>
                </div>

                <div className="game-stats">
                  <div className="stat-item">
                    <span className="stat-label">Starting Cash</span>
                    <span className="stat-value">{formatCurrency(game.startingCash)}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Current Cash</span>
                    <span className="stat-value">{formatCurrency(game.currentCash)}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Shares Held</span>
                    <span className="stat-value">{game.shares.toFixed(4)}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Total Trades</span>
                    <span className="stat-value">{game.transactionCount}</span>
                  </div>
                </div>

                <div className="game-dates">
                  <div className="date-info">
                    <span className="date-label">Started</span>
                    <span className="date-value">{formatDate(game.startDate)}</span>
                  </div>
                  <div className="date-info">
                    <span className="date-label">Current Date</span>
                    <span className="date-value">{formatDate(game.currentDate)}</span>
                  </div>
                </div>

                <div className="game-actions">
                  {game.status !== 'ended' && (
                    <button className="btn-play" onClick={() => handlePlayGame(game.gameId)}>
                      {game.status === 'paused' ? '▶️ Resume' : '🎮 Play'}
                    </button>
                  )}
                  <button 
                    className="btn-delete" 
                    onClick={() => {
                      if (confirm(`Delete "${game.gameName}"?`)) {
                        onDeleteGame(game.gameId);
                      }
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Game Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Trading Game</h2>
              <button className="btn-close" onClick={() => setShowCreateModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Game Name</label>
                <input
                  type="text"
                  placeholder="e.g., My First Trading Game"
                  value={gameName}
                  onChange={(e) => setGameName(e.target.value)}
                  maxLength={100}
                />
              </div>

              <div className="form-group">
                <label>Starting Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min="2020-01-02"
                  max="2024-12-31"
                />
                <p className="help-text">Choose when to start your simulation</p>
              </div>

              <div className="form-group">
                <label>Starting Cash</label>
                <input
                  type="number"
                  value={startingCash}
                  onChange={(e) => setStartingCash(Number(e.target.value))}
                  min="1000"
                  max="1000000"
                  step="1000"
                />
                <p className="help-text">How much cash to start with</p>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowCreateModal(false)}>
                Cancel
              </button>
              <button className="btn-create" onClick={handleCreateGame}>
                🚀 Create Game
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
