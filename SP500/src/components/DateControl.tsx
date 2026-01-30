import type { GameSession, GameSessionComputed } from '../types';
import './DateControl.css';

interface DateControlProps {
  game: GameSession;
  computed: GameSessionComputed;
  onAdvanceDate: (increment: 'day' | 'week' | 'month' | 'year', count?: number) => void;
}

export default function DateControl({ game, computed, onAdvanceDate }: DateControlProps) {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatShortDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="date-control">
      <div className="current-date-display">
        <div className="date-label">Simulation Date</div>
        <div className="date-value">{formatDate(game.currentDate)}</div>
        <div className="date-info">
          <span className="days-played">Day {computed.daysPlayed + 1}</span>
          <span className="date-range">
            Started {formatShortDate(game.startDate)}
          </span>
        </div>
      </div>

      <div className="time-controls">
        <div className="control-label">Fast Forward</div>
        <div className="control-buttons">
          <button 
            className="time-btn"
            onClick={() => onAdvanceDate('day')}
            title="Advance 1 day"
          >
            <span className="btn-label">+1 Day</span>
          </button>
          <button 
            className="time-btn"
            onClick={() => onAdvanceDate('week')}
            title="Advance 1 week"
          >
            <span className="btn-label">+1 Week</span>
          </button>
          <button 
            className="time-btn"
            onClick={() => onAdvanceDate('month')}
            title="Advance 1 month"
          >
            <span className="btn-label">+1 Month</span>
          </button>
          <button 
            className="time-btn"
            onClick={() => onAdvanceDate('year')}
            title="Advance 1 year"
          >
            <span className="btn-label">+1 Year</span>
          </button>
        </div>
      </div>
    </div>
  );
}
