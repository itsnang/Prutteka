import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface BannerProps {
  img: string | StaticImageData;
  title: string;
}

export const Banner: React.FC<BannerProps> = ({ img, title }) => {
  return (
    <div className="relative flex overflow-hidden rounded-2xl text-white">
      <div className="absolute bottom-4 left-4 z-20 text-lg font-semibold">
        {title}
      </div>
      <div className="absolute bottom-0 left-0 z-10 h-1/3 w-full bg-opacity-20 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0)]" />
      <div className="aspect-[2/1] h-full w-full">
        <Image className="object-cover" src={img} fill alt="BannerImage" />
      </div>
    </div>
  );
};
