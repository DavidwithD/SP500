import { useState } from 'react';
import type { GameSession, TradePreview, Transaction } from '../types';
import { gameService, formatCurrency, formatShares, formatPercent } from '../services/gameService';
import './TradingPanel.css';

interface TradingPanelProps {
  game: GameSession;
  onTrade: (updatedGame: GameSession, transaction: Transaction) => void;
}

export default function TradingPanel({ game, onTrade }: TradingPanelProps) {
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [sharesInput, setSharesInput] = useState('');
  const [preview, setPreview] = useState<TradePreview | null>(null);
  const [error, setError] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const maxBuyShares = gameService.calculateMaxBuyShares(game);
  const maxSellShares = game.shares;

  const handleInputChange = (value: string) => {
    setSharesInput(value);
    setError('');
    setPreview(null);

    const shares = parseFloat(value);
    if (isNaN(shares) || shares <= 0) {
      return;
    }

    const result = gameService.previewTrade(game, tradeType, shares);
    if ('error' in result) {
      setError(result.error);
    } else {
      setPreview(result);
    }
  };

  const handleQuickAmount = (percent: number) => {
    const maxShares = tradeType === 'buy' ? maxBuyShares : maxSellShares;
    const shares = (maxShares * percent) / 100;
    setSharesInput(shares.toFixed(4));
    handleInputChange(shares.toFixed(4));
  };

  const handleMaxClick = () => {
    const maxShares = tradeType === 'buy' ? maxBuyShares : maxSellShares;
    setSharesInput(maxShares.toFixed(4));
    handleInputChange(maxShares.toFixed(4));
  };

  const handlePreviewTrade = () => {
    const shares = parseFloat(sharesInput);
    if (isNaN(shares) || shares <= 0) {
      setError('Please enter a valid share amount');
      return;
    }

    const result = gameService.previewTrade(game, tradeType, shares);
    if ('error' in result) {
      setError(result.error);
      setPreview(null);
    } else {
      setPreview(result);
      setShowConfirmation(true);
    }
  };

  const handleConfirmTrade = () => {
    const shares = parseFloat(sharesInput);
    
    const result = tradeType === 'buy' 
      ? gameService.buyShares(game, shares)
      : gameService.sellShares(game, shares);

    if ('error' in result) {
      setError(result.error);
      return;
    }

    onTrade(result.game, result.transaction);
    
    // Reset form
    setSharesInput('');
    setPreview(null);
    setError('');
    setShowConfirmation(false);
  };

  const handleCancelTrade = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="trading-panel">
      <h2>Trading</h2>

      <div className="trade-type-selector">
        <button
          className={`trade-type-btn ${tradeType === 'buy' ? 'active buy' : ''}`}
          onClick={() => {
            setTradeType('buy');
            setSharesInput('');
            setPreview(null);
            setError('');
          }}
        >
          Buy
        </button>
        <button
          className={`trade-type-btn ${tradeType === 'sell' ? 'active sell' : ''}`}
          onClick={() => {
            setTradeType('sell');
            setSharesInput('');
            setPreview(null);
            setError('');
          }}
        >
          Sell
        </button>
      </div>

      <div className="trade-form">
        <div className="input-group">
          <label htmlFor="shares-input">Number of Shares</label>
          <div className="input-wrapper">
            <input
              id="shares-input"
              type="number"
              step="0.0001"
              min="0"
              value={sharesInput}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Enter shares (e.g., 1.5)"
              disabled={showConfirmation}
            />
            <button 
              className="max-btn" 
              onClick={handleMaxClick}
              disabled={showConfirmation}
            >
              MAX
            </button>
          </div>
          <div className="input-hint">
            {tradeType === 'buy' 
              ? `Max: ${formatShares(maxBuyShares)} shares (${formatCurrency(game.currentCash)} available)`
              : `Max: ${formatShares(maxSellShares)} shares`
            }
          </div>
        </div>

        <div className="quick-amounts">
          <button onClick={() => handleQuickAmount(25)} disabled={showConfirmation}>25%</button>
          <button onClick={() => handleQuickAmount(50)} disabled={showConfirmation}>50%</button>
          <button onClick={() => handleQuickAmount(75)} disabled={showConfirmation}>75%</button>
          <button onClick={() => handleQuickAmount(100)} disabled={showConfirmation}>100%</button>
        </div>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {preview && !showConfirmation && (
          <div className="trade-preview">
            <h3>Preview</h3>
            <div className="preview-row">
              <span>Shares:</span>
              <span>{formatShares(preview.shares)}</span>
            </div>
            <div className="preview-row">
              <span>Price per Share:</span>
              <span>{formatCurrency(preview.pricePerShare)}</span>
            </div>
            <div className="preview-row highlight">
              <span>Total {tradeType === 'buy' ? 'Cost' : 'Proceeds'}:</span>
              <span className="bold">{formatCurrency(preview.totalAmount)}</span>
            </div>
            <div className="preview-divider"></div>
            <div className="preview-row">
              <span>New Cash:</span>
              <span>{formatCurrency(preview.newCash)}</span>
            </div>
            <div className="preview-row">
              <span>New Shares:</span>
              <span>{formatShares(preview.newShares)}</span>
            </div>
            {tradeType === 'buy' && (
              <div className="preview-row">
                <span>New Avg. Price:</span>
                <span>{formatCurrency(preview.newAvgPrice)}</span>
              </div>
            )}
            {tradeType === 'sell' && preview.profitLoss !== undefined && (
              <div className={`preview-row ${preview.profitLoss >= 0 ? 'positive' : 'negative'}`}>
                <span>Profit/Loss:</span>
                <span className="bold">
                  {formatCurrency(preview.profitLoss)} ({formatPercent(preview.profitLossPercent || 0)})
                </span>
              </div>
            )}
          </div>
        )}

        {!showConfirmation && (
          <button
            className={`trade-btn ${tradeType}`}
            onClick={handlePreviewTrade}
            disabled={!sharesInput || parseFloat(sharesInput) <= 0 || !!error}
          >
            Preview {tradeType === 'buy' ? 'Buy' : 'Sell'} Order
          </button>
        )}

        {showConfirmation && preview && (
          <div className="confirmation-dialog">
            <div className="confirmation-header">
              <h3>⚠️ Confirm {tradeType === 'buy' ? 'Purchase' : 'Sale'}</h3>
            </div>
            <div className="confirmation-body">
              <p>
                You are about to {tradeType} <strong>{formatShares(preview.shares)}</strong> shares
                at <strong>{formatCurrency(preview.pricePerShare)}</strong> per share.
              </p>
              <div className="confirmation-total">
                Total: <strong>{formatCurrency(preview.totalAmount)}</strong>
              </div>
            </div>
            <div className="confirmation-actions">
              <button className="cancel-btn" onClick={handleCancelTrade}>
                Cancel
              </button>
              <button className={`confirm-btn ${tradeType}`} onClick={handleConfirmTrade}>
                Confirm {tradeType === 'buy' ? 'Buy' : 'Sell'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
