import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { GameSession } from '../types';
import { dataService } from '../services/dataService';
import { formatCurrency } from '../services/gameService';
import './PriceChart.css';

interface PriceChartProps {
  game: GameSession;
}

export default function PriceChart({ game }: PriceChartProps) {
  // Get price data from start date to current date
  const priceData = dataService.getPriceRange(game.startDate, game.currentDate);

  // Transform data for Recharts
  const chartData = priceData.map(item => ({
    date: item.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    price: item.close,
    avgPrice: game.averageHoldingPrice,
    fullDate: item.date,
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <div className="tooltip-date">{data.date}</div>
          <div className="tooltip-row">
            <span className="tooltip-label">S&P 500:</span>
            <span className="tooltip-value">{formatCurrency(data.price)}</span>
          </div>
          {game.averageHoldingPrice > 0 && (
            <div className="tooltip-row">
              <span className="tooltip-label">Avg Cost:</span>
              <span className="tooltip-value">{formatCurrency(data.avgPrice)}</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="price-chart">
      <h2>Price History</h2>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              domain={['auto', 'auto']}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#667eea" 
              strokeWidth={2}
              dot={false}
              name="S&P 500 Price"
              activeDot={{ r: 6 }}
            />
            {game.averageHoldingPrice > 0 && (
              <Line 
                type="monotone" 
                dataKey="avgPrice" 
                stroke="#10b981" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Your Avg. Cost"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#667eea' }}></span>
          <span>S&P 500 Price (Actual market data)</span>
        </div>
        {game.averageHoldingPrice > 0 && (
          <div className="legend-item">
            <span className="legend-dot dashed" style={{ background: '#10b981' }}></span>
            <span>Your Average Cost Basis (Updates with each purchase)</span>
          </div>
        )}
      </div>
    </div>
  );
}
