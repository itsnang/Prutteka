import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import Image, { StaticImageData } from 'next/image';

import { ButtonInterested } from './ButtonInterested';
import Link, { LinkProps } from 'next/link';
import { Button } from './Button';

interface EventCardProps {
  img: string | StaticImageData;
  title: string;
  href: LinkProps['href'];
  date: string;
  time: string;
  location: string;
  isLandscape?: boolean;
  onDelete?: Function;
}

export const EventCard: React.FC<EventCardProps> = ({
  img,
  title,
  href,
  date,
  time,
  location,
  isLandscape = false,
  onDelete,
}) => {
  if (isLandscape) {
    return (
      <div className="shadow-complete flex w-full gap-4 rounded-2xl p-2">
        <Link className="relative aspect-[2/1] w-56" href={href}>
          <Image src={img} alt={title} className="rounded-xl" fill />
        </Link>
        <div className="flex h-full flex-1 justify-between gap-4 p-2">
          <div className="flex-1">
            <div className="text-primary text-sm">
              {date} | {time}
            </div>
            <Link
              className="line-clamp-2 text-xl font-medium text-gray-900"
              href={href}
            >
              {title}
            </Link>
            <div className="text-secondary text-sm">{location}</div>
          </div>
          <div className="flex gap-4">
            <ButtonInterested />
            {onDelete && (
              <Button
                variant="secondary"
                className="bg-primary-light border-primary text-primary h-14 w-14"
              >
                <TrashIcon className="h-6 w-6" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shadow-complete flex h-[22rem] w-screen max-w-[20rem] flex-col rounded-2xl bg-white p-1">
      <Link
        href={href}
        className="relative aspect-[2/1] overflow-hidden rounded-xl"
      >
        <Image src={img} alt="title" fill className="object-cover" />
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-[14px]">
        <div className="flex-1">
          <div className="text-primary text-sm">Thu, Nov 14 | 5:00 PM</div>
          <Link
            className="line-clamp-2 text-xl font-medium text-gray-900"
            href={href}
          >
            {title}
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
