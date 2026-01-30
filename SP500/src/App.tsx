import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import type { GameSession, Transaction } from './types';
import { dataService } from './services/dataService';
import { gameService } from './services/gameService';
import GamesPage from './pages/GamesPage';
import GamePage from './pages/GamePage';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [games, setGames] = useState<GameSession[]>([]);
  const [currentGameId, setCurrentGameId] = useState<string | null>(null);
  const [transactionsMap, setTransactionsMap] = useState<Map<string, Transaction[]>>(new Map());

  // Initialize data
  useEffect(() => {
    async function initialize() {
      try {
        setIsLoading(true);
        await dataService.loadData();
        
        // Load saved games from localStorage
        const savedGames = localStorage.getItem('sp500_games');
        const savedTransactions = localStorage.getItem('sp500_transactions');
        
        if (savedGames) {
          const parsedGames = JSON.parse(savedGames, (key, value) => {
            // Convert date strings back to Date objects
            if (key === 'startDate' || key === 'currentDate' || key === 'createdAt' || key === 'updatedAt' || key === 'endedAt') {
              return value ? new Date(value) : value;
            }
            return value;
          });
          setGames(parsedGames);
        }

        if (savedTransactions) {
          const parsedTransactions = JSON.parse(savedTransactions, (key, value) => {
            if (key === 'date' || key === 'timestamp') {
              return new Date(value);
            }
            return value;
          });
          setTransactionsMap(new Map(Object.entries(parsedTransactions)));
        }

        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize');
        setIsLoading(false);
      }
    }

    initialize();
  }, []);

  // Save games to localStorage whenever they change
  useEffect(() => {
    if (!isLoading && games.length > 0) {
      localStorage.setItem('sp500_games', JSON.stringify(games));
    }
  }, [games, isLoading]);

  // Save transactions to localStorage
  useEffect(() => {
    if (!isLoading && transactionsMap.size > 0) {
      const transactionsObj = Object.fromEntries(transactionsMap);
      localStorage.setItem('sp500_transactions', JSON.stringify(transactionsObj));
    }
  }, [transactionsMap, isLoading]);

  const handleCreateGame = (gameName: string, startDate: Date, startingCash: number) => {
    const newGame = gameService.createGame('user-1', gameName, startDate, startingCash);
    setGames(prev => [...prev, newGame]);
    setTransactionsMap(prev => new Map(prev).set(newGame.gameId, []));
  };

  const handleSelectGame = (gameId: string) => {
    setCurrentGameId(gameId);
  };

  const handleDeleteGame = (gameId: string) => {
    setGames(prev => prev.filter(g => g.gameId !== gameId));
    setTransactionsMap(prev => {
      const newMap = new Map(prev);
      newMap.delete(gameId);
      return newMap;
    });
    if (currentGameId === gameId) {
      setCurrentGameId(null);
    }
  };

  const handleTrade = (updatedGame: GameSession, transaction: Transaction) => {
    setGames(prev => prev.map(g => g.gameId === updatedGame.gameId ? updatedGame : g));
    setTransactionsMap(prev => {
      const newMap = new Map(prev);
      const existing = newMap.get(updatedGame.gameId) || [];
      newMap.set(updatedGame.gameId, [...existing, transaction]);
      return newMap;
    });
  };

  const handleAdvanceDate = (updatedGame: GameSession) => {
    setGames(prev => prev.map(g => g.gameId === updatedGame.gameId ? updatedGame : g));
  };

  const handlePauseGame = (updatedGame: GameSession) => {
    setGames(prev => prev.map(g => g.gameId === updatedGame.gameId ? updatedGame : g));
  };

  const handleEndGame = (updatedGame: GameSession) => {
    setGames(prev => prev.map(g => g.gameId === updatedGame.gameId ? updatedGame : g));
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

  const currentGame = currentGameId ? games.find(g => g.gameId === currentGameId) || null : null;
  const currentTransactions = currentGameId ? transactionsMap.get(currentGameId) || [] : [];

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <GamesPage 
              games={games}
              onCreateGame={handleCreateGame}
              onSelectGame={handleSelectGame}
              onDeleteGame={handleDeleteGame}
            />
          } 
        />
        <Route 
          path="/game" 
          element={
            <GamePage 
              game={currentGame}
              transactions={currentTransactions}
              onTrade={handleTrade}
              onAdvanceDate={handleAdvanceDate}
              onPauseGame={handlePauseGame}
              onEndGame={handleEndGame}
            />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
