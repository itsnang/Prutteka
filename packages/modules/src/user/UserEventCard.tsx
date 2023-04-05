import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Button, Modal, Table } from 'ui';
import { DeleteModal } from '../shared';

import {
  ChevronDownIcon,
  RectangleStackIcon,
  PencilIcon,
  TrashIcon,
  QrCodeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

import Link, { LinkProps } from 'next/link';

import { Disclosure } from '@headlessui/react';
import { useTypeSafeTranslation } from 'shared-utils/hooks';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useTokenStore } from '../auth';
import { auth } from 'firebase-config';

interface UserEventCardProps {
  id: string;
  img: string | StaticImageData;
  title: string;
  href: LinkProps['href'];
  date: string;
  time: string;
  location: string;
  isNested?: boolean;

  onDelete?: () => void;
}

export const UserEventCard: React.FC<UserEventCardProps> = ({
  id,
  date,
  img,
  href,
  title,
  time,
  location,
  isNested = false,
  onDelete,
}) => {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const token = useTokenStore((state) => state.token);

  return (
    <>
      <Disclosure>
        {({ open }) => (
          <div className="shadow-complete rounded-2xl bg-white">
            <div className="space-y-2 rounded-2xl p-1 pb-2">
              <div
                className={`w-ful flex min-h-[7rem] gap-1 bg-white lg:gap-2 lg:p-2 ${
                  open ? 'rounded-b-none' : ''
                }`}
              >
                <Link
                  className="relative aspect-[2/1] w-28 sm:w-56"
                  href={href}
                >
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
              <div className="flex items-center py-2 px-2">
                <div className="flex w-full justify-end gap-2 lg:gap-4">
                  <Button
                    variant="secondary"
                    icon={<UsersIcon />}
                    onClick={() => router.push('/user/my-event/' + id)}
                  ></Button>
                  <Button variant="secondary" icon={<QrCodeIcon />}></Button>
                  {isNested ? (
                    <Button
                      variant="secondary"
                      icon={<RectangleStackIcon />}
                    ></Button>
                  ) : null}
                  <Button
                    variant="secondary"
                    as="link"
                    href={`/event/${id}/edit`}
                    icon={<PencilIcon />}
                  ></Button>

                  <Button
                    onClick={() => setShow(true)}
                    className="text-primary bg-primary-light border-primary"
                    variant="secondary"
                    icon={<TrashIcon />}
                  ></Button>
                </div>
              </div>
            </Disclosure.Panel>
            <DeleteModal
              show={show}
              onClose={() => setShow(false)}
              onDelete={() => onDelete && onDelete()}
            />
          </div>
        )}
      </Disclosure>
    </>
  );
};
