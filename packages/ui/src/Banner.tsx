import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface BannerProps {
  img: string | StaticImageData;
  title: string;
}

export const Banner: React.FC<BannerProps> = ({ img, title }) => {
  return (
    <div className="relative flex text-white">
      <div className="absolute bottom-4 left-4 z-20 text-lg font-semibold">
        CellCard 25 aniversity
      </div>
      <div className="absolute bottom-0 left-0 z-10 h-1/3 w-full bg-opacity-20 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0)]" />
      <Image
        className="aspect-[2/1] w-[28.125rem] rounded-2xl object-cover"
        src={img}
        alt="BannerImage"
      />
    </div>
  );
};
