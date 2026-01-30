import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { GameSession, Transaction } from '../types';
import { gameService } from '../services/gameService';
import PortfolioDisplay from '../components/PortfolioDisplay';
import TradingPanel from '../components/TradingPanel';
import DateControl from '../components/DateControl';
import PriceChart from '../components/PriceChart';
import MarketContext from '../components/MarketContext';
import TransactionHistory from '../components/TransactionHistory';
import './GamePage.css';

interface GamePageProps {
  game: GameSession | null;
  transactions: Transaction[];
  onTrade: (updatedGame: GameSession, transaction: Transaction) => void;
  onAdvanceDate: (updatedGame: GameSession) => void;
  onPauseGame: (updatedGame: GameSession) => void;
  onEndGame: (updatedGame: GameSession) => void;
}

export default function GamePage({ 
  game, 
  transactions, 
  onTrade, 
  onAdvanceDate,
  onPauseGame,
  onEndGame 
}: GamePageProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!game) {
      navigate('/');
    }
  }, [game, navigate]);

  if (!game) {
    return null;
  }

  const handleAdvanceDate = (increment: 'day' | 'week' | 'month' | 'year') => {
    const result = gameService.advanceDate(game, increment);
    if ('error' in result) {
      alert(result.error);
    } else {
      onAdvanceDate(result);
    }
  };

  const handlePause = () => {
    const paused = gameService.pauseGame(game);
    onPauseGame(paused);
    navigate('/');
  };

  const handleEndGame = () => {
    if (confirm('Are you sure you want to end this game? This action cannot be undone.')) {
      const { game: endedGame } = gameService.endGame(game);
      onEndGame(endedGame);
      navigate('/');
    }
  };

  const computed = gameService.computeGameStats(game);

  return (
    <div className="game-page">
      <header className="game-header">
        <div className="header-left">
          <button className="btn-back" onClick={() => navigate('/')}>
            ← Back to Games
          </button>
          <div className="game-title">
            <h1>{game.gameName}</h1>
            <span className={`game-status ${game.status}`}>{game.status}</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-pause" onClick={handlePause}>
            ⏸️ Pause
          </button>
          <button className="btn-end-game" onClick={handleEndGame}>
            🏁 End Game
          </button>
        </div>
      </header>

      <main className="game-main">
        <div className="main-grid">
          {/* Left Column - Trading & Date Control */}
          <div className="left-column">
            <DateControl 
              game={game} 
              computed={computed}
              onAdvanceDate={handleAdvanceDate}
            />
            <TradingPanel 
              game={game}
              onTrade={onTrade}
            />
            <TransactionHistory transactions={transactions} />
          </div>

          {/* Right Column - Portfolio & Chart */}
          <div className="right-column">
            <MarketContext 
              game={game}
              currentPrice={computed.currentPrice}
            />
            <PortfolioDisplay 
              game={game}
              computed={computed}
            />
            <PriceChart game={game} />
          </div>
        </div>
      </main>
    </div>
  );
}
