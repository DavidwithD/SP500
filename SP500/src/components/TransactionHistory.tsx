import type { Transaction } from '../types';
import { formatCurrency, formatShares, formatPercent } from '../services/gameService';
import './TransactionHistory.css';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  // Sort transactions by timestamp (most recent first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="transaction-history">
      <div className="history-header">
        <h2>Transaction History</h2>
        <div className="transaction-count">
          {transactions.length} {transactions.length === 1 ? 'trade' : 'trades'}
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h3>No Transactions Yet</h3>
          <p>Start trading to see your transaction history here.</p>
          <p className="tip">💡 Buy shares when prices are low, sell when they're high!</p>
        </div>
      ) : (
        <div className="transactions-list">
          {sortedTransactions.map((transaction) => (
            <div
              key={transaction.transactionId}
              className={`transaction-item ${transaction.type}`}
            >
              <div className="transaction-header">
                <div className="transaction-type-badge">
                  {transaction.type === 'buy' ? '🟢 BUY' : '🔴 SELL'}
                </div>
                <div className="transaction-date">
                  <div className="sim-date">{formatDate(transaction.date)}</div>
                  <div className="timestamp">{formatTime(transaction.timestamp)}</div>
                </div>
              </div>

              <div className="transaction-details">
                <div className="detail-row">
                  <span className="detail-label">Shares</span>
                  <span className="detail-value">{formatShares(transaction.shares)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Price per Share</span>
                  <span className="detail-value">{formatCurrency(transaction.pricePerShare)}</span>
                </div>
                <div className="detail-row total">
                  <span className="detail-label">Total Amount</span>
                  <span className="detail-value">{formatCurrency(transaction.totalAmount)}</span>
                </div>
              </div>

              {transaction.type === 'sell' && transaction.profitLoss !== undefined && (
                <div className="profit-loss-section">
                  <div className={`profit-loss ${transaction.profitLoss >= 0 ? 'profit' : 'loss'}`}>
                    {transaction.profitLoss >= 0 ? '📈' : '📉'} 
                    {transaction.profitLoss >= 0 ? ' Profit: ' : ' Loss: '}
                    <strong>{formatCurrency(Math.abs(transaction.profitLoss))}</strong>
                    {transaction.profitLossPercent !== undefined && (
                      <span className="percent"> ({formatPercent(transaction.profitLossPercent)})</span>
                    )}
                  </div>
                  <div className="cost-basis">
                    Bought at {formatCurrency(transaction.avgPriceBefore)} avg
                  </div>
                </div>
              )}

              <div className="balance-changes">
                <div className="balance-item">
                  <span className="balance-label">Cash</span>
                  <span className="balance-change">
                    {formatCurrency(transaction.cashBefore)} → {formatCurrency(transaction.cashAfter)}
                  </span>
                </div>
                <div className="balance-item">
                  <span className="balance-label">Shares</span>
                  <span className="balance-change">
                    {formatShares(transaction.sharesBefore)} → {formatShares(transaction.sharesAfter)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
