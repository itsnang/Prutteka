import React from 'react';
import Image, { StaticImageData } from 'next/image';

import { ButtonInterested } from './ButtonInterested';
import Link, { LinkProps } from 'next/link';

interface EventCardProps {
  image: string | StaticImageData;
  title: string;
  href: LinkProps['href'];
}

export const EventCard: React.FC<EventCardProps> = ({ image, title, href }) => {
  return (
    <div className="shadow-complete flex h-80 w-72 flex-col rounded-2xl bg-white p-1">
      <Link href={href}>
        <Image
          src={image}
          alt="title"
          className="aspect-[2/1] rounded-xl"
          placeholder="blur"
        />
      </Link>
      <div className="flex h-full flex-col p-[14px]">
        <div className="flex-1">
          <div className="text-primary text-sm">Thu, Nov 14 | 5:00 PM</div>
          <Link className="text-lg text-gray-900" href={href}>
            Cambodia Tech Expo 2022
          </Link>
          <div className="text-secondary text-sm">Phnom Penh</div>
        </div>
        <div className="">
          <ButtonInterested hasText />
        </div>
      </div>
    </div>
  );
};
