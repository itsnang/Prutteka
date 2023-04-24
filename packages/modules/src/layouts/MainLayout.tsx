import React from 'react';

interface MainLayoutProps {
  top?: React.ReactNode;
  bottom?: React.ReactNode;
  className?: string;
  children: React.ReactNode | string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  top,
  bottom,
  className,
  children,
}) => {
  return (
    <>
      {top}
      <div
        className={`max-w-laptop mx-auto mb-8 min-h-screen px-4 ${
          top ? 'mt-24' : ''
        } ${className ? className : ''}`}
      >
        {children}
      </div>
      {bottom}
    </>
  );
};
