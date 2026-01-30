import type { GameSession } from '../types';
import { dataService } from '../services/dataService';
import { formatCurrency, formatPercent } from '../services/gameService';
import './MarketContext.css';

interface MarketContextProps {
  game: GameSession;
  currentPrice: number;
}

export default function MarketContext({ game, currentPrice }: MarketContextProps) {
  const priceData = dataService.getPriceByDate(game.currentDate);
  const previousDay = dataService.getPreviousTradingDay(game.currentDate);
  const previousPrice = previousDay ? dataService.getPriceByDate(previousDay)?.close : null;
  
  // Calculate daily change
  const dailyChange = previousPrice ? currentPrice - previousPrice : 0;
  const dailyChangePercent = previousPrice ? (dailyChange / previousPrice) * 100 : 0;

  // Get 52-week high/low
  const highLow = dataService.get52WeekHighLow(game.currentDate);

  // Determine market trend
  const getTrendIndicator = (): { label: string; className: string } => {
    if (!previousPrice) {
      return { label: 'Neutral', className: 'neutral' };
    }
    
    const changePercent = Math.abs(dailyChangePercent);
    
    if (dailyChange > 0) {
      if (changePercent >= 2) return { label: 'Strongly Bullish', className: 'strong-bull' };
      if (changePercent >= 1) return { label: 'Bullish', className: 'bull' };
      return { label: 'Slightly Bullish', className: 'slight-bull' };
    } else if (dailyChange < 0) {
      if (changePercent >= 2) return { label: 'Strongly Bearish', className: 'strong-bear' };
      if (changePercent >= 1) return { label: 'Bearish', className: 'bear' };
      return { label: 'Slightly Bearish', className: 'slight-bear' };
    }
    
    return { label: 'Neutral', className: 'neutral' };
  };

  const trend = getTrendIndicator();

  // Get current quarter and year
  const currentDate = game.currentDate;
  const quarter = Math.floor(currentDate.getMonth() / 3) + 1;
  const year = currentDate.getFullYear();

  return (
    <div className="market-context">
      <h2>Market Context</h2>
      
      <div className="market-grid">
        {/* Current Price */}
        <div className="market-card highlight">
          <div className="card-label">Current S&P 500 Price</div>
          <div className="card-value large">{formatCurrency(currentPrice)}</div>
          {previousPrice && (
            <div className={`card-change ${dailyChange >= 0 ? 'positive' : 'negative'}`}>
              {dailyChange >= 0 ? '▲' : '▼'} {formatCurrency(Math.abs(dailyChange))} ({formatPercent(dailyChangePercent)})
            </div>
          )}
        </div>

        {/* Market Trend */}
        <div className={`market-card trend-card ${trend.className}`}>
          <div className="card-label">Market Trend</div>
          <div className="trend-value">{trend.label}</div>
          <div className="trend-icon">
            {dailyChange > 0 ? '📈' : dailyChange < 0 ? '📉' : '➡️'}
          </div>
        </div>

        {/* 52-Week High */}
        {highLow && (
          <div className="market-card">
            <div className="card-label">52-Week High</div>
            <div className="card-value">{formatCurrency(highLow.high)}</div>
            <div className="card-subtext">
              {highLow.highDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        )}

        {/* 52-Week Low */}
        {highLow && (
          <div className="market-card">
            <div className="card-label">52-Week Low</div>
            <div className="card-value">{formatCurrency(highLow.low)}</div>
            <div className="card-subtext">
              {highLow.lowDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        )}

        {/* Period Info */}
        <div className="market-card">
          <div className="card-label">Trading Period</div>
          <div className="card-value">Q{quarter} {year}</div>
          <div className="card-subtext">Quarter {quarter}</div>
        </div>

        {/* Volume (if available) */}
        {priceData && (
          <div className="market-card">
            <div className="card-label">Volume</div>
            <div className="card-value">
              {(priceData.volume / 1000000000).toFixed(2)}B
            </div>
            <div className="card-subtext">shares traded</div>
          </div>
        )}
      </div>
    </div>
  );
}
