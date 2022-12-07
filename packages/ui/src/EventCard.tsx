import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { TrashIcon } from '@heroicons/react/24/outline';

import { ButtonInterested } from './ButtonInterested';
import Link, { LinkProps } from 'next/link';
import { Button } from './Button';

interface EventCardProps {
  image: string | StaticImageData;
  title: string;
  href: LinkProps['href'];
  isLandscape?: boolean;
  onDelete?: Function;
}

export const EventCard: React.FC<EventCardProps> = ({
  image,
  title,
  href,
  isLandscape = true,
  onDelete,
}) => {
  if (isLandscape) {
    return (
      <div className="flex w-full gap-4 rounded-2xl p-2">
        <Image
          src={image}
          alt="title"
          className="aspect-[2/1] w-56 rounded-xl"
          placeholder="blur"
        />
        <div className="flex h-full flex-1 justify-between gap-4 p-2">
          <div className="flex-1">
            <div className="text-primary text-sm">Thu, Nov 14 | 5:00 PM</div>
            <Link
              className="line-clamp-2 text-lg font-medium text-gray-900"
              href={href}
            >
              Cambodia Tech Expo 2022 Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Inventore beatae eaque, temporibus commodi
              itaque assumenda blanditiis eius hic eum fugiat nam atque sapiente
              pariatur iusto excepturi repellat ratione rerum mollitia.
            </Link>
            <div className="text-secondary text-sm">Phnom Penh</div>
          </div>
          <div className="flex gap-4">
            <ButtonInterested />
            {onDelete && (
              <Button
                varaint="secondary"
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
    <div className="shadow-complete flex h-80 w-72 flex-col rounded-2xl bg-white p-1">
      <Link href={href}>
        <Image
          src={image}
          alt="title"
          className="aspect-[2/1] rounded-xl"
          placeholder="blur"
        />
      </Link>
      <div className="flex h-full flex-col gap-4 p-[14px]">
        <div className="flex-1">
          <div className="text-primary text-sm">Thu, Nov 14 | 5:00 PM</div>
          <Link className="text-lg font-medium text-gray-900" href={href}>
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
