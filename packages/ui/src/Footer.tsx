import React from 'react';
import Image from 'next/image';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-gray-100 bg-white text-gray-600">
      <div className="max-w-laptop mx-auto flex w-full items-center justify-between px-4 py-4">
        <div>&copy; 2022</div>
        <div className="relative h-8 w-20">
          <Image src="/logo.png" alt="logo" fill />
        </div>
      </div>
    </footer>
  );
};
