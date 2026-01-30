import { useState, useEffect } from 'react';
import type { GameSession } from './types';
import { dataService } from './services/dataService';
import { gameService } from './services/gameService';
import PortfolioDisplay from './components/PortfolioDisplay';
import TradingPanel from './components/TradingPanel';
import DateControl from './components/DateControl';
import PriceChart from './components/PriceChart';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [game, setGame] = useState<GameSession | null>(null);

  // Initialize data and create default game
  useEffect(() => {
    async function initialize() {
      try {
        setIsLoading(true);
        
        // Load S&P 500 data
        await dataService.loadData();
        
        // Get earliest available date
        const startDate = dataService.getEarliestDate();
        if (!startDate) {
          throw new Error('No price data available');
        }

        // Create a new game session
        const newGame = gameService.createGame(
          'user-1',
          'My Trading Game',
          startDate,
          10000
        );

        setGame(newGame);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize');
        setIsLoading(false);
      }
    }

    initialize();
  }, []);

  const handleTrade = (updatedGame: GameSession) => {
    setGame(updatedGame);
  };

  const handleAdvanceDate = (increment: 'day' | 'week' | 'month' | 'year') => {
    if (!game) return;

    const result = gameService.advanceDate(game, increment);
    if ('error' in result) {
      alert(result.error);
    } else {
      setGame(result);
    }
  };

  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loader"></div>
        <h2>Loading S&P 500 Trading Simulator...</h2>
        <p>Preparing historical market data</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error">
        <h2>❌ Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="app-error">
        <h2>No game session</h2>
        <button onClick={() => window.location.reload()}>Start New Game</button>
      </div>
    );
  }

  const computed = gameService.computeGameStats(game);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>📈 SP500 Trading Simulator</h1>
          <p className="tagline">Practice trading with historical data • No real money</p>
        </div>
        <div className="game-info">
          <span className="game-name">{game.gameName}</span>
          <span className={`game-status ${game.status}`}>{game.status}</span>
        </div>
      </header>

      <main className="app-main">
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
              onTrade={handleTrade}
            />
          </div>

          {/* Right Column - Portfolio & Chart */}
          <div className="right-column">
            <PortfolioDisplay 
              game={game}
              computed={computed}
            />
            <PriceChart game={game} />
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Educational purpose only • Using historical S&P 500 data • {dataService.getDataPointCount()} data points loaded</p>
      </footer>
    </div>
  );
}

export default App;
