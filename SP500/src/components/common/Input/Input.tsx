import React from 'react';
import './Input.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'small' | 'medium' | 'large';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  size = 'medium',
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const containerClasses = [
    'input-container',
    fullWidth ? 'input-full-width' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inputWrapperClasses = [
    'input-wrapper',
    `input-${size}`,
    error ? 'input-error' : '',
    leftIcon ? 'has-left-icon' : '',
    rightIcon ? 'has-right-icon' : '',
    props.disabled ? 'input-disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {props.required && <span className="input-required">*</span>}
        </label>
      )}
      <div className={inputWrapperClasses}>
        {leftIcon && <span className="input-icon input-icon-left">{leftIcon}</span>}
        <input
          id={inputId}
          className="input-field"
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {rightIcon && <span className="input-icon input-icon-right">{rightIcon}</span>}
      </div>
      {error && (
        <span id={`${inputId}-error`} className="input-error-text" role="alert">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={`${inputId}-helper`} className="input-helper-text">
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Input;
