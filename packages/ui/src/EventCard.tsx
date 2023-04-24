import React, { useState } from 'react';
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
  isActive?: boolean;
  onDelete?: () => void;
  onInterested?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  img,
  title,
  href,
  date,
  time,
  location,
  isLandscape = false,
  isActive = false,
  onDelete,
  onInterested,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLandscape) {
    return (
      <div className="shadow-complete flex min-h-[7rem] w-full gap-2 rounded-2xl bg-white p-1 sm:p-2 md:gap-4">
        <Link className="relative aspect-[2/1] w-28 sm:w-56" href={href}>
          <Image
            src={img}
            alt={title}
            className="rounded-xl object-cover"
            fill
            onLoad={() => {
              console.log('load');
            }}
          />
        </Link>
        <div className="flex flex-1 justify-between gap-2 p-1 sm:p-2 md:gap-4">
          <div className="flex-1">
            <div className="text-primary text-sm">
              {date} | {time}
            </div>
            <Link
              className="line-clamp-2 text-base font-medium text-gray-900 sm:text-xl"
              href={href}
            >
              {title}
            </Link>
            <div className="text-secondary text-sm">{location}</div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <ButtonInterested isActive={isActive} onClick={onInterested} />
            {onDelete && (
              <Button
                variant="secondary"
                className="bg-primary-light border-primary text-primary"
                onClick={() => onDelete()}
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
    <div
      className={`shadow-complete flex h-full min-h-[22rem] w-full flex-col rounded-2xl bg-white p-1 ${
        isLoading ? '' : ''
      }`}
    >
      <Link
        href={href}
        className="relative aspect-[2/1] w-full overflow-hidden rounded-xl"
      >
        <Image
          src={img}
          alt="title"
          fill
          className="object-cover"
          onLoad={() => {
            setIsLoading(false);
          }}
        />
        {isLoading ? (
          <div className="absolute inset-0 z-10 animate-pulse bg-gray-100"></div>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-[14px]">
        {isLoading ? (
          <>
            <div className="flex-1 space-y-1">
              <div className="h-4 w-1/2 rounded-xl bg-gray-100"></div>
              <div className="h-4 w-4/5 rounded-xl bg-gray-100"></div>
              <div className="h-4 w-1/3 rounded-xl bg-gray-100"></div>
            </div>
            <div className="h-8 rounded-xl bg-gray-100"></div>
          </>
        ) : (
          <>
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
            <ButtonInterested
              hasText
              isActive={isActive}
              onClick={onInterested}
            />
          </>
        )}
      </div>
    </div>
  );
};
