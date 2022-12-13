import React from 'react';
import { Footer } from 'ui';
import { Header, MainLayout } from './index';

interface DesktopLayoutProps {
  children: React.ReactNode;
}

export const DesktopLayout: React.FC<DesktopLayoutProps> = ({ children }) => {
  return (
    <MainLayout top={<Header />} bottom={<Footer />}>
      {children}
    </MainLayout>
  );
};
