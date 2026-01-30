import React from 'react';
import './Loader.css';

export interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'spinner' | 'dots' | 'skeleton';
  text?: string;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  variant = 'spinner',
  text,
  className = '',
}) => {
  const classNames = ['loader', `loader-${size}`, `loader-${variant}`, className]
    .filter(Boolean)
    .join(' ');

  if (variant === 'dots') {
    return (
      <div className={classNames} role="status" aria-label={text || 'Loading'}>
        <div className="loader-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        {text && <span className="loader-text">{text}</span>}
      </div>
    );
  }

  return (
    <div className={classNames} role="status" aria-label={text || 'Loading'}>
      <div className="loader-spinner">
        <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="31.416, 31.416"
          />
        </svg>
      </div>
      {text && <span className="loader-text">{text}</span>}
    </div>
  );
};

// Skeleton loader for content placeholders
export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'circular' | 'rectangular';
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  variant = 'text',
  className = '',
}) => {
  const classNames = ['skeleton', `skeleton-${variant}`, className]
    .filter(Boolean)
    .join(' ');

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return <div className={classNames} style={style} aria-hidden="true" />;
};

export default Loader;
