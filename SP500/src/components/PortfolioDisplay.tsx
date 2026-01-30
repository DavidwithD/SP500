import type { GameSession, GameSessionComputed } from '../types';
import { formatCurrency, formatShares, formatPercent } from '../services/gameService';
import './PortfolioDisplay.css';

interface PortfolioDisplayProps {
  game: GameSession;
  computed: GameSessionComputed;
}

export default function PortfolioDisplay({ game, computed }: PortfolioDisplayProps) {
  const { currentCash, shares, averageHoldingPrice } = game;
  const { 
    currentValue, 
    currentPrice, 
    unrealizedProfitLoss, 
    unrealizedProfitLossPercent,
    totalProfitLoss,
    totalProfitLossPercent 
  } = computed;

  const sharesValue = shares * currentPrice;

  return (
    <div className="portfolio-display">
      <h2>Portfolio</h2>
      
      <div className="portfolio-grid">
        {/* Total Portfolio Value */}
        <div className="portfolio-card highlight">
          <div className="card-label">Total Value</div>
          <div className="card-value large">{formatCurrency(currentValue)}</div>
          <div className={`card-change ${totalProfitLoss >= 0 ? 'positive' : 'negative'}`}>
            {formatCurrency(totalProfitLoss)} ({formatPercent(totalProfitLossPercent)})
          </div>
        </div>

        {/* Cash */}
        <div className="portfolio-card">
          <div className="card-label">Cash</div>
          <div className="card-value">{formatCurrency(currentCash)}</div>
        </div>

        {/* Shares */}
        <div className="portfolio-card">
          <div className="card-label">Shares Held</div>
          <div className="card-value">{formatShares(shares)}</div>
          <div className="card-subtext">{formatCurrency(sharesValue)}</div>
        </div>

        {/* Current Price */}
        <div className="portfolio-card">
          <div className="card-label">Current Price</div>
          <div className="card-value">{formatCurrency(currentPrice)}</div>
        </div>

        {/* Average Holding Price */}
        <div className="portfolio-card">
          <div className="card-label">Avg. Cost Basis</div>
          <div className="card-value">
            {averageHoldingPrice > 0 ? formatCurrency(averageHoldingPrice) : '—'}
          </div>
        </div>

        {/* Unrealized P&L */}
        <div className="portfolio-card">
          <div className="card-label">Unrealized P&L</div>
          <div className={`card-value ${unrealizedProfitLoss >= 0 ? 'positive' : 'negative'}`}>
            {formatCurrency(unrealizedProfitLoss)}
          </div>
          <div className={`card-subtext ${unrealizedProfitLoss >= 0 ? 'positive' : 'negative'}`}>
            {shares > 0 ? formatPercent(unrealizedProfitLossPercent) : '—'}
          </div>
        </div>

        {/* Realized P&L */}
        <div className="portfolio-card">
          <div className="card-label">Realized P&L</div>
          <div className={`card-value ${game.realizedProfitLoss >= 0 ? 'positive' : 'negative'}`}>
            {formatCurrency(game.realizedProfitLoss)}
          </div>
        </div>

        {/* Trading Stats */}
        <div className="portfolio-card">
          <div className="card-label">Trades</div>
          <div className="card-value">{game.transactionCount}</div>
          <div className="card-subtext">
            {game.buyCount} buys • {game.sellCount} sells
          </div>
        </div>
      </div>
    </div>
  );
}
