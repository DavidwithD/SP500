import { useState, useRef, useEffect } from 'react';
import './Tooltip.css';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  disabled?: boolean;
  educational?: boolean;
  title?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 200,
  disabled = false,
  educational = false,
  title,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const showTooltip = () => {
    if (disabled) return;
    
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  // Calculate tooltip position
  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const spacing = 8;

      let top = 0;
      let left = 0;

      switch (position) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - spacing;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'bottom':
          top = triggerRect.bottom + spacing;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.left - tooltipRect.width - spacing;
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.right + spacing;
          break;
      }

      // Keep tooltip within viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (left < 8) left = 8;
      if (left + tooltipRect.width > viewportWidth - 8) {
        left = viewportWidth - tooltipRect.width - 8;
      }
      if (top < 8) top = 8;
      if (top + tooltipRect.height > viewportHeight - 8) {
        top = viewportHeight - tooltipRect.height - 8;
      }

      setTooltipPosition({ top, left });
    }
  }, [isVisible, position]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={triggerRef}
        className="tooltip-trigger"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
        {educational && (
          <span className="tooltip-indicator">?</span>
        )}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className={`tooltip tooltip--${position} ${educational ? 'tooltip--educational' : ''}`}
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
          }}
          role="tooltip"
        >
          {educational && title && (
            <div className="tooltip__title">
              <span className="tooltip__icon">💡</span>
              {title}
            </div>
          )}
          <div className="tooltip__content">
            {content}
          </div>
        </div>
      )}
    </>
  );
};

// Educational tooltips for common trading terms
export const educationalContent = {
  roi: {
    title: 'Return on Investment (ROI)',
    content: 'ROI measures the gain or loss on an investment relative to the initial amount. A positive ROI means profit, while negative means loss.',
  },
  buyAndHold: {
    title: 'Buy & Hold Strategy',
    content: 'A passive strategy where you purchase stocks and hold them long-term, ignoring short-term market fluctuations.',
  },
  averagePrice: {
    title: 'Average Purchase Price',
    content: 'The weighted average cost of all shares you own. Used to calculate your profit or loss per share.',
  },
  portfolioValue: {
    title: 'Portfolio Value',
    content: 'The total current value of your investments (shares × current price) plus your cash balance.',
  },
  unrealizedGain: {
    title: 'Unrealized Gain/Loss',
    content: 'The profit or loss on investments you still hold. It becomes "realized" only when you sell.',
  },
  marketPrice: {
    title: 'Market Price',
    content: 'The current trading price of the S&P 500 index fund based on historical data.',
  },
  shares: {
    title: 'Shares',
    content: 'Units of ownership in the fund. More shares = more exposure to market movements.',
  },
  cashBalance: {
    title: 'Cash Balance',
    content: 'Available funds to purchase shares. Keep some cash for buying opportunities!',
  },
  totalTrades: {
    title: 'Total Trades',
    content: 'The number of buy and sell transactions you\'ve made. More trades can mean higher costs in real trading.',
  },
};

export default Tooltip;
