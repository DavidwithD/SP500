import React from 'react';
import './Card.css';

export interface CardProps {
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  headerAction,
  footer,
  variant = 'default',
  padding = 'medium',
  className = '',
  children,
}) => {
  const classNames = [
    'card',
    `card-${variant}`,
    `card-padding-${padding}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const hasHeader = title || subtitle || headerAction;

  return (
    <div className={classNames}>
      {hasHeader && (
        <div className="card-header">
          <div className="card-header-text">
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {headerAction && <div className="card-header-action">{headerAction}</div>}
        </div>
      )}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
