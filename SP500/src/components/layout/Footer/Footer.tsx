import React from 'react';
import './Footer.css';

export interface FooterProps {
  showVersion?: boolean;
  version?: string;
}

export const Footer: React.FC<FooterProps> = ({
  showVersion = true,
  version = '1.0.0',
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer-component">
      <div className="footer-content">
        <p className="footer-text">
          📈 S&P 500 Trading Simulator - Educational purposes only
        </p>
        <div className="footer-links">
          <span className="footer-copyright">© {currentYear}</span>
          {showVersion && <span className="footer-version">v{version}</span>}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
