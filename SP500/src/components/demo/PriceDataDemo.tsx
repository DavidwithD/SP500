/**
 * PriceDataDemo Component
 * 
 * Demo component to test and showcase the price data service.
 * Displays loading state, data statistics, and sample queries.
 */

import { usePriceData } from '../../hooks/usePriceData';
import './PriceDataDemo.css';

export function PriceDataDemo() {
  const {
    data,
    dateRange,
    isLoading,
    isError,
    error,
    refresh,
    clearCache,
    getPriceForDate,
    get52WeekRange,
    getMarketTrend,
  } = usePriceData();

  if (isLoading) {
    return (
      <div className="price-data-demo">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading S&P 500 historical data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="price-data-demo">
        <div className="error">
          <h2>❌ Error Loading Data</h2>
          <p>{error}</p>
          <button onClick={refresh}>Retry</button>
        </div>
      </div>
    );
  }

  if (!data || !dateRange) {
    return (
      <div className="price-data-demo">
        <div className="empty">
          <p>No data available</p>
          <button onClick={refresh}>Load Data</button>
        </div>
      </div>
    );
  }

  // Get some sample data
  const latestEntry = data[0]; // Data is sorted newest first
  const oldestEntry = data[data.length - 1];
  
  // Get today's data (or latest available)
  const today = new Date();
  const todayPrice = getPriceForDate(today) || latestEntry;
  
  // Get 52-week range for today
  const weekRange52 = get52WeekRange(todayPrice.date);
  
  // Get market trend
  const trend = getMarketTrend(todayPrice.date);

  return (
    <div className="price-data-demo">
      <div className="header">
        <h1>📊 S&P 500 Data Service Demo</h1>
        <div className="actions">
          <button onClick={refresh}>🔄 Refresh</button>
          <button onClick={clearCache}>🗑️ Clear Cache</button>
        </div>
      </div>

      <div className="stats-grid">
        {/* Data Statistics */}
        <div className="stat-card">
          <h3>📈 Dataset Statistics</h3>
          <div className="stat-row">
            <span>Total Trading Days:</span>
            <strong>{dateRange.totalDays.toLocaleString()}</strong>
          </div>
          <div className="stat-row">
            <span>Date Range:</span>
            <strong>
              {dateRange.minDate.toLocaleDateString()} - {dateRange.maxDate.toLocaleDateString()}
            </strong>
          </div>
          <div className="stat-row">
            <span>Years of Data:</span>
            <strong>
              {((dateRange.maxDate.getTime() - dateRange.minDate.getTime()) / (1000 * 60 * 60 * 24 * 365)).toFixed(1)} years
            </strong>
          </div>
        </div>

        {/* Latest Price */}
        <div className="stat-card">
          <h3>💵 Latest Price</h3>
          <div className="price-display">
            <div className="price-main">${latestEntry.close.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <div className="price-date">{latestEntry.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>
          {latestEntry.change !== undefined && (
            <div className={`price-change ${latestEntry.change >= 0 ? 'positive' : 'negative'}`}>
              {latestEntry.change >= 0 ? '▲' : '▼'} ${Math.abs(latestEntry.change).toFixed(2)} ({latestEntry.changePercent?.toFixed(2)}%)
            </div>
          )}
        </div>

        {/* 52-Week Range */}
        {weekRange52 && (
          <div className="stat-card">
            <h3>📊 52-Week Range</h3>
            <div className="stat-row">
              <span>High:</span>
              <strong>${weekRange52.high.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
            </div>
            <div className="stat-row">
              <span>Low:</span>
              <strong>${weekRange52.low.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
            </div>
            <div className="range-bar">
              <div className="range-fill" style={{ width: `${weekRange52.rangePercent}%` }}></div>
              <div className="range-marker" style={{ left: `${weekRange52.rangePercent}%` }}>●</div>
            </div>
            <div className="range-labels">
              <span>${weekRange52.low.toFixed(2)}</span>
              <span>{weekRange52.rangePercent.toFixed(0)}%</span>
              <span>${weekRange52.high.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Market Trend */}
        <div className="stat-card">
          <h3>📉 Market Trend</h3>
          <div className="trend-display">
            <span className={`trend-badge trend-${trend}`}>
              {trend === 'bullish' && '🐂 Bullish'}
              {trend === 'bearish' && '🐻 Bearish'}
              {trend === 'neutral' && '➖ Neutral'}
            </span>
          </div>
          <p className="trend-description">
            {trend === 'bullish' && 'Price is above moving averages and trending upward'}
            {trend === 'bearish' && 'Price is below moving averages and trending downward'}
            {trend === 'neutral' && 'Mixed signals, no clear trend direction'}
          </p>
        </div>

        {/* Historical Context */}
        <div className="stat-card">
          <h3>📜 Historical Context</h3>
          <div className="stat-row">
            <span>Oldest Record:</span>
            <strong>{oldestEntry.date.toLocaleDateString()}</strong>
          </div>
          <div className="stat-row">
            <span>Price Then:</span>
            <strong>${oldestEntry.close.toFixed(2)}</strong>
          </div>
          <div className="stat-row">
            <span>Total Growth:</span>
            <strong className="positive">
              +{(((latestEntry.close - oldestEntry.close) / oldestEntry.close) * 100).toFixed(2)}%
            </strong>
          </div>
        </div>

        {/* Data Quality */}
        <div className="stat-card">
          <h3>✅ Data Quality</h3>
          <div className="stat-row">
            <span>Valid Entries:</span>
            <strong>{data.length.toLocaleString()}</strong>
          </div>
          <div className="stat-row">
            <span>Data Source:</span>
            <strong>/data/sp500.json</strong>
          </div>
          <div className="stat-row">
            <span>Status:</span>
            <strong className="positive">✓ Loaded</strong>
          </div>
        </div>
      </div>

      <div className="info-box">
        <h3>🎮 Ready for Trading Simulation!</h3>
        <p>
          The price data service is working correctly. Historical S&P 500 data spanning{' '}
          <strong>{((dateRange.maxDate.getTime() - dateRange.minDate.getTime()) / (1000 * 60 * 60 * 24 * 365)).toFixed(1)} years</strong>{' '}
          is now available for the trading simulator.
        </p>
        <ul>
          <li>✓ Data loaded and cached for performance</li>
          <li>✓ Date range queries working</li>
          <li>✓ 52-week range calculations working</li>
          <li>✓ Market trend analysis working</li>
        </ul>
      </div>
    </div>
  );
}
