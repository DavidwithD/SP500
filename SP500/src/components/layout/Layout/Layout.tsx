import React from 'react';
import './Layout.css';

export interface LayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebar?: React.ReactNode;
  sidebarPosition?: 'left' | 'right';
  maxWidth?: 'narrow' | 'medium' | 'wide' | 'full';
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  header,
  footer,
  sidebar,
  sidebarPosition = 'left',
  maxWidth = 'wide',
  children,
}) => {
  const mainClasses = [
    'layout-main',
    sidebar ? `layout-with-sidebar layout-sidebar-${sidebarPosition}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const contentClasses = ['layout-content', `layout-max-${maxWidth}`].join(' ');

  return (
    <div className="layout">
      {header && <div className="layout-header">{header}</div>}
      
      <div className={mainClasses}>
        {sidebar && sidebarPosition === 'left' && (
          <aside className="layout-sidebar">{sidebar}</aside>
        )}
        
        <main className={contentClasses}>{children}</main>
        
        {sidebar && sidebarPosition === 'right' && (
          <aside className="layout-sidebar">{sidebar}</aside>
        )}
      </div>
      
      {footer && <div className="layout-footer">{footer}</div>}
    </div>
  );
};

export default Layout;
