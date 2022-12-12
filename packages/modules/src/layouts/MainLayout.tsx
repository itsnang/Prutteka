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
        className={`mx-auto min-h-screen max-w-5xl px-4 ${top ? 'mt-24' : ''} ${
          className ? className : ''
        }`}
      >
        {children}
      </div>
      {bottom}
    </>
  );
};
