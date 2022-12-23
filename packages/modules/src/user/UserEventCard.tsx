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
        <div className="shadow-complete rounded-2xl bg-white">
          <div className="shadow-complete space-y-2 rounded-2xl p-1 pb-2">
            <div
              className={`w-ful flex min-h-[7rem] gap-1 bg-white lg:gap-2 lg:p-2 ${
                open ? 'rounded-b-none' : ''
              }`}
            >
              <Link className="relative aspect-[2/1] w-28 sm:w-56" href={href}>
                <Image
                  src={img}
                  alt={title}
                  className="rounded-xl object-cover"
                  fill
                />
              </Link>
              <div className="flex flex-1  justify-between gap-1 p-1 lg:p-2 ">
                <div className="flex-1">
                  <div className="text-primary text-sm">
                    {date} | {time}
                  </div>
                  <Link
                    className="line-clamp-2 text-sm font-medium text-gray-900 md:text-xl"
                    href={href}
                  >
                    {title}
                  </Link>
                  <div className="text-secondary text-sm">{location}</div>
                </div>
                <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center">
                  <Disclosure.Button className="hidden h-10 w-10 items-center justify-center  rounded-xl border  border-gray-200  bg-white text-gray-900 md:inline-flex md:h-14 md:w-14 md:rounded-2xl  ">
                    <ChevronDownIcon
                      className={`  h-6 w-6 transition-all ${
                        open ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            <Disclosure.Button className="flex h-10  w-full items-center justify-center rounded-xl border  border-gray-200  bg-white text-gray-900 md:hidden">
              <ChevronDownIcon
                className={`  h-6 w-6 transition-all ${
                  open ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </Disclosure.Button>
          </div>

          <Disclosure.Panel className="-mt-1 rounded-b-2xl bg-gray-100 p-1 text-gray-500 lg:p-2">
            <div className="flex items-center justify-between py-2 px-2 lg:py-4 lg:px-4">
              <Typography className="md:text-xl lg:text-2xl" size="lg">
                1k {t('my-event-page.viewer')}
              </Typography>
              <div className="flex items-center gap-4 lg:gap-8">
                <div className="flex gap-2 lg:gap-4">
                  <Typography size="lg" className="md:text-xl lg:text-2xl">
                    EN
                  </Typography>
                  <Typography
                    className="opacity-60 md:text-xl lg:text-2xl"
                    size="lg"
                  >
                    ខ្មែរ
                  </Typography>
                </div>
                <div className="flex gap-2 lg:gap-4">
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
