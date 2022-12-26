import React from 'react';
import Image from 'next/image';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-100 bg-white text-gray-600">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
        <div>&copy; 2022</div>
        <div className="relative h-8 w-20">
          <Image src="/Logo.png" alt="logo" fill />
        </div>
      </div>
    </footer>
  );
};
