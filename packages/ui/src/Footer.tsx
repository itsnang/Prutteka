import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface FooterProps {
  img: string | StaticImageData;
  text?: string;
}

export const Footer: React.FC<FooterProps> = ({ img, text }) => {
  return (
    <footer className="border border-gray-100 text-gray-600">
      <div className="flex w-screen flex-row items-center justify-between px-[186px] py-2">
        <div>&copy; 2022</div>
        <div className="relative h-8 w-20">
          <Image src={img} alt="logo" fill />
        </div>
      </div>
    </footer>
  );
};
