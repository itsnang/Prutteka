import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Typography, Button } from 'ui';
import { DeleteModal } from '../shared';

import {
  ChevronDownIcon,
  RectangleStackIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import Link, { LinkProps } from 'next/link';

import { Disclosure, Transition } from '@headlessui/react';
import { useTypeSafeTranslation } from '../shared-hooks';

interface UserEventCardProps {
  img: string | StaticImageData;
  title: string;
  href: LinkProps['href'];
  date: string;
  time: string;
  location: string;
  isNested?: boolean;

  onDelete?: Function;
}

export const UserEventCard: React.FC<UserEventCardProps> = ({
  date,
  img,
  href,
  title,
  time,
  location,
  isNested = false,
}) => {
  const { t } = useTypeSafeTranslation();
  const [show, setShow] = useState(false);

  return (
    <Disclosure>
      {({ open }) => (
        <div>
          <div
            className={`shadow-complete flex w-full gap-4 rounded-2xl p-2 ${
              open ? 'rounded-b-none' : ''
            }`}
          >
            <Link className="relative aspect-[2/1] w-56" href={href}>
              <Image src={img} alt={title} className="rounded-xl" fill />
            </Link>
            <div className="flex flex-1 justify-between gap-4 p-2 ">
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
              <div className="flex items-center gap-4">
                <Disclosure.Button className="inline-flex h-14  w-14 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-900  ">
                  <ChevronDownIcon
                    className={`h-6 w-6 transition-all ${
                      open ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="-mt-1 rounded-b-2xl bg-gray-100 p-2 text-gray-500">
            <div className="flex items-center justify-between py-4 px-4">
              <Typography size="2xl">1k {t('my-event-page.viewer')}</Typography>
              <div className="flex items-center gap-8">
                <div className="flex  gap-4">
                  <Typography size="2xl">EN</Typography>
                  <Typography className="opacity-60" size="2xl">
                    ខ្មែរ
                  </Typography>
                </div>
                <div className="flex gap-4">
                  {isNested ? (
                    <Button
                      variant="secondary"
                      icon={RectangleStackIcon}
                    ></Button>
                  ) : null}

                  <Button
                    variant="secondary"
                    as="link"
                    href="/"
                    icon={PencilIcon}
                  ></Button>

                  <Button
                    onClick={() => setShow(true)}
                    className="text-primary bg-primary-light border-primary"
                    variant="secondary"
                    icon={TrashIcon}
                  ></Button>
                </div>
              </div>
            </div>
          </Disclosure.Panel>
          <DeleteModal show={show} onClose={() => setShow(false)} />
        </div>
      )}
    </Disclosure>
  );
};
